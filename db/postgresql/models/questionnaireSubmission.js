const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../setup");

const QuestionnaireSubmission = sequelize.define(
    "QuestionnaireSubmission",
    {
        submissionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        questionnaireID: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timeOfDay: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        submittedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW,
        },
    },
    {
        tableName: "questionnaire_submissions",
        timestamps: true,
    }
);

module.exports = QuestionnaireSubmission;