import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CrossedDiscsCard, TenFrameSubCard, WheelStepCard } from './Sub10G2CardFigures';

interface Sub10G2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
  [key: string]: unknown;
}

const SUB10_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a különbség?',
    description: 'Számold ki, mennyi marad! Tedd a megfelelő dobozba!',
    categories: [
      { id: 'd3', name: 'Eredménye 3', color: 'sky' },
      { id: 'd5', name: 'Eredménye 5', color: 'emerald' },
      { id: 'd7', name: 'Eredménye 7', color: 'amber' }
    ],
    items: [
      { id: 'sub10s1', text: '', categoryId: 'd3', figure: <CrossedDiscsCard total={7} taken={4} small /> },
      { id: 'sub10s2', text: '9 − 6', categoryId: 'd3' },
      { id: 'sub10s3', text: '', categoryId: 'd3', figure: <TenFrameSubCard total={8} taken={5} small /> },
      { id: 'sub10s4', text: '', categoryId: 'd5', figure: <TenFrameSubCard total={9} taken={4} small /> },
      { id: 'sub10s5', text: '10 − 5', categoryId: 'd5' },
      { id: 'sub10s6', text: '7 − 2', categoryId: 'd5' },
      { id: 'sub10s7', text: '', categoryId: 'd7', figure: <CrossedDiscsCard total={10} taken={3} small /> },
      { id: 'sub10s8', text: '', categoryId: 'd7', figure: <WheelStepCard center={9} sub={2} small /> },
      { id: 'sub10s9', text: '7 − 0', categoryId: 'd7' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Nulla, páros vagy páratlan?',
    description: 'Végezd el a kivonást, majd döntsd el: 0, más páros, vagy páratlan az eredmény?',
    categories: [
      { id: 'zero', name: 'Nulla (0)', color: 'purple' },
      { id: 'even', name: 'Más páros (2, 4, 6, 8, 10)', color: 'sky' },
      { id: 'odd', name: 'Páratlan (1, 3, 5, 7, 9)', color: 'rose' }
    ],
    items: [
      { id: 'sub10s10', text: '6 − 6', categoryId: 'zero' },
      { id: 'sub10s11', text: '', categoryId: 'zero', figure: <CrossedDiscsCard total={4} taken={4} small /> },
      { id: 'sub10s12', text: '9 − 9', categoryId: 'zero' },
      { id: 'sub10s13', text: '', categoryId: 'even', figure: <TenFrameSubCard total={10} taken={4} small /> },
      { id: 'sub10s14', text: '8 − 6', categoryId: 'even' },
      { id: 'sub10s15', text: '', categoryId: 'even', figure: <WheelStepCard center={10} sub={2} small /> },
      { id: 'sub10s16', text: '', categoryId: 'odd', figure: <CrossedDiscsCard total={7} taken={2} small /> },
      { id: 'sub10s17', text: '10 − 7', categoryId: 'odd' },
      { id: 'sub10s18', text: '', categoryId: 'odd', figure: <WheelStepCard center={9} sub={0} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Összehasonlítás 4-gyel',
    description: 'Számold ki a különbséget, és hasonlítsd össze a 4-gyel!',
    categories: [
      { id: 'lt4', name: 'Kisebb, mint 4', color: 'sky' },
      { id: 'eq4', name: 'Pontosan 4', color: 'emerald' },
      { id: 'gt4', name: 'Nagyobb, mint 4', color: 'rose' }
    ],
    items: [
      { id: 'sub10s19', text: '', categoryId: 'lt4', figure: <CrossedDiscsCard total={8} taken={5} small /> },
      { id: 'sub10s20', text: '10 − 8', categoryId: 'lt4' },
      { id: 'sub10s21', text: '', categoryId: 'lt4', figure: <WheelStepCard center={6} sub={5} small /> },
      { id: 'sub10s22', text: '', categoryId: 'eq4', figure: <TenFrameSubCard total={10} taken={6} small /> },
      { id: 'sub10s23', text: '7 − 3', categoryId: 'eq4' },
      { id: 'sub10s24', text: '4 − 0', categoryId: 'eq4' },
      { id: 'sub10s25', text: '', categoryId: 'gt4', figure: <CrossedDiscsCard total={9} taken={3} small /> },
      { id: 'sub10s26', text: '10 − 2', categoryId: 'gt4' },
      { id: 'sub10s27', text: '', categoryId: 'gt4', figure: <WheelStepCard center={10} sub={5} small /> }
    ]
  }
];

export const SUB10_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SUB10_G2_SORTER_LEVELS_LIST[0],
  2: SUB10_G2_SORTER_LEVELS_LIST[1],
  3: SUB10_G2_SORTER_LEVELS_LIST[2]
};

export const Sub10G2Sorter: React.FC<Sub10G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-c20-kivonas10-sorter',
  topicTitle = '3. Kivonás 10-es számkör – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : level?.level ?? 1);
  return (
    <SorterTemplate
      grade={2}
      chapterId="szamolas-20-ig"
      topicId={topicId}
      subtopicId="kivonas-10-es-szamkor"
      title={topicTitle}
      subtitle="Válogasd szét a kivonásokat az eredmény, a páros-páratlan és a nagyság szerint!"
      levels={SUB10_G2_SORTER_LEVELS}
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

export default Sub10G2Sorter;
