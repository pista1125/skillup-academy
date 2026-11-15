import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CircleProblemsMatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const CIRCLE_PROBLEMS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat vagy helyzetet a jellemzőjével!',
    pairs: [
      { id: 'cpm1', left: 'Szelő', right: '2 közös pontja van a körrel' },
      { id: 'cpm2', left: 'Érintő', right: 'Pontosan 1 közös pontja van a körrel' },
      { id: 'cpm3', left: 'Érintő és az érintési pontba húzott sugár', right: 'Merőlegesek egymásra' },
      { id: 'cpm4', left: 'Derékszögű háromszög köré írt körének középpontja', right: 'Az átfogó felezőpontja' },
      { id: 'cpm5', left: 'Derékszögű háromszög köré írt körének sugara', right: 'Az átfogó fele' },
      { id: 'cpm6', left: 'Körön belüli pontból húzható érintők', right: '0 érintő' },
      { id: 'cpm7', left: 'A kör egy pontján átmenő érintők', right: '1 érintő' },
      { id: 'cpm8', left: 'Körön kívüli pontból húzható érintők', right: '2 érintő' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Közös pontok',
    description: 'Oldd meg az egyenletrendszert, és párosítsd a közös pontokkal!',
    pairs: [
      { id: 'cpm9', left: '(x − 2)² + (y − 1)² = 8,5 és x = 3,5', right: '(3,5; 3,5) és (3,5; −1,5)' },
      { id: 'cpm10', left: 'x² + y² = 25 és y = x + 1', right: '(3; 4) és (−4; −3)' },
      { id: 'cpm11', left: 'x² + y² = 25 és y = 5', right: 'csak (0; 5)' },
      { id: 'cpm12', left: 'x² + y² = 25 és y = x + 8', right: 'nincs közös pont' },
      { id: 'cpm13', left: '(x + 5)² + (y + 3)² = 25 és y = −6', right: '(−1; −6) és (−9; −6)' },
      { id: 'cpm14', left: 'x² + (y + 32)² = 1600 és y = 0', right: '(−24; 0) és (24; 0)' },
      { id: 'cpm15', left: 'x² + (y + 32)² = 1600 és x = 0 (felső ív)', right: '(0; 8)' },
      { id: 'cpm16', left: '(x − 1,5)² + (y − 1,5)² = 8,5 és x = 0', right: '(0; 4) és (0; −1)' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Feladatból egyenlet',
    description: 'Párosítsd a feladatot a hozzá tartozó egyenlettel vagy eredménnyel!',
    pairs: [
      { id: 'cpm17', left: 'A(−5; 2), B(3; 1), C(1; −2) köré írt köre', right: '(x + 1)² + (y − 1,5)² = 16,25' },
      { id: 'cpm18', left: 'A(7; 6), B(−1; −3), C(−3; 2) köré írt köre', right: '(x − 3)² + (y − 1,5)² = 36,25' },
      { id: 'cpm19', left: 'C(−5; −3) középpontú, az y tengelyt érintő kör', right: '(x + 5)² + (y + 3)² = 25' },
      { id: 'cpm20', left: 'C(2; 1) középpontú, az x tengelyt érintő kör', right: '(x − 2)² + (y − 1)² = 1' },
      { id: 'cpm21', left: 'Az A(−1; 0), B(4; 3) szakasz Thalész-köre', right: '(x − 1,5)² + (y − 1,5)² = 8,5' },
      { id: 'cpm22', left: 'A vasúti híd íve', right: 'r = 40 m, középpont (0; −32)' },
      { id: 'cpm23', left: 'P(−3; 2) rádióadó, 15 egység hatókör', right: '(x + 3)² + (y − 2)² ≤ 225' },
      { id: 'cpm24', left: 'x² + y² = 25 érintője a (3; 4) pontban', right: 'y = −0,75x + 6,25' }
    ]
  }
];

const CIRCLE_PROBLEMS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: CIRCLE_PROBLEMS_MATCHER_LEVELS_LIST[0],
  2: CIRCLE_PROBLEMS_MATCHER_LEVELS_LIST[1],
  3: CIRCLE_PROBLEMS_MATCHER_LEVELS_LIST[2]
};

export const CircleProblemsMatcher: React.FC<CircleProblemsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-kor-feladatok-matcher',
  topicTitle = '12. Körrel kapcsolatos feladatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="korrel-kapcsolatos-feladatok"
      title={topicTitle}
      subtitle="Gyakorold a kör és az egyenes közös pontjainak kiszámítását, az érintőket és a köré írt kör egyenletét!"
      levels={CIRCLE_PROBLEMS_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default CircleProblemsMatcher;
