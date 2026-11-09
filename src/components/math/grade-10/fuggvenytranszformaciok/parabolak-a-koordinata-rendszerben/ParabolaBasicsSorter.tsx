import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ParabolaBasicsSorterProps {
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
    title: 'Zérushelyek száma szerinti csoportosítás',
    subtitle: 'Döntsd el a hozzárendelési szabály alapján, hogy a parabolának hány zérushelye van!',
    categories: [
      {
        id: 'cat-two-zeros',
        name: '2 zérushely (metszi az x-tengelyt)',
        description: 'A parabola csúcsa az x-tengely alatt van, felfelé nyílik',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-one-zero',
        name: '1 zérushely (érinti a tengelyt)',
        description: 'A csúcspont pontosan az x-tengelyre esik',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-300'
      },
      {
        id: 'cat-zero-zeros',
        name: '0 zérushely (lebeg az x-tengely felett)',
        description: 'A csúcspont és az egész parabola az x-tengely felett helyezkedik el',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'pbs1-1', content: 'f(x) = x² - 4', categoryId: 'cat-two-zeros' },
      { id: 'pbs1-2', content: 'f(x) = (x - 3)²', categoryId: 'cat-one-zero' },
      { id: 'pbs1-3', content: 'f(x) = x² + 2', categoryId: 'cat-zero-zeros' },
      { id: 'pbs1-4', content: 'f(x) = (x + 2)² - 9', categoryId: 'cat-two-zeros' },
      { id: 'pbs1-5', content: 'f(x) = x²', categoryId: 'cat-one-zero' },
      { id: 'pbs1-6', content: 'f(x) = (x - 1)² + 4', categoryId: 'cat-zero-zeros' },
      { id: 'pbs1-7', content: 'f(x) = x² - 1', categoryId: 'cat-two-zeros' },
      { id: 'pbs1-8', content: 'f(x) = (x + 5)²', categoryId: 'cat-one-zero' },
      { id: 'pbs1-9', content: 'f(x) = x² + 7', categoryId: 'cat-zero-zeros' },
      { id: 'pbs1-10', content: 'f(x) = (x - 4)² - 1', categoryId: 'cat-two-zeros' }
    ]
  },
  2: {
    title: 'Eltolás típusa az f(x) = x²-hez képest',
    subtitle: 'Válogasd szét a függvényeket aszerint, hogy csak függőlegesen mozognak, vagy vízszintesen is eltolódnak!',
    categories: [
      {
        id: 'cat-vert-only',
        name: 'Csak függőleges eltolás (x² ± c)',
        description: 'A szimmetriatengely változatlanul az y-tengely marad: T(0; c)',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-horiz',
        name: 'Vízszintes eltolást is tartalmaz',
        description: 'A szimmetriatengely elmozdul: (x ∓ u)² szerepel a képletben',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      }
    ],
    items: [
      { id: 'pbs2-1', content: 'f(x) = x² + 5', categoryId: 'cat-vert-only' },
      { id: 'pbs2-2', content: 'f(x) = (x - 3)²', categoryId: 'cat-horiz' },
      { id: 'pbs2-3', content: 'f(x) = x² - 8', categoryId: 'cat-vert-only' },
      { id: 'pbs2-4', content: 'f(x) = (x + 4)² - 2', categoryId: 'cat-horiz' },
      { id: 'pbs2-5', content: 'f(x) = x² + 1', categoryId: 'cat-vert-only' },
      { id: 'pbs2-6', content: 'f(x) = (x - 1)² + 6', categoryId: 'cat-horiz' },
      { id: 'pbs2-7', content: 'f(x) = x² - 16', categoryId: 'cat-vert-only' },
      { id: 'pbs2-8', content: 'f(x) = (x + 2)²', categoryId: 'cat-horiz' },
      { id: 'pbs2-9', content: 'f(x) = x² + 100', categoryId: 'cat-vert-only' },
      { id: 'pbs2-10', content: 'f(x) = (x - 6)² - 5', categoryId: 'cat-horiz' }
    ]
  },
  3: {
    title: 'Értékkészlet minimuma szerint',
    subtitle: 'Csoportosítsd a függvényeket a felvett legkisebb értékük (minimumuk) előjele alapján!',
    categories: [
      {
        id: 'cat-nonneg',
        name: 'Minimum ≥ 0 (Rf ⊆ [0; ∞[)',
        description: 'A függvény soha nem vesz fel negatív értéket',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-neg-min',
        name: 'Minimum < 0 (Negatív értéke is van)',
        description: 'A parabola csúcsa az x-tengely alá süllyed: Rf = [min; ∞[',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'pbs3-1', content: 'f(x) = x²', categoryId: 'cat-nonneg' },
      { id: 'pbs3-2', content: 'f(x) = x² - 3', categoryId: 'cat-neg-min' },
      { id: 'pbs3-3', content: 'f(x) = (x - 4)²', categoryId: 'cat-nonneg' },
      { id: 'pbs3-4', content: 'f(x) = (x - 2)² - 4', categoryId: 'cat-neg-min' },
      { id: 'pbs3-5', content: 'f(x) = x² + 2', categoryId: 'cat-nonneg' },
      { id: 'pbs3-6', content: 'f(x) = (x + 5)² - 1', categoryId: 'cat-neg-min' },
      { id: 'pbs3-7', content: 'f(x) = (x + 1)² + 3', categoryId: 'cat-nonneg' },
      { id: 'pbs3-8', content: 'f(x) = x² - 25', categoryId: 'cat-neg-min' },
      { id: 'pbs3-9', content: 'f(x) = (x - 6)² + 0,5', categoryId: 'cat-nonneg' },
      { id: 'pbs3-10', content: 'f(x) = (x + 3)² - 8', categoryId: 'cat-neg-min' }
    ]
  }
};

export const ParabolaBasicsSorter: React.FC<ParabolaBasicsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'parabolak-a-koordinata-rendszerben',
  topicTitle = 'Parabolák a koordináta-rendszerben'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      levelsConfig={sorterLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

