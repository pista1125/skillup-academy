import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { GroupDots80, TargetCard80 } from './Div5G2CardFigures';

interface Div5G2SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a hányados?',
    description: 'Oszd el 5-tel, és tedd a jó dobozba!',
    categories: [
      { id: 'q3', name: 'Eredmény: 3', color: 'sky' },
      { id: 'q6', name: 'Eredmény: 6', color: 'emerald' },
      { id: 'q9', name: 'Eredmény: 9', color: 'amber' }
    ],
    items: [
      { id: 'd5s1', text: '15 : 5', categoryId: 'q3' },
      { id: 'd5s2', text: '', categoryId: 'q3', figure: <GroupDots80 total={15} /> },
      { id: 'd5s3', text: '', categoryId: 'q3', figure: <TargetCard80 kind="coin" total={15} /> },
      { id: 'd5s4', text: '30 : 5', categoryId: 'q6' },
      { id: 'd5s5', text: '', categoryId: 'q6', figure: <TargetCard80 kind="hand" total={30} /> },
      { id: 'd5s6', text: 'a 30 ötöde', categoryId: 'q6' },
      { id: 'd5s7', text: '45 : 5', categoryId: 'q9' },
      { id: 'd5s8', text: '', categoryId: 'q9', figure: <GroupDots80 total={45} /> },
      { id: 'd5s9', text: 'a 45 ötöde', categoryId: 'q9' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi marad?',
    description: 'Csoportosítsd ötösével! Mennyi marad? Tedd a jó dobozba!',
    categories: [
      { id: 'r0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'r12', name: '1 vagy 2 marad', color: 'sky' },
      { id: 'r34', name: '3 vagy 4 marad', color: 'rose' }
    ],
    items: [
      { id: 'd5s10', text: '35', categoryId: 'r0' },
      { id: 'd5s11', text: '', categoryId: 'r0', figure: <GroupDots80 total={20} /> },
      { id: 'd5s12', text: '50', categoryId: 'r0' },
      { id: 'd5s13', text: '21', categoryId: 'r12' },
      { id: 'd5s14', text: '', categoryId: 'r12', figure: <GroupDots80 total={17} /> },
      { id: 'd5s15', text: '42', categoryId: 'r12' },
      { id: 'd5s16', text: '', categoryId: 'r34', figure: <GroupDots80 total={13} /> },
      { id: 'd5s17', text: '', categoryId: 'r34', figure: <GroupDots80 total={24} /> },
      { id: 'd5s18', text: '49', categoryId: 'r34' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány teli zacskó?',
    description: 'Ötösével csomagolunk. Hány zacskó lesz tele?',
    categories: [
      { id: 'b4', name: '4 teli zacskó', color: 'purple' },
      { id: 'b6', name: '6 teli zacskó', color: 'orange' },
      { id: 'b8', name: '8 teli zacskó', color: 'teal' }
    ],
    items: [
      { id: 'd5s19', text: '', categoryId: 'b4', figure: <GroupDots80 total={21} /> },
      { id: 'd5s20', text: '23 golyó', categoryId: 'b4' },
      { id: 'd5s21', text: '4 · 5 + 4', categoryId: 'b4' },
      { id: 'd5s22', text: '', categoryId: 'b6', figure: <GroupDots80 total={33} /> },
      { id: 'd5s23', text: '30 golyó', categoryId: 'b6' },
      { id: 'd5s24', text: '6 · 5 + 2', categoryId: 'b6' },
      { id: 'd5s25', text: '', categoryId: 'b8', figure: <GroupDots80 total={41} /> },
      { id: 'd5s26', text: '', categoryId: 'b8', figure: <GroupDots80 total={44} /> },
      { id: 'd5s27', text: '8 · 5 + 3', categoryId: 'b8' }
    ]
  }
];

export const DIV5_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Div5G2Sorter: React.FC<Div5G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-osztas-5-sorter',
  topicTitle = '4. Osztás 5-tel – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="osztas"
      topicId={topicId}
      subtopicId="osztas-5-tel"
      title={topicTitle}
      subtitle="Válogasd szét az osztásokat eredmény, maradék és teli zacskók szerint!"
      levels={DIV5_G2_SORTER_LEVELS}
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

export default Div5G2Sorter;
