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
    Shapes as ShapesIcon,
    Heart,
    Star,
    Cloud,
    Anchor,
    Zap,
    Award,
    Hash as GuideLineIcon,
    Ruler,
    Eye,
    Home,
    TreePine,
    Navigation
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

type GeometryType = 'point' | 'line' | 'segment' | 'ray' | 'polygon' | 'regular-polygon';

export type SpecialShapeType = 'heart' | 'star' | 'cross' | 'arrow' | 'house' | 'pine' | 'lightning' | 'cloud' | 'butterfly' | 'anchor';

export const SPECIAL_SHAPES: Record<SpecialShapeType, { x: number, y: number }[]> = {
    heart: [
        { x: 0, y: 0.5 }, { x: -0.5, y: -0.2 }, { x: -1, y: -0.6 }, { x: -0.8, y: -1 }, { x: -0.3, y: -1 }, { x: 0, y: -0.6 },
        { x: 0.3, y: -1 }, { x: 0.8, y: -1 }, { x: 1, y: -0.6 }, { x: 0.5, y: -0.2 }
    ],
    star: [
        { x: 0, y: -1 }, { x: 0.22, y: -0.31 }, { x: 0.95, y: -0.31 }, { x: 0.36, y: 0.12 }, { x: 0.59, y: 0.81 },
        { x: 0, y: 0.38 }, { x: -0.59, y: 0.81 }, { x: -0.36, y: 0.12 }, { x: -0.95, y: -0.31 }, { x: -0.22, y: -0.31 }
    ],
    cross: [
        { x: -0.2, y: -1 }, { x: 0.2, y: -1 }, { x: 0.2, y: -0.2 }, { x: 1, y: -0.2 }, { x: 1, y: 0.2 },
        { x: 0.2, y: 0.2 }, { x: 0.2, y: 1 }, { x: -0.2, y: 1 }, { x: -0.2, y: 0.2 }, { x: -1, y: 0.2 },
        { x: -1, y: -0.2 }, { x: -0.2, y: -0.2 }
    ],
    arrow: [
        { x: -0.8, y: -0.2 }, { x: 0.2, y: -0.2 }, { x: 0.2, y: -0.6 }, { x: 1, y: 0 }, { x: 0.2, y: 0.6 },
        { x: 0.2, y: 0.2 }, { x: -0.8, y: 0.2 }
    ],
    house: [
        { x: 0, y: -1 }, { x: 1, y: -0.2 }, { x: 0.8, y: -0.2 }, { x: 0.8, y: 1 }, { x: 0.3, y: 1 },
        { x: 0.3, y: 0.3 }, { x: -0.3, y: 0.3 }, { x: -0.3, y: 1 }, { x: -0.8, y: 1 }, { x: -0.8, y: -0.2 },
        { x: -1, y: -0.2 }
    ],
    pine: [
        { x: 0, y: -1 }, { x: 0.4, y: -0.4 }, { x: 0.2, y: -0.4 }, { x: 0.6, y: 0.2 }, { x: 0.3, y: 0.2 },
        { x: 0.8, y: 0.8 }, { x: 0.2, y: 0.8 }, { x: 0.2, y: 1 }, { x: -0.2, y: 1 }, { x: -0.2, y: 0.8 },
        { x: -0.8, y: 0.8 }, { x: -0.3, y: 0.2 }, { x: -0.6, y: 0.2 }, { x: -0.2, y: -0.4 }, { x: -0.4, y: -0.4 }
    ],
    lightning: [
        { x: 0.3, y: -1 }, { x: -0.8, y: 0.1 }, { x: -0.1, y: 0.1 }, { x: -0.4, y: 1 }, { x: 0.8, y: -0.2 },
        { x: 0.2, y: -0.2 }
    ],
    cloud: [
        { x: -0.4, y: 0.6 }, { x: -0.8, y: 0.6 }, { x: -1, y: 0.2 }, { x: -0.8, y: -0.2 }, { x: -0.4, y: -0.2 },
        { x: -0.3, y: -0.6 }, { x: 0.2, y: -0.8 }, { x: 0.6, y: -0.5 }, { x: 0.9, y: -0.2 }, { x: 1, y: 0.2 },
        { x: 0.8, y: 0.6 }, { x: 0.4, y: 0.6 }
    ],
    butterfly: [
        { x: 0, y: -0.6 }, { x: 0.8, y: -1 }, { x: 1, y: -0.4 }, { x: 0.5, y: 0 }, { x: 0.9, y: 0.6 },
        { x: 0.6, y: 1 }, { x: 0.1, y: 0.4 }, { x: 0, y: 1 }, { x: -0.1, y: 0.4 }, { x: -0.6, y: 1 },
        { x: -0.9, y: 0.6 }, { x: -0.5, y: 0 }, { x: -1, y: -0.4 }, { x: -0.8, y: -1 }
    ],
    anchor: [
        { x: 0, y: -0.8 }, { x: 0.2, y: -0.8 }, { x: 0.2, y: -0.6 }, { x: 0.1, y: -0.6 }, { x: 0.1, y: 0.6 },
        { x: 0.5, y: 0.5 }, { x: 0.7, y: 0.3 }, { x: 0.9, y: 0.7 }, { x: 0.6, y: 1 }, { x: 0.2, y: 1 },
        { x: 0.2, y: 0.8 }, { x: -0.2, y: 0.8 }, { x: -0.2, y: 1 }, { x: -0.6, y: 1 }, { x: -0.9, y: 0.7 },
        { x: -0.7, y: 0.3 }, { x: -0.5, y: 0.5 }, { x: -0.1, y: 0.6 }, { x: -0.1, y: -0.6 }, { x: -0.2, y: -0.6 },
        { x: -0.2, y: -0.8 }
    ]
};

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
    label?: string; // e.g. 'e' for lines
    pointLabels?: Record<string, string>; // Maps virtual point IDs to labels, e.g. regular polygon vertices
};

