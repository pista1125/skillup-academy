import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LCMQuestion {
    id: string;
    question: string;
    options: number[];
    correctAnswer: number;
    explanation: string;
    type: 'simple' | 'prime' | 'power' | 'word';
}

// Helper: Greatest Common Divisor
function gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Helper: Least Common Multiple
function lcm(a: number, b: number): number {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

// Generate the 8 fixed questions for LKKT quiz
function generateQuestions(): LCMQuestion[] {
    return [
        // 1. Egyszerű LKKT számítás
        {
            id: '1',
            question: 'Mennyi a 12 és 18 legkisebb közös többszöröse?',
            options: shuffleOptions([36, 18, 72, 54]),
            correctAnswer: 36,
            explanation: '12 = 2² × 3, 18 = 2 × 3². Az LKKT = 2² × 3² = 4 × 9 = 36',
            type: 'simple'
        },
        // 2. Egyszerű LKKT számítás
        {
            id: '2',
            question: 'Határozd meg a 15 és 20 legkisebb közös többszörösét!',
            options: shuffleOptions([60, 30, 45, 120]),
            correctAnswer: 60,
            explanation: '15 = 3 × 5, 20 = 2² × 5. Az LKKT = 2² × 3 × 5 = 60',
            type: 'simple'
        },
        // 3. Prímtényezős módszer
        {
            id: '3',
            question: 'A 12 = 2² × 3 és a 15 = 3 × 5 prímtényezős felbontása alapján mennyi az LKKT-jük?',
            options: shuffleOptions([60, 30, 45, 180]),
            correctAnswer: 60,
            explanation: 'LKKT = 2² × 3¹ × 5¹ = 4 × 3 × 5 = 60 (minden előforduló prímtényező a legnagyobb kitevőn)',
            type: 'prime'
        },
        // 4. Prímtényezős módszer
        {
            id: '4',
            question: 'Ha a = 2² × 3 × 7 és b = 2 × 3² × 5, akkor mennyi az LKKT(a, b)?',
            options: shuffleOptions([1260, 630, 420, 2520]),
            correctAnswer: 1260,
            explanation: 'Az összes prímtényező: 2, 3, 5, 7. LKKT = 2² × 3² × 5¹ × 7¹ = 4 × 9 × 5 × 7 = 1260',
            type: 'prime'
        },
        // 5. Szöveges feladat
        {
            id: '5',
            question: 'Két autóbusz ugyanarról a megállóról indul: az egyik 15 percenként, a másik 20 percenként. Hány perc múlva indulnak ismét egyszerre?',
            options: shuffleOptions([60, 30, 40, 120]),
            correctAnswer: 60,
            explanation: 'Az LKKT(15, 20) = 60, tehát 60 perc (1 óra) múlva indulnak újra egyszerre.',
            type: 'word'
        },
        // 6. Szöveges feladat
        {
            id: '6',
            question: 'Egy kisiskolában az A harang 8 percenként, a B harang pedig 12 percenként szólal meg. Ha most egyszerre szóltak, hány perc múlva fognak legközelebb újra egyszerre szólni?',
            options: shuffleOptions([24, 12, 48, 36]),
            correctAnswer: 24,
            explanation: 'Az LKKT(8, 12) = 24, tehát 24 perc múlva szólnak ismét egyszerre.',
            type: 'word'
        },
        // 7. Hatványalakból meghatározás
        {
            id: '7',
            question: 'Adott: 180 = 2² × 3² × 5 és 270 = 2 × 3³ × 5. Mennyi az LKKT-jük?',
            options: shuffleOptions([540, 1080, 270, 90]),
            correctAnswer: 540,
            explanation: 'LKKT = 2² × 3³ × 5¹ = 4 × 27 × 5 = 540',
            type: 'power'
        },
        // 8. Hatványalakból meghatározás
        {
            id: '8',
            question: 'Ha x = 2³ × 5² × 7 és y = 2² × 5 × 7², akkor LKKT(x, y) = ?',
            options: shuffleOptions([9800, 4900, 1400, 2800]),
            correctAnswer: 9800,
            explanation: 'LKKT = 2³ × 5² × 7² = 8 × 25 × 49 = 200 × 49 = 9800',
            type: 'power'
        }
    ];
}

function shuffleOptions(options: number[]): number[] {
    return [...options].sort(() => Math.random() - 0.5);
}

interface LCMQuizProps {
    onBack?: () => void;
}

export function LCMQuiz({ onBack }: LCMQuizProps) {
    const [questions, setQuestions] = useState<LCMQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 8;
    const XP_PER_CORRECT = 20;

    const startQuiz = useCallback(() => {
        const newQuestions = generateQuestions();
        setQuestions(newQuestions);
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

    const handleAnswer = (answer: number) => {
        if (showFeedback) return;

        setSelectedAnswer(answer);
        setShowFeedback(true);

        const isCorrect = answer === questions[currentIndex].correctAnswer;
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

    if (questions.length === 0) return null;

    if (quizComplete) {
        const percentage = Math.round((correctCount / TOTAL_QUESTIONS) * 100);

        return (
            <div className="max-w-md mx-auto animate-in fade-in zoom-in duration-500">
                <Card className="border-2 border-indigo-100 shadow-xl overflow-hidden rounded-3xl">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Trophy className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black mb-1">
                            {percentage >= 80 ? 'Kiváló!' : percentage >= 60 ? 'Szép munka!' : 'Gyakorolj tovább!'}
                        </h2>
                        <p className="text-indigo-100 opacity-90">LKKT kvíz befejezve</p>
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
                            {onBack && (
                                <Button variant="outline" onClick={onBack} className="flex-1 rounded-2xl h-12">
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Vissza
                                </Button>
                            )}
                            <Button
                                onClick={startQuiz}
                                className="flex-1 h-12 text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/20 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <RotateCcw className="w-5 h-5 mr-2" />
                                Új játék
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    // Get type label
    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'simple': return 'Egyszerű LKKT számítás';
            case 'prime': return 'Prímtényezős módszer';
            case 'power': return 'Hatványalakból meghatározás';
            case 'word': return 'Szöveges feladat';
            default: return 'LKKT feladat';
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-indigo-100 shadow-sm">
                <div className="flex gap-4 items-center flex-1 pr-8">
                    {onBack && (
                        <Button variant="ghost" size="icon" onClick={onBack} className="shrink-0">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    )}
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
                    <div className="p-8 md:p-12 text-center space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-sm font-bold">
                                <Sparkles className="w-4 h-4" />
                                {getTypeLabel(currentQuestion.type)}
                            </div>

                            <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-relaxed px-4">
                                {currentQuestion.question}
                            </h3>
                        </div>

                        {!showFeedback ? (
                            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-4">
                                {currentQuestion.options.map((option, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        className="h-16 text-xl font-black bg-slate-100 hover:bg-indigo-500 text-slate-800 hover:text-white border-2 border-slate-200 hover:border-indigo-500 shadow-sm rounded-2xl transition-all hover:scale-105 active:scale-95"
                                    >
                                        {option}
                                    </Button>
                                ))}
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
                                        {!isCorrect && (
                                            <p className="font-bold mb-2">
                                                A helyes válasz: <span className="text-lg">{currentQuestion.correctAnswer}</span>
                                            </p>
                                        )}
                                        <div className="bg-white/60 p-3 rounded-xl border border-white mt-2 max-w-md">
                                            <p className="text-sm font-medium flex items-center justify-center gap-2">
                                                <HelpCircle className="w-4 h-4 opacity-50" />
                                                {currentQuestion.explanation}
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
