import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { MoveHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsNumberLineSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsNumberLineSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsNumberLineSorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: MELYIK KÉT EGÉSZ KÖZÉ ESIK A SZÁMEGYENESEN?
    1: {
      level: 1,
      title: 'Melyik két egész közé esik a számegyenesen?',
      description: 'Húzd vagy kattintsd a törteket a megfelelő számegyenes szakaszhoz!',
      categories: [
        {
          id: 'cat-0-1',
          name: '0 és 1 között',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-1-2',
          name: '1 és 2 között',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-2-3',
          name: '2 és 3 között',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '1/2', category: 'cat-0-1' },
        { id: 'i1-2', label: '3/4', category: 'cat-0-1' },
        { id: 'i1-3', label: '4/5', category: 'cat-0-1' },
        { id: 'i1-4', label: '7/8', category: 'cat-0-1' },
        { id: 'i1-5', label: '5/4', category: 'cat-1-2' },
        { id: 'i1-6', label: '3/2', category: 'cat-1-2' },
        { id: 'i1-7', label: '1 1/3', category: 'cat-1-2' },
        { id: 'i1-8', label: '7/5', category: 'cat-1-2' },
        { id: 'i1-9', label: '7/3', category: 'cat-2-3' },
        { id: 'i1-10', label: '5/2', category: 'cat-2-3' },
        { id: 'i1-11', label: '2 1/4', category: 'cat-2-3' },
        { id: 'i1-12', label: '11/4', category: 'cat-2-3' }
      ]
    },

    // 2. SZINT: CSOPORTOSÍTÁS AZ EGÉSZ RÉSZ SZERINT
    2: {
      level: 2,
      title: 'Csoportosítás az egész rész nagysága szerint',
      description: 'Számold ki az egész részt, és sorold be a törtet a megfelelő csoportba!',
      categories: [
        {
          id: 'cat-whole-1',
          name: 'Egész része = 1',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-whole-2',
          name: 'Egész része = 2',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-whole-3',
          name: 'Egész része = 3',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '4/3', category: 'cat-whole-1' },
        { id: 'i2-2', label: '6/5', category: 'cat-whole-1' },
        { id: 'i2-3', label: '9/8', category: 'cat-whole-1' },
        { id: 'i2-4', label: '1 3/4', category: 'cat-whole-1' },
        { id: 'i2-5', label: '8/3', category: 'cat-whole-2' },
        { id: 'i2-6', label: '11/5', category: 'cat-whole-2' },
        { id: 'i2-7', label: '13/6', category: 'cat-whole-2' },
        { id: 'i2-8', label: '2 1/2', category: 'cat-whole-2' },
        { id: 'i2-9', label: '10/3', category: 'cat-whole-3' },
        { id: 'i2-10', label: '13/4', category: 'cat-whole-3' },
        { id: 'i2-11', label: '17/5', category: 'cat-whole-3' },
        { id: 'i2-12', label: '3 1/2', category: 'cat-whole-3' }
      ]
    },

    // 3. SZINT: TÖRTFAJTA ÉS ÉRTÉKTARTOMÁNY
    3: {
      level: 3,
      title: 'Törtfajta és értéktartomány',
      description: 'Válogasd szét a valódi törteket, a kisebb vegyes törteket és a nagy értékű törteket!',
      categories: [
        {
          id: 'cat-proper',
          name: 'Valódi tört (< 1)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-mid-mixed',
          name: 'Vegyes tört (1 és 3 között)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-large-mixed',
          name: 'Nagy vegyes tört (> 3 egész)',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '2/3', category: 'cat-proper' },
        { id: 'i3-2', label: '5/6', category: 'cat-proper' },
        { id: 'i3-3', label: '7/10', category: 'cat-proper' },
        { id: 'i3-4', label: '3/8', category: 'cat-proper' },
        { id: 'i3-5', label: '7/4', category: 'cat-mid-mixed' },
        { id: 'i3-6', label: '11/4', category: 'cat-mid-mixed' },
        { id: 'i3-7', label: '2 1/3', category: 'cat-mid-mixed' },
        { id: 'i3-8', label: '1 4/5', category: 'cat-mid-mixed' },
        { id: 'i3-9', label: '17/4', category: 'cat-large-mixed' },
        { id: 'i3-10', label: '23/5', category: 'cat-large-mixed' },
        { id: 'i3-11', label: '31/6', category: 'cat-large-mixed' },
        { id: 'i3-12', label: '7 1/2', category: 'cat-large-mixed' }
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
      topicId="g5-frac-sec-3-sorter"
      badge="📏 5. Osztály • Törtek a számegyenesen"
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

export default FractionsNumberLineSorter;
