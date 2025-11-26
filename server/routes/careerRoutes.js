const express = require('express');
const {
    createGoal,
    getGoals,
    getGoal,
    updateGoal,
    deleteGoal,
    getMotivation,
    suggestSkills
} = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/goals', protect, createGoal);
router.get('/goals', protect, getGoals);
router.get('/goals/:id', protect, getGoal);
router.put('/goals/:id', protect, updateGoal);
router.delete('/goals/:id', protect, deleteGoal);
router.post('/motivation/:id', protect, getMotivation);
router.post('/suggest-skills', protect, suggestSkills);

module.exports = router;
