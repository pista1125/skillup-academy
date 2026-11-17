import React from 'react';
import { FONT } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';

export { FONT };
export { LogicBlock, B, blockName, ALL_BLOCKS, COLOR_NAME, SHAPE_NAME, SHAPE_PLURAL, COLORS, SHAPES, NumCard } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';
export type { Block } from '../valogatas-tulajdonsagok-szerint/SortingByPropertyG3Parts';

// ---------------------------------------------------------------------------
// Halmazábra (a könyv szavaival): keret saját címkével, benne két karika címkével.
// Rögzített koordináták: 240 × 180-as rajzlap; nagyobb ábrához a `scale` nagyít.
// ---------------------------------------------------------------------------

export type Region = 'a' | 'ab' | 'b' | 'out';
export type VennMode = 'overlap' | 'apart' | 'nested';

export const VW = 240;
export const VH = 180;

interface Ell {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}
export const GEO: Record<VennMode, { A: Ell; B: Ell }> = {
  overlap: { A: { cx: 88, cy: 98, rx: 66, ry: 54 }, B: { cx: 152, cy: 98, rx: 66, ry: 54 } },
  apart: { A: { cx: 63, cy: 96, rx: 54, ry: 54 }, B: { cx: 177, cy: 96, rx: 54, ry: 54 } },
  // B (belső) teljesen A-ban van
  nested: { A: { cx: 120, cy: 98, rx: 104, ry: 62 }, B: { cx: 150, cy: 104, rx: 52, ry: 40 } }
};

export const inEll = (e: Ell, x: number, y: number) => ((x - e.cx) / e.rx) ** 2 + ((y - e.cy) / e.ry) ** 2 <= 1;

/** Melyik részbe esik a pont? (A labor kattintásához.) */
export const regionAt = (mode: VennMode, x: number, y: number): Region => {
  const { A, B: Bb } = GEO[mode];
  const a = inEll(A, x, y);
  const b = inEll(Bb, x, y);
  if (a && b) return 'ab';
  if (a) return 'a';
  if (b) return 'b';
  return 'out';
};

/** Elhelyezési pontok az egyes részekben (legfeljebb 4 elem részenként). */
export const SLOTS: Record<VennMode, Record<Region, [number, number][]>> = {
  overlap: {
    a: [[52, 74], [50, 100], [56, 126], [34, 100]],
    ab: [[120, 74], [120, 100], [120, 126], [120, 52]],
    b: [[188, 74], [190, 100], [184, 126], [206, 100]],
    out: [[24, 163], [216, 163], [120, 165], [64, 165]]
  },
  apart: {
    a: [[63, 72], [42, 100], [84, 100], [63, 128]],
    ab: [],
    b: [[177, 72], [156, 100], [198, 100], [177, 128]],
    out: [[24, 163], [216, 163], [96, 165], [146, 165]]
  },
  nested: {
    a: [[50, 80], [52, 112], [86, 136], [80, 62]],
    ab: [[150, 90], [128, 114], [172, 114], [150, 132]],
    b: [],
    out: [[24, 163], [216, 163], [70, 165], [176, 165]]
  }
};

export const REGION_COLORS = { a: '#fecaca', b: '#bfdbfe', ab: '#ddd6fe', out: '#fef3c7' };

const pillW = (label: string, fs: number) => label.length * fs * 0.58 + 16;

/** Címke-tábla (fehér, lekerekített). */
export const Pill: React.FC<{ x: number; y: number; label: string; stroke: string; fs?: number; maxW?: number }> = ({ x, y, label, stroke, fs: fs0 = 12, maxW = 104 }) => {
  const fs = Math.min(fs0, (maxW - 14) / (label.length * 0.58));
  const w = Math.min(maxW, pillW(label, fs));
  return (
    <g>
      <rect x={x - w / 2} y={y - fs * 0.85} width={w} height={fs * 1.7} rx={fs * 0.6} fill="#ffffff" stroke={stroke} strokeWidth="2" />
      <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a" fontFamily={FONT}>
        {label}
      </text>
    </g>
  );
};

