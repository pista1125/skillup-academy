import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'neg',
        name: 'Negatív eredmény (< 0)',
        badgeColor:
          'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300'
      },
      {
        id: 'zero',
        name: 'Nulla (= 0)',
        badgeColor:
          'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      },
      {
        id: 'pos',
        name: 'Pozitív eredmény (> 0)',
        badgeColor:
          'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '+8 ellentettje', category: 'neg' },
      { id: 's1-2', label: '|-15| értéke', category: 'pos' },
      { id: 's1-3', label: '0 ellentettje', category: 'zero' },
      { id: 's1-4', label: '-(-12)', category: 'pos' },
      { id: 's1-5', label: '-|-6|', category: 'neg' },
      { id: 's1-6', label: '|0| értéke', category: 'zero' },
      { id: 's1-7', label: '-100 ellentettje', category: 'pos' },
      { id: 's1-8', label: '-(+25)', category: 'neg' },
      { id: 's1-9', label: '|-4| + |+3|', category: 'pos' },
      { id: 's1-10', label: '0 abszolút értéke', category: 'zero' }
    ]
  },
  2: {
    categories: [
      {
        id: 'small',
        name: 'Kisebb, mint 5 (|x| < 5)',
        badgeColor:
          'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      },
      {
        id: 'mid',
        name: 'Pontosan 5 (|x| = 5)',
        badgeColor:
          'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'large',
        name: 'Nagyobb, mint 5 (|x| > 5)',
        badgeColor:
          'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '|-5|', category: 'mid' },
      { id: 's2-2', label: '|+3|', category: 'small' },
      { id: 's2-3', label: '|-12|', category: 'large' },
      { id: 's2-4', label: '|+5|', category: 'mid' },
      { id: 's2-5', label: '|-1|', category: 'small' },
      { id: 's2-6', label: '|0|', category: 'small' },
      { id: 's2-7', label: '|+50|', category: 'large' },
      { id: 's2-8', label: '|-8|', category: 'large' },
      { id: 's2-9', label: '|-(-5)|', category: 'mid' },
      { id: 's2-10', label: '|-4|', category: 'small' }
    ]
  },
  3: {
    categories: [
      {
        id: 'neg',
        name: 'Eredmény < 0 (Negatív)',
        badgeColor:
          'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300'
      },
      {
        id: 'zero',
        name: 'Eredmény = 0 (Nulla)',
        badgeColor:
          'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      },
      {
        id: 'pos',
        name: 'Eredmény > 0 (Pozitív)',
        badgeColor:
          'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's3-1', label: '(-9) + (+9)', category: 'zero' },
      { id: 's3-2', label: '-|-18|', category: 'neg' },
      { id: 's3-3', label: '|-14| - |-10|', category: 'pos' },
      { id: 's3-4', label: '-(-(-7))', category: 'neg' },
      { id: 's3-5', label: '| -5 | · 0', category: 'zero' },
      { id: 's3-6', label: '-( -(-(-10)) )', category: 'pos' },
      { id: 's3-7', label: '|-3| - |-3|', category: 'zero' },
      { id: 's3-8', label: '|-25| : |-5|', category: 'pos' },
      { id: 's3-9', label: '-|-100|', category: 'neg' },
      { id: 's3-10', label: '(-6) ellentettje', category: 'pos' }
    ]
  }
};

export interface OppositeAbsoluteSorterProps {
  onBack: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
}

export function OppositeAbsoluteSorter({
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  level = 1
}: OppositeAbsoluteSorterProps) {
  return (
    <SorterTemplate
      title="Ellentett és Abszolút Érték - Csoportosítás"
      badge="🔄 5. Osztály • I. Az egész számok"
      level={level}
      levels={SORTER_LEVELS}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default OppositeAbsoluteSorter;
