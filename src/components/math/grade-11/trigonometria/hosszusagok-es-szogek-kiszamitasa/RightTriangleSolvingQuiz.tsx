import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RightTriangleSolvingMatcher } from './RightTriangleSolvingMatcher';
import { RightTriangleSolvingSorter } from './RightTriangleSolvingSorter';

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
const FIG_Q5 = <QRT ratio={0.75} a="a = ?" c="c" al="α" />;

const FIG_Q6 = <QRT ratio={0.75} b="b" c="c = ?" al="α" />;

const FIG_Q11 = (() => {
  const { A, B, C } = fIso(Math.tan(fRad(64.2)));
  const D = fFoot(A, B, C);
  return (
    <QFig>
      <QTri p={[A, B, C]} v={['A', 'B', 'C']} s={[undefined, undefined, '12 cm']} a={[undefined, '', undefined]} />
      <QText p={[B[0] + 14, B[1] - 16]} t="α = ?" size={10.5} />
      <QSeg a={A} b={D} dash color={F_AUX} />
      <QRight v={D} p1={A} p2={B} r={8} />
      <QText p={fAt(D, [1, -0.2], 9)} t="D" size={11.5} />
      <QText p={fAt(fMid(A, D), [0.42, 0.9], 9)} t="10,8 cm" size={9.5} />
    </QFig>
  );
})();

const FIG_Q13 = (() => {
  const { A, B, C, F } = fIso(Math.tan(fRad(64.2)));
  return (
    <QFig>
      <QTri p={[A, B, C]} v={['A', 'B', 'C']} s={['?', '?', undefined]} a={[undefined, '64,2°', undefined]} />
      <QSeg a={C} b={F} dash color={F_AUX} />
      <QRight v={F} p1={B} p2={C} r={8} />
      <QText p={[F[0], F[1] + 10]} t="F" size={11.5} />
      <QText p={[F[0] - 22, F[1] + 10]} t="6 cm" size={10} />
      <QText p={[F[0] + 22, F[1] + 10]} t="6 cm" size={10} />
    </QFig>
  );
})();

const fRoad = (opts: { ab?: string; ap?: string; m?: string; ad?: string }) => {
  const A: FPt = [30, 118];
  const P: FPt = [105, 118];
  const B: FPt = [105, 61.6];
  const C: FPt = [183.1, 61.6];
  const Q: FPt = [183.1, 118];
  const D: FPt = [210, 118];
  return (
    <QFig>
      <QPoly p={[A, B, C, D]} fill="#fefce8" color="#a16207" />
      {opts.ad && <QSeg a={A} b={D} color="#16a34a" w={3} />}
      <QSeg a={B} b={P} dash color={F_AUX} />
      <QRight v={P} p1={A} p2={B} r={8} />
      <QAngle v={A} p1={D} p2={B} t="37°" r={16} />
      <QText p={[A[0] - 8, A[1] + 4]} t="A" size={11.5} />
      <QText p={[B[0] - 4, B[1] - 9]} t="B" size={11.5} />
      <QText p={[C[0] + 4, C[1] - 9]} t="C" size={11.5} />
      <QText p={[D[0] + 9, D[1] + 4]} t="D" size={11.5} />
      {(opts.ap || opts.m) && <QText p={[P[0], P[1] + 11]} t="P" size={11.5} />}
      {opts.ab && <QText p={[56, 84]} t={opts.ab} anchor="end" />}
      {opts.m && <QText p={[B[0] + 6, 92]} t={opts.m} anchor="start" />}
      {opts.ap && <QText p={[67, 130]} t={opts.ap} />}
      {opts.ad && (
        <>
          <QText p={[144, 52]} t="25 km" />
          <QText p={[208, 86]} t="20 km" />
          <QText p={[120, 132]} t={opts.ad} color="#15803d" />
        </>
      )}
    </QFig>
  );
};

const FIG_Q14 = fRoad({ ab: '30 km', m: 'm = ?' });

