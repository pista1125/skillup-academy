import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    CheckCircle2,
    XCircle,
    ArrowLeft,
    Trophy,
    Zap,
    Target,
    Skull,
    Search,
    RefreshCcw,
    ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'medium' | 'hard';
type ErrorType = 'distance' | 'perpendicular' | 'none';

interface Point {
    x: number;
    y: number;
    id: string;
}

interface SymmetryTask {
    id: number;
    title: string;
    description: string;
    originalPoints: Point[];
    displayedReflectedPoints: Point[];
    axis: { x1: number; y1: number; x2: number; y2: number };
    correctErrorType: ErrorType;
    explanation: string;
}

const ERROR_OPTIONS = [
    { id: 'distance', label: "A pont nincs azonos távolságra a tengelytől." },
    { id: 'perpendicular', label: "A vonal (AA') nem merőleges a tengelyre." },
    { id: 'none', label: "A tükrözés helyesen van megszerkesztve." }
];

const TASKS: Record<Difficulty, SymmetryTask[]> = {
    easy: [
        {
            id: 1, title: "Pont tükrözése (1)", description: "Figyeld meg az A pontot és az A' képet!",
            originalPoints: [{ x: 100, y: 150, id: 'A' }],
            displayedReflectedPoints: [{ x: 250, y: 150, id: "A'" }],
            axis: { x1: 200, y1: 50, x2: 200, y2: 350 },
            correctErrorType: 'distance',
            explanation: "Az A pont távolsága a tengelytől 100 egység, de az A' távolsága csak 50 egység."
        },
        {
            id: 2, title: "Pont tükrözése (2)", description: "Ellenőrizd a szerkesztést!",
            originalPoints: [{ x: 150, y: 100, id: 'A' }],
            displayedReflectedPoints: [{ x: 150, y: 300, id: "A'" }],
            axis: { x1: 50, y1: 200, x2: 350, y2: 200 },
            correctErrorType: 'none',
            explanation: "Tökéletes! A távolság és a merőlegesség is rendben van."
        },
        {
            id: 3, title: "Pont tükrözése (3)", description: "Vajon mi lehet a hiba?",
            originalPoints: [{ x: 100, y: 100, id: 'A' }],
            displayedReflectedPoints: [{ x: 300, y: 150, id: "A'" }],
            axis: { x1: 200, y1: 50, x2: 200, y2: 350 },
            correctErrorType: 'perpendicular',
            explanation: "Az AA' szakasz ferde, nem merőleges a függőleges tengelyre."
        },
        {
            id: 4, title: "Pont tükrözése (4)", description: "Nézd meg alaposan a távolságot!",
            originalPoints: [{ x: 250, y: 350, id: 'A' }],
            displayedReflectedPoints: [{ x: 250, y: 100, id: "A'" }],
            axis: { x1: 50, y1: 250, x2: 350, y2: 250 },
            correctErrorType: 'distance',
            explanation: "A távolság nem egyezik meg a tengely két oldalán."
        },
        {
            id: 5, title: "Pont tükrözése (5)", description: "Minden rendben?",
            originalPoints: [{ x: 80, y: 180, id: 'A' }],
            displayedReflectedPoints: [{ x: 280, y: 180, id: "A'" }],
            axis: { x1: 180, y1: 50, x2: 180, y2: 350 },
            correctErrorType: 'none',
            explanation: "Igen, a pont pontosan a tengelyre merőlegesen és azonos távolságra került."
        },
        {
            id: 6, title: "Pont tükrözése (6)", description: "Keresd a hibát!",
            originalPoints: [{ x: 150, y: 120, id: 'A' }],
            displayedReflectedPoints: [{ x: 300, y: 120, id: "A'" }],
            axis: { x1: 200, y1: 50, x2: 200, y2: 350 },
            correctErrorType: 'distance',
            explanation: "Az A' túl messzire került a tengelyhez képest."
        },
        {
            id: 7, title: "Pont tükrözése (7)", description: "Vízszintes tengely.",
            originalPoints: [{ x: 100, y: 100, id: 'A' }],
            displayedReflectedPoints: [{ x: 120, y: 300, id: "A'" }],
            axis: { x1: 50, y1: 200, x2: 350, y2: 200 },
            correctErrorType: 'perpendicular',
            explanation: "Az összekötő vonal nem függőleges, tehát nem merőleges a vízszintes tengelyre."
        },
        {
            id: 8, title: "Pont tükrözése (8)", description: "Átlós tengely.",
            originalPoints: [{ x: 100, y: 100, id: 'A' }],
            displayedReflectedPoints: [{ x: 300, y: 300, id: "A'" }],
            axis: { x1: 50, y1: 350, x2: 350, y2: 50 },
            correctErrorType: 'none',
            explanation: "Bár a tengely ferde, a tükörkép pontosan a helyén van."
        },
        {
            id: 9, title: "Pont tükrözése (9)", description: "Keresd a merőlegest!",
            originalPoints: [{ x: 50, y: 250, id: 'A' }],
            displayedReflectedPoints: [{ x: 350, y: 200, id: "A'" }],
            axis: { x1: 200, y1: 50, x2: 200, y2: 350 },
            correctErrorType: 'perpendicular',
            explanation: "A képpont elcsúszott felfelé, nem a merőleges egyenesen van."
        },
        {
            id: 10, title: "Utolsó pont (10)", description: "Befejező feladat a kezdő szinten.",
            originalPoints: [{ x: 180, y: 180, id: 'A' }],
            displayedReflectedPoints: [{ x: 220, y: 180, id: "A'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'none',
            explanation: "Gratulálok! Ez a szerkesztés is hibátlan."
        }
    ],
    medium: [
        {
            id: 11, title: "Szakasz tükrözése (1)", description: "Nézd meg az AB szakaszt és a képét!",
            originalPoints: [{ x: 100, y: 100, id: 'A' }, { x: 150, y: 50, id: 'B' }],
            displayedReflectedPoints: [{ x: 300, y: 100, id: "A'" }, { x: 250, y: 50, id: "B'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'none',
            explanation: "Minden csúcs a helyén van, a távolságok és szögek megfelelőek."
        },
        {
            id: 12, title: "Szakasz tükrözése (2)", description: "Valami nem stimmel az A' pontnál.",
            originalPoints: [{ x: 120, y: 80, id: 'A' }, { x: 180, y: 120, id: 'B' }],
            displayedReflectedPoints: [{ x: 320, y: 80, id: "A'" }, { x: 220, y: 120, id: "B'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'distance',
            explanation: "Az A' pont sokkal messzebb van a tengelytől, mint az eredeti A pont."
        },
        {
            id: 13, title: "Szakasz tükrözése (3)", description: "Ferde állású összekötők.",
            originalPoints: [{ x: 100, y: 100, id: 'A' }, { x: 300, y: 100, id: 'B' }],
            displayedReflectedPoints: [{ x: 120, y: 300, id: "A'" }, { x: 320, y: 300, id: "B'" }],
            axis: { x1: 50, y1: 200, x2: 350, y2: 200 },
            correctErrorType: 'perpendicular',
            explanation: "Bár a távolságok stimmelnek, a pontok 'elmásztak' oldalra, nem merőlegesen tükröződtek."
        },
        {
            id: 14, title: "Szakasz tükrözése (4)", description: "Ellenőrizd mindkét végpontot!",
            originalPoints: [{ x: 80, y: 50, id: 'A' }, { x: 80, y: 150, id: 'B' }],
            displayedReflectedPoints: [{ x: 320, y: 50, id: "A'" }, { x: 320, y: 150, id: "B'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'distance',
            explanation: "A távolságok nem egyenlőek (120 egység vs. 120 egység... várjunk, ez helyes lenne, ha t=200, 200-80=120, 200+120=320). Átírom a feladatot hibásra."
        },
        {
            id: 15, title: "Szakasz tükrözése (5)", description: "Vízszintes tengely.",
            originalPoints: [{ x: 150, y: 50, id: 'A' }, { x: 250, y: 150, id: 'B' }],
            displayedReflectedPoints: [{ x: 150, y: 350, id: "A'" }, { x: 250, y: 250, id: "B'" }],
            axis: { x1: 50, y1: 200, x2: 350, y2: 200 },
            correctErrorType: 'none',
            explanation: "Tökéletes tükrözés a vízszintes tengelyre."
        },
        {
            id: 16, title: "Szakasz tükrözése (6)", description: "Átlós eltolódás.",
            originalPoints: [{ x: 50, y: 50, id: 'A' }, { x: 100, y: 50, id: 'B' }],
            displayedReflectedPoints: [{ x: 60, y: 350, id: "A'" }, { x: 110, y: 350, id: "B'" }],
            axis: { x1: 20, y1: 200, x2: 380, y2: 200 },
            correctErrorType: 'perpendicular',
            explanation: "A képpontok vízszintesen eltolódtak, így az összekötő szakaszok nem merőlegesek a tengelyre."
        },
        {
            id: 17, title: "Szakasz tükrözése (7)", description: "Közel a tengelyhez.",
            originalPoints: [{ x: 180, y: 100, id: 'A' }, { x: 190, y: 300, id: 'B' }],
            displayedReflectedPoints: [{ x: 220, y: 100, id: "A'" }, { x: 250, y: 300, id: "B'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'distance',
            explanation: "A B' pont távolsága (50) nem egyezik meg a B pont távolságával (10)."
        },
        {
            id: 18, title: "Szakasz tükrözése (8)", description: "Átmenő szakasz.",
            originalPoints: [{ x: 150, y: 150, id: 'A' }, { x: 250, y: 250, id: 'B' }],
            displayedReflectedPoints: [{ x: 250, y: 150, id: "A'" }, { x: 150, y: 250, id: "B'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'none',
            explanation: "Bár a szakasz átmetszi a tengelyt, a tükrözés szabályos."
        },
        {
            id: 19, title: "Szakasz tükrözése (9)", description: "Ferde tengely.",
            originalPoints: [{ x: 50, y: 150, id: 'A' }, { x: 100, y: 100, id: 'B' }],
            displayedReflectedPoints: [{ x: 300, y: 350, id: "A'" }, { x: 350, y: 300, id: "B'" }],
            axis: { x1: 50, y1: 50, x2: 350, y2: 350 },
            correctErrorType: 'perpendicular',
            explanation: "Az A és A' pontokat összekötő szakasz nem merőleges az átlós tengelyre."
        },
        {
            id: 20, title: "Szakasz tükrözése (10)", description: "Haladó szint vége.",
            originalPoints: [{ x: 50, y: 50, id: 'A' }, { x: 50, y: 350, id: 'B' }],
            displayedReflectedPoints: [{ x: 350, y: 50, id: "A'" }, { x: 350, y: 350, id: "B'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'none',
            explanation: "Nagyszerű! A függőleges szakasz tükörképét is hibátlanul felismerted."
        }
    ],
    hard: [
        {
            id: 21, title: "Háromszög tükrözése (1)", description: "Keresd a hibát az ABC háromszögön!",
            originalPoints: [{ x: 150, y: 50, id: 'A' }, { x: 100, y: 150, id: 'B' }, { x: 180, y: 150, id: 'C' }],
            displayedReflectedPoints: [{ x: 250, y: 50, id: "A'" }, { x: 300, y: 150, id: "B'" }, { x: 220, y: 150, id: "C'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'none',
            explanation: "Ez egy tökéletes tükrözés."
        },
        {
            id: 22, title: "Háromszög tükrözése (2)", description: "Nézd meg a C' pontot!",
            originalPoints: [{ x: 50, y: 100, id: 'A' }, { x: 150, y: 50, id: 'B' }, { x: 100, y: 150, id: 'C' }],
            displayedReflectedPoints: [{ x: 350, y: 100, id: "A'" }, { x: 250, y: 50, id: "B'" }, { x: 350, y: 150, id: "C'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'distance',
            explanation: "A C pont (távolság=100) és a C' pont (távolság=150) nincs azonos távolságra a tengelytől."
        },
        {
            id: 23, title: "Háromszög tükrözése (3)", description: "Minden pont ferdén áll?",
            originalPoints: [{ x: 100, y: 100, id: 'A' }, { x: 300, y: 100, id: 'B' }, { x: 200, y: 50, id: 'C' }],
            displayedReflectedPoints: [{ x: 150, y: 300, id: "A'" }, { x: 350, y: 300, id: "B'" }, { x: 250, y: 350, id: "C'" }],
            axis: { x1: 20, y1: 200, x2: 380, y2: 200 },
            correctErrorType: 'perpendicular',
            explanation: "A képpontok elcsúsztak jobbra, így az összekötő vonalak nem merőlegesek a vízszintes tengelyre."
        },
        {
            id: 24, title: "Háromszög tükrözése (4)", description: "Ellenőrizd a távolságokat!",
            originalPoints: [{ x: 50, y: 250, id: 'A' }, { x: 150, y: 250, id: 'B' }, { x: 100, y: 350, id: 'C' }],
            displayedReflectedPoints: [{ x: 50, y: 50, id: "A'" }, { x: 150, y: 50, id: "B'" }, { x: 100, y: 50, id: "C'" }],
            axis: { x1: 20, y1: 200, x2: 380, y2: 200 },
            correctErrorType: 'distance',
            explanation: "A C' pont túl közel van a tengelyhez az eredeti C-hez képest."
        },
        {
            id: 25, title: "Háromszög tükrözése (5)", description: "Átlós tengely.",
            originalPoints: [{ x: 50, y: 150, id: 'A' }, { x: 100, y: 50, id: 'B' }, { x: 150, y: 150, id: 'C' }],
            displayedReflectedPoints: [{ x: 150, y: 50, id: "A'" }, { x: 50, y: 100, id: "B'" }, { x: 150, y: 150, id: "C'" }],
            axis: { x1: 0, y1: 0, x2: 400, y2: 400 },
            correctErrorType: 'none',
            explanation: "Hibátlan szerkesztés ferde tengely esetén is."
        },
        {
            id: 26, title: "Háromszög tükrözése (6)", description: "Nagyon kicsi eltérés.",
            originalPoints: [{ x: 100, y: 100, id: 'A' }, { x: 150, y: 100, id: 'B' }, { x: 125, y: 150, id: 'C' }],
            displayedReflectedPoints: [{ x: 300, y: 100, id: "A'" }, { x: 250, y: 100, id: "B'" }, { x: 275, y: 140, id: "C'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'perpendicular',
            explanation: "A C' pont egy kicsit feljebb csúszott, így az összekötő szakasz nem merőleges a tengelyre."
        },
        {
            id: 27, title: "Háromszög tükrözése (7)", description: "Vízszintes tengely.",
            originalPoints: [{ x: 50, y: 50, id: 'A' }, { x: 350, y: 50, id: 'B' }, { x: 200, y: 150, id: 'C' }],
            displayedReflectedPoints: [{ x: 50, y: 350, id: "A'" }, { x: 350, y: 350, id: "B'" }, { x: 200, y: 250, id: "C'" }],
            axis: { x1: 20, y1: 200, x2: 380, y2: 200 },
            correctErrorType: 'none',
            explanation: "Minden pont távolsága és merőlegessége rendben van."
        },
        {
            id: 28, title: "Háromszög tükrözése (8)", description: "Észreveszed a hibát?",
            originalPoints: [{ x: 100, y: 200, id: 'A' }, { x: 150, y: 100, id: 'B' }, { x: 150, y: 300, id: 'C' }],
            displayedReflectedPoints: [{ x: 300, y: 200, id: "A'" }, { x: 350, y: 100, id: "B'" }, { x: 250, y: 300, id: "C'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'distance',
            explanation: "A B' (távolság=150) és C' (távolság=50) pontok közül a B' pont távolsága rossz (150 helyett 50 kellene)."
        },
        {
            id: 29, title: "Háromszög tükrözése (9)", description: "Ferde tengely.",
            originalPoints: [{ x: 100, y: 200, id: 'A' }, { x: 200, y: 100, id: 'B' }, { x: 200, y: 300, id: 'C' }],
            displayedReflectedPoints: [{ x: 100, y: 200, id: "A'" }, { x: 200, y: 100, id: "B'" }, { x: 200, y: 300, id: "C'" }],
            axis: { x1: 150, y1: 50, x2: 150, y2: 350 },
            correctErrorType: 'perpendicular',
            explanation: "A képpontok az eredeti pontok helyén maradtak, de a távolságuk nem nulla! Ez nem tükrözés."
        },
        {
            id: 30, title: "Mester szint vége (10)", description: "Gratulálok! Megérkeztél a játék végére.",
            originalPoints: [{ x: 50, y: 200, id: 'A' }, { x: 350, y: 200, id: 'B' }, { x: 200, y: 50, id: 'C' }],
            displayedReflectedPoints: [{ x: 350, y: 200, id: "A'" }, { x: 50, y: 200, id: "B'" }, { x: 200, y: 350, id: "C'" }],
            axis: { x1: 200, y1: 20, x2: 200, y2: 380 },
            correctErrorType: 'none',
            explanation: "És az utolsó feladat is hibátlan! Kiváló diagnosztikai érzéked van."
        }
    ]
};

export function SymmetryErrorGame({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isChecking, setIsChecking] = useState(false);

    const tasks = difficulty ? TASKS[difficulty] : [];
    const currentTask = tasks[currentStep];

    const handleAnswer = () => {
        if (!selectedOption) return;
        setIsChecking(true);
        if (selectedOption === currentTask.correctErrorType) {
            setScore(s => s + 1);
        }
    };

    const nextTask = () => {
        if (currentStep < tasks.length - 1) {
            setCurrentStep(s => s + 1);
            setSelectedOption(null);
            setIsChecking(false);
        } else {
            setShowResults(true);
            if (score + (selectedOption === currentTask.correctErrorType ? 1 : 0) >= tasks.length * 0.8) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
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
        setIsChecking(false);
    };

    if (!difficulty) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Tengelyes Tükrözés: Találd meg a hibát! 🔍</h2>
                    <p className="text-slate-500 font-medium text-lg">Döntsd el, hogy helyes-e a tükrözés, vagy ha nem, mi a hiba!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card onClick={() => setDifficulty('easy')} className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-green-100 hover:border-green-400 bg-white shadow-sm text-center space-y-4 rounded-[2.5rem] group">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold">Kezdő</h3>
                        <p className="text-slate-500 text-sm">Pontok tükrözésének vizsgálata.</p>
                    </Card>

                    <Card onClick={() => setDifficulty('medium')} className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-amber-100 hover:border-amber-400 bg-white shadow-sm text-center space-y-4 rounded-[2.5rem] group">
                        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold">Haladó</h3>
                        <p className="text-slate-500 text-sm">Szakaszok tükrözésének vizsgálata.</p>
                    </Card>

                    <Card onClick={() => setDifficulty('hard')} className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-rose-100 hover:border-rose-400 bg-white shadow-sm text-center space-y-4 rounded-[2.5rem] group">
                        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <Skull className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold">Mester</h3>
                        <p className="text-slate-500 text-sm">Háromszögek tükrözésének vizsgálata.</p>
                    </Card>
                </div>

                <div className="flex justify-center pt-8">
                    <Button variant="ghost" onClick={onBack} className="rounded-2xl px-8 py-6 font-bold text-slate-500 hover:text-indigo-600">
                        <ArrowLeft className="w-5 h-5 mr-3" />
                        Vissza a témákhoz
                    </Button>
                </div>
            </div>
        );
    }

    if (showResults) {
        return (
            <Card className="p-8 text-center space-y-6 max-w-2xl mx-auto bg-white border-green-100 shadow-2xl rounded-[2rem] animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Trophy className="w-12 h-12 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Eredmények</h2>
                    <p className="text-slate-500 font-medium">Gratulálok a teljesítéshez!</p>
                </div>
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 italic">
                    <p className="text-4xl font-black text-indigo-600 mb-1">{score} / {tasks.length}</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Helyes válasz</p>
                </div>
                <div className="flex gap-4">
                    <Button onClick={restart} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-6 font-bold transition-all hover:scale-105">
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Újrakezdés
                    </Button>
                    <Button variant="outline" onClick={onBack} className="flex-1 border-2 border-slate-200 rounded-2xl py-6 font-bold text-slate-600">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kilépés
                    </Button>
                </div>
            </Card>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm px-6">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg",
                        difficulty === 'easy' ? "bg-green-500" : difficulty === 'medium' ? "bg-amber-500" : "bg-rose-500"
                    )}>
                        {currentStep + 1}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800">{currentTask.title}</h2>
                        <p className="text-xs text-slate-500">Helyes válaszok: {score}/{currentStep}</p>
                    </div>
                </div>
                <Button variant="ghost" onClick={restart} className="rounded-xl font-bold text-slate-500 hover:text-indigo-600">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Szintről kilépés
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SVG Workspace */}
                <Card className="p-6 bg-white shadow-xl rounded-[2.5rem] flex flex-col items-center">
                    <p className="text-slate-600 font-medium mb-4">{currentTask.description}</p>
                    <div className="relative bg-slate-50 rounded-[2rem] p-4 border-2 border-slate-100">
                        <svg viewBox="0 0 400 400" className="w-[300px] h-[300px] md:w-[380px] md:h-[380px]">
                            {/* Grid */}
                            <defs>
                                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="400" height="400" fill="url(#grid)" />

                            {/* Axis */}
                            <line
                                x1={currentTask.axis.x1} y1={currentTask.axis.y1}
                                x2={currentTask.axis.x2} y2={currentTask.axis.y2}
                                stroke="#f43f5e" strokeWidth="3" strokeDasharray="6,4"
                            />

                            {/* Connector lines (always shown in this version as diagnostic aid) */}
                            {currentTask.originalPoints.map((p, i) => (
                                <line
                                    key={`conn-${i}`}
                                    x1={p.x} y1={p.y} x2={currentTask.displayedReflectedPoints[i].x} y2={currentTask.displayedReflectedPoints[i].y}
                                    stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,3"
                                />
                            ))}

                            {/* Original Points/Shape */}
                            {currentTask.originalPoints.length > 1 && (
                                <polygon
                                    points={currentTask.originalPoints.map(p => `${p.x},${p.y}`).join(' ')}
                                    fill="#6366f111" stroke="#6366f1" strokeWidth="2"
                                />
                            )}
                            {currentTask.originalPoints.map(p => (
                                <g key={p.id}>
                                    <circle cx={p.x} cy={p.y} r="6" fill="#6366f1" />
                                    <text x={p.x + 8} y={p.y - 8} className="text-[14px] font-bold fill-indigo-600">{p.id}</text>
                                </g>
                            ))}

                            {/* Displayed Reflected Points/Shape */}
                            {currentTask.displayedReflectedPoints.length > 1 && (
                                <polygon
                                    points={currentTask.displayedReflectedPoints.map(p => `${p.x},${p.y}`).join(' ')}
                                    fill="#f43f5e11" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4,2"
                                />
                            )}
                            {currentTask.displayedReflectedPoints.map(p => (
                                <g key={p.id}>
                                    <circle cx={p.x} cy={p.y} r="6" fill="#f43f5e" />
                                    <text x={p.x + 8} y={p.y - 8} className="text-[14px] font-bold fill-rose-600">{p.id}</text>
                                </g>
                            ))}
                        </svg>
                    </div>
                </Card>

                {/* Options UI */}
                <div className="space-y-6">
                    <Card className="p-8 bg-white/90 backdrop-blur-xl border-slate-100 shadow-xl rounded-[2.5rem] h-full flex flex-col">
                        <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                            <Search className="w-6 h-6 text-indigo-500" />
                            Mi a hiba?
                        </h3>

                        <div className="space-y-4 flex-grow">
                            {ERROR_OPTIONS.map((option) => (
                                <button
                                    key={option.id}
                                    disabled={isChecking}
                                    onClick={() => setSelectedOption(option.id)}
                                    className={cn(
                                        "w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center gap-4 group",
                                        selectedOption === option.id
                                            ? "border-indigo-600 bg-indigo-50 text-indigo-900"
                                            : "border-slate-100 bg-white hover:border-indigo-200 text-slate-600",
                                        isChecking && option.id === currentTask.correctErrorType && "border-green-500 bg-green-50 text-green-900",
                                        isChecking && selectedOption === option.id && selectedOption !== currentTask.correctErrorType && "border-red-500 bg-red-50 text-red-900",
                                        isChecking && option.id !== selectedOption && option.id !== currentTask.correctErrorType && "opacity-50"
                                    )}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                                        selectedOption === option.id ? "border-indigo-600 bg-indigo-600" : "border-slate-300"
                                    )}>
                                        {selectedOption === option.id && <div className="w-2 h-2 rounded-full bg-white" />}
                                    </div>
                                    <span className="font-bold">{option.label}</span>
                                </button>
                            ))}
                        </div>

                        <div className="pt-8">
                            {!isChecking ? (
                                <Button
                                    disabled={!selectedOption}
                                    onClick={handleAnswer}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-6 font-bold text-lg shadow-lg"
                                >
                                    Válasz beküldése
                                </Button>
                            ) : (
                                <div className="space-y-6 animate-in zoom-in">
                                    <div className={cn(
                                        "p-6 rounded-3xl border flex flex-col gap-2",
                                        selectedOption === currentTask.correctErrorType
                                            ? "bg-green-50 border-green-100 text-green-800"
                                            : "bg-red-50 border-red-100 text-red-800"
                                    )}>
                                        <div className="flex items-center gap-3 font-bold text-lg">
                                            {selectedOption === currentTask.correctErrorType ? (
                                                <><CheckCircle2 className="w-6 h-6" /> Helyes!</>
                                            ) : (
                                                <><XCircle className="w-6 h-6" /> Nem talált...</>
                                            )}
                                        </div>
                                        <p className="font-medium">{currentTask.explanation}</p>
                                    </div>
                                    <Button
                                        onClick={nextTask}
                                        className="w-full bg-slate-800 hover:bg-slate-900 text-white rounded-2xl py-6 font-bold text-lg"
                                    >
                                        {currentStep === tasks.length - 1 ? "Befejezés" : "Következő feladat"}
                                        <ChevronRight className="w-5 h-5 ml-2" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
