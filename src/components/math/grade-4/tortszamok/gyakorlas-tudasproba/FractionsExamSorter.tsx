import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionsExamSorterProps {
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

export const FRACTIONS_EXAM_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kisebb, egyenlő vagy nagyobb 1 egésznél?',
    description: 'Döntsd el, hol a helye a törtnek!',
    categories: [
      { id: 'lt1', name: 'Egynél kisebb', color: 'sky' },
      { id: 'eq1', name: 'Pont 1 egész', color: 'emerald' },
      { id: 'gt1', name: 'Egynél nagyobb', color: 'rose' }
    ],
    items: [
      { id: 'fes1', text: '3 ötöd', categoryId: 'lt1' },
      { id: 'fes2', text: '7 tized', categoryId: 'lt1' },
      { id: 'fes3', text: '1 nyolcad', categoryId: 'lt1' },
      { id: 'fes4', text: '6 hatod', categoryId: 'eq1' },
      { id: 'fes5', text: '2 ketted', categoryId: 'eq1' },
      { id: 'fes6', text: '8 nyolcad', categoryId: 'eq1' },
      { id: 'fes7', text: '7 harmad', categoryId: 'gt1' },
      { id: 'fes8', text: '5 negyed', categoryId: 'gt1' },
      { id: 'fes9', text: '11 tized', categoryId: 'gt1' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb, mint a fele, vagy több?',
    description: 'Hasonlítsd össze a törtet a felével!',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint a fele', color: 'blue' },
      { id: 'eq', name: 'Pont a fele', color: 'emerald' },
      { id: 'gt', name: 'Több, mint a fele', color: 'amber' }
    ],
    items: [
      { id: 'fes10', text: '2 ötöd', categoryId: 'lt' },
      { id: 'fes11', text: '1 harmad', categoryId: 'lt' },
      { id: 'fes12', text: '3 tized', categoryId: 'lt' },
      { id: 'fes13', text: '4 nyolcad', categoryId: 'eq' },
      { id: 'fes14', text: '3 hatod', categoryId: 'eq' },
      { id: 'fes15', text: '5 tized', categoryId: 'eq' },
      { id: 'fes16', text: '5 hatod', categoryId: 'gt' },
      { id: 'fes17', text: '3 negyed', categoryId: 'gt' },
      { id: 'fes18', text: '4 ötöd', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi az értéke?',
    description: 'Számold ki a törtrészt (előbb osztás, aztán szorzás), és tedd a jó dobozba!',
    categories: [
      { id: 'v600', name: '600', color: 'purple' },
      { id: 'v800', name: '800', color: 'teal' },
      { id: 'v1200', name: '1200', color: 'orange' }
    ],
    items: [
      { id: 'fes19', text: '2400-nak az 1 negyede', categoryId: 'v600' },
      { id: 'fes20', text: '6000-nek az 1 tizede', categoryId: 'v600' },
      { id: 'fes21', text: '1200-nak a 2 negyede', categoryId: 'v600' },
      { id: 'fes22', text: '2400-nak az 1 harmada', categoryId: 'v800' },
      { id: 'fes23', text: '4000-nek az 1 ötöde', categoryId: 'v800' },
      { id: 'fes24', text: '3200-nak az 1 negyede', categoryId: 'v800' },
      { id: 'fes25', text: '2400-nak a fele', categoryId: 'v1200' },
      { id: 'fes26', text: '2400-nak a 2 negyede', categoryId: 'v1200' },
      { id: 'fes27', text: '6000-nek a 2 tizede', categoryId: 'v1200' }
    ]
  }
];

const FRACTIONS_EXAM_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: FRACTIONS_EXAM_SORTER_LEVELS_LIST[0],
  2: FRACTIONS_EXAM_SORTER_LEVELS_LIST[1],
  3: FRACTIONS_EXAM_SORTER_LEVELS_LIST[2]
};

export const FractionsExamSorter: React.FC<FractionsExamSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-frac-tudasproba-sorter',
  topicTitle = '6. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Vegyes csoportosítás a teljes fejezetből!"
      levels={FRACTIONS_EXAM_SORTER_LEVELS}
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

export default FractionsExamSorter;
