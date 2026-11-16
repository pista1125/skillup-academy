import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface ImproperFractionsSorterProps {
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

export const IMPROPER_FRACTIONS_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kisebb, egyenlő vagy nagyobb 1-nél?',
    description: 'Válogasd szét a törteket!',
    categories: [
      { id: 'lt', name: 'Egynél kisebb', color: 'blue' },
      { id: 'eq', name: 'Pontosan 1 egész', color: 'emerald' },
      { id: 'gt', name: 'Egynél nagyobb', color: 'amber' }
    ],
    items: [
      { id: 'ifs1', text: '3 negyed', categoryId: 'lt' },
      { id: 'ifs2', text: '5 hatod', categoryId: 'lt' },
      { id: 'ifs3', text: '1 tized', categoryId: 'lt' },
      { id: 'ifs4', text: '4 negyed', categoryId: 'eq' },
      { id: 'ifs5', text: '10 tized', categoryId: 'eq' },
      { id: 'ifs6', text: '3 harmad', categoryId: 'eq' },
      { id: 'ifs7', text: '5 negyed', categoryId: 'gt' },
      { id: 'ifs8', text: '3 ketted', categoryId: 'gt' },
      { id: 'ifs9', text: '7 harmad', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Helyzetek',
    description: 'Kevesebb, pont annyi vagy több, mint az egész?',
    categories: [
      { id: 'lt', name: 'Kevesebb az egésznél', color: 'blue' },
      { id: 'eq', name: 'Pontosan az egész', color: 'emerald' },
      { id: 'gt', name: 'Több az egésznél', color: 'amber' }
    ],
    items: [
      { id: 'ifs10', text: 'A 4 szeletes pizzából 3 szeletet ettél meg', categoryId: 'lt' },
      { id: 'ifs11', text: 'A dézsa 6 tized része megtelt', categoryId: 'lt' },
      { id: 'ifs12', text: 'A francia zászló kék csíkja', categoryId: 'lt' },
      { id: 'ifs13', text: 'A francia zászló mindhárom harmada', categoryId: 'eq' },
      { id: 'ifs14', text: 'A méter 4 negyede', categoryId: 'eq' },
      { id: 'ifs15', text: '300 Ft-nak az 5 ötöde', categoryId: 'eq' },
      { id: 'ifs16', text: '1 és negyed óra (1 órához képest)', categoryId: 'gt' },
      { id: 'ifs17', text: '5 negyed pizza (1 pizzához képest)', categoryId: 'gt' },
      { id: 'ifs18', text: '3 fél alma (1 almához képest)', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány egész?',
    description: 'Válogasd szét aszerint, hány egészet adnak ki a részek!',
    categories: [
      { id: 'one', name: '1 egész', color: 'teal' },
      { id: 'two', name: '2 egész', color: 'purple' },
      { id: 'three', name: '3 egész', color: 'rose' }
    ],
    items: [
      { id: 'ifs19', text: '2 ketted', categoryId: 'one' },
      { id: 'ifs20', text: '6 hatod', categoryId: 'one' },
      { id: 'ifs21', text: '10 tized', categoryId: 'one' },
      { id: 'ifs22', text: '4 ketted', categoryId: 'two' },
      { id: 'ifs23', text: '6 harmad', categoryId: 'two' },
      { id: 'ifs24', text: '8 negyed', categoryId: 'two' },
      { id: 'ifs25', text: '6 ketted', categoryId: 'three' },
      { id: 'ifs26', text: '9 harmad', categoryId: 'three' },
      { id: 'ifs27', text: '12 negyed', categoryId: 'three' }
    ]
  }
];

const IMPROPER_FRACTIONS_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: IMPROPER_FRACTIONS_SORTER_LEVELS_LIST[0],
  2: IMPROPER_FRACTIONS_SORTER_LEVELS_LIST[1],
  3: IMPROPER_FRACTIONS_SORTER_LEVELS_LIST[2]
};

export const ImproperFractionsSorter: React.FC<ImproperFractionsSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-frac-egynel-nagyobb-sorter',
  topicTitle = '3. Az 1 egész és az egynél nagyobb törtek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="egynel-nagyobb-tortek"
      title={topicTitle}
      subtitle="Egynél kisebb, pontosan 1 egész vagy egynél nagyobb? Hány egészet adnak ki a részek?"
      levels={IMPROPER_FRACTIONS_SORTER_LEVELS}
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

export default ImproperFractionsSorter;
