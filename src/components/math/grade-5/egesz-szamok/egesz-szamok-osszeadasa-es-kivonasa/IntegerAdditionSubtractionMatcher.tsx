import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', left: '(-4) + (-3) összege', right: '-7' },
      { id: 'm1-2', left: '(+8) + (-5) összege', right: '+3' },
      { id: 'm1-3', left: '(-6) + (+10) összege', right: '+4' },
      { id: 'm1-4', left: '(-7) + (+7) ellentettek összege', right: '0' },
      { id: 'm1-5', left: '5 - (+8) kivonás', right: '-3' },
      { id: 'm1-6', left: '(-2) - (+5) értéke', right: '-7' },
      { id: 'm1-7', left: '0 + (-9) értéke', right: '-9' },
      { id: 'm1-8', left: '(-10) + (-15) összege', right: '-25' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', left: '(-12) - (-8) feloldva', right: '-4' },
      { id: 'm2-2', left: '15 - (-5) két mínusszal', right: '+20' },
      { id: 'm2-3', left: '(-20) - (-20) értéke', right: '0' },
      { id: 'm2-4', left: '(-7) - (+13) kivonás', right: '-20' },
      { id: 'm2-5', left: '(-15) + (+25) összege', right: '+10' },
      { id: 'm2-6', left: '-8 + 14 egyszerűsítve', right: '+6' },
      { id: 'm2-7', left: '-5 - 12 értéke', right: '-17' },
      { id: 'm2-8', left: '100 - (-50) értéke', right: '+150' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', left: '-10 + 25 - 15 műveletsor', right: '0' },
      { id: 'm3-2', left: '(-8) - (-12) + (-6)', right: '-2' },
      { id: 'm3-3', left: '-30 - (-50) - (+10)', right: '+10' },
      { id: 'm3-4', left: '5 - 18 + 13 összege', right: '0' },
      { id: 'm3-5', left: '-(-7) + (-15) - (-3)', right: '-5' },
      { id: 'm3-6', left: '| -8 + 3 | - 10 értéke', right: '-5' },
      { id: 'm3-7', left: '(-100) + (-200) - (-300)', right: '0' },
      { id: 'm3-8', left: '-45 + 60 - 25 műveletsor', right: '-10' }
    ]
  }
};

export interface IntegerAdditionSubtractionMatcherProps {
  onBack: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  level?: DifficultyLevel;
}

export function IntegerAdditionSubtractionMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  level = 1
}: IntegerAdditionSubtractionMatcherProps) {
  return (
    <MatcherTemplate
      title="Egész számok összeadása és kivonása - Párosító Játék"
      badge="➕➖ 5. Osztály • I. Az egész számok"
      level={level}
      levels={MATCHER_LEVELS}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
}

export default IntegerAdditionSubtractionMatcher;
