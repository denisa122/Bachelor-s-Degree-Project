const router = require('express').Router();
const { model } = require('mongoose');
const journalController = require('../controllers/journalController');

// Save journal entry
// api/journal/entries
router.post('/entries', journalController.saveJournalEntry);

module.exports = router;