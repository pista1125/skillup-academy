import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface PerpendicularParallelMatcherProps {
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

const PERPENDICULAR_PARALLEL_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Merőleges meredekség',
    description: 'Párosítsd a meredekséget a rá merőleges egyenes meredekségével!',
    pairs: [
      { id: 'ppm1', left: 'm = 1/2', right: 'm = −2' },
      { id: 'ppm2', left: 'm = 2', right: 'm = −1/2' },
      { id: 'ppm3', left: 'm = −4', right: 'm = 1/4' },
      { id: 'ppm4', left: 'm = 2/3', right: 'm = −3/2' },
      { id: 'ppm5', left: 'm = −2/5', right: 'm = 5/2' },
      { id: 'ppm6', left: 'm = 1', right: 'm = −1' },
      { id: 'ppm7', left: 'm = 3/4', right: 'm = −4/3' },
      { id: 'ppm8', left: 'm = 0 (y = b)', right: 'nincs meredekség (x = c)' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Párhuzamos vagy merőleges egyenes',
    description: 'Párosítsd a feladatot a keresett egyenes egyenletével!',
    pairs: [
      { id: 'ppm9', left: 'P(5; 2)-n át, párhuzamos az y = −3 egyenessel', right: 'y = 2' },
      { id: 'ppm10', left: 'P(5; 2)-n át, merőleges az y = −3 egyenesre', right: 'x = 5' },
      { id: 'ppm11', left: 'Origón át, párhuzamos →v(5; −2)-vel', right: 'y = −2/5 x' },
      { id: 'ppm12', left: 'P(0; 2)-n át, párhuzamos az y = −2/5 x egyenessel', right: 'y = −2/5 x + 2' },
      { id: 'ppm13', left: 'Origón át, merőleges az y = −2/5 x egyenesre', right: 'y = 5/2 x' },
      { id: 'ppm14', left: 'Origón át, párhuzamos a 4x − 3y = 12 egyenessel', right: '4x − 3y = 0' },
      { id: 'ppm15', left: 'C(8; 10)-en át, párhuzamos AB-vel (A(−4; −2), B(4; 2))', right: 'y = 1/2 x + 6' },
      { id: 'ppm16', left: 'Origón át, merőleges az y = 3/4 x − 2 egyenesre', right: 'y = −4/3 x' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Alkalmazások',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'ppm17', left: '6x − 15y = 2 ⊥ 9x + py = 5', right: 'p = 3,6' },
      { id: 'ppm18', left: '6x − 15y = 2 ∥ 9x + py = 5', right: 'p = −22,5' },
      { id: 'ppm19', left: 'A(−3; 2), B(5; −4), C(0; 1): B-ből induló magasságvonal', right: 'y = 3x − 19' },
      { id: 'ppm20', left: 'A(−3; 2), B(5; −4): AB felezőmerőlegese', right: '4x − 3y = 7' },
      { id: 'ppm21', left: 'A(−3; 2) távolsága az x + y = 1 egyenestől', right: '√2 ≈ 1,41' },
      { id: 'ppm22', left: 'Az origó távolsága a 3x + 4y = 10 egyenestől', right: '2' },
      { id: 'ppm23', left: 'y = 2x + 1 és y = 2x − 4 távolsága', right: '√5 ≈ 2,24' },
      { id: 'ppm24', left: 'A(−4; −2), B(4; 2), C(8; 10), D(0; 6)', right: 'rombusz' }
    ]
  }
];

const PERPENDICULAR_PARALLEL_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: PERPENDICULAR_PARALLEL_MATCHER_LEVELS_LIST[0],
  2: PERPENDICULAR_PARALLEL_MATCHER_LEVELS_LIST[1],
  3: PERPENDICULAR_PARALLEL_MATCHER_LEVELS_LIST[2]
};

export const PerpendicularParallelMatcher: React.FC<PerpendicularParallelMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-meroleges-parhuzamos-matcher',
  topicTitle = '15. Merőleges, párhuzamos egyenesek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="meroleges-parhuzamos-egyenesek"
      title={topicTitle}
      subtitle="Gyakorold a merőleges és párhuzamos egyenesek meredekségét és egyenletét!"
      levels={PERPENDICULAR_PARALLEL_MATCHER_LEVELS}
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

export default PerpendicularParallelMatcher;
