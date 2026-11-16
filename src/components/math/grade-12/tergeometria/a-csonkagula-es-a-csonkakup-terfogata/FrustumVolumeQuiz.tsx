import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FrustumVolumeMatcher } from './FrustumVolumeMatcher';
import { FrustumVolumeSorter } from './FrustumVolumeSorter';

// ---------------------------------------------------------------------------
// Ábra-segédek (nem exportált): ferde (kavalier) vetület, takart élek szaggatva,
// derékszög = negyedkörív ponttal (magyar jelölés), ismeretlen = piros „?”.
// ---------------------------------------------------------------------------
type Pt = [number, number];
const kR = (n: number) => Math.round(n * 10) / 10;
const K_INK = '#0f172a';
const K_EDGE = '#4338ca';
const K_HID = '#64748b';
const K_UNK = '#dc2626';
const K_AUX = '#059669';
const K_ARC = '#d97706';
const K_FILL = 'rgba(99,102,241,0.10)';

const KFig: React.FC<{ children: React.ReactNode; w?: number; h?: number; className?: string }> = ({ children, w = 240, h = 160, className }) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    className={className ?? 'w-full max-w-[280px] h-auto mx-auto'}
    xmlns="http://www.w3.org/2000/svg"
    fontFamily="system-ui, sans-serif"
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const KT: React.FC<{ p: Pt; t: string; s?: number; c?: string; a?: 'start' | 'middle' | 'end'; b?: boolean }> = ({
  p,
  t,
  s = 11,
  c,
  a = 'middle',
  b = true
}) => (
  <text
    x={kR(p[0])}
    y={kR(p[1])}
    fontSize={s}
    fontWeight={b ? 'bold' : 'normal'}
    textAnchor={a}
    dominantBaseline="middle"
    fill={t.includes('?') ? K_UNK : c ?? K_INK}
  >
    {t}
  </text>
);

const KL: React.FC<{ a: Pt; b: Pt; c?: string; w?: number; d?: boolean }> = ({ a, b, c = K_EDGE, w = 1.8, d }) => (
  <line
    x1={kR(a[0])}
    y1={kR(a[1])}
    x2={kR(b[0])}
    y2={kR(b[1])}
    stroke={c}
    strokeWidth={w}
    strokeDasharray={d ? '4 3' : undefined}
    strokeLinecap="round"
  />
);

const KPoly: React.FC<{ p: Pt[]; fill?: string; c?: string; w?: number }> = ({ p, fill = K_FILL, c = K_EDGE, w = 1.8 }) => (
  <polygon points={p.map((q) => `${kR(q[0])},${kR(q[1])}`).join(' ')} fill={fill} stroke={c} strokeWidth={w} strokeLinejoin="round" />
);

const kUnit = (p: Pt): Pt => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};

/** Derékszög: negyedkörív ponttal a v csúcsnál. */
const KRight: React.FC<{ v: Pt; p1: Pt; p2: Pt; r?: number }> = ({ v, p1, p2, r = 11 }) => {
  const u1 = kUnit([p1[0] - v[0], p1[1] - v[1]]);
  const u2 = kUnit([p2[0] - v[0], p2[1] - v[1]]);
  const s: Pt = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const e: Pt = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const bi = kUnit([u1[0] + u2[0], u1[1] + u2[1]]);
  return (
    <g>
      <path d={`M ${kR(s[0])} ${kR(s[1])} A ${r} ${r} 0 0 ${sweep} ${kR(e[0])} ${kR(e[1])}`} fill="none" stroke={K_INK} strokeWidth="1.2" />
      <circle cx={kR(v[0] + bi[0] * r * 0.55)} cy={kR(v[1] + bi[1] * r * 0.55)} r="1.7" fill={K_INK} />
    </g>
  );
};

/** Szögív a v csúcsnál, felirattal. */
const KAng: React.FC<{ v: Pt; p1: Pt; p2: Pt; r?: number; t?: string; tr?: number }> = ({ v, p1, p2, r = 16, t, tr }) => {
  const u1 = kUnit([p1[0] - v[0], p1[1] - v[1]]);
  const u2 = kUnit([p2[0] - v[0], p2[1] - v[1]]);
  const s: Pt = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const e: Pt = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const bi = kUnit([u1[0] + u2[0], u1[1] + u2[1]]);
  const d = tr ?? r + 10;
  return (
    <g>
      <path d={`M ${kR(s[0])} ${kR(s[1])} A ${r} ${r} 0 0 ${sweep} ${kR(e[0])} ${kR(e[1])}`} fill="none" stroke={K_ARC} strokeWidth="1.6" />
      {t && <KT p={[v[0] + bi[0] * d, v[1] + bi[1] * d]} t={t} s={10} c="#b45309" />}
    </g>
  );
};

/** Ellipszis (vízszintes kör képe): elülső fél folytonos, hátsó fél szaggatott (ha hidden). */
const KEll: React.FC<{ cx: number; cy: number; rx: number; ry: number; hidden?: boolean; c?: string; fill?: string }> = ({
  cx,
  cy,
  rx,
  ry,
  hidden,
  c = K_EDGE,
  fill
}) => (
  <g>
    {fill && <ellipse cx={kR(cx)} cy={kR(cy)} rx={kR(rx)} ry={kR(ry)} fill={fill} stroke="none" />}
    <path d={`M ${kR(cx - rx)} ${kR(cy)} A ${kR(rx)} ${kR(ry)} 0 0 0 ${kR(cx + rx)} ${kR(cy)}`} fill="none" stroke={c} strokeWidth="1.8" />
    <path
      d={`M ${kR(cx - rx)} ${kR(cy)} A ${kR(rx)} ${kR(ry)} 0 0 1 ${kR(cx + rx)} ${kR(cy)}`}
      fill="none"
      stroke={hidden ? K_HID : c}
      strokeWidth={hidden ? 1.3 : 1.8}
      strokeDasharray={hidden ? '4 3' : undefined}
    />
  </g>
);

