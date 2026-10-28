import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  SumSquareSvg,
  DiffSquareSvg,
  SumDiffProductSvg,
  MentalMathSvg
} from './SpecialProductsFigures';

interface SpecialProductsMatcherProps {
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
    title: '1. Szint: Kéttagú Összeg Négyzete: (a + b)²',
    subtitle: 'Párosítsd a négyzetre emelt összegeket a kibontott másodfokú polinommal!',
    pairs: [
      {
        id: 'sm1-1',
        prompt: '(x + 4)²',
        value: 'x² + 8x + 16',
        figure: <SumSquareSvg size={65} />
      },
      {
        id: 'sm1-2',
        prompt: '(x + 1)²',
        value: 'x² + 2x + 1'
      },
      {
        id: 'sm1-3',
        prompt: '(2x + 3)²',
        value: '4x² + 12x + 9'
      },
      {
        id: 'sm1-4',
        prompt: '(x + 5)²',
        value: 'x² + 10x + 25'
      },
      {
        id: 'sm1-5',
        prompt: '(3x + 1)²',
        value: '9x² + 6x + 1'
      },
      {
        id: 'sm1-6',
        prompt: '(x + 7)²',
        value: 'x² + 14x + 49'
      }
    ]
  },
  2: {
    title: '2. Szint: Kéttagú Különbség Négyzete: (a - b)²',
    subtitle: 'Párosítsd a különbség négyzeteket az előjelesen helyes háromtagú alakkal!',
    pairs: [
      {
        id: 'sm2-1',
        prompt: '(x - 3)²',
        value: 'x² - 6x + 9',
        figure: <DiffSquareSvg size={65} />
      },
      {
        id: 'sm2-2',
        prompt: '(2x - 1)²',
        value: '4x² - 4x + 1'
      },
      {
        id: 'sm2-3',
        prompt: '(x - 5)²',
        value: 'x² - 10x + 25'
      },
      {
        id: 'sm2-4',
        prompt: '(3x - 2)²',
        value: '9x² - 12x + 4'
      },
      {
        id: 'sm2-5',
        prompt: '(x - 8)²',
        value: 'x² - 16x + 64'
      },
      {
        id: 'sm2-6',
        prompt: '(5 - x)²',
        value: 'x² - 10x + 25'
      }
    ]
  },
  3: {
    title: '3. Szint: Négyzetek Különbsége és Fejszámolás: (a + b)(a - b)',
    subtitle: 'Párosítsd a szorzatokat a két tag négyzetének különbségével vagy fejszámolt értékével!',
    pairs: [
      {
        id: 'sm3-1',
        prompt: '(x + 6)(x - 6)',
        value: 'x² - 36',
        figure: <SumDiffProductSvg size={65} />
      },
      {
        id: 'sm3-2',
        prompt: '(2x + 5)(2x - 5)',
        value: '4x² - 25'
      },
      {
        id: 'sm3-3',
        prompt: '(3x + 4)(3x - 4)',
        value: '9x² - 16'
      },
      {
        id: 'sm3-4',
        prompt: '51 · 49',
        value: '2499 (50² - 1)',
        figure: <MentalMathSvg size={65} />
      },
      {
        id: 'sm3-5',
        prompt: '42 · 38',
        value: '1596 (40² - 4)'
      },
      {
        id: 'sm3-6',
        prompt: '(7x + 1)(7x - 1)',
        value: '49x² - 1'
      }
    ]
  }
};

export const SpecialProductsMatcher: React.FC<SpecialProductsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenletek-azonossagok',
  topicTitle = 'Nevezetes szorzatok'
}) => {
  return (
    <MatcherTemplate
      level={level}
      currentLevel={currentLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
      themeColor="purple"
      storageKey="grade9-special-products-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • PÁROSÍTÓ JÁTÉK"
    />
  );
};
