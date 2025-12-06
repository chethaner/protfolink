const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    targetRole: {
        type: String,
        required: true
    },
    currentSkills: [{
        type: String
    }],
    learningPath: {
        type: mongoose.Schema.Types.Mixed
    },
    totalEstimatedTime: {
        type: String
    },
    keyMilestones: [{
        type: String
    }],
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

learningPathSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('LearningPath', learningPathSchema);
