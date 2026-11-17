import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniRodGroups, MiniShare, MiniCoinGrid } from './MulDiv500G3CardFigures';

interface MulDiv500G3MatcherProps {
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

const MUL_DIV_500_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Szorzás tízesekkel',
    description: 'Egy rúd 10-et ér. Mennyi összesen? Párosíts!',
    pairs: [
      { id: 'md500m1_0', left: '', promptFigure: <MiniRodGroups groups={3} per={4} />, right: '120' },
      { id: 'md500m1_1', left: '', promptFigure: <MiniRodGroups groups={5} per={6} />, right: '300' },
      { id: 'md500m1_2', left: '', promptFigure: <MiniRodGroups groups={4} per={9} />, right: '360' },
      { id: 'md500m1_3', left: '', promptFigure: <MiniRodGroups groups={2} per={8} />, right: '160' },
      { id: 'md500m1_4', left: '10 · 25', right: '250' },
      { id: 'md500m1_5', left: '4 · 100', right: '400' },
      { id: 'md500m1_6', left: '47 · 10', right: '470' },
      { id: 'md500m1_7', left: '5 · 90', right: '450' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Osztás',
    description: 'Oszd szét egyformán, vagy nézd meg, hányszor van meg!',
    pairs: [
      { id: 'md500m2_0', left: '', promptFigure: <MiniShare total={240} k={3} />, right: '80' },
      { id: 'md500m2_1', left: '', promptFigure: <MiniShare total={350} k={5} />, right: '70' },
      { id: 'md500m2_2', left: '', promptFigure: <MiniShare total={160} k={4} />, right: '40' },
      { id: 'md500m2_3', left: '', promptFigure: <MiniShare total={100} k={2} />, right: '50' },
      { id: 'md500m2_4', left: '480 : 60', right: '8' },
      { id: 'md500m2_5', left: '360 : 40', right: '9' },
      { id: 'md500m2_6', left: '210 : 70', right: '3' },
      { id: 'md500m2_7', left: '400 : 80', right: '5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Pénz és hiányzó számok',
    description: 'Mennyi pénz? Melyik szám hiányzik? Párosíts!',
    pairs: [
      { id: 'md500m3_0', left: '', promptFigure: <MiniCoinGrid rows={2} cols={4} v={50} />, right: '400 Ft' },
      { id: 'md500m3_1', left: '', promptFigure: <MiniCoinGrid rows={3} cols={3} v={20} />, right: '180 Ft' },
      { id: 'md500m3_2', left: '', promptFigure: <MiniCoinGrid rows={2} cols={5} v={20} />, right: '200 Ft' },
      { id: 'md500m3_3', left: '', promptFigure: <MiniCoinGrid rows={2} cols={3} v={50} />, right: '300 Ft' },
      { id: 'md500m3_4', left: '□ · 30 = 270', right: '9' },
      { id: 'md500m3_5', left: '□ : 4 = 90', right: '360' },
      { id: 'md500m3_6', left: '420 : □ = 6', right: '70' },
      { id: 'md500m3_7', left: '8 · □ = 400', right: '50' }
    ]
  }
];

export const MUL_DIV_500_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MUL_DIV_500_G3_MATCHER_LEVELS_LIST[0],
  2: MUL_DIV_500_G3_MATCHER_LEVELS_LIST[1],
  3: MUL_DIV_500_G3_MATCHER_LEVELS_LIST[2]
};

export const MulDiv500G3Matcher: React.FC<MulDiv500G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c500-szorzas-matcher',
  topicTitle = '4. Szorzás és osztás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="szorzas-es-osztas"
      title={topicTitle}
      subtitle="Párosítsd a képeket és a műveleteket az eredményükkel!"
      levels={MUL_DIV_500_G3_MATCHER_LEVELS}
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

export default MulDiv500G3Matcher;
