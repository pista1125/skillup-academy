import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

// ---------------------------------------------------------------------------
// Közös rajzoló segédek (a lecke ábráihoz, a laborokhoz és a kvízábrákhoz)
// ---------------------------------------------------------------------------

export type CVPoint = [number, number];

export interface CVVec {
  from: CVPoint;
  to: CVPoint;
  /** Kisbetű / nagybetű ⇒ nyíl a betű fölött; „→AB” ⇒ közös nyíl; „_” után alsó index. */
  label?: string;
  color?: string;
  dashed?: boolean;
  /** A címke a haladási irány bal (1) vagy jobb (−1) oldalára kerüljön. */
  side?: 1 | -1;
  /** A címke helye a vektor mentén (0–1). */
  at?: number;
  offset?: number;
  width?: number;
  plain?: boolean;
}

export interface CVDot {
  at: CVPoint;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
}

export interface CVPoly {
  pts: CVPoint[];
  fill?: string;
  stroke?: string;
  dashed?: boolean;
}

export interface CVText {
  at: CVPoint;
  text: string;
  color?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
}

/** Vektorcímke SVG-ben: betűk fölött kis nyíl, „→AB” esetén közös nyíl, „_” után alsó index. */
export const CVLabel: React.FC<{
  x: number;
  y: number;
  text: string;
  color?: string;
  size?: number;
  plain?: boolean;
}> = ({ x, y, text, color = '#0f172a', size = 13, plain = false }) => {
  if (plain) {
    return (
      <text x={x} y={y + size * 0.35} fontSize={size} fontWeight="bold" textAnchor="middle" fill={color}>
        {text}
      </text>
    );
  }
  type Tok = { s: string; arrow: boolean; sub: boolean; w: number };
  const cw = (ch: string, sub: boolean) => {
    const f = sub ? size * 0.7 : size;
    if (ch === ' ') return f * 0.28;
    if ('+−-=·'.includes(ch)) return f * 0.72;
    if ('()|'.includes(ch)) return f * 0.36;
    if (/[A-Z]/.test(ch)) return f * 0.7;
    return f * 0.6;
  };
  const toks: Tok[] = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '→') {
      let j = i + 1;
      while (j < text.length && /[A-Z0-9']/.test(text[j])) j++;
      const s = text.slice(i + 1, j);
      toks.push({ s, arrow: true, sub: false, w: s.split('').reduce((acc, c) => acc + cw(c, false), 0) });
      i = j;
    } else if (ch === '_') {
      let j = i + 1;
      while (j < text.length && /[a-zA-Z0-9∥⊥]/.test(text[j])) j++;
      const s = text.slice(i + 1, j);
      toks.push({ s, arrow: false, sub: true, w: s.split('').reduce((acc, c) => acc + cw(c, true), 0) });
      i = j;
    } else {
      toks.push({ s: ch, arrow: /[a-zA-Z]/.test(ch), sub: false, w: cw(ch, false) });
      i++;
    }
  }
  const total = toks.reduce((acc, t) => acc + t.w, 0);
  let cx = x - total / 2;
  const base = y + size * 0.35;
  const top = base - size * 0.95;
  return (
    <g>
      {toks.map((t, k) => {
        const x0 = cx;
        cx += t.w;
        if (t.s === ' ') return null;
        const mid = x0 + t.w / 2;
        return (
          <g key={k}>
            <text
              x={mid}
              y={t.sub ? base + size * 0.25 : base}
              fontSize={t.sub ? size * 0.7 : size}
              fontWeight="bold"
              fontStyle={t.arrow && /^[a-z]$/.test(t.s) ? 'italic' : 'normal'}
              textAnchor="middle"
              fill={color}
            >
              {t.s}
            </text>
            {t.arrow && (
              <g stroke={color} strokeWidth={1} fill={color}>
                <line x1={x0 + t.w * 0.1} y1={top} x2={x0 + t.w * 0.9 - 2} y2={top} />
                <polygon
                  points={`${x0 + t.w * 0.9},${top} ${x0 + t.w * 0.9 - 3.2},${top - 1.8} ${x0 + t.w * 0.9 - 3.2},${top + 1.8}`}
                  stroke="none"
                />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Nyíl (vonal + kitöltött nyílhegy) képpont-koordinátákban. */
export const CVArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  dashed?: boolean;
  head?: number;
}> = ({ x1, y1, x2, y2, color = '#2563eb', width = 2.4, dashed = false, head = 9 }) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 0.5) return <circle cx={x1} cy={y1} r={3} fill={color} />;
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const h = Math.min(head, len * 0.6);
  const bx = x2 - ux * h;
  const by = y2 - uy * h;
  const px = -uy * h * 0.45;
  const py = ux * h * 0.45;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={bx + ux}
        y2={by + uy}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '5 4' : undefined}
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
    </g>
  );
};

/** Derékszög jelölése (magyar szokás): negyedkörív, benne egy pont. Képpont-koordinátákban. */
export const CVRightAngle: React.FC<{
  V: { x: number; y: number };
  P: { x: number; y: number };
  Q: { x: number; y: number };
  r?: number;
  color?: string;
}> = ({ V, P, Q, r = 13, color = '#475569' }) => {
  const l1 = Math.hypot(P.x - V.x, P.y - V.y) || 1;
  const l2 = Math.hypot(Q.x - V.x, Q.y - V.y) || 1;
  const u1 = { x: (P.x - V.x) / l1, y: (P.y - V.y) / l1 };
  const u2 = { x: (Q.x - V.x) / l2, y: (Q.y - V.y) / l2 };
  const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
  const bx = u1.x + u2.x;
  const by = u1.y + u2.y;
  const bl = Math.hypot(bx, by) || 1;
  const k = 0.55 * r;
  return (
    <g>
      <path
        d={`M ${(V.x + r * u1.x).toFixed(2)} ${(V.y + r * u1.y).toFixed(2)} A ${r} ${r} 0 0 ${sweep} ${(V.x + r * u2.x).toFixed(2)} ${(V.y + r * u2.y).toFixed(2)}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
      />
      <circle cx={V.x + (k * bx) / bl} cy={V.y + (k * by) / bl} r="1.8" fill={color} />
    </g>
  );
};

/**
 * Négyzetrácsos ábra rácsegységekben megadott adatokkal (y felfelé nő).
 * axes = true esetén a koordinátatengelyek is megjelennek (ha a 0 a tartományba esik).
 */
export const CVGrid: React.FC<{
  x0: number;
  x1: number;
  y0: number;
  y1: number;
  cell?: number;
  pad?: number;
  axes?: boolean;
  grid?: boolean;
  vectors?: CVVec[];
  points?: CVDot[];
  polygons?: CVPoly[];
  rightAngles?: { at: CVPoint; p: CVPoint; q: CVPoint }[];
  texts?: CVText[];
  className?: string;
  children?: React.ReactNode;
  /** Kattintás a rácson: a legközelebbi rácspontot adja vissza. */
  onGridClick?: (p: CVPoint) => void;
  /** Minden egész osztás feliratozása a tengelyeken. */
  ticks?: boolean;
}> = ({
  x0,
  x1,
  y0,
  y1,
  cell = 24,
  pad = 16,
  axes = false,
  grid = true,
  vectors = [],
  points = [],
  polygons = [],
  rightAngles = [],
  texts = [],
  className = 'w-full max-w-[280px] h-auto mx-auto',
  children,
  onGridClick,
  ticks = false
}) => {
  const W = (x1 - x0) * cell + 2 * pad;
  const H = (y1 - y0) * cell + 2 * pad;
  const X = (x: number) => pad + (x - x0) * cell;
  const Y = (y: number) => pad + (y1 - y) * cell;
  const P = (p: CVPoint) => ({ x: X(p[0]), y: Y(p[1]) });
  const lines: React.ReactNode[] = [];
  if (grid) {
    for (let x = x0; x <= x1; x++) {
      lines.push(<line key={`gx${x}`} x1={X(x)} y1={Y(y0)} x2={X(x)} y2={Y(y1)} stroke="#e2e8f0" strokeWidth="1" />);
    }
    for (let y = y0; y <= y1; y++) {
      lines.push(<line key={`gy${y}`} x1={X(x0)} y1={Y(y)} x2={X(x1)} y2={Y(y)} stroke="#e2e8f0" strokeWidth="1" />);
    }
  }
  const showAxes = axes && x0 <= 0 && x1 >= 0 && y0 <= 0 && y1 >= 0;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      style={onGridClick ? { cursor: 'crosshair' } : undefined}
      onClick={
        onGridClick
          ? (e) => {
              const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
              if (!r.width || !r.height) return;
              const sx = ((e.clientX - r.left) / r.width) * W;
              const sy = ((e.clientY - r.top) / r.height) * H;
              const gx = Math.round(x0 + (sx - pad) / cell);
              const gy = Math.round(y1 - (sy - pad) / cell);
              onGridClick([Math.max(x0, Math.min(x1, gx)), Math.max(y0, Math.min(y1, gy))]);
            }
          : undefined
      }
    >
      <rect x="1" y="1" width={W - 2} height={H - 2} rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      {lines}
      {showAxes && (
        <g>
          <CVArrow x1={X(x0)} y1={Y(0)} x2={X(x1) + 8} y2={Y(0)} color="#334155" width={1.4} head={7} />
          <CVArrow x1={X(0)} y1={Y(y0)} x2={X(0)} y2={Y(y1) - 8} color="#334155" width={1.4} head={7} />
          <text x={X(x1) + 4} y={Y(0) + 14} fontSize="11" fill="#334155" fontStyle="italic">x</text>
          <text x={X(0) + 6} y={Y(y1) - 2} fontSize="11" fill="#334155" fontStyle="italic">y</text>
          <text x={X(0) - 5} y={Y(0) + 12} fontSize="10" textAnchor="end" fill="#334155">O</text>
          {!ticks && x1 >= 1 && (
            <text x={X(1)} y={Y(0) + 12} fontSize="9" textAnchor="middle" fill="#64748b">1</text>
          )}
          {!ticks && y1 >= 1 && (
            <text x={X(0) - 5} y={Y(1) + 3} fontSize="9" textAnchor="end" fill="#64748b">1</text>
          )}
          {ticks &&
            Array.from({ length: x1 - x0 + 1 }, (_, k) => x0 + k)
              .filter((x) => x !== 0)
              .map((x) => (
                <text key={'tx' + x} x={X(x)} y={Y(0) + 11} fontSize="8" textAnchor="middle" fill="#94a3b8">
                  {String(x).replace('-', '−')}
                </text>
              ))}
          {ticks &&
            Array.from({ length: y1 - y0 + 1 }, (_, k) => y0 + k)
              .filter((y) => y !== 0)
              .map((y) => (
                <text key={'ty' + y} x={X(0) - 4} y={Y(y) + 3} fontSize="8" textAnchor="end" fill="#94a3b8">
                  {String(y).replace('-', '−')}
                </text>
              ))}
        </g>
      )}
      {polygons.map((pg, k) => (
        <polygon
          key={`pg${k}`}
          points={pg.pts.map((p) => `${X(p[0])},${Y(p[1])}`).join(' ')}
          fill={pg.fill ?? 'rgba(59,130,246,0.10)'}
          stroke={pg.stroke ?? '#93c5fd'}
          strokeWidth="1.5"
          strokeDasharray={pg.dashed ? '5 4' : undefined}
        />
      ))}
      {rightAngles.map((ra, k) => (
        <CVRightAngle key={`ra${k}`} V={P(ra.at)} P={P(ra.p)} Q={P(ra.q)} r={11} />
      ))}
      {vectors.map((v, k) => {
        const a = P(v.from);
        const b = P(v.to);
        const color = v.color ?? '#2563eb';
        const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
        const nx = (b.y - a.y) / len;
        const ny = -(b.x - a.x) / len;
        const s = v.side ?? 1;
        const t = v.at ?? 0.5;
        const off = v.offset ?? 12;
        const lx = a.x + (b.x - a.x) * t + s * nx * off;
        const ly = a.y + (b.y - a.y) * t + s * ny * off;
        return (
          <g key={`v${k}`}>
            <CVArrow x1={a.x} y1={a.y} x2={b.x} y2={b.y} color={color} dashed={v.dashed} width={v.width ?? 2.4} />
            {v.label && <CVLabel x={lx} y={ly} text={v.label} color={color} plain={v.plain} />}
          </g>
        );
      })}
      {points.map((p, k) => (
        <g key={`p${k}`}>
          <circle cx={X(p.at[0])} cy={Y(p.at[1])} r="3" fill={p.color ?? '#0f172a'} />
          {p.label && (
            <text
              x={X(p.at[0]) + (p.dx ?? 6)}
              y={Y(p.at[1]) + (p.dy ?? -6)}
              fontSize="11"
              fontWeight="bold"
              fill={p.color ?? '#0f172a'}
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
      {texts.map((t, k) => (
        <text
          key={`t${k}`}
          x={X(t.at[0]) + (t.dx ?? 0)}
          y={Y(t.at[1]) + (t.dy ?? 0)}
          fontSize={t.size ?? 11}
          fontWeight="bold"
          textAnchor={t.anchor ?? 'middle'}
          fill={t.color ?? '#0f172a'}
        >
          {t.text}
        </text>
      ))}
      {children}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// A lecke ábrái
// ---------------------------------------------------------------------------

/** 1. ábra (bevezető): az i, j bázisvektorok és az a = 3i, b = −2j, c = 3i − 2j, d = −2i + 3j helyvektorok. */
export const BasisVectorsIntroSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CVGrid
    x0={-3}
    x1={4}
    y0={-3}
    y1={4}
    cell={34}
    axes
    ticks
    className={className}
    vectors={[
      { from: [0, 0], to: [3, 0], label: 'a', color: '#2563eb', side: 1, at: 0.75 },
      { from: [0, 0], to: [0, -2], label: 'b', color: '#059669', side: 1, at: 0.6 },
      { from: [0, 0], to: [3, -2], label: 'c', color: '#7c3aed', side: -1, at: 0.6 },
      { from: [0, 0], to: [-2, 3], label: 'd', color: '#dc2626', side: 1, at: 0.6 },
      { from: [0, 0], to: [1, 0], label: 'i', color: '#0f172a', side: -1, width: 3.2 },
      { from: [0, 0], to: [0, 1], label: 'j', color: '#0f172a', side: -1, width: 3.2 }
    ]}
    points={[
      { at: [3, 0], label: 'A(3; 0)', dx: 4, dy: -8 },
      { at: [0, -2], label: 'B(0; −2)', dx: -58, dy: 4 },
      { at: [3, -2], label: 'C(3; −2)', dx: 6, dy: 4 },
      { at: [-2, 3], label: 'D(−2; 3)', dx: -10, dy: -8 }
    ]}
  />
);

/** 2. ábra (kidolgozott feladat): a p = →AB, q = →CD, r = →FE, s = →GO vektorok rácspontok között. */
export const GridVectorsReadingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CVGrid
    x0={-4}
    x1={7}
    y0={-3}
    y1={6}
    cell={30}
    axes
    ticks
    className={className}
    vectors={[
      { from: [1, 2], to: [2, 5], label: 'p', color: '#2563eb', side: 1 },
      { from: [3, 3], to: [6, 2], label: 'q', color: '#059669', side: 1 },
      { from: [2, -2], to: [-1, -1], label: 'r', color: '#dc2626', side: -1 },
      { from: [-3, 1], to: [0, 0], label: 's', color: '#7c3aed', side: 1 }
    ]}
    points={[
      { at: [1, 2], label: 'A', dx: -12, dy: 4 },
      { at: [2, 5], label: 'B', dx: 6, dy: -4 },
      { at: [3, 3], label: 'C', dx: -4, dy: -8 },
      { at: [6, 2], label: 'D', dx: 6, dy: -4 },
      { at: [2, -2], label: 'F', dx: 6, dy: 12 },
      { at: [-1, -1], label: 'E', dx: -12, dy: 12 },
      { at: [-3, 1], label: 'G', dx: -6, dy: -8 }
    ]}
  />
);

/** 3. ábra: a p, q, r, s vektorokkal egyenlő helyvektorok; q és s egybeesik. */
export const EqualPositionVectorsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CVGrid
    x0={-4}
    x1={4}
    y0={-2}
    y1={4}
    cell={34}
    axes
    ticks
    className={className}
    vectors={[
      { from: [0, 0], to: [1, 3], label: 'p(1; 3)', color: '#2563eb', side: 1, at: 0.8, offset: 30 },
      { from: [0, 0], to: [3, -1], label: 'q = s', color: '#059669', side: -1, at: 0.7, offset: 16 },
      { from: [0, 0], to: [-3, 1], label: 'r(−3; 1)', color: '#dc2626', side: 1, at: 0.6, offset: 16 }
    ]}
    texts={[{ at: [3, -1], text: '(3; −1)', color: '#047857', dx: 0, dy: 18 }]}
  />
);

/** 4. ábra: műveletek koordinátákkal: p + q, p − s, 2r. */
export const CoordinateOperationsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CVGrid
    x0={-7}
    x1={5}
    y0={-2}
    y1={5}
    cell={30}
    axes
    ticks
    className={className}
    vectors={[
      { from: [0, 0], to: [1, 3], label: 'p', color: '#2563eb', side: -1, at: 0.6 },
      { from: [1, 3], to: [4, 2], label: 'q', color: '#059669', side: 1, dashed: true },
      { from: [0, 0], to: [4, 2], label: 'p + q', color: '#0f172a', side: -1, at: 0.6, offset: 14 },
      { from: [0, 0], to: [-2, 4], label: 'p − s', color: '#7c3aed', side: 1, at: 0.65, offset: 22 },
      { from: [0, 0], to: [-3, 1], label: 'r', color: '#f87171', side: -1, at: 0.5, width: 3.4 },
      { from: [0, 0], to: [-6, 2], label: '2r', color: '#dc2626', side: 1, at: 0.8 }
    ]}
    texts={[
      { at: [4, 2], text: '(4; 2)', dx: 4, dy: -8, anchor: 'start' },
      { at: [-2, 4], text: '(−2; 4)', dx: -4, dy: -6, anchor: 'end' },
      { at: [-6, 2], text: '(−6; 2)', dx: 0, dy: -10 }
    ]}
  />
);

/** 5. ábra: a v(3; 1) vektor +90°-os és −90°-os elforgatottja. */
export const VectorRotationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CVGrid
    x0={-3}
    x1={5}
    y0={-4}
    y1={4}
    cell={30}
    axes
    ticks
    className={className}
    rightAngles={[
      { at: [0, 0], p: [3, 1], q: [-1, 3] },
      { at: [0, 0], p: [3, 1], q: [1, -3] }
    ]}
    vectors={[
      { from: [0, 0], to: [3, 1], label: 'v(3; 1)', color: '#2563eb', side: -1, at: 0.85, offset: 14 },
      { from: [0, 0], to: [-1, 3], label: '+90°: (−1; 3)', color: '#059669', side: 1, at: 0.85, offset: 14, plain: true },
      { from: [0, 0], to: [1, -3], label: '−90°: (1; −3)', color: '#dc2626', side: -1, at: 0.85, offset: 14, plain: true }
    ]}
  />
);

/** 6. ábra: a vektor hossza a Pitagorasz-tétellel: |→AB| = √(1² + 3²) = √10. */
export const VectorLengthSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CVGrid
    x0={-1}
    x1={6}
    y0={-1}
    y1={6}
    cell={32}
    axes
    ticks
    className={className}
    polygons={[{ pts: [[1, 2], [2, 2], [2, 5]], fill: 'rgba(250,204,21,0.15)', stroke: '#eab308' }]}
    rightAngles={[{ at: [2, 2], p: [1, 2], q: [2, 5] }]}
    vectors={[{ from: [1, 2], to: [2, 5], label: '→AB', color: '#2563eb', side: 1, offset: 16 }]}
    points={[
      { at: [1, 2], label: 'A(1; 2)', dx: -14, dy: 16 },
      { at: [2, 5], label: 'B(2; 5)', dx: 6, dy: -4 }
    ]}
    texts={[
      { at: [1.5, 2], text: '1', color: '#92400e', dy: 14 },
      { at: [2, 3.5], text: '3', color: '#92400e', dx: 10, anchor: 'start' },
      { at: [3, 1], text: '|→AB| = √(1² + 3²) = √10', color: '#0f172a', anchor: 'start', dy: 4 }
    ]}
  />
);

