import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface CountingPossibilitiesSorterProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    categories: [
      {
        id: 'few',
        name: 'Legfeljebb 6 eset (x ≤ 6)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'mid',
        name: '7 és 15 eset között',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'many',
        name: 'Több mint 15 eset (x > 15)',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950 dark:text-rose-300'
      }
    ],
    items: [
      { id: 'cs1-1', label: '2 érme dobása (4 eset)', category: 'few' },
      { id: 'cs1-2', label: '3 könyv sorrendje (6 eset)', category: 'few' },
      { id: 'cs1-3', label: '3 érme dobása (8 eset)', category: 'mid' },
      { id: 'cs1-4', label: '4 póló · 3 nadrág (12 eset)', category: 'mid' },
      { id: 'cs1-5', label: '2 kocka dobása (36 eset)', category: 'many' },
      { id: 'cs1-6', label: '4 gyerek sorrendje (24 eset)', category: 'many' },
      { id: 'cs1-7', label: '2 számkártya (5, 8) sorrendje (2 eset)', category: 'few' },
      { id: 'cs1-8', label: '2 leves · 5 főétel (10 eset)', category: 'mid' },
      { id: 'cs1-9', label: '4 érme dobása (16 eset)', category: 'many' },
      { id: 'cs1-10', label: '3 fagyi · 3 öntet (9 eset)', category: 'mid' }
    ]
  },
  2: {
    categories: [
      {
        id: 'rule-mult',
        name: 'Független szorzat (a · b)',
        badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300 dark:bg-indigo-950 dark:text-indigo-300'
      },
      {
        id: 'rule-perm',
        name: 'Sorbaállítás (n!)',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'rule-power',
        name: 'Ismétléses választás (kⁿ)',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      }
    ],
    items: [
      { id: 'cs2-1', label: '4 könyv elhelyezése a polcon', category: 'rule-perm' },
      { id: 'cs2-2', label: '3 póló és 4 nadrág kiválasztása', category: 'rule-mult' },
      { id: 'cs2-3', label: '3 érme feldobása (Fej/Írás)', category: 'rule-power' },
      { id: 'cs2-4', label: '5 futó célbaérkezési sorrendje', category: 'rule-perm' },
      { id: 'cs2-5', label: '2 kocka feldobásának kimenetelei', category: 'rule-power' },
      { id: 'cs2-6', label: '3 féle tészta · 4 féle mártás', category: 'rule-mult' },
      { id: 'cs2-7', label: '3-jegyű számok 1, 2, 3-ból (különböző)', category: 'rule-perm' },
      { id: 'cs2-8', label: '4-jegyű PIN kódok képzése (0-9)', category: 'rule-power' },
      { id: 'cs2-9', label: '2 előétel · 3 főétel · 2 desszert', category: 'rule-mult' },
      { id: 'cs2-10', label: '6 versenyzőből 1., 2., 3. hely', category: 'rule-perm' }
    ]
  },
  3: {
    categories: [
      {
        id: 'even-small',
        name: 'Páros és ≤ 24 eset',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300'
      },
      {
        id: 'odd-cases',
        name: 'Páratlan számú lehetőség',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300'
      },
      {
        id: 'even-large',
        name: 'Páros és > 24 eset',
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950 dark:text-purple-300'
      }
    ],
    items: [
      { id: 'cs3-1', label: '3 gyerek sorrendje (6)', category: 'even-small' },
      { id: 'cs3-2', label: '3-jegyű számok 1, 2, 3-ból ismétléssel (27)', category: 'odd-cases' },
      { id: 'cs3-3', label: '4 gyerek sorrendje (24)', category: 'even-small' },
      { id: 'cs3-4', label: '2 kocka dobása (36)', category: 'even-large' },
      { id: 'cs3-5', label: '5 ember sorrendje (120)', category: 'even-large' },
      { id: 'cs3-6', label: '3 póló · 3 nadrág · 3 cipő (27)', category: 'odd-cases' },
      { id: 'cs3-7', label: '2 érme dobása (4)', category: 'even-small' },
      { id: 'cs3-8', label: '4-jegyű számok 0, 1, 2, 3-ból különböző (18)', category: 'even-small' },
      { id: 'cs3-9', label: '3 kocka dobása (216)', category: 'even-large' },
      { id: 'cs3-10', label: '1 leves · 3 főétel · 3 desszert (9)', category: 'odd-cases' }
    ]
  }
};

export function CountingPossibilitiesSorter({
  level,
  onNextLevel,
  onOpenRules
}: CountingPossibilitiesSorterProps) {
  return (
    <SorterTemplate
      level={level}
      title="Hány eset van? Csoportosító játék"
      subtitle="Húzd vagy kattints a feladatra, majd válaszd ki a helyes kategóriát!"
      levels={SORTER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
