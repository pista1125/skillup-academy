import React, { useId } from 'react';

/** Belső rajzsegédek a valószínűségszámítási leckék ábráihoz (nem exportáljuk az index.ts-ből). */

export const C_RED = '#dc2626';
export const C_BLUE = '#2563eb';
export const C_GREEN = '#16a34a';
export const C_PURPLE = '#7c3aed';
export const C_AMBER = '#d97706';
export const C_EDGE = '#334155';
export const F_RED = '#fecaca';
export const F_BLUE = '#bfdbfe';
export const F_GREEN = '#bbf7d0';
export const F_PURPLE = '#ddd6fe';
export const F_AMBER = '#fde68a';

/** Felülvonás (komplementer) a szövegekben: a MathText \bar{A}-ként rendereli. */
export const bar = (s: string) => `${s}̄`;

const cleanId = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, '');

/** Kvízábra-keret. */
export const QFig: React.FC<{ w?: number; h?: number; children: React.ReactNode }> = ({ w = 240, h = 160, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    {children}
  </svg>
);

/** Tananyag-ábra keret címmel. */
export const Frame: React.FC<{ title: string; className?: string; w?: number; h?: number; children: React.ReactNode }> = ({
  title,
  className = 'w-full h-auto max-w-xl mx-auto',
  w = 480,
  h = 300,
  children
}) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="4" y="4" width={w - 8} height={h - 8} rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
    <text x={w / 2} y="26" fontSize="14" textAnchor="middle" fontWeight="bold" fill="#0f172a">
      {title}
    </text>
    {children}
  </svg>
);

export const T: React.FC<{ x: number; y: number; t: string; s?: number; c?: string; a?: 'start' | 'middle' | 'end'; b?: boolean; it?: boolean }> = ({
  x,
  y,
  t,
  s = 11,
  c = '#0f172a',
  a = 'middle',
  b = false,
  it = false
}) => (
  <text x={x} y={y} fontSize={s} fill={c} textAnchor={a} fontWeight={b ? 'bold' : 'normal'} fontStyle={it ? 'italic' : 'normal'} dominantBaseline="middle">
    {t}
  </text>
);

/** Felülvonásos betű SVG-ben (komplementer jelölése). */
export const BarT: React.FC<{ x: number; y: number; t: string; s?: number; c?: string; b?: boolean }> = ({ x, y, t, s = 12, c = '#0f172a', b = true }) => {
  const w = s * 0.62 * t.length;
  return (
    <g>
      <T x={x} y={y} t={t} s={s} c={c} b={b} />
      <line x1={x - w / 2} y1={y - s * 0.62} x2={x + w / 2} y2={y - s * 0.62} stroke={c} strokeWidth={1.3} />
    </g>
  );
};

export interface VennShade {
  out?: string;
  aOnly?: string;
  bOnly?: string;
  ab?: string;
}

/**
 * Két eseményes Venn-diagram: H téglalap, A és B kör.
 * gap: a középpontok távolsága (ha >= 2r, akkor egymást kizáró események).
 */
export const Venn2: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  r?: number;
  gap?: number;
  shade?: VennShade;
  labelA?: string;
  labelB?: string;
  labelH?: string;
  barA?: boolean;
  items?: { x: number; y: number; t: string; c?: string; s?: number }[];
  noB?: boolean;
}> = ({ x = 10, y = 10, w = 220, h = 140, r = 46, gap = 56, shade = {}, labelA = 'A', labelB = 'B', labelH = 'H', items = [], noB = false }) => {
  const raw = useId();
  const id = `vn${cleanId(raw)}`;
  const cy = y + h / 2 + 4;
  const ax = x + w / 2 - (noB ? 0 : gap / 2);
  const bx = x + w / 2 + gap / 2;
  return (
    <g>
      <defs>
        <clipPath id={`${id}a`}>
          <circle cx={ax} cy={cy} r={r} />
        </clipPath>
      </defs>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={shade.out ?? '#ffffff'} stroke={C_EDGE} strokeWidth={1.6} />
      <circle cx={ax} cy={cy} r={r} fill={shade.aOnly ?? '#ffffff'} />
      {!noB && <circle cx={bx} cy={cy} r={r} fill={shade.bOnly ?? '#ffffff'} />}
      {!noB && <circle cx={bx} cy={cy} r={r} fill={shade.ab ?? '#ffffff'} clipPath={`url(#${id}a)`} />}
      <circle cx={ax} cy={cy} r={r} fill="none" stroke={C_BLUE} strokeWidth={1.8} />
      {!noB && <circle cx={bx} cy={cy} r={r} fill="none" stroke={C_RED} strokeWidth={1.8} />}
      <T x={x + 8} y={y + 14} t={labelH} s={13} b c={C_EDGE} a="start" />
      <T x={ax - r * 0.78} y={cy - r * 0.86} t={labelA} s={13} b c={C_BLUE} />
      {!noB && <T x={bx + r * 0.78} y={cy - r * 0.86} t={labelB} s={13} b c={C_RED} />}
      {items.map((it, i) => (
        <T key={i} x={it.x} y={it.y} t={it.t} s={it.s ?? 9.5} c={it.c ?? '#0f172a'} />
      ))}
    </g>
  );
};

