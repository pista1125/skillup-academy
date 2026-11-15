import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface G11NumberSetsMatcherProps {
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

const NUMBER_SETS_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Tört ↔ tizedes tört alak',
    description: 'Párosítsd a közönséges törtet a tizedes tört alakjával!',
    pairs: [
      { id: 'nsm1', left: '3/10', right: '0,3' },
      { id: 'nsm2', left: '13/8', right: '1,625' },
      { id: 'nsm3', left: '7/25', right: '0,28' },
      { id: 'nsm4', left: '21/28', right: '0,75' },
      { id: 'nsm5', left: '49/32', right: '1,53125' },
      { id: 'nsm6', left: '113/5', right: '22,6' },
      { id: 'nsm7', left: '4/9', right: '0,4̇' },
      { id: 'nsm8', left: '10/12', right: '0,83̇' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Tört ↔ az egyszerűsített nevező felbontása',
    description: 'Egyszerűsíts, majd párosítsd a törtet a nevező prímtényezős felbontásával!',
    pairs: [
      { id: 'nsm9', left: '13/8', right: '8 = 2³' },
      { id: 'nsm10', left: '7/25', right: '25 = 5²' },
      { id: 'nsm11', left: '3/10', right: '10 = 2 · 5' },
      { id: 'nsm12', left: '10/12', right: '6 = 2 · 3' },
      { id: 'nsm13', left: '4/9', right: '9 = 3²' },
      { id: 'nsm14', left: '2111/990', right: '990 = 2 · 3² · 5 · 11' },
      { id: 'nsm15', left: '3/60', right: '20 = 2² · 5' },
      { id: 'nsm16', left: '18/14', right: '7 (prímszám)' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Szakaszos tizedes tört ↔ közönséges tört',
    description: 'Párosítsd a végtelen szakaszos tizedes törtet a közönséges tört alakjával!',
    pairs: [
      { id: 'nsm17', left: '24,7̇', right: '223/9' },
      { id: 'nsm18', left: '6,4̇', right: '58/9' },
      { id: 'nsm19', left: '13,53̇', right: '203/15' },
      { id: 'nsm20', left: '0,9̇', right: '1' },
      { id: 'nsm21', left: '2,13̇2̇', right: '2111/990' },
      { id: 'nsm22', left: '1,5̇4̇', right: '17/11' },
      { id: 'nsm23', left: '0,83̇', right: '5/6' },
      { id: 'nsm24', left: '1,2̇85714̇', right: '9/7' }
    ]
  }
};

export const G11NumberSetsMatcher: React.FC<G11NumberSetsMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g11-num-szamhalmazok-matcher',
  topicTitle = '1. Számhalmazok – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={11}
      chapterId="szamelmelet"
      topicId={topicId}
      subtopicId="szamhalmazok"
      title={topicTitle}
      subtitle="Párosítsd a törteket a tizedes tört alakjukkal, a nevezők prímtényezőivel és a szakaszos törteket a közönséges tört alakjukkal!"
      levels={NUMBER_SETS_MATCHER_LEVELS}
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

export default G11NumberSetsMatcher;
