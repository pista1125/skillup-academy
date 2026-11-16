import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Numbers1000SorterProps {
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

const NUMBERS_1000_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Páros, páratlan, kerek tízes',
    description: 'Nézd meg az utolsó számjegyet! Hová tartozik a szám?',
    categories: [
      { id: 'even', name: 'Páros, de nem kerek tízes', color: 'blue' },
      { id: 'odd', name: 'Páratlan', color: 'amber' },
      { id: 'round', name: 'Kerek tízes (0-ra végződik)', color: 'emerald' }
    ],
    items: [
      { id: 'n1s1', text: '242', categoryId: 'even' },
      { id: 'n1s2', text: '756', categoryId: 'even' },
      { id: 'n1s3', text: '928', categoryId: 'even' },
      { id: 'n1s4', text: '137', categoryId: 'odd' },
      { id: 'n1s5', text: '595', categoryId: 'odd' },
      { id: 'n1s6', text: '999', categoryId: 'odd' },
      { id: 'n1s7', text: '640', categoryId: 'round' },
      { id: 'n1s8', text: '360', categoryId: 'round' },
      { id: 'n1s9', text: '900', categoryId: 'round' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Százasra kerekítve',
    description: 'Kerekítsd százasra a számot, és tedd a megfelelő csoportba!',
    categories: [
      { id: 'r300', name: '≈ 300', color: 'purple' },
      { id: 'r400', name: '≈ 400', color: 'rose' },
      { id: 'r500', name: '≈ 500', color: 'teal' }
    ],
    items: [
      { id: 'n1s10', text: '251', categoryId: 'r300' },
      { id: 'n1s11', text: '349', categoryId: 'r300' },
      { id: 'n1s12', text: '320', categoryId: 'r300' },
      { id: 'n1s13', text: '350', categoryId: 'r400' },
      { id: 'n1s14', text: '372', categoryId: 'r400' },
      { id: 'n1s15', text: '449', categoryId: 'r400' },
      { id: 'n1s16', text: '450', categoryId: 'r500' },
      { id: 'n1s17', text: '505', categoryId: 'r500' },
      { id: 'n1s18', text: '536', categoryId: 'r500' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyit ér a 7-es?',
    description: 'Mennyi a 7-es számjegy valódi értéke a számban?',
    categories: [
      { id: 'v7', name: '7 (egyesek helyén)', color: 'amber' },
      { id: 'v70', name: '70 (tízesek helyén)', color: 'blue' },
      { id: 'v700', name: '700 (százasok helyén)', color: 'rose' }
    ],
    items: [
      { id: 'n1s19', text: '307', categoryId: 'v7' },
      { id: 'n1s20', text: '967', categoryId: 'v7' },
      { id: 'n1s21', text: '137', categoryId: 'v7' },
      { id: 'n1s22', text: '274', categoryId: 'v70' },
      { id: 'n1s23', text: '79', categoryId: 'v70' },
      { id: 'n1s24', text: '578', categoryId: 'v70' },
      { id: 'n1s25', text: '708', categoryId: 'v700' },
      { id: 'n1s26', text: '756', categoryId: 'v700' },
      { id: 'n1s27', text: '7 százas és 2 tízes', categoryId: 'v700' }
    ]
  }
];

const NUMBERS_1000_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NUMBERS_1000_SORTER_LEVELS_LIST[0],
  2: NUMBERS_1000_SORTER_LEVELS_LIST[1],
  3: NUMBERS_1000_SORTER_LEVELS_LIST[2]
};

export const Numbers1000Sorter: React.FC<Numbers1000SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-count-szamok-1000-sorter',
  topicTitle = '1. Számok 0-tól 1000-ig – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szamok-0-tol-1000-ig"
      title={topicTitle}
      subtitle="Csoportosítsd a számokat: páros vagy páratlan, kerekített érték, valódi érték!"
      levels={NUMBERS_1000_SORTER_LEVELS}
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

export default Numbers1000Sorter;
