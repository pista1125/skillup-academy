import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { FrustumAreaMatcher } from './FrustumAreaMatcher';
import { FrustumAreaSorter } from './FrustumAreaSorter';

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
const coneFig = (lab: KLab, Rs = 80, rs = 40) => (
  <KFig>
    <KCone cx={115} yb={128} yt={42} Rs={Rs} rs={rs} e={0.26} lab={lab} />
  </KFig>
);

const sqFig = (lab: { a?: string; b?: string; h?: string; mo?: string; edge?: string }, a = 11, b = 5) => (
  <KFig>
    <KSq ox={50} oy={135} s={10} a={a} b={b} h={8} lab={lab} />
  </KFig>
);

const trapFig = (bottom: string, top: string, h: string, side?: string, half?: string, angle?: string) => (
  <KFig>
    <KPoly p={[[30, 130], [210, 130], [160, 50], [80, 50]]} fill="rgba(99,102,241,0.14)" />
    <KL a={[80, 50]} b={[80, 130]} c={K_ARC} w={1.3} d />
    <KRight v={[80, 130]} p1={[80, 50]} p2={[210, 130]} r={9} />
    <KT p={[120, 144]} t={bottom} s={11} />
    <KT p={[120, 40]} t={top} s={11} />
    <KT p={[86, 92]} t={h} s={11} a="start" c="#b45309" />
    {side && <KT p={[44, 86]} t={side} s={11} a="end" />}
    {half && <KT p={[55, 140]} t={half} s={10} c={K_AUX} />}
    {angle && <KAng v={[30, 130]} p1={[210, 130]} p2={[80, 50]} r={18} t={angle} tr={30} />}
  </KFig>
);

