import React from 'react';
import { Txt } from '../bevezetes/EqualPartsG3Parts';
import { Rod, Flag, FlagKind, Cup, FracView, firstK, PIE, BAR, GRID } from './FractionPartsG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

const Box: React.FC<{ small?: boolean; children: (W: number) => React.ReactNode }> = ({ small = false, children }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      {children(W)}
    </svg>
  );
};

/** n egyenlő részre osztott kör / csík / rács, az első k rész színes. */
export const FracCard: React.FC<{ kind: 'pie' | 'bar' | 'grid'; n: number; k: number; rows?: number; cols?: number; small?: boolean; color?: string; colored?: boolean[] }> = ({
  kind,
  n,
  k,
  rows = 2,
  cols,
  small,
  color = '#ef4444',
  colored
}) => (
  <Box small={small}>
    {(W) => {
      const task = kind === 'pie' ? PIE(n) : kind === 'bar' ? BAR(n) : GRID(rows, cols ?? n / rows);
      const pad = kind === 'bar' ? 6 : 4;
      return <FracView task={task} x={pad} y={kind === 'bar' ? 18 : 4} w={W - 2 * pad} h={kind === 'bar' ? 44 : 72} colored={colored ?? firstK(n, k)} color={color} sw={3} />;
    }}
  </Box>
);

/** Zászló. */
export const FlagCard: React.FC<{ kind: FlagKind; small?: boolean }> = ({ kind, small }) => (
  <Box small={small}>{(W) => <Flag kind={kind} x={W / 2 - (small ? 32 : 45)} y={small ? 18 : 10} w={small ? 64 : 90} h={small ? 44 : 60} sw={3} />}</Box>
);

/** 10 dl-es mérőedény. */
export const CupCard: React.FC<{ fill: number; small?: boolean }> = ({ fill, small }) => (
  <Box small={small}>{(W) => <Cup x={W / 2 - (small ? 16 : 30)} y={12} w={small ? 32 : 36} h={62} fill={fill} nums={!small} sw={3} />}</Box>
);

/** Egész rúd fölül, alatta a rész-rúd. */
export const RodCard: React.FC<{ whole: number; part: number; small?: boolean; q?: boolean }> = ({ whole, part, small, q }) => (
  <Box small={small}>
    {(W) => {
      const unit = (W - 12) / whole;
      return (
        <g>
          <Rod len={whole} x={6} y={14} unit={unit} h={22} sw={3} />
          <Rod len={part} x={6} y={44} unit={unit} h={22} sw={3} />
          {q && (
            <Txt x={W - 20} y={64} s={24} c="#dc2626">
              ?
            </Txt>
          )}
        </g>
      );
    }}
  </Box>
);
