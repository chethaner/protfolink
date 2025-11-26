const express = require('express');
const { exportPDF } = require('../controllers/pdfController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:id/pdf', protect, exportPDF);

module.exports = router;
