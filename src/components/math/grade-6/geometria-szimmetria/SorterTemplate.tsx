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
  Layers,
  HelpCircle
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
  figure?: React.ReactNode;
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
  levelsConfig?: Record<DifficultyLevel, SorterLevelConfig>;
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
  chapterId = 'g6-geometry',
  topicId,
  title = 'Csoportosító Játék',
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
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel>(safeLevel || (config?.level as DifficultyLevel) || 1);

  useEffect(() => {
    if (level) {
      const sLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
      setActiveLevel(sLevel);
    }
  }, [level]);

  const allLevels = levels || levelsConfig;
  const currentConfig = config || allLevels?.[activeLevel];

  const getItemLabel = (item?: SorterItem | null) => {
    if (!item) return '';
    return item.label ?? item.text ?? item.content ?? '';
  };

  const getCategoryName = (cat: SorterCategory) => {
    return cat.name ?? cat.title ?? '';
  };

  const initGame = () => {
    const activeConf = config || allLevels?.[activeLevel];
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
  }, [activeLevel, levels, levelsConfig, config]);

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
        const totalItemsCount = currentConfig?.items?.length || 10;

        saveQuizProgress({
          userId: user.uid,
          studentName: profile?.full_name || user.displayName || 'Diák',
          studentEmail: profile?.email || user.email || '',
          userCode: profile?.user_code || '',
          grade: grade || 6,
          chapterId: chapterId || 'g6-geometry',
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

  const handleNextLevel = () => {
    if (allLevels && activeLevel < 3 && allLevels[(activeLevel + 1) as DifficultyLevel]) {
      setActiveLevel((prev) => (prev + 1) as DifficultyLevel);
    } else if (onNextLevel) {
      onNextLevel();
    }
  };

  const displayTitle = config?.title || allLevels?.[activeLevel]?.title || title;
  const displaySubtitle = config?.description || allLevels?.[activeLevel]?.description || subtitle;
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
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          )}
          <div>
            {badge && (
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {badge}
              </div>
            )}
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              <MathText>{displayTitle}</MathText> {allLevels ? `(${activeLevel}. szint)` : ''}
            </div>
          </div>
        </div>

        {/* Action Tabs & Nav buttons */}
        <div className="flex items-center gap-2">
          {onSwitchToTheory && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToTheory}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Tananyag
            </Button>
          )}

          {onSwitchToQuiz && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToQuiz}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-slate-200 dark:border-slate-700"
            >
              Kvíz mód
            </Button>
          )}

          {onSwitchToMatcher && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToMatcher}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-slate-200 dark:border-slate-700"
            >
              Párosító
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={initGame}
            className="rounded-xl h-8 px-2.5 text-xs font-bold border-slate-200 dark:border-slate-700"
            title="Újrakezdés"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-xs font-medium text-slate-600 dark:text-slate-400 px-1">
        {displaySubtitle}
      </div>

      {/* Unassigned Items Pool - Optimized Grid Layout */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200/80 dark:border-slate-800 space-y-3 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
            Besorolásra váró kártyák ({unassignedItems.length} db)
          </span>
          {selectedItem && (
            <span className="animate-pulse font-extrabold text-xs flex items-center gap-1 text-purple-600 dark:text-purple-400">
              👉 Kattints a kívánt kategória dobozára!
            </span>
          )}
        </div>

        {unassignedItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3 p-3 bg-slate-50/70 dark:bg-slate-850/60 rounded-xl border border-dashed border-slate-200 dark:border-slate-700/80">
            {unassignedItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectItem(item)}
                  className={cn(
                    'min-h-[76px] sm:min-h-[86px] p-2 sm:p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center cursor-pointer select-none',
                    isSelected
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/50 text-purple-950 dark:text-purple-100 ring-2 ring-purple-500/40 shadow-sm scale-[1.02]'
                      : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:border-purple-300 dark:hover:border-purple-600 text-slate-800 dark:text-slate-200 shadow-2xs hover:shadow-xs'
                  )}
                >
                  {item.figure && (
                    <div className="w-full flex items-center justify-center pointer-events-none mb-1 shrink-0 max-h-12 overflow-hidden">
                      {item.figure}
                    </div>
                  )}
                  <div className="text-xs sm:text-[13px] font-bold leading-tight line-clamp-2">
                    <MathText>{getItemLabel(item)}</MathText>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="w-full text-center text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 py-4 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
            ✨ Minden kártyát elhelyeztél! Kattints az ellenőrzésre!
          </div>
        )}
      </div>

      {/* Categories Drop Target Buckets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        {(currentConfig.categories || []).map((cat) => {
          const itemsInThisCat = categorizedItems[cat.id] || [];

          return (
            <div
              key={cat.id}
              onClick={() => selectedItem && handleAssignToCategory(cat.id)}
              className={cn(
                'p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[170px] shadow-sm',
                selectedItem
                  ? 'border-purple-400 dark:border-purple-600 bg-purple-50/20 dark:bg-purple-950/20 hover:bg-purple-50/50 cursor-pointer'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
              )}
            >
              <div className="space-y-1 pb-2.5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                    <MathText>{getCategoryName(cat)}</MathText>
                  </h4>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {itemsInThisCat.length} db
                  </span>
                </div>
                {cat.description && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    <MathText>{cat.description}</MathText>
                  </p>
                )}
              </div>

              {/* Placed items list */}
              <div className="flex flex-wrap gap-2 py-3 flex-1 items-start content-start">
                {itemsInThisCat.map((item) => {
                  const isWrong =
                    validationResult.isChecked &&
                    validationResult.wrongItemIds.includes(item.id);
                  const isCorrect =
                    validationResult.isChecked &&
                    !validationResult.wrongItemIds.includes(item.id);

                  let itemBadgeStyle =
                    'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 hover:border-red-300';

                  if (isCorrect) {
                    itemBadgeStyle =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold';
                  } else if (isWrong) {
                    itemBadgeStyle =
                      'border-rose-500 bg-rose-50 dark:bg-rose-950 text-rose-900 dark:text-rose-200 font-bold animate-pulse';
                  }

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleReturnToUnassigned(item);
                      }}
                      title="Kattints a visszatevéshez"
                      className={cn(
                        'px-2.5 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all flex items-center gap-1.5 cursor-pointer hover:opacity-85 shadow-2xs',
                        itemBadgeStyle
                      )}
                    >
                      {item.figure && (
                        <div className="w-5 h-4 flex items-center justify-center shrink-0 pointer-events-none scale-90">
                          {item.figure}
                        </div>
                      )}
                      <span><MathText>{getItemLabel(item)}</MathText></span>
                      {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      {isWrong && <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {selectedItem && (
                <div className="text-xs text-center font-bold py-1.5 rounded-xl border border-dashed border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60">
                  + Ide helyezés
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation Result Box & Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          {validationResult.isChecked && (
            <div className="text-xs sm:text-sm font-bold">
              {validationResult.isAllCorrect ? (
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-5 h-5" /> Gratulálunk! Hibátlan csoportosítás!
                </span>
              ) : (
                <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-5 h-5" /> {validationResult.mistakesCount} kártya rossz helyre került! Kattints rájuk a visszatevéshez!
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!validationResult.isAllCorrect ? (
            <Button
              onClick={handleCheck}
              disabled={!allPlaced}
              className="rounded-xl h-10 px-5 font-bold shadow-sm bg-purple-600 hover:bg-purple-700 text-white"
            >
              Csoportosítás ellenőrzése
            </Button>
          ) : (
            <>
              {((allLevels && activeLevel < 3 && allLevels[(activeLevel + 1) as DifficultyLevel]) || onNextLevel) && (
                <Button
                  onClick={handleNextLevel}
                  className="rounded-xl h-10 px-5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold shadow-sm"
                >
                  Következő szint <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              )}
              {onSwitchToQuiz && (
                <Button
                  variant="outline"
                  onClick={onSwitchToQuiz}
                  className="rounded-xl h-10 px-4 font-bold"
                >
                  Vissza a kvízhez
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