const FIG_Q15 = fRoad({ ab: '30 km', ap: 'AP = ?' });

const FIG_Q16 = fRoad({ ab: '30 km', ad: 'új út: AD ≈ 57,6 km' });

const fCrane = (h?: string, d?: string) => {
  const O: FPt = [40, 120];
  const E: FPt = [162.9, 34];
  const G: FPt = [162.9, 120];
  return (
    <QFig title="Gém: k = 4–12 m, α = 10°–60°">
      <QSeg a={[15, 120]} b={[225, 120]} color={F_AUX} w={1.5} />
      <rect x="28" y="112" width="24" height="10" fill="#fde68a" stroke="#a16207" />
      <QSeg a={O} b={E} color="#a16207" w={3.5} />
      <QSeg a={E} b={G} dash color={F_AUX} />
      <QRight v={G} p1={O} p2={E} r={8} />
      <QAngle v={O} p1={G} p2={E} t="α" r={20} />
      <QText p={[92, 66]} t="k" />
      {h && <QText p={[180, 77]} t={h} anchor="start" />}
      {d && <QText p={[101, 132]} t={d} />}
    </QFig>
  );
};

const FIG_Q17 = fCrane(undefined, 'd = ?');

const FIG_Q18 = fCrane('h = ?');

const FIG_Q20 = <QRT ratio={0.671} a="47 m" b="70 m" al="α = ?" title="A szobor talapzata" />;

const FIG_Q21 = (
  <QFig title="Szabadság-szobor: látószög = ?">
    <rect x="150" y="88.1" width="12" height="37.9" fill="#e2e8f0" stroke={F_AUX} />
    <QSeg a={[156, 88.1]} b={[156, 26.4]} color="#059669" w={4} />
    <QSeg a={[40, 126]} b={[200, 126]} color={F_AUX} w={1.5} />
    <QSeg a={[75, 126]} b={[150, 88.1]} color={F_LINE} />
    <QSeg a={[75, 126]} b={[150, 26.4]} color={F_LINE} />
    <QRight v={[150, 126]} p1={[75, 126]} p2={[150, 88.1]} r={8} />
    <QAngle v={[75, 126]} p1={[150, 88.1]} p2={[150, 26.4]} t="?" r={26} tr={40} />
    <QText p={[112, 137]} t="70 m" />
    <QText p={[180, 107]} t="47 m" />
    <QText p={[180, 57]} t="46 m" />
  </QFig>
);

const FIG_Q22 = (
  <QFig>
    <QPoly p={[[8, 132], [45, 45], [95, 132]]} fill="#d1fae5" color="#059669" w={1.5} />
    <QPoly p={[[150, 132], [205, 61.8], [236, 132]]} fill="#d1fae5" color="#059669" w={1.5} />
    <QSeg a={[45, 45]} b={[215, 45]} dash color={F_AUX} />
    <QSeg a={[45, 45]} b={[205, 61.8]} color={F_LINE} />
    <QSeg a={[205, 45]} b={[205, 61.8]} dash color={F_AUX} />
    <QRight v={[205, 45]} p1={[45, 45]} p2={[205, 61.8]} r={7} />
    <QAngle v={[45, 45]} p1={[215, 45]} p2={[205, 61.8]} r={48} />
    <QText p={[96, 59]} t="6°" size={10.5} color={F_ANG} />
    <QText p={[45, 33]} t="712 m" />
    <QText p={[150, 68]} t="435 m" />
    <QText p={[222, 56]} t="? m" />
  </QFig>
);

