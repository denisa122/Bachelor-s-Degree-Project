const router = require('express').Router();
const questionnaireController = require('../controllers/questionnaireController');

// Get all questionnaires
// api/questionnaires
router.get('/', questionnaireController.getQuestionnaires);

// Get questionnaire by time of day
// api.questionnaires/:timeOfDay
router.get('/:timeOfDay', questionnaireController.getQuestionnaireByTimeOfDay);

// Submit completed questionnaire
// api/questionnaires/submit
router.post('/submit', questionnaireController.submitQuestionnaire);

module.exports = router;