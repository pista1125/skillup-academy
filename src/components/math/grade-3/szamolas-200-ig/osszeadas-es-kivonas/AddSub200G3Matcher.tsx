import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniCoins, MiniRods, MiniBar200 } from './AddSub200G3CardFigures';

interface AddSub200G3MatcherProps {
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

const ADD_SUB_200_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kerek tízesek, pénz',
    description: 'Mennyi pénz? Mennyi az eredmény? Párosíts!',
    pairs: [
      { id: 'as200m1_0', left: '', promptFigure: <MiniCoins coins={[100, 50]} />, right: '150 Ft' },
      { id: 'as200m1_1', left: '', promptFigure: <MiniCoins coins={[100, 20, 10]} />, right: '130 Ft' },
      { id: 'as200m1_2', left: '', promptFigure: <MiniCoins coins={[50, 20, 20, 10]} />, right: '100 Ft' },
      { id: 'as200m1_3', left: '', promptFigure: <MiniCoins coins={[100, 50, 20, 20]} />, right: '190 Ft' },
      { id: 'as200m1_4', left: '120 + 40', right: '160' },
      { id: 'as200m1_5', left: '180 − 60', right: '120' },
      { id: 'as200m1_6', left: '150 − 40', right: '110' },
      { id: 'as200m1_7', left: '160 + 40', right: '200' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Átlépés a 100-on',
    description: 'Egy rúd 10-et ér. Párosítsd az eredménnyel!',
    pairs: [
      { id: 'as200m2_0', left: '', promptFigure: <MiniRods a={8} b={4} />, right: '120' },
      { id: 'as200m2_1', left: '', promptFigure: <MiniRods a={9} b={9} />, right: '180' },
      { id: 'as200m2_2', left: '', promptFigure: <MiniRods a={6} b={5} />, right: '110' },
      { id: 'as200m2_3', left: '', promptFigure: <MiniRods a={7} b={6} />, right: '130' },
      { id: 'as200m2_4', left: '150 − 70', right: '80' },
      { id: 'as200m2_5', left: '120 − 50', right: '70' },
      { id: 'as200m2_6', left: '170 − 80', right: '90' },
      { id: 'as200m2_7', left: '140 − 80', right: '60' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó számok',
    description: 'Melyik szám hiányzik? Párosíts!',
    pairs: [
      { id: 'as200m3_0', left: '', promptFigure: <MiniBar200 known={150} />, right: '50' },
      { id: 'as200m3_1', left: '', promptFigure: <MiniBar200 known={120} />, right: '80' },
      { id: 'as200m3_2', left: '', promptFigure: <MiniBar200 known={60} />, right: '140' },
      { id: 'as200m3_3', left: '', promptFigure: <MiniBar200 known={90} />, right: '110' },
      { id: 'as200m3_4', left: '□ − 60 = 70', right: '130' },
      { id: 'as200m3_5', left: '180 − □ = 90', right: '90' },
      { id: 'as200m3_6', left: '□ + 80 = 150', right: '70' },
      { id: 'as200m3_7', left: '200 − □ = 170', right: '30' }
    ]
  }
];

export const ADD_SUB_200_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD_SUB_200_G3_MATCHER_LEVELS_LIST[0],
  2: ADD_SUB_200_G3_MATCHER_LEVELS_LIST[1],
  3: ADD_SUB_200_G3_MATCHER_LEVELS_LIST[2]
};

export const AddSub200G3Matcher: React.FC<AddSub200G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c200-osszeadas-matcher',
  topicTitle = '4. Összeadás és kivonás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Párosítsd a képeket és a műveleteket az eredményükkel!"
      levels={ADD_SUB_200_G3_MATCHER_LEVELS}
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

export default AddSub200G3Matcher;
