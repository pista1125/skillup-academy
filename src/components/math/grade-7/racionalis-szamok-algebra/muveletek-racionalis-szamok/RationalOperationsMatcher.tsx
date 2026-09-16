import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RationalOperationsMatcherProps {
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
      { id: 'p1', prompt: '3/4 + 1/4', value: '1' },
      { id: 'p2', prompt: '5/7 - 2/7', value: '3/7' },
      { id: 'p3', prompt: '2/3 · 3/5', value: '2/5' },
      { id: 'p4', prompt: '4/5 : 2', value: '2/5' },
      { id: 'p5', prompt: '3/4 reciproka', value: '4/3' },
      { id: 'p6', prompt: '-2/5 reciproka', value: '-5/2' },
      { id: 'p7', prompt: '0,5 · 0,2', value: '0,1' },
      { id: 'p8', prompt: '0,6 : 3', value: '0,2' },
    ]
  },
  2: {
    pairs: [
      { id: 'p9', prompt: '1/2 + 1/3', value: '5/6' },
      { id: 'p10', prompt: '3/4 - 1/6', value: '7/12' },
      { id: 'p11', prompt: '-2/5 + 1/2', value: '1/10' },
      { id: 'p12', prompt: '(-3/4) · (-2/3)', value: '1/2' },
      { id: 'p13', prompt: '(4/9) : (2/3)', value: '2/3' },
      { id: 'p14', prompt: '-1,2 · 0,5', value: '-0,6' },
      { id: 'p15', prompt: '2,4 : (-0,8)', value: '-3' },
      { id: 'p16', prompt: '1 és 1/2 · 2/3', value: '1' },
    ]
  },
  3: {
    pairs: [
      { id: 'p17', prompt: '(-2/3) · (9/4) · (-1/3)', value: '1/2' },
      { id: 'p18', prompt: '(3/5 - 1) : 2/5', value: '-1' },
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
  onOpenRules,
  onSwitchToTheory,
  topicId = 'g7-rat-operations',
  topicTitle = '3. Műveletek a racionális számok halmazán'
}) => {
  return (
    <MatcherTemplate
      level={level}
      grade={7}
      chapterId="racionalis-szamok-algebra"
      topicId={topicId}
      topicTitle={topicTitle}
      title="Racionális Műveletek Kártyás Párosító"
      subtitle="Kattints a kártyákra, és párosítsd a kifejezéseket a kiszámított eredményekkel!"
      levels={matcherLevels}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onSwitchToTheory={onSwitchToTheory}
    />
  );
};
