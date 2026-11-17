import React from 'react';
import { FONT, LogicBlock, Block, FILL, COLOR_NAME, SHAPE_NAME, B } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';
import { Venn, VennMode, VNum, place, Region } from '../venn-diagramok-es-halmazok/VennG3Parts';
import { Ball, DigitCard, Kid, Tower, Shirt, Pants, Scoop, T, PalName, UNK } from '../sorba-rendezes-lehetosegek/ArrangementsG3Parts';

// ---------------------------------------------------------------------------
// 4. Gyakorlás, tudáspróba – közös rajzelemek.
// A fejezet három leckéjének rajzait használja (logikai lap, halmazábra, sorrendek),
// hogy a tudáspróba pontosan úgy nézzen ki, mint a leckék.
// ---------------------------------------------------------------------------
export { FONT, LogicBlock, FILL, COLOR_NAME, SHAPE_NAME, B, Venn, VNum, place, Ball, DigitCard, Kid, Tower, Shirt, Pants, Scoop, T, UNK };
export type { Block, VennMode, Region, PalName };
export { ALL_BLOCKS, COLORS, SHAPES, SHAPE_PLURAL, blockName, sameBlock } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';
export { permutations } from '../sorba-rendezes-lehetosegek/ArrangementsG3Parts';

/** Kérdésábra-keret (240 széles). */
export const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

export interface VItem {
  r: Region;
  n?: number | string;
  blk?: Block;
  hl?: boolean;
}

/** Halmazábra elemekkel (a 2. lecke rajzával); fölötte opcionális sáv. */
export const QVenn: React.FC<{
  id: string;
  mode?: VennMode;
  frame?: string;
  a?: string;
  b?: string;
  items?: VItem[];
  top?: React.ReactNode;
  topH?: number;
}> = ({ id, mode = 'overlap', frame, a, b, items = [], top, topH = 44 }) => {
  const h = top ? 180 + topH : 180;
  return (
    <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {top && <g>{top}</g>}
      <g transform={top ? `translate(0 ${topH})` : undefined}>
        <Venn id={id} mode={mode} frame={frame} a={a} b={b}>
          {place(mode, items.map((v) => ({ r: v.r, v }))).map((p, i) =>
            p.v.blk ? <LogicBlock key={i} b={p.v.blk} x={p.x} y={p.y} k={0.6} sw={2} /> : <VNum key={i} x={p.x} y={p.y} n={p.v.n ?? '?'} hl={p.v.hl} fs={12} />
          )}
        </Venn>
      </g>
    </svg>
  );
};

export const vits = (list: [Region, number | Block][]): VItem[] => list.map(([r, v]) => (typeof v === 'number' ? { r, n: v } : { r, blk: v }));

/** „Hová kerül?” sáv egy számmal vagy egy lappal. */
export const AskTop: React.FC<{ n?: number; b?: Block }> = ({ n, b }) => (
  <g>
    <text x="104" y="28" textAnchor="end" fontSize="15" fontWeight="bold" fill="#0f172a" fontFamily={FONT}>
      Hová kerül?
    </text>
    {b ? <LogicBlock b={b} x={140} y={23} k={0.85} sw={2.5} /> : <VNum x={146} y={23} n={n ?? '?'} fs={18} hl />}
  </g>
);

/** A Venn-kérdések válaszai a lecke szavaival (az első a helyes). */
export const regionOpts = (a: string, b: string, right: Region): string[] => {
  const t: Record<Region, string> = {
    ab: 'a közös részbe',
    a: `csak a „${a}” karikába`,
    b: `csak a „${b}” karikába`,
    out: 'egyik karikába sem'
  };
  return [right, ...(['ab', 'a', 'b', 'out'] as Region[]).filter((r) => r !== right)].map((r) => t[r]);
};

