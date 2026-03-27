import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, BookOpen, Check, Trophy, Star, ChevronRight, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { wordProblems6, ProblemSet, WordProblem } from '@/data/wordProblems6';
import confetti from 'canvas-confetti';
import { XPBadge } from '@/components/XPBadge';

interface WordProblemsModuleProps {
    onBack: () => void;
}

export function WordProblemsModule({ onBack }: WordProblemsModuleProps) {
    const [selectedSet, setSelectedSet] = useState<ProblemSet | null>(null);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [score, setScore] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [xp, setXp] = useState(0);

    const handleSelectSet = (set: ProblemSet) => {
        setSelectedSet(set);
        setCurrentProblemIndex(0);
        setUserAnswer('');
        setFeedback(null);
        setScore(0);
        setIsComplete(false);
    };

    const checkAnswer = () => {
        if (!selectedSet) return;

        const problem = selectedSet.problems[currentProblemIndex];
        const numAnswer = parseFloat(userAnswer.replace(',', '.')); // Handle decimal comma

        if (numAnswer === problem.answer) {
            setFeedback('correct');
            setScore(prev => prev + 1);
            setXp(prev => prev + 20); // 20 XP per correct word problem

            if (currentProblemIndex === selectedSet.problems.length - 1) {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 }
                });
                setTimeout(() => setIsComplete(true), 1500);
            } else {
                setTimeout(() => {
                    setCurrentProblemIndex(prev => prev + 1);
                    setUserAnswer('');
                    setFeedback(null);
                }, 1500);
            }
        } else {
            setFeedback('incorrect');
        }
    };

    const handleRetry = () => {
        if (selectedSet) handleSelectSet(selectedSet);
    };

    const handleBackToMenu = () => {
        setSelectedSet(null);
        setScore(0);
    };

    if (isComplete && selectedSet) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 animate-in fade-in zoom-in duration-500">
                <div className="p-8 bg-yellow-100 rounded-full">
                    <Trophy className="w-24 h-24 text-yellow-600" />
                </div>
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800">Teszt Befejezve!</h2>
                    <p className="text-xl text-slate-600 font-bold">
                        Sikeresen megoldottad a feladatokat!
                    </p>
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-3xl font-black text-indigo-600">
                            Pontszám: {score}/{selectedSet.problems.length}
                        </p>
                        <XPBadge xp={score * 20} />
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button
                        onClick={handleBackToMenu}
                        variant="outline"
                        size="lg"
                        className="text-xl font-bold h-16 px-8 rounded-2xl"
                    >
                        Vissza a menübe
                    </Button>
                    <Button
                        onClick={handleRetry}
                        size="lg"
                        className="text-xl font-bold h-16 px-8 rounded-2xl bg-indigo-500 hover:bg-indigo-600"
                    >
                        <RotateCcw className="w-6 h-6 mr-2" />
                        Újra
                    </Button>
                </div>
            </div>
        );
    }

    if (selectedSet) {
        const problem = selectedSet.problems[currentProblemIndex];

        return (
            <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-right duration-500">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button variant="ghost" onClick={handleBackToMenu}>
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Menü
                    </Button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                        <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                        <span className="font-bold text-slate-700">
                            {currentProblemIndex + 1} / {selectedSet.problems.length}
                        </span>
                    </div>
                    <XPBadge xp={xp} />
                </div>

                {/* Problem Card */}
                <div className="bg-white p-8 rounded-[32px] shadow-xl border-4 border-slate-100">
                    <div className="flex items-center gap-3 mb-6 text-indigo-600 font-bold uppercase tracking-wider text-sm">
                        <BookOpen className="w-5 h-5" />
                        {selectedSet.id.replace('set-', '')}. Feladatsor
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 leading-relaxed mb-8">
                        {problem.question}
                    </h3>

                    <div className="space-y-4">
                        <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                            Válaszod:
                        </label>
                        <div className="flex gap-4">
                            <Input
                                type="number"
                                value={userAnswer}
                                onChange={(e) => {
                                    setFeedback(null);
                                    setUserAnswer(e.target.value);
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                placeholder="Írd ide a számot..."
                                className={cn(
                                    "h-16 text-2xl font-bold rounded-2xl border-2 transition-all",
                                    feedback === 'correct' ? "border-emerald-500 bg-emerald-50 text-emerald-700" :
                                        feedback === 'incorrect' ? "border-red-500 bg-red-50 text-red-700" :
                                            "border-slate-200 focus:border-indigo-500"
                                )}
                            />
                            {problem.suffix && (
                                <div className="flex items-center px-6 bg-slate-100 rounded-2xl font-bold text-slate-600 text-lg">
                                    {problem.suffix}
                                </div>
                            )}
                        </div>

                        {feedback === 'incorrect' && (
                            <div className="flex items-center gap-2 text-red-500 font-bold animate-pulse">
                                Helytelen válasz! Próbáld újra!
                            </div>
                        )}

                        {feedback === 'correct' && (
                            <div className="flex items-center gap-2 text-emerald-600 font-bold animate-in slide-in-from-left">
                                <Check className="w-6 h-6" /> Helyes!
                            </div>
                        )}

                        <Button
                            onClick={checkAnswer}
                            size="lg"
                            className={cn(
                                "w-full h-16 text-xl font-black rounded-2xl mt-4 transition-all",
                                feedback === 'correct' ? "bg-emerald-500 hover:bg-emerald-600" : "bg-indigo-600 hover:bg-indigo-700"
                            )}
                            disabled={!userAnswer}
                        >
                            {feedback === 'correct' ? 'Következő' : 'Ellenőrzés'}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-8">
                <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Vissza a témakörökhöz
                </Button>
                <h1 className="text-3xl font-black text-white drop-shadow-md">
                    Szöveges Feladatok
                </h1>
                <div className="w-24" /> {/* Spacer */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {wordProblems6.map((set, index) => (
                    <button
                        key={set.id}
                        onClick={() => handleSelectSet(set)}
                        className="group relative flex flex-col p-8 bg-white rounded-[40px] shadow-lg border-4 border-white hover:border-indigo-300 transition-all hover:-translate-y-1 hover:shadow-2xl text-left overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <span className="text-9xl font-black text-indigo-900">
                                {index + 1}
                            </span>
                        </div>

                        <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-8 h-8" />
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 mb-2 pr-8 z-10">
                            {set.title}
                        </h3>

                        <p className="text-slate-500 font-medium mb-8 z-10">
                            {set.description}
                        </p>

                        <div className="mt-auto flex items-center text-indigo-600 font-bold group-hover:translate-x-2 transition-transform">
                            Teszt indítása <ChevronRight className="w-5 h-5 ml-1" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
