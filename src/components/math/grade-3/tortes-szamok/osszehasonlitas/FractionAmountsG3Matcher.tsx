import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniObjs, MiniStrip, MiniClock, MiniJug, MiniSeg, MiniWhole } from './FractionAmountsG3CardFigures';

interface FractionAmountsG3MatcherProps {
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
    title: '1. szint: Hány darab?',
    description: 'Mennyi a pöttyök fele, harmada, negyede?',
    pairs: [
      { id: 'fam1_0', left: '', promptFigure: <MiniObjs n={8} k={2} word="fele" />, right: '4' },
      { id: 'fam1_1', left: '', promptFigure: <MiniObjs n={15} k={3} word="harmada" />, right: '5' },
      { id: 'fam1_2', left: '', promptFigure: <MiniObjs n={12} k={4} word="negyede" />, right: '3' },
      { id: 'fam1_3', left: '', promptFigure: <MiniObjs n={12} k={2} word="fele" />, right: '6' },
      { id: 'fam1_4', left: '', promptFigure: <MiniObjs n={10} k={5} word="ötöde" />, right: '2' },
      { id: 'fam1_5', left: 'a 14 fele', right: '7' },
      { id: 'fam1_6', left: 'a 40 negyede', right: '10' },
      { id: 'fam1_7', left: 'a 24 harmada', right: '8' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mértékek része',
    description: 'Váltsd át, aztán oszd el!',
    pairs: [
      { id: 'fam2_0', left: 'fele', promptFigure: <MiniStrip top="1 kg" n={2} />, right: '50 dkg' },
      { id: 'fam2_1', left: 'ötöde', promptFigure: <MiniStrip top="1 m" n={5} />, right: '20 cm' },
      { id: 'fam2_2', left: 'negyede', promptFigure: <MiniClock n={4} />, right: '15 perc' },
      { id: 'fam2_3', left: 'Mennyi víz?', promptFigure: <MiniJug level={5} />, right: '5 dl' },
      { id: 'fam2_4', left: 'negyede', promptFigure: <MiniStrip top="1 kg" n={4} />, right: '25 dkg' },
      { id: 'fam2_5', left: '1 óra harmada', right: '20 perc' },
      { id: 'fam2_6', left: '1 m tizede', right: '10 cm' },
      { id: 'fam2_7', left: '1 dl fele', right: '5 cl' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szakaszok és nagy számok',
    description: 'Mérd meg, oszd el, vagy keresd az egészet!',
    pairs: [
      { id: 'fam3_0', left: '1 osztás = 1 cm', promptFigure: <MiniSeg cm={8} word="fele" />, right: '4 cm' },
      { id: 'fam3_1', left: '1 osztás = 1 cm', promptFigure: <MiniSeg cm={9} word="harmada" />, right: '3 cm' },
      { id: 'fam3_2', left: 'Ez a fele. Mennyi az egész?', promptFigure: <MiniWhole partCm={5} n={2} />, right: '10 cm' },
      { id: 'fam3_3', left: 'tizede', promptFigure: <MiniStrip top="800" n={10} />, right: '80' },
      { id: 'fam3_4', left: 'Ez a negyede. Mennyi az egész?', promptFigure: <MiniWhole partCm={4} n={4} />, right: '16 cm' },
      { id: 'fam3_5', left: 'a 240 fele', right: '120' },
      { id: 'fam3_6', left: 'a 360 negyede', right: '90' },
      { id: 'fam3_7', left: '2 óra harmada', right: '40 perc' }
    ]
  }
];

export const FRACTION_AMOUNTS_G3_MATCHER_LEVELS: Record<1 | 2 | 3, MatcherLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const FractionAmountsG3Matcher: React.FC<FractionAmountsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-frac-mennyisegek-matcher',
  topicTitle = '3. Törtrész mennyiségekből – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId={topicId}
      subtopicId="osszehasonlitas"
      title={topicTitle}
      subtitle="Párosítsd a képeket és a kérdéseket a részek nagyságával!"
      levels={FRACTION_AMOUNTS_G3_MATCHER_LEVELS}
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

export default FractionAmountsG3Matcher;
