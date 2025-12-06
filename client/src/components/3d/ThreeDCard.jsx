import { motion } from 'framer-motion';
import { useState } from 'react';

const ThreeDCard = ({
    children,
    className = '',
    glassEffect = false,
    flippable = false,
    backContent = null
}) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        if (flippable && isFlipped) return;

        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    const handleClick = () => {
        if (flippable) {
            setIsFlipped(!isFlipped);
        }
    };

    const cardClass = glassEffect
        ? 'bg-white/10 backdrop-blur-lg border border-white/20'
        : 'bg-white border border-gray-200';

    return (
        <motion.div
            className={`relative rounded-xl shadow-xl overflow-hidden cursor-pointer ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000,
            }}
            animate={{
                rotateX: rotate.x,
                rotateY: rotate.y,
                rotateZ: isFlipped ? 180 : 0,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            whileHover={{ scale: 1.02, z: 50 }}
        >
            {/* Front Side */}
            <motion.div
                className={`p-6 ${cardClass}`}
                style={{
                    backfaceVisibility: 'hidden',
                    transform: 'translateZ(0)',
                }}
                animate={{ opacity: isFlipped ? 0 : 1 }}
            >
                {children}

                {/* 3D Depth Shadow */}
                <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 50% 120%, rgba(147, 51, 234, 0.3), transparent)',
                        transform: 'translateZ(-20px)',
                        filter: 'blur(20px)',
                    }}
                />
            </motion.div>

            {/* Back Side (if flippable) */}
            {flippable && backContent && (
                <motion.div
                    className={`absolute inset-0 p-6 ${cardClass}`}
                    style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateZ(180deg) translateZ(0)',
                    }}
                    animate={{ opacity: isFlipped ? 1 : 0 }}
                >
                    {backContent}
                </motion.div>
            )}

            {/* Glass Shimmer Effect */}
            {glassEffect && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none"
                    style={{
                        transform: 'translateZ(10px)',
                    }}
                />
            )}
        </motion.div>
    );
};

export default ThreeDCard;
