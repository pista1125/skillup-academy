import React, { useState, useEffect, useCallback } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Trophy,
    Medal,
    RotateCcw,
    Sparkles,
    Flame,
    CheckCircle2,
    Calendar,
    School,
    Award,
    ChevronRight,
    User as UserIcon,
    Loader2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getTopSnakeScores, SnakeScoreRecord } from './snakeLeaderboardService';

interface SnakeLeaderboardModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentGrade?: number;
    highlightScoreId?: string;
}

const GRADE_TABS = [
    { grade: 0, label: 'Összesített', shortLabel: 'Mind' },
    { grade: 1, label: '1. osztály', shortLabel: '1. oszt' },
    { grade: 2, label: '2. osztály', shortLabel: '2. oszt' },
    { grade: 3, label: '3. osztály', shortLabel: '3. oszt' },
    { grade: 4, label: '4. osztály', shortLabel: '4. oszt' },
    { grade: 5, label: '5. osztály', shortLabel: '5. oszt' },
    { grade: 6, label: '6. osztály', shortLabel: '6. oszt' },
    { grade: 7, label: '7. osztály', shortLabel: '7. oszt' },
    { grade: 8, label: '8. osztály', shortLabel: '8. oszt' },
    { grade: 9, label: '9–12. osztály', shortLabel: '9-12.' },
];

function formatDateHungarian(isoString: string): string {
    try {
        const d = new Date(isoString);
        if (isNaN(d.getTime())) return '';
        const now = new Date();
        const diffMs = now.getTime() - d.getTime();
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Épp most';
        if (diffMins < 60) return `${diffMins} perce`;
        if (diffHours < 24) return `${diffHours} órája`;
        if (diffDays === 1) return 'Tegnap';
        if (diffDays < 7) return `${diffDays} napja`;

        return d.toLocaleDateString('hu-HU', {
            month: 'short',
            day: 'numeric'
        });
    } catch {
        return '';
    }
}

