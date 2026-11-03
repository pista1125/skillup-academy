import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LinearSorterProps {
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
    title: '1. Szint: Függvények Monotonitása (m előjele)',
    subtitle: 'Döntsd el a képletek alapján, hogy a függvény növekvő, csökkenő vagy konstans!',
    categories: [
      {
        id: 'cat-increasing',
        name: 'Szigorúan Növekvő (m > 0)',
        description: 'Balról jobbra emelkedő egyenes',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-decreasing',
        name: 'Szigorúan Csökkenő (m < 0)',
        description: 'Balról jobbra süllyedő egyenes',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-constant',
        name: 'Konstans Függvény (m = 0)',
        description: 'Vízszintes egyenes, értéke állandó',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // Növekvő
      { id: 'ls1-1', label: 'f(x) = 4x - 7', category: 'cat-increasing' },
      { id: 'ls1-2', label: 'g(x) = 0.5x + 3', category: 'cat-increasing' },
      { id: 'ls1-3', label: 'h(x) = 2x', category: 'cat-increasing' },
      { id: 'ls1-4', label: 'k(x) = x - 100', category: 'cat-increasing' },
      // Csökkenő
      { id: 'ls1-5', label: 'f(x) = -3x + 8', category: 'cat-decreasing' },
      { id: 'ls1-6', label: 'g(x) = 5 - 2x (m = -2!)', category: 'cat-decreasing' },
      { id: 'ls1-7', label: 'h(x) = -x', category: 'cat-decreasing' },
      { id: 'ls1-8', label: 'k(x) = -0.1x - 4', category: 'cat-decreasing' },
      // Konstans
      { id: 'ls1-9', label: 'f(x) = 6', category: 'cat-constant' },
      { id: 'ls1-10', label: 'g(x) = -3', category: 'cat-constant' },
      { id: 'ls1-11', label: 'h(x) = 0', category: 'cat-constant' },
      { id: 'ls1-12', label: 'k(x) = π (kb. 3.14)', category: 'cat-constant' }
    ]
  },
  2: {
    title: '2. Szint: Y-tengelymetszet Elhelyezkedése (b)',
    subtitle: 'Hol metszi a grafikon az y tengelyt?',
    categories: [
      {
        id: 'cat-b-pos',
        name: 'Pozitív Tengelymetszet (b > 0)',
        description: 'Az x-tengely felett metszi az y tengelyt',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-b-neg',
        name: 'Negatív Tengelymetszet (b < 0)',
        description: 'Az x-tengely alatt metszi az y tengelyt',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      },
      {
        id: 'cat-b-zero',
        name: 'Origóban Metszi (b = 0)',
        description: 'Pontosan az origón halad át: M_y(0; 0)',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      // b > 0
      { id: 'ls2-1', label: 'y = 2x + 5', category: 'cat-b-pos' },
      { id: 'ls2-2', label: 'y = -3x + 1', category: 'cat-b-pos' },
      { id: 'ls2-3', label: 'y = 8 (konstans)', category: 'cat-b-pos' },
      { id: 'ls2-4', label: 'y = 4 - x', category: 'cat-b-pos' },
      // b < 0
      { id: 'ls2-5', label: 'y = 3x - 4', category: 'cat-b-neg' },
      { id: 'ls2-6', label: 'y = -x - 9', category: 'cat-b-neg' },
      { id: 'ls2-7', label: 'y = -2 (konstans)', category: 'cat-b-neg' },
      { id: 'ls2-8', label: 'y = 0.5x - 1', category: 'cat-b-neg' },
      // b = 0
      { id: 'ls2-9', label: 'y = 5x (egyenes arányosság)', category: 'cat-b-zero' },
      { id: 'ls2-10', label: 'y = -2x', category: 'cat-b-zero' },
      { id: 'ls2-11', label: 'y = x (főátló)', category: 'cat-b-zero' },
      { id: 'ls2-12', label: 'y = 0 (x tengely)', category: 'cat-b-zero' }
    ]
  },
  3: {
    title: '3. Szint: Zérushely (x₀) Előjele',
    subtitle: 'Számold ki x₀ = -b/m értékét, és csoportosítsd a függvényeket!',
    categories: [
      {
        id: 'cat-zero-pos',
        name: 'Pozitív Zérushely (x₀ > 0)',
        description: 'Az origótól jobbra metszi az x tengelyt',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-zero-neg',
        name: 'Negatív Zérushely (x₀ < 0)',
        description: 'Az origótól balra metszi az x tengelyt',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      },
      {
        id: 'cat-zero-none-or-orig',
        name: 'Origó (x₀ = 0) VAGY Nincs Zérushely',
        description: 'Átmegy a (0;0)-n VAGY nem metszi az x tengelyt',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      }
    ],
    items: [
      // x0 > 0
      { id: 'ls3-1', label: 'f(x) = 2x - 8 (x₀ = 4)', category: 'cat-zero-pos' },
      { id: 'ls3-2', label: 'g(x) = -3x + 9 (x₀ = 3)', category: 'cat-zero-pos' },
      { id: 'ls3-3', label: 'h(x) = 5x - 1 (x₀ = 0.2)', category: 'cat-zero-pos' },
      { id: 'ls3-4', label: 'k(x) = -x + 6 (x₀ = 6)', category: 'cat-zero-pos' },
      // x0 < 0
      { id: 'ls3-5', label: 'f(x) = 2x + 10 (x₀ = -5)', category: 'cat-zero-neg' },
      { id: 'ls3-6', label: 'g(x) = -4x - 12 (x₀ = -3)', category: 'cat-zero-neg' },
      { id: 'ls3-7', label: 'h(x) = 3x + 6 (x₀ = -2)', category: 'cat-zero-neg' },
      { id: 'ls3-8', label: 'k(x) = -2x - 8 (x₀ = -4)', category: 'cat-zero-neg' },
      // x0 = 0 vagy nincs
      { id: 'ls3-9', label: 'f(x) = 7x (x₀ = 0, origó)', category: 'cat-zero-none-or-orig' },
      { id: 'ls3-10', label: 'g(x) = 5 (konstans, nincs zérushelye)', category: 'cat-zero-none-or-orig' },
      { id: 'ls3-11', label: 'h(x) = -3x (x₀ = 0, origó)', category: 'cat-zero-none-or-orig' },
      { id: 'ls3-12', label: 'k(x) = -4 (konstans, nincs zérushelye)', category: 'cat-zero-none-or-orig' }
    ]
  }
};

export const LinearSorter: React.FC<LinearSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'linearis-fuggvenyek',
  topicTitle = 'Lineáris függvények'
}) => {
  const activeLevel = (currentLevel ?? level) as DifficultyLevel;

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
      activityType="g9-func-linearis-sorter"
    />
  );
};

