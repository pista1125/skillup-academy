import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ChevronRight,
    Trophy,
    RefreshCcw,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Target,
    Zap,
    Circle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface VennProblem {
    id: string;
    description: string;
    shadedRegions: string[]; // 'A', 'B', 'AB', 'outside'
    correctAnswer: string;
    options: string[];
}

const VENN_QUIZ_DATA: VennProblem[] = [
    {
        id: 'a',
        description: "Hogyan mondanád el, mi van kiszínezve?",
        shadedRegions: ['A', 'AB'],
        correctAnswer: "Benne van az A-ban",
        options: [
            "Benne van az A-ban",
            "Benne van a B-ben",
            "Mindkettőben benne van",
            "Egyikben sincs benne"
        ]
    },
    {
        id: 'b',
        description: "És ezt hogyan neveznéd?",
        shadedRegions: ['B', 'AB'],
        correctAnswer: "Benne van a B-ben",
        options: [
            "Benne van az A-ban",
            "Benne van a B-ben",
            "Csak az A-ban van benne",
            "Mindkettőben benne van"
        ]
    },
    {
        id: 'c',
        description: "Mit látsz itt kiszínezve?",
        shadedRegions: ['AB'],
        correctAnswer: "Benne van az A-ban és a B-ben is",
        options: [
            "Benne van az A-ban",
            "Benne van a B-ben",
            "Benne van az A-ban és a B-ben is",
            "Benne van az A-ban vagy a B-ben"
        ]
    },
    {
        id: 'd',
        description: "Mi van itt összesen kiszínezve?",
        shadedRegions: ['A', 'B', 'AB'],
        correctAnswer: "Benne van az A-ban vagy a B-ben",
        options: [
            "Benne van az A-ban és a B-ben is",
            "Benne van az A-ban vagy a B-ben",
            "Csak az egyikben van benne",
            "Egyikben sincs benne"
        ]
    },
    {
        id: 'e',
        description: "Vajon ez mit jelent?",
        shadedRegions: ['outside'],
        correctAnswer: "Egyikben sincs benne",
        options: [
            "Mindkettőben benne van",
            "Benne van az A-ban vagy a B-ben",
            "Egyikben sincs benne",
            "Csak az egyikben van benne"
        ]
    },
    {
        id: 'f',
        description: "Hogyan mondanád ezt el pontosan?",
        shadedRegions: ['A'],
        correctAnswer: "Benne van az A-ban, de nincs benne a B-ben",
        options: [
            "Benne van az A-ban",
            "Benne van az A-ban és a B-ben is",
            "Benne van az A-ban, de nincs benne a B-ben",
            "Mindkettőben benne van"
        ]
    },
    {
        id: 'g',
        description: "És ezt hogyan fogalmaznád meg?",
        shadedRegions: ['B'],
        correctAnswer: "Benne van a B-ben, de nincs benne az A-ban",
        options: [
            "Benne van a B-ben",
            "Benne van az A-ban vagy a B-ben",
            "Benne van a B-ben, de nincs benne az A-ban",
            "Egyikben sincs benne"
        ]
    },
    {
        id: 'h',
        description: "Ezt hogyan mondanád a diákoknak?",
        shadedRegions: ['A', 'B'],
        correctAnswer: "Csak az egyikben van benne",
        options: [
            "Mindkettőben benne van",
            "Benne van az A-ban és a B-ben is",
            "Csak az egyikben van benne",
            "Benne van az A-ban vagy a B-ben"
        ]
    }
];

