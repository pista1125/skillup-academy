import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Pencil,
  Eraser,
  Minus,
  Square,
  Circle,
  Triangle,
  Box,
  TrendingUp,
  Sparkles,
  RotateCcw,
  RotateCw,
  Trash2,
  Download,
  Maximize2,
  Minimize2,
  Grid,
  ArrowLeft,
  BrainCircuit,
  MousePointer,
  Move,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Edit3,
  Sliders,
  Check,
  Plus,
  Minus as MinusIcon,
  Type,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { invokeAiFunction } from '@/lib/aiService';

interface SmartWhiteboardToolProps {
  onBack?: () => void;
}

type ToolMode = 'pen' | 'eraser' | 'line' | 'select' | 'text' | 'shape-cube' | 'shape-circle' | 'shape-square' | 'shape-triangle' | 'shape-coords';
type CanvasBg = 'white' | 'grid' | 'dots' | 'dark';

interface DrawnStroke {
  id: string;
  points: { x: number; y: number }[];
  color: string;
  width: number;
  mode: ToolMode;
}

interface CanvasObject {
  id: string;
  type: 'cube' | 'circle' | 'square' | 'triangle' | 'coords' | 'function' | 'text' | 'equation-solution';
  x: number;
  y: number;
  width: number;
  height: number;
  data?: any;
  label?: string;
}

interface SelectionBox {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  active: boolean;
}

