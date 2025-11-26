const Portfolio = require('../models/Portfolio');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// @desc    Export portfolio as PDF
// @route   GET /api/pdf/:id/pdf
// @access  Private
exports.exportPDF = async (req, res) => {
    let browser = null;
    try {
        const portfolio = await Portfolio.findById(req.params.id);

        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        if (portfolio.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        console.log('Starting PDF generation for portfolio:', portfolio.title);

        // Generate HTML for the portfolio
        const html = generatePortfolioHTML(portfolio);

        console.log('Launching Puppeteer...');

        // Launch Puppeteer
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu'
            ]
        });

        console.log('Browser launched, creating page...');
        const page = await browser.newPage();

        console.log('Setting content...');
        await page.setContent(html, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });

        console.log('Generating PDF...');
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20px',
                right: '20px',
                bottom: '20px',
                left: '20px'
            }
        });

        console.log('PDF generated successfully, size:', pdf.length, 'bytes');

        // Save PDF to disk for debugging
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }

        const debugPath = path.join(tempDir, `${portfolio._id}.pdf`);
        fs.writeFileSync(debugPath, pdf);
        console.log('PDF saved to:', debugPath);

        await browser.close();
        browser = null;

        // Send PDF as buffer
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${portfolio.title}.pdf"`);
        res.setHeader('Content-Length', pdf.length);
        res.end(pdf, 'binary');

        console.log('PDF sent to client');
    } catch (error) {
        console.error('PDF generation error:', error);
        console.error('Error stack:', error.stack);

        if (browser) {
            try {
                await browser.close();
            } catch (closeError) {
                console.error('Error closing browser:', closeError);
            }
        }

        res.status(500).json({
            message: 'Failed to generate PDF',
            error: error.message
        });
    }
};

// Helper function to generate HTML
function generatePortfolioHTML(portfolio) {
    const { content } = portfolio;
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [] } = content;

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; color: #1f2937; line-height: 1.6; padding: 40px; }
        h1 { font-size: 36px; font-weight: bold; color: #1f2937; margin-bottom: 8px; }
        h2 { font-size: 24px; font-weight: bold; color: #1f2937; margin-top: 24px; margin-bottom: 16px; border-left: 4px solid #3b82f6; padding-left: 16px; }
        h3 { font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 4px; }
        .header { border-bottom: 3px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px; }
        .position { font-size: 20px; color: #4b5563; margin-bottom: 12px; }
        .contact { display: flex; flex-wrap: wrap; gap: 16px; font-size: 14px; color: #6b7280; margin-bottom: 8px; }
        .links { display: flex; gap: 16px; font-size: 14px; margin-top: 8px; }
        .links a { color: #3b82f6; text-decoration: none; }
        .summary { font-size: 16px; color: #4b5563; line-height: 1.8; }
        .section { margin-bottom: 24px; }
        .item { margin-bottom: 16px; padding-left: 24px; border-left: 2px solid #e5e7eb; }
        .item h3 { color: #1f2937; }
        .company { font-size: 16px; color: #3b82f6; font-weight: 600; }
        .date { font-size: 13px; color: #6b7280; margin-bottom: 8px; }
        .description { color: #4b5563; font-size: 14px; line-height: 1.6; }
        .tech-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0; }
        .tech-tag { background: #dbeafe; color: #1e40af; padding: 4px 12px; border-radius: 12px; font-size: 12px; }
        .skill-category { margin-bottom: 12px; }
        .skill-category h3 { font-size: 16px; margin-bottom: 8px; }
        .skill-items { display: flex; flex-wrap: wrap; gap: 8px; }
        .skill-item { background: #f3f4f6; color: #374151; padding: 6px 14px; border-radius: 16px; font-size: 13px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>${personalInfo.fullName || 'Your Name'}</h1>
        ${personalInfo.position ? `<div class="position">${personalInfo.position}</div>` : ''}
        <div class="contact">
            ${personalInfo.email ? `<span>📧 ${personalInfo.email}</span>` : ''}
            ${personalInfo.phone ? `<span>📱 ${personalInfo.phone}</span>` : ''}
            ${personalInfo.location ? `<span>📍 ${personalInfo.location}</span>` : ''}
        </div>
        ${(personalInfo.linkedin || personalInfo.github) ? `
        <div class="links">
            ${personalInfo.linkedin ? `<a href="${personalInfo.linkedin}">LinkedIn</a>` : ''}
            ${personalInfo.github ? `<a href="${personalInfo.github}">GitHub</a>` : ''}
        </div>` : ''}
    </div>

    ${personalInfo.summary ? `
    <div class="section">
        <h2>Professional Summary</h2>
        <p class="summary">${personalInfo.summary}</p>
    </div>` : ''}

    ${experience.length > 0 ? `
    <div class="section">
        <h2>Experience</h2>
        ${experience.map(exp => `
        <div class="item">
            <h3>${exp.position}</h3>
            <div class="company">${exp.company}</div>
            <div class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>
            ${exp.description ? `<p class="description">${exp.description}</p>` : ''}
        </div>
        `).join('')}
    </div>` : ''}

    ${projects.length > 0 ? `
    <div class="section">
        <h2>Projects</h2>
        ${projects.map(project => `
        <div class="item">
            <h3>${project.name}</h3>
            ${project.description ? `<p class="description">${project.description}</p>` : ''}
            ${project.technologies && project.technologies.length > 0 ? `
            <div class="tech-tags">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>` : ''}
        </div>
        `).join('')}
    </div>` : ''}

    ${education.length > 0 ? `
    <div class="section">
        <h2>Education</h2>
        ${education.map(edu => `
        <div class="item">
            <h3>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</h3>
            <div class="company">${edu.school}</div>
            <div class="date">${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}</div>
        </div>
        `).join('')}
    </div>` : ''}

    ${skills.length > 0 ? `
    <div class="section">
        <h2>Skills</h2>
        ${skills.map(skillGroup => `
        <div class="skill-category">
            <h3>${skillGroup.category}</h3>
            <div class="skill-items">
                ${skillGroup.items?.map(skill => `<span class="skill-item">${skill}</span>`).join('') || ''}
            </div>
        </div>
        `).join('')}
    </div>` : ''}
</body>
</html>
    `;
}
