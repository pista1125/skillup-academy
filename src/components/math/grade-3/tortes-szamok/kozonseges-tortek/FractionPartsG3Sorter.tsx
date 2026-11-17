import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { FracCard, CupCard } from './FractionPartsG3CardFigures';
import { DiagCard } from '../bevezetes/EqualPartsG3CardFigures';

interface FractionPartsG3SorterProps {
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
const fig = (figure: React.ReactNode, cat: string): SorterItem => ({ id: `frps${++uid}`, text: '', figure, categoryId: cat });
const txt = (text: string, cat: string): SorterItem => ({ id: `frps${++uid}`, text, categoryId: cat });
const pie = (n: number, k: number) => <FracCard small kind="pie" n={n} k={k} />;
const bar = (n: number, k: number) => <FracCard small kind="bar" n={n} k={k} />;
const grid = (n: number, k: number, rows = 2) => <FracCard small kind="grid" n={n} k={k} rows={rows} />;

const FRACTION_PARTS_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Fele, harmada vagy negyede?',
    description: 'Hány egyenlő részből áll az egész? Egy rész színes.',
    categories: [
      { id: 'h2', name: '1 ketted (a fele)', color: 'sky' },
      { id: 'h3', name: '1 harmad', color: 'amber' },
      { id: 'h4', name: '1 negyed', color: 'rose' }
    ],
    items: [
      fig(pie(2, 1), 'h2'),
      fig(bar(2, 1), 'h2'),
      fig(grid(2, 1, 2), 'h2'),
      fig(<CupCard small fill={5} />, 'h2'),
      fig(<FracCard small kind="grid" n={2} k={1} rows={1} />, 'h2'),
      txt('fél alma', 'h2'),
      txt('2 egyenlő részből 1', 'h2'),
      txt('a 10 dl fele: 5 dl', 'h2'),
      txt('a fele', 'h2'),
      fig(pie(3, 1), 'h3'),
      fig(bar(3, 1), 'h3'),
      fig(grid(3, 1, 3), 'h3'),
      fig(<FracCard small kind="grid" n={3} k={1} rows={1} colored={[false, true, false]} />, 'h3'),
      txt('3 egyenlő részből 1', 'h3'),
      txt('a harmada', 'h3'),
      txt('a magyar zászló piros csíkja', 'h3'),
      txt('1 szelet, ha 3-an osztoztok', 'h3'),
      txt('3 harmadból 1', 'h3'),
      fig(pie(4, 1), 'h4'),
      fig(bar(4, 1), 'h4'),
      fig(grid(4, 1), 'h4'),
      fig(<DiagCard small colored={[true]} />, 'h4'),
      txt('4 egyenlő részből 1', 'h4'),
      txt('a negyede', 'h4'),
      txt('a fél fele', 'h4'),
      txt('1 szelet, ha 4-en osztoztok', 'h4'),
      txt('4 negyedből 1', 'h4')
    ]
  },
  {
    level: 2,
    title: '2. szint: Kevesebb vagy több, mint a fele?',
    description: 'Nézd meg: a színes rész a felénél kisebb, pont a fele vagy nagyobb?',
    categories: [
      { id: 'lt', name: 'kevesebb, mint a fele', color: 'sky' },
      { id: 'eq', name: 'pont a fele', color: 'emerald' },
      { id: 'gt', name: 'több, mint a fele', color: 'rose' }
    ],
    items: [
      fig(pie(3, 1), 'lt'),
      fig(bar(5, 2), 'lt'),
      fig(grid(8, 3), 'lt'),
      fig(pie(4, 1), 'lt'),
      fig(bar(6, 2), 'lt'),
      txt('1 harmad', 'lt'),
      txt('2 ötöd', 'lt'),
      txt('1 negyed', 'lt'),
      txt('3 tized', 'lt'),
      fig(pie(4, 2), 'eq'),
      fig(bar(6, 3), 'eq'),
      fig(grid(8, 4), 'eq'),
      fig(pie(2, 1), 'eq'),
      fig(bar(10, 5), 'eq'),
      txt('2 negyed', 'eq'),
      txt('3 hatod', 'eq'),
      txt('5 tized', 'eq'),
      txt('1 ketted', 'eq'),
      fig(pie(4, 3), 'gt'),
      fig(bar(3, 2), 'gt'),
      fig(grid(6, 5), 'gt'),
      fig(pie(8, 5), 'gt'),
      fig(bar(5, 4), 'gt'),
      txt('3 negyed', 'gt'),
      txt('2 harmad', 'gt'),
      txt('7 tized', 'gt'),
      txt('5 hatod', 'gt')
    ]
  },
  {
    level: 3,
    title: '3. szint: Harmadok, negyedek, hatodok',
    description: 'Hány egyenlő részre osztottuk az egészet? Mindegy, hány rész színes.',
    categories: [
      { id: 'd3', name: 'harmadok', color: 'amber' },
      { id: 'd4', name: 'negyedek', color: 'violet' },
      { id: 'd6', name: 'hatodok', color: 'sky' }
    ],
    items: [
      fig(pie(3, 2), 'd3'),
      fig(bar(3, 1), 'd3'),
      fig(grid(3, 2, 3), 'd3'),
      fig(pie(3, 3), 'd3'),
      fig(bar(3, 3), 'd3'),
      txt('2 harmad', 'd3'),
      txt('3 harmad = 1 egész', 'd3'),
      txt('1 harmad', 'd3'),
      txt('a magyar zászló 1 csíkja', 'd3'),
      fig(pie(4, 3), 'd4'),
      fig(grid(4, 2), 'd4'),
      fig(bar(4, 1), 'd4'),
      fig(<DiagCard small colored={[true, false, true]} />, 'd4'),
      txt('3 negyed', 'd4'),
      txt('4 negyed', 'd4'),
      txt('2 negyed', 'd4'),
      txt('1 negyed', 'd4'),
      txt('a fél fele', 'd4'),
      fig(pie(6, 5), 'd6'),
      fig(grid(6, 1), 'd6'),
      fig(bar(6, 4), 'd6'),
      fig(grid(6, 2, 3), 'd6'),
      fig(pie(6, 6), 'd6'),
      txt('5 hatod', 'd6'),
      txt('1 hatod', 'd6'),
      txt('6 hatod', 'd6'),
      txt('3 hatod', 'd6')
    ]
  }
];

export const FRACTION_PARTS_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: FRACTION_PARTS_G3_SORTER_LEVELS_LIST[0],
  2: FRACTION_PARTS_G3_SORTER_LEVELS_LIST[1],
  3: FRACTION_PARTS_G3_SORTER_LEVELS_LIST[2]
};

export const FractionPartsG3Sorter: React.FC<FractionPartsG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-frac-tortreszek-sorter',
  topicTitle = '2. Törtrészek: fele, harmada, negyede – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId={topicId}
      subtopicId="kozonseges-tortek"
      title={topicTitle}
      subtitle="Tedd a törtrészeket a helyükre!"
      levels={FRACTION_PARTS_G3_SORTER_LEVELS}
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

export default FractionPartsG3Sorter;
