const router = require('express').Router();
const { model } = require('mongoose');
const journalController = require('../controllers/journalController');

const {verifyToken} = require('../middlewares/tokenVerification');

// Save journal entry
// api/journal/entries
router.post('/entries', verifyToken, journalController.saveJournalEntry);

// Fetch journal entries by userID
// api/journal/entries/:userID
router.get('/entries/:userID', verifyToken, journalController.getJournalEntries);

module.exports = router;