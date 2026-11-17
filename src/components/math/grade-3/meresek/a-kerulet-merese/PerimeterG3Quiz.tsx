import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PerimeterG3Matcher } from './PerimeterG3Matcher';
import { PerimeterG3Sorter } from './PerimeterG3Sorter';
import { FONT, PolyShape, StickPolygon, GridShape, Pine, regularPts, SIDE_COLORS, Pt, Cell } from './PerimeterG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 110 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const PolyFig: React.FC<{ pts: Pt[]; labels: (string | null)[]; h?: number; note?: string; colors?: string[] }> = ({ pts, labels, h = 120, note, colors }) => (
  <QFig h={h}>
    <PolyShape pts={pts} labels={labels} fontSize={13} off={12} colors={colors} />
    {note && (
      <text x="232" y="22" textAnchor="end" fontSize="12" fill="#334155">{note}</text>
    )}
  </QFig>
);

const GridFig: React.FC<{ cells: Cell[]; cols: number; rows: number; note?: string }> = ({ cells, cols, rows, note = '1 kis négyzet oldala = 1 egység' }) => {
  const s = 22;
  const x = (240 - cols * s) / 2;
  return (
    <QFig h={rows * s + 40}>
      <GridShape x={x} y={10} s={s} cols={cols} rows={rows} cells={cells} w={3.5} />
      <text x="120" y={rows * s + 32} textAnchor="middle" fontSize="12" fill="#334155">{note}</text>
    </QFig>
  );
};

const TwoGridsFig: React.FC<{ a: Cell[]; b: Cell[] }> = ({ a, b }) => {
  const s = 20;
  return (
    <QFig h={130}>
      <GridShape x={14} y={14} s={s} cols={5} rows={4} cells={a} w={3.5} />
      <GridShape x={136} y={14} s={s} cols={4} rows={4} cells={b} w={3.5} fill="#bbf7d0" stroke="#15803d" />
      <text x="64" y="112" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1d4ed8">A</text>
      <text x="176" y="112" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">B</text>
    </QFig>
  );
};

const SticksFig: React.FC<{ n: number; note: string }> = ({ n, note }) => {
  const side = n >= 5 ? 44 : 52;
  const r = side / (2 * Math.sin(Math.PI / n));
  return (
    <QFig h={120}>
      <StickPolygon pts={regularPts(n, 80, n === 3 ? 66 : 58, r, n === 4 ? Math.PI / 4 : 0)} w={5} />
      <text x="190" y="54" textAnchor="middle" fontSize="12" fill="#334155">1 pálcika:</text>
      <text x="190" y="74" textAnchor="middle" fontSize="15" fontWeight="bold" fill={note.includes('?') ? UNK : '#0f172a'}>{note}</text>
    </QFig>
  );
};

/** Oldalak egy egyenesben. */
const LineFig: React.FC<{ parts: string[]; ws: number[]; total: string }> = ({ parts, ws, total }) => {
  const sum = ws.reduce((a, b) => a + b, 0);
  const k = 210 / sum;
  let x = 15;
  return (
    <QFig h={100}>
      {ws.map((w, i) => {
        const a = x;
        x += w * k;
        return (
          <g key={i}>
            <line x1={a} y1={34} x2={x} y2={34} stroke={SIDE_COLORS[i]} strokeWidth="6" />
            <line x1={a} y1={26} x2={a} y2={42} stroke="#1e293b" strokeWidth="1.5" />
            <text x={(a + x) / 2} y={58} textAnchor="middle" fontSize="12" fontWeight="bold" fill={parts[i].includes('?') ? UNK : '#0f172a'}>{parts[i]}</text>
          </g>
        );
      })}
      <line x1="225" y1="26" x2="225" y2="42" stroke="#1e293b" strokeWidth="1.5" />
      <path d="M 15 66 q 0 7 10 7 h 85 q 10 0 10 7 q 0 -7 10 -7 h 85 q 10 0 10 -7" fill="none" stroke="#475569" strokeWidth="1.5" />
      <text x="120" y="95" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">a kerület: {total}</text>
    </QFig>
  );
};

