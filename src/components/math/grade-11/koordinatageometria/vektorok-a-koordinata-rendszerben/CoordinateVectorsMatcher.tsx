import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CoordinateVectorsMatcherProps {
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

const COORDINATE_VECTORS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak és képletek',
    description: 'Párosítsd a fogalmat a koordinátás alakjával vagy jelentésével!',
    pairs: [
      { id: 'cvm1', left: 'Az →i bázisvektor', right: '(1; 0)' },
      { id: 'cvm2', left: 'A →j bázisvektor', right: '(0; 1)' },
      { id: 'cvm3', left: 'Az A pont helyvektora', right: 'Az origóból az A pontba mutató vektor' },
      { id: 'cvm4', left: '→a = a₁→i + a₂→j', right: '→a(a₁; a₂)' },
      { id: 'cvm5', left: '→AB koordinátái', right: '(b₁ − a₁; b₂ − a₂)' },
      { id: 'cvm6', left: '(v₁; v₂) +90°-os elforgatottja', right: '(−v₂; v₁)' },
      { id: 'cvm7', left: '(v₁; v₂) −90°-os elforgatottja', right: '(v₂; −v₁)' },
      { id: 'cvm8', left: 'A →v(v₁; v₂) hossza', right: '√(v₁² + v₂²)' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számolás koordinátákkal',
    description: 'Párosítsd a műveletet vagy a vektort az eredménnyel!',
    pairs: [
      { id: 'cvm9', left: '→p(1; 3) + →q(3; −1)', right: '(4; 2)' },
      { id: 'cvm10', left: '→p(1; 3) − →s(3; −1)', right: '(−2; 4)' },
      { id: 'cvm11', left: '2 · →r, ahol →r(−3; 1)', right: '(−6; 2)' },
      { id: 'cvm12', left: '→AB, ha A(1; 2), B(2; 5)', right: '(1; 3)' },
      { id: 'cvm13', left: '→FE, ha F(2; −2), E(−1; −1)', right: '(−3; 1)' },
      { id: 'cvm14', left: '3→i − 2→j', right: '(3; −2)' },
      { id: 'cvm15', left: 'A D(−2; 3) pont helyvektora', right: '−2→i + 3→j' },
      { id: 'cvm16', left: '→v(3; 1) +90°-os elforgatottja', right: '(−1; 3)' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vektorok hossza',
    description: 'Párosítsd a vektort vagy műveletet a hosszával!',
    pairs: [
      { id: 'cvm17', left: '→v(3; 4)', right: '5' },
      { id: 'cvm18', left: '→p(1; 3)', right: '√10' },
      { id: 'cvm19', left: '→v(−2; −7)', right: '√53' },
      { id: 'cvm20', left: '→b(12; 5)', right: '13' },
      { id: 'cvm21', left: '→c(−20; −21)', right: '29' },
      { id: 'cvm22', left: '(5; −12) + (4; −3)', right: '√306 = 3√34' },
      { id: 'cvm23', left: '→u − →v, ahol →u(1; −5), →v(2; 1)', right: '√37' },
      { id: 'cvm24', left: '−2 · →a, ahol →a(3; −4)', right: '10' }
    ]
  }
];

const COORDINATE_VECTORS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COORDINATE_VECTORS_MATCHER_LEVELS_LIST[0],
  2: COORDINATE_VECTORS_MATCHER_LEVELS_LIST[1],
  3: COORDINATE_VECTORS_MATCHER_LEVELS_LIST[2]
};

export const CoordinateVectorsMatcher: React.FC<CoordinateVectorsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-vektor-koordinatak-matcher',
  topicTitle = '5. Vektorok a koordináta-rendszerben – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="vektorok-a-koordinata-rendszerben"
      title={topicTitle}
      subtitle="Gyakorold a vektorok koordinátáit: fogalmak, műveletek, elforgatás és hossz koordinátákkal!"
      levels={COORDINATE_VECTORS_MATCHER_LEVELS}
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

export default CoordinateVectorsMatcher;
