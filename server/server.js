require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
const allowedOrigins = [
    'http://localhost:5173',
    process.env.CLIENT_URL,
    /\.vercel\.app$/,
    /\.koyeb\.app$/,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(cookieParser());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/portfolios', require('./routes/portfolioRoutes'));
app.use('/api/public', require('./routes/publishRoutes'));
app.use('/api/pdf', require('./routes/pdfRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/career', require('./routes/careerRoutes'));
app.use('/api/ats', require('./routes/atsRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/jobs', require('./routes/jobRoutes'));
app.use('/api/chatbot', require('./routes/chatbotRoutes'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/ml', require('./routes/ml'));

app.get('/', (req, res) => {
    res.send('Portfolink API is running');
});

// Start Server (local dev only — Vercel uses module.exports)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
