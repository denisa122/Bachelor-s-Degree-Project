import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import Register from "./Components/User/Register";
import Login from "./Components/User/Login";
import HomepageLoggedIn from "./Components/Homepage/HomepageLoggedIn";

import PrivateRoute from "./Components/PrivateRoute";

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

        <Route
          path="/home"
          element={
            <PrivateRoute
              element={<HomepageLoggedIn />}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
