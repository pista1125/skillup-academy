import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortBags, SortShare, SortCoinSet } from './MulDiv1000G3CardFigures';

interface MulDiv1000G3SorterProps {
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

const MUL_DIV_1000_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a szorzat?',
    description: 'Számold ki! Minden zsákban ugyanannyi van.',
    categories: [
      { id: 'p600', name: 'Szorzat: 600', color: 'sky' },
      { id: 'p800', name: 'Szorzat: 800', color: 'emerald' },
      { id: 'p900', name: 'Szorzat: 900', color: 'amber' }
    ],
    items: [
      { id: 'md1000s1', text: '', figure: <SortBags k={3} v={200} />, categoryId: 'p600' },
      { id: 'md1000s2', text: '', figure: <SortBags k={2} v={300} />, categoryId: 'p600' },
      { id: 'md1000s3', text: '10 · 60', categoryId: 'p600' },
      { id: 'md1000s4', text: '', figure: <SortBags k={4} v={200} />, categoryId: 'p800' },
      { id: 'md1000s5', text: '', figure: <SortBags k={2} v={400} />, categoryId: 'p800' },
      { id: 'md1000s6', text: '80 · 10', categoryId: 'p800' },
      { id: 'md1000s7', text: '', figure: <SortBags k={3} v={300} />, categoryId: 'p900' },
      { id: 'md1000s8', text: '9 · 100', categoryId: 'p900' },
      { id: 'md1000s9', text: '90 · 10', categoryId: 'p900' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi jut egyre?',
    description: 'Oszd szét egyformán! Kevesebb, pontosan vagy több, mint 100?',
    categories: [
      { id: 'kisebb', name: '100-nál kevesebb', color: 'sky' },
      { id: 'szaz', name: 'Pontosan 100', color: 'emerald' },
      { id: 'tobb', name: '100-nál több', color: 'rose' }
    ],
    items: [
      { id: 'md1000s10', text: '', figure: <SortShare total={360} k={4} />, categoryId: 'kisebb' },
      { id: 'md1000s11', text: '630 : 7', categoryId: 'kisebb' },
      { id: 'md1000s12', text: '560 : 8', categoryId: 'kisebb' },
      { id: 'md1000s13', text: '', figure: <SortShare total={400} k={4} />, categoryId: 'szaz' },
      { id: 'md1000s14', text: '', figure: <SortShare total={300} k={3} />, categoryId: 'szaz' },
      { id: 'md1000s15', text: '600 : 6', categoryId: 'szaz' },
      { id: 'md1000s16', text: '', figure: <SortShare total={900} k={3} />, categoryId: 'tobb' },
      { id: 'md1000s17', text: '', figure: <SortShare total={800} k={2} />, categoryId: 'tobb' },
      { id: 'md1000s18', text: '1000 : 5', categoryId: 'tobb' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Előbb a szorzás!',
    description: 'Számold ki! Mennyi pénz, mennyi az eredmény?',
    categories: [
      { id: 'e400', name: 'Eredmény: 400', color: 'sky' },
      { id: 'e600', name: 'Eredmény: 600', color: 'emerald' },
      { id: 'e1000', name: 'Eredmény: 1000', color: 'amber' }
    ],
    items: [
      { id: 'md1000s19', text: '', figure: <SortCoinSet n={2} v={200} />, categoryId: 'e400' },
      { id: 'md1000s20', text: '1000 − 6 · 100', categoryId: 'e400' },
      { id: 'md1000s21', text: '80 · 5', categoryId: 'e400' },
      { id: 'md1000s22', text: '', figure: <SortCoinSet n={3} v={200} />, categoryId: 'e600' },
      { id: 'md1000s23', text: '', figure: <SortCoinSet n={6} v={100} />, categoryId: 'e600' },
      { id: 'md1000s24', text: '1000 − 4 · 100', categoryId: 'e600' },
      { id: 'md1000s25', text: '', figure: <SortCoinSet n={5} v={200} />, categoryId: 'e1000' },
      { id: 'md1000s26', text: '400 + 6 · 100', categoryId: 'e1000' },
      { id: 'md1000s27', text: '10 · 100', categoryId: 'e1000' }
    ]
  }
];

export const MUL_DIV_1000_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MUL_DIV_1000_G3_SORTER_LEVELS_LIST[0],
  2: MUL_DIV_1000_G3_SORTER_LEVELS_LIST[1],
  3: MUL_DIV_1000_G3_SORTER_LEVELS_LIST[2]
};

export const MulDiv1000G3Sorter: React.FC<MulDiv1000G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c1000-szorzas-sorter',
  topicTitle = '4. Szorzás és osztás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-1000-ig"
      topicId={topicId}
      subtopicId="szorzas-es-osztas"
      title={topicTitle}
      subtitle="Számold ki, és válogasd szét!"
      levels={MUL_DIV_1000_G3_SORTER_LEVELS}
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

export default MulDiv1000G3Sorter;
