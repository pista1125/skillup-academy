import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';

interface MassMeasureSorterProps {
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

const MASS_MEASURE_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melyik egységgel mérjük?',
    description: 'Melyik mértékegységgel érdemes megadni a tömegét?',
    categories: [
      { id: 'g', name: 'gramm (g)', color: 'emerald' },
      { id: 'dkg', name: 'dekagramm (dkg)', color: 'blue' },
      { id: 'kg', name: 'kilogramm (kg)', color: 'rose' }
    ],
    items: [
      { id: 'mss1', text: 'egy zacskó bazsalikom', categoryId: 'g' },
      { id: 'mss2', text: 'egy zacskó tárkonylevél', categoryId: 'g' },
      { id: 'mss3', text: 'egy gemkapocs', categoryId: 'g' },
      { id: 'mss4', text: 'egy darab sajt', categoryId: 'dkg' },
      { id: 'mss5', text: 'egy szilva', categoryId: 'dkg' },
      { id: 'mss6', text: 'egy cukkini', categoryId: 'dkg' },
      { id: 'mss7', text: 'egy zsák burgonya', categoryId: 'kg' },
      { id: 'mss8', text: 'egy negyedikes gyerek', categoryId: 'kg' },
      { id: 'mss9', text: 'egy görögdinnye', categoryId: 'kg' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb, mint 10 dkg, pont 10 dkg vagy több?',
    description: 'A fűszerek tömegét grammban látod. Váltsd át, és csoportosíts!',
    categories: [
      { id: 'lt', name: '10 dkg-nál kevesebb', color: 'sky' },
      { id: 'eq', name: 'pontosan 10 dkg', color: 'amber' },
      { id: 'gt', name: '10 dkg-nál több', color: 'purple' }
    ],
    items: [
      { id: 'mss10', text: 'bazsalikom: 8 g', categoryId: 'lt' },
      { id: 'mss11', text: 'rozmaring: 15 g', categoryId: 'lt' },
      { id: 'mss12', text: 'petrezselyem: 30 g', categoryId: 'lt' },
      { id: 'mss13', text: 'fekete bors: 100 g', categoryId: 'eq' },
      { id: 'mss14', text: '5 dkg + 50 g', categoryId: 'eq' },
      { id: 'mss15', text: '10 db 10 g-os csomag', categoryId: 'eq' },
      { id: 'mss16', text: 'kakaó: 150 g', categoryId: 'gt' },
      { id: 'mss17', text: 'mustár: 200 g', categoryId: 'gt' },
      { id: 'mss18', text: 'ételízesítő: 500 g', categoryId: 'gt' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kevesebb, mint 1 kg, pont 1 kg vagy több?',
    description: 'Váltsd át fejben, és tedd a tömeget a jó csoportba!',
    categories: [
      { id: 'lt', name: '< 1 kg', color: 'teal' },
      { id: 'eq', name: '= 1 kg', color: 'emerald' },
      { id: 'gt', name: '> 1 kg', color: 'rose' }
    ],
    items: [
      { id: 'mss19', text: '96 dkg', categoryId: 'lt' },
      { id: 'mss20', text: '990 g', categoryId: 'lt' },
      { id: 'mss21', text: '3 · 250 g', categoryId: 'lt' },
      { id: 'mss22', text: '100 dkg', categoryId: 'eq' },
      { id: 'mss23', text: '1000 g', categoryId: 'eq' },
      { id: 'mss24', text: '4 · 250 g', categoryId: 'eq' },
      { id: 'mss25', text: '1 kg 5 g', categoryId: 'gt' },
      { id: 'mss26', text: '101 dkg', categoryId: 'gt' },
      { id: 'mss27', text: '5 · 250 g', categoryId: 'gt' }
    ]
  }
];

const MASS_MEASURE_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MASS_MEASURE_SORTER_LEVELS_LIST[0],
  2: MASS_MEASURE_SORTER_LEVELS_LIST[1],
  3: MASS_MEASURE_SORTER_LEVELS_LIST[2]
};

export const MassMeasureSorter: React.FC<MassMeasureSorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g4-meas-tomeg-sorter',
  topicTitle = '4. A tömeg mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={4}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-tomeg-merese"
      title={topicTitle}
      subtitle="Csoportosítsd a tömegeket mértékegység és nagyság szerint!"
      levels={MASS_MEASURE_SORTER_LEVELS}
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

export default MassMeasureSorter;
