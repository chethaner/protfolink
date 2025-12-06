const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const mlService = require('../services/mlService');
const Portfolio = require('../models/Portfolio');
const SkillAnalysis = require('../models/SkillAnalysis');
const LearningPath = require('../models/LearningPath');

// @route   POST /api/ml/analyze-portfolio/:id
// @desc    Analyze portfolio and extract skills
// @access  Private
router.post('/analyze-portfolio/:id', protect, async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        // Check ownership
        if (portfolio.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        // Analyze portfolio
        const analysis = await mlService.analyzePortfolio(portfolio);

        // Save analysis to database
        const skillAnalysis = new SkillAnalysis({
            user: req.user.id,
            portfolio: portfolio._id,
            extractedSkills: analysis.extractedSkills,
            categorizedSkills: analysis.categorizedSkills,
            totalSkills: analysis.totalSkills
        });

        await skillAnalysis.save();

        res.json(analysis);
    } catch (error) {
        console.error('Portfolio analysis error:', error);
        res.status(500).json({ message: 'Server error during portfolio analysis' });
    }
});

// @route   POST /api/ml/skill-gaps
// @desc    Analyze skill gaps against job description
// @access  Private
router.post('/skill-gaps', protect, async (req, res) => {
    try {
        const { userSkills, jobDescription } = req.body;

        if (!userSkills || !jobDescription) {
            return res.status(400).json({ message: 'User skills and job description are required' });
        }

        // Analyze skill gaps
        const gapAnalysis = await mlService.analyzeSkillGaps(userSkills, jobDescription);

        res.json(gapAnalysis);
    } catch (error) {
        console.error('Skill gap analysis error:', error);
        res.status(500).json({ message: 'Server error during skill gap analysis' });
    }
});

// @route   POST /api/ml/learning-path
// @desc    Generate personalized learning path
// @access  Private
router.post('/learning-path', protect, async (req, res) => {
    try {
        const { currentSkills, targetRole, missingSkills } = req.body;

        if (!currentSkills || !targetRole) {
            return res.status(400).json({ message: 'Current skills and target role are required' });
        }

        // Generate learning path
        const learningPath = await mlService.generateLearningPath(
            currentSkills,
            targetRole,
            missingSkills || []
        );

        // Save to database
        const savedPath = new LearningPath({
            user: req.user.id,
            targetRole,
            currentSkills,
            learningPath: learningPath.learningPath,
            totalEstimatedTime: learningPath.totalEstimatedTime,
            keyMilestones: learningPath.keyMilestones
        });

        await savedPath.save();

        res.json(learningPath);
    } catch (error) {
        console.error('Learning path generation error:', error);
        res.status(500).json({ message: 'Server error during learning path generation' });
    }
});

// @route   POST /api/ml/career-insights
// @desc    Generate career insights and predictions
// @access  Private
router.post('/career-insights', protect, async (req, res) => {
    try {
        const { skills, experience, targetRole } = req.body;

        if (!skills || !targetRole) {
            return res.status(400).json({ message: 'Skills and target role are required' });
        }

        // Generate career insights
        const insights = await mlService.generateCareerInsights(
            skills,
            experience || 'Mid-level',
            targetRole
        );

        res.json(insights);
    } catch (error) {
        console.error('Career insights generation error:', error);
        res.status(500).json({ message: 'Server error during career insights generation' });
    }
});

// @route   GET /api/ml/my-analyses
// @desc    Get user's skill analyses
// @access  Private
router.get('/my-analyses', protect, async (req, res) => {
    try {
        const analyses = await SkillAnalysis.find({ user: req.user.id })
            .populate('portfolio', 'title')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(analyses);
    } catch (error) {
        console.error('Fetch analyses error:', error);
        res.status(500).json({ message: 'Server error fetching analyses' });
    }
});

// @route   GET /api/ml/my-learning-paths
// @desc    Get user's learning paths
// @access  Private
router.get('/my-learning-paths', protect, async (req, res) => {
    try {
        const paths = await LearningPath.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .limit(10);

        res.json(paths);
    } catch (error) {
        console.error('Fetch learning paths error:', error);
        res.status(500).json({ message: 'Server error fetching learning paths' });
    }
});

module.exports = router;
