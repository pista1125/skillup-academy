import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MassG2Matcher } from './MassG2Matcher';
import { MassG2Sorter } from './MassG2Sorter';
import { MASS_FONT, BalancePart, SeesawPart, PanItem, PanItemPart } from './MassG2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MASS_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const w = (kg: number): PanItem => ({ kind: 'w', kg });
const Q: PanItem = { kind: 'q' };
const bag = (label: string): PanItem => ({ kind: 'bag', label });

const BalQ: React.FC<{ left: PanItem[]; right: PanItem[]; tilt?: number }> = ({ left, right, tilt = 0 }) => (
  <QFig h={126}>
    <BalancePart cx={130} y={40} half={80} tilt={tilt} left={left} right={right} panW={84} />
  </QFig>
);

const SeesawQ: React.FC<{ left: { name: string; kg: number; color?: string }[]; right: { name: string; kg: number; color?: string }[] }> = ({
  left,
  right
}) => (
  <QFig h={124}>
    <rect x="2" y="104" width="256" height="18" fill="#bbf7d0" />
    <SeesawPart cx={130} y={82} half={115} tilt={0} leftKids={left} rightKids={right} />
    <text x="130" y="72" textAnchor="middle" fontSize="18" fontWeight="900" fill={UNK}>
      ?
    </text>
  </QFig>
);

const SacksQ: React.FC<{ labels: string[] }> = ({ labels }) => (
  <QFig h={84}>
    {labels.map((l, i) => {
      const x = 40 + i * 60;
      return (
        <g key={l}>
          <path d={`M ${x - 22} 70 L ${x - 18} 30 L ${x - 8} 20 L ${x + 8} 20 L ${x + 18} 30 L ${x + 22} 70 Z`} fill="#d6c19a" stroke="#78350f" strokeWidth="1.6" />
          <line x1={x - 8} y1={22} x2={x + 8} y2={22} stroke="#78350f" strokeWidth="2.5" />
          <text x={x} y={54} textAnchor="middle" fontSize="13" fontWeight="900" fill="#422006">
            {l}
          </text>
        </g>
      );
    })}
  </QFig>
);

const CratesQ: React.FC<{ n: number; each: number }> = ({ n, each }) => {
  const bw = 40;
  const x0 = 130 - (n * bw + (n - 1) * 4) / 2;
  return (
    <QFig h={110}>
      <rect x="20" y="66" width="220" height="12" rx="3" fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
      <rect x="104" y="80" width="52" height="20" rx="3" fill="#1e293b" />
      <text x="130" y="95" textAnchor="middle" fontSize="13" fontWeight="900" fill={UNK}>
        ? kg
      </text>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * (bw + 4)} y={30} width={bw} height={36} rx="3" fill="#d6a76c" stroke="#78350f" strokeWidth="1.6" />
          <text x={x0 + i * (bw + 4) + bw / 2} y={53} textAnchor="middle" fontSize="13" fontWeight="900" fill="#422006">
            {each} kg
          </text>
        </g>
      ))}
    </QFig>
  );
};

const KidsScalesQ: React.FC = () => (
  <QFig h={100}>
    {[
      { name: 'Kata', kg: 26, x: 75, c: '#db2777' },
      { name: 'Bálint', kg: 31, x: 185, c: '#2563eb' }
    ].map((k) => (
      <g key={k.name}>
        <text x={k.x} y={22} textAnchor="middle" fontSize="14" fontWeight="900" fill={k.c}>
          {k.name}
        </text>
        <rect x={k.x - 40} y={52} width="80" height="30" rx="8" fill="#e2e8f0" stroke="#334155" strokeWidth="2" />
        <rect x={k.x - 24} y={30} width="48" height="20" rx="3" fill="#1e293b" />
        <text x={k.x} y={45} textAnchor="middle" fontSize="13" fontWeight="900" fill="#4ade80">
          {k.kg} kg
        </text>
      </g>
    ))}
  </QFig>
);

