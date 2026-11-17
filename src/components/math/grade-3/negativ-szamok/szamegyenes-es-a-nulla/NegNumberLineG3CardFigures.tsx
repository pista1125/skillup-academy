import React from 'react';
import { NumberLine, NLProps } from './NegNumberLineG3Parts';

export { ThermoCard } from '../negativ-szamok-a-mindennapokban/NegEverydayG3CardFigures';

// Kis, vastag vonalas kártyaábrák: Párosító 150 × 80, Csoportosító 80 × 80.

/** Számegyenes kártyán piros ponttal. small = 80 × 80 (csoportosító), egyébként 150 × 80 (párosító). */
export const NLCard: React.FC<{
  v: number;
  from: number;
  to: number;
  labels?: NLProps['labels'];
  small?: boolean;
}> = ({ v, from, to, labels = [0], small = false }) => {
  const W = small ? 80 : 150;
  const fs = small ? 15 : 18;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <NumberLine from={from} to={to} x0={small ? 12 : 22} x1={small ? 62 : 126} y={30} labels={labels} fs={fs} sw={2.5} tk={1.5} pr={small ? 4 : 5} points={[{ v }]} />
    </svg>
  );
};
