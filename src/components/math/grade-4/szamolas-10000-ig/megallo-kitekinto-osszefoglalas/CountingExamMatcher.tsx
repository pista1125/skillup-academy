import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface CountingExamMatcherProps {
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

const COUNTING_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Számok, kerekítés, római számok",
    description: "Párosítsd a leírást a számmal!",
    pairs: [
      { id: 'cexm1', left: "3 sz + 4 t + 8 e", right: "348" },
      { id: 'cexm2', left: "hatezer-ötszázhuszonnyolc", right: "6528" },
      { id: 'cexm3', left: "75 tízesre kerekítve", right: "80" },
      { id: 'cexm4', left: "7451 százasra kerekítve", right: "7500" },
      { id: 'cexm5', left: "XXVI", right: "26" },
      { id: 'cexm6', left: "XIX", right: "19" },
      { id: 'cexm7', left: "Az 1000 negyede", right: "250" },
      { id: 'cexm8', left: "A 10 000 tizede", right: "1000" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Fejszámolás és műveleti sorrend",
    description: "Számold ki, és párosítsd az eredménnyel!",
    pairs: [
      { id: 'cexm9', left: "450 + 220", right: "670" },
      { id: 'cexm10', left: "530 − 180", right: "350" },
      { id: 'cexm11', left: "7 · 40", right: "280" },
      { id: 'cexm12', left: "6400 : 20", right: "320" },
      { id: 'cexm13', left: "610 − 490 : 7", right: "540" },
      { id: 'cexm14', left: "(680 − 560) · 5", right: "600" },
      { id: 'cexm15', left: "6 · 120 + 39", right: "759" },
      { id: 'cexm16', left: "(1000 − 720) : 4", right: "70" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Melyik számra gondoltam?",
    description: "Párosítsd a szöveget a számmal!",
    pairs: [
      { id: 'cexm17', left: "A 134 kétszeresénél 184-gyel nagyobb", right: "452" },
      { id: 'cexm18', left: "A 156 és a 168 összegének háromszorosa", right: "972" },
      { id: 'cexm19', left: "A 873 és a 695 különbségének kétszerese", right: "356" },
      { id: 'cexm20', left: "A 90 kilencszeresénél 386-tal kisebb", right: "424" },
      { id: 'cexm21', left: "Az 1000 negyedénél 163-mal nagyobb", right: "413" },
      { id: 'cexm22', left: "A 8350 és az 5640 különbsége", right: "2710" },
      { id: 'cexm23', left: "A 2700, a 4000 és az 1300 összege", right: "8000" },
      { id: 'cexm24', left: "A 4000 ötöde", right: "800" }
    ]
  }
];

const COUNTING_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: COUNTING_EXAM_MATCHER_LEVELS_LIST[0],
  2: COUNTING_EXAM_MATCHER_LEVELS_LIST[1],
  3: COUNTING_EXAM_MATCHER_LEVELS_LIST[2]
};

export const CountingExamMatcher: React.FC<CountingExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-tudasproba-matcher',
  topicTitle = "13. Megálló, Kitekintő – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="megallo-kitekinto-osszefoglalas"
      title={topicTitle}
      subtitle="Az egész I. fejezet: párosítsd a feladatot a megoldásával!"
      levels={COUNTING_EXAM_MATCHER_LEVELS}
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

export default CountingExamMatcher;
