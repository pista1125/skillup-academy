import React, { useCallback, useMemo, useRef, useState } from 'react';

/**
 * Forgatható 3D drótváz-néző (12. osztály, térgeometria).
 * Egérrel / érintéssel húzva forgatható. Konvex poliédereknél a takart élek szaggatottak
 * (lapnormálisok alapján), görbe testeknél (henger, kúp, gömb) a szegmens mélysége dönt.
 *
 * Koordináták: x jobbra, y felfelé, z a néző felé (forgatás előtt).
 */

export type Vec3 = [number, number, number];

export interface Solid {
  vertices: Vec3[];
  /** Élek csúcsindex-párokkal. */
  edges: [number, number][];
  /** Konvex poliéder lapjai (csúcsindexek körüljárási sorrendben). Ha megvan, a takart éleket ebből számolja. */
  faces?: number[][];
  /** Görbe test: ilyenkor az élek láthatóságát a mélység dönti el. */
  curved?: boolean;
  /** Feliratozott csúcsok: index → betű. */
  labels?: Record<number, string>;
}

export interface Solid3DExtraSegment {
  from: Vec3;
  to: Vec3;
  color?: string;
  dashed?: boolean;
  width?: number;
  label?: string;
}

export interface Solid3DViewerProps {
  solid: Solid;
  /** Kiemelt szakaszok (pl. testátló, magasság), mindig láthatók. */
  extras?: Solid3DExtraSegment[];
  /** Kiemelt kitöltött sokszögek (pl. metszet, háromszög), csúcsok 3D-ben. */
  polygons?: { points: Vec3[]; fill?: string; stroke?: string; opacity?: number }[];
  /** Extra címkék tetszőleges 3D pontokban. */
  pointLabels?: { at: Vec3; text: string; color?: string }[];
  initialYaw?: number;
  initialPitch?: number;
  width?: number;
  height?: number;
  /** Nagyítás (képpont / egység). Ha hiányzik, automatikus. */
  scale?: number;
  className?: string;
  edgeColor?: string;
  hint?: boolean;
}

const rotate = (p: Vec3, yaw: number, pitch: number): Vec3 => {
  const [x, y, z] = p;
  const cy = Math.cos(yaw), sy = Math.sin(yaw);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  const cp = Math.cos(pitch), sp = Math.sin(pitch);
  const y2 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;
  return [x1, y2, z2];
};

const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