/** 6 × 6-os dobókocka-táblázat: sor = fehér kocka, oszlop = fekete kocka. */
export const DiceGrid: React.FC<{
  x?: number;
  y?: number;
  cell?: number;
  hl?: (w: number, b: number) => string | undefined;
  text?: (w: number, b: number) => string;
  showAxes?: boolean;
  fs?: number;
}> = ({ x = 40, y = 30, cell = 18, hl, text, showAxes = true, fs = 8 }) => {
  const cells: React.ReactNode[] = [];
  for (let w = 1; w <= 6; w++) {
    for (let b = 1; b <= 6; b++) {
      const cx = x + (b - 1) * cell;
      const cyy = y + (w - 1) * cell;
      const f = hl?.(w, b);
      cells.push(
        <g key={`${w}-${b}`}>
          <rect x={cx} y={cyy} width={cell} height={cell} fill={f ?? '#ffffff'} stroke="#94a3b8" strokeWidth={0.8} />
          {text && <T x={cx + cell / 2} y={cyy + cell / 2 + 0.5} t={text(w, b)} s={fs} c="#334155" />}
        </g>
      );
    }
  }
  return (
    <g>
      {cells}
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <T x={x + i * cell + cell / 2} y={y - 7} t={String(i + 1)} s={9} b c="#0f172a" />
          <rect x={x - cell + 2} y={y + i * cell + 2} width={cell - 4} height={cell - 4} rx={3} fill="#ffffff" stroke={C_EDGE} strokeWidth={0.8} />
          <T x={x - cell / 2} y={y + i * cell + cell / 2 + 0.5} t={String(i + 1)} s={9} b c="#0f172a" />
        </g>
      ))}
      {showAxes && (
        <>
          <T x={x + 3 * cell} y={y - 18} t="fekete kocka" s={9} c="#475569" />
          <text x={x - cell - 8} y={y + 3 * cell} fontSize={9} fill="#475569" textAnchor="middle" transform={`rotate(-90 ${x - cell - 8} ${y + 3 * cell})`}>
            fehér kocka
          </text>
        </>
      )}
    </g>
  );
};

/** Pénzérme (F / I felirattal). */
export const Coin: React.FC<{ x: number; y: number; r?: number; face?: 'F' | 'I' | string; label?: string; fill?: string }> = ({ x, y, r = 14, face, label, fill = '#fde68a' }) => (
  <g>
    <circle cx={x} cy={y} r={r} fill={fill} stroke={C_AMBER} strokeWidth={1.6} />
    <circle cx={x} cy={y} r={r - 3} fill="none" stroke={C_AMBER} strokeWidth={0.7} />
    {face && <T x={x} y={y + 0.5} t={face} s={r * 0.8} b c="#78350f" />}
    {label && <T x={x} y={y + r + 9} t={label} s={9} c="#475569" />}
  </g>
);

/** Körcikk útvonala (szögek fokban, 0° = fel, óramutató járása szerint). */
export const sectorPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  const p = (a: number) => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)];
  const [x0, y0] = p(a0);
  const [x1, y1] = p(a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  if (a1 - a0 >= 359.999) return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
};

/** Körgyűrű-útvonal (even-odd kitöltéssel). */
export const ringPath = (cx: number, cy: number, R: number, r: number) =>
  `M ${cx - R} ${cy} A ${R} ${R} 0 1 1 ${cx + R} ${cy} A ${R} ${R} 0 1 1 ${cx - R} ${cy} Z ` +
  (r > 0 ? `M ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} Z` : '');

export const fmt = (x: number, d = 3) => {
  if (!Number.isFinite(x)) return '–';
  const s = x.toFixed(d).replace(/\.?0+$/, '');
  return s.replace('.', ',');
};

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const frac = (p: number, q: number) => {
  if (q === 0) return '–';
  if (p === 0) return '0';
  const g = gcd(p, q);
  return q / g === 1 ? String(p / g) : `${p / g}/${q / g}`;
};
