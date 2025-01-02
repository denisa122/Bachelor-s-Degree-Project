require("dotenv-flow").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const connectToMongoDB = require("./db/mongodb/setup");
const { connectToPostgreSQLDB } = require("./db/postgresql/setup");

// Import Sequelize models
const models = require("./db/postgresql/models");
const { sequelize } = models;

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

const seedDatabase = async () => {
  try {
    const seedSQL = fs.readFileSync("./db/postgresql/seed_data.sql", "utf8");
    await sequelize.query(seedSQL);
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data", error);
  }
};

const checkIfDataSeeded = async () => {
  try {
    const res = await await sequelize.query(
      "SELECT COUNT(*) FROM questionnaires"
    );
    const count = parseInt(res[0].count);
    return count > 0;
  } catch (error) {
    console.error("Error checking if data is seeded:", error);
    return false;
  }
};

const startServer = async () => {
  try {
    await connectToMongoDB();
    await connectToPostgreSQLDB();

    if (process.env.NODE_ENV !== "test") {
      const isSeeded = await checkIfDataSeeded();
      if (!isSeeded) {
        await seedDatabase();
      }
    }

    // Sync the Sequelize models with the database
    await sequelize.sync({ force: process.env.NODE_ENV === "test" });
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
