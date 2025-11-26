import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CareerGoals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        targetRole: '',
        deadline: ''
    });

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            const { data } = await axios.get('/api/career/goals');
            setGoals(data);
        } catch (error) {
            toast.error('Failed to fetch goals');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting career goal:', formData);

        setCreating(true);
        toast.loading('Creating goal with AI-generated steps...', { id: 'creating-goal' });

        try {
            const { data } = await axios.post('/api/career/goals', formData);
            console.log('Career goal created:', data);
            setGoals([data, ...goals]);
            setShowCreateForm(false);
            setFormData({ title: '', targetRole: '', deadline: '' });
            toast.success('Career goal created!', { id: 'creating-goal' });
        } catch (error) {
            console.error('Failed to create goal:', error);
            console.error('Error response:', error.response?.data);
            const errorMessage = error.response?.data?.message || 'Failed to create goal';
            toast.error(errorMessage, { id: 'creating-goal' });
        } finally {
            setCreating(false);
        }
    };

    const deleteGoal = async (id) => {
        if (!window.confirm('Delete this goal?')) return;
        try {
            await axios.delete(`/api/career/goals/${id}`);
            setGoals(goals.filter(g => g._id !== id));
            toast.success('Goal deleted');
        } catch (error) {
            toast.error('Failed to delete goal');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/dashboard" className="text-purple-600 hover:text-purple-800 mb-4 inline-block">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Career Goals 🎯</h1>
                    <p className="text-gray-600">Plan your career path and track your progress</p>
                </div>

                {/* Create Button */}
                <div className="mb-6">
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        disabled={creating}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span>+</span> Create New Goal
                    </button>
                </div>

                {/* Create Form */}
                {showCreateForm && (
                    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
                        <h2 className="text-2xl font-bold mb-4">New Career Goal</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    placeholder="e.g., Become a Full Stack Developer"
                                    required
                                    disabled={creating}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
                                <select
                                    value={formData.targetRole}
                                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    required
                                    disabled={creating}
                                >
                                    <option value="">Select a role...</option>
                                    <option value="Full Stack Developer">Full Stack Developer</option>
                                    <option value="Frontend Developer">Frontend Developer</option>
                                    <option value="Backend Developer">Backend Developer</option>
                                    <option value="Data Scientist">Data Scientist</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Target Deadline (Optional)</label>
                                <input
                                    type="date"
                                    value={formData.deadline}
                                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                    disabled={creating}
                                />
                            </div>
                            {creating && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                                    <p className="font-semibold mb-1">⏳ Generating AI career steps...</p>
                                    <p className="text-xs">This may take 10-30 seconds. Please wait.</p>
                                </div>
                            )}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={creating}
                                    className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    {creating ? 'Creating...' : 'Create Goal'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    disabled={creating}
                                    className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Goals List */}
                {goals.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-md">
                        <h2 className="text-2xl text-gray-600 mb-4">No career goals yet</h2>
                        <p className="text-gray-500">Create your first goal to start your journey!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {goals.map((goal) => (
                            <div key={goal._id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-gray-900">{goal.title}</h3>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${goal.status === 'active' ? 'bg-green-100 text-green-800' :
                                            goal.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {goal.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4">🎯 {goal.targetRole}</p>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span>{goal.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full transition-all"
                                            style={{ width: `${goal.progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Steps Count */}
                                <p className="text-sm text-gray-600 mb-4">
                                    {goal.steps.filter(s => s.completed).length} / {goal.steps.length} steps completed
                                </p>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Link
                                        to={`/career/${goal._id}`}
                                        className="flex-1 bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => deleteGoal(goal._id)}
                                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CareerGoals;
