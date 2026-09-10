import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface IntegerPropertiesMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'p1', prompt: '-8 ellentettje', value: '+8' },
      { id: 'p2', prompt: '|-15| értéke', value: '15' },
      { id: 'p3', prompt: '0 ellentettje', value: '0' },
      { id: 'p4', prompt: 'Természetes számok jele', value: 'N' },
      { id: 'p5', prompt: 'Egész számok jele', value: 'Z' },
      { id: 'p6', prompt: '-(-12) egyszerűsítve', value: '+12' },
      { id: 'p7', prompt: 'a + (-a) értéke', value: '0' },
      { id: 'p8', prompt: 'Pozitív egészek jele', value: 'Z+' },
    ]
  },
  2: {
    pairs: [
      { id: 'p9', prompt: '(-7) + (-8)', value: '-15' },
      { id: 'p10', prompt: '(+12) + (-18)', value: '-6' },
      { id: 'p11', prompt: '(-5) - (-9)', value: '+4' },
      { id: 'p12', prompt: '(-6) · (-7)', value: '+42' },
      { id: 'p13', prompt: '36 : (-4)', value: '-9' },
      { id: 'p14', prompt: '(-3) · 8', value: '-24' },
      { id: 'p15', prompt: '(-2) · (-3) · (-4)', value: '-24' },
      { id: 'p16', prompt: '(-5) · 0', value: '0' },
    ]
  },
  3: {
    pairs: [
      { id: 'p17', prompt: 'a + b = b + a', value: 'Kommutativitás' },
      { id: 'p18', prompt: 'a · (b + c) = ab + ac', value: 'Disztributivitás' },
      { id: 'p19', prompt: '(a · b) · c = a · (b · c)', value: 'Asszociativitás' },
      { id: 'p20', prompt: '8 : 0 értéke', value: 'Értelmetlen' },
      { id: 'p21', prompt: '(-1) · a értéke', value: '-a' },
      { id: 'p22', prompt: '|-20| - |+8|', value: '12' },
      { id: 'p23', prompt: '(-2) · (-2) · (-2)', value: '-8' },
      { id: 'p24', prompt: '-(-(-5)) értéke', value: '-5' },
    ]
  }
};

export const IntegerPropertiesMatcher: React.FC<IntegerPropertiesMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Egész Számok Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a kifejezéseket, fogalmakat és eredményeket!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
