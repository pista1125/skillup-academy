import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface WrittenAddSubMatcherProps {
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

const WRITTEN_ADDSUB_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Maradék nélkül',
    description: 'Ezekben a műveletekben nincs maradék. Számold ki, és párosítsd az eredménnyel!',
    pairs: [
      { id: 'was1', left: '2324 + 3241', right: '5565' },
      { id: 'was2', left: '4512 + 3275', right: '7787' },
      { id: 'was3', left: '6103 + 2804', right: '8907' },
      { id: 'was4', left: '3254 + 5143', right: '8397' },
      { id: 'was5', left: '8765 + 1234', right: '9999' },
      { id: 'was6', left: '5400 − 2300', right: '3100' },
      { id: 'was7', left: '9876 − 4321', right: '5555' },
      { id: 'was8', left: '7584 − 2052', right: '5532' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Becslés százasra kerekítve',
    description: 'Kerekítsd a számokat százasra, és párosítsd a műveletet a becsült értékkel!',
    pairs: [
      { id: 'was9', left: '3845 + 2850', right: 'B: 6700' },
      { id: 'was10', left: '7212 − 5410', right: 'B: 1800' },
      { id: 'was11', left: '7864 − 3243', right: 'B: 4700' },
      { id: 'was12', left: '2548 + 3278', right: 'B: 5800' },
      { id: 'was13', left: '6345 − 2933', right: 'B: 3400' },
      { id: 'was14', left: '3826 + 4513', right: 'B: 8300' },
      { id: 'was15', left: '9658 − 6164', right: 'B: 3500' },
      { id: 'was16', left: '1584 + 3176', right: 'B: 4800' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Írásbeli műveletek maradékkal',
    description: 'Számold ki írásban! Figyelj a maradékra!',
    pairs: [
      { id: 'was17', left: '3256 + 4517', right: '7773' },
      { id: 'was18', left: '2858 + 3642', right: '6500' },
      { id: 'was19', left: '7356 + 1874', right: '9230' },
      { id: 'was20', left: '3956 + 2876', right: '6832' },
      { id: 'was21', left: '6300 − 3649', right: '2651' },
      { id: 'was22', left: '8000 − 2873', right: '5127' },
      { id: 'was23', left: '7030 − 3754', right: '3276' },
      { id: 'was24', left: '9007 − 2879', right: '6128' }
    ]
  }
];

const WRITTEN_ADDSUB_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: WRITTEN_ADDSUB_MATCHER_LEVELS_LIST[0],
  2: WRITTEN_ADDSUB_MATCHER_LEVELS_LIST[1],
  3: WRITTEN_ADDSUB_MATCHER_LEVELS_LIST[2]
};

export const WrittenAddSubMatcher: React.FC<WrittenAddSubMatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g4-wops-osszeadas-kivonas-matcher',
  topicTitle = '1. Írásbeli összeadás és kivonás – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={4}
      chapterId="irasbeli-muveletek-10000-ig"
      topicId={topicId}
      subtopicId="irasbeli-osszeadas-es-kivonas"
      title={topicTitle}
      subtitle="Párosítsd a műveleteket az eredményükkel vagy a becsült értékükkel!"
      levels={WRITTEN_ADDSUB_MATCHER_LEVELS}
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

export default WrittenAddSubMatcher;
