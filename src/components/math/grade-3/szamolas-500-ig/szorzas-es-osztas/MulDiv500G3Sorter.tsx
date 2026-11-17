import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortBags, SortShare, SortCoinSet } from './MulDiv500G3CardFigures';

interface MulDiv500G3SorterProps {
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

const MUL_DIV_500_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a szorzat?',
    description: 'Számold ki! Minden zsákban ugyanannyi van.',
    categories: [
      { id: 'p240', name: 'Szorzat: 240', color: 'sky' },
      { id: 'p280', name: 'Szorzat: 280', color: 'emerald' },
      { id: 'p300', name: 'Szorzat: 300', color: 'amber' }
    ],
    items: [
      { id: 'md500s1', text: '', figure: <SortBags k={4} v={60} />, categoryId: 'p240' },
      { id: 'md500s2', text: '', figure: <SortBags k={3} v={80} />, categoryId: 'p240' },
      { id: 'md500s3', text: '8 · 30', categoryId: 'p240' },
      { id: 'md500s4', text: '', figure: <SortBags k={4} v={70} />, categoryId: 'p280' },
      { id: 'md500s5', text: '7 · 40', categoryId: 'p280' },
      { id: 'md500s6', text: '28 · 10', categoryId: 'p280' },
      { id: 'md500s7', text: '', figure: <SortBags k={3} v={100} />, categoryId: 'p300' },
      { id: 'md500s8', text: '6 · 50', categoryId: 'p300' },
      { id: 'md500s9', text: '10 · 30', categoryId: 'p300' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi jut egyre?',
    description: 'Oszd szét egyformán! Kevesebb, pontosan vagy több, mint 50?',
    categories: [
      { id: 'kisebb', name: '50-nél kevesebb', color: 'sky' },
      { id: 'otven', name: 'Pontosan 50', color: 'emerald' },
      { id: 'tobb', name: '50-nél több', color: 'rose' }
    ],
    items: [
      { id: 'md500s10', text: '', figure: <SortShare total={160} k={4} />, categoryId: 'kisebb' },
      { id: 'md500s11', text: '', figure: <SortShare total={120} k={3} />, categoryId: 'kisebb' },
      { id: 'md500s12', text: '210 : 7', categoryId: 'kisebb' },
      { id: 'md500s13', text: '', figure: <SortShare total={200} k={4} />, categoryId: 'otven' },
      { id: 'md500s14', text: '', figure: <SortShare total={150} k={3} />, categoryId: 'otven' },
      { id: 'md500s15', text: '350 : 7', categoryId: 'otven' },
      { id: 'md500s16', text: '', figure: <SortShare total={240} k={4} />, categoryId: 'tobb' },
      { id: 'md500s17', text: '', figure: <SortShare total={270} k={3} />, categoryId: 'tobb' },
      { id: 'md500s18', text: '480 : 6', categoryId: 'tobb' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Előbb a szorzás!',
    description: 'Számold ki! Mennyi pénz, mennyi az eredmény?',
    categories: [
      { id: 'e200', name: 'Eredmény: 200', color: 'sky' },
      { id: 'e250', name: 'Eredmény: 250', color: 'emerald' },
      { id: 'e300', name: 'Eredmény: 300', color: 'amber' }
    ],
    items: [
      { id: 'md500s19', text: '', figure: <SortCoinSet n={4} v={50} />, categoryId: 'e200' },
      { id: 'md500s20', text: '', figure: <SortCoinSet n={2} v={100} />, categoryId: 'e200' },
      { id: 'md500s21', text: '100 + 5 · 20', categoryId: 'e200' },
      { id: 'md500s22', text: '', figure: <SortCoinSet n={5} v={50} />, categoryId: 'e250' },
      { id: 'md500s23', text: '10 · 20 + 50', categoryId: 'e250' },
      { id: 'md500s24', text: '300 − 5 · 10', categoryId: 'e250' },
      { id: 'md500s25', text: '', figure: <SortCoinSet n={3} v={100} />, categoryId: 'e300' },
      { id: 'md500s26', text: '', figure: <SortCoinSet n={6} v={50} />, categoryId: 'e300' },
      { id: 'md500s27', text: '20 + 7 · 40', categoryId: 'e300' }
    ]
  }
];

export const MUL_DIV_500_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MUL_DIV_500_G3_SORTER_LEVELS_LIST[0],
  2: MUL_DIV_500_G3_SORTER_LEVELS_LIST[1],
  3: MUL_DIV_500_G3_SORTER_LEVELS_LIST[2]
};

export const MulDiv500G3Sorter: React.FC<MulDiv500G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c500-szorzas-sorter',
  topicTitle = '4. Szorzás és osztás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId={topicId}
      subtopicId="szorzas-es-osztas"
      title={topicTitle}
      subtitle="Számold ki, és válogasd szét!"
      levels={MUL_DIV_500_G3_SORTER_LEVELS}
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

export default MulDiv500G3Sorter;
