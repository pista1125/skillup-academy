import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

/* ------------------------------------------------------------------ */
/*  Közös koordináta-rendszer komponens (a 7–9. lecke ábráihoz)        */
/* ------------------------------------------------------------------ */

export type CP = [number, number];

export interface PlanePoint {
  at: CP;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
  r?: number;
  hollow?: boolean;
}

export interface PlaneSeg {
  from: CP;
  to: CP;
  color?: string;
  dashed?: boolean;
  width?: number;
}

export interface PlaneVec {
  from: CP;
  to: CP;
  color?: string;
  /** Kisbetűs vektornév (pl. „a”, „f”) – a betű fölé kis nyíl kerül. */
  label?: string;
  /** Címke-eltolás képpontban a vektor felezőpontjához képest. */
  lx?: number;
  ly?: number;
  width?: number;
  dashed?: boolean;
}

export interface PlaneLine {
  /** Az egyenes egy pontja és egy vele párhuzamos vektor. */
  p: CP;
  d: CP;
  color?: string;
  label?: string;
  /** A címke helye az egyenes látható részén (0–1). */
  labelAt?: number;
  lx?: number;
  ly?: number;
  dashed?: boolean;
  width?: number;
}

export interface PlanePoly {
  pts: CP[];
  fill?: string;
  stroke?: string;
  dashed?: boolean;
}

export interface PlaneText {
  at: CP;
  text: string;
  color?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
  bold?: boolean;
}

export interface PlaneRightAngle {
  at: CP;
  p: CP;
  q: CP;
  r?: number;
  color?: string;
}

/** Vektornév SVG-ben: a betű(k) fölé vízszintes nyíl kerül. */
export const MidpointVecLabel: React.FC<{ x: number; y: number; text: string; color?: string; size?: number }> = ({
  x,
  y,
  text,
  color = '#0f172a',
  size = 12
}) => {
  const w = Math.max(size * 0.55, text.length * size * 0.55);
  const top = y - size * 0.95;
  return (
    <g>
      <text x={x} y={y} fontSize={size} fontWeight="bold" fontStyle="italic" textAnchor="middle" fill={color}>
        {text}
      </text>
      <line x1={x - w / 2} y1={top} x2={x + w / 2 - 2} y2={top} stroke={color} strokeWidth={1} />
      <polygon points={`${x + w / 2},${top} ${x + w / 2 - 3.2},${top - 1.8} ${x + w / 2 - 3.2},${top + 1.8}`} fill={color} />
    </g>
  );
};

/** Nyíl képpont-koordinátákban. */
export const MidpointArrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  width?: number;
  dashed?: boolean;
  head?: number;
}> = ({ x1, y1, x2, y2, color = '#2563eb', width = 2.2, dashed = false, head = 9 }) => {
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
        strokeLinecap="round"
        strokeDasharray={dashed ? '5 4' : undefined}
      />
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
    </g>
  );
};

/** Egyenes látható szakasza a [x0;x1]×[y0;y1] ablakban (paraméteres vágás). */
export const clipLine = (p: CP, d: CP, xr: [number, number], yr: [number, number]): [CP, CP] | null => {
  let t0 = -Infinity;
  let t1 = Infinity;
  const dims: [number, number, [number, number]][] = [
    [p[0], d[0], xr],
    [p[1], d[1], yr]
  ];
  for (const [p0, dd, [lo, hi]] of dims) {
    if (Math.abs(dd) < 1e-12) {
      if (p0 < lo || p0 > hi) return null;
    } else {
      let a = (lo - p0) / dd;
      let b = (hi - p0) / dd;
      if (a > b) [a, b] = [b, a];
      t0 = Math.max(t0, a);
      t1 = Math.min(t1, b);
    }
  }
  if (t0 > t1) return null;
  return [
    [p[0] + t0 * d[0], p[1] + t0 * d[1]],
    [p[0] + t1 * d[0], p[1] + t1 * d[1]]
  ];
};

