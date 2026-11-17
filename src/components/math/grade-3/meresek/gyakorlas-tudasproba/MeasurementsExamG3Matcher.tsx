import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { MiniClock, MiniTwoClocks, MiniJug, MiniDial, MiniRuler, MiniGrid, MiniRect } from './MeasurementsExamG3CardFigures';
import { rectCells, Cell } from './MeasurementsExamG3Parts';

interface MeasurementsExamG3MatcherProps {
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

const L5: Cell[] = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]];

const MEASUREMENTS_EXAM_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Olvasd le! Mennyi?',
    description: 'Olvasd le a mérőeszközt! Párosítsd az egyenlő mennyiségeket!',
    pairs: [
      { id: 'mexm1_0', left: '', promptFigure: <MiniJug level={3} />, right: '3 dl' },
      { id: 'mexm1_1', left: '', promptFigure: <MiniDial v={40} />, right: '40 dkg' },
      { id: 'mexm1_2', left: '', promptFigure: <MiniRuler toMm={60} />, right: '6 cm' },
      { id: 'mexm1_3', left: '', promptFigure: <MiniClock h={2} m={30} />, right: 'fél 3' },
      { id: 'mexm1_4', left: '1 kg', right: '100 dkg' },
      { id: 'mexm1_5', left: '1 l', right: '10 dl' },
      { id: 'mexm1_6', left: '1 m', right: '100 cm' },
      { id: 'mexm1_7', left: '1 óra', right: '60 perc' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Váltsd át! Számold meg!',
    description: 'Váltsd át a kisebb egységre! Számold a rácson!',
    pairs: [
      { id: 'mexm2_0', left: 'kerülete?', promptFigure: <MiniGrid cells={rectCells(4, 3)} cols={4} rows={3} />, right: '14 egység' },
      { id: 'mexm2_1', left: 'területe?', promptFigure: <MiniGrid cells={L5} cols={3} rows={3} />, right: '5 kis négyzet' },
      { id: 'mexm2_2', left: '', promptFigure: <MiniDial v={70} />, right: '70 dkg' },
      { id: 'mexm2_3', left: 'Mennyi hiányzik 1 l-hez?', promptFigure: <MiniJug level={7} />, right: '3 dl' },
      { id: 'mexm2_4', left: '2 kg 30 dkg', right: '230 dkg' },
      { id: 'mexm2_5', left: '1 l 4 dl', right: '14 dl' },
      { id: 'mexm2_6', left: '3 m 5 cm', right: '305 cm' },
      { id: 'mexm2_7', left: '7 cm 2 mm', right: '72 mm' }
    ]
  },
  {
    level: 3,
    title: '3. szint: Számold ki!',
    description: 'Kerület, terület, eltelt idő és műveletek mértékegységekkel.',
    pairs: [
      { id: 'mexm3_0', left: 'kerülete?', promptFigure: <MiniRect w={84} h={36} top="7 cm" side="3 cm" />, right: '20 cm' },
      { id: 'mexm3_1', left: 'kerülete?', promptFigure: <MiniRect w={44} h={44} top="6 cm" square />, right: '24 cm' },
      { id: 'mexm3_2', left: 'területe?', promptFigure: <MiniGrid cells={rectCells(5, 3)} cols={5} rows={3} />, right: '15 kis négyzet' },
      { id: 'mexm3_3', left: 'Mennyi idő telt el?', promptFigure: <MiniTwoClocks h1={9} m1={40} h2={10} m2={15} />, right: '35 perc' },
      { id: 'mexm3_4', left: '3 · 25 dkg', right: '75 dkg' },
      { id: 'mexm3_5', left: '1 l − 35 cl', right: '65 cl' },
      { id: 'mexm3_6', left: '2 m − 80 cm', right: '1 m 20 cm' },
      { id: 'mexm3_7', left: '4 · 15 perc', right: '1 óra' }
    ]
  }
];

export const MEASUREMENTS_EXAM_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: MEASUREMENTS_EXAM_G3_MATCHER_LEVELS_LIST[0],
  2: MEASUREMENTS_EXAM_G3_MATCHER_LEVELS_LIST[1],
  3: MEASUREMENTS_EXAM_G3_MATCHER_LEVELS_LIST[2]
};

export const MeasurementsExamG3Matcher: React.FC<MeasurementsExamG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-tudasproba-matcher',
  topicTitle = '10. Gyakorlás, tudáspróba – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Párosítsd a mennyiségeket, a képeket és az eredményeket!"
      levels={MEASUREMENTS_EXAM_G3_MATCHER_LEVELS}
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

export default MeasurementsExamG3Matcher;
