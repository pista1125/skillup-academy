import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface OrderOps100G3MatcherProps {
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

const ORDER_OPS_100_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Csak + és −',
    description: 'Balról jobbra számolj, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'oo100m1', left: '40 − 15 + 8', right: '33' },
      { id: 'oo100m2', left: '25 + 16 − 9', right: '32' },
      { id: 'oo100m3', left: '70 − 20 − 10', right: '40' },
      { id: 'oo100m4', left: '18 + 13 + 8', right: '39' },
      { id: 'oo100m5', left: '90 − 30 + 5', right: '65' },
      { id: 'oo100m6', left: '56 − 6 − 20', right: '30' },
      { id: 'oo100m7', left: '33 + 7 − 25', right: '15' },
      { id: 'oo100m8', left: '100 − 50 + 25', right: '75' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Csak · és :',
    description: 'Balról jobbra számolj, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'oo100m9', left: '36 : 6 · 2', right: '12' },
      { id: 'oo100m10', left: '2 · 5 · 3', right: '30' },
      { id: 'oo100m11', left: '48 : 6 · 3', right: '24' },
      { id: 'oo100m12', left: '8 · 3 : 4', right: '6' },
      { id: 'oo100m13', left: '60 : 10 : 2', right: '3' },
      { id: 'oo100m14', left: '5 · 4 : 2', right: '10' },
      { id: 'oo100m15', left: '9 · 2 · 4', right: '72' },
      { id: 'oo100m16', left: '72 : 8 · 5', right: '45' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Vegyes műveletsorok',
    description: 'Előbb szorozz és oszd el, utána adj össze és vonj ki!',
    pairs: [
      { id: 'oo100m17', left: '8 + 3 · 2', right: '14' },
      { id: 'oo100m18', left: '20 − 12 : 4', right: '17' },
      { id: 'oo100m19', left: '5 · 4 + 6', right: '26' },
      { id: 'oo100m20', left: '64 − 7 · 8', right: '8' },
      { id: 'oo100m21', left: '35 + 24 : 3', right: '43' },
      { id: 'oo100m22', left: '4 · 6 + 3 · 5', right: '39' },
      { id: 'oo100m23', left: '50 − 6 · 4 + 9', right: '35' },
      { id: 'oo100m24', left: '72 : 8 + 36 : 4', right: '18' }
    ]
  }
];

const ORDER_OPS_100_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ORDER_OPS_100_G3_MATCHER_LEVELS_LIST[0],
  2: ORDER_OPS_100_G3_MATCHER_LEVELS_LIST[1],
  3: ORDER_OPS_100_G3_MATCHER_LEVELS_LIST[2]
};

export const OrderOps100G3Matcher: React.FC<OrderOps100G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-sorrend-matcher',
  topicTitle = '6. A műveletek sorrendje – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="a-muveletek-sorrendje"
      title={topicTitle}
      subtitle="Párosítsd a műveletsort az eredményével!"
      levels={ORDER_OPS_100_G3_MATCHER_LEVELS}
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

export default OrderOps100G3Matcher;
