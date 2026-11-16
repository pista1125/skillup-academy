import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenAddSubSorterProps {
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

const WRITTEN_ADDSUB_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kevesebb, pont 5000 vagy több?',
    description: 'Add össze a három számot! Az összeg kisebb 5000-nél, pontosan 5000, vagy nagyobb 5000-nél?',
    categories: [
      { id: 'lt', name: 'Kisebb, mint 5000', color: 'blue' },
      { id: 'eq', name: 'Pontosan 5000', color: 'emerald' },
      { id: 'gt', name: 'Nagyobb, mint 5000', color: 'amber' }
    ],
    items: [
      { id: 'wass1', text: '830 + 850 + 1040', categoryId: 'lt' },
      { id: 'wass2', text: '830 + 850 + 1360', categoryId: 'lt' },
      { id: 'wass3', text: '850 + 1040 + 1820', categoryId: 'lt' },
      { id: 'wass4', text: '830 + 1820 + 2350', categoryId: 'eq' },
      { id: 'wass5', text: '850 + 1360 + 2790', categoryId: 'eq' },
      { id: 'wass6', text: '1040 + 1870 + 2090', categoryId: 'eq' },
      { id: 'wass7', text: '2090 + 2350 + 2790', categoryId: 'gt' },
      { id: 'wass8', text: '1870 + 2350 + 2790', categoryId: 'gt' },
      { id: 'wass9', text: '1360 + 2090 + 2350', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hányszor marad 1?',
    description: 'Írásbeli összeadásnál hány helyi értéken marad 1 (maradék, amit tovább viszünk)?',
    categories: [
      { id: 'c0', name: 'Nincs maradék', color: 'teal' },
      { id: 'c1', name: '1 helyen marad 1', color: 'purple' },
      { id: 'c2', name: '2 vagy több helyen', color: 'rose' }
    ],
    items: [
      { id: 'wass10', text: '2324 + 3241', categoryId: 'c0' },
      { id: 'wass11', text: '4512 + 3275', categoryId: 'c0' },
      { id: 'wass12', text: '6103 + 2804', categoryId: 'c0' },
      { id: 'wass13', text: '3246 + 2415', categoryId: 'c1' },
      { id: 'wass14', text: '3845 + 2850', categoryId: 'c1' },
      { id: 'wass15', text: '6243 + 3576', categoryId: 'c1' },
      { id: 'wass16', text: '3524 + 5749', categoryId: 'c2' },
      { id: 'wass17', text: '5678 + 3648', categoryId: 'c2' },
      { id: 'wass18', text: '2858 + 3642', categoryId: 'c2' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Becslés ezresre kerekítve',
    description: 'Kerekítsd ezresre a kisebbítendőt és a kivonandót, és becsüld meg a különbséget!',
    categories: [
      { id: 'b2', name: 'B: 2000', color: 'blue' },
      { id: 'b3', name: 'B: 3000', color: 'amber' },
      { id: 'b4', name: 'B: 4000', color: 'emerald' }
    ],
    items: [
      { id: 'wass19', text: '7212 − 5410', categoryId: 'b2' },
      { id: 'wass20', text: '7426 − 4813', categoryId: 'b2' },
      { id: 'wass21', text: '6336 − 3784', categoryId: 'b2' },
      { id: 'wass22', text: '6946 − 3575', categoryId: 'b3' },
      { id: 'wass23', text: '6345 − 2933', categoryId: 'b3' },
      { id: 'wass24', text: '5556 − 2517', categoryId: 'b3' },
      { id: 'wass25', text: '5846 − 2415', categoryId: 'b4' },
      { id: 'wass26', text: '9658 − 6164', categoryId: 'b4' },
      { id: 'wass27', text: '9746 − 6207', categoryId: 'b4' }
    ]
  }
];

const WRITTEN_ADDSUB_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WRITTEN_ADDSUB_SORTER_LEVELS_LIST[0],
  2: WRITTEN_ADDSUB_SORTER_LEVELS_LIST[1],
  3: WRITTEN_ADDSUB_SORTER_LEVELS_LIST[2]
};

export const WrittenAddSubSorter: React.FC<WrittenAddSubSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-wops-osszeadas-kivonas-sorter',
  topicTitle = '1. Írásbeli összeadás és kivonás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="irasbeli-osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Csoportosítsd a műveleteket összeg, maradék és becslés szerint!"
      levels={WRITTEN_ADDSUB_SORTER_LEVELS}
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

export default WrittenAddSubSorter;
