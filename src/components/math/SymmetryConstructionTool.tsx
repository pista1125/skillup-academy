import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    RotateCcw,
    Trash2,
    MousePointer2,
    Pencil,
    Move,
    Eraser,
    Undo2,
    Plus,
    Square,
    Triangle as TriangleIcon,
    Circle as CircleIcon,
    Grid3X3,
    Hash,
    Maximize,
    Minimize,
    Type,
    Hexagon,
    Copy,
    Repeat,
    Crosshair,
    Settings,
    ZoomIn,
    ZoomOut,
    RefreshCw,
    ChevronDown,
    X,
    Dot,
    Minus,
    Shapes as ShapesIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---

type Point = {
    id: string;
    x: number;
    y: number;
    label?: string;
};

type GeometryType = 'point' | 'line' | 'polygon' | 'regular-polygon';

type GeometryObject = {
    id: string;
    type: GeometryType;
    pointIds: string[];
    color: string;
    isReflection: boolean;
    reflectionSourceId?: string;
    reflectionType?: 'axial' | 'central';
    reflectionRefId?: string; // ID of the axis line or center point
    sides?: number; // For regular polygons
};

type Tool = 'select' | 'point' | 'line' | 'polygon' | 'regular-polygon' | 'axial-reflect' | 'central-reflect' | 'eraser' | 'pan';

type BackgroundType = 'blank' | 'grid' | 'coordinate';

interface SymmetryConstructionToolProps {
    onBack: () => void;
}

const GRID_SIZE = 40;

