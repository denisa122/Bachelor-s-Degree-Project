const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../setup');


const MoodEntry = sequelize.define('MoodEntry', {
    entryID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    timeOfDay: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    moodScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 10,
        },
    },
    energyLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 10,
        },
    },
    stressLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0,
            max: 10,
        },
    },
}, {
    tableName: 'mood_entries', 
    timestamps: false, 
});

const User = require('./user');

// Associations
MoodEntry.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});

module.exports = MoodEntry;