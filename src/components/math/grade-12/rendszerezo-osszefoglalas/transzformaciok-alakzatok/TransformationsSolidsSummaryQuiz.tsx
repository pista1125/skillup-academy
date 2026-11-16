import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TransformationsSolidsSummaryMatcher } from './TransformationsSolidsSummaryMatcher';
import { TransformationsSolidsSummarySorter } from './TransformationsSolidsSummarySorter';
import { S_BLUE, S_RED, S_INK, S_GREEN, S_PURPLE, S_AMBER, Pt, RightAt, arcPath, lerp } from './sumKit';

const QFIG = 'w-full max-w-[280px] h-auto mx-auto';
const Box: React.FC<{ h?: number; children: React.ReactNode }> = ({ h = 160, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);
const T: React.FC<{ x: number; y: number; c?: string; a?: 'start' | 'middle' | 'end'; children: React.ReactNode }> = ({ x, y, c = S_INK, a = 'start', children }) => (
  <text x={x} y={y} fontSize="11" fontWeight="bold" fill={c} textAnchor={a}>
    {children}
  </text>
);

const FIG_Q3 = (() => {
  const C: Pt = [50, 130];
  const A: Pt = [50 + 8 * 18, 130];
  const B: Pt = [50, 130 - 6 * 18];
  return (
    <Box>
      <polygon points={`${A} ${B} ${C}`} fill="#dbeafe" stroke={S_INK} strokeWidth="1.8" />
      <RightAt V={C} P={A} Q={B} r={12} />
      <T x={120} y={146} a="middle">8 cm</T>
      <T x={22} y={80}>6 cm</T>
      <T x={128} y={70} c={S_RED}>c = ?</T>
    </Box>
  );
})();

const FIG_Q11 = (() => {
  const O: Pt = [120, 82];
  const R = 62;
  const t0 = (200 * Math.PI) / 180;
  const P: Pt = [O[0] + R * Math.cos(t0), O[1] + R * Math.sin(t0)];
  // két merőleges húr P-ből: végpontjaik egy átmérő két végpontja
  const phi = Math.atan2(7, 5);
  const t1 = t0 + Math.PI - 2 * phi; // így PX : PY = 5 : 7
  const X: Pt = [O[0] + R * Math.cos(t1), O[1] + R * Math.sin(t1)];
  const Y: Pt = [2 * O[0] - X[0], 2 * O[1] - X[1]];
  return (
    <Box>
      <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={S_INK} strokeWidth="1.6" />
      <line x1={P[0]} y1={P[1]} x2={X[0]} y2={X[1]} stroke={S_BLUE} strokeWidth="2" />
      <line x1={P[0]} y1={P[1]} x2={Y[0]} y2={Y[1]} stroke={S_GREEN} strokeWidth="2" />
      <line x1={X[0]} y1={X[1]} x2={Y[0]} y2={Y[1]} stroke={S_RED} strokeDasharray="4 3" />
      <RightAt V={P} P={X} Q={Y} r={11} />
      <circle cx={O[0]} cy={O[1]} r="2.5" fill={S_INK} />
      <T x={(P[0] + X[0]) / 2 - 22} y={(P[1] + X[1]) / 2} c={S_BLUE}>5</T>
      <T x={(P[0] + Y[0]) / 2} y={(P[1] + Y[1]) / 2 + 14} c={S_GREEN}>7</T>
      <T x={O[0] + 6} y={O[1] - 4} c={S_RED}>r = ?</T>
    </Box>
  );
})();

const FIG_Q12 = (
  <Box>
    <rect x="30" y="40" width="180" height="84" fill="#eef2ff" stroke={S_INK} strokeWidth="1.8" />
    <line x1="30" y1="124" x2="210" y2="40" stroke={S_BLUE} strokeWidth="1.6" />
    <path d={arcPath([30, 124], [210, 124], [210, 40], 34)} fill="none" stroke={S_RED} strokeWidth="1.6" />
    <RightAt V={[210, 124]} P={[30, 124]} Q={[210, 40]} r={11} />
    <T x={70} y={118} c={S_RED}>24,7°</T>
    <T x={120} y={142} a="middle">AB = 26</T>
    <T x={216} y={86} c={S_RED}>?</T>
    <T x={18} y={138}>A</T>
    <T x={214} y={138}>B</T>
    <T x={214} y={36}>C</T>
    <T x={18} y={36}>D</T>
  </Box>
);

const FIG_Q15 = (() => {
  const M: Pt = [120, 82];
  const u: Pt = [Math.cos(0), Math.sin(0)];
  const v: Pt = [Math.cos((-60 * Math.PI) / 180), Math.sin((-60 * Math.PI) / 180)];
  const s = 7.5;
  const A: Pt = [M[0] - 8 * s * u[0], M[1] - 8 * s * u[1]];
  const C: Pt = [M[0] + 8 * s * u[0], M[1] + 8 * s * u[1]];
  const B: Pt = [M[0] - 5 * s * v[0], M[1] - 5 * s * v[1]];
  const D: Pt = [M[0] + 5 * s * v[0], M[1] + 5 * s * v[1]];
  return (
    <Box>
      <polygon points={`${A} ${B} ${C} ${D}`} fill="#dcfce7" stroke={S_INK} strokeWidth="1.8" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={S_BLUE} strokeDasharray="4 3" />
      <line x1={B[0]} y1={B[1]} x2={D[0]} y2={D[1]} stroke={S_PURPLE} strokeDasharray="4 3" />
      <path d={arcPath(M, C, D, 14)} fill="none" stroke={S_RED} strokeWidth="1.6" />
      <T x={M[0] + 16} y={M[1] - 6} c={S_RED}>60°</T>
      <T x={60} y={78} c={S_BLUE}>16 cm</T>
      <T x={92} y={124} c={S_PURPLE}>10 cm</T>
      <T x={(C[0] + D[0]) / 2 + 6} y={(C[1] + D[1]) / 2 - 2} c={S_RED}>?</T>
    </Box>
  );
})();

const FIG_Q17 = (
  <Box>
    <circle cx="120" cy="82" r="66" fill="#eff6ff" stroke={S_INK} strokeWidth="1.6" />
    <ellipse cx="120" cy="49" rx="57" ry="11" fill="#bfdbfe" fillOpacity="0.7" stroke={S_BLUE} strokeWidth="1.4" />
    <line x1="120" y1="82" x2="120" y2="49" stroke={S_RED} strokeWidth="1.6" />
    <line x1="120" y1="82" x2="177" y2="49" stroke={S_INK} strokeWidth="1.2" />
    <line x1="120" y1="49" x2="177" y2="49" stroke={S_GREEN} strokeWidth="1.6" />
    <RightAt V={[120, 49]} P={[177, 49]} Q={[120, 82]} r={8} />
    <circle cx="120" cy="82" r="2.5" fill={S_INK} />
    <T x={100} y={70} c={S_RED}>5</T>
    <T x={152} y={76}>10</T>
    <T x={140} y={44} c={S_GREEN}>ϱ</T>
    <T x={120} y={156} a="middle" c={S_BLUE}>metszet területe = ?</T>
  </Box>
);

const FIG_Q21 = (() => {
  const O: Pt = [120, 110];
  const R = 80;
  const yE = 60;
  const half = Math.sqrt(R * R - (O[1] - yE) ** 2);
  return (
    <Box>
      <path d={`M ${O[0] - half} ${yE} A ${R} ${R} 0 0 1 ${O[0] + half} ${yE}`} fill="none" stroke={S_BLUE} strokeWidth="3" />
      <line x1={O[0] - half - 14} y1={yE} x2={O[0] + half + 14} y2={yE} stroke={S_INK} strokeWidth="2.2" />
      <line x1={O[0]} y1={O[1] - R} x2={O[0]} y2={O[1]} stroke={S_INK} strokeDasharray="4 3" />
      <line x1={O[0]} y1={O[1]} x2={O[0] + half} y2={yE} stroke={S_RED} strokeWidth="1.4" />
      <RightAt V={[O[0], yE]} P={[O[0] + half, yE]} Q={[O[0], O[1]]} r={8} />
      <circle cx={O[0]} cy={O[1]} r="2.5" fill={S_INK} />
      <T x={70} y={76} a="middle">375 m</T>
      <T x={170} y={52} a="middle">375 m</T>
      <T x={124} y={46} c={S_AMBER}>120 m</T>
      <T x={154} y={98} c={S_RED}>r = ?</T>
      <T x={120} y={150} a="middle">híd hossza 750 m</T>
    </Box>
  );
})();

const FIG_Q22 = (() => {
  const s = 26;
  const Q: Pt = [37, 135];
  const R: Pt = [37 + 6.4 * s, 135];
  const x = (4.4 ** 2 - 5.3 ** 2 + 6.4 ** 2) / (2 * 6.4);
  const y = Math.sqrt(4.4 ** 2 - x * x);
  const P: Pt = [Q[0] + x * s, Q[1] - y * s];
  return (
    <Box>
      <polygon points={`${P} ${Q} ${R}`} fill="#eef2ff" stroke={S_INK} strokeWidth="1.8" />
      <path d={arcPath(P, Q, R, 16)} fill="none" stroke={S_RED} strokeWidth="1.6" />
      <T x={P[0] - 4} y={P[1] + 30} c={S_RED}>β</T>
      <T x={P[0] - 4} y={P[1] - 6}>P</T>
      <T x={Q[0] - 12} y={Q[1] + 4}>Q</T>
      <T x={R[0] + 4} y={R[1] + 4}>R</T>
      <T x={(Q[0] + P[0]) / 2 - 34} y={(Q[1] + P[1]) / 2}>4,4</T>
      <T x={(R[0] + P[0]) / 2 + 8} y={(R[1] + P[1]) / 2}>5,3</T>
      <T x={(Q[0] + R[0]) / 2} y={Q[1] + 16} a="middle">6,4</T>
    </Box>
  );
})();

const FIG_Q23 = (() => {
  const K: Pt = [40, 125];
  const L: Pt = [200, 125];
  const M: Pt = [120, 125 - 80 * Math.tan((33.7 * Math.PI) / 180)];
  const F: Pt = [120, 125];
  return (
    <Box>
      <polygon points={`${K} ${L} ${M}`} fill="#fef3c7" stroke={S_INK} strokeWidth="1.8" />
      <line x1={M[0]} y1={M[1]} x2={F[0]} y2={F[1]} stroke={S_INK} strokeDasharray="4 3" />
      <RightAt V={F} P={L} Q={M} r={9} />
      <path d={arcPath(L, K, M, 26)} fill="none" stroke={S_RED} strokeWidth="1.6" />
      <T x={150} y={120} c={S_RED}>33,7°</T>
      <T x={120} y={142} a="middle">KL = 6 cm</T>
      <T x={68} y={96} c={S_BLUE}>d = ?</T>
      <T x={164} y={96} c={S_BLUE}>d</T>
      <T x={28} y={138}>K</T>
      <T x={204} y={138}>L</T>
      <T x={116} y={M[1] - 6}>M</T>
    </Box>
  );
})();

const FIG_Q24 = (() => {
  // szabályos négyoldalú gúla: alaplap paralelogrammaként (ferde vetület)
  const A: Pt = [50, 135];
  const B: Pt = [150, 135];
  const C: Pt = [190, 105];
  const D: Pt = [90, 105];
  const Ctr: Pt = [120, 120];
  const E: Pt = [120, 18];
  return (
    <Box>
      <polygon points={`${A} ${B} ${C} ${D}`} fill="#ede9fe" fillOpacity="0.6" stroke="none" />
      <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={S_INK} strokeWidth="1.6" />
      <line x1={B[0]} y1={B[1]} x2={C[0]} y2={C[1]} stroke={S_INK} strokeWidth="1.6" />
      <line x1={C[0]} y1={C[1]} x2={D[0]} y2={D[1]} stroke={S_INK} strokeWidth="1.3" strokeDasharray="4 3" />
      <line x1={D[0]} y1={D[1]} x2={A[0]} y2={A[1]} stroke={S_INK} strokeWidth="1.3" strokeDasharray="4 3" />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} stroke={S_BLUE} strokeWidth="1.3" strokeDasharray="4 3" />
      <line x1={E[0]} y1={E[1]} x2={A[0]} y2={A[1]} stroke={S_RED} strokeWidth="2" />
      <line x1={E[0]} y1={E[1]} x2={B[0]} y2={B[1]} stroke={S_INK} strokeWidth="1.6" />
      <line x1={E[0]} y1={E[1]} x2={C[0]} y2={C[1]} stroke={S_INK} strokeWidth="1.6" />
      <line x1={E[0]} y1={E[1]} x2={D[0]} y2={D[1]} stroke={S_INK} strokeWidth="1.3" strokeDasharray="4 3" />
      <line x1={E[0]} y1={E[1]} x2={Ctr[0]} y2={Ctr[1]} stroke={S_INK} strokeWidth="1.2" strokeDasharray="4 3" />
      <RightAt V={Ctr} P={A} Q={E} r={9} />
      <path d={arcPath(A, Ctr, E, 22)} fill="none" stroke={S_GREEN} strokeWidth="1.6" />
      <T x={66} y={124} c={S_GREEN}>φ = ?</T>
      <T x={40} y={70} c={S_RED}>oldalél = 3d</T>
      <T x={196} y={112} c={S_BLUE}>alapátló d</T>
    </Box>
  );
})();

