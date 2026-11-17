import React from 'react';

// ---------------------------------------------------------------------------
// X. Testek, síkidomok – közös testrajzok (3. osztály)
// Ferde (kavalier jellegű) vetület: x jobbra, y fölfelé, z befelé (jobbra-fölfelé látszik).
// A takart élek SZAGGATOTTAK. A lapos testeket egy általános konvex-test rajzoló készíti
// (a látható lapokat a lap normálisa dönti el), a görbe testeket külön rajzok.
// ---------------------------------------------------------------------------
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const INK = '#1e293b';
export const UNK = '#dc2626';

export const KX = 0.42;
export const KY = 0.32;

export type V3 = [number, number, number];

/** Képernyőpont (ox, oy = az origó helye a rajzon, u = egység). */
export const proj = (p: V3, ox: number, oy: number, u: number): [number, number] => [ox + u * (p[0] + KX * p[2]), oy - u * (p[1] + KY * p[2])];

const hex = (c: string) => {
  const h = c.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
};
/** Szín keverése fehérrel (t > 0) vagy feketével (t < 0). */
export const shade = (c: string, t: number) => {
  const [r, g, b] = hex(c);
  const f = (v: number) => Math.round(t >= 0 ? v + (255 - v) * t : v * (1 + t));
  return `#${[f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
};

const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: V3, b: V3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const VIEW: V3 = [KX, KY, -1];
const LIGHT: V3 = [0.35, 0.8, -0.5];

/** Lap kifelé mutató normálisa (Newell-módszer, a test középpontjához igazítva). */
const faceNormal = (verts: V3[], f: number[], center: V3): V3 => {
  let n: V3 = [0, 0, 0];
  for (let i = 0; i < f.length; i++) {
    const a = verts[f[i]];
    const b = verts[f[(i + 1) % f.length]];
    n = [n[0] + (a[1] - b[1]) * (a[2] + b[2]), n[1] + (a[2] - b[2]) * (a[0] + b[0]), n[2] + (a[0] - b[0]) * (a[1] + b[1])];
  }
  const fc = f.reduce<V3>((s, i) => [s[0] + verts[i][0] / f.length, s[1] + verts[i][1] / f.length, s[2] + verts[i][2] / f.length], [0, 0, 0]);
  if (dot(n, sub(fc, center)) < 0) n = [-n[0], -n[1], -n[2]];
  const len = Math.hypot(n[0], n[1], n[2]) || 1;
  return [n[0] / len, n[1] / len, n[2] / len];
};

export interface PolySolidProps {
  verts: V3[];
  faces: number[][];
  ox: number;
  oy: number;
  u: number;
  color: string;
  sw?: number;
  /** Lapszínek felülírása (lap index → szín). */
  faceFill?: (i: number) => string | undefined;
  onFaceClick?: (i: number) => void;
  /** Takart élek rajzolása (szaggatott). */
  hidden?: boolean;
}

/** Általános konvex test: lapok, látható élek folytonos, takart élek szaggatott vonallal. */
export const PolySolid: React.FC<PolySolidProps> = ({ verts, faces, ox, oy, u, color, sw = 2, faceFill, onFaceClick, hidden = true }) => {
  const center = verts.reduce<V3>((s, v) => [s[0] + v[0] / verts.length, s[1] + v[1] / verts.length, s[2] + v[2] / verts.length], [0, 0, 0]);
  const normals = faces.map((f) => faceNormal(verts, f, center));
  const vis = normals.map((n) => dot(n, VIEW) > 1e-6);
  const P = verts.map((v) => proj(v, ox, oy, u));
  const edges = new Map<string, { a: number; b: number; visible: boolean }>();
  faces.forEach((f, fi) => {
    f.forEach((a, k) => {
      const b = f[(k + 1) % f.length];
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      const e = edges.get(key);
      if (e) e.visible = e.visible || vis[fi];
      else edges.set(key, { a, b, visible: vis[fi] });
    });
  });
  const pts = (f: number[]) => f.map((i) => `${P[i][0].toFixed(1)},${P[i][1].toFixed(1)}`).join(' ');
  const lightLen = Math.hypot(...LIGHT);
  return (
    <g>
      {faces.map((f, fi) => {
        if (!vis[fi]) return null;
        const t = dot(normals[fi], LIGHT) / lightLen;
        const fill = faceFill?.(fi) ?? shade(color, Math.max(-0.1, 0.75 * t - 0.05));
        return (
          <polygon
            key={`f${fi}`}
            points={pts(f)}
            fill={fill}
            stroke="none"
            onClick={onFaceClick ? () => onFaceClick(fi) : undefined}
            style={onFaceClick ? { cursor: 'pointer' } : undefined}
          />
        );
      })}
      {hidden &&
        [...edges.values()]
          .filter((e) => !e.visible)
          .map((e, i) => (
            <line key={`h${i}`} x1={P[e.a][0]} y1={P[e.a][1]} x2={P[e.b][0]} y2={P[e.b][1]} stroke={INK} strokeWidth={Math.max(1, sw * 0.6)} strokeDasharray={`${sw * 2.2} ${sw * 1.8}`} opacity={0.75} />
          ))}
      {[...edges.values()]
        .filter((e) => e.visible)
        .map((e, i) => (
          <line key={`v${i}`} x1={P[e.a][0]} y1={P[e.a][1]} x2={P[e.b][0]} y2={P[e.b][1]} stroke={INK} strokeWidth={sw} strokeLinecap="round" />
        ))}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Lapos testek csúcsai és lapjai
// ---------------------------------------------------------------------------
export const boxGeom = (w: number, h: number, d: number): { verts: V3[]; faces: number[][] } => ({
  verts: [
    [0, 0, 0],
    [w, 0, 0],
    [w, h, 0],
    [0, h, 0],
    [0, 0, d],
    [w, 0, d],
    [w, h, d],
    [0, h, d]
  ],
  faces: [
    [0, 1, 2, 3], // elöl
    [4, 5, 6, 7], // hátul
    [0, 1, 5, 4], // alul
    [3, 2, 6, 7], // fölül
    [0, 3, 7, 4], // bal
    [1, 2, 6, 5] // jobb
  ]
});

/** Négyzet alapú „piramis”. */
export const pyramid4Geom = (w: number, h: number): { verts: V3[]; faces: number[][] } => ({
  verts: [
    [0, 0, 0],
    [w, 0, 0],
    [w, 0, w],
    [0, 0, w],
    [w / 2, h, w / 2]
  ],
  faces: [
    [0, 1, 2, 3],
    [0, 1, 4],
    [1, 2, 4],
    [2, 3, 4],
    [3, 0, 4]
  ]
});

/** Háromszög alapú „piramis” (csak háromszögek határolják). */
export const pyramid3Geom = (w: number, h: number): { verts: V3[]; faces: number[][] } => ({
  verts: [
    [0, 0, 0.1 * w],
    [0.75 * w, 0, 0],
    [w, 0, 0.9 * w],
    [0.58 * w, h, 0.33 * w]
  ],
  faces: [
    [0, 1, 2],
    [0, 1, 3],
    [1, 2, 3],
    [2, 0, 3]
  ]
});

/** Fekvő, háromszög végű test („sátor”): 2 háromszög és 3 téglalap. */
export const tentGeom = (w: number, h: number, d: number): { verts: V3[]; faces: number[][] } => ({
  verts: [
    [0, 0, 0],
    [w, 0, 0],
    [w / 2, h, 0],
    [0, 0, d],
    [w, 0, d],
    [w / 2, h, d]
  ],
  faces: [
    [0, 1, 2],
    [3, 4, 5],
    [0, 1, 4, 3],
    [1, 2, 5, 4],
    [2, 0, 3, 5]
  ]
});

// ---------------------------------------------------------------------------
// Görbe testek
// ---------------------------------------------------------------------------
interface CurvedProps {
  cx: number;
  by: number;
  r: number;
  h?: number;
  color: string;
  sw?: number;
}

const RY = 0.3;

/** „Konzervdoboz” alakú test: 2 kör alakú lap és görbe rész. */
export const CylinderShape: React.FC<CurvedProps> = ({ cx, by, r, h = 2 * r, color, sw = 2 }) => {
  const ry = r * RY;
  const ty = by - h;
  return (
    <g>
      <path d={`M ${cx - r} ${ty} L ${cx - r} ${by} A ${r} ${ry} 0 0 0 ${cx + r} ${by} L ${cx + r} ${ty} Z`} fill={shade(color, 0.2)} stroke="none" />
      <rect x={cx + r * 0.25} y={ty} width={r * 0.45} height={h} fill={shade(color, -0.12)} opacity={0.35} />
      <rect x={cx - r * 0.75} y={ty} width={r * 0.3} height={h} fill="#ffffff" opacity={0.25} />
      <path d={`M ${cx - r} ${by} A ${r} ${ry} 0 0 1 ${cx + r} ${by}`} fill="none" stroke={INK} strokeWidth={Math.max(1, sw * 0.6)} strokeDasharray={`${sw * 2.2} ${sw * 1.8}`} opacity={0.75} />
      <path d={`M ${cx - r} ${ty} L ${cx - r} ${by} A ${r} ${ry} 0 0 0 ${cx + r} ${by} L ${cx + r} ${ty}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
      <ellipse cx={cx} cy={ty} rx={r} ry={ry} fill={shade(color, 0.55)} stroke={INK} strokeWidth={sw} />
    </g>
  );
};

