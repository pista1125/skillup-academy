import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Plus,
    RotateCcw,
    Maximize2,
    Minimize2,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    ArrowDown,
    CornerDownRight,
    Play,
    Hash,
    HelpCircle,
    X,
    Shuffle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

export type PlaceValue = 'thousands' | 'hundreds' | 'tens' | 'ones';

interface PlaceColumnConfig {
    key: PlaceValue;
    label: string;
    sublabel: string;
    value: number;
    color: string;
    borderColor: string;
    bgSoft: string;
    textSoft: string;
    badgeBg: string;
    itemWidth: number;
    itemHeight: number;
    renderItem: (id: string, inResult?: boolean) => React.ReactNode;
}

export function ManipulativeAddition({ onBack }: { onBack: () => void }) {
    // Current task numbers
    const [num1, setNum1] = useState<number>(345);
    const [num2, setNum2] = useState<number>(237);

    // Active column step: 'ones' -> 'tens' -> 'hundreds' -> 'thousands' -> 'finished'
    const [activeCol, setActiveCol] = useState<PlaceValue | 'finished'>('ones');

    // Drag / Drop & Move state for each column
    // Which blocks have been moved down to the result area
    const [movedTopBlocks, setMovedTopBlocks] = useState<Record<PlaceValue, number>>({
        thousands: 0,
        hundreds: 0,
        tens: 0,
        ones: 0
    });
    const [movedBottomBlocks, setMovedBottomBlocks] = useState<Record<PlaceValue, number>>({
        thousands: 0,
        hundreds: 0,
        tens: 0,
        ones: 0
    });
    const [movedCarry, setMovedCarry] = useState<Record<PlaceValue, boolean>>({
        thousands: false,
        hundreds: false,
        tens: false,
        ones: false
    });

    // Generated carries: when ones produce a carry, carryTo['tens'] = 1
    const [carries, setCarries] = useState<Record<PlaceValue, number>>({
        thousands: 0,
        hundreds: 0,
        tens: 0,
        ones: 0
    });

    // Carry animation trigger
    const [isCarryingCol, setIsCarryingCol] = useState<PlaceValue | null>(null);

    // UI state
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isNumberModalOpen, setIsNumberModalOpen] = useState(false);
    const [inputNum1, setInputNum1] = useState('345');
    const [inputNum2, setInputNum2] = useState('237');
    const [feedbackMessage, setFeedbackMessage] = useState<{ text: string; type: 'info' | 'warn' | 'success' } | null>(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);

    const mainContainerRef = useRef<HTMLDivElement>(null);

    // Extract digits
    const getDigits = (n: number) => {
        const thousands = Math.floor(n / 1000);
        const hundreds = Math.floor((n % 1000) / 100);
        const tens = Math.floor((n % 100) / 10);
        const ones = n % 10;
        return { thousands, hundreds, tens, ones };
    };

    const digits1 = getDigits(num1);
    const digits2 = getDigits(num2);
    const totalSum = num1 + num2;

    const needsThousands = totalSum >= 1000 || digits1.thousands > 0 || digits2.thousands > 0;

    // Reset task
    const initTask = useCallback((n1: number, n2: number) => {
        setNum1(n1);
        setNum2(n2);
        setActiveCol('ones');
        setMovedTopBlocks({ thousands: 0, hundreds: 0, tens: 0, ones: 0 });
        setMovedBottomBlocks({ thousands: 0, hundreds: 0, tens: 0, ones: 0 });
        setMovedCarry({ thousands: false, hundreds: false, tens: false, ones: false });
        setCarries({ thousands: 0, hundreds: 0, tens: 0, ones: 0 });
        setIsCarryingCol(null);
        setIsAutoPlaying(false);
        setFeedbackMessage({
            text: 'Kezdd az egyesekkel! Húzd le az elemeket az eredmény mezőbe.',
            type: 'info'
        });
    }, []);

    useEffect(() => {
        initTask(345, 237);
    }, [initTask]);

    // Fullscreen toggle handler
    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                if (mainContainerRef.current?.requestFullscreen) {
                    await mainContainerRef.current.requestFullscreen();
                }
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                }
                setIsFullscreen(false);
            }
        } catch {
            setIsFullscreen(prev => !prev);
        }
    };

    useEffect(() => {
        const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
        document.addEventListener('fullscreenchange', handleFsChange);
        return () => document.removeEventListener('fullscreenchange', handleFsChange);
    }, []);

    // Column configurations
    const columns: PlaceColumnConfig[] = [
        ...(needsThousands ? [{
            key: 'thousands' as PlaceValue,
            label: 'EZRESEK',
            sublabel: '1000',
            value: 1000,
            color: 'bg-red-500',
            borderColor: 'border-red-600',
            bgSoft: 'bg-red-50/70',
            textSoft: 'text-red-700',
            badgeBg: 'bg-red-100 text-red-800 border-red-200',
            itemWidth: 54,
            itemHeight: 54,
            renderItem: (id: string, inResult?: boolean) => (
                <div
                    key={id}
                    className={cn(
                        "rounded-xl bg-red-500 border-b-2 border-red-700 text-white font-black flex items-center justify-center shadow-sm select-none transition-all",
                        inResult ? "w-11 h-11 text-[10px]" : "w-12 h-12 text-xs hover:scale-105"
                    )}
                >
                    1000
                </div>
            )
        }] : []),
        {
            key: 'hundreds' as PlaceValue,
            label: 'SZÁZASOK',
            sublabel: '100',
            value: 100,
            color: 'bg-emerald-500',
            borderColor: 'border-emerald-600',
            bgSoft: 'bg-emerald-50/70',
            textSoft: 'text-emerald-700',
            badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
            itemWidth: 50,
            itemHeight: 50,
            renderItem: (id: string, inResult?: boolean) => (
                <div
                    key={id}
                    className={cn(
                        "rounded-lg bg-emerald-500 border-b-2 border-emerald-700 text-white font-black flex items-center justify-center shadow-sm select-none relative overflow-hidden transition-all",
                        inResult ? "w-10 h-10 text-[10px]" : "w-11 h-11 text-xs hover:scale-105"
                    )}
                >
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                        backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)',
                        backgroundSize: '10% 10%'
                    }} />
                    <span className="relative z-10">100</span>
                </div>
            )
        },
        {
            key: 'tens' as PlaceValue,
            label: 'TÍZESEK',
            sublabel: '10',
            value: 10,
            color: 'bg-blue-500',
            borderColor: 'border-blue-600',
            bgSoft: 'bg-blue-50/70',
            textSoft: 'text-blue-700',
            badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
            itemWidth: 24,
            itemHeight: 56,
            renderItem: (id: string, inResult?: boolean) => (
                <div
                    key={id}
                    className={cn(
                        "rounded-md bg-blue-500 border-b-2 border-blue-700 text-white font-black flex items-center justify-center shadow-sm select-none relative overflow-hidden transition-all",
                        inResult ? "w-5 h-12 text-[9px]" : "w-6 h-14 text-[10px] hover:scale-105"
                    )}
                >
                    <div className="absolute inset-0 opacity-25 pointer-events-none" style={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)',
                        backgroundSize: '100% 10%'
                    }} />
                    <span className="relative z-10">10</span>
                </div>
            )
        },
        {
            key: 'ones' as PlaceValue,
            label: 'EGYESEK',
            sublabel: '1',
            value: 1,
            color: 'bg-amber-400',
            borderColor: 'border-amber-500',
            bgSoft: 'bg-amber-50/70',
            textSoft: 'text-amber-800',
            badgeBg: 'bg-amber-100 text-amber-800 border-amber-200',
            itemWidth: 26,
            itemHeight: 26,
            renderItem: (id: string, inResult?: boolean) => (
                <div
                    key={id}
                    className={cn(
                        "rounded-full bg-amber-400 border-2 border-amber-500 text-amber-950 font-black flex items-center justify-center shadow-sm select-none transition-all",
                        inResult ? "w-6 h-6 text-[10px]" : "w-7 h-7 text-xs hover:scale-110"
                    )}
                >
                    1
                </div>
            )
        }
    ];

    // Helper: Next place value key
    const getNextCol = (col: PlaceValue): PlaceValue | 'finished' => {
        if (col === 'ones') return 'tens';
        if (col === 'tens') return 'hundreds';
        if (col === 'hundreds') return needsThousands ? 'thousands' : 'finished';
        return 'finished';
    };

    // Warn if user tries to touch non-active column
    const handleWrongColumnClick = (colKey: PlaceValue) => {
        if (activeCol === 'finished') return;
        if (colKey !== activeCol) {
            setFeedbackMessage({
                text: '⚠️ Először mindig a legkisebb helyiértéket (egyeseket) számoljuk össze, mert abból átvitel keletkezhet!',
                type: 'warn'
            });
            setTimeout(() => setFeedbackMessage(null), 3500);
        }
    };

    // Move all available items of the ACTIVE column down to the result box
    const pullDownActiveColumn = () => {
        if (activeCol === 'finished') return;

        const d1 = digits1[activeCol];
        const d2 = digits2[activeCol];
        const hasCarry = carries[activeCol] > 0;

        setMovedTopBlocks(prev => ({ ...prev, [activeCol]: d1 }));
        setMovedBottomBlocks(prev => ({ ...prev, [activeCol]: d2 }));
        if (hasCarry) {
            setMovedCarry(prev => ({ ...prev, [activeCol]: true }));
        }

        const countInResult = d1 + d2 + (hasCarry ? 1 : 0);

        if (countInResult >= 10) {
            setFeedbackMessage({
                text: `Ebben az oszlopban ${countInResult} db lett! Váltsd át 10 db-ot a következő helyiértékre!`,
                type: 'info'
            });
        } else {
            setFeedbackMessage({
                text: `Rendben! ${countInResult} < 10, nincs átvitel. Folytasd a következő oszloppal!`,
                type: 'success'
            });
        }
    };

    // Execute place-value regrouping / carry (e.g. 10 ones -> 1 ten)
    const performCarry = (col: PlaceValue) => {
        const d1 = digits1[col];
        const d2 = digits2[col];
        const hasCarryIn = carries[col] > 0;
        const totalInResult = d1 + d2 + (hasCarryIn ? 1 : 0);

        if (totalInResult < 10) return;

        setIsCarryingCol(col);

        setTimeout(() => {
            const nextCol = getNextCol(col);
            if (nextCol !== 'finished') {
                // Add 1 to carry of next column
                setCarries(prev => ({ ...prev, [nextCol]: 1 }));
            }

            setIsCarryingCol(null);

            // Step to next column
            if (nextCol === 'finished') {
                setActiveCol('finished');
                confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            } else {
                setActiveCol(nextCol);
                const nextLabel = columns.find(c => c.key === nextCol)?.label.toLowerCase();
                setFeedbackMessage({
                    text: `10 db átváltva +1-re a ${nextLabel} oszlopba! Folytasd a ${nextLabel} összeadásával.`,
                    type: 'success'
                });
            }
        }, 700);
    };

    // Complete column if < 10 without carry
    const finalizeColumnWithoutCarry = (col: PlaceValue) => {
        const nextCol = getNextCol(col);
        if (nextCol === 'finished') {
            setActiveCol('finished');
            confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
            setFeedbackMessage({
                text: '🎉 Gratulálok! Sikeresen és helyesen összeadtad a számokat helyiérték szerint!',
                type: 'success'
            });
        } else {
            setActiveCol(nextCol);
            const nextLabel = columns.find(c => c.key === nextCol)?.label.toLowerCase();
            setFeedbackMessage({
                text: `Kész! Most add össze a ${nextLabel} oszlopát!`,
                type: 'info'
            });
        }
    };

    // Auto-demo / Step-by-step solver
    const runAutoPlay = async () => {
        if (isAutoPlaying) return;
        setIsAutoPlaying(true);

        const order: PlaceValue[] = ['ones', 'tens', 'hundreds', ...(needsThousands ? ['thousands' as PlaceValue] : [])];

        for (const col of order) {
            setActiveCol(col);
            await new Promise(r => setTimeout(r, 400));

            // Pull down
            const d1 = digits1[col];
            const d2 = digits2[col];
            setMovedTopBlocks(prev => ({ ...prev, [col]: d1 }));
            setMovedBottomBlocks(prev => ({ ...prev, [col]: d2 }));
            setMovedCarry(prev => ({ ...prev, [col]: true }));
            await new Promise(r => setTimeout(r, 600));

            // Check if carry needed
            const currentTotal = d1 + d2 + (carries[col] || 0);
            if (currentTotal >= 10) {
                setIsCarryingCol(col);
                await new Promise(r => setTimeout(r, 600));

                const nextCol = getNextCol(col);
                if (nextCol !== 'finished') {
                    setCarries(prev => ({ ...prev, [nextCol]: 1 }));
                }
                setIsCarryingCol(null);
                await new Promise(r => setTimeout(r, 400));
            }
        }

        setActiveCol('finished');
        setIsAutoPlaying(false);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    };

    // Quick presets
    const PRESETS = [
        { label: '345 + 237 (1 átlépés)', n1: 345, n2: 237 },
        { label: '48 + 36 (1 átlépés)', n1: 48, n2: 36 },
        { label: '142 + 235 (Nincs átlépés)', n1: 142, n2: 235 },
        { label: '378 + 285 (Dupla átlépés)', n1: 378, n2: 285 },
        { label: '584 + 468 (Ezresbe lépés)', n1: 584, n2: 468 }
    ];

    const generateRandomTask = () => {
        const n1 = Math.floor(Math.random() * 400) + 120;
        const n2 = Math.floor(Math.random() * 400) + 120;
        initTask(n1, n2);
    };

    return (
        <div
            ref={mainContainerRef}
            className={cn(
                "flex flex-col bg-slate-50 transition-all duration-200 select-none relative",
                isFullscreen
                    ? "fixed inset-0 z-[9999] w-screen h-screen rounded-none border-0 shadow-none m-0 p-0"
                    : "h-[calc(100vh-5.5rem)] min-h-[660px] max-h-[920px] rounded-3xl border border-slate-200 shadow-xl overflow-hidden m-0"
            )}
        >
            {/* Header */}
            <div className="bg-white border-b border-slate-200 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-sm z-30 shrink-0">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-slate-100 rounded-full h-9 w-9">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </Button>
                    <div>
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-base font-bold text-slate-800">Összeadás vizuálisan</h2>
                            <div className="flex items-center gap-2 px-3 py-0.5 bg-emerald-50 rounded-full border border-emerald-200">
                                <span className="text-xs font-black text-emerald-800">
                                    {num1} + {num2} = {activeCol === 'finished' ? totalSum : '?'}
                                </span>
                            </div>
                        </div>
                        <p className="text-[11px] text-slate-500 hidden sm:block">
                            Helyiértékes összeadás: mindig a legkisebb helyiértéktől (egyesektől) indulunk!
                        </p>
                    </div>
                </div>

                {/* Feedback Toast */}
                {feedbackMessage && (
                    <div className={cn(
                        "hidden md:flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold border animate-in fade-in zoom-in",
                        feedbackMessage.type === 'warn' && "bg-amber-50 text-amber-800 border-amber-300",
                        feedbackMessage.type === 'success' && "bg-emerald-50 text-emerald-800 border-emerald-300",
                        feedbackMessage.type === 'info' && "bg-blue-50 text-blue-800 border-blue-300"
                    )}>
                        {feedbackMessage.type === 'warn' ? <AlertCircle className="w-4 h-4 text-amber-600" /> : <Sparkles className="w-4 h-4 text-emerald-600" />}
                        <span>{feedbackMessage.text}</span>
                    </div>
                )}

                {/* Header Action Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsNumberModalOpen(true)}
                        className="rounded-xl h-9 px-3 bg-amber-50 border-amber-300 text-amber-800 hover:bg-amber-100 font-bold shadow-sm"
                        title="Tetszőleges számok beírása az összeadáshoz"
                    >
                        <Hash className="w-4 h-4 mr-1 text-amber-600" />
                        <span className="text-xs">Számok beírása</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={generateRandomTask}
                        className="rounded-xl h-9 px-2.5 text-slate-600 border-slate-200 hover:bg-slate-100 font-medium"
                        title="Új véletlen feladat generálása"
                    >
                        <Shuffle className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        <span className="text-xs">Új feladat</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={runAutoPlay}
                        disabled={isAutoPlaying || activeCol === 'finished'}
                        className="rounded-xl h-9 px-2.5 bg-indigo-50 border-indigo-200 text-indigo-700 hover:bg-indigo-100 font-semibold"
                        title="Lépésről lépésre bemutató animáció"
                    >
                        <Play className={cn("w-3.5 h-3.5 mr-1", isAutoPlaying && "animate-spin")} />
                        <span className="text-xs">Bemutató</span>
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleFullscreen}
                        className={cn(
                            "rounded-xl h-9 px-3 font-semibold transition-all border-slate-200",
                            isFullscreen ? "bg-indigo-50 border-indigo-300 text-indigo-700" : "text-slate-600 hover:bg-slate-100"
                        )}
                        title={isFullscreen ? "Kilépés a teljes képernyőből (Esc)" : "Teljes képernyő"}
                    >
                        {isFullscreen ? (
                            <>
                                <Minimize2 className="w-4 h-4 mr-1 text-indigo-600" />
                                <span className="text-xs font-bold">Kilépés</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 className="w-4 h-4 mr-1 text-slate-500" />
                                <span className="text-xs">Teljes képernyő</span>
                            </>
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => initTask(num1, num2)}
                        className="h-9 w-9 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
                        title="Feladat újrakezdése"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* Main Interactive Addition Canvas */}
            <div className="flex-1 flex flex-col p-4 overflow-y-auto relative">
                {/* Visual Addition Table */}
                <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Columns Grid */}
                    <div className="grid flex-1 border-b border-slate-200 divide-x divide-slate-100" style={{
                        gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`
                    }}>
                        {columns.map(col => {
                            const isCurrent = activeCol === col.key;
                            const isDone = activeCol === 'finished' || (
                                (col.key === 'ones' && activeCol !== 'ones') ||
                                (col.key === 'tens' && activeCol !== 'ones' && activeCol !== 'tens') ||
                                (col.key === 'hundreds' && (activeCol === 'thousands' || activeCol === 'finished'))
                            );

                            const d1 = digits1[col.key];
                            const d2 = digits2[col.key];
                            const carryCount = carries[col.key];

                            const topMoved = movedTopBlocks[col.key];
                            const bottomMoved = movedBottomBlocks[col.key];
                            const carryMoved = movedCarry[col.key];

                            const remainingTop = d1 - topMoved;
                            const remainingBottom = d2 - bottomMoved;

                            const totalInResult = topMoved + bottomMoved + (carryMoved ? 1 : 0);
                            const needsRegrouping = totalInResult >= 10;
                            const finalDigit = totalInResult >= 10 ? (totalInResult % 10) : totalInResult;

                            return (
                                <div
                                    key={col.key}
                                    onClick={() => handleWrongColumnClick(col.key)}
                                    className={cn(
                                        "flex flex-col p-3 transition-all duration-300 relative",
                                        isCurrent && "bg-blue-50/40 ring-4 ring-inset ring-blue-400/80",
                                        isDone && "bg-slate-50/50"
                                    )}
                                >
                                    {/* Column Header */}
                                    <div className="flex flex-col items-center pb-2 mb-2 border-b border-slate-100 text-center">
                                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                                            {col.label}
                                        </span>
                                        <span className={cn("text-xs font-black px-2 py-0.5 rounded-md mt-0.5", col.badgeBg)}>
                                            {col.sublabel}
                                        </span>
                                    </div>

                                    {/* CARRY IN BOX (Top Maradék) */}
                                    <div className="h-10 rounded-xl border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center mb-2 px-2 relative">
                                        {carryCount > 0 && !carryMoved && (
                                            <div className="flex items-center gap-1 animate-in zoom-in">
                                                <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[10px] font-black rounded-md animate-pulse">
                                                    +1 átvitel
                                                </span>
                                                {col.renderItem(`carry-${col.key}`)}
                                            </div>
                                        )}
                                        {carryCount === 0 && (
                                            <span className="text-[10px] text-slate-300 italic">Átvitel</span>
                                        )}
                                    </div>

                                    {/* FIRST NUMBER BLOCKS (Top Tag) */}
                                    <div className="flex-1 min-h-[90px] flex flex-wrap content-start justify-center gap-1.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100 mb-2 relative">
                                        <div className="absolute top-1 left-2 text-[10px] font-bold text-slate-400">
                                            {d1} db
                                        </div>
                                        {Array.from({ length: remainingTop }).map((_, i) =>
                                            col.renderItem(`top-${col.key}-${i}`)
                                        )}
                                        {remainingTop === 0 && d1 > 0 && (
                                            <span className="text-[10px] text-emerald-600 font-semibold self-center">Lehúzva</span>
                                        )}
                                        {d1 === 0 && (
                                            <span className="text-[10px] text-slate-300 self-center">0 db</span>
                                        )}
                                    </div>

                                    {/* PLUS SIGN in middle */}
                                    <div className="text-center text-xs font-black text-slate-300 my-0.5">
                                        +
                                    </div>

                                    {/* SECOND NUMBER BLOCKS (Bottom Tag) */}
                                    <div className="flex-1 min-h-[90px] flex flex-wrap content-start justify-center gap-1.5 p-2 rounded-xl bg-slate-50/60 border border-slate-100 mb-3 relative">
                                        <div className="absolute top-1 left-2 text-[10px] font-bold text-slate-400">
                                            {d2} db
                                        </div>
                                        {Array.from({ length: remainingBottom }).map((_, i) =>
                                            col.renderItem(`bot-${col.key}-${i}`)
                                        )}
                                        {remainingBottom === 0 && d2 > 0 && (
                                            <span className="text-[10px] text-emerald-600 font-semibold self-center">Lehúzva</span>
                                        )}
                                        {d2 === 0 && (
                                            <span className="text-[10px] text-slate-300 self-center">0 db</span>
                                        )}
                                    </div>

                                    {/* PULL DOWN BUTTON (When Active Column has items left) */}
                                    {isCurrent && (remainingTop > 0 || remainingBottom > 0 || (carryCount > 0 && !carryMoved)) && (
                                        <Button
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                pullDownActiveColumn();
                                            }}
                                            className="mb-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md animate-bounce"
                                        >
                                            <ArrowDown className="w-3.5 h-3.5 mr-1" /> Összehúzás le
                                        </Button>
                                    )}

                                    {/* RESULT AREA (Bottom Collector) */}
                                    <div className={cn(
                                        "min-h-[110px] rounded-2xl border-2 p-2 flex flex-col relative transition-all",
                                        isCurrent ? "border-blue-400 bg-blue-50/50 shadow-md" : "border-slate-200 bg-white",
                                        isDone && "bg-emerald-50/40 border-emerald-300"
                                    )}>
                                        <div className="flex items-center justify-between pb-1 border-b border-slate-100 mb-1">
                                            <span className="text-[10px] font-black uppercase text-slate-500">Eredmény:</span>
                                            <span className={cn(
                                                "text-xs font-black px-2 py-0.5 rounded-md",
                                                isDone ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                                            )}>
                                                {isDone ? finalDigit : totalInResult > 0 ? `${totalInResult} db` : '—'}
                                            </span>
                                        </div>

                                        {/* Blocks inside result */}
                                        <div className="flex-1 flex flex-wrap content-start items-center justify-center gap-1 overflow-y-auto">
                                            {Array.from({ length: totalInResult }).map((_, i) =>
                                                col.renderItem(`res-${col.key}-${i}`, true)
                                            )}
                                        </div>

                                        {/* REGROUPING / CARRY ACTION BUTTON */}
                                        {isCurrent && needsRegrouping && (
                                            <Button
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    performCarry(col.key);
                                                }}
                                                className="mt-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-xl shadow-lg animate-pulse"
                                            >
                                                <Sparkles className="w-3.5 h-3.5 mr-1" />
                                                10 db ➔ +1 átváltása!
                                            </Button>
                                        )}

                                        {/* FINALIZE COLUMN (When all pulled and < 10) */}
                                        {isCurrent && remainingTop === 0 && remainingBottom === 0 && !needsRegrouping && (
                                            <Button
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    finalizeColumnWithoutCarry(col.key);
                                                }}
                                                className="mt-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md"
                                            >
                                                <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Rendben, tovább
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Summary Bottom Bar */}
                    <div className="bg-slate-50 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-slate-600">Összegző számítás:</span>
                            <div className="flex items-center gap-2 font-mono text-base font-black">
                                <span className="text-slate-800">{num1}</span>
                                <span className="text-slate-400">+</span>
                                <span className="text-slate-800">{num2}</span>
                                <span className="text-slate-400">=</span>
                                <span className={cn(
                                    "px-3 py-1 rounded-xl text-lg font-black transition-all",
                                    activeCol === 'finished' ? "bg-emerald-500 text-white shadow-md scale-105" : "bg-slate-200 text-slate-500"
                                )}>
                                    {activeCol === 'finished' ? totalSum : '???'}
                                </span>
                            </div>
                        </div>

                        {activeCol === 'finished' && (
                            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs animate-in fade-in">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                <span>Kiváló munka! Mindegyik helyiértéket sikeresen összeadtad.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CUSTOM NUMBERS INPUT MODAL */}
            {isNumberModalOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setIsNumberModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 flex flex-col gap-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shadow-inner">
                                    <Plus className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Összeadandó számok megadása</h3>
                                    <p className="text-xs text-slate-500">Írj be két számot az írásbeli összeadáshoz!</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsNumberModalOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 flex items-center justify-center"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Two inputs */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">1. Szám:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={inputNum1}
                                    onChange={(e) => setInputNum1(e.target.value)}
                                    className="text-2xl font-black text-center h-14 bg-slate-50 rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200 shadow-inner"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-600">2. Szám:</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    value={inputNum2}
                                    onChange={(e) => setInputNum2(e.target.value)}
                                    className="text-2xl font-black text-center h-14 bg-slate-50 rounded-2xl border-2 border-amber-300 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-200 shadow-inner"
                                />
                            </div>
                        </div>

                        {/* Presets */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Ajánlott feladatok:
                            </span>
                            <div className="flex flex-col gap-1.5">
                                {PRESETS.map(p => (
                                    <button
                                        key={p.label}
                                        type="button"
                                        onClick={() => {
                                            setInputNum1(p.n1.toString());
                                            setInputNum2(p.n2.toString());
                                            initTask(p.n1, p.n2);
                                            setIsNumberModalOpen(false);
                                        }}
                                        className="text-left px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-all"
                                    >
                                        {p.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                            <Button variant="ghost" onClick={() => setIsNumberModalOpen(false)} className="rounded-xl h-10 px-4">
                                Mégse
                            </Button>
                            <Button
                                variant="default"
                                onClick={() => {
                                    const n1 = parseInt(inputNum1, 10);
                                    const n2 = parseInt(inputNum2, 10);
                                    if (!isNaN(n1) && !isNaN(n2) && n1 > 0 && n2 > 0) {
                                        initTask(n1, n2);
                                        setIsNumberModalOpen(false);
                                    }
                                }}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl h-10 px-5 shadow-md"
                            >
                                Beállítás
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
