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
import { DifficultyLevel } from './OrderOfOperationsQuiz';

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
    title: '1. Könnyű szint: Elsőként elvégzendő művelet típusa',
    instruction: 'Válaszd ki, hogy melyik műveletet kell ELŐSZÖR elvégezni a kifejezésben!',
    ruleHint: '1. Zárójel ➔ 2. Szorzás / Osztás ➔ 3. Összeadás / Kivonás (balról jobbra)',
    groups: [
      {
        id: 'g1-paren',
        label: 'Zárójelen belüli művelet',
        subtitle: 'Legmagasabb prioritás: ( )',
        color: 'purple',
        badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
        badgeBorder: 'border-purple-200 dark:border-purple-800',
        badgeText: 'text-purple-700 dark:text-purple-300'
      },
      {
        id: 'g1-multdiv',
        label: 'Szorzás vagy Osztás',
        subtitle: 'Magasabb rendű: · vagy :',
        color: 'indigo',
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
        badgeBorder: 'border-indigo-200 dark:border-indigo-800',
        badgeText: 'text-indigo-700 dark:text-indigo-300'
      },
      {
        id: 'g1-addsub',
        label: 'Összeadás vagy Kivonás',
        subtitle: 'Nincs zárójel / szorzás (balról jobbra)',
        color: 'blue',
        badgeBg: 'bg-blue-50 dark:bg-blue-950/50',
        badgeBorder: 'border-blue-200 dark:border-blue-800',
        badgeText: 'text-blue-700 dark:text-blue-300'
      }
    ],
    items: [
      { id: 's1-1', expression: '(14 + 6) · 3', correctTargetId: 'g1-paren', explanation: 'A zárójelben lévő 14 + 6 összeadás élvez elsőbbséget.' },
      { id: 's1-2', expression: '50 - (18 : 2)', correctTargetId: 'g1-paren', explanation: 'A zárójelben lévő 18 : 2 osztást kell legelőször elvégezni.' },
      { id: 's1-3', expression: '8 · (25 - 15)', correctTargetId: 'g1-paren', explanation: 'A zárójel belseje (25 - 15) végzendő el először.' },
      { id: 's1-4', expression: '24 + 6 · 5', correctTargetId: 'g1-multdiv', explanation: 'A 6 · 5 szorzás megelőzi a 24-hez való hozzáadást.' },
      { id: 's1-5', expression: '50 - 30 : 5', correctTargetId: 'g1-multdiv', explanation: 'A 30 : 5 osztást végezzük el a kivonás előtt.' },
      { id: 's1-6', expression: '12 · 4 - 8', correctTargetId: 'g1-multdiv', explanation: 'A 12 · 4 szorzás megelőzi a kivonást.' },
      { id: 's1-7', expression: '45 - 15 + 10', correctTargetId: 'g1-addsub', explanation: 'Azonos rendű műveleteknél balról jobbra haladunk: 45 - 15 = 30.' },
      { id: 's1-8', expression: '32 + 18 - 25', correctTargetId: 'g1-addsub', explanation: 'Balról jobbra: először 32 + 18 = 50.' },
      { id: 's1-9', expression: '(40 - 10) : 5', correctTargetId: 'g1-paren', explanation: 'A zárójelben lévő 40 - 10 kivonás az első.' },
      { id: 's1-10', expression: '70 + 80 : 4', correctTargetId: 'g1-multdiv', explanation: 'A 80 : 4 osztás megelőzi a 70-hez való összeadást.' }
    ]
  },
  2: {
    title: '2. Közepes szint: Kifejezés végeredményének értéke',
    instruction: 'Számold ki a kifejezések értékét és sorold be a megfelelő értéktartományba!',
    ruleHint: 'Végezd el a műveleteket helyes sorrendben a pontos eredményért!',
    groups: [
      {
        id: 'g2-under25',
        label: 'Eredmény < 25',
        subtitle: '1-től 24-ig',
        color: 'purple',
        badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
        badgeBorder: 'border-purple-200 dark:border-purple-800',
        badgeText: 'text-purple-700 dark:text-purple-300'
      },
      {
        id: 'g2-between',
        label: '25 ≤ Eredmény ≤ 60',
        subtitle: '25-től 60-ig',
        color: 'indigo',
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/50',
        badgeBorder: 'border-indigo-200 dark:border-indigo-800',
        badgeText: 'text-indigo-700 dark:text-indigo-300'
      },
      {
        id: 'g2-over60',
        label: 'Eredmény > 60',
        subtitle: '61 felett',
        color: 'emerald',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
        badgeBorder: 'border-emerald-200 dark:border-emerald-800',
        badgeText: 'text-emerald-700 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', expression: '30 - 3 · 6', correctTargetId: 'g2-under25', explanation: '30 - 18 = 12 (< 25)' },
      { id: 's2-2', expression: '(50 - 20) : 5', correctTargetId: 'g2-under25', explanation: '30 : 5 = 6 (< 25)' },
      { id: 's2-3', expression: '15 + 18 : 3 - 5', correctTargetId: 'g2-under25', explanation: '15 + 6 - 5 = 16 (< 25)' },
      { id: 's2-4', expression: '20 + 5 · 6', correctTargetId: 'g2-between', explanation: '20 + 30 = 50 (25-60 között)' },
      { id: 's2-5', expression: '80 - 4 · (18 - 8)', correctTargetId: 'g2-between', explanation: '80 - 4 · 10 = 80 - 40 = 40 (25-60 között)' },
      { id: 's2-6', expression: '(24 + 16) : 2 + 10', correctTargetId: 'g2-between', explanation: '40 : 2 + 10 = 20 + 10 = 30 (25-60 között)' },
      { id: 's2-7', expression: '6 · 7 - 12', correctTargetId: 'g2-between', explanation: '42 - 12 = 30 (25-60 között)' },
      { id: 's2-8', expression: '(15 + 5) · 4', correctTargetId: 'g2-over60', explanation: '20 · 4 = 80 (> 60)' },
      { id: 's2-9', expression: '100 - 2 · (12 - 2)', correctTargetId: 'g2-over60', explanation: '100 - 2 · 10 = 100 - 20 = 80 (> 60)' },
      { id: 's2-10', expression: '45 + 5 · 10', correctTargetId: 'g2-over60', explanation: '45 + 50 = 95 (> 60)' }
    ]
  },
  3: {
    title: '3. Nehéz szint: Műveleti azonosságok és tipikus hibák',
    instruction: 'Csoportosítsd az állításokat: Helyes azonosság, Tipikus hiba vagy Okos kiemelés!',
    ruleHint: 'Figyeld a disztributivitást, a balról jobbra szabályt és a zárójelbontást!',
    groups: [
      {
        id: 'g3-ident',
        label: 'Helyes azonosság',
        subtitle: 'Műveleti szabály szerint igaz',
        color: 'emerald',
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/50',
        badgeBorder: 'border-emerald-200 dark:border-emerald-800',
        badgeText: 'text-emerald-700 dark:text-emerald-300'
      },
      {
        id: 'g3-trap',
        label: 'Tipikus hiba / Csapda',
        subtitle: 'Műveleti sorrend megsértése',
        color: 'rose',
        badgeBg: 'bg-rose-50 dark:bg-rose-950/50',
        badgeBorder: 'border-rose-200 dark:border-rose-800',
        badgeText: 'text-rose-700 dark:text-rose-300'
      },
      {
        id: 'g3-smart',
        label: 'Okos kiemelés / Számolás',
        subtitle: 'Közös tényezővel egyszerűsítve',
        color: 'purple',
        badgeBg: 'bg-purple-50 dark:bg-purple-950/50',
        badgeBorder: 'border-purple-200 dark:border-purple-800',
        badgeText: 'text-purple-700 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's3-1', expression: '(15 + 25) + 35 = 15 + (25 + 35)', correctTargetId: 'g3-ident', explanation: 'Asszociativitás (csoportosíthatóság) érvényes.' },
      { id: 's3-2', expression: '6 · (20 + 4) = 6 · 20 + 6 · 4', correctTargetId: 'g3-ident', explanation: 'Disztributivitás (széttagolhatóság) helyes.' },
      { id: 's3-3', expression: '45 · 99 = 45 · 100 - 45', correctTargetId: 'g3-ident', explanation: '45 · (100 - 1) = 4500 - 45 helyes trükk.' },
      { id: 's3-4', expression: '20 - 5 · 2 = 15 · 2 = 30', correctTargetId: 'g3-trap', explanation: 'HIBA: A szorzást kellett volna előbb elvégezni (20 - 10 = 10).' },
      { id: 's3-5', expression: '40 : 2 · 4 = 40 : 8 = 5', correctTargetId: 'g3-trap', explanation: 'HIBA: Balról jobbra kell haladni: 40 : 2 = 20, 20 · 4 = 80.' },
      { id: 's3-6', expression: '50 - (20 - 5) = 50 - 20 - 5', correctTargetId: 'g3-trap', explanation: 'HIBA: Zárójel előtt mínusz jel esetén a belső jelek váltanak: 50 - 20 + 5 = 35.' },
      { id: 's3-7', expression: '28 · 17 + 28 · 83 = 28 · 100', correctTargetId: 'g3-smart', explanation: 'Közös tényező (28) kiemelése: 28 · (17 + 83) = 2800.' },
      { id: 's3-8', expression: '64 · 75 - 64 · 25 = 64 · 50', correctTargetId: 'g3-smart', explanation: 'Közös tényező (64) kiemelése: 64 · (75 - 25) = 3200.' },
      { id: 's3-9', expression: '125 · 8 · 7 = 1000 · 7', correctTargetId: 'g3-smart', explanation: 'Tényezők okos csoportosítása: 125 · 8 = 1000.' },
      { id: 's3-10', expression: '24 : (4 + 2) = 24 : 4 + 2 = 8', correctTargetId: 'g3-trap', explanation: 'HIBA: Zárójel felbontása osztásnál balról nem érvényes így, helyesen 24 : 6 = 4.' }
    ]
  }
};

