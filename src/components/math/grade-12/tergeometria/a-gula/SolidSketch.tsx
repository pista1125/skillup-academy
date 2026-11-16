import React from 'react';

/**
 * Kis SVG-rajzkészlet a gúla / kúp / csonka test leckék statikus ábráihoz és kvízábráihoz
 * (12. osztály, térgeometria, 10–14. lecke).
 * - Poliéderek: ferde (kavalier) vetítés, a takart élek szaggatottak (lapnormálisok alapján).
 * - Forgástestek: az alapkör ellipszis, a hátsó félív szaggatott.
 * - Derékszög: negyedkörív ponttal (magyar jelölés).
 */

export type P2 = [number, number];
export type P3 = [number, number, number];

export const SK = {
  ink: '#0f172a',
  line: '#4338ca',
  fill: '#e0e7ff',
  face: 'rgba(99,102,241,0.10)',
  unk: '#dc2626',
  aux: '#64748b',
  arc: '#d97706',
  ang: '#b45309',
  red: '#dc2626',
  green: '#059669',
  blue: '#2563eb',
  purple: '#7c3aed'
};

const rd = (n: number) => Math.round(n * 10) / 10;
export const sub2 = (p: P2, q: P2): P2 => [p[0] - q[0], p[1] - q[1]];
export const unit2 = (p: P2): P2 => {
  const l = Math.hypot(p[0], p[1]) || 1;
  return [p[0] / l, p[1] / l];
};
export const at2 = (v: P2, u: P2, r: number): P2 => [v[0] + u[0] * r, v[1] + u[1] * r];
export const mid2 = (a: P2, b: P2): P2 => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
export const lerp2 = (a: P2, b: P2, t: number): P2 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
/** A p ponttól a g ponttól elfelé d távolságra. */
export const away2 = (p: P2, g: P2, d: number): P2 => at2(p, unit2(sub2(p, g)), d);

