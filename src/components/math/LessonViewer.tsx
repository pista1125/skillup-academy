import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    X,
    Maximize2,
    Minimize2,
    Eraser,
    Pencil,
    Wrench,
    Calculator as CalcIcon,
    ChevronRight,
    ChevronLeft,
    Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DivisibilityTool } from './DivisibilityTool';

interface LessonViewerProps {
    material: {
        title: string;
        path: string;
    };
    onClose: () => void;
}

export function LessonViewer({ material, onClose }: LessonViewerProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showToolbox, setShowToolbox] = useState(true);
    const [activeTool, setActiveTool] = useState<'whiteboard' | 'divisibility' | 'none'>('whiteboard');

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#4f46e5');

    useEffect(() => {
        if (activeTool === 'whiteboard' && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;
            }
        }
    }, [activeTool, showToolbox]);

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDrawing(true);
        draw(e);
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) ctx.beginPath();
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing || !canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        let x, y;

        if ('touches' in e) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }

        ctx.strokeStyle = color;
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    };

    return (
        <div className={cn(
            "fixed inset-0 z-50 bg-slate-900 flex flex-col transition-all",
            isFullscreen ? "p-0" : "p-4 md:p-8"
        )}>
            {/* Header */}
            <div className="flex items-center justify-between bg-white px-6 py-3 rounded-t-xl border-b shadow-md z-10">
                <div className="flex items-center gap-4">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <h2 className="font-bold text-slate-800">{material.title}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-slate-600"
                    >
                        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={onClose} className="text-destructive hover:bg-destructive/10">
                        <X className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            {/* Main Container */}
            <div className="flex-1 flex overflow-hidden relative bg-slate-200">
                {/* PDF Viewer */}
                <div className={cn(
                    "flex-1 flex flex-col h-full bg-slate-300 transition-all duration-300",
                    showToolbox ? "mr-0" : ""
                )}>
                    <object
                        data={`${material.path}#toolbar=0&navpanes=0&scrollbar=1`}
                        type="application/pdf"
                        className="w-full h-full"
                    >
                        <p className="p-10 text-center">
                            A PDF nem jeleníthető meg. <a href={material.path} target="_blank" className="text-primary underline">Kattints ide a megnyitáshoz!</a>
                        </p>
                    </object>
                </div>

                {/* Toolbox Trigger */}
                <Button
                    variant="secondary"
                    size="icon"
                    className={cn(
                        "absolute right-4 top-1/2 -translate-y-1/2 z-20 shadow-xl border-2 border-primary/20 bg-white hover:bg-slate-50",
                        showToolbox && "right-[416px]"
                    )}
                    onClick={() => setShowToolbox(!showToolbox)}
                >
                    {showToolbox ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </Button>

                {/* Toolbox Sidebar */}
                <div className={cn(
                    "w-[400px] h-full bg-white border-l shadow-2xl flex flex-col transition-all duration-300 z-10 overflow-hidden",
                    !showToolbox && "mr-[-400px] opacity-0"
                )}>
                    <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-500">Tanári Eszköztár</h3>
                        <div className="flex gap-1">
                            <Button
                                size="sm"
                                variant={activeTool === 'whiteboard' ? 'default' : 'outline'}
                                onClick={() => setActiveTool('whiteboard')}
                                className="h-8 px-2 text-[10px]"
                            >
                                <Pencil className="w-3 h-3 mr-1" /> Jegyzet
                            </Button>
                            <Button
                                size="sm"
                                variant={activeTool === 'divisibility' ? 'default' : 'outline'}
                                onClick={() => setActiveTool('divisibility')}
                                className="h-8 px-2 text-[10px]"
                            >
                                <CalcIcon className="w-3 h-3 mr-1" /> Matek
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                        {activeTool === 'whiteboard' && (
                            <div className="h-full flex flex-col gap-4 animate-in fade-in duration-300">
                                <div className="flex items-center justify-between gap-2 p-2 bg-slate-100 rounded-lg">
                                    <div className="flex gap-1">
                                        {['#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#000000'].map(c => (
                                            <button
                                                key={c}
                                                className={cn(
                                                    "w-6 h-6 rounded-full border-2",
                                                    color === c ? "border-slate-800 scale-110" : "border-transparent"
                                                )}
                                                style={{ backgroundColor: c }}
                                                onClick={() => setColor(c)}
                                            />
                                        ))}
                                    </div>
                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={clearCanvas}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="flex-1 relative cursor-crosshair border-2 border-slate-200 rounded-xl bg-white overflow-hidden shadow-inner">
                                    <canvas
                                        ref={canvasRef}
                                        width={368}
                                        height={500}
                                        className="w-full h-full"
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseLeave={stopDrawing}
                                        onTouchStart={startDrawing}
                                        onTouchMove={draw}
                                        onTouchEnd={stopDrawing}
                                    />
                                </div>
                                <p className="text-[10px] text-center text-slate-400 italic">
                                    Használd a táblát gyors vázlatokhoz vagy magyarázatokhoz!
                                </p>
                            </div>
                        )}

                        {activeTool === 'divisibility' && (
                            <div className="animate-in slide-in-from-right-4 duration-300">
                                <DivisibilityTool onBack={() => setActiveTool('none')} />
                            </div>
                        )}

                        {activeTool === 'none' && (
                            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-slate-400">
                                <Wrench className="w-12 h-12 mb-4 opacity-10" />
                                <p>Válassz egy eszközt a fenti menüből!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { BookOpen } from 'lucide-react';
