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
    Zap,
    Triangle as TriangleIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
    id: string;
    question: string;
    options: number[];
    correctAnswer: number;
    explanation: string;
    type: 'internal' | 'external-adjacent' | 'external-non-adjacent';
}

function generateQuestions(): Question[] {
    const questions: Question[] = [];

    // 1. Two internal angles -> find 3rd (4 questions)
    for (let i = 0; i < 4; i++) {
        const a = Math.floor(Math.random() * 100) + 20;
        const b = Math.floor(Math.random() * (150 - a)) + 20;
        const c = 180 - a - b;

        questions.push({
            id: `q-int-${i}`,
            question: `Egy háromszög két belső szöge ${a}° és ${b}°. Mekkora a harmadik belső szöge?`,
            correctAnswer: c,
            options: shuffleOptions([c, c + 10, 180 - c, a + b]),
            explanation: `A háromszög belső szögeinek összege 180°. 180° - (${a}° + ${b}°) = ${c}°.`,
            type: 'internal'
        });
    }

    // 2. Internal + adjacent external -> find internal (3 questions)
    for (let i = 0; i < 3; i++) {
        const internal = Math.floor(Math.random() * 120) + 30;
        const external = 180 - internal;

        questions.push({
            id: `q-ext-adj-${i}`,
            question: `Egy háromszög egyik külső szöge ${external}°. Mekkora az ezzel szomszédos belső szög?`,
            correctAnswer: internal,
            options: shuffleOptions([internal, 180 + internal, external - 90, 90]),
            explanation: `A belső szög és a mellette lévő külső szög összege 180° (mellékszögek). 180° - ${external}° = ${internal}°.`,
            type: 'external-adjacent'
        });
    }

    // 3. External + non-adjacent internal -> find other internal (3 questions)
    for (let i = 0; i < 3; i++) {
        const int1 = Math.floor(Math.random() * 80) + 20;
        const int2 = Math.floor(Math.random() * 60) + 20;
        const ext = int1 + int2; // External angle is sum of two other internals

        questions.push({
            id: `q-ext-nonadj-${i}`,
            question: `Egy háromszög egyik külső szöge ${ext}°, egyik nem mellette fekvő belső szöge pedig ${int1}°. Mekkora a másik nem mellette fekvő belső szöge?`,
            correctAnswer: int2,
            options: shuffleOptions([int2, int2 + 20, ext + int1, 180 - ext]),
            explanation: `A háromszög külső szöge egyenlő a két nem mellette fekvő belső szög összegével. ${ext}° - ${int1}° = ${int2}°.`,
            type: 'external-non-adjacent'
        });
    }

    return questions.sort(() => Math.random() - 0.5);
}

function shuffleOptions(options: number[]): number[] {
    const unique = Array.from(new Set(options));
    while (unique.length < 4) {
        const rand = Math.floor(Math.random() * 160) + 10;
        if (!unique.includes(rand)) unique.push(rand);
    }
    return unique.sort(() => Math.random() - 0.5);
}

interface TriangleAnglesQuizProps {
    onBack?: () => void;
}

export function TriangleAnglesQuiz({ onBack }: TriangleAnglesQuizProps) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [quizComplete, setQuizComplete] = useState(false);
    const [xpEarned, setXpEarned] = useState(0);

    const TOTAL_QUESTIONS = 10;
    const XP_PER_CORRECT = 15;

    const startQuiz = useCallback(() => {
        setQuestions(generateQuestions());
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
        if (answer === questions[currentIndex].correctAnswer) {
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
                <Card className="border-2 border-emerald-100 shadow-xl overflow-hidden rounded-3xl">
                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 text-center text-white">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <Trophy className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-black mb-1">
                            {percentage >= 80 ? 'Kiváló!' : percentage >= 60 ? 'Szép munka!' : 'Gyakorolj tovább!'}
                        </h2>
                        <p className="text-emerald-100 opacity-90">Háromszögek szögei kvíz befejezve</p>
                    </div>
                    <CardContent className="p-8 space-y-8 bg-white">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Pontosság</span>
                                <span className="text-3xl font-black text-slate-800">{percentage}%</span>
                            </div>
                            <div className="bg-slate-50 p-4 rounded-2xl text-center border border-slate-100">
                                <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Helyes</span>
                                <span className="text-3xl font-black text-slate-800">{correctCount}/{TOTAL_QUESTIONS}</span>
                            </div>
                        </div>
                        <div className="flex justify-center"><XPBadge xp={xpEarned} /></div>
                        <div className="flex gap-3">
                            {onBack && (
                                <Button variant="outline" onClick={onBack} className="flex-1 rounded-2xl h-12">
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Vissza
                                </Button>
                            )}
                            <Button onClick={startQuiz} className="flex-1 h-12 text-lg font-bold bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl shadow-lg transition-all">
                                <RotateCcw className="w-5 h-5 mr-2" /> Újra
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between bg-white/50 p-4 rounded-2xl border border-emerald-100 shadow-sm">
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
                        <ProgressBar current={currentIndex + 1} total={TOTAL_QUESTIONS} variant="math" size="md" />
                    </div>
                </div>
                <XPBadge xp={xpEarned} />
            </div>

            <Card className="border-2 border-slate-100 shadow-xl rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-0">
                    <div className="p-8 md:p-12 text-center space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-bold">
                                <TriangleIcon className="w-4 h-4" />
                                Háromszögek szögei
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
                                        className="h-16 text-xl font-black bg-slate-100 hover:bg-emerald-500 text-slate-800 hover:text-white border-2 border-slate-200 hover:border-emerald-500 shadow-sm rounded-2xl transition-all"
                                    >
                                        {option}°
                                    </Button>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-6 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
                                <div className={cn(
                                    "p-6 rounded-3xl border-2 flex flex-col items-center gap-3",
                                    isCorrect ? "bg-emerald-50 border-emerald-100 text-emerald-800" : "bg-rose-50 border-rose-100 text-rose-800"
                                )}>
                                    <div className="flex items-center gap-3">
                                        {isCorrect ? (
                                            <><CheckCircle2 className="w-8 h-8 text-emerald-600" /><span className="text-2xl font-black uppercase">Helyes!</span></>
                                        ) : (
                                            <><XCircle className="w-8 h-8 text-rose-600" /><span className="text-2xl font-black uppercase">Hoppá!</span></>
                                        )}
                                    </div>
                                    <div className="text-center">
                                        {!isCorrect && <p className="font-bold mb-2">A helyes válasz: <span className="text-lg">{currentQuestion.correctAnswer}°</span></p>}
                                        <div className="bg-white/60 p-3 rounded-xl border border-white mt-2 max-w-md">
                                            <p className="text-sm font-medium italic"><HelpCircle className="w-4 h-4 inline mr-2 opacity-50" />{currentQuestion.explanation}</p>
                                        </div>
                                    </div>
                                </div>
                                <Button onClick={nextQuestion} className="w-full h-14 text-lg font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-xl rounded-2xl group transition-all">
                                    {currentIndex < TOTAL_QUESTIONS - 1 ? 'Következő feladat' : 'Eredmények'}
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
