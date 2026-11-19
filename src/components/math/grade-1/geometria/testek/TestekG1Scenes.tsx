// „Testek” – a mese és a játék képei: építőelemek (kocka és társai), tornyok, gurulás, hasonló tárgyak.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';

const DARK: Record<string, string> = {
  '#facc15': '#a16207',
  '#f97316': '#9a3412',
  '#ef4444': '#7f1d1d',
  '#22c55e': '#14532d',
  '#3b82f6': '#1e3a8a',
  '#a855f7': '#581c87',
};
const dark = (c: string) => DARK[c] ?? '#334155';

/** Hasáb (kocka, ha w = h) elölnézetben, kis térhatással: elülső lap (x, y, w, h), d mélység. */
export const boxEl = (x: number, y: number, w: number, h: number, d: number, color: string, key?: React.Key) => {
  const s = dark(color);
  return (
    <g key={key} strokeLinejoin="round">
      <path d={`M${x} ${y} L${x + d} ${y - d} L${x + w + d} ${y - d} L${x + w} ${y} Z`} fill={color} stroke={s} strokeWidth="2.5" />
      <path d={`M${x} ${y} L${x + d} ${y - d} L${x + w + d} ${y - d} L${x + w} ${y} Z`} fill="#fff" opacity="0.35" />
      <path d={`M${x + w} ${y} L${x + w + d} ${y - d} L${x + w + d} ${y + h - d} L${x + w} ${y + h} Z`} fill={color} stroke={s} strokeWidth="2.5" />
      <path d={`M${x + w} ${y} L${x + w + d} ${y - d} L${x + w + d} ${y + h - d} L${x + w} ${y + h} Z`} fill="#000" opacity="0.18" />
      <rect x={x} y={y} width={w} height={h} fill={color} stroke={s} strokeWidth="2.5" />
    </g>
  );
};
/** Háromoldalú hasáb (tetőelem): elülső háromszög (x, y, w, h). */
export const roofEl = (x: number, y: number, w: number, h: number, d: number, color: string, key?: React.Key) => {
  const s = dark(color);
  return (
    <g key={key} strokeLinejoin="round">
      <path d={`M${x + w / 2} ${y} L${x + w / 2 + d} ${y - d} L${x + w + d} ${y + h - d} L${x + w} ${y + h} Z`} fill={color} stroke={s} strokeWidth="2.5" />
      <path d={`M${x + w / 2} ${y} L${x + w / 2 + d} ${y - d} L${x + w + d} ${y + h - d} L${x + w} ${y + h} Z`} fill="#000" opacity="0.18" />
      <path d={`M${x} ${y + h} L${x + w / 2} ${y} L${x + w} ${y + h} Z`} fill={color} stroke={s} strokeWidth="2.5" />
    </g>
  );
};
/** Álló henger: felső ellipszis középpontja (cx, y), sugár rx, magasság h. */
export const cylEl = (cx: number, y: number, rx: number, h: number, color: string, key?: React.Key) => {
  const s = dark(color);
  const ry = rx * 0.35;
  return (
    <g key={key}>
      <path d={`M${cx - rx} ${y} V${y + h} A${rx} ${ry} 0 0 0 ${cx + rx} ${y + h} V${y}`} fill={color} stroke={s} strokeWidth="2.5" />
      <rect x={cx + rx * 0.35} y={y} width={rx * 0.4} height={h} fill="#000" opacity="0.12" />
      <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill={color} stroke={s} strokeWidth="2.5" />
      <ellipse cx={cx} cy={y} rx={rx} ry={ry} fill="#fff" opacity="0.35" />
    </g>
  );
};
/** Fekvő henger (gurul): bal ellipszis középpontja (x, cy), hossz w, sugár ry. */
export const cylLyingEl = (x: number, cy: number, w: number, r: number, color: string, key?: React.Key) => {
  const s = dark(color);
  const rx = r * 0.35;
  return (
    <g key={key}>
      <path d={`M${x} ${cy - r} H${x + w} A${rx} ${r} 0 0 1 ${x + w} ${cy + r} H${x}`} fill={color} stroke={s} strokeWidth="2.5" />
      <ellipse cx={x} cy={cy} rx={rx} ry={r} fill={color} stroke={s} strokeWidth="2.5" />
      <ellipse cx={x} cy={cy} rx={rx} ry={r} fill="#fff" opacity="0.3" />
    </g>
  );
};
export const ballEl = (cx: number, cy: number, r: number, color: string, key?: React.Key) => (
  <g key={key}>
    <circle cx={cx} cy={cy} r={r} fill={color} stroke={dark(color)} strokeWidth="2.5" />
    <ellipse cx={cx - r * 0.35} cy={cy - r * 0.4} rx={r * 0.3} ry={r * 0.18} fill="#fff" opacity="0.55" transform={`rotate(-30 ${cx - r * 0.35} ${cy - r * 0.4})`} />
    <path d={`M${cx - r} ${cy} A${r} ${r * 0.3} 0 0 0 ${cx + r} ${cy}`} fill="none" stroke={dark(color)} strokeWidth="1.5" opacity="0.5" />
  </g>
);
export const coneEl = (cx: number, base: number, rx: number, h: number, color: string, key?: React.Key) => {
  const s = dark(color);
  const ry = rx * 0.35;
  return (
    <g key={key} strokeLinejoin="round">
      <path d={`M${cx} ${base - h} L${cx + rx} ${base} A${rx} ${ry} 0 0 1 ${cx - rx} ${base} Z`} fill={color} stroke={s} strokeWidth="2.5" />
      <path d={`M${cx} ${base - h} L${cx + rx} ${base} A${rx} ${ry} 0 0 1 ${cx + rx * 0.2} ${base + ry} Z`} fill="#000" opacity="0.15" />
    </g>
  );
};
export const pyramidEl = (cx: number, base: number, w: number, h: number, color: string, key?: React.Key) => {
  const s = dark(color);
  return (
    <g key={key} strokeLinejoin="round">
      <path d={`M${cx} ${base - h} L${cx - w / 2} ${base} L${cx + w * 0.15} ${base + w * 0.12} Z`} fill={color} stroke={s} strokeWidth="2.5" />
      <path d={`M${cx} ${base - h} L${cx + w * 0.15} ${base + w * 0.12} L${cx + w / 2} ${base - w * 0.05} Z`} fill={color} stroke={s} strokeWidth="2.5" />
      <path d={`M${cx} ${base - h} L${cx + w * 0.15} ${base + w * 0.12} L${cx + w / 2} ${base - w * 0.05} Z`} fill="#000" opacity="0.18" />
    </g>
  );
};

