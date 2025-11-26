const mongoose = require('mongoose');

const JobSuggestionSchema = new mongoose.Schema({
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
    suggestions: [{
        jobTitle: String,
        matchScore: Number,
        description: String,
        requiredSkills: [String],
        skillGaps: [String],
        salaryRange: String,
        careerPath: [String]
    }],
    analyzedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('JobSuggestion', JobSuggestionSchema);
