import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AcuteSineCosineMatcher } from './AcuteSineCosineMatcher';
import { AcuteSineCosineSorter } from './AcuteSineCosineSorter';

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

/** A P pontból az AB egyenesre bocsátott merőleges talppontja. */
const fFoot = (P: FPt, A: FPt, B: FPt): FPt => {
  const d = fSub(B, A);
  const t = ((P[0] - A[0]) * d[0] + (P[1] - A[1]) * d[1]) / (d[0] * d[0] + d[1] * d[1]);
  return [A[0] + t * d[0], A[1] + t * d[1]];
};

// ---- Kérdésábrák ----
const FIG_Q3 = <QRT ratio={0.75} a="3 cm" b="4 cm" c="5 cm" al="α" title="sin α = ?" />;

const FIG_Q4 = <QRT ratio={0.75} a="3 cm" b="4 cm" c="5 cm" al="α" title="cos α = ?" />;

const FIG_Q9 = (
  <QFig title="Két derékszögű háromszög, mindkettőben 40°">
    <QTri p={[[25, 122], [85, 71.7], [85, 122]]} a={['40°', undefined, undefined]} right={2} />
    <QTri p={[[105, 122], [215, 29.7], [215, 122]]} a={['40°', undefined, undefined]} right={2} />
  </QFig>
);

const FIG_Q10 = <QRT ratio={0.75} a="k" b="l" c="m" al="φ" title="cos φ = ?" />;

const FIG_Q11 = <QRT ratio={0.839} a="?" c="14 cm" al="40°" />;

const FIG_Q13 = (
  <QFig>
    <QPoly p={[[45, 124], [195, 124], [195, 37], [45, 37]]} />
    <QSeg a={[45, 124]} b={[195, 37]} color={F_ARC} />
    <QAngle v={[45, 124]} p1={[195, 124]} p2={[195, 37]} t="?" r={22} />
    <QText p={[120, 136]} t="17,3 cm" />
    <QText p={[112, 70]} t="20 cm" />
  </QFig>
);

const FIG_Q14 = <QRT ratio={0.268} a="?" c="500 m" al="15°" title="Turistaház → hegycsúcs: szintkülönbség = ?" />;

const FIG_Q16 = <QRT ratio={0.258} a="0,5 m" c="2 m" al="α = ?" title="Palló a platóhoz támasztva" />;

const FIG_Q17 = <QRT ratio={0.7} a="?" b="?" c="25 cm" al="35°" />;

const FIG_Q18 = <QRT ratio={0.414} a="1,8 cm" c="4,7 cm" al="α = ?" w={140} />;

const FIG_Q19 = <QRT ratio={0.75} a="?" c="10 cm" al="α" title="sin α = 0,6" />;

const FIG_Q21 = (() => {
  const { A, B, C } = fIso(Math.tan(fRad(68)));
  return (
    <QFig>
      <QTri p={[A, B, C]} s={['14 cm', '14 cm', '?']} a={[undefined, undefined, '44°']} />
    </QFig>
  );
})();

const FIG_Q23 = (() => {
  const { A, B, C } = fIso(Math.tan(fRad(68)));
  const T = fFoot(A, B, C);
  return (
    <QFig title="Szárhoz tartozó magasság = ?">
      <QTri p={[A, B, C]} s={['14 cm', '14 cm', undefined]} a={[undefined, undefined, '44°']} />
      <QSeg a={A} b={T} dash color={F_AUX} />
      <QRight v={T} p1={A} p2={B} r={8} />
      <QText p={fAt(fMid(A, T), [-0.35, -0.94], 11)} t="?" />
    </QFig>
  );
})();

const FIG_Q24 = (
  <QRT
    ratio={0.7}
    c="25 cm"
    al="35°"
    extra={({ A, B, C }) => {
      const T = fFoot(C, A, B);
      return (
        <g>
          <QSeg a={C} b={T} dash color={F_AUX} />
          <QRight v={T} p1={C} p2={B} r={8} />
          <QText p={fAt(fMid(C, T), [-1, 0.25], 16)} t="m = ?" />
        </g>
      );
    }}
  />
);

