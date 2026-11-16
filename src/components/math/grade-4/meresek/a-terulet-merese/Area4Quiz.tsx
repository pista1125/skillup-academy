import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Area4Matcher } from './Area4Matcher';
import { Area4Sorter } from './Area4Sorter';

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

type Cell = [number, number];
const rectCells = (c: number, r: number, dx = 0, dy = 0): Cell[] =>
  Array.from({ length: r }, (_, y) => Array.from({ length: c }, (_, x) => [x + dx, y + dy] as Cell)).flat();

/** Négyzetrács, rajta kiszínezett cellák; opcionális felirat */
const ShapeFig: React.FC<{ cells: Cell[]; u?: number; color?: string; label?: string; cols?: number; rows?: number; lines?: React.ReactNode; extra?: React.ReactNode }> = ({
  cells,
  u = 16,
  color = '#c084fc',
  label = 'T = ?',
  cols = 12,
  rows = 7,
  lines,
  extra
}) => {
  const x0 = (240 - cols * u) / 2;
  const y0 = 12;
  return (
    <QFig>
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={x0 + i * u} y1={y0} x2={x0 + i * u} y2={y0 + rows * u} stroke="#e2e8f0" />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1={x0} y1={y0 + i * u} x2={x0 + cols * u} y2={y0 + i * u} stroke="#e2e8f0" />
      ))}
      {cells.map(([cx, cy]) => (
        <rect key={`${cx}-${cy}`} x={x0 + cx * u} y={y0 + cy * u} width={u} height={u} fill={color} stroke="#6b21a8" strokeWidth="1" />
      ))}
      {lines && <g transform={`translate(${x0} ${y0})`}>{lines}</g>}
      {extra}
      {label && (
        <text x="120" y={y0 + rows * u + 20} textAnchor="middle" fontSize="13" fontWeight="bold" fill={label.includes('?') ? UNK : '#0f172a'}>
          {label}
        </text>
      )}
    </QFig>
  );
};

const UnitBox: React.FC<{ kind: 'tri' | 'dom' | 'big' }> = ({ kind }) => (
  <g>
    <text x="150" y="141" fontSize="10" fontWeight="bold" fill="#334155">Egység:</text>
    {kind === 'tri' && <polygon points="192,132 204,144 192,144" fill="#86efac" stroke="#166534" />}
    {kind === 'dom' && <rect x="192" y="132" width="24" height="12" fill="#fde68a" stroke="#a16207" />}
    {kind === 'big' && <rect x="192" y="124" width="20" height="20" fill="#f9a8d4" stroke="#9d174d" />}
  </g>
);

const CompareTwoFig: React.FC = () => {
  const u = 16;
  return (
    <QFig>
      {rectCells(3, 3).map(([x, y]) => (
        <rect key={`a${x}${y}`} x={30 + x * u} y={30 + y * u} width={u} height={u} fill="#93c5fd" stroke="#1e40af" />
      ))}
      {rectCells(4, 2).map(([x, y]) => (
        <rect key={`b${x}${y}`} x={140 + x * u} y={38 + y * u} width={u} height={u} fill="#fca5a5" stroke="#991b1b" />
      ))}
      <text x="54" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e40af">A</text>
      <text x="172" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#991b1b">B</text>
      <text x="120" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>Melyik a nagyobb?</text>
    </QFig>
  );
};

const HouseFig: React.FC = () => {
  const u = 26;
  const x0 = 94;
  const y0 = 40;
  return (
    <QFig>
      {rectCells(2, 2).map(([x, y]) => (
        <rect key={`${x}${y}`} x={x0 + x * u} y={y0 + y * u} width={u} height={u} fill="#fcd34d" stroke="#92400e" />
      ))}
      <rect x={x0} y={y0 - u} width={u} height={u} fill="none" stroke="#e2e8f0" />
      <rect x={x0 + u} y={y0 - u} width={u} height={u} fill="none" stroke="#e2e8f0" />
      <polygon points={`${x0},${y0} ${x0 + u},${y0 - u} ${x0 + 2 * u},${y0}`} fill="#f87171" stroke="#991b1b" strokeWidth="1.5" />
      <line x1={x0 + u} y1={y0 - u} x2={x0 + u} y2={y0} stroke="#991b1b" strokeDasharray="3 2" />
      <rect x="30" y="120" width="14" height="14" fill="#fcd34d" stroke="#92400e" />
      <text x="50" y="131" fontSize="10" fontWeight="bold" fill="#334155">= 1 egység</text>
      <text x="170" y="131" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>T = ?</text>
    </QFig>
  );
};