const FIG_Q1 = coneFig({ R: 'R = 5', r: 'r = 3', a: 'a = 4' });
const FIG_Q5 = sqFig({ a: 'a = 6', b: 'b = 4', mo: 'm = 5' }, 6, 4);
const FIG_Q8 = trapFig('8 cm', '4 cm', 'm = 3 cm');
const FIG_Q9 = coneFig({ R: 'R = 6', r: 'r = 2' }, 84, 28);
const FIG_Q11 = coneFig({ R: 'R = 6', r: 'r = 3', M: 'M = 4', a: 'a = ?' });
const FIG_Q13 = (
  <KFig>
    <KPoly p={[[50, 140], [190, 140], [150, 70.7], [90, 70.7]]} fill="rgba(99,102,241,0.16)" />
    <KPoly p={[[90, 70.7], [150, 70.7], [120, 18.8]]} fill="rgba(5,150,105,0.12)" c={K_AUX} />
    <KL a={[120, 18.8]} b={[120, 140]} c={K_HID} w={1.2} d />
    <KRight v={[120, 140]} p1={[120, 100]} p2={[190, 140]} r={9} />
    <KT p={[120, 152]} t="35 cm" s={10.5} />
    <KT p={[136, 62]} t="7,5" s={10} c={K_AUX} />
    <KT p={[200, 60]} t="λ = ?" s={11} />
  </KFig>
);
const FIG_Q17 = (
  <KFig>
    <path d="M 20 30 A 100 100 0 0 0 220 30 L 163 30 A 43 43 0 0 1 77 30 Z" fill="rgba(99,102,241,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
    <KL a={[120, 30]} b={[190, 101]} c={K_AUX} w={1.3} />
    <KT p={[176, 70]} t="35" s={10.5} c={K_AUX} />
    <KL a={[120, 30]} b={[93, 63]} c={K_ARC} w={1.3} />
    <KT p={[100, 44]} t="x = ?" s={10.5} />
    <KT p={[120, 120]} t="ívhossz: 15π" s={9.5} />
    <circle cx="120" cy="30" r="2" fill={K_INK} />
  </KFig>
);
const FIG_Q18 = sqFig({ a: 'a = 11', b: 'b = 5', mo: 'm = ?' });
const FIG_Q19 = trapFig('11', '5', 'm = 4', 'él = ?', '3');
const FIG_Q21 = (
  <KFig>
    <KPoly p={[[30, 130], [210, 130], [150, 80], [90, 80]]} fill="rgba(99,102,241,0.14)" />
    <KL a={[90, 80]} b={[90, 130]} c={K_AUX} w={1.3} d />
    <KRight v={[90, 130]} p1={[90, 80]} p2={[210, 130]} r={9} />
    <KAng v={[30, 130]} p1={[210, 130]} p2={[90, 80]} r={20} t="α = ?" tr={34} />
    <KT p={[120, 144]} t="11 cm" s={10.5} />
    <KT p={[120, 70]} t="5 cm" s={10.5} />
    <KT p={[50, 98]} t="m = 4" s={10.5} a="end" c="#b45309" />
    <KT p={[60, 140]} t="3" s={10} c={K_AUX} />
    <KT p={[120, 18]} t="síkmetszet az oldallapmagasságokon át" s={9.5} c="#334155" b={false} />
  </KFig>
);
const FIG_Q22 = sqFig({ a: 'a = 17', b: 'b = ?', mo: 'm = 12' }, 11, 5);
const FIG_Q24 = sqFig({ a: 'a = 10', b: 'b = 4', h: 'M = 4' }, 10, 4);
const FIG_Q26 = (
  <KFig>
    <path d="M 177.1 61.5 A 60 60 0 1 1 62.9 61.5 L 91.5 70.7 A 30 30 0 1 0 148.5 70.7 Z" fill="rgba(139,92,246,0.18)" stroke="#7c3aed" strokeWidth="1.8" />
    <path d="M 133.3 75.7 A 14 14 0 1 1 106.7 75.7" fill="none" stroke={K_ARC} strokeWidth="1.5" />
    <circle cx="120" cy="80" r="2" fill={K_INK} />
    <KT p={[120, 100]} t="φ = ?" s={10.5} />
    <KT p={[120, 18]} t="R = 6, r = 3, a = 5" s={10} c="#334155" />
  </KFig>
);
const FIG_Q27 = trapFig('2R = 24', '2r = 12', 'M', 'a = 10');
const FIG_Q28 = coneFig({ R: 'R = 15', r: 'r = 10', M: 'M = 12' }, 84, 56);
const FIG_Q29 = (
  <KFig>
    <KNgon cx={120} yb={122} yt={48} Rs={84} rs={56} n={6} e={0.32} />
    <KT p={[120, 150]} t="a = 6" s={10.5} />
    <KT p={[120, 22]} t="b = 4" s={10.5} />
    <KT p={[214, 86]} t="m = 5" s={10.5} c="#b45309" />
  </KFig>
);

