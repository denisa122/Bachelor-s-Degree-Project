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
MoodEntry.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});
MoodResponse.belongsTo(MoodEntry, {foreignKey: 'entryID', onDelete: 'CASCADE'});
MoodResponse.belongsTo(Question, {foreignKey: 'questionID', onDelete: 'CASCADE'});
Goal.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});
JournalMetadata.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});
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