type KLab = { R?: string; r?: string; a?: string; M?: string };

/** Csonkakúp (rs = 0: kúp, rs = Rs: henger) ferde nézetben, feliratokkal. */
const KCone: React.FC<{ cx: number; yb: number; yt: number; Rs: number; rs: number; e?: number; lab?: KLab; axis?: boolean }> = ({
  cx,
  yb,
  yt,
  Rs,
  rs,
  e = 0.3,
  lab = {},
  axis = true
}) => (
  <g>
    <KEll cx={cx} cy={yb} rx={Rs} ry={Rs * e} hidden fill={K_FILL} />
    {rs > 0 && <KEll cx={cx} cy={yt} rx={rs} ry={rs * e} fill="rgba(99,102,241,0.16)" />}
    <KL a={[cx - Rs, yb]} b={[cx - rs, yt]} />
    <KL a={[cx + Rs, yb]} b={[cx + rs, yt]} />
    {axis && <KL a={[cx, yb]} b={[cx, yt]} c={K_AUX} w={1.4} d />}
    {lab.R && <KL a={[cx, yb]} b={[cx + Rs, yb]} c={K_AUX} w={1.4} />}
    {lab.r && rs > 0 && <KL a={[cx, yt]} b={[cx + rs, yt]} c={K_AUX} w={1.4} />}
    {lab.R && <KT p={[cx + Rs / 2, yb + 9]} t={lab.R} s={10.5} />}
    {lab.r && rs > 0 && <KT p={[cx + rs / 2, yt - 8]} t={lab.r} s={10.5} />}
    {lab.a && <KT p={[cx + (Rs + rs) / 2 + 7, (yb + yt) / 2]} t={lab.a} s={10.5} a="start" />}
    {lab.M && <KT p={[cx - 4, (yb + yt) / 2]} t={lab.M} s={10.5} a="end" c={K_AUX} />}
  </g>
);

/** Négyzet alapú test ferde nézetben: b = 0 gúla, 0 < b < a csonkagúla, b = a hasáb. Takart csúcs: hátsó bal alsó. */
const KSq: React.FC<{
  ox: number;
  oy: number;
  s: number;
  a: number;
  b: number;
  h: number;
  k?: number;
  lab?: { a?: string; b?: string; h?: string; mo?: string; edge?: string };
  axis?: boolean;
}> = ({ ox, oy, s, a, b, h, k = 0.42, lab = {}, axis = true }) => {
  const P = (x: number, y: number, z: number): Pt => [ox + s * (x + k * z * 0.866), oy - s * (y + k * z * 0.5)];
  const d = (a - b) / 2;
  const B = [P(0, 0, 0), P(a, 0, 0), P(a, 0, a), P(0, 0, a)];
  const T = [P(d, h, d), P(d + b, h, d), P(d + b, h, d + b), P(d, h, d + b)];
  const top = b > 0;
  const c0 = P(a / 2, 0, a / 2);
  const c1 = P(a / 2, h, a / 2);
  const m0 = P(a / 2, 0, 0);
  const m1 = P(a / 2, h, d);
  return (
    <g>
      <KPoly p={top ? [B[0], B[1], T[1], T[0]] : [B[0], B[1], T[0]]} fill={K_FILL} c="none" w={0} />
      <KL a={B[0]} b={B[1]} />
      <KL a={B[1]} b={B[2]} />
      <KL a={B[2]} b={B[3]} c={K_HID} w={1.3} d />
      <KL a={B[3]} b={B[0]} c={K_HID} w={1.3} d />
      {top && (
        <>
          <KL a={T[0]} b={T[1]} />
          <KL a={T[1]} b={T[2]} />
          <KL a={T[2]} b={T[3]} />
          <KL a={T[3]} b={T[0]} />
        </>
      )}
      <KL a={B[0]} b={T[0]} />
      <KL a={B[1]} b={T[1]} />
      <KL a={B[2]} b={T[2]} />
      <KL a={B[3]} b={T[3]} c={K_HID} w={1.3} d />
      {axis && <KL a={c0} b={c1} c={K_AUX} w={1.4} d />}
      {lab.mo && <KL a={m0} b={m1} c={K_ARC} w={1.4} />}
      {lab.a && <KT p={[(B[0][0] + B[1][0]) / 2, B[0][1] + 10]} t={lab.a} s={10.5} />}
      {lab.b && top && <KT p={[(T[0][0] + T[1][0]) / 2, T[0][1] - 8]} t={lab.b} s={10.5} />}
      {lab.h && <KT p={[(c0[0] + c1[0]) / 2 + 4, (c0[1] + c1[1]) / 2]} t={lab.h} s={10.5} a="start" c={K_AUX} />}
      {lab.mo && <KT p={[(m0[0] + m1[0]) / 2 - 4, (m0[1] + m1[1]) / 2 + 2]} t={lab.mo} s={10.5} a="end" c="#b45309" />}
      {lab.edge && <KT p={[(B[1][0] + T[1][0]) / 2 + 6, (B[1][1] + T[1][1]) / 2]} t={lab.edge} s={10.5} a="start" />}
    </g>
  );
};

