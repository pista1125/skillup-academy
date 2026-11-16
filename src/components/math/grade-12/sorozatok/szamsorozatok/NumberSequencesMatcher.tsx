import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberSequencesMatcherProps {
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

const NUMBER_SEQUENCES_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Fogalmak és jelölések",
    description: "Párosítsd a fogalmat a jelentésével!",
    pairs: [
      { id: "nsm101", left: "sorozat", right: "ℤ⁺ → ℝ függvény" },
      { id: "nsm102", left: "a₁", right: "a sorozat első tagja" },
      { id: "nsm103", left: "aₙ", right: "a sorozat n-edik (általános) tagja" },
      { id: "nsm104", left: "{aₙ}", right: "a sorozat jele" },
      { id: "nsm105", left: "pontgrafikon", right: "különálló (n; aₙ) pontok összekötés nélkül" },
      { id: "nsm106", left: "értelmezési tartomány", right: "a pozitív egész számok halmaza" },
      { id: "nsm107", left: "képhalmaz", right: "a valós számok halmaza" },
      { id: "nsm108", left: "n ↦ aₙ", right: "az n-hez a sorozat n-edik tagját rendeljük" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Képlet és tagok",
    description: "Párosítsd a képletet a sorozat első tagjaival!",
    pairs: [
      { id: "nsm201", left: "aₙ = n²", right: "1; 4; 9; 16; …" },
      { id: "nsm202", left: "aₙ = 2n − 1", right: "1; 3; 5; 7; …" },
      { id: "nsm203", left: "aₙ = 1/n", right: "1; 1/2; 1/3; 1/4; …" },
      { id: "nsm204", left: "aₙ = (−1)ⁿ", right: "−1; 1; −1; 1; …" },
      { id: "nsm205", left: "aₙ = n/(n + 1)", right: "1/2; 2/3; 3/4; 4/5; …" },
      { id: "nsm206", left: "aₙ = log₄ n", right: "0; 1/2; log₄ 3; 1; …" },
      { id: "nsm207", left: "aₙ = n(n − 1)/2", right: "0; 1; 3; 6; …" },
      { id: "nsm208", left: "aₙ = 3n + 2", right: "5; 8; 11; 14; …" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Mintafeladatok eredményei",
    description: "Párosítsd a feladatot a helyes eredménnyel!",
    pairs: [
      { id: "nsm301", left: "lépcső (1 vagy 2 fok): a₈", right: "34" },
      { id: "nsm302", left: "lépcső: a₁₉, ha a₁₈ = 4181 és a₂₀ = 10 946", right: "6765" },
      { id: "nsm303", left: "5/7 tizedes tört 8. jegye", right: "1" },
      { id: "nsm304", left: "5/7 tizedes tört 970. jegye", right: "2" },
      { id: "nsm305", left: "5/7 tizedes tört 90. jegye", right: "5" },
      { id: "nsm306", left: "a viccet ismerők száma szombat estére", right: "1093" },
      { id: "nsm307", left: "a hüllőállomány a 10. évben", right: "712" },
      { id: "nsm308", left: "k₆, ha kₙ = n(n − 1)/2", right: "15" }
    ]
  }
};

export const NumberSequencesMatcher: React.FC<NumberSequencesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-szamsorozatok-matcher',
  topicTitle = "1. Számsorozatok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="szamsorozatok"
      title={topicTitle}
      subtitle="Párosítsd a sorozatok fogalmait, képleteit és a mintafeladatok eredményeit!"
      levels={NUMBER_SEQUENCES_MATCHER_LEVELS}
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

export default NumberSequencesMatcher;
