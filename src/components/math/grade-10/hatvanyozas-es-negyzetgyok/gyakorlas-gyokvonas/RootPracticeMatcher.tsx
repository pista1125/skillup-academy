import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RootPracticeMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  allLevels?: boolean;
}

const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Értelmezési tartomány (kikötések)',
    subtitle: 'Párosítsd a gyökös kifejezést a helyes értelmezési tartományával!',
    pairs: [
      {
        id: 'rpm1-1',
        prompt: '√(x - 5)',
        value: 'x ≥ 5'
      },
      {
        id: 'rpm1-2',
        prompt: '√(2x - 8)',
        value: 'x ≥ 4'
      },
      {
        id: 'rpm1-3',
        prompt: '√(3x + 9)',
        value: 'x ≥ -3'
      },
      {
        id: 'rpm1-4',
        prompt: '√(7 - x)',
        value: 'x ≤ 7'
      },
      {
        id: 'rpm1-5',
        prompt: '√(12 - 4x)',
        value: 'x ≤ 3'
      },
      {
        id: 'rpm1-6',
        prompt: '1 / √(x - 2)',
        value: 'x > 2'
      },
      {
        id: 'rpm1-7',
        prompt: '1 / √(6 - x)',
        value: 'x < 6'
      },
      {
        id: 'rpm1-8',
        prompt: '√(x² + 1)',
        value: 'Minden valós szám (x ∈ ℝ)'
      }
    ]
  },
  2: {
    title: 'Nevezetes azonosságok gyökökkel',
    subtitle: 'Párosítsd a kifejezést a kibontott vagy kiszámított pontos értékével!',
    pairs: [
      {
        id: 'rpm2-1',
        prompt: '(√3 + √2)²',
        value: '5 + 2√6'
      },
      {
        id: 'rpm2-2',
        prompt: '(√3 - √2)²',
        value: '5 - 2√6'
      },
      {
        id: 'rpm2-3',
        prompt: '(√5 + 1)²',
        value: '6 + 2√5'
      },
      {
        id: 'rpm2-4',
        prompt: '(√5 - 1)²',
        value: '6 - 2√5'
      },
      {
        id: 'rpm2-5',
        prompt: '(√7 + √3)(√7 - √3)',
        value: '4'
      },
      {
        id: 'rpm2-6',
        prompt: '(√5 + √2)(√5 - √2)',
        value: '3'
      },
      {
        id: 'rpm2-7',
        prompt: '(3 + √5)(3 - √5)',
        value: '4'
      },
      {
        id: 'rpm2-8',
        prompt: '(2√2 + 1)(2√2 - 1)',
        value: '7'
      }
    ]
  },
  3: {
    title: 'Emeletes gyökök és gyökös egyenletek',
    subtitle: 'Alakítsd át a gyök alatti kifejezést teljes négyzetté, vagy oldd meg az egyenletet!',
    pairs: [
      {
        id: 'rpm3-1',
        prompt: '√(7 + 4√3)',
        value: '2 + √3'
      },
      {
        id: 'rpm3-2',
        prompt: '√(7 - 4√3)',
        value: '2 - √3'
      },
      {
        id: 'rpm3-3',
        prompt: '√(6 + 2√5)',
        value: '√5 + 1'
      },
      {
        id: 'rpm3-4',
        prompt: '√(6 - 2√5)',
        value: '√5 - 1'
      },
      {
        id: 'rpm3-5',
        prompt: '√(11 + 6√2)',
        value: '3 + √2'
      },
      {
        id: 'rpm3-6',
        prompt: '√(8 - 2√7)',
        value: '√7 - 1'
      },
      {
        id: 'rpm3-7',
        prompt: '√(2x + 1) = 3',
        value: 'x = 4'
      },
      {
        id: 'rpm3-8',
        prompt: '√(3x - 2) = 4',
        value: 'x = 6'
      }
    ]
  }
};

export const RootPracticeMatcher: React.FC<RootPracticeMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  allLevels = true
}) => {
  return (
    <MatcherTemplate
      title="Négyzetgyök gyakorlása párosító"
      subtitle="Kikötések, nevezetes azonosságok, emeletes gyökök és egyenletek"
      themeColor="violet"
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      allLevels={allLevels}
    />
  );
};

export default RootPracticeMatcher;