const FIG_Q29 = (() => {
  const A: Pt = [30, 140];
  const B: Pt = [210, 140];
  const C: Pt = [140, 25];
  const P1 = lerp(B, C, 1 / 3);
  const P2 = lerp(B, C, 2 / 3);
  const Q1 = lerp(A, C, 1 / 3);
  const Q2 = lerp(A, C, 2 / 3);
  return (
    <Box>
      <polygon points={`${A} ${B} ${C}`} fill="#f8fafc" stroke={S_INK} strokeWidth="1.8" />
      <polygon points={`${Q1} ${Q2} ${P2} ${P1}`} fill="#bbf7d0" fillOpacity="0.8" stroke={S_GREEN} strokeWidth="1.6" />
      {[P1, P2, Q1, Q2].map((P, i) => (
        <circle key={i} cx={P[0]} cy={P[1]} r="2.6" fill={S_INK} />
      ))}
      <T x={A[0] - 10} y={A[1] + 14}>A</T>
      <T x={B[0] + 2} y={B[1] + 14}>B</T>
      <T x={C[0] - 4} y={C[1] - 6}>C</T>
      <T x={P1[0] + 4} y={P1[1] + 4}>P₁</T>
      <T x={P2[0] + 4} y={P2[1] + 4}>P₂</T>
      <T x={Q1[0] - 20} y={Q1[1] + 4}>Q₁</T>
      <T x={Q2[0] - 20} y={Q2[1] + 4}>Q₂</T>
      <T x={120} y={154} a="middle">AB = 6 cm</T>
      <T x={120} y={104} a="middle" c={S_RED}>?</T>
    </Box>
  );
})();

