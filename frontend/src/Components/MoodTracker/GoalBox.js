import React from "react";

import "./MoodTracker.css";

const GoalBox = ({ goal, onCheckboxChange }) => {
  const handleCheckboxChange = () => {
    if (goal.completed) return;
    onCheckboxChange(goal.goalID, goal.completed);
  };

  return (
    <div className="goal">
      <p className="mr-1.5">{goal.text}</p>
      <input
        type="checkbox"
        checked={goal.completed}
        onChange={handleCheckboxChange}
        disabled={goal.completed}
      />
    </div>
  );
};

export default GoalBox;
