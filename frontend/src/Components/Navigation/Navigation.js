import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";

import "./Navigation.css";

import Logo from "../../assets/logo-navbar.png";
import Journal from "../../assets/journal-icon.svg";
import MoodTracker from "../../assets/mood-tracker-icon.svg";
import Insights from "../../assets/insights-icon.svg";
import ProfileSettings from "../../assets/profile-settings-icon.svg";
import Logout from "../../assets/logout-icon.svg";
import ActiveJournal from "../../assets/active-journal-icon.svg";
import ActiveMoodTracker from "../../assets/active-mood-tracker-icon.svg";
import ActiveInsights from "../../assets/active-insights-icon.svg";
import ActiveProfileSettings from "../../assets/active-profile-settings-icon.svg";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`,
        {},
        {
          headers: { "auth-token": localStorage.getItem("token") },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <nav className="navContainer">
      <NavLink
        exact="true"
        to="/home"
        activeClass="active"
        className="mb-5 self-center"
      >
        <img src={Logo} alt="Logo" className="logo"></img>
      </NavLink>

      <NavLink
        exact="true"
        to="/journal"
        activeClass="active"
        className="listItem"
      >
        <img
          src={ActiveJournal}
          alt="quill icon"
          className="hidden activeNavbarIcon ml-1 !mr-1"
        ></img>
        <img
          src={Journal}
          alt="quill icon"
          className="navbarIcon ml-1 !mr-1"
        ></img>
        Journal
      </NavLink>

      <NavLink
        exact="true"
        to="/mood-tracker"
        activeClass="active"
        className="listItem"
      >
        <img
          src={ActiveMoodTracker}
          alt="mood tracker icon"
          className="hidden activeNavbarIcon"
        ></img>
        <img
          src={MoodTracker}
          alt="mood tracker icon"
          className="navbarIcon"
        ></img>
        Mood Tracker
      </NavLink>

      <NavLink
        exact="true"
        to="/insights"
        activeClass="active"
        className="listItem"
      >
        <img
          src={ActiveInsights}
          alt="lightbulb icon"
          className="hidden activeNavbarIcon"
        ></img>
        <img src={Insights} alt="lightbulb icon" className="navbarIcon"></img>
        Insights
      </NavLink>

      <NavLink
        exact="true"
        to="/profile-settings"
        activeClass="active"
        className="listItem"
      >
        <img
          src={ActiveProfileSettings}
          alt="profile settings icon"
          className="hidden activeNavbarIcon ml-1 !mr-1"
        ></img>
        <img
          src={ProfileSettings}
          alt="profile settings icon"
          className="navbarIcon ml-1 !mr-1"
        ></img>
        Profile Settings
      </NavLink>
      <a className="listItem fixed bottom-0 !mb-12">
        <button onClick={handleLogout}>Log out</button>
        <img src={Logout} alt="logout icon" className="navbarIcon ml-1.5"></img>
      </a>
    </nav>
  );
};

export default Navigation;
