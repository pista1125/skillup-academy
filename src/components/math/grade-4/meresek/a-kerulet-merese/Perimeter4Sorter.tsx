import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Perimeter4SorterProps {
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

const PERIMETER4_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit mérünk?',
    description: 'Kerületet számolunk, egy szakasz hosszát mérjük, vagy egyáltalán nem hosszúságot mérünk?',
    categories: [
      { id: 'per', name: 'Kerület (körben)', color: 'teal' },
      { id: 'len', name: 'Egy szakasz hossza', color: 'blue' },
      { id: 'not', name: 'Nem hosszúság', color: 'rose' }
    ],
    items: [
      { id: 'p4s1', text: 'kerítés a telek körül', categoryId: 'per' },
      { id: 'p4s2', text: 'szegélyléc a szoba fala mentén körben', categoryId: 'per' },
      { id: 'p4s3', text: 'keret a tabló köré', categoryId: 'per' },
      { id: 'p4s4', text: 'a ceruza hossza', categoryId: 'len' },
      { id: 'p4s5', text: 'az ajtó magassága', categoryId: 'len' },
      { id: 'p4s6', text: 'Kitti egy lépésének hossza', categoryId: 'len' },
      { id: 'p4s7', text: 'az iskolatáska tömege', categoryId: 'not' },
      { id: 'p4s8', text: 'a pohár űrtartalma', categoryId: 'not' },
      { id: 'p4s9', text: 'a szünet ideje', categoryId: 'not' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kisebb, egyenlő vagy nagyobb, mint 20 cm?',
    description: 'Számold ki a kerületet, és tedd a jó csoportba!',
    categories: [
      { id: 'lt', name: 'K < 20 cm', color: 'sky' },
      { id: 'eq', name: 'K = 20 cm', color: 'emerald' },
      { id: 'gt', name: 'K > 20 cm', color: 'amber' }
    ],
    items: [
      { id: 'p4s10', text: 'négyzet, oldala 4 cm', categoryId: 'lt' },
      { id: 'p4s11', text: 'háromszög: 3 cm, 4 cm, 5 cm', categoryId: 'lt' },
      { id: 'p4s12', text: 'téglalap: 5 cm és 3 cm', categoryId: 'lt' },
      { id: 'p4s13', text: 'négyzet, oldala 5 cm', categoryId: 'eq' },
      { id: 'p4s14', text: 'téglalap: 6 cm és 4 cm', categoryId: 'eq' },
      { id: 'p4s15', text: 'ötszög, minden oldala 4 cm', categoryId: 'eq' },
      { id: 'p4s16', text: 'négyzet, oldala 6 cm', categoryId: 'gt' },
      { id: 'p4s17', text: 'hatszög, minden oldala 4 cm', categoryId: 'gt' },
      { id: 'p4s18', text: 'téglalap: 8 cm és 3 cm', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kerti tavak kerülete',
    description: 'Négyzet alakú tavak oldalát látod. Melyik tó kerülete 8 m, 10 m vagy 12 m?',
    categories: [
      { id: 'k8', name: 'K = 8 m', color: 'blue' },
      { id: 'k10', name: 'K = 10 m', color: 'purple' },
      { id: 'k12', name: 'K = 12 m', color: 'teal' }
    ],
    items: [
      { id: 'p4s19', text: 'oldala 2 m', categoryId: 'k8' },
      { id: 'p4s20', text: 'oldala 200 cm', categoryId: 'k8' },
      { id: 'p4s21', text: 'oldala 2000 mm', categoryId: 'k8' },
      { id: 'p4s22', text: 'oldala 2500 mm', categoryId: 'k10' },
      { id: 'p4s23', text: 'oldala 2 m 50 cm', categoryId: 'k10' },
      { id: 'p4s24', text: 'oldala 2 m 5 dm', categoryId: 'k10' },
      { id: 'p4s25', text: 'oldala 3 m', categoryId: 'k12' },
      { id: 'p4s26', text: 'oldala 30 dm', categoryId: 'k12' },
      { id: 'p4s27', text: 'oldala 300 cm', categoryId: 'k12' }
    ]
  }
];

const PERIMETER4_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: PERIMETER4_SORTER_LEVELS_LIST[0],
  2: PERIMETER4_SORTER_LEVELS_LIST[1],
  3: PERIMETER4_SORTER_LEVELS_LIST[2]
};

export const Perimeter4Sorter: React.FC<Perimeter4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-meas-kerulet-sorter',
  topicTitle = '2. A kerület mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-kerulet-merese"
      title={topicTitle}
      subtitle="Csoportosítsd a méréseket és a síkidomokat a kerületük szerint!"
      levels={PERIMETER4_SORTER_LEVELS}
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

export default Perimeter4Sorter;
