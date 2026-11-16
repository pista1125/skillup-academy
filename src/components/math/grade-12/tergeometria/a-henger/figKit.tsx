import React from 'react';

/**
 * Belső rajzsegédek a lecke statikus ábráihoz és a kvízábrákhoz (nem exportáljuk az index.ts-ből).
 * Kavalier-vetület: x jobbra, y felfelé, z hátrafelé (a képen jobbra-fel ferdén rövidülve).
 * Derékszög jelölése: negyedkörív ponttal (magyar jelölés). Takart élek szaggatottak.
 */

export type P2 = [number, number];
export type P3 = [number, number, number];

export const K_INK = '#0f172a';
export const K_EDGE = '#334155';
export const K_HID = '#94a3b8';
export const K_RED = '#dc2626';
export const K_BLUE = '#2563eb';
export const K_GREEN = '#059669';
export const K_AMBER = '#d97706';
export const K_PURPLE = '#7c3aed';
export const K_FILL = '#e0e7ff';

export const kr = (n: number) => Math.round(n * 10) / 10;
export const kMid = (a: P2, b: P2): P2 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
export const kLerp = (a: P2, b: P2, t: number): P2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const kUnit = (p: P2): P2 => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};

/** Kavalier-vetítő: (ox, oy) a térbeli origó képe, s nagyítás, k a mélységi rövidülés, deg a mélységi tengely szöge. */
export const makeProj = (ox: number, oy: number, s = 1, k = 0.5, deg = 35) => {
  const c = Math.cos((deg * Math.PI) / 180) * k;
  const sn = Math.sin((deg * Math.PI) / 180) * k;
  const fn = (p: P3): P2 => [ox + s * (p[0] + c * p[2]), oy - s * (p[1] + sn * p[2])];
  (fn as any).dir = [-c, -sn, 1];
  return fn as ((p: P3) => P2) & { dir?: P3 };
};

export const KFig: React.FC<{ children: React.ReactNode; title?: string; w?: number; h?: number; className?: string }> = ({
  children,
  title,
  w = 240,
  h = 160,
  className = 'w-full max-w-[280px] h-auto mx-auto'
}) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {title && (
      <text x={w / 2} y="15" fontSize="10.5" fontWeight="bold" textAnchor="middle" fill="#334155">
        {title}
      </text>
    )}
    {children}
  </svg>
);

export const KLine: React.FC<{ a: P2; b: P2; c?: string; w?: number; dash?: boolean }> = ({ a, b, c = K_EDGE, w = 1.8, dash }) => (
  <line
    x1={kr(a[0])}
    y1={kr(a[1])}
    x2={kr(b[0])}
    y2={kr(b[1])}
    stroke={c}
    strokeWidth={dash ? Math.min(w, 1.3) : w}
    strokeDasharray={dash ? '4 3' : undefined}
    strokeLinecap="round"
  />
);

export const KText: React.FC<{ p: P2; t: string; s?: number; c?: string; a?: 'start' | 'middle' | 'end'; normal?: boolean }> = ({
  p,
  t,
  s = 11,
  c,
  a = 'middle',
  normal
}) => (
  <text
    x={kr(p[0])}
    y={kr(p[1])}
    fontSize={s}
    fontWeight={normal ? 'normal' : 'bold'}
    textAnchor={a}
    dominantBaseline="middle"
    fill={t.includes('?') ? K_RED : c ?? K_INK}
  >
    {t}
  </text>
);

export const KPoly: React.FC<{ p: P2[]; fill?: string; c?: string; w?: number; op?: number; dash?: boolean }> = ({
  p,
  fill = K_FILL,
  c = 'none',
  w = 1.5,
  op = 1,
  dash
}) => (
  <polygon
    points={p.map((q) => `${kr(q[0])},${kr(q[1])}`).join(' ')}
    fill={fill}
    fillOpacity={op}
    stroke={c}
    strokeWidth={w}
    strokeDasharray={dash ? '4 3' : undefined}
    strokeLinejoin="round"
  />
);

/** Derékszög: negyedkörív ponttal a v csúcsnál (p1, p2 a két szár egy-egy pontja). */
export const KRight: React.FC<{ v: P2; p1: P2; p2: P2; r?: number; c?: string }> = ({ v, p1, p2, r = 10, c = K_INK }) => {
  const u1 = kUnit([p1[0] - v[0], p1[1] - v[1]]);
  const u2 = kUnit([p2[0] - v[0], p2[1] - v[1]]);
  const s: P2 = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const e: P2 = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const b = kUnit([u1[0] + u2[0], u1[1] + u2[1]]);
  const d: P2 = [v[0] + b[0] * r * 0.55, v[1] + b[1] * r * 0.55];
  return (
    <g>
      <path d={`M ${kr(s[0])} ${kr(s[1])} A ${r} ${r} 0 0 ${sweep} ${kr(e[0])} ${kr(e[1])}`} fill="none" stroke={c} strokeWidth="1.2" />
      <circle cx={kr(d[0])} cy={kr(d[1])} r="1.7" fill={c} />
    </g>
  );
};

