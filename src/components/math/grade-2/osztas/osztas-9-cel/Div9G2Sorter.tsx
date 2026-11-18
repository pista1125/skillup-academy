import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { BoxesRestCard, JumpsToCard } from './Div9G2CardFigures';

interface Div9G2SorterProps {
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

const DIV9_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
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
      { id: 'd9s1', text: '27 : 9', categoryId: 'q3' },
      { id: 'd9s2', text: '15 : 5', categoryId: 'q3' },
      { id: 'd9s3', text: '', categoryId: 'q3', figure: <BoxesRestCard n={3} small /> },
      { id: 'd9s4', text: '45 : 9', categoryId: 'q5' },
      { id: 'd9s5', text: '', categoryId: 'q5', figure: <JumpsToCard target={45} small /> },
      { id: 'd9s6', text: '', categoryId: 'q5', figure: <BoxesRestCard n={5} small /> },
      { id: 'd9s7', text: '72 : 9', categoryId: 'q8' },
      { id: 'd9s8', text: '64 : 8', categoryId: 'q8' },
      { id: 'd9s9', text: '', categoryId: 'q8', figure: <BoxesRestCard n={8} small /> }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi marad?',
    description: 'Csoportosíts kilencesével! Mennyi marad?',
    categories: [
      { id: 'r0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'r1', name: 'Maradt 1', color: 'sky' },
      { id: 'r8', name: 'Maradt 8', color: 'rose' }
    ],
    items: [
      { id: 'd9s10', text: '54 : 9', categoryId: 'r0' },
      { id: 'd9s11', text: '', categoryId: 'r0', figure: <BoxesRestCard n={2} small /> },
      { id: 'd9s12', text: '', categoryId: 'r0', figure: <BoxesRestCard n={7} small /> },
      { id: 'd9s13', text: '46 : 9', categoryId: 'r1' },
      { id: 'd9s14', text: '19 : 9', categoryId: 'r1' },
      { id: 'd9s15', text: '', categoryId: 'r1', figure: <BoxesRestCard n={6} rest={1} small /> },
      { id: 'd9s16', text: '17 : 9', categoryId: 'r8' },
      { id: 'd9s17', text: '80 : 9', categoryId: 'r8' },
      { id: 'd9s18', text: '', categoryId: 'r8', figure: <BoxesRestCard n={3} rest={8} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány doboz kell?',
    description: 'Egy dobozba 9 labda fér. Hány doboz kell, hogy minden labda elférjen?',
    categories: [
      { id: 'b3', name: '3 doboz kell', color: 'sky' },
      { id: 'b4', name: '4 doboz kell', color: 'emerald' },
      { id: 'b5', name: '5 doboz kell', color: 'amber' }
    ],
    items: [
      { id: 'd9s19', text: '27 labda', categoryId: 'b3' },
      { id: 'd9s20', text: '19 labda', categoryId: 'b3' },
      { id: 'd9s21', text: '', categoryId: 'b3', figure: <BoxesRestCard n={2} rest={7} small /> },
      { id: 'd9s22', text: '36 labda', categoryId: 'b4' },
      { id: 'd9s23', text: '', categoryId: 'b4', figure: <BoxesRestCard n={3} rest={3} small /> },
      { id: 'd9s24', text: '33 labda', categoryId: 'b4' },
      { id: 'd9s25', text: '', categoryId: 'b5', figure: <BoxesRestCard n={4} rest={8} small /> },
      { id: 'd9s26', text: '38 labda', categoryId: 'b5' },
      { id: 'd9s27', text: '', categoryId: 'b5', figure: <BoxesRestCard n={4} rest={4} small /> }
    ]
  }
];

export const DIV9_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIV9_G2_SORTER_LEVELS_LIST[0],
  2: DIV9_G2_SORTER_LEVELS_LIST[1],
  3: DIV9_G2_SORTER_LEVELS_LIST[2]
};

export const Div9G2Sorter: React.FC<Div9G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-9-sorter',
  topicTitle = '8. Osztás 9-cel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-9-cel"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat hányados, maradék és dobozszám szerint!"
      levels={DIV9_G2_SORTER_LEVELS}
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

export default Div9G2Sorter;
