import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { JugCard, BottlesGlassesCard } from './CapacityG3CardFigures';

interface CapacityG3MatcherProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onComplete?: () => void;
  topicId?: string;
  topicTitle?: string;
  [key: string]: any;
}

const CAPACITY_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Olvasd le és váltsd át!',
    description: 'A kancsón 1 vonal = 1 dl. 1 l = 10 dl, 1 dl = 10 cl.',
    pairs: [
      { id: 'capm1', left: 'Mennyi víz?', promptFigure: <JugCard dl={3} />, right: '3 dl' },
      { id: 'capm2', left: 'Mennyi víz?', promptFigure: <JugCard dl={6} />, right: '6 dl' },
      { id: 'capm3', left: 'Mennyi víz?', promptFigure: <JugCard dl={8} />, right: '8 dl' },
      { id: 'capm4', left: 'Mennyi víz?', promptFigure: <JugCard dl={4} />, right: '4 dl' },
      { id: 'capm5', left: '1 l', right: '10 dl' },
      { id: 'capm6', left: '1 dl', right: '10 cl' },
      { id: 'capm7', left: '2 l', right: '20 dl' },
      { id: 'capm8', left: '2 dl', right: '20 cl' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány dl?',
    description: 'A palackban 1 l van, egy pohárban 1 dl.',
    pairs: [
      { id: 'capm9', left: 'Hány dl?', promptFigure: <BottlesGlassesCard l={1} dl={3} />, right: '13 dl' },
      { id: 'capm10', left: 'Hány dl?', promptFigure: <BottlesGlassesCard l={1} dl={6} />, right: '16 dl' },
      { id: 'capm11', left: 'Hány dl?', promptFigure: <BottlesGlassesCard l={2} dl={1} />, right: '21 dl' },
      { id: 'capm12', left: 'Hány dl?', promptFigure: <BottlesGlassesCard l={1} />, right: '10 dl' },
      { id: 'capm13', left: '60 cl', right: '6 dl' },
      { id: 'capm14', left: '1 l 40 cl', right: '140 cl' },
      { id: 'capm15', left: '15 dl', right: '1 l 5 dl' },
      { id: 'capm16', left: '1 l 4 dl', right: '14 dl' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi kell még 1 literhez?',
    description: 'A kancsón 1 vonal = 1 dl. 1 l = 10 dl = 100 cl.',
    pairs: [
      { id: 'capm17', left: '', promptFigure: <JugCard dl={6} q />, right: '4 dl' },
      { id: 'capm18', left: '', promptFigure: <JugCard dl={9} q />, right: '1 dl' },
      { id: 'capm19', left: '', promptFigure: <JugCard dl={3} q />, right: '7 dl' },
      { id: 'capm20', left: '', promptFigure: <JugCard dl={5} q />, right: '5 dl' },
      { id: 'capm21', left: '70 cl + ? = 1 l', right: '30 cl' },
      { id: 'capm22', left: '45 cl + ? = 1 l', right: '55 cl' },
      { id: 'capm23', left: '8 dl + ? = 1 l', right: '2 dl' },
      { id: 'capm24', left: '25 cl + ? = 1 l', right: '75 cl' }
    ]
  }
];

export const CAPACITY_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: CAPACITY_G3_MATCHER_LEVELS_LIST[0],
  2: CAPACITY_G3_MATCHER_LEVELS_LIST[1],
  3: CAPACITY_G3_MATCHER_LEVELS_LIST[2]
};

export const CapacityG3Matcher: React.FC<CapacityG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-urtartalom-matcher',
  topicTitle = '3. Az űrtartalom mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="az-urtartalom-merese"
      title={topicTitle}
      subtitle="Párosítsd a mennyiségeket: l, dl és cl!"
      levels={CAPACITY_G3_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
      {...rest}
    />
  );
};

export default CapacityG3Matcher;
