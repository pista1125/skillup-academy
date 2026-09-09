import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface IntegerMultiplicationSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'neg',
        name: 'Szorzat < 0 (Negatív)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'zero',
        name: 'Szorzat = 0 (Nulla)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      },
      {
        id: 'pos',
        name: 'Szorzat > 0 (Pozitív)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '(-5) · (-6)', category: 'pos' },
      { id: 's1-2', label: '(+8) · (-3)', category: 'neg' },
      { id: 's1-3', label: '(-7) · 0', category: 'zero' },
      { id: 's1-4', label: '(+4) · (+9)', category: 'pos' },
      { id: 's1-5', label: '(-12) · (+2)', category: 'neg' },
      { id: 's1-6', label: '0 · (+15)', category: 'zero' },
      { id: 's1-7', label: '(-1) · (-1)', category: 'pos' },
      { id: 's1-8', label: '(-10) · (+5)', category: 'neg' },
      { id: 's1-9', label: '(-25) · 0', category: 'zero' },
      { id: 's1-10', label: '(-3) · (-7)', category: 'pos' }
    ]
  },
  2: {
    categories: [
      {
        id: 'small',
        name: 'Kisebb, mint -20 (< -20)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'mid',
        name: '-20 és +20 között',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'large',
        name: 'Nagyobb, mint +20 (> +20)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', label: '(-6) · (+5)', category: 'small' },
      { id: 's2-2', label: '(-7) · (-4)', category: 'large' },
      { id: 's2-3', label: '(-3) · (+4)', category: 'mid' },
      { id: 's2-4', label: '(-10) · (+3)', category: 'small' },
      { id: 's2-5', label: '(+8) · (+4)', category: 'large' },
      { id: 's2-6', label: '(-2) · (-5)', category: 'mid' },
      { id: 's2-7', label: '(-15) · (-2)', category: 'large' },
      { id: 's2-8', label: '(+5) · (-5)', category: 'small' },
      { id: 's2-9', label: '0 · (-100)', category: 'mid' },
      { id: 's2-10', label: '(-9) · (+3)', category: 'small' }
    ]
  },
  3: {
    categories: [
      {
        id: 'even',
        name: 'Páros számú mínusz (+)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'odd',
        name: 'Páratlan számú mínusz (-)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'zero',
        name: 'Nulla tényező (= 0)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      }
    ],
    items: [
      { id: 's3-1', label: '(-2) · (-3) · (-4)', category: 'odd' },
      { id: 's3-2', label: '(-1) · (-2) · (-3) · (-4)', category: 'even' },
      { id: 's3-3', label: '(-5) · (+4) · 0', category: 'zero' },
      { id: 's3-4', label: '(-2)³', category: 'odd' },
      { id: 's3-5', label: '(-3)²', category: 'even' },
      { id: 's3-6', label: '(-6) · (-1) · (+2)', category: 'even' },
      { id: 's3-7', label: '(-10) · (+2) · (-3) · (-1)', category: 'odd' },
      { id: 's3-8', label: '0 · (-8) · (-9)', category: 'zero' },
      { id: 's3-9', label: '(-1)⁵', category: 'odd' },
      { id: 's3-10', label: '(-1)⁶', category: 'even' }
    ]
  }
};

export function IntegerMultiplicationSorter({
  level,
  onNextLevel,
  onOpenRules
}: IntegerMultiplicationSorterProps) {
  return (
    <SorterTemplate
      level={level}
      title="Egész számok szorzása csoportosító feladvány"
      subtitle="Válaszd ki a szorzási kifejezést, majd helyezd a megfelelő csoportba!"
      levels={SORTER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
