import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    Trophy,
    Star,
    Medal,
    Crown,
    HelpCircle,
    Pizza
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Pair {
    id: number;
    value: React.ReactNode;
    type: 'visual' | 'fraction';
    pairId: number;
}

type Difficulty = 'easy' | 'medium' | 'hard';

// Circle component that shows a fraction visually
const FractionCircle = ({ numerator, denominator, size = 80 }: { numerator: number, denominator: number, size?: number }) => {
    const radius = size / 2 - 4;
    const center = size / 2;

    // For improper fractions, show multiple circles
    const wholeCircles = Math.floor(numerator / denominator);
    const remainingNumerator = numerator % denominator;

    const circles = [];

    // Add whole circles
    for (let i = 0; i < wholeCircles; i++) {
        circles.push(
            <svg key={`whole-${i}`} width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="inline-block mx-0.5">
                <circle cx={center} cy={center} r={radius} fill="#10b981" stroke="#047857" strokeWidth="2" />
            </svg>
        );
    }

    // Add partial circle if there's a remainder
    if (remainingNumerator > 0 || wholeCircles === 0) {
        const segments = [];
        const anglePerSegment = 360 / denominator;

        for (let i = 0; i < denominator; i++) {
            const startAngle = i * anglePerSegment - 90;
            const endAngle = (i + 1) * anglePerSegment - 90;

            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            const x1 = center + radius * Math.cos(startRad);
            const y1 = center + radius * Math.sin(startRad);
            const x2 = center + radius * Math.cos(endRad);
            const y2 = center + radius * Math.sin(endRad);

            const largeArc = anglePerSegment > 180 ? 1 : 0;

            const pathData = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

            const isFilled = i < (wholeCircles === 0 ? remainingNumerator : remainingNumerator);

            segments.push(
                <path
                    key={i}
                    d={pathData}
                    fill={isFilled ? '#10b981' : '#e5e7eb'}
                    stroke="#047857"
                    strokeWidth="1.5"
                />
            );
        }

        circles.push(
            <svg key="partial" width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="inline-block mx-0.5">
                {segments}
            </svg>
        );
    }

    return <div className="flex items-center justify-center flex-wrap gap-1">{circles}</div>;
};

const FractionDisplay = ({ num, den }: { num: number, den: number }) => (
    <div className="flex flex-col items-center justify-center font-bold font-mono text-2xl">
        <span className="border-b-2 border-current px-2 leading-none mb-1">{num}</span>
        <span className="leading-none">{den}</span>
    </div>
);

// Data sets
const PAIRS_EASY = [
    { id: 1, num: 1, den: 2 },
    { id: 2, num: 1, den: 3 },
    { id: 3, num: 2, den: 3 },
    { id: 4, num: 1, den: 4 },
    { id: 5, num: 2, den: 4 },
    { id: 6, num: 3, den: 4 },
    { id: 7, num: 1, den: 5 },
    { id: 8, num: 2, den: 5 },
    { id: 9, num: 3, den: 5 },
    { id: 10, num: 4, den: 5 },
    { id: 11, num: 1, den: 6 },
    { id: 12, num: 5, den: 6 },
];

const PAIRS_MEDIUM = [
    { id: 101, num: 3, den: 8 },
    { id: 102, num: 5, den: 8 },
    { id: 103, num: 7, den: 8 },
    { id: 104, num: 2, den: 7 },
    { id: 105, num: 4, den: 7 },
    { id: 106, num: 5, den: 7 },
    { id: 107, num: 1, den: 10 },
    { id: 108, num: 3, den: 10 },
    { id: 109, num: 7, den: 10 },
    { id: 110, num: 9, den: 10 },
    { id: 111, num: 2, den: 9 },
    { id: 112, num: 4, den: 9 },
];

