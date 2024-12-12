import React from "react";

import "./MoodTracker.css";

// Icons & images
import Logo from "../../assets/logo.png";

import Navigation from "../Navigation/Navigation";

const MoodTracker = () => {
  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="moodTrackerPage">
        <div className="headerMoodTrackerPage">
          <img src={Logo} alt="Logo" className="logoJournal"></img>
          <h1 className="text-3xl mb-1 mt-2">Your Mood Tracker</h1>
          <h2 className="italic text-lg">
            Reflect, set goals and track your emotional journey throughout the
            day
          </h2>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
