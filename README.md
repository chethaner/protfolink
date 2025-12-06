# Portfolink

AI-powered resume and portfolio builder with public sharing and PDF export.

## Project Structure

```
/portfolink
  /client - React frontend (Vite + Tailwind)
  /server - Express backend (Node + MongoDB)
```

## Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Installation

1. **Install root dependencies**
   ```bash
   npm install
   ```

2. **Install client dependencies**
   ```bash
   cd client && npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server && npm install
   ```

### Configuration

Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolink
JWT_SECRET=your_jwt_secret_key_here
```

### Running the Application

**Development mode (both client and server):**
```bash
npm start
```

**Or run separately:**

**Server:**
```bash
cd server
npm run dev
```

**Client:**
```bash
cd client
npm run dev
```

## Features

### ✅ Implemented
- **User Authentication** (JWT-based)
  - Sign up, Login, Logout
  - 3 portfolio limit per user
- **Portfolio Dashboard**
  - Create, Edit, Delete, Duplicate portfolios
  - Publish/Unpublish toggle
  - PDF export button
  - Public URL display
- **Portfolio Editor**
  - Personal Info, Experience, Education, Projects, Skills sections
  - Rich text editor (ReactQuill) for descriptions
  - Drag-and-drop section reordering
  - Auto-save (1-second debounce)
  - Live preview
- **AI Assistant** 🤖
  - Improve text
  - Make professional
  - Shorten/Expand
  - Convert to bullets
  - Powered by Ollama (local AI models)
- **Templates** (3 available)
  - Modern Professional (colorful with gradients)
  - Minimal ATS (clean and ATS-friendly)
  - Two Column (sidebar layout)
- **Publishing**
  - Unique slug generation
  - Public portfolio pages (`/p/your-slug`)
  - Publish/Unpublish functionality
  - QR code generation for easy sharing
  - Analytics and view count tracking
- **PDF Export**
  - Server-side generation with Puppeteer
  - A4 format
  - Matches template design
- **Admin Dashboard** 🔐
  - System statistics
  - User management (view, delete)
  - Portfolio management (view, delete)
  - Protected by admin authentication
- **Profile Management**
  - User profile settings page
  - Update account information
  - Manage preferences
- **ML/NLP Career Tools** 🤖🎯
  - **Skill Analysis**: Automatic extraction of 150+ technical skills from portfolios
  - **Skill Gap Analysis**: Compare your skills against job requirements with match percentage
  - **Learning Path Generator**: Get personalized learning roadmaps with course recommendations
  - **Career Insights**: AI-powered salary estimates and career trajectory predictions
  - Powered by Ollama (local AI) + Compromise.js (NLP)
  - 9 skill categories: Programming, Frontend, Backend, Databases, Cloud, Mobile, ML/AI, Testing, Tools
  - Visual charts and interactive dashboards
  - Export analysis results (JSON, CSV, PDF)
- **AI-Powered Job Recommendations** 💼
  - Smart job matching based on your portfolio skills
  - Match percentage badges (70%+ green, 40-69% yellow, <40% red)
  - Skill highlighting (green checkmarks for matching skills)
  - Auto-sorted by best match first
  - Job search and location filters
  - Luxury black/white/gold UI with animations
- **Analytics Dashboard** 📊
  - Portfolio performance tracking
  - View statistics (total portfolios, published, total views, avg views)
  - Interactive charts (Line chart for views over time, Doughnut chart for status)
  - Top 5 performing portfolios list
  - Real-time data visualization
- **Career Goals Tracker** 🎯
  - Add and manage career goals with deadlines
  - Progress tracking with visual bars
  - Update progress (+10%, -10%, Complete)
  - Goal completion statistics
  - Delete and edit goals
  - Overall progress percentage

## Tech Stack

**Frontend:**
- React, Vite, Tailwind CSS
- React Router, Axios
- React Hot Toast

**Backend:**
- Node.js, Express
- MongoDB + Mongoose
- JWT Authentication
- Puppeteer (PDF generation)
- Slugify

## API Endpoints

### Auth
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Portfolios
- `GET /api/portfolios` - Get all user portfolios
- `POST /api/portfolios` - Create portfolio
- `GET /api/portfolios/:id` - Get single portfolio
- `PUT /api/portfolios/:id` - Update portfolio
- `DELETE /api/portfolios/:id` - Delete portfolio
- `POST /api/portfolios/:id/duplicate` - Duplicate portfolio

### Publishing
- `POST /api/public/:id/publish` - Publish portfolio
- `POST /api/public/:id/unpublish` - Unpublish portfolio
- `GET /api/public/:slug` - Get public portfolio

### PDF Export
- `GET /api/pdf/:id/pdf` - Download portfolio as PDF

### AI
- `POST /api/ai/improve` - Improve text with AI

### ML/NLP
- `POST /api/ml/analyze-portfolio/:id` - Extract skills from portfolio
- `POST /api/ml/skill-gaps` - Analyze skill gaps vs job description
- `POST /api/ml/learning-path` - Generate personalized learning roadmap
- `POST /api/ml/career-insights` - Get salary estimates and career predictions
- `GET /api/ml/my-analyses` - Get user's skill analyses
- `GET /api/ml/my-learning-paths` - Get user's saved learning paths

## Usage

1. **Register/Login** → Create account
2. **Create Portfolio** → Click "Create New" on dashboard
3. **Edit Sections** → Fill out your information
4. **Use AI Assistant** → Click ✨ button to improve text
5. **Preview** → See live preview on the right
6. **Publish** → Click 🌐 to make public
7. **Export PDF** → Click "PDF" to download

### ML/NLP Career Tools

8. **Skill Analysis** → Dashboard → Skills → Select portfolio → Analyze
9. **Skill Gap Analysis** → Dashboard → Skill Gaps → Enter skills + job description
10. **Learning Path** → Dashboard → Learning Path → Enter skills + target role
11. **Career Insights** → Dashboard → Career Insights → Get salary predictions

## Admin Panel

Access the admin dashboard at `/admin` to manage users and portfolios.

**Granting Admin Access:**
```bash
# Using Node.js script
cd server
node scripts/grantAdmin.js

# Or manually via MongoDB
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { isAdmin: true, role: "admin" } }
)
```

**Features:** System stats, user management, portfolio management

**API Endpoints:** `/api/admin/stats`, `/api/admin/users`, `/api/admin/portfolios`

## License

MIT
