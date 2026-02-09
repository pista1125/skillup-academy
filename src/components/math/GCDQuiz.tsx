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

interface GCDQuestion {
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

// Helper: Generate wrong answers close to correct
function generateWrongAnswers(correct: number, count: number): number[] {
    const wrongs: Set<number> = new Set();
    const variations = [
        correct + 1,
        correct - 1,
        correct * 2,
        Math.floor(correct / 2),
        correct + 2,
        correct - 2,
        correct + 3,
        correct * 3,
        Math.floor(correct / 3),
        correct + 5,
        correct - 5,
    ].filter(n => n > 0 && n !== correct);
    
    // Shuffle and pick
    const shuffled = variations.sort(() => Math.random() - 0.5);
    for (const v of shuffled) {
        if (wrongs.size >= count) break;
        wrongs.add(v);
    }
    
    // If not enough, add random numbers
    while (wrongs.size < count) {
        const rand = Math.floor(Math.random() * (correct * 3)) + 1;
        if (rand !== correct && !wrongs.has(rand)) {
            wrongs.add(rand);
        }
    }
    
    return Array.from(wrongs).slice(0, count);
}

// Generate the 8 fixed questions for LKÖ quiz
function generateQuestions(): GCDQuestion[] {
    return [
        // 1. Egyszerű LKÖ számítás
        {
            id: '1',
            question: 'Mennyi a 24 és 36 legnagyobb közös osztója?',
            options: shuffleOptions([12, 6, 4, 8]),
            correctAnswer: 12,
            explanation: '24 = 2³ × 3, 36 = 2² × 3². Az LKÖ = 2² × 3 = 12',
            type: 'simple'
        },
        // 2. Egyszerű LKÖ számítás
        {
            id: '2',
            question: 'Határozd meg a 48 és 60 legnagyobb közös osztóját!',
            options: shuffleOptions([12, 6, 24, 4]),
            correctAnswer: 12,
            explanation: '48 = 2⁴ × 3, 60 = 2² × 3 × 5. Az LKÖ = 2² × 3 = 12',
            type: 'simple'
        },
        // 3. Prímtényezős módszer
        {
            id: '3',
            question: 'A 90 = 2 × 3² × 5 és a 120 = 2³ × 3 × 5 prímtényezős felbontása alapján mennyi az LKÖ-jük?',
            options: shuffleOptions([30, 15, 60, 10]),
            correctAnswer: 30,
            explanation: 'LKÖ = 2¹ × 3¹ × 5¹ = 30 (a közös prímtényezők legkisebb kitevőivel)',
            type: 'prime'
        },
        // 4. Prímtényezős módszer
        {
            id: '4',
            question: 'Ha a = 2² × 3 × 7 és b = 2 × 3² × 5, akkor mennyi az LKÖ(a, b)?',
            options: shuffleOptions([6, 12, 21, 42]),
            correctAnswer: 6,
            explanation: 'Közös prímtényezők: 2 és 3. LKÖ = 2¹ × 3¹ = 6',
            type: 'prime'
        },
        // 5. Szöveges feladat
        {
            id: '5',
            question: 'Egy könyvtárban 84 magyar és 126 angol nyelvű könyvet szeretnének egyforma polcokra helyezni úgy, hogy mindegyik polcra csak egyféle nyelvű könyv kerüljön. Maximum hány könyv lehet egy-egy polcon?',
            options: shuffleOptions([42, 21, 14, 7]),
            correctAnswer: 42,
            explanation: 'Az LKÖ(84, 126) = 42, tehát legfeljebb 42 könyv kerülhet egy polcra.',
            type: 'word'
        },
        // 6. Szöveges feladat
        {
            id: '6',
            question: 'Két kötél hossza 150 cm és 225 cm. Hány cm hosszú darabokra vágjuk őket, ha a lehető leghosszabb, egyenlő darabokat szeretnénk?',
            options: shuffleOptions([75, 25, 50, 15]),
            correctAnswer: 75,
            explanation: 'Az LKÖ(150, 225) = 75 cm a leghosszabb egyenlő darab.',
            type: 'word'
        },
        // 7. Hatványalakból meghatározás
        {
            id: '7',
            question: 'Adott: 180 = 2² × 3² × 5 és 270 = 2 × 3³ × 5. Mennyi az LKÖ-jük?',
            options: shuffleOptions([90, 45, 30, 18]),
            correctAnswer: 90,
            explanation: 'LKÖ = 2¹ × 3² × 5¹ = 2 × 9 × 5 = 90',
            type: 'power'
        },
        // 8. Hatványalakból meghatározás
        {
            id: '8',
            question: 'Ha x = 2³ × 5² × 7 és y = 2² × 5 × 7², akkor LKÖ(x, y) = ?',
            options: shuffleOptions([140, 70, 35, 280]),
            correctAnswer: 140,
            explanation: 'LKÖ = 2² × 5¹ × 7¹ = 4 × 5 × 7 = 140',
            type: 'power'
        }
    ];
}

function shuffleOptions(options: number[]): number[] {
    return [...options].sort(() => Math.random() - 0.5);
}

interface GCDQuizProps {
    onBack?: () => void;
}

export function GCDQuiz({ onBack }: GCDQuizProps) {
    const [questions, setQuestions] = useState<GCDQuestion[]>([]);
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
                        <p className="text-indigo-100 opacity-90">LKÖ kvíz befejezve</p>
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
            case 'simple': return 'Egyszerű LKÖ számítás';
            case 'prime': return 'Prímtényezős módszer';
            case 'power': return 'Hatványalakból meghatározás';
            case 'word': return 'Szöveges feladat';
            default: return 'LKÖ feladat';
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
