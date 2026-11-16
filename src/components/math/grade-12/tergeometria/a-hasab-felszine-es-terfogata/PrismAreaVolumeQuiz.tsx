import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PrismAreaVolumeMatcher } from './PrismAreaVolumeMatcher';
import { PrismAreaVolumeSorter } from './PrismAreaVolumeSorter';
import {
  P2,
  KFig,
  KLine,
  KText,
  KPoly,
  KRight,
  KAngle,
  KSolidFig,
  kPrism,
  kRegular,
  kBoxVerts,
  K_BOX_FACES,
  kMid,
  K_RED,
  K_BLUE,
  K_PURPLE,
  K_EDGE
} from './figKit';

// ---------------------------------------------------------------------------
// Kérdésábrák (kavalier-vetület, takart élek szaggatottak, derékszög: negyedkörív ponttal)
// ---------------------------------------------------------------------------
const lbl = (P: P2[], i: number, j: number, t: string, dx: number, dy: number, c = K_BLUE) => (
  <KText p={[kMid(P[i], P[j])[0] + dx, kMid(P[i], P[j])[1] + dy]} t={t} s={10} c={c} />
);

const FIG_Q3 = (
  <KSolidFig
    verts={kBoxVerts(5, 3, 4)}
    faces={K_BOX_FACES}
    extra={(P) => (
      <>
        {lbl(P, 0, 1, '5 cm', 0, 11)}
        {lbl(P, 1, 2, '3 cm', 15, 6)}
        {lbl(P, 0, 4, '4 cm', -17, 0)}
      </>
    )}
  />
);

const triRight = kPrism([[0, 0], [4, 0], [0, 3]], 10);
const FIG_Q7 = (
  <KSolidFig
    verts={triRight.verts}
    faces={triRight.faces}
    shade={[1]}
    extra={(P) => (
      <>
        <KRight v={P[0]} p1={P[1]} p2={P[2]} r={8} />
        {lbl(P, 0, 1, '4 cm', 0, 11)}
        {lbl(P, 0, 2, '3 cm', -14, 4)}
        {lbl(P, 0, 3, '10 cm', -20, 0)}
      </>
    )}
  />
);

const obliqueFront = (deg: number, L: number, base: number, lblSide: string, lblM: string, lblAng?: string, title?: string) => {
  const r = (deg * Math.PI) / 180;
  const A: P2 = [36, 138];
  const B: P2 = [36 + base, 138];
  const D: P2 = [A[0] + L * Math.cos(r), A[1] - L * Math.sin(r)];
  const C: P2 = [B[0] + L * Math.cos(r), B[1] - L * Math.sin(r)];
  const F: P2 = [D[0], A[1]];
  return (
    <KFig title={title}>
      <KLine a={[14, 138]} b={[226, 138]} c="#94a3b8" w={1} />
      <KPoly p={[A, B, C, D]} fill="#e0e7ff" c={K_EDGE} w={1.8} op={0.7} />
      <KLine a={D} b={F} c={K_PURPLE} w={1.8} dash />
      <KRight v={F} p1={D} p2={B} r={9} />
      {lblAng && <KAngle v={A} p1={B} p2={D} t={lblAng} r={16} tr={30} />}
      <KText p={[kMid(A, D)[0] - 16, kMid(A, D)[1] - 4]} t={lblSide} s={10.5} c={K_EDGE} />
      <KText p={[D[0] + 18, kMid(D, F)[1]]} t={lblM} s={10.5} c={K_PURPLE} />
    </KFig>
  );
};

const FIG_Q8 = obliqueFront(45, 100, 80, '7 cm', '5 cm', undefined, 'T(alap) = 12 cm²');
const FIG_Q28 = obliqueFront(30, 150, 50, '10 cm', 'M', '30°', 'T(alap) = 20 cm²');

