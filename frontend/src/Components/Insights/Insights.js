import React from "react";

import "./Insights.css";

// Icons & images
import Logo from "../../assets/logo.png";
import InsightsImage from "../../assets/insights.jpg";

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

        <div className="mt-[40px] flex flex-row items-center">
          <img
            src={InsightsImage}
            alt="insights image"
            className="journalImage" // Make this image bigger
          ></img>
          <div className="flex flex-col">
            <h2 className="sectionTitle !mb-2.5">Understand Your Emotional Landscape</h2>
            <p className="sectionText">
              Your emotions and actions tell a story—one that’s uniquely yours.
              The Insights page brings together data from your journal entries,
              mood tracker questionnaires, and daily goals to provide a
              comprehensive view of your mental and emotional well-being.
              Explore your mood trends over time, uncover patterns in your
              behavior, and identify the most common sentiments that shape your
              days. With these insights, you’ll gain a deeper understanding of
              your journey and discover actionable ways to grow, improve, and
              thrive. Let your reflections guide you toward a brighter, more
              balanced tomorrow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
