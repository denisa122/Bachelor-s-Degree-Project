const router = require('express').Router();
const userController = require('../controllers/userController');

const {verifyToken} = require('../middlewares/tokenVerification');

// Get user information
// /api/user/:id
router.get('/:id', verifyToken, userController.getUser);

// Delete user account
// /api/user/:id
router.delete('/:id', verifyToken, userController.deleteUser);

module.exports = router;