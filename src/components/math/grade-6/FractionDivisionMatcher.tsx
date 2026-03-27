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
    HelpCircle
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

const FractionDisplay = ({ num, den }: { num: number, den: number }) => (
    <div className="flex flex-col items-center justify-center font-bold font-mono">
        <span className="border-b-2 border-current px-1 leading-none mb-0.5">{num}</span>
        <span className="leading-none">{den}</span>
    </div>
);

const DivisionDisplay = ({ num, den, div }: { num: number, den: number, div: number }) => (
    <div className="flex items-center gap-2 font-bold text-lg md:text-xl">
        <FractionDisplay num={num} den={den} />
        <span>÷</span>
        <span>{div}</span>
    </div>
);

// Helper to calculate GCD for simplification
function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function simplify(num: number, den: number): { n: number, d: number } {
    const g = gcd(num, den);
    return { n: num / g, d: den / g };
}

// DATA: a/b ÷ n = a/(b*n), then simplify
const PAIRS_EASY = [
    { id: 1, q: { n: 2, d: 4, div: 2 }, a: { n: 1, d: 4 } }, // 2/4 ÷ 2 = 2/8 = 1/4
    { id: 2, q: { n: 3, d: 6, div: 3 }, a: { n: 1, d: 6 } }, // 3/6 ÷ 3 = 3/18 = 1/6
    { id: 3, q: { n: 4, d: 8, div: 2 }, a: { n: 1, d: 4 } }, // 4/8 ÷ 2 = 4/16 = 1/4
    { id: 4, q: { n: 1, d: 2, div: 2 }, a: { n: 1, d: 4 } }, // 1/2 ÷ 2 = 1/4
    { id: 5, q: { n: 1, d: 3, div: 2 }, a: { n: 1, d: 6 } }, // 1/3 ÷ 2 = 1/6
    { id: 6, q: { n: 2, d: 5, div: 2 }, a: { n: 1, d: 5 } }, // 2/5 ÷ 2 = 2/10 = 1/5
    { id: 7, q: { n: 3, d: 4, div: 3 }, a: { n: 1, d: 4 } }, // 3/4 ÷ 3 = 3/12 = 1/4
    { id: 8, q: { n: 4, d: 6, div: 2 }, a: { n: 1, d: 3 } }, // 4/6 ÷ 2 = 4/12 = 1/3
    { id: 9, q: { n: 6, d: 8, div: 3 }, a: { n: 1, d: 4 } }, // 6/8 ÷ 3 = 6/24 = 1/4
    { id: 10, q: { n: 2, d: 3, div: 2 }, a: { n: 1, d: 3 } }, // 2/3 ÷ 2 = 2/6 = 1/3
    { id: 11, q: { n: 5, d: 10, div: 5 }, a: { n: 1, d: 10 } }, // 5/10 ÷ 5 = 5/50 = 1/10
    { id: 12, q: { n: 3, d: 9, div: 3 }, a: { n: 1, d: 9 } }, // 3/9 ÷ 3 = 3/27 = 1/9
];

const PAIRS_MEDIUM = [
    { id: 101, q: { n: 4, d: 5, div: 2 }, a: { n: 2, d: 5 } }, // 4/5 ÷ 2 = 4/10 = 2/5
    { id: 102, q: { n: 6, d: 7, div: 3 }, a: { n: 2, d: 7 } }, // 6/7 ÷ 3 = 6/21 = 2/7
    { id: 103, q: { n: 8, d: 9, div: 4 }, a: { n: 2, d: 9 } }, // 8/9 ÷ 4 = 8/36 = 2/9
    { id: 104, q: { n: 5, d: 6, div: 5 }, a: { n: 1, d: 6 } }, // 5/6 ÷ 5 = 5/30 = 1/6
    { id: 105, q: { n: 9, d: 10, div: 3 }, a: { n: 3, d: 10 } }, // 9/10 ÷ 3 = 9/30 = 3/10
    { id: 106, q: { n: 7, d: 8, div: 7 }, a: { n: 1, d: 8 } }, // 7/8 ÷ 7 = 7/56 = 1/8
    { id: 107, q: { n: 10, d: 12, div: 5 }, a: { n: 1, d: 6 } }, // 10/12 ÷ 5 = 10/60 = 1/6
    { id: 108, q: { n: 6, d: 10, div: 2 }, a: { n: 3, d: 10 } }, // 6/10 ÷ 2 = 6/20 = 3/10
    { id: 109, q: { n: 8, d: 12, div: 4 }, a: { n: 1, d: 6 } }, // 8/12 ÷ 4 = 8/48 = 1/6
    { id: 110, q: { n: 12, d: 15, div: 3 }, a: { n: 4, d: 15 } }, // 12/15 ÷ 3 = 12/45 = 4/15
    { id: 111, q: { n: 9, d: 12, div: 3 }, a: { n: 1, d: 4 } }, // 9/12 ÷ 3 = 9/36 = 1/4
    { id: 112, q: { n: 10, d: 15, div: 5 }, a: { n: 2, d: 15 } }, // 10/15 ÷ 5 = 10/75 = 2/15
];

