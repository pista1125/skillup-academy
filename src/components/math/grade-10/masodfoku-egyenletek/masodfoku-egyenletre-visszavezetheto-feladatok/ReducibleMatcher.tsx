import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ReducibleMatcherProps {
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
    title: 'Egyenlet és a célszerű helyettesítés vagy átalakítás',
    subtitle: 'Párosítsd az egyenleteket a hozzájuk tartozó helyettesítéssel vagy első algebrai lépéssel!',
    pairs: [
      { id: 'rm1-1', left: 'x⁴ - 10x² + 9 = 0', right: 'u = x² helyettesítés (u ≥ 0)' },
      { id: 'rm1-2', left: '(x² - 4x)² - 2(x² - 4x) - 15 = 0', right: 'u = x² - 4x helyettesítés' },
      { id: 'rm1-3', left: '3/(x - 1) + 2/x = 4', right: 'Kikötés: x ≠ 1 és x ≠ 0' },
      { id: 'rm1-4', left: '√(2x + 7) = x + 2', right: 'Négyzetre emelés és kötelező ellenőrzés' },
      { id: 'rm1-5', left: 'x³ - 16x = 0', right: 'x kiemelése: x · (x² - 16) = 0' },
      { id: 'rm1-6', left: 'x⁴ - 16 = 0', right: 'u = x² ⟹ u = 16 ⟹ x = ±4 helyett x = ±2' },
      { id: 'rm1-7', left: 'x³ - 2x² - 9x + 18 = 0', right: 'Páronkénti csoportosítás: x²(x - 2) - 9(x - 2) = 0' },
      { id: 'rm1-8', left: '(x + 1/x)² - 4(x + 1/x) + 3 = 0', right: 'u = x + 1/x helyettesítés' }
    ]
  },
  2: {
    title: 'Egyenletek és a valós megoldások halmaza',
    subtitle: 'Párosítsd a visszavezethető egyenleteket a pontos valós gyökeikkel!',
    pairs: [
      { id: 'rm2-1', left: 'x⁴ - 5x² + 4 = 0', right: 'M = {-2; -1; 1; 2} (4 valós gyök)' },
      { id: 'rm2-2', left: 'x⁴ - 3x² - 4 = 0', right: 'M = {-2; 2} (2 valós gyök, mert u = -1 kiesik)' },
      { id: 'rm2-3', left: 'x⁴ + 5x² + 4 = 0', right: 'M = ∅ (0 valós gyök, mindkét u negatív)' },
      { id: 'rm2-4', left: 'x³ - 9x = 0', right: 'M = {-3; 0; 3} (3 valós gyök)' },
      { id: 'rm2-5', left: '√(x + 5) = x - 1', right: 'M = {4} (az x = -1 hamis gyök)' },
      { id: 'rm2-6', left: 'x/(x - 3) = 3/(x - 3)', right: 'M = ∅ (a kapott x = 3 kizárva a kikötés miatt)' },
      { id: 'rm2-7', left: 'x⁴ - 8x² = 0', right: 'M = {-√8; 0; √8}' },
      { id: 'rm2-8', left: 'x³ - 4x² + 4x = 0', right: 'M = {0; 2} (a 0 egyszeres, a 2 kétszeres gyök)' }
    ]
  },
  3: {
    title: 'Köztes gyökök és a helyes szűrési indoklás',
    subtitle: 'Párosítsd a megoldás során kapott részeredményeket a helyes matematikai következtetéssel!',
    pairs: [
      { id: 'rm3-1', left: 'Bikvadratikusnál u₁ = 9, u₂ = -4', right: 'x = ±3 valós gyökök, a negatív u = -4 nem ad valós gyököt' },
      { id: 'rm3-2', left: 'Törtes egyenletnél x₁ = 2, x₂ = 5, de x ≠ 2', right: 'x₁ = 2 hamis gyök, a megoldás kizárólag x = 5' },
      { id: 'rm3-3', left: '√(2x + 1) = x - 1 esetén x₁ = 4, x₂ = 0', right: 'Behelyettesítéskor √1 ≠ -1, így x = 0 hamis gyök, csak x = 4 jó' },
      { id: 'rm3-4', left: 'x⁴ - 6x² + 9 = 0 ⟹ u₁ = u₂ = 3', right: 'Pontosan 2 valós gyök van: x = ±√3' },
      { id: 'rm3-5', left: 'x kiemelése után x · (x² + 4) = 0', right: 'Csak 1 valós gyök van (x = 0), mert x² + 4 > 0 mindig' },
      { id: 'rm3-6', left: '√(x + 2) = -3 egyenlet', right: 'Azonnal látszik, hogy nincs gyök: négyzetgyök soha nem negatív' },
      { id: 'rm3-7', left: '(x² - 1)/(x - 1) = 2 egyenlet', right: 'x + 1 = 2 ⟹ x = 1 hamis gyök (nevező 0), nincs megoldás (∅)' },
      { id: 'rm3-8', left: 'u = x² - x helyettesítésnél u = 6', right: 'x² - x - 6 = 0 ⟹ x₁ = 3, x₂ = -2 valós gyökök' }
    ]
  }
};

export const ReducibleMatcher: React.FC<ReducibleMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-quad-visszavezetheto',
  topicTitle = 'Másodfokú egyenletre visszavezethető feladatok'
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