const OCTA: [number, number][] = [[1, 0], [2, 0], [3, 1], [3, 2], [2, 3], [1, 3], [0, 2], [0, 1]];
const octP = kPrism(OCTA, 3);
const FIG_Q12 = (
  <KSolidFig
    verts={octP.verts}
    faces={octP.faces}
    shade={[1]}
    extra={(P) => (
      <>
        {lbl(P, 0, 1, '1', 0, 10)}
        {lbl(P, 1, 2, '√2', 14, 4, K_RED)}
        {lbl(P, 7, 15, '3', -10, 0)}
      </>
    )}
  />
);

const hexP = kPrism(kRegular(6, 2, 0, 2, 2), 5);
const FIG_Q14 = (
  <KSolidFig
    verts={hexP.verts}
    faces={hexP.faces}
    shade={[1]}
    extra={(P) => (
      <>
        {lbl(P, 3, 4, '2 cm', -10, 10)}
        <KText p={[P[3][0] - 8, (P[3][1] + P[9][1]) / 2]} t="5 cm" s={10} c={K_BLUE} a="end" />
      </>
    )}
  />
);

const FIG_Q15 = (() => {
  const k = 60;
  const A: P2 = [30, 60];
  const B: P2 = [30 + 3 * k, 60];
  const C: P2 = [30 + 2.5 * k, 60 + 0.375 * k];
  const D: P2 = [30 + 0.5 * k, 60 + 0.375 * k];
  const F: P2 = [D[0], 60];
  return (
    <KFig>
      <KPoly p={[A, B, C, D]} fill="#bae6fd" c={K_EDGE} w={2} />
      <KLine a={D} b={F} c={K_PURPLE} w={1.6} dash />
      <KRight v={F} p1={D} p2={B} r={8} />
      <KText p={[120, 48]} t="3 m" s={10.5} c={K_BLUE} />
      <KText p={[120, 96]} t="2 m" s={10.5} c={K_BLUE} />
      <KText p={[kMid(B, C)[0] + 28, kMid(B, C)[1] + 4]} t="62,5 cm" s={10} c={K_BLUE} />
      <KText p={[D[0] + 12, 70]} t="?" s={11} />
    </KFig>
  );
})();

const FIG_Q18 = (() => {
  const c: P2 = [92, 82];
  const A: P2 = [c[0] - 60, c[1]];
  const B: P2 = [c[0], c[1] + 45];
  const C: P2 = [c[0] + 60, c[1]];
  const D: P2 = [c[0], c[1] - 45];
  return (
    <KFig>
      <KPoly p={[A, B, C, D]} fill="#e0e7ff" c={K_EDGE} w={2} />
      <KLine a={A} b={C} c={K_RED} w={1.4} dash />
      <KLine a={B} b={D} c={K_RED} w={1.4} dash />
      <KRight v={c} p1={C} p2={D} r={8} />
      <KText p={[c[0] + 30, c[1] + 9]} t="8" s={10} c={K_RED} />
      <KText p={[c[0] - 8, c[1] - 24]} t="6" s={10} c={K_RED} />
      <text x="165" y="70" fontSize="10.5" fontWeight="bold" fill="#334155">alaplap:</text>
      <text x="165" y="86" fontSize="10.5" fontWeight="bold" fill="#334155">rombusz</text>
      <text x="165" y="110" fontSize="10.5" fontWeight="bold" fill={K_PURPLE}>M = 10 cm</text>
    </KFig>
  );
})();

const triReg = (a: number, M: number, la: string, lm: string) => {
  const p = kPrism(kRegular(3, a / Math.sqrt(3), -Math.PI / 2, 0, 0), M);
  return (
    <KSolidFig
      verts={p.verts}
      faces={p.faces}
      shade={[1]}
      pad={40}
      extra={(P) => (
        <>
          {lbl(P, 0, 1, la, 14, 8)}
          <KText p={[P[0][0] - 8, (P[0][1] + P[3][1]) / 2]} t={lm} s={10} c={K_BLUE} a="end" />
        </>
      )}
    />
  );
};
const FIG_Q21 = triReg(8, 2, '8 cm', 'M = ?');
const FIG_Q30 = triReg(6, 10, '6 cm', '10 cm');