// ---------------------------------------------------------------------------
// Jelkártya: a lap leírása jelekkel (TK 70/11, MF 79/9 mintájára)
// szín = színes paca, méret = kicsi / nagy pálcikaember, lyukas = szürke lap ponttal, nem lyukas = szürke lap, forma = körvonal
// ---------------------------------------------------------------------------
export const Splash: React.FC<{ x: number; y: number; c: string; r?: number }> = ({ x, y, c, r = 11 }) => (
  <path
    d={`M${x - r} ${y} Q${x - r} ${y - r * 0.9} ${x - r * 0.2} ${y - r * 0.8} Q${x + r * 0.5} ${y - r * 1.1} ${x + r} ${y - r * 0.3} Q${x + r * 1.2} ${y + r * 0.6} ${x + r * 0.3} ${y + r * 0.8} Q${x - r * 0.6} ${y + r * 1.1} ${x - r} ${y} Z`}
    fill={c}
    stroke="#334155"
    strokeWidth="1.5"
  />
);
export const StickMan: React.FC<{ x: number; y: number; big: boolean }> = ({ x, y, big }) => {
  const h = big ? 30 : 16;
  const top = y + 15 - h;
  return (
    <g stroke="#0f172a" strokeWidth="2.2" fill="none" strokeLinecap="round">
      <circle cx={x} cy={top + h * 0.13} r={h * 0.13} />
      <line x1={x} y1={top + h * 0.26} x2={x} y2={top + h * 0.65} />
      <line x1={x - h * 0.22} y1={top + h * 0.4} x2={x + h * 0.22} y2={top + h * 0.4} />
      <line x1={x} y1={top + h * 0.65} x2={x - h * 0.18} y2={top + h} />
      <line x1={x} y1={top + h * 0.65} x2={x + h * 0.18} y2={top + h} />
    </g>
  );
};
export const HoleSign: React.FC<{ x: number; y: number; holed: boolean }> = ({ x, y, holed }) => (
  <g>
    <rect x={x - 13} y={y - 8} width="26" height="16" rx="2" fill="#9ca3af" />
    {holed && <circle cx={x} cy={y} r={3.2} fill="#ffffff" />}
  </g>
);
export const ShapeSign: React.FC<{ x: number; y: number; s: Block['shape'] }> = ({ x, y, s }) => {
  const p = { fill: '#ffffff', stroke: '#0f172a', strokeWidth: 2.2 };
  if (s === 'kor') return <circle cx={x} cy={y} r={12} {...p} />;
  if (s === 'negyzet') return <rect x={x - 11} y={y - 11} width="22" height="22" {...p} />;
  return <path d={`M${x} ${y - 13} L${x + 13} ${y + 10} L${x - 13} ${y + 10} Z`} {...p} strokeLinejoin="round" />;
};

/** Egy lap jelkártyája: 4 jel egy sorban (szélesség kb. 160). x, y = bal felső sarok. */
export const CodeRow: React.FC<{ b: Block; x?: number; y?: number; w?: number }> = ({ b, x = 0, y = 0, w = 200 }) => {
  const step = w / 4;
  return (
    <g>
      <rect x={x} y={y} width={w} height="44" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
      <Splash x={x + step * 0.5} y={y + 22} c={FILL[b.color]} />
      <StickMan x={x + step * 1.5} y={y + 22} big={b.big} />
      <HoleSign x={x + step * 2.5} y={y + 22} holed={b.holed} />
      <ShapeSign x={x + step * 3.5} y={y + 22} s={b.shape} />
    </g>
  );
};

// ---------------------------------------------------------------------------
// Egyszerű elrendezők
// ---------------------------------------------------------------------------
export const BlockRow: React.FC<{ blocks: Block[]; numbered?: boolean; k?: number }> = ({ blocks, numbered = false, k }) => {
  const n = blocks.length;
  const step = 228 / n;
  const kk = k ?? (n > 5 ? 0.72 : n > 4 ? 0.85 : 1);
  return (
    <QFig h={numbered ? 112 : 96}>
      {blocks.map((b, i) => (
        <g key={i}>
          <LogicBlock b={b} x={6 + step * (i + 0.5)} y={48} k={kk} />
          {numbered && <T x={6 + step * (i + 0.5)} y={100} s={14}>{i + 1}.</T>}
        </g>
      ))}
    </QFig>
  );
};

