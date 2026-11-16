import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SequencesSummaryMatcherProps {
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

const SEQUENCES_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Fogalom és képlet',
    description: 'Párosítsd a fogalmat a képletével vagy jellemzőjével!',
    pairs: [
      { id: 'ssm101', left: 'számtani sorozat n-edik tagja', right: 'aₙ = a₁ + (n − 1)d' },
      { id: 'ssm102', left: 'mértani sorozat n-edik tagja', right: 'aₙ = a₁ · qⁿ⁻¹' },
      { id: 'ssm103', left: 'számtani sorozat összege', right: 'Sₙ = (a₁ + aₙ)/2 · n' },
      { id: 'ssm104', left: 'mértani sorozat összege (q ≠ 1)', right: 'Sₙ = a₁ · (qⁿ − 1)/(q − 1)' },
      { id: 'ssm105', left: 'kamatos kamat', right: 'Aₙ = A₀ · (1 + p/100)ⁿ' },
      { id: 'ssm106', left: 'differencia', right: 'aₙ − aₙ₋₁ állandó' },
      { id: 'ssm107', left: 'kvóciens', right: 'aₙ/aₙ₋₁ ≠ 0 állandó' },
      { id: 'ssm108', left: 'számsorozat', right: 'N⁺-on értelmezett függvény' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Sorozat és jellemző',
    description: 'Párosítsd a sorozatot a differenciájával, kvóciensével vagy a kérdezett taggal!',
    pairs: [
      { id: 'ssm201', left: '3; 9; 15; 21; …', right: 'd = 6' },
      { id: 'ssm202', left: '12; 7; 2; −3; …', right: 'd = −5' },
      { id: 'ssm203', left: '108; −36; 12; −4; …', right: 'q = −1/3' },
      { id: 'ssm204', left: '3; 6; 12; 24; …', right: 'q = 2' },
      { id: 'ssm205', left: 'a₁ = 6, q = 2: a₁₀', right: '3072' },
      { id: 'ssm206', left: 'a₂ = −1/9, q = 3: a₅', right: '−3' },
      { id: 'ssm207', left: 'a₁ = 3, d = 7: a₅₀', right: '346' },
      { id: 'ssm208', left: 'a₁ = −9, a₂ = 4, aₙ₊₂ = aₙ + aₙ₊₁: a₄', right: '−1' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Érettségi feladatok eredményei',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'ssm301', left: 'kétjegyű páratlan számok összege', right: '2475' },
      { id: 'ssm302', left: 'cirkusz: 12 sor, +10 hely, utolsó sor 210', right: '1860 hely' },
      { id: 'ssm303', left: '1 + 2 + … + n = 66', right: 'n = 11' },
      { id: 'ssm304', left: '2 millió Ft, 8%, 2 év', right: '2 332 800 Ft' },
      { id: 'ssm305', left: '6 · (2ⁿ − 1) > 10⁷, legkisebb n', right: '21' },
      { id: 'ssm306', left: 'nyomdagép értéke 8 év múlva', right: '≈ 19,8 millió Ft' },
      { id: 'ssm307', left: '6%-kal másfélszeres', right: '7 év alatt' },
      { id: 'ssm308', left: '1,5 millió Ft hitel, 9%, 4 év: részlet', right: '≈ 463 003 Ft' }
    ]
  }
};

export const SequencesSummaryMatcher: React.FC<SequencesSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-sorozatok-matcher',
  topicTitle = '6. Sorozatok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="sorozatok"
      title={topicTitle}
      subtitle="Párosítsd a fogalmakat a képletekkel, a sorozatokat a jellemzőikkel és a feladatokat az eredményükkel!"
      levels={SEQUENCES_SUMMARY_MATCHER_LEVELS}
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

export default SequencesSummaryMatcher;
