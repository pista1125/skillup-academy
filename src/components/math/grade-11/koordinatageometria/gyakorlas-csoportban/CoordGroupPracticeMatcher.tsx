import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CoordGroupPracticeMatcherProps {
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

const COORD_GROUP_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Összefüggések',
    description: 'Párosítsd a fogalmat a koordinátás alakjával!',
    pairs: [
      { id: 'cgm1', left: 'Az →AB vektor koordinátái', right: 'B − A (végpont − kezdőpont)' },
      { id: 'cgm2', left: 'A →v(v₁; v₂) vektor hossza', right: '√(v₁² + v₂²)' },
      { id: 'cgm3', left: '(v₁; v₂) +90°-os elforgatottja', right: '(−v₂; v₁)' },
      { id: 'cgm4', left: '(v₁; v₂) −90°-os elforgatottja', right: '(v₂; −v₁)' },
      { id: 'cgm5', left: '→a = 3→i − 2→j', right: '→a(3; −2)' },
      { id: 'cgm6', left: 'Paralelogramma C csúcsa az A csúcsból és a K középpontból', right: 'C = 2K − A' },
      { id: 'cgm7', left: 'Négyzet területe az e átlóból', right: 'e²/2' },
      { id: 'cgm8', left: 'Egy négyszög oldalfelező pontjai által alkotott négyszög', right: 'paralelogramma' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Számolás vektorokkal',
    description: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { id: 'cgm9', left: '|(6; −8)|', right: '10' },
      { id: 'cgm10', left: '|(12; 5)|', right: '13' },
      { id: 'cgm11', left: '(6; −8) +90°-kal elforgatva', right: '(8; 6)' },
      { id: 'cgm12', left: '(3; −4) +90°-kal elforgatva', right: '(4; 3)' },
      { id: 'cgm13', left: '→AB, ha A(−4; −3), B(3; −1)', right: '(7; 2)' },
      { id: 'cgm14', left: '(6; −8) − (12; 5)', right: '(−6; −13)' },
      { id: 'cgm15', left: '|(−1; 8)|', right: '√65' },
      { id: 'cgm16', left: '|(1; −3)|', right: '√10' }
    ]
  },
  {
    level: 3,
    title: '3. szint: A csoportmunka feladatai',
    description: 'Párosítsd a feladatot a végeredményével!',
    pairs: [
      { id: 'cgm17', left: 'A(−4; −3), K(−1; 2) – a C csúcs', right: 'C(2; 7)' },
      { id: 'cgm18', left: 'B(3; −1), K(−1; 2) – a D csúcs', right: 'D(−5; 5)' },
      { id: 'cgm19', left: 'Négyzet, A(−3; 1), C(0; 6) – terület', right: '17' },
      { id: 'cgm20', left: 'Négyzet, K(−4; −2,5), A(−3; −5,5) – terület', right: '20' },
      { id: 'cgm21', left: 'A(3; −10), B(−3; −6), C(1; 4) – ABCD negyedik csúcsa', right: 'D(7; 0)' },
      { id: 'cgm22', left: 'A(5; −12), B(−6; 8), K(−1; −4) – az átlók hossza', right: '20 és 26' },
      { id: 'cgm23', left: 'Négyzet, középpont az origó, A(5; −12) – terület', right: '338' },
      { id: 'cgm24', left: 'Nyolcszög, O(1; 3), A(4; −1) – a C csúcs', right: 'C(5; 6)' }
    ]
  }
];

const COORD_GROUP_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COORD_GROUP_MATCHER_LEVELS_LIST[0],
  2: COORD_GROUP_MATCHER_LEVELS_LIST[1],
  3: COORD_GROUP_MATCHER_LEVELS_LIST[2]
};

export const CoordGroupPracticeMatcher: React.FC<CoordGroupPracticeMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-csoportmunka-matcher',
  topicTitle = '8. Gyakorlás csoportban – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="gyakorlas-csoportban"
      title={topicTitle}
      subtitle="Ismételd át a vektorok koordinátáit, hosszát és elforgatását, valamint a paralelogrammák és négyzetek csúcsait!"
      levels={COORD_GROUP_MATCHER_LEVELS}
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

export default CoordGroupPracticeMatcher;
