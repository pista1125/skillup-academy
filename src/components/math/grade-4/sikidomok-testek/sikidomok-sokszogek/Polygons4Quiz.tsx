import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Polygons4Matcher } from './Polygons4Matcher';
import { Polygons4Sorter } from './Polygons4Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';
type P = [number, number];

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const pts = (p: P[]) => p.map((q) => q.join(',')).join(' ');

/** Négyzetrács; a gyerekek rácskoordinátában (u egység) rajzolnak */
const GridFig: React.FC<{ cols: number; rows: number; u?: number; children: React.ReactNode; label?: string; h?: number }> = ({
  cols,
  rows,
  u = 16,
  children,
  label,
  h = 150
}) => {
  const x0 = (240 - cols * u) / 2;
  const y0 = 10;
  return (
    <QFig h={h}>
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + rows * u} stroke="#e2e8f0" />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + cols * u} y2={y0 + i * u} stroke="#e2e8f0" />
      ))}
      <g transform={`translate(${x0} ${y0}) scale(${u})`}>{children}</g>
      {label && (
        <text x="120" y={h - 10} textAnchor="middle" fontSize="13" fontWeight="bold" fill={label.includes('?') ? UNK : '#0f172a'}>
          {label}
        </text>
      )}
    </QFig>
  );
};

const GPoly: React.FC<{ p: P[]; fill?: string; stroke?: string }> = ({ p, fill = '#a7f3d0', stroke = '#065f46' }) => (
  <polygon points={pts(p)} fill={fill} stroke={stroke} strokeWidth={0.12} strokeLinejoin="round" />
);

const regular = (n: number, cx: number, cy: number, r: number, rot = 0): P[] =>
  Array.from({ length: n }, (_, i) => {
    const t = -Math.PI / 2 + rot + (i * 2 * Math.PI) / n;
    return [Math.round((cx + r * Math.cos(t)) * 10) / 10, Math.round((cy + r * Math.sin(t)) * 10) / 10] as P;
  });

const Lbl: React.FC<{ x: number; y: number; t: string; c?: string }> = ({ x, y, t, c = '#0f172a' }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="13" fontWeight="bold" fill={c}>
    {t}
  </text>
);

const ShapesABCD: React.FC = () => (
  <QFig h={130}>
    <polygon points="20,95 45,35 70,95" fill="#fcd34d" stroke="#92400e" strokeWidth="1.5" />
    <circle cx="100" cy="65" r="28" fill="#93c5fd" stroke="#1e40af" strokeWidth="1.5" />
    <polygon points={pts(regular(5, 158, 68, 30))} fill="#fca5a5" stroke="#991b1b" strokeWidth="1.5" />
    <rect x="195" y="45" width="34" height="46" fill="#a7f3d0" stroke="#065f46" strokeWidth="1.5" />
    <Lbl x={45} y={118} t="A" />
    <Lbl x={100} y={118} t="B" />
    <Lbl x={158} y={118} t="C" />
    <Lbl x={212} y={118} t="D" />
  </QFig>
);

