import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11CircleEquationMatcherProps {
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

const G11_CIRCLE_EQUATION_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Középpont és sugár leolvasása',
    description: 'Párosítsd a kör egyenletét a középpontjával és a sugarával!',
    pairs: [
      { id: 'cem1', left: '(x − 5)² + (y − 3)² = 4', right: 'C(5; 3), r = 2' },
      { id: 'cem2', left: '(x − 5)² + (y + 3)² = 16', right: 'C(5; −3), r = 4' },
      { id: 'cem3', left: '(x + 5)² + (y − 3)² = 0,25', right: 'C(−5; 3), r = 0,5' },
      { id: 'cem4', left: 'x² + y² = 100', right: 'C(0; 0), r = 10' },
      { id: 'cem5', left: '(x − 3)² + (y − 6)² = 100', right: 'C(3; 6), r = 10' },
      { id: 'cem6', left: '(x + 4)² + (y − 2)² = 25', right: 'C(−4; 2), r = 5' },
      { id: 'cem7', left: '(x − 2)² + (y + 1)² = 10', right: 'C(2; −1), r = √10' },
      { id: 'cem8', left: '(x + 7)² + (y − 1)² = 289', right: 'C(−7; 1), r = 17' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Adatokból az egyenlet',
    description: 'Párosítsd a kör adatait a kör egyenletével!',
    pairs: [
      { id: 'cem9', left: 'C(4; 2), átmegy az A(−1; −10) ponton', right: '(x − 4)² + (y − 2)² = 169' },
      { id: 'cem10', left: 'C(−2; 2), átmegy az A(1; −3) ponton', right: '(x + 2)² + (y − 2)² = 34' },
      { id: 'cem11', left: 'Átmérő: A(1; −14), B(−15; 16)', right: '(x + 7)² + (y − 1)² = 289' },
      { id: 'cem12', left: 'Az A(14; −24), C(0; 24) szemközti csúcsú négyzet köré írt kör', right: '(x − 7)² + y² = 625' },
      { id: 'cem13', left: 'Origó középpontú, átmegy a (3; 4) ponton', right: 'x² + y² = 25' },
      { id: 'cem14', left: 'K′(5; −2), r = 5', right: '(x − 5)² + (y + 2)² = 25' },
      { id: 'cem15', left: 'A kezdőkör (O középpont, r = 9,15)', right: 'x² + y² = 83,7225' },
      { id: 'cem16', left: 'A C(2; −5) ponttól 10 egységre lévő pontok', right: '(x − 2)² + (y + 5)² = 100' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Teljes négyzetté kiegészítés',
    description: 'Alakítsd át az egyenletet, és párosítsd azzal, amit leír!',
    pairs: [
      { id: 'cem17', left: 'x² + y² − 6x + 4y − 12 = 0', right: 'C(3; −2), r = 5' },
      { id: 'cem18', left: 'x² + y² + 8x − 2y + 8 = 0', right: 'C(−4; 1), r = 3' },
      { id: 'cem19', left: 'x² + y² + 2x − 3y − 13 = 0', right: 'C(−1; 1,5), r = √16,25' },
      { id: 'cem20', left: 'x² + y² − 10x = 0', right: 'C(5; 0), r = 5' },
      { id: 'cem21', left: 'x² + y² + 4y = 0', right: 'C(0; −2), r = 2' },
      { id: 'cem22', left: 'x² + y² − 2x − 2y − 2 = 0', right: 'C(1; 1), r = 2' },
      { id: 'cem23', left: 'x² + y² + 4x − 6y + 13 = 0', right: 'csak a (−2; 3) pont' },
      { id: 'cem24', left: 'x² + y² − 10x + 30 = 0', right: 'nincs ilyen pont' }
    ]
  }
];

const G11_CIRCLE_EQUATION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: G11_CIRCLE_EQUATION_MATCHER_LEVELS_LIST[0],
  2: G11_CIRCLE_EQUATION_MATCHER_LEVELS_LIST[1],
  3: G11_CIRCLE_EQUATION_MATCHER_LEVELS_LIST[2]
};

export const G11CircleEquationMatcher: React.FC<G11CircleEquationMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-kor-egyenlete-matcher',
  topicTitle = '11. A kör egyenlete – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="a-kor-egyenlete"
      title={topicTitle}
      subtitle="Gyakorold a kör egyenletének felírását, a középpont és a sugár leolvasását és a teljes négyzetté kiegészítést!"
      levels={G11_CIRCLE_EQUATION_MATCHER_LEVELS}
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

export default G11CircleEquationMatcher;
