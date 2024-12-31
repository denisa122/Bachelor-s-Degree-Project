import React from "react";

import "./ProfileSettings.css";

import Navigation from "../Navigation/Navigation";
import PageUnderDevelopment from "../PageUnderDevelopment";

const ProfileSettings = () => {
  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="profileSettingsPage">
        <PageUnderDevelopment />
      </div>
    </div>
  );
};

export default ProfileSettings;
