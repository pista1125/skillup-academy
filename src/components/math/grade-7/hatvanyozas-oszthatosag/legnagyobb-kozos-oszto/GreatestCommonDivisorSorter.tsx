import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface GreatestCommonDivisorSorterProps {
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
    title: '1. Szint: Relatív Prím vagy Van Közös Osztó?',
    subtitle: 'Válogasd szét a számpárokat aszerint, hogy legnagyobb közös osztójuk 1 vagy 1-nél nagyobb!',
    categories: [
      {
        id: 'cat-rel-prime',
        name: 'Relatív prímek',
        description: 'LNKO = 1',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-not-rel-prime',
        name: 'Nem relatív prímek',
        description: 'LNKO > 1',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300'
      }
    ],
    items: [
      { id: 's1-1', label: '(8; 9)', category: 'cat-rel-prime' },
      { id: 's1-2', label: '(14; 15)', category: 'cat-rel-prime' },
      { id: 's1-3', label: '(15; 28)', category: 'cat-rel-prime' },
      { id: 's1-4', label: '(21; 25)', category: 'cat-rel-prime' },
      { id: 's1-5', label: '(9; 16)', category: 'cat-rel-prime' },
      { id: 's1-6', label: '(7; 11)', category: 'cat-rel-prime' },
      { id: 's1-7', label: '(12; 18)', category: 'cat-not-rel-prime' },
      { id: 's1-8', label: '(15; 25)', category: 'cat-not-rel-prime' },
      { id: 's1-9', label: '(24; 36)', category: 'cat-not-rel-prime' },
      { id: 's1-10', label: '(14; 21)', category: 'cat-not-rel-prime' },
      { id: 's1-11', label: '(20; 30)', category: 'cat-not-rel-prime' },
      { id: 's1-12', label: '(18; 27)', category: 'cat-not-rel-prime' }
    ]
  },
  2: {
    title: '2. Szint: Az LNKO Nagysága Szerint',
    subtitle: 'Csoportosítsd a számpárokat a legnagyobb közös osztójuk értéke alapján!',
    categories: [
      {
        id: 'cat-gcd-small',
        name: 'LNKO = 2 vagy 3',
        description: 'Kis közös osztó',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-gcd-medium',
        name: 'LNKO = 4, 5 vagy 6',
        description: 'Közepes közös osztó',
        badgeColor: 'bg-violet-100 text-violet-900 border-violet-300 dark:bg-violet-950/60 dark:text-violet-300'
      },
      {
        id: 'cat-gcd-large',
        name: 'LNKO legalább 10',
        description: 'Nagy közös osztó',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '(6; 10)', category: 'cat-gcd-small' },
      { id: 's2-2', label: '(9; 15)', category: 'cat-gcd-small' },
      { id: 's2-3', label: '(14; 20)', category: 'cat-gcd-small' },
      { id: 's2-4', label: '(15; 21)', category: 'cat-gcd-small' },
      { id: 's2-5', label: '(8; 12)', category: 'cat-gcd-medium' },
      { id: 's2-6', label: '(10; 15)', category: 'cat-gcd-medium' },
      { id: 's2-7', label: '(12; 18)', category: 'cat-gcd-medium' },
      { id: 's2-8', label: '(16; 20)', category: 'cat-gcd-medium' },
      { id: 's2-9', label: '(20; 30)', category: 'cat-gcd-large' },
      { id: 's2-10', label: '(24; 36)', category: 'cat-gcd-large' },
      { id: 's2-11', label: '(30; 45)', category: 'cat-gcd-large' },
      { id: 's2-12', label: '(40; 60)', category: 'cat-gcd-large' }
    ]
  },
  3: {
    title: '3. Szint: A Számok Közötti Osztó-Kapcsolat',
    subtitle: 'Válogasd szét a számpárokat a számok közötti oszthatósági viszony alapján!',
    categories: [
      {
        id: 'cat-div-divisor',
        name: 'Egyik osztója a másiknak',
        description: 'LNKO a kisebbik szám',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      },
      {
        id: 'cat-div-coprime',
        name: 'Relatív prímek',
        description: 'LNKO = 1',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-div-composite',
        name: 'Egyéb összetett kapcsolat',
        description: '1 < LNKO < kisebbik szám',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      }
    ],
    items: [
      { id: 's3-1', label: '(6; 18)', category: 'cat-div-divisor' },
      { id: 's3-2', label: '(12; 48)', category: 'cat-div-divisor' },
      { id: 's3-3', label: '(7; 28)', category: 'cat-div-divisor' },
      { id: 's3-4', label: '(15; 60)', category: 'cat-div-divisor' },
      { id: 's3-5', label: '(8; 15)', category: 'cat-div-coprime' },
      { id: 's3-6', label: '(9; 14)', category: 'cat-div-coprime' },
      { id: 's3-7', label: '(20; 21)', category: 'cat-div-coprime' },
      { id: 's3-8', label: '(11; 13)', category: 'cat-div-coprime' },
      { id: 's3-9', label: '(12; 18)', category: 'cat-div-composite' },
      { id: 's3-10', label: '(20; 30)', category: 'cat-div-composite' },
      { id: 's3-11', label: '(18; 24)', category: 'cat-div-composite' },
      { id: 's3-12', label: '(40; 50)', category: 'cat-div-composite' }
    ]
  }
};

export const GreatestCommonDivisorSorter: React.FC<GreatestCommonDivisorSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-gcd',
  topicTitle = '8. Legnagyobb közös osztó'
}) => {
  const effectiveLevel = (currentLevel || level || 1) as DifficultyLevel;

  return (
    <SorterTemplate
      level={effectiveLevel}
      currentLevel={effectiveLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      levels={sorterLevels}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="violet"
    />
  );
};

export default GreatestCommonDivisorSorter;
