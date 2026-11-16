import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface RomanNumerals4MatcherProps {
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

const ROMAN_NUMERALS4_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Kis római számok",
    description: "Párosítsd a római számot az értékével!",
    pairs: [
      { id: "rnm1", left: "I", right: "1" },
      { id: "rnm2", left: "III", right: "3" },
      { id: "rnm3", left: "IV", right: "4" },
      { id: "rnm4", left: "V", right: "5" },
      { id: "rnm5", left: "VI", right: "6" },
      { id: "rnm6", left: "VIII", right: "8" },
      { id: "rnm7", left: "IX", right: "9" },
      { id: "rnm8", left: "XI", right: "11" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Nagyobb római számok",
    description: "Párosítsd a tankönyv és a munkafüzet római számait az arab megfelelőjükkel!",
    pairs: [
      { id: "rnm9", left: "XXXVII", right: "37" },
      { id: "rnm10", left: "XXXV", right: "35" },
      { id: "rnm11", left: "XXVI", right: "26" },
      { id: "rnm12", left: "XIX", right: "19" },
      { id: "rnm13", left: "XXV", right: "25" },
      { id: "rnm14", left: "XXVIII", right: "28" },
      { id: "rnm15", left: "XXIV", right: "24" },
      { id: "rnm16", left: "XXXIX", right: "39" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Római számok körülöttünk",
    description: "Párosítsd a feladatot a helyes válasszal!",
    pairs: [
      { id: "rnm17", left: "VIII. kerület", right: "8. kerület" },
      { id: "rnm18", left: "XI. 2-án érkezünk", right: "november 2-án" },
      { id: "rnm19", left: "Irányítószám: XXIX", right: "Mosolyfalva (29)" },
      { id: "rnm20", left: "Aranyos u. 3. XIX/25.", right: "19. emelet, 25. ajtó" },
      { id: "rnm21", left: "Az V rajtszám előtti szám", right: "IV" },
      { id: "rnm22", left: "A XXV rajtszám utáni szám", right: "XXVI" },
      { id: "rnm23", left: "XX + X", right: "XXX" },
      { id: "rnm24", left: "A kismutató a XII-n, a nagymutató is a XII-n", right: "12 óra" }
    ]
  }
];

const ROMAN_NUMERALS4_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ROMAN_NUMERALS4_MATCHER_LEVELS_LIST[0],
  2: ROMAN_NUMERALS4_MATCHER_LEVELS_LIST[1],
  3: ROMAN_NUMERALS4_MATCHER_LEVELS_LIST[2]
};

export const RomanNumerals4Matcher: React.FC<RomanNumerals4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-romai-matcher',
  topicTitle = "7. A római számok – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="a-romai-szamok"
      title={topicTitle}
      subtitle="Párosítsd a római számokat az arab számokkal és a mindennapi jelentésükkel!"
      levels={ROMAN_NUMERALS4_MATCHER_LEVELS}
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

export default RomanNumerals4Matcher;
