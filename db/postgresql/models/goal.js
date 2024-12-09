const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../setup');

const { on } = require('events');

const Goal = sequelize.define('Goal', {
    goalID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'goals', 
    timestamps: false, 
});


const User = require('./user');

// Associations
Goal.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});

module.exports = Goal;