import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import "./MoodTracker.css";

// Icons & images
import Logo from "../../assets/logo.png";
import MoodTrackerImage from "../../assets/mood-tracker.jpg";
import MorningQuestionnaire from "../../assets/morning.png";
import MiddayQuestionnaire from "../../assets/midday.png";
import EveningQuestionnaire from "../../assets/evening.png";
import Plus from "../../assets/plus-icon.svg";
import InsightsIcon from "../../assets/insights-icon-small.svg";

import Navigation from "../Navigation/Navigation";
import QuestionnaireBox from "./QuestionnaireBox";

const MoodTracker = () => {
  const [morningQuestionnaire, setMorningQuestionnaire] = useState(null);
  const [middayQuestionnaire, setMiddayQuestionnaire] = useState(null);
  const [eveningQuestionnaire, setEveningQuestionnaire] = useState(null);

  useEffect(() => {
    const fetchQuestionnaire = async (timeOfDay, setFunction) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/questionnaires/${timeOfDay}`
        );
        setFunction(response.data);
      } catch (error) {
        console.error("Error fetching ${timeOfDay} questionnaire:", error);
      }
    };

    fetchQuestionnaire("Morning", setMorningQuestionnaire);
    fetchQuestionnaire("Midday", setMiddayQuestionnaire);
    fetchQuestionnaire("Evening", setEveningQuestionnaire);
  }, []);

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

        <div className="section questionnairesSection mt-[60px]">
          <h1 className="sectionTitle">Mood Questionnaires</h1>
          <div className="questionnaires">
            {morningQuestionnaire && (
              <QuestionnaireBox
                className="item-start"
                title={morningQuestionnaire.title}
                image={MorningQuestionnaire}
                description={morningQuestionnaire.description}
              />
            )}
            {middayQuestionnaire && (
              <QuestionnaireBox
                className="item-middle"
                title={middayQuestionnaire.title}
                image={MiddayQuestionnaire}
                description={middayQuestionnaire.description}
              />
            )}

            {eveningQuestionnaire && (
              <QuestionnaireBox
                className="item-end"
                title={eveningQuestionnaire.title}
                image={EveningQuestionnaire}
                description={eveningQuestionnaire.description}
              />
            )}
          </div>
        </div>

        <div className="section goalsSection">
          <h1 className="sectionTitle">Your daily goals</h1>
          <p className="sectionText !mb-8">
            What will you focus on? Setting clear goals helps you stay on track
            and feel accomplished.
          </p>
          <a
            href="/write"
            className="flex flex-row items-center buttonWithBorder w-[110px]"
          >
            <img src={Plus} alt="plus icon" className="buttonIconJournal"></img>
            <button className="text-sm">Add goals</button>
          </a>
          <div className="goals">
            <div className="goal space-x-2.5">
              <p>Meditate for 5 minutes</p>
              <input type="checkbox" />
            </div>
            <div className="goal space-x-2.5">
              <p>Complete a 30-minute workout</p>
              <input type="checkbox" />
            </div>
            <div className="goal space-x-2.5">
              <p>Read for 20 minutes</p>
              <input type="checkbox" />
            </div>
            <div className="goal space-x-2.5">
              <p>Plan and prepare a healthy meal</p>
              <input type="checkbox" />
            </div>
            <div className="goal space-x-2.5">
              <p>Spend time outdoors for 15 minutes</p>
              <input type="checkbox" />
            </div>
          </div>
        </div>

        <div className="section insightsMoodTrackerSection">
          <h1 className="sectionTitle">
            Understand the connection between your mood, your goals and your
            personal growth.
          </h1>
          <div className="flex flex-row items-baseline">
            <p className="sectionText mr-1">
              Your{" "}
              <a href="/insights">
                <u>insights</u>
              </a>{" "}
              are ready to be explored.
            </p>
            <img src={InsightsIcon} alt="lightbulb icon"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
