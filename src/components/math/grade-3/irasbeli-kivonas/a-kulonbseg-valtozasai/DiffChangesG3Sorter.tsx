import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortChange } from './DiffChangesG3CardFigures';

interface DiffChangesG3SorterProps {
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

const DIFF_CHANGES_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Nő, marad vagy csökken?',
    description: 'Kék = kisebbítendő, narancs = kivonandó. Mi lesz a különbséggel?',
    categories: [
      { id: 'no', name: 'A különbség nő', color: 'emerald' },
      { id: 'marad', name: 'Nem változik', color: 'sky' },
      { id: 'csokken', name: 'A különbség csökken', color: 'rose' }
    ],
    items: [
      { id: 'dcs1_1', text: '', figure: <SortChange m={10} s={0} />, categoryId: 'no' },
      { id: 'dcs1_2', text: '', figure: <SortChange m={0} s={-100} />, categoryId: 'no' },
      { id: 'dcs1_3', text: 'A kivonandó 1-gyel kisebb.', categoryId: 'no' },
      { id: 'dcs1_4', text: '', figure: <SortChange m={10} s={10} />, categoryId: 'marad' },
      { id: 'dcs1_5', text: '', figure: <SortChange m={-100} s={-100} />, categoryId: 'marad' },
      { id: 'dcs1_6', text: 'Mindkét szám 20-szal nagyobb.', categoryId: 'marad' },
      { id: 'dcs1_7', text: '', figure: <SortChange m={0} s={10} />, categoryId: 'csokken' },
      { id: 'dcs1_8', text: '', figure: <SortChange m={-10} s={0} />, categoryId: 'csokken' },
      { id: 'dcs1_9', text: 'Ugyanannyi pénzből drágább játékot veszel.', categoryId: 'csokken' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyivel változik?',
    description: 'Mennyivel változik a különbség? Válogasd szét!',
    categories: [
      { id: 'p10', name: '10-zel nő', color: 'emerald' },
      { id: 'm10', name: '10-zel csökken', color: 'rose' },
      { id: 'd0', name: 'Nem változik', color: 'sky' }
    ],
    items: [
      { id: 'dcs2_1', text: '', figure: <SortChange m={20} s={10} />, categoryId: 'p10' },
      { id: 'dcs2_2', text: '', figure: <SortChange m={0} s={-10} />, categoryId: 'p10' },
      { id: 'dcs2_3', text: '430 − 255 → 430 − 245', categoryId: 'p10' },
      { id: 'dcs2_4', text: '', figure: <SortChange m={-20} s={-10} />, categoryId: 'm10' },
      { id: 'dcs2_5', text: '', figure: <SortChange m={0} s={10} />, categoryId: 'm10' },
      { id: 'dcs2_6', text: '460 − 340 → 460 − 350', categoryId: 'm10' },
      { id: 'dcs2_7', text: '', figure: <SortChange m={100} s={100} />, categoryId: 'd0' },
      { id: 'dcs2_8', text: '', figure: <SortChange m={-10} s={-10} />, categoryId: 'd0' },
      { id: 'dcs2_9', text: '408 − 356 → 398 − 346', categoryId: 'd0' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hasonlítsd a 200-hoz!',
    description: '450 − 250 = 200. A kártyán a változás is látszik. Kevesebb, pontosan 200 vagy több?',
    categories: [
      { id: 'kev', name: 'Kevesebb, mint 200', color: 'sky' },
      { id: 'pont', name: 'Pontosan 200', color: 'emerald' },
      { id: 'tobb', name: 'Több, mint 200', color: 'rose' }
    ],
    items: [
      { id: 'dcs3_1', text: '450 − 260', figure: <SortChange m={0} s={10} />, categoryId: 'kev' },
      { id: 'dcs3_2', text: '449 − 250', categoryId: 'kev' },
      { id: 'dcs3_3', text: '470 − 280', figure: <SortChange m={20} s={30} />, categoryId: 'kev' },
      { id: 'dcs3_4', text: '460 − 260', figure: <SortChange m={10} s={10} />, categoryId: 'pont' },
      { id: 'dcs3_5', text: '440 − 240', figure: <SortChange m={-10} s={-10} />, categoryId: 'pont' },
      { id: 'dcs3_6', text: '400 − 200', categoryId: 'pont' },
      { id: 'dcs3_7', text: '450 − 249', figure: <SortChange m={0} s={-1} />, categoryId: 'tobb' },
      { id: 'dcs3_8', text: '430 − 220', figure: <SortChange m={-20} s={-30} />, categoryId: 'tobb' },
      { id: 'dcs3_9', text: '460 − 250', categoryId: 'tobb' }
    ]
  }
];

export const DIFF_CHANGES_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIFF_CHANGES_G3_SORTER_LEVELS_LIST[0],
  2: DIFF_CHANGES_G3_SORTER_LEVELS_LIST[1],
  3: DIFF_CHANGES_G3_SORTER_LEVELS_LIST[2]
};

export const DiffChangesG3Sorter: React.FC<DiffChangesG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wsub-valtozasok-sorter',
  topicTitle = '4. A különbség változásai – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="a-kulonbseg-valtozasai"
      title={topicTitle}
      subtitle="Figyeld a kisebbítendőt és a kivonandót, és válogasd szét!"
      levels={DIFF_CHANGES_G3_SORTER_LEVELS}
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

export default DiffChangesG3Sorter;
