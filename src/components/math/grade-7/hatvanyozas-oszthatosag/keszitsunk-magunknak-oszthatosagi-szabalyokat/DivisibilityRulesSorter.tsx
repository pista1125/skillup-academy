import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisibilityRulesSorterProps {
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
    title: '1. Szint: Helyes vagy Hibás Szabálykészítés?',
    subtitle: 'Válogasd szét a felbontásokat aszerint, hogy a tényezők relatív prímek-e!',
    categories: [
      {
        id: 'cat-valid-rule',
        name: 'Helyes szabálykészítés',
        description: 'A tényezők relatív prímek',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-invalid-rule',
        name: 'Hibás szabálykészítés',
        description: 'A tényezők nem relatív prímek',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's1-1', label: '12-höz: 3 és 4 vizsgálata', category: 'cat-valid-rule' },
      { id: 's1-2', label: '15-höz: 3 és 5 vizsgálata', category: 'cat-valid-rule' },
      { id: 's1-3', label: '18-hoz: 2 és 9 vizsgálata', category: 'cat-valid-rule' },
      { id: 's1-4', label: '24-hez: 3 és 8 vizsgálata', category: 'cat-valid-rule' },
      { id: 's1-5', label: '36-hoz: 4 és 9 vizsgálata', category: 'cat-valid-rule' },
      { id: 's1-6', label: '45-höz: 5 és 9 vizsgálata', category: 'cat-valid-rule' },
      { id: 's1-7', label: '12-höz: 2 és 6 vizsgálata', category: 'cat-invalid-rule' },
      { id: 's1-8', label: '18-hoz: 3 és 6 vizsgálata', category: 'cat-invalid-rule' },
      { id: 's1-9', label: '20-hoz: 2 és 10 vizsgálata', category: 'cat-invalid-rule' },
      { id: 's1-10', label: '24-hez: 4 és 6 vizsgálata', category: 'cat-invalid-rule' },
      { id: 's1-11', label: '36-hoz: 6 és 6 vizsgálata', category: 'cat-invalid-rule' },
      { id: 's1-12', label: '40-hez: 4 és 10 vizsgálata', category: 'cat-invalid-rule' }
    ]
  },
  2: {
    title: '2. Szint: Oszthatóság 12-vel, 15-tel vagy 18-cal',
    subtitle: 'Sorold be a számokat az összetett osztójuk alapján a megfelelő kategóriába!',
    categories: [
      {
        id: 'cat-div-12',
        name: 'Osztható 12-vel',
        description: '3-mal és 4-gyel is osztható',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-div-15',
        name: 'Osztható 15-tel',
        description: '3-mal és 5-tel is osztható',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      },
      {
        id: 'cat-div-18',
        name: 'Osztható 18-cal',
        description: '2-vel és 9-cel is osztható',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      }
    ],
    items: [
      { id: 's2-1', label: '84', category: 'cat-div-12' },
      { id: 's2-2', label: '132', category: 'cat-div-12' },
      { id: 's2-3', label: '156', category: 'cat-div-12' },
      { id: 's2-4', label: '348', category: 'cat-div-12' },
      { id: 's2-5', label: '75', category: 'cat-div-15' },
      { id: 's2-6', label: '105', category: 'cat-div-15' },
      { id: 's2-7', label: '165', category: 'cat-div-15' },
      { id: 's2-8', label: '255', category: 'cat-div-15' },
      { id: 's2-9', label: '126', category: 'cat-div-18' },
      { id: 's2-10', label: '162', category: 'cat-div-18' },
      { id: 's2-11', label: '198', category: 'cat-div-18' },
      { id: 's2-12', label: '234', category: 'cat-div-18' }
    ]
  },
  3: {
    title: '3. Szint: Oszthatóság 36-tal, 45-tel vagy Egyikkel Sem',
    subtitle: 'Válogasd szét a háromjegyű számokat összetett oszthatóságuk szerint!',
    categories: [
      {
        id: 'cat-div-36',
        name: 'Osztható 36-tal',
        description: '4-gyel és 9-cel is osztható',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'cat-div-45',
        name: 'Osztható 45-tel',
        description: '5-tel és 9-cel is osztható',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-neither',
        name: 'Egyikkel sem osztható',
        description: 'Sem 36-tal, sem 45-tel nem osztható',
        badgeColor: 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-200'
      }
    ],
    items: [
      { id: 's3-1', label: '144', category: 'cat-div-36' },
      { id: 's3-2', label: '252', category: 'cat-div-36' },
      { id: 's3-3', label: '324', category: 'cat-div-36' },
      { id: 's3-4', label: '468', category: 'cat-div-36' },
      { id: 's3-5', label: '135', category: 'cat-div-45' },
      { id: 's3-6', label: '225', category: 'cat-div-45' },
      { id: 's3-7', label: '315', category: 'cat-div-45' },
      { id: 's3-8', label: '495', category: 'cat-div-45' },
      { id: 's3-9', label: '154', category: 'cat-neither' },
      { id: 's3-10', label: '235', category: 'cat-neither' },
      { id: 's3-11', label: '316', category: 'cat-neither' },
      { id: 's3-12', label: '422', category: 'cat-neither' }
    ]
  }
};

export const DivisibilityRulesSorter: React.FC<DivisibilityRulesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-custom-rules',
  topicTitle = '6. Készítsünk magunknak oszthatósági szabályokat!'
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
      themeColor="teal"
    />
  );
};

export default DivisibilityRulesSorter;
