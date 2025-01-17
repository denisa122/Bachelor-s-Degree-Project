import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa";

import "./Questionnaire.css";

const Questionnaire = ({ userID }) => {
  const { timeOfDay } = useParams();
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [responses, setResponses] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchQuestionnaire = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/questionnaires/${timeOfDay}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setQuestionnaire(response.data);

        const submissionResponse = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/questionnaires/check/${userID}/${timeOfDay}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );

        setIsSubmitted(submissionResponse.data.submitted);
      } catch (error) {
        console.error("Error fetching questionnaire:", error);
      }
    };

    fetchQuestionnaire();
  }, [timeOfDay, userID]);

  const handleAnswerChange = (questionId, answer) => {
    const capitalizedAnswer = answer.charAt(0).toUpperCase() + answer.slice(1);

    setResponses({
      ...responses,
      [questionId]: capitalizedAnswer,
    });
  };

  const handleBackToMoodTracker = () => {
    navigate("/mood-tracker");
  };

  const handleSubmit = async () => {
    const payload = {
      userID: userID,
      questionnaireID: questionnaire?.questionnaireID,
      timeOfDay: timeOfDay,
      responses: Object.keys(responses).map((key) => ({
        questionID: parseInt(key, 10),
        answer: responses[key]?.trim?.() || responses[key],
      })),
    };
    console.log("Payload being sent to backend:", payload);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/questionnaires/submit`,
        payload,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      console.log("Questionnaire submission successful!", response.data);
      alert("Questionnaire submitted successfully!");
      navigate("/mood-tracker");
    } catch (error) {
      console.error("Error submitting questionnaire:", error);
      alert("Error submitting questionnaire. Please try again.");
    }
  };

  return (
    <div className="questionnairePage flex flex-col">
      <button className="backButton" onClick={handleBackToMoodTracker}>
        <FaArrowLeft style={{ marginRight: "8px" }} />
        Back to Mood Tracker
      </button>
      <div className="questionnaireContent">
        <h1>{questionnaire?.title}</h1>
        <p className="!text-center mb-8 !italic">
          {questionnaire?.description}
        </p>

        {questionnaire?.Questions && questionnaire.Questions.length > 0 ? (
          questionnaire.Questions.map((question) => (
            <div key={question.questionID}>
              <p>{question.text}</p>
              {question.type === "Multiple Choice" ? (
                <select
                  onChange={(e) =>
                    handleAnswerChange(question.questionID, e.target.value)
                  }
                  value={responses[question.questionID] || ""}
                >
                  <option value="">Select an answer</option>
                  {question.options?.map((option, idx) => (
                    <option key={idx} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : question.type === "Scale" ? (
                <div className="scaleContainer">
                  <label htmlFor={question.questionID} className="scaleLabel">
                    Low
                  </label>
                  <input
                    type="range"
                    id={question.questionID}
                    min="1"
                    max="5"
                    step="1"
                    value={responses[question.questionID] || 1}
                    onChange={(e) =>
                      handleAnswerChange(question.questionID, e.target.value)
                    }
                    className="scaleSlider"
                  />
                  <label htmlFor={question.questionID} className="scaleLabel">
                    High
                  </label>
                </div>
              ) : (
                <input
                  type="text"
                  value={responses[question.questionID] || ""}
                  onChange={(e) =>
                    handleAnswerChange(question.questionID, e.target.value)
                  }
                />
              )}
            </div>
          ))
        ) : (
          <p>No questions available</p>
        )}

        <button className="submitQuestionnaireButton" onClick={handleSubmit}>
          Submit Questionnaire
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
