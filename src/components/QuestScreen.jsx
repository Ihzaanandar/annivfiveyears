import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Heart, Sparkles, HelpCircle } from 'lucide-react';
import BackButton from './BackButton';

const quests = [
    {
        id: 1,
        question: "Dimana kita jadian?",
        options: [
            "Taman Edukasi",
            "Islamic Center",
            "Rumah Bubu",
            "Pasar Brebes"
        ],
        correct: 1,
        emoji: "🕌",
    },
    {
        id: 2,
        question: "Apa makanan kesukaan bibi?",
        options: [
            "Nasi Goreng",
            "Ayam Geprek",
            "Mie Ayam",
            "Bubu"
        ],
        correct: 2,
        emoji: "🍜",
    },
    {
        id: 3,
        question: "Tahun berapa foto ini diambil?",
        options: [
            "2019",
            "2020",
            "2021",
            "2022"
        ],
        correct: 3,
        image: "public/assets/image/fotodiambil.jpeg",
        emoji: "📸",
    },
];

export default function QuestScreen({ currentQuest, onComplete, onBack }) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const quest = quests[currentQuest];
    const progress = ((currentQuest + 1) / quests.length) * 100;

    const handleAnswer = (index) => {
        if (showResult) return;

        setSelectedAnswer(index);
        setShowResult(true);
        setIsCorrect(index === quest.correct);

        if (index === quest.correct) {
            setTimeout(() => {
                onComplete();
                setSelectedAnswer(null);
                setShowResult(false);
            }, 1500);
        }
    };

    const handleTryAgain = () => {
        setSelectedAnswer(null);
        setShowResult(false);
        setIsCorrect(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 floral-pattern relative overflow-hidden"
        >
            <BackButton onClick={onBack} />

            {/* Floating Background Elements for "Alive" feel */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-pink-200/40"
                        style={{
                            left: `${Math.random() * 80 + 10}%`,
                            top: `${Math.random() * 80 + 10}%`,
                            fontSize: `${Math.random() * 20 + 20}px`
                        }}
                        animate={{
                            y: [0, -30, 0],
                            rotate: [0, 10, -10, 0],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <HelpCircle />
                    </motion.div>
                ))}
            </div>

            {/* Main Content Container - Widened spacing */}
            <div className="w-full max-w-2xl mx-auto flex flex-col items-center relative z-10">

                {/* Progress Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mb-16"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <motion.div
                                className="w-14 h-14 rounded-2xl bg-gradient-to-br from-deep-rose to-pink-500 flex items-center justify-center shadow-lg"
                                animate={{ rotate: [0, 3, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <span className="text-white text-xl font-bold">{currentQuest + 1}</span>
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-sm text-deep-rose/80 font-bold tracking-wider uppercase">Pertanyaan Cinta</span>
                                <span className="text-xl font-serif text-dark-text">Pertanyaan {currentQuest + 1} dari {quests.length}</span>
                            </div>
                        </div>

                        {/* Dots */}
                        <div className="flex items-center gap-3">
                            {[...Array(quests.length)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={`border-2 transition-all duration-500 ${i <= currentQuest
                                            ? 'w-4 h-4 rounded-full border-deep-rose bg-deep-rose'
                                            : 'w-3 h-3 rounded-full border-deep-rose/30 bg-transparent'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-6 bg-white/50 backdrop-blur-md rounded-full overflow-hidden shadow-inner border border-white/60 p-1">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-pink-400 via-deep-rose to-rose-600 rounded-full relative"
                        >
                            <motion.div
                                className="absolute inset-0 bg-white/30"
                                animate={{ x: ['-100%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Quest Content Card */}
                <motion.div
                    key={currentQuest}
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="w-full bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/70"
                >
                    <div className="flex flex-col items-center">
                        {/* Dynamic Emoji Icon */}
                        <motion.div
                            className="w-32 h-32 rounded-full bg-white shadow-xl flex items-center justify-center mb-10 -mt-24 border-4 border-pink-50"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-6xl filter drop-shadow-md">{quest.emoji}</span>
                            <motion.div
                                className="absolute -right-2 top-0"
                                animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Sparkles className="w-10 h-10 text-yellow-400 fill-current" />
                            </motion.div>
                        </motion.div>

                        {/* Question */}
                        <h2 className="font-serif text-3xl md:text-5xl text-dark-text text-center mb-12 leading-tight">
                            {quest.question}
                        </h2>

                        {/* Image if present */}
                        {quest.image && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mb-12 relative group"
                            >
                                <div className="absolute inset-0 bg-deep-rose/20 blur-xl rounded-full transform scale-90 group-hover:scale-100 transition-transform duration-500" />
                                <img
                                    src={quest.image}
                                    alt="Memory"
                                    className="relative w-80 h-56 object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        )}

                        {/* Options Grid */}
                        <div className="w-full grid grid-cols-1 gap-5">
                            {quest.options.map((option, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleAnswer(index)}
                                    disabled={showResult}
                                    whileHover={!showResult ? { scale: 1.02, x: 10 } : {}}
                                    className={`w-full p-6 text-left transition-all duration-300 rounded-2xl border-2 relative overflow-hidden group ${showResult && selectedAnswer === index
                                            ? isCorrect
                                                ? 'bg-green-500 border-green-400 text-white shadow-green-200'
                                                : 'bg-red-500 border-red-400 text-white shadow-red-200'
                                            : showResult && index === quest.correct
                                                ? 'bg-green-500 border-green-400 text-white shadow-green-200'
                                                : 'bg-white hover:bg-white border-transparent hover:border-deep-rose/30 shadow-sm hover:shadow-md text-dark-text'
                                        }`}
                                >
                                    <div className="relative z-10 flex items-center gap-6">
                                        <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${showResult && (selectedAnswer === index || index === quest.correct)
                                                ? 'bg-white/30 text-white'
                                                : 'bg-pink-100 text-deep-rose group-hover:bg-deep-rose group-hover:text-white'
                                            }`}>
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                        <span className="font-medium text-xl flex-1">{option}</span>

                                        {showResult && selectedAnswer === index && (
                                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                                {isCorrect ? <CheckCircle className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Result Overlay */}
                <AnimatePresence>
                    {showResult && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="mt-10 text-center"
                        >
                            {isCorrect ? (
                                <motion.div
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ repeat: Infinity, duration: 1.5 }}
                                    className="inline-flex items-center gap-3 px-8 py-3 bg-green-100 text-green-700 rounded-full"
                                >
                                    <CheckCircle className="w-6 h-6" />
                                    <span className="font-bold text-lg">Betuyyy Tayangg</span>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <p className="font-serif text-xl text-red-500 bg-red-50 px-6 py-2 rounded-full">
                                        Calah bubuii, coba yagiii💕
                                    </p>
                                    <button
                                        onClick={handleTryAgain}
                                        className="text-deep-rose font-bold hover:underline"
                                    >
                                        Ulangi Pertanyaan
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </motion.div>
    );
}
