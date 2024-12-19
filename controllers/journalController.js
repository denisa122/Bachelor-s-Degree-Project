const mongoose = require("mongoose");
const { JournalEntry } = require("../db/mongodb/models/journalEntryModel");
const JournalMetadata = require("../db/postgresql/models/journalMetadata");
const SentimentAnalysis = require("../db/mongodb/models/sentimentAnalysisModel");
const { Op } = require("sequelize");

const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// sentiment.addDictionary({
//   routine: 0,
//   typical: 0,
//   normal: 0,
//   standard: 0,
// });

const getWordCount = (content) => {
  return content.split(/\s+/).length;
};

const saveJournalEntry = async (req, res) => {
  const { userID, content } = req.body;

  try {
    const journalEntry = new JournalEntry({
      userID,
      content,
    });

    await journalEntry.save();

    // Metadata
    const wordCount = getWordCount(content);
    const sentimentResult = sentiment.analyze(content);
    const sentimentScore = sentimentResult.score;

    await SentimentAnalysis.create({
      entryID: journalEntry._id,
      sentimentScore,
    });

    const journalMetadata = await JournalMetadata.create({
      userID,
      journalentryid: journalEntry._id.toString(),
      wordCount,
      sentimentScore,
    });

    res.status(201).json({
      message: "Journal entry saved successfully!",
      journalEntry,
      journalMetadata,
    });
  } catch (error) {
    console.error("Error saving journal entry:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const getJournalEntries = async (req, res) => {
  const { userID } = req.params;

  try {
    const journalEntries = await JournalEntry.find({ userID }).sort({
      timestamp: -1,
    });
    const journalEntryIDs = journalEntries.map((entry) => entry._id.toString());
    const metadata = await JournalMetadata.findAll({
      where: {
        userID,
        journalentryid: {
          [Op.in]: journalEntryIDs,
        },
      },
    });

    const metadataMap = metadata.reduce((acc, meta) => {
      acc[meta.journalentryid] = meta;
      return acc;
    }, {});

    const combinedEntries = journalEntries.map((entry) => {
      const entryID = entry._id.toString();
      return {
        ...entry.toObject(),
        sentimentScore: metadataMap[entryID]?.sentimentScore || 0,
      };
    });

    res.status(200).json(combinedEntries);
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
};

module.exports = {
  saveJournalEntry,
  getJournalEntries,
};
