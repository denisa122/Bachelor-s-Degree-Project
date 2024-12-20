const router = require('express').Router();
const questionnaireController = require('../controllers/questionnaireController');

const {verifyToken} = require('../middlewares/tokenVerification');

// Get all questionnaires
// api/questionnaires
router.get('/', verifyToken, questionnaireController.getQuestionnaires);

// Get questionnaire by time of day
// api.questionnaires/:timeOfDay
router.get('/:timeOfDay', verifyToken, questionnaireController.getQuestionnaireByTimeOfDay);

// Submit completed questionnaire
// api/questionnaires/submit
router.post('/submit', verifyToken, questionnaireController.submitQuestionnaire);

module.exports = router;