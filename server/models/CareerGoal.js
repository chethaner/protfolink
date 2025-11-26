const mongoose = require('mongoose');

const CareerGoalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    targetRole: {
        type: String,
        required: true
    },
    deadline: {
        type: Date
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'paused'],
        default: 'active'
    },
    steps: [{
        title: String,
        description: String,
        completed: {
            type: Boolean,
            default: false
        },
        completedAt: Date
    }],
    skillsToLearn: [String],
    lastMotivation: {
        type: String,
        default: ''
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('CareerGoal', CareerGoalSchema);
