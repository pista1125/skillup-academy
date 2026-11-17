import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniCoins, MiniJump, MiniBar500 } from './AddSub500G3CardFigures';

interface AddSub500G3MatcherProps {
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

const ADD_SUB_500_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Százasok, tízesek, pénz',
    description: 'Mennyi pénz? Mennyi az eredmény? Párosíts!',
    pairs: [
      { id: 'as500m1_0', left: '', promptFigure: <MiniCoins coins={[100, 100, 100, 50, 20]} />, right: '370 Ft' },
      { id: 'as500m1_1', left: '', promptFigure: <MiniCoins coins={[200, 100, 10, 10]} />, right: '320 Ft' },
      { id: 'as500m1_2', left: '', promptFigure: <MiniCoins coins={[200, 200, 50, 20, 20]} />, right: '490 Ft' },
      { id: 'as500m1_3', left: '', promptFigure: <MiniCoins coins={[100, 100, 50, 50, 10]} />, right: '310 Ft' },
      { id: 'as500m1_4', left: '200 + 300', right: '500' },
      { id: 'as500m1_5', left: '480 − 80', right: '400' },
      { id: 'as500m1_6', left: '260 + 130', right: '390' },
      { id: 'as500m1_7', left: '450 − 220', right: '230' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Átlépés a százason',
    description: 'Hová érkezik az ugrás? Párosítsd az eredménnyel!',
    pairs: [
      { id: 'as500m2_0', left: '', promptFigure: <MiniJump from={380} by={40} />, right: '420' },
      { id: 'as500m2_1', left: '', promptFigure: <MiniJump from={270} by={50} />, right: '320' },
      { id: 'as500m2_2', left: '', promptFigure: <MiniJump from={430} by={-60} />, right: '370' },
      { id: 'as500m2_3', left: '', promptFigure: <MiniJump from={310} by={-20} />, right: '290' },
      { id: 'as500m2_4', left: '190 + 90', right: '280' },
      { id: 'as500m2_5', left: '350 + 90', right: '440' },
      { id: 'as500m2_6', left: '240 − 70', right: '170' },
      { id: 'as500m2_7', left: '330 − 80', right: '250' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hiányzó számok',
    description: 'Melyik szám hiányzik? Párosíts!',
    pairs: [
      { id: 'as500m3_0', left: '', promptFigure: <MiniBar500 known={320} />, right: '180' },
      { id: 'as500m3_1', left: '', promptFigure: <MiniBar500 known={140} />, right: '360' },
      { id: 'as500m3_2', left: '', promptFigure: <MiniBar500 known={270} />, right: '230' },
      { id: 'as500m3_3', left: '', promptFigure: <MiniBar500 known={450} />, right: '50' },
      { id: 'as500m3_4', left: '□ − 150 = 260', right: '410' },
      { id: 'as500m3_5', left: '380 − □ = 210', right: '170' },
      { id: 'as500m3_6', left: '□ + 160 = 300', right: '140' },
      { id: 'as500m3_7', left: '240 + □ = 430', right: '190' }
    ]
  }
];

export const ADD_SUB_500_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD_SUB_500_G3_MATCHER_LEVELS_LIST[0],
  2: ADD_SUB_500_G3_MATCHER_LEVELS_LIST[1],
  3: ADD_SUB_500_G3_MATCHER_LEVELS_LIST[2]
};

export const AddSub500G3Matcher: React.FC<AddSub500G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c500-osszeadas-matcher',
  topicTitle = '3. Összeadás és kivonás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Párosítsd a képeket és a műveleteket az eredményükkel!"
      levels={ADD_SUB_500_G3_MATCHER_LEVELS}
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

export default AddSub500G3Matcher;