export const NumRow: React.FC<{ nums: (number | string)[]; numbered?: boolean }> = ({ nums, numbered = false }) => {
  const n = nums.length;
  const step = 228 / n;
  return (
    <QFig h={numbered ? 96 : 76}>
      {nums.map((v, i) => (
        <g key={i}>
          <rect x={6 + step * i + 4} y="16" width={step - 8} height="40" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="2.5" />
          <T x={6 + step * (i + 0.5)} y={44} s={String(v).length > 3 ? 15 : 20} c={v === '?' ? UNK : '#0f172a'}>{v}</T>
          {numbered && <T x={6 + step * (i + 0.5)} y={84} s={13} c="#475569">{i + 1}.</T>}
        </g>
      ))}
    </QFig>
  );
};

/** Számok egy halmazban (keretben), szétszórva. */
export const NumSet: React.FC<{ nums: number[]; label?: string }> = ({ nums, label }) => {
  const pos = [
    [60, 48],
    [150, 42],
    [200, 82],
    [104, 86],
    [48, 112],
    [160, 116]
  ];
  return (
    <QFig h={140}>
      <rect x="14" y="16" width="212" height="112" rx="26" fill="#ecfeff" stroke="#0891b2" strokeWidth="2.5" />
      {label && (
        <g>
          <rect x={120 - label.length * 4.2 - 10} y="6" width={label.length * 8.4 + 20} height="22" rx="11" fill="#ffffff" stroke="#0891b2" strokeWidth="2" />
          <T x={120} y={22} s={13} c={label === '?' ? UNK : '#0f172a'}>{label}</T>
        </g>
      )}
      {nums.map((n, i) => (
        <T key={i} x={pos[i][0]} y={pos[i][1] + 7} s={19}>{n}</T>
      ))}
    </QFig>
  );
};

export const Cards: React.FC<{ digits: (string | number)[] }> = ({ digits }) => {
  const n = digits.length;
  const w = 40;
  const gap = 14;
  const x0 = 120 - (n * w + (n - 1) * gap) / 2;
  return (
    <QFig h={90}>
      {digits.map((d, i) => (
        <DigitCard key={i} x={x0 + i * (w + gap)} y={16} d={d} w={w} h={56} fs={32} fill={String(d) === '0' ? '#fef3c7' : '#ffffff'} />
      ))}
    </QFig>
  );
};

export const BallsFig: React.FC<{ balls: PalName[] }> = ({ balls }) => {
  const step = 52;
  const x0 = 120 - ((balls.length - 1) * step) / 2;
  return (
    <QFig h={80}>
      {balls.map((c, i) => (
        <Ball key={i} x={x0 + i * step} y={40} r={19} c={c} sw={3} />
      ))}
    </QFig>
  );
};

export const OutfitsFig: React.FC<{ shirts: PalName[]; pants: PalName[] }> = ({ shirts, pants }) => {
  const row = (items: PalName[], y: number, shirt: boolean) => {
    const x0 = 120 - ((items.length - 1) * 50) / 2;
    return items.map((c, i) => (shirt ? <Shirt key={i} x={x0 + i * 50} y={y} c={c} r={18} /> : <Pants key={i} x={x0 + i * 50} y={y} c={c} r={18} />));
  };
  return (
    <QFig h={124}>
      {row(shirts, 36, true)}
      {row(pants, 90, false)}
    </QFig>
  );
};

export const TowersFig: React.FC<{ heights: number[] }> = ({ heights }) => {
  const cols: PalName[] = ['piros', 'kek', 'zold', 'sarga'];
  const step = 52;
  const x0 = 120 - ((heights.length - 1) * step) / 2;
  return (
    <QFig h={140}>
      <line x1="16" y1="112" x2="224" y2="112" stroke="#334155" strokeWidth="3" />
      {heights.map((h, i) => (
        <g key={i}>
          <Tower x={x0 + i * step} y={112} n={h} s={13} c={cols[i % 4]} />
          <T x={x0 + i * step} y={132} s={16}>{'ABCD'[i]}</T>
        </g>
      ))}
    </QFig>
  );
};

