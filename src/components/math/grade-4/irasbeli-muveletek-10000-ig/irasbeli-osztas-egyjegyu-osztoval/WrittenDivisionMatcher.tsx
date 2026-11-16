import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenDivisionMatcherProps {
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

const WRITTEN_DIV_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Osztás bontással',
    description: 'Bontsd helyi értékek szerint, és oszd el fejben! Párosítsd az osztást a hányadossal!',
    pairs: [
      { id: 'wd1', left: '660 : 3', right: '220' },
      { id: 'wd2', left: '840 : 4', right: '210' },
      { id: 'wd3', left: '4840 : 4', right: '1210' },
      { id: 'wd4', left: '4680 : 2', right: '2340' },
      { id: 'wd5', left: '3930 : 3', right: '1310' },
      { id: 'wd6', left: '8480 : 4', right: '2120' },
      { id: 'wd7', left: '3690 : 3', right: '1230' },
      { id: 'wd8', left: '2820 : 2', right: '1410' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Írásbeli osztás felváltással',
    description: 'Oszd el írásban! Ha marad, váltsd fel a következő helyi értékre!',
    pairs: [
      { id: 'wd9', left: '2872 : 2', right: '1436' },
      { id: 'wd10', left: '734 : 2', right: '367' },
      { id: 'wd11', left: '750 : 3', right: '250' },
      { id: 'wd12', left: '5648 : 4', right: '1412' },
      { id: 'wd13', left: '5840 : 5', right: '1168' },
      { id: 'wd14', left: '5469 : 3', right: '1823' },
      { id: 'wd15', left: '9608 : 8', right: '1201' },
      { id: 'wd16', left: '4893 : 3', right: '1631' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Maradékos osztás',
    description: 'Oszd el írásban! Párosítsd a hányadost és a maradékot!',
    pairs: [
      { id: 'wd17', left: '224 : 3', right: '74, marad 2' },
      { id: 'wd18', left: '7319 : 4', right: '1829, marad 3' },
      { id: 'wd19', left: '6813 : 5', right: '1362, marad 3' },
      { id: 'wd20', left: '892 : 7', right: '127, marad 3' },
      { id: 'wd21', left: '8866 : 8', right: '1108, marad 2' },
      { id: 'wd22', left: '777 : 9', right: '86, marad 3' },
      { id: 'wd23', left: '236 : 6', right: '39, marad 2' },
      { id: 'wd24', left: '1421 : 6', right: '236, marad 5' }
    ]
  }
];

const WRITTEN_DIV_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WRITTEN_DIV_MATCHER_LEVELS_LIST[0],
  2: WRITTEN_DIV_MATCHER_LEVELS_LIST[1],
  3: WRITTEN_DIV_MATCHER_LEVELS_LIST[2]
};

export const WrittenDivisionMatcher: React.FC<WrittenDivisionMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wops-osztas-matcher',
  topicTitle = '3. Írásbeli osztás egyjegyű osztóval – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="irasbeli-osztas-egyjegyu-osztoval"
      title={topicTitle}
      subtitle="Párosítsd az osztásokat a hányadosukkal és a maradékukkal!"
      levels={WRITTEN_DIV_MATCHER_LEVELS}
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

export default WrittenDivisionMatcher;
