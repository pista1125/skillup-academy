import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    Trash2,
    Move,
    Plus,
    RotateCcw,
    Layout,
    Columns,
    Grid3X3,
    Type,
    Palette,
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    Play,
    Magnet,
    Maximize2,
    GripVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EquationSolverToolProps {
    onBack: () => void;
}

interface BarSegment {
    id: string;
    label: string;
    width: number; // Percentage
}

interface Bar {
    id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    segments: BarSegment[];
}

interface DerivationStep {
    equation: string;
    operation?: string;
    explanation?: string;
}

const COLORS = [
    { name: 'Purple', bg: 'bg-purple-200', border: 'border-purple-600', text: 'text-purple-900' },
    { name: 'Blue', bg: 'bg-blue-200', border: 'border-blue-600', text: 'text-blue-900' },
    { name: 'Yellow', bg: 'bg-yellow-200', border: 'border-yellow-600', text: 'text-yellow-900' },
    { name: 'Green', bg: 'bg-green-200', border: 'border-green-600', text: 'text-green-900' },
    { name: 'Red', bg: 'bg-red-200', border: 'border-red-600', text: 'text-red-900' },
    { name: 'Orange', bg: 'bg-orange-200', border: 'border-orange-600', text: 'text-orange-900' },
];

export function EquationSolverTool({ onBack }: EquationSolverToolProps) {
    const [equation, setEquation] = useState('');
    const [bars, setBars] = useState<Bar[]>([]);
    const [draggingBarId, setDraggingBarId] = useState<string | null>(null);
    const [resizingBarId, setResizingBarId] = useState<string | null>(null);
    const [draggingDivider, setDraggingDivider] = useState<{ barId: string, index: number } | null>(null);
    const [isResizingMainPanels, setIsResizingMainPanels] = useState(false);
    const [panelSplit, setPanelSplit] = useState(60); // Percentage for workspace
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isMagnetOn, setIsMagnetOn] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const workspaceRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Derivation State
    const [steps, setSteps] = useState<DerivationStep[]>([]);
    const [isManualMode, setIsManualMode] = useState(false);
    const [manualOp, setManualOp] = useState('');

    // Magnet snapping config
    const SNAP_THRESHOLD = 15;

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!isResizingMainPanels || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const relativeX = e.clientX - containerRect.left;
            // Subtract sidebar width (96px) roughly, and accounting for gap
            const availableWidth = containerRect.width - 96 - 16;
            const newSplit = Math.max(20, Math.min(80, ((relativeX - 96) / availableWidth) * 100));
            setPanelSplit(newSplit);
        };

        const handleGlobalMouseUp = () => {
            setIsResizingMainPanels(false);
        };

        if (isResizingMainPanels) {
            window.addEventListener('mousemove', handleGlobalMouseMove);
            window.addEventListener('mouseup', handleGlobalMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isResizingMainPanels]);

    // Help functions for equation manipulation
    const parseSide = (side: string) => {
        let xCoeff = 0;
        let constant = 0;
        const normalized = side.replace(/\s+/g, '').replace(/-/g, '+-');
        const terms = normalized.split('+').filter(t => t !== '');

        terms.forEach(term => {
            if (term.includes('x')) {
                const coeffStr = term.replace('x', '');
                if (coeffStr === '' || coeffStr === '+') xCoeff += 1;
                else if (coeffStr === '-') xCoeff -= 1;
                else {
                    const val = parseFloat(coeffStr);
                    if (!isNaN(val)) xCoeff += val;
                }
            } else {
                const val = parseFloat(term);
                if (!isNaN(val)) constant += val;
            }
        });
        return { xCoeff, constant };
    };

    const formatSide = (x: number, c: number) => {
        let res = '';
        if (x !== 0) {
            if (x === 1) res += 'x';
            else if (x === -1) res += '-x';
            else res += `${Number(x.toFixed(2))}x`;
        }
        if (c !== 0) {
            const val = Number(c.toFixed(2));
            if (res && val > 0) res += ' + ';
            else if (res && val < 0) res += ' - ';
            else if (!res && val < 0) res += '-';
            res += Math.abs(val);
        }
        return res || '0';
    };

    const parseEquation = (eq: string) => {
        try {
            const sides = eq.split('=');
            if (sides.length !== 2) return null;
            const left = parseSide(sides[0]);
            const right = parseSide(sides[1]);
            return { left, right };
        } catch {
            return null;
        }
    };

    const formatOp = (op: string) => {
        if (!op) return '';
        const trimmed = op.trim();
        const type = trimmed[0];
        const val = trimmed.substring(1).trim();

        if (type === '/') {
            const num = parseFloat(val);
            if (!isNaN(num) && num < 0) return `/: (${num})`;
            return `/: ${val}`;
        }
        return `/${type} ${val}`;
    };

    const generateAutoDerivation = () => {
        const parsed = parseEquation(equation);
        if (!parsed) return;

        const newSteps: DerivationStep[] = [{ equation }];
        let { left, right } = parsed;
        let currentEq = equation;

        // Step 1: Move all x to left
        if (right.xCoeff !== 0) {
            const rx = right.xCoeff;
            const opSym = rx > 0 ? '-' : '+';
            const opNum = Math.abs(rx);

            left.xCoeff -= rx;
            right.xCoeff = 0;
            currentEq = `${formatSide(left.xCoeff, left.constant)} = ${formatSide(right.xCoeff, right.constant)}`;

            newSteps.push({
                operation: `${opSym} ${opNum}x`,
                explanation: rx > 0 ? `Mindkét oldalból vonjunk ki ${opNum}x-et.` : `Mindkét oldalhoz adjunk hozzá ${opNum}x-et.`,
                equation: currentEq
            });
        }

        // Step 2: Move all constants to right
        if (left.constant !== 0) {
            const lc = left.constant;
            const opSym = lc > 0 ? '-' : '+';
            const opNum = Math.abs(lc);

            right.constant -= lc;
            left.constant = 0;
            currentEq = `${formatSide(left.xCoeff, left.constant)} = ${formatSide(right.xCoeff, right.constant)}`;

            newSteps.push({
                operation: `${opSym} ${opNum}`,
                explanation: lc > 0 ? `Mindkét oldalból vonjunk ki ${opNum}-et.` : `Mindkét oldalhoz adjunk hozzá ${opNum}-et.`,
                equation: currentEq
            });
        }

        // Step 3: Divide by coefficient of x
        if (left.xCoeff !== 1 && left.xCoeff !== 0) {
            const lx = left.xCoeff;
            right.constant /= lx;
            left.xCoeff = 1;
            currentEq = `x = ${Number(right.constant.toFixed(2))}`;

            newSteps.push({
                operation: `/ ${Number(lx.toFixed(2))}`,
                explanation: `Mindkét oldalt osszuk el ${lx}-szal.`,
                equation: currentEq
            });
        } else if (left.xCoeff === 0 && right.constant !== 0) {
            newSteps.push({ equation: 'Nincs megoldás', explanation: 'Ellentmondás.' });
        } else if (left.xCoeff === 0 && right.constant === 0) {
            newSteps.push({ equation: 'Minden szám megoldás', explanation: 'Azonosság.' });
        } else if (newSteps.length === 1 && equation.includes('x')) {
            newSteps.push({ equation: `x = ${Number(right.constant.toFixed(2))}`, explanation: 'Rendezés.' });
        }

        setSteps(newSteps);
        setIsManualMode(false);
    };

    const handleManualStep = () => {
        if (!manualOp) return;

        const lastEq = steps.length > 0 ? steps[steps.length - 1].equation : equation;
        const normalized = lastEq.replace(/\s+/g, '');
        const sides = normalized.split('=');
        if (sides.length !== 2) return;

        let left = parseSide(sides[0]);
        let right = parseSide(sides[1]);

        const opType = manualOp[0];
        const valStr = manualOp.substring(1).trim();
        const isX = valStr.includes('x');
        const valueStr = valStr.replace('x', '');
        const value = valueStr === '' ? 1 : parseFloat(valueStr);

        if (isNaN(value) && opType !== 'rendezés') return;

        let expl = '';
        if (opType === '+') {
            if (isX) {
                left.xCoeff += value; right.xCoeff += value;
                expl = `Mindkét oldalhoz adjunk hozzá ${value}x-et.`;
            } else {
                left.constant += value; right.constant += value;
                expl = `Mindkét oldalhoz adjunk hozzá ${value}-et.`;
            }
        } else if (opType === '-') {
            if (isX) {
                left.xCoeff -= value; right.xCoeff -= value;
                expl = `Mindkét oldalból vonjunk ki ${value}x-et.`;
            } else {
                left.constant -= value; right.constant -= value;
                expl = `Mindkét oldalból vonjunk ki ${value}-et.`;
            }
        } else if (opType === '*') {
            left.xCoeff *= value; left.constant *= value;
            right.xCoeff *= value; right.constant *= value;
            expl = `Mindkét oldalt szorozzuk meg ${value}-tel.`;
        } else if (opType === '/') {
            left.xCoeff /= value; left.constant /= value;
            right.xCoeff /= value; right.constant /= value;
            expl = `Mindkét oldalt osszuk el ${value}-szal.`;
        }

        const newEq = `${formatSide(left.xCoeff, left.constant)} = ${formatSide(right.xCoeff, right.constant)}`;

        if (steps.length === 0) {
            setSteps([{ equation }, { operation: manualOp, explanation: expl, equation: newEq }]);
        } else {
            setSteps([...steps, { operation: manualOp, explanation: expl, equation: newEq }]);
        }
        setManualOp('');
    };

    const addBar = (type: 'single' | 'double' | 'triple') => {
        const id = Date.now().toString();
        const segments: BarSegment[] = [];

        if (type === 'single') {
            segments.push({ id: id + '-s1', label: '?', width: 100 });
        } else if (type === 'double') {
            segments.push({ id: id + '-s1', label: '?', width: 50 });
            segments.push({ id: id + '-s2', label: '?', width: 50 });
        } else if (type === 'triple') {
            segments.push({ id: id + '-s1', label: '?', width: 33.33 });
            segments.push({ id: id + '-s2', label: '?', width: 33.33 });
            segments.push({ id: id + '-s3', label: '?', width: 33.33 });
        }

        const newBar: Bar = {
            id,
            x: 50,
            y: 20 + (bars.length * 60),
            width: 300,
            height: 45,
            color: COLORS[selectedColorIndex].bg,
            segments
        };
        setBars([...bars, newBar]);
    };

    const handleMouseDown = (e: React.MouseEvent, barId: string) => {
        if ((e.target as HTMLElement).tagName === 'INPUT') return;

        setDraggingBarId(barId);
        const bar = bars.find(b => b.id === barId);
        if (bar && workspaceRef.current) {
            const rect = workspaceRef.current.getBoundingClientRect();
            setDragOffset({
                x: e.clientX - rect.left - bar.x,
                y: e.clientY - rect.top - bar.y
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!workspaceRef.current) return;
        const rect = workspaceRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        if (draggingBarId) {
            let nextX = mouseX - dragOffset.x;
            let nextY = mouseY - dragOffset.y;

            if (isMagnetOn) {
                const currentBar = bars.find(b => b.id === draggingBarId);
                if (currentBar) {
                    bars.forEach(other => {
                        if (other.id === draggingBarId) return;

                        // Corner/Edge matching
                        // Snap left to other right
                        if (Math.abs(nextX - (other.x + other.width)) < SNAP_THRESHOLD && Math.abs(nextY - other.y) < SNAP_THRESHOLD) {
                            nextX = other.x + other.width;
                            nextY = other.y;
                        }
                        // Snap right to other left
                        else if (Math.abs((nextX + currentBar.width) - other.x) < SNAP_THRESHOLD && Math.abs(nextY - other.y) < SNAP_THRESHOLD) {
                            nextX = other.x - currentBar.width;
                            nextY = other.y;
                        }
                        // Snap top to other bottom
                        else if (Math.abs(nextY - (other.y + other.height)) < SNAP_THRESHOLD && Math.abs(nextX - other.x) < SNAP_THRESHOLD) {
                            nextY = other.y + other.height;
                            nextX = other.x;
                        }
                        // Snap bottom to other top
                        else if (Math.abs((nextY + currentBar.height) - other.y) < SNAP_THRESHOLD && Math.abs(nextX - other.x) < SNAP_THRESHOLD) {
                            nextY = other.y - currentBar.height;
                            nextX = other.x;
                        }
                    });
                }
            }

            setBars(prev => prev.map(bar =>
                bar.id === draggingBarId ? { ...bar, x: nextX, y: nextY } : bar
            ));
        } else if (resizingBarId) {
            const bar = bars.find(b => b.id === resizingBarId);
            if (bar) {
                const newWidth = Math.max(50, mouseX - bar.x);
                setBars(prev => prev.map(b => b.id === resizingBarId ? { ...b, width: newWidth } : b));
            }
        } else if (draggingDivider) {
            const bar = bars.find(b => b.id === draggingDivider.barId);
            if (bar) {
                const barLocalX = mouseX - bar.x;
                const totalWidth = bar.width;
                const percentage = (barLocalX / totalWidth) * 100;

                // Find adjacent segments
                const segIdx = draggingDivider.index;
                const combinedWidth = bar.segments[segIdx].width + bar.segments[segIdx + 1].width;

                // Calculate previous segments width sums
                let prevWidths = 0;
                for (let i = 0; i < segIdx; i++) prevWidths += bar.segments[i].width;

                const newSegWidth = Math.max(5, Math.min(combinedWidth - 5, percentage - prevWidths));
                const nextSegWidth = combinedWidth - newSegWidth;

                setBars(prev => prev.map(b => {
                    if (b.id === draggingDivider.barId) {
                        const newSegments = [...b.segments];
                        newSegments[segIdx] = { ...newSegments[segIdx], width: newSegWidth };
                        newSegments[segIdx + 1] = { ...newSegments[segIdx + 1], width: nextSegWidth };
                        return { ...b, segments: newSegments };
                    }
                    return b;
                }));
            }
        }
    };

    const handleMouseUp = () => {
        setDraggingBarId(null);
        setResizingBarId(null);
        setDraggingDivider(null);
    };

    const updateSegmentLabel = (barId: string, segmentId: string, label: string) => {
        setBars(prev => prev.map(bar => {
            if (bar.id === barId) {
                return {
                    ...bar,
                    segments: bar.segments.map(s =>
                        s.id === segmentId ? { ...s, label } : s
                    )
                };
            }
            return bar;
        }));
    };

    const removeBar = (id: string) => {
        setBars(prev => prev.filter(b => b.id !== id));
    };

    const reset = () => {
        setBars([]);
        setEquation('');
        setSteps([]);
        setIsManualMode(false);
    };

    const startManualMode = () => {
        setIsManualMode(true);
        if (steps.length === 0 && equation) {
            setSteps([{ equation }]);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full h-[calc(100vh-120px)] max-w-7xl mx-auto overflow-hidden">
            {/* Header / Equation Input */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <Button variant="ghost" onClick={onBack} size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza
                </Button>
                <div className="flex-1 w-full relative group">
                    <Input
                        value={equation}
                        onChange={(e) => setEquation(e.target.value)}
                        placeholder="Írd be az egyenletet ide (pl: 2x + 4 = 10)"
                        className="text-xl font-bold text-center h-12 bg-slate-50 border-slate-200 focus:border-primary rounded-xl"
                    />
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary transition-colors">
                        <Type className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={generateAutoDerivation}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl gap-2 shadow-sm"
                        disabled={!equation}
                    >
                        <Play className="w-4 h-4" />
                        Levezetés
                    </Button>
                    <Button
                        onClick={startManualMode}
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/5 rounded-xl gap-2"
                        disabled={!equation}
                    >
                        <Plus className="w-4 h-4" />
                        Lépésről lépésre
                    </Button>
                    <Button variant="outline" onClick={reset} size="sm" className="text-slate-500 rounded-xl">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                </div>
            </div>

            <div ref={containerRef} className="flex flex-1 gap-0 overflow-hidden h-full">
                {/* Sidebar */}
                <Card className="w-24 shrink-0 border-slate-200 shadow-sm bg-white mr-4">
                    <CardContent className="p-3 flex flex-col gap-6 items-center pt-6 px-1">
                        <div className="flex flex-col gap-px w-full text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider mb-2">
                            <span>Elemek</span>
                        </div>

                        <button
                            onClick={() => addBar('single')}
                            className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center hover:border-primary hover:shadow-md transition-all group"
                            title="Egész téglalap"
                        >
                            <div className="w-10 h-6 bg-purple-100 border border-purple-400 rounded-sm group-active:scale-95 transition-transform" />
                        </button>

                        <button
                            onClick={() => addBar('double')}
                            className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex flex-col items-center justify-center gap-1 hover:border-primary hover:shadow-md transition-all group"
                            title="Osztott téglalap (2 rész)"
                        >
                            <div className="flex w-10 h-6 group-active:scale-95 transition-transform">
                                <div className="w-1/2 h-full bg-blue-100 border border-blue-400 rounded-l-sm" />
                                <div className="w-1/2 h-full bg-yellow-100 border border-yellow-400 border-l-0 rounded-r-sm" />
                            </div>
                        </button>

                        <button
                            onClick={() => addBar('triple')}
                            className="w-14 h-14 bg-white border-2 border-slate-200 rounded-xl flex items-center justify-center hover:border-primary hover:shadow-md transition-all group"
                            title="Osztott téglalap (3 rész)"
                        >
                            <div className="flex w-10 h-6 group-active:scale-95 transition-transform">
                                <div className="w-1/3 h-full bg-green-100 border border-green-400 rounded-l-sm" />
                                <div className="w-1/3 h-full bg-green-100 border border-green-400 border-l-0" />
                                <div className="w-1/3 h-full bg-green-100 border border-green-400 border-l-0 rounded-r-sm" />
                            </div>
                        </button>

                        <div className="w-full h-px bg-slate-200 my-2" />

                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col gap-2 items-center">
                                <span className="text-[10px] font-bold text-slate-400 text-center uppercase">Mágnes</span>
                                <button
                                    onClick={() => setIsMagnetOn(!isMagnetOn)}
                                    className={cn(
                                        "w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm",
                                        isMagnetOn ? "bg-amber-100 border-amber-500 text-amber-600 scale-105" : "bg-white border-slate-200 text-slate-400 hover:border-primary"
                                    )}
                                    title="Mágneses tapadás"
                                >
                                    <Magnet className={cn("w-6 h-6", isMagnetOn && "animate-pulse")} />
                                </button>
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <span className="text-[10px] font-bold text-slate-400 text-center uppercase px-1">Szín</span>
                                <div className="grid grid-cols-2 gap-1.5 px-2">
                                    {COLORS.map((color, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedColorIndex(idx)}
                                            className={cn(
                                                "w-6 h-6 rounded-full border-2 transition-all",
                                                color.bg,
                                                selectedColorIndex === idx ? "border-slate-900 scale-110" : "border-white shadow-sm"
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Workspace (Canvas) */}
                <div
                    ref={workspaceRef}
                    style={{ width: `${panelSplit}%` }}
                    className="shrink-0 bg-white rounded-3xl border border-slate-200 shadow-inner relative overflow-hidden select-none"
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {bars.length === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center opacity-20">
                            <Grid3X3 className="w-16 h-16 mb-4 text-slate-400" />
                            <h3 className="text-xl font-bold text-slate-900">Tiszta munkaterület</h3>
                            <p className="max-w-xs">Helyezd el a téglalapokat az egyenlet szemléltetéséhez!</p>
                        </div>
                    )}

                    {bars.map(bar => (
                        <div
                            key={bar.id}
                            style={{
                                position: 'absolute',
                                left: bar.x,
                                top: bar.y,
                                width: bar.width,
                                height: bar.height,
                                transition: (draggingBarId === bar.id || resizingBarId === bar.id || draggingDivider?.barId === bar.id) ? 'none' : 'all 0.1s ease-out',
                                zIndex: draggingBarId === bar.id ? 50 : 10
                            }}
                            className="group"
                        >
                            {/* Dragging Handle Layer */}
                            <div
                                className="absolute inset-0 cursor-move z-0"
                                onMouseDown={(e) => handleMouseDown(e, bar.id)}
                            />

                            <div className="relative w-full h-full flex rounded-lg shadow-sm border-2 overflow-hidden bg-white pointer-events-none">
                                {bar.segments.map((segment, idx) => {
                                    const colorInfo = COLORS.find(c => c.bg === bar.color) || COLORS[0];
                                    return (
                                        <div
                                            key={segment.id}
                                            style={{ width: `${segment.width}%` }}
                                            className={cn(
                                                "h-full flex items-center justify-center relative pointer-events-auto",
                                                bar.color,
                                                idx > 0 && "border-l border-black/10"
                                            )}
                                        >
                                            <input
                                                type="text"
                                                value={segment.label}
                                                onChange={(e) => updateSegmentLabel(bar.id, segment.id, e.target.value)}
                                                className={cn(
                                                    "w-full bg-transparent border-none text-center font-bold text-lg focus:outline-none focus:ring-0 placeholder:text-black/10",
                                                    colorInfo.text
                                                )}
                                            />

                                            {/* Internal Divider Handle */}
                                            {idx < bar.segments.length - 1 && (
                                                <div
                                                    className="absolute -right-1 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-black/10 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    onMouseDown={(e) => {
                                                        e.stopPropagation();
                                                        setDraggingDivider({ barId: bar.id, index: idx });
                                                    }}
                                                >
                                                    <div className="w-0.5 h-4 bg-slate-400/50 rounded-full" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Quick actions on hover */}
                                <div className="absolute top-0 right-0 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-auto bg-white/80 rounded-bl-lg border-l border-b border-slate-200">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeBar(bar.id); }}
                                        className="p-1 text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>

                            {/* Resize handle (Free width) */}
                            <div
                                className="absolute -right-3 top-0 bottom-0 w-4 cursor-ew-resize flex items-center justify-center opacity-0 group-hover:opacity-100 z-50 transition-opacity"
                                onMouseDown={(e) => {
                                    e.stopPropagation();
                                    setResizingBarId(bar.id);
                                }}
                            >
                                <div className="w-1.5 h-8 bg-slate-300 rounded-full group-hover:bg-primary transition-colors flex flex-col items-center justify-center gap-0.5">
                                    <div className="w-0.5 h-0.5 bg-white rounded-full" />
                                    <div className="w-0.5 h-0.5 bg-white rounded-full" />
                                    <div className="w-0.5 h-0.5 bg-white rounded-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resizable Divider Handle */}
                <div
                    className={cn(
                        "w-4 h-full cursor-ew-resize flex items-center justify-center group flex-shrink-0 transition-colors",
                        isResizingMainPanels ? "bg-indigo-50" : "hover:bg-slate-50"
                    )}
                    onMouseDown={() => setIsResizingMainPanels(true)}
                >
                    <GripVertical className={cn(
                        "w-5 h-5 text-slate-300 transition-colors",
                        isResizingMainPanels ? "text-indigo-500" : "group-hover:text-slate-500"
                    )} />
                </div>

                {/* Derivation Steps Panel */}
                {(steps.length > 0 || isManualMode) && (
                    <Card style={{ width: `${100 - panelSplit}%` }} className="flex-1 border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col min-w-[200px]">
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-indigo-500" />
                                Levezetés panel
                            </h3>
                            {isManualMode && (
                                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase animate-pulse">Manuális mód</span>
                            )}
                        </div>
                        <CardContent className="p-6 overflow-y-auto flex-1">
                            <div className="flex flex-col min-w-[300px]">
                                <h3 className="text-2xl font-serif text-red-700 mb-6 italic border-b border-red-100 pb-2">Megoldás</h3>

                                <div className="flex flex-col gap-4">
                                    {steps.map((step, idx) => {
                                        const nextStep = steps[idx + 1];
                                        return (
                                            <div key={idx} className="grid grid-cols-[1.5fr_100px_1fr] gap-4 items-center group hover:bg-slate-50 p-1 rounded-lg transition-colors">
                                                <div className="font-mono text-lg text-slate-900 text-right pr-4 font-medium truncate">
                                                    {step.equation}
                                                </div>
                                                <div className="text-slate-700 font-bold font-mono text-base border-l border-slate-200 pl-4 whitespace-nowrap">
                                                    {nextStep?.operation ? formatOp(nextStep.operation) : ""}
                                                </div>
                                                <div className="text-slate-500 text-sm leading-tight pl-2 opacity-80">
                                                    {nextStep?.explanation || ""}
                                                </div>
                                            </div>
                                        );
                                    })}

                                    {isManualMode && (
                                        <div className="mt-8 pt-6 border-t border-slate-200 bg-slate-50/50 p-4 rounded-2xl">
                                            <div className="flex gap-2">
                                                <Input
                                                    value={manualOp}
                                                    onChange={(e) => setManualOp(e.target.value)}
                                                    placeholder="Következő lépés (pl: -4, /2)"
                                                    className="h-10 text-sm font-bold bg-white rounded-xl shadow-inner border-slate-300"
                                                    onKeyDown={(e) => e.key === 'Enter' && handleManualStep()}
                                                />
                                                <Button onClick={handleManualStep} className="rounded-xl h-10 px-6 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md">
                                                    Alkalmaz
                                                </Button>
                                            </div>
                                            <p className="text-[10px] text-slate-400 mt-2 px-1 font-medium">
                                                Példák: <code className="bg-slate-200 px-1 rounded text-slate-600">-5</code>, <code className="bg-slate-200 px-1 rounded text-slate-600">/2</code>, <code className="bg-slate-200 px-1 rounded text-slate-600">+2x</code>
                                            </p>
                                        </div>
                                    )}

                                    {steps.length > 0 && steps[steps.length - 1].equation.trim().startsWith('x =') && (
                                        <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-3xl flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-700">
                                            <div className="bg-green-100 p-3 rounded-full">
                                                <CheckCircle2 className="w-12 h-12 text-green-600" />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="font-bold text-green-900 text-lg">Sikeresen megoldva!</h4>
                                                <p className="text-green-700 text-sm">Az egyenlet levezetése befejeződött.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Helper Footer */}
            <div className="bg-slate-900 border-none text-white/70 p-4 rounded-2xl flex items-center justify-between text-sm">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/10 rounded-lg"><Layout className="w-4 h-4 text-white" /></div>
                        <span>Válassz modellt!</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/10 rounded-lg"><Maximize2 className="w-4 h-4 text-white" /></div>
                        <span>Méretezd szabadon!</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/10 rounded-lg"><GripVertical className="w-4 h-4 text-white" /></div>
                        <span>Állítsd az osztást!</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/10 rounded-lg"><Magnet className="w-4 h-4 text-white" /></div>
                        <span>Használd a mágnest!</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-white/10 rounded-lg"><Play className="w-4 h-4 text-white" /></div>
                        <span>Nézd a levezetést!</span>
                    </div>
                </div>
                <div className="hidden lg:block font-medium text-white italic">
                    Interaktív matematikai modellezés
                </div>
            </div>
        </div>
    );
}
