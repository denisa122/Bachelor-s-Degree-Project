import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./Questionnaire.css";

const Questionnaire = () => {
  const { timeOfDay } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [responses, setResponses] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/questionnaires/${timeOfDay}`
        );
        console.log("Questionnaire data:", response.data);
        setQuestionnaire(response.data);
      } catch (error) {
        console.error("Error fetching ${timeOfDay} questionnaire:", error);
      }
    };

    fetchQuestionnaire();
  }, [timeOfDay]);

  const handleSubmit = () => {
    console.log("Responses:", responses);
  };

  const handleAnswerChange = (questionId, answer) => {
    setResponses({
      ...responses,
      [questionId]: answer,
    });
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
