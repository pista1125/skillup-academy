import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Combine, Split, RotateCcw, MousePointer2, Plus, Minus, Coins, ChevronRight, Calculator, Eye, EyeOff, Eraser, Undo2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

interface MoneyCalculationToolProps {
    onBack: () => void;
}

type CoinValue = 1 | 2 | 5 | 10 | 20 | 50 | 100 | 200;

interface Coin {
    id: string;
    value: CoinValue;
    x: number;
    y: number;
    isNew?: boolean;
}

const COIN_VALUES: { value: CoinValue; label: string; color: string; textColor: string; size: string }[] = [
    { value: 200, label: '200', color: 'bg-yellow-100 border-yellow-400', textColor: 'text-yellow-800', size: 'w-16 h-16' },
    { value: 100, label: '100', color: 'bg-slate-200 border-slate-400', textColor: 'text-slate-700', size: 'w-14 h-14' },
    { value: 50, label: '50', color: 'bg-slate-300 border-slate-500', textColor: 'text-slate-800', size: 'w-14 h-14' },
    { value: 20, label: '20', color: 'bg-amber-100 border-amber-400', textColor: 'text-amber-800', size: 'w-12 h-12' },
    { value: 10, label: '10', color: 'bg-amber-200 border-amber-500', textColor: 'text-amber-900', size: 'w-12 h-12' },
    { value: 5, label: '5', color: 'bg-yellow-200 border-yellow-500', textColor: 'text-yellow-900', size: 'w-12 h-12' },
    { value: 2, label: '2', color: 'bg-slate-100 border-slate-300', textColor: 'text-slate-600', size: 'w-10 h-10' },
    { value: 1, label: '1', color: 'bg-orange-100 border-orange-300', textColor: 'text-orange-800', size: 'w-10 h-10' },
];

