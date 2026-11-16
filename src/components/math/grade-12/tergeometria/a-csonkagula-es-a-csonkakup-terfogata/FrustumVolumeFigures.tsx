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

/** Valençay-sajt: szabályos négyoldalú gúla, a csúcsától 60%-nyi magasságban levágva. */
export const FrustumVolumeCheeseSvg: React.FC<{ className?: string }> = ({ className }) => {
  const s = 26;
  const k = 0.42;
  const H = 6.4;
  const P = (x: number, y: number, z: number): Pt => [70 + s * (x + k * z * 0.866), 175 - s * (y + k * z * 0.5)];
  const A = P(0, 0, 0);
  const B = P(4, 0, 0);
  const C = P(4, 0, 4);
  const D = P(0, 0, 4);
  const E = P(2, H, 2);
  const O = P(2, 0, 2);
  const cut = 0.4 * H;
  const q = (p: [number, number, number]): Pt => P(2 + (p[0] - 2) * 0.6, cut, 2 + (p[2] - 2) * 0.6);
  const A1 = q([0, 0, 0]);
  const B1 = q([4, 0, 0]);
  const C1 = q([4, 0, 4]);
  const D1 = q([0, 0, 4]);
  return (
    <KFig w={300} h={200} className={className ?? FIG_CLS}>
      <KPoly p={[A1, B1, C1, D1]} fill="rgba(217,119,6,0.18)" c="#d97706" w={1.4} />
      <KPoly p={[A, B, B1, A1]} fill={K_FILL} c="none" w={0} />
      <KPoly p={[A1, B1, E]} fill="rgba(5,150,105,0.12)" c="none" w={0} />
      <KL a={A} b={B} />
      <KL a={B} b={C} />
      <KL a={C} b={D} c={K_HID} w={1.3} d />
      <KL a={D} b={A} c={K_HID} w={1.3} d />
      <KL a={A} b={E} />
      <KL a={B} b={E} />
      <KL a={C} b={E} />
      <KL a={D} b={E} c={K_HID} w={1.3} d />
      <KL a={O} b={E} c={K_AUX} w={1.3} d />
      <KL a={O} b={A} c={K_HID} w={1} d />
      <KT p={[A[0] - 8, A[1] + 6]} t="A" s={10.5} />
      <KT p={[B[0] + 8, B[1] + 6]} t="B" s={10.5} />
      <KT p={[C[0] + 9, C[1]]} t="C" s={10.5} />
      <KT p={[D[0] - 9, D[1]]} t="D" s={10.5} />
      <KT p={[E[0], E[1] - 9]} t="E" s={10.5} />
      <KT p={[O[0] + 9, O[1] + 4]} t="O" s={10.5} />
      <KT p={[(A[0] + B[0]) / 2, A[1] + 12]} t="4 cm" s={10} />
      <KT p={[(B[0] + E[0]) / 2 + 14, (B[1] + E[1]) / 2 + 10]} t="7 cm" s={10} />
      <KT p={[232, 70]} t="kis gúla: 60% magasság" s={10} c={K_AUX} a="start" b={false} />
      <KT p={[232, 140]} t="csonkagúla" s={10} c={K_EDGE} a="start" b={false} />
    </KFig>
  );
};

/** A gúla magassága: derékszögű háromszög a fél átlóval (2√2) és az oldaléllel (7). */
export const FrustumVolumeHeightTriangleSvg: React.FC<{ className?: string }> = ({ className }) => {
  const O: Pt = [90, 170];
  const A: Pt = [200, 170];
  const E: Pt = [90, 30];
  return (
    <KFig w={260} h={200} className={className ?? FIG_CLS}>
      <KPoly p={[O, A, E]} fill="rgba(5,150,105,0.12)" c={K_AUX} />
      <KRight v={O} p1={E} p2={A} r={12} />
      <KT p={[145, 184]} t="2√2 cm" s={10.5} />
      <KT p={[155, 92]} t="7 cm" s={10.5} a="start" />
      <KT p={[82, 100]} t="M = ?" s={11} a="end" />
      <KT p={[80, 176]} t="O" s={10.5} a="end" />
      <KT p={[208, 176]} t="A" s={10.5} a="start" />
      <KT p={[90, 20]} t="E" s={10.5} />
    </KFig>
  );
};

/** A térfogatképlet három alakja: általános csonkagúla, négyzetes csonkagúla, csonkakúp. */
export const FrustumVolumeFormulasSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={360} h={190} className={className ?? FIG_CLS}>
    <KNgon cx={62} yb={140} yt={70} Rs={46} rs={26} n={5} e={0.34} phase={0.3} />
    <KL a={[62, 140]} b={[62, 70]} c={K_AUX} w={1.3} d />
    <KT p={[66, 106]} t="M" s={10.5} a="start" c={K_AUX} />
    <KT p={[62, 172]} t="T" s={11} />
    <KT p={[62, 52]} t="t" s={11} />
    <KSq ox={128} oy={150} s={9} a={9} b={5} h={8} lab={{ a: 'a', b: 'b', h: 'M' }} />
    <KCone cx={295} yb={145} yt={70} Rs={46} rs={24} e={0.28} lab={{ R: 'R', r: 'r', M: 'M' }} />
    <KT p={[180, 18]} t="V = M/3 · (T + √(T·t) + t)" s={11} c="#334155" />
  </KFig>
);

