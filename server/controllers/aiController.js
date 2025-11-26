const aiService = require('../services/aiService');

// @desc    Improve text with AI
// @route   POST /api/ai/improve
// @access  Private
exports.improveText = async (req, res) => {
    try {
        const { text, instruction = 'improve' } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const improved = await aiService.improveText(text, instruction);

        res.json({ improved });
    } catch (error) {
        console.error('AI improve error:', error);
        res.status(500).json({ message: 'AI service error', error: error.message });
    }
};

// @desc    Make text professional
// @route   POST /api/ai/professional
// @access  Private
exports.makeProfessional = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const improved = await aiService.improveText(text, 'professional');

        res.json({ improved });
    } catch (error) {
        console.error('AI professional error:', error);
        res.status(500).json({ message: 'AI service error', error: error.message });
    }
};

// @desc    Shorten text
// @route   POST /api/ai/shorten
// @access  Private
exports.shortenText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const improved = await aiService.improveText(text, 'shorten');

        res.json({ improved });
    } catch (error) {
        console.error('AI shorten error:', error);
        res.status(500).json({ message: 'AI service error', error: error.message });
    }
};

// @desc    Expand text
// @route   POST /api/ai/expand
// @access  Private
exports.expandText = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const improved = await aiService.improveText(text, 'expand');

        res.json({ improved });
    } catch (error) {
        console.error('AI expand error:', error);
        res.status(500).json({ message: 'AI service error', error: error.message });
    }
};

// @desc    Convert to bullets
// @route   POST /api/ai/bullets
// @access  Private
exports.convertToBullets = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const improved = await aiService.improveText(text, 'bullets');

        res.json({ improved });
    } catch (error) {
        console.error('AI bullets error:', error);
        res.status(500).json({ message: 'AI service error', error: error.message });
    }
};
