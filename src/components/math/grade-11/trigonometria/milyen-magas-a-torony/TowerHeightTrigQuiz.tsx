import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { TowerHeightTrigMatcher } from './TowerHeightTrigMatcher';
import { TowerHeightTrigSorter } from './TowerHeightTrigSorter';

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

// ---- Kérdésábrák ----
const fTopView = (o: { ak?: string; al?: string }) => {
  const K: FPt = [70, 124];
  const L: FPt = [200, 124];
  const A: FPt = [70, 34];
  return (
    <QFig>
      <rect x="2" y="44" width="236" height="62" fill="#dbeafe" />
      <QText p={[205, 75]} t="folyó" size={9.5} color="#2563eb" />
      <QTri p={[A, K, L]} v={['A', 'K', 'L']} s={['250 m', o.al, undefined]} a={[undefined, undefined, '36°']} right={1} fill="rgba(224,231,255,0.6)" />
      {o.ak && <QText p={[52, 77]} t={o.ak} anchor="end" />}
      <QText p={[200, 20]} t="Felülnézet" size={10} color="#334155" />
    </QFig>
  );
};

const fLamp = (o: { y0: number; y1: number; half: number; axis: string; ang: string; r?: string; diam?: string; table?: string; disk?: boolean }) => {
  const P: FPt = [120, o.y0];
  const w = (o.y1 - o.y0) * Math.tan(fRad(o.half));
  const L: FPt = [120 - w, o.y1];
  const R: FPt = [120 + w, o.y1];
  const F: FPt = [120, o.y1];
  return (
    <QFig>
      <polygon points={`${fR(P[0])},${fR(P[1])} ${fR(L[0])},${fR(L[1])} ${fR(R[0])},${fR(R[1])}`} fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
      {o.disk && <ellipse cx="120" cy={o.y1} rx={fR(w)} ry="8" fill="#fde68a" stroke="#ca8a04" />}
      <QSeg a={[8, o.y1]} b={[232, o.y1]} color={o.table ? '#92400e' : F_AUX} w={o.table ? 1.5 : 1.5} />
      {o.table && <QSeg a={L} b={R} color="#92400e" w={4} />}
      <QSeg a={P} b={F} dash color={F_AUX} />
      <QRight v={F} p1={R} p2={P} r={7} />
      <rect x="110" y={o.y0 - 10} width="20" height="8" rx="2" fill="#475569" />
      <QAngle v={P} p1={L} p2={R} r={14} />
      <QText p={[120 + 14 * Math.tan(fRad(o.half)) + 12, o.y0 + 12]} t={o.ang} anchor="start" size={10.5} color={F_ANG} />
      <QText p={[120 - w / 2 - 6, (o.y0 + o.y1) / 2]} t={o.axis} anchor="end" size={10.5} />
      {o.r && <QText p={[120 + w / 2, o.y1 + 11]} t={o.r} />}
      {o.table && <QText p={[120, o.y1 + 13]} t={o.table} />}
      {o.diam && (
        <>
          <QSeg a={[L[0], o.y1 + 16]} b={[R[0], o.y1 + 16]} color={F_INK} w={1} />
          <QText p={[120, o.y1 + 26]} t={o.diam} />
        </>
      )}
    </QFig>
  );
};

const FIG_Q2 = <QRT ratio={0.625} a="AB = ?" b="AK" al="32°" vA="K" vB="B" vC="A" title="Oldalnézet" />;

const FIG_Q3 = fTopView({ ak: 'AK = ?' });

const FIG_Q5 = <QRT ratio={0.625} a="AB = ?" b="AK ≈ 182 m" al="32°" vA="K" vB="B" vC="A" />;

const FIG_Q8 = fLamp({ y0: 30, y1: 120, half: 20, axis: '40 cm', ang: '40°', r: 'r = ?' });

