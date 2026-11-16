import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface OrderOfOps1000MatcherProps {
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

const ORDER_OPS_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Rövid műveletsorok',
    description: 'Figyelj a sorrendre, és párosítsd a műveletsort az eredményével!',
    pairs: [
      { id: 'oo1m1', left: '500 + 4 · 90', right: '860' },
      { id: 'oo1m2', left: '70 · 9 − 8 · 40', right: '310' },
      { id: 'oo1m3', left: '1000 : (350 − 250)', right: '10' },
      { id: 'oo1m4', left: '70 · (9 − 8) · 4', right: '280' },
      { id: 'oo1m5', left: '60 · 5 : 100 · 80', right: '240' },
      { id: 'oo1m6', left: '350 − 190 + 680 + 160', right: '1000' },
      { id: 'oo1m7', left: '50 · 7 − 40 · 3', right: '230' },
      { id: 'oo1m8', left: '480 : 10 + 320', right: '368' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Munkafüzeti műveletsorok',
    description: 'Számold ki a füzetedben, és keresd meg az eredményt!',
    pairs: [
      { id: 'oo1m9', left: '255 · 3 − 535', right: '230' },
      { id: 'oo1m10', left: '970 − 324 · 2', right: '322' },
      { id: 'oo1m11', left: '180 + 8 · 42 − 9 · 11', right: '417' },
      { id: 'oo1m12', left: '(142 + 108) · 3', right: '750' },
      { id: 'oo1m13', left: '970 − (688 − 538)', right: '820' },
      { id: 'oo1m14', left: '(3 · 86) + (4 · 66)', right: '522' },
      { id: 'oo1m15', left: '(460 − 267) · 5 − 400', right: '565' },
      { id: 'oo1m16', left: '7 · (724 − 654)', right: '490' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Zárójellel vagy anélkül?',
    description: 'Ugyanazok a számok – más eredmény! Párosítsd pontosan!',
    pairs: [
      { id: 'oo1m17', left: '1000 − 678 + 127', right: '449' },
      { id: 'oo1m18', left: '1000 − (678 + 127)', right: '195' },
      { id: 'oo1m19', left: '423 − 144 · 2', right: '135' },
      { id: 'oo1m20', left: '(423 − 144) · 2', right: '558' },
      { id: 'oo1m21', left: '3 · 139 + 117', right: '534' },
      { id: 'oo1m22', left: '3 · (139 + 117)', right: '768' },
      { id: 'oo1m23', left: '124 · 8 − 129 · 6', right: '218' },
      { id: 'oo1m24', left: '46 · 3 + 47 · 5', right: '373' }
    ]
  }
];

const ORDER_OPS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ORDER_OPS_MATCHER_LEVELS_LIST[0],
  2: ORDER_OPS_MATCHER_LEVELS_LIST[1],
  3: ORDER_OPS_MATCHER_LEVELS_LIST[2]
};

export const OrderOfOps1000Matcher: React.FC<OrderOfOps1000MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-count-sorrend-matcher',
  topicTitle = '4. A műveletek sorrendje – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId={topicId}
      subtopicId="a-muveletek-sorrendje"
      title={topicTitle}
      subtitle="Párosítsd a műveletsorokat az eredményükkel – figyelj a sorrendre!"
      levels={ORDER_OPS_MATCHER_LEVELS}
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

export default OrderOfOps1000Matcher;
