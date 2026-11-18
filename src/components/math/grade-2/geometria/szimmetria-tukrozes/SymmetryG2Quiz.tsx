import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SymmetryG2Matcher } from './SymmetryG2Matcher';
import { SymmetryG2Sorter } from './SymmetryG2Sorter';
import { SYM_FONT, AXIS_COLOR, CellGridPart, Cell, mirrorV, GlyphPart, SymShape, SymShapePart } from './SymmetryG2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={SYM_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const ButterflyFig: React.FC = () => (
  <QFig h={130}>
    <g transform="translate(130 65)">
      {[1, -1].map((sx) => (
        <g key={sx} transform={`scale(${sx} 1)`}>
          <path d="M 3 -8 C 20 -50, 70 -40, 55 -5 C 45 10, 15 5, 3 0 Z" fill="#a78bfa" stroke="#4c1d95" strokeWidth="2" />
          <path d="M 3 2 C 25 5, 50 15, 38 40 C 25 55, 8 30, 3 10 Z" fill="#f9a8d4" stroke="#9d174d" strokeWidth="2" />
          <circle cx="32" cy="-20" r="7" fill="#facc15" />
          <path d="M 2 -30 Q 10 -48 18 -52" fill="none" stroke="#1e293b" strokeWidth="2" />
        </g>
      ))}
      <ellipse cx="0" cy="0" rx="4" ry="30" fill="#1e293b" />
    </g>
  </QFig>
);

const GlyphRowFig: React.FC<{ chars: string[]; axis?: 'v' | 'h'; numbered?: boolean }> = ({ chars, axis, numbered }) => (
  <QFig h={numbered ? 100 : 80}>
    {chars.map((ch, i) => {
      const x = (260 / chars.length) * i + 260 / chars.length / 2 - 15;
      return (
        <g key={ch}>
          <GlyphPart ch={ch} x={x} y={14} s={1.5} axis={axis} />
          {numbered && (
            <text x={x + 15} y={90} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{i + 1}.</text>
          )}
        </g>
      );
    })}
  </QFig>
);

