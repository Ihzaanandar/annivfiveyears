import { useMemo } from 'react';

export default function FloatingPetals() {
    const petals = useMemo(() => {
        return Array.from({ length: 25 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 12,
            duration: 10 + Math.random() * 10,
            size: 12 + Math.random() * 18,
            opacity: 0.3 + Math.random() * 0.4,
            swayAmount: 20 + Math.random() * 40,
            type: Math.random() > 0.7 ? 'heart' : 'petal',
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {petals.map((petal) => (
                <div
                    key={petal.id}
                    className="petal"
                    style={{
                        left: `${petal.left}%`,
                        animationDelay: `${petal.delay}s`,
                        animationDuration: `${petal.duration}s`,
                        width: `${petal.size}px`,
                        height: `${petal.size}px`,
                        opacity: petal.opacity,
                    }}
                >
                    {petal.type === 'heart' ? (
                        <svg
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <path
                                d="M50 88 C20 60, 5 40, 20 25 C35 10, 50 20, 50 35 C50 20, 65 10, 80 25 C95 40, 80 60, 50 88Z"
                                fill="#F8BBD0"
                            />
                        </svg>
                    ) : (
                        <svg
                            viewBox="0 0 100 100"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <ellipse
                                cx="50"
                                cy="50"
                                rx="45"
                                ry="22"
                                fill="url(#petalGradient)"
                                transform="rotate(45 50 50)"
                            />
                            <defs>
                                <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FCE4EC" />
                                    <stop offset="50%" stopColor="#F8BBD0" />
                                    <stop offset="100%" stopColor="#F48FB1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    )}
                </div>
            ))}
        </div>
    );
}
