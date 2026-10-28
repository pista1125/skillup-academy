import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface EquationsSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const sorterLevels: Record<DifficultyLevel, SorterLevelConfig> = {
  1: {
    title: '1. Szint: Megoldások Száma a Valós Számok Halmazán',
    subtitle: 'Kategorizáld az egyenlőségeket a megoldások száma (egyenlet, azonosság vagy ellentmondás) szerint!',
    categories: [
      {
        id: 'cat-one-solution',
        name: 'Pontosan 1 megoldás (Egyenlet)',
        description: 'Véges, egyetlen valós gyök létezik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-infinite-solutions',
        name: 'Végtelen sok (Azonosság)',
        description: 'Minden valós szám kielégíti (M = ℝ)',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-no-solution',
        name: 'Nincs megoldás (Ellentmondás)',
        description: 'Egyetlen valós számra sem teljesül (M = ∅)',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      // 1 megoldás
      { id: 'es1-1', label: '2x + 5 = 15', category: 'cat-one-solution' },
      { id: 'es1-2', label: '4x - 1 = 7', category: 'cat-one-solution' },
      { id: 'es1-3', label: '5x = 0', category: 'cat-one-solution' },
      { id: 'es1-4', label: '3(x - 2) = x + 4', category: 'cat-one-solution' },
      // Végtelen sok (Azonosság)
      { id: 'es1-5', label: '3(x + 2) = 3x + 6', category: 'cat-infinite-solutions' },
      { id: 'es1-6', label: '(x - 1)² = x² - 2x + 1', category: 'cat-infinite-solutions' },
      { id: 'es1-7', label: '4x - 5 = -5 + 4x', category: 'cat-infinite-solutions' },
      { id: 'es1-8', label: '2x + 2x = 4x', category: 'cat-infinite-solutions' },
      // Nincs megoldás (Ellentmondás)
      { id: 'es1-9', label: 'x + 4 = x + 9', category: 'cat-no-solution' },
      { id: 'es1-10', label: '2x - 3 = 2x + 5', category: 'cat-no-solution' },
      { id: 'es1-11', label: '0 · x = 8', category: 'cat-no-solution' },
      { id: 'es1-12', label: '5(x + 1) = 5x - 3', category: 'cat-no-solution' }
    ]
  },
  2: {
    title: '2. Szint: A Gyök Előjele és Értéke',
    subtitle: 'Határozd meg fejben a gyök előjelét, és sorold be a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-negative',
        name: 'Negatív gyök (x < 0)',
        description: 'A megoldás szigorúan kisebb nullánál',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-zero',
        name: 'Nulla a gyöke (x = 0)',
        description: 'A megoldás pontosan a 0',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300'
      },
      {
        id: 'cat-positive',
        name: 'Pozitív gyök (x > 0)',
        description: 'A megoldás szigorúan nagyobb nullánál',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // Negatív gyök
      { id: 'es2-1', label: 'x + 8 = 3', category: 'cat-negative' },
      { id: 'es2-2', label: '2x = -14', category: 'cat-negative' },
      { id: 'es2-3', label: '3x + 10 = 1', category: 'cat-negative' },
      { id: 'es2-4', label: '-4x = 12', category: 'cat-negative' },
      // Nulla gyök
      { id: 'es2-5', label: '5x = 0', category: 'cat-zero' },
      { id: 'es2-6', label: '3x + 7 = 7', category: 'cat-zero' },
      { id: 'es2-7', label: '2(x - 4) = -8', category: 'cat-zero' },
      { id: 'es2-8', label: '10x - 2 = -2', category: 'cat-zero' },
      // Pozitív gyök
      { id: 'es2-9', label: '2x - 6 = 10', category: 'cat-positive' },
      { id: 'es2-10', label: '3x = 15', category: 'cat-positive' },
      { id: 'es2-11', label: 'x / 4 = 2', category: 'cat-positive' },
      { id: 'es2-12', label: '4 - x = 1', category: 'cat-positive' }
    ]
  },
  3: {
    title: '3. Szint: Megoldása-e az x = 2 az Egyenlőségnek?',
    subtitle: 'Helyettesítsd be fejben az x = 2 értéket a két oldalba, és kategorizáld!',
    categories: [
      {
        id: 'cat-solves-x2',
        name: 'Az x = 2 megoldása',
        description: 'B(2) = J(2), egyedi gyök',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-fails-x2',
        name: 'Az x = 2 NEM megoldása',
        description: 'B(2) ≠ J(2), hamis egyenlőség',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-identity-x2',
        name: 'Azonosság (Minden x megoldás)',
        description: 'Nemcsak az x = 2, hanem minden valós szám jó',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // x = 2 megoldás
      { id: 'es3-1', label: '3x - 1 = 5', category: 'cat-solves-x2' },
      { id: 'es3-2', label: '4x + 2 = 10', category: 'cat-solves-x2' },
      { id: 'es3-3', label: 'x² = 4 (pozitív ág)', category: 'cat-solves-x2' },
      { id: 'es3-4', label: '5x - 6 = 2x', category: 'cat-solves-x2' },
      // x = 2 nem megoldás
      { id: 'es3-5', label: '2x + 3 = 9', category: 'cat-fails-x2' },
      { id: 'es3-6', label: 'x - 5 = 3', category: 'cat-fails-x2' },
      { id: 'es3-7', label: '3x = 12', category: 'cat-fails-x2' },
      { id: 'es3-8', label: '4x - 3 = 7', category: 'cat-fails-x2' },
      // Azonosság
      { id: 'es3-9', label: '3(x + 1) = 3x + 3', category: 'cat-identity-x2' },
      { id: 'es3-10', label: 'x + x = 2x', category: 'cat-identity-x2' },
      { id: 'es3-11', label: '(x + 2)² = x² + 4x + 4', category: 'cat-identity-x2' },
      { id: 'es3-12', label: '5x - x = 4x', category: 'cat-identity-x2' }
    ]
  }
};

export const EquationsSorter: React.FC<EquationsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g9-egyenlet-alap-quiz',
  topicTitle = 'Egyenletek'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      levels={sorterLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      color="emerald"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

