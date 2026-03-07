import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, XCircle, Info, Move, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { VENN_LEVELS, VennLevel, VennItem, VennSet } from '@/data/vennLevels';

type RegionId =
    | 'aOnly' | 'bOnly' | 'cOnly'
    | 'ab' | 'ac' | 'bc' | 'abc'
    | 'outside';

interface PlacedItem {
    item: VennItem;
    regionId: RegionId;
    x: number;
    y: number;
}

// Add the original numeric level as the first level
const NUMERIC_LEVEL: VennLevel = {
    id: 0,
    title: 'Számok csoportosítása',
    description: 'Válogasd szét a számokat! Páros vagy kisebb mint 20?',
    icon: '🔢',
    gradient: 'from-blue-500 to-indigo-600',
    sets: [
        { id: 'even', label: 'Páros számok', color: 'border-blue-500 bg-blue-500/10', shape: 'circle' },
        { id: 'small', label: '20-nál kisebb', color: 'border-amber-500 bg-amber-500/10', shape: 'circle' }
    ],
    items: Array.from({ length: 15 }, (_, i) => {
        const val = Math.floor(Math.random() * 50);
        const isEven = val % 2 === 0;
        const isSmall = val < 20;
        const correctSetIds = [];
        if (isEven) correctSetIds.push('even');
        if (isSmall) correctSetIds.push('small');
        return { id: `num_${i}`, label: val.toString(), correctSetIds };
    })
};

const ALL_LEVELS = [NUMERIC_LEVEL, ...VENN_LEVELS];

