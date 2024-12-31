import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./Journal.css";

// Icons & images
import Logo from "../../assets/logo.png";
import JournalImage from "../../assets/journal.png";
import WriteIcon from "../../assets/write-icon.svg";

import Navigation from "../Navigation/Navigation";
import JournalEntry from "./JournalEntry";

const Journal = ({ userID }) => {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const [groupedEntries, setGroupedEntries] = useState({});
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchEntries = async () => {
      if (!userID) return;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/journal/entries/${userID}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        const fetchedEntries = response.data;
        setEntries(fetchedEntries);

        // Group by month and year
        const grouped = fetchedEntries.reduce((acc, entry) => {
          const date = new Date(entry.timestamp);
          const year = date.getFullYear();
          const month = date.toLocaleString("default", { month: "long" });

          const key = `${month} ${year}`;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(entry);
          return acc;
        }, {});

        setGroupedEntries(grouped);

        // Set selected month and year to the most recent by default
        const keys = Object.keys(grouped);
        if (keys.length > 0) {
          const [mostRecent] = keys;
          const [recentMonth, recentYear] = mostRecent.split(" ");
          setSelectedMonth(recentMonth);
          setSelectedYear(recentYear);
        }
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchEntries();
  }, [userID]);

  const handleMonthYearChange = (month, year) => {
    setSelectedMonth(month);
    setSelectedYear(year);
  };

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

        <div className="section journalEntriesSection mt-[60px]">
          <h1 className="sectionTitle">
            Explore your previous journal entries
          </h1>

          {Object.keys(groupedEntries).length > 0 ? (
            <>
              <div className="flex flex-row items-baseline sectionText">
                <select
                  value={`${selectedMonth} ${selectedYear}`}
                  onChange={(e) => {
                    const [month, year] = e.target.value.split(" ");
                    handleMonthYearChange(month, year);
                  }}
                >
                  {Object.keys(groupedEntries).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              </div>

              <div className="entries">
                {groupedEntries[`${selectedMonth} ${selectedYear}`]?.map(
                  (entry) => (
                    <JournalEntry
                      key={entry._id}
                      date={new Date(entry.timestamp).toLocaleDateString(
                        "en-US",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                      entry={entry.content}
                      sentimentScore={entry.sentimentScore}
                    />
                  )
                )}
              </div>
            </>
          ) : (
            <p className="noEntriesMessage">You have no journal entries.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Journal;