const DiamondFig: React.FC = () => {
  const u = 16;
  return (
    <ShapeFig
      cells={[]}
      cols={6}
      rows={6}
      u={u}
      label="négyzet ? belső alakzat"
      lines={
        <g>
          <rect x={0} y={0} width={6 * u} height={6 * u} fill="none" stroke="#166534" strokeWidth="2" />
          <polygon points={`${3 * u},0 ${6 * u},${3 * u} ${3 * u},${6 * u} 0,${3 * u}`} fill="#4ade80" fillOpacity="0.7" stroke="#14532d" strokeWidth="2" />
        </g>
      }
    />
  );
};

const TriangleInRectFig: React.FC = () => {
  const u = 16;
  return (
    <ShapeFig
      cells={[]}
      cols={8}
      rows={6}
      u={u}
      label="háromszög: T = ?"
      lines={
        <g>
          <rect x={0} y={0} width={8 * u} height={6 * u} fill="none" stroke="#1e3a8a" strokeWidth="2" />
          <polygon points={`${4 * u},0 ${8 * u},${6 * u} 0,${6 * u}`} fill="#60a5fa" fillOpacity="0.7" stroke="#1e3a8a" strokeWidth="2" />
        </g>
      }
    />
  );
};

const GardenShedFig: React.FC = () => (
  <ShapeFig
    cells={rectCells(10, 8).filter(([x, y]) => !(x >= 6 && x <= 8 && y >= 1 && y <= 2))}
    cols={10}
    rows={8}
    u={14}
    color="#86efac"
    label="fű: T = ?"
    lines={
      <g>
        <rect x={6 * 14} y={14} width={3 * 14} height={2 * 14} fill="#a16207" stroke="#422006" />
        <text x={7.5 * 14} y={14 + 19} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#fff">fészer</text>
      </g>
    }
  />
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const AREA4_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'a4-q1',
    level: 1,
    questionTypeBadge: 'Négyzetek számolása',
    figure: <ShapeFig cells={rectCells(4, 3, 4, 2)} />,
    question: 'Hány kis négyzet fedi le a lila téglalapot?',
    options: ['12', '14', '7', '10'],
    correctAnswer: 0,
    explanation: 'Egy sorban 4 négyzet van, és 3 sor van: 4 · 3 = 12. (A 14 a kerület lenne: a határ darabjai.)'
  },
  {
    id: 'a4-q2',
    level: 1,
    questionTypeBadge: 'Fogalom',
    question: 'Mit mutat meg egy síkidom területe?',
    options: [
      'Hány egység fedi le hézag és átfedés nélkül',
      'Milyen hosszú kerítés kell köré',
      'Milyen hosszú a leghosszabb oldala',
      'Hány csúcsa van'
    ],
    correctAnswer: 0,
    explanation: 'A terület a síkidom belseje: megszámoljuk, hány egység fedi le. A kerítés hossza a kerület.'
  },
  {
    id: 'a4-q3',
    level: 1,
    questionTypeBadge: 'Négyzetek számolása',
    figure: (
      <ShapeFig
        cells={[
          [5, 1],
          [5, 2],
          [5, 3],
          [5, 4],
          [6, 4],
          [7, 4]
        ]}
      />
    ),
    question: 'Mekkora az L alakú síkidom területe kis négyzetekben?',
    options: ['6', '5', '7', '14'],
    correctAnswer: 0,
    explanation: 'Számold meg egyesével: felfelé 4, alul még 2 négyzet. 4 + 2 = 6.'
  },
  {
    id: 'a4-q4',
    level: 1,
    questionTypeBadge: 'Egységek',
    question: 'A füzetet egyszer nagy, egyszer kis négyzet alakú lapokkal fedted le. Melyikből kellett több?',
    options: ['A kis lapokból', 'A nagy lapokból', 'Mindkettőből ugyanannyi', 'Nem lehet lefedni'],
    correctAnswer: 0,
    explanation: 'Minél kisebb az egység, annál több darab kell ugyanahhoz a területhez.'
  },
  {
    id: 'a4-q5',
    level: 1,
    questionTypeBadge: 'Sorok és oszlopok',
    figure: <ShapeFig cells={rectCells(6, 2, 3, 2)} color="#f87171" />,
    question: 'Egy sorban 6 négyzet van, és 2 sor van. Hány négyzetből áll a téglalap?',
    options: ['12', '8', '16', '10'],
    correctAnswer: 0,
    explanation: '6 · 2 = 12 kis négyzet. (A 8 az összeadás: 6 + 2, a 16 a kerület.)'
  },
  {
    id: 'a4-q6',
    level: 1,
    questionTypeBadge: 'Négyzetek számolása',
    figure: <ShapeFig cells={[...rectCells(2, 4, 5, 1), [4, 2], [4, 3], [7, 2], [7, 3]]} color="#4ade80" />,
    question: 'Hány kis négyzet a zöld kereszt területe?',
    options: ['12', '10', '16', '8'],
    correctAnswer: 0,
    explanation: 'A középső oszlopok: 2 · 4 = 8 négyzet. A két oldalsó karban 2 + 2 = 4. Összesen 8 + 4 = 12.'
  },
  {
    id: 'a4-q7',
    level: 1,
    questionTypeBadge: 'Egységek',
    figure: (
      <QFig h={110}>
        <rect x="90" y="20" width="60" height="60" fill="#86efac" stroke="#166534" strokeWidth="2" />
        <line x1="90" y1="20" x2="150" y2="80" stroke="#166534" strokeWidth="2" />
        <text x="120" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>? háromszög</text>
      </QFig>
    ),
    question: 'Egy kis négyzetet az átlója mentén kettévágunk. Hány ilyen háromszög fed le egy kis négyzetet?',
    options: ['2', '4', '1', '3'],
    correctAnswer: 0,
    explanation: 'Az átló a négyzetet 2 egyforma háromszögre vágja. Ezért háromszögből kétszer annyi kell.'
  },
  {
    id: 'a4-q8',
    level: 1,
    questionTypeBadge: 'Nyitott mondat',
    question: 'A terülőminta igaz erre: 25 színes lap > terülőminta > 17 színes lap. Hány lapból állhat?',
    options: ['20', '17', '25', '30'],
    correctAnswer: 0,
    explanation: 'Több kell, mint 17, és kevesebb, mint 25. A 20 ilyen. A 17 és a 25 nem jó, mert ott „egyenlő” lenne.'
  },
  {
    id: 'a4-q9',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareTwoFig />,
    question: 'Melyik síkidomnak nagyobb a területe?',
    options: ['A-nak, 1 négyzettel', 'B-nek, 1 négyzettel', 'Egyenlő a területük', 'B-nek, 2 négyzettel'],
    correctAnswer: 0,
    explanation: 'A: 3 · 3 = 9 négyzet, B: 4 · 2 = 8 négyzet. Az A 1 négyzettel nagyobb.'
  },
  {
    id: 'a4-q10',
    level: 1,
    questionTypeBadge: 'Járólap',
    figure: <ShapeFig cells={rectCells(5, 5, 3, 0)} cols={11} rows={5} color="#fdba74" label="? járólap" />,
    question: 'Hány járólap kell a négyzet alakú padlóhoz?',
    options: ['25', '20', '10', '24'],
    correctAnswer: 0,
    explanation: 'Egy sorban 5 járólap, és 5 sor van: 5 · 5 = 25.'
  },

  // ---------- 2. szint ----------
  {
    id: 'a4-q11',
    level: 2,
    questionTypeBadge: 'Sorok és oszlopok',
    figure: <ShapeFig cells={rectCells(7, 3, 2, 2)} color="#60a5fa" />,
    question: 'Mennyi a 7 · 3-as téglalap területe kis négyzetekben?',
    options: ['21', '20', '10', '24'],
    correctAnswer: 0,
    explanation: '7 · 3 = 21. (A 20 a kerület: 7 + 3 + 7 + 3, a 10 pedig a 7 + 3.)'
  },
  {
    id: 'a4-q12',
    level: 2,
    questionTypeBadge: 'Sorok és oszlopok',
    figure: <ShapeFig cells={rectCells(5, 6, 3, 0)} cols={11} rows={6} color="#c084fc" />,
    question: 'Egy sorban 5 négyzet, és 6 sor van. Mennyi a terület?',
    options: ['30', '22', '11', '35'],
    correctAnswer: 0,
    explanation: '5 · 6 = 30 kis négyzet.'
  },
  {
    id: 'a4-q13',
    level: 2,
    questionTypeBadge: 'Más egység',
    figure: (
      <ShapeFig
        cells={rectCells(4, 3, 4, 1)}
        color="#fde68a"
        label=""
        extra={<UnitBox kind="dom" />}
      />
    ),
    question: 'Hány dominó (2 kis négyzetnyi lap) kell a 4 · 3-as téglalap lefedéséhez?',
    options: ['6', '12', '24', '3'],
    correctAnswer: 0,
    explanation: 'A téglalap 4 · 3 = 12 kis négyzet. Egy dominó 2 kis négyzet: 12 : 2 = 6.'
  },
  {
    id: 'a4-q14',
    level: 2,
    questionTypeBadge: 'Más egység',
    figure: (
      <ShapeFig
        cells={rectCells(3, 2, 4, 2)}
        color="#86efac"
        label=""
        extra={<UnitBox kind="tri" />}
      />
    ),
    question: 'Hány fél négyzetnyi háromszög fedi le a 3 · 2-es téglalapot?',
    options: ['12', '6', '3', '8'],
    correctAnswer: 0,
    explanation: 'A téglalap 3 · 2 = 6 kis négyzet. Minden négyzet 2 háromszög: 6 · 2 = 12.'
  },
  {
    id: 'a4-q15',
    level: 2,
    questionTypeBadge: 'Fél négyzetek',
    figure: <HouseFig />,
    question: 'Mennyi a házikó területe kis négyzetekben? (A tető két fél négyzetből áll.)',
    options: ['5', '6', '4', '7'],
    correctAnswer: 0,
    explanation: 'A fal 2 · 2 = 4 négyzet. A tető 2 fél négyzet = 1 egész. 4 + 1 = 5.'
  },
  {
    id: 'a4-q16',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyiknek nagyobb a területe: a 6 · 4-es téglalapnak vagy az 5 · 5-ös négyzetnek?',
    options: ['A négyzetnek, 1 négyzettel', 'A téglalapnak, 1 négyzettel', 'Egyenlők', 'A négyzetnek, 2 négyzettel'],
    correctAnswer: 0,
    explanation: 'Téglalap: 6 · 4 = 24. Négyzet: 5 · 5 = 25. A négyzet 1 kis négyzettel nagyobb.'
  },
  {
    id: 'a4-q17',
    level: 2,
    questionTypeBadge: 'Terület és kerület',
    question: '4 kis négyzetet egy sorba raksz, máskor 2 · 2-es négyzetet raksz ki belőlük. Melyik igaz?',
    options: [
      'A területük egyenlő, a kerületük különböző',
      'A területük és a kerületük is egyenlő',
      'A sorba rakottnak nagyobb a területe',
      'A 2 · 2-esnek nagyobb a kerülete'
    ],
    correctAnswer: 0,
    explanation: 'Mindkettő 4 négyzet, tehát a terület egyenlő. A kerület: sorban 10 egység, a 2 · 2-es négyzeté 8 egység.'
  },
  {
    id: 'a4-q18',
    level: 2,
    questionTypeBadge: 'Más egység',
    figure: (
      <ShapeFig
        cells={rectCells(6, 4, 3, 1)}
        color="#f9a8d4"
        label=""
        extra={<UnitBox kind="big" />}
      />
    ),
    question: 'Hány nagy négyzet (2 · 2 kis négyzet) fedi le a 6 · 4-es téglalapot?',
    options: ['6', '24', '12', '96'],
    correctAnswer: 0,
    explanation: 'A téglalap 6 · 4 = 24 kis négyzet. Egy nagy négyzet 4 kicsi: 24 : 4 = 6.'
  },
  {
    id: 'a4-q19',
    level: 2,
    questionTypeBadge: 'Alaprajz',
    figure: <ShapeFig cells={rectCells(8, 4, 2, 1)} color="#c084fc" label="szoba: T = ?" />,
    question: 'Petiék lila szobája az alaprajzon 8 négyzet széles és 4 négyzet magas. Hány egység a területe?',
    options: ['32', '24', '12', '36'],
    correctAnswer: 0,
    explanation: '8 · 4 = 32 egység. (A 24 a kerület: 8 + 4 + 8 + 4.)'
  },
  {
    id: 'a4-q20',
    level: 2,
    questionTypeBadge: 'Hányszoros',
    figure: <DiamondFig />,
    question: 'A 6 · 6-os négyzetbe rajzoltunk egy alakzatot a négyzet oldalainak felezőpontjaival. Hányszorosa a négyzet területe a belső alakzaténak?',
    options: ['2-szerese', '4-szerese', 'egyenlők', '3-szorosa'],
    correctAnswer: 0,
    explanation: 'A négyzet 36 egység. A 4 levágott sarok éppen kirakja a belső alakzatot, így az 18 egység. 36 = 2 · 18.'
  },

  // ---------- 3. szint ----------
  {
    id: 'a4-q21',
    level: 3,
    questionTypeBadge: 'Sportpálya',
    figure: <ShapeFig cells={rectCells(18, 9)} cols={18} rows={9} u={11} color="#fb923c" label="18 m × 9 m, T = ?" />,
    question: 'A röplabdapálya 18 m hosszú és 9 m széles. Hány 1 m oldalú négyzet fedi le?',
    options: ['162', '54', '27', '172'],
    correctAnswer: 0,
    explanation: '18 · 9 = 162. (Az 54 a kerület méterben, a 27 a 18 + 9.)'
  },
  {
    id: 'a4-q22',
    level: 3,
    questionTypeBadge: 'Sportpálya',
    question: 'A röplabdapálya 162 egység, a strandröplabdapálya 16 · 8 egység. Mennyivel nagyobb a röplabdapálya?',
    options: ['34 egységgel', '290 egységgel', '44 egységgel', '24 egységgel'],
    correctAnswer: 0,
    explanation: 'Strandröplabda: 16 · 8 = 128. 162 − 128 = 34.'
  },
  {
    id: 'a4-q23',
    level: 3,
    questionTypeBadge: 'Csempézés',
    question: 'A fürdőszoba fala 8 kis négyzet széles és 7 magas. Hány darab 2 kis négyzetnyi csempe kell?',
    options: ['28', '56', '112', '15'],
    correctAnswer: 0,
    explanation: 'A fal 8 · 7 = 56 kis négyzet. Egy csempe 2 négyzet: 56 : 2 = 28.'
  },
  {
    id: 'a4-q24',
    level: 3,
    questionTypeBadge: 'Csempézés',
    figure: (
      <ShapeFig
        cells={rectCells(8, 6, 2, 0)}
        rows={6}
        color="#fdba74"
        label=""
        extra={<UnitBox kind="big" />}
      />
    ),
    question: 'A 8 · 6 kis négyzetnyi falat 2 · 2 kis négyzetnyi csempékkel rakják ki. Hány csempe kell?',
    options: ['12', '48', '24', '96'],
    correctAnswer: 0,
    explanation: 'A fal 8 · 6 = 48 kis négyzet. Egy csempe 4 kis négyzet: 48 : 4 = 12.'
  },
  {
    id: 'a4-q25',
    level: 3,
    questionTypeBadge: 'Csempézés',
    question: 'Egy 4 · 3 kis négyzetnyi falat fél négyzetnyi háromszög csempékkel raknak ki. Hány csempe kell?',
    options: ['24', '12', '6', '14'],
    correctAnswer: 0,
    explanation: 'A fal 4 · 3 = 12 kis négyzet. Minden négyzethez 2 háromszög kell: 12 · 2 = 24.'
  },
  {
    id: 'a4-q26',
    level: 3,
    questionTypeBadge: 'Hiányzó adat',
    question: 'Egy téglalap 24 kis négyzetből áll. Egy sorában 6 négyzet van. Hány sora van?',
    options: ['4', '18', '12', '30'],
    correctAnswer: 0,
    explanation: '6 · □ = 24, tehát □ = 24 : 6 = 4 sor.'
  },
  {
    id: 'a4-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó adat',
    question: 'Egy négyzet 36 kis négyzetből áll. Hány kis négyzet van egy oldala mentén?',
    options: ['6', '9', '18', '12'],
    correctAnswer: 0,
    explanation: 'A négyzetben ugyanannyi sor van, ahány négyzet egy sorban: 6 · 6 = 36. (A 9 akkor jönne ki, ha 36 lenne a kerület.)'
  },
  {
    id: 'a4-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <GardenShedFig />,
    question: 'A kert 10 · 8 egység. Benne áll egy 3 · 2 egységnyi fészer. Mekkora a füves rész?',
    options: ['74 egység', '86 egység', '80 egység', '75 egység'],
    correctAnswer: 0,
    explanation: 'Kert: 10 · 8 = 80. Fészer: 3 · 2 = 6. Füves rész: 80 − 6 = 74.'
  },
  {
    id: 'a4-q29',
    level: 3,
    questionTypeBadge: 'Patchwork',
    question: 'Egy patchwork takaró 6 · 5 nagy négyzetből áll. Minden nagy négyzet 4 kis négyzetből van összevarrva. Hány kis négyzet van a takarón?',
    options: ['120', '30', '34', '60'],
    correctAnswer: 0,
    explanation: 'Nagy négyzetek: 6 · 5 = 30. Mindegyikben 4 kicsi: 30 · 4 = 120.'
  },
  {
    id: 'a4-q30',
    level: 3,
    questionTypeBadge: 'Hányszoros',
    figure: <TriangleInRectFig />,
    question: 'A 8 · 6-os téglalapba rajzolt háromszög csúcsa a felső oldal közepén van. Hány kis négyzetnyi a háromszög területe?',
    options: ['24', '48', '14', '28'],
    correctAnswer: 0,
    explanation: 'A téglalap 8 · 6 = 48. A háromszög mellett levágott két darab együtt éppen akkora, mint a háromszög, így az a téglalap fele: 48 : 2 = 24.'
  }
];

