import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniJug, SortGridRect, RulerIcon, TapeIcon, BalanceIcon, KitchenScaleIcon, CupIcon, BottleIcon } from './MeasurementsExamG3CardFigures';

interface MeasurementsExamG3SorterProps {
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

const MEASUREMENTS_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mit mérünk vele?',
    description: 'Hosszúságot, tömeget vagy űrtartalmat?',
    categories: [
      { id: 'hossz', name: 'hosszúság', color: 'sky' },
      { id: 'tomeg', name: 'tömeg', color: 'amber' },
      { id: 'ur', name: 'űrtartalom', color: 'emerald' }
    ],
    items: [
      { id: 'mexs1', text: 'vonalzó', figure: <RulerIcon />, categoryId: 'hossz' },
      { id: 'mexs2', text: 'mérőszalag', figure: <TapeIcon />, categoryId: 'hossz' },
      { id: 'mexs3', text: '45 mm', categoryId: 'hossz' },
      { id: 'mexs4', text: 'kétkarú mérleg', figure: <BalanceIcon />, categoryId: 'tomeg' },
      { id: 'mexs5', text: 'konyhai mérleg', figure: <KitchenScaleIcon />, categoryId: 'tomeg' },
      { id: 'mexs6', text: '2 kg', categoryId: 'tomeg' },
      { id: 'mexs7', text: 'mérőpohár', figure: <CupIcon />, categoryId: 'ur' },
      { id: 'mexs8', text: '1 literes palack', figure: <BottleIcon />, categoryId: 'ur' },
      { id: 'mexs9', text: '25 cl', categoryId: 'ur' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 1 liternél kevesebb vagy több?',
    description: 'Hasonlítsd össze 1 literrel! 1 l = 10 dl = 100 cl.',
    categories: [
      { id: 'kev', name: 'kevesebb, mint 1 l', color: 'sky' },
      { id: 'egy', name: 'pontosan 1 l', color: 'emerald' },
      { id: 'tobb', name: 'több, mint 1 l', color: 'rose' }
    ],
    items: [
      { id: 'mexs10', text: '', figure: <MiniJug level={8} small />, categoryId: 'kev' },
      { id: 'mexs11', text: '', figure: <MiniJug level={5} small />, categoryId: 'kev' },
      { id: 'mexs12', text: '75 cl', categoryId: 'kev' },
      { id: 'mexs13', text: '', figure: <MiniJug level={10} small />, categoryId: 'egy' },
      { id: 'mexs14', text: '100 cl', categoryId: 'egy' },
      { id: 'mexs15', text: '10 dl', categoryId: 'egy' },
      { id: 'mexs16', text: '', figure: <MiniJug level={13} max={15} small />, categoryId: 'tobb' },
      { id: 'mexs17', text: '1 l 3 dl', categoryId: 'tobb' },
      { id: 'mexs18', text: '120 cl', categoryId: 'tobb' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi a kerülete?',
    description: 'Járd körbe a téglalapot! 1 egység = 1 kis négyzet oldala.',
    categories: [
      { id: 'k12', name: 'kerülete 12 egység', color: 'purple' },
      { id: 'k14', name: 'kerülete 14 egység', color: 'teal' },
      { id: 'k16', name: 'kerülete 16 egység', color: 'orange' }
    ],
    items: [
      { id: 'mexs19', text: '', figure: <SortGridRect w={3} h={3} />, categoryId: 'k12' },
      { id: 'mexs20', text: '', figure: <SortGridRect w={4} h={2} />, categoryId: 'k12' },
      { id: 'mexs21', text: '5 egység hosszú, 1 egység széles', categoryId: 'k12' },
      { id: 'mexs22', text: '', figure: <SortGridRect w={4} h={3} />, categoryId: 'k14' },
      { id: 'mexs23', text: '', figure: <SortGridRect w={5} h={2} />, categoryId: 'k14' },
      { id: 'mexs24', text: '6 egység hosszú, 1 egység széles', categoryId: 'k14' },
      { id: 'mexs25', text: '', figure: <SortGridRect w={4} h={4} />, categoryId: 'k16' },
      { id: 'mexs26', text: '', figure: <SortGridRect w={5} h={3} />, categoryId: 'k16' },
      { id: 'mexs27', text: '6 egység hosszú, 2 egység széles', categoryId: 'k16' }
    ]
  }
];

export const MEASUREMENTS_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MEASUREMENTS_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: MEASUREMENTS_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: MEASUREMENTS_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const MeasurementsExamG3Sorter: React.FC<MeasurementsExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-tudasproba-sorter',
  topicTitle = '10. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Válogasd szét a mérőeszközöket, a mennyiségeket és a téglalapokat!"
      levels={MEASUREMENTS_EXAM_G3_SORTER_LEVELS}
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

export default MeasurementsExamG3Sorter;