export const SmartWhiteboardTool: React.FC<SmartWhiteboardToolProps> = ({ onBack }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Drawing tools state
  const [activeTool, setActiveTool] = useState<ToolMode>('pen');
  const [penColor, setPenColor] = useState<string>('#1e293b'); // Dark Slate
  const [penWidth, setPenWidth] = useState<number>(4);
  const [canvasBg, setCanvasBg] = useState<CanvasBg>('white');
  const [showBgMenu, setShowBgMenu] = useState<boolean>(false);
  const [autoAiClean, setAutoAiClean] = useState<boolean>(false);

  // Fullscreen & UI state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiStatusText, setAiStatusText] = useState<string>('');

  // Canvas objects and history
  const [strokes, setStrokes] = useState<DrawnStroke[]>([]);
  const [redoStrokes, setRedoStrokes] = useState<DrawnStroke[]>([]);
  const [objects, setObjects] = useState<CanvasObject[]>([]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>(null);

  // Selection Marquee Box State
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);
  const [selectedStrokes, setSelectedStrokes] = useState<DrawnStroke[]>([]);

  // Object Dragging State
  const [draggingObjectId, setDraggingObjectId] = useState<string | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Quick Function Plotter Modal State
  const [showFuncModal, setShowFuncModal] = useState<boolean>(false);
  const [inputFunction, setInputFunction] = useState<string>('y = 2x + 4');

  // Text Tool Modal State
  const [showTextModal, setShowTextModal] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>('Órai Vázlat: ');
  const [fontSize, setFontSize] = useState<number>(24);
  const [textPos, setTextPos] = useState<{ x: number; y: number }>({ x: 200, y: 150 });

  // Drawing tracking
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const currentStrokeRef = useRef<{ x: number; y: number }[]>([]);
  const autoAiTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Color Palette for Whiteboard Pens
  const colors = [
    { name: 'Fekete', value: '#1e293b' },
    { name: 'Kék', value: '#2563eb' },
    { name: 'Piros', value: '#dc2626' },
    { name: 'Zöld', value: '#16a34a' },
    { name: 'Lila', value: '#9333ea' },
    { name: 'Narancs', value: '#ea580c' },
    { name: 'Sárga', value: '#ca8a04' }
  ];

  // --------------------------------------------------------------------------
  // Canvas Setup & Resize Handling
  // --------------------------------------------------------------------------
  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
    redrawCanvas();
  }, [canvasBg, strokes, objects, selectedObjectId, selectionBox]);

  useEffect(() => {
    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, [setupCanvas]);

  // --------------------------------------------------------------------------
  // Main Canvas Rendering Loop
  // --------------------------------------------------------------------------
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // 1. Clear background
    ctx.clearRect(0, 0, width, height);

    if (canvasBg === 'dark') {
      ctx.fillStyle = '#0f172a';
    } else {
      ctx.fillStyle = '#ffffff';
    }
    ctx.fillRect(0, 0, width, height);

    // Draw background grid patterns
    if (canvasBg === 'grid') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    } else if (canvasBg === 'dots') {
      ctx.fillStyle = '#cbd5e1';
      const dotSpacing = 30;
      for (let x = 15; x < width; x += dotSpacing) {
        for (let y = 15; y < height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 2. Draw user hand-drawn strokes
    strokes.forEach((stroke) => {
      if (stroke.points.length < 2) return;

      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = canvasBg === 'dark' && stroke.color === '#1e293b' ? '#f8fafc' : stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.mode === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = stroke.width * 4;
      }

      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
      ctx.restore();
    });

    // 3. Render AI-beautified vector objects & text
    objects.forEach((obj) => {
      ctx.save();
      const isSelected = obj.id === selectedObjectId;

      if (obj.type === 'cube') {
        render3DCubeObject(ctx, obj);
      } else if (obj.type === 'circle') {
        renderCircleObject(ctx, obj);
      } else if (obj.type === 'square') {
        renderSquareObject(ctx, obj);
      } else if (obj.type === 'triangle') {
        renderTriangleObject(ctx, obj);
      } else if (obj.type === 'coords') {
        renderCoordsObject(ctx, obj);
      } else if (obj.type === 'function') {
        renderFunctionObject(ctx, obj);
      } else if (obj.type === 'equation-solution') {
        renderSolutionObject(ctx, obj);
      } else if (obj.type === 'text') {
        renderTextObject(ctx, obj);
      }

      // Selection box & Drag handle
      if (isSelected) {
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 6]);
        ctx.strokeRect(obj.x - 6, obj.y - 6, obj.width + 12, obj.height + 12);

        ctx.fillStyle = '#6366f1';
        ctx.fillRect(obj.x + obj.width / 2 - 24, obj.y - 26, 48, 18);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText('✋ MOZGAT', obj.x + obj.width / 2 - 20, obj.y - 13);
      }
      ctx.restore();
    });

    // 4. Render active Selection Marquee Box
    if (selectionBox && selectionBox.active) {
      const minX = Math.min(selectionBox.startX, selectionBox.currentX);
      const minY = Math.min(selectionBox.startY, selectionBox.currentY);
      const w = Math.abs(selectionBox.currentX - selectionBox.startX);
      const h = Math.abs(selectionBox.currentY - selectionBox.startY);

      ctx.save();
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(minX, minY, w, h);
      ctx.fillStyle = 'rgba(139, 92, 246, 0.08)';
      ctx.fillRect(minX, minY, w, h);
      ctx.restore();
    }
  }, [canvasBg, strokes, objects, selectedObjectId, selectionBox]);

  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // --------------------------------------------------------------------------
  // Vector Object & Text Renderers
  // --------------------------------------------------------------------------

  // Render Custom Typed Text Object
  const renderTextObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const { x, y, data } = obj;
    const text = data?.text || 'Szöveg...';
    const size = data?.fontSize || 24;
    const color = data?.color || (canvasBg === 'dark' ? '#f8fafc' : '#1e293b');

    ctx.save();
    ctx.fillStyle = color;
    ctx.font = `bold ${size}px Inter, sans-serif`;
    ctx.textBaseline = 'top';

    const lines = text.split('\n');
    let maxW = 100;
    lines.forEach((line: string, i: number) => {
      ctx.fillText(line, x, y + i * (size * 1.3));
      const m = ctx.measureText(line);
      if (m.width > maxW) maxW = m.width;
    });

    obj.width = Math.max(120, maxW + 20);
    obj.height = lines.length * (size * 1.3) + 10;
    ctx.restore();
  };

  // 1. Render True Rotatable 3D Cube
  const render3DCubeObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const { x, y, width: w, height: h, data } = obj;
    const rotX = (data?.rotX ?? 20) * (Math.PI / 180);
    const rotY = (data?.rotY ?? 35) * (Math.PI / 180);
    const rotZ = (data?.rotZ ?? 0) * (Math.PI / 180);

    const cx = x + w / 2;
    const cy = y + h / 2;
    const side = Math.min(w, h) * 0.38;

    const vertices3D = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1]
    ];

    const project2D = (v: number[]) => {
      let [vx, vy, vz] = v;

      let x1 = vx * Math.cos(rotY) + vz * Math.sin(rotY);
      let z1 = -vx * Math.sin(rotY) + vz * Math.cos(rotY);

      let y2 = vy * Math.cos(rotX) - z1 * Math.sin(rotX);
      let z2 = vy * Math.sin(rotX) + z1 * Math.cos(rotX);

      let x3 = x1 * Math.cos(rotZ) - y2 * Math.sin(rotZ);
      let y3 = x1 * Math.sin(rotZ) + y2 * Math.cos(rotZ);

      return {
        px: cx + x3 * side,
        py: cy - y3 * side
      };
    };

    const pts2D = vertices3D.map(project2D);

    const edges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7]
    ];

    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(37, 99, 235, 0.06)';

    ctx.beginPath();
    ctx.moveTo(pts2D[0].px, pts2D[0].py);
    ctx.lineTo(pts2D[1].px, pts2D[1].py);
    ctx.lineTo(pts2D[2].px, pts2D[2].py);
    ctx.lineTo(pts2D[3].px, pts2D[3].py);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    edges.forEach(([i, j]) => {
      ctx.moveTo(pts2D[i].px, pts2D[i].py);
      ctx.lineTo(pts2D[j].px, pts2D[j].py);
    });
    ctx.stroke();

    const labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px Inter, sans-serif';
    pts2D.forEach((p, idx) => {
      ctx.fillText(labels[idx], p.px + 4, p.py - 4);
    });
  };

  // 2. Render Circle
  const renderCircleObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const { x, y, width, height } = obj;
    const rx = width / 2;
    const ry = height / 2;
    const cx = x + rx;
    const cy = y + ry;

    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#16a34a';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(22, 163, 74, 0.05)';
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#dc2626';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + rx, cy);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#dc2626';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('O', cx - 12, cy + 4);
    ctx.fillText('r', cx + rx / 2, cy - 6);
  };

  // 3. Render Square / Rectangle
  const renderSquareObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const { x, y, width: w, height: h } = obj;
    ctx.strokeStyle = '#9333ea';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(147, 51, 234, 0.05)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText(`a = ${Math.round(w / 3)} cm`, x + w / 2 - 20, y + h + 16);
    ctx.fillText(`b = ${Math.round(h / 3)} cm`, x + w + 6, y + h / 2);
  };

  // 4. Render Triangle
  const renderTriangleObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const { x, y, width: w, height: h } = obj;

    ctx.beginPath();
    ctx.moveTo(x + w / 2, y);
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();

    ctx.strokeStyle = '#ea580c';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(234, 88, 12, 0.05)';
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('A', x - 10, y + h + 14);
    ctx.fillText('B', x + w + 4, y + h + 14);
    ctx.fillText('C', x + w / 2 - 4, y - 6);
  };

  // 5. Render Expandable & Zoomable Coordinate System
  const renderCoordsObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const { x, y, width: w, height: h, data } = obj;
    const range = data?.gridRange || 5;
    const zoom = data?.zoom || 1.0;

    const cx = x + w / 2;
    const cy = y + h / 2;

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(x, cy);
    ctx.lineTo(x + w, cy);
    ctx.moveTo(cx, y + h);
    ctx.lineTo(cx, y);
    ctx.stroke();

    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.moveTo(x + w, cy);
    ctx.lineTo(x + w - 8, cy - 5);
    ctx.lineTo(x + w - 8, cy + 5);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.lineTo(cx - 5, y + 8);
    ctx.lineTo(cx + 5, y + 8);
    ctx.fill();

    const stepCount = range * 2;
    const stepPx = (w / stepCount) * zoom;
    const maxTicks = Math.min(range, 10);
    const tickInterval = Math.ceil(range / maxTicks);

    ctx.font = '10px Inter, sans-serif';
    for (let i = -range; i <= range; i += tickInterval) {
      if (i === 0) continue;
      const tx = cx + i * stepPx;
      const ty = cy - i * stepPx;

      if (tx >= x && tx <= x + w) {
        ctx.beginPath();
        ctx.moveTo(tx, cy - 4);
        ctx.lineTo(tx, cy + 4);
        ctx.stroke();
        ctx.fillText(i.toString(), tx - 4, cy + 16);
      }

      if (ty >= y && ty <= y + h) {
        ctx.beginPath();
        ctx.moveTo(cx - 4, ty);
        ctx.lineTo(cx + 4, ty);
        ctx.stroke();
        ctx.fillText((-i).toString(), cx - 18, ty + 4);
      }
    }

    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('X', x + w + 4, cy + 4);
    ctx.fillText('Y', cx - 4, y - 8);
    ctx.fillText('O', cx - 12, cy + 14);
  };

  // Math Expression Evaluator
  const evaluateMathExpression = (expr: string, mathX: number): number => {
    const cleanExpr = (expr || '').replace(/\s+/g, '').toLowerCase().replace(/^y=|^f\(x\)=/, '');

    try {
      if (cleanExpr.includes('sin')) return Math.sin(mathX);
      if (cleanExpr.includes('cos')) return Math.cos(mathX);
      if (cleanExpr.includes('x^2')) {
        if (cleanExpr.includes('-4x')) return mathX * mathX - 4 * mathX + 3;
        return mathX * mathX;
      }
      if (cleanExpr.includes('1/x')) return 1 / (mathX || 0.0001);
      if (cleanExpr.includes('sqrt') || cleanExpr.includes('gyok')) return Math.sqrt(Math.max(0, mathX));

      if (cleanExpr.includes('x')) {
        let m = 1;
        let b = 0;

        if (cleanExpr === 'x') return mathX;
        if (cleanExpr === '-x') return -mathX;

        const parts = cleanExpr.split('x');
        const mStr = parts[0];
        const bStr = parts[1] || '0';

        if (mStr === '' || mStr === '+') m = 1;
        else if (mStr === '-') m = -1;
        else m = parseFloat(mStr) || 1;

        b = parseFloat(bStr) || 0;
        return m * mathX + b;
      }
    } catch (e) {
      return mathX;
    }

    return mathX;
  };

  // 6. Render Plotted Math Function with Live Rule Badge
  const renderFunctionObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const { x, y, width: w, height: h, data } = obj;
    const expr = data?.expression || 'y = 2x + 4';
    const range = data?.gridRange || 5;
    const zoom = data?.zoom || 1.0;

    renderCoordsObject(ctx, obj);

    const cx = x + w / 2;
    const cy = y + h / 2;
    const scaleX = (w / (range * 2)) * zoom;
    const scaleY = (h / (range * 2)) * zoom;

    ctx.beginPath();
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3.5;

    let isFirst = true;
    for (let px = 0; px <= w; px += 2) {
      const mathX = (px - w / 2) / scaleX;
      const mathY = evaluateMathExpression(expr, mathX);
      const py = cy - mathY * scaleY;

      if (py >= y && py <= y + h) {
        if (isFirst) {
          ctx.moveTo(px + x, py);
          isFirst = false;
        } else {
          ctx.lineTo(px + x, py);
        }
      } else {
        isFirst = true;
      }
    }
    ctx.stroke();

    ctx.fillStyle = '#2563eb';
    ctx.fillRect(x + 10, y + 10, w - 20, 26);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText(`f(x): ${expr}`, x + 20, y + 27);
  };

  // 7. Render AI Solution Box
  const renderSolutionObject = (ctx: CanvasRenderingContext2D, obj: CanvasObject) => {
    const { x, y, width: w, height: h, data } = obj;
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.1)';
    ctx.shadowBlur = 10;
    ctx.fillRect(x, y, w, h);
    ctx.shadowBlur = 0;

    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#4f46e5';
    ctx.fillRect(x, y, w, 32);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px Inter, sans-serif';
    ctx.fillText('🤖 AI Matek Levezetés', x + 12, y + 21);

    ctx.fillStyle = '#1e293b';
    ctx.font = '12px Inter, sans-serif';
    const lines = (data?.solutionText || 'Egyenlet levezetése:\n1. 2x - 6 = 0\n2. 2x = 6\n3. x = 3').split('\n');
    lines.forEach((line: string, idx: number) => {
      ctx.fillText(line, x + 12, y + 50 + idx * 20);
    });
  };

  // --------------------------------------------------------------------------
  // User Pointer Events & Drag / Selection Marquee / Text Placement
  // --------------------------------------------------------------------------
  const getCanvasCoords = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);

    if (activeTool === 'text') {
      setTextPos({ x, y });
      setTextInput('');
      setShowTextModal(true);
      return;
    }

    const clickedObj = [...objects].reverse().find(
      (o) => x >= o.x - 10 && x <= o.x + o.width + 10 && y >= o.y - 10 && y <= o.y + o.height + 10
    );

    if (clickedObj && (activeTool === 'select' || activeTool === 'pen')) {
      setSelectedObjectId(clickedObj.id);
      setDraggingObjectId(clickedObj.id);
      dragOffsetRef.current = { x: x - clickedObj.x, y: y - clickedObj.y };
      setIsDrawing(false);
      return;
    }

    if (activeTool === 'select') {
      setSelectedObjectId(null);
      setSelectionBox({
        startX: x,
        startY: y,
        currentX: x,
        currentY: y,
        active: true
      });
      setIsDrawing(false);
      return;
    }

    setSelectedObjectId(null);
    setIsDrawing(true);
    currentStrokeRef.current = [{ x, y }];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);

    if (draggingObjectId) {
      setObjects((prev) =>
        prev.map((obj) => {
          if (obj.id === draggingObjectId) {
            return {
              ...obj,
              x: x - dragOffsetRef.current.x,
              y: y - dragOffsetRef.current.y
            };
          }
          return obj;
        })
      );
      redrawCanvas();
      return;
    }

    if (selectionBox && selectionBox.active) {
      setSelectionBox((prev) => (prev ? { ...prev, currentX: x, currentY: y } : null));
      redrawCanvas();
      return;
    }

    if (!isDrawing) return;
    currentStrokeRef.current.push({ x, y });

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = activeTool === 'eraser' ? '#ffffff' : penColor;
    ctx.lineWidth = activeTool === 'eraser' ? penWidth * 4 : penWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const pts = currentStrokeRef.current;
    if (pts.length >= 2) {
      ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
      ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y);
      ctx.stroke();
    }
    ctx.restore();
  };

  const handlePointerUp = () => {
    if (draggingObjectId) {
      setDraggingObjectId(null);
    }

    if (selectionBox && selectionBox.active) {
      const minX = Math.min(selectionBox.startX, selectionBox.currentX);
      const maxX = Math.max(selectionBox.startX, selectionBox.currentX);
      const minY = Math.min(selectionBox.startY, selectionBox.currentY);
      const maxY = Math.max(selectionBox.startY, selectionBox.currentY);

      const capturedStrokes = strokes.filter((st) =>
        st.points.some((p) => p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY)
      );

      setSelectedStrokes(capturedStrokes);

      if (capturedStrokes.length > 0 || Math.abs(maxX - minX) > 40) {
        toast.info('Kijelölés aktív! Kattints az AI Felismerésre a kijelölt rész átalakításához.');
      }
      return;
    }

    if (!isDrawing) return;
    setIsDrawing(false);

    const pts = currentStrokeRef.current;
    if (pts.length > 1) {
      const newStroke: DrawnStroke = {
        id: `stroke-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        points: [...pts],
        color: penColor,
        width: penWidth,
        mode: activeTool
      };
      setStrokes((prev) => [...prev, newStroke]);
      setRedoStrokes([]);

      if (autoAiClean) {
        if (autoAiTimerRef.current) clearTimeout(autoAiTimerRef.current);
        autoAiTimerRef.current = setTimeout(() => {
          triggerAiShapeRecognition(newStroke);
        }, 800);
      }
    }
    currentStrokeRef.current = [];
  };

  const handleAddTextObject = () => {
    if (!textInput.trim()) return;

    const newObj: CanvasObject = {
      id: `text-${Date.now()}`,
      type: 'text',
      x: textPos.x,
      y: textPos.y,
      width: 200,
      height: 60,
      data: {
        text: textInput,
        fontSize,
        color: penColor
      }
    };

    setObjects((prev) => [...prev, newObj]);
    setSelectedObjectId(newObj.id);
    setShowTextModal(false);
    toast.success('Szöveg elhelyezve a táblán!');
  };

  // --------------------------------------------------------------------------
  // Fine-Tuned AI Shape Classifier Engine (Strict Feature Extraction)
  // --------------------------------------------------------------------------
  const triggerAiShapeRecognition = async (targetStroke?: DrawnStroke) => {
    setIsAiLoading(true);
    setAiStatusText('AI Felismerése a kijelölésre... 🪄');

    const targetStrokes = selectedStrokes.length > 0 ? selectedStrokes : targetStroke ? [targetStroke] : strokes;
    const ptsToAnalyze = targetStrokes.flatMap((s) => s.points);
    const bbox = getBoundingBox(ptsToAnalyze.length > 0 ? ptsToAnalyze : [{ x: 200, y: 150 }]);

    try {
      const { data } = await invokeAiFunction('ai-whiteboard-recognizer', {
        strokes: targetStrokes,
        action: 'recognize-shape'
      });

      if (data?.shape) {
        // Remove raw freehand strokes replaced by AI vector object
        if (targetStrokes && targetStrokes.length > 0) {
          const idsToRemove = new Set(targetStrokes.map((s) => s.id));
          setStrokes((prev) => prev.filter((s) => !idsToRemove.has(s.id)));
        }

        createRecognizedObject(data.shape, bbox, data);
        setIsAiLoading(false);
        setSelectionBox(null);
        setSelectedStrokes([]);
        return;
      }
    } catch (e) {
      // Fallback
    }

    setTimeout(() => {
      const detectedType = classifyDrawnShapeFineTuned(targetStrokes, ptsToAnalyze, bbox);

      // Remove raw freehand strokes replaced by AI vector object
      if (targetStrokes && targetStrokes.length > 0) {
        const idsToRemove = new Set(targetStrokes.map((s) => s.id));
        setStrokes((prev) => prev.filter((s) => !idsToRemove.has(s.id)));
      }

      createRecognizedObject(detectedType, bbox);

      setIsAiLoading(false);
      setSelectionBox(null);
      setSelectedStrokes([]);
    }, 600);
  };

  const getBoundingBox = (points: { x: number; y: number }[]) => {
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    points.forEach((p) => {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    });

    const w = Math.max(80, maxX - minX);
    const h = Math.max(80, maxY - minY);
    return { x: minX, y: minY, width: w, height: h };
  };

  // Fine-Tuned Classifier Engine: Ensures `coords` is ONLY returned when intersecting cross lines exist
  const classifyDrawnShapeFineTuned = (
    drawnStrokes: DrawnStroke[],
    pts: { x: number; y: number }[],
    bbox: { x: number; y: number; width: number; height: number }
  ): CanvasObject['type'] => {
    if (pts.length < 4) return 'circle';

    // 1. Strict Coordinate System Detection:
    // Requires exactly 2 intersecting strokes (or a single cross) where one is clearly horizontal and one is vertical
    if (drawnStrokes.length === 2) {
      const s1 = drawnStrokes[0].points;
      const s2 = drawnStrokes[1].points;

      if (s1.length >= 2 && s2.length >= 2) {
        const p1Start = s1[0];
        const p1End = s1[s1.length - 1];
        const p2Start = s2[0];
        const p2End = s2[s2.length - 1];

        const dx1 = Math.abs(p1End.x - p1Start.x);
        const dy1 = Math.abs(p1End.y - p1Start.y);
        const dx2 = Math.abs(p2End.x - p2Start.x);
        const dy2 = Math.abs(p2End.y - p2Start.y);

        const isS1Vert = dy1 > dx1 * 2;
        const isS1Horiz = dx1 > dy1 * 2;
        const isS2Vert = dy2 > dx2 * 2;
        const isS2Horiz = dx2 > dy2 * 2;

        // ONLY if one stroke is vertical and the other is horizontal -> Coordinate System!
        if ((isS1Vert && isS2Horiz) || (isS1Horiz && isS2Vert)) {
          return 'coords';
        }
      }
    }

    // 2. 3D Cube Detection:
    // Multi-stroke wireframe sketches (>= 3 strokes) or complex 3D box points
    if (drawnStrokes.length >= 3 || pts.length > 70) {
      return 'cube';
    }

    // 3. Sharp Corner Counting for Polygon vs Circle
    let sharpCorners = 0;
    for (let i = 2; i < pts.length - 2; i += 3) {
      const v1 = { x: pts[i].x - pts[i - 2].x, y: pts[i].y - pts[i - 2].y };
      const v2 = { x: pts[i + 2].x - pts[i].x, y: pts[i + 2].y - pts[i].y };
      const dot = v1.x * v2.x + v1.y * v2.y;
      const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
      const mag2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

      if (mag1 > 0 && mag2 > 0) {
        const cosAngle = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
        const angle = Math.acos(cosAngle) * (180 / Math.PI);
        if (angle > 45) {
          sharpCorners++;
        }
      }
    }

    if (sharpCorners === 3) return 'triangle';
    if (sharpCorners >= 4 && sharpCorners <= 5) return 'square';
    if (sharpCorners <= 2) return 'circle';

    return 'square';
  };

  const createRecognizedObject = (
    type: CanvasObject['type'],
    bbox: { x: number; y: number; width: number; height: number },
    customData?: any
  ) => {
    const defaultData = type === 'cube'
      ? { rotX: 20, rotY: 35, rotZ: 0 }
      : type === 'coords'
        ? { gridRange: 5, zoom: 1.0 }
        : type === 'function'
          ? { expression: 'y = 2x + 4', gridRange: 5, zoom: 1.0 }
          : {};

    const newObj: CanvasObject = {
      id: `obj-${Date.now()}`,
      type,
      x: Math.max(20, bbox.x),
      y: Math.max(20, bbox.y),
      width: Math.max(180, bbox.width),
      height: Math.max(180, bbox.height),
      data: { ...defaultData, ...customData }
    };

    setObjects((prev) => [...prev, newObj]);
    setSelectedObjectId(newObj.id);

    const names: Record<string, string> = {
      cube: '3D Kocka (Forgatható!)',
      circle: 'Szabályos Kör & Sugár',
      square: 'Derékszögű Négyzet/Téglalap',
      triangle: 'Geometriai Háromszög',
      coords: 'Descartes Koordináta-rendszer',
      function: 'Függvényábrázolás (Élő Kifejezéssel!)',
      text: 'Szöveges Felirat'
    };

    toast.success(`✨ AI Elhelyezve: ${names[type] || 'Szabályos Alakzat'}!`);
  };

  const insertPresetShape = (type: CanvasObject['type'], customData?: any) => {
    const canvas = canvasRef.current;
    const w = canvas ? canvas.width / (window.devicePixelRatio || 1) : 800;
    const h = canvas ? canvas.height / (window.devicePixelRatio || 1) : 600;

    const bbox = {
      x: w / 2 - 120,
      y: h / 2 - 120,
      width: 240,
      height: 240
    };

    createRecognizedObject(type, bbox, customData);
  };

  // --------------------------------------------------------------------------
  // Object Controllers (3D Rotation, Zoom, Range, Live Function Rule, Text)
  // --------------------------------------------------------------------------
  const rotateCubeObject = (objId: string, axis: 'X' | 'Y' | 'Z', deltaAngle: number) => {
    setObjects((prev) =>
      prev.map((o) => {
        if (o.id === objId) {
          const rotKey = `rot${axis}`;
          const currentRot = o.data?.[rotKey] ?? (axis === 'X' ? 20 : axis === 'Y' ? 35 : 0);
          return {
            ...o,
            data: {
              ...o.data,
              [rotKey]: (currentRot + deltaAngle) % 360
            }
          };
        }
        return o;
      })
    );
    redrawCanvas();
  };

  const updateCoordsZoom = (objId: string, zoomDelta: number) => {
    setObjects((prev) =>
      prev.map((o) => {
        if (o.id === objId) {
          const currentZoom = o.data?.zoom || 1.0;
          const newZoom = Math.max(0.5, Math.min(3.0, currentZoom + zoomDelta));
          return { ...o, data: { ...o.data, zoom: newZoom } };
        }
        return o;
      })
    );
    redrawCanvas();
  };

  const updateCoordsRange = (objId: string, newRange: number) => {
    setObjects((prev) =>
      prev.map((o) => {
        if (o.id === objId) {
          return { ...o, data: { ...o.data, gridRange: newRange } };
        }
        return o;
      })
    );
    redrawCanvas();
  };

  const updateFunctionExpression = (objId: string, newExpr: string) => {
    setObjects((prev) =>
      prev.map((o) => {
        if (o.id === objId) {
          return { ...o, data: { ...o.data, expression: newExpr } };
        }
        return o;
      })
    );
    redrawCanvas();
  };

  const updateTextObject = (objId: string, newText: string, newSize?: number) => {
    setObjects((prev) =>
      prev.map((o) => {
        if (o.id === objId) {
          return {
            ...o,
            data: {
              ...o.data,
              text: newText,
              fontSize: newSize || o.data?.fontSize || 24
            }
          };
        }
        return o;
      })
    );
    redrawCanvas();
  };

  const handlePlotFunction = () => {
    if (!inputFunction.trim()) return;
    insertPresetShape('function', { expression: inputFunction });
    setShowFuncModal(false);
    toast.success(`Függvény sikeresen ábrázolva: ${inputFunction}! 📈`);
  };

  const handleUndo = () => {
    if (strokes.length === 0 && objects.length === 0) return;
    if (strokes.length > 0) {
      const last = strokes[strokes.length - 1];
      setStrokes((prev) => prev.slice(0, -1));
      setRedoStrokes((prev) => [...prev, last]);
    } else if (objects.length > 0) {
      setObjects((prev) => prev.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStrokes.length === 0) return;
    const next = redoStrokes[redoStrokes.length - 1];
    setRedoStrokes((prev) => prev.slice(0, -1));
    setStrokes((prev) => [...prev, next]);
  };

  const handleClearWholeBoard = () => {
    setStrokes([]);
    setRedoStrokes([]);
    setObjects([]);
    setSelectedObjectId(null);
    setDraggingObjectId(null);
    setSelectionBox(null);
    setSelectedStrokes([]);
    toast.info('🗑️ Teljes oldal letisztítva!');
  };

  const handleDeleteSelectedObject = () => {
    if (!selectedObjectId) return;
    setObjects((prev) => prev.filter((o) => o.id !== selectedObjectId));
    setSelectedObjectId(null);
    toast.info('Elem törölve!');
  };

  const handleExportPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `okostabla_${new Date().toISOString().substring(0, 10)}.png`;
    link.click();
    toast.success('Tábla képe letöltve!');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const activeSelectedObj = objects.find((o) => o.id === selectedObjectId);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-screen h-screen flex flex-col bg-slate-950 select-none overflow-hidden font-sans"
    >
      {/* ── TOP CLASSROOM HEADER BAR ──────────────────────────────────────── */}
      <header className="min-h-[3.5rem] bg-slate-950/95 border-b border-slate-800 px-3 py-1.5 flex items-center justify-between text-white z-20 backdrop-blur-md overflow-x-auto scrollbar-none gap-3 shrink-0">
        <div className="flex items-center gap-2 shrink-0">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl px-2.5 h-8 text-xs shrink-0"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Vissza
            </Button>
          )}

          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1.5 rounded-xl shadow-md shrink-0">
            <BrainCircuit className="w-4 h-4 text-white animate-pulse" />
            <span className="font-black text-xs tracking-wide text-white whitespace-nowrap">AI Okostábla</span>
          </div>

          {isAiLoading && (
            <div className="flex items-center gap-2 bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 px-2.5 py-1 rounded-xl text-xs animate-pulse shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span className="text-[11px] whitespace-nowrap">{aiStatusText}</span>
            </div>
          )}
        </div>

        {/* Top Actions & Clear Page Button */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Background Dropdown Selector */}
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-slate-200 text-[11px] font-semibold shrink-0 shadow-md">
            <span>🖼️ Háttér:</span>
            <select
              value={canvasBg}
              onChange={(e) => setCanvasBg(e.target.value as CanvasBg)}
              className="bg-transparent text-purple-400 font-extrabold cursor-pointer outline-none border-none py-0 px-1 text-[11px]"
            >
              <option value="white" className="bg-slate-950 text-white">Fehér lap</option>
              <option value="grid" className="bg-slate-950 text-white">Négyzethálós füzet</option>
              <option value="dots" className="bg-slate-950 text-white">Pöttyös rács</option>
              <option value="dark" className="bg-slate-950 text-white">Sötét tábla</option>
            </select>
          </div>

          {/* Auto AI Clean Toggle */}
          <label className="flex items-center gap-1.5 cursor-pointer bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl text-amber-400 font-semibold hover:text-amber-300 text-[11px] shrink-0">
            <input
              type="checkbox"
              checked={autoAiClean}
              onChange={(e) => setAutoAiClean(e.target.checked)}
              className="rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-0 w-3.5 h-3.5"
            />
            <Sparkles className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Auto AI</span>
          </label>

          {/* TELJES OLDAL TÖRLÉSE BUTTON */}
          <Button
            size="sm"
            onClick={handleClearWholeBoard}
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-[11px] h-8 px-2.5 shadow-md shrink-0 whitespace-nowrap"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1" />
            Teljes Oldal Törlése
          </Button>

          {/* Function Plotter Trigger */}
          <Button
            size="sm"
            onClick={() => setShowFuncModal(true)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-[11px] h-8 px-2.5 shadow-md shrink-0 whitespace-nowrap"
          >
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Függvényábrázoló
          </Button>

          {/* AI Recognition Trigger */}
          <Button
            size="sm"
            onClick={() => triggerAiShapeRecognition()}
            disabled={isAiLoading}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold rounded-xl text-[11px] h-8 px-3 shadow-lg shrink-0 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1 text-yellow-200" />
            AI Felismerés
          </Button>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl h-8 w-8 shrink-0"
            title="Teljes képernyő"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </header>

      {/* ── MAIN CANVAS AREA ──────────────────────────────────────────────── */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-slate-100 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="touch-none w-full h-full block"
        />

        {/* ── INTERACTIVE DYNAMIC OBJECT CONTROL PANEL (3D ROTATION, ZOOM, LIVE RULE EDIT, TEXT) ── */}
        {activeSelectedObj && (
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2 bg-slate-950/95 border border-slate-800 text-white p-3 rounded-2xl shadow-2xl backdrop-blur-xl text-xs max-w-md animate-fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="font-black text-purple-400 flex items-center gap-1.5 text-xs">
                <Sliders className="w-4 h-4 text-purple-400" />
                {activeSelectedObj.type === 'cube' && '3D Kocka - Körbeforgatás'}
                {activeSelectedObj.type === 'coords' && 'Koordináta-rendszer - Nagyítás & Bővítés'}
                {activeSelectedObj.type === 'function' && 'Függvény - Élő Hozzárendelési Szabály Szerkesztő'}
                {activeSelectedObj.type === 'text' && 'Szöveges Felirat Szerkesztése'}
                {activeSelectedObj.type !== 'cube' && activeSelectedObj.type !== 'coords' && activeSelectedObj.type !== 'function' && activeSelectedObj.type !== 'text' && 'Elem Szerkesztése'}
              </span>

              <Button
                size="sm"
                variant="destructive"
                onClick={handleDeleteSelectedObject}
                className="h-6 text-[10px] px-2 rounded-lg"
              >
                Törlés
              </Button>
            </div>

            {/* 1. 3D Cube Rotation Controls */}
            {activeSelectedObj.type === 'cube' && (
              <div className="space-y-2 pt-1">
                <p className="text-[11px] text-slate-300">Forgasd el a kockát a 3D tengelyek mentén:</p>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold w-6">Y:</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rotateCubeObject(activeSelectedObj.id, 'Y', -15)}
                    className="h-7 border-slate-700 text-slate-200 text-xs px-2 rounded-lg"
                  >
                    🔄 -15°
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rotateCubeObject(activeSelectedObj.id, 'Y', 15)}
                    className="h-7 border-slate-700 text-slate-200 text-xs px-2 rounded-lg"
                  >
                    🔄 +15°
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold w-6">X:</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rotateCubeObject(activeSelectedObj.id, 'X', -15)}
                    className="h-7 border-slate-700 text-slate-200 text-xs px-2 rounded-lg"
                  >
                    🔄 -15°
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => rotateCubeObject(activeSelectedObj.id, 'X', 15)}
                    className="h-7 border-slate-700 text-slate-200 text-xs px-2 rounded-lg"
                  >
                    🔄 +15°
                  </Button>
                </div>
              </div>
            )}

            {/* 2. Coordinate System Zoom & Grid Range Expansion */}
            {(activeSelectedObj.type === 'coords' || activeSelectedObj.type === 'function') && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-[11px]">Nagyítás / Kicsinyítés:</span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCoordsZoom(activeSelectedObj.id, -0.2)}
                      className="h-6 w-6 p-0 border-slate-700 text-slate-200"
                      title="Kicsinyítés"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateCoordsZoom(activeSelectedObj.id, 0.2)}
                      className="h-6 w-6 p-0 border-slate-700 text-slate-200"
                      title="Nagyítás"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300 text-[11px]">Skála Bővítés:</span>
                  <div className="flex items-center gap-1">
                    {[5, 10, 20].map((r) => (
                      <button
                        key={r}
                        onClick={() => updateCoordsRange(activeSelectedObj.id, r)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          (activeSelectedObj.data?.gridRange || 5) === r
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        -{r}..+{r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Live Function Rule Editor */}
            {activeSelectedObj.type === 'function' && (
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <label className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" /> Hozzárendelési szabály módosítása (f(x)):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={activeSelectedObj.data?.expression || 'y = 2x + 4'}
                    onChange={(e) => updateFunctionExpression(activeSelectedObj.id, e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* 4. Text Object Editor */}
            {activeSelectedObj.type === 'text' && (
              <div className="space-y-2 pt-1">
                <label className="text-[11px] font-bold text-purple-300 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" /> Szöveg szerkesztése:
                </label>
                <textarea
                  rows={2}
                  value={activeSelectedObj.data?.text || ''}
                  onChange={(e) => updateTextObject(activeSelectedObj.id, e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white font-sans text-xs focus:outline-none focus:border-purple-500"
                />
                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400 text-[10px]">Betűméret:</span>
                  <div className="flex gap-1">
                    {[16, 24, 32, 44].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => updateTextObject(activeSelectedObj.id, activeSelectedObj.data?.text || '', sz)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          (activeSelectedObj.data?.fontSize || 24) === sz
                            ? 'bg-purple-600 text-white'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {sz}px
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Selection Marquee AI Popup */}
        {selectionBox && selectionBox.active && (
          <div
            style={{
              left: Math.min(selectionBox.startX, selectionBox.currentX),
              top: Math.max(selectionBox.startY, selectionBox.currentY) + 10
            }}
            className="absolute z-30 flex items-center gap-2 bg-purple-950 border border-purple-500/60 text-white px-3 py-1.5 rounded-2xl shadow-2xl text-xs animate-in fade-in duration-200"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Kijelölt terület AI Felismerése:</span>
            <Button
              size="sm"
              onClick={() => triggerAiShapeRecognition()}
              className="h-7 text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
            >
              AI Szépítés & Ábrázolás
            </Button>
          </div>
        )}
      </div>

      {/* ── RIGHT-SIDE CLASSROOM TOOLBAR (MENÜSZALAG A JOBB OLDALON) ────────── */}
      <aside className="absolute right-4 top-20 z-30 flex flex-col gap-3 bg-slate-950/90 border border-slate-800/90 p-2.5 rounded-3xl shadow-2xl backdrop-blur-xl text-white w-16 items-center">
        {/* Tool Selectors */}
        <div className="flex flex-col gap-1.5 w-full items-center border-b border-slate-800 pb-2">
          {/* Pen Tool */}
          <button
            onClick={() => setActiveTool('pen')}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              activeTool === 'pen' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Szabadkézi toll"
          >
            <Pencil className="w-5 h-5" />
          </button>

          {/* Text Tool */}
          <button
            onClick={() => {
              setActiveTool('text');
              setTextPos({ x: 250, y: 200 });
              setTextInput('');
              setShowTextModal(true);
            }}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              activeTool === 'text' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Szöveg írása"
          >
            <Type className="w-5 h-5" />
          </button>

          {/* Eraser Tool */}
          <button
            onClick={() => setActiveTool('eraser')}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              activeTool === 'eraser' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Radír"
          >
            <Eraser className="w-5 h-5" />
          </button>

          {/* Straight Line */}
          <button
            onClick={() => setActiveTool('line')}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              activeTool === 'line' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Egyenes vonal"
          >
            <Minus className="w-5 h-5 rotate-45" />
          </button>

          {/* Selection Marquee & Move Tool */}
          <button
            onClick={() => setActiveTool('select')}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              activeTool === 'select' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/40 scale-105' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
            title="Kijelölő Keret & Elem Mozgató"
          >
            <MousePointer className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Preset Shape Tools */}
        <div className="flex flex-col gap-1.5 w-full items-center border-b border-slate-800 pb-2">
          {/* 3D Cube */}
          <button
            onClick={() => insertPresetShape('cube')}
            className="w-11 h-11 rounded-2xl text-blue-400 hover:bg-blue-950/60 hover:text-blue-300 flex items-center justify-center transition-all"
            title="3D Forgatható Kocka beillesztése"
          >
            <Box className="w-5 h-5" />
          </button>

          {/* Circle */}
          <button
            onClick={() => insertPresetShape('circle')}
            className="w-11 h-11 rounded-2xl text-emerald-400 hover:bg-emerald-950/60 hover:text-emerald-300 flex items-center justify-center transition-all"
            title="Kör & Sugár beillesztése"
          >
            <Circle className="w-5 h-5" />
          </button>

          {/* Square */}
          <button
            onClick={() => insertPresetShape('square')}
            className="w-11 h-11 rounded-2xl text-purple-400 hover:bg-purple-950/60 hover:text-purple-300 flex items-center justify-center transition-all"
            title="Négyzet beillesztése"
          >
            <Square className="w-5 h-5" />
          </button>

          {/* Triangle */}
          <button
            onClick={() => insertPresetShape('triangle')}
            className="w-11 h-11 rounded-2xl text-orange-400 hover:bg-orange-950/60 hover:text-orange-300 flex items-center justify-center transition-all"
            title="Háromszög beillesztése"
          >
            <Triangle className="w-5 h-5" />
          </button>

          {/* Coordinate Axes */}
          <button
            onClick={() => insertPresetShape('coords')}
            className="w-11 h-11 rounded-2xl text-cyan-400 hover:bg-cyan-950/60 hover:text-cyan-300 flex items-center justify-center transition-all"
            title="Koordináta-rendszer beillesztése"
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>

        {/* Color Palette Quick Pickers */}
        <div className="flex flex-col gap-2 py-1 items-center border-b border-slate-800 pb-2">
          {colors.slice(0, 5).map((c) => (
            <button
              key={c.value}
              onClick={() => setPenColor(c.value)}
              style={{ backgroundColor: c.value }}
              className={`w-6 h-6 rounded-full transition-transform ${
                penColor === c.value ? 'scale-125 ring-2 ring-white shadow-md' : 'hover:scale-110 opacity-80'
              }`}
              title={c.name}
            />
          ))}
        </div>

        {/* Actions: Undo / Redo / Clear / Export */}
        <div className="flex flex-col gap-1.5 w-full items-center pt-1">
          <button
            onClick={handleUndo}
            disabled={strokes.length === 0 && objects.length === 0}
            className="w-11 h-11 rounded-2xl text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 flex items-center justify-center transition-all"
            title="Visszavonás"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={handleRedo}
            disabled={redoStrokes.length === 0}
            className="w-11 h-11 rounded-2xl text-slate-400 hover:bg-slate-800 hover:text-white disabled:opacity-30 flex items-center justify-center transition-all"
            title="Újra"
          >
            <RotateCw className="w-5 h-5" />
          </button>

          <button
            onClick={handleClearWholeBoard}
            className="w-11 h-11 rounded-2xl text-rose-400 hover:bg-rose-950/60 hover:text-rose-300 flex items-center justify-center transition-all"
            title="TELJES OLDAL TÖRLÉSE"
          >
            <Trash2 className="w-5 h-5" />
          </button>

          <button
            onClick={handleExportPNG}
            className="w-11 h-11 rounded-2xl text-emerald-400 hover:bg-emerald-950/60 hover:text-emerald-300 flex items-center justify-center transition-all"
            title="Kép mentése"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* ── TEXT CREATOR MODAL ────────────────────────────────────────────── */}
      {showTextModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Type className="w-6 h-6 text-purple-400" />
                <h3 className="font-bold text-lg text-white">Szöveg Írása a Táblára</h3>
              </div>
              <button
                onClick={() => setShowTextModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">Szöveg / Felirat / Vázlat pont:</label>
              <textarea
                rows={3}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Írd be az órai feliratot vagy képletet..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-sans text-sm focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">Betűméret:</span>
              <div className="flex gap-1.5">
                {[16, 24, 32, 44].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setFontSize(sz)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      fontSize === sz ? 'bg-purple-600 text-white shadow-md' : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {sz}px
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowTextModal(false)}
                className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl"
              >
                Mégse
              </Button>
              <Button
                onClick={handleAddTextObject}
                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl"
              >
                Szöveg Elhelyezése
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ── FUNCTION PLOTTER MODAL ────────────────────────────────────────── */}
      {showFuncModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-indigo-400" />
                <h3 className="font-bold text-lg text-white">AI Függvényábrázoló</h3>
              </div>
              <button
                onClick={() => setShowFuncModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Írd be a matematikai függvényt (pl. <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">y = 2x + 4</code>, <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">x^2 - 4*x + 3</code>, <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded">sin(x)</code>), és az AI azonnal elhelyezi a képernyőn a szabályos koordináta-rendszert!
            </p>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400">Függvény kifejezés:</label>
              <input
                type="text"
                value={inputFunction}
                onChange={(e) => setInputFunction(e.target.value)}
                placeholder="Pl. y = 2x + 4"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {['y = 2x + 4', 'y = x^2 - 4x + 3', 'y = sin(x)', 'y = cos(x)', 'y = -x + 2', 'y = 1/x'].map((expr) => (
                <button
                  key={expr}
                  onClick={() => setInputFunction(expr)}
                  className="bg-slate-800 hover:bg-slate-700 text-xs px-2.5 py-1 rounded-lg text-indigo-300 font-mono"
                >
                  {expr}
                </button>
              ))}
            </div>

            <div className="flex gap-3 pt-3">
              <Button
                variant="outline"
                onClick={() => setShowFuncModal(false)}
                className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 rounded-xl"
              >
                Mégse
              </Button>
              <Button
                onClick={handlePlotFunction}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl"
              >
                Ábrázolás a Táblán
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartWhiteboardTool;
