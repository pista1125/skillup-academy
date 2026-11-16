import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface Rounding10000MatcherProps {
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

const ROUNDING_10000_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Kerekítés tízesre",
    description: "Párosítsd a számot a tízesre kerekített értékével!",
    pairs: [
      { id: 'r10m1', left: "2131", right: "≈ 2130" },
      { id: 'r10m2', left: "4505", right: "≈ 4510" },
      { id: 'r10m3', left: "5354", right: "≈ 5350" },
      { id: 'r10m4', left: "1001", right: "≈ 1000" },
      { id: 'r10m5', left: "6666", right: "≈ 6670" },
      { id: 'r10m6', left: "9047", right: "≈ 9050" },
      { id: 'r10m7', left: "3245", right: "≈ 3250" },
      { id: 'r10m8', left: "7998", right: "≈ 8000" }
    ]
  },
  {
    level: 2,
    title: "2. szint: Kerekítés százasra",
    description: "Párosítsd a számot a százasra kerekített értékével!",
    pairs: [
      { id: 'r10m9', left: "4545", right: "≈ 4500" },
      { id: 'r10m10', left: "4720", right: "≈ 4700" },
      { id: 'r10m11', left: "5050", right: "≈ 5100" },
      { id: 'r10m12', left: "5555", right: "≈ 5600" },
      { id: 'r10m13', left: "5951", right: "≈ 6000" },
      { id: 'r10m14', left: "2248", right: "≈ 2200" },
      { id: 'r10m15', left: "6540", right: "≈ 6500" },
      { id: 'r10m16', left: "9963", right: "≈ 10 000" }
    ]
  },
  {
    level: 3,
    title: "3. szint: Kerekítés ezresre",
    description: "Párosítsd Debrida hegyeinek és számainak magasságát az ezresre kerekített értékkel!",
    pairs: [
      { id: 'r10m17', left: "1295", right: "≈ 1000" },
      { id: 'r10m18', left: "2394 m", right: "≈ 2000 m" },
      { id: 'r10m19', left: "3132 m", right: "≈ 3000 m" },
      { id: 'r10m20', left: "4449", right: "≈ 4000" },
      { id: 'r10m21', left: "5725 m", right: "≈ 6000 m" },
      { id: 'r10m22', left: "7047 m", right: "≈ 7000 m" },
      { id: 'r10m23', left: "8500 m", right: "≈ 9000 m" },
      { id: 'r10m24', left: "9500", right: "≈ 10 000" }
    ]
  }
];

const ROUNDING_10000_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ROUNDING_10000_MATCHER_LEVELS_LIST[0],
  2: ROUNDING_10000_MATCHER_LEVELS_LIST[1],
  3: ROUNDING_10000_MATCHER_LEVELS_LIST[2]
};

export const Rounding10000Matcher: React.FC<Rounding10000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-kerekites-matcher',
  topicTitle = "10. Számszomszédok, kerekítés – Párosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="szamszomszedok-kerekites"
      title={topicTitle}
      subtitle="Párosítsd a számokat a tízesre, százasra és ezresre kerekített értékükkel!"
      levels={ROUNDING_10000_MATCHER_LEVELS}
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

export default Rounding10000Matcher;
