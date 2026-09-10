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
  Sparkles,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './QuizTemplate';

export interface SorterItem {
  id: string;
  label: string;
  category: string;
}

export interface SorterCategory {
  id: string;
  name: string;
  badgeColor?: string;
}

export interface SorterLevelConfig {
  categories: SorterCategory[];
  items: SorterItem[];
}

export interface SorterTemplateProps {
  level: DifficultyLevel;
  title?: string;
  subtitle?: string;
  levels: Record<DifficultyLevel, SorterLevelConfig>;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function SorterTemplate({
  level,
  title = 'Csoportosító (Húzd / Kattints a helyére)',
  subtitle = 'Válaszd ki a kártyát, majd kattints a megfelelő kategóriára!',
  levels,
  onNextLevel,
  onOpenRules
}: SorterTemplateProps) {
  const [unassignedItems, setUnassignedItems] = useState<SorterItem[]>([]);
  const [categorizedItems, setCategorizedItems] = useState<Record<string, SorterItem[]>>({});
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
    const config = levels[level];
    if (!config) return;

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
    updatedBuckets[categoryId] = [...(updatedBuckets[categoryId] || []), selectedItem];

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
      const itemsInCat = categorizedItems[catKey] || [];
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

  const currentConfig = levels[level];
  const allPlaced = unassignedItems.length === 0;

  if (!currentConfig) return null;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <ArrowRightLeft className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              {title} ({level}. szint)
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-purple-500" />
            <span>
              Még besorolandó: {unassignedItems.length} db
            </span>
          </div>

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

      {/* Unassigned Items Pool */}
      {unassignedItems.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
            <span>Kattints egy elemre a kiválasztáshoz:</span>
            {selectedItem && (
              <span className="text-purple-600 dark:text-purple-400 animate-pulse">
                Kiválasztva: <strong>{selectedItem.label}</strong> (most kattints a kívánt csoportra!)
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {unassignedItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all border-2 shadow-xs',
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-purple-400 hover:bg-purple-50/50'
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Drop Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {currentConfig.categories.map((cat) => {
          const itemsInCat = categorizedItems[cat.id] || [];

          return (
            <div
              key={cat.id}
              onClick={() => {
                if (selectedItem) {
                  handleAssignToCategory(cat.id);
                }
              }}
              className={cn(
                'rounded-2xl p-4 border-2 transition-all flex flex-col justify-between min-h-[200px]',
                selectedItem
                  ? 'border-purple-400 dark:border-purple-500 bg-purple-50/20 dark:bg-purple-950/20 cursor-pointer hover:bg-purple-50/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs'
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border',
                    cat.badgeColor || 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  )}>
                    {cat.name}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {itemsInCat.length} elem
                  </span>
                </div>

                {/* Items in Category */}
                <div className="flex flex-wrap gap-1.5 min-h-[70px] p-2 rounded-xl bg-slate-50/80 dark:bg-slate-850/60 border border-slate-100 dark:border-slate-800/80">
                  {itemsInCat.length === 0 ? (
                    <div className="w-full flex items-center justify-center text-[11px] text-slate-400 font-medium py-3">
                      {selectedItem ? 'Kattints ide a lehelyezéshez' : 'Üres kategória'}
                    </div>
                  ) : (
                    itemsInCat.map((item) => {
                      const isWrong =
                        validationResult.isChecked &&
                        validationResult.wrongItemIds.includes(item.id);
                      const isCorrect =
                        validationResult.isChecked && !isWrong;

                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReturnToUnassigned(item);
                          }}
                          className={cn(
                            'px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 border',
                            isCorrect
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-800 dark:text-emerald-300'
                              : isWrong
                              ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-800 dark:text-rose-300 animate-shake'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-300'
                          )}
                          title="Kattints ide a visszavonáshoz"
                        >
                          <span>{item.label}</span>
                          {isCorrect && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          )}
                          {isWrong && (
                            <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {selectedItem && (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAssignToCategory(cat.id);
                  }}
                  className="w-full mt-3 h-8 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Ide helyezem: {selectedItem.label}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* Check & Validation Banner */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {!allPlaced
            ? `Helyezz el még ${unassignedItems.length} elemet az ellenőrzéshez!`
            : 'Minden elem elhelyezve! Kattints az ellenőrzésre!'}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {!validationResult.isAllCorrect ? (
            <Button
              onClick={handleCheck}
              disabled={!allPlaced}
              className="w-full sm:w-auto h-10 px-6 rounded-xl font-bold text-xs sm:text-sm bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Csoportosítás Ellenőrzése
            </Button>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                🎉 Hibátlan csoportosítás!
              </span>
              {level < 3 && onNextLevel && (
                <Button
                  onClick={onNextLevel}
                  className="h-10 px-6 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  Következő szint ({level + 1}. szint)
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
