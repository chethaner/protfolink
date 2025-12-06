const nlp = require('compromise');
const axios = require('axios');

class MLService {
    constructor() {
        this.ollamaUrl = 'http://localhost:11434/api/generate';
        this.model = 'llama3.2';

        // Common technical skills database (150+ skills)
        this.technicalSkills = [
            // Programming Languages
            'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust', 'typescript',
            'scala', 'perl', 'r', 'matlab', 'dart', 'elixir', 'haskell', 'lua', 'objective-c', 'shell', 'bash',

            // Frontend Frameworks & Libraries
            'react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'gatsby', 'ember', 'backbone', 'jquery',
            'redux', 'mobx', 'rxjs', 'webpack', 'vite', 'parcel', 'rollup',

            // Styling & UI
            'html', 'css', 'sass', 'scss', 'less', 'tailwind', 'bootstrap', 'material-ui', 'ant design', 'chakra ui',
            'styled-components', 'emotion', 'css modules',

            // Backend Frameworks
            'node.js', 'express', 'nestjs', 'koa', 'fastify', 'django', 'flask', 'fastapi', 'spring', 'spring boot',
            'laravel', 'symfony', 'rails', 'asp.net', 'gin', 'echo',

            // Databases
            'mongodb', 'postgresql', 'mysql', 'mariadb', 'sqlite', 'redis', 'memcached', 'elasticsearch',
            'cassandra', 'dynamodb', 'couchdb', 'neo4j', 'influxdb', 'firebase', 'supabase',

            // Cloud & DevOps
            'aws', 'azure', 'gcp', 'heroku', 'netlify', 'vercel', 'digitalocean', 'linode',
            'docker', 'kubernetes', 'k8s', 'jenkins', 'gitlab ci', 'github actions', 'circleci', 'travis ci',
            'terraform', 'ansible', 'chef', 'puppet', 'vagrant',

            // Version Control & Collaboration
            'git', 'github', 'gitlab', 'bitbucket', 'svn', 'mercurial',

            // Testing
            'jest', 'mocha', 'chai', 'jasmine', 'cypress', 'selenium', 'puppeteer', 'playwright',
            'junit', 'pytest', 'rspec', 'phpunit', 'postman', 'insomnia',

            // Mobile Development
            'react native', 'flutter', 'ios', 'android', 'xamarin', 'ionic', 'cordova', 'swift ui', 'jetpack compose',

            // ML/AI & Data Science
            'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy', 'opencv', 'nlp', 'machine learning',
            'deep learning', 'neural networks', 'computer vision', 'data science', 'jupyter', 'tableau', 'power bi',

            // APIs & Protocols
            'graphql', 'rest api', 'grpc', 'websocket', 'soap', 'oauth', 'jwt', 'api gateway',

            // Architecture & Patterns
            'microservices', 'serverless', 'monolith', 'mvc', 'mvvm', 'clean architecture', 'domain-driven design',

            // Methodologies
            'agile', 'scrum', 'kanban', 'waterfall', 'devops', 'ci/cd', 'tdd', 'bdd',

            // CMS & E-commerce
            'wordpress', 'drupal', 'joomla', 'shopify', 'magento', 'woocommerce', 'contentful', 'strapi',

            // Message Queues & Streaming
            'rabbitmq', 'kafka', 'redis pub/sub', 'aws sqs', 'aws sns',

            // Monitoring & Logging
            'prometheus', 'grafana', 'elk stack', 'datadog', 'new relic', 'sentry', 'logstash', 'kibana',

            // Security
            'oauth2', 'saml', 'ssl', 'tls', 'encryption', 'penetration testing', 'owasp',

            // Blockchain & Web3
            'blockchain', 'ethereum', 'solidity', 'web3', 'smart contracts', 'nft',

            // Game Development
            'unity', 'unreal engine', 'godot', 'pygame', 'phaser',

            // Other Tools
            'linux', 'unix', 'windows', 'macos', 'vim', 'vscode', 'intellij', 'eclipse', 'xcode',
            'nginx', 'apache', 'tomcat', 'iis', 'jira', 'confluence', 'slack', 'notion'
        ];
    }

