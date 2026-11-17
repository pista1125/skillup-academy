import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MeasurementsExamG3Matcher } from './MeasurementsExamG3Matcher';
import { MeasurementsExamG3Sorter } from './MeasurementsExamG3Sorter';
import {
  FONT,
  INK,
  UNK,
  QFig,
  RectRight,
  Balance,
  PanItem,
  Dial,
  Jug,
  Ruler,
  GridShape,
  Cell,
  rectCells,
  Poly,
  Cards,
  ClockFace,
  StopwatchFace,
  DigitalFace,
  SunIcon,
  MonthGrid
} from './MeasurementsExamG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const BalQ: React.FC<{ left: PanItem[]; right: PanItem[]; tilt?: -1 | 0 | 1 }> = ({ left, right, tilt = 0 }) => (
  <QFig h={140}>
    <Balance cx={120} y={28} left={left} right={right} tilt={tilt} span={66} />
  </QFig>
);

const DialQ: React.FC<{ v: number; max?: number }> = ({ v, max = 100 }) => (
  <QFig h={160}>
    <rect x="60" y="130" width="120" height="18" rx="5" fill="#e2e8f0" stroke="#334155" strokeWidth="1.5" />
    <Dial cx={120} cy={76} r={62} value={v} max={max} step={5} labelEvery={10} fs={11} />
  </QFig>
);

const JugQ: React.FC<{ level: number; max?: number; labelAll?: boolean; q?: boolean }> = ({ level, max = 10, labelAll, q }) => (
  <QFig h={160}>
    <Jug x={100} y={14} h={136} w={58} level={level} max={max} labelAll={labelAll} q={q} />
  </QFig>
);

const RulerQ: React.FC<{ from: number; to: number }> = ({ from, to }) => (
  <QFig h={84}>
    <Ruler x={14} y={36} cm={10} pxPerCm={20.6} fromMm={from} toMm={to} />
  </QFig>
);

/** Négyzetrács egy vagy két alakzattal. */
const GridQ: React.FC<{ shapes: { cells: Cell[]; label?: string; fill?: string; stroke?: string }[]; cols: number; rows: number; s?: number; lines?: boolean }> = ({ shapes, cols, rows, s = 20, lines }) => {
  const n = shapes.length;
  const w = cols * s;
  const gap = 24;
  const total = n * w + (n - 1) * gap;
  const x0 = (240 - total) / 2;
  const h = rows * s + (shapes.some((sh) => sh.label) ? 44 : 28);
  return (
    <QFig h={h}>
      {shapes.map((sh, i) => (
        <GridShape key={i} x={x0 + i * (w + gap)} y={12} cols={cols} rows={rows} s={s} cells={sh.cells} label={sh.label} fill={sh.fill} stroke={sh.stroke} lines={lines} />
      ))}
    </QFig>
  );
};

/** Téglalap vagy négyzet oldalfeliratokkal (top: felső oldal, side: bal oldal). */
const RectQ: React.FC<{ w: number; h: number; top?: string; side?: string; square?: boolean; caption?: string; fill?: string }> = ({ w, h, top, side, square, caption, fill = '#bfdbfe' }) => {
  const x = (240 - w) / 2 + 10;
  const y = 26;
  const H = y + h + (caption ? 40 : 22);
  const tick = (x1: number, y1: number, x2: number, y2: number) => {
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    const vert = x1 === x2;
    return <line x1={vert ? mx - 5 : mx} y1={vert ? my : my - 5} x2={vert ? mx + 5 : mx} y2={vert ? my : my + 5} stroke={INK} strokeWidth="2" />;
  };
  return (
    <QFig h={H}>
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke="#1d4ed8" strokeWidth="2.5" />
      <RectRight x={x} y={y} w={w} h={h} r={9} />
      {square && (
        <>
          {tick(x, y, x + w, y)}
          {tick(x + w, y, x + w, y + h)}
          {tick(x, y + h, x + w, y + h)}
          {tick(x, y, x, y + h)}
        </>
      )}
      {top && (
        <text x={x + w / 2} y={y - 8} textAnchor="middle" fontSize="13" fontWeight="bold" fill={top.includes('?') ? UNK : INK}>{top}</text>
      )}
      {side && (
        <text x={x - 8} y={y + h / 2 + 5} textAnchor="end" fontSize="13" fontWeight="bold" fill={side.includes('?') ? UNK : INK}>{side}</text>
      )}
      {caption && (
        <text x="120" y={y + h + 26} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">{caption}</text>
      )}
    </QFig>
  );
};

const CardsQ: React.FC<{ items: string[] }> = ({ items }) => (
  <QFig h={80}>
    <Cards items={items} y={20} h={40} />
  </QFig>
);

const ClockQ: React.FC<{ h: number; m: number; sun?: boolean }> = ({ h, m, sun }) => (
  <QFig h={140}>
    {sun && (
      <g>
        <SunIcon cx={42} cy={58} r={12} />
        <text x="42" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#a16207">délután</text>
      </g>
    )}
    <ClockFace cx={sun ? 150 : 120} cy={70} r={60} h={h} m={m} />
  </QFig>
);

const TwoClocksQ: React.FC<{ h1: number; m1: number; h2: number; m2: number }> = ({ h1, m1, h2, m2 }) => (
  <QFig h={136}>
    <ClockFace cx={62} cy={62} r={48} h={h1} m={m1} />
    <ClockFace cx={178} cy={62} r={48} h={h2} m={m2} />
    <path d="M 114 62 L 126 62 M 120 55 L 127 62 L 120 69" fill="none" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="62" y="128" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={INK}>kezdés</text>
    <text x="178" y="128" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill={INK}>vége</text>
  </QFig>
);

const StopQ: React.FC<{ s: number }> = ({ s }) => (
  <QFig h={150}>
    <StopwatchFace cx={120} cy={86} r={54} s={s} />
  </QFig>
);

/** Mértékegység nélküli mennyiség: tárgy + "kb. 15 ?". */
const AppleQ: React.FC = () => (
  <QFig h={100}>
    <circle cx="80" cy="54" r="28" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" />
    <path d="M 80 26 q 4 -12 14 -14" stroke="#166534" strokeWidth="3.5" fill="none" />
    <ellipse cx="98" cy="22" rx="9" ry="5" fill="#22c55e" />
    <text x="170" y="62" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>kb. 15 <tspan fill={UNK}>?</tspan></text>
  </QFig>
);

/** Pohár '?' felirattal. */
const GlassQ: React.FC = () => (
  <QFig h={110}>
    <path d="M 95 18 L 145 18 L 138 94 L 102 94 Z" fill="#e0f2fe" stroke="#334155" strokeWidth="2.5" />
    <path d="M 99 40 L 141 40 L 138 94 L 102 94 Z" fill="#fb923c" opacity="0.8" />
    <text x="190" y="64" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Méterrúd 10 deciméteres csíkkal. */
const MeterQ: React.FC = () => (
  <QFig h={90}>
    <text x="120" y="22" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>1 m</text>
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={20 + i * 20} y="32" width="20" height="18" fill={i % 2 ? '#ffffff' : '#ef4444'} stroke="#334155" strokeWidth="1" />
    ))}
    <text x="120" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>? cm</text>
  </QFig>
);

