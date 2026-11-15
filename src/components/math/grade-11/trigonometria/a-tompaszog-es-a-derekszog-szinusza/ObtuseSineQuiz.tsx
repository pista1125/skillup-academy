import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { ObtuseSineMatcher } from './ObtuseSineMatcher';
import { ObtuseSineSorter } from './ObtuseSineSorter';

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

/** Derékszögű háromszög: A bal alsó (α), C jobb alsó (derékszög), B C fölött (β). ratio = BC / AC (rajzolási arány). */
const QRT: React.FC<{
  ratio: number;
  a?: string;
  b?: string;
  c?: string;
  al?: string;
  be?: string;
  vA?: string;
  vB?: string;
  vC?: string;
  title?: string;
  flip?: boolean;
  w?: number;
  fill?: string;
  extra?: (P: { A: FPt; B: FPt; C: FPt }) => React.ReactNode;
}> = ({ ratio, a, b, c, al, be, vA, vB, vC, title, flip, fill, extra, w = 150 }) => {
  const maxW = w;
  const maxH = title ? 88 : 96;
  let W = maxW;
  let H = maxW * ratio;
  if (H > maxH) {
    H = maxH;
    W = maxH / ratio;
  }
  const y0 = 124;
  const A: FPt = [flip ? 120 + W / 2 : 120 - W / 2, y0];
  const C: FPt = [flip ? 120 - W / 2 : 120 + W / 2, y0];
  const B: FPt = [C[0], y0 - H];
  return (
    <QFig title={title}>
      <QTri p={[A, B, C]} v={[vA, vB, vC]} s={[a, b, c]} a={[al, be, undefined]} right={2} fill={fill} />
      {extra && extra({ A, B, C })}
    </QFig>
  );
};

