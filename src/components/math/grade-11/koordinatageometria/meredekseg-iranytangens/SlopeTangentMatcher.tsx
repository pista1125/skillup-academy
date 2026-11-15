import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SlopeTangentMatcherProps {
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

const SLOPE_TANGENT_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fogalmak',
    description: 'Párosítsd a fogalmat a jelentésével!',
    pairs: [
      { id: 'stm1', left: 'Meredekség', right: 'Egységnyi első koordináta-növekedésre jutó második koordináta-változás' },
      { id: 'stm2', left: 'Irányszög', right: 'Az x tengely pozitív félegyenesével bezárt előjeles szög' },
      { id: 'stm3', left: 'Iránytangens', right: 'A meredekség másik neve: m = tg α' },
      { id: 'stm4', left: 'm > 0', right: 'Emelkedő egyenes, 0° < α < 90°' },
      { id: 'stm5', left: 'm < 0', right: 'Csökkenő egyenes, −90° < α < 0°' },
      { id: 'stm6', left: 'm = 0', right: 'Az x tengellyel párhuzamos egyenes, α = 0°' },
      { id: 'stm7', left: 'x = c', right: 'Függőleges egyenes: nincs meredeksége, α = 90°' },
      { id: 'stm8', left: '12%-os emelkedő', right: '100 m vízszintes úton 12 m emelkedés' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Egyenletből meredekség',
    description: 'Párosítsd az egyenletet a meredekségével!',
    pairs: [
      { id: 'stm9', left: 'y = 2x − 5', right: 'm = 2' },
      { id: 'stm10', left: '3x − 2y = −6', right: 'm = 3/2' },
      { id: 'stm11', left: '3x − 5y = 8', right: 'm = 3/5' },
      { id: 'stm12', left: 'x + 3y + 12 = 0', right: 'm = −1/3' },
      { id: 'stm13', left: '4x = y + 2', right: 'm = 4' },
      { id: 'stm14', left: 'x + 2y = 0', right: 'm = −1/2' },
      { id: 'stm15', left: 'y = 3', right: 'm = 0' },
      { id: 'stm16', left: '5x − 2y = 1', right: 'm = 5/2' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Meredekség és irányszög',
    description: 'Párosítsd a meredekséget vagy az adatot az irányszöggel!',
    pairs: [
      { id: 'stm17', left: 'm = 1', right: 'α = 45°' },
      { id: 'stm18', left: 'm = −1', right: 'α = −45°' },
      { id: 'stm19', left: 'm = √3', right: 'α = 60°' },
      { id: 'stm20', left: 'm = 3/2', right: 'α ≈ 56,3°' },
      { id: 'stm21', left: 'm = 3 (A létra)', right: 'α ≈ 71,6°' },
      { id: 'stm22', left: 'm = −3,75 (F létra)', right: 'α ≈ −75,1°' },
      { id: 'stm23', left: '12%-os emelkedő', right: 'α ≈ 6,84°' },
      { id: 'stm24', left: '10%-os lejtő', right: 'α ≈ −5,71°' }
    ]
  }
];

const SLOPE_TANGENT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: SLOPE_TANGENT_MATCHER_LEVELS_LIST[0],
  2: SLOPE_TANGENT_MATCHER_LEVELS_LIST[1],
  3: SLOPE_TANGENT_MATCHER_LEVELS_LIST[2]
};

export const SlopeTangentMatcher: React.FC<SlopeTangentMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-geo-meredekseg-matcher',
  topicTitle = '13. Meredekség, iránytangens – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="meredekseg-iranytangens"
      title={topicTitle}
      subtitle="Gyakorold a meredekség, az irányszög és az iránytangens kapcsolatát!"
      levels={SLOPE_TANGENT_MATCHER_LEVELS}
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

export default SlopeTangentMatcher;
