// Közös, egyszerű, vastag vonalú képek az 1. osztályos mesékhez és játékokhoz.
// Minden ikon egy (x, y) középpontú, kb. 40×40-es rajz egy SVG-n belül: <svg>{Apple({x:50,y:50})}</svg>
import React from 'react';

export type IconName = 'alma' | 'labda' | 'virag' | 'csillag' | 'hal' | 'auto' | 'madar' | 'level' | 'gomba' | 'szív' | 'korong' | 'pillango' | 'csiga' | 'meh' | 'eper' | 'katica';

export interface IconProps {
  x: number;
  y: number;
  /** méret-szorzó (1 = kb. 40 px) */
  s?: number;
  color?: string;
  key?: React.Key;
}

const g = (x: number, y: number, s: number, children: React.ReactNode, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    {children}
  </g>
);

export const ICONS: Record<IconName, (p: IconProps) => React.ReactElement> = {
  alma: ({ x, y, s = 1, color = '#ef4444', key }) =>
    g(x, y, s, (
      <>
        <path d="M0 -12 C-10 -20 -22 -10 -18 4 C-15 16 -6 20 0 16 C6 20 15 16 18 4 C22 -10 10 -20 0 -12 Z" fill={color} stroke="#7f1d1d" strokeWidth="3" />
        <path d="M0 -12 L2 -20" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M3 -18 Q12 -24 14 -14 Q6 -12 3 -18 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
      </>
    ), key),
  labda: ({ x, y, s = 1, color = '#3b82f6', key }) =>
    g(x, y, s, (
      <>
        <circle r="18" fill={color} stroke="#1e3a8a" strokeWidth="3" />
        <path d="M-18 0 H18 M0 -18 Q-10 0 0 18 M0 -18 Q10 0 0 18" stroke="#fff" strokeWidth="3" fill="none" />
      </>
    ), key),
  virag: ({ x, y, s = 1, color = '#ec4899', key }) =>
    g(x, y, s, (
      <>
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="0" cy="-10" rx="7" ry="10" fill={color} stroke="#9d174d" strokeWidth="2" transform={`rotate(${a})`} />
        ))}
        <circle r="7" fill="#facc15" stroke="#a16207" strokeWidth="2" />
      </>
    ), key),
  csillag: ({ x, y, s = 1, color = '#facc15', key }) =>
    g(x, y, s, <path d="M0 -19 L5.6 -6.5 L19 -5.9 L8.6 3 L12 16.5 L0 9 L-12 16.5 L-8.6 3 L-19 -5.9 L-5.6 -6.5 Z" fill={color} stroke="#a16207" strokeWidth="3" strokeLinejoin="round" />, key),
  hal: ({ x, y, s = 1, color = '#f97316', key }) =>
    g(x, y, s, (
      <>
        <path d="M-16 0 C-8 -14 12 -14 16 0 C12 14 -8 14 -16 0 Z" fill={color} stroke="#9a3412" strokeWidth="3" />
        <path d="M-16 0 L-24 -9 L-24 9 Z" fill={color} stroke="#9a3412" strokeWidth="3" strokeLinejoin="round" />
        <circle cx="8" cy="-3" r="2.5" fill="#111827" />
      </>
    ), key),
  auto: ({ x, y, s = 1, color = '#22c55e', key }) =>
    g(x, y, s, (
      <>
        <path d="M-20 6 V-2 L-12 -4 L-6 -13 H8 L14 -4 L20 -2 V6 Z" fill={color} stroke="#14532d" strokeWidth="3" strokeLinejoin="round" />
        <rect x="-4" y="-10" width="9" height="6" fill="#e0f2fe" />
        <circle cx="-11" cy="8" r="5" fill="#111827" />
        <circle cx="11" cy="8" r="5" fill="#111827" />
      </>
    ), key),
  madar: ({ x, y, s = 1, color = '#38bdf8', key }) =>
    g(x, y, s, (
      <>
        <ellipse rx="15" ry="12" fill={color} stroke="#075985" strokeWidth="3" />
        <path d="M-4 -2 Q2 -12 10 -4" fill="none" stroke="#075985" strokeWidth="3" />
        <path d="M14 -2 L22 1 L14 4 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="2" />
        <circle cx="8" cy="-5" r="2.2" fill="#111827" />
      </>
    ), key),
  level: ({ x, y, s = 1, color = '#22c55e', key }) =>
    g(x, y, s, (
      <>
        <path d="M-16 14 C-18 -8 0 -18 16 -16 C18 4 4 18 -16 14 Z" fill={color} stroke="#14532d" strokeWidth="3" />
        <path d="M-16 14 L10 -10" stroke="#14532d" strokeWidth="2.5" />
      </>
    ), key),
  gomba: ({ x, y, s = 1, color = '#dc2626', key }) =>
    g(x, y, s, (
      <>
        <rect x="-6" y="0" width="12" height="16" rx="4" fill="#fef3c7" stroke="#92400e" strokeWidth="3" />
        <path d="M-19 2 C-19 -16 19 -16 19 2 Z" fill={color} stroke="#7f1d1d" strokeWidth="3" />
        <circle cx="-7" cy="-6" r="3" fill="#fff" />
        <circle cx="6" cy="-9" r="2.5" fill="#fff" />
      </>
    ), key),
  szív: ({ x, y, s = 1, color = '#f43f5e', key }) =>
    g(x, y, s, <path d="M0 16 C-24 0 -16 -20 0 -8 C16 -20 24 0 0 16 Z" fill={color} stroke="#9f1239" strokeWidth="3" />, key),
  korong: ({ x, y, s = 1, color = '#ef4444', key }) => g(x, y, s, <circle r="16" fill={color} stroke="#111827" strokeWidth="3" />, key),
  pillango: ({ x, y, s = 1, color = '#a855f7', key }) =>
    g(x, y, s, (
      <>
        <ellipse cx="-10" cy="-6" rx="10" ry="9" fill={color} stroke="#581c87" strokeWidth="2.5" />
        <ellipse cx="10" cy="-6" rx="10" ry="9" fill={color} stroke="#581c87" strokeWidth="2.5" />
        <ellipse cx="-8" cy="9" rx="7" ry="6" fill={color} stroke="#581c87" strokeWidth="2.5" />
        <ellipse cx="8" cy="9" rx="7" ry="6" fill={color} stroke="#581c87" strokeWidth="2.5" />
        <rect x="-2.5" y="-12" width="5" height="26" rx="2.5" fill="#1f2937" />
      </>
    ), key),
  csiga: ({ x, y, s = 1, color = '#f59e0b', key }) =>
    g(x, y, s, (
      <>
        <path d="M-20 12 H16 Q22 12 20 4" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
        <circle cx="-2" cy="-2" r="13" fill={color} stroke="#92400e" strokeWidth="3" />
        <path d="M-2 -2 m0 -7 a7 7 0 1 1 -6 9" fill="none" stroke="#92400e" strokeWidth="2.5" />
        <path d="M16 6 L20 -8 M20 6 L26 -6" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
      </>
    ), key),
  meh: ({ x, y, s = 1, key }) =>
    g(x, y, s, (
      <>
        <ellipse cx="-6" cy="-12" rx="8" ry="6" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
        <ellipse cx="6" cy="-12" rx="8" ry="6" fill="#e0f2fe" stroke="#0369a1" strokeWidth="2" />
        <ellipse rx="16" ry="11" fill="#facc15" stroke="#1f2937" strokeWidth="3" />
        <path d="M-4 -10 V10 M5 -10 V10" stroke="#1f2937" strokeWidth="4" />
        <circle cx="12" cy="-2" r="2" fill="#1f2937" />
      </>
    ), key),
  eper: ({ x, y, s = 1, key }) =>
    g(x, y, s, (
      <>
        <path d="M0 18 C-18 6 -16 -10 0 -10 C16 -10 18 6 0 18 Z" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" />
        <path d="M-9 -12 L0 -6 L9 -12 L4 -16 L0 -12 L-4 -16 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
        {[[-6, 0], [5, 2], [0, 9], [-2, -3]].map(([a, b], i) => (
          <circle key={i} cx={a} cy={b} r="1.6" fill="#fef08a" />
        ))}
      </>
    ), key),
  katica: ({ x, y, s = 1, key }) =>
    g(x, y, s, (
      <>
        <circle cx="0" cy="-12" r="7" fill="#111827" />
        <ellipse rx="15" ry="13" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" />
        <path d="M0 -13 V13" stroke="#7f1d1d" strokeWidth="2.5" />
        <circle cx="-7" cy="-2" r="3" fill="#111827" />
        <circle cx="7" cy="3" r="3" fill="#111827" />
      </>
    ), key),
};

