const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../setup");

const Question = sequelize.define(
  "Question",
  {
    questionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    options: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "questions",
    timestamps: false,
  }
);

module.exports = Question;
