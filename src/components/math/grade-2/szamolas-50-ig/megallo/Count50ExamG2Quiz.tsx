import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Count50ExamG2Matcher } from './Count50ExamG2Matcher';
import { Count50ExamG2Sorter } from './Count50ExamG2Sorter';
import {
  ExQFig,
  CardsRowPart,
  PyramidPart,
  NumberTablePart,
  BalancePart,
  MagicSquarePart,
  EX_INK,
  EX_UNK
} from './Count50ExamG2Parts';
import {
  RodsPart,
  RodGroup,
  rodsWidth,
  NumLine50Part,
  JumpArc,
  CoinPart,
  ROD_BLUE
} from '../osszeadas-kivonas-kerek-tizesekkel/RoundTens50G2Parts';
import {
  BarModelPart,
  BarSeg,
  CompareBarsPart,
  CompareRow,
  DotsPart,
  DOT_RED,
  DOT_GREEN,
  DOT_YELLOW
} from '../szoveges-feladatok/WordProblems50G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const RodsFig: React.FC<{ groups: RodGroup[]; ones?: number; crossed?: number; crossedOnes?: number; caption?: string }> = ({
  groups,
  ones = 0,
  crossed = 0,
  crossedOnes = 0,
  caption
}) => {
  const cell = 7;
  const w = rodsWidth(groups, ones, cell, 12);
  return (
    <ExQFig h={caption ? 112 : 96}>
      <RodsPart x={(260 - w) / 2} y={13} cell={cell} groups={groups} ones={ones} crossed={crossed} crossedOnes={crossedOnes} groupGap={12} />
      {caption && (
        <text x="130" y="102" textAnchor="middle" fontSize="14" fontWeight="900" fill={EX_INK}>
          {caption}
        </text>
      )}
    </ExQFig>
  );
};

const LineFig: React.FC<{
  from?: number;
  to?: number;
  labelEvery?: number;
  jumps?: JumpArc[];
  marks?: { v: number; label?: string; color?: string }[];
}> = ({ from = 0, to = 50, labelEvery = 10, jumps = [], marks = [] }) => (
  <ExQFig h={112}>
    <NumLine50Part x0={18} x1={234} y={64} from={from} to={to} labelEvery={labelEvery} jumps={jumps} marks={marks} />
  </ExQFig>
);

const CardsFig: React.FC<{ items: string[] }> = ({ items }) => (
  <ExQFig h={74}>
    <CardsRowPart items={items} y={16} size={items.length > 5 ? 34 : 40} />
  </ExQFig>
);

const DotsFig: React.FC<{ a: number; b?: number; crossed?: number; yellow?: boolean }> = ({ a, b = 0, crossed = 0, yellow }) => {
  const rows = Math.ceil((a + b) / 10);
  const r = 7;
  const step = 2 * r + 4;
  const w = 9 * step + 3 * r;
  const groups = [{ count: a, ...(yellow ? DOT_YELLOW : DOT_RED) }, ...(b > 0 ? [{ count: b, ...DOT_GREEN }] : [])];
  return (
    <ExQFig h={rows * step + 20}>
      <DotsPart x={(260 - w) / 2} y={12} r={r} groups={groups} crossed={crossed} />
    </ExQFig>
  );
};

const BarFig: React.FC<{ parts: BarSeg[]; total: number | string }> = ({ parts, total }) => (
  <ExQFig h={96}>
    <BarModelPart x={22} y={14} w={216} h={30} parts={parts} total={total} fs={16} />
  </ExQFig>
);

const CompareFig: React.FC<{ rows: CompareRow[]; diff?: string }> = ({ rows, diff }) => (
  <ExQFig h={92}>
    <CompareBarsPart x={10} y={14} w={236} labelW={62} rowH={26} gap={16} rows={rows} diff={diff} fs={14} />
  </ExQFig>
);

const PyramidFig: React.FC<{ rows: (string | number)[][] }> = ({ rows }) => (
  <ExQFig h={rows.length * 28 + 22}>
    <PyramidPart rows={rows} y={11} />
  </ExQFig>
);

const TableFig: React.FC<{ hidden?: number; marks?: number[] }> = ({ hidden, marks }) => (
  <ExQFig h={96}>
    <NumberTablePart x={15} y={13} cell={23} hidden={hidden} marks={marks} />
  </ExQFig>
);

const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <ExQFig h={104}>
    <BalancePart left={left} right={right} y={28} />
  </ExQFig>
);

const MagicFig: React.FC<{ grid: number[][]; hide: [number, number] }> = ({ grid, hide }) => (
  <ExQFig h={112}>
    <MagicSquarePart grid={grid} hide={hide} x={85} y={10} cell={30} />
  </ExQFig>
);

const CoinsFig: React.FC<{ coins: (number | '?')[]; price?: string }> = ({ coins, price }) => {
  const step = 46;
  const x0 = (price ? 100 : 130) - ((coins.length - 1) * step) / 2;
  return (
    <ExQFig h={80}>
      {coins.map((c, i) => (
        <CoinPart key={i} cx={x0 + i * step} cy={40} value={c} r={20} />
      ))}
      {price && (
        <g>
          <rect x="176" y="25" width="70" height="30" rx="7" fill="#fff" stroke={EX_INK} strokeWidth="2.5" />
          <text x="211" y="46" textAnchor="middle" fontSize="16" fontWeight="900" fill={EX_INK}>
            {price}
          </text>
        </g>
      )}
    </ExQFig>
  );
};