export const Solid3DViewer: React.FC<Solid3DViewerProps> = ({
  solid,
  extras = [],
  polygons = [],
  pointLabels = [],
  initialYaw = -0.6,
  initialPitch = 0.35,
  width = 320,
  height = 260,
  scale,
  className,
  edgeColor = '#334155',
  hint = true,
}) => {
  const [yaw, setYaw] = useState(initialYaw);
  const [pitch, setPitch] = useState(initialPitch);
  const drag = useRef<{ x: number; y: number; yaw: number; pitch: number } | null>(null);

  const center = useMemo<Vec3>(() => {
    const n = solid.vertices.length || 1;
    const s = solid.vertices.reduce<Vec3>((acc, v) => [acc[0] + v[0], acc[1] + v[1], acc[2] + v[2]], [0, 0, 0]);
    return [s[0] / n, s[1] / n, s[2] / n];
  }, [solid.vertices]);

  const radius = useMemo(() => {
    let r = 0;
    for (const v of solid.vertices) r = Math.max(r, Math.hypot(v[0] - center[0], v[1] - center[1], v[2] - center[2]));
    return r || 1;
  }, [solid.vertices, center]);

  const k = scale ?? (Math.min(width, height) * 0.42) / radius;

  const project = useCallback(
    (p: Vec3) => {
      const r = rotate(sub(p, center), yaw, pitch);
      return { x: width / 2 + r[0] * k, y: height / 2 - r[1] * k, z: r[2] };
    },
    [center, yaw, pitch, k, width, height]
  );

  const proj = useMemo(() => solid.vertices.map(project), [solid.vertices, project]);

  const hiddenEdge = useMemo(() => {
    const hidden = new Set<string>();
    if (solid.faces && !solid.curved) {
      const rv = solid.vertices.map((v) => rotate(sub(v, center), yaw, pitch));
      const visibleFaceOfEdge = new Map<string, boolean>();
      for (const f of solid.faces) {
        if (f.length < 3) continue;
        let n: Vec3 = cross(sub(rv[f[1]], rv[f[0]]), sub(rv[f[2]], rv[f[0]]));
        // kifelé mutató normális: a lap középpontjától a test középpontja felé ellentétes
        const fc = f.reduce<Vec3>((a, i) => [a[0] + rv[i][0] / f.length, a[1] + rv[i][1] / f.length, a[2] + rv[i][2] / f.length], [0, 0, 0]);
        if (dot(n, fc) < 0) n = [-n[0], -n[1], -n[2]];
        const front = n[2] > 1e-9;
        for (let i = 0; i < f.length; i++) {
          const a = f[i], b = f[(i + 1) % f.length];
          const key = a < b ? `${a}-${b}` : `${b}-${a}`;
          visibleFaceOfEdge.set(key, (visibleFaceOfEdge.get(key) ?? false) || front);
        }
      }
      for (const [a, b] of solid.edges) {
        const key = a < b ? `${a}-${b}` : `${b}-${a}`;
        if (visibleFaceOfEdge.has(key) && !visibleFaceOfEdge.get(key)) hidden.add(key);
      }
    }
    return hidden;
  }, [solid, center, yaw, pitch]);

  const onPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, yaw, pitch };
  };
  const onPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    setYaw(drag.current.yaw + dx * 0.01);
    setPitch(Math.max(-1.45, Math.min(1.45, drag.current.pitch + dy * 0.01)));
  };
  const onPointerUp = () => {
    drag.current = null;
  };

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto select-none cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        role="img"
        aria-label="Forgatható térbeli test"
      >
        {polygons.map((pg, i) => {
          const pts = pg.points.map(project);
          return (
            <polygon
              key={`pg-${i}`}
              points={pts.map((p) => `${p.x},${p.y}`).join(' ')}
              fill={pg.fill ?? '#6366f1'}
              fillOpacity={pg.opacity ?? 0.25}
              stroke={pg.stroke ?? 'none'}
              strokeWidth={1.5}
            />
          );
        })}
        {solid.edges.map(([a, b], i) => {
          const pa = proj[a], pb = proj[b];
          const key = a < b ? `${a}-${b}` : `${b}-${a}`;
          const hidden = solid.curved ? (pa.z + pb.z) / 2 < -radius * 0.05 : hiddenEdge.has(key);
          return (
            <line
              key={`e-${i}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={edgeColor}
              strokeWidth={hidden ? 1 : 1.8}
              strokeDasharray={hidden ? '4 4' : undefined}
              strokeOpacity={hidden ? 0.55 : 1}
              strokeLinecap="round"
            />
          );
        })}
        {extras.map((s, i) => {
          const a = project(s.from), b = project(s.to);
          return (
            <g key={`x-${i}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={s.color ?? '#e11d48'}
                strokeWidth={s.width ?? 2.4}
                strokeDasharray={s.dashed ? '5 4' : undefined}
                strokeLinecap="round"
              />
              {s.label && (
                <text x={(a.x + b.x) / 2 + 6} y={(a.y + b.y) / 2 - 6} fontSize={13} fontWeight={700} fill={s.color ?? '#e11d48'}>
                  {s.label}
                </text>
              )}
            </g>
          );
        })}
        {solid.labels &&
          Object.entries(solid.labels).map(([idx, text]) => {
            const p = proj[Number(idx)];
            if (!p) return null;
            const dx = p.x - width / 2, dy = p.y - height / 2;
            const len = Math.hypot(dx, dy) || 1;
            return (
              <text
                key={`l-${idx}`}
                x={p.x + (dx / len) * 12}
                y={p.y + (dy / len) * 12 + 4}
                fontSize={13}
                fontWeight={700}
                textAnchor="middle"
                fill="#1e293b"
              >
                {text}
              </text>
            );
          })}
        {pointLabels.map((pl, i) => {
          const p = project(pl.at);
          return (
            <text key={`pl-${i}`} x={p.x} y={p.y} fontSize={13} fontWeight={700} textAnchor="middle" fill={pl.color ?? '#0f172a'}>
              {pl.text}
            </text>
          );
        })}
      </svg>
      {hint && <p className="text-center text-xs text-slate-500 mt-1">Húzd az egérrel vagy az ujjaddal a forgatáshoz!</p>}
    </div>
  );
};

/* ---------- Testgenerátorok ---------- */

/** Téglatest a × b × c (x, y-magasság, z). Csúcsok: A B C D (alul), E F G H (felül). */
export const makeBox = (a: number, b: number, c: number): Solid => {
  const v: Vec3[] = [
    [0, 0, c], [a, 0, c], [a, 0, 0], [0, 0, 0],
    [0, b, c], [a, b, c], [a, b, 0], [0, b, 0],
  ];
  return {
    vertices: v,
    edges: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4], [0, 4], [1, 5], [2, 6], [3, 7]],
    faces: [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [1, 2, 6, 5], [2, 3, 7, 6], [3, 0, 4, 7]],
    labels: { 0: 'A', 1: 'B', 2: 'C', 3: 'D', 4: 'E', 5: 'F', 6: 'G', 7: 'H' },
  };
};

const ring = (n: number, r: number, y: number, phase = 0): Vec3[] =>
  Array.from({ length: n }, (_, i) => {
    const t = phase + (2 * Math.PI * i) / n;
    return [r * Math.cos(t), y, r * Math.sin(t)] as Vec3;
  });

