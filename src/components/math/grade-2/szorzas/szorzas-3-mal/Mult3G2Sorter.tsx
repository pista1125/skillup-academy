import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CloverCard, TriCard, GroupsCard, JumpsCard, ArrowCard } from './Mult3G2CardFigures';

interface Mult3G2SorterProps {
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

const MULT3_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi?',
    description: 'Számold ki, mennyi, és tedd a jó dobozba!',
    categories: [
      { id: 'r9', name: 'Ennyi: 9', color: 'sky' },
      { id: 'r12', name: 'Ennyi: 12', color: 'emerald' },
      { id: 'r15', name: 'Ennyi: 15', color: 'amber' }
    ],
    items: [
      { id: 'm3s1', text: '', categoryId: 'r9', figure: <CloverCard n={3} small /> },
      { id: 'm3s2', text: '', categoryId: 'r9', figure: <TriCard n={3} small /> },
      { id: 'm3s3', text: '3 · 3', categoryId: 'r9' },
      { id: 'm3s4', text: '', categoryId: 'r12', figure: <GroupsCard groups={4} small /> },
      { id: 'm3s5', text: '', categoryId: 'r12', figure: <JumpsCard jumps={4} small /> },
      { id: 'm3s6', text: '4 · 3', categoryId: 'r12' },
      { id: 'm3s7', text: '', categoryId: 'r15', figure: <CloverCard n={5} small /> },
      { id: 'm3s8', text: '5 · 3', categoryId: 'r15' },
      { id: 'm3s9', text: '3 + 3 + 3 + 3 + 3', categoryId: 'r15' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kinek a többszöröse?',
    description: 'Számold ki, ha kell! Aztán döntsd el: a 2-é, a 3-é vagy mindkettőé?',
    categories: [
      { id: 'only3', name: 'Csak a 3 többszöröse', color: 'blue' },
      { id: 'both', name: 'A 2-é és a 3-é is', color: 'emerald' },
      { id: 'only2', name: 'Csak a 2 többszöröse', color: 'amber' }
    ],
    items: [
      { id: 'm3s10', text: '9', categoryId: 'only3' },
      { id: 'm3s11', text: '27', categoryId: 'only3' },
      { id: 'm3s12', text: '', categoryId: 'only3', figure: <GroupsCard groups={7} small /> },
      { id: 'm3s13', text: '24', categoryId: 'both' },
      { id: 'm3s14', text: '', categoryId: 'both', figure: <JumpsCard jumps={4} small /> },
      { id: 'm3s15', text: '', categoryId: 'both', figure: <GroupsCard groups={6} small /> },
      { id: 'm3s16', text: '14', categoryId: 'only2' },
      { id: 'm3s17', text: '26', categoryId: 'only2' },
      { id: 'm3s18', text: '', categoryId: 'only2', figure: <GroupsCard groups={5} each={2} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a □?',
    description: 'Keresd meg a hiányzó számot, és tedd a jó dobozba!',
    categories: [
      { id: 'q4', name: '□ = 4', color: 'sky' },
      { id: 'q6', name: '□ = 6', color: 'purple' },
      { id: 'q8', name: '□ = 8', color: 'rose' }
    ],
    items: [
      { id: 'm3s19', text: '□ · 3 = 12', categoryId: 'q4' },
      { id: 'm3s20', text: '', categoryId: 'q4', figure: <JumpsCard jumps={4} endLabel="12" small /> },
      { id: 'm3s21', text: '', categoryId: 'q4', figure: <ArrowCard from="?" to="12" small /> },
      { id: 'm3s22', text: '□ · 3 = 18', categoryId: 'q6' },
      { id: 'm3s23', text: '', categoryId: 'q6', figure: <JumpsCard jumps={6} endLabel="18" small /> },
      { id: 'm3s24', text: '3 + 3 + 3 + 3 + 3 + 3 = □ · 3', categoryId: 'q6' },
      { id: 'm3s25', text: '3 · □ = 24', categoryId: 'q8' },
      { id: 'm3s26', text: '', categoryId: 'q8', figure: <ArrowCard from="?" to="24" small /> },
      { id: 'm3s27', text: '30 − 6 = □ · 3', categoryId: 'q8' }
    ]
  }
];

export const MULT3_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULT3_G2_SORTER_LEVELS_LIST[0],
  2: MULT3_G2_SORTER_LEVELS_LIST[1],
  3: MULT3_G2_SORTER_LEVELS_LIST[2]
};

export const Mult3G2Sorter: React.FC<Mult3G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-szorzas-3-sorter',
  topicTitle = '2. Szorzás 3-mal – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="szorzas"
      topicId={topicId}
      subtopicId="szorzas-3-mal"
      title={topicTitle}
      subtitle="Válogasd szét eredmény, többszörös és hiányzó szám szerint!"
      levels={MULT3_G2_SORTER_LEVELS}
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

export default Mult3G2Sorter;
