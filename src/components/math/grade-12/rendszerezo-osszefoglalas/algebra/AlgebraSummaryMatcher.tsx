import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AlgebraSummaryMatcherProps {
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

const ALGEBRA_SUMMARY_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Azonosságok és képletek",
    description: "Párosítsd a kifejezést vagy fogalmat a megfelelő képlettel!",
    pairs: [
      { id: "alm101", left: "(a + b)²", right: "a² + 2ab + b²" },
      { id: "alm102", left: "(a − b)²", right: "a² − 2ab + b²" },
      { id: "alm103", left: "(a + b)(a − b)", right: "a² − b²" },
      { id: "alm104", left: "a másodfokú egyenlet diszkriminánsa", right: "D = b² − 4ac" },
      { id: "alm105", left: "ax² + bx + c gyöktényezős alakja", right: "a(x − x₁)(x − x₂)" },
      { id: "alm106", left: "x₁,₂", right: "(−b ± √D) / (2a)" },
      { id: "alm107", left: "D < 0", right: "nincs valós gyök" },
      { id: "alm108", left: "D = 0", right: "egy (kettős) valós gyök" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Szorzattá alakítás",
    description: "Párosítsd a kifejezést a szorzat alakjával!",
    pairs: [
      { id: "alm201", left: "3x² − 12x", right: "3x(x − 4)" },
      { id: "alm202", left: "3x² − 12", right: "3(x − 2)(x + 2)" },
      { id: "alm203", left: "3x² − 12x + 12", right: "3(x − 2)²" },
      { id: "alm204", left: "6ab² − 9b", right: "3b(2ab − 3)" },
      { id: "alm205", left: "x² − 9", right: "(x − 3)(x + 3)" },
      { id: "alm206", left: "3x² − 2x − 1", right: "3(x − 1)(x + 1/3)" },
      { id: "alm207", left: "3x² − 8x − 35", right: "3(x + 7/3)(x − 5)" },
      { id: "alm208", left: "x² + 10x + 25", right: "(x + 5)²" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Egyenlet és megoldáshalmaz",
    description: "Párosítsd az egyenletet a valós megoldáshalmazával!",
    pairs: [
      { id: "alm301", left: "3x² − 12x = 0", right: "{0; 4}" },
      { id: "alm302", left: "3x² − 12 = 0", right: "{−2; 2}" },
      { id: "alm303", left: "3x² − 12x + 12 = 0", right: "{2}" },
      { id: "alm304", left: "√(4x − 3) = x − 6", right: "{13}" },
      { id: "alm305", left: "√(3 − 7x) = −2", right: "∅" },
      { id: "alm306", left: "(2x − 1)(2x + 1) = 8", right: "{−3/2; 3/2}" },
      { id: "alm307", left: "xˣ⁺³ = x⁷", right: "{0; 1; 4}" },
      { id: "alm308", left: "2x² − x − 1 = 0", right: "{−1/2; 1}" }
    ]
  }
};

export const AlgebraSummaryMatcher: React.FC<AlgebraSummaryMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-sum-algebra-matcher',
  topicTitle = "4. Algebra – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId={topicId}
      subtopicId="algebra"
      title={topicTitle}
      subtitle="Párosítsd az azonosságokat, a szorzattá alakításokat és az egyenleteket a megoldáshalmazukkal!"
      levels={ALGEBRA_SUMMARY_MATCHER_LEVELS}
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

export default AlgebraSummaryMatcher;
