import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface Chapter2SummarySorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function Chapter2SummarySorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: Chapter2SummarySorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: ÉRTÉK 1 EGÉSZHEZ KÉPEST
    1: {
      categories: [
        {
          id: 'less-1',
          name: 'Kisebb mint 1 (< 1)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'exact-1',
          name: 'Pontosan 1 egész (= 1)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'greater-1',
          name: 'Nagyobb mint 1 (> 1)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '3/4 (0,75)', categoryId: 'less-1' },
        { id: 'i1-2', label: '0,25 + 0,5 (0,75)', categoryId: 'less-1' },
        { id: 'i1-3', label: '1/2 · 1/1 (0,5)', categoryId: 'less-1' },
        { id: 'i1-4', label: '0,99', categoryId: 'less-1' },
        { id: 'i1-5', label: '4/4', categoryId: 'exact-1' },
        { id: 'i1-6', label: '0,4 + 0,6', categoryId: 'exact-1' },
        { id: 'i1-7', label: '10/10', categoryId: 'exact-1' },
        { id: 'i1-8', label: '1,00', categoryId: 'exact-1' },
        { id: 'i1-9', label: '5/4 (1,25)', categoryId: 'greater-1' },
        { id: 'i1-10', label: '1 és 1/2 (1,5)', categoryId: 'greater-1' },
        { id: 'i1-11', label: '2,35', categoryId: 'greater-1' },
        { id: 'i1-12', label: '3/2 · 2 (3)', categoryId: 'greater-1' }
      ]
    },

    // 2. SZINT: SZÁMOK TÍPUSA ÉS FORMÁTUMA
    2: {
      categories: [
        {
          id: 'proper-frac',
          name: 'Valódi tört (< 1)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'dec-frac',
          name: 'Tizedes tört',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'mixed-frac',
          name: 'Vegyes tört / Áltört (> 1)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '2/5', categoryId: 'proper-frac' },
        { id: 'i2-2', label: '3/8', categoryId: 'proper-frac' },
        { id: 'i2-3', label: '7/10', categoryId: 'proper-frac' },
        { id: 'i2-4', label: '5/9', categoryId: 'proper-frac' },
        { id: 'i2-5', label: '0,4', categoryId: 'dec-frac' },
        { id: 'i2-6', label: '3,75', categoryId: 'dec-frac' },
        { id: 'i2-7', label: '0,012', categoryId: 'dec-frac' },
        { id: 'i2-8', label: '14,8', categoryId: 'dec-frac' },
        { id: 'i2-9', label: '1 és 3/4', categoryId: 'mixed-frac' },
        { id: 'i2-10', label: '7/3', categoryId: 'mixed-frac' },
        { id: 'i2-11', label: '2 és 1/5', categoryId: 'mixed-frac' },
        { id: 'i2-12', label: '9/4', categoryId: 'mixed-frac' }
      ]
    },

    // 3. SZINT: MŰVELETI EREDMÉNYEK NAGYSÁGA
    3: {
      categories: [
        {
          id: 'range-0-1',
          name: '0 és 1 között',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'range-1-5',
          name: '1 és 5 között',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'range-5-plus',
          name: '5 felett (> 5)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '1/4 + 1/4 (0,5)', categoryId: 'range-0-1' },
        { id: 'i3-2', label: '0,9 - 0,35 (0,55)', categoryId: 'range-0-1' },
        { id: 'i3-3', label: '0,125 · 4 (0,5)', categoryId: 'range-0-1' },
        { id: 'i3-4', label: '3,6 : 6 (0,6)', categoryId: 'range-0-1' },
        { id: 'i3-5', label: '1/2 · 4 (2)', categoryId: 'range-1-5' },
        { id: 'i3-6', label: '1,5 + 2,25 (3,75)', categoryId: 'range-1-5' },
        { id: 'i3-7', label: '9/2 (4,5)', categoryId: 'range-1-5' },
        { id: 'i3-8', label: '6,4 : 2 (3,2)', categoryId: 'range-1-5' },
        { id: 'i3-9', label: '2,5 · 4 (10)', categoryId: 'range-5-plus' },
        { id: 'i3-10', label: '25/4 (6,25)', categoryId: 'range-5-plus' },
        { id: 'i3-11', label: '3,8 + 4,2 (8)', categoryId: 'range-5-plus' },
        { id: 'i3-12', label: '0,7 · 10 (7)', categoryId: 'range-5-plus' }
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
      title="Törtek és tizedestörtek – Összefoglaló Csoportosító"
      subtitle="Válogasd szét a matematikai kifejezéseket a megfelelő kategóriákba!"
      levels={levelsConfig}
      level={level}
      currentLevel={level}
      onLevelChange={(lvl) => setLevel(lvl as DifficultyLevel)}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevelInternal}
      onOpenRules={onOpenRules}
      topicId="g5-chapter2-summary-sorter"
      themeColor="purple"
    />
  );
}
export default Chapter2SummarySorter;
