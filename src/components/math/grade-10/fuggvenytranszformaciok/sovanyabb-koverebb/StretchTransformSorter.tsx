import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface StretchTransformSorterProps {
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
    title: 'Meredekség és görbület (|a| értéke)',
    subtitle: 'Válogasd szét a függvényeket az együttható abszolút értéke (|a|) szerinti alakjuk alapján!',
    categories: [
      {
        id: 'cat-slim',
        name: '„Soványabb” (|a| > 1)',
        description: 'Függőlegesen nyújtott, meredekebb szárak',
        badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300'
      },
      {
        id: 'cat-normal',
        name: 'Normál alak (|a| = 1)',
        description: 'Alapgörbével megegyező meredekség',
        badgeColor: 'bg-slate-100 text-slate-900 border-slate-300'
      },
      {
        id: 'cat-wide',
        name: '„Kövérebb” (0 < |a| < 1)',
        description: 'Függőlegesen zsugorított, laposabb, öblösebb',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      }
    ],
    items: [
      { id: 'sts1-1', content: 'f(x) = 3x²', categoryId: 'cat-slim' },
      { id: 'sts1-2', content: 'f(x) = 0,5x²', categoryId: 'cat-wide' },
      { id: 'sts1-3', content: 'f(x) = -x²', categoryId: 'cat-normal' },
      { id: 'sts1-4', content: 'f(x) = -4x²', categoryId: 'cat-slim' },
      { id: 'sts1-5', content: 'f(x) = 0,25|x|', categoryId: 'cat-wide' },
      { id: 'sts1-6', content: 'f(x) = |x|', categoryId: 'cat-normal' },
      { id: 'sts1-7', content: 'f(x) = 2|x|', categoryId: 'cat-slim' },
      { id: 'sts1-8', content: 'f(x) = -0,2x²', categoryId: 'cat-wide' },
      { id: 'sts1-9', content: 'f(x) = -|x|', categoryId: 'cat-normal' },
      { id: 'sts1-10', content: 'f(x) = 5x²', categoryId: 'cat-slim' },
      { id: 'sts1-11', content: 'f(x) = 0,1x²', categoryId: 'cat-wide' },
      { id: 'sts1-12', content: 'f(x) = x²', categoryId: 'cat-normal' }
    ]
  },
  2: {
    title: 'Szélsőérték jellege (a előjele)',
    subtitle: 'Csoportosítsd a függvényeket aszerint, hogy felfelé vagy lefelé nyílnak!',
    categories: [
      {
        id: 'cat-has-min',
        name: 'Globális minimuma van (a > 0)',
        description: 'Felfelé nyíló görbe, az origóban van a legkisebb érték',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
      },
      {
        id: 'cat-has-max',
        name: 'Globális maximuma van (a < 0)',
        description: 'Lefelé nyíló, x-tengelyre tükrözött görbe',
        badgeColor: 'bg-rose-100 text-rose-900 border-rose-300'
      }
    ],
    items: [
      { id: 'sts2-1', content: 'f(x) = 2x²', categoryId: 'cat-has-min' },
      { id: 'sts2-2', content: 'f(x) = -3x²', categoryId: 'cat-has-max' },
      { id: 'sts2-3', content: 'f(x) = 0,4|x|', categoryId: 'cat-has-min' },
      { id: 'sts2-4', content: 'f(x) = -0,5|x|', categoryId: 'cat-has-max' },
      { id: 'sts2-5', content: 'f(x) = -x²', categoryId: 'cat-has-max' },
      { id: 'sts2-6', content: 'f(x) = 10x²', categoryId: 'cat-has-min' },
      { id: 'sts2-7', content: 'f(x) = -(x - 2)²', categoryId: 'cat-has-max' },
      { id: 'sts2-8', content: 'f(x) = 0,1(x + 3)²', categoryId: 'cat-has-min' },
      { id: 'sts2-9', content: 'f(x) = -5|x + 1|', categoryId: 'cat-has-max' },
      { id: 'sts2-10', content: 'f(x) = 3(x - 4)²', categoryId: 'cat-has-min' }
    ]
  },
  3: {
    title: 'Értékkészlet (Rf) szerinti besorolás',
    subtitle: 'Válogasd szét a függvényeket a felvett értékkészletük alapján!',
    categories: [
      {
        id: 'cat-nonneg-rf',
        name: 'Rf = [0; ∞[ (nemnegatív számok)',
        description: 'Felfelé nyíló, nem eltolt görbék',
        badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300'
      },
      {
        id: 'cat-nonpos-rf',
        name: 'Rf = ]-∞; 0] (nempozitív számok)',
        description: 'Lefelé nyíló, tükrözött, nem eltolt görbék',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300'
      },
      {
        id: 'cat-shifted-rf',
        name: 'Eltolt értékkészlet (Rf ≠ [0; ∞[ és ≠ ]-∞; 0])',
        description: 'Függőleges eltolást (+ c) is tartalmazó függvények',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
      }
    ],
    items: [
      { id: 'sts3-1', content: 'f(x) = 4x²', categoryId: 'cat-nonneg-rf' },
      { id: 'sts3-2', content: 'f(x) = -2x²', categoryId: 'cat-nonpos-rf' },
      { id: 'sts3-3', content: 'f(x) = 2x² + 3', categoryId: 'cat-shifted-rf' },
      { id: 'sts3-4', content: 'f(x) = 0,5|x|', categoryId: 'cat-nonneg-rf' },
      { id: 'sts3-5', content: 'f(x) = -3|x|', categoryId: 'cat-nonpos-rf' },
      { id: 'sts3-6', content: 'f(x) = -x² + 5', categoryId: 'cat-shifted-rf' },
      { id: 'sts3-7', content: 'f(x) = 7(x - 2)²', categoryId: 'cat-nonneg-rf' },
      { id: 'sts3-8', content: 'f(x) = -0,2(x + 1)²', categoryId: 'cat-nonpos-rf' },
      { id: 'sts3-9', content: 'f(x) = 3|x| - 4', categoryId: 'cat-shifted-rf' },
      { id: 'sts3-10', content: 'f(x) = -2|x| - 1', categoryId: 'cat-shifted-rf' }
    ]
  }
};

export const StretchTransformSorter: React.FC<StretchTransformSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  topicId = 'g10-fuggvenytranszformaciok',
  topicTitle = '„Soványabb”, „kövérebb”'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <SorterTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={sorterLevels}
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

