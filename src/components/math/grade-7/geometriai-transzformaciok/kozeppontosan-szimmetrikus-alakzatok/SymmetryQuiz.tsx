import { useState, useMemo } from 'react';
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
    Info,
    Zap,
    Skull,
    Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'medium' | 'hard';

interface SymmetryProblem {
    id: number;
    title: string;
    description: string;
    type: 'path' | 'emoji';
    content: string; // SVG path or emoji character
    axisAngle: number; // 0 = vertical, 90 = horizontal, etc.
    options: string[]; // paths or emojis
    correctIndex: number;
}

const SYMMETRY_DATA: Record<Difficulty, SymmetryProblem[]> = {
    easy: [
        {
            id: 1,
            title: "Háromszög tükrözése",
            description: "Válaszd ki a háromszög függőleges tengelyre vonatkozó tükörképét!",
            type: 'path',
            content: "M 30,20 L 70,50 L 30,80 Z",
            axisAngle: 0,
            options: [
                "M 70,20 L 30,50 L 70,80 Z",
                "M 30,20 L 70,50 L 30,80 Z",
                "M 30,80 L 70,50 L 30,20 Z",
                "M 20,30 L 50,70 L 80,30 Z",
            ],
            correctIndex: 0
        },
        {
            id: 2,
            title: "L-alak",
            description: "Keresd meg az 'L' alakzat vízszintes tengelyre vonatkozó tükörképét!",
            type: 'path',
            content: "M 40,20 V 80 H 70 V 70 H 50 V 20 Z",
            axisAngle: 90,
            options: [
                "M 40,80 V 20 H 70 V 30 H 50 V 80 Z",
                "M 70,20 V 80 H 40 V 70 H 60 V 20 Z",
                "M 40,20 V 80 H 70 V 70 H 50 V 20 Z",
                "M 20,40 H 80 V 70 H 30 V 50 H 20 Z",
            ],
            correctIndex: 0
        },
        {
            id: 3,
            title: "Pipa alakzat",
            description: "Válaszd ki a vízszintes tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 30,50 L 45,65 L 75,35",
            axisAngle: 90,
            options: [
                "M 30,50 L 15,35 L 45,65",
                "M 70,50 L 55,65 L 25,35",
                "M 30,50 L 45,35 L 75,65",
                "M 30,50 L 45,65 L 75,35",
            ],
            correctIndex: 2
        },
        {
            id: 4,
            title: "T-alak",
            description: "Válaszd ki a T-alak függőleges tengelyre vonatkozó tükörképét!",
            type: 'path',
            content: "M 30,20 H 70 V 40 H 55 V 80 H 45 V 40 H 30 Z",
            axisAngle: 0,
            options: [
                "M 30,20 H 70 V 40 H 55 V 80 H 45 V 40 H 30 Z",
                "M 70,20 H 30 V 40 H 45 V 80 H 55 V 40 H 70 Z",
                "M 30,80 H 70 V 60 H 55 V 20 H 45 V 60 H 30 Z",
                "M 20,30 V 70 H 40 V 55 H 80 V 45 H 40 V 30 Z",
            ],
            correctIndex: 1
        },
        {
            id: 5,
            title: "Nyíl",
            description: "Melyik a nyíl vízszintes tengelyre vonatkozó tükörképe?",
            type: 'path',
            content: "M 50,20 L 80,50 H 65 V 80 H 35 V 50 H 20 Z",
            axisAngle: 90,
            options: [
                "M 50,80 L 80,50 H 65 V 20 H 35 V 50 H 20 Z",
                "M 50,20 L 20,50 H 35 V 80 H 65 V 50 H 80 Z",
                "M 50,50 L 80,80 H 65 V 10 H 35 V 80 H 20 Z",
                "M 20,50 L 50,20 V 35 H 80 V 65 H 50 V 80 Z",
            ],
            correctIndex: 0
        },
        {
            id: 6,
            title: "Csillag (fél)",
            description: "Válaszd ki a függőleges tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 50,20 L 65,40 L 85,45 L 70,60 L 75,80 L 50,70",
            axisAngle: 0,
            options: [
                "M 50,20 L 65,40 L 85,45 L 70,60 L 75,80 L 50,70",
                "M 50,20 L 35,40 L 15,45 L 30,60 L 25,80 L 50,70",
                "M 50,80 L 65,60 L 85,55 L 70,40 L 75,20 L 50,30",
                "M 20,50 L 40,35 L 45,15 L 60,30 L 80,25 L 70,50",
            ],
            correctIndex: 1
        },
        {
            id: 7,
            title: "Házikó",
            description: "Keresd meg a házikó függőleges tengelyre vonatkozó tükörképét!",
            type: 'path',
            content: "M 30,80 V 50 L 50,30 L 70,50 V 80 Z M 60,80 V 60 H 40 V 80",
            axisAngle: 0,
            options: [
                "M 70,80 V 50 L 50,30 L 30,50 V 80 Z M 40,80 V 60 H 60 V 80",
                "M 30,80 V 50 L 50,30 L 70,50 V 80 Z M 60,80 V 60 H 40 V 80",
                "M 30,20 V 50 L 50,70 L 70,50 V 20 Z M 60,20 V 40 H 40 V 20",
                "M 80,30 H 50 L 30,50 H 50 V 70 H 80 Z",
            ],
            correctIndex: 0
        },
        {
            id: 8,
            title: "Szív (fele)",
            description: "Válaszd ki a szív függőleges tengelyre vonatkozó tükörképét!",
            type: 'path',
            content: "M 50,80 C 50,80 80,60 80,40 C 80,20 60,20 50,40",
            axisAngle: 0,
            options: [
                "M 50,80 C 50,80 80,60 80,40 C 80,20 60,20 50,40",
                "M 50,80 C 50,80 20,60 20,40 C 20,20 40,20 50,40",
                "M 50,20 C 50,20 80,40 80,60 C 80,80 60,80 50,60",
                "M 20,50 C 20,50 40,20 60,20 C 80,20 80,40 60,50",
            ],
            correctIndex: 1
        },
        {
            id: 9,
            title: "Fenyőfa (fele)",
            description: "Válaszd ki a vízszintes tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 50,20 L 80,50 H 60 L 85,75 H 50",
            axisAngle: 90,
            options: [
                "M 50,80 L 80,50 H 60 L 85,25 H 50",
                "M 50,20 L 20,50 H 40 L 15,75 H 50",
                "M 50,20 L 80,50 H 60 L 85,75 H 50",
                "M 20,50 L 50,20 V 40 L 75,15 V 50",
            ],
            correctIndex: 0
        },
        {
            id: 10,
            title: "Trapéz",
            description: "Melyik a trapéz függőleges tengelyre vonatkozó tükörképe?",
            type: 'path',
            content: "M 30,40 H 60 L 70,70 H 20 Z",
            axisAngle: 0,
            options: [
                "M 70,40 H 40 L 30,70 H 80 Z",
                "M 30,40 H 60 L 70,70 H 20 Z",
                "M 30,60 H 60 L 70,30 H 20 Z",
                "M 40,30 V 60 L 70,70 V 20 Z",
            ],
            correctIndex: 0
        }
    ],
    medium: [
        {
            id: 11,
            title: "Átlós tükrözés (45°)",
            description: "Válaszd ki az alakzat 45 fokos tengelyre vonatkozó tükörképét!",
            type: 'path',
            content: "M 20,40 L 40,20 H 60 V 40 Z",
            axisAngle: 45,
            options: [
                "M 40,20 L 20,40 V 60 H 40 Z",
                "M 20,40 L 40,20 H 60 V 40 Z",
                "M 60,80 L 80,60 H 100 V 80 Z",
                "M 40,60 L 20,80 H 40 V 60 Z",
            ],
            correctIndex: 0
        },
        {
            id: 12,
            title: "Komplex sokszög",
            description: "Keresd meg a függőleges tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 30,30 L 50,20 L 70,40 L 60,70 L 40,60 Z",
            axisAngle: 0,
            options: [
                "M 70,30 L 50,20 L 30,40 L 40,70 L 60,60 Z",
                "M 30,30 L 50,20 L 70,40 L 60,70 L 40,60 Z",
                "M 30,70 L 50,80 L 70,60 L 60,30 L 40,40 Z",
                "M 20,30 L 40,50 L 60,70 L 80,40 Z",
            ],
            correctIndex: 0
        },
        {
            id: 13,
            title: "Ferde tengely (135°)",
            description: "Válaszd ki a 135 fokos tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 60,20 L 80,40 L 60,60 Z",
            axisAngle: 135,
            options: [
                "M 40,80 L 20,60 L 40,40 Z",
                "M 60,20 L 80,40 L 60,60 Z",
                "M 20,20 L 40,40 L 20,60 Z",
                "M 80,80 L 60,60 L 80,40 Z",
            ],
            correctIndex: 0
        },
        {
            id: 14,
            title: "Helyiérték-alakzat",
            description: "Válaszd ki a függőleges tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 20,20 H 40 V 40 H 20 Z M 50,50 H 70 V 70 H 50 Z",
            axisAngle: 0,
            options: [
                "M 80,20 H 60 V 40 H 80 Z M 50,50 H 30 V 70 H 50 Z",
                "M 20,20 H 40 V 40 H 20 Z M 50,50 H 70 V 70 H 50 Z",
                "M 20,80 H 40 V 60 H 20 Z M 50,50 H 70 V 30 H 50 Z",
                "M 60,20 H 80 V 40 H 60 Z M 30,50 H 50 V 70 H 30 Z",
            ],
            correctIndex: 0
        },
        {
            id: 15,
            title: "Nyitott görbe",
            description: "Válaszd ki a vízszintes tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 20,30 Q 50,60 80,30",
            axisAngle: 90,
            options: [
                "M 20,70 Q 50,40 80,70",
                "M 20,30 Q 50,60 80,30",
                "M 80,30 Q 50,60 20,30",
                "M 30,20 Q 60,50 30,80",
            ],
            correctIndex: 0
        },
        {
            id: 16,
            title: "Összetett nyíl",
            description: "Válaszd ki a függőleges tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 20,50 L 50,20 V 40 H 80 V 60 H 50 V 80 Z",
            axisAngle: 0,
            options: [
                "M 80,50 L 50,20 V 40 H 20 V 60 H 50 V 80 Z",
                "M 20,50 L 50,20 V 40 H 80 V 60 H 50 V 80 Z",
                "M 20,50 L 50,80 V 60 H 80 V 40 H 50 V 20 Z",
                "M 50,20 L 80,50 H 60 V 80 H 40 V 50 H 20 Z",
            ],
            correctIndex: 0
        },
        {
            id: 17,
            title: "Lépcsős forma",
            description: "Válaszd ki a 45 fokos tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 30,70 V 50 H 50 V 30",
            axisAngle: 45,
            options: [
                "M 70,30 H 50 V 50 H 30",
                "M 30,70 V 50 H 50 V 30",
                "M 70,30 V 50 H 50 V 70",
                "M 30,30 V 50 H 50 V 70",
            ],
            correctIndex: 0
        },
        {
            id: 18,
            title: "Hatszögletű kivágás",
            description: "Válaszd ki a vízszintes tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 30,30 L 70,30 L 85,50 L 70,70 L 30,70 Z M 50,50 H 70",
            axisAngle: 90,
            options: [
                "M 30,70 L 70,70 L 85,50 L 70,30 L 30,30 Z M 50,50 H 70",
                "M 70,30 L 30,30 L 15,50 L 30,70 L 70,70 Z M 50,50 H 30",
                "M 30,30 L 70,30 L 85,50 L 70,70 L 30,70 Z M 50,50 H 70",
                "M 30,10 L 70,10 L 85,30 L 70,50 L 30,50 Z",
            ],
            correctIndex: 0
        },
        {
            id: 19,
            title: "Kereszt",
            description: "Válaszd ki a függőleges tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 40,20 H 60 V 40 H 80 V 60 H 60 V 80 H 40 V 60 H 20 V 40 H 40 Z M 60,40 L 80,20",
            axisAngle: 0,
            options: [
                "M 60,20 H 40 V 40 H 20 V 60 H 40 V 80 H 60 V 60 H 80 V 40 H 60 Z M 40,40 L 20,20",
                "M 40,20 H 60 V 40 H 80 V 60 H 60 V 80 H 40 V 60 H 20 V 40 H 40 Z M 60,40 L 80,20",
                "M 40,80 H 60 V 60 H 80 V 40 H 60 V 20 H 40 V 40 H 20 V 60 H 40 Z M 60,60 L 80,80",
                "M 20,40 H 40 V 20 H 60 V 40 H 80 V 60 H 60 V 80 H 40 V 60 H 20 Z",
            ],
            correctIndex: 0
        },
        {
            id: 20,
            title: "Ferde vonal (135°)",
            description: "Válaszd ki a 135 fokos tengelyre vonatkozó tükörképet!",
            type: 'path',
            content: "M 20,20 L 50,20 V 50",
            axisAngle: 135,
            options: [
                "M 80,80 L 80,50 H 50",
                "M 20,20 L 50,20 V 50",
                "M 20,80 L 20,50 H 50",
                "M 80,20 L 80,50 H 50",
            ],
            correctIndex: 0
        }
    ],
    hard: [
        {
            id: 21,
            title: "Emoji Tükrözés 🧩",
            description: "Válaszd ki a 🧩 emoji függőleges tengelyre vonatkozó tükörképet!",
            type: 'emoji',
            content: "🧩",
            axisAngle: 0,
            options: ["🧩", "🧩", "🧩", "🧩"],
            correctIndex: 0
        },
        {
            id: 22,
            title: "Rakéta 🚀",
            description: "Válaszd ki a rakéta 45 fokos tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "🚀",
            axisAngle: 45,
            options: ["🚀", "🚀", "🚀", "🚀"],
            correctIndex: 0
        },
        {
            id: 23,
            title: "Esernyő ☂️",
            description: "Válaszd ki az esernyő vízszintes tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "☂️",
            axisAngle: 90,
            options: ["☂️", "☂️", "☂️", "☂️"],
            correctIndex: 0
        },
        {
            id: 24,
            title: "Autó 🚗",
            description: "Válaszd ki az autó függőleges tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "🚗",
            axisAngle: 0,
            options: ["🚗", "🚗", "🚗", "🚗"],
            correctIndex: 0
        },
        {
            id: 25,
            title: "Kulcs 🔑",
            description: "Válaszd ki a kulcs 135 fokos tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "🔑",
            axisAngle: 135,
            options: ["🔑", "🔑", "🔑", "🔑"],
            correctIndex: 0
        },
        {
            id: 26,
            title: "Korona 👑",
            description: "Válaszd ki a korona vízszintes tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "👑",
            axisAngle: 90,
            options: ["👑", "👑", "👑", "👑"],
            correctIndex: 0
        },
        {
            id: 27,
            title: "Bicikli 🚲",
            description: "Válaszd ki a bicikli függőleges tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "🚲",
            axisAngle: 0,
            options: ["🚲", "🚲", "🚲", "🚲"],
            correctIndex: 0
        },
        {
            id: 28,
            title: "Repülő ✈️",
            description: "Válaszd ki a repülő 45 fokos tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "✈️",
            axisAngle: 45,
            options: ["✈️", "✈️", "✈️", "✈️"],
            correctIndex: 0
        },
        {
            id: 29,
            title: "Varázspálca 🪄",
            description: "Válaszd ki a varázspálca vízszintes tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "🪄",
            axisAngle: 90,
            options: ["🪄", "🪄", "🪄", "🪄"],
            correctIndex: 0
        },
        {
            id: 30,
            title: "UFO 🛸",
            description: "Válaszd ki az UFO függőleges tengelyre vonatkozó tükörképét!",
            type: 'emoji',
            content: "🛸",
            axisAngle: 0,
            options: ["🛸", "🛸", "🛸", "🛸"],
            correctIndex: 0
        }
    ]
};

