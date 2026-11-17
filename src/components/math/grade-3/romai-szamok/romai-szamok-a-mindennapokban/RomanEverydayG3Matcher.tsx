import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniClockCard, MiniBookCard, MiniSignCard, MiniCrownCard, MiniCalCard } from './RomanEverydayG3CardFigures';

interface RomanEverydayG3MatcherProps {
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

const LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Az óra számai",
    description: "Párosítsd a római számot az órával vagy az időponttal!",
    pairs: [
      { id: 'rmem1', left: "XII", right: "", valueFigure: <MiniClockCard hour={12} /> },
      { id: 'rmem2', left: "IX", right: "", valueFigure: <MiniClockCard hour={9} /> },
      { id: 'rmem3', left: "IV", right: "", valueFigure: <MiniClockCard hour={4} /> },
      { id: 'rmem4', left: "VI", right: "", valueFigure: <MiniClockCard hour={6} /> },
      { id: 'rmem5', left: "XI", right: "11 óra" },
      { id: 'rmem6', left: "VII", right: "7 óra" },
      { id: 'rmem7', left: "III", right: "3 óra" },
      { id: 'rmem8', left: "VIII", right: "8 óra" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Hányadik?",
    description: "Párosítsd a római sorszámot a kiolvasásával!",
    pairs: [
      { id: 'rmem9', left: "Béla", right: "negyedik Béla", promptFigure: <MiniCrownCard label="IV." /> },
      { id: 'rmem10', left: "fejezet", right: "tizennegyedik fejezet", promptFigure: <MiniBookCard label="XIV." /> },
      { id: 'rmem11', left: "kerület", right: "tizenharmadik kerület", promptFigure: <MiniSignCard label="XIII." /> },
      { id: 'rmem12', left: "fejezet ", right: "kilencedik fejezet", promptFigure: <MiniBookCard label="IX." /> },
      { id: 'rmem13', left: "II. András", right: "második András" },
      { id: 'rmem14', left: "I. István", right: "első István" },
      { id: 'rmem15', left: "VI. emelet", right: "hatodik emelet" },
      { id: 'rmem16', left: "XXI. század", right: "huszonegyedik század" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Dátumok",
    description: "Párosítsd a naptárlapot a dátum kiolvasásával!",
    pairs: [
      { id: 'rmem17', left: "", right: "március 15.", promptFigure: <MiniCalCard text="III. 15." /> },
      { id: 'rmem18', left: "", right: "október 23.", promptFigure: <MiniCalCard text="X. 23." /> },
      { id: 'rmem19', left: "", right: "augusztus 20.", promptFigure: <MiniCalCard text="VIII. 20." /> },
      { id: 'rmem20', left: "", right: "december 24.", promptFigure: <MiniCalCard text="XII. 24." /> },
      { id: 'rmem21', left: "I. 1.", right: "január 1." },
      { id: 'rmem22', left: "V. 1.", right: "május 1." },
      { id: 'rmem23', left: "IV. 11.", right: "április 11." },
      { id: 'rmem24', left: "IX. 1.", right: "szeptember 1." }
    ]
  }
];

export const ROMAN_EVERYDAY_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const RomanEverydayG3Matcher: React.FC<RomanEverydayG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-rom-mindennapok-matcher',
  topicTitle = "3. Római számok a mindennapokban és fejtörők – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="romai-szamok-a-mindennapokban"
      title={topicTitle}
      subtitle="Párosítsd a római számokat az órán, a sorszámokban és a dátumokban!"
      levels={ROMAN_EVERYDAY_G3_MATCHER_LEVELS}
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

export default RomanEverydayG3Matcher;
