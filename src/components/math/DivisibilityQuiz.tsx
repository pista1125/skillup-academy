import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import {
    CheckCircle2,
    XCircle,
    ArrowRight,
    RotateCcw,
    Trophy,
    HelpCircle,
    Sparkles,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DivisibilityProblem {
    id: string;
    number: number;
    divisor: number;
    isDivisible: boolean;
    rule: string;
}

const DIVISIBILITY_RULES: Record<number, string> = {
    2: "Páros számok oszthatók 2-vel (0, 2, 4, 6, 8-ra végződnek).",
    3: "A számjegyek összege osztható 3-mal.",
    4: "Az utolsó két számjegyből képzett szám osztható 4-gyel.",
    5: "Az utolsó számjegy 0 vagy 5.",
    6: "A szám osztható 2-vel és 3-mal is (páros és a számjegyek összege osztható 3-mal).",
    8: "Az utolsó három számjegyből képzett szám osztható 8-cal.",
    9: "A számjegyek összege osztható 9-cel.",
    10: "A szám 0-ra végződik.",
    12: "Osztható 3-mal és 4-gyel is.",
    15: "Osztható 3-mal és 5-tel is.",
    25: "Az utolsó két számjegye 00, 25, 50 vagy 75.",
};

const COMMON_DIVISORS = [2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 25];

function generateProblem(): DivisibilityProblem {
    const id = Math.random().toString(36).substring(2, 9);
    const divisor = COMMON_DIVISORS[Math.floor(Math.random() * COMMON_DIVISORS.length)];

    // Decide if we want a divisible number or not (50-50%)
    const shouldBeDivisible = Math.random() > 0.5;

    let number: number;
    if (shouldBeDivisible) {
        // Generate a multiple of the divisor
        const maxMultiplier = Math.floor(1000 / divisor);
        const multiplier = Math.floor(Math.random() * maxMultiplier) + 2;
        number = multiplier * divisor;
    } else {
        // Generate a number that is NOT a multiple
        number = Math.floor(Math.random() * 900) + 10;
        if (number % divisor === 0) {
            number += 1; // Simple way to make it non-divisible if it randomly was
        }
    }

    return {
        id,
        number,
        divisor,
        isDivisible: number % divisor === 0,
        rule: DIVISIBILITY_RULES[divisor] || "Használd az osztás szabályait!",
    };
}

export function DivisibilityQuiz() {
    const [problems, setProblems] = useState<DivisibilityProblem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 10;
    const XP_PER_CORRECT = 15;

    const startQuiz = useCallback(() => {
        const newProblems = Array.from({ length: TOTAL_QUESTIONS }, () => generateProblem());
        setProblems(newProblems);
        setCurrentIndex(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setCorrectCount(0);
        setQuizComplete(false);
        setXpEarned(0);
    }, []);

    useEffect(() => {
        startQuiz();
    }, [startQuiz]);

    const handleAnswer = (answer: boolean) => {
        if (showFeedback) return;

        setSelectedAnswer(answer);
        setShowFeedback(true);

        const isCorrect = answer === problems[currentIndex].isDivisible;
        if (isCorrect) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + XP_PER_CORRECT);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < TOTAL_QUESTIONS - 1) {
            setCurrentIndex(prev => prev + 1);
            setSelectedAnswer(null);
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
                <Card className="border-2 border-amber-100 shadow-xl overflow-hidden rounded-3xl">
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Trophy className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black mb-1">Kiváló munka!</h2>
                        <p className="text-amber-100 opacity-90">Sikeresen teljesítetted a kvízt</p>
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

                        <Button
                            onClick={startQuiz}
                            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg shadow-orange-500/20 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <RotateCcw className="w-5 h-5 mr-2" />
                            Új játék
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentProblem = problems[currentIndex];
    const isCorrect = selectedAnswer === currentProblem.isDivisible;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-amber-100 shadow-sm">
                <div className="flex gap-4 items-center flex-1 pr-8">
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
                    <div className="p-12 text-center space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-slate-500 font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-500" />
                                Osztható-e a szám?
                                <Sparkles className="w-4 h-4 text-amber-500" />
                            </h3>
                            <div className="flex items-center justify-center gap-6">
                                <div className="bg-slate-900 text-white px-8 py-6 rounded-3xl text-5xl font-black shadow-2xl shadow-slate-900/20 animate-in zoom-in duration-300">
                                    {currentProblem.number}
                                </div>
                                <div className="text-3xl font-black text-slate-300 text-center">
                                    <div className="text-xs uppercase text-slate-400 mb-1">Osztó</div>
                                    <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-600 shadow-sm">
                                        {currentProblem.divisor}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {!showFeedback ? (
                            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto pt-4">
                                <Button
                                    onClick={() => handleAnswer(true)}
                                    className="h-20 text-xl font-black bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 rounded-2xl transition-all hover:scale-105 active:scale-95"
                                >
                                    IGEN
                                </Button>
                                <Button
                                    onClick={() => handleAnswer(false)}
                                    className="h-20 text-xl font-black bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/20 rounded-2xl transition-all hover:scale-105 active:scale-95"
                                >
                                    NEM
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
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
                                                <span className="text-2xl font-black uppercase">Helyes!</span>
                                            </>
                                        ) : (
                                            <>
                                                <XCircle className="w-8 h-8 text-rose-600" />
                                                <span className="text-2xl font-black uppercase">Hoppá!</span>
                                            </>
                                        )}
                                    </div>

                                    <div className="text-center">
                                        <p className="font-bold mb-1 opacity-80">
                                            {currentProblem.number} {currentProblem.isDivisible ? "osztható" : "nem osztható"} {currentProblem.divisor}-val/vel.
                                        </p>
                                        <div className="bg-white/60 p-3 rounded-xl border border-white mt-2 max-w-md">
                                            <p className="text-sm font-medium flex items-center justify-center gap-2">
                                                <HelpCircle className="w-4 h-4 opacity-50" />
                                                {currentProblem.rule}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={nextQuestion}
                                    className="w-full h-14 text-lg font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl rounded-2xl group transition-all"
                                >
                                    {currentIndex < TOTAL_QUESTIONS - 1 ? (
                                        <>
                                            Következő feladat
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    ) : (
                                        <>
                                            Eredmények megtekintése
                                            <Zap className="w-5 h-5 ml-2 text-amber-400" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
