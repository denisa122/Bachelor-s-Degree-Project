import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import fetchEmoji from "../../services/fetchEmoji";

import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

import "./Insights.css";

// Icons & images
import Logo from "../../assets/logo.png";
import InsightsImage from "../../assets/insights.png";
// import Filter from "../../assets/filter-icon.svg";
// import PatternsIcon from "../../assets/insights-icon-small.svg";
// import Emoji from "../../assets/emoji.svg";

import Navigation from "../Navigation/Navigation";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const Insights = ({ userID }) => {
  const [moodData, setMoodData] = useState([]);
  const [sentimentAnalysis, setSentimentAnalysis] = useState([]);
  const [mostUsedSentiments, setMostUsedSentiments] = useState([]);
  const [sentimentPercentages, setSentimentPercentages] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
  });
  const [emojis, setEmojis] = useState([]);
  const emojisFetchedRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchMoodData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/insights/mood-trends/${userID}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setMoodData(response.data.moodTrends);
      } catch (error) {
        console.error("Error fetching mood data: ", error);
      }
    };

    const fetchSentimentAnalysis = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/insights/sentiment-analysis/${userID}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setSentimentAnalysis(response.data.sentimentAnalysisResults);
        setSentimentPercentages(response.data.sentimentPercentages);
      } catch (error) {
        console.error("Error fetching sentiment analysis data: ", error);
      }
    };

    const fetchMostUsedSentiments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/insights/most-used-sentiments/${userID}`,
          {
            headers: {
              "auth-token": token,
            },
          }
        );
        setMostUsedSentiments(response.data.mostUsedSentiments);
      } catch (error) {
        console.error("Error fetching most used sentiments data: ", error);
      }
    };

    fetchMoodData();
    fetchSentimentAnalysis();
    fetchMostUsedSentiments();
  }, [userID]);

  useEffect(() => {
    if (mostUsedSentiments.length > 0 && !emojisFetchedRef.current) {
      const fetchEmojis = async () => {
        const emojiPromises = mostUsedSentiments.map(async (sentiment) => {
          const emoji = await fetchEmoji(sentiment.toLowerCase());
          return { [sentiment]: emoji };
        });

        const emojiResults = await Promise.all(emojiPromises);
        const emojiObject = Object.assign({}, ...emojiResults);
        setEmojis(emojiObject);
      };

      fetchEmojis();
      emojisFetchedRef.current = true;
    }
  }, [mostUsedSentiments]);

  const pieChartData = {
    labels: ["Positive", "Negative", "Neutral"],
    datasets: [
      {
        data: [
          sentimentPercentages.positive,
          sentimentPercentages.negative,
          sentimentPercentages.neutral,
        ],
        backgroundColor: ["#66FF99", "#FFCAD4", "#EECFA1"],
        hoverBackgroundColor: ["#4DFF80", "#FF9FB4", "#D4A86E"],
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
  };

  const linearChartData = {
    labels: moodData.map((entry) => entry.date),
    datasets: [
      {
        label: "Mood Score",
        data: moodData.map((entry) => entry.moodScore),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Energy Level",
        data: moodData.map((entry) => entry.energyLevel),
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
      {
        label: "Stress Level",
        data: moodData.map((entry) => entry.stressLevel),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-row">
      <Navigation />
      <div className="insightsPage">
        <div className="headerInsightsPage">
          <img src={Logo} alt="Logo" className="logoJournal"></img>
          <h1 className="text-3xl mb-1 mt-2">Your Insights</h1>
          <h2 className="italic text-lg">
            Uncover patterns, gain clarity, and understand your emotional
            journey
          </h2>
        </div>

        <div className="mt-[40px] flex flex-row items-center">
          <img
            src={InsightsImage}
            alt="insights image"
            className="journalImage"
          ></img>
          <div className="flex flex-col">
            <h2 className="sectionTitle !mb-2.5">
              Understand Your Emotional Landscape
            </h2>
            <p className="sectionText">
              Your emotions and actions tell a story—one that’s uniquely yours.
              The Insights page brings together data from your journal entries,
              mood tracker questionnaires, and daily goals to provide a
              comprehensive view of your mental and emotional well-being.
              Explore your mood trends over time, uncover patterns in your
              behavior, and identify the most common sentiments that shape your
              days. With these insights, you’ll gain a deeper understanding of
              your journey and discover actionable ways to grow, improve, and
              thrive. Let your reflections guide you toward a brighter, more
              balanced tomorrow.
            </p>
          </div>
        </div>

        <div className="section moodTrendsSection">
          <h1 className="sectionTitle mt-[60px]">Mood Trends</h1>
          <p className="sectionText pb-5">
            In this section, you can explore how your mood has evolved over
            time. By reviewing the results of your mood questionnaires—taken
            throughout the day and over various periods—you can identify
            patterns, fluctuations, and emotional shifts.
          </p>
          <div className="moodTrendsImg">
            <Line data={linearChartData} options={lineChartOptions} />
          </div>
        </div>

        <div className="section sentimentAnalysisSection">
          <h1 className="sectionTitle">Sentiment Analysis</h1>
          <p className="sectionText pb-5">
            Gain deeper insights into the emotions behind your journal entries.
            See how your mood shifts and what words reflect your inner state.
          </p>
          <div className="sentimentPieChart">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
          <p className="sectionText mt-8 pb-5 !text-lg font-medium">
            Most used sentiments over the last 7 days
          </p>
          <div className="emotions">
            {mostUsedSentiments && mostUsedSentiments.length > 0 ? (
              mostUsedSentiments.map((sentiment, index) => (
                <div key={index} className="flex flex-col">
                  <span className="emotionEmoji">{emojis[sentiment]}</span>
                  <p className="emotionText">{sentiment}</p>
                </div>
              ))
            ) : (
              <p>No sentiments available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