const FIG_Q25 = (() => {
  // dobogó elölnézetben (cm), 1 cm = 1,2 px
  const k = 1.2;
  const y0 = 140;
  const blocks = [
    { x: 30, w: 45, h: 40, t: '45 × 45 × 40' },
    { x: 30 + 45 * k, w: 50, h: 60, t: '50 × 50 × 60' },
    { x: 30 + 95 * k, w: 40, h: 35, t: '40 × 40 × 35' }
  ];
  return (
    <KFig>
      {blocks.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={y0 - b.h * k} width={b.w * k} height={b.h * k} fill={['#e2e8f0', '#fde68a', '#fed7aa'][i]} stroke={K_EDGE} strokeWidth="1.6" />
          <text x={b.x + (b.w * k) / 2} y={y0 - b.h * k + 14} fontSize="12" fontWeight="bold" textAnchor="middle" fill="#334155">
            {['2', '1', '3'][i]}
          </text>
          <text x={b.x + (b.w * k) / 2} y={y0 + 12} fontSize="8.5" textAnchor="middle" fill={K_BLUE}>
            {b.t}
          </text>
        </g>
      ))}
    </KFig>
  );
})();

const FIG_Q26 = (() => {
  const k = 0.8;
  const ox = 40;
  const oy = 22;
  const W = 60 * k;
  const H = 140 * k;
  const tf = 10 * k;
  const tw = 7 * k;
  const cx = ox + W / 2;
  const pts: P2[] = [
    [ox, oy], [ox + W, oy], [ox + W, oy + tf], [cx + tw / 2, oy + tf], [cx + tw / 2, oy + H - tf], [ox + W, oy + H - tf],
    [ox + W, oy + H], [ox, oy + H], [ox, oy + H - tf], [cx - tw / 2, oy + H - tf], [cx - tw / 2, oy + tf], [ox, oy + tf]
  ];
  return (
    <KFig>
      <KPoly p={pts} fill="#cbd5e1" c={K_EDGE} w={1.6} />
      <KText p={[cx, oy - 8]} t="60" s={9.5} c={K_BLUE} />
      <KText p={[ox - 14, oy + H / 2]} t="140" s={9.5} c={K_BLUE} />
      <KText p={[ox + W + 11, oy + tf / 2]} t="10" s={9.5} c={K_BLUE} />
      <KText p={[cx + 12, oy + H / 2]} t="7" s={9.5} c={K_BLUE} />
      <text x="120" y="60" fontSize="10.5" fill="#334155">méretek mm-ben</text>
      <text x="120" y="80" fontSize="10.5" fill="#334155">hossz: 6 m</text>
      <text x="120" y="100" fontSize="10.5" fill="#334155">tömeg: 96 kg</text>
    </KFig>
  );
})();

