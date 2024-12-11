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
import MoodTracker from "./Components/MoodTracker/MoodTracker";
import Insights from "./Components/Insights/Insights";

function App() {
  const [userId, setUserId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
          setUserId(response.data.id);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserId();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />

        <Route path="/" element={<HomepageGuest />} />
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={<HomepageLoggedIn />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/journal"
          element={
            <PrivateRoute
              element={<Journal />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/mood-tracker"
          element={
            <PrivateRoute
              element={<MoodTracker />}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        <Route
          path="/insights"
          element={
            <PrivateRoute
              element={<Insights />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
