import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface IntegerDivisionSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'neg',
        name: 'Hányados < 0 (Negatív)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'zero',
        name: 'Hányados = 0 (Nulla)',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      },
      {
        id: 'pos',
        name: 'Hányados > 0 (Pozitív)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's1-1', label: '(-30) : (-6)', category: 'pos' },
      { id: 's1-2', label: '(+45) : (-9)', category: 'neg' },
      { id: 's1-3', label: '0 : (-15)', category: 'zero' },
      { id: 's1-4', label: '(-28) : (+4)', category: 'neg' },
      { id: 's1-5', label: '(-80) : (-8)', category: 'pos' },
      { id: 's1-6', label: '0 : (+50)', category: 'zero' },
      { id: 's1-7', label: '(+56) : (+7)', category: 'pos' },
      { id: 's1-8', label: '(-63) : (+7)', category: 'neg' },
      { id: 's1-9', label: '0 : (+24)', category: 'zero' },
      { id: 's1-10', label: '(-100) : (-4)', category: 'pos' }
    ]
  },
  2: {
    categories: [
      {
        id: 'small',
        name: 'Kisebb, mint -5 (< -5)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'mid',
        name: '-5 és +5 között',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'large',
        name: 'Nagyobb, mint +5 (> +5)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      }
    ],
    items: [
      { id: 's2-1', label: '(-48) : (+6)', category: 'small' },
      { id: 's2-2', label: '(-36) : (-12)', category: 'mid' },
      { id: 's2-3', label: '(-70) : (-7)', category: 'large' },
      { id: 's2-4', label: '(+60) : (-6)', category: 'small' },
      { id: 's2-5', label: '(-16) : (+4)', category: 'mid' },
      { id: 's2-6', label: '(+81) : (+9)', category: 'large' },
      { id: 's2-7', label: '(-25) : (+5)', category: 'mid' },
      { id: 's2-8', label: '(-120) : (+10)', category: 'small' },
      { id: 's2-9', label: '0 : (-9)', category: 'mid' },
      { id: 's2-10', label: '(-144) : (-12)', category: 'large' }
    ]
  },
  3: {
    categories: [
      {
        id: 'even-pos',
        name: 'Pozitív páros egész',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'even-neg',
        name: 'Negatív páros egész',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'odd-or-zero',
        name: 'Páratlan vagy 0',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      }
    ],
    items: [
      { id: 's3-1', label: '(-48) : (-6)', category: 'even-pos' },
      { id: 's3-2', label: '(-36) : (+6)', category: 'even-neg' },
      { id: 's3-3', label: '(-35) : (-7)', category: 'odd-or-zero' },
      { id: 's3-4', label: '(+64) : (-8)', category: 'even-neg' },
      { id: 's3-5', label: '(-100) : (-10)', category: 'even-pos' },
      { id: 's3-6', label: '0 : (-50)', category: 'odd-or-zero' },
      { id: 's3-7', label: '(-27) : (+3)', category: 'odd-or-zero' },
      { id: 's3-8', label: '(+72) : (+6)', category: 'even-pos' },
      { id: 's3-9', label: '(-40) : (+4)', category: 'even-neg' },
      { id: 's3-10', label: '(-99) : (-11)', category: 'odd-or-zero' }
    ]
  }
};

export function IntegerDivisionSorter({
  level,
  onNextLevel,
  onOpenRules
}: IntegerDivisionSorterProps) {
  return (
    <SorterTemplate
      level={level}
      title="Egész számok osztása csoportosító játék"
      subtitle="Húzd vagy kattints a kifejezésre, majd válaszd ki a megfelelő kategóriát!"
      levels={SORTER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
