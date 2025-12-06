import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import { ScrollReveal, ParallaxSection, FloatingOrb, MagneticButton, ScrollProgress } from '../components/animations/ScrollEffects';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to access dashboard');
            navigate('/login');
            return;
        }
        fetchPortfolios();
    }, [navigate]);

    const fetchPortfolios = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/portfolios', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPortfolios(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('token');
                navigate('/login');
            } else {
                toast.error('Failed to load portfolios');
            }
        } finally {
            setLoading(false);
        }
    };

    const createPortfolio = async () => {
        if (portfolios.length >= 3) {
            toast.error('Maximum 3 portfolios allowed');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(
                'http://localhost:5000/api/portfolios',
                { title: `Portfolio ${portfolios.length + 1}` },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            navigate(`/editor/${data._id}`);
        } catch (error) {
            toast.error('Failed to create portfolio');
        }
    };

    const deletePortfolio = async (id) => {
        if (!window.confirm('Delete this portfolio?')) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/portfolios/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Portfolio deleted');
            fetchPortfolios();
        } catch (error) {
            toast.error('Failed to delete');
        }
    };

    const duplicatePortfolio = async (id) => {
        if (portfolios.length >= 3) {
            toast.error('Maximum 3 portfolios allowed');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            await axios.post(`http://localhost:5000/api/portfolios/${id}/duplicate`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Portfolio duplicated successfully');
            fetchPortfolios();
        } catch (error) {
            toast.error('Failed to duplicate portfolio');
        }
    };

    const togglePublic = async (id, currentStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/portfolios/${id}`,
                { isPublic: !currentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(currentStatus ? 'Portfolio set to private' : 'Portfolio is now public!');
            fetchPortfolios();
        } catch (error) {
            toast.error('Failed to update portfolio status');
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)' }}>
            <ScrollProgress />

            {/* Luxury Floating Orbs Background */}
            <FloatingOrb delay={0} size={600} color="#D4AF37" />
            <FloatingOrb delay={5} size={400} color="#0A0A0A" />
            <FloatingOrb delay={10} size={500} color="#D4AF37" />

            {/* Premium Luxury Header */}
            <motion.div
                className="bg-white/90 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)' }}
            >
                <div className="luxury-container px-6 py-5">
                    <div className="flex justify-between items-center">
                        {/* Luxury Logo */}
                        <motion.div
                            className="flex items-center gap-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            <h1 className="text-4xl font-bold cursor-pointer" style={{ fontFamily: 'var(--font-heading)' }}>
                                <span style={{ color: 'var(--luxury-black)' }}>PORT</span>
                                <span style={{ color: 'var(--luxury-gold)' }}>FOLINK</span>
                            </h1>
                            <motion.span
                                className="hidden md:block text-gray-600 text-sm font-medium px-3 py-1 bg-gray-100 rounded-full"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                ✨ Luxury Portfolio Builder
                            </motion.span>
                        </motion.div>

                        {/* Navigation */}
                        <div className="flex items-center gap-2">
                            {['Jobs', 'Analytics', 'Goals', 'Profile'].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        to={`/${item.toLowerCase() === 'goals' ? 'career' : item.toLowerCase()}`}
                                        className="text-gray-700 hover:text-black flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
                                    >
                                        <span className="text-xl">
                                            {item === 'Jobs' && '💼'}
                                            {item === 'Analytics' && '📊'}
                                            {item === 'Goals' && '🎯'}
                                            {item === 'Profile' && '👤'}
                                        </span>
                                        <span className="hidden md:inline">{item}</span>
                                    </Link>
                                </motion.div>
                            ))}

                            {user?.isAdmin && (
                                <Link
                                    to="/admin"
                                    className="text-gray-700 hover:text-black flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
                                >
                                    <span className="text-xl">⚙️</span>
                                    <span className="hidden md:inline">Admin</span>
                                </Link>
                            )}

                            <motion.button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-red-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="text-xl">🚪</span>
                                <span className="hidden md:inline">Logout</span>
                            </motion.button>

                            <MagneticButton
                                onClick={createPortfolio}
                                className="luxury-button luxury-button-gold flex items-center gap-2 ml-2"
                            >
                                <span className="text-xl">+</span>
                                <span>Create New</span>
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ML Tools Section */}
            <div className="luxury-container px-6 py-8">
                <ScrollReveal>
                    <div className="luxury-card p-6 mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl">🤖</span>
                            <h2 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                                AI-Powered Career Tools
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link
                                to="/skills"
                                className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-lg transition-all group"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition">🎯</div>
                                <h3 className="font-bold text-lg mb-1">Skill Analysis</h3>
                                <p className="text-sm text-gray-600">Extract & visualize your skills</p>
                            </Link>

                            <Link
                                to="/skill-gaps"
                                className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-lg transition-all group"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition">📊</div>
                                <h3 className="font-bold text-lg mb-1">Skill Gaps</h3>
                                <p className="text-sm text-gray-600">Compare vs job requirements</p>
                            </Link>

                            <Link
                                to="/learning-path"
                                className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-lg transition-all group"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition">📚</div>
                                <h3 className="font-bold text-lg mb-1">Learning Path</h3>
                                <p className="text-sm text-gray-600">Get personalized roadmaps</p>
                            </Link>

                            <Link
                                to="/career-insights"
                                className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg hover:shadow-lg transition-all group"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition">💼</div>
                                <h3 className="font-bold text-lg mb-1">Career Insights</h3>
                                <p className="text-sm text-gray-600">Salary & career predictions</p>
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Main Content */}
            <div className="luxury-container px-6 py-16 relative z-10">
                <ParallaxSection speed={0.3}>
                    <ScrollReveal>
                        <div className="mb-16 text-center">
                            <motion.h1
                                className="text-6xl md:text-7xl font-bold mb-4"
                                style={{ fontFamily: 'var(--font-heading)', color: 'var(--luxury-black)' }}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                My Portfolios
                            </motion.h1>
                            <motion.p
                                className="text-gray-600 text-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Create and manage your professional portfolios
                            </motion.p>
                            <div className="luxury-divider w-32 mx-auto mt-8"></div>
                        </div>
                    </ScrollReveal>
                </ParallaxSection>

                {portfolios.length === 0 ? (
                    <ScrollReveal delay={0.2}>
                        <div className="text-center py-32 luxury-card max-w-3xl mx-auto">
                            <motion.div
                                className="text-9xl mb-8"
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                📁
                            </motion.div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                No Portfolios Yet
                            </h2>
                            <p className="text-gray-600 mb-12 text-xl">Create your first luxury portfolio to begin your journey!</p>
                            <MagneticButton
                                onClick={createPortfolio}
                                className="luxury-button luxury-button-gold px-12 py-5 text-lg"
                            >
                                ✨ Create Your First Portfolio
                            </MagneticButton>
                        </div>
                    </ScrollReveal>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {portfolios.map((portfolio, index) => (
                            <ScrollReveal key={portfolio._id} delay={index * 0.1}>
                                <motion.div
                                    className="luxury-card overflow-hidden"
                                    whileHover={{ y: -8, boxShadow: '0 16px 48px rgba(0, 0, 0, 0.16)' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="relative h-56 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden group">
                                        <motion.div
                                            className="absolute inset-0"
                                            style={{ background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, transparent 100%)' }}
                                            whileHover={{ opacity: 0.3 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                        <motion.span
                                            className="text-white text-7xl relative z-10 flex items-center justify-center h-full"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            📄
                                        </motion.span>
                                        <div className="absolute top-4 right-4 z-10">
                                            {portfolio.isPublic ? (
                                                <motion.span
                                                    className="bg-green-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg"
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                >
                                                    🌐 Live
                                                </motion.span>
                                            ) : (
                                                <span className="bg-gray-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                                                    🔒 Draft
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white">
                                        <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                            {portfolio.title || 'Untitled Portfolio'}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-6">
                                            Updated {format(new Date(portfolio.updatedAt), 'MMM d, yyyy')}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="space-y-3">
                                            <div className="flex gap-3">
                                                <Link
                                                    to={`/editor/${portfolio._id}`}
                                                    className="flex-1 luxury-button luxury-button-gold text-center text-sm py-3"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                                <Link
                                                    to={portfolio.isPublic && portfolio.slug ? `/p/${portfolio.slug}` : `/preview/${portfolio._id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 luxury-button luxury-button-outline text-center text-sm py-3"
                                                >
                                                    👁️ Preview
                                                </Link>
                                            </div>

                                            <div className="flex gap-3">
                                                <motion.button
                                                    onClick={() => duplicatePortfolio(portfolio._id)}
                                                    className="flex-1 luxury-button luxury-button-outline text-sm py-3"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    📋 Duplicate
                                                </motion.button>
                                                {portfolio.isPublic && portfolio.slug && (
                                                    <motion.button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(`${window.location.origin}/p/${portfolio.slug}`);
                                                            toast.success('Link copied to clipboard!');
                                                        }}
                                                        className="flex-1 luxury-button luxury-button-primary text-sm py-3"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        🔗 Share
                                                    </motion.button>
                                                )}
                                            </div>

                                            <div className="flex gap-3">
                                                <motion.button
                                                    onClick={() => togglePublic(portfolio._id, portfolio.isPublic)}
                                                    className={`flex-1 px-4 py-3 rounded font-medium text-sm transition ${portfolio.isPublic
                                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                                        : 'bg-gray-500 text-white hover:bg-gray-600'
                                                        }`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {portfolio.isPublic ? '🌐 Make Private' : '🔒 Make Public'}
                                                </motion.button>
                                            </div>

                                            <div className="flex gap-3">
                                                <motion.button
                                                    onClick={() => deletePortfolio(portfolio._id)}
                                                    className="w-full px-4 py-3 border border-red-500 text-red-500 rounded hover:bg-red-50 transition text-sm font-medium"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    🗑️ Delete
                                                </motion.button>
                                            </div>
                                        </div>

                                        {portfolio.isPublic && portfolio.slug && (
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <p className="text-xs text-gray-500 mb-2">Public URL:</p>
                                                <a
                                                    href={`/p/${portfolio.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-[#D4AF37] hover:text-[#C19B2A] font-medium transition flex-1 truncate block"
                                                >
                                                    {window.location.origin}/p/{portfolio.slug}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
