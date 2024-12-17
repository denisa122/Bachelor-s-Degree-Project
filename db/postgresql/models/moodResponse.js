const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../setup");

const MoodResponse = sequelize.define(
  "MoodResponse",
  {
    responseID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "mood_responses",
    timestamps: false,
  }
);

module.exports = MoodResponse;