const MAGIC: number[][] = [
  [16, 2, 12],
  [6, 10, 14],
  [8, 18, 4]
];

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const COUNT50_EXAM_G2_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // 1. SZINT (q1–q30): számok 50-ig, egyszerű műveletek
  // =========================================================================
  {
    id: 'g2c50ex-q1',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    figure: <RodsFig groups={[{ count: 3 }]} ones={4} />,
    question: 'Melyik számot raktuk ki?',
    options: ['34', '43', '7', '30'],
    correctAnswer: 0,
    explanation: '3 tízesrúd = 30, és 4 egyeskocka = 4. Együtt 34.'
  },
  {
    id: 'g2c50ex-q2',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    figure: <RodsFig groups={[{ count: 4 }]} />,
    question: 'Melyik számot raktuk ki?',
    options: ['40', '4', '14', '41'],
    correctAnswer: 0,
    explanation: '4 tízesrúd, egyeskocka nincs: 4 tízes = 40.'
  },
  {
    id: 'g2c50ex-q3',
    level: 1,
    questionTypeBadge: 'Számírás',
    question: 'Melyik számot írtuk le betűvel: negyvenhét?',
    options: ['47', '74', '46', '37'],
    correctAnswer: 0,
    explanation: 'Negyven = 4 tízes, hét = 7 egyes. Ez 47.'
  },
  {
    id: 'g2c50ex-q4',
    level: 1,
    questionTypeBadge: 'Tízes és egyes',
    figure: <CardsFig items={['2 T', '9 E']} />,
    question: '2 tízes és 9 egyes. Melyik szám ez?',
    options: ['29', '92', '11', '28'],
    correctAnswer: 0,
    explanation: 'Előbb a tízesek: 2, aztán az egyesek: 9. Ez 29.'
  },
  {
    id: 'g2c50ex-q5',
    level: 1,
    questionTypeBadge: 'Utána jön',
    figure: <CardsFig items={['38', '39', '?']} />,
    question: 'Melyik szám jön közvetlenül a 39 után?',
    options: ['40', '30', '49', '38'],
    correctAnswer: 0,
    explanation: '39 + 1 = 40. Itt új tízes kezdődik!'
  },
  {
    id: 'g2c50ex-q6',
    level: 1,
    questionTypeBadge: 'Előtte van',
    figure: <CardsFig items={['?', '25', '26']} />,
    question: 'Melyik szám van közvetlenül a 25 előtt?',
    options: ['24', '26', '15', '35'],
    correctAnswer: 0,
    explanation: 'Az előtte lévő szám 1-gyel kisebb: 25 − 1 = 24.'
  },
  {
    id: 'g2c50ex-q7',
    level: 1,
    questionTypeBadge: 'Melyik nagyobb?',
    figure: <CardsFig items={['31', '28']} />,
    question: 'Melyik szám a nagyobb: 31 vagy 28?',
    options: ['31', '28', 'Egyformák', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Előbb a tízeseket nézd: 3 tízes több, mint 2 tízes. A 31 a nagyobb.'
  },
  {
    id: 'g2c50ex-q8',
    level: 1,
    questionTypeBadge: 'Relációs jel',
    figure: <CardsFig items={['42', '○', '24']} />,
    question: 'Melyik jel kerül a körbe? 42 ○ 24',
    options: ['>', '<', '=', '+'],
    correctAnswer: 0,
    explanation: 'A 42 nagyobb, mint a 24: 42 > 24. A jel csőre a kisebb felé mutat.'
  },
  {
    id: 'g2c50ex-q9',
    level: 1,
    questionTypeBadge: 'Páros szám',
    question: 'Melyik szám páros?',
    options: ['36', '25', '41', '47'],
    correctAnswer: 0,
    explanation: 'A páros szám 0, 2, 4, 6 vagy 8-ra végződik. A 36 vége 6, tehát páros.'
  },
  {
    id: 'g2c50ex-q10',
    level: 1,
    questionTypeBadge: 'Páros vagy páratlan?',
    question: 'Páros vagy páratlan a 33?',
    options: ['páratlan', 'páros', 'mindkettő', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'A 33 vége 3. A 3 páratlan, ezért a 33 is páratlan.'
  },
  {
    id: 'g2c50ex-q11',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={20} to={40} labelEvery={10} marks={[{ v: 35, label: '?' }]} />,
    question: 'Melyik számnál van a piros pont?',
    options: ['35', '25', '30', '36'],
    correctAnswer: 0,
    explanation: 'A 30 és a 40 között pont középen van. Ez a 35.'
  },
  {
    id: 'g2c50ex-q12',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <RodsFig groups={[{ count: 2 }]} ones={3} caption="23 + 4 = ?" />,
    question: 'Mennyi 23 + 4?',
    options: ['27', '63', '19', '28'],
    correctAnswer: 0,
    explanation: 'Az egyesekhez adunk: 3 + 4 = 7. A 2 tízes marad: 27.'
  },
  {
    id: 'g2c50ex-q13',
    level: 1,
    questionTypeBadge: 'Tízes + egyes',
    question: 'Mennyi 30 + 6?',
    options: ['36', '9', '33', '26'],
    correctAnswer: 0,
    explanation: '3 tízes és 6 egyes: 36.'
  },
  {
    id: 'g2c50ex-q14',
    level: 1,
    questionTypeBadge: 'Kivonás',
    figure: <RodsFig groups={[{ count: 4 }]} ones={8} crossedOnes={5} caption="48 − 5 = ?" />,
    question: 'Mennyi 48 − 5?',
    options: ['43', '33', '38', '42'],
    correctAnswer: 0,
    explanation: 'Az egyesekből veszünk el: 8 − 5 = 3. A 4 tízes marad: 43.'
  },
  {
    id: 'g2c50ex-q15',
    level: 1,
    questionTypeBadge: 'Kerek tízesig',
    question: 'Mennyi 29 − 9?',
    options: ['20', '38', '11', '19'],
    correctAnswer: 0,
    explanation: 'Mind a 9 egyest elvesszük. A 2 tízes marad: 20.'
  },
  {
    id: 'g2c50ex-q16',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    figure: <RodsFig groups={[{ count: 3 }, { count: 2, ...ROD_BLUE }]} caption="30 + 20 = ?" />,
    question: 'Mennyi 30 + 20?',
    options: ['50', '5', '32', '40'],
    correctAnswer: 0,
    explanation: '3 tízes + 2 tízes = 5 tízes = 50.'
  },
  {
    id: 'g2c50ex-q17',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: 'Mennyi 40 − 30?',
    options: ['10', '1', '30', '20'],
    correctAnswer: 0,
    explanation: '4 tízes − 3 tízes = 1 tízes = 10.'
  },
  {
    id: 'g2c50ex-q18',
    level: 1,
    questionTypeBadge: 'Tízes ugrás',
    figure: (
      <LineFig
        jumps={[
          { from: 45, to: 35, label: '−10' },
          { from: 35, to: 25, label: '−10' }
        ]}
        marks={[
          { v: 45, label: '45', color: '#2563eb' },
          { v: 25, label: '?' }
        ]}
      />
    ),
    question: 'Mennyi 45 − 20?',
    options: ['25', '43', '35', '15'],
    correctAnswer: 0,
    explanation: 'Két tízes ugrás vissza: 45 → 35 → 25.'
  },
  {
    id: 'g2c50ex-q19',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[20, 10, 10]} />,
    question: 'Mennyi pénz van itt összesen?',
    options: ['40 Ft', '3 Ft', '30 Ft', '50 Ft'],
    correctAnswer: 0,
    explanation: '20 + 10 + 10 = 40 Ft.'
  },
  {
    id: 'g2c50ex-q20',
    level: 1,
    questionTypeBadge: 'Szöveges: hozzáadás',
    figure: <DotsFig a={21} b={6} />,
    question: 'A fán 21 veréb ül. Odarepül még 6. Hány veréb van a fán?',
    options: ['27', '15', '26', '28'],
    correctAnswer: 0,
    explanation: 'Odarepül – több lesz: 21 + 6 = 27 veréb.'
  },
  {
    id: 'g2c50ex-q21',
    level: 1,
    questionTypeBadge: 'Szöveges: elvétel',
    figure: <DotsFig a={37} crossed={5} yellow />,
    question: '37 szem szőlőből 5-öt megettél. Hány szem maradt?',
    options: ['32', '42', '33', '22'],
    correctAnswer: 0,
    explanation: 'Megetted – kevesebb marad: 37 − 5 = 32 szem.'
  },
  {
    id: 'g2c50ex-q22',
    level: 1,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig rows={[['?'], [12, 15]]} />,
    question: 'A két alsó tégla összege kerül felülre. Mi lesz ott?',
    options: ['27', '3', '26', '37'],
    correctAnswer: 0,
    explanation: '12 + 15 = 27.'
  },
  {
    id: 'g2c50ex-q23',
    level: 1,
    questionTypeBadge: 'Pótlás',
    figure: (
      <LineFig
        from={20}
        to={30}
        labelEvery={1}
        jumps={[{ from: 26, to: 30, label: '?' }]}
        marks={[{ v: 26, color: '#2563eb' }, { v: 30, color: '#16a34a' }]}
      />
    ),
    question: 'Mennyi kell a 26-hoz, hogy 30 legyen?',
    options: ['4', '14', '6', '3'],
    correctAnswer: 0,
    explanation: '26 → 27, 28, 29, 30: 4 lépés. 26 + 4 = 30.'
  },
  {
    id: 'g2c50ex-q24',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <CardsFig items={['22', '24', '26', '?']} />,
    question: 'Mindig 2-vel nő. Melyik szám jön?',
    options: ['28', '27', '30', '36'],
    correctAnswer: 0,
    explanation: '26 + 2 = 28.'
  },
  {
    id: 'g2c50ex-q25',
    level: 1,
    questionTypeBadge: 'Legkisebb',
    figure: <CardsFig items={['41', '19', '32', '29']} />,
    question: 'Melyik a legkisebb szám?',
    options: ['19', '29', '41', '32'],
    correctAnswer: 0,
    explanation: 'A 19-ben csak 1 tízes van. A többiben 2, 3 vagy 4 tízes van.'
  },
  {
    id: 'g2c50ex-q26',
    level: 1,
    questionTypeBadge: 'Tízes szomszédok',
    figure: <LineFig from={20} to={50} labelEvery={10} marks={[{ v: 37, label: '37' }]} />,
    question: 'Melyik két kerek tízes között van a 37?',
    options: ['30 és 40', '20 és 30', '37 és 38', '40 és 50'],
    correctAnswer: 0,
    explanation: 'A 37-ben 3 tízes van. A 30 után és a 40 előtt van.'
  },
  {
    id: 'g2c50ex-q27',
    level: 1,
    questionTypeBadge: 'Hány tízes?',
    question: 'Hány tízes van a 46-ban?',
    options: ['4', '6', '46', '10'],
    correctAnswer: 0,
    explanation: 'Az első számjegy mutatja a tízeseket: 46 = 4 tízes és 6 egyes.'
  },
  {
    id: 'g2c50ex-q28',
    level: 1,
    questionTypeBadge: 'Tagcsere',
    question: '15 + 24 = 39. Mennyi 24 + 15?',
    options: ['39', '9', '49', '29'],
    correctAnswer: 0,
    explanation: 'A tagok helyet cserélhetnek, az összeg ugyanaz: 39.'
  },
  {
    id: 'g2c50ex-q29',
    level: 1,
    questionTypeBadge: 'Rudak',
    figure: <RodsFig groups={[{ count: 5 }]} />,
    question: 'Hány egyeskockából áll ez az 5 tízesrúd?',
    options: ['50', '5', '15', '10'],
    correctAnswer: 0,
    explanation: 'Minden rúd 10 kocka. 5 rúd = 50 kocka.'
  },
  {
    id: 'g2c50ex-q30',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: '35 − 12 = 23. Melyik összeadással ellenőrzöd?',
    options: ['23 + 12 = 35', '35 + 12 = 47', '23 − 12 = 11', '12 − 3 = 9'],
    correctAnswer: 0,
    explanation: 'A különbséghez add hozzá, amit elvettél: 23 + 12 = 35. Jó volt!'
  },

  // =========================================================================
  // 2. SZINT (q31–q60): tízesátlépés, kétjegyű számok, hiányzó szám
  // =========================================================================
  {
    id: 'g2c50ex-q31',
    level: 2,
    questionTypeBadge: 'Tízesátlépés +',
    figure: (
      <LineFig
        from={30}
        to={50}
        labelEvery={5}
        jumps={[
          { from: 38, to: 40, label: '+2' },
          { from: 40, to: 45, label: '+5' }
        ]}
        marks={[
          { v: 38, label: '38', color: '#2563eb' },
          { v: 45, label: '?' }
        ]}
      />
    ),
    question: 'Mennyi 38 + 7?',
    options: ['45', '35', '44', '31'],
    correctAnswer: 0,
    explanation: '38 + 2 = 40, és 40 + 5 = 45. (A 7 = 2 + 5.)'
  },
  {
    id: 'g2c50ex-q32',
    level: 2,
    questionTypeBadge: 'Tízesátlépés +',
    figure: <RodsFig groups={[{ count: 2 }]} ones={7} caption="27 + 6 = ?" />,
    question: 'Mennyi 27 + 6?',
    options: ['33', '23', '34', '21'],
    correctAnswer: 0,
    explanation: '27 + 3 = 30, és 30 + 3 = 33. Új tízes lett!'
  },
  {
    id: 'g2c50ex-q33',
    level: 2,
    questionTypeBadge: 'Tízesátlépés −',
    figure: (
      <LineFig
        from={30}
        to={50}
        labelEvery={5}
        jumps={[
          { from: 43, to: 40, label: '−3' },
          { from: 40, to: 37, label: '−3' }
        ]}
        marks={[
          { v: 43, label: '43', color: '#2563eb' },
          { v: 37, label: '?' }
        ]}
      />
    ),
    question: 'Mennyi 43 − 6?',
    options: ['37', '43', '36', '49'],
    correctAnswer: 0,
    explanation: '43 − 3 = 40, és 40 − 3 = 37. (A 6 = 3 + 3.)'
  },
  {
    id: 'g2c50ex-q34',
    level: 2,
    questionTypeBadge: 'Tízesátlépés −',
    question: 'Mennyi 31 − 4?',
    options: ['27', '33', '35', '26'],
    correctAnswer: 0,
    explanation: '31 − 1 = 30, és 30 − 3 = 27.'
  },
  {
    id: 'g2c50ex-q35',
    level: 2,
    questionTypeBadge: 'Kétjegyű + kétjegyű',
    figure: <RodsFig groups={[{ count: 2 }, { count: 1, ...ROD_BLUE }]} ones={7} caption="24 + 13 = ?" />,
    question: 'Mennyi 24 + 13?',
    options: ['37', '27', '36', '11'],
    correctAnswer: 0,
    explanation: 'Tízesek: 20 + 10 = 30. Egyesek: 4 + 3 = 7. Együtt 37.'
  },
  {
    id: 'g2c50ex-q36',
    level: 2,
    questionTypeBadge: 'Kétjegyű − kétjegyű',
    question: 'Mennyi 46 − 21?',
    options: ['25', '35', '24', '15'],
    correctAnswer: 0,
    explanation: '46 − 20 = 26, és 26 − 1 = 25.'
  },
  {
    id: 'g2c50ex-q37',
    level: 2,
    questionTypeBadge: 'Részletekben +',
    figure: (
      <LineFig
        from={20}
        to={50}
        labelEvery={10}
        jumps={[
          { from: 28, to: 38, label: '+10' },
          { from: 38, to: 43, label: '+5' }
        ]}
        marks={[
          { v: 28, label: '28', color: '#2563eb' },
          { v: 43, label: '?' }
        ]}
      />
    ),
    question: 'Mennyi 28 + 15?',
    options: ['43', '33', '42', '13'],
    correctAnswer: 0,
    explanation: 'Előbb a tízest: 28 + 10 = 38. Aztán az 5-öt: 38 + 5 = 43.'
  },
  {
    id: 'g2c50ex-q38',
    level: 2,
    questionTypeBadge: 'Részletekben −',
    figure: (
      <LineFig
        from={20}
        to={50}
        labelEvery={10}
        jumps={[
          { from: 42, to: 32, label: '−10' },
          { from: 32, to: 25, label: '−7' }
        ]}
        marks={[
          { v: 42, label: '42', color: '#2563eb' },
          { v: 25, label: '?' }
        ]}
      />
    ),
    question: 'Mennyi 42 − 17?',
    options: ['25', '35', '26', '24'],
    correctAnswer: 0,
    explanation: '42 − 10 = 32. Aztán 32 − 7 = 32 − 2 − 5 = 25.'
  },
  {
    id: 'g2c50ex-q39',
    level: 2,
    questionTypeBadge: 'Hiányzó tag',
    figure: <BarFig parts={[{ v: 26, size: 26 }, { v: '?', size: 7 }]} total={33} />,
    question: 'Melyik szám kerül a □ helyére? 26 + □ = 33',
    options: ['7', '13', '6', '17'],
    correctAnswer: 0,
    explanation: '26 + 4 = 30, 30 + 3 = 33. Összesen 4 + 3 = 7.'
  },
  {
    id: 'g2c50ex-q40',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám kerül a □ helyére? □ − 8 = 34',
    options: ['42', '26', '41', '32'],
    correctAnswer: 0,
    explanation: 'Melyik számból 8-at elvéve marad 34? 34 + 8 = 42.'
  },
  {
    id: 'g2c50ex-q41',
    level: 2,
    questionTypeBadge: 'Mennyit vettünk el?',
    figure: (
      <LineFig
        from={30}
        to={40}
        labelEvery={1}
        jumps={[{ from: 40, to: 32, label: '?' }]}
        marks={[{ v: 40, color: '#2563eb' }, { v: 32, color: '#16a34a' }]}
      />
    ),
    question: 'Melyik szám kerül a □ helyére? 40 − □ = 32',
    options: ['8', '12', '9', '18'],
    correctAnswer: 0,
    explanation: '40-től 32-ig 8 lépés visszafelé. 40 − 8 = 32.'
  },
  {
    id: 'g2c50ex-q42',
    level: 2,
    questionTypeBadge: 'Tízes szomszédok',
    figure: <LineFig from={30} to={50} labelEvery={10} marks={[{ v: 44, label: '44' }]} />,
    question: 'Melyek a 44 tízes szomszédai?',
    options: ['40 és 50', '43 és 45', '30 és 40', '40 és 45'],
    correctAnswer: 0,
    explanation: 'A tízes szomszédok a két legközelebbi kerek tízes: 40 és 50.'
  },
  {
    id: 'g2c50ex-q43',
    level: 2,
    questionTypeBadge: 'Művelet és szám',
    figure: <CardsFig items={['27 + 8', '○', '34']} />,
    question: 'Melyik jel kerül a körbe? 27 + 8 ○ 34',
    options: ['>', '<', '=', '−'],
    correctAnswer: 0,
    explanation: '27 + 8 = 35, és 35 > 34.'
  },
  {
    id: 'g2c50ex-q44',
    level: 2,
    questionTypeBadge: 'Csak páratlan',
    question: 'Melyik sorban van csak páratlan szám?',
    options: ['21, 33, 45', '22, 33, 45', '21, 34, 47', '30, 41, 49'],
    correctAnswer: 0,
    explanation: 'A 21, 33, 45 vége 1, 3, 5 – mind páratlan. A többi sorban van páros is.'
  },
  {
    id: 'g2c50ex-q45',
    level: 2,
    questionTypeBadge: 'Számtábla',
    figure: <TableFig hidden={37} />,
    question: 'Melyik szám van a ? helyén?',
    options: ['37', '27', '47', '36'],
    correctAnswer: 0,
    explanation: 'A sor 31-gyel kezdődik, és a hetedik helyen áll: 37.'
  },
  {
    id: 'g2c50ex-q46',
    level: 2,
    questionTypeBadge: 'Visszajáró',
    figure: <CoinsFig coins={[50]} price="35 Ft" />,
    question: 'Van 50 Ft-od. Egy játék 35 Ft. Mennyi pénzed marad?',
    options: ['15 Ft', '25 Ft', '5 Ft', '16 Ft'],
    correctAnswer: 0,
    explanation: '35-től 50-ig: 35 + 5 = 40, 40 + 10 = 50. Ez 15 Ft.'
  },
  {
    id: 'g2c50ex-q47',
    level: 2,
    questionTypeBadge: 'Mennyivel több?',
    figure: (
      <CompareFig
        rows={[
          { label: '1. csapat', size: 33, text: 33, color: 'blue' },
          { label: '2. csapat', size: 25, text: 25, color: 'amber' }
        ]}
        diff="?"
      />
    ),
    question: 'Az első csapat 33 pontot szerzett, a második 25-öt. Mennyivel többet szerzett az első?',
    options: ['8', '12', '7', '18'],
    correctAnswer: 0,
    explanation: '33 − 25 = 8. Ellenőrzés: 25 + 8 = 33.'
  },
  {
    id: 'g2c50ex-q48',
    level: 2,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig rows={[['?'], ['', ''], [9, 14, 8]]} />,
    question: 'Két szomszéd tégla összege kerül föléjük. Mi lesz a csúcson?',
    options: ['45', '31', '44', '23'],
    correctAnswer: 0,
    explanation: '9 + 14 = 23, 14 + 8 = 22. A csúcs: 23 + 22 = 45.'
  },
  {
    id: 'g2c50ex-q49',
    level: 2,
    questionTypeBadge: 'Három tag',
    figure: <CardsFig items={['16', '+', '4', '+', '13']} />,
    question: 'Mennyi 16 + 4 + 13?',
    options: ['33', '23', '34', '29'],
    correctAnswer: 0,
    explanation: 'Keress kerek tízest: 16 + 4 = 20. Aztán 20 + 13 = 33.'
  },
  {
    id: 'g2c50ex-q50',
    level: 2,
    questionTypeBadge: 'Csökkenő sor',
    figure: <CardsFig items={['46', '41', '36', '?']} />,
    question: 'Mindig 5-tel csökken. Melyik szám jön?',
    options: ['31', '26', '30', '32'],
    correctAnswer: 0,
    explanation: '36 − 5 = 31.'
  },
  {
    id: 'g2c50ex-q51',
    level: 2,
    questionTypeBadge: 'Pótlás 50-re',
    figure: (
      <LineFig
        jumps={[{ from: 17, to: 50, label: '?' }]}
        marks={[
          { v: 17, label: '17', color: '#2563eb' },
          { v: 50, label: '50', color: '#16a34a' }
        ]}
      />
    ),
    question: 'Mennyi kell a 17-hez, hogy 50 legyen?',
    options: ['33', '43', '23', '37'],
    correctAnswer: 0,
    explanation: '17 + 3 = 20, 20 + 30 = 50. Összesen 3 + 30 = 33.'
  },
  {
    id: 'g2c50ex-q52',
    level: 2,
    questionTypeBadge: 'Kerek tízes keresése',
    question: 'Melyik a legnagyobb kerek tízes, ami kisebb, mint 38?',
    options: ['30', '40', '37', '20'],
    correctAnswer: 0,
    explanation: 'A kerek tízesek: 10, 20, 30, 40. A 38 alatt a 30 a legnagyobb.'
  },
  {
    id: 'g2c50ex-q53',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="18 + 7" right="20 + ?" />,
    question: 'A mérleg egyensúlyban van. Melyik szám kerül a □ helyére? 18 + 7 = 20 + □',
    options: ['5', '25', '15', '4'],
    correctAnswer: 0,
    explanation: 'A bal oldal 25. A jobb oldal is 25 legyen: 20 + 5 = 25.'
  },
  {
    id: 'g2c50ex-q54',
    level: 2,
    questionTypeBadge: 'Műveletcsalád',
    question: '29 + 14 = 43. Mennyi 43 − 14?',
    options: ['29', '14', '43', '19'],
    correctAnswer: 0,
    explanation: 'Ha 29 + 14 = 43, akkor 43 − 14 = 29. Ez egy műveletcsalád.'
  },
  {
    id: 'g2c50ex-q55',
    level: 2,
    questionTypeBadge: 'Képhez művelet',
    figure: <DotsFig a={18} b={13} />,
    question: 'Melyik művelet illik a képhez? Hány korong van összesen?',
    options: ['18 + 13', '18 − 13', '13 + 13', '18 + 18'],
    correctAnswer: 0,
    explanation: '18 piros és 13 zöld korong van. Összesen: 18 + 13 = 31.'
  },
  {
    id: 'g2c50ex-q56',
    level: 2,
    questionTypeBadge: 'Számjegyek',
    question: 'Melyik számban több az egyes, mint a tízes?',
    options: ['28', '41', '30', '42'],
    correctAnswer: 0,
    explanation: 'A 28-ban 2 tízes és 8 egyes van. A 8 több, mint a 2.'
  },
  {
    id: 'g2c50ex-q57',
    level: 2,
    questionTypeBadge: 'A többi',
    figure: <BarFig parts={[{ v: '?', size: 25 }, { v: 16, size: 16, color: 'rose' }]} total={41} />,
    question: 'A dobozban 41 ceruza van. 16 piros, a többi kék. Hány kék ceruza van?',
    options: ['25', '35', '24', '15'],
    correctAnswer: 0,
    explanation: '41 − 16 = 25. Ellenőrzés: 25 + 16 = 41.'
  },
  {
    id: 'g2c50ex-q58',
    level: 2,
    questionTypeBadge: 'Kerek tízesből',
    figure: (
      <LineFig
        from={20}
        to={50}
        labelEvery={10}
        jumps={[
          { from: 50, to: 30, label: '−20' },
          { from: 30, to: 24, label: '−6' }
        ]}
        marks={[{ v: 24, label: '?' }]}
      />
    ),
    question: 'Mennyi 50 − 26?',
    options: ['24', '34', '36', '26'],
    correctAnswer: 0,
    explanation: '50 − 20 = 30, és 30 − 6 = 24.'
  },
  {
    id: 'g2c50ex-q59',
    level: 2,
    questionTypeBadge: '50 bontása',
    question: 'Melyik két szám összege pontosan 50?',
    options: ['27 és 23', '25 és 35', '30 és 25', '18 és 22'],
    correctAnswer: 0,
    explanation: '27 + 23 = 50. (25 + 35 = 60, 30 + 25 = 55, 18 + 22 = 40.)'
  },
  {
    id: 'g2c50ex-q60',
    level: 2,
    questionTypeBadge: 'Egyes szomszédok',
    figure: <CardsFig items={['?', '40', '?']} />,
    question: 'Melyek a 40 egyes szomszédai?',
    options: ['39 és 41', '30 és 50', '38 és 42', '40 és 41'],
    correctAnswer: 0,
    explanation: 'Az egyes szomszédok 1-gyel kisebbek és nagyobbak: 39 és 41.'
  },

  // =========================================================================
  // 3. SZINT (q61–q90): két lépés, csavaros szöveg, fejtörők
  // =========================================================================
  {
    id: 'g2c50ex-q61',
    level: 3,
    questionTypeBadge: 'Két elvétel',
    figure: <BarFig parts={[{ v: 18, size: 18 }, { v: 14, size: 14, color: 'violet' }, { v: '?', size: 18 }]} total={50} />,
    question: 'Mennyi 50 − 18 − 14?',
    options: ['18', '32', '36', '22'],
    correctAnswer: 0,
    explanation: '50 − 18 = 32. Aztán 32 − 14 = 18.'
  },
  {
    id: 'g2c50ex-q62',
    level: 3,
    questionTypeBadge: 'Vegyes művelet',
    figure: (
      <LineFig
        jumps={[
          { from: 35, to: 44, label: '+9' },
          { from: 44, to: 24, label: '−20' }
        ]}
        marks={[
          { v: 35, label: '35', color: '#2563eb' },
          { v: 24, label: '?' }
        ]}
      />
    ),
    question: 'Mennyi 35 + 9 − 20?',
    options: ['24', '44', '34', '26'],
    correctAnswer: 0,
    explanation: '35 + 9 = 44. Aztán 44 − 20 = 24.'
  },
  {
    id: 'g2c50ex-q63',
    level: 3,
    questionTypeBadge: 'Csavaros szöveg',
    figure: (
      <CompareFig
        rows={[
          { label: 'egyik', size: 41, text: 41, color: 'blue' },
          { label: 'másik', size: 28, text: '?', color: 'amber' }
        ]}
        diff="13"
      />
    ),
    question: 'Az egyik polcon 41 könyv van. Ez 13-mal több, mint a másik polcon. Hány könyv van a másik polcon?',
    options: ['28', '38', '32', '27'],
    correctAnswer: 0,
    explanation: 'Az egyik polcon van több, a másikon kevesebb. Kivonunk: 41 − 13 = 28.'
  },
  {
    id: 'g2c50ex-q64',
    level: 3,
    questionTypeBadge: 'Fel és le',
    question: 'A buszon 26-an ültek. Felszállt 15, leszállt 8. Hányan ülnek most?',
    options: ['33', '41', '49', '19'],
    correctAnswer: 0,
    explanation: '26 + 15 = 41. Aztán 41 − 8 = 33.'
  },
  {
    id: 'g2c50ex-q65',
    level: 3,
    questionTypeBadge: 'Csavaros: kevesebb',
    figure: (
      <CompareFig
        rows={[
          { label: 'Lili', size: 18, text: 18, color: 'rose' },
          { label: 'Panni', size: 27, text: '?', color: 'green' }
        ]}
        diff="9"
      />
    ),
    question: 'Lili szalagja 18 cm. Ez 9 cm-rel kevesebb, mint Panni szalagja. Milyen hosszú Panni szalagja?',
    options: ['27 cm', '9 cm', '26 cm', '17 cm'],
    correctAnswer: 0,
    explanation: 'Panni szalagja a hosszabb. Összeadunk: 18 + 9 = 27 cm.'
  },
  {
    id: 'g2c50ex-q66',
    level: 3,
    questionTypeBadge: 'Piramis visszafelé',
    figure: <PyramidFig rows={[[45], ['?', 20], [12, '', '']]} />,
    question: 'Két szomszéd tégla összege kerül föléjük. Mi kerül a ? helyére?',
    options: ['25', '33', '13', '24'],
    correctAnswer: 0,
    explanation: 'A ? és a 20 összege 45. 45 − 20 = 25.'
  },
  {
    id: 'g2c50ex-q67',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Mely számok teszik igazzá? 25 + □ < 29',
    options: ['0, 1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3, 4', '4, 5, 6'],
    correctAnswer: 0,
    explanation: '25 + 3 = 28 még kisebb 29-nél, de 25 + 4 = 29 már nem. A 0 is jó: 25 + 0 = 25.'
  },
  {
    id: 'g2c50ex-q68',
    level: 3,
    questionTypeBadge: 'Bűvös négyzet',
    figure: <MagicFig grid={MAGIC} hide={[1, 2]} />,
    question: 'Minden sorban, oszlopban és átlóban ugyanannyi az összeg. Mi kerül a ? helyére?',
    options: ['14', '4', '16', '20'],
    correctAnswer: 0,
    explanation: 'Az első sor: 16 + 2 + 12 = 30. A középső sor: 6 + 10 + ? = 30, tehát ? = 14.'
  },
  {
    id: 'g2c50ex-q69',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Gondoltam egy számot. Hozzáadtam 15-öt, és 42 lett. Melyik számra gondoltam?',
    options: ['27', '37', '26', '17'],
    correctAnswer: 0,
    explanation: 'Visszafelé: 42 − 15 = 27. Ellenőrzés: 27 + 15 = 42.'
  },
  {
    id: 'g2c50ex-q70',
    level: 3,
    questionTypeBadge: 'Számrejtvény',
    question: 'Egy szám tízesei: 4. Az egyesei 3-mal kevesebbek. Melyik ez a szám?',
    options: ['41', '47', '14', '43'],
    correctAnswer: 0,
    explanation: 'A tízes 4, az egyes 4 − 3 = 1. A szám: 41.'
  },
  {
    id: 'g2c50ex-q71',
    level: 3,
    questionTypeBadge: 'Kevesebb és együtt',
    figure: (
      <CompareFig
        rows={[
          { label: 'Zsófi', size: 24, text: 24, color: 'violet' },
          { label: 'Dani', size: 16, text: '?', color: 'amber' }
        ]}
        diff="8"
      />
    ),
    question: 'Zsófi 24 gesztenyét szedett. Dani 8-cal kevesebbet. Hányat szedtek együtt?',
    options: ['40', '16', '32', '48'],
    correctAnswer: 0,
    explanation: 'Dani: 24 − 8 = 16. Együtt: 24 + 16 = 40.'
  },
  {
    id: 'g2c50ex-q72',
    level: 3,
    questionTypeBadge: 'Két vásárlás',
    figure: <CoinsFig coins={[50]} price="18 + 12" />,
    question: 'Van 50 Ft-od. Veszel egy 18 Ft-os ceruzát és egy 12 Ft-os radírt. Mennyi pénzed marad?',
    options: ['20 Ft', '30 Ft', '32 Ft', '38 Ft'],
    correctAnswer: 0,
    explanation: '18 + 12 = 30 Ft-ot költesz. 50 − 30 = 20 Ft marad.'
  },
  {
    id: 'g2c50ex-q73',
    level: 3,
    questionTypeBadge: 'Szabály keresése',
    figure: <CardsFig items={['13', '17', '21', '25', '?']} />,
    question: 'Mi a szabály? Melyik szám jön?',
    options: ['29', '30', '27', '33'],
    correctAnswer: 0,
    explanation: 'Mindig 4-gyel nő: 25 + 4 = 29.'
  },
  {
    id: 'g2c50ex-q74',
    level: 3,
    questionTypeBadge: 'Szabály keresése',
    figure: <CardsFig items={['50', '44', '38', '32', '?']} />,
    question: 'Mi a szabály? Melyik szám jön?',
    options: ['26', '28', '24', '20'],
    correctAnswer: 0,
    explanation: 'Mindig 6-tal csökken: 32 − 6 = 26.'
  },
  {
    id: 'g2c50ex-q75',
    level: 3,
    questionTypeBadge: 'Páros számok között',
    question: 'Melyik páros számok vannak a 37 és a 41 között?',
    options: ['38 és 40', '37 és 39', '39 és 41', '38, 39 és 40'],
    correctAnswer: 0,
    explanation: 'A 37 és 41 között: 38, 39, 40. Ebből páros a 38 és a 40.'
  },
  {
    id: 'g2c50ex-q76',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="24 + 9" right="? + 13" />,
    question: 'A mérleg egyensúlyban van. Melyik szám kerül a □ helyére? 24 + 9 = □ + 13',
    options: ['20', '33', '19', '22'],
    correctAnswer: 0,
    explanation: 'A bal oldal: 24 + 9 = 33. A jobb oldal: □ + 13 = 33, tehát □ = 20.'
  },
  {
    id: 'g2c50ex-q77',
    level: 3,
    questionTypeBadge: 'Hiányzó tag',
    question: 'Melyik szám kerül a □ helyére? □ + 12 + 8 = 45',
    options: ['25', '33', '37', '20'],
    correctAnswer: 0,
    explanation: '12 + 8 = 20. Aztán □ + 20 = 45, tehát □ = 25.'
  },
  {
    id: 'g2c50ex-q78',
    level: 3,
    questionTypeBadge: 'Három állatfaj',
    figure: <CardsFig items={['12', '+', '9', '+', '15']} />,
    question: 'Egy kifutóban 12 zebra, 9 zsiráf és 15 antilop él. Hány állat él ott?',
    options: ['36', '26', '35', '21'],
    correctAnswer: 0,
    explanation: '12 + 9 = 21, és 21 + 15 = 36 állat.'
  },
  {
    id: 'g2c50ex-q79',
    level: 3,
    questionTypeBadge: 'Csavaros szöveg',
    question: 'A piros toronyban 36 kocka van. Ez 7-tel kevesebb, mint a kék toronyban. Hány kocka van a kékben?',
    options: ['43', '29', '42', '33'],
    correctAnswer: 0,
    explanation: 'A kék torony a magasabb! Összeadunk: 36 + 7 = 43.'
  },
  {
    id: 'g2c50ex-q80',
    level: 3,
    questionTypeBadge: 'Számtábla-séta',
    figure: <TableFig marks={[34]} />,
    question: 'A 34-ről lépj egyet lefelé, aztán egyet jobbra. Melyik számra érsz?',
    options: ['45', '35', '43', '25'],
    correctAnswer: 0,
    explanation: 'Lefelé 10-zel nő: 34 → 44. Jobbra 1-gyel nő: 44 → 45.'
  },
  {
    id: 'g2c50ex-q81',
    level: 3,
    questionTypeBadge: 'Legnagyobb eredmény',
    question: 'Melyik művelet eredménye a legnagyobb?',
    options: ['29 + 18', '50 − 6', '36 + 7', '48 − 9'],
    correctAnswer: 0,
    explanation: '29 + 18 = 47, 50 − 6 = 44, 36 + 7 = 43, 48 − 9 = 39. A 47 a legnagyobb.'
  },
  {
    id: 'g2c50ex-q82',
    level: 3,
    questionTypeBadge: 'Melyik igaz?',
    question: 'Melyik egyenlőség igaz?',
    options: ['46 − 19 = 27', '33 + 18 = 41', '50 − 25 = 35', '17 + 17 = 24'],
    correctAnswer: 0,
    explanation: '46 − 19 = 27 igaz. A többi hamis: 33 + 18 = 51, 50 − 25 = 25, 17 + 17 = 34.'
  },
  {
    id: 'g2c50ex-q83',
    level: 3,
    questionTypeBadge: 'Összesen, aztán elvétel',
    figure: <DotsFig a={22} b={15} crossed={10} />,
    question: 'A dobozban 22 piros és 15 zöld golyó van. Kiveszünk 10-et. Hány golyó marad?',
    options: ['27', '37', '17', '12'],
    correctAnswer: 0,
    explanation: '22 + 15 = 37 golyó. Aztán 37 − 10 = 27 marad.'
  },
  {
    id: 'g2c50ex-q84',
    level: 3,
    questionTypeBadge: 'Zsebpénz',
    figure: (
      <CompareFig
        rows={[
          { label: 'Máté', size: 30, text: '30 Ft', color: 'blue' },
          { label: 'Réka', size: 20, text: '?', color: 'rose' }
        ]}
        diff="10"
      />
    ),
    question: 'Máté 30 Ft-ot kapott, Réka 10 Ft-tal kevesebbet. Mennyit kaptak együtt?',
    options: ['50 Ft', '20 Ft', '40 Ft', '30 Ft'],
    correctAnswer: 0,
    explanation: 'Réka: 30 − 10 = 20 Ft. Együtt: 30 + 20 = 50 Ft.'
  },
  {
    id: 'g2c50ex-q85',
    level: 3,
    questionTypeBadge: 'Hiányzó számjegy',
    question: 'Melyik számjegy hiányzik? 4□ − 20 = 26',
    options: ['6', '4', '2', '8'],
    correctAnswer: 0,
    explanation: '26 + 20 = 46. Tehát a szám 46, a hiányzó számjegy 6.'
  },
  {
    id: 'g2c50ex-q86',
    level: 3,
    questionTypeBadge: 'Hány szám?',
    question: 'Hány szám van a 30 és a 40 között? (A 30 és a 40 nem számít.)',
    options: ['9', '10', '11', '8'],
    correctAnswer: 0,
    explanation: '31, 32, 33, 34, 35, 36, 37, 38, 39 – ez 9 szám.'
  },
  {
    id: 'g2c50ex-q87',
    level: 3,
    questionTypeBadge: 'Visszafelé gondolkodás',
    question: 'Bence elajándékozott 14 matricát. Utána kapott 6-ot. Most 30 matricája van. Hány matricája volt az elején?',
    options: ['38', '22', '50', '26'],
    correctAnswer: 0,
    explanation: 'Visszafelé: 30 − 6 = 24 (mielőtt kapott). 24 + 14 = 38 (mielőtt ajándékozott).'
  },
  {
    id: 'g2c50ex-q88',
    level: 3,
    questionTypeBadge: 'Képről: melyik igaz?',
    figure: <DotsFig a={8} b={27} />,
    question: '8 piros és 27 zöld korong van. Melyik igaz?',
    options: ['A zöldből 19-cel több van.', 'Összesen 34 korong van.', 'A zöldből 21-gyel több van.', 'A pirosból van több.'],
    correctAnswer: 0,
    explanation: '27 − 8 = 19, tehát a zöldből 19-cel több van. Összesen 8 + 27 = 35 korong.'
  },
  {
    id: 'g2c50ex-q89',
    level: 3,
    questionTypeBadge: 'Piramis rejtvény',
    figure: <PyramidFig rows={[['?'], ['', 20], [7, '', 9]]} />,
    question: 'Két szomszéd tégla összege kerül föléjük. Mi kerül a csúcsra?',
    options: ['38', '27', '36', '29'],
    correctAnswer: 0,
    explanation: 'Az alsó középső: 20 − 9 = 11. A bal középső: 7 + 11 = 18. A csúcs: 18 + 20 = 38.'
  },
  {
    id: 'g2c50ex-q90',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Mely számokat írhatod a □ helyére? 48 − □ > 44',
    options: ['0, 1, 2, 3', '1, 2, 3', '4, 5, 6', '0, 1, 2, 3, 4'],
    correctAnswer: 0,
    explanation: '48 − 3 = 45 még nagyobb 44-nél, de 48 − 4 = 44 már nem. A 0 is jó: 48 − 0 = 48.'
  }
];

