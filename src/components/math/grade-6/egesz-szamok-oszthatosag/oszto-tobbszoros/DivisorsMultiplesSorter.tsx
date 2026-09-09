import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DivisorsMultiplesSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'div-24',
        name: 'A 24 osztója',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'mult-24',
        name: 'A 24 többszöröse',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      },
      {
        id: 'neither-24',
        name: 'Egyik sem',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      }
    ],
    items: [
      { id: 'ds1-1', label: '6', category: 'div-24' },
      { id: 'ds1-2', label: '48', category: 'mult-24' },
      { id: 'ds1-3', label: '8', category: 'div-24' },
      { id: 'ds1-4', label: '72', category: 'mult-24' },
      { id: 'ds1-5', label: '5', category: 'neither-24' },
      { id: 'ds1-6', label: '1', category: 'div-24' },
      { id: 'ds1-7', label: '120', category: 'mult-24' },
      { id: 'ds1-8', label: '12', category: 'div-24' },
      { id: 'ds1-9', label: '14', category: 'neither-24' },
      { id: 'ds1-10', label: '240', category: 'mult-24' }
    ]
  },
  2: {
    categories: [
      {
        id: 'prime',
        name: 'Prímszám (2 db osztó)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'comp-few',
        name: 'Összetett szám (3-5 osztó)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'comp-many',
        name: 'Sok osztójú szám (≥ 6 osztó)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 'ds2-1', label: '7 (osztók: 1, 7)', category: 'prime' },
      { id: 'ds2-2', label: '12 (osztók: 1,2,3,4,6,12)', category: 'comp-many' },
      { id: 'ds2-3', label: '9 (osztók: 1,3,9)', category: 'comp-few' },
      { id: 'ds2-4', label: '13 (osztók: 1, 13)', category: 'prime' },
      { id: 'ds2-5', label: '20 (osztók: 1,2,4,5,10,20)', category: 'comp-many' },
      { id: 'ds2-6', label: '19 (osztók: 1, 19)', category: 'prime' },
      { id: 'ds2-7', label: '8 (osztók: 1,2,4,8)', category: 'comp-few' },
      { id: 'ds2-8', label: '24 (8 db osztó)', category: 'comp-many' },
      { id: 'ds2-9', label: '25 (osztók: 1,5,25)', category: 'comp-few' },
      { id: 'ds2-10', label: '36 (9 db osztó)', category: 'comp-many' }
    ]
  },
  3: {
    categories: [
      {
        id: 'mult-6',
        name: 'A 6 többszöröse (nem 10-é)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'mult-10',
        name: 'A 10 többszöröse (nem 6-é)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      },
      {
        id: 'common-mult',
        name: 'Közös többszörös (6 és 10)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 'ds3-1', label: '18', category: 'mult-6' },
      { id: 'ds3-2', label: '50', category: 'mult-10' },
      { id: 'ds3-3', label: '30', category: 'common-mult' },
      { id: 'ds3-4', label: '42', category: 'mult-6' },
      { id: 'ds3-5', label: '70', category: 'mult-10' },
      { id: 'ds3-6', label: '60', category: 'common-mult' },
      { id: 'ds3-7', label: '24', category: 'mult-6' },
      { id: 'ds3-8', label: '90', category: 'common-mult' },
      { id: 'ds3-9', label: '100', category: 'mult-10' },
      { id: 'ds3-10', label: '120', category: 'common-mult' }
    ]
  }
};

export function DivisorsMultiplesSorter({
  level,
  onNextLevel,
  onOpenRules
}: DivisorsMultiplesSorterProps) {
  return (
    <SorterTemplate
      level={level}
      title="Osztó, többszörös csoportosító játék"
      subtitle="Húzd vagy kattints a számra, és helyezd a megfelelő kategóriába!"
      levels={SORTER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
