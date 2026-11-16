import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SolidsPracticeExamMatcher } from './SolidsPracticeExamMatcher';
import { SolidsPracticeExamSorter } from './SolidsPracticeExamSorter';

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
// Kérdésábra-sablonok
// ---------------------------------------------------------------------------
const boxFig = (a: number, b: number, c: number, lab: { a?: string; b?: string; c?: string; diag?: boolean }) => {
  const s = 110 / Math.max(a + c * 0.36, b * 1.2);
  const k = 0.42;
  const P = (x: number, y: number, z: number): Pt => [40 + s * (x + k * z * 0.866), 140 - s * (y + k * z * 0.5)];
  const v = [P(0, 0, 0), P(a, 0, 0), P(a, 0, c), P(0, 0, c), P(0, b, 0), P(a, b, 0), P(a, b, c), P(0, b, c)];
  const L = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const e: [number, number, boolean][] = [
    [0, 1, false], [1, 2, false], [2, 3, true], [3, 0, true], [4, 5, false], [5, 6, false], [6, 7, false], [7, 4, false],
    [0, 4, false], [1, 5, false], [2, 6, false], [3, 7, true]
  ];
  return (
    <KFig>
      {e.map(([i, j, h], n) => (
        <KL key={n} a={v[i]} b={v[j]} c={h ? K_HID : K_EDGE} w={h ? 1.2 : 1.8} d={h} />
      ))}
      {lab.diag && <KL a={v[0]} b={v[6]} c={K_UNK} w={1.5} />}
      {L.map((t, i) => (
        <KT key={t} p={[v[i][0] + (i === 1 || i === 2 || i === 5 || i === 6 ? 7 : -7), v[i][1] + (i < 4 ? 6 : -6)]} t={t} s={9} c="#475569" />
      ))}
      {lab.a && <KT p={[(v[0][0] + v[1][0]) / 2, v[0][1] + 12]} t={lab.a} s={10} />}
      {lab.c && <KT p={[(v[1][0] + v[2][0]) / 2 + 14, (v[1][1] + v[2][1]) / 2 + 4]} t={lab.c} s={10} a="start" />}
      {lab.b && <KT p={[v[0][0] - 12, (v[0][1] + v[4][0] * 0 + v[4][1]) / 2]} t={lab.b} s={10} a="end" />}
    </KFig>
  );
};

/** Kocka A–H betűkkel, kiemelt szakaszokkal. */
const cubeFig = (segs: [number, number, string][], lab?: string) => {
  const s = 80;
  const k = 0.45;
  const P = (x: number, y: number, z: number): Pt => [70 + s * (x + k * z * 0.866), 135 - s * (y + k * z * 0.5)];
  const v = [P(0, 0, 0), P(1, 0, 0), P(1, 0, 1), P(0, 0, 1), P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)];
  const L = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const e: [number, number, boolean][] = [
    [0, 1, false], [1, 2, false], [2, 3, true], [3, 0, true], [4, 5, false], [5, 6, false], [6, 7, false], [7, 4, false],
    [0, 4, false], [1, 5, false], [2, 6, false], [3, 7, true]
  ];
  return (
    <KFig>
      {e.map(([i, j, h], n) => (
        <KL key={n} a={v[i]} b={v[j]} c={h ? K_HID : '#94a3b8'} w={h ? 1.1 : 1.5} d={h} />
      ))}
      {segs.map(([i, j, c], n) => (
        <KL key={'s' + n} a={v[i]} b={v[j]} c={c} w={2.4} />
      ))}
      {L.map((t, i) => (
        <KT key={t} p={[v[i][0] + (i === 1 || i === 2 || i === 5 || i === 6 ? 8 : -8), v[i][1] + (i < 4 ? 7 : -7)]} t={t} s={10} c="#334155" />
      ))}
      {lab && <KT p={[120, 150]} t={lab} s={10} />}
    </KFig>
  );
};

const coneFig = (lab: KLab, Rs = 70, rs = 0) => (
  <KFig>
    <KCone cx={115} yb={130} yt={22} Rs={Rs} rs={rs} e={0.26} lab={lab} />
  </KFig>
);
const cylFig = (lab: KLab) => (
  <KFig>
    <KCone cx={115} yb={130} yt={35} Rs={55} rs={55} e={0.26} lab={lab} />
  </KFig>
);
const sphereFig = (t: string, extra?: React.ReactNode) => (
  <KFig>
    <circle cx="120" cy="80" r="58" fill="rgba(99,102,241,0.10)" stroke={K_EDGE} strokeWidth="1.8" />
    <KEll cx={120} cy={80} rx={58} ry={15} hidden />
    <KL a={[120, 80]} b={[178, 80]} c={K_AUX} w={1.3} />
    <circle cx="120" cy="80" r="2" fill={K_INK} />
    <KT p={[149, 72]} t={t} s={10.5} c={K_AUX} />
    {extra}
  </KFig>
);
const pyrFig = (lab: { a?: string; h?: string; mo?: string; edge?: string }, a = 6, h = 6) => (
  <KFig>
    <KSq ox={55} oy={140} s={16} a={a} b={0} h={h} lab={lab} />
  </KFig>
);
const sideFig = (base: string, h: string, ang: string, hyp?: string) => (
  <KFig>
    <KPoly p={[[50, 130], [190, 130], [50, 40]]} fill="rgba(5,150,105,0.12)" c={K_AUX} />
    <KRight v={[50, 130]} p1={[50, 40]} p2={[190, 130]} r={11} />
    <KAng v={[190, 130]} p1={[50, 130]} p2={[50, 40]} r={22} t={ang} tr={38} />
    <KT p={[120, 143]} t={base} s={10.5} />
    <KT p={[44, 85]} t={h} s={10.5} a="end" />
    {hyp && <KT p={[128, 78]} t={hyp} s={10.5} a="start" />}
  </KFig>
);

const mk = (
  id: number,
  level: 1 | 2 | 3,
  questionTypeBadge: string,
  question: string,
  options: string[],
  explanation: string,
  figure?: React.ReactNode
): QuizQuestion => ({ id: `pe-q${id}`, level, questionTypeBadge, question, options, correctAnswer: 0, explanation, ...(figure ? { figure } : {}) });

