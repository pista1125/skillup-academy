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

/** 1. feladat: kapu melletti gömb és forgáskúp (d = 4,2 dm, m = 5,4 dm). */
export const SolidsEverydayGateSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={320} h={200} className={className ?? FIG_CLS}>
    <rect x="30" y="150" width="90" height="22" fill="#e2e8f0" stroke="#94a3b8" />
    <circle cx="75" cy="105" r="45" fill="rgba(217,119,6,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
    <KEll cx={75} cy={105} rx={45} ry={12} hidden />
    <KL a={[30, 105]} b={[120, 105]} c={K_AUX} w={1.3} />
    <KT p={[75, 96]} t="d = 4,2 dm" s={10} c={K_AUX} />
    <rect x="190" y="150" width="100" height="22" fill="#e2e8f0" stroke="#94a3b8" />
    <KCone cx={240} yb={150} yt={34} Rs={45} rs={0} e={0.26} lab={{ M: 'm = 5,4' }} />
    <KL a={[195, 150]} b={[285, 150]} c={K_AUX} w={1.3} />
    <KT p={[240, 186]} t="d = 4,2 dm" s={10} c={K_AUX} />
    <KT p={[160, 20]} t="fenyőfa: ρ = 0,43 g/cm³" s={10} c="#334155" b={false} />
  </KFig>
);

/** 2. feladat: torta felülnézetben – négyzet + félkör, magassága 8 cm. */
export const SolidsEverydayCakeSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={320} h={190} className={className ?? FIG_CLS}>
    <rect x="50" y="35" width="130" height="130" fill="rgba(236,72,153,0.12)" stroke={K_EDGE} strokeWidth="1.8" />
    <path d="M 180 35 A 65 65 0 0 1 180 165" fill="rgba(236,72,153,0.18)" stroke={K_EDGE} strokeWidth="1.8" />
    <KL a={[180, 100]} b={[245, 100]} c={K_AUX} w={1.3} />
    <KT p={[212, 92]} t="10 cm" s={10} c={K_AUX} />
    <KT p={[115, 178]} t="20 cm" s={10.5} />
    <KT p={[36, 100]} t="20 cm" s={10.5} a="end" />
    <KT p={[115, 100]} t="hasáb" s={11} c="#be185d" />
    <KT p={[210, 140]} t="félhenger" s={10} c="#be185d" />
    <KT p={[160, 18]} t="felülnézet, a torta magassága 8 cm" s={10} c="#334155" b={false} />
  </KFig>
);

/** 3. feladat (érettségi 2007): négyzet alapú egyenes gúla alakú gyertya. */
export const SolidsEverydayCandleSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={280} h={200} className={className ?? FIG_CLS}>
    <KSq ox={60} oy={170} s={24} a={5} b={0} h={6.2} lab={{ a: '5 cm', h: 'M', edge: '8 cm', mo: 'mₒ' }} />
    <KT p={[230, 30]} t="V ≈ 60 cm³" s={10.5} c={K_EDGE} />
    <KT p={[230, 48]} t="A ≈ 101 cm²" s={10.5} c={K_EDGE} />
  </KFig>
);

