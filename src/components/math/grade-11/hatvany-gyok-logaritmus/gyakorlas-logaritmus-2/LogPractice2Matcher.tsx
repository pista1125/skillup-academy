import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LogPractice2MatcherProps {
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

const LOG_PRACTICE_2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Logaritmus számológép nélkül',
    description: 'Párosítsd a logaritmust az értékével!',
    pairs: [
      { id: 'lp2m1', left: 'log₃ 9', right: '2' },
      { id: 'lp2m2', left: 'log₂ 64', right: '6' },
      { id: 'lp2m3', left: 'lg 0,0001', right: '−4' },
      { id: 'lp2m4', left: 'lg ³√10', right: '1/3' },
      { id: 'lp2m5', left: 'log₃ 1/9', right: '−2' },
      { id: 'lp2m6', left: 'log₄ 8', right: '3/2' },
      { id: 'lp2m7', left: 'log₈ 4', right: '2/3' },
      { id: 'lp2m8', left: 'log₂ 1/8', right: '−3' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Egyenlet ↔ megoldás',
    description: 'Párosítsd az exponenciális egyenletet a megoldásával!',
    pairs: [
      { id: 'lp2m9', left: '2,4ˣ = 5,76', right: 'x = 2' },
      { id: 'lp2m10', left: '3ˣ⁺¹ = 81', right: 'x = 3' },
      { id: 'lp2m11', left: '4³ˣ⁻¹ = 0,5', right: 'x = 1/6' },
      { id: 'lp2m12', left: '2ˣ = 1/32', right: 'x = −5' },
      { id: 'lp2m13', left: '1,065ᵏ = 3,45', right: 'k ≈ 19,66' },
      { id: 'lp2m14', left: '0,87ᵗ = 0,5', right: 't ≈ 4,98' },
      { id: 'lp2m15', left: '1,133ʰ = 2', right: 'h ≈ 5,55' },
      { id: 'lp2m16', left: '1,06ⁿ = 2,012', right: 'n ≈ 12,0' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Modell ↔ eredmény',
    description: 'Párosítsd a tankönyvi kérdést a modell szerinti eredménnyel!',
    pairs: [
      { id: 'lp2m17', left: 'Légnyomás a Kékestetőn (1,014 km)', right: '≈ 89 250 Pa' },
      { id: 'lp2m18', left: 'Légnyomás a Mont Blanc-on (4,806 km)', right: '≈ 55 590 Pa' },
      { id: 'lp2m19', left: 'Magasság, ahol p = 80 000 Pa', right: '≈ 1,89 km' },
      { id: 'lp2m20', left: 'A kávé hőmérséklete 15 perc múlva', right: '≈ 27,4 °C' },
      { id: 'lp2m21', left: 'Mikor hűl a kávé 21 °C alá?', right: 'kb. 30 perc múlva' },
      { id: 'lp2m22', left: 'p = 1/8 valószínűségű esemény', right: '3 bit' },
      { id: 'lp2m23', left: '4 jegyű PIN-kód', right: '≈ 13,29 bit' },
      { id: 'lp2m24', left: '24 betűs ábécé, 10 karakter', right: '≈ 45,85 bit' }
    ]
  }
};

export const LogPractice2Matcher: React.FC<LogPractice2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-exp-log-gyakorlas-masodik-matcher',
  topicTitle = '15. Gyakorlás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="hatvany-gyok-logaritmus"
      topicId={topicId}
      subtopicId="gyakorlas-logaritmus-2"
      title={topicTitle}
      subtitle="Párosítsd a logaritmusokat, az egyenleteket és a modelleket az eredményükkel!"
      levels={LOG_PRACTICE_2_MATCHER_LEVELS}
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

export default LogPractice2Matcher;
