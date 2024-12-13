import React from "react";

import "./Journal.css";

import Emoji from "../../assets/emoji.svg";

const JournalEntry = ({ date, entry }) => {
  return (
    <div className="journalEntry">
      <div className="flex flex-row items-baseline justify-between">
        <h1 className="title !text-lg font-medium mb-2">{date}</h1>
        <img src={Emoji} alt="emoji"></img>
      </div>

      <p className="entry mb-4">{entry}</p>
    </div>
  );
};

export default JournalEntry;
