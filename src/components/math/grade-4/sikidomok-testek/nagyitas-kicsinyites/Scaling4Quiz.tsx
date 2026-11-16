import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Scaling4Matcher } from './Scaling4Matcher';
import { Scaling4Sorter } from './Scaling4Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
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

type Cell = [number, number];
const CellShape: React.FC<{ cells: Cell[]; x0: number; y0: number; u: number; fill?: string; stroke?: string }> = ({
  cells,
  x0,
  y0,
  u,
  fill = '#93c5fd',
  stroke = '#1d4ed8'
}) => (
  <g>
    {cells.map(([c, r]) => (
      <rect key={`${c}-${r}`} x={x0 + c * u} y={y0 + r * u} width={u} height={u} fill={fill} stroke={stroke} />
    ))}
  </g>
);

const MiniHouse: React.FC<{ x: number; yb: number; w: number; u: number }> = ({ x, yb, w, u }) => (
  <g>
    <rect x={x} y={yb - w * u} width={w * u} height={w * u} fill="#fcd34d" stroke="#b45309" />
    <polygon points={`${x - (w / 2) * u},${yb - w * u} ${x + (w / 2) * u},${yb - 2 * w * u} ${x + 1.5 * w * u},${yb - w * u}`} fill="#ef4444" stroke="#991b1b" />
  </g>
);

const CodeBox: React.FC<{ text: string; y?: number }> = ({ text, y = 60 }) => (
  <g>
    <rect x="20" y={y - 24} width="200" height="40" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
    <T x={120} y={y + 2} t={text} size={15} color="#075985" />
  </g>
);