/** 1 cm kinagyítva a mm-vonásokkal. */
const CmZoomQ: React.FC = () => (
  <QFig h={96}>
    <rect x="30" y="30" width="180" height="34" fill="#fef9c3" stroke="#a16207" strokeWidth="1.5" />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1={40 + i * 16} y1="30" x2={40 + i * 16} y2={i === 0 || i === 10 ? 52 : i === 5 ? 46 : 40} stroke={INK} strokeWidth={i === 0 || i === 10 ? 2 : 1.2} />
    ))}
    <text x="40" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>0</text>
    <text x="200" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>1 cm</text>
    <text x="120" y="86" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>1 cm = ? mm</text>
  </QFig>
);

/** Szalag, amelyből levágunk egy darabot. */
const RibbonQ: React.FC = () => (
  <QFig h={96}>
    <text x="120" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>2 m</text>
    <line x1="20" y1="30" x2="20" y2="38" stroke={INK} strokeWidth="1.5" />
    <line x1="220" y1="30" x2="220" y2="38" stroke={INK} strokeWidth="1.5" />
    <line x1="20" y1="34" x2="220" y2="34" stroke={INK} strokeWidth="1.2" />
    <rect x="20" y="44" width="125" height="20" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" />
    <rect x="149" y="44" width="71" height="20" fill="#fbcfe8" stroke="#9d174d" strokeWidth="1.5" strokeDasharray="4 3" />
    <text x="184" y="84" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#9d174d">levágod: 75 cm</text>
    <text x="82" y="84" textAnchor="middle" fontSize="14" fontWeight="bold" fill={UNK}>marad: ?</text>
  </QFig>
);

/** Könyvtorony. */
const BooksQ: React.FC<{ n: number; label: string }> = ({ n, label }) => {
  const cols = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7', '#14b8a6'];
  return (
    <QFig h={40 + n * 16}>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x="70" y={20 + i * 16} width="90" height="14" rx="2" fill={cols[i % cols.length]} stroke="#334155" strokeWidth="1" />
      ))}
      <text x="172" y={31} fontSize="12" fontWeight="bold" fill={INK}>{label}</text>
      <path d={`M 52 20 L 52 ${18 + n * 16}`} stroke={UNK} strokeWidth="2" />
      <text x="40" y={24 + n * 8} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

/** Polc könyvekkel. */
const ShelfQ: React.FC = () => (
  <QFig h={100}>
    <text x="120" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>1 m 20 cm</text>
    <line x1="20" y1="26" x2="220" y2="26" stroke={INK} strokeWidth="1.2" />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={22 + i * 13} y="34" width="11" height="40" fill={['#ef4444', '#3b82f6', '#22c55e'][i % 3]} stroke="#334155" strokeWidth="1" />
    ))}
    <text x="140" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>? könyv</text>
    <rect x="16" y="74" width="208" height="8" fill="#a16207" />
    <text x="48" y="96" textAnchor="middle" fontSize="11" fill="#334155">1 könyv: 4 cm</text>
  </QFig>
);

/** Kancsó és 4 pohár. */
const JugGlassesQ: React.FC = () => (
  <QFig h={150}>
    <Jug x={34} y={14} h={124} w={52} level={10} max={10} />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <path d={`M ${120 + i * 28} 92 L ${142 + i * 28} 92 L ${139 + i * 28} 128 L ${123 + i * 28} 128 Z`} fill="#fdba74" stroke="#334155" strokeWidth="1.5" />
        <text x={131 + i * 28} y="144" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={INK}>2 dl</text>
      </g>
    ))}
  </QFig>
);

/** Buszindulás + menetidő. */
const BusQ: React.FC = () => (
  <QFig h={100}>
    <text x="70" y="22" textAnchor="middle" fontSize="11.5" fill="#475569">indulás</text>
    <DigitalFace x={18} y={28} w={104} h={40} text="9:45" />
    <text x="178" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>az út: 50 perc</text>
    <text x="178" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>érkezés: ?</text>
  </QFig>
);

const CalQ: React.FC<{ title: string; days: number; startDow: number; marks?: Record<number, string> }> = ({ title, days, startDow, marks }) => (
  <QFig h={Math.round(16 + 28 * 1.7 + Math.ceil((startDow + days) / 7) * 28)}>
    <MonthGrid x={22} y={8} title={title} days={days} startDow={startDow} cell={28} marks={marks} />
  </QFig>
);

const range = (a: number, b: number, color: string) => {
  const o: Record<number, string> = {};
  for (let d = a; d <= b; d++) o[d] = color;
  return o;
};

