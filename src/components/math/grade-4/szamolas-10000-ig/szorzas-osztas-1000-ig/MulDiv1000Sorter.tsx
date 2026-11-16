import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulDiv1000SorterProps {
  level?: DifficultyLevel;
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
  [key: string]: any;
}

const MULDIV_1000_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi a maradék 3-mal osztva?',
    description: 'Oszd el a számot 3-mal, és tedd a maradéka szerinti csoportba!',
    categories: [
      { id: 'm0', name: 'Maradék: 0', color: 'emerald' },
      { id: 'm1', name: 'Maradék: 1', color: 'blue' },
      { id: 'm2', name: 'Maradék: 2', color: 'amber' }
    ],
    items: [
      { id: 'md1s1', text: '24', categoryId: 'm0' },
      { id: 'md1s2', text: '27', categoryId: 'm0' },
      { id: 'md1s3', text: '15', categoryId: 'm0' },
      { id: 'md1s4', text: '13', categoryId: 'm1' },
      { id: 'md1s5', text: '16', categoryId: 'm1' },
      { id: 'md1s6', text: '28', categoryId: 'm1' },
      { id: 'md1s7', text: '29', categoryId: 'm2' },
      { id: 'md1s8', text: '17', categoryId: 'm2' },
      { id: 'md1s9', text: '23', categoryId: 'm2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány jegyű az eredmény?',
    description: 'Számold ki fejben! Egyjegyű, kétjegyű vagy háromjegyű lesz az eredmény?',
    categories: [
      { id: 'd1', name: 'Egyjegyű', color: 'teal' },
      { id: 'd2', name: 'Kétjegyű', color: 'purple' },
      { id: 'd3', name: 'Háromjegyű', color: 'rose' }
    ],
    items: [
      { id: 'md1s10', text: '640 : 80', categoryId: 'd1' },
      { id: 'md1s11', text: '420 : 60', categoryId: 'd1' },
      { id: 'md1s12', text: '810 : 90', categoryId: 'd1' },
      { id: 'md1s13', text: '1000 : 50', categoryId: 'd2' },
      { id: 'md1s14', text: '540 : 9', categoryId: 'd2' },
      { id: 'md1s15', text: '300 : 10', categoryId: 'd2' },
      { id: 'md1s16', text: '2 · 340', categoryId: 'd3' },
      { id: 'md1s17', text: '9 · 90', categoryId: 'd3' },
      { id: 'md1s18', text: '60 · 5', categoryId: 'd3' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szorzandó, szorzó vagy szorzat?',
    description: 'Mi a neve a kiemelt számnak a szorzásban?',
    categories: [
      { id: 'sd', name: 'Szorzandó', color: 'rose' },
      { id: 'so', name: 'Szorzó', color: 'emerald' },
      { id: 'sz', name: 'Szorzat', color: 'blue' }
    ],
    items: [
      { id: 'md1s19', text: '214 a 214 · 3 = 642-ben', categoryId: 'sd' },
      { id: 'md1s20', text: '92 a 92 · 7 = 644-ben', categoryId: 'sd' },
      { id: 'md1s21', text: '148 a 148 · 6 = 888-ban', categoryId: 'sd' },
      { id: 'md1s22', text: '3 a 214 · 3 = 642-ben', categoryId: 'so' },
      { id: 'md1s23', text: '7 a 92 · 7 = 644-ben', categoryId: 'so' },
      { id: 'md1s24', text: '6 a 148 · 6 = 888-ban', categoryId: 'so' },
      { id: 'md1s25', text: '642 a 214 · 3 = 642-ben', categoryId: 'sz' },
      { id: 'md1s26', text: '644 a 92 · 7 = 644-ben', categoryId: 'sz' },
      { id: 'md1s27', text: '888 a 148 · 6 = 888-ban', categoryId: 'sz' }
    ]
  }
];

const MULDIV_1000_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MULDIV_1000_SORTER_LEVELS_LIST[0],
  2: MULDIV_1000_SORTER_LEVELS_LIST[1],
  3: MULDIV_1000_SORTER_LEVELS_LIST[2]
};

export const MulDiv1000Sorter: React.FC<MulDiv1000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-szorzas-1000-sorter',
  topicTitle = '3. Szorzás és osztás 1000-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szorzas-osztas-1000-ig"
      title={topicTitle}
      subtitle="Csoportosíts maradék, eredmény és elnevezés szerint!"
      levels={MULDIV_1000_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default MulDiv1000Sorter;