export const SOLIDS_PRACTICE_EXAM_QUESTIONS: QuizQuestion[] = [
  // ======================= 1. szint (30) =======================
  mk(1, 1, 'Kocka', 'Mekkora az 5 cm élű kocka térfogata és felszíne?', ['V = 125 cm³, A = 150 cm²', 'V = 125 cm³, A = 100 cm²', 'V = 75 cm³, A = 150 cm²', 'V = 25 cm³, A = 150 cm²'], 'V = a³ = 125 cm³, A = 6a² = 6 · 25 = 150 cm².'),
  mk(2, 1, 'Testátló', 'Mekkora a 3 cm, 4 cm és 12 cm élű téglatest testátlója?', ['13 cm', '19 cm', '5 cm', '12,6 cm'], 'd = √(3² + 4² + 12²) = √169 = 13 cm.', boxFig(4, 3, 12, { a: '4', b: '3', c: '12', diag: true })),
  mk(3, 1, 'Kocka testátlója', 'Mekkora a 4 cm élű kocka testátlója?', ['4√3 ≈ 6,93 cm', '4√2 ≈ 5,66 cm', '12 cm', '8 cm'], 'd = a√3 = 4√3 ≈ 6,93 cm. (4√2 a lapátló.)', boxFig(4, 4, 4, { a: '4 cm', diag: true })),
  mk(4, 1, 'Téglatest felszíne', 'Mekkora a 2 cm, 3 cm és 4 cm élű téglatest felszíne?', ['52 cm²', '24 cm²', '26 cm²', '48 cm²'], 'A = 2(ab + bc + ac) = 2(6 + 12 + 8) = 52 cm².'),
  mk(5, 1, 'Hasáb térfogata', 'Egy háromszög alapú egyenes hasáb alapterülete 12 cm², magassága 10 cm. Mekkora a térfogata?', ['120 cm³', '40 cm³', '60 cm³', '240 cm³'], 'Hasábra V = T · m = 12 · 10 = 120 cm³ (nincs 1/3-os szorzó, az a gúláé).'),
  mk(6, 1, 'Henger térfogata', 'Mekkora a 3 cm sugarú, 5 cm magas henger térfogata?', ['45π ≈ 141,4 cm³', '15π ≈ 47,1 cm³', '30π ≈ 94,2 cm³', '75π ≈ 235,6 cm³'], 'V = r²πm = 9 · 5 · π = 45π ≈ 141,4 cm³.', cylFig({ R: 'r = 3', M: 'm = 5' })),
  mk(7, 1, 'Henger palástja', 'Mekkora a 3 cm sugarú, 5 cm magas henger palástjának területe?', ['30π ≈ 94,2 cm²', '45π ≈ 141,4 cm²', '15π ≈ 47,1 cm²', '48π ≈ 150,8 cm²'], 'P = 2rπm = 2 · 3 · 5 · π = 30π ≈ 94,2 cm².'),
  mk(8, 1, 'Henger felszíne', 'Mekkora a 3 cm sugarú, 5 cm magas henger felszíne?', ['48π ≈ 150,8 cm²', '30π ≈ 94,2 cm²', '39π ≈ 122,5 cm²', '24π ≈ 75,4 cm²'], 'A = 2r²π + 2rπm = 18π + 30π = 48π ≈ 150,8 cm². (39π: csak egy körlappal.)'),
  mk(9, 1, 'Gömb térfogata', 'Mekkora a 3 cm sugarú gömb térfogata?', ['36π ≈ 113,1 cm³', '12π ≈ 37,7 cm³', '108π ≈ 339,3 cm³', '27π ≈ 84,8 cm³'], 'V = 4R³π/3 = 4 · 27 · π / 3 = 36π ≈ 113,1 cm³.', sphereFig('R = 3')),
  mk(10, 1, 'Gömb felszíne', 'Mekkora a 6 cm sugarú gömb felszíne?', ['144π ≈ 452,4 cm²', '36π ≈ 113,1 cm²', '288π ≈ 904,8 cm²', '48π ≈ 150,8 cm²'], 'A = 4R²π = 4 · 36 · π = 144π ≈ 452,4 cm².'),
  mk(11, 1, 'Gúla térfogata', 'Egy négyzet alapú gúla alapéle 6 cm, magassága 4 cm. Mekkora a térfogata?', ['48 cm³', '144 cm³', '72 cm³', '24 cm³'], 'V = T · M / 3 = 36 · 4 / 3 = 48 cm³. (144: a hasáb térfogata.)', pyrFig({ a: '6 cm', h: 'M = 4' }, 6, 4)),
  mk(12, 1, 'Kúp alkotója', 'Egy forgáskúp alapkörének sugara 3 cm, magassága 4 cm. Mekkora az alkotója?', ['5 cm', '7 cm', '√7 ≈ 2,65 cm', '3,5 cm'], 'a = √(r² + m²) = √(9 + 16) = 5 cm.', coneFig({ R: 'r = 3', M: 'm = 4', a: 'a = ?' })),
  mk(13, 1, 'Kúp térfogata', 'Mekkora a 3 cm sugarú, 4 cm magas forgáskúp térfogata?', ['12π ≈ 37,7 cm³', '36π ≈ 113,1 cm³', '4π ≈ 12,6 cm³', '15π ≈ 47,1 cm³'], 'V = r²πm/3 = 9 · 4 · π / 3 = 12π ≈ 37,7 cm³.'),
  mk(14, 1, 'Kúp palástja', 'Mekkora annak a forgáskúpnak a palástja, amelynek sugara 3 cm, alkotója 5 cm?', ['15π ≈ 47,1 cm²', '24π ≈ 75,4 cm²', '30π ≈ 94,2 cm²', '12π ≈ 37,7 cm²'], 'P = rπa = 3 · 5 · π = 15π ≈ 47,1 cm². (24π a teljes felszín.)'),
  mk(15, 1, 'Csonkakúp térfogata', 'Egy csonkakúpra R = 4 cm, r = 2 cm, M = 3 cm. Mekkora a térfogata?', ['28π ≈ 88,0 cm³', '20π ≈ 62,8 cm³', '84π ≈ 263,9 cm³', '36π ≈ 113,1 cm³'], 'V = Mπ/3 · (R² + Rr + r²) = π · (16 + 8 + 4) = 28π ≈ 88,0 cm³.', coneFig({ R: 'R = 4', r: 'r = 2', M: 'M = 3' }, 80, 40)),
  mk(16, 1, 'Csonkakúp palástja', 'Egy csonkakúpra R = 5 cm, r = 3 cm, a = 4 cm. Mekkora a palást területe?', ['32π ≈ 100,5 cm²', '8π ≈ 25,1 cm²', '16π ≈ 50,3 cm²', '64π ≈ 201,1 cm²'], 'P = (R + r)πa = 8 · 4 · π = 32π ≈ 100,5 cm².'),
  mk(17, 1, 'Hasonló testek', 'Egy test minden méretét kétszeresére nagyítjuk. Hányszorosára nő a felszíne?', ['4-szeresére', '2-szeresére', '8-szorosára', '6-szorosára'], 'Hasonló testek felszínének aránya λ² = 2² = 4.'),
  mk(18, 1, 'Hasonló testek', 'Egy test minden méretét háromszorosára nagyítjuk. Hányszorosára nő a térfogata?', ['27-szeresére', '9-szeresére', '3-szorosára', '81-szeresére'], 'Hasonló testek térfogatának aránya λ³ = 3³ = 27.'),
  mk(19, 1, 'Becslés', 'Az Antarktisz jéggel borított területe kb. 13,8 millió km², a jég átlagos vastagsága 2200 m. Hány km³ jég borítja?', ['≈ 3,04 · 10⁷ km³', '≈ 3,04 · 10¹⁰ km³', '≈ 6,27 · 10³ km³', '≈ 3,04 · 10⁴ km³'], 'V = T · m = 13,8 · 10⁶ km² · 2,2 km ≈ 30,36 · 10⁶ km³ ≈ 3,04 · 10⁷ km³ (= 3,04 · 10¹⁶ m³).'),
  mk(20, 1, 'Pont és sík távolsága', 'Egy 6 cm élű kocka egyik csúcsa milyen messze van a vele nem szomszédos (szemközti) lap síkjától?', ['6 cm', '6√2 ≈ 8,49 cm', '6√3 ≈ 10,39 cm', '3 cm'], 'A szemközti lap síkja párhuzamos az alaplappal, távolságuk a kocka éle: 6 cm.'),
  mk(21, 1, 'Lapátló', 'Mekkora a 6 cm élű kocka lapátlója?', ['6√2 ≈ 8,49 cm', '6√3 ≈ 10,39 cm', '12 cm', '9 cm'], 'A lapátló egy négyzet átlója: a√2 = 6√2 ≈ 8,49 cm.', cubeFig([[0, 2, K_UNK]], 'a = 6 cm, AC = ?')),
  mk(22, 1, 'Tengelymetszet', 'Mekkora a 3 cm sugarú, 5 cm magas henger tengelymetszetének területe?', ['30 cm²', '15 cm²', '45 cm²', '30π cm²'], 'A tengelymetszet 2r × m = 6 × 5-ös téglalap: 30 cm².'),
  mk(23, 1, 'Tengelymetszet', 'Mekkora a 3 cm sugarú, 4 cm magas forgáskúp tengelymetszetének területe?', ['12 cm²', '6 cm²', '24 cm²', '15 cm²'], 'A tengelymetszet egyenlő szárú háromszög, alapja 2r = 6 cm, magassága 4 cm: 6 · 4 / 2 = 12 cm².'),
  mk(24, 1, 'Főkör', 'Mekkora az 5 cm sugarú gömb főkörének területe?', ['25π ≈ 78,5 cm²', '100π ≈ 314,2 cm²', '10π ≈ 31,4 cm²', '50π ≈ 157,1 cm²'], 'A főkör sugara a gömb sugara: R²π = 25π ≈ 78,5 cm².'),
  mk(25, 1, 'Gúla részei', 'Hány lapja van egy hatoldalú gúlának?', ['7', '6', '8', '12'], '6 oldallap + 1 alaplap = 7 lap (a gúlának 7 csúcsa és 12 éle van).'),
  mk(26, 1, 'Hasáb részei', 'Hány éle van egy hatoldalú hasábnak?', ['18', '12', '6', '24'], 'Alaplap 6 + fedőlap 6 + oldalél 6 = 18 él.'),
  mk(27, 1, 'Gömb síkmetszete', 'Egy 5 cm sugarú gömböt a középpontjától 3 cm-re lévő síkkal elmetszünk. Mekkora a metszetkör sugara?', ['4 cm', '2 cm', '√34 ≈ 5,83 cm', '3 cm'], 'Pitagorasz-tétel: ρ = √(R² − d²) = √(25 − 9) = 4 cm.', sphereFig('R = 5', <g><KL a={[74, 45]} b={[166, 45]} c="#d97706" w={1.6} /><KL a={[120, 80]} b={[120, 45]} c={K_ARC} w={1.3} d /><KT p={[108, 63]} t="3" s={10} c="#b45309" /><KT p={[143, 36]} t="ρ = ?" s={10} /></g>)),
  mk(28, 1, 'Mértékegység', 'Hány liter 1 m³?', ['1000 liter', '100 liter', '10 liter', '1 000 000 liter'], '1 m³ = 1000 dm³ = 1000 liter.'),
  mk(29, 1, 'Kiterítés', 'Milyen síkidom a forgáskúp kiterített palástja?', ['Körcikk', 'Körgyűrűcikk', 'Háromszög', 'Téglalap'], 'A kúp palástja körcikk, amelynek sugara az alkotó, íve az alapkör kerülete. (Körgyűrűcikk a csonkakúpé.)'),
  mk(30, 1, 'Hajlásszög', 'Mit értünk egyenes és sík hajlásszögén (ha az egyenes nem merőleges a síkra)?', ['Az egyenes és a síkra eső merőleges vetülete által bezárt szöget', 'Az egyenes és a sík egy tetszőleges egyenese által bezárt szöget', 'Mindig 90°-ot', 'A síkra merőleges egyenes és az adott egyenes szögét'], 'Egyenes és sík hajlásszöge az egyenes és a síkra eső merőleges vetülete által bezárt szög.'),

  // ======================= 2. szint (30) =======================
  mk(31, 2, 'Testátló', 'Egy négyzetes kőoszlop alapélei 12 dm, magassága 18 dm. Milyen messze van egymástól két legtávolabbi csúcsa?', ['≈ 24,74 dm', '≈ 21,63 dm', '≈ 19,90 dm', '42 dm'], 'A testátló: √(12² + 12² + 18²) = √612 ≈ 24,74 dm. (21,63: csak egy oldallap átlója.)', boxFig(12, 18, 12, { a: '12', b: '18', c: '12', diag: true })),
  mk(32, 2, 'Térfogatarány', 'A 12 × 12 × 18 dm-es oszlopból a lehető legnagyobb térfogatú szabályos négyoldalú gúlát faragják ki. Hogy aránylik a gúla térfogata az oszlopéhoz?', ['1 : 3', '1 : 2', '1 : 4', '2 : 3'], 'A gúla alaplapja és magassága megegyezik az oszlopéval: V_gúla = T · M / 3, V_oszlop = T · M ⇒ 1 : 3.'),
  mk(33, 2, 'Gúla oldaléle', 'Mekkorák a 12 dm alapélű, 18 dm magas szabályos négyoldalú gúla oldalélei?', ['≈ 19,90 dm', '≈ 18,97 dm', '≈ 21,63 dm', '≈ 24,74 dm'], 'A fél átló 6√2 ≈ 8,49 dm, így az oldalél √(18² + 72) = √396 ≈ 19,90 dm. (18,97: fél alapéllel számolva – az az oldallap magassága.)', pyrFig({ a: '12 dm', h: '18 dm', edge: '?' }, 6, 9)),
  mk(34, 2, 'Henger űrtartalma', 'Egy 18 cm átmérőjű fazékban 12 cm magasan áll a leves. Hány liter leves van benne?', ['≈ 3,05 liter', '≈ 12,2 liter', '≈ 1,02 liter', '≈ 0,31 liter'], 'V = 9² · π · 12 = 972π ≈ 3053,6 cm³ ≈ 3,05 l. (12,2: az átmérővel mint sugárral számolva.)', cylFig({ R: 'r = 9 cm', M: '12 cm' })),
  mk(35, 2, 'Henger és gömb', 'Egy henger alapkörének átmérője 72 mm, és térfogata egyenlő a 72 mm átmérőjű gömb térfogatával. Milyen magas a henger?', ['48 mm', '36 mm', '96 mm', '24 mm'], 'r²πm = 4r³π/3 ⇒ m = 4r/3 = 4 · 36 / 3 = 48 mm.'),
  mk(36, 2, 'Kúp és gömb', 'Egy forgáskúp alapkörének átmérője 54 mm, térfogata egyenlő az 54 mm átmérőjű gömb térfogatával. Milyen magas a kúp?', ['108 mm', '36 mm', '54 mm', '72 mm'], 'r²πm/3 = 4r³π/3 ⇒ m = 4r = 4 · 27 = 108 mm.', coneFig({ R: 'r = 27 mm', M: 'm = ?' })),
  mk(37, 2, 'Gúla űrtartalma', 'Egy „felfordított” szabályos négyoldalú gúla alakú szökőkút alapéle 40 cm, magassága 70 cm. Hány liter víz fér bele?', ['≈ 37,3 liter', '112 liter', '≈ 18,7 liter', '≈ 3,7 liter'], 'V = 40² · 70 / 3 = 37 333 cm³ ≈ 37,3 liter. (112 l: a 3-mal való osztás nélkül.)'),
  mk(38, 2, 'Pakolás', 'Egy téglatest alakú ládika alapélei 3,2 dm és 3,7 dm, oldalélei 6,8 dm. Hány 6,7 dm hosszú, 15 mm × 15 mm alapú fémpálca fér el benne állítva?', ['504', '526', '480', '552'], '320 mm / 15 mm ⇒ 21 sor, 370 mm / 15 mm ⇒ 24 oszlop (lefelé kerekítve); 21 · 24 = 504 pálca, és 6,7 dm < 6,8 dm.'),
  mk(39, 2, 'Testátló', 'Elfér-e egy 53 cm hosszú (nagyon vékony) összecsukott horgászbot egy 30 × 40 × 20 cm-es ládikában?', ['Igen, mert a testátló ≈ 53,85 cm', 'Nem, mert a leghosszabb él csak 40 cm', 'Nem, mert a lapátló csak 50 cm', 'Igen, mert a lapátló ≈ 53,85 cm'], 'd = √(900 + 1600 + 400) = √2900 ≈ 53,85 cm > 53 cm, tehát a testátló mentén elfér.', boxFig(40, 20, 30, { a: '40', b: '20', c: '30', diag: true })),
  mk(40, 2, 'Gúla a téglatestben', 'Egy négyoldalú gúla alaplapja a 30 × 40 × 20 cm-es téglatest egyik oldallapja, csúcsa a szemközti lapon van. Mekkora a gúla térfogata?', ['8000 cm³', '24 000 cm³', '4000 cm³', '12 000 cm³'], 'A gúla magassága a két lap távolsága, ezért V = T · M / 3 = (30 · 40 · 20) / 3 = 8000 cm³ – bármelyik lappárt választjuk.'),
  mk(41, 2, 'Kúp a hálóból', 'Egy kúp palástja síkba terítve 210° középponti szögű, 18 cm sugarú körcikk. Mekkora a kúp alapkörének sugara?', ['10,5 cm', '9 cm', '12 cm', '31,5 cm'], 'Az ív hossza = alapkör kerülete: 2 · 18 · π · 210/360 = 2rπ ⇒ r = 18 · 210/360 = 10,5 cm.'),
  mk(42, 2, 'Kúp felszíne', 'A 210°-os, 18 cm sugarú körcikkből készült kúp (r = 10,5 cm) felszíne:', ['299,25π ≈ 940,1 cm²', '189π ≈ 593,8 cm²', '110,25π ≈ 346,4 cm²', '324π ≈ 1017,9 cm²'], 'A = rπ(r + a) = 10,5π · 28,5 = 299,25π ≈ 940,1 cm². (189π csak a palást.)'),
  mk(43, 2, 'Testátló hajlásszöge', 'Mekkora szöget zár be egy kocka testátlója az alaplap síkjával?', ['≈ 35,3°', '45°', '≈ 54,7°', '30°'], 'A testátló vetülete a lapátló: tg α = a / (a√2) = 1/√2 ⇒ α ≈ 35,3°. (54,7° a testátló és egy függőleges él szöge.)', cubeFig([[0, 6, K_UNK], [0, 2, K_AUX]], 'AG és ABCD szöge = ?')),
  mk(44, 2, 'Testátló hajlásszöge', 'Mekkora szöget zár be a 3 cm × 4 cm × 12 cm-es téglatest testátlója a 3 × 4-es alaplappal?', ['≈ 67,4°', '≈ 22,6°', '≈ 75,0°', '≈ 71,6°'], 'Az alaplap átlója 5 cm, így tg α = 12/5 ⇒ α ≈ 67,4°.', sideFig('5 cm (alaplap átlója)', '12 cm', 'α = ?', 'd')),
  mk(45, 2, 'Oldallap hajlásszöge', 'Egy szabályos négyoldalú gúla alapéle 12 cm, magassága 8 cm. Mekkora szöget zár be az oldallap az alaplappal?', ['≈ 53,1°', '≈ 36,9°', '≈ 43,3°', '≈ 33,7°'], 'A síkmetszetben tg α = M / (a/2) = 8/6 ⇒ α ≈ 53,1°. (43,3°: fél átlóval – az az oldalél szöge.)', sideFig('6 cm', '8 cm', 'α = ?')),
  mk(46, 2, 'Henger', 'Egy henger térfogata 100π cm³, alapkörének sugara 5 cm. Mekkora a felszíne?', ['90π ≈ 282,7 cm²', '40π ≈ 125,7 cm²', '65π ≈ 204,2 cm²', '140π ≈ 439,8 cm²'], 'm = 100π / (25π) = 4 cm; A = 2r²π + 2rπm = 50π + 40π = 90π ≈ 282,7 cm².'),
  mk(47, 2, 'Gömb', 'Egy gömb felszíne 100π cm². Mekkora a térfogata?', ['500π/3 ≈ 523,6 cm³', '100π ≈ 314,2 cm³', '4000π/3 ≈ 4188,8 cm³', '125π ≈ 392,7 cm³'], '4R²π = 100π ⇒ R = 5 cm; V = 4 · 125 · π / 3 = 500π/3 ≈ 523,6 cm³.'),
  mk(48, 2, 'Kúp', 'Egy forgáskúp alapkörének sugara 6 cm, alkotója 10 cm. Mekkora a térfogata?', ['96π ≈ 301,6 cm³', '120π ≈ 377,0 cm³', '288π ≈ 904,8 cm³', '60π ≈ 188,5 cm³'], 'm = √(100 − 36) = 8 cm; V = 36 · 8 · π / 3 = 96π ≈ 301,6 cm³. (120π: az alkotót magasságnak véve.)', coneFig({ R: 'r = 6', a: 'a = 10' })),
  mk(49, 2, 'Kúppalást szöge', 'Mekkora a 6 cm sugarú, 10 cm alkotójú kúp kiterített palástjának középponti szöge?', ['216°', '108°', '60°', '135°'], 'φ = 360° · r / a = 360° · 6/10 = 216°.'),
  mk(50, 2, 'Gúla felszíne', 'Egy szabályos négyoldalú gúla alapéle 10 cm, magassága 12 cm. Mekkora a felszíne?', ['360 cm²', '340 cm²', '260 cm²', '580 cm²'], 'Oldallapmagasság: √(12² + 5²) = 13 cm; A = 100 + 4 · 10 · 13 / 2 = 360 cm². (340: a test magasságával számolva.)', pyrFig({ a: '10 cm', h: 'M = 12', mo: 'mₒ' }, 6, 7)),
  mk(51, 2, 'Csonkakúp felszíne', 'Egy csonkakúpra R = 9 cm, r = 3 cm, M = 8 cm. Mekkora a felszíne?', ['210π ≈ 659,7 cm²', '186π ≈ 584,3 cm²', '120π ≈ 377,0 cm²', '234π ≈ 735,1 cm²'], 'a = √(8² + 6²) = 10 cm; A = π(81 + 9 + 12 · 10) = 210π ≈ 659,7 cm². (186π: a helyett M-mel.)', coneFig({ R: 'R = 9', r: 'r = 3', M: 'M = 8' }, 84, 28)),
  mk(52, 2, 'Csonkagúla térfogata', 'Egy szabályos négyoldalú csonkagúla alapéle 10 cm, fedőéle 4 cm, magassága 6 cm. Mekkora a térfogata?', ['312 cm³', '348 cm³', '936 cm³', '232 cm³'], 'V = M/3 · (a² + ab + b²) = 2 · (100 + 40 + 16) = 312 cm³. (348: az alapterületek átlagával.)'),
  mk(53, 2, 'Makett', 'Egy épület 1 : 2 arányú kicsinyített modelljének térfogata 50 dm³. Mekkora a nagyobb test térfogata?', ['400 dm³', '100 dm³', '200 dm³', '250 dm³'], 'λ = 2 ⇒ a térfogat λ³ = 8-szoros: 400 dm³.'),
  mk(54, 2, 'Gömb síkmetszete', 'Egy 13 cm sugarú gömböt a középponttól 5 cm-re lévő síkkal metszünk. Mekkora a metszetkör területe?', ['144π ≈ 452,4 cm²', '25π ≈ 78,5 cm²', '64π ≈ 201,1 cm²', '169π ≈ 530,9 cm²'], 'ρ = √(169 − 25) = 12 cm, a metszetkör területe 144π ≈ 452,4 cm².'),
  mk(55, 2, 'Kitérő egyenesek távolsága', 'Egy 6 cm élű ABCDEFGH kockában mekkora az AB és a CG egyenes távolsága?', ['6 cm', '6√2 ≈ 8,49 cm', '6√3 ≈ 10,39 cm', '3 cm'], 'BC merőleges AB-re és CG-re is, így ez a normáltranszverzális: a távolság BC = 6 cm.', cubeFig([[0, 1, K_EDGE], [2, 6, K_EDGE], [1, 2, K_UNK]], 'a = 6 cm, d(AB; CG) = ?')),
  mk(56, 2, 'Henger', 'Egy henger tengelymetszete 8 cm oldalú négyzet. Mekkora a térfogata?', ['128π ≈ 402,1 cm³', '512π ≈ 1608,5 cm³', '64π ≈ 201,1 cm³', '32π ≈ 100,5 cm³'], 'r = 4 cm, m = 8 cm ⇒ V = 16 · 8 · π = 128π ≈ 402,1 cm³.'),
  mk(57, 2, 'Összetett test', 'A tölcsér részei felülről: csonkakúp (⌀ 11 → 9 cm, 0,5 cm magas), henger (⌀ 9 cm, 5 cm), csonkakúp (⌀ 9 → 2 cm, 2,5 cm), csonkakúp (⌀ 2 → 1 cm, 4,5 cm). Mekkora a tölcsér térfogata?', ['≈ 433 cm³', '≈ 318 cm³', '≈ 500 cm³', '≈ 1299 cm³'], 'V ≈ 39,4 + 318,1 + 67,4 + 8,2 ≈ 433,1 cm³. (318: csak a hengeres rész.)'),
  mk(58, 2, 'Félgömb', 'Egy 22 cm átmérőjű fa félgömbből kivájtak egy 11 cm átmérőjű félgömböt. Mennyi víz fér az így kifaragott tálba?', ['≈ 348 cm³', '≈ 2788 cm³', '≈ 697 cm³', '≈ 2439 cm³'], 'Az üreg egy 5,5 cm sugarú félgömb: 2/3 · π · 5,5³ ≈ 348,5 cm³ ≈ 0,35 l. (2439: a fa térfogata.)'),
  mk(59, 2, 'Adagok', 'Hány adag levest lehet kimerni a 972π ≈ 3053,6 cm³ levesből egy 8 cm átmérőjű félgömb alakú merőkanállal?', ['22', '23', '11', '6'], 'A merőkanál 2/3 · π · 4³ ≈ 134,0 cm³; 3053,6 / 134,0 ≈ 22,8 ⇒ 22 teljes adag.'),
  mk(60, 2, 'Hasáb', 'Egy szabályos háromszög alapú egyenes hasáb alapéle 6 cm, magassága 10 cm. Mekkora a térfogata?', ['90√3 ≈ 155,9 cm³', '180 cm³', '30√3 ≈ 52,0 cm³', '360 cm³'], 'T = 6²√3/4 = 9√3 cm², V = 9√3 · 10 = 90√3 ≈ 155,9 cm³.'),

  // ======================= 3. szint (30) =======================
  mk(61, 3, 'Becslés, százalék', 'Az Antarktisz jégtérfogata ≈ 3,04 · 10⁷ km³. Hány százaléka ez a Föld kb. 1,46 milliárd km³-es teljes vízkészletének?', ['≈ 2,1%', '≈ 0,21%', '≈ 21%', '≈ 4,8%'], '30,36 · 10⁶ / 1,46 · 10⁹ ≈ 0,0208 ⇒ ≈ 2,1%.'),
  mk(62, 3, 'Oldalél hajlásszöge', 'A 12 dm alapélű, 18 dm magas szabályos négyoldalú gúla oldaléle mekkora szöget zár be az alapsíkkal?', ['≈ 64,8°', '≈ 71,6°', '≈ 56,3°', '≈ 25,2°'], 'Az oldalél vetülete a fél átló (6√2 ≈ 8,49 dm): tg α = 18 / 8,49 ⇒ α ≈ 64,8°. (71,6° az oldallap szöge.)', sideFig('6√2 dm', '18 dm', 'α = ?')),
  mk(63, 3, 'Oldallap hajlásszöge', 'A 12 dm alapélű, 18 dm magas szabályos négyoldalú gúla oldallapja mekkora szöget zár be az alapsíkkal?', ['≈ 71,6°', '≈ 64,8°', '≈ 56,3°', '≈ 18,4°'], 'A síkmetszetben a szög melletti befogó a fél alapél (6 dm): tg β = 18/6 = 3 ⇒ β ≈ 71,6°.', sideFig('6 dm', '18 dm', 'β = ?')),
  mk(64, 3, 'Kúp a hálóból', 'A 210°-os, 18 cm sugarú körcikkből (r = 10,5 cm) hajtott kúpnak mekkora a térfogata?', ['≈ 1688 cm³', '≈ 5064 cm³', '≈ 2078 cm³', '≈ 844 cm³'], 'm = √(18² − 10,5²) = √213,75 ≈ 14,62 cm; V = 10,5² · π · 14,62 / 3 ≈ 1688 cm³. (2078: az alkotót magasságnak véve; 5064: a 3-mal való osztás nélkül.)', (
    <KFig>
      <path d="M 120 95 L 52.4 113.1 A 70 70 0 1 1 187.6 113.1 Z" fill="rgba(217,119,6,0.16)" stroke={K_EDGE} strokeWidth="1.8" />
      <KAng v={[120, 95]} p1={[52.4, 113.1]} p2={[187.6, 113.1]} r={13} t="210°" tr={-13} />
      <KL a={[120, 95]} b={[120, 25]} c={K_AUX} w={1.3} />
      <KT p={[127, 58]} t="18 cm" s={10} a="start" c={K_AUX} />
      <KT p={[205, 20]} t="V = ?" s={11} />
    </KFig>
  )),
  mk(65, 3, 'Nyílásszög', 'Mekkora a 10,5 cm sugarú, 18 cm alkotójú kúp nyílásszöge?', ['≈ 71,4°', '≈ 35,7°', '≈ 60,5°', '210°'], 'A tengelymetszetben sin(φ/2) = 10,5 / 18 ⇒ φ/2 ≈ 35,7° ⇒ φ ≈ 71,4°. (210° a kiterített palást szöge.)'),
  mk(66, 3, 'Gúla palástja', 'A 40 cm alapélű, 70 cm magas felfordított gúla alakú szökőkút belső felületét acéllemez borítja. Hány dm²?', ['≈ 58,2 dm²', '≈ 56,0 dm²', '≈ 74,2 dm²', '≈ 29,1 dm²'], 'Oldallapmagasság √(70² + 20²) ≈ 72,80 cm; a 4 oldallap: 2 · 40 · 72,80 ≈ 5824 cm² ≈ 58,2 dm². (56,0: a test magasságával; 74,2: a nyitott tetőt is beszámítva.)'),
  mk(67, 3, 'Élek hajlásszöge', 'A szökőkút (alapél 40 cm, magasság 70 cm) oldalélei mekkora szöget zárnak be a vízszintes síkkal?', ['≈ 68,0°', '≈ 74,1°', '≈ 22,0°', '≈ 60,3°'], 'Fél átló: 20√2 ≈ 28,28 cm; tg α = 70 / 28,28 ⇒ α ≈ 68,0°. (74,1° az oldallapok szöge.)'),
  mk(68, 3, 'Louvre – oldalél', 'A Louvre üvegpiramisa szabályos négyoldalú gúla: alapéle 35 m, magassága 20,6 m. Mekkora szöget zárnak be oldalélei a vízszintessel?', ['≈ 39,8°', '≈ 49,7°', '≈ 30,5°', '≈ 50,2°'], 'Fél átló 17,5√2 ≈ 24,75 m; tg α = 20,6 / 24,75 ⇒ α ≈ 39,8°.'),
  mk(69, 3, 'Louvre – oldallap', 'Mekkora szöget zárnak be a Louvre-piramis (a = 35 m, M = 20,6 m) oldallapjai a vízszintes síkkal?', ['≈ 49,7°', '≈ 39,8°', '≈ 59,6°', '≈ 40,3°'], 'tg β = 20,6 / 17,5 ⇒ β ≈ 49,7°.', sideFig('17,5 m', '20,6 m', 'β = ?')),
  mk(70, 3, 'Louvre – üvegfelület', 'Hány m² a Louvre-piramis (a = 35 m, M = 20,6 m) üvegfelülete (a 4 oldallap)?', ['≈ 1892 m²', '≈ 1442 m²', '≈ 3117 m²', '≈ 946 m²'], 'Oldallapmagasság √(20,6² + 17,5²) ≈ 27,03 m; 4 · 35 · 27,03 / 2 ≈ 1892 m². (1442: a test magasságával; 3117: az alaplappal együtt.)'),
  mk(71, 3, 'Festés', 'A 22 cm átmérőjű félgömbből 11 cm átmérőjű félgömböt kivájva kapott tálat teljesen (kívül, belül és a peremen) befestik. Mekkora a festendő felület?', ['≈ 1235 cm²', '≈ 950 cm²', '≈ 1045 cm²', '≈ 1615 cm²'], 'Külső félgömb 2π · 11² = 242π; belső 2π · 5,5² = 60,5π; perem (körgyűrű) π(121 − 30,25) = 90,75π. Összesen 393,25π ≈ 1235 cm².'),
  mk(72, 3, 'Túlfolyik-e?', 'A ≈ 433 cm³ térfogatú tölcsér alsó nyílását befogjuk, és fél liter szörpöt töltünk bele. Mi történik?', ['Túlfolyik kb. 67 cm³ szörp', 'Nem folyik túl, kb. 67 cm³ hely marad', 'Pontosan megtelik', 'Túlfolyik kb. 182 cm³ szörp'], '0,5 l = 500 cm³ > 433 cm³, tehát kb. 500 − 433 ≈ 67 cm³ túlfolyik.'),
  mk(73, 3, 'Virágtartó', 'Felül nyitott, szabályos hatoldalú csonkagúla alakú virágtartó: alaplapja 13 cm, fedőlapja 7 cm oldalú hatszög, oldalélei 8 cm. Mekkora a doboz anyagának felülete?', ['≈ 884 cm²', '≈ 445 cm²', '≈ 1011 cm²', '≈ 960 cm²'], 'Oldallapmagasság √(64 − 9) ≈ 7,42 cm; palást 6 · (13 + 7)/2 · 7,42 ≈ 445,0 cm²; alaplap 6 · 13²√3/4 ≈ 439,1 cm². Összesen ≈ 884 cm² (a fedőlap nyitott).'),
  mk(74, 3, 'Virágtartó', 'Egy 884 cm²-es virágtartó dobozhoz mérve 1 kg alapanyagból 0,93 m² felület készíthető. Hány doboz készíthető 1 kg anyagból?', ['10', '11', '9', '105'], '0,93 m² = 9300 cm²; 9300 / 884 ≈ 10,5 ⇒ 10 teljes doboz.'),
  mk(75, 3, 'Forgástest', 'Egy derékszögű trapéz alapjai 9 cm és 6 cm, hosszabbik szára 10 cm. A derékszögű szár körül megforgatjuk. Mekkora a keletkező csonkakúp térfogata?', ['≈ 1708 cm³', '≈ 1791 cm³', '≈ 2427 cm³', '≈ 569 cm³'], 'M = √(10² − 3²) = √91 ≈ 9,54 cm; V = Mπ/3 · (81 + 54 + 36) = 57√91 π ≈ 1708 cm³. (1791: M helyett az alkotóval, 10 cm-rel.)'),
  mk(76, 3, 'Forgástest felszíne', 'Ugyanennek a csonkakúpnak (R = 9, r = 6, a = 10 cm) mekkora a felszíne?', ['267π ≈ 838,8 cm²', '150π ≈ 471,2 cm²', '117π ≈ 367,6 cm²', '297π ≈ 933,1 cm²'], 'A = π(R² + r² + (R + r)a) = π(81 + 36 + 150) = 267π ≈ 838,8 cm².'),
  mk(77, 3, 'Szög a kockában', 'Mekkora szöget zár be egy kocka testátlója a kocka egy élével (amellyel közös csúcsa van)?', ['≈ 54,7°', '≈ 35,3°', '45°', '60°'], 'cos α = a / (a√3) = 1/√3 ⇒ α ≈ 54,7°.', cubeFig([[0, 6, K_UNK], [0, 4, K_AUX]], 'AG és AE szöge = ?')),
  mk(78, 3, 'Beírt test', 'Egy 2 cm élű kocka minden csúcsa egy gömb felületén van. Mekkora a gömb térfogata?', ['4√3π ≈ 21,8 cm³', '4π/3 ≈ 4,2 cm³', '32π/3 ≈ 33,5 cm³', '8√2π/3 ≈ 11,8 cm³'], 'A gömb átmérője a kocka testátlója: 2√3 ⇒ R = √3; V = 4π(√3)³/3 = 4√3π ≈ 21,8 cm³.'),
  mk(79, 3, 'Arkhimédész', 'Egy gömb köré írt henger (a gömb érinti az alaplapot, a fedőlapot és a palástot). Hányad része a gömb térfogata a henger térfogatának?', ['2/3', '1/2', '3/4', '1/3'], 'V_henger = R²π · 2R = 2R³π, V_gömb = 4R³π/3 ⇒ arány 2/3 (Arkhimédész).'),
  mk(80, 3, 'Hasonló testek', 'Két hasonló test felszínének aránya 4 : 9. Mennyi a térfogataik aránya?', ['8 : 27', '4 : 9', '2 : 3', '16 : 81'], 'λ² = 4/9 ⇒ λ = 2/3 ⇒ λ³ = 8/27.'),
  mk(81, 3, 'Tetraéder', 'Mekkora a 6 cm élű szabályos tetraéder térfogata?', ['≈ 25,5 cm³', '≈ 76,4 cm³', '36 cm³', '≈ 31,2 cm³'], 'Az alaplap köré írt körének sugara 6/√3 = 2√3, így M = √(36 − 12) = 2√6 ≈ 4,90 cm; V = (9√3 · 2√6) / 3 = 18√2 ≈ 25,5 cm³.'),
  mk(82, 3, 'Nyílásszög', 'Egy forgáskúp nyílásszöge 60°, alkotója 10 cm. Mekkora a térfogata?', ['≈ 226,7 cm³', '≈ 680,2 cm³', '≈ 130,9 cm³', '≈ 453,5 cm³'], 'A tengelymetszet szabályos háromszög: r = 5 cm, m = 5√3 ≈ 8,66 cm; V = 25π · 8,66 / 3 ≈ 226,7 cm³.'),
  mk(83, 3, 'Henger', 'Egy henger palástja kiterítve négyzet, alapkörének sugara 1 cm. Mekkora a térfogata?', ['2π² ≈ 19,7 cm³', '2π ≈ 6,3 cm³', '4π² ≈ 39,5 cm³', 'π² ≈ 9,9 cm³'], 'A négyzet oldala a kerület: m = 2π cm; V = 1² · π · 2π = 2π² ≈ 19,7 cm³.'),
  mk(84, 3, 'Kúp darabolása', 'Egy kúpot a magassága felénél az alappal párhuzamos síkkal kettévágunk. Milyen arányú a felső kis kúp és az alsó csonkakúp térfogata?', ['1 : 7', '1 : 1', '1 : 3', '1 : 8'], 'λ = 1/2 ⇒ a kis kúp az egész 1/8 része, a csonkakúp 7/8 ⇒ 1 : 7.'),
  mk(85, 3, 'Kazán', 'Egy kazán henger alakú (4 m átmérő, 3,5 m magas), végein egy-egy félgömbbel. Mekkora a térfogata?', ['74π/3 ≈ 77,5 m³', '14π ≈ 44,0 m³', '46π ≈ 144,5 m³', '30π ≈ 94,2 m³'], 'Henger: 4π · 3,5 = 14π; a két félgömb együtt egy gömb: 32π/3. Összesen 74π/3 ≈ 77,5 m³. (30π ≈ 94,2 a felszín m²-ben.)'),
  mk(86, 3, 'Bögre', 'Egy 7,2 cm belső átmérőjű, 3,5 dl-es henger alakú bögre belső magassága:', ['≈ 8,6 cm', '≈ 2,1 cm', '≈ 21,5 cm', '≈ 4,3 cm'], '350 cm³ = 3,6² · π · m ⇒ m = 350 / (12,96π) ≈ 8,6 cm.'),
  mk(87, 3, 'Vízszint emelkedése', 'A 7,2 cm belső átmérőjű bögrébe (amelyben víz van) egy 3 cm átmérőjű vasgolyót teszünk. Hány mm-rel emelkedik a vízszint?', ['≈ 3,5 mm', '≈ 1,7 mm', '≈ 13,9 mm', '≈ 0,35 mm'], 'A golyó térfogata 4π · 1,5³ / 3 = 4,5π cm³; a vízszint emelkedése 4,5π / (3,6²π) ≈ 0,347 cm ≈ 3,5 mm.'),
  mk(88, 3, 'Gömb és henger', 'Egy gömb felszíne 1675,5 m². Egy henger magassága a gömb átmérője, térfogata a gömb térfogata. Mekkora a henger palástja?', ['≈ 1368 m²', '≈ 1675,5 m²', '≈ 1117 m²', '≈ 2052 m²'], 'R = √(1675,5 / 4π) ≈ 11,55 m; r²π · 2R = 4R³π/3 ⇒ r = R√(2/3) ≈ 9,43 m; P = 2rπ · 2R ≈ 1368 m².'),
  mk(89, 3, 'Kitérő egyenesek szöge', 'Mekkora szöget zár be az ABCDEFGH kocka AC és BG lapátlója?', ['60°', '90°', '45°', '≈ 54,7°'], 'BG párhuzamos AH-val, az ACH háromszög oldalai lapátlók, tehát szabályos: a szög 60°.', cubeFig([[0, 2, K_UNK], [1, 6, K_UNK], [0, 7, K_AUX]], 'AC és BG szöge = ?')),
  mk(90, 3, 'Gúla magassága', 'Egy szabályos négyoldalú gúla minden éle 10 cm. Mekkora a magassága, és mekkora szöget zárnak be az oldalélek az alaplappal?', ['5√2 ≈ 7,07 cm; 45°', '5√3 ≈ 8,66 cm; 60°', '5√2 ≈ 7,07 cm; ≈ 54,7°', '5 cm; 30°'], 'A fél átló 5√2, így M = √(100 − 50) = 5√2 ≈ 7,07 cm; tg α = 5√2 / 5√2 = 1 ⇒ α = 45°.', pyrFig({ a: '10', edge: '10', h: 'M = ?' }, 6, 4.2))
];

