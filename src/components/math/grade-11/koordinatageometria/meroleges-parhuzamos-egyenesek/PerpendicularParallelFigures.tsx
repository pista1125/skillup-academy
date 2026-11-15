import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export type PPt = [number, number];

export interface PPPlaneLine {
  /** Két pont az egyenesen (matematikai koordinátákban); az egyenest a keretre vágjuk. */
  p: PPt;
  q: PPt;
  color?: string;
  label?: string;
  /** A címke helye a levágott szakasz mentén (0…1). */
  labelAt?: number;
  labelDx?: number;
  labelDy?: number;
  dashed?: boolean;
  width?: number;
}

export interface PPPlaneSeg {
  from: PPt;
  to: PPt;
  color?: string;
  dashed?: boolean;
  width?: number;
  arrow?: boolean;
  label?: string;
  labelDx?: number;
  labelDy?: number;
}

export interface PPPlanePoint {
  at: PPt;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
  hollow?: boolean;
}

export interface PPPlaneText {
  at: PPt;
  text: string;
  color?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
  bold?: boolean;
}

export interface PPPlaneAngle {
  /** Csúcs, és a két szárirány egy-egy pontja (matematikai koordinátákban). */
  at: PPt;
  p: PPt;
  q: PPt;
  r?: number;
  label?: string;
  color?: string;
  /** Derékszög: negyedkörív ponttal (magyar jelölés). */
  right?: boolean;
}

export interface PPPlaneProps {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  unit?: number;
  grid?: boolean;
  axes?: boolean;
  /** 'unit': csak az 1-es jelölés; 'all': minden egész; 'none': semmi. */
  ticks?: 'unit' | 'all' | 'none';
  tickStep?: number;
  className?: string;
  lines?: PPPlaneLine[];
  segs?: PPPlaneSeg[];
  points?: PPPlanePoint[];
  texts?: PPPlaneText[];
  angles?: PPPlaneAngle[];
  polygons?: { pts: PPt[]; fill?: string; stroke?: string }[];
  children?: React.ReactNode;
  /** Kattintás a síkon: a legközelebbi rácspont koordinátái. */
  onPointClick?: (x: number, y: number) => void;
}

const PAD = 14;

/** Egyenes (p + t(q − p)) levágása a téglalapra – Liang–Barsky. */
export const ppClipLine = (p: PPt, q: PPt, xMin: number, xMax: number, yMin: number, yMax: number): [PPt, PPt] | null => {
  const dx = q[0] - p[0];
  const dy = q[1] - p[1];
  let t0 = -1e9;
  let t1 = 1e9;
  const checks: [number, number][] = [
    [-dx, p[0] - xMin],
    [dx, xMax - p[0]],
    [-dy, p[1] - yMin],
    [dy, yMax - p[1]]
  ];
  for (const [pp, qq] of checks) {
    if (pp === 0) {
      if (qq < 0) return null;
    } else {
      const t = qq / pp;
      if (pp < 0) t0 = Math.max(t0, t);
      else t1 = Math.min(t1, t);
    }
  }
  if (t0 > t1) return null;
  return [
    [p[0] + t0 * dx, p[1] + t0 * dy],
    [p[0] + t1 * dx, p[1] + t1 * dy]
  ];
};

/** Szögív (vagy derékszögnél negyedkörív + pont) SVG-koordinátákban. */
export const PerpendicularParallelAngleMark: React.FC<{
  V: { x: number; y: number };
  P: { x: number; y: number };
  Q: { x: number; y: number };
  r?: number;
  right?: boolean;
  color?: string;
  label?: string;
}> = ({ V, P, Q, r = 14, right = false, color = '#0f172a', label }) => {
  const l1 = Math.hypot(P.x - V.x, P.y - V.y) || 1;
  const l2 = Math.hypot(Q.x - V.x, Q.y - V.y) || 1;
  const u1 = { x: (P.x - V.x) / l1, y: (P.y - V.y) / l1 };
  const u2 = { x: (Q.x - V.x) / l2, y: (Q.y - V.y) / l2 };
  const cross = u1.x * u2.y - u1.y * u2.x;
  const sweep = cross > 0 ? 1 : 0;
  const a = { x: V.x + r * u1.x, y: V.y + r * u1.y };
  const b = { x: V.x + r * u2.x, y: V.y + r * u2.y };
  const bis = { x: u1.x + u2.x, y: u1.y + u2.y };
  const bl = Math.hypot(bis.x, bis.y) || 1;
  const bu = { x: bis.x / bl, y: bis.y / bl };
  return (
    <g>
      <path d={`M ${a.x} ${a.y} A ${r} ${r} 0 0 ${sweep} ${b.x} ${b.y}`} fill="none" stroke={color} strokeWidth={1.4} />
      {right && <circle cx={V.x + 0.55 * r * bu.x} cy={V.y + 0.55 * r * bu.y} r={1.8} fill={color} />}
      {label && (
        <text x={V.x + (r + 10) * bu.x} y={V.y + (r + 10) * bu.y + 4} fontSize={12} fontWeight="bold" fill={color} textAnchor="middle">
          {label}
        </text>
      )}
    </g>
  );
};

