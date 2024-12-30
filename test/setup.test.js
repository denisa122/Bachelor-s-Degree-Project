process.env.NODE_ENV = "test";

const { sequelize } = require("../db/postgresql/setup");

const User = require("../db/postgresql/models/user");
const Goal = require("../db/postgresql/models/goal");
const JournalMetadata = require("../db/postgresql/models/journalMetadata");
const MoodEntry = require("../db/postgresql/models/moodEntry");
const MoodResponse = require("../db/postgresql/models/moodResponse");
const Questionnaire = require("../db/postgresql/models/questionnaire");
const Question = require("../db/postgresql/models/question");
const QuestionnaireSubmission = require("../db/postgresql/models/questionnaireSubmission");

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database tables recreated successfully.");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

// Clean the DB before and after tests
before(async () => {
  await syncDatabase();

  await sequelize.sync({ force: true });
  await User.destroy({ where: {} });
  await Goal.destroy({ where: {} });
});

after(async () => {
  await User.destroy({ where: {} });
  await Goal.destroy({ where: {} });
});
