const router = require('express').Router();
const questionnaireController = require('../controllers/questionnaireController');

const {verifyToken} = require('../middlewares/tokenVerification');

// Get all questionnaires
// api/questionnaires
router.get('/', verifyToken, questionnaireController.getQuestionnaires);

// Check if user has submitted questionnaire for time of day
// api/questionnaires/check/:userID/:timeOfDay
router.get('/check/:userID/:timeOfDay', verifyToken, questionnaireController.checkIfSubmitted);

// Get questionnaire by time of day
// api.questionnaires/:timeOfDay
router.get('/:timeOfDay', verifyToken, questionnaireController.getQuestionnaireByTimeOfDay);

// Submit completed questionnaire
// api/questionnaires/submit
router.post('/submit', verifyToken, questionnaireController.submitQuestionnaire);

module.exports = router;