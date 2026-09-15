import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', left: 'A +7 ellentettje 🔄', right: '-7' },
      { id: 'm1-2', left: 'A -15 ellentettje 🔄', right: '+15' },
      { id: 'm1-3', left: '|+9| értéke 📏', right: '9' },
      { id: 'm1-4', left: '|-12| értéke 📏', right: '12' },
      { id: 'm1-5', left: 'A 0 ellentettje 🎯', right: '0' },
      { id: 'm1-6', left: '|0| abszolút értéke 🎯', right: '0' },
      { id: 'm1-7', left: 'A -4 távolsága 0-tól 📍', right: '4 egység' },
      { id: 'm1-8', left: '+20 ellentettjének ellentettje 🔄', right: '+20' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', left: '-(-8) egyszerűsítve', right: '+8' },
      { id: 'm2-2', left: '-(+14) egyszerűsítve', right: '-14' },
      { id: 'm2-3', left: '|-6| + |+4| összege', right: '10' },
      { id: 'm2-4', left: '|-20| - |-5| értéke', right: '15' },
      { id: 'm2-5', left: '-|-9| külső előjellel', right: '-9' },
      { id: 'm2-6', left: '|x| = 7 pozitív gyöke', right: 'x = 7' },
      { id: 'm2-7', left: '|x| = 7 negatív gyöke', right: 'x = -7' },
      { id: 'm2-8', left: '(+11) és (-11) összege', right: '0' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', left: '-(-(-6)) értéke', right: '-6' },
      { id: 'm3-2', left: '|-15| + |-15|', right: '30' },
      { id: 'm3-3', left: '| -8 + 3 | abszolút értéke', right: '5' },
      { id: 'm3-4', left: '| -10 | · | -3 | szorzata', right: '30' },
      { id: 'm3-5', left: '-(-|+12|) értéke', right: '+12' },
      { id: 'm3-6', left: '|x| = 0 egyenlet gyöke', right: 'x = 0' },
      { id: 'm3-7', left: '-( -(-(-4)) ) 4 mínusszal', right: '+4' },
      { id: 'm3-8', left: '|-50| : |-5| hányadosa', right: '10' }
    ]
  }
};

export interface OppositeAbsoluteMatcherProps {
  onBack: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  level?: DifficultyLevel;
}

export function OppositeAbsoluteMatcher({
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  level = 1
}: OppositeAbsoluteMatcherProps) {
  return (
    <MatcherTemplate
      title="Ellentett és Abszolút Érték - Párosító"
      badge="🔄 5. Osztály • I. Az egész számok"
      level={level}
      levels={MATCHER_LEVELS}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
    />
  );
}

export default OppositeAbsoluteMatcher;