/** Szögív felirattal (nem derékszög). */
export const KAngle: React.FC<{ v: P2; p1: P2; p2: P2; t?: string; r?: number; tr?: number; c?: string }> = ({
  v,
  p1,
  p2,
  t,
  r = 14,
  tr,
  c = K_AMBER
}) => {
  const u1 = kUnit([p1[0] - v[0], p1[1] - v[1]]);
  const u2 = kUnit([p2[0] - v[0], p2[1] - v[1]]);
  const s: P2 = [v[0] + u1[0] * r, v[1] + u1[1] * r];
  const e: P2 = [v[0] + u2[0] * r, v[1] + u2[1] * r];
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const b = kUnit([u1[0] + u2[0], u1[1] + u2[1]]);
  const l: P2 = [v[0] + b[0] * (tr ?? r + 10), v[1] + b[1] * (tr ?? r + 10)];
  return (
    <g>
      <path d={`M ${kr(s[0])} ${kr(s[1])} A ${r} ${r} 0 0 ${sweep} ${kr(e[0])} ${kr(e[1])}`} fill="none" stroke={c} strokeWidth="1.5" />
      {t && <KText p={l} t={t} s={10} c="#b45309" />}
    </g>
  );
};

/** Szakasz felirata: a felezőpontból a g ponttól elfelé tolva. */
export const kSideLbl = (a: P2, b: P2, g: P2, off = 9): P2 => {
  const m = kMid(a, b);
  let n = kUnit([-(b[1] - a[1]), b[0] - a[0]]);
  if ((m[0] - g[0]) * n[0] + (m[1] - g[1]) * n[1] < 0) n = [-n[0], -n[1]];
  return [m[0] + n[0] * off, m[1] + n[1] * off];
};

