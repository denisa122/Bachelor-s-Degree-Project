const { JournalEntry } = require("../db/mongodb/models/journalEntryModel");
const SentimentAnalysis = require("../db/mongodb/models/sentimentAnalysisModel");
const { Op } = require("sequelize");
const Sentiment = require("sentiment");
const sentiment = new Sentiment();

const getSentimentAnalysis = async (req, res) => {
  const { userID } = req.params;

  try {
    const journalEntries = await JournalEntry.find({ userID }).sort({
      timestamp: -1,
    });

    if (!journalEntries || journalEntries.length === 0) {
      return res.status(404).json({
        message: "No journal entries found for this user.",
      });
    }

    const sentimentData = await SentimentAnalysis.find({
      entryID: { $in: journalEntries.map((entry) => entry._id) },
    }).sort({ analysisDate: -1 });

    if (!sentimentData || sentimentData.length === 0) {
      return res.status(404).json({
        message: "No sentiment analysis found for this user.",
      });
    }

    const sentimentAnalysisResults = sentimentData.map((entry) => ({
      entryID: entry.entryID,
      sentimentScore: entry.sentimentScore,
      analysisDate: entry.analysisDate,
    }));

    res.status(200).json({
      message: "Sentiment analysis retrieved successfully.",
      sentimentAnalysisResults,
    });
  } catch (error) {
    console.error("Error fetching sentiment analysis: ", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const getMostUsedSentimentsLast7Days = async (req, res) => {
  const { userID } = req.params;

  try {
    // Get journal entries from the last 7 days
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

module.exports = {
  getSentimentAnalysis,
  getMostUsedSentimentsLast7Days,
};
