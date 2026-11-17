import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortBlocks, SortChain } from './MulOneDigitG3CardFigures';

interface MulOneDigitG3SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mekkora a szorzat?',
    description: 'Számold ki fejben, és tedd a jó dobozba!',
    categories: [
      { id: 'k500', name: 'Kevesebb, mint 500', color: 'sky' },
      { id: 'k800', name: '500 és 800 között', color: 'amber' },
      { id: 't800', name: 'Több, mint 800', color: 'rose' }
    ],
    items: [
      { id: 'mul1s1', text: '', figure: <SortBlocks n={120} m={3} />, categoryId: 'k500' },
      { id: 'mul1s2', text: '', figure: <SortBlocks n={210} m={2} />, categoryId: 'k500' },
      { id: 'mul1s3', text: '110 · 4', categoryId: 'k500' },
      { id: 'mul1s4', text: '', figure: <SortBlocks n={230} m={3} />, categoryId: 'k800' },
      { id: 'mul1s5', text: '', figure: <SortBlocks n={150} m={4} />, categoryId: 'k800' },
      { id: 'mul1s6', text: '320 · 2', categoryId: 'k800' },
      { id: 'mul1s7', text: '', figure: <SortBlocks n={310} m={3} />, categoryId: 't800' },
      { id: 'mul1s8', text: '', figure: <SortBlocks n={220} m={4} />, categoryId: 't800' },
      { id: 'mul1s9', text: '450 · 2', categoryId: 't800' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Ugyanannyi!',
    description: 'Melyik szorzat mennyi? Tedd a jó dobozba!',
    categories: [
      { id: 's600', name: '600', color: 'emerald' },
      { id: 's800', name: '800', color: 'amber' },
      { id: 's900', name: '900', color: 'purple' }
    ],
    items: [
      { id: 'mul1s10', text: '', figure: <SortBlocks n={200} m={3} />, categoryId: 's600' },
      { id: 'mul1s11', text: '', figure: <SortBlocks n={150} m={4} />, categoryId: 's600' },
      { id: 'mul1s12', text: '120 · 5', categoryId: 's600' },
      { id: 'mul1s13', text: '', figure: <SortBlocks n={400} m={2} />, categoryId: 's800' },
      { id: 'mul1s14', text: '', figure: <SortBlocks n={200} m={4} />, categoryId: 's800' },
      { id: 'mul1s15', text: '160 · 5', categoryId: 's800' },
      { id: 'mul1s16', text: '', figure: <SortBlocks n={300} m={3} />, categoryId: 's900' },
      { id: 'mul1s17', text: '', figure: <SortBlocks n={150} m={6} />, categoryId: 's900' },
      { id: 'mul1s18', text: '180 · 5', categoryId: 's900' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyivel szoroztunk?',
    description: 'Az első számból lett a második. Mennyi a szorzó?',
    categories: [
      { id: 'x2', name: '· 2', color: 'sky' },
      { id: 'x3', name: '· 3', color: 'emerald' },
      { id: 'x4', name: '· 4', color: 'rose' }
    ],
    items: [
      { id: 'mul1s19', text: '', figure: <SortChain a={230} b={460} />, categoryId: 'x2' },
      { id: 'mul1s20', text: '', figure: <SortChain a={340} b={680} />, categoryId: 'x2' },
      { id: 'mul1s21', text: '450 → 900', categoryId: 'x2' },
      { id: 'mul1s22', text: '', figure: <SortChain a={120} b={360} />, categoryId: 'x3' },
      { id: 'mul1s23', text: '', figure: <SortChain a={210} b={630} />, categoryId: 'x3' },
      { id: 'mul1s24', text: '310 → 930', categoryId: 'x3' },
      { id: 'mul1s25', text: '', figure: <SortChain a={140} b={560} />, categoryId: 'x4' },
      { id: 'mul1s26', text: '', figure: <SortChain a={220} b={880} />, categoryId: 'x4' },
      { id: 'mul1s27', text: '160 → 640', categoryId: 'x4' }
    ]
  }
];

export const MUL_ONE_DIGIT_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const MulOneDigitG3Sorter: React.FC<MulOneDigitG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wmul-egyjegyu-sorter',
  topicTitle = '1. Szorzás egyjegyű számmal – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-szorzas"
      topicId={topicId}
      subtopicId="szorzas-egyjegyu-szammal"
      title={topicTitle}
      subtitle="Számold ki fejben, és válogasd szét!"
      levels={MUL_ONE_DIGIT_G3_SORTER_LEVELS}
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

export default MulOneDigitG3Sorter;
