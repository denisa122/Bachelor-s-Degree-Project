const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../setup");

const MoodEntry = sequelize.define(
  "MoodEntry",
  {
    entryID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    timeOfDay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moodScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    energyLevel: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    stressLevel: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    tableName: "mood_entries",
    timestamps: false,
  }
);

module.exports = MoodEntry;
