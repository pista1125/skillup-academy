import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface IntegerMultiplicationMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'mm1-1', prompt: '(+6) · (+7) szorzata', value: '+42' },
      { id: 'mm1-2', prompt: '(-4) · (+5) szorzata', value: '-20' },
      { id: 'mm1-3', prompt: '(-3) · (-8) szorzata', value: '+24' },
      { id: 'mm1-4', prompt: '(-9) · 0 szorzata', value: '0' },
      { id: 'mm1-5', prompt: '(+8) · (-6) szorzata', value: '-48' },
      { id: 'mm1-6', prompt: '(-10) · (-5) szorzata', value: '+50' },
      { id: 'mm1-7', prompt: '(-7) · (+1) szorzata', value: '-7' },
      { id: 'mm1-8', prompt: '(+12) · (-3) szorzata', value: '-36' }
    ]
  },
  2: {
    pairs: [
      { id: 'mm2-1', prompt: '(-15) · (-4) szorzata', value: '+60' },
      { id: 'mm2-2', prompt: '(-25) · (+4) szorzata', value: '-100' },
      { id: 'mm2-3', prompt: '(-2)³ értéke', value: '-8' },
      { id: 'mm2-4', prompt: '(-3)² értéke', value: '+9' },
      { id: 'mm2-5', prompt: '10 · (-12) szorzata', value: '-120' },
      { id: 'mm2-6', prompt: '(-8) · (-7) szorzata', value: '+56' },
      { id: 'mm2-7', prompt: '(-5) · (+20) szorzata', value: '-100' },
      { id: 'mm2-8', prompt: '(-1)⁹ értéke', value: '-1' }
    ]
  },
  3: {
    pairs: [
      { id: 'mm3-1', prompt: '(-2) · (-3) · (-4)', value: '-24' },
      { id: 'mm3-2', prompt: '(-5) · 6 · (-2)', value: '+60' },
      { id: 'mm3-3', prompt: '(-10) · [5 - (-3)]', value: '-80' },
      { id: 'mm3-4', prompt: '(-4)·15 + (-4)·5', value: '-80' },
      { id: 'mm3-5', prompt: '|-8| · (-5) értéke', value: '-40' },
      { id: 'mm3-6', prompt: '(-3)⁴ értéke', value: '+81' },
      { id: 'mm3-7', prompt: '-6 · (-10) - 20', value: '+40' },
      { id: 'mm3-8', prompt: '(-20) · (-5) · 0', value: '0' }
    ]
  }
};

export function IntegerMultiplicationMatcher({
  level,
  onNextLevel,
  onOpenRules
}: IntegerMultiplicationMatcherProps) {
  return (
    <MatcherTemplate
      level={level}
      title="Egész számok szorzása párosító játék"
      subtitle="Kattints a kártyákra és találd meg a szorzási műveletet és a helyes szorzatot!"
      levels={MATCHER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
