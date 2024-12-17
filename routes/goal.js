const router = require('express').Router();
const goalController = require('../controllers/goalController');

// Add goal
// api/goals
router.post('/', goalController.addGoal);

// Get today's goals
// /api/goals/today
router.get('/today', goalController.getTodaysGoals);

module.exports = router;