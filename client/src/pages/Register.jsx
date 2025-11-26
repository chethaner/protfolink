import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { register } = useAuth();
    const navigate = useNavigate();

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 6) strength++;
        if (password.length >= 10) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setFormData({ ...formData, password: newPassword });
        setPasswordStrength(checkPasswordStrength(newPassword));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return; // Error will be shown by browser
        }

        const success = await register(formData);
        if (success) {
            navigate('/dashboard');
        }
    };

    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-pink-500 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <div className="inline-block bg-white p-4 rounded-2xl shadow-2xl mb-4 animate-float">
                        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Portfolink
                        </h1>
                    </div>
                    <p className="text-white text-lg font-medium">
                        Join thousands building amazing portfolios
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-600 mb-6">Start building your professional portfolio today</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition outline-none"
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
                                onChange={handlePasswordChange}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition outline-none"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                            {/* Password Strength Indicator */}
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[0, 1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition ${level < passwordStrength ? strengthColors[passwordStrength - 1] : 'bg-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className={`text-xs font-medium ${passwordStrength < 2 ? 'text-red-600' :
                                            passwordStrength < 4 ? 'text-yellow-600' : 'text-green-600'
                                        }`}>
                                        Password strength: {strengthLabels[passwordStrength - 1] || 'Too short'}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition outline-none"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={formData.password !== formData.confirmPassword}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="text-purple-600 font-semibold hover:text-purple-700">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mt-8 space-y-3">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white flex items-center gap-3">
                        <div className="text-3xl">✨</div>
                        <div>
                            <div className="font-semibold">AI-Powered Content</div>
                            <div className="text-sm text-white/80">Generate professional content instantly</div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white flex items-center gap-3">
                        <div className="text-3xl">🎨</div>
                        <div>
                            <div className="font-semibold">5 Beautiful Templates</div>
                            <div className="text-sm text-white/80">Choose from professionally designed layouts</div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white flex items-center gap-3">
                        <div className="text-3xl">📊</div>
                        <div>
                            <div className="font-semibold">Career Goal Tracking</div>
                            <div className="text-sm text-white/80">Plan and achieve your career milestones</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
