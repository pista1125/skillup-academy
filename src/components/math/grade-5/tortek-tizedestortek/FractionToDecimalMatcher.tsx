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
    Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Pair {
    id: number;
    value: React.ReactNode;
    displayValue: string; // For accessibility/debugging
    type: 'fraction' | 'decimal';
    pairId: number;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const FractionDisplay = ({ num, den, mixed }: { num: number, den: number, mixed?: number }) => (
    <div className="flex items-center justify-center font-bold font-mono text-xl md:text-2xl">
        {mixed && <span className="mr-1 text-2xl md:text-3xl">{mixed}</span>}
        <div className="flex flex-col items-center justify-center">
            <span className="border-b-2 border-current px-2 leading-none mb-1">{num}</span>
            <span className="leading-none">{den}</span>
        </div>
    </div>
);

const DecimalDisplay = ({ value }: { value: string }) => (
    <div className="font-bold font-mono text-2xl md:text-3xl text-blue-600">
        {value.replace('.', ',')}
    </div>
);

// Data sets
const PAIRS_EASY = [
    { id: 1, num: 1, den: 2, dec: '0.5' },
    { id: 2, num: 1, den: 4, dec: '0.25' },
    { id: 3, num: 3, den: 4, dec: '0.75' },
    { id: 4, num: 1, den: 5, dec: '0.2' },
    { id: 5, num: 2, den: 5, dec: '0.4' },
    { id: 6, num: 3, den: 5, dec: '0.6' },
    { id: 7, num: 4, den: 5, dec: '0.8' },
    { id: 8, num: 1, den: 10, dec: '0.1' },
    { id: 9, num: 3, den: 10, dec: '0.3' },
    { id: 10, num: 7, den: 10, dec: '0.7' },
    { id: 11, num: 9, den: 10, dec: '0.9' },
    { id: 12, num: 1, den: 1, dec: '1' },
];

const PAIRS_MEDIUM = [
    { id: 101, num: 1, den: 8, dec: '0.125' },
    { id: 102, num: 3, den: 8, dec: '0.375' },
    { id: 103, num: 5, den: 8, dec: '0.625' },
    { id: 104, num: 7, den: 8, dec: '0.875' },
    { id: 105, num: 1, den: 20, dec: '0.05' },
    { id: 106, num: 3, den: 20, dec: '0.15' },
    { id: 107, num: 7, den: 20, dec: '0.35' },
    { id: 108, num: 9, den: 20, dec: '0.45' },
    { id: 109, num: 1, den: 25, dec: '0.04' },
    { id: 110, num: 4, den: 25, dec: '0.16' },
    { id: 111, num: 1, den: 50, dec: '0.02' },
    { id: 112, num: 3, den: 50, dec: '0.06' },
];

const PAIRS_HARD = [
    { id: 201, num: 5, den: 4, dec: '1.25' },
    { id: 202, num: 7, den: 4, dec: '1.75' },
    { id: 203, num: 1, den: 2, mixed: 1, dec: '1.5' },
    { id: 204, num: 1, den: 4, mixed: 1, dec: '1.25' },
    { id: 205, num: 3, den: 4, mixed: 2, dec: '2.75' },
    { id: 206, num: 1, den: 5, mixed: 3, dec: '3.2' },
    { id: 207, num: 1, den: 8, mixed: 1, dec: '1.125' },
    { id: 208, num: 11, den: 10, dec: '1.1' },
    { id: 209, num: 13, den: 10, dec: '1.3' },
    { id: 210, num: 21, den: 20, dec: '1.05' },
    { id: 211, num: 2, den: 5, mixed: 1, dec: '1.4' },
    { id: 212, num: 4, den: 25, mixed: 2, dec: '2.16' },
];

export function FractionToDecimalMatcher({ onBack }: { onBack: () => void }) {
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
                value: <FractionDisplay num={pair.num} den={pair.den} mixed={'mixed' in pair ? (pair as any).mixed : undefined} />,
                displayValue: `${pair.num}/${pair.den}`,
                type: 'fraction',
                pairId: pair.id
            });
            gameCards.push({
                id: Math.random(),
                value: <DecimalDisplay value={pair.dec} />,
                displayValue: pair.dec,
                type: 'decimal',
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
                        particleCount: 150,
                        spread: 80,
                        origin: { y: 0.6 },
                        colors: ['#3b82f6', '#10b981', '#f59e0b']
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
                    <h2 className="text-2xl font-bold text-slate-800">Tört és tizedestört párosító</h2>
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
                        <p className="text-center text-slate-500 font-medium">Alapvető törtek és tizedes alakjuk</p>
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
                        <p className="text-center text-slate-500 font-medium">Kisebb törtrészek (századok, ezredek)</p>
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
                        <p className="text-center text-slate-500 font-medium">Áltörtek és vegyesszámok</p>
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
                        <Binary className="w-4 h-4 text-indigo-600" />
                        Átváltás Párosító
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

            <Card className="border-2 shadow-sm bg-slate-50/50 min-h-[400px]">
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
                                    "aspect-square rounded-2xl flex items-center justify-center p-3 transition-all duration-300 transform shadow-sm",
                                    isMatched
                                        ? "bg-emerald-50 text-emerald-600 border-2 border-emerald-200 opacity-40 scale-95 cursor-default"
                                        : isSelected
                                            ? "bg-white border-2 border-indigo-500 shadow-xl scale-105 z-10 text-indigo-700"
                                            : "bg-white border-2 border-slate-100 hover:border-indigo-300 hover:shadow-md text-slate-700 hover:-translate-y-1",
                                    isWrongSelection && "bg-rose-50 border-rose-500 text-rose-600 animate-shake"
                                )}
                            >
                                {isMatched ? (
                                    <CheckCircle2 className="w-8 h-8 opacity-60" />
                                ) : (
                                    card.value
                                )}
                            </button>
                        );
                    })}
                </div>
            </Card>

            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 flex gap-4">
                <HelpCircle className="w-6 h-6 text-indigo-600 flex-shrink-0" />
                <div className="text-sm text-indigo-900 space-y-2">
                    <p className="font-bold">Hogyan játssz?</p>
                    <p>
                        Párosítsd a közönséges törteket a tizedestört párjukkal! Kattints először az egyikre, majd a hozzá tartozó másik alakra.
                        {difficulty === 'hard' && ' Mester szinten vegyesszámokkal és 1-nél nagyobb törtekkel is találkozol!'}
                    </p>
                </div>
            </div>
        </div>
    );
}
