import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ComplexOperationsMatcherProps {
  level?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onSwitchToTheory?: () => void;
  topicId?: string;
  topicTitle?: string;
}

const matcherLevels: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'p1', prompt: '10 - 2 · 3', value: '4' },
      { id: 'p2', prompt: '(10 - 2) · 3', value: '24' },
      { id: 'p3', prompt: '18 : 3 · 2', value: '12' },
      { id: 'p4', prompt: '18 : (3 · 2)', value: '3' },
      { id: 'p5', prompt: '5 + 3 · 4', value: '17' },
      { id: 'p6', prompt: '(5 + 3) · 4', value: '32' },
      { id: 'p7', prompt: '20 - (8 - 3)', value: '15' },
      { id: 'p8', prompt: '20 - 8 - 3', value: '9' },
    ]
  },
  2: {
    pairs: [
      { id: 'p9', prompt: '-4 · (5 - 8)', value: '12' },
      { id: 'p10', prompt: '15 - (-3) · 4', value: '27' },
      { id: 'p11', prompt: '2 · [ 10 - (3 + 4) ]', value: '6' },
      { id: 'p12', prompt: '-(4 - 9 + 2) egyszerűsítve', value: '3' },
      { id: 'p13', prompt: '(12 + 8) / (7 - 2)', value: '4' },
      { id: 'p14', prompt: '-2 · (-3) - 4 · (-5)', value: '26' },
      { id: 'p15', prompt: '100 - 4 · 5²', value: '0' },
      { id: 'p16', prompt: '3 · (2x - 5) felbontva', value: '6x - 15' },
    ]
  },
  3: {
    pairs: [
      { id: 'p17', prompt: '-5 · [ 2 - 3 · (4 - 6) ]', value: '-40' },
      { id: 'p18', prompt: '-(-(-2)) · (-3)', value: '6' },
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
  onOpenRules,
  onSwitchToTheory,
  topicId = 'g7-rat-complex-operations',
  topicTitle = '5. Összetett műveletek, zárójelfelbontás'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="racionalis-szamok-algebra"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Összetett Műveletek Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd az összetett kifejezéseket a pontos végeredményükkel!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