export const PerpendicularParallelArrowHead: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; size?: number }> = ({
  x1,
  y1,
  x2,
  y2,
  color,
  size = 8
}) => {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const p1 = { x: x2 - size * Math.cos(ang - 0.4), y: y2 - size * Math.sin(ang - 0.4) };
  const p2 = { x: x2 - size * Math.cos(ang + 0.4), y: y2 - size * Math.sin(ang + 0.4) };
  return <polygon points={`${x2},${y2} ${p1.x},${p1.y} ${p2.x},${p2.y}`} fill={color} />;
};

/** Általános koordinátasík-ábra (rács, tengelyek, egyenesek, szakaszok, pontok, szögek). */
export const PerpendicularParallelPlane: React.FC<PPPlaneProps> = ({
  xMin,
  xMax,
  yMin,
  yMax,
  unit = 24,
  grid = true,
  axes = true,
  ticks = 'unit',
  tickStep = 1,
  className = 'w-full max-w-[280px] h-auto mx-auto',
  lines = [],
  segs = [],
  points = [],
  texts = [],
  angles = [],
  polygons = [],
  children,
  onPointClick
}) => {
  const W = (xMax - xMin) * unit + 2 * PAD;
  const H = (yMax - yMin) * unit + 2 * PAD;
  const X = (x: number) => PAD + (x - xMin) * unit;
  const Y = (y: number) => PAD + (yMax - y) * unit;
  const P = (p: PPt) => ({ x: X(p[0]), y: Y(p[1]) });
  const xs: number[] = [];
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i++) xs.push(i);
  const ys: number[] = [];
  for (let j = Math.ceil(yMin); j <= Math.floor(yMax); j++) ys.push(j);
  const showAxes = axes && xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={onPointClick ? className + ' cursor-crosshair' : className}
      role="img"
      onClick={
        onPointClick
          ? (e) => {
              const rect = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
              if (!rect.width || !rect.height) return;
              const sx = ((e.clientX - rect.left) / rect.width) * W;
              const sy = ((e.clientY - rect.top) / rect.height) * H;
              const gx = Math.round(xMin + (sx - PAD) / unit);
              const gy = Math.round(yMax - (sy - PAD) / unit);
              onPointClick(Math.max(Math.ceil(xMin), Math.min(Math.floor(xMax), gx)), Math.max(Math.ceil(yMin), Math.min(Math.floor(yMax), gy)));
            }
          : undefined
      }
    >
      <rect x={0} y={0} width={W} height={H} fill="#ffffff" rx={8} />
      {grid && (
        <g stroke="#e2e8f0" strokeWidth={1}>
          {xs.map((i) => (
            <line key={'gx' + i} x1={X(i)} y1={Y(yMax)} x2={X(i)} y2={Y(yMin)} />
          ))}
          {ys.map((j) => (
            <line key={'gy' + j} x1={X(xMin)} y1={Y(j)} x2={X(xMax)} y2={Y(j)} />
          ))}
        </g>
      )}
      {showAxes && (
        <g>
          <line x1={X(xMin)} y1={Y(0)} x2={X(xMax) + 6} y2={Y(0)} stroke="#334155" strokeWidth={1.4} />
          <PerpendicularParallelArrowHead x1={X(xMin)} y1={Y(0)} x2={X(xMax) + 8} y2={Y(0)} color="#334155" size={7} />
          <line x1={X(0)} y1={Y(yMin)} x2={X(0)} y2={Y(yMax) - 6} stroke="#334155" strokeWidth={1.4} />
          <PerpendicularParallelArrowHead x1={X(0)} y1={Y(yMin)} x2={X(0)} y2={Y(yMax) - 8} color="#334155" size={7} />
          <text x={X(xMax) + 2} y={Y(0) + 14} fontSize={11} fontStyle="italic" fill="#334155" textAnchor="end">x</text>
          <text x={X(0) + 6} y={Y(yMax) + 4} fontSize={11} fontStyle="italic" fill="#334155">y</text>
          {ticks !== 'none' && (
            <text x={X(0) - 4} y={Y(0) + 12} fontSize={10} fill="#475569" textAnchor="end">O</text>
          )}
          {ticks === 'unit' && xMax >= 1 && (
            <text x={X(1)} y={Y(0) + 12} fontSize={10} fill="#475569" textAnchor="middle">1</text>
          )}
          {ticks === 'unit' && yMax >= 1 && (
            <text x={X(0) - 4} y={Y(1) + 4} fontSize={10} fill="#475569" textAnchor="end">1</text>
          )}
          {ticks === 'all' &&
            xs
              .filter((i) => i !== 0 && i % tickStep === 0)
              .map((i) => (
                <text key={'tx' + i} x={X(i)} y={Y(0) + 12} fontSize={9} fill="#475569" textAnchor="middle">
                  {String(i).replace('-', '−')}
                </text>
              ))}
          {ticks === 'all' &&
            ys
              .filter((j) => j !== 0 && j % tickStep === 0)
              .map((j) => (
                <text key={'ty' + j} x={X(0) - 4} y={Y(j) + 3} fontSize={9} fill="#475569" textAnchor="end">
                  {String(j).replace('-', '−')}
                </text>
              ))}
        </g>
      )}
      {polygons.map((pg, i) => (
        <polygon
          key={'pg' + i}
          points={pg.pts.map((p) => `${X(p[0])},${Y(p[1])}`).join(' ')}
          fill={pg.fill ?? 'rgba(37,99,235,0.08)'}
          stroke={pg.stroke ?? 'none'}
        />
      ))}
      {lines.map((ln, i) => {
        const c = ppClipLine(ln.p, ln.q, xMin, xMax, yMin, yMax);
        if (!c) return null;
        const a = P(c[0]);
        const b = P(c[1]);
        const t = ln.labelAt ?? 0.88;
        const color = ln.color ?? '#2563eb';
        return (
          <g key={'ln' + i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={ln.width ?? 2.2} strokeDasharray={ln.dashed ? '6 4' : undefined} strokeLinecap="round" />
            {ln.label && (
              <text
                x={a.x + t * (b.x - a.x) + (ln.labelDx ?? 8)}
                y={a.y + t * (b.y - a.y) + (ln.labelDy ?? -6)}
                fontSize={12}
                fontWeight="bold"
                fontStyle="italic"
                fill={color}
              >
                {ln.label}
              </text>
            )}
          </g>
        );
      })}
      {segs.map((s, i) => {
        const a = P(s.from);
        const b = P(s.to);
        const color = s.color ?? '#0f172a';
        return (
          <g key={'sg' + i}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={color} strokeWidth={s.width ?? 1.8} strokeDasharray={s.dashed ? '5 4' : undefined} />
            {s.arrow && <PerpendicularParallelArrowHead x1={a.x} y1={a.y} x2={b.x} y2={b.y} color={color} />}
            {s.label && (
              <text x={(a.x + b.x) / 2 + (s.labelDx ?? 0)} y={(a.y + b.y) / 2 + (s.labelDy ?? 0)} fontSize={11} fontWeight="bold" fill={color} textAnchor="middle">
                {s.label}
              </text>
            )}
          </g>
        );
      })}
      {angles.map((an, i) => (
        <PerpendicularParallelAngleMark key={'an' + i} V={P(an.at)} P={P(an.p)} Q={P(an.q)} r={an.r} right={an.right} color={an.color} label={an.label} />
      ))}
      {points.map((pt, i) => {
        const p = P(pt.at);
        const color = pt.color ?? '#0f172a';
        return (
          <g key={'pt' + i}>
            <circle cx={p.x} cy={p.y} r={3.6} fill={pt.hollow ? '#ffffff' : color} stroke={color} strokeWidth={1.5} />
            {pt.label && (
              <text x={p.x + (pt.dx ?? 6)} y={p.y + (pt.dy ?? -6)} fontSize={11} fontWeight="bold" fill={color}>
                {pt.label}
              </text>
            )}
          </g>
        );
      })}
      {texts.map((t, i) => {
        const p = P(t.at);
        return (
          <text
            key={'tx' + i}
            x={p.x + (t.dx ?? 0)}
            y={p.y + (t.dy ?? 0)}
            fontSize={t.size ?? 11}
            fontWeight={t.bold === false ? 'normal' : 'bold'}
            fill={t.color ?? '#0f172a'}
            textAnchor={t.anchor ?? 'middle'}
          >
            {t.text}
          </text>
        );
      })}
      {children}
    </svg>
  );
};

