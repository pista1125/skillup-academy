import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import {
    CheckCircle2,
    XCircle,
    ArrowRight,
    ArrowLeft,
    RotateCcw,
    Trophy,
    HelpCircle,
    Sparkles,
    Zap,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Fraction {
    num: number;
    den: number;
}

interface FractionProblem {
    id: string;
    f1: Fraction;
    f2: Fraction;
    operation: '+' | '-';
    result: Fraction;
    difficulty: 'same' | 'different';
}

function gcd(a: number, b: number): number {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a: number, b: number): number {
    return (a * b) / gcd(a, b);
}

function simplify(f: Fraction): Fraction {
    const common = gcd(f.num, f.den);
    return { num: f.num / common, den: f.den / common };
}

function generateProblem(difficulty: 'same' | 'different'): FractionProblem {
    const id = Math.random().toString(36).substring(2, 9);
    const operation = Math.random() > 0.5 ? '+' : '-';

    let f1: Fraction, f2: Fraction, result: Fraction;

    if (difficulty === 'same') {
        const den = [2, 3, 4, 5, 6, 8, 10, 12][Math.floor(Math.random() * 8)];
        f1 = { num: Math.floor(Math.random() * (den - 1)) + 1, den };

        if (operation === '+') {
            f2 = { num: Math.floor(Math.random() * (den - f1.num)) + 1, den };
            result = { num: f1.num + f2.num, den };
        } else {
            f2 = { num: Math.floor(Math.random() * f1.num) + 1, den };
            result = { num: f1.num - f2.num, den };
        }
    } else {
        // Different denominators
        const dens = [2, 3, 4, 5, 6, 8, 10, 12];
        const den1 = dens[Math.floor(Math.random() * dens.length)];
        let den2 = dens[Math.floor(Math.random() * dens.length)];
        while (den1 === den2) {
            den2 = dens[Math.floor(Math.random() * dens.length)];
        }

        f1 = { num: Math.floor(Math.random() * (den1 - 1)) + 1, den: den1 };

        const commonDen = lcm(den1, den2);
        const m1 = commonDen / den1;
        const m2 = commonDen / den2;

        if (operation === '+') {
            // Keep result <= 1 for simplicity in 5th grade
            const maxNum2 = Math.floor((commonDen - (f1.num * m1)) / m2);
            const num2 = Math.max(1, Math.floor(Math.random() * maxNum2) + 1);
            f2 = { num: num2, den: den2 };
            result = { num: (f1.num * m1) + (f2.num * m2), den: commonDen };
        } else {
            // Ensure f1 > f2
            const maxNum2 = Math.floor((f1.num * m1) / m2);
            const num2 = Math.max(1, Math.floor(Math.random() * (maxNum2 - 1)) + 1);
            f2 = { num: num2, den: den2 };
            result = { num: (f1.num * m1) - (f2.num * m2), den: commonDen };
        }
    }

    return { id, f1, f2, operation, result, difficulty };
}

interface FractionsQuizProps {
    difficulty: 'same' | 'different';
    onBack: () => void;
}

export function FractionsQuiz({ difficulty, onBack }: FractionsQuizProps) {
    const [problems, setProblems] = useState<FractionProblem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userNum, setUserNum] = useState('');
    const [userDen, setUserDen] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 10;
    const XP_PER_CORRECT = difficulty === 'same' ? 10 : 20;

    const startQuiz = useCallback(() => {
        const newProblems = Array.from({ length: TOTAL_QUESTIONS }, () => generateProblem(difficulty));
        setProblems(newProblems);
        setCurrentIndex(0);
        setUserNum('');
        setUserDen('');
        setShowFeedback(false);
        setCorrectCount(0);
        setQuizComplete(false);
        setXpEarned(0);
    }, [difficulty]);

    useEffect(() => {
        startQuiz();
    }, [startQuiz]);

    const checkAnswer = () => {
        if (showFeedback) return;

        const num = parseInt(userNum);
        const den = parseInt(userDen);

        if (isNaN(num) || isNaN(den) || den === 0) {
            toast.error('Kérlek adj meg érvényes számokat!');
            return;
        }

        const current = problems[currentIndex];
        // Check if equivalent to result
        const isCorrect = num * current.result.den === den * current.result.num;

        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + XP_PER_CORRECT);
        }

        setShowFeedback(true);
    };

    const nextQuestion = () => {
        if (currentIndex < TOTAL_QUESTIONS - 1) {
            setCurrentIndex(prev => prev + 1);
            setUserNum('');
            setUserDen('');
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
                <Card className="border-2 border-orange-100 shadow-xl overflow-hidden rounded-3xl">
                    <div className="bg-gradient-to-br from-orange-500 to-amber-600 p-8 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Trophy className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black mb-1">Szép munka!</h2>
                        <p className="text-orange-100 opacity-90">Sikeresen teljesítetted a törtek kvízt</p>
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
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={onBack} className="flex-1 rounded-2xl h-12">
                                Vissza a menübe
                            </Button>
                            <Button
                                onClick={startQuiz}
                                className="flex-1 h-12 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg shadow-orange-500/20 rounded-2xl"
                            >
                                Új játék
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const current = problems[currentIndex];
    const isCorrect = parseInt(userNum) * current.result.den === parseInt(userDen) * current.result.num;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-orange-100 shadow-sm">
                <div className="flex gap-4 items-center flex-1 pr-8">
                    <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
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
                <CardContent className="p-12 text-center space-y-8">
                    <div className="space-y-4">
                        <h3 className="text-slate-500 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                            {current.difficulty === 'same' ? 'Egyenlő nevezőjű törtek' : 'Különböző nevezőjű törtek'}
                        </h3>

                        <div className="flex items-center justify-center gap-6 text-4xl font-black text-slate-800">
                            <FractionDisplay f={current.f1} />
                            <span className="text-orange-500">{current.operation}</span>
                            <FractionDisplay f={current.f2} />
                            <span className="text-slate-300">=</span>

                            <div className="flex flex-col items-center gap-2">
                                <Input
                                    type="number"
                                    value={userNum}
                                    onChange={e => setUserNum(e.target.value)}
                                    disabled={showFeedback}
                                    className="w-16 h-16 text-center text-2xl font-black border-2 focus:border-orange-500 rounded-xl"
                                    placeholder="?"
                                />
                                <div className="w-16 h-1 bg-slate-800 rounded-full" />
                                <Input
                                    type="number"
                                    value={userDen}
                                    onChange={e => setUserDen(e.target.value)}
                                    disabled={showFeedback}
                                    className="w-16 h-16 text-center text-2xl font-black border-2 focus:border-orange-500 rounded-xl"
                                    placeholder="?"
                                />
                            </div>
                        </div>
                    </div>

                    {!showFeedback ? (
                        <Button
                            onClick={checkAnswer}
                            disabled={!userNum || !userDen}
                            className="w-full max-w-xs h-14 text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg shadow-orange-500/20 rounded-2xl"
                        >
                            Ellenőrzés
                        </Button>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className={cn(
                                "p-6 rounded-3xl border-2 flex flex-col items-center gap-3",
                                isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
                            )}>
                                <div className="flex items-center gap-3">
                                    {isCorrect ? (
                                        <>
                                            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                                            <span className="text-2xl font-black uppercase">Helyes!</span>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-8 h-8 text-rose-600" />
                                            <span className="text-2xl font-black uppercase">Hoppá!</span>
                                        </>
                                    )}
                                </div>
                                {!isCorrect && (
                                    <p className="font-bold">
                                        A helyes válasz: <span className="text-lg">{current.result.num}/{current.result.den}</span>
                                        {current.difficulty === 'different' && (
                                            <span className="block text-xs mt-1 text-rose-600 opacity-80">
                                                Használd a közös nevezőt: {lcm(current.f1.den, current.f2.den)}
                                            </span>
                                        )}
                                    </p>
                                )}
                            </div>
                            <Button
                                onClick={nextQuestion}
                                className="w-full h-14 text-lg font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl rounded-2xl group"
                            >
                                {currentIndex < TOTAL_QUESTIONS - 1 ? (
                                    <>
                                        Következő feladat
                                        <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                ) : (
                                    'Eredmények megtekintése'
                                )}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function FractionDisplay({ f }: { f: Fraction }) {
    return (
        <div className="flex flex-col items-center">
            <div className="pb-1">{f.num}</div>
            <div className="w-10 h-1 bg-slate-800 rounded-full" />
            <div className="pt-1">{f.den}</div>
        </div>
    );
}
