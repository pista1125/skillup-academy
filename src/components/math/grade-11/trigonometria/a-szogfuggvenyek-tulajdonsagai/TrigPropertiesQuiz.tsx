import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TrigPropertiesMatcher } from './TrigPropertiesMatcher';
import { TrigPropertiesSorter } from './TrigPropertiesSorter';

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

// ---- Kérdésábrák ----
const FIG_Q1 = (() => {
  const { A, B, C, F } = fIso(Math.sqrt(3));
  return (
    <QFig title="sin 30° = ?">
      <QTri p={[A, B, C]} s={['a', 'a', 'a']} />
      <QSeg a={C} b={F} dash color={F_AUX} />
      <QRight v={F} p1={B} p2={C} r={8} />
      <QAngle v={C} p1={A} p2={F} t="30°" r={22} tr={40} />
    </QFig>
  );
})();

const FIG_Q4 = <QRT ratio={1} a="b" b="b" al="45°" title="sin 45° = ?" />;

const FIG_Q5 = (() => {
  const { A, B, C, F } = fIso(Math.sqrt(3));
  return (
    <QFig title="tg 60° = ?">
      <QTri p={[A, B, C]} s={['a', 'a', 'a']} a={['60°', undefined, undefined]} />
      <QSeg a={C} b={F} dash color={F_AUX} />
      <QRight v={F} p1={B} p2={C} r={8} />
    </QFig>
  );
})();

const FIG_Q6 = <QRT ratio={0.577} a="a" b="b" c="c" al="30°" be="60°" title="sin 60° és cos 30°" />;

const FIG_Q16 = (
  <QRT
    ratio={7.1}
    a="?"
    c="680 m"
    title="Montserrat-felvonó: szintkülönbség = ?"
    extra={({ A, B, C }) => (
      <g>
        <QAngle v={A} p1={C} p2={B} r={12} />
        <QSeg a={fAt(A, fUnit([1, -0.9]), 12)} b={[A[0] - 22, A[1] - 12]} color={F_ARC} w={1} />
        <QText p={[A[0] - 32, A[1] - 12]} t="82°" size={10.5} color={F_ANG} />
        <QSeg a={[A[0] - 40, A[1]]} b={[C[0] + 40, C[1]]} color={F_AUX} w={1.5} />
      </g>
    )}
  />
);

const FIG_Q17 = <QRT ratio={1.274} a="535 m" c="680 m" al="α = ?" title="Egyenletes emelkedés" />;

const FIG_Q18 = (
  <QFig title="Siklóernyő: melyik száll magasabban?">
    <QTri p={[[12, 124], [103.7, 59.7], [103.7, 124]]} s={['h₁ = ?', undefined, '80 m']} a={['35°', undefined, undefined]} right={2} />
    <QTri p={[[160, 124], [197.1, 64.6], [197.1, 124]]} s={['h₂ = ?', undefined, '50 m']} a={['58°', undefined, undefined]} right={2} />
  </QFig>
);

const FIG_Q19 = <QRT ratio={0.619} a="50 m" c="95 m" al="α = ?" title="Budavári Sikló" />;

const FIG_Q20 = (
  <QFig title="Sándor és az épület">
    <rect x="136" y="19" width="40" height="106" fill="#e2e8f0" stroke={F_AUX} />
    <QSeg a={[20, 125]} b={[220, 125]} color={F_AUX} w={1.5} />
    <QSeg a={[100, 125]} b={[100, 118]} color={F_INK} w={2} />
    <circle cx="100" cy="115" r="3" fill={F_INK} />
    <QSeg a={[100, 118]} b={[136, 118]} dash color={F_AUX} />
    <QSeg a={[100, 118]} b={[136, 19]} color={F_ARC} />
    <QRight v={[136, 118]} p1={[100, 118]} p2={[136, 19]} r={8} />
    <QAngle v={[100, 118]} p1={[136, 118]} p2={[136, 19]} t="70°" r={14} />
    <QText p={[118, 136]} t="8 m" />
    <QText p={[80, 112]} t="1,6 m" size={10} />
    <QSeg a={[190, 19]} b={[190, 125]} color={F_INK} w={1} />
    <QText p={[212, 72]} t="h = ?" />
  </QFig>
);

