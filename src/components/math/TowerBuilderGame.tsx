import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, RefreshCw, Trophy, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface TowerBuilderGameProps {
    onBack: () => void;
}

interface TowerData {
    id: number;
    problem: string;
    targetValue: number;
    currentValue: number;
}

export function TowerBuilderGame({ onBack }: TowerBuilderGameProps) {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [towers, setTowers] = useState<TowerData[]>([]);
    const [activeTowerId, setActiveTowerId] = useState<number>(1);
    const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        generateNewRound();
    }, []);

    const generateNewRound = () => {
        const generateProblem = (id: number): TowerData => {
            const type = Math.random() > 0.5 ? 'add' : 'sub';
            let a, b, target, problem;

            if (type === 'add') {
                target = Math.floor(Math.random() * 901) + 10; // 10-910
                a = Math.floor(Math.random() * (target - 5)) + 1;
                b = target - a;
                problem = `${a} + ${b}`;
            } else {
                a = Math.floor(Math.random() * 801) + 100; // 100-900
                b = Math.floor(Math.random() * (a - 10)) + 5;
                target = a - b;
                problem = `${a} - ${b}`;
            }

            return { id, problem, targetValue: target, currentValue: 0 };
        };

        setTowers([generateProblem(1), generateProblem(2)]);
        setActiveTowerId(1);
        setFeedback(null);
    };

    const handleUpdateValue = (delta: number) => {
        setTowers(prev => prev.map(t =>
            t.id === activeTowerId
                ? { ...t, currentValue: Math.max(0, Math.min(1000, t.currentValue + delta)) }
                : t
        ));
    };

    const handleCheck = () => {
        const allCorrect = towers.every(t => t.currentValue === t.targetValue);

        if (allCorrect) {
            setFeedback('correct');
            setScore(curr => curr + 1);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });

            setTimeout(() => {
                if (round < 5) {
                    setRound(r => r + 1);
                    generateNewRound();
                } else {
                    setIsComplete(true);
                }
            }, 2500);
        } else {
            setFeedback('wrong');
            setTimeout(() => setFeedback(null), 2000);
        }
    };

    const renderTowerBlocks = (value: number) => {
        const hundreds = Math.floor(value / 100);
        const tens = Math.floor((value % 100) / 10);
        const ones = value % 10;

        const blocks = [];

        // Hundreds: Large red blocks
        for (let i = 0; i < hundreds; i++) {
            blocks.push(
                <div
                    key={`h-${i}`}
                    className="w-full h-8 bg-red-500 border-b-4 border-red-700 rounded-lg shadow-inner animate-in slide-in-from-bottom duration-300"
                />
            );
        }

        // Tens: Medium blue blocks
        for (let i = 0; i < tens; i++) {
            blocks.push(
                <div
                    key={`t-${i}`}
                    className="w-4/5 h-4 bg-blue-500 border-b-2 border-blue-700 rounded-md shadow-inner animate-in slide-in-from-bottom duration-300 mx-auto"
                />
            );
        }

        // Ones: Small yellow blocks
        for (let i = 0; i < ones; i++) {
            blocks.push(
                <div
                    key={`o-${i}`}
                    className="w-1/2 h-2 bg-yellow-400 border-b border-yellow-600 rounded-sm shadow-inner animate-in slide-in-from-bottom duration-300 mx-auto"
                />
            );
        }

        return blocks.reverse(); // Reverse so latest blocks are on top visually? 
        // Wait, flex-col-reverse handles the order. We want them in order of priority.
        // If we use flex-col-reverse, the first item in the array is at the bottom.
        // So 100s first (bottom), then 10s, then 1s (top).
    };

    if (isComplete) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 animate-in fade-in zoom-in duration-500">
                <div className="p-8 bg-yellow-100 rounded-full">
                    <Trophy className="w-24 h-24 text-yellow-600" />
                </div>
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800">Fantasztikus!</h2>
                    <p className="text-xl text-slate-600 font-bold">
                        Mesterien építed a tornyokat és számolod a százasokat!
                    </p>
                    <p className="text-3xl font-black text-indigo-600">
                        Pontszám: {score}/5
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button onClick={onBack} variant="outline" size="lg" className="text-xl font-bold h-16 px-8 rounded-2xl">
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
            <div className="flex items-center justify-between bg-white/80 backdrop-blur p-4 rounded-3xl border-4 border-white shadow-sm">
                <Button variant="ghost" onClick={onBack} className="rounded-xl font-bold">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Vissza
                </Button>
                <div className="flex items-center gap-8">
                    <div className="px-6 py-2 bg-indigo-100 rounded-2xl text-indigo-700 font-black text-xl">
                        {round}/5. feladat
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-[40px] shadow-2xl border-4 border-indigo-100 relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-stretch justify-center gap-12 min-h-[500px]">
                    {towers.map(tower => (
                        <div
                            key={tower.id}
                            onClick={() => setActiveTowerId(tower.id)}
                            className={cn(
                                "flex-1 flex flex-col items-center gap-4 p-6 rounded-[32px] transition-all cursor-pointer relative",
                                activeTowerId === tower.id
                                    ? "bg-indigo-50/50 ring-4 ring-indigo-200"
                                    : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
                            )}
                        >
                            <div className="absolute top--4 -translate-y-1/2 bg-white px-6 py-2 rounded-2xl border-4 border-indigo-100 shadow-md z-10">
                                <span className="text-2xl font-black text-indigo-600 tracking-wider">
                                    {tower.problem}
                                </span>
                            </div>

                            <div className="w-full flex-1 flex flex-col-reverse justify-start items-center p-4 gap-1 bg-white/50 rounded-2xl border-b-8 border-slate-200 min-h-[300px]">
                                {renderTowerBlocks(tower.currentValue)}
                                {tower.currentValue === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-bold text-center p-8 select-none pointer-events-none">
                                        Válaszd ki a tornyot és kezdj el építeni!
                                    </div>
                                )}
                            </div>

                            <div className="text-3xl font-black text-slate-700">
                                {tower.currentValue}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 space-y-6">
                    <div className="flex flex-wrap justify-center gap-4">
                        <div className="flex gap-2 p-2 bg-red-50 rounded-2xl border-2 border-red-100">
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateValue(-100)}
                                className="w-16 h-16 rounded-xl border-2 border-red-200 bg-white text-red-600 hover:bg-red-500 hover:text-white font-black text-xl"
                            >
                                -100
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateValue(100)}
                                className="w-16 h-16 rounded-xl border-2 border-red-200 bg-white text-red-600 hover:bg-red-500 hover:text-white font-black text-xl"
                            >
                                +100
                            </Button>
                        </div>

                        <div className="flex gap-2 p-2 bg-blue-50 rounded-2xl border-2 border-blue-100">
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateValue(-10)}
                                className="w-16 h-16 rounded-xl border-2 border-blue-200 bg-white text-blue-600 hover:bg-blue-500 hover:text-white font-black text-xl"
                            >
                                -10
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateValue(10)}
                                className="w-16 h-16 rounded-xl border-2 border-blue-200 bg-white text-blue-600 hover:bg-blue-500 hover:text-white font-black text-xl"
                            >
                                +10
                            </Button>
                        </div>

                        <div className="flex gap-2 p-2 bg-yellow-50 rounded-2xl border-2 border-yellow-100">
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateValue(-1)}
                                className="w-16 h-16 rounded-xl border-2 border-yellow-200 bg-white text-yellow-600 hover:bg-yellow-400 hover:text-white font-black text-xl"
                            >
                                -1
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => handleUpdateValue(1)}
                                className="w-16 h-16 rounded-xl border-2 border-yellow-200 bg-white text-yellow-600 hover:bg-yellow-400 hover:text-white font-black text-xl"
                            >
                                +1
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        {feedback === 'correct' ? (
                            <div className="animate-in zoom-in duration-300 flex items-center gap-3 px-12 py-5 bg-emerald-100 text-emerald-700 rounded-3xl font-black text-2xl border-4 border-emerald-200 shadow-lg shadow-emerald-100">
                                <Check className="w-10 h-10" />
                                Tökéletes!
                            </div>
                        ) : feedback === 'wrong' ? (
                            <div className="animate-in shake items-center gap-3 px-12 py-5 bg-rose-100 text-rose-700 rounded-3xl font-black text-2xl border-4 border-rose-200 shadow-lg shadow-rose-100">
                                Valami nem stimmel... Próbáld újra!
                            </div>
                        ) : (
                            <Button
                                size="lg"
                                onClick={handleCheck}
                                className="h-20 px-24 text-3xl font-black rounded-3xl shadow-xl border-b-8 transition-all active:border-b-0 active:translate-y-2 bg-emerald-500 hover:bg-emerald-600 border-emerald-700 text-white"
                            >
                                Ellenőrzés
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
