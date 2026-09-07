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
import { DifficultyLevel } from './IntegerAdditionSubtractionQuiz';

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
      {
        id: 'neg',
        name: 'Eredmény < 0 (Negatív)',
        badgeColor:
          'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300'
      },
      {
        id: 'zero',
        name: 'Eredmény = 0 (Nulla)',
        badgeColor:
          'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      },
      {
        id: 'pos',
        name: 'Eredmény > 0 (Pozitív)',
        badgeColor:
          'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '(-8) + (-2)', category: 'neg' },
      { id: 's1-2', label: '(+12) + (-5)', category: 'pos' },
      { id: 's1-3', label: '(-7) + (+7)', category: 'zero' },
      { id: 's1-4', label: '(-15) + (+20)', category: 'pos' },
      { id: 's1-5', label: '(-4) + (-6)', category: 'neg' },
      { id: 's1-6', label: '0 + 0', category: 'zero' },
      { id: 's1-7', label: '(+3) + (-10)', category: 'neg' },
      { id: 's1-8', label: '(+25) + (+5)', category: 'pos' },
      { id: 's1-9', label: '(-9) + (+9)', category: 'zero' },
      { id: 's1-10', label: '(-1) + (-1)', category: 'neg' }
    ]
  },
  2: {
    categories: [
      {
        id: 'small',
        name: 'Kisebb, mint -10 (< -10)',
        badgeColor:
          'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      },
      {
        id: 'mid',
        name: '-10 és +10 között',
        badgeColor:
          'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'large',
        name: 'Nagyobb, mint +10 (> +10)',
        badgeColor:
          'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '(-8) - (+15)', category: 'small' },
      { id: 's2-2', label: '15 - (-10)', category: 'large' },
      { id: 's2-3', label: '(-5) + (+8)', category: 'mid' },
      { id: 's2-4', label: '(-20) - (-5)', category: 'small' },
      { id: 's2-5', label: '30 - (+10)', category: 'large' },
      { id: 's2-6', label: '(-4) - (+3)', category: 'mid' },
      { id: 's2-7', label: '(-50) + (+45)', category: 'mid' },
      { id: 's2-8', label: '12 - (-8)', category: 'large' },
      { id: 's2-9', label: '(-7) - (+12)', category: 'small' },
      { id: 's2-10', label: '0 - (-6)', category: 'mid' }
    ]
  },
  3: {
    categories: [
      {
        id: 'sum',
        name: 'Egyszerűsítve: a + b',
        badgeColor:
          'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'diff',
        name: 'Egyszerűsítve: a - b',
        badgeColor:
          'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'neg_sum',
        name: 'Egyszerűsítve: -a - b',
        badgeColor:
          'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'a - (-b)', category: 'sum' },
      { id: 's3-2', label: 'a + (-b)', category: 'diff' },
      { id: 's3-3', label: '-a + (-b)', category: 'neg_sum' },
      { id: 's3-4', label: 'a - (+b)', category: 'diff' },
      { id: 's3-5', label: 'a + (+b)', category: 'sum' },
      { id: 's3-6', label: '-a - (+b)', category: 'neg_sum' },
      { id: 's3-7', label: '-(-a) - (-b)', category: 'sum' },
      { id: 's3-8', label: '-(-a) + (-b)', category: 'diff' },
      { id: 's3-9', label: '(-a) + (-b)', category: 'neg_sum' },
      { id: 's3-10', label: 'a - (-b) forma', category: 'sum' }
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

interface IntegerAdditionSubtractionSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function IntegerAdditionSubtractionSorter({
  level,
  onNextLevel,
  onOpenRules
}: IntegerAdditionSubtractionSorterProps) {
  const [unassignedItems, setUnassignedItems] = useState<SorterItem[]>([]);
  const [categorizedItems, setCategorizedItems] = useState<
    Record<string, SorterItem[]>
  >({});
  const [selectedItem, setSelectedItem] = useState<SorterItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    isChecked: boolean;
    isAllCorrect: boolean;
    mistakesCount: number;
    wrongItemIds: string[];
  }>({
    isChecked: false,
    isAllCorrect: false,
    mistakesCount: 0,
    wrongItemIds: []
  });

  const initGame = () => {
    const config = SORTER_LEVELS[level];
    setUnassignedItems(shuffleArray(config.items));
    const initialBuckets: Record<string, SorterItem[]> = {};
    config.categories.forEach((cat) => {
      initialBuckets[cat.id] = [];
    });
    setCategorizedItems(initialBuckets);
    setSelectedItem(null);
    setValidationResult({
      isChecked: false,
      isAllCorrect: false,
      mistakesCount: 0,
      wrongItemIds: []
    });
  };

  useEffect(() => {
    initGame();
  }, [level]);

  const handleSelectItem = (item: SorterItem) => {
    if (validationResult.isChecked && validationResult.isAllCorrect) return;
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const handleAssignToCategory = (categoryId: string) => {
    if (!selectedItem) return;

    // Remove from unassigned
    setUnassignedItems((prev) => prev.filter((it) => it.id !== selectedItem.id));

    // Remove from any bucket if it was already placed
    const updatedBuckets: Record<string, SorterItem[]> = {};
    Object.keys(categorizedItems).forEach((catKey) => {
      updatedBuckets[catKey] = categorizedItems[catKey].filter(
        (it) => it.id !== selectedItem.id
      );
    });

    // Add to target category
    updatedBuckets[categoryId] = [...updatedBuckets[categoryId], selectedItem];

    setCategorizedItems(updatedBuckets);
    setSelectedItem(null);

    // Reset check state on edit
    if (validationResult.isChecked) {
      setValidationResult({
        isChecked: false,
        isAllCorrect: false,
        mistakesCount: 0,
        wrongItemIds: []
      });
    }
  };

  const handleReturnToUnassigned = (item: SorterItem) => {
    if (validationResult.isChecked && validationResult.isAllCorrect) return;

    const updatedBuckets: Record<string, SorterItem[]> = {};
    Object.keys(categorizedItems).forEach((catKey) => {
      updatedBuckets[catKey] = categorizedItems[catKey].filter(
        (it) => it.id !== item.id
      );
    });

    setCategorizedItems(updatedBuckets);
    setUnassignedItems((prev) => [...prev, item]);
    setSelectedItem(null);

    if (validationResult.isChecked) {
      setValidationResult({
        isChecked: false,
        isAllCorrect: false,
        mistakesCount: 0,
        wrongItemIds: []
      });
    }
  };

  const handleCheck = () => {
    const wrongIds: string[] = [];

    Object.keys(categorizedItems).forEach((catKey) => {
      const itemsInCat = categorizedItems[catKey];
      itemsInCat.forEach((item) => {
        if (item.category !== catKey) {
          wrongIds.push(item.id);
        }
      });
    });

    const isAllPlaced = unassignedItems.length === 0;
    const isAllCorrect = isAllPlaced && wrongIds.length === 0;

    setValidationResult({
      isChecked: true,
      isAllCorrect,
      mistakesCount: wrongIds.length,
      wrongItemIds: wrongIds
    });

    if (isAllCorrect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const currentConfig = SORTER_LEVELS[level];
  const allPlaced = unassignedItems.length === 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Csoportosító ({level}. szint)
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300">
              Kattints egy kifejezésre, majd a megfelelő kategória dobozára!
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={initGame}
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Újrakezdés
          </Button>

          {onOpenRules && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenRules}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-slate-700 dark:text-slate-300"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Szabályzat
            </Button>
          )}
        </div>
      </div>

      {/* Unassigned Pool */}
      {unassignedItems.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Besorolandó kifejezések ({unassignedItems.length} maradt):
          </div>
          <div className="flex flex-wrap gap-2.5">
            {unassignedItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectItem(item)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 border-2 shadow-sm',
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-700 scale-105 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-blue-300 dark:hover:border-blue-600'
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Drop Zones */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentConfig.categories.map((category) => {
          const itemsInCat = categorizedItems[category.id] || [];

          return (
            <div
              key={category.id}
              onClick={() => {
                if (selectedItem) handleAssignToCategory(category.id);
              }}
              className={cn(
                'min-h-[220px] rounded-2xl p-4 border-2 transition-all flex flex-col justify-between',
                selectedItem
                  ? 'border-dashed border-blue-400 dark:border-blue-500 bg-blue-50/20 dark:bg-blue-950/10 cursor-pointer hover:bg-blue-50/40'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50'
              )}
            >
              <div>
                <div
                  className={cn(
                    'px-3 py-1.5 rounded-xl border text-xs font-extrabold text-center mb-3 shadow-xs',
                    category.badgeColor
                  )}
                >
                  {category.name} ({itemsInCat.length})
                </div>

                <div className="space-y-2">
                  {itemsInCat.map((item) => {
                    const isWrong =
                      validationResult.isChecked &&
                      validationResult.wrongItemIds.includes(item.id);
                    const isRight =
                      validationResult.isChecked &&
                      !validationResult.wrongItemIds.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReturnToUnassigned(item);
                        }}
                        className={cn(
                          'px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between border shadow-xs group cursor-pointer transition-all',
                          isRight &&
                            'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-800 dark:text-emerald-200',
                          isWrong &&
                            'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-800 dark:text-rose-200 animate-pulse',
                          !validationResult.isChecked &&
                            'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-300'
                        )}
                      >
                        <span>{item.label}</span>
                        {isRight && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        {isWrong && (
                          <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        )}
                        {!validationResult.isChecked && (
                          <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            ✕ kivétel
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {itemsInCat.length === 0 && (
                    <div className="text-center py-8 text-xs font-semibold text-slate-400 dark:text-slate-600 italic">
                      Húzd vagy kattints ide az elemek elhelyezéséhez!
                    </div>
                  )}
                </div>
              </div>

              {selectedItem && (
                <div className="mt-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-center text-xs font-bold text-blue-600 dark:text-blue-400">
                  + Kattints ide a kijelölt elem hozzáadásához!
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action / Feedback Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div>
          {validationResult.isChecked && (
            <div
              className={cn(
                'px-4 py-2 rounded-xl text-xs sm:text-sm font-bold inline-flex items-center gap-2 border',
                validationResult.isAllCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 text-emerald-800 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 text-rose-800 dark:text-rose-200'
              )}
            >
              {validationResult.isAllCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Tökéletes! Minden kifejezés a helyes kategóriába került!
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  Még van {validationResult.mistakesCount} hibás elem! Kattints a piros elemekre a visszavonáshoz.
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!validationResult.isAllCorrect ? (
            <Button
              onClick={handleCheck}
              disabled={!allPlaced}
              className="rounded-2xl h-10 px-6 font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Ellenőrzés
            </Button>
          ) : (
            level < 3 &&
            onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="rounded-2xl h-10 px-6 font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
              >
                Következő Szint ({level + 1}. szint)
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
