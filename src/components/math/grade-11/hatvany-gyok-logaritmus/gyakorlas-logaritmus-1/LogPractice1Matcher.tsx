import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogPractice1MatcherProps {
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

const LOG_PRACTICE_1_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Logaritmus ↔ érték',
    description: 'Melyik kitevőre kell emelni az alapot? Párosítsd a logaritmust az értékével!',
    pairs: [
      { id: 'lp1m1', left: 'log₃ 81', right: '4' },
      { id: 'lp1m2', left: 'lg 1000', right: '3' },
      { id: 'lp1m3', left: 'log₂ (1/8)', right: '−3' },
      { id: 'lp1m4', left: 'log₅ 1', right: '0' },
      { id: 'lp1m5', left: 'log₁₆ 4', right: '1/2' },
      { id: 'lp1m6', left: 'lg 0,01', right: '−2' },
      { id: 'lp1m7', left: 'log₇ 7', right: '1' },
      { id: 'lp1m8', left: 'log₂₇ 3', right: '1/3' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Érettségi egyenlet ↔ megoldás',
    description: 'Párosítsd az egyenletet a (valós) megoldásával!',
    pairs: [
      { id: 'lp1m9', left: 'log₁₆ x = −1/2', right: 'x = 1/4' },
      { id: 'lp1m10', left: 'log₂ x² = 4', right: 'x = 4 vagy x = −4' },
      { id: 'lp1m11', left: 'log₂ (3 − x) = 0', right: 'x = 2' },
      { id: 'lp1m12', left: '4ˣ = 8', right: 'x = 1,5' },
      { id: 'lp1m13', left: '2ˣ = 10', right: 'x ≈ 3,322' },
      { id: 'lp1m14', left: 'lg x = −2', right: 'x = 0,01' },
      { id: 'lp1m15', left: '3 · 5ˣ = 375', right: 'x = 3' },
      { id: 'lp1m16', left: '9ˣ = 1/3', right: 'x = −1/2' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szöveges feladat ↔ eredmény',
    description: 'Párosítsd a tankönyvi érettségi feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'lp1m17', left: '6 · 10²³ részecske, 10 perc, percenként századrészére', right: '6000' },
      { id: 'lp1m18', left: 'Várható élettartam, G = 1090 USD', right: '≈ 43,5 év' },
      { id: 'lp1m19', left: 'GDP, ha É = 68 év', right: 'G ≈ 4928 USD' },
      { id: 'lp1m20', left: 'Richter, E = 1,344 · 10¹⁴ J', right: 'M ≈ 5,0' },
      { id: 'lp1m21', left: 'Energia, M = 9,3', right: '≈ 3,8 · 10²⁰ J' },
      { id: 'lp1m22', left: 'Energiaarány, ha ΔM = 2', right: '1000-szeres' },
      { id: 'lp1m23', left: '25 millió elektromos autó', right: '2021' },
      { id: 'lp1m24', left: 'Mért nyomás, ha pᵥ = 20 Pa', right: 'pₘ ≈ 22 Pa' }
    ]
  }
];

const LOG_PRACTICE_1_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LOG_PRACTICE_1_MATCHER_LEVELS_LIST[0],
  2: LOG_PRACTICE_1_MATCHER_LEVELS_LIST[1],
  3: LOG_PRACTICE_1_MATCHER_LEVELS_LIST[2]
};

export const LogPractice1Matcher: React.FC<LogPractice1MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-log-gyakorlas-elso-matcher',
  topicTitle = '13. Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="gyakorlas-logaritmus-1"
      title={topicTitle}
      subtitle="Párosítsd a logaritmusokat az értékükkel, az egyenleteket a megoldásukkal és az érettségi feladatokat az eredményükkel!"
      levels={LOG_PRACTICE_1_MATCHER_LEVELS}
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

export default LogPractice1Matcher;