/** Egyenlő szárú háromszög: A bal, B jobb alapcsúcs, C csúcs fent; tanA = magasság / félalap (rajzolási arány). */
const fIso = (tanA: number, maxW = 160, maxH = 92, y0 = 128): { A: FPt; B: FPt; C: FPt; F: FPt } => {
  let W = maxW;
  let H = (W / 2) * tanA;
  if (H > maxH) {
    H = maxH;
    W = (2 * H) / tanA;
  }
  return { A: [120 - W / 2, y0], B: [120 + W / 2, y0], C: [120, y0 - H], F: [120, y0] };
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

// ---- Kérdésábrák ----
const fUnitCircle = (deg: number, label: string, note: string) => {
  const O: FPt = [120, 120];
  const R = 86;
  const P: FPt = [O[0] + R * Math.cos(fRad(deg)), O[1] - R * Math.sin(fRad(deg))];
  const T: FPt = [P[0], O[1]];
  return (
    <QFig>
      <path d={`M ${O[0] - R} ${O[1]} A ${R} ${R} 0 0 1 ${O[0] + R} ${O[1]}`} fill="none" stroke={F_AUX} strokeWidth="1.5" />
      <QSeg a={[16, 120]} b={[226, 120]} color={F_INK} w={1.2} />
      <QSeg a={[120, 136]} b={[120, 24]} color={F_INK} w={1.2} />
      <QText p={[230, 112]} t="x" size={10} />
      <QText p={[128, 26]} t="y" size={10} />
      <QSeg a={O} b={P} color={F_LINE} />
      <QSeg a={P} b={T} dash color="#dc2626" />
      <QAngle v={O} p1={[226, 120]} p2={P} t={label} r={16} tr={30} />
      <QDot p={P} color={F_LINE} />
      <QText p={[P[0] - 8, P[1] - 8]} t="P" size={11.5} />
      <QText p={fAt(fMid(O, P), [0.45, 0.89], -9)} t="1" size={10.5} />
      <QText p={[T[0] - 9, (P[1] + T[1]) / 2]} t="?" anchor="end" />
      <QText p={[196, 22]} t={note} size={10.5} />
      <QText p={[O[0] + R, O[1] + 10]} t="1" size={10} />
    </QFig>
  );
};

const FIG_Q3 = fUnitCircle(150, '150°', 'sin 150° = ?');

const FIG_Q9 = <QRT ratio={0.75} a="6 cm" b="8 cm" title="T = ?" />;

const FIG_Q11 = (
  <QFig title="T = ?">
    <QTri p={[[47.3, 67.4], [210, 122], [90, 122]]} s={['45 cm', '26 cm', undefined]} a={[undefined, undefined, '128°']} />
  </QFig>
);

const FIG_Q12 = (
  <QFig>
    <QSeg a={[90, 122]} b={[40, 122]} dash color={F_AUX} />
    <QSeg a={[47.3, 67.4]} b={[47.3, 122]} dash color={F_AUX} />
    <QRight v={[47.3, 122]} p1={[90, 122]} p2={[47.3, 67.4]} r={8} />
    <QTri p={[[47.3, 67.4], [210, 122], [90, 122]]} s={['45 cm', undefined, undefined]} a={[undefined, undefined, '128°']} />
    <QText p={[42, 92]} t="m = ?" anchor="end" />
    <QText p={[84, 90]} t="26 cm" size={10} />
  </QFig>
);

const FIG_Q13 = (
  <QFig title="T = ?">
    <QTri p={[[26.4, 68.4], [209, 122], [95, 122]]} s={['38 cm', '29 cm', undefined]} a={[undefined, undefined, '142°']} />
  </QFig>
);

const FIG_Q14 = (
  <QFig title="T = 80,75 cm²">
    <QTri p={[[38.4, 77.8], [213.8, 122], [115, 122]]} s={['19 cm', '?', undefined]} a={[undefined, undefined, '150°']} />
  </QFig>
);

const FIG_Q17 = (
  <QFig title="Vitorla: T = ? (+12% anyag)">
    <QTri p={[[95, 32], [140.9, 128.4], [95, 126]]} s={[undefined, '9 m', undefined]} a={[undefined, undefined, '93°']} fill="#fef3c7" />
    <QText p={[118, 140]} t="4,4 m" />
    <QSeg a={[95, 26]} b={[95, 134]} color="#78350f" w={3} />
  </QFig>
);

const FIG_Q18 = (() => {
  const { A, B, C, D } = fPara(35, 36 / 54);
  return (
    <QFig title="T = ?">
      <QPoly p={[A, B, C, D]} />
      <QAngle v={B} p1={C} p2={A} t="145°" r={13} />
      <QText p={[(A[0] + B[0]) / 2, A[1] + 12]} t="54 mm" />
      <QText p={fAt(fMid(A, D), [-0.57, -0.82], 16)} t="36 mm" />
    </QFig>
  );
})();

const FIG_Q19 = fUnitCircle(135, '135°', 'sin 135° = ?');

const FIG_Q20 = (() => {
  const { A, B, C } = fIso(Math.tan(fRad(30)));
  return (
    <QFig title="T = ?">
      <QTri p={[A, B, C]} s={['10 cm', '10 cm', undefined]} a={[undefined, undefined, '120°']} />
    </QFig>
  );
})();

const FIG_Q26 = (
  <QFig title="T₁ : T₂ = ?">
    <QTri p={[[63.3, 95], [100, 120], [20, 120]]} s={['a', 'b', undefined]} a={[undefined, undefined, '30°']} />
    <QTri p={[[106.7, 95], [230, 120], [150, 120]]} s={['a', 'b', undefined]} a={[undefined, undefined, '150°']} />
    <QText p={[60, 70]} t="T₁" />
    <QText p={[165, 70]} t="T₂" />
  </QFig>
);

const FIG_Q28 = (() => {
  const { A, B, C, D } = fPara(38, 5 / 8);
  return (
    <QFig title="T = 20 cm²">
      <QPoly p={[A, B, C, D]} />
      <QAngle v={B} p1={C} p2={A} t="?" r={13} />
      <QText p={[(A[0] + B[0]) / 2, A[1] + 12]} t="8 cm" />
      <QText p={fAt(fMid(A, D), [-0.62, -0.79], 14)} t="5 cm" />
    </QFig>
  );
})();


const OBTUSE_SINE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Definíciók és nevezetes értékek (1–10)
  {
    id: 'os-q1',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Hogyan értelmezzük egy γ tompaszög szinuszát?',
    options: [
      'sin γ = sin (180° − γ), vagyis a kiegészítő szögének szinuszával egyenlő',
      'sin γ = sin (γ − 90°)',
      'sin γ = −sin (180° − γ)',
      'sin γ = cos (180° − γ)'
    ],
    correctAnswer: 0,
    explanation: 'Definíció: tompaszög szinusza egyenlő kiegészítő szögének szinuszával: sin γ = sin (180° − γ).'
  },
  {
    id: 'os-q2',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi sin 90°?',
    options: ['1', '0', '0,5', '90'],
    correctAnswer: 0,
    explanation: 'A derékszögű háromszög területe T = ab/2. Hogy erre is teljesüljön T = ab · sin γ / 2, a derékszög szinusza 1 kell legyen.'
  },
  {
    id: 'os-q3',
    questionTypeBadge: 'Egységkör',
    figure: FIG_Q3,
    level: 1,
    question: 'Mennyi sin 150°?',
    options: ['0,5', '−0,5', '≈ 0,866', '1,5'],
    correctAnswer: 0,
    explanation: 'sin 150° = sin (180° − 150°) = sin 30° = 0,5.'
  },
  {
    id: 'os-q4',
    questionTypeBadge: 'Kiegészítő szögek',
    level: 1,
    question: 'Melyik egyenlő sin 128°-kal?',
    options: ['sin 52°', 'sin 38°', 'cos 52°', 'sin 64°'],
    correctAnswer: 0,
    explanation: 'A 128° kiegészítő szöge 180° − 128° = 52°, ezért sin 128° = sin 52° ≈ 0,788. (cos 52° = sin 38° ≈ 0,616 – ez más érték.)'
  },
  {
    id: 'os-q5',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Miért éppen így értelmezzük a tompaszög szinuszát?',
    options: [
      'Hogy a T = ab · sin γ / 2 területképlet tompaszögű háromszögre is érvényes legyen',
      'Hogy a tompaszög szinusza negatív legyen',
      'Mert a számológép így számol, más oka nincs',
      'Hogy a Pitagorasz-tétel tompaszögű háromszögben is teljesüljön'
    ],
    correctAnswer: 0,
    explanation: 'A tankönyv a területképletből indul: az ABC tompaszögű és a CBD hegyesszögű háromszög területe egyenlő, ezért kell, hogy sin γ = sin (180° − γ) legyen.'
  },
  {
    id: 'os-q6',
    questionTypeBadge: 'Számológép',
    level: 1,
    question: 'Milyen szöget ad meg a számológép sin⁻¹ funkciója?',
    options: ['Mindig hegyesszöget (ha a szinuszérték 0 és 1 közötti)', 'Mindig tompaszöget', 'Mindkét lehetséges szöget', 'Mindig derékszöget'],
    correctAnswer: 0,
    explanation: 'A sin⁻¹ funkció hegyesszöget ad. Ha tompaszöget keresünk, akkor ennek kiegészítő szöge (180° − α) a megoldás.'
  },
  {
    id: 'os-q7',
    questionTypeBadge: 'Kiegészítő szögek',
    level: 1,
    question: 'A sin⁻¹ gomb 40°-ot ad. Mekkora az a tompaszög, amelynek ugyanennyi a szinusza?',
    options: ['140°', '130°', '220°', '50°'],
    correctAnswer: 0,
    explanation: 'A tompaszögű megoldás a kiegészítő szög: 180° − 40° = 140°. (A 130° = 90° + 40° és az 50° = 90° − 40° tipikus téves számolás.)'
  },
  {
    id: 'os-q8',
    questionTypeBadge: 'Kiegészítő szögek',
    level: 1,
    question: 'Melyik hegyesszög szinusza egyenlő sin 120°-kal?',
    options: ['60°', '30°', '20°', '40°'],
    correctAnswer: 0,
    explanation: 'sin 120° = sin (180° − 120°) = sin 60° ≈ 0,866.'
  },
  {
    id: 'os-q9',
    questionTypeBadge: 'Területképlet',
    figure: FIG_Q9,
    level: 1,
    question: 'Egy derékszögű háromszög befogói 6 cm és 8 cm. Mennyi a T = ab · sin γ / 2 képletből számolt terület?',
    options: ['24 cm²', '48 cm²', '12 cm²', '14 cm²'],
    correctAnswer: 0,
    explanation: 'A befogók 90°-os szöget zárnak be, sin 90° = 1: T = 6 · 8 · 1 / 2 = 24 cm² – ugyanannyi, mint a · b / 2.'
  },
  {
    id: 'os-q10',
    questionTypeBadge: 'Kiegészítő szögek',
    level: 1,
    question: 'Melyik szögpár tagjainak egyenlő a szinusza?',
    options: ['35° és 145°', '35° és 55°', '35° és 70°', '35° és 125°'],
    correctAnswer: 0,
    explanation: '35° + 145° = 180°, kiegészítő szögek, ezért sin 145° = sin 35°. (35° és 55° pótszögek, 35° és 125° különbsége 90° – ezek szinusza nem egyenlő.)'
  },

  // LEVEL 2: Terület és hiányzó adatok (11–20)
  {
    id: 'os-q11',
    questionTypeBadge: 'Területképlet',
    figure: FIG_Q11,
    level: 2,
    question: 'Egy háromszög két oldala 26 cm és 45 cm, közbezárt szögük 128°. Mekkora a területe?',
    options: ['≈ 461 cm²', '≈ 922 cm²', '≈ 360 cm²', '585 cm²'],
    correctAnswer: 0,
    explanation: 'T = 45 · 26 · sin 128° / 2 = 585 · sin 52° ≈ 461 cm². (A 922 cm² a 2-vel osztás elhagyásából, a 360 cm² a koszinusz használatából adódna.)'
  },
  {
    id: 'os-q12',
    questionTypeBadge: 'Magasság',
    figure: FIG_Q12,
    level: 2,
    question: 'A tankönyvi kidolgozott feladat 128°-os háromszögében mekkora a 45 cm-es oldalhoz tartozó magasság (a másik oldal 26 cm)?',
    options: ['≈ 20,5 cm (26 · sin 52°)', '≈ 16,0 cm (26 · cos 52°)', '26 cm', '≈ 35,5 cm (45 · sin 52°)'],
    correctAnswer: 0,
    explanation: 'A toldott derékszögű háromszögben a magassággal szemközti hegyesszög 180° − 128° = 52°, az átfogó 26 cm: m = 26 · sin 52° ≈ 20,5 cm.'
  },
  {
    id: 'os-q13',
    questionTypeBadge: 'Területképlet',
    figure: FIG_Q13,
    level: 2,
    question: 'Egy háromszög két oldala 38 cm és 29 cm, közbezárt szögük 142°. Mekkora a területe?',
    options: ['≈ 339 cm²', '≈ 678 cm²', '≈ 434 cm²', '551 cm²'],
    correctAnswer: 0,
    explanation: 'T = 38 · 29 · sin 142° / 2 = 551 · sin 38° ≈ 339,2 cm².'
  },
  {
    id: 'os-q14',
    questionTypeBadge: 'Hiányzó oldal',
    figure: FIG_Q14,
    level: 2,
    question: 'Egy háromszög egyik oldala 19 cm, a γ = 150°-os szög mellett fekvő másik oldal ismeretlen, a terület 80,75 cm². Mekkora a másik oldal?',
    options: ['17 cm', '8,5 cm', '≈ 9,8 cm', '34 cm'],
    correctAnswer: 0,
    explanation: 'b = 2T / (a · sin γ) = 161,5 / (19 · 0,5) = 17 cm. (A 8,5 cm a 2-es szorzó elhagyásából, a 9,8 cm a sin 150° ≈ 0,866 tévedésből jönne.)'
  },
  {
    id: 'os-q15',
    questionTypeBadge: 'Szög meghatározása',
    level: 2,
    question: 'Egy háromszög két oldala 49 mm és 54 mm, területe 1323 mm². Mekkora a közbezárt szög?',
    options: ['90°', '30°', '45°', '60°'],
    correctAnswer: 0,
    explanation: 'sin γ = 2 · 1323 / (49 · 54) = 2646 / 2646 = 1, tehát γ = 90° (egyetlen megoldás).'
  },
  {
    id: 'os-q16',
    questionTypeBadge: 'Derékszögű háromszög',
    level: 2,
    question: 'Egy derékszögű háromszögben az egyik befogó 8 m, a terület 48 m². Mekkora a másik befogó?',
    options: ['12 m', '6 m', '24 m', '3 m'],
    correctAnswer: 0,
    explanation: 'T = a · b · sin 90° / 2 ⇒ a = 2 · 48 / 8 = 12 m.'
  },
  {
    id: 'os-q17',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q17,
    level: 2,
    question: 'Egy vitorla háromszög alakú, két oldala 9 m és 4,4 m, közbezárt szögük 93°. A domborúság miatt 12%-kal több anyag kell. Hány m² anyag szükséges?',
    options: ['≈ 22,1 m²', '≈ 19,8 m²', '≈ 44,3 m²', '≈ 31,8 m²'],
    correctAnswer: 0,
    explanation: 'T = 9 · 4,4 · sin 93° / 2 ≈ 19,77 m², ennek 112%-a: 19,77 · 1,12 ≈ 22,1 m².'
  },
  {
    id: 'os-q18',
    questionTypeBadge: 'Paralelogramma',
    figure: FIG_Q18,
    level: 2,
    question: 'Egy paralelogramma oldalai 36 mm és 54 mm, az oldalak által bezárt szög 145°. Mekkora a területe?',
    options: ['≈ 1115 mm²', '≈ 558 mm²', '≈ 1592 mm²', '1944 mm²'],
    correctAnswer: 0,
    explanation: 'A paralelogramma két egybevágó háromszögre bontható: T = 36 · 54 · sin 145° = 1944 · sin 35° ≈ 1115 mm². (A 558 mm² csak egy háromszög területe.)'
  },
  {
    id: 'os-q19',
    questionTypeBadge: 'Egységkör',
    figure: FIG_Q19,
    level: 2,
    question: 'Mennyi sin 135° pontos értéke?',
    options: ['√2 / 2', '−√2 / 2', '1 / 2', '√3 / 2'],
    correctAnswer: 0,
    explanation: 'sin 135° = sin 45° = √2 / 2 ≈ 0,707.'
  },
  {
    id: 'os-q20',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_Q20,
    level: 2,
    question: 'Egy egyenlő szárú háromszög szárai 10 cm hosszúak, a szárak szöge 120°. Mekkora a területe?',
    options: ['≈ 43,3 cm²', '50 cm²', '25 cm²', '≈ 86,6 cm²'],
    correctAnswer: 0,
    explanation: 'T = 10 · 10 · sin 120° / 2 = 50 · sin 60° ≈ 43,3 cm².'
  },

  // LEVEL 3: Visszakeresés, két megoldás, összetett feladatok (21–30)
  {
    id: 'os-q21',
    questionTypeBadge: 'Két megoldás',
    level: 3,
    question: 'Dóri azt kapta, hogy sin γ ≈ 0,5213, és a számológéppel γ ≈ 31,4°-ot számolt. Mi a teljes megoldás?',
    options: ['γ ≈ 31,4° vagy γ ≈ 148,6°', 'Csak γ ≈ 31,4°', 'Csak γ ≈ 148,6°', 'γ ≈ 31,4° vagy γ ≈ 58,6°'],
    correctAnswer: 0,
    explanation: 'A sin⁻¹ csak a hegyesszöget adja. A tompaszög 180° − 31,4° = 148,6°, és ennek is 0,5213 a szinusza – mindkét háromszög létezik.'
  },
  {
    id: 'os-q22',
    questionTypeBadge: 'Két megoldás',
    level: 3,
    question: 'Egy háromszög két oldala 10 cm és 12 cm, területe 36,1 cm². Lehet-e tompaszögű, és ha igen, mekkora a közbezárt tompaszög?',
    options: ['Igen, γ ≈ 143°', 'Nem, csak a 37°-os háromszög létezik', 'Igen, γ ≈ 127°', 'Igen, γ ≈ 217°'],
    correctAnswer: 0,
    explanation: 'sin γ = 2 · 36,1 / 120 ≈ 0,602 ⇒ γ ≈ 37° vagy γ ≈ 180° − 37° = 143°. A 143°-os szög megfelel, tehát lehet tompaszögű.'
  },
  {
    id: 'os-q23',
    questionTypeBadge: 'Szög meghatározása',
    level: 3,
    question: 'Egy háromszög két oldala 8 cm és 5 cm, területe 20 cm². Mekkora a közbezárt szög?',
    options: ['γ = 90°, egyetlen megoldás', 'γ = 30° vagy γ = 150°', 'γ = 45° vagy γ = 135°', 'Nincs ilyen háromszög'],
    correctAnswer: 0,
    explanation: 'sin γ = 2 · 20 / (8 · 5) = 1 ⇒ γ = 90°. Itt nincs második megoldás, mert 180° − 90° = 90°.'
  },
  {
    id: 'os-q24',
    questionTypeBadge: 'Létezés',
    level: 3,
    question: 'Egy háromszög két oldala 6 cm és 4 cm. Lehet-e a területe 15 cm²?',
    options: [
      'Nem, mert ekkor sin γ = 1,25 > 1 lenne',
      'Igen, γ = 90° esetén',
      'Igen, γ ≈ 53,1° vagy γ ≈ 126,9° esetén',
      'Igen, de csak tompaszögű háromszögként'
    ],
    correctAnswer: 0,
    explanation: 'sin γ = 2 · 15 / (6 · 4) = 1,25, de a szinusz legfeljebb 1. A legnagyobb terület 6 · 4 / 2 = 12 cm² (γ = 90°). (Az 53,1° a fordított hányadosból, 24/30 = 0,8-ból jönne.)'
  },
  {
    id: 'os-q25',
    questionTypeBadge: 'Maximális terület',
    level: 3,
    question: 'Mekkora lehet legfeljebb annak a háromszögnek a területe, amelynek két oldala 7 cm és 10 cm?',
    options: ['35 cm² (γ = 90°)', '70 cm²', '17,5 cm²', '≈ 30,3 cm² (γ = 60°)'],
    correctAnswer: 0,
    explanation: 'T = 7 · 10 · sin γ / 2, és sin γ legnagyobb értéke 1 (γ = 90°). Így T legfeljebb 35 cm².'
  },
  {
    id: 'os-q26',
    questionTypeBadge: 'Összehasonlítás',
    figure: FIG_Q26,
    level: 3,
    question: 'Két háromszögben ugyanaz a két oldal (a és b). Az egyikben a közbezárt szög 30°, a másikban 150°. Hogyan viszonyul egymáshoz a területük?',
    options: ['Egyenlő', 'A 150°-os háromszög területe ötszörös', 'A 150°-os háromszög területe kétszeres', 'Arányuk 1 : √3'],
    correctAnswer: 0,
    explanation: 'sin 150° = sin 30° = 0,5, ezért mindkét terület ab / 4 – egyenlők.'
  },
  {
    id: 'os-q27',
    questionTypeBadge: 'Két megoldás',
    level: 3,
    question: 'Egy egyenlő szárú háromszög szárai 12 cm-esek, területe 36 cm². Mekkora lehet a szárak szöge?',
    options: ['30° vagy 150°', 'Csak 30°', '60° vagy 120°', 'Csak 150°'],
    correctAnswer: 0,
    explanation: 'sin γ = 2 · 36 / (12 · 12) = 0,5 ⇒ γ = 30° vagy γ = 180° − 30° = 150°. Mindkét egyenlő szárú háromszög létezik.'
  },
  {
    id: 'os-q28',
    questionTypeBadge: 'Paralelogramma',
    figure: FIG_Q28,
    level: 3,
    question: 'Egy paralelogramma oldalai 8 cm és 5 cm, területe 20 cm². Mekkora a paralelogramma tompaszöge?',
    options: ['150°', '120°', '135°', '90°'],
    correctAnswer: 0,
    explanation: 'T = 8 · 5 · sin α ⇒ sin α = 20 / 40 = 0,5. A hegyesszög 30°, a tompaszög 180° − 30° = 150° (a szomszédos szögek kiegészítő szögek, szinuszuk azonos).'
  },
  {
    id: 'os-q29',
    questionTypeBadge: 'Előjel',
    level: 3,
    question: 'Ha γ egy háromszög tompaszöge, melyik állítás igaz biztosan a szinuszára?',
    options: ['0 < sin γ < 1', 'sin γ < 0', 'sin γ > 1', 'sin γ = 1'],
    correctAnswer: 0,
    explanation: 'sin γ = sin (180° − γ), ahol 180° − γ hegyesszög, ennek szinusza 0 és 1 közé esik. sin γ = 1 csak derékszögre teljesül.'
  },
  {
    id: 'os-q30',
    questionTypeBadge: 'Magasság',
    level: 3,
    question: 'A 26 cm és 45 cm oldalú, 128°-os közbezárt szögű háromszögben hol van a 45 cm-es oldalhoz tartozó magasság talppontja?',
    options: [
      'A 45 cm-es oldal egyenesén, a háromszögön kívül (az oldal meghosszabbításán)',
      'A 45 cm-es oldal belsejében',
      'Pontosan a tompaszög csúcsában',
      'A 26 cm-es oldalon'
    ],
    correctAnswer: 0,
    explanation: 'Tompaszögű háromszögben a tompaszög melletti oldalakhoz tartozó magasságok talppontja a háromszögön kívül esik – ezért kell a „toldott” derékszögű háromszög, amelyben a 128° mellékszöge, 52° szerepel.'
  }
];

