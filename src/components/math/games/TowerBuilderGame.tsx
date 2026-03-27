import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Trophy, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface TowerBuilderGameProps {
    onBack: () => void;
}

export function TowerBuilderGame({ onBack }: TowerBuilderGameProps) {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [towers, setTowers] = useState<{ id: number; problem: string; target: number; current: number }[]>([]);
    const [activeTowerId, setActiveTowerId] = useState<number>(0);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        generateNewRound();
    }, []);

    const generateNewRound = () => {
        // Generate two problems
        // Problem 1: Subtraction in large range (e.g., 500 - 280)
        // Problem 2: Addition (e.g., 20 + 340)

        const tower1 = generateTowerProblem(1, 'subtraction');
        const tower2 = generateTowerProblem(2, 'addition');

        setTowers([tower1, tower2]);
        setActiveTowerId(tower1.id);
        setFeedback(null);
    };

    const generateTowerProblem = (id: number, type: 'addition' | 'subtraction') => {
        let num1, num2, result, problem;

        if (type === 'subtraction') {
            // Target: A - B = Result.
            // Constraint: A up to 1000. Result >= 0.
            const a = Math.floor(Math.random() * 900) + 100; // 100-1000
            const b = Math.floor(Math.random() * a);

            let finalA = a;
            let finalB = b;

            if (Math.random() > 0.3) {
                finalA = Math.round(a / 10) * 10;
                finalB = Math.round(b / 10) * 10;
                if (finalB > finalA) finalB = finalA; // Safety
            }

            result = finalA - finalB;
            problem = `${finalA} - ${finalB}`;
        } else {
            // Addition: A + B = Result.
            // Result up to 1000.
            const target = Math.floor(Math.random() * 900) + 100;
            const a = Math.floor(Math.random() * target);

            let finalA = a;
            let finalTarget = target;

            if (Math.random() > 0.3) {
                finalTarget = Math.round(target / 10) * 10;
                finalA = Math.round(a / 10) * 10;
                if (finalA > finalTarget) finalA = finalTarget;
            }

            const finalB = finalTarget - finalA;
            result = finalTarget;
            problem = `${finalA} + ${finalB}`;
        }

        return { id, problem, target: result, current: 0 };
    };

    const updateHeight = (amount: number) => {
        setTowers(prev => prev.map(t => {
            if (t.id === activeTowerId) {
                const newVal = Math.max(0, t.current + amount);
                return { ...t, current: newVal };
            }
            return t;
        }));
    };

    const handleCheck = () => {
        const allCorrect = towers.every(t => t.current === t.target);

        if (allCorrect) {
            setFeedback('correct');
            setScore(curr => curr + 1);
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 }
            });

            setTimeout(() => {
                if (round < 10) {
                    setRound(r => r + 1);
                    generateNewRound();
                } else {
                    setIsComplete(true);
                }
            }, 2500);
        } else {
            setFeedback('wrong');
        }
    };

    const renderTowerVisuals = (value: number) => {
        const hundreds = Math.floor(value / 100);
        const tens = Math.floor((value % 100) / 10);
        const ones = value % 10;

        return (
            <div className="flex flex-col-reverse items-center w-full h-full gap-1 p-2 overflow-hidden overflow-y-auto">
                {/* Ones */}
                {Array.from({ length: ones }).map((_, i) => (
                    <div key={`one-${i}`} className="w-8 h-4 bg-yellow-400 border border-yellow-600 rounded-sm shadow-sm flex-shrink-0" />
                ))}
                {/* Tens */}
                {Array.from({ length: tens }).map((_, i) => (
                    <div key={`ten-${i}`} className="w-24 h-8 bg-blue-400 border border-blue-600 rounded-md shadow-sm flex items-center justify-center text-[10px] text-blue-900 font-bold flex-shrink-0">10</div>
                ))}
                {/* Hundreds */}
                {Array.from({ length: hundreds }).map((_, i) => (
                    <div key={`hundred-${i}`} className="w-32 h-16 bg-red-400 border border-red-600 rounded-lg shadow-sm flex items-center justify-center text-xs text-red-900 font-bold flex-shrink-0">100</div>
                ))}
            </div>
        );
    };

    if (isComplete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 animate-in fade-in zoom-in duration-500">
                <div className="p-8 bg-yellow-100 rounded-full">
                    <Trophy className="w-24 h-24 text-yellow-600" />
                </div>
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800">Gratulálunk!</h2>
                    <p className="text-xl text-slate-600 font-bold">
                        Sikeresen teljesítetted a toronyépítő kihívást!
                    </p>
                    <p className="text-3xl font-black text-indigo-600">
                        Pontszám: {score}/10
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button
                        onClick={onBack}
                        variant="outline"
                        size="lg"
                        className="text-xl font-bold h-16 px-8 rounded-2xl"
                    >
                        Kilépés
                    </Button>
                    <Button
                        onClick={() => {
                            setIsComplete(false);
                            setRound(1);
                            setScore(0);
                            generateNewRound();
                        }}
                        size="lg"
                        className="text-xl font-bold h-16 px-8 rounded-2xl bg-indigo-500 hover:bg-indigo-600"
                    >
                        Újra játszom
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between bg-white/50 backdrop-blur p-4 rounded-3xl border-4 border-white/50 shadow-sm">
                <Button variant="ghost" onClick={onBack} className="rounded-xl font-bold">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Vissza
                </Button>
                <div className="px-6 py-2 bg-indigo-100 rounded-2xl text-indigo-700 font-black text-xl">
                    {round}/10. feladat
                </div>
            </div>

            {/* Game Area */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl border-4 border-indigo-100 flex flex-col items-center gap-8">

                <h2 className="text-2xl font-black text-slate-700 text-center">
                    Oldd meg a feladatokat és építsd fel a tornyokat!
                </h2>

                {/* Towers Container */}
                <div className="flex flex-col md:flex-row gap-8 items-end justify-center w-full min-h-[400px]">
                    {towers.map((tower) => (
                        <div
                            key={tower.id}
                            className={cn(
                                "flex flex-col items-center gap-4 transition-all duration-300 p-4 rounded-3xl border-4",
                                activeTowerId === tower.id
                                    ? "bg-indigo-50 border-indigo-300 scale-105 shadow-lg"
                                    : "bg-slate-50 border-transparent hover:bg-slate-100 opacity-80"
                            )}
                            onClick={() => setActiveTowerId(tower.id)}
                        >
                            {/* Problem Display */}
                            <div className={cn(
                                "text-3xl font-black px-6 py-3 rounded-2xl border-2 transition-colors",
                                activeTowerId === tower.id
                                    ? "bg-white text-indigo-600 border-indigo-100"
                                    : "bg-slate-200 text-slate-500 border-transparent"
                            )}>
                                {tower.problem}
                            </div>

                            {/* Tower Visual */}
                            <div className="w-40 h-[400px] bg-white rounded-2xl border-2 border-slate-200 flex flex-col-reverse justify-start relative shadow-inner overflow-hidden">
                                {renderTowerVisuals(tower.current)}
                                <div className="absolute top-2 right-2 text-xs font-bold text-slate-300 bg-white/80 px-2 rounded-full">
                                    {tower.current}
                                </div>
                            </div>

                            {/* Selection Indicator */}
                            <div className={cn(
                                "w-4 h-4 rounded-full",
                                activeTowerId === tower.id ? "bg-indigo-500" : "bg-slate-300"
                            )} />
                        </div>
                    ))}
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-6 w-full max-w-2xl bg-slate-50 p-6 rounded-3xl border-2 border-slate-100">
                    <div className="grid grid-cols-6 gap-2 w-full">
                        <Button onClick={() => updateHeight(-100)} variant="outline" className="h-14 text-lg font-bold border-red-200 text-red-600 hover:bg-red-50">-100</Button>
                        <Button onClick={() => updateHeight(-10)} variant="outline" className="h-14 text-lg font-bold border-blue-200 text-blue-600 hover:bg-blue-50">-10</Button>
                        <Button onClick={() => updateHeight(-1)} variant="outline" className="h-14 text-lg font-bold border-yellow-200 text-yellow-600 hover:bg-yellow-50">-1</Button>

                        <Button onClick={() => updateHeight(1)} className="h-14 text-lg font-bold bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1">+1</Button>
                        <Button onClick={() => updateHeight(10)} className="h-14 text-lg font-bold bg-blue-400 hover:bg-blue-500 text-blue-900 border-b-4 border-blue-600 active:border-b-0 active:translate-y-1">+10</Button>
                        <Button onClick={() => updateHeight(100)} className="h-14 text-lg font-bold bg-red-400 hover:bg-red-500 text-red-900 border-b-4 border-red-600 active:border-b-0 active:translate-y-1">+100</Button>
                    </div>
                </div>

                {/* Feedback Area */}
                <div className="min-h-[80px] flex items-center justify-center w-full">
                    {feedback === 'correct' ? (
                        <div className="animate-in zoom-in duration-300 flex items-center gap-3 px-8 py-4 bg-emerald-100 text-emerald-700 rounded-2xl font-black text-xl border-4 border-emerald-200">
                            <Check className="w-8 h-8" />
                            Helyes! Mindkét torony megfelelő!
                        </div>
                    ) : feedback === 'wrong' ? (
                        <div className="text-red-500 font-bold animate-pulse text-lg bg-red-50 px-6 py-3 rounded-xl border-2 border-red-100">
                            Valami nem stimmel! Ellenőrizd a tornyok magasságát!
                        </div>
                    ) : (
                        <Button
                            size="lg"
                            onClick={handleCheck}
                            className={cn(
                                "px-12 h-16 text-2xl font-black rounded-2xl shadow-lg border-b-4 transition-all active:border-b-0 active:translate-y-1",
                                "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 shadow-emerald-500/30"
                            )}
                        >
                            Ellenőrzés
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