/** n darab ikon szép elrendezésben (max perRow egy sorban), egy kész SVG-ként. */
export const IconGroup: React.FC<{ icon: IconName; n: number; perRow?: number; color?: string; className?: string; frame?: boolean; cell?: number }> = ({
  icon,
  n,
  perRow = 5,
  color,
  className = 'w-full max-w-[300px] h-auto mx-auto',
  frame = false,
  cell = 50,
}) => {
  const cols = Math.min(perRow, Math.max(1, n));
  const rows = Math.max(1, Math.ceil(n / perRow));
  const w = cols * cell + 16;
  const h = rows * cell + 16;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      {frame && <rect x="2" y="2" width={w - 4} height={h - 4} rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />}
      {Array.from({ length: n }, (_, i) => ICONS[icon]({ x: 8 + (i % perRow) * cell + cell / 2, y: 8 + Math.floor(i / perRow) * cell + cell / 2, s: cell / 50, color, key: i }))}
    </svg>
  );
};

/** Kéz felemelt ujjakkal (0–5). */
export const Hand: React.FC<{ fingers: number; className?: string; color?: string }> = ({ fingers, className = 'w-24 h-24', color = '#fcd9b6' }) => {
  const f = Math.max(0, Math.min(5, fingers));
  // ujjak: hüvelyk (bal), mutató, középső, gyűrűs, kisujj
  const order = [1, 2, 3, 4, 0]; // először a mutatóujj emelkedik
  const up = new Set(order.slice(0, f));
  const fx = [18, 34, 48, 62, 76];
  const tall = [0, 34, 38, 34, 28];
  return (
    <svg viewBox="0 0 100 110" className={className}>
      {fx.map((x, i) =>
        i === 0 ? (
          <rect key={i} x={up.has(0) ? 10 : 16} y={up.has(0) ? 48 : 58} width="15" height={up.has(0) ? 34 : 18} rx="7.5" fill={color} stroke="#9a3412" strokeWidth="3" transform={up.has(0) ? 'rotate(-28 24 82)' : undefined} />
        ) : (
          <rect key={i} x={x - 6} y={up.has(i) ? 60 - tall[i] - 14 : 50} width="13" height={up.has(i) ? tall[i] + 16 : 16} rx="6.5" fill={color} stroke="#9a3412" strokeWidth="3" />
        )
      )}
      <rect x="22" y="56" width="62" height="46" rx="18" fill={color} stroke="#9a3412" strokeWidth="3" />
    </svg>
  );
};

