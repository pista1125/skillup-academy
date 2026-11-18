import React from 'react';
import { ObjectIcon, ObjKind } from './MeasExamG2Parts';

/**
 * Tárgy- vagy mérőeszköz-kártya (Párosító 150 × 80, Csoportosító: small 80 × 80).
 * A többi kártyakép (vonalzó, mérleg, mérőedény, óra) a fejezet leckéiből jön.
 */
export const ObjectCard: React.FC<{ kind: ObjKind; small?: boolean }> = ({ kind, small }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width={W - 4} height="76" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <ObjectIcon kind={kind} x={(W - 72) / 2} y={4} s={0.9} />
    </svg>
  );
};