const HexagonFig: React.FC<{ label?: string; dot?: boolean }> = ({ label = 'Csúcsok száma = ?', dot = false }) => {
  const h = regular(6, 120, 68, 50, Math.PI / 6);
  return (
    <QFig>
      <polygon points={pts(h)} fill="#fed7aa" stroke="#9a3412" strokeWidth="2" />
      {!dot && h.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#9a3412" />)}
      <Lbl x={120} y={140} t={label} c={UNK} />
    </QFig>
  );
};

const MixedShapesFig: React.FC = () => (
  <QFig h={140}>
    <polygon points="15,60 40,15 60,60" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" />
    <rect x="75" y="20" width="40" height="35" fill="#bfdbfe" stroke="#1e40af" strokeWidth="1.5" />
    <circle cx="150" cy="38" r="20" fill="#fbcfe8" stroke="#9d174d" strokeWidth="1.5" />
    <polygon points="185,60 225,60 190,18" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" />
    <polygon points={pts(regular(5, 45, 98, 22))} fill="#fca5a5" stroke="#991b1b" strokeWidth="1.5" />
    <polygon points="90,120 110,78 150,90 140,120" fill="#bfdbfe" stroke="#1e40af" strokeWidth="1.5" />
    <polygon points="170,120 225,120 195,80" fill="#fde68a" stroke="#92400e" strokeWidth="1.5" />
    <text x="120" y="136" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Hány háromszög?</text>
  </QFig>
);

const ThreeAnglesFig: React.FC = () => (
  <QFig h={130}>
    <line x1="15" y1="95" x2="70" y2="95" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
    <line x1="15" y1="95" x2="60" y2="45" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
    <line x1="95" y1="95" x2="150" y2="95" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    <line x1="95" y1="95" x2="95" y2="35" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" />
    <line x1="185" y1="95" x2="230" y2="95" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
    <line x1="185" y1="95" x2="160" y2="40" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
    <Lbl x={40} y={118} t="A" />
    <Lbl x={120} y={118} t="B" />
    <Lbl x={195} y={118} t="C" />
  </QFig>
);

const Clock: React.FC<{ cx: number; cy: number; h: number; m: number; label: string }> = ({ cx, cy, h, m, label }) => {
  const r = 24;
  const ha = ((h % 12) + m / 60) * 30;
  const ma = m * 6;
  const hand = (deg: number, len: number) => [cx + len * Math.sin((deg * Math.PI) / 180), cy - len * Math.cos((deg * Math.PI) / 180)];
  const [hx, hy] = hand(ha, 13);
  const [mx, my] = hand(ma, 20);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => {
        const [x1, y1] = hand(i * 30, r - 2);
        const [x2, y2] = hand(i * 30, r - 6);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" strokeWidth="1.2" />;
      })}
      <line x1={cx} y1={cy} x2={hx} y2={hy} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="2.5" fill="#0f172a" />
      <text x={cx} y={cy + 40} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
        {label}
      </text>
    </g>
  );
};

const FourClocksFig: React.FC = () => (
  <QFig h={110}>
    <Clock cx={32} cy={45} h={6} m={0} label="6:00" />
    <Clock cx={90} cy={45} h={3} m={0} label="3:00" />
    <Clock cx={150} cy={45} h={4} m={10} label="4:10" />
    <Clock cx={208} cy={45} h={8} m={10} label="8:10" />
  </QFig>
);

const SegmentPairsFig: React.FC = () => (
  <QFig h={130}>
    <line x1="15" y1="30" x2="70" y2="90" stroke="#7c3aed" strokeWidth="3" />
    <line x1="15" y1="90" x2="70" y2="30" stroke="#7c3aed" strokeWidth="3" />
    <line x1="95" y1="40" x2="150" y2="25" stroke="#0891b2" strokeWidth="3" />
    <line x1="95" y1="85" x2="150" y2="70" stroke="#0891b2" strokeWidth="3" />
    <line x1="175" y1="40" x2="230" y2="25" stroke="#ea580c" strokeWidth="3" />
    <line x1="175" y1="80" x2="230" y2="95" stroke="#ea580c" strokeWidth="3" />
    <Lbl x={42} y={118} t="A" />
    <Lbl x={122} y={118} t="B" />
    <Lbl x={202} y={118} t="C" />
  </QFig>
);

const L_SHAPE: P[] = [
  [3, 1],
  [5, 1],
  [5, 5],
  [10, 5],
  [10, 7],
  [3, 7]
];

const FourShapesDentFig: React.FC = () => (
  <QFig h={130}>
    <rect x="15" y="40" width="40" height="50" fill="#bae6fd" stroke="#0369a1" strokeWidth="1.5" />
    <polygon points={pts(regular(6, 100, 65, 26))} fill="#bae6fd" stroke="#0369a1" strokeWidth="1.5" />
    <polygon points="140,40 195,65 140,90 158,65" fill="#bae6fd" stroke="#0369a1" strokeWidth="1.5" />
    <polygon points="205,90 215,40 232,90" fill="#bae6fd" stroke="#0369a1" strokeWidth="1.5" />
    <Lbl x={35} y={118} t="A" />
    <Lbl x={100} y={118} t="B" />
    <Lbl x={160} y={118} t="C" />
    <Lbl x={218} y={118} t="D" />
  </QFig>
);

