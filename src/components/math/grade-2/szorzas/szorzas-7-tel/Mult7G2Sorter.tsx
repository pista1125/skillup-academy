import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { WeeksCard, ArrayCard, JumpsCard } from './Mult7G2CardFigures';

interface Mult7G2SorterProps {
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

const MULT7_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a szorzat?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'p14', name: 'Szorzat: 14', color: 'sky' },
      { id: 'p35', name: 'Szorzat: 35', color: 'emerald' },
      { id: 'p56', name: 'Szorzat: 56', color: 'amber' }
    ],
    items: [
      { id: 'm7s1', text: '2 · 7', categoryId: 'p14' },
      { id: 'm7s2', text: '', categoryId: 'p14', figure: <WeeksCard n={2} small /> },
      { id: 'm7s3', text: '7 · 2', categoryId: 'p14' },
      { id: 'm7s4', text: '5 · 7', categoryId: 'p35' },
      { id: 'm7s5', text: '', categoryId: 'p35', figure: <ArrayCard rows={5} small /> },
      { id: 'm7s6', text: '7 · 5', categoryId: 'p35' },
      { id: 'm7s7', text: '8 · 7', categoryId: 'p56' },
      { id: 'm7s8', text: '', categoryId: 'p56', figure: <JumpsCard jumps={8} small /> },
      { id: 'm7s9', text: '', categoryId: 'p56', figure: <ArrayCard rows={8} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Benne van a 7-es táblában?',
    description: 'Benne van a szám a 7-es szorzótáblában? Páros vagy páratlan?',
    categories: [
      { id: 'even', name: '7-es tábla, páros', color: 'purple' },
      { id: 'odd', name: '7-es tábla, páratlan', color: 'sky' },
      { id: 'none', name: 'Nincs a 7-es táblában', color: 'rose' }
    ],
    items: [
      { id: 'm7s10', text: '14', categoryId: 'even' },
      { id: 'm7s11', text: '56', categoryId: 'even' },
      { id: 'm7s12', text: '', categoryId: 'even', figure: <ArrayCard rows={6} small /> },
      { id: 'm7s13', text: '21', categoryId: 'odd' },
      { id: 'm7s14', text: '', categoryId: 'odd', figure: <JumpsCard jumps={7} small /> },
      { id: 'm7s15', text: '', categoryId: 'odd', figure: <ArrayCard rows={9} small /> },
      { id: 'm7s16', text: '27', categoryId: 'none' },
      { id: 'm7s17', text: '54', categoryId: 'none' },
      { id: 'm7s18', text: '', categoryId: 'none', figure: <WeeksCard n={2} extra={3} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: 35-nél kevesebb vagy több?',
    description: 'Számold ki! Kevesebb, mint 35, pont 35, vagy több?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 35', color: 'sky' },
      { id: 'eq', name: 'Pont 35', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 35', color: 'amber' }
    ],
    items: [
      { id: 'm7s19', text: '4 · 7', categoryId: 'lt' },
      { id: 'm7s20', text: '', categoryId: 'lt', figure: <WeeksCard n={3} small /> },
      { id: 'm7s21', text: '2 · 7 + 9', categoryId: 'lt' },
      { id: 'm7s22', text: '5 · 7', categoryId: 'eq' },
      { id: 'm7s23', text: '', categoryId: 'eq', figure: <ArrayCard rows={5} small /> },
      { id: 'm7s24', text: '4 · 7 + 7', categoryId: 'eq' },
      { id: 'm7s25', text: '6 · 7', categoryId: 'gt' },
      { id: 'm7s26', text: '', categoryId: 'gt', figure: <JumpsCard jumps={8} small /> },
      { id: 'm7s27', text: '', categoryId: 'gt', figure: <WeeksCard n={6} small /> }
    ]
  }
];

export const MULT7_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULT7_G2_SORTER_LEVELS_LIST[0],
  2: MULT7_G2_SORTER_LEVELS_LIST[1],
  3: MULT7_G2_SORTER_LEVELS_LIST[2]
};

export const Mult7G2Sorter: React.FC<Mult7G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-7-sorter',
  topicTitle = '6. Szorzás 7-tel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-7-tel"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat szorzat, szorzótábla és nagyság szerint!"
      levels={MULT7_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToQuiz={onSwitchToQuiz}
      onComplete={onComplete}
    />
  );
};

export default Mult7G2Sorter;
