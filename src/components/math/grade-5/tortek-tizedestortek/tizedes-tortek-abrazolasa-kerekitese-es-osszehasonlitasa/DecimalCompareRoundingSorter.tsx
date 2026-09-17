import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalCompareRoundingSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function DecimalCompareRoundingSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalCompareRoundingSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: EGÉSZRE KEREKÍTÉS ÉRTÉKE SZERINT
    1: {
      categories: [
        {
          id: 'round-3',
          name: '3-ra kerekíthető',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'round-4',
          name: '4-re kerekíthető',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'round-5',
          name: '5-re kerekíthető',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '2,8', categoryId: 'round-3' },
        { id: 'i1-2', label: '3,15', categoryId: 'round-3' },
        { id: 'i1-3', label: '3,4', categoryId: 'round-3' },
        { id: 'i1-4', label: '2,92', categoryId: 'round-3' },
        { id: 'i1-5', label: '3,6', categoryId: 'round-4' },
        { id: 'i1-6', label: '3,85', categoryId: 'round-4' },
        { id: 'i1-7', label: '4,12', categoryId: 'round-4' },
        { id: 'i1-8', label: '4,4', categoryId: 'round-4' },
        { id: 'i1-9', label: '4,7', categoryId: 'round-5' },
        { id: 'i1-10', label: '4,95', categoryId: 'round-5' },
        { id: 'i1-11', label: '5,2', categoryId: 'round-5' },
        { id: 'i1-12', label: '5,38', categoryId: 'round-5' }
      ]
    },

    // 2. SZINT: NAGYSÁGRENDI CSOPORTOSÍTÁS (SZÁMEGYENES TARTOMÁNYOK)
    2: {
      categories: [
        {
          id: 'less-25',
          name: 'Kisebb mint 2,5 (< 2,5)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'between-25-30',
          name: '2,5 és 3,0 között',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800'
        },
        {
          id: 'greater-30',
          name: 'Nagyobb mint 3,0 (> 3,0)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '1,85', categoryId: 'less-25' },
        { id: 'i2-2', label: '2,15', categoryId: 'less-25' },
        { id: 'i2-3', label: '2,48', categoryId: 'less-25' },
        { id: 'i2-4', label: '0,999', categoryId: 'less-25' },
        { id: 'i2-5', label: '2,52', categoryId: 'between-25-30' },
        { id: 'i2-6', label: '2,68', categoryId: 'between-25-30' },
        { id: 'i2-7', label: '2,85', categoryId: 'between-25-30' },
        { id: 'i2-8', label: '2,94', categoryId: 'between-25-30' },
        { id: 'i2-9', label: '3,05', categoryId: 'greater-30' },
        { id: 'i2-10', label: '3,2', categoryId: 'greater-30' },
        { id: 'i2-11', label: '4,1', categoryId: 'greater-30' },
        { id: 'i2-12', label: '3,001', categoryId: 'greater-30' }
      ]
    },

    // 3. SZINT: TIZEDRE KEREKÍTÉS EREDMÉNYE
    3: {
      categories: [
        {
          id: 'round-42',
          name: '4,2-re kerekíthető',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'round-43',
          name: '4,3-ra kerekíthető',
          badgeColor: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800'
        },
        {
          id: 'round-44',
          name: '4,4-re kerekíthető',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '4,18', categoryId: 'round-42' },
        { id: 'i3-2', label: '4,22', categoryId: 'round-42' },
        { id: 'i3-3', label: '4,151', categoryId: 'round-42' },
        { id: 'i3-4', label: '4,24', categoryId: 'round-42' },
        { id: 'i3-5', label: '4,28', categoryId: 'round-43' },
        { id: 'i3-6', label: '4,31', categoryId: 'round-43' },
        { id: 'i3-7', label: '4,265', categoryId: 'round-43' },
        { id: 'i3-8', label: '4,34', categoryId: 'round-43' },
        { id: 'i3-9', label: '4,37', categoryId: 'round-44' },
        { id: 'i3-10', label: '4,42', categoryId: 'round-44' },
        { id: 'i3-11', label: '4,352', categoryId: 'round-44' },
        { id: 'i3-12', label: '4,44', categoryId: 'round-44' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      grade={5}
      chapterId="tortek-tizedestortek"
      topicId="g5-decimal-compare-rounding-sorter"
      title="Tizedes törtek csoportosítása és kerekítése"
      subtitle="Húzd a számokat a megfelelő kerekítési vagy nagyságrendi kategóriába!"
      badge="📏 5. Osztály • Tizedes törtek összehasonlítása és kerekítése"
      levels={levelsConfig}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default DecimalCompareRoundingSorter;
