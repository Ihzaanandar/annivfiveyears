import { motion } from 'framer-motion';
import { ArrowLeft, Heart } from 'lucide-react';

export default function BackButton({ onClick }) {
    return (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClick}
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-dark-text hover:shadow-xl transition-all duration-300 border border-white/50 group"
        >
            <motion.div
                animate={{ x: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <ArrowLeft size={18} className="text-deep-rose group-hover:text-pink-600 transition-colors" />
            </motion.div>
            <span className="text-sm font-medium">Back</span>
            <Heart size={12} className="text-blush-pink fill-current opacity-60" />
        </motion.button>
    );
}
