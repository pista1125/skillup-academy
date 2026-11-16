import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { VectorsCoordinatesSummaryMatcher } from './VectorsCoordinatesSummaryMatcher';
import { VectorsCoordinatesSummarySorter } from './VectorsCoordinatesSummarySorter';
import { S_BLUE, S_RED, S_INK, S_GREEN, S_PURPLE, S_AMBER, Pt, Grid, Arrow, makePlane, PlaneCfg, RightAt } from './sumKit';

const QFIG = 'w-full max-w-[280px] h-auto mx-auto';

/** Kis koordináta-rendszeres kvízábra. */
const Coord: React.FC<{ c: PlaneCfg; h?: number; labelEvery?: number; children: (P: (x: number, y: number) => Pt, s: number) => React.ReactNode }> = ({
  c,
  h = 170,
  labelEvery = 2,
  children
}) => {
  const { P, sx } = makePlane(c);
  return (
    <svg viewBox={`0 0 240 ${h}`} className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
      <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
      <Grid c={c} labelEvery={labelEvery} fontSize={7.5} />
      {children(P, sx)}
    </svg>
  );
};
const Dot: React.FC<{ p: Pt; t: string; dx?: number; dy?: number; c?: string }> = ({ p, t, dx = 4, dy = -4, c = S_INK }) => (
  <g>
    <circle cx={p[0]} cy={p[1]} r="3" fill={c} />
    <text x={p[0] + dx} y={p[1] + dy} fontSize="9.5" fontWeight="bold" fill={c}>
      {t}
    </text>
  </g>
);

const FIG_Q1 = (
  <Coord c={{ xmin: -4, xmax: 8, ymin: -3, ymax: 9, x0: 60, y0: 12, w: 144, h: 144 }} h={172}>
    {(P) => (
      <>
        <line x1={P(-3, 8)[0]} y1={P(-3, 8)[1]} x2={P(7, -2)[0]} y2={P(7, -2)[1]} stroke={S_BLUE} strokeWidth="2" />
        <Dot p={P(-3, 8)} t="A(−3; 8)" />
        <Dot p={P(7, -2)} t="B(7; −2)" dx={-30} dy={-6} />
        <text x="170" y="40" fontSize="11" fontWeight="bold" fill={S_RED}>
          F = ?
        </text>
      </>
    )}
  </Coord>
);

const FIG_Q3 = (
  <Coord c={{ xmin: -8, xmax: 2, ymin: -4, ymax: 10, x0: 80, y0: 12, w: 100, h: 140 }} h={170}>
    {(P) => (
      <>
        <line x1={P(-6, 9)[0]} y1={P(-6, 9)[1]} x2={P(-1, -3)[0]} y2={P(-1, -3)[1]} stroke={S_RED} strokeWidth="2" />
        <line x1={P(-6, -3)[0]} y1={P(-6, -3)[1]} x2={P(-1, -3)[0]} y2={P(-1, -3)[1]} stroke={S_AMBER} strokeDasharray="3 2" />
        <line x1={P(-6, 9)[0]} y1={P(-6, 9)[1]} x2={P(-6, -3)[0]} y2={P(-6, -3)[1]} stroke={S_AMBER} strokeDasharray="3 2" />
        <RightAt V={P(-6, -3)} P={P(-1, -3)} Q={P(-6, 9)} r={7} color={S_AMBER} />
        <Dot p={P(-6, 9)} t="P(−6; 9)" />
        <Dot p={P(-1, -3)} t="Q(−1; −3)" dx={4} dy={10} />
        <text x="190" y="80" fontSize="11" fontWeight="bold" fill={S_RED}>
          PQ = ?
        </text>
      </>
    )}
  </Coord>
);

