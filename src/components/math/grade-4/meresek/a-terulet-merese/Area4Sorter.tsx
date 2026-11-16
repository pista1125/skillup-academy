import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Area4SorterProps {
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

const AREA4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Terület vagy kerület?',
    description: 'Mit kell kiszámolni: a területet, a kerületet, vagy egyiket sem?',
    categories: [
      { id: 'area', name: 'Terület (lefedés)', color: 'purple' },
      { id: 'per', name: 'Kerület (körbe)', color: 'teal' },
      { id: 'none', name: 'Egyik sem', color: 'rose' }
    ],
    items: [
      { id: 'a4s1', text: 'Hány járólap kell a padlóra?', categoryId: 'area' },
      { id: 'a4s2', text: 'Hány csempe kell a fal lefedéséhez?', categoryId: 'area' },
      { id: 'a4s3', text: 'Hány folt kell a patchwork takaróhoz?', categoryId: 'area' },
      { id: 'a4s4', text: 'Milyen hosszú kerítés kell a kert köré?', categoryId: 'per' },
      { id: 'a4s5', text: 'Hány méter szegélyléc kell a szoba körül?', categoryId: 'per' },
      { id: 'a4s6', text: 'Milyen hosszú keret kell a tabló köré?', categoryId: 'per' },
      { id: 'a4s7', text: 'Mennyi tej fér a pohárba?', categoryId: 'none' },
      { id: 'a4s8', text: 'Milyen nehéz az iskolatáska?', categoryId: 'none' },
      { id: 'a4s9', text: 'Mennyi ideig tart a szünet?', categoryId: 'none' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb, mint 20, pont 20 vagy több?',
    description: 'Hány kis négyzet a síkidom területe? Tedd a jó csoportba!',
    categories: [
      { id: 'lt', name: 'T < 20 kis négyzet', color: 'sky' },
      { id: 'eq', name: 'T = 20 kis négyzet', color: 'emerald' },
      { id: 'gt', name: 'T > 20 kis négyzet', color: 'amber' }
    ],
    items: [
      { id: 'a4s10', text: '4 · 4-es négyzet', categoryId: 'lt' },
      { id: 'a4s11', text: '3 · 6-os téglalap', categoryId: 'lt' },
      { id: 'a4s12', text: '9 dominó (2 kis négyzetes lap)', categoryId: 'lt' },
      { id: 'a4s13', text: '4 · 5-ös téglalap', categoryId: 'eq' },
      { id: 'a4s14', text: '2 · 10-es téglalap', categoryId: 'eq' },
      { id: 'a4s15', text: '40 fél négyzetnyi háromszög', categoryId: 'eq' },
      { id: 'a4s16', text: '5 · 5-ös négyzet', categoryId: 'gt' },
      { id: 'a4s17', text: '3 · 7-es téglalap', categoryId: 'gt' },
      { id: 'a4s18', text: '6 db 2 · 2-es nagy négyzet', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Több vagy kevesebb darab?',
    description: 'Egy takaró 24 kis négyzetnyi. Melyik lapból hány darab kell a lefedéséhez?',
    categories: [
      { id: 'more', name: 'Több, mint 24 darab', color: 'purple' },
      { id: 'same', name: 'Pontosan 24 darab', color: 'emerald' },
      { id: 'less', name: 'Kevesebb, mint 24 darab', color: 'rose' }
    ],
    items: [
      { id: 'a4s19', text: 'fél négyzetnyi háromszögből', categoryId: 'more' },
      { id: 'a4s20', text: 'negyed kis négyzetnyi lapocskából', categoryId: 'more' },
      { id: 'a4s21', text: 'fél kis négyzetnyi keskeny téglalapból', categoryId: 'more' },
      { id: 'a4s22', text: 'kis négyzetből', categoryId: 'same' },
      { id: 'a4s23', text: 'fél dominóból', categoryId: 'same' },
      { id: 'a4s24', text: 'két háromszögből összeragasztott kis négyzetből', categoryId: 'same' },
      { id: 'a4s25', text: 'dominóból (2 kis négyzet)', categoryId: 'less' },
      { id: 'a4s26', text: '2 · 2-es nagy négyzetből', categoryId: 'less' },
      { id: 'a4s27', text: '3 kis négyzetnyi lapból', categoryId: 'less' }
    ]
  }
];

const AREA4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: AREA4_SORTER_LEVELS_LIST[0],
  2: AREA4_SORTER_LEVELS_LIST[1],
  3: AREA4_SORTER_LEVELS_LIST[2]
};

export const Area4Sorter: React.FC<Area4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-meas-terulet-sorter',
  topicTitle = '3. A terület mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-terulet-merese"
      title={topicTitle}
      subtitle="Válogasd szét a feladatokat, a síkidomokat és a lefedő lapokat!"
      levels={AREA4_SORTER_LEVELS}
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

export default Area4Sorter;
