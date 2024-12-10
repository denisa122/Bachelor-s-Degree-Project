import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`, {}, {
        headers: { "auth-token": localStorage.getItem("token") }
      });
  
      if (response.status === 200) {
        localStorage.removeItem("token"); 
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  };
  

  return (
    <nav>
      <a>
        <button onClick={handleLogout}>Log out</button>
      </a>
    </nav>
  );
};

export default Navigation;