const GridFig: React.FC<{ cols: number; rows: number; cells: { c: Cell; fill: string }[]; axisV?: number; axisH?: number; colNumbers?: boolean; rowNumbers?: boolean }> = ({
  cols,
  rows,
  cells,
  axisV,
  axisH,
  colNumbers,
  rowNumbers
}) => {
  const cell = Math.min(26, Math.floor(210 / cols), Math.floor(140 / rows));
  const x0 = (260 - cols * cell) / 2;
  const y0 = colNumbers ? 26 : 14;
  return (
    <QFig h={y0 + rows * cell + 14}>
      <CellGridPart x={x0} y={y0} cols={cols} rows={rows} cell={cell} cells={cells} axisV={axisV} axisH={axisH} />
      {colNumbers &&
        Array.from({ length: cols }, (_, i) => (
          <text key={i} x={x0 + i * cell + cell / 2} y={y0 - 8} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{i + 1}.</text>
        ))}
      {rowNumbers &&
        Array.from({ length: rows }, (_, i) => (
          <text key={i} x={x0 - 14} y={y0 + i * cell + cell / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{i + 1}.</text>
        ))}
    </QFig>
  );
};

const BLUE = '#6366f1';
const PINK = '#ec4899';
const pairCells = (left: Cell[], right: Cell[]) => [...left.map((c) => ({ c, fill: BLUE })), ...right.map((c) => ({ c, fill: PINK }))];

const ShapesRowFig: React.FC<{ kinds: SymShape[]; numbered?: boolean }> = ({ kinds, numbered = true }) => (
  <QFig h={110}>
    {kinds.map((k, i) => {
      const cx = (260 / kinds.length) * i + 260 / kinds.length / 2;
      return (
        <g key={i}>
          <SymShapePart kind={k} cx={cx} cy={48} s={kinds.length > 3 ? 0.9 : 1.1} />
          {numbered && <text x={cx} y={100} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{i + 1}.</text>}
        </g>
      );
    })}
  </QFig>
);

const ShapeLineFig: React.FC<{ kind: SymShape; line: [number, number, number, number] }> = ({ kind, line }) => (
  <QFig h={110}>
    <SymShapePart kind={kind} cx={130} cy={55} s={1.7} />
    <line x1={line[0]} y1={line[1]} x2={line[2]} y2={line[3]} stroke={AXIS_COLOR} strokeWidth="3" strokeDasharray="6 4" />
  </QFig>
);

const KidMirrorFig: React.FC = () => (
  <QFig h={120}>
    <rect x="126" y="10" width="8" height="100" fill="#bae6fd" stroke="#0369a1" />
    {[false, true].map((flip) => (
      <g key={String(flip)} transform={flip ? 'translate(260 0) scale(-1 1)' : undefined} opacity={flip ? 0.7 : 1}>
        <circle cx="80" cy="35" r="13" fill="#fcd9b6" stroke="#9a3412" strokeWidth="1.6" />
        <rect x="66" y="50" width="28" height="36" rx="7" fill="#34d399" stroke="#065f46" strokeWidth="1.6" />
        <line x1="68" y1="56" x2="48" y2="26" stroke="#34d399" strokeWidth="7" strokeLinecap="round" />
        <line x1="92" y1="56" x2="102" y2="84" stroke="#34d399" strokeWidth="7" strokeLinecap="round" />
        <line x1="74" y1="86" x2="74" y2="108" stroke="#1e293b" strokeWidth="5" />
        <line x1="86" y1="86" x2="86" y2="108" stroke="#1e293b" strokeWidth="5" />
      </g>
    ))}
    <text x="30" y="70" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a">Zoli</text>
  </QFig>
);

const FoldHeartFig: React.FC = () => (
  <QFig h={120}>
    <rect x="90" y="15" width="70" height="90" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    <path d="M 160 40 C 130 22, 110 55, 160 92" fill="#f472b6" stroke="#9d174d" strokeWidth="2" />
    <line x1="160" y1="10" x2="160" y2="110" stroke={AXIS_COLOR} strokeWidth="3" />
    <text x="205" y="62" textAnchor="middle" fontSize="11" fill="#475569">hajtás</text>
  </QFig>
);

const WaterFig: React.FC = () => {
  const tree = (
    <g>
      <rect x="125" y="50" width="10" height="25" fill="#92400e" />
      <polygon points="130,12 158,52 102,52" fill="#22c55e" stroke="#166534" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="130" cy="12" r="5" fill="#facc15" stroke="#a16207" />
    </g>
  );
  return (
    <QFig h={150}>
      <rect x="2" y="75" width="256" height="73" fill="#7dd3fc" opacity="0.55" />
      {tree}
      <g transform="translate(0 150) scale(1 -1)" opacity="0.55">
        {tree}
      </g>
    </QFig>
  );
};

const DigitsFig: React.FC<{ chars: string[] }> = ({ chars }) => (
  <QFig h={80}>
    {chars.map((ch, i) => (
      <GlyphPart key={ch} ch={ch} x={(260 / chars.length) * i + 260 / chars.length / 2 - 15} y={14} s={1.5} axis="h" />
    ))}
  </QFig>
);

/** Három kis rács: minta (kék) és rajz (rózsaszín), A / B / C felirattal. */
const CandidatesFig: React.FC<{ left: Cell[] }> = ({ left }) => {
  const variants: { label: string; right: Cell[] }[] = [
    { label: 'A', right: left.map((c) => [c[0] + 3, c[1]] as Cell) },
    { label: 'B', right: left.map((c) => mirrorV(c, 3)) },
    { label: 'C', right: left.map((c) => [Math.min(5, mirrorV(c, 3)[0] + 1), c[1]] as Cell) }
  ];
  return (
    <QFig h={100}>
      {variants.map((v, i) => (
        <g key={v.label}>
          <CellGridPart x={10 + i * 84} y={14} cols={6} rows={4} cell={12} cells={pairCells(left, v.right)} axisV={3} />
          <text x={46 + i * 84} y={86} textAnchor="middle" fontSize="15" fontWeight="900" fill="#be123c">{v.label}</text>
        </g>
      ))}
    </QFig>
  );
};

const TrianglesFig: React.FC = () => (
  <QFig h={110}>
    <polygon points="20,75 75,75 30,25" fill="#a3e635" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
    <polygon points="105,75 155,75 130,18" fill="#38bdf8" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
    <polygon points="180,75 245,60 205,22" fill="#fbbf24" stroke="#334155" strokeWidth="2" strokeLinejoin="round" />
    <text x="42" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">1.</text>
    <text x="130" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">2.</text>
    <text x="212" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">3.</text>
  </QFig>
);

const FishPart: React.FC<{ x: number; y: number; sx?: number; sy?: number }> = ({ x, y, sx = 1, sy = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
    <ellipse cx="0" cy="0" rx="14" ry="8" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.6" />
    <polygon points="12,0 22,-8 22,8" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.6" strokeLinejoin="round" />
    <polygon points="-2,-8 6,-15 8,-7" fill="#0ea5e9" stroke="#0369a1" strokeWidth="1.2" />
    <circle cx="-7" cy="-2" r="2" fill="#0c4a6e" />
  </g>
);

const FishPairsFig: React.FC = () => (
  <QFig h={120}>
    {[0, 1, 2].map((i) => {
      const cx = 45 + i * 85;
      return (
        <g key={i}>
          <line x1={cx} y1="15" x2={cx} y2="80" stroke={AXIS_COLOR} strokeWidth="2.5" />
          <FishPart x={cx - 22} y={48} />
          {i === 0 && <FishPart x={cx + 22} y={48} />}
          {i === 1 && <FishPart x={cx + 22} y={48} sx={-1} />}
          {i === 2 && <FishPart x={cx + 22} y={48} sy={-1} />}
          <text x={cx} y={104} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{i + 1}.</text>
        </g>
      );
    })}
  </QFig>
);

const FoldHolesFig: React.FC = () => (
  <QFig h={120}>
    <rect x="80" y="15" width="80" height="90" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    <path d="M 160 40 A 12 12 0 0 0 160 64 Z" fill="#ffffff" stroke="#334155" strokeWidth="2" />
    <circle cx="110" cy="80" r="9" fill="#ffffff" stroke="#334155" strokeWidth="2" />
    <line x1="160" y1="10" x2="160" y2="110" stroke={AXIS_COLOR} strokeWidth="3" />
    <text x="205" y="62" textAnchor="middle" fontSize="11" fill="#475569">hajtás</text>
  </QFig>
);

const CastleHalfFig: React.FC = () => {
  const cells: Cell[] = [];
  const heights = [3, 2, 4, 5];
  heights.forEach((h, c) => {
    for (let r = 0; r < h; r++) cells.push([c + 2, 5 - r]);
  });
  return <GridFig cols={10} rows={6} cells={cells.map((c) => ({ c, fill: '#f59e0b' }))} axisV={6} />;
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
const Q11: Cell[] = [[1, 0]];
const SMALL_LEFT: Cell[] = [
  [2, 0],
  [1, 1],
  [2, 1],
  [0, 2]
];
const FIVE_LEFT: Cell[] = [
  [2, 0],
  [1, 1],
  [2, 1],
  [0, 2],
  [1, 3]
];
const CAND_LEFT: Cell[] = [
  [1, 0],
  [2, 0],
  [2, 1],
  [1, 2]
];

export const SYMMETRY_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'sym-q1',
    level: 1,
    questionTypeBadge: 'Tükörtengely',
    figure: <ButterflyFig />,
    question: 'Hol van a lepke tükörtengelye?',
    options: ['középen, függőlegesen', 'középen, vízszintesen', 'nincs tükörtengelye'],
    correctAnswer: 0,
    explanation: 'A lepke bal és jobb szárnya egyforma. A tengely középen, föntről lefelé megy.'
  },
  {
    id: 'sym-q2',
    level: 1,
    questionTypeBadge: 'Tükrös betű',
    figure: <GlyphRowFig chars={['F', 'A', 'L', 'R']} axis="v" />,
    question: 'Melyik betű tükrös a piros vonalra?',
    options: ['az A', 'az F', 'az L', 'az R'],
    correctAnswer: 0,
    explanation: 'Az A bal és jobb fele egyforma. Az F, az L és az R nem ilyen.'
  },
  {
    id: 'sym-q3',
    level: 1,
    questionTypeBadge: 'Távolság',
    figure: <GridFig cols={8} rows={3} cells={[{ c: [3, 1], fill: BLUE }]} axisV={4} />,
    question: 'A kék mező közvetlenül a tükör mellett van. Hol lesz a tükörképe?',
    options: ['közvetlenül a tükör túloldalán', '2 mezővel távolabb', 'a kék mező helyén'],
    correctAnswer: 0,
    explanation: 'A tükörkép ugyanolyan messze van a tükörtől. Ez a mező szorosan a tükör mellett lesz a túloldalon.'
  },
  {
    id: 'sym-q4',
    level: 1,
    questionTypeBadge: 'Tükrös alakzat',
    figure: <ShapesRowFig kinds={['altalanos3', 'sziv', 'ferde']} />,
    question: 'Melyik alakzat tükrös?',
    options: ['a 2.', 'az 1.', 'a 3.'],
    correctAnswer: 0,
    explanation: 'A szívet középen félbehajtva a két fél fedi egymást. A másik kettőt sehogy sem lehet így hajtani.'
  },
  {
    id: 'sym-q5',
    level: 1,
    questionTypeBadge: 'Tükörkép',
    figure: <KidMirrorFig />,
    question: 'Zoli a jobb kezét emeli. A tükörképe melyik kezét emeli?',
    options: ['a bal kezét', 'a jobb kezét', 'mindkettőt'],
    correctAnswer: 0,
    explanation: 'A tükörben a jobb és a bal felcserélődik. A tükörkép a bal kezét emeli.'
  },
  {
    id: 'sym-q6',
    level: 1,
    questionTypeBadge: 'Félbehajtás',
    figure: <FoldHeartFig />,
    question: 'Kivágod a félbehajtott papírból. Mit kapsz, ha kinyitod?',
    options: ['egy egész szívet', 'egy fél szívet', 'két külön szívet'],
    correctAnswer: 0,
    explanation: 'A fél szív a hajtásnál összeér a másik felével. Kinyitva egy egész, tükrös szív lesz.'
  },
  {
    id: 'sym-q7',
    level: 1,
    questionTypeBadge: 'Tengely-e?',
    figure: <ShapeLineFig kind="teglalap" line={[130, 20, 130, 90]} />,
    question: 'Tükörtengely ez a piros vonal?',
    options: ['igen', 'nem'],
    correctAnswer: 0,
    explanation: 'A téglalapot középen félbehajtva a két fél pontosan fedi egymást. Ez tükörtengely.'
  },
  {
    id: 'sym-q8',
    level: 1,
    questionTypeBadge: 'Víz tükre',
    figure: <WaterFig />,
    question: 'Hol van itt a tükör?',
    options: ['a víz szélén, vízszintesen', 'középen, függőlegesen', 'nincs tükör'],
    correctAnswer: 0,
    explanation: 'A fa a vízben fejjel lefelé látszik. A tükör a víz széle, vízszintes vonal.'
  },
  {
    id: 'sym-q9',
    level: 1,
    questionTypeBadge: 'Tükrös számjegy',
    figure: <DigitsFig chars={['4', '3', '7', '2']} />,
    question: 'Melyik számjegy tükrös a vízszintes piros vonalra?',
    options: ['a 3-as', 'a 4-es', 'a 7-es', 'a 2-es'],
    correctAnswer: 0,
    explanation: 'A 3-as felső és alsó íve egyforma. A többi számjegy fele nem egyforma.'
  },
  {
    id: 'sym-q10',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    figure: <GridFig cols={6} rows={4} cells={pairCells(SMALL_LEFT, SMALL_LEFT.map((c) => mirrorV(c, 3)))} axisV={3} />,
    question: 'A kék a minta, a rózsaszín a tükörkép. Jó a tükrözés?',
    options: ['igen, jó', 'nem jó'],
    correctAnswer: 0,
    explanation: 'Minden kék mezőnek ugyanolyan messze van a párja a túloldalon. Jó a tükrözés.'
  },

  // ---------- 2. szint ----------
  {
    id: 'sym-q11',
    level: 2,
    questionTypeBadge: 'Oszlop',
    figure: <GridFig cols={8} rows={1} cells={Q11.map((c) => ({ c, fill: BLUE }))} axisV={4} colNumbers />,
    question: 'Hányadik oszlopba kerül a kék mező tükörképe?',
    options: ['a 7.', 'a 6.', 'a 2.', 'a 8.'],
    correctAnswer: 0,
    explanation: 'A 2. oszlop a tengelytől a 3. mező (4., 3., 2.). A túloldalon is a 3.: 5., 6., 7. oszlop.'
  },
  {
    id: 'sym-q12',
    level: 2,
    questionTypeBadge: 'Átló',
    figure: <ShapeLineFig kind="teglalap" line={[80, 82, 180, 28]} />,
    question: 'Tükörtengely ez a piros vonal?',
    options: ['nem, a két fél nem fedi egymást', 'igen, félbevágja'],
    correctAnswer: 0,
    explanation: 'Ha az átló mentén hajtod, a csúcsok kilógnak. Az átló kettévágja, de nem tükörtengely.'
  },
  {
    id: 'sym-q13',
    level: 2,
    questionTypeBadge: 'Tengelyek száma',
    figure: <ShapesRowFig kinds={['teglalap']} numbered={false} />,
    question: 'Hány tükörtengelye van a téglalapnak?',
    options: ['2', '4', '1', '0'],
    correctAnswer: 0,
    explanation: 'Egy függőleges és egy vízszintes tengelye van. Az átlói nem tengelyek. Ez 2.'
  },
  {
    id: 'sym-q14',
    level: 2,
    questionTypeBadge: 'Tengelyek száma',
    figure: <ShapesRowFig kinds={['negyzet']} numbered={false} />,
    question: 'Hány tükörtengelye van a négyzetnek?',
    options: ['4', '2', '1', '8'],
    correctAnswer: 0,
    explanation: 'Függőleges, vízszintes, és a 2 átló is. A négyzetnek 4 tükörtengelye van.'
  },
  {
    id: 'sym-q15',
    level: 2,
    questionTypeBadge: 'Vízszintes tengely',
    figure: <GlyphRowFig chars={['A', 'E', 'T', 'F']} />,
    question: 'Melyik betűnek van vízszintes tükörtengelye?',
    options: ['az E', 'az A', 'a T', 'az F'],
    correctAnswer: 0,
    explanation: 'Az E felső és alsó fele egyforma. Az A és a T csak függőlegesen tükrös, az F sehogy.'
  },
  {
    id: 'sym-q16',
    level: 2,
    questionTypeBadge: 'Melyik a jó?',
    figure: <CandidatesFig left={CAND_LEFT} />,
    question: 'Melyik rajzon jó a tükörkép?',
    options: ['B', 'A', 'C'],
    correctAnswer: 0,
    explanation: 'Az A-n csak áttolták a mintát. A C-n elcsúszott 1 mezővel. A B a jó tükörkép.'
  },
  {
    id: 'sym-q17',
    level: 2,
    questionTypeBadge: 'Háromszögek',
    figure: <TrianglesFig />,
    question: 'Melyik háromszögnek van tükörtengelye?',
    options: ['a 2.', 'az 1.', 'a 3.'],
    correctAnswer: 0,
    explanation: 'A 2. háromszög két oldala egyforma hosszú. Középen félbehajtva a két fél fedi egymást.'
  },
  {
    id: 'sym-q18',
    level: 2,
    questionTypeBadge: 'Fogalom',
    question: 'Mi a tükörtengely?',
    options: [
      'az a vonal, amely mentén félbehajtva a két rész fedi egymást',
      'a síkidom leghosszabb oldala',
      'bármelyik vonal, ami átmegy a síkidomon'
    ],
    correctAnswer: 0,
    explanation: 'A tükörtengely mentén hajtva a két fél pontosan egymásra kerül.'
  },
  {
    id: 'sym-q19',
    level: 2,
    questionTypeBadge: 'Víz tükre',
    figure: <WaterFig />,
    question: 'Hol látszik a vízben a fa teteje (a csillag)?',
    options: ['lent, a tükörkép alján', 'fent, a tükörkép tetején', 'a víz szélén'],
    correctAnswer: 0,
    explanation: 'A fa teteje van a legmesszebb a víztől. A tükörképben is a legmesszebb van: legalul.'
  },
  {
    id: 'sym-q20',
    level: 2,
    questionTypeBadge: 'Mezők száma',
    figure: <GridFig cols={6} rows={4} cells={FIVE_LEFT.map((c) => ({ c, fill: BLUE }))} axisV={3} />,
    question: 'Hány mezőt kell kiszínezned a túloldalon, hogy kész legyen a tükörkép?',
    options: ['5', '4', '10', '6'],
    correctAnswer: 0,
    explanation: 'Minden kék mezőnek egy párja van. 5 kék mező van, tehát 5 mezőt kell kiszínezni.'
  },

  // ---------- 3. szint ----------
  {
    id: 'sym-q21',
    level: 3,
    questionTypeBadge: 'Sor',
    figure: <GridFig cols={1} rows={6} cells={[{ c: [0, 0], fill: BLUE }]} axisH={3} rowNumbers />,
    question: 'A tengely a 3. és a 4. sor között van. Hányadik sorba kerül a kék mező tükörképe?',
    options: ['a 6.', 'az 5.', 'az 1.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'Az 1. sor a tengelytől a 3. mező (3., 2., 1.). Lefelé is a 3.: 4., 5., 6. sor.'
  },
  {
    id: 'sym-q22',
    level: 3,
    questionTypeBadge: 'Tükrös pár?',
    figure: <GridFig cols={8} rows={1} cells={[{ c: [1, 0], fill: BLUE }, { c: [6, 0], fill: PINK }]} axisV={4} colNumbers />,
    question: 'Tükrös egymásra a 2. és a 7. oszlop mezője?',
    options: ['igen, mindkettő a tengelytől a 3. mező', 'nem, a 6. oszlop kellene', 'nem, a 8. oszlop kellene'],
    correctAnswer: 0,
    explanation: 'Balra: 4., 3., 2. – ez a 3. mező. Jobbra: 5., 6., 7. – ez is a 3. mező. Tükrösek.'
  },
  {
    id: 'sym-q23',
    level: 3,
    questionTypeBadge: 'Tükrös szó',
    question: 'Melyik szó marad ugyanaz egy függőleges tükörben?',
    options: ['AHA', 'ALMA', 'BABA', 'KATI'],
    correctAnswer: 0,
    explanation: 'Az A és a H betű tükrös, és az AHA visszafelé is AHA. A többi szóban van nem tükrös betű (L, B, K).'
  },
  {
    id: 'sym-q24',
    level: 3,
    questionTypeBadge: 'Lyukak',
    figure: <FoldHolesFig />,
    question: 'A félbehajtott papíron 2 lyukat vágtál. Hány lyuk lesz, ha kinyitod?',
    options: ['3', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'A hajtásnál lévő fél kör 1 egész lyuk lesz. A másik lyuk megkettőződik: 2 lyuk. 1 + 2 = 3.'
  },
  {
    id: 'sym-q25',
    level: 3,
    questionTypeBadge: 'Tükörkép-pár',
    figure: <FishPairsFig />,
    question: 'Melyik párban látod a hal tükörképét a piros vonalra?',
    options: ['a 2.', 'az 1.', 'a 3.'],
    correctAnswer: 0,
    explanation: 'Az 1. párban a hal csak át van tolva. A 3.-ban fejjel lefelé fordult. A 2.-ban a hal megfordult, mint a tükörben: ez tükörkép.'
  },
  {
    id: 'sym-q26',
    level: 3,
    questionTypeBadge: 'Tengelyek száma',
    figure: <ShapesRowFig kinds={['szabalyos3']} numbered={false} />,
    question: 'Ennek a háromszögnek minden oldala egyforma. Hány tükörtengelye van?',
    options: ['3', '1', '6', '0'],
    correctAnswer: 0,
    explanation: 'Mindegyik csúcsból a szemközti oldal közepéig húzhatsz egy tengelyt. Ez 3 tengely.'
  },
  {
    id: 'sym-q27',
    level: 3,
    questionTypeBadge: 'Fél vár',
    figure: <CastleHalfFig />,
    question: 'A vár fele 4 mező széles. Milyen széles lesz az egész vár?',
    options: ['8 mező', '4 mező', '9 mező', '7 mező'],
    correctAnswer: 0,
    explanation: 'A tükörkép is 4 mező széles. 4 + 4 = 8 mező.'
  },
  {
    id: 'sym-q28',
    level: 3,
    questionTypeBadge: 'Nincs tengely',
    figure: <ShapesRowFig kinds={['kor', 'negyzet', 'ferde', 'egyenloszaru']} />,
    question: 'Melyiknek NINCS tükörtengelye?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A ferde négyszöget sehogy sem tudod úgy félbehajtani, hogy a két fél fedje egymást.'
  },
  {
    id: 'sym-q29',
    level: 3,
    questionTypeBadge: 'Áttolás',
    figure: <GridFig cols={6} rows={4} cells={pairCells(CAND_LEFT, CAND_LEFT.map((c) => [c[0] + 3, c[1]] as Cell))} axisV={3} />,
    question: 'Kati így rajzolta meg a kék minta tükörképét. Jó?',
    options: ['nem, csak áttolta', 'igen, ez tükörkép'],
    correctAnswer: 0,
    explanation: 'A tengely melletti kék mezők párja a túloldalon is a tengely mellett lenne. Kati csak áttolta a mintát.'
  },
  {
    id: 'sym-q30',
    level: 3,
    questionTypeBadge: 'Tükrös szám',
    question: 'Melyik szám marad ugyanaz egy vízszintes tükörben?',
    options: ['38', '34', '27', '45'],
    correctAnswer: 0,
    explanation: 'A 3-as és a 8-as felső és alsó fele egyforma. Ezért a 38 vízszintes tükörben is 38.'
  }
];

export const SymmetryG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="geometria"
    topicId="g2-geo-szimmetria-quiz"
    subtopicId="szimmetria-tukrozes"
    title="3. Szimmetria, tükrözés – Kvíz"
    subtitle="30 feladat 3 szinten: tükörkép, tükörtengely, tükrözés négyzetrácson, tükrös betűk és síkidomok."
    badge="2. OSZTÁLY • VII. GEOMETRIA • KVÍZ"
    questions={SYMMETRY_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Tükörkép',
        items: ['A tükörben a jobb és a bal felcserélődik', 'A tükörkép ugyanolyan messze van a tükörtől', 'A víz tükrében fejjel lefelé látszik']
      },
      {
        title: 'Tükörtengely',
        items: ['Félbehajtva a két fél fedi egymást', 'négyzet: 4, téglalap: 2', 'egyenlő szárú háromszög: 1', 'Az átló nem mindig tengely!']
      },
      {
        title: 'Négyzetrácson',
        items: ['Számold a mezőket a tengelytől', 'Ugyanabban a sorban maradj', 'Ne told át, tükrözd!', 'Tükrös betűk: A, T, H, E, K']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<SymmetryG2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<SymmetryG2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default SymmetryG2Quiz;