const FIG_Q21 = (
  <QFig title="Medence hosszmetszete (torzított)">
    <QPoly p={[[35, 40], [195, 40], [195, 100], [35, 82]]} fill="#dbeafe" color="#2563eb" />
    <QSeg a={[35, 82]} b={[195, 82]} dash color={F_AUX} w={1.2} />
    <QAngle v={[35, 82]} p1={[195, 82]} p2={[195, 100]} r={40} />
    <QSeg a={[76, 86]} b={[90, 112]} color={F_ARC} w={1} />
    <QText p={[100, 118]} t="α = ?" size={10.5} />
    <QText p={[120, 31]} t="20 m" />
    <QText p={[19, 61]} t="1,2 m" size={9.5} />
    <QText p={[216, 70]} t="1,6 m" size={9.5} />
  </QFig>
);

const FIG_Q22 = (
  <QRT
    ratio={7.1}
    a="535 m"
    c="út = ?"
    extra={({ A, B, C }) => (
      <g>
        <QAngle v={A} p1={C} p2={B} r={12} />
        <QSeg a={fAt(A, fUnit([1, -0.9]), 12)} b={[A[0] - 22, A[1] - 12]} color={F_ARC} w={1} />
        <QText p={[A[0] - 32, A[1] - 12]} t="82°" size={10.5} color={F_ANG} />
      </g>
    )}
  />
);

const FIG_Q28 = (() => {
  const { A, B, C, F } = fIso(Math.sqrt(3));
  return (
    <QFig>
      <QTri p={[A, B, C]} s={['8 cm', '8 cm', '8 cm']} />
      <QSeg a={C} b={F} dash color={F_AUX} />
      <QRight v={F} p1={B} p2={C} r={8} />
      <QText p={[102, 100]} t="m = ?" />
    </QFig>
  );
})();

const FIG_Q29 = (
  <QFig>
    <QPoly p={[[75, 120], [165, 120], [165, 30], [75, 30]]} />
    <QSeg a={[75, 120]} b={[165, 30]} color={F_ARC} />
    <QText p={[110, 66]} t="10 cm" />
    <QText p={[120, 132]} t="?" />
    <QText p={[178, 75]} t="?" />
  </QFig>
);