    /**
     * Extract skills from text using Compromise NLP
     */
    extractSkills(text) {
        if (!text) return [];

        const lowerText = text.toLowerCase();
        const extractedSkills = new Set();

        // Direct search in text for each skill
        this.technicalSkills.forEach(skill => {
            // Check if skill appears in text (case-insensitive)
            if (lowerText.includes(skill)) {
                extractedSkills.add(skill);
            }

            // Also check for variations (e.g., "react.js", "reactjs" for "react")
            const skillVariations = [
                skill.replace(/\s/g, ''),  // Remove spaces: "node.js" -> "nodejs"
                skill.replace(/\./g, ''),  // Remove dots: "node.js" -> "nodejs"
                skill.replace(/\s/g, '.'), // Add dots: "next js" -> "next.js"
            ];

            skillVariations.forEach(variation => {
                if (lowerText.includes(variation)) {
                    extractedSkills.add(skill);
                }
            });
        });

        // Also use Compromise for additional extraction
        const doc = nlp(lowerText);
        const nouns = doc.nouns().out('array');
        const terms = doc.terms().out('array');

        [...nouns, ...terms].forEach(term => {
            const cleanTerm = term.toLowerCase().trim();

            // Check if any technical skill matches this term
            this.technicalSkills.forEach(skill => {
                if (cleanTerm === skill || cleanTerm.includes(skill) || skill.includes(cleanTerm)) {
                    extractedSkills.add(skill);
                }
            });
        });

        return Array.from(extractedSkills);
    }

    /**
     * Categorize skills by type
     */
    categorizeSkills(skills) {
        const categories = {
            'Programming Languages': ['javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go', 'rust', 'typescript', 'scala', 'perl', 'r', 'matlab', 'dart', 'elixir', 'haskell', 'lua', 'objective-c', 'shell', 'bash'],
            'Frontend': ['react', 'vue', 'angular', 'svelte', 'next.js', 'nuxt', 'gatsby', 'ember', 'backbone', 'jquery', 'redux', 'mobx', 'rxjs', 'webpack', 'vite', 'parcel', 'rollup', 'html', 'css', 'sass', 'scss', 'less', 'tailwind', 'bootstrap', 'material-ui', 'ant design', 'chakra ui', 'styled-components', 'emotion', 'css modules'],
            'Backend': ['node.js', 'express', 'nestjs', 'koa', 'fastify', 'django', 'flask', 'fastapi', 'spring', 'spring boot', 'laravel', 'symfony', 'rails', 'asp.net', 'gin', 'echo'],
            'Databases': ['mongodb', 'postgresql', 'mysql', 'mariadb', 'sqlite', 'redis', 'memcached', 'elasticsearch', 'cassandra', 'dynamodb', 'couchdb', 'neo4j', 'influxdb', 'firebase', 'supabase'],
            'Cloud & DevOps': ['aws', 'azure', 'gcp', 'heroku', 'netlify', 'vercel', 'digitalocean', 'linode', 'docker', 'kubernetes', 'k8s', 'jenkins', 'gitlab ci', 'github actions', 'circleci', 'travis ci', 'terraform', 'ansible', 'chef', 'puppet', 'vagrant'],
            'Mobile': ['react native', 'flutter', 'ios', 'android', 'xamarin', 'ionic', 'cordova', 'swift ui', 'jetpack compose'],
            'ML/AI & Data Science': ['tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy', 'opencv', 'nlp', 'machine learning', 'deep learning', 'neural networks', 'computer vision', 'data science', 'jupyter', 'tableau', 'power bi'],
            'Testing': ['jest', 'mocha', 'chai', 'jasmine', 'cypress', 'selenium', 'puppeteer', 'playwright', 'junit', 'pytest', 'rspec', 'phpunit', 'postman', 'insomnia'],
            'Tools & Platforms': ['git', 'github', 'gitlab', 'bitbucket', 'svn', 'linux', 'unix', 'windows', 'macos', 'vim', 'vscode', 'intellij', 'eclipse', 'xcode', 'nginx', 'apache', 'tomcat', 'iis', 'jira', 'confluence', 'slack', 'notion']
        };

        const categorized = {};

        skills.forEach(skill => {
            let found = false;
            for (const [category, categorySkills] of Object.entries(categories)) {
                if (categorySkills.includes(skill.toLowerCase())) {
                    if (!categorized[category]) categorized[category] = [];
                    categorized[category].push(skill);
                    found = true;
                    break;
                }
            }
            if (!found) {
                if (!categorized['Other']) categorized['Other'] = [];
                categorized['Other'].push(skill);
            }
        });

        return categorized;
    }

