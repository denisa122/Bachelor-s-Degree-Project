const { Sequelize, DataTypes } = require('sequelize');
const {sequelize} = require('../setup');

const { table } = require('console');

const JournalMetadata = sequelize.define('JournalMetadata', {
    journalMetadataID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    wordCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    sentimentScore: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },
}, {
    tableName: "journal_metadata",
    timestamps: false,
});

const User = require('./user');

// Associations
JournalMetadata.belongsTo(User, {foreignKey: 'userID', onDelete: 'CASCADE'});

module.exports = JournalMetadata;