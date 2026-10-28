import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  FactoringTreeSvg,
  CommonFactorSvg,
  GroupingSvg,
  TwoStepFactoringSvg
} from './FactorizationFigures';

interface FactorizationMatcherProps {
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
    title: '1. Szint: Közös Tényező Kiemelése',
    subtitle: 'Párosítsd a kifejezéseket a kiemeléssel szorzattá alakított alakjukkal!',
    pairs: [
      {
        id: 'fm1-1',
        prompt: '6x + 15',
        value: '3 · (2x + 5)',
        figure: <CommonFactorSvg size={65} />
      },
      {
        id: 'fm1-2',
        prompt: 'x² - 7x',
        value: 'x · (x - 7)'
      },
      {
        id: 'fm1-3',
        prompt: '12x² - 8x',
        value: '4x · (3x - 2)'
      },
      {
        id: 'fm1-4',
        prompt: '5x + 5',
        value: '5 · (x + 1)'
      },
      {
        id: 'fm1-5',
        prompt: 'a²b + ab²',
        value: 'ab · (a + b)'
      },
      {
        id: 'fm1-6',
        prompt: '-2x - 6',
        value: '-2 · (x + 3)'
      }
    ]
  },
  2: {
    title: '2. Szint: Nevezetes Azonosságok Felismerése',
    subtitle: 'Párosítsd a kifejezéseket a négyzetek különbsége és teljes négyzet szorzatokkal!',
    pairs: [
      {
        id: 'fm2-1',
        prompt: 'x² - 49',
        value: '(x - 7)(x + 7)',
        figure: <FactoringTreeSvg size={65} />
      },
      {
        id: 'fm2-2',
        prompt: 'x² + 10x + 25',
        value: '(x + 5)²'
      },
      {
        id: 'fm2-3',
        prompt: '4x² - 9',
        value: '(2x - 3)(2x + 3)'
      },
      {
        id: 'fm2-4',
        prompt: 'x² - 12x + 36',
        value: '(x - 6)²'
      },
      {
        id: 'fm2-5',
        prompt: '9x² - 25y²',
        value: '(3x - 5y)(3x + 5y)'
      },
      {
        id: 'fm2-6',
        prompt: '1 - 16x²',
        value: '(1 - 4x)(1 + 4x)'
      }
    ]
  },
  3: {
    title: '3. Szint: Kétszeres Kiemelés és Csoportosítás',
    subtitle: 'Párosítsd a haladó kifejezéseket a teljes szorzatalakjukkal!',
    pairs: [
      {
        id: 'fm3-1',
        prompt: '2x² - 18',
        value: '2 · (x - 3)(x + 3)',
        figure: <TwoStepFactoringSvg size={65} />
      },
      {
        id: 'fm3-2',
        prompt: '3x² + 18x + 27',
        value: '3 · (x + 3)²'
      },
      {
        id: 'fm3-3',
        prompt: 'ax + ay + bx + by',
        value: '(x + y)(a + b)',
        figure: <GroupingSvg size={65} />
      },
      {
        id: 'fm3-4',
        prompt: '5x³ - 5x',
        value: '5x · (x - 1)(x + 1)'
      },
      {
        id: 'fm3-5',
        prompt: '2x² - 8',
        value: '2 · (x - 2)(x + 2)'
      },
      {
        id: 'fm3-6',
        prompt: 'x³ + x² + x + 1',
        value: '(x + 1)(x² + 1)'
      }
    ]
  }
};

export const FactorizationMatcher: React.FC<FactorizationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenletek-azonossagok',
  topicTitle = 'Szorzattá alakítás'
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
      themeColor="violet"
      storageKey="grade9-factorization-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • PÁROSÍTÓ JÁTÉK"
    />
  );
};
