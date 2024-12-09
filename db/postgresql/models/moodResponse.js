const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../setup');

const MoodResponse = sequelize.define('MoodResponse', {
    responseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'mood_responses', 
    timestamps: false, 
});

const MoodEntry = require('./moodEntry');
const Question = require('./question');

// Associations
MoodResponse.belongsTo(MoodEntry, {foreignKey: 'entryID', onDelete: 'CASCADE'});
MoodResponse.belongsTo(Question, {foreignKey: 'questionID', onDelete: 'CASCADE'});

module.exports = MoodResponse;

