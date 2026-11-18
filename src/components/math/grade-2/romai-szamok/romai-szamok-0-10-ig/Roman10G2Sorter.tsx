import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StickCard80, ClockCard80, RomanCard80, DotsCard80 } from './Roman10G2CardFigures';

interface Roman10G2SorterProps {
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
    title: '1. szint: 3, 6 vagy 8?',
    description: 'Pálcika, óra, korong vagy római szám: melyik számot mutatja?',
    categories: [
      { id: 'n3', name: '3', color: 'sky' },
      { id: 'n6', name: '6', color: 'emerald' },
      { id: 'n8', name: '8', color: 'amber' }
    ],
    items: [
      { id: 'r10s1', text: '', categoryId: 'n3', figure: <StickCard80 value="III" /> },
      { id: 'r10s2', text: '', categoryId: 'n3', figure: <ClockCard80 hour={3} /> },
      { id: 'r10s3', text: 'III', categoryId: 'n3' },
      { id: 'r10s4', text: '', categoryId: 'n6', figure: <StickCard80 value="VI" /> },
      { id: 'r10s5', text: '', categoryId: 'n6', figure: <DotsCard80 n={6} /> },
      { id: 'r10s6', text: 'VI', categoryId: 'n6' },
      { id: 'r10s7', text: '', categoryId: 'n8', figure: <StickCard80 value="VIII" /> },
      { id: 'r10s8', text: '', categoryId: 'n8', figure: <ClockCard80 hour={8} /> },
      { id: 'r10s9', text: 'VIII', categoryId: 'n8' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kisebb, egyenlő vagy nagyobb, mint V?',
    description: 'Hasonlítsd össze az 5-tel!',
    categories: [
      { id: 'lt', name: 'Kisebb, mint V', color: 'sky' },
      { id: 'eq', name: 'Pont V', color: 'emerald' },
      { id: 'gt', name: 'Nagyobb, mint V', color: 'rose' }
    ],
    items: [
      { id: 'r10s10', text: '', categoryId: 'lt', figure: <StickCard80 value="IV" /> },
      { id: 'r10s11', text: '', categoryId: 'lt', figure: <RomanCard80 value="II" /> },
      { id: 'r10s12', text: 'III', categoryId: 'lt' },
      { id: 'r10s13', text: '', categoryId: 'eq', figure: <StickCard80 value="V" /> },
      { id: 'r10s14', text: '', categoryId: 'eq', figure: <ClockCard80 hour={5} /> },
      { id: 'r10s15', text: 'öt', categoryId: 'eq' },
      { id: 'r10s16', text: '', categoryId: 'gt', figure: <RomanCard80 value="IX" /> },
      { id: 'r10s17', text: '', categoryId: 'gt', figure: <StickCard80 value="VII" /> },
      { id: 'r10s18', text: 'X', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi az eredmény?',
    description: 'Írd át arab számmá, számolj, és tedd a jó dobozba!',
    categories: [
      { id: 'e7', name: 'Eredmény: 7', color: 'purple' },
      { id: 'e9', name: 'Eredmény: 9', color: 'amber' },
      { id: 'e10', name: 'Eredmény: 10', color: 'emerald' }
    ],
    items: [
      { id: 'r10s19', text: '', categoryId: 'e7', figure: <RomanCard80 value="V+II" /> },
      { id: 'r10s20', text: 'X − III', categoryId: 'e7' },
      { id: 'r10s21', text: 'IV + III', categoryId: 'e7' },
      { id: 'r10s22', text: '', categoryId: 'e9', figure: <RomanCard80 value="VI+III" /> },
      { id: 'r10s23', text: 'X − I', categoryId: 'e9' },
      { id: 'r10s24', text: 'VIII + I', categoryId: 'e9' },
      { id: 'r10s25', text: '', categoryId: 'e10', figure: <RomanCard80 value="V+V" /> },
      { id: 'r10s26', text: '', categoryId: 'e10', figure: <RomanCard80 value="IX+I" /> },
      { id: 'r10s27', text: 'VII + III', categoryId: 'e10' }
    ]
  }
];

export const ROMAN10_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Roman10G2Sorter: React.FC<Roman10G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-romai-10-sorter',
  topicTitle = '2. Római számok 1-től 10-ig – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="romai-szamok-0-10-ig"
      title={topicTitle}
      subtitle="Válogasd szét a római számokat 1-től 10-ig!"
      levels={ROMAN10_G2_SORTER_LEVELS}
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

export default Roman10G2Sorter;
