import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    RotateCcw,
    Trash2,
    MousePointer2,
    Square,
    Calculator,
    LayoutGrid,
    Move,
    Maximize,
    Minimize,
    Settings,
    ZoomIn,
    ZoomOut,
    Eye,
    EyeOff,
    Plus,
    ChevronDown,
    Layers,
    Grid3X3,
    Hash,
    MousePointerClick,
    Eraser,
    X,
    Sparkles,
    Check,
    Scaling,
    Ruler
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

// --- Types ---

type Point = {
    id: string;
    x: number;
    y: number;
};

type Unit = 'cm' | 'dm' | 'm' | 'km';

type ShapeType = 'rectangle' | 'polygon' | 'unit-square';

interface Shape {
    id: string;
    type: ShapeType;
    pointIds: string[];
    dimensions?: { width: number, height: number };
    color: string;
    unit: Unit;
    showMeasurements: boolean;
}

type Tool = 'select' | 'rectangle' | 'polygon' | 'unit-square' | 'eraser' | 'pan' | 'auto-fill';

type BackgroundType = 'blank' | 'grid' | 'dots';

interface PerimeterAreaToolProps {
    onBack: () => void;
}

const GRID_SIZE = 40;

const UNIT_LABELS: Record<Unit, string> = {
    cm: 'cm',
    dm: 'dm',
    m: 'm',
    km: 'km'
};

const UNIT_HIERARCHY: Record<Unit, number> = {
    cm: 1,
    dm: 10,
    m: 100,
    km: 100000
};

const UNIT_COLORS: Record<Unit, string> = {
    cm: '#3b82f6', // blue
    dm: '#10b981', // emerald
    m: '#f59e0b', // amber
    km: '#ef4444'  // red
};

const COLORS = [
    '#3b82f6', // blue
    '#ef4444', // red
    '#10b981', // emerald
    '#f59e0b', // amber
    '#8b5cf6', // violet
    '#ec4899', // pink
];

