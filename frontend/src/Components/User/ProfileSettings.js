import React from "react";

import "./ProfileSettings.css";

import Navigation from "../Navigation/Navigation";

const ProfileSettings = () => {
  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="profileSettingsPage">
        This is the user settings page
        <h1>Profile Settings</h1>
      </div>
    </div>
  );
};

export default ProfileSettings;
