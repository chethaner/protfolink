const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const adminAuth = require('../middleware/adminAuth');
const adminController = require('../controllers/adminController');

// All routes require authentication and admin role
router.use(protect);
router.use(adminAuth);

// Statistics
router.get('/stats', adminController.getStats);

// Users
router.get('/users', adminController.getUsers);
router.delete('/users/:id', adminController.deleteUser);

// Portfolios
router.get('/portfolios', adminController.getPortfolios);
router.delete('/portfolios/:id', adminController.deletePortfolio);

// Analytics
router.get('/analytics', adminController.getAnalytics);

module.exports = router;
