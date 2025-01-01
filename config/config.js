require("dotenv").config(); // Make sure .env is loaded
const { Sequelize } = require("sequelize");

const databaseUrl = process.env.POSTGRESQL_DB_URL;

module.exports = {
  development: {
    use_env_variable: "POSTGRESQL_DB_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
