const router = require('express').Router();
const authController = require('../controllers/authController');

// Register
// /api/auth/register
router.post('/register', authController.register);

module.exports = router;