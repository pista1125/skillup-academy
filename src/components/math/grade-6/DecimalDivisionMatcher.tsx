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

const DivisionDisplay = ({ val, div }: { val: number, div: number }) => (
    <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
        <span>{val.toString().replace('.', ',')}</span>
        <span>÷</span>
        <span>{div}</span>
    </div>
);

const AnswerDisplay = ({ val }: { val: number }) => (
    <div className="font-bold text-2xl">
        {val.toString().replace('.', ',')}
    </div>
);

// DATA Definitions
const PAIRS_EASY = [
    { id: 1, val: 5, div: 10, res: 0.5 },
    { id: 2, val: 12, div: 10, res: 1.2 },
    { id: 3, val: 0.8, div: 10, res: 0.08 },
    { id: 4, val: 45, div: 100, res: 0.45 },
    { id: 5, val: 720, div: 100, res: 7.2 },
    { id: 6, val: 0.3, div: 100, res: 0.003 },
    { id: 7, val: 125, div: 1000, res: 0.125 },
    { id: 8, val: 8500, div: 1000, res: 8.5 },
    { id: 9, val: 40, div: 1000, res: 0.04 },
    { id: 10, val: 21.5, div: 10, res: 2.15 },
    { id: 11, val: 60, div: 100, res: 0.6 },
    { id: 12, val: 1234, div: 1000, res: 1.234 },
];

const PAIRS_MEDIUM = [
    { id: 101, val: 1, div: 2, res: 0.5 },
    { id: 102, val: 1.5, div: 3, res: 0.5 },
    { id: 103, val: 0.8, div: 4, res: 0.2 },
    { id: 104, val: 3, div: 2, res: 1.5 },
    { id: 105, val: 0.36, div: 3, res: 0.12 },
    { id: 106, val: 1, div: 4, res: 0.25 },
    { id: 107, val: 5.5, div: 5, res: 1.1 },
    { id: 108, val: 0.16, div: 2, res: 0.08 },
    { id: 109, val: 6.6, div: 3, res: 2.2 },
    { id: 110, val: 0.3, div: 2, res: 0.15 },
    { id: 111, val: 2, div: 5, res: 0.4 },
    { id: 112, val: 2.5, div: 2, res: 1.25 },
];

const PAIRS_HARD = [
    { id: 201, val: 1.44, div: 12, res: 0.12 },
    { id: 202, val: 2, div: 8, res: 0.25 },
    { id: 203, val: 9, div: 6, res: 1.5 },
    { id: 204, val: 1.05, div: 15, res: 0.07 },
    { id: 205, val: 10, div: 4, res: 2.5 },
    { id: 206, val: 1, div: 8, res: 0.125 },
    { id: 207, val: 1.65, div: 11, res: 0.15 },
    { id: 208, val: 1.25, div: 25, res: 0.05 },
    { id: 209, val: 16, div: 5, res: 3.2 },
    { id: 210, val: 1.35, div: 3, res: 0.45 },
    { id: 211, val: 24, div: 20, res: 1.2 },
    { id: 212, val: 0.5, div: 100, res: 0.005 },
];

export function DecimalDivisionMatcher({ difficulty, onBack }: { difficulty: Difficulty, onBack: () => void }) {
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
                value: <DivisionDisplay val={pair.val} div={pair.div} />,
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
                        colors: ['#e11d48', '#10b981', '#f59e0b']
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
                        <Calculator className="w-4 h-4 text-rose-600" />
                        Tizedes osztás párkereső
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

            <div className="bg-rose-50 p-6 rounded-2xl border border-rose-100 flex gap-4">
                <HelpCircle className="w-6 h-6 text-rose-600 flex-shrink-0" />
                <div className="text-sm text-rose-900 space-y-2">
                    <p className="font-bold">Hogyan játssz?</p>
                    <p>
                        Párosítsd össze az osztási feladatokat a helyes végeredményekkel!
                        {difficulty === 'easy' && ' Figyelj a tizedesvessző eltolódására!'}
                    </p>
                </div>
            </div>
        </div>
    );
}
