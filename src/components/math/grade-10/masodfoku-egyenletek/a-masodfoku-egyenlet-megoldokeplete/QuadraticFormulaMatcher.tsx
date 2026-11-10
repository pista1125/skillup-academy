import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface QuadraticFormulaMatcherProps {
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
    title: 'Együtthatók azonosítása előjelekkel',
    subtitle: 'Párosítsd a másodfokú egyenleteket az a, b, c együtthatóik pontos értékével!',
    pairs: [
      { id: 'm1-1', left: '2x² - 5x + 3 = 0', right: 'a = 2, b = -5, c = 3' },
      { id: 'm1-2', left: '-x² + 4x - 7 = 0', right: 'a = -1, b = 4, c = -7' },
      { id: 'm1-3', left: '3x² - 12 = 0', right: 'a = 3, b = 0, c = -12' },
      { id: 'm1-4', left: '5x² + 10x = 0', right: 'a = 5, b = 10, c = 0' },
      { id: 'm1-5', left: 'x² - x - 1 = 0', right: 'a = 1, b = -1, c = -1' },
      { id: 'm1-6', left: 'x² + 6x = 7', right: 'a = 1, b = 6, c = -7 (0-ra rendezve)' },
      { id: 'm1-7', left: '2x - x² + 5 = 0', right: 'a = -1, b = 2, c = 5 (átrendezve)' },
      { id: 'm1-8', left: '4x² + 8x + 4 = 0', right: 'a = 4, b = 8, c = 4' }
    ]
  },
  2: {
    title: 'Diszkrimináns (D = b² - 4ac) kiszámítása',
    subtitle: 'Párosítsd az egyenleteket a hozzájuk tartozó diszkrimináns értékével!',
    pairs: [
      { id: 'm2-1', left: 'x² - 6x + 5 = 0', right: 'D = 16 (36 - 20 = 16 > 0)' },
      { id: 'm2-2', left: 'x² - 4x + 4 = 0', right: 'D = 0 (16 - 16 = 0, egyetlen gyök)' },
      { id: 'm2-3', left: 'x² + 2x + 5 = 0', right: 'D = -16 (4 - 20 = -16 < 0, nincs gyök)' },
      { id: 'm2-4', left: '2x² - 3x - 2 = 0', right: 'D = 25 (9 - 4·2·(-2) = 9 + 16 = 25)' },
      { id: 'm2-5', left: '3x² - 6x + 3 = 0', right: 'D = 0 (36 - 36 = 0)' },
      { id: 'm2-6', left: 'x² - 7x + 10 = 0', right: 'D = 9 (49 - 40 = 9)' },
      { id: 'm2-7', left: '2x² + x - 1 = 0', right: 'D = 9 (1 - 4·2·(-1) = 1 + 8 = 9)' },
      { id: 'm2-8', left: 'x² - 2x + 10 = 0', right: 'D = -36 (4 - 40 = -36)' }
    ]
  },
  3: {
    title: 'Egyenlet és valós gyökök párosítása',
    subtitle: 'Párosítsd a másodfokú egyenleteket a megoldóképlettel kiszámított gyökeikkel!',
    pairs: [
      { id: 'm3-1', left: 'x² - 5x + 6 = 0', right: 'x₁ = 3 és x₂ = 2' },
      { id: 'm3-2', left: 'x² - 6x + 9 = 0', right: 'x₁ = x₂ = 3 (kettős gyök)' },
      { id: 'm3-3', left: 'x² + 4 = 0', right: 'Nincs valós gyök (x ∈ ∅)' },
      { id: 'm3-4', left: '2x² - 5x + 2 = 0', right: 'x₁ = 2 és x₂ = 1/2' },
      { id: 'm3-5', left: 'x² + 3x - 10 = 0', right: 'x₁ = 2 és x₂ = -5' },
      { id: 'm3-6', left: '-x² + 4x - 3 = 0', right: 'x₁ = 1 és x₂ = 3' },
      { id: 'm3-7', left: '3x² - 12x = 0', right: 'x₁ = 0 és x₂ = 4' },
      { id: 'm3-8', left: 'x² - 2x + 5 = 0', right: 'Nincs valós gyök (D = -16 < 0)' }
    ]
  }
};

export const QuadraticFormulaMatcher: React.FC<QuadraticFormulaMatcherProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'a-masodfoku-egyenlet-megoldokeplete',
  topicTitle = 'A másodfokú egyenlet megoldóképlete'
}) => {
  const activeLevel = level || currentLevel;

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

export default QuadraticFormulaMatcher;

