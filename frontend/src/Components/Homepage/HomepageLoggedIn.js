import React from "react";

import "./Homepage.css";

import Logo from "../../assets/logo.png";
import WriteIcon from "../../assets/write-icon.svg";
import MorningQuestionnaire from "../../assets/morning q.png";
import MiddayQuestionnaire from "../../assets/midday q.png";
import EveningQuestionnaire from "../../assets/evening q.png";
import InsightsIcon from "../../assets/hp-insights-icon.svg";
import InsightsImg from "../../assets/hp-insights-img.png";
import MagnifyingGlass from "../../assets/magnifying-glass-icon.svg";

import Navigation from "../Navigation/Navigation";
// import Footer from '../Footer/Footer';

const HomepageLoggedIn = () => {
  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="homepage flex flex-row">
        <div className="leftSide">
          <div className="header">
            <img src={Logo} alt="Logo" className="logoHP"></img>
            <h1 className="title">Welcome back, Jane!</h1>
          </div>

          <div className="section startWritingSection">
            <h2 className="sectionTitle">Feeling inspired? Write it down!</h2>
            <p className="sectionText">
              Whether it’s a spark of inspiration or a moment of reflection,
              writing about your thoughts helps you understand your journey and
              find clarity. Write down your thoughts, and see where they take
              you.
            </p>
            <a
              href="/journal"
              className="flex flex-row items-center buttonWithBorder w-[135px]"
            >
              <img
                src={WriteIcon}
                alt="journal writing icon"
                className="buttonIcon"
              ></img>
              <button>Start writing</button>
            </a>
          </div>

          <div className="section questionnairesSection">
            <h2 className="sectionTitle">Don’t forget to check in</h2>
            <p className="sectionText pb-5">
              Tracking your mood every day helps you gain insights into your
              emotions, identify patterns and make positive changes. Take a
              moment to reflect and check in with yourself.
            </p>
            <div className="grid-container">
              <div>
                <img
                  src={MorningQuestionnaire}
                  alt="morning questionnaire picture"
                  className="questionnaireImage"
                ></img>
                <button
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#252D3B] shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  style={{
                    background:
                      "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
                  }}
                >
                  Morning questionnaire
                </button>
              </div>
              <div>
                <img
                  src={MiddayQuestionnaire}
                  alt="midday questionnaire picture"
                  className="questionnaireImage"
                ></img>
                <button
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#252D3B] shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  style={{
                    background:
                      "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
                  }}
                >
                  Midday questionnaire
                </button>
              </div>
              <div>
                <img
                  src={EveningQuestionnaire}
                  alt="evening questionnaire picture"
                  className="questionnaireImage !w-[133px]"
                ></img>
                <button
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-[#252D3B] shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                  style={{
                    background:
                      "linear-gradient(to right, #FFCAD4 0%, #CBC0D3 50%, #D8E2DC 100%)",
                  }}
                >
                  Evening questionnaire
                </button>
              </div>
            </div>
          </div>

          <div className="section insightsSection">
            <div className="flex flex-row items-baseline">
              <h1 className="sectionTitle mr-1.5">
                Your personal insights await
              </h1>
              <img
                src={InsightsIcon}
                alt="lightbulb icon"
                className="insightsSectionIcon"
              ></img>
            </div>
            <p className="sectionText">
              Your mood and journal entries tell a powerful story. Explore your
              personalized insights to see how your emotions have evolved, and
              gain tips on how to improve your wellbeing.
            </p>
            <div className="justify-items-center">
              <img
                src={InsightsImg}
                alt="insights image"
                className="insightsSectionImg"
              ></img>
              <a
                href="/insights"
                className="flex flex-row items-baseline buttonWithBorder"
              >
                <img
                  src={MagnifyingGlass}
                  alt="magnifying glass icon"
                  className="mr-1.5"
                ></img>
                <button>Explore insights</button>
              </a>
            </div>
          </div>
        </div>

        <div className="rightSide">
          <h1>this is the right side</h1>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default HomepageLoggedIn;
