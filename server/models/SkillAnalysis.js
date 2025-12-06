const mongoose = require('mongoose');

const skillAnalysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    extractedSkills: [{
        type: String
    }],
    categorizedSkills: {
        type: Map,
        of: [String]
    },
    totalSkills: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('SkillAnalysis', skillAnalysisSchema);
