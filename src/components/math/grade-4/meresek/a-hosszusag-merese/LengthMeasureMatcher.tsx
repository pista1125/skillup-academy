import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface LengthMeasureMatcherProps {
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

const LENGTH_MEASURE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mértékegységek',
    description: 'Párosítsd a mértékegységet azzal, ami ugyanannyit jelent!',
    pairs: [
      { id: 'lmm1', left: '1 km', right: '1000 m' },
      { id: 'lmm2', left: '1 m', right: '100 cm' },
      { id: 'lmm3', left: '1 dm', right: '10 cm' },
      { id: 'lmm4', left: '1 cm', right: '10 mm' },
      { id: 'lmm5', left: 'deciméter', right: 'a méter tized része' },
      { id: 'lmm6', left: 'centiméter', right: 'a méter század része' },
      { id: 'lmm7', left: 'milliméter', right: 'a méter ezred része' },
      { id: 'lmm8', left: '10 dm', right: '1000 mm' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Keresd a párját!',
    description: 'Párosítsd az egyenlő hosszúságokat!',
    pairs: [
      { id: 'lmm9', left: '2000 m', right: '2 km' },
      { id: 'lmm10', left: '20 cm', right: '2 dm' },
      { id: 'lmm11', left: '200 dm', right: '20 m' },
      { id: 'lmm12', left: '200 cm', right: '2 m' },
      { id: 'lmm13', left: '15 dm', right: '1 m 5 dm' },
      { id: 'lmm14', left: '45 dm', right: '450 cm' },
      { id: 'lmm15', left: '130 cm', right: '13 dm' },
      { id: 'lmm16', left: '63 mm', right: '6 cm 3 mm' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szöveges feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'lmm17', left: 'Marci 190 cm-t ugrott, Gergő 20 cm-rel többet. Gergő ugrása?', right: '210 cm' },
      { id: 'lmm18', left: '2 km 400 m a 400 m-es pályán – hány kör?', right: '6 kör' },
      { id: 'lmm19', left: 'Utasszállító (10 km) és sárkányrepülő (2900 m) különbsége', right: '7100 m' },
      { id: 'lmm20', left: 'Sárkányrepülő (2900 m) és hőlégballon (1200 m) különbsége', right: '1700 m' },
      { id: 'lmm21', left: '236 km + 284 km + ? = 758 km', right: '238 km' },
      { id: 'lmm22', left: 'Luca 1500 m-re lakik, oda-vissza naponta', right: '3 km' },
      { id: 'lmm23', left: '3 m-es szobor 80 cm-es talapzaton (dm-ben)', right: '38 dm' },
      { id: 'lmm24', left: 'Rozi háza → nagymama (550 m) → iskola (800 m)', right: '1350 m' }
    ]
  }
];

const LENGTH_MEASURE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: LENGTH_MEASURE_MATCHER_LEVELS_LIST[0],
  2: LENGTH_MEASURE_MATCHER_LEVELS_LIST[1],
  3: LENGTH_MEASURE_MATCHER_LEVELS_LIST[2]
};

export const LengthMeasureMatcher: React.FC<LengthMeasureMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-meas-hosszusag-matcher',
  topicTitle = '1. A hosszúság mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-hosszusag-merese"
      title={topicTitle}
      subtitle="Párosítsd a mértékegységeket, az egyenlő hosszúságokat és a feladatok eredményeit!"
      levels={LENGTH_MEASURE_MATCHER_LEVELS}
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

export default LengthMeasureMatcher;
