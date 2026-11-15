import React, { useId } from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export const CP_BLUE = '#2563eb';
export const CP_RED = '#dc2626';
export const CP_GREEN = '#059669';
export const CP_PURPLE = '#7c3aed';
export const CP_AMBER = '#d97706';
export const CP_SLATE = '#475569';

// ---------------------------------------------------------------------------
// Általános koordinátasík-komponens (ábrákhoz, kvízhez, laborokhoz)
// ---------------------------------------------------------------------------

export type CpPlanePoint = {
  x: number;
  y: number;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
  anchor?: 'start' | 'middle' | 'end';
  hollow?: boolean;
};
export type CpPlaneLine = {
  /** y = m·x + b alakú egyenes */
  m?: number;
  b?: number;
  /** függőleges egyenes: x = c */
  x?: number;
  color?: string;
  label?: string;
  /** a címke helye: az x koordináta (függőleges egyenesnél az y koordináta) */
  labelAt?: number;
  labelDx?: number;
  labelDy?: number;
  dashed?: boolean;
  width?: number;
};
export type CpPlaneSegment = { from: [number, number]; to: [number, number]; color?: string; dashed?: boolean; width?: number };
export type CpPlaneCircle = { cx: number; cy: number; r: number; color?: string; dashed?: boolean; fill?: string; width?: number };
export type CpPlaneText = { x: number; y: number; text: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; bold?: boolean; /** nyíl az első betű fölé (vektor jelölése) */ vec?: boolean };

export interface CircleProblemsPlaneProps {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  unit?: number;
  className?: string;
  lines?: CpPlaneLine[];
  segments?: CpPlaneSegment[];
  circles?: CpPlaneCircle[];
  points?: CpPlanePoint[];
  texts?: CpPlaneText[];
  /** minden hányadik egész számot írjuk ki a tengelyeken (0 = egyiket sem, csak az 1-et) */
  tickEvery?: number;
  grid?: boolean;
  onPick?: (x: number, y: number) => void;
  /** beágyazás egy nagyobb SVG-be (x, y, szélesség, magasság) */
  nest?: { x: number; y: number; width: number; height: number };
  /** derékszögjelek (negyedkörív ponttal): csúcs és a két szár egy-egy pontja, koordinátákban */
  rightAngles?: { v: [number, number]; p: [number, number]; q: [number, number]; color?: string }[];
}

const EPS = 1e-9;

/** Egy egyenes levágása a [xMin; xMax] × [yMin; yMax] téglalapra. */
const clipLine = (l: CpPlaneLine, xMin: number, xMax: number, yMin: number, yMax: number): [number, number][] | null => {
  if (l.x !== undefined) {
    if (l.x < xMin - EPS || l.x > xMax + EPS) return null;
    return [
      [l.x, yMin],
      [l.x, yMax]
    ];
  }
  const m = l.m ?? 0;
  const b = l.b ?? 0;
  const cand: [number, number][] = [
    [xMin, m * xMin + b],
    [xMax, m * xMax + b]
  ];
  if (Math.abs(m) > EPS) {
    cand.push([(yMin - b) / m, yMin]);
    cand.push([(yMax - b) / m, yMax]);
  }
  const inside = cand.filter(([x, y]) => x >= xMin - EPS && x <= xMax + EPS && y >= yMin - EPS && y <= yMax + EPS);
  if (inside.length < 2) return null;
  inside.sort((p, q) => p[0] - q[0]);
  return [inside[0], inside[inside.length - 1]];
};

