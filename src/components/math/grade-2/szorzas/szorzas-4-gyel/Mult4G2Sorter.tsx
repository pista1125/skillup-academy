import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, ColumnsCard, JumpsCard, PairsCard80 } from './Mult4G2CardFigures';

interface Mult4G2SorterProps {
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

const MULT4_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a szorzat?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'p12', name: 'Szorzat: 12', color: 'sky' },
      { id: 'p20', name: 'Szorzat: 20', color: 'emerald' },
      { id: 'p28', name: 'Szorzat: 28', color: 'amber' }
    ],
    items: [
      { id: 'm4s1', text: '3 · 4', categoryId: 'p12' },
      { id: 'm4s2', text: '', categoryId: 'p12', figure: <GroupsCard n={3} small /> },
      { id: 'm4s3', text: '6 · 2', categoryId: 'p12' },
      { id: 'm4s4', text: '5 · 4', categoryId: 'p20' },
      { id: 'm4s5', text: '', categoryId: 'p20', figure: <ColumnsCard n={5} small /> },
      { id: 'm4s6', text: '10 · 2', categoryId: 'p20' },
      { id: 'm4s7', text: '7 · 4', categoryId: 'p28' },
      { id: 'm4s8', text: '', categoryId: 'p28', figure: <JumpsCard jumps={7} small /> },
      { id: 'm4s9', text: '', categoryId: 'p28', figure: <GroupsCard n={7} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik táblában van?',
    description: 'Számold meg a korongokat, vagy nézd a számot! Benne van a 4-es táblában?',
    categories: [
      { id: 't4', name: 'A 4-es táblában van', color: 'purple' },
      { id: 't2', name: 'Csak a 2-es táblában van', color: 'sky' },
      { id: 'none', name: 'Sem a 2-es, sem a 4-es táblában', color: 'rose' }
    ],
    items: [
      { id: 'm4s10', text: '16', categoryId: 't4' },
      { id: 'm4s11', text: '32', categoryId: 't4' },
      { id: 'm4s12', text: '', categoryId: 't4', figure: <PairsCard80 pairs={6} /> },
      { id: 'm4s13', text: '14', categoryId: 't2' },
      { id: 'm4s14', text: '', categoryId: 't2', figure: <PairsCard80 pairs={5} /> },
      { id: 'm4s15', text: '', categoryId: 't2', figure: <PairsCard80 pairs={9} /> },
      { id: 'm4s16', text: '15', categoryId: 'none' },
      { id: 'm4s17', text: '21', categoryId: 'none' },
      { id: 'm4s18', text: '', categoryId: 'none', figure: <PairsCard80 pairs={4} extra /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: 20-nál kevesebb vagy több?',
    description: 'Számold ki! Kevesebb, mint 20, pont 20, vagy több?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 20', color: 'sky' },
      { id: 'eq', name: 'Pont 20', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 20', color: 'amber' }
    ],
    items: [
      { id: 'm4s19', text: '4 · 4', categoryId: 'lt' },
      { id: 'm4s20', text: '', categoryId: 'lt', figure: <GroupsCard n={3} small /> },
      { id: 'm4s21', text: '2 · 4 + 9', categoryId: 'lt' },
      { id: 'm4s22', text: '5 · 4', categoryId: 'eq' },
      { id: 'm4s23', text: '', categoryId: 'eq', figure: <ColumnsCard n={5} small /> },
      { id: 'm4s24', text: '10 · 2', categoryId: 'eq' },
      { id: 'm4s25', text: '6 · 4', categoryId: 'gt' },
      { id: 'm4s26', text: '', categoryId: 'gt', figure: <JumpsCard jumps={8} small /> },
      { id: 'm4s27', text: '', categoryId: 'gt', figure: <GroupsCard n={6} small /> }
    ]
  }
];

export const MULT4_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULT4_G2_SORTER_LEVELS_LIST[0],
  2: MULT4_G2_SORTER_LEVELS_LIST[1],
  3: MULT4_G2_SORTER_LEVELS_LIST[2]
};

export const Mult4G2Sorter: React.FC<Mult4G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-4-sorter',
  topicTitle = '3. Szorzás 4-gyel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-4-gyel"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat szorzat, szorzótábla és nagyság szerint!"
      levels={MULT4_G2_SORTER_LEVELS}
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

export default Mult4G2Sorter;
