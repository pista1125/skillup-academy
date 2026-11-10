import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ApplyFormulaMatcherProps {
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
    title: 'Egyenlet átalakítása kanonikus 0-ra rendezett alakra',
    subtitle: 'Párosítsd a kifejtendő egyenleteket az ekvivalens, 0-ra rendezett alakjukkal!',
    pairs: [
      { id: 'm1-1', left: '(x - 3)(x + 2) = 14', right: 'x² - x - 20 = 0' },
      { id: 'm1-2', left: '(2x - 1)² = x + 5', right: '4x² - 5x - 4 = 0' },
      { id: 'm1-3', left: '3x(x - 2) = 2x + 5', right: '3x² - 8x - 5 = 0' },
      { id: 'm1-4', left: '(x + 4)² = 8x + 25', right: 'x² - 9 = 0' },
      { id: 'm1-5', left: 'x/2 + 3/x = 7/2', right: 'x² - 7x + 6 = 0 (és x ≠ 0)' },
      { id: 'm1-6', left: '2(x - 1)(x + 1) = 3x - 1', right: '2x² - 3x - 1 = 0' },
      { id: 'm1-7', left: '(x - 5)² = 25', right: 'x² - 10x = 0' },
      { id: 'm1-8', left: '6x² - 18x = 24', right: 'x² - 3x - 4 = 0 (6-tal leosztva)' }
    ]
  },
  2: {
    title: 'Összetett egyenletek és a megoldások halmaza',
    subtitle: 'Párosítsd az egyenleteket a pontos megoldáshalmazukkal (ügyelve a kikötésekre is)!',
    pairs: [
      { id: 'm2-1', left: 'x² - x - 20 = 0', right: 'x₁ = 5 és x₂ = -4' },
      { id: 'm2-2', left: '(x² - 4)/(x - 2) = 0', right: 'Csak x = -2 (x = 2 hamis gyök a kikötés miatt!)' },
      { id: 'm2-3', left: 'x² - 6x + 7 = 0', right: 'x₁,₂ = 3 ± √2 (irracionális gyökök)' },
      { id: 'm2-4', left: '2x² - 8x + 8 = 0', right: 'x₁ = x₂ = 2 (egyetlen kettős gyök)' },
      { id: 'm2-5', left: '(x + 1)/x = 2/x', right: 'x = 1 (mert x ≠ 0)' },
      { id: 'm2-6', left: 'x² - 4x + 13 = 0', right: 'Nincs valós gyök (D = -36 < 0)' },
      { id: 'm2-7', left: '3x² - 12x = 0', right: 'x₁ = 0 és x₂ = 4' },
      { id: 'm2-8', left: 'x² - 2x - 1 = 0', right: 'x₁,₂ = 1 ± √2' }
    ]
  },
  3: {
    title: 'Gyökök és Viète-összefüggések (Összeg és Szorzat)',
    subtitle: 'Párosítsd a gyökpárokat a Viète-formulák szerinti összegükkel és szorzatukkal!',
    pairs: [
      { id: 'm3-1', left: 'x₁ = 3, x₂ = 5', right: 'Összeg = 8, Szorzat = 15 ⟹ x² - 8x + 15 = 0' },
      { id: 'm3-2', left: 'x₁ = -2, x₂ = 7', right: 'Összeg = 5, Szorzat = -14 ⟹ x² - 5x - 14 = 0' },
      { id: 'm3-3', left: 'x₁ = -4, x₂ = -1', right: 'Összeg = -5, Szorzat = 4 ⟹ x² + 5x + 4 = 0' },
      { id: 'm3-4', left: 'x₁ = 1/2, x₂ = 3', right: 'Összeg = 7/2, Szorzat = 3/2 ⟹ 2x² - 7x + 3 = 0' },
      { id: 'm3-5', left: 'x₁ = -3, x₂ = 3', right: 'Összeg = 0, Szorzat = -9 ⟹ x² - 9 = 0' },
      { id: 'm3-6', left: 'x₁ = 1 + √3, x₂ = 1 - √3', right: 'Összeg = 2, Szorzat = -2 ⟹ x² - 2x - 2 = 0' },
      { id: 'm3-7', left: 'x₁ = 4, x₂ = 4', right: 'Összeg = 8, Szorzat = 16 ⟹ x² - 8x + 16 = 0' },
      { id: 'm3-8', left: 'x₁ = 0, x₂ = 6', right: 'Összeg = 6, Szorzat = 0 ⟹ x² - 6x = 0' }
    ]
  }
};

export const ApplyFormulaMatcher: React.FC<ApplyFormulaMatcherProps> = ({
  level,
  currentLevel = 1,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'alkalmazzuk-a-megoldokepletet',
  topicTitle = 'Alkalmazzuk a megoldóképletet!'
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

export default ApplyFormulaMatcher;

