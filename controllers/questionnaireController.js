const Questionnaire = require("../db/postgresql/models/questionnaire");
const Question = require("../db/postgresql/models/question");
const MoodEntry = require("../db/postgresql/models/moodEntry");
const MoodResponse = require("../db/postgresql/models/moodResponse");
const QuestionnaireSubmission = require("../db/postgresql/models/questionnaireSubmission");

const { date } = require("joi");
const scoringLogic = require("../services/scoringLogic");

const getQuestionnaires = async (req, res) => {
  try {
    const questionnaires = await Questionnaire.findAll({
      include: {
        model: Question,
        attributes: ["questionID", "text", "type"],
      },
    });
    res.status(200).json(questionnaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkIfSubmitted = async (req, res) => {
  try {
    const { userID, timeOfDay } = req.params;

    const submission = await QuestionnaireSubmission.findOne({
      where: {
        userID,
        timeOfDay,
      },
    });

    if (submission) {
      return res.status(200).json({ submitted: true });
    }

    return res.status(200).json({ submitted: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const submitQuestionnaire = async (req, res) => {
  try {
    const { userID, questionnaireID, timeOfDay, responses } = req.body;

    const existingSubmission = await QuestionnaireSubmission.findOne({
      where: {
        userID,
        questionnaireID,
        timeOfDay,
      },
    });

    if (existingSubmission) {
      return res
        .status(400)
        .json({ message: "You have already completed this questionnaire." });
    }

    const { moodScore, energyLevel, stressLevel } =
      scoringLogic.calculateScores(responses);
    console.log("Scores calculated: ", moodScore, energyLevel, stressLevel);

    await QuestionnaireSubmission.create({
      userID,
      questionnaireID,
      timeOfDay,
    });

    const moodEntry = await MoodEntry.create({
      userID,
      questionnaireID,
      date: new Date(),
      timeOfDay,
      moodScore,
      energyLevel,
      stressLevel,
    });

    for (const response of responses) {
      await MoodResponse.create({
        entryID: moodEntry.entryID,
        questionID: response.questionID,
        answer: response.answer,
      });
    }

    console.log("Received responses: ", responses);
    console.log("Calculated scores: ", moodScore, energyLevel, stressLevel);

    res.status(201).json({ message: "Questionnaire submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuestionnaireByTimeOfDay = async (req, res) => {
  try {
    const { timeOfDay } = req.params;

    const questionnaire = await Questionnaire.findOne({
      where: { timeOfDay },
      include: {
        model: Question,
        attributes: ["questionID", "text", "type", "options"],
      },
    });

    if (!questionnaire) {
      return res.status(404).json({ message: "Questionnaire not found" });
    }

    return res.status(200).json(questionnaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQuestionnaires,
  checkIfSubmitted,
  submitQuestionnaire,
  getQuestionnaireByTimeOfDay,
};
