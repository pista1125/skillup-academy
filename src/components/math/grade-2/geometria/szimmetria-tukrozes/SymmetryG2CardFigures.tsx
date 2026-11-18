import React from 'react';
import { AXIS_COLOR, CellGridPart, Cell, mirrorV, SymShape, SymShapePart, GlyphPart } from './SymmetryG2Parts';

const Frame150: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
    {children}
  </svg>
);

const Frame80: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
    {children}
  </svg>
);

/** Fél alakzatok (bal fél, a tengely az x = 0 vonal). */
export const HALVES: Record<string, [number, number][]> = {
  sziv: [
    [0, -8],
    [-10, -18],
    [-22, -10],
    [-20, 4],
    [0, 22]
  ],
  fenyo: [
    [0, -24],
    [-10, -10],
    [-6, -10],
    [-16, 4],
    [-10, 4],
    [-20, 16],
    [-4, 16],
    [-4, 24],
    [0, 24]
  ],
  haz: [
    [0, -24],
    [-22, -4],
    [-16, -4],
    [-16, 22],
    [0, 22]
  ],
  nyil: [
    [0, -24],
    [-20, -4],
    [-8, -4],
    [-8, 22],
    [0, 22]
  ],
  vaza: [
    [0, -22],
    [-8, -22],
    [-8, -14],
    [-18, 0],
    [-12, 20],
    [0, 20]
  ],
  korona: [
    [0, -6],
    [-8, -20],
    [-14, -6],
    [-22, -22],
    [-22, 18],
    [0, 18]
  ],
  sarkany: [
    [0, -24],
    [-16, -6],
    [0, 24]
  ],
  csillag: [
    [0, -24],
    [-6, -8],
    [-24, -8],
    [-10, 4],
    [-16, 22],
    [0, 12]
  ]
};

const HALF_COLORS: Record<string, string> = {
  sziv: '#f472b6',
  fenyo: '#22c55e',
  haz: '#f97316',
  nyil: '#3b82f6',
  vaza: '#a855f7',
  korona: '#facc15',
  sarkany: '#14b8a6',
  csillag: '#ef4444'
};

const halfPts = (name: string) => HALVES[name].map(([x, y]) => `${x},${y}`).join(' ');
const wholePts = (name: string) => {
  const h = HALVES[name];
  const mirrored = [...h].reverse().map(([x, y]) => [-x, y] as [number, number]);
  return [...h, ...mirrored].map(([x, y]) => `${x},${y}`).join(' ');
};

export const HalfCard150: React.FC<{ name: string }> = ({ name }) => (
  <Frame150>
    <g transform="translate(75 40) scale(1.3)">
      <polygon points={halfPts(name)} fill={HALF_COLORS[name]} stroke="#334155" strokeWidth="1.6" strokeLinejoin="round" />
      <line x1="0" y1="-28" x2="0" y2="28" stroke={AXIS_COLOR} strokeWidth="2" strokeDasharray="4 3" />
    </g>
  </Frame150>
);

export const WholeCard150: React.FC<{ name: string }> = ({ name }) => (
  <Frame150>
    <g transform="translate(75 40) scale(1.3)">
      <polygon points={wholePts(name)} fill={HALF_COLORS[name]} stroke="#334155" strokeWidth="1.6" strokeLinejoin="round" />
    </g>
  </Frame150>
);

export const ShapeCard150: React.FC<{ kind: SymShape }> = ({ kind }) => (
  <Frame150>
    <SymShapePart kind={kind} cx={75} cy={40} s={1.2} />
  </Frame150>
);

export const ShapeCard80: React.FC<{ kind: SymShape }> = ({ kind }) => (
  <Frame80>
    <SymShapePart kind={kind} cx={40} cy={40} s={1.1} />
  </Frame80>
);

export const GlyphCard80: React.FC<{ ch: string }> = ({ ch }) => (
  <Frame80>
    <GlyphPart ch={ch} x={24} y={17} s={1.6} />
  </Frame80>
);

/** 8 mező széles csík, tengely a 4. és 5. között, egy színes mező. */
export const StripCard150: React.FC<{ col: number }> = ({ col }) => (
  <Frame150>
    <CellGridPart x={11} y={26} cols={8} rows={1} cell={16} cells={[{ c: [col - 1, 0], fill: '#6366f1' }]} axisV={4} />
  </Frame150>
);

/** Minitükrözés 80 × 80: bal minta + jobb oldal (jó tükörkép / áttolás / elcsúszott). */
export const MiniMirrorCard80: React.FC<{ left: Cell[]; mode: 'good' | 'shift' | 'off' }> = ({ left, mode }) => {
  const right: Cell[] = left.map((c) => {
    if (mode === 'good') return mirrorV(c, 3);
    if (mode === 'shift') return [c[0] + 3, c[1]];
    const m = mirrorV(c, 3);
    return [Math.min(5, m[0] + 1), m[1]];
  });
  return (
    <Frame80>
      <CellGridPart
        x={4}
        y={16}
        cols={6}
        rows={4}
        cell={12}
        cells={[...left.map((c) => ({ c, fill: '#6366f1' })), ...right.map((c) => ({ c, fill: '#ec4899' }))]}
        axisV={3}
      />
    </Frame80>
  );
};