export type SolidK = 'kocka' | 'teglatest' | 'gomb' | 'henger' | 'fekvohenger' | 'kup' | 'gula' | 'teto';
/** A könyv csak a kockát nevezi meg; a többit a hasonló tárggyal írjuk le. */
export const SOLID_SAY: Record<SolidK, string> = {
  kocka: 'kocka',
  teglatest: 'doboz alakú test',
  gomb: 'labda alakú test',
  henger: 'konzervdoboz alakú test',
  fekvohenger: 'fekvő konzervdoboz alakú test',
  kup: 'csúcsos sapka alakú test',
  gula: 'sátor alakú test',
  teto: 'tető alakú test',
};
export const ROLLS: Record<SolidK, boolean> = { kocka: false, teglatest: false, gomb: true, henger: true, fekvohenger: true, kup: false, gula: false, teto: false };

export const solidInBox = (k: SolidK, color: string) => {
  switch (k) {
    case 'kocka':
      return boxEl(16, 30, 36, 36, 12, color);
    case 'teglatest':
      return boxEl(8, 40, 50, 26, 12, color);
    case 'gomb':
      return ballEl(40, 42, 26, color);
    case 'henger':
      return cylEl(40, 20, 20, 44, color);
    case 'fekvohenger':
      return cylLyingEl(18, 44, 44, 18, color);
    case 'kup':
      return coneEl(40, 64, 22, 52, color);
    case 'gula':
      return pyramidEl(40, 60, 52, 50, color);
    case 'teto':
      return roofEl(10, 30, 46, 34, 14, color);
  }
};