/** L alakú kis kert (m-ben, 1 m = 10 px). */
const SmallGardenFig: React.FC = () => {
  const k = 10;
  const X = 70;
  const Y = 18;
  const raw: Pt[] = [[0, 0], [6, 0], [6, 4], [10, 4], [10, 8], [0, 8]];
  const pts = raw.map(([a, b]) => [X + a * k, Y + b * k] as Pt);
  return (
    <QFig h={118}>
      <PolyShape pts={pts} labels={['6 m', '4 m', '4 m', '4 m', '10 m', '8 m']} colors={['#78350f']} fill="#d9f99d" fontSize={12} off={11} inside={[2]} />
      <Pine x={85} y={45} />
      <Pine x={100} y={78} />
      <Pine x={125} y={80} />
    </QFig>
  );
};

/** A 90 m-es L alakú kert kapuval (1 m = 5 px). */
const GateGardenFig: React.FC = () => {
  const k = 5;
  const X = 40;
  const Y = 16;
  const raw: Pt[] = [[0, 0], [18, 0], [18, 6], [30, 6], [30, 15], [0, 15]];
  const pts = raw.map(([a, b]) => [X + a * k, Y + b * k] as Pt);
  return (
    <QFig h={120}>
      <PolyShape pts={pts} labels={['18 m', '6 m', '12 m', '9 m', '30 m', '15 m']} colors={['#78350f']} fill="#d9f99d" fontSize={12} off={10} inside={[2]} />
      <line x1={X + 3 * k} y1={Y + 15 * k} x2={X + 5 * k} y2={Y + 15 * k} stroke="#d9f99d" strokeWidth="6" />
      <line x1={X + 3 * k} y1={Y + 15 * k - 6} x2={X + 3 * k} y2={Y + 15 * k + 6} stroke="#1e293b" strokeWidth="2" />
      <line x1={X + 5 * k} y1={Y + 15 * k - 6} x2={X + 5 * k} y2={Y + 15 * k + 6} stroke="#1e293b" strokeWidth="2" />
      <text x={X} y={Y + 15 * k + 18} textAnchor="start" fontSize="11" fontWeight="bold" fill="#7c3aed">kapu: 2 m</text>
      <Pine x={70} y={50} k={0.8} />
      <Pine x={105} y={70} k={0.8} />
      <Pine x={140} y={78} k={0.8} />
    </QFig>
  );
};

const FlagFig: React.FC = () => (
  <QFig h={120}>
    <line x1="56" y1="10" x2="56" y2="112" stroke="#78350f" strokeWidth="4" />
    <PolyShape pts={[[60, 16], [108, 52], [60, 88]]} labels={['25 cm', '25 cm', '30 cm']} colors={['#db2777']} fill="#fbcfe8" fontSize={12} off={12} />
    <text x="176" y="50" textAnchor="middle" fontSize="12" fill="#334155">szalag körbe:</text>
    <text x="176" y="70" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">van 1 m</text>
  </QFig>
);

const TriVsQuadFig: React.FC = () => (
  <QFig h={120}>
    <PolyShape pts={[[59, 46], [102, 96], [30, 96]]} labels={['8 cm', '9 cm', '7 cm']} fontSize={12} off={11} fill="#e0f2fe" />
    <PolyShape pts={[[150, 48], [190, 48], [214, 94], [164, 94]]} labels={['5 cm', '6 cm', '6 cm', '6 cm']} fontSize={12} off={11} fill="#fef3c7" />
  </QFig>
);

