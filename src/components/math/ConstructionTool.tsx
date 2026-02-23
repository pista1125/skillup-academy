import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    ArrowLeft,
    RotateCcw,
    Trash2,
    MousePointer2,
    Pencil,
    Ruler as RulerIcon,
    Circle as CircleIcon,
    Grid3X3,
    Move,
    Eraser,
    Undo2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConstructionToolProps {
    onBack: () => void;
}

interface DrawnElement {
    id: string;
    type: 'line' | 'circle' | 'arc' | 'point';
    path: string; // SVG path command
    color: string;
    width: number;
    // Optional properties for circle/arc optimization
    cx?: number;
    cy?: number;
    r?: number;
}

type BackgroundType = 'blank' | 'grid' | 'coordinate';

export function ConstructionTool({ onBack }: ConstructionToolProps) {
    // --- State ---
    const [background, setBackground] = useState<BackgroundType>('blank');
    const [elements, setElements] = useState<DrawnElement[]>([]);
    const [activeTool, setActiveTool] = useState<'cursor' | 'pencil' | 'ruler-line' | 'eraser' | 'point'>('cursor');

    // Ruler State
    const [showRuler, setShowRuler] = useState(true);
    const [rulerPos, setRulerPos] = useState({ x: 300, y: 300, angle: 0 }); // Angle in degrees
    const [isDraggingRuler, setIsDraggingRuler] = useState(false);
    const [isRotatingRuler, setIsRotatingRuler] = useState<'left' | 'right' | null>(null);

    // Compass State
    const [showCompass, setShowCompass] = useState(true);
    const [compassPos, setCompassPos] = useState({ x: 400, y: 300, angle: 0, radius: 100 });
    const [isDraggingCompass, setIsDraggingCompass] = useState<'needle' | 'pencil' | 'handle' | null>(null);
    const [dragStartAngle, setDragStartAngle] = useState(0);
    const [initialCompassAngle, setInitialCompassAngle] = useState(0);

    // Protractor State
    const [showProtractor, setShowProtractor] = useState(false);
    const [protractorPos, setProtractorPos] = useState({ x: 400, y: 400, angle: 0 });
    const [isDraggingProtractor, setIsDraggingProtractor] = useState(false);
    const [isRotatingProtractor, setIsRotatingProtractor] = useState(false);

    // Drawing State
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawingPath, setDrawingPath] = useState('');
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 }); // For line drawing
    const [startAngle, setStartAngle] = useState(0); // For compass
    const [freehandPoints, setFreehandPoints] = useState<{ x: number, y: number }[]>([]);

    const containerRef = useRef<HTMLDivElement>(null);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

    // --- Constants ---
    const RULER_WIDTH = 400;
    const RULER_HEIGHT = 60;

    // --- Helpers ---
    const getMousePos = (e: React.MouseEvent | MouseEvent) => {
        if (!containerRef.current) return { x: 0, y: 0 };
        const rect = containerRef.current.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    const handleUndo = () => {
        setElements(prev => prev.slice(0, -1));
    };

    const handleRemoveElement = (id: string) => {
        if (activeTool === 'eraser') {
            setElements(prev => prev.filter(el => el.id !== id));
        }
    };

    // --- Event Handlers ---

    const handleMouseDown = (e: React.MouseEvent) => {
        const pos = getMousePos(e);

        if (activeTool === 'pencil') {
            setIsDrawing(true);
            setFreehandPoints([pos]);
            setDrawingPath(`M ${pos.x} ${pos.y}`);
        } else if (activeTool === 'ruler-line' && showRuler) {
            setIsDrawing(true);
            // Snap to ruler edge if possible or just start line
            setStartPoint(pos);
            setDrawingPath(`M ${pos.x} ${pos.y} L ${pos.x} ${pos.y}`);
        } else if (activeTool === 'point') {
            setElements(prev => [...prev, {
                id: Date.now().toString(),
                type: 'point',
                path: '',
                cx: pos.x,
                cy: pos.y,
                color: 'black',
                width: 2
            }]);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDrawing) return;
        const pos = getMousePos(e);

        if (activeTool === 'pencil') {
            const lastPoint = freehandPoints[freehandPoints.length - 1];
            // Only add point if moved enough
            const dist = Math.sqrt(Math.pow(pos.x - lastPoint.x, 2) + Math.pow(pos.y - lastPoint.y, 2));
            if (dist > 3) {
                setFreehandPoints(prev => [...prev, pos]);
                setDrawingPath(prev => `${prev} L ${pos.x} ${pos.y}`);
            }
        } else if (activeTool === 'ruler-line' && showRuler) {
            // Constrain to ruler angle
            const angleRad = rulerPos.angle * Math.PI / 180;
            const dx = pos.x - startPoint.x;
            const dy = pos.y - startPoint.y;

            // Project (dx, dy) onto the ruler's vector (cos, sin)
            const dotProduct = dx * Math.cos(angleRad) + dy * Math.sin(angleRad);
            const constrainedX = startPoint.x + dotProduct * Math.cos(angleRad);
            const constrainedY = startPoint.y + dotProduct * Math.sin(angleRad);

            setDrawingPath(`M ${startPoint.x} ${startPoint.y} L ${constrainedX} ${constrainedY}`);
        }
    };

    const handleMouseUp = () => {
        if (isDrawing && (activeTool === 'pencil' || activeTool === 'ruler-line')) {
            setElements(prev => [...prev, {
                id: Date.now().toString(),
                type: 'line',
                path: drawingPath,
                color: 'black',
                width: 2
            }]);
            setIsDrawing(false);
            setDrawingPath('');
            setFreehandPoints([]);
        }
    };

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent) => {
            if (!isDraggingCompass && !isDraggingRuler && !isRotatingRuler && !isDraggingProtractor && !isRotatingProtractor) return;

            const pos = getMousePos(e);

            if (isDraggingRuler) {
                const dx = pos.x - lastMousePos.x;
                const dy = pos.y - lastMousePos.y;
                setRulerPos(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            } else if (isRotatingRuler) {
                const dx = pos.x - rulerPos.x;
                const dy = pos.y - rulerPos.y;
                const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                if (isRotatingRuler === 'left') {
                    setRulerPos(prev => ({ ...prev, angle: angle }));
                } else {
                    setRulerPos(prev => ({ ...prev, angle: angle - 180 }));
                }
            } else if (isDraggingProtractor) {
                const dx = pos.x - lastMousePos.x;
                const dy = pos.y - lastMousePos.y;
                setProtractorPos(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            } else if (isRotatingProtractor) {
                const dx = pos.x - protractorPos.x;
                const dy = pos.y - protractorPos.y;
                setProtractorPos(prev => ({ ...prev, angle: Math.atan2(dy, dx) * 180 / Math.PI }));
            } else if (isDraggingCompass === 'needle') {
                // Move entire compass
                const dx = e.movementX;
                const dy = e.movementY;
                setCompassPos(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            }

            if (isDraggingCompass === 'pencil') {
                // Adjust radius and angle (legs open/close + rotate)
                // Needle is at compassPos.x, compassPos.y
                const dx = pos.x - compassPos.x;
                const dy = pos.y - compassPos.y;
                const newRadius = Math.sqrt(dx * dx + dy * dy);
                const newAngle = Math.atan2(dy, dx) * 180 / Math.PI;

                setCompassPos(prev => ({ ...prev, radius: Math.max(20, newRadius), angle: newAngle }));
            }

            if (isDraggingCompass === 'handle') {
                // Rotate around needle without changing radius
                const dx = pos.x - compassPos.x;
                const dy = pos.y - compassPos.y;
                const currentRelAngle = Math.atan2(dy, dx) * 180 / Math.PI;
                const newAngle = initialCompassAngle + (currentRelAngle - dragStartAngle);

                setCompassPos(prev => ({ ...prev, angle: newAngle }));
            }
            setLastMousePos(pos);
        };

        const handleGlobalUp = () => {
            setIsDraggingRuler(false);
            setIsRotatingRuler(null);
            setIsDraggingCompass(null);
            setIsDraggingProtractor(false);
            setIsRotatingProtractor(false);

            if (isDrawing && isDraggingCompass === 'handle') {
                setIsDrawing(false);
                const angleDiff = compassPos.angle - startAngle;

                // If they rotated almost 360 degrees, make it a circle
                if (Math.abs(angleDiff) >= 355) {
                    setElements(prev => [...prev, {
                        id: Date.now().toString(),
                        type: 'circle',
                        path: '',
                        cx: compassPos.x,
                        cy: compassPos.y,
                        r: compassPos.radius,
                        color: 'black',
                        width: 2
                    }]);
                } else {
                    // Create an SVG arc
                    const startRad = startAngle * Math.PI / 180;
                    const endRad = compassPos.angle * Math.PI / 180;

                    const x1 = compassPos.x + compassPos.radius * Math.cos(startRad);
                    const y1 = compassPos.y + compassPos.radius * Math.sin(startRad);
                    const x2 = compassPos.x + compassPos.radius * Math.cos(endRad);
                    const y2 = compassPos.y + compassPos.radius * Math.sin(endRad);

                    const largeArc = Math.abs(angleDiff) > 180 ? 1 : 0;
                    const sweep = angleDiff > 0 ? 1 : 0;

                    const d = `M ${x1} ${y1} A ${compassPos.radius} ${compassPos.radius} 0 ${largeArc} ${sweep} ${x2} ${y2}`;

                    setElements(prev => [...prev, {
                        id: Date.now().toString(),
                        type: 'arc',
                        path: d,
                        color: 'black',
                        width: 2
                    }]);
                }
            }
        };

        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', handleGlobalUp);
        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
        };
    }, [isDraggingRuler, isRotatingRuler, isDraggingCompass, rulerPos, compassPos, isDrawing, startAngle]);

    // --- Rendering ---

    return (
        <div className="flex flex-col gap-4 w-full h-[calc(100vh-100px)] max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={onBack} size="sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                    <div className="h-6 w-px bg-slate-200 mx-2" />
                    <h2 className="font-bold text-slate-700">Alapszerkesztés</h2>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={background === 'blank' ? 'secondary' : 'ghost'}
                        size="sm" onClick={() => setBackground('blank')}
                        title="Üres lap"
                    >
                        <div className="w-4 h-4 border border-slate-400 bg-white" />
                    </Button>
                    <Button
                        variant={background === 'grid' ? 'secondary' : 'ghost'}
                        size="sm" onClick={() => setBackground('grid')}
                        title="Négyzetrács"
                    >
                        <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <div className="h-6 w-px bg-slate-200 mx-2" />
                    <Button
                        variant={activeTool === 'pencil' ? 'default' : 'outline'}
                        onClick={() => setActiveTool(activeTool === 'pencil' ? 'cursor' : 'pencil')}
                        title="Szabadkézi rajz"
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Ceruza
                    </Button>
                    <Button
                        variant={activeTool === 'point' ? 'default' : 'outline'}
                        onClick={() => setActiveTool(activeTool === 'point' ? 'cursor' : 'point')}
                        title="Pont lehelyezése"
                    >
                        <div className="w-4 h-4 rounded-full bg-current" />
                        <span className="ml-2">Pont</span>
                    </Button>
                    <Button
                        variant={activeTool === 'ruler-line' ? 'default' : 'outline'}
                        onClick={() => setActiveTool(activeTool === 'ruler-line' ? 'cursor' : 'ruler-line')}
                        title="Vonalzó menti egyenes"
                    >
                        <Move className="w-4 h-4 mr-2" />
                        Egyenes
                    </Button>
                    <Button
                        variant={activeTool === 'eraser' ? 'default' : 'outline'}
                        onClick={() => setActiveTool(activeTool === 'eraser' ? 'cursor' : 'eraser')}
                        title="Radír"
                        className={activeTool === 'eraser' ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                        <Eraser className="w-4 h-4 mr-2" />
                        Radír
                    </Button>
                    <Button
                        variant={showProtractor ? 'default' : 'outline'}
                        onClick={() => setShowProtractor(!showProtractor)}
                        title="Szögmérő"
                    >
                        <CircleIcon className="w-4 h-4 mr-2" />
                        Szögmérő
                    </Button>
                    <div className="h-6 w-px bg-slate-200 mx-2" />
                    <Button
                        variant="outline"
                        onClick={handleUndo}
                        disabled={elements.length === 0}
                        title="Visszavonás"
                    >
                        <Undo2 className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                    <Button variant="outline" onClick={() => setElements([])} className="text-red-500 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Törlés
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 gap-4 overflow-hidden">
                {/* Toolbar */}
                <Card className="w-20 shrink-0 border-slate-200 shadow-sm">
                    <CardContent className="p-2 flex flex-col gap-4 items-center pt-4">
                        <Button
                            variant={showRuler ? "default" : "outline"}
                            className={cn("w-12 h-12 rounded-xl p-0", showRuler ? "bg-amber-500 hover:bg-amber-600" : "")}
                            onClick={() => setShowRuler(!showRuler)}
                            title="Vonalzó"
                        >
                            <RulerIcon className="w-6 h-6 rotate-45" />
                        </Button>
                        <Button
                            variant={showCompass ? "default" : "outline"}
                            className={cn("w-12 h-12 rounded-xl p-0", showCompass ? "bg-blue-500 hover:bg-blue-600" : "")}
                            onClick={() => setShowCompass(!showCompass)}
                            title="Körző"
                        >
                            <CircleIcon className="w-6 h-6" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Canvas */}
                <div
                    ref={containerRef}
                    className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-inner relative overflow-hidden select-none cursor-crosshair"
                    style={{
                        backgroundImage: background === 'grid'
                            ? 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)'
                            : 'none',
                        backgroundSize: '20px 20px'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Drawing Layer (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {elements.map(el => {
                            const commonProps = {
                                key: el.id,
                                onClick: () => handleRemoveElement(el.id),
                                className: cn(
                                    "pointer-events-auto transition-opacity",
                                    activeTool === 'eraser' ? "cursor-alias hover:opacity-50" : ""
                                )
                            };

                            return (
                                <g key={el.id}>
                                    {/* Invisible hit area for easier erasing */}
                                    {el.type === 'circle' ? (
                                        <circle cx={el.cx} cy={el.cy} r={el.r} stroke="transparent" strokeWidth="15" fill="none" {...commonProps} />
                                    ) : el.type === 'point' ? (
                                        <circle cx={el.cx} cy={el.cy} r="15" fill="transparent" {...commonProps} />
                                    ) : (
                                        <path d={el.path} stroke="transparent" strokeWidth="15" fill="none" {...commonProps} />
                                    )}

                                    {/* Visual element */}
                                    {el.type === 'circle' ? (
                                        <circle cx={el.cx} cy={el.cy} r={el.r} stroke={el.color} strokeWidth={el.width} fill="none" className="pointer-events-none" />
                                    ) : el.type === 'point' ? (
                                        <circle cx={el.cx} cy={el.cy} r="6" fill={el.color} className="pointer-events-none" />
                                    ) : (
                                        <path d={el.path} stroke={el.color} strokeWidth={el.width} fill="none" className="pointer-events-none" />
                                    )}
                                </g>
                            );
                        })}
                        {isDrawing && drawingPath && (
                            <path d={drawingPath} stroke="#3b82f6" strokeWidth="2" strokeDasharray="4" fill="none" />
                        )}
                    </svg>

                    {/* Ruler Tool */}
                    {showRuler && (
                        <div
                            className="absolute h-[60px] bg-yellow-100/90 border border-yellow-600 shadow-lg flex flex-col cursor-move group origin-top-left z-20"
                            style={{
                                width: RULER_WIDTH,
                                left: rulerPos.x,
                                top: rulerPos.y,
                                transform: `rotate(${rulerPos.angle}deg)`,
                            }}
                            onMouseDown={(e) => { e.stopPropagation(); setIsDraggingRuler(true); }}
                        >
                            {/* Ticks */}
                            <div className="absolute top-0 w-full h-full pointer-events-none overflow-hidden">
                                {Array.from({ length: 41 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute top-0 w-px bg-slate-800"
                                        style={{
                                            left: i * 10,
                                            height: i % 10 === 0 ? '50%' : (i % 5 === 0 ? '30%' : '15%')
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Rotate Handles */}
                            <div
                                className="absolute left-[-20px] top-0 bottom-0 w-8 bg-transparent cursor-ew-resize hover:bg-blue-500/20 rounded-l-lg"
                                onMouseDown={(e) => { e.stopPropagation(); setIsRotatingRuler('left'); }}
                            />
                            <div
                                className="absolute right-[-20px] top-0 bottom-0 w-8 bg-transparent cursor-ew-resize hover:bg-blue-500/20 rounded-r-lg"
                                onMouseDown={(e) => { e.stopPropagation(); setIsRotatingRuler('right'); }}
                            />
                        </div>
                    )}

                    {/* Compass Tool */}
                    {showCompass && (
                        <div
                            className="absolute z-30 pointer-events-none"
                            style={{ left: 0, top: 0, width: '100%', height: '100%' }}
                        >
                            {/* The Tool Graphic */}
                            <div
                                className="absolute pointer-events-none origin-top-left"
                                style={{
                                    left: compassPos.x,
                                    top: compassPos.y,
                                    transform: `rotate(${compassPos.angle}deg)`
                                }}
                            >
                                {/* Compass Legs SVG */}
                                <svg
                                    className="absolute overflow-visible"
                                    width="1" height="1"
                                    style={{ left: 0, top: 0 }}
                                >
                                    <defs>
                                        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                            <feOffset dx="1" dy="1" result="offsetblur" />
                                            <feComponentTransfer>
                                                <feFuncA type="linear" slope="0.3" />
                                            </feComponentTransfer>
                                            <feMerge>
                                                <feMergeNode />
                                                <feMergeNode in="SourceGraphic" />
                                            </feMerge>
                                        </filter>
                                    </defs>

                                    {/* Needle Leg */}
                                    <path
                                        d={`M 0 0 L -10 -150 L 0 -170`}
                                        stroke="#94a3b8"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        fill="none"
                                        filter="url(#shadow)"
                                    />
                                    {/* Needle Tip */}
                                    <circle cx="0" cy="0" r="2" fill="#475569" className="pointer-events-auto cursor-move"
                                        onMouseDown={(e) => { e.stopPropagation(); setIsDraggingCompass('needle'); }}
                                    />

                                    {/* Pencil Leg */}
                                    <path
                                        d={`M ${compassPos.radius} 0 L ${compassPos.radius / 2 + 5} -150 L 0 -170`}
                                        stroke="#94a3b8"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        fill="none"
                                        filter="url(#shadow)"
                                    />

                                    {/* Handle / Pivot Joint */}
                                    <g
                                        className="pointer-events-auto cursor-grab active:cursor-grabbing"
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                            const pos = getMousePos(e as any);
                                            const dx = pos.x - compassPos.x;
                                            const dy = pos.y - compassPos.y;
                                            setDragStartAngle(Math.atan2(dy, dx) * 180 / Math.PI);
                                            setInitialCompassAngle(compassPos.angle);
                                            setIsDraggingCompass('handle');
                                            setIsDrawing(true);
                                            setStartAngle(compassPos.angle);
                                        }}
                                    >
                                        <circle cx="0" cy="-170" r="12" fill="#475569" />
                                        <rect x="-4" y="-200" width="8" height="30" rx="4" fill="#64748b" />
                                    </g>

                                    {/* Pencil Tip / Lead */}
                                    <g
                                        className="pointer-events-auto cursor-nwse-resize"
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                            setIsDraggingCompass('pencil');
                                        }}
                                    >
                                        <path d={`M ${compassPos.radius - 4} 0 L ${compassPos.radius + 4} 0 L ${compassPos.radius} 10 Z`} fill="#3b82f6" />
                                        <circle cx={compassPos.radius} cy="0" r="6" fill="transparent" />
                                    </g>
                                </svg>

                                {/* Current Arc visual while drawing */}
                                {isDrawing && (
                                    <svg className="absolute inset-0 overflow-visible pointer-events-none">
                                        <path
                                            d={(() => {
                                                const startRad = startAngle * Math.PI / 180;
                                                const endRad = compassPos.angle * Math.PI / 180;
                                                const sx = compassPos.radius * Math.cos((startRad - compassPos.angle * Math.PI / 180));
                                                const sy = compassPos.radius * Math.sin((startRad - compassPos.angle * Math.PI / 180));
                                                const ex = compassPos.radius;
                                                const ey = 0;

                                                // This is complex because we are already in a rotated container.
                                                // Simpler: Use absolute coordinates for the preview path or transform back.
                                                // Let's just draw the arc relative to the needle in the rotated container.
                                                // Actually, if we rotate the whole <div>, the SVG (0,0) is the needle.
                                                // So an arc from startAngle to currentAngle.
                                                const angleDiff = (compassPos.angle - startAngle);
                                                const largeArc = Math.abs(angleDiff) > 180 ? 1 : 0;
                                                const sweep = angleDiff > 0 ? 1 : 0;

                                                const x1 = compassPos.radius * Math.cos((startAngle - compassPos.angle) * Math.PI / 180);
                                                const y1 = compassPos.radius * Math.sin((startAngle - compassPos.angle) * Math.PI / 180);

                                                return `M ${x1} ${y1} A ${compassPos.radius} ${compassPos.radius} 0 ${largeArc} ${sweep} ${compassPos.radius} 0`;
                                            })()}
                                            stroke="#3b82f6"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeDasharray="4 4"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    )}
                    {/* Protractor Tool */}
                    {showProtractor && (
                        <div
                            className="absolute z-20 cursor-move"
                            style={{
                                left: protractorPos.x - 150,
                                top: protractorPos.y - 140,
                                transform: `rotate(${protractorPos.angle}deg)`,
                                transformOrigin: '150px 140px',
                                width: 300,
                                height: 150,
                            }}
                            onMouseDown={(e) => { e.stopPropagation(); setIsDraggingProtractor(true); }}
                        >
                            <svg viewBox="0 0 300 150" className="w-full h-full drop-shadow-md">
                                {/* Semi-circle body */}
                                <path
                                    d="M 10 140 A 140 140 0 0 1 290 140 L 150 140 Z"
                                    fill="rgba(191, 219, 254, 0.4)"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                />
                                {/* Center mark */}
                                <line x1="150" y1="135" x2="150" y2="145" stroke="#3b82f6" strokeWidth="2" />
                                <line x1="145" y1="140" x2="155" y2="140" stroke="#3b82f6" strokeWidth="2" />

                                {/* Ticks */}
                                {Array.from({ length: 181 }).map((_, i) => {
                                    const rad = (i) * Math.PI / 180;
                                    const r1 = 140;
                                    const r2 = i % 10 === 0 ? 120 : (i % 5 === 0 ? 130 : 135);

                                    const x1 = 150 + r1 * Math.cos(-rad);
                                    const y1 = 140 + r1 * Math.sin(-rad);
                                    const x2 = 150 + r2 * Math.cos(-rad);
                                    const y2 = 140 + r2 * Math.sin(-rad);

                                    return (
                                        <g key={i}>
                                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e40af" strokeWidth={i % 10 === 0 ? 1.5 : 1} />
                                            {i % 10 === 0 && (
                                                <text
                                                    x={150 + 105 * Math.cos(-rad)}
                                                    y={140 + 105 * Math.sin(-rad)}
                                                    fontSize="8"
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    fill="#1e40af"
                                                    transform={`rotate(${90 - i}, ${150 + 105 * Math.cos(-rad)}, ${140 + 105 * Math.sin(-rad)})`}
                                                >
                                                    {i}
                                                </text>
                                            )}
                                        </g>
                                    );
                                })}
                            </svg>
                            {/* Rotation handles */}
                            <div
                                className="absolute left-0 bottom-0 w-8 h-8 cursor-alias"
                                onMouseDown={(e) => { e.stopPropagation(); setIsRotatingProtractor(true); }}
                            />
                            <div
                                className="absolute right-0 bottom-0 w-8 h-8 cursor-alias"
                                onMouseDown={(e) => { e.stopPropagation(); setIsRotatingProtractor(true); }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