const FIG_Q9 = (
  <Coord c={{ xmin: -12, xmax: 2, ymin: -3, ymax: 11, x0: 60, y0: 12, w: 140, h: 140 }} h={170}>
    {(P, s) => (
      <>
        <circle cx={P(-5, 4)[0]} cy={P(-5, 4)[1]} r={Math.sqrt(41) * s} fill="none" stroke={S_PURPLE} strokeWidth="2" />
        <line x1={P(-5, 4)[0]} y1={P(-5, 4)[1]} x2={P(0, 0)[0]} y2={P(0, 0)[1]} stroke={S_RED} strokeWidth="1.6" />
        <Dot p={P(-5, 4)} t="C(−5; 4)" />
        <Dot p={P(0, 0)} t="O" dx={4} dy={10} />
        <text x="140" y="70" fontSize="10" fontWeight="bold" fill={S_RED}>
          r = ?
        </text>
      </>
    )}
  </Coord>
);

const FIG_Q16 = (
  <svg viewBox="0 0 240 160" className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="158" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    <rect x="60" y="20" width="120" height="120" fill="#eef2ff" stroke={S_INK} strokeWidth="1.6" />
    <Arrow from={[60, 140]} to={[180, 140]} color={S_BLUE} />
    <Arrow from={[60, 140]} to={[60, 20]} color={S_GREEN} />
    <Arrow from={[60, 140]} to={[180, 100]} color={S_RED} />
    <circle cx="180" cy="100" r="3" fill={S_RED} />
    <line x1="174" y1="100" x2="186" y2="100" stroke={S_INK} />
    <line x1="174" y1="60" x2="186" y2="60" stroke={S_INK} />
    <text x="48" y="152" fontSize="11" fontWeight="bold" fill={S_INK}>A</text>
    <text x="184" y="152" fontSize="11" fontWeight="bold" fill={S_INK}>B</text>
    <text x="184" y="18" fontSize="11" fontWeight="bold" fill={S_INK}>C</text>
    <text x="48" y="18" fontSize="11" fontWeight="bold" fill={S_INK}>D</text>
    <text x="188" y="104" fontSize="11" fontWeight="bold" fill={S_RED}>H</text>
    <text x="120" y="154" fontSize="11" fontWeight="bold" fill={S_BLUE}>b</text>
    <text x="46" y="84" fontSize="11" fontWeight="bold" fill={S_GREEN}>d</text>
    <text x="104" y="112" fontSize="11" fontWeight="bold" fill={S_RED}>AH = ?</text>
  </svg>
);

const FIG_Q21 = (
  <Coord c={{ xmin: -6, xmax: 5, ymin: -1, ymax: 13, x0: 70, y0: 10, w: 110, h: 140 }} h={170} labelEvery={4}>
    {(P) => (
      <>
        <polygon points={`${P(-5, 3)} ${P(-1, 0)} ${P(4, 12)}`} fill="#dbeafe" fillOpacity="0.6" stroke={S_INK} strokeWidth="1.6" />
        <Dot p={P(-5, 3)} t="A" dx={-10} />
        <Dot p={P(-1, 0)} t="B" dx={4} dy={10} />
        <Dot p={P(4, 12)} t="C" />
        <text x={P(-1, 0)[0] + 10} y={P(-1, 0)[1] - 6} fontSize="10" fontWeight="bold" fill={S_RED}>
          β = ?
        </text>
        <text x="186" y="50" fontSize="9" fill={S_INK}>A(−5; 3)</text>
        <text x="186" y="64" fontSize="9" fill={S_INK}>B(−1; 0)</text>
        <text x="186" y="78" fontSize="9" fill={S_INK}>C(4; 12)</text>
      </>
    )}
  </Coord>
);