// Méretarányos háromszögek (lásd a számítást a README-ben)
const T456: Pt[] = [[85, 24], [160, 90], [40, 90]];
const T354045: Pt[] = [[104, 20], [168, 92], [60, 92]];
const T1078: Pt[] = [[101, 25], [170, 92], [50, 92]];
const T758: Pt[] = [[99, 31], [176, 92], [64, 92]];
// Egyenlő szárú trapéz: 2, 3, 4, 3 cm (1 cm = 22 px)
const TRAP: Pt[] = [[98, 28], [142, 28], [164, 90], [76, 90]];
// Ház alakú ötszög: tető 8 m, fal 9 m, alap 10 m (1 m = 6 px)
const HOUSE: Pt[] = [[120, 12], [150, 49], [150, 103], [90, 103], [90, 49]];

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const PERIMETER_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'per3-q1',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mi a kerület?',
    options: ['A síkidomot határoló vonalak hossza.', 'A síkidom belseje.', 'A leghosszabb oldal hossza.', 'Az oldalak száma.'],
    correctAnswer: 0,
    explanation: 'A kerület az az út, amit akkor teszel meg, ha egyszer körbejárod a síkidom szélét.'
  },
  {
    id: 'per3-q2',
    level: 1,
    questionTypeBadge: 'Háromszög',
    figure: <PolyFig pts={T456} labels={['5 cm', '6 cm', '4 cm']} />,
    question: 'Mennyi a háromszög kerülete?',
    options: ['15 cm', '11 cm', '9 cm', '120 cm'],
    correctAnswer: 0,
    explanation: 'Összeadjuk a 3 oldalt: 4 + 5 + 6 = 15. A kerület 15 cm.'
  },
  {
    id: 'per3-q3',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig n={4} note="2 cm" />,
    question: 'A négyzetet 4 pálcikából raktuk ki. Egy pálcika 2 cm. Mennyi a kerülete?',
    options: ['8 cm', '4 cm', '2 cm', '6 cm'],
    correctAnswer: 0,
    explanation: '4 pálcika, mindegyik 2 cm: 2 + 2 + 2 + 2 = 8 cm.'
  },
  {
    id: 'per3-q4',
    level: 1,
    questionTypeBadge: 'Négyzetrács',
    figure: <GridFig cells={[[1, 1], [2, 1], [3, 1]]} cols={5} rows={3} />,
    question: 'Hány egység a kék alakzat kerülete?',
    options: ['8 egység', '3 egység', '4 egység', '6 egység'],
    correctAnswer: 0,
    explanation: 'Számold a kék vonal kis szakaszait: fent 3, jobbra 1, lent 3, balra 1. 3 + 1 + 3 + 1 = 8.'
  },
  {
    id: 'per3-q5',
    level: 1,
    questionTypeBadge: 'Négyszög',
    figure: <PolyFig pts={TRAP} labels={['2 cm', '3 cm', '4 cm', '3 cm']} />,
    question: 'Mennyi a négyszög kerülete?',
    options: ['12 cm', '9 cm', '10 cm', '4 cm'],
    correctAnswer: 0,
    explanation: 'Mind a 4 oldalt összeadjuk: 2 + 3 + 4 + 3 = 12 cm.'
  },
  {
    id: 'per3-q6',
    level: 1,
    questionTypeBadge: 'Négyzetrács',
    figure: <GridFig cells={[[1, 0], [1, 1], [2, 1]]} cols={4} rows={3} />,
    question: 'Hány egység a kék alakzat kerülete?',
    options: ['8 egység', '3 egység', '6 egység', '7 egység'],
    correctAnswer: 0,
    explanation: 'Induljunk a bal felső sarokból, és számoljunk körbe: 1, 2, … 8. A kerület 8 egység.'
  },
  {
    id: 'per3-q7',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig n={3} note="4 cm" />,
    question: 'A háromszöget 3 egyforma, 4 cm-es pálcikából raktuk ki. Mennyi a kerülete?',
    options: ['12 cm', '7 cm', '3 cm', '16 cm'],
    correctAnswer: 0,
    explanation: '4 + 4 + 4 = 12. A kerület 12 cm.'
  },
  {
    id: 'per3-q8',
    level: 1,
    questionTypeBadge: 'Háromszög',
    question: 'Egy háromszög oldalai 5 cm, 5 cm és 6 cm. Mennyi a kerülete?',
    options: ['16 cm', '11 cm', '10 cm', '15 cm'],
    correctAnswer: 0,
    explanation: '5 + 5 + 6 = 16. Mindhárom oldalt összeadjuk, a két egyformát is!'
  },
  {
    id: 'per3-q9',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Hogyan kapod meg a kerületet?',
    options: ['Összeadom az oldalak hosszát.', 'Megszámolom a csúcsokat.', 'Csak a leghosszabb oldalt mérem meg.', 'Megszámolom az oldalakat.'],
    correctAnswer: 0,
    explanation: 'Minden oldalt megmérünk, és a hosszakat összeadjuk.'
  },
  {
    id: 'per3-q10',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig n={5} note="3 cm" />,
    question: 'Az ötszög minden oldala 3 cm. Mennyi a kerülete?',
    options: ['15 cm', '8 cm', '12 cm', '18 cm'],
    correctAnswer: 0,
    explanation: 'Az ötszögnek 5 oldala van. 3 + 3 + 3 + 3 + 3 = 15 cm.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'per3-q11',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: <GridFig cells={[[2, 0], [1, 1], [2, 1], [3, 1], [2, 2]]} cols={5} rows={3} />,
    question: 'Hány egység a kereszt kerülete?',
    options: ['12 egység', '5 egység', '10 egység', '20 egység'],
    correctAnswer: 0,
    explanation: 'Minden kar 3 kis szakaszt ad: 4 kar · 3 = 12. A belső vonalak nem számítanak!'
  },
  {
    id: 'per3-q12',
    level: 2,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig n={6} note="7 cm" />,
    question: 'A hatszöget 6 egyforma, 7 cm-es pálcikából raktuk ki. Mennyi a kerülete?',
    options: ['42 cm', '35 cm', '13 cm', '49 cm'],
    correctAnswer: 0,
    explanation: '6 · 7 cm = 42 cm.'
  },
  {
    id: 'per3-q13',
    level: 2,
    questionTypeBadge: 'Négyszög',
    question: 'Egy négyszög oldalai: 15 cm, 22 cm, 18 cm, 25 cm. Mennyi a kerülete?',
    options: ['80 cm', '70 cm', '55 cm', '62 cm'],
    correctAnswer: 0,
    explanation: '15 + 22 = 37. 37 + 18 = 55. 55 + 25 = 80. A kerület 80 cm.'
  },
  {
    id: 'per3-q14',
    level: 2,
    questionTypeBadge: 'Milliméter',
    figure: <PolyFig pts={T354045} labels={['40 mm', '45 mm', '35 mm']} />,
    question: 'Mennyi a háromszög kerülete milliméterben?',
    options: ['120 mm', '75 mm', '12 mm', '85 mm'],
    correctAnswer: 0,
    explanation: '35 + 40 + 45 = 120. A kerület 120 mm, vagyis 12 cm.'
  },
  {
    id: 'per3-q15',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: <GridFig cells={[[1, 1], [2, 1], [1, 2], [2, 2]]} cols={4} rows={4} />,
    question: 'Hány egység a kék négyzet kerülete?',
    options: ['8 egység', '4 egység', '16 egység', '6 egység'],
    correctAnswer: 0,
    explanation: 'Minden oldala 2 egység. 2 + 2 + 2 + 2 = 8. A 4 a kis négyzetek száma, az nem a kerület.'
  },
  {
    id: 'per3-q16',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <TwoGridsFig a={[[0, 1], [1, 1], [2, 1], [3, 1]]} b={[[1, 1], [2, 1], [1, 2], [2, 2]]} />,
    question: 'Mindkét alakzat 4 kis négyzetből áll. Melyiknek nagyobb a kerülete?',
    options: ['Az A-nak', 'A B-nek', 'Egyforma a kerületük.', 'Nem lehet megszámolni.'],
    correctAnswer: 0,
    explanation: 'A: 4 + 1 + 4 + 1 = 10 egység. B: 2 + 2 + 2 + 2 = 8 egység. Az A kerülete nagyobb.'
  },
  {
    id: 'per3-q17',
    level: 2,
    questionTypeBadge: 'Ötszög',
    figure: <PolyFig pts={HOUSE} labels={['8 m', '9 m', '10 m', '9 m', '8 m']} h={122} />,
    question: 'Egy ház alakú virágágyást kerítünk körbe. Hány méter kerítés kell?',
    options: ['44 m', '34 m', '36 m', '35 m'],
    correctAnswer: 0,
    explanation: '8 + 8 + 9 + 9 + 10 = 44. Mind az 5 oldal kell: 44 m.'
  },
  {
    id: 'per3-q18',
    level: 2,
    questionTypeBadge: 'Háromszög',
    question: 'Egy háromszög minden oldala 9 cm. Mennyi a kerülete?',
    options: ['27 cm', '18 cm', '12 cm', '81 cm'],
    correctAnswer: 0,
    explanation: 'Három egyforma oldal: 9 + 9 + 9 = 27 cm.'
  },
  {
    id: 'per3-q19',
    level: 2,
    questionTypeBadge: 'Kerítés',
    figure: <SmallGardenFig />,
    question: 'Hány méter kerítés kell a kert körül?',
    options: ['36 m', '28 m', '32 m', '24 m'],
    correctAnswer: 0,
    explanation: 'A kertnek 6 oldala van: 6 + 4 + 4 + 4 + 10 + 8 = 36 m. A lépcső két kis oldalát se hagyd ki!'
  },
  {
    id: 'per3-q20',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <PolyFig pts={T1078} labels={['8 cm', '1 dm', '7 cm']} />,
    question: 'Mennyi a háromszög kerülete centiméterben?',
    options: ['25 cm', '16 cm', '25 dm', '15 cm'],
    correctAnswer: 0,
    explanation: 'Előbb váltunk: 1 dm = 10 cm. 10 + 7 + 8 = 25 cm.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'per3-q21',
    level: 3,
    questionTypeBadge: 'Hiányzó oldal',
    figure: <PolyFig pts={T758} labels={['7 cm', '8 cm', '? cm']} note="kerület: 20 cm" />,
    question: 'A háromszög kerülete 20 cm. Milyen hosszú a harmadik oldal?',
    options: ['5 cm', '15 cm', '35 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'A két ismert oldal: 7 + 8 = 15 cm. 20 − 15 = 5. A harmadik oldal 5 cm.'
  },
  {
    id: 'per3-q22',
    level: 3,
    questionTypeBadge: 'Kerítés',
    figure: <GateGardenFig />,
    question: 'A kertet bekerítjük, de a 2 m széles kapuhoz nem kell kerítés. Hány méter kerítés kell?',
    options: ['88 m', '90 m', '92 m', '70 m'],
    correctAnswer: 0,
    explanation: 'A kerület: 18 + 6 + 12 + 9 + 30 + 15 = 90 m. A kapu helye nem kell: 90 − 2 = 88 m.'
  },
  {
    id: 'per3-q23',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig n={5} note="? cm" />,
    question: 'Az ötszöget 5 egyforma pálcikából raktuk ki. A kerülete 35 cm. Milyen hosszú egy pálcika?',
    options: ['7 cm', '30 cm', '40 cm', '5 cm'],
    correctAnswer: 0,
    explanation: '5 egyforma pálcika együtt 35 cm. 35 : 5 = 7. Egy pálcika 7 cm.'
  },
  {
    id: 'per3-q24',
    level: 3,
    questionTypeBadge: 'Négyzetrács',
    figure: <GridFig cells={[[1, 0], [1, 1], [2, 1], [1, 2], [2, 2], [3, 2]]} cols={5} rows={3} />,
    question: 'Hány egység a lépcső alakú alakzat kerülete?',
    options: ['12 egység', '6 egység', '9 egység', '10 egység'],
    correctAnswer: 0,
    explanation: 'Számolj körbe! Fent és a lépcsőfokokon jobbra összesen 3, lefelé 3, lent 3, balra fel 3. 3 + 3 + 3 + 3 = 12.'
  },
  {
    id: 'per3-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <FlagFig />,
    question: 'A zászló szélére körbe szalagot varrunk. 1 m szalagunk van. Mennyi szalag marad?',
    options: ['20 cm', '80 cm', '25 cm', '30 cm'],
    correctAnswer: 0,
    explanation: 'A kerület: 25 + 25 + 30 = 80 cm. 1 m = 100 cm. 100 − 80 = 20 cm marad.'
  },
  {
    id: 'per3-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy négyszög oldalai: 5 cm, 4 cm, 6 cm, 5 cm. A katica kétszer megy körbe rajta. Hány cm-t tesz meg?',
    options: ['40 cm', '20 cm', '24 cm', '80 cm'],
    correctAnswer: 0,
    explanation: 'Egy kör: 5 + 4 + 6 + 5 = 20 cm. Két kör: 20 + 20 = 40 cm.'
  },
  {
    id: 'per3-q27',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <TriVsQuadFig />,
    question: 'Melyik síkidom kerülete nagyobb, és mennyivel?',
    options: ['A háromszögé, 1 cm-rel', 'A négyszögé, 1 cm-rel', 'Egyforma a kerületük.', 'A háromszögé, 3 cm-rel'],
    correctAnswer: 0,
    explanation: 'Háromszög: 7 + 8 + 9 = 24 cm. Négyszög: 5 + 6 + 6 + 6 = 23 cm. 24 − 23 = 1, a háromszögé 1 cm-rel nagyobb.'
  },
  {
    id: 'per3-q28',
    level: 3,
    questionTypeBadge: 'Hiányzó oldal',
    figure: <LineFig parts={['6 cm', '6 cm', '4 cm', '? cm']} ws={[6, 6, 4, 5]} total="21 cm" />,
    question: 'Egy négyszög oldalait egy vonalba raktuk. Az egész 21 cm. Milyen hosszú a negyedik oldal?',
    options: ['5 cm', '16 cm', '37 cm', '4 cm'],
    correctAnswer: 0,
    explanation: '6 + 6 + 4 = 16 cm. 21 − 16 = 5. A negyedik oldal 5 cm.'
  },
  {
    id: 'per3-q29',
    level: 3,
    questionTypeBadge: 'Kerítés',
    question: 'Egy ötszög alakú legelő oldalai: 120 m, 150 m, 100 m, 130 m, 200 m. Hány méter a kerülete?',
    options: ['700 m', '600 m', '570 m', '800 m'],
    correctAnswer: 0,
    explanation: '120 + 150 = 270. 270 + 100 = 370. 370 + 130 = 500. 500 + 200 = 700 m.'
  },
  {
    id: 'per3-q30',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: 'Egy háromszög oldalai: 1 m, 80 cm, 70 cm. Mennyi a kerülete?',
    options: ['2 m 50 cm', '151 cm', '1 m 50 cm', '25 m'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 + 80 + 70 = 250 cm. Ez 2 m 50 cm.'
  }
];

export const PerimeterG3Quiz: React.FC<{
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
      topicId="g3-meas-kerulet-quiz"
      subtopicId="a-kerulet-merese"
      title="5. A kerület mérése – Kvíz"
      subtitle="30 feladat 3 szinten: oldalak összeadása, négyzetrács, pálcikás síkidomok, kertek, hiányzó oldal."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={PERIMETER_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mi a kerület?',
          items: ['A síkidomot határoló vonalak hossza', 'Körbejárjuk a szélét', 'Minden oldalt összeadunk']
        },
        {
          title: 'Négyzetrács',
          items: ['1 kis négyzet oldala = 1 egység', 'A szélén lévő kis szakaszokat számold', 'Nem a négyzeteket!']
        },
        {
          title: 'Ügyes trükkök',
          items: ['Egyforma oldalak: 6 · 5 cm = 30 cm', 'Előbb azonos egység: 1 dm = 10 cm', 'Hiányzó oldal: kerület − a többi oldal']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PerimeterG3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <PerimeterG3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default PerimeterG3Quiz;
