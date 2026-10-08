import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LeastCommonMultipleSorterProps {
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
    title: '1. Szint: Egyenlő-e az LKKT a Szorzattal?',
    subtitle: 'Válogasd szét a számpárokat aszerint, hogy legkisebb közös többszörösük egyenlő-e a két szám szorzatával!',
    categories: [
      {
        id: 'cat-lcm-product',
        name: 'LKKT = a · b',
        description: 'Relatív prímek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-lcm-less',
        name: 'LKKT < a · b',
        description: 'Van közös osztójuk',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's1-1', label: '(8; 9)', category: 'cat-lcm-product' },
      { id: 's1-2', label: '(7; 10)', category: 'cat-lcm-product' },
      { id: 's1-3', label: '(14; 15)', category: 'cat-lcm-product' },
      { id: 's1-4', label: '(9; 16)', category: 'cat-lcm-product' },
      { id: 's1-5', label: '(11; 13)', category: 'cat-lcm-product' },
      { id: 's1-6', label: '(20; 21)', category: 'cat-lcm-product' },
      { id: 's1-7', label: '(6; 8)', category: 'cat-lcm-less' },
      { id: 's1-8', label: '(10; 15)', category: 'cat-lcm-less' },
      { id: 's1-9', label: '(12; 18)', category: 'cat-lcm-less' },
      { id: 's1-10', label: '(14; 21)', category: 'cat-lcm-less' },
      { id: 's1-11', label: '(20; 30)', category: 'cat-lcm-less' },
      { id: 's1-12', label: '(24; 36)', category: 'cat-lcm-less' }
    ]
  },
  2: {
    title: '2. Szint: Az LKKT Értéke Szerint',
    subtitle: 'Csoportosítsd a számpárokat a legkisebb közös többszörösük nagysága alapján!',
    categories: [
      {
        id: 'cat-lcm-small',
        name: 'LKKT legfeljebb 30',
        description: 'Kis közös többszörös',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-lcm-medium',
        name: 'LKKT 31 és 60 között',
        description: 'Közepes közös többszörös',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      },
      {
        id: 'cat-lcm-large',
        name: 'LKKT nagyobb, mint 60',
        description: 'Nagy közös többszörös',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      }
    ],
    items: [
      { id: 's2-1', label: '(4; 6)', category: 'cat-lcm-small' },
      { id: 's2-2', label: '(6; 8)', category: 'cat-lcm-small' },
      { id: 's2-3', label: '(10; 15)', category: 'cat-lcm-small' },
      { id: 's2-4', label: '(5; 6)', category: 'cat-lcm-small' },
      { id: 's2-5', label: '(12; 18)', category: 'cat-lcm-medium' },
      { id: 's2-6', label: '(14; 21)', category: 'cat-lcm-medium' },
      { id: 's2-7', label: '(15; 20)', category: 'cat-lcm-medium' },
      { id: 's2-8', label: '(20; 30)', category: 'cat-lcm-medium' },
      { id: 's2-9', label: '(8; 9)', category: 'cat-lcm-large' },
      { id: 's2-10', label: '(24; 36)', category: 'cat-lcm-large' },
      { id: 's2-11', label: '(15; 25)', category: 'cat-lcm-large' },
      { id: 's2-12', label: '(20; 45)', category: 'cat-lcm-large' }
    ]
  },
  3: {
    title: '3. Szint: A Számok Közötti Többszörös-Kapcsolat',
    subtitle: 'Válogasd szét a számpárokat az oszthatósági viszonyuk jellege alapján!',
    categories: [
      {
        id: 'cat-rel-multiple',
        name: 'Egyik többszöröse a másiknak',
        description: 'LKKT a nagyobbik szám',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300 dark:bg-teal-950/60 dark:text-teal-300'
      },
      {
        id: 'cat-rel-coprime',
        name: 'Relatív prímek',
        description: 'LKKT a szorzatuk',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-rel-mixed',
        name: 'Közös osztójuk van',
        description: 'LKKT kisebb a szorzatnál',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's3-1', label: '(6; 18)', category: 'cat-rel-multiple' },
      { id: 's3-2', label: '(12; 48)', category: 'cat-rel-multiple' },
      { id: 's3-3', label: '(7; 28)', category: 'cat-rel-multiple' },
      { id: 's3-4', label: '(15; 60)', category: 'cat-rel-multiple' },
      { id: 's3-5', label: '(8; 15)', category: 'cat-rel-coprime' },
      { id: 's3-6', label: '(9; 14)', category: 'cat-rel-coprime' },
      { id: 's3-7', label: '(20; 21)', category: 'cat-rel-coprime' },
      { id: 's3-8', label: '(11; 13)', category: 'cat-rel-coprime' },
      { id: 's3-9', label: '(12; 18)', category: 'cat-rel-mixed' },
      { id: 's3-10', label: '(20; 30)', category: 'cat-rel-mixed' },
      { id: 's3-11', label: '(18; 24)', category: 'cat-rel-mixed' },
      { id: 's3-12', label: '(40; 50)', category: 'cat-rel-mixed' }
    ]
  }
};

export const LeastCommonMultipleSorter: React.FC<LeastCommonMultipleSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-lcm',
  topicTitle = '9. Legkisebb közös többszörös'
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
      themeColor="purple"
    />
  );
};

export default LeastCommonMultipleSorter;
