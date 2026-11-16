import React from 'react';

export const FONT = 'system-ui, sans-serif';

// ---------------------------------------------------------------------------
// A törtrészek nevei – a tankönyv szavaival (fél / 1 ketted, 1 harmad, 3 negyed …)
// ---------------------------------------------------------------------------
export const DENOM_NAMES: Record<number, string> = {
  2: 'ketted',
  3: 'harmad',
  4: 'negyed',
  5: 'ötöd',
  6: 'hatod',
  7: 'heted',
  8: 'nyolcad',
  9: 'kilenced',
  10: 'tized',
  12: 'tizenketted',
  100: 'század'
};

/** Birtokos alak: „a pizza 1 harmada”, „a méter 3 negyede”. */
export const DENOM_OF: Record<number, string> = {
  2: 'kettede',
  3: 'harmada',
  4: 'negyede',
  5: 'ötöde',
  6: 'hatoda',
  7: 'hetede',
  8: 'nyolcada',
  9: 'kilencede',
  10: 'tizede',
  12: 'tizenkettede',
  100: 'százada'
};

/** „3 negyed” */
export const fracWord = (n: number, d: number): string => `${n} ${DENOM_NAMES[d] ?? `${d}-ed`}`;
/** „3 negyede” */
export const fracOfWord = (n: number, d: number): string => `${n} ${DENOM_OF[d] ?? `${d}-ede`}`;

// ---------------------------------------------------------------------------
// Újrahasznosítható SVG-elemek
// ---------------------------------------------------------------------------
const toSet = (filled: number | number[] | undefined): Set<number> => {
  if (filled === undefined) return new Set();
  if (Array.isArray(filled)) return new Set(filled);
  return new Set(Array.from({ length: filled }, (_, i) => i));
};

/** Egy körcikk útvonala (i. rész az n-ből, felülről indulva, az óramutató járásával). */
export const sectorPath = (cx: number, cy: number, r: number, i: number, n: number): string => {
  const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  const a1 = -Math.PI / 2 + ((i + 1) * 2 * Math.PI) / n;
  const x0 = cx + r * Math.cos(a0);
  const y0 = cy + r * Math.sin(a0);
  const x1 = cx + r * Math.cos(a1);
  const y1 = cy + r * Math.sin(a1);
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
};

export interface PizzaProps {
  cx: number;
  cy: number;
  r: number;
  parts: number;
  /** a kiszínezett szeletek száma (az elsőtől) vagy indexei */
  filled?: number | number[];
  color?: string;
  emptyColor?: string;
  /** pizzás díszítés (szalámi pöttyök a színes szeleteken) */
  pizza?: boolean;
  onSlice?: (i: number) => void;
}

/** Kör (pizza, torta) n egyenlő szeletre vágva. */
export const PizzaG: React.FC<PizzaProps> = ({ cx, cy, r, parts, filled, color = '#f97316', emptyColor = '#fff7ed', pizza = false, onSlice }) => {
  const set = toSet(filled);
  if (parts <= 1) {
    return (
      <g>
        <circle cx={cx} cy={cy} r={r} fill={set.has(0) ? color : emptyColor} stroke="#9a3412" strokeWidth="2" onClick={onSlice ? () => onSlice(0) : undefined} style={onSlice ? { cursor: 'pointer' } : undefined} />
      </g>
    );
  }
  return (
    <g>
      {Array.from({ length: parts }, (_, i) => (
        <path
          key={i}
          d={sectorPath(cx, cy, r, i, parts)}
          fill={set.has(i) ? color : emptyColor}
          stroke="#9a3412"
          strokeWidth="1.6"
          strokeLinejoin="round"
          onClick={onSlice ? () => onSlice(i) : undefined}
          style={onSlice ? { cursor: 'pointer' } : undefined}
        />
      ))}
      {pizza &&
        Array.from({ length: parts }, (_, i) => {
          if (!set.has(i)) return null;
          const a = -Math.PI / 2 + ((i + 0.5) * 2 * Math.PI) / parts;
          return <circle key={`p${i}`} cx={cx + r * 0.62 * Math.cos(a)} cy={cy + r * 0.62 * Math.sin(a)} r={Math.max(2, r * 0.09)} fill="#b91c1c" pointerEvents="none" />;
        })}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#9a3412" strokeWidth="2.2" pointerEvents="none" />
    </g>
  );
};

