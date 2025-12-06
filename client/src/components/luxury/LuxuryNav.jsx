import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const LuxuryNav = ({ user, onLogout }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/80 backdrop-blur-xl shadow-lg'
                    : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
            <div className="luxury-container">
                <div className="flex items-center justify-between py-6">
                    {/* Logo */}
                    <Link to="/" className="group">
                        <h1 className="text-3xl font-bold tracking-tight"
                            style={{ fontFamily: 'var(--font-heading)' }}>
                            <span className="text-black">PORT</span>
                            <span className="text-[#D4AF37] group-hover:text-[#C19B2A] transition-colors">FOLINK</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <NavLink to="/dashboard">Portfolio</NavLink>
                        <NavLink to="/jobs">Opportunities</NavLink>
                        <NavLink to="/analytics">Insights</NavLink>
                        <NavLink to="/career">Goals</NavLink>
                        <NavLink to="/profile" className="luxury-button luxury-button-gold text-xs px-6 py-3">
                            {user?.name || 'Profile'}
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`w-full h-0.5 bg-black transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-black transition-all ${menuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`w-full h-0.5 bg-black transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="md:hidden bg-white border-t border-gray-200"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="luxury-container py-6 space-y-4">
                            <MobileNavLink to="/dashboard">Portfolio</MobileNavLink>
                            <MobileNavLink to="/jobs">Opportunities</MobileNavLink>
                            <MobileNavLink to="/analytics">Insights</MobileNavLink>
                            <MobileNavLink to="/career">Goals</MobileNavLink>
                            <MobileNavLink to="/profile">Profile</MobileNavLink>
                            <button
                                onClick={onLogout}
                                className="w-full text-left text-gray-600 hover:text-black py-2 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const NavLink = ({ to, children, className = '' }) => (
    <Link
        to={to}
        className={`text-sm font-medium text-gray-600 hover:text-black transition-colors tracking-wide ${className}`}
    >
        {children}
    </Link>
);

const MobileNavLink = ({ to, children }) => (
    <Link
        to={to}
        className="block text-gray-600 hover:text-black py-2 transition-colors"
    >
        {children}
    </Link>
);

export default LuxuryNav;
