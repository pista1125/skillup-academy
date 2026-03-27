import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ChevronRight,
    Trophy,
    RefreshCcw,
    ArrowLeft,
    X,
    Undo2,
    CheckCircle2,
    Trash2,
    Zap,
    Target,
    Skull,
    Info,
    MousePointer2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

type Difficulty = 'easy' | 'medium' | 'hard';

interface Axis {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

interface Problem {
    id: number;
    title: string;
    type: 'path' | 'emoji';
    content: string;
    targetAxes: Axis[];
}

const PROBLEMS: Record<Difficulty, Problem[]> = {
    easy: [
        {
            id: 1,
            title: "Négyzet",
            type: 'path',
            content: "M 25,25 H 75 V 75 H 25 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 }, // Vertical
                { x1: 10, y1: 50, x2: 90, y2: 50 }, // Horizontal
                { x1: 10, y1: 10, x2: 90, y2: 90 }, // Diagonal 1
                { x1: 90, y1: 10, x2: 10, y2: 90 }  // Diagonal 2
            ]
        },
        {
            id: 2,
            title: "Téglalap",
            type: 'path',
            content: "M 20,35 H 80 V 65 H 20 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 }, // Vertical
                { x1: 10, y1: 50, x2: 90, y2: 50 }  // Horizontal
            ]
        },
        {
            id: 3,
            title: "Egyenlő szárú háromszög",
            type: 'path',
            content: "M 20,70 L 50,20 L 80,70 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 80 }
            ]
        },
        {
            id: 4,
            title: "Egyenlő oldalú háromszög",
            type: 'path',
            content: "M 50,15 L 85,75 L 15,75 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 },
                { x1: 10, y1: 75, x2: 90, y2: 30 }, // Roughly
                { x1: 10, y1: 30, x2: 90, y2: 75 }  // Roughly
            ]
        },
        {
            id: 5,
            title: "Rombusz",
            type: 'path',
            content: "M 50,20 L 80,50 L 50,80 L 20,50 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 },
                { x1: 10, y1: 50, x2: 90, y2: 50 }
            ]
        },
        {
            id: 6,
            title: "Nyíl",
            type: 'path',
            content: "M 20,50 L 50,20 V 40 H 80 V 60 H 50 V 80 Z",
            targetAxes: [
                { x1: 10, y1: 50, x2: 90, y2: 50 }
            ]
        },
        {
            id: 7,
            title: "Házikó",
            type: 'path',
            content: "M 30,80 V 50 L 50,30 L 70,50 V 80 Z",
            targetAxes: [
                { x1: 50, y1: 20, x2: 50, y2: 90 }
            ]
        },
        {
            id: 8,
            title: "Szív",
            type: 'path',
            content: "M 50,80 C 50,80 20,60 20,40 C 20,20 40,20 50,40 C 60,20 80,20 80,40 C 80,60 50,80 50,80 Z",
            targetAxes: [
                { x1: 50, y1: 20, x2: 50, y2: 90 }
            ]
        },
        {
            id: 9,
            title: "Pillangó (egyszerű)",
            type: 'path',
            content: "M 50,50 L 80,20 V 80 L 50,50 L 20,80 V 20 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 }
            ]
        },
        {
            id: 10,
            title: "Kereszt",
            type: 'path',
            content: "M 40,20 H 60 V 40 H 80 V 60 H 60 V 80 H 40 V 60 H 20 V 40 H 40 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 },
                { x1: 10, y1: 50, x2: 90, y2: 50 },
                { x1: 10, y1: 10, x2: 90, y2: 90 },
                { x1: 90, y1: 10, x2: 10, y2: 90 }
            ]
        }
    ],
    medium: [
        {
            id: 11,
            title: "Szabályos ötszög",
            type: 'path',
            content: "M 50,15 L 85,41 L 71,83 L 29,83 L 15,41 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 },
                { x1: 10, y1: 45, x2: 90, y2: 60 },
                { x1: 90, y1: 45, x2: 10, y2: 60 },
                { x1: 25, y1: 85, x2: 65, y2: 25 },
                { x1: 75, y1: 85, x2: 35, y2: 25 }
            ]
        },
        {
            id: 12,
            title: "Szabályos hatszög",
            type: 'path',
            content: "M 35,20 H 65 L 80,50 L 65,80 H 35 L 20,50 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 },
                { x1: 10, y1: 50, x2: 90, y2: 50 },
                { x1: 20, y1: 20, x2: 80, y2: 80 },
                { x1: 80, y1: 20, x2: 20, y2: 80 },
                { x1: 30, y1: 10, x2: 70, y2: 90 },
                { x1: 70, y1: 10, x2: 30, y2: 90 }
            ]
        },
        {
            id: 13,
            title: "Ötágú csillag",
            type: 'path',
            content: "M 50,15 L 61,40 H 88 L 66,57 L 75,85 L 50,68 L 25,85 L 34,57 L 12,40 H 39 Z",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 },
                { x1: 15, y1: 35, x2: 75, y2: 80 },
                { x1: 85, y1: 35, x2: 25, y2: 80 },
                { x1: 30, y1: 85, x2: 65, y2: 35 },
                { x1: 70, y1: 85, x2: 35, y2: 35 }
            ]
        },
        {
            id: 14,
            title: "Levél",
            type: 'path',
            content: "M 50,85 C 50,85 20,60 20,40 C 20,20 40,15 50,15 C 60,15 80,20 80,40 C 80,60 50,85 50,85 Z L 50,95",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 95 }
            ]
        },
        {
            id: 15,
            title: "Hópehely-szerű",
            type: 'path',
            content: "M 50,20 V 80 M 20,50 H 80 M 30,30 L 70,70 M 70,30 L 30,70",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 },
                { x1: 10, y1: 50, x2: 90, y2: 50 },
                { x1: 10, y1: 10, x2: 90, y2: 90 },
                { x1: 90, y1: 10, x2: 10, y2: 90 }
            ]
        },
        {
            id: 16,
            title: "D-betű",
            type: 'path',
            content: "M 40,20 V 80 H 50 C 70,80 70,20 50,20 Z",
            targetAxes: [
                { x1: 30, y1: 50, x2: 80, y2: 50 }
            ]
        },
        {
            id: 17,
            title: "E-betű",
            type: 'path',
            content: "M 60,20 H 35 V 80 H 60 M 35,50 H 55",
            targetAxes: [
                { x1: 30, y1: 50, x2: 70, y2: 50 }
            ]
        },
        {
            id: 18,
            title: "M-betű",
            type: 'path',
            content: "M 20,80 V 20 L 50,50 L 80,20 V 80",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 }
            ]
        },
        {
            id: 19,
            title: "X-betű",
            type: 'path',
            content: "M 25,20 L 75,80 M 75,20 L 25,80",
            targetAxes: [
                { x1: 50, y1: 10, x2: 50, y2: 90 },
                { x1: 10, y1: 50, x2: 90, y2: 50 },
                { x1: 10, y1: 10, x2: 90, y2: 90 },
                { x1: 90, y1: 10, x2: 10, y2: 90 }
            ]
        },
        {
            id: 20,
            title: "Trapéz",
            type: 'path',
            content: "M 30,30 H 70 L 85,70 H 15 Z",
            targetAxes: [
                { x1: 50, y1: 20, x2: 50, y2: 90 }
            ]
        }
    ],
    hard: [
        { id: 21, title: "🦋 Pillangó", type: 'emoji', content: "🦋", targetAxes: [{ x1: 50, y1: 10, x2: 50, y2: 90 }] },
        { id: 22, title: "🚀 Rakéta", type: 'emoji', content: "🚀", targetAxes: [{ x1: 15, y1: 85, x2: 85, y2: 15 }] },
        { id: 23, title: "🦀 Rák", type: 'emoji', content: "🦀", targetAxes: [{ x1: 50, y1: 10, x2: 50, y2: 90 }] },
        { id: 24, title: "🚗 Autó", type: 'emoji', content: "🚗", targetAxes: [{ x1: 50, y1: 10, x2: 50, y2: 90 }] },
        { id: 25, title: "🧩 Kirakós", type: 'emoji', content: "🧩", targetAxes: [] },
        { id: 26, title: "👑 Korona", type: 'emoji', content: "👑", targetAxes: [{ x1: 50, y1: 10, x2: 50, y2: 90 }] },
        { id: 27, title: "🪁 Papírsárkány", type: 'emoji', content: "🪁", targetAxes: [{ x1: 15, y1: 15, x2: 85, y2: 85 }] },
        { id: 28, title: "🛸 UFO", type: 'emoji', content: "🛸", targetAxes: [{ x1: 50, y1: 10, x2: 50, y2: 90 }] },
        { id: 29, title: "🪟 Ablak", type: 'emoji', content: "🪟", targetAxes: [{ x1: 50, y1: 10, x2: 50, y2: 90 }, { x1: 10, y1: 50, x2: 90, y2: 50 }] },
        { id: 30, title: "🦉 Bagoly", type: 'emoji', content: "🦉", targetAxes: [{ x1: 50, y1: 10, x2: 50, y2: 90 }] }
    ]
};

