import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DiscriminantMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Egyenlet és a diszkrimináns pontos értéke',
    subtitle: 'Párosítsd a másodfokú egyenleteket a hozzájuk tartozó diszkrimináns értékével és előjelével!',
    pairs: [
      { id: 'dm1-1', left: 'x² - 4x + 3 = 0', right: 'D = 16 - 12 = 4 (D > 0)' },
      { id: 'dm1-2', left: 'x² - 6x + 9 = 0', right: 'D = 36 - 36 = 0 (D = 0)' },
      { id: 'dm1-3', left: 'x² + 2x + 5 = 0', right: 'D = 4 - 20 = -16 (D < 0)' },
      { id: 'dm1-4', left: '2x² - 3x - 2 = 0', right: 'D = 9 - 4(2)(-2) = 25 (D > 0)' },
      { id: 'dm1-5', left: '3x² - 2x + 1 = 0', right: 'D = 4 - 12 = -8 (D < 0)' },
      { id: 'dm1-6', left: '4x² - 12x + 9 = 0', right: 'D = 144 - 144 = 0 (D = 0)' },
      { id: 'dm1-7', left: 'x² + 8x + 16 = 0', right: 'D = 64 - 64 = 0 (D = 0)' },
      { id: 'dm1-8', left: 'x² - 5x - 6 = 0', right: 'D = 25 - 4(1)(-6) = 49 (D > 0)' }
    ]
  },
  2: {
    title: 'Diszkrimináns előjele és a gyökök geometriai helyzete',
    subtitle: 'Párosítsd a feltételeket a parabola helyzetével és a valós megoldások számával!',
    pairs: [
      { id: 'dm2-1', left: 'D > 0 és a > 0', right: 'A parabola 2 helyen metszi az x-tengelyt (szelő, 2 valós gyök)' },
      { id: 'dm2-2', left: 'D = 0 és a > 0', right: 'A parabola csúcspontja érinti az x-tengelyt (1 kettős gyök)' },
      { id: 'dm2-3', left: 'D < 0 és a > 0', right: 'A parabola az x-tengely felett lebeg (minden x-re pozitív, 0 gyök)' },
      { id: 'dm2-4', left: 'D < 0 és a < 0', right: 'A parabola az x-tengely alatt halad (minden x-re negatív, 0 gyök)' },
      { id: 'dm2-5', left: 'a és c ellentétes előjelű (ac < 0)', right: 'Biztosan D > 0, mindig 2 különböző valós gyök van' },
      { id: 'dm2-6', left: 'D = 0 bármely a ≠ 0 esetén', right: 'A polinom teljes négyzetté alakítható: a(x - x₀)² = 0' },
      { id: 'dm2-7', left: 'x₁ = x₂ = -b / (2a)', right: 'A parabola csúcspontjának x-koordinátája, amikor D = 0' },
      { id: 'dm2-8', left: 'D < 0 a valós számok körében', right: '√D nem értelmezett ℝ-ben, a megoldáshalmaz üres halmaz (∅)' }
    ]
  },
  3: {
    title: 'Paraméteres vizsgálatok és gyökszám feltételek',
    subtitle: 'Párosítsd a paraméteres egyenleteket a megadott gyökszámot biztosító feltétellel!',
    pairs: [
      { id: 'dm3-1', left: 'x² - 6x + p = 0 esetén pontosan 1 valós gyök van', right: 'p = 9 (mert D = 36 - 4p = 0)' },
      { id: 'dm3-2', left: 'x² - 6x + p = 0 esetén 2 különböző valós gyök van', right: 'p < 9 (mert D = 36 - 4p > 0)' },
      { id: 'dm3-3', left: 'x² - 6x + p = 0 esetén nincs valós gyök', right: 'p > 9 (mert D = 36 - 4p < 0)' },
      { id: 'dm3-4', left: 'x² + px + 16 = 0 esetén pontosan 1 valós gyök van', right: 'p = 8 vagy p = -8 (mert p² = 64)' },
      { id: 'dm3-5', left: 'x² + px + 25 = 0 esetén nincs valós gyök', right: '-10 < p < 10 (mert p² - 100 < 0)' },
      { id: 'dm3-6', left: 'x² + 4x + (k - 1) = 0 esetén 2 valós gyök van', right: 'k < 5 (mert D = 16 - 4(k - 1) > 0)' },
      { id: 'dm3-7', left: 'px² + 4x + 1 = 0 másodfokú és 1 valós gyöke van', right: 'p = 4 (mivel p ≠ 0 és 16 - 4p = 0)' },
      { id: 'dm3-8', left: 'x² + 2x + m = 0 mindig pozitív (minden x ∈ ℝ-re)', right: 'm > 1 (mert D = 4 - 4m < 0 és a = 1 > 0)' }
    ]
  }
};

export const DiscriminantMatcher: React.FC<DiscriminantMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-quad-diszkriminans',
  topicTitle = 'A másodfokú egyenlet diszkriminánsa'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      levelConfigs={matcherLevels}
    />
  );
};

