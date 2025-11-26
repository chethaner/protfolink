import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState({
        portfolios: 0,
        careerGoals: 0,
        lastLogin: null
    });
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const [portfoliosRes, goalsRes] = await Promise.all([
                axios.get('/api/portfolios'),
                axios.get('/api/career/goals')
            ]);
            setStats({
                portfolios: portfoliosRes.data.length,
                careerGoals: goalsRes.data.length,
                lastLogin: user?.lastLogin
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.put('/api/auth/profile', {
                name: formData.name,
                email: formData.email
            });
            setUser(data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        setLoading(true);

        try {
            await axios.put('/api/auth/password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            });
            toast.success('Password changed successfully!');
            setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-8">
            <div className="container mx-auto px-4 max-w-5xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/dashboard" className="text-purple-600 hover:text-purple-800 flex items-center gap-2 mb-4 font-medium">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">Profile Settings</h1>
                    <p className="text-gray-600">Manage your account settings and preferences</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sidebar - User Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                            {/* Profile Picture */}
                            <div className="text-center mb-6">
                                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                                <p className="text-gray-500 text-sm">{user?.email}</p>
                            </div>

                            {/* Quick Stats */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">📁</span>
                                        <span className="text-sm font-medium text-gray-700">Portfolios</span>
                                    </div>
                                    <span className="text-xl font-bold text-purple-600">{stats.portfolios}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🎯</span>
                                        <span className="text-sm font-medium text-gray-700">Career Goals</span>
                                    </div>
                                    <span className="text-xl font-bold text-green-600">{stats.careerGoals}</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">📅</span>
                                        <span className="text-sm font-medium text-gray-700">Member Since</span>
                                    </div>
                                    <span className="text-xs font-semibold text-blue-600">
                                        {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-2">
                                <Link
                                    to="/dashboard"
                                    className="w-full flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition text-center justify-center font-semibold"
                                >
                                    <span>📊</span> View Dashboard
                                </Link>
                                <Link
                                    to="/career"
                                    className="w-full flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-center justify-center font-medium"
                                >
                                    <span>🎯</span> Career Goals
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="flex border-b border-gray-200">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`flex-1 px-6 py-4 font-semibold transition ${activeTab === 'profile'
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    👤 Profile Info
                                </button>
                                <button
                                    onClick={() => setActiveTab('security')}
                                    className={`flex-1 px-6 py-4 font-semibold transition ${activeTab === 'security'
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    🔒 Security
                                </button>
                                <button
                                    onClick={() => setActiveTab('preferences')}
                                    className={`flex-1 px-6 py-4 font-semibold transition ${activeTab === 'preferences'
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    ⚙️ Preferences
                                </button>
                            </div>

                            <div className="p-8">
                                {/* Profile Tab */}
                                {activeTab === 'profile' && (
                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
                                            <p className="text-gray-600 text-sm mb-6">Update your personal details here</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                                placeholder="your.email@example.com"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl"
                                        >
                                            {loading ? 'Updating...' : '✓ Save Changes'}
                                        </button>
                                    </form>
                                )}

                                {/* Security Tab */}
                                {activeTab === 'security' && (
                                    <form onSubmit={handleChangePassword} className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
                                            <p className="text-gray-600 text-sm mb-6">Ensure your account is secure with a strong password</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                                placeholder="Enter current password"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                                placeholder="Enter new password (min 6 characters)"
                                                required
                                                minLength={6}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Confirm New Password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                                                placeholder="Confirm new password"
                                                required
                                                minLength={6}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl"
                                        >
                                            {loading ? 'Changing...' : '🔒 Change Password'}
                                        </button>
                                    </form>
                                )}

                                {/* Preferences Tab */}
                                {activeTab === 'preferences' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Account Preferences</h3>
                                            <p className="text-gray-600 text-sm mb-6">Customize your PORTFOLINK experience</p>
                                        </div>

                                        {/* Account Limits */}
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                                            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                                <span className="text-2xl">💎</span>
                                                Account Limits
                                            </h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Portfolios</span>
                                                    <span className="font-bold text-purple-600">{stats.portfolios} / Unlimited</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">Career Goals</span>
                                                    <span className="font-bold text-purple-600">{stats.careerGoals} / Unlimited</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-700">AI Requests</span>
                                                    <span className="font-bold text-purple-600">Unlimited</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Account Info */}
                                        <div className="bg-gray-50 p-6 rounded-xl">
                                            <h4 className="font-bold text-gray-900 mb-4">Account Details</h4>
                                            <div className="space-y-3 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Account ID</span>
                                                    <span className="font-mono text-gray-900">{user?._id?.slice(-8)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Email Verified</span>
                                                    <span className="text-green-600 font-semibold">✓ Verified</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Account Status</span>
                                                    <span className="text-green-600 font-semibold">Active</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Danger Zone */}
                                        <div className="bg-red-50 p-6 rounded-xl border-2 border-red-200">
                                            <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                                                <span>⚠️</span>
                                                Danger Zone
                                            </h4>
                                            <p className="text-red-700 text-sm mb-4">
                                                Deleting your account is permanent and cannot be undone.
                                            </p>
                                            <button
                                                onClick={() => toast.error('Account deletion is currently disabled')}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold text-sm"
                                            >
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