/** Egyenes hasáb szabályos n-szög alappal (r: köré írt kör sugara), m magassággal. */
export const makePrism = (n: number, r: number, m: number): Solid => {
  const v = [...ring(n, r, 0, Math.PI / 2), ...ring(n, r, m, Math.PI / 2)];
  const edges: [number, number][] = [];
  const faces: number[][] = [Array.from({ length: n }, (_, i) => i), Array.from({ length: n }, (_, i) => n + i)];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    edges.push([i, j], [n + i, n + j], [i, n + i]);
    faces.push([i, j, n + j, n + i]);
  }
  return { vertices: v, edges, faces };
};

/** Szabályos n-oldalú gúla (r: alapkör sugara), m magassággal. Csúcs indexe: n. */
export const makePyramid = (n: number, r: number, m: number): Solid => {
  const v: Vec3[] = [...ring(n, r, 0, Math.PI / 2), [0, m, 0]];
  const edges: [number, number][] = [];
  const faces: number[][] = [Array.from({ length: n }, (_, i) => i)];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    edges.push([i, j], [i, n]);
    faces.push([i, j, n]);
  }
  return { vertices: v, edges, faces };
};

/** Szabályos n-oldalú csonkagúla: R alsó, r felső köré írt kör sugara, m magasság. */
export const makeFrustumPyramid = (n: number, R: number, r: number, m: number): Solid => {
  const v = [...ring(n, R, 0, Math.PI / 2), ...ring(n, r, m, Math.PI / 2)];
  const edges: [number, number][] = [];
  const faces: number[][] = [Array.from({ length: n }, (_, i) => i), Array.from({ length: n }, (_, i) => n + i)];
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    edges.push([i, j], [n + i, n + j], [i, n + i]);
    faces.push([i, j, n + j, n + i]);
  }
  return { vertices: v, edges, faces };
};

/** Forgáshenger (r, m); seg: körszegmensek száma, gen: alkotók száma. */
export const makeCylinder = (r: number, m: number, seg = 48, gen = 8): Solid => {
  const v = [...ring(seg, r, 0), ...ring(seg, r, m)];
  const edges: [number, number][] = [];
  for (let i = 0; i < seg; i++) {
    const j = (i + 1) % seg;
    edges.push([i, j], [seg + i, seg + j]);
    if (i % Math.max(1, Math.round(seg / gen)) === 0) edges.push([i, seg + i]);
  }
  return { vertices: v, edges, curved: true };
};

/** Forgáskúp (r, m). A csúcs indexe: seg. */
export const makeCone = (r: number, m: number, seg = 48, gen = 8): Solid => {
  const v: Vec3[] = [...ring(seg, r, 0), [0, m, 0]];
  const edges: [number, number][] = [];
  for (let i = 0; i < seg; i++) {
    edges.push([i, (i + 1) % seg]);
    if (i % Math.max(1, Math.round(seg / gen)) === 0) edges.push([i, seg]);
  }
  return { vertices: v, edges, curved: true };
};

/** Csonkakúp (R alsó, r felső sugár, m magasság). */
export const makeFrustumCone = (R: number, r: number, m: number, seg = 48, gen = 8): Solid => {
  const v = [...ring(seg, R, 0), ...ring(seg, r, m)];
  const edges: [number, number][] = [];
  for (let i = 0; i < seg; i++) {
    const j = (i + 1) % seg;
    edges.push([i, j], [seg + i, seg + j]);
    if (i % Math.max(1, Math.round(seg / gen)) === 0) edges.push([i, seg + i]);
  }
  return { vertices: v, edges, curved: true };
};

/** Gömb (R) szélességi és hosszúsági körökkel; középpont az origó. */
export const makeSphere = (R: number, lat = 7, lon = 8, seg = 48): Solid => {
  const vertices: Vec3[] = [];
  const edges: [number, number][] = [];
  for (let k = 1; k < lat; k++) {
    const phi = -Math.PI / 2 + (Math.PI * k) / lat;
    const base = vertices.length;
    vertices.push(...ring(seg, R * Math.cos(phi), R * Math.sin(phi)));
    for (let i = 0; i < seg; i++) edges.push([base + i, base + ((i + 1) % seg)]);
  }
  for (let j = 0; j < lon; j++) {
    const t = (Math.PI * j) / lon;
    const base = vertices.length;
    for (let i = 0; i < seg; i++) {
      const a = (2 * Math.PI * i) / seg;
      vertices.push([R * Math.cos(a) * Math.cos(t), R * Math.sin(a), R * Math.cos(a) * Math.sin(t)]);
    }
    for (let i = 0; i < seg; i++) edges.push([base + i, base + ((i + 1) % seg)]);
  }
  return { vertices, edges, curved: true };
};

export default Solid3DViewer;