const DiagFromVertexFig: React.FC<{ n: number; rot?: number; label: string }> = ({ n, rot = 0, label }) => {
  const p = regular(n, 120, 68, 52, rot);
  return (
    <QFig>
      <polygon points={pts(p)} fill="#ecfccb" stroke="#3f6212" strokeWidth="2" />
      <circle cx={p[0][0]} cy={p[0][1]} r="5" fill={UNK} />
      <Lbl x={120} y={142} t={label} c={UNK} />
    </QFig>
  );
};

const RoomFig: React.FC = () => (
  <QFig h={160}>
    <rect x="50" y="25" width="110" height="110" fill="#f1f5f9" stroke="#334155" strokeWidth="2.5" />
    <circle cx="142" cy="43" r="10" fill="#fca5a5" stroke="#991b1b" />
    <text x="68" y="49" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    <text x="68" y="124" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    <text x="142" y="124" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    <g transform="translate(205 70)">
      <line x1="0" y1="-25" x2="0" y2="25" stroke="#475569" strokeWidth="1.5" />
      <line x1="-20" y1="0" x2="20" y2="0" stroke="#475569" strokeWidth="1.5" />
      <text x="0" y="-30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">É</text>
      <text x="0" y="38" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">D</text>
      <text x="-27" y="4" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">Ny</text>
      <text x="26" y="4" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">K</text>
    </g>
    <text x="105" y="152" textAnchor="middle" fontSize="11" fill="#334155">kör: északkeleti sarok</text>
  </QFig>
);

const BoxShapesFig: React.FC = () => (
  <QFig h={100}>
    <rect x="10" y="30" width="44" height="30" fill="#22c55e" stroke="#14532d" />
    <rect x="66" y="30" width="30" height="30" fill="#fb923c" stroke="#7c2d12" />
    <polygon points={pts(regular(6, 125, 45, 17, Math.PI / 6))} fill="#ef4444" stroke="#7f1d1d" />
    <circle cx="168" cy="45" r="16" fill="#facc15" stroke="#713f12" />
    <polygon points="192,30 232,30 224,60 200,60" fill="#3b82f6" stroke="#1e3a8a" />
    <text x="120" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>3 síkidomot húzunk ki.</text>
  </QFig>
);

const SticksRectFig: React.FC = () => {
  const stick = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d97706" strokeWidth="5" strokeLinecap="round" />
    </g>
  );
  const s: React.ReactNode[] = [];
  for (let i = 0; i < 3; i++) {
    s.push(stick(60 + i * 40 + 3, 25, 60 + (i + 1) * 40 - 3, 25, `t${i}`));
    s.push(stick(60 + i * 40 + 3, 105, 60 + (i + 1) * 40 - 3, 105, `b${i}`));
  }
  for (let i = 0; i < 2; i++) {
    s.push(stick(60, 25 + i * 40 + 3, 60, 25 + (i + 1) * 40 - 3, `l${i}`));
    s.push(stick(180, 25 + i * 40 + 3, 180, 25 + (i + 1) * 40 - 3, `r${i}`));
  }
  return (
    <QFig h={140}>
      {s}
      <text x="120" y="130" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>Hány pálcika kell?</text>
    </QFig>
  );
};

