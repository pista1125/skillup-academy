import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export type SPt = [number, number];

export interface SlopePlaneLine {
  /** Két pont az egyenesen (matematikai koordinátákban); az egyenest a keretre vágjuk. */
  p: SPt;
  q: SPt;
  color?: string;
  label?: string;
  /** A címke helye a levágott szakasz mentén (0…1). */
  labelAt?: number;
  labelDx?: number;
  labelDy?: number;
  dashed?: boolean;
  width?: number;
}

export interface SlopePlaneSeg {
  from: SPt;
  to: SPt;
  color?: string;
  dashed?: boolean;
  width?: number;
  arrow?: boolean;
  label?: string;
  labelDx?: number;
  labelDy?: number;
}

export interface SlopePlanePoint {
  at: SPt;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
  hollow?: boolean;
}

export interface SlopePlaneText {
  at: SPt;
  text: string;
  color?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  dx?: number;
  dy?: number;
  bold?: boolean;
}

export interface SlopePlaneAngle {
  /** Csúcs, és a két szárirány egy-egy pontja (matematikai koordinátákban). */
  at: SPt;
  p: SPt;
  q: SPt;
  r?: number;
  label?: string;
  color?: string;
  /** Derékszög: negyedkörív ponttal (magyar jelölés). */
  right?: boolean;
}

export interface SlopePlaneProps {
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
  lines?: SlopePlaneLine[];
  segs?: SlopePlaneSeg[];
  points?: SlopePlanePoint[];
  texts?: SlopePlaneText[];
  angles?: SlopePlaneAngle[];
  polygons?: { pts: SPt[]; fill?: string; stroke?: string }[];
  children?: React.ReactNode;
}

const PAD = 14;

