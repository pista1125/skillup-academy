import React from 'react';

// ---------------------------------------------------------------------------
// Logikai lapok (a tankönyv készlete): 4 szín × 3 forma × 2 méret × lyukas / nem lyukas = 48 lap.
// Színek: piros, sárga, kék, zöld. Formák: kör, háromszög, négyzet. Méret: kicsi, nagy.
// A fejezet minden leckéje ezt a rajzot használja.
// ---------------------------------------------------------------------------
export const FONT = 'system-ui, Segoe UI, sans-serif';

export type LbColor = 'piros' | 'sarga' | 'kek' | 'zold';
export type LbShape = 'kor' | 'haromszog' | 'negyzet';
export interface Block {
  color: LbColor;
  shape: LbShape;
  big: boolean;
  holed: boolean;
}

export const COLORS: LbColor[] = ['piros', 'sarga', 'kek', 'zold'];
export const SHAPES: LbShape[] = ['kor', 'haromszog', 'negyzet'];

export const FILL: Record<LbColor, string> = { piros: '#ef4444', sarga: '#facc15', kek: '#2563eb', zold: '#16a34a' };
export const STROKE: Record<LbColor, string> = { piros: '#7f1d1d', sarga: '#854d0e', kek: '#1e3a8a', zold: '#14532d' };
export const COLOR_NAME: Record<LbColor, string> = { piros: 'piros', sarga: 'sárga', kek: 'kék', zold: 'zöld' };
export const SHAPE_NAME: Record<LbShape, string> = { kor: 'kör', haromszog: 'háromszög', negyzet: 'négyzet' };
export const SHAPE_PLURAL: Record<LbShape, string> = { kor: 'körök', haromszog: 'háromszögek', negyzet: 'négyzetek' };

/** „nagy, kék, lyukas háromszög” */
export const blockName = (b: Block) => `${b.big ? 'nagy' : 'kicsi'}, ${COLOR_NAME[b.color]}, ${b.holed ? 'lyukas' : 'nem lyukas'} ${SHAPE_NAME[b.shape]}`;

/** Rövid jelölő a kódban: pl. B('kek', 'haromszog', true, false). */
export const B = (color: LbColor, shape: LbShape, big = true, holed = false): Block => ({ color, shape, big, holed });

export const ALL_BLOCKS: Block[] = (() => {
  const out: Block[] = [];
  for (const color of COLORS) for (const big of [true, false]) for (const shape of SHAPES) for (const holed of [true, false]) out.push({ color, shape, big, holed });
  return out;
})();

export const sameBlock = (a: Block, b: Block) => a.color === b.color && a.shape === b.shape && a.big === b.big && a.holed === b.holed;

/**
 * Egy logikai lap, középpontja (x, y). Nagy lap: kb. 44 egység széles, kicsi lap: kb. 24.
 * k = nagyítás, sw = körvonal vastagsága.
 */
