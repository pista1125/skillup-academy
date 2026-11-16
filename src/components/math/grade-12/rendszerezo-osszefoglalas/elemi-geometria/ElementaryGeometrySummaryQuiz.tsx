import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ElementaryGeometrySummaryMatcher } from './ElementaryGeometrySummaryMatcher';
import { ElementaryGeometrySummarySorter } from './ElementaryGeometrySummarySorter';
import { S_BLUE, S_RED, S_INK, S_GREEN, S_PURPLE, S_AMBER, Pt, RightAt, arcPath, foot } from './sumKit';

const QFIG = 'w-full max-w-[280px] h-auto mx-auto';
const Box: React.FC<{ h?: number; children: React.ReactNode }> = ({ h = 160, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className={QFIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Háromszög két ismert szöggel, a harmadik helyén „?”. */
const FIG_Q1 = (() => {
  const A: Pt = [30, 135];
  const B: Pt = [210, 135];
  const C: Pt = [95, 35];
  return (
    <Box>
      <polygon points={`${A} ${B} ${C}`} fill="#eef2ff" stroke={S_INK} strokeWidth="1.8" />
      <path d={arcPath(A, B, C, 22)} fill="none" stroke={S_BLUE} strokeWidth="1.6" />
      <path d={arcPath(B, A, C, 26)} fill="none" stroke={S_GREEN} strokeWidth="1.6" />
      <path d={arcPath(C, A, B, 16)} fill="none" stroke={S_RED} strokeWidth="1.6" />
      <text x="56" y="128" fontSize="11" fill={S_BLUE} fontWeight="bold">68°</text>
      <text x="160" y="128" fontSize="11" fill={S_GREEN} fontWeight="bold">47°</text>
      <text x="100" y="70" fontSize="12" fill={S_RED} fontWeight="bold">?</text>
    </Box>
  );
})();

/** Óra számlap adott időponttal. */
const clock = (hourDeg: number, minDeg: number) => {
  const c: Pt = [120, 80];
  const hand = (deg: number, L: number): Pt => [c[0] + L * Math.sin((deg * Math.PI) / 180), c[1] - L * Math.cos((deg * Math.PI) / 180)];
  const H = hand(hourDeg, 38);
  const M = hand(minDeg, 58);
  return (
    <Box>
      <circle cx={c[0]} cy={c[1]} r="66" fill="#ffffff" stroke={S_INK} strokeWidth="2" />
      {Array.from({ length: 12 }, (_, i) => {
        const p = hand(i * 30, 56);
        const q = hand(i * 30, 64);
        return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={S_INK} strokeWidth={i % 3 === 0 ? 2.4 : 1.2} />;
      })}
      <line x1={c[0]} y1={c[1]} x2={H[0]} y2={H[1]} stroke={S_RED} strokeWidth="4" strokeLinecap="round" />
      <line x1={c[0]} y1={c[1]} x2={M[0]} y2={M[1]} stroke={S_BLUE} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx={c[0]} cy={c[1]} r="3" fill={S_INK} />
      <text x="205" y="150" fontSize="12" fill={S_RED} fontWeight="bold" textAnchor="end">∢ = ?</text>
    </Box>
  );
};
const FIG_Q11 = clock(210, 0);
const FIG_Q12 = clock(105, 180);

/** Négyszög: A külső szöge, B és C belső szöge. */
const FIG_Q13 = (() => {
  const A: Pt = [45, 125];
  const B: Pt = [175, 135];
  const C: Pt = [200, 50];
  const D: Pt = [80, 35];
  const ext: Pt = [A[0] - (B[0] - A[0]) * 0.25, A[1] - (B[1] - A[1]) * 0.25];
  const extD: Pt = [D[0] + (D[0] - C[0]) * 0.3, D[1] + (D[1] - C[1]) * 0.3];
  return (
    <Box>
      <polygon points={`${A} ${B} ${C} ${D}`} fill="#eef2ff" stroke={S_INK} strokeWidth="1.8" />
      <line x1={A[0]} y1={A[1]} x2={ext[0]} y2={ext[1]} stroke={S_INK} strokeDasharray="3 3" />
      <line x1={D[0]} y1={D[1]} x2={extD[0]} y2={extD[1]} stroke={S_INK} strokeDasharray="3 3" />
      <path d={arcPath(A, ext, D, 18)} fill="none" stroke={S_BLUE} strokeWidth="1.6" />
      <path d={arcPath(B, A, C, 18)} fill="none" stroke={S_GREEN} strokeWidth="1.6" />
      <path d={arcPath(C, B, D, 16)} fill="none" stroke={S_PURPLE} strokeWidth="1.6" />
      <path d={arcPath(D, extD, A, 16)} fill="none" stroke={S_RED} strokeWidth="1.6" />
      <text x="14" y="112" fontSize="10.5" fill={S_BLUE} fontWeight="bold">104°</text>
      <text x="146" y="124" fontSize="10.5" fill={S_GREEN} fontWeight="bold">74°</text>
      <text x="176" y="64" fontSize="10.5" fill={S_PURPLE} fontWeight="bold">80°</text>
      <text x="40" y="54" fontSize="12" fill={S_RED} fontWeight="bold">?</text>
      {[
        [A, 'A', -4, 16],
        [B, 'B', 4, 14],
        [C, 'C', 6, 0],
        [D, 'D', -2, -6]
      ].map(([P, t, dx, dy]) => (
        <text key={t as string} x={(P as Pt)[0] + (dx as number)} y={(P as Pt)[1] + (dy as number)} fontSize="11" fontWeight="bold" fill={S_INK}>
          {t as string}
        </text>
      ))}
    </Box>
  );
})();

/** Kocka ABCDA′B′C′D′ (élhossz 5 cm), kiemelve egy pont és egy lap. */
const cube = (highlight: 'face' | 'diag') => {
  const s = 80;
  const ox = 55;
  const oy = 140;
  const dx = 38;
  const dy = -28;
  const A: Pt = [ox, oy];
  const B: Pt = [ox + s, oy];
  const C: Pt = [ox + s + dx, oy + dy];
  const D: Pt = [ox + dx, oy + dy];
  const A2: Pt = [A[0], A[1] - s];
  const B2: Pt = [B[0], B[1] - s];
  const C2: Pt = [C[0], C[1] - s];
  const D2: Pt = [D[0], D[1] - s];
  const seg = (p: Pt, q: Pt, dashed = false, color = S_INK, w = 1.5) => (
    <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={color} strokeWidth={w} strokeDasharray={dashed ? '4 3' : undefined} />
  );
  return (
    <Box h={170}>
      {highlight === 'face' && <polygon points={`${C} ${C2} ${D2} ${D}`} fill="#bfdbfe" fillOpacity="0.6" />}
      {highlight === 'diag' && <polygon points={`${A} ${B} ${C} ${D}`} fill="#bbf7d0" fillOpacity="0.6" />}
      {seg(A, B)}
      {seg(B, C)}
      {seg(C, D, true)}
      {seg(D, A, true)}
      {seg(A2, B2)}
      {seg(B2, C2)}
      {seg(C2, D2)}
      {seg(D2, A2)}
      {seg(A, A2)}
      {seg(B, B2)}
      {seg(C, C2)}
      {seg(D, D2, true)}
      {highlight === 'face' && <circle cx={A[0]} cy={A[1]} r="4" fill={S_RED} />}
      {highlight === 'diag' && seg(B, D2, false, S_RED, 2.2)}
      {[
        [A, 'A', -12, 12],
        [B, 'B', 2, 14],
        [C, 'C', 6, 4],
        [D, 'D', -14, 0],
        [A2, 'A′', -16, 0],
        [B2, 'B′', -4, -6],
        [C2, 'C′', 4, -4],
        [D2, 'D′', -4, -6]
      ].map(([P, t, ddx, ddy]) => (
        <text key={t as string} x={(P as Pt)[0] + (ddx as number)} y={(P as Pt)[1] + (ddy as number)} fontSize="11" fontWeight="bold" fill={S_INK}>
          {t as string}
        </text>
      ))}
      <text x={(A[0] + B[0]) / 2} y={A[1] + 16} fontSize="10.5" textAnchor="middle" fill={S_INK}>5 cm</text>
      <text x="230" y="30" fontSize="11" textAnchor="end" fill={S_RED} fontWeight="bold">távolság = ?</text>
    </Box>
  );
};
const FIG_Q17 = cube('face');
const FIG_Q18 = cube('diag');

const FIG_Q19 = (
  <Box h={120}>
    <line x1="20" y1="80" x2="220" y2="80" stroke={S_INK} strokeWidth="2" />
    <circle cx="20" cy="80" r="4" fill={S_INK} />
    <circle cx="90" cy="80" r="4" fill={S_INK} />
    <text x="55" y="70" fontSize="11" textAnchor="middle" fill={S_BLUE} fontWeight="bold">35 cm</text>
    <line x1="20" y1="80" x2="211" y2="80" stroke={S_GREEN} strokeWidth="3" strokeOpacity="0.5" />
    <text x="150" y="70" fontSize="11" textAnchor="middle" fill={S_GREEN} fontWeight="bold">91 cm</text>
    <text x="120" y="105" fontSize="11" textAnchor="middle" fill={S_RED} fontWeight="bold">harmadik oldal: c = ? (egész)</text>
  </Box>
);

/** Kidolgozott 1: derékszögű háromszög magassággal és szögfelezővel. */
const FIG_Q21 = (() => {
  const C: Pt = [30, 140];
  const A: Pt = [215, 140];
  const B: Pt = [30, 140 - 185 * Math.tan((25 * Math.PI) / 180)];
  const T = foot(C, A, B);
  const dir: Pt = [Math.SQRT1_2, -Math.SQRT1_2];
  const denom = dir[0] * (A[1] - B[1]) - dir[1] * (A[0] - B[0]);
  const s = ((B[0] - C[0]) * (A[1] - B[1]) - (B[1] - C[1]) * (A[0] - B[0])) / denom;
  const P: Pt = [C[0] + s * dir[0], C[1] + s * dir[1]];
  return (
    <Box>
      <polygon points={`${A} ${B} ${C}`} fill="#eef2ff" stroke={S_INK} strokeWidth="1.8" />
      <line x1={C[0]} y1={C[1]} x2={T[0]} y2={T[1]} stroke={S_RED} strokeWidth="1.5" />
      <line x1={C[0]} y1={C[1]} x2={P[0]} y2={P[1]} stroke={S_BLUE} strokeWidth="1.5" strokeDasharray="5 3" />
      <RightAt V={C} P={A} Q={B} r={12} />
      <RightAt V={T} P={C} Q={A} r={8} color={S_RED} />
      <path d={arcPath(C, T, P, 34)} fill="none" stroke={S_GREEN} strokeWidth="1.8" />
      <text x="64" y="98" fontSize="10.5" fill={S_GREEN} fontWeight="bold">20°</text>
      <text x="16" y="152" fontSize="11" fontWeight="bold" fill={S_INK}>C</text>
      <text x="218" y="152" fontSize="11" fontWeight="bold" fill={S_INK}>A</text>
      <text x="18" y={B[1] + 2} fontSize="11" fontWeight="bold" fill={S_INK}>B</text>
      <text x={T[0] + 2} y={T[1] - 5} fontSize="10.5" fontWeight="bold" fill={S_RED}>T</text>
      <text x={P[0] + 3} y={P[1] - 4} fontSize="10.5" fontWeight="bold" fill={S_BLUE}>P</text>
      <text x="160" y="40" fontSize="11" fill={S_AMBER} fontWeight="bold">α, β = ?</text>
    </Box>
  );
})();

/** Kidolgozott 3: egy csúcsból induló átlók által létrehozott szögek. */
const FIG_Q23 = (() => {
  const V: Pt = [120, 150];
  const parts = [23, 42, 30, 47, 8];
  let acc = 15;
  const rays: Pt[] = [[V[0] + 120 * Math.cos((acc * Math.PI) / 180), V[1] - 120 * Math.sin((acc * Math.PI) / 180)]];
  parts.forEach((p) => {
    acc += p;
    rays.push([V[0] + 120 * Math.cos((acc * Math.PI) / 180), V[1] - 120 * Math.sin((acc * Math.PI) / 180)]);
  });
  let a2 = 15;
  return (
    <Box>
      {rays.map((r, i) => (
        <line key={i} x1={V[0]} y1={V[1]} x2={r[0]} y2={r[1]} stroke={i === 0 || i === 5 ? S_INK : S_BLUE} strokeWidth={i === 0 || i === 5 ? 2 : 1.3} />
      ))}
      {parts.map((p, i) => {
        const mid = a2 + p / 2;
        a2 += p;
        const rr = 52 + (i % 2) * 22;
        return (
          <text key={i} x={V[0] + rr * Math.cos((mid * Math.PI) / 180)} y={V[1] - rr * Math.sin((mid * Math.PI) / 180) + 4} fontSize="10" textAnchor="middle" fill={S_RED} fontWeight="bold">
            {p}°
          </text>
        );
      })}
      <circle cx={V[0]} cy={V[1]} r="3.5" fill={S_INK} />
      <text x="120" y="14" fontSize="10" textAnchor="middle" fill={S_INK}>a csúcs belső szögét az átlók osztják</text>
    </Box>
  );
})();

const ELEMENTARY_GEOMETRY_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'seg-q1',
    questionTypeBadge: 'Háromszög szögei',
    figure: FIG_Q1,
    level: 1,
    question: 'Egy háromszög két szöge 68° és 47°. Mekkora a harmadik szöge?',
    options: ['65°', '75°', '115°', '55°'],
    correctAnswer: 0,
    explanation: 'A belső szögek összege 180°: 180° − 68° − 47° = 65°. (A 115° a harmadik szög melletti külső szög.)'
  },
  {
    id: 'seg-q2',
    questionTypeBadge: 'Belső szögösszeg',
    level: 1,
    question: 'Mennyi egy konvex hétszög belső szögeinek összege?',
    options: ['900°', '1260°', '720°', '1080°'],
    correctAnswer: 0,
    explanation: '(n − 2) · 180° = 5 · 180° = 900°. (A 720° a hatszögé, az 1260° a 7 · 180°.)'
  },
  {
    id: 'seg-q3',
    questionTypeBadge: 'Átlók száma',
    level: 1,
    question: 'Hány átlója van egy konvex tízszögnek?',
    options: ['35', '70', '7', '45'],
    correctAnswer: 0,
    explanation: 'n(n − 3)/2 = 10 · 7/2 = 35. (A 70-ben minden átlót kétszer számoltunk, 7 az egy csúcsból induló átlók száma.)'
  },
  {
    id: 'seg-q4',
    questionTypeBadge: 'Szabályos sokszög',
    level: 1,
    question: 'Mekkora a szabályos hatszög egy belső szöge?',
    options: ['120°', '60°', '108°', '135°'],
    correctAnswer: 0,
    explanation: '(n − 2) · 180°/n = 4 · 180°/6 = 120°. (A 60° egy külső szög, a 108° a szabályos ötszögé, a 135° a nyolcszögé.)'
  },
  {
    id: 'seg-q5',
    questionTypeBadge: 'Mellékszög',
    level: 1,
    question: 'Egy szög 38°-os. Mekkora a mellékszöge?',
    options: ['142°', '52°', '38°', '322°'],
    correctAnswer: 0,
    explanation: 'A mellékszögek összege 180°: 180° − 38° = 142°. (Az 52° a pótszög, 38° a csúcsszög.)'
  },
  {
    id: 'seg-q6',
    questionTypeBadge: 'Pótszögek',
    level: 1,
    question: 'Két szög egymás pótszöge, és az egyik a másik ötszöröse. Mekkorák?',
    options: ['15° és 75°', '30° és 150°', '18° és 90°', '12° és 60°'],
    correctAnswer: 0,
    explanation: 'x + 5x = 90° ⇒ x = 15°, a másik 75°. (A 30° és 150° mellékszögekre lenne igaz.)'
  },
  {
    id: 'seg-q7',
    questionTypeBadge: 'Háromszög-egyenlőtlenség',
    level: 1,
    question: 'Melyik számhármas lehet egy háromszög három oldalának hossza?',
    options: ['3,8 cm; 0,29 dm; 64 mm', '2 cm; 3 cm; 6 cm', '1 cm; 2 cm; 3 cm', '4 cm; 5 cm; 10 cm'],
    correctAnswer: 0,
    explanation: '3,8 cm; 2,9 cm; 6,4 cm: 3,8 + 2,9 = 6,7 > 6,4, a többi párosítás is teljesül. A többinél a két rövidebb összege nem nagyobb a leghosszabbnál.'
  },
  {
    id: 'seg-q8',
    questionTypeBadge: 'Köré írt kör',
    level: 1,
    question: 'Mely vonalak metszéspontja a háromszög köré írható körének középpontja?',
    options: ['az oldalfelező merőlegeseké', 'a belső szögfelezőké', 'a magasságvonalaké', 'a súlyvonalaké'],
    correctAnswer: 0,
    explanation: 'Az oldalfelező merőlegesek pontjai egyenlő távolságra vannak a végpontoktól, így metszéspontjuk mindhárom csúcstól egyenlő távol van.'
  },
  {
    id: 'seg-q9',
    questionTypeBadge: 'Magasságpont',
    level: 1,
    question: 'Hol van a derékszögű háromszög magasságpontja?',
    options: ['a derékszögű csúcsban', 'az átfogó felezőpontjában', 'a háromszögön kívül', 'a súlypontban'],
    correctAnswer: 0,
    explanation: 'A két befogó egyben magasságvonal is, ezek a derékszögű csúcsban metszik egymást. (Az átfogó felezőpontja a köré írt kör középpontja.)'
  },
  {
    id: 'seg-q10',
    questionTypeBadge: 'Paralelogramma',
    level: 1,
    question: 'Egy paralelogramma egyik szöge 64°. Mekkora a vele egy oldalon fekvő szög?',
    options: ['116°', '64°', '26°', '296°'],
    correctAnswer: 0,
    explanation: 'A paralelogramma egy oldalon fekvő szögeinek összege 180°: 180° − 64° = 116°. (64° a szemközti szög.)'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'seg-q11',
    questionTypeBadge: 'Óramutatók',
    figure: FIG_Q11,
    level: 2,
    question: 'Hány fokos szöget zár be az óra kis- és nagymutatója pontosan 7 órakor?',
    options: ['150°', '210°', '120°', '140°'],
    correctAnswer: 0,
    explanation: 'Óránként 30°: a kismutató a 7-esen (210°), a nagymutató a 12-esen (0°). A közrezárt (kisebbik) szög 360° − 210° = 150°.'
  },
  {
    id: 'seg-q12',
    questionTypeBadge: 'Óramutatók',
    figure: FIG_Q12,
    level: 2,
    question: 'Hány fokos szöget zár be az óra kis- és nagymutatója fél 4-kor?',
    options: ['75°', '90°', '60°', '105°'],
    correctAnswer: 0,
    explanation: 'Fél 4-kor a nagymutató a 6-oson (180°), a kismutató a 3 és 4 között félúton (3,5 · 30° = 105°): 180° − 105° = 75°. (A 90° akkor jönne ki, ha a kismutató a 3-ason állna.)'
  },
  {
    id: 'seg-q13',
    questionTypeBadge: 'Négyszög szögei',
    figure: FIG_Q13,
    level: 2,
    question: 'Az ABCD konvex négyszög A csúcsánál lévő külső szöge 104°, B-nél a belső szög 74°, C-nél 80°. Hány fokos a D csúcsnál lévő külső szög?',
    options: ['50°', '130°', '102°', '76°'],
    correctAnswer: 0,
    explanation: 'A belső szöge 180° − 104° = 76°; D belső szöge 360° − 76° − 74° − 80° = 130°, így a külső szög 50°.'
  },
  {
    id: 'seg-q14',
    questionTypeBadge: 'Külső szögek',
    level: 2,
    question: 'Egy háromszög külső szögeinek aránya 3 : 5 : 7. Mekkora a legkisebb belső szöge?',
    options: ['12°', '36°', '72°', '60°'],
    correctAnswer: 0,
    explanation: 'A külső szögek összege 360°: 72°, 120°, 168°. A belső szögek 108°, 60°, 12°, a legkisebb 12°. (36° a belső szögekre alkalmazott 3 : 5 : 7 arányból jönne.)'
  },
  {
    id: 'seg-q15',
    questionTypeBadge: 'Átlók egy csúcsból',
    level: 2,
    question: 'Egy konvex sokszög belső szögeinek összege 1800°. Hány átló indul egy csúcsából?',
    options: ['9', '10', '12', '54'],
    correctAnswer: 0,
    explanation: '(n − 2) · 180° = 1800° ⇒ n = 12; egy csúcsból n − 3 = 9 átló indul. (54 az összes átló száma.)'
  },
  {
    id: 'seg-q16',
    questionTypeBadge: 'Szögek aránya',
    level: 2,
    question: 'Egy háromszög belső szögeinek aránya 2 : 3 : 4. Mekkora a legnagyobb szöge?',
    options: ['80°', '90°', '160°', '72°'],
    correctAnswer: 0,
    explanation: '2x + 3x + 4x = 180° ⇒ x = 20°, a szögek 40°, 60°, 80°.'
  },
  {
    id: 'seg-q17',
    questionTypeBadge: 'Pont és sík távolsága',
    figure: FIG_Q17,
    level: 2,
    question: 'Az ABCDA′B′C′D′ kocka éle 5 cm. Mekkora az A pont és a CC′D′D sík távolsága?',
    options: ['5 cm', '5√2 cm', '5√3 cm', '2,5 cm'],
    correctAnswer: 0,
    explanation: 'Az AD él merőleges a CC′D′D lapra (D a talppont), így a távolság az AD él hossza: 5 cm. (5√2 cm az AC lapátló.)'
  },
  {
    id: 'seg-q18',
    questionTypeBadge: 'Egyenes és sík távolsága',
    figure: FIG_Q18,
    level: 2,
    question: 'Az ABCDA′B′C′D′ kocka éle 5 cm. Mekkora a BD′ egyenes és az ABCD sík távolsága?',
    options: ['0 cm', '5 cm', '5√2 cm', '5√3 cm'],
    correctAnswer: 0,
    explanation: 'A BD′ egyenes átmegy a B ponton, amely az ABCD síkon van: van közös pontjuk, így a távolságuk 0. (Az 5√3 cm a testátló hossza.)'
  },
  {
    id: 'seg-q19',
    questionTypeBadge: 'Háromszög oldalai',
    figure: FIG_Q19,
    level: 2,
    question: 'Egy háromszög két oldala 35 cm és 91 cm, a harmadik oldal hossza cm-ben egész szám. Mennyi lehet a legkisebb értéke?',
    options: ['57 cm', '56 cm', '35 cm', '127 cm'],
    correctAnswer: 0,
    explanation: 'A háromszög-egyenlőtlenség: 91 − 35 < c < 91 + 35, vagyis 56 < c < 126. A legkisebb egész 57. (56 még elfajuló háromszöget adna.)'
  },
  {
    id: 'seg-q20',
    questionTypeBadge: 'Átlókból sokszög',
    level: 2,
    question: 'Egy szabályos sokszögnek összesen 65 átlója van. Mekkora egy belső szöge (két tizedesre)?',
    options: ['≈ 152,31°', '≈ 150°', '≈ 154,29°', '≈ 147,69°'],
    correctAnswer: 0,
    explanation: 'n(n − 3)/2 = 65 ⇒ n² − 3n − 130 = 0 ⇒ n = 13. Egy belső szög 11 · 180°/13 ≈ 152,31°. (154,29° a 14-szögé, 150° a 12-szögé.)'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'seg-q21',
    questionTypeBadge: 'Magasság és szögfelező',
    figure: FIG_Q21,
    level: 3,
    question: 'Az ABC derékszögű háromszög AB átfogójához tartozó CT magasság 20°-os szöget zár be a C-ből induló CP szögfelezővel. Mekkorák a háromszög hegyesszögei?',
    options: ['25° és 65°', '20° és 70°', '35° és 55°', '45° és 45°'],
    correctAnswer: 0,
    explanation: 'CP felezi a derékszöget: ∢BCP = 45°, így ∢BCT = 45° − 20° = 25°. A BCT derékszögű háromszögben ∢TBC = 65°, ezért ∢CAB = 25°.'
  },
  {
    id: 'seg-q22',
    questionTypeBadge: 'Háromszögek száma',
    level: 3,
    question: 'Egy háromszög két oldala 35 cm és 91 cm, a harmadik oldal hossza cm-ben egész szám. Hány nem egybevágó ilyen háromszög létezik?',
    options: ['69', '70', '71', '125'],
    correctAnswer: 0,
    explanation: '56 < c < 126, az egészek 57-től 125-ig: 125 − 57 + 1 = 69 darab.'
  },
  {
    id: 'seg-q23',
    questionTypeBadge: 'Sokszög átlói',
    figure: FIG_Q23,
    level: 3,
    question: 'Egy konvex sokszög egyik csúcsából húzott összes átló a csúcs belső szögét 23°, 42°, 30°, 47° és 8°-os részekre bontja. Hányszorosa a belső szögösszeg ennek a szögnek?',
    options: ['6', '5', '7', '4'],
    correctAnswer: 0,
    explanation: '5 szögtartomány ⇒ 4 átló ⇒ n − 3 = 4, n = 7. A belső szögösszeg 900°, a szög 150°: 900°/150° = 6.'
  },
  {
    id: 'seg-q24',
    questionTypeBadge: 'Nevezetes pontok',
    level: 3,
    question: 'Egy derékszögű háromszög köré írt körének középpontja 8 cm-re van a magasságpontjától. Mekkora a köré írt kör átmérője?',
    options: ['16 cm', '8 cm', '4 cm', '24 cm'],
    correctAnswer: 0,
    explanation: 'A köré írt kör középpontja az átfogó felezőpontja, a magasságpont a derékszögű csúcs. A távolságuk a sugár (Thalész): r = 8 cm, az átmérő 16 cm.'
  },
  {
    id: 'seg-q25',
    questionTypeBadge: 'Merőleges szárú szögek',
    level: 3,
    question: 'Két merőleges szárú szög közül az egyik 23°-kal nagyobb a másiknál. Mekkorák?',
    options: ['78,5° és 101,5°', '33,5° és 56,5°', '23° és 46°', 'Nincs ilyen szögpár'],
    correctAnswer: 0,
    explanation: 'Merőleges szárú szögek egyenlők vagy összegük 180°. Nem egyenlők, tehát x + (x + 23°) = 180° ⇒ x = 78,5°, a másik 101,5°. (33,5° és 56,5° pótszögekre lenne igaz.)'
  },
  {
    id: 'seg-q26',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    level: 3,
    question: 'A 35 cm és 91 cm oldalú, egész cm-es harmadik oldalú háromszögek közül hány olyan van, amelynek két szöge egyenlő?',
    options: ['1', '2', '0', '69'],
    correctAnswer: 0,
    explanation: 'Két egyenlő szög ⇔ két egyenlő oldal. c = 35 nem lehet (56 < c), c = 91 viszont igen, tehát pontosan 1 ilyen háromszög van.'
  },
  {
    id: 'seg-q27',
    questionTypeBadge: 'Szögösszegek',
    level: 3,
    question: 'Egy konvex sokszög belső szögeinek összege a külső szögei összegének 4-szerese. Hány oldalú a sokszög?',
    options: ['10', '8', '12', '9'],
    correctAnswer: 0,
    explanation: 'A külső szögek összege mindig 360°: (n − 2) · 180° = 4 · 360° = 1440° ⇒ n − 2 = 8 ⇒ n = 10.'
  },
  {
    id: 'seg-q28',
    questionTypeBadge: 'Igaz / hamis',
    level: 3,
    question: 'Melyik állítás HAMIS?',
    options: [
      'Minden trapéz paralelogramma.',
      'Minden paralelogramma trapéz.',
      'Egy négyszögnek lehet 180°-nál nagyobb belső szöge.',
      'Két váltószög lehet egymás kiegészítő szöge.'
    ],
    correctAnswer: 0,
    explanation: 'A trapéznak elég egy párhuzamos oldalpár, ezért nem minden trapéz paralelogramma. A többi igaz: a paralelogramma speciális trapéz; konkáv négyszögnek van 180°-nál nagyobb szöge; két 90°-os váltószög kiegészítő.'
  },
  {
    id: 'seg-q29',
    questionTypeBadge: 'Nevezetes pontok helye',
    level: 3,
    question: 'Melyik pont van MINDEN háromszögben a háromszög belsejében?',
    options: ['a beírt kör középpontja', 'a köré írt kör középpontja', 'a magasságpont', 'a leghosszabb oldal felezőpontja'],
    correctAnswer: 0,
    explanation: 'A belső szögfelezők metszéspontja mindig belső pont. A köré írt kör középpontja és a magasságpont tompaszögű háromszögben kívül esik; az oldalfelezőpont a háromszög határán van.'
  },
  {
    id: 'seg-q30',
    questionTypeBadge: 'Súlypont',
    level: 3,
    question: 'Egy háromszög egyik súlyvonala 18 cm. Milyen messze van a súlypont a súlyvonal csúcsbeli végpontjától?',
    options: ['12 cm', '6 cm', '9 cm', '13,5 cm'],
    correctAnswer: 0,
    explanation: 'A súlypont a súlyvonal oldalhoz közelebbi harmadolópontja: az oldaltól 6 cm-re, a csúcstól 2/3 · 18 = 12 cm-re van.'
  }
];

export const ElementaryGeometrySummaryQuiz: React.FC<{
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
      topicId="g12-sum-elemi-geometria-quiz"
      subtopicId="elemi-geometria"
      title="7. Elemi geometria – Kvíz"
      subtitle="30 érettségi típusú kérdés 3 szinten: térelemek, szögpárok, háromszögek, nevezetes vonalak és pontok, négyszögek, sokszögek."
      badge="12. OSZTÁLY • IV. RENDSZEREZŐ ÖSSZEFOGLALÁS • KVÍZ"
      questions={ELEMENTARY_GEOMETRY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szögek',
          items: [
            'Mellékszögek: α + δ = 180°; pótszögek: összegük 90°.',
            'Csúcsszögek, váltószögek, egyállású szögek egyenlők.',
            'Merőleges szárú szögek: egyenlők vagy összegük 180°.',
            'Óra: óránként 30°, a kismutató percenként 0,5°-ot fordul.'
          ]
        },
        {
          title: 'Háromszög',
          items: [
            'Belső szögösszeg 180°, külső szögösszeg 360°.',
            'Külső szög = a két nem mellette fekvő belső szög összege.',
            '|a − b| < c < a + b (háromszög-egyenlőtlenség).',
            'K: oldalfelező merőlegesek; O: szögfelezők; M: magasságok; S: súlyvonalak (harmadolópont).'
          ]
        },
        {
          title: 'Sokszögek',
          items: [
            'Belső szögösszeg: (n − 2) · 180°; külső: 360°.',
            'Egy csúcsból n − 3 átló, összesen n(n − 3)/2.',
            'Szabályos sokszög egy szöge: (n − 2) · 180°/n.',
            'Négyzet ⊂ rombusz, téglalap ⊂ paralelogramma ⊂ trapéz.'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ElementaryGeometrySummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <ElementaryGeometrySummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default ElementaryGeometrySummaryQuiz;
