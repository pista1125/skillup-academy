import React from 'react';

export {
  StickCard150,
  StickCard80,
  ClockCard150,
  ClockCard80,
  RomanCard80,
  LinePointCard150,
  LabelCard150
} from '../romai-szamok-ertelmezese/RomanIntroG2CardFigures';

/** 80 × 80: római szám egy kis táblán (jó vagy hibás írás is lehet – nincs rajta jelölés). */
export const PlainSignCard80: React.FC<{ value: string }> = ({ value }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="74" height="60" rx="8" fill="#fef3c7" stroke="#a16207" strokeWidth="4" />
    <line x1="20" y1="70" x2="20" y2="78" stroke="#a16207" strokeWidth="4" />
    <line x1="60" y1="70" x2="60" y2="78" stroke="#a16207" strokeWidth="4" />
    <text
      x="40"
      y="50"
      textAnchor="middle"
      fontSize={value.length > 4 ? 18 : value.length > 3 ? 22 : 28}
      fontWeight="bold"
      fill="#78350f"
      fontFamily='Georgia, "Times New Roman", serif'
    >
      {value}
    </text>
  </svg>
);