export const LogicBlock: React.FC<{ b: Block; x: number; y: number; k?: number; sw?: number; faded?: boolean }> = ({ b, x, y, k = 1, sw = 2.5, faded = false }) => {
  const H = (b.big ? 20 : 11) * k;
  const fill = FILL[b.color];
  const stroke = STROKE[b.color];
  const hr = (b.big ? 4.6 : 3.2) * k;
  let shape: React.ReactNode;
  let hy = y;
  if (b.shape === 'kor') {
    shape = <circle cx={x} cy={y} r={H * 1.05} fill={fill} stroke={stroke} strokeWidth={sw} />;
  } else if (b.shape === 'negyzet') {
    shape = <rect x={x - H * 0.95} y={y - H * 0.95} width={H * 1.9} height={H * 1.9} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />;
  } else {
    const hb = H * 1.2;
    shape = <path d={`M${x} ${y - H * 1.1} L${x + hb} ${y + H * 0.95} L${x - hb} ${y + H * 0.95} Z`} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />;
    hy = y + H * 0.28;
  }
  return (
    <g opacity={faded ? 0.15 : 1}>
      {shape}
      {b.holed && <circle cx={x} cy={hy} r={hr} fill="#ffffff" stroke={stroke} strokeWidth={Math.max(1.2, sw * 0.6)} />}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Gombok (a 3. szinthez és a kvízhez)
// ---------------------------------------------------------------------------
export type ButtonShape = 'kerek' | 'negyzet' | 'hatszog';
export interface Btn {
  shape: ButtonShape;
  holes: 2 | 4;
  color: string;
  stroke: string;
}
export const BTN_COLORS: Record<string, [string, string]> = {
  piros: ['#f87171', '#991b1b'],
  kek: ['#60a5fa', '#1e3a8a'],
  sarga: ['#fde047', '#854d0e'],
  zold: ['#4ade80', '#14532d'],
  lila: ['#c084fc', '#581c87'],
  barna: ['#d6a36b', '#78350f']
};
export const BT = (shape: ButtonShape, holes: 2 | 4, c: keyof typeof BTN_COLORS): Btn => ({ shape, holes, color: BTN_COLORS[c][0], stroke: BTN_COLORS[c][1] });

export const SewButton: React.FC<{ b: Btn; x: number; y: number; r?: number; sw?: number }> = ({ b, x, y, r = 22, sw = 3 }) => {
  let body: React.ReactNode;
  if (b.shape === 'kerek') body = <circle cx={x} cy={y} r={r} fill={b.color} stroke={b.stroke} strokeWidth={sw} />;
  else if (b.shape === 'negyzet') body = <rect x={x - r * 0.92} y={y - r * 0.92} width={r * 1.84} height={r * 1.84} rx={r * 0.25} fill={b.color} stroke={b.stroke} strokeWidth={sw} />;
  else {
    const pts = Array.from({ length: 6 }, (_, i) => {
      const a = (Math.PI / 3) * i;
      return `${(x + r * Math.cos(a)).toFixed(1)},${(y + r * Math.sin(a)).toFixed(1)}`;
    }).join(' ');
    body = <polygon points={pts} fill={b.color} stroke={b.stroke} strokeWidth={sw} strokeLinejoin="round" />;
  }
  const d = r * 0.3;
  const hr = Math.max(3, r * 0.15);
  const holes = b.holes === 2 ? [[-d, 0], [d, 0]] : [[-d, -d], [d, -d], [-d, d], [d, d]];
  return (
    <g>
      {body}
      {holes.map(([dx, dy], i) => (
        <circle key={i} cx={x + dx} cy={y + dy} r={hr} fill="#1f2937" />
      ))}
    </g>
  );
};

/** Számkártya (pl. „Melyik szám nem illik a sorba?”) */
export const NumCard: React.FC<{ x: number; y: number; n: number | string; w?: number; h?: number; fill?: string; color?: string; fs?: number }> = ({
  x,
  y,
  n,
  w = 46,
  h = 34,
  fill = '#ffffff',
  color = '#0f172a',
  fs = 17
}) => (
  <g>
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="7" fill={fill} stroke="#94a3b8" strokeWidth="2" />
    <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={color} fontFamily={FONT}>
      {n}
    </text>
  </g>
);

/** Feliratos doboz / csoport címkével (címke a tetején). */
export const LabelBox: React.FC<{ x: number; y: number; w: number; h: number; label: string; fill?: string; stroke?: string; fs?: number }> = ({
  x,
  y,
  w,
  h,
  label,
  fill = '#f0fdf4',
  stroke = '#16a34a',
  fs = 12
}) => {
  // Több soros címke: '\n' választja el a sorokat.
  const lines = label.split('\n');
  const longest = Math.max(...lines.map((l) => l.length));
  const lw = Math.min(w - 12, longest * fs * 0.58 + 18);
  const ph = 10 + lines.length * fs * 1.1;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={fill} stroke={stroke} strokeWidth="2.5" />
      <rect x={x + w / 2 - lw / 2} y={y - ph / 2} width={lw} height={ph} rx="11" fill="#ffffff" stroke={stroke} strokeWidth="2" />
      {lines.map((l, i) => (
        <text key={i} x={x + w / 2} y={y + fs * 0.36 + (i - (lines.length - 1) / 2) * fs * 1.1} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a" fontFamily={FONT}>
          {l}
        </text>
      ))}
    </g>
  );
};
