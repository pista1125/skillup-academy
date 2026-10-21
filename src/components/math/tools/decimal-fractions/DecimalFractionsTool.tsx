import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Combine, Split, RotateCcw, MousePointer2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DecimalFractionsToolProps {
    onBack: () => void;
}

type DiskValue = 100 | 10 | 1 | 0.1 | 0.01 | 0.001;

interface Disk {
    id: string;
    value: DiskValue;
    x: number;
    y: number;
    isNew?: boolean; // For animation
}

const DISK_VALUES: { value: DiskValue; label: string; color: string; textColor: string }[] = [
    { value: 100, label: '100', color: 'bg-rose-500', textColor: 'text-white' },
    { value: 10, label: '10', color: 'bg-red-600', textColor: 'text-white' },
    { value: 1, label: '1', color: 'bg-blue-500', textColor: 'text-white' },
    { value: 0.1, label: '0,1', color: 'bg-amber-800', textColor: 'text-white' },
    { value: 0.01, label: '0,01', color: 'bg-emerald-600', textColor: 'text-white' },
    { value: 0.001, label: '0,001', color: 'bg-orange-400', textColor: 'text-black' },
];

export function DecimalFractionsTool({ onBack }: DecimalFractionsToolProps) {
    const [disks, setDisks] = useState<Disk[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const workspaceRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
    const [draggedDiskId, setDraggedDiskId] = useState<string | null>(null);

    // Add a new disk
    const addDisk = (value: DiskValue) => {
        if (!workspaceRef.current) return;

        // Random position within a central area to avoid overlap with edges
        const width = workspaceRef.current.clientWidth;
        const height = workspaceRef.current.clientHeight;

        // Add some randomness but keep it visible
        const x = width / 2 - 25 + (Math.random() * 100 - 50);
        const y = height / 2 - 25 + (Math.random() * 100 - 50);

        const newDisk: Disk = {
            id: Math.random().toString(36).substr(2, 9),
            value,
            x,
            y,
            isNew: true
        };

        setDisks(prev => [...prev, newDisk]);

        // Remove isNew flag after animation
        setTimeout(() => {
            setDisks(prev => prev.map(d => d.id === newDisk.id ? { ...d, isNew: false } : d));
        }, 500);
    };

    const toggleSelection = (id: string, multi: boolean) => {
        if (isDragging) return; // Don't select if we were dragging

        const newSelected = new Set(multi ? selectedIds : []);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedIds(newSelected);
    };

    const clearSelection = () => {
        if (!isDragging) {
            setSelectedIds(new Set());
        }
    };

    const handleMouseDown = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDraggedDiskId(id);
        setDragStart({ x: e.clientX, y: e.clientY });
        setIsDragging(false); // separate click vs drag
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggedDiskId || !dragStart) return;

        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;

        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            setIsDragging(true);
        }

        if (isDragging) {
            setDisks(prev => prev.map(d => {
                if (d.id === draggedDiskId || (selectedIds.has(draggedDiskId) && selectedIds.has(d.id))) {
                    return { ...d, x: d.x + dx, y: d.y + dy };
                }
                return d;
            }));
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setDraggedDiskId(null);
        setDragStart(null);
        setTimeout(() => setIsDragging(false), 0);
    };

    const deleteSelected = () => {
        setDisks(prev => prev.filter(d => !selectedIds.has(d.id)));
        setSelectedIds(new Set());
    };

    const resetAll = () => {
        setDisks([]);
        setSelectedIds(new Set());
    };

    // Logic for Merging (10x smaller -> 1x larger)
    const canMerge = () => {
        if (selectedIds.size !== 10) return false;
        const selectedDisks = disks.filter(d => selectedIds.has(d.id));
        const firstValue = selectedDisks[0]?.value;
        return selectedDisks.every(d => d.value === firstValue) && firstValue < 100;
    };

    const handleMerge = () => {
        if (!canMerge()) return;

        const selectedDisks = disks.filter(d => selectedIds.has(d.id));
        const firstValue = selectedDisks[0].value;

        // Calculate center of selected disks
        const centerX = selectedDisks.reduce((sum, d) => sum + d.x, 0) / 10;
        const centerY = selectedDisks.reduce((sum, d) => sum + d.y, 0) / 10;

        // Find next value
        const currentIndex = DISK_VALUES.findIndex(v => v.value === firstValue);
        // Note: DISK_VALUES is sorted descending (100, 10, 1...), so next LARGER value is index - 1
        const nextValueObj = DISK_VALUES[currentIndex - 1];

        if (!nextValueObj) return;

        // Remove old disks and add new one
        setDisks(prev => {
            const remaining = prev.filter(d => !selectedIds.has(d.id));
            const newDisk: Disk = {
                id: Math.random().toString(36).substr(2, 9),
                value: nextValueObj.value,
                x: centerX,
                y: centerY,
                isNew: true
            };
            return [...remaining, newDisk];
        });

        setSelectedIds(new Set());
    };

    // Logic for Breaking (1x larger -> 10x smaller)
    const canBreak = () => {
        if (selectedIds.size !== 1) return false;
        const disk = disks.find(d => selectedIds.has(Array.from(selectedIds)[0]!));
        return disk ? disk.value > 0.001 : false;
    };

    const handleBreak = () => {
        if (!canBreak()) return;

        const diskId = Array.from(selectedIds)[0];
        const disk = disks.find(d => d.id === diskId);
        if (!disk) return;

        // Find prev value (smaller)
        const currentIndex = DISK_VALUES.findIndex(v => v.value === disk.value);
        // DISK_VALUES sorted descending, so smaller is index + 1
        const smallerValueObj = DISK_VALUES[currentIndex + 1];

        if (!smallerValueObj) return;

        setDisks(prev => {
            const remaining = prev.filter(d => d.id !== diskId);
            const newDisks: Disk[] = [];

            // Create 10 new disks in a grid/circle pattern around the original
            for (let i = 0; i < 10; i++) {
                const angle = (i / 10) * Math.PI * 2;
                const radius = 40;
                newDisks.push({
                    id: Math.random().toString(36).substr(2, 9) + i,
                    value: smallerValueObj.value,
                    x: disk.x + Math.cos(angle) * radius,
                    y: disk.y + Math.sin(angle) * radius,
                    isNew: true
                });
            }
            return [...remaining, ...newDisks];
        });

        setSelectedIds(new Set());
    };

    return (
        <div className="flex flex-col h-screen max-h-[calc(100vh-100px)] gap-4 animate-in fade-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <Button variant="ghost" onClick={onBack} className="hover:bg-slate-100">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza
                </Button>
                <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Tizedestörtek
                </h2>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={deleteSelected}
                        disabled={selectedIds.size === 0}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Törlés ({selectedIds.size})
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetAll}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Mindent töröl
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col gap-4 overflow-y-auto">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider text-center mb-2">Eszközök</h3>
                    <div className="space-y-3">
                        {DISK_VALUES.map((dv) => (
                            <button
                                key={dv.value}
                                onClick={() => addDisk(dv.value)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all group active:scale-95"
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110",
                                    dv.color,
                                    dv.textColor
                                )}>
                                    {dv.label}
                                </div>
                                <span className="font-medium text-slate-600 group-hover:text-slate-900">{dv.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
                        <Button
                            variant="secondary"
                            className={cn("w-full transition-all", canMerge() ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md" : "opacity-50 cursor-not-allowed")}
                            disabled={!canMerge()}
                            onClick={handleMerge}
                        >
                            <Combine className="w-4 h-4 mr-2" />
                            Beváltás (10→1)
                        </Button>

                        <Button
                            variant="secondary"
                            className={cn("w-full transition-all", canBreak() ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md" : "opacity-50 cursor-not-allowed")}
                            disabled={!canBreak()}
                            onClick={handleBreak}
                        >
                            <Split className="w-4 h-4 mr-2" />
                            Felbontás (1→10)
                        </Button>
                    </div>
                </div>

                {/* Workspace */}
                <div
                    ref={workspaceRef}
                    className="flex-1 bg-white rounded-2xl shadow-inner border border-slate-200 relative overflow-hidden cursor-crosshair select-none bg-grid-pattern"
                    onClick={clearSelection}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    style={{
                        backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                >
                    {disks.length === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                            <MousePointer2 className="w-12 h-12 mb-4 opacity-50" />
                            <p className="text-lg font-medium">Kattints a bal oldali korongokra a hozzáadáshoz</p>
                            <p className="text-sm">Jelölj ki többet a beváltáshoz!</p>
                        </div>
                    )}

                    {disks.map(disk => {
                        const diskInfo = DISK_VALUES.find(dv => dv.value === disk.value);
                        const isSelected = selectedIds.has(disk.id);

                        return (
                            <div
                                key={disk.id}
                                className={cn(
                                    "absolute w-14 h-14 rounded-full flex items-center justify-center font-bold text-sm shadow-md cursor-grab active:cursor-grabbing transition-shadow select-none hover:brightness-110",
                                    diskInfo?.color,
                                    diskInfo?.textColor,
                                    isSelected && "ring-4 ring-offset-2 ring-indigo-500 z-10",
                                    disk.isNew && "animate-in zoom-in-50 duration-300"
                                )}
                                style={{
                                    left: disk.x,
                                    top: disk.y,
                                    transform: 'translate(-50%, -50%)', // Center on coordinate
                                }}
                                onMouseDown={(e) => handleMouseDown(e, disk.id)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isDragging) {
                                        toggleSelection(disk.id, e.ctrlKey || e.shiftKey || true); // Default to multi-select for easier usage? Or click to select/deselect
                                    }
                                }}
                            >
                                {diskInfo?.label}
                            </div>
                        );
                    })}

                    {/* Selection Info Overlay */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-slate-100 text-xs text-slate-500 font-mono pointer-events-none">
                        Kijelölve: {selectedIds.size} db | Összeg: {disks.filter(d => selectedIds.has(d.id)).reduce((sum, d) => sum + d.value, 0).toLocaleString('hu-HU')}
                    </div>
                </div>
            </div>
        </div>
    );
}
