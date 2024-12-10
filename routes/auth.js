const router = require('express').Router();
const authController = require('../controllers/authController');

// Register
// /api/auth/register
router.post('/register', authController.register);

// Login
// /api/auth/login
router.post('/login', authController.login);

// Get login status
// /api/auth/login-status
router.get('/login-status', authController.getLoginStatus);

module.exports = router;