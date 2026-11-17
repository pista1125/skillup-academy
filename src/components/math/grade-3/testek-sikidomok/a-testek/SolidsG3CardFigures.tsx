import React from 'react';
import { Solid, SolidKind, FitBuilding, PlanGrid } from './SolidsG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Egy test középen. */
export const SolidCard: React.FC<{ kind: SolidKind; small?: boolean; color?: string }> = ({ kind, small = false, color }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <Solid kind={kind} cx={W / 2} by={72} s={small ? 58 : 62} sw={3} color={color} />
    </svg>
  );
};

/** Alaprajz a kártyán: nagy számjegyek. */
export const PlanCard: React.FC<{ plan: number[][] }> = ({ plan }) => {
  const R = plan.length;
  const C = Math.max(...plan.map((r) => r.length));
  const cell = Math.min(34, 72 / R, 140 / C);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <PlanGrid plan={plan} x={75 - (C * cell) / 2} y={40 - (R * cell) / 2} cell={cell} fs={Math.min(24, cell * 0.7)} sw={3} />
    </svg>
  );
};

/** Kis kockákból épített építmény a kártyán. */
export const BuildingCard: React.FC<{ plan: number[][]; small?: boolean }> = ({ plan, small = false }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <FitBuilding plan={plan} x={4} y={4} w={W - 8} h={72} maxU={small ? 24 : 26} sw={2.2} />
    </svg>
  );
};
