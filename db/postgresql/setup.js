const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize(`postgres://${process.env.POSTGRESQL_DB_USER}:${process.env.POSTGRESQL_DB_PASSWORD}@${process.env.POSTGRESQL_DB_HOST}:${process.env.POSTGRESQL_DB_PORT}/${process.env.POSTGRESQL_DB_NAME}`, {
    dialect: 'postgres',
});


const connectToPostgreSQLDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to PostgreSQL!');

        // Sync models to the database
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