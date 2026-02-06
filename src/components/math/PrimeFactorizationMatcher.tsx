import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    Binary,
    HelpCircle,
    Star,
    Medal,
    Crown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Pair {
    id: number;
    value: string; // The text to display (e.g., "12" or "2² · 3")
    type: 'number' | 'factorization';
    pairId: number; // ID to link matching pairs
}

type Difficulty = 'easy' | 'medium' | 'hard';

const PAIRS_EASY = [
    { id: 1, number: '12', factorization: '2² · 3' },
    { id: 2, number: '18', factorization: '2 · 3²' },
    { id: 3, number: '20', factorization: '2² · 5' },
    { id: 4, number: '24', factorization: '2³ · 3' },
    { id: 5, number: '30', factorization: '2 · 3 · 5' },
    { id: 6, number: '36', factorization: '2² · 3²' },
    { id: 7, number: '45', factorization: '3² · 5' },
    { id: 8, number: '50', factorization: '2 · 5²' },
    { id: 9, number: '60', factorization: '2² · 3 · 5' },
    { id: 10, number: '72', factorization: '2³ · 3²' },
    { id: 11, number: '75', factorization: '3 · 5²' },
    { id: 12, number: '100', factorization: '2² · 5²' },
];

const PAIRS_MEDIUM = [
    { id: 101, number: '120', factorization: '2³ · 3 · 5' },
    { id: 102, number: '144', factorization: '2⁴ · 3²' },
    { id: 103, number: '150', factorization: '2 · 3 · 5²' },
    { id: 104, number: '180', factorization: '2² · 3² · 5' },
    { id: 105, number: '200', factorization: '2³ · 5²' },
    { id: 106, number: '210', factorization: '2 · 3 · 5 · 7' },
    { id: 107, number: '216', factorization: '2³ · 3³' },
    { id: 108, number: '225', factorization: '3² · 5²' },
    { id: 109, number: '240', factorization: '2⁴ · 3 · 5' },
    { id: 110, number: '250', factorization: '2 · 5³' },
    { id: 111, number: '256', factorization: '2⁸' },
    { id: 112, number: '300', factorization: '2² · 3 · 5²' },
];

const PAIRS_HARD = [
    { id: 201, number: '360', factorization: '2³ · 3² · 5' },
    { id: 202, number: '400', factorization: '2⁴ · 5²' },
    { id: 203, number: '420', factorization: '2² · 3 · 5 · 7' },
    { id: 204, number: '500', factorization: '2² · 5³' },
    { id: 205, number: '512', factorization: '2⁹' },
    { id: 206, number: '600', factorization: '2³ · 3 · 5²' },
    { id: 207, number: '625', factorization: '5⁴' },
    { id: 208, number: '720', factorization: '2⁴ · 3² · 5' },
    { id: 209, number: '840', factorization: '2³ · 3 · 5 · 7' },
    { id: 210, number: '900', factorization: '2² · 3² · 5²' },
    { id: 211, number: '1000', factorization: '2³ · 5³' },
    { id: 212, number: '1024', factorization: '2¹⁰' },
];

export function PrimeFactorizationMatcher({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [cards, setCards] = useState<Pair[]>([]);
    const [selectedCards, setSelectedCards] = useState<number[]>([]); // Indices of selected cards
    const [matchedPairs, setMatchedPairs] = useState<number[]>([]); // Pair IDs that have been matched
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [isWrong, setIsWrong] = useState(false);

    const initializeGame = useCallback(() => {
        if (!difficulty) return;

        let sourcePairs;
        if (difficulty === 'easy') sourcePairs = PAIRS_EASY;
        else if (difficulty === 'medium') sourcePairs = PAIRS_MEDIUM;
        else sourcePairs = PAIRS_HARD;

        // Select 6 random pairs to play with
        const shuffledPairs = [...sourcePairs].sort(() => Math.random() - 0.5).slice(0, 6);

        const gameCards: Pair[] = [];
        shuffledPairs.forEach(pair => {
            gameCards.push({ id: Math.random(), value: pair.number, type: 'number', pairId: pair.id });
            gameCards.push({ id: Math.random(), value: pair.factorization, type: 'factorization', pairId: pair.id });
        });

        // Shuffle the cards on the board
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
                // Match found
                setMatchedPairs(prev => [...prev, card1.pairId]);
                setScore(prev => prev + 1);
                setSelectedCards([]);

                if (matchedPairs.length + 1 === cards.length / 2) {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ['#047857', '#10b981', '#34d399']
                    });
                }
            } else {
                // No match
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
                    <div className="w-16"></div> {/* Spacer */}
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
                        <p className="text-center text-slate-500 font-medium">Számok 100-ig</p>
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
                        <p className="text-center text-slate-500 font-medium">Számok 300-ig</p>
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
                        <p className="text-center text-slate-500 font-medium">Számok 1000-ig</p>
                        <span className="mt-4 text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full">Nehéz</span>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <Button variant="ghost" onClick={() => setDifficulty(null)} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Szintválasztás
                </Button>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Binary className="w-4 h-4 text-emerald-600" />
                        Prímtényezős Párosító
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
                                    "aspect-[4/3] rounded-xl flex items-center justify-center p-4 text-xl font-bold transition-all duration-300 transform",
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
                                    <span className={cn(card.type === 'factorization' ? "font-mono text-lg" : "text-2xl")}>
                                        {card.value}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </Card>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-900 space-y-2">
                    <p className="font-bold">Hol játssz?</p>
                    <p>
                        Találd meg a párokat! Minden számnak van egy prímtényezős felbontása.
                        A nehezebb szinteken már nagyobb számokkal is találkozhatsz!
                    </p>
                </div>
            </div>
        </div>
    );
}
