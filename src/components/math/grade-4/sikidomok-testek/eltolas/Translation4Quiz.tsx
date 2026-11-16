import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Translation4Matcher } from './Translation4Matcher';
import { Translation4Sorter } from './Translation4Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált). Észak mindig felfelé.
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const T: React.FC<{ x: number; y: number; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  x,
  y,
  t,
  size = 12,
  color,
  anchor = 'middle'
}) => (
  <text x={x} y={y} fontSize={size} fontWeight="bold" textAnchor={anchor} fill={t.includes('?') ? UNK : color ?? '#0f172a'}>
    {t}
  </text>
);

const Grid: React.FC<{ x0: number; y0: number; cols: number; rows: number; u: number }> = ({ x0, y0, cols, rows, u }) => (
  <g>
    {Array.from({ length: cols + 1 }, (_, i) => (
      <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + rows * u} stroke="#e2e8f0" />
    ))}
    {Array.from({ length: rows + 1 }, (_, i) => (
      <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + cols * u} y2={y0 + i * u} stroke="#e2e8f0" />
    ))}
  </g>
);

const North: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g>
    <line x1={x} y1={y + 14} x2={x} y2={y} stroke={UNK} strokeWidth="2" />
    <polygon points={`${x},${y - 4} ${x - 4},${y + 4} ${x + 4},${y + 4}`} fill={UNK} />
    <text x={x} y={y + 26} textAnchor="middle" fontSize="10" fontWeight="bold" fill={UNK}>
      É
    </text>
  </g>
);

const Arr: React.FC<{ x1: number; y1: number; x2: number; y2: number; color?: string; w?: number; dash?: boolean }> = ({
  x1,
  y1,
  x2,
  y2,
  color = '#2563eb',
  w = 2.5,
  dash
}) => {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const h = 8;
  const p1 = [x2 - h * Math.cos(a - 0.45), y2 - h * Math.sin(a - 0.45)];
  const p2 = [x2 - h * Math.cos(a + 0.45), y2 - h * Math.sin(a + 0.45)];
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeDasharray={dash ? '4 3' : undefined} />
      <polygon points={`${x2},${y2} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`} fill={color} />
    </g>
  );
};

type Cell = [number, number];
const Cells: React.FC<{ cells: Cell[]; x0: number; y0: number; u: number; dx?: number; dy?: number; fill?: string; stroke?: string; dash?: boolean }> = ({
  cells,
  x0,
  y0,
  u,
  dx = 0,
  dy = 0,
  fill = '#fdba74',
  stroke = '#9a3412',
  dash
}) => (
  <g>
    {cells.map(([c, r]) => (
      <rect
        key={`${c}-${r}`}
        x={x0 + (c + dx) * u}
        y={y0 + (r + dy) * u}
        width={u}
        height={u}
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray={dash ? '3 2' : undefined}
      />
    ))}
  </g>
);

const Dot: React.FC<{ x: number; y: number; l: string; color?: string; lx?: number; ly?: number }> = ({ x, y, l, color = '#1d4ed8', lx = 7, ly = -6 }) => (
  <g>
    <circle cx={x} cy={y} r="5" fill={color} />
    <text x={x + lx} y={y + ly} fontSize="11" fontWeight="bold" fill={color}>
      {l}
    </text>
  </g>
);

/** Mini iránytű: a megadott szögnél „?” jelenik meg. */
const CompassQ: React.FC<{ qAngle: number }> = ({ qAngle }) => {
  const c = { x: 120, y: 75 };
  const rad = (d: number) => (d * Math.PI) / 180;
  const labels: { a: number; t: string }[] = [
    { a: -90, t: 'É' },
    { a: 0, t: 'K' },
    { a: 90, t: 'D' },
    { a: 180, t: 'NY' },
    { a: -45, t: 'ÉK' },
    { a: 45, t: 'DK' },
    { a: 135, t: 'DNY' },
    { a: -135, t: 'ÉNY' }
  ];
  return (
    <QFig>
      <circle cx={c.x} cy={c.y} r="44" fill="#ffffff" stroke="#93c5fd" strokeWidth="2" />
      {labels.map((l) => {
        const main = l.a % 90 === 0;
        const x2 = c.x + (main ? 40 : 30) * Math.cos(rad(l.a));
        const y2 = c.y + (main ? 40 : 30) * Math.sin(rad(l.a));
        const isQ = l.a === qAngle;
        return (
          <g key={l.t}>
            <line x1={c.x} y1={c.y} x2={x2} y2={y2} stroke={isQ ? UNK : main ? '#475569' : '#94a3b8'} strokeWidth={isQ ? 4 : main ? 3 : 2} />
            <T x={c.x + 58 * Math.cos(rad(l.a))} y={c.y + 58 * Math.sin(rad(l.a)) + 4} t={isQ ? '?' : l.t} size={isQ ? 15 : 11} />
          </g>
        );
      })}
      <circle cx={c.x} cy={c.y} r="4" fill="#0f172a" />
    </QFig>
  );
};

