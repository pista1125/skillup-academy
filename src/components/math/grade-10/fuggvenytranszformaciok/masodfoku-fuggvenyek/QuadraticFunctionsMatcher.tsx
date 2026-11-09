import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface QuadraticFunctionsMatcherProps {
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
    title: 'Nevezetes azonosságok és teljes négyzetek (a = 1)',
    subtitle: 'Párosítsd a polinom alakú kifejezéseket a megfelelő teljes négyzetes alakkal!',
    pairs: [
      {
        id: 'qfm1-1',
        prompt: 'f(x) = x² + 6x + 9',
        value: 'f(x) = (x + 3)², T(-3; 0)'
      },
      {
        id: 'qfm1-2',
        prompt: 'f(x) = x² - 8x + 16',
        value: 'f(x) = (x - 4)², T(4; 0)'
      },
      {
        id: 'qfm1-3',
        prompt: 'f(x) = x² + 10x + 25',
        value: 'f(x) = (x + 5)², T(-5; 0)'
      },
      {
        id: 'qfm1-4',
        prompt: 'f(x) = x² - 2x + 1',
        value: 'f(x) = (x - 1)², T(1; 0)'
      },
      {
        id: 'qfm1-5',
        prompt: 'f(x) = x² - 6x + 5',
        value: '(x - 3)² - 4, T(3; -4)'
      },
      {
        id: 'qfm1-6',
        prompt: 'f(x) = x² + 4x + 7',
        value: '(x + 2)² + 3, T(-2; 3)'
      },
      {
        id: 'qfm1-7',
        prompt: 'f(x) = x² - 4x + 4',
        value: 'f(x) = (x - 2)², T(2; 0)'
      },
      {
        id: 'qfm1-8',
        prompt: 'f(x) = x² + 2x - 3',
        value: '(x + 1)² - 4, T(-1; -4)'
      }
    ]
  },
  2: {
    title: 'Általános és kanonikus alakok párjai (a ≠ 1)',
    subtitle: 'Párosítsd az ax² + bx + c polinom alakokat az a(x - u)² + v alakkal!',
    pairs: [
      {
        id: 'qfm2-1',
        prompt: 'f(x) = 2x² + 8x + 6',
        value: '2(x + 2)² - 2, T(-2; -2)'
      },
      {
        id: 'qfm2-2',
        prompt: 'f(x) = -x² + 4x - 1',
        value: '-(x - 2)² + 3, T(2; 3)'
      },
      {
        id: 'qfm2-3',
        prompt: 'f(x) = 2x² - 4x + 5',
        value: '2(x - 1)² + 3, T(1; 3)'
      },
      {
        id: 'qfm2-4',
        prompt: 'f(x) = -x² - 6x - 9',
        value: '-(x + 3)², T(-3; 0)'
      },
      {
        id: 'qfm2-5',
        prompt: 'f(x) = 3x² - 6x + 7',
        value: '3(x - 1)² + 4, T(1; 4)'
      },
      {
        id: 'qfm2-6',
        prompt: 'f(x) = -2x² + 8x - 5',
        value: '-2(x - 2)² + 3, T(2; 3)'
      },
      {
        id: 'qfm2-7',
        prompt: 'f(x) = 0,5x² - 2x + 1',
        value: '0,5(x - 2)² - 1, T(2; -1)'
      },
      {
        id: 'qfm2-8',
        prompt: 'f(x) = -x² + 2x + 3',
        value: '-(x - 1)² + 4, T(1; 4)'
      }
    ]
  },
  3: {
    title: 'Polinom alak és csúcsponti tulajdonságok',
    subtitle: 'Párosítsd az általános alakú függvényeket a csúcspontjukkal és szélsőértékükkel!',
    pairs: [
      {
        id: 'qfm3-1',
        prompt: 'f(x) = x² - 10x + 21',
        value: 'Csúcs: T(5; -4), minimum -4'
      },
      {
        id: 'qfm3-2',
        prompt: 'f(x) = -x² + 8x - 12',
        value: 'Csúcs: T(4; 4), maximum 4'
      },
      {
        id: 'qfm3-3',
        prompt: 'f(x) = 2x² - 12x + 20',
        value: 'Csúcs: T(3; 2), minimum 2'
      },
      {
        id: 'qfm3-4',
        prompt: 'f(x) = -2x² - 4x + 6',
        value: 'Csúcs: T(-1; 8), maximum 8'
      },
      {
        id: 'qfm3-5',
        prompt: 'f(x) = x² + 12x + 35',
        value: 'Csúcs: T(-6; -1), minimum -1'
      },
      {
        id: 'qfm3-6',
        prompt: 'f(x) = -x² - 2x + 8',
        value: 'Csúcs: T(-1; 9), maximum 9'
      },
      {
        id: 'qfm3-7',
        prompt: 'f(x) = 3x² + 6x - 1',
        value: 'Csúcs: T(-1; -4), minimum -4'
      },
      {
        id: 'qfm3-8',
        prompt: 'f(x) = 4x² - 16x + 16',
        value: 'Csúcs: T(2; 0), érinti a tengelyt'
      }
    ]
  }
};

export const QuadraticFunctionsMatcher: React.FC<QuadraticFunctionsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  topicId = 'g10-fuggvenytranszformaciok',
  topicTitle = 'Másodfokú függvények'
}) => {
  const activeLevel = currentLevel || level;

  return (
    <MatcherTemplate
      level={activeLevel}
      currentLevel={activeLevel}
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      topicId={topicId}
      topicTitle={topicTitle}
    />
  );
};

