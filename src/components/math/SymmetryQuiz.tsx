import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ChevronRight,
    Trophy,
    RefreshCcw,
    ArrowLeft,
    MousePointer2,
    CheckCircle2,
    XCircle,
    Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface SymmetryProblem {
    id: number;
    title: string;
    description: string;
    originalPath: string; // SVG path
    axis: 'v' | 'h'; // vertical or horizontal axis
    options: string[]; // paths for options
    correctIndex: number;
}

const SYMMETRY_DATA: SymmetryProblem[] = [
    {
        id: 1,
        title: "Háromszög tükrözése",
        description: "Válaszd ki a háromszög függőleges tengelyre vonatkozó tükörképét!",
        originalPath: "M 30,20 L 70,50 L 30,80 Z",
        axis: 'v',
        options: [
            "M 70,20 L 30,50 L 70,80 Z", // Correct (v-flipped)
            "M 30,20 L 70,50 L 30,80 Z", // Original (translated)
            "M 30,80 L 70,50 L 30,20 Z", // h-flipped
            "M 20,30 L 50,70 L 80,30 Z", // rotated 90
        ],
        correctIndex: 0
    },
    {
        id: 2,
        title: "L-alak",
        description: "Keresd meg az 'L' alakzat vízszintes tengelyre vonatkozó tükörképét!",
        originalPath: "M 40,20 V 80 H 70 V 70 H 50 V 20 Z",
        axis: 'h',
        options: [
            "M 40,80 V 20 H 70 V 30 H 50 V 80 Z", // Correct (h-flipped)
            "M 70,20 V 80 H 40 V 70 H 60 V 20 Z", // v-flipped
            "M 40,20 V 80 H 70 V 70 H 50 V 20 Z", // Original
            "M 20,40 H 80 V 70 H 30 V 50 H 20 Z", // rotated
        ],
        correctIndex: 0
    },
    {
        id: 3,
        title: "Zászló",
        description: "Válaszd ki a zászló függőleges tengelyre vonatkozó tükörképét!",
        originalPath: "M 40,20 V 80 M 40,20 L 70,35 L 40,50",
        axis: 'v',
        options: [
            "M 60,20 V 80 M 60,20 L 30,35 L 60,50", // Correct (v-flipped)
            "M 40,20 V 80 M 40,20 L 70,35 L 40,50", // Original
            "M 40,80 V 20 M 40,80 L 70,65 L 40,50", // h-flipped
            "M 60,80 V 20 M 60,80 L 30,65 L 60,50", // rotated 180
        ],
        correctIndex: 0
    },
    {
        id: 4,
        title: "Traféz",
        description: "Melyik a trapéz vízszintes tengelyre vonatkozó tükörképe?",
        originalPath: "M 30,30 H 70 L 60,60 H 40 Z",
        axis: 'h',
        options: [
            "M 30,30 H 70 L 80,60 H 20 Z", // wrong shape
            "M 30,70 H 70 L 60,40 H 40 Z", // Correct (h-flipped relative to center y=50)
            "M 70,30 H 30 L 40,60 H 60 Z", // v-flipped
            "M 40,40 H 60 L 70,70 H 30 Z", // translated
        ],
        correctIndex: 1
    },
    {
        id: 5,
        title: "Nyíl",
        description: "Keresd meg a nyíl függőleges tengelyre vonatkozó tükörképét!",
        originalPath: "M 20,40 H 60 V 30 L 85,50 L 60,70 V 60 H 20 Z",
        axis: 'v',
        options: [
            "M 20,40 H 60 V 30 L 85,50 L 60,70 V 60 H 20 Z", // Original
            "M 80,40 H 40 V 30 L 15,50 L 40,70 V 60 H 80 Z", // Correct (v-flipped)
            "M 20,60 H 60 V 70 L 85,50 L 60,30 V 40 H 20 Z", // h-flipped
            "M 40,20 V 60 H 30 L 50,85 L 70,60 H 60 V 20 Z", // rotated 90
        ],
        correctIndex: 1
    },
    {
        id: 6,
        title: "Pipa alakzat",
        description: "Válaszd ki a vízszintes tengelyre vonatkozó tükörképet!",
        originalPath: "M 30,50 L 45,65 L 75,35",
        axis: 'h',
        options: [
            "M 30,50 L 15,35 L 45,65", // wrong
            "M 70,50 L 55,65 L 25,35", // v-flipped
            "M 30,50 L 45,35 L 75,65", // Correct (h-flipped)
            "M 30,50 L 45,65 L 75,35", // Original
        ],
        correctIndex: 2
    },
    {
        id: 7,
        title: "Csésze",
        description: "Válaszd ki a csésze függőleges tengelyre vonatkozó tükörképét!",
        originalPath: "M 30,30 H 60 V 60 H 30 Z M 60,40 H 75 V 50 H 60",
        axis: 'v',
        options: [
            "M 70,30 H 40 V 60 H 70 Z M 40,40 H 25 V 50 H 40", // Correct (v-flipped)
            "M 30,30 H 60 V 60 H 30 Z M 60,40 H 75 V 50 H 60", // Original
            "M 30,70 H 60 V 40 H 30 Z M 60,60 H 75 V 50 H 60", // h-flipped
            "M 40,30 H 70 V 60 H 40 Z M 70,40 H 85 V 50 H 70", // translated
        ],
        correctIndex: 0
    },
    {
        id: 8,
        title: "Ék",
        description: "Melyik a vízszintes tengelyre vonatkozó tükörkép?",
        originalPath: "M 20,20 L 80,40 L 20,45 Z",
        axis: 'h',
        options: [
            "M 80,20 L 20,40 L 80,45 Z", // v-flipped
            "M 20,80 L 80,60 L 20,55 Z", // Correct (h-flipped)
            "M 20,20 L 80,40 L 20,45 Z", // Original
            "M 20,20 L 40,80 L 45,20 Z", // rotated
        ],
        correctIndex: 1
    },
    {
        id: 9,
        title: "Lépcső",
        description: "Válaszd ki a függőleges tengelyre vonatkozó tükörképet!",
        originalPath: "M 30,70 V 50 H 50 V 30 H 70 V 70 Z",
        axis: 'v',
        options: [
            "M 30,70 V 50 H 50 V 30 H 70 V 70 Z", // Original
            "M 70,70 V 50 H 50 V 30 H 30 V 70 Z", // Correct (v-flipped)
            "M 30,30 V 50 H 50 V 70 H 70 V 30 Z", // h-flipped
            "M 70,30 V 50 H 50 V 70 H 30 V 30 Z", // rotated 180
        ],
        correctIndex: 1
    },
    {
        id: 10,
        title: "Összetett alakzat",
        description: "Válaszd ki a függőleges tengelyre vonatkozó tükörképet!",
        originalPath: "M 40,30 L 60,30 L 70,50 L 60,70 L 40,70 L 30,50 Z M 60,50 H 80",
        axis: 'v',
        options: [
            "M 60,30 L 40,30 L 30,50 L 40,70 L 60,70 L 70,50 Z M 40,50 H 20", // Correct (v-flipped)
            "M 40,30 L 60,30 L 70,50 L 60,70 L 40,70 L 30,50 Z M 60,50 H 80", // Original
            "M 40,70 L 60,70 L 70,50 L 60,30 L 40,30 L 30,50 Z M 60,50 H 80", // h-flipped
            "M 40,30 L 60,30 L 70,50 L 60,70 L 40,70 L 30,50 Z M 30,50 H 10", // wrong translation
        ],
        correctIndex: 0
    }
];

