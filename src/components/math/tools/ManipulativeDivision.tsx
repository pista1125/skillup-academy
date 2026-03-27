import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Trash2,
    RotateCcw,
    Plus,
    ArrowRight,
    ArrowLeft,
    Hand,
    Maximize2,
    Grid3X3,
    Divide,
    Combine,
    Magnet,
    MousePointer2
} from 'lucide-react';
import { cn } from '@/lib/utils';

type BlockType = 'thousand' | 'hundred' | 'ten' | 'one';

interface Block {
    id: string;
    type: BlockType;
    x: number;
    y: number;
    inBasketId?: string | null;
}

interface Basket {
    id: string;
    index: number;
}

interface ManipulativeDivisionProps {
    onBack: () => void;
}

export function ManipulativeDivision({ onBack }: ManipulativeDivisionProps) {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [baskets, setBaskets] = useState<Basket[]>([]);
    const [draggingBlockId, setDraggingBlockId] = useState<string | null>(null);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [magnetEnabled, setMagnetEnabled] = useState(false);
    const workspaceRef = useRef<HTMLDivElement>(null);

    // Sidebar block definitions
    const sidebarBlocks: { type: BlockType; label: string; color: string }[] = [
        { type: 'thousand', label: '1000', color: 'bg-red-500' },
        { type: 'hundred', label: '100', color: 'bg-green-500' },
        { type: 'ten', label: '10', color: 'bg-blue-500' },
        { type: 'one', label: '1', color: 'bg-yellow-500' },
    ];

    const SNAP_SIZE = 20;

    const snap = (val: number) => {
        return magnetEnabled ? Math.round(val / SNAP_SIZE) * SNAP_SIZE : val;
    };

    const addBlock = (type: BlockType, x: number, y: number) => {
        const newBlock: Block = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            x: snap(x),
            y: snap(y),
            inBasketId: null
        };
        setBlocks(prev => [...prev, newBlock]);
        setSelectedBlockId(newBlock.id);
    };

    const breakDownBlock = (blockId: string | null) => {
        if (!blockId) return;
        const block = blocks.find(b => b.id === blockId);
        if (!block || block.type === 'one') return;

        const newType: BlockType = block.type === 'thousand' ? 'hundred' : (block.type === 'hundred' ? 'ten' : 'one');
        const newSubBlocks: Block[] = Array.from({ length: 10 }).map((_, i) => ({
            id: Math.random().toString(36).substr(2, 9),
            type: newType,
            x: block.x + (i % 5) * (newType === 'hundred' ? 40 : 25),
            y: block.y + Math.floor(i / 5) * (newType === 'hundred' ? 40 : 25),
            inBasketId: block.inBasketId
        }));

        setBlocks(prev => prev.filter(b => b.id !== block.id).concat(newSubBlocks));
        setSelectedBlockId(null);
    };

    const groupBlocks = () => {
        // Collect blocks that match and merge them.
        const typePriorities: BlockType[] = ['one', 'ten', 'hundred'];

        for (const type of typePriorities) {
            const sameTypeBlocks = blocks.filter(b => b.type === type);
            if (sameTypeBlocks.length >= 10) {
                const toRemove = sameTypeBlocks.slice(0, 10);
                const idsToRemove = new Set(toRemove.map(b => b.id));

                const avgX = toRemove.reduce((sum, b) => sum + b.x, 0) / 10;
                const avgY = toRemove.reduce((sum, b) => sum + b.y, 0) / 10;

                let newType: BlockType = 'one';
                if (type === 'one') newType = 'ten';
                else if (type === 'ten') newType = 'hundred';
                else if (type === 'hundred') newType = 'thousand';

                const newBlock: Block = {
                    id: Math.random().toString(36).substr(2, 9),
                    type: newType,
                    x: snap(avgX),
                    y: snap(avgY),
                    inBasketId: toRemove[0].inBasketId
                };

                setBlocks(prev => prev.filter(b => !idsToRemove.has(b.id)).concat(newBlock));
                setSelectedBlockId(newBlock.id);
                return;
            }
        }
    };

    const handleMouseDown = (e: React.MouseEvent, blockId: string) => {
        e.stopPropagation();
        const block = blocks.find(b => b.id === blockId);
        if (!block) return;

        setSelectedBlockId(blockId);
        setDraggingBlockId(blockId);

        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };

    const handleWorkspaceMouseMove = (e: React.MouseEvent) => {
        if (!draggingBlockId || !workspaceRef.current) return;

        const rect = workspaceRef.current.getBoundingClientRect();
        const rawX = e.clientX - rect.left - dragOffset.x;
        const rawY = e.clientY - rect.top - dragOffset.y;

        setBlocks(prev => prev.map(b =>
            b.id === draggingBlockId ? { ...b, x: snap(rawX), y: snap(rawY) } : b
        ));
    };

    const handleMouseUp = () => {
        setDraggingBlockId(null);
    };

    const addBasket = () => {
        if (baskets.length >= 6) return;
        setBaskets(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), index: prev.length }]);
    };

    const removeBasket = () => {
        setBaskets(prev => {
            const lastBasket = prev[prev.length - 1];
            if (lastBasket) {
                // Orphan blocks in this basket
                setBlocks(b => b.map(block => block.inBasketId === lastBasket.id ? { ...block, inBasketId: null } : block));
            }
            return prev.slice(0, -1);
        });
    };

    const deleteSelected = () => {
        if (selectedBlockId) {
            setBlocks(prev => prev.filter(b => b.id !== selectedBlockId));
            setSelectedBlockId(null);
        }
    };

    const reset = () => {
        setBlocks([]);
        setBaskets([]);
        setSelectedBlockId(null);
    };

    useEffect(() => {
        // Detect blocks in baskets after dragging ends
        if (!draggingBlockId) {
            setBlocks(prev => prev.map(block => {
                if (!workspaceRef.current) return block;
                const workspaceHeight = workspaceRef.current.clientHeight;
                const basketHeight = workspaceHeight / 3;

                if (block.y > workspaceHeight - basketHeight) {
                    // It's in the basket area. Find which one.
                    const workspaceWidth = workspaceRef.current.clientWidth;
                    const basketWidth = workspaceWidth / baskets.length;
                    const basketIndex = Math.floor(block.x / basketWidth);
                    const targetBasket = baskets[basketIndex];
                    return { ...block, inBasketId: targetBasket?.id || null };
                }
                return { ...block, inBasketId: null };
            }));
        }
    }, [draggingBlockId, baskets.length]);

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] min-h-[850px] bg-slate-50 rounded-3xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-sm z-20">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-100 rounded-full">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Osztás vizuálisan</h2>
                        <p className="text-[10px] text-slate-500 italic">Használj helyiérték-blokkokat az osztás megértéséhez!</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-slate-100 p-1 rounded-xl mr-2">
                        <Button
                            variant={magnetEnabled ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setMagnetEnabled(!magnetEnabled)}
                            className={cn("rounded-lg h-9 w-9 p-0", magnetEnabled ? "bg-indigo-600" : "text-slate-500")}
                            title="Mágnes funkció (Rácshoz illesztés)"
                        >
                            <Magnet className="w-4 h-4" />
                        </Button>
                    </div>

                    <Button
                        variant="outline"
                        onClick={() => breakDownBlock(selectedBlockId)}
                        disabled={!selectedBlockId || blocks.find(b => b.id === selectedBlockId)?.type === 'one'}
                        className="bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100 rounded-xl"
                    >
                        <Divide className="w-4 h-4 mr-2" /> Szétbontás
                    </Button>

                    <Button
                        variant="outline"
                        onClick={groupBlocks}
                        className="bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100 rounded-xl"
                    >
                        <Combine className="w-4 h-4 mr-2" /> Összevonás
                    </Button>

                    <div className="w-px h-6 bg-slate-200 mx-1" />

                    <Button variant="outline" onClick={addBasket} className="bg-white border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl">
                        <Plus className="w-4 h-4 mr-2" /> Új csoport
                    </Button>

                    <Button variant="ghost" size="icon" onClick={deleteSelected} disabled={!selectedBlockId} className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full">
                        <Trash2 className="w-5 h-5" />
                    </Button>

                    <Button variant="ghost" size="icon" onClick={reset} className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
                        <RotateCcw className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
                {/* Sidebar */}
                <Card className="w-48 m-2 rounded-2xl border-slate-200 shadow-sm flex flex-col gap-8 p-6 bg-white z-10 overflow-y-auto shrink-0">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] text-center mb-2">Eszköztár</h3>
                    {sidebarBlocks.map(sb => (
                        <div
                            key={sb.type}
                            className="flex flex-col items-center gap-3 group"
                        >
                            <div
                                className={cn(
                                    "rounded-lg shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md cursor-grab active:cursor-grabbing border-b-4 border-black/10",
                                    sb.color,
                                    sb.type === 'thousand' ? 'w-24 h-24 scale-110' : sb.type === 'hundred' ? 'w-24 h-24' : sb.type === 'ten' ? 'w-8 h-24' : 'w-8 h-8'
                                )}
                                onClick={() => addBlock(sb.type, 50, 50)}
                                draggable
                                onDragEnd={(e) => {
                                    if (workspaceRef.current) {
                                        const rect = workspaceRef.current.getBoundingClientRect();
                                        addBlock(sb.type, e.clientX - rect.left - 20, e.clientY - rect.top - 20);
                                    }
                                }}
                            />
                            <span className="text-sm font-bold text-slate-600">{sb.label}</span>
                        </div>
                    ))}

                    <div className="mt-auto p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200 italic text-[10px] text-slate-400 text-center flex flex-col gap-2">
                        <Hand className="w-4 h-4 mx-auto opacity-50" />
                        <span>Húzd a munkaterületre vagy kattints a hozzáadáshoz!</span>
                    </div>
                </Card>

                {/* Workspace Container */}
                <div className="flex-1 flex flex-col m-2 ml-0 gap-2 overflow-hidden">
                    {/* Main Workspace */}
                    <div
                        ref={workspaceRef}
                        className="flex-1 rounded-3xl bg-white border border-slate-200 shadow-inner relative overflow-hidden cursor-default"
                        onMouseMove={handleWorkspaceMouseMove}
                        onMouseUp={handleMouseUp}
                        onClick={() => setSelectedBlockId(null)}
                        style={{
                            backgroundImage: magnetEnabled
                                ? 'radial-gradient(#e2e8f0 1.5px, transparent 1.5px)'
                                : 'none',
                            backgroundSize: '20px 20px'
                        }}
                    >
                        {/* Background guide if empty */}
                        {blocks.length === 0 && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none opacity-50 animate-pulse">
                                <Grid3X3 className="w-16 h-16 mb-4" />
                                <p className="text-lg font-medium">Kezdj el blokkokat behúzni!</p>
                            </div>
                        )}

                        {/* Baskets Area (Visual Separator) */}
                        <div className="absolute bottom-0 left-0 right-0 h-1/3 border-t-2 border-dashed border-slate-100 bg-slate-50/30 flex justify-around items-end p-6 gap-6 z-0">
                            {baskets.map((basket, i) => (
                                <div
                                    key={basket.id}
                                    className="flex-1 h-full rounded-3xl border-4 border-dashed border-slate-200 bg-white/40 flex flex-col items-center justify-center relative transition-all duration-300 group hover:border-blue-400/50 hover:bg-blue-50/30"
                                >
                                    <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-200/50 rounded-full text-xs font-black text-slate-500 tracking-widest uppercase">
                                        CSOPORT {i + 1}
                                    </div>
                                    <div className="flex flex-col items-center gap-2 opacity-10 group-hover:opacity-20 transition-opacity">
                                        <Hand className="w-12 h-12" />
                                    </div>
                                </div>
                            ))}
                            {baskets.length === 0 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 italic pointer-events-none">
                                    <Hand className="w-8 h-8 mb-2 opacity-50" />
                                    <p>Hozzáadott csoportok ide kerülnek</p>
                                </div>
                            )}
                        </div>

                        {/* Draggable Blocks */}
                        {blocks.map(block => (
                            <div
                                key={block.id}
                                className={cn(
                                    "absolute cursor-grab active:cursor-grabbing transition-transform duration-75",
                                    "rounded-xl border-b-4 border-black/20 flex items-center justify-center text-white/50 font-black tracking-tighter select-none shadow-md",
                                    draggingBlockId === block.id ? "z-50 shadow-2xl scale-110 brightness-110" : "z-20",
                                    selectedBlockId === block.id ? "ring-4 ring-blue-400 ring-offset-2 ring-offset-white" : "",
                                    sidebarBlocks.find(sb => sb.type === block.type)?.color
                                )}
                                style={{
                                    left: block.x,
                                    top: block.y,
                                    width: block.type === 'thousand' ? 140 : block.type === 'hundred' ? 120 : block.type === 'ten' ? 30 : 25,
                                    height: block.type === 'thousand' ? 140 : block.type === 'hundred' ? 120 : block.type === 'ten' ? 90 : 25,
                                    fontSize: block.type === 'thousand' ? '20px' : block.type === 'hundred' ? '18px' : '10px'
                                }}
                                onMouseDown={(e) => handleMouseDown(e, block.id)}
                                onDoubleClick={(e) => { e.stopPropagation(); breakDownBlock(block.id); }}
                                title="Kattints duplán vagy használd a fenti gombot a felbontáshoz!"
                            >
                                {block.type === 'one' ? '' : block.type === 'ten' ? '10' : block.type === 'hundred' ? '100' : '1000'}
                            </div>
                        ))}
                    </div>

                    {/* Status Info Footer */}
                    <div className="bg-white border border-slate-200 rounded-2xl px-6 py-3 flex justify-between items-center text-sm font-medium text-slate-600 shadow-sm">
                        <div className="flex gap-4">
                            <span className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-red-500 rounded" /> {blocks.filter(b => b.type === 'thousand').length} ezres
                            </span>
                            <span className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-green-500 rounded" /> {blocks.filter(b => b.type === 'hundred').length} százas
                            </span>
                            <span className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-blue-500 rounded" /> {blocks.filter(b => b.type === 'ten').length} tízes
                            </span>
                            <span className="flex items-center gap-1.5">
                                <div className="w-3 h-3 bg-yellow-500 rounded" /> {blocks.filter(b => b.type === 'one').length} egyes
                            </span>
                        </div>
                        <div className="text-slate-400 flex items-center gap-2">
                            <Plus className="w-4 h-4" /> Összérték: <span className="text-slate-800 font-bold">
                                {blocks.reduce((acc, b) => acc + (b.type === 'thousand' ? 1000 : b.type === 'hundred' ? 100 : b.type === 'ten' ? 10 : 1), 0)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
