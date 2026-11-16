import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SolidsEverydayMatcher } from './SolidsEverydayMatcher';
import { SolidsEverydaySorter } from './SolidsEverydaySorter';

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
const FIG_Q4 = (
  <KFig>
    <circle cx="120" cy="80" r="55" fill="rgba(217,119,6,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
    <KEll cx={120} cy={80} rx={55} ry={14} hidden />
    <KL a={[65, 80]} b={[175, 80]} c={K_AUX} w={1.3} />
    <KT p={[120, 72]} t="d = 4,2 dm" s={10.5} c={K_AUX} />
    <KT p={[120, 150]} t="V = ?" s={11} />
  </KFig>
);
const FIG_Q5 = (
  <KFig>
    <KCone cx={120} yb={130} yt={20} Rs={50} rs={0} e={0.26} lab={{ R: 'r = 2,1 dm', M: 'm = 5,4 dm' }} />
  </KFig>
);
const FIG_Q7 = (
  <KFig>
    <path d="M 60 120 A 60 60 0 0 1 180 120 Z" fill="rgba(236,72,153,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
    <KL a={[120, 120]} b={[180, 120]} c={K_AUX} w={1.3} />
    <KT p={[150, 132]} t="10 cm" s={10.5} c={K_AUX} />
    <KT p={[120, 145]} t="az egyik félhenger felülnézetben, m = 8 cm" s={9.5} c="#334155" b={false} />
    <KT p={[120, 90]} t="V = ?" s={11} />
  </KFig>
);
const FIG_Q10 = (
  <KFig>
    <KPoly p={[[170, 85], [145, 41.7], [95, 41.7], [70, 85], [95, 128.3], [145, 128.3]]} />
    <KL a={[120, 85]} b={[170, 85]} c={K_HID} w={1} d />
    <KL a={[120, 85]} b={[145, 128.3]} c={K_HID} w={1} d />
    <KT p={[120, 142]} t="1 cm" s={10.5} />
    <KT p={[120, 20]} t="szabályos hatszög: T = ?" s={10.5} />
  </KFig>
);
const FIG_Q14 = (
  <KFig>
    <KSq ox={70} oy={140} s={18} a={5} b={0} h={6.2} lab={{ a: '5 cm', edge: '8 cm', h: 'M = ?' }} />
  </KFig>
);
const FIG_Q16 = (
  <KFig>
    <KSq ox={70} oy={140} s={18} a={5} b={0} h={6.2} lab={{ a: '5 cm', edge: '8 cm', mo: 'mₒ' }} axis={false} />
    <KT p={[200, 30]} t="papír: 136% · A" s={10} c="#334155" />
  </KFig>
);
const FIG_Q17 = (
  <KFig>
    <KCone cx={120} yb={132} yt={18} Rs={45} rs={0} e={0.26} lab={{ R: 'r = ?', M: '40 cm' }} />
    <KT p={[200, 140]} t="K = 54 cm" s={10.5} />
  </KFig>
);
const FIG_Q19 = (
  <KFig>
    <KPoly p={[[20, 130], [220, 130], [120, 72.3]]} fill="rgba(217,119,6,0.18)" c="#b45309" />
    <KL a={[120, 72.3]} b={[120, 130]} c={K_AUX} w={1.3} d />
    <KRight v={[120, 130]} p1={[120, 72.3]} p2={[220, 130]} r={9} />
    <KAng v={[120, 72.3]} p1={[20, 130]} p2={[220, 130]} r={14} t="120°" tr={-12} />
    <KT p={[126, 108]} t="80 cm" s={10} a="start" c={K_AUX} />
    <KT p={[170, 142]} t="r = ?" s={10.5} />
  </KFig>
);
const FIG_Q21 = (
  <KFig>
    <KPoly p={[[30, 130], [210, 130], [170, 90], [70, 90]]} fill={K_FILL} />
    <KL a={[70, 90]} b={[70, 130]} c={K_ARC} w={1.3} d />
    <KRight v={[70, 130]} p1={[70, 90]} p2={[210, 130]} r={9} />
    <KAng v={[30, 130]} p1={[210, 130]} p2={[70, 90]} r={18} t="45°" tr={30} />
    <KT p={[120, 144]} t="2R = 3 cm" s={10.5} />
    <KT p={[120, 80]} t="2r = 2 cm" s={10.5} />
    <KT p={[40, 100]} t="a = ?" s={10.5} a="end" />
  </KFig>
);
const FIG_Q24 = (
  <KFig>
    <path d="M 80 110 A 40 40 0 0 0 160 110" fill="rgba(14,165,233,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
    <rect x="80" y="50" width="80" height="60" fill="rgba(14,165,233,0.10)" stroke="none" />
    <KL a={[80, 50]} b={[80, 110]} />
    <KL a={[160, 50]} b={[160, 110]} />
    <KEll cx={120} cy={110} rx={40} ry={10} hidden />
    <KEll cx={120} cy={50} rx={40} ry={10} hidden />
    <KL a={[80, 50]} b={[120, 18]} />
    <KL a={[160, 50]} b={[120, 18]} />
    <KT p={[176, 34]} t="3 m" s={10} a="start" c={K_AUX} />
    <KT p={[176, 80]} t="8 m" s={10} a="start" />
    <KT p={[120, 125]} t="d = 6 m" s={10} c={K_AUX} />
    <KT p={[30, 80]} t="V = ?" s={11} a="start" />
  </KFig>
);
const FIG_Q26 = (
  <KFig>
    <KNgon cx={120} yb={95} yt={20} Rs={45} rs={0} n={6} e={0.32} />
    <KNgon cx={120} yb={95} yt={140} Rs={45} rs={0} n={6} e={0.32} />
    <KT p={[176, 58]} t="5 cm" s={10} a="start" c={K_AUX} />
    <KT p={[176, 120]} t="2 cm" s={10} a="start" c={K_AUX} />
    <KT p={[50, 95]} t="1 cm" s={10} a="end" />
  </KFig>
);
const FIG_Q28 = (
  <KFig>
    <path d="M 60 120 L 200 120 A 140 140 0 0 0 195.2 83.8 Z" fill="rgba(250,204,21,0.25)" stroke="#a16207" strokeWidth="1.8" />
    <KAng v={[60, 120]} p1={[200, 120]} p2={[195.2, 83.8]} r={40} t="15°" tr={55} />
    <KT p={[130, 132]} t="16 cm" s={10.5} />
    <KT p={[120, 30]} t="3 cm vastag, 200 g-os darab" s={10} c="#334155" b={false} />
  </KFig>
);

