import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TrigAreaFormulaMatcher } from './TrigAreaFormulaMatcher';
import { TrigAreaFormulaSorter } from './TrigAreaFormulaSorter';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek (nem exportált)
// Derékszög jelölése: negyedkörív ponttal (magyar jelölés).
// ---------------------------------------------------------------------------
type FPt = [number, number];
const fSub = (p: FPt, q: FPt): FPt => [p[0] - q[0], p[1] - q[1]];
const fUnit = (p: FPt): FPt => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};
const fAt = (v: FPt, u: FPt, r: number): FPt => [v[0] + u[0] * r, v[1] + u[1] * r];
const fMid = (a: FPt, b: FPt): FPt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
const fR = (n: number) => Math.round(n * 10) / 10;
const fRad = (deg: number) => (deg * Math.PI) / 180;
const F_INK = '#0f172a';
const F_LINE = '#4338ca';
const F_ARC = '#d97706';
const F_ANG = '#b45309';
const F_UNK = '#dc2626';
const F_FILL = '#e0e7ff';
const F_AUX = '#64748b';

const QFig: React.FC<{ children: React.ReactNode; title?: string }> = ({ children, title }) => (
  <svg viewBox="0 0 240 150" className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height="148" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x="120" y="15" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

const QText: React.FC<{ p: FPt; t: string; size?: number; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  p,
  t,
  size = 11,
  color,
  anchor = 'middle'
}) => (
  <text
    x={fR(p[0])}
    y={fR(p[1])}
    fontSize={size}
    fontWeight="bold"
    textAnchor={anchor}
    dominantBaseline="middle"
    fill={t.includes('?') ? F_UNK : color ?? F_INK}
  >
    {t}
  </text>
);

const QSeg: React.FC<{ a: FPt; b: FPt; color?: string; w?: number; dash?: boolean }> = ({ a, b, color = F_LINE, w = 2, dash }) => (
  <line
    x1={fR(a[0])}
    y1={fR(a[1])}
    x2={fR(b[0])}
    y2={fR(b[1])}
    stroke={color}
    strokeWidth={w}
    strokeDasharray={dash ? '4 3' : undefined}
    strokeLinecap="round"
  />
);

const QPoly: React.FC<{ p: FPt[]; fill?: string; color?: string; w?: number }> = ({ p, fill = F_FILL, color = F_LINE, w = 2 }) => (
  <polygon points={p.map((q) => `${fR(q[0])},${fR(q[1])}`).join(' ')} fill={fill} stroke={color} strokeWidth={w} strokeLinejoin="round" />
);

const QDot: React.FC<{ p: FPt; color?: string }> = ({ p, color = F_INK }) => <circle cx={fR(p[0])} cy={fR(p[1])} r="2.3" fill={color} />;

/** Derékszög: negyedkörív ponttal a v csúcsnál. */
const QRight: React.FC<{ v: FPt; p1: FPt; p2: FPt; r?: number }> = ({ v, p1, p2, r = 11 }) => {
  const u1 = fUnit(fSub(p1, v));
  const u2 = fUnit(fSub(p2, v));
  const s = fAt(v, u1, r);
  const e = fAt(v, u2, r);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const d = fAt(v, fUnit([u1[0] + u2[0], u1[1] + u2[1]]), r * 0.55);
  return (
    <g>
      <path d={`M ${fR(s[0])} ${fR(s[1])} A ${r} ${r} 0 0 ${sweep} ${fR(e[0])} ${fR(e[1])}`} fill="none" stroke={F_INK} strokeWidth="1.3" />
      <circle cx={fR(d[0])} cy={fR(d[1])} r="1.7" fill={F_INK} />
    </g>
  );
};

/** Szögív a v csúcsnál (p1 és p2 irányok között) felirattal a szögfelezőn. */
const QAngle: React.FC<{ v: FPt; p1: FPt; p2: FPt; t?: string; r?: number; tr?: number }> = ({ v, p1, p2, t, r = 15, tr }) => {
  const u1 = fUnit(fSub(p1, v));
  const u2 = fUnit(fSub(p2, v));
  const half = Math.acos(Math.max(-1, Math.min(1, u1[0] * u2[0] + u1[1] * u2[1]))) / 2;
  const auto = Math.min(70, Math.max(r + 9 + Math.max(0, (t ?? '').length - 1) * 3.2, 7 / Math.max(Math.sin(half), 0.1)));
  const obtuse = half > fRad(50);
  const rr = tr === undefined && obtuse ? Math.min(r, 10) : tr === undefined && t && auto > r + 30 ? auto - 16 : r;
  const s = fAt(v, u1, rr);
  const e = fAt(v, u2, rr);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const l = fAt(v, fUnit([u1[0] + u2[0], u1[1] + u2[1]]), tr ?? (obtuse ? rr + 8 : auto));
  return (
    <g>
      <path d={`M ${fR(s[0])} ${fR(s[1])} A ${rr} ${rr} 0 0 ${sweep} ${fR(e[0])} ${fR(e[1])}`} fill="none" stroke={F_ARC} strokeWidth="1.6" />
      {t && <QText p={l} t={t} size={10.5} color={F_ANG} />}
    </g>
  );
};

