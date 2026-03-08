import { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    ChevronRight,
    Trophy,
    RefreshCcw,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    LayoutGrid,
    Plus,
    Trash2,
    Target,
    BookOpen,
    Play
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { VennReadingLevel, VennReadingItem } from '@/data/vennReadingLevels';

interface VennReadingGameProps {
    levels: VennReadingLevel[];
    onBack: () => void;
}

type SetAssignment = 'A' | 'B' | 'none';

export function VennReadingGame({ levels, onBack }: VennReadingGameProps) {
    const [currentLevelIdx, setCurrentLevelIdx] = useState<number | null>(null);
    // itemId -> Set of SetAssignment
    const [assignments, setAssignments] = useState<Record<string, SetAssignment[]>>({});
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);

    const level = currentLevelIdx !== null ? levels[currentLevelIdx] : null;

    // Reset when level changes
    useEffect(() => {
        setAssignments({});
        setIsChecked(false);
        setIsCorrect(null);
        setSelectedPoolId(null);
    }, [currentLevelIdx]);

    const itemsBySet = useMemo(() => {
        const groups: Record<SetAssignment, VennReadingItem[]> = {
            A: [],
            B: [],
            none: []
        };
        if (!level?.items) return groups;

        Object.entries(assignments).forEach(([id, assignedSets]) => {
            const item = level.items.find(i => i.id === id);
            if (item) {
                assignedSets.forEach(set => {
                    if (groups[set]) {
                        groups[set].push(item);
                    }
                });
            }
        });
        return groups;
    }, [level, assignments]);

    const handlePoolClick = (id: string) => {
        if (isChecked) return;
        setSelectedPoolId(id === selectedPoolId ? null : id);
    };

    const toggleAssignment = (itemId: string, set: SetAssignment) => {
        if (isChecked) return;
        setAssignments(prev => {
            const current = prev[itemId] || [];
            if (set === 'none') {
                // 'none' is mutually exclusive with A and B
                return { ...prev, [itemId]: current.includes('none') ? [] : ['none'] };
            } else {
                // A and B are NOT mutually exclusive (intersection), but both are exclusive with 'none'
                let next = current.filter(s => s !== 'none');
                if (next.includes(set)) {
                    next = next.filter(s => s !== set);
                } else {
                    next = [...next, set];
                }
                return { ...prev, [itemId]: next };
            }
        });
        setSelectedPoolId(null);
    };

    const handleCheck = () => {
        if (!level) return;
        // Must assign every item at least once (either to A, B, or none)
        const allAssigned = level.items.every(item => assignments[item.id] && assignments[item.id].length > 0);
        if (!allAssigned) return;

        const correct = level.items.every(item => {
            const assigned = assignments[item.id] || [];

            if (item.region === 'A') return assigned.length === 1 && assigned.includes('A');
            if (item.region === 'B') return assigned.length === 1 && assigned.includes('B');
            if (item.region === 'AB') return assigned.length === 2 && assigned.includes('A') && assigned.includes('B');
            if (item.region === 'outside') return assigned.length === 1 && assigned.includes('none');

            return false;
        });

        setIsCorrect(correct);
        setIsChecked(true);
        if (correct) {
            setScore(s => s + 1);
        }
    };

    const handleNext = () => {
        setIsChecked(false);
        setIsCorrect(null);
        setCurrentLevelIdx(null); // Go back to menu after each level
    };

    const goToMenu = () => {
        setCurrentLevelIdx(null);
        setIsChecked(false);
        setIsCorrect(null);
    };

    // --- RENDER MENU ---
    if (currentLevelIdx === null) {
        return (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-4xl font-black text-slate-800 tracking-tight">Válaszd ki a feladatot!</h2>
                    <p className="text-slate-500 font-medium">Nézd meg a Venn-diagramot, és írd le a halmazok elemeit!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {levels.map((lvl, idx) => (
                        <Card
                            key={lvl.id}
                            onClick={() => setCurrentLevelIdx(idx)}
                            className="group relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all hover:scale-[1.02] border-slate-100 bg-white p-6 rounded-[2rem]"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <BookOpen className="w-16 h-16 text-indigo-500" />
                            </div>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center font-black text-indigo-600 text-xl">
                                    {idx + 1}
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800">{lvl.title}</h3>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{lvl.setALabel} & {lvl.setBLabel}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-indigo-600 font-bold group-hover:translate-x-1 transition-transform">
                                <span>Indítás</span>
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="flex justify-center pt-8">
                    <Button variant="ghost" onClick={onBack} className="rounded-2xl font-bold text-slate-500 hover:text-indigo-600">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Vissza az áttekintéshez
                    </Button>
                </div>
            </div>
        );
    }

    if (showResults) {
        // results logic... keeping it simple for now as we just return to menu
    }

    const NotationList = ({ set, label, items }: { set: SetAssignment, label: string, items: VennReadingItem[] }) => (
        <div
            onClick={() => selectedPoolId && toggleAssignment(selectedPoolId, set)}
            className={cn(
                "group relative p-3 rounded-2xl transition-all border-2 flex flex-col min-h-[140px] max-h-[180px]",
                selectedPoolId
                    ? "bg-indigo-50/50 border-dashed border-indigo-300 ring-4 ring-indigo-500/10 cursor-pointer"
                    : "bg-white border-slate-100 shadow-sm"
            )}
        >
            <div className="flex flex-wrap items-center gap-1 mb-2 border-b border-slate-50 pb-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter truncate max-w-[100px]" title={label}>
                    {label}
                </span>
                <span className="font-serif italic font-bold text-indigo-500 text-lg">=</span>
                <span className="text-2xl text-slate-300 leading-none">{"{"}</span>
            </div>

            <div className="flex flex-wrap items-start content-start gap-1 flex-1 overflow-y-auto scrollbar-hide">
                {items.length === 0 && !selectedPoolId && (
                    <span className="text-slate-200 italic text-[10px] p-2">...</span>
                )}
                {items.map((item, idx) => {
                    const isCorrectAssigned =
                        (set === 'A' && (item.region === 'A' || item.region === 'AB')) ||
                        (set === 'B' && (item.region === 'B' || item.region === 'AB')) ||
                        (set === 'none' && item.region === 'outside');

                    return (
                        <span key={`${item.id}-${idx}`} className="flex items-center">
                            <button
                                onClick={(e) => { e.stopPropagation(); toggleAssignment(item.id, set); }}
                                className={cn(
                                    "px-1.5 py-0.5 rounded-lg text-xs font-bold transition-all relative group/item",
                                    isChecked
                                        ? (isCorrectAssigned ? "text-green-600" : "text-red-500 underline decoration-double")
                                        : "text-slate-700 hover:text-red-500 hover:bg-red-50"
                                )}
                            >
                                {item.text}
                                {!isChecked && <Trash2 className="w-2.5 h-2.5 absolute -top-1 -right-1 opacity-0 group-hover/item:opacity-100 transition-opacity bg-white text-red-500 rounded-full shadow-sm" />}
                            </button>
                            {idx < items.length - 1 && <span className="text-slate-400 font-sans text-[10px]">,</span>}
                        </span>
                    );
                })}
            </div>

            <div className="flex justify-end mt-1">
                <span className="text-2xl text-slate-300 leading-none">{"}"}</span>
            </div>

            {selectedPoolId && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="p-2 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200 animate-pulse">
                        <Plus className="w-4 h-4" />
                    </div>
                </div>
            )}
        </div>
    );

    const StaticVennItem = ({ item, idx }: { item: VennReadingItem, idx: number }) => {
        const positions: Record<string, { x: number, y: number }[]> = {
            A: [{ x: 55, y: 85 }, { x: 40, y: 105 }, { x: 45, y: 65 }, { x: 65, y: 115 }],
            B: [{ x: 195, y: 85 }, { x: 210, y: 105 }, { x: 205, y: 65 }, { x: 185, y: 115 }],
            AB: [{ x: 125, y: 90 }, { x: 125, y: 120 }, { x: 125, y: 105 }],
            outside: [{ x: 30, y: 35 }, { x: 220, y: 35 }, { x: 30, y: 165 }, { x: 220, y: 165 }]
        };
        const pos = positions[item.region][idx % positions[item.region].length];

        return (
            <g transform={`translate(${pos.x}, ${pos.y})`}>
                <text
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    className="text-[10px] font-bold fill-indigo-950 pointer-events-none"
                    style={{ textShadow: '0 1px 2px white' }}
                >
                    {item.text}
                </text>
            </g>
        );
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-in slide-in-from-bottom-8 duration-700">
            {/* Header */}
            <div className="flex items-center justify-between bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-slate-100 shadow-sm px-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg bg-indigo-500 text-xl border-b-4 border-indigo-700">
                        {currentLevelIdx + 1}
                    </div>
                    <div>
                        <h2 className="font-black text-slate-800 text-xl tracking-tight leading-none mb-1">{level.title}</h2>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Halmaz elemek leolvasása</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" onClick={goToMenu} className="rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-slate-100">
                        Menü
                    </Button>
                    <Button variant="ghost" onClick={onBack} className="rounded-2xl font-bold text-slate-500 hover:text-indigo-600 hover:bg-slate-100">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Vissza
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
                {/* Left Side: DIAGRAM CARD */}
                <Card className="lg:col-span-4 p-8 bg-white border-slate-100 shadow-xl rounded-[2.5rem] flex flex-col">
                    <div className="flex items-center gap-2 mb-8 bg-indigo-50/50 p-3 rounded-2xl border border-indigo-100/50 self-start">
                        <Target className="w-4 h-4 text-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Referencia Diagram</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center bg-slate-50/50 rounded-[2rem] border border-slate-100 p-4">
                        <div className="relative w-full aspect-[4/3] max-w-[320px]">
                            <svg viewBox="0 0 250 200" className="w-full h-full drop-shadow-sm overflow-visible">
                                {/* Universal Set */}
                                <rect x="5" y="5" width="240" height="185" rx="20" fill="white" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 4" />
                                {level.universalSetLabel && (
                                    <text x="235" y="25" textAnchor="end" className="text-[9px] font-black uppercase tracking-widest fill-slate-300">{level.universalSetLabel}</text>
                                )}

                                {/* Circles with shadows for depth */}
                                <defs>
                                    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                                        <feOffset dx="0" dy="1" result="offsetblur" />
                                        <feComponentTransfer>
                                            <feFuncA type="linear" slope="0.1" />
                                        </feComponentTransfer>
                                        <feMerge>
                                            <feMergeNode />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <circle cx="95" cy="100" r="55" fill="#6366f1" fillOpacity="0.03" stroke="#6366f1" strokeWidth="2.5" filter="url(#softShadow)" />
                                <circle cx="155" cy="100" r="55" fill="#f43f5e" fillOpacity="0.03" stroke="#f43f5e" strokeWidth="2.5" filter="url(#softShadow)" />

                                {/* Set Names labels */}
                                <g transform="translate(70, 40)">
                                    <rect x="-40" y="-12" width="80" height="20" rx="10" fill="white" opacity="0.9" />
                                    <text textAnchor="middle" className="text-[10px] font-black fill-indigo-600 uppercase tracking-widest">{level.setALabel}</text>
                                </g>
                                <g transform="translate(180, 40)">
                                    <rect x="-40" y="-12" width="80" height="20" rx="10" fill="white" opacity="0.9" />
                                    <text textAnchor="middle" className="text-[10px] font-black fill-rose-600 uppercase tracking-widest">{level.setBLabel}</text>
                                </g>

                                {/* Elements in diagram */}
                                {level.items.map((item, i) => {
                                    const regionItems = level.items.filter(it => it.region === item.region);
                                    const idx = regionItems.findIndex(it => it.id === item.id);
                                    return <StaticVennItem key={item.id} item={item} idx={idx} />;
                                })}
                            </svg>
                        </div>
                    </div>
                </Card>

                {/* Right Side: INTERACTION CARD */}
                <Card className="lg:col-span-8 p-8 md:p-10 bg-slate-50/80 border-slate-100 shadow-2xl rounded-[2.5rem] flex flex-col space-y-8 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

                    {/* POOL SECTION */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-600 rounded-xl">
                                    <LayoutGrid className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-black text-slate-800 tracking-tight text-lg">Választható elemek</h3>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 p-6 bg-white/80 backdrop-blur-sm rounded-[2.5rem] border-2 border-white shadow-xl min-h-[100px] items-center">
                            {level.items.map(item => {
                                const assignedCount = assignments[item.id]?.length || 0;
                                const isSelected = selectedPoolId === item.id;
                                const isPartiallyDone = (item.region === 'AB' && assignedCount === 1);
                                const isFullyDone = (item.region === 'AB' && assignedCount === 2) || (item.region !== 'AB' && assignedCount === 1);

                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handlePoolClick(item.id)}
                                        className={cn(
                                            "px-4 py-2 rounded-xl text-xs font-bold transition-all border-2 flex items-center gap-2",
                                            isSelected
                                                ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100 translate-y-[-4px]"
                                                : isFullyDone
                                                    ? "bg-slate-50 text-slate-400 border-slate-200 opacity-60"
                                                    : isPartiallyDone
                                                        ? "bg-indigo-50 text-indigo-600 border-indigo-200 border-dashed"
                                                        : "bg-white text-slate-700 border-slate-100 hover:border-indigo-300 shadow-sm"
                                        )}
                                    >
                                        {item.text}
                                        {isFullyDone && !isSelected && <CheckCircle2 className="w-3 h-3 text-green-400" />}
                                        {isPartiallyDone && !isSelected && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* NOTATION SECTION */}
                    <div className="grid grid-cols-3 gap-3">
                        <NotationList
                            set="A"
                            label={level.setALabel}
                            items={itemsBySet.A}
                        />
                        <NotationList
                            set="B"
                            label={level.setBLabel}
                            items={itemsBySet.B}
                        />
                        <NotationList
                            set="none"
                            label={level.universalSetLabel || "Alaphalmaz"}
                            items={itemsBySet.none}
                        />
                    </div>

                    {/* ACTIONS SECTION */}
                    <div className="pt-2">
                        {isChecked ? (
                            <div className={cn(
                                "p-6 rounded-[2.5rem] flex items-center justify-between animate-in zoom-in duration-300 border-2",
                                isCorrect ? "bg-green-50/80 border-green-200" : "bg-red-50/80 border-red-200"
                            )}>
                                <div className="flex items-center gap-5">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white")}>
                                        {isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                                    </div>
                                    <div>
                                        <p className="font-black text-xl text-slate-800 tracking-tight">{isCorrect ? "Kiváló megoldás! 🌟" : "Valami nem stimmel..."}</p>
                                        <p className="text-sm font-bold text-slate-500">{isCorrect ? "Minden elemet a jó halmazba soroltál." : "Ellenőrizd újra a diagramot és a metszetet!"}</p>
                                    </div>
                                </div>
                                <Button onClick={handleNext} className={cn("px-10 py-7 rounded-2xl font-black text-xl shadow-2xl transition-all hover:scale-105", isCorrect ? "bg-green-500 hover:bg-green-600 shadow-green-200" : "bg-red-500 hover:bg-red-600 shadow-red-200")}>
                                    Vissza a menühöz <ChevronRight className="w-6 h-6 ml-2" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={handleCheck}
                                disabled={level.items.some(it => !assignments[it.id] || assignments[it.id].length === 0)}
                                className="w-full h-20 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-xl shadow-xl shadow-indigo-100 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:grayscale-[0.5]"
                            >
                                <CheckCircle2 className="w-7 h-7 mr-4" />
                                Ellenőrzés
                            </Button>
                        )}
                    </div>
                </Card>
            </div>
        </div>
    );
}