/** Egyenes (p + t(q − p)) levágása a téglalapra – Liang–Barsky. */
export const clipLine = (p: SPt, q: SPt, xMin: number, xMax: number, yMin: number, yMax: number): [SPt, SPt] | null => {
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
export const SlopeAngleMark: React.FC<{
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

export const SlopeArrowHead: React.FC<{ x1: number; y1: number; x2: number; y2: number; color: string; size?: number }> = ({
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
export const SlopeTangentPlane: React.FC<SlopePlaneProps> = ({
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
  children
}) => {
  const W = (xMax - xMin) * unit + 2 * PAD;
  const H = (yMax - yMin) * unit + 2 * PAD;
  const X = (x: number) => PAD + (x - xMin) * unit;
  const Y = (y: number) => PAD + (yMax - y) * unit;
  const P = (p: SPt) => ({ x: X(p[0]), y: Y(p[1]) });
  const xs: number[] = [];
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i++) xs.push(i);
  const ys: number[] = [];
  for (let j = Math.ceil(yMin); j <= Math.floor(yMax); j++) ys.push(j);
  const showAxes = axes && xMin <= 0 && xMax >= 0 && yMin <= 0 && yMax >= 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img">
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
          <SlopeArrowHead x1={X(xMin)} y1={Y(0)} x2={X(xMax) + 8} y2={Y(0)} color="#334155" size={7} />
          <line x1={X(0)} y1={Y(yMin)} x2={X(0)} y2={Y(yMax) - 6} stroke="#334155" strokeWidth={1.4} />
          <SlopeArrowHead x1={X(0)} y1={Y(yMin)} x2={X(0)} y2={Y(yMax) - 8} color="#334155" size={7} />
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
        const c = clipLine(ln.p, ln.q, xMin, xMax, yMin, yMax);
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
            {s.arrow && <SlopeArrowHead x1={a.x} y1={a.y} x2={b.x} y2={b.y} color={color} />}
            {s.label && (
              <text x={(a.x + b.x) / 2 + (s.labelDx ?? 0)} y={(a.y + b.y) / 2 + (s.labelDy ?? 0)} fontSize={11} fontWeight="bold" fill={color} textAnchor="middle">
                {s.label}
              </text>
            )}
          </g>
        );
      })}
      {angles.map((an, i) => (
        <SlopeAngleMark key={'an' + i} V={P(an.at)} P={P(an.p)} Q={P(an.q)} r={an.r} right={an.right} color={an.color} label={an.label} />
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

/** Bevezető: a 12%-os emelkedő derékszögű háromszöge. */
export const SlopeTangentRoadSignSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const A = { x: 60, y: 170 };
  const B = { x: 400, y: 170 };
  const C = { x: 400, y: 170 - 0.12 * 340 * 2.2 };
  return (
    <svg viewBox="0 0 520 220" className={className} role="img" aria-label="12 százalékos emelkedő">
      <rect width={520} height={220} fill="#f8fafc" rx={12} />
      <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill="rgba(37,99,235,0.08)" stroke="#1e3a8a" strokeWidth={2} />
      <line x1={A.x - 30} y1={A.y + 10} x2={C.x + 40} y2={C.y - 12} stroke="#64748b" strokeWidth={5} strokeLinecap="round" opacity={0.25} />
      <SlopeAngleMark V={A} P={B} Q={C} r={46} color="#dc2626" label="α" />
      <SlopeAngleMark V={B} P={A} Q={C} r={14} right color="#0f172a" />
      <text x={(A.x + B.x) / 2} y={A.y + 22} fontSize={14} fontWeight="bold" fill="#1e3a8a" textAnchor="middle">100 m (vízszintes)</text>
      <text x={B.x + 10} y={(B.y + C.y) / 2 + 5} fontSize={14} fontWeight="bold" fill="#1e3a8a">12 m</text>
      {/* Tábla */}
      <g transform="translate(450 60)">
        <polygon points="0,-40 36,26 -36,26" fill="#ffffff" stroke="#dc2626" strokeWidth={6} strokeLinejoin="round" />
        <polygon points="-18,16 18,16 18,-6" fill="#0f172a" />
        <text x={-4} y={10} fontSize={11} fontWeight="bold" fill="#0f172a" textAnchor="middle">12%</text>
      </g>
      <text x={60} y={36} fontSize={13} fill="#334155">tg α = 12/100 = 0,12  ⇒  α ≈ 6,84°</text>
    </svg>
  );
};

/** Meredekség két pontból: Δx és Δy a derékszögű háromszögben. */
export const SlopeTangentRiseRunSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <SlopeTangentPlane
    xMin={-1}
    xMax={8}
    yMin={-1}
    yMax={6}
    unit={34}
    className={className}
    lines={[{ p: [1, 1], q: [5, 4], color: '#2563eb', label: 'e', labelAt: 0.92 }]}
    segs={[
      { from: [1, 1], to: [5, 1], color: '#059669', width: 2.4, label: 'Δx = x₂ − x₁ = 4', labelDy: 16 },
      { from: [5, 1], to: [5, 4], color: '#dc2626', width: 2.4 }
    ]}
    angles={[
      { at: [5, 1], p: [1, 1], q: [5, 4], right: true, r: 13 },
      { at: [1, 1], p: [5, 1], q: [5, 4], r: 30, label: 'α', color: '#7c3aed' }
    ]}
    points={[
      { at: [1, 1], label: 'A(1; 1)', dx: -20, dy: -10 },
      { at: [5, 4], label: 'B(5; 4)', dx: -58, dy: -6 }
    ]}
    texts={[
      { at: [5, 2.5], text: 'Δy = 3', color: '#dc2626', anchor: 'start', dx: 8 },
      { at: [3.5, 5.3], text: 'm = Δy / Δx = 3/4 = tg α', color: '#1e3a8a', size: 12 }
    ]}
  />
);

/** Kidolgozott feladat 4.: a 3x − 2y = −6 egyenes és a PQR háromszög. */
export const SlopeTangentWorkedAngleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <SlopeTangentPlane
    xMin={-4}
    xMax={3}
    yMin={-1}
    yMax={6}
    unit={34}
    className={className}
    lines={[{ p: [-2, 0], q: [0, 3], color: '#2563eb' }]}
    segs={[
      { from: [1, 4.5], to: [2, 4.5], color: '#059669', width: 2.4, label: '1', labelDy: 16 },
      { from: [2, 4.5], to: [2, 6], color: '#dc2626', width: 2.4 }
    ]}
    angles={[
      { at: [2, 4.5], p: [1, 4.5], q: [2, 6], right: true, r: 11 },
      { at: [1, 4.5], p: [2, 4.5], q: [2, 6], r: 20, label: 'α', color: '#7c3aed' },
      { at: [-2, 0], p: [0, 0], q: [0, 3], r: 22, label: 'α', color: '#7c3aed' }
    ]}
    points={[
      { at: [1, 4.5], label: 'P', dx: -14, dy: -4 },
      { at: [2, 4.5], label: 'Q', dx: 4, dy: 14 },
      { at: [2, 6], label: 'R', dx: 6, dy: 10 },
      { at: [0, 3], label: '(0; 3)', dx: 6, dy: 12 },
      { at: [-2, 0], label: '(−2; 0)', dx: -24, dy: 16 }
    ]}
    texts={[
      { at: [2, 5.25], text: '3/2', color: '#dc2626', anchor: 'start', dx: 6 },
      { at: [-2.2, 4.6], text: '3x − 2y = −6', color: '#2563eb', size: 12 }
    ]}
  />
);