// --- Ábrák ---
const FLAG: Cell[] = [[0, 0], [1, 0], [0, 1], [0, 2], [0, 3]];

const FIG_COMPASS_K = <CompassQ qAngle={0} />;
const FIG_COMPASS_EK = <CompassQ qAngle={-45} />;

const FIG_SHIFT_K5 = (
  <QFig>
    <Grid x0={20} y0={20} cols={10} rows={6} u={18} />
    <Cells cells={FLAG} x0={20} y0={20} u={18} dx={1} dy={1} fill="#fed7aa" />
    <Cells cells={FLAG} x0={20} y0={20} u={18} dx={6} dy={1} />
    <North x={222} y={30} />
    <T x={120} y={142} t="Hány négyzettel keletre?" size={11} />
  </QFig>
);

const FIG_DOT_UP3 = (
  <QFig>
    <Grid x0={30} y0={15} cols={8} rows={6} u={18} />
    <Dot x={30 + 3 * 18} y={15 + 5 * 18} l="eredeti" color="#64748b" />
    <Dot x={30 + 3 * 18} y={15 + 2 * 18} l="új hely" color="#ea580c" />
    <North x={210} y={30} />
    <T x={120} y={142} t="Merre és mennyivel?" size={11} />
  </QFig>
);

const L_SHAPE: Cell[] = [[0, 0], [0, 1], [0, 2], [1, 2]];
const FIG_WHICH_SHIFT = (
  <QFig h={160}>
    <Grid x0={10} y0={10} cols={22} rows={7} u={10} />
    <Cells cells={L_SHAPE} x0={10} y0={10} u={10} dx={1} dy={2} fill="#93c5fd" stroke="#1d4ed8" />
    <T x={25} y={100} t="eredeti" size={9} />
    {/* A: eltolt */}
    <Cells cells={L_SHAPE} x0={10} y0={10} u={10} dx={5} dy={1} />
    <T x={65} y={100} t="A" size={11} />
    {/* B: elforgatott (fekvő L) */}
    <Cells cells={[[0, 0], [1, 0], [2, 0], [0, 1]]} x0={10} y0={10} u={10} dx={9} dy={2} />
    <T x={115} y={100} t="B" size={11} />
    {/* C: tükrözött */}
    <Cells cells={[[1, 0], [1, 1], [1, 2], [0, 2]]} x0={10} y0={10} u={10} dx={13} dy={2} />
    <T x={155} y={100} t="C" size={11} />
    {/* D: nagyított */}
    <Cells cells={[[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5], [1, 0], [1, 1], [1, 2], [1, 3]]} x0={10} y0={10} u={10} dx={17} dy={1} />
    <T x={200} y={100} t="D" size={11} />
    <T x={120} y={135} t="Melyik az eltolt kép?" size={11} />
  </QFig>
);

const FIG_BUS = (
  <QFig h={110}>
    <line x1="15" y1="50" x2="225" y2="50" stroke="#0f172a" strokeWidth="2.5" />
    {[30, 90, 150, 210].map((x, i) => (
      <g key={x}>
        <circle cx={x} cy={50} r="5" fill="#0f172a" />
        <T x={x} y={36} t={`${i + 1}.`} size={11} color="#0369a1" />
      </g>
    ))}
    {[60, 120, 180].map((x) => (
      <T key={x} x={x} y={68} t="5 cm" size={10} color="#c2410c" />
    ))}
    <line x1="30" y1="84" x2="210" y2="84" stroke={UNK} strokeWidth="1.5" strokeDasharray="4 3" />
    <T x={120} y={100} t="1. és 4. megálló között: ? cm" size={11} />
  </QFig>
);