export function VennInterpretationQuiz({ onBack }: { onBack: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const problems = VENN_QUIZ_DATA;
    const problem = problems[currentStep];

    const randomizedOptions = useMemo(() => {
        if (!problem) return [];
        const indices = [0, 1, 2, 3];
        return indices.sort(() => Math.random() - 0.5);
    }, [problem]);

    const handleOptionSelect = (index: number) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);
        const correct = problem.options[index] === problem.correctAnswer;
        setIsCorrect(correct);
        if (correct) {
            setScore(s => s + 1);
        }
    };

    const nextStep = () => {
        if (currentStep < problems.length - 1) {
            setCurrentStep(s => s + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setShowResults(true);
            if (score >= 6) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#6366f1', '#10b981', '#f59e0b']
                });
            }
        }
    };

    if (showResults) {
        return (
            <Card className="p-8 text-center space-y-6 max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border-indigo-100 shadow-2xl rounded-[2rem] animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
                    <Trophy className="w-12 h-12 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Szép munka!</h2>
                    <p className="text-slate-500 font-medium text-lg">Már profi vagy a Venn-diagramok leírásában!</p>
                </div>

                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 italic text-slate-600">
                    <p className="text-4xl font-black text-indigo-600 mb-1">{score} / {problems.length}</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Helyes válasz</p>
                </div>

                <div className="flex gap-4">
                    <Button onClick={() => {
                        setCurrentStep(0);
                        setScore(0);
                        setShowResults(false);
                        setSelectedOption(null);
                        setIsCorrect(null);
                    }} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-6 font-bold shadow-lg shadow-indigo-200 transition-all hover:scale-105">
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Újra
                    </Button>
                    <Button variant="outline" onClick={onBack} className="flex-1 border-2 border-slate-200 rounded-2xl py-6 font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kilépés
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm px-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg bg-indigo-500">
                        {currentStep + 1}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800">Hogy mondanád?</h2>
                        <div className="flex gap-1 mt-1">
                            {problems.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300",
                                        i === currentStep ? "w-6 bg-indigo-500" :
                                            i < currentStep ? "w-2 bg-green-400" : "w-2 bg-slate-200"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <Button variant="ghost" onClick={onBack} className="rounded-xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza
                </Button>
            </div>

            <Card className="p-8 bg-white/90 backdrop-blur-xl border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border bg-indigo-50 text-indigo-600 border-indigo-100">
                            <Zap className="w-3.5 h-3.5" />
                            Megfigyelés
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 leading-tight">
                            {problem.description}
                        </h3>

                        {/* Venn Diagram Display */}
                        <div className="relative bg-slate-50 rounded-[2rem] p-8 border-2 border-slate-100 flex items-center justify-center min-h-[220px]">
                            <svg viewBox="0 0 200 120" className="w-64 h-40 drop-shadow-lg">
                                {/* Universal Set Frame */}
                                <rect x="5" y="5" width="190" height="110" rx="10" fill={problem.shadedRegions.includes('outside') ? '#f43f5e33' : 'white'} stroke="#334155" strokeWidth="2" />

                                {/* Shaded Regions */}
                                <defs>
                                    <clipPath id="clipA">
                                        <circle cx="75" cy="60" r="40" />
                                    </clipPath>
                                    <clipPath id="clipB">
                                        <circle cx="125" cy="60" r="40" />
                                    </clipPath>
                                    <clipPath id="clipIntersection">
                                        <circle cx="125" cy="60" r="40" />
                                    </clipPath>
                                </defs>

                                {/* Base Circles */}
                                <circle cx="75" cy="60" r="40" fill={problem.shadedRegions.includes('A') || (problem.shadedRegions.includes('AB') && problem.shadedRegions.includes('A')) ? '#f43f5e' : 'transparent'} className="transition-colors duration-500" />
                                <circle cx="125" cy="60" r="40" fill={problem.shadedRegions.includes('B') || (problem.shadedRegions.includes('AB') && problem.shadedRegions.includes('B')) ? '#f43f5e' : 'transparent'} className="transition-colors duration-500" />

                                {/* Intersection Highlight */}
                                {problem.shadedRegions.includes('AB') && (
                                    <g clipPath="url(#clipA)">
                                        <circle cx="125" cy="60" r="40" fill="#f43f5e" />
                                    </g>
                                )}

                                {/* Outlines */}
                                <circle cx="75" cy="60" r="40" fill="none" stroke="#334155" strokeWidth="2" />
                                <circle cx="125" cy="60" r="40" fill="none" stroke="#334155" strokeWidth="2" />

                                {/* Labels */}
                                <text x="50" y="35" fontSize="12" fontWeight="bold" fill="#334155">A</text>
                                <text x="145" y="35" fontSize="12" fontWeight="bold" fill="#334155">B</text>
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-3">
                        {randomizedOptions.map((actualIdx) => {
                            const option = problem.options[actualIdx];
                            const isSelected = selectedOption === actualIdx;
                            const isRight = option === problem.correctAnswer;

                            return (
                                <button
                                    key={actualIdx}
                                    disabled={selectedOption !== null}
                                    onClick={() => handleOptionSelect(actualIdx)}
                                    className={cn(
                                        "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between group",
                                        isSelected
                                            ? (isRight ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50")
                                            : "border-slate-100 bg-white hover:border-indigo-200 hover:shadow-lg"
                                    )}
                                >
                                    <span className={cn(
                                        "font-bold transition-colors",
                                        isSelected ? (isRight ? "text-green-700" : "text-red-700") : "text-slate-600"
                                    )}>
                                        {option}
                                    </span>
                                    {isSelected && (
                                        <div className="flex-shrink-0 ml-4">
                                            {isRight ? (
                                                <CheckCircle2 className="w-6 h-6 text-green-500 animate-in zoom-in duration-300" />
                                            ) : (
                                                <XCircle className="w-6 h-6 text-red-500 animate-in zoom-in duration-300" />
                                            )}
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {selectedOption !== null && (
                    <div className="mt-10 flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-3">
                            {isCorrect ? (
                                <>
                                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <p className="font-bold text-green-700">Így van! Pontosan ezt látjuk a diagramon. ✨</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                                        <XCircle className="w-6 h-6" />
                                    </div>
                                    <p className="font-bold text-red-700">Majdnem! A helyes megfogalmazás: "{problem.correctAnswer}"</p>
                                </>
                            )}
                        </div>
                        <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-8 shadow-lg shadow-indigo-100 font-bold group">
                            {currentStep === problems.length - 1 ? 'Befejezés' : 'Következő'}
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
