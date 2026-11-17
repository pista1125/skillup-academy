import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

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
    description: 'Számold ki, és hasonlítsd az 50-hez!',
    categories: [
      { id: 'kisebb', name: 'Kisebb, mint 50', color: 'sky' },
      { id: 'egyenlo', name: 'Pontosan 50', color: 'emerald' },
      { id: 'nagyobb', name: 'Nagyobb, mint 50', color: 'rose' }
    ],
    items: [
      { id: 'as100s1', text: '20 + 20', categoryId: 'kisebb' },
      { id: 'as100s2', text: '60 − 15', categoryId: 'kisebb' },
      { id: 'as100s3', text: '33 + 14', categoryId: 'kisebb' },
      { id: 'as100s4', text: '25 + 25', categoryId: 'egyenlo' },
      { id: 'as100s5', text: '80 − 30', categoryId: 'egyenlo' },
      { id: 'as100s6', text: '43 + 7', categoryId: 'egyenlo' },
      { id: 'as100s7', text: '30 + 25', categoryId: 'nagyobb' },
      { id: 'as100s8', text: '99 − 40', categoryId: 'nagyobb' },
      { id: 'as100s9', text: '46 + 8', categoryId: 'nagyobb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Van tízesátlépés?',
    description: 'Nézd meg az egyeseket! Át kell lépni a kerek tízest?',
    categories: [
      { id: 'osszeg', name: 'Összeadás tízesátlépéssel', color: 'amber' },
      { id: 'kulonbseg', name: 'Kivonás tízesátlépéssel', color: 'purple' },
      { id: 'nincs', name: 'Nincs tízesátlépés', color: 'teal' }
    ],
    items: [
      { id: 'as100s10', text: '37 + 6', categoryId: 'osszeg' },
      { id: 'as100s11', text: '48 + 25', categoryId: 'osszeg' },
      { id: 'as100s12', text: '59 + 3', categoryId: 'osszeg' },
      { id: 'as100s13', text: '52 − 7', categoryId: 'kulonbseg' },
      { id: 'as100s14', text: '81 − 36', categoryId: 'kulonbseg' },
      { id: 'as100s15', text: '64 − 9', categoryId: 'kulonbseg' },
      { id: 'as100s16', text: '45 + 32', categoryId: 'nincs' },
      { id: 'as100s17', text: '78 − 24', categoryId: 'nincs' },
      { id: 'as100s18', text: '61 + 8', categoryId: 'nincs' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik az eredmény?',
    description: 'Számold ki, és tedd a jó dobozba!',
    categories: [
      { id: 'e36', name: 'Eredmény: 36', color: 'sky' },
      { id: 'e45', name: 'Eredmény: 45', color: 'emerald' },
      { id: 'e54', name: 'Eredmény: 54', color: 'rose' }
    ],
    items: [
      { id: 'as100s19', text: '18 + 18', categoryId: 'e36' },
      { id: 'as100s20', text: '72 − 36', categoryId: 'e36' },
      { id: 'as100s21', text: '100 − 64', categoryId: 'e36' },
      { id: 'as100s22', text: '27 + 18', categoryId: 'e45' },
      { id: 'as100s23', text: '83 − 38', categoryId: 'e45' },
      { id: 'as100s24', text: '19 + 26', categoryId: 'e45' },
      { id: 'as100s25', text: '29 + 25', categoryId: 'e54' },
      { id: 'as100s26', text: '91 − 37', categoryId: 'e54' },
      { id: 'as100s27', text: '100 − 46', categoryId: 'e54' }
    ]
  }
];

const ADD_SUB_100_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
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