export function SymmetryQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const problems = difficulty ? SYMMETRY_DATA[difficulty] : [];
    const problem = problems[currentStep];

    const randomizedOptions = useMemo(() => {
        if (!problem) return [];
        const indices = [0, 1, 2, 3];
        return indices.sort(() => Math.random() - 0.5);
    }, [problem]);

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
        if (currentStep < problems.length - 1) {
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
        setDifficulty(null);
        setCurrentStep(0);
        setScore(0);
        setShowResults(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    const startLevel = (level: Difficulty) => {
        setDifficulty(level);
        setCurrentStep(0);
        setScore(0);
        setShowResults(false);
        setSelectedOption(null);
        setIsCorrect(null);
    };

    if (!difficulty) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Tengelyes Tükrözés Kvíz 🔍</h2>
                    <p className="text-slate-500 font-medium text-lg">Válaszd ki a nehézségi szintet a kezdéshez!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                        onClick={() => startLevel('easy')}
                        className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-green-100 hover:border-green-400 bg-white/80 backdrop-blur-md rounded-[2.5rem] text-center space-y-4 group"
                    >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Kezdő</h3>
                        <p className="text-slate-500 text-sm">Alapvető alakzatok, függőleges és vízszintes tengelyek.</p>
                        <div className="pt-4">
                            <span className="px-4 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold uppercase tracking-wider">10 feladat</span>
                        </div>
                    </Card>

                    <Card
                        onClick={() => startLevel('medium')}
                        className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-amber-100 hover:border-amber-400 bg-white/80 backdrop-blur-md rounded-[2.5rem] text-center space-y-4 group"
                    >
                        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Haladó</h3>
                        <p className="text-slate-500 text-sm">Összetett alakzatok és 45°-os ferde tengelyek.</p>
                        <div className="pt-4">
                            <span className="px-4 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider">10 feladat</span>
                        </div>
                    </Card>

                    <Card
                        onClick={() => startLevel('hard')}
                        className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-rose-100 hover:border-rose-400 bg-white/80 backdrop-blur-md rounded-[2.5rem] text-center space-y-4 group"
                    >
                        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <Skull className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Mester</h3>
                        <p className="text-slate-500 text-sm">Kihívást jelentő emoji feladványok és változatos szögek.</p>
                        <div className="pt-4">
                            <span className="px-4 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold uppercase tracking-wider">10 feladat</span>
                        </div>
                    </Card>
                </div>

                <div className="flex justify-center pt-8">
                    <Button variant="ghost" onClick={onBack} className="rounded-2xl px-8 py-6 font-bold text-slate-500 hover:text-indigo-600 hover:bg-slate-100">
                        <ArrowLeft className="w-5 h-5 mr-3" />
                        Vissza a témákhoz
                    </Button>
                </div>
            </div>
        );
    }

    if (showResults) {
        return (
            <Card className="p-8 text-center space-y-6 max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border-green-100 shadow-2xl rounded-[2rem] animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-200">
                    <Trophy className="w-12 h-12 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Gratulálunk!</h2>
                    <p className="text-slate-500 font-medium">Sikeresen teljesítetted a {difficulty === 'easy' ? 'kezdő' : difficulty === 'medium' ? 'haladó' : 'mester'} szintet!</p>
                </div>

                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 italic text-slate-600">
                    <p className="text-4xl font-black text-green-600 mb-1">{score} / {problems.length}</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Pontszám</p>
                </div>

                <div className="flex gap-4">
                    <Button onClick={restart} className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-2xl py-6 font-bold shadow-lg shadow-green-200 transition-all hover:scale-105">
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Szintválasztó
                    </Button>
                    <Button variant="outline" onClick={onBack} className="flex-1 border-2 border-slate-200 rounded-2xl py-6 font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kilépés
                    </Button>
                </div>
            </Card>
        );
    }

    const renderEmoji = (emoji: string, isMirrored: boolean, axisAngle: number) => {
        let transform = '';
        if (isMirrored) {
            transform = `rotate(${axisAngle}deg) scaleX(-1) rotate(${-axisAngle}deg)`;
        }

        return (
            <div style={{ transform, transition: 'transform 0.3s ease' }} className="text-6xl select-none">
                {emoji}
            </div>
        );
    };

    const MirrorAxis = ({ angle }: { angle: number }) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 - 45 * Math.sin(rad);
        const y1 = 50 - 45 * Math.cos(rad);
        const x2 = 50 + 45 * Math.sin(rad);
        const y2 = 50 + 45 * Math.cos(rad);

        return (
            <>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx={x1} cy={y1} r="2" fill="#ef4444" />
                <circle cx={x2} cy={y2} r="2" fill="#ef4444" />
            </>
        );
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm px-6">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg",
                        difficulty === 'easy' ? "bg-green-500 shadow-green-100" :
                            difficulty === 'medium' ? "bg-amber-500 shadow-amber-100" : "bg-rose-500 shadow-rose-100"
                    )}>
                        {currentStep + 1}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800">{problem.title}</h2>
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
                <Button variant="ghost" onClick={restart} className="rounded-xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Szintválasztó
                </Button>
            </div>

            <Card className="p-8 bg-white/90 backdrop-blur-xl border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden relative">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    {difficulty === 'easy' ? <Zap className="w-32 h-32" /> : difficulty === 'medium' ? <Target className="w-32 h-32" /> : <Skull className="w-32 h-32" />}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-6 text-center md:text-left">
                        <div className={cn(
                            "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest border",
                            difficulty === 'easy' ? "bg-green-50 text-green-600 border-green-100" :
                                difficulty === 'medium' ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-rose-50 text-rose-600 border-rose-100"
                        )}>
                            <MousePointer2 className="w-3.5 h-3.5" />
                            {difficulty === 'hard' ? 'Mester feladvány' : 'Megfigyelés és döntés'}
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 leading-tight">
                            {problem.description}
                        </h3>

                        <div className="relative bg-slate-50 rounded-[2rem] p-8 border-2 border-slate-100 flex items-center justify-center min-h-[220px]">
                            {problem.type === 'path' ? (
                                <svg viewBox="0 0 100 100" className="w-40 h-40 drop-shadow-md">
                                    <path
                                        d={problem.content}
                                        fill="none"
                                        stroke="#6366f1"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <MirrorAxis angle={problem.axisAngle} />
                                </svg>
                            ) : (
                                <div className="relative flex items-center justify-center w-40 h-40">
                                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                                        <MirrorAxis angle={problem.axisAngle} />
                                    </svg>
                                    <div className="text-7xl">{problem.content}</div>
                                </div>
                            )}
                            <div className="absolute bottom-4 right-6 text-[10px] font-black text-red-500 uppercase tracking-widest bg-white px-2 py-1 rounded-md border border-red-100 shadow-sm">
                                Tükörtengely
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {randomizedOptions.map((actualIdx) => {
                            const optPath = problem.options[actualIdx];
                            return (
                                <button
                                    key={actualIdx}
                                    disabled={selectedOption !== null}
                                    onClick={() => handleOptionSelect(actualIdx)}
                                    className={cn(
                                        "relative p-4 rounded-3xl border-2 transition-all duration-300 flex items-center justify-center bg-white aspect-square hover:scale-[1.03] active:scale-95 group",
                                        selectedOption === actualIdx
                                            ? (actualIdx === problem.correctIndex ? "border-green-500 bg-green-50 shadow-lg shadow-green-100" : "border-red-500 bg-red-50 shadow-lg shadow-red-100")
                                            : "border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50"
                                    )}
                                >
                                    {problem.type === 'path' ? (
                                        <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                                            <path
                                                d={optPath}
                                                fill={selectedOption === actualIdx ? (actualIdx === problem.correctIndex ? "#dcfce7" : "#fee2e2") : "#f8fafc"}
                                                stroke={selectedOption === actualIdx ? (actualIdx === problem.correctIndex ? "#22c55e" : "#ef4444") : "#94a3b8"}
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="transition-colors duration-300"
                                            />
                                        </svg>
                                    ) : (
                                        renderEmoji(problem.content, actualIdx === problem.correctIndex, problem.axisAngle)
                                    )}

                                    {selectedOption === actualIdx && (
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full border-4 border-white shadow-md flex items-center justify-center animate-in zoom-in duration-300">
                                            {actualIdx === problem.correctIndex ? (
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
                            {currentStep === problems.length - 1 ? 'Befejezés' : 'Következő'}
                            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