/** Oldalfelirat helye: az oldal felezőpontjából kifelé (a g ponttól elfelé). */
const fSideLbl = (a: FPt, b: FPt, g: FPt, t: string, extra = 0): FPt => {
  const m = fMid(a, b);
  let n = fUnit([-(b[1] - a[1]), b[0] - a[0]]);
  if ((m[0] - g[0]) * n[0] + (m[1] - g[1]) * n[1] < 0) n = [-n[0], -n[1]];
  return fAt(m, n, 8 + extra + Math.abs(n[0]) * t.length * 3.1);
};

type OptS = string | undefined;

/** Háromszög: v = csúcsbetűk, s[i] = az i. csúccsal szemközti oldal felirata, a[i] = szögfelirat ('' = csak ív), right = derékszög indexe. */
const QTri: React.FC<{ p: [FPt, FPt, FPt]; v?: OptS[]; s?: OptS[]; a?: OptS[]; right?: number; fill?: string; ar?: number }> = ({
  p,
  v = [],
  s = [],
  a = [],
  right,
  fill = F_FILL,
  ar
}) => {
  const g: FPt = [(p[0][0] + p[1][0] + p[2][0]) / 3, (p[0][1] + p[1][1] + p[2][1]) / 3];
  return (
    <g>
      <QPoly p={p} fill={fill} />
      {p.map((q, i) => {
        const p1 = p[(i + 1) % 3];
        const p2 = p[(i + 2) % 3];
        const vi = v[i];
        const si = s[i];
        const ai = a[i];
        return (
          <g key={i}>
            {right === i && <QRight v={q} p1={p1} p2={p2} />}
            {right !== i && ai !== undefined && <QAngle v={q} p1={p1} p2={p2} t={ai} r={ar} />}
            {vi && <QText p={fAt(q, fUnit(fSub(q, g)), 10)} t={vi} size={11.5} />}
            {si && <QText p={fSideLbl(p1, p2, g, si)} t={si} />}
          </g>
        );
      })}
    </g>
  );
};

/** Paralelogramma: A bal alsó, B jobb alsó, C, D felül; deg = A-nál rajzolt szög, ratio = AD / AB. */
const fPara = (deg: number, ratio: number, maxW = 180, maxH = 84, y0 = 122): { A: FPt; B: FPt; C: FPt; D: FPt; T: FPt } => {
  const cs = Math.cos(fRad(deg));
  const sn = Math.sin(fRad(deg));
  let La = maxW / (1 + ratio * cs);
  if (La * ratio * sn > maxH) La = maxH / (ratio * sn);
  const Lb = La * ratio;
  const x0 = 120 - (La + Lb * cs) / 2;
  const A: FPt = [x0, y0];
  const B: FPt = [x0 + La, y0];
  const D: FPt = [x0 + Lb * cs, y0 - Lb * sn];
  const C: FPt = [B[0] + Lb * cs, D[1]];
  const T: FPt = [D[0], y0];
  return { A, B, C, D, T };
};

/** Pont a K középpontú, r sugarú körön; deg a lefelé mutató iránytól mért szög (pozitív = jobbra). */
const fOnCircle = (K: FPt, r: number, deg: number): FPt => [K[0] + r * Math.sin(fRad(deg)), K[1] + r * Math.cos(fRad(deg))];

