// AI Service — powered by Groq API (free, no CC, fast)
const axios = require('axios');

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || 'llama3-8b-8192';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Generate text using Groq
async function generateText(prompt, systemContext = '') {
    if (!GROQ_API_KEY) {
        throw new Error('GROQ_API_KEY is not set. Get a free key at https://console.groq.com');
    }

    const messages = [];
    if (systemContext) messages.push({ role: 'system', content: systemContext });
    messages.push({ role: 'user', content: prompt });

    const response = await axios.post(GROQ_URL, {
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 2048
    }, {
        headers: {
            'Authorization': `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
        },
        timeout: 30000
    });

    return response.data.choices[0].message.content;
}

// Improve text with AI
async function improveText(text, instruction = 'improve') {
    const prompts = {
        improve: `Improve the following text to be more professional, clear, and impactful. Return ONLY the improved text, no explanations:\n\n${text}`,
        professional: `Rewrite the following text in a professional tone suitable for a resume. Return ONLY the rewritten text, no explanations:\n\n${text}`,
        shorten: `Make the following text more concise while keeping key information. Return ONLY the shortened text:\n\n${text}`,
        expand: `Expand the following text with more details while maintaining professionalism. Return ONLY the expanded text:\n\n${text}`,
        bullets: `Convert the following text into bullet points. Return ONLY the bullet points, one per line starting with •:\n\n${text}`
    };

    const prompt = prompts[instruction] || prompts.improve;
    const rawResponse = await generateText(prompt);

    if (instruction === 'bullets') {
        if (rawResponse.includes('<ul>') || rawResponse.includes('<li>')) {
            return rawResponse.replace(/```html/g, '').replace(/```/g, '').replace(/^(Here is|Here's).*?:/gim, '').trim();
        }
        const lines = rawResponse.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        const listItems = lines.map(line => {
            let text = line
                .replace(/^[•\-\*\d\.]]\s*/, '')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.*?)\*/g, '<em>$1</em>')
                .trim();
            return `  <li>${text}</li>`;
        }).join('\n');
        return `<ul>\n${listItems}\n</ul>`;
    }

    return rawResponse
        .replace(/^(Here is|Here's|I've|I have).*?:/gim, '')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .trim();
}

// Generate career goal steps
async function generateCareerSteps(goalTitle, userProfile = {}) {
    const { skills = [], experience = [], education = [] } = userProfile;

    const prompt = `As a career coach, create a detailed step-by-step plan to achieve this career goal: "${goalTitle}"

User's background:
- Skills: ${skills.join(', ') || 'Not specified'}
- Experience: ${experience.length} positions
- Education: ${education.length} degrees

Provide 5-7 actionable steps in JSON format:
[
  {
    "title": "Step title",
    "description": "Detailed description",
    "timeframe": "Estimated time (e.g., 2-3 months)",
    "resources": ["Resource 1", "Resource 2"]
  }
]

Return ONLY the JSON array, no additional text.`;

    let response;
    try {
        response = await generateText(prompt);
    } catch (error) {
        console.error('AI generation failed, using fallback:', error);
        return getFallbackSteps(goalTitle);
    }

    try {
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        throw new Error('Invalid JSON response');
    } catch (error) {
        console.error('Failed to parse career steps:', error);
        return getFallbackSteps(goalTitle);
    }
}

function getFallbackSteps(goalTitle) {
    return [
        { title: "Research and Learn", description: `Study the requirements and skills needed for ${goalTitle}`, timeframe: "1-2 months", resources: ["Online courses", "Industry blogs", "Professional networks"] },
        { title: "Build Skills", description: "Develop the necessary technical and soft skills", timeframe: "3-6 months", resources: ["Practice projects", "Certifications", "Mentorship"] },
        { title: "Gain Experience", description: "Apply your skills in real-world scenarios", timeframe: "6-12 months", resources: ["Freelance work", "Open source", "Internships"] }
    ];
}

// Suggest skills for career goal
async function suggestSkills(goalTitle, currentSkills = []) {
    const prompt = `For someone pursuing a career as "${goalTitle}", suggest 5-7 essential skills they should learn.

Current skills: ${currentSkills.join(', ') || 'None'}

Provide skills in JSON format:
[
  {
    "skill": "Skill name",
    "importance": "High/Medium/Low",
    "reason": "Why this skill is important"
  }
]

Return ONLY the JSON array, no additional text.`;

    const response = await generateText(prompt);

    try {
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        throw new Error('Invalid JSON response');
    } catch (error) {
        console.error('Failed to parse skill suggestions:', error);
        return [
            { skill: "Industry Knowledge", importance: "High", reason: "Essential for understanding the field" },
            { skill: "Technical Skills", importance: "High", reason: "Core competency for the role" },
            { skill: "Communication", importance: "Medium", reason: "Important for collaboration" }
        ];
    }
}

// Generate motivational message
async function generateMotivation(goalTitle, progress = 0) {
    const prompt = `Generate a short, encouraging motivational message (2-3 sentences) for someone working towards: "${goalTitle}"

Their progress: ${progress}%

Make it personal, inspiring, and actionable.`;

    return await generateText(prompt);
}

// Analyze portfolio and suggest jobs
async function suggestJobs(portfolio) {
    const { content } = portfolio;
    const { personalInfo = {}, experience = [], education = [], projects = [], skills = [] } = content;

    const allSkills = skills.map(s => s.name || s).filter(Boolean);

    const prompt = `Analyze this professional profile and suggest 3-5 suitable job roles:

Profile:
- Name: ${personalInfo.fullName || 'Professional'}
- Current Role: ${personalInfo.position || 'Not specified'}
- Skills: ${allSkills.join(', ')}
- Experience: ${experience.length} positions
- Education: ${education.map(e => e.degree).join(', ')}
- Projects: ${projects.length} projects

Provide job suggestions in JSON format:
[
  {
    "jobTitle": "Job Title",
    "matchScore": 85,
    "description": "Brief job description",
    "requiredSkills": ["Skill 1", "Skill 2"],
    "skillGaps": ["Missing skill 1"],
    "salaryRange": "$80k - $120k",
    "careerPath": ["Current Role", "Next Role", "Future Role"]
  }
]

Return ONLY the JSON array, no additional text.`;

    const response = await generateText(prompt);

    try {
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        throw new Error('Invalid JSON response');
    } catch (error) {
        console.error('Failed to parse job suggestions:', error);
        return [{ jobTitle: "Software Developer", matchScore: 75, description: "Develop and maintain software applications", requiredSkills: allSkills.slice(0, 5), skillGaps: ["Advanced skills needed"], salaryRange: "$60k - $100k", careerPath: ["Junior Developer", "Mid-level Developer", "Senior Developer"] }];
    }
}

// Analyze skill gaps
async function analyzeSkillGaps(userSkills, targetRole) {
    const prompt = `Compare these skills with requirements for "${targetRole}":

User's skills: ${userSkills.join(', ')}

Provide a skill gap analysis in JSON format:
{
  "matchingSkills": ["Skill 1", "Skill 2"],
  "missingSkills": ["Skill 3", "Skill 4"],
  "recommendations": ["Learn X", "Practice Y"]
}

Return ONLY the JSON object, no additional text.`;

    const response = await generateText(prompt);

    try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
        throw new Error('Invalid JSON response');
    } catch (error) {
        console.error('Failed to parse skill gaps:', error);
        return { matchingSkills: userSkills.slice(0, 3), missingSkills: ["Advanced skills"], recommendations: ["Continue learning", "Build projects"] };
    }
}

// Kept for backward compatibility — no-op now
async function checkOllama() {
    if (!GROQ_API_KEY) {
        console.log('⚠️  GROQ_API_KEY not set. AI features will be unavailable.');
        return false;
    }
    console.log('✅ Groq API ready. Model:', GROQ_MODEL);
    return true;
}
checkOllama();

module.exports = {
    generateText,
    improveText,
    generateCareerSteps,
    suggestSkills,
    generateMotivation,
    suggestJobs,
    analyzeSkillGaps,
    checkOllama
};
