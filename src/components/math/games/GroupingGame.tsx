import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, XCircle, Info, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface Item {
    id: string;
    label: string;
    correctGroupId: string;
}

interface Group {
    id: string;
    label: string;
    color: string;
}

interface Level {
    id: number;
    title: string;
    description: string;
    groups: Group[];
    items: Item[];
}

const GAME_LEVELS: Level[] = [
    {
        id: 1,
        title: '1. Állatok élőhelyük szerint',
        description: 'Csoportosítsd az alábbi állatokat aszerint, hogy hol élnek leginkább!',
        groups: [
            { id: 'water', label: 'Vízben él', color: 'bg-blue-100 border-blue-400 text-blue-800' },
            { id: 'land', label: 'Szárazföldön él', color: 'bg-green-100 border-green-400 text-green-800' }
        ],
        items: [
            { id: 'i1_1', label: 'Delfin', correctGroupId: 'water' },
            { id: 'i1_2', label: 'Kutya', correctGroupId: 'land' },
            { id: 'i1_3', label: 'Cápa', correctGroupId: 'water' },
            { id: 'i1_4', label: 'Macska', correctGroupId: 'land' },
            { id: 'i1_5', label: 'Bálna', correctGroupId: 'water' },
            { id: 'i1_6', label: 'Elefánt', correctGroupId: 'land' },
            { id: 'i1_7', label: 'Ponty', correctGroupId: 'water' },
            { id: 'i1_8', label: 'Ló', correctGroupId: 'land' },
            { id: 'i1_9', label: 'Medúza', correctGroupId: 'water' },
            { id: 'i1_10', label: 'Tigris', correctGroupId: 'land' },
        ]
    },
    {
        id: 2,
        title: '2. Közlekedési eszközök',
        description: 'Melyik közlekedési eszköz hol közlekedik?',
        groups: [
            { id: 'air', label: 'Levegőben', color: 'bg-sky-100 border-sky-400 text-sky-800' },
            { id: 'water', label: 'Vízen', color: 'bg-blue-100 border-blue-400 text-blue-800' },
            { id: 'land', label: 'Szárazföldön', color: 'bg-amber-100 border-amber-400 text-amber-800' },
        ],
        items: [
            { id: 'i2_1', label: 'Repülőgép', correctGroupId: 'air' },
            { id: 'i2_2', label: 'Hajó', correctGroupId: 'water' },
            { id: 'i2_3', label: 'Autó', correctGroupId: 'land' },
            { id: 'i2_4', label: 'Helikopter', correctGroupId: 'air' },
            { id: 'i2_5', label: 'Csónak', correctGroupId: 'water' },
            { id: 'i2_6', label: 'Busz', correctGroupId: 'land' },
            { id: 'i2_7', label: 'Hőlégballon', correctGroupId: 'air' },
            { id: 'i2_8', label: 'Tengeralattjáró', correctGroupId: 'water' },
            { id: 'i2_9', label: 'Vonat', correctGroupId: 'land' },
            { id: 'i2_10', label: 'Kerékpár', correctGroupId: 'land' },
        ]
    },
    {
        id: 3,
        title: '3. Tárgyak anyaga',
        description: 'Miből készültek ezek a tárgyak?',
        groups: [
            { id: 'wood', label: 'Fából készült', color: 'bg-orange-100 border-orange-400 text-orange-900' },
            { id: 'metal', label: 'Fémből készült', color: 'bg-slate-200 border-slate-500 text-slate-800' },
            { id: 'plastic', label: 'Műanyagból készült', color: 'bg-pink-100 border-pink-400 text-pink-800' },
        ],
        items: [
            { id: 'i3_1', label: 'Asztal', correctGroupId: 'wood' },
            { id: 'i3_2', label: 'Kés penge', correctGroupId: 'metal' },
            { id: 'i3_3', label: 'Lego', correctGroupId: 'plastic' },
            { id: 'i3_4', label: 'Szék', correctGroupId: 'wood' },
            { id: 'i3_5', label: 'Szög', correctGroupId: 'metal' },
            { id: 'i3_6', label: 'Vödör', correctGroupId: 'plastic' },
            { id: 'i3_7', label: 'Szekrény', correctGroupId: 'wood' },
            { id: 'i3_8', label: 'Kalapács fej', correctGroupId: 'metal' },
            { id: 'i3_9', label: 'Vonalzó', correctGroupId: 'plastic' },
            { id: 'i3_10', label: 'Fakanál', correctGroupId: 'wood' },
        ]
    },
    {
        id: 4,
        title: '4. Évszakok gyümölcsei, terményei',
        description: 'Melyik évszakra jellemzőek leginkább a következő finomságok?',
        groups: [
            { id: 'summer', label: 'Nyár', color: 'bg-yellow-100 border-yellow-400 text-yellow-800' },
            { id: 'autumn', label: 'Ősz', color: 'bg-orange-100 border-orange-500 text-orange-900' }
        ],
        items: [
            { id: 'i4_1', label: 'Görögdinnye', correctGroupId: 'summer' },
            { id: 'i4_2', label: 'Alma', correctGroupId: 'autumn' },
            { id: 'i4_3', label: 'Őszibarack', correctGroupId: 'summer' },
            { id: 'i4_4', label: 'Szilva', correctGroupId: 'autumn' },
            { id: 'i4_5', label: 'Málna', correctGroupId: 'summer' },
            { id: 'i4_6', label: 'Dió', correctGroupId: 'autumn' },
            { id: 'i4_7', label: 'Sárgadinnye', correctGroupId: 'summer' },
            { id: 'i4_8', label: 'Sütőtök', correctGroupId: 'autumn' },
            { id: 'i4_9', label: 'Cseresznye', correctGroupId: 'summer' },
            { id: 'i4_10', label: 'Szőlő', correctGroupId: 'autumn' },
        ]
    },
    {
        id: 5,
        title: '5. Ételek típusa',
        description: 'Válogasd szét, melyik étel melyik csoportba tartozik!',
        groups: [
            { id: 'fruit', label: 'Gyümölcs', color: 'bg-rose-100 border-rose-400 text-rose-800' },
            { id: 'veg', label: 'Zöldség', color: 'bg-emerald-100 border-emerald-400 text-emerald-800' },
            { id: 'bakery', label: 'Pékáru', color: 'bg-amber-100 border-amber-400 text-amber-800' },
        ],
        items: [
            { id: 'i5_1', label: 'Narancs', correctGroupId: 'fruit' },
            { id: 'i5_2', label: 'Sárgarépa', correctGroupId: 'veg' },
            { id: 'i5_3', label: 'Kenyér', correctGroupId: 'bakery' },
            { id: 'i5_4', label: 'Banán', correctGroupId: 'fruit' },
            { id: 'i5_5', label: 'Vöröshagyma', correctGroupId: 'veg' },
            { id: 'i5_6', label: 'Kifli', correctGroupId: 'bakery' },
            { id: 'i5_7', label: 'Kivi', correctGroupId: 'fruit' },
            { id: 'i5_8', label: 'Paprika', correctGroupId: 'veg' },
            { id: 'i5_9', label: 'Zsemle', correctGroupId: 'bakery' },
            { id: 'i5_10', label: 'Citrom', correctGroupId: 'fruit' },
        ]
    },
    {
        id: 6,
        title: '6. Természetes és mesterséges dolgok',
        description: 'Melyek a természetben előforduló dolgok, és melyek az emberek által készített tárgyak?',
        groups: [
            { id: 'natural', label: 'Természetes', color: 'bg-lime-100 border-lime-400 text-lime-900' },
            { id: 'manmade', label: 'Mesterséges', color: 'bg-slate-100 border-slate-400 text-slate-800' },
        ],
        items: [
            { id: 'i6_1', label: 'Kő', correctGroupId: 'natural' },
            { id: 'i6_2', label: 'Autó', correctGroupId: 'manmade' },
            { id: 'i6_3', label: 'Virág', correctGroupId: 'natural' },
            { id: 'i6_4', label: 'Telefon', correctGroupId: 'manmade' },
            { id: 'i6_5', label: 'Falevél', correctGroupId: 'natural' },
            { id: 'i6_6', label: 'Ceruza', correctGroupId: 'manmade' },
            { id: 'i6_7', label: 'Folyó', correctGroupId: 'natural' },
            { id: 'i6_8', label: 'Szék', correctGroupId: 'manmade' },
            { id: 'i6_9', label: 'Felhő', correctGroupId: 'natural' },
            { id: 'i6_10', label: 'Tablet', correctGroupId: 'manmade' },
        ]
    }
];

