import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardPie, CardBar, CardRod } from './FractionsExamG3CardFigures';
import { MiniObjs, MiniStrip, MiniClock, MiniJug, MiniWhole } from '../osszehasonlitas/FractionAmountsG3CardFigures';

interface FractionsExamG3MatcherProps {
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

const LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hányad része piros?',
    description: 'Számold meg az egyenlő részeket, és a piros részeket!',
    pairs: [
      { id: 'fex1_0', left: '', promptFigure: <CardPie n={2} k={1} />, right: '1 ketted' },
      { id: 'fex1_1', left: '', promptFigure: <CardPie n={3} k={1} />, right: '1 harmad' },
      { id: 'fex1_2', left: '', promptFigure: <CardBar n={4} k={1} />, right: '1 negyed' },
      { id: 'fex1_3', left: '', promptFigure: <CardPie n={5} k={1} />, right: '1 ötöd' },
      { id: 'fex1_4', left: '', promptFigure: <CardBar n={6} k={1} />, right: '1 hatod' },
      { id: 'fex1_5', left: '', promptFigure: <CardPie n={8} k={1} />, right: '1 nyolcad' },
      { id: 'fex1_6', left: '', promptFigure: <CardPie n={4} k={3} />, right: '3 negyed' },
      { id: 'fex1_7', left: '10 egyenlő részből 1', right: '1 tized' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi a része?',
    description: 'Oszd el! Mértékeknél előbb válts át!',
    pairs: [
      { id: 'fex2_0', left: '', promptFigure: <MiniObjs n={12} k={3} word="harmada" />, right: '4' },
      { id: 'fex2_1', left: '', promptFigure: <MiniClock n={4} />, right: '15 perc' },
      { id: 'fex2_2', left: 'negyede', promptFigure: <MiniStrip top="1 kg" n={4} />, right: '25 dkg' },
      { id: 'fex2_3', left: 'ötöde', promptFigure: <MiniStrip top="1 m" n={5} />, right: '20 cm' },
      { id: 'fex2_4', left: 'Mennyi víz?', promptFigure: <MiniJug level={5} />, right: '5 dl' },
      { id: 'fex2_5', left: 'a 18 fele', right: '9' },
      { id: 'fex2_6', left: 'a 600 tizede', right: '60' },
      { id: 'fex2_7', left: '1 óra harmada', right: '20 perc' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Rudak és az egész',
    description: 'Hányad része a kis rúd a nagynak? Mennyi az egész?',
    pairs: [
      { id: 'fex3_0', left: 'bordó = 1 egész', promptFigure: <CardRod whole={8} part={2} />, right: '1 negyed' },
      { id: 'fex3_1', left: 'narancssárga = 1 egész', promptFigure: <CardRod whole={10} part={5} />, right: '1 ketted' },
      { id: 'fex3_2', left: 'lila = 1 egész', promptFigure: <CardRod whole={6} part={2} />, right: '1 harmad' },
      { id: 'fex3_3', left: 'Ez a fele. Mennyi az egész?', promptFigure: <MiniWhole partCm={6} n={2} />, right: '12 cm' },
      { id: 'fex3_4', left: 'Ez a harmada. Mennyi az egész?', promptFigure: <MiniWhole partCm={5} n={3} />, right: '15 cm' },
      { id: 'fex3_5', left: 'Egy szám negyede 25. Mi a szám?', right: '100' },
      { id: 'fex3_6', left: '2 óra negyede', right: '30 perc' },
      { id: 'fex3_7', left: 'a 900 harmada', right: '300' }
    ]
  }
];

export const FRACTIONS_EXAM_G3_MATCHER_LEVELS: Record<1 | 2 | 3, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const FractionsExamG3Matcher: React.FC<FractionsExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-frac-tudasproba-matcher',
  topicTitle = '4. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd a képeket és a kérdéseket a jó válasszal!"
      levels={FRACTIONS_EXAM_G3_MATCHER_LEVELS}
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

export default FractionsExamG3Matcher;
