const Questionnaire = require ('../db/postgresql/models/questionnaire');
const Question = require ('../db/postgresql/models/question');
const MoodEntry = require ('../db/postgresql/models/moodEntry');
const MoodResponse = require ('../db/postgresql/models/moodResponse');
const { date } = require('joi');

const getQuestionnaires = async (req, res) => {
    try {
        const questionnaires = await Questionnaire.findAll({
            include: {
                model: Question,
                attributes: ['questionID', 'text', 'type'],
            },
        });
        res.status(200).json(questionnaires);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.submitQuestionnaire = async (req, res) => {
    try {
        const {userID, questionnaireID, moodScore, energyLevel, stressLevel, responses} = req.body;

        const moodEntry = await MoodEntry.create({
            userID,
            questionnaireID,
            date: new Date(),
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

        res.status(201).json({ message: 'Questionnaire submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getQuestionnaireByTimeOfDay = async (req, res) => {
    try {
        const { timeOfDay } = req.params;
        console.log("Fetching questionnaire for time of day: ", timeOfDay);

        const questionnaire = await Questionnaire.findOne({
            where: { timeOfDay },
            include: {
                model: Question,
                attributes: ['questionID', 'text', 'type'],
            },
        });

        if (!questionnaire) {
            console.log("Questionnaire not found for time of day: ", timeOfDay);
            return res.status(404).json({ message: 'Questionnaire not found' });
        }

        console.log("Questionnaire found: ", questionnaire);
        return res.status(200).json(questionnaire);
    } catch (error) {
        console.error("Error fetching questionnaire by time of day: ", error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getQuestionnaires,
    getQuestionnaireByTimeOfDay,
};
