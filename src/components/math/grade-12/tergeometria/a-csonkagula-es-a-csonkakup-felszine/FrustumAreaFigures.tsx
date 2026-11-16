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

/** A védőgallér: csonkakúp R, r, a, M jelölésekkel. */
export const FrustumAreaCollarSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={300} h={200} className={className ?? FIG_CLS}>
    <KT p={[150, 18]} t="Csonkakúp: alaplap + fedőlap + palást" s={11} c="#334155" />
    <KCone cx={140} yb={165} yt={62} Rs={95} rs={45} e={0.26} lab={{ R: 'R', r: 'r', a: 'a', M: 'M' }} />
    <KT p={[262, 120]} t="A = T + t + P" s={11} c={K_EDGE} />
  </KFig>
);

/** A csonkakúp hálója: két körlap és a körgyűrűcikk alakú palást. */
export const FrustumAreaNetSvg: React.FC<{ className?: string }> = ({ className }) => {
  const C: Pt = [130, 8];
  const P = (deg: number, rho: number): Pt => [C[0] + rho * Math.cos((deg * Math.PI) / 180), C[1] + rho * Math.sin((deg * Math.PI) / 180)];
  const RO = 175;
  const RI = 90;
  const o1 = P(55, RO);
  const o2 = P(125, RO);
  const i1 = P(55, RI);
  const i2 = P(125, RI);
  const d = `M ${kR(o1[0])} ${kR(o1[1])} A ${RO} ${RO} 0 0 1 ${kR(o2[0])} ${kR(o2[1])} L ${kR(i2[0])} ${kR(i2[1])} A ${RI} ${RI} 0 0 0 ${kR(i1[0])} ${kR(i1[1])} Z`;
  return (
    <KFig w={320} h={200} className={className ?? FIG_CLS}>
      <path d={d} fill="rgba(99,102,241,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
      <KL a={C} b={i1} c={K_HID} w={1} d />
      <KL a={C} b={i2} c={K_HID} w={1} d />
      <KT p={[130, 194]} t="2Rπ" s={11} />
      <KT p={[130, 88]} t="2rπ" s={11} />
      <KL a={P(90, RI)} b={P(90, RO)} c={K_AUX} w={1.4} />
      <KT p={[138, 140]} t="a" s={11} a="start" c={K_AUX} />
      <circle cx="280" cy="150" r="34" fill="rgba(99,102,241,0.10)" stroke={K_EDGE} strokeWidth="1.8" />
      <KL a={[280, 150]} b={[314, 150]} c={K_AUX} w={1.3} />
      <KT p={[296, 142]} t="R" s={10.5} />
      <circle cx="280" cy="62" r="17.5" fill="rgba(99,102,241,0.16)" stroke={K_EDGE} strokeWidth="1.8" />
      <KL a={[280, 62]} b={[297.5, 62]} c={K_AUX} w={1.3} />
      <KT p={[288, 54]} t="r" s={10.5} />
      <KT p={[32, 22]} t="P = (2Rπ + 2rπ)/2 · a" s={10} a="start" c="#334155" b={false} />
    </KFig>
  );
};

/** Antal terve: a 35 cm oldalú szabályos háromszög forgatásával kapott kúp tengelymetszete. */
export const FrustumAreaAntalSvg: React.FC<{ className?: string }> = ({ className }) => {
  const A: Pt = [50, 180];
  const B: Pt = [190, 180];
  const S: Pt = [120, 58.8];
  const k = 3 / 7;
  const U: Pt = [120 - 70 * k, 58.8 + 121.2 * k];
  const V: Pt = [120 + 70 * k, 58.8 + 121.2 * k];
  return (
    <KFig w={260} h={200} className={className ?? FIG_CLS}>
      <KPoly p={[A, B, V, U]} fill="rgba(99,102,241,0.16)" />
      <KPoly p={[U, V, S]} fill="rgba(5,150,105,0.12)" c={K_AUX} />
      <KL a={S} b={[120, 180]} c={K_HID} w={1.2} d />
      <KRight v={[120, 180]} p1={[120, 120]} p2={B} r={10} />
      <KT p={[120, 194]} t="35 cm" s={10.5} />
      <KT p={[162, 80]} t="15 cm" s={10.5} a="start" />
      <KT p={[182, 145]} t="20 cm" s={10.5} a="start" />
      <KT p={[136, 104]} t="7,5" s={10} c={K_AUX} />
      <KT p={[155, 172]} t="17,5" s={10} c={K_AUX} />
      <KT p={[32, 20]} t="Antal terve: kúpból kis kúpot vág le" s={10} a="start" c="#334155" b={false} />
    </KFig>
  );
};

