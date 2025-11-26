import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        fetchPortfolios();
    }, []);

    const fetchPortfolios = async () => {
        try {
            const { data } = await axios.get('/api/portfolios');
            setPortfolios(data);
        } catch (error) {
            toast.error('Failed to fetch portfolios');
        } finally {
            setLoading(false);
        }
    };

    const createPortfolio = async () => {
        try {
            const { data } = await axios.post('/api/portfolios', {
                title: 'My New Portfolio'
            });
            setPortfolios([data, ...portfolios]);
            toast.success('Portfolio created');
            navigate(`/editor/${data._id}`);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create portfolio');
        }
    };

    const deletePortfolio = async (id) => {
        if (!window.confirm('Are you sure you want to delete this portfolio?')) return;
        try {
            await axios.delete(`/api/portfolios/${id}`);
            setPortfolios(portfolios.filter(p => p._id !== id));
            toast.success('Portfolio deleted');
        } catch (error) {
            toast.error('Failed to delete portfolio');
        }
    };

    const duplicatePortfolio = async (id) => {
        try {
            const { data } = await axios.post(`/api/portfolios/${id}/duplicate`);
            setPortfolios([data, ...portfolios]);
            toast.success('Portfolio duplicated');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to duplicate portfolio');
        }
    };

    const togglePublish = async (id, isPublic) => {
        try {
            const endpoint = isPublic ? 'unpublish' : 'publish';
            const { data } = await axios.post(`/api/public/${id}/${endpoint}`);

            setPortfolios(portfolios.map(p =>
                p._id === id ? { ...p, isPublic: !isPublic, slug: data.slug || p.slug } : p
            ));

            toast.success(isPublic ? 'Portfolio unpublished' : 'Portfolio published!');
            if (!isPublic && data.publicUrl) {
                toast.success(`Public URL: ${window.location.origin}${data.publicUrl}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update publish status');
        }
    };

    const downloadPDF = async (id, title) => {
        try {
            toast.loading('Generating PDF...');
            const response = await axios.get(`/api/pdf/${id}/pdf`, {
                responseType: 'blob'
            });

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${title}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.dismiss();
            toast.success('PDF downloaded!');
        } catch (error) {
            toast.dismiss();
            toast.error('Failed to generate PDF');
            console.error('PDF download error:', error);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 page-transition">
            {/* Enhanced Header with Glassmorphism */}
            <div className="bg-white/80 backdrop-blur-md shadow-lg border-b-4 border-gradient-to-r from-purple-500 to-pink-500 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <h1 className="text-4xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                                Portfolink
                            </h1>
                            <span className="hidden md:block text-gray-600 text-sm font-medium px-3 py-1 bg-purple-100 rounded-full">
                                ✨ Build. Share. Succeed.
                            </span>
                        </div>

                        {/* Navigation with Hover Effects */}
                        <div className="flex items-center gap-3">
                            <Link
                                to="/jobs"
                                className="text-gray-700 hover:text-purple-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-purple-50 transition font-medium"
                            >
                                <span className="text-xl">💼</span>
                                <span className="hidden md:inline">Jobs</span>
                            </Link>
                            <Link
                                to="/analytics"
                                className="text-gray-700 hover:text-blue-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
                            >
                                <span className="text-xl">📊</span>
                                <span className="hidden md:inline">Analytics</span>
                            </Link>
                            <Link
                                to="/career"
                                className="text-gray-700 hover:text-green-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-green-50 transition font-medium"
                            >
                                <span className="text-xl">🎯</span>
                                <span className="hidden md:inline">Goals</span>
                            </Link>
                            <Link
                                to="/profile"
                                className="text-gray-700 hover:text-orange-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-orange-50 transition font-medium"
                            >
                                <span className="text-xl">👤</span>
                                <span className="hidden md:inline">Profile</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="text-gray-700 hover:text-red-600 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-50 transition font-medium"
                            >
                                <span className="text-xl">🚪</span>
                                <span className="hidden md:inline">Logout</span>
                            </button>
                            <button
                                onClick={createPortfolio}
                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl hover:from-purple-700 hover:to-pink-700 transition duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold btn-hover"
                            >
                                <span className="text-xl">+</span>
                                <span>Create New</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content with Animation */}
            <div className="container mx-auto px-4 py-8 animate-fadeIn">
                <div className="mb-8">
                    <h1 className="text-4xl font-black text-gray-900 mb-2 text-shadow">
                        My Portfolios
                    </h1>
                    <p className="text-gray-600 text-lg">Manage and share your professional portfolios</p>
                </div>

                {portfolios.length === 0 ? (
                    <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-dashed border-purple-300 animate-fadeIn">
                        <div className="text-8xl mb-6 animate-float">📁</div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3 text-shadow">No Portfolios Yet</h2>
                        <p className="text-gray-600 mb-8 text-lg">Create your first portfolio to get started on your journey!</p>
                        <button
                            onClick={createPortfolio}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition shadow-2xl font-bold text-lg transform hover:scale-105 btn-hover"
                        >
                            ✨ Create Your First Portfolio
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolios.map((portfolio, index) => (
                            <div
                                key={portfolio._id}
                                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100 animate-fadeIn"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="h-48 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <span className="text-white text-6xl relative z-10 animate-float">📄</span>
                                    <div className="absolute top-4 right-4 z-10">
                                        {portfolio.isPublic ? (
                                            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                🌐 Live
                                            </span>
                                        ) : (
                                            <span className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                                🔒 Private
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2 truncate">{portfolio.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <span>📅</span>
                                        <span>Updated {format(new Date(portfolio.updatedAt), 'MMM d, yyyy')}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <Link
                                                to={`/editor/${portfolio._id}`}
                                                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                                            >
                                                ✏️ Edit
                                            </Link>
                                            <Link
                                                to={`/ats/${portfolio._id}`}
                                                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white text-center py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition duration-200 font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
                                            >
                                                🎯 ATS
                                            </Link>
                                        </div>
                                        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                            <div className="flex gap-4">
                                                <button
                                                    onClick={() => downloadPDF(portfolio._id, portfolio.title)}
                                                    className="text-purple-600 hover:text-purple-800 font-semibold text-sm flex items-center gap-1 transition"
                                                    title="Download PDF"
                                                >
                                                    <span>📄</span> PDF
                                                </button>
                                                <button
                                                    onClick={() => duplicatePortfolio(portfolio._id)}
                                                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-1 transition"
                                                    title="Duplicate"
                                                >
                                                    <span>📋</span> Copy
                                                </button>
                                                <button
                                                    onClick={() => deletePortfolio(portfolio._id)}
                                                    className="text-red-600 hover:text-red-800 font-semibold text-sm flex items-center gap-1 transition"
                                                    title="Delete"
                                                >
                                                    <span>🗑️</span> Delete
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => togglePublish(portfolio._id, portfolio.isPublic)}
                                                className={`px-3 py-1 rounded-lg text-sm font-semibold transition ${portfolio.isPublic
                                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {portfolio.isPublic ? '🌐 Public' : '🔒 Publish'}
                                            </button>
                                        </div>
                                        {portfolio.isPublic && portfolio.slug && (
                                            <div className="text-xs text-gray-500 pt-2 border-t border-gray-100 bg-gray-50 -mx-6 -mb-6 px-6 py-3">
                                                <span className="font-medium">Public URL:</span>{' '}
                                                <a
                                                    href={`/p/${portfolio.slug}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                                                >
                                                    /p/{portfolio.slug}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
