import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ShapeCard, StickGridCard, TwoTrianglesCard, SplitTriangleCard, TwoShapesCard } from './PolygonsG3CardFigures';

interface PolygonsG3MatcherProps {
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

const L1: [string, string][] = [
  ['tri4', 'háromszög'],
  ['square', 'négyzet'],
  ['rect', 'téglalap, de nem négyzet'],
  ['trap', 'négyszög, de nem téglalap'],
  ['pent', 'ötszög'],
  ['hex', 'hatszög'],
  ['circle', 'kör'],
  ['half', 'nem sokszög: görbe vonal is határolja']
];

const L2: [string, string][] = [
  ['6 csúcsa van.', 'hexL'],
  ['5 oldala van.', 'arrow5'],
  ['4 csúcsa van, az egyik befelé mutat.', 'dart'],
  ['3 oldala van.', 'tri3'],
  ['Téglalap, de nem négyzet.', 'rectTall'],
  ['4 egyenlő oldala van, de a sarkai ferdék.', 'rhomb'],
  ['Nincs csúcsa, görbe vonal határolja.', 'ellipse'],
  ['2 egyenes és 1 görbe vonal határolja.', 'slice']
];

const POLYGONS_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Mi a neve?',
    description: 'Párosítsd a síkidomot a nevével!',
    pairs: L1.map(([id, name], i) => ({ id: `polm${i + 1}`, left: '', promptFigure: <ShapeCard id={id} />, right: name }))
  },
  {
    level: 2,
    title: '2. szint: Melyik ez?',
    description: 'Olvasd el, és keresd meg a síkidomot!',
    pairs: L2.map(([t, id], i) => ({ id: `polm${i + 9}`, left: t, right: '', valueFigure: <ShapeCard id={id} /> }))
  },
  {
    level: 3,
    title: '3. szint: Számolj!',
    description: 'Pálcikák, oldalak, csúcsok – hány?',
    pairs: [
      { id: 'polm17', left: 'Hány háromszög?', promptFigure: <SplitTriangleCard />, right: '3' },
      { id: 'polm18', left: '12 pálcikából hány külön háromszög lesz?', right: '4' },
      { id: 'polm19', left: 'Hány négyzet?', promptFigure: <StickGridCard r={2} c={2} />, right: '5' },
      { id: 'polm20', left: 'Hány pálcika ez?', promptFigure: <TwoTrianglesCard />, right: '6' },
      { id: 'polm21', left: 'Hány csúcsuk van összesen?', promptFigure: <TwoShapesCard a="tri5" b="square" />, right: '7' },
      { id: 'polm22', left: 'Hány pálcika kell 2 külön négyszöghöz?', right: '8' },
      { id: 'polm23', left: 'Hány oldaluk van összesen?', promptFigure: <TwoShapesCard a="pent" b="trap" />, right: '9' },
      { id: 'polm24', left: 'Hány oldala van összesen 2 hatszögnek?', right: '12' }
    ]
  }
];

export const POLYGONS_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: POLYGONS_G3_MATCHER_LEVELS_LIST[0],
  2: POLYGONS_G3_MATCHER_LEVELS_LIST[1],
  3: POLYGONS_G3_MATCHER_LEVELS_LIST[2]
};

export const PolygonsG3Matcher: React.FC<PolygonsG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-geom-sokszogek-matcher',
  topicTitle = '3. Síkidomok, sokszögek – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="sikidomok-sokszogek"
      title={topicTitle}
      subtitle="Párosítsd a síkidomokat a nevükkel és a leírásukkal!"
      levels={POLYGONS_G3_MATCHER_LEVELS}
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

export default PolygonsG3Matcher;
