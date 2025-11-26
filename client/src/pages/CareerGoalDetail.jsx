import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CareerGoalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [motivation, setMotivation] = useState('');
    const [loadingMotivation, setLoadingMotivation] = useState(false);

    useEffect(() => {
        fetchGoal();
    }, [id]);

    const fetchGoal = async () => {
        try {
            const { data } = await axios.get(`/api/career/goals/${id}`);
            setGoal(data);
        } catch (error) {
            toast.error('Failed to load goal');
            navigate('/career');
        } finally {
            setLoading(false);
        }
    };

    const toggleStep = async (stepIndex) => {
        try {
            const updatedSteps = [...goal.steps];
            updatedSteps[stepIndex].completed = !updatedSteps[stepIndex].completed;

            const { data } = await axios.put(`/api/career/goals/${id}`, {
                steps: updatedSteps
            });

            setGoal(data);
            toast.success('Progress updated!');
        } catch (error) {
            toast.error('Failed to update progress');
        }
    };

    const getMotivation = async () => {
        setLoadingMotivation(true);
        try {
            const { data } = await axios.post(`/api/career/motivation/${id}`);
            setMotivation(data.message);
        } catch (error) {
            toast.error('Failed to get motivation');
        } finally {
            setLoadingMotivation(false);
        }
    };

    const updateStatus = async (newStatus) => {
        try {
            const { data } = await axios.put(`/api/career/goals/${id}`, {
                status: newStatus
            });
            setGoal(data);
            toast.success(`Goal marked as ${newStatus}!`);
        } catch (error) {
            toast.error('Failed to update status');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (!goal) return <div className="p-8 text-center">Goal not found</div>;

    const completedSteps = goal.steps.filter(s => s.completed).length;
    const progress = goal.steps.length > 0 ? Math.round((completedSteps / goal.steps.length) * 100) : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/career" className="text-purple-600 hover:text-purple-800 mb-4 inline-block">
                        ← Back to Career Goals
                    </Link>

                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-2">{goal.title}</h1>
                                <p className="text-xl text-gray-600">🎯 {goal.targetRole}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${goal.status === 'active' ? 'bg-green-100 text-green-800' :
                                    goal.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                }`}>
                                {goal.status}
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-6">
                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                <span>Overall Progress</span>
                                <span className="font-semibold">{progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <p className="text-sm text-gray-600 mt-2">
                                {completedSteps} of {goal.steps.length} steps completed
                            </p>
                        </div>

                        {/* Status Actions */}
                        <div className="flex gap-2 mb-6">
                            {goal.status !== 'completed' && (
                                <button
                                    onClick={() => updateStatus('completed')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                >
                                    ✓ Mark as Completed
                                </button>
                            )}
                            {goal.status !== 'paused' && (
                                <button
                                    onClick={() => updateStatus('paused')}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
                                >
                                    ⏸ Pause Goal
                                </button>
                            )}
                            {goal.status === 'paused' && (
                                <button
                                    onClick={() => updateStatus('active')}
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                >
                                    ▶ Resume Goal
                                </button>
                            )}
                        </div>

                        {/* Motivation Section */}
                        <div className="border-t pt-6">
                            <button
                                onClick={getMotivation}
                                disabled={loadingMotivation}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition disabled:opacity-50"
                            >
                                {loadingMotivation ? '✨ Generating...' : '✨ Get AI Motivation'}
                            </button>
                            {motivation && (
                                <div className="mt-4 p-4 bg-purple-50 border-l-4 border-purple-600 rounded">
                                    <p className="text-gray-800 italic">{motivation}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Steps Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Action Steps</h2>

                    {goal.steps.length === 0 ? (
                        <p className="text-gray-600 text-center py-8">No steps defined yet</p>
                    ) : (
                        <div className="space-y-4">
                            {goal.steps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`p-6 rounded-lg border-2 transition ${step.completed
                                            ? 'bg-green-50 border-green-300'
                                            : 'bg-white border-gray-200 hover:border-purple-300'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <input
                                            type="checkbox"
                                            checked={step.completed}
                                            onChange={() => toggleStep(index)}
                                            className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500 cursor-pointer"
                                        />
                                        <div className="flex-1">
                                            <h3 className={`text-lg font-semibold mb-2 ${step.completed ? 'text-green-800 line-through' : 'text-gray-900'
                                                }`}>
                                                {step.title}
                                            </h3>
                                            <p className="text-gray-700 mb-3">{step.description}</p>

                                            <div className="flex flex-wrap gap-4 text-sm">
                                                <span className="text-purple-600 font-medium">
                                                    ⏱ {step.timeframe}
                                                </span>
                                                {step.resources && step.resources.length > 0 && (
                                                    <div className="flex gap-2">
                                                        <span className="text-gray-600">📚 Resources:</span>
                                                        <div className="flex flex-wrap gap-2">
                                                            {step.resources.map((resource, i) => (
                                                                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                                                    {resource}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CareerGoalDetail;
