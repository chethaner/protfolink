# ML/NLP API Documentation

Complete API reference for PORTFOLINK's Machine Learning and Natural Language Processing features.

---

## Base URL

```
http://localhost:5000/api/ml
```

All endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Analyze Portfolio Skills

Extract and categorize skills from a portfolio.

**Endpoint:** `POST /api/ml/analyze-portfolio/:id`

**Parameters:**
- `id` (path) - Portfolio ID

**Response:**
```json
{
  "extractedSkills": ["react", "node.js", "mongodb", "aws"],
  "categorizedSkills": {
    "Frontend": ["react"],
    "Backend": ["node.js"],
    "Databases": ["mongodb"],
    "Cloud & DevOps": ["aws"]
  },
  "totalSkills": 4,
  "analyzedAt": "2025-12-06T12:00:00.000Z"
}
```

**Example:**
```javascript
const { data } = await axios.post(
  `http://localhost:5000/api/ml/analyze-portfolio/${portfolioId}`,
  {},
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

### 2. Skill Gap Analysis

Compare user skills against job requirements.

**Endpoint:** `POST /api/ml/skill-gaps`

**Request Body:**
```json
{
  "userSkills": ["React", "Node.js", "MongoDB"],
  "jobDescription": "Looking for Full Stack Developer with React, Node.js, AWS, Docker..."
}
```

**Response:**
```json
{
  "requiredSkills": ["React", "Node.js", "AWS", "Docker"],
  "matchingSkills": ["React", "Node.js"],
  "missingSkills": [
    {
      "skill": "AWS",
      "importance": 9,
      "reason": "Essential for cloud deployment and scalability"
    },
    {
      "skill": "Docker",
      "importance": 7,
      "reason": "Important for containerization and DevOps"
    }
  ],
  "overallMatch": 50
}
```

