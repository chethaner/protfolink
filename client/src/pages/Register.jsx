import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FloatingOrb } from '../components/animations/ScrollEffects';
import { motion } from 'framer-motion';

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
            return;
        }
        const success = await register(formData);
        if (success) {
            navigate('/dashboard');
        }
    };

    const strengthColors = ['#DC2626', '#F97316', '#EAB308', '#84CC16', '#22C55E'];
    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)' }}>

            {/* Elegant Floating Orbs Background */}
            <FloatingOrb delay={0} size={500} color="#D4AF37" />
            <FloatingOrb delay={3} size={400} color="#C19B2A" />
            <FloatingOrb delay={6} size={600} color="#D4AF37" />

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '100px 100px'
                }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    <h1 className="text-6xl font-bold mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                        <span className="text-white">PORT</span>
                        <motion.span
                            style={{ color: '#D4AF37' }}
                            animate={{ opacity: [0.8, 1, 0.8] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            FOLINK
                        </motion.span>
                    </h1>
                    <p className="text-white/80 text-lg tracking-wide">Join Our Premium Platform</p>
                </motion.div>

                {/* Register Card */}
                <motion.div
                    className="luxury-glass p-10 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <h2 className="text-3xl mb-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                        Create Account
                    </h2>
                    <p className="text-gray-600 text-center mb-8">Start your luxury portfolio journey</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="luxury-input w-full"
                                placeholder="John Doe"
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="luxury-input w-full"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={handlePasswordChange}
                                className="luxury-input w-full"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                                minLength={6}
                            />
                            {formData.password && (
                                <div className="mt-2">
                                    <div className="flex gap-1 mb-1">
                                        {[0, 1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className="h-1 flex-1 rounded-full transition-all"
                                                style={{
                                                    backgroundColor: level < passwordStrength
                                                        ? strengthColors[passwordStrength - 1]
                                                        : '#E5E5E5'
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs font-medium" style={{
                                        color: passwordStrength < 2 ? '#DC2626' : passwordStrength < 4 ? '#EAB308' : '#22C55E'
                                    }}>
                                        {strengthLabels[passwordStrength - 1] || 'Too short'}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className="luxury-input w-full"
                                placeholder="••••••••"
                                autoComplete="new-password"
                                required
                                minLength={6}
                            />
                            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                <p className="text-xs mt-1" style={{ color: '#DC2626' }}>Passwords do not match</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={formData.password !== formData.confirmPassword}
                            className="luxury-button luxury-button-gold w-full text-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-semibold hover:text-[#D4AF37] transition-colors" style={{ color: 'var(--luxury-black)' }}>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Benefits */}
                <div className="mt-12 space-y-3">
                    <motion.div
                        className="luxury-glass px-5 py-4 rounded-lg flex items-center gap-3"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="text-3xl">✨</div>
                        <div>
                            <div className="font-semibold text-white/90">AI-Powered Content</div>
                            <div className="text-sm text-white/70">Generate professional content instantly</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="luxury-glass px-5 py-4 rounded-lg flex items-center gap-3"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="text-3xl">🎨</div>
                        <div>
                            <div className="font-semibold text-white/90">7 Premium Templates</div>
                            <div className="text-sm text-white/70">Including luxury & 3D designs</div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="luxury-glass px-5 py-4 rounded-lg flex items-center gap-3"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="text-3xl">🎩</div>
                        <div>
                            <div className="font-semibold text-white/90">Luxury Aesthetic</div>
                            <div className="text-sm text-white/70">Audemars Piguet-inspired design</div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Subtle shine effect */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.1, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{
                    background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)'
                }}
            />
        </div>
    );
};

export default Register;