const FIG_Q26 = (
  <QRT
    ratio={2.75}
    flip
    a="h = ?"
    c="6 m"
    al=""
    title="Létra a falnak támasztva"
    extra={({ A, B, C }) => (
      <g>
        <QSeg a={[C[0] - 40, C[1]]} b={[A[0] + 30, A[1]]} color={F_AUX} w={1.5} />
        <QText p={[A[0] + 16, A[1] - 9]} t="70°" size={10.5} color={F_ANG} />
        <rect x={fR(C[0] - 8)} y={fR(B[1] - 6)} width="8" height={fR(C[1] - B[1] + 6)} fill="#cbd5e1" />
      </g>
    )}
  />
);

const FIG_Q29 = <QRT ratio={0.75} a="a" b="b" c="c" al="α" be="β" />;

const FIG_Q30 = <QRT ratio={0.364} a="?" c="2 m" al="20°" title="Palló: milyen magasra visz fel?" />;


const ACUTE_SINE_COSINE_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Definíciók, fogalmak (1-10)
  {
    id: 'asc-q1',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Mit nevezünk egy derékszögű háromszög α hegyesszöge szinuszának?',
    options: [
      'A szöggel szemközti befogó és az átfogó hányadosát',
      'A szög melletti befogó és az átfogó hányadosát',
      'A szöggel szemközti és a szög melletti befogó hányadosát',
      'Az átfogó és a szöggel szemközti befogó hányadosát'
    ],
    correctAnswer: 0,
    explanation: 'Definíció szerint sin α = (szöggel szemközti befogó) / (átfogó) = a / c.'
  },
  {
    id: 'asc-q2',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Mit nevezünk egy derékszögű háromszög α hegyesszöge koszinuszának?',
    options: [
      'A szög melletti befogó és az átfogó hányadosát',
      'A szöggel szemközti befogó és az átfogó hányadosát',
      'A két befogó hányadosát',
      'Az átfogó és a szög melletti befogó hányadosát'
    ],
    correctAnswer: 0,
    explanation: 'Definíció szerint cos α = (szög melletti befogó) / (átfogó) = b / c.'
  },
  {
    id: 'asc-q3',
    questionTypeBadge: 'Szinusz',
    figure: FIG_Q3,
    level: 1,
    question: 'Egy derékszögű háromszögben az α-val szemközti befogó 3 cm, a szög melletti befogó 4 cm, az átfogó 5 cm. Mennyi sin α?',
    options: ['0,6', '0,8', '0,75', '1,25'],
    correctAnswer: 0,
    explanation: 'sin α = szemközti befogó / átfogó = 3 / 5 = 0,6. (A 0,8 a cos α, a 0,75 a tg α.)'
  },
  {
    id: 'asc-q4',
    questionTypeBadge: 'Koszinusz',
    figure: FIG_Q4,
    level: 1,
    question: 'Ugyanebben a 3–4–5 cm-es háromszögben mennyi cos α (α a 3 cm-es befogóval szemközti szög)?',
    options: ['0,8', '0,6', '0,75', '1,33'],
    correctAnswer: 0,
    explanation: 'cos α = szög melletti befogó / átfogó = 4 / 5 = 0,8.'
  },
  {
    id: 'asc-q5',
    questionTypeBadge: 'Értékkészlet',
    level: 1,
    question: 'Miért nincs olyan hegyesszög, amelynek a szinusza nagyobb 1-nél?',
    options: [
      'Mert a derékszögű háromszög befogója mindig rövidebb az átfogónál',
      'Mert a szögek összege 180°',
      'Mert a számológép nem tud 1-nél nagyobb értéket kiírni',
      'Mert a szinusz mindig negatív'
    ],
    correctAnswer: 0,
    explanation: 'A szinusz egy befogó és az átfogó hányadosa. Mivel az átfogó a leghosszabb oldal, a hányados mindig 1-nél kisebb pozitív szám.'
  },
  {
    id: 'asc-q6',
    questionTypeBadge: 'Számológép',
    level: 1,
    question: 'Milyen módban kell lennie a számológépnek, ha fokokban megadott szögekkel számolunk?',
    options: ['DEG (D)', 'RAD (R)', 'GRA (G)', 'Mindegy, mindegyik ugyanazt adja'],
    correctAnswer: 0,
    explanation: 'Fokokban mért szögekhez DEG (D) mód kell. RAD módban például sin 30 ≈ −0,988 jönne ki 0,5 helyett.'
  },
  {
    id: 'asc-q7',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi sin 30°?',
    options: ['0,5', '0,866', '0,577', '1'],
    correctAnswer: 0,
    explanation: 'sin 30° = 0,5 (a 30°-os derékszögű háromszögben a szemközti befogó az átfogó fele). A 0,866 a cos 30°, a 0,577 a tg 30°.'
  },
  {
    id: 'asc-q8',
    questionTypeBadge: 'Számológép',
    level: 1,
    question: 'Melyik számológép-funkcióval kapjuk meg a hegyesszöget, ha a szinuszát ismerjük?',
    options: ['sin⁻¹', 'sin', 'cos', 'tan'],
    correctAnswer: 0,
    explanation: 'A sin⁻¹ (inverz szinusz) funkció a szinusz értékéből adja vissza a hegyesszöget, pl. sin⁻¹(0,5) = 30°.'
  },
  {
    id: 'asc-q9',
    questionTypeBadge: 'Hasonlóság',
    figure: FIG_Q9,
    level: 1,
    question: 'Két különböző méretű derékszögű háromszögnek van egy-egy 40°-os szöge. Mit mondhatunk a 40° szinuszáról a két háromszögben?',
    options: [
      'Ugyanannyi, mert a háromszögek hasonlók, így az oldalarányok egyeznek',
      'A nagyobb háromszögben nagyobb',
      'A kisebb háromszögben nagyobb',
      'Csak akkor egyezik, ha az átfogók is egyenlők'
    ],
    correctAnswer: 0,
    explanation: 'Az egyező hegyesszögű derékszögű háromszögek hasonlók, ezért a megfelelő oldalak aránya – így a szinusz is – csak a szögtől függ.'
  },
  {
    id: 'asc-q10',
    questionTypeBadge: 'Koszinusz',
    figure: FIG_Q10,
    level: 1,
    question: 'Egy derékszögű háromszögben a φ szöggel szemközti befogó k, a φ melletti befogó l, az átfogó m. Mennyi cos φ?',
    options: ['l / m', 'k / m', 'k / l', 'm / l'],
    correctAnswer: 0,
    explanation: 'A koszinusz a szög melletti befogó (l) és az átfogó (m) hányadosa: cos φ = l / m.'
  },

  // LEVEL 2: Számolások (11-20)
  {
    id: 'asc-q11',
    questionTypeBadge: 'Szinusz',
    figure: FIG_Q11,
    level: 2,
    question: 'Egy derékszögű háromszög átfogója 14 cm, egyik hegyesszöge 40°. Milyen hosszú a 40°-os szöggel szemközti befogó?',
    options: ['≈ 9,0 cm', '≈ 10,7 cm', '≈ 11,7 cm', '≈ 21,8 cm'],
    correctAnswer: 0,
    explanation: 'Szemközti befogó = 14 · sin 40° ≈ 14 · 0,6428 ≈ 9,0 cm.'
  },
  {
    id: 'asc-q12',
    questionTypeBadge: 'Koszinusz',
    level: 2,
    question: 'Egy derékszögű háromszög átfogója 14 cm, egyik hegyesszöge 40°. Milyen hosszú a 40°-os szög melletti befogó?',
    options: ['≈ 10,7 cm', '≈ 9,0 cm', '≈ 11,7 cm', '≈ 18,3 cm'],
    correctAnswer: 0,
    explanation: 'Szög melletti befogó = 14 · cos 40° ≈ 14 · 0,7660 ≈ 10,7 cm.'
  },
  {
    id: 'asc-q13',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q13,
    level: 2,
    question: 'Egy téglalap átlója 20 cm, egyik oldala 17,3 cm. Hány fokos szöget zár be az átló ezzel az oldallal?',
    options: ['≈ 30,1°', '≈ 59,9°', '≈ 40,9°', '≈ 49,1°'],
    correctAnswer: 0,
    explanation: 'Az oldal az átlóval bezárt szög melletti befogó: cos α = 17,3 / 20 = 0,865 ⇒ α ≈ 30,1°. (A 59,9° a másik oldallal bezárt szög.)'
  },
  {
    id: 'asc-q14',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q14,
    level: 2,
    question: 'A turistaháztól 500 m hosszú egyenes út vezet a hegycsúcsra, a vízszintessel 15°-os szöget zár be. Mekkora a szintkülönbség?',
    options: ['≈ 129,4 m', '≈ 134,0 m', '≈ 483,0 m', '≈ 517,6 m'],
    correctAnswer: 0,
    explanation: 'Az út az átfogó, a szintkülönbség a 15°-kal szemközti befogó: 500 · sin 15° ≈ 129,4 m. (A 134,0 m a tangenssel számolt hibás érték.)'
  },
  {
    id: 'asc-q15',
    questionTypeBadge: 'Térkép, vetület',
    level: 2,
    question: 'Ugyanezen út esetén mekkora a kiindulási pont és a hegycsúcs távolsága egy 1 : 8000 arányú térképen?',
    options: ['≈ 6,04 cm', '≈ 6,25 cm', '≈ 1,62 cm', '≈ 60,4 cm'],
    correctAnswer: 0,
    explanation: 'A térkép a vízszintes vetületet mutatja: 500 · cos 15° ≈ 483 m = 48 300 cm. 48 300 / 8000 ≈ 6,04 cm. (A 6,25 cm az út hosszából számolt hibás érték.)'
  },
  {
    id: 'asc-q16',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q16,
    level: 2,
    question: 'Egy 0,5 m magas platóhoz 2 m hosszú pallót támasztanak. Körülbelül mekkora szöget zár be a palló a vízszintessel?',
    options: ['≈ 14,5°', '≈ 14,0°', '≈ 75,5°', '≈ 26,6°'],
    correctAnswer: 0,
    explanation: 'A palló az átfogó, a magasság a szemközti befogó: sin α = 0,5 / 2 = 0,25 ⇒ α ≈ 14,5°. (A 14,0° tangenssel számolt hibás eredmény.)'
  },
  {
    id: 'asc-q17',
    questionTypeBadge: 'Hiányzó befogók',
    figure: FIG_Q17,
    level: 2,
    question: 'Egy derékszögű háromszög átfogója 25 cm, egyik hegyesszöge 35°. Mekkorák a befogói?',
    options: ['≈ 14,34 cm és ≈ 20,48 cm', '≈ 12,5 cm és ≈ 21,65 cm', '≈ 17,5 cm és ≈ 25,0 cm', '≈ 14,34 cm és ≈ 25,0 cm'],
    correctAnswer: 0,
    explanation: 'a = 25 · sin 35° ≈ 14,34 cm és b = 25 · cos 35° ≈ 20,48 cm.'
  },
  {
    id: 'asc-q18',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q18,
    level: 2,
    question: 'Egy derékszögű háromszög rövidebb befogója 1,8 cm, átfogója 4,7 cm. Mekkora a kisebbik hegyesszöge?',
    options: ['≈ 22,5°', '≈ 67,5°', '≈ 20,9°', '≈ 38,3°'],
    correctAnswer: 0,
    explanation: 'A kisebbik szög a rövidebb befogóval szemközti: sin α = 1,8 / 4,7 ≈ 0,383 ⇒ α ≈ 22,5°.'
  },
  {
    id: 'asc-q19',
    questionTypeBadge: 'Szinusz',
    figure: FIG_Q19,
    level: 2,
    question: 'Egy derékszögű háromszögben sin α = 0,6 és az átfogó 10 cm. Milyen hosszú az α-val szemközti befogó?',
    options: ['6 cm', '8 cm', '16,7 cm', '0,06 cm'],
    correctAnswer: 0,
    explanation: 'Szemközti befogó = c · sin α = 10 · 0,6 = 6 cm.'
  },
  {
    id: 'asc-q20',
    questionTypeBadge: 'Koszinusz',
    level: 2,
    question: 'Egy derékszögű háromszögben cos α = 0,25 és az átfogó 12 cm. Milyen hosszú az α melletti befogó?',
    options: ['3 cm', '48 cm', '4 cm', '9 cm'],
    correctAnswer: 0,
    explanation: 'Szög melletti befogó = c · cos α = 12 · 0,25 = 3 cm.'
  },

  // LEVEL 3: Összetett feladatok (21-30)
  {
    id: 'asc-q21',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy egyenlő szárú háromszög szárai 14 cm hosszúak, a szárak 44°-os szöget zárnak be. Milyen hosszú az alap?',
    options: ['≈ 10,49 cm', '≈ 5,24 cm', '≈ 9,73 cm', '≈ 12,98 cm'],
    correctAnswer: 0,
    explanation: 'Az alaphoz tartozó magasság felezi a szárszöget (22°) és az alapot: a/2 = 14 · sin 22° ≈ 5,24 cm, így a ≈ 10,49 cm.'
  },
  {
    id: 'asc-q22',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    level: 3,
    question: 'Ugyanebben a háromszögben (szárak 14 cm, szárszög 44°) milyen hosszú az alaphoz tartozó magasság?',
    options: ['≈ 12,98 cm', '≈ 10,49 cm', '≈ 5,24 cm', '≈ 13,40 cm'],
    correctAnswer: 0,
    explanation: 'm = 14 · cos 22° ≈ 12,98 cm (a magasság a 22°-os szög melletti befogó).'
  },
  {
    id: 'asc-q23',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_Q23,
    level: 3,
    question: 'Ugyanebben a háromszögben milyen hosszú a szárhoz tartozó magasság?',
    options: ['≈ 9,73 cm', '≈ 12,98 cm', '≈ 7,00 cm', '≈ 5,24 cm'],
    correctAnswer: 0,
    explanation: 'A terület kétféleképpen: a · m_a = b · m_b ⇒ m_b = 10,49 · 12,98 / 14 ≈ 9,73 cm. (Más úton: m_b = 14 · sin 44° ≈ 9,73 cm.)'
  },
  {
    id: 'asc-q24',
    questionTypeBadge: 'Átfogóhoz tartozó magasság',
    figure: FIG_Q24,
    level: 3,
    question: 'Egy derékszögű háromszög átfogója 25 cm, egyik hegyesszöge 35°. Mekkora az átfogóhoz tartozó magassága?',
    options: ['≈ 11,75 cm', '≈ 14,34 cm', '≈ 20,48 cm', '≈ 8,22 cm'],
    correctAnswer: 0,
    explanation: 'A befogók ≈ 14,34 cm és ≈ 20,48 cm; a terület kétféle felírásából m = a · b / c ≈ 14,34 · 20,48 / 25 ≈ 11,75 cm.'
  },
  {
    id: 'asc-q25',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    level: 3,
    question: 'Egy egyenlő szárú háromszög szárai 28 cm, alapja 10 cm hosszú. Mekkorák a szögei?',
    options: ['≈ 79,7°, 79,7° és 20,6°', '≈ 10,3°, 10,3° és 159,4°', '≈ 70,3°, 70,3° és 39,4°', '≈ 79,7°, 79,7° és 10,3°'],
    correctAnswer: 0,
    explanation: 'A magasság felezi az alapot: cos α = 5 / 28 ⇒ α ≈ 79,7°. A szárszög 180° − 2 · 79,7° ≈ 20,6°.'
  },
  {
    id: 'asc-q26',
    questionTypeBadge: 'Létra',
    figure: FIG_Q26,
    level: 3,
    question: 'Egy 6 m hosszú létra a talajjal 70°-os szöget zár be. Milyen magasan éri el a falat?',
    options: ['≈ 5,64 m', '≈ 2,05 m', '≈ 16,48 m', '≈ 6,39 m'],
    correctAnswer: 0,
    explanation: 'A létra az átfogó, a magasság a 70°-kal szemközti befogó: 6 · sin 70° ≈ 5,64 m. (A 2,05 m a talajon mért távolság, 6 · cos 70°.)'
  },
  {
    id: 'asc-q27',
    questionTypeBadge: 'Értékkészlet',
    level: 3,
    question: 'Melyik érték NEM lehet egy hegyesszög szinusza?',
    options: ['1,2', '0,99', '0,01', '0,5'],
    correctAnswer: 0,
    explanation: 'Hegyesszög szinusza mindig 0 és 1 közé esik (0 < sin α < 1), ezért 1,2 nem lehet.'
  },
  {
    id: 'asc-q28',
    questionTypeBadge: 'Terület',
    level: 3,
    question: 'Egy derékszögű háromszög átfogója 10 cm, egyik hegyesszögének szinusza 0,8. Mekkora a háromszög területe?',
    options: ['24 cm²', '48 cm²', '40 cm²', '12 cm²'],
    correctAnswer: 0,
    explanation: 'Az egyik befogó 10 · 0,8 = 8 cm, a másik Pitagorasz-tétellel √(100 − 64) = 6 cm. T = 8 · 6 / 2 = 24 cm².'
  },
  {
    id: 'asc-q29',
    questionTypeBadge: 'Pótszögek',
    figure: FIG_Q29,
    level: 3,
    question: 'Egy derékszögű háromszög két hegyesszöge α és β. Melyik állítás igaz?',
    options: ['sin α = cos β', 'sin α = sin β', 'cos α = cos β', 'sin α = 1 / cos β'],
    correctAnswer: 0,
    explanation: 'Az α-val szemközti befogó éppen a β melletti befogó, így sin α = a / c = cos β (α és β pótszögek).'
  },
  {
    id: 'asc-q30',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q30,
    level: 3,
    question: 'Egy 2 m hosszú pallót úgy támasztanak meg, hogy a vízszintessel 20°-os szöget zárjon be. Milyen magasra visz fel?',
    options: ['≈ 0,68 m', '≈ 1,88 m', '≈ 0,73 m', '≈ 5,85 m'],
    correctAnswer: 0,
    explanation: 'Magasság = 2 · sin 20° ≈ 2 · 0,342 ≈ 0,68 m. (A 0,73 m a tangenssel számolt hibás érték, az 1,88 m a vízszintes vetület.)'
  }
];

