import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortBlocks, SortJump, SortTags } from './AddSub500G3CardFigures';

interface AddSub500G3SorterProps {
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

const ADD_SUB_500_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kisebb, egyenlő vagy nagyobb?',
    description: 'Mennyi ez? Hasonlítsd a 300-hoz! (lap = 100, rúd = 10)',
    categories: [
      { id: 'kisebb', name: 'Kisebb, mint 300', color: 'sky' },
      { id: 'egyenlo', name: 'Pontosan 300', color: 'emerald' },
      { id: 'nagyobb', name: 'Nagyobb, mint 300', color: 'rose' }
    ],
    items: [
      { id: 'as500s1', text: '', figure: <SortBlocks sz={2} t={8} />, categoryId: 'kisebb' },
      { id: 'as500s2', text: '', figure: <SortBlocks sz={1} t={9} />, categoryId: 'kisebb' },
      { id: 'as500s3', text: '150 + 140', categoryId: 'kisebb' },
      { id: 'as500s4', text: '', figure: <SortBlocks sz={3} t={0} />, categoryId: 'egyenlo' },
      { id: 'as500s5', text: '', figure: <SortBlocks sz={2} t={10} />, categoryId: 'egyenlo' },
      { id: 'as500s6', text: '360 − 60', categoryId: 'egyenlo' },
      { id: 'as500s7', text: '', figure: <SortBlocks sz={3} t={2} />, categoryId: 'nagyobb' },
      { id: 'as500s8', text: '250 + 70', categoryId: 'nagyobb' },
      { id: 'as500s9', text: '400 − 90', categoryId: 'nagyobb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik eredmény?',
    description: 'Számold ki! Hová érkezik az ugrás?',
    categories: [
      { id: 'r320', name: 'Eredmény: 320', color: 'sky' },
      { id: 'r340', name: 'Eredmény: 340', color: 'emerald' },
      { id: 'r360', name: 'Eredmény: 360', color: 'amber' }
    ],
    items: [
      { id: 'as500s10', text: '', figure: <SortJump from={290} by={30} />, categoryId: 'r320' },
      { id: 'as500s11', text: '380 − 60', categoryId: 'r320' },
      { id: 'as500s12', text: '250 + 70', categoryId: 'r320' },
      { id: 'as500s13', text: '', figure: <SortJump from={370} by={-30} />, categoryId: 'r340' },
      { id: 'as500s14', text: '', figure: <SortJump from={280} by={60} />, categoryId: 'r340' },
      { id: 'as500s15', text: '410 − 70', categoryId: 'r340' },
      { id: 'as500s16', text: '', figure: <SortJump from={390} by={-30} />, categoryId: 'r360' },
      { id: 'as500s17', text: '', figure: <SortJump from={320} by={40} />, categoryId: 'r360' },
      { id: 'as500s18', text: '270 + 90', categoryId: 'r360' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a visszajáró?',
    description: 'Mindig 500 Ft-tal fizetsz. Mennyit kapsz vissza?',
    categories: [
      { id: 'v120', name: 'Visszajár 120 Ft', color: 'sky' },
      { id: 'v150', name: 'Visszajár 150 Ft', color: 'emerald' },
      { id: 'v210', name: 'Visszajár 210 Ft', color: 'rose' }
    ],
    items: [
      { id: 'as500s19', text: '', figure: <SortTags prices={[380]} />, categoryId: 'v120' },
      { id: 'as500s20', text: '', figure: <SortTags prices={[300, 80]} />, categoryId: 'v120' },
      { id: 'as500s21', text: 'Ár: 190 Ft + 190 Ft', categoryId: 'v120' },
      { id: 'as500s22', text: '', figure: <SortTags prices={[350]} />, categoryId: 'v150' },
      { id: 'as500s23', text: '', figure: <SortTags prices={[200, 150]} />, categoryId: 'v150' },
      { id: 'as500s24', text: 'Ár: 170 Ft + 180 Ft', categoryId: 'v150' },
      { id: 'as500s25', text: '', figure: <SortTags prices={[290]} />, categoryId: 'v210' },
      { id: 'as500s26', text: '', figure: <SortTags prices={[140, 150]} />, categoryId: 'v210' },
      { id: 'as500s27', text: 'Ár: 90 Ft + 200 Ft', categoryId: 'v210' }
    ]
  }
];

export const ADD_SUB_500_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD_SUB_500_G3_SORTER_LEVELS_LIST[0],
  2: ADD_SUB_500_G3_SORTER_LEVELS_LIST[1],
  3: ADD_SUB_500_G3_SORTER_LEVELS_LIST[2]
};

export const AddSub500G3Sorter: React.FC<AddSub500G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c500-osszeadas-sorter',
  topicTitle = '3. Összeadás és kivonás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Számold ki, és válogasd szét!"
      levels={ADD_SUB_500_G3_SORTER_LEVELS}
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

export default AddSub500G3Sorter;
