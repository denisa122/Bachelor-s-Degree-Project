import React from "react";

import "./Insights.css";

// Icons & images
import Logo from "../../assets/logo.png";

import Navigation from "../Navigation/Navigation";

const Insights = () => {
  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="insightsPage">
        <div className="headerInsightsPage">
          <img src={Logo} alt="Logo" className="logoJournal"></img>
          <h1 className="text-3xl mb-1 mt-2">Your Insights</h1>
          <h2 className="italic text-lg">
            Uncover patterns, gain clarity, and understand your emotional
            journey
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Insights;