export function SnakeLeaderboardModal({
    isOpen,
    onClose,
    currentGrade,
    highlightScoreId
}: SnakeLeaderboardModalProps) {
    const [selectedTabGrade, setSelectedTabGrade] = useState<number>(currentGrade || 0);
    const [scores, setScores] = useState<SnakeScoreRecord[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Sync selected grade if currentGrade changes when opening
    useEffect(() => {
        if (isOpen) {
            setSelectedTabGrade(currentGrade || 0);
        }
    }, [isOpen, currentGrade]);

    const fetchLeaderboard = useCallback(async (gradeToFetch: number) => {
        setLoading(true);
        try {
            const data = await getTopSnakeScores(gradeToFetch === 0 ? undefined : gradeToFetch, 10);
            setScores(data);
        } catch (e) {
            console.error('Leaderboard load error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOpen) {
            fetchLeaderboard(selectedTabGrade);
        }
    }, [isOpen, selectedTabGrade, fetchLeaderboard]);

    const topThree = scores.slice(0, 3);
    const restScores = scores.slice(3);

    return (
        <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
            <DialogContent className="max-w-2xl max-h-[92vh] flex flex-col p-0 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-100 border-emerald-200/80 rounded-3xl shadow-2xl">
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-5 sm:p-6 pb-4 relative overflow-hidden shrink-0">
                    <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute right-12 top-2 text-6xl opacity-15 pointer-events-none select-none">
                        🐍
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-lg text-amber-300">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <DialogTitle className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                                    Matek Kígyó Ranglista
                                    <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                                </DialogTitle>
                                <p className="text-xs sm:text-sm text-emerald-100 font-medium mt-0.5">
                                    A 10 legjobb eredmény osztályonként és összesítve
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchLeaderboard(selectedTabGrade)}
                            disabled={loading}
                            className="text-white hover:bg-white/20 h-9 px-3 rounded-xl text-xs font-bold shrink-0"
                            title="Ranglista frissítése"
                        >
                            <RotateCcw className={cn("w-4 h-4 mr-1.5", loading && "animate-spin")} />
                            <span className="hidden sm:inline">Frissítés</span>
                        </Button>
                    </div>

                    {/* Grade Tabs Scrollable Strip */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-4 no-scrollbar -mx-1 px-1">
                        {GRADE_TABS.map(tab => {
                            const isActive = selectedTabGrade === tab.grade;
                            return (
                                <button
                                    key={tab.grade}
                                    onClick={() => setSelectedTabGrade(tab.grade)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 shrink-0",
                                        isActive
                                            ? "bg-white text-emerald-800 shadow-md scale-105"
                                            : "bg-white/15 text-emerald-50 hover:bg-white/25"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Body Content / Leaderboard */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                    {loading ? (
                        <div className="py-16 flex flex-col items-center justify-center text-slate-400 gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
                            <p className="text-sm font-bold text-slate-600">Ranglista betöltése...</p>
                        </div>
                    ) : scores.length === 0 ? (
                        <div className="py-12 px-4 text-center bg-white rounded-3xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-center gap-3">
                            <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl shadow-inner">
                                🐍
                            </div>
                            <div>
                                <h4 className="text-base font-black text-slate-800">Még nincs mentett eredmény!</h4>
                                <p className="text-xs text-slate-500 max-w-sm mt-1">
                                    Ebben a kategóriában még senki sem ért el pontszámot. Játssz egy kört, és légy te az első a dicsőségfalon!
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Top 3 Podium Cards */}
                            {topThree.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                    {topThree.map((item, index) => {
                                        const rank = index + 1;
                                        const isGold = rank === 1;
                                        const isSilver = rank === 2;
                                        const isBronze = rank === 3;

                                        return (
                                            <div
                                                key={item.id || index}
                                                className={cn(
                                                    "p-3.5 rounded-2xl border transition-all duration-200 relative overflow-hidden flex flex-col justify-between shadow-sm",
                                                    isGold && "bg-gradient-to-br from-amber-500/10 via-amber-50 to-orange-50 border-amber-300 ring-2 ring-amber-400/40",
                                                    isSilver && "bg-gradient-to-br from-slate-100 via-slate-50 to-zinc-100 border-slate-300",
                                                    isBronze && "bg-gradient-to-br from-amber-800/10 via-amber-900/5 to-orange-100/50 border-amber-700/30",
                                                    highlightScoreId === item.id && "ring-2 ring-emerald-500 bg-emerald-50/50"
                                                )}
                                            >
                                                <div className="flex items-start justify-between gap-2">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-2xl select-none">
                                                            {isGold && '🥇'}
                                                            {isSilver && '🥈'}
                                                            {isBronze && '🥉'}
                                                        </span>
                                                        <div>
                                                            <p className="text-xs font-black text-slate-800 truncate max-w-[130px]" title={item.playerName}>
                                                                {item.playerName}
                                                            </p>
                                                            {item.userCode && (
                                                                <span className="text-[10px] text-slate-400 font-mono">
                                                                    #{item.userCode}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            "text-[10px] font-bold px-1.5 py-0.5",
                                                            isGold && "bg-amber-100 text-amber-800 border-amber-300",
                                                            isSilver && "bg-slate-200/70 text-slate-700 border-slate-300",
                                                            isBronze && "bg-amber-100 text-amber-900 border-amber-300"
                                                        )}
                                                    >
                                                        {item.grade}. oszt
                                                    </Badge>
                                                </div>

                                                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-end justify-between">
                                                    <div>
                                                        <p className="text-[10px] text-slate-400 font-medium">Pontszám</p>
                                                        <p className={cn(
                                                            "text-xl font-black leading-tight",
                                                            isGold ? "text-amber-600" : isSilver ? "text-slate-700" : "text-amber-800"
                                                        )}>
                                                            {item.score}
                                                        </p>
                                                    </div>

                                                    <div className="text-right text-[10px] text-slate-500 font-medium space-y-0.5">
                                                        <div className="flex items-center justify-end gap-1 text-emerald-600 font-bold">
                                                            <CheckCircle2 className="w-3 h-3" />
                                                            <span>{item.correctCount} db</span>
                                                        </div>
                                                        {item.bestStreak > 1 && (
                                                            <div className="flex items-center justify-end gap-1 text-purple-600 font-bold">
                                                                <Flame className="w-3 h-3" />
                                                                <span>{item.bestStreak}x széria</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}

                            {/* Remaining Ranks (4 - 10) */}
                            {restScores.length > 0 && (
                                <div className="space-y-1.5 pt-1">
                                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 flex items-center justify-between">
                                        <span>4–10. Helyezettek</span>
                                        <span>Részletek</span>
                                    </div>

                                    {restScores.map((item, idx) => {
                                        const rank = idx + 4;
                                        const isHighlighted = highlightScoreId === item.id;

                                        return (
                                            <div
                                                key={item.id || idx}
                                                className={cn(
                                                    "p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-200 transition-all flex items-center justify-between gap-3",
                                                    isHighlighted && "bg-emerald-50/80 border-emerald-400 ring-2 ring-emerald-300"
                                                )}
                                            >
                                                {/* Left: Rank & Name */}
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-7 h-7 rounded-xl bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center shrink-0">
                                                        {rank}.
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="flex items-center gap-1.5">
                                                            <p className="text-xs sm:text-sm font-bold text-slate-800 truncate" title={item.playerName}>
                                                                {item.playerName}
                                                            </p>
                                                            {item.userCode && (
                                                                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                                                                    #{item.userCode}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                                                            <span className="font-semibold text-emerald-600">{item.grade}. osztály</span>
                                                            <span>•</span>
                                                            <span>{formatDateHungarian(item.createdAt)}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right: Score & Stats */}
                                                <div className="flex items-center gap-3 shrink-0">
                                                    <div className="hidden sm:flex flex-col items-end text-[11px] text-slate-500 font-medium">
                                                        <span className="text-emerald-600 font-bold">{item.correctCount} helyes válasz</span>
                                                        {item.bestStreak > 1 && (
                                                            <span className="text-purple-600 text-[10px] font-bold">{item.bestStreak}x széria</span>
                                                        )}
                                                    </div>
                                                    <div className="text-right bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
                                                        <p className="text-sm sm:text-base font-black text-slate-900 leading-none">
                                                            {item.score}
                                                        </p>
                                                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                                                            pont
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer Note */}
                <div className="p-3 px-5 bg-white border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
                    <p className="flex items-center gap-1.5 text-[11px]">
                        <span>💡</span>
                        <span>Játssz minél hosszabb hibátlan szériával a magasabb pontszámokért!</span>
                    </p>
                    <Button
                        size="sm"
                        onClick={onClose}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-8 px-4 rounded-xl text-xs"
                    >
                        Bezárás
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