export function MoneyCalculationTool({ onBack }: MoneyCalculationToolProps) {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const workspaceRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
    const [draggedCoinId, setDraggedCoinId] = useState<string | null>(null);
    const [breakDialogOpen, setBreakDialogOpen] = useState(false);
    const [coinToBreak, setCoinToBreak] = useState<Coin | null>(null);
    const [breakOptions, setBreakOptions] = useState<{ value: CoinValue; count: number }[][]>([]);
    const [draggedOffset, setDraggedOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [mathProblem, setMathProblem] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [isSubtractionMode, setIsSubtractionMode] = useState(false);
    const [history, setHistory] = useState<Coin[][]>([]);

    const saveState = () => {
        setHistory(prev => [...prev, [...coins]].slice(-50)); // Keep last 50 steps
    };

    const handleUndo = () => {
        if (history.length === 0) return;
        const previousState = history[history.length - 1];
        setCoins(previousState);
        setHistory(prev => prev.slice(0, -1));
        setSelectedIds(new Set());
    };

    // Add a new coin
    const addCoin = (value: CoinValue, x?: number, y?: number) => {
        if (!workspaceRef.current) return;
        saveState();

        const width = workspaceRef.current.clientWidth;
        const height = workspaceRef.current.clientHeight;

        const finalX = x ?? (width / 2 - 25 + (Math.random() * 100 - 50));
        const finalY = y ?? (height / 2 - 25 + (Math.random() * 100 - 50));

        const newCoin: Coin = {
            id: Math.random().toString(36).substr(2, 9),
            value,
            x: finalX,
            y: finalY,
            isNew: true
        };

        setCoins(prev => [...prev, newCoin]);

        setTimeout(() => {
            setCoins(prev => prev.map(c => c.id === newCoin.id ? { ...c, isNew: false } : c));
        }, 500);
    };

    const toggleSelection = (id: string, multi: boolean) => {
        if (isDragging) return;

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
        setDraggedCoinId(id);
        setDragStart({ x: e.clientX, y: e.clientY });
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!draggedCoinId || !dragStart) return;

        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;

        if (!isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
            setIsDragging(true);
        }

        if (isDragging) {
            setDraggedOffset({ x: dx, y: dy });
        }
    };

    const handleMouseUp = () => {
        if (isDragging && draggedCoinId) {
            saveState();
            setCoins(prev => prev.map(c => {
                if (c.id === draggedCoinId || (selectedIds.has(draggedCoinId) && selectedIds.has(c.id))) {
                    return { ...c, x: c.x + draggedOffset.x, y: c.y + draggedOffset.y };
                }
                return c;
            }));
        }
        setDraggedCoinId(null);
        setDragStart(null);
        setDraggedOffset({ x: 0, y: 0 });
        setTimeout(() => setIsDragging(false), 0);
    };

    const deleteSelected = () => {
        if (selectedIds.size === 0) return;
        saveState();
        setCoins(prev => prev.filter(c => !selectedIds.has(c.id)));
        setSelectedIds(new Set());
    };

    const resetAll = () => {
        if (coins.length === 0) return;
        saveState();
        setCoins([]);
        setSelectedIds(new Set());
    };

    const clearSubtractionZone = () => {
        if (!workspaceRef.current) return;
        saveState();
        const width = workspaceRef.current.clientWidth;
        const zoneWidth = 250;
        const zoneLeft = width - zoneWidth;

        setCoins(prev => prev.filter(c => {
            // Check if coin center is in the zone
            const isInside = c.x > zoneLeft;
            return !isInside;
        }));
    };

    const calculateResult = () => {
        try {
            // Simple evaluation for expressions like "153+27"
            // Safety: only allow numbers and + - * / ( )
            const cleanProblem = mathProblem.replace(/[^0-9+\-*/().]/g, '');
            // Using Function constructor as a simple eval for basic math
            const result = new Function(`return ${cleanProblem}`)();
            return result.toLocaleString('hu-HU');
        } catch {
            return 'Érvénytelen';
        }
    };

    // Merging logic
    const canCombine = () => {
        if (selectedIds.size < 2) return false;
        const totalSelected = coins.filter(c => selectedIds.has(c.id)).reduce((sum, c) => sum + c.value, 0);
        return COIN_VALUES.some(v => v.value === totalSelected && v.value > Math.max(...coins.filter(c => selectedIds.has(c.id)).map(c => c.value)));
    };

    const handleCombine = () => {
        if (!canCombine()) return;
        saveState();

        const selectedCoins = coins.filter(c => selectedIds.has(c.id));
        const totalValue = selectedCoins.reduce((sum, c) => sum + c.value, 0) as CoinValue;

        const centerX = selectedCoins.reduce((sum, c) => sum + c.x, 0) / selectedCoins.length;
        const centerY = selectedCoins.reduce((sum, c) => sum + c.y, 0) / selectedCoins.length;

        setCoins(prev => {
            const remaining = prev.filter(c => !selectedIds.has(c.id));
            const newCoin: Coin = {
                id: Math.random().toString(36).substr(2, 9),
                value: totalValue,
                x: centerX,
                y: centerY,
                isNew: true
            };
            return [...remaining, newCoin];
        });

        setSelectedIds(new Set());
    };

    // Breaking logic
    const getBreakOptions = (value: CoinValue): { value: CoinValue; count: number }[][] => {
        const options: { value: CoinValue; count: number }[][] = [];

        // Find all uniform divisors that are coin values
        const denominations: CoinValue[] = [100, 50, 20, 10, 5, 2, 1];

        denominations.filter(d => d < value).forEach(d => {
            if (value % d === 0) {
                options.push([{ value: d, count: value / d }]);
            }
        });

        // Add some special mixed common combinations
        if (value === 50) {
            options.push([{ value: 20, count: 2 }, { value: 10, count: 1 }]);
        }
        if (value === 5) {
            options.push([{ value: 2, count: 2 }, { value: 1, count: 1 }]);
        }
        if (value === 200) {
            options.push([{ value: 100, count: 1 }, { value: 50, count: 2 }]);
            options.push([{ value: 100, count: 1 }, { value: 50, count: 1 }, { value: 20, count: 2 }, { value: 10, count: 1 }]);
        }

        // Sort options by simplicity (fewer coins first is usually better, but user might want a specific order)
        // Here we just return them as they were added (largest divisor first)

        return options;
    };

    const handleBreakClick = () => {
        if (selectedIds.size !== 1) return;
        const coinId = Array.from(selectedIds)[0];
        const coin = coins.find(c => c.id === coinId);
        if (!coin || coin.value === 1) return;

        const options = getBreakOptions(coin.value);
        if (options.length > 0) {
            setCoinToBreak(coin);
            setBreakOptions(options);
            setBreakDialogOpen(true);
        }
    };

    const executeBreak = (option: { value: CoinValue; count: number }[]) => {
        if (!coinToBreak) return;
        saveState();

        setCoins(prev => {
            const remaining = prev.filter(c => c.id !== coinToBreak.id);
            const newCoins: Coin[] = [];

            let index = 0;
            option.forEach(part => {
                for (let i = 0; i < part.count; i++) {
                    const angle = (index / option.reduce((s, p) => s + p.count, 0)) * Math.PI * 2;
                    const radius = 50;
                    newCoins.push({
                        id: Math.random().toString(36).substr(2, 9) + index,
                        value: part.value,
                        x: coinToBreak.x + Math.cos(angle) * radius,
                        y: coinToBreak.y + Math.sin(angle) * radius,
                        isNew: true
                    });
                    index++;
                }
            });
            return [...remaining, ...newCoins];
        });

        setSelectedIds(new Set());
        setBreakDialogOpen(false);
        setCoinToBreak(null);
    };

    const totalWorkspace = coins.reduce((sum, c) => sum + c.value, 0);
    const totalSelected = coins.filter(c => selectedIds.has(c.id)).reduce((sum, c) => sum + c.value, 0);

    return (
        <div className="flex flex-col h-screen max-h-[calc(100vh-100px)] gap-4 animate-in fade-in zoom-in-95 duration-500">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <Button variant="ghost" onClick={onBack} className="hover:bg-slate-100">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Vissza
                </Button>
                <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
                    <Coins className="w-6 h-6 text-emerald-600" />
                    Számolás pénzzel
                </h2>

                <div className="flex-1 flex justify-center px-8">
                    <div className="flex items-center gap-2 max-w-md w-full">
                        <div className="relative flex-1">
                            <Calculator className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <Input
                                value={mathProblem}
                                onChange={(e) => {
                                    setMathProblem(e.target.value);
                                    setShowResult(false);
                                }}
                                placeholder="Feladvány (pl. 153+27)"
                                className="pl-10 h-10 border-slate-200 focus-visible:ring-emerald-500 rounded-xl"
                            />
                        </div>
                        {mathProblem && (
                            <Button
                                variant={showResult ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowResult(!showResult)}
                                className={cn(
                                    "h-10 px-4 rounded-xl font-bold transition-all",
                                    showResult ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                                )}
                            >
                                {showResult ? (
                                    <>
                                        <div className="flex flex-col items-start leading-none mr-2">
                                            <span className="text-[10px] opacity-70">Eredmény</span>
                                            <span className="text-sm font-black">{calculateResult()} Ft</span>
                                        </div>
                                        <EyeOff className="w-4 h-4" />
                                    </>
                                ) : (
                                    <>
                                        Eredmény
                                        <Eye className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </div>

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
                        onClick={handleUndo}
                        disabled={history.length === 0}
                        className="text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                    >
                        <Undo2 className="w-4 h-4 mr-2" />
                        Visszavonás
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetAll}
                        className="text-slate-400 hover:text-slate-600"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Törlés
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex gap-4 overflow-hidden">
                {/* Sidebar */}
                <div className="w-56 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col gap-4 overflow-y-auto">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider text-center mb-2 underline decoration-emerald-200 decoration-2 underline-offset-4">Érmék</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {COIN_VALUES.map((cv) => (
                            <button
                                key={cv.value}
                                onClick={() => addCoin(cv.value)}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('coinValue', cv.value.toString());
                                }}
                                className="flex flex-col items-center gap-1 p-2 rounded-xl border border-slate-100 hover:bg-emerald-50 hover:border-emerald-200 transition-all group active:scale-95 cursor-grab"
                            >
                                <div className={cn(
                                    "rounded-full flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-110 border-2",
                                    cv.color,
                                    cv.textColor,
                                    cv.value >= 100 ? "w-12 h-12 text-sm" : "w-10 h-10 text-xs"
                                )}>
                                    {cv.label}
                                </div>
                                <span className="text-[10px] font-bold text-slate-500">{cv.value} Ft</span>
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
                        <Button
                            variant="secondary"
                            className={cn("w-full transition-all flex justify-between px-3", canCombine() ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md" : "opacity-50 cursor-not-allowed")}
                            disabled={!canCombine()}
                            onClick={handleCombine}
                        >
                            <div className="flex items-center">
                                <Combine className="w-4 h-4 mr-2" />
                                Összevonás
                            </div>
                            <Plus className="w-3 h-3" />
                        </Button>

                        <Button
                            variant="secondary"
                            className={cn("w-full transition-all flex justify-between px-3", selectedIds.size === 1 && coins.find(c => c.id === Array.from(selectedIds)[0])?.value !== 1 ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md" : "opacity-50 cursor-not-allowed")}
                            disabled={!(selectedIds.size === 1 && coins.find(c => c.id === Array.from(selectedIds)[0])?.value !== 1)}
                            onClick={handleBreakClick}
                        >
                            <div className="flex items-center">
                                <Split className="w-4 h-4 mr-2" />
                                Felbontás
                            </div>
                            <Minus className="w-3 h-3" />
                        </Button>

                        <div className="pt-4 border-t border-slate-100 mt-2 space-y-2">
                            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-tight mb-2">Kivonás</h4>
                            <Button
                                variant={isSubtractionMode ? "default" : "outline"}
                                className={cn(
                                    "w-full justify-start h-10 rounded-xl transition-all",
                                    isSubtractionMode ? "bg-rose-500 hover:bg-rose-600 text-white border-none shadow-md" : "text-rose-600 border-rose-100 hover:bg-rose-50"
                                )}
                                onClick={() => setIsSubtractionMode(!isSubtractionMode)}
                            >
                                <Eraser className="w-4 h-4 mr-2" />
                                <span className="text-xs">Kivonás terület</span>
                            </Button>

                            {isSubtractionMode && (
                                <Button
                                    variant="outline"
                                    className="w-full justify-start h-10 rounded-xl text-rose-700 bg-rose-50 border-rose-200 hover:bg-rose-100 animate-in fade-in slide-in-from-top-2"
                                    onClick={clearSubtractionZone}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    <span className="text-xs font-bold">Törlés a területről</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Workspace */}
                <div
                    ref={workspaceRef}
                    className="flex-1 bg-white rounded-2xl shadow-inner border border-slate-200 relative overflow-hidden cursor-crosshair select-none"
                    onClick={clearSelection}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const value = parseInt(e.dataTransfer.getData('coinValue')) as CoinValue;
                        if (value && workspaceRef.current) {
                            const rect = workspaceRef.current.getBoundingClientRect();
                            const x = e.clientX - rect.left;
                            const y = e.clientY - rect.top;
                            addCoin(value, x, y);
                        }
                    }}
                >
                    {isSubtractionMode && (
                        <div className="absolute top-0 right-0 bottom-0 w-[250px] bg-rose-50/50 border-l-4 border-dashed border-rose-200 flex flex-col items-center pt-8 pointer-events-none animate-in fade-in slide-in-from-right-10 duration-500">
                            <Eraser className="w-12 h-12 text-rose-200 mb-2" />
                            <span className="text-rose-300 font-bold text-lg uppercase tracking-widest rotate-90 origin-center translate-y-24 whitespace-nowrap">Kivonandó terület</span>
                        </div>
                    )}
                    {coins.length === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 pointer-events-none">
                            <Coins className="w-16 h-16 mb-4 opacity-20 text-emerald-600" />
                            <p className="text-lg font-medium text-slate-400">Kattints az érmékre a hozzáadáshoz!</p>
                            <p className="text-sm text-slate-300">Gyakorold az összeadást és a felbontást.</p>
                        </div>
                    )}

                    {coins.map(coin => {
                        const coinInfo = COIN_VALUES.find(cv => cv.value === coin.value);
                        const isSelected = selectedIds.has(coin.id);

                        return (
                            <div
                                key={coin.id}
                                className={cn(
                                    "absolute rounded-full flex items-center justify-center font-bold shadow-md cursor-grab active:cursor-grabbing select-none hover:brightness-105 border-2",
                                    coinInfo?.color,
                                    coinInfo?.textColor,
                                    coinInfo?.size,
                                    isSelected && "ring-4 ring-offset-2 ring-emerald-500 z-10 scale-110 shadow-lg",
                                    coin.isNew && "animate-in zoom-in-50 duration-300",
                                    (draggedCoinId === coin.id || (selectedIds.has(draggedCoinId || '') && selectedIds.has(coin.id))) && "z-20 scale-105 transition-none"
                                )}
                                style={{
                                    left: coin.x + (draggedCoinId === coin.id || (selectedIds.has(draggedCoinId || '') && selectedIds.has(coin.id)) ? draggedOffset.x : 0),
                                    top: coin.y + (draggedCoinId === coin.id || (selectedIds.has(draggedCoinId || '') && selectedIds.has(coin.id)) ? draggedOffset.y : 0),
                                    transform: 'translate(-50%, -50%)',
                                    transition: isDragging ? 'none' : 'all 0.3s ease'
                                }}
                                onMouseDown={(e) => handleMouseDown(e, coin.id)}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isDragging) {
                                        toggleSelection(coin.id, e.ctrlKey || e.shiftKey || true);
                                    }
                                }}
                            >
                                {coin.value}
                            </div>
                        );
                    })}

                    {/* Info Overlays */}
                    <div className="absolute top-4 left-4 flex gap-4">
                        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <Plus className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Összesen</div>
                                <div className="text-lg font-black text-emerald-600">{totalWorkspace.toLocaleString('hu-HU')} Ft</div>
                            </div>
                        </div>

                        {selectedIds.size > 0 && (
                            <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl shadow-sm border border-indigo-100 flex items-center gap-3 animate-in fade-in slide-in-from-left-4">
                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                    <MousePointer2 className="w-4 h-4" />
                                </div>
                                <div>
                                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Kijelölve ({selectedIds.size} db)</div>
                                    <div className="text-lg font-black text-indigo-600">{totalSelected.toLocaleString('hu-HU')} Ft</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Break Dialog */}
            <Dialog open={breakDialogOpen} onOpenChange={setBreakDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Split className="w-5 h-5 text-amber-500" />
                            Érme felbontása: {coinToBreak?.value} Ft
                        </DialogTitle>
                        <DialogDescription>
                            Válaszd ki, hogyan szeretnéd felbontani az érmét!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-3 py-4 max-h-[60vh] overflow-y-auto pr-2">
                        {breakOptions.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => executeBreak(option)}
                                className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-amber-200 transition-all text-left group"
                            >
                                <div className="flex items-center gap-2">
                                    {option.map((part, pIdx) => (
                                        <div key={pIdx} className="flex items-center gap-1">
                                            <div className="text-sm font-bold text-slate-600">{part.count} db</div>
                                            <div className={cn(
                                                "w-8 h-8 rounded-full border flex items-center justify-center text-[10px] font-bold",
                                                COIN_VALUES.find(cv => cv.value === part.value)?.color,
                                                COIN_VALUES.find(cv => cv.value === part.value)?.textColor
                                            )}>
                                                {part.value}
                                            </div>
                                            {pIdx < option.length - 1 && <span className="text-slate-300 mx-1">+</span>}
                                        </div>
                                    ))}
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-amber-500 transition-colors" />
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
