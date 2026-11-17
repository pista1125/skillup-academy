import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SortTags, SortCompare } from './AddWordProblemsG3CardFigures';

interface AddWordProblemsG3SorterProps {
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

const ADD_WORD_PROBLEMS_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Elég 500 Ft?',
    description: 'Két dolgot veszel (az árcédulán forint van). Mennyibe kerül a kettő együtt?',
    categories: [
      { id: 'kev', name: 'Kevesebb, mint 500 Ft', color: 'sky' },
      { id: 'pont', name: 'Pontosan 500 Ft', color: 'emerald' },
      { id: 'tobb', name: 'Több, mint 500 Ft', color: 'rose' }
    ],
    items: [
      { id: 'awps1_1', text: '', figure: <SortTags prices={[236, 158]} />, categoryId: 'kev' },
      { id: 'awps1_2', text: '', figure: <SortTags prices={[345, 128]} />, categoryId: 'kev' },
      { id: 'awps1_3', text: '199 Ft + 299 Ft', categoryId: 'kev' },
      { id: 'awps1_4', text: '', figure: <SortTags prices={[236, 264]} />, categoryId: 'pont' },
      { id: 'awps1_5', text: '', figure: <SortTags prices={[125, 375]} />, categoryId: 'pont' },
      { id: 'awps1_6', text: '350 Ft + 150 Ft', categoryId: 'pont' },
      { id: 'awps1_7', text: '', figure: <SortTags prices={[267, 358]} />, categoryId: 'tobb' },
      { id: 'awps1_8', text: '', figure: <SortTags prices={[389, 127]} />, categoryId: 'tobb' },
      { id: 'awps1_9', text: '249 Ft + 252 Ft', categoryId: 'tobb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Elég 800 Ft?',
    description: 'Három dolgot veszel. Elég rá 800 Ft?',
    categories: [
      { id: 'marad', name: 'Elég, és marad is', color: 'emerald' },
      { id: 'pont', name: 'Pontosan elég', color: 'sky' },
      { id: 'nem', name: 'Nem elég', color: 'rose' }
    ],
    items: [
      { id: 'awps2_1', text: '', figure: <SortTags prices={[245, 190, 310]} />, categoryId: 'marad' },
      { id: 'awps2_2', text: '', figure: <SortTags prices={[160, 85, 145]} />, categoryId: 'marad' },
      { id: 'awps2_3', text: '300 Ft + 250 Ft + 199 Ft', categoryId: 'marad' },
      { id: 'awps2_4', text: '', figure: <SortTags prices={[365, 240, 195]} />, categoryId: 'pont' },
      { id: 'awps2_5', text: '', figure: <SortTags prices={[500, 150, 150]} />, categoryId: 'pont' },
      { id: 'awps2_6', text: '275 Ft + 325 Ft + 200 Ft', categoryId: 'pont' },
      { id: 'awps2_7', text: '', figure: <SortTags prices={[415, 286, 120]} />, categoryId: 'nem' },
      { id: 'awps2_8', text: '', figure: <SortTags prices={[389, 256, 170]} />, categoryId: 'nem' },
      { id: 'awps2_9', text: '299 Ft + 301 Ft + 250 Ft', categoryId: 'nem' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Ugyanaz az eredmény',
    description: 'Számold ki! A csíkoknál az alsó csík a kérdés. Válogasd szét az eredmény szerint!',
    categories: [
      { id: 'r323', name: '323', color: 'sky' },
      { id: 'r421', name: '421', color: 'amber' },
      { id: 'r500', name: '500', color: 'emerald' }
    ],
    items: [
      { id: 'awps3_1', text: '', figure: <SortCompare a={175} d={148} />, categoryId: 'r323' },
      { id: 'awps3_2', text: '', figure: <SortTags prices={[200, 123]} />, categoryId: 'r323' },
      { id: 'awps3_3', text: 'A fiúk 175-en vannak, ez 148-cal kevesebb, mint a lányok. Hány lány?', categoryId: 'r323' },
      { id: 'awps3_4', text: '', figure: <SortTags prices={[128, 293]} />, categoryId: 'r421' },
      { id: 'awps3_5', text: '', figure: <SortCompare a={256} d={165} />, categoryId: 'r421' },
      { id: 'awps3_6', text: 'Délelőtt 128, délután 165-tel több. Hány egész nap?', categoryId: 'r421' },
      { id: 'awps3_7', text: '', figure: <SortTags prices={[126, 164, 210]} />, categoryId: 'r500' },
      { id: 'awps3_8', text: '', figure: <SortCompare a={327} d={173} />, categoryId: 'r500' },
      { id: 'awps3_9', text: '236 + 264', categoryId: 'r500' }
    ]
  }
];

export const ADD_WORD_PROBLEMS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD_WORD_PROBLEMS_G3_SORTER_LEVELS_LIST[0],
  2: ADD_WORD_PROBLEMS_G3_SORTER_LEVELS_LIST[1],
  3: ADD_WORD_PROBLEMS_G3_SORTER_LEVELS_LIST[2]
};

export const AddWordProblemsG3Sorter: React.FC<AddWordProblemsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-wadd-szoveges-sorter',
  topicTitle = '5. Szöveges feladatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="irasbeli-osszeadas"
      topicId={topicId}
      subtopicId="szoveges-feladatok"
      title={topicTitle}
      subtitle="Számolj, és válogasd szét!"
      levels={ADD_WORD_PROBLEMS_G3_SORTER_LEVELS}
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

export default AddWordProblemsG3Sorter;