export const CircleProblemsPlane: React.FC<CircleProblemsPlaneProps> = ({
  xMin,
  xMax,
  yMin,
  yMax,
  unit = 20,
  className = DEFAULT_CLASS,
  lines = [],
  segments = [],
  circles = [],
  points = [],
  texts = [],
  tickEvery = 1,
  grid = true,
  onPick,
  nest,
  rightAngles = []
}) => {
  const rawId = useId();
  const clipId = 'cpp-' + rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const pad = 14;
  const W = (xMax - xMin) * unit + 2 * pad;
  const H = (yMax - yMin) * unit + 2 * pad;
  const px = (x: number) => pad + (x - xMin) * unit;
  const py = (y: number) => pad + (yMax - y) * unit;
  const gx: number[] = [];
  for (let i = Math.ceil(xMin); i <= Math.floor(xMax); i++) gx.push(i);
  const gy: number[] = [];
  for (let i = Math.ceil(yMin); i <= Math.floor(yMax); i++) gy.push(i);
  const showX = yMin <= 0 && yMax >= 0;
  const showY = xMin <= 0 && xMax >= 0;
  const tick = (v: number) => (tickEvery > 0 ? v !== 0 && v % tickEvery === 0 : v === 1);

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onPick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const sx = ((e.clientX - rect.left) / rect.width) * W;
    const sy = ((e.clientY - rect.top) / rect.height) * H;
    const x = Math.round(xMin + (sx - pad) / unit);
    const y = Math.round(yMax - (sy - pad) / unit);
    onPick(Math.max(xMin, Math.min(xMax, x)), Math.max(yMin, Math.min(yMax, y)));
  };

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={nest ? undefined : className}
      {...(nest ?? {})}
      onClick={onPick ? handleClick : undefined}
      style={onPick ? { cursor: 'crosshair' } : undefined}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={pad} y={pad} width={W - 2 * pad} height={H - 2 * pad} />
        </clipPath>
      </defs>
      <rect x={0} y={0} width={W} height={H} fill="#ffffff" />
      {grid && (
        <g stroke="#e2e8f0" strokeWidth={0.8}>
          {gx.map((i) => (
            <line key={'gx' + i} x1={px(i)} y1={py(yMin)} x2={px(i)} y2={py(yMax)} />
          ))}
          {gy.map((i) => (
            <line key={'gy' + i} x1={px(xMin)} y1={py(i)} x2={px(xMax)} y2={py(i)} />
          ))}
        </g>
      )}
      {showX && (
        <g>
          <line x1={px(xMin) - 6} y1={py(0)} x2={px(xMax) + 8} y2={py(0)} stroke="#334155" strokeWidth={1.2} />
          <path d={`M ${px(xMax) + 8} ${py(0)} l -6 -3 l 0 6 z`} fill="#334155" />
          <text x={px(xMax) + 6} y={py(0) + 12} fontSize={9} fill="#334155" fontStyle="italic" textAnchor="end">x</text>
        </g>
      )}
      {showY && (
        <g>
          <line x1={px(0)} y1={py(yMin) + 6} x2={px(0)} y2={py(yMax) - 8} stroke="#334155" strokeWidth={1.2} />
          <path d={`M ${px(0)} ${py(yMax) - 8} l -3 6 l 6 0 z`} fill="#334155" />
          <text x={px(0) + 6} y={py(yMax) - 2} fontSize={9} fill="#334155" fontStyle="italic">y</text>
        </g>
      )}
      {showX &&
        gx.filter(tick).map((i) => (
          <g key={'tx' + i}>
            <line x1={px(i)} y1={py(0) - 2} x2={px(i)} y2={py(0) + 2} stroke="#334155" />
            <text x={px(i)} y={py(0) + 10} fontSize={7.5} fill="#64748b" textAnchor="middle">{String(i).replace('-', '−')}</text>
          </g>
        ))}
      {showY &&
        gy.filter(tick).map((i) => (
          <g key={'ty' + i}>
            <line x1={px(0) - 2} y1={py(i)} x2={px(0) + 2} y2={py(i)} stroke="#334155" />
            <text x={px(0) - 4} y={py(i) + 2.5} fontSize={7.5} fill="#64748b" textAnchor="end">{String(i).replace('-', '−')}</text>
          </g>
        ))}
      {showX && showY && (
        <text x={px(0) - 4} y={py(0) + 10} fontSize={7.5} fill="#64748b" textAnchor="end">0</text>
      )}
      <g clipPath={`url(#${clipId})`}>
        {circles.map((c, i) => (
          <circle
            key={'c' + i}
            cx={px(c.cx)}
            cy={py(c.cy)}
            r={c.r * unit}
            fill={c.fill ?? 'none'}
            stroke={c.color ?? CP_BLUE}
            strokeWidth={c.width ?? 1.8}
            strokeDasharray={c.dashed ? '5 4' : undefined}
          />
        ))}
        {lines.map((l, i) => {
          const seg = clipLine(l, xMin, xMax, yMin, yMax);
          if (!seg) return null;
          return (
            <line
              key={'l' + i}
              x1={px(seg[0][0])}
              y1={py(seg[0][1])}
              x2={px(seg[1][0])}
              y2={py(seg[1][1])}
              stroke={l.color ?? CP_BLUE}
              strokeWidth={l.width ?? 1.8}
              strokeDasharray={l.dashed ? '5 4' : undefined}
            />
          );
        })}
        {segments.map((s, i) => (
          <line
            key={'s' + i}
            x1={px(s.from[0])}
            y1={py(s.from[1])}
            x2={px(s.to[0])}
            y2={py(s.to[1])}
            stroke={s.color ?? CP_SLATE}
            strokeWidth={s.width ?? 1.4}
            strokeDasharray={s.dashed ? '4 3' : undefined}
          />
        ))}
      </g>
      {lines.map((l, i) => {
        if (!l.label) return null;
        let lx: number;
        let ly: number;
        if (l.x !== undefined) {
          lx = l.x;
          ly = l.labelAt ?? yMax - 0.6;
        } else {
          lx = l.labelAt ?? xMax - 0.6;
          ly = (l.m ?? 0) * lx + (l.b ?? 0);
        }
        return (
          <text
            key={'ll' + i}
            x={px(lx) + (l.labelDx ?? 5)}
            y={py(ly) + (l.labelDy ?? -5)}
            fontSize={10}
            fontWeight="bold"
            fill={l.color ?? CP_BLUE}
          >
            {l.label}
          </text>
        );
      })}
      {rightAngles.map((ra, i) => (
        <CircleProblemsRightAngle
          key={'ra' + i}
          V={{ x: px(ra.v[0]), y: py(ra.v[1]) }}
          P={{ x: px(ra.p[0]), y: py(ra.p[1]) }}
          Q={{ x: px(ra.q[0]), y: py(ra.q[1]) }}
          r={11}
          color={ra.color ?? CP_SLATE}
        />
      ))}
      {points.map((p, i) => (
        <g key={'p' + i}>
          <circle
            cx={px(p.x)}
            cy={py(p.y)}
            r={3.2}
            fill={p.hollow ? '#ffffff' : p.color ?? CP_RED}
            stroke={p.color ?? CP_RED}
            strokeWidth={1.4}
          />
          {p.label && (
            <text
              x={px(p.x) + (p.dx ?? 6)}
              y={py(p.y) + (p.dy ?? -6)}
              fontSize={9.5}
              fontWeight="bold"
              fill="#0f172a"
              textAnchor={p.anchor ?? 'start'}
            >
              {p.label}
            </text>
          )}
        </g>
      ))}
      {texts.map((t, i) => {
        const fs = t.size ?? 9.5;
        const ax = px(t.x);
        const ay = py(t.y) - fs * 0.95;
        const aw = fs * 0.55;
        return (
          <g key={'t' + i}>
            <text
              x={px(t.x)}
              y={py(t.y)}
              fontSize={fs}
              fill={t.color ?? '#0f172a'}
              textAnchor={t.anchor ?? 'start'}
              fontWeight={t.bold ? 'bold' : undefined}
            >
              {t.text}
            </text>
            {t.vec && (
              <g stroke={t.color ?? '#0f172a'} strokeWidth={1} fill="none">
                <line x1={ax} y1={ay} x2={ax + aw} y2={ay} />
                <path d={'M ' + (ax + aw - 2.2) + ' ' + (ay - 1.8) + ' L ' + (ax + aw) + ' ' + ay + ' L ' + (ax + aw - 2.2) + ' ' + (ay + 1.8)} />
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Derékszög jelölése (magyar szokás): negyedkörív, benne pont
// ---------------------------------------------------------------------------
type Pt = { x: number; y: number };
const unitVec = (P: Pt, Q: Pt): Pt => {
  const l = Math.hypot(Q.x - P.x, Q.y - P.y) || 1;
  return { x: (Q.x - P.x) / l, y: (Q.y - P.y) / l };
};
export const CircleProblemsRightAngle: React.FC<{ V: Pt; P: Pt; Q: Pt; r?: number; color?: string }> = ({ V, P, Q, r = 13, color = CP_SLATE }) => {
  const u1 = unitVec(V, P);
  const u2 = unitVec(V, Q);
  const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
  const bx = u1.x + u2.x;
  const by = u1.y + u2.y;
  const bl = Math.hypot(bx, by) || 1;
  const k = 0.55 * r;
  return (
    <g>
      <path
        d={`M ${V.x + r * u1.x} ${V.y + r * u1.y} A ${r} ${r} 0 0 ${sweep} ${V.x + r * u2.x} ${V.y + r * u2.y}`}
        fill="none"
        stroke={color}
        strokeWidth={1.3}
      />
      <circle cx={V.x + (k * bx) / bl} cy={V.y + (k * by) / bl} r={1.8} fill={color} />
    </g>
  );
};

// ---------------------------------------------------------------------------
// Számolási segédfüggvények (ábrák, kvíz, labor)
// ---------------------------------------------------------------------------

/** Az S pontból a (cx; cy) középpontú, r sugarú körhöz húzott érintők érintési pontjai. */
export const circleTangentPoints = (cx: number, cy: number, r: number, sx: number, sy: number): [number, number][] => {
  const dx = sx - cx;
  const dy = sy - cy;
  const d = Math.hypot(dx, dy);
  if (d < r - 1e-9) return [];
  if (Math.abs(d - r) < 1e-9) return [[sx, sy]];
  const th = Math.atan2(dy, dx);
  const ph = Math.acos(r / d);
  return [th + ph, th - ph].map((a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number]);
};

/** A P és Q pontra illeszkedő egyenes (ábrázoláshoz). */
export const circleProblemsLineThrough = (P: [number, number], Q: [number, number], extra: Partial<CpPlaneLine> = {}): CpPlaneLine => {
  if (Math.abs(Q[0] - P[0]) < 1e-9) return { x: P[0], ...extra };
  const m = (Q[1] - P[1]) / (Q[0] - P[0]);
  return { m, b: P[1] - m * P[0], ...extra };
};

/** Az érintő a kör (x₀; y₀) pontjában (merőleges a sugárra). */
export const circleProblemsTangentAt = (cx: number, cy: number, x0: number, y0: number, extra: Partial<CpPlaneLine> = {}): CpPlaneLine => {
  const rx = x0 - cx;
  const ry = y0 - cy;
  if (Math.abs(ry) < 1e-9) return { x: x0, ...extra };
  const m = -rx / ry;
  return { m, b: y0 - m * x0, ...extra };
};

// ---------------------------------------------------------------------------
// 1. ábra: 1. kidolgozott feladat – a kör pontjai, amelyek első koordinátája 3,5
// ---------------------------------------------------------------------------
export const VerticalLineCircleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CircleProblemsPlane
    xMin={-2}
    xMax={6}
    yMin={-3}
    yMax={5}
    unit={26}
    className={className}
    circles={[{ cx: 2, cy: 1, r: Math.sqrt(8.5), color: CP_BLUE, width: 2.2 }]}
    lines={[{ x: 3.5, color: CP_RED, width: 1.8, label: 'x = 3,5', labelAt: 4.4, labelDx: 5 }]}
    points={[
      { x: 2, y: 1, color: '#0f172a', label: 'C(2; 1)', dx: -5, dy: -6, anchor: 'end' },
      { x: 3.5, y: 3.5, color: CP_RED, label: 'P₁(3,5; 3,5)', dx: 6, dy: -4 },
      { x: 3.5, y: -1.5, color: CP_RED, label: 'P₂(3,5; −1,5)', dx: 6, dy: 12 }
    ]}
    texts={[{ x: -1.8, y: 4.4, text: '(x − 2)² + (y − 1)² = 8,5', color: CP_BLUE, bold: true, size: 9.5 }]}
  />
);

// ---------------------------------------------------------------------------
// 2. ábra: 2. kidolgozott feladat – derékszögű háromszög köré írt köre
// ---------------------------------------------------------------------------
export const RightTriangleCircumcircleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CircleProblemsPlane
    xMin={-6}
    xMax={4}
    yMin={-3}
    yMax={6}
    unit={26}
    className={className}
    circles={[{ cx: -1, cy: 1.5, r: Math.sqrt(16.25), color: CP_BLUE, width: 1.8, dashed: true }]}
    segments={[
      { from: [-5, 2], to: [3, 1], color: CP_RED, width: 2 },
      { from: [3, 1], to: [1, -2], color: CP_PURPLE, width: 2 },
      { from: [1, -2], to: [-5, 2], color: CP_PURPLE, width: 2 }
    ]}
    rightAngles={[{ v: [1, -2], p: [-5, 2], q: [3, 1] }]}
    points={[
      { x: -5, y: 2, label: 'A(−5; 2)', dx: -4, dy: -7, anchor: 'end' },
      { x: 3, y: 1, label: 'B(3; 1)', dx: 6, dy: -4 },
      { x: 1, y: -2, label: 'C(1; −2)', dx: 6, dy: 10 },
      { x: -1, y: 1.5, color: CP_BLUE, label: 'F(−1; 1,5)', dx: -4, dy: -7, anchor: 'end' }
    ]}
  />
);

// ---------------------------------------------------------------------------
// 3. ábra: 1. feladat – a vasúti híd körív alakú tartószerkezete
// ---------------------------------------------------------------------------
export const BridgeArcSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const posts = [-18, -12, -6, 0, 6, 12, 18];
  return (
    <CircleProblemsPlane
      xMin={-28}
      xMax={28}
      yMin={0}
      yMax={11}
      unit={6}
      tickEvery={6}
      grid={false}
      className={className}
      circles={[{ cx: 0, cy: -32, r: 40, color: CP_BLUE, width: 2.6 }]}
      segments={posts.map((x) => ({ from: [x, 0] as [number, number], to: [x, Math.sqrt(1600 - x * x) - 32] as [number, number], color: CP_SLATE, width: 2.2 }))}
      points={[
        { x: -24, y: 0, label: 'P', dx: -4, dy: -6, anchor: 'end' },
        { x: 24, y: 0, label: 'Q', dx: 4, dy: -6 },
        { x: 0, y: 8, label: 'R', dx: 5, dy: -5 }
      ]}
      texts={[{ x: 8, y: 10, text: 'x² + (y + 32)² = 1600', color: CP_BLUE, bold: true, size: 9.5 }]}
    />
  );
};

// ---------------------------------------------------------------------------
// 4. ábra: 2. feladat – hány érintő húzható a pontból?
// ---------------------------------------------------------------------------
export const TangentCountSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const r = Math.sqrt(16.25);
  const tS = circleTangentPoints(-1, 1.5, r, 2, 5);
  return (
    <CircleProblemsPlane
      xMin={-7}
      xMax={5}
      yMin={-4}
      yMax={7}
      unit={24}
      tickEvery={2}
      className={className}
      circles={[{ cx: -1, cy: 1.5, r, color: CP_BLUE, width: 2.2 }]}
      lines={[
        circleProblemsTangentAt(-1, 1.5, -5, 1, { color: CP_AMBER, width: 1.6 }),
        ...tS.map((t) => circleProblemsLineThrough([2, 5], t, { color: CP_GREEN, width: 1.6 }))
      ]}
      segments={[{ from: [-1, 1.5], to: [-5, 1], color: CP_SLATE, dashed: true }]}
      rightAngles={[{ v: [-5, 1], p: [-1, 1.5], q: [-5.125, 2], color: CP_AMBER }]}
      points={[
        { x: -1, y: 1.5, color: '#0f172a', label: 'C', dx: 5, dy: 12 },
        { x: -3, y: 4.5, color: CP_RED, label: 'P: 0 érintő', dx: 6, dy: -4 },
        { x: -5, y: 1, color: CP_AMBER, label: 'Q: 1', dx: -6, dy: 14, anchor: 'end' },
        { x: 2, y: 5, color: CP_GREEN, label: 'S: 2', dx: 6, dy: -4 },
        ...tS.map((t) => ({ x: t[0], y: t[1], color: CP_GREEN }))
      ]}
    />
  );
};

// ---------------------------------------------------------------------------
// 5. ábra: Egyenes és kör kölcsönös helyzete (2, 1, 0 közös pont)
// ---------------------------------------------------------------------------
export const LineCirclePositionsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CircleProblemsPlane
    xMin={-7}
    xMax={7}
    yMin={-6}
    yMax={8}
    unit={20}
    tickEvery={2}
    className={className}
    circles={[{ cx: 0, cy: 0, r: 5, color: CP_BLUE, width: 2.2 }]}
    lines={[
      { m: 1, b: 1, color: CP_RED, label: 'szelő: y = x + 1', labelAt: -6.5, labelDx: 4, labelDy: 16 },
      { m: 0, b: 5, color: CP_AMBER, label: 'érintő: y = 5', labelAt: 1.6, labelDy: -5 },
      { m: 1, b: 8, color: CP_SLATE, dashed: true, label: 'y = x + 8', labelAt: -5.6, labelDx: 8, labelDy: 2 }
    ]}
    points={[
      { x: 3, y: 4, color: CP_RED, label: '(3; 4)', dx: 6, dy: 4 },
      { x: -4, y: -3, color: CP_RED, label: '(−4; −3)', dx: 6, dy: 6 },
      { x: 0, y: 5, color: CP_AMBER, label: '(0; 5)', dx: -5, dy: -5, anchor: 'end' }
    ]}
    texts={[{ x: 3.4, y: -5.2, text: 'x² + y² = 25', color: CP_BLUE, bold: true }]}
  />
);

// ---------------------------------------------------------------------------
// 6. ábra: HF 3. – a rádióadó hatóköre
// ---------------------------------------------------------------------------
export const RadioRangeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <CircleProblemsPlane
    xMin={-19}
    xMax={14}
    yMin={-14}
    yMax={18}
    unit={8}
    tickEvery={5}
    grid={false}
    className={className}
    circles={[{ cx: -3, cy: 2, r: 15, color: CP_PURPLE, width: 2, fill: 'rgba(124,58,237,0.07)' }]}
    points={[
      { x: -3, y: 2, color: '#0f172a', label: 'P(−3; 2)', dx: 5, dy: -6 },
      { x: 8, y: -4, color: CP_GREEN, label: 'A', dx: 5, dy: -4 },
      { x: 9, y: -11, color: CP_RED, label: 'B', dx: 5, dy: 4 },
      { x: 6, y: -10, color: CP_AMBER, label: 'C', dx: -5, dy: 12, anchor: 'end' },
      { x: 11, y: 7, color: CP_GREEN, label: 'D', dx: 5, dy: 0 },
      { x: -9, y: 16, color: CP_RED, label: 'E', dx: 5, dy: -4 },
      { x: 9, y: 11, color: CP_AMBER, label: 'F', dx: 5, dy: -4 }
    ]}
    texts={[{ x: -17, y: 16.5, text: 'r = 15', color: CP_PURPLE, bold: true, size: 10 }]}
  />
);