/** Válogatási fa két szinttel: gyökér → 2 ág → 2-2 levél, a levelekben '?' vagy lap. */
export const TreeFig: React.FC<{ root: string; l1: [string, string]; l2: [string, string]; leaves?: (Block | null)[] }> = ({ root, l1, l2, leaves = [null, null, null, null] }) => {
  const box = (x: number, y: number, label: string, c: string) => {
    const w = Math.max(76, label.length * 7.4 + 16);
    return (
      <g>
        <rect x={x - w / 2} y={y - 12} width={w} height="24" rx="8" fill="#ffffff" stroke={c} strokeWidth="2" />
        <T x={x} y={y + 5} s={12}>{label}</T>
      </g>
    );
  };
  const xs = [32, 90, 150, 208];
  return (
    <QFig h={190}>
      <line x1="120" y1="30" x2="62" y2="66" stroke="#64748b" strokeWidth="2.5" />
      <line x1="120" y1="30" x2="178" y2="66" stroke="#64748b" strokeWidth="2.5" />
      {xs.map((x, i) => (
        <line key={i} x1={i < 2 ? 62 : 178} y1="90" x2={x} y2="126" stroke="#64748b" strokeWidth="2.5" />
      ))}
      {box(120, 20, root, '#0891b2')}
      {box(62, 78, l1[0], '#dc2626')}
      {box(178, 78, l1[1], '#dc2626')}
      {xs.map((x, i) => (
        <g key={i}>
          <T x={x} y={180} s={11} c="#475569">{l2[i % 2]}</T>
          {leaves[i] ? (
            <LogicBlock b={leaves[i] as Block} x={x} y={146} k={0.9} />
          ) : (
            <g>
              <circle cx={x} cy={146} r={16} fill="#fee2e2" stroke={UNK} strokeWidth="2.5" strokeDasharray="4 3" />
              <T x={x} y={152} s={16} c={UNK}>?</T>
            </g>
          )}
        </g>
      ))}
    </QFig>
  );
};

export const ScoopsFig: React.FC<{ flavours: PalName[] }> = ({ flavours }) => {
  const step = 56;
  const x0 = 120 - ((flavours.length - 1) * step) / 2;
  return (
    <QFig h={100}>
      {flavours.map((c, i) => (
        <Scoop key={i} x={x0 + i * step} y={34} c={c} r={17} />
      ))}
    </QFig>
  );
};

export const RoutesFig: React.FC<{ a: number; b: number; names?: [string, string, string] }> = ({ a, b, names = ['ház', 'bolt', 'iskola'] }) => {
  const arcs = (x1: number, x2: number, n: number, c: string) =>
    Array.from({ length: n }, (_, i) => {
      const off = n === 1 ? 0 : -36 + (72 * i) / (n - 1);
      return <path key={i} d={`M${x1} 58 Q${(x1 + x2) / 2} ${58 + off} ${x2} 58`} fill="none" stroke={c} strokeWidth="4" strokeLinecap="round" />;
    });
  return (
    <QFig h={120}>
      {arcs(30, 120, a, '#0ea5e9')}
      {arcs(120, 210, b, '#f97316')}
      <circle cx="30" cy="58" r="13" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="2.5" />
      <circle cx="120" cy="58" r="13" fill="#22c55e" stroke="#14532d" strokeWidth="2.5" />
      <circle cx="210" cy="58" r="13" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
      <T x={30} y={106} s={12}>{names[0]}</T>
      <T x={120} y={106} s={12}>{names[1]}</T>
      <T x={210} y={106} s={12}>{names[2]}</T>
    </QFig>
  );
};

export const KidsRowFig: React.FC<{ kids: [PalName, string, string?][] }> = ({ kids }) => {
  const step = 240 / kids.length;
  return (
    <QFig h={kids.some((k) => k[2]) ? 118 : 104}>
      {kids.map(([c, name, sub], i) => (
        <g key={i}>
          <Kid x={step * (i + 0.5)} y={72} c={c} letter={name[0]} h={58} />
          <T x={step * (i + 0.5)} y={90} s={13}>{name}</T>
          {sub && <T x={step * (i + 0.5)} y={108} s={12} w="normal" c="#475569">{sub}</T>}
        </g>
      ))}
    </QFig>
  );
};