// ---- Kérdésábrák ----
const fParaFig = (o: { deg: number; ratio: number; a?: string; b?: string; g?: string; m?: string; title?: string }) => {
  const { A, B, C, D, T } = fPara(o.deg, o.ratio);
  return (
    <QFig title={o.title}>
      <QPoly p={[A, B, C, D]} />
      {o.m && (
        <>
          <QSeg a={D} b={T} dash color={F_AUX} />
          <QRight v={T} p1={B} p2={D} r={8} />
          <QText p={[T[0] + 6, (T[1] + D[1]) / 2]} t={o.m} anchor="start" />
        </>
      )}
      {o.g !== undefined && <QAngle v={A} p1={B} p2={D} t={o.g} r={16} />}
      {o.a && <QText p={[(A[0] + B[0]) / 2, A[1] + 12]} t={o.a} />}
      {o.b && <QText p={fAt(fMid(A, D), [-0.94, -0.34], 8 + o.b.length * 3)} t={o.b} />}
    </QFig>
  );
};

const fChord = (o: { theta: number; r?: string; chord?: string; ang?: string; title?: string; fill?: boolean; dist?: string; note?: string }) => {
  const K: FPt = [120, 70];
  const A = fOnCircle(K, 62, -o.theta / 2);
  const B = fOnCircle(K, 62, o.theta / 2);
  const M = fMid(A, B);
  return (
    <QFig title={o.title}>
      {o.note && <QText p={[208, 24]} t={o.note} size={10.5} />}
      <circle cx={K[0]} cy={K[1]} r="62" fill="none" stroke={F_AUX} strokeWidth="1.5" />
      <QPoly p={[K, A, B]} fill={o.fill ? '#fde68a' : F_FILL} />
      {o.dist && (
        <>
          <QSeg a={K} b={M} dash color={F_AUX} />
          <QRight v={M} p1={K} p2={B} r={7} />
          <QText p={[M[0] + 4, (K[1] + M[1]) / 2 + 2]} t={o.dist} anchor="start" size={10.5} />
        </>
      )}
      {o.ang !== undefined && <QAngle v={K} p1={A} p2={B} t={o.ang} r={o.theta > 120 ? 8 : 12} tr={o.theta > 120 ? 16 : undefined} />}
      <QDot p={K} />
      <QText p={[K[0], K[1] - 10]} t="K" size={11.5} />
      <QText p={fAt(A, [-0.8, 0.6], 10)} t="A" size={11.5} />
      <QText p={fAt(B, [0.8, 0.6], 10)} t="B" size={11.5} />
      {o.r && <QText p={fAt(fMid(K, A), [-0.5, -0.87], 9)} t={o.r} anchor="end" size={10} />}
      {o.chord && <QText p={[M[0], M[1] + 12]} t={o.chord} />}
    </QFig>
  );
};

const FIG_Q1 = (
  <QFig title="T = ?">
    <QTri p={[[110, 35], [200, 120], [40, 120]]} v={['A', 'B', 'C']} s={['a', 'b', undefined]} a={[undefined, undefined, 'γ']} />
  </QFig>
);

const FIG_Q2 = fParaFig({ deg: 55, ratio: 0.7, a: 'a', b: 'b', g: 'γ', title: 'T = ?' });

const FIG_Q3 = fParaFig({ deg: 55, ratio: 0.7, a: 'a', b: 'b', g: 'γ', m: 'mₐ = ?' });

const FIG_Q5 = (
  <QFig title="T = ?">
    <QTri p={[[74.6, 41.7], [185, 122], [50, 122]]} s={['4,5 cm', '2,8 cm', undefined]} a={[undefined, undefined, '73°']} />
  </QFig>
);

const FIG_Q8 = fParaFig({ deg: 30, ratio: 5 / 8, a: '8 cm', b: '5 cm', g: '30°', title: 'T = ?' });

const FIG_Q11 = fParaFig({ deg: 41, ratio: 1.2 / 1.3, a: '1,3 km', b: '1,2 km', g: '41°', title: 'Víztározó: T = ?' });

const FIG_Q15 = fParaFig({ deg: 45, ratio: 7.5 / 8, a: '8 cm', b: '7,5 cm', g: '?', title: 'T = 45 cm²' });

const FIG_Q17 = fChord({ theta: 112.9, r: '18 cm', chord: '30 cm', ang: '?' });

const FIG_Q18 = fChord({ theta: 112.9, r: '18 cm', chord: '30 cm', fill: true, note: 'T(AKB) = ?' });

const FIG_Q20 = (
  <QFig>
    <QPoly p={[[57, 75], [77.5, 19.1], [182.6, 75], [77.5, 130.9]]} />
    <QAngle v={[77.5, 19.1]} p1={[57, 75]} p2={[182.6, 75]} t="82,2°" r={13} />
    <QText p={[52, 42]} t="7 cm" />
    <QText p={[52, 108]} t="7 cm" />
    <QText p={[148, 38]} t="14 cm" />
    <QText p={[148, 112]} t="14 cm" />
    <QText p={[112, 76]} t="T = ?" />
  </QFig>
);

