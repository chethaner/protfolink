import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ScrollReveal, FloatingOrb, MagneticButton } from '../components/animations/ScrollEffects';

const CareerInsights = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('Mid-level');
    const [targetRole, setTargetRole] = useState('');
    const [insights, setInsights] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateInsights = async () => {
        if (!skills.trim() || !targetRole.trim()) {
            toast.error('Please enter your skills and target role');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);

            const { data } = await axios.post(
                'http://localhost:5000/api/ml/career-insights',
                {
                    skills: skillsArray,
                    experience: experience,
                    targetRole: targetRole
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setInsights(data);
            toast.success('Career insights generated!');
        } catch (error) {
            console.error('Career insights error:', error);
            toast.error('Failed to generate career insights');
        } finally {
            setLoading(false);
        }
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
                                    💼 Career Insights
                                </h1>
                                <p className="text-sm md:text-base text-gray-300">AI-powered career trajectory and salary predictions</p>
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Input Section */}
                    <div className="lg:col-span-1">
                        <ScrollReveal>
                            <div className="luxury-card p-6">
                                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Get Insights
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Skills
                                        </label>
                                        <textarea
                                            value={skills}
                                            onChange={(e) => setSkills(e.target.value)}
                                            placeholder="React, Node.js, AWS, Python..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
                                            rows="4"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Experience Level
                                        </label>
                                        <select
                                            value={experience}
                                            onChange={(e) => setExperience(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                        >
                                            <option value="Entry-level">Entry-level (0-2 years)</option>
                                            <option value="Mid-level">Mid-level (3-5 years)</option>
                                            <option value="Senior">Senior (6-10 years)</option>
                                            <option value="Lead">Lead (10+ years)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Target Role
                                        </label>
                                        <input
                                            type="text"
                                            value={targetRole}
                                            onChange={(e) => setTargetRole(e.target.value)}
                                            placeholder="e.g., Senior Software Engineer"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                        />
                                    </div>

                                    <MagneticButton
                                        onClick={generateInsights}
                                        disabled={loading}
                                        className="luxury-button luxury-button-gold w-full"
                                    >
                                        {loading ? 'Analyzing...' : '🔮 Generate Insights'}
                                    </MagneticButton>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2">
                        {insights ? (
                            <div className="space-y-6">
                                {/* Salary Estimate */}
                                {insights.salaryEstimate && (
                                    <ScrollReveal>
                                        <div className="luxury-card p-6">
                                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                                                💰 Salary Estimate
                                            </h3>
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div className="p-4 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-600 mb-1">Minimum</p>
                                                    <p className="text-2xl font-bold">
                                                        ${insights.salaryEstimate.min?.toLocaleString() || 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-[#D4AF37] bg-opacity-10 rounded-lg">
                                                    <p className="text-sm text-gray-600 mb-1">Median</p>
                                                    <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                                                        ${insights.salaryEstimate.median?.toLocaleString() || 'N/A'}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-gray-50 rounded-lg">
                                                    <p className="text-sm text-gray-600 mb-1">Maximum</p>
                                                    <p className="text-2xl font-bold">
                                                        ${insights.salaryEstimate.max?.toLocaleString() || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            {insights.salaryEstimate.currency && (
                                                <p className="text-sm text-gray-500 text-center mt-2">
                                                    Currency: {insights.salaryEstimate.currency}
                                                </p>
                                            )}
                                        </div>
                                    </ScrollReveal>
                                )}

                                {/* Career Trajectory */}
                                {insights.careerTrajectory && (
                                    <ScrollReveal delay={0.1}>
                                        <div className="luxury-card p-6">
                                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                                                🚀 Career Trajectory
                                            </h3>
                                            <div className="space-y-4">
                                                {insights.careerTrajectory.oneYear && (
                                                    <div>
                                                        <h4 className="font-semibold mb-2">1 Year:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {insights.careerTrajectory.oneYear.map((role, index) => (
                                                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                                    {role}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {insights.careerTrajectory.threeYears && (
                                                    <div>
                                                        <h4 className="font-semibold mb-2">3 Years:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {insights.careerTrajectory.threeYears.map((role, index) => (
                                                                <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                                                                    {role}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                                {insights.careerTrajectory.fiveYears && (
                                                    <div>
                                                        <h4 className="font-semibold mb-2">5 Years:</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {insights.careerTrajectory.fiveYears.map((role, index) => (
                                                                <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                                    {role}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )}

                                {/* Industry Trends */}
                                {insights.industryTrends && insights.industryTrends.length > 0 && (
                                    <ScrollReveal delay={0.2}>
                                        <div className="luxury-card p-6">
                                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                                                📈 Industry Trends
                                            </h3>
                                            <div className="space-y-4">
                                                {insights.industryTrends.map((trend, index) => (
                                                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <h4 className="font-semibold">{trend.trend}</h4>
                                                            <span className={`px-2 py-1 rounded text-xs ${trend.impact === 'high' ? 'bg-red-100 text-red-800' :
                                                                trend.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-green-100 text-green-800'
                                                                }`}>
                                                                {trend.impact} impact
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{trend.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )}

                                {/* Recommendations */}
                                {insights.recommendations && insights.recommendations.length > 0 && (
                                    <ScrollReveal delay={0.3}>
                                        <div className="luxury-card p-6">
                                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                                                💡 Strategic Recommendations
                                            </h3>
                                            <ul className="space-y-3">
                                                {insights.recommendations.map((rec, index) => (
                                                    <li key={index} className="flex items-start gap-3">
                                                        <span className="text-[#D4AF37] text-xl">✓</span>
                                                        <span className="text-gray-700">{rec}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </ScrollReveal>
                                )}
                            </div>
                        ) : (
                            <ScrollReveal>
                                <div className="luxury-card p-12 text-center">
                                    <div className="text-6xl mb-4">💼</div>
                                    <h3 className="text-2xl font-bold mb-2">No Insights Yet</h3>
                                    <p className="text-gray-600">
                                        Enter your skills and target role to get AI-powered career insights
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

export default CareerInsights;
