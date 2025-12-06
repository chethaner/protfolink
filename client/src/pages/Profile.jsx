import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { ScrollReveal, MagneticButton, FloatingOrb } from '../components/animations/ScrollEffects';

const Profile = () => {
    const { user, setUser, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        bio: user?.bio || '',
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
    const [activeTab, setActiveTab] = useState('account');

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please login to access your profile');
            navigate('/login');
            return;
        }
        fetchStats();
    }, [navigate]);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const [portfoliosRes, goalsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/portfolios', {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get('http://localhost:5000/api/career/goals', {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);
            setStats({
                portfolios: portfoliosRes.data.length,
                careerGoals: goalsRes.data.length,
                lastLogin: user?.lastLogin
            });
        } catch (error) {
            console.error('Failed to fetch stats:', error);
            if (error.response?.status === 401) {
                toast.error('Session expired. Please login again.');
                localStorage.removeItem('token');
                navigate('/login');
            }
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
                email: formData.email,
                phone: formData.phone,
                bio: formData.bio
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

    const handleDeleteAccount = async () => {
        if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            return;
        }

        try {
            await axios.delete('/api/auth/account');
            await logout();
            toast.success('Account deleted');
            navigate('/login');
        } catch (error) {
            toast.error('Failed to delete account');
        }
    };

    const tabs = [
        { id: 'account', label: 'Account Settings', icon: '👤' },
        { id: 'security', label: 'Security', icon: '🔒' },
        { id: 'preferences', label: 'Preferences', icon: '⚙️' }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 100%)' }}>
            {/* Luxury Floating Orbs Background */}
            <FloatingOrb delay={0} size={600} color="#D4AF37" />
            <FloatingOrb delay={5} size={400} color="#0A0A0A" />

            {/* Header */}
            <motion.div
                className="bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white py-16"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                style={{ borderBottom: '2px solid #D4AF37' }}
            >
                <div className="luxury-container px-6">
                    <ScrollReveal>
                        <div className="flex items-center gap-8">
                            {/* Avatar */}
                            <motion.div
                                className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-5xl border-4"
                                style={{ borderColor: '#D4AF37' }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {user?.name?.charAt(0).toUpperCase() || '👤'}
                            </motion.div>

                            {/* User Info */}
                            <div className="flex-1">
                                <h1 className="text-4xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                                    {user?.name || 'User Profile'}
                                </h1>
                                <p className="text-gray-300 text-lg mb-4">{user?.email}</p>

                                {/* Stats */}
                                <div className="flex gap-6">
                                    <div>
                                        <p className="text-sm text-gray-400">Portfolios</p>
                                        <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{stats.portfolios}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Career Goals</p>
                                        <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>{stats.careerGoals}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Member Since</p>
                                        <p className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                                            {new Date(user?.createdAt).getFullYear() || '2024'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <MagneticButton
                                    onClick={() => navigate('/dashboard')}
                                    className="luxury-button luxury-button-outline"
                                >
                                    ← Dashboard
                                </MagneticButton>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="luxury-container px-6 py-12">
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

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2">
                        {activeTab === 'account' && (
                            <ScrollReveal>
                                <div className="luxury-card p-8">
                                    <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Account Information
                                    </h2>

                                    <form onSubmit={handleUpdateProfile} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+1 (555) 123-4567"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Bio
                                            </label>
                                            <textarea
                                                name="bio"
                                                value={formData.bio}
                                                onChange={handleChange}
                                                rows="4"
                                                placeholder="Tell us about yourself..."
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                            />
                                        </div>

                                        <MagneticButton
                                            type="submit"
                                            disabled={loading}
                                            className="luxury-button luxury-button-gold"
                                        >
                                            {loading ? 'Saving...' : 'Save Changes'}
                                        </MagneticButton>
                                    </form>
                                </div>
                            </ScrollReveal>
                        )}

                        {activeTab === 'security' && (
                            <ScrollReveal>
                                <div className="space-y-6">
                                    {/* Change Password */}
                                    <div className="luxury-card p-8">
                                        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                            Change Password
                                        </h2>

                                        <form onSubmit={handleChangePassword} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Current Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                                                />
                                            </div>

                                            <MagneticButton
                                                type="submit"
                                                disabled={loading}
                                                className="luxury-button luxury-button-gold"
                                            >
                                                {loading ? 'Updating...' : 'Update Password'}
                                            </MagneticButton>
                                        </form>
                                    </div>

                                    {/* Danger Zone */}
                                    <div className="luxury-card p-8 border-2 border-red-200">
                                        <h2 className="text-2xl font-bold mb-4 text-red-600" style={{ fontFamily: 'var(--font-heading)' }}>
                                            Danger Zone
                                        </h2>
                                        <p className="text-gray-600 mb-6">
                                            Once you delete your account, there is no going back. Please be certain.
                                        </p>
                                        <motion.button
                                            onClick={handleDeleteAccount}
                                            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Delete Account
                                        </motion.button>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}

                        {activeTab === 'preferences' && (
                            <ScrollReveal>
                                <div className="luxury-card p-8">
                                    <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                                        Preferences
                                    </h2>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Default Template
                                            </label>
                                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent">
                                                <option>Modern</option>
                                                <option>Creative</option>
                                                <option>Professional</option>
                                                <option>Minimalist</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Language
                                            </label>
                                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent">
                                                <option>English</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                                <option>German</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center justify-between py-4 border-t border-gray-200">
                                            <div>
                                                <p className="font-medium text-gray-900">Auto-save</p>
                                                <p className="text-sm text-gray-500">Automatically save changes while editing</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between py-4 border-t border-gray-200">
                                            <div>
                                                <p className="font-medium text-gray-900">Email Notifications</p>
                                                <p className="text-sm text-gray-500">Receive updates about your account</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#D4AF37]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D4AF37]"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <ScrollReveal delay={0.2}>
                            <div className="luxury-card p-6">
                                <h3 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Quick Links
                                </h3>
                                <div className="space-y-2">
                                    <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                                        📊 Dashboard
                                    </Link>
                                    <Link to="/jobs" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                                        💼 Job Suggestions
                                    </Link>
                                    <Link to="/goals" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                                        🎯 Career Goals
                                    </Link>
                                    <Link to="/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                                        📈 Analytics
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={0.3}>
                            <div className="luxury-card p-6">
                                <h3 className="font-bold text-lg mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                                    Account Status
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                        <span>Account Active</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#D4AF37' }}></span>
                                        <span>Premium Features Available</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                        <span>AI Assistant Enabled</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
