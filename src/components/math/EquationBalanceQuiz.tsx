import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
    ArrowLeft, 
    CheckCircle2, 
    XCircle, 
    Scale, 
    Trophy,
    ChevronRight,
    ChevronLeft,
    Lightbulb,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface EquationTask {
    lx: number; // Left side x coefficient
    lc: number; // Left side constant
    rx: number; // Right side x coefficient
    rc: number; // Right side constant
    solution: number;
}

interface Level {
    id: string;
    name: string;
    description: string;
    tasks: EquationTask[];
    color: string;
}

const LEVELS: Level[] = [
    {
        id: 'easy',
        name: 'Könnyű',
        description: 'Egyszerű egyenletek: x + a = b',
        color: 'emerald',
        tasks: [
            { lx: 1, lc: 5, rx: 0, rc: 12, solution: 7 },
            { lx: 1, lc: 8, rx: 0, rc: 20, solution: 12 },
            { lx: 1, lc: 15, rx: 0, rc: 25, solution: 10 },
            { lx: 1, lc: 7, rx: 0, rc: 15, solution: 8 },
            { lx: 1, lc: 12, rx: 0, rc: 30, solution: 18 },
            { lx: 1, lc: 3, rx: 0, rc: 11, solution: 8 },
            { lx: 1, lc: 9, rx: 0, rc: 22, solution: 13 },
            { lx: 1, lc: 20, rx: 0, rc: 45, solution: 25 },
            { lx: 1, lc: 6, rx: 0, rc: 18, solution: 12 },
            { lx: 1, lc: 14, rx: 0, rc: 28, solution: 14 },
        ]
    },
    {
        id: 'medium',
        name: 'Közepes',
        description: 'Többlépéses egyenletek: ax + b = c',
        color: 'blue',
        tasks: [
            { lx: 2, lc: 4, rx: 0, rc: 14, solution: 5 },
            { lx: 3, lc: 5, rx: 0, rc: 20, solution: 5 },
            { lx: 2, lc: 10, rx: 0, rc: 30, solution: 10 },
            { lx: 4, lc: 2, rx: 0, rc: 22, solution: 5 },
            { lx: 3, lc: 9, rx: 0, rc: 30, solution: 7 },
            { lx: 5, lc: 5, rx: 0, rc: 30, solution: 5 },
            { lx: 2, lc: 15, rx: 0, rc: 35, solution: 10 },
            { lx: 3, lc: 6, rx: 0, rc: 21, solution: 5 },
            { lx: 4, lc: 10, rx: 0, rc: 50, solution: 10 },
            { lx: 2, lc: 8, rx: 0, rc: 24, solution: 8 },
        ]
    },
    {
        id: 'hard',
        name: 'Mester',
        description: 'Változó mindkét oldalon: ax + b = cx + d',
        color: 'purple',
        tasks: [
            { lx: 3, lc: 2, rx: 1, rc: 12, solution: 5 },
            { lx: 4, lc: 5, rx: 2, rc: 15, solution: 5 },
            { lx: 5, lc: 2, rx: 2, rc: 14, solution: 4 },
            { lx: 3, lc: 10, rx: 2, rc: 20, solution: 10 },
            { lx: 6, lc: 4, rx: 3, rc: 19, solution: 5 },
            { lx: 4, lc: 8, rx: 1, rc: 23, solution: 5 },
            { lx: 5, lc: 3, rx: 3, rc: 13, solution: 5 },
            { lx: 7, lc: 2, rx: 4, rc: 17, solution: 5 },
            { lx: 3, lc: 15, rx: 1, rc: 27, solution: 6 },
            { lx: 4, lc: 12, rx: 2, rc: 32, solution: 10 },
        ]
    }
];

