import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PyramidAreaVolumeMatcher } from './PyramidAreaVolumeMatcher';
import { PyramidAreaVolumeSorter } from './PyramidAreaVolumeSorter';
import {
  QFig,
  Txt,
  Seg,
  Poly,
  RightMark,
  AngleArc,
  PolyBody,
  polyhedron,
  pyramidSolid,
  SK,
  P2,
  P3,
  PyrQ
} from '../a-gula/SolidSketch';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const CUBE_FACES = [
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 1, 5, 4],
  [1, 2, 6, 5],
  [2, 3, 7, 6],
  [3, 0, 4, 7]
];
const cubeVerts = (a: number): P3[] => [
  [0, 0, 0],
  [a, 0, 0],
  [a, 0, a],
  [0, 0, a],
  [0, a, 0],
  [a, a, 0],
  [a, a, a],
  [0, a, a]
];

/** Tejszínes doboz: három egymásra merőleges 10 cm-es él. */
const MilkQ: React.FC<{ mode: 'V' | 'A' | 'h' }> = ({ mode }) => {
  const g = polyhedron(
    [
      [0, 0, 0],
      [10, 0, 0],
      [0, 0, 10],
      [0, 10, 0]
    ],
    [
      [0, 1, 2],
      [0, 1, 3],
      [0, 2, 3],
      [1, 2, 3]
    ],
    { x: 60, y: 16, w: 120, h: 120 }
  );
  const [O, X, Z, Y] = g.pts;
  return (
    <QFig>
      {mode !== 'V' && <Poly p={[X, Z, Y]} fill="rgba(245,158,11,0.2)" color="none" w={0} />}
      <PolyBody g={g} />
      <RightMark v={O} p1={X} p2={Y} r={9} />
      <RightMark v={O} p1={Z} p2={Y} r={7} />
      <Txt p={[(O[0] + X[0]) / 2, O[1] + 11]} t="10 cm" size={10} />
      <Txt p={[O[0] - 5, (O[1] + Y[1]) / 2]} t="10 cm" size={10} anchor="end" />
      <Txt p={[(O[0] + Z[0]) / 2 - 6, (O[1] + Z[1]) / 2 - 6]} t="10" size={9.5} color={SK.aux} anchor="end" />
      {mode === 'V' && <Txt p={[200, 30]} t="V = ?" />}
      {mode === 'A' && <Txt p={[200, 30]} t="A = ?" />}
      {mode === 'h' && <Txt p={[(X[0] + Z[0] + Y[0]) / 3 + 6, (X[1] + Z[1] + Y[1]) / 3]} t="m = ?" size={10} />}
    </QFig>
  );
};

/** Háztető: 10 × 7 m-es alap, 6 m-es gerinc, 3,2 m magas. */
const RoofQ: React.FC<{ mode: 'V' | 'angle' }> = ({ mode }) => {
  const v: P3[] = [
    [0, 0, 0],
    [10, 0, 0],
    [10, 0, 7],
    [0, 0, 7],
    [2, 3.2, 3.5],
    [8, 3.2, 3.5]
  ];
  const g = polyhedron(
    v,
    [
      [0, 1, 2, 3],
      [0, 1, 5, 4],
      [3, 2, 5, 4],
      [0, 3, 4],
      [1, 2, 5]
    ],
    { x: 22, y: 20, w: 196, h: 110 }
  );
  const [A, B, , , E, G] = g.pts;
  const Q = g.P([8, 0, 3.5]);
  const K = g.P([8, 0, 0]);
  return (
    <QFig>
      <PolyBody g={g} fill="rgba(220,38,38,0.08)" color="#b91c1c" />
      <Seg a={G} b={Q} color={SK.aux} dash w={1.2} />
      {mode === 'angle' && (
        <>
          <Seg a={Q} b={K} color={SK.blue} dash w={1.2} />
          <Seg a={G} b={K} color={SK.blue} w={1.4} />
          <AngleArc v={K} p1={Q} p2={G} t="?" r={12} tr={21} />
        </>
      )}
      <Txt p={[(A[0] + B[0]) / 2, A[1] + 11]} t="10 m" size={10} />
      <Txt p={[B[0] + 14, B[1] - 14]} t="7 m" size={10} />
      <Txt p={[(E[0] + G[0]) / 2, E[1] - 8]} t="6 m" size={10} />
      <Txt p={[Q[0] + 6, (G[1] + Q[1]) / 2]} t="3,2 m" size={9.5} anchor="start" color={SK.aux} />
      {mode === 'V' && <Txt p={[40, 30]} t="V = ?" />}
    </QFig>
  );
};