export const SolidsPracticeExamQuiz: React.FC<{
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
      topicId="g12-ter-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="18. Gyakorlás, tudáspróba – Kvíz"
      subtitle="90 tesztkérdés 3 nehézségi szinten a teljes térgeometria fejezetből: távolság, hajlásszög, hasáb, henger, gömb, gúla, kúp, csonka testek, hasonló testek, gyakorlati feladatok."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • TUDÁSPRÓBA"
      questions={SOLIDS_PRACTICE_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Hasáb, henger, gömb',
          items: [
            'Téglatest: V = abc, A = 2(ab + bc + ac), d = √(a² + b² + c²)',
            'Hasáb: V = T · m; henger: V = r²πm, A = 2r²π + 2rπm',
            'Gömb: V = 4R³π/3, A = 4R²π',
            'Gömb síkmetszete: ρ² = R² − d²'
          ]
        },
        {
          title: 'Gúla, kúp, csonka testek',
          items: [
            'Gúla: V = T · M / 3; kúp: V = r²πm/3, P = rπa, a² = r² + m²',
            'Kúppalást középponti szöge: φ = 360° · r / a',
            'Csonka test: V = M/3 · (T + √(Tt) + t)',
            'Csonkakúp: A = π[R² + r² + (R + r)a]'
          ]
        },
        {
          title: 'Szögek, hasonlóság',
          items: [
            'Egyenes és sík szöge: az egyenes és vetülete szöge',
            'Oldalél szöge: tg α = M / (fél átló); oldallap: tg β = M / (fél alapél)',
            'Hasonló testek: felszín λ², térfogat λ³',
            '1 dm³ = 1 l; 1 g/cm³ = 1 kg/dm³'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SolidsPracticeExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SolidsPracticeExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SolidsPracticeExamQuiz;