export interface BarProps {
  x: number;
  y: number;
  w: number;
  h: number;
  parts: number;
  filled?: number | number[];
  color?: string;
  emptyColor?: string;
  /** 'v' = függőleges csíkok egymás mellett, 'h' = vízszintes csíkok egymás alatt */
  dir?: 'v' | 'h';
  stroke?: string;
}

/** Téglalap (zászló, szalag, csokoládé) egyenlő csíkokra osztva. */
export const BarG: React.FC<BarProps> = ({ x, y, w, h, parts, filled, color = '#22c55e', emptyColor = '#ffffff', dir = 'v', stroke = '#334155' }) => {
  const set = toSet(filled);
  return (
    <g>
      {Array.from({ length: parts }, (_, i) =>
        dir === 'v' ? (
          <rect key={i} x={x + (i * w) / parts} y={y} width={w / parts} height={h} fill={set.has(i) ? color : emptyColor} stroke={stroke} strokeWidth="1.4" />
        ) : (
          <rect key={i} x={x} y={y + (i * h) / parts} width={w} height={h / parts} fill={set.has(i) ? color : emptyColor} stroke={stroke} strokeWidth="1.4" />
        )
      )}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={stroke} strokeWidth="2" />
    </g>
  );
};

/** Csokoládétábla rows × cols kockával; az első `filled` kocka színes (soronként). */
export const ChocoG: React.FC<{ x: number; y: number; rows: number; cols: number; cell?: number; filled?: number | number[]; color?: string; emptyColor?: string }> = ({
  x,
  y,
  rows,
  cols,
  cell = 22,
  filled,
  color = '#7c2d12',
  emptyColor = '#fde7d2'
}) => {
  const set = toSet(filled);
  return (
    <g>
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        return <rect key={i} x={x + c * cell} y={y + r * cell} width={cell - 2} height={cell - 2} rx="3" fill={set.has(i) ? color : emptyColor} stroke="#78350f" strokeWidth="1.2" />;
      })}
    </g>
  );
};

/** A tankönyvi színes rudak (a zöld rúd = 12 egység). */
export const ROD_COLORS: Record<string, { fill: string; side: string; len: number }> = {
  fehér: { fill: '#ffffff', side: '#cbd5e1', len: 1 },
  rózsaszín: { fill: '#f9a8d4', side: '#db2777', len: 2 },
  világoskék: { fill: '#7dd3fc', side: '#0284c7', len: 3 },
  piros: { fill: '#ef4444', side: '#991b1b', len: 4 },
  sárga: { fill: '#facc15', side: '#a16207', len: 5 },
  lila: { fill: '#c4b5fd', side: '#6d28d9', len: 6 },
  bordó: { fill: '#9f1239', side: '#4c0519', len: 8 },
  zöld: { fill: '#22c55e', side: '#15803d', len: 12 }
};

/** Egy színes rúd kis térhatással. */
export const RodG: React.FC<{ x: number; y: number; len: number; unit?: number; h?: number; fill: string; side: string; label?: string }> = ({ x, y, len, unit = 16, h = 18, fill, side, label }) => {
  const w = len * unit;
  const d = 5;
  return (
    <g>
      <polygon points={`${x},${y} ${x + d},${y - d} ${x + w + d},${y - d} ${x + w},${y}`} fill={fill} stroke={side} strokeWidth="1" opacity="0.85" />
      <polygon points={`${x + w},${y} ${x + w + d},${y - d} ${x + w + d},${y + h - d} ${x + w},${y + h}`} fill={side} />
      <rect x={x} y={y} width={w} height={h} fill={fill} stroke={side} strokeWidth="1.3" />
      {label && (
        <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0f172a" fontFamily={FONT}>
          {label}
        </text>
      )}
    </g>
  );
};

/** Egy bonbon (kerek, csomagolópapírban). */
export const BonbonG: React.FC<{ x: number; y: number; r?: number; color?: string }> = ({ x, y, r = 8, color = '#92400e' }) => (
  <g>
    <circle cx={x} cy={y} r={r + 2.5} fill="#fde68a" stroke="#d97706" strokeWidth="1" />
    <circle cx={x} cy={y} r={r} fill={color} />
    <circle cx={x - r * 0.35} cy={y - r * 0.35} r={r * 0.25} fill="#ffffff" opacity="0.5" />
  </g>
);

