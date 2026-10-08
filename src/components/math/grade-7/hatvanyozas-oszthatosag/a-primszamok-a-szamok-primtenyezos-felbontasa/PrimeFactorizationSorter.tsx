import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PrimeFactorizationSorterProps {
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
    title: '1. Szint: Számok Típusa az Osztók Száma Szerint',
    subtitle: 'Válogasd szét a számokat aszerint, hogy hány pozitív osztójuk van!',
    categories: [
      {
        id: 'cat-one',
        name: 'Egyes Szám',
        description: 'Pontosan 1 pozitív osztója van',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-prime',
        name: 'Prímszám',
        description: 'Pontosan 2 pozitív osztója van',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-composite',
        name: 'Összetett Szám',
        description: '2-nél több pozitív osztója van',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      }
    ],
    items: [
      { id: 's1-1', label: '1', category: 'cat-one' },
      { id: 's1-2', label: '2', category: 'cat-prime' },
      { id: 's1-3', label: '3', category: 'cat-prime' },
      { id: 's1-4', label: '5', category: 'cat-prime' },
      { id: 's1-5', label: '7', category: 'cat-prime' },
      { id: 's1-6', label: '11', category: 'cat-prime' },
      { id: 's1-7', label: '13', category: 'cat-prime' },
      { id: 's1-8', label: '4', category: 'cat-composite' },
      { id: 's1-9', label: '6', category: 'cat-composite' },
      { id: 's1-10', label: '8', category: 'cat-composite' },
      { id: 's1-11', label: '9', category: 'cat-composite' },
      { id: 's1-12', label: '12', category: 'cat-composite' }
    ]
  },
  2: {
    title: '2. Szint: Prímszám vagy Összetett Szám?',
    subtitle: 'Döntsd el a kétjegyű számokról, hogy prímek vagy összetettek!',
    categories: [
      {
        id: 'cat-prime-2',
        name: 'Prímszám',
        description: 'Csak 1 és önmaga az osztója',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-composite-2',
        name: 'Összetett Szám',
        description: 'Van más valódi osztója is',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's2-1', label: '19', category: 'cat-prime-2' },
      { id: 's2-2', label: '29', category: 'cat-prime-2' },
      { id: 's2-3', label: '37', category: 'cat-prime-2' },
      { id: 's2-4', label: '43', category: 'cat-prime-2' },
      { id: 's2-5', label: '73', category: 'cat-prime-2' },
      { id: 's2-6', label: '97', category: 'cat-prime-2' },
      { id: 's2-7', label: '51', category: 'cat-composite-2' },
      { id: 's2-8', label: '57', category: 'cat-composite-2' },
      { id: 's2-9', label: '63', category: 'cat-composite-2' },
      { id: 's2-10', label: '87', category: 'cat-composite-2' },
      { id: 's2-11', label: '91', category: 'cat-composite-2' },
      { id: 's2-12', label: '99', category: 'cat-composite-2' }
    ]
  },
  3: {
    title: '3. Szint: A Legnagyobb Prímtényező Szerint',
    subtitle: 'Csoportosítsd a számokat a felbontásukban szereplő legnagyobb prím alapján!',
    categories: [
      {
        id: 'cat-max-2-3',
        name: 'Legnagyobb prím: 2 vagy 3',
        description: 'Csak 2-es és 3-as prímtényezők',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'cat-max-5',
        name: 'Legnagyobb prím: 5',
        description: 'A felbontás legnagyobb prímje az 5',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-max-7-plus',
        name: 'Legnagyobb prím: 7 vagy több',
        description: 'A felbontásban 7, 11, 13 vagy nagyobb prím is van',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's3-1', label: '16', category: 'cat-max-2-3' },
      { id: 's3-2', label: '27', category: 'cat-max-2-3' },
      { id: 's3-3', label: '36', category: 'cat-max-2-3' },
      { id: 's3-4', label: '54', category: 'cat-max-2-3' },
      { id: 's3-5', label: '25', category: 'cat-max-5' },
      { id: 's3-6', label: '40', category: 'cat-max-5' },
      { id: 's3-7', label: '50', category: 'cat-max-5' },
      { id: 's3-8', label: '75', category: 'cat-max-5' },
      { id: 's3-9', label: '14', category: 'cat-max-7-plus' },
      { id: 's3-10', label: '35', category: 'cat-max-7-plus' },
      { id: 's3-11', label: '26', category: 'cat-max-7-plus' },
      { id: 's3-12', label: '77', category: 'cat-max-7-plus' }
    ]
  }
};

export const PrimeFactorizationSorter: React.FC<PrimeFactorizationSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-prime-factors',
  topicTitle = '5. A prímszámok. A számok prímtényezős felbontása'
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
      themeColor="emerald"
    />
  );
};

export default PrimeFactorizationSorter;