/** 3. feladat: 3 cm sugarú, 12 cm magas kúp két párhuzamos síkkal a csúcstól 4 és 8 cm-re elmetszve. */
export const FrustumVolumeConeCutsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const apexY = 22;
  const baseY = 178;
  const Rpx = 66;
  const cx = 120;
  const yAt = (d: number) => apexY + ((baseY - apexY) * d) / 12;
  const rAt = (d: number) => (Rpx * d) / 12;
  return (
    <KFig w={260} h={200} className={className ?? FIG_CLS}>
      <KEll cx={cx} cy={baseY} rx={Rpx} ry={Rpx * 0.25} hidden fill={K_FILL} />
      <KEll cx={cx} cy={yAt(8)} rx={rAt(8)} ry={rAt(8) * 0.25} hidden c="#d97706" />
      <KEll cx={cx} cy={yAt(4)} rx={rAt(4)} ry={rAt(4) * 0.25} hidden c="#d97706" />
      <KL a={[cx, apexY]} b={[cx - Rpx, baseY]} />
      <KL a={[cx, apexY]} b={[cx + Rpx, baseY]} />
      <KL a={[cx, apexY]} b={[cx, baseY]} c={K_AUX} w={1.2} d />
      <KL a={[cx, baseY]} b={[cx + Rpx, baseY]} c={K_AUX} w={1.3} />
      <KT p={[cx + Rpx / 2, baseY + 12]} t="3 cm" s={10} />
      <KL a={[215, apexY]} b={[215, yAt(4)]} c={K_ARC} w={1.2} />
      <KL a={[235, apexY]} b={[235, yAt(8)]} c={K_ARC} w={1.2} />
      <KL a={[250, apexY]} b={[250, baseY]} c={K_HID} w={1.2} />
      <KT p={[211, (apexY + yAt(4)) / 2]} t="4" s={10} a="end" c="#b45309" />
      <KT p={[231, yAt(6)]} t="8" s={10} a="end" c="#b45309" />
      <KT p={[246, yAt(10)]} t="12" s={10} a="end" c={K_HID} />
    </KFig>
  );
};

/** 2. feladat: a csonkagúla tengelymetszete és a kiegészítő gúla (x). */
export const FrustumVolumeComplementSvg: React.FC<{ className?: string }> = ({ className }) => {
  const A: Pt = [72, 180];
  const B: Pt = [188, 180];
  const C: Pt = [168.7, 141.3];
  const D: Pt = [91.3, 141.3];
  const S: Pt = [130, 64];
  const top: Pt = [130, 141.3];
  return (
    <KFig w={260} h={200} className={className ?? FIG_CLS}>
      <KPoly p={[A, B, C, D]} fill={K_FILL} />
      <KL a={D} b={S} c={K_HID} w={1.3} d />
      <KL a={C} b={S} c={K_HID} w={1.3} d />
      <KL a={[130, 180]} b={top} c={K_AUX} w={1.3} d />
      <KL a={top} b={S} c={K_ARC} w={1.3} d />
      <KRight v={[130, 180]} p1={top} p2={B} r={10} />
      <KT p={[130, 192]} t="12 cm" s={10.5} />
      <KT p={[112, 133]} t="8 cm" s={10.5} />
      <KT p={[136, 162]} t="M = 6" s={10.5} a="start" c={K_AUX} />
      <KT p={[136, 104]} t="x = ?" s={10.5} a="start" />
      <KT p={[130, 22]} t="8 : 12 = x : (x + 6)" s={10.5} c="#334155" />
    </KFig>
  );
};

/** Nagy gúla − kis gúla = csonkagúla. */
export const FrustumVolumeDifferenceSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={360} h={150} className={className ?? FIG_CLS}>
    <KNgon cx={60} yb={120} yt={22} Rs={45} rs={0} n={4} e={0.34} phase={0.35} />
    <KT p={[118, 80]} t="−" s={20} c="#334155" />
    <KNgon cx={170} yb={78} yt={22} Rs={26} rs={0} n={4} e={0.34} phase={0.35} />
    <KT p={[218, 80]} t="=" s={20} c="#334155" />
    <KNgon cx={295} yb={120} yt={78} Rs={45} rs={26} n={4} e={0.34} phase={0.35} />
    <KT p={[60, 140]} t="V_nagy" s={10} c="#334155" />
    <KT p={[170, 105]} t="V_kicsi = λ³ · V_nagy" s={10} c="#334155" />
    <KT p={[295, 140]} t="V_csonka = (1 − λ³) · V_nagy" s={10} c="#334155" />
  </KFig>
);
