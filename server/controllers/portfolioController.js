const Portfolio = require('../models/Portfolio');

// @desc    Get all user portfolios
// @route   GET /api/portfolios
// @access  Private
exports.getPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ user: req.user.id }).sort({ updatedAt: -1 });
        res.json(portfolios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single portfolio
// @route   GET /api/portfolios/:id
// @access  Private
exports.getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        // Make sure user owns portfolio
        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new portfolio
// @route   POST /api/portfolios
// @access  Private
exports.createPortfolio = async (req, res) => {
    try {
        // Check for portfolio limit (3 per user)
        const count = await Portfolio.countDocuments({ user: req.user.id });
        if (count >= 3) {
            return res.status(400).json({ message: 'Portfolio limit reached (max 3)' });
        }

        const portfolio = await Portfolio.create({
            user: req.user.id,
            title: req.body.title || 'Untitled Portfolio',
            template: req.body.template || 'modern-one-page',
            content: {
                personalInfo: {
                    fullName: req.user.name,
                    email: req.user.email
                }
            }
        });

        res.status(201).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update portfolio
// @route   PUT /api/portfolios/:id
// @access  Private
exports.updatePortfolio = async (req, res) => {
    try {
        let portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        // Make sure user owns portfolio
        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete portfolio
// @route   DELETE /api/portfolios/:id
// @access  Private
exports.deletePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        // Make sure user owns portfolio
        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await portfolio.deleteOne();

        res.json({ message: 'Portfolio removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Duplicate portfolio
// @route   POST /api/portfolios/:id/duplicate
// @access  Private
exports.duplicatePortfolio = async (req, res) => {
    try {
        // Check limit
        const count = await Portfolio.countDocuments({ user: req.user.id });
        if (count >= 3) {
            return res.status(400).json({ message: 'Portfolio limit reached (max 3)' });
        }

        const original = await Portfolio.findById(req.params.id);
        if (!original) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        if (original.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const newPortfolio = await Portfolio.create({
            user: req.user.id,
            title: `${original.title} (Copy)`,
            template: original.template,
            content: original.content,
            isPublic: false // Reset public status
        });

        res.status(201).json(newPortfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
