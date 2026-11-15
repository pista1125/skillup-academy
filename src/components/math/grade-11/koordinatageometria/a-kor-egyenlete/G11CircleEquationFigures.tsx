import React, { useId } from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export const CE_BLUE = '#2563eb';
export const CE_RED = '#dc2626';
export const CE_GREEN = '#059669';
export const CE_PURPLE = '#7c3aed';
export const CE_AMBER = '#d97706';
export const CE_SLATE = '#475569';

// ---------------------------------------------------------------------------
// Általános koordinátasík-komponens (ábrákhoz, kvízhez, laborokhoz)
// ---------------------------------------------------------------------------

export type CePlanePoint = {
  x: number;
  y: number;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
  anchor?: 'start' | 'middle' | 'end';
  hollow?: boolean;
};
export type CePlaneLine = {
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
export type CePlaneSegment = { from: [number, number]; to: [number, number]; color?: string; dashed?: boolean; width?: number };
export type CePlaneCircle = { cx: number; cy: number; r: number; color?: string; dashed?: boolean; fill?: string; width?: number };
export type CePlaneText = { x: number; y: number; text: string; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; bold?: boolean; /** nyíl az első betű fölé (vektor jelölése) */ vec?: boolean };

export interface G11CircleEquationPlaneProps {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  unit?: number;
  className?: string;
  lines?: CePlaneLine[];
  segments?: CePlaneSegment[];
  circles?: CePlaneCircle[];
  points?: CePlanePoint[];
  texts?: CePlaneText[];
  /** minden hányadik egész számot írjuk ki a tengelyeken (0 = egyiket sem, csak az 1-et) */
  tickEvery?: number;
  grid?: boolean;
  onPick?: (x: number, y: number) => void;
  /** beágyazás egy nagyobb SVG-be (x, y, szélesség, magasság) */
  nest?: { x: number; y: number; width: number; height: number };
}

const EPS = 1e-9;

/** Egy egyenes levágása a [xMin; xMax] × [yMin; yMax] téglalapra. */
const clipLine = (l: CePlaneLine, xMin: number, xMax: number, yMin: number, yMax: number): [number, number][] | null => {
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

export const G11CircleEquationPlane: React.FC<G11CircleEquationPlaneProps> = ({
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
  const clipId = 'cep-' + rawId.replace(/[^a-zA-Z0-9_-]/g, '');
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
            stroke={c.color ?? CE_BLUE}
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
              stroke={l.color ?? CE_BLUE}
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
            stroke={s.color ?? CE_SLATE}
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
            fill={l.color ?? CE_BLUE}
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
            fill={p.hollow ? '#ffffff' : p.color ?? CE_RED}
            stroke={p.color ?? CE_RED}
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
export const G11CircleEquationRightAngle: React.FC<{ V: Pt; P: Pt; Q: Pt; r?: number; color?: string }> = ({ V, P, Q, r = 13, color = CE_SLATE }) => {
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
// 1. ábra: Bevezető – a kezdőkör és a játékosok
// ---------------------------------------------------------------------------
export const KickoffCircleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11CircleEquationPlane
    xMin={-12}
    xMax={12}
    yMin={-11}
    yMax={11}
    unit={10}
    tickEvery={5}
    grid={false}
    className={className}
    circles={[{ cx: 0, cy: 0, r: 9.15, color: CE_GREEN, width: 2.2, fill: 'rgba(16,185,129,0.08)' }]}
    segments={[{ from: [0, 0], to: [6.47, 6.47], color: CE_GREEN, dashed: true }]}
    points={[
      { x: 0, y: 0, color: '#0f172a', label: 'O', dx: -4, dy: 12, anchor: 'end' },
      { x: 9, y: 1.65, label: 'A', dx: 5, dy: -4 },
      { x: -7, y: 4.4, label: 'B', dx: -6, dy: -4, anchor: 'end' },
      { x: -5.49, y: 7.32, label: 'C', dx: -6, dy: -4, anchor: 'end' },
      { x: 6.7, y: -6.4, label: 'D', dx: 6, dy: 8 }
    ]}
    texts={[{ x: 3.4, y: 4.6, text: 'r = 9,15', color: CE_GREEN, bold: true, size: 10 }]}
  />
);

// ---------------------------------------------------------------------------
// 2. ábra: Az origótól 5 egységre lévő pontok
// ---------------------------------------------------------------------------
export const RadiusFivePointsSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11CircleEquationPlane
    xMin={-7}
    xMax={7}
    yMin={-6}
    yMax={6}
    unit={20}
    className={className}
    circles={[{ cx: 0, cy: 0, r: 5, color: CE_BLUE, dashed: true, width: 1.4 }]}
    segments={[
      { from: [0, 0], to: [4, 3], color: CE_GREEN, width: 1.6 },
      { from: [4, 0], to: [4, 3], color: CE_GREEN, dashed: true },
      { from: [0, 0], to: [-4, 3], color: CE_GREEN, width: 1.6 },
      { from: [-4, 0], to: [-4, 3], color: CE_GREEN, dashed: true }
    ]}
    points={[
      { x: 5, y: 0, color: CE_BLUE, label: 'P₁(5; 0)', dx: 4, dy: 12 },
      { x: 4, y: 3, color: CE_GREEN, label: 'P₂(4; 3)', dx: 6, dy: 2 },
      { x: 3, y: 4, color: CE_GREEN, label: 'P₃(3; 4)', dx: 6, dy: -4 },
      { x: 0, y: 5, color: CE_BLUE, label: 'P₄(0; 5)', dx: 5, dy: -6 },
      { x: -4, y: 3, color: CE_GREEN, label: 'P₆(−4; 3)', dx: -6, dy: -4, anchor: 'end' },
      { x: -5, y: 0, color: CE_BLUE, label: 'P₇(−5; 0)', dx: -4, dy: 12, anchor: 'end' },
      { x: 0, y: -5, color: CE_BLUE, label: 'P₁₀(0; −5)', dx: 5, dy: 12 }
    ]}
    texts={[
      { x: 1.3, y: 2.2, text: '5', color: CE_GREEN, bold: true },
      { x: 4.2, y: 1.3, text: '3', color: CE_GREEN },
      { x: 2, y: -0.6, text: '4', color: CE_GREEN }
    ]}
  />
);

// ---------------------------------------------------------------------------
// 3. ábra: Eltolt kör – K(0; 0) → K′(5; −2)
// ---------------------------------------------------------------------------
export const TranslatedCircleSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11CircleEquationPlane
    xMin={-6}
    xMax={11}
    yMin={-8}
    yMax={6}
    unit={16}
    tickEvery={5}
    className={className}
    circles={[
      { cx: 0, cy: 0, r: 5, color: CE_BLUE, dashed: true, width: 1.4 },
      { cx: 5, cy: -2, r: 5, color: CE_RED, width: 2 }
    ]}
    segments={[
      { from: [0, 0], to: [5, -2], color: CE_PURPLE, width: 2 },
      { from: [4, 3], to: [9, 1], color: CE_PURPLE, dashed: true },
      { from: [3, -4], to: [8, -6], color: CE_PURPLE, dashed: true }
    ]}
    points={[
      { x: 0, y: 0, color: CE_BLUE, label: 'K(0; 0)', dx: -5, dy: -6, anchor: 'end' },
      { x: 5, y: -2, color: CE_RED, label: 'K′(5; −2)', dx: 5, dy: 12 },
      { x: 4, y: 3, color: CE_BLUE, label: 'P₂', dx: -4, dy: -6, anchor: 'end' },
      { x: 9, y: 1, color: CE_RED, label: 'P₂′(9; 1)', dx: 5, dy: -5 },
      { x: 3, y: -4, color: CE_BLUE, label: 'P₁₁', dx: -5, dy: 4, anchor: 'end' },
      { x: 8, y: -6, color: CE_RED, label: 'P₁₁′(8; −6)', dx: 5, dy: 12 }
    ]}
    texts={[{ x: 1.4, y: -1.6, text: 'v(5; −2)', color: CE_PURPLE, bold: true, size: 9, vec: true }]}
  />
);

// ---------------------------------------------------------------------------
// 4. ábra: A kör egyenletének levezetése (Pitagorasz-tétel)
// ---------------------------------------------------------------------------
export const CircleEquationDerivationSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const C = { x: 130, y: 140 };
  const R = 90;
  const ang = (35 * Math.PI) / 180;
  const P = { x: C.x + R * Math.cos(ang), y: C.y - R * Math.sin(ang) };
  const T = { x: P.x, y: C.y };
  return (
    <svg viewBox="0 0 360 250" className={className}>
      <rect x={0} y={0} width={360} height={250} fill="#f8fafc" rx={10} />
      <line x1={20} y1={225} x2={340} y2={225} stroke="#334155" strokeWidth={1.2} />
      <line x1={30} y1={235} x2={30} y2={14} stroke="#334155" strokeWidth={1.2} />
      <text x={334} y={240} fontSize={11} fontStyle="italic" fill="#334155">x</text>
      <text x={36} y={22} fontSize={11} fontStyle="italic" fill="#334155">y</text>
      <circle cx={C.x} cy={C.y} r={R} fill="rgba(37,99,235,0.06)" stroke={CE_BLUE} strokeWidth={2} />
      <line x1={C.x} y1={C.y} x2={P.x} y2={P.y} stroke={CE_RED} strokeWidth={2.2} />
      <line x1={C.x} y1={C.y} x2={T.x} y2={T.y} stroke={CE_GREEN} strokeWidth={2} />
      <line x1={T.x} y1={T.y} x2={P.x} y2={P.y} stroke={CE_PURPLE} strokeWidth={2} />
      <G11CircleEquationRightAngle V={T} P={C} Q={P} r={12} />
      <line x1={C.x} y1={C.y} x2={C.x} y2={225} stroke="#94a3b8" strokeDasharray="3 3" />
      <line x1={C.x} y1={C.y} x2={30} y2={C.y} stroke="#94a3b8" strokeDasharray="3 3" />
      <line x1={P.x} y1={P.y} x2={P.x} y2={225} stroke="#94a3b8" strokeDasharray="3 3" />
      <line x1={P.x} y1={P.y} x2={30} y2={P.y} stroke="#94a3b8" strokeDasharray="3 3" />
      <text x={C.x} y={238} fontSize={10} textAnchor="middle" fill="#334155">u</text>
      <text x={P.x} y={238} fontSize={10} textAnchor="middle" fill="#334155">x</text>
      <text x={24} y={C.y + 4} fontSize={10} textAnchor="end" fill="#334155">v</text>
      <text x={24} y={P.y + 4} fontSize={10} textAnchor="end" fill="#334155">y</text>
      <circle cx={C.x} cy={C.y} r={3.5} fill="#0f172a" />
      <circle cx={P.x} cy={P.y} r={3.5} fill={CE_RED} />
      <text x={C.x - 8} y={C.y + 16} fontSize={11} fontWeight="bold" textAnchor="end" fill="#0f172a">C(u; v)</text>
      <text x={P.x + 6} y={P.y - 6} fontSize={11} fontWeight="bold" fill="#0f172a">P(x; y)</text>
      <text x={(C.x + P.x) / 2 - 8} y={(C.y + P.y) / 2 - 6} fontSize={12} fontWeight="bold" fill={CE_RED} textAnchor="end">r</text>
      <text x={(C.x + T.x) / 2} y={C.y + 14} fontSize={10} textAnchor="middle" fill={CE_GREEN}>x − u</text>
      <text x={T.x + 6} y={(T.y + P.y) / 2 + 4} fontSize={10} fill={CE_PURPLE}>y − v</text>
      <text x={238} y={60} fontSize={11} fill="#0f172a">Pitagorasz-tétel:</text>
      <text x={238} y={80} fontSize={12} fontWeight="bold" fill={CE_BLUE}>(x − u)² + (y − v)² = r²</text>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// 5. ábra: Átmérő végpontjaiból a kör; a körbe írt négyzet és annak beírt köre
// ---------------------------------------------------------------------------
export const DiameterSquareSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11CircleEquationPlane
    xMin={-26}
    xMax={12}
    yMin={-18}
    yMax={19}
    unit={6}
    tickEvery={5}
    grid={false}
    className={className}
    circles={[
      { cx: -7, cy: 1, r: 17, color: CE_BLUE, width: 2 },
      { cx: -7, cy: 1, r: 17 / Math.SQRT2, color: CE_GREEN, dashed: true, width: 1.6 }
    ]}
    segments={[
      { from: [1, -14], to: [8, 9], color: CE_PURPLE, width: 1.6 },
      { from: [8, 9], to: [-15, 16], color: CE_PURPLE, width: 1.6 },
      { from: [-15, 16], to: [-22, -7], color: CE_PURPLE, width: 1.6 },
      { from: [-22, -7], to: [1, -14], color: CE_PURPLE, width: 1.6 },
      { from: [1, -14], to: [-15, 16], color: CE_RED, width: 1.8 }
    ]}
    points={[
      { x: 1, y: -14, label: 'A(1; −14)', dx: 6, dy: 4 },
      { x: -15, y: 16, label: 'B(−15; 16)', dx: -6, dy: -4, anchor: 'end' },
      { x: -7, y: 1, color: '#0f172a', label: 'K(−7; 1)', dx: 6, dy: 10 }
    ]}
  />
);

// ---------------------------------------------------------------------------
// 6. ábra: Teljes négyzetté kiegészítés – területmodell
// ---------------------------------------------------------------------------
export const CompletingSquareSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => {
  const X = 110;
  const H = 40;
  const O = { x: 40, y: 30 };
  return (
    <svg viewBox="0 0 360 220" className={className}>
      <rect x={0} y={0} width={360} height={220} fill="#f8fafc" rx={10} />
      <rect x={O.x} y={O.y} width={X} height={X} fill="rgba(37,99,235,0.15)" stroke={CE_BLUE} strokeWidth={1.5} />
      <rect x={O.x + X} y={O.y} width={H} height={X} fill="rgba(16,185,129,0.18)" stroke={CE_GREEN} strokeWidth={1.5} />
      <rect x={O.x} y={O.y + X} width={X} height={H} fill="rgba(16,185,129,0.18)" stroke={CE_GREEN} strokeWidth={1.5} />
      <rect x={O.x + X} y={O.y + X} width={H} height={H} fill="rgba(245,158,11,0.15)" stroke={CE_AMBER} strokeWidth={1.5} strokeDasharray="4 3" />
      <text x={O.x + X / 2} y={O.y + X / 2 + 5} fontSize={14} fontWeight="bold" textAnchor="middle" fill={CE_BLUE}>x²</text>
      <text x={O.x + X + H / 2} y={O.y + X / 2 + 4} fontSize={12} fontWeight="bold" textAnchor="middle" fill={CE_GREEN}>3x</text>
      <text x={O.x + X / 2} y={O.y + X + H / 2 + 4} fontSize={12} fontWeight="bold" textAnchor="middle" fill={CE_GREEN}>3x</text>
      <text x={O.x + X + H / 2} y={O.y + X + H / 2 + 4} fontSize={12} fontWeight="bold" textAnchor="middle" fill={CE_AMBER}>9</text>
      <text x={O.x + X / 2} y={O.y - 6} fontSize={11} textAnchor="middle" fill="#334155">x</text>
      <text x={O.x + X + H / 2} y={O.y - 6} fontSize={11} textAnchor="middle" fill="#334155">3</text>
      <text x={O.x - 6} y={O.y + X / 2} fontSize={11} textAnchor="end" fill="#334155">x</text>
      <text x={O.x - 6} y={O.y + X + H / 2 + 4} fontSize={11} textAnchor="end" fill="#334155">3</text>
      <g fontSize={11.5} fill="#0f172a">
        <text x={215} y={60}>x² + 6x</text>
        <text x={215} y={80}>= x² + 3x + 3x</text>
        <text x={215} y={100}>= (x + 3)² − 9</text>
        <text x={215} y={130} fill={CE_AMBER}>a hiányzó sarok:</text>
        <text x={215} y={146} fill={CE_AMBER}>(6 : 2)² = 9</text>
        <text x={215} y={176} fill={CE_BLUE} fontWeight="bold">(x + 3)² = x² + 6x + 9</text>
      </g>
    </svg>
  );
};