const TRIG_PROPERTIES_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Nevezetes szögek és alapösszefüggések (1-10)
  {
    id: 'tp-q1',
    questionTypeBadge: 'Nevezetes érték',
    figure: FIG_Q1,
    level: 1,
    question: 'Mennyi sin 30° pontos értéke?',
    options: ['1/2', '√3/2', '√2/2', '√3/3'],
    correctAnswer: 0,
    explanation: 'A szabályos háromszög felében a 30°-kal szemközti befogó a/2, az átfogó a, így sin 30° = (a/2) / a = 1/2.'
  },
  {
    id: 'tp-q2',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi cos 30° pontos értéke?',
    options: ['√3/2', '1/2', '√3', '√2/2'],
    correctAnswer: 0,
    explanation: 'A 30° melletti befogó a szabályos háromszög magassága, (√3/2)·a, így cos 30° = √3/2.'
  },
  {
    id: 'tp-q3',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi tg 45°?',
    options: ['1', '√2/2', '√2', '√3'],
    correctAnswer: 0,
    explanation: 'Az egyenlő szárú derékszögű háromszögben a két befogó egyenlő, így tg 45° = b / b = 1.'
  },
  {
    id: 'tp-q4',
    questionTypeBadge: 'Nevezetes érték',
    figure: FIG_Q4,
    level: 1,
    question: 'Mennyi sin 45° pontos értéke?',
    options: ['√2/2', '1/2', '√2', '1'],
    correctAnswer: 0,
    explanation: 'sin 45° = b / (b·√2) = 1/√2 = √2/2 ≈ 0,707.'
  },
  {
    id: 'tp-q5',
    questionTypeBadge: 'Nevezetes érték',
    figure: FIG_Q5,
    level: 1,
    question: 'Mennyi tg 60° pontos értéke?',
    options: ['√3', '√3/3', '√3/2', '2'],
    correctAnswer: 0,
    explanation: 'tg 60° = ((√3/2)·a) / (a/2) = √3 ≈ 1,732.'
  },
  {
    id: 'tp-q6',
    questionTypeBadge: 'Pótszögek',
    figure: FIG_Q6,
    level: 1,
    question: 'Miért egyenlő sin 60° és cos 30°?',
    options: [
      'Mert 60° és 30° pótszögek, és hegyesszög szinusza egyenlő pótszögének koszinuszával',
      'Mert mindkettő 1/2',
      'Mert a szinusz és a koszinusz mindig egyenlő',
      'Mert 60° = 2 · 30°'
    ],
    correctAnswer: 0,
    explanation: '60° + 30° = 90°, így pótszögek: sin 60° = cos(90° − 60°) = cos 30° = √3/2.'
  },
  {
    id: 'tp-q7',
    questionTypeBadge: 'Azonosság',
    level: 1,
    question: 'Melyik azonosság igaz minden hegyesszögre?',
    options: ['sin²α + cos²α = 1', 'sin α + cos α = 1', 'sin α · cos α = 1', 'sin²α − cos²α = 1'],
    correctAnswer: 0,
    explanation: 'Egységnyi átfogójú derékszögű háromszögben a befogók sin α és cos α; a Pitagorasz-tétel szerint sin²α + cos²α = 1.'
  },
  {
    id: 'tp-q8',
    questionTypeBadge: 'Azonosság',
    level: 1,
    question: 'Hogyan fejezhető ki tg α a szinusszal és a koszinusszal?',
    options: ['tg α = sin α / cos α', 'tg α = cos α / sin α', 'tg α = sin α · cos α', 'tg α = 1 − sin α'],
    correctAnswer: 0,
    explanation: 'sin α / cos α = (a/c) / (b/c) = a/b = tg α.'
  },
  {
    id: 'tp-q9',
    questionTypeBadge: 'Értékkészlet',
    level: 1,
    question: 'Milyen értékeket vehet fel egy hegyesszög szinusza?',
    options: ['0 < sin α < 1', '−1 < sin α < 1', '0 ≤ sin α ≤ 2', 'Bármilyen pozitív számot'],
    correctAnswer: 0,
    explanation: 'A szinusz két pozitív hosszúság hányadosa, és a befogó rövidebb az átfogónál, így 0 < sin α < 1. (Bármilyen pozitív érték csak a tangensre igaz.)'
  },
  {
    id: 'tp-q10',
    questionTypeBadge: 'Nevezetes érték',
    level: 1,
    question: 'Mennyi tg 30° pontos értéke?',
    options: ['√3/3', '√3', '1/2', '√3/2'],
    correctAnswer: 0,
    explanation: 'tg 30° = (a/2) / ((√3/2)·a) = 1/√3 = √3/3 ≈ 0,577.'
  },

  // LEVEL 2: Számolás az azonosságokkal, alkalmazások (11-20)
  {
    id: 'tp-q11',
    questionTypeBadge: 'Pitagoraszi azonosság',
    level: 2,
    question: 'Egy hegyesszög szinusza 0,8. Mennyi a koszinusza?',
    options: ['0,6', '0,2', '0,36', '1,25'],
    correctAnswer: 0,
    explanation: 'cos α = √(1 − sin²α) = √(1 − 0,64) = √0,36 = 0,6. (A 0,2 az 1 − 0,8 hibás „azonosságból” jönne.)'
  },
  {
    id: 'tp-q12',
    questionTypeBadge: 'Azonosság',
    level: 2,
    question: 'Egy hegyesszög szinusza 0,8. Mennyi a tangense?',
    options: ['4/3', '3/4', '0,48', '5/3'],
    correctAnswer: 0,
    explanation: 'cos α = 0,6, így tg α = sin α / cos α = 0,8 / 0,6 = 4/3.'
  },
  {
    id: 'tp-q13',
    questionTypeBadge: 'Pótszögek',
    level: 2,
    question: 'Számológép nélkül: mennyi sin²37° + sin 37° − cos 53° + sin²53°?',
    options: ['1', '0', '2', '2 · sin 37°'],
    correctAnswer: 0,
    explanation: 'sin 53° = cos 37° és cos 53° = sin 37° (pótszögek). Így sin²37° + cos²37° + sin 37° − sin 37° = 1.'
  },
  {
    id: 'tp-q14',
    questionTypeBadge: 'Pitagoraszi azonosság',
    level: 2,
    question: 'Egy hegyesszög koszinusza 5/13. Mennyi a szinusza?',
    options: ['12/13', '8/13', '5/12', '13/12'],
    correctAnswer: 0,
    explanation: 'sin α = √(1 − 25/169) = √(144/169) = 12/13.'
  },
  {
    id: 'tp-q15',
    questionTypeBadge: 'Pótszögek',
    level: 2,
    question: 'sin 25° egyenlő melyik szög koszinuszával?',
    options: ['65°', '25°', '155°', '75°'],
    correctAnswer: 0,
    explanation: 'Pótszögekre sin α = cos(90° − α), így sin 25° = cos 65°.'
  },
  {
    id: 'tp-q16',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q16,
    level: 2,
    question: 'Egy útikönyv szerint a Montserrat-felvonó emelkedése 82°, hossza 680 m. Ha végig ennyi lenne a hajlásszög, mekkora szintkülönbséget győzne le?',
    options: ['≈ 673 m', '≈ 535 m', '≈ 95 m', '≈ 687 m'],
    correctAnswer: 0,
    explanation: '680 · sin 82° ≈ 673,4 m — ez nem egyezik az útikönyvben megadott 535 m-rel, tehát az adatok ellentmondanak egymásnak.'
  },
  {
    id: 'tp-q17',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q17,
    level: 2,
    question: 'Mekkora lenne a Montserrat-felvonó emelkedési szöge, ha egyenletesen emelkedve 680 m-es úton 535 m-t győzne le?',
    options: ['≈ 51,9°', '≈ 38,1°', '≈ 82,0°', '≈ 38,2°'],
    correctAnswer: 0,
    explanation: 'sin α = 535 / 680 ≈ 0,787 ⇒ α ≈ 51,9°. (A 38,1° a pótszög, a 38,2° pedig a tangenssel számolt hibás eredmény.)'
  },
  {
    id: 'tp-q18',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q18,
    level: 2,
    question: 'A siklóernyős mikor száll magasabban: 80 m-es kötélnél 35°-os, vagy 50 m-es kötélnél 58°-os emelkedési szögnél?',
    options: [
      '80 m-es kötélnél (≈ 45,9 m a 42,4 m-rel szemben)',
      '50 m-es kötélnél (≈ 42,4 m a 45,9 m-rel szemben)',
      'Mindkét esetben ugyanolyan magasan',
      'A kötélhossz nélkül nem dönthető el'
    ],
    correctAnswer: 0,
    explanation: 'Magasság = kötélhossz · sin α: 80 · sin 35° ≈ 45,9 m, illetve 50 · sin 58° ≈ 42,4 m.'
  },
  {
    id: 'tp-q19',
    questionTypeBadge: 'Szög meghatározása',
    figure: FIG_Q19,
    level: 2,
    question: 'A Budavári Sikló két végpontjának szintkülönbsége 50 m, a pálya hossza 95 m. Mekkora szöget zár be a pálya a vízszintessel?',
    options: ['≈ 31,8°', '≈ 58,2°', '≈ 27,8°', '≈ 62,2°'],
    correctAnswer: 0,
    explanation: 'A pálya az átfogó: sin α = 50 / 95 ≈ 0,526 ⇒ α ≈ 31,8°.'
  },
  {
    id: 'tp-q20',
    questionTypeBadge: 'Emelkedési szög',
    figure: FIG_Q20,
    level: 2,
    question: 'Sándor 8 m-re áll egy épülettől, szemmagassága 1,6 m, és az épület tetejét 70°-os emelkedési szögben látja. Milyen magas az épület?',
    options: ['≈ 23,6 m', '≈ 22,0 m', '≈ 9,1 m', '≈ 4,5 m'],
    correctAnswer: 0,
    explanation: 'A szemmagasság fölötti rész 8 · tg 70° ≈ 21,98 m; ehhez hozzá kell adni a szemmagasságot: ≈ 23,6 m. (A 22,0 m-nél kimaradt az 1,6 m.)'
  },

  // LEVEL 3: Összetett feladatok (21-30)
  {
    id: 'tp-q21',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy 20 m hosszú medence az egyik végén 120 cm, a másikon 160 cm mély, és egyenletesen mélyül. Mekkora szöget zár be az alja a vízszintessel?',
    options: ['≈ 1,15°', '≈ 11,3°', '≈ 2,0°', '≈ 0,40°'],
    correctAnswer: 0,
    explanation: 'A mélységkülönbség 40 cm = 0,4 m, így tg α = 0,4 / 20 = 0,02 ⇒ α ≈ 1,15°. (Mivel a szög nagyon kicsi, a sin-nel számolt érték is ≈ 1,15°.)'
  },
  {
    id: 'tp-q22',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q22,
    level: 3,
    question: 'Mekkora utat tenne meg a Montserrat-felvonó, ha 82°-os egyenletes emelkedéssel 535 m szintkülönbséget győzne le?',
    options: ['≈ 540,3 m', '≈ 529,8 m', '≈ 3807 m', '≈ 75,2 m'],
    correctAnswer: 0,
    explanation: 'A szintkülönbség a 82°-kal szemközti befogó: út = 535 / sin 82° ≈ 540,3 m.'
  },
  {
    id: 'tp-q23',
    questionTypeBadge: 'Pitagoraszi azonosság',
    level: 3,
    question: 'Egy hegyesszög szinusza 1/3. Mennyi a koszinusza pontosan?',
    options: ['2√2/3', '2/3', '√2/3', '8/9'],
    correctAnswer: 0,
    explanation: 'cos α = √(1 − 1/9) = √(8/9) = √8 / 3 = 2√2/3 ≈ 0,943. (A 8/9 a cos²α, nem a cos α.)'
  },
  {
    id: 'tp-q24',
    questionTypeBadge: 'Azonosság',
    level: 3,
    question: 'Egy hegyesszög tangense 2. Mennyi a szinusza?',
    options: ['2√5/5 ≈ 0,894', '√5/5 ≈ 0,447', '2/3', '1/2'],
    correctAnswer: 0,
    explanation: 'Legyen a befogók aránya 2 : 1, ekkor az átfogó √5. sin α = 2/√5 = 2√5/5 ≈ 0,894.'
  },
  {
    id: 'tp-q25',
    questionTypeBadge: 'Pótszögek',
    level: 3,
    question: 'Mennyi sin²20° + sin²70°?',
    options: ['1', '0', '1/2', '2'],
    correctAnswer: 0,
    explanation: 'sin 70° = cos 20° (pótszögek), így sin²20° + cos²20° = 1.'
  },
  {
    id: 'tp-q26',
    questionTypeBadge: 'Nevezetes érték',
    level: 3,
    question: 'Mennyi sin 30° · cos 60° + cos 30° · sin 60° pontos értéke?',
    options: ['1', '1/2', '√3/2', '3/4'],
    correctAnswer: 0,
    explanation: '(1/2) · (1/2) + (√3/2) · (√3/2) = 1/4 + 3/4 = 1.'
  },
  {
    id: 'tp-q27',
    questionTypeBadge: 'Pótszögek',
    level: 3,
    question: 'Mennyi tg 30° · tg 60°?',
    options: ['1', '√3', '3', '1/3'],
    correctAnswer: 0,
    explanation: '(√3/3) · √3 = 3/3 = 1. Általában is: pótszögek tangenseinek szorzata 1, mert tg(90° − α) = 1 / tg α.'
  },
  {
    id: 'tp-q28',
    questionTypeBadge: 'Szabályos háromszög',
    figure: FIG_Q28,
    level: 3,
    question: 'Egy szabályos háromszög oldala 8 cm. Milyen hosszú a magassága pontosan?',
    options: ['4√3 cm ≈ 6,93 cm', '8√3 cm ≈ 13,86 cm', '4√2 cm ≈ 5,66 cm', '6 cm'],
    correctAnswer: 0,
    explanation: 'm = a · sin 60° = 8 · √3/2 = 4√3 ≈ 6,93 cm.'
  },
  {
    id: 'tp-q29',
    questionTypeBadge: 'Négyzet átlója',
    figure: FIG_Q29,
    level: 3,
    question: 'Egy négyzet átlója 10 cm. Milyen hosszú az oldala pontosan?',
    options: ['5√2 cm ≈ 7,07 cm', '10√2 cm ≈ 14,14 cm', '5 cm', '10/√3 cm ≈ 5,77 cm'],
    correctAnswer: 0,
    explanation: 'Az átló 45°-os szöget zár be az oldallal: oldal = 10 · cos 45° = 10 · √2/2 = 5√2 ≈ 7,07 cm.'
  },
  {
    id: 'tp-q30',
    questionTypeBadge: 'Pitagoraszi azonosság',
    level: 3,
    question: 'Létezik-e olyan hegyesszög, amelynek szinusza 0,6 és koszinusza 0,7?',
    options: [
      'Nem, mert 0,6² + 0,7² = 0,85 ≠ 1',
      'Igen, mert mindkét érték 0 és 1 közé esik',
      'Igen, α ≈ 36,9°',
      'Csak tompaszögként létezik'
    ],
    correctAnswer: 0,
    explanation: 'Minden hegyesszögre sin²α + cos²α = 1 teljesül, de 0,36 + 0,49 = 0,85, így ilyen szög nincs.'
  }
];

