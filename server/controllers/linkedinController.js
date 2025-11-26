const multer = require('multer');
const Portfolio = require('../models/Portfolio');
const pdfParse = require('pdf-parse');
const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed'));
        }
    }
});

const extractEmail = (text) => {
    const match = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return match ? match[0] : '';
};

const extractPhone = (text) => {
    const match = text.match(/\+?\d[\d\s().-]{7,}\d/);
    return match ? match[0].trim() : '';
};

const extractName = (text) => {
    // Assume the first non-empty line is the name
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    return lines[0] || '';
};

const extractSummary = (text) => {
    // Look for a line after name that is not email/phone and relatively short
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 2) return '';
    const possible = lines[1];
    if (possible.length < 150 && !possible.includes('@') && !possible.match(/\d/)) {
        return possible;
    }
    return '';
};

// Simple section splitter – looks for headings like "Experience", "Education", "Skills"
const splitSection = (text, heading) => {
    const regex = new RegExp(`${heading}\\s*[:\n]`, 'i');
    const parts = text.split(regex);
    if (parts.length < 2) return '';
    // Return content up to next known heading or end of text
    const nextHeadings = ['Experience', 'Education', 'Skills', 'Certifications', 'Languages'];
    const after = parts[1];
    const endIdx = nextHeadings.reduce((idx, h) => {
        const m = after.search(new RegExp(`\\n${h}\\s*[:\n]`, 'i'));
        return m !== -1 && (idx === -1 || m < idx) ? m : idx;
    }, -1);
    return endIdx === -1 ? after.trim() : after.slice(0, endIdx).trim();
};

const parseLinkedInData = async (buffer) => {
    try {
        const { text } = await pdfParse(buffer);
        const name = extractName(text);
        const email = extractEmail(text);
        const phone = extractPhone(text);
        const summary = extractSummary(text);

        // For now we only extract simple arrays by splitting lines
        const experienceText = splitSection(text, 'Experience');
        const educationText = splitSection(text, 'Education');
        const skillsText = splitSection(text, 'Skills');
        const certificationsText = splitSection(text, 'Certifications');
        const languagesText = splitSection(text, 'Languages');

        const parseList = (section) => {
            if (!section) return [];
            // Split by double line breaks or bullet points
            return section.split(/\n\s*\n|\n•\s*/).map(l => l.trim()).filter(l => l);
        };

        return {
            personalInfo: {
                fullName: name,
                email,
                phone,
                location: '',
                linkedin: '',
                summary: summary || 'Professional summary not extracted',
            },
            experience: parseList(experienceText),
            education: parseList(educationText),
            skills: parseList(skillsText),
            certifications: parseList(certificationsText),
            languages: parseList(languagesText),
        };
    } catch (err) {
        console.error('PDF parsing error:', err);
        throw err;
    }
};

// Updated controller to use the real parser
exports.importLinkedIn = [
    upload.single('linkedinPdf'),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const portfolioId = req.body.portfolioId;
            if (!portfolioId) {
                return res.status(400).json({ message: 'Portfolio ID is required' });
            }

            const portfolio = await Portfolio.findById(portfolioId);
            if (!portfolio) {
                return res.status(404).json({ message: 'Portfolio not found' });
            }

            if (portfolio.user.toString() !== req.user.id) {
                return res.status(403).json({ message: 'Not authorized' });
            }

            // Parse PDF and extract data
            const importedData = await parseLinkedInData(req.file.buffer);

            // Merge imported data into portfolio (shallow merge for demo)
            portfolio.content = { ...portfolio.content, ...importedData };
            await portfolio.save();

            res.json({
                message: 'LinkedIn data imported successfully',
                portfolio,
                imported: importedData,
            });
        } catch (error) {
            console.error('LinkedIn import error:', error);
            res.status(500).json({ message: error.message || 'Import failed' });
        }
    },
];
