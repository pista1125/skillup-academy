import React from 'react';

// ---------------------------------------------------------------------------
// Közös SVG-elemek és laborgenerátorok – 4. Összeadás, kivonás kerek tízesekkel
// (2. osztály, II. témakör). Minden szám 0 és 50 között marad, csak + és −.
// ---------------------------------------------------------------------------

export const RT_FONT = 'system-ui, Segoe UI, sans-serif';
export const RT_INK = '#0f172a';
export const RT_SUB = '#334155';
export const RT_UNK = '#dc2626';

export const ROD_ORANGE = { fill: '#f59e0b', stroke: '#92400e' };
export const ROD_BLUE = { fill: '#60a5fa', stroke: '#1e3a8a' };
export const ROD_GREEN = { fill: '#4ade80', stroke: '#166534' };
export const CUBE_GREEN = { fill: '#86efac', stroke: '#15803d' };

/** Kérdésábra-keret (260 széles). */
export const RTQFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 110, children }) => (
  <svg
    viewBox={`0 0 260 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={RT_FONT}
  >
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

export interface RodGroup {
  count: number;
  fill?: string;
  stroke?: string;
}

/**
 * Tízesrudak (függőleges, 10 kockából) és egyeskockák.
 * `crossed`: az utolsó ennyi rudat piros vonallal áthúzzuk (elvétel).
 * `crossedOnes`: az utolsó ennyi egyeskockát áthúzzuk.
 */
export const RodsPart: React.FC<{
  x?: number;
  y?: number;
  cell?: number;
  groups: RodGroup[];
  ones?: number;
  crossed?: number;
  crossedOnes?: number;
  groupGap?: number;
}> = ({ x = 20, y = 14, cell = 7, groups, ones = 0, crossed = 0, crossedOnes = 0, groupGap = 10 }) => {
  const rodW = cell + 4;
  const step = rodW + 5;
  const rods: { gx: number; fill: string; stroke: string }[] = [];
  let cx = x;
  groups.forEach((g, gi) => {
    for (let i = 0; i < g.count; i++) {
      rods.push({ gx: cx, fill: g.fill ?? ROD_ORANGE.fill, stroke: g.stroke ?? ROD_ORANGE.stroke });
      cx += step;
    }
    if (gi < groups.length - 1 && g.count > 0) cx += groupGap;
  });
  const total = rods.length;
  const onesX = cx + (total > 0 ? 6 : 0);
  return (
    <g>
      {rods.map((r, i) => {
        const isCrossed = i >= total - crossed;
        return (
          <g key={`r${i}`} opacity={isCrossed ? 0.55 : 1}>
            <rect x={r.gx} y={y} width={rodW} height={cell * 10} rx="2.5" fill={r.fill} stroke={r.stroke} strokeWidth="1.4" />
            {Array.from({ length: 9 }, (_, k) => (
              <line
                key={k}
                x1={r.gx}
                y1={y + (k + 1) * cell}
                x2={r.gx + rodW}
                y2={y + (k + 1) * cell}
                stroke={r.stroke}
                strokeWidth="0.7"
              />
            ))}
            {isCrossed && (
              <line
                x1={r.gx - 3}
                y1={y + cell * 10 + 3}
                x2={r.gx + rodW + 3}
                y2={y - 3}
                stroke={RT_UNK}
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}
      {Array.from({ length: ones }, (_, i) => {
        const ox = onesX + Math.floor(i / 5) * (cell + 4);
        const oy = y + cell * 10 - cell - (i % 5) * (cell + 3);
        const isCrossed = i >= ones - crossedOnes;
        return (
          <g key={`o${i}`} opacity={isCrossed ? 0.55 : 1}>
            <rect x={ox} y={oy} width={cell} height={cell} rx="1.4" fill={CUBE_GREEN.fill} stroke={CUBE_GREEN.stroke} strokeWidth="1.2" />
            {isCrossed && (
              <line x1={ox - 2} y1={oy + cell + 2} x2={ox + cell + 2} y2={oy - 2} stroke={RT_UNK} strokeWidth="2" />
            )}
          </g>
        );
      })}
    </g>
  );
};

/** A RodsPart szélessége (elrendezéshez). */
export const rodsWidth = (groups: RodGroup[], ones = 0, cell = 7, groupGap = 10) => {
  const rodW = cell + 4;
  const step = rodW + 5;
  const nonEmpty = groups.filter((g) => g.count > 0).length;
  const total = groups.reduce((s, g) => s + g.count, 0);
  const onesCols = Math.ceil(ones / 5);
  return total * step + Math.max(0, nonEmpty - 1) * groupGap + (ones > 0 ? 6 + onesCols * (cell + 4) : 0);
};

export interface JumpArc {
  from: number;
  to: number;
  label?: string;
  color?: string;
}

/** 0–50 számegyenes ugrásívekkel és jelölésekkel. */
export const NumLine50Part: React.FC<{
  x0?: number;
  x1?: number;
  y?: number;
  from?: number;
  to?: number;
  labelEvery?: number;
  jumps?: JumpArc[];
  marks?: { v: number; label?: string; color?: string }[];
  minorTicks?: boolean;
  hideLabels?: boolean;
}> = ({ x0 = 16, x1 = 244, y = 70, from = 0, to = 50, labelEvery = 10, jumps = [], marks = [], minorTicks = true, hideLabels = false }) => {
  const u = (x1 - x0) / (to - from);
  const X = (v: number) => x0 + (v - from) * u;
  return (
    <g>
      <line x1={x0 - 4} y1={y} x2={x1 + 6} y2={y} stroke={RT_SUB} strokeWidth="1.8" />
      <path d={`M ${x1 + 6} ${y - 4} L ${x1 + 12} ${y} L ${x1 + 6} ${y + 4} Z`} fill={RT_SUB} />
      {Array.from({ length: to - from + 1 }, (_, i) => {
        const v = from + i;
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        if (!minorTicks && !mid) return null;
        return (
          <line
            key={v}
            x1={X(v)}
            y1={y - (big ? 7 : mid ? 5 : 3)}
            x2={X(v)}
            y2={y + (big ? 7 : mid ? 5 : 3)}
            stroke={RT_SUB}
            strokeWidth={big ? 1.8 : 0.9}
          />
        );
      })}
      {Array.from({ length: to - from + 1 }, (_, i) => from + i)
        .filter((v) => !hideLabels && v % labelEvery === 0)
        .map((v) => (
          <text key={`l${v}`} x={X(v)} y={y + 19} textAnchor="middle" fontSize="11" fontWeight="bold" fill={RT_SUB}>
            {v}
          </text>
        ))}
      {jumps.map((j, i) => {
        const mx = (X(j.from) + X(j.to)) / 2;
        const h = Math.min(34, 12 + Math.abs(X(j.to) - X(j.from)) * 0.45);
        const col = j.color ?? (j.to >= j.from ? '#2563eb' : '#dc2626');
        return (
          <g key={`j${i}`}>
            <path
              d={`M ${X(j.from)} ${y - 4} Q ${mx} ${y - 4 - h * 2} ${X(j.to)} ${y - 4}`}
              fill="none"
              stroke={col}
              strokeWidth="2.2"
            />
            <path d={`M ${X(j.to) - 3.5} ${y - 10} L ${X(j.to)} ${y - 4} L ${X(j.to) + 3.5} ${y - 10}`} fill="none" stroke={col} strokeWidth="2" />
            {j.label && (
              <text x={mx} y={y - h - 8} textAnchor="middle" fontSize="12" fontWeight="bold" fill={col}>
                {j.label}
              </text>
            )}
          </g>
        );
      })}
      {marks.map((m, i) => (
        <g key={`m${i}`}>
          <circle cx={X(m.v)} cy={y} r="4.2" fill={m.color ?? RT_UNK} />
          {m.label && (
            <text x={X(m.v)} y={y + 34} textAnchor="middle" fontSize="13" fontWeight="900" fill={m.color ?? RT_UNK}>
              {m.label}
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

/** Pénzérme (10, 20, 50 Ft) vagy „?” érme. */
export const CoinPart: React.FC<{ cx: number; cy: number; value: number | '?'; r?: number }> = ({ cx, cy, value, r = 17 }) => {
  const style =
    value === 50
      ? { fill: '#fde68a', stroke: '#b45309', text: '#78350f' }
      : value === 20
        ? { fill: '#e9d5ff', stroke: '#7e22ce', text: '#581c87' }
        : value === 10
          ? { fill: '#e2e8f0', stroke: '#475569', text: '#1e293b' }
          : { fill: '#fff1f2', stroke: RT_UNK, text: RT_UNK };
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={style.fill} stroke={style.stroke} strokeWidth="2.5" strokeDasharray={value === '?' ? '4 3' : undefined} />
      <circle cx={cx} cy={cy} r={r - 4} fill="none" stroke={style.stroke} strokeWidth="0.8" opacity="0.6" />
      <text x={cx} y={cy + (value === '?' ? 6 : 3)} textAnchor="middle" fontSize={value === '?' ? r : r * 0.78} fontWeight="900" fill={style.text}>
        {value}
      </text>
      {value !== '?' && (
        <text x={cx} y={cy + r * 0.62} textAnchor="middle" fontSize={r * 0.4} fontWeight="bold" fill={style.text}>
          Ft
        </text>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Laborgenerátorok
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export interface RodTask {
  start: number;
  /** +10, +20, … vagy −10, −20, … */
  delta: number;
  answer: number;
  options: number[];
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Kerek tízes ± kerek tízes, vagy kétjegyű szám ± kerek tízes, 0–50 között. */
export const makeRodTask = (): RodTask => {
  for (;;) {
    const roundStart = Math.random() < 0.4;
    const start = roundStart ? rnd(1, 5) * 10 : rnd(11, 49);
    if (!roundStart && start % 10 === 0) continue;
    const plus = Math.random() < 0.5;
    const k = rnd(1, 4) * 10;
    const answer = plus ? start + k : start - k;
    if (answer < 0 || answer > 50) continue;
    const delta = plus ? k : -k;
    const ones = start % 10;
    const kt = k / 10;
    const wrong = new Set<number>();
    // tipikus hibák: az egyeseket változtatja, ±10, fordított művelet
    const onesMistake = plus ? start + kt : start - kt;
    [onesMistake, answer + 10, answer - 10, plus ? start - k : start + k, ones + kt].forEach((w) => {
      if (w >= 0 && w <= 50 && w !== answer) wrong.add(w);
    });
    const wrongs = shuffle([...wrong]).slice(0, 3);
    while (wrongs.length < 3) {
      const w = rnd(0, 50);
      if (w !== answer && !wrongs.includes(w)) wrongs.push(w);
    }
    return { start, delta, answer, options: shuffle([answer, ...wrongs]) };
  }
};

export const SHOP_ITEMS: { name: string; price: number; color: string }[] = [
  { name: 'radír', price: 20, color: '#f472b6' },
  { name: 'ceruza', price: 30, color: '#facc15' },
  { name: 'füzet', price: 40, color: '#60a5fa' },
  { name: 'labda', price: 50, color: '#f87171' },
  { name: 'matrica', price: 10, color: '#a78bfa' },
  { name: 'körte', price: 30, color: '#a3e635' },
  { name: 'alma', price: 40, color: '#ef4444' }
];

export const makeShopTask = (prevName?: string) => {
  for (;;) {
    const item = SHOP_ITEMS[rnd(0, SHOP_ITEMS.length - 1)];
    if (item.name !== prevName && item.price >= 20) return item;
  }
};

/** Az érmék összegének „rendezett kulcsa” (10, 20, 50 db szám szerint). */
export const coinKey = (coins: number[]) =>
  [...coins].sort((a, b) => b - a).join(' + ');
