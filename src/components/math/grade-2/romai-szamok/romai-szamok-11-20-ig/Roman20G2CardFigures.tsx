import React from 'react';

export {
  StickCard150,
  StickCard80,
  ClockCard150,
  ClockCard80,
  RomanCard80,
  LinePointCard150
} from '../romai-szamok-ertelmezese/RomanIntroG2CardFigures';

/** 80 × 80: tízes rúd + egyes kockák (érték nincs kiírva). */
export const TenAndOnesCard80: React.FC<{ ones: number }> = ({ ones }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x="10" y={8 + i * 6.4} width="12" height="6.4" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1" />
    ))}
    {Array.from({ length: ones }, (_, i) => (
      <rect
        key={`o${i}`}
        x={30 + (i % 3) * 14}
        y={10 + Math.floor(i / 3) * 14}
        width="11"
        height="11"
        fill="#3b82f6"
        stroke="#1e3a8a"
        strokeWidth="1.2"
      />
    ))}
  </svg>
);
