import React, { useId } from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export const LE_BLUE = '#2563eb';
export const LE_RED = '#dc2626';
export const LE_GREEN = '#059669';
export const LE_PURPLE = '#7c3aed';
export const LE_AMBER = '#d97706';
export const LE_SLATE = '#475569';

// ---------------------------------------------------------------------------
// Általános koordinátasík-komponens (ábrákhoz, kvízhez, laborokhoz)
// ---------------------------------------------------------------------------

export type LePlanePoint = {
  x: number;
  y: number;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
  anchor?: 'start' | 'middle' | 'end';
  hollow?: boolean;
};
export type LePlaneLine = {
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
export type LePlaneSegment = { from: [number, number]; to: [number, number]; color?: string; dashed?: boolean; width?: number };
export type LePlaneCircle = { cx: number; cy: number; r: number; color?: string; dashed?: boolean; fill?: string; width?: number };
export type LePlaneText = { x: number; y: number; text: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; bold?: boolean; /** nyíl az első betű fölé (vektor jelölése) */ vec?: boolean };

export interface LineEquationPlaneProps {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  unit?: number;
  className?: string;
  lines?: LePlaneLine[];
  segments?: LePlaneSegment[];
  circles?: LePlaneCircle[];
  points?: LePlanePoint[];
  texts?: LePlaneText[];
  /** minden hányadik egész számot írjuk ki a tengelyeken (0 = egyiket sem, csak az 1-et) */
  tickEvery?: number;
  grid?: boolean;
  onPick?: (x: number, y: number) => void;
  /** beágyazás egy nagyobb SVG-be (x, y, szélesség, magasság) */
  nest?: { x: number; y: number; width: number; height: number };
}

const EPS = 1e-9;

/** Egy egyenes levágása a [xMin; xMax] × [yMin; yMax] téglalapra. */
const clipLine = (l: LePlaneLine, xMin: number, xMax: number, yMin: number, yMax: number): [number, number][] | null => {
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

export const LineEquationPlane: React.FC<LineEquationPlaneProps> = ({
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
  nest
}) => {
  const rawId = useId();
  const clipId = 'lep-' + rawId.replace(/[^a-zA-Z0-9_-]/g, '');
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
            stroke={c.color ?? LE_BLUE}
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
              stroke={l.color ?? LE_BLUE}
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
            stroke={s.color ?? LE_SLATE}
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
            fill={l.color ?? LE_BLUE}
          >
            {l.label}
          </text>
        );
      })}
      {points.map((p, i) => (
        <g key={'p' + i}>
          <circle
            cx={px(p.x)}
            cy={py(p.y)}
            r={3.2}
            fill={p.hollow ? '#ffffff' : p.color ?? LE_RED}
            stroke={p.color ?? LE_RED}
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
export const LineEquationRightAngle: React.FC<{ V: Pt; P: Pt; Q: Pt; r?: number; color?: string }> = ({ V, P, Q, r = 13, color = LE_SLATE }) => {
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
// 1. ábra: Bevezető – a falnak támasztott létra (I. módszer, hasonlóság)
// ---------------------------------------------------------------------------
export const LadderWallSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  // vázlatos ábra: vízszintesen 150 px/m, függőlegesen 55 px/m
  const K = { x: 70, y: 205 };
  const sx = 150;
  const sy = 55;
  const P = (x: number, y: number): Pt => ({ x: K.x + x * sx, y: K.y - y * sy });
  const A = P(0.8, 0);
  const B = P(0, 3);
  const C = P(0.5, 1.125);
  const D = P(0.08, 2.7);
  return (
    <svg viewBox="0 0 360 240" className={className}>
      <rect x={0} y={0} width={360} height={240} fill="#f8fafc" rx={10} />
      {/* fal és talaj */}
      <rect x={K.x - 18} y={20} width={18} height={K.y - 20} fill="#cbd5e1" />
      <line x1={K.x} y1={20} x2={K.x} y2={K.y} stroke="#334155" strokeWidth={2} />
      <rect x={K.x - 18} y={K.y} width={240} height={12} fill="#d6d3d1" />
      <line x1={K.x - 18} y1={K.y} x2={K.x + 222} y2={K.y} stroke="#334155" strokeWidth={2} />
      <LineEquationRightAngle V={K} P={B} Q={A} />
      {/* létra */}
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#92400e" strokeWidth={4} strokeLinecap="round" />
      {/* vetületek */}
      <line x1={C.x} y1={C.y} x2={C.x} y2={K.y} stroke={LE_BLUE} strokeDasharray="4 3" />
      <line x1={C.x} y1={C.y} x2={K.x} y2={C.y} stroke={LE_BLUE} strokeDasharray="4 3" />
      <line x1={D.x} y1={D.y} x2={D.x} y2={K.y} stroke={LE_GREEN} strokeDasharray="4 3" />
      <line x1={D.x} y1={D.y} x2={K.x} y2={D.y} stroke={LE_GREEN} strokeDasharray="4 3" />
      {[
        { p: A, n: 'A', dx: 4, dy: 14 },
        { p: B, n: 'B', dx: 6, dy: -4 },
        { p: C, n: 'C', dx: 7, dy: -2 },
        { p: D, n: 'D', dx: 7, dy: -2 }
      ].map((q) => (
        <g key={q.n}>
          <circle cx={q.p.x} cy={q.p.y} r={3.5} fill={LE_RED} />
          <text x={q.p.x + q.dx} y={q.p.y + q.dy} fontSize={12} fontWeight="bold" fill="#0f172a">{q.n}</text>
        </g>
      ))}
      <text x={K.x - 4} y={K.y + 26} fontSize={11} fontWeight="bold" fill="#0f172a" textAnchor="middle">K</text>
      <text x={C.x} y={K.y + 26} fontSize={10} fill={LE_BLUE} textAnchor="middle">Cₓ</text>
      <text x={D.x + 2} y={K.y + 26} fontSize={10} fill={LE_GREEN} textAnchor="middle">Dₓ</text>
      <text x={K.x - 22} y={C.y + 4} fontSize={10} fill={LE_BLUE} textAnchor="end">Cᵧ</text>
      <text x={K.x - 22} y={D.y + 4} fontSize={10} fill={LE_GREEN} textAnchor="end">Dᵧ</text>
      <text x={K.x - 30} y={(K.y + B.y) / 2 + 20} fontSize={11} fill="#0f172a" textAnchor="end">3 m</text>
      <text x={(K.x + A.x) / 2} y={K.y + 38} fontSize={11} fill="#0f172a" textAnchor="middle">0,8 m</text>
      <g fontSize={10.5} fill="#334155">
        <text x={222} y={60}>A létra talpa a faltól 0,8 m-re,</text>
        <text x={222} y={75}>a teteje 3 m magasan van.</text>
        <text x={222} y={100} fill={LE_BLUE}>C: 0,5 m-re a faltól</text>
        <text x={222} y={115} fill={LE_BLUE}>⇒ milyen magasan van?</text>
        <text x={222} y={140} fill={LE_GREEN}>D: 2,7 m magasan</text>
        <text x={222} y={155} fill={LE_GREEN}>⇒ milyen messze a faltól?</text>
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 2. ábra: II. módszer – a létra koordináta-rendszerben
// ---------------------------------------------------------------------------
export const LadderCoordinateSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const O = { x: 60, y: 205 };
  const sx = 200;
  const sy = 55;
  const P = (x: number, y: number): Pt => ({ x: O.x + x * sx, y: O.y - y * sy });
  const A = P(0.8, 0);
  const B = P(0, 3);
  const C = P(0.5, 1.125);
  const D = P(0.08, 2.7);
  const ext1 = P(-0.05, 3.1875);
  const ext2 = P(0.86, -0.225);
  return (
    <svg viewBox="0 0 360 240" className={className}>
      <rect x={0} y={0} width={360} height={240} fill="#ffffff" rx={10} />
      <g stroke="#e2e8f0" strokeWidth={0.8}>
        {[0.2, 0.4, 0.6, 0.8, 1.0, 1.2].map((x) => (
          <line key={'vx' + x} x1={P(x, 0).x} y1={22} x2={P(x, 0).x} y2={O.y} />
        ))}
        {[0.5, 1, 1.5, 2, 2.5, 3].map((y) => (
          <line key={'hy' + y} x1={O.x} y1={P(0, y).y} x2={330} y2={P(0, y).y} />
        ))}
      </g>
      <line x1={O.x - 10} y1={O.y} x2={340} y2={O.y} stroke="#334155" strokeWidth={1.3} />
      <path d={`M 340 ${O.y} l -7 -3.5 l 0 7 z`} fill="#334155" />
      <line x1={O.x} y1={O.y + 10} x2={O.x} y2={14} stroke="#334155" strokeWidth={1.3} />
      <path d={`M ${O.x} 14 l -3.5 7 l 7 0 z`} fill="#334155" />
      <text x={336} y={O.y + 14} fontSize={11} fontStyle="italic" fill="#334155">x</text>
      <text x={O.x + 7} y={20} fontSize={11} fontStyle="italic" fill="#334155">y</text>
      <text x={O.x - 6} y={O.y + 14} fontSize={10} fill="#64748b" textAnchor="end">0</text>
      <line x1={ext1.x} y1={ext1.y} x2={ext2.x} y2={ext2.y} stroke="#92400e" strokeWidth={3} strokeLinecap="round" />
      <line x1={C.x} y1={C.y} x2={C.x} y2={O.y} stroke={LE_BLUE} strokeDasharray="4 3" />
      <line x1={C.x} y1={C.y} x2={O.x} y2={C.y} stroke={LE_BLUE} strokeDasharray="4 3" />
      <line x1={D.x} y1={D.y} x2={O.x} y2={D.y} stroke={LE_GREEN} strokeDasharray="4 3" />
      {[
        { p: A, n: 'A(0,8; 0)', dx: 6, dy: 15 },
        { p: B, n: 'B(0; 3)', dx: 8, dy: -6 },
        { p: C, n: 'C(0,5; ?)', dx: 8, dy: -4 },
        { p: D, n: 'D(?; 2,7)', dx: 8, dy: 4 }
      ].map((q) => (
        <g key={q.n}>
          <circle cx={q.p.x} cy={q.p.y} r={3.5} fill={LE_RED} />
          <text x={q.p.x + q.dx} y={q.p.y + q.dy} fontSize={11} fontWeight="bold" fill="#0f172a">{q.n}</text>
        </g>
      ))}
      <text x={O.x - 6} y={C.y + 4} fontSize={9.5} fill={LE_BLUE} textAnchor="end">?</text>
      <text x={210} y={120} fontSize={12} fontWeight="bold" fill="#92400e">f(x) = −3,75x + 3</text>
      <text x={210} y={138} fontSize={10} fill="#475569">1 egység = 1 méter</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 3. ábra: A létra különböző elhelyezései (A–E esetek)
// ---------------------------------------------------------------------------
export const LadderCasesSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const cases: { name: string; eq: string; line: LePlaneLine; pts: LePlanePoint[]; range: [number, number, number, number] }[] = [
    { name: 'A', eq: 'y = 3x − 6', line: { m: 3, b: -6 }, pts: [{ x: 2, y: 0 }, { x: 4, y: 6 }], range: [-1, 5, -1, 7] },
    { name: 'B', eq: 'x = 0', line: { x: 0 }, pts: [], range: [-3, 3, -1, 7] },
    { name: 'C', eq: 'x = 2', line: { x: 2 }, pts: [{ x: 2, y: 0 }], range: [-2, 4, -1, 7] },
    { name: 'D', eq: 'y = 3', line: { m: 0, b: 3 }, pts: [{ x: 0, y: 3 }], range: [-3, 3, -1, 7] },
    { name: 'E', eq: 'y = 0', line: { m: 0, b: 0 }, pts: [], range: [-3, 3, -1, 7] }
  ];
  return (
    <svg viewBox="0 0 500 200" className={className}>
      <rect x={0} y={0} width={500} height={200} fill="#f8fafc" rx={10} />
      {cases.map((c, i) => (
        <g key={c.name} transform={`translate(${6 + i * 98}, 8)`}>
          <LineEquationPlane
            nest={{ x: 0, y: 0, width: 92, height: 150 }}
            xMin={c.range[0]}
            xMax={c.range[1]}
            yMin={c.range[2]}
            yMax={c.range[3]}
            unit={14}
            tickEvery={2}
            lines={[{ ...c.line, color: '#92400e', width: 3.5 }]}
            points={c.pts.map((p) => ({ ...p, color: LE_RED }))}
          />
          <text x={46} y={170} fontSize={13} fontWeight="bold" textAnchor="middle" fill="#0f172a">{c.name}</text>
          <text x={46} y={186} fontSize={11} textAnchor="middle" fill={LE_BLUE} fontWeight="bold">{c.eq}</text>
        </g>
      ))}
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 4. ábra: Az egyenesek egyenletének alakjai
// ---------------------------------------------------------------------------
export const LineFormsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <LineEquationPlane
    xMin={-5}
    xMax={6}
    yMin={-4}
    yMax={6}
    unit={24}
    className={className}
    tickEvery={2}
    lines={[
      { m: 0.5, b: 2, color: LE_BLUE, label: 'y = 0,5x + 2', labelAt: 1.6, labelDx: -10, labelDy: -10 },
      { m: -1.5, b: 0, color: LE_GREEN, label: 'y = −1,5x', labelAt: -3.2, labelDx: 6, labelDy: 2 },
      { m: 0, b: -2, color: LE_PURPLE, label: 'y = −2', labelAt: 2.4, labelDy: -5 },
      { x: 4, color: LE_AMBER, label: 'x = 4', labelAt: 5.2, labelDx: 5 }
    ]}
    points={[
      { x: 0, y: 2, color: LE_BLUE, label: '(0; 2)', dx: -6, dy: -7, anchor: 'end' },
      { x: 0, y: 0, color: LE_GREEN }
    ]}
  />
);

// ---------------------------------------------------------------------------
// 5. ábra: Két pontra illeszkedő egyenes (meredekségi háromszöggel)
// ---------------------------------------------------------------------------
export const TwoPointLineSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <LineEquationPlane
    xMin={-4}
    xMax={5}
    yMin={-2}
    yMax={9}
    unit={22}
    className={className}
    tickEvery={2}
    lines={[{ m: 2, b: 3, color: LE_BLUE, label: 'y = 2x + 3', labelAt: 2.6, labelDx: 8, labelDy: 6 }]}
    segments={[
      { from: [-1, 1], to: [2, 1], color: LE_GREEN, dashed: true, width: 1.8 },
      { from: [2, 1], to: [2, 7], color: LE_RED, dashed: true, width: 1.8 }
    ]}
    points={[
      { x: -1, y: 1, label: 'P(−1; 1)', dx: -6, dy: -6, anchor: 'end' },
      { x: 2, y: 7, label: 'Q(2; 7)', dx: -6, dy: -6, anchor: 'end' },
      { x: 0, y: 3, color: LE_BLUE, label: 'b = 3', dx: 6, dy: 3 }
    ]}
    texts={[
      { x: 0.5, y: 0.35, text: '+3', color: LE_GREEN, bold: true, anchor: 'middle' },
      { x: 2.2, y: 4, text: '+6', color: LE_RED, bold: true },
      { x: 2.2, y: 3.2, text: 'm = 6 : 3 = 2', color: '#0f172a', size: 9 }
    ]}
  />
);

// ---------------------------------------------------------------------------
// 6. ábra: Tengelymetszetek – y = 2x − 3
// ---------------------------------------------------------------------------
export const AxisInterceptsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <LineEquationPlane
    xMin={-3}
    xMax={5}
    yMin={-5}
    yMax={5}
    unit={22}
    className={className}
    tickEvery={1}
    lines={[{ m: 2, b: -3, color: LE_BLUE, label: 'y = 2x − 3', labelAt: 3.6, labelDx: 6, labelDy: 8 }]}
    points={[
      { x: 0, y: -3, color: LE_PURPLE, label: '(0; −3): x = 0', dx: -6, dy: 4, anchor: 'end' },
      { x: 1.5, y: 0, color: LE_GREEN, label: '(1,5; 0): y = 0', dx: 8, dy: 14 }
    ]}
  />
);
