import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import {
  DistributiveLawSvg,
  DoubleBracketSvg,
  MinusBracketSvg,
  LikeTermsCombineSvg
} from './AlgebraicOperationsFigures';

interface AlgebraicOperationsMatcherProps {
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
    title: '1. Szint: Egynemű Kifejezések Összevonása',
    subtitle: 'Párosítsd a kifejezéseket az összevont, legegyszerűbb alakjukkal!',
    pairs: [
      {
        id: 'am1-1',
        prompt: '5x + 3x',
        value: '8x',
        figure: <LikeTermsCombineSvg size={65} />
      },
      {
        id: 'am1-2',
        prompt: '4x² - 9x²',
        value: '-5x²'
      },
      {
        id: 'am1-3',
        prompt: '3a - 7a',
        value: '-4a'
      },
      {
        id: 'am1-4',
        prompt: '2xy + 5yx',
        value: '7xy'
      },
      {
        id: 'am1-5',
        prompt: '6x² - 6x²',
        value: '0'
      },
      {
        id: 'am1-6',
        prompt: '3x - x',
        value: '2x'
      }
    ]
  },
  2: {
    title: '2. Szint: Zárójelfelbontás és Egytagú Szorzása',
    subtitle: 'Párosítsd a zárójeles szorzatokat a kibontott alakjukkal!',
    pairs: [
      {
        id: 'am2-1',
        prompt: '3 · (2x - 4)',
        value: '6x - 12',
        figure: <DistributiveLawSvg size={65} />
      },
      {
        id: 'am2-2',
        prompt: '-2 · (3x - 5)',
        value: '-6x + 10'
      },
      {
        id: 'am2-3',
        prompt: 'x · (x + 7)',
        value: 'x² + 7x'
      },
      {
        id: 'am2-4',
        prompt: '-x · (2x - 3)',
        value: '-2x² + 3x',
        figure: <MinusBracketSvg size={65} />
      },
      {
        id: 'am2-5',
        prompt: '4 · (1 - x)',
        value: '4 - 4x'
      },
      {
        id: 'am2-6',
        prompt: '-3 · (-x - 2)',
        value: '3x + 6'
      }
    ]
  },
  3: {
    title: '3. Szint: Két Binom Szorzása: (a + b)(c + d)',
    subtitle: 'Párosítsd a szorzatokat az összevont másodfokú polinommal!',
    pairs: [
      {
        id: 'am3-1',
        prompt: '(x + 2)(x + 3)',
        value: 'x² + 5x + 6',
        figure: <DoubleBracketSvg size={65} />
      },
      {
        id: 'am3-2',
        prompt: '(x - 4)(x + 1)',
        value: 'x² - 3x - 4'
      },
      {
        id: 'am3-3',
        prompt: '(2x + 1)(x - 3)',
        value: '2x² - 5x - 3'
      },
      {
        id: 'am3-4',
        prompt: '(x - 5)(x - 2)',
        value: 'x² - 7x + 10'
      },
      {
        id: 'am3-5',
        prompt: '(3x + 2)(2x - 1)',
        value: '6x² + x - 2'
      },
      {
        id: 'am3-6',
        prompt: '-(x - 3)(x + 2)',
        value: '-x² + x + 6'
      }
    ]
  }
};

export const AlgebraicOperationsMatcher: React.FC<AlgebraicOperationsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g9-egyenletek-azonossagok',
  topicTitle = 'Számolás az algebrában'
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
      themeColor="cyan"
      storageKey="grade9-algebraic-operations-matcher"
      levels={matcherLevels}
      badgeText="9. OSZTÁLY • PÁROSÍTÓ JÁTÉK"
    />
  );
};