/** Keret a kvízábrákhoz (alapértelmezés 240 × 160). */
export const QFig: React.FC<{ children: React.ReactNode; title?: string; w?: number; h?: number; className?: string }> = ({
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

export const Txt: React.FC<{
  p: P2;
  t: string;
  size?: number;
  color?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: 'bold' | 'normal';
}> = ({ p, t, size = 11, color, anchor = 'middle', weight = 'bold' }) => (
  <text
    x={rd(p[0])}
    y={rd(p[1])}
    fontSize={size}
    fontWeight={weight}
    textAnchor={anchor}
    dominantBaseline="middle"
    fill={t.includes('?') ? SK.unk : color ?? SK.ink}
  >
    {t}
  </text>
);

export const Seg: React.FC<{ a: P2; b: P2; color?: string; w?: number; dash?: boolean }> = ({ a, b, color = SK.line, w = 1.8, dash }) => (
  <line
    x1={rd(a[0])}
    y1={rd(a[1])}
    x2={rd(b[0])}
    y2={rd(b[1])}
    stroke={color}
    strokeWidth={w}
    strokeDasharray={dash ? '4 3' : undefined}
    strokeLinecap="round"
  />
);

export const Poly: React.FC<{ p: P2[]; fill?: string; color?: string; w?: number; dash?: boolean }> = ({
  p,
  fill = SK.fill,
  color = SK.line,
  w = 1.8,
  dash
}) => (
  <polygon
    points={p.map((q) => `${rd(q[0])},${rd(q[1])}`).join(' ')}
    fill={fill}
    stroke={color}
    strokeWidth={w}
    strokeLinejoin="round"
    strokeDasharray={dash ? '4 3' : undefined}
  />
);

export const Dot: React.FC<{ p: P2; color?: string; r?: number }> = ({ p, color = SK.ink, r = 2.2 }) => (
  <circle cx={rd(p[0])} cy={rd(p[1])} r={r} fill={color} />
);

/** Derékszög: negyedkörív ponttal a v csúcsnál (p1, p2 irányok között). */
export const RightMark: React.FC<{ v: P2; p1: P2; p2: P2; r?: number; color?: string }> = ({ v, p1, p2, r = 11, color = SK.ink }) => {
  const u1 = unit2(sub2(p1, v));
  const u2 = unit2(sub2(p2, v));
  const s = at2(v, u1, r);
  const e = at2(v, u2, r);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const d = at2(v, unit2([u1[0] + u2[0], u1[1] + u2[1]]), r * 0.55);
  return (
    <g>
      <path d={`M ${rd(s[0])} ${rd(s[1])} A ${r} ${r} 0 0 ${sweep} ${rd(e[0])} ${rd(e[1])}`} fill="none" stroke={color} strokeWidth="1.3" />
      <circle cx={rd(d[0])} cy={rd(d[1])} r="1.7" fill={color} />
    </g>
  );
};

/** Szögív a v csúcsnál, felirattal a szögfelezőn. */
export const AngleArc: React.FC<{ v: P2; p1: P2; p2: P2; t?: string; r?: number; tr?: number; color?: string }> = ({
  v,
  p1,
  p2,
  t,
  r = 15,
  tr,
  color = SK.arc
}) => {
  const u1 = unit2(sub2(p1, v));
  const u2 = unit2(sub2(p2, v));
  const s = at2(v, u1, r);
  const e = at2(v, u2, r);
  const sweep = u1[0] * u2[1] - u1[1] * u2[0] > 0 ? 1 : 0;
  const l = at2(v, unit2([u1[0] + u2[0], u1[1] + u2[1]]), tr ?? r + 10);
  return (
    <g>
      <path d={`M ${rd(s[0])} ${rd(s[1])} A ${r} ${r} 0 0 ${sweep} ${rd(e[0])} ${rd(e[1])}`} fill="none" stroke={color} strokeWidth="1.6" />
      {t && <Txt p={l} t={t} size={10.5} color={SK.ang} />}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* Poliéderek ferde vetítésben                                         */
/* ------------------------------------------------------------------ */

const OBL_K = 0.5;
const OBL_C = Math.cos((35 * Math.PI) / 180);
const OBL_S = Math.sin((35 * Math.PI) / 180);
const raw = (p: P3): P2 => [p[0] + OBL_K * OBL_C * p[2], p[1] + OBL_K * OBL_S * p[2]];

export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface PolyGeom {
  /** 3D pont → képpont. */
  P: (p: P3) => P2;
  pts: P2[];
  center2: P2;
  edges: { a: number; b: number; hidden: boolean }[];
  visibleFaces: number[][];
}

/** Konvex poliéder vetítése a megadott dobozba (x jobbra, y fel, z a mélység). */
export const polyhedron = (verts: P3[], faces: number[][], box: Box, fitExtra: P3[] = []): PolyGeom => {
  const all = [...verts, ...fitExtra].map(raw);
  const minX = Math.min(...all.map((p) => p[0]));
  const maxX = Math.max(...all.map((p) => p[0]));
  const minY = Math.min(...all.map((p) => p[1]));
  const maxY = Math.max(...all.map((p) => p[1]));
  const s = Math.min(box.w / Math.max(maxX - minX, 1e-6), box.h / Math.max(maxY - minY, 1e-6));
  const ox = box.x + (box.w - (maxX - minX) * s) / 2 - minX * s;
  const oy = box.y + box.h - (box.h - (maxY - minY) * s) / 2 + minY * s;
  const P = (p: P3): P2 => {
    const q = raw(p);
    return [ox + q[0] * s, oy - q[1] * s];
  };
  const pts = verts.map(P);
  const c3: P3 = verts.reduce<P3>((a, v) => [a[0] + v[0] / verts.length, a[1] + v[1] / verts.length, a[2] + v[2] / verts.length], [0, 0, 0]);
  const view: P3 = [OBL_K * OBL_C, OBL_K * OBL_S, -1];
  const vis = new Map<string, boolean>();
  const visibleFaces: number[][] = [];
  for (const f of faces) {
    const [a, b, c] = [verts[f[0]], verts[f[1]], verts[f[2]]];
    const u: P3 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const w: P3 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    let n: P3 = [u[1] * w[2] - u[2] * w[1], u[2] * w[0] - u[0] * w[2], u[0] * w[1] - u[1] * w[0]];
    const fc = f.reduce<P3>((acc, i) => [acc[0] + verts[i][0] / f.length, acc[1] + verts[i][1] / f.length, acc[2] + verts[i][2] / f.length], [0, 0, 0]);
    if (n[0] * (fc[0] - c3[0]) + n[1] * (fc[1] - c3[1]) + n[2] * (fc[2] - c3[2]) < 0) n = [-n[0], -n[1], -n[2]];
    const front = n[0] * view[0] + n[1] * view[1] + n[2] * view[2] > 1e-9;
    if (front) visibleFaces.push(f);
    for (let i = 0; i < f.length; i++) {
      const x = f[i];
      const y = f[(i + 1) % f.length];
      const key = x < y ? `${x}-${y}` : `${y}-${x}`;
      vis.set(key, (vis.get(key) ?? false) || front);
    }
  }
  const edges = [...vis.entries()].map(([k, v]) => {
    const [a, b] = k.split('-').map(Number);
    return { a, b, hidden: !v };
  });
  return { P, pts, center2: P(c3), edges, visibleFaces };
};

export const PolyBody: React.FC<{ g: PolyGeom; color?: string; fill?: string; w?: number; noFill?: boolean }> = ({
  g,
  color = SK.line,
  fill = SK.face,
  w = 1.8,
  noFill
}) => (
  <g>
    {!noFill &&
      g.visibleFaces.map((f, i) => (
        <polygon key={`f${i}`} points={f.map((j) => `${rd(g.pts[j][0])},${rd(g.pts[j][1])}`).join(' ')} fill={fill} stroke="none" />
      ))}
    {g.edges.map((e, i) => (
      <Seg key={i} a={g.pts[e.a]} b={g.pts[e.b]} color={e.hidden ? SK.aux : color} w={e.hidden ? 1.2 : w} dash={e.hidden} />
    ))}
  </g>
);

/** Szabályos n-szög az y magasságú vízszintes síkban (R: köré írt kör sugara). */
export const ringN = (n: number, R: number, y = 0, phase = -Math.PI / 2 - Math.PI / n): P3[] =>
  Array.from({ length: n }, (_, i) => {
    const t = phase + (2 * Math.PI * i) / n;
    return [R * Math.cos(t), y, R * Math.sin(t)] as P3;
  });

/** Szabályos n-oldalú gúla: csúcsok 0..n−1 az alapon, n a gúla csúcsa. */
export const pyramidSolid = (n: number, R: number, M: number, base?: P3[], apex?: P3): { verts: P3[]; faces: number[][] } => {
  const b = base ?? ringN(n, R);
  const verts: P3[] = [...b, apex ?? [0, M, 0]];
  const faces: number[][] = [b.map((_, i) => i)];
  for (let i = 0; i < b.length; i++) faces.push([i, (i + 1) % b.length, b.length]);
  return { verts, faces };
};

/** Szabályos n-oldalú csonkagúla: 0..n−1 alap, n..2n−1 fedőlap. */
export const frustumSolid = (n: number, R: number, r: number, M: number): { verts: P3[]; faces: number[][] } => {
  const verts: P3[] = [...ringN(n, R), ...ringN(n, r, M)];
  const faces: number[][] = [Array.from({ length: n }, (_, i) => i), Array.from({ length: n }, (_, i) => n + i)];
  for (let i = 0; i < n; i++) faces.push([i, (i + 1) % n, n + ((i + 1) % n), n + i]);
  return { verts, faces };
};

/* ------------------------------------------------------------------ */
/* Forgástestek (kúp, csonkakúp, henger)                               */
/* ------------------------------------------------------------------ */

export interface RoundGeom {
  /** alapkör középpontja */
  B: P2;
  /** fedőkör középpontja / kúpcsúcs */
  T: P2;
  BL: P2;
  BR: P2;
  TL: P2;
  TR: P2;
  rxB: number;
  ryB: number;
  rxT: number;
  ryT: number;
  /** pont az alapkör ellipszisén (szög fokban, 0 = jobbra, 90 = elöl/lent) */
  onBase: (deg: number) => P2;
}

/** Forgástest elhelyezése a dobozban: R alsó sugár, r felső sugár (kúpnál 0), M magasság. */
export const roundSolid = (R: number, r: number, M: number, box: Box, flat = 0.32): RoundGeom => {
  const wMax = 2 * Math.max(R, r);
  const hTot = M + Math.max(R, r) * flat * 2;
  const s = Math.min(box.w / wMax, box.h / hTot);
  const cx = box.x + box.w / 2;
  const ryB = R * s * flat;
  const ryT = r * s * flat;
  const usedH = M * s + ryB + ryT;
  const yB = box.y + box.h - (box.h - usedH) / 2 - ryB;
  const yT = yB - M * s;
  const rxB = R * s;
  const rxT = r * s;
  return {
    B: [cx, yB],
    T: [cx, yT],
    BL: [cx - rxB, yB],
    BR: [cx + rxB, yB],
    TL: [cx - rxT, yT],
    TR: [cx + rxT, yT],
    rxB,
    ryB,
    rxT,
    ryT,
    onBase: (deg: number) => [cx + rxB * Math.cos((deg * Math.PI) / 180), yB + ryB * Math.sin((deg * Math.PI) / 180)]
  };
};

export const RoundBody: React.FC<{ g: RoundGeom; color?: string; fill?: string; w?: number }> = ({
  g,
  color = SK.line,
  fill = SK.face,
  w = 1.8
}) => {
  const { BL, BR, TL, TR, rxB, ryB, rxT, ryT } = g;
  const hasTop = rxT > 0.5;
  const outline = hasTop
    ? `M ${rd(BL[0])} ${rd(BL[1])} L ${rd(TL[0])} ${rd(TL[1])} A ${rd(rxT)} ${rd(ryT)} 0 0 1 ${rd(TR[0])} ${rd(TR[1])} L ${rd(BR[0])} ${rd(BR[1])} A ${rd(rxB)} ${rd(ryB)} 0 0 1 ${rd(BL[0])} ${rd(BL[1])} Z`
    : `M ${rd(BL[0])} ${rd(BL[1])} L ${rd(g.T[0])} ${rd(g.T[1])} L ${rd(BR[0])} ${rd(BR[1])} A ${rd(rxB)} ${rd(ryB)} 0 0 1 ${rd(BL[0])} ${rd(BL[1])} Z`;
  return (
    <g>
      <path d={outline} fill={fill} stroke="none" />
      {/* hátsó félív szaggatott */}
      <path d={`M ${rd(BL[0])} ${rd(BL[1])} A ${rd(rxB)} ${rd(ryB)} 0 0 1 ${rd(BR[0])} ${rd(BR[1])}`} fill="none" stroke={SK.aux} strokeWidth="1.2" strokeDasharray="4 3" />
      <path d={`M ${rd(BL[0])} ${rd(BL[1])} A ${rd(rxB)} ${rd(ryB)} 0 0 0 ${rd(BR[0])} ${rd(BR[1])}`} fill="none" stroke={color} strokeWidth={w} />
      {hasTop ? (
        <>
          <ellipse cx={rd(g.T[0])} cy={rd(g.T[1])} rx={rd(rxT)} ry={rd(ryT)} fill="rgba(255,255,255,0.35)" stroke={color} strokeWidth={w} />
          <Seg a={BL} b={TL} color={color} w={w} />
          <Seg a={BR} b={TR} color={color} w={w} />
        </>
      ) : (
        <>
          <Seg a={BL} b={g.T} color={color} w={w} />
          <Seg a={BR} b={g.T} color={color} w={w} />
        </>
      )}
    </g>
  );
};

/* ------------------------------------------------------------------ */
/* Kvízábra: szabályos gúla                                            */
/* ------------------------------------------------------------------ */

export interface PyrLabels {
  edge?: string;
  M?: string;
  mo?: string;
  b?: string;
  beta?: string;
  alpha?: string;
  R?: string;
  rho?: string;
}

/** Szabályos n oldalú gúla kvízábra: M, mₒ (jobb oldali lap), b (bal első oldalél), α, β, ρ, R feliratokkal. */
export const PyrQ: React.FC<{ n: number; h?: number; l: PyrLabels; title?: string }> = ({ n, h = 1.3, l, title }) => {
  const s = pyramidSolid(n, 1, Math.max(h, 0.85));
  const g = polyhedron(s.verts, s.faces, { x: 40, y: title ? 26 : 14, w: 160, h: title ? 108 : 118 });
  const apex = g.pts[n];
  const O = g.P([0, 0, 0]);
  const v0 = g.pts[0];
  const v1 = g.pts[1];
  const v2 = g.pts[2];
  const front = mid2(v0, v1);
  const mE = mid2(v1, v2);
  const showMo = l.mo !== undefined || l.beta !== undefined || l.rho !== undefined;
  const showB = l.b !== undefined || l.alpha !== undefined || l.R !== undefined;
  const mLeft = !showB;
  return (
    <QFig title={title}>
      <PolyBody g={g} />
      {l.M !== undefined && <Seg a={apex} b={O} color={SK.red} dash w={1.5} />}
      {l.M !== undefined && (
        <Txt p={[O[0] + (mLeft ? -5 : 5), apex[1] + (O[1] - apex[1]) * 0.42]} t={l.M} anchor={mLeft ? 'end' : 'start'} color={SK.red} size={10.5} />
      )}
      {showMo && (
        <>
          <Seg a={apex} b={mE} color={SK.blue} w={1.8} />
          <Seg a={O} b={mE} color={SK.aux} dash w={1.2} />
          {l.M !== undefined && <RightMark v={O} p1={apex} p2={mE} r={8} />}
          {l.mo && <Txt p={[(apex[0] + mE[0]) / 2 + 7, (apex[1] + mE[1]) / 2 - 3]} t={l.mo} anchor="start" color={SK.blue} size={10.5} />}
          {l.rho && <Txt p={[(O[0] + mE[0]) / 2, (O[1] + mE[1]) / 2 - 6]} t={l.rho} size={9.5} color={SK.aux} />}
          {l.beta !== undefined && <AngleArc v={mE} p1={O} p2={apex} t={l.beta} r={12} tr={22} />}
        </>
      )}
      {showB && (
        <>
          <Seg a={apex} b={v0} color={SK.green} w={2.2} />
          <Seg a={O} b={v0} color={SK.aux} dash w={1.2} />
          {l.M !== undefined && <RightMark v={O} p1={apex} p2={v0} r={8} />}
          {l.b && <Txt p={[(apex[0] + v0[0]) / 2 - 8, (apex[1] + v0[1]) / 2 - 2]} t={l.b} anchor="end" color={SK.green} size={10.5} />}
          {l.R && <Txt p={[(O[0] + v0[0]) / 2 + 4, (O[1] + v0[1]) / 2 - 7]} t={l.R} size={9.5} color={SK.aux} />}
          {l.alpha !== undefined && <AngleArc v={v0} p1={O} p2={apex} t={l.alpha} r={13} tr={24} />}
        </>
      )}
      {l.edge && <Txt p={[front[0], front[1] + 11]} t={l.edge} size={10.5} />}
    </QFig>
  );
};


/* ------------------------------------------------------------------ */
/* Kvízábra: forgáskúp / csonkakúp                                     */
/* ------------------------------------------------------------------ */

export interface RoundLabels {
  /** alapkör sugara */
  R?: string;
  /** fedőkör sugara (csonkakúp) */
  r?: string;
  M?: string;
  /** alkotó */
  a?: string;
  /** nyílásszög (kúp) */
  phi?: string;
  /** alkotó és alaplap szöge */
  base?: string;
}

/** Forgáskúp (rTop = 0) vagy csonkakúp kvízábra, a jobb oldali alkotóval és a tengelymetszet felével. */
export const RoundQ: React.FC<{ R: number; rTop?: number; M: number; l: RoundLabels; title?: string; w?: number; h?: number }> = ({
  R,
  rTop = 0,
  M,
  l,
  title,
  w = 240,
  h = 160
}) => {
  const g = roundSolid(R, rTop, M, { x: 40, y: title ? 26 : 14, w: w - 80, h: h - (title ? 40 : 28) });
  const top: P2 = rTop > 0 ? g.TR : g.T;
  return (
    <QFig title={title} w={w} h={h}>
      <RoundBody g={g} />
      {l.M !== undefined && (
        <>
          <Seg a={g.T} b={g.B} color={SK.red} dash w={1.5} />
          <Txt p={[g.B[0] - 5, (g.T[1] + g.B[1]) / 2]} t={l.M} anchor="end" color={SK.red} size={10.5} />
        </>
      )}
      {(l.R !== undefined || l.M !== undefined) && <Seg a={g.B} b={g.BR} color={SK.aux} w={1.4} />}
      {l.M !== undefined && <RightMark v={g.B} p1={g.T} p2={g.BR} r={8} />}
      {l.R && <Txt p={[(g.B[0] + g.BR[0]) / 2, g.B[1] + 10]} t={l.R} size={10.5} />}
      {rTop > 0 && l.r !== undefined && (
        <>
          <Seg a={g.T} b={g.TR} color={SK.aux} w={1.4} />
          <Txt p={[(g.T[0] + g.TR[0]) / 2, g.T[1] - 8]} t={l.r} size={10.5} />
        </>
      )}
      {l.a !== undefined && (
        <>
          <Seg a={top} b={g.BR} color={SK.green} w={2.4} />
          <Txt p={[(top[0] + g.BR[0]) / 2 + 8, (top[1] + g.BR[1]) / 2 - 3]} t={l.a} anchor="start" color={SK.green} size={10.5} />
        </>
      )}
      {l.phi !== undefined && rTop === 0 && <AngleArc v={g.T} p1={g.BL} p2={g.BR} t={l.phi} r={16} tr={28} />}
      {l.base !== undefined && <AngleArc v={g.BR} p1={g.B} p2={top} t={l.base} r={13} tr={24} />}
    </QFig>
  );
};

/** Körcikk (kiterített kúppalást): középpont c, sugár R (px), kezdőszög és középponti szög fokban. */
export const sectorPath = (c: P2, R: number, startDeg: number, angDeg: number): string => {
  const a0 = (startDeg * Math.PI) / 180;
  const a1 = ((startDeg + angDeg) * Math.PI) / 180;
  const p0: P2 = [c[0] + R * Math.cos(a0), c[1] - R * Math.sin(a0)];
  const p1: P2 = [c[0] + R * Math.cos(a1), c[1] - R * Math.sin(a1)];
  const large = angDeg > 180 ? 1 : 0;
  return `M ${rd(c[0])} ${rd(c[1])} L ${rd(p0[0])} ${rd(p0[1])} A ${rd(R)} ${rd(R)} 0 ${large} 0 ${rd(p1[0])} ${rd(p1[1])} Z`;
};

export const polar = (c: P2, R: number, deg: number): P2 => [c[0] + R * Math.cos((deg * Math.PI) / 180), c[1] - R * Math.sin((deg * Math.PI) / 180)];

/** Magyar formátum: tizedesvessző. */
export const hu = (x: number, d = 2): string => (Number.isFinite(x) ? x.toFixed(d).replace('.', ',') : '–');