export const FRUSTUM_AREA_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'fa-q1',
    questionTypeBadge: 'Csonkakúp palástja',
    figure: FIG_Q1,
    level: 1,
    question: 'Egy csonkakúp alapkörének sugara 5 cm, fedőkörének sugara 3 cm, alkotója 4 cm. Mekkora a palást területe?',
    options: ['32π ≈ 100,5 cm²', '16π ≈ 50,3 cm²', '64π ≈ 201,1 cm²', '34π ≈ 106,8 cm²'],
    correctAnswer: 0,
    explanation: 'P = (R + r)·π·a = (5 + 3) · π · 4 = 32π ≈ 100,5 cm².'
  },
  {
    id: 'fa-q2',
    questionTypeBadge: 'Csonkakúp felszíne',
    level: 1,
    question: 'Mekkora annak a csonkakúpnak a felszíne, amelyre R = 5 cm, r = 3 cm, a = 4 cm?',
    options: ['66π ≈ 207,3 cm²', '34π ≈ 106,8 cm²', '98π ≈ 307,9 cm²', '50π ≈ 157,1 cm²'],
    correctAnswer: 0,
    explanation: 'A = π[R² + r² + (R + r)a] = π(25 + 9 + 32) = 66π ≈ 207,3 cm².'
  },
  {
    id: 'fa-q3',
    questionTypeBadge: 'Képlet',
    level: 1,
    question: 'Melyik a csonkakúp palástjának területképlete (R, r a sugarak, a az alkotó)?',
    options: ['(R + r)·π·a', '(R − r)·π·a', '(R + r)·a', '2(R + r)·π·a'],
    correctAnswer: 0,
    explanation: 'A palást körgyűrűcikk: a két körív (2Rπ és 2rπ) számtani közepe szorozva a szélességgel (a): (2Rπ + 2rπ)/2 · a = (R + r)πa.'
  },
  {
    id: 'fa-q4',
    questionTypeBadge: 'Háló',
    level: 1,
    question: 'Milyen síkidom a csonkakúp kiterített palástja?',
    options: ['Körgyűrűcikk', 'Körcikk', 'Szimmetrikus trapéz', 'Téglalap'],
    correctAnswer: 0,
    explanation: 'A csonkakúp hálója két körlapból és egy körgyűrűcikkből áll. (Körcikk a forgáskúp, téglalap a henger palástja.)'
  },
  {
    id: 'fa-q5',
    questionTypeBadge: 'Csonkagúla felszíne',
    figure: FIG_Q5,
    level: 1,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 6 cm, fedőéle 4 cm, oldallapjainak magassága 5 cm. Mekkora a felszíne?',
    options: ['152 cm²', '52 cm²', '100 cm²', '252 cm²'],
    correctAnswer: 0,
    explanation: 'A = a² + b² + 2(a + b)·m = 36 + 16 + 2 · 10 · 5 = 152 cm².'
  },
  {
    id: 'fa-q6',
    questionTypeBadge: 'Csonkagúla palástja',
    level: 1,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 10 cm, fedőéle 6 cm, oldallapmagassága 4 cm. Mekkora a palást területe?',
    options: ['128 cm²', '64 cm²', '256 cm²', '160 cm²'],
    correctAnswer: 0,
    explanation: 'A palást 4 egybevágó trapéz: 4 · (10 + 6)/2 · 4 = 2 · 16 · 4 = 128 cm².'
  },
  {
    id: 'fa-q7',
    questionTypeBadge: 'Oldallap',
    level: 1,
    question: 'Milyen síkidomok a szabályos csonkagúla oldallapjai?',
    options: ['Egybevágó szimmetrikus trapézok', 'Egybevágó téglalapok', 'Egybevágó egyenlő szárú háromszögek', 'Egybevágó paralelogrammák'],
    correctAnswer: 0,
    explanation: 'A szabályos n oldalú csonkagúla palástját n darab egymással egybevágó szimmetrikus (húr)trapéz alkotja.'
  },
  {
    id: 'fa-q8',
    questionTypeBadge: 'Trapéz oldallap',
    figure: FIG_Q8,
    level: 1,
    question: 'Egy csonkagúla oldallapja szimmetrikus trapéz, párhuzamos oldalai 8 cm és 4 cm, magassága 3 cm. Mekkora a területe?',
    options: ['18 cm²', '36 cm²', '12 cm²', '24 cm²'],
    correctAnswer: 0,
    explanation: 'T = (8 + 4)/2 · 3 = 6 · 3 = 18 cm².'
  },
  {
    id: 'fa-q9',
    questionTypeBadge: 'Alap- és fedőlap',
    figure: FIG_Q9,
    level: 1,
    question: 'Egy csonkakúp alapkörének sugara 6 cm, fedőkörének sugara 2 cm. Mekkora az alaplap és a fedőlap területének összege?',
    options: ['40π cm²', '64π cm²', '32π cm²', '16π cm²'],
    correctAnswer: 0,
    explanation: 'T + t = 6²π + 2²π = 36π + 4π = 40π ≈ 125,7 cm². (64π = (6 + 2)²π hibás.)'
  },
  {
    id: 'fa-q10',
    questionTypeBadge: 'Körgyűrűcikk',
    level: 1,
    question: 'Mivel egyenlő egy körgyűrűcikk területe?',
    options: [
      'A határoló körívek hossza számtani közepének és a körgyűrű szélességének szorzatával',
      'A határoló körívek hosszának összegével, szorozva a szélességgel',
      'A nagyobbik körív hosszának és a szélességnek a szorzatával',
      'A határoló körívek hossza mértani közepének és a szélességnek a szorzatával'
    ],
    correctAnswer: 0,
    explanation: 'T = (i₁ + i₂)/2 · szélesség – ugyanúgy, mint a trapéz területe. Ebből kapjuk: P = (2Rπ + 2rπ)/2 · a = (R + r)πa.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'fa-q11',
    questionTypeBadge: 'Alkotó és palást',
    figure: FIG_Q11,
    level: 2,
    question: 'Egy csonkakúpra R = 6 cm, r = 3 cm, a magassága M = 4 cm. Mekkora a palást területe?',
    options: ['45π ≈ 141,4 cm²', '36π ≈ 113,1 cm²', '27π ≈ 84,8 cm²', '54π ≈ 169,6 cm²'],
    correctAnswer: 0,
    explanation: 'a = √(M² + (R − r)²) = √(16 + 9) = 5 cm; P = (6 + 3) · π · 5 = 45π ≈ 141,4 cm². (36π a magassággal számolt hibás érték.)',
    breakdown: ['R − r = 3 cm', 'a = √(4² + 3²) = 5 cm', 'P = (R + r)πa = 9 · 5 · π = 45π']
  },
  {
    id: 'fa-q12',
    questionTypeBadge: 'Csonkakúp felszíne',
    level: 2,
    question: 'Mekkora a felszíne annak a csonkakúpnak, amelyre R = 6 cm, r = 3 cm és M = 4 cm?',
    options: ['90π ≈ 282,7 cm²', '81π ≈ 254,5 cm²', '45π ≈ 141,4 cm²', '99π ≈ 311,0 cm²'],
    correctAnswer: 0,
    explanation: 'a = 5 cm, így A = π(36 + 9 + 9 · 5) = 90π ≈ 282,7 cm². (81π: a helyett M-mel számolva.)'
  },
  {
    id: 'fa-q13',
    questionTypeBadge: 'Hasonlóság',
    figure: FIG_Q13,
    level: 2,
    question: 'Antal egy 35 cm oldalú szabályos háromszöget forgat meg a szimmetriatengelye körül, majd a kapott kúpból levág egy 7,5 cm alapkörsugarú kis kúpot. Mekkora a kis kúp és a teljes kúp hasonlóságának aránya?',
    options: ['3/7', '7/3', '1/2', '9/49'],
    correctAnswer: 0,
    explanation: 'A teljes kúp alapkörének sugara 35/2 = 17,5 cm, így λ = 7,5 / 17,5 = 3/7.'
  },
  {
    id: 'fa-q14',
    questionTypeBadge: 'Palástok aránya',
    level: 2,
    question: 'Ha a kis kúp a teljes kúphoz 3/7 arányban hasonló, hányad része a kis kúp palástja a teljes kúp palástjának?',
    options: ['9/49', '3/7', '40/49', '27/343'],
    correctAnswer: 0,
    explanation: 'Hasonló testek felületeinek aránya λ² = (3/7)² = 9/49. (A csonkakúp palástja így 40/49 rész.)'
  },
  {
    id: 'fa-q15',
    questionTypeBadge: 'Védőgallér',
    level: 2,
    question: 'Szotyi gallérja egy csonkakúp palástja: R = 17,5 cm, r = 7,5 cm, alkotó 20 cm. Mekkora a gallér területe?',
    options: ['500π ≈ 1571 cm²', '612,5π ≈ 1924 cm²', '112,5π ≈ 353 cm²', '250π ≈ 785 cm²'],
    correctAnswer: 0,
    explanation: 'P = (17,5 + 7,5) · π · 20 = 500π ≈ 1571 cm². (612,5π a teljes kúp, 112,5π a kis kúp palástja.)'
  },
  {
    id: 'fa-q16',
    questionTypeBadge: 'Ívhossz',
    level: 2,
    question: 'Bandi egy 35 cm sugarú félkörből indul ki. Mekkora a félkörív hossza?',
    options: ['35π ≈ 110 cm', '70π ≈ 220 cm', '17,5π ≈ 55 cm', '612,5π ≈ 1924 cm'],
    correctAnswer: 0,
    explanation: 'A félkörív a teljes kerület fele: 2 · 35 · π / 2 = 35π ≈ 110 cm. (612,5π a félkör területe.)'
  },
  {
    id: 'fa-q17',
    questionTypeBadge: 'Kiterítés',
    figure: FIG_Q17,
    level: 2,
    question: 'Mekkora sugarú koncentrikus félkört vágjon ki Bandi a 35 cm sugarú félkörből, hogy a kis félkörív hossza a 7,5 cm sugarú fedőkör kerületével (15π) legyen egyenlő?',
    options: ['15 cm', '7,5 cm', '20 cm', '17,5 cm'],
    correctAnswer: 0,
    explanation: 'Az x sugarú félkörív hossza xπ, ennek kell 2 · 7,5 · π = 15π-nek lennie ⇒ x = 15 cm. (Az alkotó így 35 − 15 = 20 cm.)'
  },
  {
    id: 'fa-q18',
    questionTypeBadge: 'Oldallapmagasság',
    figure: FIG_Q18,
    level: 2,
    question: 'Egy szabályos négyoldalú csonkagúla felszíne 274 cm², alapéle 11 cm, fedőéle 5 cm. Mekkora az oldallapok magassága?',
    options: ['4 cm', '8 cm', '2 cm', '5 cm'],
    correctAnswer: 0,
    explanation: '274 = 121 + 25 + 2 · (11 + 5) · m = 146 + 32m ⇒ 32m = 128 ⇒ m = 4 cm.'
  },
  {
    id: 'fa-q19',
    questionTypeBadge: 'Oldalél',
    figure: FIG_Q19,
    level: 2,
    question: 'A csonkagúla oldallapja szimmetrikus trapéz: alapjai 11 cm és 5 cm, magassága 4 cm. Mekkora az oldalél?',
    options: ['5 cm', '≈ 6,8 cm', '4 cm', '≈ 6,4 cm'],
    correctAnswer: 0,
    explanation: 'A trapéz szárából leválasztott derékszögű háromszög befogói 4 cm és (11 − 5)/2 = 3 cm ⇒ oldalél = √(16 + 9) = 5 cm.'
  },
  {
    id: 'fa-q20',
    questionTypeBadge: 'Csonkakúp felszíne',
    level: 2,
    question: 'Egy csonkakúpra R = 12 cm, r = 6 cm, a = 10 cm. Mekkora a felszíne?',
    options: ['360π ≈ 1131 cm²', '180π ≈ 565 cm²', '324π ≈ 1018 cm²', '540π ≈ 1696 cm²'],
    correctAnswer: 0,
    explanation: 'A = π(144 + 36 + 18 · 10) = π(144 + 36 + 180) = 360π ≈ 1131 cm². (180π csak a palást.)'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'fa-q21',
    questionTypeBadge: 'Hajlásszög',
    figure: FIG_Q21,
    level: 3,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 11 cm, fedőéle 5 cm, oldallapmagassága 4 cm. Mekkora szöget zár be az oldallap az alaplappal?',
    options: ['≈ 41,4°', '≈ 48,6°', '≈ 53,1°', '≈ 36,9°'],
    correctAnswer: 0,
    explanation: 'A síkmetszetben a szög melletti befogó (11 − 5)/2 = 3 cm, az átfogó az oldallapmagasság (4 cm): cos α = 3/4 ⇒ α ≈ 41,4°.',
    breakdown: ['(a − b)/2 = 3 cm', 'cos α = 3 / 4 = 0,75', 'α ≈ 41,4°']
  },
  {
    id: 'fa-q22',
    questionTypeBadge: 'Fedőél',
    figure: FIG_Q22,
    level: 3,
    question: 'Egy szabályos négyoldalú csonkagúla felszíne 914 cm², alapéle 17 cm, oldallapmagassága 12 cm. Mekkora a fedőél?',
    options: ['7 cm', '5 cm', '9 cm', '12 cm'],
    correctAnswer: 0,
    explanation: '289 + b² + 2(17 + b) · 12 = 914 ⇒ b² + 24b − 217 = 0 ⇒ b = (−24 + 38)/2 = 7 cm (a negatív gyök nem jó).',
    breakdown: ['289 + b² + 408 + 24b = 914', 'b² + 24b − 217 = 0', 'D = 576 + 868 = 1444, √D = 38', 'b = 7 cm']
  },
  {
    id: 'fa-q23',
    questionTypeBadge: 'Oldalél hajlásszöge',
    level: 3,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 17 cm, fedőéle 7 cm, oldaléle 13 cm. Mekkora szöget zár be az oldalél az alaplappal?',
    options: ['≈ 57,0°', '≈ 67,4°', '≈ 33,0°', '≈ 45,0°'],
    correctAnswer: 0,
    explanation: 'Az átlós síkmetszet szimmetrikus trapéz (17√2 és 7√2 alapokkal); az oldalél vetülete (17√2 − 7√2)/2 = 5√2 ≈ 7,07 cm. cos β = 7,07 / 13 ⇒ β ≈ 57,0°. (67,4° a vetületet 5 cm-nek venné.)'
  },
  {
    id: 'fa-q24',
    questionTypeBadge: 'Felszín magasságból',
    figure: FIG_Q24,
    level: 3,
    question: 'Egy szabályos négyoldalú csonkagúla alapéle 10 cm, fedőéle 4 cm, a test magassága 4 cm. Mekkora a felszíne?',
    options: ['256 cm²', '228 cm²', '340 cm²', '172 cm²'],
    correctAnswer: 0,
    explanation: 'Oldallapmagasság: m = √(4² + 3²) = 5 cm; A = 100 + 16 + 2 · 14 · 5 = 256 cm². (228 cm² a test magasságával számolt hibás érték.)',
    breakdown: ['(a − b)/2 = 3 cm', 'm = √(M² + 3²) = 5 cm', 'A = a² + b² + 2(a + b)m = 256 cm²']
  },
  {
    id: 'fa-q25',
    questionTypeBadge: 'Csonkakúp palástja',
    level: 3,
    question: 'Egy csonkakúpra R = 6,15 cm, r = 4,76 cm, a = 3,11 cm. Mekkora (közelítőleg) a palást területe?',
    options: ['≈ 106,6 cm²', '≈ 33,9 cm²', '≈ 213,2 cm²', '≈ 13,6 cm²'],
    correctAnswer: 0,
    explanation: 'P = (6,15 + 4,76) · π · 3,11 = 10,91 · 3,11 · π ≈ 106,6 cm². (33,9 a π nélküli szorzat.)'
  },
  {
    id: 'fa-q26',
    questionTypeBadge: 'Középponti szög',
    figure: FIG_Q26,
    level: 3,
    question: 'Egy csonkakúpra R = 6 cm, r = 3 cm, a = 5 cm. Mekkora a kiterített palást (körgyűrűcikk) középponti szöge?',
    options: ['216°', '108°', '180°', '144°'],
    correctAnswer: 0,
    explanation: 'A kiegészítő teljes kúp alkotója X = a · R/(R − r) = 10 cm. A külső ív 2Rπ = 12π, ez a 10 cm sugarú kör 20π kerületének 12/20 része: φ = 0,6 · 360° = 216°.'
  },
  {
    id: 'fa-q27',
    questionTypeBadge: 'Tengelymetszet',
    figure: FIG_Q27,
    level: 3,
    question: 'Egy csonkakúpra R = 12 cm, r = 6 cm, a = 10 cm. Mekkora a tengelymetszetének területe?',
    options: ['144 cm²', '288 cm²', '180 cm²', '72 cm²'],
    correctAnswer: 0,
    explanation: 'M = √(10² − 6²) = 8 cm. A tengelymetszet trapéz: (24 + 12)/2 · 8 = 144 cm².'
  },
  {
    id: 'fa-q28',
    questionTypeBadge: 'Lámpaernyő',
    figure: FIG_Q28,
    level: 3,
    question: 'Egy csonkakúp alakú lámpaernyő (csak a palást) alsó peremének sugara 15 cm, felsőé 10 cm, magassága 12 cm. Mennyi anyag kell hozzá?',
    options: ['325π ≈ 1021 cm²', '300π ≈ 942 cm²', '650π ≈ 2042 cm²', '125π ≈ 393 cm²'],
    correctAnswer: 0,
    explanation: 'a = √(12² + 5²) = 13 cm; P = (15 + 10) · π · 13 = 325π ≈ 1021 cm². (300π: M-mel számolva; 125π: az R − r = 5 cm-rel mint alkotóval.)'
  },
  {
    id: 'fa-q29',
    questionTypeBadge: 'Hatoldalú csonkagúla',
    figure: FIG_Q29,
    level: 3,
    question: 'Egy szabályos hatoldalú csonkagúla alapéle 6 cm, fedőéle 4 cm, oldallapmagassága 5 cm. Mekkora a felszíne?',
    options: ['≈ 285,1 cm²', '≈ 435,1 cm²', '≈ 210,1 cm²', '202 cm²'],
    correctAnswer: 0,
    explanation: 'T + t = 6 · (√3/4) · (36 + 16) ≈ 135,1 cm²; palást: 6 · (6 + 4)/2 · 5 = 150 cm²; A ≈ 285,1 cm².',
    breakdown: ['szabályos hatszög: T = 6 · a²√3/4', 'T + t ≈ 93,53 + 41,57 ≈ 135,1 cm²', 'P = 6 · 5 · 5 = 150 cm²', 'A ≈ 285,1 cm²']
  },
  {
    id: 'fa-q30',
    questionTypeBadge: 'Nagyítás',
    level: 3,
    question: 'Egy csonkakúp minden méretét (R, r, a) kétszeresére növeljük. Hogyan változik a felszíne?',
    options: ['4-szeresére nő', '2-szeresére nő', '8-szorosára nő', '6-szorosára nő'],
    correctAnswer: 0,
    explanation: 'A = π[R² + r² + (R + r)a] minden tagja két hosszúság szorzata, így λ = 2 esetén a felszín λ² = 4-szeresére nő (hasonló testek).'
  }
];