/** Bevezető: párhuzamos meteorpályák – egyenlő irányszögek, egyenlő meredekségek. */
export const PerpendicularParallelMeteorsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const m = 1.4;
  const xs = [1, 3, 5.5, 7.5];
  const names = ['e', 'f', 'g', 'h'];
  return (
    <PerpendicularParallelPlane
      xMin={0}
      xMax={14}
      yMin={0}
      yMax={7}
      unit={30}
      grid={false}
      ticks="none"
      className={className}
      lines={xs.map((x0, i) => ({ p: [x0, 0] as PPt, q: [x0 + 1, m] as PPt, color: '#f59e0b', label: names[i], labelAt: 0.9, width: 2.6 }))}
      angles={xs.map((x0) => ({ at: [x0, 0] as PPt, p: [x0 + 1, 0] as PPt, q: [x0 + 1, m] as PPt, r: 18, color: '#2563eb' }))}
      points={[
        { at: [1 + 1.5, 1.5 * m], label: 'E₁', color: '#0f172a', dx: -22, dy: 0 },
        { at: [1 + 4, 4 * m], label: 'E₂', color: '#0f172a', dx: -22, dy: 0 },
        { at: [3 + 1, 1 * m], label: 'F₁', color: '#0f172a', dx: 6, dy: 10 },
        { at: [3 + 3.5, 3.5 * m], label: 'F₂', color: '#0f172a', dx: 6, dy: 10 }
      ]}
    >
      <text x={362} y={192} fontSize={12} fontWeight="bold" fill="#2563eb" textAnchor="middle">
        {['e', 'f', 'g', 'h'].map((n, i) => (
          <tspan key={n}>
            {i > 0 ? ' = ' : ''}α<tspan fontSize={9} dy={3}>{n}</tspan>
            <tspan dy={-3}>{''}</tspan>
          </tspan>
        ))}
      </text>
      <text x={362} y={214} fontSize={12} fontWeight="bold" fill="#1e3a8a" textAnchor="middle">
        ⇔{' '}
        {['e', 'f', 'g', 'h'].map((n, i) => (
          <tspan key={n}>
            {i > 0 ? ' = ' : ''}m<tspan fontSize={9} dy={3}>{n}</tspan>
            <tspan dy={-3}>{''}</tspan>
          </tspan>
        ))}
      </text>
    </PerpendicularParallelPlane>
  );
};

