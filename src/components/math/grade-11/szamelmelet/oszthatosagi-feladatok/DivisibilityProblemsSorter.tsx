import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface DivisibilityProblemsSorterProps {
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

const DIVISIBILITY_PROBLEMS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Páros vagy páratlan?',
    description: 'Döntsd el, milyen paritású az eredmény!',
    categories: [
      { id: 'even', name: 'Mindig páros', color: 'emerald' },
      { id: 'odd', name: 'Mindig páratlan', color: 'rose' },
      { id: 'both', name: 'Lehet páros is, páratlan is', color: 'slate' }
    ],
    items: [
      { id: 'dps1', text: 'két páros szám összege', categoryId: 'even' },
      { id: 'dps2', text: 'két páratlan szám összege', categoryId: 'even' },
      { id: 'dps3', text: 'egy páratlan és egy páros szám szorzata', categoryId: 'even' },
      { id: 'dps4', text: 'egy páros és egy páratlan szám összege', categoryId: 'odd' },
      { id: 'dps5', text: 'két páratlan szám szorzata', categoryId: 'odd' },
      { id: 'dps6', text: 'egy páratlan szám négyzete', categoryId: 'odd' },
      { id: 'dps7', text: 'két tetszőleges egész szám összege', categoryId: 'both' },
      { id: 'dps8', text: 'egy páratlan és egy tetszőleges egész szám szorzata', categoryId: 'both' },
      { id: 'dps9', text: 'egy prímszám', categoryId: 'both' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 45 = 5 · 9',
    description: 'Sorold be a számokat az 5-tel és 9-cel való oszthatóságuk szerint!',
    categories: [
      { id: 'both', name: 'Osztható 45-tel', color: 'purple' },
      { id: 'five', name: '5-tel osztható, 9-cel nem', color: 'sky' },
      { id: 'nine', name: '9-cel osztható, 5-tel nem', color: 'amber' }
    ],
    items: [
      { id: 'dps10', text: '765', categoryId: 'both' },
      { id: 'dps11', text: '1800', categoryId: 'both' },
      { id: 'dps12', text: '4995', categoryId: 'both' },
      { id: 'dps13', text: '2900', categoryId: 'five' },
      { id: 'dps14', text: '1235', categoryId: 'five' },
      { id: 'dps15', text: '4510', categoryId: 'five' },
      { id: 'dps16', text: '1206', categoryId: 'nine' },
      { id: 'dps17', text: '8001', categoryId: 'nine' },
      { id: 'dps18', text: '3618', categoryId: 'nine' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik összetett oszthatóság teljesül?',
    description: 'Mindegyik szám pontosan az egyikkel osztható a 12, 18, 15 közül!',
    categories: [
      { id: 'd12', name: '12-vel osztható (3 és 4)', color: 'emerald' },
      { id: 'd18', name: '18-cal osztható (2 és 9)', color: 'indigo' },
      { id: 'd15', name: '15-tel osztható (3 és 5)', color: 'orange' }
    ],
    items: [
      { id: 'dps19', text: '48', categoryId: 'd12' },
      { id: 'dps20', text: '84', categoryId: 'd12' },
      { id: 'dps21', text: '132', categoryId: 'd12' },
      { id: 'dps22', text: '54', categoryId: 'd18' },
      { id: 'dps23', text: '126', categoryId: 'd18' },
      { id: 'dps24', text: '198', categoryId: 'd18' },
      { id: 'dps25', text: '75', categoryId: 'd15' },
      { id: 'dps26', text: '105', categoryId: 'd15' },
      { id: 'dps27', text: '165', categoryId: 'd15' }
    ]
  }
];

const DIVISIBILITY_PROBLEMS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: DIVISIBILITY_PROBLEMS_SORTER_LEVELS_LIST[0],
  2: DIVISIBILITY_PROBLEMS_SORTER_LEVELS_LIST[1],
  3: DIVISIBILITY_PROBLEMS_SORTER_LEVELS_LIST[2]
};

export const DivisibilityProblemsSorter: React.FC<DivisibilityProblemsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-oszthatosagi-feladatok-sorter',
  topicTitle = '6. Oszthatósági feladatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="oszthatosagi-feladatok"
      title={topicTitle}
      subtitle="Rendszerezd: páros vagy páratlan, melyik oszthatóság teljesül, melyik összetett szabály igaz!"
      levels={DIVISIBILITY_PROBLEMS_SORTER_LEVELS}
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

export default DivisibilityProblemsSorter;
