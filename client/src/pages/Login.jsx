import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FloatingOrb } from '../components/animations/ScrollEffects';

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
                    <p className="text-white/80 text-lg tracking-wide">Premium Portfolio Builder</p>
                </motion.div>

                {/* Login Card */}
                <motion.div
                    className="luxury-glass p-10 rounded-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <h2 className="text-3xl mb-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
                        Welcome Back
                    </h2>
                    <p className="text-gray-600 text-center mb-8">Sign in to your account</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase"
                                style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
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
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wide uppercase"
                                style={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="luxury-input w-full"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                            />
                        </motion.div>

                        <motion.button
                            type="submit"
                            className="luxury-button luxury-button-gold w-full text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Sign In
                        </motion.button>
                    </form>

                    <motion.div
                        className="mt-8 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-semibold hover:text-[#D4AF37] transition-colors"
                                style={{ color: 'var(--luxury-black)' }}>
                                Create Account
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-3 gap-4 text-white text-center">
                    {[
                        { icon: '🎨', text: '7 Templates' },
                        { icon: '✨', text: 'AI Powered' },
                        { icon: '🎩', text: 'Luxury Design' }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            className="luxury-glass p-4 rounded-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 + i * 0.1 }}
                            whileHover={{ y: -4, scale: 1.05 }}
                        >
                            <motion.div
                                className="text-3xl mb-2"
                                animate={{ rotate: [0, 5, 0, -5, 0] }}
                                transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <div className="text-sm font-medium">{feature.text}</div>
                        </motion.div>
                    ))}
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

export default Login;