/** Kidolgozott feladat: OP(2; 1) −90°-os elforgatottja OP′(1; −2) ⇒ mf = −2. */
export const PerpendicularParallelRotationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <PerpendicularParallelPlane
    xMin={-3}
    xMax={5}
    yMin={-4}
    yMax={3}
    unit={32}
    className={className}
    lines={[
      { p: [0, 0], q: [2, 1], color: '#2563eb', label: 'e', labelAt: 0.95 },
      { p: [0, 0], q: [1, -2], color: '#dc2626', label: 'f', labelAt: 0.05, labelDx: 8, labelDy: 4 }
    ]}
    segs={[
      { from: [0, 0], to: [2, 1], color: '#1e3a8a', width: 3, arrow: true },
      { from: [0, 0], to: [1, -2], color: '#b91c1c', width: 3, arrow: true },
      { from: [2, 0], to: [2, 1], color: '#2563eb', dashed: true, width: 1.2 },
      { from: [1, 0], to: [1, -2], color: '#dc2626', dashed: true, width: 1.2 }
    ]}
    angles={[{ at: [0, 0], p: [2, 1], q: [1, -2], right: true, r: 14 }]}
    points={[
      { at: [2, 1], label: 'P(2; 1)', dx: 6, dy: -6 },
      { at: [1, -2], label: 'P′(1; −2)', dx: 8, dy: 6 }
    ]}
    texts={[
      { at: [3.2, 2.4], text: 'e: m = 1/2', color: '#2563eb' },
      { at: [3.2, -2.9], text: 'f: m = −2/1 = −2', color: '#dc2626' }
    ]}
  />
);

