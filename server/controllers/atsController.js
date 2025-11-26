const Portfolio = require('../models/Portfolio');

// Mock ATS scoring algorithm
function calculateATSScore(portfolio) {
    let score = 0;
    const recommendations = [];
    const { content } = portfolio;
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [] } = content;

    // Contact Information (15 points)
    if (personalInfo.email && personalInfo.phone) {
        score += 15;
    } else {
        recommendations.push('Add complete contact information (email and phone)');
        score += personalInfo.email || personalInfo.phone ? 8 : 0;
    }

    // Professional Summary (15 points)
    if (personalInfo.summary && personalInfo.summary.length > 50) {
        score += 15;
    } else if (personalInfo.summary) {
        score += 8;
        recommendations.push('Expand your professional summary (aim for 100-200 words)');
    } else {
        recommendations.push('Add a professional summary to highlight your key strengths');
    }

    // Work Experience (25 points)
    if (experience.length >= 2) {
        score += 25;
    } else if (experience.length === 1) {
        score += 15;
        recommendations.push('Add more work experience entries to strengthen your profile');
    } else {
        recommendations.push('Add your work experience');
    }

    // Education (15 points)
    if (education.length >= 1) {
        score += 15;
    } else {
        recommendations.push('Add your educational background');
    }

    // Skills (15 points)
    const totalSkills = skills.reduce((sum, cat) => sum + (cat.items?.length || 0), 0);
    if (totalSkills >= 8) {
        score += 15;
    } else if (totalSkills >= 4) {
        score += 10;
        recommendations.push('Add more skills (aim for 8-12 relevant skills)');
    } else {
        recommendations.push('Add your technical and soft skills');
    }

    // Keywords Density (15 points)
    const allText = JSON.stringify(content).toLowerCase();
    const commonKeywords = ['developer', 'engineer', 'manager', 'analyst', 'designer', 'react', 'node', 'python', 'java', 'javascript'];
    const foundKeywords = commonKeywords.filter(kw => allText.includes(kw));

    if (foundKeywords.length >= 5) {
        score += 15;
    } else if (foundKeywords.length >= 3) {
        score += 10;
        recommendations.push('Include more industry-relevant keywords');
    } else {
        recommendations.push('Add relevant keywords for your target role');
    }

    return {
        score: Math.min(score, 100),
        recommendations,
        strengths: getStrengths(content),
        missingKeywords: commonKeywords.filter(kw => !allText.includes(kw)).slice(0, 5)
    };
}

function getStrengths(content) {
    const strengths = [];
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [] } = content;

    if (personalInfo.summary && personalInfo.summary.length > 100) {
        strengths.push('Strong professional summary');
    }
    if (experience.length >= 3) {
        strengths.push('Extensive work experience');
    }
    if (projects.length >= 2) {
        strengths.push('Good project portfolio');
    }
    if (skills.length >= 3) {
        strengths.push('Well-organized skills');
    }
    if (personalInfo.linkedin && personalInfo.github) {
        strengths.push('Complete online presence');
    }

    return strengths;
}

// @desc    Analyze portfolio for ATS compatibility
// @route   POST /api/ats/analyze/:id
// @access  Private
exports.analyzeATS = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const analysis = calculateATSScore(portfolio);

        res.json({
            portfolioId: portfolio._id,
            portfolioTitle: portfolio.title,
            ...analysis,
            analyzedAt: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
