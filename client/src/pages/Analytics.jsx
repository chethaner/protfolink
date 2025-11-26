import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Analytics = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await axios.get('/api/analytics/user/stats');
            setStats(data);
        } catch (error) {
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/dashboard" className="text-green-600 hover:text-green-800 mb-4 inline-block">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard 📊</h1>
                    <p className="text-gray-600">Track your portfolio performance and engagement</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Total Portfolios */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">Total Portfolios</h3>
                            <span className="text-3xl">📁</span>
                        </div>
                        <p className="text-4xl font-bold text-blue-600">{stats.totalPortfolios}</p>
                        <p className="text-sm text-gray-500 mt-2">Active portfolios</p>
                    </div>

                    {/* Total Views */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">Total Views</h3>
                            <span className="text-3xl">👁️</span>
                        </div>
                        <p className="text-4xl font-bold text-green-600">{stats.totalViews}</p>
                        <p className="text-sm text-gray-500 mt-2">Public page visits</p>
                    </div>

                    {/* Total Downloads */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-700">Total Downloads</h3>
                            <span className="text-3xl">📥</span>
                        </div>
                        <p className="text-4xl font-bold text-purple-600">{stats.totalDownloads}</p>
                        <p className="text-sm text-gray-500 mt-2">PDF downloads</p>
                    </div>
                </div>

                {/* Portfolio Breakdown */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold mb-6">Portfolio Performance</h2>

                    {stats.portfolios.length === 0 ? (
                        <div className="text-center py-12 text-gray-500">
                            <p className="text-xl mb-2">No portfolios yet</p>
                            <p>Create your first portfolio to see analytics</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {stats.portfolios.map((portfolio) => (
                                <div key={portfolio.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">{portfolio.title}</h3>
                                        </div>
                                        <Link
                                            to={`/editor/${portfolio.id}`}
                                            className="text-blue-600 hover:text-blue-800 text-sm"
                                        >
                                            Edit →
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Views */}
                                        <div className="bg-green-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xl">👁️</span>
                                                <span className="text-sm text-gray-600">Views</span>
                                            </div>
                                            <p className="text-2xl font-bold text-green-600">{portfolio.views}</p>
                                        </div>

                                        {/* Downloads */}
                                        <div className="bg-purple-50 p-3 rounded-lg">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-xl">📥</span>
                                                <span className="text-sm text-gray-600">Downloads</span>
                                            </div>
                                            <p className="text-2xl font-bold text-purple-600">{portfolio.downloads}</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                                            <span>Engagement</span>
                                            <span>{portfolio.views + portfolio.downloads} total interactions</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-green-500 to-purple-500 h-2 rounded-full"
                                                style={{ width: `${Math.min((portfolio.views + portfolio.downloads) * 10, 100)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-4">💡 Tips to Increase Engagement</h3>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                            <span>✓</span>
                            <span>Share your public portfolio link on LinkedIn and social media</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>✓</span>
                            <span>Keep your portfolio updated with latest projects and skills</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>✓</span>
                            <span>Use the ATS Checker to optimize for job applications</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>✓</span>
                            <span>Include your portfolio link in your email signature</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
