import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ScrollReveal, FloatingOrb, MagneticButton } from '../components/animations/ScrollEffects';

const LearningPath = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [currentSkills, setCurrentSkills] = useState('');
    const [targetRole, setTargetRole] = useState('');
    const [missingSkills, setMissingSkills] = useState('');
    const [learningPath, setLearningPath] = useState(null);
    const [savedPaths, setSavedPaths] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            fetchSavedPaths();
        }
    }, [user]);

    const fetchSavedPaths = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get('http://localhost:5000/api/ml/my-learning-paths', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSavedPaths(data);
        } catch (error) {
            console.error('Failed to fetch learning paths:', error);
        }
    };

    const generatePath = async () => {
        if (!currentSkills.trim() || !targetRole.trim()) {
            toast.error('Please enter your current skills and target role');
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const skillsArray = currentSkills.split(',').map(s => s.trim()).filter(s => s);
            const missingArray = missingSkills.split(',').map(s => s.trim()).filter(s => s);

            const { data } = await axios.post(
                'http://localhost:5000/api/ml/learning-path',
                {
                    currentSkills: skillsArray,
                    targetRole: targetRole,
                    missingSkills: missingArray
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setLearningPath(data);
            toast.success('Learning path generated!');
            fetchSavedPaths();
        } catch (error) {
            console.error('Learning path generation error:', error);
            toast.error('Failed to generate learning path');
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
                                    📚 Learning Path Generator
                                </h1>
                                <p className="text-sm md:text-base text-gray-300">Get personalized roadmaps to reach your career goals</p>
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
                                    Generate Path
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Current Skills
                                        </label>
                                        <textarea
                                            value={currentSkills}
                                            onChange={(e) => setCurrentSkills(e.target.value)}
                                            placeholder="React, Node.js, MongoDB..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
                                            rows="3"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Target Role
                                        </label>
                                        <input
                                            type="text"
                                            value={targetRole}
                                            onChange={(e) => setTargetRole(e.target.value)}
                                            placeholder="e.g., Senior Full Stack Developer"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Skills to Learn (Optional)
                                        </label>
                                        <textarea
                                            value={missingSkills}
                                            onChange={(e) => setMissingSkills(e.target.value)}
                                            placeholder="Docker, Kubernetes, AWS..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent resize-none"
                                            rows="3"
                                        />
                                    </div>

                                    <MagneticButton
                                        onClick={generatePath}
                                        disabled={loading}
                                        className="luxury-button luxury-button-gold w-full"
                                    >
                                        {loading ? 'Generating...' : '🚀 Generate Path'}
                                    </MagneticButton>
                                </div>

                                {/* Saved Paths */}
                                {savedPaths.length > 0 && (
                                    <div className="mt-8">
                                        <h3 className="text-lg font-semibold mb-3">Saved Paths</h3>
                                        <div className="space-y-2">
                                            {savedPaths.slice(0, 5).map((path) => (
                                                <div
                                                    key={path._id}
                                                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                                                    onClick={() => setLearningPath(path)}
                                                >
                                                    <p className="font-medium text-sm">{path.targetRole}</p>
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(path.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-2">
                        {learningPath ? (
                            <div className="space-y-6">
                                {/* Summary */}
                                <ScrollReveal>
                                    <div className="luxury-card p-6">
                                        <h3 className="text-2xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                                            🎯 Your Learning Roadmap
                                        </h3>
                                        {learningPath.totalEstimatedTime && (
                                            <p className="text-lg mb-2">
                                                <strong>Estimated Time:</strong> {learningPath.totalEstimatedTime}
                                            </p>
                                        )}
                                        {learningPath.keyMilestones && learningPath.keyMilestones.length > 0 && (
                                            <div className="mt-4">
                                                <h4 className="font-semibold mb-2">Key Milestones:</h4>
                                                <ul className="list-disc list-inside space-y-1">
                                                    {learningPath.keyMilestones.map((milestone, index) => (
                                                        <li key={index} className="text-gray-700">{milestone}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </ScrollReveal>

                                {/* Learning Path Phases */}
                                {learningPath.learningPath && Array.isArray(learningPath.learningPath) && (
                                    learningPath.learningPath.map((phase, phaseIndex) => (
                                        <ScrollReveal key={phaseIndex} delay={0.1 * (phaseIndex + 1)}>
                                            <div className="luxury-card p-6">
                                                <h3 className="text-xl font-bold mb-4" style={{ color: '#D4AF37' }}>
                                                    📖 {phase.phase || `Phase ${phaseIndex + 1}`}
                                                </h3>

                                                {phase.skills && phase.skills.map((skillItem, skillIndex) => (
                                                    <div key={skillIndex} className="mb-6 p-4 bg-gray-50 rounded-lg">
                                                        <div className="flex justify-between items-start mb-3">
                                                            <h4 className="text-lg font-semibold">
                                                                {skillItem.skill}
                                                            </h4>
                                                            {skillItem.priority && (
                                                                <span className="px-3 py-1 bg-[#D4AF37] text-white rounded-full text-sm">
                                                                    Priority: {skillItem.priority}/5
                                                                </span>
                                                            )}
                                                        </div>

                                                        {skillItem.estimatedTime && (
                                                            <p className="text-sm text-gray-600 mb-2">
                                                                ⏱️ <strong>Time:</strong> {skillItem.estimatedTime}
                                                            </p>
                                                        )}

                                                        {skillItem.resources && skillItem.resources.length > 0 && (
                                                            <div className="mb-3">
                                                                <p className="text-sm font-semibold mb-2">📚 Resources:</p>
                                                                <ul className="space-y-1">
                                                                    {skillItem.resources.map((resource, resIndex) => (
                                                                        <li key={resIndex} className="text-sm">
                                                                            <a
                                                                                href={resource.url || '#'}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                                className="text-blue-600 hover:underline"
                                                                            >
                                                                                {resource.name} ({resource.type})
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}

                                                        {skillItem.projects && skillItem.projects.length > 0 && (
                                                            <div>
                                                                <p className="text-sm font-semibold mb-2">💡 Practice Projects:</p>
                                                                <ul className="list-disc list-inside space-y-1">
                                                                    {skillItem.projects.map((project, projIndex) => (
                                                                        <li key={projIndex} className="text-sm text-gray-700">
                                                                            {project}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollReveal>
                                    ))
                                )}
                            </div>
                        ) : (
                            <ScrollReveal>
                                <div className="luxury-card p-12 text-center">
                                    <div className="text-6xl mb-4">📚</div>
                                    <h3 className="text-2xl font-bold mb-2">No Learning Path Yet</h3>
                                    <p className="text-gray-600">
                                        Enter your skills and target role to generate a personalized roadmap
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

export default LearningPath;
