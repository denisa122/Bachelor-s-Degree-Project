const { JournalEntry } = require("../db/mongodb/models/journalEntryModel");
const SentimentAnalysis = require("../db/mongodb/models/sentimentAnalysisModel");
const MoodEntry = require("../db/postgresql/models/moodEntry");
const { Op } = require("sequelize");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const getSentimentAnalysis = async (req, res) => {
  const { userID } = req.params;

  try {
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);

    const journalEntries = await JournalEntry.find({
      userID,
      timestamp: { $gte: date7DaysAgo },
    }).sort({ timestamp: -1 });

    if (!journalEntries || journalEntries.length === 0) {
      return res.status(404).json({
        message: "No journal entries found for this user in the last 7 days.",
      });
    }

    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;
    const sentimentData = [];

    for (const entry of journalEntries) {
      const sentimentResult = sentiment.analyze(entry.content);

      let sentimentCategory = "neutral";
      if (sentimentResult.score > 0) {
        sentimentCategory = "positive";
        positiveCount++;
      } else if (sentimentResult.score < 0) {
        sentimentCategory = "negative";
        negativeCount++;
      } else {
        neutralCount++;
      }

      sentimentData.push({
        entryID: entry._id,
        sentimentScore: sentimentResult.score,
        sentimentCategory,
        analysisDate: entry.timestamp,
      });
    }

    const totalEntries = journalEntries.length;
    const positivePercentage = ((positiveCount / totalEntries) * 100).toFixed(
      2
    );
    const negativePercentage = ((negativeCount / totalEntries) * 100).toFixed(
      2
    );
    const neutralPercentage = ((neutralCount / totalEntries) * 100).toFixed(2);

    res.status(200).json({
      message:
        "Sentiment analysis from the last 7 days retrieved successfully.",
      sentimentAnalysisResults: sentimentData,
      sentimentPercentages: {
        positive: positivePercentage,
        negative: negativePercentage,
        neutral: neutralPercentage,
      },
    });
  } catch (error) {
    console.error("Error fetching sentiment analysis: ", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const getMostUsedSentimentsLast7Days = async (req, res) => {
  const { userID } = req.params;

  try {
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);

    const journalEntries = await JournalEntry.find({
      userID,
      timestamp: { $gte: date7DaysAgo },
    });

    // Analyze sentiment of entries
    const sentimentScores = [];

    for (const entry of journalEntries) {
      const sentimentResult = sentiment.analyze(entry.content);
      sentimentScores.push(...sentimentResult.words);
    }

    const wordFrequency = sentimentScores.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {});

    const sortedWords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .map(([word]) => word);

    const mostUsedSentiments = sortedWords.slice(0, 5); // Top 5 most used words

    res.status(200).json({
      message:
        "Most used sentiments in the last 7 days retrieved successfully.",
      mostUsedSentiments,
    });
  } catch (error) {
    console.error("Error fetching most used sentiments:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const getMoodTrends = async (req, res) => {
  const { userID } = req.params;

  try {
    const date7DaysAgo = new Date();
    date7DaysAgo.setDate(date7DaysAgo.getDate() - 7);

    const moodEntries = await MoodEntry.findAll({
      where: {
        userID,
        date: {
          [Op.gte]: date7DaysAgo,
        },
      },
      order: [["date", "ASC"]],
    });

    if (!moodEntries || moodEntries.length === 0) {
      return res.status(404).json({
        message: "No mood entries found for this user in the last 7 days.",
      });
    }

    const groupedMoodData = {};

    moodEntries.forEach((entry) => {
      const dateObject = new Date(entry.date);
      if (isNaN(dateObject)) {
        console.error("Invalid date:", entry.date);
        return;
      }
      const date = dateObject.toISOString().split("T")[0];

      if (!groupedMoodData[date]) {
        groupedMoodData[date] = {
          moodScores: [],
          energyLevels: [],
          stressLevels: [],
        };
      }

      groupedMoodData[date].moodScores.push(entry.moodScore);
      groupedMoodData[date].energyLevels.push(entry.energyLevel);
      groupedMoodData[date].stressLevels.push(entry.stressLevel);
    });

    const moodTrends = Object.keys(groupedMoodData).map((date) => {
      const moodDataForDate = groupedMoodData[date];
      const averageMood = (moodScores) => {
        if (moodScores.length === 0) return null;
        return (
          moodScores.reduce((acc, score) => acc + score, 0) / moodScores.length
        );
      };

      return {
        date,
        moodScore: averageMood(moodDataForDate.moodScores),
        energyLevel: averageMood(moodDataForDate.energyLevels),
        stressLevel: averageMood(moodDataForDate.stressLevels),
      };
    });

    res.status(200).json({
      message: "Mood trends for the last 7 days retrieved successfully.",
      moodTrends,
    });
  } catch (error) {
    console.error("Error fetching mood trends:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  getSentimentAnalysis,
  getMostUsedSentimentsLast7Days,
  getMoodTrends,
};
