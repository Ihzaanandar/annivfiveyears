import { motion } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
    },
    enter: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1], // Spring-like juicy ease
        },
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 1.02,
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};

export default function PageTransition({ children, className = '' }) {
    return (
        <motion.div
            initial="initial"
            animate="enter"
            exit="exit"
            variants={pageVariants}
            className={`w-full h-full ${className}`}
        >
            {children}
        </motion.div>
    );
}
