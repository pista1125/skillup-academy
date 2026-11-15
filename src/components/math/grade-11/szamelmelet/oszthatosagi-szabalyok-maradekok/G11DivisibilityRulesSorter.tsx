import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11DivisibilityRulesSorterProps {
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

const G11_DIVISIBILITY_RULES_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: 3 és 9 – a számjegyek összege',
    description: 'Add össze a számjegyeket, és sorold be a számot!',
    categories: [
      { id: 'd9', name: 'Osztható 9-cel', color: 'emerald' },
      { id: 'd3', name: '3-mal osztható, 9-cel nem', color: 'blue' },
      { id: 'none', name: '3-mal sem osztható', color: 'rose' }
    ],
    items: [
      { id: 'drs1', text: '11 385', categoryId: 'd9' },
      { id: 'drs2', text: '4851', categoryId: 'd9' },
      { id: 'drs3', text: '459', categoryId: 'd9' },
      { id: 'drs4', text: '1221', categoryId: 'd3' },
      { id: 'drs5', text: '12 345', categoryId: 'd3' },
      { id: 'drs6', text: '1032', categoryId: 'd3' },
      { id: 'drs7', text: '2578', categoryId: 'none' },
      { id: 'drs8', text: '1000', categoryId: 'none' },
      { id: 'drs9', text: '3190', categoryId: 'none' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 4 és 8 – a szám vége',
    description: 'Vizsgáld az utolsó két, illetve három jegyet!',
    categories: [
      { id: 'd8', name: 'Osztható 8-cal', color: 'purple' },
      { id: 'd4', name: '4-gyel osztható, 8-cal nem', color: 'teal' },
      { id: 'none', name: '4-gyel sem osztható', color: 'amber' }
    ],
    items: [
      { id: 'drs10', text: '3152', categoryId: 'd8' },
      { id: 'drs11', text: '1920', categoryId: 'd8' },
      { id: 'drs12', text: '872', categoryId: 'd8' },
      { id: 'drs13', text: '3132', categoryId: 'd4' },
      { id: 'drs14', text: '1876', categoryId: 'd4' },
      { id: 'drs15', text: '7524', categoryId: 'd4' },
      { id: 'drs16', text: '11 385', categoryId: 'none' },
      { id: 'drs17', text: '2578', categoryId: 'none' },
      { id: 'drs18', text: '1030', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékosztályok 7-tel osztva',
    description: 'Melyik maradékosztályba tartozik a szám?',
    categories: [
      { id: 'r1', name: '7k + 1', color: 'emerald' },
      { id: 'r2', name: '7k + 2', color: 'blue' },
      { id: 'r3', name: '7k + 3', color: 'rose' }
    ],
    items: [
      { id: 'drs19', text: '8', categoryId: 'r1' },
      { id: 'drs20', text: '50', categoryId: 'r1' },
      { id: 'drs21', text: '365 (egy közönséges év napjai)', categoryId: 'r1' },
      { id: 'drs22', text: '100', categoryId: 'r2' },
      { id: 'drs23', text: '23', categoryId: 'r2' },
      { id: 'drs24', text: '366 (egy szökőév napjai)', categoryId: 'r2' },
      { id: 'drs25', text: '10', categoryId: 'r3' },
      { id: 'drs26', text: '31 (egy hosszú hónap napjai)', categoryId: 'r3' },
      { id: 'drs27', text: '59', categoryId: 'r3' }
    ]
  }
];

const G11_DIVISIBILITY_RULES_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: G11_DIVISIBILITY_RULES_SORTER_LEVELS_LIST[0],
  2: G11_DIVISIBILITY_RULES_SORTER_LEVELS_LIST[1],
  3: G11_DIVISIBILITY_RULES_SORTER_LEVELS_LIST[2]
};

export const G11DivisibilityRulesSorter: React.FC<G11DivisibilityRulesSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-num-oszthatosagi-szabalyok-sorter',
  topicTitle = '4. Oszthatósági szabályok, osztási maradékok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="oszthatosagi-szabalyok-maradekok"
      title={topicTitle}
      subtitle="Csoportosítsd a számokat a 3-as, 9-es, 4-es és 8-as szabály, valamint a 7-tel vett maradék szerint!"
      levels={G11_DIVISIBILITY_RULES_SORTER_LEVELS}
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

export default G11DivisibilityRulesSorter;
