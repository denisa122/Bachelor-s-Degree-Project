import React from "react";

import "./MoodTracker.css";

const GoalBox = ({ goal, onCheckboxChange }) => {
const {goalID, completed, text} = goal;

  const handleCheckboxChange = () => {
    if (goal.completed) return;
    onCheckboxChange(goalID, completed);
  };

  return (
    <div className="goal">
      <span className={completed ? 'strikethrough' : ''}>{goal.text}</span>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleCheckboxChange}
        disabled = {completed}
        className="ml-1.5"
      />
    </div>
  );
};

export default GoalBox;
