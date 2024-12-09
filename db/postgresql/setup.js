const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(process.env.POSTGRESQL_DB_NAME, process.env.POSTGRESQL_DB_USER, process.env.POSTGRESQL_DB_PASSWORD, {
    host: process.env.POSTGRESQL_DB_HOST,
    dialect: 'postgres',
});

const connectToPostgreSQLDB = async () => {
    try {
        await pool.connect();
        console.log('Successfully connected to PostgreSQL!');

        // Sync models to the database (creates tables if they don't exist)
        await sequelize.sync({ force: false }); // Change `force: false` to `force: true` for recreating tables
        console.log('All sequelize models were synchronized successfully.');
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
    }
};

module.exports = {
    connectToPostgreSQLDB,
    sequelize
}