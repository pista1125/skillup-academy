import React from 'react';
import { SHAPES, ShapeG, INK, StickGrid, Stick } from './PolygonsG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Egy síkidom középen. */
export const ShapeCard: React.FC<{ id: string; small?: boolean; fill?: string }> = ({ id, small = false, fill }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <ShapeG shape={SHAPES[id]} x={W / 2 - 35} y={5} s={70} sw={3.5} fill={fill} />
    </svg>
  );
};

export type LineKind = 'straight' | 'slant' | 'curve' | 'wave' | 'zigzag' | 'loop' | 'cross' | 'arc' | 'spiral';

/** Vonalak (nem zárt alakzatok). */
export const LineCard: React.FC<{ kind: LineKind }> = ({ kind }) => {
  const d: Record<LineKind, string> = {
    straight: 'M 10 40 L 70 40',
    slant: 'M 12 66 L 68 14',
    curve: 'M 10 60 Q 40 0 70 60',
    wave: 'M 6 40 Q 18 20 30 40 T 54 40 T 78 40',
    zigzag: 'M 8 56 L 24 22 L 40 56 L 56 22 L 72 56',
    loop: 'M 10 60 C 30 0 60 0 50 40 C 44 60 70 60 72 30',
    cross: 'M 14 40 L 66 40 M 40 12 L 40 68',
    arc: 'M 12 56 A 30 30 0 0 1 68 56',
    spiral: 'M 40 40 m 0 -4 a 4 4 0 1 1 -4 4 a 9 9 0 1 1 9 9 a 16 16 0 1 1 -16 -16'
  };
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <path d={d[kind]} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/** Pálcikás négyzetrács a kártyán. */
export const StickGridCard: React.FC<{ r: number; c: number }> = ({ r, c }) => {
  const s = Math.min(64 / r, 120 / c, 32);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <StickGrid r={r} c={c} x={75 - (c * s) / 2} y={40 - (r * s) / 2} s={s} w={4} />
    </svg>
  );
};

/** Két külön háromszög pálcikából. */
export const TwoTrianglesCard: React.FC = () => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    {[0, 1].map((i) => {
      const x = 22 + i * 62;
      return (
        <g key={i}>
          <Stick x1={x} y1={70} x2={x + 46} y2={70} w={4} />
          <Stick x1={x + 46} y1={70} x2={x + 23} y2={14} w={4} />
          <Stick x1={x + 23} y1={14} x2={x} y2={70} w={4} />
        </g>
      );
    })}
  </svg>
);

/** Háromszög a csúcsából húzott vonallal (hány háromszög?). */
export const SplitTriangleCard: React.FC = () => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <polygon points="25,72 125,72 75,8" fill="#fde68a" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    <line x1="75" y1="8" x2="75" y2="72" stroke={INK} strokeWidth="3.5" />
  </svg>
);

/** Két síkidom egymás mellett. */
export const TwoShapesCard: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <ShapeG shape={SHAPES[a]} x={8} y={6} s={66} sw={3.5} />
    <ShapeG shape={SHAPES[b]} x={78} y={6} s={66} sw={3.5} />
  </svg>
);
