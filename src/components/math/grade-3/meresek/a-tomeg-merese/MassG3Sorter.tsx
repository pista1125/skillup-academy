import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { WeightsSmallCard } from './MassG3CardFigures';

interface MassG3SorterProps {
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

const MASS_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Több vagy kevesebb, mint 1 kg?',
    description: 'Add össze a súlyokat! 1 kg = 100 dkg.',
    categories: [
      { id: 'kev', name: '1 kg-nál kevesebb', color: 'sky' },
      { id: 'egy', name: 'Pontosan 1 kg', color: 'emerald' },
      { id: 'tobb', name: '1 kg-nál több', color: 'rose' }
    ],
    items: [
      { id: 'masss1', text: '', figure: <WeightsSmallCard ws={[50, 20, 5]} />, categoryId: 'kev' },
      { id: 'masss2', text: '99 dkg', categoryId: 'kev' },
      { id: 'masss3', text: '60 dkg', categoryId: 'kev' },
      { id: 'masss4', text: '', figure: <WeightsSmallCard ws={[50, 50]} />, categoryId: 'egy' },
      { id: 'masss5', text: '', figure: <WeightsSmallCard ws={[50, 20, 20, 10]} />, categoryId: 'egy' },
      { id: 'masss6', text: '100 dkg', categoryId: 'egy' },
      { id: 'masss7', text: '', figure: <WeightsSmallCard ws={['1kg', 10]} />, categoryId: 'tobb' },
      { id: 'masss8', text: '101 dkg', categoryId: 'tobb' },
      { id: 'masss9', text: '1 kg 20 dkg', categoryId: 'tobb' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Ugyanannyi',
    description: 'Melyikkel egyenlő? Válts át dkg-ra!',
    categories: [
      { id: 'd102', name: '102 dkg', color: 'amber' },
      { id: 'd120', name: '120 dkg', color: 'purple' },
      { id: 'd200', name: '200 dkg', color: 'teal' }
    ],
    items: [
      { id: 'masss10', text: '1 kg 2 dkg', categoryId: 'd102' },
      { id: 'masss11', text: '100 dkg + 2 dkg', categoryId: 'd102' },
      { id: 'masss12', text: '52 dkg + 50 dkg', categoryId: 'd102' },
      { id: 'masss13', text: '1 kg 20 dkg', categoryId: 'd120' },
      { id: 'masss14', text: '', figure: <WeightsSmallCard ws={['1kg', 20]} />, categoryId: 'd120' },
      { id: 'masss15', text: '', figure: <WeightsSmallCard ws={[50, 50, 20]} />, categoryId: 'd120' },
      { id: 'masss16', text: '2 kg', categoryId: 'd200' },
      { id: 'masss17', text: '', figure: <WeightsSmallCard ws={['1kg', '1kg']} />, categoryId: 'd200' },
      { id: 'masss18', text: '', figure: <WeightsSmallCard ws={['1kg', 50, 50]} />, categoryId: 'd200' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik súly hiányzik?',
    description: 'Mennyi kell még? 1 kg = 100 dkg, 2 kg = 200 dkg.',
    categories: [
      { id: 'h10', name: 'Még 10 dkg kell', color: 'sky' },
      { id: 'h20', name: 'Még 20 dkg kell', color: 'emerald' },
      { id: 'h50', name: 'Még 50 dkg kell', color: 'rose' }
    ],
    items: [
      { id: 'masss19', text: '', figure: <WeightsSmallCard ws={[50, 20, 20, '?']} eq="= 1 kg" />, categoryId: 'h10' },
      { id: 'masss20', text: '90 dkg → 1 kg', categoryId: 'h10' },
      { id: 'masss21', text: '1 kg 90 dkg → 2 kg', categoryId: 'h10' },
      { id: 'masss22', text: '', figure: <WeightsSmallCard ws={[50, 20, 10, '?']} eq="= 1 kg" />, categoryId: 'h20' },
      { id: 'masss23', text: '80 dkg → 1 kg', categoryId: 'h20' },
      { id: 'masss24', text: '1 kg 80 dkg → 2 kg', categoryId: 'h20' },
      { id: 'masss25', text: '', figure: <WeightsSmallCard ws={[20, 20, 10, '?']} eq="= 1 kg" />, categoryId: 'h50' },
      { id: 'masss26', text: '', figure: <WeightsSmallCard ws={[50, '?']} eq="= 1 kg" />, categoryId: 'h50' },
      { id: 'masss27', text: '1 kg 50 dkg → 2 kg', categoryId: 'h50' }
    ]
  }
];

export const MASS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: MASS_G3_SORTER_LEVELS_LIST[0],
  2: MASS_G3_SORTER_LEVELS_LIST[1],
  3: MASS_G3_SORTER_LEVELS_LIST[2]
};

export const MassG3Sorter: React.FC<MassG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-tomeg-sorter',
  topicTitle = '2. A tömeg mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-tomeg-merese"
      title={topicTitle}
      subtitle="Válogasd szét a tömegeket: kg és dkg!"
      levels={MASS_G3_SORTER_LEVELS}
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

export default MassG3Sorter;
