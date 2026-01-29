import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, RotateCcw, Stars } from 'lucide-react';
import BackButton from './BackButton';

// Typewriter Effect Component
const TypewriterText = ({ text, delay = 0 }) => {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let i = 0;
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i === text.length) clearInterval(interval);
            }, 50);
            return () => clearInterval(interval);
        }, delay * 1000); // convert seconds to ms

        return () => clearTimeout(timer);
    }, [text, delay]);

    return <span>{displayedText}</span>;
};

// Physics-based confetti
function FlowerConfetti({ count = 80 }) {
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: -10 - Math.random() * 20,
            scale: 0.5 + Math.random() * 1,
            rotate: Math.random() * 360,
            speed: 15 + Math.random() * 25,
            delay: Math.random() * 2,
            color: ['#E91E63', '#F48FB1', '#FF4081', '#FF80AB', '#FCE4EC'][Math.floor(Math.random() * 5)],
            type: Math.random() > 0.4 ? 'petal' : 'heart'
        }));
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ y: `${p.y}vh`, x: `${p.x}vw`, rotate: p.rotate, opacity: 0 }}
                    animate={{
                        y: '120vh',
                        rotate: p.rotate + 360,
                        opacity: [0, 1, 1, 0],
                        x: [`${p.x}vw`, `${p.x + (Math.random() * 10 - 5)}vw`, `${p.x}vw`] // Swaying
                    }}
                    transition={{
                        y: { duration: p.speed / 5, delay: p.delay, ease: "linear", repeat: Infinity, repeatDelay: Math.random() * 2 },
                        rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                        x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: p.speed / 5, times: [0, 0.1, 0.9, 1], repeat: Infinity, delay: p.delay }
                    }}
                    className="absolute"
                    style={{ width: 16 * p.scale, height: 16 * p.scale, color: p.color }}
                >
                    {p.type === 'heart' ? (
                        <Heart className="w-full h-full fill-current" />
                    ) : (
                        <div className="w-full h-full rounded-full rounded-tl-none bg-current opacity-80" />
                    )}
                </motion.div>
            ))}
        </div>
    );
}

// Lush SVG Flower Component
// ... (Keeping the SVG flower logic as it's good)
// Realistic Flower Component with advanced SVG gradients and construction
// Realistic Flower Component (Head Only)
// Butterfly Component
function Butterfly({ delay = 0, style }) {
    return (
        <motion.div
            className="absolute z-40 pointer-events-none"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0, 1, 1, 0],
                scale: [0, 0.8, 0.8, 0],
                x: [0, 100, -50, 200],
                y: [0, -50, -100, -20],
                rotate: [0, 10, -10, 0]
            }}
            transition={{
                duration: 15,
                delay: delay,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
                ease: "linear",
                times: [0, 0.1, 0.9, 1]
            }}
            style={style}
        >
            <motion.div
                animate={{ rotateY: [0, 60, 0, 60, 0] }} // Flapping wing effect
                transition={{ duration: 0.4, repeat: Infinity, ease: "linear" }}
            >
                <svg width="30" height="30" viewBox="0 0 30 30" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>
                    <path d="M15,15 Q25,5 30,10 Q28,20 15,18 Q25,25 28,28 Q18,30 15,20 Q12,30 2,28 Q5,25 15,18 Q2,20 0,10 Q5,5 15,15"
                        fill="url(#butterfly-grad)" opacity="0.9" />
                    <defs>
                        <linearGradient id="butterfly-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#F8BBD0" />
                            <stop offset="50%" stopColor="#E91E63" />
                            <stop offset="100%" stopColor="#AD1457" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>
        </motion.div>
    );
}