/** Elmélet: előjeles irányszög – e (≈ 25°) és f (≈ −41°). */
export const SlopeTangentInclinationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const me = Math.tan((25 * Math.PI) / 180);
  const mf = Math.tan((-41 * Math.PI) / 180);
  return (
    <SlopeTangentPlane
      xMin={-2}
      xMax={8}
      yMin={-4}
      yMax={4}
      unit={30}
      ticks="unit"
      className={className}
      lines={[
        { p: [-1, -2 * me], q: [7, 6 * me], color: '#2563eb', label: 'e', labelAt: 0.95 },
        { p: [1, 0], q: [6, 5 * mf], color: '#dc2626', label: 'f', labelAt: 0.9, labelDx: 8, labelDy: 4 }
      ]}
      angles={[
        { at: [1, 0], p: [3, 0], q: [3, 2 * me], r: 40, label: '+25°', color: '#2563eb' },
        { at: [1, 0], p: [3, 0], q: [3, 2 * mf], r: 30, label: '−41°', color: '#dc2626' }
      ]}
      points={[{ at: [1, 0], color: '#0f172a' }]}
      texts={[
        { at: [4.6, 3.4], text: 'e: φ ≈ 25°, m = tg 25° ≈ 0,47', color: '#2563eb', size: 11 },
        { at: [4.6, -3.4], text: 'f: ψ ≈ −41°, m = tg(−41°) ≈ −0,87', color: '#dc2626', size: 11 }
      ]}
    />
  );
};

/** A meredekség előjele: emelkedő, csökkenő, vízszintes és függőleges egyenes. */
export const SlopeTangentSignsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const panels: { title: string; sub: string; p: SPt; q: SPt; color: string }[] = [
    { title: 'm > 0', sub: 'emelkedő, 0° < α < 90°', p: [-2, -1], q: [2, 2], color: '#059669' },
    { title: 'm < 0', sub: 'csökkenő, −90° < α < 0°', p: [-2, 2], q: [2, -1], color: '#dc2626' },
    { title: 'm = 0', sub: 'vízszintes, α = 0°', p: [-2, 1], q: [2, 1], color: '#2563eb' },
    { title: 'nincs m', sub: 'függőleges (x = c), α = 90°', p: [1, -2], q: [1, 2], color: '#7c3aed' }
  ];
  return (
    <svg viewBox="0 0 560 190" className={className} role="img" aria-label="Meredekség előjele">
      <rect width={560} height={190} fill="#f8fafc" rx={12} />
      {panels.map((pn, k) => {
        const ox = 70 + k * 140;
        const oy = 90;
        const u = 22;
        const c = clipLine(pn.p, pn.q, -2.6, 2.6, -2.2, 2.2);
        return (
          <g key={k}>
            <line x1={ox - 2.6 * u} y1={oy} x2={ox + 2.6 * u} y2={oy} stroke="#94a3b8" />
            <line x1={ox} y1={oy + 2.2 * u} x2={ox} y2={oy - 2.2 * u} stroke="#94a3b8" />
            {c && (
              <line
                x1={ox + c[0][0] * u}
                y1={oy - c[0][1] * u}
                x2={ox + c[1][0] * u}
                y2={oy - c[1][1] * u}
                stroke={pn.color}
                strokeWidth={3}
                strokeLinecap="round"
              />
            )}
            <text x={ox} y={20} fontSize={14} fontWeight="bold" fill={pn.color} textAnchor="middle">{pn.title}</text>
            <text x={ox} y={175} fontSize={10} fill="#334155" textAnchor="middle">{pn.sub}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Kidolgozott feladat 1.: hat létra – Δy és Δx leolvasása. */
export const SlopeTangentLaddersSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cases: { name: string; p: SPt; q: SPt; info: string }[] = [
    { name: 'A', p: [2, 0], q: [4, 6], info: 'm = 6/2 = 3' },
    { name: 'B', p: [0, 0], q: [0, 5], info: 'nincs m' },
    { name: 'D', p: [0, 3], q: [2.5, 3], info: 'm = 0' },
    { name: 'F', p: [0, 3], q: [0.8, 0], info: 'm = −3/0,8 = −3,75' }
  ];
  return (
    <svg viewBox="0 0 560 200" className={className} role="img" aria-label="Létrák meredeksége">
      <rect width={560} height={200} fill="#f8fafc" rx={12} />
      {cases.map((c, k) => {
        const ox = 30 + k * 140;
        const oy = 160;
        const u = 20;
        const X = (x: number) => ox + x * u;
        const Y = (y: number) => oy - y * u;
        return (
          <g key={c.name}>
            <line x1={X(-0.5)} y1={Y(0)} x2={X(5)} y2={Y(0)} stroke="#94a3b8" />
            <line x1={X(0)} y1={Y(-0.3)} x2={X(0)} y2={Y(6.5)} stroke="#94a3b8" />
            <line x1={X(c.p[0])} y1={Y(c.p[1])} x2={X(c.q[0])} y2={Y(c.q[1])} stroke="#b45309" strokeWidth={5} strokeLinecap="round" />
            <circle cx={X(c.p[0])} cy={Y(c.p[1])} r={3.5} fill="#dc2626" />
            <circle cx={X(c.q[0])} cy={Y(c.q[1])} r={3.5} fill="#dc2626" />
            <text x={X(2.2)} y={190} fontSize={13} fontWeight="bold" fill="#0f172a" textAnchor="middle">{c.name}</text>
            <text x={X(2.6)} y={Y(6.2)} fontSize={10} fill="#1e3a8a" textAnchor="middle">{c.info}</text>
          </g>
        );
      })}
    </svg>
  );
};
