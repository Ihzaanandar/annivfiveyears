import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Sparkles, Gift, Camera, Star } from 'lucide-react';
import BackButton from './BackButton';

const photos = [
    {
        id: 1,
        src: "/assets/image/2021.jpeg",
        caption: "Awal dari semuanya",
        year: "2021",
        color: "bg-rose-100",
        rotate: -2
    },
    {
        id: 2,
        src: "/assets/image/2022.jpeg",
        caption: "Petualangan kita",
        year: "2022",
        color: "bg-blue-100",
        rotate: 1
    },
    {
        id: 3,
        src: "/assets/image/2023.png",
        caption: "Tumbuh bersama",
        year: "2023",
        color: "bg-yellow-100",
        rotate: -1
    },
    {
        id: 4,
        src: "/assets/image/2024.jpeg",
        caption: "Lebih kuat dari sebelumnya",
        year: "2024",
        color: "bg-purple-100",
        rotate: 2
    },
    {
        id: 5,
        src: "/assets/image/2025.jpeg",
        caption: "Lima tahun cinta bersama",
        year: "2025",
        color: "bg-pink-100",
        rotate: 0
    },
];

export default function AlbumScreen({ onNext, onBack }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const paginate = (newDirection) => {
        const nextIndex = currentIndex + newDirection;
        if (nextIndex >= 0 && nextIndex < photos.length) {
            setDirection(newDirection);
            setCurrentIndex(nextIndex);
        }
    };

    const currentPhoto = photos[currentIndex];
    const isLastPhoto = currentIndex === photos.length - 1;
    const isFirstPhoto = currentIndex === 0;

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            rotate: direction > 0 ? 10 : -10,
            scale: 0.8
        }),
        center: {
            x: 0,
            opacity: 1,
            rotate: currentPhoto.rotate,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            rotate: direction < 0 ? 10 : -10,
            scale: 0.8,
            transition: { duration: 0.2 }
        })
    };

    return (
        <div className="min-h-screen w-full flex flex-col relative overflow-hidden z-10">
            <BackButton onClick={onBack} />

            {/* Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="pt-16 pb-2 text-center z-10 relative"
            >
                <h1 className="font-script text-5xl md:text-6xl text-rose-600 drop-shadow-sm">Album Tahunan Kita</h1>
                <div className="flex justify-center gap-2 mt-2">
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse delay-75" />
                    <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse delay-150" />
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col items-center justify-center relative w-full px-4 pb-24">

                {/* Photo Container */}
                <div className="relative w-full max-w-sm aspect-[3/4]">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {/* Polaroid Frame */}
                            <div className={`
                                relative w-full h-full bg-white p-4 pb-16 shadow-2xl rounded-sm
                                transform transition-transform hover:scale-[1.02] duration-300
                            `}>
                                {/* Washi Tape */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose-200/80 rotate-1 shadow-sm backdrop-blur-sm z-20 pointer-events-none" />

                                {/* Photo */}
                                <div className="w-full h-4/5 bg-gray-100 overflow-hidden relative border border-gray-100">
                                    <img
                                        src={currentPhoto.src}
                                        alt={currentPhoto.caption}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-black/5 inset-shadow-sm" />
                                </div>

                                {/* Stickers */}
                                <div className="absolute -right-4 -top-4 text-yellow-400 drop-shadow-md rotate-12 z-20">
                                    <Sparkles className="w-10 h-10 fill-yellow-200" />
                                </div>
                                <div className="absolute -left-2 bottom-20 text-blue-400 drop-shadow-md -rotate-12 z-20">
                                    <Star className="w-6 h-6 fill-blue-200" />
                                </div>

                                {/* Caption Area */}
                                <div className="absolute bottom-2 left-0 w-full text-center p-2">
                                    <p className="font-script text-4xl text-rose-500 mb-1">{currentPhoto.year}</p>
                                    <p className="font-serif text-gray-600 text-lg italic">{currentPhoto.caption}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-30">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => paginate(-1)}
                            disabled={isFirstPhoto}
                            className={`w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors ${isFirstPhoto ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </motion.button>
                    </div>
                    <div className="absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-30">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => paginate(1)}
                            disabled={isLastPhoto}
                            className={`w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors ${isLastPhoto ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                        >
                            <ChevronRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>

                {/* Progress Dots */}
                <div className="flex gap-3 mt-8 z-20">
                    {photos.map((_, idx) => (
                        <motion.div
                            key={idx}
                            animate={{
                                scale: idx === currentIndex ? 1.2 : 1,
                                backgroundColor: idx === currentIndex ? '#E11D48' : '#FECDD3'
                            }}
                            className="w-3 h-3 rounded-full shadow-sm cursor-pointer"
                            onClick={() => {
                                const newDir = idx > currentIndex ? 1 : -1;
                                setDirection(newDir);
                                setCurrentIndex(idx);
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Final Action */}
            <div className="fixed bottom-8 w-full flex justify-center z-30 pointer-events-none">
                <AnimatePresence>
                    {isLastPhoto && (
                        <motion.button
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 50, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onNext}
                            className="pointer-events-auto px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full shadow-lg shadow-rose-200 flex items-center gap-3 font-semibold text-lg border-2 border-white/50"
                        >
                            <Gift className="w-5 h-5 animate-bounce" />
                            <span>Satu Kejutan Terakhir!!!</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
