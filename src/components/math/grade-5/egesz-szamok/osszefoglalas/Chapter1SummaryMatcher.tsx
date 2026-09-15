import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', left: 'Római V', right: '5' },
      { id: 'm1-2', left: 'Római X', right: '10' },
      { id: 'm1-3', left: 'Római L', right: '50' },
      { id: 'm1-4', left: 'Római C', right: '100' },
      { id: 'm1-5', left: 'Római D', right: '500' },
      { id: 'm1-6', left: 'Római M', right: '1000' },
      { id: 'm1-7', left: '-5 ellentettje', right: '+5' },
      { id: 'm1-8', left: '|-12| abszolút érték', right: '12' }
    ]
  },
  2: {
    pairs: [
      { id: 'm1-1', left: 'Római XLIX', right: '49' },
      { id: 'm1-2', left: 'Római CMXCIX', right: '999' },
      { id: 'm1-3', left: '101₂ kettesben', right: '5 tízesben' },
      { id: 'm1-4', left: '475 kerekítve 100-ra', right: '500' },
      { id: 'm1-5', left: '25 · 4', right: '100' },
      { id: 'm1-6', left: '144 : 12', right: '12' },
      { id: 'm1-7', left: '(-8) + (-7)', right: '-15' },
      { id: 'm1-8', left: '(-5) - (-9)', right: '+4' }
    ]
  },
  3: {
    pairs: [
      { id: 'm1-1', left: 'Római MMXXVI', right: '2026' },
      { id: 'm1-2', left: '11010₂ kettesben', right: '26 tízesben' },
      { id: 'm1-3', left: '9489 kerekítve 1000-re', right: '9000' },
      { id: 'm1-4', left: '20 - 4 · (3 + 2)', right: '0' },
      { id: 'm1-5', left: '[50 - (6 · 8)] · 10', right: '20' },
      { id: 'm1-6', left: '|-18| + |-12|', right: '30' },
      { id: 'm1-7', left: '(-25) - (+35)', right: '-60' },
      { id: 'm1-8', left: '(-12) - (-20) + (-8)', right: '0' }
    ]
  }
};

export interface Chapter1SummaryMatcherProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  level?: DifficultyLevel;
}

export function Chapter1SummaryMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  level = 1
}: Chapter1SummaryMatcherProps) {
  return (
    <MatcherTemplate
      title="I. Fejezet Összefoglalás - Párosító"
      badge="🏆 5. Osztály • I. Az egész számok"
      level={level}
      levels={MATCHER_LEVELS}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
}

export default Chapter1SummaryMatcher;
