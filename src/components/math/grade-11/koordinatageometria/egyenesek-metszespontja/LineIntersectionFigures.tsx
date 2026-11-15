import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export type LIPt = [number, number];

export interface LIPlaneLine {
  /** Két pont az egyenesen (matematikai koordinátákban); az egyenest a keretre vágjuk. */
  p: LIPt;
  q: LIPt;
  color?: string;
  label?: string;
  /** A címke helye a levágott szakasz mentén (0…1). */
  labelAt?: number;
  labelDx?: number;
  labelDy?: number;
  dashed?: boolean;
  width?: number;
}

export interface LIPlaneSeg {
  from: LIPt;
  to: LIPt;
  color?: string;
  dashed?: boolean;
  width?: number;
  arrow?: boolean;
  label?: string;
  labelDx?: number;
  labelDy?: number;
}

export interface LIPlanePoint {
  at: LIPt;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
  hollow?: boolean;
}

export interface LIPlaneText {
  at: LIPt;
  text: string;
  color?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
  bold?: boolean;
}

export interface LIPlaneAngle {
  /** Csúcs, és a két szárirány egy-egy pontja (matematikai koordinátákban). */
  at: LIPt;
  p: LIPt;
  q: LIPt;
  r?: number;
  label?: string;
  color?: string;
  /** Derékszög: negyedkörív ponttal (magyar jelölés). */
  right?: boolean;
}

export interface LIPlaneProps {
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
  lines?: LIPlaneLine[];
  segs?: LIPlaneSeg[];
  points?: LIPlanePoint[];
  texts?: LIPlaneText[];
  angles?: LIPlaneAngle[];
  polygons?: { pts: LIPt[]; fill?: string; stroke?: string }[];
  children?: React.ReactNode;
  /** Kattintás a síkon: a legközelebbi rácspont koordinátái. */
  onPointClick?: (x: number, y: number) => void;
}

const PAD = 14;