/** Dominó két térfelén pöttyökkel (0–6). */
export const Domino: React.FC<{ left: number; right?: number; className?: string; single?: boolean }> = ({ left, right = 0, className = 'w-36 h-auto', single = false }) => {
  const P: Record<number, [number, number][]> = {
    0: [],
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
  };
  const half = (n: number, cx: number) => (P[Math.max(0, Math.min(6, n))] || []).map(([a, b], i) => <circle key={`${cx}-${i}`} cx={cx + a * 14} cy={40 + b * 14} r="6" fill="#111827" />);
  const w = single ? 80 : 160;
  return (
    <svg viewBox={`0 0 ${w} 80`} className={className}>
      <rect x="3" y="3" width={w - 6} height="74" rx="12" fill="#fff" stroke="#111827" strokeWidth="4" />
      {!single && <path d="M80 10 V70" stroke="#111827" strokeWidth="3" />}
      {half(left, 40)}
      {!single && half(right, 120)}
    </svg>
  );
};

/** Számegyenes 0-tól max-ig; a `mark` számhoz piros pötty, a `question` számhoz "?" kerül. */
export const NumberLine: React.FC<{ max?: number; min?: number; mark?: number[]; question?: number; hideLabels?: number[]; className?: string; jumps?: { from: number; to: number }[] }> = ({
  max = 10,
  min = 0,
  mark = [],
  question,
  hideLabels = [],
  className = 'w-full max-w-[460px] h-auto mx-auto',
  jumps = [],
}) => {
  const n = max - min;
  const step = Math.min(44, 420 / n);
  const x0 = 20;
  const X = (v: number) => x0 + (v - min) * step;
  const w = x0 * 2 + n * step + 14;
  return (
    <svg viewBox={`0 0 ${w} 96`} className={className}>
      <path d={`M${x0 - 8} 60 H${w - 8}`} stroke="#1f2937" strokeWidth="4" />
      <path d={`M${w - 16} 53 L${w - 6} 60 L${w - 16} 67`} fill="none" stroke="#1f2937" strokeWidth="4" strokeLinejoin="round" />
      {jumps.map((j, i) => {
        const a = X(j.from), b = X(j.to), mid = (a + b) / 2;
        return <path key={`j${i}`} d={`M${a} 54 Q${mid} ${54 - Math.max(20, Math.abs(b - a) * 0.5)} ${b} 54`} fill="none" stroke="#7c3aed" strokeWidth="3.5" markerEnd="" />;
      })}
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = min + i;
        const x = X(v);
        return (
          <g key={v}>
            <path d={`M${x} 50 V70`} stroke="#1f2937" strokeWidth="3" />
            {v === question ? (
              <text x={x} y="92" textAnchor="middle" fontSize="20" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">?</text>
            ) : hideLabels.includes(v) ? null : (
              <text x={x} y="92" textAnchor="middle" fontSize={n > 12 ? 13 : 18} fontWeight="800" fill="#1f2937" fontFamily="system-ui, sans-serif">{v}</text>
            )}
            {mark.includes(v) && <circle cx={x} cy="60" r="8" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />}
          </g>
        );
      })}
    </svg>
  );
};

