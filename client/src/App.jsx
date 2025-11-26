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
import CareerGoals from './pages/CareerGoals';
import CareerGoalDetail from './pages/CareerGoalDetail';
import ATSChecker from './pages/ATSChecker';
import Analytics from './pages/Analytics';
import JobSuggestions from './pages/JobSuggestions';
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
            <Route path="/career" element={<CareerGoals />} />
            <Route path="/career/:id" element={<CareerGoalDetail />} />
            <Route path="/ats/:id" element={<ATSChecker />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/jobs" element={<JobSuggestions />} />
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