/** Egy test kártyán. */
export const SolidFig: React.FC<{ k: SolidK; color?: string; className?: string; frame?: boolean }> = ({ k, color = '#facc15', className = 'w-24 h-24', frame = true }) => (
  <svg viewBox="0 0 80 80" className={className}>
    {frame && <rect x="2" y="2" width="76" height="76" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />}
    {solidInBox(k, color)}
  </svg>
);
export const solid = (k: SolidK, color?: string, say?: string) => ({ figure: <SolidFig k={k} color={color} />, say: say ?? SOLID_SAY[k] });

/** Lapos síkidom „papírból” (a test és a síkidom összevetéséhez). */
export const FlatFig: React.FC<{ k: 'negyzet' | 'kor' | 'haromszog' | 'teglalap'; color?: string; className?: string }> = ({ k, color = '#facc15', className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <rect x="2" y="2" width="76" height="76" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    {k === 'negyzet' && <rect x="18" y="18" width="44" height="44" fill={color} stroke={dark(color)} strokeWidth="3" />}
    {k === 'kor' && <circle cx="40" cy="40" r="24" fill={color} stroke={dark(color)} strokeWidth="3" />}
    {k === 'haromszog' && <path d="M40 14 L66 62 L14 62 Z" fill={color} stroke={dark(color)} strokeWidth="3" strokeLinejoin="round" />}
    {k === 'teglalap' && <rect x="10" y="26" width="60" height="30" fill={color} stroke={dark(color)} strokeWidth="3" />}
  </svg>
);
const FLAT_SAY = { negyzet: 'lapos négyzet', kor: 'lapos kör', haromszog: 'lapos háromszög', teglalap: 'lapos téglalap' } as const;
export const flat = (k: keyof typeof FLAT_SAY, color?: string) => ({ figure: <FlatFig k={k} color={color} />, say: FLAT_SAY[k] });

const CUBE_COLORS = ['#facc15', '#f97316', '#22c55e', '#3b82f6', '#ef4444', '#a855f7'];
/** Torony n kockából; (x, base) a torony bal alsó sarka, a a kocka élhossza. */
export const towerEl = (n: number, x: number, base: number, a: number, key?: React.Key, color?: string) => (
  <g key={key}>
    {Array.from({ length: n }, (_, i) => boxEl(x, base - (i + 1) * a, a, a, a * 0.3, color ?? CUBE_COLORS[i % CUBE_COLORS.length], i))}
  </g>
);
export const TowerFig: React.FC<{ n: number; className?: string; color?: string }> = ({ n, className = 'w-16 h-24', color }) => {
  const a = 16;
  const h = Math.max(5, n) * a + 16;
  return (
    <svg viewBox={`0 0 40 ${h}`} className={className}>
      {towerEl(n, 6, h - 4, a, undefined, color)}
    </svg>
  );
};
export const tower = (n: number, color?: string) => ({ figure: <TowerFig n={n} color={color} />, say: `${n} kockás torony` });

/** Tornyok egy sorban, alattuk opcionálisan a számkártyák (alaprajz, TK 10/2). */
export const TowersScene: React.FC<{ heights: number[]; numbers?: boolean; hideTowers?: boolean; className?: string }> = ({ heights, numbers = false, hideTowers = false, className }) => {
  const a = 26;
  const w = heights.length * 80 + 40;
  const top = Math.max(...heights) * a + 30;
  const h = top + (numbers ? 56 : 14);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      <rect x="0" y="0" width={w} height={h} rx="16" fill="#f8fafc" />
      <path d={`M10 ${top} H${w - 10}`} stroke="#94a3b8" strokeWidth="3" />
      {heights.map((n, i) => (
        <g key={i}>
          {!hideTowers && towerEl(n, 30 + i * 80, top, a, undefined)}
          {numbers && (
            <g>
              <rect x={28 + i * 80} y={top + 10} width="34" height="36" rx="6" fill="#fff" stroke="#475569" strokeWidth="2.5" />
              <text x={45 + i * 80} y={top + 38} textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
                {n}
              </text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
};

/** Kapu építőelemekből: két álló téglácska, rajta egy fekvő, legfelül a tető → 4 elem. */
export const GateScene: React.FC<{ className?: string }> = ({ className = 'w-64 h-auto mx-auto' }) => (
  <svg viewBox="0 0 240 220" className={className}>
    <rect x="0" y="0" width="240" height="220" rx="16" fill="#fef3c7" />
    <path d="M10 200 H230" stroke="#a16207" strokeWidth="4" />
    {boxEl(60, 120, 26, 80, 12, '#f97316')}
    {boxEl(140, 120, 26, 80, 12, '#f97316')}
    {boxEl(52, 94, 122, 26, 12, '#22c55e')}
    {roofEl(52, 40, 122, 54, 12, '#ef4444')}
  </svg>
);

/** Két oszlopos építmény kockákból (cols × rows). */
export const BlockWallScene: React.FC<{ cols: number; rows: number; className?: string }> = ({ cols, rows, className = 'w-48 h-auto mx-auto' }) => {
  const a = 34;
  const w = cols * a + 60;
  const h = rows * a + 40;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      <rect x="0" y="0" width={w} height={h} rx="14" fill="#f8fafc" />
      {Array.from({ length: cols }, (_, c) => towerEl(rows, 20 + c * a, h - 10, a, c, '#facc15'))}
    </svg>
  );
};

/** Szétszórt kockák (számláláshoz). */
export const LooseCubesScene: React.FC<{ n: number }> = ({ n }) => {
  const pos: [number, number][] = [[40, 130], [120, 150], [200, 120], [280, 150], [360, 130], [80, 70], [240, 70], [400, 80], [160, 60], [320, 60]];
  return (
    <svg viewBox="0 0 480 200">
      <rect x="0" y="0" width="480" height="200" rx="18" fill="#ecfccb" />
      {pos.slice(0, n).map(([x, y], i) => boxEl(x, y, 40, 40, 12, CUBE_COLORS[i % CUBE_COLORS.length], i))}
    </svg>
  );
};

/** Testek egy sorban (pl. „hány gurul?”). */
export const SolidRowScene: React.FC<{ items: { k: SolidK; color?: string }[]; className?: string }> = ({ items, className }) => {
  const w = items.length * 84 + 16;
  return (
    <svg viewBox={`0 0 ${w} 96`} className={className}>
      <rect x="2" y="2" width={w - 4} height="92" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {items.map((it, i) => (
        <g key={i} transform={`translate(${10 + i * 84} 8)`}>
          {solidInBox(it.k, it.color ?? CUBE_COLORS[i % CUBE_COLORS.length])}
        </g>
      ))}
    </svg>
  );
};

/** 1. oldal: Pötyi az építőelemek között. */
export const BlocksHelloScene: React.FC = () => (
  <svg viewBox="0 0 480 250">
    <rect x="0" y="0" width="480" height="250" rx="18" fill="#e0f2fe" />
    <path d="M0 180 Q160 150 240 175 T480 170 V250 H0 Z" fill="#86efac" />
    <Potyi mood="cheer" dots={7} x={10} y={40} size={160} />
    {towerEl(3, 210, 220, 34)}
    {ballEl(320, 200, 24, '#ef4444')}
    {cylEl(380, 160, 18, 50, '#22c55e')}
    {coneEl(440, 214, 22, 56, '#a855f7')}
    {ICONS.meh({ x: 360, y: 60, s: 1.4 })}
  </svg>
);

/** Lapos négyzet (papír) és kocka egymás mellett. */
export const FlatVsSolidScene: React.FC = () => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fef9c3" />
    <path d="M40 150 L120 120 L220 140 L140 175 Z" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="3" strokeLinejoin="round" />
    {boxEl(300, 70, 90, 90, 30, '#3b82f6')}
    <Potyi dots={7} x={190} y={10} size={80} mood="think" />
  </svg>
);

/** Lejtő: a labda és a fekvő henger legurul, a kocka megáll. */
export const RampScene: React.FC = () => (
  <svg viewBox="0 0 480 230">
    <rect x="0" y="0" width="480" height="230" rx="18" fill="#e0f2fe" />
    <path d="M20 70 L380 200 L20 200 Z" fill="#d6d3d1" stroke="#78716c" strokeWidth="4" strokeLinejoin="round" />
    <path d="M380 200 H470" stroke="#78716c" strokeWidth="4" />
    {ballEl(430, 178, 20, '#ef4444')}
    <path d="M360 160 Q390 150 405 170" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="5 5" />
    {cylLyingEl(250, 136, 40, 18, '#22c55e')}
    <path d="M232 112 Q246 100 262 110" fill="none" stroke="#64748b" strokeWidth="3" />
    <g transform="rotate(20 90 100)">{boxEl(66, 58, 40, 40, 12, '#facc15')}</g>
  </svg>
);

/** Csigusz a zsákba nyúl (tapintós találós). */
export const FeelySackScene: React.FC = () => (
  <svg viewBox="0 0 480 220">
    <rect x="0" y="0" width="480" height="220" rx="18" fill="#fae8ff" />
    <path d="M150 210 Q130 90 230 64 L270 64 Q370 90 350 210 Z" fill="#fde68a" stroke="#a16207" strokeWidth="5" />
    <path d="M230 64 Q250 36 270 64" fill="none" stroke="#a16207" strokeWidth="5" />
    <text x="250" y="160" textAnchor="middle" fontSize="64" fontWeight="900" fill="#7c3aed" fontFamily="system-ui, sans-serif">
      ?
    </text>
    {ICONS.csiga({ x: 400, y: 170, s: 2 })}
  </svg>
);

/** Hétköznapi tárgyak, amelyek egy-egy testre hasonlítanak. */
export type ObjK = 'labda' | 'dobokocka' | 'ajandek' | 'pohar' | 'sapka' | 'sator';
export const OBJ_SAY: Record<ObjK, string> = { labda: 'labda', dobokocka: 'dobókocka', ajandek: 'ajándékdoboz', pohar: 'pohár', sapka: 'csákó', sator: 'sátor' };
export const ObjFig: React.FC<{ k: ObjK; className?: string }> = ({ k, className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 80 80" className={className}>
    <rect x="2" y="2" width="76" height="76" rx="14" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
    {k === 'labda' && (
      <>
        <circle cx="40" cy="42" r="26" fill="#fff" stroke="#1e293b" strokeWidth="3" />
        <path d="M40 16 V68 M14 42 H66" stroke="#ef4444" strokeWidth="5" />
      </>
    )}
    {k === 'dobokocka' && (
      <>
        {boxEl(16, 30, 36, 36, 12, '#f8fafc')}
        <circle cx="25" cy="39" r="3.5" fill="#111827" />
        <circle cx="34" cy="48" r="3.5" fill="#111827" />
        <circle cx="43" cy="57" r="3.5" fill="#111827" />
      </>
    )}
    {k === 'ajandek' && (
      <>
        {boxEl(8, 40, 50, 26, 12, '#a855f7')}
        <path d="M33 40 V66 M14 34 L64 34" stroke="#facc15" strokeWidth="4" />
        <path d="M33 40 Q24 26 30 26 Q36 28 33 40 Q42 26 46 30 Q44 36 33 40" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
      </>
    )}
    {k === 'pohar' && (
      <>
        {cylEl(40, 20, 18, 44, '#bae6fd')}
        <ellipse cx="40" cy="20" rx="14" ry="4" fill="#38bdf8" />
      </>
    )}
    {k === 'sapka' && (
      <>
        {coneEl(40, 64, 22, 52, '#ef4444')}
        <circle cx="34" cy="40" r="3" fill="#fff" />
        <circle cx="44" cy="52" r="3" fill="#fff" />
        <circle cx="40" cy="12" r="4" fill="#facc15" />
      </>
    )}
    {k === 'sator' && (
      <>
        {pyramidEl(40, 60, 56, 46, '#22c55e')}
        <path d="M36 62 L40 44 L44 62" fill="#14532d" />
      </>
    )}
  </svg>
);
export const obj = (k: ObjK) => ({ figure: <ObjFig k={k} />, say: OBJ_SAY[k] });
