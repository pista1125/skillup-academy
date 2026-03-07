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
    Target
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
    const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
    // itemId -> Set of SetAssignment
    const [assignments, setAssignments] = useState<Record<string, SetAssignment[]>>({});
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedPoolId, setSelectedPoolId] = useState<string | null>(null);

    const level = levels[currentLevelIdx];

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
        if (currentLevelIdx < levels.length - 1) {
            setCurrentLevelIdx(currentLevelIdx + 1);
        } else {
            setShowResults(true);
            if (score >= levels.length - 1) {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#6366f1', '#10b981', '#f59e0b']
                });
            }
        }
    };

    if (showResults) {
        return (
            <Card className="p-8 text-center space-y-6 max-w-2xl mx-auto bg-white/80 backdrop-blur-xl border-indigo-100 shadow-2xl rounded-[2rem] animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-indigo-200">
                    <Trophy className="w-12 h-12 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-black text-slate-800">Szép munka! 🏆</h2>
                    <p className="text-slate-500 font-medium text-lg">Minden feladatot megoldottál!</p>
                </div>

                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 italic text-slate-600">
                    <p className="text-4xl font-black text-indigo-600 mb-1">{score} / {levels.length}</p>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400">Végső Pontszám</p>
                </div>

                <div className="flex gap-4">
                    <Button onClick={() => {
                        setCurrentLevelIdx(0);
                        setScore(0);
                        setShowResults(false);
                    }} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl py-6 font-bold shadow-lg shadow-indigo-200 transition-all hover:scale-105">
                        <RefreshCcw className="w-5 h-5 mr-2" />
                        Újra
                    </Button>
                    <Button variant="outline" onClick={onBack} className="flex-1 border-2 border-slate-200 rounded-2xl py-6 font-bold text-slate-600 hover:bg-slate-50 transition-all">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Kilépés
                    </Button>
                </div>
            </Card>
        );
    }

    const SetListZone = ({ set, label, color, items }: { set: SetAssignment, label: string, color: string, items: VennReadingItem[] }) => (
        <Card
            onClick={() => selectedPoolId && toggleAssignment(selectedPoolId, set)}
            className={cn(
                "p-4 min-h-[120px] transition-all border-2 relative flex flex-col",
                selectedPoolId ? "cursor-pointer border-dashed border-indigo-300 bg-indigo-50/20 hover:bg-indigo-50/40" : "border-slate-100",
                color === 'blue' ? "bg-blue-50/10" : color === 'red' ? "bg-red-50/10" : "bg-slate-50/50"
            )}
        >
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">{label}</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200 font-bold text-slate-400">{items.length} elem</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {items.map((item, idx) => {
                    const assigned = assignments[item.id] || [];
                    const isMetszet = item.region === 'AB';
                    const isCorrectAssigned =
                        (set === 'A' && (item.region === 'A' || item.region === 'AB')) ||
                        (set === 'B' && (item.region === 'B' || item.region === 'AB')) ||
                        (set === 'none' && item.region === 'outside');

                    return (
                        <div
                            key={`${item.id}-${idx}`}
                            onClick={(e) => { e.stopPropagation(); toggleAssignment(item.id, set); }}
                            className={cn(
                                "group px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2",
                                isChecked
                                    ? (isCorrectAssigned ? "bg-green-500 text-white shadow-md shadow-green-100" : "bg-red-500 text-white shadow-md shadow-red-100")
                                    : "bg-white text-slate-700 border border-slate-200 shadow-sm hover:border-red-300 hover:text-red-500"
                            )}
                        >
                            {item.text}
                            {!isChecked && <Trash2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </div>
                    );
                })}
            </div>
            {selectedPoolId && (
                <div className="absolute inset-0 flex items-center justify-center bg-indigo-600/5 backdrop-blur-[1px] rounded-xl pointer-events-none">
                    <div className="bg-indigo-600 text-white p-2 rounded-full shadow-lg animate-bounce">
                        <Plus className="w-4 h-4" />
                    </div>
                </div>
            )}
        </Card>
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
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Venn-diagram leolvasás</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex gap-1.5">
                        {levels.map((_, i) => (
                            <div key={i} className={cn("h-2 rounded-full transition-all duration-500", i === currentLevelIdx ? "w-10 bg-indigo-500 shadow-md shadow-indigo-100" : i < currentLevelIdx ? "w-2 bg-green-400" : "w-2 bg-slate-200")} />
                        ))}
                    </div>
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
                <Card className="lg:col-span-8 p-10 bg-slate-50/80 border-slate-100 shadow-2xl rounded-[2.5rem] flex flex-col space-y-10 relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

                    {/* POOL SECTION */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-600 rounded-xl">
                                    <LayoutGrid className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-black text-slate-800 tracking-tight text-lg">Választható elemek</h3>
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 bg-white px-4 py-1.5 rounded-full border border-slate-200">
                                Kattints az elemre, majd a listára!
                            </span>
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
                                            "px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border-2 flex items-center gap-2",
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
                                        {isFullyDone && !isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />}
                                        {isPartiallyDone && !isSelected && <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* LISTS SECTION */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                        <SetListZone
                            set="A"
                            label={`${level.setALabel} halmaz elemei`}
                            color="blue"
                            items={itemsBySet.A}
                        />
                        <SetListZone
                            set="B"
                            label={`${level.setBLabel} halmaz elemei`}
                            color="red"
                            items={itemsBySet.B}
                        />
                        <div className="md:col-span-2">
                            <SetListZone
                                set="none"
                                label="Egyik halmazba sem tartozik"
                                color="slate"
                                items={itemsBySet.none}
                            />
                        </div>
                    </div>

                    {/* ACTIONS SECTION */}
                    <div className="pt-6">
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
                                    Tovább <ChevronRight className="w-6 h-6 ml-2" />
                                </Button>
                            </div>
                        ) : (
                            <Button
                                onClick={handleCheck}
                                disabled={level.items.some(it => !assignments[it.id] || assignments[it.id].length === 0)}
                                className="w-full h-24 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2.5rem] font-black text-2xl shadow-2xl shadow-indigo-200 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:grayscale-[0.5]"
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
