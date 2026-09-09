import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface DivisibilityBy4100SorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'div-4-only',
        name: 'Csak 4-gyel osztható (100-zal nem)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'div-4-and-100',
        name: '4-gyel ÉS 100-zal is osztható (00 végű)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      },
      {
        id: 'div-not-4',
        name: 'Nem osztható 4-gyel',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      }
    ],
    items: [
      { id: 'd4100s1-1', label: '124 (utolsó 2: 24)', category: 'div-4-only' },
      { id: 'd4100s1-2', label: '300 (utolsó 2: 00)', category: 'div-4-and-100' },
      { id: 'd4100s1-3', label: '418 (utolsó 2: 18)', category: 'div-not-4' },
      { id: 'd4100s1-4', label: '536 (utolsó 2: 36)', category: 'div-4-only' },
      { id: 'd4100s1-5', label: '700 (utolsó 2: 00)', category: 'div-4-and-100' },
      { id: 'd4100s1-6', label: '813 (utolsó 2: 13)', category: 'div-not-4' },
      { id: 'd4100s1-7', label: '948 (utolsó 2: 48)', category: 'div-4-only' },
      { id: 'd4100s1-8', label: '1200 (utolsó 2: 00)', category: 'div-4-and-100' },
      { id: 'd4100s1-9', label: '2350 (utolsó 2: 50)', category: 'div-not-4' },
      { id: 'd4100s1-10', label: '4572 (utolsó 2: 72)', category: 'div-4-only' }
    ]
  },
  2: {
    categories: [
      {
        id: 'rem-4-zero',
        name: '4-es maradék: 0 (osztható 4-gyel)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'rem-4-two',
        name: '4-es maradék: 2',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'rem-4-odd',
        name: '4-es maradék: 1 vagy 3 (páratlan)',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950 dark:text-blue-300'
      }
    ],
    items: [
      { id: 'd4100s2-1', label: '420 (vég: 20)', category: 'rem-4-zero' },
      { id: 'd4100s2-2', label: '514 (vég: 14 -> mar. 2)', category: 'rem-4-two' },
      { id: 'd4100s2-3', label: '621 (vég: 21 -> mar. 1)', category: 'rem-4-odd' },
      { id: 'd4100s2-4', label: '732 (vég: 32)', category: 'rem-4-zero' },
      { id: 'd4100s2-5', label: '846 (vég: 46 -> mar. 2)', category: 'rem-4-two' },
      { id: 'd4100s2-6', label: '955 (vég: 55 -> mar. 3)', category: 'rem-4-odd' },
      { id: 'd4100s2-7', label: '1064 (vég: 64)', category: 'rem-4-zero' },
      { id: 'd4100s2-8', label: '2178 (vég: 78 -> mar. 2)', category: 'rem-4-two' },
      { id: 'd4100s2-9', label: '3287 (vég: 87 -> mar. 3)', category: 'rem-4-odd' },
      { id: 'd4100s2-10', label: '4000 (vég: 00)', category: 'rem-4-zero' }
    ]
  },
  3: {
    categories: [
      {
        id: 'res-div-100',
        name: '100-zal osztható eredmény (00 végű)',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      },
      {
        id: 'res-div-4-only',
        name: 'Csak 4-gyel osztható eredmény',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      },
      {
        id: 'res-not-4',
        name: 'Nem osztható 4-gyel',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      }
    ],
    items: [
      { id: 'd4100s3-1', label: '75 + 25 (= 100)', category: 'res-div-100' },
      { id: 'd4100s3-2', label: '116 + 212 (= 328)', category: 'res-div-4-only' },
      { id: 'd4100s3-3', label: '130 + 120 (= 250)', category: 'res-not-4' },
      { id: 'd4100s3-4', label: '25 · 8 (= 200)', category: 'res-div-100' },
      { id: 'd4100s3-5', label: '14 · 2 (= 28)', category: 'res-div-4-only' },
      { id: 'd4100s3-6', label: '15 · 3 (= 45)', category: 'res-not-4' },
      { id: 'd4100s3-7', label: '500 - 100 (= 400)', category: 'res-div-100' },
      { id: 'd4100s3-8', label: '348 - 104 (= 244)', category: 'res-div-4-only' },
      { id: 'd4100s3-9', label: '650 - 210 (= 440)', category: 'res-div-4-only' },
      { id: 'd4100s3-10', label: '700 - 150 (= 550)', category: 'res-not-4' }
    ]
  }
};

export function DivisibilityBy4100Sorter({
  level,
  onNextLevel,
  onOpenRules
}: DivisibilityBy4100SorterProps) {
  return (
    <SorterTemplate
      level={level}
      title="Oszthatóság (4, 100) csoportosító játék"
      subtitle="Húzd vagy kattints az elemre, és helyezd a megfelelő kategóriába!"
      levels={SORTER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