// Hanging Vine Component
function HangingVine({ delay = 0, x, length = 'md', mirror = false }) {
    const height = length === 'lg' ? 400 : length === 'md' ? 300 : 200;

    return (
        <motion.div
            className="absolute top-0 origin-top z-30 pointer-events-none"
            style={{ left: x, transform: mirror ? 'scaleX(-1)' : 'none' }}
            initial={{ rotate: -5 }}
            animate={{ rotate: 5 }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay }}
        >
            <svg width="100" height={height} viewBox={`0 0 100 ${height}`} className="overflow-visible">
                {/* Main Stem */}
                <path d={`M50,0 Q60,${height / 3} 40,${height / 2} T50,${height}`}
                    fill="none" stroke="#7CB342" strokeWidth="2" />

                {/* Leaves */}
                {[...Array(Math.floor(height / 40))].map((_, i) => (
                    <g key={i} transform={`translate(${50 + Math.sin(i) * 10}, ${i * 40 + 20})`}>
                        <circle r="3" fill="#8BC34A" />
                        <motion.path
                            d="M0,0 Q10,-10 20,0 Q10,10 0,0"
                            fill="#AED581"
                            transform={`rotate(${Math.sin(i) * 30}) scale(${0.5 + Math.random() * 0.5})`}
                        />
                        {/* Occasional Flower */}
                        {i % 3 === 0 && (
                            <circle cx="5" cy="5" r="4" fill="#F48FB1" />
                        )}
                    </g>
                ))}
            </svg>
        </motion.div>
    );
}

