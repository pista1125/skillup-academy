import React from 'react';
import { N100_FONT } from '../szamok-100-ig/Numbers100G2Parts';
import { RodsSubPart, rodsSubWidth, subRods } from './Sub100G2Parts';

export { JumpCard } from '../osszeadas-100-as-szamkor/Add100G2CardFigures';

// ---------------------------------------------------------------------------
// Kártyaképek: Párosító (150 × 80), Csoportosító (80 × 80).
// Az elvett rudak/kockák áthúzva; a különbséget nem írják ki.
// ---------------------------------------------------------------------------

const Frame: React.FC<{ w: number; children: React.ReactNode }> = ({ w, children }) => (
  <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="3" y="3" width={w - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** a − b rudakkal (áthúzott elvétel), 150 × 80. */
export const RodsSubCard150: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const u = 6;
  const w = rodsSubWidth(a, b, u);
  return (
    <Frame w={150}>
      <RodsSubPart x={75 - w / 2} y={10} a={a} b={b} u={u} strokeWidth={1.1} />
    </Frame>
  );
};

/** a − b rudakkal, 80 × 80. */
export const RodsSubCard80: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const s = subRods(a, b);
  const u = s.tens + Math.ceil(s.ones / 5) > 10 ? 4 : 4.5;
  const w = rodsSubWidth(a, b, u);
  return (
    <Frame w={80}>
      <RodsSubPart x={40 - w / 2} y={40 - 5 * u} a={a} b={b} u={u} strokeWidth={0.9} />
    </Frame>
  );
};
