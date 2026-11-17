import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniSticksWideCard } from '../romai-szamok-a-mindennapokban/RomanEverydayG3CardFigures';
import { MiniRodsCard } from './RomanExamG3CardFigures';

interface RomanExamG3MatcherProps {
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
    title: "1. szint: Olvasd el!",
    description: "Párosítsd a pálcikás vagy írott római számot az arab számmal!",
    pairs: [
      { id: 'rexm1', left: "", right: "14", promptFigure: <MiniSticksWideCard text="XIV" /> },
      { id: 'rexm2', left: "", right: "19", promptFigure: <MiniSticksWideCard text="XIX" /> },
      { id: 'rexm3', left: "", right: "26", promptFigure: <MiniSticksWideCard text="XXVI" /> },
      { id: 'rexm4', left: "", right: "38", promptFigure: <MiniSticksWideCard text="XXXVIII" /> },
      { id: 'rexm5', left: "IV", right: "4" },
      { id: 'rexm6', left: "IX", right: "9" },
      { id: 'rexm7', left: "XXI", right: "21" },
      { id: 'rexm8', left: "XXXIII", right: "33" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Számok 100-ig",
    description: "Párosítsd a római számot a tízesrudakkal vagy az arab számmal!",
    pairs: [
      { id: 'rexm9', left: "LXIV", right: "", valueFigure: <MiniRodsCard n={64} /> },
      { id: 'rexm10', left: "XLVII", right: "", valueFigure: <MiniRodsCard n={47} /> },
      { id: 'rexm11', left: "LXXXII", right: "", valueFigure: <MiniRodsCard n={82} /> },
      { id: 'rexm12', left: "LIX", right: "", valueFigure: <MiniRodsCard n={59} /> },
      { id: 'rexm13', left: "LXIX", right: "69" },
      { id: 'rexm14', left: "LXXVI", right: "76" },
      { id: 'rexm15', left: "XCV", right: "95" },
      { id: 'rexm16', left: "C", right: "100" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Számolj!",
    description: "Párosítsd a műveletet az eredményével!",
    pairs: [
      { id: 'rexm17', left: "", right: "35", promptFigure: <MiniSticksWideCard text="XX+XV" /> },
      { id: 'rexm18', left: "", right: "40", promptFigure: <MiniSticksWideCard text="L-X" /> },
      { id: 'rexm19', left: "", right: "28", promptFigure: <MiniSticksWideCard text="XIV+XIV" /> },
      { id: 'rexm20', left: "", right: "45", promptFigure: <MiniSticksWideCard text="LX-XV" /> },
      { id: 'rexm21', left: "XII · V", right: "60" },
      { id: 'rexm22', left: "C – XXX", right: "70" },
      { id: 'rexm23', left: "XXXVI : IV", right: "9" },
      { id: 'rexm24', left: "IX · IX", right: "81" }
    ]
  }
];

export const ROMAN_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LEVELS_LIST[0],
  2: LEVELS_LIST[1],
  3: LEVELS_LIST[2]
};

export const RomanExamG3Matcher: React.FC<RomanExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-rom-tudasproba-matcher',
  topicTitle = "4. Gyakorlás, tudáspróba – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="romai-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd a római számokat és a műveleteket az arab számokkal!"
      levels={ROMAN_EXAM_G3_MATCHER_LEVELS}
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

export default RomanExamG3Matcher;
