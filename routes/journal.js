const router = require('express').Router();
const { model } = require('mongoose');
const journalController = require('../controllers/journalController');

// Save journal entry
// api/journal/entries
router.post('/entries', journalController.saveJournalEntry);

// Fetch journal entries by userID
// api/journal/entries/:userID
router.get('/entries/:userID', journalController.getJournalEntries);

module.exports = router;