import React from 'react';
import { FitBuilding } from '../a-testek/SolidsG3Parts';
import { Box, cuboidPlan, NetGrid, CuboidNet, DieFace, Cell } from './CuboidG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Téglatest (hossz, magasság, mélység). */
export const BoxCard: React.FC<{ l: number; h: number; d: number; small?: boolean; color?: string }> = ({ l, h, d, small = false, color }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <Box l={l} h={h} d={d} x={6} y={6} w={W - 12} hh={68} color={color} sw={3} />
    </svg>
  );
};

/** Hat négyzetből álló háló. */
export const NetCard: React.FC<{ cells: Cell[]; small?: boolean; fill?: string }> = ({ cells, small = false, fill = '#bfdbfe' }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <NetGrid cells={cells} x={4} y={4} w={W - 8} h={72} maxCell={22} fill={fill} sw={2.6} />
    </svg>
  );
};

/** Téglatest hálója (egyszínű, hogy a szín ne árulja el a csoportot). */
export const CuboidNetCard: React.FC<{ l: number; d: number; h: number; bottom?: 'front' | 'back'; rotate?: boolean; small?: boolean }> = ({ l, d, h, bottom, rotate, small = false }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <CuboidNet l={l} d={d} h={h} x={4} y={4} w={W - 8} hh={72} bottom={bottom} rotate={rotate} sw={2.4} colors={['#bfdbfe', '#bfdbfe', '#bfdbfe']} />
    </svg>
  );
};

/** Kis kockákból épített téglatest. */
export const CubesCard: React.FC<{ l: number; d: number; h: number; small?: boolean }> = ({ l, d, h, small = false }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <FitBuilding plan={cuboidPlan(l, d, h)} x={4} y={4} w={W - 8} h={72} maxU={small ? 22 : 24} sw={2} />
    </svg>
  );
};

/** Dobókocka-lap. */
export const DieCard: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <DieFace n={n} x={43} y={8} s={64} sw={3} />
  </svg>
);
