import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ScrollReveal, FloatingOrb, MagneticButton } from '../components/animations/ScrollEffects';
import { toast } from 'react-hot-toast';

const Career = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [goals, setGoals] = useState([
        { id: 1, title: 'Learn React Advanced Patterns', progress: 75, deadline: '2025-01-15', completed: false },
        { id: 2, title: 'Build 3 Full-Stack Projects', progress: 33, deadline: '2025-02-01', completed: false },
        { id: 3, title: 'Get AWS Certification', progress: 50, deadline: '2025-03-01', completed: false }
    ]);
    const [newGoal, setNewGoal] = useState('');
    const [newDeadline, setNewDeadline] = useState('');

    const addGoal = () => {
        if (!newGoal.trim()) {
            toast.error('Please enter a goal');
            return;
        }
        const goal = {
            id: Date.now(),
            title: newGoal,
            progress: 0,
            deadline: newDeadline,
            completed: false
        };
        setGoals([...goals, goal]);
        setNewGoal('');
        setNewDeadline('');
        toast.success('Goal added!');
    };

    const updateProgress = (id, progress) => {
        setGoals(goals.map(g => g.id === id ? { ...g, progress, completed: progress === 100 } : g));
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(g => g.id !== id));
        toast.success('Goal deleted');
    };

    const completedGoals = goals.filter(g => g.completed).length;
    const totalProgress = goals.length > 0 ? Math.round(goals.reduce((sum, g) => sum + g.progress, 0) / goals.length) : 0;

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
                                    🎯 Career Goals
                                </h1>
                                <p className="text-sm md:text-base text-gray-300">Track your professional development journey</p>
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <ScrollReveal>
                        <motion.div
                            className="luxury-card p-6 bg-gradient-to-br from-blue-50 to-blue-100"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-3xl mb-2">🎯</div>
                            <h3 className="text-gray-600 text-sm mb-1">Total Goals</h3>
                            <p className="text-3xl font-bold" style={{ color: '#D4AF37' }}>{goals.length}</p>
                        </motion.div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <motion.div
                            className="luxury-card p-6 bg-gradient-to-br from-green-50 to-green-100"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-3xl mb-2">✅</div>
                            <h3 className="text-gray-600 text-sm mb-1">Completed</h3>
                            <p className="text-3xl font-bold text-green-600">{completedGoals}</p>
                        </motion.div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <motion.div
                            className="luxury-card p-6 bg-gradient-to-br from-purple-50 to-purple-100"
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="text-3xl mb-2">📈</div>
                            <h3 className="text-gray-600 text-sm mb-1">Overall Progress</h3>
                            <p className="text-3xl font-bold text-purple-600">{totalProgress}%</p>
                        </motion.div>
                    </ScrollReveal>
                </div>

                {/* Add New Goal */}
                <ScrollReveal>
                    <div className="luxury-card p-6 mb-8">
                        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                            Add New Goal
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                                type="text"
                                placeholder="Goal title..."
                                value={newGoal}
                                onChange={(e) => setNewGoal(e.target.value)}
                                className="col-span-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                            <input
                                type="date"
                                value={newDeadline}
                                onChange={(e) => setNewDeadline(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                            />
                        </div>
                        <MagneticButton
                            onClick={addGoal}
                            className="luxury-button luxury-button-gold mt-4"
                        >
                            + Add Goal
                        </MagneticButton>
                    </div>
                </ScrollReveal>

                {/* Goals List */}
                <div className="space-y-4">
                    {goals.map((goal, index) => (
                        <ScrollReveal key={goal.id} delay={index * 0.1}>
                            <motion.div
                                className="luxury-card p-6"
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold mb-1" style={{ color: goal.completed ? '#22C55E' : '#D4AF37' }}>
                                            {goal.completed && '✅ '}{goal.title}
                                        </h3>
                                        {goal.deadline && (
                                            <p className="text-sm text-gray-600">
                                                📅 Deadline: {new Date(goal.deadline).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => deleteGoal(goal.id)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        🗑️ Delete
                                    </button>
                                </div>

                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Progress</span>
                                        <span>{goal.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] h-3 rounded-full transition-all"
                                            style={{ width: `${goal.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateProgress(goal.id, Math.max(0, goal.progress - 10))}
                                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
                                    >
                                        -10%
                                    </button>
                                    <button
                                        onClick={() => updateProgress(goal.id, Math.min(100, goal.progress + 10))}
                                        className="px-3 py-1 bg-[#D4AF37] hover:bg-[#B8941F] text-white rounded text-sm"
                                    >
                                        +10%
                                    </button>
                                    <button
                                        onClick={() => updateProgress(goal.id, 100)}
                                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm ml-auto"
                                    >
                                        ✅ Complete
                                    </button>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}

                    {goals.length === 0 && (
                        <ScrollReveal>
                            <div className="luxury-card p-12 text-center">
                                <div className="text-6xl mb-4">🎯</div>
                                <h3 className="text-2xl font-bold mb-2">No Goals Yet</h3>
                                <p className="text-gray-600">
                                    Add your first career goal to start tracking your progress
                                </p>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Career;
