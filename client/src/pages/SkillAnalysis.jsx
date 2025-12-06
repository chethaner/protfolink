import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ScrollReveal, FloatingOrb, MagneticButton } from '../components/animations/ScrollEffects';
import { exportAsJSON, exportSkillsAsCSV, exportSkillsAsPDF } from '../utils/exportUtils';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SkillAnalysis = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [portfolios, setPortfolios] = useState([]);
    const [selectedPortfolio, setSelectedPortfolio] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        fetchPortfolios();
    }, [user, navigate]);

    const fetchPortfolios = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/portfolios', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPortfolios(data);
            if (data.length > 0) {
                setSelectedPortfolio(data[0]._id);
            }
        } catch (error) {
            toast.error('Failed to load portfolios');
        }
    };

    const analyzePortfolio = async () => {
        if (!selectedPortfolio) {
            toast.error('Please select a portfolio');
            return;
        }

        setAnalyzing(true);
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.post(
                `http://localhost:5000/api/ml/analyze-portfolio/${selectedPortfolio}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAnalysis(data);
            toast.success('Portfolio analyzed successfully!');
        } catch (error) {
            toast.error('Failed to analyze portfolio');
        } finally {
            setAnalyzing(false);
        }
    };

    const getSkillCategoryData = () => {
        if (!analysis?.categorizedSkills) return null;

        const categories = Object.keys(analysis.categorizedSkills);
        const counts = categories.map(cat => analysis.categorizedSkills[cat].length);

        return {
            labels: categories,
            datasets: [{
                data: counts,
                backgroundColor: [
                    '#D4AF37',
                    '#0A0A0A',
                    '#4F46E5',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6'
                ]
            }]
        };
    };

    const getSkillBarData = () => {
        if (!analysis?.categorizedSkills) return null;

        const categories = Object.keys(analysis.categorizedSkills);
        const counts = categories.map(cat => analysis.categorizedSkills[cat].length);

        return {
            labels: categories,
            datasets: [{
                label: 'Number of Skills',
                data: counts,
                backgroundColor: '#D4AF37'
            }]
        };
    };

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
                                    🎯 Skill Analysis
                                </h1>
                                <p className="text-sm md:text-base text-gray-300">AI-powered skill extraction and analysis</p>
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
            <div className="luxury-container px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Analyzer */}
                    <div className="lg:col-span-1">
                        <ScrollReveal>
                            <div className="luxury-card p-6">
                                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Analyze Portfolio
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Select Portfolio
                                        </label>
                                        <select
                                            value={selectedPortfolio}
                                            onChange={(e) => setSelectedPortfolio(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                        >
                                            {portfolios.map(portfolio => (
                                                <option key={portfolio._id} value={portfolio._id}>
                                                    {portfolio.title || 'Untitled Portfolio'}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <MagneticButton
                                        onClick={analyzePortfolio}
                                        disabled={analyzing || !selectedPortfolio}
                                        className="luxury-button luxury-button-gold w-full"
                                    >
                                        {analyzing ? 'Analyzing...' : '🔍 Analyze Skills'}
                                    </MagneticButton>

                                    {analysis && (
                                        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                            <p className="text-sm text-green-800">
                                                ✅ Found <strong>{analysis.totalSkills}</strong> skills
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-2">
                        {analysis ? (
                            <div className="space-y-6">
                                {/* Charts */}
                                <ScrollReveal>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Pie Chart */}
                                        <div className="luxury-card p-6">
                                            <h3 className="text-lg font-bold mb-4">Skill Distribution</h3>
                                            {getSkillCategoryData() && (
                                                <Pie data={getSkillCategoryData()} />
                                            )}
                                        </div>

                                        {/* Bar Chart */}
                                        <div className="luxury-card p-6">
                                            <h3 className="text-lg font-bold mb-4">Skills by Category</h3>
                                            {getSkillBarData() && (
                                                <Bar data={getSkillBarData()} />
                                            )}
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Categorized Skills */}
                                <ScrollReveal delay={0.2}>
                                    <div className="luxury-card p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>
                                                Extracted Skills
                                            </h3>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => exportAsJSON(analysis, 'skill-analysis')}
                                                    className="px-4 py-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#B8941F] transition text-sm"
                                                >
                                                    📥 JSON
                                                </button>
                                                <button
                                                    onClick={() => exportSkillsAsCSV(analysis.categorizedSkills)}
                                                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-sm"
                                                >
                                                    📊 CSV
                                                </button>
                                                <button
                                                    onClick={() => exportSkillsAsPDF(analysis)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                                                >
                                                    📄 PDF
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {Object.entries(analysis.categorizedSkills || {}).map(([category, skills]) => (
                                                <div key={category}>
                                                    <h4 className="text-lg font-semibold mb-3" style={{ color: '#D4AF37' }}>
                                                        {category}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {skills.map((skill, index) => (
                                                            <motion.span
                                                                key={index}
                                                                className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                                                                whileHover={{ scale: 1.05, backgroundColor: '#D4AF37', color: '#FFFFFF' }}
                                                            >
                                                                {skill}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        ) : (
                            <ScrollReveal>
                                <div className="luxury-card p-12 text-center">
                                    <div className="text-6xl mb-4">🎯</div>
                                    <h3 className="text-2xl font-bold mb-2">No Analysis Yet</h3>
                                    <p className="text-gray-600">
                                        Select a portfolio and click "Analyze Skills" to get started
                                    </p>
                                </div>
                            </ScrollReveal>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillAnalysis;
