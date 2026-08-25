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
    LayoutGrid,
    RectangleHorizontal,
    Square as SquareIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

// --- Helper Components ---

interface GridShapeProps {
    type: 'rectangle' | 'square';
    a: number;
    b?: number;
    unit: string;
    showGrid?: boolean;
    displayScale?: number;
}

function GridShape({ type, a, b, unit, showGrid = true, displayScale = 1 }: GridShapeProps) {
    const width = a;
    const height = type === 'square' ? a : (b || a);
    
    // Normalize for display (max size around 200px)
    const maxVal = Math.max(width, height);
    const scale = Math.min(200 / maxVal, 40); // cap size
    
    const displayWidth = width * scale;
    const displayHeight = height * scale;

    return (
        <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-slate-100 shadow-inner overflow-hidden">
            <div 
                className="relative border-4 border-slate-800 bg-emerald-50/50 transition-all duration-500"
                style={{ 
                    width: `${displayWidth}px`, 
                    height: `${displayHeight}px`,
                }}
            >
                {showGrid && (
                    <div 
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{
                            backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                            backgroundSize: `${scale}px ${scale}px`
                        }}
                    />
                )}
                
                {/* Labels */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 font-black text-slate-800 text-lg">
                    {a} {unit}
                </div>
                {type === 'rectangle' && (
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 font-black text-slate-800 text-lg rotate-90 origin-center whitespace-nowrap">
                        {b} {unit}
                    </div>
                )}
                {type === 'square' && (
                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 font-black text-slate-800 text-lg rotate-90 origin-center whitespace-nowrap">
                        {a} {unit}
                    </div>
                )}
            </div>
            
            <div className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
                {type === 'square' ? 'Négyzet' : 'Téglalap'} ábrázolása
            </div>
        </div>
    );
}

// --- Types & Constants ---

type Difficulty = 'easy' | 'medium' | 'hard';
type QuestionType = 'multiple-choice' | 'true-false' | 'input';

interface Question {
    id: number;
    shapeType: 'rectangle' | 'square';
    questionType: QuestionType;
    a: number;
    b?: number;
    unitA: string;
    unitB: string;
    targetUnit: string;
    answer: number;
    text: string;
    options?: number[];
    isTrue?: boolean;
}

// --- Component ---

