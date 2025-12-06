import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const ScrollReveal = ({ children, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.1, 0.25, 1]
            }}
        >
            {children}
        </motion.div>
    );
};

const ParallaxSection = ({ children, speed = 0.5 }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <motion.div ref={ref} style={{ y: smoothY }}>
            {children}
        </motion.div>
    );
};

const ColorShiftBackground = () => {
    const { scrollYProgress } = useScroll();

    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.3, 0.6, 1],
        [
            'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
            'linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)',
            'linear-gradient(135deg, #2D2D2D 0%, #D4AF37 100%)',
            'linear-gradient(135deg, #D4AF37 0%, #0A0A0A 100%)'
        ]
    );

    return (
        <motion.div
            className="fixed inset-0 -z-10"
            style={{ background: backgroundColor }}
        />
    );
};

const FloatingOrb = ({ delay = 0, size = 400, color = '#D4AF37' }) => {
    return (
        <motion.div
            className="absolute rounded-full blur-3xl opacity-20"
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`
            }}
            animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.2, 1]
            }}
            transition={{
                duration: 20,
                delay,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    );
};

const MagneticButton = ({ children, onClick, className = '' }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={buttonRef}
            onClick={onClick}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-[#D4AF37] to-black origin-left z-50"
            style={{ scaleX }}
        />
    );
};

const SmoothScrollContainer = ({ children }) => {
    useEffect(() => {
        const smoothScroll = (e) => {
            e.preventDefault();
            window.scrollBy({
                top: e.deltaY * 0.5,
                behavior: 'auto'
            });
        };

        // Smooth scroll is optional - can be enabled/disabled
        // window.addEventListener('wheel', smoothScroll, { passive: false });
        // return () => window.removeEventListener('wheel', smoothScroll);
    }, []);

    return <div>{children}</div>;
};

export {
    ScrollReveal,
    ParallaxSection,
    ColorShiftBackground,
    FloatingOrb,
    MagneticButton,
    ScrollProgress,
    SmoothScrollContainer
};