const FIG_Q23 = (
  <Coord c={{ xmin: -2, xmax: 5, ymin: -1, ymax: 7, x0: 60, y0: 12, w: 122.5, h: 140 }} h={170}>
    {(P) => (
      <>
        <polygon points={`${P(0, 0)} ${P(2, 0)} ${P(0, 6)}`} fill="#fef3c7" stroke={S_INK} strokeWidth="1.4" />
        <line x1={P(-1 / 3, 7)[0]} y1={P(-1 / 3, 7)[1]} x2={P(7 / 3, -1)[0]} y2={P(7 / 3, -1)[1]} stroke={S_BLUE} strokeWidth="2" />
        <RightAt V={P(0, 0)} P={P(2, 0)} Q={P(0, 6)} r={8} />
        <Dot p={P(2, 0)} t="P" dx={4} dy={10} />
        <Dot p={P(0, 6)} t="Q" />
        <text x="188" y="50" fontSize="9.5" fill={S_BLUE} fontWeight="bold">e: y = −3x + 6</text>
        <text x="188" y="70" fontSize="9.5" fill={S_RED} fontWeight="bold">Thalész-kör = ?</text>
      </>
    )}
  </Coord>
);

const FIG_Q24 = (
  <Coord c={{ xmin: -18, xmax: 13, ymin: -2, ymax: 12, x0: 12, y0: 12, w: 217, h: 98 }} h={140} labelEvery={5}>
    {(P) => (
      <>
        <polygon points={`${P(-17, 9)} ${P(12, 11)} ${P(7, -1)}`} fill="#dcfce7" fillOpacity="0.6" stroke={S_INK} strokeWidth="1.6" />
        <Dot p={P(-17, 9)} t="A" dx={2} dy={-5} />
        <Dot p={P(12, 11)} t="B" dx={-12} dy={-4} />
        <Dot p={P(7, -1)} t="C" dx={5} dy={8} />
        <text x="120" y="132" fontSize="9.5" textAnchor="middle" fill={S_INK}>
          A(−17; 9), B(12; 11), C(7; −1)
        </text>
      </>
    )}
  </Coord>
);

const FIG_Q25 = (
  <Coord c={{ xmin: -2, xmax: 16, ymin: -2, ymax: 18, x0: 60, y0: 8, w: 126, h: 140 }} h={170} labelEvery={5}>
    {(P) => (
      <>
        <line x1={P(-2, 0)[0]} y1={P(-2, 0)[1]} x2={P(16, 0)[0]} y2={P(16, 0)[1]} stroke="#38bdf8" strokeWidth="4" strokeOpacity="0.6" />
        <Arrow from={P(3, 2)} to={P(11, 17)} color={S_RED} />
        <Dot p={P(3, 2)} t="P(3; 2)" dx={5} dy={2} />
        <Dot p={P(11, 17)} t="Q(11; 17)" dx={-48} dy={-2} />
        <text x="196" y="140" fontSize="9" fill="#0284c7" fontWeight="bold">folyó</text>
        <text x="196" y="60" fontSize="10" fill={S_PURPLE} fontWeight="bold">X(x; 0)?</text>
      </>
    )}
  </Coord>
);