export interface VennProps {
  mode?: VennMode;
  frame?: string;
  a?: string;
  b?: string;
  /** színezett rész(ek) */
  shade?: Region[];
  /** egyedi azonosító a clipPath-hoz (egy oldalon több ábra is lehet) */
  id: string;
  fs?: number;
  children?: React.ReactNode;
}

/** A halmazábra rajza a 240 × 180-as lapon (svg-n belül, <g>-ként). */
export const Venn: React.FC<VennProps> = ({ mode = 'overlap', frame, a, b, shade = [], id, fs = 12, children }) => {
  const { A, B: Bb } = GEO[mode];
  const ca = `${id}-A`;
  const cb = `${id}-B`;
  const ell = (e: Ell, props: React.SVGProps<SVGEllipseElement>) => <ellipse cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} {...props} />;
  const labA = mode === 'nested' ? { x: 64, y: A.cy - A.ry } : { x: mode === 'apart' ? A.cx : A.cx - 22, y: A.cy - A.ry };
  const labB = mode === 'nested' ? { x: Bb.cx + 6, y: Bb.cy - Bb.ry } : { x: mode === 'apart' ? Bb.cx : Bb.cx + 22, y: Bb.cy - Bb.ry };
  return (
    <g fontFamily={FONT}>
      <defs>
        <clipPath id={ca}>{ell(A, {})}</clipPath>
        <clipPath id={cb}>{ell(Bb, {})}</clipPath>
      </defs>
      <rect x="3" y="3" width={VW - 6} height={VH - 6} rx="8" fill={shade.includes('out') ? REGION_COLORS.out : '#ffffff'} stroke="#15803d" strokeWidth="2.5" />
      {/* a karikák belseje fehér, aztán a színezett részek */}
      {ell(A, { fill: shade.includes('a') ? REGION_COLORS.a : '#ffffff' })}
      {ell(Bb, { fill: shade.includes('b') ? REGION_COLORS.b : '#ffffff' })}
      {mode !== 'apart' && (
        <g clipPath={`url(#${ca})`}>
          {ell(Bb, { fill: shade.includes('ab') ? REGION_COLORS.ab : '#ffffff' })}
        </g>
      )}
      {ell(A, { fill: 'none', stroke: '#dc2626', strokeWidth: 2.5 })}
      {ell(Bb, { fill: 'none', stroke: '#2563eb', strokeWidth: 2.5 })}
      {frame && (
        <g>
          <rect x="3" y="3" width={Math.min(150, pillW(frame, fs) + 4)} height={fs * 1.75} rx="8" fill="#15803d" />
          <text x={3 + Math.min(150, pillW(frame, fs) + 4) / 2} y={3 + fs * 1.2} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#ffffff">
            {frame}
          </text>
        </g>
      )}
      {a && <Pill x={labA.x} y={labA.y} label={a} stroke="#dc2626" fs={fs} />}
      {b && <Pill x={labB.x} y={labB.y} label={b} stroke="#2563eb" fs={fs} />}
      {children}
    </g>
  );
};

/** Kis számkártya a halmazábrába. */
export const VNum: React.FC<{ x: number; y: number; n: number | string; hl?: boolean; fs?: number }> = ({ x, y, n, hl = false, fs = 13 }) => {
  const w = String(n).length * fs * 0.62 + 10;
  return (
    <g>
      <rect x={x - w / 2} y={y - fs * 0.8} width={w} height={fs * 1.6} rx="5" fill={hl ? '#fee2e2' : '#ffffff'} stroke={hl ? '#dc2626' : '#64748b'} strokeWidth={hl ? 2 : 1.5} />
      <text x={x} y={y + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={hl ? '#dc2626' : '#0f172a'} fontFamily={FONT}>
        {n}
      </text>
    </g>
  );
};

/** Elemek elhelyezése a részekben. */
export const place = <T,>(mode: VennMode, items: { r: Region; v: T }[]): { x: number; y: number; v: T; r: Region }[] => {
  const used: Record<Region, number> = { a: 0, ab: 0, b: 0, out: 0 };
  return items.map((it) => {
    const slots = SLOTS[mode][it.r];
    const [x, y] = slots[used[it.r]++ % Math.max(1, slots.length)] ?? [120, 90];
    return { x, y, v: it.v, r: it.r };
  });
};