// --- Ábrák ---
const FIG_HOUSE_BIG = (
  <QFig>
    <Grid x0={10} y0={20} cols={22} rows={9} u={10} />
    <MiniHouse x={40} yb={110} w={2} u={10} />
    <MiniHouse x={130} yb={110} w={4} u={10} />
    <T x={50} y={135} t="eredeti" size={11} />
    <T x={150} y={135} t="új rajz: ?" size={11} />
  </QFig>
);
const FIG_HOUSE_SMALL = (
  <QFig>
    <Grid x0={10} y0={20} cols={22} rows={9} u={10} />
    <MiniHouse x={40} yb={110} w={4} u={10} />
    <MiniHouse x={160} yb={110} w={2} u={10} />
    <T x={60} y={135} t="eredeti" size={11} />
    <T x={170} y={135} t="új rajz: ?" size={11} />
  </QFig>
);
const FIG_SEG_2 = (
  <QFig h={110}>
    <Grid x0={20} y0={20} cols={10} rows={4} u={20} />
    <line x1={40} y1={40} x2={80} y2={40} stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
    <T x={60} y={33} t="2 egység" size={10} color="#1d4ed8" />
    <line x1={40} y1={80} x2={220} y2={80} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="5 4" />
    <T x={130} y={73} t="kétszeresére: ?" size={11} />
  </QFig>
);
const FIG_ONE_CELL = (
  <QFig h={120}>
    <Grid x0={30} y0={20} cols={9} rows={4} u={20} />
    <rect x={50} y={40} width={20} height={20} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
    <T x={60} y={100} t="1 kis négyzet" size={10} />
    <T x={170} y={100} t="kétszeresére: ? db" size={11} />
  </QFig>
);
const FIG_CODE_RECT = (
  <QFig h={100}>
    <CodeBox text="2→, 3↓, 2←, 3↑" />
    <T x={120} y={90} t="Mit rajzol? ?" size={11} />
  </QFig>
);
const FIG_RECT_3x2 = (
  <QFig>
    <Grid x0={12} y0={12} cols={18} rows={8} u={12} />
    <rect x={24} y={36} width={36} height={24} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
    <T x={42} y={30} t="3" size={10} color="#1d4ed8" />
    <T x={70} y={52} t="2" size={10} color="#1d4ed8" />
    <T x={160} y={70} t="kétszeresére: ?" size={12} />
    <T x={120} y={135} t="széles · magas = ?" size={11} />
  </QFig>
);
const FIG_RECT_6x4 = (
  <QFig>
    <Grid x0={12} y0={12} cols={18} rows={8} u={12} />
    <rect x={24} y={24} width={72} height={48} fill="#86efac" stroke="#15803d" strokeWidth="2" />
    <T x={60} y={20} t="6" size={10} color="#15803d" />
    <T x={104} y={52} t="4" size={10} color="#15803d" />
    <T x={170} y={60} t="felére: ?" size={12} />
    <T x={120} y={135} t="széles · magas = ?" size={11} />
  </QFig>
);
const FIG_PAIRS = (
  <QFig h={150}>
    <Grid x0={10} y0={10} cols={22} rows={10} u={10} />
    <T x={20} y={22} t="A" size={11} />
    <rect x={30} y={20} width={20} height={10} fill="#93c5fd" stroke="#1d4ed8" />
    <rect x={30} y={40} width={40} height={20} fill="#93c5fd" stroke="#1d4ed8" />
    <T x={100} y={22} t="B" size={11} />
    <rect x={110} y={20} width={20} height={10} fill="#fca5a5" stroke="#b91c1c" />
    <rect x={110} y={40} width={30} height={20} fill="#fca5a5" stroke="#b91c1c" />
    <T x={170} y={22} t="C" size={11} />
    <rect x={180} y={20} width={20} height={20} fill="#fde68a" stroke="#a16207" />
    <rect x={180} y={50} width={40} height={20} fill="#fde68a" stroke="#a16207" />
    <T x={20} y={92} t="D" size={11} />
    <rect x={30} y={80} width={30} height={10} fill="#c4b5fd" stroke="#6d28d9" />
    <rect x={30} y={95} width={40} height={10} fill="#c4b5fd" stroke="#6d28d9" />
    <T x={150} y={100} t="Melyik pár hasonló? ?" size={11} />
  </QFig>
);
const FIG_SQUARE_3CM = (
  <QFig h={130}>
    <rect x={40} y={30} width={60} height={60} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.5" />
    <T x={70} y={24} t="3 cm" size={11} color="#1d4ed8" />
    <rect x={130} y={20} width={90} height={90} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" />
    <T x={175} y={70} t="? cm" size={13} />
    <T x={70} y={115} t="eredeti" size={10} />
  </QFig>
);
const FIG_TREE_TRUNK = (
  <QFig>
    <Grid x0={20} y0={10} cols={10} rows={9} u={12} />
    <CellShape cells={[[1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [3, 1], [1, 2], [2, 2]]} x0={32} y0={22} u={12} fill="#4ade80" stroke="#166534" />
    <CellShape cells={[[1, 3], [1, 4], [1, 5]]} x0={32} y0={22} u={12} fill="#92400e" stroke="#451a03" />
    <T x={190} y={60} t="törzs:" size={11} />
    <T x={190} y={78} t="1 széles, 3 magas" size={10} />
    <T x={190} y={110} t="kétszeres: ?" size={11} />
  </QFig>
);
const FIG_SEG_2_TO_6 = (
  <QFig h={110}>
    <Grid x0={20} y0={20} cols={10} rows={4} u={20} />
    <line x1={40} y1={40} x2={80} y2={40} stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
    <line x1={40} y1={80} x2={160} y2={80} stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
    <T x={110} y={45} t="eredeti" size={10} color="#1d4ed8" anchor="start" />
    <T x={170} y={85} t="nagyított" size={10} color="#15803d" anchor="start" />
    <T x={120} y={104} t="Hányszorosára? ?" size={11} />
  </QFig>
);
const FIG_L_SHAPE = (
  <QFig h={130}>
    <Grid x0={30} y0={15} cols={9} rows={5} u={20} />
    <CellShape cells={[[1, 1], [1, 2], [1, 3], [2, 3]]} x0={30} y0={15} u={20} fill="#fcd34d" stroke="#a16207" />
    <T x={170} y={60} t="kétszeresére" size={11} />
    <T x={170} y={80} t="nagyítva:" size={11} />
    <T x={170} y={100} t="? kis négyzet" size={11} />
  </QFig>
);
const FIG_RECT_8x4 = (
  <QFig h={130}>
    <rect x={30} y={30} width={120} height={60} fill="#fde68a" stroke="#a16207" strokeWidth="2.5" />
    <T x={90} y={24} t="8 cm" size={11} color="#a16207" />
    <T x={170} y={65} t="4 cm" size={11} color="#a16207" anchor="start" />
    <T x={120} y={115} t="felére kicsinyítve: K = ?" size={11} />
  </QFig>
);
const FIG_RECT_3x2_K = (
  <QFig h={130}>
    <Grid x0={20} y0={15} cols={10} rows={5} u={16} />
    <rect x={36} y={31} width={48} height={32} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2.5" />
    <T x={60} y={95} t="K = 10 egység" size={11} color="#1d4ed8" />
    <T x={190} y={55} t="kétszeres:" size={11} />
    <T x={190} y={75} t="K = ?" size={12} />
  </QFig>
);
const FIG_WRONG_SCALE = (
  <QFig h={150}>
    <Grid x0={10} y0={10} cols={22} rows={13} u={10} />
    <rect x={20} y={20} width={40} height={20} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
    <T x={40} y={55} t="eredeti" size={10} />
    <rect x={90} y={20} width={20} height={10} fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <T x={100} y={55} t="A" size={11} />
    <rect x={140} y={20} width={80} height={40} fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <T x={180} y={75} t="B" size={11} />
    <rect x={20} y={90} width={60} height={20} fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <T x={50} y={125} t="C" size={11} />
    <rect x={110} y={90} width={60} height={30} fill="#fde68a" stroke="#a16207" strokeWidth="2" />
    <T x={140} y={138} t="D" size={11} />
    <T x={205} y={110} t="?" size={14} />
  </QFig>
);
const FIG_HOUSES_KATA = (
  <QFig>
    <Grid x0={10} y0={20} cols={22} rows={9} u={10} />
    <MiniHouse x={130} yb={110} w={4} u={10} />
    <T x={60} y={60} t="Kata háza:" size={11} />
    <T x={60} y={78} t="8 négyzet magas" size={10} />
    <T x={120} y={135} t="Ábel háza: ? magas" size={11} />
  </QFig>
);
const FIG_CODE_SQUARE = (
  <QFig h={100}>
    <CodeBox text="2→, 2↓, 2←, 2↑" />
    <T x={120} y={90} t="+2 minden számhoz: hasonló? ?" size={11} />
  </QFig>
);
const FIG_RECT_2x1_GRID = (
  <QFig h={120}>
    <Grid x0={20} y0={15} cols={10} rows={4} u={20} />
    <rect x={40} y={35} width={40} height={20} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2.5" />
    <circle cx={40} cy={35} r={4} fill="#dc2626" />
    <T x={120} y={110} t="2→, 1↓, 2←, 1↑ háromszorosa: ?" size={11} />
  </QFig>
);
const FIG_SQ_2x2 = (
  <QFig h={130}>
    <Grid x0={20} y0={15} cols={10} rows={5} u={18} />
    <CellShape cells={[[1, 1], [2, 1], [1, 2], [2, 2]]} x0={20} y0={15} u={18} />
    <T x={175} y={55} t="háromszorosára" size={11} />
    <T x={175} y={73} t="nagyítva:" size={11} />
    <T x={175} y={92} t="? kis négyzet" size={11} />
  </QFig>
);
const FIG_CASTLE_CODE = (
  <QFig h={110}>
    <rect x="10" y="20" width="220" height="40" rx="12" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
    <T x={120} y={46} t="6f, 2j, 2l, 2j, 2f, 2j, 6l, 6b" size={13} color="#075985" />
    <T x={120} y={90} t="Oszd el a számokat 2-vel: ?" size={11} />
  </QFig>
);

const SCALING4_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'sc-q1',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'A térkép a valóság … mása. Melyik szó illik a helyére?',
    options: ['kicsinyített', 'nagyított', 'eltolt', 'ugyanakkora'],
    correctAnswer: 0,
    explanation: 'A térképen egy egész ország elfér egy lapon, tehát kicsiben mutatja a valóságot: a térkép kicsinyített mása a valóságnak.'
  },
  {
    id: 'sc-q2',
    level: 1,
    questionTypeBadge: 'Eszközök',
    question: 'Melyik eszközzel lehet nagyítani?',
    options: ['nagyító', 'vonalzó', 'körző', 'radír'],
    correctAnswer: 0,
    explanation: 'A nagyító (és a mikroszkóp, a vetítő) nagyobbnak mutatja a dolgokat. A vonalzóval mérünk, a körzővel kört rajzolunk.'
  },
  {
    id: 'sc-q3',
    level: 1,
    questionTypeBadge: 'Nagyítás',
    figure: FIG_HOUSE_BIG,
    question: 'Hogyan változott meg a ház rajza az eredetihez képest?',
    options: ['Kétszeresére nagyították.', 'Felére kicsinyítették.', 'Nem változott.', 'Csak magasabb lett, szélesebb nem.'],
    correctAnswer: 0,
    explanation: 'Az eredeti ház teste 2 négyzet széles, az újé 4. A magassága is kétszeres lett. Minden méret kétszeres: kétszeresére nagyították.'
  },
  {
    id: 'sc-q4',
    level: 1,
    questionTypeBadge: 'Kicsinyítés',
    figure: FIG_HOUSE_SMALL,
    question: 'Hogyan változott meg a ház rajza az eredetihez képest?',
    options: ['Felére kicsinyítették.', 'Kétszeresére nagyították.', 'Nem változott.', 'Csak keskenyebb lett, alacsonyabb nem.'],
    correctAnswer: 0,
    explanation: 'Az eredeti ház teste 4 négyzet széles, az újé csak 2. A magassága is a fele lett. Ez felére kicsinyítés.'
  },
  {
    id: 'sc-q5',
    level: 1,
    questionTypeBadge: 'Szakasz',
    figure: FIG_SEG_2,
    question: 'Egy 2 egység hosszú szakaszt kétszeresére nagyítunk. Milyen hosszú lesz?',
    options: ['4 egység', '3 egység', '2 egység', '6 egység'],
    correctAnswer: 0,
    explanation: 'Kétszeresére nagyítunk, tehát 2-vel szorzunk: 2 · 2 = 4 egység.'
  },
  {
    id: 'sc-q6',
    level: 1,
    questionTypeBadge: 'Fogalmak',
    question: 'Egy rajzot kétszeresére nagyítunk. Mi történik az alakjával?',
    options: ['Nem változik, csak nagyobb lesz.', 'Megváltozik, elnyúlik.', 'Fejjel lefelé fordul.', 'Kisebb lesz.'],
    correctAnswer: 0,
    explanation: 'Nagyításkor minden méret ugyanannyiszorosára nő, ezért az alakzat ugyanolyan alakú marad, csak nagyobb lesz.'
  },
  {
    id: 'sc-q7',
    level: 1,
    questionTypeBadge: 'Hasonlóság',
    question: 'Mit jelent az, hogy két alakzat hasonló?',
    options: [
      'Ugyanolyan alakúak, de nem feltétlenül ugyanakkorák.',
      'Ugyanakkorák, de más alakúak.',
      'Ugyanolyan színűek.',
      'Mindkettő téglalap, bármilyen méretű.'
    ],
    correctAnswer: 0,
    explanation: 'Az eredeti és a kétszeresére nagyított rajz ugyanolyan alakú, de nem ugyanakkora. Ezek az alakzatok hasonlók.'
  },
  {
    id: 'sc-q8',
    level: 1,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_ONE_CELL,
    question: 'Egy kis négyzetet kétszeresére nagyítunk. Hány kis négyzetet takar a nagyított kép?',
    options: ['4', '2', '3', '8'],
    correctAnswer: 0,
    explanation: 'A nagyított négyzet 2 széles és 2 magas lesz: 2 · 2 = 4 kis négyzet. Nem 2, mert a szélesség ÉS a magasság is kétszeres lesz!'
  },
  {
    id: 'sc-q9',
    level: 1,
    questionTypeBadge: 'Lépéssor',
    figure: FIG_CODE_RECT,
    question: 'A nyilak az irányt, a számok a lépések számát jelölik. Milyen alakzatot rajzol ez a lépéssor?',
    options: ['téglalapot', 'négyzetet', 'háromszöget', 'kört'],
    correctAnswer: 0,
    explanation: '2-t jobbra, 3-at le, 2-t balra, 3-at fel: 2 széles és 3 magas zárt alakzat, vagyis téglalap. Nem négyzet, mert a 2 és a 3 különböző.'
  },
  {
    id: 'sc-q10',
    level: 1,
    questionTypeBadge: 'Lépéssor',
    question: 'Kétszerezd a számokat ebben a lépéssorban: 2→, 3↓, 2←, 3↑. Mit kapsz?',
    options: ['4→, 6↓, 4←, 6↑', '4→, 5↓, 4←, 5↑', '4→, 3↓, 4←, 3↑', '1→, 3↓, 1←, 3↑'],
    correctAnswer: 0,
    explanation: 'Minden számot 2-vel szorzunk: 2 · 2 = 4 és 3 · 2 = 6. A nyilak nem változnak: 4→, 6↓, 4←, 6↑.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'sc-q11',
    level: 2,
    questionTypeBadge: 'Nagyítás',
    figure: FIG_RECT_3x2,
    question: 'A téglalap 3 négyzet széles és 2 magas. Milyen lesz a kétszeresére nagyított téglalap?',
    options: ['6 széles, 4 magas', '5 széles, 4 magas', '6 széles, 2 magas', '9 széles, 6 magas'],
    correctAnswer: 0,
    explanation: 'Mindkét méretet 2-vel szorozzuk: 3 · 2 = 6 és 2 · 2 = 4. Az 5 · 4 rossz, ott 2-t adtak hozzá; a 9 · 6 háromszoros nagyítás lenne.'
  },
  {
    id: 'sc-q12',
    level: 2,
    questionTypeBadge: 'Kicsinyítés',
    figure: FIG_RECT_6x4,
    question: 'A téglalap 6 négyzet széles és 4 magas. Milyen lesz a felére kicsinyített téglalap?',
    options: ['3 széles, 2 magas', '4 széles, 2 magas', '3 széles, 4 magas', '12 széles, 8 magas'],
    correctAnswer: 0,
    explanation: 'Felére kicsinyítünk, tehát minden méretet 2-vel osztunk: 6 : 2 = 3 és 4 : 2 = 2.'
  },
  {
    id: 'sc-q13',
    level: 2,
    questionTypeBadge: 'Hasonlóság',
    figure: FIG_PAIRS,
    question: 'Melyik alakzatpár hasonló?',
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Az A párban a 2 · 1-es téglalapból 4 · 2-es lett: a szélesség és a magasság is kétszeres. A B, C, D párban csak az egyik méret változott, vagy nem ugyanannyiszorosára.'
  },
  {
    id: 'sc-q14',
    level: 2,
    questionTypeBadge: 'Nagyítás',
    question: 'A ház teteje 4 négyzet széles. Kata kétszeresére nagyította a házat. Milyen széles Kata házának a teteje?',
    options: ['8 négyzet', '6 négyzet', '4 négyzet', '16 négyzet'],
    correctAnswer: 0,
    explanation: 'Kétszeresére nagyítás: 4 · 2 = 8 négyzet. A 6 akkor jönne ki, ha 2-t adnánk hozzá – az nem nagyítás.'
  },
  {
    id: 'sc-q15',
    level: 2,
    questionTypeBadge: 'Lépéssor',
    figure: FIG_CASTLE_CODE,
    question: 'A betűk az irányok kezdőbetűi (j = jobbra, b = balra, f = fel, l = le). Oszd el a lépéssor számait 2-vel! Melyik lesz az új lépéssor?',
    options: ['3f, 1j, 1l, 1j, 1f, 1j, 3l, 3b', '3f, 1j, 2l, 1j, 2f, 1j, 3l, 3b', '12f, 4j, 4l, 4j, 4f, 4j, 12l, 12b', '3f, 1j, 1l, 1j, 1f, 1j, 6l, 6b'],
    correctAnswer: 0,
    explanation: 'Minden számot elosztunk 2-vel: 6 : 2 = 3, 2 : 2 = 1. A betűk maradnak: 3f, 1j, 1l, 1j, 1f, 1j, 3l, 3b. Ez a vár felére kicsinyített mása.'
  },
  {
    id: 'sc-q16',
    level: 2,
    questionTypeBadge: 'Lépéssor',
    question: 'A 2→, 3↓, 2←, 3↑ lépéssor minden számához 2-t adunk: 4→, 5↓, 4←, 5↑. Hasonló lesz az új téglalap az eredetihez?',
    options: [
      'Nem, mert a szélesség kétszeres lett, a magasság nem.',
      'Igen, mert mindegyik számhoz ugyanannyit adtunk.',
      'Igen, mert mindkettő téglalap.',
      'Nem, mert az új alakzat négyzet lett.'
    ],
    correctAnswer: 0,
    explanation: 'A szélesség 2 → 4 (kétszeres), a magasság 3 → 5 (nem kétszeres). A méretek nem ugyanannyiszorosára változtak, ezért nem hasonló.'
  },
  {
    id: 'sc-q17',
    level: 2,
    questionTypeBadge: 'Világtájak',
    question: 'Nagyítsd négyszeresére: 1É, 1K, 1É, 2K, 1D, 2K, 1DNY, 4NY. Melyik a jó lépéssor?',
    options: [
      '4É, 4K, 4É, 8K, 4D, 8K, 4DNY, 16NY',
      '5É, 5K, 5É, 6K, 5D, 6K, 5DNY, 8NY',
      '4É, 4K, 4É, 2K, 4D, 2K, 4DNY, 4NY',
      '2É, 2K, 2É, 4K, 2D, 4K, 2DNY, 8NY'
    ],
    correctAnswer: 0,
    explanation: 'Minden számot 4-gyel szorzunk: 1 · 4 = 4, 2 · 4 = 8, 4 · 4 = 16. A világtájak (É, K, D, DNY, NY) nem változnak.'
  },
  {
    id: 'sc-q18',
    level: 2,
    questionTypeBadge: 'Nagyítás',
    figure: FIG_SQUARE_3CM,
    question: 'Egy négyzet oldala 3 cm. Milyen hosszú a kétszeresére nagyított négyzet oldala?',
    options: ['6 cm', '5 cm', '9 cm', '12 cm'],
    correctAnswer: 0,
    explanation: '3 cm · 2 = 6 cm. Az 5 cm akkor jönne ki, ha 2-t adnánk hozzá – az hiba.'
  },
  {
    id: 'sc-q19',
    level: 2,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_TREE_TRUNK,
    question: 'A fa törzse 1 négyzet széles és 3 négyzet magas. Milyen lesz a törzs a kétszeresére nagyított rajzon?',
    options: ['2 széles, 6 magas', '2 széles, 3 magas', '3 széles, 5 magas', '1 széles, 6 magas'],
    correctAnswer: 0,
    explanation: 'A szélességet és a magasságot is kétszerezzük: 1 · 2 = 2 és 3 · 2 = 6.'
  },
  {
    id: 'sc-q20',
    level: 2,
    questionTypeBadge: 'Hányszoros?',
    figure: FIG_SEG_2_TO_6,
    question: 'A kék szakasz 2 egység, a zöld 6 egység hosszú. Hányszorosára nagyították a kék szakaszt?',
    options: ['háromszorosára', 'négyszeresére', 'kétszeresére', 'hatszorosára'],
    correctAnswer: 0,
    explanation: '2 · 3 = 6, tehát háromszorosára nagyították. A „négyszeres” hibás: 6 − 2 = 4 a különbség, nem a szorzó.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'sc-q21',
    level: 3,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_L_SHAPE,
    question: 'Az L alakú rajz 4 kis négyzetből áll. Hány kis négyzetből áll a kétszeresére nagyított mása?',
    options: ['16', '8', '4', '12'],
    correctAnswer: 0,
    explanation: 'Minden kis négyzetből 2 · 2 = 4 kis négyzet lesz. 4 négyzet · 4 = 16 kis négyzet. Nem 8, mert a szélesség és a magasság is kétszeres!'
  },
  {
    id: 'sc-q22',
    level: 3,
    questionTypeBadge: 'Kerület',
    figure: FIG_RECT_8x4,
    question: 'Egy 8 cm hosszú és 4 cm széles téglalapot felére kicsinyítünk. Mekkora lesz a kicsinyített téglalap kerülete?',
    options: ['12 cm', '24 cm', '6 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'A kicsinyített téglalap 8 : 2 = 4 cm hosszú és 4 : 2 = 2 cm széles. Kerülete: 4 + 2 + 4 + 2 = 12 cm. (A 24 cm az eredeti kerülete.)'
  },
  {
    id: 'sc-q23',
    level: 3,
    questionTypeBadge: 'Kerület',
    figure: FIG_RECT_3x2_K,
    question: 'A 3 · 2-es téglalap kerülete 10 egység. Mekkora a kétszeresére nagyított téglalap kerülete?',
    options: ['20 egység', '18 egység', '40 egység', '12 egység'],
    correctAnswer: 0,
    explanation: 'A nagyított téglalap 6 · 4-es: 6 + 4 + 6 + 4 = 20 egység. Minden oldal kétszeres, ezért a kerület is kétszeres: 10 · 2 = 20. (A 18 az 5 · 4-es, hibásan „nagyított” téglalapé.)'
  },
  {
    id: 'sc-q24',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    figure: FIG_WRONG_SCALE,
    question: 'Az eredeti téglalap 4 · 2-es. Melyik rajzon végezték biztosan helytelenül a nagyítást vagy a kicsinyítést?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A: 2 · 1 (felére kicsinyítés), B: 8 · 4 (kétszeres nagyítás), D: 6 · 3 (4 → 6 és 2 → 3: mindkét méret másfélszeres, ez is hasonló). A C 6 · 2-es: a szélesség nőtt, a magasság maradt, így eltorzult.'
  },
  {
    id: 'sc-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_HOUSES_KATA,
    question: 'Kata kétszeresére nagyította az eredeti házat, az ő rajza 8 négyzet magas. Ábel a felére kicsinyítette az eredetit. Milyen magas Ábel háza?',
    options: ['2 négyzet', '4 négyzet', '6 négyzet', '16 négyzet'],
    correctAnswer: 0,
    explanation: 'Az eredeti ház 8 : 2 = 4 négyzet magas. Ábel ezt felezte: 4 : 2 = 2 négyzet. (A 4 az eredeti ház magassága.)'
  },
  {
    id: 'sc-q26',
    level: 3,
    questionTypeBadge: 'Két lépésben',
    question: 'Egy 2 egység hosszú szakaszt háromszorosára nagyítunk, majd az új szakaszt felére kicsinyítjük. Milyen hosszú lesz a végén?',
    options: ['3 egység', '6 egység', '1 egység', '5 egység'],
    correctAnswer: 0,
    explanation: 'Háromszorosára: 2 · 3 = 6 egység. Majd felére: 6 : 2 = 3 egység.'
  },
  {
    id: 'sc-q27',
    level: 3,
    questionTypeBadge: 'Lépéssor',
    figure: FIG_CODE_SQUARE,
    question: 'A 2→, 2↓, 2←, 2↑ lépéssor minden számához 2-t adunk. Hasonló lesz az új alakzat az eredetihez?',
    options: [
      'Igen, mert négyzetből négyzet lesz (4→, 4↓, 4←, 4↑).',
      'Nem, mert hozzáadni sosem szabad.',
      'Nem, mert téglalap lesz belőle.',
      'Igen, de csak akkor, ha 3-at adunk hozzá.'
    ],
    correctAnswer: 0,
    explanation: 'A négyzet minden oldala 2, mindegyikből 4 lesz: ez éppen kétszeres. Négyzetből négyzet lett, tehát hasonló. Téglalapnál ez nem működne!'
  },
  {
    id: 'sc-q28',
    level: 3,
    questionTypeBadge: 'Lépéssor',
    figure: FIG_RECT_2x1_GRID,
    question: 'Melyik lépéssor rajzolja meg a 2→, 1↓, 2←, 1↑ téglalap háromszorosára nagyított mását?',
    options: ['6→, 3↓, 6←, 3↑', '5→, 4↓, 5←, 4↑', '6→, 1↓, 6←, 1↑', '3→, 3↓, 3←, 3↑'],
    correctAnswer: 0,
    explanation: 'Minden számot 3-mal szorzunk: 2 · 3 = 6 és 1 · 3 = 3. Az 5→, 4↓ hibás: ott 3-at adtak hozzá.'
  },
  {
    id: 'sc-q29',
    level: 3,
    questionTypeBadge: 'Kicsinyítés',
    question: 'Egy 9 négyzet széles és 6 négyzet magas téglalapot harmadára kicsinyítünk. Milyen lesz a kicsinyített téglalap?',
    options: ['3 széles, 2 magas', '6 széles, 3 magas', '3 széles, 3 magas', '27 széles, 18 magas'],
    correctAnswer: 0,
    explanation: 'Harmadára kicsinyítés: minden méretet 3-mal osztunk. 9 : 3 = 3 és 6 : 3 = 2. (A 6 · 3 hibás, ott 3-at vontak ki.)'
  },
  {
    id: 'sc-q30',
    level: 3,
    questionTypeBadge: 'Négyzetháló',
    figure: FIG_SQ_2x2,
    question: 'A 2 · 2-es négyzetet háromszorosára nagyítjuk. Hány kis négyzetből áll a nagyított négyzet?',
    options: ['36', '12', '18', '24'],
    correctAnswer: 0,
    explanation: 'A nagyított négyzet oldala 2 · 3 = 6 kis négyzet. 6 · 6 = 36 kis négyzet. (A 12 akkor jönne ki, ha a 4 négyzetet csak 3-mal szoroznánk.)'
  }
];

