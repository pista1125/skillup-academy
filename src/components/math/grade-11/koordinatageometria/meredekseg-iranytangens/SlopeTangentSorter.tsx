import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SlopeTangentSorterProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const SLOPE_TANGENT_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Emelkedő, csökkenő vagy vízszintes?',
    description: 'Csoportosítsd az egyeneseket a meredekségük előjele szerint!',
    categories: [
      { id: 'pos', name: 'Emelkedő (m > 0)', color: 'emerald' },
      { id: 'neg', name: 'Csökkenő (m < 0)', color: 'rose' },
      { id: 'zero', name: 'Vízszintes (m = 0)', color: 'blue' }
    ],
    items: [
      { id: 'sts1', text: 'y = 2x − 5', categoryId: 'pos' },
      { id: 'sts2', text: '3x − 2y = −6', categoryId: 'pos' },
      { id: 'sts3', text: 'Irányszöge 25°', categoryId: 'pos' },
      { id: 'sts4', text: 'x + 3y + 12 = 0', categoryId: 'neg' },
      { id: 'sts5', text: '10%-os lejtő', categoryId: 'neg' },
      { id: 'sts6', text: 'Átmegy a (0; 3) és a (3; 0) ponton', categoryId: 'neg' },
      { id: 'sts7', text: 'y = 3', categoryId: 'zero' },
      { id: 'sts8', text: 'Az x tengely', categoryId: 'zero' },
      { id: 'sts9', text: 'Átmegy a (−2; 4) és a (5; 4) ponton', categoryId: 'zero' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Mekkora a meredekség?',
    description: 'Csoportosítsd az egyeneseket a meredekségük szerint!',
    categories: [
      { id: 'two', name: 'm = 2', color: 'blue' },
      { id: 'half', name: 'm = −1/2', color: 'purple' },
      { id: 'none', name: 'Nincs meredeksége', color: 'slate' }
    ],
    items: [
      { id: 'sts10', text: 'y = 2x + 7', categoryId: 'two' },
      { id: 'sts11', text: 'A(1; 2) és B(4; 8) pontokon átmenő egyenes', categoryId: 'two' },
      { id: 'sts12', text: '4x − 2y = 3', categoryId: 'two' },
      { id: 'sts13', text: 'x + 2y = 0', categoryId: 'half' },
      { id: 'sts14', text: '(−1; 2) és (3; 0) pontokon átmenő egyenes', categoryId: 'half' },
      { id: 'sts15', text: 'y = −0,5x + 4', categoryId: 'half' },
      { id: 'sts16', text: 'x = 3', categoryId: 'none' },
      { id: 'sts17', text: 'Az y tengely', categoryId: 'none' },
      { id: 'sts18', text: '(2; −1) és (2; 5) pontokon átmenő egyenes', categoryId: 'none' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Az irányszög tartománya',
    description: 'Hová esik az egyenes irányszöge?',
    categories: [
      { id: 'small', name: '0° < α < 45°', color: 'emerald' },
      { id: 'big', name: '45° < α < 90°', color: 'amber' },
      { id: 'negative', name: '−90° < α < 0°', color: 'rose' }
    ],
    items: [
      { id: 'sts19', text: 'm = 0,12 (12%-os emelkedő)', categoryId: 'small' },
      { id: 'sts20', text: 'y = 4/5 x + 1', categoryId: 'small' },
      { id: 'sts21', text: '3x − 5y = 8', categoryId: 'small' },
      { id: 'sts22', text: '3x − 2y = −6', categoryId: 'big' },
      { id: 'sts23', text: 'Támasztólétra: 1,73 ≤ m ≤ 2,75', categoryId: 'big' },
      { id: 'sts24', text: '4x = y + 2', categoryId: 'big' },
      { id: 'sts25', text: 'Iránytangense −4/7', categoryId: 'negative' },
      { id: 'sts26', text: 'y = −3,75x + 3', categoryId: 'negative' },
      { id: 'sts27', text: 'x + y = 3', categoryId: 'negative' }
    ]
  }
];

const SLOPE_TANGENT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SLOPE_TANGENT_SORTER_LEVELS_LIST[0],
  2: SLOPE_TANGENT_SORTER_LEVELS_LIST[1],
  3: SLOPE_TANGENT_SORTER_LEVELS_LIST[2]
};

export const SlopeTangentSorter: React.FC<SlopeTangentSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g11-geo-meredekseg-sorter',
  topicTitle = '13. Meredekség, iránytangens – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId={topicId}
      subtopicId="meredekseg-iranytangens"
      title={topicTitle}
      subtitle="Rendszerezd az egyeneseket meredekségük előjele, értéke és irányszögük szerint!"
      levels={SLOPE_TANGENT_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default SlopeTangentSorter;