interface OrderOfOperationsSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function OrderOfOperationsSorter({ level, onNextLevel, onOpenRules }: OrderOfOperationsSorterProps) {
  const config = SORTER_LEVELS[level];

  const [poolItems, setPoolItems] = useState<SorterItem[]>([]);
  const [placedItems, setPlacedItems] = useState<Record<string, SorterItem[]>>({});
  const [selectedItem, setSelectedItem] = useState<SorterItem | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Initialize on level change
  useEffect(() => {
    // Shuffle pool items
    const shuffled = [...config.items].sort(() => Math.random() - 0.5);
    setPoolItems(shuffled);

    const initialPlaced: Record<string, SorterItem[]> = {};
    config.groups.forEach((g) => {
      initialPlaced[g.id] = [];
    });
    setPlacedItems(initialPlaced);

    setSelectedItem(null);
    setIsSubmitted(false);
    setTimer(0);
    setIsRunning(true);
  }, [level, config]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isSubmitted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isSubmitted]);

  const handleSelectItem = (item: SorterItem) => {
    if (isSubmitted) return;
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  const handlePlaceInGroup = (groupId: string) => {
    if (!selectedItem || isSubmitted) return;

    // Remove from pool
    setPoolItems((prev) => prev.filter((it) => it.id !== selectedItem.id));

    // Remove from other groups if it was there
    const updatedPlaced: Record<string, SorterItem[]> = {};
    Object.keys(placedItems).forEach((gId) => {
      updatedPlaced[gId] = placedItems[gId].filter((it) => it.id !== selectedItem.id);
    });

    // Add to target group
    updatedPlaced[groupId] = [...(updatedPlaced[groupId] || []), selectedItem];

    setPlacedItems(updatedPlaced);
    setSelectedItem(null);
  };

  const handleRemoveItem = (item: SorterItem, fromGroupId: string) => {
    if (isSubmitted) return;

    // Remove from group
    setPlacedItems((prev) => ({
      ...prev,
      [fromGroupId]: prev[fromGroupId].filter((it) => it.id !== item.id)
    }));

    // Return to pool
    setPoolItems((prev) => [...prev, item]);
    if (selectedItem?.id === item.id) setSelectedItem(null);
  };

  const handleCheckAnswers = () => {
    setIsSubmitted(true);
    setIsRunning(false);

    // Calculate accuracy
    let correctCount = 0;
    Object.keys(placedItems).forEach((groupId) => {
      placedItems[groupId].forEach((item) => {
        if (item.correctTargetId === groupId) {
          correctCount++;
        }
      });
    });

    if (correctCount === config.items.length) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    const shuffled = [...config.items].sort(() => Math.random() - 0.5);
    setPoolItems(shuffled);

    const initialPlaced: Record<string, SorterItem[]> = {};
    config.groups.forEach((g) => {
      initialPlaced[g.id] = [];
    });
    setPlacedItems(initialPlaced);

    setSelectedItem(null);
    setIsSubmitted(false);
    setTimer(0);
    setIsRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Score calculations
  const totalItems = config.items.length;
  let correctCount = 0;
  if (isSubmitted) {
    Object.keys(placedItems).forEach((groupId) => {
      placedItems[groupId].forEach((item) => {
        if (item.correctTargetId === groupId) {
          correctCount++;
        }
      });
    });
  }

  const allPlaced = poolItems.length === 0;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Banner with stats and hints */}
      <div className="bg-gradient-to-r from-purple-950/90 via-indigo-950/90 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-md border border-purple-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-purple-300 bg-purple-950/80 px-2.5 py-0.5 rounded-lg border border-purple-700/60">
              Csoportosító
            </span>
            <h3 className="text-sm sm:text-base font-black text-white">{config.title}</h3>
          </div>
          <p className="text-xs text-purple-200/80 font-medium">{config.instruction}</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-purple-950/70 border border-purple-700/60 px-3 py-1.5 rounded-xl text-xs font-mono font-black text-purple-300 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{formatTime(timer)}</span>
          </div>

          {onOpenRules && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenRules}
              className="h-8 px-2.5 text-xs text-purple-200 hover:text-white hover:bg-purple-800/50 rounded-xl"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Szabályzat
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            onClick={handleRestart}
            className="h-8 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Újrakezdés
          </Button>
        </div>
      </div>

      {/* Target Category Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {config.groups.map((group) => {
          const itemsInGroup = placedItems[group.id] || [];

          return (
            <div
              key={group.id}
              onClick={() => selectedItem && handlePlaceInGroup(group.id)}
              className={cn(
                "rounded-2xl p-3 border-2 transition-all flex flex-col min-h-[220px]",
                group.badgeBg,
                group.badgeBorder,
                selectedItem && !isSubmitted ? "hover:border-purple-500 hover:shadow-lg cursor-pointer scale-[1.01]" : ""
              )}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-800/60">
                <div>
                  <h4 className={cn("font-black text-sm", group.badgeText)}>{group.label}</h4>
                  {group.subtitle && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{group.subtitle}</p>
                  )}
                </div>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  {itemsInGroup.length} db
                </span>
              </div>

              {/* Items in this group */}
              <div className="flex-1 space-y-2">
                {itemsInGroup.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center p-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-400">
                    {selectedItem ? 'Kattints ide a lehelyezéshez' : 'Húzd ide vagy kattints a kijelölt elemre'}
                  </div>
                ) : (
                  itemsInGroup.map((item) => {
                    const isCorrect = item.correctTargetId === group.id;

                    return (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveItem(item, group.id);
                        }}
                        className={cn(
                          "p-2.5 rounded-xl border text-xs sm:text-sm font-mono font-bold flex items-center justify-between gap-2 shadow-xs transition-all",
                          isSubmitted
                            ? isCorrect
                              ? "bg-emerald-100/90 dark:bg-emerald-950/80 border-emerald-400 text-emerald-900 dark:text-emerald-100"
                              : "bg-rose-100/90 dark:bg-rose-950/80 border-rose-400 text-rose-900 dark:text-rose-100"
                            : "bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-750 text-slate-900 dark:text-slate-100 hover:border-rose-400 cursor-pointer"
                        )}
                        title={isSubmitted && item.explanation ? item.explanation : 'Kattints a visszavonáshoz'}
                      >
                        <span className="truncate">{item.expression}</span>
                        {isSubmitted ? (
                          isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                          )
                        ) : (
                          <span className="text-[10px] text-slate-400 hover:text-rose-500 font-sans shrink-0">✕</span>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Items Pool */}
      {!isSubmitted && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Besorolandó kifejezések ({poolItems.length} maradt):
            </span>
            <span className="text-[11px] text-slate-500 italic">
              Kattints egy kifejezésre, majd a célcsoportra!
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {poolItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all border shadow-xs cursor-pointer",
                    isSelected
                      ? "bg-purple-600 text-white border-purple-600 scale-105 ring-2 ring-purple-400/50 shadow-md"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-purple-300 dark:hover:border-purple-600 hover:scale-[1.02]"
                  )}
                >
                  {item.expression}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              onClick={handleCheckAnswers}
              disabled={!allPlaced}
              className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              <Send className="w-4 h-4 mr-1.5" />
              Ellenőrzés
            </Button>
          </div>
        </div>
      )}

      {/* Result Banner after submit */}
      {isSubmitted && (
        <div className="p-5 sm:p-6 bg-gradient-to-br from-purple-50 via-indigo-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-3xl border-2 border-purple-300 dark:border-purple-800 shadow-xl animate-in zoom-in-95 duration-200 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              {correctCount === totalItems
                ? 'Kiváló munka! Minden elemet helyesen csoportosítottál! 🌟'
                : `Ügyes próbálkozás! ${correctCount} / ${totalItems} helyes.`}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 mt-1">
              Idő: <strong className="text-slate-900 dark:text-white">{formatTime(timer)}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestart}
              className="rounded-xl border-slate-300 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Újrajátszás
            </Button>

            {level < 3 && onNextLevel && (
              <Button
                size="sm"
                onClick={onNextLevel}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
              >
                Következő szint ({level + 1}) <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
