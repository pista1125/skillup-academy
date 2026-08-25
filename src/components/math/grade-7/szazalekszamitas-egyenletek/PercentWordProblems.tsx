import React, { useState, useEffect } from 'react';
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
    Percent
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { percentValueWordProblems } from '@/data/percentValueWordProblems';
import { percentRateWordProblems } from '@/data/percentRateWordProblems';
import { percentBaseWordProblems } from '@/data/percentBaseWordProblems';
import { PercentWordProblemSet, PercentWordProblem } from '@/data/percentValueWordProblems';

interface PercentWordProblemsProps {
    onBack: () => void;
    type: 'value' | 'rate' | 'base';
}

export function PercentWordProblems({ onBack, type }: PercentWordProblemsProps) {
    const [selectedSet, setSelectedSet] = useState<PercentWordProblemSet | null>(null);
    const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [xpEarned, setXpEarned] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

    // Determine data set and metadata based on type
    const dataSets = type === 'value' ? percentValueWordProblems :
        type === 'rate' ? percentRateWordProblems :
            percentBaseWordProblems;

    const typeLabel = type === 'value' ? 'Százalékérték' :
        type === 'rate' ? 'Százalékláb' :
            'Százalékalap';

    const typeColor = type === 'value' ? 'rose' :
        type === 'rate' ? 'emerald' :
            'blue';

    const currentProblem = selectedSet?.problems[currentProblemIndex];

    const handleSelectSet = (set: PercentWordProblemSet) => {
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
        if (!currentProblem || !userAnswer) return;

        const normalizedUserAnswer = userAnswer.replace(',', '.').trim();
        const isCorrect = parseFloat(normalizedUserAnswer) === currentProblem.answer;

        if (isCorrect) {
            setFeedback('correct');
            if (attempts === 0) {
                setScore(prev => prev + 1);
                const xp = selectedSet?.difficulty === 'easy' ? 10 : selectedSet?.difficulty === 'medium' ? 15 : 20;
                setXpEarned(prev => prev + xp);
            }

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: [type === 'value' ? '#fb7185' : type === 'rate' ? '#10b981' : '#3b82f6', '#ffffff']
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

    const renderAnswerTemplate = (template: string) => {
        const parts = template.split('{x}');
        return (
            <div className="flex flex-wrap items-center gap-2 text-xl md:text-2xl font-medium text-slate-700 bg-slate-50 p-4 md:p-6 rounded-2xl border-2 border-slate-100">
                <span>{parts[0]}</span>
                <div className="relative">
                    <Input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        disabled={feedback === 'correct'}
                        className={cn(
                            "w-24 md:w-32 text-center text-2xl font-bold h-12 md:h-14 rounded-xl border-2 transition-all",
                            feedback === 'correct' ? "bg-emerald-50 border-emerald-500 text-emerald-700" :
                                feedback === 'incorrect' ? "bg-rose-50 border-rose-500 text-rose-700 animate-shake" :
                                    "bg-white border-slate-200 focus:border-primary focus:ring-4 focus:ring-primary/10"
                        )}
                        placeholder="?"
                        onKeyDown={(e) => e.key === 'Enter' && feedback !== 'correct' && checkAnswer()}
                    />
                    {feedback === 'correct' && (
                        <div className="absolute -right-3 -top-3 bg-emerald-500 text-white p-1 rounded-full shadow-lg animate-bounce">
                            <Check className="w-4 h-4" />
                        </div>
                    )}
                </div>
                <span>{parts[1]}</span>
            </div>
        );
    };

    if (showResult && selectedSet) {
        const accuracy = Math.round((score / selectedSet.problems.length) * 100);

        return (
            <div className="max-w-2xl mx-auto animate-in fade-in zoom-in duration-500">
                <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-center relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-purple-500" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl" />

                    <div className="relative">
                        <div className="inline-flex p-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full mb-8 shadow-inner">
                            <Trophy className="w-16 h-16 text-yellow-600 animate-bounce" />
                        </div>

                        <h2 className="text-4xl font-black text-slate-900 mb-2">Gratulálunk!</h2>
                        <p className="text-slate-500 text-lg mb-10">Sikeresen teljesítetted a {selectedSet.title}-t!</p>

                        <div className="grid grid-cols-3 gap-4 mb-10">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 transition-transform hover:scale-105">
                                <div className="text-3xl font-black text-primary mb-1">{score}</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pontszám</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 transition-transform hover:scale-105">
                                <div className="text-3xl font-black text-emerald-500 mb-1">{accuracy}%</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pontosság</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 transition-transform hover:scale-105">
                                <div className="text-3xl font-black text-orange-500 mb-1">{xpEarned}</div>
                                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Szerzett XP</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                onClick={() => setSelectedSet(null)}
                                className="flex-1 h-16 rounded-2xl text-lg font-bold gap-2 shadow-lg hover:shadow-xl transition-all"
                            >
                                <RotateCcw className="w-5 h-5" />
                                Új játék
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onBack}
                                className="flex-1 h-16 rounded-2xl text-lg font-bold border-2 hover:bg-slate-50 transition-all"
                            >
                                Vissza a témákhoz
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!selectedSet) {
        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="rounded-xl hover:bg-slate-100 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Vissza
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className={cn("p-2 rounded-lg", `bg-${typeColor}-100 text-${typeColor}-600`)}>
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-black text-slate-900">{typeLabel} - Szöveges feladatok</h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {dataSets.map((set) => (
                        <button
                            key={set.id}
                            onClick={() => handleSelectSet(set)}
                            className="group relative bg-white p-8 rounded-[2rem] border-2 border-slate-100 hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all text-left overflow-hidden"
                        >
                            <div className={cn(
                                "absolute top-0 left-0 w-2 h-full transition-all group-hover:w-3",
                                set.difficulty === 'easy' ? "bg-emerald-500" :
                                    set.difficulty === 'medium' ? "bg-amber-500" : "bg-rose-500"
                            )} />

                            <div className="mb-6 flex items-center justify-between">
                                <div className={cn(
                                    "p-3 rounded-2xl group-hover:scale-110 transition-transform",
                                    set.difficulty === 'easy' ? "bg-emerald-50 text-emerald-600" :
                                        set.difficulty === 'medium' ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
                                )}>
                                    {set.difficulty === 'easy' ? <Star className="w-6 h-6" /> :
                                        set.difficulty === 'medium' ? <Medal className="w-6 h-6" /> : <Crown className="w-6 h-6" />}
                                </div>
                                <div className="flex gap-1">
                                    {[1, 2, 3].map((star) => (
                                        <Star
                                            key={star}
                                            className={cn(
                                                "w-4 h-4",
                                                star <= (set.difficulty === 'easy' ? 1 : set.difficulty === 'medium' ? 2 : 3)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-slate-200"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-slate-800 mb-2 truncate">{set.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">{set.description}</p>

                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">10 feladat</span>
                                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedSet(null)}
                        className="rounded-xl hover:bg-slate-100"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="h-10 w-[2px] bg-slate-100 hidden sm:block" />
                    <div>
                        <h3 className="font-black text-slate-900 leading-none mb-1">{selectedSet.title}</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{typeLabel}</p>
                    </div>
                </div>

                <div className="flex-1 max-w-md mx-4">
                    <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                        <span>Progressz</span>
                        <span>{currentProblemIndex + 1} / {selectedSet.problems.length}</span>
                    </div>
                    <ProgressBar
                        current={currentProblemIndex + 1}
                        total={selectedSet.problems.length}
                        variant={typeColor === 'rose' ? 'physics' : typeColor === 'emerald' ? 'success' : 'math'}
                    />
                </div>

                <XPBadge xp={xpEarned} />
            </div>

            {/* Main Content Area */}
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden relative">
                {/* Animated Background Polish */}
                <div className={cn("absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none rounded-full blur-3xl", `bg-${typeColor}-500`)} />

                <div className="p-8 md:p-12 relative">
                    <div className="flex flex-col gap-10">
                        {/* Question Section */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-600">
                                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                                {currentProblemIndex + 1}. Feladat
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 leading-tight">
                                {currentProblem.question}
                            </h2>
                        </div>

                        {/* Answer Input Section */}
                        <div className="space-y-6">
                            {renderAnswerTemplate(currentProblem.answerTemplate)}

                            {/* Feedback and Helper Buttons */}
                            <div className="flex flex-wrap items-center gap-4 py-2">
                                {feedback === null && (
                                    <Button
                                        onClick={checkAnswer}
                                        disabled={!userAnswer}
                                        className="h-14 px-10 rounded-2xl text-lg font-black shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all hover:-translate-y-1 active:translate-y-0"
                                    >
                                        Ellenőrzés
                                    </Button>
                                )}

                                {feedback === 'incorrect' && !showCorrectAnswer && (
                                    <div className="flex flex-wrap items-center gap-3 animate-in slide-in-from-left-4">
                                        <Button
                                            onClick={checkAnswer}
                                            className="h-14 px-8 rounded-2xl text-lg font-black bg-rose-500 hover:bg-rose-600"
                                        >
                                            Újra próbálom
                                        </Button>
                                        <Button
                                            variant="outline"
                                            onClick={() => setShowCorrectAnswer(true)}
                                            className="h-14 px-6 rounded-2xl font-bold border-2"
                                        >
                                            Megnézem a megoldást
                                        </Button>
                                    </div>
                                )}

                                {showCorrectAnswer && (
                                    <div className="bg-amber-50 text-amber-800 px-6 py-4 rounded-2xl border-2 border-amber-200 font-bold animate-in zoom-in">
                                        A helyes válasz: <span className="text-2xl ml-2">{currentProblem.answer}{currentProblem.suffix ? ' ' + currentProblem.suffix : ''}</span>
                                    </div>
                                )}

                                {(feedback === 'correct' || showCorrectAnswer) && (
                                    <Button
                                        onClick={nextProblem}
                                        className="h-14 px-10 rounded-2xl text-lg font-black bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 animate-in fade-in"
                                    >
                                        Következő feladat
                                        <ChevronRight className="ml-2 w-5 h-5" />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer / Helper Area */}
            <div className="flex items-center justify-between text-slate-400 px-4">
                <div className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <Percent className="w-3 h-3" />
                    Százalékszámítás Gyakorló • 7. Osztály
                </div>
                <div className="text-xs font-bold">
                    Helyes válaszok: <span className="text-emerald-500 ml-1">{score}</span>
                </div>
            </div>
        </div>
    );
}
