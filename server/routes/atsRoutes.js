const express = require('express');
const { analyzeATS } = require('../controllers/atsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/analyze/:id', protect, analyzeATS);

module.exports = router;
