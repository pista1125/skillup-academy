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

type GeometryType = 'point' | 'line' | 'segment' | 'polygon' | 'regular-polygon';

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

type Tool = 'select' | 'point' | 'line' | 'segment' | 'polygon' | 'regular-polygon' | 'special-shape' | 'axial-reflect' | 'central-reflect' | 'eraser' | 'pan';

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
    const [showPointLabels, setShowPointLabels] = useState(true);
    const [showLineLabels, setShowLineLabels] = useState(true);
    const [showDistances, setShowDistances] = useState(false);
    const [showAxes, setShowAxes] = useState(true);

    // View State (Pan & Zoom)
    const [viewBox, setViewBox] = useState({ x: -600, y: -400, width: 1200, height: 800 });
    const [isPanning, setIsPanning] = useState(false);
    const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
    const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [draggedObjectId, setDraggedObjectId] = useState<string | null>(null);
    const [initialDragPoints, setInitialDragPoints] = useState<Record<string, { x: number, y: number }>>({});

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
            if ((obj.type === 'line' || obj.type === 'segment') && obj.label && obj.label.length === 1 && obj.label >= 'e' && obj.label <= 'z') {
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
        let result: Record<string, Point> = { ...points };

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

    // --- Interaction Handlers ---

    const handleCanvasClick = (e: React.MouseEvent) => {
        if (draggedPointId || isPanning) return;
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
                const newObjects = {
                    ...objects,
                    [id]: { id, type: 'line' as const, pointIds: [selection[0], clickedPointId!], color: 'black', isReflection: false }
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
                const newObjects = {
                    ...objects,
                    [id]: { id, type: 'segment' as const, pointIds: [selection[0], clickedPointId!], color: 'black', isReflection: false }
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
            let tempPoints = { ...points };
            let tempObjects = { ...objects };

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
                const obj = newObjects[id];
                delete newObjects[id];

                // If it's a 'point' object, check if the point itself should be removed
                if (obj.type === 'point') {
                    const pId = obj.pointIds[0];
                    if (!Object.values(newObjects).some(o => o.pointIds.includes(pId))) {
                        delete newPoints[pId];
                    }
                }

                // Cascade delete reflections
                Object.keys(newObjects).forEach(k => {
                    if (newObjects[k].reflectionSourceId === id || newObjects[k].reflectionRefId === id) {
                        deleteObjRecursive(k);
                    }
                });
            };

            deleteObjRecursive(objId);

            setObjects(newObjects);
            setPoints(newPoints);
            pushToHistory(newPoints, newObjects);
        }
    };

    const handlePointEraser = (pId: string) => {
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

        setPoints(newPoints);
        setObjects(newObjects);
        pushToHistory(newPoints, newObjects);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (activeTool === 'pan' || e.button === 1 || (activeTool === 'select' && !hoveredPointId && !hoveredObjectId)) {
            setIsPanning(true);
            setLastMousePos({ x: e.clientX, y: e.clientY });
            return;
        }
        if (activeTool === 'select') {
            if (hoveredPointId && points[hoveredPointId]) {
                setDraggedPointId(hoveredPointId);
            } else if (hoveredObjectId) {
                const obj = objects[hoveredObjectId];
                if (!obj.isReflection) {
                    setDraggedObjectId(hoveredObjectId);
                    const initial: Record<string, { x: number, y: number }> = {};
                    obj.pointIds.forEach(pId => {
                        if (points[pId]) initial[pId] = { ...points[pId] };
                    });
                    setInitialDragPoints(initial);
                    setLastMousePos({ x: e.clientX, y: e.clientY });
                }
            }
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isPanning && svgRef.current) {
            const dx = (e.clientX - lastMousePos.x) * (viewBox.width / svgRef.current.clientWidth);
            const dy = (e.clientY - lastMousePos.y) * (viewBox.height / svgRef.current.clientHeight);
            setViewBox(prev => ({ ...prev, x: prev.x - dx, y: prev.y - dy }));
            setLastMousePos({ x: e.clientX, y: e.clientY });
            return;
        }

        const rawPos = getSVGPoint(e.clientX, e.clientY);
        let pos = { ...rawPos };

        // Point snapping for drawing tools
        const drawingTools: Tool[] = ['line', 'segment', 'polygon', 'regular-polygon'];
        if (drawingTools.includes(activeTool)) {
            const tolerance = 15 * (viewBox.width / 1200);
            const snappingPoint = Object.values(allPoints).find(pt => 
                Math.sqrt(Math.pow(pt.x - pos.x, 2) + Math.pow(pt.y - pos.y, 2)) < tolerance * 1.5
            );
            if (snappingPoint) {
                pos = { x: snappingPoint.x, y: snappingPoint.y };
            }
        }

        setMousePos(pos);

        // Angle snapping for regular polygon (Shift key)
        if (activeTool === 'regular-polygon' && selection.length === 1 && e.shiftKey) {
            const p1 = allPoints[selection[0]];
            const dx = pos.x - p1.x;
            const dy = pos.y - p1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            const snappedAngle = Math.round(angle / (Math.PI / 12)) * (Math.PI / 12); // Snap to 15 degrees
            pos.x = p1.x + dist * Math.cos(snappedAngle);
            pos.y = p1.y + dist * Math.sin(snappedAngle);
        }

        if (draggedPointId) {
            setPoints(prev => ({
                ...prev,
                [draggedPointId]: { ...prev[draggedPointId], x: pos.x, y: pos.y }
            }));
        } else if (draggedObjectId && svgRef.current) {
            const dx = (e.clientX - lastMousePos.x) * (viewBox.width / svgRef.current.clientWidth);
            const dy = (e.clientY - lastMousePos.y) * (viewBox.height / svgRef.current.clientHeight);

            setPoints(prev => {
                const next = { ...prev };
                Object.keys(initialDragPoints).forEach(pId => {
                    if (next[pId]) {
                        next[pId] = {
                            ...next[pId],
                            x: next[pId].x + dx,
                            y: next[pId].y + dy
                        };
                    }
                });
                return next;
            });
            setLastMousePos({ x: e.clientX, y: e.clientY });
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
        setInitialDragPoints({});
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

    const renderObject = (obj: GeometryObject) => {
        const pts = obj.pointIds.map(id => allPoints[id]).filter(Boolean);
        if (pts.length === 0) return null;

        // Check if this is an axis and should be hidden
        const isAxis = Object.values(objects).some(o => o.isReflection && o.reflectionRefId === obj.id);
        if (isAxis && !showAxes) return null;
        const isReflecting = reflectingObjectId === obj.id;
        const sw = 3 * (viewBox.width / 1200);
        const isEraserHover = activeTool === 'eraser' && hoveredObjectId === obj.id;

        const props = {
            key: obj.id,
            onMouseEnter: () => setHoveredObjectId(obj.id),
            onMouseLeave: () => setHoveredObjectId(null),
            onClick: (e: React.MouseEvent) => { e.stopPropagation(); handleObjectClick(obj.id); },
            className: cn(
                "cursor-pointer",
                isReflecting ? "stroke-yellow-400 stroke-[6]" : (isEraserHover ? "stroke-red-500 stroke-[4]" : "hover:stroke-blue-400/50"),
                activeTool === 'eraser' ? "hover:opacity-80" : ""
            )
        };

        // Hit area for easier selection/erasing
        const hitAreaProps = {
            ...props,
            stroke: "transparent",
            strokeWidth: 20 * (viewBox.width / 1200),
            fill: "transparent",
            className: props.className + " opacity-0"
        };

        switch (obj.type) {
            case 'point': return <circle {...props} cx={pts[0].x} cy={pts[0].y} r={6 * (viewBox.width / 1200)} fill={obj.color} stroke="white" strokeWidth={1} />;
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
                        <line {...hitAreaProps} x1={x1} y1={y1} x2={x2} y2={y2} />
                        <line {...props} x1={x1} y1={y1} x2={x2} y2={y2} stroke={obj.color} strokeWidth={sw} />
                        {obj.label && showLineLabels && (
                            <text
                                x={lineLabelX} y={lineLabelY} fill={obj.color} fontSize={18 * (viewBox.width / 1200)}
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
                        <line {...hitAreaProps} x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} />
                        <line {...props} x1={pts[0].x} y1={pts[0].y} x2={pts[1].x} y2={pts[1].y} stroke={obj.color} strokeWidth={sw} />
                        {obj.label && showLineLabels && (
                            <text
                                x={segLabelX} y={segLabelY} fill={obj.color} fontSize={18 * (viewBox.width / 1200)}
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
            case 'polygon':
            case 'regular-polygon':
                if (pts.length < 3) return null;
                const d = `M ${pts.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;
                return (
                    <g key={obj.id}>
                        <path {...hitAreaProps} d={d} />
                        <path {...props} d={d} fill={obj.color} fillOpacity={0.15} stroke={obj.color} strokeWidth={sw} strokeLinejoin="round" />
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
                            variant={(activeTool === 'point' || activeTool === 'line' || activeTool === 'segment') ? 'secondary' : 'ghost'}
                            size="sm"
                            className="rounded-xl px-4"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (activeTool !== 'point' && activeTool !== 'line' && activeTool !== 'segment') {
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
                            variant={(showReflectionLines || showDistances || !showAxes || !showPointLabels || !showLineLabels) ? 'secondary' : 'ghost'}
                            size="sm"
                            className={cn("rounded-xl px-4", (showReflectionLines || showDistances) ? "text-blue-600 bg-blue-50" : "text-slate-600")}
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
                    className={cn("w-full h-full bg-white transition-opacity duration-300", activeTool === 'pan' || isPanning ? "cursor-grabbing" : "cursor-crosshair")}
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
                    
                    {/* Reflection Guides */}
                    {showReflectionLines && Object.values(objects).map(obj => {
                        if (!obj.isReflection || !obj.reflectionSourceId) return null;
                        const sourceObj = objects[obj.reflectionSourceId];
                        if (!sourceObj) return null;

                        return obj.pointIds.map((pId, idx) => {
                            const pSource = allPoints[sourceObj.pointIds[idx]];
                            const pTarget = allPoints[pId];
                            if (!pSource || !pTarget) return null;
                            return (
                                <line
                                    key={`guide-${obj.id}-${idx}`}
                                    x1={pSource.x} y1={pSource.y}
                                    x2={pTarget.x} y2={pTarget.y}
                                    stroke="#94a3b8"
                                    strokeWidth={1.5 * (viewBox.width / 1200)}
                                    strokeDasharray="5,5"
                                    className="pointer-events-none opacity-60"
                                />
                            );
                        });
                    })}

                    {Object.entries(allPoints).map(([id, p]) => (
                        <g key={id}>
                            <circle
                                cx={p.x} cy={p.y}
                                r={(hoveredPointId === id || draggedPointId === id ? 8 : 5) * (viewBox.width / 1200)}
                                fill={draggedPointId === id ? "#3b82f6" : (points[id] ? "#1e40af" : "#6366f1")}
                                fillOpacity={points[id] ? 1 : 0.6}
                                stroke={reflectingObjectId && objects[reflectingObjectId]?.pointIds[0] === id ? "#facc15" : "none"}
                                strokeWidth={reflectingObjectId && objects[reflectingObjectId]?.pointIds[0] === id ? 4 : 0}
                                className={cn(
                                    activeTool === 'select' && points[id] ? "cursor-move" : "cursor-crosshair",
                                    !points[id] && !(['eraser', 'axial-reflect', 'central-reflect', 'select', 'polygon', 'line', 'segment'].includes(activeTool)) ? "pointer-events-none" : "",
                                    activeTool === 'eraser' && hoveredPointId === id ? "fill-red-500 scale-125" : "",
                                    (activeTool === 'axial-reflect' || activeTool === 'central-reflect') ? "cursor-copy hover:fill-yellow-400" : "",
                                    reflectingObjectId && objects[reflectingObjectId]?.pointIds[0] === id ? "animate-pulse" : ""
                                )}
                                pointerEvents={(['eraser', 'axial-reflect', 'central-reflect', 'select', 'polygon', 'line', 'segment'].includes(activeTool)) ? 'auto' : (points[id] ? 'auto' : 'none')}
                                onMouseEnter={() => setHoveredPointId(id)}
                                onMouseLeave={() => setHoveredPointId(null)}
                                onClick={(e) => {
                                    if (activeTool === 'eraser') {
                                        e.stopPropagation();
                                        handlePointEraser(id);
                                    } else if (activeTool === 'axial-reflect' || activeTool === 'central-reflect') {
                                        e.stopPropagation();
                                        // Find if an object exists for this point
                                        let objId = Object.keys(objects).find(k => objects[k].type === 'point' && objects[k].pointIds[0] === id);
                                        
                                        if (!objId) {
                                            // Create a point object for it on the fly if it's a base point
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
                                    // For polygon, line, segment: don't stop propagation, let handleCanvasClick handle it!
                                }}
                            />
                            {p.label && showPointLabels && (
                                <text
                                    x={p.x + 10 * (viewBox.width / 1200)}
                                    y={p.y - 10 * (viewBox.width / 1200)}
                                    fontSize={16 * (viewBox.width / 1200)}
                                    fill={points[id] ? "#1e40af" : "#6366f1"}
                                    fontFamily="serif"
                                    fontStyle="italic"
                                    fontWeight="bold"
                                    className="pointer-events-none select-none"
                                >
                                    {p.label}
                                </text>
                            )}
                        </g>
                    ))}
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
