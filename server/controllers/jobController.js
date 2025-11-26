const Portfolio = require('../models/Portfolio');
const JobSuggestion = require('../models/JobSuggestion');
const aiService = require('../services/aiService');

// @desc    Analyze portfolio and suggest jobs
// @route   POST /api/jobs/analyze/:portfolioId
// @access  Private
exports.analyzePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.portfolioId);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Use AI to suggest jobs
        const suggestions = await aiService.suggestJobs(portfolio);

        // Save suggestions
        let jobSuggestion = await JobSuggestion.findOne({
            user: req.user.id,
            portfolio: portfolio._id
        });

        if (jobSuggestion) {
            jobSuggestion.suggestions = suggestions;
            jobSuggestion.analyzedAt = new Date();
            await jobSuggestion.save();
        } else {
            jobSuggestion = await JobSuggestion.create({
                user: req.user.id,
                portfolio: portfolio._id,
                suggestions
            });
        }

        res.json(jobSuggestion);
    } catch (error) {
        console.error('Job analysis error:', error);
        res.status(500).json({ message: 'Failed to analyze portfolio', error: error.message });
    }
};

// @desc    Get job suggestions for user
// @route   GET /api/jobs/suggestions
// @access  Private
exports.getSuggestions = async (req, res) => {
    try {
        const suggestions = await JobSuggestion.find({ user: req.user.id })
            .populate('portfolio', 'title')
            .sort('-analyzedAt');

        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get suggestions for specific portfolio
// @route   GET /api/jobs/portfolio/:portfolioId
// @access  Private
exports.getPortfolioSuggestions = async (req, res) => {
    try {
        const suggestion = await JobSuggestion.findOne({
            user: req.user.id,
            portfolio: req.params.portfolioId
        }).populate('portfolio', 'title');

        if (!suggestion) {
            return res.status(404).json({ message: 'No suggestions found for this portfolio' });
        }

        res.json(suggestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Analyze skill gaps for a job
// @route   POST /api/jobs/skill-gaps
// @access  Private
exports.analyzeSkillGaps = async (req, res) => {
    try {
        const { targetRole } = req.body;

        if (!targetRole) {
            return res.status(400).json({ message: 'Target role is required' });
        }

        // Get user's skills from portfolio
        const portfolio = await Portfolio.findOne({ user: req.user.id });

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        const userSkills = portfolio.content.skills?.flatMap(s => s.items || []) || [];

        const analysis = await aiService.analyzeSkillGaps(userSkills, targetRole);

        res.json(analysis);
    } catch (error) {
        console.error('Skill gap analysis error:', error);
        res.status(500).json({ message: 'Failed to analyze skill gaps', error: error.message });
    }
};
