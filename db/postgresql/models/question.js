const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../setup');

const Question = sequelize.define('Question', {
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
}, {
    tableName: 'questions', 
    timestamps: false, 
});


const Questionnaire = require('./questionnaire');

// Associations
Question.belongsTo(Questionnaire, {foreignKey: 'questionnaireID', onDelete: 'CASCADE'});

module.exports = Question;