import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortTags, SortBlocks } from './ThreeDigitAddG3CardFigures';

interface ThreeDigitAddG3SorterProps {
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

const LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mekkora az összeg?',
    description: 'Add össze a két számot, és tedd a jó dobozba!',
    categories: [
      { id: 'k300', name: 'Kevesebb, mint 300', color: 'sky' },
      { id: 'k34', name: '300 és 400 között', color: 'amber' },
      { id: 'k400', name: 'Több, mint 400', color: 'emerald' }
    ],
    items: [
      { id: 'tdas1', text: '', figure: <SortTags prices={[120, 150]} />, categoryId: 'k300' },
      { id: 'tdas2', text: '', figure: <SortBlocks a={[1, 2]} b={[1, 4]} />, categoryId: 'k300' },
      { id: 'tdas3', text: '200 + 65', categoryId: 'k300' },
      { id: 'tdas4', text: '', figure: <SortTags prices={[180, 130]} />, categoryId: 'k34' },
      { id: 'tdas5', text: '', figure: <SortBlocks a={[1, 8]} b={[1, 9]} />, categoryId: 'k34' },
      { id: 'tdas6', text: '236 + 100', categoryId: 'k34' },
      { id: 'tdas7', text: '', figure: <SortTags prices={[250, 170]} />, categoryId: 'k400' },
      { id: 'tdas8', text: '', figure: <SortBlocks a={[2, 3]} b={[2, 0]} />, categoryId: 'k400' },
      { id: 'tdas9', text: '300 + 145', categoryId: 'k400' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik eredmény?',
    description: 'Kerek tízesek – ne felejtsd el a beváltást!',
    categories: [
      { id: 'e400', name: '= 400', color: 'sky' },
      { id: 'e430', name: '= 430', color: 'rose' },
      { id: 'e450', name: '= 450', color: 'emerald' }
    ],
    items: [
      { id: 'tdas10', text: '', figure: <SortTags prices={[250, 150]} />, categoryId: 'e400' },
      { id: 'tdas11', text: '', figure: <SortTags prices={[170, 230]} />, categoryId: 'e400' },
      { id: 'tdas12', text: '180 + 220', categoryId: 'e400' },
      { id: 'tdas13', text: '', figure: <SortTags prices={[180, 250]} />, categoryId: 'e430' },
      { id: 'tdas14', text: '', figure: <SortTags prices={[160, 270]} />, categoryId: 'e430' },
      { id: 'tdas15', text: '290 + 140', categoryId: 'e430' },
      { id: 'tdas16', text: '', figure: <SortTags prices={[270, 180]} />, categoryId: 'e450' },
      { id: 'tdas17', text: '', figure: <SortTags prices={[160, 290]} />, categoryId: 'e450' },
      { id: 'tdas18', text: '380 + 70', categoryId: 'e450' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hasonlítsd a 400-hoz!',
    description: 'Mennyi együtt? Kevesebb, pont annyi vagy több, mint 400?',
    categories: [
      { id: 'kev', name: 'Kevesebb, mint 400', color: 'sky' },
      { id: 'pont', name: 'Pont 400', color: 'amber' },
      { id: 'tobb', name: 'Több, mint 400', color: 'rose' }
    ],
    items: [
      { id: 'tdas19', text: '', figure: <SortTags prices={[170, 220]} />, categoryId: 'kev' },
      { id: 'tdas20', text: '', figure: <SortTags prices={[125, 250]} />, categoryId: 'kev' },
      { id: 'tdas21', text: '213 + 104', categoryId: 'kev' },
      { id: 'tdas22', text: '', figure: <SortTags prices={[230, 170]} />, categoryId: 'pont' },
      { id: 'tdas23', text: '', figure: <SortTags prices={[160, 240]} />, categoryId: 'pont' },
      { id: 'tdas24', text: '280 + 120', categoryId: 'pont' },
      { id: 'tdas25', text: '', figure: <SortTags prices={[260, 150]} />, categoryId: 'tobb' },
      { id: 'tdas26', text: '', figure: <SortTags prices={[190, 240]} />, categoryId: 'tobb' },
      { id: 'tdas27', text: '342 + 105', categoryId: 'tobb' }
    ]
  }
];

export const THREE_DIGIT_ADD_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = { 1: LIST[0], 2: LIST[1], 3: LIST[2] };

export const ThreeDigitAddG3Sorter: React.FC<ThreeDigitAddG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wadd-haromjegyu-sorter',
  topicTitle = '1. Háromjegyű számok összeadása – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="haromjegyu-szamok-osszeadasa"
      title={topicTitle}
      subtitle="Add össze fejben, és válogasd szét az összeadásokat!"
      levels={THREE_DIGIT_ADD_G3_SORTER_LEVELS}
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

export default ThreeDigitAddG3Sorter;
