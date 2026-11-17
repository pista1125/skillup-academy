import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { SolidCard } from '../a-testek/SolidsG3CardFigures';
import { SolidKind } from '../a-testek/SolidsG3Parts';
import { CUBE_NETS_OK, CUBE_NETS_BAD } from './CuboidG3Parts';
import { BoxCard, NetCard, CuboidNetCard, CubesCard } from './CuboidG3CardFigures';

interface CuboidG3SorterProps {
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
const id = () => `cubs${++uid}`;
const box = (l: number, h: number, d: number, cat: string, color?: string): SorterItem => ({ id: id(), text: '', figure: <BoxCard l={l} h={h} d={d} small color={color} />, categoryId: cat });
const solid = (k: SolidKind, cat: string): SorterItem => ({ id: id(), text: '', figure: <SolidCard kind={k} small />, categoryId: cat });
const txt = (text: string, cat: string): SorterItem => ({ id: id(), text, categoryId: cat });
const cubes = (l: number, d: number, h: number, cat: string): SorterItem => ({ id: id(), text: '', figure: <CubesCard l={l} d={d} h={h} small />, categoryId: cat });

const CUBOID_NETS: [number, number, number, 'front' | 'back', boolean][] = [
  [2, 1, 1.2, 'front', false],
  [2, 1, 1.2, 'back', false],
  [2, 1, 1.2, 'front', true],
  [1.5, 0.8, 1.8, 'front', false],
  [1.5, 0.8, 1.8, 'back', true],
  [1, 1, 2, 'front', false],
  [1, 1, 2, 'back', false],
  [2.4, 0.7, 1, 'front', true],
  [2.4, 0.7, 1, 'back', false]
];

const CUBOID_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Kocka vagy téglatest?',
    description: 'A kocka is téglatest! A középső csoportba csak a nem kocka alakú téglatestek kerülnek.',
    categories: [
      { id: 'kocka', name: 'kocka', color: 'sky' },
      { id: 'teg', name: 'téglatest, de nem kocka', color: 'amber' },
      { id: 'nem', name: 'nem téglatest', color: 'rose' }
    ],
    items: [
      box(1, 1, 1, 'kocka'),
      box(1, 1, 1, 'kocka', '#ef4444'),
      box(1, 1, 1, 'kocka', '#22c55e'),
      box(1, 1, 1, 'kocka', '#a855f7'),
      box(1, 1, 1, 'kocka', '#f59e0b'),
      txt('dobókocka', 'kocka'),
      txt('Rubik-kocka', 'kocka'),
      txt('jégkocka', 'kocka'),
      txt('kocka alakú ajándékdoboz', 'kocka'),
      box(2, 1, 1, 'teg'),
      box(1, 2, 1, 'teg', '#22c55e'),
      box(2.2, 0.6, 1.2, 'teg', '#ef4444'),
      box(1.6, 1, 0.6, 'teg', '#3b82f6'),
      box(0.8, 2.2, 0.8, 'teg', '#a855f7'),
      txt('tégla', 'teg'),
      txt('cipősdoboz', 'teg'),
      txt('gyufásdoboz', 'teg'),
      txt('fogkrémes doboz', 'teg'),
      solid('piramis4', 'nem'),
      solid('sator', 'nem'),
      solid('henger', 'nem'),
      solid('kup', 'nem'),
      solid('gomb', 'nem'),
      txt('labda', 'nem'),
      txt('konzervdoboz', 'nem'),
      txt('fagyitölcsér', 'nem'),
      txt('kemping sátor', 'nem')
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik háló?',
    description: 'Kocka lesz belőle, téglatest, vagy egyik sem?',
    categories: [
      { id: 'kh', name: 'kocka hálója', color: 'sky' },
      { id: 'th', name: 'téglatest hálója (nem kocka)', color: 'amber' },
      { id: 'nem', name: 'nem lesz belőle kocka', color: 'rose' }
    ],
    items: [
      ...CUBE_NETS_OK.map((c) => ({ id: id(), text: '', figure: <NetCard cells={c} small />, categoryId: 'kh' })),
      ...CUBOID_NETS.map(([l, d, h, b, r]) => ({ id: id(), text: '', figure: <CuboidNetCard l={l} d={d} h={h} bottom={b} rotate={r} small />, categoryId: 'th' })),
      ...CUBE_NETS_BAD.map((c) => ({ id: id(), text: '', figure: <NetCard cells={c} small />, categoryId: 'nem' }))
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány kis kocka?',
    description: 'Számolj rétegenként!',
    categories: [
      { id: 'k8', name: '8 kocka', color: 'emerald' },
      { id: 'k12', name: '12 kocka', color: 'sky' },
      { id: 'k18', name: '18 kocka', color: 'amber' }
    ],
    items: [
      cubes(2, 2, 2, 'k8'),
      cubes(4, 2, 1, 'k8'),
      cubes(4, 1, 2, 'k8'),
      cubes(2, 1, 4, 'k8'),
      cubes(1, 2, 4, 'k8'),
      txt('2 · 2 · 2', 'k8'),
      txt('egy sorban 4, 2 sor, 1 réteg', 'k8'),
      txt('rétegenként 4 kocka, 2 réteg', 'k8'),
      txt('egy sorban 2, 1 sor, 4 réteg', 'k8'),
      cubes(3, 2, 2, 'k12'),
      cubes(4, 3, 1, 'k12'),
      cubes(6, 2, 1, 'k12'),
      cubes(2, 2, 3, 'k12'),
      cubes(6, 1, 2, 'k12'),
      txt('3 · 4', 'k12'),
      txt('rétegenként 6 kocka, 2 réteg', 'k12'),
      txt('4 sor, soronként 3 kocka', 'k12'),
      txt('2 · 2 · 3', 'k12'),
      cubes(3, 3, 2, 'k18'),
      cubes(3, 1, 6, 'k18'),
      cubes(3, 2, 3, 'k18'),
      cubes(6, 1, 3, 'k18'),
      cubes(2, 3, 3, 'k18'),
      txt('3 · 3 · 2', 'k18'),
      txt('rétegenként 9 kocka, 2 réteg', 'k18'),
      txt('6 sor, soronként 3 kocka', 'k18'),
      txt('rétegenként 6 kocka, 3 réteg', 'k18')
    ]
  }
];

export const CUBOID_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: CUBOID_G3_SORTER_LEVELS_LIST[0],
  2: CUBOID_G3_SORTER_LEVELS_LIST[1],
  3: CUBOID_G3_SORTER_LEVELS_LIST[2]
};

export const CuboidG3Sorter: React.FC<CuboidG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-geom-teglatest-sorter',
  topicTitle = '2. A téglatest és a kocka – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId={topicId}
      subtopicId="a-teglatest-es-a-kocka"
      title={topicTitle}
      subtitle="Válogasd szét a testeket, a hálókat és az építményeket!"
      levels={CUBOID_G3_SORTER_LEVELS}
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

export default CuboidG3Sorter;
