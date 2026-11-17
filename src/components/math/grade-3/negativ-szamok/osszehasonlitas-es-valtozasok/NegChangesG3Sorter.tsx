import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChangeCard, ThermoCard, TwoThermoCard } from './NegChangesG3CardFigures';

interface NegChangesG3SorterProps {
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
const txt = (text: string, cat: string): SorterItem => ({ id: `chs${++uid}`, text, categoryId: cat });
const fig = (figure: React.ReactNode, cat: string, text = ''): SorterItem => ({ id: `chs${++uid}`, text, figure, categoryId: cat });
/** a 10 fokos ablak a két érték körül */
const win = (a: number, b: number): [number, number] => {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  if (hi <= 0) return [-10, 0];
  if (lo >= 0) return [0, 10];
  return [-5, 5];
};
/** változás álló hőmérőn: üres karika → teli karika */
const ch = (a: number, b: number, cat: string) => {
  const [min, max] = win(a, b);
  return fig(<ChangeCard from={a} to={b} min={min} max={max} small />, cat);
};
/** két hőmérő: bal = előtte, jobb = utána */
const two = (a: number, b: number, cat: string) => {
  const [min, max] = win(a, b);
  return fig(<TwoThermoCard a={a} b={b} min={min} max={max} small />, cat);
};
/** hőmérő a kiinduló értékkel + a változás szövege */
const th = (v: number, text: string, cat: string) => {
  const lo = Math.floor((v - 1) / 5) * 5;
  return fig(<ThermoCard value={v} min={lo} max={lo + 10} small />, cat, text);
};

const NEG_CHANGES_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Melegedett, hűlt vagy nem változott?',
    description: 'Üres karika: előtte, teli karika: utána. Két hőmérőnél: bal = előtte, jobb = utána.',
    categories: [
      { id: 'up', name: 'melegedett', color: 'orange' },
      { id: 'down', name: 'hűlt', color: 'sky' },
      { id: 'same', name: 'nem változott', color: 'emerald' }
    ],
    items: [
      ch(2, 7, 'up'),
      ch(-8, -3, 'up'),
      ch(-4, 3, 'up'),
      ch(-1, 4, 'up'),
      two(-4, 1, 'up'),
      txt('–5 °C → –2 °C', 'up'),
      txt('0 °C → 6 °C', 'up'),
      txt('reggel –3 °C, délben 2 °C', 'up'),
      txt('fölfelé ment a hőmérő', 'up'),
      ch(9, 3, 'down'),
      ch(-1, -7, 'down'),
      ch(4, -3, 'down'),
      ch(2, -2, 'down'),
      two(3, -2, 'down'),
      txt('6 °C → –1 °C', 'down'),
      txt('–2 °C → –8 °C', 'down'),
      txt('délben 4 °C, éjjel –2 °C', 'down'),
      txt('lefelé ment a hőmérő', 'down'),
      two(-3, -3, 'same'),
      two(5, 5, 'same'),
      two(0, 0, 'same'),
      two(-6, -6, 'same'),
      txt('–4 °C → –4 °C', 'same'),
      txt('2 °C → 2 °C', 'same'),
      txt('reggel is, délben is 0 °C', 'same'),
      txt('7 °C → 7 °C', 'same'),
      txt('egy helyben maradt a hőmérő', 'same')
    ]
  },
  {
    level: 2,
    title: '2. szint: Hány fokkal változott?',
    description: 'Mindegy, hogy melegedett vagy hűlt: hány fokot lépett a hőmérő?',
    categories: [
      { id: 'd3', name: '3 fokkal', color: 'violet' },
      { id: 'd5', name: '5 fokkal', color: 'amber' },
      { id: 'd8', name: '8 fokkal', color: 'rose' }
    ],
    items: [
      ch(-1, 2, 'd3'),
      ch(4, 1, 'd3'),
      ch(-6, -9, 'd3'),
      ch(1, -2, 'd3'),
      txt('–5 °C → –2 °C', 'd3'),
      txt('7 °C → 10 °C', 'd3'),
      txt('2 °C → –1 °C', 'd3'),
      txt('reggel 0 °C, délben 3 °C', 'd3'),
      txt('–3 °C → –6 °C', 'd3'),
      ch(-2, 3, 'd5'),
      ch(8, 3, 'd5'),
      ch(-9, -4, 'd5'),
      ch(4, -1, 'd5'),
      txt('–1 °C → 4 °C', 'd5'),
      txt('5 °C → 0 °C', 'd5'),
      txt('–7 °C → –2 °C', 'd5'),
      txt('3 °C → –2 °C', 'd5'),
      txt('–5 °C → 0 °C', 'd5'),
      ch(-5, 3, 'd8'),
      ch(4, -4, 'd8'),
      ch(2, 10, 'd8'),
      ch(-1, -9, 'd8'),
      txt('–3 °C → 5 °C', 'd8'),
      txt('6 °C → –2 °C', 'd8'),
      txt('–8 °C → 0 °C', 'd8'),
      txt('1 °C → –7 °C', 'd8'),
      txt('–10 °C → –2 °C', 'd8')
    ]
  },
  {
    level: 3,
    title: '3. szint: Mennyi lett?',
    description: 'A hőmérő a kezdő hőmérsékletet mutatja. Mennyi lett a változás után?',
    categories: [
      { id: 'm2', name: '–2 °C lett', color: 'sky' },
      { id: 'z0', name: '0 °C lett', color: 'emerald' },
      { id: 'p3', name: '3 °C lett', color: 'orange' }
    ],
    items: [
      th(3, 'hűlt 5 fokkal', 'm2'),
      th(-6, 'melegedett 4 fokkal', 'm2'),
      th(1, 'hűlt 3 fokkal', 'm2'),
      th(-4, 'melegedett 2 fokkal', 'm2'),
      txt('5 °C, hűlt 7 fokkal', 'm2'),
      txt('–5 °C, melegedett 3 fokkal', 'm2'),
      txt('0 °C, hűlt 2 fokkal', 'm2'),
      txt('–9 °C, melegedett 7 fokkal', 'm2'),
      txt('4 °C, hűlt 6 fokkal', 'm2'),
      th(-3, 'melegedett 3 fokkal', 'z0'),
      th(4, 'hűlt 4 fokkal', 'z0'),
      th(-7, 'melegedett 7 fokkal', 'z0'),
      th(2, 'hűlt 2 fokkal', 'z0'),
      txt('–8 °C, melegedett 8 fokkal', 'z0'),
      txt('6 °C, hűlt 6 fokkal', 'z0'),
      txt('–1 °C, melegedett 1 fokkal', 'z0'),
      txt('9 °C, hűlt 9 fokkal', 'z0'),
      txt('–5 °C, melegedett 5 fokkal', 'z0'),
      th(-2, 'melegedett 5 fokkal', 'p3'),
      th(7, 'hűlt 4 fokkal', 'p3'),
      th(-5, 'melegedett 8 fokkal', 'p3'),
      th(0, 'melegedett 3 fokkal', 'p3'),
      txt('–4 °C, melegedett 7 fokkal', 'p3'),
      txt('9 °C, hűlt 6 fokkal', 'p3'),
      txt('10 °C, hűlt 7 fokkal', 'p3'),
      txt('–1 °C, melegedett 4 fokkal', 'p3'),
      txt('1 °C, melegedett 2 fokkal', 'p3')
    ]
  }
];

export const NEG_CHANGES_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NEG_CHANGES_G3_SORTER_LEVELS_LIST[0],
  2: NEG_CHANGES_G3_SORTER_LEVELS_LIST[1],
  3: NEG_CHANGES_G3_SORTER_LEVELS_LIST[2]
};

export const NegChangesG3Sorter: React.FC<NegChangesG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-neg-valtozasok-sorter',
  topicTitle = '3. Összehasonlítás és változások – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="osszehasonlitas-es-valtozasok"
      title={topicTitle}
      subtitle="Melegedett vagy hűlt? Hány fokkal? Válogasd szét!"
      levels={NEG_CHANGES_G3_SORTER_LEVELS}
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

export default NegChangesG3Sorter;