export const ObtuseSineQuiz: React.FC<{
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
      topicId="g11-trig-tompaszog-szinusz-quiz"
      subtopicId="a-tompaszog-es-a-derekszog-szinusza"
      title="8. A tompaszög és a derékszög szinusza – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a tompaszög és a derékszög szinusza, területszámítás, szög visszakeresése két megoldással."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={OBTUSE_SINE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíciók',
          items: [
            'Tompaszög: sin γ = sin (180° − γ)',
            'Derékszög: sin 90° = 1',
            'Kiegészítő szögek (összegük 180°) szinusza egyenlő.',
            'Háromszög bármely szögére: 0 < sin γ ≤ 1'
          ]
        },
        {
          title: 'Területképlet',
          items: [
            'T = a · b · sin γ / 2 – minden háromszögre',
            'Paralelogramma: T = a · b · sin α',
            'Hiányzó oldal: b = 2T / (a · sin γ)',
            'Legnagyobb terület adott a, b mellett: γ = 90°, T = ab / 2'
          ]
        },
        {
          title: 'Szög visszakeresése',
          items: [
            'sin γ = 2T / (a · b)',
            'sin⁻¹ ⇒ hegyesszög: γ₁',
            'Tompaszögű megoldás: γ₂ = 180° − γ₁',
            'sin γ = 1 ⇒ csak 90°; sin γ > 1 ⇒ nincs háromszög'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <ObtuseSineMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <ObtuseSineSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default ObtuseSineQuiz;