/** Bandi terve: 35 cm sugarú félkörből kivágott 15 cm sugarú félkör. */
export const FrustumAreaBandiSvg: React.FC<{ className?: string }> = ({ className }) => {
  const C: Pt = [150, 34];
  const RO = 126;
  const RI = 54;
  const d = `M ${C[0] - RO} ${C[1]} A ${RO} ${RO} 0 0 0 ${C[0] + RO} ${C[1]} L ${C[0] + RI} ${C[1]} A ${RI} ${RI} 0 0 1 ${C[0] - RI} ${C[1]} Z`;
  return (
    <KFig w={300} h={190} className={className ?? FIG_CLS}>
      <path d={d} fill="rgba(99,102,241,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
      <path d={`M ${C[0] - RI} ${C[1]} A ${RI} ${RI} 0 0 0 ${C[0] + RI} ${C[1]}`} fill="none" stroke={K_HID} strokeWidth="1" strokeDasharray="4 3" />
      <KL a={C} b={[C[0] + RO * Math.cos(0.7), C[1] + RO * Math.sin(0.7)]} c={K_AUX} w={1.3} />
      <KT p={[218, 96]} t="35 cm" s={10.5} c={K_AUX} />
      <KL a={C} b={[C[0] - RI * Math.cos(0.9), C[1] + RI * Math.sin(0.9)]} c={K_ARC} w={1.3} />
      <KT p={[116, 50]} t="x" s={11} c="#b45309" />
      <KT p={[150, 174]} t="félkörív: 35π cm" s={10} />
      <KT p={[150, 100]} t="15π cm" s={10} />
      <circle cx={C[0]} cy={C[1]} r="2" fill={K_INK} />
    </KFig>
  );
};

/** Szabályos négyoldalú csonkagúla és egy oldallapja (2. feladat: a = 11, b = 5, m = 4). */
export const FrustumAreaSquareSvg: React.FC<{ className?: string }> = ({ className }) => {
  const A: Pt = [190, 150];
  const B: Pt = [300, 150];
  const C: Pt = [270, 110];
  const D: Pt = [220, 110];
  const F: Pt = [220, 150];
  return (
    <KFig w={320} h={180} className={className ?? FIG_CLS}>
      <KSq ox={22} oy={150} s={9.5} a={11} b={5} h={8} lab={{ a: 'a', b: 'b', mo: 'm', h: 'M', edge: 'él' }} />
      <KPoly p={[A, B, C, D]} fill="rgba(99,102,241,0.14)" />
      <KL a={D} b={F} c={K_ARC} w={1.4} d />
      <KRight v={F} p1={D} p2={B} r={9} />
      <KT p={[245, 164]} t="a = 11" s={10} />
      <KT p={[245, 101]} t="b = 5" s={10} />
      <KT p={[224, 131]} t="m = 4" s={10} a="start" c="#b45309" />
      <KT p={[205, 159]} t="3" s={10} c={K_AUX} />
      <KT p={[192, 124]} t="5" s={10} a="end" />
      <KT p={[245, 20]} t="oldallap: szimmetrikus trapéz" s={10} c="#334155" b={false} />
    </KFig>
  );
};

/** A palást mint trapéz analógiája: ívek számtani közepe · szélesség. */
export const FrustumAreaTrapezoidAnalogySvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={300} h={150} className={className ?? FIG_CLS}>
    <KPoly p={[[20, 120], [130, 120], [105, 50], [45, 50]]} fill="rgba(5,150,105,0.12)" c={K_AUX} />
    <KT p={[75, 134]} t="a" s={11} />
    <KT p={[75, 40]} t="c" s={11} />
    <KL a={[60, 50]} b={[60, 120]} c={K_ARC} w={1.3} d />
    <KRight v={[60, 120]} p1={[60, 50]} p2={[130, 120]} r={8} />
    <KT p={[66, 88]} t="m" s={11} a="start" c="#b45309" />
    <KT p={[75, 18]} t="T = (a + c)/2 · m" s={10.5} c="#334155" />
    <path d="M 160.7 123.4 A 100 100 0 0 1 289.3 123.4 L 263.6 154 A 60 60 0 0 0 186.4 154 Z" fill="rgba(99,102,241,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
    <KL a={[225, 100]} b={[225, 140]} c={K_AUX} w={1.3} />
    <KT p={[230, 122]} t="a" s={11} a="start" c={K_AUX} />
    <KT p={[225, 90]} t="2Rπ" s={10} />
    <KT p={[225, 18]} t="P = (2Rπ + 2rπ)/2 · a" s={10.5} c="#334155" />
    <KT p={[225, 146]} t="2rπ" s={10} />
  </KFig>
);