export const Count50ExamG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId="g2-c50-tudasproba-quiz"
      subtopicId="megallo"
      title="6. Megálló – tudáspróba"
      subtitle="90 feladat 3 szinten: számok 50-ig, számszomszédok, páros és páratlan, összeadás és kivonás tízesátlépéssel, kerek tízesek és szöveges feladatok."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TUDÁSPRÓBA"
      questions={COUNT50_EXAM_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számok 50-ig',
          items: ['37 = 3 tízes + 7 egyes', 'Egyes szomszédok: 36 és 38', 'Tízes szomszédok: 30 és 40', 'Páros: 0, 2, 4, 6, 8 a vége']
        },
        {
          title: 'Tízesátlépés',
          items: ['38 + 7 = 38 + 2 + 5 = 45', '43 − 6 = 43 − 3 − 3 = 37', '28 + 15 = 28 + 10 + 5 = 43', 'Kerek tízes: 24 + 20 = 44']
        },
        {
          title: 'Szöveges feladat',
          items: ['Mit tudunk? Mit kérdez?', 'Kap még → +, marad → −', '„Ez 9-cel több, mint…” → figyelj!', 'Ellenőrizd, és válaszolj mondatban!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Count50ExamG2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Count50ExamG2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Count50ExamG2Quiz;
