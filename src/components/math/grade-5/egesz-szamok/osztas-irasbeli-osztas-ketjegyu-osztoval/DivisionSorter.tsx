import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  ArrowRight,
  Layers,
  Send
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './DivisionQuiz';

export interface SorterItem {
  id: string;
  expression: string;
  correctTargetId: string;
  explanation?: string;
}

export interface TargetGroup {
  id: string;
  label: string;
  subtitle?: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
}

interface SorterLevelConfig {
  title: string;
  instruction: string;
  ruleHint: string;
  groups: TargetGroup[];
  items: SorterItem[];
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Könnyű szint: Pontos, maradékos és tiltott osztások',
    instruction: 'Csoportosítsd az osztási műveleteket típusuk szerint!',
    ruleHint: 'Ügyelj a maradékra és a nullával való osztás tilalmára!',
    groups: [
      {
        id: 'g1-exact',
        label: 'Pontos osztás',
        subtitle: 'Maradék = 0',
        color: 'emerald',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
        badgeBorder: 'border-emerald-200 dark:border-emerald-800',
        badgeText: 'text-emerald-700 dark:text-emerald-300'
      },
      {
        id: 'g1-rem',
        label: 'Maradékos osztás',
        subtitle: 'Maradék > 0',
        color: 'amber',
        badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
        badgeBorder: 'border-amber-200 dark:border-amber-800',
        badgeText: 'text-amber-700 dark:text-amber-300'
      },
      {
        id: 'g1-invalid',
        label: 'Értelmetlen művelet',
        subtitle: '0-val való osztás',
        color: 'rose',
        badgeBg: 'bg-rose-50 dark:bg-rose-950/50',
        badgeBorder: 'border-rose-200 dark:border-rose-800',
        badgeText: 'text-rose-700 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's1-1', expression: '72 : 8', correctTargetId: 'g1-exact', explanation: '72 : 8 = 9 (maradék 0)' },
      { id: 's1-2', expression: '540 : 10', correctTargetId: 'g1-exact', explanation: '540 : 10 = 54 (maradék 0)' },
      { id: 's1-3', expression: '100 : 4', correctTargetId: 'g1-exact', explanation: '100 : 4 = 25 (maradék 0)' },
      { id: 's1-4', expression: '45 : 7', correctTargetId: 'g1-rem', explanation: '45 : 7 = 6, maradék: 3' },
      { id: 's1-5', expression: '50 : 6', correctTargetId: 'g1-rem', explanation: '50 : 6 = 8, maradék: 2' },
      { id: 's1-6', expression: '38 : 5', correctTargetId: 'g1-rem', explanation: '38 : 5 = 7, maradék: 3' },
      { id: 's1-7', expression: '84 : 0', correctTargetId: 'g1-invalid', explanation: 'Nullával osztani tilos és értelmetlen!' },
      { id: 's1-8', expression: '150 : 0', correctTargetId: 'g1-invalid', explanation: 'Nullával osztani tilos és értelmetlen!' },
      { id: 's1-9', expression: '0 : 8', correctTargetId: 'g1-exact', explanation: '0 : 8 = 0 (pontos osztás)' },
      { id: 's1-10', expression: '29 : 4', correctTargetId: 'g1-rem', explanation: '29 : 4 = 7, maradék: 1' }
    ]
  },
  2: {
    title: '2. Közepes szint: Hányados nagyságrendje kétjegyű osztásnál',
    instruction: 'Csoportosítsd az osztásokat a hányados nagysága alapján!',
    ruleHint: 'Kerekítéssel becsüld meg a hányados első jegyét!',
    groups: [
      {
        id: 'g2-under20',
        label: 'Hányados < 20',
        subtitle: '1-től 19-ig',
        color: 'indigo',
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
        badgeBorder: 'border-indigo-200 dark:border-indigo-800',
        badgeText: 'text-indigo-700 dark:text-indigo-300'
      },
      {
        id: 'g2-between',
        label: '20 ≤ Hányados ≤ 50',
        subtitle: '20-tól 50-ig',
        color: 'teal',
        badgeBg: 'bg-teal-50 dark:bg-teal-950/50',
        badgeBorder: 'border-teal-200 dark:border-teal-800',
        badgeText: 'text-teal-700 dark:text-teal-300'
      },
      {
        id: 'g2-over50',
        label: 'Hányados > 50',
        subtitle: '51 felett',
        color: 'amber',
        badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
        badgeBorder: 'border-amber-200 dark:border-amber-800',
        badgeText: 'text-amber-700 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's2-1', expression: '360 : 30', correctTargetId: 'g2-under20', explanation: '360 : 30 = 12 (< 20)' },
      { id: 's2-2', expression: '450 : 25', correctTargetId: 'g2-under20', explanation: '450 : 25 = 18 (< 20)' },
      { id: 's2-3', expression: '842 : 26', correctTargetId: 'g2-between', explanation: '842 : 26 = 32 (m: 10)' },
      { id: 's2-4', expression: '945 : 35', correctTargetId: 'g2-between', explanation: '945 : 35 = 27' },
      { id: 's2-5', expression: '672 : 21', correctTargetId: 'g2-between', explanation: '672 : 21 = 32' },
      { id: 's2-6', expression: '1 200 : 30', correctTargetId: 'g2-between', explanation: '1 200 : 30 = 40' },
      { id: 's2-7', expression: '738 : 6', correctTargetId: 'g2-over50', explanation: '738 : 6 = 123 (> 50)' },
      { id: 's2-8', expression: '1 248 : 24', correctTargetId: 'g2-over50', explanation: '1 248 : 24 = 52 (> 50)' },
      { id: 's2-9', expression: '3 600 : 40', correctTargetId: 'g2-over50', explanation: '3 600 : 40 = 90 (> 50)' },
      { id: 's2-10', expression: '260 : 20', correctTargetId: 'g2-under20', explanation: '260 : 20 = 13 (< 20)' }
    ]
  },
  3: {
    title: '3. Nehéz szint: Kerek tízesek, százasok és ezresek osztása',
    instruction: 'Rendszerezd az osztásokat a pontos kerek hányadosokhoz!',
    ruleHint: 'Hagyj el azonos számú nullát mindkét tag végéről!',
    groups: [
      {
        id: 'g3-60',
        label: 'Hányados: 60',
        subtitle: '= 60',
        color: 'indigo',
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
        badgeBorder: 'border-indigo-200 dark:border-indigo-800',
        badgeText: 'text-indigo-700 dark:text-indigo-300'
      },
      {
        id: 'g3-250',
        label: 'Hányados: 250',
        subtitle: '= 250',
        color: 'teal',
        badgeBg: 'bg-teal-50 dark:bg-teal-950/50',
        badgeBorder: 'border-teal-200 dark:border-teal-800',
        badgeText: 'text-teal-700 dark:text-teal-300'
      },
      {
        id: 'g3-600',
        label: 'Hányados: 600',
        subtitle: '= 600',
        color: 'purple',
        badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
        badgeBorder: 'border-purple-200 dark:border-purple-800',
        badgeText: 'text-purple-700 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's3-1', expression: '4 800 : 80', correctTargetId: 'g3-60', explanation: '4 800 : 80 = 480 : 8 = 60' },
      { id: 's3-2', expression: '36 000 : 600', correctTargetId: 'g3-60', explanation: '36 000 : 600 = 360 : 6 = 60' },
      { id: 's3-3', expression: '1 800 : 30', correctTargetId: 'g3-60', explanation: '1 800 : 30 = 60' },
      { id: 's3-4', expression: '12 500 : 50', correctTargetId: 'g3-250', explanation: '12 500 : 50 = 1 250 : 5 = 250' },
      { id: 's3-5', expression: '25 000 : 100', correctTargetId: 'g3-250', explanation: '25 000 : 100 = 250' },
      { id: 's3-6', expression: '5 000 : 20', correctTargetId: 'g3-250', explanation: '5 000 : 20 = 500 : 2 = 250' },
      { id: 's3-7', expression: '480 000 : 800', correctTargetId: 'g3-600', explanation: '480 000 : 800 = 4 800 : 8 = 600' },
      { id: 's3-8', expression: '180 000 : 300', correctTargetId: 'g3-600', explanation: '180 000 : 300 = 1 800 : 3 = 600' },
      { id: 's3-9', expression: '600 000 : 1 000', correctTargetId: 'g3-600', explanation: '600 000 : 1 000 = 600' },
      { id: 's3-10', expression: '3 600 000 : 6 000', correctTargetId: 'g3-600', explanation: '3 600 000 : 6 000 = 600' }
    ]
  }
};

interface DivisionSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function DivisionSorter({ level, onNextLevel, onOpenRules }: DivisionSorterProps) {
  const currentConfig = SORTER_LEVELS[level];

  const [poolItems, setPoolItems] = useState<SorterItem[]>([]);
  const [groupedItems, setGroupedItems] = useState<Record<string, SorterItem[]>>({});
  const [selectedItem, setSelectedItem] = useState<SorterItem | null>(null);
  const [draggedItem, setDraggedItem] = useState<SorterItem | null>(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [score, setScore] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });

  // Reset and shuffle pool on level change
  useEffect(() => {
    const shuffled = [...currentConfig.items].sort(() => Math.random() - 0.5);
    setPoolItems(shuffled);

    const initialGroups: Record<string, SorterItem[]> = {};
    currentConfig.groups.forEach((g) => {
      initialGroups[g.id] = [];
    });
    setGroupedItems(initialGroups);

    setSelectedItem(null);
    setDraggedItem(null);
    setTimer(0);
    setIsRunning(true);
    setIsCompleted(false);
    setIsEvaluated(false);
    setScore({ correct: 0, total: currentConfig.items.length });
  }, [level]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  const handlePlaceItem = (item: SorterItem, targetGroupId: string) => {
    if (isEvaluated) return;

    // Remove from pool
    setPoolItems((prev) => prev.filter((i) => i.id !== item.id));

    // Remove from other groups if re-placing
    const updatedGroups = { ...groupedItems };
    Object.keys(updatedGroups).forEach((gId) => {
      updatedGroups[gId] = updatedGroups[gId].filter((i) => i.id !== item.id);
    });

    // Add to target group
    updatedGroups[targetGroupId] = [...updatedGroups[targetGroupId], item];
    setGroupedItems(updatedGroups);
    setSelectedItem(null);
  };

  const handleReturnToPool = (item: SorterItem, sourceGroupId: string) => {
    if (isEvaluated) return;

    setGroupedItems((prev) => ({
      ...prev,
      [sourceGroupId]: prev[sourceGroupId].filter((i) => i.id !== item.id)
    }));
    setPoolItems((prev) => [...prev, item]);
    setSelectedItem(null);
  };

  const handleEvaluate = () => {
    let correct = 0;
    const total = currentConfig.items.length;

    Object.entries(groupedItems).forEach(([groupId, items]) => {
      items.forEach((item) => {
        if (item.correctTargetId === groupId) {
          correct++;
        }
      });
    });

    setScore({ correct, total });
    setIsEvaluated(true);
    setIsRunning(false);

    if (correct === total) {
      setIsCompleted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    const shuffled = [...currentConfig.items].sort(() => Math.random() - 0.5);
    setPoolItems(shuffled);

    const initialGroups: Record<string, SorterItem[]> = {};
    currentConfig.groups.forEach((g) => {
      initialGroups[g.id] = [];
    });
    setGroupedItems(initialGroups);

    setSelectedItem(null);
    setDraggedItem(null);
    setTimer(0);
    setIsRunning(true);
    setIsCompleted(false);
    setIsEvaluated(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const allPlaced = poolItems.length === 0;

  return (
    <div className="w-full space-y-4">
      {/* Top Header info */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>Idő: <strong>{formatTime(timer)}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <Layers className="w-4 h-4 text-teal-500" />
            <span>Hátralévő: <strong>{poolItems.length}</strong> / {currentConfig.items.length}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenRules && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenRules}
              className="rounded-xl h-8 px-2.5 text-xs text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Szabályok
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleRestart}
            className="rounded-xl h-8 px-2.5 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Újrakezdés
          </Button>

          {!isEvaluated && allPlaced && (
            <Button
              size="sm"
              onClick={handleEvaluate}
              className="rounded-xl h-8 px-3 text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              <Send className="w-3.5 h-3.5 mr-1.5" />
              Ellenőrzés
            </Button>
          )}
        </div>
      </div>

      {/* Completion Banner */}
      {isEvaluated && (
        <div className={cn(
          "p-6 rounded-3xl border-2 text-center space-y-3 animate-in zoom-in-95 duration-300",
          score.correct === score.total
            ? "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-500/30"
            : "bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30"
        )}>
          <div className="flex items-center justify-center gap-2">
            {score.correct === score.total ? (
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <Trophy className="w-6 h-6" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {score.correct === score.total
                ? 'Tökéletes megoldás!'
                : `Eredmény: ${score.correct} / ${score.total} helyes`}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Idő: {formatTime(timer)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              className="rounded-xl"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Újrajátszás
            </Button>

            {level < 3 && onNextLevel && (
              <Button
                size="sm"
                onClick={onNextLevel}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Következő szint ({level + 1}) <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Target Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {currentConfig.groups.map((group) => {
          const itemsInGroup = groupedItems[group.id] || [];

          return (
            <div
              key={group.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (draggedItem) {
                  handlePlaceItem(draggedItem, group.id);
                  setDraggedItem(null);
                }
              }}
              onClick={() => {
                if (selectedItem) {
                  handlePlaceItem(selectedItem, group.id);
                }
              }}
              className={cn(
                "min-h-[220px] p-4 rounded-3xl border-2 transition-all flex flex-col justify-between",
                group.badgeBg,
                group.badgeBorder,
                selectedItem && "ring-2 ring-indigo-400 dark:ring-indigo-500 cursor-pointer shadow-md"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div>
                    <h4 className={cn("font-bold text-sm sm:text-base", group.badgeText)}>
                      {group.label}
                    </h4>
                    {group.subtitle && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {group.subtitle}
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    {itemsInGroup.length} db
                  </span>
                </div>

                {/* Items in this bucket */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {itemsInGroup.map((item) => {
                    const isCorrect = item.correctTargetId === group.id;

                    return (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReturnToPool(item, group.id);
                        }}
                        className={cn(
                          "px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer",
                          isEvaluated
                            ? isCorrect
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : "bg-white dark:bg-slate-850 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:border-rose-400"
                        )}
                        title={isEvaluated ? item.explanation : 'Kattints ide a visszavételhez!'}
                      >
                        <span>{item.expression}</span>
                        {isEvaluated && (
                          isCorrect ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-white" />
                          )
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {selectedItem && (
                <div className="text-center text-[11px] font-bold text-indigo-600 dark:text-indigo-400 pt-2 animate-pulse">
                  Kattints ide a lehelyezéshez!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Item Pool (waiting to be placed) */}
      {poolItems.length > 0 && (
        <div className="p-4 rounded-3xl bg-slate-100/80 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Válaszd ki a kártyát, majd kattints a megfelelő célcsoportra:
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {poolItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;

              return (
                <div
                  key={item.id}
                  draggable={!isEvaluated}
                  onDragStart={() => setDraggedItem(item)}
                  onClick={() => setSelectedItem(isSelected ? null : item)}
                  className={cn(
                    "px-4 py-2.5 rounded-2xl font-mono text-sm sm:text-base font-bold transition-all duration-200 cursor-pointer shadow-xs select-none border-2",
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
                      : "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:border-indigo-400"
                  )}
                >
                  {item.expression}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
