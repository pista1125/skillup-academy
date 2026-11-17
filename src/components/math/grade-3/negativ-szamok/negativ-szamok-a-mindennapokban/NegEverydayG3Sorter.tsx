import React from 'react';
import { SorterTemplate, SorterLevelConfig, SorterItem } from '../SorterTemplate';
import { DifficultyLevel } from '../QuizTemplate';
import { ThermoCard, LiftButtonCard, DiverCard, IconCard, BigTextCard } from './NegEverydayG3CardFigures';

interface NegEverydayG3SorterProps {
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
const txt = (text: string, cat: string): SorterItem => ({ id: `nes${++uid}`, text, categoryId: cat });
const fig = (figure: React.ReactNode, cat: string): SorterItem => ({ id: `nes${++uid}`, text: '', figure, categoryId: cat });
/** 10 fokos ablak a hőmérőn, a 0-hoz vagy 5-höz igazítva. */
const win = (v: number): [number, number] => {
  const lo = Math.floor((v - 3) / 5) * 5;
  return [lo, lo + 10];
};
const th = (v: number, cat: string): SorterItem => {
  const [min, max] = win(v);
  return fig(<ThermoCard value={v} min={min} max={max} small />, cat);
};

const NEG_EVERYDAY_G3_SORTER_LEVELS_LIST: SorterLevelConfig[] = [
  {
    level: 1,
    title: '1. szint: Hol látod a mínuszt?',
    description: 'Hőmérő, lift vagy víz alatt? Tedd a helyére!',
    categories: [
      { id: 'heat', name: 'hőmérséklet (°C)', color: 'rose' },
      { id: 'lift', name: 'szintek a liftben', color: 'amber' },
      { id: 'water', name: 'víz alatt (méter)', color: 'sky' }
    ],
    items: [
      th(-3, 'heat'),
      th(-6, 'heat'),
      fig(<IconCard kind="wall" />, 'heat'),
      th(-1, 'heat'),
      txt('–4 °C', 'heat'),
      txt('mínusz két fok', 'heat'),
      txt('0 °C', 'heat'),
      txt('–8 °C', 'heat'),
      txt('–5 °C', 'heat'),
      fig(<LiftButtonCard n={-1} small />, 'lift'),
      fig(<LiftButtonCard n={-2} small />, 'lift'),
      fig(<LiftButtonCard n={0} small />, 'lift'),
      fig(<LiftButtonCard n={3} small />, 'lift'),
      txt('pince', 'lift'),
      txt('mélygarázs', 'lift'),
      txt('földszint', 'lift'),
      txt('–1. szint', 'lift'),
      txt('2. emelet', 'lift'),
      fig(<DiverCard depth={1} small />, 'water'),
      fig(<DiverCard depth={2} small />, 'water'),
      fig(<DiverCard depth={3} small />, 'water'),
      fig(<BigTextCard text="–2 m" small color="#0369a1" />, 'water'),
      txt('–3 m', 'water'),
      txt('a búvár 4 méterrel a víz alatt', 'water'),
      txt('vízfelszín: 0 m', 'water'),
      txt('–5 m', 'water'),
      txt('a hal 1 méter mélyen úszik', 'water')
    ]
  },
  {
    level: 2,
    title: '2. szint: Mit vegyél fel?',
    description: 'Olvasd le a hőmérőt! Mit veszel fel ilyen időben?',
    categories: [
      { id: 'cold', name: 'fagy (0 °C alatt): sapka, sál, kesztyű', color: 'sky' },
      { id: 'cool', name: 'hűvös (1 és 12 °C között): kabát', color: 'amber' },
      { id: 'warm', name: 'meleg (20 °C fölött): póló, rövidnadrág', color: 'rose' }
    ],
    items: [
      th(-3, 'cold'),
      th(-8, 'cold'),
      th(-5, 'cold'),
      th(-1, 'cold'),
      th(-9, 'cold'),
      txt('–6 °C', 'cold'),
      txt('mínusz tíz fok', 'cold'),
      txt('–2 °C', 'cold'),
      txt('mínusz négy fok', 'cold'),
      th(4, 'cool'),
      th(7, 'cool'),
      th(9, 'cool'),
      th(11, 'cool'),
      th(3, 'cool'),
      txt('5 °C', 'cool'),
      txt('8 °C', 'cool'),
      txt('tíz fok', 'cool'),
      txt('6 °C', 'cool'),
      th(24, 'warm'),
      th(27, 'warm'),
      th(29, 'warm'),
      th(22, 'warm'),
      th(26, 'warm'),
      txt('25 °C', 'warm'),
      txt('28 °C', 'warm'),
      txt('harminc fok', 'warm'),
      txt('23 °C', 'warm')
    ]
  },
  {
    level: 3,
    title: '3. szint: Melyik hőmérővel?',
    description: 'Melyik hőmérőt használod? Válogasd szét!',
    categories: [
      { id: 'laz', name: 'lázmérő', color: 'rose' },
      { id: 'furdo', name: 'fürdővíz-hőmérő', color: 'amber' },
      { id: 'kinti', name: 'kinti hőmérő', color: 'sky' }
    ],
    items: [
      fig(<IconCard kind="fever" />, 'laz'),
      fig(<IconCard kind="sick" />, 'laz'),
      fig(<IconCard kind="bed" />, 'laz'),
      fig(<IconCard kind="doctor" />, 'laz'),
      txt('Meleg a homlokod.', 'laz'),
      txt('Influenzás vagy.', 'laz'),
      txt('Lázas vagy-e?', 'laz'),
      txt('Beteg a kistesód.', 'laz'),
      txt('38 °C: lázad van.', 'laz'),
      fig(<IconCard kind="bathfish" />, 'furdo'),
      fig(<IconCard kind="tub" />, 'furdo'),
      fig(<IconCard kind="duck" />, 'furdo'),
      fig(<IconCard kind="soap" />, 'furdo'),
      txt('Fürdik a baba.', 'furdo'),
      txt('Nem túl forró a víz a kádban?', 'furdo'),
      txt('37 °C-os a fürdővíz.', 'furdo'),
      txt('Langyos vizet engedsz a kádba.', 'furdo'),
      txt('Habfürdő készül.', 'furdo'),
      fig(<IconCard kind="wall" />, 'kinti'),
      fig(<IconCard kind="snowtree" />, 'kinti'),
      fig(<IconCard kind="window" />, 'kinti'),
      fig(<IconCard kind="snowman" />, 'kinti'),
      txt('Fagy van az udvaron?', 'kinti'),
      txt('–5 °C van kint.', 'kinti'),
      txt('Mit vegyek fel ma reggel?', 'kinti'),
      txt('Befagyott a tócsa?', 'kinti'),
      txt('Hány fok van az erkélyen?', 'kinti')
    ]
  }
];

export const NEG_EVERYDAY_G3_SORTER_LEVELS: Record<DifficultyLevel, SorterLevelConfig> = {
  1: NEG_EVERYDAY_G3_SORTER_LEVELS_LIST[0],
  2: NEG_EVERYDAY_G3_SORTER_LEVELS_LIST[1],
  3: NEG_EVERYDAY_G3_SORTER_LEVELS_LIST[2]
};

export const NegEverydayG3Sorter: React.FC<NegEverydayG3SorterProps> = ({
  level = 1,
  currentLevel,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToTheory,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onComplete,
  topicId = 'g3-neg-mindennapok-sorter',
  topicTitle = '1. Negatív számok a mindennapokban – Csoportosító Játék',
  ...rest
}) => {
  const activeLevel = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  return (
    <SorterTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId={topicId}
      subtopicId="negativ-szamok-a-mindennapokban"
      title={topicTitle}
      subtitle="Hová tartozik? Válogasd szét!"
      levels={NEG_EVERYDAY_G3_SORTER_LEVELS}
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

export default NegEverydayG3Sorter;
