import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalDivisionSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function DecimalDivisionSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalDivisionSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: HÁNYADOS ÉRTÉKE 1-HEZ KÉPEST
    1: {
      categories: [
        {
          id: 'less-1',
          name: 'Kisebb mint 1 (< 1)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'exact-1',
          name: 'Pontosan 1 (= 1)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'greater-1',
          name: 'Nagyobb mint 1 (> 1)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '1 : 2 (0,5)', categoryId: 'less-1' },
        { id: 'i1-2', label: '3 : 4 (0,75)', categoryId: 'less-1' },
        { id: 'i1-3', label: '1,25 : 5 (0,25)', categoryId: 'less-1' },
        { id: 'i1-4', label: '0,8 : 2 (0,4)', categoryId: 'less-1' },
        { id: 'i1-5', label: '3 : 3 (1,0)', categoryId: 'exact-1' },
        { id: 'i1-6', label: '5 : 5 (1,0)', categoryId: 'exact-1' },
        { id: 'i1-7', label: '8 : 8 (1,0)', categoryId: 'exact-1' },
        { id: 'i1-8', label: '12 : 12 (1,0)', categoryId: 'exact-1' },
        { id: 'i1-9', label: '14,7 : 3 (4,9)', categoryId: 'greater-1' },
        { id: 'i1-10', label: '7 : 2 (3,5)', categoryId: 'greater-1' },
        { id: 'i1-11', label: '9,6 : 3 (3,2)', categoryId: 'greater-1' },
        { id: 'i1-12', label: '15 : 4 (3,75)', categoryId: 'greater-1' }
      ]
    },

    // 2. SZINT: HÁNYADOS TIZEDESJEGYEINEK SZÁMA
    2: {
      categories: [
        {
          id: 'one-dec',
          name: 'Tizedek (1 tizedesjegy)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'two-dec',
          name: 'Századok (2 tizedesjegy)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'three-dec',
          name: 'Ezredek (3 tizedesjegy)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '6,8 : 2 (= 3,4)', categoryId: 'one-dec' },
        { id: 'i2-2', label: '14,7 : 3 (= 4,9)', categoryId: 'one-dec' },
        { id: 'i2-3', label: '7 : 2 (= 3,5)', categoryId: 'one-dec' },
        { id: 'i2-4', label: '45 : 10 (= 4,5)', categoryId: 'one-dec' },
        { id: 'i2-5', label: '3 : 4 (= 0,75)', categoryId: 'two-dec' },
        { id: 'i2-6', label: '6,18 : 6 (= 1,03)', categoryId: 'two-dec' },
        { id: 'i2-7', label: '1,25 : 5 (= 0,25)', categoryId: 'two-dec' },
        { id: 'i2-8', label: '15 : 4 (= 3,75)', categoryId: 'two-dec' },
        { id: 'i2-9', label: '1 : 8 (= 0,125)', categoryId: 'three-dec' },
        { id: 'i2-10', label: '3,2 : 100 (= 0,032)', categoryId: 'three-dec' },
        { id: 'i2-11', label: '7 : 1000 (= 0,007)', categoryId: 'three-dec' },
        { id: 'i2-12', label: '0,05 : 2 (= 0,025)', categoryId: 'three-dec' }
      ]
    },

    // 3. SZINT: HÁNYADOS ÉRTÉKE 5-HÖZ KÉPEST
    3: {
      categories: [
        {
          id: 'less-5',
          name: 'Kisebb mint 5 (< 5)',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'exact-5',
          name: 'Pontosan 5 (= 5)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'greater-5',
          name: 'Nagyobb mint 5 (> 5)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '14,7 : 3 (4,9)', categoryId: 'less-5' },
        { id: 'i3-2', label: '16,8 : 4 (4,2)', categoryId: 'less-5' },
        { id: 'i3-3', label: '37,5 : 15 (2,5)', categoryId: 'less-5' },
        { id: 'i3-4', label: '8,4 : 2 (4,2)', categoryId: 'less-5' },
        { id: 'i3-5', label: '15 : 3 (5,0)', categoryId: 'exact-5' },
        { id: 'i3-6', label: '25 : 5 (5,0)', categoryId: 'exact-5' },
        { id: 'i3-7', label: '100 : 20 (5,0)', categoryId: 'exact-5' },
        { id: 'i3-8', label: '40 : 8 (5,0)', categoryId: 'exact-5' },
        { id: 'i3-9', label: '53,4 : 6 (8,9)', categoryId: 'greater-5' },
        { id: 'i3-10', label: '64,8 : 8 (8,1)', categoryId: 'greater-5' },
        { id: 'i3-11', label: '72,6 : 6 (12,1)', categoryId: 'greater-5' },
        { id: 'i3-12', label: '96,6 : 14 (6,9)', categoryId: 'greater-5' }
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
      title="Tizedes tört osztása – Csoportosító játék"
      subtitle="Húzd az osztási feladatokat a megfelelő kategóriába a hányados értéke szerint!"
      levels={levelsConfig}
      currentLevel={level}
      onLevelChange={setLevel}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
      onNextLevel={handleNextLevelInternal}
      onOpenRules={onOpenRules}
      topicId="g5-decimal-divide-sorter"
      themeColor="indigo"
    />
  );
}
export default DecimalDivisionSorter;
