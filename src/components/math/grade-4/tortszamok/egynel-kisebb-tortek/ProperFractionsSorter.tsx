import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ProperFractionsSorterProps {
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

export const PROPER_FRACTIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: 1 harmad, 2 harmad vagy 3 negyed?',
    description: 'Válogasd szét, melyik törtrészről van szó!',
    categories: [
      { id: 't1', name: '1 harmad', color: 'blue' },
      { id: 't2', name: '2 harmad', color: 'emerald' },
      { id: 'q3', name: '3 negyed', color: 'amber' }
    ],
    items: [
      { id: 'pfs1', text: 'A francia zászló piros csíkja', categoryId: 't1' },
      { id: 'pfs2', text: '12 pohárból 4 piros', categoryId: 't1' },
      { id: 'pfs3', text: '3 gyöngyből 1 sárga', categoryId: 't1' },
      { id: 'pfs4', text: 'Az osztrák zászló piros része', categoryId: 't2' },
      { id: 'pfs5', text: '12 pohárból 8 sárga', categoryId: 't2' },
      { id: 'pfs6', text: '3 gyöngyből 2 piros', categoryId: 't2' },
      { id: 'pfs7', text: '4 gyöngyből 3 piros', categoryId: 'q3' },
      { id: 'pfs8', text: '12 autóból 9 nem kék', categoryId: 'q3' },
      { id: 'pfs9', text: '4 egyforma csíkból 3 színes', categoryId: 'q3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mennyi a fehér rész?',
    description: 'Gondold végig, mennyi hiányzik az egészhez, és válogasd szét!',
    categories: [
      { id: 'w4', name: 'fehér: 1 negyed', color: 'purple' },
      { id: 'w3', name: 'fehér: 1 harmad', color: 'teal' },
      { id: 'w5', name: 'fehér: 2 ötöd', color: 'rose' }
    ],
    items: [
      { id: 'pfs10', text: '3 negyed része színes, a többi fehér', categoryId: 'w4' },
      { id: 'pfs11', text: 'A pizza 3 negyedét megették – ennyi maradt', categoryId: 'w4' },
      { id: 'pfs12', text: '4 egyforma csíkból 3 zöld – a fehér rész', categoryId: 'w4' },
      { id: 'pfs13', text: '2 harmad része színes, a többi fehér', categoryId: 'w3' },
      { id: 'pfs14', text: 'A torta 2 harmadát megették – ennyi maradt', categoryId: 'w3' },
      { id: 'pfs15', text: 'Az osztrák zászló fehér csíkja', categoryId: 'w3' },
      { id: 'pfs16', text: '3 ötöd része színes, a többi fehér', categoryId: 'w5' },
      { id: 'pfs17', text: '5 kockából 3 sötét – a világos rész', categoryId: 'w5' },
      { id: 'pfs18', text: 'A szalag 3 ötödét befestettük – a festetlen rész', categoryId: 'w5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik ország zászlaja?',
    description: 'A tankönyv zászlói alapján válogasd szét az állításokat!',
    categories: [
      { id: 'de', name: 'Németország', color: 'amber' },
      { id: 'at', name: 'Ausztria', color: 'rose' },
      { id: 'hu', name: 'Magyarország', color: 'emerald' }
    ],
    items: [
      { id: 'pfs19', text: 'A zászló 1 harmada fekete', categoryId: 'de' },
      { id: 'pfs20', text: 'A zászló 1 harmada sárga', categoryId: 'de' },
      { id: 'pfs21', text: '1 harmada piros, és nincs benne se zöld, se fehér', categoryId: 'de' },
      { id: 'pfs22', text: 'A zászló 2 harmada piros', categoryId: 'at' },
      { id: 'pfs23', text: 'Két piros csík között 1 fehér csík', categoryId: 'at' },
      { id: 'pfs24', text: 'Manó családja ide utazik', categoryId: 'at' },
      { id: 'pfs25', text: 'A zászló 1 harmada zöld', categoryId: 'hu' },
      { id: 'pfs26', text: 'Piros, fehér és zöld harmadok', categoryId: 'hu' },
      { id: 'pfs27', text: 'Gergő családja ide utazik, egy tóhoz', categoryId: 'hu' }
    ]
  }
];

const PROPER_FRACTIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: PROPER_FRACTIONS_SORTER_LEVELS_LIST[0],
  2: PROPER_FRACTIONS_SORTER_LEVELS_LIST[1],
  3: PROPER_FRACTIONS_SORTER_LEVELS_LIST[2]
};

export const ProperFractionsSorter: React.FC<ProperFractionsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-frac-egynel-kisebb-sorter',
  topicTitle = '2. Egynél kisebb törtek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="egynel-kisebb-tortek"
      title={topicTitle}
      subtitle="Harmadok és negyedek, színes és fehér részek, zászlók."
      levels={PROPER_FRACTIONS_SORTER_LEVELS}
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

export default ProperFractionsSorter;
