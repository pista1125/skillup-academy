import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface NumberLineOppositesMatcherProps {
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

const NUMBER_LINE_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Ellentett párok',
    description: 'Keresd meg minden szám ellentettjét!',
    pairs: [
      { id: 'nl2m1', left: 'az 5 ellentettje', right: '−5' },
      { id: 'nl2m2', left: 'a −3 ellentettje', right: '3' },
      { id: 'nl2m3', left: 'a 7 ellentettje', right: '−7' },
      { id: 'nl2m4', left: 'a −10 ellentettje', right: '10' },
      { id: 'nl2m5', left: 'az 1 ellentettje', right: '−1' },
      { id: 'nl2m6', left: 'a −14 ellentettje', right: '14' },
      { id: 'nl2m7', left: 'a 20 ellentettje', right: '−20' },
      { id: 'nl2m8', left: 'a 0 ellentettje', right: '0' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik számra gondoltam?',
    description: 'Lépj a számegyenesen, és keresd meg a gondolt számot!',
    pairs: [
      { id: 'nl2m9', left: 'a 0-nál 5-tel nagyobb', right: '5' },
      { id: 'nl2m10', left: 'a 0-nál 5-tel kisebb', right: '−5' },
      { id: 'nl2m11', left: 'a 2-nél 5-tel nagyobb', right: '7' },
      { id: 'nl2m12', left: 'a 2-nél 5-tel kisebb', right: '−3' },
      { id: 'nl2m13', left: 'a −10-nél eggyel kisebb', right: '−11' },
      { id: 'nl2m14', left: 'a −10-nél eggyel nagyobb', right: '−9' },
      { id: 'nl2m15', left: 'a −3 kisebb számszomszédja', right: '−4' },
      { id: 'nl2m16', left: 'a −7 nagyobb számszomszédja', right: '−6' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Szöcskeugrások',
    description: 'Hová érkezik a szöcske? Párosítsd az ugrásokat az érkezési számmal!',
    pairs: [
      { id: 'nl2m17', left: '3-ról jobbra 4', right: '7' },
      { id: 'nl2m18', left: '3-ról balra 7', right: '−4' },
      { id: 'nl2m19', left: '3-ról jobbra 6, majd balra 10', right: '−1' },
      { id: 'nl2m20', left: '0-ról balra 6, majd jobbra 1', right: '−5' },
      { id: 'nl2m21', left: '−6-ról jobbra 10', right: '4' },
      { id: 'nl2m22', left: '−2-ről balra 8', right: '−10' },
      { id: 'nl2m23', left: '5-ről balra 5', right: '0' },
      { id: 'nl2m24', left: '−9-ről jobbra 12', right: '3' }
    ]
  }
];

const NUMBER_LINE_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: NUMBER_LINE_MATCHER_LEVELS_LIST[0],
  2: NUMBER_LINE_MATCHER_LEVELS_LIST[1],
  3: NUMBER_LINE_MATCHER_LEVELS_LIST[2]
};

export const NumberLineOppositesMatcher: React.FC<NumberLineOppositesMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-neg-szamegyenes-matcher',
  topicTitle = '2. Számegyenes és ellentettek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="szamegyenes-es-ellentettek"
      title={topicTitle}
      subtitle="Párosítsd az ellentett számokat, a gondolt számokat és a szöcske ugrásait!"
      levels={NUMBER_LINE_MATCHER_LEVELS}
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

export default NumberLineOppositesMatcher;
