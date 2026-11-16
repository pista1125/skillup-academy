import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionCompare4SorterProps {
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

export const FRACTION_COMPARE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kevesebb, mint a fele, vagy több?',
    description: 'Hasonlítsd össze a törtet a felével (1 ketteddel)!',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint a fele', color: 'blue' },
      { id: 'eq', name: 'Pont a fele', color: 'emerald' },
      { id: 'gt', name: 'Több, mint a fele', color: 'amber' }
    ],
    items: [
      { id: 'fc4s1', text: '1 harmad', categoryId: 'lt' },
      { id: 'fc4s2', text: '2 ötöd', categoryId: 'lt' },
      { id: 'fc4s3', text: '3 nyolcad', categoryId: 'lt' },
      { id: 'fc4s4', text: '2 negyed', categoryId: 'eq' },
      { id: 'fc4s5', text: '5 tized', categoryId: 'eq' },
      { id: 'fc4s6', text: '3 hatod', categoryId: 'eq' },
      { id: 'fc4s7', text: '3 negyed', categoryId: 'gt' },
      { id: 'fc4s8', text: '2 harmad', categoryId: 'gt' },
      { id: 'fc4s9', text: '7 tized', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kisebb, egyenlő vagy nagyobb 1 egésznél?',
    description: 'Döntsd el, hogy a tört kevesebb, pont annyi vagy több, mint 1 egész!',
    categories: [
      { id: 'lt1', name: 'Kisebb 1 egésznél', color: 'sky' },
      { id: 'eq1', name: 'Pont 1 egész', color: 'emerald' },
      { id: 'gt1', name: 'Nagyobb 1 egésznél', color: 'rose' }
    ],
    items: [
      { id: 'fc4s10', text: '5 hatod', categoryId: 'lt1' },
      { id: 'fc4s11', text: '9 tized', categoryId: 'lt1' },
      { id: 'fc4s12', text: '2 harmad', categoryId: 'lt1' },
      { id: 'fc4s13', text: '4 negyed', categoryId: 'eq1' },
      { id: 'fc4s14', text: '3 harmad', categoryId: 'eq1' },
      { id: 'fc4s15', text: '10 tized', categoryId: 'eq1' },
      { id: 'fc4s16', text: '5 negyed', categoryId: 'gt1' },
      { id: 'fc4s17', text: '4 harmad', categoryId: 'gt1' },
      { id: 'fc4s18', text: '3 ketted', categoryId: 'gt1' }
    ]
  },
  {
    level: 3,
    title: '3. szint: A vagy B a nagyobb?',
    description: 'Ugyanakkora egészek részeit hasonlítjuk össze. Melyik a nagyobb?',
    categories: [
      { id: 'a', name: 'A a nagyobb', color: 'orange' },
      { id: 'same', name: 'Egyenlők', color: 'emerald' },
      { id: 'b', name: 'B a nagyobb', color: 'purple' }
    ],
    items: [
      { id: 'fc4s19', text: 'A: 3 negyed • B: 3 ötöd', categoryId: 'a' },
      { id: 'fc4s20', text: 'A: 2 harmad • B: 1 ketted', categoryId: 'a' },
      { id: 'fc4s21', text: 'A: 4 ötöd • B: 3 negyed', categoryId: 'a' },
      { id: 'fc4s22', text: 'A: 1 harmad • B: 2 hatod', categoryId: 'same' },
      { id: 'fc4s23', text: 'A: 2 negyed • B: 5 tized', categoryId: 'same' },
      { id: 'fc4s24', text: 'A: 4 ötöd • B: 8 tized', categoryId: 'same' },
      { id: 'fc4s25', text: 'A: 3 nyolcad • B: 2 negyed', categoryId: 'b' },
      { id: 'fc4s26', text: 'A: 4 tized • B: 2 negyed', categoryId: 'b' },
      { id: 'fc4s27', text: 'A: 1 hatod • B: 1 ötöd', categoryId: 'b' }
    ]
  }
];

const FRACTION_COMPARE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: FRACTION_COMPARE_SORTER_LEVELS_LIST[0],
  2: FRACTION_COMPARE_SORTER_LEVELS_LIST[1],
  3: FRACTION_COMPARE_SORTER_LEVELS_LIST[2]
};

export const FractionCompare4Sorter: React.FC<FractionCompare4SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-frac-osszehasonlitas-sorter',
  topicTitle = '4. Törtek összehasonlítása – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="tortek-osszehasonlitasa"
      title={topicTitle}
      subtitle="Kevesebb vagy több, mint a fele? Kisebb vagy nagyobb 1 egésznél? Csoportosíts!"
      levels={FRACTION_COMPARE_SORTER_LEVELS}
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

export default FractionCompare4Sorter;