export interface MidpointPlaneProps {
  x: [number, number];
  y: [number, number];
  /** Egy egység képpontban. */
  unit?: number;
  /** Rácsvonalak sűrűsége egységben (0 = nincs rács). */
  grid?: number;
  /** Tengelyfeliratok lépésköze egységben (0 = csak az 1-es egység, negatív = nincs felirat). */
  labels?: number;
  pad?: number;
  points?: PlanePoint[];
  segs?: PlaneSeg[];
  vecs?: PlaneVec[];
  lines?: PlaneLine[];
  polys?: PlanePoly[];
  texts?: PlaneText[];
  rightAngles?: PlaneRightAngle[];
  className?: string;
  children?: (px: (p: CP) => { x: number; y: number }) => React.ReactNode;
}

/**
 * Derékszögű koordináta-rendszer (tengelyek, rács, O, x, y) matematikai koordinátákban
 * megadott pontokkal, szakaszokkal, vektorokkal és egyenesekkel.
 */
export const MidpointPlane: React.FC<MidpointPlaneProps> = ({
  x: xr,
  y: yr,
  unit = 20,
  grid = 1,
  labels = 0,
  pad = 14,
  points = [],
  segs = [],
  vecs = [],
  lines = [],
  polys = [],
  texts = [],
  rightAngles = [],
  className = 'w-full max-w-[300px] h-auto mx-auto',
  children
}) => {
  const W = (xr[1] - xr[0]) * unit + 2 * pad;
  const H = (yr[1] - yr[0]) * unit + 2 * pad;
  const px = (p: CP) => ({ x: pad + (p[0] - xr[0]) * unit, y: pad + (yr[1] - p[1]) * unit });
  const O = px([0, 0]);
  const gridLines: React.ReactNode[] = [];
  if (grid > 0) {
    for (let gx = Math.ceil(xr[0] / grid) * grid; gx <= xr[1] + 1e-9; gx += grid) {
      const X = px([gx, 0]).x;
      gridLines.push(<line key={'gx' + gx} x1={X} y1={pad} x2={X} y2={H - pad} stroke="#e2e8f0" strokeWidth={1} />);
    }
    for (let gy = Math.ceil(yr[0] / grid) * grid; gy <= yr[1] + 1e-9; gy += grid) {
      const Y = px([0, gy]).y;
      gridLines.push(<line key={'gy' + gy} x1={pad} y1={Y} x2={W - pad} y2={Y} stroke="#e2e8f0" strokeWidth={1} />);
    }
  }
  const tickLabels: React.ReactNode[] = [];
  const step = labels > 0 ? labels : 0;
  const xs: number[] = [];
  const ys: number[] = [];
  if (step > 0) {
    for (let v = Math.ceil(xr[0] / step) * step; v <= xr[1] - 0.5 + 1e-9; v += step) if (Math.abs(v) > 1e-9) xs.push(v);
    for (let v = Math.ceil(yr[0] / step) * step; v <= yr[1] - 0.5 + 1e-9; v += step) if (Math.abs(v) > 1e-9) ys.push(v);
  } else if (labels === 0) {
    if (xr[1] >= 1.5) xs.push(1);
    if (yr[1] >= 1.5) ys.push(1);
  }
  xs.forEach((v) => {
    const P = px([v, 0]);
    tickLabels.push(
      <g key={'tx' + v}>
        <line x1={P.x} y1={P.y - 3} x2={P.x} y2={P.y + 3} stroke="#475569" strokeWidth={1} />
        <text x={P.x} y={P.y + 12} fontSize={8.5} textAnchor="middle" fill="#64748b">
          {String(v).replace('-', '−').replace('.', ',')}
        </text>
      </g>
    );
  });
  ys.forEach((v) => {
    const P = px([0, v]);
    tickLabels.push(
      <g key={'ty' + v}>
        <line x1={P.x - 3} y1={P.y} x2={P.x + 3} y2={P.y} stroke="#475569" strokeWidth={1} />
        <text x={P.x - 5} y={P.y + 3} fontSize={8.5} textAnchor="end" fill="#64748b">
          {String(v).replace('-', '−').replace('.', ',')}
        </text>
      </g>
    );
  });

  const showYAxis = xr[0] <= 0 && xr[1] >= 0;
  const showXAxis = yr[0] <= 0 && yr[1] >= 0;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img">
      <rect x={0} y={0} width={W} height={H} rx={10} fill="#ffffff" />
      {gridLines}
      {showXAxis && <MidpointArrow x1={pad - 4} y1={O.y} x2={W - 4} y2={O.y} color="#334155" width={1.3} head={7} />}
      {showYAxis && <MidpointArrow x1={O.x} y1={H - pad + 4} x2={O.x} y2={4} color="#334155" width={1.3} head={7} />}
      {showXAxis && (
        <text x={W - 8} y={O.y + 13} fontSize={11} fontStyle="italic" fill="#334155" textAnchor="end">
          x
        </text>
      )}
      {showYAxis && (
        <text x={O.x + 7} y={12} fontSize={11} fontStyle="italic" fill="#334155">
          y
        </text>
      )}
      {showXAxis && showYAxis && (
        <text x={O.x - 4} y={O.y + 12} fontSize={9.5} fill="#334155" textAnchor="end">
          O
        </text>
      )}
      {tickLabels}
      {polys.map((pg, k) => (
        <polygon
          key={'pg' + k}
          points={pg.pts.map((p) => `${px(p).x},${px(p).y}`).join(' ')}
          fill={pg.fill ?? 'none'}
          stroke={pg.stroke ?? '#64748b'}
          strokeWidth={1.5}
          strokeDasharray={pg.dashed ? '4 3' : undefined}
        />
      ))}
      {lines.map((ln, k) => {
        const c = clipLine(ln.p, ln.d, xr, yr);
        if (!c) return null;
        const A = px(c[0]);
        const B = px(c[1]);
        const t = ln.labelAt ?? 0.88;
        const color = ln.color ?? '#7c3aed';
        return (
          <g key={'ln' + k}>
            <line
              x1={A.x}
              y1={A.y}
              x2={B.x}
              y2={B.y}
              stroke={color}
              strokeWidth={ln.width ?? 2}
              strokeDasharray={ln.dashed ? '6 4' : undefined}
            />
            {ln.label && (
              <text
                x={A.x + (B.x - A.x) * t + (ln.lx ?? 8)}
                y={A.y + (B.y - A.y) * t + (ln.ly ?? -4)}
                fontSize={11}
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
      {segs.map((s, k) => {
        const A = px(s.from);
        const B = px(s.to);
        return (
          <line
            key={'sg' + k}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke={s.color ?? '#0f172a'}
            strokeWidth={s.width ?? 2}
            strokeDasharray={s.dashed ? '4 3' : undefined}
            strokeLinecap="round"
          />
        );
      })}
      {rightAngles.map((ra, k) => {
        const V = px(ra.at);
        const P = px(ra.p);
        const Q = px(ra.q);
        const n1 = Math.hypot(P.x - V.x, P.y - V.y) || 1;
        const n2 = Math.hypot(Q.x - V.x, Q.y - V.y) || 1;
        const u1 = { x: (P.x - V.x) / n1, y: (P.y - V.y) / n1 };
        const u2 = { x: (Q.x - V.x) / n2, y: (Q.y - V.y) / n2 };
        const r = ra.r ?? 12;
        const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
        const bx = u1.x + u2.x;
        const by = u1.y + u2.y;
        const bl = Math.hypot(bx, by) || 1;
        const color = ra.color ?? '#475569';
        return (
          <g key={'ra' + k}>
            <path
              d={`M ${V.x + r * u1.x} ${V.y + r * u1.y} A ${r} ${r} 0 0 ${sweep} ${V.x + r * u2.x} ${V.y + r * u2.y}`}
              fill="none"
              stroke={color}
              strokeWidth={1.3}
            />
            <circle cx={V.x + (0.55 * r * bx) / bl} cy={V.y + (0.55 * r * by) / bl} r={1.7} fill={color} />
          </g>
        );
      })}
      {vecs.map((v, k) => {
        const A = px(v.from);
        const B = px(v.to);
        const color = v.color ?? '#2563eb';
        return (
          <g key={'vc' + k}>
            <MidpointArrow x1={A.x} y1={A.y} x2={B.x} y2={B.y} color={color} width={v.width} dashed={v.dashed} />
            {v.label && (
              <MidpointVecLabel x={(A.x + B.x) / 2 + (v.lx ?? -8)} y={(A.y + B.y) / 2 + (v.ly ?? -6)} text={v.label} color={color} />
            )}
          </g>
        );
      })}
      {children && children(px)}
      {points.map((p, k) => {
        const P = px(p.at);
        const color = p.color ?? '#0f172a';
        return (
          <g key={'pt' + k}>
            <circle
              cx={P.x}
              cy={P.y}
              r={p.r ?? 3.2}
              fill={p.hollow ? '#ffffff' : color}
              stroke={color}
              strokeWidth={p.hollow ? 1.6 : 0}
            />
            {p.label && (
              <text x={P.x + (p.dx ?? 0)} y={P.y + (p.dy ?? -7)} fontSize={10.5} fontWeight="bold" textAnchor="middle" fill={color}>
                {p.label}
              </text>
            )}
          </g>
        );
      })}
      {texts.map((t, k) => {
        const P = px(t.at);
        return (
          <text
            key={'tt' + k}
            x={P.x + (t.dx ?? 0)}
            y={P.y + (t.dy ?? 0)}
            fontSize={t.size ?? 10}
            fontWeight={t.bold ? 'bold' : 'normal'}
            textAnchor={t.anchor ?? 'middle'}
            fill={t.color ?? '#334155'}
          >
            {t.text}
          </text>
        );
      })}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/*  A 7. lecke (Felezőpont) ábrái                                      */
/* ------------------------------------------------------------------ */

const BLUE = '#2563eb';
const RED = '#dc2626';
const GREEN = '#059669';
const PURPLE = '#7c3aed';
const AMBER = '#b45309';

// 1. ábra: Bevezető – a mozgólépcső A(0; −2) → B(12; 4), felezőpont F(6; 1)
export const EscalatorMidpointSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-2, 14]}
    y={[-4, 6]}
    unit={26}
    labels={2}
    className={className}
    polys={[{ pts: [[-2, 0], [14, 0], [14, -0.12], [-2, -0.12]], fill: '#cbd5e1', stroke: 'none' }]}
    segs={[
      { from: [0, -2], to: [12, 4], color: BLUE, width: 4 },
      { from: [6, 1], to: [6, 0], color: '#94a3b8', dashed: true, width: 1.4 },
      { from: [6, 1], to: [0, 1], color: '#94a3b8', dashed: true, width: 1.4 }
    ]}
    points={[
      { at: [0, -2], label: 'A(0; −2)', dx: 30, dy: 12, color: BLUE },
      { at: [12, 4], label: 'B(12; 4)', dx: -6, dy: -9, color: BLUE },
      { at: [6, 1], label: 'F(6; 1)', dx: -4, dy: -10, color: RED, r: 4 }
    ]}
    texts={[
      { at: [9.5, 0.5], text: 'utcaszint', color: '#475569', size: 10 },
      { at: [3, -3.2], text: '30 s alatt A-ból B-be; 15 s után F-ben', color: '#475569', size: 10 }
    ]}
  />
);

// 2. ábra: Kidolgozott feladat – AOBP paralelogramma, →f = ½(→a + →b)
export const MidpointParallelogramSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-6, 12]}
    y={[-1, 11]}
    unit={22}
    labels={2}
    className={className}
    polys={[{ pts: [[0, 0], [-4, 3], [6, 10], [10, 7]], fill: 'rgba(37,99,235,0.06)', stroke: '#94a3b8', dashed: true }]}
    segs={[{ from: [-4, 3], to: [10, 7], color: '#0f172a', width: 2 }]}
    vecs={[
      { from: [0, 0], to: [-4, 3], color: BLUE, label: 'a', lx: -4, ly: 14 },
      { from: [0, 0], to: [10, 7], color: GREEN, label: 'b', lx: 10, ly: 12 },
      { from: [0, 0], to: [6, 10], color: PURPLE, label: 'a+b', lx: 20, ly: -2, dashed: true, width: 1.6 },
      { from: [0, 0], to: [3, 5], color: RED, label: 'f', lx: -10, ly: -2, width: 2.8 }
    ]}
    points={[
      { at: [-4, 3], label: 'A(−4; 3)', dx: -6, dy: -9 },
      { at: [10, 7], label: 'B(10; 7)', dx: 4, dy: -9 },
      { at: [6, 10], label: 'P(6; 10)', dx: -30, dy: 2 },
      { at: [3, 5], label: 'F', dx: 9, dy: -5, color: RED, r: 4 }
    ]}
  />
);

// 3. ábra: Elmélet – a felezőpont koordinátái általánosan
export const MidpointFormulaSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-1, 11]}
    y={[-1, 8]}
    unit={30}
    grid={0}
    className={className}
    segs={[
      { from: [1.5, 6.5], to: [9, 2], color: '#0f172a', width: 2.4 },
      { from: [1.5, 6.5], to: [1.5, 0], color: '#cbd5e1', dashed: true, width: 1.2 },
      { from: [9, 2], to: [9, 0], color: '#cbd5e1', dashed: true, width: 1.2 },
      { from: [5.25, 4.25], to: [5.25, 0], color: RED, dashed: true, width: 1.2 },
      { from: [1.5, 6.5], to: [0, 6.5], color: '#cbd5e1', dashed: true, width: 1.2 },
      { from: [9, 2], to: [0, 2], color: '#cbd5e1', dashed: true, width: 1.2 },
      { from: [5.25, 4.25], to: [0, 4.25], color: RED, dashed: true, width: 1.2 }
    ]}
    points={[
      { at: [1.5, 6.5], label: 'A(a₁; a₂)', dx: 18, dy: -9, color: BLUE },
      { at: [9, 2], label: 'B(b₁; b₂)', dx: 6, dy: -10, color: GREEN },
      { at: [5.25, 4.25], label: 'F', dx: 8, dy: -8, color: RED, r: 4 }
    ]}
    texts={[
      { at: [1.5, 0], text: 'a₁', dy: 14, color: BLUE },
      { at: [9, 0], text: 'b₁', dy: 14, color: GREEN },
      { at: [5.25, 0], text: 'átlag', dy: 14, color: RED },
      { at: [0, 6.5], text: 'a₂', dx: -10, dy: 4, color: BLUE },
      { at: [0, 2], text: 'b₂', dx: -10, dy: 4, color: GREEN },
      { at: [0, 4.25], text: 'átlag', dx: -6, dy: 4, color: RED, anchor: 'end' }
    ]}
  >
    {(px) => {
      const P = px([7.2, 6.6]);
      const fr = (cx: number, top: string, bottom: string, color: string) => (
        <g>
          <text x={cx} y={P.y - 4} fontSize={11} textAnchor="middle" fill={color}>
            {top}
          </text>
          <line x1={cx - 24} y1={P.y} x2={cx + 24} y2={P.y} stroke={color} strokeWidth={1} />
          <text x={cx} y={P.y + 12} fontSize={11} textAnchor="middle" fill={color}>
            {bottom}
          </text>
        </g>
      );
      return (
        <g>
          <text x={P.x - 66} y={P.y + 4} fontSize={13} fontWeight="bold" fill={RED}>
            F(
          </text>
          {fr(P.x - 22, 'a₁ + b₁', '2', RED)}
          <text x={P.x + 4} y={P.y + 4} fontSize={13} fontWeight="bold" fill={RED}>
            ;
          </text>
          {fr(P.x + 38, 'a₂ + b₂', '2', RED)}
          <text x={P.x + 64} y={P.y + 4} fontSize={13} fontWeight="bold" fill={RED}>
            )
          </text>
        </g>
      );
    }}
  </MidpointPlane>
);

