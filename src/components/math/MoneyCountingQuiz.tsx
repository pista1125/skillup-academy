import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import {
    CheckCircle2,
    XCircle,
    ArrowRight,
    RotateCcw,
    Trophy,
    Sparkles,
    Zap,
    Coins,
    ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

type CoinValue = 1 | 2 | 5 | 10 | 20 | 50 | 100 | 200;

interface Coin {
    id: string;
    value: CoinValue;
    x: number;
    y: number;
}

interface MoneyProblem {
    id: string;
    coins: Coin[];
    totalValue: number;
}

const COIN_CONFIG: Record<CoinValue, { color: string; textColor: string; size: string; label: string }> = {
    200: { label: '200', color: 'bg-yellow-100 border-yellow-400', textColor: 'text-yellow-800', size: 'w-16 h-16' },
    100: { label: '100', color: 'bg-slate-200 border-slate-400', textColor: 'text-slate-700', size: 'w-14 h-14' },
    50: { label: '50', color: 'bg-slate-300 border-slate-500', textColor: 'text-slate-800', size: 'w-14 h-14' },
    20: { label: '20', color: 'bg-amber-100 border-amber-400', textColor: 'text-amber-800', size: 'w-12 h-12' },
    10: { label: '10', color: 'bg-amber-200 border-amber-500', textColor: 'text-amber-900', size: 'w-12 h-12' },
    5: { label: '5', color: 'bg-yellow-200 border-yellow-500', textColor: 'text-yellow-900', size: 'w-12 h-12' },
    2: { label: '2', color: 'bg-slate-100 border-slate-300', textColor: 'text-slate-600', size: 'w-10 h-10' },
    1: { label: '1', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', size: 'w-10 h-10' },
};

const COIN_VALUES: CoinValue[] = [200, 100, 50, 20, 10, 5, 2, 1];

export type Difficulty = 'easy' | 'medium' | 'hard';

function generateProblem(difficulty: Difficulty): MoneyProblem {
    const id = Math.random().toString(36).substring(2, 9);
    let targetValue = 0;
    const coins: Coin[] = [];

    if (difficulty === 'easy') {
        // Easy: 10-200 Ft, few coins, standard breakdown
        targetValue = (Math.floor(Math.random() * 20) + 1) * 10;
        if (targetValue % 10 === 0) targetValue += (Math.random() > 0.5 ? 2 : 0);
    } else if (difficulty === 'medium') {
        // Medium: 20-500 Ft
        targetValue = (Math.floor(Math.random() * 48) + 2) * 10 + (Math.floor(Math.random() * 9));
    } else {
        // Hard: 50-1000 Ft
        targetValue = Math.floor(Math.random() * 950) + 50;
    }

    let remaining = targetValue;

    const COIN_CHANCES: Record<Difficulty, (v: CoinValue) => boolean> = {
        easy: () => Math.random() > 0.2, // Usually takes the largest possible
        medium: () => Math.random() > 0.4, // Sometimes skips to force smaller coins
        hard: (v) => v >= 50 ? Math.random() > 0.6 : Math.random() > 0.3 // Frequently skips large coins to force regrouping
    };

    COIN_VALUES.forEach(v => {
        while (remaining >= v) {
            // Special rule for regrouping: if we skip a coin, we MUST be able to fulfill it with smaller coins
            if (v > 1 && !COIN_CHANCES[difficulty](v)) {
                break; // Skip this denomination and move to smaller ones
            }
            coins.push({ id: Math.random().toString(36).substr(2, 9), value: v, x: 0, y: 0 });
            remaining -= v;
        }
    });

    // Final cleanup to ensure we reach exactly targetValue
    COIN_VALUES.forEach(v => {
        while (remaining >= v) {
            coins.push({ id: Math.random().toString(36).substr(2, 9), value: v, x: 0, y: 0 });
            remaining -= v;
        }
    });

    // Limit coin count for performance/visuals
    if (coins.length > 20) {
        return generateProblem('easy');
    }

    // Randomize layout in a cluster
    const centerX = 50;
    const centerY = 50;
    coins.forEach((c) => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 5 + Math.random() * 40;
        c.x = centerX + Math.cos(angle) * dist;
        c.y = centerY + Math.sin(angle) * dist;
    });

    return { id, coins, totalValue: targetValue };
}

interface MoneyCountingQuizProps {
    difficulty: Difficulty;
    onBack: () => void;
}

export function MoneyCountingQuiz({ difficulty, onBack }: MoneyCountingQuizProps) {
    const [problems, setProblems] = useState<MoneyProblem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const TOTAL_QUESTIONS = 10;
    const XP_PER_CORRECT = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;

    const startQuiz = useCallback(() => {
        const newProblems = Array.from({ length: TOTAL_QUESTIONS }, () => generateProblem(difficulty));
        setProblems(newProblems);
        setCurrentIndex(0);
        setUserAnswer('');
        setShowFeedback(false);
        setCorrectCount(0);
        setQuizComplete(false);
        setXpEarned(0);
    }, [difficulty]);

    useEffect(() => {
        startQuiz();
    }, [startQuiz]);

    useEffect(() => {
        if (!showFeedback && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showFeedback, currentIndex]);

    const handleCheck = () => {
        if (showFeedback || userAnswer === '') return;

        const isCorrect = parseInt(userAnswer) === problems[currentIndex].totalValue;
        setShowFeedback(true);

        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + XP_PER_CORRECT);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < TOTAL_QUESTIONS - 1) {
            setCurrentIndex(prev => prev + 1);
            setUserAnswer('');
            setShowFeedback(false);
        } else {
            setQuizComplete(true);
        }
    };

    if (problems.length === 0) return null;

    if (quizComplete) {
        const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

        return (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
                <Card className="border-2 border-emerald-100 shadow-xl overflow-hidden rounded-3xl">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Trophy className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black mb-1">Pénzügyi Zseni!</h2>
                        <p className="text-emerald-100 opacity-90">Sikeresen teljesítetted a pénzszámolást!</p>
                    </div>
                    <CardContent className="p-8 space-y-8 bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pontosság</span>
                                <span className="text-3xl font-black text-slate-800">{percentage}%</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Helyes válasz</span>
                                <span className="text-3xl font-black text-slate-800">{correctCount}/{TOTAL_QUESTIONS}</span>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <XPBadge xp={xpEarned} />
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={startQuiz}
                                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/20 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <RotateCcw className="w-5 h-5 mr-2" />
                                Új játék ezen a szinten
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onBack}
                                className="w-full h-12 rounded-2xl font-bold border-2"
                            >
                                Szintválasztó
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentProblem = problems[currentIndex];
    const isCorrect = parseInt(userAnswer) === currentProblem.totalValue;

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-emerald-100 shadow-sm">
                <Button variant="ghost" onClick={onBack} className="hover:bg-white/50 rounded-xl">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Vissza
                </Button>
                <div className="flex gap-4 items-center flex-1 px-8">
                    <div className="text-xs font-black text-slate-400 whitespace-nowrap uppercase tracking-widest">
                        {currentIndex + 1} / {TOTAL_QUESTIONS}
                    </div>
                    <div className="flex-1">
                        <ProgressBar
                            current={currentIndex + 1}
                            total={TOTAL_QUESTIONS}
                            variant="math"
                            size="md"
                        />
                    </div>
                </div>
                <XPBadge xp={xpEarned} />
            </div>

            <Card className="border-2 border-slate-100 shadow-xl rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Workspace area */}
                        <div className="h-[400px] bg-slate-50 border-r border-slate-100 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            {currentProblem.coins.map(coin => {
                                const config = COIN_CONFIG[coin.value];
                                return (
                                    <div
                                        key={coin.id}
                                        className={cn(
                                            "absolute rounded-full flex items-center justify-center font-bold shadow-md select-none border-2 transition-all duration-500 ease-out",
                                            config.color,
                                            config.textColor,
                                            config.size,
                                            showFeedback && isCorrect ? "scale-110 shadow-emerald-200" : ""
                                        )}
                                        style={{
                                            left: `${coin.x}%`,
                                            top: `${coin.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                        }}
                                    >
                                        {coin.value}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input area */}
                        <div className="p-12 flex flex-col items-center justify-center space-y-8 bg-white">
                            <div className="space-y-4 text-center">
                                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                    <Coins className="w-4 h-4 text-emerald-500" />
                                    Mennyi pénz van a képen?
                                    <Coins className="w-4 h-4 text-emerald-500" />
                                </h3>
                                <div className="text-slate-400 text-xs font-medium">Írd be az összeget forintban!</div>
                            </div>

                            {!showFeedback ? (
                                <div className="w-full max-w-xs space-y-4">
                                    <div className="relative">
                                        <Input
                                            ref={inputRef}
                                            type="number"
                                            value={userAnswer}
                                            onChange={(e) => setUserAnswer(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
                                            className="h-20 text-4xl font-black text-center border-3 border-indigo-100 rounded-[28px] focus-visible:ring-emerald-500 focus-visible:border-emerald-500 shadow-inner bg-slate-50/50"
                                            placeholder="..."
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">Ft</div>
                                    </div>
                                    <Button
                                        onClick={handleCheck}
                                        disabled={userAnswer === ''}
                                        className="w-full h-16 text-xl font-black bg-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] group"
                                    >
                                        ELLENŐRZÉS
                                        <Zap className="w-5 h-5 ml-2 fill-current group-hover:animate-pulse" />
                                    </Button>
                                </div>
                            ) : (
                                <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className={cn(
                                        "p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all",
                                        isCorrect
                                            ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                                            : "bg-rose-50 border-rose-100 text-rose-800"
                                    )}>
                                        <div className="flex items-center gap-3">
                                            {isCorrect ? (
                                                <>
                                                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                                    <span className="text-2xl font-black uppercase tracking-tight">Helyes!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <XCircle className="w-8 h-8 text-rose-600" />
                                                    <span className="text-2xl font-black uppercase tracking-tight">Hoppá!</span>
                                                </>
                                            )}
                                        </div>

                                        <div className="text-center">
                                            <p className="font-bold text-lg">
                                                Az összeg: <span className="text-2xl underline decoration-4 underline-offset-4">{currentProblem.totalValue} Ft</span> volt.
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        onClick={nextQuestion}
                                        className="w-full h-16 text-xl font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl rounded-2xl group transition-all"
                                    >
                                        {currentIndex < TOTAL_QUESTIONS - 1 ? (
                                            <>
                                                Következő feladat
                                                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        ) : (
                                            <>
                                                Eredmények megtekintése
                                                <Sparkles className="w-6 h-6 ml-2 text-amber-400" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
