import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalMultiplicationSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function DecimalMultiplicationSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalMultiplicationSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: SZORZAT ÉRTÉKE 10-HEZ KÉPEST
    1: {
      categories: [
        {
          id: 'less-10',
          name: 'Kisebb mint 10 (< 10)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'exact-10',
          name: 'Pontosan 10 (= 10)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'greater-10',
          name: 'Nagyobb mint 10 (> 10)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '1,2 · 4 (4,8)', categoryId: 'less-10' },
        { id: 'i1-2', label: '0,5 · 8 (4,0)', categoryId: 'less-10' },
        { id: 'i1-3', label: '2,4 · 3 (7,2)', categoryId: 'less-10' },
        { id: 'i1-4', label: '0,09 · 50 (4,5)', categoryId: 'less-10' },
        { id: 'i1-5', label: '2,5 · 4 (10)', categoryId: 'exact-10' },
        { id: 'i1-6', label: '1,25 · 8 (10)', categoryId: 'exact-10' },
        { id: 'i1-7', label: '0,1 · 100 (10)', categoryId: 'exact-10' },
        { id: 'i1-8', label: '0,5 · 20 (10)', categoryId: 'exact-10' },
        { id: 'i1-9', label: '3,2 · 5 (16)', categoryId: 'greater-10' },
        { id: 'i1-10', label: '1,5 · 8 (12)', categoryId: 'greater-10' },
        { id: 'i1-11', label: '4,2 · 3 (12,6)', categoryId: 'greater-10' },
        { id: 'i1-12', label: '0,35 · 40 (14)', categoryId: 'greater-10' }
      ]
    },

    // 2. SZINT: SZORZAT TIZEDESJEGYEINEK SZÁMA (EGYSZERŰSÍTÉS UTÁN)
    2: {
      categories: [
        {
          id: 'zero-dec',
          name: 'Egész szám (0 tizedesjegy)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'one-dec',
          name: 'Tizedek (1 tizedesjegy)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'two-dec',
          name: 'Századok (2 tizedesjegy)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '0,25 · 4 (= 1)', categoryId: 'zero-dec' },
        { id: 'i2-2', label: '1,5 · 6 (= 9)', categoryId: 'zero-dec' },
        { id: 'i2-3', label: '0,125 · 8 (= 1)', categoryId: 'zero-dec' },
        { id: 'i2-4', label: '3,5 · 4 (= 14)', categoryId: 'zero-dec' },
        { id: 'i2-5', label: '0,45 · 2 (= 0,9)', categoryId: 'one-dec' },
        { id: 'i2-6', label: '1,2 · 3 (= 3,6)', categoryId: 'one-dec' },
        { id: 'i2-7', label: '2,35 · 2 (= 4,7)', categoryId: 'one-dec' },
        { id: 'i2-8', label: '0,08 · 5 (= 0,4)', categoryId: 'one-dec' },
        { id: 'i2-9', label: '0,12 · 4 (= 0,48)', categoryId: 'two-dec' },
        { id: 'i2-10', label: '1,05 · 3 (= 3,15)', categoryId: 'two-dec' },
        { id: 'i2-11', label: '0,04 · 6 (= 0,24)', categoryId: 'two-dec' },
        { id: 'i2-12', label: '2,13 · 3 (= 6,39)', categoryId: 'two-dec' }
      ]
    },

    // 3. SZINT: NAGYSÁGRENDI BESOROLÁS 50-HEZ KÉPEST
    3: {
      categories: [
        {
          id: 'less-50',
          name: 'Kisebb mint 50 (< 50)',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'exact-50',
          name: 'Pontosan 50 (= 50)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'greater-50',
          name: 'Nagyobb mint 50 (> 50)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '4,5 · 10 (45)', categoryId: 'less-50' },
        { id: 'i3-2', label: '3,2 · 12 (38,4)', categoryId: 'less-50' },
        { id: 'i3-3', label: '1,25 · 32 (40)', categoryId: 'less-50' },
        { id: 'i3-4', label: '0,9 · 40 (36)', categoryId: 'less-50' },
        { id: 'i3-5', label: '2,5 · 20 (50)', categoryId: 'exact-50' },
        { id: 'i3-6', label: '0,5 · 100 (50)', categoryId: 'exact-50' },
        { id: 'i3-7', label: '12,5 · 4 (50)', categoryId: 'exact-50' },
        { id: 'i3-8', label: '6,25 · 8 (50)', categoryId: 'exact-50' },
        { id: 'i3-9', label: '5,5 · 10 (55)', categoryId: 'greater-50' },
        { id: 'i3-10', label: '4,8 · 12 (57,6)', categoryId: 'greater-50' },
        { id: 'i3-11', label: '3,5 · 16 (56)', categoryId: 'greater-50' },
        { id: 'i3-12', label: '15,2 · 4 (60,8)', categoryId: 'greater-50' }
      ]
    }
  };

  const handleNextLevelInternal = () => {
    if (level < 3) {
      setLevel((prev) => (prev + 1) as DifficultyLevel);
    } else if (onNextLevel) {
      onNextLevel();
    }
  };

  return (
    <SorterTemplate
      title="Tizedes tört szorzása – Csoportosító játék"
      subtitle="Húzd a szorzási kifejezéseket a megfelelő kategóriába a szorzat értéke szerint!"
      levels={levelsConfig}
      currentLevel={level}
      onLevelChange={setLevel}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevelInternal}
      onOpenRules={onOpenRules}
      topicId="g5-decimal-multiply-sorter"
      themeColor="emerald"
    />
  );
}
export default DecimalMultiplicationSorter;
