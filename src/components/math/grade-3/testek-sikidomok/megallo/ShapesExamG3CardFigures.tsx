import React from 'react';
import { Solid, SolidKind, PlanGrid } from '../a-testek/SolidsG3Parts';
import { Box } from '../a-teglatest-es-a-kocka/CuboidG3Parts';
import { Heart } from '../tukrozesek-szimmetria/SymmetryG3Parts';
import { FONT, PlaneShape, PolyKind } from './ShapesExamG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

const M: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {children}
  </svg>
);
const S: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {children}
  </svg>
);

/** Párosító: test. */
export const MSolid: React.FC<{ kind: SolidKind }> = ({ kind }) => (
  <M>
    <Solid kind={kind} cx={75} by={kind === 'teglatest' ? 70 : 74} s={kind === 'teglatest' ? 88 : 62} sw={2.6} />
  </M>
);
/** Párosító: síkidom. */
export const MShape: React.FC<{ kind: PolyKind }> = ({ kind }) => (
  <M>
    <PlaneShape kind={kind} cx={75} cy={40} r={34} sw={3} />
  </M>
);
/** Párosító: szív (1 tükörtengely). */
export const MHeart: React.FC = () => (
  <M>
    <Heart cx={75} cy={40} s={1.05} sw={3} />
  </M>
);
/** Párosító: alaprajz számokkal. */
export const MPlan: React.FC<{ plan: number[][] }> = ({ plan }) => {
  const cell = Math.min(30, 70 / plan.length);
  const w = plan[0].length * cell;
  return (
    <M>
      <PlanGrid plan={plan} x={(150 - w) / 2} y={(80 - plan.length * cell) / 2} cell={cell} fs={cell * 0.62} sw={2.5} />
    </M>
  );
};

/** Csoportosító: test. */
export const SSolid: React.FC<{ kind: SolidKind }> = ({ kind }) => (
  <S>
    <Solid kind={kind} cx={40} by={72} s={kind === 'teglatest' ? 68 : 54} sw={2.6} />
  </S>
);
/** Csoportosító: síkidom. */
export const SShape: React.FC<{ kind: PolyKind }> = ({ kind }) => (
  <S>
    <PlaneShape kind={kind} cx={40} cy={40} r={34} sw={3} />
  </S>
);
/** Csoportosító: szív. */
export const SHeart: React.FC = () => (
  <S>
    <Heart cx={40} cy={42} s={0.9} sw={3} />
  </S>
);
/** Csoportosító: magas téglatest. */
export const STallBox: React.FC = () => (
  <S>
    <Box l={0.8} h={1.7} d={0.7} x={6} y={4} w={68} hh={72} color="#f59e0b" sw={2.4} />
  </S>
);
