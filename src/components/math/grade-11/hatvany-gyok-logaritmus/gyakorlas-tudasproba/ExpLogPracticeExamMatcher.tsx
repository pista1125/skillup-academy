import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ExpLogPracticeExamMatcherProps {
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

const EXP_LOG_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hatvány, gyök, törtkitevő',
    description: 'Párosítsd a kifejezést az értékével!',
    pairs: [
      { id: 'elxm1', left: '2⁻³', right: '1/8' },
      { id: 'elxm2', left: '⁴√81', right: '3' },
      { id: 'elxm3', left: '∛−8', right: '−2' },
      { id: 'elxm4', left: '32^{3/5}', right: '8' },
      { id: 'elxm5', left: '81^{−1/2}', right: '1/9' },
      { id: 'elxm6', left: '27^{4/3}', right: '81' },
      { id: 'elxm7', left: '16^{1/2}', right: '4' },
      { id: 'elxm8', left: '(3^{1,5})²', right: '27' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Logaritmus (tudáspróba)',
    description: 'Párosítsd a logaritmusos kifejezést az értékével!',
    pairs: [
      { id: 'elxm9', left: 'log₃ 1', right: '0' },
      { id: 'elxm10', left: 'log₄ (1/2)', right: '−1/2' },
      { id: 'elxm11', left: 'log₂ 0,5', right: '−1' },
      { id: 'elxm12', left: 'log₇ ³√7', right: '1/3' },
      { id: 'elxm13', left: 'log₀,₅ 4', right: '−2' },
      { id: 'elxm14', left: 'log₀,₅ 8', right: '−3' },
      { id: 'elxm15', left: '(1/3)^{log₃ 12}', right: '1/12' },
      { id: 'elxm16', left: '6^{log₆ 5}', right: '5' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Szöveges feladat ↔ eredmény',
    description: 'Párosítsd a tankönyvi feladatot a modell szerinti eredménnyel!',
    pairs: [
      { id: 'elxm17', left: 'A város lakossága 2010-ben', right: '≈ 135 900 fő' },
      { id: 'elxm18', left: 'Mikor lesz ólomból 10-szer annyi, mint bizmutból?', right: '≈ 242 perc' },
      { id: 'elxm19', left: 'Mikor lesz 600 millió kólibaktérium?', right: '≈ 115 perc' },
      { id: 'elxm20', left: 'A polónium felezési ideje (havi 0,86-szoros)', right: '≈ 4,6 hónap' },
      { id: 'elxm21', left: 'Hajni: 50 000 Ft, 8%/év, 3 év', right: '≈ 62 986 Ft' },
      { id: 'elxm22', left: 'Csilla: 50 000 Ft, 0,7%/hó, 34 hó', right: '≈ 63 383 Ft' },
      { id: 'elxm23', left: '350 000 Ft 4,5%-kal 30%-kal több legyen', right: '6 év' },
      { id: 'elxm24', left: 'N(t) = 4,2 · 10²⁴ · 0,97ᵗ felezési ideje', right: '≈ 22,8 perc' }
    ]
  }
};

export const ExpLogPracticeExamMatcher: React.FC<ExpLogPracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-tudasproba-matcher',
  topicTitle = '16. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Ismételd át a teljes III. fejezetet: hatványok, logaritmusok és szöveges feladatok!"
      levels={EXP_LOG_EXAM_MATCHER_LEVELS}
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

export default ExpLogPracticeExamMatcher;
