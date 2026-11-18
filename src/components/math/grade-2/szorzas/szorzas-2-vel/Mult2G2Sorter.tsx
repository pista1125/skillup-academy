import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BagsCard, ArrayCard, JumpsCard, SocksCard, PodCard } from './Mult2G2CardFigures';

interface Mult2G2SorterProps {
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

const MULT2_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik szorzás?',
    description: 'Hányszor van meg a 2? Tedd a jó dobozba!',
    categories: [
      { id: 'x3', name: '3 · 2', color: 'sky' },
      { id: 'x4', name: '4 · 2', color: 'emerald' },
      { id: 'x5', name: '5 · 2', color: 'amber' }
    ],
    items: [
      { id: 'm2s1', text: '', categoryId: 'x3', figure: <BagsCard groups={3} small /> },
      { id: 'm2s2', text: '2 + 2 + 2', categoryId: 'x3' },
      { id: 'm2s3', text: '', categoryId: 'x3', figure: <SocksCard pairs={3} small /> },
      { id: 'm2s4', text: '', categoryId: 'x4', figure: <BagsCard groups={4} small /> },
      { id: 'm2s5', text: '2 + 2 + 2 + 2', categoryId: 'x4' },
      { id: 'm2s6', text: '', categoryId: 'x4', figure: <JumpsCard jumps={4} small /> },
      { id: 'm2s7', text: '', categoryId: 'x5', figure: <BagsCard groups={5} small /> },
      { id: 'm2s8', text: '2 + 2 + 2 + 2 + 2', categoryId: 'x5' },
      { id: 'm2s9', text: '', categoryId: 'x5', figure: <ArrayCard rows={2} cols={5} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a szorzat?',
    description: 'Számold ki! Kevesebb, mint 10, pont 10, vagy több, mint 10?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 10', color: 'blue' },
      { id: 'eq', name: 'Pont 10', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 10', color: 'rose' }
    ],
    items: [
      { id: 'm2s10', text: '2 · 2', categoryId: 'lt' },
      { id: 'm2s11', text: '', categoryId: 'lt', figure: <ArrayCard rows={2} cols={4} small /> },
      { id: 'm2s12', text: '', categoryId: 'lt', figure: <BagsCard groups={3} small /> },
      { id: 'm2s13', text: '5 · 2', categoryId: 'eq' },
      { id: 'm2s14', text: '2 · 5', categoryId: 'eq' },
      { id: 'm2s15', text: '', categoryId: 'eq', figure: <JumpsCard jumps={5} small /> },
      { id: 'm2s16', text: '8 · 2', categoryId: 'gt' },
      { id: 'm2s17', text: '', categoryId: 'gt', figure: <ArrayCard rows={2} cols={7} small /> },
      { id: 'm2s18', text: '9 · 2', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a hiányzó szám?',
    description: 'Keresd meg, mi hiányzik a □ vagy a ? helyéről!',
    categories: [
      { id: 'h3', name: 'Hiányzó szám: 3', color: 'sky' },
      { id: 'h6', name: 'Hiányzó szám: 6', color: 'purple' },
      { id: 'h8', name: 'Hiányzó szám: 8', color: 'amber' }
    ],
    items: [
      { id: 'm2s19', text: '□ · 2 = 6', categoryId: 'h3' },
      { id: 'm2s20', text: '', categoryId: 'h3', figure: <JumpsCard jumps={3} small endLabel="6" /> },
      { id: 'm2s21', text: '', categoryId: 'h3', figure: <PodCard product={6} small /> },
      { id: 'm2s22', text: '6 + 6 = □ · 2', categoryId: 'h6' },
      { id: 'm2s23', text: '', categoryId: 'h6', figure: <JumpsCard jumps={6} small endLabel="12" /> },
      { id: 'm2s24', text: '', categoryId: 'h6', figure: <PodCard product={12} small /> },
      { id: 'm2s25', text: '8 · 2 = 2 · □', categoryId: 'h8' },
      { id: 'm2s26', text: '', categoryId: 'h8', figure: <JumpsCard jumps={8} small endLabel="16" /> },
      { id: 'm2s27', text: '', categoryId: 'h8', figure: <PodCard product={16} small /> }
    ]
  }
];

export const MULT2_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULT2_G2_SORTER_LEVELS_LIST[0],
  2: MULT2_G2_SORTER_LEVELS_LIST[1],
  3: MULT2_G2_SORTER_LEVELS_LIST[2]
};

export const Mult2G2Sorter: React.FC<Mult2G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-2-sorter',
  topicTitle = '1. Szorzás 2-vel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-2-vel"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat, a képeket és a hiányzó számokat!"
      levels={MULT2_G2_SORTER_LEVELS}
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

export default Mult2G2Sorter;