export const FrustumAreaQuiz: React.FC<{
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
      topicId="g12-ter-csonka-felszin-quiz"
      subtopicId="a-csonkagula-es-a-csonkakup-felszine"
      title="15. A csonkagúla és a csonkakúp felszíne – Kvíz"
      subtitle="30 tesztkérdés 3 nehézségi szinten: palást, felszín, alkotó és oldallapmagasság, a védőgallér-feladat."
      badge="12. OSZTÁLY • I. TÉRGEOMETRIA • KVÍZ"
      questions={FRUSTUM_AREA_QUESTIONS}
      cheatSheets={[
        {
          title: 'Csonkakúp',
          items: [
            'A = T + t + P = R²π + r²π + (R + r)πa',
            'A = π · [R² + r² + (R + r) · a]',
            'Alkotó: a = √(M² + (R − r)²)',
            'A palást körgyűrűcikk: (2Rπ + 2rπ)/2 · a'
          ]
        },
        {
          title: 'Szabályos csonkagúla',
          items: [
            'A = T + t + n · T_trapéz',
            'Négyzetes: A = a² + b² + 2(a + b) · m',
            'Oldallapmagasság: m = √(M² + ((a − b)/2)²)',
            'Oldalél: √(m² + ((a − b)/2)²)'
          ]
        },
        {
          title: 'Tankönyvi eredmények',
          items: [
            'Gallér: R = 17,5; r = 7,5; a = 20 ⇒ P = 500π ≈ 1571 cm²',
            'λ = 3/7 ⇒ kis kúp palástja 9/49, csonkakúpé 40/49 rész',
            'A = 274, a = 11, b = 5 ⇒ m = 4, oldalél 5, α ≈ 41,4°',
            'A = 914, a = 17, m = 12 ⇒ b = 7, oldalél 13, β ≈ 57,0°'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <FrustumAreaMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <FrustumAreaSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default FrustumAreaQuiz;
