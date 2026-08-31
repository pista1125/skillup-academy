import { useState, useCallback } from 'react';
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
    Box,
    LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

// --- Helper Components ---

interface SurfaceAreaBoxProps {
    a: number;
    b: number;
    c: number;
    unitA?: string;
    unitB?: string;
    unitC?: string;
    showLabels?: boolean;
    missingSide?: 'a' | 'b' | 'c';
    isCube?: boolean;
}

function SurfaceAreaBox({ a, b, c, unitA, unitB, unitC, showLabels = true, missingSide, isCube }: SurfaceAreaBoxProps) {
    // Normalize for display (max size around 100px)
    const maxVal = Math.max(a, b, c);
    const baseScale = Math.min(60 / (maxVal || 1), 20); 
    
    // Isometric-ish projection parameters
    const w = a * baseScale;
    const h = c * baseScale;
    const d = b * baseScale * 0.6; // Depth is skewed and shortened
    const skewX = d * Math.cos(Math.PI / 4);
    const skewY = d * Math.sin(Math.PI / 4);

    const padding = 30; // Reduced padding
    const originX = padding;
    const originY = padding + skewY;

    const svgWidth = w + skewX + padding * 2;
    const svgHeight = h + skewY + padding * 2;

    return (
        <div className="relative flex flex-col items-center justify-center p-2 bg-white rounded-2xl border border-slate-100 shadow-inner min-h-[150px]">
            <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="drop-shadow-lg overflow-visible">
                {/* Back faces (dashed) */}
                <path 
                    d={`M ${originX + skewX} ${originY - skewY} L ${originX + skewX} ${originY - skewY + h} M ${originX + skewX} ${originY - skewY + h} L ${originX} ${originY + h} M ${originX + skewX} ${originY - skewY + h} L ${originX + w + skewX} ${originY - skewY + h}`}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                />

                {/* Main Faces with different shades of a color to emphasize faces for surface area */}
                {/* Right Face */}
                <path 
                    d={`M ${originX + w} ${originY} L ${originX + w + skewX} ${originY - skewY} L ${originX + w + skewX} ${originY - skewY + h} L ${originX + w} ${originY + h} Z`}
                    fill="#e0e7ff"
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                {/* Top Face */}
                <path 
                    d={`M ${originX} ${originY} L ${originX + skewX} ${originY - skewY} L ${originX + w + skewX} ${originY - skewY} L ${originX + w} ${originY} Z`}
                    fill="#c7d2fe"
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
                {/* Front Face */}
                <rect 
                    x={originX} y={originY} width={w} height={h}
                    fill="#a5b4fc"
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />

                {/* Labels */}
                {showLabels && (
                    <>
                        <text x={originX + w/2} y={originY + h + 20} textAnchor="middle" className="font-black text-slate-700 text-[10px] italic">
                            {missingSide === 'a' ? 'a = ?' : `a = ${a} ${unitA}`}
                        </text>
                        {(!isCube || missingSide) && (
                            <>
                                <text x={originX + w + 6} y={originY + h/2} textAnchor="start" className="font-black text-slate-700 text-[10px] italic">
                                    {missingSide === 'c' ? 'c = ?' : `c = ${c} ${unitC}`}
                                </text>
                                <text x={originX + w + skewX/2 + 6} y={originY + h - skewY/2 + 4} textAnchor="start" className="font-black text-slate-700 text-[10px] italic">
                                    {missingSide === 'b' ? 'b = ?' : `b = ${b} ${unitB}`}
                                </text>
                            </>
                        )}
                    </>
                )}
            </svg>
            
            <div className="mt-2 text-[8px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded-full">
                {isCube ? 'Kocka' : 'Téglatest'}
            </div>
        </div>
    );
}

// --- Types & Constants ---

type Difficulty = 'easy' | 'medium' | 'hard';
type QuestionType = 'multiple-choice' | 'true-false' | 'input';