/** m₁ · m₂ = −1: a meredekségi háromszög 90°-os elforgatása. */
export const PerpendicularParallelSlopeTrianglesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <PerpendicularParallelPlane
    xMin={-1}
    xMax={8}
    yMin={-4}
    yMax={4}
    unit={30}
    ticks="none"
    className={className}
    lines={[
      { p: [2, 0], q: [5, 2], color: '#2563eb', label: 'e', labelAt: 0.95, width: 2.6 },
      { p: [2, 0], q: [4, -3], color: '#dc2626', label: 'f', labelAt: 0.92, labelDx: 8, labelDy: 4, width: 2.6 }
    ]}
    segs={[
      { from: [2, 0], to: [5, 0], color: '#059669', width: 2.4, label: '3', labelDy: 14 },
      { from: [5, 0], to: [5, 2], color: '#059669', width: 2.4, label: '2', labelDx: 10 },
      { from: [2, 0], to: [2, -2], color: '#d97706', width: 2.4, label: '2', labelDx: -10 },
      { from: [2, -2], to: [5, -2], color: '#d97706', width: 2.4 }
    ]}
    angles={[
      { at: [5, 0], p: [2, 0], q: [5, 2], right: true, r: 11 },
      { at: [2, -2], p: [2, 0], q: [5, -2], right: true, r: 11 },
      { at: [2, 0], p: [5, 2], q: [4, -3], right: true, r: 16, color: '#7c3aed' }
    ]}
    points={[{ at: [2, 0], color: '#0f172a' }]}
    texts={[
      { at: [3.5, -2.55], text: '3', color: '#d97706' },
      { at: [6.3, 3.2], text: 'e: m = 2/3', color: '#2563eb', size: 12 },
      { at: [6.3, -3.3], text: 'f: m = −3/2', color: '#dc2626', size: 12 },
      { at: [6.3, -0.9], text: '2/3 · (−3/2) = −1', color: '#7c3aed', size: 12 }
    ]}
  />
);

/** HF 2.: az ABCD négyszög – szemközti oldalak párhuzamosak, az átlók merőlegesek. */
export const PerpendicularParallelRhombusSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <PerpendicularParallelPlane
    xMin={-5}
    xMax={9}
    yMin={-3}
    yMax={11}
    unit={18}
    ticks="all"
    tickStep={2}
    className={className}
    polygons={[{ pts: [[-4, -2], [4, 2], [8, 10], [0, 6]], fill: 'rgba(37,99,235,0.08)', stroke: '#2563eb' }]}
    segs={[
      { from: [-4, -2], to: [8, 10], color: '#7c3aed', dashed: true, width: 1.6 },
      { from: [4, 2], to: [0, 6], color: '#7c3aed', dashed: true, width: 1.6 }
    ]}
    angles={[{ at: [2, 4], p: [8, 10], q: [4, 2], right: true, r: 12, color: '#7c3aed' }]}
    points={[
      { at: [-4, -2], label: 'A(−4; −2)', dx: 4, dy: 14 },
      { at: [4, 2], label: 'B(4; 2)', dx: 6, dy: 10 },
      { at: [8, 10], label: 'C(8; 10)', dx: -58, dy: -4 },
      { at: [0, 6], label: 'D(0; 6)', dx: -50, dy: -4 }
    ]}
  />
);

/** Pont és egyenes távolsága: A(−3; 2), BC: x + y = 1, merőleges talppont T(−2; 3). */
export const PerpendicularParallelDistanceSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <PerpendicularParallelPlane
    xMin={-5}
    xMax={3}
    yMin={-1}
    yMax={6}
    unit={30}
    ticks="all"
    className={className}
    lines={[
      { p: [0, 1], q: [1, 0], color: '#2563eb', label: 'x + y = 1', labelAt: 0.12, labelDx: 10, labelDy: 0 },
      { p: [-3, 2], q: [-2, 3], color: '#dc2626', dashed: true, width: 1.6, label: 'y = x + 5', labelAt: 0.9, labelDx: -70, labelDy: 0 }
    ]}
    segs={[{ from: [-3, 2], to: [-2, 3], color: '#7c3aed', width: 3, label: 'd', labelDx: 10, labelDy: 10 }]}
    angles={[{ at: [-2, 3], p: [-3, 2], q: [-1, 2], right: true, r: 12 }]}
    points={[
      { at: [-3, 2], label: 'A(−3; 2)', dx: -20, dy: 16 },
      { at: [-2, 3], label: 'T(−2; 3)', dx: 8, dy: -6, color: '#7c3aed' }
    ]}
  />
);
