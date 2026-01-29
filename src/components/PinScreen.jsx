import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Lock, Sparkles, Delete, KeyRound } from 'lucide-react';

const CORRECT_PIN = '310121'; // Change this to your actual date if needed

export default function PinScreen({ onSuccess }) {
    const [pin, setPin] = useState('');
    const [shake, setShake] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handleKeyPress = useCallback((digit) => {
        if (pin.length < 6 && !success) {
            const newPin = pin + digit;
            setPin(newPin);
            setError(false);

            if (newPin.length === 6) {
                if (newPin === CORRECT_PIN) {
                    setSuccess(true);
                    setTimeout(() => onSuccess(), 1500);
                } else {
                    setShake(true);
                    setError(true);
                    setTimeout(() => {
                        setShake(false);
                        setPin('');
                    }, 600);
                }
            }
        }
    }, [pin, onSuccess, success]);

    const handleDelete = useCallback(() => {
        setPin((prev) => prev.slice(0, -1));
        setError(false);
    }, []);

    const handleClear = useCallback(() => {
        setPin('');
        setError(false);
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 relative z-10">
            {/* Photo & Lock Container */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', duration: 0.8 }}
                className="relative mb-8 flex flex-col items-center"
            >
                <div className="w-40 h-40 md:w-52 md:h-52 rounded-full p-2 bg-white/50 backdrop-blur-sm shadow-xl relative">
                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-inner relative z-10">
                        <img
                            src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop"
                            alt="Us"
                            className="w-full h-full object-cover"
                        />
                        {success && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-rose-500/60 flex items-center justify-center z-20"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                                    transition={{ type: 'spring' }}
                                >
                                    <Heart className="w-16 h-16 text-white fill-current" />
                                </motion.div>
                            </motion.div>
                        )}
                    </div>

                    {/* Floating Lock Icon */}
                    <div className="absolute -bottom-3 -right-3 z-20 bg-white p-3 rounded-full shadow-lg">
                        {success ? (
                            <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                        ) : (
                            <Lock className="w-6 h-6 text-rose-400" />
                        )}
                    </div>
                </div>

                <motion.h1
                    className="font-script text-4xl md:text-5xl text-rose-600 mt-6 text-center drop-shadow-sm"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    pin
                </motion.h1>
                <p className="text-rose-400/80 font-medium text-sm mt-1">Tanggal jadian kita</p>
                <p className="text-rose-400/80 font-medium text-sm mt-1">-------------------</p>
            </motion.div>

            {/* Hint Button */}
            {/* <motion.button
                onClick={() => setShowHint(!showHint)}
                className="mb-6 flex items-center gap-2 text-xs font-semibold text-rose-400 bg-white/60 px-4 py-1.5 rounded-full hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Sparkles className="w-3 h-3" />
                {showHint ? "Tanggal jadian kita" : "Butuh petunjuk?"}
            </motion.button> */}

            {/* PIN Dots */}
            <motion.div
                className={`flex gap-4 mb-8 ${shake ? 'shake' : ''}`}
            >
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-300 ${pin.length > i
                            ? success ? 'bg-green-400 scale-125' : 'bg-rose-500 scale-110'
                            : 'bg-rose-200/50 border border-rose-300'
                            }`}
                    />
                ))}
            </motion.div>

            {/* Error Message */}
            <div className="h-6 mb-2">
                <AnimatePresence>
                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-400 text-sm font-bold flex items-center gap-1"
                        >
                            <KeyRound className="w-3 h-3" /> Tuuu bubu lupa -_-
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            {/* Custom Keypad */}
            <motion.div
                className="grid grid-cols-3 gap-x-6 gap-y-4"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <motion.button
                        key={num}
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleKeyPress(num.toString())}
                        disabled={success}
                        className="w-16 h-16 rounded-full bg-white/40 shadow-sm backdrop-blur-sm flex items-center justify-center text-2xl font-serif text-rose-600 border border-white/60 transition-all"
                    >
                        {num}
                    </motion.button>
                ))}

                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleClear}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-rose-400 font-medium text-sm hover:text-rose-600"
                >
                    Bersihkan
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleKeyPress('0')}
                    disabled={success}
                    className="w-16 h-16 rounded-full bg-white/40 shadow-sm backdrop-blur-sm flex items-center justify-center text-2xl font-serif text-rose-600 border border-white/60"
                >
                    0
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(254, 205, 211, 0.5)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDelete}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-rose-500"
                >
                    <Delete className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
    );
}