    /**
     * Analyze skill gaps using Ollama
     */
    async analyzeSkillGaps(userSkills, jobDescription) {
        try {
            const prompt = `You are a career advisor analyzing skill gaps.

User's Current Skills: ${userSkills.join(', ')}

Job Description:
${jobDescription}

Analyze and provide:
1. Required skills from the job description
2. Skills the user already has (matching)
3. Missing skills the user needs to learn
4. Importance rating (1-10) for each missing skill
5. Brief explanation of why each skill is important

Respond in JSON format:
{
  "requiredSkills": ["skill1", "skill2"],
  "matchingSkills": ["skill3"],
  "missingSkills": [
    {
      "skill": "skill name",
      "importance": 8,
      "reason": "why it's important"
    }
  ],
  "overallMatch": 75
}`;

            const response = await axios.post(this.ollamaUrl, {
                model: this.model,
                prompt: prompt,
                stream: false
            });

            // Parse the response
            const result = this.parseOllamaResponse(response.data.response);
            return result;
        } catch (error) {
            console.error('Skill gap analysis error:', error);
            throw new Error('Failed to analyze skill gaps');
        }
    }

    /**
     * Generate personalized learning path using Ollama
     */
    async generateLearningPath(currentSkills, targetRole, missingSkills) {
        try {
            const prompt = `You are a career development expert creating a personalized learning roadmap.

Current Skills: ${currentSkills.join(', ')}
Target Role: ${targetRole}
Skills to Learn: ${missingSkills.map(s => s.skill).join(', ')}

Create a structured learning path with:
1. Learning phases (Beginner, Intermediate, Advanced)
2. For each skill, suggest:
   - Best learning resources (courses, tutorials, books)
   - Estimated time to learn
   - Practice project ideas
   - Priority order (1-5, 5 being highest)

Respond in JSON format:
{
  "learningPath": [
    {
      "phase": "Beginner",
      "skills": [
        {
          "skill": "skill name",
          "priority": 5,
          "estimatedTime": "2 weeks",
          "resources": [
            {
              "type": "course",
              "name": "Course Name",
              "provider": "Platform",
              "url": "https://example.com"
            }
          ],
          "projects": ["project idea 1", "project idea 2"]
        }
      ]
    }
  ],
  "totalEstimatedTime": "3 months",
  "keyMilestones": ["milestone 1", "milestone 2"]
}`;

            const response = await axios.post(this.ollamaUrl, {
                model: this.model,
                prompt: prompt,
                stream: false
            });

            const result = this.parseOllamaResponse(response.data.response);
            return result;
        } catch (error) {
            console.error('Learning path generation error:', error);
            throw new Error('Failed to generate learning path');
        }
    }