/** 4. feladat: farsangi kalap – kúp és kiterített palástja (körcikk) téglalap alakú kartonon. */
export const SolidsEverydayHatSvg: React.FC<{ className?: string }> = ({ className }) => {
  const a = 40.91;
  const phi = 75.62;
  const sc = 3.4;
  const C: Pt = [230, 180];
  const P = (deg: number): Pt => [C[0] + a * sc * Math.cos(((-90 + deg) * Math.PI) / 180), C[1] + a * sc * Math.sin(((-90 + deg) * Math.PI) / 180)];
  const p1 = P(-phi / 2);
  const p2 = P(phi / 2);
  const w = 2 * a * sc * Math.sin(((phi / 2) * Math.PI) / 180);
  return (
    <KFig w={340} h={200} className={className ?? FIG_CLS}>
      <KCone cx={70} yb={165} yt={30} Rs={30} rs={0} e={0.28} lab={{ M: '40 cm' }} />
      <KT p={[70, 188]} t="kerület: 54 cm" s={10} />
      <rect x={kR(C[0] - w / 2)} y={kR(C[1] - a * sc)} width={kR(w)} height={kR(a * sc)} fill="none" stroke={K_HID} strokeDasharray="4 3" />
      <path
        d={`M ${kR(C[0])} ${kR(C[1])} L ${kR(p1[0])} ${kR(p1[1])} A ${kR(a * sc)} ${kR(a * sc)} 0 0 1 ${kR(p2[0])} ${kR(p2[1])} Z`}
        fill="rgba(217,119,6,0.16)"
        stroke={K_EDGE}
        strokeWidth="1.8"
      />
      <KAng v={C} p1={p1} p2={p2} r={22} t="φ" tr={34} />
      <KT p={[C[0] + 36, C[1] - 70]} t="a" s={11} c={K_AUX} />
      <KT p={[C[0], 18]} t="karton" s={9.5} c={K_HID} b={false} />
    </KFig>
  );
};

/** 5. feladat: kúpos fogaskerék csonkakúp-modellje, tengelymetszet 45°-os alkotóval. */
export const SolidsEverydayGearSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={300} h={180} className={className ?? FIG_CLS}>
    <KCone cx={80} yb={140} yt={70} Rs={60} rs={40} e={0.28} lab={{ R: '1,5', r: '1' }} />
    <KPoly p={[[170, 140], [290, 140], [270, 120], [190, 120]]} fill={K_FILL} />
    <KL a={[190, 120]} b={[190, 140]} c={K_ARC} w={1.3} d />
    <KRight v={[190, 140]} p1={[190, 120]} p2={[290, 140]} r={8} />
    <KAng v={[170, 140]} p1={[290, 140]} p2={[190, 120]} r={16} t="45°" tr={28} />
    <KT p={[230, 154]} t="3 cm" s={10} />
    <KT p={[230, 110]} t="2 cm" s={10} />
    <KT p={[180, 160]} t="0,5" s={9.5} c={K_AUX} />
    <KT p={[230, 30]} t="kopó felület ≈ 40% · P" s={10} c="#334155" b={false} />
  </KFig>
);

/** HF 4.: víztároló – félgömb + henger + kúp. */
export const SolidsEverydayTankSvg: React.FC<{ className?: string }> = ({ className }) => (
  <KFig w={260} h={220} className={className ?? FIG_CLS}>
    <path d="M 70 150 A 50 50 0 0 0 170 150" fill="rgba(14,165,233,0.14)" stroke={K_EDGE} strokeWidth="1.8" />
    <rect x="70" y="70" width="100" height="80" fill="rgba(14,165,233,0.10)" stroke="none" />
    <KL a={[70, 70]} b={[70, 150]} />
    <KL a={[170, 70]} b={[170, 150]} />
    <KEll cx={120} cy={150} rx={50} ry={12} hidden />
    <KEll cx={120} cy={70} rx={50} ry={12} hidden />
    <KL a={[70, 70]} b={[120, 25]} />
    <KL a={[170, 70]} b={[120, 25]} />
    <KL a={[120, 25]} b={[120, 70]} c={K_AUX} w={1.2} d />
    <KT p={[126, 48]} t="3 m" s={10} a="start" c={K_AUX} />
    <KL a={[190, 70]} b={[190, 150]} c={K_HID} w={1.2} />
    <KT p={[196, 110]} t="8 m" s={10} a="start" />
    <KL a={[70, 150]} b={[170, 150]} c={K_AUX} w={1.2} />
    <KT p={[120, 162]} t="d = 6 m" s={10} c={K_AUX} />
    <KT p={[120, 212]} t="félgömb + henger + kúp" s={10} c="#334155" b={false} />
  </KFig>
);
