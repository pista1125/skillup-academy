import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface PrimeFactorizationSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Prímszámok, összetett számok és az 1 szétválogatása',
    timeLimit: 120,
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    categories: [
      { id: 'primes', name: 'Prímszámok (2 osztó)', color: 'emerald', expectedItemIds: ['i1-1', 'i1-2', 'i1-3', 'i1-4'] },
      { id: 'composites', name: 'Összetett számok (>2 osztó)', color: 'indigo', expectedItemIds: ['i1-5', 'i1-6', 'i1-7', 'i1-8', 'i1-9'] },
      { id: 'one', name: 'Egyik sem (1 db osztó)', color: 'purple', expectedItemIds: ['i1-10'] }
    ],
    items: [
      { id: 'i1-1', text: '2 (Egyetlen páros prím)' },
      { id: 'i1-2', text: '7 (Osztói: 1, 7)' },
      { id: 'i1-3', text: '13 (Osztói: 1, 13)' },
      { id: 'i1-4', text: '19 (Osztói: 1, 19)' },
      { id: 'i1-5', text: '4 (2² -> 3 osztó)' },
      { id: 'i1-6', text: '9 (3² -> 3 osztó)' },
      { id: 'i1-7', text: '15 (3·5 -> 4 osztó)' },
      { id: 'i1-8', text: '20 (2²·5 -> 6 osztó)' },
      { id: 'i1-9', text: '27 (3³ -> 4 osztó)' },
      { id: 'i1-10', text: '1 (Csak 1 osztója van!)' }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Osztók száma: Négyzetszámok vs. Prímek vs. Más számok',
    timeLimit: 100,
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    categories: [
      { id: 'squares', name: 'Négyzetszámok (PÁRATLAN osztó)', color: 'purple', expectedItemIds: ['i2-1', 'i2-2', 'i2-3', 'i2-4'] },
      { id: 'primes', name: 'Prímszámok (2 osztó)', color: 'emerald', expectedItemIds: ['i2-5', 'i2-6', 'i2-7'] },
      { id: 'evenDiv', name: 'Összetett nem négyzetszám (PÁROS osztó)', color: 'indigo', expectedItemIds: ['i2-8', 'i2-9', 'i2-10'] }
    ],
    items: [
      { id: 'i2-1', text: '16 (4² -> 5 osztó)' },
      { id: 'i2-2', text: '25 (5² -> 3 osztó)' },
      { id: 'i2-3', text: '36 (6² -> 9 osztó)' },
      { id: 'i2-4', text: '64 (8² -> 7 osztó)' },
      { id: 'i2-5', text: '11 (Prím, 2 osztó)' },
      { id: 'i2-6', text: '23 (Prím, 2 osztó)' },
      { id: 'i2-7', text: '29 (Prím, 2 osztó)' },
      { id: 'i2-8', text: '12 (6 osztó: 1,2,3,4,6,12)' },
      { id: 'i2-9', text: '18 (6 osztó: 1,2,3,6,9,18)' },
      { id: 'i2-10', text: '24 (8 osztó: 1..24)' }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Számok csoportosítása a különböző prímtényezőik száma szerint',
    timeLimit: 90,
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    categories: [
      { id: 'onePrime', name: '1 prím hatványa (pᵏ)', color: 'teal', expectedItemIds: ['i3-1', 'i3-2', 'i3-3', 'i3-4'] },
      { id: 'twoPrimes', name: '2 különböző prím szorzata', color: 'indigo', expectedItemIds: ['i3-5', 'i3-6', 'i3-7'] },
      { id: 'threePrimes', name: '3 különböző prím szorzata', color: 'rose', expectedItemIds: ['i3-8', 'i3-9', 'i3-10'] }
    ],
    items: [
      { id: 'i3-1', text: '8 = 2³' },
      { id: 'i3-2', text: '27 = 3³' },
      { id: 'i3-3', text: '32 = 2⁵' },
      { id: 'i3-4', text: '125 = 5³' },
      { id: 'i3-5', text: '12 = 2² · 3' },
      { id: 'i3-6', text: '18 = 2 · 3²' },
      { id: 'i3-7', text: '20 = 2² · 5' },
      { id: 'i3-8', text: '30 = 2 · 3 · 5' },
      { id: 'i3-9', text: '42 = 2 · 3 · 7' },
      { id: 'i3-10', text: '60 = 2² · 3 · 5' }
    ]
  }
};

export function PrimeFactorizationSorter({
  level = 1,
  onNextLevel,
  onOpenRules,
  onBack
}: PrimeFactorizationSorterProps) {
  return (
    <SorterTemplate
      levels={SORTER_LEVELS}
      initialLevel={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      title="Prímtényezős Csoportosító"
      subtitle="Húzd vagy kattintással helyezd a számokat a megfelelő prímtényezős kategóriába!"
      themeColor="indigo"
    />
  );
}

export { PrimeFactorizationSorter as NumberOfDivisorsSorter };
