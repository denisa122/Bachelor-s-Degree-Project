import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import PrivateRoute from "./Components/PrivateRoute";

import Register from "./Components/User/Register";
import Login from "./Components/User/Login";

import HomepageGuest from "./Components/Homepage/HomepageGuest";
import HomepageLoggedIn from "./Components/Homepage/HomepageLoggedIn";

import Journal from "./Components/Journal/Journal";
import JournalEditor from "./Components/Journal/JournalEditor";
import MoodTracker from "./Components/MoodTracker/MoodTracker";
import Insights from "./Components/Insights/Insights";
import ProfileSettings from "./Components/User/ProfileSettings";
import Questionnaire from "./Components/Questionnaire/Questionnaire";

import { Input, Ripple, initTWE } from "tw-elements";

function App() {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initTWE({ Input, Ripple });
  }, []);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/auth/login-status`,
            {
              headers: {
                "auth-token": token,
              },
            }
          );
          console.log("Login status response:", response.data);
          if (response.data.isLoggedIn) {
            setUserId(response.data.id);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />

        {/* TEMPORARY until I implement homepage for guests
         Change back to /login after */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* TEMPORARY until I implement this page
         Change back to / after */}
        <Route path="/guest" element={<HomepageGuest />} />
        
        <Route
          path="/home"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <PrivateRoute
                element={<HomepageLoggedIn userID={userId} />}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />
        <Route
          path="/journal"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <PrivateRoute
                element={<Journal userID={userId} />}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />

        <Route
          path="/write"
          element={
            isLoading ? (
              <p>LOading...</p>
            ) : (
              <PrivateRoute
                element={<JournalEditor userID={userId} />}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />

        <Route
          path="/mood-tracker"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <PrivateRoute
                element={<MoodTracker userID={userId} />}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />

        <Route
          path="/questionnaire/:timeOfDay"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <PrivateRoute
                element={<Questionnaire userID={userId} />}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />

        <Route
          path="/insights"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <PrivateRoute
                element={<Insights userID={userId} />}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />

        <Route
          path="/profile-settings"
          element={
            isLoading ? (
              <p>Loading...</p>
            ) : (
              <PrivateRoute
                element={<ProfileSettings />}
                isAuthenticated={isAuthenticated}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
