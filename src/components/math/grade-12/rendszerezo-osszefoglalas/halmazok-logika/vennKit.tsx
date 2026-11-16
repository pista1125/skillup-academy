import React from 'react';

/** Belső rajzsegédek a halmazok–logika összefoglaló leckéhez (nem exportáljuk az index.ts-ből). */

export const K_BLUE = '#2563eb';
export const K_RED = '#dc2626';
export const K_GREEN = '#059669';
export const K_PURPLE = '#7c3aed';
export const K_AMBER = '#d97706';
export const K_INK = '#0f172a';

type Circle = { cx: number; cy: number; r: number };
type Layout = { circles: Circle[]; pos: Record<string, [number, number]>; labels: [number, number][] };

/** A régiókódok: minden halmazhoz egy bit (1 = benne van), pl. '10' = csak A; '000' = egyikben sincs. */
const L2: Layout = {
  circles: [
    { cx: 95, cy: 88, r: 52 },
    { cx: 150, cy: 88, r: 52 }
  ],
  pos: { '10': [70, 92], '01': [175, 92], '11': [122, 92], '00': [26, 30] },
  labels: [
    [52, 40],
    [192, 40]
  ]
};

const L3: Layout = {
  circles: [
    { cx: 100, cy: 70, r: 46 },
    { cx: 145, cy: 70, r: 46 },
    { cx: 122, cy: 110, r: 46 }
  ],
  pos: {
    '100': [80, 62],
    '010': [165, 62],
    '001': [122, 140],
    '110': [122, 48],
    '101': [97, 103],
    '011': [147, 103],
    '111': [122, 86],
    '000': [26, 30]
  },
  labels: [
    [58, 30],
    [186, 30],
    [176, 156]
  ]
};

export interface VennProps {
  n?: 2 | 3;
  labels?: string[];
  /** a besatírozandó régiók kódjai */
  shade?: string[];
  shadeColor?: string;
  /** régiókba írt értékek (kód → szöveg) */
  values?: Record<string, string | number>;
  universe?: string;
  title?: string;
  className?: string;
  /** beágyazás egy nagyobb SVG-be: x, y, szélesség */
  embed?: { x: number; y: number; w: number };
}

/** Venn-diagram 2 vagy 3 halmazzal, tetszőleges régiók satírozásával (clipPath + mask). */
export const Venn: React.FC<VennProps> = ({
  n = 2,
  labels,
  shade = [],
  shadeColor = '#93c5fd',
  values = {},
  universe = 'H',
  title,
  className = 'w-full max-w-[280px] h-auto mx-auto',
  embed
}) => {
  const raw = React.useId();
  const idp = 'v' + raw.replace(/[^a-zA-Z0-9]/g, '');
  const L = n === 3 ? L3 : L2;
  const names = labels ?? (n === 3 ? ['A', 'B', 'C'] : ['A', 'B']);
  const top = title ? 22 : 10;
  const region = (code: string) => {
    let node: React.ReactNode = <rect x="10" y={top} width="225" height={162 - top} fill={shadeColor} />;
    code.split('').forEach((b, i) => {
      node = b === '1' ? <g clipPath={`url(#${idp}c${i})`}>{node}</g> : <g mask={`url(#${idp}m${i})`}>{node}</g>;
    });
    return <g key={code}>{node}</g>;
  };
  return (
    <svg
      viewBox="0 0 245 172"
      {...(embed ? { x: embed.x, y: embed.y, width: embed.w, height: (embed.w * 172) / 245 } : { className })}
      xmlns="http://www.w3.org/2000/svg"
      fontFamily="system-ui, sans-serif"
    >
      <defs>
        {L.circles.map((c, i) => (
          <React.Fragment key={i}>
            <clipPath id={`${idp}c${i}`}>
              <circle cx={c.cx} cy={c.cy} r={c.r} />
            </clipPath>
            <mask id={`${idp}m${i}`}>
              <rect x="0" y="0" width="245" height="172" fill="white" />
              <circle cx={c.cx} cy={c.cy} r={c.r} fill="black" />
            </mask>
          </React.Fragment>
        ))}
      </defs>
      <rect x="10" y={top} width="225" height={162 - top} rx="8" fill="#f8fafc" stroke="#64748b" strokeWidth="1.2" />
      {title && (
        <text x="122" y="15" fontSize="11" textAnchor="middle" fontWeight="bold" fill={K_INK}>
          {title}
        </text>
      )}
      {shade.map(region)}
      {L.circles.map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="none" stroke={[K_BLUE, K_RED, K_GREEN][i]} strokeWidth="1.8" />
      ))}
      {names.map((t, i) => (
        <text key={t + i} x={L.labels[i][0]} y={L.labels[i][1] + (title && n === 3 && i < 2 ? 2 : 0)} fontSize="13" fontWeight="bold" textAnchor="middle" fill={[K_BLUE, K_RED, K_GREEN][i]}>
          {t}
        </text>
      ))}
      <text x="226" y={top + 14} fontSize="12" fontWeight="bold" textAnchor="end" fill="#475569">
        {universe}
      </text>
      {Object.entries(values).map(([code, v]) => {
        const p = L.pos[code];
        if (!p) return null;
        const yy = code.split('').every((b) => b === '0') ? Math.max(p[1], top + 16) : p[1];
        return (
          <text key={code} x={p[0]} y={yy} fontSize="12" fontWeight="bold" textAnchor="middle" fill={K_INK}>
            {v}
          </text>
        );
      })}
    </svg>
  );
};

/** Igazságérték megjelenítése. */
export const tv = (b: boolean) => (b ? 'igaz' : 'hamis');
