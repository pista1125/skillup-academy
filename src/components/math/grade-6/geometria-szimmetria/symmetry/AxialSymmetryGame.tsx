import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    RefreshCcw,
    CheckCircle2,
    XCircle,
    ArrowLeft,
    Trophy,
    Zap,
    Target,
    Skull,
    MousePointer2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Point {
    x: number;
    y: number;
    id: string;
}

interface LevelData {
    id: number;
    title: string;
    description: string;
    points: Point[];
    axis: { x1: number; y1: number; x2: number; y2: number };
}

const LEVELS: Record<Difficulty, LevelData[]> = {
    easy: [
        { id: 1, title: "Függőleges tükrözés (1)", description: "Tükrözd az A pontot a függőleges tengelyre!", points: [{ x: 100, y: 150, id: 'A' }], axis: { x1: 200, y1: 20, x2: 200, y2: 380 } },
        { id: 2, title: "Vízszintes tükrözés (2)", description: "Tükrözd az A pontot a vízszintes tengelyre!", points: [{ x: 200, y: 100, id: 'A' }], axis: { x1: 20, y1: 200, x2: 380, y2: 200 } },
        { id: 3, title: "Függőleges tükrözés (3)", description: "Tükrözd az A pontot a függőleges tengelyre!", points: [{ x: 300, y: 250, id: 'A' }], axis: { x1: 150, y1: 20, x2: 150, y2: 380 } },
        { id: 4, title: "Vízszintes tükrözés (4)", description: "Tükrözd az A pontot a vízszintes tengelyre!", points: [{ x: 150, y: 300, id: 'A' }], axis: { x1: 20, y1: 150, x2: 380, y2: 150 } },
        { id: 5, title: "Átlós tükrözés (5)", description: "Tükrözd az A pontot az átlós tengelyre!", points: [{ x: 100, y: 100, id: 'A' }], axis: { x1: 50, y1: 50, x2: 350, y2: 350 } },
        { id: 6, title: "Pont a tengely közelében (6)", description: "Tükrözd az A pontot!", points: [{ x: 180, y: 200, id: 'A' }], axis: { x1: 200, y1: 20, x2: 200, y2: 380 } },
        { id: 7, title: "Alulról felfelé (7)", description: "Tükrözd az A pontot a vízszintes tengelyre!", points: [{ x: 250, y: 350, id: 'A' }], axis: { x1: 20, y1: 250, x2: 380, y2: 250 } },
        { id: 8, title: "Szélről szélre (8)", description: "Tükrözd az A pontot!", points: [{ x: 50, y: 80, id: 'A' }], axis: { x1: 200, y1: 20, x2: 200, y2: 380 } },
        { id: 9, title: "Középen (9)", description: "Tükrözd az A pontot!", points: [{ x: 200, y: 150, id: 'A' }], axis: { x1: 20, y1: 250, x2: 380, y2: 250 } },
        { id: 10, title: "Utolsó pont (10)", description: "Tükrözd az utolsó pontot a kezdő szinten!", points: [{ x: 350, y: 350, id: 'A' }], axis: { x1: 50, y1: 350, x2: 350, y2: 50 } }
    ],
    medium: [
        { id: 11, title: "Szakasz tükrözése (1)", description: "Tükrözd az AB szakaszt a vízszintes tengelyre!", points: [{ x: 120, y: 80, id: 'A' }, { x: 280, y: 120, id: 'B' }], axis: { x1: 50, y1: 250, x2: 350, y2: 250 } },
        { id: 12, title: "Függőleges szakasz (2)", description: "Tükrözd a szakaszt a függőleges tengelyre!", points: [{ x: 80, y: 100, id: 'A' }, { x: 150, y: 300, id: 'B' }], axis: { x1: 250, y1: 50, x2: 250, y2: 350 } },
        { id: 13, title: "Ferde szakasz (3)", description: "Tükrözd a szakaszt!", points: [{ x: 50, y: 50, id: 'A' }, { x: 150, y: 50, id: 'B' }], axis: { x1: 20, y1: 150, x2: 380, y2: 150 } },
        { id: 14, title: "Hosszú szakasz (4)", description: "Tükrözd a szakaszt!", points: [{ x: 100, y: 100, id: 'A' }, { x: 100, y: 300, id: 'B' }], axis: { x1: 200, y1: 20, x2: 200, y2: 380 } },
        { id: 15, title: "Rövid szakasz (5)", description: "Tükrözd a szakaszt!", points: [{ x: 250, y: 300, id: 'A' }, { x: 300, y: 300, id: 'B' }], axis: { x1: 20, y1: 200, x2: 380, y2: 200 } },
        { id: 16, title: "Keresztül a tengelyen (6)", description: "Figyelj, a szakasz átmegy a tengelyen!", points: [{ x: 100, y: 150, id: 'A' }, { x: 300, y: 250, id: 'B' }], axis: { x1: 200, y1: 20, x2: 200, y2: 380 } },
        { id: 17, title: "Párhuzamos szakasz (7)", description: "Tükrözd a tengellyel párhuzamos szakaszt!", points: [{ x: 100, y: 100, id: 'A' }, { x: 300, y: 100, id: 'B' }], axis: { x1: 50, y1: 200, x2: 350, y2: 200 } },
        { id: 18, title: "Merőleges szakasz (8)", description: "Tükrözd a tengelyre merőleges szakaszt!", points: [{ x: 200, y: 50, id: 'A' }, { x: 200, y: 150, id: 'B' }], axis: { x1: 50, y1: 200, x2: 350, y2: 200 } },
        { id: 19, title: "Ferde tengely (9)", description: "Tükrözd a szakaszt ferde tengelyre!", points: [{ x: 50, y: 200, id: 'A' }, { x: 150, y: 300, id: 'B' }], axis: { x1: 350, y1: 50, x2: 50, y2: 350 } },
        { id: 20, title: "Szakasz a szélén (10)", description: "Utolsó szakasz a haladó szinten!", points: [{ x: 320, y: 50, id: 'A' }, { x: 380, y: 150, id: 'B' }], axis: { x1: 200, y1: 20, x2: 200, y2: 380 } }
    ],
    hard: [
        { id: 21, title: "Háromszög tükrözése (1)", description: "Tükrözd az ABC háromszöget a ferde tengelyre!", points: [{ x: 50, y: 150, id: 'A' }, { x: 120, y: 100, id: 'B' }, { x: 100, y: 200, id: 'C' }], axis: { x1: 150, y1: 50, x2: 250, y2: 350 } },
        { id: 22, title: "Háromszög fektetve (2)", description: "Tükrözd a háromszöget a vízszintes tengelyre!", points: [{ x: 100, y: 80, id: 'A' }, { x: 300, y: 150, id: 'B' }, { x: 200, y: 40, id: 'C' }], axis: { x1: 50, y1: 220, x2: 350, y2: 220 } },
        { id: 23, title: "Háromszög állítva (3)", description: "Tükrözd a háromszöget a függőleges tengelyre!", points: [{ x: 50, y: 100, id: 'A' }, { x: 150, y: 150, id: 'B' }, { x: 50, y: 200, id: 'C' }], axis: { x1: 250, y1: 20, x2: 250, y2: 380 } },
        { id: 24, title: "Tompaszögű háromszög (4)", description: "Tükrözd a háromszöget!", points: [{ x: 250, y: 50, id: 'A' }, { x: 350, y: 100, id: 'B' }, { x: 300, y: 50, id: 'C' }], axis: { x1: 20, y1: 200, x2: 380, y2: 200 } },
        { id: 25, title: "Derékszögű háromszög (5)", description: "Tükrözd a derékszögű háromszöget!", points: [{ x: 80, y: 300, id: 'A' }, { x: 180, y: 300, id: 'B' }, { x: 80, y: 380, id: 'C' }], axis: { x1: 250, y1: 20, x2: 250, y2: 380 } },
        { id: 26, title: "Háromszög a tengelyen (6)", description: "A háromszög egyik csúcsa a tengelyen van!", points: [{ x: 200, y: 100, id: 'A' }, { x: 100, y: 50, id: 'B' }, { x: 150, y: 150, id: 'C' }], axis: { x1: 200, y1: 20, x2: 200, y2: 380 } },
        { id: 27, title: "Tengelyt metsző háromszög (7)", description: "A háromszög átnyúlik a tengelyen!", points: [{ x: 150, y: 100, id: 'A' }, { x: 250, y: 150, id: 'B' }, { x: 200, y: 200, id: 'C' }], axis: { x1: 200, y1: 20, x2: 200, y2: 380 } },
        { id: 28, title: "Kicsi háromszög (8)", description: "Tükrözd a kicsi háromszöget!", points: [{ x: 50, y: 50, id: 'A' }, { x: 70, y: 50, id: 'B' }, { x: 60, y: 70, id: 'C' }], axis: { x1: 50, y1: 350, x2: 350, y2: 50 } },
        { id: 29, title: "Nagy háromszög (9)", description: "Tükrözd a nagy háromszöget!", points: [{ x: 50, y: 100, id: 'A' }, { x: 150, y: 50, id: 'B' }, { x: 100, y: 250, id: 'C' }], axis: { x1: 250, y1: 20, x2: 250, y2: 380 } },
        { id: 30, title: "Végső kihívás (10)", description: "Gratulálok, ez az utolsó feladat!", points: [{ x: 300, y: 300, id: 'A' }, { x: 350, y: 350, id: 'B' }, { x: 250, y: 350, id: 'C' }], axis: { x1: 20, y1: 150, x2: 380, y2: 150 } }
    ]
};

