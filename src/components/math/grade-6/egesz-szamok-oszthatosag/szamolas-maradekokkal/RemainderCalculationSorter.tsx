import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface RemainderCalculationSorterProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Számok csoportosítása 3-as maradékuk szerint',
    timeLimit: 120,
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    categories: [
      { id: 'rem0', name: '0 maradék (3 többszöröse)', color: 'teal', expectedItemIds: ['i1-1', 'i1-2', 'i1-3', 'i1-4'] },
      { id: 'rem1', name: '1 maradék', color: 'indigo', expectedItemIds: ['i1-5', 'i1-6', 'i1-7'] },
      { id: 'rem2', name: '2 maradék', color: 'purple', expectedItemIds: ['i1-8', 'i1-9', 'i1-10'] }
    ],
    items: [
      { id: 'i1-1', text: '12 (3·4 + 0)' },
      { id: 'i1-2', text: '27 (3·9 + 0)' },
      { id: 'i1-3', text: '45 (3·15 + 0)' },
      { id: 'i1-4', text: '60 (3·20 + 0)' },
      { id: 'i1-5', text: '10 (3·3 + 1)' },
      { id: 'i1-6', text: '22 (3·7 + 1)' },
      { id: 'i1-7', text: '34 (3·11 + 1)' },
      { id: 'i1-8', text: '14 (3·4 + 2)' },
      { id: 'i1-9', text: '26 (3·8 + 2)' },
      { id: 'i1-10', text: '41 (3·13 + 2)' }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Számok csoportosítása 5-ös maradékuk szerint',
    timeLimit: 100,
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    categories: [
      { id: 'rem0', name: '0 maradék (Osztható 5-tel)', color: 'emerald', expectedItemIds: ['i2-1', 'i2-2', 'i2-3', 'i2-4'] },
      { id: 'rem12', name: '1 vagy 2 maradék', color: 'amber', expectedItemIds: ['i2-5', 'i2-6', 'i2-7'] },
      { id: 'rem34', name: '3 vagy 4 maradék', color: 'rose', expectedItemIds: ['i2-8', 'i2-9', 'i2-10'] }
    ],
    items: [
      { id: 'i2-1', text: '25 (Végződés: 5)' },
      { id: 'i2-2', text: '40 (Végződés: 0)' },
      { id: 'i2-3', text: '75 (Végződés: 5)' },
      { id: 'i2-4', text: '90 (Végződés: 0)' },
      { id: 'i2-5', text: '21 (Maradék: 1)' },
      { id: 'i2-6', text: '32 (Maradék: 2)' },
      { id: 'i2-7', text: '56 (Maradék: 1)' },
      { id: 'i2-8', text: '18 (Maradék: 3)' },
      { id: 'i2-9', text: '34 (Maradék: 4)' },
      { id: 'i2-10', text: '49 (Maradék: 4)' }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Naptári eltelt napok besorolása hétfői bázissal',
    timeLimit: 90,
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    categories: [
      { id: 'dayMon', name: '0 maradék (Hétfő)', color: 'teal', expectedItemIds: ['i3-1', 'i3-2', 'i3-3', 'i3-4'] },
      { id: 'dayTueWed', name: '1-2 maradék (Kedd / Szerda)', color: 'indigo', expectedItemIds: ['i3-5', 'i3-6', 'i3-7'] },
      { id: 'daySatSun', name: '5-6 maradék (Szombat / Vasárnap)', color: 'purple', expectedItemIds: ['i3-8', 'i3-9', 'i3-10'] }
    ],
    items: [
      { id: 'i3-1', text: '14 nap (2 hét kerek)' },
      { id: 'i3-2', text: '28 nap (4 hét kerek)' },
      { id: 'i3-3', text: '70 nap (10 hét kerek)' },
      { id: 'i3-4', text: '140 nap (20 hét kerek)' },
      { id: 'i3-5', text: '15 nap (+1 nap -> Kedd)' },
      { id: 'i3-6', text: '23 nap (+2 nap -> Szerda)' },
      { id: 'i3-7', text: '51 nap (+2 nap -> Szerda)' },
      { id: 'i3-8', text: '12 nap (+5 nap -> Szombat)' },
      { id: 'i3-9', text: '27 nap (+6 nap -> Vasárnap)' },
      { id: 'i3-10', text: '48 nap (+6 nap -> Vasárnap)' }
    ]
  }
};

export function RemainderCalculationSorter({
  level = 1,
  onNextLevel,
  onOpenRules
}: RemainderCalculationSorterProps) {
  return (
    <SorterTemplate
      levels={SORTER_LEVELS}
      initialLevel={level}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      title="Maradékos Csoportosító"
      subtitle="Húzd vagy kattintással helyezd az elemeket a megfelelő maradékcsoportba!"
      themeColor="teal"
    />
  );
}
