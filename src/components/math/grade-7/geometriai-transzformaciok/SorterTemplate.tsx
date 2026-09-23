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
  level = 1,
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
  onSwitchToTheory,
  grade = 7,
  chapterId = 'g7-geom-trans',
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
  const activeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;

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
  }, [level, config, levels, levelsConfig]);

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
      const g = grade || 7;
      const ch = chapterId || 'g7-geom-trans';
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

  return (
    <div className="space-y-4 animate-in fade-in duration-300 text-left">
      {/* Top Bar */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 shadow-xs">
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
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              {typeof currentTitle === 'string' ? <MathText>{currentTitle}</MathText> : currentTitle} ({activeLevel}. szint)
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {typeof currentSubtitle === 'string' ? <MathText>{currentSubtitle}</MathText> : currentSubtitle}
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
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Újrakezdés
          </Button>

          {onOpenRules && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenRules}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-slate-700 dark:text-slate-300 cursor-pointer hover:bg-slate-100"
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
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 cursor-pointer"
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
              <span className="text-purple-600 dark:text-purple-400 animate-pulse">
                Kiválasztva: <strong><MathText size="md">{selectedItem.label || selectedItem.content || selectedItem.text}</MathText></strong> (most kattints a kívánt csoportra!)
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {unassignedItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const labelText = item.label || item.content || item.text;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectItem(item)}
                  className={cn(
                    'px-3.5 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all border-2 shadow-xs cursor-pointer flex flex-col items-center justify-center gap-1',
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-105'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-purple-400 hover:bg-purple-50/50'
                  )}
                >
                  {item.figure && (
                    <div className="max-h-12 overflow-hidden flex items-center justify-center p-0.5">
                      {item.figure}
                    </div>
                  )}
                  {labelText && (
                    <span>
                      {typeof labelText === 'string' ? <MathText size="md">{labelText}</MathText> : labelText}
                    </span>
                  )}
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
          const catName = cat.name || cat.title || '';

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
                    {typeof catName === 'string' ? <MathText size="sm">{catName}</MathText> : catName}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {itemsInCat.length} elem
                  </span>
                </div>

                {cat.description && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {typeof cat.description === 'string' ? <MathText>{cat.description}</MathText> : cat.description}
                  </p>
                )}

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
                      const itemText = item.label || item.content || item.text;

                      return (
                        <button
                          key={item.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReturnToUnassigned(item);
                          }}
                          className={cn(
                            'px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border flex items-center gap-1.5 shadow-2xs cursor-pointer',
                            isCorrect && 'bg-emerald-100 dark:bg-emerald-950/60 border-emerald-300 text-emerald-900 dark:text-emerald-200',
                            isWrong && 'bg-rose-100 dark:bg-rose-950/60 border-rose-300 text-rose-900 dark:text-rose-200 animate-shake',
                            !validationResult.isChecked && 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-rose-300 hover:bg-rose-50/40'
                          )}
                          title="Kattints az elem visszavonásához"
                        >
                          {item.figure && (
                            <div className="max-h-8 max-w-16 overflow-hidden flex items-center justify-center">
                              {item.figure}
                            </div>
                          )}
                          {itemText && (
                            <span>
                              {typeof itemText === 'string' ? <MathText size="sm">{itemText}</MathText> : itemText}
                            </span>
                          )}
                          {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                          {isWrong && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              {selectedItem && (
                <div className="pt-2 text-center border-t border-purple-200/60 dark:border-purple-900/40">
                  <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                    + Kattints a lehelyezéshez
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation / Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
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
              className="rounded-xl h-10 px-5 font-black bg-purple-600 hover:bg-purple-700 text-white shadow-md text-xs sm:text-sm cursor-pointer"
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
                  className="rounded-xl h-10 px-5 font-black bg-emerald-600 hover:bg-emerald-700 text-white shadow-md text-xs sm:text-sm cursor-pointer"
                >
                  Következő Szint ({activeLevel + 1}. szint)
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              )}

              <Button
                onClick={initGame}
                variant="outline"
                className="rounded-xl h-10 px-4 font-bold text-xs sm:text-sm border-slate-300 dark:border-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 mr-1.5" />
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
