import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { NLCard, ThermoCard } from './NegNumberLineG3CardFigures';

interface NegNumberLineG3SorterProps {
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
const txt = (text: string, cat: string): SorterItem => ({ id: `nls${++uid}`, text, categoryId: cat });
const fig = (figure: React.ReactNode, cat: string): SorterItem => ({ id: `nls${++uid}`, text: '', figure, categoryId: cat });
/** pont a –3…3 számegyenesen (csak a 0 kiírva) */
const p3 = (v: number, cat: string) => fig(<NLCard v={v} from={-3} to={3} labels={[0]} small />, cat);
/** pont a számegyenes egy darabján: a –5-től balra, a –5 és a 0 között, vagy a 0-tól jobbra */
const p9 = (v: number, cat: string) =>
  v <= -5
    ? fig(<NLCard v={v} from={-10} to={-4} labels={[-5]} small />, cat)
    : v < 0
      ? fig(<NLCard v={v} from={-6} to={1} labels={[-5, 0]} small />, cat)
      : fig(<NLCard v={v} from={-2} to={5} labels={[0, 5]} small />, cat);
/** pont tetszőleges darabon */
const nl = (v: number, from: number, to: number, labels: number[], cat: string) => fig(<NLCard v={v} from={from} to={to} labels={labels} small />, cat);
const th = (v: number, cat: string) => {
  const lo = Math.floor((v - 3) / 5) * 5;
  return fig(<ThermoCard value={v} min={lo} max={lo + 10} small />, cat);
};

const NEG_NUMBERLINE_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hány lépés a 0-tól?',
    description: 'Balra vagy jobbra, mindegy: hány lépésre van a 0-tól?',
    categories: [
      { id: 'd1', name: '1 lépésre a 0-tól', color: 'emerald' },
      { id: 'd2', name: '2 lépésre a 0-tól', color: 'amber' },
      { id: 'd3', name: '3 lépésre a 0-tól', color: 'violet' }
    ],
    items: [
      p3(-1, 'd1'),
      p3(1, 'd1'),
      th(-1, 'd1'),
      th(1, 'd1'),
      txt('–1', 'd1'),
      txt('1', 'd1'),
      txt('mínusz egy', 'd1'),
      txt('a 0 bal szomszédja', 'd1'),
      txt('a 0 jobb szomszédja', 'd1'),
      p3(-2, 'd2'),
      p3(2, 'd2'),
      th(-2, 'd2'),
      th(2, 'd2'),
      txt('–2', 'd2'),
      txt('2', 'd2'),
      txt('mínusz kettő', 'd2'),
      txt('a –1 bal szomszédja', 'd2'),
      txt('az 1 jobb szomszédja', 'd2'),
      p3(-3, 'd3'),
      p3(3, 'd3'),
      th(-3, 'd3'),
      th(3, 'd3'),
      txt('–3', 'd3'),
      txt('3', 'd3'),
      txt('mínusz három', 'd3'),
      txt('a –2 bal szomszédja', 'd3'),
      txt('a 2 jobb szomszédja', 'd3')
    ]
  },
  {
    level: 2,
    title: '2. szint: Melyik szakaszon van?',
    description: 'Nézd meg, hol van a pont: a –5 előtt, a –5 és a 0 között, vagy a 0 után?',
    categories: [
      { id: 'a', name: 'a –10 és a –5 között', color: 'sky' },
      { id: 'b', name: 'a –5 és a 0 között', color: 'violet' },
      { id: 'c', name: 'a 0 és az 5 között', color: 'rose' }
    ],
    items: [
      p9(-9, 'a'),
      p9(-7, 'a'),
      p9(-6, 'a'),
      p9(-8, 'a'),
      txt('–8', 'a'),
      txt('–6', 'a'),
      txt('mínusz hét', 'a'),
      txt('–9', 'a'),
      txt('a –7 jobb szomszédja', 'a'),
      p9(-4, 'b'),
      p9(-2, 'b'),
      p9(-1, 'b'),
      p9(-3, 'b'),
      txt('–3', 'b'),
      txt('–1', 'b'),
      txt('mínusz négy', 'b'),
      txt('–2', 'b'),
      txt('a –3 bal szomszédja', 'b'),
      p9(1, 'c'),
      p9(3, 'c'),
      p9(4, 'c'),
      p9(2, 'c'),
      txt('2', 'c'),
      txt('4', 'c'),
      txt('három', 'c'),
      txt('1', 'c'),
      txt('a 2 jobb szomszédja', 'c')
    ]
  },
  {
    level: 3,
    title: '3. szint: Ugyanaz a szám',
    description: 'Számegyenes, hőmérő, szavak: melyik számot mutatják?',
    categories: [
      { id: 'm4', name: '–4', color: 'emerald' },
      { id: 'm7', name: '–7', color: 'amber' },
      { id: 'm10', name: '–10', color: 'sky' }
    ],
    items: [
      nl(-4, -6, 1, [0], 'm4'),
      nl(-4, -7, 0, [-5, 0], 'm4'),
      th(-4, 'm4'),
      nl(-4, -5, 2, [-5, 0], 'm4'),
      txt('mínusz négy', 'm4'),
      txt('4 lépés balra a 0-tól', 'm4'),
      txt('a –5 jobb szomszédja', 'm4'),
      txt('a –3 bal szomszédja', 'm4'),
      txt('a 0 másik oldalán, ugyanolyan messze, mint a 4', 'm4'),
      nl(-7, -9, 0, [-5, 0], 'm7'),
      nl(-7, -8, -2, [-5], 'm7'),
      th(-7, 'm7'),
      nl(-7, -10, -4, [-5], 'm7'),
      txt('mínusz hét', 'm7'),
      txt('7 lépés balra a 0-tól', 'm7'),
      txt('a –8 jobb szomszédja', 'm7'),
      txt('a –5-től 2 lépés balra', 'm7'),
      txt('–7 °C a hőmérőn', 'm7'),
      nl(-10, -11, -4, [-5], 'm10'),
      th(-10, 'm10'),
      nl(-10, -10, 0, [-5, 0], 'm10'),
      nl(-10, -12, -6, [-10], 'm10'),
      txt('mínusz tíz', 'm10'),
      txt('10 lépés balra a 0-tól', 'm10'),
      txt('a –9 bal szomszédja', 'm10'),
      txt('a –5-től 5 lépés balra', 'm10'),
      txt('a 0 másik oldalán, ugyanolyan messze, mint a 10', 'm10')
    ]
  }
];

export const NEG_NUMBERLINE_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NEG_NUMBERLINE_G3_SORTER_LEVELS_LIST[0],
  2: NEG_NUMBERLINE_G3_SORTER_LEVELS_LIST[1],
  3: NEG_NUMBERLINE_G3_SORTER_LEVELS_LIST[2]
};

export const NegNumberLineG3Sorter: React.FC<NegNumberLineG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-neg-szamegyenes-sorter',
  topicTitle = '2. A számegyenes és a nulla – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="szamegyenes-es-a-nulla"
      title={topicTitle}
      subtitle="Hol van a számegyenesen? Válogasd szét!"
      levels={NEG_NUMBERLINE_G3_SORTER_LEVELS}
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

export default NegNumberLineG3Sorter;