export const AcuteSineCosineQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({
  onBack,
  onSwitchToTheory,
  onSwitchToMatcher,
  onSwitchToSorter,
  initialGameMode = 'quiz'
}) => {
  return (
    <QuizTemplate
      topicId="g11-trig-szinusz-koszinusz-quiz"
      subtopicId="hegyesszog-szinusza-koszinusza"
      title="3. Hegyesszög szinusza, koszinusza – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: definíciók, számológép-használat, hiányzó oldalak és szögek valós helyzetekben."
      questions={ACUTE_SINE_COSINE_QUESTIONS}
      cheatSheets={[
        {
          title: 'Definíciók',
          items: [
            'sin α = szöggel szemközti befogó / átfogó = a / c',
            'cos α = szög melletti befogó / átfogó = b / c',
            'tg α = szemközti befogó / szög melletti befogó = a / b',
            'Hegyesszögre: 0 < sin α < 1 és 0 < cos α < 1'
          ]
        },
        {
          title: 'Számológép és visszakeresés',
          items: [
            'Mindig DEG (D) módban számolj!',
            'Szögből érték: sin, cos billentyű (pl. sin 40° ≈ 0,6428)',
            'Értékből szög: sin⁻¹, cos⁻¹ (pl. cos⁻¹(0,865) ≈ 30,1°)',
            'Befogó = átfogó · sin (szemközti) vagy átfogó · cos (melletti)'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            '500 m-es út, 15°: szintkülönbség ≈ 129,4 m, térképen (1 : 8000) ≈ 6,04 cm',
            'Szárak 14 cm, szárszög 44°: alap ≈ 10,49 cm, magasság ≈ 12,98 cm',
            'Átfogó 25 cm, 35°: befogók ≈ 14,34 és 20,48 cm, magasság ≈ 11,75 cm',
            'Szárak 28 cm, alap 10 cm: szögek ≈ 79,7°, 79,7°, 20,6°'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AcuteSineCosineMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AcuteSineCosineSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default AcuteSineCosineQuiz;
