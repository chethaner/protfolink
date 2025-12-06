const User = require('../models/User');
const Portfolio = require('../models/Portfolio');

// Get platform statistics
exports.getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPortfolios = await Portfolio.countDocuments();

        // Active users (logged in last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const activeUsers = await User.countDocuments({
            lastLogin: { $gte: thirtyDaysAgo }
        });

        // Recent users (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newUsers = await User.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        // Public portfolios
        const publicPortfolios = await Portfolio.countDocuments({ isPublic: true });

        res.json({
            totalUsers,
            totalPortfolios,
            activeUsers,
            newUsers,
            publicPortfolios,
            privatePortfolios: totalPortfolios - publicPortfolios
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ message: 'Failed to fetch statistics' });
    }
};

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const users = await User.find()
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await User.countDocuments();

        // Get portfolio count for each user
        const usersWithStats = await Promise.all(
            users.map(async (user) => {
                const portfolioCount = await Portfolio.countDocuments({ user: user._id });
                return {
                    ...user.toObject(),
                    portfolioCount
                };
            })
        );

        res.json({
            users: usersWithStats,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// Get all portfolios
exports.getPortfolios = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const portfolios = await Portfolio.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Portfolio.countDocuments();

        res.json({
            portfolios,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Get portfolios error:', error);
        res.status(500).json({ message: 'Failed to fetch portfolios' });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Don't allow deleting yourself
        if (id === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        // Delete user's portfolios first
        await Portfolio.deleteMany({ user: id });

        // Delete user
        await User.findByIdAndDelete(id);

        res.json({ message: 'User and their portfolios deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};

// Delete portfolio
exports.deletePortfolio = async (req, res) => {
    try {
        const { id } = req.params;

        await Portfolio.findByIdAndDelete(id);

        res.json({ message: 'Portfolio deleted successfully' });
    } catch (error) {
        console.error('Delete portfolio error:', error);
        res.status(500).json({ message: 'Failed to delete portfolio' });
    }
};

// Get analytics data
exports.getAnalytics = async (req, res) => {
    try {
        // User registrations over last 7 days
        const days = 7;
        const userRegistrations = [];
        const portfolioCreations = [];

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDate = new Date(date);
            nextDate.setDate(nextDate.getDate() + 1);

            const userCount = await User.countDocuments({
                createdAt: {
                    $gte: date,
                    $lt: nextDate
                }
            });

            const portfolioCount = await Portfolio.countDocuments({
                createdAt: {
                    $gte: date,
                    $lt: nextDate
                }
            });

            userRegistrations.push({
                date: date.toISOString().split('T')[0],
                count: userCount
            });

            portfolioCreations.push({
                date: date.toISOString().split('T')[0],
                count: portfolioCount
            });
        }

        // Template popularity
        const templateStats = await Portfolio.aggregate([
            { $group: { _id: '$template', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        res.json({
            userRegistrations,
            portfolioCreations,
            templateStats
        });
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ message: 'Failed to fetch analytics' });
    }
};