const Frame: React.FC<{ w: number; h: number; className?: string; children: React.ReactNode; label: string }> = ({ w, h, className, children, label }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className={className ?? 'w-full max-w-lg h-auto mx-auto'} role="img" aria-label={label} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="14" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
    {children}
  </svg>
);

// ---------------------------------------------------------------------------
// Ábrák
// ---------------------------------------------------------------------------

/** TK 147: a lengyel zászló 1 ketted része piros, a francia zászló 3 harmadból áll. */
export const FlagsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={420} h={190} className={className} label="Lengyel és francia zászló">
    <text x="105" y="28" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">Lengyelország</text>
    <BarG x={35} y={42} w={140} h={90} parts={2} dir="h" filled={[1]} color="#dc2626" />
    <text x="105" y="158" textAnchor="middle" fontSize="13" fill="#334155">2 egyenlő rész:</text>
    <text x="105" y="177" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">1 ketted piros, 1 ketted fehér</text>
    <text x="315" y="28" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">Franciaország</text>
    <rect x="245" y="42" width="46.7" height="90" fill="#1d4ed8" />
    <rect x="291.7" y="42" width="46.7" height="90" fill="#ffffff" />
    <rect x="338.3" y="42" width="46.7" height="90" fill="#dc2626" />
    <rect x="245" y="42" width="140" height="90" fill="none" stroke="#334155" strokeWidth="2" />
    <line x1="291.7" y1="42" x2="291.7" y2="132" stroke="#334155" strokeWidth="1" />
    <line x1="338.3" y1="42" x2="338.3" y2="132" stroke="#334155" strokeWidth="1" />
    <text x="315" y="158" textAnchor="middle" fontSize="13" fill="#334155">3 egyenlő rész: 3 harmad</text>
    <text x="315" y="177" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">3 harmad = 1 egész</text>
  </Frame>
);

/** MF II/66, 1. feladat: felek, harmad, negyed, ötöd, hatod és nyolcad részek. */
export const FractionNamesSvg: React.FC<{ className?: string }> = ({ className }) => {
  const items: [number, string][] = [
    [2, 'fél (1 ketted)'],
    [3, '1 harmad'],
    [4, '1 negyed'],
    [5, '1 ötöd'],
    [6, '1 hatod'],
    [8, '1 nyolcad']
  ];
  return (
    <Frame w={480} h={290} className={className} label="Pizzák egyenlő szeletekre vágva">
      {items.map(([n, name], i) => {
        const cx = 80 + (i % 3) * 160;
        const cy = 58 + Math.floor(i / 3) * 140;
        return (
          <g key={n}>
            <PizzaG cx={cx} cy={cy} r={42} parts={n} filled={1} color="#f97316" emptyColor="#fde68a" pizza />
            <text x={cx} y={cy + 60} textAnchor="middle" fontSize="12" fill="#475569">
              {n} egyenlő rész
            </text>
            <text x={cx} y={cy + 77} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
              {name}
            </text>
          </g>
        );
      })}
    </Frame>
  );
};

/** Egyenlő részek – nem egyenlő részek. */
export const EqualPartsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={440} h={200} className={className} label="Egyenlő és nem egyenlő részek">
    <text x="110" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#15803d">✓ Egyenlő részek</text>
    <PizzaG cx={110} cy={100} r={52} parts={4} filled={1} color="#f97316" emptyColor="#fde68a" pizza />
    <text x="110" y="182" textAnchor="middle" fontSize="13" fill="#15803d">Ez 1 negyed.</text>
    <text x="330" y="30" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#be123c">✗ Nem egyenlő részek</text>
    <circle cx="330" cy="100" r="52" fill="#fde68a" stroke="#9a3412" strokeWidth="2.2" />
    <path d="M 330 100 L 330 48 A 52 52 0 0 1 380.2 113.5 Z" fill="#f97316" stroke="#9a3412" strokeWidth="1.6" />
    <line x1="330" y1="100" x2="292" y2="135.5" stroke="#9a3412" strokeWidth="1.6" />
    <line x1="330" y1="100" x2="285" y2="74" stroke="#9a3412" strokeWidth="1.6" />
    <text x="330" y="182" textAnchor="middle" fontSize="13" fill="#be123c">Ezek nem negyedek!</text>
  </Frame>
);