export function SymmetryConstructionTool({ onBack }: SymmetryConstructionToolProps) {
    // --- State ---
    const [points, setPoints] = useState<Record<string, Point>>({});
    const [objects, setObjects] = useState<Record<string, GeometryObject>>({});
    const [activeTool, setActiveTool] = useState<Tool>('select');
    const [background, setBackground] = useState<BackgroundType>('grid');
    const [selection, setSelection] = useState<string[]>([]);
    const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
    const [draggedPointId, setDraggedPointId] = useState<string | null>(null);
    const [reflectingObjectId, setReflectingObjectId] = useState<string | null>(null);
    const [regularPolygonSides, setRegularPolygonSides] = useState(6);

    // View State (Pan & Zoom)
    const [viewBox, setViewBox] = useState({ x: -600, y: -400, width: 1200, height: 800 });
    const [isPanning, setIsPanning] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });

    const svgRef = useRef<SVGSVGElement>(null);

    // --- Coordinate Transformation ---

    const getSVGPoint = useCallback((clientX: number, clientY: number) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const transformed = pt.matrixTransform(svg.getScreenCTM()?.inverse());

        let x = transformed.x;
        let y = transformed.y;

        // Snapping if not blank and not pan/select
        if (background !== 'blank' && activeTool !== 'select' && activeTool !== 'pan') {
            x = Math.round(x / (GRID_SIZE / 2)) * (GRID_SIZE / 2);
            y = Math.round(y / (GRID_SIZE / 2)) * (GRID_SIZE / 2);
        }

        return { x, y };
    }, [background, activeTool]);

    // --- Reflection Logic ---

    const reflectPointCentral = (p: { x: number, y: number }, center: { x: number, y: number }): { x: number, y: number } => {
        return {
            x: 2 * center.x - p.x,
            y: 2 * center.y - p.y
        };
    };

    const reflectPointAxial = (p: { x: number, y: number }, p1: { x: number, y: number }, p2: { x: number, y: number }): { x: number, y: number } => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        if (dx === 0 && dy === 0) return { x: p.x, y: p.y };

        const A = dy;
        const B = -dx;
        const C = -(A * p1.x + B * p1.y);

        const denom = A * A + B * B;
        const reflectedX = p.x - 2 * A * (A * p.x + B * p.y + C) / denom;
        const reflectedY = p.y - 2 * B * (A * p.x + B * p.y + C) / denom;

        return { x: reflectedX, y: reflectedY };
    };

    // --- Derived State (Points & Objects) ---

    const calculateRegularPolygonPoints = (p1: { x: number, y: number }, p2: { x: number, y: number }, sides: number) => {
        const center = p1;
        const vertex = p2;
        const dx = vertex.x - center.x;
        const dy = vertex.y - center.y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        const startAngle = Math.atan2(dy, dx);

        const vertices: { x: number, y: number }[] = [];
        for (let i = 0; i < sides; i++) {
            const angle = startAngle + i * (2 * Math.PI / sides);
            vertices.push({
                x: center.x + radius * Math.cos(angle),
                y: center.y + radius * Math.sin(angle)
            });
        }
        return vertices;
    };

    const allPoints = useMemo(() => {
        const result: Record<string, { x: number, y: number }> = { ...points };

        // Sequential pass to handle dependencies (reflections of reflections)
        // Note: For deep nesting, this logic might need a topological sort, but simple pass works for most cases
        Object.values(objects).forEach(obj => {
            if (obj.isReflection && obj.reflectionSourceId && obj.reflectionRefId) {
                const sourceObj = objects[obj.reflectionSourceId];
                if (!sourceObj) return;

                if (obj.reflectionType === 'central') {
                    const centerPoint = points[obj.reflectionRefId] || result[obj.reflectionRefId];
                    if (!centerPoint) return;

                    sourceObj.pointIds.forEach((pId, idx) => {
                        const p = points[pId] || result[pId];
                        if (!p) return;
                        result[obj.pointIds[idx]] = reflectPointCentral(p, centerPoint);
                    });
                } else if (obj.reflectionType === 'axial') {
                    const axisLine = objects[obj.reflectionRefId];
                    if (!axisLine || axisLine.pointIds.length < 2) return;

                    const p1 = points[axisLine.pointIds[0]] || result[axisLine.pointIds[0]];
                    const p2 = points[axisLine.pointIds[1]] || result[axisLine.pointIds[1]];
                    if (!p1 || !p2) return;

                    sourceObj.pointIds.forEach((pId, idx) => {
                        const p = points[pId] || result[pId];
                        if (!p) return;
                        result[obj.pointIds[idx]] = reflectPointAxial(p, p1, p2);
                    });
                }
            } else if (obj.type === 'regular-polygon' && !obj.isReflection) {
                const p1 = points[obj.pointIds[0]];
                const p2 = points[obj.pointIds[1]];
                if (p1 && p2) {
                    const vertices = calculateRegularPolygonPoints(p1, p2, obj.sides || regularPolygonSides);
                    vertices.forEach((v, idx) => {
                        if (idx >= 2) result[obj.pointIds[idx]] = v;
                    });
                }
            }
        });

        return result;
    }, [points, objects, regularPolygonSides]);

    // --- Interaction Handlers ---

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (draggedPointId || isPanning) return;
        if (activeTool === 'select' || activeTool === 'pan') {
            setSelection([]);
            setReflectingObjectId(null);
            return;
        }

        const pos = getSVGPoint(e.clientX, e.clientY);
        const tolerance = 15 * (viewBox.width / 1200);

        // Find existing point
        const existingPoint = Object.values(points).find(p =>
            Math.sqrt(Math.pow(p.x - pos.x, 2) + Math.pow(p.y - pos.y, 2)) < tolerance
        );

        let clickedPointId = existingPoint?.id;

        // Create point if needed
        if (!clickedPointId && activeTool !== 'select' && activeTool !== 'axial-reflect' && activeTool !== 'central-reflect' && activeTool !== 'eraser') {
            const newId = `p-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            setPoints(prev => ({
                ...prev,
                [newId]: { id: newId, x: pos.x, y: pos.y }
            }));
            clickedPointId = newId;
        }

        if (!clickedPointId) return;

        // Tool Logic
        if (activeTool === 'point') {
            const id = `obj-${Date.now()}`;
            setObjects(prev => ({
                ...prev,
                [id]: { id, type: 'point', pointIds: [clickedPointId!], color: 'blue', isReflection: false }
            }));
        } else if (activeTool === 'line') {
            if (selection.length === 0) {
                setSelection([clickedPointId]);
            } else if (selection[0] !== clickedPointId) {
                const id = `obj-${Date.now()}`;
                setObjects(prev => ({
                    ...prev,
                    [id]: { id, type: 'line', pointIds: [selection[0], clickedPointId!], color: 'black', isReflection: false }
                }));
                setSelection([]);
            }
        } else if (activeTool === 'polygon') {
            if (selection.length >= 3 && clickedPointId === selection[0]) {
                const id = `obj-${Date.now()}`;
                setObjects(prev => ({
                    ...prev,
                    [id]: { id, type: 'polygon', pointIds: [...selection], color: 'blue', isReflection: false }
                }));
                setSelection([]);
            } else {
                setSelection(prev => [...prev, clickedPointId!]);
            }
        } else if (activeTool === 'regular-polygon') {
            if (selection.length === 0) {
                setSelection([clickedPointId]);
            } else if (selection[0] !== clickedPointId) {
                const id = `obj-${Date.now()}`;
                const sides = regularPolygonSides;
                const vertexIds: string[] = [selection[0], clickedPointId!];
                for (let i = 2; i < sides; i++) {
                    vertexIds.push(`p-reg-${id}-${i}`);
                }
                setObjects(prev => ({
                    ...prev,
                    [id]: { id, type: 'regular-polygon', pointIds: vertexIds, color: 'blue', isReflection: false, sides }
                }));
                setSelection([]);
            }
        }
    };

    const handleObjectClick = (objId: string) => {
        if (isPanning) return;

        if (activeTool === 'axial-reflect') {
            if (!reflectingObjectId) {
                setReflectingObjectId(objId);
            } else {
                const axisObj = objects[objId];
                if (axisObj?.type === 'line') {
                    const id = `refl-a-${Date.now()}`;
                    const sourceObj = objects[reflectingObjectId];
                    const pointIds = sourceObj.pointIds.map((_, i) => `p-refla-${id}-${i}`);
                    setObjects(prev => ({
                        ...prev,
                        [id]: {
                            id, type: sourceObj.type, pointIds, color: 'green', isReflection: true,
                            reflectionSourceId: reflectingObjectId!, reflectionType: 'axial', reflectionRefId: objId
                        }
                    }));
                    setReflectingObjectId(null);
                    setSelection([]);
                }
            }
        } else if (activeTool === 'central-reflect') {
            if (!reflectingObjectId) {
                setReflectingObjectId(objId);
            } else {
                const targetObj = objects[objId];
                if (targetObj?.type === 'point') {
                    const id = `refl-c-${Date.now()}`;
                    const sourceObj = objects[reflectingObjectId];
                    const pointIds = sourceObj.pointIds.map((_, i) => `p-reflc-${id}-${i}`);
                    setObjects(prev => ({
                        ...prev,
                        [id]: {
                            id, type: sourceObj.type, pointIds, color: 'green', isReflection: true,
                            reflectionSourceId: reflectingObjectId!, reflectionType: 'central', reflectionRefId: targetObj.pointIds[0]
                        }
                    }));
                    setReflectingObjectId(null);
                }
            }
        } else if (activeTool === 'eraser') {
            setObjects(prev => {
                const next = { ...prev };
                delete next[objId];
                // Cascade delete
                Object.keys(next).forEach(k => {
                    if (next[k].reflectionSourceId === objId || next[k].reflectionRefId === objId) delete next[k];
                });
                return next;
            });
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (activeTool === 'pan' || e.button === 1 || (activeTool === 'select' && !hoveredPointId)) {
            setIsPanning(true);
            setLastMousePos({ x: e.clientX, y: e.clientY });
            return;
        }
        if (activeTool === 'select' && hoveredPointId) {
            setDraggedPointId(hoveredPointId);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning) {
            const dx = (e.clientX - lastMousePos.x) * (viewBox.width / svgRef.current!.clientWidth);
            const dy = (e.clientY - lastMousePos.y) * (viewBox.height / svgRef.current!.clientHeight);
            setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
            setLastMousePos({ x: e.clientX, y: e.clientY });
            return;
        }

        const pos = getSVGPoint(e.clientX, e.clientY);
        if (draggedPointId) {
            setPoints(prev => ({
                ...prev,
                [draggedPointId]: { ...prev[draggedPointId], x: pos.x, y: pos.y }
            }));
        } else {
            const tolerance = 15 * (viewBox.width / 1200);
            const p = Object.values(points).find(pt =>
                Math.sqrt(Math.pow(pt.x - pos.x, 2) + Math.pow(pt.y - pos.y, 2)) < tolerance
            );
            setHoveredPointId(p?.id || null);
        }
    };

    const handleMouseUp = () => {
        setDraggedPointId(null);
        setIsPanning(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        const factor = e.deltaY > 0 ? 1.1 : 0.9;
        const rect = svgRef.current!.getBoundingClientRect();
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

    // --- Rendering ---

    const renderGrid = () => {
        if (background === 'blank') return null;
        const lines = [];
        const startX = Math.floor(viewBox.x / GRID_SIZE) * GRID_SIZE;
        const endX = Math.ceil((viewBox.x + viewBox.width) / GRID_SIZE) * GRID_SIZE;
        const startY = Math.floor(viewBox.y / GRID_SIZE) * GRID_SIZE;
        const endY = Math.ceil((viewBox.y + viewBox.height) / GRID_SIZE) * GRID_SIZE;

        for (let x = startX; x <= endX; x += GRID_SIZE) {
            lines.push(<line key={`v-${x}`} x1={x} y1={startY} x2={x} y2={endY} stroke="#f1f5f9" strokeWidth={1 * (viewBox.width / 1200)} />);
        }
        for (let y = startY; y <= endY; y += GRID_SIZE) {
            lines.push(<line key={`h-${y}`} x1={startX} y1={y} x2={endX} y2={y} stroke="#f1f5f9" strokeWidth={1 * (viewBox.width / 1200)} />);
        }

        if (background === 'coordinate') {
            lines.push(<line key="ax" x1={startX} y1={0} x2={endX} y2={0} stroke="#cbd5e1" strokeWidth={2 * (viewBox.width / 1200)} />);
            lines.push(<line key="ay" x1={0} y1={startY} x2={0} y2={endY} stroke="#cbd5e1" strokeWidth={2 * (viewBox.width / 1200)} />);
            const step = GRID_SIZE * (viewBox.width > 2000 ? 5 : 1);
            for (let x = startX; x <= endX; x += step) {
                if (x !== 0) lines.push(<text key={`tx-${x}`} x={x} y={15 * (viewBox.width / 1200)} fontSize={12 * (viewBox.width / 1200)} fill="#94a3b8" textAnchor="middle">{x / GRID_SIZE}</text>);
            }
            for (let y = startY; y <= endY; y += step) {
                if (y !== 0) lines.push(<text key={`ty-${y}`} x={-15 * (viewBox.width / 1200)} y={y + 5} fontSize={12 * (viewBox.width / 1200)} fill="#94a3b8" textAnchor="end">{-y / GRID_SIZE}</text>);
            }
        }
        return lines;
    };

    const renderObject = (obj: GeometryObject) => {
        const pts = obj.pointIds.map(id => allPoints[id]).filter(Boolean);
        if (pts.length === 0) return null;
        const isReflecting = reflectingObjectId === obj.id;
        const sw = 3 * (viewBox.width / 1200);

        const props = {
            key: obj.id,
            onClick: (e: React.MouseEvent) => { e.stopPropagation(); handleObjectClick(obj.id); },
            className: cn("cursor-pointer transition-all", isReflecting ? "stroke-yellow-400 stroke-[6]" : "", activeTool === 'eraser' ? "hover:opacity-50" : "")
        };

        switch (obj.type) {
            case 'point': return <circle {...props} cx={pts[0].x} cy={pts[0].y} r={6 * (viewBox.width / 1200)} fill={obj.color} stroke="white" strokeWidth={1} />;
            case 'line':
                if (pts.length < 2) return null;
                const dx = pts[1].x - pts[0].x, dy = pts[1].y - pts[0].y;
                const len = Math.sqrt(dx * dx + dy * dy);
                const ux = dx / len, uy = dy / len;
                return <line {...props} x1={pts[0].x - ux * 10000} y1={pts[0].y - uy * 10000} x2={pts[0].x + ux * 10000} y2={pts[0].y + uy * 10000} stroke={obj.color} strokeWidth={sw} />;
            case 'polygon':
            case 'regular-polygon':
                if (pts.length < 3) return null;
                const d = `M ${pts.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;
                return <path {...props} d={d} fill={obj.color} fillOpacity={0.15} stroke={obj.color} strokeWidth={sw} strokeLinejoin="round" />;
        }
    };

    return (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
            {/* Minimal Exit Button */}
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-[70] bg-white/50 hover:bg-white shadow-md rounded-full" onClick={onBack}>
                <X className="w-5 h-5" />
            </Button>

            {/* Float Toolbar (Central Top) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-2xl overflow-x-auto max-w-[90vw]">
                <Button variant={activeTool === 'select' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTool('select')} className="rounded-xl px-4">
                    <MousePointer2 className="w-4 h-4 mr-2 text-blue-500" /> Mozgatás
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={(activeTool === 'point' || activeTool === 'line') ? 'secondary' : 'ghost'} size="sm" className="rounded-xl px-4">
                            <Dot className="w-4 h-4 mr-2" /> Pontok <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => { setActiveTool('point'); setSelection([]); }}>
                            <Dot className="w-4 h-4 mr-2 text-blue-500" /> Pont lehelyezése
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveTool('line'); setSelection([]); }}>
                            <Minus className="w-4 h-4 mr-2 text-slate-700" /> Egyenes rajzolása
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={(activeTool === 'polygon' || activeTool === 'regular-polygon') ? 'secondary' : 'ghost'} size="sm" className="rounded-xl px-4">
                            <ShapesIcon className="w-4 h-4 mr-2" /> Alakzatok <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => { setActiveTool('polygon'); setSelection([]); }}>
                            <Square className="w-4 h-4 mr-2 text-indigo-500" /> Szabad sokszög
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveTool('regular-polygon'); setSelection([]); }} className="flex gap-2 items-center">
                            <Hexagon className="w-4 h-4 mr-2 text-indigo-500" /> Szabályos sokszög
                            <input type="number" min="3" max="20" value={regularPolygonSides} onClick={e => e.stopPropagation()} onChange={e => setRegularPolygonSides(Number(e.target.value))} className="w-10 h-7 border rounded text-center text-xs ml-auto" />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={(activeTool === 'axial-reflect' || activeTool === 'central-reflect') ? 'secondary' : 'ghost'} size="sm" className="rounded-xl px-4 text-green-700">
                            <Copy className="w-4 h-4 mr-2" /> Tükrözés <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem onClick={() => { setActiveTool('axial-reflect'); setSelection([]); }}>
                            <Copy className="w-4 h-4 mr-2 text-green-600" /> Tengelyes tükrözés
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveTool('central-reflect'); setSelection([]); }}>
                            <Crosshair className="w-4 h-4 mr-2 text-green-600" /> Középpontos tükrözés
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-6 w-px bg-slate-200 mx-1" />

                <Button variant={activeTool === 'eraser' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTool('eraser')} className={cn("rounded-xl px-4", activeTool === 'eraser' ? "bg-red-500 hover:bg-red-600" : "text-red-500 hover:bg-red-50")}>
                    <Eraser className="w-4 h-4 mr-2" /> Radír
                </Button>
                <Button variant="ghost" size="sm" onClick={() => { setPoints({}); setObjects({}); setSelection([]); }} className="rounded-xl px-4 text-slate-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" /> Összes törlése
                </Button>
            </div>

            {/* Canvas */}
            <div className="flex-1 w-full relative group">
                <svg
                    ref={svgRef}
                    className={cn("w-full h-full bg-white", activeTool === 'pan' || isPanning ? "cursor-grabbing" : "cursor-crosshair")}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onClick={handleCanvasClick}
                    onWheel={handleWheel}
                    viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                    preserveAspectRatio="xMidYMid slice"
                >
                    {renderGrid()}
                    {Object.values(objects).map(renderObject)}
                    {Object.values(points).map(p => (
                        <circle
                            key={p.id} cx={p.x} cy={p.y}
                            r={(hoveredPointId === p.id || draggedPointId === p.id ? 8 : 5) * (viewBox.width / 1200)}
                            fill={draggedPointId === p.id ? "#3b82f6" : "#1e40af"}
                            className="pointer-events-none"
                        />
                    ))}
                    {/* Visual aid for polygon construction */}
                    {activeTool === 'polygon' && selection.length > 0 && (
                        <g className="pointer-events-none opacity-50">
                            {selection.map((pId, idx) => idx > 0 && (
                                <line key={idx} x1={allPoints[selection[idx - 1]].x} y1={allPoints[selection[idx - 1]].y} x2={allPoints[pId].x} y2={allPoints[pId].y} stroke="blue" strokeWidth={2} />
                            ))}
                            <circle cx={allPoints[selection[0]].x} cy={allPoints[selection[0]].y} r={10 * (viewBox.width / 1200)} fill="none" stroke="blue" strokeDasharray="4 2" />
                        </g>
                    )}
                </svg>

                {/* Corner Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-[70]">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm" className="shadow-lg rounded-xl opacity-80 hover:opacity-100">
                                <Settings className="w-4 h-4 mr-2" /> Háttér
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setBackground('blank')}>Üres</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setBackground('grid')}>Négyzetrács</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setBackground('coordinate')}>Koordinátarendszer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="secondary" size="icon" onClick={() => setViewBox({ x: -600, y: -400, width: 1200, height: 800 })} className="shadow-lg rounded-xl opacity-80 hover:opacity-100">
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                </div>

                <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-[70]">
                    <Button variant="secondary" size="icon" onClick={() => handleWheel({ deltaY: -500, clientX: 0, clientY: 0 } as any)} className="shadow-lg rounded-xl opacity-80 hover:opacity-100">
                        <ZoomIn className="w-5 h-5" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={() => handleWheel({ deltaY: 500, clientX: 0, clientY: 0 } as any)} className="shadow-lg rounded-xl opacity-80 hover:opacity-100">
                        <ZoomOut className="w-5 h-5" />
                    </Button>
                </div>

                {/* Status Help */}
                <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-slate-200 shadow-md pointer-events-none text-xs text-slate-600 z-[70]">
                    {activeTool === 'select' && "Mozgasd a pontokat."}
                    {activeTool === 'polygon' && selection.length > 0 && "Kattints az első körre a bezáráshoz."}
                    {activeTool === 'axial-reflect' && (!reflectingObjectId ? "Válassz tükrözendő alakzatot." : "Válassz egy egyenest tengelynek.")}
                    {selection.length > 0 && `Kiválasztva: ${selection.length} pont`}
                </div>
            </div>
        </div>
    );
}
