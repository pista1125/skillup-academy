import React from 'react';

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

const FIG_CLS = 'w-full h-auto max-w-md mx-auto';

/** 2. feladat: 12 × 12 × 18 dm-es négyzetes kőoszlop és a belőle kifaragott gúla. */
export const SolidsPracticeExamColumnSvg: React.FC<{ className?: string }> = ({ className }) => {
  const s = 8;
  const k = 0.42;
  const P = (x: number, y: number, z: number): Pt => [70 + s * (x + k * z * 0.866), 185 - s * (y + k * z * 0.5)];
  const B = [P(0, 0, 0), P(12, 0, 0), P(12, 0, 12), P(0, 0, 12)];
  const T = [P(0, 18, 0), P(12, 18, 0), P(12, 18, 12), P(0, 18, 12)];
  const S = P(6, 18, 6);
  return (
    <KFig w={280} h={200} className={className ?? FIG_CLS}>
      <KL a={B[0]} b={B[1]} />
      <KL a={B[1]} b={B[2]} />
      <KL a={B[2]} b={B[3]} c={K_HID} w={1.2} d />
      <KL a={B[3]} b={B[0]} c={K_HID} w={1.2} d />
      {[0, 1, 2, 3].map((i) => (
        <KL key={i} a={T[i]} b={T[(i + 1) % 4]} />
      ))}
      <KL a={B[0]} b={T[0]} />
      <KL a={B[1]} b={T[1]} />
      <KL a={B[2]} b={T[2]} />
      <KL a={B[3]} b={T[3]} c={K_HID} w={1.2} d />
      <KL a={B[0]} b={S} c="#d97706" w={1.6} />
      <KL a={B[1]} b={S} c="#d97706" w={1.6} />
      <KL a={B[2]} b={S} c="#d97706" w={1.6} />
      <KL a={B[3]} b={S} c="#d97706" w={1.2} d />
      <KL a={B[0]} b={T[2]} c={K_UNK} w={1.3} d />
      <KT p={[(B[0][0] + B[1][0]) / 2, B[0][1] + 10]} t="12 dm" s={10} />
      <KT p={[B[0][0] - 6, (B[0][1] + T[0][1]) / 2]} t="18 dm" s={10} a="end" />
      <KT p={[232, 30]} t="testátló: ?" s={10} />
    </KFig>
  );
};

/** 3. feladat: a tölcsér tengelymetszete (átmérők 11, 9, 2, 1 cm; magasságok 0,5; 5; 2,5; 4,5 cm). */
export const SolidsPracticeExamFunnelSvg: React.FC<{ className?: string }> = ({ className }) => {
  const sc = 12;
  const cx = 110;
  const ys = [22, 28, 88, 118, 172];
  const ws = [11, 9, 9, 2, 1].map((d) => (d * sc) / 2);
  const left = ys.map((y, i): Pt => [cx - ws[i], y]);
  const right = ys.map((y, i): Pt => [cx + ws[i], y]);
  return (
    <KFig w={260} h={190} className={className ?? FIG_CLS}>
      <KPoly p={[...left, ...right.slice().reverse()]} fill="rgba(225,29,72,0.12)" c={K_EDGE} />
      {ys.slice(1, 4).map((y, i) => (
        <KL key={i} a={left[i + 1]} b={right[i + 1]} c={K_HID} w={1} d />
      ))}
      <KT p={[200, 22]} t="⌀ 11 cm" s={9.5} a="start" />
      <KT p={[200, 50]} t="⌀ 9 cm" s={9.5} a="start" />
      <KT p={[200, 116]} t="⌀ 2 cm" s={9.5} a="start" />
      <KT p={[200, 168]} t="⌀ 1 cm" s={9.5} a="start" />
      <KT p={[38, 25]} t="0,5" s={9.5} c={K_AUX} />
      <KT p={[38, 58]} t="5" s={9.5} c={K_AUX} />
      <KT p={[38, 103]} t="2,5" s={9.5} c={K_AUX} />
      <KT p={[38, 145]} t="4,5" s={9.5} c={K_AUX} />
    </KFig>
  );
};

/** 4. feladat: kúppalást síkba terítve – 210°-os, 18 cm sugarú körcikk. */
export const SolidsPracticeExamConeSectorSvg: React.FC<{ className?: string }> = ({ className }) => {
  const C: Pt = [130, 100];
  const R = 80;
  const a0 = -105;
  const a1 = 105;
  const P = (deg: number): Pt => [C[0] + R * Math.cos(((deg - 90) * Math.PI) / 180), C[1] + R * Math.sin(((deg - 90) * Math.PI) / 180)];
  const p0 = P(a0);
  const p1 = P(a1);
  return (
    <KFig w={260} h={200} className={className ?? FIG_CLS}>
      <path
        d={`M ${C[0]} ${C[1]} L ${kR(p0[0])} ${kR(p0[1])} A ${R} ${R} 0 1 1 ${kR(p1[0])} ${kR(p1[1])} Z`}
        fill="rgba(217,119,6,0.16)"
        stroke={K_EDGE}
        strokeWidth="1.8"
      />
      <KAng v={C} p1={p0} p2={p1} r={14} t="210°" tr={-14} />
      <KL a={C} b={P(0)} c={K_AUX} w={1.3} />
      <KT p={[137, 60]} t="18 cm" s={10} a="start" c={K_AUX} />
      <circle cx={C[0]} cy={C[1]} r="2" fill={K_INK} />
    </KFig>
  );
};

