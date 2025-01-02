const router = require("express").Router();
const goalController = require("../controllers/goalController");

const { verifyToken } = require("../middlewares/tokenVerification");

// Add goal
// api/goals
router.post("/", verifyToken, goalController.addGoal);

// Get today's goals
// /api/goals/today
router.get("/today/:userID", verifyToken, goalController.getTodaysGoals);

// Update goal completion
// /api/goals/:id
router.put("/:id", verifyToken, goalController.updateGoalCompleted);

module.exports = router;
