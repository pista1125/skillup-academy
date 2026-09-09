import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

export interface IntegerDivisionMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'dm1-1', prompt: '(-18) : (+3) hányadosa', value: '-6' },
      { id: 'dm1-2', prompt: '(-24) : (-4) hányadosa', value: '+6' },
      { id: 'dm1-3', prompt: '(+40) : (-5) hányadosa', value: '-8' },
      { id: 'dm1-4', prompt: '(-35) : (-7) hányadosa', value: '+5' },
      { id: 'dm1-5', prompt: '(+72) : (+8) hányadosa', value: '+9' },
      { id: 'dm1-6', prompt: '(-54) : (+6) hányadosa', value: '-9' },
      { id: 'dm1-7', prompt: '0 : (-12) hányadosa', value: '0' },
      { id: 'dm1-8', prompt: '(-100) : (-10) hányadosa', value: '+10' },
    ]
  },
  2: {
    pairs: [
      { id: 'dm2-1', prompt: '(-36) : (-3) : (+4)', value: '+3' },
      { id: 'dm2-2', prompt: '(-50) : [5 · (-2)]', value: '+5' },
      { id: 'dm2-3', prompt: '[(-20) + (-10)] : (-5)', value: '+6' },
      { id: 'dm2-4', prompt: '(+64) : (-2) : (-4)', value: '+8' },
      { id: 'dm2-5', prompt: '[(-15) - (-3)] : (+3)', value: '-4' },
      { id: 'dm2-6', prompt: '(-80) : (-1) : (-8)', value: '-10' },
      { id: 'dm2-7', prompt: '[(-4) · (-6)] : (-3)', value: '-8' },
      { id: 'dm2-8', prompt: '(-100) : (-5) : (-2)', value: '-10' },
    ]
  },
  3: {
    pairs: [
      { id: 'dm3-1', prompt: '(-48) : [(-2) · (-4)]', value: '-6' },
      { id: 'dm3-2', prompt: '[(-45) : (-5)] · (-3)', value: '-27' },
      { id: 'dm3-3', prompt: '[(-60) + (+12)] : [(-2) · (-3)]', value: '-8' },
      { id: 'dm3-4', prompt: '[(-100) : (-25)] · [(-18) : (-6)]', value: '+12' },
      { id: 'dm3-5', prompt: '[(-14) · (-3)] : [(-3) - (+4)]', value: '-6' },
      { id: 'dm3-6', prompt: '[(-72) : (+9)] : [(-1) · (-2)]', value: '-4' },
      { id: 'dm3-7', prompt: '[(-8) + (-12) + (-20)] : (-5)', value: '+8' },
      { id: 'dm3-8', prompt: '[(-50) : (-2)] - [(-30) : (+2)]', value: '+40' },
    ]
  }
};

export function IntegerDivisionMatcher({
  level,
  onNextLevel,
  onOpenRules
}: IntegerDivisionMatcherProps) {
  return (
    <MatcherTemplate
      level={level}
      title="Egész számok osztása párosító játék"
      subtitle="Kattints a kártyákra és találd meg az osztási művelethez tartozó helyes hányadost!"
      levels={MATCHER_LEVELS}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
}
