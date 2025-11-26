const Portfolio = require('../models/Portfolio');
const slugify = require('slugify');

// @desc    Publish portfolio (generate slug and make public)
// @route   POST /api/portfolios/:id/publish
// @access  Private
exports.publishPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Generate unique slug if not exists
        if (!portfolio.slug) {
            const baseSlug = slugify(portfolio.title, { lower: true, strict: true });
            let slug = baseSlug;
            let counter = 1;

            // Ensure uniqueness
            while (await Portfolio.findOne({ slug })) {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }

            portfolio.slug = slug;
        }

        portfolio.isPublic = true;
        await portfolio.save();

        res.json({
            message: 'Portfolio published successfully',
            slug: portfolio.slug,
            publicUrl: `/p/${portfolio.slug}`
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Unpublish portfolio
// @route   POST /api/portfolios/:id/unpublish
// @access  Private
exports.unpublishPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        portfolio.isPublic = false;
        await portfolio.save();

        res.json({ message: 'Portfolio unpublished successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get public portfolio by slug
// @route   GET /api/public/:slug
// @access  Public
exports.getPublicPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({
            slug: req.params.slug,
            isPublic: true
        }).populate('user', 'name');

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found or not public' });
        }

        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
