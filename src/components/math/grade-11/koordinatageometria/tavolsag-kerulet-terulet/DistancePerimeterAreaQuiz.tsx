import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { DistancePerimeterAreaMatcher } from './DistancePerimeterAreaMatcher';
import { DistancePerimeterAreaSorter } from './DistancePerimeterAreaSorter';
import { DPAGrid, DPAPoint } from './DistancePerimeterAreaFigures';

// ---- Kvízábrák (csak ebben a fájlban) ----
const Q_CLASS = 'w-full max-w-[280px] h-auto mx-auto';

/** Sokszög kis koordináta-rendszerben, csúcsnevekkel; opcionálisan befoglaló téglalappal. */
const PolyFig: React.FC<{
  pts: DPAPoint[];
  names: string[];
  range: [number, number, number, number];
  box?: boolean;
  cell?: number;
  ticks?: boolean;
}> = ({ pts, names, range, box = false, cell = 20, ticks = true }) => {
  const [x0, x1, y0, y1] = range;
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const bx0 = Math.min(...xs);
  const bx1 = Math.max(...xs);
  const by0 = Math.min(...ys);
  const by1 = Math.max(...ys);
  const cx = xs.reduce((s, x) => s + x, 0) / pts.length;
  const cy = ys.reduce((s, y) => s + y, 0) / pts.length;
  return (
    <DPAGrid
      x0={x0}
      x1={x1}
      y0={y0}
      y1={y1}
      cell={cell}
      axes
      ticks={ticks}
      className={Q_CLASS}
      polygons={[
        ...(box
          ? [{ pts: [[bx0, by0], [bx1, by0], [bx1, by1], [bx0, by1]] as DPAPoint[], fill: 'rgba(250,204,21,0.12)', stroke: '#94a3b8', dashed: true }]
          : []),
        { pts, fill: 'rgba(59,130,246,0.15)', stroke: '#2563eb' }
      ]}
      points={pts.map((p, i) => {
        const dx = p[0] - cx;
        const dy = p[1] - cy;
        const l = Math.hypot(dx, dy) || 1;
        return { at: p, label: names[i], dx: (dx / l) * 10 - 4, dy: -(dy / l) * 10 + 4 };
      })}
    />
  );
};

/** Két pont és a köztük lévő szakasz. */
const SegFig: React.FC<{ A: DPAPoint; B: DPAPoint; la: string; lb: string; range: [number, number, number, number]; cell?: number }> = ({
  A,
  B,
  la,
  lb,
  range,
  cell = 22
}) => (
  <DPAGrid
    x0={range[0]}
    x1={range[1]}
    y0={range[2]}
    y1={range[3]}
    cell={cell}
    axes
    ticks
    className={Q_CLASS}
    polygons={[{ pts: [A, B], fill: 'none', stroke: '#2563eb' }]}
    points={[
      { at: A, label: la, dx: -14, dy: 14 },
      { at: B, label: lb, dx: 6, dy: -6 }
    ]}
    texts={[{ at: [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], text: '?', color: '#dc2626', dx: -8, dy: -6, size: 13 }]}
  />
);

