import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    Trophy,
    Percent,
    Star,
    Medal,
    Crown,
    HelpCircle,
    Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Pair {
    id: number;
    value: React.ReactNode;
    type: 'question' | 'answer';
    pairId: number;
}

type Difficulty = 'easy' | 'medium' | 'hard';

const MultiplicationDisplay = ({ val, mult }: { val: number, mult: number }) => (
    <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
        <span>{val.toString().replace('.', ',')}</span>
        <span>×</span>
        <span>{mult}</span>
    </div>
);

const AnswerDisplay = ({ val }: { val: number }) => (
    <div className="font-bold text-2xl">
        {val.toString().replace('.', ',')}
    </div>
);

// DATA Definitions
const PAIRS_EASY = [
    { id: 1, val: 0.5, mult: 10, res: 5 },
    { id: 2, val: 1.2, mult: 10, res: 12 },
    { id: 3, val: 0.08, mult: 10, res: 0.8 },
    { id: 4, val: 0.45, mult: 100, res: 45 },
    { id: 5, val: 7.2, mult: 100, res: 720 },
    { id: 6, val: 0.003, mult: 100, res: 0.3 },
    { id: 7, val: 0.125, mult: 1000, res: 125 },
    { id: 8, val: 8.5, mult: 1000, res: 8500 },
    { id: 9, val: 0.04, mult: 1000, res: 40 },
    { id: 10, val: 2.15, mult: 10, res: 21.5 },
    { id: 11, val: 0.6, mult: 100, res: 60 },
    { id: 12, val: 1.234, mult: 1000, res: 1234 },
];

const PAIRS_MEDIUM = [
    { id: 101, val: 0.5, mult: 2, res: 1 },
    { id: 102, val: 0.5, mult: 3, res: 1.5 },
    { id: 103, val: 0.2, mult: 4, res: 0.8 },
    { id: 104, val: 1.5, mult: 2, res: 3 },
    { id: 105, val: 0.12, mult: 3, res: 0.36 },
    { id: 106, val: 0.25, mult: 4, res: 1 },
    { id: 107, val: 1.1, mult: 5, res: 5.5 },
    { id: 108, val: 0.08, mult: 2, res: 0.16 },
    { id: 109, val: 2.2, mult: 3, res: 6.6 },
    { id: 110, val: 0.15, mult: 2, res: 0.3 },
    { id: 111, val: 0.4, mult: 5, res: 2 },
    { id: 112, val: 1.25, mult: 2, res: 2.5 },
];

const PAIRS_HARD = [
    { id: 201, val: 0.12, mult: 12, res: 1.44 },
    { id: 202, val: 0.25, mult: 8, res: 2 },
    { id: 203, val: 1.5, mult: 6, res: 9 },
    { id: 204, val: 0.07, mult: 15, res: 1.05 },
    { id: 205, val: 2.5, mult: 4, res: 10 },
    { id: 206, val: 0.125, mult: 8, res: 1 },
    { id: 207, val: 0.15, mult: 11, res: 1.65 },
    { id: 208, val: 0.05, mult: 25, res: 1.25 },
    { id: 209, val: 3.2, mult: 5, res: 16 },
    { id: 210, val: 0.45, mult: 3, res: 1.35 },
    { id: 211, val: 1.2, mult: 20, res: 24 },
    { id: 212, val: 0.005, mult: 100, res: 0.5 },
];

export function DecimalMultiplicationMatcher({ difficulty, onBack }: { difficulty: Difficulty, onBack: () => void }) {
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
                value: <MultiplicationDisplay val={pair.val} mult={pair.mult} />,
                type: 'question',
                pairId: pair.id
            });
            gameCards.push({
                id: Math.random(),
                value: <AnswerDisplay val={pair.res} />,
                type: 'answer',
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
        initializeGame();
    }, [initializeGame]);

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
                        colors: ['#8b5cf6', '#10b981', '#f59e0b']
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

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between px-2">
                <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Vissza
                </Button>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-violet-600" />
                        Tizedes szorzás párkereső
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
                                    "aspect-[4/3] rounded-xl flex items-center justify-center p-2 transition-all duration-300 transform",
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

            <div className="bg-violet-50 p-6 rounded-2xl border border-violet-100 flex gap-4">
                <HelpCircle className="w-6 h-6 text-violet-600 flex-shrink-0" />
                <div className="text-sm text-violet-900 space-y-2">
                    <p className="font-bold">Hogyan játssz?</p>
                    <p>
                        Párosítsd össze a szorzási feladatokat a helyes végeredményekkel!
                        {difficulty === 'easy' && ' Figyelj a tizedesvessző eltolódására!'}
                    </p>
                </div>
            </div>
        </div>
    );
}
