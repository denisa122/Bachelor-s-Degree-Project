const {sequelize} = require("../setup");

const Goal = require("./goal");
const JournalMetadata = require("./journalMetadata");
const MoodEntry = require("./moodEntry");
const MoodResponse = require("./moodResponse");
const Question = require("./question");
const Questionnaire = require("./questionnaire");
const User = require("./user");
const QuestionnaireSubmission = require("./questionnaireSubmission");

// Associations
// User - Goal
Goal.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});
User.hasMany(Goal, {foreignKey: 'userID', onDelete: 'CASCADE'});

// User - JournalMetadata
JournalMetadata.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});
User.hasMany(JournalMetadata, {foreignKey: 'userID', onDelete: 'CASCADE'});

// User - MoodEntry 
MoodEntry.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});
User.hasMany(MoodEntry, {foreignKey: 'userID', onDelete: 'CASCADE'});

// MoodEntry - MoodResponse
MoodResponse.belongsTo(MoodEntry, {foreignKey: 'entryID', onDelete: 'CASCADE'});
MoodEntry.hasMany(MoodResponse, {foreignKey: 'entryID', onDelete: 'CASCADE'});

// Question - MoodResponse
MoodResponse.belongsTo(Question, {foreignKey: 'questionID', onDelete: 'CASCADE'});
Question.hasMany(MoodResponse, {foreignKey: 'questionID', onDelete: 'CASCADE'});

// Questionnaire - Question
Question.belongsTo(Questionnaire, {foreignKey: "questionnaireID", onDelete: "CASCADE"});
Questionnaire.hasMany(Question, {foreignKey: "questionnaireID", onDelete: "CASCADE"});

// User - QuestionnaireSubmission
QuestionnaireSubmission.belongsTo(User, {foreignKey: "userID", onDelete: "CASCADE"});
User.hasMany(QuestionnaireSubmission, {foreignKey: "userID", onDelete: "CASCADE"});

// Questionnaire - QuestionnaireSubmission
QuestionnaireSubmission.belongsTo(Questionnaire, {foreignKey: "questionnaireID", onDelete: "CASCADE"});
Questionnaire.hasMany(QuestionnaireSubmission, {foreignKey: "questionnaireID", onDelete: "CASCADE"});

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