/** „Fagyitölcsér” alakú test: 1 kör alakú lap és görbe rész, a teteje hegyes. */
export const ConeShape: React.FC<CurvedProps> = ({ cx, by, r, h = 2 * r, color, sw = 2 }) => {
  const ry = r * RY;
  const ay = by - h;
  return (
    <g>
      <path d={`M ${cx - r} ${by} L ${cx} ${ay} L ${cx + r} ${by} A ${r} ${ry} 0 0 1 ${cx - r} ${by} Z`} fill={shade(color, 0.3)} stroke="none" />
      <path d={`M ${cx} ${ay} L ${cx + r} ${by} L ${cx + r * 0.35} ${by + ry * 0.95} Z`} fill={shade(color, -0.1)} opacity={0.35} />
      <path d={`M ${cx - r} ${by} A ${r} ${ry} 0 0 1 ${cx + r} ${by}`} fill="none" stroke={INK} strokeWidth={Math.max(1, sw * 0.6)} strokeDasharray={`${sw * 2.2} ${sw * 1.8}`} opacity={0.75} />
      <path d={`M ${cx - r} ${by} L ${cx} ${ay} L ${cx + r} ${by} A ${r} ${ry} 0 0 1 ${cx - r} ${by}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
    </g>
  );
};

/** Gömb: nincs lapja. A hátsó „egyenlítő” szaggatott, hogy térbelinek lássuk. */
export const SphereShape: React.FC<{ cx: number; cy: number; r: number; color: string; sw?: number }> = ({ cx, cy, r, color, sw = 2 }) => {
  const ry = r * RY;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={shade(color, 0.25)} />
      <circle cx={cx + r * 0.2} cy={cy + r * 0.2} r={r * 0.78} fill={shade(color, -0.05)} opacity={0.35} />
      <ellipse cx={cx - r * 0.35} cy={cy - r * 0.38} rx={r * 0.28} ry={r * 0.18} fill="#ffffff" opacity={0.7} />
      <path d={`M ${cx - r} ${cy} A ${r} ${ry} 0 0 1 ${cx + r} ${cy}`} fill="none" stroke={INK} strokeWidth={Math.max(1, sw * 0.5)} strokeDasharray={`${sw * 2} ${sw * 1.8}`} opacity={0.5} />
      <path d={`M ${cx - r} ${cy} A ${r} ${ry} 0 0 0 ${cx + r} ${cy}`} fill="none" stroke={INK} strokeWidth={Math.max(1, sw * 0.5)} opacity={0.5} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={INK} strokeWidth={sw} />
    </g>
  );
};

/** „Tál” (félgömb) alakú test: 1 kör alakú lap és görbe rész. */
export const DomeShape: React.FC<CurvedProps> = ({ cx, by, r, color, sw = 2 }) => {
  const ry = r * RY;
  return (
    <g>
      <path d={`M ${cx - r} ${by} A ${r} ${r} 0 0 1 ${cx + r} ${by} A ${r} ${ry} 0 0 1 ${cx - r} ${by} Z`} fill={shade(color, 0.25)} />
      <ellipse cx={cx - r * 0.35} cy={by - r * 0.6} rx={r * 0.22} ry={r * 0.14} fill="#ffffff" opacity={0.7} />
      <path d={`M ${cx - r} ${by} A ${r} ${ry} 0 0 1 ${cx + r} ${by}`} fill="none" stroke={INK} strokeWidth={Math.max(1, sw * 0.6)} strokeDasharray={`${sw * 2.2} ${sw * 1.8}`} opacity={0.75} />
      <path d={`M ${cx - r} ${by} A ${r} ${r} 0 0 1 ${cx + r} ${by} A ${r} ${ry} 0 0 1 ${cx - r} ${by}`} fill="none" stroke={INK} strokeWidth={sw} />
    </g>
  );
};

// ---------------------------------------------------------------------------
// Egységes „testkészlet”: minden test egy (cx, by) talppontra és s méretre rajzolva.
// ---------------------------------------------------------------------------
export type SolidKind = 'kocka' | 'teglatest' | 'piramis4' | 'piramis3' | 'sator' | 'henger' | 'kup' | 'gomb' | 'felgomb';

export const SOLID_KINDS: SolidKind[] = ['kocka', 'teglatest', 'piramis4', 'piramis3', 'sator', 'henger', 'kup', 'gomb', 'felgomb'];

export const SOLID_COLOR: Record<SolidKind, string> = {
  kocka: '#3b82f6',
  teglatest: '#f59e0b',
  piramis4: '#ef4444',
  piramis3: '#a855f7',
  sator: '#10b981',
  henger: '#06b6d4',
  kup: '#f97316',
  gomb: '#ec4899',
  felgomb: '#84cc16'
};

export type FaceShape = 'negyzet' | 'teglalap' | 'haromszog' | 'kor';

export interface SolidInfo {
  /** Rövid, gyerekbarát név (a könyv csak a kockát, a téglatestet és a gömböt nevezi meg). */
  name: string;
  /** Mire hasonlít a mindennapokból? */
  like: string;
  faces: FaceShape[];
  curved: boolean;
  pointy: boolean;
  /** Egy mondat a test lapjairól (hibás tipp esetén ezt mondja a labor). */
  desc: string;
}

export const SOLID_INFO: Record<SolidKind, SolidInfo> = {
  kocka: { name: 'kocka', like: 'dobókocka', faces: ['negyzet', 'negyzet', 'negyzet', 'negyzet', 'negyzet', 'negyzet'], curved: false, pointy: false, desc: 'A kockát 6 négyzet alakú lap határolja.' },
  teglatest: { name: 'téglatest', like: 'cipősdoboz', faces: ['teglalap', 'teglalap', 'teglalap', 'teglalap', 'teglalap', 'teglalap'], curved: false, pointy: false, desc: 'Ezt a téglatestet 6 téglalap alakú lap határolja, egyik sem négyzet.' },
  piramis4: { name: 'piramis alakú test', like: 'egyiptomi piramis', faces: ['negyzet', 'haromszog', 'haromszog', 'haromszog', 'haromszog'], curved: false, pointy: true, desc: 'Ennek 1 négyzet és 4 háromszög alakú lapja van.' },
  piramis3: { name: 'háromszög lapú test', like: 'háromszög alakú teafilter', faces: ['haromszog', 'haromszog', 'haromszog', 'haromszog'], curved: false, pointy: true, desc: 'Ezt 4 háromszög alakú lap határolja.' },
  sator: { name: 'sátor alakú test', like: 'sátor', faces: ['haromszog', 'haromszog', 'teglalap', 'teglalap', 'teglalap'], curved: false, pointy: false, desc: 'Ennek 2 háromszög és 3 téglalap alakú lapja van.' },
  henger: { name: 'konzervdoboz alakú test', like: 'konzervdoboz', faces: ['kor', 'kor'], curved: true, pointy: false, desc: 'Ennek 2 kör alakú lapja és görbe része van.' },
  kup: { name: 'tölcsér alakú test', like: 'fagyitölcsér', faces: ['kor'], curved: true, pointy: true, desc: 'Ennek 1 kör alakú lapja és görbe része van, a teteje hegyes.' },
  gomb: { name: 'gömb', like: 'labda', faces: [], curved: true, pointy: false, desc: 'A gömbnek nincs lapja, csak görbe része.' },
  felgomb: { name: 'tál alakú test', like: 'fejjel lefelé fordított tál', faces: ['kor'], curved: true, pointy: false, desc: 'Ennek 1 kör alakú lapja és görbe része van, a teteje gömbölyű.' }
};

/**
 * Egy test a készletből. (cx, by) = a test talpának közepe, s = kb. a test szélessége.
 */
export const Solid: React.FC<{ kind: SolidKind; cx: number; by: number; s: number; color?: string; sw?: number }> = ({ kind, cx, by, s, color, sw = 2 }) => {
  const c = color ?? SOLID_COLOR[kind];
  switch (kind) {
    case 'kocka': {
      const u = s / (1 + KX);
      return <PolySolid {...boxGeom(1, 1, 1)} ox={cx - (s / 2)} oy={by} u={u} color={c} sw={sw} />;
    }
    case 'teglatest': {
      const u = s / (1.7 + KX * 0.8);
      return <PolySolid {...boxGeom(1.7, 0.9, 0.8)} ox={cx - s / 2} oy={by} u={u} color={c} sw={sw} />;
    }
    case 'piramis4': {
      const u = s / (1 + KX);
      return <PolySolid {...pyramid4Geom(1, 1.05)} ox={cx - s / 2} oy={by} u={u} color={c} sw={sw} />;
    }
    case 'piramis3': {
      const u = s / (1 + KX * 0.9);
      return <PolySolid {...pyramid3Geom(1, 1.0)} ox={cx - s / 2} oy={by} u={u} color={c} sw={sw} />;
    }
    case 'sator': {
      const u = s / (1 + KX * 1.2);
      return <PolySolid {...tentGeom(1, 0.8, 1.2)} ox={cx - s / 2} oy={by} u={u} color={c} sw={sw} />;
    }
    case 'henger':
      return <CylinderShape cx={cx} by={by - s * 0.12} r={s * 0.38} h={s * 0.85} color={c} sw={sw} />;
    case 'kup':
      return <ConeShape cx={cx} by={by - s * 0.12} r={s * 0.42} h={s * 1.0} color={c} sw={sw} />;
    case 'gomb':
      return <SphereShape cx={cx} cy={by - s * 0.45} r={s * 0.45} color={c} sw={sw} />;
    case 'felgomb':
      return <DomeShape cx={cx} by={by - s * 0.12} r={s * 0.5} color={c} sw={sw} />;
    default:
      return null;
  }
};

// ---------------------------------------------------------------------------
// Kis kockákból épített építmény és alaprajz
// ---------------------------------------------------------------------------
/**
 * plan[sor][oszlop] = hány kocka áll ott egymáson. Az alaprajz FELSŐ sora van HÁTUL
 * (mint a könyvben: felülről nézzük, mi elöl állunk).
 */
export const CubeBuilding: React.FC<{ plan: number[][]; ox: number; oy: number; u: number; color?: string; sw?: number }> = ({ plan, ox, oy, u, color = '#f97316', sw = 1.6 }) => {
  const R = plan.length;
  const cubes: { c: number; k: number; z: number }[] = [];
  plan.forEach((row, r) => row.forEach((n, c) => {
    for (let k = 0; k < n; k++) cubes.push({ c, k, z: R - 1 - r });
  }));
  cubes.sort((a, b) => b.z - a.z || a.k - b.k || a.c - b.c);
  const front = color;
  const top = shade(color, 0.45);
  const side = shade(color, -0.18);
  return (
    <g strokeLinejoin="round">
      {cubes.map(({ c, k, z }, i) => {
        const p = (x: number, y: number, zz: number) => proj([x, y, zz], ox, oy, u).map((v) => v.toFixed(1)).join(',');
        return (
          <g key={i} stroke={INK} strokeWidth={sw}>
            <polygon points={[p(c, k, z), p(c + 1, k, z), p(c + 1, k + 1, z), p(c, k + 1, z)].join(' ')} fill={front} />
            <polygon points={[p(c, k + 1, z), p(c + 1, k + 1, z), p(c + 1, k + 1, z + 1), p(c, k + 1, z + 1)].join(' ')} fill={top} />
            <polygon points={[p(c + 1, k, z), p(c + 1, k, z + 1), p(c + 1, k + 1, z + 1), p(c + 1, k + 1, z)].join(' ')} fill={side} />
          </g>
        );
      })}
    </g>
  );
};

/** Az építmény befoglaló mérete egységekben (szélesség, magasság) a rajzhoz. */
export const buildingExtent = (plan: number[][]) => {
  const R = plan.length;
  const C = Math.max(...plan.map((r) => r.length));
  const H = Math.max(1, ...plan.flat());
  return { w: C + KX * R, h: H + KY * R, R, C, H };
};

/** Alaprajz: négyzetek a számokkal (0 vagy null = ott nincs kocka, nem rajzoljuk). */
export const PlanGrid: React.FC<{
  plan: (number | string | null)[][];
  x: number;
  y: number;
  cell: number;
  fs?: number;
  sw?: number;
  fill?: string;
  showZero?: boolean;
}> = ({ plan, x, y, cell, fs, sw = 2, fill = '#ffffff', showZero = false }) => (
  <g fontFamily={FONT}>
    {plan.map((row, r) =>
      row.map((v, c) => {
        if (v === null || (v === 0 && !showZero)) return null;
        const q = v === '?';
        return (
          <g key={`${r}-${c}`}>
            <rect x={x + c * cell} y={y + r * cell} width={cell} height={cell} fill={q ? '#fee2e2' : fill} stroke={INK} strokeWidth={sw} />
            <text x={x + c * cell + cell / 2} y={y + r * cell + cell / 2 + (fs ?? cell * 0.55) * 0.36} textAnchor="middle" fontSize={fs ?? cell * 0.55} fontWeight="bold" fill={q ? UNK : INK}>
              {v}
            </text>
          </g>
        );
      })
    )}
  </g>
);

export const planTotal = (plan: number[][]) => plan.flat().reduce((a, b) => a + b, 0);

/** Építmény egy megadott dobozba (x, y, w, h) középre igazítva. */
export const FitBuilding: React.FC<{ plan: number[][]; x: number; y: number; w: number; h: number; color?: string; sw?: number; maxU?: number }> = ({ plan, x, y, w, h, color, sw, maxU = 40 }) => {
  const e = buildingExtent(plan);
  const u = Math.min(w / e.w, h / e.h, maxU);
  const ox = x + (w - e.w * u) / 2;
  const oy = y + h - (h - e.h * u) / 2;
  return <CubeBuilding plan={plan} ox={ox} oy={oy} u={u} color={color} sw={sw} />;
};

export const Txt: React.FC<{ x: number; y: number; s?: number; c?: string; a?: 'start' | 'middle' | 'end'; w?: 'bold' | 'normal'; children: React.ReactNode }> = ({
  x,
  y,
  s = 13,
  c = INK,
  a = 'middle',
  w = 'bold',
  children
}) => (
  <text x={x} y={y} fontSize={s} fill={c} textAnchor={a} fontWeight={w} fontFamily={FONT}>
    {children}
  </text>
);