const CutSquareFig: React.FC = () => (
  <QFig h={140}>
    <rect x="70" y="20" width="100" height="100" fill="#ddd6fe" stroke="#5b21b6" strokeWidth="2" />
    <line x1="70" y1="120" x2="170" y2="20" stroke={UNK} strokeWidth="2.5" strokeDasharray="6 4" />
    <text x="200" y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>vágás</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const POLYGONS4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'p4-q1',
    level: 1,
    questionTypeBadge: 'Sokszög',
    figure: <ShapesABCD />,
    question: 'Melyik síkidom NEM sokszög?',
    options: ['B – a kör', 'A – a háromszög', 'C – az ötszög', 'D – a téglalap'],
    correctAnswer: 0,
    explanation: 'A sokszöget csak egyenes szakaszok határolják. A kört görbe vonal határolja, ezért síkidom, de nem sokszög.'
  },
  {
    id: 'p4-q2',
    level: 1,
    questionTypeBadge: 'Oldalak',
    question: 'Hány oldala van az ötszögnek?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'Az ötszögnek 5 csúcsa és 5 oldala van. A sokszögnek mindig ugyanannyi oldala van, ahány csúcsa.'
  },
  {
    id: 'p4-q3',
    level: 1,
    questionTypeBadge: 'Csúcsok',
    figure: <HexagonFig />,
    question: 'Hány csúcsa van ennek a sokszögnek?',
    options: ['6', '5', '7', '12'],
    correctAnswer: 0,
    explanation: 'Számold meg a pöttyöket körbe: 6 csúcs. Ez egy hatszög.'
  },
  {
    id: 'p4-q4',
    level: 1,
    questionTypeBadge: 'Válogatás',
    figure: <MixedShapesFig />,
    question: 'Hány háromszöget látsz a képen?',
    options: ['3', '2', '4', '5'],
    correctAnswer: 0,
    explanation: 'Azokat keresd, amelyeknek pontosan 3 csúcsa van: bal felül, jobb felül és jobb alul van egy-egy. Összesen 3 háromszög.'
  },
  {
    id: 'p4-q5',
    level: 1,
    questionTypeBadge: 'Téglalap',
    question: 'Melyik mondat illik a téglalapra?',
    options: [
      'Olyan négyszög, amelynek minden szöge derékszög.',
      'Olyan háromszög, amelynek van egy derékszöge.',
      'Olyan négyszög, amelynek nincs derékszöge.',
      'Olyan síkidom, amelyet görbe vonal határol.'
    ],
    correctAnswer: 0,
    explanation: 'A tankönyv szerint: a téglalap olyan négyszög, amelynek minden szöge derékszög.'
  },
  {
    id: 'p4-q6',
    level: 1,
    questionTypeBadge: 'Derékszög',
    figure: <ThreeAnglesFig />,
    question: 'Melyik szög derékszög?',
    options: ['B', 'A', 'C', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'A B szög szárai úgy állnak, mint a füzetlap sarka: ez derékszög. Az A kisebb, a C nagyobb a derékszögnél.'
  },
  {
    id: 'p4-q7',
    level: 1,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Melyik állítás IGAZ?',
    options: ['Minden sokszög síkidom.', 'Minden síkidom sokszög.', 'A háromszög nem sokszög.', 'Van olyan sokszög, amelyet görbe vonal határol.'],
    correctAnswer: 0,
    explanation: 'Minden sokszög síkidom. Fordítva nem igaz: a kör síkidom, de nem sokszög. A háromszög is sokszög.'
  },
  {
    id: 'p4-q8',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <FourClocksFig />,
    question: 'Melyik időpontban zár be derékszöget az óra kis- és nagymutatója?',
    options: ['3 órakor', '6 órakor', '4:10-kor', '8:10-kor'],
    correctAnswer: 0,
    explanation: '3 órakor a nagymutató a 12-esen, a kismutató a 3-ason áll: derékszöget zárnak be. 6 órakor egy egyenesbe esnek.'
  },
  {
    id: 'p4-q9',
    level: 1,
    questionTypeBadge: 'Párhuzamos',
    figure: <SegmentPairsFig />,
    question: 'Melyik képen párhuzamos a két szakasz?',
    options: ['B', 'A', 'C', 'mindhárom képen'],
    correctAnswer: 0,
    explanation: 'A B képen a két szakasz egyforma irányba megy, mindenhol ugyanolyan messze vannak egymástól. Az A-n keresztezik egymást, a C-n szétnyílnak.'
  },
  {
    id: 'p4-q10',
    level: 1,
    questionTypeBadge: 'Csúcsok',
    figure: (
      <GridFig cols={13} rows={8} label="Csúcsok száma = ?">
        <GPoly p={L_SHAPE} fill="#fde68a" stroke="#92400e" />
      </GridFig>
    ),
    question: 'Hány csúcsa van az L alakú sokszögnek?',
    options: ['6', '4', '5', '8'],
    correctAnswer: 0,
    explanation: 'Járd körbe a sokszöget, és számold a töréspontokat: 6 csúcs, tehát ez egy hatszög.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'p4-q11',
    level: 2,
    questionTypeBadge: 'Négyzet',
    question: 'Melyik állítás igaz?',
    options: [
      'Minden négyzet téglalap.',
      'Minden téglalap négyzet.',
      'A négyzetnek csak 2 derékszöge van.',
      'A négyzet szemközti oldalai nem párhuzamosak.'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet olyan téglalap, amelynek minden oldala egyenlő hosszú – tehát minden négyzet téglalap. De egy 5 · 3-as téglalap nem négyzet.'
  },
  {
    id: 'p4-q12',
    level: 2,
    questionTypeBadge: 'Derékszögek',
    figure: (
      <GridFig cols={10} rows={6} label="Derékszögek száma = ?">
        <GPoly
          p={[
            [2, 1],
            [6, 1],
            [8, 4],
            [2, 4]
          ]}
          fill="#bfdbfe"
          stroke="#1e3a8a"
        />
      </GridFig>
    ),
    question: 'Hány derékszöge van ennek a négyszögnek?',
    options: ['2', '1', '3', '4'],
    correctAnswer: 0,
    explanation: 'A bal oldali két sarok derékszög (a rácsvonalak mentén fut a két oldal). A jobb oldali ferde oldalnál az egyik szög kisebb, a másik nagyobb a derékszögnél.'
  },
  {
    id: 'p4-q13',
    level: 2,
    questionTypeBadge: 'Átló',
    figure: <DiagFromVertexFig n={5} label="Átlók a piros csúcsból = ?" />,
    question: 'Hány átló húzható az ötszög piros csúcsából?',
    options: ['2', '3', '5', '1'],
    correctAnswer: 0,
    explanation: 'A piros csúcsot nem kötheted össze önmagával és a 2 szomszédjával. 5 − 3 = 2 csúcs marad, így 2 átló húzható.'
  },
  {
    id: 'p4-q14',
    level: 2,
    questionTypeBadge: 'Átló',
    figure: (
      <QFig h={130}>
        <rect x="50" y="25" width="140" height="80" fill="#fff" stroke="#334155" strokeWidth="2" />
        <Lbl x={42} y={22} t="D" />
        <Lbl x={198} y={22} t="C" />
        <Lbl x={42} y={120} t="A" />
        <Lbl x={198} y={120} t="B" />
        <text x="120" y="70" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    ),
    question: 'Hány átlója van az ABCD téglalapnak?',
    options: ['2', '4', '1', '0'],
    correctAnswer: 0,
    explanation: 'Az átló a szemközti csúcsokat köti össze: A-t C-vel és B-t D-vel. Ez 2 átló. (Az AB, BC, CD, DA oldalak.)'
  },
  {
    id: 'p4-q15',
    level: 2,
    questionTypeBadge: 'Átló',
    question: 'Hány átlója van a háromszögnek?',
    options: ['0, mert minden csúcsa szomszédos', '3, mert 3 csúcsa van', '1', '6'],
    correctAnswer: 0,
    explanation: 'A háromszög bármelyik két csúcsa szomszédos, ezeket oldal köti össze. Ezért a háromszögnek nincs átlója.'
  },
  {
    id: 'p4-q16',
    level: 2,
    questionTypeBadge: 'Beugró rész',
    figure: <FourShapesDentFig />,
    question: 'Melyik sokszögnek van beugró része?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A nyílhegy alakú C sokszög egyik sarka befelé mutat – ez a beugró rész. A többi sokszög minden sarka kifelé mutat.'
  },
  {
    id: 'p4-q17',
    level: 2,
    questionTypeBadge: 'Téglalap rajzolása',
    figure: (
      <GridFig cols={10} rows={7}>
        <polyline points="2,1 7,1 7,4" fill="none" stroke="#1e3a8a" strokeWidth={0.15} />
        {(
          [
            [2, 1],
            [7, 1],
            [7, 4]
          ] as P[]
        ).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={0.25} fill="#1e3a8a" />
        ))}
        {(
          [
            [2, 4, 'P'],
            [4, 4, 'Q'],
            [2, 6, 'R'],
            [0, 3, 'S']
          ] as [number, number, string][]
        ).map(([x, y, t]) => (
          <g key={t}>
            <circle cx={x} cy={y} r={0.25} fill={UNK} />
            <text x={x + 0.35} y={y + 0.7} fontSize={0.8} fontWeight="bold" fill={UNK}>
              {t}
            </text>
          </g>
        ))}
      </GridFig>
    ),
    question: 'A téglalap két oldalát már megrajzoltuk. Melyik pont legyen a téglalap negyedik csúcsa?',
    options: ['P', 'Q', 'R', 'S'],
    correctAnswer: 0,
    explanation: 'A téglalap szemközti oldalai egyenlő hosszúak. A felső oldal 5 egység, ezért az alsó is 5 egység: a jobb alsó csúcstól 5-öt lépünk balra, és a P pontba érünk. Ott a bal oldal 3 egység, mint a jobb, és minden szög derékszög.'
  },
  {
    id: 'p4-q18',
    level: 2,
    questionTypeBadge: 'Tulajdonságok',
    question:
      'Melyik síkidomra igaz mind a négy állítás? • Sokszög. • Szemben lévő oldalai egyenlő hosszúak. • Két-két szemben lévő oldala párhuzamos. • Szomszédos oldalai nem egyenlő hosszúak.',
    options: ['a téglalapra, amely nem négyzet', 'a négyzetre', 'a körre', 'a háromszögre'],
    correctAnswer: 0,
    explanation: 'A négyzet szomszédos oldalai egyenlők, a kör nem sokszög, a háromszögnek nincs szemközti oldalpárja. A „hosszúkás” téglalapra mind a négy igaz.'
  },
  {
    id: 'p4-q19',
    level: 2,
    questionTypeBadge: 'Derékszögek',
    figure: (
      <GridFig cols={13} rows={8} label="Derékszögek száma = ?">
        <GPoly p={L_SHAPE} fill="#fde68a" stroke="#92400e" />
      </GridFig>
    ),
    question: 'Az L alakú hatszögnek 6 szöge van. Hány közülük derékszög?',
    options: ['5', '6', '4', '3'],
    correctAnswer: 0,
    explanation: 'A 6 sarokból 5 kifelé mutat, ezek derékszögek. A beugró sarok belső szöge nagyobb a derékszögnél, ezért az nem derékszög.'
  },
  {
    id: 'p4-q20',
    level: 2,
    questionTypeBadge: 'Négyszög',
    figure: (
      <GridFig cols={10} rows={6} label="Mi a neve?">
        <GPoly
          p={[
            [2, 4],
            [6, 4],
            [8, 1],
            [4, 1]
          ]}
          fill="#fbcfe8"
          stroke="#9d174d"
        />
      </GridFig>
    ),
    question: 'Mi a legpontosabb neve ennek a sokszögnek?',
    options: ['négyszög, de nem téglalap', 'téglalap', 'négyzet', 'ötszög'],
    correctAnswer: 0,
    explanation: 'Négy csúcsa van, tehát négyszög. A szögei közül egyik sem derékszög, ezért nem téglalap (és nem is négyzet).'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'p4-q21',
    level: 3,
    questionTypeBadge: 'Összes átló',
    figure: <HexagonFig label="Összes átló = ?" dot />,
    question: 'Hány átlója van összesen a hatszögnek?',
    options: ['9', '6', '18', '3'],
    correctAnswer: 0,
    explanation: 'Egy csúcsból 6 − 3 = 3 átló húzható. 6 csúcs · 3 = 18, de így minden átlót kétszer számoltunk (mindkét végéről): 18 : 2 = 9.'
  },
  {
    id: 'p4-q22',
    level: 3,
    questionTypeBadge: 'Összes átló',
    figure: (
      <QFig>
        <polygon points={pts(regular(5, 120, 70, 52))} fill="#ecfccb" stroke="#3f6212" strokeWidth="2" />
        <Lbl x={120} y={142} t="Összes átló = ?" c={UNK} />
      </QFig>
    ),
    question: 'Hány átlója van összesen az ötszögnek?',
    options: ['5', '10', '2', '3'],
    correctAnswer: 0,
    explanation: 'Egy csúcsból 2 átló húzható. 5 · 2 = 10, de minden átlót kétszer számoltunk: 10 : 2 = 5. Rajzold meg: egy csillag lesz belőle!'
  },
  {
    id: 'p4-q23',
    level: 3,
    questionTypeBadge: 'Átló',
    figure: <DiagFromVertexFig n={8} rot={Math.PI / 8} label="Átlók a piros csúcsból = ?" />,
    question: 'Hány átló húzható a nyolcszög piros csúcsából?',
    options: ['5', '6', '8', '3'],
    correctAnswer: 0,
    explanation: 'A nyolcszögnek 8 csúcsa van. Önmagát és a 2 szomszédját nem kötheted össze vele: 8 − 3 = 5 átló.'
  },
  {
    id: 'p4-q24',
    level: 3,
    questionTypeBadge: 'Tájékozódás',
    figure: <RoomFig />,
    question:
      'A négyzet alakú szoba négy sarkában van egy háromszög, egy kör, egy négyzet és egy téglalap. A kör az északkeleti sarokban van, a háromszög tőle a legmesszebb. A körtől délre van a négyzet. A téglalap a háromszögtől északra van. Hol van a téglalap?',
    options: ['az északnyugati sarokban', 'a délnyugati sarokban', 'a délkeleti sarokban', 'az északkeleti sarokban'],
    correctAnswer: 0,
    explanation: 'A körtől legmesszebb a szemközti sarok van: a háromszög délnyugaton. A négyzet a kör alatt: délkeleten. A háromszög fölött, északnyugaton marad a téglalap.'
  },
  {
    id: 'p4-q25',
    level: 3,
    questionTypeBadge: 'Biztos vagy lehetetlen',
    figure: <BoxShapesFig />,
    question: 'A dobozban ez az 5 síkidom van. Becsukott szemmel kihúzunk 3-at. Milyen az az esemény, hogy „mindegyik kihúzott síkidom sokszög”?',
    options: ['lehet, de nem biztos', 'biztos', 'lehetetlen'],
    correctAnswer: 0,
    explanation: 'Egy síkidom, a kör nem sokszög. Ha nem húzzuk ki a kört, mind a 3 sokszög lesz; ha kihúzzuk, nem. Ezért lehet, de nem biztos.'
  },
  {
    id: 'p4-q26',
    level: 3,
    questionTypeBadge: 'Óra',
    question: 'Melyik két egész órakor zár be derékszöget az óra kis- és nagymutatója?',
    options: ['3 órakor és 9 órakor', '6 órakor és 12 órakor', '3 órakor és 6 órakor', '9 órakor és 12 órakor'],
    correctAnswer: 0,
    explanation: 'Egész órakor a nagymutató a 12-esen áll. A kismutató a 3-ason vagy a 9-esen áll derékszögben vele. 6 órakor egy egyenesbe esnek, 12 órakor egymáson vannak.'
  },
  {
    id: 'p4-q27',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksRectFig />,
    question: 'Számolópálcikákból téglalapot raktunk ki. A hosszabb oldala 3, a rövidebb 2 pálcika. Hány pálcikát használtunk?',
    options: ['10', '5', '6', '12'],
    correctAnswer: 0,
    explanation: 'A téglalap szemközti oldalai egyenlők: 3 + 2 + 3 + 2 = 10 pálcika. (Az 5 csak két oldal, a 6 a 3 · 2 szorzat.)'
  },
  {
    id: 'p4-q28',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    question: 'Bence 12 egyforma számolópálcikából négyzetet rakott ki, mindet felhasználta. Hány pálcika van a négyzet egy oldalán?',
    options: ['3', '4', '6', '2'],
    correctAnswer: 0,
    explanation: 'A négyzet 4 oldala egyenlő hosszú: 12 : 4 = 3 pálcika jut egy oldalra.'
  },
  {
    id: 'p4-q29',
    level: 3,
    questionTypeBadge: 'Vágás',
    figure: <CutSquareFig />,
    question: 'Egy négyzet alakú lapot az egyik átlója mentén kettévágunk. Mit kapunk?',
    options: [
      '2 háromszöget, mindkettőnek 1 derékszöge van',
      '2 téglalapot',
      '2 kisebb négyzetet',
      '2 háromszöget, egyiknek sincs derékszöge'
    ],
    correctAnswer: 0,
    explanation: 'Az átló két szemközti csúcsot köt össze, így 2 háromszög keletkezik. Mindkettőben megmarad a négyzet egy-egy sarka, ami derékszög.'
  },
  {
    id: 'p4-q30',
    level: 3,
    questionTypeBadge: 'Beugró rész',
    figure: (
      <GridFig cols={10} rows={7} label="Melyik igaz rá?">
        <GPoly
          p={[
            [2, 1],
            [8, 1],
            [8, 6],
            [5, 3],
            [2, 6]
          ]}
          fill="#c7d2fe"
          stroke="#3730a3"
        />
      </GridFig>
    ),
    question: 'Melyik igaz erre a sokszögre?',
    options: ['ötszög, és van beugró része', 'négyszög, és van beugró része', 'ötszög, és nincs beugró része', 'hatszög, és nincs beugró része'],
    correctAnswer: 0,
    explanation: 'Számold meg a csúcsokat: 5, tehát ötszög. Az alsó középső csúcs befelé mutat, ezért van beugró része.'
  }
];

