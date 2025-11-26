const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
    portfolio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Portfolio',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    pdfDownloads: {
        type: Number,
        default: 0
    },
    visitors: [{
        timestamp: {
            type: Date,
            default: Date.now
        },
        userAgent: String,
        referrer: String
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Analytics', AnalyticsSchema);
