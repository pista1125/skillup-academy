import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Rounding10000SorterProps {
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

const ROUNDING_10000_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Százasra kerekítve",
    description: "Mennyi a szám százasra kerekített értéke?",
    categories: [
      { id: 'c1400', name: "≈ 1400", color: 'sky' },
      { id: 'c1500', name: "≈ 1500", color: 'emerald' },
      { id: 'c1600', name: "≈ 1600", color: 'rose' }
    ],
    items: [
      { id: 'r10s1', text: "1450", categoryId: 'c1500' },
      { id: 'r10s2', text: "1549", categoryId: 'c1500' },
      { id: 'r10s3', text: "1532", categoryId: 'c1500' },
      { id: 'r10s4', text: "1449", categoryId: 'c1400' },
      { id: 'r10s5', text: "1399", categoryId: 'c1400' },
      { id: 'r10s6', text: "1435", categoryId: 'c1400' },
      { id: 'r10s7', text: "1588", categoryId: 'c1600' },
      { id: 'r10s8', text: "1560", categoryId: 'c1600' },
      { id: 'r10s9', text: "1551", categoryId: 'c1600' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Ezresre kerekítve",
    description: "Mennyi a szám ezresre kerekített értéke?",
    categories: [
      { id: 'c2000', name: "≈ 2000", color: 'amber' },
      { id: 'c3000', name: "≈ 3000", color: 'purple' },
      { id: 'c4000', name: "≈ 4000", color: 'teal' }
    ],
    items: [
      { id: 'r10s10', text: "2500", categoryId: 'c3000' },
      { id: 'r10s11', text: "3499", categoryId: 'c3000' },
      { id: 'r10s12', text: "2901", categoryId: 'c3000' },
      { id: 'r10s13', text: "2400", categoryId: 'c2000' },
      { id: 'r10s14', text: "2499", categoryId: 'c2000' },
      { id: 'r10s15', text: "2312", categoryId: 'c2000' },
      { id: 'r10s16', text: "3600", categoryId: 'c4000' },
      { id: 'r10s17', text: "3510", categoryId: 'c4000' },
      { id: 'r10s18', text: "3852", categoryId: 'c4000' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Le, fel vagy marad?",
    description: "Döntsd el, merre kerekítünk!",
    categories: [
      { id: 'le', name: "Lefelé kerekítünk", color: 'sky' },
      { id: 'fel', name: "Felfelé kerekítünk", color: 'rose' },
      { id: 'marad', name: "Nem változik (már kerek)", color: 'emerald' }
    ],
    items: [
      { id: 'r10s19', text: "4720 százasra", categoryId: 'le' },
      { id: 'r10s20', text: "2131 tízesre", categoryId: 'le' },
      { id: 'r10s21', text: "4449 ezresre", categoryId: 'le' },
      { id: 'r10s22', text: "5050 százasra", categoryId: 'fel' },
      { id: 'r10s23', text: "3500 ezresre", categoryId: 'fel' },
      { id: 'r10s24', text: "9047 tízesre", categoryId: 'fel' },
      { id: 'r10s25', text: "7000 ezresre", categoryId: 'marad' },
      { id: 'r10s26', text: "6800 százasra", categoryId: 'marad' },
      { id: 'r10s27', text: "4510 tízesre", categoryId: 'marad' }
    ]
  }
];

const ROUNDING_10000_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: ROUNDING_10000_SORTER_LEVELS_LIST[0],
  2: ROUNDING_10000_SORTER_LEVELS_LIST[1],
  3: ROUNDING_10000_SORTER_LEVELS_LIST[2]
};

export const Rounding10000Sorter: React.FC<Rounding10000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-kerekites-sorter',
  topicTitle = "10. Számszomszédok, kerekítés – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szamszomszedok-kerekites"
      title={topicTitle}
      subtitle="Válogasd szét a számokat a kerekített értékük szerint!"
      levels={ROUNDING_10000_SORTER_LEVELS}
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

export default Rounding10000Sorter;
