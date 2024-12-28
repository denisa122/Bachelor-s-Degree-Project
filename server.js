require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectToMongoDB = require("./db/mongodb/setup");
const { connectToPostgreSQLDB } = require("./db/postgresql/setup");

// Import Sequelize models
const models = require("./db/postgresql/models");
const {sequelize} = models;

const { start } = require("repl");

// Initialize Express
const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const startServer = async () => {
  try {
    await connectToMongoDB();
    await connectToPostgreSQLDB();

    // Sync the Sequelize models with the database
    await sequelize.sync({ force: process.env.NODE_ENV === 'test' }); // can change this to `force: true` during development
    console.log("All Sequelize models were synchronized successfully.");

    const PORT = process.env.PORT || 5000;

    // Start the server after successful connection to the databases
    app.listen(PORT, function () {
      console.log(`Server is running on Port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error during database connection", error);
  }
};

startServer();

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const journalRoutes = require("./routes/journal");
const questionnaireRoutes = require("./routes/questionnaire");
const goalRoutes = require("./routes/goal");
const insightsRoutes = require("./routes/insights");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/questionnaires", questionnaireRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/insights", insightsRoutes);

module.exports = app;
