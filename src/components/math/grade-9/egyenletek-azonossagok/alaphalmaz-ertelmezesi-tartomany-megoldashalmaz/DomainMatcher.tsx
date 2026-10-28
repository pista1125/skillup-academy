import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DomainInclusionSvg,
  FractionRestrictionSvg,
  SquareRootRestrictionSvg,
  FalseRootSvg
} from './DomainFigures';

interface DomainMatcherProps {
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
    title: '1. Szint: Kifejezések és Kötelező Kikötések',
    subtitle: 'Párosítsd az algebrai kifejezéseket a hozzájuk tartozó kötelező kikötéssel!',
    pairs: [
      {
        id: 'dm1-1',
        prompt: '1 / (x - 4)',
        value: 'x ≠ 4',
        figure: <FractionRestrictionSvg size={65} />
      },
      {
        id: 'dm1-2',
        prompt: '5 / (2x - 10)',
        value: 'x ≠ 5'
      },
      {
        id: 'dm1-3',
        prompt: '(x + 3) / x',
        value: 'x ≠ 0'
      },
      {
        id: 'dm1-4',
        prompt: '7 / (x + 6)',
        value: 'x ≠ -6'
      },
      {
        id: 'dm1-5',
        prompt: '√(x - 3)',
        value: 'x ≥ 3',
        figure: <SquareRootRestrictionSvg size={65} />
      },
      {
        id: 'dm1-6',
        prompt: '1 / [(x - 2)(x + 1)]',
        value: 'x ≠ 2 és x ≠ -1'
      }
    ]
  },
  2: {
    title: '2. Szint: Alaphalmaz és Megoldáshalmaz',
    subtitle: 'Párosítsd az egyenleteket és alaphalmazokat a helyes megoldáshalmazzal!',
    pairs: [
      {
        id: 'dm2-1',
        prompt: '2x = 5, ha A = ℝ',
        value: 'M = {2,5}',
        figure: <DomainInclusionSvg size={65} />
      },
      {
        id: 'dm2-2',
        prompt: '2x = 5, ha A = ℤ',
        value: 'M = ∅ (2,5 nem egész)'
      },
      {
        id: 'dm2-3',
        prompt: 'x² = 9, ha A = ℕ',
        value: 'M = {3} (csak pozitív)'
      },
      {
        id: 'dm2-4',
        prompt: 'x² = 9, ha A = ℤ',
        value: 'M = {-3, 3}'
      },
      {
        id: 'dm2-5',
        prompt: '3x + 15 = 0, ha A = ℕ',
        value: 'M = ∅ (-5 nem természetes)'
      },
      {
        id: 'dm2-6',
        prompt: 'x² = 5, ha A = ℚ',
        value: 'M = ∅ (√5 irracionális)'
      }
    ]
  },
  3: {
    title: '3. Szint: Értelmezési Tartomány és Hamis Gyökök',
    subtitle: 'Párosítsd a kifejezéseket és egyenleteket az É.T. jelölésével vagy hamis gyökükkel!',
    pairs: [
      {
        id: 'dm3-1',
        prompt: 'f(x) = 1 / (x - 7)',
        value: 'É.T. = ℝ \\ {7}'
      },
      {
        id: 'dm3-2',
        prompt: 'f(x) = √(x + 2)',
        value: 'É.T. = [-2; +∞['
      },
      {
        id: 'dm3-3',
        prompt: '(x² - 16)/(x - 4) = 8, kapott gyök: x = 4',
        value: 'Hamis gyök! M = ∅',
        figure: <FalseRootSvg size={65} />
      },
      {
        id: 'dm3-4',
        prompt: 'f(x) = 3x² - 5x + 1',
        value: 'É.T. = ℝ (nincs kikötés)'
      },
      {
        id: 'dm3-5',
        prompt: 'f(x) = 1 / √(x - 1)',
        value: 'x > 1 (szigorúan nagyobb 0-nál)'
      },
      {
        id: 'dm3-6',
        prompt: 'f(x) = √(5 - x)',
        value: 'x ≤ 5 (mert 5 - x ≥ 0)'
      }
    ]
  }
};

export const DomainMatcher: React.FC<DomainMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenlet-alaphalmaz-quiz',
  topicTitle = 'Alaphalmaz, értelmezési tartomány, megoldáshalmaz'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      levels={matcherLevels}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      color="rose"
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};
