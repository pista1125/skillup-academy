import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupsCard, JumpsCard, TriplesCard80 } from './Mult9G2CardFigures';

interface Mult9G2SorterProps {
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

const MULT9_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a szorzat?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'p18', name: 'Szorzat: 18', color: 'sky' },
      { id: 'p36', name: 'Szorzat: 36', color: 'emerald' },
      { id: 'p54', name: 'Szorzat: 54', color: 'amber' }
    ],
    items: [
      { id: 'm9s1', text: '2 · 9', categoryId: 'p18' },
      { id: 'm9s2', text: '', categoryId: 'p18', figure: <GroupsCard n={2} small /> },
      { id: 'm9s3', text: '', categoryId: 'p18', figure: <TriplesCard80 n={6} /> },
      { id: 'm9s4', text: '4 · 9', categoryId: 'p36' },
      { id: 'm9s5', text: '6 · 6', categoryId: 'p36' },
      { id: 'm9s6', text: '', categoryId: 'p36', figure: <JumpsCard jumps={4} small /> },
      { id: 'm9s7', text: '6 · 9', categoryId: 'p54' },
      { id: 'm9s8', text: '9 · 6', categoryId: 'p54' },
      { id: 'm9s9', text: '', categoryId: 'p54', figure: <GroupsCard n={6} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik táblában van?',
    description: 'Számold meg a hármasokat, vagy nézd a számot! Benne van a 9-es táblában?',
    categories: [
      { id: 't9', name: 'A 9-es táblában van', color: 'amber' },
      { id: 't3', name: 'A 3-as táblában van, a 9-esben nincs', color: 'emerald' },
      { id: 'none', name: 'Sem a 3-as, sem a 9-es táblában', color: 'rose' }
    ],
    items: [
      { id: 'm9s10', text: '45', categoryId: 't9' },
      { id: 'm9s11', text: '72', categoryId: 't9' },
      { id: 'm9s12', text: '', categoryId: 't9', figure: <TriplesCard80 n={9} /> },
      { id: 'm9s13', text: '24', categoryId: 't3' },
      { id: 'm9s14', text: '', categoryId: 't3', figure: <TriplesCard80 n={4} /> },
      { id: 'm9s15', text: '', categoryId: 't3', figure: <TriplesCard80 n={7} /> },
      { id: 'm9s16', text: '20', categoryId: 'none' },
      { id: 'm9s17', text: '35', categoryId: 'none' },
      { id: 'm9s18', text: '', categoryId: 'none', figure: <TriplesCard80 n={3} extra /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: 45-nél kevesebb vagy több?',
    description: 'Számold ki! Kevesebb, mint 45, pont 45, vagy több?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 45', color: 'sky' },
      { id: 'eq', name: 'Pont 45', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 45', color: 'amber' }
    ],
    items: [
      { id: 'm9s19', text: '4 · 9', categoryId: 'lt' },
      { id: 'm9s20', text: '9 + 9 + 9', categoryId: 'lt' },
      { id: 'm9s21', text: '', categoryId: 'lt', figure: <GroupsCard n={3} small /> },
      { id: 'm9s22', text: '5 · 9', categoryId: 'eq' },
      { id: 'm9s23', text: '50 − 5', categoryId: 'eq' },
      { id: 'm9s24', text: '', categoryId: 'eq', figure: <JumpsCard jumps={5} small /> },
      { id: 'm9s25', text: '6 · 9', categoryId: 'gt' },
      { id: 'm9s26', text: '', categoryId: 'gt', figure: <JumpsCard jumps={8} small /> },
      { id: 'm9s27', text: '', categoryId: 'gt', figure: <GroupsCard n={7} small /> }
    ]
  }
];

export const MULT9_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULT9_G2_SORTER_LEVELS_LIST[0],
  2: MULT9_G2_SORTER_LEVELS_LIST[1],
  3: MULT9_G2_SORTER_LEVELS_LIST[2]
};

export const Mult9G2Sorter: React.FC<Mult9G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-9-sorter',
  topicTitle = '8. Szorzás 9-cel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-9-cel"
      title={topicTitle}
      subtitle="Válogasd szét a szorzásokat szorzat, szorzótábla és nagyság szerint!"
      levels={MULT9_G2_SORTER_LEVELS}
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

export default Mult9G2Sorter;
