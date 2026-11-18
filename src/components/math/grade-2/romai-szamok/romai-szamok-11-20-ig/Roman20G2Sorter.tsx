import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { StickCard80, RomanCard80, TenAndOnesCard80 } from './Roman20G2CardFigures';

interface Roman20G2SorterProps {
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
    title: '1. szint: Melyik tízesben?',
    description: '1 és 10 között, 11 és 15 között, vagy 16 és 20 között van a szám?',
    categories: [
      { id: 'a', name: '1–10', color: 'sky' },
      { id: 'b', name: '11–15', color: 'purple' },
      { id: 'c', name: '16–20', color: 'amber' }
    ],
    items: [
      { id: 'r20s1', text: '', categoryId: 'a', figure: <StickCard80 value="VII" /> },
      { id: 'r20s2', text: '', categoryId: 'a', figure: <RomanCard80 value="IX" /> },
      { id: 'r20s3', text: 'IV', categoryId: 'a' },
      { id: 'r20s4', text: '', categoryId: 'b', figure: <StickCard80 value="XIII" /> },
      { id: 'r20s5', text: '', categoryId: 'b', figure: <TenAndOnesCard80 ones={5} /> },
      { id: 'r20s6', text: 'XI', categoryId: 'b' },
      { id: 'r20s7', text: '', categoryId: 'c', figure: <StickCard80 value="XVII" /> },
      { id: 'r20s8', text: '', categoryId: 'c', figure: <RomanCard80 value="XX" /> },
      { id: 'r20s9', text: 'XIX', categoryId: 'c' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kisebb, egyenlő vagy nagyobb, mint XV?',
    description: 'Hasonlítsd össze a 15-tel!',
    categories: [
      { id: 'lt', name: 'Kisebb, mint XV', color: 'sky' },
      { id: 'eq', name: 'Pont XV', color: 'emerald' },
      { id: 'gt', name: 'Nagyobb, mint XV', color: 'rose' }
    ],
    items: [
      { id: 'r20s10', text: '', categoryId: 'lt', figure: <RomanCard80 value="XIV" /> },
      { id: 'r20s11', text: '', categoryId: 'lt', figure: <StickCard80 value="XII" /> },
      { id: 'r20s12', text: 'XI', categoryId: 'lt' },
      { id: 'r20s13', text: '', categoryId: 'eq', figure: <StickCard80 value="XV" /> },
      { id: 'r20s14', text: '10 + 5', categoryId: 'eq' },
      { id: 'r20s15', text: 'tizenöt', categoryId: 'eq' },
      { id: 'r20s16', text: '', categoryId: 'gt', figure: <RomanCard80 value="XVI" /> },
      { id: 'r20s17', text: '', categoryId: 'gt', figure: <TenAndOnesCard80 ones={9} /> },
      { id: 'r20s18', text: 'XVIII', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi az eredmény?',
    description: 'Írd át arab számmá, számolj, és tedd a jó dobozba!',
    categories: [
      { id: 'e13', name: 'Eredmény: 13', color: 'purple' },
      { id: 'e16', name: 'Eredmény: 16', color: 'amber' },
      { id: 'e20', name: 'Eredmény: 20', color: 'emerald' }
    ],
    items: [
      { id: 'r20s19', text: '', categoryId: 'e13', figure: <RomanCard80 value="X+III" /> },
      { id: 'r20s20', text: 'XV − II', categoryId: 'e13' },
      { id: 'r20s21', text: 'IX + IV', categoryId: 'e13' },
      { id: 'r20s22', text: '', categoryId: 'e16', figure: <RomanCard80 value="XII+IV" /> },
      { id: 'r20s23', text: 'XX − IV', categoryId: 'e16' },
      { id: 'r20s24', text: 'VIII + VIII', categoryId: 'e16' },
      { id: 'r20s25', text: '', categoryId: 'e20', figure: <RomanCard80 value="X+X" /> },
      { id: 'r20s26', text: '', categoryId: 'e20', figure: <RomanCard80 value="XV+V" /> },
      { id: 'r20s27', text: 'XIX + I', categoryId: 'e20' }
    ]
  }
];

export const ROMAN20_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: LIST[0],
  2: LIST[1],
  3: LIST[2]
};

export const Roman20G2Sorter: React.FC<Roman20G2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-romai-20-sorter',
  topicTitle = '3. Római számok 11-től 20-ig – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel = currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="romai-szamok-11-20-ig"
      title={topicTitle}
      subtitle="Válogasd szét a római számokat 1-től 20-ig!"
      levels={ROMAN20_G2_SORTER_LEVELS}
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

export default Roman20G2Sorter;