/** Rombusz alapú gúla, a magasság talppontja a rombusz középpontja. */
const RhombusQ: React.FC = () => {
  const base: P3[] = [
    [-9, 0, 0],
    [0, 0, -7.5],
    [9, 0, 0],
    [0, 0, 7.5]
  ];
  const s = pyramidSolid(4, 1, 15, base, [0, 15, 0]);
  const g = polyhedron(s.verts, s.faces, { x: 50, y: 14, w: 140, h: 122 });
  const O = g.P([0, 0, 0]);
  const [P0, P1, P2, P3v, T] = g.pts;
  return (
    <QFig>
      <PolyBody g={g} />
      <Seg a={P0} b={P2} color={SK.aux} dash w={1.1} />
      <Seg a={P1} b={P3v} color={SK.aux} dash w={1.1} />
      <Seg a={T} b={O} color={SK.red} dash w={1.4} />
      <Txt p={[O[0] + 5, (T[1] + O[1]) / 2]} t="15 cm" size={10} anchor="start" color={SK.red} />
      <Txt p={[P0[0] - 4, P0[1] + 12]} t="e = 18" size={9.5} color={SK.aux} anchor="start" />
      <Txt p={[P1[0] + 12, P1[1] + 4]} t="f = 15" size={9.5} color={SK.aux} anchor="start" />
    </QFig>
  );
};

/** Kocka sarkát levágó sík (a csúcsba futó három él végpontjain át). */
const CubeCornerQ: React.FC = () => {
  const g = polyhedron(cubeVerts(20), CUBE_FACES, { x: 60, y: 14, w: 120, h: 122 });
  const p = g.pts;
  return (
    <QFig>
      <Poly p={[p[0], p[2], p[5]]} fill="rgba(220,38,38,0.18)" color={SK.red} w={1.6} />
      <PolyBody g={g} noFill />
      <Txt p={[(p[0][0] + p[1][0]) / 2, p[0][1] + 11]} t="20 cm" size={10} />
    </QFig>
  );
};

/** Kockába írt, csupa derékszögű lapú tetraéder. */
const OrthoQ: React.FC = () => {
  const g = polyhedron(cubeVerts(10), CUBE_FACES, { x: 60, y: 14, w: 120, h: 122 });
  const [A, B, C] = [g.pts[0], g.pts[1], g.pts[2]];
  const D = g.pts[6];
  return (
    <QFig>
      <PolyBody g={g} noFill color="#94a3b8" w={1.1} />
      <Poly p={[A, B, D]} fill="rgba(220,38,38,0.12)" color="none" w={0} />
      <Seg a={A} b={B} color={SK.red} w={2} />
      <Seg a={B} b={C} color={SK.red} w={2} />
      <Seg a={C} b={D} color={SK.red} w={2} />
      <Seg a={B} b={D} color={SK.red} w={2} />
      <Seg a={A} b={D} color={SK.red} w={2} />
      <Seg a={A} b={C} color={SK.red} w={1.4} dash />
      <Txt p={[A[0] - 8, A[1] + 4]} t="A" size={10} />
      <Txt p={[B[0] + 8, B[1] + 4]} t="B" size={10} />
      <Txt p={[C[0] + 9, C[1]]} t="C" size={10} />
      <Txt p={[D[0] + 8, D[1] - 4]} t="D" size={10} />
      <Txt p={[(A[0] + B[0]) / 2, A[1] + 11]} t="10 cm" size={10} />
    </QFig>
  );
};