const SackMinusQ: React.FC = () => (
  <QFig h={92}>
    <path d="M 30 76 L 36 34 L 48 22 L 72 22 L 84 34 L 90 76 Z" fill="#d6c19a" stroke="#78350f" strokeWidth="1.6" />
    <text x="60" y="58" textAnchor="middle" fontSize="14" fontWeight="900" fill="#422006">
      50 kg
    </text>
    <line x1="100" y1="50" x2="160" y2="50" stroke="#334155" strokeWidth="2.5" />
    <polygon points="160,44 172,50 160,56" fill="#334155" />
    <text x="132" y="40" textAnchor="middle" fontSize="14" fontWeight="900" fill="#b91c1c">
      − 20 kg
    </text>
    <path d="M 186 76 L 192 44 L 202 36 L 218 36 L 228 44 L 234 76 Z" fill="#e7dcc4" stroke="#78350f" strokeWidth="1.6" />
    <text x="210" y="64" textAnchor="middle" fontSize="18" fontWeight="900" fill={UNK}>
      ?
    </text>
  </QFig>
);

const BarChartQ: React.FC = () => {
  const data = [
    { n: 'Anna', v: 30 },
    { n: 'Gergő', v: 25 },
    { n: 'Csilla', v: 20 },
    { n: 'Dani', v: 35 }
  ];
  const x0 = 60;
  const sc = 4.6; // px / kg
  return (
    <QFig h={150}>
      {[0, 10, 20, 30, 40].map((g) => (
        <g key={g}>
          <line x1={x0 + g * sc} y1={12} x2={x0 + g * sc} y2={118} stroke={g === 0 ? '#334155' : '#cbd5e1'} strokeWidth={g === 0 ? 2 : 1} />
          <text x={x0 + g * sc} y={132} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
            {g}
          </text>
        </g>
      ))}
      <text x={x0 + 40 * sc + 2} y={146} textAnchor="end" fontSize="10" fontWeight="bold" fill="#64748b">
        kg
      </text>
      {data.map((d, i) => (
        <g key={d.n}>
          <text x={x0 - 6} y={30 + i * 25} textAnchor="end" fontSize="12" fontWeight="900" fill={d.n === 'Gergő' ? '#1d4ed8' : '#334155'}>
            {d.n}
          </text>
          <rect x={x0} y={20 + i * 25} width={d.v * sc} height="14" fill={d.n === 'Gergő' ? '#2563eb' : '#93c5fd'} stroke="#1e3a8a" strokeWidth="1" />
        </g>
      ))}
    </QFig>
  );
};

const BasketsQ: React.FC = () => (
  <QFig h={100}>
    {[
      { x: 60, label: '3 kg', fruit: 'apple' as const },
      { x: 150, label: '4 kg', fruit: 'pear' as const }
    ].map((b) => (
      <g key={b.label}>
        {[-14, 0, 14].map((dx) => (
          <PanItemPart key={dx} it={{ kind: b.fruit }} x={b.x + dx} y={44} />
        ))}
        <path d={`M ${b.x - 30} 42 L ${b.x + 30} 42 L ${b.x + 22} 72 L ${b.x - 22} 72 Z`} fill="#b45309" stroke="#78350f" strokeWidth="1.6" />
        <text x={b.x} y={90} textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">
          {b.label}
        </text>
      </g>
    ))}
    <text x="105" y="62" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">
      +
    </text>
    <text x="222" y="62" textAnchor="middle" fontSize="20" fontWeight="900" fill={UNK}>
      = ?
    </text>
  </QFig>
);

const TwoBalancesQ: React.FC = () => (
  <QFig h={118}>
    <BalancePart cx={68} y={34} half={44} tilt={-12} left={[{ kind: 'ball' }]} right={[{ kind: 'book' }]} panW={44} />
    <BalancePart cx={192} y={34} half={44} tilt={-12} left={[{ kind: 'book' }]} right={[{ kind: 'pencil' }]} panW={44} />
  </QFig>
);

const KidTagsQ: React.FC<{ kids: { name: string; kg: number; c: string }[] }> = ({ kids }) => (
  <QFig h={84}>
    {kids.map((k, i) => {
      const x = 48 + i * 82;
      return (
        <g key={k.name}>
          <circle cx={x} cy={22} r="10" fill="#fcd9b6" stroke="#b45309" strokeWidth="1.4" />
          <line x1={x} y1={32} x2={x} y2={46} stroke={k.c} strokeWidth="8" strokeLinecap="round" />
          <text x={x} y={64} textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">
            {k.name}
          </text>
          <text x={x} y={78} textAnchor="middle" fontSize="12" fontWeight="900" fill="#b91c1c">
            {k.kg} kg
          </text>
        </g>
      );
    })}
  </QFig>
);

