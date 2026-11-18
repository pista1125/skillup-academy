import React from 'react';
import { ClockPart, DigitalPart, TIME_FONT } from './TimeG2Parts';

/** Mutatós óra kártyára (150 × 80, vagy small: 80 × 80). */
export const ClockCard: React.FC<{ h: number; m?: number; small?: boolean }> = ({ h, m = 0, small }) =>
  small ? (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <ClockPart cx={40} cy={40} r={36} hour={h} minute={m} rim="#2563eb" />
    </svg>
  ) : (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <ClockPart cx={75} cy={40} r={36} hour={h} minute={m} rim="#2563eb" />
    </svg>
  );

/** Digitális óra kártyára. */
export const DigitalCard: React.FC<{ text: string; small?: boolean }> = ({ text, small }) =>
  small ? (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <DigitalPart x={3} y={20} w={74} h={40} text={text} />
    </svg>
  ) : (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <DigitalPart x={20} y={12} w={110} h={56} text={text} />
    </svg>
  );

/** Eltelt idő: sárga rész az óralapon (a nagymutató útja 12-től). */
export const SectorCard: React.FC<{ minutes: number; small?: boolean }> = ({ minutes, small }) => (
  <svg viewBox={small ? '0 0 80 80' : '0 0 150 80'} xmlns="http://www.w3.org/2000/svg">
    <ClockPart cx={small ? 40 : 75} cy={40} r={36} showHands={false} sector={{ from: 0, to: minutes }} rim="#7c3aed" />
  </svg>
);

/** Időtartam két digitális kijelzővel: tól → ig. */
export const SpanCard: React.FC<{ from: string; to: string; small?: boolean }> = ({ from, to, small }) =>
  small ? (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
      <DigitalPart x={6} y={2} w={68} h={34} text={from} />
      <path d="M40 38 L40 46" stroke="#334155" strokeWidth="3" />
      <polygon points="34,44 46,44 40,50" fill="#334155" />
      <DigitalPart x={6} y={44} w={68} h={34} text={to} color="#fbbf24" />
    </svg>
  ) : (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
      <DigitalPart x={2} y={18} w={64} h={44} text={from} />
      <path d="M68 40 L80 40" stroke="#334155" strokeWidth="3" />
      <polygon points="78,34 78,46 86,40" fill="#334155" />
      <DigitalPart x={86} y={18} w={62} h={44} text={to} color="#fbbf24" />
    </svg>
  );

/** Hány perc a következő egész óráig? */
export const UntilHourCard: React.FC<{ text: string }> = ({ text }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
    <DigitalPart x={2} y={18} w={70} h={44} text={text} />
    <path d="M74 40 L86 40" stroke="#334155" strokeWidth="3" />
    <polygon points="84,34 84,46 92,40" fill="#334155" />
    <rect x="94" y="22" width="52" height="36" rx="8" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
    <text x="120" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#16a34a">
      ?:00
    </text>
  </svg>
);

/** Naptárlap római számmal (a hónap sorszáma). */
export const MonthCard: React.FC<{ roman: string }> = ({ roman }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={TIME_FONT}>
    <rect x="10" y="8" width="60" height="66" rx="8" fill="#ffffff" stroke="#334155" strokeWidth="3" />
    <rect x="10" y="8" width="60" height="16" rx="6" fill="#ef4444" />
    <circle cx="26" cy="9" r="3.5" fill="#334155" />
    <circle cx="54" cy="9" r="3.5" fill="#334155" />
    <text x="40" y="60" textAnchor="middle" fontSize={roman.length > 3 ? 20 : 26} fontWeight="bold" fill="#0f172a">
      {roman}
    </text>
  </svg>
);

/** Napok hetes sorokban (7 kocka egy sor). split: az első ennyi kocka kék. */
export const WeeksCard: React.FC<{ days: number; split?: number }> = ({ days, split }) => {
  const cell = 9.5;
  const rows = Math.ceil(days / 7);
  const x0 = (80 - cell * 7) / 2;
  const y0 = (80 - cell * rows) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="76" height="76" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: days }, (_, i) => {
        const col = i % 7;
        const row = Math.floor(i / 7);
        const blue = split === undefined || i < split;
        return (
          <rect
            key={i}
            x={x0 + col * cell + 0.8}
            y={y0 + row * cell + 0.8}
            width={cell - 1.6}
            height={cell - 1.6}
            rx="1.5"
            fill={blue ? '#3b82f6' : '#f97316'}
            stroke={blue ? '#1e3a8a' : '#9a3412'}
            strokeWidth="1"
          />
        );
      })}
    </svg>
  );
};
