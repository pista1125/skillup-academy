import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, RowsCard, JumpsCard, FoursCard80 } from './Mult8G2CardFigures';

interface Mult8G2SorterProps {
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

const MULT8_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a szorzat?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'p24', name: 'Szorzat: 24', color: 'sky' },
      { id: 'p40', name: 'Szorzat: 40', color: 'emerald' },
      { id: 'p64', name: 'Szorzat: 64', color: 'amber' }
    ],
    items: [
      { id: 'm8s1', text: '3 · 8', categoryId: 'p24' },
      { id: 'm8s2', text: '', categoryId: 'p24', figure: <GroupsCard n={3} small /> },
      { id: 'm8s3', text: '6 · 4', categoryId: 'p24' },
      { id: 'm8s4', text: '5 · 8', categoryId: 'p40' },
      { id: 'm8s5', text: '', categoryId: 'p40', figure: <RowsCard n={5} small /> },
      { id: 'm8s6', text: '10 · 4', categoryId: 'p40' },
      { id: 'm8s7', text: '8 · 8', categoryId: 'p64' },
      { id: 'm8s8', text: '', categoryId: 'p64', figure: <JumpsCard jumps={8} small /> },
      { id: 'm8s9', text: '', categoryId: 'p64', figure: <GroupsCard n={8} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik táblában van?',
    description: 'Számold meg a korongokat, vagy nézd a számot! Benne van a 8-as táblában?',
    categories: [
      { id: 't8', name: 'A 8-as táblában van', color: 'purple' },
      { id: 't4', name: 'A 4-es táblában van, a 8-asban nincs', color: 'sky' },
      { id: 'none', name: 'Sem a 4-es, sem a 8-as táblában', color: 'rose' }
    ],
    items: [
      { id: 'm8s10', text: '16', categoryId: 't8' },
      { id: 'm8s11', text: '72', categoryId: 't8' },
      { id: 'm8s12', text: '', categoryId: 't8', figure: <FoursCard80 groups={6} /> },
      { id: 'm8s13', text: '12', categoryId: 't4' },
      { id: 'm8s14', text: '', categoryId: 't4', figure: <FoursCard80 groups={5} /> },
      { id: 'm8s15', text: '', categoryId: 't4', figure: <FoursCard80 groups={7} /> },
      { id: 'm8s16', text: '18', categoryId: 'none' },
      { id: 'm8s17', text: '50', categoryId: 'none' },
      { id: 'm8s18', text: '', categoryId: 'none', figure: <FoursCard80 groups={4} extra /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: 40-nél kevesebb vagy több?',
    description: 'Számold ki! Kevesebb, mint 40, pont 40, vagy több?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 40', color: 'sky' },
      { id: 'eq', name: 'Pont 40', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 40', color: 'amber' }
    ],
    items: [
      { id: 'm8s19', text: '4 · 8', categoryId: 'lt' },
      { id: 'm8s20', text: '', categoryId: 'lt', figure: <GroupsCard n={3} small /> },
      { id: 'm8s21', text: '2 · 8 + 7', categoryId: 'lt' },
      { id: 'm8s22', text: '8 · 4 + 8', categoryId: 'eq' },
      { id: 'm8s23', text: '', categoryId: 'eq', figure: <RowsCard n={5} small /> },
      { id: 'm8s24', text: '10 · 4', categoryId: 'eq' },
      { id: 'm8s25', text: '6 · 8', categoryId: 'gt' },
      { id: 'm8s26', text: '', categoryId: 'gt', figure: <JumpsCard jumps={9} small /> },
      { id: 'm8s27', text: '', categoryId: 'gt', figure: <GroupsCard n={7} small /> }
    ]
  }
];

export const MULT8_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULT8_G2_SORTER_LEVELS_LIST[0],
  2: MULT8_G2_SORTER_LEVELS_LIST[1],
  3: MULT8_G2_SORTER_LEVELS_LIST[2]
};

export const Mult8G2Sorter: React.FC<Mult8G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-8-sorter',
  topicTitle = '7. Szorzás 8-cal – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-8-cal"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat szorzat, szorzótábla és nagyság szerint!"
      levels={MULT8_G2_SORTER_LEVELS}
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

export default Mult8G2Sorter;