// Math utility to reflect a point across a line
const reflectPoint = (p: Point, axis: { x1: number; y1: number; x2: number; y2: number }): Point => {
    const { x1, y1, x2, y2 } = axis;

    // Line equation: ax + by + c = 0
    // (y1 - y2)x + (x2 - x1)y + (x1y2 - x2y1) = 0
    const a = y1 - y2;
    const b = x2 - x1;
    const c = x1 * y2 - x2 * y1;

    const d = (a * p.x + b * p.y + c) / (a * a + b * b);

    return {
        x: p.x - 2 * a * d,
        y: p.y - 2 * b * d,
        id: p.id + "'"
    };
};

export function AxialSymmetryGame({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const [draggedPoints, setDraggedPoints] = useState<Point[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [activeDragId, setActiveDragId] = useState<string | null>(null);

    const svgRef = useRef<SVGSVGElement>(null);

    const levels = difficulty ? LEVELS[difficulty] : [];
    const currentLevel = levels[currentStep];

    // Initialize user points when level changes
    useEffect(() => {
        if (currentLevel) {
            // Initial position for user draggable points: somewhere else or near the axis
            // Improved initial positioning to be visible and distinct
            setDraggedPoints(currentLevel.points.map(p => {
                const reflected = reflectPoint(p, currentLevel.axis);
                // Offset the initial position slightly so they don't start exactly on the answer
                return {
                    x: Math.max(20, Math.min(380, reflected.x + (reflected.x > 200 ? -50 : 50))),
                    y: Math.max(20, Math.min(380, reflected.y + (reflected.y > 200 ? -50 : 50))),
                    id: p.id + "'"
                };
            }));
            setIsCorrect(null);
            setIsChecking(false);
        }
    }, [currentLevel]);

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent, id: string) => {
        if (isChecking) return;
        setActiveDragId(id);
    };

    const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
        if (!activeDragId || !svgRef.current || isChecking) return;

        const svg = svgRef.current;
        const CTM = svg.getScreenCTM();
        if (!CTM) return;

        let clientX, clientY;
        if (window.TouchEvent && e instanceof TouchEvent) {
            clientX = (e as TouchEvent).touches[0].clientX;
            clientY = (e as TouchEvent).touches[0].clientY;
        } else {
            clientX = (e as MouseEvent).clientX;
            clientY = (e as MouseEvent).clientY;
        }

        const x = (clientX - CTM.e) / CTM.a;
        const y = (clientY - CTM.f) / CTM.d;

        // Clamp to SVG bounds
        const clampedX = Math.max(10, Math.min(390, x));
        const clampedY = Math.max(10, Math.min(390, y));

        setDraggedPoints(prev => prev.map(p =>
            p.id === activeDragId ? { ...p, x: clampedX, y: clampedY } : p
        ));
    }, [activeDragId, isChecking]);

    const handleMouseUp = useCallback(() => {
        setActiveDragId(null);
    }, []);

    useEffect(() => {
        const moveHandler = (e: any) => handleMouseMove(e);
        const upHandler = () => handleMouseUp();

        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
        window.addEventListener('touchmove', moveHandler, { passive: false });
        window.addEventListener('touchend', upHandler);
        return () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', upHandler);
            window.removeEventListener('touchmove', moveHandler);
            window.removeEventListener('touchend', upHandler);
        };
    }, [handleMouseMove, handleMouseUp]);

    const checkResult = () => {
        setIsChecking(true);

        const threshold = 15; // 15px tolerance
        let allCorrect = true;

        currentLevel.points.forEach((p, idx) => {
            const correct = reflectPoint(p, currentLevel.axis);
            const user = draggedPoints[idx];

            const dist = Math.sqrt(Math.pow(correct.x - user.x, 2) + Math.pow(correct.y - user.y, 2));
            if (dist > threshold) {
                allCorrect = false;
            }
        });

        setIsCorrect(allCorrect);
        if (allCorrect) {
            setScore(s => s + 1);
            if (currentStep === levels.length - 1) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        }
    };

    const nextLevel = () => {
        if (currentStep < levels.length - 1) {
            setCurrentStep(s => s + 1);
        } else {
            setShowResults(true);
        }
    };

    const restart = () => {
        setDifficulty(null);
        setCurrentStep(0);
        setScore(0);
        setShowResults(false);
    };

    if (!difficulty) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Tengelyes Tükrözés: Húzd a helyére! 📐</h2>
                    <p className="text-slate-500 font-medium text-lg">Válaszd ki a nehézségi szintet a kezdéshez!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card
                        onClick={() => setDifficulty('easy')}
                        className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-green-100 hover:border-green-400 bg-white/80 backdrop-blur-md rounded-[2.5rem] text-center space-y-4 group"
                    >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <Zap className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Kezdő</h3>
                        <p className="text-slate-500 text-sm">Egyetlen pont tükrözése egyszerű tengelyeken.</p>
                    </Card>

                    <Card
                        onClick={() => setDifficulty('medium')}
                        className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-amber-100 hover:border-amber-400 bg-white/80 backdrop-blur-md rounded-[2.5rem] text-center space-y-4 group"
                    >
                        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <Target className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Haladó</h3>
                        <p className="text-slate-500 text-sm">Szakaszok tükrözése vízszintes és függőleges tengelyre.</p>
                    </Card>

                    <Card
                        onClick={() => setDifficulty('hard')}
                        className="p-8 cursor-pointer hover:scale-105 transition-all border-2 border-rose-100 hover:border-rose-400 bg-white/80 backdrop-blur-md rounded-[2.5rem] text-center space-y-4 group"
                    >
                        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <Skull className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800">Mester</h3>
                        <p className="text-slate-500 text-sm">Háromszögek tükrözése tetszőleges tengelyekre.</p>
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
                    <h2 className="text-3xl font-black text-slate-800">Szép munka!</h2>
                    <p className="text-slate-500 font-medium">Sikeresen teljesítetted a {difficulty === 'easy' ? 'kezdő' : difficulty === 'medium' ? 'haladó' : 'mester'} szintet!</p>
                </div>
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 italic text-slate-600">
                    <p className="text-4xl font-black text-green-600 mb-1">{score} / {levels.length}</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Pontos megoldás</p>
                </div>
                <div className="flex gap-4">
                    <Button onClick={restart} className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-2xl py-6 font-bold shadow-lg shadow-green-200 transition-all hover:scale-105">
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Újrakezdés
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
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold shadow-lg",
                        difficulty === 'easy' ? "bg-green-500 shadow-green-100" :
                            difficulty === 'medium' ? "bg-amber-500 shadow-amber-100" : "bg-rose-500 shadow-rose-100"
                    )}>
                        {currentStep + 1}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800">{currentLevel.title}</h2>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-sm font-bold text-slate-400">Pontszám: {score}/{currentStep}</div>
                    <Button variant="ghost" onClick={restart} className="rounded-xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Szintválasztó
                    </Button>
                </div>
            </div>

            <Card className="p-8 bg-white/90 backdrop-blur-xl border-slate-100 shadow-xl rounded-[2.5rem] overflow-hidden relative">
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-800 text-center">
                        {currentLevel.description}
                    </h3>

                    <div className="flex justify-center">
                        <div className="relative bg-slate-50 rounded-[2rem] p-4 border-2 border-slate-100 shadow-inner">
                            <svg
                                ref={svgRef}
                                viewBox="0 0 400 400"
                                className="w-[350px] h-[350px] md:w-[400px] md:h-[400px] touch-none"
                            >
                                {/* Grid */}
                                <defs>
                                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
                                    </pattern>
                                </defs>
                                <rect width="400" height="400" fill="url(#grid)" />

                                {/* Axis */}
                                <line
                                    x1={currentLevel.axis.x1} y1={currentLevel.axis.y1}
                                    x2={currentLevel.axis.x2} y2={currentLevel.axis.y2}
                                    stroke="#f43f5e" strokeWidth="3" strokeDasharray="6,4"
                                />

                                {/* Helper lines (only when checking or correct) */}
                                {(isChecking || isCorrect !== null) && currentLevel.points.map((p, i) => {
                                    const correct = reflectPoint(p, currentLevel.axis);
                                    return (
                                        <line
                                            key={`helper-${i}`}
                                            x1={p.x} y1={p.y} x2={correct.x} y2={correct.y}
                                            stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2"
                                        />
                                    );
                                })}

                                {/* Original Shape */}
                                {currentLevel.points.length > 1 && (
                                    <polygon
                                        points={currentLevel.points.map(p => `${p.x},${p.y}`).join(' ')}
                                        fill="#6366f122"
                                        stroke="#6366f1"
                                        strokeWidth="2"
                                    />
                                )}
                                {currentLevel.points.map(p => (
                                    <g key={p.id}>
                                        <circle cx={p.x} cy={p.y} r="6" fill="#6366f1" />
                                        <text x={p.x + 8} y={p.y - 8} className="text-[12px] font-bold fill-indigo-600">{p.id}</text>
                                    </g>
                                ))}

                                {/* Correct Answer (hidden until checked) */}
                                {isChecking && currentLevel.points.map((p, i) => {
                                    const correct = reflectPoint(p, currentLevel.axis);
                                    return (
                                        <circle
                                            key={`correct-${i}`}
                                            cx={correct.x} cy={correct.y} r="6"
                                            fill="#22c55e" fillOpacity="0.3"
                                        />
                                    );
                                })}

                                {/* User Dragging points */}
                                {draggedPoints.length > 1 && (
                                    <polygon
                                        points={draggedPoints.map(p => `${p.x},${p.y}`).join(' ')}
                                        fill="none"
                                        stroke={isCorrect === null ? "#94a3b8" : (isCorrect ? "#22c55e" : "#ef4444")}
                                        strokeWidth="2"
                                        strokeDasharray="4,2"
                                    />
                                )}
                                {draggedPoints.map(p => (
                                    <g
                                        key={p.id}
                                        onMouseDown={(e) => handleMouseDown(e, p.id)}
                                        onTouchStart={(e) => handleMouseDown(e, p.id)}
                                        className={cn("cursor-move", isChecking && "pointer-events-none")}
                                    >
                                        <circle
                                            cx={p.x} cy={p.y} r="12"
                                            fill="rgba(255,255,255,0.1)"
                                            stroke={isCorrect === null ? "#64748b" : (isCorrect ? "#22c55e" : "#ef4444")}
                                            strokeWidth="2"
                                        />
                                        <circle
                                            cx={p.x} cy={p.y} r="4"
                                            fill={isCorrect === null ? "#64748b" : (isCorrect ? "#22c55e" : "#ef4444")}
                                        />
                                        <text x={p.x + 15} y={p.y - 15} className="text-[12px] font-bold fill-slate-500">{p.id}</text>
                                    </g>
                                ))}
                            </svg>
                        </div>
                    </div>

                    <div className="flex justify-center pt-4">
                        {!isChecking ? (
                            <Button
                                onClick={checkResult}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-12 py-6 font-bold text-lg shadow-lg shadow-indigo-100 transition-all hover:scale-105"
                            >
                                <MousePointer2 className="w-5 h-5 mr-2" />
                                Ellenőrzés
                            </Button>
                        ) : (
                            <div className="flex flex-col items-center gap-4 animate-in zoom-in">
                                {isCorrect ? (
                                    <div className="flex items-center gap-3 text-green-600 font-bold bg-green-50 px-6 py-3 rounded-2xl border border-green-100">
                                        <CheckCircle2 className="w-6 h-6" />
                                        Tökéletes megoldás!
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 text-red-600 font-bold bg-red-50 px-6 py-3 rounded-2xl border border-red-100 text-center max-w-sm">
                                        <XCircle className="w-6 h-6 shrink-0" />
                                        <span>Nem egészen... nézd meg a helyes pozíciókat (zöld), vagy próbáld újra!</span>
                                    </div>
                                )}
                                <div className="flex gap-4">
                                    {!isCorrect && (
                                        <Button
                                            onClick={() => setIsChecking(false)}
                                            variant="outline"
                                            className="rounded-2xl px-8 py-6 font-bold text-lg border-2 border-slate-200 hover:bg-slate-50"
                                        >
                                            Újra próbálom
                                        </Button>
                                    )}
                                    <Button
                                        onClick={nextLevel}
                                        className={cn(
                                            "rounded-2xl px-12 py-6 font-bold text-lg shadow-lg transition-all hover:scale-105",
                                            isCorrect ? "bg-green-500 hover:bg-green-600 text-white shadow-green-100" : "bg-slate-800 hover:bg-slate-900 text-white"
                                        )}
                                    >
                                        {currentStep === levels.length - 1 ? "Befejezés" : "Következő feladat"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}
