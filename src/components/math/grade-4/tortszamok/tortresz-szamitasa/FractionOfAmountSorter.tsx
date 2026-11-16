import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface FractionOfAmountSorterProps {
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

export const FRACTION_OF_AMOUNT_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi az eredmény?',
    description: 'Számold ki a törtrészt, és tedd a jó dobozba!',
    categories: [
      { id: 'r5', name: 'Eredmény: 5', color: 'blue' },
      { id: 'r10', name: 'Eredmény: 10', color: 'emerald' },
      { id: 'r20', name: 'Eredmény: 20', color: 'amber' }
    ],
    items: [
      { id: 'foas1', text: '10 fele', categoryId: 'r5' },
      { id: 'foas2', text: '15 harmada', categoryId: 'r5' },
      { id: 'foas3', text: '20 negyede', categoryId: 'r5' },
      { id: 'foas4', text: '20 fele', categoryId: 'r10' },
      { id: 'foas5', text: '30 harmada', categoryId: 'r10' },
      { id: 'foas6', text: '40 negyede', categoryId: 'r10' },
      { id: 'foas7', text: '40 fele', categoryId: 'r20' },
      { id: 'foas8', text: '60 harmada', categoryId: 'r20' },
      { id: 'foas9', text: '80 negyede', categoryId: 'r20' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb, mint fél méter, vagy több?',
    description: '1 m = 100 cm. Számold ki a méter törtrészét, és hasonlítsd össze 50 cm-rel!',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 50 cm', color: 'sky' },
      { id: 'eq', name: 'Pont 50 cm', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 50 cm', color: 'rose' }
    ],
    items: [
      { id: 'foas10', text: 'a méter negyede', categoryId: 'lt' },
      { id: 'foas11', text: 'a méter 3 tizede', categoryId: 'lt' },
      { id: 'foas12', text: 'a méter 2 ötöde', categoryId: 'lt' },
      { id: 'foas13', text: 'a méter fele', categoryId: 'eq' },
      { id: 'foas14', text: 'a méter 2 negyede', categoryId: 'eq' },
      { id: 'foas15', text: 'a méter 5 tizede', categoryId: 'eq' },
      { id: 'foas16', text: 'a méter 3 negyede', categoryId: 'gt' },
      { id: 'foas17', text: 'a méter 4 ötöde', categoryId: 'gt' },
      { id: 'foas18', text: 'a méter 7 tizede', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány perc?',
    description: '1 óra = 60 perc. Melyik dobozba kerül az időtartam?',
    categories: [
      { id: 'm15', name: '15 perc', color: 'purple' },
      { id: 'm30', name: '30 perc', color: 'teal' },
      { id: 'm45', name: '45 perc', color: 'orange' }
    ],
    items: [
      { id: 'foas19', text: '1 óra 1 negyede', categoryId: 'm15' },
      { id: 'foas20', text: '1 óra 3 tizenkettede', categoryId: 'm15' },
      { id: 'foas21', text: 'a fél óra fele', categoryId: 'm15' },
      { id: 'foas22', text: '1 óra 5 tizede', categoryId: 'm30' },
      { id: 'foas23', text: '1 óra 2 negyede', categoryId: 'm30' },
      { id: 'foas24', text: '1 óra 3 hatoda', categoryId: 'm30' },
      { id: 'foas25', text: '1 óra 3 negyede', categoryId: 'm45' },
      { id: 'foas26', text: '1 óra 9 tizenkettede', categoryId: 'm45' },
      { id: 'foas27', text: 'fél óra és negyed óra együtt', categoryId: 'm45' }
    ]
  }
];

const FRACTION_OF_AMOUNT_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: FRACTION_OF_AMOUNT_SORTER_LEVELS_LIST[0],
  2: FRACTION_OF_AMOUNT_SORTER_LEVELS_LIST[1],
  3: FRACTION_OF_AMOUNT_SORTER_LEVELS_LIST[2]
};

export const FractionOfAmountSorter: React.FC<FractionOfAmountSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-frac-tortresz-sorter',
  topicTitle = '5. Törtrész kiszámítása – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="tortszamok"
      topicId={topicId}
      subtopicId="tortresz-szamitasa"
      title={topicTitle}
      subtitle="Számold ki a törtrészt, és tedd a megfelelő dobozba!"
      levels={FRACTION_OF_AMOUNT_SORTER_LEVELS}
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

export default FractionOfAmountSorter;
