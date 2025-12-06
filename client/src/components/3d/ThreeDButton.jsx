import { motion } from 'framer-motion';
import { useState } from 'react';

const 3DButton = ({
    children,
    onClick,
    variant = 'primary',
    className = ''
}) => {
    const [isHovered, setIsHovered] = useState(false);

    const variants = {
        primary: 'bg-gradient-to-r from-purple-600 to-blue-600 text-white',
        secondary: 'bg-gray-200 text-gray-800',
        outline: 'border-2 border-purple-600 text-purple-600 bg-transparent',
    };

    return (
        <motion.button
            className={`relative px-6 py-3 rounded-lg font-semibold overflow-hidden transition-all duration-300 ${variants[variant]} ${className}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                z: 50,
            }}
            whileTap={{ scale: 0.95 }}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
        >
            {/* 3D Depth Layer */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-700 to-blue-700 rounded-lg"
                style={{
                    transform: 'translateZ(-10px)',
                    transformStyle: 'preserve-3d',
                }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
            />

            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 rounded-lg blur-xl"
                style={{
                    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6), transparent)',
                }}
                animate={{
                    opacity: isHovered ? 0.8 : 0,
                    scale: isHovered ? 1.2 : 1,
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Content */}
            <span className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
                {children}
            </span>

            {/* Shine Effect */}
            {isHovered && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                    initial={{ x: '-100%' }}
                    animate={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
            )}
        </motion.button>
    );
};

export default 3DButton;
