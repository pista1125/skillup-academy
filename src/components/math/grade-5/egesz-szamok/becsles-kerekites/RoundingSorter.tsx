import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  BookOpen,
  ArrowRight,
  Layers,
  Target,
  Send,
  HelpCircle,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './RoundingQuiz';

export interface SorterItem {
  id: string;
  expression: string; // e.g. "566 - 129" or "418" or "284 + 48"
  correctTargetId: string; // e.g. "t2", matching a TargetGroup id
  explanation?: string;
}

export interface TargetGroup {
  id: string;
  label: string; // e.g. "220" or "300"
  subtitle?: string; // e.g. "Tízesekre kerekítve"
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
    title: '1. Könnyű szint: Kerekítés százasokra',
    instruction: 'Húzd vagy kattintással helyezd a számokat a megfelelő százasra kerekített oszlopba!',
    ruleHint: 'Százasokra kerekítésnél a tízesek helyén álló számjegy dönt: 0–4 lefelé, 5–9 felfelé.',
    groups: [
      {
        id: 'g1-200',
        label: '200',
        subtitle: '150 – 249',
        color: 'emerald',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
        badgeBorder: 'border-emerald-200 dark:border-emerald-800',
        badgeText: 'text-emerald-700 dark:text-emerald-300'
      },
      {
        id: 'g1-300',
        label: '300',
        subtitle: '250 – 349',
        color: 'teal',
        badgeBg: 'bg-teal-50 dark:bg-teal-950/50',
        badgeBorder: 'border-teal-200 dark:border-teal-800',
        badgeText: 'text-teal-700 dark:text-teal-300'
      },
      {
        id: 'g1-400',
        label: '400',
        subtitle: '350 – 449',
        color: 'cyan',
        badgeBg: 'bg-cyan-50 dark:bg-cyan-950/50',
        badgeBorder: 'border-cyan-200 dark:border-cyan-800',
        badgeText: 'text-cyan-700 dark:text-cyan-300'
      }
    ],
    items: [
      { id: 's1-1', expression: '184', correctTargetId: 'g1-200', explanation: '184: a tízesek helyén 8 áll (≥ 5) ➔ 200' },
      { id: 's1-2', expression: '219', correctTargetId: 'g1-200', explanation: '219: a tízesek helyén 1 áll (< 5) ➔ 200' },
      { id: 's1-3', expression: '248', correctTargetId: 'g1-200', explanation: '248: a tízesek helyén 4 áll (< 5) ➔ 200' },
      { id: 's1-4', expression: '265', correctTargetId: 'g1-300', explanation: '265: a tízesek helyén 6 áll (≥ 5) ➔ 300' },
      { id: 's1-5', expression: '312', correctTargetId: 'g1-300', explanation: '312: a tízesek helyén 1 áll (< 5) ➔ 300' },
      { id: 's1-6', expression: '349', correctTargetId: 'g1-300', explanation: '349: a tízesek helyén 4 áll (< 5) ➔ 300' },
      { id: 's1-7', expression: '370', correctTargetId: 'g1-400', explanation: '370: a tízesek helyén 7 áll (≥ 5) ➔ 400' },
      { id: 's1-8', expression: '418', correctTargetId: 'g1-400', explanation: '418: a tízesek helyén 1 áll (< 5) ➔ 400' },
      { id: 's1-9', expression: '395', correctTargetId: 'g1-400', explanation: '395: a tízesek helyén 9 áll (≥ 5) ➔ 400' },
      { id: 's1-10', expression: '152', correctTargetId: 'g1-200', explanation: '152: a tízesek helyén 5 áll (≥ 5) ➔ 200' }
    ]
  },
  2: {
    title: '2. Közepes szint: Műveleti becslések (kivonás és összeadás tízesekre)',
    instruction: 'Kerekítsd a tagokat tízesekre, és húzd a műveletet a becsült eredményhez!',
    ruleHint: 'Pl. 566 – 129 ≈ 570 – 130 = 440 | 805 – 594 ≈ 810 – 590 = 220',
    groups: [
      {
        id: 'g2-220',
        label: '220',
        subtitle: 'Becsült érték: 220',
        color: 'blue',
        badgeBg: 'bg-blue-50 dark:bg-blue-950/50',
        badgeBorder: 'border-blue-200 dark:border-blue-800',
        badgeText: 'text-blue-700 dark:text-blue-300'
      },
      {
        id: 'g2-330',
        label: '330',
        subtitle: 'Becsült érték: 330',
        color: 'amber',
        badgeBg: 'bg-amber-50 dark:bg-amber-950/50',
        badgeBorder: 'border-amber-200 dark:border-amber-800',
        badgeText: 'text-amber-700 dark:text-amber-300'
      },
      {
        id: 'g2-440',
        label: '440',
        subtitle: 'Becsült érték: 440',
        color: 'teal',
        badgeBg: 'bg-teal-50 dark:bg-teal-950/50',
        badgeBorder: 'border-teal-200 dark:border-teal-800',
        badgeText: 'text-teal-700 dark:text-teal-300'
      }
    ],
    items: [
      { id: 's2-1', expression: '805 - 594', correctTargetId: 'g2-220', explanation: '805 ≈ 810, 594 ≈ 590 ➔ 810 - 590 = 220' },
      { id: 's2-2', expression: '299 - 79', correctTargetId: 'g2-220', explanation: '299 ≈ 300, 79 ≈ 80 ➔ 300 - 80 = 220' },
      { id: 's2-3', expression: '345 - 125', correctTargetId: 'g2-220', explanation: '345 ≈ 350, 125 ≈ 130 ➔ 350 - 130 = 220' },
      { id: 's2-4', expression: '912 - 582', correctTargetId: 'g2-330', explanation: '912 ≈ 910, 582 ≈ 580 ➔ 910 - 580 = 330' },
      { id: 's2-5', expression: '671 - 333', correctTargetId: 'g2-330', explanation: '671 ≈ 670, 333 ≈ 330 ➔ 670 - 330 = 340 ~ 330' },
      { id: 's2-6', expression: '741 - 412', correctTargetId: 'g2-330', explanation: '741 ≈ 740, 412 ≈ 410 ➔ 740 - 410 = 330' },
      { id: 's2-7', expression: '491 - 156', correctTargetId: 'g2-330', explanation: '491 ≈ 490, 156 ≈ 160 ➔ 490 - 160 = 330' },
      { id: 's2-8', expression: '822 - 378', correctTargetId: 'g2-440', explanation: '822 ≈ 820, 378 ≈ 380 ➔ 820 - 380 = 440' },
      { id: 's2-9', expression: '566 - 129', correctTargetId: 'g2-440', explanation: '566 ≈ 570, 129 ≈ 130 ➔ 570 - 130 = 440' },
      { id: 's2-10', expression: '1000 - 559', correctTargetId: 'g2-440', explanation: '1000 - 560 = 440' },
      { id: 's2-11', expression: '466 - 28', correctTargetId: 'g2-440', explanation: '466 ≈ 470, 28 ≈ 30 ➔ 470 - 30 = 440' }
    ]
  },
  3: {
    title: '3. Nehéz szint: Nagy számok, ezresek és tízezresek',
    instruction: 'Csoportosítsd a számokat és becsléseket a megadott kerekített értékekhez!',
    ruleHint: 'Figyelj a kerekítési helyiértékre és a 9-es átcsapódására!',
    groups: [
      {
        id: 'g3-2000',
        label: '2 000',
        subtitle: '1 500 – 2 499 (ezres)',
        color: 'indigo',
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
        badgeBorder: 'border-indigo-200 dark:border-indigo-800',
        badgeText: 'text-indigo-700 dark:text-indigo-300'
      },
      {
        id: 'g3-5000',
        label: '5 000',
        subtitle: '4 500 – 5 499 (ezres)',
        color: 'purple',
        badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
        badgeBorder: 'border-purple-200 dark:border-purple-800',
        badgeText: 'text-purple-700 dark:text-purple-300'
      },
      {
        id: 'g3-10000',
        label: '10 000',
        subtitle: '9 500 – 10 499 (9-es átcsapódás)',
        color: 'rose',
        badgeBg: 'bg-rose-50 dark:bg-rose-950/50',
        badgeBorder: 'border-rose-200 dark:border-rose-800',
        badgeText: 'text-rose-700 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's3-1', expression: '1 890', correctTargetId: 'g3-2000', explanation: '1 890: a százasok 8 (≥ 5) ➔ 2 000' },
      { id: 's3-2', expression: '2 350', correctTargetId: 'g3-2000', explanation: '2 350: a százasok 3 (< 5) ➔ 2 000' },
      { id: 's3-3', expression: '1 420 + 610', correctTargetId: 'g3-2000', explanation: '1 400 + 600 = 2 000' },
      { id: 's3-4', expression: '4 820', correctTargetId: 'g3-5000', explanation: '4 820: a százasok 8 (≥ 5) ➔ 5 000' },
      { id: 's3-5', expression: '5 240', correctTargetId: 'g3-5000', explanation: '5 240: a százasok 2 (< 5) ➔ 5 000' },
      { id: 's3-6', expression: '3 100 + 1 850', correctTargetId: 'g3-5000', explanation: '3 000 + 2 000 = 5 000' },
      { id: 's3-7', expression: '9 972', correctTargetId: 'g3-10000', explanation: '9 972: a százasok 9 (≥ 5) ➔ 10 000 (9-es átcsapódás)' },
      { id: 's3-8', expression: '10 380', correctTargetId: 'g3-10000', explanation: '10 380: a százasok 3 (< 5) ➔ 10 000' },
      { id: 's3-9', expression: '9 650', correctTargetId: 'g3-10000', explanation: '9 650: a százasok 6 (≥ 5) ➔ 10 000' },
      { id: 's3-10', expression: '14 800 - 4 900', correctTargetId: 'g3-10000', explanation: '15 000 - 5 000 = 10 000' }
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

interface RoundingSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function RoundingSorter({ level, onNextLevel, onOpenRules }: RoundingSorterProps) {
  const levelConfig = SORTER_LEVELS[level];

  // Game state
  const [unplacedItems, setUnplacedItems] = useState<SorterItem[]>([]);
  const [placedItems, setPlacedItems] = useState<Record<string, SorterItem[]>>({});
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Verification & Submission
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Timer
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Drag state
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dragOverGroupId, setDragOverGroupId] = useState<string | null>(null);

  // Audio / FX toggle state
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize level
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

  // Timer interval
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

  // Drag & Drop handlers
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

  // Click-to-place logic
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
    // Find item either in unplaced or placed
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

    // Remove from unplaced
    if (fromUnplaced) {
      setUnplacedItems((prev) => prev.filter((i) => i.id !== itemId));
    }

    // Remove from any previous group and append to target group
    setPlacedItems((prev) => {
      const next: Record<string, SorterItem[]> = {};
      for (const [gid, list] of Object.entries(prev)) {
        if (gid === targetGroupId) {
          // Add if not already present
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

  // Submit / Check
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
      {/* Top Banner with Stats & Instructions */}
      <div className="bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-md border border-blue-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-blue-950/70 border border-blue-700/60 px-3 py-1.5 rounded-xl text-xs font-mono font-black text-cyan-300 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatTime(timer)}</span>
          </div>

          <div className="text-xs font-bold text-slate-300">
            Elhelyezve: <span className="font-mono text-cyan-300 font-black">{placedTotal} / {totalItemsCount}</span>
          </div>
        </div>

        <div className="text-xs text-blue-200 font-medium hidden sm:block max-w-md truncate">
          💡 {levelConfig.instruction}
        </div>

        <div className="flex items-center gap-2">
          {onOpenRules && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenRules}
              className="h-8 px-2.5 text-xs text-blue-200 hover:text-white hover:bg-blue-800/50 rounded-xl"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Szabályzat
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="h-8 w-8 p-0 text-blue-200 hover:text-white hover:bg-blue-800/50 rounded-xl"
            title={soundEnabled ? 'Hang bekapcsolva' : 'Hang némítva'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Main Game Arena: Left Bank (Unplaced) + Right Target Bins */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* LEFT: Unplaced Bank (4 cols on medium/large) */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDropToBank}
          className="md:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border-2 border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col gap-3 min-h-[360px]"
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <Layers className="w-4 h-4 text-teal-600" />
              <span>Elemtár ({unplacedItems.length})</span>
            </div>
            {selectedItemId && (
              <span className="text-[10px] bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-2 py-0.5 rounded-md font-bold animate-pulse">
                Kiválasztva! Kattints a célra
              </span>
            )}
          </div>

          {unplacedItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mb-1.5" />
              <p className="text-xs font-bold">Minden elem elhelyezve!</p>
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
                      "relative rounded-xl p-2.5 text-center font-mono font-black text-sm sm:text-base cursor-grab active:cursor-grabbing transition-all select-none shadow-sm group",
                      "bg-gradient-to-b from-blue-700 to-indigo-800 text-white border-2 border-blue-500/80 hover:brightness-110",
                      isSelected && "ring-4 ring-cyan-400 ring-offset-2 scale-105 shadow-md shadow-cyan-500/30"
                    )}
                  >
                    {/* Top snow cap visual accent */}
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

        {/* RIGHT: Target Buckets (8 cols on medium/large) */}
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
                      ? "border-cyan-400 bg-cyan-50/40 dark:bg-cyan-950/20 scale-[1.02]"
                      : selectedItemId
                      ? "border-teal-300 dark:border-teal-700 hover:border-teal-500"
                      : "border-slate-200/90 dark:border-slate-800"
                  )}
                >
                  {/* Target Header */}
                  <div className="text-center pb-2.5 border-b border-slate-100 dark:border-slate-800 mb-2">
                    <span className="text-[11px] font-bold text-slate-400 block mb-0.5">Kerekített érték:</span>
                    <div className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white tracking-wider">
                      {group.label}
                    </div>
                    {group.subtitle && (
                      <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block mt-0.5">
                        {group.subtitle}
                      </span>
                    )}
                  </div>

                  {/* Placed Items in this group */}
                  <div className="flex-1 flex flex-col gap-1.5">
                    {itemsInGroup.length === 0 ? (
                      <div className="flex-1 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center p-3 text-center text-slate-400 dark:text-slate-600 text-xs font-bold">
                        Húzz ide elemeket!
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
                              "relative rounded-xl p-2 text-center font-mono font-bold text-sm transition-all select-none shadow-xs group cursor-pointer flex items-center justify-between px-3",
                              !isSubmitted
                                ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 border border-slate-200 dark:border-slate-700"
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
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="rounded-xl h-9 px-3 text-xs font-bold text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1 text-slate-500" />
                Alaphelyzet
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={placedTotal === 0}
                className={cn(
                  "rounded-xl h-10 px-5 font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5",
                  placedTotal === totalItemsCount
                    ? "bg-teal-600 hover:bg-teal-700 text-white animate-pulse"
                    : "bg-slate-900 hover:bg-slate-800 dark:bg-teal-600 dark:hover:bg-teal-700 text-white"
                )}
              >
                <Send className="w-4 h-4" />
                Válaszok beküldése
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal / Card */}
      {isCompleted && (
        <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 shadow-xl animate-in zoom-in-95 duration-200 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Kiváló munka! Minden elem a helyére került! 🏆
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Hibátlanul csoportosítottad az összes feladványt {formatTime(timer)} alatt!
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
                className="rounded-xl h-10 px-5 text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md flex items-center gap-1.5"
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
