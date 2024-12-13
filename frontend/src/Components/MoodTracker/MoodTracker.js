import React from "react";

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

        <div className="section questionnairesSection mt-[60px]">
          <h1 className="sectionTitle">Mood Questionnaires</h1>
          <div className="questionnaires">
            <div className="questionnaireBox item-start">
              <h2 className="questionnaireTitle">Morning questionnaire</h2>
              <img
                src={MorningQuestionnaire}
                alt="morning questionnaire image"
                className="moodQuestionnaireImg"
              ></img>
              <p className="questionnaireInfo">
                Start your day by capturing your initial mood and setting your
                intentions. Reflect on your goals, expectations, and how
                prepared you feel for the day ahead.
              </p>
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-[#252D3B] shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                style={{
                  background:
                    "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
                }}
              >
                Start questionnaire
              </button>
            </div>
            <div className="questionnaireBox item-middle">
              <h2 className="questionnaireTitle">Midday questionnaire</h2>
              <img
                src={MiddayQuestionnaire}
                alt="morning questionnaire image"
                className="moodQuestionnaireImg"
              ></img>
              <p className="questionnaireInfo">
                Take a moment to process how your day is unfolding. Reflect on
                key events, challenges, and accomplishments, and see how your
                mood is evolving.
              </p>
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-[#252D3B] shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                style={{
                  background:
                    "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
                }}
              >
                Start questionnaire
              </button>
            </div>
            <div className="questionnaireBox item-end">
              <h2 className="questionnaireTitle">Evening questionnaire</h2>
              <img
                src={EveningQuestionnaire}
                alt="morning questionnaire image"
                className="moodQuestionnaireImg"
              ></img>
              <p className="questionnaireInfo">
                End your day by checking in on your emotional and energy shifts.
                This helps track any fluctuations in mood or stress, and gives
                you a chance to unwind.
              </p>
              <button
                className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-sm font-medium leading-normal text-[#252D3B] shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                style={{
                  background:
                    "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
                }}
              >
                Start questionnaire
              </button>
            </div>
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
              Your <a href="/insights"><u>insights</u></a> are ready to be explored.
            </p>
            <img src={InsightsIcon} alt="lightbulb icon"></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;