**Example:**
```javascript
const { data } = await axios.post(
  'http://localhost:5000/api/ml/skill-gaps',
  {
    userSkills: ['React', 'Node.js', 'MongoDB'],
    jobDescription: 'Full Stack Developer with React, Node.js, AWS, Docker...'
  },
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

### 3. Generate Learning Path

Get personalized learning roadmap.

**Endpoint:** `POST /api/ml/learning-path`

**Request Body:**
```json
{
  "currentSkills": ["React", "JavaScript"],
  "targetRole": "Senior Full Stack Developer",
  "missingSkills": ["AWS", "Docker", "Kubernetes"]
}
```

**Response:**
```json
{
  "learningPath": [
    {
      "phase": "Beginner",
      "skills": [
        {
          "skill": "Docker",
          "priority": 5,
          "estimatedTime": "2 weeks",
          "resources": [
            {
              "type": "course",
              "name": "Docker Mastery",
              "provider": "Udemy",
              "url": "https://udemy.com/docker-mastery"
            }
          ],
          "projects": [
            "Containerize a Node.js app",
            "Create multi-container app with Docker Compose"
          ]
        }
      ]
    },
    {
      "phase": "Intermediate",
      "skills": [...]
    }
  ],
  "totalEstimatedTime": "3 months",
  "keyMilestones": [
    "Complete Docker fundamentals",
    "Deploy first containerized app",
    "Learn Kubernetes basics"
  ]
}
```

**Example:**
```javascript
const { data } = await axios.post(
  'http://localhost:5000/api/ml/learning-path',
  {
    currentSkills: ['React', 'JavaScript'],
    targetRole: 'Senior Full Stack Developer',
    missingSkills: ['AWS', 'Docker', 'Kubernetes']
  },
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

### 4. Career Insights

Get salary estimates and career trajectory predictions.

**Endpoint:** `POST /api/ml/career-insights`

**Request Body:**
```json
{
  "skills": ["React", "Node.js", "AWS", "MongoDB"],
  "experience": "Mid-level",
  "targetRole": "Senior Software Engineer"
}
```

**Response:**
```json
{
  "careerTrajectory": {
    "oneYear": ["Senior Developer", "Tech Lead"],
    "threeYears": ["Engineering Manager", "Principal Engineer"],
    "fiveYears": ["Director of Engineering", "VP of Engineering"]
  },
  "salaryEstimate": {
    "min": 120000,
    "max": 180000,
    "median": 150000,
    "currency": "USD"
  },
  "industryTrends": [
    {
      "trend": "Cloud-native development",
      "impact": "high",
      "description": "Growing demand for cloud expertise"
    }
  ],
  "recommendations": [
    "Focus on system design and architecture",
    "Gain experience leading teams",
    "Contribute to open source projects"
  ]
}
```

**Example:**
```javascript
const { data } = await axios.post(
  'http://localhost:5000/api/ml/career-insights',
  {
    skills: ['React', 'Node.js', 'AWS', 'MongoDB'],
    experience: 'Mid-level',
    targetRole: 'Senior Software Engineer'
  },
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

### 5. Get My Analyses

Retrieve user's skill analyses history.

**Endpoint:** `GET /api/ml/my-analyses`

**Response:**
```json
[
  {
    "_id": "...",
    "portfolio": {
      "_id": "...",
      "title": "My Portfolio"
    },
    "extractedSkills": ["react", "node.js"],
    "categorizedSkills": {...},
    "totalSkills": 15,
    "createdAt": "2025-12-06T12:00:00.000Z"
  }
]
```

**Example:**
```javascript
const { data } = await axios.get(
  'http://localhost:5000/api/ml/my-analyses',
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

### 6. Get My Learning Paths

Retrieve user's saved learning paths.

**Endpoint:** `GET /api/ml/my-learning-paths`

**Response:**
```json
[
  {
    "_id": "...",
    "targetRole": "Senior Full Stack Developer",
    "currentSkills": ["React", "Node.js"],
    "learningPath": {...},
    "totalEstimatedTime": "3 months",
    "progress": 0,
    "createdAt": "2025-12-06T12:00:00.000Z"
  }
]
```

**Example:**
```javascript
const { data } = await axios.get(
  'http://localhost:5000/api/ml/my-learning-paths',
  { headers: { Authorization: `Bearer ${token}` } }
);
```

---

## Skill Categories

The ML service recognizes 150+ skills across 9 categories:

1. **Programming Languages** (23): JavaScript, Python, Java, C++, TypeScript, Go, Rust, etc.
2. **Frontend** (30): React, Vue, Angular, Next.js, Tailwind, Bootstrap, etc.
3. **Backend** (16): Node.js, Express, Django, Flask, Spring Boot, Laravel, etc.
4. **Databases** (15): MongoDB, PostgreSQL, MySQL, Redis, Elasticsearch, etc.
5. **Cloud & DevOps** (19): AWS, Azure, GCP, Docker, Kubernetes, Jenkins, etc.
6. **Mobile** (9): React Native, Flutter, iOS, Android, Swift UI, etc.
7. **ML/AI & Data Science** (16): TensorFlow, PyTorch, Pandas, Jupyter, etc.
8. **Testing** (14): Jest, Cypress, Selenium, Pytest, etc.
9. **Tools & Platforms** (19): Git, VS Code, Linux, Nginx, Jira, etc.

---

## Error Handling

All endpoints return standard HTTP status codes:

- `200` - Success
- `400` - Bad Request (invalid input)
- `401` - Unauthorized (missing/invalid token)
- `404` - Not Found (portfolio doesn't exist)
- `500` - Server Error

**Error Response Format:**
```json
{
  "message": "Error description"
}
```

---

## Rate Limiting

Ollama-based endpoints (skill-gaps, learning-path, career-insights) may take 3-7 seconds to respond as they use AI inference. Consider implementing:

- Loading states in UI
- Request timeouts (30s recommended)
- Caching for common queries

---

## Technologies Used

- **Compromise.js**: Fast NLP for skill extraction
- **Ollama**: Local AI for intelligent analysis (llama3.2)
- **MongoDB**: Data persistence
- **Express**: API routing

---

## Example Integration

```javascript
// Complete workflow example
import axios from 'axios';

const token = localStorage.getItem('token');
const api = axios.create({
  baseURL: 'http://localhost:5000/api/ml',
  headers: { Authorization: `Bearer ${token}` }
});

// 1. Analyze portfolio
const analysis = await api.post(`/analyze-portfolio/${portfolioId}`);
console.log('Skills found:', analysis.data.totalSkills);

// 2. Check skill gaps
const gaps = await api.post('/skill-gaps', {
  userSkills: analysis.data.extractedSkills,
  jobDescription: 'Your job description here...'
});
console.log('Match:', gaps.data.overallMatch + '%');

// 3. Generate learning path
const path = await api.post('/learning-path', {
  currentSkills: analysis.data.extractedSkills,
  targetRole: 'Senior Developer',
  missingSkills: gaps.data.missingSkills
});
console.log('Learning time:', path.data.totalEstimatedTime);

// 4. Get career insights
const insights = await api.post('/career-insights', {
  skills: analysis.data.extractedSkills,
  experience: 'Mid-level',
  targetRole: 'Senior Developer'
});
console.log('Salary range:', insights.data.salaryEstimate);
```

---

## Notes

- All Ollama responses are parsed for JSON format
- Skill extraction is case-insensitive
- Skills are matched with variations (e.g., "React.js", "ReactJS" → "react")
- Learning paths are saved automatically
- Analyses are linked to portfolios for tracking
