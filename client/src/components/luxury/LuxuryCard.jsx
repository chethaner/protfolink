import { motion } from 'framer-motion';

const LuxuryCard = ({
    children,
    className = '',
    hover = true,
    delay = 0
}) => {
    return (
        <motion.div
            className={`luxury-card ${className}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={hover ? { y: -4 } : {}}
        >
            {children}
        </motion.div>
    );
};

export default LuxuryCard;
