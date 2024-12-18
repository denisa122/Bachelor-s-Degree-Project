import React from "react";

import "./Journal.css";

import Emoji from "../../assets/emoji.svg";

const JournalEntry = ({ date, entry, sentimentScore }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sentimentLabel =
    sentimentScore > 0
      ? "Positive 😊"
      : sentimentScore < 0
      ? "Negative 😔"
      : "Neutral 😐";

      console.log("Sentiment score front end: ", sentimentScore);

  return (
    <div className="journalEntry">
      <div className="flex flex-row items-baseline justify-between">
        <h1 className="title !text-lg font-medium mb-2">{formattedDate}</h1>
        <span className="sentimentLabel">{sentimentLabel}</span>
      </div>

      <p className="entry mb-4">{entry}</p>
    </div>
  );
};

export default JournalEntry;