export const Scaling4Quiz: React.FC<{
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
      topicId="g4-geom-nagyitas-quiz"
      subtopicId="nagyitas-kicsinyites"
      title="5. Nagyítás, kicsinyítés – Kvíz"
      subtitle="30 feladat 3 szinten: nagyítás és kicsinyítés a négyzethálón, hasonló alakzatok, lépéssorok."
      badge="4. OSZTÁLY • V. SÍKIDOMOK ÉS TESTEK • KVÍZ"
      questions={SCALING4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Nagyítás, kicsinyítés',
          items: [
            'Nagyítás: a kép nagyobb lesz (nagyító, vetítő, mikroszkóp).',
            'Kicsinyítés: a kép kisebb lesz (térkép, földgömb).',
            'Kétszeresére nagyítás: minden méret · 2.',
            'Felére kicsinyítés: minden méret : 2.'
          ]
        },
        {
          title: 'Hasonló alakzatok',
          items: [
            'Hasonló: ugyanolyan alakú, de nem ugyanakkora.',
            'MINDEN méret ugyanannyiszorosára változik.',
            'Hozzáadással (+2) a téglalap eltorzul!',
            '3 · 2 → 6 · 4 jó, 3 · 2 → 5 · 4 rossz.'
          ]
        },
        {
          title: 'Négyzetháló és lépéssor',
          items: [
            '1 kis négyzet kétszeresére: 2 · 2 = 4 kis négyzet.',
            'Háromszorosára: 3 · 3 = 9 kis négyzet.',
            'Lépéssornál csak a számok változnak, az irányok nem.',
            'j = jobbra, b = balra, f = fel, l = le; É, K, D, NY = világtájak.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Scaling4Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Scaling4Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Scaling4Quiz;
