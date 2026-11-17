import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { IconCard, JugCard, TwoBottlesCard } from './CapacityG3CardFigures';

interface CapacityG3SorterProps {
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

const CAPACITY_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mennyi fér bele?',
    description: 'Becsülj! Néhány cl, néhány dl vagy néhány liter?',
    categories: [
      { id: 'cl', name: 'Néhány cl fér bele', color: 'amber' },
      { id: 'dl', name: 'Néhány dl fér bele', color: 'sky' },
      { id: 'l', name: 'Néhány liter fér bele', color: 'emerald' }
    ],
    items: [
      { id: 'caps1', text: '', figure: <IconCard kind="cup" small />, categoryId: 'cl' },
      { id: 'caps2', text: '', figure: <IconCard kind="dropper" small />, categoryId: 'cl' },
      { id: 'caps3', text: 'egy evőkanál', categoryId: 'cl' },
      { id: 'caps4', text: '', figure: <IconCard kind="glass" small />, categoryId: 'dl' },
      { id: 'caps5', text: '', figure: <IconCard kind="mug" small />, categoryId: 'dl' },
      { id: 'caps6', text: 'egy tányér leves', categoryId: 'dl' },
      { id: 'caps7', text: '', figure: <IconCard kind="bucket" small />, categoryId: 'l' },
      { id: 'caps8', text: '', figure: <IconCard kind="can" small />, categoryId: 'l' },
      { id: 'caps9', text: 'egy nagy fazék', categoryId: 'l' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Több vagy kevesebb, mint 1 l?',
    description: '1 l = 10 dl = 100 cl. A kancsón 1 vonal = 1 dl.',
    categories: [
      { id: 'kev', name: '1 l-nél kevesebb', color: 'sky' },
      { id: 'egy', name: 'Pontosan 1 l', color: 'emerald' },
      { id: 'tobb', name: '1 l-nél több', color: 'rose' }
    ],
    items: [
      { id: 'caps10', text: '', figure: <JugCard dl={7} small />, categoryId: 'kev' },
      { id: 'caps11', text: '90 cl', categoryId: 'kev' },
      { id: 'caps12', text: '8 dl', categoryId: 'kev' },
      { id: 'caps13', text: '', figure: <JugCard dl={10} small />, categoryId: 'egy' },
      { id: 'caps14', text: '', figure: <TwoBottlesCard a="5 dl" b="5 dl" />, categoryId: 'egy' },
      { id: 'caps15', text: '100 cl', categoryId: 'egy' },
      { id: 'caps16', text: '', figure: <TwoBottlesCard a="1 l" b="1 l" />, categoryId: 'tobb' },
      { id: 'caps17', text: '1 l 5 dl', categoryId: 'tobb' },
      { id: 'caps18', text: '120 cl', categoryId: 'tobb' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Ugyanannyi',
    description: 'Mennyi ez együtt? Válts át!',
    categories: [
      { id: 'd5', name: '5 dl', color: 'amber' },
      { id: 'l1', name: '1 l', color: 'purple' },
      { id: 'l2', name: '2 l', color: 'teal' }
    ],
    items: [
      { id: 'caps19', text: '50 cl', categoryId: 'd5' },
      { id: 'caps20', text: '', figure: <TwoBottlesCard a="2 dl" b="3 dl" />, categoryId: 'd5' },
      { id: 'caps21', text: '30 cl + 20 cl', categoryId: 'd5' },
      { id: 'caps22', text: '100 cl', categoryId: 'l1' },
      { id: 'caps23', text: '', figure: <TwoBottlesCard a="60 cl" b="40 cl" />, categoryId: 'l1' },
      { id: 'caps24', text: '10 dl', categoryId: 'l1' },
      { id: 'caps25', text: '200 cl', categoryId: 'l2' },
      { id: 'caps26', text: '', figure: <TwoBottlesCard a="1 l" b="10 dl" />, categoryId: 'l2' },
      { id: 'caps27', text: '', figure: <TwoBottlesCard a="150 cl" b="50 cl" />, categoryId: 'l2' }
    ]
  }
];

export const CAPACITY_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: CAPACITY_G3_SORTER_LEVELS_LIST[0],
  2: CAPACITY_G3_SORTER_LEVELS_LIST[1],
  3: CAPACITY_G3_SORTER_LEVELS_LIST[2]
};

export const CapacityG3Sorter: React.FC<CapacityG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-meas-urtartalom-sorter',
  topicTitle = '3. Az űrtartalom mérése – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="az-urtartalom-merese"
      title={topicTitle}
      subtitle="Válogasd szét az edényeket és a mennyiségeket: l, dl, cl!"
      levels={CAPACITY_G3_SORTER_LEVELS}
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

export default CapacityG3Sorter;