const fTrap = (leg?: string, base?: string) => (
  <QFig>
    <QPoly p={[[53, 124], [187, 124], [153, 44], [87, 44]]} />
    <QSeg a={[87, 44]} b={[87, 124]} dash color={F_AUX} />
    <QRight v={[87, 124]} p1={[187, 124]} p2={[87, 44]} r={8} />
    <QAngle v={[87, 44]} p1={[53, 124]} p2={[153, 44]} t="113°" r={13} tr={27} />
    <QAngle v={[153, 44]} p1={[87, 44]} p2={[187, 124]} t="113°" r={13} tr={27} />
    <QText p={[120, 33]} t="8,4 cm" />
    <QText p={[110, 96]} t="10,2 cm" size={10} />
    {leg && <QText p={[64, 82]} t={leg} anchor="end" />}
    {base && <QText p={[120, 136]} t={base} />}
  </QFig>
);

const FIG_Q23 = fTrap('szár = ?');

const FIG_Q24 = fTrap(undefined, 'hosszabb alap = ?');

const FIG_Q25 = (
  <QFig title="Toronyantenna az út végén">
    <QSeg a={[50, 126]} b={[200, 126]} dash color={F_AUX} w={1.2} />
    <QSeg a={[167.9, 126]} b={[167.9, 80.1]} dash color={F_AUX} w={1.2} />
    <QRight v={[167.9, 126]} p1={[50, 126]} p2={[167.9, 80.1]} r={8} />
    <QSeg a={[50, 126]} b={[167.9, 80.1]} color="#a16207" w={2.5} />
    <QSeg a={[50, 126]} b={[167.9, 27.8]} color={F_LINE} w={1.5} />
    <QSeg a={[167.9, 80.1]} b={[167.9, 27.8]} color="#059669" w={4} />
    <QAngle v={[50, 126]} p1={[200, 126]} p2={[167.9, 80.1]} r={34} />
    <QAngle v={[50, 126]} p1={[200, 126]} p2={[167.9, 27.8]} r={22} />
    <QText p={[100, 119]} t="21,3°" size={10} color={F_ANG} />
    <QText p={[116, 89]} t="39,8°" size={9.5} color={F_ANG} />
    <QText p={[128, 112]} t="230 m" size={10} />
    <QText p={[190, 54]} t="h = ?" />
  </QFig>
);


