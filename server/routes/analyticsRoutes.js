const express = require('express');
const { trackView, trackDownload, getAnalytics, getUserStats } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/view/:id', trackView); // Public
router.post('/download/:id', protect, trackDownload);
router.get('/:id', protect, getAnalytics);
router.get('/user/stats', protect, getUserStats);

module.exports = router;