export const TrigPropertiesQuiz: React.FC<{
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
      topicId="g11-trig-tulajdonsagok-quiz"
      subtopicId="a-szogfuggvenyek-tulajdonsagai"
      title="4. A szögfüggvények tulajdonságai – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: nevezetes szögek, pótszögek, sin²α + cos²α = 1 és alkalmazások."
      questions={TRIG_PROPERTIES_QUESTIONS}
      cheatSheets={[
        {
          title: 'Nevezetes szögek',
          items: [
            'sin 30° = 1/2, cos 30° = √3/2, tg 30° = √3/3',
            'sin 45° = cos 45° = √2/2, tg 45° = 1',
            'sin 60° = √3/2, cos 60° = 1/2, tg 60° = √3',
            'Szabályos háromszög magassága: (√3/2)·a; négyzet átlója: a·√2'
          ]
        },
        {
          title: 'Azonosságok',
          items: [
            'Pótszögek: sin(90° − α) = cos α, cos(90° − α) = sin α',
            'tg α = sin α / cos α',
            'sin²α + cos²α = 1 ⇒ cos α = √(1 − sin²α)',
            'Hegyesszögre: 0 < sin α < 1, 0 < cos α < 1, 0 < tg α'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'sin α = 0,8 ⇒ cos α = 0,6, tg α = 4/3',
            'Montserrat: 680 · sin 82° ≈ 673 m ≠ 535 m; valós szög ≈ 51,9°',
            'Siklóernyő: ≈ 45,9 m (80 m, 35°) > ≈ 42,4 m (50 m, 58°)',
            'Sikló ≈ 31,8°; épület ≈ 23,6 m; medence ≈ 1,15°'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TrigPropertiesMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TrigPropertiesSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TrigPropertiesQuiz;
