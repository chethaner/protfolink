const { generateText } = require('../services/aiService');

// @desc    Chat with AI assistant
// @route   POST /api/chatbot/chat
// @access  Public
exports.chat = async (req, res) => {
    try {
        const { message, history = [] } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }

        // Build context from history
        const context = history.slice(-6).map(msg =>
            `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
        ).join('\n');

        // Create AI prompt
        const systemPrompt = 'You are a helpful AI assistant for Portfolink, a professional portfolio and resume builder. Help users with resume tips, career advice, portfolio optimization, and job search strategies. Be friendly, concise (under 150 words), and use emojis occasionally.';

        const fullPrompt = `${systemPrompt}\n\nPrevious conversation:\n${context}\n\nUser: ${message}\n\nAssistant:`;

        // Generate AI response
        const response = await generateText(fullPrompt);

        res.json({ response });
    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({
            response: '❌ Sorry, I encountered an error. Please try again or contact support if the problem persists.'
        });
    }
};
