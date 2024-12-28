import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import GoalBox from "./GoalBox";
import { get, set } from "mongoose";

const MoodTracker = ({ userID }) => {
  const { id } = useParams();
  const [morningQuestionnaire, setMorningQuestionnaire] = useState(null);
  const [middayQuestionnaire, setMiddayQuestionnaire] = useState(null);
  const [eveningQuestionnaire, setEveningQuestionnaire] = useState(null);

  const [questionnaireStatus, setQuestionnaireStatus] = useState({
    morning: false,
    midday: false,
    evening: false,
  });

  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchQuestionnaire = async (timeOfDay, setFunction) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/questionnaires/${timeOfDay}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setFunction(response.data);
      } catch (error) {
        console.error("Error fetching ${timeOfDay} questionnaire:", error);
      }
    };

    const checkSubmissionStatus = async (timeOfDay) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/questionnaires/check/${userID}/${timeOfDay}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setQuestionnaireStatus((prevStatus) => ({
          ...prevStatus,
          [timeOfDay.toLowerCase()]: response.data.submitted,
        }));
      } catch (error) {
        console.error(`Error checking ${timeOfDay} submission status:`, error);
      }
    };

    // Check submission status for each time of day
    checkSubmissionStatus("Morning");
    checkSubmissionStatus("Midday");
    checkSubmissionStatus("Evening");

    fetchQuestionnaire("Morning", setMorningQuestionnaire);
    fetchQuestionnaire("Midday", setMiddayQuestionnaire);
    fetchQuestionnaire("Evening", setEveningQuestionnaire);

    const fetchGoals = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/goals/today/${userID}`,
          {
            headers: {
              "auth-token": token,
              userID: userID,
            },
          }
        );
        setGoals(response.data);
      } catch {
        console.error("Error fetching today's goals");
      }
    };

    fetchGoals();
  }, [userID]);

  const handleStartQuestionnaire = (timeOfDay) => {
    navigate(`/questionnaire/${timeOfDay}`);
  };

  const handleAddGoal = async () => {
    const token = localStorage.getItem("token");
    if (newGoal.trim() === "") {
      alert("Please enter a goal");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/goals`,
        {
          text: newGoal,
          userID: userID,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setGoals([...goals, response.data]);
      setNewGoal("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding goal:", error);
      alert("Error adding goal. Please try again.");
    }
  };

  const handleGoalCheckboxChange = async (goalId, currentStatus) => {
    const token = localStorage.getItem("token");
    if (currentStatus) return;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/goals/${goalId}`,
        { completed: true },
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.goalID === goalId ? { ...goal, completed: true } : goal
        )
      );
    } catch (error) {
      console.error("Error updating goal completion", error);
      alert(
        "There was an error with marking the goal as completed. Please try again."
      );
    }
  };

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
                onClick={() => handleStartQuestionnaire("Morning")}
                disabled={questionnaireStatus.morning}
              ></QuestionnaireBox>
            )}
            {middayQuestionnaire && (
              <QuestionnaireBox
                className="item-middle"
                title={middayQuestionnaire.title}
                image={MiddayQuestionnaire}
                description={middayQuestionnaire.description}
                onClick={() => handleStartQuestionnaire("Midday")}
                disabled={questionnaireStatus.midday}
              ></QuestionnaireBox>
            )}

            {eveningQuestionnaire && (
              <QuestionnaireBox
                className="item-end"
                title={eveningQuestionnaire.title}
                image={EveningQuestionnaire}
                description={eveningQuestionnaire.description}
                onClick={() => handleStartQuestionnaire("Evening")}
                disabled={questionnaireStatus.evening}
              ></QuestionnaireBox>
            )}
          </div>
        </div>

        <div className="section goalsSection">
          <h1 className="sectionTitle">Your daily goals</h1>
          <p className="sectionText !mb-8">
            What will you focus on? Setting clear goals helps you stay on track
            and feel accomplished.
          </p>
          <div
            href="/write"
            className="flex flex-row items-center buttonWithBorder w-[110px]"
          >
            <img src={Plus} alt="plus icon" className="buttonIconJournal"></img>
            <button className="text-sm" onClick={() => setIsModalOpen(true)}>
              Add goals
            </button>
          </div>
          <div className="goals">
            {goals.length > 0 ? (
              goals.map((goal) => (
                <GoalBox
                  key={goal._id}
                  goal={goal}
                  onCheckboxChange={handleGoalCheckboxChange}
                />
              ))
            ) : (
              <p>You didn't set any goals for today.</p>
            )}
          </div>

          {isModalOpen && (
            <div className="goalModal">
              <div className="modalContent">
                <h2>Enter goal</h2>
                <textarea
                  value={newGoal}
                  onChange={(e) => setNewGoal(e.target.value)}
                  placeholder="Enter your goal"
                  className="goalInput"
                />
                <div className="modalActions">
                  <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button onClick={handleAddGoal}>Add</button>
                </div>
              </div>
            </div>
          )}
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