/** Szabályos n-szög alapú test (rs = 0 gúla, rs < Rs csonkagúla, rs = Rs hasáb) ellipszisre írt alappal. */
const KNgon: React.FC<{ cx: number; yb: number; yt: number; Rs: number; rs: number; n: number; e?: number; phase?: number }> = ({
  cx,
  yb,
  yt,
  Rs,
  rs,
  n,
  e = 0.32,
  phase = 0
}) => {
  const ang = Array.from({ length: n }, (_, i) => phase + (2 * Math.PI * i) / n);
  const half = Math.PI / n;
  const B = ang.map((t): Pt => [cx + Rs * Math.cos(t), yb + Rs * e * Math.sin(t)]);
  const T = ang.map((t): Pt => [cx + rs * Math.cos(t), yt + rs * e * Math.sin(t)]);
  const faceBack = (t: number) => Math.sin(t) < -1e-6;
  return (
    <g>
      {ang.map((t, i) => {
        const j = (i + 1) % n;
        const eh = faceBack(t + half);
        const vh = faceBack(t - half) && faceBack(t + half);
        return (
          <g key={i}>
            <KL a={B[i]} b={B[j]} c={eh ? K_HID : K_EDGE} w={eh ? 1.3 : 1.8} d={eh} />
            {rs > 0 && <KL a={T[i]} b={T[j]} />}
            <KL a={B[i]} b={rs > 0 ? T[i] : [cx, yt]} c={vh ? K_HID : K_EDGE} w={vh ? 1.3 : 1.8} d={vh} />
          </g>
        );
      })}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const sqFig = (lab: { a?: string; b?: string; h?: string; mo?: string; edge?: string }, a = 12, b = 8) => (
  <KFig>
    <KSq ox={50} oy={135} s={9} a={a} b={b} h={9} lab={lab} />
  </KFig>
);
const coneFig = (lab: KLab, Rs = 80, rs = 40) => (
  <KFig>
    <KCone cx={115} yb={128} yt={42} Rs={Rs} rs={rs} e={0.26} lab={lab} />
  </KFig>
);
const conePlainFig = (r: string, m: string, cutY?: number, cutLab?: string) => (
  <KFig>
    <KEll cx={110} cy={130} rx={62} ry={16} hidden fill={K_FILL} />
    <KL a={[110, 18]} b={[48, 130]} />
    <KL a={[110, 18]} b={[172, 130]} />
    <KL a={[110, 18]} b={[110, 130]} c={K_AUX} w={1.3} d />
    <KL a={[110, 130]} b={[172, 130]} c={K_AUX} w={1.3} />
    <KT p={[141, 140]} t={r} s={10.5} />
    <KT p={[104, 80]} t={m} s={10.5} a="end" c={K_AUX} />
    {cutY !== undefined && (
      <g>
        <KEll cx={110} cy={cutY} rx={(62 * (cutY - 18)) / 112} ry={(16 * (cutY - 18)) / 112} hidden c="#d97706" />
        {cutLab && <KT p={[196, cutY]} t={cutLab} s={10} c="#b45309" />}
      </g>
    )}
  </KFig>
);

const FIG_Q3 = sqFig({ a: 'a = 12', b: 'b = 8', h: 'M = 6' });
const FIG_Q4 = coneFig({ R: 'R = 4', r: 'r = 2', M: 'M = 3' });
const FIG_Q8 = conePlainFig('r', 'm', 74, 'm/2');
const FIG_Q10 = (
  <KFig>
    <KPoly p={[[40, 135], [200, 135], [120, 55]]} fill="rgba(99,102,241,0.12)" />
    <KL a={[120, 55]} b={[120, 135]} c={K_AUX} w={1.3} d />
    <KRight v={[120, 135]} p1={[120, 55]} p2={[200, 135]} r={10} />
    <KAng v={[200, 135]} p1={[40, 135]} p2={[120, 55]} r={20} t="45°" tr={34} />
    <KT p={[114, 95]} t="8 cm" s={10.5} a="end" c={K_AUX} />
    <KT p={[160, 148]} t="a/2 = ?" s={10.5} />
    <KT p={[120, 20]} t="síkmetszet az oldallapmagasságokon át" s={9.5} c="#334155" b={false} />
  </KFig>
);
const FIG_Q12 = (
  <KFig>
    <KPoly p={[[60, 140], [180, 140], [160, 100], [80, 100]]} fill={K_FILL} />
    <KL a={[80, 100]} b={[120, 20]} c={K_HID} w={1.3} d />
    <KL a={[160, 100]} b={[120, 20]} c={K_HID} w={1.3} d />
    <KL a={[120, 140]} b={[120, 100]} c={K_AUX} w={1.3} d />
    <KL a={[120, 100]} b={[120, 20]} c={K_ARC} w={1.3} d />
    <KRight v={[120, 140]} p1={[120, 100]} p2={[180, 140]} r={9} />
    <KT p={[120, 152]} t="12 cm" s={10.5} />
    <KT p={[100, 92]} t="8 cm" s={10.5} />
    <KT p={[126, 122]} t="6 cm" s={10.5} a="start" c={K_AUX} />
    <KT p={[126, 60]} t="x = ?" s={10.5} a="start" />
  </KFig>
);
const FIG_Q13 = (
  <KFig>
    <KEll cx={110} cy={138} rx={60} ry={14} hidden fill={K_FILL} />
    <KEll cx={110} cy={98} rx={40} ry={9.3} hidden c="#d97706" />
    <KEll cx={110} cy={58} rx={20} ry={4.7} hidden c="#d97706" />
    <KL a={[110, 18]} b={[50, 138]} />
    <KL a={[110, 18]} b={[170, 138]} />
    <KL a={[110, 138]} b={[170, 138]} c={K_AUX} w={1.3} />
    <KT p={[140, 148]} t="3 cm" s={10} />
    <KL a={[200, 18]} b={[200, 58]} c={K_ARC} w={1.2} />
    <KL a={[215, 18]} b={[215, 98]} c={K_ARC} w={1.2} />
    <KL a={[230, 18]} b={[230, 138]} c={K_HID} w={1.2} />
    <KT p={[196, 38]} t="4" s={10} a="end" c="#b45309" />
    <KT p={[211, 78]} t="8" s={10} a="end" c="#b45309" />
    <KT p={[226, 118]} t="12" s={10} a="end" c={K_HID} />
    <KT p={[110, 78]} t="?" s={12} />
  </KFig>
);
const FIG_Q16 = coneFig({ R: 'R = 10', r: 'r = 4', M: 'M = 5' }, 90, 36);
const FIG_Q19 = (
  <KFig>
    <KPoly p={[[80, 140], [180, 140], [80, 30]]} fill="rgba(5,150,105,0.12)" c={K_AUX} />
    <KRight v={[80, 140]} p1={[80, 30]} p2={[180, 140]} r={11} />
    <KT p={[130, 152]} t="2√2 cm" s={10.5} />
    <KT p={[138, 80]} t="7 cm" s={10.5} a="start" />
    <KT p={[74, 85]} t="M = ?" s={11} a="end" />
  </KFig>
);
const FIG_Q21 = (
  <KFig>
    <KPoly p={[[40, 135], [200, 135], [120, 35]]} fill="rgba(99,102,241,0.12)" />
    <KL a={[120, 35]} b={[120, 135]} c={K_AUX} w={1.3} d />
    <KRight v={[120, 135]} p1={[120, 35]} p2={[200, 135]} r={10} />
    <KAng v={[200, 135]} p1={[40, 135]} p2={[120, 35]} r={20} t="52°" tr={34} />
    <KT p={[170, 80]} t="10 cm" s={10.5} a="start" />
    <KT p={[114, 90]} t="M = ?" s={10.5} a="end" />
    <KT p={[120, 150]} t="átlós síkmetszet" s={9.5} c="#334155" b={false} />
  </KFig>
);
const FIG_Q24 = conePlainFig('3,5 cm', '15 cm', 112, '? cm az alaptól');
const FIG_Q25 = (
  <KFig>
    <KPoly p={[[30, 135], [210, 135], [155, 40], [85, 40]]} fill={K_FILL} />
    <KL a={[155, 40]} b={[155, 135]} c={K_AUX} w={1.3} d />
    <KRight v={[155, 135]} p1={[155, 40]} p2={[30, 135]} r={10} />
    <KAng v={[210, 135]} p1={[30, 135]} p2={[155, 40]} r={18} t="65°" tr={30} />
    <KT p={[120, 148]} t="96 m" s={10.5} />
    <KT p={[120, 30]} t="? m" s={10.5} />
    <KT p={[150, 88]} t="75 m" s={10.5} a="end" c={K_AUX} />
  </KFig>
);
const FIG_Q27 = (
  <KFig>
    <KNgon cx={110} yb={135} yt={18} Rs={70} rs={0} n={3} e={0.4} phase={0.5} />
    <KL a={[60, 96]} b={[160, 96]} c="#d97706" w={1.2} d />
    <KL a={[86, 57]} b={[134, 57]} c="#d97706" w={1.2} d />
    <KT p={[205, 30]} t="24 cm" s={10} c={K_AUX} />
    <KT p={[205, 46]} t="3 egyenlő rész" s={9.5} c="#334155" b={false} />
    <KT p={[110, 152]} t="alapél 14 cm" s={10} />
  </KFig>
);
const FIG_Q28 = coneFig({ R: 'R = 5', r: 'r = 5,7', a: 'a = 5,6' }, 72, 82);
const FIG_Q30 = sqFig({ a: '63 mm', b: '27 mm', h: 'M = ?' }, 12, 5);

export const FRUSTUM_VOLUME_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'fv-q1',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik a szabályos négyoldalú csonkagúla térfogatképlete (alapél a, fedőél b, magasság M)?',
    options: ['V = M/3 · (a² + ab + b²)', 'V = M/3 · (a² + b²)', 'V = M · (a² + ab + b²)', 'V = M/2 · (a² + b²)'],
    correctAnswer: 0,
    explanation: 'Az általános V = M/3 · (T + √(Tt) + t) képletbe T = a², t = b², √(Tt) = ab kerül.'
  },
  {
    id: 'fv-q2',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik a csonkakúp térfogatképlete (R, r a sugarak, M a magasság)?',
    options: ['V = Mπ/3 · (R² + Rr + r²)', 'V = Mπ/3 · (R² + r²)', 'V = Mπ · (R + r)²/3', 'V = Mπ/2 · (R² + r²)'],
    correctAnswer: 0,
    explanation: 'T = R²π, t = r²π, √(Tt) = Rrπ ⇒ V = M/3 · (R²π + Rrπ + r²π) = Mπ/3 · (R² + Rr + r²).'
  },
  {
    id: 'fv-q3',
    questionTypeBadge: 'Csonkagúla térfogata',
    figure: FIG_Q3,
    level: 1,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 12 cm, fedőéle 8 cm, magassága 6 cm. Mekkora a térfogata?',
    options: ['608 cm³', '624 cm³', '416 cm³', '1824 cm³'],
    correctAnswer: 0,
    explanation: 'V = 6/3 · (144 + 96 + 64) = 2 · 304 = 608 cm³. (624 a hibás „átlagolás”: 6 · (144 + 64)/2.)'
  },
  {
    id: 'fv-q4',
    questionTypeBadge: 'Csonkakúp térfogata',
    figure: FIG_Q4,
    level: 1,
    question: 'Egy csonkakúpra R = 4 cm, r = 2 cm, M = 3 cm. Mekkora a térfogata?',
    options: ['28π ≈ 88,0 cm³', '20π ≈ 62,8 cm³', '84π ≈ 263,9 cm³', '30π ≈ 94,2 cm³'],
    correctAnswer: 0,
    explanation: 'V = 3π/3 · (16 + 8 + 4) = 28π ≈ 88,0 cm³.'
  },
  {
    id: 'fv-q5',
    questionTypeBadge: 'Térfogatarány',
    level: 1,
    question: 'A levágott kis gúla az eredeti gúlához λ = 0,6 arányban hasonló. Mennyi a térfogataik aránya (V_kicsi : V_nagy)?',
    options: ['0,216', '0,36', '0,6', '0,784'],
    correctAnswer: 0,
    explanation: 'Hasonló testek térfogatainak aránya λ³ = 0,6³ = 0,216.'
  },
  {
    id: 'fv-q6',
    questionTypeBadge: 'Csonka rész',
    level: 1,
    question: 'λ = 0,6 esetén a csonkagúla térfogata hányad része az eredeti gúláénak?',
    options: ['0,784', '0,4', '0,216', '0,64'],
    correctAnswer: 0,
    explanation: 'V_csonka = V_nagy − 0,216 · V_nagy = 0,784 · V_nagy.'
  },
  {
    id: 'fv-q7',
    questionTypeBadge: 'Általános képlet',
    level: 1,
    question: 'Egy csonkagúla alaplapjának területe 9 cm², fedőlapjáé 4 cm², magassága 6 cm. Mekkora a térfogata?',
    options: ['38 cm³', '26 cm³', '39 cm³', '114 cm³'],
    correctAnswer: 0,
    explanation: 'V = 6/3 · (9 + √36 + 4) = 2 · 19 = 38 cm³.'
  },
  {
    id: 'fv-q8',
    questionTypeBadge: 'Kúp felezése',
    figure: FIG_Q8,
    level: 1,
    question: 'Egy kúpot a magassága felénél az alaplappal párhuzamos síkkal elvágunk. Hányad része a levágott kis kúp térfogata az egész kúpénak?',
    options: ['1/8', '1/2', '1/4', '1/6'],
    correctAnswer: 0,
    explanation: 'λ = 1/2 ⇒ λ³ = 1/8. (A csonkakúp így a térfogat 7/8 része.)'
  },
  {
    id: 'fv-q9',
    questionTypeBadge: 'Módszer',
    level: 1,
    question: 'Hogyan kaphatjuk meg a csonkagúla térfogatát az eredeti gúla segítségével?',
    options: [
      'Az eredeti gúla térfogatából kivonjuk a lemetszett, hozzá hasonló kis gúla térfogatát',
      'Az eredeti gúla és a kis gúla térfogatát összeadjuk',
      'Az eredeti gúla térfogatát megfelezzük',
      'Az alaplap és a fedőlap területének átlagát szorozzuk a magassággal'
    ],
    correctAnswer: 0,
    explanation: 'V_csonka = V_nagy − V_kicsi; a kis gúla hasonló az eredetihez, így V_kicsi = λ³ · V_nagy.'
  },
  {
    id: 'fv-q10',
    questionTypeBadge: '45°-os oldallap',
    figure: FIG_Q10,
    level: 1,
    question: 'Egy szabályos négyoldalú gúla magassága 8 cm, oldallapjai 45°-os szöget zárnak be az alaplappal. Mekkora az alaplap területe?',
    options: ['256 cm²', '64 cm²', '128 cm²', '512 cm²'],
    correctAnswer: 0,
    explanation: '45°-nál a fél alapél egyenlő a magassággal: a/2 = 8 cm ⇒ a = 16 cm ⇒ T = 256 cm².'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'fv-q11',
    questionTypeBadge: 'Gúla − gúla',
    level: 2,
    question: 'Az előző gúlából (a = 16 cm, M = 8 cm) levágunk egy 6 cm magas gúlát (alapéle 12 cm). Mekkora a megmaradt csonkagúla térfogata?',
    options: ['≈ 394,7 cm³', '≈ 682,7 cm³', '288 cm³', '≈ 970,7 cm³'],
    correctAnswer: 0,
    explanation: 'V_nagy = 256 · 8/3 ≈ 682,7 cm³, V_kicsi = 144 · 6/3 = 288 cm³ ⇒ V_csonka ≈ 394,7 cm³.',
    breakdown: ['V_nagy = 256 · 8 / 3 ≈ 682,67 cm³', 'V_kicsi = 144 · 6 / 3 = 288 cm³', 'V_csonka ≈ 394,67 cm³']
  },
  {
    id: 'fv-q12',
    questionTypeBadge: 'Kiegészítő gúla',
    figure: FIG_Q12,
    level: 2,
    question: 'Egy négyzetes csonkagúla alapéle 12 cm, fedőéle 8 cm, magassága 6 cm. Milyen magas a kiegészítő (levágott) gúla?',
    options: ['12 cm', '18 cm', '4 cm', '9 cm'],
    correctAnswer: 0,
    explanation: '8 : 12 = x : (x + 6) ⇒ 12x = 8x + 48 ⇒ x = 12 cm. (18 cm az eredeti gúla magassága.)'
  },
  {
    id: 'fv-q13',
    questionTypeBadge: 'Csonkakúp térfogata',
    figure: FIG_Q13,
    level: 2,
    question: 'Egy kúp alapkörének sugara 3 cm, magassága 12 cm. A csúcstól 4 és 8 cm-re az alappal párhuzamos síkokkal elmetsszük. Mekkora a középső csonkakúp térfogata?',
    options: ['28π/3 ≈ 29,3 cm³', '32π/3 ≈ 33,5 cm³', '4π/3 ≈ 4,2 cm³', '76π/3 ≈ 79,6 cm³'],
    correctAnswer: 0,
    explanation: 'A 8 cm-es kúp (r = 2): 32π/3; a 4 cm-es kúp (r = 1): 4π/3. Különbség: 28π/3 ≈ 29,3 cm³.'
  },
  {
    id: 'fv-q14',
    questionTypeBadge: 'Csonkakúp térfogata',
    level: 2,
    question: 'Ugyanennél a kúpnál (r = 3 cm, m = 12 cm) mekkora az alsó csonkakúp térfogata (a csúcstól 8 cm-re lévő vágás alatt)?',
    options: ['76π/3 ≈ 79,6 cm³', '28π/3 ≈ 29,3 cm³', '36π ≈ 113,1 cm³', '104π/3 ≈ 108,9 cm³'],
    correctAnswer: 0,
    explanation: 'Teljes kúp: 9π · 12/3 = 36π; a felső 8 cm-es kúp 32π/3 ⇒ 36π − 32π/3 = 76π/3 ≈ 79,6 cm³.'
  },
  {
    id: 'fv-q15',
    questionTypeBadge: 'Arányok',
    level: 2,
    question: 'Egy kúpot a magasságát három egyenlő részre osztó, az alappal párhuzamos síkokkal elvágunk. Milyen arányban állnak a részek térfogatai (felülről lefelé)?',
    options: ['1 : 7 : 19', '1 : 2 : 3', '1 : 8 : 27', '1 : 4 : 9'],
    correctAnswer: 0,
    explanation: 'A csúcsot tartalmazó kúpok térfogata 1 : 8 : 27 arányú (λ³), a különbségek: 1, 8 − 1 = 7, 27 − 8 = 19.'
  },
  {
    id: 'fv-q16',
    questionTypeBadge: 'Eredeti kúp',
    figure: FIG_Q16,
    level: 2,
    question: 'Egy csonkakúpra R = 10 cm, r = 4 cm, M = 5 cm. Milyen magas az a kúp, amelyből származik?',
    options: ['25/3 ≈ 8,33 cm', '10/3 ≈ 3,33 cm', '12,5 cm', '7,5 cm'],
    correctAnswer: 0,
    explanation: 'x : (x + 5) = 4 : 10 ⇒ x = 10/3 cm a kiegészítő kúp, az eredeti kúp 5 + 10/3 = 25/3 ≈ 8,33 cm.'
  },
  {
    id: 'fv-q17',
    questionTypeBadge: 'Csonkakúp térfogata',
    level: 2,
    question: 'Mekkora a térfogata annak a csonkakúpnak, amelyre R = 10 cm, r = 4 cm, M = 5 cm?',
    options: ['260π ≈ 816,8 cm³', '≈ 607,4 cm³', '≈ 911,1 cm³', '780π ≈ 2450,4 cm³'],
    correctAnswer: 0,
    explanation: 'V = 5π/3 · (100 + 40 + 16) = 5π/3 · 156 = 260π ≈ 816,8 cm³.'
  },
  {
    id: 'fv-q18',
    questionTypeBadge: 'Zselés cukor',
    level: 2,
    question: 'Egy csonkakúp alakú zselés cukorka alaplapja 310 mm², fedőlapja 180 mm², magassága 17 mm. Mekkora a térfogata?',
    options: ['≈ 4115 mm³', '4165 mm³', '≈ 2777 mm³', '≈ 12 346 mm³'],
    correctAnswer: 0,
    explanation: 'V = 17/3 · (310 + √(310 · 180) + 180) ≈ 17/3 · (310 + 236,2 + 180) ≈ 4115 mm³ ≈ 4,12 cm³.'
  },
  {
    id: 'fv-q19',
    questionTypeBadge: 'Gúla magassága',
    figure: FIG_Q19,
    level: 2,
    question: 'A Valençay-sajt eredetileg szabályos négyoldalú gúla volt: alapéle 4 cm, oldaléle 7 cm. Mekkora volt a magassága?',
    options: ['√41 ≈ 6,4 cm', '√45 ≈ 6,7 cm', '√33 ≈ 5,7 cm', '√17 ≈ 4,1 cm'],
    correctAnswer: 0,
    explanation: 'A fél átló 2√2 cm, így M = √(49 − 8) = √41 ≈ 6,4 cm. (√45: fél alapéllel, √17: teljes átlóval számolt hibás érték.)'
  },
  {
    id: 'fv-q20',
    questionTypeBadge: 'Sajt térfogata',
    level: 2,
    question: 'A sajtgúla (a = 4 cm, M ≈ 6,4 cm) tetejét levágják, a kis gúla magassága az eredeti 60%-a. Mekkora a megmaradt csonkagúla térfogata?',
    options: ['≈ 26,8 cm³', '≈ 7,4 cm³', '≈ 34,1 cm³', '≈ 20,5 cm³'],
    correctAnswer: 0,
    explanation: 'V_nagy = 16 · √41/3 ≈ 34,1 cm³, V_csonka = (1 − 0,6³) · V_nagy = 0,784 · 34,1 ≈ 26,8 cm³ (a tankönyv kerekítve 26,7 cm³-t ír).'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'fv-q21',
    questionTypeBadge: 'Gúla adatai',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy szabályos négyoldalú gúla oldalélei 10 cm hosszúak, és 52°-os szöget zárnak be az alaplap síkjával. Mekkora a magassága és az alapéle?',
    options: ['M ≈ 7,88 cm; a ≈ 8,71 cm', 'M ≈ 6,16 cm; a ≈ 11,14 cm', 'M ≈ 7,88 cm; a ≈ 6,16 cm', 'M ≈ 7,88 cm; a ≈ 12,31 cm'],
    correctAnswer: 0,
    explanation: 'M = 10 · sin 52° ≈ 7,88 cm; fél átló = 10 · cos 52° ≈ 6,16 cm ⇒ átló ≈ 12,31 cm ⇒ alapél = 12,31/√2 ≈ 8,71 cm.'
  },
  {
    id: 'fv-q22',
    questionTypeBadge: 'Darabolás',
    level: 3,
    question: 'Az előző gúlát (M ≈ 7,88 cm, V ≈ 199,1 cm³) az alaplappal párhuzamos, attól 2 cm-re lévő sík két részre vágja. Mekkora a csonkagúla térfogata?',
    options: ['≈ 116,4 cm³', '≈ 82,7 cm³', '≈ 50,5 cm³', '≈ 148,6 cm³'],
    correctAnswer: 0,
    explanation: 'A kis gúla magassága 7,88 − 2 = 5,88 cm, λ = 5,88/7,88 ≈ 0,746, λ³ ≈ 0,416 ⇒ V_kicsi ≈ 82,7 cm³, V_csonka ≈ 116,4 cm³.',
    breakdown: ['λ = 5,88 / 7,88 ≈ 0,746', 'λ³ ≈ 0,4155', 'V_kicsi ≈ 0,4155 · 199,1 ≈ 82,7 cm³', 'V_csonka ≈ 116,4 cm³']
  },
  {
    id: 'fv-q23',
    questionTypeBadge: 'Sűrűség',
    level: 3,
    question: 'Egy zselés cukorka térfogata ≈ 4,115 cm³, és 16 darab tömege 10 dkg. Mekkora a zselé sűrűsége?',
    options: ['≈ 1,52 g/cm³', '≈ 0,66 g/cm³', '≈ 24,3 g/cm³', '6,25 g/cm³'],
    correctAnswer: 0,
    explanation: 'Egy szem tömege 100 g / 16 = 6,25 g ⇒ ρ = 6,25 / 4,115 ≈ 1,52 g/cm³.'
  },
  {
    id: 'fv-q24',
    questionTypeBadge: 'Térfogat felezése',
    figure: FIG_Q24,
    level: 3,
    question: 'Egy 7 cm átmérőjű, 15 cm magas kúp alakú édességet az alaplappal párhuzamos síkkal két egyenlő térfogatú részre akarnak vágni. Az alaplaptól milyen távolságban kell vágni?',
    options: ['≈ 3,09 cm', '7,5 cm', '≈ 11,91 cm', '≈ 4,39 cm'],
    correctAnswer: 0,
    explanation: 'A csúcsot tartalmazó kis kúp térfogata a fele: λ³ = 1/2 ⇒ λ = 1/∛2 ≈ 0,794 ⇒ magassága ≈ 11,91 cm, így az alaptól 15 − 11,91 ≈ 3,09 cm-re kell vágni.'
  },
  {
    id: 'fv-q25',
    questionTypeBadge: 'Csonkakúp-épület',
    figure: FIG_Q25,
    level: 3,
    question: 'A Rio de Janeiró-i székesegyház csonkakúp alakú: alapkörének átmérője 96 m, magassága 75 m, alkotói 65°-os szöget zárnak be a vízszintessel. Mekkora a fedőkör átmérője?',
    options: ['≈ 26 m', '≈ 61 m', '≈ 13 m', '≈ 35 m'],
    correctAnswer: 0,
    explanation: 'R − r = 75 / tg 65° ≈ 34,97 m ⇒ r ≈ 48 − 34,97 ≈ 13,03 m ⇒ átmérő ≈ 26 m.'
  },
  {
    id: 'fv-q26',
    questionTypeBadge: 'Csonkakúp-épület',
    level: 3,
    question: 'A székesegyház (R = 48 m, r ≈ 13,03 m, M = 75 m) térfogata körülbelül:',
    options: ['≈ 243 000 m³', '≈ 730 000 m³', '≈ 194 000 m³', '≈ 291 000 m³'],
    correctAnswer: 0,
    explanation: 'V = 75π/3 · (48² + 48 · 13,03 + 13,03²) ≈ 25π · 3099 ≈ 243 400 m³. (≈ 291 000 m³ az alapterületek átlagával, ≈ 194 000 m³ az Rr tag nélkül számolt hibás érték.)'
  },
  {
    id: 'fv-q27',
    questionTypeBadge: 'Háromszög alapú gúla',
    figure: FIG_Q27,
    level: 3,
    question: 'Egy 24 cm magas szabályos háromoldalú gúla alapéle 14 cm. Az alappal párhuzamos síkokkal három egyenlő magasságú részre vágjuk. Mekkora a legfelső kis gúla térfogata?',
    options: ['≈ 25,1 cm³', '≈ 226,3 cm³', '≈ 75,4 cm³', '≈ 176,0 cm³'],
    correctAnswer: 0,
    explanation: 'T = (√3/4) · 14² ≈ 84,87 cm², V = 84,87 · 24/3 ≈ 679,0 cm³; a kis gúla λ = 1/3 ⇒ V/27 ≈ 25,1 cm³. (A középső rész 7-szer, az alsó 19-szer ekkora.)'
  },
  {
    id: 'fv-q28',
    questionTypeBadge: 'Margarinos csésze',
    figure: FIG_Q28,
    level: 3,
    question: 'Egy csonkakúp alakú margarinos csésze alapkörének átmérője 10 cm, fedőkörének átmérője 11,4 cm, alkotója 5,6 cm. Mekkora a térfogata (közelítőleg)?',
    options: ['≈ 500 cm³', '≈ 504 cm³', '≈ 1501 cm³', '≈ 335 cm³'],
    correctAnswer: 0,
    explanation: 'M = √(5,6² − 0,7²) ≈ 5,556 cm; V = 5,556π/3 · (25 + 28,5 + 32,49) ≈ 500,3 cm³ – épp csak több, mint két 63 mm-es margarinkocka (≈ 500,1 cm³). (504 cm³ az alkotóval mint magassággal, 1501 cm³ a 3-mal való osztás nélkül számolt hibás érték.)'
  },
  {
    id: 'fv-q29',
    questionTypeBadge: 'Sótartó',
    level: 3,
    question: 'Egy csonkakúp alakú sótartó alaplapjának kerülete 9,4 cm, fedőlapjáé 6,3 cm, magassága 4,5 cm. Hányszor tölthető tele 1 kg, 2 g/cm³ sűrűségű sóval?',
    options: ['22-szer', '11-szer', '44-szer', '30-szor'],
    correctAnswer: 0,
    explanation: 'R = 9,4/(2π) ≈ 1,496 cm, r = 6,3/(2π) ≈ 1,003 cm ⇒ V ≈ 4,5π/3 · (2,238 + 1,500 + 1,005) ≈ 22,35 cm³. 1 kg só térfogata 500 cm³ ⇒ 500 / 22,35 ≈ 22,4 ⇒ 22-szer.'
  },
  {
    id: 'fv-q30',
    questionTypeBadge: 'Csonkagúla magassága',
    figure: FIG_Q30,
    level: 3,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 63 mm, fedőéle 27 mm, oldalélei 60°-os szöget zárnak be az alaplappal. Mekkora a térfogata?',
    options: ['≈ 94,0 cm³', '≈ 66,5 cm³', '≈ 31,3 cm³', '≈ 69,0 cm³'],
    correctAnswer: 0,
    explanation: 'Az átlós síkmetszet húrtrapéz, párhuzamos oldalai 63√2 ≈ 89,1 mm és 27√2 ≈ 38,2 mm. M = (89,1 − 38,2)/2 · tg 60° ≈ 44,1 mm. V = 44,1/3 · (3969 + 1701 + 729) ≈ 94 046 mm³ ≈ 94,0 cm³.',
    breakdown: ['vetület: (63√2 − 27√2)/2 = 18√2 ≈ 25,46 mm', 'M = 25,46 · tg 60° ≈ 44,09 mm', 'V = M/3 · (a² + ab + b²) ≈ 94 046 mm³']
  }
];

