import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisorsMultiplesSorterProps {
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
    title: '1. Szint: Páros vagy Páratlan Számú Osztó?',
    subtitle: 'Csoportosítsd a számokat aszerint, hogy páros vagy páratlan darab pozitív osztójuk van!',
    categories: [
      {
        id: 'cat-odd-divisors',
        name: 'Páratlan számú osztó',
        description: 'Négyzetszámok',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-even-divisors',
        name: 'Páros számú osztó',
        description: 'Nem négyzetszámok',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300 dark:bg-cyan-950/60 dark:text-cyan-300'
      }
    ],
    items: [
      { id: 's1-1', label: '4', category: 'cat-odd-divisors' },
      { id: 's1-2', label: '9', category: 'cat-odd-divisors' },
      { id: 's1-3', label: '16', category: 'cat-odd-divisors' },
      { id: 's1-4', label: '25', category: 'cat-odd-divisors' },
      { id: 's1-5', label: '36', category: 'cat-odd-divisors' },
      { id: 's1-6', label: '49', category: 'cat-odd-divisors' },
      { id: 's1-7', label: '6', category: 'cat-even-divisors' },
      { id: 's1-8', label: '10', category: 'cat-even-divisors' },
      { id: 's1-9', label: '12', category: 'cat-even-divisors' },
      { id: 's1-10', label: '18', category: 'cat-even-divisors' },
      { id: 's1-11', label: '20', category: 'cat-even-divisors' },
      { id: 's1-12', label: '24', category: 'cat-even-divisors' }
    ]
  },
  2: {
    title: '2. Szint: Az Osztók Pontos Száma Szerint',
    subtitle: 'Válogasd szét a számokat az osztóik darabszáma szerint!',
    categories: [
      {
        id: 'cat-two-divisors',
        name: 'Pontosan 2 osztó',
        description: 'Prímszámok',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-three-divisors',
        name: 'Pontosan 3 osztó',
        description: 'Prímszámok négyzetei',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      },
      {
        id: 'cat-four-plus-divisors',
        name: '4 vagy több osztó',
        description: 'Összetett számok',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      }
    ],
    items: [
      { id: 's2-1', label: '2', category: 'cat-two-divisors' },
      { id: 's2-2', label: '3', category: 'cat-two-divisors' },
      { id: 's2-3', label: '5', category: 'cat-two-divisors' },
      { id: 's2-4', label: '7', category: 'cat-two-divisors' },
      { id: 's2-5', label: '4', category: 'cat-three-divisors' },
      { id: 's2-6', label: '9', category: 'cat-three-divisors' },
      { id: 's2-7', label: '25', category: 'cat-three-divisors' },
      { id: 's2-8', label: '49', category: 'cat-three-divisors' },
      { id: 's2-9', label: '6', category: 'cat-four-plus-divisors' },
      { id: 's2-10', label: '8', category: 'cat-four-plus-divisors' },
      { id: 's2-11', label: '12', category: 'cat-four-plus-divisors' },
      { id: 's2-12', label: '16', category: 'cat-four-plus-divisors' }
    ]
  },
  3: {
    title: '3. Szint: Keresési Határ az Osztópárokhoz',
    subtitle: 'Csoportosítsd a számokat a négyzetgyökükből adódó felső vizsgálati határ szerint!',
    categories: [
      {
        id: 'cat-limit-5',
        name: 'Keresési határ: legfeljebb 5',
        description: 'A szám legfeljebb 25',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      },
      {
        id: 'cat-limit-6-8',
        name: 'Keresési határ: 6 és 8 között',
        description: 'A szám 26 és 80 között van',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'cat-limit-9-plus',
        name: 'Keresési határ: 9 vagy nagyobb',
        description: 'A szám legalább 81',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's3-1', label: '15', category: 'cat-limit-5' },
      { id: 's3-2', label: '20', category: 'cat-limit-5' },
      { id: 's3-3', label: '24', category: 'cat-limit-5' },
      { id: 's3-4', label: '25', category: 'cat-limit-5' },
      { id: 's3-5', label: '36', category: 'cat-limit-6-8' },
      { id: 's3-6', label: '48', category: 'cat-limit-6-8' },
      { id: 's3-7', label: '60', category: 'cat-limit-6-8' },
      { id: 's3-8', label: '72', category: 'cat-limit-6-8' },
      { id: 's3-9', label: '81', category: 'cat-limit-9-plus' },
      { id: 's3-10', label: '90', category: 'cat-limit-9-plus' },
      { id: 's3-11', label: '100', category: 'cat-limit-9-plus' },
      { id: 's3-12', label: '144', category: 'cat-limit-9-plus' }
    ]
  }
};

export const DivisorsMultiplesSorter: React.FC<DivisorsMultiplesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-divisors-multiples',
  topicTitle = '7. Osztókról, többszörösökről még egyszer'
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
      themeColor="cyan"
    />
  );
};

export default DivisorsMultiplesSorter;
