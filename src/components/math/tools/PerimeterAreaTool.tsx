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
    Ruler,
    Scissors,
    RotateCw,
    GripVertical
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
    rotation: number; // in degrees
}

type Tool = 'select' | 'rectangle' | 'polygon' | 'unit-square' | 'eraser' | 'pan' | 'auto-fill' | 'scissors' | 'rotate';

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
    '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'
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

    // Dissection State
    const [cutLine, setCutLine] = useState<{ start: Point, end: Point } | null>(null);
    const [isCutting, setIsCutting] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [rotationStartAngle, setRotationStartAngle] = useState(0);
    const [initialShapeRotation, setInitialShapeRotation] = useState(0);

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
                return { ...prev, width: prev.width, height: prev.width / aspectRatio };
            });
        };
        window.addEventListener('resize', updateViewBoxSize);
        updateViewBoxSize();
        return () => window.removeEventListener('resize', updateViewBoxSize);
    }, []);

    // --- Browser Zoom Prevention ---
    useEffect(() => {
        const preventZoom = (e: WheelEvent | KeyboardEvent) => {
            if (e instanceof WheelEvent) { if (e.ctrlKey) e.preventDefault(); }
            else if (e instanceof KeyboardEvent) { if (e.ctrlKey && (e.key === '=' || e.key === '-' || e.key === '0' || e.key === '+')) e.preventDefault(); }
        };
        window.addEventListener('wheel', preventZoom as EventListener, { passive: false });
        window.addEventListener('keydown', preventZoom as EventListener);
        return () => { window.removeEventListener('wheel', preventZoom as EventListener); window.removeEventListener('keydown', preventZoom as EventListener); };
    }, []);

    // --- Hit Detection & Geometry Helpers ---

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

    const getCentroid = (polygonPoints: Point[]) => {
        let x = 0, y = 0, area = 0;
        for (let i = 0; i < polygonPoints.length; i++) {
            const p1 = polygonPoints[i];
            const p2 = polygonPoints[(i + 1) % polygonPoints.length];
            const f = p1.x * p2.y - p2.x * p1.y;
            x += (p1.x + p2.x) * f;
            y += (p1.y + p2.y) * f;
            area += f;
        }
        area /= 2;
        return area === 0 ? polygonPoints[0] : { x: x / (6 * area), y: y / (6 * area) };
    };

    const getLineIntersection = (p1: Point, p2: Point, p3: Point, p4: Point) => {
        const den = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);
        if (den === 0) return null;
        const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / den;
        const u = -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) / den;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
            return { x: p1.x + t * (p2.x - p1.x), y: p1.y + t * (p2.y - p1.y) };
        }
        return null;
    };

    const splitPolygon = (shape: Shape, lineStart: Point, lineEnd: Point) => {
        const polyPoints = shape.pointIds.map(id => points[id]).filter(Boolean);
        if (polyPoints.length < 3) return null;

        const side = (p: Point) => (p.x - lineStart.x) * (lineEnd.y - lineStart.y) - (p.y - lineStart.y) * (lineEnd.x - lineStart.x);
        
        let polyA: Point[] = [], polyB: Point[] = [];

        for (let i = 0; i < polyPoints.length; i++) {
            const p1 = polyPoints[i];
            const p2 = polyPoints[(i + 1) % polyPoints.length];
            const s1 = side(p1);
            const s2 = side(p2);

            if (s1 >= 0) polyA.push(p1);
            if (s1 <= 0) polyB.push(p1);

            if ((s1 > 0 && s2 < 0) || (s1 < 0 && s2 > 0)) {
                const intersect = getLineIntersection(p1, p2, lineStart, lineEnd);
                if (intersect) {
                    const intersectPoint = { id: `p-cut-${Date.now()}-${Math.random()}`, ...intersect };
                    polyA.push(intersectPoint);
                    polyB.push(intersectPoint);
                }
            }
        }

        if (polyA.length < 3 || polyB.length < 3) return null;
        return { polyA, polyB };
    };

    const getSVGPoint = useCallback((clientX: number, clientY: number) => {
        if (!svgRef.current) return { x: 0, y: 0 };
        const pt = svgRef.current.createSVGPoint();
        pt.x = clientX; pt.y = clientY;
        const transformed = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
        let x = transformed.x, y = transformed.y;
        if (background !== 'blank' && activeTool !== 'select' && activeTool !== 'pan' && activeTool !== 'scissors' && activeTool !== 'rotate') {
            x = Math.round(x / GRID_SIZE) * GRID_SIZE;
            y = Math.round(y / GRID_SIZE) * GRID_SIZE;
        }
        return { x, y };
    }, [background, activeTool]);

    // --- Calculations ---

    const calculateDistance = (p1: Point, p2: Point) => {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) / GRID_SIZE;
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
        if (draggedPointId || draggedShapeId || isPanning || isRotating) return;
        const pos = getSVGPoint(e.clientX, e.clientY);

        if (activeTool === 'auto-fill') {
            if (hoveredShapeId) animateFill(hoveredShapeId);
            return;
        }
        if (activeTool === 'select' || activeTool === 'pan' || activeTool === 'rotate' || activeTool === 'scissors') {
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
            const p1 = `p-${Date.now()}-1`, p2 = `p-${Date.now()}-2`, p3 = `p-${Date.now()}-3`, p4 = `p-${Date.now()}-4`;
            setPoints(prev => ({ ...prev, [p1]: { id: p1, x: pos.x, y: pos.y }, [p2]: { id: p2, x: pos.x+size, y: pos.y }, [p3]: { id: p3, x: pos.x+size, y: pos.y+size }, [p4]: { id: p4, x: pos.x, y: pos.y+size } }));
            setShapes(prev => [...prev, { id: `shape-${Date.now()}`, type: 'unit-square', pointIds: [p1, p2, p3, p4], color: UNIT_COLORS[fillerUnit], unit: fillerUnit, showMeasurements: true, rotation: 0 }]);
            return;
        }

        if (activeTool === 'polygon') {
            if (selection.length >= 3) {
                const fp = points[selection[0]];
                if (Math.sqrt(Math.pow(fp.x - pos.x, 2) + Math.pow(fp.y - pos.y, 2)) < GRID_SIZE / 2) {
                    setShapes(prev => [...prev, { id: `shape-${Date.now()}`, type: 'polygon', pointIds: [...selection], color: COLORS[Math.floor(Math.random() * COLORS.length)], unit: activeUnit, showMeasurements: true, rotation: 0 }]);
                    setSelection([]); return;
                }
            }
            const nid = `p-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            setPoints(prev => ({ ...prev, [nid]: { id: nid, x: pos.x, y: pos.y } }));
            setSelection(prev => [...prev, nid]);
        }
    };

    const dropPredefinedRectangle = (w: number, h: number) => {
        const startX = Math.round((viewBox.x + viewBox.width / 2) / GRID_SIZE) * GRID_SIZE;
        const startY = Math.round((viewBox.y + viewBox.height / 2) / GRID_SIZE) * GRID_SIZE;
        const pIds: string[] = [];
        const newPoints = { ...points };
        const coords = [{ x: startX, y: startY }, { x: startX + w * GRID_SIZE, y: startY }, { x: startX + w * GRID_SIZE, y: startY + h * GRID_SIZE }, { x: startX, y: startY + h * GRID_SIZE }];
        coords.forEach((c, i) => { const id = `p-r-${Date.now()}-${i}`; newPoints[id] = { id, ...c }; pIds.push(id); });
        setPoints(newPoints);
        setShapes(prev => [...prev, { id: `shape-r-${Date.now()}`, type: 'rectangle', pointIds: pIds, dimensions: { width: w, height: h }, color: COLORS[shapes.length % COLORS.length], unit: activeUnit, showMeasurements: true, rotation: 0 }]);
    };

    const animateFill = async (shapeId: string) => {
        const shape = shapes.find(s => s.id === shapeId);
        if (!shape || shape.type !== 'rectangle') return;
        setIsFilling(true);
        const scale = UNIT_HIERARCHY[shape.unit] / UNIT_HIERARCHY[fillerUnit];
        const w = shape.dimensions!.width * scale, h = shape.dimensions!.height * scale, size = GRID_SIZE / scale;
        const sp = points[shape.pointIds[0]];
        const currentPoints = { ...points };
        const total = w * h, delay = total > 100 ? (total > 400 ? 5 : 15) : 30;
        for (let r = 0; r < h; r++) {
            for (let c = 0; c < w; c++) {
                const uid = `${Date.now()}-${r}-${c}`;
                const p1 = `p-f-${uid}-1`, p2 = `p-f-${uid}-2`, p3 = `p-f-${uid}-3`, p4 = `p-f-${uid}-4`;
                const x = sp.x + c * size, y = sp.y + r * size;
                currentPoints[p1] = { id: p1, x, y }; currentPoints[p2] = { id: p2, x: x + size, y }; currentPoints[p3] = { id: p3, x: x + size, y: y + size }; currentPoints[p4] = { id: p4, x, y: y + size };
                setPoints({ ...currentPoints });
                setShapes(prev => [...prev, { id: `fill-${uid}`, type: 'unit-square', pointIds: [p1, p2, p3, p4], color: UNIT_COLORS[fillerUnit], unit: fillerUnit, showMeasurements: false, rotation: 0 }]);
                if (c % (Math.ceil(w/10)) === 0) await new Promise(res => setTimeout(res, delay));
            }
            await new Promise(res => setTimeout(res, delay * 2));
        }
        setIsFilling(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (activeTool === 'pan' || e.button === 1) { setIsPanning(true); setLastMousePos({ x: e.clientX, y: e.clientY }); return; }
        const pos = getSVGPoint(e.clientX, e.clientY);
        
        if (activeTool === 'scissors') {
            setIsCutting(true);
            setCutLine({ start: pos, end: pos });
            return;
        }

        if (activeTool === 'rotate' && hoveredShapeId) {
            const shape = shapes.find(s => s.id === hoveredShapeId)!;
            const centroid = getCentroid(shape.pointIds.map(id => points[id]));
            const angle = Math.atan2(pos.y - centroid.y, pos.x - centroid.x) * 180 / Math.PI;
            setIsRotating(true);
            setRotationStartAngle(angle);
            setInitialShapeRotation(shape.rotation || 0);
            setDraggedShapeId(hoveredShapeId);
            return;
        }

        if (activeTool === 'select') {
            if (hoveredPointId) setDraggedPointId(hoveredPointId);
            else if (hoveredShapeId) {
                setDraggedShapeId(hoveredShapeId);
                const s = shapes.find(sh => sh.id === hoveredShapeId)!;
                const fp = points[s.pointIds[0]], p = getSVGPoint(e.clientX, e.clientY);
                setInitialDragOffset({ x: p.x - fp.x, y: p.y - fp.y });
                const ip: Record<string, Point> = {};
                s.pointIds.forEach(pid => { ip[pid] = { ...points[pid] }; });
                setInitialPointPositions(ip);
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

        if (isCutting) {
            setCutLine(prev => prev ? { ...prev, end: pos } : null);
            return;
        }

        if (isRotating && draggedShapeId) {
            const shape = shapes.find(s => s.id === draggedShapeId)!;
            const centroid = getCentroid(shape.pointIds.map(id => points[id]));
            const currentAngle = Math.atan2(pos.y - centroid.y, pos.x - centroid.x) * 180 / Math.PI;
            const deltaAngle = currentAngle - rotationStartAngle;
            
            // Snap rotation to 15 degrees if shift held (emulated for now)
            let newRotation = initialShapeRotation + deltaAngle;
            
            setShapes(prev => prev.map(s => s.id === draggedShapeId ? { ...s, rotation: newRotation } : s));
            return;
        }

        if (draggedPointId) {
            setPoints(prev => ({ ...prev, [draggedPointId]: { ...prev[draggedPointId], x: pos.x, y: pos.y } }));
        } else if (draggedShapeId && initialDragOffset) {
            const s = shapes.find(sh => sh.id === draggedShapeId)!;
            const fp = initialPointPositions[s.pointIds[0]];
            const dx = pos.x - initialDragOffset.x - fp.x, dy = pos.y - initialDragOffset.y - fp.y;
            setPoints(prev => {
                const next = { ...prev };
                s.pointIds.forEach(pid => { if (next[pid]) next[pid] = { ...next[pid], x: initialPointPositions[pid].x + dx, y: initialPointPositions[pid].y + dy }; });
                return next;
            });
        } else {
            const tol = 15 * (viewBox.width / 1200);
            const pId = Object.keys(points).find(id => { const p = points[id]; return Math.sqrt(Math.pow(p.x - pos.x, 2) + Math.pow(p.y - pos.y, 2)) < tol; });
            setHoveredPointId(pId || null);
            if (!pId) {
                const sId = shapes.find(s => isPointInPolygon(pos.x, pos.y, s.pointIds.map(pid => points[pid]).filter(Boolean)))?.id;
                setHoveredShapeId(sId || null);
            }
        }
    };

    const handleMouseUp = () => {
        if (isCutting && cutLine) {
            const splitShapes: Shape[] = [];
            const newPoints = { ...points };
            shapes.forEach(s => {
                const split = splitPolygon(s, cutLine.start, cutLine.end);
                if (split) {
                    const idA = `${s.id}-a`, idB = `${s.id}-b`;
                    const pIdsA = split.polyA.map(p => { const id = p.id || `p-a-${Date.now()}-${Math.random()}`; newPoints[id] = { ...p, id }; return id; });
                    const pIdsB = split.polyB.map(p => { const id = p.id || `p-b-${Date.now()}-${Math.random()}`; newPoints[id] = { ...p, id }; return id; });
                    splitShapes.push({ ...s, id: idA, pointIds: pIdsA, rotation: s.rotation || 0 });
                    splitShapes.push({ ...s, id: idB, pointIds: pIdsB, rotation: s.rotation || 0 });
                } else {
                    splitShapes.push(s);
                }
            });
            if (splitShapes.length > shapes.length) {
                setShapes(splitShapes);
                setPoints(newPoints);
                toast.success("Sikeres vágás!");
            }
        }
        setDraggedPointId(null); setDraggedShapeId(null); setIsPanning(false); setIsCutting(false); setCutLine(null); setIsRotating(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        const factor = e.deltaY > 0 ? 1.05 : 0.95, rect = svgRef.current!.getBoundingClientRect();
        const mx = e.clientX - rect.left, my = e.clientY - rect.top;
        const sx = viewBox.x + (mx / rect.width) * viewBox.width, sy = viewBox.y + (my / rect.height) * viewBox.height;
        const nw = viewBox.width * factor, nh = viewBox.height * factor;
        if (nw < 200 || nw > 10000) return;
        setViewBox({ x: sx - (mx / rect.width) * nw, y: sy - (my / rect.height) * nh, width: nw, height: nh });
    };

    const resetCanvas = () => { setPoints({}); setShapes([]); setSelection([]); };
    const deleteShape = (id: string) => { setShapes(prev => prev.filter(s => s.id !== id)); };

    const Grid = () => {
        if (background === 'blank') return null;
        const lines = [], sx = Math.floor(viewBox.x / GRID_SIZE) * GRID_SIZE - GRID_SIZE, ex = Math.ceil((viewBox.x + viewBox.width) / GRID_SIZE) * GRID_SIZE + GRID_SIZE;
        const sy = Math.floor(viewBox.y / GRID_SIZE) * GRID_SIZE - GRID_SIZE, ey = Math.ceil((viewBox.y + viewBox.height) / GRID_SIZE) * GRID_SIZE + GRID_SIZE;
        if (background === 'grid') {
            for (let x = sx; x <= ex; x += GRID_SIZE) lines.push(<line key={`v-${x}`} x1={x} y1={sy} x2={x} y2={ey} stroke="#cbd5e1" strokeWidth="1" />);
            for (let y = sy; y <= ey; y += GRID_SIZE) lines.push(<line key={`h-${y}`} x1={sx} y1={y} x2={ex} y2={y} stroke="#cbd5e1" strokeWidth="1" />);
        } else if (background === 'dots') {
            for (let x = sx; x <= ex; x += GRID_SIZE) for (let y = sy; y <= ey; y += GRID_SIZE) lines.push(<circle key={`d-${x}-${y}`} cx={x} cy={y} r="1.5" fill="#94a3b8" />);
        }
        return <g>{lines}</g>;
    };

    return (
        <div ref={containerRef} className="fixed inset-0 flex flex-col bg-slate-50 overflow-hidden select-none z-50">
            <header className="h-16 flex items-center justify-between px-6 bg-white border-b shadow-sm z-30">
                <div className="flex items-center gap-6">
                    <Button variant="ghost" onClick={onBack} size="sm" className="rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold px-4"><ArrowLeft className="w-4 h-4 mr-2" />Vissza</Button>
                    <div className="h-8 w-px bg-slate-200" />
                    <h1 className="text-lg font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent hidden md:block">Geometriai Műhely</h1>
                </div>

                <div className="flex items-center gap-1 bg-slate-100/50 p-1 rounded-2xl border border-slate-200">
                    {[
                        { id: 'select', icon: MousePointer2, label: 'Kijelölés / Mozgatás' },
                        { id: 'rectangle', icon: Square, label: 'Téglalap' },
                        { id: 'polygon', icon: Plus, label: 'Saját alakzat' },
                        { id: 'unit-square', icon: LayoutGrid, label: 'Egységnégyzet' },
                        { id: 'auto-fill', icon: Sparkles, label: 'Automatikus Kitöltés' },
                        { id: 'scissors', icon: Scissors, label: 'Vágás' },
                        { id: 'rotate', icon: RotateCw, label: 'Forgatás' },
                        { id: 'eraser', icon: Eraser, label: 'Radír' },
                        { id: 'pan', icon: Move, label: 'Panoráma' }
                    ].map((t) => (
                        <Button key={t.id} variant={activeTool === t.id ? 'default' : 'ghost'} size="icon" onClick={() => { setActiveTool(t.id as Tool); setSelection([]); }} className={cn("w-10 h-10 rounded-xl transition-all", activeTool === t.id ? "bg-blue-600 text-white shadow-md shadow-blue-200" : "text-slate-500 hover:bg-white")} title={t.label}><t.icon className="w-5 h-5" /></Button>
                    ))}
                </div>

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="outline" size="sm" className="rounded-xl border-slate-200 font-bold gap-2"><Square className="w-4 h-4 text-emerald-600" />Alakzatok<ChevronDown className="w-3 h-3 text-slate-400" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100"><h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Gyorsmenü</h3>{[{ w: 2, h: 2, label: '2 x 2' }, { w: 4, h: 2, label: '4 x 2' }, { w: 5, h: 3, label: '5 x 3' }, { w: 10, h: 5, label: '10 x 5' }].map((rect) => (<DropdownMenuItem key={`${rect.w}x${rect.h}`} onClick={() => dropPredefinedRectangle(rect.w, rect.h)} className="rounded-xl font-bold py-2 cursor-pointer hover:bg-emerald-50"><Square className="w-4 h-4 mr-2" />{rect.label}</DropdownMenuItem>))}<hr className="my-2 border-slate-100" /><DropdownMenuItem onClick={() => setShowCustomModal(true)} className="rounded-xl py-2 px-4 hover:bg-blue-50 text-blue-600 cursor-pointer font-bold"><Scaling className="w-4 h-4 mr-2" />Egyedi méret...</DropdownMenuItem></DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex items-center bg-slate-900 rounded-xl px-2 py-1 gap-1">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="text-white hover:bg-white/10 font-black uppercase text-[10px] gap-1 px-2 h-7">{activeUnit}</Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32 rounded-2xl p-2 shadow-2xl">{(['cm', 'dm', 'm', 'km'] as Unit[]).map((u) => (<DropdownMenuItem key={u} onClick={() => setActiveUnit(u)} className={cn("rounded-xl font-bold uppercase py-2 cursor-pointer", activeUnit === u ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50")}>{u}</DropdownMenuItem>))}</DropdownMenuContent>
                        </DropdownMenu>
                        <div className="w-px h-3 bg-white/20" />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="text-white hover:bg-white/10 font-black uppercase text-[10px] gap-1 px-2 h-7" title="Kitöltés egysége">{fillerUnit}</Button></DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32 rounded-2xl p-2 shadow-2xl">{(['cm', 'dm', 'm', 'km'] as Unit[]).map((u) => (<DropdownMenuItem key={u} onClick={() => setFillerUnit(u)} className={cn("rounded-xl font-bold uppercase py-2 cursor-pointer", fillerUnit === u ? "bg-blue-50 text-blue-700" : "hover:bg-slate-50")}>{u}</DropdownMenuItem>))}</DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="h-6 w-px bg-slate-200 mx-1" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="rounded-xl text-slate-500 hover:bg-slate-100"><Settings className="w-5 h-5" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl border-slate-100"><h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">Munkaterület</h3><DropdownMenuItem onClick={() => setBackground('blank')} className="rounded-xl py-2 cursor-pointer gap-3"><div className="w-4 h-4 rounded border border-slate-200" /> Sima hátter</DropdownMenuItem><DropdownMenuItem onClick={() => setBackground('grid')} className="rounded-xl py-2 cursor-pointer gap-3"><Grid3X3 className="w-4 h-4 text-slate-400" /> Négyzetrács</DropdownMenuItem><DropdownMenuItem onClick={() => setBackground('dots')} className="rounded-xl py-2 cursor-pointer gap-3"><Hash className="w-4 h-4 text-slate-400" /> Pontrács</DropdownMenuItem><hr className="my-2 border-slate-100" /><DropdownMenuItem onClick={() => setShowAllMeasurements(!showAllMeasurements)} className="rounded-xl py-2 cursor-pointer gap-3">{showAllMeasurements ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />} Méretek</DropdownMenuItem><DropdownMenuItem onClick={resetCanvas} className="rounded-xl py-2 cursor-pointer gap-3 text-red-600 hover:bg-red-50"><RotateCcw className="w-4 h-4" /> Összes törlése</DropdownMenuItem></DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            <main className="flex-1 relative overflow-hidden bg-[#f1f5f9]">
                {showCustomModal && (<div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 animate-in fade-in duration-200"><div className="bg-white rounded-[2.5rem] shadow-2xl border p-8 w-80 animate-in zoom-in duration-300"><h2 className="text-xl font-black text-slate-800 mb-6 text-center">Egyedi téglalap</h2><div className="space-y-6 mb-8"><div><label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Szélesség ({activeUnit})</label><input type="number" value={customWidth} onChange={(e) => setCustomWidth(parseInt(e.target.value) || 1)} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-blue-500" /></div><div><label className="text-[10px] font-black text-slate-400 uppercase block mb-1">Magasság ({activeUnit})</label><input type="number" value={customHeight} onChange={(e) => setCustomHeight(parseInt(e.target.value) || 1)} className="w-full bg-slate-50 border-none rounded-2xl p-4 text-xl font-bold focus:ring-2 focus:ring-blue-500" /></div></div><div className="flex gap-3"><Button variant="outline" className="flex-1 rounded-2xl h-12 font-bold" onClick={() => setShowCustomModal(false)}>Mégse</Button><Button className="flex-1 rounded-2xl h-12 font-bold bg-blue-600 hover:bg-blue-700" onClick={() => { dropPredefinedRectangle(customWidth, customHeight); setShowCustomModal(false); }}>Mehet</Button></div></div></div>)}

                <svg ref={svgRef} className="w-full h-full cursor-crosshair touch-none" viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp} onClick={handleCanvasClick} onWheel={handleWheel} preserveAspectRatio="xMidYMid slice">
                    <Grid />
                    <g className="shapes-layer">
                        {shapes.map(shape => {
                            const sp = shape.pointIds.map(id => points[id]).filter(Boolean);
                            if (sp.length < 2) return null;
                            const d = sp.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
                            const centroid = getCentroid(sp);
                            const isH = hoveredShapeId === shape.id;
                            const isS = selection.includes(shape.id);

                            return (
                                <g key={shape.id} transform={`rotate(${shape.rotation || 0} ${centroid.x} ${centroid.y})`}>
                                    <path d={d} fill={shape.color} fillOpacity={isH ? "0.35" : "0.25"} stroke={shape.color} strokeWidth={isS || isH ? 4 : 3} strokeLinejoin="round" className="transition-all duration-200 cursor-pointer" />
                                    
                                    {shape.type === 'unit-square' && (<text x={centroid.x} y={centroid.y} textAnchor="middle" dominantBaseline="middle" className="text-[9px] font-black fill-slate-800 pointer-events-none opacity-60">1 {UNIT_LABELS[shape.unit]}²</text>)}
                                    
                                    {showAllMeasurements && shape.type !== 'unit-square' && sp.map((p, i) => {
                                        const np = sp[(i + 1) % sp.length], mx = (p.x + np.x) / 2, my = (p.y + np.y) / 2;
                                        const dx = mx - centroid.x, dy = my - centroid.y, mag = Math.sqrt(dx*dx + dy*dy), ox = (dx/mag)*28, oy = (dy/mag)*28;
                                        return (
                                            <g key={`${shape.id}-l-${i}`} className="pointer-events-none">
                                                <rect x={mx + ox - 20} y={my + oy - 10} width="40" height="20" rx="10" fill="white" stroke={shape.color} strokeWidth="1.5" className="opacity-95 shadow-sm" />
                                                <text x={mx + ox} y={my + oy + 1} textAnchor="middle" dominantBaseline="middle" className="text-[10px] font-black fill-slate-800">{calculateDistance(p, np).toFixed(0)} {UNIT_LABELS[shape.unit]}</text>
                                            </g>
                                        );
                                    })}

                                    {/* Rotation Handle */}
                                    {activeTool === 'rotate' && isH && (
                                        <g>
                                            <line x1={centroid.x} y1={centroid.y} x2={centroid.x} y2={centroid.y - (GRID_SIZE * 2)} stroke={shape.color} strokeWidth="2" strokeDasharray="4,2" />
                                            <circle cx={centroid.x} cy={centroid.y - (GRID_SIZE * 2)} r="12" fill="white" stroke={shape.color} strokeWidth="3" className="cursor-alias shadow-xl" />
                                            <RotateCw className="w-4 h-4" x={centroid.x - 8} y={centroid.y - (GRID_SIZE * 2) - 8} style={{ color: shape.color }} />
                                        </g>
                                    )}
                                </g>
                            );
                        })}
                    </g>

                    {isCutting && cutLine && (
                        <g>
                            <line x1={cutLine.start.x} y1={cutLine.start.y} x2={cutLine.end.x} y2={cutLine.end.y} stroke="#ef4444" strokeWidth="3" strokeDasharray="8,4" className="animate-pulse" />
                            <circle cx={cutLine.start.x} cy={cutLine.start.y} r="6" fill="#ef4444" />
                            <circle cx={cutLine.end.x} cy={cutLine.end.y} r="6" fill="#ef4444" />
                        </g>
                    )}

                    {activeTool === 'polygon' && selection.length > 0 && (<g>{selection.map((pId, i) => { const p = points[pId]; if (!p) return null; const np = i < selection.length - 1 ? points[selection[i+1]] : mousePos; return (<line key={`d-${i}`} x1={p.x} y1={p.y} x2={np.x} y2={np.y} stroke="#3b82f6" strokeWidth="2.5" strokeDasharray="6,4" className="animate-pulse" />); })}</g>)}

                    {(activeTool === 'select' || activeTool === 'polygon') && (<g>{Object.values(points).map(p => { const isH = hoveredPointId === p.id; const isS = selection.includes(p.id); return (<circle key={p.id} cx={p.x} cy={p.y} r={isH ? 8 : 4.5} fill={isS ? '#2563eb' : 'white'} stroke={isS ? 'white' : '#2563eb'} strokeWidth="2.5" className="transition-all cursor-move shadow-md" />); })}</g>)}
                </svg>

                {showSummary && shapes.length > 0 && (
                    <aside className="absolute right-6 top-6 bottom-6 w-80 pointer-events-none z-20">
                        <div className="h-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl flex flex-col pointer-events-auto overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-2 font-black text-slate-800"><Calculator className="w-5 h-5 text-blue-600" />Eredmények</div>
                                <Button variant="ghost" size="icon" onClick={() => setShowSummary(false)} className="rounded-full h-8 w-8 text-slate-400 hover:text-red-500"><X className="w-4 h-4" /></Button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                                {shapes.filter(s => s.type !== 'unit-square').map(s => {
                                    const sp = s.pointIds.map(id => points[id]).filter(Boolean);
                                    if (sp.length < 3) return null;
                                    return (
                                        <div key={s.id} className="p-5 rounded-[2rem] bg-white border border-slate-100 shadow-sm animate-in slide-in-from-right duration-300">
                                            <div className="flex items-center gap-2 mb-4"><div className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: s.color }} /><span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alakzat</span></div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100"><span className="text-[10px] text-slate-500 font-black block uppercase mb-1">K ({UNIT_LABELS[s.unit]})</span><span className="text-xl font-black text-slate-800">{calculatePolygonPerimeter(sp).toFixed(0)}</span></div>
                                                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100"><span className="text-[10px] text-slate-500 font-black block uppercase mb-1">T ({UNIT_LABELS[s.unit]}²)</span><span className="text-xl font-black text-slate-800">{calculatePolygonArea(sp).toFixed(0)}</span></div>
                                            </div>
                                        </div>
                                    );
                                })}
                                {['cm', 'dm', 'm', 'km'].map(u => {
                                    const count = shapes.filter(s => s.type === 'unit-square' && s.unit === u).length;
                                    if (count === 0) return null;
                                    return (
                                        <div key={`s-${u}`} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: UNIT_COLORS[u as Unit] }} /><span className="text-[10px] font-black uppercase text-slate-500">{UNIT_LABELS[u as Unit]}² kitöltés</span></div>
                                            <div className="text-xl font-black text-slate-800">{count} <span className="text-[10px] text-slate-400">db</span></div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="p-4 bg-slate-50/50 border-t border-slate-100"><Button className="w-full rounded-2xl bg-slate-900 border-none h-12 font-bold hover:bg-slate-800" onClick={resetCanvas}><RotateCcw className="w-4 h-4 mr-2" />Összes törlése</Button></div>
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
