import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ScrollReveal, FloatingOrb, MagneticButton } from '../components/animations/ScrollEffects';
import { format } from 'date-fns';

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [portfolios, setPortfolios] = useState([]);
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is admin
        if (!user?.isAdmin && user?.role !== 'admin') {
            toast.error('Admin access required');
            navigate('/dashboard');
            return;
        }
        fetchData();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const [statsRes, usersRes, portfoliosRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:5000/api/admin/users?limit=10', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:5000/api/admin/portfolios?limit=10', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setStats(statsRes.data);
            setUsers(usersRes.data.users);
            setPortfolios(portfoliosRes.data.portfolios);
        } catch (error) {
            console.error('Admin data fetch error:', error);
            if (error.response?.status === 403) {
                toast.error('Access denied');
                navigate('/dashboard');
            } else {
                toast.error('Failed to load admin data');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure? This will delete the user and all their portfolios.')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('User deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const handleDeletePortfolio = async (portfolioId) => {
        if (!window.confirm('Are you sure you want to delete this portfolio?')) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/admin/portfolios/${portfolioId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success('Portfolio deleted');
            fetchData();
        } catch (error) {
            toast.error('Failed to delete portfolio');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#D4AF37' }}></div>
                    <p className="text-gray-600">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'users', label: 'Users', icon: '👥' },
        { id: 'portfolios', label: 'Portfolios', icon: '📁' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)' }}>
            {/* Floating Orbs */}
            <FloatingOrb delay={0} size={600} color="#D4AF37" />
            <FloatingOrb delay={5} size={400} color="#0A0A0A" />

            {/* Header */}
            <motion.div
                className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-12"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                style={{ borderBottom: '2px solid #D4AF37' }}
            >
                <div className="luxury-container px-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                Admin Dashboard
                            </h1>
                            <p className="text-gray-300">Platform Management & Analytics</p>
                        </div>
                        <MagneticButton
                            onClick={() => navigate('/dashboard')}
                            className="luxury-button luxury-button-outline"
                        >
                            ← Back to Dashboard
                        </MagneticButton>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="luxury-container px-6 py-8">
                {/* Tabs */}
                <ScrollReveal>
                    <div className="flex gap-4 mb-8 border-b border-gray-200 relative z-10">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 font-medium transition flex items-center gap-2 relative z-10 cursor-pointer ${activeTab === tab.id
                                    ? 'border-b-2 text-black'
                                    : 'text-gray-500 hover:text-black'
                                    }`}
                                style={activeTab === tab.id ? { borderColor: '#D4AF37' } : {}}
                                whileHover={{ y: -2 }}
                            >
                                <span className="text-xl">{tab.icon}</span>
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>
                </ScrollReveal>

                {/* Overview Tab */}
                {activeTab === 'overview' && stats && (
                    <div>
                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <ScrollReveal delay={0.1}>
                                <motion.div
                                    className="luxury-card p-6"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Total Users</p>
                                            <p className="text-3xl font-bold mt-2" style={{ color: '#D4AF37' }}>
                                                {stats.totalUsers}
                                            </p>
                                        </div>
                                        <div className="text-4xl">👥</div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">
                                        +{stats.newUsers} this week
                                    </p>
                                </motion.div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <motion.div
                                    className="luxury-card p-6"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Total Portfolios</p>
                                            <p className="text-3xl font-bold mt-2" style={{ color: '#D4AF37' }}>
                                                {stats.totalPortfolios}
                                            </p>
                                        </div>
                                        <div className="text-4xl">📁</div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">
                                        {stats.publicPortfolios} public
                                    </p>
                                </motion.div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.3}>
                                <motion.div
                                    className="luxury-card p-6"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Active Users</p>
                                            <p className="text-3xl font-bold mt-2" style={{ color: '#D4AF37' }}>
                                                {stats.activeUsers}
                                            </p>
                                        </div>
                                        <div className="text-4xl">✅</div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">
                                        Last 30 days
                                    </p>
                                </motion.div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.4}>
                                <motion.div
                                    className="luxury-card p-6"
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-500 text-sm">Private Portfolios</p>
                                            <p className="text-3xl font-bold mt-2" style={{ color: '#D4AF37' }}>
                                                {stats.privatePortfolios}
                                            </p>
                                        </div>
                                        <div className="text-4xl">🔒</div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-4">
                                        Not published
                                    </p>
                                </motion.div>
                            </ScrollReveal>
                        </div>

                        {/* Quick Overview */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <ScrollReveal>
                                <div className="luxury-card p-6">
                                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Recent Users
                                    </h3>
                                    <div className="space-y-3">
                                        {users.slice(0, 5).map((u) => (
                                            <div key={u._id} className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <div>
                                                    <p className="font-medium">{u.name}</p>
                                                    <p className="text-sm text-gray-500">{u.email}</p>
                                                </div>
                                                <span className="text-xs text-gray-400">
                                                    {format(new Date(u.createdAt), 'MMM d')}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={0.2}>
                                <div className="luxury-card p-6">
                                    <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Recent Portfolios
                                    </h3>
                                    <div className="space-y-3">
                                        {portfolios.slice(0, 5).map((p) => (
                                            <div key={p._id} className="flex items-center justify-between py-2 border-b border-gray-100">
                                                <div>
                                                    <p className="font-medium">{p.title || 'Untitled'}</p>
                                                    <p className="text-sm text-gray-500">{p.user?.name}</p>
                                                </div>
                                                <span className={`text-xs px-2 py-1 rounded ${p.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                    {p.isPublic ? 'Public' : 'Private'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <ScrollReveal>
                        <div className="luxury-card p-6">
                            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                User Management
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2" style={{ borderColor: '#D4AF37' }}>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Name</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Email</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Portfolios</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Joined</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {users.map((u) => (
                                            <tr key={u._id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900">{u.name}</td>
                                                <td className="px-4 py-4 text-sm text-gray-600">{u.email}</td>
                                                <td className="px-4 py-4 text-sm text-gray-600">{u.portfolioCount}</td>
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {format(new Date(u.createdAt), 'MMM d, yyyy')}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <motion.button
                                                        onClick={() => handleDeleteUser(u._id)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Delete
                                                    </motion.button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ScrollReveal>
                )}

                {/* Portfolios Tab */}
                {activeTab === 'portfolios' && (
                    <ScrollReveal>
                        <div className="luxury-card p-6">
                            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                Portfolio Management
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b-2" style={{ borderColor: '#D4AF37' }}>
                                        <tr>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Title</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Owner</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Template</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Created</th>
                                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {portfolios.map((p) => (
                                            <tr key={p._id} className="hover:bg-gray-50 transition">
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900">{p.title || 'Untitled'}</td>
                                                <td className="px-4 py-4 text-sm text-gray-600">{p.user?.name}</td>
                                                <td className="px-4 py-4 text-sm text-gray-600 capitalize">{p.template}</td>
                                                <td className="px-4 py-4">
                                                    <span className={`text-xs px-2 py-1 rounded ${p.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                                        {p.isPublic ? 'Public' : 'Private'}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-600">
                                                    {format(new Date(p.createdAt), 'MMM d, yyyy')}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <motion.button
                                                        onClick={() => handleDeletePortfolio(p._id)}
                                                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Delete
                                                    </motion.button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </ScrollReveal>
                )}
            </div>
        </div>
    );
};

export default Admin;
