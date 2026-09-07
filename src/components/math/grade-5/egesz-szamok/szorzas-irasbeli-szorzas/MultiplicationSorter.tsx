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
  Send,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './MultiplicationQuiz';

export interface SorterItem {
  id: string;
  expression: string; // e.g. "30 · 10"
  correctTargetId: string;
  explanation?: string;
}

export interface TargetGroup {
  id: string;
  label: string; // e.g. "300"
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
    title: '1. Könnyű szint: Fejszámolás és kerek szorzatok',
    instruction: 'Húzd vagy kattintással helyezd a szorzásokat a megfelelő szorzathoz!',
    ruleHint: 'Használd a 10-zel szorzás és a tényezők felcserélhetőségének trükkjeit!',
    groups: [
      {
        id: 'g1-300',
        label: '300',
        subtitle: 'Szorzat: 300',
        color: 'amber',
        badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
        badgeBorder: 'border-amber-200 dark:border-amber-800',
        badgeText: 'text-amber-700 dark:text-amber-300'
      },
      {
        id: 'g1-600',
        label: '600',
        subtitle: 'Szorzat: 600',
        color: 'emerald',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
        badgeBorder: 'border-emerald-200 dark:border-emerald-800',
        badgeText: 'text-emerald-700 dark:text-emerald-300'
      },
      {
        id: 'g1-1000',
        label: '1 000',
        subtitle: 'Szorzat: 1 000',
        color: 'indigo',
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
        badgeBorder: 'border-indigo-200 dark:border-indigo-800',
        badgeText: 'text-indigo-700 dark:text-indigo-300'
      }
    ],
    items: [
      { id: 's1-1', expression: '30 · 10', correctTargetId: 'g1-300', explanation: '30 · 10 = 300' },
      { id: 's1-2', expression: '15 · 20', correctTargetId: 'g1-300', explanation: '15 · 20 = 300' },
      { id: 's1-3', expression: '60 · 5', correctTargetId: 'g1-300', explanation: '60 · 5 = 300' },
      { id: 's1-4', expression: '20 · 30', correctTargetId: 'g1-600', explanation: '20 · 30 = 600' },
      { id: 's1-5', expression: '120 · 5', correctTargetId: 'g1-600', explanation: '120 · 5 = 600' },
      { id: 's1-6', expression: '150 · 4', correctTargetId: 'g1-600', explanation: '150 · 4 = 600' },
      { id: 's1-7', expression: '25 · 40', correctTargetId: 'g1-1000', explanation: '25 · 40 = 1 000' },
      { id: 's1-8', expression: '50 · 20', correctTargetId: 'g1-1000', explanation: '50 · 20 = 1 000' },
      { id: 's1-9', expression: '125 · 8', correctTargetId: 'g1-1000', explanation: '125 · 8 = 1 000' },
      { id: 's1-10', expression: '200 · 5', correctTargetId: 'g1-1000', explanation: '200 · 5 = 1 000' }
    ]
  },
  2: {
    title: '2. Közepes szint: Többjegyű szorzás és kerek ezresek',
    instruction: 'Csoportosítsd a szorzásokat a pontos szorzatokhoz!',
    ruleHint: 'Figyelj a nullák számára és a részletszorzatokra!',
    groups: [
      {
        id: 'g2-4000',
        label: '4 000',
        subtitle: 'Szorzat: 4 000',
        color: 'indigo',
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
        badgeBorder: 'border-indigo-200 dark:border-indigo-800',
        badgeText: 'text-indigo-700 dark:text-indigo-300'
      },
      {
        id: 'g2-12000',
        label: '12 000',
        subtitle: 'Szorzat: 12 000',
        color: 'teal',
        badgeBg: 'bg-teal-50 dark:bg-teal-950/50',
        badgeBorder: 'border-teal-200 dark:border-teal-800',
        badgeText: 'text-teal-700 dark:text-teal-300'
      },
      {
        id: 'g2-20000',
        label: '20 000',
        subtitle: 'Szorzat: 20 000',
        color: 'amber',
        badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
        badgeBorder: 'border-amber-200 dark:border-amber-800',
        badgeText: 'text-amber-700 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's2-1', expression: '160 · 25', correctTargetId: 'g2-4000', explanation: '160 · 25 = 4 000' },
      { id: 's2-2', expression: '80 · 50', correctTargetId: 'g2-4000', explanation: '80 · 50 = 4 000' },
      { id: 's2-3', expression: '400 · 10', correctTargetId: 'g2-4000', explanation: '400 · 10 = 4 000' },
      { id: 's2-4', expression: '300 · 40', correctTargetId: 'g2-12000', explanation: '300 · 40 = 12 000' },
      { id: 's2-5', expression: '600 · 20', correctTargetId: 'g2-12000', explanation: '600 · 20 = 12 000' },
      { id: 's2-6', expression: '240 · 50', correctTargetId: 'g2-12000', explanation: '240 · 50 = 12 000' },
      { id: 's2-7', expression: '500 · 40', correctTargetId: 'g2-20000', explanation: '500 · 40 = 20 000' },
      { id: 's2-8', expression: '250 · 80', correctTargetId: 'g2-20000', explanation: '250 · 80 = 20 000' },
      { id: 's2-9', expression: '2 000 · 10', correctTargetId: 'g2-20000', explanation: '2 000 · 10 = 20 000' },
      { id: 's2-10', expression: '4 000 · 5', correctTargetId: 'g2-20000', explanation: '4 000 · 5 = 20 000' }
    ]
  },
  3: {
    title: '3. Nehéz szint: Nagy számok és milliós szorzatok',
    instruction: 'Rendszerezd a nagy számok szorzását a megadott kerek értékekhez!',
    ruleHint: 'Számold meg az összes záró nullát és szorozd össze a kezdő számjegyeket!',
    groups: [
      {
        id: 'g3-500k',
        label: '500 000',
        subtitle: 'Szorzat: 500 ezer',
        color: 'blue',
        badgeBg: 'bg-blue-50 dark:bg-blue-950/50',
        badgeBorder: 'border-blue-200 dark:border-blue-800',
        badgeText: 'text-blue-700 dark:text-blue-300'
      },
      {
        id: 'g3-1m',
        label: '1 000 000',
        subtitle: 'Szorzat: 1 millió',
        color: 'rose',
        badgeBg: 'bg-rose-50 dark:bg-rose-950/50',
        badgeBorder: 'border-rose-200 dark:border-rose-800',
        badgeText: 'text-rose-700 dark:text-rose-300'
      },
      {
        id: 'g3-5m',
        label: '5 000 000',
        subtitle: 'Szorzat: 5 millió',
        color: 'emerald',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
        badgeBorder: 'border-emerald-200 dark:border-emerald-800',
        badgeText: 'text-emerald-700 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', expression: '2 500 · 200', correctTargetId: 'g3-500k', explanation: '2 500 · 200 = 500 000' },
      { id: 's3-2', expression: '125 000 · 4', correctTargetId: 'g3-500k', explanation: '125 000 · 4 = 500 000' },
      { id: 's3-3', expression: '50 000 · 10', correctTargetId: 'g3-500k', explanation: '50 000 · 10 = 500 000' },
      { id: 's3-4', expression: '250 000 · 4', correctTargetId: 'g3-1m', explanation: '250 000 · 4 = 1 000 000' },
      { id: 's3-5', expression: '12 500 · 80', correctTargetId: 'g3-1m', explanation: '12 500 · 80 = 1 000 000' },
      { id: 's3-6', expression: '500 · 2 000', correctTargetId: 'g3-1m', explanation: '500 · 2 000 = 1 000 000' },
      { id: 's3-7', expression: '100 000 · 10', correctTargetId: 'g3-1m', explanation: '100 000 · 10 = 1 000 000' },
      { id: 's3-8', expression: '250 000 · 20', correctTargetId: 'g3-5m', explanation: '250 000 · 20 = 5 000 000' },
      { id: 's3-9', expression: '500 000 · 10', correctTargetId: 'g3-5m', explanation: '500 000 · 10 = 5 000 000' },
      { id: 's3-10', expression: '1 250 000 · 4', correctTargetId: 'g3-5m', explanation: '1 250 000 · 4 = 5 000 000' }
    ]
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface MultiplicationSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function MultiplicationSorter({ level, onNextLevel, onOpenRules }: MultiplicationSorterProps) {
  const levelConfig = SORTER_LEVELS[level];

  const [unplacedItems, setUnplacedItems] = useState<SorterItem[]>([]);
  const [placedItems, setPlacedItems] = useState<Record<string, SorterItem[]>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverGroupId, setDragOverGroupId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const initialPlaced: Record<string, SorterItem[]> = {};
    levelConfig.groups.forEach((g) => {
      initialPlaced[g.id] = [];
    });
    setPlacedItems(initialPlaced);
    setUnplacedItems(shuffleArray(levelConfig.items));
    setSelectedItemId(null);
    setIsSubmitted(false);
    setIsCompleted(false);
    setScore(0);
    setTimer(0);
    setIsRunning(true);
  }, [level, levelConfig]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    e.dataTransfer.setData('text/plain', itemId);
    setDraggedItemId(itemId);
  };

  const handleDragOver = (e: React.DragEvent, groupId: string) => {
    e.preventDefault();
    setDragOverGroupId(groupId);
  };

  const handleDragLeave = () => {
    setDragOverGroupId(null);
  };

  const handleDrop = (e: React.DragEvent, targetGroupId: string) => {
    e.preventDefault();
    setDragOverGroupId(null);
    const itemId = e.dataTransfer.getData('text/plain') || draggedItemId;
    if (!itemId) return;

    moveItemToGroup(itemId, targetGroupId);
    setDraggedItemId(null);
  };

  const handleDropToBank = (e: React.DragEvent) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain') || draggedItemId;
    if (!itemId) return;

    removeItemFromGroups(itemId);
    setDraggedItemId(null);
  };

  const handleItemClick = (itemId: string) => {
    if (isSubmitted) return;
    if (selectedItemId === itemId) {
      setSelectedItemId(null);
    } else {
      setSelectedItemId(itemId);
    }
  };

  const handleGroupHeaderClick = (groupId: string) => {
    if (isSubmitted || !selectedItemId) return;
    moveItemToGroup(selectedItemId, groupId);
    setSelectedItemId(null);
  };

  const handleRemovePlacedItem = (itemId: string) => {
    if (isSubmitted) return;
    removeItemFromGroups(itemId);
    if (selectedItemId === itemId) setSelectedItemId(null);
  };

  const moveItemToGroup = (itemId: string, targetGroupId: string) => {
    let foundItem: SorterItem | undefined = unplacedItems.find((i) => i.id === itemId);
    let fromUnplaced = true;

    if (!foundItem) {
      for (const [gid, list] of Object.entries(placedItems)) {
        const itm = list.find((i) => i.id === itemId);
        if (itm) {
          foundItem = itm;
          fromUnplaced = false;
          break;
        }
      }
    }

    if (!foundItem) return;

    if (fromUnplaced) {
      setUnplacedItems((prev) => prev.filter((i) => i.id !== itemId));
    }

    setPlacedItems((prev) => {
      const next: Record<string, SorterItem[]> = {};
      for (const [gid, list] of Object.entries(prev)) {
        if (gid === targetGroupId) {
          const clean = list.filter((i) => i.id !== itemId);
          next[gid] = [...clean, foundItem!];
        } else {
          next[gid] = list.filter((i) => i.id !== itemId);
        }
      }
      return next;
    });

    if (isSubmitted) setIsSubmitted(false);
  };

  const removeItemFromGroups = (itemId: string) => {
    let foundItem: SorterItem | undefined;
    for (const [gid, list] of Object.entries(placedItems)) {
      const itm = list.find((i) => i.id === itemId);
      if (itm) {
        foundItem = itm;
        break;
      }
    }
    if (!foundItem) return;

    setPlacedItems((prev) => {
      const next: Record<string, SorterItem[]> = {};
      for (const [gid, list] of Object.entries(prev)) {
        next[gid] = list.filter((i) => i.id !== itemId);
      }
      return next;
    });

    setUnplacedItems((prev) => [...prev, foundItem!]);
    if (isSubmitted) setIsSubmitted(false);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    levelConfig.groups.forEach((g) => {
      const itemsInGroup = placedItems[g.id] || [];
      itemsInGroup.forEach((itm) => {
        if (itm.correctTargetId === g.id) {
          correctCount++;
        }
      });
    });

    setScore(correctCount);
    setIsSubmitted(true);

    const total = levelConfig.items.length;
    if (correctCount === total && unplacedItems.length === 0) {
      setIsCompleted(true);
      setIsRunning(false);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    const initialPlaced: Record<string, SorterItem[]> = {};
    levelConfig.groups.forEach((g) => {
      initialPlaced[g.id] = [];
    });
    setPlacedItems(initialPlaced);
    setUnplacedItems(shuffleArray(levelConfig.items));
    setSelectedItemId(null);
    setIsSubmitted(false);
    setIsCompleted(false);
    setScore(0);
    setTimer(0);
    setIsRunning(true);
  };

  const totalItemsCount = levelConfig.items.length;
  const placedTotal = totalItemsCount - unplacedItems.length;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Banner with Stats */}
      <div className="bg-gradient-to-r from-amber-900/90 via-orange-900/90 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-md border border-amber-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-950/70 border border-amber-700/60 px-3 py-1.5 rounded-xl text-xs font-mono font-black text-amber-300 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{formatTime(timer)}</span>
          </div>

          <div className="text-xs font-bold text-slate-300">
            Elhelyezve: <span className="font-mono text-amber-300 font-black">{placedTotal} / {totalItemsCount}</span>
          </div>
        </div>

        <div className="text-xs text-amber-200 font-medium hidden sm:block max-w-md truncate">
          💡 {levelConfig.instruction}
        </div>

        <div className="flex items-center gap-2">
          {onOpenRules && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenRules}
              className="h-8 px-2.5 text-xs text-amber-200 hover:text-white hover:bg-amber-800/50 rounded-xl"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Szabályzat
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="h-8 w-8 p-0 text-amber-200 hover:text-white hover:bg-amber-800/50 rounded-xl"
            title={soundEnabled ? 'Hang bekapcsolva' : 'Hang némítva'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Main Game Arena */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* LEFT: Unplaced Bank */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToBank}
          className="md:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border-2 border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3 min-h-[360px]"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Elemtár ({unplacedItems.length})</span>
            </div>
            {selectedItemId && (
              <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded-md font-bold animate-pulse">
                Kiválasztva! Kattints a célra
              </span>
            )}
          </div>

          {unplacedItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-1.5" />
              <p className="text-xs font-bold">Minden szorzás a helyén van!</p>
              <p className="text-[11px]">Kattints a „Válaszok beküldése” gombra az ellenőrzéshez.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-[440px] overflow-y-auto pr-1">
              {unplacedItems.map((item) => {
                const isSelected = selectedItemId === item.id;
                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    onClick={() => handleItemClick(item.id)}
                    className={cn(
                      "relative rounded-xl p-2.5 text-center font-mono font-black text-xs sm:text-sm cursor-grab active:cursor-grabbing transition-all select-none shadow-sm group",
                      "bg-gradient-to-b from-amber-600 to-orange-700 text-white border-2 border-amber-400/80 hover:brightness-110",
                      isSelected && "ring-4 ring-amber-400 ring-offset-2 scale-105 shadow-md shadow-amber-500/30"
                    )}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 rounded-t-[10px] pointer-events-none" />
                    <span className="relative z-10 drop-shadow-xs">{item.expression}</span>
                  </div>
                );
              })}
            </div>
          )}

          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center italic mt-auto">
            Húzd az elemeket, vagy kattints rájuk és válaszd ki a célcsoportot!
          </p>
        </div>

        {/* RIGHT: Target Buckets */}
        <div className="md:col-span-8 flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {levelConfig.groups.map((group) => {
              const itemsInGroup = placedItems[group.id] || [];
              const isDragOver = dragOverGroupId === group.id;

              return (
                <div
                  key={group.id}
                  onDragOver={(e) => handleDragOver(e, group.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, group.id)}
                  onClick={() => handleGroupHeaderClick(group.id)}
                  className={cn(
                    "bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 shadow-sm flex flex-col min-h-[360px] transition-all cursor-pointer",
                    isDragOver
                      ? "border-amber-400 bg-amber-50/40 dark:bg-amber-950/20 scale-[1.02]"
                      : selectedItemId
                      ? "border-amber-300 dark:border-amber-700 hover:border-amber-500"
                      : "border-slate-200/90 dark:border-slate-800"
                  )}
                >
                  {/* Target Header */}
                  <div className="text-center pb-2.5 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Közös szorzat:</span>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white tracking-wider">
                      {group.label}
                    </div>
                    {group.subtitle && (
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block mt-0.5">
                        {group.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Placed Items */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    {itemsInGroup.length === 0 ? (
                      <div className="flex-1 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center p-3 text-center text-slate-400 dark:text-slate-600 text-xs font-bold">
                        Húzz ide műveleteket!
                      </div>
                    ) : (
                      itemsInGroup.map((item) => {
                        const isCorrect = item.correctTargetId === group.id;
                        return (
                          <div
                            key={item.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemovePlacedItem(item.id);
                            }}
                            className={cn(
                              "relative rounded-xl p-2 text-center font-mono font-bold text-xs sm:text-sm transition-all select-none shadow-xs group cursor-pointer flex items-center justify-between px-3",
                              !isSubmitted
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 border border-slate-200 dark:border-slate-700"
                                : isCorrect
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border-2 border-emerald-400"
                                : "bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border-2 border-rose-400"
                            )}
                            title={isSubmitted ? item.explanation : "Kattints a visszavonáshoz"}
                          >
                            <span>{item.expression}</span>

                            {isSubmitted ? (
                              isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 ml-1" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 ml-1" />
                              )
                            ) : (
                              <span className="text-[10px] text-slate-400 group-hover:text-rose-500 font-sans">✕</span>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>

                  <div className="pt-2 mt-auto text-center border-t border-slate-100 dark:border-slate-800">
                    <span className="text-[11px] font-bold text-slate-400">
                      {itemsInGroup.length} elem
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 border-2 border-slate-200/90 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="rounded-xl h-9 px-3 text-xs font-bold text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 text-slate-500" />
              Alaphelyzet
            </Button>

            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={placedTotal === 0}
              className={cn(
                "rounded-xl h-10 px-5 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5",
                placedTotal === totalItemsCount
                  ? "bg-amber-600 hover:bg-amber-700 text-white animate-pulse"
                  : "bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white"
              )}
            >
              <Send className="w-4 h-4" />
              Válaszok beküldése
            </Button>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {isCompleted && (
        <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 shadow-xl animate-in zoom-in-95 duration-200 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Kiváló munka! Minden szorzás a helyére került! 🏆
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Idő: {formatTime(timer)} • Pontosság: 100%
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="rounded-xl h-10 px-4 text-xs font-bold border-slate-300 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4 mr-1.5 text-slate-500" />
              Újrapróbálom
            </Button>

            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="rounded-xl h-10 px-5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md flex items-center gap-1.5"
              >
                Következő szint ({level + 1}. szint)
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiplicationSorter;
