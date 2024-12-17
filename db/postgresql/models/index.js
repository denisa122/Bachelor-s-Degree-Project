const {sequelize} = require("../setup");

const Goal = require("./goal");
const JournalMetadata = require("./journalMetadata");
const MoodEntry = require("./moodEntry");
const MoodResponse = require("./moodResponse");
const Question = require("./question");
const Questionnaire = require("./questionnaire");
const User = require("./user");

// Associations
Questionnaire.hasMany(Question, {foreignKey: "questionnaireID", onDelete: "CASCADE"});
Question.belongsTo(Questionnaire, {foreignKey: "questionnaireID", onDelete: "CASCADE"});

// Add more later

module.exports = {
    sequelize,
    Goal,
    JournalMetadata,
    MoodEntry,
    MoodResponse,
    Question,
    Questionnaire,
    User
};
