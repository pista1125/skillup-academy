import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionsDiffDenomSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsDiffDenomSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsDiffDenomSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: KÖZÖS NEVEZŐ ÉRTÉKE SZERINT
    1: {
      level: 1,
      title: 'Legkisebb közös nevező értéke',
      description: 'Határozd meg a megadott művelet legkisebb közös nevezőjét (LKKT), és dobd a megfelelő kategóriába!',
      categories: [
        {
          id: 'cat-den-6',
          name: 'Közös nevező = 6',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-den-12',
          name: 'Közös nevező = 12',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-den-20',
          name: 'Közös nevező = 20',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '1/2 + 1/3', category: 'cat-den-6' },
        { id: 'i1-2', label: '5/6 - 1/2', category: 'cat-den-6' },
        { id: 'i1-3', label: '2/3 + 1/6', category: 'cat-den-6' },
        { id: 'i1-4', label: '1/2 - 1/6', category: 'cat-den-6' },
        { id: 'i1-5', label: '1/3 + 1/4', category: 'cat-den-12' },
        { id: 'i1-6', label: '3/4 - 1/6', category: 'cat-den-12' },
        { id: 'i1-7', label: '5/12 + 1/3', category: 'cat-den-12' },
        { id: 'i1-8', label: '7/12 - 1/4', category: 'cat-den-12' },
        { id: 'i1-9', label: '1/4 + 2/5', category: 'cat-den-20' },
        { id: 'i1-10', label: '9/20 - 1/5', category: 'cat-den-20' },
        { id: 'i1-11', label: '3/10 + 1/4', category: 'cat-den-20' },
        { id: 'i1-12', label: '7/10 - 1/4', category: 'cat-den-20' }
      ]
    },

    // 2. SZINT: MŰVELET EREDMÉNYÉNEK NAGYSÁGA 1 EGÉSZHEZ KÉPEST
    2: {
      level: 2,
      title: 'Eredmény nagysága 1-hez képest',
      description: 'Számítsd ki a műveletet, és csoportosítsd az 1-hez viszonyított értéke szerint!',
      categories: [
        {
          id: 'cat-less',
          name: 'Kisebb, mint 1 (< 1)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-equal',
          name: 'Pontosan 1 egész (= 1)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-greater',
          name: 'Nagyobb, mint 1 (> 1)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '1/2 + 1/4', category: 'cat-less' },
        { id: 'i2-2', label: '5/6 - 1/3', category: 'cat-less' },
        { id: 'i2-3', label: '1/3 + 1/5', category: 'cat-less' },
        { id: 'i2-4', label: '3/4 - 1/3', category: 'cat-less' },
        { id: 'i2-5', label: '1/2 + 2/4', category: 'cat-equal' },
        { id: 'i2-6', label: '2/3 + 2/6', category: 'cat-equal' },
        { id: 'i2-7', label: '3/5 + 4/10', category: 'cat-equal' },
        { id: 'i2-8', label: '3/4 + 3/12', category: 'cat-equal' },
        { id: 'i2-9', label: '3/4 + 1/2', category: 'cat-greater' },
        { id: 'i2-10', label: '2/3 + 3/4', category: 'cat-greater' },
        { id: 'i2-11', label: '1 1/2 + 1/3', category: 'cat-greater' },
        { id: 'i2-12', label: '5/6 + 1/2', category: 'cat-greater' }
      ]
    },

    // 3. SZINT: EGYSZERŰSÍTETT VÉGEREDMÉNY KATEGÓRIÁI
    3: {
      level: 3,
      title: 'Egyszerűsített végeredmények',
      description: 'Hozd az eredményt a legegyszerűbb alakra, és válogasd be a megfelelő csoportba!',
      categories: [
        {
          id: 'cat-half',
          name: '= 1/2',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-three-fourths',
          name: '= 3/4',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-five-sixths',
          name: '= 5/6',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-other',
          name: 'Más érték',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
        }
      ],
      items: [
        { id: 'i3-1', label: '1/3 + 1/6', category: 'cat-half' },
        { id: 'i3-2', label: '7/10 - 1/5', category: 'cat-half' },
        { id: 'i3-3', label: '3/4 - 1/4', category: 'cat-half' },
        { id: 'i3-4', label: '1/2 + 1/4', category: 'cat-three-fourths' },
        { id: 'i3-5', label: '11/12 - 1/6', category: 'cat-three-fourths' },
        { id: 'i3-6', label: '1 - 1/4', category: 'cat-three-fourths' },
        { id: 'i3-7', label: '1/2 + 1/3', category: 'cat-five-sixths' },
        { id: 'i3-8', label: '1 - 1/6', category: 'cat-five-sixths' },
        { id: 'i3-9', label: '2/3 + 1/6', category: 'cat-five-sixths' },
        { id: 'i3-10', label: '1/4 + 1/3', category: 'cat-other' },
        { id: 'i3-11', label: '2/5 + 1/4', category: 'cat-other' },
        { id: 'i3-12', label: '3/5 - 1/3', category: 'cat-other' }
      ]
    }
  };

  const handleNextLevel = () => {
    if (onNextLevel) {
      onNextLevel();
    } else if (level < 3) {
      setLevel((prev) => (prev + 1) as DifficultyLevel);
    }
  };

  return (
    <SorterTemplate
      level={level}
      grade={5}
      chapterId="tortek-tizedestortek"
      topicId="g5-diff-denom-sorter"
      badge="➕ 5. Osztály • Különböző nevezőjű törtek műveletei"
      levels={levelsConfig}
      onNextLevel={handleNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default FractionsDiffDenomSorter;
