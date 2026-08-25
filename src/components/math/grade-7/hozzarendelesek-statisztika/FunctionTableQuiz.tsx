import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    CheckCircle2,
    XCircle,
    Trophy,
    HelpCircle,
    Star,
    Medal,
    Crown,
    Check,
    X,
    AlertCircle,
    Info,
    Grid3X3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface TableColumn {
    id: string;
    x: number | null; // null if it is an input
    y: number | null; // null if it is an input
    expectedX?: number;
    expectedY?: number;
}

interface LevelData {
    id: number;
    title: string;
    ruleDesc: string;
    minX: number;
    maxX: number;
    columns: TableColumn[];
    isFunction: boolean;
}

const LEVELS: LevelData[] = [
    {
        id: 1,
        title: "1. szint: Lineáris függvény",
        ruleDesc: "Olvasd le a grafikonról az összetartozó értékeket, és töltsd ki a táblázat hiányzó mezőit!",
        minX: -1,
        maxX: 3,
        isFunction: true,
        columns: [
            { id: '1-1', x: -1, y: null, expectedY: -4 },
            { id: '1-2', x: 0, y: null, expectedY: -2 },
            { id: '1-3', x: null, y: 0, expectedX: 1 },
            { id: '1-4', x: 2, y: null, expectedY: 2 },
            { id: '1-5', x: null, y: 4, expectedX: 3 }
        ]
    },
    {
        id: 2,
        title: "2. szint: Szakaszos függvény",
        ruleDesc: "Olvasd le a szakaszokból álló grafikon értékeit és töltsd ki a táblázatot!",
        minX: -4,
        maxX: 4,
        isFunction: true,
        columns: [
            { id: '2-1', x: -4, y: null, expectedY: -2 },
            { id: '2-2', x: null, y: 0, expectedX: -2 },
            { id: '2-3', x: 0, y: null, expectedY: 1 },
            { id: '2-4', x: 2, y: null, expectedY: 1 },
            { id: '2-5', x: 3, y: null, expectedY: -1 },
            { id: '2-6', x: null, y: -3, expectedX: 4 }
        ]
    },
    {
        id: 3,
        title: "3. szint: Abszolútérték-függvény",
        ruleDesc: "Olvasd le a V-alakú grafikon értékeit és töltsd ki a táblázatot!",
        minX: -3,
        maxX: 3,
        isFunction: true,
        columns: [
            { id: '3-1', x: -3, y: null, expectedY: 0 },
            { id: '3-2', x: -2, y: null, expectedY: -1 },
            { id: '3-3', x: -1, y: null, expectedY: -2 },
            { id: '3-4', x: null, y: -3, expectedX: 0 },
            { id: '3-5', x: 1, y: null, expectedY: -2 },
            { id: '3-6', x: 2, y: null, expectedY: -1 },
            { id: '3-7', x: 3, y: null, expectedY: 0 }
        ]
    }
];

// Returns y for a given x based on level function rules
function getFnValue(levelId: number, x: number): number | null {
    if (levelId === 1) {
        // f(x) = 2x - 2
        if (x < -1.5 || x > 3.5) return null;
        return 2 * x - 2;
    } else if (levelId === 2) {
        // Piecewise:
        // segment 1: [-4, -1] -> y = x + 2
        // segment 2: [-1, 2] -> y = 1
        // segment 3: [2, 4] -> y = 5 - 2x
        if (x < -4 || x > 4) return null;
        if (x <= -1) return x + 2;
        if (x <= 2) return 1;
        return 5 - 2 * x;
    } else if (levelId === 3) {
        // f(x) = |x| - 3
        if (x < -4 || x > 4) return null;
        return Math.abs(x) - 3;
    }
    return null;
}

// Convert math coordinates to SVG coordinates (0 to 300 viewBox)
function toSVG(x: number, y: number) {
    return {
        x: 150 + x * 25,
        y: 150 - y * 25
    };
}

