import { motion } from 'framer-motion';

const LuxuryButton = ({
    children,
    onClick,
    variant = 'primary',
    className = '',
    type = 'button',
    disabled = false
}) => {
    const variants = {
        primary: 'luxury-button luxury-button-primary',
        gold: 'luxury-button luxury-button-gold',
        outline: 'luxury-button luxury-button-outline'
    };

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${variants[variant]} ${className}`}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.button>
    );
};

export default LuxuryButton;
