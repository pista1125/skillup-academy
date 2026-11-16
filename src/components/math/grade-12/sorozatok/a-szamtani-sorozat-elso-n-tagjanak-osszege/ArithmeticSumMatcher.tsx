import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ArithmeticSumMatcherProps {
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

const ARITHMETIC_SUM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: "1. szint: Összegek értéke",
    description: "Párosítsd az összeget az értékével!",
    pairs: [
      { id: "asumm101", left: "1 + 2 + … + 40", right: "820" },
      { id: "asumm102", left: "1 + 2 + … + 100", right: "5050" },
      { id: "asumm103", left: "1 + 3 + 5 + … + 39", right: "400" },
      { id: "asumm104", left: "26 + 28 + … + 124", right: "3750" },
      { id: "asumm105", left: "2 + 3 + … + 8", right: "35" },
      { id: "asumm106", left: "5 + 7 + 9 + 11", right: "32" },
      { id: "asumm107", left: "−65 + … + 65 (számtani sorozat)", right: "0" },
      { id: "asumm108", left: "1 + 2 + … + 15", right: "120" }
    ]
  },
  2: {
    level: 2,
    title: "2. szint: Adatokból az összeg",
    description: "Párosítsd az adatokat a kért összeggel!",
    pairs: [
      { id: "asumm201", left: "a₁ = 129, d = −10: S₁₃", right: "897" },
      { id: "asumm202", left: "a₁ = 6, a₂₁ = 112: S₂₁", right: "1239" },
      { id: "asumm203", left: "a₁ = 74, a₂₇ = 48: S₂₇", right: "1647" },
      { id: "asumm204", left: "a₁ = 15, d = −1,2: S₁₀", right: "96" },
      { id: "asumm205", left: "a₁ = 340, d = 30: S₂₇", right: "19 710" },
      { id: "asumm206", left: "a₁ = −5, d = 2: S₂₅", right: "475" },
      { id: "asumm207", left: "a₁ = 12, d = −3: S₂₀", right: "−330" },
      { id: "asumm208", left: "a₁ = 3300, d = 200: S₁₈", right: "90 000" }
    ]
  },
  3: {
    level: 3,
    title: "3. szint: Képletek jelentése",
    description: "Párosítsd a kifejezést a jelentésével!",
    pairs: [
      { id: "asumm301", left: "Sₙ", right: "az első n tag összege" },
      { id: "asumm302", left: "(a₁ + aₙ)/2 · n", right: "Sₙ az első és az n-edik taggal" },
      { id: "asumm303", left: "(2a₁ + (n − 1)d)/2 · n", right: "Sₙ az első taggal és a differenciával" },
      { id: "asumm304", left: "2Sₙ = n(a₁ + aₙ)", right: "az előre és visszafelé felírt összeg összeadása" },
      { id: "asumm305", left: "(aₙ − a₁)/d + 1", right: "a tagok száma" },
      { id: "asumm306", left: "Sₙ/n", right: "a tagok átlaga" },
      { id: "asumm307", left: "n(n + 1)/2", right: "1 + 2 + … + n" },
      { id: "asumm308", left: "n²", right: "az első n pozitív páratlan szám összege" }
    ]
  }
};

export const ArithmeticSumMatcher: React.FC<ArithmeticSumMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g12-seq-szamtani-osszeg-matcher',
  topicTitle = "4. A számtani sorozat első n tagjának összege – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={12}
      chapterId="sorozatok"
      topicId={topicId}
      subtopicId="a-szamtani-sorozat-elso-n-tagjanak-osszege"
      title={topicTitle}
      subtitle="Párosítsd az összegeket az értékükkel, az adatokat Sₙ-nel és a képleteket a jelentésükkel!"
      levels={ARITHMETIC_SUM_MATCHER_LEVELS}
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

export default ArithmeticSumMatcher;
