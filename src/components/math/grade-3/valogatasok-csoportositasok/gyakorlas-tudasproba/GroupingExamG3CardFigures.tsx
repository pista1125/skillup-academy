import React from 'react';
import { FONT, FILL, Block, LogicBlock, Splash, StickMan, HoleSign, ShapeSign, Region } from './GroupingExamG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// A sorrendes kártyákat a 3. lecke kártyaábrái adják.
export { CardsCard, BallsCard, OutfitCard, PathsCard, ScoopsCard, KidsCard } from '../sorba-rendezes-lehetosegek/ArrangementsG3CardFigures';

/** Egy logikai lap középen. */
export const OneBlockCard: React.FC<{ b: Block; small?: boolean }> = ({ b, small = false }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <LogicBlock b={b} x={W / 2} y={40} k={small ? 1.35 : 1.55} sw={3.5} />
    </svg>
  );
};

/** Jelkártya: szín, méret, lyukas?, forma. */
export const CodeCard: React.FC<{ b: Block }> = ({ b }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="144" height="60" rx="10" fill="#ffffff" stroke="#94a3b8" strokeWidth="3" />
    <Splash x={22} y={40} c={FILL[b.color]} r={12} />
    <StickMan x={57} y={40} big={b.big} />
    <HoleSign x={92} y={40} holed={b.holed} />
    <ShapeSign x={127} y={40} s={b.shape} />
  </svg>
);

/** Mini halmazábra, a keresett rész egy nagy ponttal jelölve. */
export const VennDotCard: React.FC<{ a: string; b: string; r: Region }> = ({ a, b, r }) => {
  const dot: Record<Region, [number, number]> = { a: [46, 50], ab: [75, 50], b: [104, 50], out: [14, 68] };
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="2" width="146" height="76" rx="8" fill="#ffffff" stroke="#15803d" strokeWidth="3" />
      <circle cx="58" cy="50" r="25" fill="none" stroke="#dc2626" strokeWidth="3" />
      <circle cx="92" cy="50" r="25" fill="none" stroke="#2563eb" strokeWidth="3" />
      <text x="40" y="19" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b91c1c">{a}</text>
      <text x="110" y="19" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1d4ed8">{b}</text>
      <circle cx={dot[r][0]} cy={dot[r][1]} r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
    </svg>
  );
};
