const router = require('express').Router();
const insightsController = require('../controllers/insightsController');

const {verifyToken} = require('../middlewares/tokenVerification');

// Get sentiment analysis
// api/insights/sentiment-analysis/:userID
router.get('/sentiment-analysis/:userID', verifyToken, insightsController.getSentimentAnalysis);

// Get most used sentiments in the last 7 days
// /api/insights/most-used-sentiments/:userID
router.get('/most-used-sentiments/:userID', verifyToken, insightsController.getMostUsedSentimentsLast7Days);

// Get mood trends
// /api/insights/mood-trends/:userID
router.get('/mood-trends/:userID', verifyToken, insightsController.getMoodTrends);

module.exports = router;