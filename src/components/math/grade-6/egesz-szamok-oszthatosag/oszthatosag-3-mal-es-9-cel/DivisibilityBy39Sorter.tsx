import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DivisibilityBy39SorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'div-3-only',
        name: 'Csak 3-mal osztható (9-cel nem)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'div-3-and-9',
        name: '3-mal ÉS 9-cel is osztható',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      },
      {
        id: 'div-neither',
        name: 'Egyikkel sem osztható',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      }
    ],
    items: [
      { id: 'd39s1-1', label: '12 (összeg: 3)', category: 'div-3-only' },
      { id: 'd39s1-2', label: '18 (összeg: 9)', category: 'div-3-and-9' },
      { id: 'd39s1-3', label: '14 (összeg: 5)', category: 'div-neither' },
      { id: 'd39s1-4', label: '24 (összeg: 6)', category: 'div-3-only' },
      { id: 'd39s1-5', label: '36 (összeg: 9)', category: 'div-3-and-9' },
      { id: 'd39s1-6', label: '45 (összeg: 9)', category: 'div-3-and-9' },
      { id: 'd39s1-7', label: '51 (összeg: 6)', category: 'div-3-only' },
      { id: 'd39s1-8', label: '71 (összeg: 8)', category: 'div-neither' },
      { id: 'd39s1-9', label: '81 (összeg: 9)', category: 'div-3-and-9' },
      { id: 'd39s1-10', label: '103 (összeg: 4)', category: 'div-neither' }
    ]
  },
  2: {
    categories: [
      {
        id: 'rem-3-zero',
        name: '3-as maradék: 0 (3 többszöröse)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'rem-3-one',
        name: '3-as maradék: 1',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      },
      {
        id: 'rem-3-two',
        name: '3-as maradék: 2',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'd39s2-1', label: '123 (összeg: 6)', category: 'rem-3-zero' },
      { id: 'd39s2-2', label: '235 (összeg: 10 -> mar. 1)', category: 'rem-3-one' },
      { id: 'd39s2-3', label: '341 (összeg: 8 -> mar. 2)', category: 'rem-3-two' },
      { id: 'd39s2-4', label: '450 (összeg: 9)', category: 'rem-3-zero' },
      { id: 'd39s2-5', label: '514 (összeg: 10 -> mar. 1)', category: 'rem-3-one' },
      { id: 'd39s2-6', label: '629 (összeg: 17 -> mar. 2)', category: 'rem-3-two' },
      { id: 'd39s2-7', label: '708 (összeg: 15)', category: 'rem-3-zero' },
      { id: 'd39s2-8', label: '802 (összeg: 10 -> mar. 1)', category: 'rem-3-one' },
      { id: 'd39s2-9', label: '911 (összeg: 11 -> mar. 2)', category: 'rem-3-two' },
      { id: 'd39s2-10', label: '999 (összeg: 27)', category: 'rem-3-zero' }
    ]
  },
  3: {
    categories: [
      {
        id: 'res-div-9',
        name: '9-cel osztható eredmény',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      },
      {
        id: 'res-div-3-only',
        name: 'Csak 3-mal osztható eredmény',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'res-not-3',
        name: 'Nem osztható 3-mal',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'd39s3-1', label: '45 + 36 (= 81)', category: 'res-div-9' },
      { id: 'd39s3-2', label: '21 + 15 (= 36)', category: 'res-div-9' },
      { id: 'd39s3-3', label: '12 + 18 (= 30)', category: 'res-div-3-only' },
      { id: 'd39s3-4', label: '50 + 22 (= 72)', category: 'res-div-9' },
      { id: 'd39s3-5', label: '14 + 16 (= 30)', category: 'res-div-3-only' },
      { id: 'd39s3-6', label: '10 + 11 (= 21)', category: 'res-div-3-only' },
      { id: 'd39s3-7', label: '13 + 19 (= 32)', category: 'res-not-3' },
      { id: 'd39s3-8', label: '7 · 9 (= 63)', category: 'res-div-9' },
      { id: 'd39s3-9', label: '5 · 6 (= 30)', category: 'res-div-3-only' },
      { id: 'd39s3-10', label: '7 · 8 (= 56)', category: 'res-not-3' }
    ]
  }
};

export function DivisibilityBy39Sorter({
  level,
  onNextLevel,
  onOpenRules
}: DivisibilityBy39SorterProps) {
  return (
    <SorterTemplate
      level={level}
      title="Oszthatóság (3, 9) csoportosító játék"
      subtitle="Húzd vagy kattints az elemre, és helyezd a megfelelő kategóriába!"
      levels={SORTER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
