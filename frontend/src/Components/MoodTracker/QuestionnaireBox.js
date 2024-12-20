import React from "react";

const QuestionnaireBox = ({ title, image, description, onClick, disabled }) => {
  return (
    <div className="questionnaireBox">
      <h2 className="questionnaireTitle">{title}</h2>
      <img
        src={image}
        alt={`${title} image`}
        className="moodQuestionnaireImg"
      ></img>
      <p className="questionnaireInfo">{description}</p>
      {disabled ? (
        <button
          className="buttonWithBorder w-[160px] text-sm cursor-not-allowed"
          style={{
            background: "#d3d3d3",
          }}
        >
          Done for today
        </button>
      ) : (
        <button
          onClick={onClick}
          className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-sm font-medium"
          style={{
            background:
              "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
          }}
        >
          Start questionnaire
        </button>
      )}
    </div>
  );
};

export default QuestionnaireBox;