/** TK 148, 1. feladat: a négyzet alakú szalvéta hajtogatása. */
export const NapkinFoldSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={480} h={220} className={className} label="Szalvéta hajtogatása">
    <text x="20" y="26" fontSize="13" fontWeight="bold" fill="#334155">A) egyszer hajtjuk</text>
    <rect x="20" y="40" width="90" height="90" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
    <line x1="20" y1="130" x2="110" y2="40" stroke="#ffffff" strokeWidth="2" strokeDasharray="5 4" />
    <text x="128" y="92" fontSize="20" fill="#334155">→</text>
    <polygon points="155,130 245,130 245,40" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
    <text x="130" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#b91c1c">a szalvéta fele</text>
    <text x="130" y="178" textAnchor="middle" fontSize="12" fill="#475569">2 egyenlő rész közül 1</text>

    <text x="270" y="26" fontSize="13" fontWeight="bold" fill="#334155">B) kétszer hajtjuk</text>
    <rect x="270" y="40" width="70" height="70" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
    <line x1="270" y1="110" x2="340" y2="40" stroke="#ffffff" strokeWidth="2" strokeDasharray="5 4" />
    <text x="346" y="80" fontSize="16" fill="#334155">→</text>
    <polygon points="366,110 436,110 436,40" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
    <line x1="401" y1="75" x2="436" y2="110" stroke="#a16207" strokeWidth="1.6" strokeDasharray="4 3" />
    <text x="396" y="140" fontSize="16" fill="#334155">↓</text>
    <polygon points="401,150 436,185 436,150" fill="#facc15" stroke="#a16207" strokeWidth="1.5" transform="translate(-30 0)" />
    <text x="330" y="168" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#a16207">a szalvéta</text>
    <text x="330" y="186" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#a16207">negyede</text>
  </Frame>
);

/** TK 148, 3. feladat: mindegyik téglalap 1 egészet ér. */
export const RectanglePartsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={460} h={190} className={className} label="Téglalapok egyenlő csíkokra osztva">
    {[
      { parts: 3, filled: [1], label: '1 harmad', x: 30 },
      { parts: 2, filled: [0], label: 'fele (1 ketted)', x: 175 },
      { parts: 4, filled: [0], label: '1 negyed', x: 320 }
    ].map((r) => (
      <g key={r.x}>
        <BarG x={r.x} y={24} w={110} h={120} parts={r.parts} filled={r.filled} color="#22c55e" />
        <text x={r.x + 55} y={170} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">
          {r.label}
        </text>
      </g>
    ))}
  </Frame>
);

/** TK 149, 5. feladat: a bordó rúd alatt 4 rózsaszín rúd. */
export const ColourRodsSvg: React.FC<{ className?: string }> = ({ className }) => {
  const u = 26;
  const b = ROD_COLORS.bordó;
  const p = ROD_COLORS.rózsaszín;
  return (
    <Frame w={300} h={150} className={className} label="Bordó rúd és 4 rózsaszín rúd">
      <RodG x={40} y={30} len={8} unit={u} h={30} fill={b.fill} side={b.side} />
      <text x={150} y={50} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#ffffff">bordó rúd = 1 egész</text>
      {[0, 1, 2, 3].map((i) => (
        <RodG key={i} x={40 + i * 2 * u} y={64} len={2} unit={u} h={30} fill={p.fill} side={p.side} />
      ))}
      <text x={150} y={125} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#be185d">1 rózsaszín rúd = a bordó 1 negyede</text>
    </Frame>
  );
};

/** TK 148, 4. feladat: 12 bonbon igazságosan, hárman. */
export const BonbonShareSvg: React.FC<{ className?: string }> = ({ className }) => (
  <Frame w={440} h={190} className={className} label="12 bonbon három tányéron">
    <text x="220" y="26" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">12 bonbon, hárman osztoznak</text>
    {[0, 1, 2].map((t) => {
      const cx = 80 + t * 140;
      return (
        <g key={t}>
          <ellipse cx={cx} cy={100} rx={58} ry={40} fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx={cx} cy={100} rx={44} ry={29} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
          {[0, 1, 2, 3].map((k) => (
            <BonbonG key={k} x={cx - 15 + (k % 2) * 30} y={88 + Math.floor(k / 2) * 24} />
          ))}
          <text x={cx} y={162} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400e">
            4 bonbon
          </text>
        </g>
      );
    })}
    <text x="220" y="182" textAnchor="middle" fontSize="12" fill="#475569">Mindenkinek a bonbonok 1 harmada jut.</text>
  </Frame>
);
