import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BoxesCard, DiceCard, JumpsCard, ProductCard } from './Mult6G2CardFigures';

interface Mult6G2SorterProps {
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
}

const MULT6_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik szorzás?',
    description: 'Hányszor van meg a 6? Tedd a jó dobozba!',
    categories: [
      { id: 'x3', name: '3 · 6', color: 'sky' },
      { id: 'x4', name: '4 · 6', color: 'emerald' },
      { id: 'x5', name: '5 · 6', color: 'amber' }
    ],
    items: [
      { id: 'm6s1', text: '', categoryId: 'x3', figure: <BoxesCard groups={3} small /> },
      { id: 'm6s2', text: '6 + 6 + 6', categoryId: 'x3' },
      { id: 'm6s3', text: '', categoryId: 'x3', figure: <DiceCard n={3} small /> },
      { id: 'm6s4', text: '', categoryId: 'x4', figure: <BoxesCard groups={4} small /> },
      { id: 'm6s5', text: '6 + 6 + 6 + 6', categoryId: 'x4' },
      { id: 'm6s6', text: '', categoryId: 'x4', figure: <JumpsCard jumps={4} small /> },
      { id: 'm6s7', text: '', categoryId: 'x5', figure: <DiceCard n={5} small /> },
      { id: 'm6s8', text: '6 + 6 + 6 + 6 + 6', categoryId: 'x5' },
      { id: 'm6s9', text: '', categoryId: 'x5', figure: <JumpsCard jumps={5} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a szorzat?',
    description: 'Számold ki! Kevesebb, mint 30, pont 30, vagy több, mint 30?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 30', color: 'blue' },
      { id: 'eq', name: 'Pont 30', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 30', color: 'rose' }
    ],
    items: [
      { id: 'm6s10', text: '2 · 6', categoryId: 'lt' },
      { id: 'm6s11', text: '', categoryId: 'lt', figure: <BoxesCard groups={4} small /> },
      { id: 'm6s12', text: '', categoryId: 'lt', figure: <DiceCard n={3} small /> },
      { id: 'm6s13', text: '5 · 6', categoryId: 'eq' },
      { id: 'm6s14', text: '6 · 5', categoryId: 'eq' },
      { id: 'm6s15', text: '', categoryId: 'eq', figure: <JumpsCard jumps={5} small /> },
      { id: 'm6s16', text: '8 · 6', categoryId: 'gt' },
      { id: 'm6s17', text: '', categoryId: 'gt', figure: <BoxesCard groups={7} small /> },
      { id: 'm6s18', text: '6 · 6', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a hiányzó szám?',
    description: 'Keresd meg, mi hiányzik a □ vagy a ? helyéről!',
    categories: [
      { id: 'h4', name: 'Hiányzó szám: 4', color: 'sky' },
      { id: 'h7', name: 'Hiányzó szám: 7', color: 'purple' },
      { id: 'h9', name: 'Hiányzó szám: 9', color: 'amber' }
    ],
    items: [
      { id: 'm6s19', text: '4 · 3 + 4 · 3 = □ · 6', categoryId: 'h4' },
      { id: 'm6s20', text: '', categoryId: 'h4', figure: <JumpsCard jumps={4} small endLabel="24" /> },
      { id: 'm6s21', text: '', categoryId: 'h4', figure: <ProductCard product={24} small /> },
      { id: 'm6s22', text: '7 · 6 = 6 · □', categoryId: 'h7' },
      { id: 'm6s23', text: '', categoryId: 'h7', figure: <JumpsCard jumps={7} small endLabel="42" /> },
      { id: 'm6s24', text: '', categoryId: 'h7', figure: <ProductCard product={42} small /> },
      { id: 'm6s25', text: '□ · 6 = 54', categoryId: 'h9' },
      { id: 'm6s26', text: '', categoryId: 'h9', figure: <JumpsCard jumps={9} small endLabel="54" /> },
      { id: 'm6s27', text: '', categoryId: 'h9', figure: <ProductCard product={54} small /> }
    ]
  }
];

export const MULT6_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULT6_G2_SORTER_LEVELS_LIST[0],
  2: MULT6_G2_SORTER_LEVELS_LIST[1],
  3: MULT6_G2_SORTER_LEVELS_LIST[2]
};

export const Mult6G2Sorter: React.FC<Mult6G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-6-sorter',
  topicTitle = '5. Szorzás 6-tal – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-6-tal"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat, a képeket és a hiányzó számokat!"
      levels={MULT6_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default Mult6G2Sorter;