// Realistic Flower Component (Head Only)
// Realistic Flower Component (Head Only) - OPTIMIZED
function RealisticFlower({ size = 'md', delay = 0, style, type = 1, color = 'pink' }) {
    const scale = size === 'lg' ? 1.2 : size === 'sm' ? 0.7 : 0.9;
    const uniqueId = `flower-${Math.random().toString(36).substr(2, 9)}`;

    // Color Palettes for Realism
    const colors = {
        pink: {
            petalMain: '#FFB7C5', // Sakura pink
            petalDark: '#FF8FAB',
            petalLight: '#FFF0F5',
            center: '#FFD700',
            centerDark: '#FFA500'
        },
        purple: {
            petalMain: '#D8BFD8', // Thistle
            petalDark: '#BA55D3',
            petalLight: '#F8F8FF',
            center: '#FFD700',
            centerDark: '#DAA520'
        },
        hotpink: {
            petalMain: '#FF69B4', // Hot pink
            petalDark: '#C71585',
            petalLight: '#FFB6C1',
            center: '#FFFFE0',
            centerDark: '#FFD700'
        }
    };

    const c = colors[color] || colors.pink;

    // Random duration for CSS animation to avoid mechanical feel
    const swayDuration = 5 + Math.random() * 4 + 's';
    const swayDelay = -Math.random() * 5 + 's';

    return (
        <motion.div
            className="absolute bottom-0 origin-bottom"
            style={{
                ...style,
                width: 140 * scale,
                height: 140 * scale,
                filter: 'drop-shadow(0px 10px 10px rgba(0,0,0,0.15))',
                willChange: 'transform, opacity' // Hint specifically for this container
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            transition={{
                scale: { duration: 1.5, delay: delay, ease: "spring" },
                opacity: { duration: 1, delay: delay }
            }}
        >
            {/* Inner container for continuous CSS swaying */}
            <div
                className="w-full h-full animate-petal-sway origin-bottom"
                style={{
                    animationDuration: swayDuration,
                    animationDelay: swayDelay
                }}
            >
                <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                    <defs>
                        {/* Petal Gradient - Main */}
                        <linearGradient id={`${uniqueId}-petal-grad`} x1="50%" y1="100%" x2="50%" y2="0%">
                            <stop offset="0%" stopColor={c.petalDark} />
                            <stop offset="40%" stopColor={c.petalMain} />
                            <stop offset="90%" stopColor={c.petalLight} />
                        </linearGradient>
                    </defs>

                    {/* Flower Head Group */}
                    <g transform="translate(100, 100)">
                        {/* Layer 1: Back Petals (Darker/Larger) */}
                        {[0, 72, 144, 216, 288].map((rot, i) => (
                            <path
                                key={`l1-${i}`}
                                d="M0,0 C-15,-20 -25,-50 0,-70 C25,-50 15,-20 0,0"
                                fill={c.petalDark}
                                opacity="0.9"
                                transform={`rotate(${rot}) scale(1.1)`}
                            />
                        ))}

                        {/* Layer 2: Main Petals (Gradient) */}
                        {[36, 108, 180, 252, 324].map((rot, i) => (
                            <motion.path
                                key={`l2-${i}`}
                                d="M0,0 C-15,-20 -20,-50 0,-65 C20,-50 15,-20 0,0"
                                fill={`url(#${uniqueId}-petal-grad)`}
                                transform={`rotate(${rot})`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: delay + 0.5 + (i * 0.1) }}
                            />
                        ))}

                        {/* Layer 3: Inner Detail Petals (Lighter) */}
                        {[0, 72, 144, 216, 288].map((rot, i) => (
                            <path
                                key={`l3-${i}`}
                                d="M0,0 C-5,-10 -10,-30 0,-40 C10,-30 5,-10 0,0"
                                fill={c.petalLight}
                                opacity="0.6"
                                transform={`rotate(${rot}) scale(0.8)`}
                            />
                        ))}

                        {/* Center Stamen */}
                        <circle cx="0" cy="0" r="12" fill={c.centerDark} />
                        {[...Array(8)].map((_, i) => (
                            <circle
                                key={`stamen-${i}`}
                                cx={7 * Math.cos(i * 0.785)}
                                cy={7 * Math.sin(i * 0.785)}
                                r="2.5"
                                fill={c.center}
                            />
                        ))}
                    </g>
                </svg>
            </div>
        </motion.div>
    );
}

export default function FinaleScreen({ onRestart, onBack }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen w-full flex flex-col relative overflow-hidden bg-gradient-to-b from-pink-50 via-white to-pink-50"
        >
            <BackButton onClick={onBack} />

            <AnimatePresence mode="wait">
                {!revealed ? (
                    <motion.div
                        key="intro"
                        className="flex-1 flex flex-col items-center justify-center p-4"
                        exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="mb-8 relative"
                        >
                            <div className="absolute inset-0 bg-rose-400 blur-2xl opacity-20 animate-pulse" />
                            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center shadow-xl ring-4 ring-rose-100 relative z-10">
                                <Sparkles className="w-16 h-16 text-rose-500 fill-rose-100" />
                            </div>
                        </motion.div>

                        <h2 className="font-serif text-4xl md:text-5xl text-rose-800 mb-8 text-center drop-shadow-sm">
                            Siap untuk Akhir?
                        </h2>

                        <motion.button
                            onClick={() => setRevealed(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group px-10 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-xl font-bold shadow-lg shadow-rose-200 hover:shadow-xl transition-all flex items-center gap-3"
                        >
                            <Stars className="w-6 h-6 group-hover:spin-slow" />
                            Buka Kejutan
                            <Stars className="w-6 h-6 group-hover:spin-slow" />
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        className="absolute inset-0 z-10 overflow-hidden"
                    >
                        {/* DYNAMIC AURORA BACKGROUND */}
                        <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-white to-pink-50 opacity-80" />
                        <motion.div
                            className="absolute inset-0 opacity-30"
                            animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
                            style={{
                                background: 'radial-gradient(circle at 50% 50%, #F8BBD0, transparent 70%), radial-gradient(circle at 100% 0%, #E1BEE7, transparent 50%)',
                                backgroundSize: '150% 150%'
                            }}
                        />

                        {/* HANGING VINES */}
                        <HangingVine x="5%" length="lg" delay={0} />
                        <HangingVine x="0%" length="md" delay={1} />
                        <HangingVine x="90%" length="lg" delay={0.5} mirror />
                        <HangingVine x="95%" length="md" delay={1.5} mirror />

                        {/* BUTTERFLIES */}
                        <Butterfly delay={2} style={{ top: '20%', left: '10%' }} />
                        <Butterfly delay={5} style={{ top: '40%', right: '15%' }} />
                        <Butterfly delay={8} style={{ top: '15%', left: '60%' }} />

                        <FlowerConfetti />

                        {/* TOP SECTION: TEXT */}
                        <div className="absolute top-0 left-0 right-0 h-[40%] flex flex-col items-center justify-center z-30 pt-16 px-4">
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="text-center"
                            >
                                <motion.h1
                                    className="font-script text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 drop-shadow-sm mb-4"
                                    animate={{ scale: [1, 1.02, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    Happy Anniversary
                                </motion.h1>
                                <p className="font-serif text-xl md:text-2xl text-rose-800/80 max-w-2xl mx-auto leading-relaxed h-16">
                                    <TypewriterText text="Like a blooming garden, my love for you grows every day❤️" delay={2} />
                                </p>
                            </motion.div>
                        </div>

                        {/* MID-AIR FLOATING PARTICLES */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={`float-${i}`}
                                    className="absolute rounded-full opacity-60"
                                    initial={{
                                        x: Math.random() * 100 + "vw",
                                        y: Math.random() * 50 + 50 + "vh",
                                        scale: 0
                                    }}
                                    animate={{
                                        y: [null, Math.random() * -20 + "vh"],
                                        x: [null, (Math.random() - 0.5) * 20 + "vw"],
                                        rotate: Math.random() * 360,
                                        opacity: [0, 0.8, 0],
                                        scale: [0, Math.random() * 0.8 + 0.2, 0]
                                    }}
                                    transition={{
                                        duration: 5 + Math.random() * 5,
                                        repeat: Infinity,
                                        delay: Math.random() * 5,
                                        ease: "easeInOut"
                                    }}
                                    style={{
                                        width: Math.random() * 10 + 5,
                                        height: Math.random() * 10 + 5,
                                        background: ['#FFB7C5', '#FFD700', '#F8BBD0'][Math.floor(Math.random() * 3)]
                                    }}
                                />
                            ))}
                        </div>

                        {/* BOTTOM SECTION: VIBRANT FLOWER HILL */}
                        <div className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none">
                            {/* 1. Deep Back Layer (Smaller, faint, higher up to create depth) */}
                            {[...Array(15)].map((_, i) => { // Reduced from 25 to 15
                                const leftPos = Math.random() * 100;
                                // Create a hill shape: higher in the sides/middle or just random bumps
                                const bottomOffset = Math.sin(leftPos / 100 * Math.PI) * 100 + Math.random() * 100;
                                return (
                                    <RealisticFlower
                                        key={`deep-${i}`}
                                        size="sm"
                                        color={['purple', 'pink', 'hotpink'][Math.floor(Math.random() * 3)]}
                                        delay={0 + Math.random() * 0.5}
                                        style={{
                                            left: `${leftPos}%`,
                                            bottom: `${50 + bottomOffset}px`,
                                            zIndex: 1,
                                            opacity: 0.7,
                                            transform: `scale(${0.5 + Math.random() * 0.3})`
                                        }}
                                    />
                                );
                            })}

                            {/* 2. Middle Layer (More dense, main volume) */}
                            {[...Array(25)].map((_, i) => { // Reduced from 30 to 25
                                const leftPos = Math.random() * 100;
                                const bottomOffset = Math.sin(leftPos / 100 * Math.PI) * 50 + Math.random() * 50;
                                return (
                                    <RealisticFlower
                                        key={`mid-${i}`}
                                        size="md"
                                        color={['purple', 'pink', 'hotpink'][Math.floor(Math.random() * 3)]}
                                        delay={0.3 + Math.random() * 0.5}
                                        style={{
                                            left: `${leftPos}%`,
                                            bottom: `${20 + bottomOffset}px`,
                                            zIndex: 5,
                                            transform: `scale(${0.7 + Math.random() * 0.3})`
                                        }}
                                    />
                                );
                            })}

                            {/* 3. Front Layer (Large, detailed, anchoring the bottom) */}
                            {[...Array(12)].map((_, i) => ( // Reduced from 15 to 12
                                <RealisticFlower
                                    key={`front-${i}`}
                                    size="lg"
                                    color={['hotpink', 'pink', 'purple'][Math.floor(Math.random() * 3)]}
                                    delay={0.6 + Math.random() * 0.5}
                                    style={{
                                        left: `${(i / 11) * 100}%`,
                                        bottom: `${-20 + Math.random() * 40}px`,
                                        zIndex: 10
                                    }}
                                />
                            ))}
                        </div>

                        {/* Restart Button */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 5 }}
                            onClick={onRestart}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute top-6 right-6 z-50 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full text-rose-600 shadow-md border border-rose-100 flex items-center gap-2 text-sm font-bold hover:bg-white transition-colors"
                        >
                            <RotateCcw className="w-4 h-4" /> REPLAY MEMORIES
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
