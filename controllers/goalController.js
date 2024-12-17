const e = require("cors");
const Goal = require("../db/postgresql/models/goal");

const addGoal = async (req, res) => {
  try {
    const { text, userID } = req.body;
    const date = new Date().toISOString().split("T")[0];

    if (!text) {
      return res.status(400).json({ message: "Goal text is required." });
    }

    if (!userID) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newGoal = await Goal.create({
      date,
      text,
      completed: false,
      userID,
    });

    res.status(201).json(newGoal);
  } catch (error) {
    console.error("Error adding goal: ", error);
    res.status(500).json({ message: "Error adding goal." });
  }
};

const getTodaysGoals = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];
    const goals = await Goal.findAll({
      where: { date },
    });

    res.status(200).json(goals);
  } catch (error) {
    console.error("Error getting today's goals: ", error);
    res.status(500).json({ message: "Error getting today's goals." });
  }
};

const updateGoalCompleted = async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;

    const goal = await Goal.findOne({ where: { goalID: id } });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found." });
    }

    if (goal.completed) {
      return res
        .status(400)
        .json({ message: "Goal is already completed and cannot be changed!" });
    }

    goal.completed = completed;
    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
    console.error("Error marking the goal as completed:", error);
    res.status(500).json({ message: "Error marking the goal as completed." });
  }
};

module.exports = {
  addGoal,
  getTodaysGoals,
  updateGoalCompleted,
};
