import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SummaryMatcherProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  allLevels?: boolean;
}

const levels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    title: 'Hatványozás és normálalak alapismeretek',
    subtitle: 'Párosítsd a kifejezést a pontos számértékével!',
    pairs: [
      {
        id: 'sum-m1-1',
        prompt: '2⁻³',
        value: '1/8'
      },
      {
        id: 'sum-m1-2',
        prompt: '3⁻²',
        value: '1/9'
      },
      {
        id: 'sum-m1-3',
        prompt: '5⁻¹',
        value: '0,2'
      },
      {
        id: 'sum-m1-4',
        prompt: '10⁻³',
        value: '0,001'
      },
      {
        id: 'sum-m1-5',
        prompt: '7⁰',
        value: '1'
      },
      {
        id: 'sum-m1-6',
        prompt: '(-2)⁴',
        value: '16'
      },
      {
        id: 'sum-m1-7',
        prompt: '-2⁴',
        value: '-16'
      },
      {
        id: 'sum-m1-8',
        prompt: '4,5 · 10³',
        value: '4500'
      }
    ]
  },
  2: {
    title: 'Négyzetgyök azonosságai és kiemelése',
    subtitle: 'Párosítsd a gyökös kifejezést az egyszerűsített alakjával vagy értékével!',
    pairs: [
      {
        id: 'sum-m2-1',
        prompt: '√72',
        value: '6√2'
      },
      {
        id: 'sum-m2-2',
        prompt: '√48',
        value: '4√3'
      },
      {
        id: 'sum-m2-3',
        prompt: '√50',
        value: '5√2'
      },
      {
        id: 'sum-m2-4',
        prompt: '3√5',
        value: '√45'
      },
      {
        id: 'sum-m2-5',
        prompt: '√2 · √18',
        value: '6'
      },
      {
        id: 'sum-m2-6',
        prompt: '√75 / √3',
        value: '5'
      },
      {
        id: 'sum-m2-7',
        prompt: '√((-9)²)',
        value: '9'
      },
      {
        id: 'sum-m2-8',
        prompt: '√50 - √18',
        value: '2√2'
      }
    ]
  },
  3: {
    title: 'Gyöktelenítés, azonosságok és emeletes gyökök',
    subtitle: 'Párosítsd a kifejezést a legpontosabb racionális vagy gyöktelenített alakjával!',
    pairs: [
      {
        id: 'sum-m3-1',
        prompt: '6 / √3',
        value: '2√3'
      },
      {
        id: 'sum-m3-2',
        prompt: '10 / √5',
        value: '2√5'
      },
      {
        id: 'sum-m3-3',
        prompt: '2 / (√5 - 1)',
        value: '(√5 + 1) / 2'
      },
      {
        id: 'sum-m3-4',
        prompt: '1 / (√3 + 1)',
        value: '(√3 - 1) / 2'
      },
      {
        id: 'sum-m3-5',
        prompt: '(√5 + √2)(√5 - √2)',
        value: '3'
      },
      {
        id: 'sum-m3-6',
        prompt: '(√3 + √2)²',
        value: '5 + 2√6'
      },
      {
        id: 'sum-m3-7',
        prompt: '√(7 + 4√3)',
        value: '2 + √3'
      },
      {
        id: 'sum-m3-8',
        prompt: '√(6 - 2√5)',
        value: '√5 - 1'
      }
    ]
  }
};

export const SummaryMatcher: React.FC<SummaryMatcherProps> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  allLevels = true
}) => {
  return (
    <MatcherTemplate
      title="Hatvány és gyök fejezeti párosító"
      subtitle="Hatványozás, normálalak és gyökös átalakítások záró szintézise"
      themeColor="rose"
      levels={levels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      allLevels={allLevels}
    />
  );
};

export default SummaryMatcher;

