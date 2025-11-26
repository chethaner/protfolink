const express = require('express');
const { analyzePortfolio, getSuggestions, getPortfolioSuggestions, analyzeSkillGaps } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/analyze/:portfolioId', protect, analyzePortfolio);
router.get('/suggestions', protect, getSuggestions);
router.get('/portfolio/:portfolioId', protect, getPortfolioSuggestions);
router.post('/skill-gaps', protect, analyzeSkillGaps);

module.exports = router;