export function AxialSymmetryQuiz({ onBack }: { onBack: () => void }) {
    const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [lines, setLines] = useState<Axis[]>([]);
    const [drawingStart, setDrawingStart] = useState<{ x: number, y: number } | null>(null);
    const [mousePos, setMousePos] = useState<{ x: number, y: number } | null>(null);
    const [foundAxesIndices, setFoundAxesIndices] = useState<number[]>([]);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [feedback, setFeedback] = useState<{ text: string, type: 'success' | 'info' | 'error' } | null>(null);

    const svgRef = useRef<SVGSVGElement>(null);

    const problems = difficulty ? PROBLEMS[difficulty] : [];
    const problem = problems[currentStep];

    const getSVGPoint = (clientX: number, clientY: number) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const transformed = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        return {
            x: Math.round(transformed.x / 5) * 5,
            y: Math.round(transformed.y / 5) * 5
        };
    };

    const checkSymmetry = (drawn: Axis) => {
        if (!problem) return;

        const targetAxes = problem.targetAxes;
        let foundIndex = -1;

        targetAxes.forEach((target, idx) => {
            if (foundAxesIndices.includes(idx)) return;

            const drawnAngle = Math.atan2(drawn.y2 - drawn.y1, drawn.x2 - drawn.x1) * (180 / Math.PI);
            const targetAngle = Math.atan2(target.y2 - target.y1, target.x2 - target.x1) * (180 / Math.PI);

            const normDrawn = (drawnAngle + 360) % 180;
            const normTarget = (targetAngle + 360) % 180;

            const angleDiff = Math.min(Math.abs(normDrawn - normTarget), 180 - Math.abs(normDrawn - normTarget));

            const distToDrawnCenter = (drawn.x1 + drawn.x2) / 2;
            const distToTargetCenter = (target.x1 + target.x2) / 2;
            const yDistToDrawnCenter = (drawn.y1 + drawn.y2) / 2;
            const yDistToTargetCenter = (target.y1 + target.y2) / 2;

            const centerDist = Math.sqrt(Math.pow(distToDrawnCenter - distToTargetCenter, 2) + Math.pow(yDistToDrawnCenter - yDistToTargetCenter, 2));

            if (angleDiff < 15 && centerDist < 15) {
                foundIndex = idx;
            }
        });

        if (foundIndex !== -1) {
            setFoundAxesIndices(prev => [...prev, foundIndex]);
            setFeedback({ text: "Szuper! Megtaláltál egy szimmetriatengelyt!", type: 'success' });
            setLines(prev => prev.slice(0, -1));

            if (foundAxesIndices.length + 1 >= targetAxes.length) {
                setFeedback({ text: "Ügyes vagy! Összes tengely megvan.", type: 'success' });
            }
        } else {
            setFeedback({ text: "Ez nem tűnik szimmetriatengelynek. Próbáld újra!", type: 'error' });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!problem || foundAxesIndices.length === problem.targetAxes.length) return;
        const pt = getSVGPoint(e.clientX, e.clientY);
        setDrawingStart(pt);
        setMousePos(pt);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (drawingStart) {
            setMousePos(getSVGPoint(e.clientX, e.clientY));
        }
    };

    const handleMouseUp = () => {
        if (drawingStart && mousePos) {
            if (drawingStart.x === mousePos.x && drawingStart.y === mousePos.y) {
                setDrawingStart(null);
                return;
            }
            const newLine = { x1: drawingStart.x, y1: drawingStart.y, x2: mousePos.x, y2: mousePos.y };
            setLines(prev => [...prev, newLine]);
            checkSymmetry(newLine);
        }
        setDrawingStart(null);
        setMousePos(null);
    };

    const nextStep = () => {
        if (currentStep < problems.length - 1) {
            setCurrentStep(s => s + 1);
            setFoundAxesIndices([]);
            setLines([]);
            setFeedback(null);
        } else {
            setShowResults(true);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    };

    const restart = () => {
        setDifficulty(null);
        setCurrentStep(0);
        setScore(0);
        setShowResults(false);
        setLines([]);
        setFoundAxesIndices([]);
        setFeedback(null);
    };

    if (!difficulty) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Tengelyes Szimmetria Kereső 📏</h2>
                    <p className="text-slate-500 font-medium text-lg">Rajzold be az alakzatok összes szimmetriatengelyét!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <LevelCard
                        level="easy"
                        title="Kezdő"
                        desc="Egyszerű mértani alakzatok."
                        icon={<Zap className="w-8 h-8" />}
                        color="green"
                        onClick={() => setDifficulty('easy')}
                    />
                    <LevelCard
                        level="medium"
                        title="Közepes"
                        desc="Összetettebb formák és betűk."
                        icon={<Target className="w-8 h-8" />}
                        color="amber"
                        onClick={() => setDifficulty('medium')}
                    />
                    <LevelCard
                        level="hard"
                        title="Mester"
                        desc="Keresd a szimmetriát az emojikon!"
                        icon={<Skull className="w-8 h-8" />}
                        color="rose"
                        onClick={() => setDifficulty('hard')}
                    />
                </div>

                <div className="flex justify-center">
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
            <Card className="p-10 text-center space-y-8 max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border-green-100 shadow-2xl rounded-[3rem] animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-200">
                    <Trophy className="w-12 h-12 text-white" />
                </div>
                <div>
                    <h2 className="text-4xl font-black text-slate-800">Szép munka!</h2>
                    <p className="text-slate-500 font-medium text-lg mt-2">Mestere vagy a szimmetriának!</p>
                </div>

                <div className="flex gap-4">
                    <Button onClick={restart} className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-2xl py-8 text-lg font-bold shadow-lg shadow-green-100 transition-all hover:scale-105">
                        <RefreshCcw className="w-6 h-6 mr-3" />
                        Újrakezdés
                    </Button>
                    <Button variant="outline" onClick={onBack} className="flex-1 border-2 border-slate-200 rounded-2xl py-8 text-lg font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowLeft className="w-6 h-6 mr-3" />
                        Vissza
                    </Button>
                </div>
            </Card>
        );
    }

    const allFound = foundAxesIndices.length === problem.targetAxes.length;

    return (
        <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-in slide-in-from-bottom-8 duration-700">
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm px-6">
                <div className="flex items-center gap-4">
                    <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg",
                        difficulty === 'easy' ? "bg-green-500" : difficulty === 'medium' ? "bg-amber-500" : "bg-rose-500"
                    )}>
                        {currentStep + 1}
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-xl text-slate-800">{problem.title}</h3>
                        <div className="flex gap-1.5 mt-1.5">
                            {problems.map((_, i) => (
                                <div key={i} className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    i === currentStep ? "w-8 bg-indigo-500" : i < currentStep ? "w-3 bg-green-400" : "w-3 bg-slate-200"
                                )} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Cél</span>
                    <div className="flex gap-1">
                        {problem.targetAxes.map((_, i) => (
                            <div key={i} className={cn(
                                "w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all",
                                foundAxesIndices.includes(i) ? "bg-green-500 border-green-500 text-white" : "border-slate-200 text-slate-300"
                            )}>
                                <CheckCircle2 className="w-4 h-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-8 p-6 bg-white/90 backdrop-blur-xl border-slate-100 shadow-xl rounded-[2.5rem] relative select-none">
                    <div className="absolute top-6 left-6 z-10">
                        <div className="flex items-center gap-2 bg-slate-100/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            <MousePointer2 className="w-3 h-3 text-indigo-500" /> Kattints és húzd a vonalat!
                        </div>
                    </div>

                    <div className="aspect-square w-full max-w-[500px] mx-auto relative bg-slate-50 rounded-[2rem] border-2 border-slate-100 overflow-hidden">
                        <svg
                            ref={svgRef}
                            viewBox="0 0 100 100"
                            className="w-full h-full cursor-crosshair touch-none"
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={() => { setDrawingStart(null); setMousePos(null); }}
                        >
                            {Array.from({ length: 11 }).map((_, i) =>
                                Array.from({ length: 11 }).map((_, j) => (
                                    <circle key={`${i}-${j}`} cx={i * 10} cy={j * 10} r="0.3" fill="#cbd5e1" />
                                ))
                            )}

                            {problem.type === 'path' ? (
                                <path
                                    d={problem.content}
                                    fill="none"
                                    stroke="#1e293b"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="drop-shadow-sm"
                                />
                            ) : (
                                <text
                                    x="50" y="60"
                                    textAnchor="middle"
                                    fontSize="55"
                                    className="select-none pointer-events-none drop-shadow-md"
                                >
                                    {problem.content}
                                </text>
                            )}

                            {foundAxesIndices.map(idx => {
                                const axis = problem.targetAxes[idx];
                                return (
                                    <line
                                        key={`target-${idx}`}
                                        x1={axis.x1} y1={axis.y1} x2={axis.x2} y2={axis.y2}
                                        stroke="#22c55e"
                                        strokeWidth="2"
                                        strokeDasharray="4 2"
                                        className="animate-in fade-in duration-500"
                                    />
                                );
                            })}

                            {lines.map((line, i) => (
                                <line
                                    key={i}
                                    x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
                                    stroke="#ef4444"
                                    strokeWidth="1.5"
                                    strokeDasharray="5 5"
                                />
                            ))}

                            {drawingStart && mousePos && (
                                <line
                                    x1={drawingStart.x} y1={drawingStart.y}
                                    x2={mousePos.x} y2={mousePos.y}
                                    stroke="#6366f1"
                                    strokeWidth="2"
                                    strokeDasharray="3 3"
                                />
                            )}
                        </svg>
                    </div>
                </Card>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="p-8 bg-slate-900 text-white rounded-[2.5rem] shadow-xl space-y-4">
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Info className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h4 className="text-xl font-bold">Útmutató</h4>
                        <ul className="space-y-3 text-slate-300 text-sm">
                            <li className="flex gap-3">
                                <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
                                Figyeld meg az alakzatot alaposan!
                            </li>
                            <li className="flex gap-3">
                                <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
                                Húzz egy egyenest a szimmetriatengely mentén!
                            </li>
                            <li className="flex gap-3">
                                <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
                                Találd meg az összes ({problem.targetAxes.length}) tengelyt!
                            </li>
                        </ul>
                    </Card>

                    {feedback && (
                        <div className={cn(
                            "p-6 rounded-3xl border-2 animate-in slide-in-from-right-4 duration-300",
                            feedback.type === 'success' ? "bg-green-50 border-green-100 text-green-700" :
                                feedback.type === 'error' ? "bg-red-50 border-red-100 text-red-700" : "bg-blue-50 border-blue-100 text-blue-700"
                        )}>
                            <div className="flex gap-3 items-center">
                                {feedback.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <Info className="w-6 h-6" />}
                                <p className="font-bold">{feedback.text}</p>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            disabled={lines.length === 0}
                            onClick={() => { setLines([]); setFeedback(null); }}
                            className="flex-1 rounded-2xl py-6 border-slate-200 hover:bg-slate-50 text-slate-500 font-bold"
                        >
                            <Trash2 className="w-4 h-4 mr-2" /> Törlés
                        </Button>
                        <Button
                            disabled={!allFound}
                            onClick={nextStep}
                            className={cn(
                                "flex-2 rounded-2xl py-6 font-bold px-8 transition-all hover:scale-105",
                                allFound ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100" : "bg-slate-100 text-slate-400"
                            )}
                        >
                            {currentStep === problems.length - 1 ? 'Befejezés' : 'Következő'}
                            <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LevelCard({ title, desc, icon, color, onClick, level }: { level: string, title: string, desc: string, icon: React.ReactNode, color: string, onClick: () => void }) {
    const colorMap = {
        green: "border-green-100 hover:border-green-400 bg-green-50/30 text-green-600",
        amber: "border-amber-100 hover:border-amber-400 bg-amber-50/30 text-amber-600",
        rose: "border-rose-100 hover:border-rose-400 bg-rose-50/30 text-rose-600"
    };

    const ringMap = {
        green: "bg-green-100 group-hover:bg-green-500",
        amber: "bg-amber-100 group-hover:bg-amber-500",
        rose: "bg-rose-100 group-hover:bg-rose-500"
    };

    return (
        <Card
            onClick={onClick}
            className={cn(
                "p-8 cursor-pointer hover:scale-[1.03] transition-all border-2 backdrop-blur-md rounded-[2.5rem] text-center space-y-4 group shadow-sm hover:shadow-xl",
                colorMap[color as keyof typeof colorMap]
            )}
        >
            <div className={cn(
                "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto group-hover:text-white transition-colors duration-300",
                ringMap[color as keyof typeof ringMap]
            )}>
                {icon}
            </div>
            <h3 className="text-2xl font-black text-slate-800">{title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            <div className="pt-2">
                <span className="px-5 py-1.5 bg-white/80 border border-current/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                    10 feladat
                </span>
            </div>
        </Card>
    );
}
