// AI Service with Ollama Support (No external AI packages needed)
const axios = require('axios');

// Ollama configuration
const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
const ollamaModel = process.env.OLLAMA_MODEL || 'llama3.2';

let ollamaAvailable = false;

// Check Ollama availability
async function checkOllama() {
    try {
        await axios.get(`${ollamaUrl}/api/tags`, { timeout: 2000 });
        ollamaAvailable = true;
        console.log('✅ Ollama is available at', ollamaUrl);
        console.log('📦 Using model:', ollamaModel);
        return true;
    } catch (error) {
        ollamaAvailable = false;
        console.log('⚠️  Ollama not available. Install from https://ollama.ai');
        return false;
    }
}

// Initialize on startup
checkOllama();

// Generate text using Ollama
async function generateWithOllama(prompt) {
    try {
        const response = await axios.post(`${ollamaUrl}/api/generate`, {
            model: ollamaModel,
            prompt: prompt,
            stream: false
        }, {
            timeout: 30000 // 30 second timeout
        });
        return response.data.response;
    } catch (error) {
        throw new Error(`Ollama error: ${error.message}`);
    }
}

// Generic AI text generation
async function generateText(prompt, systemContext = '') {
    const fullPrompt = systemContext ? `${systemContext}\n\n${prompt}` : prompt;

    if (!ollamaAvailable) {
        // Try to reconnect
        await checkOllama();
        if (!ollamaAvailable) {
            throw new Error('Ollama is not available. Please install Ollama from https://ollama.ai and run: ollama pull ' + ollamaModel);
        }
    }

    return await generateWithOllama(fullPrompt);
}

// Improve text with AI
async function improveText(text, instruction = 'improve') {
    const prompts = {
        improve: `Improve the following text to be more professional, clear, and impactful. Keep the same meaning but enhance the language:\n\n${text}`,
        professional: `Rewrite the following text in a highly professional tone suitable for a resume or portfolio:\n\n${text}`,
        shorten: `Condense the following text to be more concise while keeping the key information:\n\n${text}`,
        expand: `Expand the following text with more details and examples while maintaining professionalism:\n\n${text}`,
        bullets: `Convert the following text into clear, concise bullet points:\n\n${text}`
    };

    const prompt = prompts[instruction] || prompts.improve;
    return await generateText(prompt);
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

    const response = await generateText(prompt);

    try {
        const jsonMatch = response.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Invalid JSON response');
    } catch (error) {
        console.error('Failed to parse career steps:', error);
        return [
            {
                title: "Research and Learn",
                description: `Study the requirements and skills needed for ${goalTitle}`,
                timeframe: "1-2 months",
                resources: ["Online courses", "Industry blogs", "Professional networks"]
            },
            {
                title: "Build Skills",
                description: "Develop the necessary technical and soft skills",
                timeframe: "3-6 months",
                resources: ["Practice projects", "Certifications", "Mentorship"]
            },
            {
                title: "Gain Experience",
                description: "Apply your skills in real-world scenarios",
                timeframe: "6-12 months",
                resources: ["Freelance work", "Open source", "Internships"]
            }
        ];
    }
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
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
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
    const experienceYears = experience.length;

    const prompt = `Analyze this professional profile and suggest 3-5 suitable job roles:

Profile:
- Name: ${personalInfo.fullName || 'Professional'}
- Current Role: ${personalInfo.position || 'Not specified'}
- Skills: ${allSkills.join(', ')}
- Experience: ${experienceYears} positions
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
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Invalid JSON response');
    } catch (error) {
        console.error('Failed to parse job suggestions:', error);
        return [
            {
                jobTitle: "Software Developer",
                matchScore: 75,
                description: "Develop and maintain software applications",
                requiredSkills: allSkills.slice(0, 5),
                skillGaps: ["Advanced skills needed"],
                salaryRange: "$60k - $100k",
                careerPath: ["Junior Developer", "Mid-level Developer", "Senior Developer"]
            }
        ];
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
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        throw new Error('Invalid JSON response');
    } catch (error) {
        console.error('Failed to parse skill gaps:', error);
        return {
            matchingSkills: userSkills.slice(0, 3),
            missingSkills: ["Advanced skills"],
            recommendations: ["Continue learning", "Build projects"]
        };
    }
}

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
