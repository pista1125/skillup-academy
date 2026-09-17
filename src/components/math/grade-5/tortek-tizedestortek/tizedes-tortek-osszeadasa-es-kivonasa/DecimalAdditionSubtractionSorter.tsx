import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DecimalAdditionSubtractionSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function DecimalAdditionSubtractionSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: DecimalAdditionSubtractionSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: EREDMÉNY ÉRTÉKE 5-HÖZ KÉPEST
    1: {
      categories: [
        {
          id: 'less-5',
          name: 'Kisebb mint 5 (< 5)',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800'
        },
        {
          id: 'exact-5',
          name: 'Pontosan 5 (= 5)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'greater-5',
          name: 'Nagyobb mint 5 (> 5)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '1,4 + 2,1 (3,5)', categoryId: 'less-5' },
        { id: 'i1-2', label: '8,2 - 4,5 (3,7)', categoryId: 'less-5' },
        { id: 'i1-3', label: '0,8 + 3,4 (4,2)', categoryId: 'less-5' },
        { id: 'i1-4', label: '6 - 1,8 (4,2)', categoryId: 'less-5' },
        { id: 'i1-5', label: '3,2 + 1,8 (5,0)', categoryId: 'exact-5' },
        { id: 'i1-6', label: '7,5 - 2,5 (5,0)', categoryId: 'exact-5' },
        { id: 'i1-7', label: '1,25 + 3,75 (5,0)', categoryId: 'exact-5' },
        { id: 'i1-8', label: '10 - 5,0 (5,0)', categoryId: 'exact-5' },
        { id: 'i1-9', label: '3,8 + 2,4 (6,2)', categoryId: 'greater-5' },
        { id: 'i1-10', label: '9,1 - 3,2 (5,9)', categoryId: 'greater-5' },
        { id: 'i1-11', label: '4,5 + 1,7 (6,2)', categoryId: 'greater-5' },
        { id: 'i1-12', label: '8 - 2,2 (5,8)', categoryId: 'greater-5' }
      ]
    },

    // 2. SZINT: EREDMÉNY EGÉSZ RÉSZE SZERINT (6,x; 7,x; 8,x)
    2: {
      categories: [
        {
          id: 'range-6',
          name: '6 és 7 között (6,x)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'range-7',
          name: '7 és 8 között (7,x)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'range-8',
          name: '8 és 9 között (8,x)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '4,2 + 2,3 (6,5)', categoryId: 'range-6' },
        { id: 'i2-2', label: '8,9 - 2,4 (6,5)', categoryId: 'range-6' },
        { id: 'i2-3', label: '5,1 + 1,7 (6,8)', categoryId: 'range-6' },
        { id: 'i2-4', label: '10 - 3,25 (6,75)', categoryId: 'range-6' },
        { id: 'i2-5', label: '3,8 + 3,5 (7,3)', categoryId: 'range-7' },
        { id: 'i2-6', label: '12,4 - 4,8 (7,6)', categoryId: 'range-7' },
        { id: 'i2-7', label: '5,45 + 2,1 (7,55)', categoryId: 'range-7' },
        { id: 'i2-8', label: '9 - 1,6 (7,4)', categoryId: 'range-7' },
        { id: 'i2-9', label: '6,3 + 2,4 (8,7)', categoryId: 'range-8' },
        { id: 'i2-10', label: '15,2 - 6,8 (8,4)', categoryId: 'range-8' },
        { id: 'i2-11', label: '4,9 + 3,8 (8,7)', categoryId: 'range-8' },
        { id: 'i2-12', label: '11 - 2,75 (8,25)', categoryId: 'range-8' }
      ]
    },

    // 3. SZINT: KEREKÍTETT EGÉSZ ÉRTÉK
    3: {
      categories: [
        {
          id: 'round-10',
          name: '10-re kerekíthető',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        },
        {
          id: 'round-15',
          name: '15-re kerekíthető',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'round-20',
          name: '20-ra kerekíthető',
          badgeColor: 'bg-violet-100 text-violet-800 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '6,8 + 3,1 (9,9)', categoryId: 'round-10' },
        { id: 'i3-2', label: '14,2 - 4,4 (9,8)', categoryId: 'round-10' },
        { id: 'i3-3', label: '7,45 + 2,8 (10,25)', categoryId: 'round-10' },
        { id: 'i3-4', label: '12 - 1,8 (10,2)', categoryId: 'round-10' },
        { id: 'i3-5', label: '9,6 + 5,2 (14,8)', categoryId: 'round-15' },
        { id: 'i3-6', label: '20,4 - 5,6 (14,8)', categoryId: 'round-15' },
        { id: 'i3-7', label: '11,35 + 3,8 (15,15)', categoryId: 'round-15' },
        { id: 'i3-8', label: '18 - 2,75 (15,25)', categoryId: 'round-15' },
        { id: 'i3-9', label: '12,8 + 7,4 (20,2)', categoryId: 'round-20' },
        { id: 'i3-10', label: '25,1 - 5,3 (19,8)', categoryId: 'round-20' },
        { id: 'i3-11', label: '14,65 + 5,1 (19,75)', categoryId: 'round-20' },
        { id: 'i3-12', label: '30 - 9,85 (20,15)', categoryId: 'round-20' }
      ]
    }
  };

  return (
    <SorterTemplate
      level={level}
      grade={5}
      chapterId="tortek-tizedestortek"
      topicId="g5-decimal-add-sub-sorter"
      title="Tizedes törtek összeadásának és kivonásának csoportosítása"
      subtitle="Számold ki az eredményeket és húzd a műveleteket a megfelelő kategóriába!"
      badge="➕➖ 5. Osztály • Tizedes törtek összeadása és kivonása"
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

export default DecimalAdditionSubtractionSorter;
