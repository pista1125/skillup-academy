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
  currentLevel?: DifficultyLevel;
  grade?: number;
  chapterId?: string;
  topicId?: string;
  topicTitle?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
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
  level,
  currentLevel,
  title = 'Egész számok és oszthatóság – Csoportosító',
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
  onSwitchToTheory,
  grade = 6,
  chapterId = 'egesz-szamok-oszthatosag',
  topicId
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

  const allLevels = levels || levelsConfig;
  const rawLvl = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  const activeLevel: DifficultyLevel = (typeof rawLvl === 'number' ? rawLvl : 1) as DifficultyLevel;

  // Normalize level configuration from any prop format
  const getLevelConfig = (): SorterLevelConfig => {
    if (config?.categories && config?.items) return config;
    if (allLevels && allLevels[activeLevel]) return allLevels[activeLevel];
    if (activeLevel === 1 && level1Categories && level1Items) {
      return { categories: level1Categories, items: level1Items };
    }
    if (activeLevel === 2 && level2Categories && level2Items) {
      return { categories: level2Categories, items: level2Items };
    }
    if (activeLevel === 3 && level3Categories && level3Items) {
      return { categories: level3Categories, items: level3Items };
    }
    if (categories && items) {
      return { categories, items };
    }
    if (level1Categories && level1Items) {
      return { categories: level1Categories, items: level1Items };
    }
    return { categories: [], items: [] };
  };

  const currentConfig = getLevelConfig();

  const initGame = () => {
    const activeCfg = getLevelConfig();
    if (!activeCfg || !activeCfg.categories) return;

    // Normalize item labels and categories
    const normalizedItems: SorterItem[] = (activeCfg.items || []).map((it) => ({
      ...it,
      id: it.id,
      label: it.label || it.content || it.text || '',
      category: it.category || it.categoryId || ''
    }));

    setUnassignedItems(shuffleArray(normalizedItems));
    const initialBuckets: Record<string, SorterItem[]> = {};
    activeCfg.categories.forEach((cat) => {
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
  }, [activeLevel, currentLevel, topicId, title]);

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

    // Add to new category bucket
    if (!updatedBuckets[categoryId]) updatedBuckets[categoryId] = [];
    updatedBuckets[categoryId].push(selectedItem);

    setCategorizedItems(updatedBuckets);
    setSelectedItem(null);

    // Reset validation state on change
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

    // Remove from buckets
    const updatedBuckets: Record<string, SorterItem[]> = {};
    Object.keys(categorizedItems).forEach((catKey) => {
      updatedBuckets[catKey] = categorizedItems[catKey].filter(
        (it) => it.id !== item.id
      );
    });
    setCategorizedItems(updatedBuckets);

    // Add back to unassigned
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

  const handleValidate = () => {
    let mistakes = 0;
    const wrongIds: (string | number)[] = [];

    Object.keys(categorizedItems).forEach((catKey) => {
      const itemsInCat = categorizedItems[catKey] || [];
      itemsInCat.forEach((it) => {
        const expectedCat = it.category || it.categoryId;
        if (expectedCat !== catKey) {
          mistakes++;
          wrongIds.push(it.id);
        }
      });
    });

    const isAllCorrect = mistakes === 0 && unassignedItems.length === 0;

    setValidationResult({
      isChecked: true,
      isAllCorrect,
      mistakesCount: mistakes,
      wrongItemIds: wrongIds
    });

    if (isAllCorrect) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      const computedTopicId = (topicId || badge || title || 'sorter').toLowerCase().replace(/[^a-z0-9-]+/g, '');
      const g = grade || 6;
      const ch = chapterId || 'egesz-szamok-oszthatosag';
      const displayTitle = topicTitle ? `${topicTitle} (Csoportosító)` : title;

      if (user) {
        const totalItemsCount = currentConfig.items?.length || 10;
        saveQuizProgress({
          userId: user.uid,
          studentName: profile?.full_name || user.displayName || 'Diák',
          studentEmail: profile?.email || user.email || '',
          userCode: profile?.user_code || '',
          grade: g,
          chapterId: ch,
          topicId: computedTopicId,
          topicTitle: topicTitle || title,
          quizId: `g${g}__${ch}__${computedTopicId}__sorter__lvl${activeLevel}`,
          gameType: 'sorter',
          level: activeLevel,
          title: displayTitle,
          percentage: 100,
          score: 100,
          scorePoints: totalItemsCount,
          totalQuestions: totalItemsCount,
          bestStreak: totalItemsCount,
          completed: true
        }).catch((err) => console.error('Failed to auto-save sorter progress:', err));
      }
    }
  };

  const allPlaced = unassignedItems.length === 0;
  const currentTitle = currentConfig?.title || title;
  const currentSubtitle = currentConfig?.description || currentConfig?.subtitle || subtitle;

  if (!currentConfig || !currentConfig.categories || currentConfig.categories.length === 0) return null;

  // Vibrant color themes for the category buckets
  const categoryThemes = [
    {
      border: 'border-emerald-300 dark:border-emerald-800',
      bg: 'bg-gradient-to-b from-emerald-50/60 via-white to-emerald-50/20 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-emerald-600 text-white shadow-2xs',
      dropZone: 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-900/60',
    },
    {
      border: 'border-teal-300 dark:border-teal-800',
      bg: 'bg-gradient-to-b from-teal-50/60 via-white to-teal-50/20 dark:from-teal-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-teal-600 text-white shadow-2xs',
      dropZone: 'bg-teal-50/70 dark:bg-teal-950/40 border-teal-200/80 dark:border-teal-900/60',
    },
    {
      border: 'border-blue-300 dark:border-blue-800',
      bg: 'bg-gradient-to-b from-blue-50/60 via-white to-blue-50/20 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-blue-600 text-white shadow-2xs',
      dropZone: 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-900/60',
    },
    {
      border: 'border-purple-300 dark:border-purple-800',
      bg: 'bg-gradient-to-b from-purple-50/60 via-white to-purple-50/20 dark:from-purple-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-purple-600 text-white shadow-2xs',
      dropZone: 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-200/80 dark:border-purple-900/60',
    },
    {
      border: 'border-amber-300 dark:border-amber-800',
      bg: 'bg-gradient-to-b from-amber-50/60 via-white to-amber-50/20 dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-amber-600 text-white shadow-2xs',
      dropZone: 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-900/60',
    },
    {
      border: 'border-rose-300 dark:border-rose-800',
      bg: 'bg-gradient-to-b from-rose-50/60 via-white to-rose-50/20 dark:from-rose-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-rose-600 text-white shadow-2xs',
      dropZone: 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200/80 dark:border-rose-900/60',
    }
  ];

  return (
    <div className="space-y-2.5 sm:space-y-3 animate-in fade-in duration-300 text-left">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-50/80 via-white to-fuchsia-50/80 dark:bg-slate-850 rounded-2xl p-2.5 sm:p-3 border-2 border-purple-200/90 dark:border-purple-800/80 flex flex-wrap items-center justify-between gap-2.5 shadow-xs">
        <div className="flex items-center gap-2.5">
          {onBack ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-purple-200 dark:border-purple-800 hover:bg-purple-50"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5 text-purple-600" />
              Vissza
            </Button>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-600 text-white flex items-center justify-center font-bold shadow-xs">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          )}
          <div>
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              {typeof currentTitle === 'string' ? <MathText>{currentTitle}</MathText> : currentTitle} ({activeLevel}. szint)
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
              {typeof currentSubtitle === 'string' ? <MathText>{currentSubtitle}</MathText> : currentSubtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-900 dark:text-purple-300 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-purple-500" />
            <span>
              Még besorolandó: <strong className="text-purple-600 dark:text-purple-400">{unassignedItems.length} db</strong>
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={initGame}
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            Újrakezdés
          </Button>

          {onOpenRules && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenRules}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-purple-200 text-purple-800 bg-purple-50/50 hover:bg-purple-100 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-purple-600" />
              Szabályzat
            </Button>
          )}

          {onSwitchToTheory && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToTheory}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-violet-200 text-violet-800 bg-violet-50/50 hover:bg-violet-100 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-600" />
              Tananyag
            </Button>
          )}
        </div>
      </div>

      {/* Unassigned Items Pool */}
      {unassignedItems.length > 0 && (
        <div className="bg-gradient-to-b from-purple-50/40 via-white to-indigo-50/20 dark:bg-slate-900 rounded-2xl p-2.5 sm:p-3 border-2 border-dashed border-purple-300 dark:border-purple-800 shadow-xs space-y-1.5 sm:space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
            <span className="flex items-center gap-2">
              <span className="text-purple-900 dark:text-purple-200 font-extrabold text-[11px] sm:text-xs">Kattints egy kártyára a kiválasztáshoz:</span>
              <span className="text-[10px] font-black text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/70 px-2 py-0.5 rounded-full border border-purple-300 dark:border-purple-800">
                {unassignedItems.length} db maradt
              </span>
            </span>
            {selectedItem && (
              <span className="text-purple-600 dark:text-purple-400 font-bold animate-pulse text-[11px] sm:text-xs">
                👉 Kiválasztva: most kattints egy lenti csoportra!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
            {unassignedItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const labelText = item.label || item.content || item.text;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  title={typeof labelText === 'string' ? labelText : undefined}
                  className={cn(
                    'p-1.5 sm:p-2 rounded-xl text-left transition-all border-2 shadow-xs cursor-pointer flex items-center gap-2 min-h-[44px]',
                    isSelected
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-700 shadow-md scale-[1.01] ring-3 ring-purple-300 dark:ring-purple-800'
                      : 'bg-gradient-to-r from-white via-purple-50/25 to-white dark:bg-slate-800 border-purple-200/90 dark:border-purple-800 text-slate-900 dark:text-slate-100 hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-50/60 hover:to-indigo-50/60 hover:shadow-md hover:-translate-y-0.5'
                  )}
                >
                  {item.figure && (
                    <div className={cn(
                      'w-12 h-7 sm:w-14 sm:h-8 shrink-0 overflow-hidden flex items-center justify-center rounded-lg border transition-colors [&>svg]:w-full [&>svg]:h-full p-0.5 shadow-2xs',
                      isSelected
                        ? 'bg-white text-slate-900 border-purple-300 shadow-xs'
                        : 'bg-white dark:bg-slate-900/90 border-purple-100 dark:border-slate-750'
                    )}>
                      {item.figure}
                    </div>
                  )}
                  {labelText && (
                    <span className="font-bold text-[11px] sm:text-xs leading-snug line-clamp-2 flex-1">
                      {typeof labelText === 'string' ? <MathText size="sm">{labelText}</MathText> : labelText}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Category Drop Buckets */}
      <div className={cn(
        'grid gap-2.5 sm:gap-3',
        currentConfig.categories.length === 4
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
          : currentConfig.categories.length === 2
          ? 'grid-cols-1 sm:grid-cols-2'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      )}>
        {currentConfig.categories.map((cat, catIdx) => {
          const itemsInCat = categorizedItems[cat.id] || [];
          const catName = cat.name || cat.title || '';
          const theme = categoryThemes[catIdx % categoryThemes.length];

          return (
            <div
              key={cat.id}
              onClick={() => {
                if (selectedItem) {
                  handleAssignToCategory(cat.id);
                }
              }}
              className={cn(
                'rounded-2xl p-2.5 sm:p-3 border-2 transition-all flex flex-col justify-between min-h-[140px]',
                theme.border,
                theme.bg,
                selectedItem
                  ? 'cursor-pointer shadow-md ring-3 ring-purple-400/80 dark:ring-purple-700/80 scale-[1.01]'
                  : 'shadow-xs'
              )}
            >
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between gap-1.5">
                  <span className={cn(
                    'px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-wider border leading-tight',
                    cat.badgeColor || theme.badge
                  )}>
                    {typeof catName === 'string' ? <MathText size="sm">{catName}</MathText> : catName}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
                    {itemsInCat.length} elem
                  </span>
                </div>

                {cat.description && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">
                    {typeof cat.description === 'string' ? <MathText>{cat.description}</MathText> : cat.description}
                  </p>
                )}

                {/* Items in Category */}
                <div className={cn(
                  "flex flex-wrap gap-1 min-h-[50px] p-1.5 rounded-xl border",
                  theme.dropZone
                )}>
                  {itemsInCat.length === 0 ? (
                    <div className="w-full flex items-center justify-center text-[10px] sm:text-[11px] text-slate-400 font-medium py-2.5">
                      {selectedItem ? '👉 Kattints ide a lehelyezéshez' : 'Üres kategória'}
                    </div>
                  ) : (
                    itemsInCat.map((item) => {
                      const isWrong =
                        validationResult.isChecked &&
                        validationResult.wrongItemIds.includes(item.id);
                      const isCorrect =
                        validationResult.isChecked && !isWrong;
                      const itemText = item.label || item.content || item.text;

                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReturnToUnassigned(item);
                          }}
                          className={cn(
                            'px-2 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all border-2 flex items-center gap-1.5 shadow-2xs cursor-pointer',
                            isCorrect && 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-200',
                            isWrong && 'bg-rose-100 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-200 animate-shake',
                            !validationResult.isChecked && 'bg-white dark:bg-slate-800 border-slate-200/90 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-400 hover:bg-rose-50/40'
                          )}
                          title="Kattints az elem visszavonásához"
                        >
                          {item.figure && (
                            <div className="w-6 h-4 shrink-0 overflow-hidden flex items-center justify-center bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-750 [&>svg]:w-full [&>svg]:h-full p-0.5">
                              {item.figure}
                            </div>
                          )}
                          {itemText && (
                            <span className="line-clamp-1 max-w-[130px] sm:max-w-[160px]">
                              {typeof itemText === 'string' ? <MathText size="sm">{itemText}</MathText> : itemText}
                            </span>
                          )}
                          {isCorrect && <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 ml-auto" />}
                          {isWrong && <XCircle className="w-3 h-3 text-rose-600 shrink-0 ml-auto" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {selectedItem && (
                <div className="pt-1 text-center border-t border-purple-200/60 dark:border-purple-900/40">
                  <span className="text-[10px] font-black text-purple-600 dark:text-purple-400">
                    + Kattints ide a lehelyezéshez
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation / Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
        <div className="text-xs text-slate-500">
          {validationResult.isChecked && (
            <span className={validationResult.isAllCorrect ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>
              {validationResult.isAllCorrect
                ? 'Tökéletes! Minden elem a megfelelő helyen van! 🎉'
                : `${validationResult.mistakesCount} elem rossz helyen van! Kattints rájuk a javításhoz.`}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {allPlaced && !validationResult.isAllCorrect && (
            <Button
              onClick={handleValidate}
              className="rounded-xl h-9 px-4 font-black bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/25 text-xs sm:text-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Besorolás Ellenőrzése
            </Button>
          )}

          {validationResult.isAllCorrect && (
            <div className="flex items-center gap-2">
              {activeLevel < 3 && onNextLevel && (
                <Button
                  onClick={onNextLevel}
                  className="rounded-xl h-9 px-4 font-black bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-teal-500/25 text-xs sm:text-sm cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                >
                  Következő Szint ({activeLevel + 1}. szint)
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              )}

              <Button
                onClick={initGame}
                variant="outline"
                className="rounded-xl h-9 px-3.5 font-bold text-xs sm:text-sm border-slate-300 dark:border-slate-700 cursor-pointer hover:bg-slate-100"
              >
                <RotateCcw className="w-4 h-4 mr-1.5 text-slate-600" />
                Újra
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SorterTemplate;