/** Nagy számjegy írásirányt mutató nyíllal és kezdőponttal (a mese "Így írjuk" oldalához). */
export const DigitTrace: React.FC<{ digit: string | number; className?: string; color?: string }> = ({ digit, className = 'w-40 h-48 mx-auto', color = '#ef4444' }) => {
  // egyszerű írásvázak 0–9-hez (100×120-as rácson)
  const PATHS: Record<string, string> = {
    '0': 'M50 14 C20 14 18 106 50 106 C82 106 80 14 50 14',
    '1': 'M28 40 L62 12 L62 108',
    '2': 'M24 36 C26 6 78 6 76 38 C74 60 40 80 22 106 H80',
    '3': 'M26 22 C46 4 78 14 72 38 C68 54 52 58 44 58 C62 58 80 66 76 86 C72 110 36 112 22 96',
    '4': 'M54 12 L20 78 H82|M64 42 V108',
    '5': 'M32 14 L28 54 C50 42 80 50 78 78 C76 106 40 112 22 96|M32 14 H74',
    '6': 'M70 18 C40 6 22 40 24 76 C26 106 74 110 76 78 C78 50 40 46 26 70',
    '7': 'M22 14 H78 L40 108',
    '8': 'M66 22 C58 10 28 14 30 34 C32 52 70 58 72 80 C74 104 26 106 28 82 C30 60 68 52 70 36 C71 28 69 24 66 22',
    '9': 'M74 40 C74 6 22 8 24 40 C26 66 70 66 74 40 V64 C74 96 52 110 26 102',
  };
  const ds = String(digit).split('').filter((c) => PATHS[c]);
  const w = 100 * Math.max(1, ds.length);
  return (
    <svg viewBox={`0 0 ${w} 120`} className={className}>
      {ds.map((c, i) => {
        const strokes = PATHS[c].split('|');
        return (
          <g key={i} transform={`translate(${i * 100} 0)`}>
            <rect x="4" y="4" width="92" height="112" rx="10" fill="#fff" stroke="#93c5fd" strokeWidth="2" strokeDasharray="6 5" />
            {strokes.map((d, k) => <path key={`b${k}`} d={d} fill="none" stroke="#e2e8f0" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />)}
            {strokes.map((d, k) => <path key={`s${k}`} d={d} fill="none" stroke={k === 0 ? color : '#2563eb'} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 8" />)}
            {strokes.map((d, k) => {
              const m = /M(\d+) (\d+)/.exec(d);
              if (!m) return null;
              return (
                <g key={`m${k}`}>
                  <circle cx={m[1]} cy={m[2]} r="8" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
                  {strokes.length > 1 && <text x={Number(m[1])} y={Number(m[2]) + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff" fontFamily="system-ui, sans-serif">{k + 1}</text>}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
};

/** Tízes keret (2×5) n korong(gal); a második szín a `second` darabot jelöli (pl. összeadásnál). */
export const TenFrame: React.FC<{ n: number; second?: number; className?: string; colorA?: string; colorB?: string; crossed?: number }> = ({
  n,
  second = 0,
  className = 'w-full max-w-[280px] h-auto mx-auto',
  colorA = '#ef4444',
  colorB = '#3b82f6',
  crossed = 0,
}) => (
  <svg viewBox="0 0 260 112" className={className}>
    <rect x="3" y="3" width="254" height="106" rx="10" fill="#fff" stroke="#1f2937" strokeWidth="4" />
    {[1, 2, 3, 4].map((i) => (
      <path key={i} d={`M${3 + i * 50.8} 3 V109`} stroke="#1f2937" strokeWidth="3" />
    ))}
    <path d="M3 56 H257" stroke="#1f2937" strokeWidth="3" />
    {Array.from({ length: Math.min(10, n + second) }, (_, i) => {
      const cx = 28.4 + (i % 5) * 50.8;
      const cy = 29.5 + Math.floor(i / 5) * 53;
      const isCrossed = i >= Math.min(10, n + second) - crossed;
      return (
        <g key={i}>
          <circle cx={cx} cy={cy} r="18" fill={i < n ? colorA : colorB} stroke="#111827" strokeWidth="3" />
          {isCrossed && <path d={`M${cx - 16} ${cy - 16} L${cx + 16} ${cy + 16}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
        </g>
      );
    })}
  </svg>
);

/** Kártya nagy számjeggyel vagy jellel (<, >, =, +, −). */
export const BigSign: React.FC<{ text: string | number; className?: string; color?: string; bg?: string }> = ({ text, className = 'w-20 h-20', color = '#1e293b', bg = '#fff' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <rect x="3" y="3" width="74" height="74" rx="16" fill={bg} stroke="#94a3b8" strokeWidth="3" />
    <text x="40" y="56" textAnchor="middle" fontSize={String(text).length > 1 ? 36 : 48} fontWeight="900" fill={color} fontFamily="system-ui, sans-serif">
      {text}
    </text>
  </svg>
);
