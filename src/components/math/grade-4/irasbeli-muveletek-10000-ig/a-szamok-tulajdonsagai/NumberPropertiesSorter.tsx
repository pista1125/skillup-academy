import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberPropertiesSorterProps {
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

const NUMBER_PROPS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A halmazábra részei',
    description: 'Hová kerül a szám? Csak a 2 többszörösei közé, a közös részbe, vagy csak az 5 többszörösei közé?',
    categories: [
      { id: 'two', name: 'Csak 2 többszöröse', color: 'blue' },
      { id: 'both', name: '2 és 5 többszöröse is', color: 'emerald' },
      { id: 'five', name: 'Csak 5 többszöröse', color: 'purple' }
    ],
    items: [
      { id: 'nps1', text: '7602', categoryId: 'two' },
      { id: 'nps2', text: '7656', categoryId: 'two' },
      { id: 'nps3', text: '4802', categoryId: 'two' },
      { id: 'nps4', text: '4310', categoryId: 'both' },
      { id: 'nps5', text: '8420', categoryId: 'both' },
      { id: 'nps6', text: '3990', categoryId: 'both' },
      { id: 'nps7', text: '2965', categoryId: 'five' },
      { id: 'nps8', text: '2865', categoryId: 'five' },
      { id: 'nps9', text: '1175', categoryId: 'five' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Páros, páratlan, 4 többszöröse',
    description: 'Oszd el 4-gyel a páros számokat! Melyik csoportba tartozik a szám?',
    categories: [
      { id: 'four', name: '4 többszöröse', color: 'amber' },
      { id: 'even', name: 'Páros, de nem 4 többszöröse', color: 'teal' },
      { id: 'odd', name: 'Páratlan', color: 'rose' }
    ],
    items: [
      { id: 'nps10', text: '1240', categoryId: 'four' },
      { id: 'nps11', text: '4304', categoryId: 'four' },
      { id: 'nps12', text: '10 000', categoryId: 'four' },
      { id: 'nps13', text: '1422', categoryId: 'even' },
      { id: 'nps14', text: '3486', categoryId: 'even' },
      { id: 'nps15', text: '1350', categoryId: 'even' },
      { id: 'nps16', text: '4543', categoryId: 'odd' },
      { id: 'nps17', text: '5311', categoryId: 'odd' },
      { id: 'nps18', text: '1359', categoryId: 'odd' }
    ]
  },
  {
    level: 3,
    title: '3. szint: 10, 100 vagy 1000 többszöröse?',
    description: 'Válaszd ki a legnagyobbat a 10, 100, 1000 közül, amelynek a szám még többszöröse!',
    categories: [
      { id: 't10', name: '10-é, de nem 100-é', color: 'blue' },
      { id: 't100', name: '100-é, de nem 1000-é', color: 'amber' },
      { id: 't1000', name: '1000 többszöröse', color: 'emerald' }
    ],
    items: [
      { id: 'nps19', text: '4310', categoryId: 't10' },
      { id: 'nps20', text: '3990', categoryId: 't10' },
      { id: 'nps21', text: '9240', categoryId: 't10' },
      { id: 'nps22', text: '9100', categoryId: 't100' },
      { id: 'nps23', text: '6400', categoryId: 't100' },
      { id: 'nps24', text: '3700', categoryId: 't100' },
      { id: 'nps25', text: '4000', categoryId: 't1000' },
      { id: 'nps26', text: '8000', categoryId: 't1000' },
      { id: 'nps27', text: '10 000', categoryId: 't1000' }
    ]
  }
];

const NUMBER_PROPS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBER_PROPS_SORTER_LEVELS_LIST[0],
  2: NUMBER_PROPS_SORTER_LEVELS_LIST[1],
  3: NUMBER_PROPS_SORTER_LEVELS_LIST[2]
};

export const NumberPropertiesSorter: React.FC<NumberPropertiesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wops-szamok-tulajdonsagai-sorter',
  topicTitle = '4. A számok tulajdonságai – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="a-szamok-tulajdonsagai"
      title={topicTitle}
      subtitle="Csoportosítsd a számokat a tulajdonságaik szerint!"
      levels={NUMBER_PROPS_SORTER_LEVELS}
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

export default NumberPropertiesSorter;
