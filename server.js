require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectToMongoDB = require("./db/mongodb/setup");
const { connectToPostgreSQLDB, sequelize } = require("./db/postgresql/setup");

// Import Sequelize models
const Goal = require("./db/postgresql/models/goal");
const JournalMetadata = require("./db/postgresql/models/journalMetadata");
const MoodEntry = require("./db/postgresql/models/moodEntry");
const MoodResponse = require("./db/postgresql/models/moodResponse");
const Question = require("./db/postgresql/models/question");
const Questionnaire = require("./db/postgresql/models/questionnaire");
const User = require("./db/postgresql/models/user");

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
    await sequelize.sync({ force: false }); // can change this to `force: true` during development
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

app.use("/api/auth", authRoutes);

module.exports = app;