interface Question {
    id: number;
    shapeType: 'cube' | 'prism';
    questionType: QuestionType;
    a: number;
    b: number;
    c: number;
    unitA: string;
    unitB: string;
    unitC: string;
    targetUnit: string;
    answer: number;
    text: string;
    options?: number[];
    isTrue?: boolean;
    missingSide?: 'a' | 'b' | 'c';
    A?: number; // Surface Area if given
}

// --- Component ---

export function SurfaceAreaQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<any[]>(new Array(10).fill(null));
    const [submitted, setSubmitted] = useState<boolean[]>(new Array(10).fill(false));
    const [showResult, setShowResult] = useState(false);

    const generateQuestions = useCallback((diff: Difficulty) => {
        const newQuestions: Question[] = [];
        
        const easyTasks = [
            { a: 2, b: 2, c: 2, unit: 'cm', ans: 24 }, // Cube: 6 * 2^2 = 24
            { a: 3, b: 2, c: 4, unit: 'cm', ans: 52 }, // Prism: 2*(6 + 12 + 8) = 52
            { a: 5, b: 5, c: 5, unit: 'dm', ans: 150 }, // Cube: 6 * 25 = 150
            { a: 10, b: 2, c: 3, unit: 'm', ans: 112 }, // Prism: 2*(20 + 30 + 6) = 112
            { a: 4, b: 4, c: 4, unit: 'cm', ans: 96 },
            { a: 6, b: 3, c: 2, unit: 'dm', ans: 72 }, // Prism: 2*(18 + 12 + 6) = 72
            { a: 1, b: 1, c: 1, unit: 'm', ans: 6 },
            { a: 3, b: 3, c: 3, unit: 'dm', ans: 54 },
            { a: 5, b: 2, c: 4, unit: 'cm', ans: 76 }, // 2*(10 + 20 + 8) = 76
            { a: 2, b: 4, c: 2, unit: 'cm', ans: 40 }, // 2*(8 + 4 + 8) = 40
        ];

        const mediumTasks = [
            { a: 20, b: 3, c: 4, unitA: 'mm', unitB: 'cm', unitC: 'cm', target: 'cm²', ans: 52 }, // a=2cm. SA=2*(6 + 8 + 12) = 52
            { a: 1, b: 5, c: 8, unitA: 'm', unitB: 'dm', unitC: 'dm', target: 'dm²', ans: 320 }, // a=10dm. SA=2*(50 + 80 + 40) = 340 wait. 2*(50 + 80 + 40) = 2*(170) = 340. Ans=340
            { a: 4, b: 2.5, c: 6, unitA: 'dm', unitB: 'dm', unitC: 'dm', target: 'dm²', ans: 98 }, // 2*(10 + 24 + 15) = 98
            { a: 50, b: 50, c: 50, unitA: 'cm', unitB: 'cm', unitC: 'cm', target: 'dm²', ans: 150 }, // 5dm. SA=6*25=150
            { a: 10, b: 2, c: 3, unitA: 'dm', unitB: 'm', unitC: 'm', target: 'm²', ans: 22 }, // a=1m. SA=2*(2 + 3 + 6) = 22
            { a: 15, b: 1.5, c: 2, unitA: 'cm', unitB: 'dm', unitC: 'dm', target: 'cm²', ans: 1350 }, // b=15cm, c=20cm. SA=2*(225 + 300 + 300)=1650 wait. 2*(15*15 + 15*20 + 15*20) = 2*(225 + 300 + 300) = 1650. Let's do simple: a=10cm,b=2dm,c=20cm -> a=1,b=2,c=2 dm -> SA=2*(2+2+4)=16dm² -> 1600cm².
            { a: 10, b: 20, c: 20, unitA: 'cm', unitB: 'cm', unitC: 'cm', target: 'dm²', ans: 16 }, // a=1,b=2,c=2 dm -> SA=16 dm²
            { a: 5, b: 0.5, c: 1, unitA: 'cm', unitB: 'dm', unitC: 'dm', target: 'cm²', ans: 170 }, // a=5,b=5,c=10 cm -> 2*(25 + 50 + 50)=250 cm²
            { a: 12, b: 5, c: 2, unitA: 'cm', unitB: 'cm', unitC: 'cm', target: 'cm²', ans: 188 }, // 2*(60 + 24 + 10) = 188
            { a: 7, b: 2, c: 1, unitA: 'dm', unitB: 'dm', unitC: 'dm', target: 'dm²', ans: 46 }, // 2*(14 + 7 + 2) = 46
        ];

        // Let's fix medium task 2 and 6 and 8
        mediumTasks[1].ans = 340; 
        mediumTasks[5] = { a: 10, b: 2, c: 20, unitA: 'cm', unitB: 'dm', unitC: 'cm', target: 'cm²', ans: 1600 }; 
        mediumTasks[7] = { a: 5, b: 0.5, c: 1, unitA: 'cm', unitB: 'dm', unitC: 'dm', target: 'cm²', ans: 250 }; 

        const hardTasks = [
            { A: 54, a: 3, b: 3, c: 3, missing: 'a', unitA: 'cm', unitB: 'cm', unitC: 'cm', target: 'cm', ans: 3 }, // Cube SA=54 -> a=3
            { A: 150, a: 5, b: 5, c: 5, missing: 'a', unitA: 'dm', unitB: 'dm', unitC: 'dm', target: 'dm', ans: 5 }, // Cube SA=150 -> a=5
            { A: 52, a: 3, b: 2, c: 4, missing: 'c', unitA: 'cm', unitB: 'cm', unitC: 'cm', target: 'cm', ans: 4 }, // Prism SA=52, a=3,b=2 -> 2*(6 + 3c + 2c)=52 -> 12 + 10c = 52 -> 10c = 40 -> c=4
            { A: 24, a: 2, b: 2, c: 2, missing: 'a', unitA: 'm', unitB: 'm', unitC: 'm', target: 'm', ans: 2 }, // Cube SA=24 -> a=2
            { A: 96, a: 4, b: 4, c: 4, missing: 'a', unitA: 'cm', unitB: 'cm', unitC: 'cm', target: 'cm', ans: 4 }, // Cube SA=96 -> a=4
            { A: 112, a: 10, b: 2, c: 3, missing: 'c', unitA: 'm', unitB: 'm', unitC: 'm', target: 'm', ans: 3 }, // Prism SA=112, a=10, b=2 -> 2*(20 + 10c + 2c)=112 -> 40 + 24c = 112 -> 24c = 72 -> c=3
            { A: 40, a: 2, b: 4, c: 2, missing: 'b', unitA: 'cm', unitB: 'cm', unitC: 'cm', target: 'cm', ans: 4 }, // Prism SA=40, a=2,c=2 -> 2*(2b + 4 + 2b)=40 -> 8b + 8 = 40 -> 8b = 32 -> b=4
            { A: 72, a: 6, b: 3, c: 2, missing: 'a', unitA: 'dm', unitB: 'dm', unitC: 'dm', target: 'dm', ans: 6 }, // Prism SA=72, b=3,c=2 -> 2*(3a + 2a + 6)=72 -> 10a + 12 = 72 -> 10a = 60 -> a=6
            { A: 600, a: 10, b: 10, c: 10, missing: 'a', unitA: 'mm', unitB: 'mm', unitC: 'mm', target: 'mm', ans: 10 }, // Cube SA=600 -> a=10
            { A: 148, a: 4, b: 5, c: 6, missing: 'c', unitA: 'cm', unitB: 'cm', unitC: 'cm', target: 'cm', ans: 6 }, // Prism SA=148, a=4,b=5 -> 2*(20 + 4c + 5c)=148 -> 40 + 18c = 148 -> 18c = 108 -> c=6
        ];

        const shuffled = (diff === 'easy' ? [...easyTasks] : diff === 'medium' ? [...mediumTasks] : [...hardTasks]).sort(() => Math.random() - 0.5);

        for (let i = 0; i < 10; i++) {
            const task = shuffled[i];
            const qType: QuestionType = i < 4 ? 'multiple-choice' : i < 7 ? 'true-false' : 'input';
            
            let options: number[] | undefined;
            let isTrue: boolean | undefined;
            
            const isCube = task.a === task.b && task.b === task.c;
            const shapeType = isCube ? 'cube' : 'prism';
            const unitA = (task as any).unitA || (task as any).unit || 'cm';
            const unitB = (task as any).unitB || (task as any).unit || 'cm';
            const unitC = (task as any).unitC || (task as any).unit || 'cm';
            const targetUnit = (task as any).target || `${unitA}²`;
            const answer = task.ans;

            let questionText = `Mekkora a felszín ${targetUnit} egységben?`;
            if ((task as any).missing) {
                if (isCube) {
                    questionText = `Mekkora a kocka éle, ha a felszíne ${(task as any).A} ${targetUnit}?`;
                } else {
                    questionText = `Mekkora a hiányzó él (${(task as any).missing}) hossza, ha a felszín ${(task as any).A} ${targetUnit.replace('cm', 'cm²').replace('dm', 'dm²').replace('m', 'm²')}?`;
                }
            } else if (diff === 'medium') {
                questionText = `Mekkora a felszín ${targetUnit} egységben? (Váltsd át a mértékegységeket!)`;
            }

            if (qType === 'multiple-choice') {
                const optSet = new Set([answer]);
                while (optSet.size < 4) {
                    const factor = Math.random() > 0.5 ? 1.2 : 0.8;
                    const offset = (Math.floor(Math.random() * 10) + 1) * (Math.random() > 0.5 ? 1 : -1);
                    let alt = Math.max(1, Math.round((answer * factor + offset)));
                    if (alt === answer) alt += 2;
                    optSet.add(alt);
                }
                options = Array.from(optSet).sort(() => Math.random() - 0.5);
            } else if (qType === 'true-false') {
                isTrue = Math.random() > 0.5;
                const offset = (Math.floor(Math.random() * 5) + 1) * 2; // Even offset
                const displayVal = isTrue ? answer : Math.max(1, answer + (Math.random() > 0.5 ? offset : -offset));
                if ((task as any).missing) {
                     (task as any).displayText = `A hiányzó él hossza ${displayVal} ${targetUnit}?`;
                } else {
                     (task as any).displayText = `A felszín ${displayVal} ${targetUnit}?`;
                }
            }

            newQuestions.push({
                id: i,
                shapeType,
                questionType: qType,
                a: task.a,
                b: task.b,
                c: task.c,
                unitA,
                unitB,
                unitC,
                targetUnit,
                answer,
                text: (task as any).displayText || questionText,
                options,
                isTrue,
                missingSide: (task as any).missing,
                A: (task as any).A,
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
        if (submitted[currentIndex]) return;
        
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
            <div className="max-w-5xl mx-auto p-2 animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
                
                <div className="text-center mb-6">
                    <div className="inline-flex p-4 bg-indigo-100 rounded-3xl text-indigo-600 mb-4">
                        <Box className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 mb-2 tracking-tight">Felszínszámítás Kvíz</h1>
                    <p className="text-slate-500 font-medium text-lg">Számítsd ki a kockák és téglatestek felszínét!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { 
                            id: 'easy' as Difficulty, 
                            title: 'Könnyű', 
                            desc: 'Egyszerű egész számok, azonos mértékegységek. Alapok gyakorlása.',
                            icon: Sparkles,
                            color: 'emerald'
                        },
                        { 
                            id: 'medium' as Difficulty, 
                            title: 'Haladó', 
                            desc: 'Különböző mértékegységek! Válts át azonos mértékegységre a számolás előtt.',
                            icon: Zap,
                            color: 'sky'
                        },
                        { 
                            id: 'hard' as Difficulty, 
                            title: 'Mester', 
                            desc: 'Visszafele gondolkodás. Keresd meg a hiányzó él hosszát a felszín ismeretében.',
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
        <div className="max-w-5xl mx-auto p-2 flex flex-col">
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
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 md:p-8">
                    {/* Left Side: Illustration */}
                    <div className="md:col-span-3 flex flex-col justify-start gap-4">
                        <div className="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                             <div className="flex items-center gap-3 mb-1">
                                <Target className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Feladat</span>
                             </div>
                             <h2 className="text-lg md:text-xl font-black text-slate-800 tracking-tight leading-tight">
                                {currentQ.text}
                             </h2>
                             {difficulty === 'medium' && (
                                <p className="mt-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg w-fit">
                                    Figyelj a mértékegység-váltásra!
                                </p>
                             )}
                        </div>

                        <SurfaceAreaBox 
                            a={currentQ.a} 
                            b={currentQ.b} 
                            c={currentQ.c} 
                            unitA={currentQ.unitA}
                            unitB={currentQ.unitB}
                            unitC={currentQ.unitC}
                            missingSide={currentQ.missingSide}
                            isCube={currentQ.shapeType === 'cube'}
                        />
                    </div>

                    {/* Right Side: Interaction */}
                    <div className="md:col-span-2 flex flex-col justify-start items-center bg-slate-50/30 rounded-3xl p-6">
                        {currentQ.questionType === 'multiple-choice' && (
                            <div className="grid grid-cols-1 gap-3 w-full">
                                {currentQ.options?.map((opt, idx) => (
                                    <button
                                        key={idx} 
                                        onClick={() => handleAnswerUpdate(opt)}
                                        disabled={isSub}
                                        className={cn(
                                            "h-10 rounded-2xl text-base font-black transition-all border-2 flex items-center justify-center gap-3",
                                            userChoice === opt 
                                                ? (isSub && opt === currentQ.answer ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-200" : "bg-primary border-primary text-white shadow-lg shadow-primary/20")
                                                : "bg-white border-slate-100 hover:border-primary/30 text-slate-600 hover:shadow-md disabled:hover:border-slate-100 disabled:hover:shadow-none"
                                        )}
                                    >
                                        {opt}
                                        <span className="text-xs font-bold opacity-60">{currentQ.targetUnit}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {currentQ.questionType === 'true-false' && (
                            <div className="flex flex-col gap-4 w-full">
                                {[true, false].map((val) => (
                                    <button
                                        key={val ? 't' : 'f'} 
                                        onClick={() => handleAnswerUpdate(val)}
                                        disabled={isSub}
                                        className={cn(
                                            "flex-1 h-12 rounded-3xl border-2 flex flex-col items-center justify-center transition-all",
                                            userChoice === val
                                                ? (isSub && val === currentQ.isTrue ? "bg-emerald-500 border-emerald-500 text-white" : "bg-primary border-primary text-white")
                                                : "bg-white border-slate-100 hover:border-primary/30 text-slate-400 disabled:hover:border-slate-100"
                                        )}
                                    >
                                        {val ? <Check className="w-4 h-4 mb-0.5" /> : <XCircle className="w-4 h-4 mb-0.5" />}
                                        <span className="font-black text-sm">{val ? 'Igaz' : 'Hamis'}</span>
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
                                        disabled={isSub}
                                        className="h-10 text-xl font-black text-center pr-20 rounded-2xl border-2 border-slate-100 focus:border-primary"
                                        placeholder="..."
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-300 text-sm">{currentQ.targetUnit}</span>
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

export default SurfaceAreaQuiz;
