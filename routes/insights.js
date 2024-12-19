const router = require('express').Router();
const insightsController = require('../controllers/insightsController');

// Get sentiment analysis
// api/insights/sentiment-analysis/:userID
router.get('/sentiment-analysis/:userID', insightsController.getSentimentAnalysis);

// Get most used sentiments in the last 7 days
// /api/insights/most-used-sentiments/:userID
router.get('/most-used-sentiments/:userID', insightsController.getMostUsedSentimentsLast7Days);

module.exports = router;