const PRISM_AV_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'pav-q1',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Hogyan számítjuk ki bármely (egyenes vagy ferde) hasáb térfogatát?',
    options: ['V = T_alaplap · M', 'V = T_alaplap · oldalél', 'V = K_alaplap · M', 'V = 2 · T_alaplap + K_alaplap · M'],
    correctAnswer: 0,
    explanation: 'A hasáb térfogata az alaplap területének és a testmagasságnak a szorzata – egyenes és ferde hasábnál egyaránt.'
  },
  {
    id: 'pav-q2',
    questionTypeBadge: 'Kocka',
    level: 1,
    question: 'Mekkora a 4 cm élű kocka térfogata?',
    options: ['64 cm³', '16 cm³', '96 cm³', '48 cm³'],
    correctAnswer: 0,
    explanation: 'V = a³ = 4³ = 64 cm³. (A 96 a felszín: 6 · 16 cm².)'
  },
  {
    id: 'pav-q3',
    questionTypeBadge: 'Téglatest',
    figure: FIG_Q3,
    level: 1,
    question: 'Mekkora az 5 cm, 3 cm és 4 cm élű téglatest térfogata?',
    options: ['60 cm³', '94 cm³', '12 cm³', '47 cm³'],
    correctAnswer: 0,
    explanation: 'V = abc = 5 · 3 · 4 = 60 cm³. (94 cm² a felszíne lenne.)'
  },
  {
    id: 'pav-q4',
    questionTypeBadge: 'Kocka felszíne',
    level: 1,
    question: 'Mekkora a 3 cm élű kocka felszíne?',
    options: ['54 cm²', '27 cm²', '36 cm²', '18 cm²'],
    correctAnswer: 0,
    explanation: 'A kockát 6 egybevágó négyzet határolja: A = 6a² = 6 · 9 = 54 cm².'
  },
  {
    id: 'pav-q5',
    questionTypeBadge: 'Téglatest felszíne',
    level: 1,
    question: 'Mekkora a 2 cm, 3 cm és 4 cm élű téglatest felszíne?',
    options: ['52 cm²', '24 cm²', '26 cm²', '48 cm²'],
    correctAnswer: 0,
    explanation: 'A = 2(ab + bc + ca) = 2(6 + 12 + 8) = 52 cm². (24 a térfogat, 26 csak a fele.)'
  },
  {
    id: 'pav-q6',
    questionTypeBadge: 'Palást',
    level: 1,
    question: 'Egy egyenes hasáb alaplapjának kerülete 20 cm, magassága 6 cm. Mekkora a palást területe?',
    options: ['120 cm²', '26 cm²', '60 cm²', '240 cm²'],
    correctAnswer: 0,
    explanation: 'A palást kiterítve egy K × M-es téglalap: T_palást = 20 · 6 = 120 cm².'
  },
  {
    id: 'pav-q7',
    questionTypeBadge: 'Háromszög alapú hasáb',
    figure: FIG_Q7,
    level: 1,
    question: 'Egy egyenes hasáb alaplapja 3 cm és 4 cm befogójú derékszögű háromszög, magassága 10 cm. Mekkora a térfogata?',
    options: ['60 cm³', '120 cm³', '70 cm³', '30 cm³'],
    correctAnswer: 0,
    explanation: 'T = 3 · 4 / 2 = 6 cm², V = 6 · 10 = 60 cm³. (120 akkor jönne ki, ha elfelejtenénk 2-vel osztani.)'
  },
  {
    id: 'pav-q8',
    questionTypeBadge: 'Ferde hasáb',
    figure: FIG_Q8,
    level: 1,
    question: 'Egy ferde hasáb alapterülete 12 cm², magassága 5 cm, oldaléle 7 cm. Mekkora a térfogata?',
    options: ['60 cm³', '84 cm³', '35 cm³', '144 cm³'],
    correctAnswer: 0,
    explanation: 'V = T · M = 12 · 5 = 60 cm³ – a magassággal kell szorozni, nem az oldaléllel.'
  },
  {
    id: 'pav-q9',
    questionTypeBadge: 'Mértékegység',
    level: 1,
    question: 'Hány liter víz fér egy 2 m³ térfogatú tartályba?',
    options: ['2000 liter', '200 liter', '20 liter', '20 000 liter'],
    correctAnswer: 0,
    explanation: '1 m³ = 1000 dm³ = 1000 liter, így 2 m³ = 2000 liter.'
  },
  {
    id: 'pav-q10',
    questionTypeBadge: 'Négyzetes oszlop',
    level: 1,
    question: 'Mekkora az 5 cm alapélű, 8 cm magas négyzetes oszlop térfogata?',
    options: ['200 cm³', '40 cm³', '160 cm³', '210 cm³'],
    correctAnswer: 0,
    explanation: 'V = a² · M = 25 · 8 = 200 cm³. (210 cm² a felszíne: 2 · 25 + 4 · 5 · 8.)'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'pav-q11',
    questionTypeBadge: 'Kalapácsfej',
    level: 2,
    question: 'A kalapácsfej 82,5 cm³-es hasáb, amelynek 23%-át a nyél foglalja el. Mekkora a vasból (7,87 g/cm³) készült fej tömege?',
    options: ['≈ 500 g', '≈ 649 g', '≈ 149 g', '≈ 63,5 g'],
    correctAnswer: 0,
    explanation: 'A vas térfogata 82,5 · 0,77 ≈ 63,53 cm³, a tömeg 63,53 · 7,87 ≈ 500 g. (649 g a teljes hasábé lenne, 63,5 a térfogat.)'
  },
  {
    id: 'pav-q12',
    questionTypeBadge: 'Nyolcszög alapú hasáb',
    figure: FIG_Q12,
    level: 2,
    question: 'A 3 × 3-as négyzetből 1 × 1-es sarkok levágásával kapott nyolcszög alapú egyenes hasáb magassága 3. Mekkora a térfogata?',
    options: ['21', '27', '18', '24'],
    correctAnswer: 0,
    explanation: 'T = 9 − 4 · ½ = 7, V = 7 · 3 = 21 térfogategység. (27 a levágás előtti kockáé; 18 akkor jönne, ha teljes négyzeteket vágnánk le.)'
  },
  {
    id: 'pav-q13',
    questionTypeBadge: 'Nyolcszög alapú hasáb',
    figure: FIG_Q12,
    level: 2,
    question: 'Mekkora ugyanennek a nyolcszög alapú hasábnak a felszíne?',
    options: ['26 + 12√2 ≈ 42,97', '54', '14 + 12√2 ≈ 30,97', '26 + 6√2 ≈ 34,49'],
    correctAnswer: 0,
    explanation: 'A = 2 · 7 + K · M = 14 + (4 + 4√2) · 3 = 26 + 12√2 ≈ 42,97 területegység.'
  },
  {
    id: 'pav-q14',
    questionTypeBadge: 'Hatszög alapú hasáb',
    figure: FIG_Q14,
    level: 2,
    question: 'Mekkora a 2 cm alapélű, 5 cm magas szabályos hatszög alapú egyenes hasáb térfogata?',
    options: ['30√3 ≈ 51,96 cm³', '60 cm³', '15√3 ≈ 25,98 cm³', '10√3 ≈ 17,32 cm³'],
    correctAnswer: 0,
    explanation: 'A hatszög 6 szabályos háromszögből áll: T = 6 · (√3/4) · 2² = 6√3 cm², V = 6√3 · 5 = 30√3 ≈ 51,96 cm³.'
  },
  {
    id: 'pav-q15',
    questionTypeBadge: 'Vízelvezető',
    figure: FIG_Q15,
    level: 2,
    question: 'Egy árok keresztmetszete egyenlő szárú trapéz: alapjai 3 m és 2 m, szárai 62,5 cm. Milyen mély az árok?',
    options: ['37,5 cm', '50 cm', '62,5 cm', '≈ 80 cm'],
    correctAnswer: 0,
    explanation: 'A szár vízszintes vetülete (3 − 2)/2 = 0,5 m, így m = √(0,625² − 0,5²) = √0,140625 = 0,375 m = 37,5 cm.'
  },
  {
    id: 'pav-q16',
    questionTypeBadge: 'Vízelvezető',
    level: 2,
    question: 'Hány liter víz fér az előző árok (3 m és 2 m alapú, 37,5 cm mély trapéz) 120 m hosszú egyenes szakaszába?',
    options: ['112 500 liter', '112,5 liter', '225 000 liter', '135 000 liter'],
    correctAnswer: 0,
    explanation: 'T = (3 + 2)/2 · 0,375 = 0,9375 m², V = 0,9375 · 120 = 112,5 m³ = 112 500 liter.'
  },
  {
    id: 'pav-q17',
    questionTypeBadge: 'Kocka',
    level: 2,
    question: 'Egy kocka felszíne 150 cm². Mekkora a térfogata?',
    options: ['125 cm³', '25 cm³', '150 cm³', '625 cm³'],
    correctAnswer: 0,
    explanation: '6a² = 150 ⇒ a² = 25 ⇒ a = 5 cm, V = 5³ = 125 cm³.'
  },
  {
    id: 'pav-q18',
    questionTypeBadge: 'Rombusz alapú hasáb',
    figure: FIG_Q18,
    level: 2,
    question: 'Egy egyenes hasáb alaplapja 6 cm és 8 cm átlójú rombusz, magassága 10 cm. Mekkora a felszíne?',
    options: ['248 cm²', '240 cm²', '296 cm²', '224 cm²'],
    correctAnswer: 0,
    explanation: 'T = 6 · 8 / 2 = 24 cm²; a rombusz oldala √(3² + 4²) = 5 cm, K = 20 cm. A = 2 · 24 + 20 · 10 = 248 cm². (240 cm³ a térfogata.)'
  },
  {
    id: 'pav-q19',
    questionTypeBadge: 'Téglatest',
    level: 2,
    question: 'Egy téglatest egyik lapjának területe 192 cm², oldalainak különbsége 4 cm; a harmadik él a két él számtani közepe. Mekkora a térfogata?',
    options: ['2688 cm³', '2304 cm³', '3072 cm³', '2016 cm³'],
    correctAnswer: 0,
    explanation: 'x(x + 4) = 192 ⇒ x = 12: az élek 12, 16 és (12 + 16)/2 = 14 cm. V = 12 · 16 · 14 = 2688 cm³.'
  },
  {
    id: 'pav-q20',
    questionTypeBadge: 'Térfogatváltozás',
    level: 2,
    question: 'A 12 cm, 16 cm, 14 cm élű téglatest minden élét 2 cm-rel megnöveljük. Hányszorosára változik a térfogat?',
    options: ['1,5-szeresére', '2-szeresére', '≈ 1,14-szeresére', '8-szorosára'],
    correctAnswer: 0,
    explanation: 'Az új térfogat 14 · 18 · 16 = 4032 cm³, és 4032 / 2688 = 1,5.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'pav-q21',
    questionTypeBadge: 'Palást és alaplap',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy szabályos háromszög alapú egyenes hasáb palástjának területe az alaplap területének √3-szorosa, alapéle 8 cm. Mekkora a térfogata?',
    options: ['32√3 ≈ 55,43 cm³', '512√3 ≈ 886,8 cm³', '16√3 ≈ 27,71 cm³', '128 cm³'],
    correctAnswer: 0,
    explanation: '3aM = √3 · (√3/4)a² ⇒ M = a/4 = 2 cm. T = (√3/4) · 64 = 16√3 cm², V = 16√3 · 2 = 32√3 ≈ 55,43 cm³.',
    breakdown: ['T_palást = 3 · a · M', 'T_alap = (√3/4) · a²', '3aM = (3/4)a² ⇒ M = a/4 = 2 cm', 'V = 16√3 · 2 ≈ 55,43 cm³']
  },
  {
    id: 'pav-q22',
    questionTypeBadge: 'Nagyítás',
    level: 3,
    question: 'Egy hasábot 3-szorosára nagyítunk. Hogyan változik a felszíne és a térfogata?',
    options: ['A 9-szeres, V 27-szeres', 'A 3-szoros, V 9-szeres', 'A 9-szeres, V 9-szeres', 'A 6-szoros, V 27-szeres'],
    correctAnswer: 0,
    explanation: 'Hasonló testeknél a felszínek aránya a hasonlóság arányának négyzete (3² = 9), a térfogatoké a köbe (3³ = 27).'
  },
  {
    id: 'pav-q23',
    questionTypeBadge: 'Szökőkút',
    level: 3,
    question: 'Egy szabályos hatszög alapú medence magassága fele az alapélének, és 2240 liter víz fér bele. Mekkora az alapéle?',
    options: ['≈ 1,2 m', '≈ 1,44 m', '≈ 0,6 m', '≈ 1,04 m'],
    correctAnswer: 0,
    explanation: 'V = (3√3/2)a² · (a/2) = (3√3/4)a³ = 2,24 m³ ⇒ a³ ≈ 1,724 ⇒ a ≈ 1,2 m.',
    breakdown: ['T = 6 · (√3/4)a² = (3√3/2)a²', 'V = (3√3/4) · a³ = 2,24', 'a³ = 2,24 · 4 / (3√3) ≈ 1,724', 'a ≈ 1,2 m']
  },
  {
    id: 'pav-q24',
    questionTypeBadge: 'Szökőkút',
    level: 3,
    question: 'A ≈ 1,2 m alapélű szabályos hatszög alakú medence közepén lévő locsolófej legfeljebb mekkora hatósugarú lehet, hogy a víz a medencébe hulljon vissza?',
    options: ['≈ 1,04 m', '1,2 m', '0,6 m', '≈ 2,08 m'],
    correctAnswer: 0,
    explanation: 'A hatósugár legfeljebb a hatszög beírt körének sugara (a középpont és az oldal távolsága): a · √3/2 ≈ 1,2 · 0,866 ≈ 1,04 m.'
  },
  {
    id: 'pav-q25',
    questionTypeBadge: 'Dobogó',
    figure: FIG_Q25,
    level: 3,
    question: 'Egy dobogót három négyzetes oszlopból (50 × 50 × 60, 45 × 45 × 40, 40 × 40 × 35 cm) illesztenek össze oldallapjaik mentén. Mekkora a felszíne az alsó lapok nélkül?',
    options: ['24 525 cm²', '30 925 cm²', '27 725 cm²', '21 325 cm²'],
    correctAnswer: 0,
    explanation: 'A három oszlop felszíne alaplap nélkül: 14 500 + 9225 + 7200 = 30 925 cm². Az érintkező részek mindkét oszlopról eltűnnek: 2 · (45 · 40 + 40 · 35) = 6400 cm². A = 30 925 − 6400 = 24 525 cm².'
  },
  {
    id: 'pav-q26',
    questionTypeBadge: 'Sűrűség',
    figure: FIG_Q26,
    level: 3,
    question: 'Egy 6 m hosszú, 96 kg-os tömör I-tartó keresztmetszete 140 mm magas, az övek 60 mm szélesek és 10 mm vastagok, a gerinc 7 mm vastag. Mekkora az anyag sűrűsége?',
    options: ['≈ 7,84 g/cm³', '≈ 7,84 kg/cm³', '≈ 1,14 g/cm³', '≈ 9,52 g/cm³'],
    correctAnswer: 0,
    explanation: 'T = 2 · 60 · 10 + 120 · 7 = 2040 mm² = 20,4 cm², V = 20,4 · 600 = 12 240 cm³, ρ = 96 000 g / 12 240 cm³ ≈ 7,84 g/cm³ (acél).'
  },
  {
    id: 'pav-q27',
    questionTypeBadge: 'Felszín',
    figure: FIG_Q26,
    level: 3,
    question: 'Mekkora ugyanennek a 6 m-es I-tartónak a felszíne? (A keresztmetszet kerülete 506 mm, területe 20,4 cm².)',
    options: ['≈ 30 401 cm²', '≈ 30 360 cm²', '≈ 12 240 cm²', '≈ 3040 cm²'],
    correctAnswer: 0,
    explanation: 'A = 2 · T + K · M = 2 · 20,4 + 50,6 · 600 = 40,8 + 30 360 ≈ 30 401 cm². (30 360 cm² csak a palást.)'
  },
  {
    id: 'pav-q28',
    questionTypeBadge: 'Ferde hasáb',
    figure: FIG_Q28,
    level: 3,
    question: 'Egy ferde hasáb alapterülete 20 cm², oldaléle 10 cm, és az oldalél 30°-os szöget zár be az alaplap síkjával. Mekkora a térfogata?',
    options: ['100 cm³', '200 cm³', '≈ 173,2 cm³', '50 cm³'],
    correctAnswer: 0,
    explanation: 'M = 10 · sin 30° = 5 cm, V = 20 · 5 = 100 cm³. (200 cm³ az oldaléllel számolt hibás érték.)'
  },
  {
    id: 'pav-q29',
    questionTypeBadge: 'Térfogatváltozás',
    level: 3,
    question: 'Egy téglatest mindhárom élét 2-szeresére növeljük. Hányszorosára nő a térfogata és a felszíne?',
    options: ['V 8-szorosára, A 4-szeresére', 'V 2-szeresére, A 2-szeresére', 'V 6-szorosára, A 4-szeresére', 'V 8-szorosára, A 8-szorosára'],
    correctAnswer: 0,
    explanation: 'V′ = 2a · 2b · 2c = 8abc, A′ = 2(4ab + 4bc + 4ca) = 4A.'
  },
  {
    id: 'pav-q30',
    questionTypeBadge: 'Háromszög alapú hasáb',
    figure: FIG_Q30,
    level: 3,
    question: 'Mekkora a 6 cm alapélű, 10 cm magas szabályos háromszög alapú egyenes hasáb felszíne?',
    options: ['180 + 18√3 ≈ 211,18 cm²', '180 + 9√3 ≈ 195,59 cm²', '90√3 ≈ 155,88 cm²', '180 + 36√3 ≈ 242,35 cm²'],
    correctAnswer: 0,
    explanation: 'T = (√3/4) · 36 = 9√3 cm², T_palást = 3 · 6 · 10 = 180 cm². A = 2 · 9√3 + 180 = 180 + 18√3 ≈ 211,18 cm².'
  }
];