export default function AreaCalculationQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>(new Array(10).fill(null));
    const [submitted, setSubmitted] = useState<boolean[]>(new Array(10).fill(false));
    const [showResult, setShowResult] = useState(false);

    const generateQuestions = useCallback((diff: Difficulty) => {
        const newQuestions: Question[] = [];
        
        const easyTasks = [
            { type: 'square', a: 3, b: 3, unit: 'cm', ans: 9 },
            { type: 'rectangle', a: 5, b: 2, unit: 'cm', ans: 10 },
            { type: 'rectangle', a: 6, b: 4, unit: 'dm', ans: 24 },
            { type: 'square', a: 4, b: 4, unit: 'm', ans: 16 },
            { type: 'rectangle', a: 8, b: 3, unit: 'mm', ans: 24 },
            { type: 'square', a: 5, b: 5, unit: 'cm', ans: 25 },
            { type: 'rectangle', a: 7, b: 2, unit: 'dm', ans: 14 },
            { type: 'rectangle', a: 4, b: 3, unit: 'm', ans: 12 },
            { type: 'square', a: 2, b: 2, unit: 'cm', ans: 4 },
            { type: 'rectangle', a: 10, b: 5, unit: 'cm', ans: 50 },
        ];

        const mediumTasks = [
            { type: 'rectangle', a: 12, b: 5, unit: 'cm', ans: 60 },
            { type: 'square', a: 6.5, b: 6.5, unit: 'cm', ans: 42.25 },
            { type: 'rectangle', a: 15, b: 4, unit: 'm', ans: 60 },
            { type: 'rectangle', a: 0.5, b: 4, unit: 'm', ans: 2 },
            { type: 'square', a: 12, b: 12, unit: 'dm', ans: 144 },
            { type: 'rectangle', a: 20, b: 7.5, unit: 'cm', ans: 150 },
            { type: 'rectangle', a: 1.5, b: 6, unit: 'dm', ans: 9 },
            { type: 'square', a: 2.5, b: 2.5, unit: 'cm', ans: 6.25 },
            { type: 'rectangle', a: 25, b: 10, unit: 'mm', ans: 250 },
            { type: 'rectangle', a: 1.2, b: 5, unit: 'm', ans: 6 },
        ];

        const hardTasks = [
            { type: 'rectangle', a: 50, b: 3, unitA: 'mm', unitB: 'cm', target: 'cm²', ans: 15 },
            { type: 'rectangle', a: 0.5, b: 20, unitA: 'm', unitB: 'dm', target: 'm²', ans: 1 },
            { type: 'square', a: 80, b: 80, unitA: 'mm', unitB: 'mm', target: 'cm²', ans: 64 },
            { type: 'rectangle', a: 1.2, b: 100, unitA: 'dm', unitB: 'mm', target: 'dm²', ans: 1.2 },
            { type: 'rectangle', a: 2.5, b: 40, unitA: 'm', unitB: 'cm', target: 'm²', ans: 1 },
            { type: 'square', a: 0.3, b: 0.3, unitA: 'm', unitB: 'm', target: 'dm²', ans: 9 },
            { type: 'rectangle', a: 12.5, b: 40, unitA: 'cm', unitB: 'mm', target: 'cm²', ans: 50 },
            { type: 'rectangle', a: 0.1, b: 50, unitA: 'km', unitB: 'm', target: 'm²', ans: 5000 },
            { type: 'square', a: 15, b: 15, unitA: 'dm', unitB: 'dm', target: 'm²', ans: 2.25 },
            { type: 'rectangle', a: 75, b: 1.2, unitA: 'cm', unitB: 'm', target: 'm²', ans: 0.9 },
        ];

        const shuffled = (diff === 'easy' ? [...easyTasks] : diff === 'medium' ? [...mediumTasks] : [...hardTasks]).sort(() => Math.random() - 0.5);

        for (let i = 0; i < 10; i++) {
            const task = shuffled[i];
            const qType: QuestionType = i < 4 ? 'multiple-choice' : i < 7 ? 'true-false' : 'input';
            
            let options: number[] | undefined;
            let isTrue: boolean | undefined;
            
            const shapeType = task.type as 'rectangle' | 'square';
            const unitA = (task as any).unitA || (task as any).unit;
            const unitB = (task as any).unitB || (task as any).unit;
            const targetUnit = (task as any).target || `${unitA}²`;

            if (qType === 'multiple-choice') {
                const optSet = new Set([task.ans]);
                while (optSet.size < 4) {
                    const factor = Math.random() > 0.5 ? 2 : 0.5;
                    const offset = (Math.floor(Math.random() * 10) + 1);
                    const alt = Math.max(0.1, Math.round((task.ans * factor + offset) * 100) / 100);
                    optSet.add(alt);
                }
                options = Array.from(optSet).sort(() => Math.random() - 0.5);
            } else if (qType === 'true-false') {
                isTrue = Math.random() > 0.5;
                const displayVal = isTrue ? task.ans : (Math.random() > 0.5 ? task.ans + 5 : Math.max(1, task.ans - 3));
                (task as any).displayText = `A terület ${displayVal} ${targetUnit}?`;
            }

            newQuestions.push({
                id: i,
                shapeType,
                questionType: qType,
                a: task.a,
                b: shapeType === 'rectangle' ? task.b : undefined,
                unitA,
                unitB,
                targetUnit,
                answer: task.ans,
                text: (task as any).displayText || `Mekkora a terület ${targetUnit} egységben?`,
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
            const normalizedUserVal = typeof userVal === 'string' ? parseFloat(userVal.replace(',','.')) : userVal;
            
            if (q.questionType === 'multiple-choice') return userVal === q.answer ? acc + 1 : acc;
            if (q.questionType === 'input') return normalizedUserVal === q.answer ? acc + 1 : acc;
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
                        <LayoutGrid className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Területszámítás Kvíz</h1>
                    <p className="text-slate-500 font-medium text-lg">Számítsd ki a téglalapok és négyzetek területét!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                            id: 'easy' as Difficulty, 
                            title: 'Könnyű', 
                            desc: 'Egyszerű egész számok, látható négyzetháló a számoláshoz.',
                            icon: Sparkles,
                            color: 'emerald'
                        },
                        { 
                            id: 'medium' as Difficulty, 
                            title: 'Haladó', 
                            desc: 'Nagyobb számok és tizedesek. Itt már a képlet a biztosabb!',
                            icon: Zap,
                            color: 'sky'
                        },
                        { 
                            id: 'hard' as Difficulty, 
                            title: 'Mester', 
                            desc: 'Vegyes mértékegységek és nehezebb tizedesek. Figyelj a váltásra!',
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
             const normalizedUserVal = typeof userVal === 'string' ? parseFloat(userVal.replace(',','.')) : userVal;
            
            if (q.questionType === 'multiple-choice') return userVal === q.answer ? acc + 1 : acc;
            if (q.questionType === 'input') return normalizedUserVal === q.answer ? acc + 1 : acc;
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
                <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 p-6 md:p-8 overflow-hidden">
                    {/* Left Side: Illustration */}
                    <div className="md:col-span-3 flex flex-col justify-center gap-6">
                        <GridShape 
                            type={currentQ.shapeType} 
                            a={currentQ.a} 
                            b={currentQ.b} 
                            unit={currentQ.unitA} 
                            showGrid={difficulty === 'easy'} 
                        />
                        
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                             <div className="flex items-center gap-3 mb-2">
                                <Target className="w-5 h-5 text-primary" />
                                <span className="text-xs font-black text-primary uppercase tracking-[0.2em]">Feladat</span>
                             </div>
                             <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
                                {currentQ.text}
                             </h2>
                             {difficulty === 'hard' && currentQ.unitA !== currentQ.unitB && (
                                <p className="mt-3 text-sm font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg w-fit">
                                    Vigyázat! Különböző mértékegységek!
                                </p>
                             )}
                        </div>
                    </div>

                    {/* Right Side: Interaction */}
                    <div className="md:col-span-2 flex flex-col justify-center items-center bg-slate-50/30 rounded-3xl p-6">
                        {currentQ.questionType === 'multiple-choice' && (
                            <div className="grid grid-cols-1 gap-3 w-full">
                                {currentQ.options?.map((opt, idx) => (
                                    <button
                                        key={idx} onClick={() => handleAnswerUpdate(opt)}
                                        className={cn(
                                            "h-16 rounded-2xl text-2xl font-black transition-all border-2 flex items-center justify-center gap-3",
                                            userChoice === opt 
                                                ? (isSub && opt === currentQ.answer ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-primary border-primary text-white shadow-lg shadow-primary/20")
                                                : "bg-white border-slate-100 hover:border-primary/30 text-slate-600 hover:shadow-md"
                                        )}
                                    >
                                        {opt}
                                        <span className="text-sm font-bold opacity-60">{currentQ.targetUnit}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQ.questionType === 'true-false' && (
                            <div className="flex flex-col gap-4 w-full">
                                {[true, false].map((val) => (
                                    <button
                                        key={val ? 't' : 'f'} onClick={() => handleAnswerUpdate(val)}
                                        className={cn(
                                            "flex-1 h-24 rounded-3xl border-2 flex flex-col items-center justify-center transition-all",
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
                            <div className="w-full flex flex-col gap-4">
                                <div className="relative">
                                    <Input
                                        value={userChoice || ""} 
                                        onChange={(e) => handleAnswerUpdate(e.target.value)}
                                        className="h-20 text-4xl font-black text-center pr-20 rounded-2xl border-2 border-slate-100 focus:border-primary"
                                        placeholder="..."
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-300 text-xl">{currentQ.targetUnit}</span>
                                </div>
                                <p className="text-center text-xs text-slate-400 font-bold uppercase tracking-widest">Írd be a pontos értéket!</p>
                            </div>
                        )}

                        {isSub && (
                            <div className={cn(
                                "mt-6 py-3 px-8 rounded-2xl text-sm font-bold animate-in fade-in slide-in-from-top-2 flex items-center gap-2 shadow-sm w-full justify-center",
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
                                 : `Helyes válasz: ${currentQ.questionType === 'true-false' ? (currentQ.isTrue ? 'Igaz' : 'Hamis') : currentQ.answer + ' ' + currentQ.targetUnit}`}
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
