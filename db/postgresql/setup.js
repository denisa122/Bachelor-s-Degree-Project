require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const { Sequelize } = require("sequelize");

let databaseUrl;

if (process.env.NODE_ENV === "test") {
  databaseUrl = `postgres://${process.env.POSTGRESQL_DB_USER}:${process.env.POSTGRESQL_DB_PASSWORD}@${process.env.POSTGRESQL_DB_HOST}:${process.env.POSTGRESQL_DB_PORT}/${process.env.POSTGRESQL_DB_NAME}`;
} else {
  databaseUrl = process.env.POSTGRESQL_DB_URL;
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
});

const connectToPostgreSQLDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to PostgreSQL!");

    // Sync models to the database
    await sequelize.sync({ force: process.env.NODE_ENV === "test" }); // Change `force: false` to `force: true` for recreating tables
    console.log("All sequelize models were synchronized successfully.");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
};

module.exports = {
  connectToPostgreSQLDB,
  sequelize,
};
