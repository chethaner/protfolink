import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(formData);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-white p-4 rounded-2xl shadow-2xl mb-4">
                        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
                            Portfolink
                        </h1>
                    </div>
                    <p className="text-white text-lg font-medium">
                        Start Building Your Dream Portfolio Today
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-600 mb-6">Join thousands of professionals</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition outline-none"
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition outline-none"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition outline-none"
                                placeholder="••••••••"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition duration-200 shadow-lg"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                    <h3 className="font-bold text-lg mb-4">Why Portfolink?</h3>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-xl">✨</span>
                            <span className="text-sm">AI-powered content suggestions</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-xl">🎨</span>
                            <span className="text-sm">Professional templates</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-xl">📊</span>
                            <span className="text-sm">ATS optimization & analytics</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-xl">🚀</span>
                            <span className="text-sm">One-click PDF export</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Register;
