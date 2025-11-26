const express = require('express');
const { improveText, chat } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/improve', protect, improveText);
router.post('/chat', protect, chat);

module.exports = router;
