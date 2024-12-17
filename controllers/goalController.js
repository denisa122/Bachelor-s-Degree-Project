const Goal = require("../db/postgresql/models/goal");

const addGoal = async (req, res) => {
  try {
    const { text } = req.body;
    const date = new Date().toISOString().split("T")[0];

    if (!text) {
      return res.status(400).json({ message: "Goal text is required." });
    }

    const newGoal = await Goal.create({
      date,
      text,
      completed: false,
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

module.exports = {
  addGoal,
  getTodaysGoals,
};
