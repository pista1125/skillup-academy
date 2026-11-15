import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MidpointMatcherProps {
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

const MIDPOINT_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Képletek',
    description: 'Párosítsd a feladatot a hozzá tartozó képlettel!',
    pairs: [
      { id: 'mpm1', left: 'AB felezőpontja', right: 'F((a₁ + b₁)/2; (a₂ + b₂)/2)' },
      { id: 'mpm2', left: 'A felezőpont helyvektora', right: '→f = ½(→a + →b)' },
      { id: 'mpm3', left: 'A B végpont az F felezőpontból és A-ból', right: 'B = 2F − A' },
      { id: 'mpm4', left: 'Az X pont tükrözése a P pontra', right: 'X′ = 2P − X' },
      { id: 'mpm5', left: 'Az ABC háromszög súlypontja', right: 'S = (A + B + C)/3' },
      { id: 'mpm6', left: 'Az ABCD paralelogramma D csúcsa', right: 'D = A + C − B' },
      { id: 'mpm7', left: 'PQ Q-hoz legközelebbi negyedelőpontja', right: 'P + ¾ · →PQ' },
      { id: 'mpm8', left: 'X nagyítása O-ból λ arányban', right: 'X′ = O + λ · →OX' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Felezőpontok',
    description: 'Párosítsd a szakaszt a felezőpontjával!',
    pairs: [
      { id: 'mpm9', left: 'A(1; 3), B(5; 7)', right: 'F(3; 5)' },
      { id: 'mpm10', left: 'A(−2; 6), B(4; −2)', right: 'F(1; 2)' },
      { id: 'mpm11', left: 'O(0; 0), A(−6; 10)', right: 'F(−3; 5)' },
      { id: 'mpm12', left: 'A(−5; −1), B(3; −7)', right: 'F(−1; −4)' },
      { id: 'mpm13', left: 'A(7; 2), B(−1; 2)', right: 'F(3; 2)' },
      { id: 'mpm14', left: 'A(2,5; 1), B(0,5; −3)', right: 'F(1,5; −1)' },
      { id: 'mpm15', left: 'Mozgólépcső: A(0; −2), B(12; 4)', right: 'F(6; 1)' },
      { id: 'mpm16', left: 'P(−4; 16), Q(20; −2)', right: 'F(8; 7)' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Visszafelé, súlypont, paralelogramma',
    description: 'Párosítsd az adatokat a keresett ponttal!',
    pairs: [
      { id: 'mpm17', left: 'F(3; −2) az AB felezőpontja, A(1; 4) – a B pont', right: 'B(5; −8)' },
      { id: 'mpm18', left: 'F(0; 5) az AB felezőpontja, A(−4; 2) – a B pont', right: 'B(4; 8)' },
      { id: 'mpm19', left: 'Súlypont: (0; 0), (6; 0), (3; 6)', right: 'S(3; 2)' },
      { id: 'mpm20', left: 'Súlypont: (−3; 4), (5; −2), (1; 7)', right: 'S(1; 3)' },
      { id: 'mpm21', left: 'ABCD paralelogramma: A(−2; 1), B(3; 6), C(4; 5) – a D csúcs', right: 'D(−1; 0)' },
      { id: 'mpm22', left: 'Négyzet: K(7; −8) középpont, A(−3; 16) – a C csúcs', right: 'C(17; −32)' },
      { id: 'mpm23', left: 'A(−2; 5), B(−3; −1), AB meghosszabbítása B-n túl', right: 'C(−4; −7)' },
      { id: 'mpm24', left: 'Oldalfelező pontok P(4; −4), Q(−1; −3), R(−2; −1) – az A csúcs', right: 'A(5; −6)' }
    ]
  }
];

const MIDPOINT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MIDPOINT_MATCHER_LEVELS_LIST[0],
  2: MIDPOINT_MATCHER_LEVELS_LIST[1],
  3: MIDPOINT_MATCHER_LEVELS_LIST[2]
};

export const MidpointMatcher: React.FC<MidpointMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-felezopont-matcher',
  topicTitle = '7. Felezőpont – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="felezopont"
      title={topicTitle}
      subtitle="Gyakorold a felezőpont, az osztópontok, a tükrözés és a súlypont koordinátáinak kiszámítását!"
      levels={MIDPOINT_MATCHER_LEVELS}
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

export default MidpointMatcher;
