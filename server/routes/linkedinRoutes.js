const express = require('express');
const router = express.Router();
const { importLinkedIn } = require('../controllers/linkedinController');
const { protect } = require('../middleware/authMiddleware');

// Import LinkedIn data
router.post('/import', protect, importLinkedIn);

module.exports = router;
