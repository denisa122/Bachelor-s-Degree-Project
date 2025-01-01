import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ProfileSettings.css";

import Navigation from "../Navigation/Navigation";
import PageUnderDevelopment from "../PageUnderDevelopment";

const ProfileSettings = ({ userID }) => {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }

    try {
      setError(null);

      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/api/user/${userID}`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );

      setSuccessMessage(response.data.message);
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 3000);
    } catch (error) {
      console.error("Error deleting account:", error);
      setError(error.response?.data?.error || "Something went wrong.");
    } 
  };

  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="profileSettingsPage">
        <div>
          <h2>Delete Account</h2>
          <p>
            Deleting your account is permanent and cannot be undone. All your
            data will be removed.
          </p>
          <button
            className="deleteAccountButton"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </button>
          {error && <p className="error">{error}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
        </div>
        <PageUnderDevelopment />
      </div>
    </div>
  );
};

export default ProfileSettings;