const sub3 = (a: P3, b: P3): P3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross3 = (a: P3, b: P3): P3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot3 = (a: P3, b: P3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

/** Konvex poliéder kavalier-vetületben: a takart élek szaggatottak, a csúcsok feliratozhatók. */
export const KSolid: React.FC<{
  verts: P3[];
  faces: number[][];
  proj: ((p: P3) => P2) & { dir?: P3 };
  labels?: Record<number, string>;
  shade?: number[];
  c?: string;
  lblOff?: number;
}> = ({ verts, faces, proj, labels, shade, c = K_EDGE, lblOff = 10 }) => {
  const dir: P3 = proj.dir ?? [-0.41, -0.29, 1];
  const cen: P3 = verts.reduce<P3>((s, v) => [s[0] + v[0] / verts.length, s[1] + v[1] / verts.length, s[2] + v[2] / verts.length], [0, 0, 0]);
  const vis = faces.map((f) => {
    let n = cross3(sub3(verts[f[1]], verts[f[0]]), sub3(verts[f[2]], verts[f[0]]));
    const fc: P3 = f.reduce<P3>((s, i) => [s[0] + verts[i][0] / f.length, s[1] + verts[i][1] / f.length, s[2] + verts[i][2] / f.length], [0, 0, 0]);
    if (dot3(n, sub3(fc, cen)) < 0) n = [-n[0], -n[1], -n[2]];
    return dot3(n, dir) < -1e-9;
  });
  const edges = new Map<string, { a: number; b: number; visible: boolean }>();
  faces.forEach((f, fi) => {
    f.forEach((a, i) => {
      const b = f[(i + 1) % f.length];
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const prev = edges.get(key);
      edges.set(key, { a, b, visible: (prev?.visible ?? false) || vis[fi] });
    });
  });
  const P = verts.map(proj);
  const g2: P2 = proj(cen);
  return (
    <g>
      {shade?.map((fi) => (
        <KPoly key={`sh-${fi}`} p={faces[fi].map((i) => P[i])} fill={K_FILL} op={0.55} />
      ))}
      {[...edges.values()]
        .sort((x, y) => Number(x.visible) - Number(y.visible))
        .map((e, i) => (
          <KLine key={i} a={P[e.a]} b={P[e.b]} c={e.visible ? c : K_HID} dash={!e.visible} />
        ))}
      {labels &&
        Object.entries(labels).map(([i, t]) => {
          const p = P[Number(i)];
          const u = kUnit([p[0] - g2[0], p[1] - g2[1]]);
          return <KText key={`l-${i}`} p={[p[0] + u[0] * lblOff, p[1] + u[1] * lblOff]} t={t} s={10.5} />;
        })}
    </g>
  );
};

/** Téglatest csúcsai: A B C D alul (A bal elöl, B jobb elöl, C jobb hátul, D bal hátul), E F G H felettük. */
export const kBoxVerts = (a: number, b: number, c: number): P3[] => [
  [0, 0, 0], [a, 0, 0], [a, 0, b], [0, 0, b],
  [0, c, 0], [a, c, 0], [a, c, b], [0, c, b]
];
export const K_BOX_FACES = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]];
export const K_BOX_LABELS: Record<number, string> = { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H' };

/** Egyenes hasáb: alaplap az xz-síkban (base: [x, z] pontok), magasság h. Lapok: 0 alaplap, 1 fedőlap, majd oldallapok. */
export const kPrism = (base: [number, number][], h: number, shift: [number, number] = [0, 0]) => {
  const n = base.length;
  const verts: P3[] = [...base.map(([x, z]) => [x, 0, z] as P3), ...base.map(([x, z]) => [x + shift[0], h, z + shift[1]] as P3)];
  const faces: number[][] = [Array.from({ length: n }, (_, i) => i), Array.from({ length: n }, (_, i) => n + i)];
  for (let i = 0; i < n; i++) faces.push([i, (i + 1) % n, n + ((i + 1) % n), n + i]);
  return { verts, faces };
};

/** Szabályos n-szög az xz-síkban (r: köré írt kör sugara). */
export const kRegular = (n: number, r: number, phase = Math.PI / 2, cx = 0, cz = 0): [number, number][] =>
  Array.from({ length: n }, (_, i) => {
    const t = phase + (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(t), cz + r * Math.sin(t)] as [number, number];
  });

/** Álló henger képe: alsó ellipszis hátsó fele szaggatott. (cx, by) az alapkör középpontjának képe. */
export const KCyl: React.FC<{ cx: number; by: number; rx: number; ry?: number; h: number; c?: string; fill?: string; axis?: boolean }> = ({
  cx,
  by,
  rx,
  ry = rx * 0.32,
  h,
  c = K_EDGE,
  fill = 'rgba(224,231,255,0.55)',
  axis
}) => {
  const ty = by - h;
  return (
    <g>
      <path
        d={`M ${kr(cx - rx)} ${kr(ty)} L ${kr(cx - rx)} ${kr(by)} A ${kr(rx)} ${kr(ry)} 0 0 0 ${kr(cx + rx)} ${kr(by)} L ${kr(cx + rx)} ${kr(ty)} Z`}
        fill={fill}
        stroke="none"
      />
      <path d={`M ${kr(cx - rx)} ${kr(by)} A ${kr(rx)} ${kr(ry)} 0 0 1 ${kr(cx + rx)} ${kr(by)}`} fill="none" stroke={K_HID} strokeWidth="1.2" strokeDasharray="4 3" />
      <path d={`M ${kr(cx - rx)} ${kr(by)} A ${kr(rx)} ${kr(ry)} 0 0 0 ${kr(cx + rx)} ${kr(by)}`} fill="none" stroke={c} strokeWidth="1.8" />
      <ellipse cx={kr(cx)} cy={kr(ty)} rx={kr(rx)} ry={kr(ry)} fill="rgba(199,210,254,0.6)" stroke={c} strokeWidth="1.8" />
      <KLine a={[cx - rx, ty]} b={[cx - rx, by]} c={c} />
      <KLine a={[cx + rx, ty]} b={[cx + rx, by]} c={c} />
      {axis && <KLine a={[cx, ty - 10]} b={[cx, by + 10]} c={K_PURPLE} w={1.2} dash />}
      <circle cx={kr(cx)} cy={kr(by)} r="1.8" fill={c} />
      <circle cx={kr(cx)} cy={kr(ty)} r="1.8" fill={c} />
    </g>
  );
};

/** Automatikusan méretezett kvízábra egy konvex poliéderhez (240 × 160-as keret). */
export const KSolidFig: React.FC<{
  verts: P3[];
  faces: number[][];
  title?: string;
  labels?: Record<number, string>;
  shade?: number[];
  k?: number;
  deg?: number;
  pad?: number;
  extra?: (P: P2[], pr: (p: P3) => P2) => React.ReactNode;
}> = ({ verts, faces, title, labels, shade, k = 0.55, deg = 35, pad = 0, extra }) => {
  const p0 = makeProj(0, 0, 1, k, deg);
  const q = verts.map(p0);
  const minX = Math.min(...q.map((p) => p[0]));
  const maxX = Math.max(...q.map((p) => p[0]));
  const minY = Math.min(...q.map((p) => p[1]));
  const maxY = Math.max(...q.map((p) => p[1]));
  const s = Math.min((176 - pad) / (maxX - minX || 1), ((title ? 104 : 114) - pad) / (maxY - minY || 1));
  const ox = 120 - (s * (minX + maxX)) / 2;
  const oy = (title ? 90 : 82) - (s * (minY + maxY)) / 2;
  const pr = makeProj(ox, oy, s, k, deg);
  const P = verts.map(pr);
  return (
    <KFig title={title}>
      <KSolid verts={verts} faces={faces} proj={pr} labels={labels} shade={shade} />
      {extra && extra(P, pr)}
    </KFig>
  );
};
