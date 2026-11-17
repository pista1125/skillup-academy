import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface AddSub100G3MatcherProps {
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

const ADD_SUB_100_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kerek tízesek',
    description: 'Párosítsd a műveletet az eredményével!',
    pairs: [
      { id: 'as100m1_0', left: '30 + 40', right: '70' },
      { id: 'as100m1_1', left: '90 − 60', right: '30' },
      { id: 'as100m1_2', left: '20 + 60', right: '80' },
      { id: 'as100m1_3', left: '100 − 50', right: '50' },
      { id: 'as100m1_4', left: '10 + 80', right: '90' },
      { id: 'as100m1_5', left: '70 − 50', right: '20' },
      { id: 'as100m1_6', left: '40 + 60', right: '100' },
      { id: 'as100m1_7', left: '80 − 40', right: '40' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Tízesátlépés',
    description: 'Ugorj előbb a kerek tízesig, és párosíts!',
    pairs: [
      { id: 'as100m2_0', left: '27 + 5', right: '32' },
      { id: 'as100m2_1', left: '38 + 7', right: '45' },
      { id: 'as100m2_2', left: '56 + 8', right: '64' },
      { id: 'as100m2_3', left: '69 + 4', right: '73' },
      { id: 'as100m2_4', left: '41 − 6', right: '35' },
      { id: 'as100m2_5', left: '53 − 7', right: '46' },
      { id: 'as100m2_6', left: '82 − 5', right: '77' },
      { id: 'as100m2_7', left: '95 − 9', right: '86' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kétjegyű számok',
    description: 'Előbb a tízesek, aztán az egyesek!',
    pairs: [
      { id: 'as100m3_0', left: '36 + 47', right: '83' },
      { id: 'as100m3_1', left: '58 + 29', right: '87' },
      { id: 'as100m3_2', left: '25 + 39', right: '64' },
      { id: 'as100m3_3', left: '17 + 74', right: '91' },
      { id: 'as100m3_4', left: '72 − 38', right: '34' },
      { id: 'as100m3_5', left: '91 − 45', right: '46' },
      { id: 'as100m3_6', left: '64 − 19', right: '45' },
      { id: 'as100m3_7', left: '80 − 27', right: '53' }
    ]
  }
];

const ADD_SUB_100_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: ADD_SUB_100_G3_MATCHER_LEVELS_LIST[0],
  2: ADD_SUB_100_G3_MATCHER_LEVELS_LIST[1],
  3: ADD_SUB_100_G3_MATCHER_LEVELS_LIST[2]
};

export const AddSub100G3Matcher: React.FC<AddSub100G3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-c100-osszeadas-matcher',
  topicTitle = '2. Összeadás és kivonás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId={topicId}
      subtopicId="osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Párosítsd a műveleteket az eredményükkel!"
      levels={ADD_SUB_100_G3_MATCHER_LEVELS}
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

export default AddSub100G3Matcher;
