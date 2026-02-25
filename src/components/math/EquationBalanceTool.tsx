import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    RotateCcw,
    Trash2,
    Plus,
    Minus,
    Play,
    Info,
    CheckCircle2,
    Scale,
    Package,
    Navigation2,
    ArrowRight,
    Move
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface ScaleItem {
    id: string;
    type: 'weight' | 'variable' | 'balloon-weight' | 'balloon-variable';
    value: number; // 1 for 1, 5 for 5, x for x, -1 for balloon weight, -x for balloon variable
    label: string;
}

interface DerivationStep {
    equation: string;
    operation?: string;
    explanation?: string;
}

export function EquationBalanceTool({ onBack }: { onBack: () => void }) {
    // Mode
    const [mode, setMode] = useState<'setup' | 'solve'>('setup');

    // Items state
    const [leftItems, setLeftItems] = useState<ScaleItem[]>([]);
    const [rightItems, setRightItems] = useState<ScaleItem[]>([]);

    // Equation solving state
    const [steps, setSteps] = useState<DerivationStep[]>([]);
    const [manualOp, setManualOp] = useState('');

    // Drag state
    const [isDraggingOver, setIsDraggingOver] = useState<'left' | 'right' | null>(null);

    // Equilibrium state for solve mode
    const [equilibriumDiff, setEquilibriumDiff] = useState(0);

    // Zoom state
    const [zoom, setZoom] = useState(0.85);

    // Sidebar states
    const [customValue, setCustomValue] = useState(2);

    // Draggable Scale State
    const [scalePos, setScalePos] = useState({ x: 0, y: 0 });
    const [isDraggingScale, setIsDraggingScale] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Calculating totals
    const parseSide = (items: ScaleItem[]) => {
        let xCoeff = 0;
        let constant = 0;
        items.forEach(item => {
            if (item.type === 'variable') xCoeff += 1;
            else if (item.type === 'balloon-variable') xCoeff -= 1;
            else if (item.type === 'weight') constant += item.value;
            else if (item.type === 'balloon-weight') constant -= Math.abs(item.value);
        });
        return { xCoeff, constant };
    };

    const totals = useMemo(() => {
        const left = parseSide(leftItems);
        const right = parseSide(rightItems);
        return { left, right };
    }, [leftItems, rightItems]);

    const { left: { xCoeff: leftX, constant: leftConst }, right: { xCoeff: rightX, constant: rightConst } } = totals;

    // Simple evaluation for tilting (assuming x is some positive value for visual tilt, say 5)
    const X_VISUAL_VALUE = 5;
    const leftTotal = leftConst + (leftX * X_VISUAL_VALUE);
    const rightTotal = rightConst + (rightX * X_VISUAL_VALUE);

    const currentDiff = rightTotal - leftTotal;
    const effectiveDiff = mode === 'solve' ? currentDiff - equilibriumDiff : currentDiff;
    const tiltAngle = Math.max(-15, Math.min(15, effectiveDiff * 2));

    const addItem = (side: 'left' | 'right', type: ScaleItem['type'], value: number, label: string) => {
        const newItem: ScaleItem = { id: Math.random().toString(36).substr(2, 9), type, value, label };
        if (side === 'left') setLeftItems([...leftItems, newItem]);
        else setRightItems([...rightItems, newItem]);
    };

    const removeItem = (side: 'left' | 'right', id: string) => {
        if (side === 'left') setLeftItems(leftItems.filter(i => i.id !== id));
        else setRightItems(rightItems.filter(i => i.id !== id));
    };

    // Drag and Drop handlers
    const handleDragStart = (e: React.DragEvent, type: ScaleItem['type'], value: number, label: string) => {
        e.dataTransfer.setData('itemData', JSON.stringify({ type, value, label }));
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleDrop = (e: React.DragEvent, side: 'left' | 'right') => {
        e.preventDefault();
        setIsDraggingOver(null);
        try {
            const data = JSON.parse(e.dataTransfer.getData('itemData'));
            addItem(side, data.type, data.value, data.label);
        } catch (err) {
            console.error('Drop failed', err);
        }
    };

    const formatEquation = (lx: number, lc: number, rx: number, rc: number) => {
        const formatSide = (x: number, c: number) => {
            const parts = [];
            if (x !== 0) parts.push(x === 1 ? 'x' : x === -1 ? '-x' : `${x}x`);
            if (c !== 0) {
                if (parts.length > 0) {
                    if (c > 0) parts.push(`+ ${c}`);
                    else parts.push(`- ${Math.abs(c)}`);
                } else {
                    parts.push(c);
                }
            }
            return parts.length === 0 ? '0' : parts.join(' ');
        };
        const eq = `${formatSide(lx, lc)} = ${formatSide(rx, rc)}`;
        return eq;
    };

    const itemsFromValues = (x: number, c: number): ScaleItem[] => {
        const items: ScaleItem[] = [];
        // Add x's
        if (x > 0) {
            for (let i = 0; i < x; i++) items.push({ id: `x-${Math.random()}`, type: 'variable', value: 1, label: 'x' });
        } else if (x < 0) {
            for (let i = 0; i < Math.abs(x); i++) items.push({ id: `nx-${Math.random()}`, type: 'balloon-variable', value: -1, label: '-x' });
        }

        // Add constants
        let remaining = Math.abs(c);
        const isNeg = c < 0;

        while (remaining >= 10) {
            items.push({ id: `c-${Math.random()}`, type: isNeg ? 'balloon-weight' : 'weight', value: isNeg ? -10 : 10, label: isNeg ? '-10' : '10' });
            remaining -= 10;
        }
        while (remaining >= 5) {
            items.push({ id: `c-${Math.random()}`, type: isNeg ? 'balloon-weight' : 'weight', value: isNeg ? -5 : 5, label: isNeg ? '-5' : '5' });
            remaining -= 5;
        }
        while (remaining >= 1) {
            items.push({ id: `c-${Math.random()}`, type: isNeg ? 'balloon-weight' : 'weight', value: isNeg ? -1 : 1, label: isNeg ? '-1' : '1' });
            remaining -= 1;
        }
        return items;
    };

    const handleStartSolve = () => {
        setMode('solve');
        setEquilibriumDiff(rightTotal - leftTotal);
        const eq = formatEquation(leftX, leftConst, rightX, rightConst);
        setSteps([{ equation: eq }]);
    };

    const handleReset = () => {
        setLeftItems([]);
        setRightItems([]);
        setMode('setup');
        setEquilibriumDiff(0);
        setSteps([]);
        setManualOp('');
    };

    const handleManualStep = () => {
        const trimmedOp = manualOp.replace(/\s+/g, '');
        if (!trimmedOp) return;

        let opType = trimmedOp[0];
        let valStr = trimmedOp.substring(1);

        if (trimmedOp === 'x' || trimmedOp === '+x') { opType = '+'; valStr = 'x'; }
        else if (trimmedOp === '-x') { opType = '-'; valStr = 'x'; }
        else if (!['+', '-', '*', '/'].includes(opType)) {
            opType = '+';
            valStr = trimmedOp;
        }

        const isX = valStr.includes('x');
        const numStr = valStr.replace('x', '');
        const value = numStr === '' ? 1 : parseFloat(numStr);

        if (isNaN(value)) return;

        const apply = (x: number, c: number) => {
            if (opType === '+') return isX ? { x: x + value, c } : { x, c: c + value };
            if (opType === '-') return isX ? { x: x - value, c } : { x, c: c - value };
            if (opType === '*') return { x: x * value, c: c * value };
            return { x: x / value, c: c / value };
        };

        const left = apply(leftX, leftConst);
        const right = apply(rightX, rightConst);

        setLeftItems(itemsFromValues(left.x, left.c));
        setRightItems(itemsFromValues(right.x, right.c));

        const newEq = formatEquation(left.x, left.c, right.x, right.c);
        setSteps([...steps, { operation: `${opType}${valStr}`, equation: newEq }]);
        setManualOp('');
    };

    const removeDuplicates = () => {
        // Find common positive elements to remove
        const commonX = Math.min(Math.max(0, leftX), Math.max(0, rightX));
        const commonConst = Math.min(Math.max(0, leftConst), Math.max(0, rightConst));

        if (commonX === 0 && commonConst === 0) return;

        let ops = [];
        if (commonX > 0) ops.push(`-${commonX}x`);
        if (commonConst > 0) ops.push(`-${commonConst}`);
        const opStr = ops.join(', ');

        const nLX = leftX - commonX;
        const nLC = leftConst - commonConst;
        const nRX = rightX - commonX;
        const nRC = rightConst - commonConst;

        setLeftItems(itemsFromValues(nLX, nLC));
        setRightItems(itemsFromValues(nRX, nRC));

        const newEq = formatEquation(nLX, nLC, nRX, nRC);
        setSteps([...steps, {
            operation: opStr,
            explanation: 'Vegyük le mindkét oldalról a közös elemeket!',
            equation: newEq
        }]);
    };

    const handleScaleMouseDown = (e: React.MouseEvent) => {
        setIsDraggingScale(true);
        setDragStart({
            x: e.clientX / zoom - scalePos.x,
            y: e.clientY / zoom - scalePos.y
        });
    };

    const handleScaleMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingScale) return;
        setScalePos({
            x: e.clientX / zoom - dragStart.x,
            y: e.clientY / zoom - dragStart.y
        });
    };

    const handleScaleMouseUp = () => {
        setIsDraggingScale(false);
    };

    const ItemGraphic = ({ item, onRemove }: { item: ScaleItem, onRemove?: () => void }) => {
        const isBalloon = item.type.startsWith('balloon');
        return (
            <div
                className={cn(
                    "relative flex items-center justify-center transition-all duration-300 transform hover:scale-110 cursor-pointer",
                    isBalloon ? "animate-bounce" : ""
                )}
                onClick={onRemove}
                title="Kattints az eltávolításhoz"
            >
                {item.type === 'variable' && (
                    <div className="w-10 h-10 bg-amber-500 border-2 border-amber-700 rounded shadow-md flex items-center justify-center text-white font-bold">x</div>
                )}
                {item.type === 'weight' && (
                    <div className={cn(
                        "rounded-full border-2 shadow-md flex items-center justify-center text-white font-bold transition-all",
                        Math.abs(item.value) === 1 ? "w-8 h-8 bg-blue-500 border-blue-700 text-xs" :
                            Math.abs(item.value) === 5 ? "w-10 h-10 bg-indigo-500 border-indigo-700 text-sm" :
                                Math.abs(item.value) === 10 ? "w-12 h-12 bg-purple-500 border-purple-700 text-base" :
                                    "w-12 h-12 bg-slate-600 border-slate-700 text-base px-2"
                    )}>
                        {Math.abs(item.value)}
                    </div>
                )}
                {item.type === 'balloon-variable' && (
                    <div className="w-10 h-12 flex flex-col items-center">
                        <div className="w-10 h-10 bg-rose-400 border-2 border-rose-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse">-x</div>
                        <div className="w-0.5 h-6 bg-slate-300 -mt-1" />
                    </div>
                )}
                {item.type === 'balloon-weight' && (
                    <div className="w-8 h-10 flex flex-col items-center">
                        <div className="w-8 h-8 bg-sky-300 border-2 border-sky-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg animate-pulse">{item.value}</div>
                        <div className="w-0.5 h-6 bg-slate-300 -mt-1" />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="flex flex-col gap-4 w-full h-[calc(100vh-120px)] max-w-7xl mx-auto overflow-hidden">
            {/* Header */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
                <Button variant="ghost" onClick={onBack} size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza
                </Button>
                <div className="flex flex-col items-center">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <Scale className="w-6 h-6 text-indigo-600" />
                        Mérlegelv
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">{mode === 'setup' ? 'Állítsd össze az egyenletet!' : 'Oldd meg az egyenletet!'}</p>
                </div>

                <div className="flex items-center gap-4 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                    <div className="flex items-center gap-2 text-slate-500">
                        <Minus className="w-4 h-4 cursor-pointer hover:text-slate-800" onClick={() => setZoom(Math.max(0.4, zoom - 0.1))} />
                        <input
                            type="range"
                            min="0.4"
                            max="1.5"
                            step="0.05"
                            value={zoom}
                            onChange={(e) => setZoom(parseFloat(e.target.value))}
                            className="w-24 accent-indigo-600"
                        />
                        <Plus className="w-4 h-4 cursor-pointer hover:text-slate-800" onClick={() => setZoom(Math.min(1.5, zoom + 0.1))} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 w-8">{(zoom * 100).toFixed(0)}%</span>
                </div>
                <div className="flex items-center gap-2">
                    {mode === 'setup' ? (
                        <Button
                            onClick={handleStartSolve}
                            className="bg-green-600 hover:bg-green-700 text-white rounded-xl gap-2 shadow-sm font-bold px-6"
                            disabled={leftItems.length === 0 && rightItems.length === 0}
                        >
                            <Play className="w-4 h-4" />
                            Start
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setMode('setup')}
                            variant="outline"
                            className="border-amber-500 text-amber-600 hover:bg-amber-50 rounded-xl"
                        >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Szerkesztés
                        </Button>
                    )}
                    <Button variant="outline" onClick={handleReset} size="sm" className="text-slate-500 rounded-xl">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 gap-4 overflow-hidden h-full">
                {/* Tools Sidebar */}
                <Card className="w-32 shrink-0 border-slate-200 shadow-sm bg-white overflow-y-auto">
                    <CardContent className="p-3 pb-20 flex flex-col gap-4 items-center">
                        <div className="text-[10px] font-bold text-slate-400 text-center uppercase tracking-wider">Tárgyak</div>

                        {/* Weight 1 */}
                        <div
                            className="flex flex-col items-center gap-1 group w-full cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'weight', 1, '1')}
                        >
                            <div className="w-12 h-12 bg-blue-50 border-2 border-blue-200 rounded-full flex items-center justify-center hover:border-blue-500 hover:shadow-md transition-all active:scale-95 mx-auto">
                                <span className="text-blue-600 font-bold">1</span>
                            </div>
                            <div className="flex justify-around w-full text-[10px] text-slate-400 font-bold px-1">
                                <button onClick={() => addItem('left', 'weight', 1, '1')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Bal</button>
                                <button onClick={() => addItem('right', 'weight', 1, '1')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Jobb</button>
                            </div>
                        </div>

                        {/* Weight 5 */}
                        <div
                            className="flex flex-col items-center gap-1 group w-full cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'weight', 5, '5')}
                        >
                            <div className="w-12 h-12 bg-indigo-50 border-2 border-indigo-200 rounded-full flex items-center justify-center hover:border-indigo-500 hover:shadow-md transition-all active:scale-95 mx-auto">
                                <span className="text-indigo-600 font-bold">5</span>
                            </div>
                            <div className="flex justify-around w-full text-[10px] text-slate-400 font-bold px-1">
                                <button onClick={() => addItem('left', 'weight', 5, '5')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Bal</button>
                                <button onClick={() => addItem('right', 'weight', 5, '5')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Jobb</button>
                            </div>
                        </div>

                        {/* Weight 10 */}
                        <div
                            className="flex flex-col items-center gap-1 group w-full cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'weight', 10, '10')}
                        >
                            <div className="w-12 h-12 bg-purple-50 border-2 border-purple-200 rounded-full flex items-center justify-center hover:border-purple-500 hover:shadow-md transition-all active:scale-95 mx-auto">
                                <span className="text-purple-600 font-bold">10</span>
                            </div>
                            <div className="flex justify-around w-full text-[10px] text-slate-400 font-bold px-1">
                                <button onClick={() => addItem('left', 'weight', 10, '10')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Bal</button>
                                <button onClick={() => addItem('right', 'weight', 10, '10')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Jobb</button>
                            </div>
                        </div>

                        {/* Custom Weight */}
                        <div className="w-full h-px bg-slate-100 my-1" />
                        <div className="flex flex-col items-center gap-1 w-full">
                            <div className="text-[9px] font-bold text-slate-400 uppercase">Egyedi súly</div>
                            <input
                                type="number"
                                value={customValue}
                                onChange={(e) => setCustomValue(parseInt(e.target.value) || 0)}
                                className="w-16 h-8 text-center border rounded-md text-sm font-bold text-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-400"
                            />
                            <div
                                className="flex flex-col items-center gap-1 group w-full cursor-grab active:cursor-grabbing mt-1"
                                draggable
                                onDragStart={(e) => handleDragStart(e, 'weight', customValue, customValue.toString())}
                            >
                                <div className="w-12 h-12 bg-slate-50 border-2 border-slate-200 rounded-full flex items-center justify-center hover:border-indigo-500 hover:shadow-md transition-all active:scale-95 mx-auto">
                                    <span className="text-slate-600 font-bold">{customValue}</span>
                                </div>
                                <div className="flex justify-around w-full text-[10px] text-slate-400 font-bold px-1">
                                    <button onClick={() => addItem('left', 'weight', customValue, customValue.toString())} className="hover:text-primary p-1 bg-slate-50 rounded-md">Bal</button>
                                    <button onClick={() => addItem('right', 'weight', customValue, customValue.toString())} className="hover:text-primary p-1 bg-slate-50 rounded-md">Jobb</button>
                                </div>
                            </div>
                        </div>

                        {/* Variable X */}
                        <div
                            className="flex flex-col items-center gap-1 group w-full cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'variable', 1, 'x')}
                        >
                            <div className="w-12 h-12 bg-amber-50 border-2 border-amber-200 rounded-xl flex items-center justify-center hover:border-amber-500 hover:shadow-md transition-all active:scale-95 mx-auto">
                                <Package className="w-6 h-6 text-amber-600" />
                            </div>
                            <div className="flex justify-around w-full text-[10px] text-slate-400 font-bold px-1">
                                <button onClick={() => addItem('left', 'variable', 1, 'x')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Bal</button>
                                <button onClick={() => addItem('right', 'variable', 1, 'x')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Jobb</button>
                            </div>
                        </div>

                        <div className="w-full h-px bg-slate-100 my-1" />
                        <div className="text-[10px] font-bold text-rose-400 text-center uppercase tracking-wider">Lufik (-)</div>

                        {/* Negative Weight */}
                        <div
                            className="flex flex-col items-center gap-1 group w-full cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'balloon-weight', -1, '-1')}
                        >
                            <div className="w-12 h-12 bg-sky-50 border-2 border-sky-200 rounded-full flex items-center justify-center hover:border-sky-500 hover:shadow-md transition-all active:scale-95 shadow-inner mx-auto">
                                <Navigation2 className="w-5 h-5 text-sky-500 rotate-180" />
                            </div>
                            <div className="flex justify-around w-full text-[10px] text-slate-400 font-bold px-1">
                                <button onClick={() => addItem('left', 'balloon-weight', -1, '-1')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Bal</button>
                                <button onClick={() => addItem('right', 'balloon-weight', -1, '-1')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Jobb</button>
                            </div>
                        </div>

                        {/* Negative X */}
                        <div
                            className="flex flex-col items-center gap-1 group w-full cursor-grab active:cursor-grabbing"
                            draggable
                            onDragStart={(e) => handleDragStart(e, 'balloon-variable', -1, '-x')}
                        >
                            <div className="w-12 h-12 bg-rose-50 border-2 border-rose-200 rounded-full flex items-center justify-center hover:border-rose-500 hover:shadow-md transition-all active:scale-95 shadow-inner mx-auto">
                                <Navigation2 className="w-5 h-5 text-rose-500 rotate-180" />
                            </div>
                            <div className="flex justify-around w-full text-[10px] text-slate-400 font-bold px-1">
                                <button onClick={() => addItem('left', 'balloon-variable', -1, '-x')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Bal</button>
                                <button onClick={() => addItem('right', 'balloon-variable', -1, '-x')} className="hover:text-primary p-1 bg-slate-50 rounded-md">Jobb</button>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* Main Workspace */}
                <div className="flex-1 flex flex-col gap-4 overflow-hidden relative">
                    <div
                        className="flex-1 bg-slate-50/50 rounded-3xl border border-slate-200 shadow-inner relative overflow-visible p-8 pb-12 flex items-center justify-end flex-col select-none"
                        onMouseMove={handleScaleMouseMove}
                        onMouseUp={handleScaleMouseUp}
                    >

                        {/* THE SCALE VISUALIZATION CONTAINER */}
                        <div
                            className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center transition-transform duration-300 ease-out"
                            style={{
                                transform: `scale(${zoom}) translate(${scalePos.x}px, ${scalePos.y}px)`,
                                transition: isDraggingScale ? 'none' : 'transform 300ms ease-out'
                            }}
                        >

                            {/* Fulcrum / Base */}
                            <div
                                className="absolute bottom-0 flex flex-col items-center cursor-move group/base"
                                onMouseDown={handleScaleMouseDown}
                            >
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover/base:opacity-100 transition-opacity bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full whitespace-nowrap pointer-events-none">Fogasd meg a mozgatáshoz</div>
                                <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-bottom-[80px] border-bottom-indigo-400 rounded-md shadow-lg"
                                    style={{ borderBottom: '80px solid rgb(129, 140, 248)' }} />
                                <div className="w-32 h-4 bg-indigo-900 rounded-full -mt-2 shadow-md flex items-center justify-center">
                                    <Move className="w-3 h-3 text-indigo-300" />
                                </div>
                            </div>

                            {/* Tilting Beam Wrapper */}
                            <div
                                className="absolute bottom-[80px] flex items-center justify-center w-full transition-transform duration-1000 ease-out"
                                style={{ transform: `rotate(${tiltAngle}deg)` }}
                            >
                                {/* Beam */}
                                <div className="w-[80%] h-4 bg-gradient-to-b from-indigo-200 to-indigo-400 rounded-full shadow-md border border-indigo-300 relative">
                                    {/* Center Pivot Point */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-indigo-800 rounded-full border-2 border-white" />
                                </div>

                                {/* Left Plate supported from below */}
                                <div
                                    className={cn(
                                        "absolute left-[10%] bottom-2 flex flex-col-reverse items-center transition-all duration-1000 ease-out rounded-xl p-2",
                                        isDraggingOver === 'left' ? "bg-indigo-50/50 ring-2 ring-indigo-400 ring-dashed animate-pulse" : ""
                                    )}
                                    style={{ transform: `rotate(${-tiltAngle}deg)` }}
                                    onDragOver={(e) => { e.preventDefault(); setIsDraggingOver('left'); }}
                                    onDragLeave={() => setIsDraggingOver(null)}
                                    onDrop={(e) => handleDrop(e, 'left')}
                                >
                                    <div className="w-1.5 h-16 bg-gradient-to-t from-indigo-300 to-indigo-100 shadow-sm" />
                                    <div className="w-72 min-h-[40px] bg-white border-b-8 border-indigo-500 rounded-t-3xl shadow-xl relative p-4 bg-gradient-to-t from-indigo-50 to-white">
                                        <div className="flex flex-wrap gap-2 justify-center items-end min-h-[120px] content-end">
                                            {leftItems.map(item => (
                                                <ItemGraphic key={item.id} item={item} onRemove={() => removeItem('left', item.id)} />
                                            ))}
                                        </div>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 px-3 py-1 rounded-full border border-indigo-400 text-xs font-bold text-white shadow-md whitespace-nowrap">
                                            {leftX !== 0 && `${leftX}x`} {leftX !== 0 && leftConst !== 0 && (leftConst > 0 ? '+' : '-')} {leftConst !== 0 && Math.abs(leftConst)} {leftX === 0 && leftConst === 0 && '0'}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Plate supported from below */}
                                <div
                                    className={cn(
                                        "absolute right-[10%] bottom-2 flex flex-col-reverse items-center transition-all duration-1000 ease-out rounded-xl p-2",
                                        isDraggingOver === 'right' ? "bg-indigo-50/50 ring-2 ring-indigo-400 ring-dashed animate-pulse" : ""
                                    )}
                                    style={{ transform: `rotate(${-tiltAngle}deg)` }}
                                    onDragOver={(e) => { e.preventDefault(); setIsDraggingOver('right'); }}
                                    onDragLeave={() => setIsDraggingOver(null)}
                                    onDrop={(e) => handleDrop(e, 'right')}
                                >
                                    <div className="w-1.5 h-16 bg-gradient-to-t from-indigo-300 to-indigo-100 shadow-sm" />
                                    <div className="w-72 min-h-[40px] bg-white border-b-8 border-indigo-500 rounded-t-3xl shadow-xl relative p-4 bg-gradient-to-t from-indigo-50 to-white">
                                        <div className="flex flex-wrap gap-2 justify-center items-end min-h-[120px] content-end">
                                            {rightItems.map(item => (
                                                <ItemGraphic key={item.id} item={item} onRemove={() => removeItem('right', item.id)} />
                                            ))}
                                        </div>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-indigo-600 px-3 py-1 rounded-full border border-indigo-400 text-xs font-bold text-white shadow-md whitespace-nowrap">
                                            {rightX !== 0 && `${rightX}x`} {rightX !== 0 && rightConst !== 0 && (rightConst > 0 ? '+' : '-')} {rightConst !== 0 && Math.abs(rightConst)} {rightX === 0 && rightConst === 0 && '0'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tips / Info */}
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-0 hover:opacity-100 transition-opacity bg-white/90 p-3 rounded-2xl border border-blue-100 text-xs text-blue-800 shadow-xl max-w-sm pointer-events-none z-50">
                            <div className="flex gap-2">
                                <Info className="w-4 h-4 shrink-0" />
                                <p>A lufik (negatív értékek) fölfelé húzzák a mérleget. A cél a két oldal egyensúlyba hozása.</p>
                            </div>
                        </div>
                    </div>

                    {/* Solve Panel (Only visible in solve mode) */}
                    {mode === 'solve' && (
                        <Card className="border-slate-200 shadow-lg bg-white pb-4 overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
                            <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="font-bold text-sm flex items-center gap-2 text-slate-700">
                                    <Navigation2 className="w-4 h-4 text-primary" />
                                    Műveletek végrehajtása
                                </h3>
                                <div className="text-lg font-mono font-bold text-primary">
                                    {steps[steps.length - 1]?.equation}
                                </div>
                            </div>
                            <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-center">
                                <div className="flex gap-2 items-center bg-slate-100 p-2 rounded-2xl shadow-inner w-full md:w-auto">
                                    <div className="px-3 text-slate-400 font-bold">/</div>
                                    <Input
                                        placeholder="pl: -2, +x, /2"
                                        className="h-10 w-48 text-sm font-bold bg-white rounded-xl shadow-sm border-slate-200 focus:ring-primary"
                                        value={manualOp}
                                        onChange={(e) => setManualOp(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleManualStep()}
                                    />
                                    <Button onClick={handleManualStep} size="sm" className="bg-primary text-white hover:bg-primary/90 h-10 px-6 rounded-xl font-bold shadow-md">Alkalmaz</Button>
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        onClick={removeDuplicates}
                                        className="h-10 border-indigo-200 text-indigo-700 hover:bg-indigo-50 rounded-xl font-bold px-4"
                                    >
                                        Közös elemek levétele
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Right Derivation Panel */}
                {(steps.length > 0 || mode === 'solve') && (
                    <Card className="w-80 shrink-0 border-slate-200 shadow-sm bg-white overflow-hidden flex flex-col">
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
                            <ArrowRight className="w-5 h-5 text-indigo-500" />
                            <h3 className="font-bold text-slate-800">Levezetés</h3>
                        </div>
                        <CardContent className="p-4 overflow-y-auto flex-1 bg-slate-50/30">
                            {steps.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-30 text-center gap-4 p-8">
                                    <div className="p-4 bg-slate-100 rounded-full">
                                        <Scale className="w-8 h-8" />
                                    </div>
                                    <p className="text-xs font-medium">Itt jelenik majd meg az egyenlet matematikai levezetése lépésről lépésre.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {steps.map((step, idx) => (
                                        <div key={idx} className="relative animate-in slide-in-from-right-5 duration-300">
                                            {idx > 0 && step.operation && (
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="h-px flex-1 bg-slate-200" />
                                                    <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full border border-slate-300 whitespace-nowrap font-mono">
                                                        {['*', '/'].includes(step.operation[0]) ? '' : '/'}{step.operation}
                                                    </span>
                                                    <div className="h-px flex-1 bg-slate-200" />
                                                </div>
                                            )}
                                            <div className="font-mono text-center py-3 px-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary hover:shadow-md transition-all font-bold text-lg text-slate-800">
                                                {step.equation}
                                            </div>
                                            {step.explanation && (
                                                <div className="mt-1 text-[10px] text-slate-500 text-center font-medium italic">
                                                    {step.explanation}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Success Badge */}
                                    {steps[steps.length - 1]?.equation.match(/^x = -?\d+(\.\d+)?$/) && (
                                        <div className="mt-10 p-6 bg-green-50 border border-green-200 rounded-3xl flex flex-col items-center gap-3 animate-in fade-in zoom-in-95 duration-700 shadow-sm">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                                            </div>
                                            <div className="text-center">
                                                <h4 className="font-bold text-green-900 text-sm">Sikeresen megoldva!</h4>
                                                <p className="text-green-700 text-[10px]">Az egyenlet levezetése befejeződött.</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