// 4. ábra: 1. feladat – P(−4; 16), Q(20; −2), F felezőpont, N negyedelőpont
export const QuarterPointsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-6, 22]}
    y={[-4, 18]}
    unit={13}
    grid={2}
    labels={4}
    className={className}
    segs={[{ from: [-4, 16], to: [20, -2], color: '#0f172a', width: 2.4 }]}
    points={[
      { at: [-4, 16], label: 'P(−4; 16)', dx: 30, dy: -4 },
      { at: [20, -2], label: 'Q(20; −2)', dx: -4, dy: 14 },
      { at: [2, 11.5], label: 'N₁', dx: 10, dy: -6, color: '#64748b', hollow: true },
      { at: [8, 7], label: 'F(8; 7)', dx: 22, dy: -6, color: RED, r: 4 },
      { at: [14, 2.5], label: 'N(14; 2,5)', dx: 30, dy: -6, color: PURPLE, r: 4 }
    ]}
    texts={[{ at: [8, -3], text: 'PQ negyedelőpontjai: N₁, F, N', color: '#475569', size: 10 }]}
  />
);

// 5. ábra: Súlypont – A(−6; 2), B(2; 0), C(1; 7), súlyvonalak, S(−1; 3)
export const CentroidSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-8, 4]}
    y={[-1, 9]}
    unit={28}
    labels={2}
    className={className}
    polys={[{ pts: [[-6, 2], [2, 0], [1, 7]], fill: 'rgba(5,150,105,0.08)', stroke: GREEN }]}
    segs={[
      { from: [-6, 2], to: [1.5, 3.5], color: AMBER, dashed: true, width: 1.6 },
      { from: [2, 0], to: [-2.5, 4.5], color: AMBER, dashed: true, width: 1.6 },
      { from: [1, 7], to: [-2, 1], color: AMBER, dashed: true, width: 1.6 }
    ]}
    points={[
      { at: [-6, 2], label: 'A(−6; 2)', dx: 2, dy: 14 },
      { at: [2, 0], label: 'B(2; 0)', dx: 8, dy: 14 },
      { at: [1, 7], label: 'C(1; 7)', dx: 24, dy: 0 },
      { at: [1.5, 3.5], label: 'F', dx: 9, dy: 2, color: AMBER },
      { at: [-2.5, 4.5], label: 'G', dx: -8, dy: -6, color: AMBER },
      { at: [-2, 1], label: 'H', dx: -4, dy: 14, color: AMBER },
      { at: [-1, 3], label: 'S(−1; 3)', dx: 2, dy: -9, color: RED, r: 4 }
    ]}
  />
);

// 6. ábra: Ráadás – csúcsok az oldalfelező pontokból (P, Q, R)
export const VerticesFromMidpointsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <MidpointPlane
    x={[-9, 7]}
    y={[-8, 2]}
    unit={22}
    labels={2}
    className={className}
    polys={[
      { pts: [[5, -6], [-7, 0], [3, -2]], fill: 'rgba(37,99,235,0.06)', stroke: BLUE },
      { pts: [[4, -4], [-1, -3], [-2, -1]], fill: 'rgba(220,38,38,0.06)', stroke: RED, dashed: true }
    ]}
    points={[
      { at: [5, -6], label: 'A(5; −6)', dx: -6, dy: 14, color: BLUE },
      { at: [-7, 0], label: 'B(−7; 0)', dx: 6, dy: -8, color: BLUE },
      { at: [3, -2], label: 'C(3; −2)', dx: 18, dy: -8, color: BLUE },
      { at: [4, -4], label: 'P(4; −4)', dx: 30, dy: 2, color: RED },
      { at: [-1, -3], label: 'Q(−1; −3)', dx: -6, dy: 14, color: RED },
      { at: [-2, -1], label: 'R(−2; −1)', dx: -4, dy: -8, color: RED }
    ]}
  />
);
