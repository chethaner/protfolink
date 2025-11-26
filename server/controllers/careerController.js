const CareerGoal = require('../models/CareerGoal');
const Portfolio = require('../models/Portfolio');
const aiService = require('../services/aiService');

// @desc    Create a new career goal with AI-generated steps
// @route   POST /api/career/goals
// @access  Private
exports.createGoal = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Goal title is required' });
        }

        // Get user's portfolio for context
        const portfolio = await Portfolio.findOne({ user: req.user.id });
        const userProfile = portfolio ? {
            skills: portfolio.content.skills?.flatMap(s => s.items || []) || [],
            experience: portfolio.content.experience || [],
            education: portfolio.content.education || []
        } : {};

        // Generate steps using AI
        const steps = await aiService.generateCareerSteps(title, userProfile);

        const goal = await CareerGoal.create({
            user: req.user.id,
            title,
            steps: steps.map(step => ({
                title: step.title,
                description: step.description,
                completed: false
            }))
        });

        res.status(201).json(goal);
    } catch (error) {
        console.error('Create goal error:', error);
        res.status(500).json({ message: 'Failed to create goal', error: error.message });
    }
};

// @desc    Get all career goals for user
// @route   GET /api/career/goals
// @access  Private
exports.getGoals = async (req, res) => {
    try {
        const goals = await CareerGoal.find({ user: req.user.id }).sort('-createdAt');
        res.json(goals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single career goal
// @route   GET /api/career/goals/:id
// @access  Private
exports.getGoal = async (req, res) => {
    try {
        const goal = await CareerGoal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update goal (progress or details)
// @route   PUT /api/career/goals/:id
// @access  Private
exports.updateGoal = async (req, res) => {
    try {
        const { stepIndex, completed, title } = req.body;

        const goal = await CareerGoal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update title if provided
        if (title) {
            goal.title = title;
        }

        // Update step progress if provided
        if (stepIndex !== undefined) {
            goal.steps[stepIndex].completed = completed;
        }

        // Calculate progress
        const completedSteps = goal.steps.filter(s => s.completed).length;
        goal.progress = Math.round((completedSteps / goal.steps.length) * 100);

        await goal.save();

        res.json(goal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a goal
// @route   DELETE /api/career/goals/:id
// @access  Private
exports.deleteGoal = async (req, res) => {
    try {
        const goal = await CareerGoal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await goal.deleteOne();

        res.json({ message: 'Goal deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get AI motivation
// @route   GET /api/career/motivation/:id
// @access  Private
exports.getMotivation = async (req, res) => {
    try {
        const goal = await CareerGoal.findById(req.params.id);

        if (!goal) {
            return res.status(404).json({ message: 'Goal not found' });
        }

        if (goal.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const motivation = await aiService.generateMotivation(goal.title, goal.progress);

        res.json({ motivation });
    } catch (error) {
        console.error('Motivation error:', error);
        res.status(500).json({ message: 'Failed to generate motivation', error: error.message });
    }
};

// @desc    Get AI skill suggestions
// @route   POST /api/career/suggest-skills
// @access  Private
exports.suggestSkills = async (req, res) => {
    try {
        const { goalTitle } = req.body;

        if (!goalTitle) {
            return res.status(400).json({ message: 'Goal title is required' });
        }

        // Get user's current skills
        const portfolio = await Portfolio.findOne({ user: req.user.id });
        const currentSkills = portfolio ?
            portfolio.content.skills?.flatMap(s => s.items || []) || [] : [];

        const suggestions = await aiService.suggestSkills(goalTitle, currentSkills);

        res.json({ suggestions });
    } catch (error) {
        console.error('Skill suggestion error:', error);
        res.status(500).json({ message: 'Failed to suggest skills', error: error.message });
    }
};
