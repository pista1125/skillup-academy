import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CardShape, CardPolys, dominoPolys } from './AreaG3CardFigures';
import { S, HEX, RHOMB, TRAP3, ROW5, BIGTRI, PARA8, BIGTRI9, cellPts } from './AreaG3Parts';

interface AreaG3MatcherProps {
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

const bigSquares = (n: number) =>
  Array.from({ length: n }).map((_, i) => [
    [i * 2, 0],
    [i * 2 + 2, 0],
    [i * 2 + 2, 2],
    [i * 2, 2]
  ]) as [number, number][][];

export const AREA_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    level: 1,
    title: '1. szint: Hány kis négyzet?',
    description: 'Számold meg, hány kis négyzet fedi le a síkidomot!',
    pairs: [
      { id: 'arm1', prompt: 'Hány kis négyzet?', promptFigure: <CardShape cells={S('###|.#.')} pal="blue" />, value: '4' },
      { id: 'arm2', prompt: 'Hány kis négyzet?', promptFigure: <CardShape cells={S('.#.|###|.#.')} pal="red" />, value: '5' },
      { id: 'arm3', prompt: 'Hány kis négyzet?', promptFigure: <CardShape cells={S('#..#|####')} pal="orange" />, value: '6' },
      { id: 'arm4', prompt: 'Hány kis négyzet?', promptFigure: <CardShape cells={S('#...|#...|####')} pal="purple" />, value: '7' },
      { id: 'arm5', prompt: 'Hány kis négyzet?', promptFigure: <CardShape cells={S('#..#|#..#|####')} pal="green" />, value: '8' },
      { id: 'arm6', prompt: 'Hány kis négyzet?', promptFigure: <CardShape cells={S('.##.|####|.###')} pal="teal" />, value: '9' },
      { id: 'arm7', prompt: 'Egy sorban 3 kis négyzet', value: '3' },
      { id: 'arm8', prompt: '2 sor, mindegyikben 5 kis négyzet', value: '10' }
    ]
  },
  2: {
    level: 2,
    title: '2. szint: Kis háromszögekkel',
    description: 'Most a kis háromszög az egység. Hány kis háromszög fedi le?',
    pairs: [
      { id: 'arm9', prompt: 'Hány kis háromszög?', promptFigure: <CardPolys polys={RHOMB} pal="yellow" maxS={40} />, value: '2' },
      { id: 'arm10', prompt: 'Hány kis háromszög?', promptFigure: <CardPolys polys={TRAP3} pal="orange" maxS={40} />, value: '3' },
      { id: 'arm11', prompt: 'Hány kis háromszög?', promptFigure: <CardPolys polys={BIGTRI} pal="red" maxS={40} />, value: '4' },
      { id: 'arm12', prompt: 'Hány kis háromszög?', promptFigure: <CardPolys polys={ROW5} pal="purple" maxS={40} />, value: '5' },
      { id: 'arm13', prompt: 'Hány kis háromszög?', promptFigure: <CardPolys polys={HEX} pal="green" maxS={40} />, value: '6' },
      { id: 'arm14', prompt: 'Hány kis háromszög?', promptFigure: <CardPolys polys={PARA8} pal="blue" maxS={40} />, value: '8' },
      { id: 'arm15', prompt: 'Hány kis háromszög?', promptFigure: <CardPolys polys={BIGTRI9} pal="pink" maxS={40} />, value: '9' },
      { id: 'arm16', prompt: '5 rombusz (1 rombusz = 2 kis háromszög)', value: '10' }
    ]
  },
  3: {
    level: 3,
    title: '3. szint: Váltsd át!',
    description: '1 dominó = 2 kis négyzet. 1 nagy négyzet = 4 kis négyzet. Párosítsd!',
    pairs: [
      {
        id: 'arm17',
        prompt: 'Hány kis négyzet?',
        promptFigure: (
          <CardPolys
            polys={dominoPolys([
              [0, 0, 'h'],
              [2, 0, 'v'],
              [0, 1, 'h']
            ])}
            pal="orange"
          />
        ),
        value: '6 kis négyzet'
      },
      {
        id: 'arm18',
        prompt: 'Hány kis négyzet?',
        promptFigure: (
          <CardPolys
            polys={dominoPolys([
              [0, 0, 'v'],
              [1, 0, 'h'],
              [1, 1, 'h'],
              [3, 0, 'v']
            ])}
            pal="yellow"
          />
        ),
        value: '8 kis négyzet'
      },
      { id: 'arm19', prompt: 'Hány kis négyzet?', promptFigure: <CardPolys polys={bigSquares(3)} pal="purple" />, value: '12 kis négyzet' },
      { id: 'arm20', prompt: 'Hány dominó?', promptFigure: <CardShape cells={S('#####|#####')} pal="blue" />, value: '5 dominó' },
      { id: 'arm21', prompt: 'Hány dominó?', promptFigure: <CardShape cells={S('##..|.##.|..##')} pal="green" />, value: '3 dominó' },
      { id: 'arm22', prompt: '7 dominó', value: '14 kis négyzet' },
      { id: 'arm23', prompt: '1 dominó', promptFigure: <CardPolys polys={[cellPts(0, 0), cellPts(1, 0)]} pal="red" maxS={30} />, value: '2 kis négyzet' },
      { id: 'arm24', prompt: '8 fél négyzet', value: '4 kis négyzet' }
    ]
  }
};

export const AreaG3Matcher: React.FC<AreaG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-meas-terulet-matcher',
  topicTitle = '7. A terület mérése – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="meresek"
      topicId={topicId}
      subtopicId="a-terulet-merese"
      title={topicTitle}
      subtitle="Párosítsd a síkidomokat a területükkel!"
      levels={AREA_G3_MATCHER_LEVELS}
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

export default AreaG3Matcher;
