const aiService = require('../services/aiService');

// @desc    Improve text with AI
// @route   POST /api/ai/improve
// @access  Private
exports.improveText = async (req, res) => {
    try {
        const { text, action = 'improve' } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Text is required' });
        }

        const improvedText = await aiService.improveText(text, action);

        res.json({ improvedText });
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

// @desc    Chat with AI assistant
// @route   POST /api/ai/chat
// @access  Private
exports.chat = async (req, res) => {
    try {
        const { message, context = [] } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        // Build conversation context
        const conversationHistory = context.slice(-5); // Keep last 5 messages for context

        // Create a prompt for the AI
        const prompt = `You are a helpful AI career assistant for PORTFOLINK, a portfolio and resume builder platform. 
        
Previous conversation:
${conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

User: ${message}

Provide a helpful, concise response about portfolios, resumes, career advice, or job search tips. Be friendly and professional.`;

        const response = await aiService.generateText(prompt);

        res.json({ response });
    } catch (error) {
        console.error('AI chat error:', error);
        res.status(500).json({
            message: 'AI service error',
            error: error.message,
            response: "I'm having trouble connecting right now. Please try again in a moment!"
        });
    }
};
