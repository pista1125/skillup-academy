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
    Undo2,
    ZoomIn,
    ZoomOut,
    Maximize,
    Minimize,
    ChevronDown,
    Dot,
    Minus,
    Type,
    Shapes as ShapesIcon,
    PenTool
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    const [activeTool, setActiveTool] = useState<'move' | 'pencil' | 'ruler-line' | 'eraser' | 'point'>('move');

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

    // View State (Pan & Zoom)
    const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 1200, height: 800 });
    const [isPanning, setIsPanning] = useState(false);
    const [isPencilDown, setIsPencilDown] = useState(true); // For compass

    const containerRef = useRef<HTMLDivElement>(null);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [lastSVGPos, setLastSVGPos] = useState({ x: 0, y: 0 });

    // --- Constants ---
    const RULER_WIDTH = 400;
    const RULER_HEIGHT = 60;

    // --- Helpers ---
    const svgRef = useRef<SVGSVGElement>(null);

    const getSVGPoint = (clientX: number, clientY: number) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const transformed = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        return { x: transformed.x, y: transformed.y };
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
        if (e.button === 1 || activeTool === 'move') {
            setIsPanning(true);
            setLastMousePos({ x: e.clientX, y: e.clientY });
            setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
            return;
        }

        const pos = getSVGPoint(e.clientX, e.clientY);
        setLastSVGPos(pos);

        if (activeTool === 'pencil') {
            setIsDrawing(true);
            setFreehandPoints([pos]);
            setDrawingPath(`M ${pos.x} ${pos.y}`);
        } else if (activeTool === 'ruler-line' && showRuler) {
            setIsDrawing(true);
            setStartPoint(pos);
            setDrawingPath(`M ${pos.x} ${pos.y} L ${pos.x} ${pos.y}`);
        } else if (activeTool === 'point') {
            setElements(prev => [...prev, {
                id: `pt-${Date.now()}`,
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
        if (isPanning && svgRef.current) {
            const dx = (e.clientX - lastMousePos.x) * (viewBox.width / svgRef.current.clientWidth);
            const dy = (e.clientY - lastMousePos.y) * (viewBox.height / svgRef.current.clientHeight);
            setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
            setLastMousePos({ x: e.clientX, y: e.clientY });
            setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
            return;
        }

        if (!isDrawing) return;
        const pos = getSVGPoint(e.clientX, e.clientY);

        if (activeTool === 'pencil') {
            const lastPoint = freehandPoints[freehandPoints.length - 1];
            const dist = Math.sqrt(Math.pow(pos.x - lastPoint.x, 2) + Math.pow(pos.y - lastPoint.y, 2));
            if (dist > 2) {
                setFreehandPoints(prev => [...prev, pos]);
                setDrawingPath(prev => `${prev} L ${pos.x} ${pos.y}`);
            }
        } else if (activeTool === 'ruler-line' && showRuler) {
            const angleRad = rulerPos.angle * Math.PI / 180;
            const dx = pos.x - startPoint.x;
            const dy = pos.y - startPoint.y;
            const dotProduct = dx * Math.cos(angleRad) + dy * Math.sin(angleRad);
            const constrainedX = startPoint.x + dotProduct * Math.cos(angleRad);
            const constrainedY = startPoint.y + dotProduct * Math.sin(angleRad);
            setDrawingPath(`M ${startPoint.x} ${startPoint.y} L ${constrainedX} ${constrainedY}`);
        }
    };

    const handleMouseUp = () => {
        setIsPanning(false);
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

            const pos = getSVGPoint(e.clientX, e.clientY);

            const dx = pos.x - lastSVGPos.x;
            const dy = pos.y - lastSVGPos.y;

            if (isDraggingRuler) {
                setRulerPos(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            } else if (isRotatingRuler) {
                const rdx = pos.x - rulerPos.x;
                const rdy = pos.y - rulerPos.y;
                const angle = Math.atan2(rdy, rdx) * 180 / Math.PI;
                if (isRotatingRuler === 'left') {
                    setRulerPos(prev => ({ ...prev, angle: angle }));
                } else {
                    setRulerPos(prev => ({ ...prev, angle: angle - 180 }));
                }
            } else if (isDraggingProtractor) {
                setProtractorPos(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            } else if (isRotatingProtractor) {
                const rdx = pos.x - protractorPos.x;
                const rdy = pos.y - protractorPos.y;
                setProtractorPos(prev => ({ ...prev, angle: Math.atan2(rdy, rdx) * 180 / Math.PI }));
            } else if (isDraggingCompass === 'needle') {
                setCompassPos(prev => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
            }

            if (isDraggingCompass === 'pencil') {
                const pdx = pos.x - compassPos.x;
                const pdy = pos.y - compassPos.y;
                const newRadius = Math.sqrt(pdx * pdx + pdy * pdy);
                const newAngle = Math.atan2(pdy, pdx) * 180 / Math.PI;

                setCompassPos(prev => ({ ...prev, radius: Math.max(20, newRadius), angle: newAngle }));
            }

            if (isDraggingCompass === 'handle') {
                const hdx = pos.x - compassPos.x;
                const hdy = pos.y - compassPos.y;
                const currentRelAngle = Math.atan2(hdy, hdx) * 180 / Math.PI;
                const newAngle = initialCompassAngle + (currentRelAngle - dragStartAngle);

                setCompassPos(prev => ({ ...prev, angle: newAngle }));
            }
            setLastMousePos({ x: e.clientX, y: e.clientY });
            setLastSVGPos(pos);
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            const factor = e.deltaY > 0 ? 1.05 : 0.95;
            const svg = svgRef.current;
            if (!svg) return;

            const rect = svg.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const svgX = viewBox.x + (mouseX / rect.width) * viewBox.width;
            const svgY = viewBox.y + (mouseY / rect.height) * viewBox.height;

            const newWidth = viewBox.width * factor;
            const newHeight = viewBox.height * factor;

            if (newWidth > 10000 || newWidth < 100) return;

            setViewBox({
                x: svgX - (mouseX / rect.width) * newWidth,
                y: svgY - (mouseY / rect.height) * newHeight,
                width: newWidth,
                height: newHeight
            });
        };

        const handleGlobalUp = () => {
            setIsPanning(false);
            setIsDraggingRuler(false);
            setIsRotatingRuler(null);
            setIsDraggingCompass(null);
            setIsDraggingProtractor(false);
            setIsRotatingProtractor(false);

            if (isDrawing && isDraggingCompass === 'handle' && isPencilDown) {
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
        svgRef.current?.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            svgRef.current?.removeEventListener('wheel', handleWheel);
        };
    }, [
        isDraggingRuler, isRotatingRuler, 
        isDraggingCompass, isPencilDown, 
        isDraggingProtractor, isRotatingProtractor,
        rulerPos, compassPos, protractorPos,
        isDrawing, startAngle, initialCompassAngle, dragStartAngle, 
        lastSVGPos, viewBox
    ]);

    // --- Rendering ---

    return (
        <div className="fixed inset-0 z-50 bg-slate-50 flex flex-col overflow-hidden select-none">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-2 border-b border-slate-200 z-50 shadow-sm px-4">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={onBack} size="sm" className="hover:bg-slate-100">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Vissza
                    </Button>
                    <div className="h-4 w-px bg-slate-200 mx-2" />
                    <h2 className="font-bold text-slate-700">Alapszerkesztés</h2>
                </div>

                <div className="flex items-center gap-2">
                    {/* Points & Lines Group */}
                    <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 shadow-sm">
                        <Button
                            variant={activeTool === 'point' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTool(activeTool === 'point' ? 'cursor' : 'point')}
                            className={cn("h-8", activeTool === 'point' ? "shadow-sm" : "")}
                            title="Pont"
                        >
                            <Dot className="w-5 h-5" />
                        </Button>
                        <Button
                            variant={activeTool === 'ruler-line' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTool(activeTool === 'ruler-line' ? 'cursor' : 'ruler-line')}
                            className={cn("h-8", activeTool === 'ruler-line' ? "shadow-sm" : "")}
                            title="Egyenes"
                        >
                            <Minus className="w-5 h-5 rotate-45" />
                        </Button>
                    </div>

                    <div className="h-6 w-px bg-slate-200 mx-2" />

                    {/* Move tool */}
                    <Button
                        variant={activeTool === 'move' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveTool('move')}
                        title="Mozgatás"
                        className="h-8"
                    >
                        <Move className="w-4 h-4 mr-2" />
                        Mozgatás
                    </Button>
                    {/* Pencil Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={activeTool === 'pencil' ? 'default' : 'outline'}
                                size="sm"
                                className="h-8"
                            >
                                <Pencil className="w-4 h-4 mr-2" />
                                Ceruza
                                <ChevronDown className="w-3 h-3 ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setActiveTool('pencil')}>
                                <Pencil className="w-4 h-4 mr-2" />
                                Szabadkézi rajz
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setElements([])} className="text-red-500">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Rajzlap ürítése
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant={activeTool === 'eraser' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveTool(activeTool === 'eraser' ? 'cursor' : 'eraser')}
                        title="Eraser"
                        className={cn("h-8", activeTool === 'eraser' ? "bg-red-500 hover:bg-red-600 border-red-600" : "")}
                    >
                        <Eraser className="w-4 h-4 mr-2" />
                        Radír
                    </Button>

                    <div className="h-6 w-px bg-slate-200 mx-4" />

                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" onClick={() => setBackground(background === 'grid' ? 'blank' : 'grid')} title="Grid">
                             <Grid3X3 className={cn("w-4 h-4", background === 'grid' ? "text-blue-500" : "text-slate-400")} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleUndo} disabled={elements.length === 0} title="Undo">
                             <Undo2 className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex flex-1 relative overflow-hidden">
                {/* Left Floating Sidebar */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
                    <Card className="p-2 flex flex-col gap-3 shadow-xl border-slate-200 bg-white/90 backdrop-blur-sm rounded-2xl">
                        <Button
                            variant={showRuler ? "default" : "outline"}
                            className={cn(
                                "w-12 h-12 rounded-xl p-0 transition-all",
                                showRuler ? "bg-amber-500 hover:bg-amber-600 shadow-lg scale-105" : "hover:bg-amber-50"
                            )}
                            onClick={() => setShowRuler(!showRuler)}
                            title="Vonalzó"
                        >
                            <RulerIcon className="w-6 h-6 rotate-45" />
                        </Button>
                        <Button
                            variant={showCompass ? "default" : "outline"}
                            className={cn(
                                "w-12 h-12 rounded-xl p-0 transition-all",
                                showCompass ? "bg-blue-500 hover:bg-blue-600 shadow-lg scale-105" : "hover:bg-blue-50"
                            )}
                            onClick={() => setShowCompass(!showCompass)}
                            title="Körző"
                        >
                            <CircleIcon className="w-6 h-6" />
                        </Button>
                        <Button
                            variant={showProtractor ? "default" : "outline"}
                            className={cn(
                                "w-12 h-12 rounded-xl p-0 transition-all",
                                showProtractor ? "bg-purple-500 hover:bg-purple-600 shadow-lg scale-105" : "hover:bg-purple-50"
                            )}
                            onClick={() => setShowProtractor(!showProtractor)}
                            title="Szögmérő"
                        >
                            <ShapesIcon className="w-6 h-6" />
                        </Button>
                    </Card>

                    <Card className="p-1 flex flex-col gap-1 shadow-lg border-slate-200 bg-white/80 backdrop-blur-sm rounded-xl">
                        <Button variant="ghost" size="icon" onClick={() => {
                            setViewBox(prev => ({ ...prev, width: prev.width * 0.9, height: prev.height * 0.9, x: prev.x + prev.width * 0.05, y: prev.y + prev.height * 0.05 }))
                        }} title="Zoom In">
                             <ZoomIn className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => {
                            setViewBox(prev => ({ ...prev, width: prev.width * 1.1, height: prev.height * 1.1, x: prev.x - prev.width * 0.05, y: prev.y - prev.height * 0.05 }))
                        }} title="Zoom Out">
                             <ZoomOut className="w-4 h-4" />
                        </Button>
                    </Card>
                </div>

                {/* Main Canvas */}
                <div
                    ref={containerRef}
                    className={cn(
                        "flex-1 bg-white relative overflow-hidden select-none",
                        activeTool === 'move' ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair"
                    )}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    {/* Drawing Layer (SVG) */}
                    <svg
                        ref={svgRef}
                        className="absolute inset-0 w-full h-full"
                        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                    >
                        {/* Background Grid */}
                        {background === 'grid' && (
                            <defs>
                                <pattern id="construction-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#cbd5e1" strokeWidth="1" />
                                </pattern>
                            </defs>
                        )}
                        {background === 'grid' && (
                            <rect
                                x={viewBox.x}
                                y={viewBox.y}
                                width={viewBox.width}
                                height={viewBox.height}
                                fill="url(#construction-grid)"
                                className="pointer-events-none"
                            />
                        )}
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

                        {/* Ruler Tool */}
                        {showRuler && (
                            <g
                                transform={`translate(${rulerPos.x}, ${rulerPos.y}) rotate(${rulerPos.angle})`}
                                onMouseDown={(e) => { 
                                    e.stopPropagation(); 
                                    setIsDraggingRuler(true); 
                                    setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
                                }}
                                className="cursor-move group"
                            >
                                {/* Ruler Body */}
                                <rect
                                    width={RULER_WIDTH}
                                    height={RULER_HEIGHT}
                                    fill="rgba(254, 243, 199, 0.9)"
                                    stroke="#d97706"
                                    strokeWidth="1"
                                    filter="url(#shadow)"
                                />
                                
                                {/* Ticks */}
                                {Array.from({ length: 41 }).map((_, i) => (
                                    <line
                                        key={i}
                                        x1={i * 10}
                                        y1="0"
                                        x2={i * 10}
                                        y2={i % 10 === 0 ? RULER_HEIGHT / 2 : (i % 5 === 0 ? RULER_HEIGHT * 0.3 : RULER_HEIGHT * 0.15)}
                                        stroke="#1e293b"
                                        strokeWidth="1"
                                    />
                                ))}

                                {/* Rotate Handles */}
                                <rect
                                    x="-20" y="0" width="20" height={RULER_HEIGHT}
                                    fill="transparent"
                                    className="cursor-ew-resize hover:fill-blue-500/10"
                                    onMouseDown={(e) => { 
                                        e.stopPropagation(); 
                                        setIsRotatingRuler('left'); 
                                        setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
                                    }}
                                />
                                <rect
                                    x={RULER_WIDTH} y="0" width="20" height={RULER_HEIGHT}
                                    fill="transparent"
                                    className="cursor-ew-resize hover:fill-blue-500/10"
                                    onMouseDown={(e) => { 
                                        e.stopPropagation(); 
                                        setIsRotatingRuler('right'); 
                                        setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
                                    }}
                                />
                            </g>
                        )}

                        {/* Compass Tool */}
                        {showCompass && (
                            <g transform={`translate(${compassPos.x}, ${compassPos.y}) rotate(${compassPos.angle})`}>
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
                                    <linearGradient id="compass-metal" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#94a3b8" />
                                        <stop offset="50%" stopColor="#cbd5e1" />
                                        <stop offset="100%" stopColor="#94a3b8" />
                                    </linearGradient>
                                </defs>

                                {/* Needle Leg (Left) - Smooth Curve */}
                                <g filter="url(#shadow)">
                                    <path
                                        d={`M 0 0 C 0 -60 -15 -130 0 -170`}
                                        stroke="url(#compass-metal)"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                    <path d="M 0 0 L -2 15 L 0 20 L 2 15 Z" fill="#475569" /> {/* Needle point */}
                                    <circle cx="0" cy="0" r="10" fill="transparent" className="pointer-events-auto cursor-move"
                                        onMouseDown={(e) => { 
                                            e.stopPropagation(); 
                                            setIsDraggingCompass('needle'); 
                                            setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
                                        }}
                                    />
                                </g>

                                {/* Pencil Leg (Right) - Smooth Curve */}
                                <g filter="url(#shadow)">
                                    <path
                                        d={`M ${compassPos.radius} 0 C ${compassPos.radius} -60 ${compassPos.radius/2 + 5} -130 0 -170`}
                                        stroke="url(#compass-metal)"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        fill="none"
                                    />
                                    {/* Pencil Holder */}
                                    <rect x={compassPos.radius - 8} y="-10" width="16" height="25" rx="4" fill="#64748b" />
                                    {/* Pencil Tip */}
                                    {isPencilDown && (
                                        <path
                                            d={`M ${compassPos.radius - 4} 15 L ${compassPos.radius + 4} 15 L ${compassPos.radius} 25 Z`}
                                            fill="#3b82f6"
                                        />
                                    )}
                                    {/* Radius Adjustment Handle */}
                                    <circle
                                        cx={compassPos.radius}
                                        cy="0"
                                        r="12"
                                        fill="rgba(59, 130, 246, 0.2)"
                                        className="pointer-events-auto cursor-nwse-resize hover:fill-blue-500/40"
                                        onMouseDown={(e) => {
                                            e.stopPropagation();
                                            setIsDraggingCompass('pencil');
                                            setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
                                        }}
                                    />
                                </g>

                                {/* Top Handle / Pivot */}
                                <g
                                    className="pointer-events-auto cursor-grab active:cursor-grabbing"
                                    onMouseDown={(e) => {
                                        e.stopPropagation();
                                        const pos = getSVGPoint(e.clientX, e.clientY);
                                        const dx = pos.x - compassPos.x;
                                        const dy = pos.y - compassPos.y;
                                        setDragStartAngle(Math.atan2(dy, dx) * 180 / Math.PI);
                                        setInitialCompassAngle(compassPos.angle);
                                        setIsDraggingCompass('handle');
                                        if (isPencilDown) {
                                            setIsDrawing(true);
                                            setStartAngle(compassPos.angle);
                                        }
                                    }}
                                >
                                    <circle cx="0" cy="-170" r="14" fill="#475569" />
                                    <rect x="-5" y="-210" width="10" height="40" rx="5" fill="url(#compass-metal)" stroke="#475569" strokeWidth="1" />
                                    <circle cx="0" cy="-170" r="4" fill="#94a3b8" />
                                </g>

                                {/* Pencil Toggle Button - Fixed near compass using foreignObject */}
                                <foreignObject x={compassPos.radius + 20} y="-20" width="40" height="40" className="pointer-events-auto">
                                    <div className="flex items-center justify-center w-full h-full">
                                        <Button
                                            variant={isPencilDown ? "default" : "outline"}
                                            size="icon"
                                            className={cn("w-8 h-8 rounded-full shadow-md transition-all p-0", isPencilDown ? "bg-blue-500" : "bg-white")}
                                            onClick={(e) => { e.stopPropagation(); setIsPencilDown(!isPencilDown); }}
                                            title={isPencilDown ? "Felemelés" : "Letétel"}
                                        >
                                            <PenTool className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </foreignObject>

                                {/* Active Arc Preview while drawing */}
                                {isDrawing && isDraggingCompass === 'handle' && isPencilDown && (
                                    <g>
                                        {/* Start point marker */}
                                        <circle
                                            cx={compassPos.radius * Math.cos((startAngle - compassPos.angle) * Math.PI / 180)}
                                            cy={compassPos.radius * Math.sin((startAngle - compassPos.angle) * Math.PI / 180)}
                                            r="4"
                                            fill="#3b82f6"
                                            opacity="0.5"
                                        />
                                        {Math.abs(compassPos.angle - startAngle) >= 355 ? (
                                            <circle cx="0" cy="0" r={compassPos.radius} stroke="#3b82f6" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                                        ) : (
                                            <path
                                                d={(() => {
                                                    const diff = startAngle - compassPos.angle;
                                                    const startRad = diff * Math.PI / 180;
                                                    const x1 = compassPos.radius * Math.cos(startRad);
                                                    const y1 = compassPos.radius * Math.sin(startRad);
                                                    const largeArc = Math.abs(diff) > 180 ? 1 : 0;
                                                    const sweep = diff < 0 ? 1 : 0;

                                                    return `M ${x1} ${y1} A ${compassPos.radius} ${compassPos.radius} 0 ${largeArc} ${sweep} ${compassPos.radius} 0`;
                                                })()}
                                                stroke="#3b82f6"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeDasharray="4 4"
                                            />
                                        )}
                                    </g>
                                )}
                            </g>
                        )}
                        {/* Protractor Tool */}
                        {showProtractor && (
                            <g
                                transform={`translate(${protractorPos.x}, ${protractorPos.y}) rotate(${protractorPos.angle})`}
                                onMouseDown={(e) => { 
                                    e.stopPropagation(); 
                                    setIsDraggingProtractor(true); 
                                    setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
                                }}
                                className="cursor-move"
                            >
                                {/* Semi-circle body */}
                                <path
                                    d="M -140 0 A 140 140 0 0 1 140 0 L 0 0 Z"
                                    fill="rgba(191, 219, 254, 0.4)"
                                    stroke="#3b82f6"
                                    strokeWidth="2"
                                    filter="url(#shadow)"
                                />
                                {/* Center mark */}
                                <line x1="0" y1="-5" x2="0" y2="5" stroke="#3b82f6" strokeWidth="2" />
                                <line x1="-5" y1="0" x2="5" y2="0" stroke="#3b82f6" strokeWidth="2" />

                                {/* Ticks */}
                                {Array.from({ length: 181 }).map((_, i) => {
                                    const rad = (i) * Math.PI / 180;
                                    const r1 = 140;
                                    const r2 = i % 10 === 0 ? 120 : (i % 5 === 0 ? 130 : 135);

                                    const x1 = r1 * Math.cos(-rad);
                                    const y1 = r1 * Math.sin(-rad);
                                    const x2 = r2 * Math.cos(-rad);
                                    const y2 = r2 * Math.sin(-rad);

                                    return (
                                        <g key={i}>
                                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e40af" strokeWidth={i % 10 === 0 ? 1.5 : 1} />
                                            {i % 10 === 0 && (
                                                <text
                                                    x={105 * Math.cos(-rad)}
                                                    y={105 * Math.sin(-rad)}
                                                    fill="#1e40af"
                                                    fontSize="10"
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    transform={`rotate(${90 - i}, ${105 * Math.cos(-rad)}, ${105 * Math.sin(-rad)})`}
                                                    className="font-bold select-none pointer-events-none"
                                                >
                                                    {i}
                                                </text>
                                            )}
                                        </g>
                                    );
                                })}

                                {/* Rotation handles */}
                                <circle cx="-130" cy="10" r="15" fill="transparent" className="cursor-alias hover:fill-blue-500/10"
                                    onMouseDown={(e) => { 
                                        e.stopPropagation(); 
                                        setIsRotatingProtractor(true); 
                                        setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
                                    }}
                                />
                                <circle cx="130" cy="10" r="15" fill="transparent" className="cursor-alias hover:fill-blue-500/10"
                                    onMouseDown={(e) => { 
                                        e.stopPropagation(); 
                                        setIsRotatingProtractor(true); 
                                        setLastSVGPos(getSVGPoint(e.clientX, e.clientY));
                                    }}
                                />
                            </g>
                        )}
                    </svg>
                </div>
            </div>
        </div>
    );
}

