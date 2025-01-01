import React from "react";

import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Privacy Policy</h1>
      <div>
        <ul>
          <li>
            <b>Data We Collect</b> <br></br> First name, email address, goals,
            journal entries.
          </li>
          <li>
            <b>Purpose</b> <br></br> We use your data to provide personalized
            features such as daily goals, personalized insights and journaling.
          </li>
          <li>
            <b>Storage Duration</b> <br></br> Your data is stored as long as you
            have an active account. You can request deletion at any time.
          </li>
          <li>
            <b>Your Rights</b> <br></br> You have the right to access, delete,
            or modify your data. For requests, contact us at
            mindscribesupport@gmail.com.
          </li>
          <li>
            <b>Security Measures</b> <br></br> We encrypt your passwords and
            secure communication with HTTPS.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
