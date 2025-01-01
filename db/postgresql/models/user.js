const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../setup");
const { type } = require("os");

const User = sequelize.define(
  "User",
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateJoined: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    preferences: {
      type: DataTypes.JSON,
    },
    privacyConsent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;
