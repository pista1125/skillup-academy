import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LinesInPlaneMatcherProps {
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

const LINES_IN_PLANE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egyenlet és egyenes',
    description: 'Párosítsd az egyenletet az egyenes leírásával!',
    pairs: [
      { id: 'lipm1', left: 'x = 7', right: 'Az x tengelyt a (7; 0) pontban merőlegesen metsző egyenes' },
      { id: 'lipm2', left: 'y = 2', right: 'Vízszintes egyenes, minden pontjának második koordinátája 2' },
      { id: 'lipm3', left: 'y = x', right: 'Az I. és III. síknegyed szögfelezője' },
      { id: 'lipm4', left: 'y = −x', right: 'A II. és IV. síknegyed szögfelezője' },
      { id: 'lipm5', left: 'y = 0', right: 'Az x tengely' },
      { id: 'lipm6', left: 'x = 0', right: 'Az y tengely' },
      { id: 'lipm7', left: 'y = x + 5', right: 'Az y = x egyenes eltoltja a (0; 5) vektorral' },
      { id: 'lipm8', left: 'x = −4', right: 'Az y tengellyel párhuzamos, a (−4; 0) ponton átmenő egyenes' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Két pontból az egyenlet',
    description: 'Párosítsd a két pontot a rajtuk átmenő egyenes egyenletével!',
    pairs: [
      { id: 'lipm9', left: '(0; −3) és (3; 0)', right: 'y = x − 3' },
      { id: 'lipm10', left: '(0; −5) és (−5; 0)', right: 'y = −x − 5' },
      { id: 'lipm11', left: '(0; 4) és (4; 0)', right: 'y = −x + 4' },
      { id: 'lipm12', left: '(0; −4) és (4; 0)', right: 'y = x − 4' },
      { id: 'lipm13', left: '(7; 0) és (7; 5)', right: 'x = 7' },
      { id: 'lipm14', left: '(−2; 6) és (5; 6)', right: 'y = 6' },
      { id: 'lipm15', left: '(0; 2) és (1; 5)', right: 'y = 3x + 2' },
      { id: 'lipm16', left: '(1; 6) és (−3; 2)', right: 'y = x + 5' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Irány, normális, eltolás',
    description: 'Párosítsd a kérdést a válasszal!',
    pairs: [
      { id: 'lipm17', left: 'y = 2x − 3 egy irányvektora', right: '(1; 2)' },
      { id: 'lipm18', left: 'y = 2x − 3 egy normálvektora', right: '(−2; 1)' },
      { id: 'lipm19', left: 'y = −x + 1 egy irányvektora', right: '(1; −1)' },
      { id: 'lipm20', left: 'x = 7 egy normálvektora', right: '(1; 0)' },
      { id: 'lipm21', left: 'y = 2 egy normálvektora', right: '(0; 1)' },
      { id: 'lipm22', left: 'y = x eltolva a (3; 0) vektorral', right: 'y = x − 3' },
      { id: 'lipm23', left: 'y = x eltolva a (2; 2) vektorral', right: 'y = x (önmaga)' },
      { id: 'lipm24', left: 'P(k; 3) az y = −x + 1 egyenesen', right: 'k = −2' }
    ]
  }
];

const LINES_IN_PLANE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LINES_IN_PLANE_MATCHER_LEVELS_LIST[0],
  2: LINES_IN_PLANE_MATCHER_LEVELS_LIST[1],
  3: LINES_IN_PLANE_MATCHER_LEVELS_LIST[2]
};

export const LinesInPlaneMatcher: React.FC<LinesInPlaneMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-egyenes-iranyvektor-matcher',
  topicTitle = '9. Egyenesek a koordináta-rendszerben – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="egyenesek-a-koordinata-rendszerben"
      title={topicTitle}
      subtitle="Gyakorold az egyenesek egyenletét: x = a, y = b, y = ax + b, valamint az irány- és normálvektort!"
      levels={LINES_IN_PLANE_MATCHER_LEVELS}
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

export default LinesInPlaneMatcher;