export const SOLIDS_EVERYDAY_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'se-q1',
    questionTypeBadge: 'Mértékegység',
    level: 1,
    question: 'Hány liter 1 dm³?',
    options: ['1 liter', '10 liter', '0,1 liter', '1000 liter'],
    correctAnswer: 0,
    explanation: '1 dm³ = 1 liter, 1 m³ = 1000 liter, 1 cm³ = 1 ml.'
  },
  {
    id: 'se-q2',
    questionTypeBadge: 'Sűrűség',
    level: 1,
    question: 'A fenyőfa sűrűsége 0,43 g/cm³. Mennyi ez kg/dm³-ben?',
    options: ['0,43 kg/dm³', '4,3 kg/dm³', '430 kg/dm³', '0,0043 kg/dm³'],
    correctAnswer: 0,
    explanation: '1 dm³ = 1000 cm³ és 1 kg = 1000 g, ezért 1 g/cm³ = 1 kg/dm³: 0,43 g/cm³ = 0,43 kg/dm³ (= 430 kg/m³).'
  },
  {
    id: 'se-q3',
    questionTypeBadge: 'Tömeg',
    level: 1,
    question: 'Mekkora egy 2 dm³ térfogatú fenyőfa tárgy tömege (ρ = 0,43 kg/dm³)?',
    options: ['0,86 kg', '4,65 kg', '0,215 kg', '8,6 kg'],
    correctAnswer: 0,
    explanation: 'm = ρ · V = 0,43 · 2 = 0,86 kg.'
  },
  {
    id: 'se-q4',
    questionTypeBadge: 'Gömb térfogata',
    figure: FIG_Q4,
    level: 1,
    question: 'Mekkora egy 4,2 dm átmérőjű gömb térfogata?',
    options: ['≈ 38,8 dm³', '≈ 310,3 dm³', '≈ 55,4 dm³', '≈ 9,7 dm³'],
    correctAnswer: 0,
    explanation: 'R = 2,1 dm, V = 4/3 · π · 2,1³ ≈ 38,8 dm³. (310,3: a sugár helyett az átmérővel; 55,4: a felszín.)'
  },
  {
    id: 'se-q5',
    questionTypeBadge: 'Kúp térfogata',
    figure: FIG_Q5,
    level: 1,
    question: 'Mekkora annak a forgáskúpnak a térfogata, amelynek alapkörsugara 2,1 dm, magassága 5,4 dm?',
    options: ['≈ 24,9 dm³', '≈ 74,8 dm³', '≈ 12,5 dm³', '≈ 38,2 dm³'],
    correctAnswer: 0,
    explanation: 'V = r²π · m / 3 = 2,1² · π · 5,4 / 3 ≈ 24,9 dm³. (74,8: a 3-mal való osztás nélkül.)'
  },
  {
    id: 'se-q6',
    questionTypeBadge: 'Hasáb térfogata',
    level: 1,
    question: 'A torta négyzet alapú része 20 cm × 20 cm alapú, 8 cm magas hasáb. Mekkora a térfogata?',
    options: ['3200 cm³', '1600 cm³', '400 cm³', '4000 cm³'],
    correctAnswer: 0,
    explanation: 'V = T · m = 20 · 20 · 8 = 3200 cm³.'
  },
  {
    id: 'se-q7',
    questionTypeBadge: 'Két félhenger',
    figure: FIG_Q7,
    level: 1,
    question: 'A szív alakú torta másik része egy kettévágott henger, amelynek két fele a négyzet két szomszédos oldalához illeszkedik. A henger alapkörének átmérője 20 cm, magassága 8 cm. Mekkora a két félhenger együttes térfogata?',
    options: ['≈ 2513,3 cm³', '≈ 1256,6 cm³', '≈ 5026,5 cm³', '≈ 628,3 cm³'],
    correctAnswer: 0,
    explanation: 'A két félhenger együtt egy teljes henger: π · 10² · 8 = 800π ≈ 2513,3 cm³. (1256,6 cm³ csak az egyik fele.)'
  },
  {
    id: 'se-q8',
    questionTypeBadge: 'Téglatest',
    level: 1,
    question: 'Egy tortaszelet téglatest alakú, 3 cm × 8 cm × 5 cm. Mekkora a térfogata?',
    options: ['120 cm³', '16 cm³', '240 cm³', '60 cm³'],
    correctAnswer: 0,
    explanation: 'V = 3 · 8 · 5 = 120 cm³.'
  },
  {
    id: 'se-q9',
    questionTypeBadge: 'Ráhagyás',
    level: 1,
    question: 'Egy gúla felszíne ≈ 101 cm². A díszdoboz papírszükséglete a felszín 136%-a. Hány cm² papír kell egy dobozhoz?',
    options: ['≈ 137,4 cm²', '≈ 36,4 cm²', '≈ 74,3 cm²', '≈ 237 cm²'],
    correctAnswer: 0,
    explanation: '101 · 1,36 ≈ 137,4 cm².'
  },
  {
    id: 'se-q10',
    questionTypeBadge: 'Hatszög területe',
    figure: FIG_Q10,
    level: 1,
    question: 'Mekkora az 1 cm oldalú szabályos hatszög területe?',
    options: ['≈ 2,6 cm²', '≈ 0,43 cm²', '6 cm²', '≈ 5,2 cm²'],
    correctAnswer: 0,
    explanation: 'Hat darab 1 cm oldalú szabályos háromszög: 6 · √3/4 ≈ 2,6 cm². (0,43 cm² egyetlen háromszög.)'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'se-q11',
    questionTypeBadge: 'Tömeg',
    level: 2,
    question: 'A kapu mellé két fenyőfa gömb (d = 4,2 dm) és két fenyőfa kúp (d = 4,2 dm, m = 5,4 dm) készül. Mennyi a négy tárgy együttes tömege (ρ = 0,43 g/cm³)?',
    options: ['≈ 54,8 kg', '≈ 27,4 kg', '≈ 127,5 kg', '≈ 296,4 kg'],
    correctAnswer: 0,
    explanation: 'V = 2 · (38,79 + 24,94) ≈ 127,46 dm³; m = 127,46 · 0,43 ≈ 54,8 kg.',
    breakdown: ['gömb: 4/3 · π · 2,1³ ≈ 38,79 dm³', 'kúp: π · 2,1² · 5,4 / 3 ≈ 24,94 dm³', 'összesen ≈ 127,46 dm³', 'm = 0,43 kg/dm³ · 127,46 dm³ ≈ 54,8 kg']
  },
  {
    id: 'se-q12',
    questionTypeBadge: 'Festés',
    level: 2,
    question: 'A két gömböt és a két kúp palástját festékkel vonják be (R = r = 2,1 dm, a kúp magassága 5,4 dm). Mekkora a festendő felület?',
    options: ['≈ 187,3 dm²', '≈ 93,6 dm²', '≈ 215,0 dm²', '≈ 110,8 dm²'],
    correctAnswer: 0,
    explanation: 'Gömb: 4π · 2,1² ≈ 55,42 dm²; kúppalást: a ≈ 5,79 dm, π · 2,1 · 5,79 ≈ 38,22 dm². Kettőből: 2 · 93,64 ≈ 187,3 dm². (215,0: a kúpok alaplapját is festve.)'
  },
  {
    id: 'se-q13',
    questionTypeBadge: 'Becslés',
    level: 2,
    question: 'A szív alakú torta egy 20 × 20 × 8 cm-es hasábból és egy kettévágott, 20 cm átmérőjű, 8 cm magas hengerből áll (a két fél a négyzet két szomszédos oldalán). Hány embert kínálhatunk meg, ha egy szelet 120 cm³?',
    options: ['47', '37', '26', '74'],
    correctAnswer: 0,
    explanation: '(3200 + 2513,3) / 120 ≈ 47,6 ⇒ kb. 47 ember. (37: csak egy félhengerrel; 26: csak a hasáb.)'
  },
  {
    id: 'se-q14',
    questionTypeBadge: 'Gúla térfogata',
    figure: FIG_Q14,
    level: 2,
    question: 'Egy négyzet alapú egyenes gúla alakú gyertya alapéle 5 cm, oldaléle 8 cm. Mekkora a térfogata (egészre kerekítve)? (Érettségi, 2007)',
    options: ['60 cm³', '67 cm³', '179 cm³', '63 cm³'],
    correctAnswer: 0,
    explanation: 'Fél átló 2,5√2 ≈ 3,54 cm ⇒ M = √(64 − 12,5) ≈ 7,18 cm; V = 25 · 7,18 / 3 ≈ 59,8 ≈ 60 cm³. (67: az oldalélt magasságnak véve; 63: fél alapéllel számolt magasság.)'
  },
  {
    id: 'se-q15',
    questionTypeBadge: 'Veszteség',
    level: 2,
    question: 'Egy műszakban 130 darab 59,8 cm³-es gyertyát öntenek, és a felhasznált viasz 6%-a veszteség. Hány liter viasz kell (egy tizedesjegyre)?',
    options: ['8,3 liter', '7,8 liter', '8,2 liter', '83 liter'],
    correctAnswer: 0,
    explanation: '130 · 59,8 ≈ 7774 cm³ a hasznos rész, ez a felhasznált viasz 94%-a: 7774 / 0,94 ≈ 8271 cm³ ≈ 8,3 l. (8,2: hibásan 1,06-tal szorozva.)'
  },
  {
    id: 'se-q16',
    questionTypeBadge: 'Csomagolás',
    figure: FIG_Q16,
    level: 2,
    question: 'A gyertya (alapél 5 cm, oldalél 8 cm) felszíne ≈ 101,0 cm². Hány cm² papír kell 40 díszdobozhoz, ha egy doboz a felszín 136%-át igényli?',
    options: ['≈ 5494 cm²', '4040 cm²', '≈ 4134 cm²', '≈ 137 cm²'],
    correctAnswer: 0,
    explanation: 'Oldallapmagasság √(64 − 6,25) ≈ 7,60 cm, A ≈ 25 + 76,0 = 101,0 cm²; 40 · 1,36 · 101,0 ≈ 5494 cm².'
  },
  {
    id: 'se-q17',
    questionTypeBadge: 'Kúp sugara',
    figure: FIG_Q17,
    level: 2,
    question: 'Egy forgáskúp alakú farsangi kalap „fejkörfogata” (alapkörének kerülete) 54 cm. Mekkora az alapkör sugara?',
    options: ['≈ 8,59 cm', '≈ 17,19 cm', '27 cm', '≈ 4,30 cm'],
    correctAnswer: 0,
    explanation: '2rπ = 54 ⇒ r = 54 / (2π) ≈ 8,59 cm. (17,19 cm az átmérő.)'
  },
  {
    id: 'se-q18',
    questionTypeBadge: 'Kúp palástja',
    level: 2,
    question: 'A kalap 40 cm magas, alapkörének sugara ≈ 8,59 cm. Hány cm² karton kell hozzá (alaplap nélkül)?',
    options: ['≈ 1105 cm²', '1080 cm²', '≈ 1337 cm²', '≈ 2209 cm²'],
    correctAnswer: 0,
    explanation: 'a = √(40² + 8,59²) ≈ 40,91 cm; P = rπa ≈ 8,59 · π · 40,91 ≈ 1105 cm². (1080: a magassággal számolva; 1337: az alaplappal együtt.)'
  },
  {
    id: 'se-q19',
    questionTypeBadge: 'Homokkúp',
    figure: FIG_Q19,
    level: 2,
    question: 'Egy homokkúp 80 cm magas, nyílásszöge 120°. Mekkora a térfogata?',
    options: ['≈ 1,61 m³', '≈ 0,18 m³', '≈ 4,83 m³', '≈ 0,54 m³'],
    correctAnswer: 0,
    explanation: 'A fél nyílásszög 60° ⇒ r = 80 · tg 60° ≈ 138,6 cm; V = π · 138,6² · 80 / 3 = 512 000π cm³ ≈ 1,61 m³. (0,18: tg 30°-kal számolva.)'
  },
  {
    id: 'se-q20',
    questionTypeBadge: 'Fordulók',
    level: 2,
    question: 'Egy teherautó fordulónként 1,61 m³ homokot visz. Hány fordulóra van szükség 12 m³ homokhoz?',
    options: ['8', '7', '12', '19'],
    correctAnswer: 0,
    explanation: '12 / 1,61 ≈ 7,46 ⇒ 7 forduló kevés, 8 kell (felfelé kerekítünk).'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'se-q21',
    questionTypeBadge: 'Fogaskerék',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy kúpos fogaskerék csonkakúp-modelljének alapkörsugara 1,5 cm, fedőkörsugara 1 cm, az alkotó az alapkörrel 45°-ot zár be. A kopó felület a palást 40%-a. Mekkora ez?',
    options: ['≈ 2,22 cm²', '≈ 5,55 cm²', '≈ 1,57 cm²', '≈ 3,14 cm²'],
    correctAnswer: 0,
    explanation: 'a = 0,5 / cos 45° ≈ 0,707 cm; P = (1,5 + 1) · π · 0,707 ≈ 5,55 cm²; 40% ≈ 2,22 cm².',
    breakdown: ['R − r = 0,5 cm', 'a = 0,5 / cos 45° ≈ 0,707 cm', 'P = 2,5π · 0,707 ≈ 5,55 cm²', '0,4 · P ≈ 2,22 cm²']
  },
  {
    id: 'se-q22',
    questionTypeBadge: 'Fogaskerék',
    level: 3,
    question: 'Ugyanez a fogaskerék (R = 1,5 cm, r = 1 cm), de az alkotó 50°-os szöget zár be az alapkörrel. Mekkora a kopó felület (a palást 40%-a)?',
    options: ['≈ 2,44 cm²', '≈ 2,22 cm²', '≈ 2,05 cm²', '≈ 6,11 cm²'],
    correctAnswer: 0,
    explanation: 'a = 0,5 / cos 50° ≈ 0,778 cm; P = 2,5π · 0,778 ≈ 6,11 cm²; 40% ≈ 2,44 cm². (2,05: szinusszal számolva.)'
  },
  {
    id: 'se-q23',
    questionTypeBadge: 'Körcikk',
    level: 3,
    question: 'A 40 cm magas, 8,59 cm alapkörsugarú kalap palástját körcikkből vágjuk ki. Mekkora a körcikk középponti szöge?',
    options: ['≈ 75,6°', '≈ 77,3°', '≈ 104,4°', '≈ 37,8°'],
    correctAnswer: 0,
    explanation: 'A körcikk sugara az alkotó, a ≈ 40,91 cm; íve az alapkör kerülete: φ = 360° · r / a ≈ 360° · 8,59 / 40,91 ≈ 75,6°. (77,3°: a magassággal osztva.)'
  },
  {
    id: 'se-q24',
    questionTypeBadge: 'Összetett test',
    figure: FIG_Q24,
    level: 3,
    question: 'Egy víztároló középső része 6 m átmérőjű, 8 m magas henger, alsó része félgömb, felső része 3 m magas kúp. Mekkora a teljes térfogata?',
    options: ['99π ≈ 311,0 m³', '90π ≈ 282,7 m³', '81π ≈ 254,5 m³', '117π ≈ 367,6 m³'],
    correctAnswer: 0,
    explanation: 'Henger: 9π · 8 = 72π; félgömb: 2/3 · π · 27 = 18π; kúp: 9π · 3/3 = 9π. Összesen 99π ≈ 311,0 m³.'
  },
  {
    id: 'se-q25',
    questionTypeBadge: 'Összetett test felszíne',
    level: 3,
    question: 'Mekkora felületet kell festeni a víztároló (henger: r = 3 m, 8 m; félgömb; 3 m magas kúp) külsején?',
    options: ['≈ 247,3 m²', '≈ 275,6 m²', '≈ 190,8 m²', '≈ 303,9 m²'],
    correctAnswer: 0,
    explanation: 'Hengerpalást 2π · 3 · 8 = 48π; félgömb 2π · 9 = 18π; kúppalást π · 3 · √18 ≈ 12,73π. Összesen ≈ 78,73π ≈ 247,3 m². (A belső körlapokat nem festjük.)'
  },
  {
    id: 'se-q26',
    questionTypeBadge: 'Üvegdísz',
    figure: FIG_Q26,
    level: 3,
    question: 'Egy üvegdísz két, közös 1 cm oldalú hatszög alapú szabályos gúlából áll (magasságuk 2 és 5 cm). Mekkora a tömege, ha ρ = 3,1 kg/dm³?',
    options: ['≈ 18,8 g', '≈ 6,1 g', '≈ 56,4 g', '≈ 1,9 g'],
    correctAnswer: 0,
    explanation: 'T ≈ 2,598 cm², V = T · (2 + 5) / 3 ≈ 6,06 cm³; 3,1 kg/dm³ = 3,1 g/cm³ ⇒ m ≈ 18,8 g. (56,4: a 3-mal való osztás nélkül.)'
  },
  {
    id: 'se-q27',
    questionTypeBadge: 'Sajttömb',
    level: 3,
    question: 'Egy henger alakú sajttömböt 15°-os középponti szögű körcikkek mentén 200 g-os darabokra vágnak. Mekkora a teljes tömb tömege?',
    options: ['4,8 kg', '2,4 kg', '9,6 kg', '3,0 kg'],
    correctAnswer: 0,
    explanation: '360° / 15° = 24 darab, 24 · 200 g = 4800 g = 4,8 kg.'
  },
  {
    id: 'se-q28',
    questionTypeBadge: 'Csomagolás',
    figure: FIG_Q28,
    level: 3,
    question: 'A 16 cm sugarú, 3 cm vastag sajttömb egy 15°-os darabját becsomagolják; a teljes felszínre még 25%-ot számítanak. Mennyi csomagolóanyag kell?',
    options: ['≈ 219,5 cm²', '≈ 175,6 cm²', '≈ 203,8 cm²', '≈ 125,7 cm²'],
    correctAnswer: 0,
    explanation: 'Két körcikk: 2 · 256π/24 ≈ 67,02; két téglalap: 2 · 16 · 3 = 96; az ív menti hengerpalást-rész: (2π · 16 / 24) · 3 ≈ 12,57. A ≈ 175,59 cm² ⇒ · 1,25 ≈ 219,5 cm².',
    breakdown: ['körcikkek: 2 · π · 16² / 24 ≈ 67,02 cm²', 'téglalapok: 2 · 16 · 3 = 96 cm²', 'ív menti rész: 2π · 16 / 24 · 3 ≈ 12,57 cm²', '175,59 · 1,25 ≈ 219,5 cm²']
  },
  {
    id: 'se-q29',
    questionTypeBadge: 'Festékszükséglet',
    level: 3,
    question: 'Egy 15 literes vödör falfesték kiadóssága 8–9 m²/liter. A festő szerint egy 53 m²-es lakásnál az alapterület háromszorosát kell festeni, kétszer. Hány vödör festéket kell venni?',
    options: ['3', '2', '6', '5'],
    correctAnswer: 0,
    explanation: 'Festendő: 2 · 3 · 53 = 318 m²; egy vödör 120–135 m²-re elég ⇒ 318/135 ≈ 2,4 és 318/120 ≈ 2,7 ⇒ 3 vödör.'
  },
  {
    id: 'se-q30',
    questionTypeBadge: 'Rétegvastagság',
    level: 3,
    question: '1 liter festékkel 8 m² felületet lehet befesteni. Milyen vastag festékréteggel számolt a gyártó?',
    options: ['0,125 mm', '1,25 mm', '0,0125 mm', '12,5 mm'],
    correctAnswer: 0,
    explanation: '1 l = 1 dm³, 8 m² = 800 dm² ⇒ vastagság = 1 / 800 dm = 0,00125 dm = 0,125 mm.'
  }
];

