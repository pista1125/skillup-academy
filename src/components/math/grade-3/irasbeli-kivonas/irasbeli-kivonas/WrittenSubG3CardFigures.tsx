import React from 'react';
import { FONT, PLACE_BODY, PLACE_FILL } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) kártyáira. (A Csoportosító a korábbi leckék kártyaképeit használja.)

/** Párosító: írásbeli kivonás oszlopban, nagy számjegyekkel; r megadásával az eredmény is látszik. */
export const MiniCol: React.FC<{ a: number; b: number; r?: number }> = ({ a, b, r }) => {
  const rows = [a, b, ...(r !== undefined ? [r] : [])].map((v) => String(v).padStart(3, ' ').split(''));
  const cw = 26;
  const x0 = 46;
  const rowY = r !== undefined ? [24, 48, 75] : [32, 62];
  const lineY = r !== undefined ? 54 : 70;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x0 + i * cw} y="0" width={cw} height="5" fill={PLACE_FILL[i]} />
          <rect x={x0 + i * cw} y="5" width={cw} height="75" fill={PLACE_BODY[i]} />
          {rows.map((row, k) => (
            <text key={k} x={x0 + i * cw + cw / 2} y={rowY[k]} textAnchor="middle" fontSize="23" fontWeight="bold" fill={k === 2 ? '#1d4ed8' : '#0f172a'}>{row[i].trim()}</text>
          ))}
        </g>
      ))}
      <text x={x0 - 12} y={rowY[1] - 1} textAnchor="middle" fontSize="23" fontWeight="bold" fill="#dc2626">−</text>
      <line x1={x0 - 22} y1={lineY} x2={x0 + 3 * cw + 4} y2={lineY} stroke="#0f172a" strokeWidth="3" />
    </svg>
  );
};
