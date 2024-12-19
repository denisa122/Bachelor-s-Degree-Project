require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB_NAME,
    host: process.env.POSTGRESQL_DB_HOST,
    dialect: "postgres",
    port: process.env.POSTGRESQL_DB_PORT,
  },
  test: {
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB_NAME,
    host: process.env.POSTGRESQL_DB_HOST,
    dialect: "postgres",
    port: process.env.POSTGRESQL_DB_PORT,
  },
  production: {
    username: process.env.POSTGRESQL_DB_USER,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    database: process.env.POSTGRESQL_DB_NAME,
    host: process.env.POSTGRESQL_DB_HOST,
    dialect: "postgres",
    port: process.env.POSTGRESQL_DB_PORT,
  }
};
