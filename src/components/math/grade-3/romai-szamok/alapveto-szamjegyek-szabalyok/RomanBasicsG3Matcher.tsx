import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RomanBasicsG3MatcherProps {
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

const ROMAN_BASICS_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: A jelek",
    description: "Párosítsd a római jelet az értékével!",
    pairs: [
      { id: 'g3-rom-alapok-m1', left: "I", right: "1" },
      { id: 'g3-rom-alapok-m2', left: "V", right: "5" },
      { id: 'g3-rom-alapok-m3', left: "X", right: "10" },
      { id: 'g3-rom-alapok-m4', left: "L", right: "50" },
      { id: 'g3-rom-alapok-m5', left: "C", right: "100" },
      { id: 'g3-rom-alapok-m6', left: "II", right: "2" },
      { id: 'g3-rom-alapok-m7', left: "III", right: "3" },
      { id: 'g3-rom-alapok-m8', left: "XX", right: "20" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Kis számok",
    description: "Párosítsd a római számot az arab számmal!",
    pairs: [
      { id: 'g3-rom-alapok-m9', left: "IV", right: "4" },
      { id: 'g3-rom-alapok-m10', left: "VI", right: "6" },
      { id: 'g3-rom-alapok-m11', left: "IX", right: "9" },
      { id: 'g3-rom-alapok-m12', left: "XI", right: "11" },
      { id: 'g3-rom-alapok-m13', left: "XIV", right: "14" },
      { id: 'g3-rom-alapok-m14', left: "XVI", right: "16" },
      { id: 'g3-rom-alapok-m15', left: "XIX", right: "19" },
      { id: 'g3-rom-alapok-m16', left: "XXI", right: "21" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Hozzáadás vagy elvevés?",
    description: "Párosítsd a római számot a számolással!",
    pairs: [
      { id: 'g3-rom-alapok-m17', left: "IV", right: "5 − 1" },
      { id: 'g3-rom-alapok-m18', left: "VI", right: "5 + 1" },
      { id: 'g3-rom-alapok-m19', left: "IX", right: "10 − 1" },
      { id: 'g3-rom-alapok-m20', left: "XV", right: "10 + 5" },
      { id: 'g3-rom-alapok-m21', left: "XL", right: "50 − 10" },
      { id: 'g3-rom-alapok-m22', left: "LX", right: "50 + 10" },
      { id: 'g3-rom-alapok-m23', left: "XC", right: "100 − 10" },
      { id: 'g3-rom-alapok-m24', left: "LV", right: "50 + 5" }
    ]
  }
];

const ROMAN_BASICS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ROMAN_BASICS_G3_MATCHER_LEVELS_LIST[0],
  2: ROMAN_BASICS_G3_MATCHER_LEVELS_LIST[1],
  3: ROMAN_BASICS_G3_MATCHER_LEVELS_LIST[2]
};

export const RomanBasicsG3Matcher: React.FC<RomanBasicsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-rom-alapok-matcher',
  topicTitle = "1. A római számjegyek és alapszabályok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="alapveto-szamjegyek-szabalyok"
      title={topicTitle}
      subtitle="Párosítsd a római jeleket és számokat az értékükkel!"
      levels={ROMAN_BASICS_G3_MATCHER_LEVELS}
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

export default RomanBasicsG3Matcher;
