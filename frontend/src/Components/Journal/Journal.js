import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./Journal.css";

// Icons & images
import Logo from "../../assets/logo.png";
import JournalImage from "../../assets/journal.png";
import WriteIcon from "../../assets/write-icon.svg";
import MoreIcon from "../../assets/more-icon.svg";

import Navigation from "../Navigation/Navigation";
import JournalEntry from "./JournalEntry";

const Journal = ({ userID }) => {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);

  useEffect (() => {
    const fetchEntries = async() => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/journal/entries/${userID}`
        );
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchEntries();
  }, [userID]);

  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="journalPage">
        <div className="headerJournalPage">
          <img src={Logo} alt="Logo" className="logoJournal"></img>
          <h1 className="text-3xl mb-1 mt-2">Your Journal</h1>
          <h2 className="italic text-lg">
            A space to express, explore and grow
          </h2>
        </div>

        <div className="mt-[40px] flex flex-row items-center">
          <img src={JournalImage} alt="Journal" className="journalImage"></img>
          <div className="flex flex-col">
            <h2 className="sectionTitle !mb-2.5">Capture Your Thoughts</h2>
            <p className="sectionText">
              Journaling is more than just writing—it’s a powerful way to
              understand your emotions, gain clarity, and embrace personal
              growth. Each word you write becomes part of your journey, helping
              you reflect on the past, focus on the present, and plan for the
              future. Whether it’s a fleeting thought, a big idea, or a simple
              reflection, your journal is a space that’s entirely yours. Take
              the first step and discover the joy of putting your thoughts into
              words.
            </p>
            <a
              href="/write"
              className="flex flex-row items-center buttonWithBorder w-[120px]"
            >
              <img
                src={WriteIcon}
                alt="journal writing icon"
                className="buttonIconJournal"
              ></img>
              <button className="text-sm">Start writing</button>
            </a>
          </div>
        </div>

        <div className="sectionLeft journalEntriesSection mt-10">
          <h1 className="sectionTitle">
            Explore your previous journal entries
          </h1>
          <div className="flex flex-row items-baseline">
            <p className="sectionText mr-1.5">December 2024</p>
            <img src={MoreIcon} alt="more icon"></img>
          </div>

          <div className="entries">
            {entries.map((entry) => (
              <JournalEntry
                key={entry._id}
                date={new Date(entry.timestamp).toLocaleDateString()}
                entry={entry.content}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
