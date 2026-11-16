import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionOfAmountMatcherProps {
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

export const FRACTION_OF_AMOUNT_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: 1 rész kiszámítása',
    description: 'Párosítsd a törtrészt az eredménnyel! (Csak osztani kell.)',
    pairs: [
      { id: 'foam1', left: '12 fele', right: '6' },
      { id: 'foam2', left: '12 harmada', right: '4' },
      { id: 'foam3', left: '12 negyede', right: '3' },
      { id: 'foam4', left: '12 hatoda', right: '2' },
      { id: 'foam5', left: '12 tizenkettede', right: '1' },
      { id: 'foam6', left: '24 fele', right: '12' },
      { id: 'foam7', left: '24 harmada', right: '8' },
      { id: 'foam8', left: '60 negyede', right: '15' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Törtrész mértékegységgel',
    description: 'Párosítsd a mennyiség törtrészét az átváltott értékkel!',
    pairs: [
      { id: 'foam9', left: '1 m negyede', right: '25 cm' },
      { id: 'foam10', left: '1 óra negyede', right: '15 perc' },
      { id: 'foam11', left: '1 kg fele', right: '500 g' },
      { id: 'foam12', left: '1 km tizede', right: '100 m' },
      { id: 'foam13', left: '1 dm tizede', right: '1 cm' },
      { id: 'foam14', left: '1 m ötöde', right: '20 cm' },
      { id: 'foam15', left: 'fél óra', right: '30 perc' },
      { id: 'foam16', left: '1 l tizede', right: '1 dl' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Több rész két lépésben',
    description: 'Előbb oszd el, aztán szorozd meg! Párosítsd az eredménnyel!',
    pairs: [
      { id: 'foam17', left: '4000 Ft-nak a 3 negyede', right: '3000 Ft' },
      { id: 'foam18', left: '4000 Ft-nak az 1 ötöde', right: '800 Ft' },
      { id: 'foam19', left: '4000 Ft-nak a 3 ötöde', right: '2400 Ft' },
      { id: 'foam20', left: '4000 Ft-nak a 4 nyolcada', right: '2000 Ft' },
      { id: 'foam21', left: '300 Ft-nak az 5 hatoda', right: '250 Ft' },
      { id: 'foam22', left: '300 Ft-nak a 4 ötöde', right: '240 Ft' },
      { id: 'foam23', left: '1 m 7 tizede', right: '70 cm' },
      { id: 'foam24', left: '3 negyed óra', right: '45 perc' }
    ]
  }
];

const FRACTION_OF_AMOUNT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: FRACTION_OF_AMOUNT_MATCHER_LEVELS_LIST[0],
  2: FRACTION_OF_AMOUNT_MATCHER_LEVELS_LIST[1],
  3: FRACTION_OF_AMOUNT_MATCHER_LEVELS_LIST[2]
};

export const FractionOfAmountMatcher: React.FC<FractionOfAmountMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-frac-tortresz-matcher',
  topicTitle = '5. Törtrész kiszámítása – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="tortresz-szamitasa"
      title={topicTitle}
      subtitle="Mennyi a törtrész? Párosítsd a feladatot az eredménnyel!"
      levels={FRACTION_OF_AMOUNT_MATCHER_LEVELS}
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

export default FractionOfAmountMatcher;
