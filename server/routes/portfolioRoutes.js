const express = require('express');
const {
    getPortfolios,
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
    duplicatePortfolio
} = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect); // All routes are protected

router.route('/')
    .get(getPortfolios)
    .post(createPortfolio);

router.route('/:id')
    .get(getPortfolio)
    .put(updatePortfolio)
    .delete(deletePortfolio);

router.post('/:id/duplicate', duplicatePortfolio);

module.exports = router;
