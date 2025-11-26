const express = require('express');
const { improveText } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/improve', protect, improveText);

module.exports = router;
