import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { JugsCard, LitreCupsCard, CupsCard } from './CapacityG2CardFigures';

interface CapacityG2MatcherProps {
  level?: DifficultyLevel | { level?: DifficultyLevel };
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
}

const CAPACITY_G2_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány dl van benne?',
    description: 'A mérőedény teteje 1 l. Minden vonás 1 dl. Párosítsd!',
    pairs: [
      { id: 'capm1', left: '', right: '2 dl', promptFigure: <JugsCard full={0} part={2} /> },
      { id: 'capm2', left: '', right: '3 dl', promptFigure: <JugsCard full={0} part={3} /> },
      { id: 'capm3', left: '', right: '4 dl', promptFigure: <JugsCard full={0} part={4} /> },
      { id: 'capm4', left: '', right: '6 dl', promptFigure: <JugsCard full={0} part={6} /> },
      { id: 'capm5', left: '', right: '8 dl', promptFigure: <JugsCard full={0} part={8} /> },
      { id: 'capm6', left: 'fél liter', right: '5 dl' },
      { id: 'capm7', left: '1 l', right: '10 dl' },
      { id: 'capm8', left: '2 l', right: '20 dl' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Liter és deciliter',
    description: '1 l = 10 dl. Írd át deciliterre, és párosítsd!',
    pairs: [
      { id: 'capm9', left: '', right: '12 dl', promptFigure: <JugsCard full={1} part={2} /> },
      { id: 'capm10', left: '', right: '15 dl', promptFigure: <JugsCard full={1} part={5} /> },
      { id: 'capm11', left: '', right: '13 dl', promptFigure: <LitreCupsCard l={1} dl={3} /> },
      { id: 'capm12', left: '', right: '17 dl', promptFigure: <LitreCupsCard l={1} dl={7} /> },
      { id: 'capm13', left: '1 l 4 dl', right: '14 dl' },
      { id: 'capm14', left: '1 l 1 dl', right: '11 dl' },
      { id: 'capm15', left: '1 l 6 dl', right: '16 dl' },
      { id: 'capm16', left: '1 l 8 dl', right: '18 dl' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számolj l-rel és dl-rel!',
    description: 'Hány dl van az összes bögrében? Végezd el a műveleteket!',
    pairs: [
      { id: 'capm17', left: '', right: '8 dl', promptFigure: <CupsCard n={4} each={2} /> },
      { id: 'capm18', left: '', right: '9 dl', promptFigure: <CupsCard n={3} each={3} /> },
      { id: 'capm19', left: '', right: '5 dl', promptFigure: <CupsCard n={5} each={1} /> },
      { id: 'capm20', left: '', right: '6 dl', promptFigure: <CupsCard n={2} each={3} /> },
      { id: 'capm21', left: '7 dl + 3 dl', right: '1 l' },
      { id: 'capm22', left: '7 dl + 6 dl + 7 dl', right: '2 l' },
      { id: 'capm23', left: '100 l − 35 l', right: '65 l' },
      { id: 'capm24', left: '2 l − 4 dl', right: '16 dl' }
    ]
  }
];

export const CAPACITY_G2_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: CAPACITY_G2_MATCHER_LEVELS_LIST[0],
  2: CAPACITY_G2_MATCHER_LEVELS_LIST[1],
  3: CAPACITY_G2_MATCHER_LEVELS_LIST[2]
};

export const CapacityG2Matcher: React.FC<CapacityG2MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g2-meres-urtartalom-matcher',
  topicTitle = '3. Az űrtartalom mérése – Párosító Játék'
}) => {
  const activeLevel: DifficultyLevel =
    currentLevel ?? (typeof level === 'number' ? level : (level?.level ?? 1));
  return (
    <MatcherTemplate
      grade={2}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="urtartalom-meres"
      title={topicTitle}
      subtitle="Párosítsd a mérőedényeket, a poharakat és a mennyiségeket!"
      levels={CAPACITY_G2_MATCHER_LEVELS}
      level={activeLevel}
      currentLevel={activeLevel}
      onNextLevel={onNextLevel}
      onOpenRules={onOpenRules}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToQuiz={onSwitchToQuiz}
      onSwitchToSorter={onSwitchToSorter}
      onComplete={onComplete}
    />
  );
};

export default CapacityG2Matcher;
