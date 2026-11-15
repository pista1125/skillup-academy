import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogarithmConceptMatcherProps {
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

const pairs = (prefix: string, list: [string, string][]) => list.map(([left, right], i) => ({ id: `${prefix}${i + 1}`, left, right }));

const LOGARITHM_CONCEPT_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Egész értékű logaritmusok',
    description: 'Párosítsd a logaritmust az értékével!',
    pairs: pairs('lgcm1-', [
      ['log₂ 32', '5'],
      ['log₃ 81', '4'],
      ['log₅ 25', '2'],
      ['log₁₀ 1000', '3'],
      ['log₃ 1', '0'],
      ['log₇ 7', '1'],
      ['log₂ 1024', '10'],
      ['log₂ 64', '6']
    ])
  },
  {
    level: 2,
    title: '2. szint: Hatványalak ↔ logaritmusalak',
    description: 'Párosítsd a hatványalakot a vele egyenértékű logaritmusos alakkal!',
    pairs: pairs('lgcm2-', [
      ['2⁵ = 32', 'log₂ 32 = 5'],
      ['13² = 169', 'log₁₃ 169 = 2'],
      ['7³ = 343', 'log₇ 343 = 3'],
      ['16^{1/2} = 4', 'log₁₆ 4 = 1/2'],
      ['4⁻¹ = 0,25', 'log₄ 0,25 = −1'],
      ['5⁴ = 625', 'log₅ 625 = 4'],
      ['2,5² = 6,25', 'log₂,₅ 6,25 = 2'],
      ['10⁻³ = 0,001', 'log₁₀ 0,001 = −3']
    ])
  },
  {
    level: 3,
    title: '3. szint: Törtek, negatív kitevők, kifejezések',
    description: 'Párosítsd a kifejezést az értékével!',
    pairs: pairs('lgcm3-', [
      ['log₃ (1/9)', '−2'],
      ['log₄₉ 7', '1/2'],
      ['log₂ ∛(1/2)', '−1/3'],
      ['log₉ (1/3)', '−1/2'],
      ['log₆₄ 4', '1/3'],
      ['9^{log₉ 0,6}', '0,6'],
      ['log₀,₅ 8', '−3'],
      ['log₄ 64 + log₅ 125', '6']
    ])
  }
];

const LOGARITHM_CONCEPT_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LOGARITHM_CONCEPT_MATCHER_LEVELS_LIST[0],
  2: LOGARITHM_CONCEPT_MATCHER_LEVELS_LIST[1],
  3: LOGARITHM_CONCEPT_MATCHER_LEVELS_LIST[2]
};

export const LogarithmConceptMatcher: React.FC<LogarithmConceptMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-logaritmus-fogalom-matcher',
  topicTitle = '10. A logaritmus fogalma – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="a-logaritmus-fogalma"
      title={topicTitle}
      subtitle="Párosítsd a logaritmusokat az értékükkel, és a hatványalakot a logaritmusos alakkal!"
      levels={LOGARITHM_CONCEPT_MATCHER_LEVELS}
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

export default LogarithmConceptMatcher;
