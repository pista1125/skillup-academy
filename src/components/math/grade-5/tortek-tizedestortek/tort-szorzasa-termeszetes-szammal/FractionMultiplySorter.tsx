import React, { useState, useEffect } from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface FractionMultiplySorterProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function FractionMultiplySorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level: propLevel,
  onNextLevel,
  onOpenRules
}: FractionMultiplySorterProps) {
  const safeLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
  const [level, setLevel] = useState<DifficultyLevel>(safeLevel);

  useEffect(() => {
    const nextLevel: DifficultyLevel = (typeof propLevel === 'number' ? propLevel : ((propLevel as any)?.level ?? 1)) as DifficultyLevel;
    setLevel(nextLevel);
  }, [propLevel]);

  const levelsConfig: Record<DifficultyLevel, SorterLevelConfig> = {
    // 1. SZINT: EREDMÉNY NAGYSÁGA 1 EGÉSZHEZ KÉPEST
    1: {
      level: 1,
      title: 'Eredmény nagysága 1-hez képest',
      description: 'Számítsd ki a szorzást, és csoportosítsd az 1-hez viszonyított értéke szerint!',
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
        { id: 'i1-1', label: '1/5 · 3', category: 'cat-less' },
        { id: 'i1-2', label: '2/7 · 2', category: 'cat-less' },
        { id: 'i1-3', label: '1/8 · 5', category: 'cat-less' },
        { id: 'i1-4', label: '3/10 · 2', category: 'cat-less' },
        { id: 'i1-5', label: '1/4 · 4', category: 'cat-equal' },
        { id: 'i1-6', label: '1/3 · 3', category: 'cat-equal' },
        { id: 'i1-7', label: '2/6 · 3', category: 'cat-equal' },
        { id: 'i1-8', label: '2/10 · 5', category: 'cat-equal' },
        { id: 'i1-9', label: '3/4 · 2', category: 'cat-greater' },
        { id: 'i1-10', label: '2/3 · 3', category: 'cat-greater' },
        { id: 'i1-11', label: '4/5 · 2', category: 'cat-greater' },
        { id: 'i1-12', label: '1 1/2 · 2', category: 'cat-greater' }
      ]
    },

    // 2. SZINT: SZORZÁS MÓDSZERE ÉS JELLEGE
    2: {
      level: 2,
      title: 'Alkalmazott szorzási módszer',
      description: 'Döntsd el, hogy a feladatban a számlálót szorozzuk, a nevezőt osztjuk, vagy egész számot kapunk!',
      categories: [
        {
          id: 'cat-num-mult',
          name: 'Csak számláló szorzása',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-den-div',
          name: 'Nevező osztása (egyszerűsítés)',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
        },
        {
          id: 'cat-whole-res',
          name: 'Egész szám végeredmény',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        }
      ],
      items: [
        { id: 'i2-1', label: '2/7 · 3', category: 'cat-num-mult' },
        { id: 'i2-2', label: '1/9 · 4', category: 'cat-num-mult' },
        { id: 'i2-3', label: '3/11 · 2', category: 'cat-num-mult' },
        { id: 'i2-4', label: '2/5 · 2', category: 'cat-num-mult' },
        { id: 'i2-5', label: '3/8 · 2', category: 'cat-den-div' },
        { id: 'i2-6', label: '5/12 · 3', category: 'cat-den-div' },
        { id: 'i2-7', label: '2/9 · 3', category: 'cat-den-div' },
        { id: 'i2-8', label: '7/10 · 2', category: 'cat-den-div' },
        { id: 'i2-9', label: '3/4 · 4', category: 'cat-whole-res' },
        { id: 'i2-10', label: '1/6 · 12', category: 'cat-whole-res' },
        { id: 'i2-11', label: '2/5 · 10', category: 'cat-whole-res' },
        { id: 'i2-12', label: '3/8 · 8', category: 'cat-whole-res' }
      ]
    },

    // 3. SZINT: VÉGEREDMÉNY ÉRTÉKE
    3: {
      level: 3,
      title: 'Végeredmény értéke',
      description: 'Számítsd ki a szorzást, és dobd a kapott pontos érték kategóriájába!',
      categories: [
        {
          id: 'cat-one',
          name: '= 1',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
        },
        {
          id: 'cat-two',
          name: '= 2',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800'
        },
        {
          id: 'cat-three',
          name: '= 3',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800'
        },
        {
          id: 'cat-frac',
          name: 'Tört érték (nem egész)',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
        }
      ],
      items: [
        { id: 'i3-1', label: '1/3 · 3', category: 'cat-one' },
        { id: 'i3-2', label: '1/5 · 5', category: 'cat-one' },
        { id: 'i3-3', label: '2/8 · 4', category: 'cat-one' },
        { id: 'i3-4', label: '1/2 · 4', category: 'cat-two' },
        { id: 'i3-5', label: '2/3 · 3', category: 'cat-two' },
        { id: 'i3-6', label: '4/6 · 3', category: 'cat-two' },
        { id: 'i3-7', label: '1/2 · 6', category: 'cat-three' },
        { id: 'i3-8', label: '3/4 · 4', category: 'cat-three' },
        { id: 'i3-9', label: '1 1/2 · 2', category: 'cat-three' },
        { id: 'i3-10', label: '2/5 · 3', category: 'cat-frac' },
        { id: 'i3-11', label: '3/8 · 3', category: 'cat-frac' },
        { id: 'i3-12', label: '1/4 · 5', category: 'cat-frac' }
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
      topicId="g5-frac-mult-sorter"
      badge="✖️ 5. Osztály • Tört szorzása természetes számmal"
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

export default FractionMultiplySorter;
