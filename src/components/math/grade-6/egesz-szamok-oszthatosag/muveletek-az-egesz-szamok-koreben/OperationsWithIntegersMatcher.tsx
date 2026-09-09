import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface OperationsWithIntegersMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', prompt: '(+6) + (+7) összege', value: '+13' },
      { id: 'm1-2', prompt: '(-4) + (-5) összege', value: '-9' },
      { id: 'm1-3', prompt: '(+8) + (-3) összege', value: '+5' },
      { id: 'm1-4', prompt: '(-10) + (+4) összege', value: '-6' },
      { id: 'm1-5', prompt: '(-7) + (+7) ellentettek', value: '0' },
      { id: 'm1-6', prompt: '(+9) - (+5) kivonás', value: '+4' },
      { id: 'm1-7', prompt: '(-3) - (+4) értéke', value: '-7' },
      { id: 'm1-8', prompt: '0 - (+8) értéke', value: '-8' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', prompt: '12 - (-5) két mínusszal', value: '+17' },
      { id: 'm2-2', prompt: '(-8) - (-3) feloldva', value: '-5' },
      { id: 'm2-3', prompt: '-14 + 20 egyszerűsítve', value: '+6' },
      { id: 'm2-4', prompt: '-10 - 15 értéke', value: '-25' },
      { id: 'm2-5', prompt: '25 + (-30) összege', value: '-5' },
      { id: 'm2-6', prompt: '-(-8) + (-8) értéke', value: '0' },
      { id: 'm2-7', prompt: '(-16) - (-20) feloldva', value: '+4' },
      { id: 'm2-8', prompt: '100 - (-40) értéke', value: '+140' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', prompt: '-10 + 25 - 15 műveletsor', value: '0' },
      { id: 'm3-2', prompt: '(-8) - (-12) + (-6)', value: '-2' },
      { id: 'm3-3', prompt: '|-15| - |-8| értéke', value: '+7' },
      { id: 'm3-4', prompt: '-(-9) - (+15) értéke', value: '-6' },
      { id: 'm3-5', prompt: '|-20 + 8| - 12 értéke', value: '0' },
      { id: 'm3-6', prompt: '-50 + (-30) - (-100)', value: '+20' },
      { id: 'm3-7', prompt: '-1 + 2 - 3 + 4 - 5', value: '-3' },
      { id: 'm3-8', prompt: '30 - [10 - (-5)] zárójel', value: '+15' }
    ]
  }
};

export function OperationsWithIntegersMatcher({
  level,
  onNextLevel,
  onOpenRules
}: OperationsWithIntegersMatcherProps) {
  return (
    <MatcherTemplate
      level={level}
      title="Egész számok párosító játék"
      subtitle="Kattints a kártyákra és párosítsd össze a műveletet a helyes eredménnyel!"
      levels={MATCHER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
