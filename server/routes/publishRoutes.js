const express = require('express');
const { publishPortfolio, unpublishPortfolio, getPublicPortfolio } = require('../controllers/publishController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route
router.get('/:slug', getPublicPortfolio);

// Protected routes
router.post('/:id/publish', protect, publishPortfolio);
router.post('/:id/unpublish', protect, unpublishPortfolio);

module.exports = router;