export function FunctionTableQuiz({ onBack }: { onBack: () => void }) {
    const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
    const [inputs, setInputs] = useState<Record<string, string>>({});
    
    // UI state
    const [isVerified, setIsVerified] = useState(false);
    const [showSolutions, setShowSolutions] = useState(false);
    const [isCorrectResult, setIsCorrectResult] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [score, setScore] = useState(0);
    const [completedLevels, setCompletedLevels] = useState<number[]>([]);
    
    // Hover/focus projection lines state
    const [activeX, setActiveX] = useState<number | null>(null);
    const [hoveredCanvasX, setHoveredCanvasX] = useState<number | null>(null);

    const svgRef = useRef<SVGSVGElement>(null);
    const currentLevel = LEVELS.find(l => l.id === selectedLevelId);

    const startLevel = (levelId: number) => {
        setSelectedLevelId(levelId);
        setInputs({});
        setIsVerified(false);
        setShowSolutions(false);
        setIsCorrectResult(false);
        setActiveX(null);
        setHoveredCanvasX(null);
    };

    const handleInputChange = (colId: string, val: string) => {
        if (isVerified) return;
        setInputs(prev => ({
            ...prev,
            [colId]: val
        }));
    };

    const handleInputFocus = (col: TableColumn) => {
        // Set the active X for projection rendering
        if (col.x !== null) {
            setActiveX(col.x);
        } else if (col.expectedX !== undefined) {
            setActiveX(col.expectedX);
        }
    };

    const handleInputBlur = () => {
        setActiveX(null);
    };

    const handleSvgMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
        if (!svgRef.current || !currentLevel || isVerified || showSolutions) return;
        const rect = svgRef.current.getBoundingClientRect();
        const svgX = e.clientX - rect.left;
        
        // Scale to 300 viewport
        const scaleX = 300 / rect.width;
        const vpX = svgX * scaleX;
        
        // Convert to math coordinate
        const mathX = Math.round((vpX - 150) / 25);
        
        if (mathX >= currentLevel.minX && mathX <= currentLevel.maxX) {
            setHoveredCanvasX(mathX);
        } else {
            setHoveredCanvasX(null);
        }
    };

    const handleSvgMouseLeave = () => {
        setHoveredCanvasX(null);
    };

    const verifyLevel = () => {
        if (!currentLevel || isVerified) return;

        setAttempts(prev => prev + 1);

        let allCorrect = true;
        currentLevel.columns.forEach(col => {
            const val = inputs[col.id]?.trim();
            if (col.x === null && col.expectedX !== undefined) {
                // User input for x
                const num = parseInt(val, 10);
                if (num !== col.expectedX) allCorrect = false;
            } else if (col.y === null && col.expectedY !== undefined) {
                // User input for y
                const num = parseInt(val, 10);
                if (num !== col.expectedY) allCorrect = false;
            }
        });

        setIsVerified(true);
        setIsCorrectResult(allCorrect);

        if (allCorrect) {
            setScore(prev => prev + 1);
            if (!completedLevels.includes(currentLevel.id)) {
                setCompletedLevels(prev => [...prev, currentLevel.id]);
            }
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#06b6d4', '#10b981', '#6366f1']
            });
        }
    };

    const revealSolutions = () => {
        if (!currentLevel) return;
        
        const solvedInputs: Record<string, string> = {};
        currentLevel.columns.forEach(col => {
            if (col.x === null && col.expectedX !== undefined) {
                solvedInputs[col.id] = col.expectedX.toString();
            } else if (col.y === null && col.expectedY !== undefined) {
                solvedInputs[col.id] = col.expectedY.toString();
            }
        });

        setInputs(solvedInputs);
        setShowSolutions(true);
        setIsVerified(true);
    };

    // Helper to render checkmark/cross for fields
    const getFieldStatus = (col: TableColumn) => {
        if (!isVerified) return 'default';
        const val = inputs[col.id]?.trim();
        
        if (col.x === null && col.expectedX !== undefined) {
            const num = parseInt(val, 10);
            return num === col.expectedX ? 'correct' : 'incorrect';
        } else if (col.y === null && col.expectedY !== undefined) {
            const num = parseInt(val, 10);
            return num === col.expectedY ? 'correct' : 'incorrect';
        }
        return 'default';
    };

    // Render grid lines for -5 to +5
    const renderGrid = () => {
        const lines = [];
        for (let i = -5; i <= 5; i++) {
            const pt1 = toSVG(i, -5);
            const pt2 = toSVG(i, 5);
            const pt3 = toSVG(-5, i);
            const pt4 = toSVG(5, i);
            
            // Grid lines
            lines.push(
                <line 
                    key={`v-${i}`} 
                    x1={pt1.x} y1={pt1.y} x2={pt2.x} y2={pt2.y} 
                    stroke="#e2e8f0" strokeWidth={i === 0 ? 0 : 1}
                />
            );
            lines.push(
                <line 
                    key={`h-${i}`} 
                    x1={pt3.x} y1={pt3.y} x2={pt4.x} y2={pt4.y} 
                    stroke="#e2e8f0" strokeWidth={i === 0 ? 0 : 1}
                />
            );

            // Numbers on axis ticks (except 0)
            if (i !== 0) {
                lines.push(
                    <text 
                        key={`t-x-${i}`} 
                        x={150 + i * 25} y={163} 
                        fontSize="9" textAnchor="middle" 
                        className="fill-slate-400 font-bold select-none"
                    >
                        {i}
                    </text>
                );
                lines.push(
                    <text 
                        key={`t-y-${i}`} 
                        x={138} y={153 - i * 25} 
                        fontSize="9" textAnchor="end" 
                        className="fill-slate-400 font-bold select-none"
                    >
                        {i}
                    </text>
                );
            }
        }
        return lines;
    };

    // Render path of the function
    const renderFunctionPath = (levelId: number) => {
        if (levelId === 1) {
            // f(x) = 2x - 2, draw from x = -1.5 to 3.5
            const p1 = toSVG(-1.5, -5);
            const p2 = toSVG(3.5, 5);
            return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="#2563eb" strokeWidth={3.5} strokeLinecap="round" />;
        } else if (levelId === 2) {
            // Pieces: (-4, -2) -> (-1, 1) -> (2, 1) -> (4, -3)
            const p1 = toSVG(-4, -2);
            const p2 = toSVG(-1, 1);
            const p3 = toSVG(2, 1);
            const p4 = toSVG(4, -3);
            return (
                <path 
                    d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p4.x} ${p4.y}`} 
                    stroke="#2563eb" strokeWidth={3.5} strokeLinecap="round" fill="none" 
                />
            );
        } else if (levelId === 3) {
            // Absolute value: V-shape from (-4, 1) to (0, -3) to (4, 1)
            const p1 = toSVG(-4, 1);
            const p2 = toSVG(0, -3);
            const p3 = toSVG(4, 1);
            return (
                <path 
                    d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y}`} 
                    stroke="#2563eb" strokeWidth={3.5} strokeLinecap="round" fill="none" 
                />
            );
        }
        return null;
    };

    // Render key point circles on function line
    const renderFunctionPoints = (levelId: number) => {
        const points = [];
        const minX = levelId === 1 ? -1 : -4;
        const maxX = levelId === 1 ? 3 : 4;
        
        for (let x = minX; x <= maxX; x++) {
            const y = getFnValue(levelId, x);
            if (y !== null) {
                const pt = toSVG(x, y);
                points.push(
                    <circle 
                        key={`pt-${x}`} 
                        cx={pt.x} cy={pt.y} r={4.5} 
                        fill="#2563eb" stroke="white" strokeWidth={1.5}
                        className="transition-transform duration-200 hover:scale-150 cursor-pointer"
                    />
                );
            }
        }
        return points;
    };

    // Projection projection lines to axes (when input is focused or canvas is hovered)
    const renderProjections = () => {
        const xVal = hoveredCanvasX !== null ? hoveredCanvasX : activeX;
        if (xVal === null || !currentLevel) return null;
        
        const yVal = getFnValue(currentLevel.id, xVal);
        if (yVal === null) return null;
        
        const graphPt = toSVG(xVal, yVal);
        const xAxisPt = toSVG(xVal, 0);
        const yAxisPt = toSVG(0, yVal);
        
        return (
            <g className="animate-fade-in">
                {/* Vertical projection line to x axis */}
                <line 
                    x1={graphPt.x} y1={graphPt.y} x2={xAxisPt.x} y2={xAxisPt.y} 
                    stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="3,3" 
                />
                {/* Horizontal projection line to y axis */}
                <line 
                    x1={graphPt.x} y1={graphPt.y} x2={yAxisPt.x} y2={yAxisPt.y} 
                    stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="3,3" 
                />
                {/* Highlight node */}
                <circle cx={graphPt.x} cy={graphPt.y} r={6.5} fill="#06b6d4" stroke="white" strokeWidth={1.5} />
                
                {/* Hover bubble coordinate tooltip inside SVG */}
                {hoveredCanvasX !== null && (
                    <g transform={`translate(${graphPt.x + 10}, ${graphPt.y - 12})`}>
                        <rect x="-4" y="-14" width="38" height="18" rx="4" fill="#334155" />
                        <text x="15" y="-2" fontSize="9" fontWeight="bold" fill="white" textAnchor="middle">
                            ({xVal};{yVal})
                        </text>
                    </g>
                )}
            </g>
        );
    };

    if (!selectedLevelId) {
        return (
            <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between px-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100 text-xs font-bold">
                        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                        Vissza
                    </Button>
                    <h2 className="text-xl font-black text-slate-800 tracking-tight">Függvény Leolvasás Kvíz</h2>
                    <div className="flex items-center gap-1.5 bg-cyan-50 px-2.5 py-1 rounded-2xl border border-cyan-200 shadow-sm text-xs font-black text-cyan-700">
                        <Trophy className="w-3.5 h-3.5" />
                        <span>{completedLevels.length}/{LEVELS.length} Kész</span>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg flex items-center gap-4">
                    <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm hidden sm:block">
                        <Grid3X3 className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                        <h3 className="font-bold text-sm mb-0.5">Hogyan kell játszani?</h3>
                        <p className="text-cyan-100 text-xs leading-normal">
                            Válassz ki egy szintet! Keresd meg az $x$ vagy $y$ tengelyen a megadott számot, 
                            vesd ki a kék grafikonra, majd olvasd le az összetartozó értéket! 
                            A táblázat beviteli mezőit töltsd ki, majd kattints az Ellenőrzésre!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {LEVELS.map((level) => {
                        const isCompleted = completedLevels.includes(level.id);

                        return (
                            <button
                                key={level.id}
                                onClick={() => startLevel(level.id)}
                                className={cn(
                                    "flex flex-col items-start p-5 bg-white border-2 rounded-2xl text-left hover:shadow-md hover:scale-[1.01] transition-all group relative overflow-hidden",
                                    isCompleted 
                                        ? "border-emerald-100 hover:border-emerald-400 bg-emerald-50/20" 
                                        : "border-slate-100 hover:border-cyan-400"
                                )}
                            >
                                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100/50 rounded-full translate-x-8 -translate-y-8 group-hover:scale-125 transition-transform duration-500" />
                                
                                <div className="flex items-center justify-between w-full mb-2 z-10">
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-700">
                                        Grafikon
                                    </span>
                                    {isCompleted && (
                                        <div className="p-0.5 bg-emerald-100 text-emerald-600 rounded-full">
                                            <Check className="w-3 h-3 stroke-[3]" />
                                        </div>
                                    )}
                                </div>

                                <h4 className="text-sm font-black text-slate-800 mb-0.5 z-10 leading-tight">
                                    {level.title}
                                </h4>
                                <p className="text-[11px] text-slate-500 font-medium mb-3 line-clamp-1 z-10">
                                    {level.ruleDesc}
                                </p>
                                
                                <span className={cn(
                                    "mt-auto text-[10px] font-bold px-2.5 py-0.5 rounded-lg transition-colors z-10",
                                    isCompleted 
                                        ? "bg-emerald-100 text-emerald-700" 
                                        : "bg-slate-100 text-slate-600 group-hover:bg-cyan-600 group-hover:text-white"
                                )}>
                                    {isCompleted ? "Teljesítve" : "Indítás"}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header & Subtitle */}
            <div className="flex items-center justify-between px-1">
                <Button 
                    variant="ghost" 
                    onClick={() => setSelectedLevelId(null)} 
                    size="sm" 
                    className="hover:bg-slate-100 text-xs font-bold h-8"
                >
                    <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                    Szintek
                </Button>
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-base font-black text-slate-800 leading-tight">
                        {currentLevel.title}
                    </h2>
                    <span className="text-[11px] text-slate-500 font-bold max-w-xs sm:max-w-md line-clamp-1">
                        {currentLevel.ruleDesc}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button 
                        variant="ghost" 
                        onClick={() => startLevel(currentLevel.id)} 
                        size="sm" 
                        className="text-slate-500 hover:bg-slate-100 text-xs font-bold h-8"
                    >
                        <RotateCcw className="w-3.5 h-3.5 mr-1" />
                        Újra
                    </Button>
                </div>
            </div>

            {/* Main Interactive Board Card */}
            <Card className="border-2 shadow-lg bg-slate-50/40 p-4 relative overflow-hidden">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 w-full relative">
                    
                    {/* Left Column: Coordinate System Graph */}
                    <div className="flex-1 flex flex-col items-center select-none bg-white p-4 rounded-2xl border shadow-inner">
                        <svg 
                            ref={svgRef}
                            viewBox="0 0 300 300" 
                            className="w-full max-w-[280px] aspect-square relative"
                            onMouseMove={handleSvgMouseMove}
                            onMouseLeave={handleSvgMouseLeave}
                            style={{ overflow: 'visible' }}
                        >
                            {/* Grid & Axis Ticks */}
                            {renderGrid()}
                            
                            {/* main coordinate axes */}
                            {/* X axis */}
                            <line x1={0} y1={150} x2={298} y2={150} stroke="#475569" strokeWidth={2.2} />
                            <polygon points="292,146 300,150 292,154" fill="#475569" />
                            <text x={290} y={138} fontSize="10" className="fill-slate-600 font-extrabold select-none">x</text>
                            
                            {/* Y axis */}
                            <line x1={150} y1={300} x2={150} y2={2} stroke="#475569" strokeWidth={2.2} />
                            <polygon points="146,8 150,0 154,8" fill="#475569" />
                            <text x={160} y={10} fontSize="10" className="fill-slate-600 font-extrabold select-none">y</text>
                            
                            {/* origin labels */}
                            <text x={140} y={163} fontSize="9" className="fill-slate-400 font-bold select-none">0</text>
                            
                            {/* Plot the function */}
                            {renderFunctionPath(currentLevel.id)}
                            
                            {/* Plot point nodes */}
                            {renderFunctionPoints(currentLevel.id)}
                            
                            {/* Interactive helper projections */}
                            {renderProjections()}
                        </svg>
                    </div>

                    {/* Right Column: Values Table & Submission Controls */}
                    <div className="w-full lg:w-80 xl:w-96 flex flex-col gap-4">
                        
                        {/* Interactive Table */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm overflow-x-auto">
                            <h4 className="text-xs font-black text-slate-800 mb-3 flex items-center gap-1.5">
                                <Info className="w-4 h-4 text-cyan-600" />
                                Értéktáblázat
                            </h4>
                            <table className="w-full border-collapse text-xs select-none">
                                <thead>
                                    <tr className="border-b bg-slate-50/50">
                                        <th className="py-2 px-1 text-center font-black border border-slate-100 text-slate-500 w-10">x</th>
                                        {currentLevel.columns.map((col, idx) => {
                                            const isXInput = col.x === null;
                                            const status = getFieldStatus(col);
                                            const value = inputs[col.id] || '';
                                            return (
                                                <th key={`h-${idx}`} className="py-1 px-1 border border-slate-100 text-center font-extrabold text-slate-800 align-middle">
                                                    {isXInput ? (
                                                        <div className="relative flex items-center justify-center">
                                                            <input
                                                                type="text"
                                                                value={value}
                                                                onChange={(e) => handleInputChange(col.id, e.target.value)}
                                                                onFocus={() => handleInputFocus(col)}
                                                                onBlur={handleInputBlur}
                                                                disabled={isVerified}
                                                                className={cn(
                                                                    "w-10 h-7 text-center border font-bold rounded-lg text-xs bg-slate-50/30 focus:border-cyan-500 focus:bg-white outline-none transition-all",
                                                                    status === 'correct' && "border-emerald-500 bg-emerald-50 text-emerald-700",
                                                                    status === 'incorrect' && "border-rose-500 bg-rose-50 text-rose-700 font-bold",
                                                                    status === 'default' && "border-slate-200"
                                                                )}
                                                            />
                                                            {status === 'correct' && <Check className="w-3 h-3 text-emerald-600 absolute right-0.5 bottom-0.5 stroke-[3]" />}
                                                            {status === 'incorrect' && <X className="w-3 h-3 text-rose-600 absolute right-0.5 bottom-0.5 stroke-[3]" />}
                                                        </div>
                                                    ) : (
                                                        <span className="font-extrabold text-slate-800">{col.x}</span>
                                                    )}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="py-2 px-1 text-center font-black border border-slate-100 text-slate-500 w-10 bg-slate-50/50">y</td>
                                        {currentLevel.columns.map((col) => {
                                            const status = getFieldStatus(col);
                                            const value = inputs[col.id] || '';
                                            const isYInput = col.y === null;

                                            return (
                                                <td key={`b-${col.id}`} className="py-1 px-1 border border-slate-100 text-center align-middle">
                                                    {isYInput ? (
                                                        <div className="relative flex items-center justify-center">
                                                            <input
                                                                type="text"
                                                                value={value}
                                                                onChange={(e) => handleInputChange(col.id, e.target.value)}
                                                                onFocus={() => handleInputFocus(col)}
                                                                onBlur={handleInputBlur}
                                                                disabled={isVerified}
                                                                className={cn(
                                                                    "w-10 h-7 text-center border font-bold rounded-lg text-xs bg-slate-50/30 focus:border-cyan-500 focus:bg-white outline-none transition-all",
                                                                    status === 'correct' && "border-emerald-500 bg-emerald-50 text-emerald-700",
                                                                    status === 'incorrect' && "border-rose-500 bg-rose-50 text-rose-700 font-bold",
                                                                    status === 'default' && "border-slate-200"
                                                                )}
                                                            />
                                                            {status === 'correct' && <Check className="w-3 h-3 text-emerald-600 absolute right-0.5 bottom-0.5 stroke-[3]" />}
                                                            {status === 'incorrect' && <X className="w-3 h-3 text-rose-600 absolute right-0.5 bottom-0.5 stroke-[3]" />}
                                                        </div>
                                                    ) : (
                                                        <span className="font-extrabold text-slate-800">{col.y}</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </table>
                            
                            <div className="mt-4 p-2 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-[10px] font-bold text-slate-500 leading-relaxed text-left">
                                💡 <span className="text-cyan-700">Tipp:</span> A táblázatban lévő üres/keretes beviteli mezők jelzik a hiányzó értékeket. Olvasd le a kék grafikon megfelelő pontját (ebben segítenek a szaggatott vonalak), és írd be a megoldást!
                            </div>
                        </div>

                        {/* Verification feedback */}
                        {isVerified && (
                            <div className={cn(
                                "rounded-xl p-3 border animate-in fade-in duration-300 text-[11px] text-left",
                                isCorrectResult 
                                    ? "bg-emerald-50 border-emerald-200 text-emerald-900" 
                                    : "bg-rose-50 border-rose-200 text-rose-900"
                            )}>
                                <div className="flex gap-2">
                                    {isCorrectResult ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    ) : (
                                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    <div>
                                        <h5 className="font-extrabold mb-0.5">
                                            {isCorrectResult ? "Hibátlan megoldás!" : "Valami még nem jó."}
                                        </h5>
                                        <p className="opacity-90 leading-tight">
                                            {isCorrectResult 
                                                ? "Minden leolvasott koordináta érték tökéletes!" 
                                                : "Néhány mezőt elgépeltél vagy rosszul olvastál le. Nézd meg közelebbről a grafikont!"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action buttons controls */}
                        <div className="flex flex-col gap-2 w-full mt-auto">
                            {!isVerified ? (
                                <div className="grid grid-cols-2 gap-2">
                                    <Button 
                                        onClick={() => setInputs({})}
                                        variant="outline"
                                        className="rounded-xl font-bold text-xs border-slate-300 hover:bg-slate-100 py-1.5 h-9"
                                    >
                                        Törlés
                                    </Button>
                                    <Button
                                        onClick={verifyLevel}
                                        disabled={Object.keys(inputs).length === 0}
                                        className="rounded-xl font-black text-xs bg-cyan-600 hover:bg-cyan-700 text-white py-1.5 h-9 shadow"
                                    >
                                        Ellenőrzés
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {!isCorrectResult && !showSolutions && (
                                        <Button 
                                            onClick={revealSolutions}
                                            variant="outline"
                                            className="rounded-xl font-bold text-xs border-purple-300 text-purple-700 hover:bg-purple-50 py-1.5 h-9"
                                        >
                                            Megoldás mutatása
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => {
                                            if (currentLevel.id < LEVELS.length) {
                                                startLevel(currentLevel.id + 1);
                                            } else {
                                                setSelectedLevelId(null);
                                            }
                                        }}
                                        className="rounded-xl font-black text-xs bg-emerald-600 hover:bg-emerald-700 text-white py-1.5 h-9 w-full"
                                    >
                                        {currentLevel.id < LEVELS.length ? "Következő szint" : "Vissza a szintekhez"}
                                    </Button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </Card>
        </div>
    );
}