export function PerimeterAreaTool({ onBack }: PerimeterAreaToolProps) {
    // --- State ---
    const [points, setPoints] = useState<Record<string, Point>>({});
    const [shapes, setShapes] = useState<Shape[]>([]);
    const [activeTool, setActiveTool] = useState<Tool>('select');
    const [activeUnit, setActiveUnit] = useState<Unit>('cm');
    const [fillerUnit, setFillerUnit] = useState<Unit>('cm');
    const [background, setBackground] = useState<BackgroundType>('grid');
    const [showAllMeasurements, setShowAllMeasurements] = useState(true);
    const [showSummary, setShowSummary] = useState(true);
    const [selection, setSelection] = useState<string[]>([]);
    const [isFilling, setIsFilling] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    // Custom Shape Modal State
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [customWidth, setCustomWidth] = useState(4);
    const [customHeight, setCustomHeight] = useState(3);

    // View State (Pan & Zoom)
    const [viewBox, setViewBox] = useState({ x: -600, y: -400, width: 1200, height: 800 });
    const [isPanning, setIsPanning] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
    const [hoveredShapeId, setHoveredShapeId] = useState<string | null>(null);
    const [draggedPointId, setDraggedPointId] = useState<string | null>(null);
    const [draggedShapeId, setDraggedShapeId] = useState<string | null>(null);
    const [initialDragOffset, setInitialDragOffset] = useState<{ x: number, y: number } | null>(null);
    const [initialPointPositions, setInitialPointPositions] = useState<Record<string, Point>>({});

    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Dynamic ViewBox sizing ---
    useEffect(() => {
        const updateViewBoxSize = () => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            setViewBox(prev => {
                const aspectRatio = clientWidth / clientHeight;
                return {
                    ...prev,
                    width: prev.width,
                    height: prev.width / aspectRatio
                };
            });
        };

        window.addEventListener('resize', updateViewBoxSize);
        updateViewBoxSize();
        return () => window.removeEventListener('resize', updateViewBoxSize);
    }, []);

    // --- Browser Zoom Prevention ---
    useEffect(() => {
        const preventZoom = (e: WheelEvent | KeyboardEvent) => {
            if (e instanceof WheelEvent) {
                if (e.ctrlKey) e.preventDefault();
            } else if (e instanceof KeyboardEvent) {
                if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '0' || e.key === '+')) e.preventDefault();
            }
        };
        window.addEventListener('wheel', preventZoom as EventListener, { passive: false });
        window.addEventListener('keydown', preventZoom as EventListener);
        return () => {
            window.removeEventListener('wheel', preventZoom as EventListener);
            window.removeEventListener('keydown', preventZoom as EventListener);
        };
    }, []);

    // --- Hit Detection Helpers ---

    const isPointInPolygon = (x: number, y: number, polygonPoints: Point[]) => {
        let inside = false;
        for (let i = 0, j = polygonPoints.length - 1; i < polygonPoints.length; j = i++) {
            const xi = polygonPoints[i].x, yi = polygonPoints[i].y;
            const xj = polygonPoints[j].x, yj = polygonPoints[j].y;
            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    const getSVGPoint = useCallback((clientX: number, clientY: number) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const svg = svgRef.current;
        const pt = svg.createSVGPoint();
        pt.x = clientX;
        pt.y = clientY;
        const transformed = pt.matrixTransform(svg.getScreenCTM()?.inverse());
        let x = transformed.x;
        let y = transformed.y;
        if (background !== 'blank' && activeTool !== 'select' && activeTool !== 'pan') {
            x = Math.round(x / GRID_SIZE) * GRID_SIZE;
            y = Math.round(y / GRID_SIZE) * GRID_SIZE;
        }
        return { x, y };
    }, [background, activeTool]);

    // --- Calculations ---

    const calculateDistance = (p1: Point, p2: Point) => {
        const dx = (p2.x - p1.x) / GRID_SIZE;
        const dy = (p2.y - p1.y) / GRID_SIZE;
        return Math.sqrt(dx * dx + dy * dy);
    };

    const calculatePolygonArea = (shapePoints: Point[]) => {
        let area = 0;
        for (let i = 0; i < shapePoints.length; i++) {
            const j = (i + 1) % shapePoints.length;
            area += shapePoints[i].x * shapePoints[j].y;
            area -= shapePoints[j].x * shapePoints[i].y;
        }
        return Math.abs(area) / (2 * GRID_SIZE * GRID_SIZE);
    };

    const calculatePolygonPerimeter = (shapePoints: Point[]) => {
        let perimeter = 0;
        for (let i = 0; i < shapePoints.length; i++) {
            const j = (i + 1) % shapePoints.length;
            perimeter += calculateDistance(shapePoints[i], shapePoints[j]);
        }
        return perimeter;
    };

    // --- Interaction Handlers ---

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (draggedPointId || draggedShapeId || isPanning) return;
        const pos = getSVGPoint(e.clientX, e.clientY);

        if (activeTool === 'auto-fill') {
            if (hoveredShapeId) animateFill(hoveredShapeId);
            return;
        }

        if (activeTool === 'select' || activeTool === 'pan') {
            if (!hoveredShapeId && !hoveredPointId) setSelection([]);
            return;
        }
        
        if (activeTool === 'eraser') {
            if (hoveredShapeId) deleteShape(hoveredShapeId);
            return;
        }

        if (activeTool === 'unit-square') {
            const scale = UNIT_HIERARCHY[activeUnit] / UNIT_HIERARCHY[fillerUnit];
            const size = GRID_SIZE / scale;
            
            const p1Id = `p-${Date.now()}-1`;
            const p2Id = `p-${Date.now()}-2`;
            const p3Id = `p-${Date.now()}-3`;
            const p4Id = `p-${Date.now()}-4`;
            
            setPoints(prev => ({
                ...prev,
                [p1Id]: { id: p1Id, x: pos.x, y: pos.y },
                [p2Id]: { id: p2Id, x: pos.x + size, y: pos.y },
                [p3Id]: { id: p3Id, x: pos.x + size, y: pos.y + size },
                [p4Id]: { id: p4Id, x: pos.x, y: pos.y + size }
            }));
            
            const newShape: Shape = {
                id: `shape-${Date.now()}`,
                type: 'unit-square',
                pointIds: [p1Id, p2Id, p3Id, p4Id],
                color: UNIT_COLORS[fillerUnit],
                unit: fillerUnit,
                showMeasurements: true
            };
            setShapes(prev => [...prev, newShape]);
            return;
        }

        if (activeTool === 'polygon') {
            if (selection.length >= 3) {
                const firstPoint = points[selection[0]];
                const dist = Math.sqrt(Math.pow(firstPoint.x - pos.x, 2) + Math.pow(firstPoint.y - pos.y, 2));
                if (dist < GRID_SIZE / 2) {
                    const newShape: Shape = {
                        id: `shape-${Date.now()}`,
                        type: 'polygon',
                        pointIds: [...selection],
                        color: COLORS[Math.floor(Math.random() * COLORS.length)],
                        unit: activeUnit,
                        showMeasurements: true
                    };
                    setShapes(prev => [...prev, newShape]);
                    setSelection([]);
                    return;
                }
            }
            const newPointId = `p-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            setPoints(prev => ({ ...prev, [newPointId]: { id: newPointId, x: pos.x, y: pos.y } }));
            setSelection(prev => [...prev, newPointId]);
        }
    };

    const dropPredefinedRectangle = (w: number, h: number) => {
        const startX = Math.round((viewBox.x + viewBox.width / 2) / GRID_SIZE) * GRID_SIZE;
        const startY = Math.round((viewBox.y + viewBox.height / 2) / GRID_SIZE) * GRID_SIZE;
        const pIds = [];
        const newPoints = { ...points };
        const coords = [{ x: startX, y: startY }, { x: startX + w * GRID_SIZE, y: startY }, { x: startX + w * GRID_SIZE, y: startY + h * GRID_SIZE }, { x: startX, y: startY + h * GRID_SIZE }];
        coords.forEach((c, i) => {
            const id = `p-rect-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 5)}`;
            newPoints[id] = { id, ...c };
            pIds.push(id);
        });
        const newShape: Shape = {
            id: `shape-rect-${Date.now()}`,
            type: 'rectangle',
            pointIds: pIds,
            dimensions: { width: w, height: h },
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            unit: activeUnit,
            showMeasurements: true
        };
        setPoints(newPoints);
        setShapes(prev => [...prev, newShape]);
    };

    const animateFill = async (shapeId: string) => {
        const shape = shapes.find(s => s.id === shapeId);
        if (!shape || shape.type !== 'rectangle') return;
        setIsFilling(true);
        const scale = UNIT_HIERARCHY[shape.unit] / UNIT_HIERARCHY[fillerUnit];
        const w = shape.dimensions!.width * scale;
        const h = shape.dimensions!.height * scale;
        const size = GRID_SIZE / scale;
        const startPoint = points[shape.pointIds[0]];
        const currentPoints = { ...points };
        
        // Adaptive speed: faster for more blocks
        const totalBlocks = w * h;
        const delay = totalBlocks > 100 ? (totalBlocks > 400 ? 5 : 15) : 30;

        for (let row = 0; row < h; row++) {
            for (let col = 0; col < w; col++) {
                const uid = `${Date.now()}-${row}-${col}`;
                const p1 = `p-f-${uid}-1`, p2 = `p-f-${uid}-2`, p3 = `p-f-${uid}-3`, p4 = `p-f-${uid}-4`;
                const x = startPoint.x + col * size, y = startPoint.y + row * size;
                currentPoints[p1] = { id: p1, x, y };
                currentPoints[p2] = { id: p2, x: x + size, y };
                currentPoints[p3] = { id: p3, x: x + size, y: y + size };
                currentPoints[p4] = { id: p4, x, y: y + size };
                const fillShape: Shape = {
                    id: `fill-${uid}`,
                    type: 'unit-square',
                    pointIds: [p1, p2, p3, p4],
                    color: UNIT_COLORS[fillerUnit],
                    unit: fillerUnit,
                    showMeasurements: false
                };
                setPoints({ ...currentPoints });
                setShapes(prev => [...prev, fillShape]);
                if (col % (Math.ceil(w/10)) === 0) await new Promise(r => setTimeout(r, delay));
            }
            // Add a small pause between rows for better visual rhythm
            await new Promise(r => setTimeout(r, delay * 2));
        }
        setIsFilling(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (activeTool === 'pan' || e.button === 1) {
            setIsPanning(true);
            setLastMousePos({ x: e.clientX, y: e.clientY });
            return;
        }
        if (activeTool === 'select') {
            if (hoveredPointId) setDraggedPointId(hoveredPointId);
            else if (hoveredShapeId) {
                setDraggedShapeId(hoveredShapeId);
                const s = shapes.find(sh => sh.id === hoveredShapeId);
                if (s) {
                    const fp = points[s.pointIds[0]];
                    const p = getSVGPoint(e.clientX, e.clientY);
                    setInitialDragOffset({ x: p.x - fp.x, y: p.y - fp.y });
                    const ip: Record<string, Point> = {};
                    s.pointIds.forEach(pid => { ip[pid] = { ...points[pid] }; });
                    setInitialPointPositions(ip);
                }
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const pos = getSVGPoint(e.clientX, e.clientY);
        setMousePos(pos);
        if (isPanning && svgRef.current) {
            const dx = (e.clientX - lastMousePos.x) * (viewBox.width / svgRef.current.clientWidth);
            const dy = (e.clientY - lastMousePos.y) * (viewBox.height / svgRef.current.clientHeight);
            setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
            setLastMousePos({ x: e.clientX, y: e.clientY });
            return;
        }
        if (draggedPointId) {
            setPoints(prev => ({ ...prev, [draggedPointId]: { ...prev[draggedPointId], x: pos.x, y: pos.y } }));
        } else if (draggedShapeId && initialDragOffset) {
            const s = shapes.find(sh => sh.id === draggedShapeId);
            if (s) {
                const fp = initialPointPositions[s.pointIds[0]];
                const dx = pos.x - initialDragOffset.x - fp.x, dy = pos.y - initialDragOffset.y - fp.y;
                setPoints(prev => {
                    const next = { ...prev };
                    s.pointIds.forEach(pid => { if (next[pid]) next[pid] = { ...next[pid], x: initialPointPositions[pid].x + dx, y: initialPointPositions[pid].y + dy }; });
                    return next;
                });
            }
        } else {
            const tol = 15 * (viewBox.width / 1200);
            const pId = Object.keys(points).find(id => {
                const p = points[id];
                return Math.sqrt(Math.pow(p.x - pos.x, 2) + Math.pow(p.y - pos.y, 2)) < tol;
            });
            setHoveredPointId(pId || null);
            if (!pId) {
                // Proper hit detection: interior or vertices
                const sId = shapes.find(s => {
                    const sp = s.pointIds.map(pid => points[pid]).filter(Boolean);
                    return isPointInPolygon(pos.x, pos.y, sp);
                })?.id;
                setHoveredShapeId(sId || null);
            }
        }
    };

    const handleMouseUp = () => { setDraggedPointId(null); setDraggedShapeId(null); setIsPanning(false); };
    const handleWheel = (e: React.WheelEvent) => {
        const factor = e.deltaY > 0 ? 1.05 : 0.95;
        const rect = svgRef.current!.getBoundingClientRect();
        const mouseX = e.clientX - rect.left, mouseY = e.clientY - rect.top;
        const svgX = viewBox.x + (mouseX / rect.width) * viewBox.width, svgY = viewBox.y + (mouseY / rect.height) * viewBox.height;
        const nw = viewBox.width * factor, nh = viewBox.height * factor;
        if (nw < 200 || nw > 10000) return;
        setViewBox({ x: svgX - (mouseX / rect.width) * nw, y: svgY - (mouseY / rect.height) * nh, width: nw, height: nh });
    };
    const deleteShape = (id: string) => { setShapes(prev => prev.filter(s => s.id !== id)); };
    const resetCanvas = () => { setPoints({}); setShapes([]); setSelection([]); };

    const Grid = () => {
        if (background === 'blank') return null;
        const lines = [];
        const startX = Math.floor(viewBox.x / GRID_SIZE) * GRID_SIZE - GRID_SIZE;
        const endX = Math.ceil((viewBox.x + viewBox.width) / GRID_SIZE) * GRID_SIZE + GRID_SIZE;
        const startY = Math.floor(viewBox.y / GRID_SIZE) * GRID_SIZE - GRID_SIZE;
        const endY = Math.ceil((viewBox.y + viewBox.height) / GRID_SIZE) * GRID_SIZE + GRID_SIZE;

        if (background === 'grid') {
            for (let x = startX; x <= endX; x += GRID_SIZE) {
                lines.push(<line key={`v-${x}`} x1={x} y1={startY} x2={x} y2={endY} stroke="#cbd5e1" strokeWidth="1" />);
            }
            for (let y = startY; y <= endY; y += GRID_SIZE) {
                lines.push(<line key={`h-${y}`} x1={startX} y1={y} x2={endX} y2={y} stroke="#cbd5e1" strokeWidth="1" />);
            }
        } else if (background === 'dots') {
            for (let x = startX; x <= endX; x += GRID_SIZE) {
                for (let y = startY; y <= endY; y += GRID_SIZE) {
                    lines.push(<circle key={`d-${x}-${y}`} cx={x} cy={y} r="1.5" fill="#94a3b8" />);
                }
            }
        }
        return <g>{lines}</g>;
    };

    return (
        <div ref={containerRef} className="fixed inset-0 flex flex-col bg-slate-50 overflow-hidden select-none z-50">
            <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm z-30">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4"><ArrowLeft className="w-4 h-4 mr-2" />Vissza</Button>
                    <div className="h-8 w-px bg-slate-200" />
                    <h1 className="text-lg font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent hidden md:block">Kerület és Terület</h1>
                </div>

                <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl border border-slate-200">
                    {[
                        { id: 'select', icon: MousePointer2, label: 'Kijelölés' },
                        { id: 'rectangle', icon: Square, label: 'Téglalap' },
                        { id: 'polygon', icon: Plus, label: 'Varrás' },
                        { id: 'unit-square', icon: LayoutGrid, label: 'Egységnégyzet' },
                        { id: 'auto-fill', icon: Sparkles, label: 'Kitöltés' },
                        { id: 'eraser', icon: Eraser, label: 'Radír' },
                        { id: 'pan', icon: Move, label: 'Mozgatás' }
                    ].map((t) => (
                        <Button key={t.id} variant={activeTool === t.id ? 'default' : 'ghost'} size="icon" onClick={() => { setActiveTool(t.id as Tool); setSelection([]); }} className={cn("w-10 h-10 rounded-xl transition-all", activeTool === t.id ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-500 hover:bg-white")} title={t.label}><t.icon className="w-5 h-5" /></Button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="rounded-xl border-slate-200 font-bold gap-2"><Square className="w-4 h-4 text-emerald-600" />Alakzatok<ChevronDown className="w-3 h-3 text-slate-400" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100"><h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Téglalapok</h3>{[{ w: 2, h: 2, label: '2 x 2' }, { w: 4, h: 2, label: '4 x 2' }, { w: 5, h: 3, label: '5 x 3' }, { w: 6, h: 4, label: '6 x 4' }, { w: 8, h: 5, label: '8 x 5' }, { w: 10, h: 6, label: '10 x 6' },].map((rect) => (<DropdownMenuItem key={`${rect.w}x${rect.h}`} onClick={() => dropPredefinedRectangle(rect.w, rect.h)} className="rounded-xl py-3 px-4 hover:bg-emerald-50 cursor-pointer"><Square className="w-4 h-4 mr-3 opacity-50" /><span className="font-bold">{rect.label}</span></DropdownMenuItem>))}<hr className="my-2 border-slate-100" /><DropdownMenuItem onClick={() => setShowCustomModal(true)} className="rounded-xl py-3 px-4 hover:bg-blue-50 text-blue-600 cursor-pointer"><Scaling className="w-4 h-4 mr-3" /><span className="font-bold">Egyedi méret...</span></DropdownMenuItem></DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex items-center bg-slate-900 rounded-xl px-1 py-1">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10 font-bold px-3 py-1 uppercase text-xs gap-2" title="Munkatér egysége"><Ruler className="w-3.5 h-3.5 opacity-50" />{activeUnit}<ChevronDown className="w-3 h-3 opacity-40" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32 rounded-2xl p-2 shadow-2xl">{(['cm', 'dm', 'm', 'km'] as Unit[]).map((u) => (<DropdownMenuItem key={u} onClick={() => setActiveUnit(u)} className={cn("rounded-xl font-bold uppercase py-2 cursor-pointer", activeUnit === u ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50")}>{u}</DropdownMenuItem>))}</DropdownMenuContent>
                        </DropdownMenu>
                        <div className="w-px h-4 bg-white/20 mx-1" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10 font-bold px-3 py-1 uppercase text-xs gap-2" title="Mérőnégyzet egysége"><LayoutGrid className="w-3.5 h-3.5 opacity-50" />{fillerUnit}<ChevronDown className="w-3 h-3 opacity-40" /></Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32 rounded-2xl p-2 shadow-2xl">{(['cm', 'dm', 'm', 'km'] as Unit[]).map((u) => (<DropdownMenuItem key={u} onClick={() => setFillerUnit(u)} className={cn("rounded-xl font-bold uppercase py-2 cursor-pointer", fillerUnit === u ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50")}>{u}</DropdownMenuItem>))}</DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="h-6 w-px bg-slate-200 mx-1" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="rounded-xl text-slate-500 hover:bg-slate-100"><Settings className="w-5 h-5" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100"><h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Munkaterület</h3><DropdownMenuItem onClick={() => setBackground('blank')} className="rounded-xl py-2 cursor-pointer gap-3"><div className="w-4 h-4 rounded border border-slate-200" /> Sima hátter</DropdownMenuItem><DropdownMenuItem onClick={() => setBackground('grid')} className="rounded-xl py-2 cursor-pointer gap-3"><Grid3X3 className="w-4 h-4 text-slate-400" /> Négyzetrács</DropdownMenuItem><DropdownMenuItem onClick={() => setBackground('dots')} className="rounded-xl py-2 cursor-pointer gap-3"><Hash className="w-4 h-4 text-slate-400" /> Pontrács</DropdownMenuItem><hr className="my-2 border-slate-100" /><DropdownMenuItem onClick={() => setShowAllMeasurements(!showAllMeasurements)} className="rounded-xl py-2 cursor-pointer gap-3">{showAllMeasurements ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}{showAllMeasurements ? 'Méretek elrejtése' : 'Méretek megjelenítése'}</DropdownMenuItem><DropdownMenuItem onClick={() => setShowSummary(!showSummary)} className="rounded-xl py-2 cursor-pointer gap-3">{showSummary ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Calculator className="w-4 h-4 text-slate-400" />}{showSummary ? 'Statisztika elrejtése' : 'Statisztika megjelenítése'}</DropdownMenuItem><hr className="my-2 border-slate-100" /><DropdownMenuItem onClick={resetCanvas} className="rounded-xl py-2 cursor-pointer gap-3 text-red-600 hover:bg-red-50"><RotateCcw className="w-4 h-4" /> Összes törlése</DropdownMenuItem></DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="flex-1 relative overflow-hidden">
                {showCustomModal && (<div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 animate-in fade-in duration-200"><div className="bg-white rounded-[2.5rem] shadow-2xl border p-8 w-80 animate-in zoom-in duration-300"><h2 className="text-xl font-black text-slate-800 mb-6 text-center">Egyedi téglalap</h2><div className="space-y-6 mb-8"><div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Szélesség ({UNIT_LABELS[activeUnit]})</label><input type="number" value={customWidth} onChange={(e) => setCustomWidth(parseInt(e.target.value) || 1)} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-blue-500" /></div><div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Magasság ({UNIT_LABELS[activeUnit]})</label><input type="number" value={customHeight} onChange={(e) => setCustomHeight(parseInt(e.target.value) || 1)} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-blue-500" /></div></div><div className="flex gap-3"><Button variant="outline" className="flex-1 rounded-2xl h-12 font-bold" onClick={() => setShowCustomModal(false)}>Mégse</Button><Button className="flex-1 rounded-2xl h-12 font-bold bg-blue-600 hover:bg-blue-700" onClick={() => { dropPredefinedRectangle(customWidth, customHeight); setShowCustomModal(false); }}>Mehet</Button></div></div></div>)}

                <svg ref={svgRef} className="w-full h-full bg-[#f8fafc] cursor-crosshair touch-none" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onClick={handleCanvasClick} onWheel={handleWheel} preserveAspectRatio="xMidYMid slice">
                    <Grid />
                    <g className="shapes-layer">
                        {shapes.map(shape => {
                            const sp = shape.pointIds.map(id => points[id]).filter(Boolean);
                            if (sp.length < 2) return null;
                            const d = sp.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
                            const isH = hoveredShapeId === shape.id;
                            const isS = selection.includes(shape.id);
                            const minX = Math.min(...sp.map(p => p.x)), maxX = Math.max(...sp.map(p => p.x));
                            const minY = Math.min(...sp.map(p => p.y)), maxY = Math.max(...sp.map(p => p.y));
                            const midX = (minX + maxX) / 2, midY = (minY + maxY) / 2;

                            return (
                                <g key={shape.id}>
                                    <path d={d} fill={shape.color} fillOpacity={isH ? "0.3" : "0.2"} stroke={shape.color} strokeWidth={isS || isH ? 4 : 3} strokeLinejoin="round" className="transition-all duration-200" />
                                    {shape.type === 'unit-square' && (<text x={midX} y={midY} textAnchor="middle" dominantBaseline="middle" className="text-[8px] font-black fill-slate-800 pointer-events-none">1 {UNIT_LABELS[shape.unit]}²</text>)}
                                    {showAllMeasurements && shape.type !== 'unit-square' && sp.map((p, i) => {
                                        const np = sp[(i + 1) % sp.length];
                                        const dist = calculateDistance(p, np);
                                        const mx = (p.x + np.x) / 2, my = (p.y + np.y) / 2;
                                        
                                        // Smart Label Placement: Offset label outward relative to shape center
                                        const dx = mx - midX, dy = my - midY;
                                        const mag = Math.sqrt(dx*dx + dy*dy);
                                        const offset = 22;
                                        const ox = mag > 0 ? (dx/mag) * offset : 0;
                                        const oy = mag > 0 ? (dy/mag) * offset : 0;

                                        return (
                                            <g key={`${shape.id}-label-${i}`} className="animate-in fade-in duration-300">
                                                <rect x={mx + ox - 22} y={my + oy - 10} width="44" height="20" rx="10" fill="white" stroke={shape.color} strokeWidth="1.5" className="opacity-95 shadow-sm" />
                                                <text x={mx + ox} y={my + oy + 1} textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-black fill-slate-800">{dist.toFixed(0)} {UNIT_LABELS[shape.unit]}</text>
                                            </g>
                                        );
                                    })}
                                </g>
                            );
                        })}
                    </g>

                    {activeTool === 'polygon' && selection.length > 0 && (<g>{selection.map((pId, i) => { const p = points[pId]; if (!p) return null; const nextP = i < selection.length - 1 ? points[selection[i+1]] : mousePos; return p && nextP && (<line key={`draw-${i}`} x1={p.x} y1={p.y} x2={nextP.x} y2={nextP.y} stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6,4" className="animate-pulse" />); })}</g>)}

                    {(activeTool === 'select' || activeTool === 'polygon') && (<g className="points-layer">{Object.values(points).map(p => { const isH = hoveredPointId === p.id; const isS = selection.includes(p.id); return (<circle key={p.id} cx={p.x} cy={p.y} r={isH ? 8 : 4.5} fill={isS ? '#2563eb' : 'white'} stroke={isS ? 'white' : '#2563eb'} strokeWidth="2.5" className="transition-all cursor-move shadow-md" />); })}</g>)}
                </svg>

                {showSummary && shapes.length > 0 && (
                    <aside className="absolute right-6 top-6 bottom-6 w-72 pointer-events-none z-20">
                        <div className="h-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl flex flex-col pointer-events-auto overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-2"><div className="p-2 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200"><Calculator className="w-4 h-4" /></div><h3 className="font-black text-slate-800 tracking-tight">Eredmények</h3></div>
                                <Button variant="ghost" size="icon" onClick={() => setShowSummary(false)} className="rounded-full h-8 w-8 text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></Button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {shapes.filter(s => s.type !== 'unit-square').map(s => {
                                    const sp = s.pointIds.map(id => points[id]).filter(Boolean);
                                    if (sp.length < 3) return null;
                                    const area = calculatePolygonArea(sp), perimeter = calculatePolygonPerimeter(sp);
                                    return (
                                        <div key={s.id} className="p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm animate-in slide-in-from-right duration-300">
                                            <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: s.color }} /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alakzat</span></div>{activeTool === 'auto-fill' && (<div className="p-1 px-2 bg-blue-100 text-blue-600 rounded-full animate-pulse flex items-center gap-1"><Sparkles className="w-3 h-3" /><span className="text-[8px] font-bold">KITÖLTÉSRE KÉSZ</span></div>)}</div>
                                            <div className="space-y-4">
                                                <div><div className="flex justify-between items-end mb-1"><span className="text-[10px] text-slate-500 font-black uppercase tracking-wider">Kerület (K)</span><span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">{UNIT_LABELS[s.unit]}</span></div><div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-2xl font-black text-slate-800 tracking-tighter">{perimeter.toFixed(0)}</div></div>
                                                <div><div className="flex justify-between items-end mb-1"><span className="text-[10px] text-slate-500 font-black uppercase tracking-wider">Terület (T)</span><span className="text-[10px] text-cyan-600 font-bold bg-cyan-50 px-2 py-0.5 rounded-full">{UNIT_LABELS[s.unit]}²</span></div><div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-2xl font-black text-slate-800 tracking-tighter">{area.toFixed(0)}</div></div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {['cm', 'dm', 'm', 'km'].map(u => {
                                    const count = shapes.filter(s => s.type === 'unit-square' && s.unit === u).length;
                                    if (count === 0) return null;
                                    return (
                                        <div key={`s-${u}`} className="mt-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: UNIT_COLORS[u as Unit] }} />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{UNIT_LABELS[u as Unit]}² négyzetháló</span>
                                            </div>
                                            <div className="text-xl font-black text-slate-800">{count} <span className="text-[10px] text-slate-400 tracking-normal uppercase">db</span></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-4 bg-slate-50/50 border-t border-slate-100"><Button className="w-full rounded-2xl bg-slate-900 border-none h-12 font-bold hover:bg-slate-800" onClick={resetCanvas}><RotateCcw className="w-4 h-4 mr-2" />Munkaterület ürítése</Button></div>
                        </div>
                    </aside>
                )}

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/70 backdrop-blur-md rounded-full border border-white shadow-2xl z-20">
                     <Button variant="ghost" size="icon" onClick={() => setViewBox(prev => ({ ...prev, width: prev.width * 1.1, height: prev.height * 1.1 }))} className="rounded-full hover:bg-slate-100 h-10 w-10"><ZoomOut className="w-5 h-5 text-slate-600" /></Button>
                    <div className="w-px h-6 bg-slate-200" />
                    <Button variant="ghost" size="icon" onClick={() => setViewBox({ x: viewBox.x, y: viewBox.y, width: 1200, height: 800 })} className="rounded-full hover:bg-slate-100 h-10 w-10"><Maximize className="w-4 h-4 text-slate-600" /></Button>
                    <div className="w-px h-6 bg-slate-200" />
                    <Button variant="ghost" size="icon" onClick={() => setViewBox(prev => ({ ...prev, width: prev.width * 0.9, height: prev.height * 0.9 }))} className="rounded-full hover:bg-slate-100 h-10 w-10"><ZoomIn className="w-5 h-5 text-slate-600" /></Button>
                </div>
            </main>
        </div>
    );
}
