import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CapacityMeasureMatcherProps {
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

const CAPACITY_MEASURE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mértékegységek',
    description: 'Párosítsd az egyenlő űrtartalmakat!',
    pairs: [
      { id: 'cpm1', left: '1 l', right: '10 dl' },
      { id: 'cpm2', left: '1 dl', right: '10 cl' },
      { id: 'cpm3', left: '1 cl', right: '10 ml' },
      { id: 'cpm4', left: '2 l', right: '2000 ml' },
      { id: 'cpm5', left: '3 dl', right: '300 ml' },
      { id: 'cpm6', left: '5 cl', right: '50 ml' },
      { id: 'cpm7', left: 'fél liter', right: '50 cl' },
      { id: 'cpm8', left: '3 l', right: '30 dl' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tejből készült finomságok',
    description: 'Add meg a mennyiséget a másik mértékegységben!',
    pairs: [
      { id: 'cpm9', left: 'jégkrém: 120 cl', right: '12 dl' },
      { id: 'cpm10', left: 'joghurt: 17 dl', right: '170 cl' },
      { id: 'cpm11', left: 'vaj: 2 és fél liter', right: '25 dl' },
      { id: 'cpm12', left: 'tejszín: 40 dl', right: '4000 ml' },
      { id: 'cpm13', left: 'sajt: 190 cl', right: '1900 ml' },
      { id: 'cpm14', left: 'flakon: 770 ml', right: '77 cl' },
      { id: 'cpm15', left: '60 cl 45 ml', right: '645 ml' },
      { id: 'cpm16', left: '7 l 6 cl', right: '7060 ml' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Becslés és szöveges feladatok',
    description: 'Párosítsd az edényt vagy a feladatot az űrtartalommal!',
    pairs: [
      { id: 'cpm17', left: 'szemcseppes üveg', right: '10 ml' },
      { id: 'cpm18', left: 'egy pohár tej', right: '2 dl' },
      { id: 'cpm19', left: 'felmosóvödör', right: '10 l' },
      { id: 'cpm20', left: 'a három akvárium: 160 l + 3000 cl + 700 dl', right: '260 l' },
      { id: 'cpm21', left: 'Józsi bácsi: 40-szer a 30 literes puttonnyal', right: '1200 l' },
      { id: 'cpm22', left: 'tűzoltóautó: 4000 l-ből már benne van 3600 l, még fér', right: '400 l' },
      { id: 'cpm23', left: 'locsolás: 2 perc alatt 1880 dl, 1 perc alatt', right: '940 dl' },
      { id: 'cpm24', left: 'permetező: 12 dl másodpercenként, 5 másodperc alatt', right: '60 dl' }
    ]
  }
];

const CAPACITY_MEASURE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: CAPACITY_MEASURE_MATCHER_LEVELS_LIST[0],
  2: CAPACITY_MEASURE_MATCHER_LEVELS_LIST[1],
  3: CAPACITY_MEASURE_MATCHER_LEVELS_LIST[2]
};

export const CapacityMeasureMatcher: React.FC<CapacityMeasureMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-meas-urtartalom-matcher',
  topicTitle = '5. Az űrtartalom mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="az-urtartalom-merese"
      title={topicTitle}
      subtitle="Párosítsd az l, dl, cl és ml mennyiségeket, a tejtermékeket és az edényeket!"
      levels={CAPACITY_MEASURE_MATCHER_LEVELS}
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

export default CapacityMeasureMatcher;
