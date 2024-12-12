import React from "react";

import "./MoodTracker.css";

// Icons & images
import Logo from "../../assets/logo.png";
import MoodTrackerImage from "../../assets/mood-tracker.jpg";

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

        <div className="mt-[40px] flex flex-row items-center">
          <img
            src={MoodTrackerImage}
            alt="mood tracker image"
            className="journalImage"
          ></img>
          <div className="flex flex-col">
            <h2 className="sectionTitle !mb-2.5">Your Daily Check-In</h2>
            <p className="sectionText">
              Every day is an opportunity to pause, reflect, and realign with
              your goals. The Mood Tracker is your space to check in with
              yourself through morning, midday, and evening questionnaires
              designed to help you understand your emotions and focus your
              energy. Set meaningful daily goals and track your progress as you
              go. Whether it’s achieving a small milestone or reflecting on how
              you feel, these daily moments of introspection help you stay
              connected to your personal growth journey. Take a moment to
              prioritize yourself—your well-being starts here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
