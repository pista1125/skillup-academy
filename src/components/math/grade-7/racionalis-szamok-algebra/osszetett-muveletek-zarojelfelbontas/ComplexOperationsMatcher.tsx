import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ComplexOperationsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'p1', prompt: '10 - 2 · 3', value: '4' },
      { id: 'p2', prompt: '(10 - 2) · 3', value: '24' },
      { id: 'p3', prompt: '15 + 5 : 5', value: '16' },
      { id: 'p4', prompt: '(15 + 5) : 5', value: '4' },
      { id: 'p5', prompt: '8 - (3 - 5)', value: '10' },
      { id: 'p6', prompt: '8 + (3 - 5)', value: '6' },
      { id: 'p7', prompt: '4 · 5 - 6 · 2', value: '8' },
      { id: 'p8', prompt: '20 : 4 + 3 · 2', value: '11' },
    ]
  },
  2: {
    pairs: [
      { id: 'p9', prompt: '12 - 3 · (4 - 6)', value: '18' },
      { id: 'p10', prompt: '-4 · (5 - 8)', value: '12' },
      { id: 'p11', prompt: '25 - [10 - (2 - 5)]', value: '12' },
      { id: 'p12', prompt: '-18 : (-3) - 10', value: '-4' },
      { id: 'p13', prompt: '3 · (1/3 + 1/2)', value: '5/2 (2,5)' },
      { id: 'p14', prompt: '(12 - 4) / (2 + 2)', value: '2' },
      { id: 'p15', prompt: '-5 · (-2) - 3 · (-4)', value: '22' },
      { id: 'p16', prompt: '30 : (2 · 3)', value: '5' },
    ]
  },
  3: {
    pairs: [
      { id: 'p17', prompt: '50 - 2 · [ 15 - (3 - 7) ]', value: '12' },
      { id: 'p18', prompt: '(3/4 - 1/2) · 8', value: '2' },
      { id: 'p19', prompt: '(2/3) / (4/9)', value: '3/2 (1,5)' },
      { id: 'p20', prompt: '-3 · (2 - 5) - 4 · (1 - 3)', value: '17' },
      { id: 'p21', prompt: '(15 - 3 · 3) / (1 - 4)', value: '-2' },
      { id: 'p22', prompt: '1/2 - 1/3 · (3/4 + 3/2)', value: '-1/4' },
      { id: 'p23', prompt: '-10 + 2 · [ 3 - 4 · (-2) ]', value: '12' },
      { id: 'p24', prompt: '2 · (3x - 4) felbontva', value: '6x - 8' },
    ]
  }
};

export const ComplexOperationsMatcher: React.FC<ComplexOperationsMatcherProps> = ({
  level = 1,
  onNextLevel,
  onOpenRules
}) => {
  return (
    <MatcherTemplate
      level={level}
      title="Összetett Műveletek Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd az összetett kifejezéseket a pontos végeredményükkel!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
    />
  );
};
