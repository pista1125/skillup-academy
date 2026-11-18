import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { JumpsToCard, DotsCard } from './Div8G2CardFigures';

interface Div8G2SorterProps {
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

const DIV8_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a hányados?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'q3', name: 'Eredmény: 3', color: 'sky' },
      { id: 'q5', name: 'Eredmény: 5', color: 'emerald' },
      { id: 'q9', name: 'Eredmény: 9', color: 'amber' }
    ],
    items: [
      { id: 'd8s1', text: '24 : 8', categoryId: 'q3' },
      { id: 'd8s2', text: '', categoryId: 'q3', figure: <JumpsToCard target={24} small /> },
      { id: 'd8s3', text: '', categoryId: 'q3', figure: <DotsCard n={24} small /> },
      { id: 'd8s4', text: '40 : 8', categoryId: 'q5' },
      { id: 'd8s5', text: '15 : 3', categoryId: 'q5' },
      { id: 'd8s6', text: '', categoryId: 'q5', figure: <JumpsToCard target={40} small /> },
      { id: 'd8s7', text: '72 : 8', categoryId: 'q9' },
      { id: 'd8s8', text: '18 : 2', categoryId: 'q9' },
      { id: 'd8s9', text: '', categoryId: 'q9', figure: <JumpsToCard target={72} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi marad?',
    description: 'Nyolcas csoportokat rakunk. Mennyi marad?',
    categories: [
      { id: 'r0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'r3', name: 'Maradt 3', color: 'sky' },
      { id: 'r7', name: 'Maradt 7', color: 'rose' }
    ],
    items: [
      { id: 'd8s10', text: '64 korong', categoryId: 'r0' },
      { id: 'd8s11', text: '32 korong', categoryId: 'r0' },
      { id: 'd8s12', text: '', categoryId: 'r0', figure: <DotsCard n={40} small /> },
      { id: 'd8s13', text: '19 korong', categoryId: 'r3' },
      { id: 'd8s14', text: '', categoryId: 'r3', figure: <DotsCard n={43} small /> },
      { id: 'd8s15', text: '', categoryId: 'r3', figure: <DotsCard n={27} small /> },
      { id: 'd8s16', text: '15 korong', categoryId: 'r7' },
      { id: 'd8s17', text: '63 korong', categoryId: 'r7' },
      { id: 'd8s18', text: '', categoryId: 'r7', figure: <DotsCard n={31} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: 5-nél kevesebb vagy több?',
    description: 'Számold ki! Kevesebb, mint 5, pont 5, vagy több?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 5', color: 'sky' },
      { id: 'eq', name: 'Pont 5', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 5', color: 'amber' }
    ],
    items: [
      { id: 'd8s19', text: '32 : 8', categoryId: 'lt' },
      { id: 'd8s20', text: '', categoryId: 'lt', figure: <DotsCard n={24} small /> },
      { id: 'd8s21', text: '', categoryId: 'lt', figure: <JumpsToCard target={16} small /> },
      { id: 'd8s22', text: '40 : 8', categoryId: 'eq' },
      { id: 'd8s23', text: '', categoryId: 'eq', figure: <DotsCard n={40} small /> },
      { id: 'd8s24', text: '35 : 7', categoryId: 'eq' },
      { id: 'd8s25', text: '56 : 8', categoryId: 'gt' },
      { id: 'd8s26', text: 'a 64 nyolcada', categoryId: 'gt' },
      { id: 'd8s27', text: '', categoryId: 'gt', figure: <JumpsToCard target={72} small /> }
    ]
  }
];

export const DIV8_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIV8_G2_SORTER_LEVELS_LIST[0],
  2: DIV8_G2_SORTER_LEVELS_LIST[1],
  3: DIV8_G2_SORTER_LEVELS_LIST[2]
};

export const Div8G2Sorter: React.FC<Div8G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-8-sorter',
  topicTitle = '7. Osztás 8-cal – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-8-cal"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat hányados és maradék szerint!"
      levels={DIV8_G2_SORTER_LEVELS}
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

export default Div8G2Sorter;
