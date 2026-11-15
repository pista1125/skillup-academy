import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CoordPracticeExamMatcherProps {
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

const COORD_PRACTICE_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Vektorműveletek',
    description: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { id: 'cpem1', left: '(3; −2) + (−1; 5)', right: '(2; 3)' },
      { id: 'cpem2', left: '(3; −2) − (−1; 5)', right: '(4; −7)' },
      { id: 'cpem3', left: '3 · (2; −5)', right: '(6; −15)' },
      { id: 'cpem4', left: '→AB, ha A(2; −1), B(5; 3)', right: '(3; 4)' },
      { id: 'cpem5', left: '(1; 4) +90°-os elforgatottja', right: '(−4; 1)' },
      { id: 'cpem6', left: '(1; 4) −90°-os elforgatottja', right: '(4; −1)' },
      { id: 'cpem7', left: '2 · (1; 4) − 3 · (−3; 6)', right: '(11; −10)' },
      { id: 'cpem8', left: '½ · (−3; 6)', right: '(−1,5; 3)' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Pontok és egyenesek',
    description: 'Párosítsd a feladatot a megoldásával!',
    pairs: [
      { id: 'cpem9', left: 'A(1; 2) és B(7; 10) távolsága', right: '10' },
      { id: 'cpem10', left: 'A(−3; 5), B(7; −1) felezőpontja', right: '(2; 2)' },
      { id: 'cpem11', left: 'A(1; 1), B(7; 2), C(4; 9) súlypontja', right: '(4; 4)' },
      { id: 'cpem12', left: 'A P(0; 3) és Q(2; 7) ponton átmenő egyenes', right: 'y = 2x + 3' },
      { id: 'cpem13', left: 'Az y = 0,8x + 1 egyenes irányszöge', right: '≈ 38,7°' },
      { id: 'cpem14', left: 'Az y = 2x + 1-re merőleges egyenesek meredeksége', right: '−1/2' },
      { id: 'cpem15', left: 'y = x + 1 és y = −x + 5 metszéspontja', right: '(2; 3)' },
      { id: 'cpem16', left: 'A 4x + 3y = −11 egyenes y tengelymetszete', right: '(0; −11/3)' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Körök egyenlete',
    description: 'Párosítsd a kör adatait az egyenletével!',
    pairs: [
      { id: 'cpem17', left: 'K(3; −2), r = 4', right: '(x − 3)² + (y + 2)² = 16' },
      { id: 'cpem18', left: 'Átmérő: A(−5; 3), B(1; −5)', right: '(x + 2)² + (y + 1)² = 25' },
      { id: 'cpem19', left: 'K(1; −3), érinti az y tengelyt', right: '(x − 1)² + (y + 3)² = 1' },
      { id: 'cpem20', left: 'Átmegy (1; 0)-n és (7; 0)-n, K az y = x egyenesen', right: '(x − 4)² + (y − 4)² = 25' },
      { id: 'cpem21', left: 'Derékszögű háromszög átfogója: A(−3; 7), C(−1; 23)', right: '(x + 2)² + (y − 15)² = 65' },
      { id: 'cpem22', left: 'K = Q(1; −4), r = 3', right: '(x − 1)² + (y + 4)² = 9' },
      { id: 'cpem23', left: 'K = P(1; 7), érinti az x tengelyt', right: '(x − 1)² + (y − 7)² = 49' },
      { id: 'cpem24', left: 'K = C(−2; 6), r = 4', right: '(x + 2)² + (y − 6)² = 16' }
    ]
  }
];

const COORD_PRACTICE_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COORD_PRACTICE_EXAM_MATCHER_LEVELS_LIST[0],
  2: COORD_PRACTICE_EXAM_MATCHER_LEVELS_LIST[1],
  3: COORD_PRACTICE_EXAM_MATCHER_LEVELS_LIST[2]
};

export const CoordPracticeExamMatcher: React.FC<CoordPracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-tudasproba-matcher',
  topicTitle = '17. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Ismételd át a fejezetet: vektorműveletek, pontok és egyenesek, körök egyenlete!"
      levels={COORD_PRACTICE_EXAM_MATCHER_LEVELS}
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

export default CoordPracticeExamMatcher;