const PAIRS_HARD = [
    { id: 201, num: 5, den: 4 },
    { id: 202, num: 7, den: 4 },
    { id: 203, num: 5, den: 3 },
    { id: 204, num: 7, den: 3 },
    { id: 205, num: 8, den: 3 },
    { id: 206, num: 9, den: 5 },
    { id: 207, num: 11, den: 5 },
    { id: 208, num: 7, den: 2 },
    { id: 209, num: 9, den: 2 },
    { id: 210, num: 10, den: 3 },
    { id: 211, num: 13, den: 6 },
    { id: 212, num: 11, den: 4 },
];

export function FractionVisualMatcher({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [cards, setCards] = useState<Pair[]>([]);
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [isWrong, setIsWrong] = useState(false);

    const initializeGame = useCallback(() => {
        if (!difficulty) return;

        let sourcePairs;
        if (difficulty === 'easy') sourcePairs = PAIRS_EASY;
        else if (difficulty === 'medium') sourcePairs = PAIRS_MEDIUM;
        else sourcePairs = PAIRS_HARD;

        const shuffledPairs = [...sourcePairs].sort(() => Math.random() - 0.5).slice(0, 6);

        const gameCards: Pair[] = [];
        shuffledPairs.forEach(pair => {
            gameCards.push({
                id: Math.random(),
                value: <FractionCircle numerator={pair.num} denominator={pair.den} size={70} />,
                type: 'visual',
                pairId: pair.id
            });
            gameCards.push({
                id: Math.random(),
                value: <FractionDisplay num={pair.num} den={pair.den} />,
                type: 'fraction',
                pairId: pair.id
            });
        });

        setCards(gameCards.sort(() => Math.random() - 0.5));
        setSelectedCards([]);
        setMatchedPairs([]);
        setScore(0);
        setAttempts(0);
        setIsWrong(false);
    }, [difficulty]);

    useEffect(() => {
        if (difficulty) {
            initializeGame();
        }
    }, [difficulty, initializeGame]);

    const handleCardClick = (index: number) => {
        if (matchedPairs.includes(cards[index].pairId) || selectedCards.includes(index) || selectedCards.length >= 2 || isWrong) {
            return;
        }

        const newSelected = [...selectedCards, index];
        setSelectedCards(newSelected);

        if (newSelected.length === 2) {
            setAttempts(prev => prev + 1);
            const card1 = cards[newSelected[0]];
            const card2 = cards[newSelected[1]];

            if (card1.pairId === card2.pairId) {
                setMatchedPairs(prev => [...prev, card1.pairId]);
                setScore(prev => prev + 1);
                setSelectedCards([]);

                if (matchedPairs.length + 1 === cards.length / 2) {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#f97316', '#10b981', '#3b82f6']
                    });
                }
            } else {
                setIsWrong(true);
                setTimeout(() => {
                    setSelectedCards([]);
                    setIsWrong(false);
                }, 1000);
            }
        }
    };

    if (!difficulty) {
        return (
            <div className="flex flex-col gap-8 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Vissza
                    </Button>
                    <h2 className="text-2xl font-bold text-slate-800">Válassz nehézségi szintet!</h2>
                    <div className="w-16"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <button
                        onClick={() => setDifficulty('easy')}
                        className="flex flex-col items-center p-8 bg-white border-2 border-emerald-100 rounded-3xl hover:border-emerald-400 hover:shadow-xl hover:scale-105 transition-all group"
                    >
                        <div className="p-4 bg-emerald-100 text-emerald-600 rounded-full mb-6 group-hover:rotate-12 transition-transform">
                            <Star className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-black text-emerald-900 mb-2">Kezdő</h3>
                        <p className="text-center text-slate-500 font-medium">Egyszerű törtek</p>
                        <span className="mt-4 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">Könnyű</span>
                    </button>

                    <button
                        onClick={() => setDifficulty('medium')}
                        className="flex flex-col items-center p-8 bg-white border-2 border-amber-100 rounded-3xl hover:border-amber-400 hover:shadow-xl hover:scale-105 transition-all group"
                    >
                        <div className="p-4 bg-amber-100 text-amber-600 rounded-full mb-6 group-hover:rotate-12 transition-transform">
                            <Medal className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-black text-amber-900 mb-2">Haladó</h3>
                        <p className="text-center text-slate-500 font-medium">Több szelet</p>
                        <span className="mt-4 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">Közepes</span>
                    </button>

                    <button
                        onClick={() => setDifficulty('hard')}
                        className="flex flex-col items-center p-8 bg-white border-2 border-rose-100 rounded-3xl hover:border-rose-400 hover:shadow-xl hover:scale-105 transition-all group"
                    >
                        <div className="p-4 bg-rose-100 text-rose-600 rounded-full mb-6 group-hover:rotate-12 transition-transform">
                            <Crown className="w-12 h-12" />
                        </div>
                        <h3 className="text-2xl font-black text-rose-900 mb-2">Mester</h3>
                        <p className="text-center text-slate-500 font-medium">Valódi törtek (&gt;1)</p>
                        <span className="mt-4 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">Nehéz</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-2">
                <Button variant="ghost" onClick={() => setDifficulty(null)} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Szintválasztás
                </Button>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Pizza className="w-4 h-4 text-orange-600" />
                        Törtek Felismerése
                    </h2>
                    <span className={cn(
                        "text-xs font-bold px-2 py-0.5 rounded-full capitalize",
                        difficulty === 'easy' && "bg-emerald-100 text-emerald-700",
                        difficulty === 'medium' && "bg-amber-100 text-amber-700",
                        difficulty === 'hard' && "bg-rose-100 text-rose-700",
                    )}>
                        {difficulty === 'easy' ? 'Kezdő' : difficulty === 'medium' ? 'Haladó' : 'Mester'} szint
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <Trophy className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-700">{score}/{attempts}</span>
                    </div>
                    <Button variant="ghost" onClick={initializeGame} size="sm" className="text-muted-foreground text-xs">
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Újra
                    </Button>
                </div>
            </div>

            <Card className="border-2 shadow-sm bg-slate-50/50">
                <div className="p-6 grid grid-cols-3 md:grid-cols-4 gap-4">
                    {cards.map((card, index) => {
                        const isSelected = selectedCards.includes(index);
                        const isMatched = matchedPairs.includes(card.pairId);
                        const isWrongSelection = isSelected && isWrong;

                        return (
                            <button
                                key={card.id}
                                onClick={() => handleCardClick(index)}
                                disabled={isMatched}
                                className={cn(
                                    "aspect-square rounded-xl flex items-center justify-center p-3 transition-all duration-300 transform",
                                    isMatched
                                        ? "bg-emerald-100 text-emerald-600 border-2 border-emerald-200 opacity-50 scale-95 cursor-default"
                                        : isSelected
                                            ? "bg-white border-2 border-blue-500 shadow-lg scale-105 z-10 text-blue-700"
                                            : "bg-white border-2 border-slate-200 hover:border-blue-300 hover:shadow-md text-slate-700 hover:-translate-y-1",
                                    isWrongSelection && "bg-rose-50 border-rose-500 text-rose-600 animate-shake"
                                )}
                            >
                                {isMatched ? (
                                    <CheckCircle2 className="w-8 h-8" />
                                ) : (
                                    card.value
                                )}
                            </button>
                        );
                    })}
                </div>
            </Card>

            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex gap-4">
                <HelpCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
                <div className="text-sm text-orange-900 space-y-2">
                    <p className="font-bold">Hogyan játssz?</p>
                    <p>
                        Párosítsd a kördiagramokat a megfelelő törtekkel! A zöld részek mutatják, hogy a körnek mekkora részét vettük.
                        {difficulty === 'hard' && ' A Mester szinten több kör is lehet, ha a tört nagyobb mint 1!'}
                    </p>
                </div>
            </div>
        </div>
    );
}
