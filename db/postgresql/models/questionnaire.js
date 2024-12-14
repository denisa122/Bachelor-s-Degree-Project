const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../setup');

const Questionnaire = sequelize.define('Questionnaire', {
    questionnaireID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    timeOfDay: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'questionnaires', 
    timestamps: false, 
});

module.exports = Questionnaire;