export function SymmetryQuiz({ onBack }: { onBack: () => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const problem = SYMMETRY_DATA[currentStep];

    const handleOptionSelect = (index: number) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);
        const correct = index === problem.correctIndex;
        setIsCorrect(correct);
        if (correct) {
            setScore(s => s + 1);
        }
    };

    const nextStep = () => {
        if (currentStep < SYMMETRY_DATA.length - 1) {
            setCurrentStep(s => s + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            setShowResults(true);
            if (score >= 8) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#10b981', '#3b82f6', '#f59e0b']
                });
            }
        }
    };

    const restart = () => {
        setCurrentStep(0);
        setScore(0);
        setShowResults(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    if (showResults) {
        return (
            <Card className="p-8 text-center space-y-6 max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border-green-100 shadow-2xl rounded-[2rem] animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-200">
                    <Trophy className="w-12 h-12 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Gratulálunk!</h2>
                    <p className="text-slate-500 font-medium">Sikeresen teljesítetted a tükrözés tesztet!</p>
                </div>

                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 italic text-slate-600">
                    <p className="text-4xl font-black text-green-600 mb-1">{score} / {SYMMETRY_DATA.length}</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Pontszám</p>
                </div>

                <div className="flex gap-4">
                    <Button onClick={restart} className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-2xl py-6 font-bold shadow-lg shadow-green-200 transition-all hover:scale-105">
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Újrapróbálom
                    </Button>
                    <Button variant="outline" onClick={onBack} className="flex-1 border-2 border-slate-200 rounded-2xl py-6 font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Vissza a témákhoz
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm px-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-100">
                        {currentStep + 1}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800">{problem.title}</h2>
                        <div className="flex gap-1 mt-1">
                            {SYMMETRY_DATA.map((_, i) => (
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
                    Kilépés
                </Button>
            </div>

            <Card className="p-8 bg-white/90 backdrop-blur-xl border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                    <Info className="w-32 h-32 text-indigo-900" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-widest border border-indigo-100">
                            <MousePointer2 className="w-3.5 h-3.5" />
                            Megfigyelés és döntés
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 leading-tight">
                            {problem.description}
                        </h3>

                        <div className="relative bg-slate-50 rounded-[2rem] p-8 border-2 border-slate-100 flex items-center justify-center min-h-[220px]">
                            <svg viewBox="0 0 100 100" className="w-40 h-40 drop-shadow-md">
                                <path
                                    d={problem.originalPath}
                                    fill="none"
                                    stroke="#6366f1"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                {/* Symmetry Axis */}
                                {problem.axis === 'v' ? (
                                    <line x1="95" y1="5" x2="95" y2="95" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                                ) : (
                                    <line x1="5" y1="95" x2="95" y2="95" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                                )}
                            </svg>
                            <div className="absolute bottom-4 right-6 text-[10px] font-black text-red-500 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-red-100 shadow-sm">
                                Tükörtengely
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {problem.options.map((optPath, idx) => (
                            <button
                                key={idx}
                                disabled={selectedOption !== null}
                                onClick={() => handleOptionSelect(idx)}
                                className={cn(
                                    "relative p-4 rounded-3xl border-2 transition-all duration-300 flex items-center justify-center bg-white aspect-square hover:scale-[1.03] active:scale-95 group",
                                    selectedOption === idx
                                        ? (idx === problem.correctIndex ? "border-green-500 bg-green-50 shadow-lg shadow-green-100" : "border-red-500 bg-red-50 shadow-lg shadow-red-100")
                                        : "border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50"
                                )}
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                                    <path
                                        d={optPath}
                                        fill={selectedOption === idx ? (idx === problem.correctIndex ? "#dcfce7" : "#fee2e2") : "#f8fafc"}
                                        stroke={selectedOption === idx ? (idx === problem.correctIndex ? "#22c55e" : "#ef4444") : "#94a3b8"}
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-colors duration-300"
                                    />
                                </svg>

                                {selectedOption === idx && (
                                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center animate-in zoom-in duration-300">
                                        {idx === problem.correctIndex ? (
                                            <div className="bg-green-500 w-full h-full rounded-full flex items-center justify-center text-white">
                                                <CheckCircle2 className="w-5 h-5" />
                                            </div>
                                        ) : (
                                            <div className="bg-red-500 w-full h-full rounded-full flex items-center justify-center text-white">
                                                <XCircle className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </button>
                        ))}
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
                                    <p className="font-bold text-green-700">Kitűnő választás! Pontosan ez a tükörkép.</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                                        <XCircle className="w-6 h-6" />
                                    </div>
                                    <p className="font-bold text-red-700">Hoppá, ez nem a helyes tükörkép. Figyeld a tengelyt!</p>
                                </>
                            )}
                        </div>
                        <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-8 shadow-lg shadow-indigo-100 font-bold group">
                            {currentStep === SYMMETRY_DATA.length - 1 ? 'Befejezés' : 'Következő'}
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
