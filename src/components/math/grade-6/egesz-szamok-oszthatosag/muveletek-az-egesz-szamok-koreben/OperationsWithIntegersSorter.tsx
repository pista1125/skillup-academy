import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface OperationsWithIntegersSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'neg',
        name: 'Eredmény < 0 (Negatív)',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300'
      },
      {
        id: 'zero',
        name: 'Eredmény = 0 (Nulla)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      },
      {
        id: 'pos',
        name: 'Eredmény > 0 (Pozitív)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '(-8) + (-2)', category: 'neg' },
      { id: 's1-2', label: '(+12) + (-5)', category: 'pos' },
      { id: 's1-3', label: '(-7) + (+7)', category: 'zero' },
      { id: 's1-4', label: '(-15) + (+20)', category: 'pos' },
      { id: 's1-5', label: '(-4) + (-6)', category: 'neg' },
      { id: 's1-6', label: '0 + 0', category: 'zero' },
      { id: 's1-7', label: '(+3) + (-10)', category: 'neg' },
      { id: 's1-8', label: '(+25) + (+5)', category: 'pos' },
      { id: 's1-9', label: '(-9) + (+9)', category: 'zero' },
      { id: 's1-10', label: '(-1) + (-1)', category: 'neg' }
    ]
  },
  2: {
    categories: [
      {
        id: 'small',
        name: 'Kisebb, mint -10 (< -10)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      },
      {
        id: 'mid',
        name: '-10 és +10 között',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'large',
        name: 'Nagyobb, mint +10 (> +10)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '(-8) - (+15)', category: 'small' },
      { id: 's2-2', label: '15 - (-10)', category: 'large' },
      { id: 's2-3', label: '(-5) + (+8)', category: 'mid' },
      { id: 's2-4', label: '(-20) - (-5)', category: 'small' },
      { id: 's2-5', label: '30 - (+10)', category: 'large' },
      { id: 's2-6', label: '(-4) - (+3)', category: 'mid' },
      { id: 's2-7', label: '(-50) + (+45)', category: 'mid' },
      { id: 's2-8', label: '12 - (-8)', category: 'large' },
      { id: 's2-9', label: '(-7) - (+12)', category: 'small' },
      { id: 's2-10', label: '0 - (-6)', category: 'mid' }
    ]
  },
  3: {
    categories: [
      {
        id: 'sum',
        name: 'Egyszerűsítve: a + b',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'diff',
        name: 'Egyszerűsítve: a - b',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'neg_sum',
        name: 'Egyszerűsítve: -a - b',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: 'a - (-b)', category: 'sum' },
      { id: 's3-2', label: 'a + (-b)', category: 'diff' },
      { id: 's3-3', label: '-a + (-b)', category: 'neg_sum' },
      { id: 's3-4', label: 'a - (+b)', category: 'diff' },
      { id: 's3-5', label: 'a + (+b)', category: 'sum' },
      { id: 's3-6', label: '-a - (+b)', category: 'neg_sum' },
      { id: 's3-7', label: '-(-a) - (-b)', category: 'sum' },
      { id: 's3-8', label: '-(-a) + (-b)', category: 'diff' },
      { id: 's3-9', label: '(-a) + (-b)', category: 'neg_sum' },
      { id: 's3-10', label: 'a - (-b) forma', category: 'sum' }
    ]
  }
};

export function OperationsWithIntegersSorter({
  level,
  onNextLevel,
  onOpenRules
}: OperationsWithIntegersSorterProps) {
  return (
    <SorterTemplate
      level={level}
      title="Egész számok csoportosító feladvány"
      subtitle="Válaszd ki a kártyát, majd kattints a megfelelő csoportra!"
      levels={SORTER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
