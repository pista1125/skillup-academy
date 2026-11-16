import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface TimeMeasureMatcherProps {
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

const TIME_MEASURE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Az idő mértékegységei',
    description: 'Párosítsd az egyenlő időtartamokat!',
    pairs: [
      { id: 'tmm1', left: '1 óra', right: '60 perc' },
      { id: 'tmm2', left: '1 perc', right: '60 másodperc' },
      { id: 'tmm3', left: '1 nap', right: '24 óra' },
      { id: 'tmm4', left: '1 hét', right: '7 nap' },
      { id: 'tmm5', left: '1 év', right: '12 hónap' },
      { id: 'tmm6', left: 'negyedóra', right: '15 perc' },
      { id: 'tmm7', left: 'félóra', right: '30 perc' },
      { id: 'tmm8', left: 'háromnegyed óra', right: '45 perc' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi az idő?',
    description: 'Párosítsd a szóban mondott időpontot a számokkal írt alakjával!',
    pairs: [
      { id: 'tmm9', left: 'negyed tíz', right: '9 óra 15 perc' },
      { id: 'tmm10', left: 'fél nyolc', right: '7 óra 30 perc' },
      { id: 'tmm11', left: 'háromnegyed hét', right: '6 óra 45 perc' },
      { id: 'tmm12', left: 'fél 5 múlt 10 perccel', right: '4 óra 40 perc' },
      { id: 'tmm13', left: 'tíz perc múlva két óra', right: '1 óra 50 perc' },
      { id: 'tmm14', left: 'öt perccel múlt kilenc óra', right: '9 óra 5 perc' },
      { id: 'tmm15', left: 'öt perc múlva fél négy', right: '3 óra 25 perc' },
      { id: 'tmm16', left: 'háromnegyed 5 múlt 3 perccel', right: '4 óra 48 perc' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Átváltások és szöveges feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'tmm17', left: '60 nap a kenuban – hány óra?', right: '1440 óra' },
      { id: 'tmm18', left: '48 óra – hány perc?', right: '2880 perc' },
      { id: 'tmm19', left: '5400 másodperc – hány perc?', right: '90 perc' },
      { id: 'tmm20', left: '7:05 (perc:másodperc) – hány másodperc?', right: '425 másodperc' },
      { id: 'tmm21', left: '6 és fél év – hány hónap?', right: '78 hónap' },
      { id: 'tmm22', left: '10 és negyed év – hány hónap?', right: '123 hónap' },
      { id: 'tmm23', left: '30 tojás, egyszerre 10 fér a fazékba, egy főzés 3 perc', right: '9 perc' },
      { id: 'tmm24', left: 'előkészítés 16:00-tól 16:27-ig', right: '27 perc' }
    ]
  }
];

const TIME_MEASURE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: TIME_MEASURE_MATCHER_LEVELS_LIST[0],
  2: TIME_MEASURE_MATCHER_LEVELS_LIST[1],
  3: TIME_MEASURE_MATCHER_LEVELS_LIST[2]
};

export const TimeMeasureMatcher: React.FC<TimeMeasureMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-meas-ido-matcher',
  topicTitle = '6. Az idő mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="az-ido-merese"
      title={topicTitle}
      subtitle="Párosítsd az időtartamokat, a szóban mondott időpontokat és a feladatok eredményeit!"
      levels={TIME_MEASURE_MATCHER_LEVELS}
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

export default TimeMeasureMatcher;
