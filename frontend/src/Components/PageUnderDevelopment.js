import React from "react";
import "./PageUnderDevelopment.css";

const PageUnderDevelopment = () => {
  return (
    <div className="underDevelopmentPage">
      <div className="constructionBox">
        <h1 className="constructionTitle">Page Under Construction</h1>
        <p className="constructionText">
          We’re working hard to bring you something amazing! Please check back
          at a later time.
        </p>
        <div className="progressBar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};

export default PageUnderDevelopment;