/** Négyzet alapú gúla hálója 30 cm-es élekkel. */
const NetQ: React.FC = () => {
  const s = 44;
  const c: P2 = [120, 78];
  const A: P2 = [c[0] - s / 2, c[1] + s / 2];
  const B: P2 = [c[0] + s / 2, c[1] + s / 2];
  const C: P2 = [c[0] + s / 2, c[1] - s / 2];
  const D: P2 = [c[0] - s / 2, c[1] - s / 2];
  const h = (s * Math.sqrt(3)) / 2;
  return (
    <QFig>
      <Poly p={[A, B, C, D]} fill="rgba(16,185,129,0.15)" color={SK.green} />
      <Poly p={[A, B, [c[0], A[1] + h]]} />
      <Poly p={[C, D, [c[0], D[1] - h]]} />
      <Poly p={[B, C, [B[0] + h, c[1]]]} />
      <Poly p={[D, A, [A[0] - h, c[1]]]} />
      <Txt p={c} t="30 cm" size={9.5} color={SK.green} />
      <Txt p={[B[0] + 26, C[1] - 4]} t="30" size={9.5} />
    </QFig>
  );
};

export const PYRAMID_AREA_VOLUME_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'pav-q1',
    level: 1,
    questionTypeBadge: 'Térfogatképlet',
    question: 'Hogyan számítjuk ki a gúla térfogatát?',
    options: ['V = T_alaplap · M / 3', 'V = T_alaplap · M', 'V = T_alaplap · M / 2', 'V = T_alaplap · mₒ / 3'],
    correctAnswer: 0,
    explanation: 'A gúla térfogata az alapterület és a testmagasság szorzatának harmadrésze.'
  },
  {
    id: 'pav-q2',
    level: 1,
    questionTypeBadge: 'Gúla térfogata',
    figure: <PyrQ n={4} h={1.6} l={{ edge: 'a = 6 cm', M: 'M = 10' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 6 cm, magassága 10 cm. Mekkora a térfogata?',
    options: ['120 cm³', '360 cm³', '180 cm³', '60 cm³'],
    correctAnswer: 0,
    explanation: 'T = 6² = 36 cm², V = 36 · 10 / 3 = 120 cm³. (A 360 cm³ a hasáb térfogata lenne.)'
  },
  {
    id: 'pav-q3',
    level: 1,
    questionTypeBadge: 'Hasáb és gúla',
    question: 'Egy hasáb térfogata 90 cm³. Mekkora annak a gúlának a térfogata, amelynek alapterülete és magassága is ugyanakkora, mint a hasábé?',
    options: ['30 cm³', '45 cm³', '90 cm³', '270 cm³'],
    correctAnswer: 0,
    explanation: 'A gúla térfogata az azonos alapterületű és magasságú hasáb térfogatának harmada: 90 / 3 = 30 cm³.'
  },
  {
    id: 'pav-q4',
    level: 1,
    questionTypeBadge: 'Felszín',
    question: 'Mi a gúla felszíne?',
    options: [
      'A gúlát határoló lapok területének összege',
      'Az oldallapok területének összege',
      'Az alaplap területe és a magasság szorzata',
      'Az alaplap kerülete és az oldallap magasságának szorzata'
    ],
    correctAnswer: 0,
    explanation: 'A = T_alaplap + T_palást: az alaplap és az összes oldallap területe együtt. Az oldallapok összege csak a palást.'
  },
  {
    id: 'pav-q5',
    level: 1,
    questionTypeBadge: 'Palást területe',
    figure: <PyrQ n={4} h={1.6} l={{ edge: 'a = 10 cm', mo: 'mₒ = 13' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 10 cm, oldallapjának magassága 13 cm. Mekkora a palást területe?',
    options: ['260 cm²', '520 cm²', '130 cm²', '360 cm²'],
    correctAnswer: 0,
    explanation: 'Egy oldallap: 10 · 13 / 2 = 65 cm², négy oldallap: 4 · 65 = 260 cm².'
  },
  {
    id: 'pav-q6',
    level: 1,
    questionTypeBadge: 'Gúla felszíne',
    figure: <PyrQ n={4} h={1.6} l={{ edge: 'a = 10 cm', mo: 'mₒ = 13' }} />,
    question: 'Mekkora az előző gúla (a = 10 cm, mₒ = 13 cm) felszíne?',
    options: ['360 cm²', '260 cm²', '620 cm²', '230 cm²'],
    correctAnswer: 0,
    explanation: 'A = T_alaplap + T_palást = 10² + 260 = 360 cm².'
  },
  {
    id: 'pav-q7',
    level: 1,
    questionTypeBadge: 'Gúla térfogata',
    question: 'Egy háromoldalú gúla alaplapjának területe 24 cm², magassága 5 cm. Mekkora a térfogata?',
    options: ['40 cm³', '120 cm³', '60 cm³', '24 cm³'],
    correctAnswer: 0,
    explanation: 'V = 24 · 5 / 3 = 40 cm³.'
  },
  {
    id: 'pav-q8',
    level: 1,
    questionTypeBadge: 'Tejszínes doboz',
    figure: <MilkQ mode="V" />,
    question: 'A tejszínes doboz tetraéder, amelynek egyik csúcsából három, páronként merőleges, 10 cm-es él indul. Mennyi tejszín fér bele?',
    options: ['≈ 166,7 cm³', '500 cm³', '1000 cm³', '≈ 333,3 cm³'],
    correctAnswer: 0,
    explanation: 'Alaplap egy derékszögű lap (50 cm²), magasság a rá merőleges 10 cm-es él: V = 50 · 10 / 3 ≈ 166,7 cm³ ≈ 1,7 dl.'
  },
  {
    id: 'pav-q9',
    level: 1,
    questionTypeBadge: 'Magasság térfogatból',
    question: 'Egy gúla térfogata 200 cm³, alaplapjának területe 50 cm². Milyen magas a gúla?',
    options: ['12 cm', '4 cm', '6 cm', '1,33 cm'],
    correctAnswer: 0,
    explanation: 'V = T · M / 3 ⇒ M = 3V / T = 600 / 50 = 12 cm.'
  },
  {
    id: 'pav-q10',
    level: 1,
    questionTypeBadge: 'Tetraéder térfogata',
    question: 'Melyik állítás igaz a tetraéder térfogatának kiszámítására?',
    options: [
      'Bármelyik lap lehet alaplap, de a hozzá tartozó magassággal kell számolni',
      'Csak a legnagyobb lap lehet az alaplap',
      'Mindig a legrövidebb élt kell magasságnak venni',
      'A térfogat attól függ, melyik lapot választjuk alaplapnak'
    ],
    correctAnswer: 0,
    explanation: 'A tetraéder bármelyik lapja tekinthető alaplapnak; a térfogat ugyanannyi lesz, ha a kiválasztott laphoz tartozó magassággal számolunk.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'pav-q11',
    level: 2,
    questionTypeBadge: 'Gúla felszíne',
    figure: <PyrQ n={4} h={0.75} l={{ edge: 'a = 8 cm', M: 'M = 3', mo: 'mₒ' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 8 cm, magassága 3 cm. Mekkora a felszíne?',
    options: ['144 cm²', '112 cm²', '160 cm²', '80 cm²'],
    correctAnswer: 0,
    explanation: 'mₒ = √(3² + 4²) = 5 cm. A = 8² + 4 · 8 · 5 / 2 = 64 + 80 = 144 cm². (112 = 64 + 4·8·3/2 – a testmagassággal számolva, hibásan.)'
  },
  {
    id: 'pav-q12',
    level: 2,
    questionTypeBadge: 'Gúla térfogata',
    figure: <PyrQ n={4} h={0.75} l={{ edge: 'a = 8 cm', M: 'M = 3' }} />,
    question: 'Mekkora az előző gúla (a = 8 cm, M = 3 cm) térfogata?',
    options: ['64 cm³', '192 cm³', '≈ 106,7 cm³', '32 cm³'],
    correctAnswer: 0,
    explanation: 'V = 64 · 3 / 3 = 64 cm³. (106,7 cm³ jönne ki, ha M helyett mₒ = 5-tel számolnánk.)'
  },
  {
    id: 'pav-q13',
    level: 2,
    questionTypeBadge: 'Tejszínes doboz',
    figure: <MilkQ mode="A" />,
    question: 'Mennyi karton kell a tejszínes dobozhoz (három 10 cm befogójú, egyenlő szárú derékszögű lap + egy szabályos háromszög lap), ha a ragasztás miatt a felszín 5%-át is hozzászámoljuk?',
    options: ['≈ 248 cm²', '≈ 237 cm²', '≈ 158 cm²', '≈ 210 cm²'],
    correctAnswer: 0,
    explanation: '3 · 50 = 150 cm² és a 10√2 oldalú szabályos háromszög: (10√2)²·√3/4 ≈ 86,6 cm². Összesen ≈ 236,6 cm², ennek 105%-a ≈ 248 cm².'
  },
  {
    id: 'pav-q14',
    level: 2,
    questionTypeBadge: 'Szabályos tetraéder',
    figure: <PyrQ n={3} h={1.414} l={{ edge: 'a = 6 cm' }} />,
    question: 'Mekkora a 6 cm élű szabályos tetraéder felszíne?',
    options: ['36√3 ≈ 62,4 cm²', '9√3 ≈ 15,6 cm²', '27√3 ≈ 46,8 cm²', '72 cm²'],
    correctAnswer: 0,
    explanation: 'Négy egybevágó szabályos háromszög: A = 4 · 6²·√3 / 4 = 36√3 ≈ 62,4 cm².'
  },
  {
    id: 'pav-q15',
    level: 2,
    questionTypeBadge: 'Gúlaháló',
    figure: <NetQ />,
    question: 'Az ábrán egy négyzet alapú gúla hálója látható: a négyzet oldala 30 cm, az oldallapok 30 cm oldalú szabályos háromszögek. Mekkora a gúla felszíne?',
    options: ['≈ 2458,8 cm²', '≈ 1558,8 cm²', '≈ 3117,7 cm²', '2700 cm²'],
    correctAnswer: 0,
    explanation: 'A = 30² + 4 · 30²·√3/4 = 900 + 900√3 ≈ 2458,8 cm². (1558,8 cm² csak a palást.)'
  },
  {
    id: 'pav-q16',
    level: 2,
    questionTypeBadge: 'Hatoldalú gúla',
    figure: <PyrQ n={6} h={0.9} l={{ edge: 'a = 12 cm', b: 'b = 13', M: 'M' }} />,
    question: 'Egy szabályos hatoldalú gúla alapéle 12 cm, oldaléle 13 cm. Mekkora a térfogata?',
    options: ['360√3 ≈ 623,5 cm³', '1080√3 ≈ 1870,6 cm³', '120√3 ≈ 207,8 cm³', '≈ 1438,6 cm³'],
    correctAnswer: 0,
    explanation: 'M = √(13² − 12²) = 5 cm, T = 6 · 144√3/4 = 216√3 cm². V = 216√3 · 5 / 3 = 360√3 ≈ 623,5 cm³.'
  },
  {
    id: 'pav-q17',
    level: 2,
    questionTypeBadge: 'Térfogat oldalélből',
    figure: <PyrQ n={4} h={1.5} l={{ edge: 'a = 10 cm', b: 'b = 13', M: 'M' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 10 cm, oldaléle 13 cm. Mekkora a térfogata?',
    options: ['≈ 363,6 cm³', '400 cm³', '≈ 1090,9 cm³', '≈ 433,3 cm³'],
    correctAnswer: 0,
    explanation: 'R = 5√2, M = √(169 − 50) = √119 ≈ 10,91 cm. V = 100 · 10,91 / 3 ≈ 363,6 cm³. (400 cm³ jönne ki, ha mₒ = 12-vel számolnánk.)'
  },
  {
    id: 'pav-q18',
    level: 2,
    questionTypeBadge: 'Kocka és tetraéder',
    question: 'Egy kocka egyik csúcsába futó három él másik végpontjain átmenő sík levág egy tetraédert. Hányad része ennek a térfogata a kocka térfogatának?',
    options: ['1/6', '1/3', '1/4', '1/8'],
    correctAnswer: 0,
    explanation: 'Alaplap egy fél kockalap (a²/2), magasság a: V = (a²/2) · a / 3 = a³/6.'
  },
  {
    id: 'pav-q19',
    level: 2,
    questionTypeBadge: 'Rombusz alapú gúla',
    figure: <RhombusQ />,
    question: 'Egy gúla alaplapja rombusz, amelynek átlói 18 cm és 15 cm. A gúla 15 cm magas. Mekkora a térfogata?',
    options: ['675 cm³', '1350 cm³', '2025 cm³', '1012,5 cm³'],
    correctAnswer: 0,
    explanation: 'A rombusz területe e · f / 2 = 18 · 15 / 2 = 135 cm². V = 135 · 15 / 3 = 675 cm³.'
  },
  {
    id: 'pav-q20',
    level: 2,
    questionTypeBadge: 'Magasság térfogatból',
    figure: <PyrQ n={4} h={1.3} l={{ edge: 'a = 6 cm', M: 'M = ?' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 6 cm, térfogata 96 cm³. Milyen magas?',
    options: ['8 cm', '≈ 2,67 cm', '16 cm', '5 cm'],
    correctAnswer: 0,
    explanation: 'M = 3V / T = 3 · 96 / 36 = 8 cm.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'pav-q21',
    level: 3,
    questionTypeBadge: 'Hatoldalú gúla felszíne',
    figure: <PyrQ n={6} h={0.9} l={{ edge: 'a = 12 cm', b: 'b = 13' }} />,
    question: 'Egy szabályos hatoldalú gúla alapéle 12 cm, oldaléle 13 cm. Mekkora a felszíne?',
    options: ['≈ 789,3 cm²', '≈ 415,2 cm²', '≈ 554,1 cm²', '≈ 608,1 cm²'],
    correctAnswer: 0,
    explanation: 'mₒ = √(13² − 6²) = √133 ≈ 11,53 cm. T_palást = 6 · 12 · 11,53 / 2 ≈ 415,2 cm², T_alap = 216√3 ≈ 374,1 cm². A ≈ 789,3 cm².'
  },
  {
    id: 'pav-q22',
    level: 3,
    questionTypeBadge: 'Térfogat szögből',
    figure: <PyrQ n={4} h={0.77} l={{ edge: 'a', M: 'M = 8', beta: '57°' }} />,
    question: 'Egy szabályos négyoldalú gúla magassága 8 cm, oldallapjai 57°-os szöget zárnak be az alaplap síkjával. Mekkora a térfogata?',
    options: ['≈ 287,9 cm³', '≈ 863,7 cm³', '≈ 72,0 cm³', '≈ 216,0 cm³'],
    correctAnswer: 0,
    explanation: 'a/2 = 8 / tg 57° ≈ 5,195 cm ⇒ a ≈ 10,39 cm. V = 10,39² · 8 / 3 ≈ 287,9 cm³.'
  },
  {
    id: 'pav-q23',
    level: 3,
    questionTypeBadge: 'Tetőtér térfogata',
    figure: <RoofQ mode="V" />,
    question: 'A háztető alapja 10 m × 7 m-es téglalap, a 6 m-es tetőgerinc a téglalap középvonala felett 3,2 m magasan húzódik. Mekkora a tetőtér térfogata?',
    options: ['≈ 97,1 m³', '112 m³', '67,2 m³', '≈ 74,7 m³'],
    correctAnswer: 0,
    explanation: 'Középen háromszög alapú hasáb: 7 · 3,2 / 2 · 6 = 67,2 m³. A két végén 2 m × 7 m alapú, 3,2 m magas gúla: 2 · 14 · 3,2 / 3 ≈ 29,9 m³. Összesen ≈ 97,1 m³.'
  },
  {
    id: 'pav-q24',
    level: 3,
    questionTypeBadge: 'Tetősík hajlásszöge',
    figure: <RoofQ mode="angle" />,
    question: 'Mekkora szöget zár be az előző tető trapéz alakú lapja a vízszintes síkkal?',
    options: ['≈ 42,4°', '≈ 58,0°', '≈ 47,6°', '≈ 32,0°'],
    correctAnswer: 0,
    explanation: 'A gerinc a 7 m-es oldal felénél, 3,5 m-re van a hosszú éltől: tg α = 3,2 / 3,5 ⇒ α ≈ 42,4°. (58,0° a háromszög alakú lap szöge: tg β = 3,2 / 2.)'
  },
  {
    id: 'pav-q25',
    level: 3,
    questionTypeBadge: 'Oktaéder',
    question: 'Két szabályos négyoldalú gúlát, amelyeknek minden éle 30 cm, alaplapjuknál összeragasztunk. Mekkora a kapott szabályos oktaéder térfogata?',
    options: ['≈ 12 728 cm³', '≈ 6364 cm³', '≈ 25 456 cm³', '18 000 cm³'],
    correctAnswer: 0,
    explanation: 'Egy gúla magassága M = √(30² − (15√2)²) = 15√2 ≈ 21,21 cm, térfogata 900 · 21,21 / 3 ≈ 6364 cm³. Kettő: ≈ 12 728 cm³.'
  },
  {
    id: 'pav-q26',
    level: 3,
    questionTypeBadge: 'Szabályos tetraéder',
    figure: <PyrQ n={3} h={1.414} l={{ edge: 'a = 6 cm', M: 'M' }} />,
    question: 'Mekkora a 6 cm élű szabályos tetraéder térfogata?',
    options: ['18√2 ≈ 25,5 cm³', '36√2 ≈ 50,9 cm³', '9√3 ≈ 15,6 cm³', '54√2 ≈ 76,4 cm³'],
    correctAnswer: 0,
    explanation: 'T = 36√3/4 = 9√3 cm², M = 6·√(2/3) = 2√6 cm. V = 9√3 · 2√6 / 3 = 6√18 = 18√2 ≈ 25,5 cm³ (képlettel: a³√2/12).'
  },
  {
    id: 'pav-q27',
    level: 3,
    questionTypeBadge: 'Kocka szétvágása',
    figure: <CubeCornerQ />,
    question: 'Egy 20 cm élű kockát egy csúcsába futó három él másik végpontjain átmenő síkkal kettévágunk. Mekkora térfogatú részekre bomlik a kocka?',
    options: ['≈ 1333,3 cm³ és ≈ 6666,7 cm³', '2000 cm³ és 6000 cm³', '≈ 2666,7 cm³ és ≈ 5333,3 cm³', '4000 cm³ és 4000 cm³'],
    correctAnswer: 0,
    explanation: 'A levágott tetraéder: (20 · 20 / 2) · 20 / 3 = 8000/6 ≈ 1333,3 cm³; a maradék 8000 − 1333,3 ≈ 6666,7 cm³.'
  },
  {
    id: 'pav-q28',
    level: 3,
    questionTypeBadge: 'Tetraéder felszíne',
    figure: <OrthoQ />,
    question: 'A tetraéder mind a négy csúcsa egy 10 cm élű kocka csúcsa: AB, BC és CD egy-egy kockaél, páronként merőlegesek. Mekkora a tetraéder felszíne?',
    options: ['100 + 100√2 ≈ 241,4 cm²', '200 cm²', '50√3 ≈ 86,6 cm²', '≈ 341,4 cm²'],
    correctAnswer: 0,
    explanation: 'Két lap (ABC, BCD) 10 és 10 befogójú: 50–50 cm². Két lap (ABD, ACD) 10 és 10√2 befogójú derékszögű háromszög: 50√2–50√2 cm². A = 100 + 100√2 ≈ 241,4 cm².'
  },
  {
    id: 'pav-q29',
    level: 3,
    questionTypeBadge: 'Felszín szögből',
    figure: <PyrQ n={4} h={1.73} l={{ edge: 'a = 10 cm', mo: 'mₒ', beta: '60°' }} />,
    question: 'Egy szabályos négyoldalú gúla alapéle 10 cm, oldallapjai 60°-os szöget zárnak be az alaplappal. Mekkora a felszíne?',
    options: ['300 cm²', '200 cm²', '≈ 273,2 cm²', '400 cm²'],
    correctAnswer: 0,
    explanation: 'cos 60° = (a/2) / mₒ ⇒ mₒ = 5 / 0,5 = 10 cm. A = 100 + 4 · 10 · 10 / 2 = 300 cm².'
  },
  {
    id: 'pav-q30',
    level: 3,
    questionTypeBadge: 'Tetraéder magassága',
    figure: <MilkQ mode="h" />,
    question: 'A tejszínes doboz (három páronként merőleges, 10 cm-es él) szabályos háromszög lapjához tartozó magassága mekkora?',
    options: ['10/√3 ≈ 5,77 cm', '10 cm', '≈ 8,16 cm', '≈ 1,92 cm'],
    correctAnswer: 0,
    explanation: 'V ≈ 166,7 cm³ minden alaplap-választásnál ugyanannyi. A szabályos lap területe 50√3 ≈ 86,6 cm², így m = 3V / T = 500 / 86,6 ≈ 5,77 cm.'
  }
];

export const PyramidAreaVolumeQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="tergeometria"
      topicId="g12-ter-gula-felszin-terfogat-quiz"
      subtopicId="a-gula-felszine-es-terfogata"
      title="11. A gúla felszíne és térfogata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: palást és felszín, térfogat, tetraéderek, tető és kocka feldarabolása."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={PYRAMID_AREA_VOLUME_QUESTIONS}
      cheatSheets={[
        {
          title: 'Képletek',
          items: [
            'A = T_alaplap + T_palást',
            'V = T_alaplap · M / 3 (a hasáb harmada)',
            'Szabályos n oldalú gúla palástja: n · a · mₒ / 2',
            'Szabályos négyoldalú: A = a² + 2a·mₒ, V = a²·M/3'
          ]
        },
        {
          title: 'Tetraéderek',
          items: [
            'Szabályos tetraéder: A = a²√3, V = a³√2/12',
            'Kocka sarka (3 merőleges a él): V = a³/6',
            'Bármelyik lap alaplap lehet – a hozzá tartozó magassággal',
            'Tejszínes doboz (10 cm): V ≈ 166,7 cm³, karton ≈ 248 cm²'
          ]
        },
        {
          title: 'Segédszámítások',
          items: [
            'M² + (a/2)² = mₒ² (négyzet alap)',
            'M² + R² = b²',
            'Rombusz területe: e · f / 2',
            'M = 3V / T_alaplap'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PyramidAreaVolumeMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <PyramidAreaVolumeSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default PyramidAreaVolumeQuiz;
