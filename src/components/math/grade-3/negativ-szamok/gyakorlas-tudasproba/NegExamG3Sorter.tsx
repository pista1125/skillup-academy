import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ChangeCard, ThermoCard, NLCard, LiftButtonCard, DiverCard, changeWindow } from './NegExamG3CardFigures';

interface NegExamG3SorterProps {
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
const txt = (text: string, cat: string): SorterItem => ({ id: `exs${++uid}`, text, categoryId: cat });
const fig = (figure: React.ReactNode, cat: string, text = ''): SorterItem => ({ id: `exs${++uid}`, text, figure, categoryId: cat });
/** álló hőmérő; ha nincs megadva ablak, 10 fokos ablak az érték körül */
const th = (v: number, cat: string, win?: [number, number]) => {
  const lo = Math.floor((v - 1) / 5) * 5;
  const [min, max] = win ?? [lo, lo + 10];
  return fig(<ThermoCard value={v} min={min} max={max} small />, cat);
};
/** pont a számegyenesen (csak a 0 kiírva) */
const nl = (v: number, cat: string) => fig(<NLCard v={v} from={-4} to={4} labels={[0]} small />, cat);
const lb = (n: number, cat: string) => fig(<LiftButtonCard n={n} small />, cat);
const dv = (d: 1 | 2 | 3, cat: string) => fig(<DiverCard depth={d} small />, cat);
/** változás álló hőmérőn */
const ch = (a: number, b: number, cat: string) => {
  const [min, max] = changeWindow(a, b);
  return fig(<ChangeCard from={a} to={b} min={min} max={max} small />, cat);
};

const NEG_EXAM_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: 0-nál kisebb, éppen 0 vagy 0-nál nagyobb?',
    description: 'Hőmérő, számegyenes, lift, búvár: hol van a 0-hoz képest?',
    categories: [
      { id: 'neg', name: '0-nál kisebb (mínuszos)', color: 'sky' },
      { id: 'zero', name: 'éppen 0', color: 'emerald' },
      { id: 'pos', name: '0-nál nagyobb', color: 'orange' }
    ],
    items: [
      th(-3, 'neg'),
      th(-7, 'neg'),
      nl(-2, 'neg'),
      lb(-1, 'neg'),
      dv(2, 'neg'),
      txt('–5 °C', 'neg'),
      txt('mínusz két celziusz-fok', 'neg'),
      txt('a pince a liftben', 'neg'),
      txt('befagyott a tócsa: ennyi fok van', 'neg'),
      th(0, 'zero'),
      th(0, 'zero', [-10, 0]),
      nl(0, 'zero'),
      lb(0, 'zero'),
      txt('fagypont', 'zero'),
      txt('földszint a liftben', 'zero'),
      txt('a vízfelszín a búvárnál', 'zero'),
      txt('nulla celziusz-fok', 'zero'),
      txt('a –1 jobb szomszédja', 'zero'),
      th(4, 'pos'),
      th(9, 'pos'),
      nl(3, 'pos'),
      lb(2, 'pos'),
      txt('6 °C', 'pos'),
      txt('az 1. emelet a liftben', 'pos'),
      txt('tizenkét celziusz-fok', 'pos'),
      txt('a 0-tól 5 lépés jobbra', 'pos'),
      txt('a 0 jobb szomszédja', 'pos')
    ]
  },
  {
    level: 2,
    title: '2. szint: Hidegebb vagy melegebb, mint –4 °C?',
    description: 'Hasonlítsd össze a –4 °C-kal! Lejjebb a hőmérőn = hidegebb.',
    categories: [
      { id: 'cold', name: 'hidegebb, mint –4 °C', color: 'sky' },
      { id: 'mid', name: '–3 °C, –2 °C vagy –1 °C', color: 'violet' },
      { id: 'warm', name: '0 °C vagy melegebb', color: 'orange' }
    ],
    items: [
      th(-6, 'cold'),
      th(-9, 'cold'),
      th(-5, 'cold'),
      th(-12, 'cold'),
      txt('–7 °C', 'cold'),
      txt('–15 °C', 'cold'),
      txt('mínusz nyolc celziusz-fok', 'cold'),
      txt('–10 °C', 'cold'),
      txt('–11 °C', 'cold'),
      th(-3, 'mid'),
      th(-1, 'mid'),
      th(-2, 'mid'),
      th(-2, 'mid', [-10, 0]),
      txt('–3 °C', 'mid'),
      txt('–1 °C', 'mid'),
      txt('mínusz két celziusz-fok', 'mid'),
      txt('a –4 jobb szomszédja', 'mid'),
      txt('a 0 bal szomszédja', 'mid'),
      th(0, 'warm'),
      th(3, 'warm'),
      th(8, 'warm'),
      th(1, 'warm'),
      txt('0 °C', 'warm'),
      txt('5 °C', 'warm'),
      txt('fagypont', 'warm'),
      txt('12 °C', 'warm'),
      txt('tíz celziusz-fok', 'warm')
    ]
  },
  {
    level: 3,
    title: '3. szint: Hány lépés?',
    description: 'Hány fokot változott a hőmérséklet, vagy hány szintet, métert ment? Átlépés a 0-n: a 0-ig, aztán tovább!',
    categories: [
      { id: 's4', name: '4 lépés', color: 'emerald' },
      { id: 's6', name: '6 lépés', color: 'amber' },
      { id: 's9', name: '9 lépés', color: 'rose' }
    ],
    items: [
      ch(-1, 3, 's4'),
      ch(2, -2, 's4'),
      ch(-8, -4, 's4'),
      ch(5, 1, 's4'),
      txt('–3 °C → 1 °C', 's4'),
      txt('lift: a 2. emeletről a –2. szintre', 's4'),
      txt('0 °C → –4 °C', 's4'),
      txt('búvár: –5 m-ről –1 m-re', 's4'),
      txt('–6 °C → –2 °C', 's4'),
      ch(-4, 2, 's6'),
      ch(3, -3, 's6'),
      ch(-7, -1, 's6'),
      ch(10, 4, 's6'),
      txt('–5 °C → 1 °C', 's6'),
      txt('lift: a –2. szintről a 4. emeletre', 's6'),
      txt('1 °C → –5 °C', 's6'),
      txt('búvár: 0 m-ről –6 m-re', 's6'),
      txt('–9 °C → –3 °C', 's6'),
      ch(-5, 4, 's9'),
      ch(5, -4, 's9'),
      ch(-10, -1, 's9'),
      ch(1, 10, 's9'),
      txt('–2 °C → 7 °C', 's9'),
      txt('lift: a 6. emeletről a –3. szintre', 's9'),
      txt('3 °C → –6 °C', 's9'),
      txt('–8 °C → 1 °C', 's9'),
      txt('8 °C → –1 °C', 's9')
    ]
  }
];

export const NEG_EXAM_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NEG_EXAM_G3_SORTER_LEVELS_LIST[0],
  2: NEG_EXAM_G3_SORTER_LEVELS_LIST[1],
  3: NEG_EXAM_G3_SORTER_LEVELS_LIST[2]
};

export const NegExamG3Sorter: React.FC<NegExamG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-neg-tudasproba-sorter',
  topicTitle = '4. Gyakorlás, tudáspróba – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="gyakorlas-tudasproba"
      title={topicTitle}
      subtitle="Hová tartozik? Válogasd szét!"
      levels={NEG_EXAM_G3_SORTER_LEVELS}
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

export default NegExamG3Sorter;
