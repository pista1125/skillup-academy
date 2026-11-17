import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortCol } from './WrittenSubExamG3CardFigures';
import { SortChange } from '../a-kulonbseg-valtozasai/DiffChangesG3CardFigures';

interface WrittenSubExamG3SorterProps {
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

const WRITTEN_SUB_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hányszor marad 1?',
    description: 'Pótolj oszloponként! Hányszor marad 1?',
    categories: [
      { id: 'n0', name: 'Nem marad semmi', color: 'emerald' },
      { id: 'n1', name: 'Egyszer marad 1', color: 'sky' },
      { id: 'n2', name: 'Kétszer marad 1', color: 'rose' }
    ],
    items: [
      { id: 'wses1_1', text: '', figure: <SortCol m={486} s={253} />, categoryId: 'n0' },
      { id: 'wses1_2', text: '', figure: <SortCol m={497} s={306} />, categoryId: 'n0' },
      { id: 'wses1_3', text: '375 − 142', categoryId: 'n0' },
      { id: 'wses1_4', text: '', figure: <SortCol m={352} s={127} />, categoryId: 'n1' },
      { id: 'wses1_5', text: '', figure: <SortCol m={427} s={153} />, categoryId: 'n1' },
      { id: 'wses1_6', text: '461 − 235', categoryId: 'n1' },
      { id: 'wses1_7', text: '', figure: <SortCol m={423} s={167} />, categoryId: 'n2' },
      { id: 'wses1_8', text: '', figure: <SortCol m={405} s={248} />, categoryId: 'n2' },
      { id: 'wses1_9', text: '312 − 145', categoryId: 'n2' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hasonlítsd a 200-hoz!',
    description: 'Számold ki! Kisebb, pontosan 200 vagy nagyobb a különbség?',
    categories: [
      { id: 'kev', name: '200-nál kisebb', color: 'sky' },
      { id: 'pont', name: 'Pontosan 200', color: 'emerald' },
      { id: 'tobb', name: '200-nál nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'wses2_1', text: '', figure: <SortCol m={385} s={196} />, categoryId: 'kev' },
      { id: 'wses2_2', text: '', figure: <SortCol m={431} s={269} />, categoryId: 'kev' },
      { id: 'wses2_3', text: '300 − 136', categoryId: 'kev' },
      { id: 'wses2_4', text: '', figure: <SortCol m={387} s={187} />, categoryId: 'pont' },
      { id: 'wses2_5', text: '', figure: <SortCol m={412} s={212} />, categoryId: 'pont' },
      { id: 'wses2_6', text: '450 − 250', categoryId: 'pont' },
      { id: 'wses2_7', text: '', figure: <SortCol m={462} s={175} />, categoryId: 'tobb' },
      { id: 'wses2_8', text: '', figure: <SortCol m={405} s={168} />, categoryId: 'tobb' },
      { id: 'wses2_9', text: '350 − 87', categoryId: 'tobb' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hogyan változik a különbség?',
    description: 'Kék = kisebbítendő, narancs = kivonandó. Nő, marad vagy csökken a különbség?',
    categories: [
      { id: 'no', name: 'A különbség nő', color: 'emerald' },
      { id: 'marad', name: 'Nem változik', color: 'sky' },
      { id: 'csokken', name: 'A különbség csökken', color: 'rose' }
    ],
    items: [
      { id: 'wses3_1', text: '372 − 145 → 382 − 135', figure: <SortChange m={10} s={-10} />, categoryId: 'no' },
      { id: 'wses3_2', text: '420 − 230 → 420 − 210', figure: <SortChange m={0} s={-20} />, categoryId: 'no' },
      { id: 'wses3_3', text: 'Ugyanannyi pénzből olcsóbb dolgot veszel.', categoryId: 'no' },
      { id: 'wses3_4', text: '356 − 128 → 366 − 138', figure: <SortChange m={10} s={10} />, categoryId: 'marad' },
      { id: 'wses3_5', text: '490 − 250 → 390 − 150', figure: <SortChange m={-100} s={-100} />, categoryId: 'marad' },
      { id: 'wses3_6', text: 'Két testvér korkülönbsége 5 év múlva.', categoryId: 'marad' },
      { id: 'wses3_7', text: '415 − 238 → 415 − 248', figure: <SortChange m={0} s={10} />, categoryId: 'csokken' },
      { id: 'wses3_8', text: '463 − 120 → 443 − 120', figure: <SortChange m={-20} s={0} />, categoryId: 'csokken' },
      { id: 'wses3_9', text: 'Ugyanannyi pénzből drágább dolgot veszel.', categoryId: 'csokken' }
    ]
  }
];

export const WRITTEN_SUB_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: WRITTEN_SUB_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: WRITTEN_SUB_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: WRITTEN_SUB_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const WrittenSubExamG3Sorter: React.FC<WrittenSubExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wsub-tudasproba-sorter',
  topicTitle = '5. Megálló – tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-kivonas"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Számolj, gondolkodj, és válogasd szét!"
      levels={WRITTEN_SUB_EXAM_G3_SORTER_LEVELS}
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

export default WrittenSubExamG3Sorter;
