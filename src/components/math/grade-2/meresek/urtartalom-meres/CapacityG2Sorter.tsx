import React from 'react';
import { SorterTemplate, SorterLevelConfig } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { JugsCard, LitreCupsCard } from './CapacityG2CardFigures';

interface CapacityG2SorterProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const CAPACITY_G2_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kevesebb vagy több, mint 1 l?',
    description: 'Egy teli mérőedény 1 l = 10 dl. Tedd a jó dobozba!',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 1 l', color: 'sky' },
      { id: 'eq', name: 'Pontosan 1 l', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 1 l', color: 'purple' }
    ],
    items: [
      { id: 'caps1', text: '', categoryId: 'lt', figure: <JugsCard full={0} part={6} small /> },
      { id: 'caps2', text: '9 dl', categoryId: 'lt' },
      { id: 'caps3', text: 'fél liter', categoryId: 'lt' },
      { id: 'caps4', text: '', categoryId: 'eq', figure: <JugsCard full={1} part={0} small /> },
      { id: 'caps5', text: '10 dl', categoryId: 'eq' },
      { id: 'caps6', text: '5 dl + 5 dl', categoryId: 'eq' },
      { id: 'caps7', text: '', categoryId: 'gt', figure: <JugsCard full={1} part={4} small /> },
      { id: 'caps8', text: '', categoryId: 'gt', figure: <JugsCard full={1} part={8} small /> },
      { id: 'caps9', text: '2 l', categoryId: 'gt' }
    ]
  },
  {
    level: 2,
    title: '2. szint: 5 dl, 10 dl vagy 15 dl?',
    description: 'Számold meg a deciliteres vonásokat és poharakat!',
    categories: [
      { id: 'd5', name: '5 dl', color: 'blue' },
      { id: 'd10', name: '10 dl', color: 'amber' },
      { id: 'd15', name: '15 dl', color: 'rose' }
    ],
    items: [
      { id: 'caps10', text: '', categoryId: 'd5', figure: <JugsCard full={0} part={5} small /> },
      { id: 'caps11', text: '', categoryId: 'd5', figure: <LitreCupsCard l={0} dl={5} small /> },
      { id: 'caps12', text: 'fél liter', categoryId: 'd5' },
      { id: 'caps13', text: '', categoryId: 'd10', figure: <JugsCard full={1} part={0} small /> },
      { id: 'caps14', text: '1 l', categoryId: 'd10' },
      { id: 'caps15', text: '6 dl + 4 dl', categoryId: 'd10' },
      { id: 'caps16', text: '', categoryId: 'd15', figure: <JugsCard full={1} part={5} small /> },
      { id: 'caps17', text: '', categoryId: 'd15', figure: <LitreCupsCard l={1} dl={5} small /> },
      { id: 'caps18', text: '1 l 5 dl', categoryId: 'd15' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Kevesebb vagy több, mint 2 l?',
    description: '2 l = 20 dl. Írd át deciliterre, és hasonlítsd össze!',
    categories: [
      { id: 'lt', name: 'Kevesebb, mint 2 l', color: 'sky' },
      { id: 'eq', name: 'Pontosan 2 l', color: 'emerald' },
      { id: 'gt', name: 'Több, mint 2 l', color: 'purple' }
    ],
    items: [
      { id: 'caps19', text: '19 dl', categoryId: 'lt' },
      { id: 'caps20', text: '', categoryId: 'lt', figure: <LitreCupsCard l={1} dl={8} small /> },
      { id: 'caps21', text: '', categoryId: 'lt', figure: <JugsCard full={1} part={6} small /> },
      { id: 'caps22', text: '20 dl', categoryId: 'eq' },
      { id: 'caps23', text: '', categoryId: 'eq', figure: <LitreCupsCard l={2} dl={0} small /> },
      { id: 'caps24', text: '9 dl + 4 dl + 7 dl', categoryId: 'eq' },
      { id: 'caps25', text: '3 l', categoryId: 'gt' },
      { id: 'caps26', text: '', categoryId: 'gt', figure: <LitreCupsCard l={2} dl={2} small /> },
      { id: 'caps27', text: '1 l 8 dl + 3 dl', categoryId: 'gt' }
    ]
  }
];

export const CAPACITY_G2_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: CAPACITY_G2_SORTER_LEVELS_LIST[0],
  2: CAPACITY_G2_SORTER_LEVELS_LIST[1],
  3: CAPACITY_G2_SORTER_LEVELS_LIST[2]
};

export const CapacityG2Sorter: React.FC<CapacityG2SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g2-meres-urtartalom-sorter',
  topicTitle = '3. Az űrtartalom mérése – Csoportosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <SorterTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="urtartalom-meres"
      title={topicTitle}
      subtitle="Válogasd szét a mennyiségeket: kevesebb, ugyanannyi vagy több?"
      levels={CAPACITY_G2_SORTER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToMatcher={onSwitchToMatcher}
      onComplete={onComplete}
    />
  );
};

export default CapacityG2Sorter;
