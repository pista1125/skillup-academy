import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SymmetryG3Matcher } from './SymmetryG3Matcher';
import { SymmetryG3Sorter } from './SymmetryG3Sorter';
import { INK, UNK, QFig, AxisLine, GridG, CellsG, Heart, HalfHeart, House, Tree, Letter, BigArrow, Flag, RightAngle } from './SymmetryG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const SLOT = (i: number) => 30 + 60 * i;
const Lbl: React.FC<{ i: number; t: string; y?: number }> = ({ i, t, y = 124 }) => (
  <text x={SLOT(i)} y={y} textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{t}</text>
);

/** Rács pontokkal: a pontok rácspontokon vannak (gx, gy rácskoordináta). */
const DotGridFig: React.FC<{
  cols: number;
  rows: number;
  axisV?: number;
  axisH?: number;
  dots: { gx: number; gy: number; color: string; label?: string }[];
  water?: boolean;
  h?: number;
}> = ({ cols, rows, axisV, axisH, dots, water, h }) => {
  const s = 24;
  const x0 = (240 - cols * s) / 2;
  const y0 = 16;
  const H = h ?? y0 + rows * s + 18;
  return (
    <QFig h={H}>
      {water && axisH !== undefined && <rect x={x0} y={y0 + axisH * s} width={cols * s} height={(rows - axisH) * s} fill="#e0f2fe" />}
      <GridG x={x0} y={y0} cols={cols} rows={rows} s={s} />
      {axisV !== undefined && <AxisLine x1={x0 + axisV * s} y1={y0 - 8} x2={x0 + axisV * s} y2={y0 + rows * s + 8} />}
      {axisH !== undefined && <AxisLine x1={x0 - 8} y1={y0 + axisH * s} x2={x0 + cols * s + 8} y2={y0 + axisH * s} />}
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={x0 + d.gx * s} cy={y0 + d.gy * s} r="6.5" fill={d.color} stroke="#1e293b" strokeWidth="1.4" />
          {d.label && (
            <text x={x0 + d.gx * s + 9} y={y0 + d.gy * s + 5} fontSize="13" fontWeight="bold" fill={INK}>
              {d.label}
            </text>
          )}
        </g>
      ))}
    </QFig>
  );
};

/** Rács kiszínezett kockákkal és függőleges tengellyel. */
const CellGridFig: React.FC<{ cols: number; rows: number; axis: number; cells: [number, number, string][]; s?: number }> = ({ cols, rows, axis, cells, s = 20 }) => {
  const x0 = (240 - cols * s) / 2;
  const y0 = 14;
  return (
    <QFig h={y0 + rows * s + 14}>
      <GridG x={x0} y={y0} cols={cols} rows={rows} s={s} />
      <CellsG x={x0} y={y0} s={s} cells={cells} />
      <AxisLine x1={x0 + axis * s} y1={y0 - 8} x2={x0 + axis * s} y2={y0 + rows * s + 8} />
    </QFig>
  );
};

const poly = (pts: number[][], fill: string, stroke: string) => (
  <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={fill} stroke={stroke} strokeWidth="2" strokeLinejoin="round" />
);

/** Négy kis síkidom A–D betűvel. */
const ShapesABCD: React.FC<{ shapes: React.ReactNode[] }> = ({ shapes }) => (
  <QFig h={136}>
    {shapes.map((sh, i) => (
      <g key={i}>{sh}</g>
    ))}
    {['A', 'B', 'C', 'D'].map((t, i) => (
      <Lbl key={t} i={i} t={t} />
    ))}
  </QFig>
);

/** Vonalak egy síkidomon, számozva. */
const NumberedLine: React.FC<{ x1: number; y1: number; x2: number; y2: number; n: number; lx: number; ly: number }> = ({ x1, y1, x2, y2, n, lx, ly }) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#334155" strokeWidth="2.4" strokeDasharray="6 4" />
    <circle cx={lx} cy={ly} r="10" fill="#fff" stroke="#334155" strokeWidth="1.6" />
    <text x={lx} y={ly + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{n}</text>
  </g>
);