export const PrismAreaVolumeQuiz: React.FC<{
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
      topicId="g12-ter-hasab-felszin-terfogat-quiz"
      subtopicId="a-hasab-felszine-es-terfogata"
      title="3. A hasáb felszíne és térfogata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: felszín, térfogat, palást, mértékegységek, gyakorlati feladatok."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={PRISM_AV_QUESTIONS}
      cheatSheets={[
        {
          title: 'Képletek',
          items: [
            'Egyenes hasáb: A = 2 · T_alaplap + K_alaplap · M',
            'Minden hasáb: V = T_alaplap · M',
            'Kocka: A = 6a², V = a³',
            'Téglatest: A = 2(ab + bc + ca), V = abc'
          ]
        },
        {
          title: 'Alapterületek',
          items: [
            'Derékszögű háromszög: a · b / 2; szabályos háromszög: (√3/4) · a²',
            'Szabályos hatszög: 6 · (√3/4) · a²',
            'Trapéz: (a + c)/2 · m; rombusz: e · f / 2',
            'Ferde hasáb: M = oldalél · sin(hajlásszög)'
          ]
        },
        {
          title: 'Mértékegységek, nagyítás',
          items: [
            '1 dm³ = 1 liter; 1 m³ = 1000 liter; 1 cm³ = 1 ml',
            '1 m² = 10 000 cm²',
            'Tömeg = térfogat · sűrűség',
            'λ-szoros nagyítás: A · λ², V · λ³'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <PrismAreaVolumeMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <PrismAreaVolumeSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default PrismAreaVolumeQuiz;
