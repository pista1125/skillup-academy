import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, RefreshCw, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface BuildingBlocksComparisonProps {
    onBack: () => void;
}

export function BuildingBlocksComparison({ onBack }: BuildingBlocksComparisonProps) {
    const [round, setRound] = useState(1);
    const [score, setScore] = useState(0);
    const [targetLeft, setTargetLeft] = useState(0);
    const [targetRight, setTargetRight] = useState(0);
    const [blocksLeft, setBlocksLeft] = useState(0);
    const [blocksRight, setBlocksRight] = useState(0);
    const [selectedOperator, setSelectedOperator] = useState<'<' | '>' | '=' | null>(null);
    const [feedback, setFeedback] = useState<'correct' | 'wrong-blocks' | 'wrong-operator' | null>(null);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        generateNewRound();
    }, []);

    const generateNewRound = () => {
        // Generate two different numbers between 1 and 20 to make it interesting
        // Allowing 0 is also fine but building 0 blocks is trivial, let's stick to 1-20 for now or 0-20 is fine.
        const left = Math.floor(Math.random() * 21);
        let right = Math.floor(Math.random() * 21);

        // Ensure they aren't always equal, but sometimes they can be
        setTargetLeft(left);
        setTargetRight(right);
        setBlocksLeft(0);
        setBlocksRight(0);
        setSelectedOperator(null);
        setFeedback(null);
    };

    const handleCheck = () => {
        const isBlocksCorrect = blocksLeft === targetLeft && blocksRight === targetRight;

        let correctOperator = '=';
        if (targetLeft < targetRight) correctOperator = '<';
        if (targetLeft > targetRight) correctOperator = '>';

        const isOperatorCorrect = selectedOperator === correctOperator;

        if (!isBlocksCorrect) {
            setFeedback('wrong-blocks');
            return;
        }

        if (!isOperatorCorrect) {
            setFeedback('wrong-operator');
            return;
        }

        // Success
        setFeedback('correct');
        setScore(curr => curr + 1);
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        setTimeout(() => {
            if (round < 10) {
                setRound(r => r + 1);
                generateNewRound();
            } else {
                setIsComplete(true);
            }
        }, 2000);
    };

    const BlockColumn = ({
        count,
        target,
        setCount,
        colorClass
    }: {
        count: number,
        target: number,
        setCount: (n: number) => void,
        colorClass: string
    }) => {
        return (
            <div className="flex flex-col items-center gap-4">
                <div className="text-4xl font-black text-slate-700 mb-2">{target}</div>

                <div
                    className="w-24 h-[400px] bg-slate-100 rounded-2xl flex flex-col-reverse justify-start p-2 gap-1 cursor-pointer border-4 border-slate-200 hover:border-slate-300 transition-colors relative"
                    onClick={() => {
                        if (count < 20) setCount(count + 1);
                    }}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        if (count > 0) setCount(count - 1);
                    }}
                >
                    {/* Helper text/guide */}
                    {count === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-bold text-center p-2 select-none pointer-events-none">
                            Kattints ide az építéshez!
                        </div>
                    )}

                    {Array.from({ length: count }).map((_, i) => (
                        <div
                            key={i}
                            className={cn(
                                "w-full h-[6%] rounded-md shadow-sm border-b-2 border-black/10 animate-in zoom-in duration-300",
                                colorClass
                            )}
                        />
                    ))}
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-500"
                        onClick={() => setCount(Math.max(0, count - 1))}
                        disabled={count === 0}
                    >
                        -
                    </Button>
                    <div className="w-8 text-center font-bold self-center text-xl text-slate-600">{count}</div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full bg-slate-200 hover:bg-emerald-100 hover:text-emerald-500"
                        onClick={() => setCount(Math.min(20, count + 1))}
                        disabled={count >= 20}
                    >
                        +
                    </Button>
                </div>
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
                    <h2 className="text-4xl font-black text-slate-800">Szép munka!</h2>
                    <p className="text-xl text-slate-600 font-bold">
                        Ügyesen összehasonlítottad a számokat!
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
        <div className="max-w-4xl mx-auto p-4 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between bg-white/50 backdrop-blur p-4 rounded-3xl border-4 border-white/50 shadow-sm">
                <Button variant="ghost" onClick={onBack} className="rounded-xl font-bold">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Vissza
                </Button>
                <div className="flex items-center gap-8">
                    <div className="px-6 py-2 bg-indigo-100 rounded-2xl text-indigo-700 font-black text-xl">
                        {round}/10. feladat
                    </div>
                </div>
            </div>

            {/* Game Area */}
            <div className="bg-white p-8 rounded-[40px] shadow-xl border-4 border-indigo-100 relative overflow-hidden">
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-black text-slate-700 mb-2">
                        1. Építsd fel a tornyokat!
                    </h2>
                    <p className="text-slate-500 font-bold">
                        2. Válaszd ki a megfelelő jelet!
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    {/* Left Tower */}
                    <BlockColumn
                        count={blocksLeft}
                        target={targetLeft}
                        setCount={setBlocksLeft}
                        colorClass="bg-red-400 border-red-500"
                    />

                    {/* Operator Selection */}
                    <div className="flex flex-col gap-4 z-10">
                        <div className="flex flex-col gap-2 bg-slate-100 p-2 rounded-2xl">
                            {(['<', '=', '>'] as const).map(op => (
                                <button
                                    key={op}
                                    onClick={() => setSelectedOperator(op)}
                                    className={cn(
                                        "w-16 h-16 rounded-xl text-3xl font-black transition-all transform hover:scale-105 active:scale-95 border-b-4",
                                        selectedOperator === op
                                            ? "bg-indigo-500 text-white border-indigo-700 shadow-lg shadow-indigo-500/30"
                                            : "bg-white text-slate-700 border-slate-300 hover:border-indigo-300"
                                    )}
                                >
                                    {op}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Tower */}
                    <BlockColumn
                        count={blocksRight}
                        target={targetRight}
                        setCount={setBlocksRight}
                        colorClass="bg-blue-400 border-blue-500"
                    />
                </div>

                {/* Feedback & Actions */}
                <div className="mt-12 flex justify-center">
                    {feedback === 'correct' ? (
                        <div className="animate-in zoom-in duration-300 flex items-center gap-3 px-8 py-4 bg-emerald-100 text-emerald-700 rounded-2xl font-black text-xl border-4 border-emerald-200">
                            <Check className="w-8 h-8" />
                            Helyes válasz!
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-4">
                            {feedback === 'wrong-blocks' && (
                                <div className="text-red-500 font-bold animate-pulse">
                                    Építsd fel pontosan a tornyokat!
                                </div>
                            )}
                            {feedback === 'wrong-operator' && (
                                <div className="text-red-500 font-bold animate-pulse">
                                    Rossz jelet választottál! Próbáld újra!
                                </div>
                            )}
                            <Button
                                size="lg"
                                onClick={handleCheck}
                                disabled={selectedOperator === null}
                                className={cn(
                                    "h-16 px-12 text-2xl font-black rounded-2xl shadow-lg border-b-4 transition-all active:border-b-0 active:translate-y-1",
                                    selectedOperator
                                        ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-700 shadow-emerald-500/30"
                                        : "bg-slate-200 text-slate-400 border-slate-300"
                                )}
                            >
                                Ellenőrzés
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