const LEVEL_ICONS = ['🐬', '✈️', '🪑', '🍎', '🥖', '🌿'];
const LEVEL_COLORS = [
    'from-blue-500 to-cyan-500',
    'from-sky-500 to-indigo-500',
    'from-orange-500 to-amber-500',
    'from-yellow-500 to-lime-500',
    'from-rose-500 to-pink-500',
    'from-lime-500 to-green-600',
];

export function GroupingGame({ onBack }: { onBack: () => void }) {
    const [selectedLevelIndex, setSelectedLevelIndex] = useState<number | null>(null);
    const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
    const [unplacedItems, setUnplacedItems] = useState<Item[]>([]);
    const [placedItems, setPlacedItems] = useState<Record<string, Item[]>>({});
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [isLevelComplete, setIsLevelComplete] = useState(false);

    const level = selectedLevelIndex !== null ? GAME_LEVELS[selectedLevelIndex] : null;

    const startLevel = (index: number) => {
        const lvl = GAME_LEVELS[index];
        if (!lvl) return;
        const shuffled = [...lvl.items].sort(() => Math.random() - 0.5);
        setUnplacedItems(shuffled);
        const initialPlaced: Record<string, Item[]> = {};
        lvl.groups.forEach(g => { initialPlaced[g.id] = []; });
        setPlacedItems(initialPlaced);
        setSelectedItem(null);
        setIsLevelComplete(false);
        setMessage({ text: 'Válaszd ki az elemet, majd kattints a megfelelő dobozba!', type: 'info' });
        setSelectedLevelIndex(index);
    };

    const goToMenu = () => {
        setSelectedLevelIndex(null);
        setIsLevelComplete(false);
        setSelectedItem(null);
        setMessage(null);
    };

    const handleItemClick = (item: Item) => {
        if (isLevelComplete) return;
        setSelectedItem(item);
        setMessage({ text: `Kiválasztva: ${item.label}. Hova tennéd?`, type: 'info' });
    };

    const handleGroupClick = (groupId: string) => {
        if (isLevelComplete || !selectedItem) return;
        if (selectedItem.correctGroupId === groupId) {
            setPlacedItems(prev => ({ ...prev, [groupId]: [...prev[groupId], selectedItem] }));
            const remaining = unplacedItems.filter(i => i.id !== selectedItem.id);
            setUnplacedItems(remaining);
            setSelectedItem(null);
            if (remaining.length === 0) {
                setIsLevelComplete(true);
                setMessage({ text: 'Remekül csináltad! Válassz másik feladatot a menüből!', type: 'success' });
                if (selectedLevelIndex !== null) {
                    setCompletedLevels(prev => new Set([...prev, selectedLevelIndex]));
                }
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            } else {
                setMessage({ text: 'Helyes válasz!', type: 'success' });
            }
        } else {
            setMessage({ text: 'Hoppá! Gondold át újra, ez hova illik a legjobban?', type: 'error' });
            setSelectedItem(null);
        }
    };

    // ── Level Selection Menu ──────────────────────────────
    if (selectedLevelIndex === null) {
        const allDone = completedLevels.size === GAME_LEVELS.length;
        return (
            <div className="max-w-4xl mx-auto px-4 py-8 animate-in fade-in duration-500 select-none">
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="icon" onClick={onBack} className="rounded-full shadow-sm bg-white/50 backdrop-blur hover:bg-white hover:shadow-md transition-all">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Csoportosítások</h2>
                        <div className="text-slate-500 font-medium">Válassz feladatot!</div>
                    </div>
                </div>

                {allDone && (
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center mb-8 animate-in zoom-in">
                        <div className="text-5xl mb-3">🏆</div>
                        <h3 className="text-2xl font-black text-emerald-700 mb-1">Mindet elvégezted!</h3>
                        <p className="text-emerald-600">Gratulálok! Bármelyiket elkezdheted újra is.</p>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {GAME_LEVELS.map((lvl, i) => {
                        const isDone = completedLevels.has(i);
                        return (
                            <button
                                key={lvl.id}
                                onClick={() => startLevel(i)}
                                className={cn(
                                    "relative rounded-3xl p-6 text-left text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.03] hover:-translate-y-1 active:scale-[0.98] bg-gradient-to-br",
                                    LEVEL_COLORS[i]
                                )}
                            >
                                {isDone && (
                                    <div className="absolute top-4 right-4 bg-white/90 text-emerald-600 rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                )}
                                <div className="text-4xl mb-3">{LEVEL_ICONS[i]}</div>
                                <h3 className="text-xl font-black leading-tight mb-1">{lvl.title.replace(/^\d+\.\s/, '')}</h3>
                                <p className="text-white/80 text-sm font-medium leading-snug">{lvl.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {lvl.groups.map(g => (
                                        <span key={g.id} className="text-xs bg-white/20 px-2 py-1 rounded-full font-bold">{g.label}</span>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // ── Active Level ──────────────────────────────────────
    if (!level) return null;

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-in fade-in duration-500 relative select-none flex flex-col min-h-[calc(100vh-100px)]">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={goToMenu} className="rounded-full shadow-sm bg-white/50 backdrop-blur hover:bg-white hover:shadow-md transition-all">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Csoportosítások</h2>
                        <div className="text-slate-500 font-medium">{level.title}</div>
                    </div>
                </div>
                <Button onClick={() => startLevel(selectedLevelIndex)} variant="outline" className="rounded-xl shadow-sm bg-white text-slate-600 hover:text-slate-900 border-slate-200 gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Újra
                </Button>
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-7 shadow-sm border border-slate-200 mb-6 text-center">
                <p className="text-lg text-slate-600 font-medium">{level.description}</p>
            </div>

            <div className="flex-grow flex flex-col">
                <div className={cn(
                    "grid gap-4 mb-6",
                    level.groups.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
                )}>
                    {level.groups.map(group => (
                        <div
                            key={group.id}
                            onClick={() => handleGroupClick(group.id)}
                            className={cn(
                                "rounded-3xl border-2 p-6 transition-all duration-300 flex flex-col",
                                group.color,
                                selectedItem && !isLevelComplete ? "cursor-pointer hover:shadow-md hover:scale-[1.02] ring-4 ring-primary/20" : "",
                                "min-h-[200px]"
                            )}
                        >
                            <h4 className="text-xl font-black text-center mb-4 uppercase tracking-wider">{group.label}</h4>
                            <div className="flex-grow flex flex-wrap content-start gap-2 justify-center">
                                {placedItems[group.id]?.map(item => (
                                    <div key={item.id} className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl border border-black/10 shadow-sm font-bold text-slate-800 animate-in zoom-in">
                                        {item.label}
                                    </div>
                                ))}
                                {placedItems[group.id]?.length === 0 && (
                                    <div className="w-full h-full flex items-center justify-center opacity-40 border-2 border-dashed border-current rounded-2xl p-4">
                                        <span className="font-semibold text-center italic">Ide tedd az elemeket!</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="min-h-[56px] flex items-center justify-center mb-4">
                    {message && (
                        <div className={cn(
                            "px-6 py-3 rounded-full flex items-center gap-3 animate-in fade-in font-bold text-lg shadow-sm border",
                            message.type === 'success' ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                                message.type === 'error' ? "bg-rose-100 text-rose-800 border-rose-200" :
                                    "bg-blue-100 text-blue-800 border-blue-200"
                        )}>
                            {message.type === 'success' && <CheckCircle2 className="w-6 h-6 shrink-0" />}
                            {message.type === 'error' && <XCircle className="w-6 h-6 shrink-0" />}
                            {message.type === 'info' && <Info className="w-6 h-6 shrink-0" />}
                            {message.text}
                        </div>
                    )}
                </div>

                <div className="bg-slate-100/80 backdrop-blur rounded-3xl p-6 border border-slate-200 shadow-inner flex-grow flex items-center justify-center">
                    {!isLevelComplete ? (
                        <div className="w-full">
                            <div className="flex flex-wrap gap-3 justify-center items-center">
                                {unplacedItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => handleItemClick(item)}
                                        className={cn(
                                            "flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-lg transition-all shadow-sm border-2",
                                            selectedItem?.id === item.id
                                                ? "bg-primary text-white border-primary shadow-md scale-110 rotate-1 z-10"
                                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow hover:-translate-y-1"
                                        )}
                                    >
                                        <Move className={cn("w-4 h-4 opacity-50", selectedItem?.id === item.id ? "text-white" : "text-slate-400")} />
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-5 animate-in slide-in-from-bottom-4">
                            <div className="text-5xl">🎉</div>
                            <h3 className="text-2xl font-black text-emerald-600">Nagyszerű munka!</h3>
                            <Button size="lg" onClick={goToMenu} className="rounded-xl px-12 text-lg h-14 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg">
                                Vissza a feladatlistához
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
