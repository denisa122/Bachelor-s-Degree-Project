import React from "react";

import "./MoodTracker.css";

const GoalBox = ({ goal }) => {
    return (
        <div className="goal">
            <p className="mr-1.5">{goal.text}</p>
            <input type="checkbox" checked={goal.completed} />
        </div>
    )
};

export default GoalBox;