/** Egyenes (p + t(q − p)) levágása a téglalapra – Liang–Barsky. */
export const liClipLine = (p: LIPt, q: LIPt, xMin: number, xMax: number, yMin: number, yMax: number): [LIPt, LIPt] | null => {
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
export const LineIntersectionAngleMark: React.FC<{
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

export const LineIntersectionArrowHead: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; size?: number }> = ({
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
export const LineIntersectionPlane: React.FC<LIPlaneProps> = ({
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
  const P = (p: LIPt) => ({ x: X(p[0]), y: Y(p[1]) });
  const xs: number[] = [];
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i++) xs.push(i);
  const ys: number[] = [];
  for (let j = Math.ceil(yMin); j <= Math.floor(yMax); j++) ys.push(j);
  const showAxes = axes && xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={onPointClick ? className + " cursor-crosshair" : className}
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
          <LineIntersectionArrowHead x1={X(xMin)} y1={Y(0)} x2={X(xMax) + 8} y2={Y(0)} color="#334155" size={7} />
          <line x1={X(0)} y1={Y(yMin)} x2={X(0)} y2={Y(yMax) - 6} stroke="#334155" strokeWidth={1.4} />
          <LineIntersectionArrowHead x1={X(0)} y1={Y(yMin)} x2={X(0)} y2={Y(yMax) - 8} color="#334155" size={7} />
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
        const c = liClipLine(ln.p, ln.q, xMin, xMax, yMin, yMax);
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
            {s.arrow && <LineIntersectionArrowHead x1={a.x} y1={a.y} x2={b.x} y2={b.y} color={color} />}
            {s.label && (
              <text x={(a.x + b.x) / 2 + (s.labelDx ?? 0)} y={(a.y + b.y) / 2 + (s.labelDy ?? 0)} fontSize={11} fontWeight="bold" fill={color} textAnchor="middle">
                {s.label}
              </text>
            )}
          </g>
        );
      })}
      {angles.map((an, i) => (
        <LineIntersectionAngleMark key={'an' + i} V={P(an.at)} P={P(an.p)} Q={P(an.q)} r={an.r} right={an.right} color={an.color} label={an.label} />
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

/** Kidolgozott feladat: a két hajó pályája (e: 5x + 4y = 7, f: 4x − y = 14). */
export const LineIntersectionShipsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <LineIntersectionPlane
    xMin={-3}
    xMax={6}
    yMin={-4}
    yMax={5}
    unit={30}
    className={className}
    lines={[
      { p: [-1, 3], q: [3, -2], color: '#2563eb', label: 'e: 5x + 4y = 7', labelAt: 0.06, labelDx: 10, labelDy: 0 },
      { p: [3, -2], q: [4, 2], color: '#dc2626', label: 'f: 4x − y = 14', labelAt: 0.93, labelDx: -96, labelDy: 0 }
    ]}
    points={[
      { at: [-1, 3], label: 'A(−1; 3)', dx: 6, dy: -6 },
      { at: [3, -2], label: 'B(3; −2)', dx: 8, dy: 4, color: '#7c3aed' },
      { at: [4, 2], label: 'C(4; 2)', dx: 8, dy: 4 }
    ]}
  />
);

/** Elmélet 1. példa: 3x + y = −1 és 2x − 3y = −19 metszéspontja (−2; 5). */
export const LineIntersectionExampleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <LineIntersectionPlane
    xMin={-6}
    xMax={3}
    yMin={-2}
    yMax={8}
    unit={28}
    ticks="all"
    className={className}
    lines={[
      { p: [0, -1], q: [-2, 5], color: '#2563eb', label: '3x + y = −1', labelAt: 0.12, labelDx: 8, labelDy: 4 },
      { p: [-2, 5], q: [1, 7], color: '#059669', label: '2x − 3y = −19', labelAt: 0.05, labelDx: 4, labelDy: -10 }
    ]}
    points={[{ at: [-2, 5], label: 'M(−2; 5)', color: '#7c3aed', dx: 8, dy: 14 }]}
    segs={[
      { from: [-2, 0], to: [-2, 5], color: '#7c3aed', dashed: true, width: 1.2 },
      { from: [0, 5], to: [-2, 5], color: '#7c3aed', dashed: true, width: 1.2 }
    ]}
  />
);

/** Két egyenes kölcsönös helyzete és az egyenletrendszer megoldásainak száma. */
export const LineIntersectionCasesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const panels: { title: string; sub: string; lines: { p: LIPt; q: LIPt; color: string; dash?: boolean }[]; dot?: LIPt }[] = [
    {
      title: 'Metsző egyenesek',
      sub: 'pontosan 1 megoldás',
      lines: [
        { p: [-2, -1], q: [2, 2], color: '#2563eb' },
        { p: [-2, 2], q: [2, -1.5], color: '#dc2626' }
      ],
      dot: [-0.1538, 0.3846]
    },
    {
      title: 'Párhuzamos egyenesek',
      sub: 'nincs megoldás (∅)',
      lines: [
        { p: [-2, -1.5], q: [2, 0.5], color: '#2563eb' },
        { p: [-2, 0], q: [2, 2], color: '#dc2626' }
      ]
    },
    {
      title: 'Egybeeső egyenesek',
      sub: 'végtelen sok megoldás',
      lines: [
        { p: [-2, -1.2], q: [2, 1.6], color: '#2563eb' },
        { p: [-2, -1.2], q: [2, 1.6], color: '#dc2626', dash: true }
      ]
    }
  ];
  return (
    <svg viewBox="0 0 540 190" className={className} role="img" aria-label="Két egyenes kölcsönös helyzete">
      <rect width={540} height={190} fill="#f8fafc" rx={12} />
      {panels.map((pn, k) => {
        const ox = 90 + k * 180;
        const oy = 95;
        const u = 26;
        return (
          <g key={k}>
            <rect x={ox - 80} y={30} width={160} height={130} rx={8} fill="#ffffff" stroke="#e2e8f0" />
            {pn.lines.map((ln, i) => {
              const c = liClipLine(ln.p, ln.q, -2.8, 2.8, -2.2, 2.2);
              if (!c) return null;
              return (
                <line
                  key={i}
                  x1={ox + c[0][0] * u}
                  y1={oy - c[0][1] * u}
                  x2={ox + c[1][0] * u}
                  y2={oy - c[1][1] * u}
                  stroke={ln.color}
                  strokeWidth={ln.dash ? 2.5 : 3}
                  strokeDasharray={ln.dash ? '8 6' : undefined}
                  strokeLinecap="round"
                />
              );
            })}
            {pn.dot && <circle cx={ox + pn.dot[0] * u} cy={oy - pn.dot[1] * u} r={5} fill="#7c3aed" />}
            <text x={ox} y={20} fontSize={13} fontWeight="bold" fill="#0f172a" textAnchor="middle">{pn.title}</text>
            <text x={ox} y={178} fontSize={11} fill="#334155" textAnchor="middle">{pn.sub}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Feladat 3.: az AB oldalegyenes és a C-ből induló súlyvonal metszéspontja az AB oldal felezőpontja. */
export const LineIntersectionMedianSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <LineIntersectionPlane
    xMin={-8}
    xMax={3}
    yMin={-10}
    yMax={8}
    unit={16}
    ticks="none"
    className={className}
    polygons={[{ pts: [[-5.5, -8.5], [-2.5, -1.5], [0, 7]], fill: 'rgba(37,99,235,0.07)', stroke: '#94a3b8' }]}
    lines={[
      { p: [-5.5, -8.5], q: [-2.5, -1.5], color: '#2563eb', label: '7x − 3y = −13', labelAt: 0.9, labelDx: -104, labelDy: 2 },
      { p: [0, 7], q: [-4, -5], color: '#dc2626', label: '−6x + 2y = 14', labelAt: 0.92, labelDx: -100, labelDy: 0, dashed: true }
    ]}
    points={[
      { at: [-5.5, -8.5], label: 'A', dx: 6, dy: 6 },
      { at: [-2.5, -1.5], label: 'B', dx: 6, dy: 8 },
      { at: [0, 7], label: 'C', dx: 6, dy: 0 },
      { at: [-4, -5], label: 'F = ?', color: '#7c3aed', dx: 8, dy: 6 }
    ]}
  />
);
