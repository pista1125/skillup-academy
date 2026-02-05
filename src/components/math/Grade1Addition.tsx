import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import { XPBadge } from '@/components/XPBadge';
import {
    CheckCircle2,
    XCircle,
    ArrowLeft,
    Trophy,
    Sparkles,
    Zap,
    ChevronRight,
    RotateCcw,
    Star,
    Heart,
    Apple,
    Bone,
    Cat
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Problem {
    id: string;
    a: number;
    b: number;
    answer: number;
}

const ICONS = [Star, Heart, Apple, Bone, Cat];

function generateProblem(): Problem {
    const commonSums = [
        [1, 1], [1, 2], [2, 1], [2, 2], [3, 1], [1, 3], [3, 2], [2, 3],
        [4, 1], [1, 4], [4, 2], [2, 4], [5, 1], [1, 5], [5, 2], [2, 5],
        [3, 3], [3, 4], [4, 3], [4, 4], [5, 3], [3, 5], [5, 4], [4, 5],
        [5, 5], [6, 1], [1, 6], [7, 1], [1, 7], [8, 1], [1, 8], [9, 1], [1, 9]
    ];

    const [a, b] = commonSums[Math.floor(Math.random() * commonSums.length)];
    return {
        id: Math.random().toString(36).substring(2, 9),
        a,
        b,
        answer: a + b
    };
}

export function Grade1Addition({ onBack }: { onBack: () => void }) {
    const [problems, setProblems] = useState<Problem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 10;
    const XP_PER_CORRECT = 15;

    const startQuiz = useCallback(() => {
        const newProblems = Array.from({ length: TOTAL_QUESTIONS }, generateProblem);
        setProblems(newProblems);
        setCurrentIndex(0);
        setShowFeedback(false);
        setCorrectCount(0);
        setQuizComplete(false);
        setXpEarned(0);
    }, []);

    useEffect(() => {
        startQuiz();
    }, [startQuiz]);

    const handleAnswer = (num: number) => {
        if (showFeedback) return;

        const correct = num === problems[currentIndex].answer;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            setCorrectCount(prev => prev + 1);
            setXpEarned(prev => prev + XP_PER_CORRECT);
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 },
                colors: ['#4ade80', '#fbbf24', '#f472b6']
            });
        }
    };

    const nextQuestion = () => {
        if (currentIndex < TOTAL_QUESTIONS - 1) {
            setCurrentIndex(prev => prev + 1);
            setShowFeedback(false);
        } else {
            setQuizComplete(true);
        }
    };

    if (problems.length === 0) return null;

    if (quizComplete) {
        return (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
                <Card className="border-4 border-pink-100 shadow-2xl rounded-[40px] overflow-hidden">
                    <div className="bg-gradient-to-br from-pink-400 to-rose-500 p-10 text-center text-white">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white/30">
                            <Trophy className="w-12 h-12" />
                        </div>
                        <h2 className="text-4xl font-black mb-1">Bajnok vagy!</h2>
                        <p className="text-pink-100 font-bold">Minden példát megoldottál!</p>
                    </div>
                    <CardContent className="p-10 text-center space-y-8 bg-white">
                        <div className="flex justify-center gap-4">
                            <div className="bg-pink-50 p-6 rounded-3xl border-2 border-pink-100 min-w-[120px]">
                                <span className="block text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">Helyes</span>
                                <span className="text-4xl font-black text-pink-600">{correctCount} / {TOTAL_QUESTIONS}</span>
                            </div>
                            <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100 min-w-[120px]">
                                <span className="block text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">Jutalom</span>
                                <div className="flex items-center justify-center gap-1">
                                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                                    <span className="text-4xl font-black text-amber-600">{xpEarned}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={startQuiz}
                                className="h-16 text-xl font-black bg-pink-500 hover:bg-pink-600 shadow-lg shadow-pink-500/30 rounded-3xl"
                            >
                                <RotateCcw className="w-6 h-6 mr-2" />
                                Újra játszom
                            </Button>
                            <Button variant="ghost" onClick={onBack} className="h-12 text-slate-400 font-bold rounded-2xl">
                                Vissza a menübe
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const current = problems[currentIndex];
    const Icon = ICONS[currentIndex % ICONS.length];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-sm">
                <div className="flex gap-4 items-center flex-1 pr-8">
                    <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0 hover:bg-slate-50">
                        <ArrowLeft className="w-6 h-6" />
                    </Button>
                    <ProgressBar
                        current={currentIndex + 1}
                        total={TOTAL_QUESTIONS}
                        variant="math"
                        size="lg"
                    />
                </div>
                <XPBadge xp={xpEarned} />
            </div>

            <Card className="border-4 border-slate-100 shadow-2xl rounded-[40px] overflow-hidden bg-white">
                <CardContent className="p-8 md:p-12 text-center space-y-10">
                    {/* Visual Aid */}
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-wrap justify-center items-center gap-12">
                            <div className="flex flex-col items-center gap-4">
                                <div className="grid grid-cols-3 gap-2 p-4 bg-blue-50 rounded-3xl border-2 border-blue-100 min-h-[120px] items-center justify-center">
                                    {Array.from({ length: current.a }).map((_, i) => (
                                        <Icon key={`a-${i}`} className="w-6 h-6 text-blue-500 fill-blue-500/20" />
                                    ))}
                                </div>
                                <span className="text-4xl font-black text-blue-600">{current.a}</span>
                            </div>

                            <div className="text-5xl font-black text-slate-300">＋</div>

                            <div className="flex flex-col items-center gap-4">
                                <div className="grid grid-cols-3 gap-2 p-4 bg-orange-50 rounded-3xl border-2 border-orange-100 min-h-[120px] items-center justify-center">
                                    {Array.from({ length: current.b }).map((_, i) => (
                                        <Icon key={`b-${i}`} className="w-6 h-6 text-orange-500 fill-orange-500/20" />
                                    ))}
                                </div>
                                <span className="text-4xl font-black text-orange-600">{current.b}</span>
                            </div>
                        </div>

                        <div className="w-24 h-2 bg-slate-100 rounded-full" />
                        <div className="text-6xl font-black text-slate-800">Mennyi összesen?</div>
                    </div>

                    {!showFeedback ? (
                        <div className="grid grid-cols-5 gap-3 max-w-xl mx-auto">
                            {Array.from({ length: 11 }).map((_, i) => (
                                <Button
                                    key={i}
                                    variant="outline"
                                    onClick={() => handleAnswer(i)}
                                    className="h-16 text-2xl font-black border-4 hover:border-pink-500 hover:text-pink-600 rounded-2xl transition-all hover:scale-110 active:scale-95"
                                >
                                    {i}
                                </Button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className={cn(
                                "p-8 rounded-[30px] border-4 flex flex-col items-center gap-4",
                                isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
                            )}>
                                <div className="flex items-center gap-4">
                                    {isCorrect ? (
                                        <>
                                            <Sparkles className="w-10 h-10 text-emerald-600 animate-bounce" />
                                            <span className="text-4xl font-black uppercase">Szuper!</span>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-10 h-10 text-rose-600" />
                                            <span className="text-4xl font-black uppercase">Majdnem!</span>
                                        </>
                                    )}
                                </div>
                                {!isCorrect && (
                                    <p className="text-xl font-bold">
                                        A helyes válasz: <span className="text-3xl font-black">{current.answer}</span>
                                    </p>
                                )}
                            </div>
                            <Button
                                onClick={nextQuestion}
                                className="w-full max-w-sm h-16 text-xl font-black bg-slate-900 text-white hover:bg-slate-800 shadow-xl rounded-3xl group"
                            >
                                {currentIndex < TOTAL_QUESTIONS - 1 ? (
                                    <>
                                        Jöhet a következő!
                                        <ChevronRight className="ml-2 w-7 h-7 group-hover:translate-x-1 transition-transform" />
                                    </>
                                ) : (
                                    'Lássuk az eredményt!'
                                )}
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
