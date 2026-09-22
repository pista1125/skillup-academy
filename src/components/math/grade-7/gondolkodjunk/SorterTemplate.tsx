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
  ArrowLeft,
  ArrowRightLeft,
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
  correctCategory?: string;
  correctCategoryId?: string;
  [key: string]: any;
}

export interface SorterCategory {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  color?: string;
  badgeColor?: string;
  emoji?: string;
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
  topicTitle?: string;
  levels?: Record<DifficultyLevel, SorterLevelConfig>;
  levelsConfig?: Record<DifficultyLevel, SorterLevelConfig>;
  config?: SorterLevelConfig;
  categories?: SorterCategory[];
  items?: SorterItem[];
  level1Categories?: SorterCategory[];
  level1Items?: SorterItem[];
  level2Categories?: SorterCategory[];
  level2Items?: SorterItem[];
  level3Categories?: SorterCategory[];
  level3Items?: SorterItem[];
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
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
  grade = 7,
  chapterId = 'gondolkodjunk',
  topicId,
  title = 'Csoportosító Játék',
  subtitle = 'Válaszd ki a kártyát, majd kattints a megfelelő kategóriára!',
  badge,
  topicTitle,
  levels,
  levelsConfig,
  config,
  categories,
  items,
  level1Categories,
  level1Items,
  level2Categories,
  level2Items,
  level3Categories,
  level3Items,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory
}: SorterTemplateProps) {
  const { user, profile } = useAuth();
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel>(level);

  const allLevels = levels || levelsConfig;

  // Active configuration resolver
  const currentConfig = (() => {
    if (config) return config;
    if (allLevels && allLevels[activeLevel]) return allLevels[activeLevel];

    if (activeLevel === 1 && (level1Categories || level1Items)) {
      return {
        categories: level1Categories || categories || [],
        items: level1Items || items || []
      };
    }
    if (activeLevel === 2 && (level2Categories || level2Items)) {
      return {
        categories: level2Categories || categories || [],
        items: level2Items || items || []
      };
    }
    if (activeLevel === 3 && (level3Categories || level3Items)) {
      return {
        categories: level3Categories || categories || [],
        items: level3Items || items || []
      };
    }

    return {
      categories: categories || [],
      items: items || []
    };
  })();

  const [unassignedItems, setUnassignedItems] = useState<SorterItem[]>([]);
  const [categorizedItems, setCategorizedItems] = useState<Record<string, SorterItem[]>>({});
  const [selectedItem, setSelectedItem] = useState<SorterItem | null>(null);
  const [validationResult, setValidationResult] = useState<{
    isChecked: boolean;
    isCorrect: boolean;
    score: number;
    wrongItemIds: (string | number)[];
  }>({
    isChecked: false,
    isCorrect: false,
    score: 0,
    wrongItemIds: []
  });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    setActiveLevel(level);
  }, [level]);

  const initGame = () => {
    const rawItems = currentConfig.items || [];
    setUnassignedItems(shuffleArray([...rawItems]));

    const initialMap: Record<string, SorterItem[]> = {};
    (currentConfig.categories || []).forEach((c) => {
      initialMap[c.id] = [];
    });
    setCategorizedItems(initialMap);

    setSelectedItem(null);
    setValidationResult({
      isChecked: false,
      isCorrect: false,
      score: 0,
      wrongItemIds: []
    });
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, [activeLevel, config, levels, levelsConfig, categories, items, level1Categories, level1Items, level2Categories, level2Items, level3Categories, level3Items]);

  const handleSelectItem = (item: SorterItem) => {
    if (validationResult.isChecked) {
      setValidationResult((prev) => ({ ...prev, isChecked: false, wrongItemIds: [] }));
    }
    if (selectedItem?.id === item.id) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  const handleAssignToCategory = (targetCatId: string) => {
    if (!selectedItem) return;

    // Remove from unassigned
    setUnassignedItems((prev) => prev.filter((i) => i.id !== selectedItem.id));

    // Remove from any other categories if already assigned
    const newMap: Record<string, SorterItem[]> = {};
    Object.keys(categorizedItems).forEach((catId) => {
      newMap[catId] = categorizedItems[catId].filter((i) => i.id !== selectedItem.id);
    });

    // Add to target category
    newMap[targetCatId] = [...(newMap[targetCatId] || []), selectedItem];

    setCategorizedItems(newMap);
    setSelectedItem(null);
  };

  const handleReturnToUnassigned = (item: SorterItem) => {
    const newMap: Record<string, SorterItem[]> = {};
    Object.keys(categorizedItems).forEach((catId) => {
      newMap[catId] = categorizedItems[catId].filter((i) => i.id !== item.id);
    });
    setCategorizedItems(newMap);
    setUnassignedItems((prev) => [...prev, item]);

    if (validationResult.isChecked) {
      setValidationResult((prev) => ({ ...prev, isChecked: false, wrongItemIds: [] }));
    }
  };

  const handleCheckAnswers = () => {
    const totalItems = currentConfig.items?.length || 0;
    let correctCount = 0;
    const wrongIds: (string | number)[] = [];

    Object.entries(categorizedItems).forEach(([catId, assignedList]) => {
      assignedList.forEach((item) => {
        const correctTarget = item.correctCategoryId || item.categoryId || item.correctCategory || item.category;
        if (correctTarget === catId) {
          correctCount++;
        } else {
          wrongIds.push(item.id);
        }
      });
    });

    const isAllCorrect = correctCount === totalItems && unassignedItems.length === 0;

    setValidationResult({
      isChecked: true,
      isCorrect: isAllCorrect,
      score: correctCount,
      wrongItemIds: wrongIds
    });

    if (isAllCorrect) {
      setIsCompleted(true);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });

      if (user) {
        saveQuizProgress({
          userId: user.uid,
          studentName: profile?.full_name || user.displayName || 'Diák',
          studentEmail: profile?.email || user.email || '',
          userCode: profile?.user_code || '',
          grade: grade || 7,
          chapterId: chapterId || 'gondolkodjunk',
          topicId: topicId || (title || 'sorter').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          topicTitle: topicTitle || title,
          gameType: 'sorter',
          level: activeLevel || 1,
          percentage: 100,
          scorePoints: totalItems,
          totalQuestions: totalItems
        }).catch(err => console.error(err));
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

  const getItemLabel = (item: SorterItem) => {
    return item.text || item.label || item.content || '';
  };

  const getCategoryName = (cat: SorterCategory) => {
    return cat.title || cat.name || cat.id;
  };

  const totalItemsCount = currentConfig.items?.length || 0;
  const displayTitle = currentConfig.title || title;
  const displaySubtitle = currentConfig.subtitle || currentConfig.description || subtitle;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Header Card */}
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
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
          )}
          <div>
            {badge && (
              <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                {badge}
              </div>
            )}
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              <MathText>{displayTitle}</MathText> {allLevels ? `(${activeLevel}. szint)` : ''}
            </div>
            {displaySubtitle && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <MathText>{displaySubtitle}</MathText>
              </div>
            )}
          </div>
        </div>

        {/* Stats & Actions */}
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

          {onSwitchToTheory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSwitchToTheory}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Tananyag
            </Button>
          )}
        </div>
      </div>

      {/* Subtitle & Instructions */}
      <div className="p-3 bg-purple-50/60 dark:bg-purple-950/30 rounded-xl border border-purple-200/80 dark:border-purple-900/40 flex items-center justify-between text-xs text-purple-900 dark:text-purple-200 font-medium">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-purple-600 shrink-0" />
          <span>{displaySubtitle}</span>
        </div>
        <span className="font-bold text-[11px] shrink-0">
          Maradt: {unassignedItems.length} / {totalItemsCount}
        </span>
      </div>

      {/* Unassigned Items Pool */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
          <span>Kiosztandó elemek (Kattints a kiválasztáshoz):</span>
          {selectedItem && (
            <span className="text-purple-600 dark:text-purple-400 animate-pulse font-bold">
              👉 Most kattints a célkategória dobozára!
            </span>
          )}
        </div>

        {unassignedItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
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
                      <span className="text-[10px] text-slate-400 ml-0.5">✕</span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 text-[10px] text-slate-400 text-center border-t border-slate-100 dark:border-slate-800">
                {selectedItem ? 'Kattints ide a lehelyezéshez' : 'Kattints egy elemre a visszavonáshoz'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation Banner / Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          {validationResult.isChecked ? (
            validationResult.isCorrect ? (
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-black text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Minden elem a helyén van! Tökéletes munka! 🌟</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <XCircle className="w-5 h-5" />
                <span>
                  {validationResult.score} / {totalItemsCount} helyes! A pirossal jelölteket tedd át a megfelelő kategóriába!
                </span>
              </div>
            )
          ) : (
            <div className="text-xs text-slate-500 font-medium">
              Helyezz el minden kártyát, majd kattints az Ellenőrzés gombra!
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {!isCompleted ? (
            <Button
              onClick={handleCheckAnswers}
              disabled={unassignedItems.length > 0}
              className="w-full sm:w-auto h-10 px-6 rounded-xl font-black text-sm bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20"
            >
              Ellenőrzés
            </Button>
          ) : (
            <>
              {allLevels && activeLevel < 3 && (
                <Button
                  onClick={handleNextLevel}
                  className="h-10 px-5 rounded-xl font-bold text-sm bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-1.5"
                >
                  Következő szint ({activeLevel + 1}. szint)
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
              {onSwitchToQuiz && (
                <Button
                  variant="outline"
                  onClick={onSwitchToQuiz}
                  className="h-10 px-5 rounded-xl font-bold text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Vissza a Kvízhez
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