export const Area4Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="meresek"
      topicId="g4-meas-terulet-quiz"
      subtopicId="a-terulet-merese"
      title="3. A terület mérése – Kvíz"
      subtitle="30 feladat 3 szinten: négyzetek számolása, sorok és oszlopok, különböző egységek, csempézés és sportpályák."
      badge="4. OSZTÁLY • II. MÉRÉSEK • KVÍZ"
      questions={AREA4_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mi a terület?',
          items: [
            'A terület megmutatja, hány egység fedi le a síkidomot.',
            'Hézag és átfedés nem lehet!',
            'Mindig mondd meg az egységet.',
            'Terület (T) ≠ kerület (K): a terület a belseje.'
          ]
        },
        {
          title: 'Téglalap gyorsan',
          items: ['egy sorban lévő négyzetek · sorok száma', '6 · 2 = 12, 7 · 3 = 21, 5 · 6 = 30', 'négyzet: 5 · 5 = 25', 'hiányzó sor: 24 : 6 = 4']
        },
        {
          title: 'Más egység',
          items: [
            'fél négyzet (háromszög): kétszer annyi kell',
            'dominó (2 kis négyzet): fele annyi kell',
            '2 · 2-es nagy négyzet: negyedannyi kell',
            'kisebb egység → több darab'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Area4Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Area4Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Area4Quiz;