const fKite = (ang?: string) => (
  <QFig>
    <QPoly p={[[35, 75], [87.5, 44.7], [205, 75], [87.5, 105.3]]} />
    <QSeg a={[87.5, 44.7]} b={[87.5, 105.3]} dash color={F_AUX} />
    {ang && <QAngle v={[205, 75]} p1={[87.5, 44.7]} p2={[87.5, 105.3]} t={ang} r={26} />}
    <QText p={[50, 52]} t="7 cm" />
    <QText p={[50, 99]} t="7 cm" />
    <QText p={[150, 50]} t="14 cm" />
    <QText p={[150, 101]} t="14 cm" />
    <QText p={[92, 75]} t="7 cm" size={10} anchor="start" />
    {!ang && <QText p={[150, 75]} t="T = ?" />}
  </QFig>
);

const FIG_Q21 = fKite();

const FIG_Q22 = fKite('?');

const FIG_Q23 = fChord({ theta: 132.6, r: 'r = ?', chord: '12 cm', ang: '132,6°' });

const FIG_Q26 = (
  <QFig title="T = 6 cm², a szög hegyesszög">
    <QTri p={[[134.9, 37.1], [200, 122], [50, 122]]} s={['5 cm', '4 cm', undefined]} a={[undefined, undefined, '?']} />
  </QFig>
);

const FIG_Q30 = (
  <QFig title="T = 10√3 cm², a szög hegyesszög">
    <QTri p={[[106.6, 43.2], [205, 122], [45, 122]]} s={['8 cm', '5 cm', undefined]} a={[undefined, undefined, '?']} />
  </QFig>
);


