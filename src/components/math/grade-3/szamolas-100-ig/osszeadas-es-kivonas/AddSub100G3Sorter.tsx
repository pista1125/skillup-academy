import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { RodsOpCard, JumpCard, BarCard } from './AddSub100G3CardFigures';

interface AddSub100G3SorterProps {
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

const ADD_SUB_100_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kisebb, egyenlő vagy nagyobb?',
    description: 'Számold ki, és hasonlítsd az 50-hez! A kihúzott rudakat elvettük.',
    categories: [
      { id: 'kisebb', name: 'Kisebb, mint 50', color: 'sky' },
      { id: 'egyenlo', name: 'Pontosan 50', color: 'emerald' },
      { id: 'nagyobb', name: 'Nagyobb, mint 50', color: 'rose' }
    ],
    items: [
      { id: 'as100s1', text: '', categoryId: 'kisebb', figure: <RodsOpCard a={2} b={2} op="+" small /> },
      { id: 'as100s2', text: '60 − 15', categoryId: 'kisebb' },
      { id: 'as100s3', text: '33 + 14', categoryId: 'kisebb' },
      { id: 'as100s4', text: '', categoryId: 'egyenlo', figure: <RodsOpCard a={7} b={2} op="−" small /> },
      { id: 'as100s5', text: '', categoryId: 'egyenlo', figure: <RodsOpCard a={8} b={3} op="−" small /> },
      { id: 'as100s6', text: '43 + 7', categoryId: 'egyenlo' },
      { id: 'as100s7', text: '', categoryId: 'nagyobb', figure: <RodsOpCard a={2} b={4} op="+" small /> },
      { id: 'as100s8', text: '99 − 40', categoryId: 'nagyobb' },
      { id: 'as100s9', text: '46 + 8', categoryId: 'nagyobb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Van tízesátlépés?',
    description: 'Nézd meg az egyeseket! Át kell lépni a kerek tízest? A képen a lila vonás a kerek tízes.',
    categories: [
      { id: 'osszeg', name: 'Összeadás tízesátlépéssel', color: 'amber' },
      { id: 'kulonbseg', name: 'Kivonás tízesátlépéssel', color: 'purple' },
      { id: 'nincs', name: 'Nincs tízesátlépés', color: 'teal' }
    ],
    items: [
      { id: 'as100s10', text: '37 + 6', categoryId: 'osszeg', figure: <JumpCard start={37} delta={6} small /> },
      { id: 'as100s11', text: '48 + 25', categoryId: 'osszeg' },
      { id: 'as100s12', text: '59 + 3', categoryId: 'osszeg' },
      { id: 'as100s13', text: '52 − 7', categoryId: 'kulonbseg', figure: <JumpCard start={52} delta={-7} small /> },
      { id: 'as100s14', text: '81 − 36', categoryId: 'kulonbseg' },
      { id: 'as100s15', text: '64 − 9', categoryId: 'kulonbseg', figure: <JumpCard start={64} delta={-9} small /> },
      { id: 'as100s16', text: '45 + 32', categoryId: 'nincs' },
      { id: 'as100s17', text: '78 − 24', categoryId: 'nincs' },
      { id: 'as100s18', text: '72 + 5', categoryId: 'nincs', figure: <JumpCard start={72} delta={5} small /> }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik az eredmény?',
    description: 'Számold ki, és tedd a jó dobozba! A szalagos képen a „?” helyére kell a szám.',
    categories: [
      { id: 'e36', name: 'Eredmény: 36', color: 'sky' },
      { id: 'e45', name: 'Eredmény: 45', color: 'emerald' },
      { id: 'e54', name: 'Eredmény: 54', color: 'rose' }
    ],
    items: [
      { id: 'as100s19', text: '', categoryId: 'e36', figure: <BarCard a={18} b={18} mode="add" small /> },
      { id: 'as100s20', text: '72 − 36', categoryId: 'e36' },
      { id: 'as100s21', text: '100 − 64', categoryId: 'e36' },
      { id: 'as100s22', text: '', categoryId: 'e45', figure: <BarCard a={27} b={18} mode="add" small /> },
      { id: 'as100s23', text: '', categoryId: 'e45', figure: <BarCard a={83} b={38} mode="sub" small /> },
      { id: 'as100s24', text: '19 + 26', categoryId: 'e45' },
      { id: 'as100s25', text: '29 + 25', categoryId: 'e54' },
      { id: 'as100s26', text: '', categoryId: 'e54', figure: <BarCard a={91} b={37} mode="sub" small /> },
      { id: 'as100s27', text: '100 − 46', categoryId: 'e54' }
    ]
  }
];

export const ADD_SUB_100_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ADD_SUB_100_G3_SORTER_LEVELS_LIST[0],
  2: ADD_SUB_100_G3_SORTER_LEVELS_LIST[1],
  3: ADD_SUB_100_G3_SORTER_LEVELS_LIST[2]
};

export const AddSub100G3Sorter: React.FC<AddSub100G3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-c100-osszeadas-sorter',
  topicTitle = '2. Összeadás és kivonás – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Számold ki a műveleteket, és válogasd szét őket!"
      levels={ADD_SUB_100_G3_SORTER_LEVELS}
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

export default AddSub100G3Sorter;
