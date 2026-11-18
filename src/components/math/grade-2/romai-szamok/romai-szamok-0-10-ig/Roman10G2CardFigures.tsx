import React from 'react';

export {
  StickCard150,
  StickCard80,
  ClockCard150,
  ClockCard80,
  RomanCard80,
  LinePointCard150
} from '../romai-szamok-ertelmezese/RomanIntroG2CardFigures';

/** 80 × 80: korongok ötös csoportokban (érték nincs kiírva). */
export const DotsCard80: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {Array.from({ length: n }, (_, i) => {
      const row = Math.floor(i / 5);
      const col = i % 5;
      return (
        <circle
          key={i}
          cx={14 + col * 13}
          cy={28 + row * 24}
          r="5.5"
          fill={row === 0 ? '#22c55e' : '#3b82f6'}
          stroke={row === 0 ? '#166534' : '#1e3a8a'}
          strokeWidth="1.6"
        />
      );
    })}
  </svg>
);