const TRIG_AREA_FORMULA_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A képlet és alkalmazása (1–10)
  {
    id: 'taf-q1',
    questionTypeBadge: 'Területképlet',
    figure: FIG_Q1,
    level: 1,
    question: 'Egy háromszög két oldala a és b, az általuk közrefogott szög γ. Mekkora a területe?',
    options: ['T = a · b · sin γ / 2', 'T = a · b · sin γ', 'T = a · b · cos γ / 2', 'T = (a + b) · sin γ / 2'],
    correctAnswer: 0,
    explanation: 'Az a oldalhoz tartozó magasság mₐ = b · sin γ, így T = a · mₐ / 2 = a · b · sin γ / 2.'
  },
  {
    id: 'taf-q2',
    questionTypeBadge: 'Paralelogramma',
    figure: FIG_Q2,
    level: 1,
    question: 'Egy paralelogramma két szomszédos oldala a és b, hegyesszöge γ. Mekkora a területe?',
    options: ['T = a · b · sin γ', 'T = a · b · sin γ / 2', 'T = a · b · cos γ', 'T = a · b · tg γ'],
    correctAnswer: 0,
    explanation: 'A paralelogramma területe T = a · mₐ, és mₐ = b · sin γ, tehát T = a · b · sin γ (nincs 2-vel osztás).'
  },
  {
    id: 'taf-q3',
    questionTypeBadge: 'Paralelogramma',
    figure: FIG_Q3,
    level: 1,
    question: 'Mekkora a paralelogramma a oldalához tartozó magassága, ha a másik oldal b és a hegyesszög γ?',
    options: ['mₐ = b · sin γ', 'mₐ = b · cos γ', 'mₐ = a · sin γ', 'mₐ = b : sin γ'],
    correctAnswer: 0,
    explanation: 'A magasság egy derékszögű háromszög γ-val szemközti befogója, amelynek átfogója b: sin γ = mₐ / b ⇒ mₐ = b · sin γ.'
  },
  {
    id: 'taf-q4',
    questionTypeBadge: 'Területképlet',
    level: 1,
    question: 'Melyik szög szerepel a T = a · b · sin γ / 2 képletben?',
    options: [
      'Az a és b oldal által közrefogott szög',
      'Az a oldallal szemközti szög',
      'A háromszög legnagyobb szöge',
      'Bármelyik szöge a háromszögnek'
    ],
    correctAnswer: 0,
    explanation: 'Csak a két ismert oldal által közrefogott szöget használhatjuk – ezzel szemben van a magasság a levezetés derékszögű háromszögében.'
  },
  {
    id: 'taf-q5',
    questionTypeBadge: 'Területképlet',
    figure: FIG_Q5,
    level: 1,
    question: 'Mekkora a háromszög területe, ha a = 4,5 cm, b = 2,8 cm és a közbezárt szög γ = 73°?',
    options: ['≈ 6,0 cm²', '≈ 12,0 cm²', '6,3 cm²', '≈ 1,8 cm²'],
    correctAnswer: 0,
    explanation: 'T = (4,5 · 2,8 · sin 73°) : 2 ≈ 6,0 cm². (12,0 cm² az osztás elhagyása, 6,3 cm² a szinusz elhagyása, 1,8 cm² a koszinusz használata lenne.)'
  },
  {
    id: 'taf-q6',
    questionTypeBadge: 'Mértékegység',
    level: 1,
    question: 'Hány négyzetméter 1 km²?',
    options: ['10⁶ m²', '10³ m²', '10⁴ m²', '10⁹ m²'],
    correctAnswer: 0,
    explanation: '1 km = 10³ m, ezért 1 km² = (10³ m)² = 10⁶ m².'
  },
  {
    id: 'taf-q7',
    questionTypeBadge: 'Területképlet',
    level: 1,
    question: 'Egy háromszög két oldala 10 cm és 6 cm, közbezárt szögük 30° (sin 30° = 0,5). Mekkora a területe?',
    options: ['15 cm²', '30 cm²', '≈ 26 cm²', '60 cm²'],
    correctAnswer: 0,
    explanation: 'T = 10 · 6 · 0,5 / 2 = 15 cm².'
  },
  {
    id: 'taf-q8',
    questionTypeBadge: 'Paralelogramma',
    figure: FIG_Q8,
    level: 1,
    question: 'Egy paralelogramma oldalai 5 cm és 8 cm, hegyesszöge 30°. Mekkora a területe?',
    options: ['20 cm²', '40 cm²', '10 cm²', '≈ 34,6 cm²'],
    correctAnswer: 0,
    explanation: 'T = 5 · 8 · sin 30° = 40 · 0,5 = 20 cm².'
  },
  {
    id: 'taf-q9',
    questionTypeBadge: 'Arányos változás',
    level: 1,
    question: 'Egy háromszög két oldalát a közbezárt szög megtartásával kétszeresére növeljük. Hogyan változik a terület?',
    options: ['4-szeresére nő', '2-szeresére nő', 'Nem változik', '8-szorosára nő'],
    correctAnswer: 0,
    explanation: 'T = (2a) · (2b) · sin γ / 2 = 4 · (a · b · sin γ / 2).'
  },
  {
    id: 'taf-q10',
    questionTypeBadge: 'Levezetés',
    level: 1,
    question: 'Miért kerül a szinusz a területképletbe?',
    options: [
      'Mert a magasság egy derékszögű háromszög γ-val szemközti befogója, amelynek átfogója b',
      'Mert a szinusz mindig 1-nél nagyobb',
      'Mert a terület a szöggel egyenesen arányos',
      'Mert a koszinusz-tételből következik'
    ],
    correctAnswer: 0,
    explanation: 'A b oldal, a magasság és az a oldal egyenese derékszögű háromszöget alkot: mₐ = b · sin γ, ezt helyettesítjük a T = a · mₐ / 2 képletbe.'
  },

  // LEVEL 2: Kidolgozott és tankönyvi feladatok (11–20)
  {
    id: 'taf-q11',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q11,
    level: 2,
    question: 'A víztározót egy paralelogramma közelíti: oldalai 1,3 km és 1,2 km, hegyesszöge 41°. Mekkora a területe?',
    options: ['≈ 1,02 km²', '1,56 km²', '≈ 1,18 km²', '≈ 0,51 km²'],
    correctAnswer: 0,
    explanation: 'T = 1,3 · 1,2 · sin 41° ≈ 1,02 km² ≈ 1 km². (1,56 a szinusz elhagyása, 1,18 a koszinusz, 0,51 a hibás felezés lenne.)'
  },
  {
    id: 'taf-q12',
    questionTypeBadge: 'Paralelogramma',
    level: 2,
    question: 'Ugyanennél a paralelogrammánál mekkora az 1,3 km-es oldalhoz tartozó magasság?',
    options: ['≈ 0,79 km', '≈ 0,91 km', '≈ 0,85 km', '≈ 1,83 km'],
    correctAnswer: 0,
    explanation: 'm / 1,2 = sin 41° ⇒ m = 1,2 · sin 41° ≈ 0,79 km. (0,85 km a hibásan használt 1,3 · sin 41° lenne.)'
  },
  {
    id: 'taf-q13',
    questionTypeBadge: 'Térfogat',
    level: 2,
    question: 'A tározó területe ≈ 1 km², a víz átlagos mélysége 2,5 m. Kb. mennyi víz van benne?',
    options: ['2,5 · 10⁶ m³', '2,5 · 10³ m³', '2,5 · 10⁹ m³', '25 · 10⁶ m³'],
    correctAnswer: 0,
    explanation: '1 km² = 10⁶ m², így V ≈ 10⁶ m² · 2,5 m = 2,5 · 10⁶ m³ (két és fél millió köbméter).'
  },
  {
    id: 'taf-q14',
    questionTypeBadge: 'Mértékegység',
    level: 2,
    question: 'Hány hektoliter 2,5 · 10⁶ m³ víz?',
    options: ['25 millió hl', '2,5 millió hl', '250 millió hl', '25 ezer hl'],
    correctAnswer: 0,
    explanation: '1 m³ = 1000 l = 10 hl, ezért 2,5 · 10⁶ m³ = 2,5 · 10⁷ hl = 25 millió hektoliter.'
  },
  {
    id: 'taf-q15',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q15,
    level: 2,
    question: 'Egy paralelogramma területe 45 cm², két oldala 8 cm és 7,5 cm. Mekkora a hegyesszöge?',
    options: ['≈ 48,6°', '≈ 41,4°', '≈ 36,9°', '≈ 0,75°'],
    correctAnswer: 0,
    explanation: '45 = 8 · 7,5 · sin γ ⇒ sin γ = 45/60 = 0,75 ⇒ γ ≈ 48,6°. (41,4° a cos⁻¹, 36,9° a tg⁻¹ hibás használata lenne.)',
    breakdown: ['T = a · b · sin γ', '45 = 60 · sin γ', 'sin γ = 0,75', 'γ ≈ 48,6°']
  },
  {
    id: 'taf-q16',
    questionTypeBadge: 'Paralelogramma',
    level: 2,
    question: 'Egy paralelogramma hegyesszöge 40°, területe 0,3214 m², kerülete 3 m. Mekkorák az oldalai?',
    options: ['1 m és 0,5 m', '1,2 m és 0,3 m', '0,75 m és 0,75 m', '2 m és 1 m'],
    correctAnswer: 0,
    explanation: 'a · b · sin 40° = 0,3214 ⇒ a · b ≈ 0,5; a + b = 1,5. Az x² − 1,5x + 0,5 = 0 gyökei 1 és 0,5. A többi párnál vagy a kerület, vagy a terület nem stimmel.',
    breakdown: ['a · b = 0,3214 : sin 40° ≈ 0,5', 'a + b = 3 : 2 = 1,5', 'x² − 1,5x + 0,5 = 0 ⇒ x = 1 vagy x = 0,5']
  },
  {
    id: 'taf-q17',
    questionTypeBadge: 'Kör és húr',
    figure: FIG_Q17,
    level: 2,
    question: 'Egy 18 cm sugarú körben az AB húr 30 cm. Mekkora az AKB∢ (K a középpont)?',
    options: ['≈ 112,9°', '≈ 56,4°', '≈ 67,1°', '≈ 33,6°'],
    correctAnswer: 0,
    explanation: 'A K-ból a húrra bocsátott merőleges felezi a húrt és a szöget: sin(AKB∢/2) = 15/18 ⇒ AKB∢/2 ≈ 56,4° ⇒ AKB∢ ≈ 112,9°.'
  },
  {
    id: 'taf-q18',
    questionTypeBadge: 'Területképlet',
    figure: FIG_Q18,
    level: 2,
    question: 'Ugyanebben a körben (r = 18 cm, AB = 30 cm) mekkora az AKB háromszög területe?',
    options: ['≈ 149,2 cm²', '≈ 298,5 cm²', '162 cm²', '≈ 319,2 cm²'],
    correctAnswer: 0,
    explanation: 'A húr távolsága a középponttól √(18² − 15²) = √99 ≈ 9,95 cm, így T = 30 · 9,95 / 2 ≈ 149,2 cm². (319,2 cm² a körcikk területe.)'
  },
  {
    id: 'taf-q19',
    questionTypeBadge: 'Körcikk',
    level: 2,
    question: 'Mekkora a kisebbik AKB körcikk területe (r = 18 cm, AKB∢ ≈ 112,9°)?',
    options: ['≈ 319,2 cm²', '≈ 698,7 cm²', '≈ 149,2 cm²', '≈ 35,5 cm²'],
    correctAnswer: 0,
    explanation: 'T = r² · π · α / 360° = 324 · π · 112,9° / 360° ≈ 319,2 cm². (698,7 cm² a nagyobbik körcikk, 35,5 cm a kisebbik ív hossza.)'
  },
  {
    id: 'taf-q20',
    questionTypeBadge: 'Deltoid',
    figure: FIG_Q20,
    level: 2,
    question: 'Egy konvex deltoid két oldala 7 cm és 14 cm, és ezek 82,2°-os szöget zárnak be. Mekkora a deltoid területe?',
    options: ['≈ 97,1 cm²', '≈ 48,5 cm²', '98 cm²', '≈ 13,3 cm²'],
    correctAnswer: 0,
    explanation: 'A szimmetriatengely két egybevágó háromszögre bontja: T = 2 · (7 · 14 · sin 82,2° / 2) = 98 · sin 82,2° ≈ 97,1 cm². (48,5 cm² csak az egyik háromszög.)'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'taf-q21',
    questionTypeBadge: 'Deltoid',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy konvex deltoid oldalai 7 cm és 14 cm, és az egyik átlója is 7 cm. Mekkora a területe?',
    options: ['≈ 68,7 cm²', '≈ 137,3 cm²', '≈ 42,4 cm²', '98 cm²'],
    correctAnswer: 0,
    explanation: 'A 7 cm-es átló a két 7 cm-es oldallal szabályos háromszöget alkot. A másik átló 7 · √3/2 + √(14² − 3,5²) ≈ 6,06 + 13,56 ≈ 19,62 cm. T = 19,62 · 7 / 2 ≈ 68,7 cm².',
    breakdown: ['A 7–7–7 háromszög szabályos', 'másik átló ≈ 6,06 + 13,56 ≈ 19,62 cm', 'T = e · f / 2 ≈ 68,7 cm²']
  },
  {
    id: 'taf-q22',
    questionTypeBadge: 'Deltoid',
    figure: FIG_Q22,
    level: 3,
    question: 'Az előző deltoidnál (7 cm, 14 cm, egyik átló 7 cm) mekkora a 14 cm-es oldalak által bezárt szög?',
    options: ['≈ 29,0°', '60°', '≈ 135,5°', '≈ 14,5°'],
    correctAnswer: 0,
    explanation: 'A 14–14–7 egyenlő szárú háromszögben a szárszög fele: sin(φ/2) = 3,5/14 = 0,25 ⇒ φ/2 ≈ 14,5° ⇒ φ ≈ 29,0°. (60° a 7 cm-es oldalak szöge, 135,5° a másik két szög.)'
  },
  {
    id: 'taf-q23',
    questionTypeBadge: 'Kör és húr',
    figure: FIG_Q23,
    level: 3,
    question: 'Mekkora annak a körnek a sugara, amelyben a 132,6°-os középponti szöghöz 12 cm hosszú húr tartozik?',
    options: ['≈ 6,55 cm', '≈ 14,9 cm', '≈ 5,5 cm', '≈ 13,1 cm'],
    correctAnswer: 0,
    explanation: 'A merőleges felezi a húrt és a szöget: sin 66,3° = 6 / r ⇒ r = 6 : sin 66,3° ≈ 6,55 cm.'
  },
  {
    id: 'taf-q24',
    questionTypeBadge: 'Kör és húr',
    level: 3,
    question: 'Ugyanebben a körben (r ≈ 6,55 cm, félszög 66,3°) milyen messze van a 12 cm-es húr a középponttól?',
    options: ['≈ 2,63 cm', '≈ 13,7 cm', '6 cm', '≈ 9,2 cm'],
    correctAnswer: 0,
    explanation: 'd = r · cos 66,3° ≈ 6,55 · 0,402 ≈ 2,63 cm (vagy d = 6 : tg 66,3°).'
  },
  {
    id: 'taf-q25',
    questionTypeBadge: 'Pontosság',
    level: 3,
    question: 'Egy szoba alaprajzán minden hosszúság legfeljebb ±1%-kal térhet el a mért értéktől. Kb. hány százalékos lehet a terület bizonytalansága?',
    options: ['≈ ±2%', '±1%', '±0,01%', '≈ ±4%'],
    correctAnswer: 0,
    explanation: 'A valódi és a mért alaprajz hasonló; a területek aránya a hasonlósági arány négyzete: 1,01² = 1,0201, 0,99² = 0,9801 ⇒ kb. ±2%.'
  },
  {
    id: 'taf-q26',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q26,
    level: 3,
    question: 'Egy háromszög területe 6 cm², két oldala 4 cm és 5 cm, és ezek hegyesszöget zárnak be. Mekkora ez a szög?',
    options: ['≈ 36,9°', '≈ 53,1°', '≈ 17,5°', '≈ 31,0°'],
    correctAnswer: 0,
    explanation: '6 = 4 · 5 · sin γ / 2 ⇒ sin γ = 12 / 20 = 0,6 ⇒ γ ≈ 36,9°. (17,5° a 2-vel való szorzás elfelejtéséből – sin γ = 0,3 – jönne.)'
  },
  {
    id: 'taf-q27',
    questionTypeBadge: 'Szabályos háromszög',
    level: 3,
    question: 'Mekkora a 2 cm oldalú szabályos háromszög területe a trigonometrikus képlettel?',
    options: ['√3 ≈ 1,73 cm²', '2 cm²', '≈ 3,46 cm²', '1 cm²'],
    correctAnswer: 0,
    explanation: 'T = 2 · 2 · sin 60° / 2 = 2 · (√3/2) = √3 ≈ 1,73 cm².'
  },
  {
    id: 'taf-q28',
    questionTypeBadge: 'Összehasonlítás',
    level: 3,
    question: 'Négy háromszögben két oldal egyaránt 10 cm, a közbezárt szög más-más. Melyiknek legnagyobb a területe?',
    options: ['γ = 80°', 'γ = 60°', 'γ = 45°', 'γ = 30°'],
    correctAnswer: 0,
    explanation: 'T = 50 · sin γ, és hegyesszögekre a szinusz a szöggel együtt nő, ezért a 80°-os szöghöz tartozik a legnagyobb terület (≈ 49,2 cm²).'
  },
  {
    id: 'taf-q29',
    questionTypeBadge: 'Paralelogramma',
    level: 3,
    question: 'Egy paralelogramma oldalai 6 cm és 10 cm, területe 30 cm². Mekkora a hegyesszöge?',
    options: ['30°', '60°', '45°', '15°'],
    correctAnswer: 0,
    explanation: '30 = 6 · 10 · sin γ ⇒ sin γ = 0,5 ⇒ γ = 30°.'
  },
  {
    id: 'taf-q30',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q30,
    level: 3,
    question: 'Egy háromszög két oldala 8 cm és 5 cm, területe 10√3 cm², a közbezárt szög hegyesszög. Mekkora ez a szög?',
    options: ['60°', '30°', '45°', '75°'],
    correctAnswer: 0,
    explanation: 'sin γ = 2T / (a · b) = 20√3 / 40 = √3 / 2 ⇒ γ = 60°.'
  }
];

