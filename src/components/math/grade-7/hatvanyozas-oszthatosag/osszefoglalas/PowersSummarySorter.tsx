import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PowersSummarySorterProps {
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
    title: '1. Szint: Hatványkifejezések Előjele',
    subtitle: 'Válogasd szét a hatványkifejezéseket aszerint, hogy az eredmény pozitív vagy negatív szám!',
    categories: [
      {
        id: 'cat-positive',
        name: 'Pozitív érték',
        description: 'Eredmény nagyobb mint 0',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
      },
      {
        id: 'cat-negative',
        name: 'Negatív érték',
        description: 'Eredmény kisebb mint 0',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300'
      }
    ],
    items: [
      { id: 's1-1', label: '(-3)²', category: 'cat-positive' },
      { id: 's1-2', label: '(-1)¹⁰', category: 'cat-positive' },
      { id: 's1-3', label: '(-2)⁶', category: 'cat-positive' },
      { id: 's1-4', label: '(-5)⁴', category: 'cat-positive' },
      { id: 's1-5', label: '-(-2)³', category: 'cat-positive' },
      { id: 's1-6', label: '4³', category: 'cat-positive' },
      { id: 's1-7', label: '(-3)³', category: 'cat-negative' },
      { id: 's1-8', label: '-3²', category: 'cat-negative' },
      { id: 's1-9', label: '(-1)¹⁵', category: 'cat-negative' },
      { id: 's1-10', label: '-5⁴', category: 'cat-negative' },
      { id: 's1-11', label: '(-7)¹', category: 'cat-negative' },
      { id: 's1-12', label: '-(-3)²', category: 'cat-negative' }
    ]
  },
  2: {
    title: '2. Szint: Oszthatóság 6-tal',
    subtitle: 'Válogasd szét a számokat aszerint, hogy oszthatók-e 6-tal (párosak és összegük osztható 3-mal)!',
    categories: [
      {
        id: 'cat-div-6',
        name: 'Osztható 6-tal',
        description: '2-vel és 3-mal is osztható',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300'
      },
      {
        id: 'cat-not-div-6',
        name: 'Nem osztható 6-tal',
        description: 'Legalább az egyik feltétel hiányzik',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's2-1', label: '126', category: 'cat-div-6' },
      { id: 's2-2', label: '234', category: 'cat-div-6' },
      { id: 's2-3', label: '738', category: 'cat-div-6' },
      { id: 's2-4', label: '918', category: 'cat-div-6' },
      { id: 's2-5', label: '1002', category: 'cat-div-6' },
      { id: 's2-6', label: '1518', category: 'cat-div-6' },
      { id: 's2-7', label: '340', category: 'cat-not-div-6' },
      { id: 's2-8', label: '512', category: 'cat-not-div-6' },
      { id: 's2-9', label: '845', category: 'cat-not-div-6' },
      { id: 's2-10', label: '1113', category: 'cat-not-div-6' },
      { id: 's2-11', label: '1235', category: 'cat-not-div-6' },
      { id: 's2-12', label: '1450', category: 'cat-not-div-6' }
    ]
  },
  3: {
    title: '3. Szint: Számelméleti Csoportosítás',
    subtitle: 'Sorold be a számokat a pontos számelméleti kategóriájukba!',
    categories: [
      {
        id: 'cat-prime',
        name: 'Prímszám',
        description: 'Pontosan 2 pozitív osztó',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300'
      },
      {
        id: 'cat-composite-even',
        name: 'Összetett szám',
        description: 'Páros számú osztó',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300 dark:bg-indigo-950/60 dark:text-indigo-300'
      },
      {
        id: 'cat-square',
        name: 'Négyzetszám',
        description: 'Páratlan számú osztó',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
      }
    ],
    items: [
      { id: 's3-1', label: '17', category: 'cat-prime' },
      { id: 's3-2', label: '29', category: 'cat-prime' },
      { id: 's3-3', label: '31', category: 'cat-prime' },
      { id: 's3-4', label: '43', category: 'cat-prime' },
      { id: 's3-5', label: '12', category: 'cat-composite-even' },
      { id: 's3-6', label: '18', category: 'cat-composite-even' },
      { id: 's3-7', label: '20', category: 'cat-composite-even' },
      { id: 's3-8', label: '24', category: 'cat-composite-even' },
      { id: 's3-9', label: '16', category: 'cat-square' },
      { id: 's3-10', label: '25', category: 'cat-square' },
      { id: 's3-11', label: '36', category: 'cat-square' },
      { id: 's3-12', label: '49', category: 'cat-square' }
    ]
  }
};

export const PowersSummarySorter: React.FC<PowersSummarySorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g7-powers-summary',
  topicTitle = '11. Összefoglalás'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      levels={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="slate"
      badgeText="7. Osztály • Matematika IV. Témakör • Összefoglalás"
    />
  );
};

export default PowersSummarySorter;