export const DISTANCE_PERIMETER_AREA_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'dpa-q1',
    level: 1,
    questionTypeBadge: 'Két pont távolsága',
    figure: <SegFig A={[1, 2]} B={[4, 6]} la="A" lb="B" range={[-1, 5, -1, 7]} />,
    question: 'Mekkora az A(1; 2) és a B(4; 6) pontok távolsága?',
    options: ['5', '7', '√7', '25'],
    correctAnswer: 0,
    explanation: 'AB = √((4 − 1)² + (6 − 2)²) = √(9 + 16) = √25 = 5.'
  },
  {
    id: 'dpa-q2',
    level: 1,
    questionTypeBadge: 'Távolságképlet',
    question: 'Melyik képlet adja meg az A(a₁; a₂) és B(b₁; b₂) pontok távolságát?',
    options: ['√((b₁ − a₁)² + (b₂ − a₂)²)', '(b₁ − a₁) + (b₂ − a₂)', '√((b₁ + a₁)² + (b₂ + a₂)²)', '(b₁ − a₁)² + (b₂ − a₂)²'],
    correctAnswer: 0,
    explanation: 'A távolság az →AB(b₁ − a₁; b₂ − a₂) vektor hossza: a koordináták különbségeinek négyzetösszegéből vonunk gyököt.'
  },
  {
    id: 'dpa-q3',
    level: 1,
    questionTypeBadge: 'Távolság az origótól',
    figure: <SegFig A={[0, 0]} B={[-6, 8]} la="" lb="P(−6; 8)" range={[-7, 2, -1, 9]} cell={18} />,
    question: 'Milyen messze van a P(−6; 8) pont az origótól?',
    options: ['10', '14', '2', '100'],
    correctAnswer: 0,
    explanation: 'OP = √((−6)² + 8²) = √(36 + 64) = √100 = 10.'
  },
  {
    id: 'dpa-q4',
    level: 1,
    questionTypeBadge: 'Tengellyel párhuzamos',
    figure: <SegFig A={[-3, 1]} B={[6, 1]} la="A" lb="B" range={[-4, 7, -1, 3]} />,
    question: 'Milyen hosszú az A(−3; 1) és B(6; 1) végpontú szakasz?',
    options: ['9', '3', '6', '10'],
    correctAnswer: 0,
    explanation: 'A két pont második koordinátája egyenlő, a szakasz vízszintes: hossza |6 − (−3)| = 9.'
  },
  {
    id: 'dpa-q5',
    level: 1,
    questionTypeBadge: 'Befoglaló téglalap',
    figure: <PolyFig pts={[[-4, -4], [6, -4], [6, 5], [-4, 5]]} names={['', '', '', '']} range={[-5, 7, -5, 6]} cell={18} />,
    question: 'Mekkora a (−4; −4), (6; −4), (6; 5), (−4; 5) csúcsú téglalap területe?',
    options: ['90', '38', '19', '45'],
    correctAnswer: 0,
    explanation: 'Az oldalak 6 − (−4) = 10 és 5 − (−4) = 9, a terület 10 · 9 = 90. (38 a kerület.)'
  },
  {
    id: 'dpa-q6',
    level: 1,
    questionTypeBadge: 'Derékszögű háromszög',
    figure: <PolyFig pts={[[-4, -4], [4, -4], [-4, 1]]} names={['', 'S', 'M']} range={[-5, 5, -5, 2]} cell={20} />,
    question: 'Mekkora a (−4; −4), S(4; −4), M(−4; 1) csúcsú derékszögű háromszög területe?',
    options: ['20', '40', '13', '26'],
    correctAnswer: 0,
    explanation: 'A befogók 4 − (−4) = 8 és 1 − (−4) = 5, a terület (8 · 5) / 2 = 20. (40 a felezés nélküli hibás érték.)'
  },
  {
    id: 'dpa-q7',
    level: 1,
    questionTypeBadge: 'Két pont távolsága',
    figure: <SegFig A={[-4, 1]} B={[4, -4]} la="M" lb="S" range={[-5, 5, -5, 2]} cell={20} />,
    question: 'Mekkora a Bermuda-háromszög M(−4; 1) és S(4; −4) csúcsának távolsága?',
    options: ['√89 ≈ 9,43', '5', '13', '√39 ≈ 6,24'],
    correctAnswer: 0,
    explanation: 'MS = √((4 − (−4))² + (−4 − 1)²) = √(64 + 25) = √89 ≈ 9,43. (13 = 8 + 5 a befogók összege – hibás.)'
  },
  {
    id: 'dpa-q8',
    level: 1,
    questionTypeBadge: 'Lépték',
    question: 'A Bermuda-háromszög területe a térképen 41 területegység, és 1 egység 160 km-nek felel meg. Mekkora a valós terület?',
    options: ['1 049 600 km²', '6560 km²', '25 600 km²', '104 960 km²'],
    correctAnswer: 0,
    explanation: 'Egy területegység 160 km · 160 km = 25 600 km², így 41 · 25 600 = 1 049 600 km². (41 · 160 = 6560 hibás: a területnél a lépték négyzetével szorzunk.)'
  },
  {
    id: 'dpa-q9',
    level: 1,
    questionTypeBadge: 'Lépték',
    question: 'A Bermuda-háromszög kerülete a térképen ≈ 29,4 egység (1 egység = 160 km). Mekkora a valós kerülete?',
    options: ['≈ 4700 km', '≈ 1 049 600 km', '≈ 189 km', '≈ 29,4 km'],
    correctAnswer: 0,
    explanation: 'Hosszúságnál egyszer szorzunk a léptékkel: 29,4 · 160 ≈ 4700 km.'
  },
  {
    id: 'dpa-q10',
    level: 1,
    questionTypeBadge: 'Négyzet oldala',
    question: 'Egy négyzet két szomszédos csúcsa A(1; 2) és B(6; −10). Milyen hosszú a négyzet oldala?',
    options: ['13', '17', '7', '169'],
    correctAnswer: 0,
    explanation: 'AB = √(5² + (−12)²) = √(25 + 144) = √169 = 13. (17 = 5 + 12 hibás; 169 az oldal négyzete.)'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'dpa-q11',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <PolyFig pts={[[-4, -7], [8, -3], [0, 3]]} names={['A', 'B', 'D']} range={[-5, 9, -8, 4]} cell={17} />,
    question: 'Mekkora az A(−4; −7), B(8; −3), D(0; 3) háromszög kerülete?',
    options: ['≈ 33,42', '≈ 35,39', '52', '44'],
    correctAnswer: 0,
    explanation: 'AB = √160 ≈ 12,65; BD = √100 = 10; DA = √116 ≈ 10,77; K ≈ 33,42. (44 a koordinátakülönbségek abszolút értékeinek összege – hibás.)'
  },
  {
    id: 'dpa-q12',
    level: 2,
    questionTypeBadge: 'Terület téglalappal',
    figure: <PolyFig pts={[[-4, -7], [8, -3], [0, 3]]} names={['A', 'B', 'D']} range={[-5, 9, -8, 4]} cell={17} box />,
    question: 'Mekkora az A(−4; −7), B(8; −3), D(0; 3) háromszög területe?',
    options: ['52', '68', '120', '26'],
    correctAnswer: 0,
    explanation: 'A befoglaló téglalap 12 · 10 = 120; a levágott háromszögek (12 · 4) / 2 + (8 · 6) / 2 + (4 · 10) / 2 = 24 + 24 + 20 = 68; T = 120 − 68 = 52.'
  },
  {
    id: 'dpa-q13',
    level: 2,
    questionTypeBadge: 'Terület',
    figure: <PolyFig pts={[[3, -7], [8, 3], [-4, 3]]} names={['E', 'F', 'C']} range={[-5, 9, -8, 4]} cell={17} />,
    question: 'Mekkora az E(3; −7), F(8; 3), C(−4; 3) háromszög területe?',
    options: ['60', '120', '30', '52'],
    correctAnswer: 0,
    explanation: 'Az FC oldal vízszintes (y = 3), hossza 12; a hozzá tartozó magasság 3 − (−7) = 10. T = (12 · 10) / 2 = 60.'
  },
  {
    id: 'dpa-q14',
    level: 2,
    questionTypeBadge: 'Négyszög területe',
    figure: <PolyFig pts={[[-3, 1], [6, 1], [3, 5], [-1, 4]]} names={['A', 'B', 'C', 'D']} range={[-4, 7, -1, 6]} cell={20} box />,
    question: 'Mekkora az A(−3; 1), B(6; 1), C(3; 5), D(−1; 4) négyszög területe?',
    options: ['23', '36', '13', '26'],
    correctAnswer: 0,
    explanation: 'Befoglaló téglalap: 9 · 4 = 36. A toldott részek: 6 + 2 + 2 + 3 = 13. T = 36 − 13 = 23.'
  },
  {
    id: 'dpa-q15',
    level: 2,
    questionTypeBadge: 'Négyzet területe',
    question: 'Egy négyzet két szomszédos csúcsa A(1; 2) és B(6; −10). Mekkora a területe?',
    options: ['169', '52', '84,5', '338'],
    correctAnswer: 0,
    explanation: 'Az oldal AB = 13, a terület 13² = 169. (52 a kerület.)'
  },
  {
    id: 'dpa-q16',
    level: 2,
    questionTypeBadge: 'Négyzet átlóból',
    question: 'Egy négyzet két szemközti csúcsa A(7; −3) és C(1; 5). Mekkora a területe?',
    options: ['50', '100', '25', '≈ 28,28'],
    correctAnswer: 0,
    explanation: 'Az átló AC = √(36 + 64) = 10. Az e átlójú négyzet területe e² / 2 = 100 / 2 = 50 (oldala 5√2). A 100 hibás: az átló négyzete nem a terület.'
  },
  {
    id: 'dpa-q17',
    level: 2,
    questionTypeBadge: 'Távolság az origótól',
    question: 'Melyik pont van pontosan 5 egységre az origótól?',
    options: ['(−3; 4)', '(2; 3)', '(5; 5)', '(1; 4)'],
    correctAnswer: 0,
    explanation: '√((−3)² + 4²) = √25 = 5. A többi: √13, √50 ≈ 7,07, √17.'
  },
  {
    id: 'dpa-q18',
    level: 2,
    questionTypeBadge: 'Háromszög fajtája',
    figure: <PolyFig pts={[[1, -4], [7, 2], [-5, -2]]} names={['P', 'Q', 'R']} range={[-6, 8, -5, 3]} cell={17} />,
    question: 'Milyen a P(1; −4), Q(7; 2), R(−5; −2) háromszög a szögei szerint?',
    options: ['Tompaszögű', 'Derékszögű', 'Hegyesszögű', 'Nincs ilyen háromszög'],
    correctAnswer: 0,
    explanation: 'PQ² = 72, QR² = 160, RP² = 40. A két rövidebb oldal négyzetösszege 72 + 40 = 112 < 160, így a QR-rel szemközti szög tompaszög.'
  },
  {
    id: 'dpa-q19',
    level: 2,
    questionTypeBadge: 'Terület téglalappal',
    figure: <PolyFig pts={[[1, -4], [7, 2], [-5, -2]]} names={['P', 'Q', 'R']} range={[-6, 8, -5, 3]} cell={17} box />,
    question: 'Mekkora a P(1; −4), Q(7; 2), R(−5; −2) háromszög területe?',
    options: ['24', '48', '12', '36'],
    correctAnswer: 0,
    explanation: 'Befoglaló téglalap: 12 · 6 = 72. Levágott háromszögek: (6 · 6) / 2 + (12 · 4) / 2 + (6 · 2) / 2 = 18 + 24 + 6 = 48. T = 72 − 48 = 24.'
  },
  {
    id: 'dpa-q20',
    level: 2,
    questionTypeBadge: 'Kerület',
    figure: <PolyFig pts={[[0, 0], [4, 0], [2, 5]]} names={['A', 'B', 'C']} range={[-1, 5, -1, 6]} cell={22} ticks />,
    question: 'Mekkora az A(0; 0), B(4; 0), C(2; 5) háromszög kerülete?',
    options: ['4 + 2√29 ≈ 14,77', '2√29 ≈ 10,77', '4 + √29 ≈ 9,39', '14'],
    correctAnswer: 0,
    explanation: 'AB = 4, AC = BC = √(2² + 5²) = √29 ≈ 5,39 (egyenlő szárú). K = 4 + 2√29 ≈ 14,77.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'dpa-q21',
    level: 3,
    questionTypeBadge: 'Szabályos háromszög',
    question: 'Egy szabályos háromszög két csúcsa A(−12; 20) és B(15; −16). Mekkora a területe?',
    options: ['≈ 876,85', '1012,5', '≈ 1753,7', '135'],
    correctAnswer: 0,
    explanation: 'AB = √(27² + 36²) = √2025 = 45. T = a² · √3 / 4 = 2025 · √3 / 4 ≈ 876,85. (135 a kerület.)'
  },
  {
    id: 'dpa-q22',
    level: 3,
    questionTypeBadge: 'Négyzet átlóból',
    question: 'Egy négyzet két szemközti csúcsa A(7; −3) és C(1; 5). Mekkora a kerülete?',
    options: ['20√2 ≈ 28,28', '40', '10√2 ≈ 14,14', '20'],
    correctAnswer: 0,
    explanation: 'Az átló 10, az oldal 10 / √2 = 5√2, a kerület 4 · 5√2 = 20√2 ≈ 28,28. (40 akkor jönne ki, ha az átlót oldalnak vennénk.)'
  },
  {
    id: 'dpa-q23',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    question: 'a: négyzet átlója, ha két szomszédos csúcs A(1; 7), B(−2; 3); b: szabályos háromszög magassága, ha két csúcs C(5; −6), D(0,2; 0,4); c: szabályos hatszög leghosszabb átlója, ha két szomszédos csúcs E(8; 7), F(5; 9). Melyik a helyes sorrend?',
    options: ['b < a < c', 'a < b < c', 'c < a < b', 'a < c < b'],
    correctAnswer: 0,
    explanation: 'AB = 5 ⇒ a = 5√2 ≈ 7,07; CD = 8 ⇒ b = 8 · √3 / 2 = 4√3 ≈ 6,93; EF = √13 ⇒ c = 2√13 ≈ 7,21. Tehát b < a < c.'
  },
  {
    id: 'dpa-q24',
    level: 3,
    questionTypeBadge: 'Súlyvonal',
    question: 'Az ABC háromszög csúcsai A(1; −4), B(7; 2), C(−5; −2). Milyen hosszú az A-ból induló súlyvonal? (A BC oldal felezőpontja: a koordináták átlaga.)',
    options: ['4', '√106 ≈ 10,30', '√82 ≈ 9,06', '6'],
    correctAnswer: 0,
    explanation: 'BC felezőpontja F((7 + (−5)) / 2; (2 + (−2)) / 2) = (1; 0). AF = √((1 − 1)² + (0 − (−4))²) = 4. (√106 és √82 a másik két súlyvonal.)'
  },
  {
    id: 'dpa-q25',
    level: 3,
    questionTypeBadge: 'Ismeretlen koordináta',
    question: 'Az A(1; 2) és a B(4; y) pontok távolsága 5, és y > 2. Mennyi y?',
    options: ['6', '7', '−2', '5'],
    correctAnswer: 0,
    explanation: '(4 − 1)² + (y − 2)² = 25 ⇒ (y − 2)² = 16 ⇒ y − 2 = ±4. Mivel y > 2: y = 6. (A −2 a másik megoldás, de az nem nagyobb 2-nél.)'
  },
  {
    id: 'dpa-q26',
    level: 3,
    questionTypeBadge: 'Egyenlő távolság',
    figure: (
      <DPAGrid
        x0={-1}
        x1={6}
        y0={-1}
        y1={4}
        cell={24}
        axes
        ticks
        className={Q_CLASS}
        points={[
          { at: [1, 3], label: 'A(1; 3)', dx: -10, dy: -8 },
          { at: [5, 1], label: 'B(5; 1)', dx: -8, dy: -8 }
        ]}
        texts={[{ at: [3, 0], text: 'P = ?', color: '#dc2626', dy: -6 }]}
      />
    ),
    question: 'Melyik az az x tengelyen lévő P pont, amely egyenlő távolságra van az A(1; 3) és B(5; 1) pontoktól?',
    options: ['P(2; 0)', 'P(3; 0)', 'P(0; 2)', 'P(−2; 0)'],
    correctAnswer: 0,
    explanation: 'P(x; 0): (x − 1)² + 9 = (x − 5)² + 1 ⇒ x² − 2x + 10 = x² − 10x + 26 ⇒ 8x = 16 ⇒ x = 2. Ellenőrzés: PA² = 1 + 9 = 10 = 9 + 1 = PB².'
  },
  {
    id: 'dpa-q27',
    level: 3,
    questionTypeBadge: 'Terület téglalappal',
    figure: <PolyFig pts={[[0, 0], [6, 2], [2, 5]]} names={['O', 'K', 'L']} range={[-1, 7, -1, 6]} cell={22} box />,
    question: 'Mekkora az O(0; 0), K(6; 2), L(2; 5) háromszög területe?',
    options: ['13', '17', '15', '26'],
    correctAnswer: 0,
    explanation: 'Befoglaló téglalap: 6 · 5 = 30. Levágott háromszögek: (6 · 2) / 2 + (4 · 3) / 2 + (2 · 5) / 2 = 6 + 6 + 5 = 17. T = 30 − 17 = 13.'
  },
  {
    id: 'dpa-q28',
    level: 3,
    questionTypeBadge: 'Paralelogramma',
    figure: <PolyFig pts={[[0, 0], [4, 0], [6, 3], [2, 3]]} names={['A', 'B', 'C', 'D']} range={[-1, 7, -1, 4]} cell={24} box />,
    question: 'Mekkora az A(0; 0), B(4; 0), C(6; 3), D(2; 3) paralelogramma területe?',
    options: ['12', '18', '15', '6'],
    correctAnswer: 0,
    explanation: 'Befoglaló téglalap: 6 · 3 = 18; a két levágott derékszögű háromszög (2 · 3) / 2 = 3 és 3. T = 18 − 6 = 12 (vagy alap · magasság = 4 · 3).'
  },
  {
    id: 'dpa-q29',
    level: 3,
    questionTypeBadge: 'Tizedes koordináták',
    question: 'Mekkora a C(5; −6) és a D(0,2; 0,4) pontok távolsága?',
    options: ['8', '11,2', '64', '≈ 7,38'],
    correctAnswer: 0,
    explanation: 'CD = √((0,2 − 5)² + (0,4 − (−6))²) = √(4,8² + 6,4²) = √(23,04 + 40,96) = √64 = 8.'
  },
  {
    id: 'dpa-q30',
    level: 3,
    questionTypeBadge: 'Lépték',
    question: 'A térképen M(−4; 1) és S(4; −4), és 1 egység 160 km. Körülbelül milyen messze van egymástól a két hely a valóságban?',
    options: ['≈ 1509 km', '14 240 km', '2 278 400 km', '≈ 9,43 km'],
    correctAnswer: 0,
    explanation: 'MS = √89 ≈ 9,43 egység, a valóságban 9,43 · 160 ≈ 1509 km. (89 · 160 = 14 240 a gyökvonás elhagyásából adódna.)'
  }
];