export const TrigAreaFormulaQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={11}
      chapterId="trigonometria"
      topicId="g11-trig-teruletkeplet-quiz"
      subtopicId="uj-teruletkeplet"
      title="6. Új területképlet – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: T = ab·sin γ/2, paralelogramma, víztározó, kör és deltoid."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={TRIG_AREA_FORMULA_QUESTIONS}
      cheatSheets={[
        {
          title: 'A területképletek',
          items: [
            'háromszög: T = a · b · sin γ / 2',
            'paralelogramma: T = a · b · sin γ',
            'magasság: mₐ = b · sin γ',
            'γ mindig a két oldal által KÖZREFOGOTT szög'
          ]
        },
        {
          title: 'Visszafelé számolás',
          items: [
            'háromszög: sin γ = 2T / (a · b)',
            'paralelogramma: sin γ = T / (a · b)',
            'kör: sin(középponti szög / 2) = (húr / 2) : r',
            'hasonló alakzatok: területarány = (hasonlósági arány)²'
          ]
        },
        {
          title: 'Mértékegységek és eredmények',
          items: [
            '1 km² = 10⁶ m²; 1 m³ = 10 hl',
            'Víztározó: T ≈ 1 km², V ≈ 2,5 · 10⁶ m³ = 25 millió hl',
            'Példa: 4,5 cm, 2,8 cm, 73° ⇒ T ≈ 6,0 cm²',
            'Deltoid 7 cm, 14 cm, 82,2° ⇒ T ≈ 97,1 cm²'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TrigAreaFormulaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TrigAreaFormulaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TrigAreaFormulaQuiz;