type Tool = 'select' | 'point' | 'line' | 'segment' | 'ray' | 'polygon' | 'regular-polygon' | 'special-shape' | 'axial-reflect' | 'central-reflect' | 'eraser' | 'pan';

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
    const [activeSpecialShape, setActiveSpecialShape] = useState<SpecialShapeType>('heart');
    const [showReflectionLines, setShowReflectionLines] = useState(false);
    const [showReflectionDistances, setShowReflectionDistances] = useState(false);
    const [showPointLabels, setShowPointLabels] = useState(true);
    const [showLineLabels, setShowLineLabels] = useState(true);
    const [showDistances, setShowDistances] = useState(false);
    const [showAngles, setShowAngles] = useState(false);
    const [showCoordinates, setShowCoordinates] = useState(false);
    const [showAxes, setShowAxes] = useState(true);

    // View State (Pan & Zoom)
    const [viewBox, setViewBox] = useState({ x: -600, y: -400, width: 1200, height: 800 });
    const [isPanning, setIsPanning] = useState(false);
    const lastMousePosRef = useRef({ x: 0, y: 0 });
    const dragStartMousePosRef = useRef({ x: 0, y: 0 });
    const dragStartPointsRef = useRef<Record<string, { x: number, y: number }>>({});
    const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [draggedObjectId, setDraggedObjectId] = useState<string | null>(null);

    const [history, setHistory] = useState<{ points: Record<string, Point>, objects: Record<string, GeometryObject> }[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

    const pushToHistory = useCallback((newPoints: Record<string, Point>, newObjects: Record<string, GeometryObject>) => {
        setHistory(prev => {
            const next = prev.slice(0, historyIndex + 1);
            return [...next, { points: newPoints, objects: newObjects }].slice(-50); // Keep last 50 steps
        });
        setHistoryIndex(prev => prev + 1);
    }, [historyIndex]);

    const undo = useCallback(() => {
        if (historyIndex > 0) {
            const prevState = history[historyIndex - 1];
            setPoints(prevState.points);
            setObjects(prevState.objects);
            setHistoryIndex(prev => prev - 1);
            setSelection([]);
        } else if (historyIndex === 0) {
            setPoints({});
            setObjects({});
            setHistoryIndex(-1);
            setSelection([]);
        }
    }, [history, historyIndex]);

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const preventDefault = (e: WheelEvent) => {
            if (e.ctrlKey || e.metaKey || Math.abs(e.deltaY) > 1) {
                e.preventDefault();
            }
        };

        svg.addEventListener('wheel', preventDefault, { passive: false });
        return () => svg.removeEventListener('wheel', preventDefault);
    }, []);

    // --- Helpers ---

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

    // Label Generators
    const getNextPointLabel = useCallback((currentPoints: Record<string, Point>, currentObjects: Record<string, GeometryObject>) => {
        let maxCharCode = 64; // 'A' is 65

        // Check base points
        Object.values(currentPoints).forEach(p => {
            if (p.label && p.label.length === 1 && p.label >= 'A' && p.label <= 'Z') {
                const code = p.label.charCodeAt(0);
                if (code > maxCharCode) maxCharCode = code;
            }
        });

        // Check virtual points in objects
        Object.values(currentObjects).forEach(obj => {
            if (obj.pointLabels) {
                Object.values(obj.pointLabels).forEach(label => {
                    if (label && label.length === 1 && label >= 'A' && label <= 'Z') {
                        const code = label.charCodeAt(0);
                        if (code > maxCharCode) maxCharCode = code;
                    }
                });
            }
        });

        return String.fromCharCode(maxCharCode + 1 > 90 ? 65 : maxCharCode + 1);
    }, []);

    const getNextLineLabel = useCallback((currentObjects: Record<string, GeometryObject>) => {
        let maxCharCode = 100; // 'e' is 101

        Object.values(currentObjects).forEach(obj => {
            if ((obj.type === 'line' || obj.type === 'segment' || obj.type === 'ray') && obj.label && obj.label.length === 1 && obj.label >= 'e' && obj.label <= 'z') {
                const code = obj.label.charCodeAt(0);
                if (code > maxCharCode) maxCharCode = code;
            }
        });

        return String.fromCharCode(maxCharCode + 1 > 122 ? 101 : maxCharCode + 1);
    }, []);

    const calculateRegularPolygonPoints = (p1: { x: number, y: number }, p2: { x: number, y: number }, sides: number) => {
        // Edge-based: p1 and p2 are two adjacent vertices
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const sideLen = Math.sqrt(dx * dx + dy * dy);
        if (sideLen < 1) return [p1, p2];

        // Exterior angle
        const angle = (2 * Math.PI) / sides;
        // Rotation matrix to get the next point
        // Vector from p1 to p2: (dx, dy)
        // To get p3, rotate (p2-p1) around p2 by (PI - angle)
        // Wait, a simpler way: center of the polygon can be found.
        // For a regular polygon with side s and n sides, radius R = s / (2 * sin(PI/n))
        // Distance from midpoint of edge to center: h = s / (2 * tan(PI/n))
        const midX = (p1.x + p2.x) / 2;
        const midY = (p1.y + p2.y) / 2;

        // Perpendicular vector to (p2-p1)
        const nx = -dy / sideLen;
        const ny = dx / sideLen;

        const h = sideLen / (2 * Math.tan(Math.PI / sides));
        // Center of the polygon (one of two possible)
        const cx = midX + nx * h;
        const cy = midY + ny * h;

        // Now rotate p1 around (cx, cy) to get all points
        const vertices: { x: number, y: number }[] = [];
        const startAngle = Math.atan2(p1.y - cy, p1.x - cx);
        for (let i = 0; i < sides; i++) {
            const a = startAngle + i * (2 * Math.PI / sides);
            vertices.push({
                x: cx + Math.cos(a) * (sideLen / (2 * Math.sin(Math.PI / sides))),
                y: cy + Math.sin(a) * (sideLen / (2 * Math.sin(Math.PI / sides)))
            });
        }
        return vertices;
    };

    const allPoints = useMemo(() => {
        const result: Record<string, Point> = { ...points };

        // Handle dependencies (reflections of reflections, etc.)
        // We use a simple iterative approach to resolve dependencies up to 3 levels deep
        for (let iteration = 0; iteration < 3; iteration++) {
            let changed = false;
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
                            const reflected = reflectPointCentral(p, centerPoint);
                            const targetId = obj.pointIds[idx];
                            const expectedLabel = p.label ? p.label + "'" : undefined;

                            if (!result[targetId] || result[targetId].x !== reflected.x || result[targetId].y !== reflected.y || result[targetId].label !== expectedLabel) {
                                result[targetId] = { id: targetId, ...reflected, label: expectedLabel };
                                changed = true;
                            }
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
                            const reflected = reflectPointAxial(p, p1, p2);
                            const targetId = obj.pointIds[idx];
                            const expectedLabel = p.label ? p.label + "'" : undefined;

                            if (!result[targetId] || result[targetId].x !== reflected.x || result[targetId].y !== reflected.y || result[targetId].label !== expectedLabel) {
                                result[targetId] = { id: targetId, ...reflected, label: expectedLabel };
                                changed = true;
                            }
                        });
                    }
                } else if (obj.type === 'regular-polygon' && !obj.isReflection) {
                    const p1 = points[obj.pointIds[0]];
                    const p2 = points[obj.pointIds[1]];
                    if (p1 && p2) {
                        const vertices = calculateRegularPolygonPoints(p1, p2, obj.sides || regularPolygonSides);
                        vertices.forEach((v, idx) => {
                            if (idx >= 2) {
                                const targetId = obj.pointIds[idx];
                                const expectedLabel = obj.pointLabels ? obj.pointLabels[targetId] : undefined;
                                if (!result[targetId] || result[targetId].x !== v.x || result[targetId].y !== v.y || result[targetId].label !== expectedLabel) {
                                    result[targetId] = { id: targetId, ...v, label: expectedLabel };
                                    changed = true;
                                }
                            }
                        });
                    }
                }
            });
            if (!changed) break;
        }

        return result;
    }, [points, objects, regularPolygonSides, reflectPointCentral, reflectPointAxial]);

    // --- Distance & Intersection Helpers for Picking / Erasing ---

    const distToLineType = (
        p: { x: number, y: number },
        p1: { x: number, y: number },
        p2: { x: number, y: number },
        type: 'line' | 'segment' | 'ray'
    ) => {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const lenSq = dx * dx + dy * dy;
        if (lenSq < 0.0001) {
            return Math.sqrt((p.x - p1.x) ** 2 + (p.y - p1.y) ** 2);
        }
        let t = ((p.x - p1.x) * dx + (p.y - p1.y) * dy) / lenSq;
        if (type === 'segment') {
            t = Math.max(0, Math.min(1, t));
        } else if (type === 'ray') {
            t = Math.max(0, t);
        }
        const projX = p1.x + t * dx;
        const projY = p1.y + t * dy;
        return Math.sqrt((p.x - projX) ** 2 + (p.y - projY) ** 2);
    };

    const isPointInPolygon = (p: { x: number, y: number }, pts: { x: number, y: number }[]) => {
        let inside = false;
        for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
            const xi = pts[i].x, yi = pts[i].y;
            const xj = pts[j].x, yj = pts[j].y;
            const intersect = ((yi > p.y) !== (yj > p.y)) &&
                (p.x < (xj - xi) * (p.y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    const distToPolygonPerimeter = (p: { x: number, y: number }, pts: { x: number, y: number }[]) => {
        let minDist = Infinity;
        for (let i = 0; i < pts.length; i++) {
            const p1 = pts[i];
            const p2 = pts[(i + 1) % pts.length];
            const d = distToLineType(p, p1, p2, 'segment');
            if (d < minDist) minDist = d;
        }
        return minDist;
    };

    const findObjectNear = useCallback((p: { x: number, y: number }, tol: number): GeometryObject | null => {
        const objList = Object.values(objects).slice().reverse();
        for (const obj of objList) {
            const pts = obj.pointIds.map(id => allPoints[id]).filter(Boolean);
            if (pts.length === 0) continue;

            if (obj.type === 'point' && pts.length >= 1) {
                const d = Math.sqrt((p.x - pts[0].x) ** 2 + (p.y - pts[0].y) ** 2);
                if (d < tol) return obj;
            } else if ((obj.type === 'line' || obj.type === 'segment' || obj.type === 'ray') && pts.length >= 2) {
                const d = distToLineType(p, pts[0], pts[1], obj.type);
                if (d < tol) return obj;
            } else if ((obj.type === 'polygon' || obj.type === 'regular-polygon') && pts.length >= 3) {
                if (isPointInPolygon(p, pts)) return obj;
                const d = distToPolygonPerimeter(p, pts);
                if (d < tol) return obj;
            }
        }
        return null;
    }, [objects, allPoints]);

    // --- Interaction Handlers ---

    const handlePointEraser = useCallback((pId: string) => {
        const newPoints = { ...points };
        delete newPoints[pId];

        const newObjects = { ...objects };
        let changed = true;
        while (changed) {
            changed = false;
            Object.keys(newObjects).forEach(objId => {
                const obj = newObjects[objId];
                const dependsOnPoint = obj.pointIds.includes(pId);
                const dependsOnSource = obj.reflectionSourceId && !newObjects[obj.reflectionSourceId];
                const dependsOnRef = obj.reflectionRefId === pId || (obj.reflectionRefId && !newObjects[obj.reflectionRefId] && !points[obj.reflectionRefId]);

                if (dependsOnPoint || dependsOnSource || dependsOnRef) {
                    delete newObjects[objId];
                    changed = true;
                }
            });
        }

        // Clean up unshared points that belonged to deleted objects
        Object.keys(newPoints).forEach(id => {
            const isUsed = Object.values(newObjects).some(o => o.pointIds.includes(id));
            if (!isUsed) {
                delete newPoints[id];
            }
        });

        setPoints(newPoints);
        setObjects(newObjects);
        pushToHistory(newPoints, newObjects);
        setHoveredPointId(null);
    }, [points, objects, pushToHistory]);

    const handleObjectClick = useCallback((objId: string) => {
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
                    const newObjects: Record<string, GeometryObject> = {
                        ...objects,
                        [id]: {
                            id, type: sourceObj.type, pointIds, color: 'green', isReflection: true,
                            reflectionSourceId: reflectingObjectId!, reflectionType: 'axial' as const, reflectionRefId: objId
                        }
                    };
                    setObjects(newObjects);
                    pushToHistory(points, newObjects);
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
                    const newObjects: Record<string, GeometryObject> = {
                        ...objects,
                        [id]: {
                            id, type: sourceObj.type, pointIds, color: 'green', isReflection: true,
                            reflectionSourceId: reflectingObjectId!, reflectionType: 'central' as const, reflectionRefId: targetObj.pointIds[0]
                        }
                    };
                    setObjects(newObjects);
                    pushToHistory(points, newObjects);
                    setReflectingObjectId(null);
                }
            }
        } else if (activeTool === 'eraser') {
            const newObjects = { ...objects };
            const newPoints = { ...points };

            const deleteObjRecursive = (id: string) => {
                if (!newObjects[id]) return;
                delete newObjects[id];

                // Cascade delete reflections
                Object.keys(newObjects).forEach(k => {
                    if (newObjects[k].reflectionSourceId === id || newObjects[k].reflectionRefId === id) {
                        deleteObjRecursive(k);
                    }
                });
            };

            deleteObjRecursive(objId);

            // Clean up points that are no longer used by any remaining object
            Object.keys(newPoints).forEach(pId => {
                const isUsed = Object.values(newObjects).some(o => o.pointIds.includes(pId));
                if (!isUsed) {
                    delete newPoints[pId];
                }
            });

            setObjects(newObjects);
            setPoints(newPoints);
            pushToHistory(newPoints, newObjects);
            setHoveredObjectId(null);
        }
    }, [isPanning, activeTool, reflectingObjectId, objects, points, pushToHistory]);

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (draggedPointId || draggedObjectId || isPanning) return;
        if ((['select', 'pan'] as Tool[]).includes(activeTool)) {
            setSelection([]);
            setReflectingObjectId(null);
            return;
        }

        const pos = getSVGPoint(e.clientX, e.clientY);
        const tolerance = 15 * (viewBox.width / 1200);

        // Find existing point in allPoints (including virtual ones)
        // For polygon closing, use a larger tolerance for the FIRST point
        const getPointAt = (p: { x: number, y: number }, tol: number) => 
            Object.entries(allPoints).find(([_, pt]) =>
                Math.sqrt(Math.pow(pt.x - p.x, 2) + Math.pow(pt.y - p.y, 2)) < tol
            );

        let existingPointEntry = getPointAt(pos, tolerance);
        
        // Special handling for ERASER tool when canvas is clicked
        if (activeTool === 'eraser') {
            if (existingPointEntry) {
                handlePointEraser(existingPointEntry[0]);
                return;
            }
            if (hoveredObjectId) {
                handleObjectClick(hoveredObjectId);
                return;
            }
            const nearObj = findObjectNear(pos, 22 * (viewBox.width / 1200));
            if (nearObj) {
                handleObjectClick(nearObj.id);
                return;
            }
            return;
        }

        // Special case: if we are in polygon mode and have at least 3 points, 
        // try to find the FIRST point with LARGER tolerance to make closing easier
        if (activeTool === 'polygon' && selection.length >= 2) {
            const firstPoint = allPoints[selection[0]];
            const distToFirst = Math.sqrt(Math.pow(firstPoint.x - pos.x, 2) + Math.pow(firstPoint.y - pos.y, 2));
            if (distToFirst < tolerance * 2) {
                existingPointEntry = [selection[0], firstPoint];
            }
        }

        let clickedPointId = existingPointEntry ? existingPointEntry[0] : null;
        let currentPoints = points;

        // Create point if needed
        if (!clickedPointId && activeTool !== 'select' && activeTool !== 'axial-reflect' && activeTool !== 'central-reflect' && activeTool !== 'eraser' && activeTool !== 'pan') {
            const newId = `p-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            const label = getNextPointLabel(points, objects);
            currentPoints = {
                ...points,
                [newId]: { id: newId, x: pos.x, y: pos.y, label }
            };
            setPoints(currentPoints);
            clickedPointId = newId;
        }

        if (!clickedPointId) return;

        // Tool Logic
        if (activeTool === 'point') {
            const id = `obj-${Date.now()}`;
            const newObjects = {
                ...objects,
                [id]: { id, type: 'point' as const, pointIds: [clickedPointId!], color: 'blue', isReflection: false }
            };
            setObjects(newObjects);
            pushToHistory(currentPoints, newObjects);
        } else if (activeTool === 'line') {
            if (selection.length === 0) {
                setSelection([clickedPointId]);
            } else if (selection[0] !== clickedPointId) {
                const id = `obj-${Date.now()}`;
                const label = getNextLineLabel(objects);
                const newObjects = {
                    ...objects,
                    [id]: { id, type: 'line' as const, pointIds: [selection[0], clickedPointId!], color: 'black', isReflection: false, label }
                };
                setObjects(newObjects);
                pushToHistory(currentPoints, newObjects);
                setSelection([]);
            }
        } else if (activeTool === 'segment') {
            if (selection.length === 0) {
                setSelection([clickedPointId]);
            } else if (selection[0] !== clickedPointId) {
                const id = `obj-${Date.now()}`;
                const label = getNextLineLabel(objects);
                const newObjects = {
                    ...objects,
                    [id]: { id, type: 'segment' as const, pointIds: [selection[0], clickedPointId!], color: 'black', isReflection: false, label }
                };
                setObjects(newObjects);
                pushToHistory(currentPoints, newObjects);
                setSelection([]);
            }
        } else if (activeTool === 'ray') {
            if (selection.length === 0) {
                setSelection([clickedPointId]);
            } else if (selection[0] !== clickedPointId) {
                const id = `obj-${Date.now()}`;
                const label = getNextLineLabel(objects);
                const newObjects = {
                    ...objects,
                    [id]: { id, type: 'ray' as const, pointIds: [selection[0], clickedPointId!], color: 'black', isReflection: false, label }
                };
                setObjects(newObjects);
                pushToHistory(currentPoints, newObjects);
                setSelection([]);
            }
        } else if (activeTool === 'polygon') {
            if (selection.length >= 3 && clickedPointId === selection[0]) {
                const id = `obj-${Date.now()}`;
                const newObjects = {
                    ...objects,
                    [id]: { id, type: 'polygon' as const, pointIds: [...selection], color: 'blue', isReflection: false }
                };
                setObjects(newObjects);
                pushToHistory(currentPoints, newObjects);
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
                const pointLabels: Record<string, string> = {};

                // Generate labels for the additional points
                let tempObjects = { ...objects };
                for (let i = 2; i < sides; i++) {
                    const vId = `p-reg-${id}-${i}`;
                    vertexIds.push(vId);
                    const label = getNextPointLabel(currentPoints, tempObjects);
                    pointLabels[vId] = label;
                    // Mock object to let getNextPointLabel see this label in next iteration
                    tempObjects = {
                        ...tempObjects,
                        [id]: { id, type: 'regular-polygon' as const, pointIds: vertexIds, color: 'blue', isReflection: false, sides, pointLabels }
                    };
                }

                const newObjects = {
                    ...objects,
                    [id]: { id, type: 'regular-polygon' as const, pointIds: vertexIds, color: 'blue', isReflection: false, sides, pointLabels }
                };
                setObjects(newObjects);
                pushToHistory(currentPoints, newObjects);
                setSelection([]);
            }
        } else if (activeTool === 'special-shape') {
            const shapePoints = SPECIAL_SHAPES[activeSpecialShape];
            const scale = 60 * (viewBox.width / 1200); // Scale relative to zoom

            const newPoints: Record<string, Point> = {};
            const pointIds: string[] = [];
            const tempPoints = { ...points };
            const tempObjects = { ...objects };

            shapePoints.forEach((sp, idx) => {
                const id = `pt-${Date.now()}-${idx}`;
                const label = getNextPointLabel(tempPoints, tempObjects);
                const newPoint = { id, x: pos.x + sp.x * scale, y: pos.y + sp.y * scale, label };
                newPoints[id] = newPoint;
                tempPoints[id] = newPoint;
                pointIds.push(id);
            });

            const objId = `obj-${Date.now()}`;
            const newObjects = {
                ...objects,
                [objId]: {
                    id: objId,
                    type: 'polygon' as const,
                    pointIds,
                    color: `hsl(${Math.random() * 360}, 70%, 50%)`,
                    isReflection: false
                }
            };

            const finalPoints = { ...points, ...newPoints };
            setPoints(finalPoints);
            setObjects(newObjects);
            pushToHistory(finalPoints, newObjects);

            // Switch back to select tool after placing to allow immediate dragging
            setActiveTool('select');
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (activeTool === 'pan' || e.button === 1) {
            setIsPanning(true);
            lastMousePosRef.current = { x: e.clientX, y: e.clientY };
            return;
        }

        if (activeTool === 'select') {
            const svgPos = getSVGPoint(e.clientX, e.clientY);

            // 1. Check if hovering/clicking a point
            let targetPointId = hoveredPointId && points[hoveredPointId] ? hoveredPointId : null;
            if (!targetPointId) {
                const tol = 16 * (viewBox.width / 1200);
                const nearPtEntry = Object.entries(points).find(([_, pt]) =>
                    Math.sqrt(Math.pow(pt.x - svgPos.x, 2) + Math.pow(pt.y - svgPos.y, 2)) < tol
                );
                if (nearPtEntry) {
                    targetPointId = nearPtEntry[0];
                }
            }

            if (targetPointId) {
                setDraggedPointId(targetPointId);
                return;
            }

            // 2. Check if hovering/clicking an object
            let targetObjId = hoveredObjectId;
            if (!targetObjId) {
                const nearObj = findObjectNear(svgPos, 18 * (viewBox.width / 1200));
                if (nearObj && !nearObj.isReflection) {
                    targetObjId = nearObj.id;
                }
            }

            if (targetObjId) {
                const obj = objects[targetObjId];
                if (obj && !obj.isReflection) {
                    dragStartMousePosRef.current = svgPos;
                    const initial: Record<string, { x: number, y: number }> = {};
                    obj.pointIds.forEach(pId => {
                        if (points[pId]) initial[pId] = { x: points[pId].x, y: points[pId].y };
                    });
                    dragStartPointsRef.current = initial;
                    setDraggedObjectId(targetObjId);
                    return;
                }
            }

            // 3. Otherwise canvas pan
            setIsPanning(true);
            lastMousePosRef.current = { x: e.clientX, y: e.clientY };
            return;
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning && svgRef.current) {
            const dx = (e.clientX - lastMousePosRef.current.x) * (viewBox.width / svgRef.current.clientWidth);
            const dy = (e.clientY - lastMousePosRef.current.y) * (viewBox.height / svgRef.current.clientHeight);
            lastMousePosRef.current = { x: e.clientX, y: e.clientY };
            setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
            return;
        }

        if (draggedPointId) {
            const rawPos = getSVGPoint(e.clientX, e.clientY);
            setPoints(prev => {
                if (!prev[draggedPointId]) return prev;
                return {
                    ...prev,
                    [draggedPointId]: { ...prev[draggedPointId], x: rawPos.x, y: rawPos.y }
                };
            });
            return;
        }

        if (draggedObjectId) {
            const currentSVG = getSVGPoint(e.clientX, e.clientY);
            const totalDx = currentSVG.x - dragStartMousePosRef.current.x;
            const totalDy = currentSVG.y - dragStartMousePosRef.current.y;
            const initial = dragStartPointsRef.current;

            setPoints(prev => {
                const next = { ...prev };
                let anyChanged = false;
                Object.keys(initial).forEach(pId => {
                    if (next[pId] && initial[pId]) {
                        next[pId] = {
                            ...next[pId],
                            x: initial[pId].x + totalDx,
                            y: initial[pId].y + totalDy
                        };
                        anyChanged = true;
                    }
                });
                return anyChanged ? next : prev;
            });
            return;
        }

        const rawPos = getSVGPoint(e.clientX, e.clientY);
        let pos = { ...rawPos };

        // Point snapping for drawing tools
        const drawingTools: Tool[] = ['line', 'segment', 'ray', 'polygon', 'regular-polygon'];
        if (drawingTools.includes(activeTool)) {
            const tolerance = 15 * (viewBox.width / 1200);
            const snappingPoint = Object.values(allPoints).find(pt => 
                Math.sqrt(Math.pow(pt.x - pos.x, 2) + Math.pow(pt.y - pos.y, 2)) < tolerance * 1.5
            );
            if (snappingPoint) {
                pos = { x: snappingPoint.x, y: snappingPoint.y };
            }
        }

        // Angle snapping for regular polygon (Shift key)
        if (activeTool === 'regular-polygon' && selection.length === 1) {
            if (e.shiftKey) {
                const p1 = allPoints[selection[0]];
                const dx = pos.x - p1.x;
                const dy = pos.y - p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx);
                const snappedAngle = Math.round(angle / (Math.PI / 12)) * (Math.PI / 12);
                pos.x = p1.x + dist * Math.cos(snappedAngle);
                pos.y = p1.y + dist * Math.sin(snappedAngle);
            }
            setMousePos(pos);
        }

        if (activeTool === 'eraser') {
            const pTol = 18 * (viewBox.width / 1200);
            const pEntry = Object.entries(allPoints).find(([_, pt]) =>
                Math.sqrt(Math.pow(pt.x - pos.x, 2) + Math.pow(pt.y - pos.y, 2)) < pTol
            );
            if (pEntry) {
                setHoveredPointId(pEntry[0]);
                setHoveredObjectId(null);
            } else {
                setHoveredPointId(null);
                const nearObj = findObjectNear(pos, 22 * (viewBox.width / 1200));
                setHoveredObjectId(nearObj ? nearObj.id : null);
            }
        } else {
            const tolerance = 15 * (viewBox.width / 1200);
            const pEntry = Object.entries(allPoints).find(([_, pt]) =>
                Math.sqrt(Math.pow(pt.x - pos.x, 2) + Math.pow(pt.y - pos.y, 2)) < tolerance
            );
            setHoveredPointId(pEntry ? pEntry[0] : null);
        }
    };

    const handleMouseUp = () => {
        if (draggedPointId || draggedObjectId) {
            pushToHistory(points, objects);
        }
        setDraggedPointId(null);
        setDraggedObjectId(null);
        dragStartPointsRef.current = {};
        setIsPanning(false);
    };

    const handleWheel = (e: React.WheelEvent) => {
        const factor = e.deltaY > 0 ? 1.05 : 0.95;
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

    const performZoom = useCallback((factor: number) => {
        setViewBox(prev => {
            const newWidth = prev.width * factor;
            const newHeight = prev.height * factor;
            if (newWidth > 10000 || newWidth < 100) return prev;

            // Zoom towards center of current view
            const dx = (newWidth - prev.width) / 2;
            const dy = (newHeight - prev.height) / 2;

            return {
                x: prev.x - dx,
                y: prev.y - dy,
                width: newWidth,
                height: newHeight
            };
        });
    }, []);

    const zoomIn = () => performZoom(0.9);
    const zoomOut = () => performZoom(1.1);

    // --- Rendering ---

    const renderGrid = () => {
        if (background === 'blank') return null;
        const lines = [];
        const startX = Math.floor(viewBox.x / GRID_SIZE) * GRID_SIZE;
        const endX = Math.ceil((viewBox.x + viewBox.width) / GRID_SIZE) * GRID_SIZE;
        const startY = Math.floor(viewBox.y / GRID_SIZE) * GRID_SIZE;
        const endY = Math.ceil((viewBox.y + viewBox.height) / GRID_SIZE) * GRID_SIZE;

        for (let x = startX; x <= endX; x += GRID_SIZE) {
            lines.push(<line key={`v-${x}`} x1={x} y1={startY} x2={x} y2={endY} stroke="#cbd5e1" strokeWidth={1 * (viewBox.width / 1200)} />);
        }
        for (let y = startY; y <= endY; y += GRID_SIZE) {
            lines.push(<line key={`h-${y}`} x1={startX} y1={y} x2={endX} y2={y} stroke="#cbd5e1" strokeWidth={1 * (viewBox.width / 1200)} />);
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

    const renderPolygonAngles = (obj: GeometryObject, pts: { x: number, y: number, id?: string }[]) => {
        const n = pts.length;
        if (n < 3) return null;

        // Calculate signed area to know winding direction (CW vs CCW in SVG screen coordinates)
        let signedArea = 0;
        for (let i = 0; i < n; i++) {
            const curr = pts[i];
            const next = pts[(i + 1) % n];
            signedArea += curr.x * next.y - next.x * curr.y;
        }
        signedArea /= 2;
        const isCW = signedArea > 0;

        const scale = viewBox.width / 1200;
        const baseR = 26 * scale;

        return (
            <g key={`angles-${obj.id}`} className="pointer-events-none select-none">
                {pts.map((p, i) => {
                    const prev = pts[(i - 1 + n) % n];
                    const next = pts[(i + 1) % n];

                    const v1 = { x: prev.x - p.x, y: prev.y - p.y };
                    const v2 = { x: next.x - p.x, y: next.y - p.y };

                    const len1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
                    const len2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

                    if (len1 < 5 || len2 < 5) return null;

                    const theta1 = Math.atan2(v1.y, v1.x);
                    const theta2 = Math.atan2(v2.y, v2.x);

                    // Clockwise sweep in SVG screen coordinates
                    const startAngle = isCW ? theta2 : theta1;
                    const endAngle = isCW ? theta1 : theta2;

                    let sweepRad = endAngle - startAngle;
                    while (sweepRad < 0) sweepRad += 2 * Math.PI;
                    while (sweepRad >= 2 * Math.PI) sweepRad -= 2 * Math.PI;

                    const angleDeg = (sweepRad * 180) / Math.PI;
                    if (angleDeg < 0.5 || angleDeg > 359.5) return null;

                    const R = Math.max(12 * scale, Math.min(baseR, len1 * 0.38, len2 * 0.38));
                    const bisectorAngle = startAngle + sweepRad / 2;

                    const isRightAngle = Math.abs(angleDeg - 90) < 0.5;

                    const xs = p.x + R * Math.cos(startAngle);
                    const ys = p.y + R * Math.sin(startAngle);
                    const xe = p.x + R * Math.cos(startAngle + sweepRad);
                    const ye = p.y + R * Math.sin(startAngle + sweepRad);
                    const largeArc = sweepRad > Math.PI ? 1 : 0;

                    const textDist = R + 13 * scale;
                    const textX = p.x + textDist * Math.cos(bisectorAngle);
                    const textY = p.y + textDist * Math.sin(bisectorAngle);

                    const angleText = isRightAngle
                        ? '90°'
                        : (Math.abs(angleDeg - Math.round(angleDeg)) < 0.05
                            ? `${Math.round(angleDeg)}°`
                            : `${angleDeg.toFixed(1)}°`);

                    return (
                        <g key={`ang-${obj.id}-${i}`}>
                            {/* Sector background */}
                            <path
                                d={`M ${p.x} ${p.y} L ${xs} ${ys} A ${R} ${R} 0 ${largeArc} 1 ${xe} ${ye} Z`}
                                fill="#f59e0b"
                                fillOpacity={0.16}
                                stroke="none"
                            />
                            {/* Arc line */}
                            <path
                                d={`M ${xs} ${ys} A ${R} ${R} 0 ${largeArc} 1 ${xe} ${ye}`}
                                fill="none"
                                stroke="#d97706"
                                strokeWidth={1.5 * scale}
                            />
                            {/* Hungarian right angle symbol: negyedkörben egy pont */}
                            {isRightAngle && (
                                <circle
                                    cx={p.x + (R * 0.5) * Math.cos(bisectorAngle)}
                                    cy={p.y + (R * 0.5) * Math.sin(bisectorAngle)}
                                    r={2.3 * scale}
                                    fill="#b45309"
                                />
                            )}
                            {/* Degree text label */}
                            <text
                                x={textX}
                                y={textY}
                                fill="#92400e"
                                fontSize={11 * scale}
                                fontWeight="bold"
                                textAnchor="middle"
                                dominantBaseline="central"
                                stroke="white"
                                strokeWidth={2.5 * scale}
                                paintOrder="stroke"
                            >
                                {angleText}
                            </text>
                        </g>
                    );
                })}
            </g>
        );
    };

    const renderObject = (obj: GeometryObject) => {
        const pts = obj.pointIds.map(id => allPoints[id]).filter(Boolean);
        if (pts.length === 0) return null;

        // Check if this is an axis and should be hidden
        const isAxis = Object.values(objects).some(o => o.isReflection && o.reflectionRefId === obj.id);
        if (isAxis && !showAxes) return null;
        const isReflecting = reflectingObjectId === obj.id;
        const sw = 3 * (viewBox.width / 1200);
        const isEraserHover = activeTool === 'eraser' && hoveredObjectId === obj.id;

        const baseEvents = {
            onMouseEnter: () => setHoveredObjectId(obj.id),
            onMouseLeave: () => setHoveredObjectId(null),
            onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                handleObjectClick(obj.id);
            }
        };

        // Invisible large hit area for effortless clicking and hovering
        const hitAreaProps = {
            ...baseEvents,
            stroke: "transparent",
            strokeWidth: 24 * (viewBox.width / 1200),
            fill: "transparent",
            pointerEvents: "all" as const,
            className: "cursor-pointer"
        };

        const visColor = isEraserHover ? "#ef4444" : obj.color;
        const visStrokeWidth = isEraserHover ? sw + 2.5 : (isReflecting ? sw + 3 : sw);

        const props = {
            ...baseEvents,
            className: cn(
                "cursor-pointer",
                isReflecting && "stroke-yellow-400 stroke-[6]",
                isEraserHover && "stroke-red-500",
                activeTool !== 'eraser' && !isReflecting && "hover:stroke-blue-400/50"
            )
        };

        switch (obj.type) {
            case 'point': return null;
            case 'line':
                if (pts.length < 2) return null;
                const dx = pts[1].x - pts[0].x, dy = pts[1].y - pts[0].y;
                const len = Math.sqrt(dx * dx + dy * dy);
                const ux = dx / len, uy = dy / len;
                const x1 = pts[0].x - ux * 10000, y1 = pts[0].y - uy * 10000;
                const x2 = pts[0].x + ux * 10000, y2 = pts[0].y + uy * 10000;
                const lineLabelX = pts[1].x + ux * 30 * (viewBox.width / 1200) - uy * 15 * (viewBox.width / 1200);
                const lineLabelY = pts[1].y + uy * 30 * (viewBox.width / 1200) + ux * 15 * (viewBox.width / 1200);
                return (
                    <g key={obj.id}>
                        <line {...hitAreaProps} x1={x1} y1={y1} x2={x2} y2={y2} pointerEvents="stroke" />
                        <line {...props} x1={x1} y1={y1} x2={x2} y2={y2} stroke={visColor} strokeWidth={visStrokeWidth} />
                        {obj.label && showLineLabels && (
                            <text
                                x={lineLabelX} y={lineLabelY} fill={visColor} fontSize={18 * (viewBox.width / 1200)}
                                fontFamily="serif" fontStyle="italic" className="pointer-events-none select-none"
                            >
                                {obj.label}
                            </text>
                        )}
                    </g>
                );
            case 'segment':
                if (pts.length < 2) return null;
                const segMidX = (pts[0].x + pts[1].x) / 2;
                const segMidY = (pts[0].y + pts[1].y) / 2;
                const sDx = pts[1].x - pts[0].x, sDy = pts[1].y - pts[0].y;
                const sLen = Math.sqrt(sDx * sDx + sDy * sDy);
                const sUx = sDx / sLen, sUy = sDy / sLen;
                const segLabelX = segMidX - sUy * 15 * (viewBox.width / 1200);
                const segLabelY = segMidY + sUx * 15 * (viewBox.width / 1200);
                return (
                    <g key={obj.id}>
                        <line {...hitAreaProps} x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} pointerEvents="stroke" />
                        <line {...props} x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} stroke={visColor} strokeWidth={visStrokeWidth} />
                        {obj.label && showLineLabels && (
                            <text
                                x={segLabelX} y={segLabelY} fill={visColor} fontSize={18 * (viewBox.width / 1200)}
                                fontFamily="serif" fontStyle="italic" className="pointer-events-none select-none"
                            >
                                {obj.label}
                            </text>
                        )}
                        {showDistances && (
                            <text
                                x={segMidX + sUy * 15 * (viewBox.width / 1200)}
                                y={segMidY - sUx * 15 * (viewBox.width / 1200)}
                                fill="#b45309" fontSize={14 * (viewBox.width / 1200)}
                                fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none"
                            >
                                {parseFloat((sLen / GRID_SIZE).toFixed(1))}
                            </text>
                        )}
                    </g>
                );
            case 'ray': {
                if (pts.length < 2) return null;
                const rDx = pts[1].x - pts[0].x, rDy = pts[1].y - pts[0].y;
                const rLen = Math.sqrt(rDx * rDx + rDy * rDy);
                if (rLen < 0.001) return null;
                const rUx = rDx / rLen, rUy = rDy / rLen;
                const rx1 = pts[0].x, ry1 = pts[0].y;
                const rx2 = pts[0].x + rUx * 20000, ry2 = pts[0].y + rUy * 20000;
                const rayLabelX = pts[1].x + rUx * 25 * (viewBox.width / 1200) - rUy * 15 * (viewBox.width / 1200);
                const rayLabelY = pts[1].y + rUy * 25 * (viewBox.width / 1200) + rUx * 15 * (viewBox.width / 1200);
                return (
                    <g key={obj.id}>
                        <line {...hitAreaProps} x1={rx1} y1={ry1} x2={rx2} y2={ry2} pointerEvents="stroke" />
                        <line {...props} x1={rx1} y1={ry1} x2={rx2} y2={ry2} stroke={visColor} strokeWidth={visStrokeWidth} />
                        {obj.label && showLineLabels && (
                            <text
                                x={rayLabelX} y={rayLabelY} fill={visColor} fontSize={18 * (viewBox.width / 1200)}
                                fontFamily="serif" fontStyle="italic" className="pointer-events-none select-none"
                            >
                                {obj.label}
                            </text>
                        )}
                    </g>
                );
            }
            case 'polygon':
            case 'regular-polygon':
                if (pts.length < 3) return null;
                const d = `M ${pts.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;
                return (
                    <g key={obj.id}>
                        <path {...hitAreaProps} d={d} pointerEvents="all" />
                        <path
                            {...props}
                            d={d}
                            fill={isEraserHover ? "#ef4444" : obj.color}
                            fillOpacity={isEraserHover ? 0.35 : 0.15}
                            stroke={visColor}
                            strokeWidth={visStrokeWidth}
                            strokeLinejoin="round"
                        />
                        {showAngles && renderPolygonAngles(obj, pts)}
                        {showDistances && pts.map((p, i) => {
                            const p1 = p;
                            const p2 = pts[(i + 1) % pts.length];
                            const midX = (p1.x + p2.x) / 2;
                            const midY = (p1.y + p2.y) / 2;
                            const dx = p2.x - p1.x, dy = p2.y - p1.y;
                            const len = Math.sqrt(dx * dx + dy * dy);
                            if (len < 5) return null;
                            const ux = dx / len, uy = dy / len;
                            // Offset towards outside? For polygon it's tricky. Let's just offset slightly.
                            return (
                                <text
                                    key={`dist-${obj.id}-${i}`}
                                    x={midX + uy * 15 * (viewBox.width / 1200)}
                                    y={midY - ux * 15 * (viewBox.width / 1200)}
                                    fill="#b45309" fontSize={13 * (viewBox.width / 1200)}
                                    fontWeight="bold" textAnchor="middle" className="pointer-events-none select-none"
                                >
                                    {parseFloat((len / GRID_SIZE).toFixed(1))}
                                </text>
                            );
                        })}
                    </g>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-white z-[60] flex flex-col">
            {/* Minimal Exit Button */}
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-[70] bg-white/50 hover:bg-white shadow-md rounded-full" onClick={onBack}>
                <X className="w-5 h-5" />
            </Button>

            {/* Float Toolbar (Central Top) */}
            <div
                className="absolute top-4 left-1/2 -translate-x-1/2 z-[70] flex items-center gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-2xl overflow-x-auto max-w-[90vw]"
                onClick={e => e.stopPropagation()}
            >
                <Button variant={activeTool === 'select' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTool('select')} className="rounded-xl px-4">
                    <MousePointer2 className="w-4 h-4 mr-2 text-blue-500" /> Mozgatás
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={(activeTool === 'point' || activeTool === 'line' || activeTool === 'segment' || activeTool === 'ray') ? 'secondary' : 'ghost'}
                            size="sm"
                            className="rounded-xl px-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (activeTool !== 'point' && activeTool !== 'line' && activeTool !== 'segment' && activeTool !== 'ray') {
                                    setActiveTool('point');
                                    setSelection([]);
                                }
                            }}
                        >
                            <Dot className="w-4 h-4 mr-2" /> Pontok <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="z-[100]">
                        <DropdownMenuItem onClick={() => { setActiveTool('point'); setSelection([]); }}>
                            <Dot className="w-4 h-4 mr-2 text-blue-500" /> Pont lehelyezése
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveTool('segment'); setSelection([]); }}>
                            <Minus className="w-4 h-4 mr-2 text-slate-700" /> Szakasz rajzolása
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveTool('ray'); setSelection([]); }}>
                            <span className="w-4 h-4 mr-2 flex items-center justify-center text-slate-700">
                                <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
                                    <circle cx="3" cy="8" r="2.5" />
                                    <line x1="3" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </span>
                            Félegyenes rajzolása
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveTool('line'); setSelection([]); }}>
                            <Minus className="w-4 h-4 mr-2 text-slate-700" /> Egyenes rajzolása
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={(activeTool === 'polygon' || activeTool === 'regular-polygon') ? 'secondary' : 'ghost'}
                            size="sm"
                            className="rounded-xl px-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (activeTool !== 'polygon' && activeTool !== 'regular-polygon') {
                                    setActiveTool('polygon');
                                    setSelection([]);
                                }
                            }}
                        >
                            <ShapesIcon className="w-4 h-4 mr-2" /> Alakzatok <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="z-[100]">
                        <DropdownMenuItem onClick={() => { setActiveTool('polygon'); setSelection([]); }}>
                            <Square className="w-4 h-4 mr-2 text-indigo-500" /> Szabad sokszög
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveTool('regular-polygon'); setSelection([]); }} className="flex gap-2 items-center">
                            <Hexagon className="w-4 h-4 mr-2 text-indigo-500" /> Szabályos sokszög
                            <input 
                                type="number" 
                                min="3" 
                                max="20" 
                                value={regularPolygonSides} 
                                onClick={e => e.stopPropagation()} 
                                onChange={e => setRegularPolygonSides(Number(e.target.value))} 
                                className="w-12 h-7 border border-slate-300 rounded text-center text-xs ml-auto bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={(activeTool === 'special-shape') ? 'secondary' : 'ghost'}
                            size="sm"
                            className="rounded-xl px-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (activeTool !== 'special-shape') {
                                    setActiveTool('special-shape');
                                    setSelection([]);
                                }
                            }}
                        >
                            <Star className="w-4 h-4 mr-2 text-yellow-500" /> Speciális <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="z-[100] grid grid-cols-2 gap-1 p-2">
                        {(Object.keys(SPECIAL_SHAPES) as SpecialShapeType[]).map((shapeKey) => {
                            const icons: Record<SpecialShapeType, React.ReactNode> = {
                                heart: <Heart className="w-4 h-4 text-rose-500" />,
                                star: <Star className="w-4 h-4 text-yellow-500" />,
                                cross: <Plus className="w-4 h-4 text-slate-700" />,
                                arrow: <Navigation className="w-4 h-4 text-blue-500" />,
                                house: <Home className="w-4 h-4 text-orange-500" />,
                                pine: <TreePine className="w-4 h-4 text-emerald-600" />,
                                lightning: <Zap className="w-4 h-4 text-amber-500" />,
                                cloud: <Cloud className="w-4 h-4 text-sky-400" />,
                                butterfly: <ShapesIcon className="w-4 h-4 text-purple-500" />,
                                anchor: <Anchor className="w-4 h-4 text-slate-800" />
                            };
                            const labels: Record<SpecialShapeType, string> = {
                                heart: 'Szív', star: 'Csillag', cross: 'Kereszt', arrow: 'Nyíl',
                                house: 'Ház', pine: 'Fenyő', lightning: 'Villám', cloud: 'Felhő',
                                butterfly: 'Pillangó', anchor: 'Horgony'
                            };
                            return (
                                <DropdownMenuItem
                                    key={shapeKey}
                                    onClick={() => {
                                        setActiveSpecialShape(shapeKey);
                                        setActiveTool('special-shape');
                                        setSelection([]);
                                    }}
                                    className="cursor-pointer flex items-center gap-2"
                                >
                                    {icons[shapeKey]} <span className="text-xs">{labels[shapeKey]}</span>
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-6 w-px bg-slate-200 mx-1" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={(showReflectionLines || showReflectionDistances || showDistances || showAngles || !showAxes || !showPointLabels || !showLineLabels) ? 'secondary' : 'ghost'}
                            size="sm"
                            className={cn("rounded-xl px-4", (showReflectionLines || showReflectionDistances || showDistances || showAngles) ? "text-blue-600 bg-blue-50" : "text-slate-600")}
                            title="Megjelenítési beállítások"
                        >
                            <Eye className="w-4 h-4 mr-2" /> Megjelenítés <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="z-[100] p-2 min-w-[220px]">
                        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Segédvonalak</div>
                        <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); setShowReflectionLines(!showReflectionLines); }}
                            className="flex items-center justify-between"
                        >
                            <span>Tükrözési segédvonalak</span>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center", showReflectionLines ? "bg-green-500 border-green-500" : "border-slate-300")}>
                                {showReflectionLines && <X className="w-3 h-3 text-white" />}
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); setShowAxes(!showAxes); }}
                            className="flex items-center justify-between"
                        >
                            <span>Tükrözési tengelyek</span>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center", showAxes ? "bg-green-500 border-green-500" : "border-slate-300")}>
                                {showAxes && <X className="w-3 h-3 text-white" />}
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); setShowReflectionDistances(!showReflectionDistances); }}
                            className="flex items-center justify-between"
                        >
                            <span>Tükrözési távolságok</span>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center", showReflectionDistances ? "bg-green-500 border-green-500" : "border-slate-300")}>
                                {showReflectionDistances && <X className="w-3 h-3 text-white" />}
                            </div>
                        </DropdownMenuItem>

                        <div className="h-px bg-slate-100 my-1 mx-1" />
                        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Mérések és Nevek</div>
                        
                        <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); setShowDistances(!showDistances); }}
                            className="flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <Ruler className="w-3.5 h-3.5" /> Távolságok
                            </span>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center", showDistances ? "bg-amber-500 border-amber-500" : "border-slate-300")}>
                                {showDistances && <X className="w-3 h-3 text-white" />}
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); setShowAngles(!showAngles); }}
                            className="flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                                    <line x1="2" y1="14" x2="14" y2="14" />
                                    <line x1="2" y1="14" x2="11" y2="3" />
                                    <path d="M 6 14 A 4 4 0 0 0 5 10.5" />
                                </svg>
                                Szögek
                            </span>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center", showAngles ? "bg-amber-500 border-amber-500" : "border-slate-300")}>
                                {showAngles && <X className="w-3 h-3 text-white" />}
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                            onClick={(e) => {
                                e.stopPropagation();
                                const nextVal = !(showCoordinates && background === 'coordinate');
                                setShowCoordinates(nextVal);
                                if (nextVal && background !== 'coordinate') {
                                    setBackground('coordinate');
                                }
                            }}
                            className="flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <Hash className="w-3.5 h-3.5 text-blue-600" /> Koordináták
                            </span>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center", (showCoordinates && background === 'coordinate') ? "bg-blue-500 border-blue-500" : "border-slate-300")}>
                                {showCoordinates && background === 'coordinate' && <X className="w-3 h-3 text-white" />}
                            </div>
                        </DropdownMenuItem>

                        <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); setShowPointLabels(!showPointLabels); }}
                            className="flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <Type className="w-3.5 h-3.5" /> Pontok nevei
                            </span>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center", showPointLabels ? "bg-blue-500 border-blue-500" : "border-slate-300")}>
                                {showPointLabels && <X className="w-3 h-3 text-white" />}
                            </div>
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem 
                            onClick={(e) => { e.stopPropagation(); setShowLineLabels(!showLineLabels); }}
                            className="flex items-center justify-between"
                        >
                            <span className="flex items-center gap-2">
                                <Type className="w-3.5 h-3.5" /> Vonalak nevei
                            </span>
                            <div className={cn("w-4 h-4 rounded border flex items-center justify-center", showLineLabels ? "bg-blue-500 border-blue-500" : "border-slate-300")}>
                                {showLineLabels && <X className="w-3 h-3 text-white" />}
                            </div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-6 w-px bg-slate-200 mx-1" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={(activeTool === 'axial-reflect' || activeTool === 'central-reflect') ? 'secondary' : 'ghost'}
                            size="sm"
                            className="rounded-xl px-4 text-green-700"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (activeTool !== 'axial-reflect' && activeTool !== 'central-reflect') {
                                    setActiveTool('axial-reflect');
                                    setReflectingObjectId(null);
                                }
                            }}
                        >
                            <Copy className="w-4 h-4 mr-2" /> Tükrözés <ChevronDown className="w-3 h-3 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="z-[100]">
                        <DropdownMenuItem onClick={() => { setActiveTool('axial-reflect'); setSelection([]); }}>
                            <Copy className="w-4 h-4 mr-2 text-green-600" /> Tengelyes tükrözés
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setActiveTool('central-reflect'); setSelection([]); }}>
                            <Crosshair className="w-4 h-4 mr-2 text-green-600" /> Középpontos tükrözés
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-6 w-px bg-slate-200 mx-1" />

                <Button
                    variant="ghost"
                    size="sm"
                    onClick={undo}
                    disabled={historyIndex < 0}
                    className="rounded-xl px-4 text-slate-600 disabled:opacity-30"
                >
                    <Undo2 className="w-4 h-4 mr-2" /> Vissza
                </Button>

                <div className="h-6 w-px bg-slate-200 mx-1" />

                <Button variant={activeTool === 'eraser' ? 'default' : 'ghost'} size="sm" onClick={() => setActiveTool('eraser')} className={cn("rounded-xl px-4 transition-colors", activeTool === 'eraser' ? "bg-red-500 hover:bg-red-600 text-white" : "text-red-500 hover:bg-red-50")}>
                    <Eraser className="w-4 h-4 mr-2" /> Radír
                </Button>
                <Button variant="ghost" size="sm" onClick={() => { setPoints({}); setObjects({}); setSelection([]); }} className="rounded-xl px-4 text-slate-500 hover:text-red-600">
                    <Trash2 className="w-4 h-4 mr-2" /> Összes törlése
                </Button>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 w-full relative overflow-hidden bg-slate-50">
                <svg
                    ref={svgRef}
                    className={cn("w-full h-full bg-white", activeTool === 'pan' || isPanning ? "cursor-grabbing" : (activeTool === 'eraser' ? "cursor-pointer" : "cursor-crosshair"))}
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
                    
                    {/* Reflection Guides & Reflection Distances */}
                    {(showReflectionLines || showReflectionDistances) && Object.values(objects).map(obj => {
                        if (!obj.isReflection || !obj.reflectionSourceId) return null;
                        const sourceObj = objects[obj.reflectionSourceId];
                        if (!sourceObj) return null;

                        const scale = viewBox.width / 1200;

                        return obj.pointIds.map((pId, idx) => {
                            const pSource = allPoints[sourceObj.pointIds[idx]];
                            const pTarget = allPoints[pId];
                            if (!pSource || !pTarget) return null;

                            const dx = pTarget.x - pSource.x;
                            const dy = pTarget.y - pSource.y;
                            const totalLen = Math.sqrt(dx * dx + dy * dy);
                            if (totalLen < 1) return null;

                            const ux = dx / totalLen;
                            const uy = dy / totalLen;
                            // Perpendicular unit vector for offset
                            const nx = -uy;
                            const ny = ux;

                            // Midpoint on axis or reflection center
                            const midX = (pSource.x + pTarget.x) / 2;
                            const midY = (pSource.y + pTarget.y) / 2;

                            // Distance from point to axis/center in grid units
                            const distPx = totalLen / 2;
                            const distGrid = distPx / GRID_SIZE;
                            const distFormatted = Math.abs(distGrid - Math.round(distGrid)) < 0.05
                                ? Math.round(distGrid).toString()
                                : parseFloat(distGrid.toFixed(1)).toString();

                            // Subsegment 1 midpoint (source to axis/center)
                            const m1X = (pSource.x + midX) / 2;
                            const m1Y = (pSource.y + midY) / 2;

                            // Subsegment 2 midpoint (axis/center to target)
                            const m2X = (midX + pTarget.x) / 2;
                            const m2Y = (midY + pTarget.y) / 2;

                            // Text offset perpendicular to guide line
                            const textOffset = 13 * scale;
                            const t1X = m1X + nx * textOffset;
                            const t1Y = m1Y + ny * textOffset;
                            const t2X = m2X + nx * textOffset;
                            const t2Y = m2Y + ny * textOffset;

                            return (
                                <g key={`guide-group-${obj.id}-${idx}`} className="pointer-events-none select-none">
                                    {/* Dashed guide line */}
                                    <line
                                        x1={pSource.x} y1={pSource.y}
                                        x2={pTarget.x} y2={pTarget.y}
                                        stroke="#94a3b8"
                                        strokeWidth={1.5 * scale}
                                        strokeDasharray="5,5"
                                        className="opacity-70"
                                    />
                                    {/* Reflection Distances (both values equal) */}
                                    {showReflectionDistances && totalLen > 10 && (
                                        <>
                                            {/* Midpoint tick marker on axis/center */}
                                            <line
                                                x1={midX - nx * 4 * scale}
                                                y1={midY - ny * 4 * scale}
                                                x2={midX + nx * 4 * scale}
                                                y2={midY + ny * 4 * scale}
                                                stroke="#15803d"
                                                strokeWidth={1.5 * scale}
                                            />
                                            {/* Distance: Source point to axis/center */}
                                            <text
                                                x={t1X}
                                                y={t1Y}
                                                fill="#15803d"
                                                fontSize={12 * scale}
                                                fontWeight="bold"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                stroke="white"
                                                strokeWidth={2.5 * scale}
                                                paintOrder="stroke"
                                            >
                                                {distFormatted}
                                            </text>
                                            {/* Distance: Axis/center to target point */}
                                            <text
                                                x={t2X}
                                                y={t2Y}
                                                fill="#15803d"
                                                fontSize={12 * scale}
                                                fontWeight="bold"
                                                textAnchor="middle"
                                                dominantBaseline="central"
                                                stroke="white"
                                                strokeWidth={2.5 * scale}
                                                paintOrder="stroke"
                                            >
                                                {distFormatted}
                                            </text>
                                        </>
                                    )}
                                </g>
                            );
                        });
                    })}

                    {Object.entries(allPoints).map(([id, p]) => {
                        const isEraserPointHover = activeTool === 'eraser' && hoveredPointId === id;
                        const ptRadius = (isEraserPointHover ? 9 : (hoveredPointId === id || draggedPointId === id ? 8 : 5)) * (viewBox.width / 1200);
                        return (
                            <g key={id}>
                                {/* Large invisible hit area for effortless clicking and hovering on points */}
                                <circle
                                    cx={p.x} cy={p.y}
                                    r={18 * (viewBox.width / 1200)}
                                    fill="transparent"
                                    stroke="transparent"
                                    pointerEvents={(['eraser', 'axial-reflect', 'central-reflect', 'select', 'polygon', 'line', 'segment', 'ray'].includes(activeTool)) ? 'all' : (points[id] ? 'all' : 'none')}
                                    className={cn(
                                        activeTool === 'eraser' ? "cursor-pointer" : (activeTool === 'select' && points[id] ? "cursor-move" : "cursor-crosshair")
                                    )}
                                    onMouseEnter={() => setHoveredPointId(id)}
                                    onMouseLeave={() => setHoveredPointId(null)}
                                    onClick={(e) => {
                                        if (activeTool === 'eraser') {
                                            e.stopPropagation();
                                            handlePointEraser(id);
                                        } else if (activeTool === 'axial-reflect' || activeTool === 'central-reflect') {
                                            e.stopPropagation();
                                            let objId = Object.keys(objects).find(k => objects[k].type === 'point' && objects[k].pointIds[0] === id);
                                            if (!objId) {
                                                if (points[id]) {
                                                    objId = `obj-pt-${Date.now()}`;
                                                    const newObjects = {
                                                        ...objects,
                                                        [objId]: { id: objId, type: 'point' as const, pointIds: [id], color: '#3b82f6', isReflection: false }
                                                    };
                                                    setObjects(newObjects);
                                                    handleObjectClick(objId);
                                                }
                                            } else {
                                                handleObjectClick(objId);
                                            }
                                        }
                                    }}
                                />
                                {/* Visible point circle */}
                                <circle
                                    cx={p.x} cy={p.y}
                                    r={ptRadius}
                                    fill={isEraserPointHover ? "#ef4444" : (draggedPointId === id ? "#3b82f6" : (points[id] ? "#1e40af" : "#6366f1"))}
                                    fillOpacity={points[id] || isEraserPointHover ? 1 : 0.6}
                                    stroke={isEraserPointHover ? "#ffffff" : (reflectingObjectId && objects[reflectingObjectId]?.pointIds[0] === id ? "#facc15" : "none")}
                                    strokeWidth={isEraserPointHover ? 2 * (viewBox.width / 1200) : (reflectingObjectId && objects[reflectingObjectId]?.pointIds[0] === id ? 4 : 0)}
                                    className="pointer-events-none"
                                />
                                {(() => {
                                    const shouldShowLabel = Boolean(p.label && showPointLabels);
                                    const shouldShowCoord = Boolean(showCoordinates && background === 'coordinate');
                                    if (!shouldShowLabel && !shouldShowCoord) return null;

                                    const scale = viewBox.width / 1200;
                                    const mathX = p.x / GRID_SIZE;
                                    const mathY = -p.y / GRID_SIZE;

                                    const formatCoord = (val: number) => {
                                        let rounded = Math.round(val);
                                        if (Math.abs(val - rounded) < 0.05) {
                                            if (rounded === 0 || Object.is(rounded, -0)) rounded = 0;
                                            return rounded.toString();
                                        }
                                        let fixed = parseFloat(val.toFixed(1));
                                        if (fixed === 0 || Object.is(fixed, -0)) fixed = 0;
                                        return fixed.toString().replace('.', ',');
                                    };

                                    const coordStr = `(${formatCoord(mathX)}; ${formatCoord(mathY)})`;

                                    return (
                                        <text
                                            x={p.x + 10 * scale}
                                            y={p.y - 10 * scale}
                                            fontSize={16 * scale}
                                            fill={isEraserPointHover ? "#ef4444" : (points[id] ? "#1e40af" : "#6366f1")}
                                            stroke="white"
                                            strokeWidth={2.5 * scale}
                                            paintOrder="stroke"
                                            className="pointer-events-none select-none"
                                        >
                                            {shouldShowLabel && (
                                                <tspan fontFamily="serif" fontStyle="italic" fontWeight="bold">
                                                    {p.label}
                                                </tspan>
                                            )}
                                            {shouldShowCoord && (
                                                <tspan
                                                    fontFamily="sans-serif"
                                                    fontStyle="normal"
                                                    fontWeight="600"
                                                    fontSize={13 * scale}
                                                    dx={shouldShowLabel ? 3 * scale : 0}
                                                >
                                                    {coordStr}
                                                </tspan>
                                            )}
                                        </text>
                                    );
                                })()}
                            </g>
                        );
                    })}
                    {/* Ghost preview for regular polygon */}
                    {activeTool === 'regular-polygon' && selection.length === 1 && (
                        <g className="pointer-events-none opacity-30">
                            {(() => {
                                const p1 = allPoints[selection[0]];
                                const p2 = mousePos;
                                const pts = calculateRegularPolygonPoints(p1, p2, regularPolygonSides);
                                const d = `M ${pts.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;
                                return <path d={d} fill="blue" stroke="blue" strokeWidth={2} />;
                            })()}
                        </g>
                    )}

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

                {/* Overlays */}
                <div className="absolute top-4 right-4 z-[80]">
                    <Button variant="secondary" size="icon" onClick={() => setViewBox({ x: -600, y: -400, width: 1200, height: 800 })} className="shadow-xl bg-white/90 hover:bg-white rounded-2xl" title="Visszaállítás">
                        <RefreshCw className="w-4 h-4" />
                    </Button>
                </div>

                <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-[80] items-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm" className="shadow-xl bg-white/90 hover:bg-white rounded-2xl px-4 py-6 border-slate-200">
                                <Settings className="w-5 h-5 mr-2 text-slate-600" /> Háttér
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="z-[100] rounded-xl p-2 min-w-[160px]">
                            <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => setBackground('blank')}>Üres</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => setBackground('grid')}>Négyzetrács</DropdownMenuItem>
                            <DropdownMenuItem className="rounded-lg cursor-pointer" onClick={() => setBackground('coordinate')}>Koordinátarendszer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="flex flex-col gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 shadow-2xl">
                        <Button variant="ghost" size="icon" onClick={zoomIn} className="rounded-xl h-12 w-12 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all" title="Nagyítás">
                            <ZoomIn className="w-6 h-6" />
                        </Button>
                        <div className="h-px bg-slate-100 mx-2" />
                        <Button variant="ghost" size="icon" onClick={zoomOut} className="rounded-xl h-12 w-12 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all" title="Kicsinyítés">
                            <ZoomOut className="w-6 h-6" />
                        </Button>
                    </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 shadow-xl pointer-events-none text-sm font-medium text-slate-600 z-[80]">
                    {activeTool === 'select' && "💡 Mozgasd a kék pontokat a szerkesztéshez."}
                    {activeTool === 'ray' && selection.length === 0 && "📍 Kattints a félegyenes kezdőpontjára."}
                    {activeTool === 'ray' && selection.length === 1 && "🧭 Kattints a félegyenes irányát kijelölő pontra."}
                    {activeTool === 'polygon' && selection.length > 0 && "🎯 Kattints az első pontra a sokszög bezárásához."}
                    {activeTool === 'regular-polygon' && selection.length === 1 && "📐 Mozgasd az egeret a mérethez (Shift: szög-tapadás)."}
                    {activeTool === 'axial-reflect' && (!reflectingObjectId ? "📐 Válassz egy alakzatot tükrözéshez." : "📏 Jelöld ki a tengelyt (egyenest).")}
                    {activeTool === 'eraser' && "🧹 Kattints egy alakzatra vagy pontra a törléshez."}
                    {selection.length > 0 && !reflectingObjectId && activeTool !== 'regular-polygon' && `✨ Kijelölve: ${selection.length} pont`}
                    {(!activeTool || (activeTool === 'select' && selection.length === 0)) && "🚀 Válassz egy eszközt a fenti menüből!"}
                </div>
            </div>
        </div>
    );
}