const FIG_MARKS = (
  <QFig h={110}>
    <line x1="15" y1="60" x2="225" y2="60" stroke="#0f172a" strokeWidth="2" />
    {[0, 1, 2, 3, 4].map((i) => (
      <g key={i}>
        <line x1={30 + i * 45} y1={54} x2={30 + i * 45} y2={66} stroke="#0f172a" strokeWidth="2" />
        <T x={30 + i * 45} y={82} t={i === 0 ? '0 cm' : i === 1 ? '3 cm' : i === 4 ? '? cm' : '…'} size={10} />
        <T x={30 + i * 45} y={44} t={`${i + 1}.`} size={10} color="#0369a1" />
      </g>
    ))}
    <polygon points="25,58 35,58 30,49" fill="#60a5fa" />
    <T x={120} y={102} t="Hol van az 5. jelölés?" size={11} />
  </QFig>
);

const SMALL_L: Cell[] = [[0, 0], [1, 0], [0, 1]];
const FIG_SHIFT_5K2E = (
  <QFig>
    <Grid x0={20} y0={15} cols={10} rows={6} u={18} />
    <Cells cells={SMALL_L} x0={20} y0={15} u={18} dx={1} dy={4} fill="#fed7aa" />
    <Cells cells={SMALL_L} x0={20} y0={15} u={18} dx={6} dy={2} />
    <North x={218} y={22} />
    <T x={120} y={142} t="Hogyan tolták el?" size={11} />
  </QFig>
);

const FIG_POINT_4K1D = (
  <QFig h={160}>
    <Grid x0={30} y0={10} cols={9} rows={7} u={18} />
    <Dot x={30 + 1 * 18} y={10 + 2 * 18} l="P" color="#0f172a" />
    <Dot x={30 + 5 * 18} y={10 + 3 * 18} l="A" color="#7c3aed" />
    <Dot x={30 + 5 * 18} y={10 + 1 * 18} l="B" color="#7c3aed" />
    <Dot x={30 + 2 * 18} y={10 + 6 * 18} l="C" color="#7c3aed" />
    <Dot x={30 + 4 * 18} y={10 + 3 * 18} l="D" color="#7c3aed" lx={-15} />
    <North x={210} y={22} />
    <T x={120} y={152} t="P: 4 keletre, 1 délre → ?" size={11} />
  </QFig>
);

const FIG_TRI_VERTEX = (
  <QFig>
    <Grid x0={20} y0={15} cols={10} rows={6} u={18} />
    <polygon points={`${20 + 18},${15 + 5 * 18} ${20 + 4 * 18},${15 + 5 * 18} ${20 + 18},${15 + 2 * 18}`} fill="#fed7aa" stroke="#9a3412" strokeWidth="2" />
    <Arr x1={20 + 18} y1={15 + 2 * 18} x2={20 + 4 * 18 - 4} y2={15 + 2 * 18} />
    <circle cx={20 + 4 * 18} cy={15 + 2 * 18} r="4" fill="#2563eb" />
    <T x={20 + 2.5 * 18} y={15 + 1.5 * 18} t="3" size={11} color="#2563eb" />
    <T x={180} y={70} t="A többi" size={11} />
    <T x={180} y={88} t="csúcs: ?" size={11} />
  </QFig>
);

const FIG_SQUARE_2CM = (
  <QFig h={130}>
    <rect x="25" y="40" width="40" height="40" fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />
    <T x={45} y={34} t="2 cm" size={10} color="#15803d" />
    <Arr x1={70} y1={60} x2={150} y2={60} />
    <T x={110} y={52} t="5 cm keletre" size={10} color="#2563eb" />
    <rect x="160" y="40" width="40" height="40" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
    <T x={180} y={65} t="?" size={14} />
    <T x={120} y={115} t="Milyen hosszú az oldala?" size={11} />
  </QFig>
);

const FIG_SEQ = (
  <QFig h={140}>
    <rect x="30" y="50" width="30" height="30" fill="#16a34a" />
    <T x={45} y={100} t="kezdet" size={10} />
    <rect x="90" y="20" width="135" height="90" rx="10" fill="#ecfdf5" stroke="#16a34a" />
    <T x={157} y={45} t="1. keletre 2 cm" size={11} color="#166534" />
    <T x={157} y={65} t="2. északra 3 cm" size={11} color="#166534" />
    <T x={157} y={85} t="3. nyugatra 7 cm" size={11} color="#166534" />
    <T x={120} y={130} t="Hová került összesen?" size={11} />
  </QFig>
);

