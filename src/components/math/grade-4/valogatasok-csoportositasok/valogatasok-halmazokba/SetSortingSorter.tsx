import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface SetSortingSorterProps {
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

const SET_SORTING_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: "1. szint: Madár és háziállat",
    description: "Hová kerül az állat a Madár – Háziállat halmazábrában?",
    categories: [
      { id: 'csakmadar', name: "Csak a Madár karikába", color: 'sky' },
      { id: 'kozos', name: "A közös részbe", color: 'emerald' },
      { id: 'csakhazi', name: "Csak a Háziállat karikába", color: 'rose' }
    ],
    items: [
      { id: 'sss1', text: "flamingó", categoryId: 'csakmadar' },
      { id: 'sss2', text: "gólya", categoryId: 'csakmadar' },
      { id: 'sss3', text: "bagoly", categoryId: 'csakmadar' },
      { id: 'sss4', text: "kacsa", categoryId: 'kozos' },
      { id: 'sss5', text: "tyúk", categoryId: 'kozos' },
      { id: 'sss6', text: "liba", categoryId: 'kozos' },
      { id: 'sss7', text: "kutya", categoryId: 'csakhazi' },
      { id: 'sss8', text: "kecske", categoryId: 'csakhazi' },
      { id: 'sss9', text: "ló", categoryId: 'csakhazi' }
    ]
  },
  {
    level: 2,
    title: "2. szint: Az 50 és a 20 többszörösei",
    description: "Négyjegyű számok. Hová kerül a szám?",
    categories: [
      { id: 'csak50', name: "Az 50 többszöröse, de a 20-é nem", color: 'indigo' },
      { id: 'mindketto', name: "Az 50-é és a 20-é is", color: 'emerald' },
      { id: 'csak20', name: "A 20 többszöröse, de az 50-é nem", color: 'amber' }
    ],
    items: [
      { id: 'sss10', text: "2350", categoryId: 'csak50' },
      { id: 'sss11', text: "8150", categoryId: 'csak50' },
      { id: 'sss12', text: "1050", categoryId: 'csak50' },
      { id: 'sss13', text: "5600", categoryId: 'mindketto' },
      { id: 'sss14', text: "7200", categoryId: 'mindketto' },
      { id: 'sss15', text: "4200", categoryId: 'mindketto' },
      { id: 'sss16', text: "4580", categoryId: 'csak20' },
      { id: 'sss17', text: "8060", categoryId: 'csak20' },
      { id: 'sss18', text: "1040", categoryId: 'csak20' }
    ]
  },
  {
    level: 3,
    title: "3. szint: Síkidomok",
    description: "MF II. 51. o. 11. Hová kerül a síkidom?",
    categories: [
      { id: 'gorbe', name: "Görbe vonal határolja", color: 'rose' },
      { id: 'sokszog', name: "Sokszög, de nem négyszög", color: 'amber' },
      { id: 'negyszog', name: "Négyszög", color: 'emerald' }
    ],
    items: [
      { id: 'sss19', text: "kör", categoryId: 'gorbe' },
      { id: 'sss20', text: "csepp alakú síkidom", categoryId: 'gorbe' },
      { id: 'sss21', text: "holdsarló", categoryId: 'gorbe' },
      { id: 'sss22', text: "háromszög", categoryId: 'sokszog' },
      { id: 'sss23', text: "hatszög", categoryId: 'sokszog' },
      { id: 'sss24', text: "nyíl alakú hétszög", categoryId: 'sokszog' },
      { id: 'sss25', text: "négyzet", categoryId: 'negyszog' },
      { id: 'sss26', text: "téglalap", categoryId: 'negyszog' },
      { id: 'sss27', text: "paralelogramma", categoryId: 'negyszog' }
    ]
  }
];

const SET_SORTING_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: SET_SORTING_SORTER_LEVELS_LIST[0],
  2: SET_SORTING_SORTER_LEVELS_LIST[1],
  3: SET_SORTING_SORTER_LEVELS_LIST[2]
};

export const SetSortingSorter: React.FC<SetSortingSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-group-halmazok-sorter',
  topicTitle = "1. Válogatások halmazokba – Csoportosító Játék",
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="valogatasok-csoportositasok"
      topicId={topicId}
      subtopicId="valogatasok-halmazokba"
      title={topicTitle}
      subtitle="Válogasd szét az állatokat, számokat és síkidomokat a halmazábra részei szerint!"
      levels={SET_SORTING_SORTER_LEVELS}
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

export default SetSortingSorter;
