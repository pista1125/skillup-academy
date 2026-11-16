import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionCompare4MatcherProps {
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

export const FRACTION_COMPARE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik a nagyobb?',
    description: 'Párosítsd a két törtet a nagyobbikkal! (Mindig ugyanakkora egész részeiről van szó.)',
    pairs: [
      { id: 'fc4m1', left: '1 harmad vagy 1 negyed?', right: '1 harmad' },
      { id: 'fc4m2', left: '2 ötöd vagy 4 ötöd?', right: '4 ötöd' },
      { id: 'fc4m3', left: '1 ketted vagy 1 tized?', right: '1 ketted' },
      { id: 'fc4m4', left: '1 hatod vagy 5 hatod?', right: '5 hatod' },
      { id: 'fc4m5', left: '1 nyolcad vagy 1 negyed?', right: '1 negyed' },
      { id: 'fc4m6', left: '3 tized vagy 7 tized?', right: '7 tized' },
      { id: 'fc4m7', left: '1 ötöd vagy 1 hatod?', right: '1 ötöd' },
      { id: 'fc4m8', left: '2 harmad vagy 1 harmad?', right: '2 harmad' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Más néven ugyanannyi',
    description: 'Párosítsd az egyenlő törteket!',
    pairs: [
      { id: 'fc4m9', left: '1 ketted (fele)', right: '5 tized' },
      { id: 'fc4m10', left: '4 negyed', right: '1 egész' },
      { id: 'fc4m11', left: '1 harmad', right: '2 hatod' },
      { id: 'fc4m12', left: '1 negyed', right: '2 nyolcad' },
      { id: 'fc4m13', left: '3 negyed', right: '6 nyolcad' },
      { id: 'fc4m14', left: '2 harmad', right: '4 hatod' },
      { id: 'fc4m15', left: '1 ötöd', right: '2 tized' },
      { id: 'fc4m16', left: '4 ötöd', right: '8 tized' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számold ki, aztán hasonlíts!',
    description: 'Párosítsd a törtrészt a kiszámolt mennyiséggel!',
    pairs: [
      { id: 'fc4m17', left: '1 km 1 negyede', right: '250 m' },
      { id: 'fc4m18', left: '1 km 3 ötöde', right: '600 m' },
      { id: 'fc4m19', left: '2 m 3 negyede (mókus)', right: '150 cm' },
      { id: 'fc4m20', left: '2 m 4 tizede (béka)', right: '80 cm' },
      { id: 'fc4m21', left: '2 m 4 ötöde (nyúl)', right: '160 cm' },
      { id: 'fc4m22', left: '2400 Ft 1 ötöde', right: '480 Ft' },
      { id: 'fc4m23', left: '2400 Ft 2 harmada', right: '1600 Ft' },
      { id: 'fc4m24', left: '400 liter 6 tizede', right: '240 liter' }
    ]
  }
];

const FRACTION_COMPARE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: FRACTION_COMPARE_MATCHER_LEVELS_LIST[0],
  2: FRACTION_COMPARE_MATCHER_LEVELS_LIST[1],
  3: FRACTION_COMPARE_MATCHER_LEVELS_LIST[2]
};

export const FractionCompare4Matcher: React.FC<FractionCompare4MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-frac-osszehasonlitas-matcher',
  topicTitle = '4. Törtek összehasonlítása – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="tortek-osszehasonlitasa"
      title={topicTitle}
      subtitle="Melyik a nagyobb? Melyik tört egyenlő a másikkal? Párosíts!"
      levels={FRACTION_COMPARE_MATCHER_LEVELS}
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

export default FractionCompare4Matcher;