const FIG_NOT_SHIFT = (
  <QFig h={150}>
    <Grid x0={10} y0={10} cols={22} rows={9} u={10} />
    <Cells cells={FLAG} x0={10} y0={10} u={10} dx={1} dy={3} fill="#93c5fd" stroke="#1d4ed8" />
    <T x={22} y={92} t="eredeti" size={9} />
    <Cells cells={FLAG} x0={10} y0={10} u={10} dx={5} dy={1} />
    <T x={62} y={70} t="A" size={11} />
    <Cells cells={FLAG} x0={10} y0={10} u={10} dx={9} dy={4} />
    <T x={102} y={100} t="B" size={11} />
    <Cells cells={[[0, 0], [1, 0], [1, 1], [1, 2], [1, 3]]} x0={10} y0={10} u={10} dx={13} dy={2} />
    <T x={152} y={80} t="C" size={11} />
    <Cells cells={FLAG} x0={10} y0={10} u={10} dx={18} dy={3} />
    <T x={202} y={92} t="D" size={11} />
    <T x={120} y={130} t="Melyik NEM eltolt kép?" size={11} />
  </QFig>
);

const FIG_DK2 = (
  <QFig h={160}>
    <Grid x0={30} y0={10} cols={9} rows={7} u={18} />
    <Dot x={30 + 2 * 18} y={10 + 2 * 18} l="P" color="#0f172a" />
    <Dot x={30 + 4 * 18} y={10 + 4 * 18} l="A" color="#7c3aed" />
    <Dot x={30 + 4 * 18} y={10 + 0 * 18} l="B" color="#7c3aed" ly={15} />
    <Dot x={30 + 0 * 18} y={10 + 4 * 18} l="C" color="#7c3aed" />
    <Dot x={30 + 4 * 18} y={10 + 2 * 18} l="D" color="#7c3aed" />
    <North x={210} y={22} />
    <T x={120} y={152} t="P: 2 lépés délkeletre → ?" size={11} />
  </QFig>
);

const FIG_L_SHIFT = (
  <QFig h={130}>
    <Grid x0={20} y0={15} cols={10} rows={5} u={18} />
    <Cells cells={L_SHAPE} x0={20} y0={15} u={18} dx={7} dy={1} />
    <Arr x1={20 + 7 * 18} y1={15 + 0.6 * 18} x2={20 + 1 * 18} y2={15 + 0.6 * 18} />
    <T x={20 + 4 * 18} y={15 + 0.4 * 18} t="6 nyugatra" size={10} color="#2563eb" />
    <T x={120} y={120} t="Hány kis négyzet az eltolt kép?" size={11} />
  </QFig>
);

const FIG_TRAIN = (
  <QFig h={110}>
    <line x1="15" y1="50" x2="225" y2="50" stroke="#0f172a" strokeWidth="2.5" />
    {[
      { l: 'A', x: 25 },
      { l: 'B', x: 89 },
      { l: 'C', x: 169 },
      { l: 'D', x: 217 }
    ].map((p) => (
      <g key={p.l}>
        <circle cx={p.x} cy={50} r="5" fill="#ef4444" />
        <T x={p.x} y={36} t={p.l} size={11} />
      </g>
    ))}
    <T x={57} y={68} t="4 cm" size={10} color="#3730a3" />
    <T x={129} y={68} t="5 cm" size={10} color="#3730a3" />
    <T x={193} y={68} t="3 cm" size={10} color="#3730a3" />
    <line x1="25" y1="82" x2="217" y2="82" stroke={UNK} strokeWidth="1.5" strokeDasharray="4 3" />
    <T x={120} y={100} t="A-tól D-ig: ? cm" size={11} />
  </QFig>
);

const FIG_DESK = (
  <QFig h={120}>
    <line x1="15" y1="70" x2="225" y2="70" stroke="#0f172a" strokeWidth="2" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <g key={i}>
        <line x1={40 + i * 34} y1={65} x2={40 + i * 34} y2={75} stroke="#0f172a" />
        <T x={40 + i * 34} y={90} t={`${i} m`} size={9} color="#475569" />
      </g>
    ))}
    <rect x={30} y={40} width={20} height={14} fill="#d97706" />
    <T x={40} y={34} t="most" size={9} />
    <rect x={64} y={40} width={20} height={14} fill="none" stroke="#a8a29e" strokeDasharray="3 2" />
    <T x={74} y={34} t="eredeti" size={9} />
    <rect x={166} y={40} width={20} height={14} fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="3 2" />
    <T x={176} y={34} t="cél" size={9} color="#16a34a" />
    <T x={120} y={110} t="Merre és mennyivel?" size={11} />
    <North x={225} y={12} />
  </QFig>
);

