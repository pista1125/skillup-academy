import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniRodGroups, MiniFlatGroups, MiniShare, MiniCoinGrid } from './MulDiv1000G3CardFigures';

interface MulDiv1000G3MatcherProps {
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

const MUL_DIV_1000_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Tízesek és százasok',
    description: 'Egy kék rúd 10, egy piros lap 100. Mennyi összesen?',
    pairs: [
      { id: 'md1000m1_0', left: '', promptFigure: <MiniRodGroups groups={4} per={7} />, right: '280' },
      { id: 'md1000m1_1', left: '', promptFigure: <MiniRodGroups groups={3} per={9} />, right: '270' },
      { id: 'md1000m1_2', left: '', promptFigure: <MiniFlatGroups groups={3} per={2} />, right: '600' },
      { id: 'md1000m1_3', left: '', promptFigure: <MiniFlatGroups groups={2} per={4} />, right: '800' },
      { id: 'md1000m1_4', left: '9 · 100', right: '900' },
      { id: 'md1000m1_5', left: '10 · 100', right: '1000' },
      { id: 'md1000m1_6', left: '45 · 10', right: '450' },
      { id: 'md1000m1_7', left: '7 · 50', right: '350' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Osztás',
    description: 'Oszd szét egyformán, vagy nézd meg, hányszor van meg!',
    pairs: [
      { id: 'md1000m2_0', left: '', promptFigure: <MiniShare total={900} k={3} />, right: '300' },
      { id: 'md1000m2_1', left: '', promptFigure: <MiniShare total={320} k={4} />, right: '80' },
      { id: 'md1000m2_2', left: '', promptFigure: <MiniShare total={450} k={5} />, right: '90' },
      { id: 'md1000m2_3', left: '', promptFigure: <MiniShare total={1000} k={2} />, right: '500' },
      { id: 'md1000m2_4', left: '560 : 70', right: '8' },
      { id: 'md1000m2_5', left: '810 : 90', right: '9' },
      { id: 'md1000m2_6', left: '800 : 200', right: '4' },
      { id: 'md1000m2_7', left: '1000 : 100', right: '10' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Pénz és hiányzó számok',
    description: 'Mennyi pénz? Melyik szám hiányzik? Párosíts!',
    pairs: [
      { id: 'md1000m3_0', left: '', promptFigure: <MiniCoinGrid rows={2} cols={2} v={200} />, right: '800 Ft' },
      { id: 'md1000m3_1', left: '', promptFigure: <MiniCoinGrid rows={3} cols={3} v={100} />, right: '900 Ft' },
      { id: 'md1000m3_2', left: '', promptFigure: <MiniCoinGrid rows={2} cols={5} v={100} />, right: '1000 Ft' },
      { id: 'md1000m3_3', left: '', promptFigure: <MiniCoinGrid rows={2} cols={4} v={50} />, right: '400 Ft' },
      { id: 'md1000m3_4', left: '□ · 80 = 640', right: '8' },
      { id: 'md1000m3_5', left: '□ : 5 = 90', right: '450' },
      { id: 'md1000m3_6', left: '720 : □ = 9', right: '80' },
      { id: 'md1000m3_7', left: '6 · □ = 540', right: '90' }
    ]
  }
];

export const MUL_DIV_1000_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MUL_DIV_1000_G3_MATCHER_LEVELS_LIST[0],
  2: MUL_DIV_1000_G3_MATCHER_LEVELS_LIST[1],
  3: MUL_DIV_1000_G3_MATCHER_LEVELS_LIST[2]
};

export const MulDiv1000G3Matcher: React.FC<MulDiv1000G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c1000-szorzas-matcher',
  topicTitle = '4. Szorzás és osztás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="szorzas-es-osztas"
      title={topicTitle}
      subtitle="Párosítsd a képeket és a műveleteket az eredményükkel!"
      levels={MUL_DIV_1000_G3_MATCHER_LEVELS}
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

export default MulDiv1000G3Matcher;
