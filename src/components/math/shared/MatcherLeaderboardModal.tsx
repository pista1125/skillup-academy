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
  CheckCircle2,
  Clock,
  Loader2,
  Zap,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getTopMatcherScores,
  MatcherScoreRecord,
  formatMatcherTime
} from '@/services/matcherLeaderboardService';

export interface MatcherLeaderboardModalProps {
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

export function MatcherLeaderboardModal({
  isOpen,
  onClose,
  topicId,
  topicTitle = 'Párosító Játék',
  currentLevel = 1,
  grade = 6,
  highlightScoreId
}: MatcherLeaderboardModalProps) {
  const [selectedLevel, setSelectedLevel] = useState<number>(currentLevel || 1);
  const [scores, setScores] = useState<MatcherScoreRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Sync selected level when opened
  useEffect(() => {
    if (isOpen) {
      setSelectedLevel(currentLevel || 1);
    }
  }, [isOpen, currentLevel]);

  const fetchLeaderboard = useCallback(async (lvlToFetch: number) => {
    setLoading(true);
    try {
      const data = await getTopMatcherScores(topicId, lvlToFetch, 10, grade);
      setScores(data);
    } catch (e) {
      console.error('Matcher leaderboard load error:', e);
    } finally {
      setLoading(false);
    }
  }, [topicId, grade]);

  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard(selectedLevel);
    }
  }, [isOpen, selectedLevel, fetchLeaderboard]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] flex flex-col p-0 overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl">
        {/* Header */}
        <DialogHeader className="p-5 pb-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                <Trophy className="w-6 h-6 text-amber-300 animate-bounce" />
              </div>
              <div>
                <DialogTitle className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                  Időalapú Rangsor ⚡
                </DialogTitle>
                <p className="text-xs text-emerald-100/90 font-medium">
                  {topicTitle} • Verseny az idővel
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => fetchLeaderboard(selectedLevel)}
              disabled={loading}
              className="h-8 px-2.5 rounded-xl text-white/90 hover:text-white hover:bg-white/20 text-xs font-bold gap-1"
            >
              <RotateCcw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
              <span className="hidden sm:inline">Frissítés</span>
            </Button>
          </div>

          {/* Level Tabs */}
          <div className="flex gap-1.5 mt-4 p-1 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10">
            {LEVEL_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedLevel === tab.level;
              return (
                <button
                  key={tab.level}
                  onClick={() => setSelectedLevel(tab.level)}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all duration-200",
                    isActive
                      ? "bg-white text-emerald-800 shadow-md scale-[1.02]"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </DialogHeader>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-2.5">
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
              <p className="text-xs font-semibold">Rangsor betöltése...</p>
            </div>
          ) : scores.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-100 dark:border-emerald-900">
                <Target className="w-7 h-7 opacity-70" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-700 dark:text-slate-300 text-sm">
                  Még nincs rögzített időeredmény ezen a szinten!
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Párosítsd a kártyákat a lehető leggyorsabban, és kerülj fel a ranglista élére! 🚀
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {scores.map((score, index) => {
                const rank = index + 1;
                const isFirst = rank === 1;
                const isSecond = rank === 2;
                const isThird = rank === 3;
                const isHighlighted = highlightScoreId && score.id === highlightScoreId;

                return (
                  <div
                    key={score.id || index}
                    className={cn(
                      "flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-200",
                      isHighlighted
                        ? "bg-emerald-50/90 dark:bg-emerald-950/60 border-emerald-500 ring-2 ring-emerald-500/30 shadow-md scale-[1.01]"
                        : isFirst
                        ? "bg-gradient-to-r from-amber-50 to-amber-100/40 dark:from-amber-950/30 dark:to-slate-900 border-amber-300/80 dark:border-amber-700/60 shadow-xs"
                        : isSecond
                        ? "bg-slate-50/80 dark:bg-slate-850 border-slate-300 dark:border-slate-700"
                        : isThird
                        ? "bg-amber-50/30 dark:bg-slate-850 border-amber-200 dark:border-slate-700"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                    )}
                  >
                    {/* Left: Rank + Avatar & Name */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex items-center justify-center shrink-0">
                        {isFirst ? (
                          <div className="w-8 h-8 rounded-xl bg-amber-400 text-white flex items-center justify-center font-black text-sm shadow-md shadow-amber-400/30">
                            🥇
                          </div>
                        ) : isSecond ? (
                          <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-700 dark:bg-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-sm shadow-xs">
                            🥈
                          </div>
                        ) : isThird ? (
                          <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                            🥉
                          </div>
                        ) : (
                          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold text-xs border border-slate-200 dark:border-slate-700">
                            #{rank}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {score.studentName}
                          </span>
                          {score.userCode && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded border border-slate-200 dark:border-slate-700">
                              {score.userCode}
                            </span>
                          )}
                          {isHighlighted && (
                            <Badge className="bg-emerald-600 text-[10px] h-4 px-1.5 font-bold text-white">
                              Te eredményed ✨
                            </Badge>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">
                          {formatDateHungarian(score.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Right: Time & Mistakes */}
                    <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono font-black text-sm sm:text-base">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatMatcherTime(score.timeSeconds)}</span>
                        </div>
                        <div className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          {score.mistakes === 0 ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5 justify-end">
                              <CheckCircle2 className="w-3 h-3" /> 0 hiba
                            </span>
                          ) : (
                            <span>{score.mistakes} hiba</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-100/70 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Top 10 leggyorsabb párosító</span>
          </div>
          <Button
            size="sm"
            onClick={onClose}
            className="rounded-xl px-4 h-8 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold"
          >
            Bezárás
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default MatcherLeaderboardModal;
