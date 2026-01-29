import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Feather, Sparkles } from 'lucide-react';
import BackButton from './BackButton';
import FloatingHearts from './FloatingHearts';

const letterParagraphs = [
    "Met Anniversary ke 5 tahunnnnn tayangggg 🥳🥳🥳🥳🥳🥳, maaf bibiu no bica ketemuinn bibiu ditanggay 31 iniii jadii bibiu beriniciatifff merayakannya lewat websitee tayanggg wiwuiwiwuwiuwi.",
    "nantiiii tanggay 7 kita ketemuu kokk kita nanti jayannn-jayannnn mutey muteyyy jogjaaaaa nantii bibiuu bikinkannn rundownyaaa mwehehehehh 🤪🤪🤪🤪🤪🤪🤪🤪🤪",
    "no beyacaa yachhh ayanggg cuda ceyamaaa ini hubungann kitaaa dah 5 taunnn cuatu pencapaiann yg amajinggg karena tidak cemuaa pacangann bica beginiii, cedangkannn kita bicaaa angjayy😎😎😎😎😎",
    "cucahhh cenanggg kita lalui bercamaaa, calingg berkomunikaci, ceyita kecana kemayi, dan lain lainnn kita lalui bercama celamaa iniiii tayanggg bibiuuu bersyukurr bica bertemuuu ayangggg 🥰🥰🥰🥰🥰🥰",
    "bibiuuu mauuu kedepannya kita tetap bercama walau banyak rintangann menghadangggg ayanggg teyus kita caling memaafkan jika ada kecalahan kayena itu kuncii dayi hubungannn yang cukcesss",
    "cekalii lagiii bibiu minta maaf yachh ayang no bica ketemuinn ditanggay ini 🥺🥺🥺🥺, bibiuuu ucapinnn teyimakaci buat ayangg yg celalu ada buat bibiu celalu memaafkan bibiuuu celalu pengertiann ke bibiuuuu"
];

function TypewriterText({ text, delay = 0, onComplete }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        const timeout = setTimeout(() => {
            let currentIndex = 0;
            const interval = setInterval(() => {
                if (currentIndex <= text.length) {
                    setDisplayedText(text.slice(0, currentIndex));
                    currentIndex++;
                } else {
                    clearInterval(interval);
                    if (onComplete) onComplete();
                }
            }, 25);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [text, delay, onComplete]);

    return (
        <span>
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-4 bg-deep-rose ml-0.5 align-middle"
            />
        </span>
    );
}

export default function StoryScreen({ onNext, onBack }) {
    const [visibileParagraphIndex, setVisibleParagraphIndex] = useState(0);

    const handleParagraphComplete = () => {
        setTimeout(() => {
            if (visibileParagraphIndex < letterParagraphs.length - 1) {
                setVisibleParagraphIndex(prev => prev + 1);
            }
        }, 500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen w-full relative bg-pink-50 flex flex-col items-center"
        >
            <FloatingHearts />
            <BackButton onClick={onBack} />

            <div className="relative z-10 w-full max-w-4xl pt-20 pb-40 px-4 md:px-8 flex flex-col items-center">

                {/* Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-10"
                >
                    <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
                        <Feather className="w-8 h-8 text-deep-rose" />
                    </div>
                    <h1 className="font-script text-5xl md:text-6xl text-deep-rose mb-2">
                        Untukkk bubui❤️
                    </h1>
                    <p className="text-sm font-serif text-deep-rose/70 tracking-widest uppercase">
                        -----------------------------------------------------------------------
                    </p>
                </motion.div>

                {/* Letter Container - ADDED PADDING BOTTOM FOR BUTTON SAFETY */}
                <motion.div
                    className="w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 border border-white mb-20 relative"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="space-y-6 min-h-[400px]">
                        {letterParagraphs.map((paragraph, index) => (
                            <div key={index} className="min-h-[1.5em]">
                                {index <= visibileParagraphIndex && (
                                    <p className="font-serif text-lg leading-relaxed text-dark-text/90 text-center">
                                        {index === visibileParagraphIndex ? (
                                            <TypewriterText text={paragraph} onComplete={handleParagraphComplete} />
                                        ) : (
                                            paragraph
                                        )}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Signature */}
                    {visibileParagraphIndex === letterParagraphs.length - 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 text-center border-t border-pink-200 pt-8"
                        >
                            <p className="font-script text-4xl text-deep-rose">Love You Ayang Bubui</p>
                            <div className="flex justify-center gap-2 mt-2">
                                <Heart className="w-5 h-5 text-deep-rose fill-current" />
                                <Heart className="w-5 h-5 text-deep-rose fill-current" />
                                <Heart className="w-5 h-5 text-deep-rose fill-current" />
                                <Heart className="w-5 h-5 text-deep-rose fill-current" />
                                <Heart className="w-5 h-5 text-deep-rose fill-current" />
                            </div>
                        </motion.div>
                    )}
                </motion.div>

            </div>

            {/* Button Fixed at Bottom - SAFE AREA GUARANTEED */}
            {visibileParagraphIndex === letterParagraphs.length - 1 && (
                <motion.div
                    initial={{ y: 100 }}
                    animate={{ y: 0 }}
                    className="fixed bottom-15 left-0 right-0 p-6 bg-gradient-to-t from-white via-white/80 to-transparent z-50 flex justify-center"
                >
                    <button
                        onClick={onNext}
                        className="px-8 py-4 bg-deep-rose text-white rounded-full font-serif text-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3"
                    >
                        <BookOpen className="w-12 h-12" />
                        Buka Album Kita
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
}
