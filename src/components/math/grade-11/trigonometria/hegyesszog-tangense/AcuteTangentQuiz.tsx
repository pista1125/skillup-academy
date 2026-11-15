import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AcuteTangentMatcher } from './AcuteTangentMatcher';
import { AcuteTangentSorter } from './AcuteTangentSorter';

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
const FIG_Q2 = (
  <QFig title="Két derékszögű háromszög, mindkettőben 38°">
    <QTri p={[[25, 122], [85, 75.1], [85, 122]]} a={['38°', undefined, undefined]} right={2} />
    <QTri p={[[105, 122], [215, 36.1], [215, 122]]} a={['38°', undefined, undefined]} right={2} />
  </QFig>
);

const FIG_Q4 = <QRT ratio={0.75} a="3 cm" b="4 cm" al="α" title="tg α = ?" />;

const FIG_Q5 = <QRT ratio={0.75} a="3 cm" b="4 cm" be="β" title="tg β = ?" />;

const FIG_Q8 = (
  <QRT
    ratio={0.78}
    a="h = ?"
    b="30 m"
    al="38°"
    title="Víztorony – emelkedési szög 38°"
    extra={({ A, B, C }) => (
      <g>
        <QSeg a={[A[0] - 12, A[1]]} b={[C[0] + 22, C[1]]} color={F_AUX} w={1.5} />
        <circle cx={fR(B[0])} cy={fR(B[1] - 6)} r="6" fill="#cbd5e1" stroke={F_AUX} />
      </g>
    )}
  />
);

const FIG_Q9 = <QRT ratio={0.78} a="7,8 cm" b="10 cm" al="α = ?" />;

const FIG_Q11 = <QRT ratio={0.75} a="12 cm" b="b = ?" al="α" title="tg α = 0,75" />;

const FIG_Q12 = <QRT ratio={0.75} a="12 cm" b="16 cm" c="c = ?" />;

const FIG_Q13 = (
  <QRT
    ratio={0.75}
    a="12 cm"
    b="16 cm"
    extra={({ A, B, C }) => {
      const T = fFoot(C, A, B);
      return (
        <g>
          <QSeg a={C} b={T} dash color={F_AUX} />
          <QRight v={T} p1={C} p2={B} r={8} />
          <QText p={fAt(fMid(C, T), [-1, 0.25], 22)} t="m = ?" />
        </g>
      );
    }}
  />
);

const FIG_Q14 = <QRT ratio={0.7} a="?" b="5 cm" al="35°" />;

const FIG_Q15 = <QRT ratio={0.7} a="5 cm" b="?" al="35°" />;

const FIG_Q16 = (
  <QFig title="Téglalap átlója">
    <QPoly p={[[55, 124], [215, 124], [215, 48.8], [55, 48.8]]} />
    <QSeg a={[55, 124]} b={[215, 48.8]} color={F_ARC} />
    <QAngle v={[55, 124]} p1={[215, 124]} p2={[215, 48.8]} t="?" r={34} tr={46} />
    <QAngle v={[55, 124]} p1={[55, 48.8]} p2={[215, 48.8]} t="?" r={14} tr={24} />
    <QText p={[135, 136]} t="50 cm" />
    <QText p={[29, 86]} t="23,5 cm" size={10} />
  </QFig>
);

const FIG_Q18 = (
  <QFig title="Téglalap: a hosszabb oldal és az átló szöge 35°">
    <QPoly p={[[56, 124], [184, 124], [184, 34.4], [56, 34.4]]} />
    <QSeg a={[56, 124]} b={[184, 34.4]} color={F_ARC} />
    <QAngle v={[56, 124]} p1={[184, 124]} p2={[184, 34.4]} t="35°" r={22} tr={36} />
    <QText p={[120, 136]} t="35 cm" />
    <QText p={[203, 79]} t="?" />
  </QFig>
);

