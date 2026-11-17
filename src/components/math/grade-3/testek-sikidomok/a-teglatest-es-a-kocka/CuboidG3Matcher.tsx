import React from 'react';
import { MatcherTemplate, MatcherLevelConfig } from '../MatcherTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { CUBE_NETS_OK, CUBE_NETS_BAD } from './CuboidG3Parts';
import { BoxCard, NetCard, CubesCard, DieCard } from './CuboidG3CardFigures';

interface CuboidG3MatcherProps {
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

const L2: [number, number, number][] = [
  [3, 1, 1],
  [2, 2, 1],
  [3, 2, 1],
  [2, 2, 2],
  [3, 3, 1],
  [3, 2, 2],
  [4, 2, 2],
  [3, 3, 2]
];
const L3: [number, number, number][] = [
  [2, 1, 1],
  [2, 2, 1],
  [2, 2, 2],
  [3, 1, 1],
  [3, 3, 1],
  [3, 3, 2],
  [3, 2, 1],
  [3, 2, 2]
];
const missing = ([l, d, h]: [number, number, number]) => {
  const m = Math.max(l, d, h);
  const r = m * m * m - l * d * h;
  return r === 0 ? 'már kocka' : `még ${r} kocka`;
};

const CUBOID_G3_MATCHER_LEVELS_LIST: MatcherLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Téglatest és kocka',
    description: 'Mi illik a képhez vagy a kérdéshez?',
    pairs: [
      { id: 'cubm1', left: '', promptFigure: <BoxCard l={1} h={1} d={1} color="#3b82f6" />, right: '6 egyforma négyzet lap' },
      { id: 'cubm2', left: '', promptFigure: <BoxCard l={2.2} h={1} d={1.2} />, right: '6 téglalap lap, nem mind egyforma' },
      { id: 'cubm3', left: '', promptFigure: <NetCard cells={CUBE_NETS_OK[0]} />, right: 'kockává hajtható' },
      { id: 'cubm4', left: '', promptFigure: <NetCard cells={CUBE_NETS_BAD[0]} fill="#fecaca" />, right: 'nem lesz belőle kocka' },
      { id: 'cubm5', left: '', promptFigure: <DieCard n={3} />, right: 'szemben 4 pötty' },
      { id: 'cubm6', left: 'Hány lapja van a téglatestnek?', right: '6' },
      { id: 'cubm7', left: 'Hányféle lapja van a kockának?', right: '1-féle' },
      { id: 'cubm8', left: 'Hányféle lapja lehet legfeljebb egy téglatestnek?', right: '3-féle' }
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány kis kocka?',
    description: 'Számolj rétegenként! A takart kockák is ott vannak.',
    pairs: L2.map(([l, d, h], i) => ({ id: `cubm${i + 9}`, left: '', promptFigure: <CubesCard l={l} d={d} h={h} />, right: `${l * d * h} kocka` }))
  },
  {
    level: 3,
    title: '3. szint: Egészítsd ki kockává!',
    description: 'Legalább hány kis kocka kell még, hogy kocka legyen?',
    pairs: L3.map((t, i) => ({ id: `cubm${i + 17}`, left: '', promptFigure: <CubesCard l={t[0]} d={t[1]} h={t[2]} />, right: missing(t) }))
  }
];

export const CUBOID_G3_MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: CUBOID_G3_MATCHER_LEVELS_LIST[0],
  2: CUBOID_G3_MATCHER_LEVELS_LIST[1],
  3: CUBOID_G3_MATCHER_LEVELS_LIST[2]
};

export const CuboidG3Matcher: React.FC<CuboidG3MatcherProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToSorter,
  onComplete,
  topicId = 'g3-geom-teglatest-matcher',
  topicTitle = '2. A téglatest és a kocka – Párosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <MatcherTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="a-teglatest-es-a-kocka"
      title={topicTitle}
      subtitle="Párosítsd a téglatesteket, a hálókat és a kockák számát!"
      levels={CUBOID_G3_MATCHER_LEVELS}
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

export default CuboidG3Matcher;
