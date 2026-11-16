import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MulDiv10000SorterProps {
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

const MUL_DIV_10000_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Mekkora az eredmény?",
    description: "Számold ki fejben, és tedd a megfelelő helyre!",
    categories: [
      { id: 'kicsi', name: "1000-nél kisebb", color: 'sky' },
      { id: 'kozep', name: "1000 és 5000 között", color: 'amber' },
      { id: 'nagy', name: "5000-nél nagyobb", color: 'purple' }
    ],
    items: [
      { id: 'md10s1', text: "9 · 10", categoryId: 'kicsi' },
      { id: 'md10s2', text: "380 : 10", categoryId: 'kicsi' },
      { id: 'md10s3', text: "1500 : 100", categoryId: 'kicsi' },
      { id: 'md10s4', text: "3 · 600", categoryId: 'kozep' },
      { id: 'md10s5', text: "8 · 400", categoryId: 'kozep' },
      { id: 'md10s6', text: "70 · 40", categoryId: 'kozep' },
      { id: 'md10s7', text: "7 · 1000", categoryId: 'nagy' },
      { id: 'md10s8', text: "80 · 100", categoryId: 'nagy' },
      { id: 'md10s9', text: "900 · 7", categoryId: 'nagy' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Ugyanaz a szorzat",
    description: "Melyik szorzat mennyi?",
    categories: [
      { id: 'p3600', name: "= 3600", color: 'emerald' },
      { id: 'p2400', name: "= 2400", color: 'rose' },
      { id: 'p4800', name: "= 4800", color: 'blue' }
    ],
    items: [
      { id: 'md10s10', text: "400 · 9", categoryId: 'p3600' },
      { id: 'md10s11', text: "6 · 600", categoryId: 'p3600' },
      { id: 'md10s12', text: "60 · 60", categoryId: 'p3600' },
      { id: 'md10s13', text: "300 · 8", categoryId: 'p2400' },
      { id: 'md10s14', text: "4 · 600", categoryId: 'p2400' },
      { id: 'md10s15', text: "80 · 30", categoryId: 'p2400' },
      { id: 'md10s16', text: "600 · 8", categoryId: 'p4800' },
      { id: 'md10s17', text: "80 · 60", categoryId: 'p4800' },
      { id: 'md10s18', text: "1200 · 4", categoryId: 'p4800' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Figyelj a nullákra!",
    description: "40, 400 vagy 4000 az eredmény?",
    categories: [
      { id: 'r40', name: "= 40", color: 'teal' },
      { id: 'r400', name: "= 400", color: 'orange' },
      { id: 'r4000', name: "= 4000", color: 'purple' }
    ],
    items: [
      { id: 'md10s19', text: "2400 : 60", categoryId: 'r40' },
      { id: 'md10s20', text: "3200 : 80", categoryId: 'r40' },
      { id: 'md10s21', text: "160 : 4", categoryId: 'r40' },
      { id: 'md10s22', text: "2400 : 6", categoryId: 'r400' },
      { id: 'md10s23', text: "3200 : 8", categoryId: 'r400' },
      { id: 'md10s24', text: "8000 : 20", categoryId: 'r400' },
      { id: 'md10s25', text: "40 · 100", categoryId: 'r4000' },
      { id: 'md10s26', text: "8 · 500", categoryId: 'r4000' },
      { id: 'md10s27', text: "2 · 2000", categoryId: 'r4000' }
    ]
  }
];

const MUL_DIV_10000_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MUL_DIV_10000_SORTER_LEVELS_LIST[0],
  2: MUL_DIV_10000_SORTER_LEVELS_LIST[1],
  3: MUL_DIV_10000_SORTER_LEVELS_LIST[2]
};

export const MulDiv10000Sorter: React.FC<MulDiv10000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-szorzas-10000-sorter',
  topicTitle = "12. Szorzás és osztás 10 000-ig – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szorzas-osztas-10000-ig"
      title={topicTitle}
      subtitle="Válogasd szét a műveleteket az eredményük szerint – figyelj a nullákra!"
      levels={MUL_DIV_10000_SORTER_LEVELS}
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

export default MulDiv10000Sorter;
