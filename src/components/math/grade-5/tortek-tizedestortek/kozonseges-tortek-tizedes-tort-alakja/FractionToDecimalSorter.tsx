import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionToDecimalSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  [key: string]: any;
}

export function FractionToDecimalSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionToDecimalSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: ÉRTÉK ÖSSZEHASONLÍTÁSA 0,5-HÖZ (FÉLHEZ)
    1: {
      categories: [
        {
          id: 'less-half',
          name: 'Kisebb mint 0,5 (< 0,5)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'exact-half',
          name: 'Pontosan 0,5 (= 0,5)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'greater-half',
          name: 'Nagyobb mint 0,5 (> 0,5)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '1/4 (0,25)', categoryId: 'less-half' },
        { id: 'i1-2', label: '1/5 (0,2)', categoryId: 'less-half' },
        { id: 'i1-3', label: '3/10 (0,3)', categoryId: 'less-half' },
        { id: 'i1-4', label: '1/8 (0,125)', categoryId: 'less-half' },
        { id: 'i1-5', label: '1/2 (0,5)', categoryId: 'exact-half' },
        { id: 'i1-6', label: '2/4 (0,5)', categoryId: 'exact-half' },
        { id: 'i1-7', label: '5/10 (0,5)', categoryId: 'exact-half' },
        { id: 'i1-8', label: '4/8 (0,5)', categoryId: 'exact-half' },
        { id: 'i1-9', label: '3/4 (0,75)', categoryId: 'greater-half' },
        { id: 'i1-10', label: '4/5 (0,8)', categoryId: 'greater-half' },
        { id: 'i1-11', label: '7/10 (0,7)', categoryId: 'greater-half' },
        { id: 'i1-12', label: '5/8 (0,625)', categoryId: 'greater-half' }
      ]
    },

    // 2. SZINT: TIZEDESJEGYEK SZÁMA A TIZEDES TÖRT ALAKBAN
    2: {
      categories: [
        {
          id: 'dec-1',
          name: '1 tizedesjegy (tizedek)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'dec-2',
          name: '2 tizedesjegy (századok)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'dec-3',
          name: '3 tizedesjegy (ezredek)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '1/2 (0,5)', categoryId: 'dec-1' },
        { id: 'i2-2', label: '3/5 (0,6)', categoryId: 'dec-1' },
        { id: 'i2-3', label: '7/10 (0,7)', categoryId: 'dec-1' },
        { id: 'i2-4', label: '4/5 (0,8)', categoryId: 'dec-1' },
        { id: 'i2-5', label: '1/4 (0,25)', categoryId: 'dec-2' },
        { id: 'i2-6', label: '3/4 (0,75)', categoryId: 'dec-2' },
        { id: 'i2-7', label: '7/20 (0,35)', categoryId: 'dec-2' },
        { id: 'i2-8', label: '12/25 (0,48)', categoryId: 'dec-2' },
        { id: 'i2-9', label: '1/8 (0,125)', categoryId: 'dec-3' },
        { id: 'i2-10', label: '3/8 (0,375)', categoryId: 'dec-3' },
        { id: 'i2-11', label: '5/8 (0,625)', categoryId: 'dec-3' },
        { id: 'i2-12', label: '7/8 (0,875)', categoryId: 'dec-3' }
      ]
    },

    // 3. SZINT: ÉRTÉK 1 EGÉSZHEZ KÉPEST
    3: {
      categories: [
        {
          id: 'proper',
          name: 'Valódi tört (< 1)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'whole',
          name: 'Egész szám (= 1)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'improper',
          name: 'Vegyes tört / Áltört (> 1)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '3/8 (0,375)', categoryId: 'proper' },
        { id: 'i3-2', label: '2/5 (0,4)', categoryId: 'proper' },
        { id: 'i3-3', label: '7/100 (0,07)', categoryId: 'proper' },
        { id: 'i3-4', label: '9/20 (0,45)', categoryId: 'proper' },
        { id: 'i3-5', label: '4/4 (1,0)', categoryId: 'whole' },
        { id: 'i3-6', label: '5/5 (1,0)', categoryId: 'whole' },
        { id: 'i3-7', label: '10/10 (1,0)', categoryId: 'whole' },
        { id: 'i3-8', label: '8/8 (1,0)', categoryId: 'whole' },
        { id: 'i3-9', label: '1 és 1/2 (1,5)', categoryId: 'improper' },
        { id: 'i3-10', label: '5/4 (1,25)', categoryId: 'improper' },
        { id: 'i3-11', label: '2 és 3/4 (2,75)', categoryId: 'improper' },
        { id: 'i3-12', label: '11/10 (1,1)', categoryId: 'improper' }
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
      title="Közönséges törtek tizedes tört alakja – Csoportosító játék"
      subtitle="Válogasd szét a törteket és tizedes alakjukat a megfelelő kategóriákba!"
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
      topicId="g5-fraction-to-decimal-sorter"
      themeColor="purple"
    />
  );
}
export default FractionToDecimalSorter;