const FIG_Q10 = (() => {
  const { A, B, C, F } = fIso(Math.tan(fRad(40)));
  return (
    <QFig title="A tető keresztmetszete">
      <QTri p={[A, B, C]} s={[undefined, undefined, '10 m']} a={['40°', '40°', undefined]} />
      <QSeg a={C} b={F} dash color={F_AUX} />
      <QRight v={F} p1={B} p2={C} r={8} />
      <QText p={[F[0] + 5, (C[1] + F[1]) / 2]} t="h = ?" anchor="start" />
    </QFig>
  );
})();

const FIG_Q11 = fTopView({ al: 'AL = ?' });

const FIG_Q12 = <QRT ratio={0.369} a="114 m" b="AL ≈ 309 m" al="?" vA="L" vB="B" vC="A" title="Oldalnézet az L pontból" />;

const FIG_Q15 = fLamp({ y0: 46, y1: 104, half: 55, axis: '40 cm', ang: '110°', diam: 'átmérő = ?' });

const FIG_Q16 = fLamp({ y0: 34, y1: 114, half: 33.7, axis: '60 cm', ang: '?', table: '80 cm' });

const FIG_Q20 = (
  <QFig title="Péter és a fa">
    <rect x="30" y="104" width="15" height="24" fill="#e2e8f0" stroke={F_AUX} />
    <QSeg a={[8, 128]} b={[232, 128]} color={F_AUX} w={1.5} />
    <QDot p={[45, 104]} />
    <QSeg a={[45, 104]} b={[195, 104]} dash color={F_AUX} />
    <QSeg a={[45, 104]} b={[181, 49]} color={F_ARC} w={1.5} />
    <QSeg a={[45, 104]} b={[181, 128]} color={F_LINE} w={1.5} />
    <QSeg a={[181, 128]} b={[181, 49]} color="#15803d" w={4} />
    <QAngle v={[45, 104]} p1={[181, 104]} p2={[181, 49]} t="22°" r={26} />
    <QAngle v={[45, 104]} p1={[181, 104]} p2={[181, 128]} t="10°" r={40} />
    <QText p={[16, 116]} t="6 m" size={10} />
    <QText p={[205, 88]} t="fa = ?" />
  </QFig>
);

const FIG_Q21 = (
  <QFig title="φ = ? (alul a 3,2 m × 6,9 m-es lap)">
    <QPoly p={[[80, 128], [149, 128], [149, 44], [80, 44]]} />
    <QPoly p={[[80, 44], [149, 44], [164, 32], [95, 32]]} fill="#eef2ff" />
    <QPoly p={[[149, 128], [164, 116], [164, 32], [149, 44]]} fill="#e0e7ff" />
    <QSeg a={[80, 128]} b={[95, 116]} dash color={F_AUX} w={1.2} />
    <QSeg a={[95, 116]} b={[164, 116]} dash color={F_AUX} w={1.2} />
    <QSeg a={[95, 116]} b={[95, 32]} dash color={F_AUX} w={1.2} />
    <QSeg a={[80, 128]} b={[164, 116]} dash color={F_ARC} w={1.5} />
    <QSeg a={[80, 128]} b={[164, 32]} color="#dc2626" w={2} />
    <QAngle v={[80, 128]} p1={[164, 116]} p2={[164, 32]} t="φ" r={26} />
    <QText p={[114, 139]} t="6,9 m" />
    <QText p={[168, 128]} t="3,2 m" anchor="start" size={10} />
    <QText p={[170, 74]} t="8,4 m" anchor="start" size={10} />
  </QFig>
);

