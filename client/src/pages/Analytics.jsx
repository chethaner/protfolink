import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ScrollReveal, FloatingOrb, MagneticButton } from '../components/animations/ScrollEffects';
import { Line, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

const Analytics = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/portfolios', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPortfolios(data);
        } catch (error) {
            console.error('Failed to fetch portfolios');
        } finally {
            setLoading(false);
        }
    };

    // Calculate analytics
    const totalPortfolios = portfolios.length;
    const publishedPortfolios = portfolios.filter(p => p.isPublished).length;
    const totalViews = portfolios.reduce((sum, p) => sum + (p.views || 0), 0);
    const avgViews = totalPortfolios > 0 ? Math.round(totalViews / totalPortfolios) : 0;

    // Views over time data (mock data)
    const viewsData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Portfolio Views',
            data: [12, 19, 15, 25, 22, 30, 28],
            borderColor: '#D4AF37',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            tension: 0.4
        }]
    };

    // Portfolio status data
    const statusData = {
        labels: ['Published', 'Draft'],
        datasets: [{
            data: [publishedPortfolios, totalPortfolios - publishedPortfolios],
            backgroundColor: ['#22C55E', '#EF4444']
        }]
    };

    // Top portfolios by views
    const topPortfolios = [...portfolios]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)' }}>
            <FloatingOrb delay={0} size={600} color="#D4AF37" />
            <FloatingOrb delay={5} size={400} color="#0A0A0A" />

            {/* Header */}
            <motion.div
                className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-16"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                style={{ borderBottom: '2px solid #D4AF37' }}
            >
                <div className="luxury-container px-6">
                    <ScrollReveal>
                        <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    📊 Analytics Dashboard
                                </h1>
                                <p className="text-sm md:text-base text-gray-300">Track your portfolio performance</p>
                            </div>
                            <MagneticButton
                                onClick={() => navigate('/dashboard')}
                                className="luxury-button luxury-button-outline"
                            >
                                ← Dashboard
                            </MagneticButton>
                        </div>
                    </ScrollReveal>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="luxury-container px-4 md:px-6 py-8 md:py-12 relative z-10">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <ScrollReveal>
                        <motion.div
                            className="luxury-card p-6 bg-gradient-to-br from-blue-50 to-blue-100"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-3xl mb-2">📁</div>
                            <h3 className="text-gray-600 text-sm mb-1">Total Portfolios</h3>
                            <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{totalPortfolios}</p>
                        </motion.div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <motion.div
                            className="luxury-card p-6 bg-gradient-to-br from-green-50 to-green-100"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-3xl mb-2">🌐</div>
                            <h3 className="text-gray-600 text-sm mb-1">Published</h3>
                            <p className="text-3xl font-bold text-green-600">{publishedPortfolios}</p>
                        </motion.div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <motion.div
                            className="luxury-card p-6 bg-gradient-to-br from-purple-50 to-purple-100"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-3xl mb-2">👁️</div>
                            <h3 className="text-gray-600 text-sm mb-1">Total Views</h3>
                            <p className="text-3xl font-bold text-purple-600">{totalViews}</p>
                        </motion.div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.3}>
                        <motion.div
                            className="luxury-card p-6 bg-gradient-to-br from-amber-50 to-amber-100"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-3xl mb-2">📈</div>
                            <h3 className="text-gray-600 text-sm mb-1">Avg Views</h3>
                            <p className="text-3xl font-bold text-amber-600">{avgViews}</p>
                        </motion.div>
                    </ScrollReveal>
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <ScrollReveal>
                        <div className="luxury-card p-6">
                            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                Views Over Time
                            </h3>
                            <Line data={viewsData} options={{ responsive: true, maintainAspectRatio: true }} />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <div className="luxury-card p-6">
                            <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                Portfolio Status
                            </h3>
                            <div className="max-w-xs mx-auto">
                                <Doughnut data={statusData} options={{ responsive: true, maintainAspectRatio: true }} />
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Top Portfolios */}
                <ScrollReveal>
                    <div className="luxury-card p-6">
                        <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                            Top Performing Portfolios
                        </h3>
                        <div className="space-y-4">
                            {topPortfolios.map((portfolio, index) => (
                                <motion.div
                                    key={portfolio._id}
                                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                                            #{index + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{portfolio.title || 'Untitled Portfolio'}</h4>
                                            <p className="text-sm text-gray-600">
                                                {portfolio.isPublished ? '🌐 Published' : '📝 Draft'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold">{portfolio.views || 0}</p>
                                        <p className="text-sm text-gray-600">views</p>
                                    </div>
                                </motion.div>
                            ))}
                            {topPortfolios.length === 0 && (
                                <div className="text-center py-8 text-gray-500">
                                    No portfolios yet. Create your first portfolio to see analytics!
                                </div>
                            )}
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
};

export default Analytics;
