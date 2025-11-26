const express = require('express');
const { register, login, getMe, logout } = require('../controllers/authController');
const { updateProfile, changePassword } = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', logout);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, changePassword);

module.exports = router;
