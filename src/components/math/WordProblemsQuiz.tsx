import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { XPBadge } from '@/components/XPBadge';
import { ProgressBar } from '@/components/ProgressBar';
import {
    ArrowLeft,
    BookOpen,
    Check,
    Trophy,
    Star,
    Medal,
    Crown,
    ChevronRight,
    RotateCcw,
    Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { wordProblems7, WordProblemSet, WordProblem } from '@/data/wordProblems7';

interface WordProblemsQuizProps {
    onBack: () => void;
}

export function WordProblemsQuiz({ onBack }: WordProblemsQuizProps) {
    const [selectedSet, setSelectedSet] = useState<WordProblemSet | null>(null);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [xpEarned, setXpEarned] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    const handleSelectSet = (set: WordProblemSet) => {
        setSelectedSet(set);
        setCurrentProblemIndex(0);
        setUserAnswer('');
        setFeedback(null);
        setShowResult(false);
        setScore(0);
        setXpEarned(0);
        setAttempts(0);
        setShowCorrectAnswer(false);
    };

    const checkAnswer = () => {
        if (!selectedSet || !userAnswer) return;

        const currentProblem = selectedSet.problems[currentProblemIndex];
        const normalizedUserAnswer = userAnswer.replace(',', '.').trim();
        const isCorrect = parseFloat(normalizedUserAnswer) === currentProblem.answer;

        if (isCorrect) {
            setFeedback('correct');
            if (attempts === 0) {
                setScore(prev => prev + 1);
                const xp = selectedSet.difficulty === 'easy' ? 20 : selectedSet.difficulty === 'medium' ? 30 : 40;
                setXpEarned(prev => prev + xp);
            }

            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6366f1', '#a855f7', '#ffffff']
            });
        } else {
            setFeedback('incorrect');
            setAttempts(prev => prev + 1);
        }
    };

    const nextProblem = () => {
        if (!selectedSet) return;

        if (currentProblemIndex < selectedSet.problems.length - 1) {
            setCurrentProblemIndex(prev => prev + 1);
            setUserAnswer('');
            setFeedback(null);
            setAttempts(0);
            setShowCorrectAnswer(false);
        } else {
            setShowResult(true);
        }
    };

    const renderInput = (template: string, problem: WordProblem) => {
        const parts = template.split('{x}');
        return (
            <div className="flex flex-wrap items-center gap-3 text-xl md:text-3xl font-medium text-slate-700 bg-slate-50/50 p-6 md:p-10 rounded-[2.5rem] border-2 border-slate-100 shadow-inner">
                <span className="leading-relaxed">{parts[0]}</span>
                <div className="relative group">
                    <Input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => {
                            setFeedback(null);
                            setUserAnswer(e.target.value);
                        }}
                        disabled={feedback === 'correct'}
                        className={cn(
                            "w-28 md:w-40 text-center text-3xl font-black h-14 md:h-20 rounded-2xl border-4 transition-all duration-300 shadow-lg",
                            feedback === 'correct' ? "bg-emerald-50 border-emerald-500 text-emerald-700 pointer-events-none" :
                                feedback === 'incorrect' ? "bg-rose-50 border-rose-500 text-rose-700 animate-shake" :
                                    "bg-white border-slate-200 focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/10 group-hover:border-indigo-300"
                        )}
                        placeholder="?"
                        onKeyDown={(e) => e.key === 'Enter' && feedback !== 'correct' && checkAnswer()}
                    />
                    {feedback === 'correct' && (
                        <div className="absolute -right-4 -top-4 bg-emerald-500 text-white p-2 rounded-full shadow-xl animate-bounce border-2 border-white">
                            <Check className="w-5 h-5" />
                        </div>
                    )}
                </div>
                <span className="leading-relaxed">{parts[1]}</span>
            </div>
        );
    };

    if (showResult && selectedSet) {
        const accuracy = Math.round((score / selectedSet.problems.length) * 100);

        return (
            <div className="max-w-xl mx-auto py-12 animate-in fade-in zoom-in duration-700">
                <div className="bg-white rounded-[3.5rem] p-10 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                    
                    <div className="relative z-10">
                        <div className="inline-flex p-8 bg-gradient-to-br from-yellow-100 to-orange-200 rounded-full mb-10 shadow-xl border-4 border-white">
                            <Trophy className="w-20 h-20 text-yellow-600 drop-shadow-lg" />
                        </div>

                        <h2 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">Kiváló munka!</h2>
                        <p className="text-xl text-slate-500 mb-12 font-medium">Befejezted a: <span className="text-indigo-600 font-bold">{selectedSet.title}</span> feladatsort.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-inner group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                <div className="text-4xl font-black text-indigo-600 mb-2 group-hover:scale-110 transition-transform">{score}</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Pontszám</div>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-inner group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                <div className="text-4xl font-black text-emerald-500 mb-2 group-hover:scale-110 transition-transform">{accuracy}%</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Pontosság</div>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-inner group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                                <div className="text-4xl font-black text-orange-500 mb-2 group-hover:scale-110 transition-transform">{xpEarned}</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Szerzett XP</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Button
                                onClick={() => setSelectedSet(null)}
                                className="flex-1 h-20 rounded-3xl text-xl font-black gap-3 shadow-2xl shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-1 bg-indigo-600"
                            >
                                <RotateCcw className="w-6 h-6" />
                                Újabb szint
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onBack}
                                className="flex-1 h-20 rounded-3xl text-xl font-black border-4 hover:bg-slate-50 transition-all hover:-translate-y-1"
                            >
                                Kilépés
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!selectedSet) {
        return (
            <div className="space-y-12 py-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-xl tracking-tight">Szöveges egyenletek</h1>
                        <p className="text-white/80 text-lg font-medium">Válaszd ki a neked megfelelő nehézségi szintet!</p>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="rounded-2xl h-14 px-8 bg-white/10 hover:bg-white/20 text-white font-bold backdrop-blur-md border border-white/20 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5 mr-3" />
                        Vissza
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {wordProblems7.map((set) => (
                        <button
                            key={set.id}
                            onClick={() => handleSelectSet(set)}
                            className="group relative bg-white p-10 rounded-[3rem] border-4 border-transparent hover:border-white shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden flex flex-col text-left"
                        >
                            <div className={cn(
                                "absolute inset-0 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity",
                                set.difficulty === 'easy' ? "bg-emerald-600" :
                                    set.difficulty === 'medium' ? "bg-amber-600" : "bg-rose-600"
                            )} />
                            
                            <div className={cn(
                                "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500",
                                set.difficulty === 'easy' ? "bg-emerald-100 text-emerald-600" :
                                    set.difficulty === 'medium' ? "bg-amber-100 text-amber-600" : "bg-rose-100 text-rose-600"
                            )}>
                                {set.difficulty === 'easy' ? <Star className="w-8 h-8" /> :
                                    set.difficulty === 'medium' ? <Medal className="w-8 h-8" /> : <Crown className="w-8 h-8" />}
                            </div>

                            <div className="flex gap-1 mb-4">
                                {[1, 2, 3].map((star) => (
                                    <Star
                                        key={star}
                                        className={cn(
                                            "w-5 h-5",
                                            star <= (set.difficulty === 'easy' ? 1 : set.difficulty === 'medium' ? 2 : 3)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-slate-200"
                                        )}
                                    />
                                ))}
                            </div>

                            <h3 className="text-3xl font-black text-slate-800 mb-3 tracking-tight">{set.title}</h3>
                            <p className="text-slate-500 text-lg leading-relaxed mb-auto group-hover:text-slate-600 transition-colors">{set.description}</p>

                            <div className="mt-10 flex items-center justify-between">
                                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">10 Feladat</span>
                                <div className={cn(
                                    "w-14 h-14 rounded-full flex items-center justify-center shadow-lg group-hover:translate-x-2 transition-all duration-500",
                                    set.difficulty === 'easy' ? "bg-emerald-500 text-white" :
                                        set.difficulty === 'medium' ? "bg-amber-500 text-white" : "bg-rose-500 text-white"
                                )}>
                                    <ChevronRight className="w-7 h-7" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const currentProblem = selectedSet.problems[currentProblemIndex];

    return (
        <div className="max-w-5xl mx-auto py-4 space-y-4 animate-in fade-in duration-500">
            {/* Top Navigation Bar */}
            <div className="bg-white/80 backdrop-blur-2xl p-6 rounded-[2.5rem] shadow-2xl border border-white/50 flex flex-wrap items-center justify-between gap-6 transition-all">
                <div className="flex items-center gap-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedSet(null)}
                        className="rounded-2xl hover:bg-slate-100 h-14 w-14 group"
                    >
                        <ArrowLeft className="w-6 h-6 text-slate-600 group-hover:text-indigo-600 group-hover:-translate-x-1 transition-all" />
                    </Button>
                    <div className="h-10 w-[2px] bg-slate-100 hidden sm:block" />
                    <div>
                        <h3 className="font-black text-2xl text-slate-900 tracking-tight leading-none mb-1">{selectedSet.title}</h3>
                        <div className="flex items-center gap-2">
                             <div className={cn(
                                "w-2 h-2 rounded-full animate-pulse",
                                selectedSet.difficulty === 'easy' ? "bg-emerald-500" :
                                    selectedSet.difficulty === 'medium' ? "bg-amber-500" : "bg-rose-500"
                             )} />
                             <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">{selectedSet.difficulty === 'easy' ? 'Alapszint' : selectedSet.difficulty === 'medium' ? 'Középszint' : 'Haladó'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-md mx-4 hidden md:block">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3 px-1">
                        <span>Haladás</span>
                        <span>{currentProblemIndex + 1} / {selectedSet.problems.length}</span>
                    </div>
                    <ProgressBar
                        current={currentProblemIndex + 1}
                        total={selectedSet.problems.length}
                        variant="math"
                    />
                </div>

                <XPBadge xp={xpEarned} />
            </div>

            {/* Main Question Card */}
            <div className="bg-white rounded-[3.5rem] shadow-[0_48px_80px_-16px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500 opacity-[0.02] rounded-full -mr-40 -mt-40 blur-3xl pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 opacity-[0.02] rounded-full -ml-40 -mb-40 blur-3xl pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000" />

                <div className="p-6 md:p-10 relative z-10">
                    <div className="flex flex-col gap-4">
                        {/* Question */}
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-indigo-50 rounded-2xl text-sm font-black text-indigo-600 shadow-sm border border-indigo-100">
                                <Zap className="w-5 h-5 fill-indigo-600" />
                                {currentProblemIndex + 1}. FELADAT
                            </div>
                            <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-[1.3] tracking-tight">
                                {currentProblem.question}
                            </h2>
                        </div>

                        {/* Input Area */}
                        <div className="space-y-4">
                            {renderInput(currentProblem.answerTemplate, currentProblem)}

                            <div className="flex flex-wrap items-center gap-6 min-h-[4.5rem]">
                                {feedback === null && (
                                    <Button
                                        onClick={checkAnswer}
                                        disabled={!userAnswer}
                                        className="h-14 px-14 rounded-[1.5rem] text-xl font-black shadow-2xl shadow-indigo-200 hover:shadow-indigo-300 transition-all hover:-translate-y-1 active:translate-y-0 bg-indigo-600 disabled:opacity-50 disabled:translate-y-0"
                                    >
                                        Ellenőrzés
                                    </Button>
                                )}

                                {feedback === 'incorrect' && !showCorrectAnswer && (
                                    <div className="flex flex-wrap items-center gap-4 animate-in slide-in-from-left-6 duration-300">
                                        <Button
                                            onClick={checkAnswer}
                                            className="h-14 px-12 rounded-[1.5rem] text-xl font-black bg-rose-500 hover:bg-rose-600 shadow-xl shadow-rose-200"
                                        >
                                            Újra próbálom
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowCorrectAnswer(true)}
                                            className="h-14 px-10 rounded-[1.5rem] text-lg font-bold border-4 hover:bg-slate-50 transition-all shadow-lg"
                                        >
                                            Megoldás mutatása
                                        </Button>
                                    </div>
                                )}

                                {showCorrectAnswer && (
                                    <div className="bg-amber-50 text-amber-900 px-10 py-6 rounded-[2rem] border-4 border-amber-200 font-black text-xl animate-in zoom-in shadow-lg">
                                        A helyes válasz: <span className="text-3xl text-amber-600 ml-4 font-black">{currentProblem.answer}{currentProblem.suffix ? ' ' + currentProblem.suffix : ''}</span>
                                    </div>
                                )}

                                {(feedback === 'correct' || showCorrectAnswer) && (
                                    <Button
                                        onClick={nextProblem}
                                        className="h-20 px-14 rounded-[1.5rem] text-xl font-black bg-emerald-500 hover:bg-emerald-600 shadow-2xl shadow-emerald-200 animate-in fade-in flex items-center gap-4 group"
                                    >
                                        Következő feladat
                                        <ChevronRight className="w-7 h-7 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Keyboard shortcuts / Meta Info */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-10 opacity-40 hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-6">
                    <div className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 text-slate-500">
                        <kbd className="px-2 py-1 bg-white border border-slate-200 rounded-lg text-[10px] shadow-sm font-sans">Enter</kbd>
                        <span>Ellenőrzés</span>
                    </div>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    DIÁKZÓNA INTELLECT • Szöveges Egyenletek Module v1.0
                </div>
            </div>
        </div>
    );
}
