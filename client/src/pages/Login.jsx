import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(formData);
        if (success) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-white p-4 rounded-2xl shadow-2xl mb-4">
                        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Portfolink
                        </h1>
                    </div>
                    <p className="text-white text-lg font-medium">
                        Build Your Professional Portfolio with AI
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                    <p className="text-gray-600 mb-6">Sign in to continue building your portfolio</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition outline-none"
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
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition duration-200 shadow-lg"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-purple-600 font-semibold hover:text-purple-700">
                                Create one now
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-3 gap-4 text-white text-center">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl mb-1">🎨</div>
                        <div className="text-sm font-medium">Beautiful Templates</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl mb-1">🤖</div>
                        <div className="text-sm font-medium">AI Powered</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl mb-1">📄</div>
                        <div className="text-sm font-medium">PDF Export</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
