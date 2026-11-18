import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { DotsCard, CalendarCard, JumpsToCard } from './Div7G2CardFigures';

interface Div7G2SorterProps {
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

const DIV7_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a hányados?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'q3', name: 'Eredmény: 3', color: 'sky' },
      { id: 'q5', name: 'Eredmény: 5', color: 'emerald' },
      { id: 'q8', name: 'Eredmény: 8', color: 'amber' }
    ],
    items: [
      { id: 'd7s1', text: '21 : 7', categoryId: 'q3' },
      { id: 'd7s2', text: '', categoryId: 'q3', figure: <DotsCard n={21} small /> },
      { id: 'd7s3', text: '12 : 4', categoryId: 'q3' },
      { id: 'd7s4', text: '35 : 7', categoryId: 'q5' },
      { id: 'd7s5', text: '', categoryId: 'q5', figure: <CalendarCard n={35} small /> },
      { id: 'd7s6', text: '30 : 6', categoryId: 'q5' },
      { id: 'd7s7', text: '56 : 7', categoryId: 'q8' },
      { id: 'd7s8', text: '', categoryId: 'q8', figure: <JumpsToCard target={56} small /> },
      { id: 'd7s9', text: '', categoryId: 'q8', figure: <DotsCard n={56} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi marad?',
    description: 'Ossz 7-tel! Mennyi a maradék?',
    categories: [
      { id: 'r0', name: 'Maradt 0', color: 'purple' },
      { id: 'r1', name: 'Maradt 1', color: 'sky' },
      { id: 'r3', name: 'Maradt 3', color: 'rose' }
    ],
    items: [
      { id: 'd7s10', text: '42 : 7', categoryId: 'r0' },
      { id: 'd7s11', text: '63 : 7', categoryId: 'r0' },
      { id: 'd7s12', text: '', categoryId: 'r0', figure: <DotsCard n={28} small /> },
      { id: 'd7s13', text: '15 : 7', categoryId: 'r1' },
      { id: 'd7s14', text: '', categoryId: 'r1', figure: <CalendarCard n={50} small /> },
      { id: 'd7s15', text: '', categoryId: 'r1', figure: <DotsCard n={22} small /> },
      { id: 'd7s16', text: '10 : 7', categoryId: 'r3' },
      { id: 'd7s17', text: '45 : 7', categoryId: 'r3' },
      { id: 'd7s18', text: '', categoryId: 'r3', figure: <DotsCard n={31} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: 5-nél kevesebb vagy több?',
    description: 'Számold ki! Az eredmény kevesebb, mint 5, pont 5, vagy több?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 5', color: 'sky' },
      { id: 'eq', name: 'Pont 5', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 5', color: 'amber' }
    ],
    items: [
      { id: 'd7s19', text: '28 : 7', categoryId: 'lt' },
      { id: 'd7s20', text: '', categoryId: 'lt', figure: <CalendarCard n={21} small /> },
      { id: 'd7s21', text: 'a 14 hetede', categoryId: 'lt' },
      { id: 'd7s22', text: '35 : 7', categoryId: 'eq' },
      { id: 'd7s23', text: '', categoryId: 'eq', figure: <DotsCard n={35} small /> },
      { id: 'd7s24', text: '30 : 6', categoryId: 'eq' },
      { id: 'd7s25', text: '49 : 7', categoryId: 'gt' },
      { id: 'd7s26', text: '', categoryId: 'gt', figure: <JumpsToCard target={63} small /> },
      { id: 'd7s27', text: '', categoryId: 'gt', figure: <CalendarCard n={42} small /> }
    ]
  }
];

export const DIV7_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIV7_G2_SORTER_LEVELS_LIST[0],
  2: DIV7_G2_SORTER_LEVELS_LIST[1],
  3: DIV7_G2_SORTER_LEVELS_LIST[2]
};

export const Div7G2Sorter: React.FC<Div7G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-7-sorter',
  topicTitle = '6. Osztás 7-tel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-7-tel"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat eredmény és maradék szerint!"
      levels={DIV7_G2_SORTER_LEVELS}
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

export default Div7G2Sorter;