const RIGHT_TRIANGLE_SOLVING_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: Szögfüggvények és stratégia (1–10)
  {
    id: 'rts-q1',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Egy derékszögű háromszögben mivel egyenlő sin α?',
    options: [
      'Az α-val szemközti befogó és az átfogó hányadosával',
      'Az α melletti befogó és az átfogó hányadosával',
      'Az α-val szemközti és az α melletti befogó hányadosával',
      'Az átfogó és az α-val szemközti befogó hányadosával'
    ],
    correctAnswer: 0,
    explanation: 'sin α = (szöggel szemközti befogó hossza) : (átfogó hossza). A második lehetőség a cos α, a harmadik a tg α.'
  },
  {
    id: 'rts-q2',
    questionTypeBadge: 'Definíció',
    level: 1,
    question: 'Egy derékszögű háromszögben mivel egyenlő cos α?',
    options: [
      'Az α melletti befogó és az átfogó hányadosával',
      'Az α-val szemközti befogó és az átfogó hányadosával',
      'Az α melletti és az α-val szemközti befogó hányadosával',
      'Az átfogó és az α melletti befogó hányadosával'
    ],
    correctAnswer: 0,
    explanation: 'cos α = (szög melletti befogó hossza) : (átfogó hossza).'
  },
  {
    id: 'rts-q3',
    questionTypeBadge: 'Azonosság',
    level: 1,
    question: 'Melyik összefüggés igaz minden hegyesszögre?',
    options: ['tg α = sin α / cos α', 'tg α = cos α / sin α', 'tg α = sin α · cos α', 'tg α = 1 − sin α'],
    correctAnswer: 0,
    explanation: 'sin α / cos α = (a/c) : (b/c) = a / b = tg α. A cos α / sin α a kotangens.'
  },
  {
    id: 'rts-q4',
    questionTypeBadge: 'Pitagoraszi azonosság',
    level: 1,
    question: 'Mennyi sin²α + cos²α értéke egy tetszőleges hegyesszögre?',
    options: ['1', '0', '2', 'α-tól függ'],
    correctAnswer: 0,
    explanation: 'a²/c² + b²/c² = (a² + b²)/c² = c²/c² = 1 a Pitagorasz-tétel miatt.'
  },
  {
    id: 'rts-q5',
    questionTypeBadge: 'Hiányzó befogó',
    figure: FIG_Q5,
    level: 1,
    question: 'Ismert az átfogó (c) és az α hegyesszög. Hogyan kapjuk meg az α-val szemközti befogót?',
    options: ['a = c · sin α', 'a = c · cos α', 'a = c : sin α', 'a = c · tg α'],
    correctAnswer: 0,
    explanation: 'sin α = a / c ⇒ a = c · sin α. (A c · cos α a szög melletti befogót adja.)'
  },
  {
    id: 'rts-q6',
    questionTypeBadge: 'Átfogó',
    figure: FIG_Q6,
    level: 1,
    question: 'Ismert az α melletti befogó (b) és az α szög. Hogyan kapjuk meg az átfogót?',
    options: ['c = b : cos α', 'c = b · cos α', 'c = b : sin α', 'c = b · tg α'],
    correctAnswer: 0,
    explanation: 'cos α = b / c ⇒ c · cos α = b ⇒ c = b : cos α. Az átfogó mindig hosszabb a befogónál, és cos α < 1, ezért osztani kell.'
  },
  {
    id: 'rts-q7',
    questionTypeBadge: 'Szögösszeg',
    level: 1,
    question: 'Egy derékszögű háromszög egyik hegyesszöge 64,2°. Mekkora a másik hegyesszöge?',
    options: ['25,8°', '115,8°', '35,8°', '64,2°'],
    correctAnswer: 0,
    explanation: 'A két hegyesszög összege 90°: 90° − 64,2° = 25,8°.'
  },
  {
    id: 'rts-q8',
    questionTypeBadge: 'Módszer',
    level: 1,
    question: 'Melyik NEM szerepel a tankönyv tanácsai között a hosszúságok és szögek kiszámításához?',
    options: [
      'Mérd le szögmérővel a szöget a vázlatrajzon!',
      'Keress derékszögű háromszöget!',
      'Jelöld be, hol van a derékszög!',
      'Azonosítsd be az oldalakat (átfogó, szög melletti befogó…)!'
    ],
    correctAnswer: 0,
    explanation: 'A tanácsok: keress derékszögű háromszöget, jelöld a derékszöget, jelöld a feladatban szereplő szögeket, azonosítsd az oldalakat. A szögeket számolással határozzuk meg, nem méréssel.'
  },
  {
    id: 'rts-q9',
    questionTypeBadge: 'Kotangens',
    level: 1,
    question: 'Hogyan definiáljuk a hegyesszög kotangensét (ctg α)?',
    options: [
      'Az α melletti befogó és az α-val szemközti befogó hányadosa',
      'Az α-val szemközti befogó és az α melletti befogó hányadosa',
      'Az átfogó és az α melletti befogó hányadosa',
      'Az α melletti befogó és az átfogó hányadosa'
    ],
    correctAnswer: 0,
    explanation: 'ctg α = b / a = (melletti befogó) : (szemközti befogó) – éppen a tangens reciproka.'
  },
  {
    id: 'rts-q10',
    questionTypeBadge: 'Kotangens',
    level: 1,
    question: 'Egy hegyesszög tangense 4. Mennyi a kotangense?',
    options: ['0,25', '4', '−4', '0,75'],
    correctAnswer: 0,
    explanation: 'ctg α = 1 / tg α = 1 / 4 = 0,25.'
  },

  // LEVEL 2: Kidolgozott feladatok és alkalmazások (11–20)
  {
    id: 'rts-q11',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_Q11,
    level: 2,
    question: 'Egy egyenlő szárú háromszög alapja 12 cm, a szárhoz tartozó magassága 10,8 cm. Mekkora az alapon fekvő α szög?',
    options: ['≈ 64,2°', '≈ 42,0°', '≈ 25,8°', '≈ 51,6°'],
    correctAnswer: 0,
    explanation: 'Az ABD derékszögű háromszögben az α-val szemközti befogó 10,8, az átfogó (az alap) 12: sin α = 0,9 ⇒ α ≈ 64,2°. (42,0° a tg⁻¹ 0,9, 25,8° a cos⁻¹ 0,9 lenne.)',
    breakdown: ['Derékszögű háromszög: ABD (D a szár talppontja)', 'sin α = 10,8 / 12 = 0,9', 'α = sin⁻¹ 0,9 ≈ 64,2°']
  },
  {
    id: 'rts-q12',
    questionTypeBadge: 'Szögösszeg',
    level: 2,
    question: 'Ugyanebben az egyenlő szárú háromszögben az alapon fekvő szögek 64,2°-osak. Mekkora a szárszög?',
    options: ['51,6°', '115,8°', '25,8°', '128,4°'],
    correctAnswer: 0,
    explanation: 'Az alapon fekvő két szög egyenlő: 180° − 2 · 64,2° = 51,6°.'
  },
  {
    id: 'rts-q13',
    questionTypeBadge: 'Egyenlő szárú háromszög',
    figure: FIG_Q13,
    level: 2,
    question: 'Az alaphoz tartozó magasság felezi a 12 cm-es alapot. Milyen hosszúak a szárak, ha az alapon fekvő szög 64,2°?',
    options: ['≈ 13,8 cm', '≈ 2,6 cm', '≈ 6,7 cm', '≈ 12,4 cm'],
    correctAnswer: 0,
    explanation: 'A BFC háromszögben cos 64,2° = 6 / x ⇒ x = 6 : cos 64,2° ≈ 13,8 cm. (2,6 cm a hibás 6 · cos 64,2°, 12,4 cm a magasság lenne.)',
    breakdown: ['BF = 12 / 2 = 6 cm', 'cos 64,2° = 6 / x', 'x = 6 : cos 64,2° ≈ 13,8 cm']
  },
  {
    id: 'rts-q14',
    questionTypeBadge: 'Trapéz',
    figure: FIG_Q14,
    level: 2,
    question: 'A trapéz alakú útvonalon AB = 30 km, és BAD∢ = 37°. Mekkora a trapéz m magassága (a B-ből húzott merőleges)?',
    options: ['≈ 18,1 km', '≈ 24,0 km', '≈ 22,6 km', '≈ 49,8 km'],
    correctAnswer: 0,
    explanation: 'Az APB derékszögű háromszögben sin 37° = m / 30 ⇒ m = 30 · sin 37° ≈ 18,05 ≈ 18,1 km.'
  },
  {
    id: 'rts-q15',
    questionTypeBadge: 'Trapéz',
    figure: FIG_Q15,
    level: 2,
    question: 'Ugyanebben az APB háromszögben (AB = 30 km, 37°-os szög A-nál) mekkora az AP szakasz?',
    options: ['≈ 24 km', '≈ 18,1 km', '≈ 37,6 km', '≈ 22,6 km'],
    correctAnswer: 0,
    explanation: 'AP = 30 · cos 37° ≈ 23,96 ≈ 24 km (vagy Pitagorasz-tétellel: √(30² − 18,05²) ≈ 24 km).'
  },
  {
    id: 'rts-q16',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q16,
    level: 2,
    question: 'Az új AD út hossza ≈ 57,6 km, a régi A – B – C – D útvonal 30 + 25 + 20 km. Kb. hány km-rel rövidebb az új út?',
    options: ['≈ 17 km', '≈ 58 km', '≈ 25 km', '≈ 7 km'],
    correctAnswer: 0,
    explanation: '75 − 57,6 = 17,4, azaz kb. 17 km-rel rövidebb.'
  },
  {
    id: 'rts-q17',
    questionTypeBadge: 'Daru',
    figure: FIG_Q17,
    level: 2,
    question: 'Egy daru gémje 4 m és 12 m között változtatható, a vízszintessel bezárt szöge 10° és 60° között. Legfeljebb milyen messze lehet a darutól a felemelendő tárgy?',
    options: ['≈ 11,8 m', '≈ 2,1 m', '6 m', '≈ 10,4 m'],
    correctAnswer: 0,
    explanation: 'A vízszintes távolság d = k · cos α; ez akkor a legnagyobb, ha k = 12 m és α = 10°: 12 · cos 10° ≈ 11,8 m.'
  },
  {
    id: 'rts-q18',
    questionTypeBadge: 'Daru',
    figure: FIG_Q18,
    level: 2,
    question: 'Ugyanezzel a daruval (k: 4–12 m, α: 10°–60°) legfeljebb milyen magasra lehet felemelni egy tárgyat?',
    options: ['≈ 10,4 m', '6 m', '≈ 11,8 m', '≈ 3,5 m'],
    correctAnswer: 0,
    explanation: 'h = k · sin α a legnagyobb, ha k = 12 m és α = 60°: 12 · sin 60° ≈ 10,4 m.'
  },
  {
    id: 'rts-q19',
    questionTypeBadge: 'Daru',
    level: 2,
    question: 'Milyen messze van a darutól az a legközelebbi tárgy, amelyet a daru (k: 4–12 m, α: 10°–60°) fel tud emelni?',
    options: ['2 m', '≈ 3,9 m', '≈ 3,5 m', '≈ 0,7 m'],
    correctAnswer: 0,
    explanation: 'd = k · cos α a legkisebb, ha k = 4 m és α = 60°: 4 · cos 60° = 4 · 0,5 = 2 m.'
  },
  {
    id: 'rts-q20',
    questionTypeBadge: 'Látószög',
    figure: FIG_Q20,
    level: 2,
    question: 'A Szabadság-szobor 47 m magas talapzaton áll. A talapzattól 70 m-re, a talapzat aljával egy szintben állunk. Mekkora szögben látjuk a szobor alját?',
    options: ['≈ 33,9°', '≈ 56,1°', '≈ 42,2°', '≈ 47,8°'],
    correctAnswer: 0,
    explanation: 'A 47 m a szöggel szemközti, a 70 m a szög melletti befogó: tg α = 47 / 70 ⇒ α ≈ 33,9°. (56,1° a pótszög, 42,2° a hibásan használt sin⁻¹ lenne.)'
  },

  // LEVEL 3: Összetett feladatok (21–30)
  {
    id: 'rts-q21',
    questionTypeBadge: 'Látószög',
    figure: FIG_Q21,
    level: 3,
    question: 'A Szabadság-szobor maga 46 m magas, a talapzat 47 m, a távolság 70 m. Mekkora szögben látszik maga a szobor?',
    options: ['≈ 19,2°', '≈ 33,3°', '≈ 53,0°', '≈ 33,9°'],
    correctAnswer: 0,
    explanation: 'A teteje: tg α₂ = 93 / 70 ⇒ α₂ ≈ 53,0°; az alja: α₁ ≈ 33,9°. A szobor látószöge α₂ − α₁ ≈ 19,2°. (33,3° a hibás tg⁻¹(46/70) lenne.)',
    breakdown: ['tg α₁ = 47 / 70 ⇒ α₁ ≈ 33,9°', 'tg α₂ = (47 + 46) / 70 ⇒ α₂ ≈ 53,0°', 'α₂ − α₁ ≈ 19,2°']
  },
  {
    id: 'rts-q22',
    questionTypeBadge: 'Depressziószög',
    figure: FIG_Q22,
    level: 3,
    question: 'Egy 712 m magas hegy tetejéről a szomszédos hegy csúcsát 6°-kal a vízszintes alatt látjuk; a két csúcs légvonalban 435 m-re van. Milyen magas a szomszédos hegy?',
    options: ['≈ 666,5 m', '≈ 757,5 m', '≈ 279,4 m', '≈ 45,5 m'],
    correctAnswer: 0,
    explanation: 'A 435 m az átfogó, a magasságkülönbség a 6°-kal szemközti befogó: 435 · sin 6° ≈ 45,5 m. A hegy: 712 − 45,5 ≈ 666,5 m.'
  },
  {
    id: 'rts-q23',
    questionTypeBadge: 'Húrtrapéz',
    figure: FIG_Q23,
    level: 3,
    question: 'Egy húrtrapéz 8,4 cm-es alapján fekvő szögei 113°-osak, magassága 10,2 cm. Milyen hosszúak a szárai?',
    options: ['≈ 11,1 cm', '≈ 26,1 cm', '≈ 9,4 cm', '≈ 4,3 cm'],
    correctAnswer: 0,
    explanation: 'A másik alapon fekvő szögek 180° − 113° = 67°-osak. A magasság a 67°-kal szemközti befogó, a szár az átfogó: szár = 10,2 : sin 67° ≈ 11,1 cm.'
  },
  {
    id: 'rts-q24',
    questionTypeBadge: 'Húrtrapéz',
    figure: FIG_Q24,
    level: 3,
    question: 'Ugyanebben a húrtrapézban (rövidebb alap 8,4 cm, szögei 113°, magasság 10,2 cm) milyen hosszú a másik alap?',
    options: ['≈ 17,1 cm', '≈ 12,7 cm', '≈ 30,6 cm', '8,4 cm'],
    correctAnswer: 0,
    explanation: 'Egy-egy szár vetülete: 10,2 : tg 67° ≈ 4,33 cm. A hosszabb alap: 8,4 + 2 · 4,33 ≈ 17,1 cm. (12,7 cm csak az egyik vetületet adja hozzá.)'
  },
  {
    id: 'rts-q25',
    questionTypeBadge: 'Szöveges feladat',
    figure: FIG_Q25,
    level: 3,
    question: 'Egy toronyantennához 230 m hosszú, 21,3°-os emelkedési szögű egyenes út vezet. Az út elejéről az antenna csúcsa 39,8° alatt látszik. Milyen magas az antenna?',
    options: ['≈ 95 m', '≈ 178,5 m', '≈ 83,5 m', '≈ 191,6 m'],
    correctAnswer: 0,
    explanation: 'Vízszintes távolság: 230 · cos 21,3° ≈ 214,3 m. Az antenna talpa 230 · sin 21,3° ≈ 83,5 m-rel, csúcsa 214,3 · tg 39,8° ≈ 178,5 m-rel van az út eleje fölött. Az antenna ≈ 178,5 − 83,5 ≈ 95 m.',
    breakdown: ['d = 230 · cos 21,3° ≈ 214,3 m', 'talp: 230 · sin 21,3° ≈ 83,5 m', 'csúcs: 214,3 · tg 39,8° ≈ 178,5 m', 'antenna ≈ 95 m']
  },
  {
    id: 'rts-q26',
    questionTypeBadge: 'Pitagoraszi azonosság',
    level: 3,
    question: 'Egy hegyesszög szinusza 0,55. Mennyi a koszinusza (a szög kiszámítása nélkül)?',
    options: ['≈ 0,835', '0,45', '≈ 0,698', '≈ 1,818'],
    correctAnswer: 0,
    explanation: 'cos α = √(1 − sin²α) = √(1 − 0,3025) = √0,6975 ≈ 0,835. (0,6975 a gyökvonás nélküli hibás eredmény, 0,45 = 1 − 0,55 sem helyes.)'
  },
  {
    id: 'rts-q27',
    questionTypeBadge: 'Azonosság',
    level: 3,
    question: 'Egy hegyesszög tangense 4. Mennyi a szinusza?',
    options: ['4 / √17 ≈ 0,970', '1 / √17 ≈ 0,243', '0,8', '0,25'],
    correctAnswer: 0,
    explanation: 'Legyen a szemközti befogó 4, a melletti 1; az átfogó √(16 + 1) = √17. sin α = 4 / √17 ≈ 0,970, cos α = 1 / √17 ≈ 0,243.'
  },
  {
    id: 'rts-q28',
    questionTypeBadge: 'Azonosság',
    level: 3,
    question: 'Mivel egyenlő minden hegyesszögre az (1 − cos α) · (1 + cos α) kifejezés?',
    options: ['sin²α', 'cos²α', '1', 'tg²α'],
    correctAnswer: 0,
    explanation: 'Nevezetes szorzat: (1 − cos α)(1 + cos α) = 1 − cos²α = sin²α.'
  },
  {
    id: 'rts-q29',
    questionTypeBadge: 'Azonosság',
    level: 3,
    question: 'Mivel egyenlő minden hegyesszögre az 1 / cos²α − 1 kifejezés?',
    options: ['tg²α', 'sin²α', 'ctg²α', '1'],
    correctAnswer: 0,
    explanation: '1 / cos²α − 1 = (1 − cos²α) / cos²α = sin²α / cos²α = tg²α.'
  },
  {
    id: 'rts-q30',
    questionTypeBadge: 'Hibakeresés',
    level: 3,
    question: 'Egy diák a cos 64,2° = 6 / x egyenletből azt kapta, hogy x = 6 · cos 64,2° ≈ 2,6 cm. Mi a hiba?',
    options: [
      'Rosszul rendezte az egyenletet: x = 6 : cos 64,2° ≈ 13,8 cm',
      'Koszinusz helyett szinuszt kellett volna használnia',
      'A számológép RAD módban volt',
      'Nincs hiba, a szár valóban kb. 2,6 cm'
    ],
    correctAnswer: 0,
    explanation: 'Az x a nevezőben van: x · cos 64,2° = 6 ⇒ x = 6 : cos 64,2° ≈ 13,8 cm. Az átfogó (2,6 cm) nem lehetne rövidebb a 6 cm-es befogónál.'
  }
];

