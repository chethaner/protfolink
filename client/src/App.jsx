import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import PublicPortfolio from './pages/PublicPortfolio';
import Profile from './pages/Profile';
import ATSChecker from './pages/ATSChecker';
import Analytics from './pages/Analytics';
import Admin from './pages/Admin';
import SkillAnalysis from './pages/SkillAnalysis';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import LearningPath from './pages/LearningPath';
import CareerInsights from './pages/CareerInsights';
import Jobs from './pages/Jobs';
import Career from './pages/Career';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/p/:slug" element={<PublicPortfolio />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor/:id" element={<Editor />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/career" element={<Career />} />
            <Route path="/ats/:id" element={<ATSChecker />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/skills" element={<SkillAnalysis />} />
            <Route path="/skill-gaps" element={<SkillGapAnalysis />} />
            <Route path="/learning-path" element={<LearningPath />} />
            <Route path="/career-insights" element={<CareerInsights />} />
            {/* Redirect root to dashboard if logged in, else login */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
        <Chatbot />
      </AuthProvider>
    </Router>
  )
}

export default App
