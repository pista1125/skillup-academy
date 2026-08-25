import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Sparkles,
    Trophy,
    Target,
    Layout,
    ChevronLeft,
    ChevronRight,
    Check,
    Zap,
    Crown,
    Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

// --- Types & Constants ---

type Difficulty = 'easy' | 'medium' | 'hard';
type ShapeType = 'square' | 'rectangle';
type QuestionType = 'multiple-choice' | 'true-false' | 'input';

interface Question {
    id: number;
    shape: ShapeType;
    questionType: QuestionType;
    a: number;
    b?: number;
    unitA: string;
    unitB?: string;
    targetUnit: string;
    answer: number;
    text: string;
    options?: number[];
    isTrue?: boolean;
    givenPerimeter?: boolean;
}

const CONVERSIONS: Record<string, number> = {
    'mm': 1,
    'cm': 10,
    'dm': 100,
    'm': 1000
};

// --- Sub-components ---

const ShapeVisual = ({ question }: { question: Question }) => {
    const isSquare = question.shape === 'square';
    const width = isSquare ? 110 : 150;
    const height = 110;

    return (
        <div className="relative flex items-center justify-center p-8 bg-slate-50/50 rounded-3xl border border-slate-100 flex-1 min-h-[220px]">
            <div className="relative" style={{ width, height }}>
                <div 
                    className={cn(
                        "absolute inset-0 border-[3px] border-slate-800 bg-white shadow-sm flex items-center justify-center transition-all",
                        isSquare ? "rounded-xl" : "rounded-lg"
                    )}
                >
                    {question.givenPerimeter && (
                        <div className="text-center p-2">
                             <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Kerület</span>
                            <span className="text-xl font-black text-primary">K = {question.answer * (isSquare ? 4 : 2)} {question.unitA}</span>
                        </div>
                    )}
                </div>

                <div className="absolute -top-8 left-0 right-0 text-center flex flex-col items-center">
                    <span className="text-sm font-bold text-slate-600 bg-white px-3 py-0.5 rounded-full border shadow-xs whitespace-nowrap">
                        {question.givenPerimeter && isSquare ? "a = ?" : `a = ${question.a} ${question.unitA}`}
                    </span>
                </div>

                {!isSquare && (
                    <div className="absolute top-0 bottom-0 -left-20 flex items-center">
                        <span className="text-sm font-bold text-slate-600 bg-white px-3 py-0.5 rounded-full border shadow-xs whitespace-nowrap">
                            {question.givenPerimeter ? "b = ?" : `b = ${question.b} ${question.unitB}`}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default function PerimeterQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>(new Array(10).fill(null));
    const [submitted, setSubmitted] = useState<boolean[]>(new Array(10).fill(false));
    const [showResult, setShowResult] = useState(false);

    const generateQuestions = useCallback((diff: Difficulty) => {
        const newQuestions: Question[] = [];
        const qTypes: QuestionType[] = ['multiple-choice', 'true-false', 'input'];

        for (let i = 0; i < 10; i++) {
            const shape: ShapeType = Math.random() > 0.5 ? 'square' : 'rectangle';
            const qType = qTypes[Math.floor(Math.random() * qTypes.length)];
            let a = 0, b = 0, unitA = 'cm', unitB = 'cm', targetUnit = 'cm';
            let answer = 0;
            let text = "Mekkora a kerület?";
            let isInverse = false;

            if (diff === 'easy') {
                unitA = 'cm'; targetUnit = 'cm';
                if (shape === 'square') { a = Math.floor(Math.random() * 12) + 2; answer = 4 * a; }
                else { a = Math.floor(Math.random() * 10) + 4; b = Math.floor(Math.random() * 3) + 2; answer = 2 * (a + b); unitB = 'cm'; }
            } 
            else if (diff === 'medium') {
                const mainUnits = ['cm', 'dm', 'mm'];
                unitA = mainUnits[Math.floor(Math.random() * mainUnits.length)];
                targetUnit = unitA;
                if (shape === 'square') {
                    a = Math.floor(Math.random() * 20) + 5; answer = 4 * a;
                    if (Math.random() > 0.6) {
                        targetUnit = mainUnits.filter(u => u !== unitA)[0];
                        answer = (answer * CONVERSIONS[unitA]) / CONVERSIONS[targetUnit];
                    }
                } else {
                    a = Math.floor(Math.random() * 15) + 5;
                    unitB = mainUnits[Math.floor(Math.random() * mainUnits.length)];
                    b = Math.floor(Math.random() * 15) + 5;
                    answer = (2 * (a * CONVERSIONS[unitA] + b * CONVERSIONS[unitB])) / CONVERSIONS[targetUnit];
                }
                text = `Kerület (${targetUnit}):`;
            } 
            else {
                isInverse = true;
                const mainUnits = ['cm', 'dm', 'mm'];
                unitA = mainUnits[Math.floor(Math.random() * 3)];
                if (shape === 'square') { answer = Math.floor(Math.random() * 20) + 2; text = "Mekkora az oldal?"; }
                else { a = Math.floor(Math.random() * 15) + 5; answer = Math.floor(Math.random() * 10) + 2; text = "Hiányzó oldal?"; }
                targetUnit = unitA; unitB = unitA;
            }

            answer = Math.round(answer * 100) / 100;
            let options: number[] | undefined;
            let isTrue: boolean | undefined;

            if (qType === 'multiple-choice') {
                const optSet = new Set([answer]);
                while (optSet.size < 4) optSet.add(Math.max(1, answer + (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1)));
                options = Array.from(optSet).sort(() => Math.random() - 0.5);
            } else if (qType === 'true-false') {
                isTrue = Math.random() > 0.5;
                const displayVal = isTrue ? answer : Math.max(1, answer + (Math.floor(Math.random() * 3) + 1));
                text = `A kerület ${displayVal} ${targetUnit}?`;
            }

            newQuestions.push({
                id: i, shape, questionType: qType, a, b, unitA, unitB, targetUnit, answer, text, options, isTrue, givenPerimeter: isInverse
            });
        }
        setQuestions(newQuestions);
    }, []);

    const startQuiz = (diff: Difficulty) => {
        setDifficulty(diff);
        generateQuestions(diff);
        setCurrentIndex(0);
        setAnswers(new Array(10).fill(null));
        setSubmitted(new Array(10).fill(false));
        setShowResult(false);
    };

    const handleAnswerUpdate = (val: any) => {
        const newAnswers = [...answers];
        newAnswers[currentIndex] = val;
        setAnswers(newAnswers);
        
        const newSubmitted = [...submitted];
        newSubmitted[currentIndex] = true;
        setSubmitted(newSubmitted);
    };

    const finishQuiz = () => {
        const score = questions.reduce((acc, q, idx) => {
            const userVal = answers[idx];
            if (userVal === null) return acc;
            if (q.questionType === 'multiple-choice') return userVal === q.answer ? acc + 1 : acc;
            if (q.questionType === 'input') return parseFloat(userVal.toString().replace(',','.')) === q.answer ? acc + 1 : acc;
            return userVal === q.isTrue ? acc + 1 : acc;
        }, 0);

        setShowResult(true);
        if (score >= 8) confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    };

    if (!difficulty) {
        return (
            <div className="max-w-5xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
                <Button variant="ghost" onClick={onBack} size="sm" className="mb-6 rounded-xl hover:bg-slate-100">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Vissza
                </Button>
                
                <div className="text-center mb-10">
                    <div className="inline-flex p-4 bg-primary/10 rounded-3xl text-primary mb-4">
                        <Star className="w-10 h-10 fill-primary/20" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Síkidomok Kerülete</h1>
                    <p className="text-slate-500 font-medium text-lg">Válaszd ki a neked való kihívást!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                            id: 'easy' as Difficulty, 
                            title: 'Könnyű', 
                            desc: 'Ismerkedj meg az alapokkal! Egyszerű számítások centiméterben.',
                            icon: Sparkles,
                            color: 'emerald'
                        },
                        { 
                            id: 'medium' as Difficulty, 
                            title: 'Haladó', 
                            desc: 'Vigyázz a mértékegységekkel! Átváltások és izgalmasabb feladatok.',
                            icon: Zap,
                            color: 'sky'
                        },
                        { 
                            id: 'hard' as Difficulty, 
                            title: 'Mester', 
                            desc: 'Válj a kerület mesterévé! Számold ki a hiányzó oldalakat is.',
                            icon: Crown,
                            color: 'violet'
                        }
                    ].map((level) => {
                        const Icon = level.icon;
                        const colors = {
                            emerald: "hover:border-emerald-500 hover:shadow-emerald-200 bg-emerald-50/30",
                            sky: "hover:border-sky-500 hover:shadow-sky-200 bg-sky-50/30",
                            violet: "hover:border-violet-500 hover:shadow-violet-200 bg-violet-50/30",
                        };
                        const iconColors = {
                             emerald: "bg-emerald-100 text-emerald-600",
                             sky: "bg-sky-100 text-sky-600",
                             violet: "bg-violet-100 text-violet-600",
                        };

                        return (
                            <button 
                                key={level.id} 
                                onClick={() => startQuiz(level.id)} 
                                className={cn(
                                    "relative p-8 rounded-[42px] border-4 border-slate-100 transition-all text-left group overflow-hidden bg-white",
                                    colors[level.color]
                                )}
                            >
                                <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm", iconColors[level.color])}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black mb-3 text-slate-800">{level.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed leading-snug">
                                    {level.desc}
                                </p>
                                
                                <div className="mt-8 flex items-center text-sm font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span>Indítás</span>
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (showResult) {
        const score = questions.reduce((acc, q, idx) => {
            const userVal = answers[idx];
            if (userVal === null) return acc;
            if (q.questionType === 'multiple-choice') return userVal === q.answer ? acc + 1 : acc;
            if (q.questionType === 'input') return parseFloat(userVal.toString().replace(',','.')) === q.answer ? acc + 1 : acc;
            return userVal === q.isTrue ? acc + 1 : acc;
        }, 0);

        return (
            <div className="max-w-2xl mx-auto p-4 text-center animate-in zoom-in h-[90vh] flex items-center justify-center">
                <Card className="p-12 rounded-[50px] shadow-2xl border-none bg-white w-full">
                    <div className="w-32 h-32 rounded-[40px] bg-yellow-100 flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <Trophy className="w-16 h-16 text-yellow-600" />
                    </div>
                    <h2 className="text-4xl font-black mb-2 text-slate-800">Szuper munka!</h2>
                    <p className="text-6xl font-black text-primary mb-12">{score} / 10</p>
                    <div className="flex gap-4">
                        <Button onClick={() => setDifficulty(null)} className="flex-1 h-16 rounded-3xl font-black text-xl shadow-lg shadow-primary/20">Újra</Button>
                        <Button variant="outline" onClick={() => setDifficulty(null)} className="flex-1 h-16 rounded-3xl font-black text-xl border-4">Vége</Button>
                    </div>
                </Card>
            </div>
        );
    }

    const currentQ = questions[currentIndex];
    const userChoice = answers[currentIndex];
    const isSub = submitted[currentIndex];

    return (
        <div className="max-w-5xl mx-auto p-2 h-[90vh] flex flex-col">
            <div className="flex items-center justify-between mb-2 px-2">
                <Button variant="ghost" size="sm" onClick={() => setDifficulty(null)} className="rounded-xl h-8 text-xs">
                    <ArrowLeft className="w-3 h-3 mr-1" /> Kilépés
                </Button>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
                        {difficulty === 'easy' ? 'Könnyű' : difficulty === 'medium' ? 'Haladó' : 'Mester'}
                    </span>
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black leading-none">{currentIndex + 1} / 10</div>
                </div>
            </div>

            <Card className="flex-1 overflow-hidden rounded-[32px] border-none shadow-xl bg-white flex flex-col relative">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-8 overflow-hidden">
                    {/* Left Side: Question + Visual */}
                    <div className="flex flex-col justify-center gap-4 md:border-r md:pr-8">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                            {currentQ.text}
                        </h2>
                        <ShapeVisual question={currentQ} />
                    </div>

                    {/* Right Side: Interaction */}
                    <div className="flex flex-col justify-center items-center bg-slate-50/30 rounded-3xl p-6">
                        {currentQ.questionType === 'multiple-choice' && (
                            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                                {currentQ.options?.map((opt, idx) => (
                                    <button
                                        key={idx} onClick={() => handleAnswerUpdate(opt)}
                                        className={cn(
                                            "h-20 rounded-2xl text-2xl font-black transition-all border-2",
                                            userChoice === opt 
                                                ? (isSub && opt === currentQ.answer ? "bg-emerald-500 border-emerald-500 text-white" : "bg-primary border-primary text-white")
                                                : "bg-white border-slate-100 hover:border-primary/30 text-slate-600"
                                        )}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQ.questionType === 'true-false' && (
                            <div className="flex gap-4 w-full max-w-sm">
                                {[true, false].map((val) => (
                                    <button
                                        key={val ? 't' : 'f'} onClick={() => handleAnswerUpdate(val)}
                                        className={cn(
                                            "flex-1 h-32 rounded-3xl border-2 flex flex-col items-center justify-center transition-all",
                                            userChoice === val
                                                ? (isSub && val === currentQ.isTrue ? "bg-emerald-500 border-emerald-500 text-white" : "bg-primary border-primary text-white")
                                                : "bg-white border-slate-100 hover:border-primary/30 text-slate-400"
                                        )}
                                    >
                                        {val ? <Check className="w-8 h-8 mb-1" /> : <XCircle className="w-8 h-8 mb-1" />}
                                        <span className="font-black">{val ? 'Igaz' : 'Hamis'}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQ.questionType === 'input' && (
                            <div className="w-full max-w-sm flex flex-col gap-4">
                                <div className="relative">
                                    <Input
                                        value={userChoice || ""} 
                                        onChange={(e) => handleAnswerUpdate(e.target.value)}
                                        className="h-20 text-3xl font-black text-center pr-16 rounded-2xl border-2 border-slate-100 focus:border-primary"
                                        placeholder="..."
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-300">{currentQ.targetUnit}</span>
                                </div>
                                <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">Írd be a választ!</p>
                            </div>
                        )}

                        {isSub && (
                            <div className={cn(
                                "mt-6 py-2 px-6 rounded-full text-sm font-bold animate-in fade-in slide-in-from-top-2 flex items-center gap-2",
                                (userChoice === currentQ.answer || 
                                 (currentQ.questionType === 'input' && parseFloat(userChoice?.toString().replace(',','.')) === currentQ.answer) ||
                                 userChoice === currentQ.isTrue)
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-rose-100 text-rose-700"
                            )}>
                                {(userChoice === currentQ.answer || 
                                 (currentQ.questionType === 'input' && parseFloat(userChoice?.toString().replace(',','.')) === currentQ.answer) ||
                                 userChoice === currentQ.isTrue) ? "Szuper! ✨" : `Helyes válasz: ${currentQ.questionType === 'true-false' ? (currentQ.isTrue ? 'Igaz' : 'Hamis') : currentQ.answer}`}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="bg-slate-50 p-4 px-8 flex items-center justify-between border-t gap-4">
                    <Button
                        variant="ghost" onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                        disabled={currentIndex === 0}
                        className="rounded-xl h-12 px-6 font-bold"
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" /> Vissza
                    </Button>

                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {questions.map((_, idx) => (
                            <button 
                                key={idx} 
                                onClick={() => setCurrentIndex(idx)}
                                className={cn(
                                    "h-2.5 transition-all rounded-full min-w-[10px]",
                                    idx === currentIndex ? "w-8 bg-primary" : "w-1.5 bg-slate-200 hover:bg-slate-300",
                                    answers[idx] !== null && idx !== currentIndex && "bg-slate-400"
                                )} 
                            />
                        ))}
                    </div>

                    {currentIndex < 9 ? (
                        <Button
                            onClick={() => setCurrentIndex(prev => prev + 1)}
                            className="rounded-xl h-12 px-8 font-black shadow-lg shadow-primary/20"
                        >
                            Tovább <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    ) : (
                        <Button
                            onClick={finishQuiz}
                            className="rounded-xl h-12 px-8 font-black bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                        >
                            Befejezés <Sparkles className="w-4 h-4 ml-2" />
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    );
}