export const DistancePerimeterAreaQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="koordinatageometria"
      topicId="g11-geo-tavolsag-terulet-quiz"
      subtopicId="tavolsag-kerulet-terulet"
      title="6. Távolság, kerület, terület – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: két pont távolsága, sokszögek kerülete, terület a befoglaló téglalappal, lépték."
      badge="11. OSZTÁLY • VI. KOORDINÁTAGEOMETRIA • KVÍZ"
      questions={DISTANCE_PERIMETER_AREA_QUESTIONS}
      cheatSheets={[
        {
          title: 'Távolság',
          items: [
            'AB = √((b₁ − a₁)² + (b₂ − a₂)²) = |→AB|.',
            'AB = BA – a sorrend a négyzet miatt mindegy.',
            'Tengellyel párhuzamos szakasz: |koordinátakülönbség|.',
            'Az origótól: √(x² + y²).'
          ]
        },
        {
          title: 'Kerület és terület',
          items: [
            'Kerület: a szomszédos csúcsok távolságainak összege.',
            'Terület: befoglaló téglalap − levágott részek.',
            'Levágott derékszögű háromszög: a befogók szorzatának fele.',
            'Négyzet: T = a² = e² / 2 (e az átló); szabályos háromszög: T = a²√3 / 4.'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Bermuda: √89 + √85 + √116 ≈ 29,4 egység ≈ 4700 km; T = 41 ≈ 1 049 600 km².',
            'ABD: K ≈ 33,42, T = 52; EFC: K ≈ 35,39, T = 60.',
            'ABCD négyszög: T = 36 − 13 = 23.',
            'Négyzet 13 oldallal: K = 52, T = 169; átló 10: T = 50; szabályos háromszög 45: T ≈ 876,85.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <DistancePerimeterAreaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <DistancePerimeterAreaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default DistancePerimeterAreaQuiz;
