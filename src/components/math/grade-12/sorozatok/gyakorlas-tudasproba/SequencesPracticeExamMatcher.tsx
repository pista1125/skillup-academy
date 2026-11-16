import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SequencesPracticeExamMatcherProps {
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

const PRACTICE_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: A fejezet képletei',
    description: 'Párosítsd a mennyiséget a képletével!',
    pairs: [
      { id: 'pem1', left: 'számtani sorozat n-edik tagja', right: 'a₁ + (n − 1)d' },
      { id: 'pem2', left: 'mértani sorozat n-edik tagja', right: 'a₁ · qⁿ⁻¹' },
      { id: 'pem3', left: 'számtani sorozat első n tagjának összege', right: '(a₁ + aₙ)/2 · n' },
      { id: 'pem4', left: 'mértani sorozat első n tagjának összege', right: 'a₁(qⁿ − 1)/(q − 1)' },
      { id: 'pem5', left: 'Fibonacci-sorozat rekurziója', right: 'fₙ = fₙ₋₂ + fₙ₋₁' },
      { id: 'pem6', left: 'kamatos kamat n év után', right: 'K₀ · qⁿ' },
      { id: 'pem7', left: 'számtani közép tulajdonság', right: 'aₙ = (aₙ₋₁ + aₙ₊₁)/2' },
      { id: 'pem8', left: 'mértani közép tulajdonság', right: 'aₙ² = aₙ₋₁ · aₙ₊₁' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Számold ki!',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'pem9', left: 'a₂ = 5, a₈ = 14 (számtani): S₂₀', right: '355' },
      { id: 'pem10', left: 'a₁ = 8, d = 1,5, Sₙ = 1233', right: 'n = 36' },
      { id: 'pem11', left: '1 + 2 + … + 40', right: '820' },
      { id: 'pem12', left: '10-től 49-ig az egészek összege', right: '1180' },
      { id: 'pem13', left: 'b₁ = −5, q = 3: S₈', right: '−16 400' },
      { id: 'pem14', left: 'q = 2, S₅ = 155: b₁', right: '5' },
      { id: 'pem15', left: 'a₄ = 31, a₆ = 51 (számtani): a₁', right: '1' },
      { id: 'pem16', left: 'Fibonacci f₁₃', right: '233' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Szöveges és érettségi feladatok',
    description: 'Párosítsd a feladatot az eredményével!',
    pairs: [
      { id: 'pem17', left: 'Betyár: 32 patkószeg (1, 2, 4, … fillér)', right: '≈ 42 949 673 Ft' },
      { id: 'pem18', left: 'a középső (4.) fiú része', right: '10,24%' },
      { id: 'pem19', left: 'a hagyatékból jótékony célra', right: '0,8⁷ ≈ 20,97%' },
      { id: 'pem20', left: 'Kinga: 5 × 450 000 Ft, 9%', right: '≈ 2 935 501 Ft' },
      { id: 'pem21', left: 'vetélkedő: 3800 Ft, −200 Ft, összesen 29 000 Ft', right: '10 versenyző' },
      { id: 'pem22', left: 'Péter II. ajánlata (+2%/hó, 48 hónap)', right: '≈ 15 870 704 Ft' },
      { id: 'pem23', left: 'Vera utolsó 4 feladata', right: '19 perc' },
      { id: 'pem24', left: 'Anna, számtani edzésterv', right: '56 700 m' }
    ]
  }
};

export const SequencesPracticeExamMatcher: React.FC<SequencesPracticeExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-tudasproba-matcher',
  topicTitle = '10. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Ismételd át a Sorozatok fejezet képleteit, számolásait és érettségi feladatait!"
      levels={PRACTICE_EXAM_MATCHER_LEVELS}
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

export default SequencesPracticeExamMatcher;