/** Tudáspróba I. 5.: „felfordított” négyzetes gúla alakú szökőkút (alapél 40 cm, magasság 70 cm). */
export const SolidsPracticeExamFountainSvg: React.FC<{ className?: string }> = ({ className }) => {
  const A: Pt = [50, 40];
  const B: Pt = [170, 40];
  const C: Pt = [220, 12];
  const D: Pt = [100, 12];
  const S: Pt = [135, 180];
  const O: Pt = [135, 26];
  return (
    <KFig w={260} h={200} className={className ?? FIG_CLS}>
      <KPoly p={[A, B, C, D]} fill="rgba(14,165,233,0.16)" />
      <KL a={A} b={S} />
      <KL a={B} b={S} />
      <KL a={C} b={S} />
      <KL a={D} b={S} c={K_HID} w={1.2} d />
      <KL a={O} b={S} c={K_AUX} w={1.3} d />
      <KT p={[110, 52]} t="40 cm" s={10} />
      <KT p={[141, 110]} t="70 cm" s={10} a="start" c={K_AUX} />
      <KT p={[135, 194]} t="csúcs lent" s={9.5} c="#334155" b={false} />
    </KFig>
  );
};

/** Tudáspróba II. 3.: 22 cm átmérőjű fa félgömbből kivájt 11 cm átmérőjű félgömb (tál). */
export const SolidsPracticeExamBowlSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={280} h={170} className={className ?? FIG_CLS}>
    <path d="M 30 40 A 110 110 0 0 0 250 40 Z" fill="rgba(180,83,9,0.18)" stroke={K_EDGE} strokeWidth="1.8" />
    <path d="M 85 40 A 55 55 0 0 0 195 40 Z" fill="#f8fafc" stroke={K_EDGE} strokeWidth="1.8" />
    <KL a={[30, 40]} b={[250, 40]} c={K_EDGE} />
    <KL a={[140, 40]} b={[250, 40]} c={K_AUX} w={1.2} d />
    <KT p={[222, 30]} t="11 cm" s={10} c={K_AUX} />
    <KL a={[140, 40]} b={[85, 40]} c="#d97706" w={1.4} />
    <KT p={[112, 30]} t="5,5 cm" s={10} c="#b45309" />
    <KT p={[140, 130]} t="tömör fa" s={10} c="#334155" b={false} />
  </KFig>
);

/** Tudáspróba II. 5.: a Louvre üvegpiramisa (alapél 35 m, magasság 20,6 m), oldalél- és oldallapszög. */
export const SolidsPracticeExamLouvreSvg: React.FC<{ className?: string }> = ({ className }) => {
  const s = 4.4;
  const k = 0.5;
  const P = (x: number, y: number, z: number): Pt => [40 + s * (x + k * z * 0.866), 175 - s * (y + k * z * 0.5)];
  const A = P(0, 0, 0);
  const B = P(35, 0, 0);
  const C = P(35, 0, 35);
  const D = P(0, 0, 35);
  const S = P(17.5, 20.6, 17.5);
  const O = P(17.5, 0, 17.5);
  const F = P(17.5, 0, 0);
  return (
    <KFig w={300} h={200} className={className ?? FIG_CLS}>
      <KPoly p={[A, B, S]} fill="rgba(14,165,233,0.14)" c="none" w={0} />
      <KL a={A} b={B} />
      <KL a={B} b={C} />
      <KL a={C} b={D} c={K_HID} w={1.2} d />
      <KL a={D} b={A} c={K_HID} w={1.2} d />
      <KL a={A} b={S} />
      <KL a={B} b={S} />
      <KL a={C} b={S} />
      <KL a={D} b={S} c={K_HID} w={1.2} d />
      <KL a={O} b={S} c={K_AUX} w={1.3} d />
      <KL a={O} b={A} c={K_HID} w={1} d />
      <KL a={F} b={S} c="#d97706" w={1.3} />
      <KL a={O} b={F} c={K_HID} w={1} d />
      <KT p={[(A[0] + B[0]) / 2, A[1] + 12]} t="35 m" s={10} />
      <KT p={[O[0] + 5, (O[1] + S[1]) / 2]} t="20,6 m" s={10} a="start" c={K_AUX} />
      <KT p={[248, 28]} t="α, β = ?" s={10.5} />
    </KFig>
  );
};
