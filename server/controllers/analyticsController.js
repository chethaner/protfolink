const Analytics = require('../models/Analytics');
const Portfolio = require('../models/Portfolio');

// @desc    Track portfolio view
// @route   POST /api/analytics/view/:id
// @access  Public
exports.trackView = async (req, res) => {
    try {
        const { id } = req.params;
        const { userAgent, referrer } = req.body;

        let analytics = await Analytics.findOne({ portfolio: id });

        if (!analytics) {
            analytics = await Analytics.create({
                portfolio: id,
                views: 1,
                visitors: [{ userAgent, referrer }]
            });
        } else {
            analytics.views += 1;
            analytics.visitors.push({ userAgent, referrer });
            await analytics.save();
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Track PDF download
// @route   POST /api/analytics/download/:id
// @access  Private
exports.trackDownload = async (req, res) => {
    try {
        const { id } = req.params;

        let analytics = await Analytics.findOne({ portfolio: id });

        if (!analytics) {
            analytics = await Analytics.create({
                portfolio: id,
                pdfDownloads: 1
            });
        } else {
            analytics.pdfDownloads += 1;
            await analytics.save();
        }

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get portfolio analytics
// @route   GET /api/analytics/:id
// @access  Private
exports.getAnalytics = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const analytics = await Analytics.findOne({ portfolio: req.params.id });

        if (!analytics) {
            return res.json({
                views: 0,
                pdfDownloads: 0,
                visitors: []
            });
        }

        res.json(analytics);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all user analytics
// @route   GET /api/analytics/user/stats
// @access  Private
exports.getUserStats = async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ user: req.user.id });
        const portfolioIds = portfolios.map(p => p._id);

        const analytics = await Analytics.find({ portfolio: { $in: portfolioIds } });

        const totalViews = analytics.reduce((sum, a) => sum + a.views, 0);
        const totalDownloads = analytics.reduce((sum, a) => sum + a.pdfDownloads, 0);

        res.json({
            totalPortfolios: portfolios.length,
            totalViews,
            totalDownloads,
            portfolios: portfolios.map(p => {
                const stats = analytics.find(a => a.portfolio.toString() === p._id.toString());
                return {
                    id: p._id,
                    title: p.title,
                    views: stats?.views || 0,
                    downloads: stats?.pdfDownloads || 0
                };
            })
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
