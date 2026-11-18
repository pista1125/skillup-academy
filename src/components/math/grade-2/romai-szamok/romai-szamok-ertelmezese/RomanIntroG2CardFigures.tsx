import React from 'react';
import {
  ROMAN_FONT,
  UI_FONT,
  StickRomanPart,
  stickRomanWidth,
  RomanClockPart,
  NumberLinePart
} from './RomanIntroG2Parts';

/** 150 × 80: pálcikás római szám (Párosító). */
export const StickCard150: React.FC<{ value: string }> = ({ value }) => {
  const h = value.length > 4 ? 44 : 52;
  const w = stickRomanWidth(value, h);
  const scale = w > 136 ? 136 / w : 1;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="144" height="72" rx="10" fill="#fffbeb" stroke="#b45309" strokeWidth="3" />
      <g transform={`translate(${75 - (w * scale) / 2} ${40 - (h * scale) / 2}) scale(${scale})`}>
        <StickRomanPart value={value} x={0} y={0} h={h} />
      </g>
    </svg>
  );
};

/** 80 × 80: pálcikás római szám (Csoportosító). */
export const StickCard80: React.FC<{ value: string }> = ({ value }) => {
  const h = 46;
  const w = stickRomanWidth(value, h);
  const scale = w > 68 ? 68 / w : 1;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#fffbeb" stroke="#b45309" strokeWidth="3" />
      <g transform={`translate(${40 - (w * scale) / 2} ${40 - (h * scale) / 2}) scale(${scale})`}>
        <StickRomanPart value={value} x={0} y={0} h={h} />
      </g>
    </svg>
  );
};

/** 150 × 80: kis római óra egész órával (Párosító). */
export const ClockCard150: React.FC<{ hour: number }> = ({ hour }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="3" />
    <RomanClockPart cx={75} cy={40} r={30} hour={hour} />
  </svg>
);

/** 80 × 80: kis római óra (Csoportosító). */
export const ClockCard80: React.FC<{ hour: number }> = ({ hour }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <RomanClockPart cx={40} cy={40} r={33} hour={hour} />
  </svg>
);

/** 80 × 80: nagy római szám egy táblán (Csoportosító). */
export const RomanCard80: React.FC<{ value: string; color?: string }> = ({ value, color = '#7c3aed' }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="74" height="74" rx="12" fill="#ffffff" stroke={color} strokeWidth="4" />
    <text
      x="40"
      y={value.length > 3 ? 50 : 53}
      textAnchor="middle"
      fontSize={value.length > 5 ? 17 : value.length > 4 ? 20 : value.length > 3 ? 24 : value.length > 2 ? 28 : 36}
      fontWeight="bold"
      fill="#1e1b4b"
      fontFamily={ROMAN_FONT}
    >
      {value}
    </text>
  </svg>
);

/** 150 × 80: számegyenes, egy pont piros nyíllal (érték nincs kiírva). */
export const LinePointCard150: React.FC<{ value: number; from?: number; to?: number }> = ({ value, from = 0, to = 20 }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="3" y="3" width="144" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    <NumberLinePart x={14} y={48} w={114} from={from} to={to} labelEvery={to - from > 10 ? 5 : 1} />
    <path
      d={`M ${14 + ((value - from) * 114) / (to - from)} 40 l -6 -14 h 12 Z`}
      fill="#dc2626"
      stroke="#7f1d1d"
      strokeWidth="1.5"
    />
  </svg>
);

/** 150 × 80: tábla egy szóval + római számmal, pl. „IV. Béla”. */
export const LabelCard150: React.FC<{ roman: string; word: string }> = ({ roman, word }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="3" y="6" width="144" height="68" rx="10" fill="#fef3c7" stroke="#a16207" strokeWidth="3" />
    <text
      x="75"
      y="48"
      textAnchor="middle"
      fontSize={roman.length + word.length > 11 ? 16 : roman.length + word.length > 8 ? 19 : 22}
      fontWeight="bold"
      fill="#78350f"
    >
      <tspan fontFamily={ROMAN_FONT}>{roman}.</tspan> {word}
    </text>
  </svg>
);