    /**
     * Generate career insights using Ollama
     */
    async generateCareerInsights(skills, experience, targetRole) {
        try {
            const prompt = `You are a career strategist providing insights.

Skills: ${skills.join(', ')}
Experience Level: ${experience}
Target Role: ${targetRole}

Provide:
1. Career trajectory predictions (possible roles in 1, 3, 5 years)
2. Salary range estimates for target role
3. Industry trends relevant to these skills
4. Strategic recommendations for career growth

Respond in JSON format:
{
  "careerTrajectory": {
    "oneYear": ["role1", "role2"],
    "threeYears": ["role3", "role4"],
    "fiveYears": ["role5", "role6"]
  },
  "salaryEstimate": {
    "min": 80000,
    "max": 120000,
    "median": 100000,
    "currency": "USD"
  },
  "industryTrends": [
    {
      "trend": "trend name",
      "impact": "high/medium/low",
      "description": "explanation"
    }
  ],
  "recommendations": [
    "recommendation 1",
    "recommendation 2"
  ]
}`;

            const response = await axios.post(this.ollamaUrl, {
                model: this.model,
                prompt: prompt,
                stream: false
            });

            const result = this.parseOllamaResponse(response.data.response);
            return result;
        } catch (error) {
            console.error('Career insights generation error:', error);
            throw new Error('Failed to generate career insights');
        }
    }

    /**
     * Parse Ollama response and extract JSON
     */
    parseOllamaResponse(response) {
        try {
            // Try to find JSON in the response
            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return JSON.parse(jsonMatch[0]);
            }

            // If no JSON found, return the raw response
            return { raw: response };
        } catch (error) {
            console.error('Failed to parse Ollama response:', error);
            return { raw: response };
        }
    }

    /**
     * Analyze portfolio comprehensively
     */
    async analyzePortfolio(portfolioData) {
        try {
            // Extract text from portfolio
            const text = this.extractTextFromPortfolio(portfolioData);

            // Extract skills
            const skills = this.extractSkills(text);

            // Categorize skills
            const categorizedSkills = this.categorizeSkills(skills);

            return {
                extractedSkills: skills,
                categorizedSkills: categorizedSkills,
                totalSkills: skills.length,
                analyzedAt: new Date()
            };
        } catch (error) {
            console.error('Portfolio analysis error:', error);
            throw new Error('Failed to analyze portfolio');
        }
    }

    /**
     * Extract text from portfolio data
     */
    extractTextFromPortfolio(portfolio) {
        let text = '';

        // Handle both old and new portfolio structures
        const content = portfolio.content || portfolio;

        // Personal info
        if (content.personalInfo) {
            const pi = content.personalInfo;
            text += `${pi.name || pi.fullName || ''} `;
            text += `${pi.title || pi.position || ''} `;
            text += `${pi.summary || ''} `;
            text += `${pi.email || ''} `;
            text += `${pi.phone || ''} `;
            text += `${pi.location || ''} `;
        }

        // Experience
        if (content.experience) {
            content.experience.forEach(exp => {
                text += `${exp.position || exp.title || ''} `;
                text += `${exp.company || ''} `;
                text += `${exp.description || ''} `;
            });
        }

        // Education
        if (content.education) {
            content.education.forEach(edu => {
                text += `${edu.degree || ''} `;
                text += `${edu.school || edu.institution || ''} `;
                text += `${edu.description || ''} `;
                text += `${edu.field || ''} `;
            });
        }

        // Projects
        if (content.projects) {
            content.projects.forEach(proj => {
                text += `${proj.name || proj.title || ''} `;
                text += `${proj.description || ''} `;
                text += `${proj.technologies || ''} `;
                text += `${proj.tech || ''} `;
            });
        }

        // Skills
        if (content.skills) {
            content.skills.forEach(skill => {
                text += `${skill.name || skill.skill || ''} `;
                text += `${skill.category || ''} `;
            });
        }

        // Achievements
        if (content.achievements) {
            content.achievements.forEach(achievement => {
                text += `${achievement.title || ''} `;
                text += `${achievement.description || ''} `;
            });
        }

        return text;
    }
}

module.exports = new MLService();
