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
  RotateCcw,
  Sparkles,
  Flame,
  Clock,
  Loader2,
  Zap,
  Heart,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getTopSorterScores,
  SorterScoreRecord,
  formatSorterTime
} from '@/services/sorterLeaderboardService';

export interface SorterLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicId: string;
  topicTitle?: string;
  currentLevel?: number;
  grade?: number;
  highlightScoreId?: string;
}

const LEVEL_TABS = [
  { level: 1, label: '1. Könnyű szint', icon: Sparkles, color: 'emerald' },
  { level: 2, label: '2. Közepes szint', icon: Zap, color: 'blue' },
  { level: 3, label: '3. Nehéz szint', icon: Flame, color: 'purple' },
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

export function SorterLeaderboardModal({
  isOpen,
  onClose,
  topicId,
  topicTitle = 'Csoportosító Játék',
  currentLevel = 1,
  grade = 8,
  highlightScoreId
}: SorterLeaderboardModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(currentLevel || 1);
  const [scores, setScores] = useState<SorterScoreRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setSelectedLevel(currentLevel || 1);
    }
  }, [isOpen, currentLevel]);

  const fetchLeaderboard = useCallback(async (lvlToFetch: number) => {
    setLoading(true);
    try {
      const data = await getTopSorterScores(topicId, lvlToFetch, 10, grade);
      setScores(data);
    } catch (e) {
      console.error('Sorter leaderboard load error:', e);
    } finally {
      setLoading(false);
    }
  }, [topicId, grade]);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard(selectedLevel);
    }
  }, [isOpen, selectedLevel, fetchLeaderboard]);

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 font-black text-xs shadow-md border border-amber-200">
          🥇
        </span>
      );
    }
    if (rank === 2) {
      return (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800 font-black text-xs shadow-md border border-slate-100">
          🥈
        </span>
      );
    }
    if (rank === 3) {
      return (
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 font-black text-xs shadow-md border border-amber-400">
          🥉
        </span>
      );
    }
    return (
      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs">
        {rank}.
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 shadow-2xl">
        <DialogHeader className="pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-md shadow-amber-500/20">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  Csoportosító Ranglista
                </DialogTitle>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {topicTitle} • Legjobb szétválogatók
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => fetchLeaderboard(selectedLevel)}
              disabled={loading}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-200 hover:bg-slate-100 cursor-pointer"
            >
              <RotateCcw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
              Frissítés
            </Button>
          </div>

          {/* Level Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1.5 pt-3">
            {LEVEL_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedLevel === tab.level;
              return (
                <button
                  key={tab.level}
                  type="button"
                  onClick={() => setSelectedLevel(tab.level)}
                  className={cn(
                    "flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer border",
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100"
                  )}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </DialogHeader>

        {/* Content list */}
        <div className="py-2 space-y-2">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
              <span className="text-xs font-medium">Rangsor betöltése...</span>
            </div>
          ) : scores.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Trophy className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Még nincs rögzített eredmény ezen a szinten!
              </p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Légy te az első, aki hibátlanul, a leggyorsabban szétválogatja a kártyákat és felkerül az arany ranglistára!
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {scores.map((score, index) => {
                const rank = index + 1;
                const isHighlighted = highlightScoreId && score.id === highlightScoreId;

                return (
                  <div
                    key={score.id || index}
                    className={cn(
                      "flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition-all",
                      isHighlighted
                        ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 shadow-sm ring-2 ring-amber-400/40"
                        : rank <= 3
                        ? "bg-slate-50/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700"
                        : "bg-white dark:bg-slate-850 border-slate-100 dark:border-slate-800"
                    )}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      {getRankBadge(rank)}

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {score.studentName}
                          </span>
                          {score.userCode && (
                            <span className="text-[10px] font-mono px-1 rounded bg-slate-100 dark:bg-slate-700 text-slate-500">
                              {score.userCode}
                            </span>
                          )}
                          {isHighlighted && (
                            <Badge variant="outline" className="text-[9px] h-4 px-1 bg-amber-100 text-amber-800 border-amber-300">
                              Te!
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 flex-wrap">
                          {score.createdAt && <span>{formatDateHungarian(score.createdAt)}</span>}
                          <span>•</span>
                          {score.isGameOver ? (
                            <span className="inline-flex items-center gap-1 font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900/60">
                              💔 Game Over ({score.sortedItemsCount ?? 0}/{score.itemsCount} elem)
                            </span>
                          ) : (
                            <>
                              <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                                {Array.from({ length: Math.max(1, score.stars || 1) }).map((_, i) => (
                                  <Star key={i} className="w-2.5 h-2.5 fill-amber-400 text-amber-500" />
                                ))}
                              </span>
                              <span className="text-slate-400 text-[10px]">
                                ({score.itemsCount}/{score.itemsCount} elem)
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* Hearts */}
                      <div className="hidden sm:flex items-center gap-0.5">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Heart
                            key={i}
                            className={cn(
                              "w-3.5 h-3.5",
                              i < (score.heartsRemaining ?? 3)
                                ? "fill-rose-500 text-rose-500"
                                : "fill-slate-200 text-slate-300 dark:fill-slate-700 dark:text-slate-600"
                            )}
                          />
                        ))}
                      </div>

                      {/* Time */}
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-mono font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-xl">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{formatSorterTime(score.timeSeconds)}</span>
                      </div>

                      {/* Points Score */}
                      <div className="text-right min-w-[55px]">
                        <span className="font-black text-xs sm:text-sm text-indigo-600 dark:text-indigo-400">
                          {score.score} pt
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button
            size="sm"
            onClick={onClose}
            className="rounded-xl px-4 text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white cursor-pointer"
          >
            Bezárás
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export default SorterLeaderboardModal;
