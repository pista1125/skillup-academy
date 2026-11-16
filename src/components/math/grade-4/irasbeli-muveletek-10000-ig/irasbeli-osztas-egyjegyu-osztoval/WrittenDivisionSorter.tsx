import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenDivisionSorterProps {
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

const WRITTEN_DIV_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány jegyű a hányados?',
    description: 'Becsülj! Nézd meg, megvan-e az osztó az első számjegyben. Hány jegyű lesz a hányados?',
    categories: [
      { id: 'k2', name: 'Kétjegyű', color: 'blue' },
      { id: 'k3', name: 'Háromjegyű', color: 'emerald' },
      { id: 'k4', name: 'Négyjegyű', color: 'amber' }
    ],
    items: [
      { id: 'wds1', text: '224 : 3', categoryId: 'k2' },
      { id: 'wds2', text: '236 : 6', categoryId: 'k2' },
      { id: 'wds3', text: '777 : 9', categoryId: 'k2' },
      { id: 'wds4', text: '875 : 7', categoryId: 'k3' },
      { id: 'wds5', text: '734 : 2', categoryId: 'k3' },
      { id: 'wds6', text: '1421 : 6', categoryId: 'k3' },
      { id: 'wds7', text: '3693 : 3', categoryId: 'k4' },
      { id: 'wds8', text: '2872 : 2', categoryId: 'k4' },
      { id: 'wds9', text: '5840 : 5', categoryId: 'k4' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi a maradék?',
    description: 'Oszd el 3-mal! Mennyi marad: 0, 1 vagy 2?',
    categories: [
      { id: 'r0', name: 'Marad 0', color: 'teal' },
      { id: 'r1', name: 'Marad 1', color: 'purple' },
      { id: 'r2', name: 'Marad 2', color: 'rose' }
    ],
    items: [
      { id: 'wds10', text: '3693 : 3', categoryId: 'r0' },
      { id: 'wds11', text: '750 : 3', categoryId: 'r0' },
      { id: 'wds12', text: '3150 : 3', categoryId: 'r0' },
      { id: 'wds13', text: '4891 : 3', categoryId: 'r1' },
      { id: 'wds14', text: '1000 : 3', categoryId: 'r1' },
      { id: 'wds15', text: '7804 : 3', categoryId: 'r1' },
      { id: 'wds16', text: '224 : 3', categoryId: 'r2' },
      { id: 'wds17', text: '6893 : 3', categoryId: 'r2' },
      { id: 'wds18', text: '5462 : 3', categoryId: 'r2' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mekkora a hányados?',
    description: 'Számold ki a hányadost! Kisebb 1000-nél, 1000 és 2000 között van, vagy nagyobb 2000-nél?',
    categories: [
      { id: 'lt', name: 'Kisebb, mint 1000', color: 'blue' },
      { id: 'mid', name: '1000 és 2000 között', color: 'amber' },
      { id: 'gt', name: 'Nagyobb, mint 2000', color: 'emerald' }
    ],
    items: [
      { id: 'wds19', text: '734 : 2', categoryId: 'lt' },
      { id: 'wds20', text: '750 : 3', categoryId: 'lt' },
      { id: 'wds21', text: '3030 : 6', categoryId: 'lt' },
      { id: 'wds22', text: '3693 : 3', categoryId: 'mid' },
      { id: 'wds23', text: '2872 : 2', categoryId: 'mid' },
      { id: 'wds24', text: '5840 : 5', categoryId: 'mid' },
      { id: 'wds25', text: '8456 : 4', categoryId: 'gt' },
      { id: 'wds26', text: '9366 : 3', categoryId: 'gt' },
      { id: 'wds27', text: '7182 : 3', categoryId: 'gt' }
    ]
  }
];

const WRITTEN_DIV_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WRITTEN_DIV_SORTER_LEVELS_LIST[0],
  2: WRITTEN_DIV_SORTER_LEVELS_LIST[1],
  3: WRITTEN_DIV_SORTER_LEVELS_LIST[2]
};

export const WrittenDivisionSorter: React.FC<WrittenDivisionSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wops-osztas-sorter',
  topicTitle = '3. Írásbeli osztás egyjegyű osztóval – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="irasbeli-osztas-egyjegyu-osztoval"
      title={topicTitle}
      subtitle="Csoportosítsd az osztásokat a hányados jegyei, a maradék és a nagyság szerint!"
      levels={WRITTEN_DIV_SORTER_LEVELS}
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

export default WrittenDivisionSorter;