export const Polygons4Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="sikidomok-testek"
      topicId="g4-geom-sokszogek-quiz"
      subtopicId="sikidomok-sokszogek"
      title="1. Síkidomok, sokszögek – Kvíz"
      subtitle="30 feladat 3 szinten: sokszögek felismerése, csúcsok és oldalak, párhuzamos szakaszok, derékszögek, téglalap és négyzet, átlók."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={POLYGONS4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Síkidom és sokszög',
          items: [
            'Síkidom: egyenes vagy görbe vonal is határolhatja.',
            'Sokszög: csak egyenes szakaszok határolják.',
            'Ahány csúcs, annyi oldal: háromszög 3, négyszög 4, ötszög 5, hatszög 6.',
            'A kör síkidom, de nem sokszög.'
          ]
        },
        {
          title: 'Téglalap és négyzet',
          items: [
            'Téglalap: minden szöge derékszög.',
            'Négyzet: olyan téglalap, amelynek minden oldala egyenlő.',
            'Minden négyzet téglalap, de nem minden téglalap négyzet.',
            'A téglalap szemközti oldalai párhuzamosak és egyenlők.'
          ]
        },
        {
          title: 'Átlók',
          items: [
            'Átló: két nem szomszédos csúcsot köt össze.',
            'Egy csúcsból: csúcsok száma − 3.',
            'Háromszög 0, négyszög 2, ötszög 5, hatszög 9 átló.',
            'Derékszög jele: negyedkörív ponttal.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Polygons4Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <Polygons4Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default Polygons4Quiz;