/** L alakú négykockás alak (cellák: [sor, oszlop]) adott helyen. */
const Tet: React.FC<{ x: number; y: number; cells: [number, number][]; s?: number; fill?: string }> = ({ x, y, cells, s = 13, fill = '#f97316' }) => (
  <g>
    {cells.map(([r, c], i) => (
      <rect key={i} x={x + c * s} y={y + r * s} width={s} height={s} fill={fill} stroke="#7c2d12" strokeWidth="1.4" />
    ))}
  </g>
);
const L_SHAPE: [number, number][] = [
  [0, 0],
  [1, 0],
  [2, 0],
  [2, 1]
];
const mirrorV = (cells: [number, number][]): [number, number][] => cells.map(([r, c]) => [r, 1 - c]);
const mirrorH = (cells: [number, number][]): [number, number][] => cells.map(([r, c]) => [2 - r, c]);

export const SYMMETRY_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'symg3-q1',
    level: 1,
    questionTypeBadge: 'Szimmetrikus',
    figure: (
      <ShapesABCD
        shapes={[
          poly(
            [
              [14, 92],
              [52, 96],
              [24, 34]
            ],
            '#bbf7d0',
            '#15803d'
          ),
          <Heart key="h" cx={SLOT(1)} cy={64} s={0.62} />,
          <Flag key="f" x={SLOT(2) - 14} y={100} h={70} />,
          poly(
            [
              [172, 44],
              [222, 44],
              [208, 92],
              [158, 92]
            ],
            '#bfdbfe',
            '#1d4ed8'
          )
        ]}
      />
    ),
    question: 'Melyik ábra szimmetrikus?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A szívet középen félbehajthatod: a két fele pontosan fedi egymást. A többi ábrának nincs tükörtengelye.'
  },
  {
    id: 'symg3-q2',
    level: 1,
    questionTypeBadge: 'Betűk',
    question: 'Melyik betűnek van tükörtengelye?',
    options: ['A', 'F', 'J', 'G'],
    correctAnswer: 0,
    explanation: 'Az A betű bal és jobb fele egyforma: a tükörtengelye függőleges. Az F, a J és a G két fele nem fedi egymást.'
  },
  {
    id: 'symg3-q3',
    level: 1,
    questionTypeBadge: 'Tükörtengely',
    figure: (
      <QFig h={140}>
        <rect x="50" y="34" width="140" height="76" fill="#fde68a" stroke="#a16207" strokeWidth="2" />
        <NumberedLine x1={120} y1={24} x2={120} y2={120} n={1} lx={120} ly={128} />
        <NumberedLine x1={42} y1={29} x2={198} y2={115} n={2} lx={30} ly={22} />
        <NumberedLine x1={78} y1={24} x2={78} y2={120} n={3} lx={78} ly={128} />
        <NumberedLine x1={170} y1={24} x2={70} y2={120} n={4} lx={180} ly={18} />
      </QFig>
    ),
    question: 'Melyik vonal a téglalap tükörtengelye?',
    options: ['1-es', '2-es', '3-as', '4-es'],
    correctAnswer: 0,
    explanation: 'Az 1-es vonal pont középen van. Ha mentén félbehajtod, a két fele pontosan fedi egymást.'
  },
  {
    id: 'symg3-q4',
    level: 1,
    questionTypeBadge: 'Négyzetrács',
    figure: <DotGridFig cols={8} rows={3} axisV={4} dots={[{ gx: 1, gy: 1, color: '#ef4444' }]} />,
    question: 'A piros pont 3 kockányira van a tengelytől. Hány kockányira lesz a tükörképe?',
    options: ['3', '6', '2', '4'],
    correctAnswer: 0,
    explanation: 'A tükörkép ugyanannyira van a tengelytől, csak a másik oldalon: 3 kockányira.'
  },
  {
    id: 'symg3-q5',
    level: 1,
    questionTypeBadge: 'Tükörkép',
    figure: (
      <QFig h={120}>
        <BigArrow cx={68} cy={60} len={80} dir="right" />
        <AxisLine x1={120} y1={14} x2={120} y2={106} />
        <text x="172" y="72" textAnchor="middle" fontSize="34" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    ),
    question: 'Merre mutat a nyíl tükörképe?',
    options: ['balra', 'jobbra', 'felfelé', 'lefelé'],
    correctAnswer: 0,
    explanation: 'A tükörben a kép megfordul: a jobbra mutató nyíl tükörképe balra mutat.'
  },
  {
    id: 'symg3-q6',
    level: 1,
    questionTypeBadge: 'Tengelyek száma',
    figure: (
      <QFig h={110}>
        <rect x="55" y="25" width="130" height="62" fill="#fde68a" stroke="#a16207" strokeWidth="2.4" />
      </QFig>
    ),
    question: 'Hány tükörtengelye van ennek a téglalapnak?',
    options: ['2', '4', '1', '0'],
    correctAnswer: 0,
    explanation: 'A téglalapot félbehajthatod hosszában és keresztben is. Ez 2 tükörtengely. Az átlói nem tükörtengelyek.'
  },
  {
    id: 'symg3-q7',
    level: 1,
    questionTypeBadge: 'Tengelyek száma',
    figure: (
      <QFig h={120}>
        <rect x="80" y="20" width="80" height="80" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.4" />
      </QFig>
    ),
    question: 'Hány tükörtengelye van a négyzetnek?',
    options: ['4', '2', '1', '8'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 2 középvonala és 2 átlója is tükörtengely: összesen 4.'
  },
  {
    id: 'symg3-q8',
    level: 1,
    questionTypeBadge: 'Szimmetrikus',
    figure: (
      <QFig h={136}>
        <House x={SLOT(0) - 22} y={100} w={44} door="left" />
        <House x={SLOT(1) - 22} y={100} w={44} chimney />
        <House x={SLOT(2) - 22} y={100} w={44} />
        <House x={SLOT(3) - 22} y={100} w={44} door="left" chimney />
        {['A', 'B', 'C', 'D'].map((t, i) => (
          <Lbl key={t} i={i} t={t} />
        ))}
      </QFig>
    ),
    question: 'Melyik házikó szimmetrikus?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A C házikón az ajtó középen van, és nincs kémény. A két fele pontosan egyforma.'
  },
  {
    id: 'symg3-q9',
    level: 1,
    questionTypeBadge: 'Félbehajtás',
    figure: (
      <QFig h={130}>
        <rect x="60" y="14" width="80" height="100" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 140 14 L 152 8 L 152 108 L 140 114 Z" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.5" />
        <HalfHeart cx={140} cy={64} s={1.05} />
        <AxisLine x1={140} y1={10} x2={140} y2={120} />
        <text x="196" y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>hajtás</text>
      </QFig>
    ),
    question: 'A hajtásnál ezt vágtuk ki. Mit kapsz, ha kinyitod?',
    options: ['egy egész szívet', 'egy fél szívet', 'két külön szívet', 'egy kört'],
    correctAnswer: 0,
    explanation: 'A hajtás vonala lesz a tükörtengely. Kinyitva a fél szív kiegészül: egész szív lesz.'
  },
  {
    id: 'symg3-q10',
    level: 1,
    questionTypeBadge: 'Tükörkép',
    figure: (
      <QFig h={150}>
        <rect x="30" y="80" width="180" height="62" rx="6" fill="#e0f2fe" />
        <Tree cx={120} y={80} h={60} />
        <AxisLine x1={22} y1={80} x2={218} y2={80} />
        <text x="120" y="122" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    ),
    question: 'A fa a tó partján áll. Milyen a tükörképe a vízben?',
    options: ['fejjel lefelé álló fa', 'ugyanolyan, felfelé álló fa', 'fekvő fa', 'sokkal kisebb fa'],
    correctAnswer: 0,
    explanation: 'A víz tükre vízszintes tükörtengely. A fa csúcsa a tükörképben lent van: fejjel lefelé áll.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'symg3-q11',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <DotGridFig
        cols={8}
        rows={3}
        axisV={4}
        dots={[
          { gx: 1, gy: 1, color: '#ef4444' },
          { gx: 5, gy: 1, color: '#94a3b8', label: 'A' },
          { gx: 7, gy: 2, color: '#94a3b8', label: 'B' },
          { gx: 7, gy: 1, color: '#94a3b8', label: 'C' },
          { gx: 7, gy: 0, color: '#94a3b8', label: 'D' }
        ]}
      />
    ),
    question: 'Melyik szürke pont a piros pont tükörképe?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A piros pont 3 kockányira van a tengelytől. A tükörképe is 3 kockányira van, ugyanabban a sorban: ez a C.'
  },
  {
    id: 'symg3-q12',
    level: 2,
    questionTypeBadge: 'Tengelyek száma',
    figure: (
      <QFig h={130}>
        {poly(
          [
            [120, 18],
            [178, 118],
            [62, 118]
          ],
          '#fbcfe8',
          '#be185d'
        )}
      </QFig>
    ),
    question: 'Ennek a háromszögnek minden oldala egyforma hosszú. Hány tükörtengelye van?',
    options: ['3', '1', '0', '6'],
    correctAnswer: 0,
    explanation: 'Mindegyik csúcsból húzhatsz egy tükörtengelyt a szemközti oldal közepére. Ez 3 tükörtengely.'
  },
  {
    id: 'symg3-q13',
    level: 2,
    questionTypeBadge: 'Tengelyek száma',
    figure: (
      <QFig h={120}>
        <circle cx="120" cy="60" r="44" fill="#bbf7d0" stroke="#15803d" strokeWidth="2.4" />
        <circle cx="120" cy="60" r="2.5" fill="#15803d" />
      </QFig>
    ),
    question: 'Hány tükörtengelye van a körnek?',
    options: ['akárhány', '1', '2', '4'],
    correctAnswer: 0,
    explanation: 'Minden vonal, ami átmegy a kör közepén, tükörtengely. Akárhányat rajzolhatsz.'
  },
  {
    id: 'symg3-q14',
    level: 2,
    questionTypeBadge: 'Betűk',
    figure: (
      <QFig h={100}>
        {['E', 'A', 'M', 'V'].map((ch, i) => (
          <Letter key={ch} ch={ch} x={SLOT(i) - 18} y={20} size={52} />
        ))}
      </QFig>
    ),
    question: 'Melyik betűnek van vízszintes tükörtengelye?',
    options: ['E', 'A', 'M', 'V'],
    correctAnswer: 0,
    explanation: 'Az E betű felső és alsó fele egyforma. Az A, az M és a V tükörtengelye függőleges.'
  },
  {
    id: 'symg3-q15',
    level: 2,
    questionTypeBadge: 'Betűk',
    question: 'Melyik betűnek van két tükörtengelye?',
    options: ['H', 'A', 'E', 'N'],
    correctAnswer: 0,
    explanation: 'A H betűt függőlegesen és vízszintesen is félbehajthatod. Az A-nak és az E-nek 1 tengelye van, az N-nek egy sincs.'
  },
  {
    id: 'symg3-q16',
    level: 2,
    questionTypeBadge: 'Tükörtengely',
    figure: (
      <QFig h={150}>
        <path d="M 120 14 L 158 56 L 120 136 L 82 56 Z" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="2.4" strokeLinejoin="round" />
        <NumberedLine x1={120} y1={8} x2={120} y2={142} n={1} lx={140} ly={128} />
        <NumberedLine x1={60} y1={56} x2={180} y2={56} n={2} lx={196} ly={56} />
      </QFig>
    ),
    question: 'Melyik vonal tükörtengelye ennek a sárkány alakú négyszögnek?',
    options: ['csak az 1-es', 'csak a 2-es', 'mindkettő', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'Az 1-es vonal mentén a két fele egyforma. A 2-es vonal fölött kicsi, alatta nagy rész van, ez nem tükörtengely.'
  },
  {
    id: 'symg3-q17',
    level: 2,
    questionTypeBadge: 'Csapda',
    figure: (
      <QFig h={120}>
        <rect x="50" y="22" width="140" height="76" fill="#fde68a" stroke="#a16207" strokeWidth="2.4" />
        <AxisLine x1={42} y1={18} x2={198} y2={102} color="#334155" />
        <text x="120" y="114" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>az átló</text>
      </QFig>
    ),
    question: 'Tükörtengely a téglalap átlója?',
    options: [
      'Nem, mert hajtás után a két fele nem fedi egymást.',
      'Igen, mert két egyforma háromszögre vágja.',
      'Igen, mert minden átló tükörtengely.',
      'Csak akkor, ha a téglalap nagyon hosszú.'
    ],
    correctAnswer: 0,
    explanation: 'Két egyforma rész még nem elég! Hajtsd félbe: a háromszögek csúcsai kilógnak. A téglalap átlója nem tükörtengely.'
  },
  {
    id: 'symg3-q18',
    level: 2,
    questionTypeBadge: 'Tükörkép',
    figure: (
      <QFig h={150}>
        <Tet x={34} y={51} cells={L_SHAPE} s={16} />
        <AxisLine x1={84} y1={14} x2={84} y2={136} />
        <Tet x={106} y={18} cells={L_SHAPE} s={16} />
        <Tet x={172} y={18} cells={mirrorH(L_SHAPE)} s={16} />
        <Tet x={106} y={84} cells={mirrorH(mirrorV(L_SHAPE))} s={16} />
        <Tet x={172} y={84} cells={mirrorV(L_SHAPE)} s={16} />
        <text x="146" y="50" fontSize="14" fontWeight="bold" fill={INK}>A</text>
        <text x="212" y="50" fontSize="14" fontWeight="bold" fill={INK}>B</text>
        <text x="146" y="116" fontSize="14" fontWeight="bold" fill={INK}>C</text>
        <text x="212" y="116" fontSize="14" fontWeight="bold" fill={INK}>D</text>
      </QFig>
    ),
    question: 'Melyik a narancs alakzat tükörképe, ha a piros vonal a tükörtengely?',
    options: ['D', 'A', 'B', 'C'],
    correctAnswer: 0,
    explanation: 'Az alakzat lába jobbra áll. A tükörképben megfordul: a láb balra áll, de lent marad. Ez a D. Az A csak eltolás.'
  },
  {
    id: 'symg3-q19',
    level: 2,
    questionTypeBadge: 'Kiegészítés',
    figure: (
      <CellGridFig
        cols={8}
        rows={5}
        axis={4}
        cells={[
          [0, 3, '#f87171'],
          [1, 2, '#f87171'],
          [1, 3, '#f87171'],
          [2, 1, '#f87171'],
          [2, 2, '#f87171'],
          [2, 3, '#f87171'],
          [3, 1, '#fde68a'],
          [3, 2, '#fde68a'],
          [3, 3, '#fde68a'],
          [4, 1, '#fde68a'],
          [4, 2, '#92400e'],
          [4, 3, '#fde68a']
        ]}
      />
    ),
    question: 'Ez egy házikó bal fele. Kiegészíted a tükörképével. Hány kocka széles lesz az egész házikó?',
    options: ['6', '3', '5', '9'],
    correctAnswer: 0,
    explanation: 'A bal fele 3 kocka széles. A tükörképe is 3 kocka széles. 3 + 3 = 6.'
  },
  {
    id: 'symg3-q20',
    level: 2,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <CellGridFig
        cols={8}
        rows={4}
        axis={4}
        cells={[
          [0, 2, '#3b82f6'],
          [1, 1, '#3b82f6'],
          [1, 2, '#3b82f6'],
          [1, 3, '#3b82f6'],
          [2, 3, '#facc15']
        ]}
      />
    ),
    question: 'Kiszínezed a tükörképet a jobb oldalon. Hány kockát színezel ki?',
    options: ['5', '10', '4', '6'],
    correctAnswer: 0,
    explanation: 'A tükörkép ugyanakkora, mint az eredeti. A bal oldalon 5 kocka színes, a jobb oldalon is 5 lesz.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'symg3-q21',
    level: 3,
    questionTypeBadge: 'Négyzetrács',
    figure: <DotGridFig cols={8} rows={3} axisV={4} dots={[{ gx: 2, gy: 1, color: '#ef4444' }]} />,
    question: 'Milyen messze lesz a piros pont a saját tükörképétől?',
    options: ['4 kockányira', '2 kockányira', '3 kockányira', '6 kockányira'],
    correctAnswer: 0,
    explanation: 'A pont 2 kockányira van a tengelytől, a tükörképe a másik oldalon szintén 2 kockányira. 2 + 2 = 4.'
  },
  {
    id: 'symg3-q22',
    level: 3,
    questionTypeBadge: 'Tengelyek száma',
    figure: (
      <ShapesABCD
        shapes={[
          <rect key="sq" x={8} y={40} width={44} height={44} fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />,
          <path key="hc" d={`M ${SLOT(1) - 26} 84 A 26 26 0 0 1 ${SLOT(1) + 26} 84 Z`} fill="#bbf7d0" stroke="#15803d" strokeWidth="2" />,
          poly(
            [
              [128, 92],
              [178, 84],
              [140, 36]
            ],
            '#fbcfe8',
            '#be185d'
          ),
          poly(
            [
              [200, 48],
              [220, 48],
              [234, 88],
              [186, 88]
            ],
            '#fde68a',
            '#a16207'
          )
        ]}
      />
    ),
    question: 'Melyik síkidomnak nincs tükörtengelye?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4, a félkörnek 1, ennek a négyszögnek 1 tükörtengelye van. A C háromszög oldalai mind különbözők: nincs tükörtengelye.'
  },
  {
    id: 'symg3-q23',
    level: 3,
    questionTypeBadge: 'Tengelyek száma',
    figure: (
      <QFig h={110}>
        <rect x="30" y="25" width="62" height="62" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.4" />
        <text x="120" y="64" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>és</text>
        <rect x="146" y="35" width="72" height="42" fill="#fde68a" stroke="#a16207" strokeWidth="2.4" />
      </QFig>
    ),
    question: 'Hány tükörtengelye van összesen a négyzetnek és a téglalapnak?',
    options: ['6', '4', '8', '2'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4, a téglalapnak 2 tükörtengelye van. 4 + 2 = 6.'
  },
  {
    id: 'symg3-q24',
    level: 3,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <DotGridFig
        cols={8}
        rows={3}
        axisV={4}
        dots={[
          { gx: 1, gy: 1, color: '#ef4444' },
          { gx: 5, gy: 1, color: '#3b82f6' }
        ]}
      />
    ),
    question: 'Hány kockát lépjen jobbra a kék pont, hogy a piros pont tükörképe legyen?',
    options: ['2', '3', '1', '4'],
    correctAnswer: 0,
    explanation: 'A piros pont 3 kockányira van a tengelytől, a kék csak 1-re. 3 − 1 = 2, tehát 2-t kell lépnie jobbra.'
  },
  {
    id: 'symg3-q25',
    level: 3,
    questionTypeBadge: 'Betűk',
    question: 'Melyik szót tükrözheted a közepén álló tengelyre úgy, hogy ugyanaz maradjon?',
    options: ['AHA', 'ANNA', 'MAMA', 'APA'],
    correctAnswer: 0,
    explanation: 'Az A és a H betű is tükrös, és az AHA visszafelé is AHA. Az N és a P nem tükrös, a MAMA visszafelé AMAM.'
  },
  {
    id: 'symg3-q26',
    level: 3,
    questionTypeBadge: 'Tükörkép',
    figure: (
      <DotGridFig
        cols={6}
        rows={7}
        axisH={4}
        water
        dots={[{ gx: 3, gy: 1, color: '#f59e0b' }]}
      />
    ),
    question: 'A madár (narancs pont) 3 kockányira repül a víz fölött. Milyen messze van a madár a tükörképétől?',
    options: ['6 kockányira', '3 kockányira', '9 kockányira', '4 kockányira'],
    correctAnswer: 0,
    explanation: 'A tükörkép 3 kockányira van a víz alatt. 3 + 3 = 6 kockányira van a madártól.'
  },
  {
    id: 'symg3-q27',
    level: 3,
    questionTypeBadge: 'Négyzetrács',
    figure: (
      <CellGridFig
        cols={8}
        rows={4}
        axis={4}
        cells={[
          [0, 1, '#22c55e'],
          [0, 2, '#22c55e'],
          [1, 2, '#22c55e'],
          [1, 3, '#22c55e'],
          [2, 3, '#22c55e'],
          [3, 0, '#22c55e'],
          [3, 3, '#22c55e']
        ]}
      />
    ),
    question: 'Kiszínezed a tükörképét is. Hány zöld kocka lesz összesen?',
    options: ['14', '7', '15', '12'],
    correctAnswer: 0,
    explanation: 'A bal oldalon 7 kocka zöld, a tükörképben is 7 lesz. 7 + 7 = 14.'
  },
  {
    id: 'symg3-q28',
    level: 3,
    questionTypeBadge: 'Síkidomok',
    figure: (
      <QFig h={140}>
        {poly(
          [
            [120, 20],
            [120, 118],
            [56, 118]
          ],
          '#bbf7d0',
          '#15803d'
        )}
        <RightAngle v={[120, 118]} u1={[0, -1]} u2={[-1, 0]} r={14} />
        <AxisLine x1={120} y1={10} x2={120} y2={132} />
        <text x="160" y="90" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    ),
    question: 'A háromszöget tükrözzük a piros vonalra. Milyen síkidom lesz a háromszög és a tükörképe együtt?',
    options: ['egy nagyobb háromszög', 'téglalap', 'négyzet', 'ferde négyszög'],
    correctAnswer: 0,
    explanation: 'A tükörkép a másik oldalra kerül, a derékszögű sarkuk összeér. A két kis háromszög együtt egy nagy háromszög.'
  },
  {
    id: 'symg3-q29',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    figure: (
      <CellGridFig
        cols={8}
        rows={4}
        axis={4}
        cells={[
          [0, 3, '#3b82f6'],
          [1, 2, '#3b82f6'],
          [1, 3, '#3b82f6'],
          [2, 1, '#3b82f6'],
          [3, 3, '#3b82f6'],
          [0, 4, '#3b82f6'],
          [1, 4, '#3b82f6'],
          [1, 5, '#3b82f6'],
          [2, 5, '#3b82f6'],
          [3, 4, '#3b82f6']
        ]}
      />
    ),
    question: 'Valaki kiszínezte a tükörképet a jobb oldalon. Hány kocka van rossz helyen?',
    options: ['1', '0', '2', '5'],
    correctAnswer: 0,
    explanation: 'A 3. sorban a bal oldali kocka 2 kockányira van a tengelytől, a jobb oldali csak 1-re. Ez az 1 kocka rossz helyen van.'
  },
  {
    id: 'symg3-q30',
    level: 3,
    questionTypeBadge: 'Tengelyek száma',
    figure: (
      <QFig h={130}>
        <path d="M 102 14 L 138 14 L 138 47 L 171 47 L 171 83 L 138 83 L 138 116 L 102 116 L 102 83 L 69 83 L 69 47 L 102 47 Z" fill="#fecaca" stroke="#b91c1c" strokeWidth="2.4" strokeLinejoin="round" />
      </QFig>
    ),
    question: 'Ennek a keresztnek mind a négy ága egyforma. Hány tükörtengelye van?',
    options: ['4', '2', '1', '8'],
    correctAnswer: 0,
    explanation: 'Függőlegesen és vízszintesen is félbehajthatod, és a két átlós irányban is. Ez 4 tükörtengely, mint a négyzetnél.'
  }
];

export const SymmetryG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId="g3-geom-tukrozes-quiz"
      subtopicId="tukrozesek-szimmetria"
      title="4. Tükrözések, szimmetria – Kvíz"
      subtitle="30 feladat 3 szinten: szimmetrikus ábrák, tükörtengely, tükörkép négyzetrácson, betűk, tükörtengelyek száma."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • KVÍZ"
      questions={SYMMETRY_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tükörtengely',
          items: ['Félbehajtva a két fele pontosan fedi egymást.', 'Két egyforma rész még nem elég!', 'A téglalap átlója nem tükörtengely.']
        },
        {
          title: 'Négyzetrácson',
          items: ['Számold a kockákat a tengelytől!', 'Túloldalt ugyanannyi kocka, ugyanabban a sorban.', 'A tükörkép ugyanakkora, de megfordul.']
        },
        {
          title: 'Hány tengely?',
          items: ['téglalap 2, négyzet 4', 'egyforma oldalú háromszög 3, sárkány alakú 1', 'kör: akárhány; ferde négyszög: nincs']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SymmetryG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <SymmetryG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default SymmetryG3Quiz;
