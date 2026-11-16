import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MeasurementsExamMatcherProps {
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

const MEASUREMENTS_EXAM_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: A fejezet mértékegységei',
    description: 'Párosítsd az egyenlő mennyiségeket!',
    pairs: [
      { id: 'mxm1', left: '1 km', right: '1000 m' },
      { id: 'mxm2', left: '1 m', right: '100 cm' },
      { id: 'mxm3', left: '1 cm', right: '10 mm' },
      { id: 'mxm4', left: '1 kg', right: '100 dkg' },
      { id: 'mxm5', left: '1 dkg', right: '10 g' },
      { id: 'mxm6', left: '1 l', right: '10 dl' },
      { id: 'mxm7', left: '1 cl', right: '10 ml' },
      { id: 'mxm8', left: '1 óra', right: '60 perc' }
    ]
  },
  {
    level: 2,
    title: '2. szint: A társasjáték mezői',
    description: 'Váltsd át a mező mennyiségét, és keresd meg a párját!',
    pairs: [
      { id: 'mxm9', left: '2500 cl', right: '25 l' },
      { id: 'mxm10', left: '200 dkg', right: '2 kg' },
      { id: 'mxm11', left: '4 m', right: '4000 mm' },
      { id: 'mxm12', left: '600 cl', right: '6000 ml' },
      { id: 'mxm13', left: '7000 mm', right: '7 m' },
      { id: 'mxm14', left: '3500 dkg', right: '35 kg' },
      { id: 'mxm15', left: '9500 dl', right: '950 l' },
      { id: 'mxm16', left: '6000 dm', right: '600 m' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vegyes szöveges feladatok',
    description: 'Párosítsd a feladatot a helyes eredménnyel!',
    pairs: [
      { id: 'mxm17', left: 'a 33 m × 21 m-es medence kerülete', right: '108 m' },
      { id: 'mxm18', left: 'hány 1 m-es négyzet fedi a 18 m × 9 m-es pályát?', right: '162 négyzet' },
      { id: 'mxm19', left: 'a hőlégballon össztömege', right: '3702 kg' },
      { id: 'mxm20', left: '100 · 5 dl + 85 l + 3470 dl ital összesen', right: '482 l' },
      { id: 'mxm21', left: 'Hanna útja: negyedóra + 24 perc + 660 mp + 10 perc', right: '60 perc' },
      { id: 'mxm22', left: '3 km 340 m kiegészítése 5 km-re', right: '1 km 660 m' },
      { id: 'mxm23', left: '1000 cm szalag, 10 cm-es darabok, 3 darab egy fonat', right: '33 fonat' },
      { id: 'mxm24', left: '1000 ml-es üveg, benne 80 cl – mennyi fér még bele?', right: '2 dl' }
    ]
  }
];

const MEASUREMENTS_EXAM_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MEASUREMENTS_EXAM_MATCHER_LEVELS_LIST[0],
  2: MEASUREMENTS_EXAM_MATCHER_LEVELS_LIST[1],
  3: MEASUREMENTS_EXAM_MATCHER_LEVELS_LIST[2]
};

export const MeasurementsExamMatcher: React.FC<MeasurementsExamMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-meas-tudasproba-matcher',
  topicTitle = '7. Megálló – tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="megallo"
      title={topicTitle}
      subtitle="Párosítsd a mértékegységeket, a társasjáték mezőit és a vegyes feladatok eredményeit!"
      levels={MEASUREMENTS_EXAM_MATCHER_LEVELS}
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

export default MeasurementsExamMatcher;
