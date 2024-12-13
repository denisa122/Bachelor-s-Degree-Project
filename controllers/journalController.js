const mongoose = require('mongoose');
const {JournalEntry} = require('../db/mongodb/models/journalEntryModel');
const JournalMetadata = require('../db/postgresql/models/journalMetadata');
const { Op } = require('sequelize');

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
        const sentimentScore = 0; // PLaceholder for now; use a sentiment analysis library later

        const journalMetadata = await JournalMetadata.create({
            userID,
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

module.exports = {
    saveJournalEntry,
}