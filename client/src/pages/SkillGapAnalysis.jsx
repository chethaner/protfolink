import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ScrollReveal, FloatingOrb, MagneticButton } from '../components/animations/ScrollEffects';

const SkillGapAnalysis = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userSkills, setUserSkills] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeGaps = async () => {
        if (!userSkills.trim() || !jobDescription.trim()) {
            toast.error('Please enter both your skills and job description');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const skillsArray = userSkills.split(',').map(s => s.trim()).filter(s => s);

            const { data } = await axios.post(
                'http://localhost:5000/api/ml/skill-gaps',
                {
                    userSkills: skillsArray,
                    jobDescription: jobDescription
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setAnalysis(data);
            toast.success('Gap analysis complete!');
        } catch (error) {
            console.error('Gap analysis error:', error);
            toast.error('Failed to analyze skill gaps');
        } finally {
            setLoading(false);
        }
    };

    const getMatchPercentage = () => {
        if (!analysis || !analysis.overallMatch) return 0;
        return analysis.overallMatch;
    };

    const getMatchColor = (percentage) => {
        if (percentage >= 80) return '#22C55E';
        if (percentage >= 60) return '#EAB308';
        return '#EF4444';
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
                                    📊 Skill Gap Analysis
                                </h1>
                                <p className="text-sm md:text-base text-gray-300">Compare your skills against job requirements</p>
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
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div>
                        <ScrollReveal>
                            <div className="luxury-card p-6 mb-6">
                                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Your Skills
                                </h2>
                                <textarea
                                    value={userSkills}
                                    onChange={(e) => setUserSkills(e.target.value)}
                                    placeholder="Enter your skills separated by commas (e.g., React, Node.js, Python, AWS)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
                                    rows="5"
                                />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.1}>
                            <div className="luxury-card p-6">
                                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Job Description
                                </h2>
                                <textarea
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    placeholder="Paste the job description here..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
                                    rows="10"
                                />
                                <MagneticButton
                                    onClick={analyzeGaps}
                                    disabled={loading}
                                    className="luxury-button luxury-button-gold w-full mt-4"
                                >
                                    {loading ? 'Analyzing...' : '🔍 Analyze Gaps'}
                                </MagneticButton>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Results Section */}
                    <div>
                        {analysis ? (
                            <div className="space-y-6">
                                {/* Match Percentage */}
                                <ScrollReveal>
                                    <div className="luxury-card p-6 text-center">
                                        <h3 className="text-lg font-semibold mb-4">Overall Match</h3>
                                        <div className="relative w-32 h-32 mx-auto">
                                            <svg className="transform -rotate-90 w-32 h-32">
                                                <circle
                                                    cx="64"
                                                    cy="64"
                                                    r="56"
                                                    stroke="#E5E7EB"
                                                    strokeWidth="8"
                                                    fill="none"
                                                />
                                                <circle
                                                    cx="64"
                                                    cy="64"
                                                    r="56"
                                                    stroke={getMatchColor(getMatchPercentage())}
                                                    strokeWidth="8"
                                                    fill="none"
                                                    strokeDasharray={`${2 * Math.PI * 56}`}
                                                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - getMatchPercentage() / 100)}`}
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-3xl font-bold" style={{ color: getMatchColor(getMatchPercentage()) }}>
                                                    {getMatchPercentage()}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Matching Skills */}
                                {analysis.matchingSkills && analysis.matchingSkills.length > 0 && (
                                    <ScrollReveal delay={0.1}>
                                        <div className="luxury-card p-6">
                                            <h3 className="text-xl font-bold mb-4" style={{ color: '#22C55E' }}>
                                                ✅ Matching Skills ({analysis.matchingSkills.length})
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.matchingSkills.map((skill, index) => (
                                                    <motion.span
                                                        key={index}
                                                        className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )}

                                {/* Missing Skills */}
                                {analysis.missingSkills && analysis.missingSkills.length > 0 && (
                                    <ScrollReveal delay={0.2}>
                                        <div className="luxury-card p-6">
                                            <h3 className="text-xl font-bold mb-4" style={{ color: '#EF4444' }}>
                                                ❌ Missing Skills ({analysis.missingSkills.length})
                                            </h3>
                                            <div className="space-y-3">
                                                {analysis.missingSkills.map((item, index) => (
                                                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-semibold text-red-800">
                                                                {item.skill}
                                                            </span>
                                                            <span className="text-sm px-2 py-1 bg-red-200 text-red-800 rounded">
                                                                Priority: {item.importance}/10
                                                            </span>
                                                        </div>
                                                        {item.reason && (
                                                            <p className="text-sm text-gray-600">{item.reason}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )}

                                {/* Required Skills */}
                                {analysis.requiredSkills && analysis.requiredSkills.length > 0 && (
                                    <ScrollReveal delay={0.3}>
                                        <div className="luxury-card p-6">
                                            <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                                                📋 All Required Skills
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.requiredSkills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                )}
                            </div>
                        ) : (
                            <ScrollReveal>
                                <div className="luxury-card p-12 text-center">
                                    <div className="text-6xl mb-4">📊</div>
                                    <h3 className="text-2xl font-bold mb-2">No Analysis Yet</h3>
                                    <p className="text-gray-600">
                                        Enter your skills and a job description to get started
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

export default SkillGapAnalysis;