// alakzatok
const L5: Cell[] = [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]];
const PLUS5: Cell[] = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]];
const T8: Cell[] = [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1], [1, 2], [2, 2]];
const L6: Cell[] = [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [3, 2]];
const LPER: Cell[] = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2]];
const SQ14: Cell[] = rectCells(4, 4).filter(([c, r]) => !(c === 3 && r < 2));
const EDGE95: Cell[] = [...rectCells(9, 1), ...rectCells(1, 4, 0, 1)];

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MEASUREMENTS_EXAM_G3_QUESTIONS: QuizQuestion[] = [
  // =========================== 1. szint ===========================
  {
    id: 'mexg3-q1',
    level: 1,
    questionTypeBadge: 'Mérőeszköz',
    question: 'Mivel méred meg a ceruzád hosszát?',
    options: ['vonalzóval', 'mérleggel', 'mérőpohárral', 'stopperrel'],
    correctAnswer: 0,
    explanation: 'A hosszúságot vonalzóval vagy mérőszalaggal mérjük.'
  },
  {
    id: 'mexg3-q2',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik mértékegységgel mérjük a tömeget?',
    options: ['kg', 'cm', 'dl', 'perc'],
    correctAnswer: 0,
    explanation: 'A tömeg mértékegysége a kilogramm (kg) és a dekagramm (dkg).'
  },
  {
    id: 'mexg3-q3',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Mit mérünk literrel?',
    options: ['űrtartalmat', 'hosszúságot', 'tömeget', 'időt'],
    correctAnswer: 0,
    explanation: 'Literrel (l), deciliterrel (dl) és centiliterrel (cl) azt mérjük, mennyi fér egy edénybe: az űrtartalmat.'
  },
  {
    id: 'mexg3-q4',
    level: 1,
    questionTypeBadge: 'Tömeg',
    figure: <BalQ left={[{ t: '1 kg' }]} right={[{ t: '?', kind: 'q' }]} />,
    question: 'A mérleg egyensúlyban van. Hány dkg van a másik serpenyőben?',
    options: ['100 dkg', '10 dkg', '1000 dkg', '1 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. Egyensúlynál a két oldal egyforma nehéz.'
  },
  {
    id: 'mexg3-q5',
    level: 1,
    questionTypeBadge: 'Mérleg',
    figure: <DialQ v={40} />,
    question: 'Hány dkg-ot mutat a konyhai mérleg?',
    options: ['40 dkg', '4 dkg', '50 dkg', '400 dkg'],
    correctAnswer: 0,
    explanation: 'A piros mutató a 40-nél áll: 40 dkg.'
  },
  {
    id: 'mexg3-q6',
    level: 1,
    questionTypeBadge: 'Mérleg',
    figure: <BalQ left={[{ t: 'körte', kind: 'box' }]} right={[{ t: 'szilva', kind: 'box' }]} tilt={-1} />,
    question: 'Melyik a nehezebb?',
    options: ['a körte', 'a szilva', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A nehezebb oldal lejjebb száll. A körte oldala van lent, tehát a körte a nehezebb.'
  },
  {
    id: 'mexg3-q7',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    figure: <BalQ left={[{ t: '1 kg' }, { t: '1 kg' }]} right={[{ t: '? dkg', kind: 'q' }]} />,
    question: '2 kg = ? dkg',
    options: ['200 dkg', '20 dkg', '2000 dkg', '102 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg, így 2 kg = 100 + 100 = 200 dkg.'
  },
  {
    id: 'mexg3-q8',
    level: 1,
    questionTypeBadge: 'Űrtartalom',
    figure: <JugQ level={3} labelAll />,
    question: 'Hány dl víz van a mérőkancsóban?',
    options: ['3 dl', '3 l', '30 dl', '4 dl'],
    correctAnswer: 0,
    explanation: 'A víz teteje a 3 dl-es vonalnál van.'
  },
  {
    id: 'mexg3-q9',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '1 l = ? dl',
    options: ['10 dl', '100 dl', '1 dl', '5 dl'],
    correctAnswer: 0,
    explanation: '1 literes üveget 10 deciliteres pohárral tudsz megtölteni: 1 l = 10 dl.'
  },
  {
    id: 'mexg3-q10',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '1 dl = ? cl',
    options: ['10 cl', '100 cl', '1 cl', '60 cl'],
    correctAnswer: 0,
    explanation: '1 dl = 10 cl. (És 1 l = 100 cl.)'
  },
  {
    id: 'mexg3-q11',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <GlassQ />,
    question: 'Körülbelül mennyi üdítő fér egy pohárba?',
    options: ['2 dl', '2 l', '20 l', '2 cl'],
    correctAnswer: 0,
    explanation: 'Egy pohárba kb. 2 dl fér. 2 l egy nagy palack, 2 cl csak egy korty.'
  },
  {
    id: 'mexg3-q12',
    level: 1,
    questionTypeBadge: 'Vonalzó',
    figure: <RulerQ from={0} to={60} />,
    question: 'Milyen hosszú a kék szakasz?',
    options: ['6 cm', '6 mm', '7 cm', '60 cm'],
    correctAnswer: 0,
    explanation: 'A szakasz a 0-nál kezdődik és a 6-nál végződik: 6 cm.'
  },
  {
    id: 'mexg3-q13',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    figure: <MeterQ />,
    question: '1 m = ? cm',
    options: ['100 cm', '10 cm', '1000 cm', '60 cm'],
    correctAnswer: 0,
    explanation: '1 m = 10 dm, és 1 dm = 10 cm. Tehát 1 m = 100 cm.'
  },
  {
    id: 'mexg3-q14',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    figure: <CmZoomQ />,
    question: '1 cm = ? mm',
    options: ['10 mm', '100 mm', '1 mm', '60 mm'],
    correctAnswer: 0,
    explanation: 'A vonalzón 1 cm-t 10 kis részre osztottak. Egy kis rész 1 mm. 1 cm = 10 mm.'
  },
  {
    id: 'mexg3-q15',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik egységgel mérnéd az osztályterem hosszát?',
    options: ['méterrel', 'milliméterrel', 'literrel', 'dekagrammal'],
    correctAnswer: 0,
    explanation: 'A terem hosszú, ezért méterrel (m) mérjük. A milliméter nagyon kicsi egység.'
  },
  {
    id: 'mexg3-q16',
    level: 1,
    questionTypeBadge: 'Kerület',
    figure: (
      <QFig h={140}>
        <Poly pts={[[70, 112], [150, 112], [70, 52]]} labels={['4 cm', '5 cm', '3 cm']} right={[0]} />
      </QFig>
    ),
    question: 'Mennyi a háromszög kerülete?',
    options: ['12 cm', '7 cm', '9 cm', '60 cm'],
    correctAnswer: 0,
    explanation: 'A kerület a három oldal összege: 3 + 4 + 5 = 12 cm.'
  },
  {
    id: 'mexg3-q17',
    level: 1,
    questionTypeBadge: 'Kerület',
    question: 'Mi a síkidom kerülete?',
    options: ['a síkidomot határoló vonalak hossza', 'a síkidom belseje', 'a leghosszabb oldala', 'a csúcsainak száma'],
    correctAnswer: 0,
    explanation: 'A kerület a síkidomot határoló vonalak hossza: körbejárjuk a szélét.'
  },
  {
    id: 'mexg3-q18',
    level: 1,
    questionTypeBadge: 'Kerület',
    figure: <GridQ cols={5} rows={3} shapes={[{ cells: rectCells(3, 2, 1, 0) }]} />,
    question: 'Hány egység a zöld téglalap kerülete? (1 egység = 1 kis négyzet oldala)',
    options: ['10 egység', '6 egység', '5 egység', '12 egység'],
    correctAnswer: 0,
    explanation: 'Járd körbe: 3 + 2 + 3 + 2 = 10 egység. A 6 a kis négyzetek száma – az a terület!'
  },
  {
    id: 'mexg3-q19',
    level: 1,
    questionTypeBadge: 'Négyzet kerülete',
    figure: <RectQ w={80} h={80} top="4 cm" square />,
    question: 'A négyzet oldala 4 cm. Mennyi a kerülete?',
    options: ['16 cm', '8 cm', '4 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'A négyzet 4 oldala egyenlő: 4 + 4 + 4 + 4 = 16 cm, vagy 4 · 4 = 16 cm.'
  },
  {
    id: 'mexg3-q20',
    level: 1,
    questionTypeBadge: 'Téglalap kerülete',
    figure: <RectQ w={130} h={52} top="5 cm" side="2 cm" />,
    question: 'Mennyi a téglalap kerülete?',
    options: ['14 cm', '7 cm', '10 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'A szemben lévő oldalak egyenlők: 5 + 2 + 5 + 2 = 14 cm. (A 7 csak két oldal!)'
  },
  {
    id: 'mexg3-q21',
    level: 1,
    questionTypeBadge: 'Téglalap',
    question: 'Melyik igaz minden téglalapra?',
    options: ['A szemben lévő oldalai egyenlők.', 'Minden oldala különböző.', '3 oldala van.', 'Nincs derékszöge.'],
    correctAnswer: 0,
    explanation: 'A téglalap szemben lévő oldalai egyenlő hosszúak, és mind a 4 szöge derékszög.'
  },
  {
    id: 'mexg3-q22',
    level: 1,
    questionTypeBadge: 'Terület',
    figure: <GridQ cols={5} rows={3} shapes={[{ cells: L5.map(([c, r]) => [c + 1, r] as Cell) }]} />,
    question: 'Hány kis négyzet fedi le a síkidomot?',
    options: ['5 kis négyzet', '4 kis négyzet', '6 kis négyzet', '12 kis négyzet'],
    correctAnswer: 0,
    explanation: 'Számold meg a zöld kis négyzeteket: 5 darab.'
  },
  {
    id: 'mexg3-q23',
    level: 1,
    questionTypeBadge: 'Terület',
    figure: <GridQ cols={3} rows={3} shapes={[{ cells: rectCells(2, 3), label: 'A' }, { cells: PLUS5, label: 'B', fill: '#fdba74', stroke: '#9a3412' }]} />,
    question: 'Melyik síkidom területe nagyobb?',
    options: ['az A-é', 'a B-é', 'egyforma', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Az A-t 6, a B-t 5 kis négyzet fedi le. 6 > 5, tehát az A területe nagyobb.'
  },
  {
    id: 'mexg3-q24',
    level: 1,
    questionTypeBadge: 'Terület',
    question: 'Mit mutat meg a síkidom területe?',
    options: ['mekkora helyet foglal el', 'milyen hosszú a széle', 'hány csúcsa van', 'milyen nehéz'],
    correctAnswer: 0,
    explanation: 'A terület azt mutatja meg, mekkora helyet foglal el a síkidom. Egységekkel fedjük le.'
  },
  {
    id: 'mexg3-q25',
    level: 1,
    questionTypeBadge: 'Téglalap területe',
    figure: <GridQ cols={4} rows={2} shapes={[{ cells: rectCells(4, 2), fill: '#93c5fd', stroke: '#1d4ed8' }]} s={26} />,
    question: 'Hány kis négyzetből áll a téglalap?',
    options: ['8', '6', '12', '10'],
    correctAnswer: 0,
    explanation: '2 sor, mindegyikben 4 kis négyzet: 2 · 4 = 8.'
  },
  {
    id: 'mexg3-q26',
    level: 1,
    questionTypeBadge: 'Négyzet területe',
    figure: <GridQ cols={3} rows={3} shapes={[{ cells: rectCells(3, 3), fill: '#fde047', stroke: '#854d0e' }]} s={26} />,
    question: 'Hány kis négyzetből áll a négyzet?',
    options: ['9', '6', '12', '3'],
    correctAnswer: 0,
    explanation: '3 sor, mindegyikben 3 kis négyzet: 3 · 3 = 9.'
  },
  {
    id: 'mexg3-q27',
    level: 1,
    questionTypeBadge: 'Téglalap területe',
    figure: <GridQ cols={5} rows={2} shapes={[{ cells: rectCells(5, 2), fill: '#d8b4fe', stroke: '#6b21a8' }]} s={26} />,
    question: '2 sor, soronként 5 kis négyzet. Hány kis négyzet ez összesen?',
    options: ['10', '7', '14', '25'],
    correctAnswer: 0,
    explanation: '2 · 5 = 10. (2 + 5 = 7 hibás: nem összeadunk, hanem szorzunk.)'
  },
  {
    id: 'mexg3-q28',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQ h={3} m={30} />,
    question: 'Mennyi időt mutat az óra?',
    options: ['fél 4', 'fél 3', 'háromnegyed 4', 'negyed 4'],
    correctAnswer: 0,
    explanation: 'A nagymutató a 6-on: fél. A kismutató a 3 és a 4 között: fél 4 (3 óra 30 perc).'
  },
  {
    id: 'mexg3-q29',
    level: 1,
    questionTypeBadge: 'Idő',
    question: '1 óra = ? perc',
    options: ['60 perc', '100 perc', '24 perc', '30 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. Ennyi idő alatt a nagymutató egyszer körbeér.'
  },
  {
    id: 'mexg3-q30',
    level: 1,
    questionTypeBadge: 'Idő',
    question: '1 perc = ? másodperc',
    options: ['60 másodperc', '100 másodperc', '10 másodperc', '30 másodperc'],
    correctAnswer: 0,
    explanation: '1 perc = 60 másodperc. A másodpercmutató ennyi idő alatt ér körbe.'
  },

  // =========================== 2. szint ===========================
  {
    id: 'mexg3-q31',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: <DialQ v={75} />,
    question: 'Hány dkg-ot mutat a mérleg?',
    options: ['75 dkg', '70 dkg', '85 dkg', '57 dkg'],
    correctAnswer: 0,
    explanation: 'A mutató a 70 és a 80 között, éppen középen áll: 75 dkg.'
  },
  {
    id: 'mexg3-q32',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '1 kg 35 dkg = ? dkg',
    options: ['135 dkg', '1035 dkg', '36 dkg', '45 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. 100 + 35 = 135 dkg.'
  },
  {
    id: 'mexg3-q33',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: <BalQ left={[{ t: '1 kg' }]} right={[{ t: '50 dkg' }, { t: '20 dkg' }, { t: '?', kind: 'q' }]} />,
    question: 'A mérleg egyensúlyban van. Hány dkg-os súly hiányzik?',
    options: ['30 dkg', '70 dkg', '130 dkg', '20 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. A jobb oldalon már 50 + 20 = 70 dkg van. 100 − 70 = 30 dkg hiányzik.'
  },
  {
    id: 'mexg3-q34',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '160 dkg = ? kg ? dkg',
    options: ['1 kg 60 dkg', '16 kg', '1 kg 6 dkg', '16 kg 0 dkg'],
    correctAnswer: 0,
    explanation: '100 dkg = 1 kg. 160 − 100 = 60. Tehát 160 dkg = 1 kg 60 dkg.'
  },
  {
    id: 'mexg3-q35',
    level: 2,
    questionTypeBadge: 'Űrtartalom',
    figure: <JugQ level={7} />,
    question: 'Mennyi víz hiányzik még, hogy 1 l legyen a kancsóban?',
    options: ['3 dl', '7 dl', '30 dl', '13 dl'],
    correctAnswer: 0,
    explanation: 'A kancsóban 7 dl van. 1 l = 10 dl. 10 − 7 = 3 dl hiányzik.'
  },
  {
    id: 'mexg3-q36',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '1 l 4 dl = ? dl',
    options: ['14 dl', '140 dl', '5 dl', '104 dl'],
    correctAnswer: 0,
    explanation: '1 l = 10 dl. 10 + 4 = 14 dl.'
  },
  {
    id: 'mexg3-q37',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '60 cl = ? dl',
    options: ['6 dl', '60 dl', '600 dl', '16 dl'],
    correctAnswer: 0,
    explanation: '10 cl = 1 dl. 60 cl-ben 6-szor van meg a 10 cl: 6 dl.'
  },
  {
    id: 'mexg3-q38',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CardsQ items={['8 dl', '1 l', '90 cl']} />,
    question: 'Melyik a legtöbb?',
    options: ['1 l', '90 cl', '8 dl', 'mind egyforma'],
    correctAnswer: 0,
    explanation: 'Váltsd át cl-re: 8 dl = 80 cl, 1 l = 100 cl, 90 cl. A legtöbb az 1 l.'
  },
  {
    id: 'mexg3-q39',
    level: 2,
    questionTypeBadge: 'Vonalzó',
    figure: <RulerQ from={20} to={70} />,
    question: 'Milyen hosszú a kék szakasz?',
    options: ['5 cm', '7 cm', '9 cm', '2 cm'],
    correctAnswer: 0,
    explanation: 'A szakasz nem a 0-nál kezdődik! A vége 7, az eleje 2: 7 − 2 = 5 cm.'
  },
  {
    id: 'mexg3-q40',
    level: 2,
    questionTypeBadge: 'Vonalzó',
    figure: <RulerQ from={0} to={47} />,
    question: 'Hány mm hosszú a kék szakasz?',
    options: ['47 mm', '4 mm', '74 mm', '407 mm'],
    correctAnswer: 0,
    explanation: '4 egész cm és még 7 kis vonás: 4 cm 7 mm = 40 + 7 = 47 mm.'
  },
  {
    id: 'mexg3-q41',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '2 m 35 cm = ? cm',
    options: ['235 cm', '2035 cm', '37 cm', '253 cm'],
    correctAnswer: 0,
    explanation: '2 m = 200 cm. 200 + 35 = 235 cm.'
  },
  {
    id: 'mexg3-q42',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '3 dm = ? cm',
    options: ['30 cm', '3 cm', '300 cm', '13 cm'],
    correctAnswer: 0,
    explanation: '1 dm = 10 cm, ezért 3 dm = 30 cm.'
  },
  {
    id: 'mexg3-q43',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: (
      <QFig h={140}>
        <Poly pts={[[66, 112], [174, 112], [120, 40], [66, 40]]} labels={['6 cm', '5 cm', '3 cm', '4 cm']} right={[0, 3]} fill="#fde68a" stroke="#a16207" />
      </QFig>
    ),
    question: 'Mennyi a négyszög kerülete?',
    options: ['18 cm', '15 cm', '14 cm', '13 cm'],
    correctAnswer: 0,
    explanation: 'Add össze mind a 4 oldalt: 6 + 5 + 3 + 4 = 18 cm.'
  },
  {
    id: 'mexg3-q44',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <GridQ cols={5} rows={3} shapes={[{ cells: LPER.map(([c, r]) => [c + 1, r] as Cell), fill: '#fdba74', stroke: '#9a3412' }]} />,
    question: 'Hány egység a síkidom kerülete?',
    options: ['12 egység', '5 egység', '10 egység', '14 egység'],
    correctAnswer: 0,
    explanation: 'Járd körbe a szélét, és számold a kis szakaszokat: 12 egység. Az 5 a kis négyzetek száma.'
  },
  {
    id: 'mexg3-q45',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: (
      <QFig h={134}>
        <Poly pts={[[120, 24], [176, 116], [64, 116]]} labels={['8 cm', '8 cm', '8 cm']} fill="#bbf7d0" stroke="#15803d" />
      </QFig>
    ),
    question: 'A háromszög minden oldala 8 cm. Mennyi a kerülete?',
    options: ['24 cm', '16 cm', '8 cm', '32 cm'],
    correctAnswer: 0,
    explanation: '3 egyforma oldal: 8 + 8 + 8 = 24 cm, vagy 3 · 8 = 24 cm.'
  },
  {
    id: 'mexg3-q46',
    level: 2,
    questionTypeBadge: 'Téglalap kerülete',
    figure: <RectQ w={150} h={56} top="8 m" side="3 m" fill="#bbf7d0" caption="kert" />,
    question: 'Hány méter kerítés kell a kert körbekerítéséhez?',
    options: ['22 m', '11 m', '24 m', '16 m'],
    correctAnswer: 0,
    explanation: 'A szemben lévő oldalak egyenlők: 8 + 3 + 8 + 3 = 22 m.'
  },
  {
    id: 'mexg3-q47',
    level: 2,
    questionTypeBadge: 'Négyzet kerülete',
    figure: <RectQ w={84} h={84} top="25 cm" square fill="#fde68a" />,
    question: 'Mennyi a négyzet kerülete?',
    options: ['100 cm', '50 cm', '75 cm', '125 cm'],
    correctAnswer: 0,
    explanation: '4 egyforma oldal: 25 + 25 + 25 + 25 = 100 cm, azaz 1 m.'
  },
  {
    id: 'mexg3-q48',
    level: 2,
    questionTypeBadge: 'Téglalap kerülete',
    figure: <RectQ w={150} h={60} top="1 m" side="40 cm" fill="#e9d5ff" />,
    question: 'Mennyi a téglalap kerülete centiméterben?',
    options: ['280 cm', '82 cm', '140 cm', '180 cm'],
    correctAnswer: 0,
    explanation: 'Előbb válts át: 1 m = 100 cm. 100 + 40 + 100 + 40 = 280 cm.'
  },
  {
    id: 'mexg3-q49',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: <GridQ cols={6} rows={3} shapes={[{ cells: T8.map(([c, r]) => [c + 1, r] as Cell), fill: '#7dd3fc', stroke: '#075985' }]} />,
    question: 'Hány kis négyzet a síkidom területe?',
    options: ['8 kis négyzet', '7 kis négyzet', '9 kis négyzet', '14 kis négyzet'],
    correctAnswer: 0,
    explanation: 'Fent 4, a második sorban 2, a harmadikban 2: 4 + 2 + 2 = 8 kis négyzet.'
  },
  {
    id: 'mexg3-q50',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: (
      <QFig h={108}>
        <GridShape x={30} y={16} cols={3} rows={2} s={28} cells={rectCells(3, 2)} fill="#fde047" stroke="#854d0e" />
        <rect x="160" y="30" width="56" height="28" fill="#f9a8d4" stroke="#9d174d" strokeWidth="2.5" />
        <line x1="188" y1="30" x2="188" y2="58" stroke="#9d174d" strokeWidth="1" strokeDasharray="3 2" />
        <text x="188" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9d174d">egység: dominó</text>
      </QFig>
    ),
    question: 'Az egység most a dominó (2 kis négyzet). Hány dominó fedi le a sárga téglalapot?',
    options: ['3', '6', '2', '5'],
    correctAnswer: 0,
    explanation: 'A téglalapban 6 kis négyzet van. Egy dominó 2 kis négyzet, ezért 3 dominó kell.'
  },
  {
    id: 'mexg3-q51',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: <GridQ cols={4} rows={3} shapes={[{ cells: rectCells(2, 3, 1, 0), label: 'A' }, { cells: L6, label: 'B', fill: '#fdba74', stroke: '#9a3412' }]} />,
    question: 'Mit mondhatsz a két síkidom területéről?',
    options: ['egyforma', 'az A-é nagyobb', 'a B-é nagyobb', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Mindkettőt 6 kis négyzet fedi le. Más az alakjuk, de a területük egyforma.'
  },
  {
    id: 'mexg3-q52',
    level: 2,
    questionTypeBadge: 'Téglalap területe',
    figure: <GridQ cols={5} rows={3} shapes={[{ cells: rectCells(5, 3), fill: '#93c5fd', stroke: '#1d4ed8' }]} s={24} />,
    question: 'Hány kis négyzet a téglalap területe?',
    options: ['15', '8', '16', '12'],
    correctAnswer: 0,
    explanation: '3 sor, soronként 5: 3 · 5 = 15. (A 16 a kerület, a 8 = 5 + 3.)'
  },
  {
    id: 'mexg3-q53',
    level: 2,
    questionTypeBadge: 'Téglalap területe',
    figure: <GridQ cols={7} rows={4} shapes={[{ cells: [...rectCells(7, 1), ...rectCells(1, 3, 0, 1)], fill: '#fca5a5', stroke: '#991b1b' }]} s={22} />,
    question: 'A járdát 4 sorban rakják ki, soronként 7 lappal. Hány lap kell?',
    options: ['28', '11', '22', '47'],
    correctAnswer: 0,
    explanation: '4 sor, mindegyikben 7 lap: 4 · 7 = 28 lap.'
  },
  {
    id: 'mexg3-q54',
    level: 2,
    questionTypeBadge: 'Négyzet területe',
    figure: <GridQ cols={4} rows={4} shapes={[{ cells: rectCells(4, 4), fill: '#bbf7d0', stroke: '#15803d' }]} s={24} />,
    question: 'A négyzet oldala 4 egység. Hány kis négyzet a területe?',
    options: ['16', '8', '12', '4'],
    correctAnswer: 0,
    explanation: '4 sor, soronként 4: 4 · 4 = 16 kis négyzet.'
  },
  {
    id: 'mexg3-q55',
    level: 2,
    questionTypeBadge: 'Pontos idő',
    figure: <ClockQ h={6} m={20} />,
    question: 'Hány óra hány perc van?',
    options: ['6 óra 20 perc', '4 óra 30 perc', '6 óra 4 perc', '5 óra 20 perc'],
    correctAnswer: 0,
    explanation: 'A kismutató elhagyta a 6-ot: 6 óra. A nagymutató a 4-en: 4 · 5 = 20 perc.'
  },
  {
    id: 'mexg3-q56',
    level: 2,
    questionTypeBadge: 'Napszak',
    figure: <ClockQ h={3} m={45} sun />,
    question: 'Délután van. Melyik a napszaknak megfelelő időpont?',
    options: ['15:45', '3:45', '13:45', '15:09'],
    correctAnswer: 0,
    explanation: 'Az óra 3 óra 45 percet mutat. Délután 12-t hozzáadunk: 3 + 12 = 15. Tehát 15:45.'
  },
  {
    id: 'mexg3-q57',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: '1 óra 20 perc = ? perc',
    options: ['80 perc', '120 perc', '70 perc', '100 perc'],
    correctAnswer: 0,
    explanation: '1 óra = 60 perc. 60 + 20 = 80 perc.'
  },
  {
    id: 'mexg3-q58',
    level: 2,
    questionTypeBadge: 'Stopper',
    figure: <StopQ s={35} />,
    question: 'A stopper ennyit mutat. Mennyi hiányzik még 1 percig?',
    options: ['25 másodperc', '35 másodperc', '65 másodperc', '15 másodperc'],
    correctAnswer: 0,
    explanation: '1 perc = 60 másodperc. 60 − 35 = 25 másodperc.'
  },
  {
    id: 'mexg3-q59',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CardsQ items={['1 m', '9 dm', '95 cm']} />,
    question: 'Melyik a leghosszabb?',
    options: ['1 m', '95 cm', '9 dm', 'mind egyforma'],
    correctAnswer: 0,
    explanation: 'Váltsd át cm-re: 1 m = 100 cm, 9 dm = 90 cm, 95 cm. A leghosszabb az 1 m.'
  },
  {
    id: 'mexg3-q60',
    level: 2,
    questionTypeBadge: 'Mértékegység',
    figure: <AppleQ />,
    question: 'Egy alma tömege kb. 15 … Melyik mértékegység illik ide?',
    options: ['dkg', 'kg', 'cl', 'cm'],
    correctAnswer: 0,
    explanation: 'Egy alma kb. 15 dkg. 15 kg egy nagy zsák lenne!'
  },

  // =========================== 3. szint ===========================
  {
    id: 'mexg3-q61',
    level: 3,
    questionTypeBadge: 'Tömeg',
    question: 'A táska 5 dkg. Beleteszel 1 kg almát és 40 dkg sajtot. Milyen nehéz így a táska?',
    options: ['1 kg 45 dkg', '46 dkg', '1 kg 40 dkg', '145 kg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. 100 + 40 + 5 = 145 dkg = 1 kg 45 dkg. A táskát is számold!'
  },
  {
    id: 'mexg3-q62',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: <BalQ left={[{ t: '', kind: 'apple' }, { t: '', kind: 'apple' }, { t: '', kind: 'apple' }]} right={[{ t: '60 dkg' }]} />,
    question: 'A 3 alma egyforma, a mérleg egyensúlyban van. Hány dkg egy alma?',
    options: ['20 dkg', '60 dkg', '180 dkg', '30 dkg'],
    correctAnswer: 0,
    explanation: '3 alma = 60 dkg. 60 : 3 = 20, tehát egy alma 20 dkg.'
  },
  {
    id: 'mexg3-q63',
    level: 3,
    questionTypeBadge: 'Tömeg',
    question: 'A dobozban 1 kg 25 dkg liszt van. Mennyi hiányzik 2 kg-hoz?',
    options: ['75 dkg', '85 dkg', '1 kg 75 dkg', '125 dkg'],
    correctAnswer: 0,
    explanation: '2 kg = 200 dkg, 1 kg 25 dkg = 125 dkg. 200 − 125 = 75 dkg.'
  },
  {
    id: 'mexg3-q64',
    level: 3,
    questionTypeBadge: 'Sorrend',
    figure: <CardsQ items={['1 kg 5 dkg', '110 dkg', '98 dkg']} />,
    question: 'Melyik a helyes növekvő sorrend?',
    options: ['98 dkg, 1 kg 5 dkg, 110 dkg', '1 kg 5 dkg, 98 dkg, 110 dkg', '110 dkg, 98 dkg, 1 kg 5 dkg', '98 dkg, 110 dkg, 1 kg 5 dkg'],
    correctAnswer: 0,
    explanation: 'Váltsd át: 1 kg 5 dkg = 105 dkg. Sorban: 98 < 105 < 110.'
  },
  {
    id: 'mexg3-q65',
    level: 3,
    questionTypeBadge: 'Űrtartalom',
    figure: <JugGlassesQ />,
    question: 'Az 1 l szörpből 4 pohárba töltesz, mindegyikbe 2 dl-t. Mennyi marad a kancsóban?',
    options: ['2 dl', '8 dl', '6 dl', '9 dl'],
    correctAnswer: 0,
    explanation: '4 · 2 dl = 8 dl. 1 l = 10 dl. 10 − 8 = 2 dl marad.'
  },
  {
    id: 'mexg3-q66',
    level: 3,
    questionTypeBadge: 'Űrtartalom',
    question: 'Egy kis mérőpohárba 5 cl fér. Hányszor kell megtöltened, hogy 1 dl legyen?',
    options: ['2-szer', '5-ször', '10-szer', '20-szor'],
    correctAnswer: 0,
    explanation: '1 dl = 10 cl. 5 cl + 5 cl = 10 cl, tehát 2-szer.'
  },
  {
    id: 'mexg3-q67',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    figure: <JugQ level={12} max={15} />,
    question: 'Hány cl víz van a kancsóban?',
    options: ['120 cl', '12 cl', '102 cl', '1200 cl'],
    correctAnswer: 0,
    explanation: 'A víz 1 l fölött még 2 vonással van: 1 l 2 dl. 1 l = 100 cl, 2 dl = 20 cl. 100 + 20 = 120 cl.'
  },
  {
    id: 'mexg3-q68',
    level: 3,
    questionTypeBadge: 'Űrtartalom',
    question: '3 üvegben egyenként 25 cl üdítő van. Mennyi ez összesen?',
    options: ['75 cl', '28 cl', '50 cl', '1 l'],
    correctAnswer: 0,
    explanation: '3 · 25 cl = 75 cl. Ez kevesebb, mint 1 l (100 cl).'
  },
  {
    id: 'mexg3-q69',
    level: 3,
    questionTypeBadge: 'Hosszúság',
    figure: <RibbonQ />,
    question: 'A 2 m-es szalagból levágsz 75 cm-t. Mennyi marad?',
    options: ['1 m 25 cm', '1 m 75 cm', '73 cm', '2 m 75 cm'],
    correctAnswer: 0,
    explanation: '2 m = 200 cm. 200 − 75 = 125 cm = 1 m 25 cm.'
  },
  {
    id: 'mexg3-q70',
    level: 3,
    questionTypeBadge: 'Hosszúság',
    figure: <BooksQ n={6} label="1 könyv: 15 mm" />,
    question: 'Egy könyv 15 mm vastag. Milyen magas a 6 könyvből álló torony?',
    options: ['9 cm', '90 cm', '21 mm', '6 cm'],
    correctAnswer: 0,
    explanation: '6 · 15 mm = 90 mm. 10 mm = 1 cm, ezért 90 mm = 9 cm.'
  },
  {
    id: 'mexg3-q71',
    level: 3,
    questionTypeBadge: 'Hosszúság',
    question: 'A csiga előbb 3 cm 5 mm-t mászott, aztán még 2 cm 8 mm-t. Mennyit mászott összesen?',
    options: ['6 cm 3 mm', '5 cm 3 mm', '63 cm', '6 cm 13 mm'],
    correctAnswer: 0,
    explanation: 'Válts mm-re: 35 mm + 28 mm = 63 mm = 6 cm 3 mm.'
  },
  {
    id: 'mexg3-q72',
    level: 3,
    questionTypeBadge: 'Vonalzó',
    figure: <RulerQ from={32} to={80} />,
    question: 'Milyen hosszú a kék szakasz?',
    options: ['4 cm 8 mm', '8 cm', '5 cm 2 mm', '11 cm 2 mm'],
    correctAnswer: 0,
    explanation: 'A vége 8 cm = 80 mm, az eleje 3 cm 2 mm = 32 mm. 80 − 32 = 48 mm = 4 cm 8 mm.'
  },
  {
    id: 'mexg3-q73',
    level: 3,
    questionTypeBadge: 'Kerület',
    figure: (
      <QFig h={156}>
        <Poly
          pts={[[56, 22], [176, 22], [176, 58], [128, 58], [128, 130], [56, 130]]}
          labels={['10 m', '3 m', '4 m', '6 m', '6 m', '9 m']}
          right={[0, 1, 2, 4, 5]}
          fill="#bbf7d0"
          stroke="#15803d"
        />
      </QFig>
    ),
    question: 'Hány méter kerítés kell a kert körbekerítéséhez?',
    options: ['38 m', '32 m', '34 m', '28 m'],
    correctAnswer: 0,
    explanation: 'Mind a 6 oldalt add össze: 10 + 3 + 4 + 6 + 6 + 9 = 38 m. A kis oldalakat se hagyd ki!'
  },
  {
    id: 'mexg3-q74',
    level: 3,
    questionTypeBadge: 'Hiányzó oldal',
    figure: (
      <QFig h={150}>
        <Poly pts={[[40, 104], [202, 104], [132, 47]]} labels={['9 cm', '?', '6 cm']} fill="#fde68a" stroke="#a16207" />
        <text x="120" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">kerülete 20 cm</text>
      </QFig>
    ),
    question: 'A háromszög kerülete 20 cm. Milyen hosszú a harmadik oldala?',
    options: ['5 cm', '15 cm', '35 cm', '3 cm'],
    correctAnswer: 0,
    explanation: 'A két ismert oldal: 9 + 6 = 15 cm. 20 − 15 = 5 cm.'
  },
  {
    id: 'mexg3-q75',
    level: 3,
    questionTypeBadge: 'Négyzet kerülete',
    figure: <RectQ w={84} h={84} top="?" square caption="kerülete 32 cm" fill="#fef3c7" />,
    question: 'A négyzetet 4 egyforma pálcikából raktad ki. A kerülete 32 cm. Milyen hosszú egy pálcika?',
    options: ['8 cm', '28 cm', '36 cm', '16 cm'],
    correctAnswer: 0,
    explanation: '4 egyforma oldal együtt 32 cm. 32 : 4 = 8 cm.'
  },
  {
    id: 'mexg3-q76',
    level: 3,
    questionTypeBadge: 'Téglalap kerülete',
    figure: <RectQ w={156} h={70} top="12 m" side="7 m" fill="#7dd3fc" caption="medence" />,
    question: 'Kétszer körbesétálod a medencét. Hány métert teszel meg?',
    options: ['76 m', '38 m', '19 m', '84 m'],
    correctAnswer: 0,
    explanation: 'Egy kör: 12 + 7 + 12 + 7 = 38 m. Két kör: 38 + 38 = 76 m.'
  },
  {
    id: 'mexg3-q77',
    level: 3,
    questionTypeBadge: 'Négyzet kerülete',
    figure: <RectQ w={84} h={84} top="135 cm" square fill="#fbcfe8" caption="virágágyás" />,
    question: 'Hány cm szegély kell a négyzet alakú ágyás körbekerítéséhez?',
    options: ['540 cm', '270 cm', '405 cm', '139 cm'],
    correctAnswer: 0,
    explanation: '4 egyforma oldal: 4 · 135 = 540 cm. (135 + 135 = 270, ez csak 2 oldal.)'
  },
  {
    id: 'mexg3-q78',
    level: 3,
    questionTypeBadge: 'Hiányzó oldal',
    figure: <RectQ w={150} h={60} top="10 cm" side="?" caption="kerülete 30 cm" fill="#e9d5ff" />,
    question: 'A téglalap kerülete 30 cm, a hosszabb oldala 10 cm. Milyen hosszú a rövidebb oldala?',
    options: ['5 cm', '20 cm', '10 cm', '15 cm'],
    correctAnswer: 0,
    explanation: 'A két hosszú oldal: 10 + 10 = 20 cm. Marad 30 − 20 = 10 cm a két rövid oldalra, egy rövid oldal 5 cm.'
  },
  {
    id: 'mexg3-q79',
    level: 3,
    questionTypeBadge: 'Terület',
    figure: <GridQ cols={4} rows={4} shapes={[{ cells: SQ14, fill: '#fdba74', stroke: '#9a3412' }]} s={24} />,
    question: 'Hány kis négyzet a síkidom területe?',
    options: ['14', '16', '12', '18'],
    correctAnswer: 0,
    explanation: 'Egy 4 · 4 = 16-os négyzetből hiányzik 2 kis négyzet: 16 − 2 = 14.'
  },
  {
    id: 'mexg3-q80',
    level: 3,
    questionTypeBadge: 'Terület',
    figure: (
      <QFig h={112}>
        <GridShape x={24} y={16} cols={4} rows={2} s={26} cells={rectCells(4, 2)} fill="#93c5fd" stroke="#1d4ed8" />
        <GridShape x={172} y={16} cols={2} rows={2} s={20} cells={rectCells(2, 2)} fill="#fde047" stroke="#854d0e" />
        <text x="192" y="76" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#854d0e">egység</text>
        <text x="76" y="88" textAnchor="middle" fontSize="11.5" fill="#334155">kék téglalap</text>
      </QFig>
    ),
    question: 'Az egység most a sárga nagy négyzet (4 kis négyzet). Hány ilyen egység fedi le a kék téglalapot?',
    options: ['2', '8', '4', '6'],
    correctAnswer: 0,
    explanation: 'A kék téglalap 8 kis négyzet. Egy egység 4 kis négyzet. 8 : 4 = 2 egység.'
  },
  {
    id: 'mexg3-q81',
    level: 3,
    questionTypeBadge: 'Terület',
    figure: <GridQ cols={5} rows={4} shapes={[{ cells: rectCells(3, 4), label: 'A' }, { cells: rectCells(5, 2, 0, 1), label: 'B', fill: '#fdba74', stroke: '#9a3412' }]} s={18} />,
    question: 'Mennyivel nagyobb az A területe, mint a B-é?',
    options: ['2 kis négyzettel', '12 kis négyzettel', '10 kis négyzettel', '1 kis négyzettel'],
    correctAnswer: 0,
    explanation: 'A: 4 sor, soronként 3 → 12. B: 2 sor, soronként 5 → 10. 12 − 10 = 2.'
  },
  {
    id: 'mexg3-q82',
    level: 3,
    questionTypeBadge: 'Téglalap területe',
    figure: <GridQ cols={9} rows={5} shapes={[{ cells: EDGE95, fill: '#d6d3d1', stroke: '#57534e' }]} s={20} />,
    question: 'A terasz hosszabb oldalán 9, a rövidebb oldalán 5 lap fér el. Hány lap kell az egész teraszhoz?',
    options: ['45', '14', '28', '54'],
    correctAnswer: 0,
    explanation: '5 sor, soronként 9 lap: 5 · 9 = 45. (A 28 a kerület, a 14 = 9 + 5.)'
  },
  {
    id: 'mexg3-q83',
    level: 3,
    questionTypeBadge: 'Téglalap területe',
    question: 'Egy téglalap 3 sorában összesen 21 kis négyzet van. Hány kis négyzet van egy sorban?',
    options: ['7', '18', '24', '63'],
    correctAnswer: 0,
    explanation: 'A 3 sor egyforma. 21 : 3 = 7 kis négyzet egy sorban.'
  },
  {
    id: 'mexg3-q84',
    level: 3,
    questionTypeBadge: 'Kerület és terület',
    figure: <GridQ cols={5} rows={5} shapes={[{ cells: rectCells(5, 5), fill: '#bbf7d0', stroke: '#15803d' }]} s={20} />,
    question: 'Mennyi a négyzet területe és kerülete?',
    options: ['területe 25, kerülete 20 egység', 'területe 20, kerülete 25 egység', 'mindkettő 25 egység', 'területe 10, kerülete 20 egység'],
    correctAnswer: 0,
    explanation: 'Terület: 5 · 5 = 25 kis négyzet. Kerület: 5 + 5 + 5 + 5 = 20 egység.'
  },
  {
    id: 'mexg3-q85',
    level: 3,
    questionTypeBadge: 'Eltelt idő',
    figure: <TwoClocksQ h1={7} m1={50} h2={8} m2={25} />,
    question: 'Mennyi idő telt el a két óraállás között?',
    options: ['35 perc', '25 perc', '75 perc', '45 perc'],
    correctAnswer: 0,
    explanation: '7:50-től 8:00-ig 10 perc, 8:00-tól 8:25-ig 25 perc. 10 + 25 = 35 perc.'
  },
  {
    id: 'mexg3-q86',
    level: 3,
    questionTypeBadge: 'Menetidő',
    figure: <BusQ />,
    question: 'A busz 9:45-kor indul, és 50 percig megy. Mikor érkezik?',
    options: ['10:35', '10:45', '10:25', '11:35'],
    correctAnswer: 0,
    explanation: '9:45 + 15 perc = 10:00. Még 35 perc: 10:35.'
  },
  {
    id: 'mexg3-q87',
    level: 3,
    questionTypeBadge: 'Idő',
    question: 'Melyik tart tovább: 2 óra 15 perc vagy 140 perc?',
    options: ['140 perc, 5 perccel', '2 óra 15 perc, 5 perccel', 'egyformák', '140 perc, 125 perccel'],
    correctAnswer: 0,
    explanation: '2 óra 15 perc = 60 + 60 + 15 = 135 perc. 140 − 135 = 5 perc.'
  },
  {
    id: 'mexg3-q88',
    level: 3,
    questionTypeBadge: 'Naptár',
    figure: <CalQ title="május" days={31} startDow={4} marks={range(25, 31, '#bbf7d0')} />,
    question: 'A tábor május 25-től május 31-ig tart, mindkét nap is. Hány napos a tábor?',
    options: ['7 napos', '6 napos', '8 napos', '5 napos'],
    correctAnswer: 0,
    explanation: 'Számold meg a zöld napokat: 25, 26, 27, 28, 29, 30, 31 – ez 7 nap, egy hét.'
  },
  {
    id: 'mexg3-q89',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CardsQ items={['2 kg', '190 dkg']} />,
    question: 'Melyik a nehezebb, és mennyivel?',
    options: ['2 kg, 10 dkg-mal', '190 dkg, 10 dkg-mal', 'egyformák', '2 kg, 188 dkg-mal'],
    correctAnswer: 0,
    explanation: '2 kg = 200 dkg. 200 − 190 = 10 dkg. A 2 kg a nehezebb.'
  },
  {
    id: 'mexg3-q90',
    level: 3,
    questionTypeBadge: 'Hosszúság',
    figure: <ShelfQ />,
    question: 'Az 1 m 20 cm hosszú polcra 4 cm vastag könyveket teszel. Hány könyv fér el rajta?',
    options: ['30', '80', '124', '12'],
    correctAnswer: 0,
    explanation: '1 m 20 cm = 120 cm. 120 : 4 = 30 könyv fér el.'
  }
];

export const MeasurementsExamG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="meresek"
      topicId="g3-meas-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="10. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: tömeg, űrtartalom, hosszúság, kerület, terület és idő."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={MEASUREMENTS_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mértékegységek',
          items: ['1 kg = 100 dkg', '1 l = 10 dl = 100 cl, 1 dl = 10 cl', '1 m = 10 dm = 100 cm, 1 cm = 10 mm', '1 óra = 60 perc, 1 perc = 60 másodperc']
        },
        {
          title: 'Kerület',
          items: ['A határoló vonalak hossza: minden oldalt összeadunk.', 'Téglalap: a szemben lévő oldalak egyenlők.', 'Négyzet: 4 egyforma oldal.', 'Előbb azonos egység: 1 m = 100 cm']
        },
        {
          title: 'Terület',
          items: ['Hány egység fedi le?', 'Téglalap: sorok száma · egy sorban lévő kis négyzetek', '3 sor, soronként 5: 3 · 5 = 15', 'Terület ≠ kerület!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MeasurementsExamG3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MeasurementsExamG3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MeasurementsExamG3Quiz;
