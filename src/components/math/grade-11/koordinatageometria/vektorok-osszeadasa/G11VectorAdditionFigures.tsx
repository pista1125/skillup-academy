import React from 'react';

type FigProps = { className?: string };

const DEFAULT_CLASS = 'w-full h-auto max-w-xl mx-auto';

export type GP = [number, number];

export interface GridVectorSpec {
  from: GP;
  to: GP;
  /** Címke: kisbetű ⇒ nyíl a betű fölött („a”, „a+b”, „−v”), „→AB” ⇒ közös nyíl AB fölött. */
  label?: string;
  color?: string;
  dashed?: boolean;
  /** A címke a haladási irány bal (1) vagy jobb (−1) oldalára kerüljön. */
  side?: 1 | -1;
  width?: number;
  /** A címke helye a vektor mentén (0 = kezdőpont, 1 = végpont). */
  at?: number;
  offset?: number;
  /** Szöveges címke (nyilak nélkül). */
  plain?: boolean;
}

export interface GridPointSpec {
  at: GP;
  label?: string;
  color?: string;
  dx?: number;
  dy?: number;
}

export interface GridPolygonSpec {
  pts: GP[];
  fill?: string;
  stroke?: string;
  dashed?: boolean;
}

export interface GridRightAngleSpec {
  at: GP;
  p: GP;
  q: GP;
}

export interface GridArcSpec {
  at: GP;
  p: GP;
  q: GP;
  r?: number;
  label?: string;
  color?: string;
}

export interface GridTextSpec {
  at: GP;
  text: string;
  color?: string;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
}

const ARROW_LETTER = /[a-z]/;

/**
 * Vektorcímke SVG-ben: a kisbetűk fölé kis nyíl kerül, „→XY” esetén egy közös nyíl az XY betűcsoport fölé.
 * A szöveg többi része (számok, műveleti jelek) nyíl nélkül jelenik meg.
 */
