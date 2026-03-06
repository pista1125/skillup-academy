import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface NumberItem {
    value: number;
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
    hint: string;
    groups: Group[];
    items: NumberItem[];
}

const GAME_LEVELS: Level[] = [
    {
        id: 1,
        title: '1. Páros és Páratlan',
        description: 'Válaszd szét a számokat: melyik páros, és melyik páratlan?',
        hint: 'A páros szám 2-vel osztható, a mararék 0. Pl: 4, 6, 8. A páratlan nem osztható pontosan 2-vel. Pl: 1, 3, 5.',
        groups: [
            { id: 'even', label: 'Páros számok', color: 'bg-blue-100 border-blue-400 text-blue-800' },
            { id: 'odd', label: 'Páratlan számok', color: 'bg-amber-100 border-amber-400 text-amber-800' },
        ],
        items: [2, 7, 4, 11, 6, 13, 8, 15, 10, 17].map(n => ({
            value: n,
            correctGroupId: n % 2 === 0 ? 'even' : 'odd',
        }))
    },
    {
        id: 2,
        title: '2. Kisebb vagy nagyobb mint 10?',
        description: 'Tedd a számokat a megfelelő csoportba: 10-nél kisebb, vagy 10 és nagyobb!',
        hint: 'A 10-nél kisebb számok: 1, 2, 3, 4, 5, 6, 7, 8, 9. A 10 és annál nagyobb számok: 10, 11, 12...',
        groups: [
            { id: 'lt10', label: '10-nél kisebb', color: 'bg-rose-100 border-rose-400 text-rose-800' },
            { id: 'gte10', label: '10 vagy nagyobb', color: 'bg-emerald-100 border-emerald-400 text-emerald-800' },
        ],
        items: [3, 15, 7, 20, 9, 12, 1, 18, 5, 11].map(n => ({
            value: n,
            correctGroupId: n < 10 ? 'lt10' : 'gte10',
        }))
    },
    {
        id: 3,
        title: '3. Egyjegyű vagy kétjegyű?',
        description: 'Válaszd szét a számjegyek szerint! Az egyjegyűek 1-9 között vannak, a kétjegyűek 10-99 között.',
        hint: '1–9: egyjegyű. 10–99: kétjegyű. A 0 egy különleges eset, mi most nem vesszük.',
        groups: [
            { id: 'single', label: 'Egyjegyű (1–9)', color: 'bg-violet-100 border-violet-400 text-violet-800' },
            { id: 'double', label: 'Kétjegyű (10–99)', color: 'bg-teal-100 border-teal-400 text-teal-800' },
        ],
        items: [5, 23, 8, 47, 3, 16, 9, 31, 1, 50].map(n => ({
            value: n,
            correctGroupId: n < 10 ? 'single' : 'double',
        }))
    },
    {
        id: 4,
        title: '4. Osztható 5-tel?',
        description: 'Csoportosítsd a számokat aszerint, hogy osztható-e 5-tel maradék nélkül!',
        hint: 'Az 5-tel osztható számok 0-ra vagy 5-re végződnek. Pl: 5, 10, 15, 20, 25...',
        groups: [
            { id: 'div5', label: 'Osztható 5-tel', color: 'bg-green-100 border-green-400 text-green-800' },
            { id: 'notdiv5', label: 'Nem osztható 5-tel', color: 'bg-orange-100 border-orange-400 text-orange-800' },
        ],
        items: [5, 7, 15, 12, 20, 18, 25, 3, 30, 14].map(n => ({
            value: n,
            correctGroupId: n % 5 === 0 ? 'div5' : 'notdiv5',
        }))
    },
    {
        id: 5,
        title: '5. Prímszámok és összetett számok',
        description: 'Különítsd el a prímszámokat az összetett számoktól! (A prím csak 1-gyel és önmagával osztható.)',
        hint: 'Prímek: 2, 3, 5, 7, 11, 13... Összetett: 4, 6, 8, 9, 10... (Kettőnél több osztójuk van)',
        groups: [
            { id: 'prime', label: 'Prímszám', color: 'bg-indigo-100 border-indigo-400 text-indigo-800' },
            { id: 'composite', label: 'Összetett szám', color: 'bg-pink-100 border-pink-400 text-pink-800' },
        ],
        items: (() => {
            const isPrime = (n: number) => {
                if (n < 2) return false;
                for (let i = 2; i <= Math.sqrt(n); i++) if (n % i === 0) return false;
                return true;
            };
            return [2, 4, 3, 6, 5, 9, 7, 12, 11, 15].map(n => ({
                value: n,
                correctGroupId: isPrime(n) ? 'prime' : 'composite',
            }));
        })()
    },
    {
        id: 6,
        title: '6. Osztható 3-mal?',
        description: 'Csoportosítsd a számokat aszerint, hogy osztható-e 3-mal maradék nélkül!',
        hint: 'A 3-mal osztható szám számjegyeinek összege is osztható 3-mal. Pl: 12 → 1+2=3 ✓. Pl: 24 → 2+4=6 ✓. A 13 → 1+3=4, nem osztható.',
        groups: [
            { id: 'div3', label: 'Osztható 3-mal', color: 'bg-cyan-100 border-cyan-400 text-cyan-900' },
            { id: 'notdiv3', label: 'Nem osztható 3-mal', color: 'bg-fuchsia-100 border-fuchsia-400 text-fuchsia-900' },
        ],
        items: [6, 7, 12, 11, 18, 14, 21, 16, 9, 20].map(n => ({
            value: n,
            correctGroupId: n % 3 === 0 ? 'div3' : 'notdiv3',
        }))
    }
];

