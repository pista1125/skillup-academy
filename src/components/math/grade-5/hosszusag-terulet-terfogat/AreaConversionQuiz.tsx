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
    ChevronLeft,
    ChevronRight,
    Check,
    Zap,
    Crown,
    Star,
    ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

// --- Types & Constants ---

type Difficulty = 'easy' | 'medium' | 'hard';
type QuestionType = 'multiple-choice' | 'true-false' | 'input';

interface Question {
    id: number;
    questionType: QuestionType;
    value: number;
    fromUnit: string;
    toUnit: string;
    answer: number;
    text: string;
    options?: number[];
    isTrue?: boolean;
}

const UNITS = ['mm²', 'cm²', 'dm²', 'm²', 'km²'];

// --- Component ---

export default function AreaConversionQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>(new Array(10).fill(null));
    const [submitted, setSubmitted] = useState<boolean[]>(new Array(10).fill(false));
    const [showResult, setShowResult] = useState(false);

    const generateQuestions = useCallback((diff: Difficulty) => {
        const newQuestions: Question[] = [];
        
        const easyTasks = [
            { v: 100, f: 'cm²', t: 'dm²', a: 1 },
            { v: 5, f: 'dm²', t: 'cm²', a: 500 },
            { v: 2, f: 'm²', t: 'dm²', a: 200 },
            { v: 600, f: 'mm²', t: 'cm²', a: 6 },
            { v: 4, f: 'm²', t: 'cm²', a: 40000 },
            { v: 10000, f: 'cm²', t: 'm²', a: 1 },
            { v: 800, f: 'dm²', t: 'm²', a: 8 },
            { v: 12, f: 'cm²', t: 'mm²', a: 1200 },
            { v: 3, f: 'm²', t: 'dm²', a: 300 },
            { v: 1, f: 'km²', t: 'm²', a: 1000000 },
        ];

        const mediumTasks = [
            { v: 0.5, f: 'm²', t: 'dm²', a: 50 },
            { v: 1.2, f: 'dm²', t: 'cm²', a: 120 },
            { v: 2.5, f: 'cm²', t: 'mm²', a: 250 },
            { v: 45, f: 'dm²', t: 'm²', a: 0.45 },
            { v: 0.75, f: 'm²', t: 'cm²', a: 7500 },
            { v: 150, f: 'cm²', t: 'dm²', a: 1.5 },
            { v: 0.01, f: 'm²', t: 'cm²', a: 100 },
            { v: 3.4, f: 'dm²', t: 'cm²', a: 340 },
            { v: 5.1, f: 'm²', t: 'dm²', a: 510 },
            { v: 0.005, f: 'km²', t: 'm²', a: 5000 },
        ];

        const hardTasks = [
            { v: 123.4, f: 'cm²', t: 'dm²', a: 1.234 },
            { v: 0.0001, f: 'km²', t: 'm²', a: 100 },
            { v: 0.075, f: 'm²', t: 'cm²', a: 750 },
            { v: 5678, f: 'mm²', t: 'cm²', a: 56.78 },
            { v: 1.2, f: 'km²', t: 'm²', a: 1200000 },
            { v: 345, f: 'cm²', t: 'm²', a: 0.0345 },
            { v: 0.00045, f: 'm²', t: 'cm²', a: 4.5 },
            { v: 15.6, f: 'dm²', t: 'mm²', a: 156000 },
            { v: 12.34, f: 'm²', t: 'cm²', a: 123400 },
            { v: 0.025, f: 'km²', t: 'm²', a: 25000 },
        ];

        const sourceTasks = diff === 'easy' ? easyTasks : diff === 'medium' ? mediumTasks : hardTasks;
        const shuffled = [...sourceTasks].sort(() => Math.random() - 0.5);

        for (let i = 0; i < 10; i++) {
            const task = shuffled[i];
            const qType: QuestionType = i < 4 ? 'multiple-choice' : i < 7 ? 'true-false' : 'input';
            
            let options: number[] | undefined;
            let isTrue: boolean | undefined;
            let text = `${task.v} ${task.f} = ? ${task.t}`;

            if (qType === 'multiple-choice') {
                const optSet = new Set([task.a]);
                while (optSet.size < 4) {
                    const factor = Math.random() > 0.5 ? 10 : 0.1;
                    const offset = (Math.floor(Math.random() * 5) + 1) * (Math.random() > 0.5 ? 1 : -1);
                    const alt = Math.max(0.0001, Math.round((task.a * factor + offset) * 10000) / 10000);
                    optSet.add(alt);
                }
                options = Array.from(optSet).sort(() => Math.random() - 0.5);
            } else if (qType === 'true-false') {
                isTrue = Math.random() > 0.5;
                const displayVal = isTrue ? task.a : (Math.random() > 0.5 ? task.a * 10 : task.a / 10);
                text = `${task.v} ${task.f} = ${displayVal} ${task.t}?`;
            }

            newQuestions.push({
                id: i,
                questionType: qType,
                value: task.v,
                fromUnit: task.f,
                toUnit: task.t,
                answer: task.a,
                text,
                options,
                isTrue
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
                        <ArrowRightLeft className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Mértékegység átváltások (Terület)</h1>
                    <p className="text-slate-500 font-medium text-lg">Gyakorold a terület mértékegységeinek egyszerű és pontos átváltását!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                            id: 'easy' as Difficulty, 
                            title: 'Könnyű', 
                            desc: 'Csak egész számok. Alapvető váltások mm², cm², dm², m² között.',
                            icon: Sparkles,
                            color: 'emerald'
                        },
                        { 
                            id: 'medium' as Difficulty, 
                            title: 'Haladó', 
                            desc: 'Megjelennek a tizedes törtek is. Izgalmasabb feladatok m²-ig.',
                            icon: Zap,
                            color: 'sky'
                        },
                        { 
                            id: 'hard' as Difficulty, 
                            title: 'Mester', 
                            desc: 'Akár km²-es váltások és kisebb tizedesek. Válj a terület mesterévé!',
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
                                    colors[level.color as keyof typeof colors]
                                )}
                            >
                                <div className={cn("w-16 h-16 rounded-[24px] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm", iconColors[level.color as keyof typeof iconColors])}>
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-3xl font-black mb-3 text-slate-800">{level.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">
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
                    {/* Left Side: Question */}
                    <div className="flex flex-col justify-center gap-6 md:border-r md:pr-8">
                        <div className="space-y-2">
                            <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Feladat</span>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                                {currentQ.questionType === 'true-false' ? currentQ.text : `${currentQ.value} ${currentQ.fromUnit} =`}
                            </h2>
                            {currentQ.questionType !== 'true-false' && (
                                <p className="text-2xl font-bold text-slate-400">... {currentQ.toUnit}</p>
                            )}
                        </div>
                        
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                             <p className="text-slate-500 font-medium leading-relaxed">
                                {currentQ.questionType === 'true-false' 
                                    ? "Döntsd el, hogy az állítás igaz vagy hamis!" 
                                    : `Váltsd át a megadott területet ${currentQ.toUnit} egységbe!`}
                             </p>
                        </div>
                    </div>

                    {/* Right Side: Interaction */}
                    <div className="flex flex-col justify-center items-center bg-slate-50/30 rounded-3xl p-6">
                        {currentQ.questionType === 'multiple-choice' && (
                            <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                                {currentQ.options?.map((opt, idx) => (
                                    <button
                                        key={idx} onClick={() => handleAnswerUpdate(opt)}
                                        className={cn(
                                            "h-20 rounded-2xl text-2xl font-black transition-all border-2 flex items-center justify-center gap-3",
                                            userChoice === opt 
                                                ? (isSub && opt === currentQ.answer ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-primary border-primary text-white shadow-lg shadow-primary/20")
                                                : "bg-white border-slate-100 hover:border-primary/30 text-slate-600 hover:shadow-md"
                                        )}
                                    >
                                        {opt}
                                        <span className="text-sm font-bold opacity-60">{currentQ.toUnit}</span>
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
                                        className="h-20 text-4xl font-black text-center pr-20 rounded-2xl border-2 border-slate-100 focus:border-primary"
                                        placeholder="..."
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xl">{currentQ.toUnit}</span>
                                </div>
                                <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">Írd be a pontos értéket!</p>
                            </div>
                        )}

                        {isSub && (
                            <div className={cn(
                                "mt-6 py-3 px-8 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2 flex items-center gap-2 shadow-sm",
                                (userChoice === currentQ.answer || 
                                 (currentQ.questionType === 'input' && parseFloat(userChoice?.toString().replace(',','.')) === currentQ.answer) ||
                                 userChoice === currentQ.isTrue)
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : "bg-rose-100 text-rose-700 border border-rose-200"
                            )}>
                                {(userChoice === currentQ.answer || 
                                 (currentQ.questionType === 'input' && parseFloat(userChoice?.toString().replace(',','.')) === currentQ.answer) ||
                                 userChoice === currentQ.isTrue) 
                                 ? "Szuper! ✨" 
                                 : `Helyes válasz: ${currentQ.questionType === 'true-false' ? (currentQ.isTrue ? 'Igaz' : 'Hamis') : currentQ.answer + ' ' + currentQ.toUnit}`}
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
                        <ChevronLeft className="w-4 h-4 mr-2" /> Előző
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
                            Következő <ChevronRight className="w-4 h-4 ml-2" />
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
