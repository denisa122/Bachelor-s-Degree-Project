import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Questionnaire.css";

const Questionnaire = ({ userID }) => {
  const { timeOfDay } = useParams();
  const { id } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [responses, setResponses] = useState({});
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
      } catch (error) {
        console.error("Error fetching ${timeOfDay} questionnaire:", error);
      }
    };

    fetchQuestionnaire();
  }, [timeOfDay]);

  const handleAnswerChange = (questionId, answer) => {
    setResponses({
      ...responses,
      [questionId]: answer,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      userID: userID,
      questionnaireID: questionnaire?.questionnaireID,
      timeOfDay: timeOfDay,
      responses: Object.keys(responses).map((key) => ({
        questionID: key,
        answer: responses[key],
      })),
    };

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
    <div className="questionnairePage">
      <h1>{questionnaire?.title}</h1>
      <p>{questionnaire?.description}</p>

      {/* Check if Questions exist and map over them */}
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
              <input
                type="number"
                value={responses[question.questionID] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.questionID, e.target.value)
                }
                min="1"
                max="5" // Adjust based on scale range
              />
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

      <button onClick={handleSubmit}>Submit Questionnaire</button>
    </div>
  );
};

export default Questionnaire;
