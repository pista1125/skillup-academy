import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  ArrowRightLeft,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './NegativeNumbersQuiz';

interface SorterItem {
  id: string;
  label: string;
  category: string;
}

interface SorterCategory {
  id: string;
  name: string;
  badgeColor: string;
}

interface SorterLevelConfig {
  categories: SorterCategory[];
  items: SorterItem[];
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      { id: 'neg', name: 'Negatív számok (< 0)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300' },
      { id: 'zero', name: 'Nulla (= 0, origó)', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200' },
      { id: 'pos', name: 'Pozitív számok (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' }
    ],
    items: [
      { id: 's1-1', label: '-8', category: 'neg' },
      { id: 's1-2', label: '+15', category: 'pos' },
      { id: 's1-3', label: '-24', category: 'neg' },
      { id: 's1-4', label: '0', category: 'zero' },
      { id: 's1-5', label: '+100', category: 'pos' },
      { id: 's1-6', label: '-3', category: 'neg' },
      { id: 's1-7', label: '+7', category: 'pos' },
      { id: 's1-8', label: '-1', category: 'neg' },
      { id: 's1-9', label: '0 Ft', category: 'zero' },
      { id: 's1-10', label: '+45', category: 'pos' }
    ]
  },
  2: {
    categories: [
      { id: 'neg', name: 'Fagy / Mélység / Tartozás (-)', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300' },
      { id: 'zero', name: 'Semleges / Alappont (0)', badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200' },
      { id: 'pos', name: 'Meleg / Magasság / Megtakarítás (+)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' }
    ],
    items: [
      { id: 's2-1', label: '12 °C fagy', category: 'neg' },
      { id: 's2-2', label: '4. emelet', category: 'pos' },
      { id: 's2-3', label: '3 000 Ft adósság', category: 'neg' },
      { id: 's2-4', label: 'Tengerszint (0 m)', category: 'zero' },
      { id: 's2-5', label: '28 méterrel a tengerszint alatt', category: 'neg' },
      { id: 's2-6', label: 'Víz fagyáspontja', category: 'zero' },
      { id: 's2-7', label: '20 000 Ft megtakarítás', category: 'pos' },
      { id: 's2-8', label: '2. mélygarázs szint', category: 'neg' },
      { id: 's2-9', label: '25 °C nyári meleg', category: 'pos' },
      { id: 's2-10', label: 'Földszint a liftben', category: 'zero' }
    ]
  },
  3: {
    categories: [
      { id: 'deep_neg', name: 'Kisebb, mint -5 (< -5)', badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300' },
      { id: 'mid_neg', name: '-5 és 0 közé esik', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300' },
      { id: 'pos', name: 'Nagyobb, mint 0 (> 0)', badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300' }
    ],
    items: [
      { id: 's3-1', label: '-12', category: 'deep_neg' },
      { id: 's3-2', label: '-3', category: 'mid_neg' },
      { id: 's3-3', label: '+8', category: 'pos' },
      { id: 's3-4', label: '-20', category: 'deep_neg' },
      { id: 's3-5', label: '-1', category: 'mid_neg' },
      { id: 's3-6', label: '+1', category: 'pos' },
      { id: 's3-7', label: '-50', category: 'deep_neg' },
      { id: 's3-8', label: '-4', category: 'mid_neg' },
      { id: 's3-9', label: '+100', category: 'pos' },
      { id: 's3-10', label: '-2', category: 'mid_neg' }
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

interface NegativeNumbersSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function NegativeNumbersSorter({
  level,
  onNextLevel,
  onOpenRules
}: NegativeNumbersSorterProps) {
  const [unassignedItems, setUnassignedItems] = useState<SorterItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<SorterItem | null>(null);
  const [groupedItems, setGroupedItems] = useState<Record<string, SorterItem[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const levelConfig = SORTER_LEVELS[level];

  const initGame = () => {
    const initialGroups: Record<string, SorterItem[]> = {};
    levelConfig.categories.forEach((cat) => {
      initialGroups[cat.id] = [];
    });

    setGroupedItems(initialGroups);
    setUnassignedItems(shuffleArray(levelConfig.items));
    setSelectedItem(null);
    setIsCompleted(false);
    setMistakes(0);
  };

  useEffect(() => {
    initGame();
  }, [level]);

  const handleSelectItem = (item: SorterItem) => {
    setSelectedItem(item);
  };

  const handleAssignToCategory = (catId: string) => {
    if (!selectedItem) return;

    if (selectedItem.category === catId) {
      // Correct placement
      setGroupedItems((prev) => ({
        ...prev,
        [catId]: [...prev[catId], selectedItem]
      }));

      const remaining = unassignedItems.filter((it) => it.id !== selectedItem.id);
      setUnassignedItems(remaining);
      setSelectedItem(null);

      if (remaining.length === 0) {
        setIsCompleted(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      // Wrong placement
      setMistakes((prev) => prev + 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-md text-center space-y-5 animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-500/30">
          <Trophy className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Minden elemet a helyére csoportosítottál! 🎉
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Hibátlanul felismerted a negatív és pozitív kategóriákat!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {onNextLevel && (
            <Button
              onClick={onNextLevel}
              className="h-10 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-bold"
            >
              Következő szint
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          )}

          <Button
            variant="outline"
            onClick={initGame}
            className="h-10 px-4 rounded-xl border-slate-200 dark:border-slate-700 text-xs font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Újrakezdés
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top instruction bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white dark:bg-slate-900 p-3 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-cyan-500" />
          <span>Válassz ki egy elemet alulról, majd kattints a megfelelő célcsoportra!</span>
        </div>

        <div className="flex items-center gap-2">
          {onOpenRules && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenRules}
              className="h-7 px-2 text-xs text-cyan-700 dark:text-cyan-300"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Segédlet
            </Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={initGame}
            className="h-7 px-2 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Visszaállítás
          </Button>
        </div>
      </div>

      {/* Categories Drop Zones (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {levelConfig.categories.map((cat) => {
          const itemsInCat = groupedItems[cat.id] || [];

          return (
            <div
              key={cat.id}
              onClick={() => handleAssignToCategory(cat.id)}
              className={cn(
                "min-h-48 rounded-2xl border-2 p-3 flex flex-col transition-all cursor-pointer",
                selectedItem
                  ? "border-cyan-400 dark:border-cyan-600 bg-cyan-50/20 hover:bg-cyan-50/50 shadow-md"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              )}
            >
              <div className={cn("px-2.5 py-1.5 rounded-xl border text-xs font-black text-center mb-2.5 shadow-xs", cat.badgeColor)}>
                {cat.name}
              </div>

              {/* Items placed in this category */}
              <div className="flex-1 flex flex-wrap gap-1.5 content-start">
                {itemsInCat.map((item) => (
                  <span
                    key={item.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shadow-xs"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {item.label}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Available Items Pool */}
      <div className="bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800">
        <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
          Besorolandó elemek ({unassignedItems.length} maradt):
        </div>

        <div className="flex flex-wrap gap-2">
          {unassignedItems.map((item) => {
            const isSelected = selectedItem?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleSelectItem(item)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all shadow-xs border-2",
                  isSelected
                    ? "bg-cyan-600 border-cyan-700 text-white scale-105 shadow-md ring-2 ring-cyan-400"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:border-cyan-400 hover:bg-cyan-50/40"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