export const G11VectorAdditionLabel: React.FC<{
  x: number;
  y: number;
  text: string;
  color?: string;
  size?: number;
  plain?: boolean;
}> = ({ x, y, text, color = '#0f172a', size = 12, plain = false }) => {
  if (plain) {
    return (
      <text x={x} y={y + size * 0.35} fontSize={size} fontWeight="bold" textAnchor="middle" fill={color}>
        {text}
      </text>
    );
  }
  type Tok = { s: string; arrow: boolean; w: number };
  const toks: Tok[] = [];
  const cw = (ch: string) => {
    if (ch === ' ') return size * 0.28;
    if ('+−-=·'.includes(ch)) return size * 0.72;
    if ('()|'.includes(ch)) return size * 0.36;
    if (/[A-Z]/.test(ch)) return size * 0.68;
    return size * 0.58;
  };
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '→') {
      let j = i + 1;
      while (j < text.length && /[A-Z₀-₉0-9']/.test(text[j])) j++;
      const s = text.slice(i + 1, j);
      toks.push({ s, arrow: true, w: s.split('').reduce((acc, c) => acc + cw(c), 0) });
      i = j;
    } else {
      const sp = ch === ' ' ? ' ' : ch;
      toks.push({ s: sp, arrow: ARROW_LETTER.test(ch), w: cw(ch) });
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
              y={base}
              fontSize={size}
              fontWeight="bold"
              fontStyle={t.arrow && /[a-z]/.test(t.s) ? 'italic' : 'normal'}
              textAnchor="middle"
              fill={color}
            >
              {t.s}
            </text>
            {t.arrow && (
              <g stroke={color} strokeWidth={1} fill={color}>
                <line x1={x0 + t.w * 0.12} y1={top} x2={x0 + t.w * 0.88 - 2} y2={top} />
                <polygon
                  points={`${x0 + t.w * 0.88},${top} ${x0 + t.w * 0.88 - 3.2},${top - 1.8} ${x0 + t.w * 0.88 - 3.2},${top + 1.8}`}
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
export const G11VectorAdditionArrow: React.FC<{
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
  if (len < 0.5) {
    return <circle cx={x1} cy={y1} r={3} fill={color} />;
  }
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
        x2={bx + ux * 1}
        y2={by + uy * 1}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dashed ? '5 4' : undefined}
        strokeLinecap="round"
      />
      <polygon points={`${x2},${y2} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
    </g>
  );
};

/**
 * Négyzetrácsos (vagy rács nélküli) vektorábra rácsegységekben megadott adatokkal.
 * A koordináták matematikai irányításúak: (0; 0) a bal alsó sarok, y felfelé nő.
 */
export const G11VectorAdditionGrid: React.FC<{
  cols: number;
  rows: number;
  cell?: number;
  pad?: number;
  grid?: boolean;
  vectors?: GridVectorSpec[];
  points?: GridPointSpec[];
  polygons?: GridPolygonSpec[];
  rightAngles?: GridRightAngleSpec[];
  texts?: GridTextSpec[];
  arcs?: GridArcSpec[];
  className?: string;
}> = ({
  cols,
  rows,
  cell = 24,
  pad = 16,
  grid = true,
  vectors = [],
  points = [],
  polygons = [],
  rightAngles = [],
  texts = [],
  arcs = [],
  className = 'w-full max-w-[300px] h-auto mx-auto'
}) => {
  const W = cols * cell + 2 * pad;
  const H = rows * cell + 2 * pad;
  const px = (p: GP) => ({ x: pad + p[0] * cell, y: pad + (rows - p[1]) * cell });
  const lines: React.ReactNode[] = [];
  if (grid) {
    for (let i = 0; i <= cols; i++) {
      lines.push(<line key={'v' + i} x1={pad + i * cell} y1={pad} x2={pad + i * cell} y2={pad + rows * cell} stroke="#e2e8f0" strokeWidth={1} />);
    }
    for (let j = 0; j <= rows; j++) {
      lines.push(<line key={'h' + j} x1={pad} y1={pad + j * cell} x2={pad + cols * cell} y2={pad + j * cell} stroke="#e2e8f0" strokeWidth={1} />);
    }
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} role="img">
      <rect x={0} y={0} width={W} height={H} rx={10} fill="#ffffff" />
      {lines}
      {polygons.map((pg, k) => (
        <polygon
          key={'pg' + k}
          points={pg.pts.map((p) => `${px(p).x},${px(p).y}`).join(' ')}
          fill={pg.fill ?? 'none'}
          stroke={pg.stroke ?? '#94a3b8'}
          strokeWidth={1.4}
          strokeDasharray={pg.dashed ? '4 3' : undefined}
        />
      ))}
      {rightAngles.map((ra, k) => {
        const V = px(ra.at);
        const P = px(ra.p);
        const Q = px(ra.q);
        const n1 = Math.hypot(P.x - V.x, P.y - V.y) || 1;
        const n2 = Math.hypot(Q.x - V.x, Q.y - V.y) || 1;
        const u1 = { x: (P.x - V.x) / n1, y: (P.y - V.y) / n1 };
        const u2 = { x: (Q.x - V.x) / n2, y: (Q.y - V.y) / n2 };
        const r = 12;
        const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
        const bx = u1.x + u2.x;
        const by = u1.y + u2.y;
        const bl = Math.hypot(bx, by) || 1;
        return (
          <g key={'ra' + k}>
            <path
              d={`M ${V.x + r * u1.x} ${V.y + r * u1.y} A ${r} ${r} 0 0 ${sweep} ${V.x + r * u2.x} ${V.y + r * u2.y}`}
              fill="none"
              stroke="#475569"
              strokeWidth={1.3}
            />
            <circle cx={V.x + (0.55 * r * bx) / bl} cy={V.y + (0.55 * r * by) / bl} r={1.7} fill="#475569" />
          </g>
        );
      })}
      {arcs.map((ar, k) => {
        const V = px(ar.at);
        const P = px(ar.p);
        const Q = px(ar.q);
        const n1 = Math.hypot(P.x - V.x, P.y - V.y) || 1;
        const n2 = Math.hypot(Q.x - V.x, Q.y - V.y) || 1;
        const u1 = { x: (P.x - V.x) / n1, y: (P.y - V.y) / n1 };
        const u2 = { x: (Q.x - V.x) / n2, y: (Q.y - V.y) / n2 };
        const r = ar.r ?? 18;
        const sweep = u1.x * u2.y - u1.y * u2.x > 0 ? 1 : 0;
        const bx = u1.x + u2.x;
        const by = u1.y + u2.y;
        const bl = Math.hypot(bx, by) || 1;
        const color = ar.color ?? '#b45309';
        return (
          <g key={'arc' + k}>
            <path
              d={`M ${V.x + r * u1.x} ${V.y + r * u1.y} A ${r} ${r} 0 0 ${sweep} ${V.x + r * u2.x} ${V.y + r * u2.y}`}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
            />
            {ar.label && (
              <text x={V.x + ((r + 12) * bx) / bl} y={V.y + ((r + 12) * by) / bl + 4} fontSize={11} fontWeight="bold" textAnchor="middle" fill={color}>
                {ar.label}
              </text>
            )}
          </g>
        );
      })}
      {vectors.map((v, k) => {
        const A = px(v.from);
        const B = px(v.to);
        const color = v.color ?? '#2563eb';
        const t = v.at ?? 0.5;
        const M = { x: A.x + (B.x - A.x) * t, y: A.y + (B.y - A.y) * t };
        const len = Math.hypot(B.x - A.x, B.y - A.y) || 1;
        const side = v.side ?? 1;
        // bal oldali normális a képernyőn (y lefelé nő)
        const nx = ((B.y - A.y) / len) * side;
        const ny = (-(B.x - A.x) / len) * side;
        const off = v.offset ?? 12;
        return (
          <g key={'vec' + k}>
            <G11VectorAdditionArrow x1={A.x} y1={A.y} x2={B.x} y2={B.y} color={color} dashed={v.dashed} width={v.width} />
            {v.label && <G11VectorAdditionLabel x={M.x + nx * off} y={M.y + ny * off} text={v.label} color={color} plain={v.plain} />}
          </g>
        );
      })}
      {points.map((p, k) => {
        const P = px(p.at);
        return (
          <g key={'pt' + k}>
            <circle cx={P.x} cy={P.y} r={3} fill={p.color ?? '#0f172a'} />
            {p.label && (
              <text x={P.x + (p.dx ?? -8)} y={P.y + (p.dy ?? -6)} fontSize={12} fontWeight="bold" textAnchor="middle" fill={p.color ?? '#0f172a'}>
                {p.label}
              </text>
            )}
          </g>
        );
      })}
      {texts.map((t, k) => {
        const P = px(t.at);
        return (
          <text key={'tx' + k} x={P.x} y={P.y} fontSize={t.size ?? 11} textAnchor={t.anchor ?? 'middle'} fill={t.color ?? '#334155'} fontWeight="bold">
            {t.text}
          </text>
        );
      })}
    </svg>
  );
};

const BLUE = '#2563eb';
const GREEN = '#059669';
const RED = '#dc2626';
const PURPLE = '#7c3aed';
const AMBER = '#d97706';

/** A vektor fogalma: kezdőpont, végpont, egyenlő irányított szakaszok és az ellentett vektor. */
export const VectorConceptSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11VectorAdditionGrid
    cols={14}
    rows={6}
    cell={26}
    className={className}
    vectors={[
      { from: [1, 1], to: [4, 3], label: 'v', color: RED, side: 1 },
      { from: [6, 3.5], to: [9, 5.5], label: 'v', color: RED, side: 1 },
      { from: [5.5, 0.5], to: [8.5, 2.5], label: 'v', color: RED, side: -1 },
      { from: [13, 3.5], to: [10, 1.5], label: '−v', color: BLUE, side: 1 }
    ]}
    points={[
      { at: [1, 1], label: 'kezdőpont', dx: 6, dy: 16 },
      { at: [4, 3], label: 'végpont', dx: 30, dy: 10 }
    ]}
  />
);

/** Kidolgozott feladat: a leszálló repülőgép elmozdulása oldalszélben. */
export const CrosswindLandingSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <svg viewBox="0 0 360 200" className={className} role="img">
    <rect x={0} y={0} width={360} height={200} rx={12} fill="#f1f5f9" />
    <rect x={20} y={118} width={320} height={56} fill="#475569" />
    <line x1={24} y1={146} x2={336} y2={146} stroke="#ffffff" strokeWidth={2} strokeDasharray="14 10" />
    <text x={330} y={190} fontSize={11} textAnchor="end" fill="#334155">leszállópálya</text>
    <G11VectorAdditionArrow x1={60} y1={146} x2={260} y2={146} color={BLUE} width={3} />
    <G11VectorAdditionArrow x1={260} y1={146} x2={260} y2={56} color={GREEN} width={3} />
    <G11VectorAdditionArrow x1={60} y1={146} x2={260} y2={56} color={RED} width={3} />
    <G11VectorAdditionLabel x={160} y={162} text="a" color="#bfdbfe" />
    <G11VectorAdditionLabel x={274} y={100} text="b" color={GREEN} />
    <G11VectorAdditionLabel x={150} y={88} text="c = a + b" color={RED} />
    <circle cx={60} cy={146} r={4} fill="#0f172a" />
    <circle cx={260} cy={146} r={4} fill="#0f172a" />
    <circle cx={260} cy={56} r={4} fill="#0f172a" />
    <text x={48} y={140} fontSize={12} fontWeight="bold" textAnchor="end" fill="#0f172a">R</text>
    <text x={272} y={140} fontSize={12} fontWeight="bold" fill="#0f172a">R₁</text>
    <text x={272} y={52} fontSize={12} fontWeight="bold" fill="#0f172a">R₂</text>
    <text x={300} y={30} fontSize={11} textAnchor="middle" fill={GREEN} fontWeight="bold">oldalszél</text>
    <G11VectorAdditionArrow x1={330} y1={70} x2={330} y2={40} color={GREEN} width={2} head={7} />
  </svg>
);

/** Összefűzés (háromszögmódszer) két és négy vektorra. */
export const ChainMethodSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11VectorAdditionGrid
    cols={15}
    rows={7}
    cell={24}
    grid={false}
    className={className}
    vectors={[
      { from: [0.5, 1], to: [4, 3], label: 'a', color: BLUE, side: 1 },
      { from: [4, 3], to: [6, 0.5], label: 'b', color: GREEN, side: 1 },
      { from: [0.5, 1], to: [6, 0.5], label: 'a+b', color: RED, side: -1, offset: 13 },
      { from: [8, 1], to: [10.5, 2.5], label: 'a', color: BLUE, side: 1 },
      { from: [10.5, 2.5], to: [13, 1.5], label: 'b', color: GREEN, side: 1 },
      { from: [13, 1.5], to: [14, 4.5], label: 'c', color: PURPLE, side: -1 },
      { from: [14, 4.5], to: [11, 6.5], label: 'd', color: AMBER, side: -1 },
      { from: [8, 1], to: [11, 6.5], label: 'a+b+c+d', color: RED, side: 1, offset: 34, at: 0.45 }
    ]}
  />
);

/** Paralelogrammamódszer: közös kezdőpont, az összeg az átlóvektor. */
export const ParallelogramMethodSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11VectorAdditionGrid
    cols={10}
    rows={6}
    cell={28}
    grid={false}
    className={className}
    polygons={[{ pts: [[1, 1], [6, 1], [9, 5], [4, 5]], fill: 'rgba(37,99,235,0.07)', stroke: '#94a3b8', dashed: true }]}
    vectors={[
      { from: [1, 1], to: [6, 1], label: 'a', color: BLUE, side: -1 },
      { from: [1, 1], to: [4, 5], label: 'b', color: GREEN, side: 1 },
      { from: [1, 1], to: [9, 5], label: 'a+b', color: RED, side: -1, at: 0.62, offset: 14 }
    ]}
    points={[{ at: [1, 1], label: 'O', dx: -8, dy: 12 }]}
  />
);

/** A tankönyv 3. feladatához hasonló rácsvektorok és a kommutativitás: a + b = b + a. */
export const GridSumCommutativeSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11VectorAdditionGrid
    cols={8}
    rows={5}
    cell={30}
    className={className}
    polygons={[{ pts: [[1, 1], [3, 4], [7, 3], [5, 0]], stroke: 'none', fill: 'rgba(220,38,38,0.05)' }]}
    vectors={[
      { from: [1, 1], to: [3, 4], label: 'a', color: BLUE, side: 1 },
      { from: [3, 4], to: [7, 3], label: 'b', color: GREEN, side: 1 },
      { from: [1, 1], to: [5, 0], label: 'b', color: GREEN, side: -1, dashed: true },
      { from: [5, 0], to: [7, 3], label: 'a', color: BLUE, side: -1, dashed: true },
      { from: [1, 1], to: [7, 3], label: 'a+b = b+a', color: RED, side: -1, at: 0.7, offset: 20 }
    ]}
  />
);

/** Házi feladat 4.: a K pontból a trapéz csúcsaiba mutató vektorok összege. */
export const TrapezoidVectorSumSvg: React.FC<FigProps> = ({ className = DEFAULT_CLASS }) => (
  <G11VectorAdditionGrid
    cols={8}
    rows={4}
    cell={40}
    grid={false}
    className={className}
    polygons={[{ pts: [[1, 0.5], [7, 0.5], [5.5, 3.5], [2.5, 3.5]], fill: 'rgba(148,163,184,0.12)', stroke: '#475569' }]}
    vectors={[
      { from: [4, 2.5], to: [1, 0.5], color: BLUE, width: 1.8 },
      { from: [4, 2.5], to: [7, 0.5], color: BLUE, width: 1.8 },
      { from: [4, 2.5], to: [5.5, 3.5], color: GREEN, width: 1.8 },
      { from: [4, 2.5], to: [2.5, 3.5], color: GREEN, width: 1.8 },
      { from: [4, 2.5], to: [4, 0.5], color: RED, width: 3, label: 'összeg', plain: true, side: -1, offset: 26 }
    ]}
    points={[
      { at: [1, 0.5], label: 'A', dx: -8, dy: 12 },
      { at: [7, 0.5], label: 'B', dx: 8, dy: 12 },
      { at: [5.5, 3.5], label: 'C', dx: 8, dy: -4 },
      { at: [2.5, 3.5], label: 'D', dx: -8, dy: -4 },
      { at: [4, 2.5], label: 'K', dx: 0, dy: -9 },
      { at: [4, 0.5], label: 'F', dx: 0, dy: 15, color: RED }
    ]}
    texts={[
      { at: [4, 3.85], text: '3 cm' },
      { at: [5.6, 0.12], text: '6 cm' }
    ]}
  />
);