const PAIRS_HARD = [
    { id: 201, q: { n: 12, d: 16, div: 4 }, a: { n: 3, d: 16 } }, // 12/16 ÷ 4 = 12/64 = 3/16
    { id: 202, q: { n: 15, d: 20, div: 5 }, a: { n: 3, d: 20 } }, // 15/20 ÷ 5 = 15/100 = 3/20
    { id: 203, q: { n: 18, d: 24, div: 6 }, a: { n: 3, d: 24 } }, // 18/24 ÷ 6 = 18/144 = 1/8
    { id: 204, q: { n: 14, d: 21, div: 7 }, a: { n: 2, d: 21 } }, // 14/21 ÷ 7 = 14/147 = 2/21
    { id: 205, q: { n: 20, d: 25, div: 4 }, a: { n: 1, d: 5 } }, // 20/25 ÷ 4 = 20/100 = 1/5
    { id: 206, q: { n: 16, d: 20, div: 8 }, a: { n: 2, d: 20 } }, // 16/20 ÷ 8 = 16/160 = 1/10
    { id: 207, q: { n: 21, d: 28, div: 7 }, a: { n: 3, d: 28 } }, // 21/28 ÷ 7 = 21/196 = 3/28
    { id: 208, q: { n: 24, d: 30, div: 6 }, a: { n: 4, d: 30 } }, // 24/30 ÷ 6 = 24/180 = 2/15
    { id: 209, q: { n: 18, d: 27, div: 9 }, a: { n: 2, d: 27 } }, // 18/27 ÷ 9 = 18/243 = 2/27
    { id: 210, q: { n: 25, d: 30, div: 5 }, a: { n: 1, d: 6 } }, // 25/30 ÷ 5 = 25/150 = 1/6
    { id: 211, q: { n: 30, d: 36, div: 6 }, a: { n: 5, d: 36 } }, // 30/36 ÷ 6 = 30/216 = 5/36
    { id: 212, q: { n: 27, d: 36, div: 9 }, a: { n: 3, d: 36 } }, // 27/36 ÷ 9 = 27/324 = 1/12
];

export function FractionDivisionMatcher({ onBack }: { onBack: () => void }) {
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
                value: <DivisionDisplay num={pair.q.n} den={pair.q.d} div={pair.q.div} />,
                type: 'question',
                pairId: pair.id
            });
            gameCards.push({
                id: Math.random(),
                value: <div className="scale-125"><FractionDisplay num={pair.a.n} den={pair.a.d} /></div>,
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
                        <p className="text-center text-slate-500 font-medium">Egyszerű osztások</p>
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
                        <p className="text-center text-slate-500 font-medium">Nagyobb nevezők</p>
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
                        <p className="text-center text-slate-500 font-medium">Egyszerűsítéssel</p>
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
                        <Percent className="w-4 h-4 text-emerald-600" />
                        Tört Osztó Párkereső
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

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
                <HelpCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-900 space-y-2">
                    <p className="font-bold">Emlékeztető:</p>
                    <p>
                        Törtet egész számmal úgy osztunk, hogy a nevezőt megszorozzuk az egész számmal, a számláló pedig változatlan marad.
                        A Mester szinten egyszerűsítened is kell a végeredményt!
                    </p>
                </div>
            </div>
        </div>
    );
}