const TRANSFORMATIONS_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'str-q1',
    questionTypeBadge: 'Középpontos szimmetria',
    level: 1,
    question: 'Melyik síkidom középpontosan szimmetrikus?',
    options: ['a paralelogramma', 'a deltoid (nem rombusz)', 'az egyenlő szárú háromszög', 'a szabályos ötszög'],
    correctAnswer: 0,
    explanation: 'A paralelogramma az átlók metszéspontjára tükrözve önmagába megy. A deltoid és az egyenlő szárú háromszög csak tengelyesen, a páratlan oldalszámú szabályos sokszög csak tengelyesen (és forgás-) szimmetrikus.'
  },
  {
    id: 'str-q2',
    questionTypeBadge: 'Forgásszimmetria',
    level: 1,
    question: 'Mekkora a legkisebb szögű elforgatás, amely a szabályos ötszöget önmagába viszi?',
    options: ['72°', '108°', '60°', '36°'],
    correctAnswer: 0,
    explanation: '360°/5 = 72°. (A 108° az ötszög belső szöge, nem forgásszög.)'
  },
  {
    id: 'str-q3',
    questionTypeBadge: 'Pitagorasz-tétel',
    figure: FIG_Q3,
    level: 1,
    question: 'Egy derékszögű háromszög befogói 6 cm és 8 cm. Mekkora az átfogója?',
    options: ['10 cm', '14 cm', '√28 cm', '48 cm'],
    correctAnswer: 0,
    explanation: 'c² = 6² + 8² = 100 ⇒ c = 10 cm. (A 14 cm a befogók összege, √28 cm a különbségből jönne.)'
  },
  {
    id: 'str-q4',
    questionTypeBadge: 'Hasonlóság aránya',
    level: 1,
    question: 'Két hasonló háromszög hasonlósági aránya 3. Hányszorosa a nagyobbik területe a kisebbikének?',
    options: ['9', '3', '27', '6'],
    correctAnswer: 0,
    explanation: 'A területek aránya k² = 3² = 9. (A kerületek aránya 3, testek térfogatáé lenne 27.)'
  },
  {
    id: 'str-q5',
    questionTypeBadge: 'Hasonló testek',
    level: 1,
    question: 'Egy kocka nagyítása során a felszíne 64-szeresére nő. Hányszorosára nő a térfogata?',
    options: ['512', '64', '8', '4096'],
    correctAnswer: 0,
    explanation: 'k² = 64 ⇒ k = 8 ⇒ a térfogat k³ = 512-szeres.'
  },
  {
    id: 'str-q6',
    questionTypeBadge: 'Szögfüggvény',
    level: 1,
    question: 'Mivel egyenlő egy derékszögű háromszögben az α hegyesszög szinusza?',
    options: ['a szöggel szemközti befogó / átfogó', 'a szög melletti befogó / átfogó', 'szemközti befogó / melletti befogó', 'átfogó / szemközti befogó'],
    correctAnswer: 0,
    explanation: 'sin α = szemközti befogó/átfogó; a melletti/átfogó a koszinusz, a szemközti/melletti a tangens.'
  },
  {
    id: 'str-q7',
    questionTypeBadge: 'Pótszögek',
    level: 1,
    question: 'A 28°-os szög szinusza ugyanakkora, mint melyik szög koszinusza?',
    options: ['62°', '28°', '152°', '118°'],
    correctAnswer: 0,
    explanation: 'sin α = cos(90° − α) ⇒ sin 28° = cos 62°. (sin 28° = sin 152°, de az nem koszinusz.)'
  },
  {
    id: 'str-q8',
    questionTypeBadge: 'Kör területe',
    level: 1,
    question: 'Mekkora az 5 cm sugarú kör területe (két tizedesre)?',
    options: ['≈ 78,54 cm²', '≈ 31,42 cm²', '≈ 15,71 cm²', '≈ 314,16 cm²'],
    correctAnswer: 0,
    explanation: 'T = r²π = 25π ≈ 78,54 cm². (31,42 cm a kerület, 314,16 az átmérő négyzetével számolva jönne ki.)'
  },
  {
    id: 'str-q9',
    questionTypeBadge: 'Méretarány',
    level: 1,
    question: 'Egy tervrajzon az 5 m hosszú folyosót 2 cm-es szakasz jelöli. Hány cm a rajzon a valóságban 1,8 m széles folyosó szélessége?',
    options: ['0,72 cm', '0,9 cm', '4,5 cm', '7,2 cm'],
    correctAnswer: 0,
    explanation: 'Az arány 2 cm : 500 cm = 1 : 250, így 180 cm/250 = 0,72 cm.'
  },
  {
    id: 'str-q10',
    questionTypeBadge: 'Háromszög területe',
    level: 1,
    question: 'Egy háromszög egyik oldala 8 cm, a hozzá tartozó magasság 5 cm. Mekkora a területe?',
    options: ['20 cm²', '40 cm²', '13 cm²', '26 cm²'],
    correctAnswer: 0,
    explanation: 'T = a · mₐ/2 = 8 · 5/2 = 20 cm². (A 40 cm² a paralelogramma területe lenne.)'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'str-q11',
    questionTypeBadge: 'Thalész-tétel',
    figure: FIG_Q11,
    level: 2,
    question: 'Egy kör egyik pontjából két egymásra merőleges, 5 cm és 7 cm hosszú húr indul. Mekkora a kör sugara (két tizedesre)?',
    options: ['≈ 4,30 cm', '≈ 8,60 cm', '6 cm', '≈ 3,46 cm'],
    correctAnswer: 0,
    explanation: 'A derékszög csúcsa a körön van, így a húrok másik végpontjai egy átmérő végpontjai (Thalész megfordítása): 2r = √(5² + 7²) = √74 ⇒ r ≈ 4,30 cm. (8,60 cm az átmérő.)'
  },
  {
    id: 'str-q12',
    questionTypeBadge: 'Tangens',
    figure: FIG_Q12,
    level: 2,
    question: 'Az ABCD téglalap AB oldala 26 egység, az AC átló az AB-vel 24,7°-os szöget zár be. Mekkora a BC oldal (egy tizedesre)?',
    options: ['≈ 12,0', '≈ 10,9', '≈ 23,6', '≈ 56,5'],
    correctAnswer: 0,
    explanation: 'Az ABC derékszögű háromszögben tg 24,7° = BC/26 ⇒ BC = 26 · tg 24,7° ≈ 12,0. (10,9 = 26 · sin 24,7°, 23,6 = 26 · cos 24,7°.)'
  },
  {
    id: 'str-q13',
    questionTypeBadge: 'Középponti szög',
    level: 2,
    question: 'Egy kör kerülete 16 m. Mekkora középponti szög tartozik a 14 m hosszú körívhez?',
    options: ['315°', '280°', '45°', '252°'],
    correctAnswer: 0,
    explanation: 'Az ívhossz arányos a középponti szöggel: 14/16 · 360° = 315°. (A 45° a maradék 2 m-es ívhez tartozik.)'
  },
  {
    id: 'str-q14',
    questionTypeBadge: 'Körgyűrű',
    level: 2,
    question: 'Egy 3 m átmérőjű kör alakú virágágyást 0,5 m széles sávban zúzott kővel vesznek körbe. Mekkora a kővel borított terület?',
    options: ['1,75π ≈ 5,50 m²', '0,25π ≈ 0,79 m²', '4π ≈ 12,57 m²', '1,5π ≈ 4,71 m²'],
    correctAnswer: 0,
    explanation: 'Körgyűrű: R = 2 m, r = 1,5 m ⇒ (R² − r²)π = (4 − 2,25)π = 1,75π ≈ 5,50 m². (4π a teljes külső kör.)'
  },
  {
    id: 'str-q15',
    questionTypeBadge: 'Koszinusztétel',
    figure: FIG_Q15,
    level: 2,
    question: 'Egy paralelogramma átlói 10 cm és 16 cm, az átlók szöge 60°. Mekkora a rövidebb oldala?',
    options: ['7,0 cm', '≈ 11,4 cm', '≈ 9,4 cm', '13,0 cm'],
    correctAnswer: 0,
    explanation: 'Az átlók felezik egymást: 5 és 8 cm-es félátlók, 60°-os szöggel: √(5² + 8² − 2 · 5 · 8 · cos 60°) = √49 = 7 cm. (A 120°-os szöggel jön a hosszabb oldal: ≈ 11,4 cm.)'
  },
  {
    id: 'str-q16',
    questionTypeBadge: 'Középvonal',
    level: 2,
    question: 'Egy háromszög oldalai 10 cm, 24 cm és 26 cm. Milyen a középvonalai által alkotott háromszög?',
    options: ['derékszögű, oldalai 5, 12, 13 cm', 'tompaszögű, oldalai 5, 12, 13 cm', 'derékszögű, oldalai 20, 48, 52 cm', 'hegyesszögű, oldalai 5, 12, 13 cm'],
    correctAnswer: 0,
    explanation: 'A középvonal a szemközti oldal fele: 5, 12, 13 cm. 5² + 12² = 169 = 13², így (Pitagorasz megfordítása) derékszögű – hasonló az eredetihez, k = 1/2.'
  },
  {
    id: 'str-q17',
    questionTypeBadge: 'Gömb síkmetszete',
    figure: FIG_Q17,
    level: 2,
    question: 'Egy 10 cm sugarú gömböt a középpontjától 5 cm-re lévő síkkal elmetszünk. Mekkora a metszet területe?',
    options: ['75π ≈ 235,6 cm²', '25π ≈ 78,5 cm²', '100π ≈ 314,2 cm²', '50π ≈ 157,1 cm²'],
    correctAnswer: 0,
    explanation: 'ϱ² = R² − d² = 100 − 25 = 75 ⇒ T = ϱ²π = 75π ≈ 235,6 cm².'
  },
  {
    id: 'str-q18',
    questionTypeBadge: 'Párhuzamos szelők',
    figure: FIG_Q29,
    level: 2,
    question: 'Az ABC háromszög BC oldalát a P₁, P₂, AC oldalát a Q₁, Q₂ pontok harmadolják (BP₁ = P₁P₂ = P₂C, AQ₁ = Q₁Q₂ = Q₂C), AB = 6 cm. Milyen hosszú a P₂Q₂ és a P₁Q₁ szakasz?',
    options: ['2 cm és 4 cm', '3 cm és 4,5 cm', '2 cm és 3 cm', '1,5 cm és 3 cm'],
    correctAnswer: 0,
    explanation: 'C középpontú hasonlóság: CP₂/CB = 1/3 ⇒ P₂Q₂ = 6/3 = 2 cm; CP₁/CB = 2/3 ⇒ P₁Q₁ = 4 cm (mindkettő párhuzamos AB-vel).'
  },
  {
    id: 'str-q19',
    questionTypeBadge: 'Trapéz területe',
    level: 2,
    question: 'Egy trapéz alapjai 10 cm és 6 cm, magassága 4 cm. Mekkora a területe?',
    options: ['32 cm²', '64 cm²', '240 cm²', '20 cm²'],
    correctAnswer: 0,
    explanation: 'T = (a + c)/2 · m = 16/2 · 4 = 32 cm².'
  },
  {
    id: 'str-q20',
    questionTypeBadge: 'Körcikk',
    level: 2,
    question: 'Mekkora a 3 cm sugarú kör 255°-os középponti szögű körcikkének területe (két tizedesre)?',
    options: ['≈ 20,03 cm²', '≈ 13,35 cm²', '≈ 6,68 cm²', '≈ 28,27 cm²'],
    correctAnswer: 0,
    explanation: 'T = r²π · α/360° = 9π · 255/360 ≈ 20,03 cm². (13,35 cm az ívhossz, 28,27 cm² a teljes kör.)'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'str-q21',
    questionTypeBadge: 'Kör sugara',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy függőhíd íve körív: a két vége 750 m-re van egymástól, a legmagasabb pontja 120 m-rel a hídpálya fölött. Mekkora az ív sugara?',
    options: ['≈ 646 m', '≈ 375 m', '≈ 1172 m', '≈ 526 m'],
    correctAnswer: 0,
    explanation: '(r − 120)² + 375² = r² ⇒ 240r = 375² + 120² ⇒ r ≈ 646 m (kb. 650 m). (1172 m a 2r − 120 értéke.)'
  },
  {
    id: 'str-q22',
    questionTypeBadge: 'Koszinusztétel',
    figure: FIG_Q22,
    level: 3,
    question: 'A PQR háromszög oldalai PQ = 4,4 cm, PR = 5,3 cm, QR = 6,4 cm. Mekkora a P csúcsnál lévő β szög (egy tizedesre)?',
    options: ['≈ 82,0°', '≈ 42,9°', '≈ 55,1°', '90°'],
    correctAnswer: 0,
    explanation: 'cos β = (5,3² + 4,4² − 6,4²)/(2 · 5,3 · 4,4) ≈ 0,139 ⇒ β ≈ 82,0°. A háromszög nem derékszögű: 4,4² + 5,3² = 47,45 ≠ 40,96. (42,9° az R-nél lévő szög.)'
  },
  {
    id: 'str-q23',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_Q23,
    level: 3,
    question: 'A KLM egyenlő szárú háromszög KL alapja 6 cm, az alapon fekvő szöge 33,7°. Mekkora a d szár (két tizedesre)?',
    options: ['≈ 3,61 cm', '≈ 7,21 cm', '≈ 2,50 cm', '≈ 5,41 cm'],
    correctAnswer: 0,
    explanation: 'Az alaphoz tartozó magasság felezi az alapot: cos 33,7° = 3/d ⇒ d = 3/cos 33,7° ≈ 3,61 cm. (7,21 cm, ha 6/cos 33,7°-kal számolnánk.)'
  },
  {
    id: 'str-q24',
    questionTypeBadge: 'Oldalél és alaplap szöge',
    figure: FIG_Q24,
    level: 3,
    question: 'Egy szabályos négyoldalú gúla oldaléle háromszorosa az alaplap átlójának. Mekkora szöget zár be az oldalél az alaplappal (egy tizedesre)?',
    options: ['≈ 80,4°', '≈ 70,5°', '≈ 71,6°', '≈ 9,6°'],
    correctAnswer: 0,
    explanation: 'Az oldalél vetülete a fél átló: cos φ = (d/2)/(3d) = 1/6 ⇒ φ ≈ 80,4°. (70,5° a cos φ = 1/3 hibás vetületből jönne.)'
  },
  {
    id: 'str-q25',
    questionTypeBadge: 'Szabályos nyolcszög',
    level: 3,
    question: 'Egy szabályos nyolcszög oldala 12 egység. Mekkora a legrövidebb átlója (két tizedesre)?',
    options: ['≈ 22,17', '≈ 31,36', '≈ 28,97', '≈ 16,97'],
    correctAnswer: 0,
    explanation: 'A legrövidebb átló egy 135°-os szárszögű, 12 egységes szárú háromszög alapja: √(12² + 12² − 2 · 144 · cos 135°) = 12 · √(2 + √2) ≈ 22,17. (31,36 a leghosszabb, 28,97 a középső átló.)'
  },
  {
    id: 'str-q26',
    questionTypeBadge: 'Körök aránya',
    level: 3,
    question: 'Hogyan aránylik a szabályos nyolcszögbe írt kör területe a köré írt kör területéhez?',
    options: ['cos² 22,5° ≈ 0,854', 'cos 22,5° ≈ 0,924', 'sin² 22,5° ≈ 0,146', '1/2'],
    correctAnswer: 0,
    explanation: 'A beírt kör sugara ϱ = R · cos 22,5° (a középponti szög fele 22,5°). A területek aránya (ϱ/R)² = cos² 22,5° ≈ 0,854.'
  },
  {
    id: 'str-q27',
    questionTypeBadge: 'Gömb és félgömb',
    level: 3,
    question: 'Mekkora annak a félgömbnek a sugara, amelynek térfogata egy 10 cm sugarú gömb térfogatával egyenlő (egy tizedesre)?',
    options: ['≈ 12,6 cm', '20 cm', '≈ 14,1 cm', '≈ 11,2 cm'],
    correctAnswer: 0,
    explanation: '(2/3)R³π = (4/3) · 10³π ⇒ R³ = 2000 ⇒ R = ∛2000 ≈ 12,6 cm. (14,1 = 10√2 hibásan négyzetgyökkel.)'
  },
  {
    id: 'str-q28',
    questionTypeBadge: 'Gömb síkmetszete',
    level: 3,
    question: 'Egy 10 cm sugarú gömb melyik síkmetszetének kerülete feleakkora, mint a főkör kerülete? Milyen messze van ez a sík a középponttól (két tizedesre)?',
    options: ['≈ 8,66 cm', '5 cm', '≈ 7,07 cm', '≈ 2,5 cm'],
    correctAnswer: 0,
    explanation: 'Feleakkora kerület ⇒ ϱ = 5 cm. d = √(R² − ϱ²) = √75 ≈ 8,66 cm. (5 cm a metszet sugara, nem a távolság.)'
  },
  {
    id: 'str-q29',
    questionTypeBadge: 'Hasonlóság és terület',
    figure: FIG_Q29,
    level: 3,
    question: 'Az ABC háromszög BC és AC oldalát harmadoló P₁, P₂, illetve Q₁, Q₂ pontokkal kapott Q₁Q₂P₂P₁ trapéz területe hányad része az ABC háromszög területének?',
    options: ['1/3', '1/9', '4/9', '2/9'],
    correctAnswer: 0,
    explanation: 'A C-nél lévő kis háromszögek arányai 1/3 és 2/3, területük 1/9 és 4/9 része az egésznek. A trapéz: 4/9 − 1/9 = 3/9 = 1/3.'
  },
  {
    id: 'str-q30',
    questionTypeBadge: 'Trigonometrikus terület',
    level: 3,
    question: 'Egy háromszög két oldala 7 cm és 10 cm, az általuk közbezárt szög 150°. Mekkora a területe?',
    options: ['17,5 cm²', '35 cm²', '≈ 30,3 cm²', '≈ 15,2 cm²'],
    correctAnswer: 0,
    explanation: 'T = ab · sin γ/2 = 7 · 10 · sin 150°/2 = 70 · 0,5/2 = 17,5 cm². (≈ 30,3 cm² a cos 150° abszolút értékével számolva jönne.)'
  }
];

