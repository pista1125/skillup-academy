import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardRods, CardSplit, CardJumps } from './MulDiv200G3CardFigures';

interface MulDiv200G3MatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

export const MUL_DIV_200_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Szorzás tízesekkel',
    description: 'Egy kék rúd 10. Párosítsd a képet vagy a szorzást az eredményével!',
    pairs: [
      { id: 'md200m1', prompt: 'Mennyi?', promptFigure: <CardRods groups={2} per={7} />, value: '140' },
      { id: 'md200m2', prompt: 'Mennyi?', promptFigure: <CardRods groups={3} per={5} />, value: '150' },
      { id: 'md200m3', prompt: 'Mennyi?', promptFigure: <CardRods groups={4} per={4} />, value: '160' },
      { id: 'md200m4', prompt: 'Mennyi?', promptFigure: <CardRods groups={6} per={3} />, value: '180' },
      { id: 'md200m5', prompt: '5 · 40', value: '200' },
      { id: 'md200m6', prompt: '3 · 30', value: '90' },
      { id: 'md200m7', prompt: '2 · 60', value: '120' },
      { id: 'md200m8', prompt: '10 · 10', value: '100' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Mennyi jut egyre?',
    description: 'Oszd el egyformán! Párosítsd az osztást az eredményével!',
    pairs: [
      { id: 'md200m9', prompt: 'Egy tányérra?', promptFigure: <CardSplit total={120} n={3} />, value: '40' },
      { id: 'md200m10', prompt: 'Egy tányérra?', promptFigure: <CardSplit total={180} n={2} />, value: '90' },
      { id: 'md200m11', prompt: 'Egy tányérra?', promptFigure: <CardSplit total={150} n={5} />, value: '30' },
      { id: 'md200m12', prompt: 'Egy tányérra?', promptFigure: <CardSplit total={200} n={4} />, value: '50' },
      { id: 'md200m13', prompt: '160 : 8', value: '20' },
      { id: 'md200m14', prompt: '70 : 7', value: '10' },
      { id: 'md200m15', prompt: '120 : 2', value: '60' },
      { id: 'md200m16', prompt: '140 : 2', value: '70' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Hányszor van meg?',
    description: 'Hány ugrás kell? Párosítsd a bennfoglalást az eredményével!',
    pairs: [
      { id: 'md200m17', prompt: '40-esével', promptFigure: <CardJumps jumps={4} end={160} />, value: '4' },
      { id: 'md200m18', prompt: '30-asával', promptFigure: <CardJumps jumps={6} end={180} />, value: '6' },
      { id: 'md200m19', prompt: '50-esével', promptFigure: <CardJumps jumps={3} end={150} />, value: '3' },
      { id: 'md200m20', prompt: '20-asával', promptFigure: <CardJumps jumps={7} end={140} />, value: '7' },
      { id: 'md200m21', prompt: '200 : 40', value: '5' },
      { id: 'md200m22', prompt: '160 : 20', value: '8' },
      { id: 'md200m23', prompt: '180 : 20', value: '9' },
      { id: 'md200m24', prompt: '120 : 60', value: '2' }
    ]
  }
};

export const MulDiv200G3Matcher: React.FC<MulDiv200G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c200-szorzas-matcher',
  topicTitle = '5. Szorzás és osztás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="szorzas-es-osztas"
      title={topicTitle}
      subtitle="Párosítsd a képeket, a szorzásokat és az osztásokat az eredményükkel!"
      levels={MUL_DIV_200_G3_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default MulDiv200G3Matcher;
