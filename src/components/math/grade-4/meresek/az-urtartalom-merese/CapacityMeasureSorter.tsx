import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CapacityMeasureSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const CAPACITY_MEASURE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik egységgel mérjük?',
    description: 'Melyik mértékegységgel érdemes megadni, mennyi fér bele?',
    categories: [
      { id: 'ml', name: 'milliliter (ml)', color: 'emerald' },
      { id: 'dl', name: 'deciliter (dl)', color: 'blue' },
      { id: 'l', name: 'liter (l)', color: 'rose' }
    ],
    items: [
      { id: 'cps1', text: 'szemcseppes üveg', categoryId: 'ml' },
      { id: 'cps2', text: 'egy injekciós fecskendő', categoryId: 'ml' },
      { id: 'cps3', text: 'egy gyűszű', categoryId: 'ml' },
      { id: 'cps4', text: 'egy pohár', categoryId: 'dl' },
      { id: 'cps5', text: 'egy teáscsésze', categoryId: 'dl' },
      { id: 'cps6', text: 'egy cumisüveg', categoryId: 'dl' },
      { id: 'cps7', text: 'egy felmosóvödör', categoryId: 'l' },
      { id: 'cps8', text: 'egy fürdőkád', categoryId: 'l' },
      { id: 'cps9', text: 'egy nagy akvárium', categoryId: 'l' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb, mint 1 l, pont 1 l vagy több?',
    description: 'Váltsd át a mennyiségeket, és csoportosíts!',
    categories: [
      { id: 'lt', name: '1 l-nél kevesebb', color: 'sky' },
      { id: 'eq', name: 'pontosan 1 l', color: 'amber' },
      { id: 'gt', name: '1 l-nél több', color: 'purple' }
    ],
    items: [
      { id: 'cps10', text: '750 ml', categoryId: 'lt' },
      { id: 'cps11', text: '9 dl', categoryId: 'lt' },
      { id: 'cps12', text: '75 cl', categoryId: 'lt' },
      { id: 'cps13', text: '1000 ml', categoryId: 'eq' },
      { id: 'cps14', text: '10 dl', categoryId: 'eq' },
      { id: 'cps15', text: '100 cl', categoryId: 'eq' },
      { id: 'cps16', text: '120 cl', categoryId: 'gt' },
      { id: 'cps17', text: '17 dl', categoryId: 'gt' },
      { id: 'cps18', text: '1200 ml', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány deciliter?',
    description: 'Váltsd át deciliterre, és tedd a megfelelő csoportba!',
    categories: [
      { id: 'a', name: '10 dl-nél kevesebb', color: 'emerald' },
      { id: 'b', name: '10 dl és 100 dl között', color: 'blue' },
      { id: 'c', name: '100 dl-nél több', color: 'rose' }
    ],
    items: [
      { id: 'cps19', text: '80 cl', categoryId: 'a' },
      { id: 'cps20', text: '500 ml', categoryId: 'a' },
      { id: 'cps21', text: '60 cl 45 ml', categoryId: 'a' },
      { id: 'cps22', text: '770 cl', categoryId: 'b' },
      { id: 'cps23', text: '5 l', categoryId: 'b' },
      { id: 'cps24', text: '2400 ml', categoryId: 'b' },
      { id: 'cps25', text: '71 l', categoryId: 'c' },
      { id: 'cps26', text: '1600 cl', categoryId: 'c' },
      { id: 'cps27', text: '160 l', categoryId: 'c' }
    ]
  }
];

const CAPACITY_MEASURE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: CAPACITY_MEASURE_SORTER_LEVELS_LIST[0],
  2: CAPACITY_MEASURE_SORTER_LEVELS_LIST[1],
  3: CAPACITY_MEASURE_SORTER_LEVELS_LIST[2]
};

export const CapacityMeasureSorter: React.FC<CapacityMeasureSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-meas-urtartalom-sorter',
  topicTitle = '5. Az űrtartalom mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="az-urtartalom-merese"
      title={topicTitle}
      subtitle="Csoportosítsd az űrtartalmakat mértékegység és nagyság szerint!"
      levels={CAPACITY_MEASURE_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default CapacityMeasureSorter;
