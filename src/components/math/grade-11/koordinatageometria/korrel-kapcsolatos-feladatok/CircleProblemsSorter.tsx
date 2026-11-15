import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CircleProblemsSorterProps {
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

const CIRCLE_PROBLEMS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Az egyenes és az x² + y² = 25 kör',
    description: 'Hány közös pontja van az egyenesnek a körrel?',
    categories: [
      { id: 'two', name: 'Szelő (2 közös pont)', color: 'rose' },
      { id: 'one', name: 'Érintő (1 közös pont)', color: 'amber' },
      { id: 'zero', name: 'Nincs közös pont', color: 'slate' }
    ],
    items: [
      { id: 'cps1', text: 'y = x + 1', categoryId: 'two' },
      { id: 'cps2', text: 'x = 3', categoryId: 'two' },
      { id: 'cps3', text: 'y = 0', categoryId: 'two' },
      { id: 'cps4', text: 'y = 5', categoryId: 'one' },
      { id: 'cps5', text: 'x = −5', categoryId: 'one' },
      { id: 'cps6', text: 'y = −5', categoryId: 'one' },
      { id: 'cps7', text: 'y = x + 8', categoryId: 'zero' },
      { id: 'cps8', text: 'x = 6', categoryId: 'zero' },
      { id: 'cps9', text: 'y = 7', categoryId: 'zero' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány érintő húzható az (x + 1)² + (y − 1,5)² = 16,25 körhöz?',
    description: 'Döntsd el, hogy a pont a körön belül, a körön vagy azon kívül van!',
    categories: [
      { id: 'zero', name: '0 érintő (belső pont)', color: 'rose' },
      { id: 'one', name: '1 érintő (a kör pontja)', color: 'amber' },
      { id: 'two', name: '2 érintő (külső pont)', color: 'emerald' }
    ],
    items: [
      { id: 'cps10', text: 'P(−3; 4,5)', categoryId: 'zero' },
      { id: 'cps11', text: '(−1; 1,5)', categoryId: 'zero' },
      { id: 'cps12', text: '(0; 0)', categoryId: 'zero' },
      { id: 'cps13', text: 'Q(−5; 1)', categoryId: 'one' },
      { id: 'cps14', text: 'A(−5; 2)', categoryId: 'one' },
      { id: 'cps15', text: 'C(1; −2)', categoryId: 'one' },
      { id: 'cps16', text: 'S(2; 5)', categoryId: 'two' },
      { id: 'cps17', text: '(4; 0)', categoryId: 'two' },
      { id: 'cps18', text: '(−6; −3)', categoryId: 'two' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Fogható-e a rádióadás? (adó: P(−3; 2), hatókör: 15 egység)',
    description: 'Számold ki (x + 3)² + (y − 2)² értékét, és hasonlítsd össze 225-tel!',
    categories: [
      { id: 'in', name: 'Fogható (a hatókörön belül)', color: 'emerald' },
      { id: 'edge', name: 'Pontosan a hatókör határán', color: 'amber' },
      { id: 'out', name: 'Nem fogható', color: 'rose' }
    ],
    items: [
      { id: 'cps19', text: 'A(8; −4)', categoryId: 'in' },
      { id: 'cps20', text: 'D(11; 7)', categoryId: 'in' },
      { id: 'cps21', text: '(0; 0)', categoryId: 'in' },
      { id: 'cps22', text: 'C(6; −10)', categoryId: 'edge' },
      { id: 'cps23', text: 'F(9; 11)', categoryId: 'edge' },
      { id: 'cps24', text: '(12; 2)', categoryId: 'edge' },
      { id: 'cps25', text: 'B(9; −11)', categoryId: 'out' },
      { id: 'cps26', text: 'E(−9; 16)', categoryId: 'out' },
      { id: 'cps27', text: '(13; 0)', categoryId: 'out' }
    ]
  }
];

const CIRCLE_PROBLEMS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: CIRCLE_PROBLEMS_SORTER_LEVELS_LIST[0],
  2: CIRCLE_PROBLEMS_SORTER_LEVELS_LIST[1],
  3: CIRCLE_PROBLEMS_SORTER_LEVELS_LIST[2]
};

export const CircleProblemsSorter: React.FC<CircleProblemsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-kor-feladatok-sorter',
  topicTitle = '12. Körrel kapcsolatos feladatok – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="korrel-kapcsolatos-feladatok"
      title={topicTitle}
      subtitle="Rendszerezd az egyeneseket a körhöz viszonyított helyzetük szerint, számold meg az érintőket, és döntsd el, hol fogható a rádióadás!"
      levels={CIRCLE_PROBLEMS_SORTER_LEVELS}
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

export default CircleProblemsSorter;
