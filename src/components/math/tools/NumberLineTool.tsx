import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    ArrowLeft,
    RotateCcw,
    Plus,
    Minus,
    Trash2,
    ZoomIn,
    ZoomOut,
    MapPin,
    MousePointer2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NumberLineToolProps {
    onBack: () => void;
}

interface NumberArrow {
    id: string;
    startValue: number;
    length: number; // Represents the value change (e.g., +3, -2)
    yLevel: number; // Vertical position level (0 is bottom, higher is higher up)
    color: string;
}

interface PointMarker {
    id: string;
    value: number;
    color: string;
}

const COLORS = [
    '#ef4444', // Red
    '#3b82f6', // Blue
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#8b5cf6', // Violet
];

export function NumberLineTool({ onBack }: NumberLineToolProps) {
    // View State
    const [scale, setScale] = useState(50); // pixels per unit
    const [offset, setOffset] = useState(0); // horizontal pan offset in pixels
    const [equation, setEquation] = useState('');

    // Content State
    const [arrows, setArrows] = useState<NumberArrow[]>([]);
    const [markers, setMarkers] = useState<PointMarker[]>([]);

    // Interaction State
    const [toolMode, setToolMode] = useState<'move' | 'marker'>('move');
    const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

    const [draggedArrowId, setDraggedArrowId] = useState<string | null>(null);
    const [draggedMarkerId, setDraggedMarkerId] = useState<string | null>(null);
    const [dragValueOffset, setDragValueOffset] = useState<number>(0);

    const [resizingArrowId, setResizingArrowId] = useState<string | null>(null);
    const [resizeHandle, setResizeHandle] = useState<'start' | 'end' | null>(null);

    // Editable Label State
    const [editingArrowId, setEditingArrowId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);

    const [centerY, setCenterY] = useState(250); // Vertical center of the number line axis
    const TICK_HEIGHT_MAJOR = 20;
    const TICK_HEIGHT_MINOR = 10;

    // --- Helpers ---

    const getScreenX = (value: number) => {
        if (!containerRef.current) return 0;
        const centerX = containerRef.current.clientWidth / 2;
        return centerX + (value * scale) + offset;
    };

    const getValueFromScreenX = (screenX: number) => {
        if (!containerRef.current) return 0;
        const centerX = containerRef.current.clientWidth / 2;
        return (screenX - centerX - offset) / scale;
    };

    // --- Event Handlers ---

    const handleMouseDownCanvas = (e: React.MouseEvent) => {
        // If clicked on empty space
        if (toolMode === 'marker') {
            const val = getValueFromScreenX(e.clientX);
            // Snap based on zoom level
            const snap = scale > 500 ? 0.01 : (scale > 100 ? 0.1 : 0.5);
            const roundedVal = Math.round(val / snap) * snap;
            const newMarker: PointMarker = {
                id: Date.now().toString(),
                value: Number(roundedVal.toFixed(2)),
                color: COLORS[markers.length % COLORS.length]
            };
            setMarkers([...markers, newMarker]);
            // Don't switch mode, allow multiple placements
            return;
        }

        if (editingArrowId) {
            setEditingArrowId(null); // Finish editing if clicking elsewhere
        }

        setIsDraggingCanvas(true);
        setLastMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const dx = e.clientX - lastMousePos.x;
        const dy = e.clientY - lastMousePos.y;
        setLastMousePos({ x: e.clientX, y: e.clientY });

        if (isDraggingCanvas) {
            setOffset(prev => prev + dx);
            return;
        }

        const mouseVal = getValueFromScreenX(e.clientX);

        if (draggedArrowId) {
            setArrows(prev => prev.map(a => {
                if (a.id === draggedArrowId) {
                    const newStart = mouseVal - dragValueOffset;
                    return { ...a, startValue: newStart, yLevel: Math.max(0.5, a.yLevel - (dy / 50)) };
                }
                return a;
            }));
        }

        if (draggedMarkerId) {
            setMarkers(prev => prev.map(m => {
                if (m.id === draggedMarkerId) {
                    const newVal = mouseVal - dragValueOffset;
                    return { ...m, value: newVal };
                }
                return m;
            }));
        }

        if (resizingArrowId && resizeHandle) {
            setArrows(prev => prev.map(a => {
                if (a.id === resizingArrowId) {
                    const adjustedMouseVal = mouseVal - dragValueOffset;

                    if (resizeHandle === 'start') {
                        const fixedEnd = a.startValue + a.length;
                        return { ...a, startValue: adjustedMouseVal, length: fixedEnd - adjustedMouseVal };
                    } else {
                        return { ...a, length: adjustedMouseVal - a.startValue };
                    }
                }
                return a;
            }));
        }
    };

    const handleMouseUp = () => {
        setIsDraggingCanvas(false);

        // Snap based on zoom level
        const snap = scale > 500 ? 0.01 : (scale > 100 ? 0.1 : 0.5);

        // Snap arrows on release
        if (draggedArrowId || resizingArrowId) {
            setArrows(prev => prev.map(a => ({
                ...a,
                startValue: Number((Math.round(a.startValue / snap) * snap).toFixed(2)),
                length: Number((Math.round(a.length / snap) * snap).toFixed(2)),
                yLevel: Math.round(a.yLevel || 1)
            })));
        }

        // Snap markers on release
        if (draggedMarkerId) {
            setMarkers(prev => prev.map(m => ({
                ...m,
                value: Number((Math.round(m.value / snap) * snap).toFixed(2))
            })));
        }

        setDraggedArrowId(null);
        setDraggedMarkerId(null);
        setResizingArrowId(null);
        setResizeHandle(null);
        setDragValueOffset(0);
    };

    useEffect(() => {
        if (!containerRef.current) return;

        const updateCenter = () => {
            if (containerRef.current) {
                setCenterY(containerRef.current.clientHeight / 2);
            }
        };

        const observer = new ResizeObserver(updateCenter);
        observer.observe(containerRef.current);

        // Initial call
        updateCenter();

        return () => observer.disconnect();
    }, []);

    const handleLabelSubmit = (id: string, newValStr: string) => {
        const val = parseFloat(newValStr);
        if (!isNaN(val)) {
            setArrows(prev => prev.map(a => {
                if (a.id === id) return { ...a, length: val };
                return a;
            }));
        }
        setEditingArrowId(null);
    };

    const addArrow = (positive: boolean) => {
        const newVal: NumberArrow = {
            id: Date.now().toString(),
            startValue: 0,
            length: positive ? 3 : -3,
            yLevel: 1 + (arrows.length % 3), // Stack them slightly
            color: COLORS[arrows.length % COLORS.length]
        };
        setArrows([...arrows, newVal]);
    };

    const clearTools = () => {
        setArrows([]);
        setMarkers([]);
        setEquation('');
        setOffset(0);
        setScale(50);
    };

    const deleteMarker = (id: string) => {
        setMarkers(prev => prev.filter(m => m.id !== id));
    };

    // --- Rendering ---

    const renderTicks = () => {
        if (!containerRef.current) return null;
        const width = containerRef.current.clientWidth;
        const startX = -offset;
        const endX = -offset + width;

        const minVal = Math.floor((startX - width / 2) / scale);
        const maxVal = Math.ceil((endX - width / 2) / scale);

        const ticks = [];

        // Dynamic step calculation
        let mainStep = 1;
        if (scale < 30) mainStep = 5;
        if (scale < 10) mainStep = 10;

        let subStep = mainStep / 10;
        if (scale > 100) subStep = 0.1;
        if (scale > 500) subStep = 0.01;

        // Determine which levels to show based on zoom
        const showSmallTicks = scale > 50;
        const showMicroTicks = scale > 400;

        // Increase range slightly to ensure all visible ticks are rendered
        const rangePadding = mainStep * 2;

        const renderStep = showMicroTicks ? 0.01 : (showSmallTicks ? 0.1 : 1);
        const actualMin = Math.floor(minVal / mainStep) * mainStep - rangePadding;
        const actualMax = Math.ceil(maxVal / mainStep) * mainStep + rangePadding;

        for (let i = actualMin; i <= actualMax; i += renderStep) {
            const val = Number(i.toFixed(2));
            const x = getScreenX(val);

            // Skip if out of horizontal bounds to save performance when zoomed in
            if (x < -100 || x > width + 100) continue;

            const isMajor = Math.abs(val % mainStep) < 0.001;
            const isMedium = !isMajor && (Math.abs(val % (mainStep / 10)) < 0.001 || (scale > 500 && Math.abs(val % 0.1) < 0.001));

            let tickHeight = TICK_HEIGHT_MINOR;
            let strokeWidth = 1;
            let showLabel = false;
            let labelSize = "text-[10px]";

            if (isMajor) {
                tickHeight = TICK_HEIGHT_MAJOR;
                strokeWidth = 2;
                showLabel = true;
                labelSize = "text-xs font-bold";
            } else if (isMedium && scale > 150) {
                tickHeight = TICK_HEIGHT_MAJOR * 0.7;
                strokeWidth = 1.5;
                if (scale > 300) showLabel = true;
            } else if (scale > 800) {
                tickHeight = TICK_HEIGHT_MINOR;
                strokeWidth = 1;
                if (Math.abs(val % 0.05) < 0.001) showLabel = true;
            }

            ticks.push(
                <g key={val} transform={`translate(${x}, ${centerY})`}>
                    <line
                        y1={-tickHeight}
                        y2={tickHeight}
                        stroke={isMajor ? "#64748b" : "#94a3b8"}
                        strokeWidth={strokeWidth}
                        opacity={isMajor ? 1 : 0.6}
                    />
                    {showLabel && (
                        <text
                            y={35}
                            textAnchor="middle"
                            className={cn(labelSize, "fill-slate-500 select-none")}
                        >
                            {val}
                        </text>
                    )}
                </g>
            );
        }
        return ticks;
    };

    const renderArrows = () => {
        return arrows.map(arrow => {
            const startX = getScreenX(arrow.startValue);
            const endX = getScreenX(arrow.startValue + arrow.length);
            const levelHeight = 50 * Math.abs(arrow.yLevel || 1);

            const effectiveLevel = Math.max(0.5, Math.abs(arrow.yLevel || 1));

            const cpY = centerY - levelHeight * 1.5;
            const pathString = `M ${startX} ${centerY} C ${startX} ${cpY}, ${endX} ${cpY}, ${endX} ${centerY}`;

            const midX = (startX + endX) / 2;
            const isEditing = editingArrowId === arrow.id;

            return (
                <g key={arrow.id} className="group">
                    {/* The Curve */}
                    <path
                        d={pathString}
                        fill="none"
                        stroke={arrow.color}
                        strokeWidth="4"
                        strokeLinecap="round"
                        className="cursor-grab active:cursor-grabbing hover:opacity-80"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            const mouseVal = getValueFromScreenX(e.clientX);
                            setDragValueOffset(mouseVal - arrow.startValue);
                            setDraggedArrowId(arrow.id);
                            setLastMousePos({ x: e.clientX, y: e.clientY });
                            if (isEditing) setEditingArrowId(null);
                        }}
                    />

                    {/* Arrow Head */}
                    <polygon
                        points={`0,0 -6,-10 6,-10`}
                        fill={arrow.color}
                        transform={`translate(${endX}, ${centerY}) rotate(${arrow.length > 0 ? 180 : 180})`}
                    />

                    {/* Label - Click to Edit */}
                    <foreignObject x={midX - 30} y={centerY - levelHeight - 30} width={60} height={40}>
                        <div className="flex items-center justify-center w-full h-full">
                            {isEditing ? (
                                <input
                                    autoFocus
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    onBlur={() => handleLabelSubmit(arrow.id, editValue)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleLabelSubmit(arrow.id, editValue);
                                        e.stopPropagation();
                                    }}
                                    className="w-16 h-8 text-center text-sm font-bold border-2 border-blue-400 rounded shadow-sm focus:outline-none"
                                />
                            ) : (
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingArrowId(arrow.id);
                                        setEditValue(Math.round(arrow.length * 100) / 100 + '');
                                    }}
                                    className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm border border-slate-100 cursor-text hover:bg-slate-50 select-none"
                                >
                                    <span className="text-sm font-black text-slate-700">
                                        {arrow.length > 0 ? '+' : ''}{Math.round(arrow.length * 100) / 100}
                                    </span>
                                </div>
                            )}
                        </div>
                    </foreignObject>

                    {/* Start Handle */}
                    <circle
                        cx={startX} cy={centerY} r={8} fill="white" stroke={arrow.color} strokeWidth={3}
                        className="cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity bg-white hover:scale-125"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            const mouseVal = getValueFromScreenX(e.clientX);
                            setDragValueOffset(mouseVal - arrow.startValue);
                            setResizingArrowId(arrow.id);
                            setResizeHandle('start');
                        }}
                    />

                    {/* End Handle */}
                    <circle
                        cx={endX} cy={centerY} r={8} fill={arrow.color} stroke="white" strokeWidth={2}
                        className="cursor-ew-resize opacity-0 group-hover:opacity-100 transition-opacity hover:scale-125"
                        onMouseDown={(e) => {
                            e.stopPropagation();
                            const mouseVal = getValueFromScreenX(e.clientX);
                            const endVal = arrow.startValue + arrow.length;
                            setDragValueOffset(mouseVal - endVal);
                            setResizingArrowId(arrow.id);
                            setResizeHandle('end');
                        }}
                    />

                    {/* Delete Button */}
                    {!isEditing && (
                        <foreignObject x={midX + 30} y={centerY - levelHeight - 24} width={28} height={28} className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setArrows(arrows.filter(a => a.id !== arrow.id))} className="bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 text-red-500 border border-red-100 cursor-pointer">
                                <Trash2 className="w-3.5 h-3.5" />
                            </button>
                        </foreignObject>
                    )}
                </g>
            );
        });
    };

    const renderMarkers = () => {
        return markers.map(marker => {
            const x = getScreenX(marker.value);
            return (
                <g
                    key={marker.id}
                    transform={`translate(${x}, ${centerY})`}
                    className="cursor-grab active:cursor-grabbing group"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        const mouseVal = getValueFromScreenX(e.clientX);
                        setDragValueOffset(mouseVal - marker.value);
                        setDraggedMarkerId(marker.id);
                        setLastMousePos({ x: e.clientX, y: e.clientY });
                    }}
                >
                    {/* Pin Icon - 3x BIGGER */}
                    <g transform="translate(-36, -100) scale(3)">
                        <MapPin className="w-6 h-6 drop-shadow-xl" fill={marker.color} color="white" strokeWidth={1.5} />
                    </g>

                    {/* Value Label */}
                    <text y="-110" textAnchor="middle" className="text-sm font-bold fill-slate-600 drop-shadow-md bg-white/50 pointer-events-none select-none">
                        {marker.value}
                    </text>

                    {/* Delete Interaction for marker */}
                    <foreignObject x="-12" y="-140" width="24" height="24" className="opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                        <button onClick={(e) => { e.stopPropagation(); deleteMarker(marker.id); }} className="bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </foreignObject>
                </g>
            );
        });
    };

    return (
        <div className="flex flex-col gap-4 w-full h-[calc(100vh-100px)] max-w-6xl mx-auto">
            {/* Header / Toolbar */}
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={onBack} size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                    <div className="h-6 w-px bg-slate-200 mx-2" />
                    <Input
                        placeholder="Pl: 2 + (-4) = -2"
                        value={equation}
                        onChange={e => setEquation(e.target.value)}
                        className="w-64 font-mono font-bold bg-slate-50 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setScale(s => Math.max(5, s / 1.5))}>
                        <ZoomOut className="w-4 h-4" />
                    </Button>
                    <div className="flex flex-col items-center min-w-16">
                        <span className="text-[10px] text-slate-400 font-mono leading-none">Zoom</span>
                        <span className="text-xs font-bold font-mono text-slate-600">{(scale / 50).toFixed(scale > 100 ? 1 : 1)}x</span>
                    </div>
                    <Button variant="outline" size="icon" onClick={() => setScale(s => Math.min(2000, s * 1.5))}>
                        <ZoomIn className="w-4 h-4" />
                    </Button>
                    <div className="h-6 w-px bg-slate-200 mx-2" />
                    <Button variant="outline" onClick={clearTools} className="text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Törlés
                    </Button>
                </div>
            </div>

            {/* Main Workspace */}
            <div className="flex flex-1 gap-4 overflow-hidden">
                {/* Left Sidebar (Tools) */}
                <Card className="w-20 shrink-0 border-slate-200 shadow-sm">
                    <CardContent className="p-2 flex flex-col gap-4 items-center pt-4">
                        <div className="flex flex-col gap-2 w-full items-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Lépések</div>
                            <Button
                                onClick={() => { addArrow(true); setToolMode('move'); }}
                                className="w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 p-0 shadow-sm transition-transform hover:scale-105"
                                title="Pozitív lépés"
                            >
                                <Plus className="w-6 h-6" />
                            </Button>
                            <Button
                                onClick={() => { addArrow(false); setToolMode('move'); }}
                                className="w-12 h-12 rounded-full bg-red-100 hover:bg-red-200 text-red-600 p-0 shadow-sm transition-transform hover:scale-105"
                                title="Negatív lépés"
                            >
                                <Minus className="w-6 h-6" />
                            </Button>
                        </div>

                        <div className="w-full h-px bg-slate-100" />

                        <div className="flex flex-col gap-2 w-full items-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Jelölő</div>
                            <Button
                                variant={toolMode === 'marker' ? "default" : "outline"}
                                onClick={() => setToolMode(toolMode === 'marker' ? 'move' : 'marker')}
                                className={cn(
                                    "w-12 h-12 rounded-xl p-0 transition-all",
                                    toolMode === 'marker' ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md ring-2 ring-amber-200" : "border-slate-200 text-slate-500 hover:text-amber-600 hover:border-amber-200"
                                )}
                                title="Pont jelölése (Google Maps stílus)"
                            >
                                <MapPin className="w-6 h-6" />
                            </Button>
                        </div>

                        <div className="w-full h-px bg-slate-100" />

                        <div className="flex flex-col gap-2 w-full items-center">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mód</div>
                            <Button
                                variant={toolMode === 'move' ? "default" : "outline"}
                                onClick={() => setToolMode('move')}
                                className={cn(
                                    "w-12 h-12 rounded-xl p-0 transition-all",
                                    toolMode === 'move' ? "bg-slate-800 text-white shadow-md" : "border-slate-200 text-slate-500"
                                )}
                                title="Mozgatás és szerkesztés"
                            >
                                <MousePointer2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Canvas Area */}
                <div
                    ref={containerRef}
                    className={cn(
                        "flex-1 bg-white rounded-2xl border border-slate-200 shadow-inner relative overflow-hidden",
                        isDraggingCanvas ? "cursor-grabbing" : (toolMode === 'marker' ? "cursor-crosshair" : "cursor-default")
                    )}
                    onMouseDown={handleMouseDownCanvas}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <svg className="w-full h-full pointer-events-none select-none">
                        {/* Grid/Ticks Group */}
                        <g className="pointer-events-none">
                            <line x1="0" y1={centerY} x2="100%" y2={centerY} stroke="#cbd5e1" strokeWidth="2" />
                            {renderTicks()}
                        </g>

                        {/* Contents Group */}
                        <g className="pointer-events-auto">
                            {renderMarkers()}
                            {renderArrows()}
                        </g>
                    </svg>

                    {toolMode === 'marker' && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-amber-500/90 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg pointer-events-none backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                            Kattints a számegyenesre a jelölő lerakásához!
                        </div>
                    )}

                    <div className="absolute top-4 right-4 pointer-events-none opacity-50">
                        <div className="text-xs text-slate-400 font-mono">Zoom: {scale}px</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
