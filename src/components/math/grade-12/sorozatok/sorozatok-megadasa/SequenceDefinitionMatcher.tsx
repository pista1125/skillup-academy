import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SequenceDefinitionMatcherProps {
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

const SEQUENCE_DEFINITION_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Utasítás és képlet",
    description: "Párosítsd a szavakkal megadott sorozatot a képletével!",
    pairs: [
      { id: "sdm101", left: "a páros pozitív egészek növekvő sorozata", right: "aₙ = 2n" },
      { id: "sdm102", left: "a pozitív páratlan számok növekvő sorozata", right: "aₙ = 2n − 1" },
      { id: "sdm103", left: "a természetes számok növekvő sorozata", right: "aₙ = n − 1" },
      { id: "sdm104", left: "a pozitív négyzetszámok növekvő sorozata", right: "aₙ = n²" },
      { id: "sdm105", left: "a 3-mal osztva 1 maradékot adó pozitív egészek", right: "aₙ = 3n − 2" },
      { id: "sdm106", left: "a 7-tel osztva 4 maradékot adó pozitív egészek", right: "aₙ = 7n − 3" },
      { id: "sdm107", left: "a 8-cal osztva 5 maradékot adó pozitív egészek", right: "aₙ = 8n − 3" },
      { id: "sdm108", left: "az 5-nél nem kisebb egészek növekvő sorozata", right: "aₙ = n + 4" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Rekurzió és képlet",
    description: "Párosítsd a rekurzív megadást az ugyanazt a sorozatot adó képlettel!",
    pairs: [
      { id: "sdm201", left: "a₁ = 2, aₙ = aₙ₋₁ + 2", right: "aₙ = 2n" },
      { id: "sdm202", left: "a₁ = 5, aₙ = aₙ₋₁ + 8", right: "aₙ = 8n − 3" },
      { id: "sdm203", left: "a₁ = 5, aₙ = aₙ₋₁ + 2", right: "aₙ = 2n + 3" },
      { id: "sdm204", left: "a₁ = 1, aₙ = aₙ₋₁ + (2n − 1)", right: "aₙ = n²" },
      { id: "sdm205", left: "b₁ = 8, bₙ = bₙ₋₁ : 2", right: "bₙ = 16/2ⁿ" },
      { id: "sdm206", left: "a₁ = 0, aₙ = aₙ₋₁ + 1", right: "aₙ = n − 1" },
      { id: "sdm207", left: "a₁ = 1, aₙ = aₙ₋₁ + 3", right: "aₙ = 3n − 2" },
      { id: "sdm208", left: "a₁ = −8, aₙ = −aₙ₋₁", right: "aₙ = 8 · (−1)ⁿ" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Feladatok eredményei",
    description: "Párosítsd a feladatot a helyes eredménnyel!",
    pairs: [
      { id: "sdm301", left: "a₁ = 3, aₙ = 2aₙ₋₁ − 4: a₅", right: "−12" },
      { id: "sdm302", left: "a₁ = 5, aₙ = −2aₙ₋₁ + 1: a₃", right: "19" },
      { id: "sdm303", left: "c₁ = 3, c₂ = 1, cₙ = cₙ₋₁ − cₙ₋₂: c₆", right: "2" },
      { id: "sdm304", left: "őr (4 munka, 2 pihenő): munkanapok a 100. nap reggelén", right: "67" },
      { id: "sdm305", left: "őr: munkanapok a 125. nap reggelén", right: "84" },
      { id: "sdm306", left: "aₙ = 8 · (−1)ⁿ: az első 25 tag összege", right: "−8" },
      { id: "sdm307", left: "páratlan sorszámú tagok 24, párosak −23: S₁₀", right: "5" },
      { id: "sdm308", left: "cₙ = n(n − 1) + 2: c₁₀₀", right: "9902" }
    ]
  }
};

export const SequenceDefinitionMatcher: React.FC<SequenceDefinitionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-megadas-matcher',
  topicTitle = "2. Sorozatok megadása – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="sorozatok-megadasa"
      title={topicTitle}
      subtitle="Párosítsd az utasítást, a rekurziót és a képletet, és a feladatokat az eredményükkel!"
      levels={SEQUENCE_DEFINITION_MATCHER_LEVELS}
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

export default SequenceDefinitionMatcher;