const FIG_Q23 = (() => {
  const { A, B, C, F } = fIso(4 / 3);
  return (
    <QFig>
      <QTri p={[A, B, C]} s={['5 cm', '5 cm', '6 cm']} a={['?', undefined, undefined]} />
      <QSeg a={C} b={F} dash color={F_AUX} />
      <QRight v={F} p1={B} p2={C} r={8} />
    </QFig>
  );
})();

const FIG_Q24 = (() => {
  const { A, B, C, F } = fIso(4 / 3);
  return (
    <QFig>
      <QTri p={[A, B, C]} s={['5 cm', '5 cm', '6 cm']} />
      <QSeg a={C} b={F} dash color={F_AUX} />
      <QRight v={F} p1={B} p2={C} r={8} />
      <QAngle v={C} p1={A} p2={F} t="?" r={18} tr={30} />
    </QFig>
  );
})();

const FIG_Q25 = (() => {
  const { A, B, C, F } = fIso(Math.sqrt(3));
  return (
    <QFig title="tg 60° = ?">
      <QTri p={[A, B, C]} s={['2 cm', '2 cm', '2 cm']} a={['60°', undefined, undefined]} />
      <QSeg a={C} b={F} dash color={F_AUX} />
      <QRight v={F} p1={B} p2={C} r={8} />
    </QFig>
  );
})();

const FIG_Q26 = <QRT ratio={0.3} a="12 m" b="100 m" al="α" title="tg α = ? (az ábra nem méretarányos)" />;

const FIG_Q27 = (
  <QRT
    ratio={0.84}
    a="h = ?"
    b="árnyék: 15 m"
    al="40°"
    extra={({ A, C }) => <QSeg a={[A[0] - 12, A[1]]} b={[C[0] + 22, C[1]]} color={F_AUX} w={1.5} />}
  />
);

const FIG_Q30 = (
  <QFig>
    <QTri p={[[30, 120], [210, 120], [85.4, 36.9]]} a={['?', undefined, undefined]} right={2} />
    <QSeg a={[85.4, 36.9]} b={[85.4, 120]} dash color={F_AUX} />
    <QRight v={[85.4, 120]} p1={[210, 120]} p2={[85.4, 36.9]} r={8} />
    <QText p={[57.7, 132]} t="4 cm" />
    <QText p={[147.7, 132]} t="9 cm" />
    <QText p={[106, 82]} t="6 cm" />
  </QFig>
);