export const SolidsEverydayQuiz: React.FC<{
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
      topicId="g12-ter-hetkoznapi-quiz"
      subtopicId="tergeometria-a-hetkoznapi-eletben"
      title="17. Térgeometria a hétköznapi életben – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: tömeg és sűrűség, anyagszükséglet, veszteség és ráhagyás, összetett testek."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={SOLIDS_EVERYDAY_QUESTIONS}
      cheatSheets={[
        {
          title: 'Mértékegységek',
          items: ['1 dm³ = 1 l = 1000 cm³; 1 m³ = 1000 l', '1 g/cm³ = 1 kg/dm³ = 1000 kg/m³', '1 m² = 100 dm² = 10 000 cm²', 'm = ρ · V']
        },
        {
          title: 'Képletek',
          items: ['Gömb: V = 4R³π/3, A = 4R²π', 'Kúp: V = r²πm/3, P = rπa', 'Henger: V = r²πm, P = 2rπm', 'Gúla: V = T·M/3; csonkakúp: P = (R + r)πa']
        },
        {
          title: 'Százalékok, kerekítés',
          items: [
            'Veszteség p%: szükséges = hasznos / (1 − p/100)',
            'Ráhagyás q%: anyag = felület · (1 + q/100)',
            'Darabszám (szelet, adag): lefelé kerekítünk',
            'Fordulók, vödrök: felfelé kerekítünk'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <SolidsEverydayMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <SolidsEverydaySorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default SolidsEverydayQuiz;