const FIG_Q22 = (
  <QFig title="A testátló és a fedőlap szöge = ?">
    <QPoly p={[[60, 128], [130, 128], [130, 58], [60, 58]]} />
    <QPoly p={[[60, 58], [130, 58], [172, 28], [102, 28]]} fill="#eef2ff" />
    <QPoly p={[[130, 128], [172, 98], [172, 28], [130, 58]]} fill="#e0e7ff" />
    <QSeg a={[60, 128]} b={[102, 98]} dash color={F_AUX} w={1.2} />
    <QSeg a={[102, 98]} b={[172, 98]} dash color={F_AUX} w={1.2} />
    <QSeg a={[102, 98]} b={[102, 28]} dash color={F_AUX} w={1.2} />
    <QSeg a={[60, 58]} b={[172, 28]} dash color={F_ARC} w={1.5} />
    <QSeg a={[60, 128]} b={[172, 28]} color="#dc2626" w={2} />
    <QAngle v={[172, 28]} p1={[60, 58]} p2={[60, 128]} t="?" r={30} />
  </QFig>
);

const FIG_Q25 = fLamp({ y0: 30, y1: 116, half: 38, axis: '260 cm', ang: '76°', disk: true });


const TOWER_HEIGHT_TRIG_QUESTIONS: QuizQuestion[] = [
  // LEVEL 1: A mérés gondolatmenete (1–10)
  {
    id: 'tht-q1',
    questionTypeBadge: 'Derékszögű háromszög',
    level: 1,
    question: 'A toronynál A a talppont, B a csúcs, K a megfigyelő a túlsó parton. Melyik csúcsnál van derékszög az ABK háromszögben?',
    options: ['A-nál', 'K-nál', 'B-nél', 'Egyik csúcsnál sincs'],
    correctAnswer: 0,
    explanation: 'A torony függőleges, az AK szakasz vízszintes, ezért AB ⊥ AK: a derékszög az A talppontnál van.'
  },
  {
    id: 'tht-q2',
    questionTypeBadge: 'Tangens',
    figure: FIG_Q2,
    level: 1,
    question: 'K-ból a torony csúcsa 32°-os emelkedési szögben látszik. Melyik összefüggés adja meg a torony magasságát?',
    options: ['AB = AK · tg 32°', 'AB = AK · sin 32°', 'AB = AK : tg 32°', 'AB = AK · cos 32°'],
    correctAnswer: 0,
    explanation: 'Az ABK derékszögű háromszögben AB a 32°-kal szemközti, AK a szög melletti befogó: tg 32° = AB / AK.'
  },
  {
    id: 'tht-q3',
    questionTypeBadge: 'Tangens',
    figure: FIG_Q3,
    level: 1,
    question: 'A parton AK-ra merőlegesen 250 m-t mentünk az L pontig, és ALK∢ = 36°. Hogyan kapjuk meg AK-t?',
    options: ['AK = 250 · tg 36°', 'AK = 250 · sin 36°', 'AK = 250 : tg 36°', 'AK = 250 · cos 36°'],
    correctAnswer: 0,
    explanation: 'Az AKL háromszög K-nál derékszögű; a 36°-os L-nél fekvő szöggel szemközti befogó AK, a melletti KL = 250 m: AK = 250 · tg 36°.'
  },
  {
    id: 'tht-q4',
    questionTypeBadge: 'Számolás',
    level: 1,
    question: 'Mekkora AK, ha AK = 250 · tg 36°?',
    options: ['≈ 182 m', '≈ 147 m', '≈ 344 m', '≈ 202 m'],
    correctAnswer: 0,
    explanation: '250 · tg 36° ≈ 250 · 0,7265 ≈ 181,6 ≈ 182 m.'
  },
  {
    id: 'tht-q5',
    questionTypeBadge: 'Toronymagasság',
    figure: FIG_Q5,
    level: 1,
    question: 'AK ≈ 182 m és AKB∢ = 32°. Milyen magas a torony?',
    options: ['≈ 114 m', '≈ 96 m', '≈ 291 m', '≈ 154 m'],
    correctAnswer: 0,
    explanation: 'AB = AK · tg 32° ≈ 182 · 0,6249 ≈ 114 m.'
  },
  {
    id: 'tht-q6',
    questionTypeBadge: 'Derékszögű háromszög',
    level: 1,
    question: 'Az AKL háromszög melyik csúcsánál van derékszög?',
    options: ['K-nál', 'A-nál', 'L-nél', 'Egyiknél sem'],
    correctAnswer: 0,
    explanation: 'A K pontból az AK-ra merőlegesen mentünk el az L pontba, ezért AKL∢ = 90°.'
  },
  {
    id: 'tht-q7',
    questionTypeBadge: 'Fogalom',
    level: 1,
    question: 'Mit nevezünk depressziószögnek (lehajlási szögnek)?',
    options: [
      'A megfigyelőnél alacsonyabban fekvő pontra irányuló látósugár és a vízszintes sík szögét',
      'A magasabban fekvő pontra irányuló látósugár és a vízszintes sík szögét',
      'A látósugár és a függőleges egyenes szögét',
      'Két látósugár által bezárt szöget'
    ],
    correctAnswer: 0,
    explanation: 'A depressziószög „lefelé” mért szög: a lejjebb lévő pontra irányuló látósugár és a vízszintes sík szöge.'
  },
  {
    id: 'tht-q8',
    questionTypeBadge: 'Világítási szög',
    figure: FIG_Q8,
    level: 1,
    question: 'Egy 40°-os világítási szögű LED-lámpa 40 cm-rel az asztal fölött függőlegesen lefelé világít. Mekkora a megvilágított kör sugara?',
    options: ['≈ 14,6 cm', '≈ 33,6 cm', '≈ 13,7 cm', '≈ 109,9 cm'],
    correctAnswer: 0,
    explanation: 'A fénytengely felezi a világítási szöget: r = 40 · tg 20° ≈ 14,6 cm. (33,6 cm a fel nem vett félszög, tg 40° használata lenne.)'
  },
  {
    id: 'tht-q9',
    questionTypeBadge: 'Térbeli derékszög',
    level: 1,
    question: 'Miért derékszögű az LAB háromszög (L a parton lévő második mérési pont)?',
    options: [
      'Mert az AB függőleges, így minden vízszintes egyenesre, az AL-re is merőleges',
      'Mert AL merőleges KL-re',
      'Mert L-ből 36°-ban látjuk a tornyot',
      'Mert az LAB háromszög egyenlő szárú'
    ],
    correctAnswer: 0,
    explanation: 'A függőleges egyenes merőleges a vízszintes sík minden egyenesére, így az A-n átmenő AL egyenesre is.'
  },
  {
    id: 'tht-q10',
    questionTypeBadge: 'Gúla',
    figure: FIG_Q10,
    level: 1,
    question: 'Egy 10 m × 10 m-es alap fölötti szabályos négyoldalú gúla alakú tető oldallapjai 40°-os szöget zárnak be a vízszintessel. Milyen magas a tető?',
    options: ['≈ 4,2 m', '≈ 8,4 m', '≈ 3,2 m', '≈ 6,0 m'],
    correctAnswer: 0,
    explanation: 'A tető magassága, a fél alapél (5 m) és az oldallap magassága derékszögű háromszöget alkot: h = 5 · tg 40° ≈ 4,2 m.'
  },

  // LEVEL 2: Számolás a kidolgozott és tankönyvi feladatokban (11–20)
  {
    id: 'tht-q11',
    questionTypeBadge: 'Koszinusz',
    figure: FIG_Q11,
    level: 2,
    question: 'Az AKL háromszögben KL = 250 m, ALK∢ = 36°, a derékszög K-nál van. Milyen hosszú AL?',
    options: ['≈ 309 m', '≈ 202 m', '≈ 425 m', '≈ 182 m'],
    correctAnswer: 0,
    explanation: 'AL az átfogó: cos 36° = 250 / AL ⇒ AL = 250 : cos 36° ≈ 309 m.'
  },
  {
    id: 'tht-q12',
    questionTypeBadge: 'Látószög',
    figure: FIG_Q12,
    level: 2,
    question: 'AB ≈ 114 m, AL ≈ 309 m. Mekkora szögben látjuk a tornyot az L pontból?',
    options: ['≈ 20°', '≈ 24,4°', '32°', '36°'],
    correctAnswer: 0,
    explanation: 'Az LAB derékszögű háromszögben tg λ = 114 / 309 ≈ 0,369 ⇒ λ ≈ 20°. (24,4° a hibás tg λ = 114 / 250 lenne.)',
    breakdown: ['AL = 250 : cos 36° ≈ 309 m', 'tg λ = AB / AL ≈ 0,369', 'λ ≈ 20°']
  },
  {
    id: 'tht-q13',
    questionTypeBadge: 'Látószög',
    level: 2,
    question: 'Mekkora szögben látjuk a tornyot a KL szakasz M felezőpontjából? (AK ≈ 181,6 m, KM = 125 m, AB ≈ 113,5 m)',
    options: ['≈ 27,2°', '32°', '≈ 20,2°', '≈ 26,1°'],
    correctAnswer: 0,
    explanation: 'Az AKM derékszögű háromszögből AM = √(181,6² + 125²) ≈ 220,5 m, majd tg = 113,5 / 220,5 ⇒ ≈ 27,2°. (26,1° a 32° és 20,2° átlaga – ez nem helyes módszer.)',
    breakdown: ['AM = √(AK² + KM²) ≈ 220,5 m', 'tg φ = AB / AM ≈ 0,515', 'φ ≈ 27,2°']
  },
  {
    id: 'tht-q14',
    questionTypeBadge: 'Szöveges feladat',
    level: 2,
    question: 'Milyen messzire menjünk a parton K-tól a KL egyenesen, hogy a tornyot 15°-os szögben lássuk? (AK ≈ 181,6 m, AB ≈ 113,5 m)',
    options: ['≈ 383 m', '≈ 424 m', '≈ 242 m', '250 m'],
    correctAnswer: 0,
    explanation: 'A P ponttól a talppontig: AP = 113,5 : tg 15° ≈ 423,6 m. Az AKP háromszög K-nál derékszögű: KP = √(423,6² − 181,6²) ≈ 383 m. (424 m az A-tól mért távolság.)'
  },
  {
    id: 'tht-q15',
    questionTypeBadge: 'Világítási szög',
    figure: FIG_Q15,
    level: 2,
    question: 'Egy 110°-os világítási szögű LED-lámpa 40 cm magasan van. Mekkora átmérőjű körlapot világít meg?',
    options: ['≈ 114,3 cm', '≈ 57,1 cm', '≈ 56,0 cm', '≈ 65,5 cm'],
    correctAnswer: 0,
    explanation: 'r = 40 · tg 55° ≈ 57,1 cm, az átmérő ennek kétszerese: ≈ 114,3 cm. (57,1 cm csak a sugár.)'
  },
  {
    id: 'tht-q16',
    questionTypeBadge: 'Világítási szög',
    figure: FIG_Q16,
    level: 2,
    question: 'Legalább mekkora világítási szögű LED-lámpát kell egy 80 cm átmérőjű kerek asztal fölé 0,6 m magasan felszerelni, hogy az egész asztallapot megvilágítsa?',
    options: ['≈ 67,4°', '≈ 33,7°', '≈ 53,1°', '≈ 106,3°'],
    correctAnswer: 0,
    explanation: 'tg(φ/2) = 40 / 60 ⇒ φ/2 ≈ 33,7° ⇒ φ ≈ 67,4°. (106,3° a sugár helyett az átmérővel számolva jönne ki.)'
  },
  {
    id: 'tht-q17',
    questionTypeBadge: 'Gúla felszíne',
    level: 2,
    question: 'Hány m²-t kell cseréppel befedni a 10 m × 10 m-es alapú, 40°-os oldallapú gúla alakú tetőn?',
    options: ['≈ 130,5 m²', '100 m²', '≈ 65,3 m²', '≈ 261,1 m²'],
    correctAnswer: 0,
    explanation: 'Az oldallap magassága 5 : cos 40° ≈ 6,53 m; egy oldallap 10 · 6,53 / 2 ≈ 32,6 m², négy oldallap ≈ 130,5 m².'
  },
  {
    id: 'tht-q18',
    questionTypeBadge: 'Gúla',
    level: 2,
    question: 'Milyen hosszúak ennek a tetőnek az oldalélgerendái (h ≈ 4,2 m, a fél alapátló 5√2 ≈ 7,07 m)?',
    options: ['≈ 8,2 m', '≈ 6,5 m', '≈ 7,1 m', '≈ 4,2 m'],
    correctAnswer: 0,
    explanation: 'Az oldalél, a magasság és a fél alapátló derékszögű háromszöget alkot: x = √(4,2² + 7,07²) ≈ 8,2 m. (6,5 m az oldallap magassága.)'
  },
  {
    id: 'tht-q19',
    questionTypeBadge: 'Hajlásszög',
    level: 2,
    question: 'Mekkora szöget zárnak be az oldalélgerendák a vízszintes síkkal (h ≈ 4,2 m, fél alapátló ≈ 7,07 m)?',
    options: ['≈ 30,7°', '40°', '≈ 59,3°', '≈ 22,8°'],
    correctAnswer: 0,
    explanation: 'tg α = h / (5√2) ≈ 4,2 / 7,07 ⇒ α ≈ 30,7°. Ez kisebb, mint az oldallapok 40°-os hajlásszöge.'
  },
  {
    id: 'tht-q20',
    questionTypeBadge: 'Depressziószög',
    figure: FIG_Q20,
    level: 2,
    question: 'Péter szeme 6 m-rel van a járda fölött. A szemközti fa alját 10°-os depressziószögben, tetejét 22°-os emelkedési szögben látja. Milyen magas a fa?',
    options: ['≈ 19,7 m', '≈ 13,7 m', '≈ 7,7 m', '≈ 34,0 m'],
    correctAnswer: 0,
    explanation: 'A fa távolsága 6 : tg 10° ≈ 34,0 m. A szemmagasság fölötti rész 34,0 · tg 22° ≈ 13,7 m. A fa: 6 + 13,7 ≈ 19,7 m.',
    breakdown: ['d = 6 : tg 10° ≈ 34,0 m', 'felső rész: d · tg 22° ≈ 13,7 m', 'fa = 6 + 13,7 ≈ 19,7 m']
  },

  // LEVEL 3: Térgeometria és összetett feladatok (21–30)
  {
    id: 'tht-q21',
    questionTypeBadge: 'Hajlásszög',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy téglatest élei 3,2 m; 6,9 m és 8,4 m. Mekkora szöget zár be a testátló a 3,2 m × 6,9 m-es oldallappal?',
    options: ['≈ 47,8°', '≈ 16,4°', '≈ 37,5°', '≈ 42,2°'],
    correctAnswer: 0,
    explanation: 'A testátló ≈ 11,33 m. Erre a lapra a 8,4 m-es él merőleges, így sin φ = 8,4 / 11,33 ⇒ φ ≈ 47,8°.'
  },
  {
    id: 'tht-q22',
    questionTypeBadge: 'Hajlásszög',
    figure: FIG_Q22,
    level: 3,
    question: 'Mekkora szöget zár be a kocka testátlójának egyenese a fedőlap síkjával?',
    options: ['≈ 35,3°', '45°', '≈ 54,7°', '30°'],
    correctAnswer: 0,
    explanation: 'Az ABC derékszögű háromszögben AB = a (él), BC = a√2 (lapátló): tg ACB∢ = 1/√2 ⇒ ≈ 35,3°, az élhossztól függetlenül.'
  },
  {
    id: 'tht-q23',
    questionTypeBadge: 'Kocka',
    level: 3,
    question: 'A 3,2 cm élű kockában mekkorák az ABC háromszög oldalai (AB él, BC lapátló, AC testátló)?',
    options: ['3,2 cm; ≈ 4,53 cm; ≈ 5,54 cm', '3,2 cm; ≈ 4,53 cm; 6,4 cm', '3,2 cm; ≈ 5,54 cm; 6,4 cm', '3,2 cm; 3,2 cm; ≈ 4,53 cm'],
    correctAnswer: 0,
    explanation: 'Lapátló: 3,2 · √2 ≈ 4,53 cm; testátló: 3,2 · √3 ≈ 5,54 cm.'
  },
  {
    id: 'tht-q24',
    questionTypeBadge: 'Tetraéder',
    level: 3,
    question: 'Mekkora szöget zár be a szabályos tetraéder oldaléle az alaplappal?',
    options: ['≈ 54,7°', '≈ 35,3°', '60°', '45°'],
    correctAnswer: 0,
    explanation: 'Az oldalél vetülete az alaplapon a köré írt kör sugara, a/√3. cos φ = (a/√3) / a = 1/√3 ⇒ φ ≈ 54,7°. (35,3° az oldalél és a magasság szöge.)'
  },
  {
    id: 'tht-q25',
    questionTypeBadge: 'Világítási szög',
    figure: FIG_Q25,
    level: 3,
    question: 'Egy 76°-os világítási szögű spotlámpát 260 cm magasan rögzítettek, függőlegesen lefelé irányítva. Mekkora a padlón megvilágított terület?',
    options: ['≈ 13,0 m²', '≈ 4,1 m²', '≈ 51,8 m²', '≈ 6,4 m²'],
    correctAnswer: 0,
    explanation: 'r = 2,6 · tg 38° ≈ 2,03 m, T = r²π ≈ 13,0 m². (4,1 m² a π elhagyása, 51,8 m² az átmérő sugárként való használata lenne.)'
  },
  {
    id: 'tht-q26',
    questionTypeBadge: 'Világítási szög',
    level: 3,
    question: 'Legfeljebb milyen magasan legyen ez a 76°-os spotlámpa, ha legfeljebb 8 m²-es területet világíthat be?',
    options: ['≈ 2,04 m', '≈ 1,60 m', '≈ 1,25 m', '2,60 m'],
    correctAnswer: 0,
    explanation: 'r²π ≤ 8 ⇒ r ≤ √(8/π) ≈ 1,60 m; h = r : tg 38° ≈ 2,04 m. (1,60 m maga a sugár.)'
  },
  {
    id: 'tht-q27',
    questionTypeBadge: 'Szöveges feladat',
    level: 3,
    question: 'A túlsó parti torony K-ból 28°-os, a K-tól 250 m-re lévő L-ből 18°-os szögben látszik, és AKL∢ = 90° (A a talppont). Milyen magas a torony?',
    options: ['≈ 102,6 m', '≈ 208,9 m', '≈ 81,2 m', '≈ 132,9 m'],
    correctAnswer: 0,
    explanation: 'AK = h : tg 28°, AL = h : tg 18°, és az AKL derékszögű háromszögben AL² = AK² + 250². Ebből h² · (1/tg² 18° − 1/tg² 28°) = 250² ⇒ h ≈ 102,6 m. (208,9 m akkor jönne ki, ha K, L és A egy egyenesen lenne.)',
    breakdown: ['AK = h / tg 28°, AL = h / tg 18°', 'AL² − AK² = 250²', 'h ≈ 102,6 m']
  },
  {
    id: 'tht-q28',
    questionTypeBadge: 'Látószög',
    level: 3,
    question: 'Kb. mekkora távolságból látszik a legnagyobb szögben a 47 m-es talapzaton álló, 46 m magas Szabadság-szobor?',
    options: ['≈ 66 m', '70 m', '47 m', '93 m'],
    correctAnswer: 0,
    explanation: 'A látószög tg⁻¹(93/d) − tg⁻¹(47/d); ez d = √(47 · 93) ≈ 66 m-nél a legnagyobb (≈ 19,18°). 70 m-ről ≈ 19,15°, 47 m-ről és 93 m-ről egyaránt ≈ 18,19°.'
  },
  {
    id: 'tht-q29',
    questionTypeBadge: 'Hibakeresés',
    level: 3,
    question: 'Egy diák az L-ből mért emelkedési szöget a tg λ = AB / KL = 114 / 250 összefüggésből számolta (λ ≈ 24,4°). Mi a hiba?',
    options: [
      'Az LAB háromszögben a szög melletti befogó AL ≈ 309 m, nem KL',
      'Szinuszt kellett volna használni tangens helyett',
      'Az LAB háromszög nem derékszögű',
      'Nincs hiba, λ ≈ 24,4°'
    ],
    correctAnswer: 0,
    explanation: 'KL nem oldala az LAB háromszögnek. Az L és a talppont vízszintes távolsága AL = 250 : cos 36° ≈ 309 m, így λ ≈ 20°.'
  },
  {
    id: 'tht-q30',
    questionTypeBadge: 'Hajlásszög',
    level: 3,
    question: 'Egy kocka alsó A csúcsát összekötjük a fedőlap középpontjával (F, a BC lapátló felezőpontja, B az A fölötti csúcs). Mekkora szöget zár be az AF egyenes a fedőlappal?',
    options: ['≈ 54,7°', '≈ 35,3°', '45°', '≈ 63,4°'],
    correctAnswer: 0,
    explanation: 'Az ABF háromszög B-nél derékszögű: AB = a, BF = a√2/2. tg φ = a / (a√2/2) = √2 ⇒ φ ≈ 54,7°. (63,4° a tg φ = 2 hibás értékből jönne.)'
  }
];

