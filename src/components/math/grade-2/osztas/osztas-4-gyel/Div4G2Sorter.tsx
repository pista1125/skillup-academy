import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { PlatesCard, BoxesCard, JumpsToCard, DotsCard } from './Div4G2CardFigures';

interface Div4G2SorterProps {
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

const DIV4_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a hányados?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'q3', name: 'Hányados: 3', color: 'sky' },
      { id: 'q5', name: 'Hányados: 5', color: 'emerald' },
      { id: 'q8', name: 'Hányados: 8', color: 'amber' }
    ],
    items: [
      { id: 'd4s1', text: '12 : 4', categoryId: 'q3' },
      { id: 'd4s2', text: '', categoryId: 'q3', figure: <PlatesCard total={12} small /> },
      { id: 'd4s3', text: '', categoryId: 'q3', figure: <BoxesCard n={3} small /> },
      { id: 'd4s4', text: '20 : 4', categoryId: 'q5' },
      { id: 'd4s5', text: '', categoryId: 'q5', figure: <JumpsToCard target={20} small /> },
      { id: 'd4s6', text: '10 : 2', categoryId: 'q5' },
      { id: 'd4s7', text: '32 : 4', categoryId: 'q8' },
      { id: 'd4s8', text: '', categoryId: 'q8', figure: <BoxesCard n={8} small /> },
      { id: 'd4s9', text: '16 : 2', categoryId: 'q8' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi marad?',
    description: 'Csoportosíts fejben négyesével! Mennyi marad ki?',
    categories: [
      { id: 'r0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'r1', name: 'Maradt 1', color: 'sky' },
      { id: 'r2', name: 'Maradt 2', color: 'rose' }
    ],
    items: [
      { id: 'd4s10', text: '24 : 4', categoryId: 'r0' },
      { id: 'd4s11', text: '', categoryId: 'r0', figure: <DotsCard n={16} small /> },
      { id: 'd4s12', text: '36 : 4', categoryId: 'r0' },
      { id: 'd4s13', text: '13 : 4', categoryId: 'r1' },
      { id: 'd4s14', text: '', categoryId: 'r1', figure: <DotsCard n={21} small /> },
      { id: 'd4s15', text: '', categoryId: 'r1', figure: <DotsCard n={29} small /> },
      { id: 'd4s16', text: '10 : 4', categoryId: 'r2' },
      { id: 'd4s17', text: '', categoryId: 'r2', figure: <DotsCard n={18} small /> },
      { id: 'd4s18', text: '34 : 4', categoryId: 'r2' }
    ]
  },
  {
    level: 3,
    title: '3. szint: 5-nél kevesebb vagy több?',
    description: 'Mennyi a negyede? Kevesebb, mint 5, pont 5, vagy több?',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 5', color: 'sky' },
      { id: 'eq', name: 'Pont 5', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 5', color: 'amber' }
    ],
    items: [
      { id: 'd4s19', text: 'A 16 negyede', categoryId: 'lt' },
      { id: 'd4s20', text: '', categoryId: 'lt', figure: <PlatesCard total={8} small /> },
      { id: 'd4s21', text: '12 : 4', categoryId: 'lt' },
      { id: 'd4s22', text: '20 : 4', categoryId: 'eq' },
      { id: 'd4s23', text: '', categoryId: 'eq', figure: <BoxesCard n={5} small /> },
      { id: 'd4s24', text: '10 : 2', categoryId: 'eq' },
      { id: 'd4s25', text: 'A 40 negyede', categoryId: 'gt' },
      { id: 'd4s26', text: '', categoryId: 'gt', figure: <JumpsToCard target={36} small /> },
      { id: 'd4s27', text: '', categoryId: 'gt', figure: <PlatesCard total={32} small /> }
    ]
  }
];

export const DIV4_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIV4_G2_SORTER_LEVELS_LIST[0],
  2: DIV4_G2_SORTER_LEVELS_LIST[1],
  3: DIV4_G2_SORTER_LEVELS_LIST[2]
};

export const Div4G2Sorter: React.FC<Div4G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-4-sorter',
  topicTitle = '3. Osztás 4-gyel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-4-gyel"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat hányados és maradék szerint!"
      levels={DIV4_G2_SORTER_LEVELS}
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

export default Div4G2Sorter;