const TRANSLATION4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'tr-q1',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'Mit kell megmondani ahhoz, hogy valaki pontosan oda tolja az asztalt, ahová szeretnénk?',
    options: ['Az irányt és a távolságot.', 'Csak a távolságot.', 'Csak az irányt.', 'Az asztal színét és méretét.'],
    correctAnswer: 0,
    explanation: 'Eltoláshoz két dolog kell: milyen irányban (például keletre) és mekkora távolságra (például 2 m-rel).'
  },
  {
    id: 'tr-q2',
    level: 1,
    questionTypeBadge: 'Világtájak',
    question: 'Melyik NEM fővilágtáj?',
    options: ['északkelet', 'észak', 'dél', 'nyugat'],
    correctAnswer: 0,
    explanation: 'A 4 fővilágtáj: észak, kelet, dél, nyugat. Az északkelet a kettő között van, ez mellékvilágtáj.'
  },
  {
    id: 'tr-q3',
    level: 1,
    questionTypeBadge: 'Világtájak',
    figure: FIG_COMPASS_K,
    question: 'Melyik világtáj van a kérdőjel helyén?',
    options: ['kelet', 'nyugat', 'észak', 'dél'],
    correctAnswer: 0,
    explanation: 'Ha az észak felfelé van, akkor jobbra a kelet, balra a nyugat, lefelé a dél.'
  },
  {
    id: 'tr-q4',
    level: 1,
    questionTypeBadge: 'Világtájak',
    figure: FIG_COMPASS_EK,
    question: 'Melyik világtáj van a kérdőjel helyén?',
    options: ['északkelet', 'északnyugat', 'délkelet', 'kelet'],
    correctAnswer: 0,
    explanation: 'A kérdőjel az észak (fent) és a kelet (jobbra) között van: ez az északkelet (ÉK).'
  },
  {
    id: 'tr-q5',
    level: 1,
    questionTypeBadge: 'Rövidítések',
    question: 'Mit jelent a DNY rövidítés?',
    options: ['délnyugat', 'délkelet', 'északnyugat', 'dél'],
    correctAnswer: 0,
    explanation: 'D = dél, NY = nyugat, együtt: délnyugat. Ez a dél és a nyugat között van.'
  },
  {
    id: 'tr-q6',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'Arrébb toltuk a vonatsablont, és körberajzoltuk. Mi változott meg?',
    options: ['Csak a helye.', 'A nagysága.', 'Az alakja.', 'Az alakja és a nagysága is.'],
    correctAnswer: 0,
    explanation: 'Eltoláskor az alakzat formája és nagysága nem változik, csak a helye lesz más.'
  },
  {
    id: 'tr-q7',
    level: 1,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_SHIFT_K5,
    question: 'A világos zászlót eltoltuk. Hány négyzettel toltuk el keletre?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'Kövesd a zászló rúdját: lépésenként számold, hányat lépett jobbra. 5-öt lépett. (Ne a két zászló közötti üres oszlopokat számold, az csak 3!)'
  },
  {
    id: 'tr-q8',
    level: 1,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_DOT_UP3,
    question: 'A pontot eltoltuk. Merre és mennyivel?',
    options: ['3 négyzettel északra', '3 négyzettel délre', '3 négyzettel keletre', '4 négyzettel északra'],
    correctAnswer: 0,
    explanation: 'A pont felfelé mozdult, és felfelé van az észak. 3 vonalat lépett: 3 négyzettel északra.'
  },
  {
    id: 'tr-q9',
    level: 1,
    questionTypeBadge: 'Világtájak',
    question: 'Melyik világtáj van az északkal szemben, az ellenkező irányban?',
    options: ['dél', 'kelet', 'nyugat', 'északnyugat'],
    correctAnswer: 0,
    explanation: 'Az észak és a dél ellentétes irányok, ugyanígy a kelet és a nyugat.'
  },
  {
    id: 'tr-q10',
    level: 1,
    questionTypeBadge: 'Eltolás felismerése',
    figure: FIG_WHICH_SHIFT,
    question: 'Melyik rajz a kék L alakzat eltolt képe?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Az A ugyanolyan alakú, ugyanakkora, és ugyanúgy áll – csak arrébb van. A B elfordult, a C a tükörképe, a D nagyobb lett.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'tr-q11',
    level: 2,
    questionTypeBadge: 'Buszmegállók',
    figure: FIG_BUS,
    question: 'A megállók 5 cm-re vannak egymástól. Milyen messze van a 4. megálló az 1.-től?',
    options: ['15 cm', '20 cm', '10 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'Az 1.-től a 4.-ig 3 szakasz van: 5 + 5 + 5 = 15 cm. (A 20 cm akkor jönne ki, ha a megállókat számolnád: 4 · 5.)'
  },
  {
    id: 'tr-q12',
    level: 2,
    questionTypeBadge: 'Jelölések',
    figure: FIG_MARKS,
    question: 'A vonalon 3 centiméterenként vannak jelölések, az első a 0 cm-nél. Hol van az 5. jelölés?',
    options: ['12 cm-nél', '15 cm-nél', '9 cm-nél', '8 cm-nél'],
    correctAnswer: 0,
    explanation: '1.: 0 cm, 2.: 3 cm, 3.: 6 cm, 4.: 9 cm, 5.: 12 cm. Az első jelölés a 0-nál van, ezért nem 5 · 3 = 15!'
  },
  {
    id: 'tr-q13',
    level: 2,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_SHIFT_5K2E,
    question: 'Hogyan toltuk el a világos alakzatot?',
    options: ['5 négyzettel keletre és 2-vel északra', '5 négyzettel nyugatra és 2-vel északra', '2 négyzettel keletre és 5-tel északra', '5 négyzettel keletre és 2-vel délre'],
    correctAnswer: 0,
    explanation: 'Kövesd a bal felső négyzetet: 5-öt lépett jobbra (kelet) és 2-t felfelé (észak).'
  },
  {
    id: 'tr-q14',
    level: 2,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_POINT_4K1D,
    question: 'A P pontot 4 négyzettel keletre és 1 négyzettel délre toljuk. Melyik pontba kerül?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: '4-et jobbra (kelet), 1-et le (dél): ez az A pont. A B-nél felfelé lépett, a C-nél felcserélték a számokat, a D-nél csak 3-at lépett keletre.'
  },
  {
    id: 'tr-q15',
    level: 2,
    questionTypeBadge: 'Visszatolás',
    question: 'A radírt 2 cm-rel keletre toltad, aztán 2 cm-rel nyugatra. Hol van most a radír?',
    options: ['Ott, ahonnan elindult.', '4 cm-rel keletre.', '2 cm-rel keletre.', '4 cm-rel nyugatra.'],
    correctAnswer: 0,
    explanation: 'A kelet és a nyugat ellentétes irány. Ugyanannyit mentél vissza, mint oda, ezért visszaért a helyére.'
  },
  {
    id: 'tr-q16',
    level: 2,
    questionTypeBadge: 'Mellékvilágtáj',
    question: 'Négyzethálón 1 lépés északkeletre azt jelenti, hogy…',
    options: ['átlósan megyünk: 1-et jobbra és 1-et fel', '1-et balra és 1-et fel', '1-et jobbra és 1-et le', '2-t jobbra'],
    correctAnswer: 0,
    explanation: 'Az északkelet az észak (fel) és a kelet (jobbra) között van. Ezért egy kis négyzet átlóján megyünk jobbra fel.'
  },
  {
    id: 'tr-q17',
    level: 2,
    questionTypeBadge: 'Visszatolás',
    question: 'A radírt 5 cm-rel délre toltad. Hogyan tolod vissza a helyére?',
    options: ['5 cm-rel északra', '5 cm-rel délre', '5 cm-rel keletre', '10 cm-rel északra'],
    correctAnswer: 0,
    explanation: 'Visszafelé az ellenkező irányba kell tolni ugyanannyit. A dél ellentéte az észak: 5 cm-rel északra.'
  },
  {
    id: 'tr-q18',
    level: 2,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_TRI_VERTEX,
    question: 'A háromszöget eltoljuk. A felső csúcsa 3 négyzetet lépett keletre. Mennyit lép a másik két csúcsa?',
    options: ['Ugyanennyit: 3 négyzetet keletre.', 'Kevesebbet, mert lent vannak.', 'Többet, mert messzebb vannak.', 'Nem mozdulnak el.'],
    correctAnswer: 0,
    explanation: 'Eltoláskor az alakzat minden pontja ugyanannyit és ugyanabba az irányba mozdul el.'
  },
  {
    id: 'tr-q19',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A széket először 1 m-rel keletre toltuk, aztán még 1 m-rel keletre. Hová került összesen?',
    options: ['2 m-rel keletre', '1 m-rel keletre', 'vissza a helyére', '2 m-rel nyugatra'],
    correctAnswer: 0,
    explanation: 'Ugyanabba az irányba toltuk kétszer: 1 m + 1 m = 2 m keletre.'
  },
  {
    id: 'tr-q20',
    level: 2,
    questionTypeBadge: 'Csapda',
    figure: FIG_SQUARE_2CM,
    question: 'Egy 2 cm oldalú négyzetet 5 cm-rel keletre toltunk. Milyen hosszú az eltolt négyzet oldala?',
    options: ['2 cm', '7 cm', '5 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'Eltoláskor a nagyság nem változik! Az oldal ugyanúgy 2 cm marad. Az 5 cm a tolás távolsága, nem az oldal hossza.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'tr-q21',
    level: 3,
    questionTypeBadge: 'Több eltolás',
    figure: FIG_SEQ,
    question: 'A zöld négyzetet egymás után eltoljuk: keletre 2 cm, északra 3 cm, nyugatra 7 cm. Hová került az indulási helyéhez képest?',
    options: ['5 cm-rel nyugatra és 3 cm-rel északra', '9 cm-rel nyugatra és 3 cm-rel északra', '5 cm-rel keletre és 3 cm-rel északra', '12 cm-rel északra'],
    correctAnswer: 0,
    explanation: 'Kelet–nyugat irányban: 2 cm keletre, majd 7 cm nyugatra, tehát 7 − 2 = 5 cm nyugatra. Észak felé: 3 cm. Összesen: 5 cm nyugatra és 3 cm északra.'
  },
  {
    id: 'tr-q22',
    level: 3,
    questionTypeBadge: 'Több eltolás',
    question: 'Egy pontot így tolunk el a négyzethálón: 3K, 2É, 1NY, 4D. Hová kerül összesen?',
    options: ['2 négyzettel keletre és 2-vel délre', '4 négyzettel keletre és 6-tal délre', '2 négyzettel keletre és 2-vel északra', '2 négyzettel nyugatra és 2-vel délre'],
    correctAnswer: 0,
    explanation: 'Kelet–nyugat: 3 keletre, 1 vissza nyugatra → 2 keletre. Észak–dél: 2 fel, 4 le → 2 délre.'
  },
  {
    id: 'tr-q23',
    level: 3,
    questionTypeBadge: 'Buszmegállók',
    question: 'A busz az 1. megállóból indul, a megállók 5 cm-enként vannak. 20 cm-t tett meg. Hányadik megállóban áll?',
    options: ['az 5.-ben', 'a 4.-ben', 'a 6.-ban', 'a 20.-ban'],
    correctAnswer: 0,
    explanation: '20 : 5 = 4 szakaszt tett meg. Az 1. megállótól 4 szakasz után az 5. megállóba ér (1 + 4 = 5).'
  },
  {
    id: 'tr-q24',
    level: 3,
    questionTypeBadge: 'Jelölések',
    question: 'A háromszöget a 0 cm-es jelöléstől mindig 3 cm-rel toljuk tovább. Hányszor kell eltolni, hogy a 15 cm-es jelöléshez érjen?',
    options: ['5-ször', '15-ször', '6-szor', '4-szer'],
    correctAnswer: 0,
    explanation: '15 : 3 = 5. Az eltolások után: 3, 6, 9, 12, 15 cm – ez 5 eltolás.'
  },
  {
    id: 'tr-q25',
    level: 3,
    questionTypeBadge: 'Eltolás felismerése',
    figure: FIG_NOT_SHIFT,
    question: 'Melyik rajz NEM a kék zászló eltolt képe?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'Az A, B és D ugyanúgy áll, mint az eredeti, csak más helyen van. A C-nél a zászló a rúd másik oldalán van: az tükörkép, nem eltolás.'
  },
  {
    id: 'tr-q26',
    level: 3,
    questionTypeBadge: 'Mellékvilágtáj',
    question: 'Kata a radírt 4 cm-rel északkeletre tolta, majd 4 cm-rel délnyugatra. Hol van most a radír?',
    options: ['Ott, ahonnan elindult.', '8 cm-rel északkeletre.', '4 cm-rel délre.', '4 cm-rel keletre.'],
    correctAnswer: 0,
    explanation: 'Az északkelet és a délnyugat ellentétes irányok. Ugyanannyit tolta vissza, ezért a radír a helyére került.'
  },
  {
    id: 'tr-q27',
    level: 3,
    questionTypeBadge: 'Mellékvilágtáj',
    figure: FIG_DK2,
    question: 'A P pontot 2 lépéssel délkeletre toljuk (átlósan). Melyik pontba kerül?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Délkelet = jobbra le. 2 átlós lépés: 2 jobbra és 2 le, ez az A. A B északkelet, a C délnyugat lenne, a D-nél csak keletre ment.'
  },
  {
    id: 'tr-q28',
    level: 3,
    questionTypeBadge: 'Csapda',
    figure: FIG_L_SHIFT,
    question: 'Egy 4 kis négyzetből álló L alakzatot 6 négyzettel nyugatra tolunk. Hány kis négyzetből áll az eltolt kép?',
    options: ['4', '10', '24', '6'],
    correctAnswer: 0,
    explanation: 'Eltoláskor a nagyság nem változik, ezért az eltolt kép is 4 kis négyzetből áll. A 6 csak azt mondja meg, mennyivel toltuk el.'
  },
  {
    id: 'tr-q29',
    level: 3,
    questionTypeBadge: 'Vonatsablon',
    figure: FIG_TRAIN,
    question: 'A vonatsablont az egyenes mentén toltuk: A-ból B-be 4 cm-t, B-ből C-be 5 cm-t, C-ből D-be 3 cm-t. Milyen messze van D az A-tól?',
    options: ['12 cm', '9 cm', '8 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'Ugyanabba az irányba toltuk, ezért összeadjuk: 4 + 5 + 3 = 12 cm.'
  },
  {
    id: 'tr-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_DESK,
    question: 'Az asztalt 3 m-rel keletre kellett volna tolni, de a fiúk 1 m-rel nyugatra tolták. Most merre és mennyivel kell tolni, hogy a jó helyre kerüljön?',
    options: ['4 m-rel keletre', '2 m-rel keletre', '3 m-rel keletre', '4 m-rel nyugatra'],
    correctAnswer: 0,
    explanation: 'Először vissza kell tolni 1 m-t keletre (az eredeti helyére), aztán még 3 m-t keletre: 1 + 3 = 4 m keletre.'
  }
];

export const Translation4Quiz: React.FC<{
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
      topicId="g4-geom-eltolas-quiz"
      subtopicId="eltolas"
      title="6. Eltolás – Kvíz"
      subtitle="30 feladat 3 szinten: irány és távolság, fő- és mellékvilágtájak, eltolás a négyzethálón."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={TRANSLATION4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Az eltolás',
          items: [
            'Meg kell mondani: milyen irányban és mekkora távolságra.',
            'Az alakja és a nagysága nem változik.',
            'Nem fordul el, nem tükröződik – csak a helye változik.',
            'Minden pontja ugyanannyit, ugyanarra mozdul.'
          ]
        },
        {
          title: 'Világtájak',
          items: [
            'Fővilágtájak: É (észak), K (kelet), D (dél), NY (nyugat).',
            'Mellékvilágtájak: ÉK, DK, DNY, ÉNY.',
            'Térképen, négyzethálón: észak fent, kelet jobbra.',
            'Ellentétek: É–D, K–NY, ÉK–DNY, DK–ÉNY.'
          ]
        },
        {
          title: 'Számolás',
          items: [
            'Azonos irányban összeadjuk: 2 m + 1 m keletre = 3 m keletre.',
            'Ellentétes irányban kivonjuk: 7 cm NY és 2 cm K → 5 cm NY.',
            'Jelölések 3 cm-enként: 0, 3, 6, 9, 12 cm.',
            'Átlós lépés (pl. ÉK): 1 jobbra és 1 fel.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Translation4Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Translation4Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Translation4Quiz;