export const TransformationsSolidsSummaryQuiz: React.FC<{
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
      topicId="g12-sum-transzformaciok-quiz"
      subtopicId="transzformaciok-alakzatok"
      title="8. Transzformációk, síkbeli és térbeli alakzatok – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: szimmetriák, hasonlóság, Pitagorasz, Thalész, szögfüggvények, szinusz- és koszinusztétel, terület, felszín, térfogat."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={TRANSFORMATIONS_QUESTIONS}
      cheatSheets={[
        {
          title: 'Transzformációk',
          items: [
            'Egybevágóság: távolságtartó (tükrözések, forgatás, eltolás).',
            'Középpontos hasonlóság: OP′ = |k| · OP; k < 0: + tükrözés O-ra.',
            'Hasonlóság: kerület |k|, terület k², térfogat |k|³; a szögek nem változnak.',
            'Középvonal: párhuzamos a harmadik oldallal, fele olyan hosszú.'
          ]
        },
        {
          title: 'Derékszögű háromszög, kör',
          items: [
            'a² + b² = c²; Thalész: átmérő → derékszög.',
            'sin α = szemközti/átfogó, cos α = melletti/átfogó, tg α = szemközti/melletti.',
            'sin α = cos(90° − α); sin² α + cos² α = 1.',
            'Ív és körcikk arányos a középponti szöggel: r²π · α/360°.'
          ]
        },
        {
          title: 'Általános háromszög, testek',
          items: [
            'a : b = sin α : sin β; c² = a² + b² − 2ab · cos γ.',
            'T = ab · sin γ/2; paralelogramma: ab · sin γ; trapéz: (a + c)/2 · m.',
            'Gömb: A = 4r²π, V = 4r³π/3; metszet: ϱ² = R² − d².',
            'Gúla, kúp: V = T_a · M/3; hasáb, henger: V = T_a · M.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TransformationsSolidsSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <TransformationsSolidsSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default TransformationsSolidsSummaryQuiz;