export const RightTriangleSolvingQuiz: React.FC<{
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
      topicId="g11-trig-derekszogu-megoldas-quiz"
      subtopicId="hosszusagok-es-szogek-kiszamitasa"
      title="5. Hosszúságok és szögek kiszámítása – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: szögfüggvények, derékszögű háromszögek a síkidomokban, gyakorlati feladatok, kotangens."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={RIGHT_TRIANGLE_SOLVING_QUESTIONS}
      cheatSheets={[
        {
          title: 'Szögfüggvények',
          items: [
            'sin α = szemközti befogó / átfogó',
            'cos α = melletti befogó / átfogó',
            'tg α = szemközti / melletti = sin α / cos α',
            'sin²α + cos²α = 1; ctg α = 1 / tg α'
          ]
        },
        {
          title: 'Megoldási stratégia',
          items: [
            'Keress (vagy húzz be magassággal) derékszögű háromszöget!',
            'Jelöld a derékszöget és a szereplő szögeket!',
            'Azonosítsd az oldalakat: átfogó, melletti, szemközti!',
            'Ha az ismeretlen a nevezőben van: x = ismert : szögfüggvény'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Egyenlő szárú △: α ≈ 64,2°, szárszög 51,6°, szár ≈ 13,8 cm',
            'Új út: m ≈ 18,1 km, AD ≈ 57,6 km, δ ≈ 64,5°, ≈ 17 km-rel rövidebb',
            'Daru: d ≤ 12 · cos 10° ≈ 11,8 m, h ≤ 12 · sin 60° ≈ 10,4 m',
            'Szabadság-szobor: 33,9° és 53,0° ⇒ ≈ 19,2°'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RightTriangleSolvingMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <RightTriangleSolvingSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default RightTriangleSolvingQuiz;
