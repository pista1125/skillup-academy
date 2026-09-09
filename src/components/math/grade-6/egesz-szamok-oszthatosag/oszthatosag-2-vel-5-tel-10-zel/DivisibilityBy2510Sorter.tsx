import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DivisibilityBy2510SorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'div-2-only',
        name: 'Csak 2-vel osztható (nem 5-tel)',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300'
      },
      {
        id: 'div-5-only',
        name: 'Csak 5-tel osztható (5-re végződik)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'div-10-both',
        name: '10-zel osztható (2-vel ÉS 5-tel is)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 'dbs1-1', label: '48 (utolsó: 8)', category: 'div-2-only' },
      { id: 'dbs1-2', label: '75 (utolsó: 5)', category: 'div-5-only' },
      { id: 'dbs1-3', label: '130 (utolsó: 0)', category: 'div-10-both' },
      { id: 'dbs1-4', label: '246 (utolsó: 6)', category: 'div-2-only' },
      { id: 'dbs1-5', label: '805 (utolsó: 5)', category: 'div-5-only' },
      { id: 'dbs1-6', label: '920 (utolsó: 0)', category: 'div-10-both' },
      { id: 'dbs1-7', label: '1034 (utolsó: 4)', category: 'div-2-only' },
      { id: 'dbs1-8', label: '3195 (utolsó: 5)', category: 'div-5-only' },
      { id: 'dbs1-9', label: '5000 (utolsó: 0)', category: 'div-10-both' },
      { id: 'dbs1-10', label: '62 (utolsó: 2)', category: 'div-2-only' }
    ]
  },
  2: {
    categories: [
      {
        id: 'rem-5-zero',
        name: '5-ös maradék: 0 (0 vagy 5 végű)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'rem-5-two-three',
        name: '5-ös maradék: 2 vagy 3',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'rem-5-one-four',
        name: '5-ös maradék: 1 vagy 4',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      }
    ],
    items: [
      { id: 'dbs2-1', label: '430 (utolsó: 0)', category: 'rem-5-zero' },
      { id: 'dbs2-2', label: '512 (utolsó: 2)', category: 'rem-5-two-three' },
      { id: 'dbs2-3', label: '621 (utolsó: 1)', category: 'rem-5-one-four' },
      { id: 'dbs2-4', label: '835 (utolsó: 5)', category: 'rem-5-zero' },
      { id: 'dbs2-5', label: '948 (utolsó: 8 -> 8:5 mar. 3)', category: 'rem-5-two-three' },
      { id: 'dbs2-6', label: '1054 (utolsó: 4)', category: 'rem-5-one-four' },
      { id: 'dbs2-7', label: '2167 (utolsó: 7 -> 7:5 mar. 2)', category: 'rem-5-two-three' },
      { id: 'dbs2-8', label: '3289 (utolsó: 9 -> 9:5 mar. 4)', category: 'rem-5-one-four' },
      { id: 'dbs2-9', label: '4500 (utolsó: 0)', category: 'rem-5-zero' },
      { id: 'dbs2-10', label: '7773 (utolsó: 3)', category: 'rem-5-two-three' }
    ]
  },
  3: {
    categories: [
      {
        id: 'res-div-10',
        name: '10-zel osztható eredmény (0 végű)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      },
      {
        id: 'res-div-2-even',
        name: 'Páros, de nem 10-zel osztható',
        badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300 dark:bg-cyan-950 dark:text-cyan-300'
      },
      {
        id: 'res-odd',
        name: 'Páratlan eredmény',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'dbs3-1', label: '135 + 245 (= 380)', category: 'res-div-10' },
      { id: 'dbs3-2', label: '124 + 318 (= 442)', category: 'res-div-2-even' },
      { id: 'dbs3-3', label: '513 + 420 (= 933)', category: 'res-odd' },
      { id: 'dbs3-4', label: '25 · 4 (= 100)', category: 'res-div-10' },
      { id: 'dbs3-5', label: '37 · 2 (= 74)', category: 'res-div-2-even' },
      { id: 'dbs3-6', label: '19 · 13 (páratlan · páratlan)', category: 'res-odd' },
      { id: 'dbs3-7', label: '543 - 223 (= 320)', category: 'res-div-10' },
      { id: 'dbs3-8', label: '888 - 302 (= 586)', category: 'res-div-2-even' },
      { id: 'dbs3-9', label: '700 - 155 (= 545)', category: 'res-odd' },
      { id: 'dbs3-10', label: '12 · 15 (= 180)', category: 'res-div-10' }
    ]
  }
};

export function DivisibilityBy2510Sorter({
  level,
  onNextLevel,
  onOpenRules
}: DivisibilityBy2510SorterProps) {
  return (
    <SorterTemplate
      level={level}
      title="Oszthatóság (2, 5, 10) csoportosító játék"
      subtitle="Húzd vagy kattints az elemre, és helyezd a megfelelő kategóriába!"
      levels={SORTER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