const LEVEL_ICONS = ['🔢', '⚖️', '#️⃣', '✖️', '🌟', '➗'];
const LEVEL_COLORS = [
    'from-blue-500 to-indigo-500',
    'from-rose-500 to-pink-500',
    'from-violet-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-cyan-500 to-sky-500',
];

export function NumberGroupingGame({ onBack }: { onBack: () => void }) {
    const [selectedLevelIndex, setSelectedLevelIndex] = useState<number | null>(null);
    const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
    const [unplacedItems, setUnplacedItems] = useState<NumberItem[]>([]);
    const [placedItems, setPlacedItems] = useState<Record<string, NumberItem[]>>({});
    const [selectedItem, setSelectedItem] = useState<NumberItem | null>(null);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' | 'info' } | null>(null);
    const [isLevelComplete, setIsLevelComplete] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const level = selectedLevelIndex !== null ? GAME_LEVELS[selectedLevelIndex] : null;

    const startLevel = (index: number) => {
        const lvl = GAME_LEVELS[index];
        if (!lvl) return;
        const shuffled = [...lvl.items].sort(() => Math.random() - 0.5);
        setUnplacedItems(shuffled);
        const initialPlaced: Record<string, NumberItem[]> = {};
        lvl.groups.forEach(g => { initialPlaced[g.id] = []; });
        setPlacedItems(initialPlaced);
        setSelectedItem(null);
        setIsLevelComplete(false);
        setShowHint(false);
        setMessage({ text: 'Válassz ki egy számot, majd kattints a megfelelő csoportra!', type: 'info' });
        setSelectedLevelIndex(index);
    };

    const goToMenu = () => {
        setSelectedLevelIndex(null);
        setIsLevelComplete(false);
        setSelectedItem(null);
        setMessage(null);
        setShowHint(false);
    };

    const handleItemClick = (item: NumberItem) => {
        if (isLevelComplete) return;
        setSelectedItem(item);
        setMessage({ text: `Kiválasztva: ${item.value}. Melyik csoportba tartozik?`, type: 'info' });
    };

    const handleGroupClick = (groupId: string) => {
        if (isLevelComplete || !selectedItem) return;
        if (selectedItem.correctGroupId === groupId) {
            const remaining = unplacedItems.filter(i => i.value !== selectedItem.value);
            setPlacedItems(prev => ({ ...prev, [groupId]: [...prev[groupId], selectedItem] }));
            setUnplacedItems(remaining);
            setSelectedItem(null);
            if (remaining.length === 0) {
                setIsLevelComplete(true);
                setMessage({ text: 'Kiváló! Minden szám a helyére került!', type: 'success' });
                if (selectedLevelIndex !== null) {
                    setCompletedLevels(prev => new Set([...prev, selectedLevelIndex]));
                }
                confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
            } else {
                setMessage({ text: 'Helyes!', type: 'success' });
            }
        } else {
            setMessage({ text: 'Hm, ez nem ide illik! Gondold át újra!', type: 'error' });
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
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Számok csoportosítása</h2>
                        <div className="text-slate-500 font-medium">Válassz feladatot!</div>
                    </div>
                </div>

                {allDone && (
                    <div className="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-8 text-center mb-8 animate-in zoom-in">
                        <div className="text-5xl mb-3">🏆</div>
                        <h3 className="text-2xl font-black text-emerald-700 mb-1">Mindet megoldottad!</h3>
                        <p className="text-emerald-600">Brávó! Bármelyiket megcsinálhatod újra is.</p>
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
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">Számok csoportosítása</h2>
                        <div className="text-slate-500 font-medium">{level.title}</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setShowHint(h => !h)}
                        variant="outline"
                        className="rounded-xl shadow-sm bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 gap-2"
                    >
                        <Info className="w-4 h-4" />
                        Segítség
                    </Button>
                    <Button onClick={() => startLevel(selectedLevelIndex)} variant="outline" className="rounded-xl shadow-sm bg-white text-slate-600 hover:text-slate-900 border-slate-200 gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Újra
                    </Button>
                </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-4 text-center">
                <p className="text-lg text-slate-600 font-medium">{level.description}</p>
            </div>

            {/* Hint box */}
            {showHint && (
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-4 mb-4 animate-in slide-in-from-top-2 flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-amber-800 font-medium">{level.hint}</p>
                </div>
            )}

            <div className="flex-grow flex flex-col">
                {/* Target Groups */}
                <div className={cn(
                    "grid gap-4 mb-6",
                    level.groups.length === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3"
                )}>
                    {level.groups.map(group => (
                        <div
                            key={group.id}
                            onClick={() => handleGroupClick(group.id)}
                            className={cn(
                                "rounded-3xl border-2 p-6 transition-all duration-300 flex flex-col min-h-[180px]",
                                group.color,
                                selectedItem && !isLevelComplete ? "cursor-pointer hover:shadow-md hover:scale-[1.02] ring-4 ring-primary/30" : ""
                            )}
                        >
                            <h4 className="text-xl font-black text-center mb-4 uppercase tracking-wider">{group.label}</h4>
                            <div className="flex-grow flex flex-wrap content-start gap-2 justify-center">
                                {placedItems[group.id]?.map((item, idx) => (
                                    <div
                                        key={`${item.value}-${idx}`}
                                        className="bg-white/90 w-12 h-12 flex items-center justify-center rounded-2xl border border-black/10 shadow-sm font-black text-2xl text-slate-800 animate-in zoom-in"
                                    >
                                        {item.value}
                                    </div>
                                ))}
                                {placedItems[group.id]?.length === 0 && (
                                    <div className="w-full h-full flex items-center justify-center opacity-40 border-2 border-dashed border-current rounded-2xl p-4">
                                        <span className="font-semibold italic text-center">Ide tedd a számokat!</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Status Message */}
                <div className="min-h-[52px] flex items-center justify-center mb-4">
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

                {/* Numbers Bank OR Completion */}
                <div className="bg-white/80 backdrop-blur rounded-3xl p-6 border border-slate-200 shadow-sm flex-grow flex items-center justify-center">
                    {!isLevelComplete ? (
                        <div className="w-full">
                            <p className="text-center text-slate-400 font-semibold mb-4 text-sm uppercase tracking-widest">Beosztandó számok</p>
                            <div className="flex flex-wrap gap-4 justify-center items-center">
                                {unplacedItems.map((item, idx) => (
                                    <button
                                        key={`${item.value}-${idx}`}
                                        onClick={() => handleItemClick(item)}
                                        className={cn(
                                            "w-16 h-16 rounded-2xl font-black text-3xl transition-all shadow-md border-2",
                                            selectedItem?.value === item.value
                                                ? "bg-primary text-white border-primary shadow-xl scale-125 rotate-2 z-10"
                                                : "bg-white text-slate-800 border-slate-200 hover:border-primary hover:shadow-lg hover:-translate-y-1"
                                        )}
                                    >
                                        {item.value}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-5 animate-in slide-in-from-bottom-4">
                            <div className="text-6xl">🎉</div>
                            <h3 className="text-2xl font-black text-emerald-600">Szuper munka!</h3>
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
