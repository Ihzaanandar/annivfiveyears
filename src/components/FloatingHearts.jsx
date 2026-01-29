import { useEffect, useState } from 'react';

const HEART_CHARS = ['❤️', '💖', '💕', '💗', '🌸', '✨'];
const COLORS = ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fff1f2'];

export default function FloatingHearts() {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        // Create fixed number of hearts
        const newHearts = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
            left: `${Math.random() * 100}vw`,
            duration: `${15 + Math.random() * 20}s`,
            delay: `-${Math.random() * 20}s`, // Start at random times immediately
            size: `${1 + Math.random() * 1.5}rem`,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
        }));
        setHearts(newHearts);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="floating-heart absolute"
                    style={{
                        '--left': heart.left,
                        '--duration': heart.duration,
                        '--delay': heart.delay,
                        '--size': heart.size,
                        '--color': heart.color,
                        fontSize: heart.size,
                        left: heart.left,
                        animationDelay: heart.delay,
                        animationDuration: heart.duration,
                    }}
                >
                    {heart.char}
                </div>
            ))}
        </div>
    );
}