export const FrustumVolumeQuiz: React.FC<{
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
      topicId="g12-ter-csonka-terfogat-quiz"
      subtopicId="a-csonkagula-es-a-csonkakup-terfogata"
      title="16. A csonkagúla és a csonkakúp térfogata – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: térfogatképletek, nagy test − kis test, kiegészítő gúla és kúp, gyakorlati feladatok."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={FRUSTUM_VOLUME_QUESTIONS}
      cheatSheets={[
        {
          title: 'Térfogatképletek',
          items: [
            'V = M/3 · (T + √(T·t) + t)',
            'Négyzetes csonkagúla: V = M/3 · (a² + ab + b²)',
            'Csonkakúp: V = Mπ/3 · (R² + Rr + r²)',
            'Hibás: V = M · (T + t)/2 (túl nagy!)'
          ]
        },
        {
          title: 'Nagy test − kis test',
          items: [
            'V_kicsi = λ³ · V_nagy, V_csonka = (1 − λ³) · V_nagy',
            'Kiegészítő test: b : a = x : (x + M)',
            'Három egyenlő magasságú rész: 1 : 7 : 19',
            'Felezés: λ = 1/∛2 ≈ 0,794'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Sajt: M = √41 ≈ 6,4; V_nagy ≈ 34,1; V_csonka ≈ 26,7 cm³',
            'a = 12, b = 8, M = 6 ⇒ x = 12 cm, V = 608 cm³',
            'r = 3, m = 12, vágás 4 és 8 cm-nél: 4π/3; 28π/3; 76π/3',
            'R = 10, r = 4, M = 5 ⇒ V = 260π ≈ 816,8 cm³'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FrustumVolumeMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <FrustumVolumeSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default FrustumVolumeQuiz;
