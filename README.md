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
  - Auto-save (1-second debounce)
  - Live preview
- **AI Assistant** 🤖
  - Improve text
  - Make professional
  - Shorten/Expand
  - Convert to bullets
  - (Currently using mock AI - ready for OpenAI/Gemini integration)
- **Templates** (3 available)
  - Modern Professional (colorful with gradients)
  - Minimal ATS (clean and ATS-friendly)
  - Two Column (sidebar layout)
- **Publishing**
  - Unique slug generation
  - Public portfolio pages (`/p/your-slug`)
  - Publish/Unpublish functionality
- **PDF Export**
  - Server-side generation with Puppeteer
  - A4 format
  - Matches template design

### 🚧 Not Yet Implemented
- Real AI integration (OpenAI/Gemini)
- Rich text editor
- Drag-and-drop section reordering
- Profile management page
- Password-protected portfolios
- QR code generation
- Analytics (view counts)
- Admin dashboard

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

## Usage

1. **Register/Login** → Create account
2. **Create Portfolio** → Click "Create New" on dashboard
3. **Edit Sections** → Fill out your information
4. **Use AI Assistant** → Click ✨ button to improve text
5. **Preview** → See live preview on the right
6. **Publish** → Click 🌐 to make public
7. **Export PDF** → Click "PDF" to download

## License

MIT
