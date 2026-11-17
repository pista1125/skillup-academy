import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SolidCard } from '../a-testek/SolidsG3CardFigures';
import { SolidKind } from '../a-testek/SolidsG3Parts';
import { ShapeCard, LineCard, LineKind } from './PolygonsG3CardFigures';

interface PolygonsG3SorterProps {
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

let uid = 0;
const id = () => `pols${++uid}`;
const sh = (shape: string, cat: string): SorterItem => ({ id: id(), text: '', figure: <ShapeCard id={shape} small />, categoryId: cat });
const so = (k: SolidKind, cat: string): SorterItem => ({ id: id(), text: '', figure: <SolidCard kind={k} small />, categoryId: cat });
const ln = (k: LineKind, cat: string): SorterItem => ({ id: id(), text: '', figure: <LineCard kind={k} />, categoryId: cat });
const tx = (text: string, cat: string): SorterItem => ({ id: id(), text, categoryId: cat });

const POLYGONS_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Test, síkidom vagy vonal?',
    description: 'A test kézbe vehető, a síkidom lapos, a vonal csak egy vonal.',
    categories: [
      { id: 'test', name: 'testek', color: 'sky' },
      { id: 'sik', name: 'síkidomok', color: 'emerald' },
      { id: 'von', name: 'vonalak', color: 'amber' }
    ],
    items: [
      so('kocka', 'test'),
      so('gomb', 'test'),
      so('henger', 'test'),
      so('kup', 'test'),
      so('piramis4', 'test'),
      tx('labda', 'test'),
      tx('dobókocka', 'test'),
      tx('konzervdoboz', 'test'),
      tx('cipősdoboz', 'test'),
      sh('tri1', 'sik'),
      sh('square', 'sik'),
      sh('circle', 'sik'),
      sh('hex', 'sik'),
      sh('half', 'sik'),
      tx('papírból kivágott kör', 'sik'),
      tx('négyzet', 'sik'),
      tx('háromszög', 'sik'),
      tx('téglalap', 'sik'),
      ln('straight', 'von'),
      ln('curve', 'von'),
      ln('wave', 'von'),
      ln('zigzag', 'von'),
      ln('spiral', 'von'),
      tx('egyenes vonal', 'von'),
      tx('görbe vonal', 'von'),
      tx('hullámvonal', 'von'),
      tx('cikcakk vonal', 'von')
    ]
  },
  {
    level: 2,
    title: '2. szint: Háromszög, négyszög vagy nem sokszög?',
    description: 'Görbe vonal is határolja? Ha nem, számold meg a csúcsokat!',
    categories: [
      { id: 'har', name: 'háromszögek', color: 'amber' },
      { id: 'negy', name: 'négyszögek', color: 'sky' },
      { id: 'nem', name: 'nem sokszögek', color: 'rose' }
    ],
    items: [
      sh('tri1', 'har'),
      sh('tri2', 'har'),
      sh('tri3', 'har'),
      sh('tri4', 'har'),
      sh('tri5', 'har'),
      tx('3 oldalú sokszög', 'har'),
      tx('3 csúcsú sokszög', 'har'),
      tx('sokszög 3 pálcikából', 'har'),
      tx('háromszög alakú zászló', 'har'),
      sh('square', 'negy'),
      sh('rect', 'negy'),
      sh('para', 'negy'),
      sh('trap', 'negy'),
      sh('dart', 'negy'),
      sh('rhomb', 'negy'),
      tx('4 oldalú sokszög', 'negy'),
      tx('4 csúcsú sokszög', 'negy'),
      tx('téglalap', 'negy'),
      sh('circle', 'nem'),
      sh('ellipse', 'nem'),
      sh('half', 'nem'),
      sh('moon', 'nem'),
      sh('wavy', 'nem'),
      sh('doorway', 'nem'),
      tx('kör', 'nem'),
      tx('görbe vonal is határolja', 'nem'),
      tx('hullámos szélű forma', 'nem')
    ]
  },
  {
    level: 3,
    title: '3. szint: Ötszög, hatszög vagy téglalap?',
    description: 'Vigyázz: a négyzet is téglalap!',
    categories: [
      { id: 'ot', name: 'ötszögek', color: 'emerald' },
      { id: 'hat', name: 'hatszögek', color: 'purple' },
      { id: 'teg', name: 'téglalapok (a négyzet is)', color: 'sky' }
    ],
    items: [
      sh('pent', 'ot'),
      sh('house', 'ot'),
      sh('arrow5', 'ot'),
      sh('pentOdd', 'ot'),
      tx('5 csúcsú sokszög', 'ot'),
      tx('5 oldalú sokszög', 'ot'),
      tx('sokszög 5 pálcikából', 'ot'),
      tx('1-gyel több csúcsa van, mint a négyszögnek', 'ot'),
      tx('ötszög', 'ot'),
      sh('hex', 'hat'),
      sh('hexL', 'hat'),
      sh('hexLong', 'hat'),
      sh('hexBox', 'hat'),
      sh('hexIrr', 'hat'),
      tx('6 csúcsú sokszög', 'hat'),
      tx('6 oldalú sokszög', 'hat'),
      tx('sokszög 6 pálcikából', 'hat'),
      tx('hatszög', 'hat'),
      sh('square', 'teg'),
      sh('rect', 'teg'),
      sh('rectTall', 'teg'),
      sh('rectFlat', 'teg'),
      sh('squareSmall', 'teg'),
      tx('négyzet', 'teg'),
      tx('négyszög, minden sarka mint a füzetlap sarka', 'teg'),
      tx('füzetlap', 'teg'),
      tx('ajtó szemből', 'teg')
    ]
  }
];

export const POLYGONS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: POLYGONS_G3_SORTER_LEVELS_LIST[0],
  2: POLYGONS_G3_SORTER_LEVELS_LIST[1],
  3: POLYGONS_G3_SORTER_LEVELS_LIST[2]
};

export const PolygonsG3Sorter: React.FC<PolygonsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-geom-sokszogek-sorter',
  topicTitle = '3. Síkidomok, sokszögek – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="sikidomok-sokszogek"
      title={topicTitle}
      subtitle="Válogasd szét a formákat!"
      levels={POLYGONS_G3_SORTER_LEVELS}
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

export default PolygonsG3Sorter;
