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
  ArrowLeft,
  Sparkles,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './QuizTemplate';
import { useAuth } from '@/contexts/AuthContext';
import { saveQuizProgress } from '@/services/quizProgressService';
import { MathText } from '@/components/math/shared/MathText';

export interface SorterItem {
  id: string | number;
  label?: string;
  text?: string;
  content?: string;
  category?: string;
  categoryId?: string;
  [key: string]: any;
}

export interface SorterCategory {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  color?: string;
  badgeColor?: string;
  [key: string]: any;
}

export interface SorterLevelConfig {
  level?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  categories: SorterCategory[];
  items: SorterItem[];
  [key: string]: any;
}

export interface SorterTemplateProps {
  level?: DifficultyLevel;
  grade?: number;
  chapterId?: string;
  topicId?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  levels?: Record<DifficultyLevel, SorterLevelConfig>;
  config?: SorterLevelConfig;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  category?: string;
  [key: string]: any;
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
  level = 1,
  grade = 6,
  chapterId = 'g6-fractions',
  topicId,
  title = 'Csoportosító (Húzd / Kattints a helyére)',
  subtitle = 'Válaszd ki a kártyát, majd kattints a megfelelő kategóriára!',
  badge,
  levels,
  levelsConfig,
  config,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  ...rest
}: SorterTemplateProps) {
  const { user, profile } = useAuth();
  const [unassignedItems, setUnassignedItems] = useState<SorterItem[]>([]);
  const [categorizedItems, setCategorizedItems] = useState<Record<string, SorterItem[]>>({});
  const [selectedItem, setSelectedItem] = useState<SorterItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    isChecked: boolean;
    isAllCorrect: boolean;
    mistakesCount: number;
    wrongItemIds: (string | number)[];
  }>({
    isChecked: false,
    isAllCorrect: false,
    mistakesCount: 0,
    wrongItemIds: []
  });

  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const activeLevel: DifficultyLevel = safeLevel || (config?.level as DifficultyLevel) || 1;
  const allLevels = levels || levelsConfig;
  const currentConfig = config || allLevels?.[activeLevel];

  const getItemLabel = (item?: SorterItem | null) => {
    if (!item) return '';
    return item.label ?? item.text ?? item.content ?? '';
  };

  const getCategoryName = (cat: SorterCategory) => {
    return cat.name ?? cat.title ?? '';
  };

  const getCategoryBadgeColor = (cat: SorterCategory) => {
    if (cat.badgeColor) return cat.badgeColor;
    if (cat.color) {
      return `bg-${cat.color}-100 text-${cat.color}-800 border-${cat.color}-300 dark:bg-${cat.color}-950 dark:text-${cat.color}-300`;
    }
    return 'bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300';
  };

  const initGame = () => {
    const activeConf = config || levels?.[activeLevel];
    if (!activeConf) return;

    setUnassignedItems(shuffleArray(activeConf.items || []));
    const initialBuckets: Record<string, SorterItem[]> = {};
    (activeConf.categories || []).forEach((cat) => {
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
  }, [level, levels, config]);

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
    const wrongIds: (string | number)[] = [];

    Object.keys(categorizedItems).forEach((catKey) => {
      const itemsInCat = categorizedItems[catKey] || [];
      itemsInCat.forEach((item) => {
        const itemCat = item.category ?? item.categoryId;
        if (itemCat !== catKey) {
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

      if (user) {
        const totalItemsCount = (currentConfig?.items?.length) || 10;

        saveQuizProgress({
          userId: user.uid,
          studentName: profile?.full_name || user.displayName || 'Diák',
          studentEmail: profile?.email || user.email || '',
          userCode: profile?.user_code || '',
          grade: grade || 6,
          chapterId: chapterId || 'g6-fractions',
          topicId: topicId || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          topicTitle: title,
          gameType: 'sorter',
          level: activeLevel || 1,
          percentage: 100,
          scorePoints: totalItemsCount,
          totalQuestions: totalItemsCount
        });
      }
    }
  };

  const displayTitle = config?.title || title;
  const displaySubtitle = config?.description || subtitle;
  const allPlaced = unassignedItems.length === 0;

  if (!currentConfig) return null;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {onBack ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="rounded-xl h-9 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />
              Vissza
            </Button>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          )}
          <div>
            {badge && (
              <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
                {badge}
              </div>
            )}
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              <MathText>{displayTitle}</MathText> {levels ? `(${activeLevel}. szint)` : ''}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <MathText>{displaySubtitle}</MathText>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
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

          {onSwitchToTheory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSwitchToTheory}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Tananyag
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
              <span className="text-amber-600 dark:text-amber-400 animate-pulse">
                Kiválasztva: <strong><MathText size="md">{getItemLabel(selectedItem)}</MathText></strong> (most kattints a kívánt csoportra!)
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {unassignedItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const labelText = getItemLabel(item);
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={cn(
                    'px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all border-2 shadow-xs flex items-center justify-center min-h-[38px]',
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-700 shadow-md scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-amber-400 hover:bg-amber-50/50'
                  )}
                >
                  <MathText size="md">{labelText}</MathText>
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
          const categoryName = getCategoryName(cat);
          const badgeColorClass = getCategoryBadgeColor(cat);

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
                  ? 'border-amber-400 dark:border-amber-500 bg-amber-50/20 dark:bg-amber-950/20 cursor-pointer hover:bg-amber-50/40'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs'
              )}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={cn(
                    'px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border',
                    badgeColorClass
                  )}>
                    <MathText size="sm">{categoryName}</MathText>
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {itemsInCat.length} elem
                  </span>
                </div>

                {/* Items in Category */}
                <div className="flex flex-wrap gap-1.5 min-h-[70px] p-2 rounded-xl bg-slate-50/80 dark:bg-slate-855/60 border border-slate-100 dark:border-slate-800/80">
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
                      const itemText = getItemLabel(item);

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
                          <MathText size="sm">{itemText}</MathText>
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
                  className="w-full mt-3 h-8 rounded-xl font-bold text-xs bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center gap-1"
                >
                  <span>Ide helyezem:</span> <MathText size="sm">{getItemLabel(selectedItem)}</MathText>
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
              className="w-full sm:w-auto h-10 px-6 rounded-xl font-bold text-xs sm:text-sm bg-amber-600 hover:bg-amber-700 text-white shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Csoportosítás Ellenőrzése
            </Button>
          ) : (
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mr-1">
                🎉 Hibátlan csoportosítás!
              </span>
              {activeLevel < 3 && onNextLevel && (
                <Button
                  onClick={onNextLevel}
                  className="h-10 px-5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  Következő szint ({activeLevel + 1}. szint)
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              )}
              {onSwitchToTheory && (
                <Button
                  variant="ghost"
                  onClick={onSwitchToTheory}
                  className="h-10 px-4 rounded-xl font-bold text-xs sm:text-sm text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                >
                  <BookOpen className="w-4 h-4 mr-1.5" />
                  Vissza a tananyaghoz
                </Button>
              )}
              {onBack && (
                <Button
                  variant="ghost"
                  onClick={onBack}
                  className="h-10 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-1.5" />
                  Vissza a témakörökhöz
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SorterTemplate;
