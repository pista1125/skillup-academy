import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RationalOperationsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'p1', prompt: '1/2 + 1/3', value: '5/6' },
      { id: 'p2', prompt: '3/4 - 1/4', value: '1/2' },
      { id: 'p3', prompt: '(2/3) · (3/4)', value: '1/2' },
      { id: 'p4', prompt: '(4/5) · (5/4)', value: '1' },
      { id: 'p5', prompt: '(1/2) : (1/4)', value: '2' },
      { id: 'p6', prompt: '3/5 reciproka', value: '5/3' },
      { id: 'p7', prompt: '-4/7 reciproka', value: '-7/4' },
      { id: 'p8', prompt: '5/8 - 1/8', value: '1/2' },
    ]
  },
  2: {
    pairs: [
      { id: 'p9', prompt: '2/3 + 1/4', value: '11/12' },
      { id: 'p10', prompt: '5/6 - 2/3', value: '1/6' },
      { id: 'p11', prompt: '(3/5) · (10/9)', value: '2/3' },
      { id: 'p12', prompt: '(4/7) : (2/7)', value: '2' },
      { id: 'p13', prompt: '(3/4) : (1/2)', value: '3/2' },
      { id: 'p14', prompt: '-1/3 + 4/3', value: '1' },
      { id: 'p15', prompt: '(-2/5) · (-5/2)', value: '1' },
      { id: 'p16', prompt: '7/10 - 2/5', value: '3/10' },
    ]
  },
  3: {
    pairs: [
      { id: 'p17', prompt: '(-3/4) · (8/9)', value: '-2/3' },
      { id: 'p18', prompt: '(-1/2) : (-3/4)', value: '2/3' },
      { id: 'p19', prompt: '-2/3 - 1/6', value: '-5/6' },
      { id: 'p20', prompt: '5/12 + 7/18', value: '29/36' },
      { id: 'p21', prompt: '(2/3)²', value: '4/9' },
      { id: 'p22', prompt: '-5 reciproka', value: '-1/5' },
      { id: 'p23', prompt: '0,25 reciproka', value: '4' },
      { id: 'p24', prompt: '(3/4) : 6', value: '1/8' },
    ]
  }
};

export const RationalOperationsMatcher: React.FC<RationalOperationsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Racionális Műveletek Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a kifejezéseket a kiszámított eredményekkel!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