const ACUTE_TANGENT_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Fogalom és alapértékek (1–10)
  {
    id: 'at-q1',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Hogyan definiáljuk egy derékszögű háromszög α hegyesszögének tangensét?',
    options: [
      'Az α-val szemközti befogó és az α melletti befogó hosszának hányadosa',
      'Az α melletti befogó és az α-val szemközti befogó hosszának hányadosa',
      'Az α-val szemközti befogó és az átfogó hosszának hányadosa',
      'Az α melletti befogó és az átfogó hosszának hányadosa'
    ],
    correctAnswer: 0,
    explanation: 'Definíció: tg α = (α-val szemközti befogó) : (α melletti befogó). Az átfogó a tangensben nem szerepel.'
  },
  {
    id: 'at-q2',
    questionTypeBadge: 'Hasonlóság',
    figure: FIG_Q2,
    level: 1,
    question: 'Miért ugyanannyi a befogók aránya minden olyan derékszögű háromszögben, amelynek van 38°-os hegyesszöge?',
    options: [
      'Mert ezek a háromszögek hasonlók, és hasonló háromszögekben a megfelelő oldalak aránya egyenlő',
      'Mert ezek a háromszögek egybevágók',
      'Mert minden derékszögű háromszög átfogója ugyanakkora',
      'Mert a 38° nevezetes szög'
    ],
    correctAnswer: 0,
    explanation: 'Két derékszögű háromszög hasonló, ha egy hegyesszögük egyenlő (sz-sz alapeset). Hasonló háromszögekben a megfelelő oldalak aránya egyenlő, ezért a befogók aránya csak a szögtől függ.'
  },
  {
    id: 'at-q3',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi tg 45°?',
    options: ['1', '0,5', '√2', '45'],
    correctAnswer: 0,
    explanation: 'A 45°-os hegyesszögű derékszögű háromszög egyenlő szárú, a két befogó egyenlő, ezért arányuk 1.'
  },
  {
    id: 'at-q4',
    questionTypeBadge: 'Tangens',
    figure: FIG_Q4,
    level: 1,
    question: 'Egy derékszögű háromszög befogói 3 cm és 4 cm. Mennyi a 3 cm-es befogóval szemközti szög tangense?',
    options: ['0,75', '1,33', '0,6', '0,8'],
    correctAnswer: 0,
    explanation: 'A szemközti befogó 3 cm, a melletti befogó 4 cm: tg α = 3 / 4 = 0,75.'
  },
  {
    id: 'at-q5',
    questionTypeBadge: 'Tangens',
    figure: FIG_Q5,
    level: 1,
    question: 'Ugyanebben a 3–4–5 cm-es háromszögben mennyi a 4 cm-es befogóval szemközti szög tangense?',
    options: ['≈ 1,33 (= 4/3)', '0,75', '0,8', '0,6'],
    correctAnswer: 0,
    explanation: 'A másik hegyesszögnél a szerepek felcserélődnek: szemközti 4 cm, melletti 3 cm, így tg β = 4 / 3 ≈ 1,33.'
  },
  {
    id: 'at-q6',
    questionTypeBadge: 'Monotonitás',
    level: 1,
    question: 'Hogyan változik egy hegyesszög tangense, ha a szöget 0° és 90° között növeljük?',
    options: ['Növekszik', 'Csökken', 'Nem változik', 'Először nő, majd csökken'],
    correctAnswer: 0,
    explanation: 'Rögzített melletti befogó mellett nagyobb szöghöz hosszabb szemközti befogó tartozik (lásd a tankönyvi táblázatot: 0,09; 0,27; 0,47; 0,70; 1).'
  },
  {
    id: 'at-q7',
    questionTypeBadge: 'Tangens és szög',
    level: 1,
    question: 'Ha egy hegyesszög tangense 1-nél kisebb, akkor a szög…',
    options: ['45°-nál kisebb', '45°-nál nagyobb', 'pontosan 45°', 'tompaszög'],
    correctAnswer: 0,
    explanation: 'tg 45° = 1, és a tangens a szöggel együtt nő. Ha tg α < 1, akkor a szemközti befogó rövidebb a mellettinél, tehát α < 45°.'
  },
  {
    id: 'at-q8',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q8,
    level: 1,
    question: 'A toronytól 30 m-re állva a torony csúcsát 38°-os emelkedési szögben látjuk (tg 38° ≈ 0,78). Milyen magas a torony?',
    options: ['≈ 23,4 m', '≈ 38,5 m', '≈ 29,2 m', '≈ 7,8 m'],
    correctAnswer: 0,
    explanation: 'h / 30 = tg 38° ⇒ h = 30 · 0,78 = 23,4 m. (A 38,5 m a hibás osztásból – 30 : 0,78 – adódna.)'
  },
  {
    id: 'at-q9',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q9,
    level: 1,
    question: 'Tudjuk, hogy tg 38° ≈ 0,78. Mekkora a 7,8 cm és 10 cm befogójú derékszögű háromszög kisebbik hegyesszöge?',
    options: ['≈ 38°', '≈ 52°', '≈ 78°', '45°'],
    correctAnswer: 0,
    explanation: 'A kisebbik szög a rövidebb befogóval szemközti szög: tg α = 7,8 / 10 = 0,78 ⇒ α ≈ 38°. A nagyobbik szög ≈ 52°.'
  },
  {
    id: 'at-q10',
    questionTypeBadge: 'Jelölés',
    level: 1,
    question: 'Melyik a hegyesszög tangensének helyes jelölése a magyar tankönyvekben?',
    options: ['tg α', 'tan⁻¹ α', 'sin α', 'α / tg'],
    correctAnswer: 0,
    explanation: 'A tankönyv a tg α jelölést használja; a számológépeken gyakran „tan” feliratú gomb tartozik hozzá.'
  },

  // LEVEL 2: Számolás tangenssel (11–20)
  {
    id: 'at-q11',
    questionTypeBadge: 'Hiányzó befogó',
    figure: FIG_Q11,
    level: 2,
    question: 'Egy derékszögű háromszög egyik befogója 12 cm, az ezzel szemközti szög tangense 0,75. Milyen hosszú a másik befogó?',
    options: ['16 cm', '9 cm', '15 cm', '20 cm'],
    correctAnswer: 0,
    explanation: 'tg α = 12 / b = 0,75 ⇒ b = 12 : 0,75 = 16 cm. (A 9 cm a hibás szorzásból – 12 · 0,75 – jönne.)',
    breakdown: ['tg α = szemközti / melletti', '0,75 = 12 / b', 'b = 12 : 0,75 = 16 cm']
  },
  {
    id: 'at-q12',
    questionTypeBadge: 'Pitagorasz-tétel',
    figure: FIG_Q12,
    level: 2,
    question: 'Az előző háromszögben (befogók 12 cm és 16 cm) mekkora az átfogó?',
    options: ['20 cm', '28 cm', '25 cm', '18 cm'],
    correctAnswer: 0,
    explanation: 'Pitagorasz-tétellel: c = √(12² + 16²) = √(144 + 256) = √400 = 20 cm.'
  },
  {
    id: 'at-q13',
    questionTypeBadge: 'Átfogóhoz tartozó magasság',
    figure: FIG_Q13,
    level: 2,
    question: 'Mekkora a 12 cm és 16 cm befogójú derékszögű háromszög átfogóhoz tartozó magassága?',
    options: ['9,6 cm', '10 cm', '8 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'A terület kétféleképpen: a · b / 2 = c · m / 2 ⇒ m = a · b / c = 12 · 16 / 20 = 9,6 cm.'
  },
  {
    id: 'at-q14',
    questionTypeBadge: 'Hiányzó befogó',
    figure: FIG_Q14,
    level: 2,
    question: 'Egy derékszögű háromszög egyik szöge 35°, a szög MELLETTI befogó 5 cm (tg 35° ≈ 0,70). Mekkora a szöggel szemközti befogó?',
    options: ['≈ 3,5 cm', '≈ 7,1 cm', '≈ 5,7 cm', '≈ 2,5 cm'],
    correctAnswer: 0,
    explanation: 'szemközti = melletti · tg α = 5 · 0,70 = 3,5 cm.'
  },
  {
    id: 'at-q15',
    questionTypeBadge: 'Hiányzó befogó',
    figure: FIG_Q15,
    level: 2,
    question: 'Egy derékszögű háromszög egyik szöge 35°, a szöggel SZEMKÖZTI befogó 5 cm (tg 35° ≈ 0,70). Mekkora a szög melletti befogó?',
    options: ['≈ 7,1 cm', '≈ 3,5 cm', '≈ 4,3 cm', '≈ 5,7 cm'],
    correctAnswer: 0,
    explanation: 'melletti = szemközti : tg α = 5 : 0,70 ≈ 7,14 cm.'
  },
  {
    id: 'at-q16',
    questionTypeBadge: 'Téglalap átlója',
    figure: FIG_Q16,
    level: 2,
    question: 'Egy téglalap oldalai 23,5 cm és 50 cm. Hány fokos szögeket zár be az átló az oldalakkal? (tg 25° ≈ 0,47)',
    options: ['≈ 25° és ≈ 65°', '≈ 25° és ≈ 75°', '≈ 47° és ≈ 43°', '≈ 23,5° és ≈ 66,5°'],
    correctAnswer: 0,
    explanation: 'Az átló a hosszabb oldallal α szöget zár be: tg α = 23,5 / 50 = 0,47 ⇒ α ≈ 25°. A rövidebb oldallal bezárt szög ennek pótszöge: 90° − 25° = 65°.'
  },
  {
    id: 'at-q17',
    questionTypeBadge: 'Szög meghatározása',
    level: 2,
    question: 'Hány fokosak annak a derékszögű háromszögnek a szögei, amelynek befogói 10 cm és 4,7 cm? (tg 25° ≈ 0,47)',
    options: ['≈ 25°, ≈ 65° és 90°', '≈ 47°, ≈ 43° és 90°', '≈ 35°, ≈ 55° és 90°', '≈ 15°, ≈ 75° és 90°'],
    correctAnswer: 0,
    explanation: 'A rövidebb befogóval szemközti szögre tg α = 4,7 / 10 = 0,47 ⇒ α ≈ 25°; a másik hegyesszög 65°, a harmadik szög 90°.'
  },
  {
    id: 'at-q18',
    questionTypeBadge: 'Téglalap átlója',
    figure: FIG_Q18,
    level: 2,
    question: 'Egy téglalap hosszabbik oldalai 35 cm-esek, és 35°-os szöget zárnak be az átlóval (tg 35° ≈ 0,70). Mekkorák a rövidebb oldalak?',
    options: ['≈ 24,5 cm', '≈ 50 cm', '≈ 12,3 cm', '35 cm'],
    correctAnswer: 0,
    explanation: 'Az átló és a 35 cm-es oldal 35°-os szöget zár be; ezzel a szöggel szemközti befogó a rövidebb oldal: 35 · tg 35° ≈ 35 · 0,70 = 24,5 cm.'
  },
  {
    id: 'at-q19',
    questionTypeBadge: 'Hiányzó befogó',
    level: 2,
    question: 'Egy derékszögű háromszög egyik hegyesszögének tangense 0,55, a szög melletti befogó 1,6 cm. Mekkora a szöggel szemközti befogó?',
    options: ['0,88 cm', '≈ 2,91 cm', '0,55 cm', '≈ 1,05 cm'],
    correctAnswer: 0,
    explanation: 'szemközti = melletti · tg α = 1,6 · 0,55 = 0,88 cm.'
  },
  {
    id: 'at-q20',
    questionTypeBadge: 'Pitagorasz-tétel',
    level: 2,
    question: 'Mekkora az átfogója annak a derékszögű háromszögnek, amelynek befogói 1,6 cm és 0,88 cm?',
    options: ['≈ 1,83 cm', '2,48 cm', '1,6 cm', '≈ 3,33 cm'],
    correctAnswer: 0,
    explanation: 'c = √(1,6² + 0,88²) = √(2,56 + 0,7744) = √3,3344 ≈ 1,83 cm. (2,48 cm a befogók összege lenne – ez nem az átfogó.)'
  },

  // LEVEL 3: Összetett gondolkodás (21–30)
  {
    id: 'at-q21',
    questionTypeBadge: 'Pótszögek',
    level: 3,
    question: 'Egy derékszögű háromszög két hegyesszöge α és β. Mennyi tg α · tg β?',
    options: ['Mindig 1', 'Mindig 0', 'A háromszög méretétől függ', 'Mindig 2'],
    correctAnswer: 0,
    explanation: 'tg α = a / b és tg β = b / a, így a szorzatuk (a/b) · (b/a) = 1.'
  },
  {
    id: 'at-q22',
    questionTypeBadge: 'Pótszögek',
    level: 3,
    question: 'Egy derékszögű háromszögben tg α = 2. Mennyi a másik hegyesszög, a (90° − α) tangense?',
    options: ['0,5', '2', '−2', '88'],
    correctAnswer: 0,
    explanation: 'A pótszög tangense a reciprok: tg(90° − α) = 1 / tg α = 1 / 2 = 0,5.'
  },
  {
    id: 'at-q23',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_Q23,
    level: 3,
    question: 'Egy egyenlő szárú háromszög alapja 6 cm, szárai 5 cm hosszúak. Mennyi az alapon fekvő szög tangense?',
    options: ['≈ 1,33 (= 4/3)', '0,75 (= 3/4)', '≈ 1,67 (= 5/3)', '≈ 0,83 (= 5/6)'],
    correctAnswer: 0,
    explanation: 'Az alaphoz tartozó magasság két derékszögű háromszögre bont: fél alap 3 cm, magasság √(5² − 3²) = 4 cm. Az alapon fekvő szögre tg = 4 / 3 ≈ 1,33.',
    breakdown: ['Fél alap: 6 / 2 = 3 cm', 'Magasság: √(25 − 9) = 4 cm', 'tg(alapon fekvő szög) = 4 / 3']
  },
  {
    id: 'at-q24',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_Q24,
    level: 3,
    question: 'Ugyanebben az egyenlő szárú háromszögben (alap 6 cm, szár 5 cm) mennyi a szárak által bezárt szög FELÉNEK tangense?',
    options: ['0,75 (= 3/4)', '≈ 1,33 (= 4/3)', '0,6 (= 3/5)', '1,2 (= 6/5)'],
    correctAnswer: 0,
    explanation: 'A magasság felezi a szárszöget. A fél szárszöggel szemközti befogó a fél alap (3 cm), a melletti befogó a magasság (4 cm): 3 / 4 = 0,75.'
  },
  {
    id: 'at-q25',
    questionTypeBadge: 'Szabályos háromszög',
    figure: FIG_Q25,
    level: 3,
    question: 'Egy 2 cm oldalú szabályos háromszöget a magassága két derékszögű háromszögre bont. Mennyi ebből tg 60°?',
    options: ['√3 ≈ 1,73', '1/√3 ≈ 0,58', '2', '√3/2 ≈ 0,87'],
    correctAnswer: 0,
    explanation: 'A magasság √(2² − 1²) = √3 cm. A 60°-os szöggel szemközti befogó a magasság (√3), a melletti az oldal fele (1): tg 60° = √3 ≈ 1,73.'
  },
  {
    id: 'at-q26',
    questionTypeBadge: 'Emelkedő',
    figure: FIG_Q26,
    level: 3,
    question: 'Egy úton 100 m vízszintes elmozduláshoz 12 m emelkedés tartozik. Mennyi az út vízszintessel bezárt szögének tangense?',
    options: ['0,12', '12', '≈ 8,33', '0,88'],
    correctAnswer: 0,
    explanation: 'tg α = függőleges / vízszintes = 12 / 100 = 0,12 (ezt hívjuk 12%-os emelkedőnek).'
  },
  {
    id: 'at-q27',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q27,
    level: 3,
    question: 'Egy fa árnyéka 15 m hosszú, a napsugarak 40°-os szöget zárnak be a talajjal (tg 40° ≈ 0,84). Milyen magas a fa?',
    options: ['≈ 12,6 m', '≈ 17,9 m', '≈ 9,6 m', '≈ 21,0 m'],
    correctAnswer: 0,
    explanation: 'A fa magassága a 40°-os szöggel szemközti befogó, az árnyék a melletti: h = 15 · 0,84 ≈ 12,6 m.'
  },
  {
    id: 'at-q28',
    questionTypeBadge: 'Befogók aránya',
    level: 3,
    question: 'Egy derékszögű háromszögben tg α = 1,5 és az átfogó 13 cm. Mekkorák a befogók? (a az α-val szemközti)',
    options: ['b ≈ 7,21 cm, a ≈ 10,82 cm', 'b ≈ 8,67 cm, a = 13 cm', 'b = 5,2 cm, a = 7,8 cm', 'b ≈ 10,82 cm, a ≈ 7,21 cm'],
    correctAnswer: 0,
    explanation: 'a = 1,5 b, és a² + b² = 169 ⇒ 2,25 b² + b² = 169 ⇒ b² = 52 ⇒ b ≈ 7,21 cm, a = 1,5 · 7,21 ≈ 10,82 cm.',
    breakdown: ['a = 1,5 · b', '(1,5b)² + b² = 13²', '3,25 b² = 169 ⇒ b² = 52', 'b ≈ 7,21 cm; a ≈ 10,82 cm']
  },
  {
    id: 'at-q29',
    questionTypeBadge: 'Igaz–hamis',
    level: 3,
    question: 'Melyik állítás HAMIS?',
    options: [
      'Egy nagyobb, hasonló derékszögű háromszögben ugyanannak a hegyesszögnek nagyobb a tangense',
      'Hegyesszög tangense mindig pozitív szám',
      'Ha 45° < α < 90°, akkor tg α > 1',
      'Ha két hegyesszög tangense egyenlő, akkor a két szög is egyenlő'
    ],
    correctAnswer: 0,
    explanation: 'A tangens csak a szögtől függ, a háromszög méretétől nem – hasonló háromszögekben a befogók aránya ugyanaz. A többi állítás igaz.'
  },
  {
    id: 'at-q30',
    questionTypeBadge: 'Magasság és tangens',
    figure: FIG_Q30,
    level: 3,
    question: 'Egy derékszögű háromszög átfogóhoz tartozó magassága 6 cm, és az átfogót 4 cm és 9 cm hosszú szakaszokra bontja. Mennyi annak a hegyesszögnek a tangense, amelynek csúcsa a 4 cm-es szakasz végén van?',
    options: ['1,5', '≈ 0,67', '≈ 0,44', '2,25'],
    correctAnswer: 0,
    explanation: 'A magasság egy kisebb derékszögű háromszöget vág le, amelyben a szöggel szemközti befogó a magasság (6 cm), a melletti a 4 cm-es szakasz: tg = 6 / 4 = 1,5.'
  }
];