export const TowerHeightTrigQuiz: React.FC<{
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
      topicId="g11-trig-torony-quiz"
      subtopicId="milyen-magas-a-torony"
      title="Ráadás: Milyen magas a torony? – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: magasságmérés megközelíthetetlen talpponttal, LED-lámpák, háztető, kocka és téglatest."
      badge="11. OSZTÁLY • I. TRIGONOMETRIA • KVÍZ"
      questions={TOWER_HEIGHT_TRIG_QUESTIONS}
      cheatSheets={[
        {
          title: 'A toronymérés lépései',
          items: [
            'AKL △ (vízszintes, derékszög K-nál): AK = KL · tg ALK∢',
            'AKB △ (függőleges, derékszög A-nál): AB = AK · tg AKB∢',
            'AL = KL : cos ALK∢; L-ből: tg λ = AB / AL',
            'Tankönyv: AK ≈ 182 m, AB ≈ 114 m, AL ≈ 309 m, λ ≈ 20°'
          ]
        },
        {
          title: 'Térbeli derékszögű háromszögek',
          items: [
            'Függőleges egyenes ⊥ a vízszintes sík minden egyenese',
            'Egyenes és sík szöge: az egyenes és a vetülete szöge',
            'Kocka: testátló–lap ≈ 35,3°; tetraéder oldalél–alaplap ≈ 54,7°',
            'Gúla: h = (fél alapél) · tg(oldallap hajlásszöge)'
          ]
        },
        {
          title: 'Lámpák, látószögek',
          items: [
            'Megvilágított kör: r = h · tg(világítási szög / 2)',
            'Depressziószög: lefelé mért szög a vízszinteshez képest',
            'Szabadság-szobor: legnagyobb látószög ≈ 19,2° kb. 66 m-ről',
            'Fa: 6 : tg 10° ≈ 34 m távolság ⇒ fa ≈ 19,7 m'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <TowerHeightTrigMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <TowerHeightTrigSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default TowerHeightTrigQuiz;
