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
    Move
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConstructionToolProps {
    onBack: () => void;
}

interface DrawnElement {
    id: string;
    type: 'line' | 'circle' | 'arc';
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
    const [activeTool, setActiveTool] = useState<'cursor' | 'ruler' | 'compass' | 'pencil'>('cursor');

    // Ruler State
    const [showRuler, setShowRuler] = useState(true);
    const [rulerPos, setRulerPos] = useState({ x: 300, y: 300, angle: 0 }); // Angle in degrees
    const [isDraggingRuler, setIsDraggingRuler] = useState(false);
    const [isRotatingRuler, setIsRotatingRuler] = useState<'left' | 'right' | null>(null);

    // Compass State
    const [showCompass, setShowCompass] = useState(true);
    const [compassPos, setCompassPos] = useState({ x: 400, y: 300, angle: 0, radius: 100 });
    const [isDraggingCompass, setIsDraggingCompass] = useState<'needle' | 'pencil' | 'handle' | null>(null);

    // Drawing State
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawingPath, setDrawingPath] = useState('');
    const [startAngle, setStartAngle] = useState(0);

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

    // --- Event Handlers ---

    const handleMouseDown = (e: React.MouseEvent) => {
        // Canvas click - irrelevant for tools usually unless pencil
        if (activeTool === 'pencil') {
            // Start freehand drawing
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        // This handler is for canvas-level mouse moves when no tool is actively being dragged/rotated
        // The global listener handles tool interactions.
        // This can be used for freehand drawing or cursor updates.
    };

    const handleMouseUp = () => {
        // This handler is for canvas-level mouse up when no tool is actively being dragged/rotated
        // The global listener handles tool interactions.
    };

    useEffect(() => {
        const handleGlobalMove = (e: MouseEvent) => {
            if (!isDraggingCompass && !isDraggingRuler && !isRotatingRuler) return;

            const pos = getMousePos(e);

            if (isDraggingRuler) {
                const dx = e.movementX;
                const dy = e.movementY;
                setRulerPos(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            }

            if (isRotatingRuler) {
                // Simplified rotation: just look at angle from pivot
                const pivotX = isRotatingRuler === 'right' ? rulerPos.x : (rulerPos.x + RULER_WIDTH * Math.cos(rulerPos.angle * Math.PI / 180));
                const pivotY = isRotatingRuler === 'right' ? rulerPos.y : (rulerPos.y + RULER_WIDTH * Math.sin(rulerPos.angle * Math.PI / 180));

                let angle = Math.atan2(pos.y - pivotY, pos.x - pivotX) * 180 / Math.PI;
                if (isRotatingRuler === 'left') angle += 180;

                // Re-calculate pos to keep pivot fixed
                if (isRotatingRuler === 'right') {
                    setRulerPos(prev => ({ ...prev, angle }));
                } else {
                    const newX = pivotX - RULER_WIDTH * Math.cos(angle * Math.PI / 180);
                    const newY = pivotY - RULER_WIDTH * Math.sin(angle * Math.PI / 180);
                    setRulerPos({ x: newX, y: newY, angle });
                }
            }

            if (isDraggingCompass === 'needle') {
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
                const newAngle = Math.atan2(dy, dx) * 180 / Math.PI;

                setCompassPos(prev => {
                    // If we are drawing, we need to add arc segment
                    // Determine direction? Assume shortest path or tracking?
                    // Just draw arc from previous angle to new angle
                    // For simplicity in SVG, we might accumulate full circles or just draw final shape on mouse up?
                    // Real-time drawing: calculate arc path
                    // Start Point: computed from prev angle? No, standard arc.
                    // We need to track the "start" of the draw stroke.
                    return { ...prev, angle: newAngle };
                });
            }
        };

        const handleGlobalUp = () => {
            setIsDraggingRuler(false);
            setIsRotatingRuler(null);
            setIsDraggingCompass(null);
            if (isDrawing) {
                // Commit the arc to elements
                setIsDrawing(false);
                // Calculate start and end points
                const startRad = startAngle * Math.PI / 180;
                const endRad = compassPos.angle * Math.PI / 180;

                // SVG Arc Command: M startX startY A radius radius 0 large-arc-flag sweep-flag endX endY
                const sx = compassPos.x + compassPos.radius * Math.cos(startRad);
                const sy = compassPos.y + compassPos.radius * Math.sin(startRad);
                const ex = compassPos.x + compassPos.radius * Math.cos(endRad);
                const ey = compassPos.y + compassPos.radius * Math.sin(endRad);

                // Determine flags
                const diff = endRad - startRad; // check direction?
                // Simplification: Always sweep clockwise or counter? D3 logic?
                // Let's assume standard intuitive draw: shortest path?
                // Actually user drags it. If we just draw a circle it's easier.
                // For now, let's just commit a full circle if they rotated enough?
                // Better: just add a Circle element for simplicity v1.

                setElements(prev => [...prev, {
                    id: Date.now().toString(),
                    type: 'circle',
                    path: '', // handled differently for circles
                    cx: compassPos.x,
                    cy: compassPos.y,
                    r: compassPos.radius,
                    color: 'black',
                    width: 2
                }]);
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
                    >
                        <Pencil className="w-4 h-4 mr-2" />
                        Rajzolás
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
                >
                    {/* Drawing Layer (SVG) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {elements.map(el => (
                            el.type === 'circle' ? (
                                <circle key={el.id} cx={el.cx} cy={el.cy} r={el.r} stroke={el.color} strokeWidth={el.width} fill="none" />
                            ) : (
                                <path key={el.id} d={el.path} stroke={el.color} strokeWidth={el.width} fill="none" />
                            )
                        ))}
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
                            style={{ left: 0, top: 0 }} // Positioning handled by children transforms to avoid complex nesting
                        >
                            {/* Needle Leg (Fixed at pos) */}
                            <div
                                className="absolute w-4 h-4 bg-slate-800 rounded-full cursor-move pointer-events-auto hover:scale-125 transition-transform"
                                style={{ left: compassPos.x - 8, top: compassPos.y - 8 }}
                                onMouseDown={(e) => { e.stopPropagation(); setIsDraggingCompass('needle'); }}
                                title="Tű (Mozgatás)"
                            />

                            {/* The Tool Graphic (Rotated around needle) */}
                            <div
                                className="absolute pointer-events-none origin-top-left"
                                style={{
                                    left: compassPos.x,
                                    top: compassPos.y,
                                    transform: `rotate(${compassPos.angle}deg)`
                                }}
                            >
                                {/* Structure */}
                                <div className="relative">
                                    {/* Needle Leg Graphic */}
                                    <div className="absolute w-2 h-[120px] bg-slate-400 origin-top -rotate-[15deg] border border-slate-500" style={{ left: 0, top: 0, height: Math.max(100, compassPos.radius + 20) }}></div>

                                    {/* Pencil Leg Graphic (Visual approximation) */}
                                    <div
                                        className="absolute w-2 bg-slate-400 origin-top rotate-[15deg] border border-slate-500"
                                        style={{
                                            left: 0, top: 0,
                                            height: Math.max(100, compassPos.radius + 20),
                                            // We need to visually match the tip to the radius
                                            // This is tricky with simple CSS rotation.
                                            // Simplified: Just draw a line to the pencil tip?
                                        }}
                                    ></div>

                                    {/* Handle (Top) */}
                                    <div
                                        className="absolute -top-6 -left-3 w-6 h-8 bg-slate-600 rounded-t-lg cursor-grab active:cursor-grabbing pointer-events-auto"
                                        onMouseDown={(e) => { e.stopPropagation(); setIsDraggingCompass('handle'); setIsDrawing(true); setStartAngle(compassPos.angle); }}
                                        title="Fogantyú (Rajzolás)"
                                    />
                                </div>

                                {/* Pencil Tip (The actual draw point) */}
                                <div
                                    className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-nwse-resize pointer-events-auto hover:bg-blue-400 shadow-sm border-2 border-white"
                                    style={{ left: compassPos.radius - 2, top: -2 }} // Relative to rotated container? No, rotate container is X axis aligned?
                                    // Wait, if we rotate the container by `compassPos.angle`, then (radius, 0) is the tip? Yes.
                                    onMouseDown={(e) => { e.stopPropagation(); setIsDraggingCompass('pencil'); }}
                                    title="Ceruza (Sugár)"
                                />

                                {/* Leg connection visual (SVG line) */}
                                <svg className="absolute top-0 left-0 overflow-visible" width="300" height="300" style={{ pointerEvents: 'none' }}>
                                    <line x1="0" y1="0" x2={compassPos.radius} y2="0" stroke="transparent" />
                                    {/* Actual legs visual */}
                                    <path d={`M 0 0 L 0 -20`} stroke="#64748b" strokeWidth="4" />
                                    <path d={`M 0 -20 L ${compassPos.radius} 0`} stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" opacity="0.5" />
                                </svg>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