export function EquationBalanceQuiz({ onBack }: { onBack?: () => void }) {
    const [currentLevelIdx, setCurrentLevelIdx] = useState<number | null>(null);
    const [currentTaskIdx, setCurrentTaskIdx] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showSolution, setShowSolution] = useState(false);
    const [score, setScore] = useState(0);

    const level = currentLevelIdx !== null ? LEVELS[currentLevelIdx] : null;
    const task = level ? level.tasks[currentTaskIdx] : null;

    const handleLevelSelect = (idx: number) => {
        setCurrentLevelIdx(idx);
        setCurrentTaskIdx(0);
        setUserAnswer('');
        setIsCorrect(null);
        setShowSolution(false);
        setScore(0);
    };

    const handleCheck = () => {
        if (!task) return;
        const numericAnswer = parseFloat(userAnswer.replace(',', '.'));
        if (numericAnswer === task.solution) {
            setIsCorrect(true);
            setScore(prev => prev + 1);
            toast.success('Helyes válasz! Szép munka!', {
                icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            });
        } else {
            setIsCorrect(false);
            toast.error('Sajnos nem jó. Próbáld újra!', {
                icon: <XCircle className="w-5 h-5 text-rose-500" />
            });
        }
    };

    const handleNext = () => {
        if (currentTaskIdx < 9) {
            setCurrentTaskIdx(prev => prev + 1);
            setUserAnswer('');
            setIsCorrect(null);
            setShowSolution(false);
        } else {
            // Level complete
            toast.success('Gratulálok! Teljesítetted a szintet!', {
                duration: 5000,
                icon: <Trophy className="w-6 h-6 text-amber-500" />
            });
            setCurrentLevelIdx(null);
        }
    };

    const formatEquation = (t: EquationTask) => {
        const formatSide = (x: number, c: number) => {
            let parts = [];
            if (x !== 0) parts.push(x === 1 ? 'x' : `${x}x`);
            if (c !== 0) {
                if (parts.length > 0) parts.push(c > 0 ? `+ ${c}` : `- ${Math.abs(c)}`);
                else parts.push(c);
            }
            return parts.length === 0 ? '0' : parts.join(' ');
        };
        return `${formatSide(t.lx, t.lc)} = ${formatSide(t.rx, t.rc)}`;
    };

    // Scale Visualizer Items
    const renderScaleItems = (x: number, c: number) => {
        const items = [];
        // X boxes
        for (let i = 0; i < x; i++) {
            items.push(
                <div key={`x-${i}`} className="w-8 h-8 md:w-10 md:h-10 bg-amber-500 border-2 border-amber-700 rounded-lg shadow-md flex items-center justify-center text-white font-black text-sm md:text-base transform animate-in zoom-in-50 duration-300">
                    x
                </div>
            );
        }
        // Weights
        let remaining = Math.abs(c);
        const isNeg = c < 0;
        
        while (remaining >= 10) {
            items.push(
                <div key={`w10-${remaining}`} className="w-10 h-10 md:w-12 md:h-12 bg-purple-500 border-2 border-purple-700 rounded-full shadow-md flex items-center justify-center text-white font-bold text-xs md:text-sm animate-in zoom-in-50 duration-300">
                    10
                </div>
            );
            remaining -= 10;
        }
        while (remaining >= 5) {
            items.push(
                <div key={`w5-${remaining}`} className="w-8 h-8 md:w-10 md:h-10 bg-indigo-500 border-2 border-indigo-700 rounded-full shadow-md flex items-center justify-center text-white font-bold text-xs md:text-sm animate-in zoom-in-50 duration-300">
                    5
                </div>
            );
            remaining -= 5;
        }
        while (remaining >= 1) {
            items.push(
                <div key={`w1-${remaining}`} className="w-6 h-6 md:w-8 md:h-8 bg-blue-500 border-2 border-blue-700 rounded-full shadow-md flex items-center justify-center text-white font-bold text-[10px] md:text-xs animate-in zoom-in-50 duration-300">
                    1
                </div>
            );
            remaining -= 1;
        }
        
        return items;
    };

    if (currentLevelIdx === null) {
        return (
            <div className="max-w-4xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-12">
                    <div className="w-20 min-h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-indigo-200">
                        <Scale className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">Egyenlet Megoldás</h1>
                    <p className="text-slate-500 max-w-lg mx-auto font-medium">
                        Válaszd ki a nehézségi szintet, és oldd meg az egyenleteket a mérlegelv segítségével!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {LEVELS.map((level, idx) => (
                        <button
                            key={level.id}
                            onClick={() => handleLevelSelect(idx)}
                            className={cn(
                                "group relative overflow-hidden p-8 rounded-[2.5rem] border-2 transition-all hover:scale-105 active:scale-95 text-left",
                                level.color === 'emerald' ? "bg-emerald-50 border-emerald-100 hover:border-emerald-300" :
                                level.color === 'blue' ? "bg-blue-50 border-blue-100 hover:border-blue-300" :
                                "bg-purple-50 border-purple-100 hover:border-purple-300"
                            )}
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:rotate-12",
                                level.color === 'emerald' ? "bg-emerald-500 text-white" :
                                level.color === 'blue' ? "bg-blue-500 text-white" :
                                "bg-purple-500 text-white"
                            )}>
                                <Target className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">{level.name}</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">{level.description}</p>
                            <div className="mt-6 flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className={cn(
                                    level.color === 'emerald' ? "text-emerald-600" :
                                    level.color === 'blue' ? "text-blue-600" :
                                    "text-purple-600"
                                )}>Kezdés</span>
                                <ChevronRight className={cn(
                                    "w-4 h-4",
                                    level.color === 'emerald' ? "text-emerald-500" :
                                    level.color === 'blue' ? "text-blue-500" :
                                    "text-purple-500"
                                )} />
                            </div>
                        </button>
                    ))}
                </div>

                {onBack && (
                    <div className="mt-12 text-center">
                        <Button variant="ghost" onClick={onBack} className="rounded-2xl text-slate-400 hover:text-slate-600">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Vissza a témakörökhöz
                        </Button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto py-6 px-4 flex flex-col h-full min-h-[600px] animate-in fade-in duration-500">
            {/* Quiz Header */}
            <div className="flex items-center justify-between mb-6">
                <Button variant="ghost" onClick={() => setCurrentLevelIdx(null)} className="rounded-xl px-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Szintek
                </Button>
                <div className="flex items-center gap-4 bg-white/50 backdrop-blur-md px-6 py-2 rounded-2xl border border-white shadow-sm">
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400">Haladás</div>
                    <div className="flex gap-1.5">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div 
                                key={i}
                                className={cn(
                                    "w-2.5 h-2.5 rounded-full transition-all duration-500",
                                    i < currentTaskIdx ? "bg-emerald-500 scale-110" : 
                                    i === currentTaskIdx ? "bg-indigo-500 scale-125 shadow-md shadow-indigo-200" : 
                                    "bg-slate-200"
                                )}
                            />
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-3 bg-amber-50 px-5 py-2 rounded-2xl border border-amber-100 shadow-sm">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span className="text-lg font-black text-amber-700">{score} / 10</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
                {/* Scale Visual Section */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    <Card className="flex-1 bg-gradient-to-b from-slate-50 to-white overflow-hidden border-none shadow-xl rounded-[3rem] relative p-8 flex flex-col items-center justify-center">
                        {/* THE SCALE SVG */}
                        <div className="relative w-full max-w-3xl aspect-[16/9] flex items-center justify-center">
                            {/* Base */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[60px] border-b-slate-300" />
                            
                            {/* Beam */}
                            <div className="absolute bottom-[60px] w-full h-3 bg-slate-400 rounded-full shadow-inner flex items-center justify-center">
                                {/* Center Pivot */}
                                <div className="w-5 h-5 bg-slate-600 rounded-full border-2 border-white" />
                                
                                {/* Left Plate Container */}
                                <div className="absolute left-[10%] bottom-3 flex flex-col-reverse items-center w-64 translate-x-[-20%]">
                                    <div className="w-1 h-12 bg-slate-300" />
                                    <div className="w-full min-h-[140px] bg-white/80 backdrop-blur-sm rounded-t-3xl border-b-[6px] border-indigo-400 shadow-lg p-4 flex flex-wrap gap-2 items-end justify-center content-end">
                                        {task && renderScaleItems(task.lx, task.lc)}
                                    </div>
                                </div>
                                
                                {/* Right Plate Container */}
                                <div className="absolute right-[10%] bottom-3 flex flex-col-reverse items-center w-64 translate-x-[20%]">
                                    <div className="w-1 h-12 bg-slate-300" />
                                    <div className="w-full min-h-[140px] bg-white/80 backdrop-blur-sm rounded-t-3xl border-b-[6px] border-indigo-400 shadow-lg p-4 flex flex-wrap gap-2 items-end justify-center content-end">
                                        {task && renderScaleItems(task.rx, task.rc)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Equation Box Overlay */}
                        <div className="mt-12 px-10 py-5 bg-white rounded-[2rem] shadow-2xl border-4 border-indigo-500/20 text-4xl font-black text-slate-800 tracking-tight font-mono animate-in zoom-in-95 duration-500">
                            {task && formatEquation(task)}
                        </div>
                    </Card>
                </div>

                {/* Input Section */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <Card className="p-8 rounded-[3rem] shadow-xl border-none bg-white flex flex-col gap-8">
                        <div className="space-y-4">
                            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                                <Lightbulb className="w-6 h-6 text-amber-500" />
                                Megoldás:
                            </h3>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-black text-slate-300 group-focus-within:text-indigo-500 transition-colors">x =</div>
                                <Input
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    disabled={isCorrect === true}
                                    onKeyDown={(e) => e.key === 'Enter' && !isCorrect && handleCheck()}
                                    className="h-20 md:h-24 w-full pl-20 pr-8 text-4xl font-black text-indigo-600 bg-slate-50 border-none rounded-3xl focus:ring-4 focus:ring-indigo-100 transition-all font-mono shadow-inner"
                                    placeholder="?"
                                />
                            </div>
                        </div>

                        {!isCorrect && (
                            <Button 
                                onClick={handleCheck}
                                disabled={!userAnswer}
                                className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl text-xl font-black shadow-xl shadow-indigo-200 transition-all active:scale-95 border-none"
                            >
                                Ellenőrzés
                            </Button>
                        )}

                        {isCorrect && (
                            <div className="space-y-6 animate-in zoom-in-95 fade-in duration-500">
                                <div className="bg-emerald-50 p-6 rounded-[2rem] border-2 border-emerald-100 flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <div className="text-center">
                                        <div className="text-emerald-800 font-black text-xl">Helyes Válasz!</div>
                                        <div className="text-emerald-600 font-bold text-lg">x = {task?.solution}</div>
                                    </div>
                                </div>
                                <Button 
                                    onClick={handleNext}
                                    className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-3xl text-xl font-black shadow-xl shadow-emerald-100 transition-all active:scale-95 border-none flex items-center justify-center gap-3"
                                >
                                    Következő feladat
                                    <ChevronRight className="w-6 h-6" />
                                </Button>
                            </div>
                        )}

                        {isCorrect === false && (
                            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3 animate-shake">
                                <XCircle className="w-6 h-6 text-rose-500" />
                                <span className="text-rose-700 font-bold text-sm">Sajnos próbáld újra! Ellenőrizd a modelleket!</span>
                            </div>
                        )}

                        {/* Tip Box */}
                        <div className="mt-auto p-6 bg-amber-50/50 rounded-3xl border border-amber-100/50">
                            <p className="text-xs text-amber-700 font-medium italic leading-relaxed">
                                <b>Tipp:</b> A mérlegelv lényege, hogy amit az egyik oldallal csinálsz, azt a másikkal is meg kell tenned, hogy az egyensúly megmaradjon! Cél, hogy az egyik oldalon csak 'x' maradjon.
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