export function VennDiagramGame({ onBack, initialLevelIndex, allowedLevelIndices }: {
    onBack: () => void,
    initialLevelIndex?: number,
    allowedLevelIndices?: number[]
}) {
    const [selectedLevelIndex, setSelectedLevelIndex] = useState<number | null>(initialLevelIndex ?? null);
    const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());

    const [unplacedItems, setUnplacedItems] = useState<VennItem[]>([]);
    const [placedItems, setPlacedItems] = useState<PlacedItem[]>([]);
    const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [isLevelComplete, setIsLevelComplete] = useState(false);

    const level = selectedLevelIndex !== null ? ALL_LEVELS[selectedLevelIndex] : null;

    const initLevel = (index: number) => {
        const lvl = ALL_LEVELS[index];
        if (!lvl) return;

        // For the numeric level, we regenerate items each time
        const items = lvl.id === 0 ? NUMERIC_LEVEL.items : lvl.items;

        setUnplacedItems([...items].sort(() => Math.random() - 0.5));
        setPlacedItems([]);
        setSelectedItemId(null);
        setIsLevelComplete(false);
        setMessage({ text: 'Válaszd ki az elemet, majd kattints a megfelelő területre!', type: 'info' });
        setSelectedLevelIndex(index);
    };

    const goToMenu = () => {
        if (initialLevelIndex !== undefined) {
            onBack();
            return;
        }
        setSelectedLevelIndex(null);
        setIsLevelComplete(false);
        setSelectedItemId(null);
        setMessage(null);
    };

    const handleItemClick = (item: VennItem) => {
        if (isLevelComplete) return;
        setSelectedItemId(item.id);
        setMessage({ text: `Kiválasztva: ${item.label}. Hová tennéd?`, type: 'info' });
    };

    const getTargetRegionId = (item: VennItem, level: VennLevel): RegionId => {
        const setIds = item.correctSetIds;
        if (level.sets.length === 2) {
            const hasA = setIds.includes(level.sets[0].id);
            const hasB = setIds.includes(level.sets[1].id);
            if (hasA && hasB) return 'ab';
            if (hasA) return 'aOnly';
            if (hasB) return 'bOnly';
            return 'outside';
        } else {
            const hasA = setIds.includes(level.sets[0].id);
            const hasB = setIds.includes(level.sets[1].id);
            const hasC = setIds.includes(level.sets[2].id);
            if (hasA && hasB && hasC) return 'abc';
            if (hasA && hasB) return 'ab';
            if (hasA && hasC) return 'ac';
            if (hasB && hasC) return 'bc';
            if (hasA) return 'aOnly';
            if (hasB) return 'bOnly';
            if (hasC) return 'cOnly';
            return 'outside';
        }
    };

    const handleRegionClick = (regionId: RegionId) => {
        if (isLevelComplete || !selectedItemId || !level) return;

        const item = unplacedItems.find(i => i.id === selectedItemId);
        if (!item) return;

        const correctRegionId = getTargetRegionId(item, level);

        if (regionId === correctRegionId) {
            // Correct placement
            const regionItems = placedItems.filter(pi => pi.regionId === regionId);
            const count = regionItems.length;

            // Random offset for visual variety
            const x = (Math.random() - 0.5) * 40;
            const y = (Math.random() - 0.5) * 40;

            setPlacedItems(prev => [...prev, { item, regionId, x, y }]);
            setUnplacedItems(prev => prev.filter(i => i.id !== item.id));
            setSelectedItemId(null);
            setMessage({ text: 'Helyes!', type: 'success' });

            if (unplacedItems.length === 1) { // Current item was the last one
                setIsLevelComplete(true);
                setCompletedLevels(prev => new Set([...prev, selectedLevelIndex!]));
                setMessage({ text: 'Gratulálok! Minden elemet a helyére tettél!', type: 'success' });
                confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
            }
        } else {
            setMessage({ text: 'Hoppá! Gondold át újra, ez hova tartozik!', type: 'error' });
            setSelectedItemId(null);
        }
    };

    // ── Level Menu ──────────────────────────────
    if (selectedLevelIndex === null) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-8 animate-in fade-in duration-500 select-none">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full shadow-sm bg-white/50 backdrop-blur hover:bg-white hover:shadow-md transition-all">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Venn-diagram feladatok</h2>
                        <div className="text-slate-500 font-medium">Halmazok közös részei</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_LEVELS
                        .map((lvl, i) => ({ lvl, i }))
                        .filter(({ i }) => !allowedLevelIndices || allowedLevelIndices.includes(i))
                        .map(({ lvl, i }) => {
                            const isDone = completedLevels.has(i);
                            return (
                                <button
                                    key={lvl.id}
                                    onClick={() => initLevel(i)}
                                    className={cn(
                                        "relative rounded-3xl p-6 text-left text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] bg-gradient-to-br",
                                        lvl.gradient
                                    )}
                                >
                                    {isDone && (
                                        <div className="absolute top-4 right-4 bg-white/90 text-emerald-600 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                                            <CheckCircle2 className="w-5 h-5" />
                                        </div>
                                    )}
                                    <div className="text-4xl mb-3">{lvl.icon}</div>
                                    <h3 className="text-xl font-black mb-1">{lvl.title}</h3>
                                    <p className="text-white/80 text-sm font-medium leading-snug">{lvl.description}</p>
                                    <div className="mt-4 flex gap-2">
                                        <span className="text-[10px] bg-white/20 px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                                            {lvl.sets.length} halmaz
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                </div>
            </div>
        );
    }

    // ── Level Rendering Logic ──────────────────────────────
    const renderSetShape = (set: VennSet, index: number, total: number) => {
        const isA = index === 0;
        const isB = index === 1;
        const isC = index === 2;

        let baseClass = cn(
            "absolute border-4 transition-all z-10",
            set.color
        );

        if (total === 2) {
            // 2 Sets Layout
            const sizeClass = "w-[60%] h-[60%]";
            const posClass = isA ? "left-[10%] top-[20%]" : "right-[10%] top-[20%]";

            if (set.shape === 'circle') return <div className={cn(baseClass, sizeClass, posClass, "rounded-full")} />;
            if (set.shape === 'rectangle') return <div className={cn(baseClass, sizeClass, posClass, "rounded-3xl")} />;
            if (set.shape === 'ellipse') return <div className={cn(baseClass, "w-[65%] h-[45%]", isA ? "left-[5%] top-[27%]" : "right-[5%] top-[27%]", "rounded-[50%]")} />;
            if (set.shape === 'heart') return (
                <div className={cn(baseClass, sizeClass, posClass, "border-transparent bg-transparent flex items-center justify-center")}>
                    <Heart className={cn("w-full h-full fill-current stroke-[4px]", set.color.split(' ')[0].replace('border-', 'text-'))} />
                </div>
            );
        } else {
            // 3 Sets Layout (Simplified Circles)
            const size = "w-[50%] h-[50%]";
            let pos = "";
            if (isA) pos = "left-[25%] top-[10%]";
            if (isB) pos = "left-[10%] bottom-[15%]";
            if (isC) pos = "right-[10%] bottom-[15%]";

            return <div className={cn(baseClass, size, pos, "rounded-full")} />;
        }
        return null;
    };

    const renderPlacedItems = (regionId: RegionId) => {
        return placedItems
            .filter(pi => pi.regionId === regionId)
            .map((pi, i) => (
                <div
                    key={pi.item.id}
                    className="absolute bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm border border-slate-200 text-[10px] font-bold text-slate-800 whitespace-nowrap animate-in zoom-in"
                    style={{
                        transform: `translate(calc(-50% + ${pi.x}px), calc(-50% + ${pi.y}px))`,
                        left: '50%',
                        top: '50%',
                        zIndex: 30
                    }}
                >
                    {pi.item.label}
                </div>
            ));
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500 relative select-none flex flex-col min-h-[calc(100vh-100px)]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={goToMenu} className="rounded-full shadow-sm bg-white/50 backdrop-blur hover:bg-white hover:shadow-md transition-all">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Venn-diagram</h2>
                        <div className="text-slate-500 font-medium">{level.title}</div>
                    </div>
                </div>
                <Button onClick={() => initLevel(selectedLevelIndex!)} variant="outline" className="rounded-xl shadow-sm bg-white text-slate-600 hover:text-slate-900 border-slate-200 gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Újra
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow">
                {/* Visual Area */}
                <div className="lg:col-span-2 relative min-h-[500px] bg-white/40 rounded-3xl border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center p-4">

                    {/* Background "Outside" Area */}
                    <div
                        className="absolute inset-0 cursor-pointer"
                        onClick={() => handleRegionClick('outside')}
                    >
                        <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white/50 px-3 py-1.5 rounded-full border border-slate-100 flex flex-col items-end">
                            <span>{level.universalSetLabel || 'Csoporton kívül'}</span>
                            {!level.universalSetLabel && <span className="text-[8px] opacity-70 mt-0.5">Kattints ide, ha sehova sem tartozik</span>}
                        </div>
                        {renderPlacedItems('outside')}
                    </div>

                    {/* Diagram Container */}
                    <div className="relative w-full aspect-[4/3] max-w-lg z-10" onClick={(e) => e.stopPropagation()}>

                        {/* Render Set Outlines */}
                        {level.sets.map((set, i) => renderSetShape(set, i, level.sets.length))}

                        {/* Interactive Regions Overlays */}
                        {level.sets.length === 2 ? (
                            <>
                                {/* A Only */}
                                <div
                                    className="absolute left-[15%] top-[25%] w-[30%] h-[50%] z-20 cursor-pointer hover:bg-black/5 rounded-full flex items-center justify-center"
                                    onClick={() => handleRegionClick('aOnly')}
                                >
                                    <div className="absolute top-[-20px] left-0 text-[10px] font-bold text-slate-500 uppercase">{level.sets[0].label}</div>
                                    {renderPlacedItems('aOnly')}
                                </div>
                                {/* B Only */}
                                <div
                                    className="absolute right-[15%] top-[25%] w-[30%] h-[50%] z-20 cursor-pointer hover:bg-black/5 rounded-full flex items-center justify-center"
                                    onClick={() => handleRegionClick('bOnly')}
                                >
                                    <div className="absolute top-[-20px] right-0 text-[10px] font-bold text-slate-500 uppercase text-right">{level.sets[1].label}</div>
                                    {renderPlacedItems('bOnly')}
                                </div>
                                {/* Intersection */}
                                <div
                                    className="absolute left-[38%] top-[30%] w-[24%] h-[40%] z-30 cursor-pointer hover:bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 border-dashed"
                                    onClick={() => handleRegionClick('ab')}
                                >
                                    {renderPlacedItems('ab')}
                                </div>
                            </>
                        ) : (
                            <>
                                {/* 3 Sets Interaction Blocks (Simplified placeholders for clicks) */}
                                <div className="absolute inset-0 z-20">
                                    {/* A, B, C Names */}
                                    <div className="absolute left-[40%] top-[5%] text-[10px] font-bold text-slate-500 uppercase">{level.sets[0].label}</div>
                                    <div className="absolute left-0 bottom-[10%] text-[10px] font-bold text-slate-500 uppercase">{level.sets[1].label}</div>
                                    <div className="absolute right-0 bottom-[10%] text-[10px] font-bold text-slate-500 uppercase text-right">{level.sets[2].label}</div>

                                    {/* Region A Only */}
                                    <div onClick={() => handleRegionClick('aOnly')} className="absolute left-[40%] top-[15%] w-[20%] h-[20%] hover:bg-black/5 flex items-center justify-center">{renderPlacedItems('aOnly')}</div>
                                    {/* Region B Only */}
                                    <div onClick={() => handleRegionClick('bOnly')} className="absolute left-[15%] bottom-[20%] w-[20%] h-[20%] hover:bg-black/5 flex items-center justify-center">{renderPlacedItems('bOnly')}</div>
                                    {/* Region C Only */}
                                    <div onClick={() => handleRegionClick('cOnly')} className="absolute right-[15%] bottom-[20%] w-[20%] h-[20%] hover:bg-black/5 flex items-center justify-center">{renderPlacedItems('cOnly')}</div>

                                    {/* Intersections */}
                                    <div onClick={() => handleRegionClick('ab')} className="absolute left-[25%] top-[40%] w-[15%] h-[15%] hover:bg-white/20 text-[9px] font-bold flex items-center justify-center">{renderPlacedItems('ab')}</div>
                                    <div onClick={() => handleRegionClick('ac')} className="absolute right-[25%] top-[40%] w-[15%] h-[15%] hover:bg-white/20 text-[9px] font-bold flex items-center justify-center">{renderPlacedItems('ac')}</div>
                                    <div onClick={() => handleRegionClick('bc')} className="absolute left-[42%] bottom-[15%] w-[15%] h-[15%] hover:bg-white/20 text-[9px] font-bold flex items-center justify-center">{renderPlacedItems('bc')}</div>

                                    {/* Central Intersection */}
                                    <div onClick={() => handleRegionClick('abc')} className="absolute left-[42%] top-[45%] w-[16%] h-[12%] hover:bg-white/30 border-2 border-white/20 border-dashed flex items-center justify-center">{renderPlacedItems('abc')}</div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Controls & Items Area */}
                <div className="flex flex-col gap-6">
                    {/* Message Area */}
                    <div className="min-h-[80px]">
                        {message && (
                            <div className={cn(
                                "p-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-top-4 font-bold border-2",
                                message.type === 'success' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                    message.type === 'error' ? "bg-rose-50 text-rose-700 border-rose-100" :
                                        "bg-blue-50 text-blue-700 border-blue-100"
                            )}>
                                {message.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                                {message.type === 'error' && <XCircle className="w-5 h-5 shrink-0" />}
                                {message.type === 'info' && <Info className="w-5 h-5 shrink-0" />}
                                {message.text}
                            </div>
                        )}
                    </div>

                    {/* Item List */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Beosztandó elemek</h3>
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                                {unplacedItems.length} hátra
                            </span>
                        </div>

                        {!isLevelComplete ? (
                            <div className="flex flex-wrap gap-2 content-start overflow-y-auto max-h-[300px] p-1">
                                {unplacedItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleItemClick(item)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl font-bold text-sm transition-all border-2",
                                            selectedItemId === item.id
                                                ? "bg-primary text-white border-primary shadow-md scale-105 z-10"
                                                : "bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-300 hover:bg-white"
                                        )}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center">
                                <div className="text-4xl">🏆</div>
                                <h4 className="text-xl font-black text-slate-800">Szép munka!</h4>
                                <Button onClick={goToMenu} variant="outline" className="rounded-xl w-full">
                                    Vissza a listához
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
                        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-blue-700 font-medium leading-relaxed">
                            Kattints egy elemre, majd válaszd ki azt a területet a diagramon, ahová szerinted tartozik. Ha sehova, kattints a "Csoporton kívül" részre!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