export const AcuteTangentQuiz: React.FC<{
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
      topicId="g11-trig-tangens-fogalma-quiz"
      subtopicId="hegyesszog-tangense"
      title="1. Hegyesszög tangense – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: a tangens fogalma, hiányzó befogók és szögek, gyakorlati mérések."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={ACUTE_TANGENT_QUESTIONS}
      cheatSheets={[
        {
          title: 'A tangens fogalma',
          items: [
            'tg α = (α-val szemközti befogó) : (α melletti befogó)',
            'Az arány csak a szögtől függ (hasonló derékszögű háromszögek).',
            'tg 45° = 1; α < 45° ⇒ tg α < 1; α > 45° ⇒ tg α > 1.',
            'Pótszögek: tg(90° − α) = 1 / tg α.'
          ]
        },
        {
          title: 'Hiányzó oldalak',
          items: [
            'szemközti = melletti · tg α',
            'melletti = szemközti : tg α',
            'átfogó: c = √(a² + b²) (Pitagorasz-tétel)',
            'átfogóhoz tartozó magasság: m = a · b / c'
          ]
        },
        {
          title: 'Tankönyvi értékek (közelítő)',
          items: [
            'tg 5° ≈ 0,09; tg 15° ≈ 0,27; tg 25° ≈ 0,47',
            'tg 35° ≈ 0,70; tg 38° ≈ 0,78; tg 45° = 1',
            'Víztorony: h = 30 · tg 38° ≈ 23,4 m',
            'Téglalap 23,5 × 50 cm: átló szögei ≈ 25° és 65°'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AcuteTangentMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AcuteTangentSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default AcuteTangentQuiz;
