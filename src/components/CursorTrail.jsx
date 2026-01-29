import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorTrail() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });

            // Add new trail particle
            const newTrail = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
                type: Math.random() > 0.5 ? 'sparkle' : 'heart'
            };

            setTrails(prev => [...prev.slice(-15), newTrail]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Clean up old trails
    useEffect(() => {
        const interval = setInterval(() => {
            setTrails(prev => prev.filter(t => Date.now() - t.id < 800));
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            <AnimatePresence>
                {trails.map(trail => (
                    <motion.div
                        key={trail.id}
                        initial={{ opacity: 1, scale: 0.5, x: trail.x, y: trail.y }}
                        animate={{
                            opacity: 0,
                            scale: 0,
                            y: trail.y + 20,
                            x: trail.x + (Math.random() * 20 - 10)
                        }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute w-4 h-4 text-pink-400"
                    >
                        {trail.type === 'heart' ? '❤️' : '✨'}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Custom Cursor Follower */}
            <motion.div
                className="w-8 h-8 rounded-full border-2 border-pink-400/50 absolute pointer-events-none mix-blend-difference"
                animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
                transition={{ type: "spring", damping: 25, stiffness: 250 }}
            />
        </div>
    );
}