const ProgressQ: React.FC = () => {
  const x0 = 20;
  const W = 220;
  const done = (64 / 100) * W;
  return (
    <QFig h={90}>
      <rect x={x0} y={30} width={done} height="22" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.4" />
      <rect x={x0 + done} y={30} width={W - done} height="22" fill="#ffffff" stroke="#7f1d1d" strokeWidth="1.4" />
      <text x={x0 + done / 2} y={46} textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff">
        64 kg
      </text>
      <text x={x0 + done + (W - done) / 2} y={47} textAnchor="middle" fontSize="16" fontWeight="900" fill={UNK}>
        ?
      </text>
      <path d={`M ${x0} 60 L ${x0} 66 L ${x0 + W} 66 L ${x0 + W} 60`} fill="none" stroke="#334155" strokeWidth="2" />
      <text x="130" y="82" textAnchor="middle" fontSize="13" fontWeight="900" fill="#334155">
        100 kg alma
      </text>
    </QFig>
  );
};

const MeatQ: React.FC = () => (
  <QFig h={84}>
    {Array.from({ length: 5 }, (_, i) => (
      <g key={i}>
        <rect x={18 + i * 46} y={22} width="40" height="30" rx="5" fill="#fecaca" stroke="#b91c1c" strokeWidth="1.6" />
        <text x={38 + i * 46} y={42} textAnchor="middle" fontSize="13" fontWeight="900" fill="#7f1d1d">
          6 kg
        </text>
        <text x={38 + i * 46} y={70} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
          {i + 1}. nap
        </text>
      </g>
    ))}
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MASS_G2_QUESTIONS: QuizQuestion[] = [
  // ---- 1. szint ----
  {
    id: 'massg2-q1',
    level: 1,
    questionTypeBadge: 'Kétkarú mérleg',
    figure: <BalQ left={[{ kind: 'melon' }]} right={[{ kind: 'apple' }]} tilt={-10} />,
    question: 'Melyik nehezebb?',
    options: ['a dinnye', 'az alma', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A dinnye oldala van lent. A nehezebb oldal mindig lemegy.'
  },
  {
    id: 'massg2-q2',
    level: 1,
    questionTypeBadge: 'Egyensúly',
    figure: <BalQ left={[{ kind: 'box' }]} right={[{ kind: 'box' }]} />,
    question: 'Mit mutat a mérleg?',
    options: ['egyforma nehezek', 'a bal nehezebb', 'a jobb nehezebb', 'egyik sem nehéz'],
    correctAnswer: 0,
    explanation: 'A mérleg karja vízszintes, egyensúlyban van. A két doboz egyforma nehéz.'
  },
  {
    id: 'massg2-q3',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    question: 'Mivel mérjük meg, milyen nehéz valami?',
    options: ['mérleggel', 'vonalzóval', 'órával', 'mérőpohárral'],
    correctAnswer: 0,
    explanation: 'A tömeget mérleggel mérjük. A vonalzó hosszt, az óra időt, a pohár űrtartalmat mér.'
  },
  {
    id: 'massg2-q4',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik a tömeg mértékegysége?',
    options: ['kg', 'cm', 'dl', 'm'],
    correctAnswer: 0,
    explanation: 'A kg (kilogramm) a tömeg mértékegysége. A cm és az m hosszúság, a dl űrtartalom.'
  },
  {
    id: 'massg2-q5',
    level: 1,
    questionTypeBadge: '1 kilogramm',
    figure: <BalQ left={[w(1)]} right={[{ kind: 'apple' }, { kind: 'apple' }, { kind: 'apple' }, { kind: 'apple' }, { kind: 'apple' }]} />,
    question: 'A mérleg egyensúlyban van. Hány alma van az 1 kg-os súllyal szemben?',
    options: ['5', '4', '6', '1'],
    correctAnswer: 0,
    explanation: 'Számold meg az almákat: 5. Ennyi alma kb. 1 kg.'
  },
  {
    id: 'massg2-q6',
    level: 1,
    questionTypeBadge: 'Csavaros kérdés',
    question: 'Melyik nehezebb: 1 kg toll vagy 1 kg vas?',
    options: ['egyformák', 'a vas', 'a toll', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Mindkettő 1 kg! A vasból kevesebb kell, a tollból sok, de a tömegük ugyanannyi.'
  },
  {
    id: 'massg2-q7',
    level: 1,
    questionTypeBadge: 'Súlyok',
    figure: <BalQ left={[{ kind: 'pumpkin' }]} right={[w(2), w(1)]} />,
    question: 'A mérleg egyensúlyban van. Hány kg a tök?',
    options: ['3 kg', '2 kg', '1 kg', '4 kg'],
    correctAnswer: 0,
    explanation: 'A jobb oldalon 2 kg + 1 kg = 3 kg van. Egyensúlyban, ezért a tök is 3 kg.'
  },
  {
    id: 'massg2-q8',
    level: 1,
    questionTypeBadge: 'Mérlegfajták',
    question: 'Melyik mérlegre állsz rá, ha a saját tömegedet akarod tudni?',
    options: ['személymérlegre', 'konyhai mérlegre', 'kétkarú mérlegre', 'vonalzóra'],
    correctAnswer: 0,
    explanation: 'Az emberek tömegét személymérleggel mérjük. Ráállunk, és leolvassuk a kg-ot.'
  },
  {
    id: 'massg2-q9',
    level: 1,
    questionTypeBadge: 'Becslés',
    question: 'Melyik könnyebb 1 kg-nál?',
    options: ['egy alma', 'egy zsák krumpli', 'egy bicikli', 'egy nagy kutya'],
    correctAnswer: 0,
    explanation: 'Egy alma sokkal könnyebb 1 kg-nál. Kb. 5 alma lenne 1 kg.'
  },
  {
    id: 'massg2-q10',
    level: 1,
    questionTypeBadge: 'Mérleghinta',
    figure: <SeesawQ left={[{ name: 'Ádám', kg: 25 }]} right={[{ name: 'Kata', kg: 22, color: '#db2777' }]} />,
    question: 'Ádám és Kata mérleghintázik. Melyik oldal száll le?',
    options: ['Ádám oldala', 'Kata oldala', 'egyensúlyban marad'],
    correctAnswer: 0,
    explanation: '25 kg több, mint 22 kg. Ádám nehezebb, az ő oldala száll le.'
  },

  // ---- 2. szint ----
  {
    id: 'massg2-q11',
    level: 2,
    questionTypeBadge: 'Súlyok',
    figure: <BalQ left={[{ kind: 'pumpkin' }]} right={[w(5), w(2), w(1)]} />,
    question: 'A mérleg egyensúlyban van. Hány kg a tök?',
    options: ['8 kg', '7 kg', '3 kg', '6 kg'],
    correctAnswer: 0,
    explanation: '5 kg + 2 kg + 1 kg = 8 kg. A tök is 8 kg.'
  },
  {
    id: 'massg2-q12',
    level: 2,
    questionTypeBadge: 'Zsákok',
    figure: <SacksQ labels={['19 kg', '25 kg', '31 kg', '24 kg']} />,
    question: 'Melyik két zsák együtt pontosan 50 kg?',
    options: ['19 kg és 31 kg', '25 kg és 24 kg', '25 kg és 31 kg', '19 kg és 24 kg'],
    correctAnswer: 0,
    explanation: '19 + 31 = 50. (25 + 24 = 49, ez 1 kg-mal kevesebb!)'
  },
  {
    id: 'massg2-q13',
    level: 2,
    questionTypeBadge: 'Ládák',
    figure: <CratesQ n={4} each={5} />,
    question: 'Minden láda 5 kg. Hány kg-ot mutat a mérleg?',
    options: ['20 kg', '9 kg', '25 kg', '15 kg'],
    correctAnswer: 0,
    explanation: '4 láda, mindegyik 5 kg: 5 + 5 + 5 + 5 = 20 kg (4 · 5 = 20).'
  },
  {
    id: 'massg2-q14',
    level: 2,
    questionTypeBadge: 'Mérleghinta',
    figure: <SeesawQ left={[{ name: 'Lili', kg: 18, color: '#db2777' }, { name: 'Peti', kg: 20 }]} right={[{ name: 'Bea', kg: 35, color: '#16a34a' }]} />,
    question: 'Lili és Peti együtt ül az egyik oldalon, Bea a másikon. Melyik oldal száll le?',
    options: ['Lili és Peti oldala', 'Bea oldala', 'egyensúlyban marad'],
    correctAnswer: 0,
    explanation: '18 kg + 20 kg = 38 kg. A 38 több, mint 35, ezért Lili és Peti oldala száll le.'
  },
  {
    id: 'massg2-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó súly',
    figure: <BalQ left={[bag('7 kg')]} right={[w(3)]} tilt={-9} />,
    question: 'Hány kg-ot tegyünk még a jobb oldalra, hogy egyensúly legyen?',
    options: ['4 kg', '10 kg', '3 kg', '7 kg'],
    correctAnswer: 0,
    explanation: 'Bal oldalon 7 kg, jobbon 3 kg. 3 + 4 = 7, tehát még 4 kg kell.'
  },
  {
    id: 'massg2-q16',
    level: 2,
    questionTypeBadge: 'Különbség',
    figure: <KidsScalesQ />,
    question: 'Mennyivel nehezebb Bálint, mint Kata?',
    options: ['5 kg', '57 kg', '6 kg', '4 kg'],
    correctAnswer: 0,
    explanation: '31 − 26 = 5. Bálint 5 kg-mal nehezebb.'
  },
  {
    id: 'massg2-q17',
    level: 2,
    questionTypeBadge: 'Relációjel',
    question: 'Melyik jel kerül a ○ helyére? 45 kg ○ 54 kg',
    options: ['<', '>', '='],
    correctAnswer: 0,
    explanation: 'Nézd a tízeseket: 4 tízes kevesebb, mint 5 tízes. 45 kg < 54 kg.'
  },
  {
    id: 'massg2-q18',
    level: 2,
    questionTypeBadge: 'Mennyi maradt?',
    figure: <SackMinusQ />,
    question: 'A zsákban 50 kg krumpli volt. Elfogyott belőle 20 kg. Mennyi maradt?',
    options: ['30 kg', '70 kg', '20 kg', '40 kg'],
    correctAnswer: 0,
    explanation: 'Elfogyott, ezért kivonunk: 50 − 20 = 30 kg.'
  },
  {
    id: 'massg2-q19',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <BarChartQ />,
    question: 'A diagram a gyerekek tömegét mutatja. Hány kg Gergő?',
    options: ['25 kg', '20 kg', '30 kg', '35 kg'],
    correctAnswer: 0,
    explanation: 'Gergő oszlopa a 20 és a 30 között, pont középen ér véget. Ez 25 kg.'
  },
  {
    id: 'massg2-q20',
    level: 2,
    questionTypeBadge: 'Összeadás',
    figure: <BasketsQ />,
    question: 'Egy kosár alma 3 kg, egy kosár körte 4 kg. Mennyi a kettő együtt?',
    options: ['7 kg', '1 kg', '12 kg', '8 kg'],
    correctAnswer: 0,
    explanation: 'Együtt: 3 kg + 4 kg = 7 kg.'
  },

  // ---- 3. szint ----
  {
    id: 'massg2-q21',
    level: 3,
    questionTypeBadge: 'Egyforma tökök',
    figure: <BalQ left={[{ kind: 'pumpkin' }, { kind: 'pumpkin' }]} right={[w(10)]} />,
    question: 'Két egyforma tök egyensúlyban van a 10 kg-os súllyal. Hány kg egy tök?',
    options: ['5 kg', '10 kg', '20 kg', '8 kg'],
    correctAnswer: 0,
    explanation: 'A két tök együtt 10 kg. 5 + 5 = 10, tehát egy tök 5 kg.'
  },
  {
    id: 'massg2-q22',
    level: 3,
    questionTypeBadge: 'Gondolkodj!',
    figure: <TwoBalancesQ />,
    question: 'A labda nehezebb, mint a könyv. A könyv nehezebb, mint a ceruza. Melyik a legkönnyebb?',
    options: ['a ceruza', 'a labda', 'a könyv', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Labda > könyv > ceruza. A ceruza a legkönnyebb.'
  },
  {
    id: 'massg2-q23',
    level: 3,
    questionTypeBadge: 'Mérleghinta',
    figure: (
      <KidTagsQ
        kids={[
          { name: 'Zoé', kg: 24, c: '#db2777' },
          { name: 'Máté', kg: 27, c: '#2563eb' },
          { name: 'Nóra', kg: 24, c: '#16a34a' }
        ]}
      />
    ),
    question: 'Melyik két gyerek lenne egyensúlyban a mérleghintán?',
    options: ['Zoé és Nóra', 'Zoé és Máté', 'Máté és Nóra', 'egyik pár sem'],
    correctAnswer: 0,
    explanation: 'Egyensúly akkor van, ha ugyanannyi a tömegük. Zoé és Nóra is 24 kg.'
  },
  {
    id: 'massg2-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <ProgressQ />,
    question: 'A család 100 kg almát akar leszedni. Már 64 kg-ot leszedtek. Mennyi van még hátra?',
    options: ['36 kg', '46 kg', '164 kg', '34 kg'],
    correctAnswer: 0,
    explanation: '64 + 36 = 100, tehát még 36 kg van hátra (100 − 64 = 36).'
  },
  {
    id: 'massg2-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <MeatQ />,
    question: 'Az állatkerti tigris naponta 6 kg húst eszik. Mennyit eszik 5 nap alatt?',
    options: ['30 kg', '11 kg', '36 kg', '25 kg'],
    correctAnswer: 0,
    explanation: '5 napon át 6 kg: 5 · 6 = 30 kg.'
  },
  {
    id: 'massg2-q26',
    level: 3,
    questionTypeBadge: 'Három tag',
    question: 'A zsiráf egy nap alatt 40 kg levelet, 25 kg szénát és 8 kg zöldséget eszik. Mennyi ez összesen?',
    options: ['73 kg', '65 kg', '63 kg', '72 kg'],
    correctAnswer: 0,
    explanation: '40 + 25 = 65, és 65 + 8 = 73 kg.'
  },
  {
    id: 'massg2-q27',
    level: 3,
    questionTypeBadge: 'Melyik súlyok?',
    figure: <BalQ left={[bag('13 kg')]} right={[]} tilt={-10} />,
    question: 'Melyik súlyokkal lesz egyensúlyban a 13 kg-os zsák?',
    options: ['10 kg, 2 kg, 1 kg', '10 kg, 2 kg, 2 kg', '5 kg, 5 kg, 2 kg', '10 kg, 5 kg'],
    correctAnswer: 0,
    explanation: '10 + 2 + 1 = 13. A többi: 14 kg, 12 kg, 15 kg.'
  },
  {
    id: 'massg2-q28',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'A kisteherautón 45 kg és 38 kg áru van. Mennyi ez, és több-e 80 kg-nál?',
    options: ['83 kg, több', '73 kg, kevesebb', '80 kg, ugyanannyi', '77 kg, kevesebb'],
    correctAnswer: 0,
    explanation: '45 + 38 = 83 kg. A 83 több, mint 80.'
  },
  {
    id: 'massg2-q29',
    level: 3,
    questionTypeBadge: 'Súly mindkét oldalon',
    figure: <BalQ left={[Q, w(2)]} right={[w(5), w(5)]} />,
    question: 'A mérleg egyensúlyban van. Hány kg a ? doboz?',
    options: ['8 kg', '12 kg', '10 kg', '2 kg'],
    correctAnswer: 0,
    explanation: 'Jobb oldalon 5 + 5 = 10 kg. Bal oldalon ? + 2 = 10, tehát a doboz 8 kg.'
  },
  {
    id: 'massg2-q30',
    level: 3,
    questionTypeBadge: 'Igaz mondat',
    question: 'Melyik mondat igaz?',
    options: ['Egy 2. osztályos gyerek kb. 25 kg.', 'Egy alma kb. 5 kg.', 'Egy autó kb. 10 kg.', 'Egy cica kb. 80 kg.'],
    correctAnswer: 0,
    explanation: 'A 2. osztályosok kb. 20–30 kg-osak. Egy alma könnyebb 1 kg-nál, egy autó nagyon nehéz, egy cica pár kg.'
  }
];

export const MassG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="meresek"
      topicId="g2-meres-tomeg-quiz"
      subtopicId="tomeg-meres"
      title="2. A tömeg mérése – Kvíz"
      subtitle="30 feladat 3 szinten: nehezebb, könnyebb, egyensúly, kilogramm, mérlegek és szöveges feladatok."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • KVÍZ"
      questions={MASS_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'A kétkarú mérleg',
          items: ['A nehezebb oldal lemegy', 'Vízszintes kar = egyensúly', 'Egyensúly = egyforma nehezek', 'Mérleghintán is így van!']
        },
        {
          title: 'A kilogramm (kg)',
          items: ['A tömeg mértékegysége a kg', '1 kg = egy csomag liszt', '1 kg toll = 1 kg vas', 'Mindig írd ki: kg!']
        },
        {
          title: 'Számolás kg-mal',
          items: ['Súlyok összeadása: 5 kg + 2 kg = 7 kg', 'Hiányzó súly: 3 + □ = 7', 'Mennyivel nehezebb? Kivonás!', '4 láda, mind 5 kg: 4 · 5 = 20 kg']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MassG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <MassG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default MassG2Quiz;
