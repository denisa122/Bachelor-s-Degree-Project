require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const { Sequelize } = require("sequelize");

const databaseUrl = process.env.POSTGRESQL_DB_URL;

const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

const connectToPostgreSQLDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Successfully connected to PostgreSQL!");

    // Sync models to the database
    await sequelize.sync({
      force: process.env.NODE_ENV === "test",
      alter: process.env.NODE_ENV !== "test",
    });
    console.log("All sequelize models were synchronized successfully.");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
};

module.exports = {
  connectToPostgreSQLDB,
  sequelize,
};