const VECTORS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'svc-q1',
    questionTypeBadge: 'Felezőpont',
    figure: FIG_Q1,
    level: 1,
    question: 'Mik az A(−3; 8) és B(7; −2) végpontú szakasz felezőpontjának koordinátái?',
    options: ['(2; 3)', '(5; −5)', '(4; 6)', '(10; −10)'],
    correctAnswer: 0,
    explanation: 'F((−3 + 7)/2; (8 + (−2))/2) = F(2; 3). (A (10; −10) az AB vektor, a (4; 6) a koordináták összege.)'
  },
  {
    id: 'svc-q2',
    questionTypeBadge: 'Vektorösszeg',
    level: 1,
    question: 'a(−3; 8) és b(7; −2). Mik az a + b vektor koordinátái?',
    options: ['(4; 6)', '(10; −10)', '(−10; 10)', '(4; 10)'],
    correctAnswer: 0,
    explanation: 'Koordinátánként adunk össze: (−3 + 7; 8 + (−2)) = (4; 6). (A (10; −10) a b − a.)'
  },
  {
    id: 'svc-q3',
    questionTypeBadge: 'Két pont távolsága',
    figure: FIG_Q3,
    level: 1,
    question: 'Milyen hosszú a PQ szakasz, ha P(−6; 9) és Q(−1; −3)?',
    options: ['13', '17', '√119', '7'],
    correctAnswer: 0,
    explanation: 'PQ = √((−1 + 6)² + (−3 − 9)²) = √(25 + 144) = √169 = 13. (17 a koordinátakülönbségek abszolút értékének összege.)'
  },
  {
    id: 'svc-q4',
    questionTypeBadge: 'Tengelymetszet',
    level: 1,
    question: 'Hol metszi az y = 4x − 3 egyenletű egyenes az x tengelyt?',
    options: ['(0,75; 0)', '(0; −3)', '(−0,75; 0)', '(3; 0)'],
    correctAnswer: 0,
    explanation: 'y = 0 ⇒ 4x − 3 = 0 ⇒ x = 3/4 = 0,75. (A (0; −3) az y tengellyel vett metszéspont.)'
  },
  {
    id: 'svc-q5',
    questionTypeBadge: 'Kör egyenlete',
    level: 1,
    question: 'Mi a középpontja és a sugara az (x − 2)² + (y + 5)² = 9 egyenletű körnek?',
    options: ['K(2; −5), r = 3', 'K(−2; 5), r = 3', 'K(2; −5), r = 9', 'K(2; 5), r = 3'],
    correctAnswer: 0,
    explanation: '(x − u)² + (y − v)² = r² alakból u = 2, v = −5, r² = 9 ⇒ r = 3.'
  },
  {
    id: 'svc-q6',
    questionTypeBadge: 'Meredekség',
    level: 1,
    question: 'Mennyi az y = −4x + 1,6 egyenletű egyenes meredeksége?',
    options: ['−4', '1,6', '4', '−1/4'],
    correctAnswer: 0,
    explanation: 'Az y = mx + b alakban m = −4 a meredekség, b = 1,6 az y tengelymetszet.'
  },
  {
    id: 'svc-q7',
    questionTypeBadge: 'Pont és egyenes',
    level: 1,
    question: 'Rajta van-e az a(5; 4) helyvektor végpontja az e: y = 7/8 · x − 3/8 egyenletű egyenesen?',
    options: ['Igen, mert 7/8 · 5 − 3/8 = 32/8 = 4', 'Nem, mert 7/8 · 5 − 3/8 = 35/8 ≠ 4', 'Nem, mert 7/8 · 4 − 3/8 = 25/8 ≠ 5', 'Nem, mert az egyenes nem megy át az origón'],
    correctAnswer: 0,
    explanation: 'A végpont az (5; 4) pont. x = 5-öt behelyettesítve 35/8 − 3/8 = 32/8 = 4 = y, tehát a pont illeszkedik az egyenesre. (A 7/8 · 4 − 3/8 a koordináták felcserélése.)'
  },
  {
    id: 'svc-q8',
    questionTypeBadge: 'Vektor koordinátái',
    level: 1,
    question: 'Mik az AB vektor koordinátái, ha A(−5; 3) és B(−1; 0)?',
    options: ['(4; −3)', '(−4; 3)', '(−6; 3)', '(−3; 1,5)'],
    correctAnswer: 0,
    explanation: 'AB = B − A = (−1 − (−5); 0 − 3) = (4; −3). (A (−4; 3) a BA vektor, a (−3; 1,5) a felezőpont.)'
  },
  {
    id: 'svc-q9',
    questionTypeBadge: 'Kör egyenlete',
    figure: FIG_Q9,
    level: 1,
    question: 'Mi az egyenlete annak a körnek, amelynek középpontja C(−5; 4), és átmegy az origón?',
    options: ['(x + 5)² + (y − 4)² = 41', '(x − 5)² + (y + 4)² = 41', '(x + 5)² + (y − 4)² = √41', '(x + 5)² + (y − 4)² = 9'],
    correctAnswer: 0,
    explanation: 'r² = (0 + 5)² + (0 − 4)² = 25 + 16 = 41, így (x + 5)² + (y − 4)² = 41. A jobb oldalon r² áll, nem r.'
  },
  {
    id: 'svc-q10',
    questionTypeBadge: 'Pont és kör',
    level: 1,
    question: 'Illeszkedik-e a P(0; −3) pont az (x − 2)² + (y + 5)² = 9 egyenletű körre?',
    options: ['Nem, mert (0 − 2)² + (−3 + 5)² = 8 ≠ 9', 'Igen, mert 8 < 9', 'Igen, mert a távolsága 3', 'Nem, mert a pont a körön kívül van'],
    correctAnswer: 0,
    explanation: 'Behelyettesítve 4 + 4 = 8 ≠ 9, tehát nincs a körvonalon (8 < 9 miatt a körön belül van).'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'svc-q11',
    questionTypeBadge: 'Merőlegesség',
    level: 2,
    question: 'Milyen k esetén merőleges egymásra az y = 5x − 7 és az y = kx + 3 egyenes?',
    options: ['k = −1/5', 'k = 5', 'k = −5', 'k = 1/5'],
    correctAnswer: 0,
    explanation: 'Merőlegesség: 5 · k = −1 ⇒ k = −1/5. (k = 5 esetén párhuzamosak lennének.)'
  },
  {
    id: 'svc-q12',
    questionTypeBadge: 'Egyenes egyenlete',
    level: 2,
    question: 'Mi az egyenlete az m = −2/3 meredekségű, P(4; −2) ponton átmenő egyenesnek?',
    options: ['y = −2/3 · x + 2/3', 'y = −2/3 · x − 2', 'y = −2/3 · x + 14/3', 'y = 2/3 · x − 14/3'],
    correctAnswer: 0,
    explanation: '−2 = −2/3 · 4 + b ⇒ b = −2 + 8/3 = 2/3. (A −2 csak a P második koordinátája, nem a tengelymetszet.)'
  },
  {
    id: 'svc-q13',
    questionTypeBadge: 'Metszéspont',
    level: 2,
    question: 'Mik az y = −2x − 4 és az y = 3x + 1 egyenesek metszéspontjának koordinátái?',
    options: ['(−1; −2)', '(1; 4)', '(−1; 2)', '(−3; −8)'],
    correctAnswer: 0,
    explanation: '−2x − 4 = 3x + 1 ⇒ −5 = 5x ⇒ x = −1, y = 3 · (−1) + 1 = −2.'
  },
  {
    id: 'svc-q14',
    questionTypeBadge: 'Merőleges egyenes',
    level: 2,
    question: 'Az e: y = −3x + 6 egyenesre merőleges f egyenes az x tengelyt a (−5; 0) pontban metszi. Mi f egyenlete?',
    options: ['y = x/3 + 5/3', 'y = 3x + 15', 'y = −x/3 − 5/3', 'y = x/3 − 5'],
    correctAnswer: 0,
    explanation: 'm_f = 1/3 (mert −3 · 1/3 = −1); 0 = 1/3 · (−5) + b ⇒ b = 5/3.'
  },
  {
    id: 'svc-q15',
    questionTypeBadge: 'Háromszög területe',
    level: 2,
    question: 'Az y = −3x + 6 egyenes a koordinátatengelyekkel derékszögű háromszöget alkot. Mekkora a területe?',
    options: ['6', '12', '18', '3'],
    correctAnswer: 0,
    explanation: 'Tengelymetszetek: (2; 0) és (0; 6), a befogók 2 és 6 ⇒ T = 2 · 6/2 = 6. (12 a téglalap területe.)'
  },
  {
    id: 'svc-q16',
    questionTypeBadge: 'Vektor felbontása',
    figure: FIG_Q16,
    level: 2,
    question: 'Az ABCD négyzetben AB = b, AD = d. H a BC oldal B-hez közelebbi harmadolópontja. Hogyan írható fel az AH vektor?',
    options: ['b + d/3', 'b + 2d/3', 'b/3 + d', '(b + d)/3'],
    correctAnswer: 0,
    explanation: 'AH = AB + BH, és BH = BC/3 = AD/3 = d/3, így AH = b + d/3. (b + 2d/3 a C-hez közelebbi harmadolópontba mutat.)'
  },
  {
    id: 'svc-q17',
    questionTypeBadge: 'Igaz / hamis',
    level: 2,
    question: 'Melyik állítás HAMIS?',
    options: [
      'Ha egy pont egyenlő távol van a két tengelytől, akkor két koordinátája egyenlő.',
      'Két vektor összege lehet rövidebb mindkét vektornál.',
      'Ha két egyenes meredeksége egyenlő, akkor párhuzamosak.',
      'Egy vektor (−3)-szorosának hossza az eredeti hosszának 3-szorosa.'
    ],
    correctAnswer: 0,
    explanation: 'A (2; −2) pont mindkét tengelytől 2 egységre van, de a koordinátái különbözők (csak abszolút értékük egyenlő). A többi igaz, pl. a + (−0,9a) rövidebb mindkettőnél.'
  },
  {
    id: 'svc-q18',
    questionTypeBadge: 'Meredekség',
    level: 2,
    question: 'Mennyi a 9x − 9y = 9 egyenletű egyenes meredeksége?',
    options: ['1', '9', '−1', '−9'],
    correctAnswer: 0,
    explanation: 'Rendezve 9y = 9x − 9 ⇒ y = x − 1, tehát m = 1.'
  },
  {
    id: 'svc-q19',
    questionTypeBadge: 'Merőleges egyenesek',
    level: 2,
    question: 'Az e: y = 2x + 11 és az f: y = −0,5x + 3,5 egyenesek merőlegesek. Hol metszik egymást?',
    options: ['(−3; 5)', '(3; 17)', '(−5; 1)', '(−3; −5)'],
    correctAnswer: 0,
    explanation: '2 · (−0,5) = −1 ⇒ merőlegesek. 2x + 11 = −0,5x + 3,5 ⇒ 2,5x = −7,5 ⇒ x = −3, y = 5.'
  },
  {
    id: 'svc-q20',
    questionTypeBadge: 'Lineáris kombináció',
    level: 2,
    question: 'a(−3; 8) és b(7; −2). Mik a 3a − 2b vektor koordinátái?',
    options: ['(−23; 28)', '(5; 20)', '(−23; 20)', '(23; −28)'],
    correctAnswer: 0,
    explanation: '3a = (−9; 24), 2b = (14; −4), különbségük (−9 − 14; 24 + 4) = (−23; 28).'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'svc-q21',
    questionTypeBadge: 'Szög koordinátákból',
    figure: FIG_Q21,
    level: 3,
    question: 'Az ABC háromszög csúcsai A(−5; 3), B(−1; 0), C(4; 12). Mekkora a B csúcsnál lévő belső szög?',
    options: ['≈ 75,75°', '≈ 104,25°', '≈ 59,5°', '≈ 45°'],
    correctAnswer: 0,
    explanation: 'AB = 5, BC = 13, AC = 9√2. (9√2)² = 5² + 13² − 2 · 5 · 13 · cos β ⇒ cos β = 32/130 ≈ 0,2462 ⇒ β ≈ 75,75°. (104,25° a mellékszög.)'
  },
  {
    id: 'svc-q22',
    questionTypeBadge: 'Súlyvonal egyenlete',
    figure: FIG_Q21,
    level: 3,
    question: 'Az A(−5; 3), B(−1; 0), C(4; 12) háromszögben mi az A-ból induló súlyvonal egyenesének egyenlete?',
    options: ['y = 6/13 · x + 69/13', 'y = x + 8', 'y = 13/6 · x + 83/6', 'y = 6/13 · x + 3'],
    correctAnswer: 0,
    explanation: 'BC felezőpontja F(1,5; 6), AF(6,5; 3) ⇒ m = 6/13; 3 = 6/13 · (−5) + b ⇒ b = 69/13. (y = x + 8 az AC egyenes.)'
  },
  {
    id: 'svc-q23',
    questionTypeBadge: 'Thalész-kör',
    figure: FIG_Q23,
    level: 3,
    question: 'Az y = −3x + 6 egyenes és a tengelyek által alkotott derékszögű háromszög Thalész-körének mi az egyenlete?',
    options: ['(x − 1)² + (y − 3)² = 10', '(x − 1)² + (y − 3)² = 40', '(x − 2)² + (y − 6)² = 10', 'x² + y² = 10'],
    correctAnswer: 0,
    explanation: 'Az átfogó végpontjai P(2; 0), Q(0; 6): a középpont C(1; 3), r = PQ/2 = √40/2 = √10 ⇒ r² = 10. Az origó is rajta van: 1 + 9 = 10.'
  },
  {
    id: 'svc-q24',
    questionTypeBadge: 'Derékszög, köré írt kör',
    figure: FIG_Q24,
    level: 3,
    question: 'A(−17; 9), B(12; 11), C(7; −1). (C-nél derékszög van, mert CA · CB = 0.) Mekkora a háromszög és a köré írt kör területének aránya?',
    options: ['4/(5π) ≈ 0,255', '1/π ≈ 0,318', '2/(5π) ≈ 0,127', '1/2'],
    correctAnswer: 0,
    explanation: 'CA(−24; 10), CB(5; 12): |CA| = 26, |CB| = 13, T = 169. Az átfogó AB = √845 az átmérő (Thalész): T_kör = 845π/4. Arány: 169 · 4/(845π) = 4/(5π) ≈ 0,255.'
  },
  {
    id: 'svc-q25',
    questionTypeBadge: 'Thalész a folyóparton',
    figure: FIG_Q25,
    level: 3,
    question: 'Egy túra P(3; 2)-ből Q(11; 17)-be vezetett (1 egység = 1 km). Van-e a folyón (az x tengelyen) olyan X pont, ahonnan a PQ szakasz derékszögben látszik?',
    options: ['Nincs, mert x² − 14x + 67 = 0-nak nincs valós gyöke', 'Van, X(7; 0)', 'Van, X(3; 0) és X(11; 0)', 'Van, X(8,5; 0)'],
    correctAnswer: 0,
    explanation: 'XP · XQ = 0: (3 − x)(11 − x) + 2 · 17 = 0 ⇒ x² − 14x + 67 = 0, a diszkrimináns 196 − 268 < 0. A PQ átmérőjű Thalész-kör (középpont (7; 9,5), r = 8,5) nem éri el az x tengelyt.'
  },
  {
    id: 'svc-q26',
    questionTypeBadge: 'Merőleges irány',
    figure: FIG_Q25,
    level: 3,
    question: 'A túrázók Q(11; 17)-ből a PQ irányára merőlegesen, a folyó (x tengely) felé indulnak. Hány km-t tesznek meg a partig?',
    options: ['36,125 km', '17 km', '32 km', '19,25 km'],
    correctAnswer: 0,
    explanation: 'PQ(8; 15), merőleges irány (15; −8). Q + t(15; −8) az x tengelyen: 17 − 8t = 0 ⇒ t = 17/8. Az út t · |(15; −8)| = 17/8 · 17 = 289/8 = 36,125 km, a cél (42,875; 0).'
  },
  {
    id: 'svc-q27',
    questionTypeBadge: 'Mértani hely',
    level: 3,
    question: 'Az y = 2x + 11 és y = −0,5x + 3,5 merőleges egyenesek M(−3; 5)-ben metszik egymást. Azok a 6 egység oldalú négyzetek, amelyeknek két oldalegyenese ez a két egyenes és egy csúcsuk M: milyen körre illeszkednek a középpontjaik?',
    options: ['(x + 3)² + (y − 5)² = 18', '(x + 3)² + (y − 5)² = 36', '(x − 3)² + (y + 5)² = 18', '(x + 3)² + (y − 5)² = 9'],
    correctAnswer: 0,
    explanation: '4 ilyen négyzet van; középpontjuk M-től a fél átlónyira, 6√2/2 = 3√2 egységre van ⇒ r² = 18.'
  },
  {
    id: 'svc-q28',
    questionTypeBadge: 'Tükrözés felezőmerőlegesre',
    level: 3,
    question: 'Az ABC háromszögben A(−3; 5), az AB oldal felezőmerőlegesének egyenlete y = x/3 + 1. Mik a B csúcs koordinátái?',
    options: ['(0; −4)', '(−1,5; 0,5)', '(3; −13)', '(0; 4)'],
    correctAnswer: 0,
    explanation: 'AB ⊥ felezőmerőleges ⇒ m_AB = −3, AB: y = −3x − 4. Metszéspont a felezőmerőlegessel: F(−1,5; 0,5). B = 2F − A = (0; −4). ((−1,5; 0,5) maga a felezőpont.)'
  },
  {
    id: 'svc-q29',
    questionTypeBadge: 'Beírt kör',
    level: 3,
    question: 'Az ABCD négyzet két szemközti csúcsa A(−3; −2) és C(3; 2). Mi a négyzet beírható körének egyenlete?',
    options: ['x² + y² = 6,5', 'x² + y² = 13', 'x² + y² = 26', 'x² + y² = √26'],
    correctAnswer: 0,
    explanation: 'AC = √52, az oldal a = √52/√2 = √26. A középpont az origó, a beírt kör sugara a/2 ⇒ r² = 26/4 = 6,5. (x² + y² = 13 a köré írt kör.)'
  },
  {
    id: 'svc-q30',
    questionTypeBadge: 'Vektorok hossza',
    level: 3,
    question: 'a(5; 4), b(−1; 2), c(−6; −3). Melyik igaz?',
    options: ['|c − a| = √170 > |a + b| = √52', '|a + b| = √52 > |c − a| = √170', '|a + b| = |c − a|', '|c − a| = √26 > |a + b| = √20'],
    correctAnswer: 0,
    explanation: 'a + b = (4; 6), hossza √52 ≈ 7,21; c − a = (−11; −7), hossza √170 ≈ 13,04. Tehát c − a a hosszabb.'
  }
];

export const VectorsCoordinatesSummaryQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={12}
      chapterId="rendszerezo-osszefoglalas"
      topicId="g12-sum-vektorok-koordinatageometria-quiz"
      subtopicId="vektorok-koordinatageometria"
      title="9. Vektorok, koordinátageometria – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: vektorműveletek, távolság, felezőpont, egyenes és kör egyenlete, merőlegesség, metszéspont."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={VECTORS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Vektorok',
          items: [
            'a + b (a₁ + b₁; a₂ + b₂), a − b (a₁ − b₁; a₂ − b₂), c · a (ca₁; ca₂).',
            '|a| = √(a₁² + a₂²).',
            'AB = végpont − kezdőpont: (b₁ − a₁; b₂ − a₂).',
            'Merőleges vektorok: a₁b₁ + a₂b₂ = 0.'
          ]
        },
        {
          title: 'Pontok, egyenesek',
          items: [
            'AB = √((b₁ − a₁)² + (b₂ − a₂)²); F((a₁ + b₁)/2; (a₂ + b₂)/2).',
            'y = mx + b; ponton át: y₀ = m · x₀ + b-ből b.',
            'Párhuzamos: m₁ = m₂; merőleges: m₁ · m₂ = −1.',
            'Metszéspont: egyenletrendszer.'
          ]
        },
        {
          title: 'Kör',
          items: [
            '(x − u)² + (y − v)² = r², középpont C(u; v).',
            'Pont a körön: behelyettesítve egyenlőség.',
            'Thalész-kör: az átfogó felezőpontja a középpont.',
            'Előjel: (x + 5)² ⇒ u = −5.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <VectorsCoordinatesSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <VectorsCoordinatesSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default VectorsCoordinatesSummaryQuiz;
