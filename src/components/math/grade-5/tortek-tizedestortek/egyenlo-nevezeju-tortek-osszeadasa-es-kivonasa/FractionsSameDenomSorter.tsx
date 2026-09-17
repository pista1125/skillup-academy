import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { Button } from '@/components/ui/button';
import { Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsSameDenomSorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionsSameDenomSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionsSameDenomSorterProps) {
  const [level, setLevel] = useState<DifficultyLevel>(propLevel || 1);

  useEffect(() => {
    if (propLevel) {
      setLevel(propLevel);
    }
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: MŰVELET EREDMÉNYÉNEK NAGYSÁGA 1 EGÉSZHEZ KÉPEST
    1: {
      level: 1,
      title: 'Művelet eredménye 1 egészhez képest',
      description: 'Számítsd ki a műveletet gondolatban, és csoportosítsd az 1-hez viszonyított értéke szerint!',
      categories: [
        {
          id: 'cat-less',
          name: 'Kisebb, mint 1 (< 1)',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-equal',
          name: 'Pontosan 1 egész (= 1)',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-greater',
          name: 'Nagyobb, mint 1 (> 1)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        { id: 'i1-1', label: '1/5 + 2/5', category: 'cat-less' },
        { id: 'i1-2', label: '7/8 - 3/8', category: 'cat-less' },
        { id: 'i1-3', label: '1 - 2/3', category: 'cat-less' },
        { id: 'i1-4', label: '9/10 - 4/10', category: 'cat-less' },
        { id: 'i1-5', label: '3/4 + 1/4', category: 'cat-equal' },
        { id: 'i1-6', label: '2/5 + 3/5', category: 'cat-equal' },
        { id: 'i1-7', label: '5/7 + 2/7', category: 'cat-equal' },
        { id: 'i1-8', label: '10/10 - 0/10', category: 'cat-equal' },
        { id: 'i1-9', label: '4/5 + 3/5', category: 'cat-greater' },
        { id: 'i1-10', label: '5/6 + 2/6', category: 'cat-greater' },
        { id: 'i1-11', label: '1 1/4 + 1/4', category: 'cat-greater' },
        { id: 'i1-12', label: '2 - 1/5', category: 'cat-greater' }
      ]
    },

    // 2. SZINT: EGYSZERŰSÍTETT ÉRTÉKEK SZERINT
    2: {
      level: 2,
      title: 'Egyszerűsített értékek kategóriái',
      description: 'Hozd a legegyszerűbb alakra az eredményt, és dobd a megfelelő kategóriába!',
      categories: [
        {
          id: 'cat-half',
          name: '= 1/2',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-two-thirds',
          name: '= 2/3',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-three-fourths',
          name: '= 3/4',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-other',
          name: 'Más érték',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
        }
      ],
      items: [
        { id: 'i2-1', label: '1/4 + 1/4', category: 'cat-half' },
        { id: 'i2-2', label: '5/8 - 1/8', category: 'cat-half' },
        { id: 'i2-3', label: '7/10 - 2/10', category: 'cat-half' },
        { id: 'i2-4', label: '1/3 + 1/3', category: 'cat-two-thirds' },
        { id: 'i2-5', label: '5/6 - 1/6', category: 'cat-two-thirds' },
        { id: 'i2-6', label: '7/9 - 1/9', category: 'cat-two-thirds' },
        { id: 'i2-7', label: '1/4 + 2/4', category: 'cat-three-fourths' },
        { id: 'i2-8', label: '7/8 - 1/8', category: 'cat-three-fourths' },
        { id: 'i2-9', label: '5/8 + 1/8', category: 'cat-three-fourths' },
        { id: 'i2-10', label: '1/5 + 1/5', category: 'cat-other' },
        { id: 'i2-11', label: '1 - 1/5', category: 'cat-other' },
        { id: 'i2-12', label: '2/7 + 3/7', category: 'cat-other' }
      ]
    },

    // 3. SZINT: EREDMÉNY ALAKJA (VALÓDI TÖRT, EGÉSZ SZÁM, VEGYES TÖRT)
    3: {
      level: 3,
      title: 'Eredmény alakja és típusa',
      description: 'Határozd meg, milyen formátumban fejezhető ki a kapott végeredmény!',
      categories: [
        {
          id: 'cat-prop-frac',
          name: 'Valódi tört (< 1)',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300 dark:border-teal-800'
        },
        {
          id: 'cat-whole-num',
          name: 'Egész szám',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        },
        {
          id: 'cat-mixed-frac',
          name: 'Vegyes tört (> 1)',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '1/7 + 3/7', category: 'cat-prop-frac' },
        { id: 'i3-2', label: '5/9 - 2/9', category: 'cat-prop-frac' },
        { id: 'i3-3', label: '1 - 3/4', category: 'cat-prop-frac' },
        { id: 'i3-4', label: '7/10 - 3/10', category: 'cat-prop-frac' },
        { id: 'i3-5', label: '3/3', category: 'cat-whole-num' },
        { id: 'i3-6', label: '2/5 + 3/5', category: 'cat-whole-num' },
        { id: 'i3-7', label: '2 1/4 + 3/4', category: 'cat-whole-num' },
        { id: 'i3-8', label: '4 - 1', category: 'cat-whole-num' },
        { id: 'i3-9', label: '4/3 + 1/3', category: 'cat-mixed-frac' },
        { id: 'i3-10', label: '2 1/5 + 1 2/5', category: 'cat-mixed-frac' },
        { id: 'i3-11', label: '5/4 + 2/4', category: 'cat-mixed-frac' },
        { id: 'i3-12', label: '3 4/7 - 1 1/7', category: 'cat-mixed-frac' }
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
      topicId="g5-same-denom-sorter"
      badge="➕ 5. Osztály • Törtek összeadása és kivonása"
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

export default FractionsSameDenomSorter;
