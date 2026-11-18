import React from 'react';
import {
  ROMAN_FONT,
  UI_FONT,
  StickRomanPart,
  stickRomanWidth,
  RomanClockPart,
  NumberLinePart,
  toRoman
} from '../romai-szamok-ertelmezese/RomanIntroG2Parts';

const FIG = 'w-full max-w-[480px] h-auto mx-auto';

/** Az első tízes és a második tízes egymás alatt: XI = X + I … XX = X + X. */
export const TenPlusPatternSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 170" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={ROMAN_FONT}>
    <rect x="1" y="1" width="478" height="168" rx="16" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
    {Array.from({ length: 10 }, (_, i) => {
      const n = i + 1;
      const x = 10 + i * 46.5;
      const fs = n === 8 ? 13 : n === 3 || n === 7 ? 15 : 17;
      const fs2 = n === 8 ? 11 : n === 3 || n === 7 || n === 4 || n === 9 || n === 6 ? 13 : 15;
      return (
        <g key={n}>
          <rect x={x} y="14" width="43" height="50" rx="8" fill="#ffffff" stroke="#a78bfa" strokeWidth="2" />
          <text x={x + 21.5} y="36" textAnchor="middle" fontSize="12" fill="#64748b" fontFamily={UI_FONT}>{n}</text>
          <text x={x + 21.5} y="56" textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#5b21b6">{toRoman(n)}</text>

          <rect x={x} y="82" width="43" height="56" rx="8" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" />
          <text x={x + 21.5} y="102" textAnchor="middle" fontSize="12" fill="#475569" fontFamily={UI_FONT}>{n + 10}</text>
          <text x={x + 21.5} y="126" textAnchor="middle" fontSize={fs2} fontWeight="bold">
            <tspan fill="#dc2626">X</tspan>
            <tspan fill="#5b21b6">{toRoman(n)}</tspan>
          </text>
        </g>
      );
    })}
    <text x="240" y="160" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily={UI_FONT}>
      Az alsó sorban elöl mindig ott a piros X (10), utána a felső sor száma.
    </text>
  </svg>
);

/** X + VII = XVII pálcikákkal. */
export const XPlusSticksSvg: React.FC<{ className?: string }> = ({ className }) => {
  const h = 60;
  const wx = stickRomanWidth('X', h);
  const wv = stickRomanWidth('VII', h);
  return (
    <svg viewBox="0 0 480 170" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
      <rect x="1" y="1" width="478" height="168" rx="16" fill="#fff7ed" stroke="#fed7aa" strokeWidth="2" />
      <rect x="20" y="18" width="100" height="96" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
      <StickRomanPart value="X" x={70 - wx / 2} y={36} h={h} color="#f87171" />
      <text x="146" y="78" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#334155">+</text>
      <rect x="172" y="18" width="150" height="96" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
      <StickRomanPart value="VII" x={247 - wv / 2} y={36} h={h} />
      <text x="348" y="78" textAnchor="middle" fontSize="36" fontWeight="bold" fill="#334155">=</text>
      <text x="420" y="82" textAnchor="middle" fontSize="34" fontWeight="bold" fontFamily={ROMAN_FONT}>
        <tspan fill="#dc2626">X</tspan>
        <tspan fill="#15803d">VII</tspan>
      </text>
      <text x="70" y="146" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#991b1b">10</text>
      <text x="247" y="146" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#166534">7</text>
      <text x="420" y="146" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">17</text>
    </svg>
  );
};

/** Számegyenes 0–20, néhány római kártyával. */
export const RomanLine20Svg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 130" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="128" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
    <NumberLinePart
      x={20}
      y={84}
      w={420}
      from={0}
      to={20}
      marks={[
        { value: 4, label: 'IV', color: '#2563eb' },
        { value: 9, label: 'IX', color: '#2563eb' },
        { value: 12, label: 'XII', color: '#7c3aed' },
        { value: 16, label: 'XVI', color: '#7c3aed' },
        { value: 20, label: 'XX', color: '#dc2626' }
      ]}
    />
    <text x="240" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      A 0 fölé nem írunk római számot: nincs római nulla.
    </text>
  </svg>
);

/** Összehasonlítás: XIV és XVI – mindkettő X-szel kezdődik, nézd a többit! */
export const CompareTwentySvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 170" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="168" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />
    <rect x="30" y="20" width="150" height="76" rx="12" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
    <text x="105" y="72" textAnchor="middle" fontSize="40" fontWeight="bold" fontFamily={ROMAN_FONT}>
      <tspan fill="#dc2626">X</tspan>
      <tspan fill="#1e3a8a">IV</tspan>
    </text>
    <circle cx="240" cy="58" r="24" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
    <text x="240" y="70" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#92400e">&lt;</text>
    <rect x="300" y="20" width="150" height="76" rx="12" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
    <text x="375" y="72" textAnchor="middle" fontSize="40" fontWeight="bold" fontFamily={ROMAN_FONT}>
      <tspan fill="#dc2626">X</tspan>
      <tspan fill="#1e3a8a">VI</tspan>
    </text>
    <text x="105" y="124" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#14532d">10 + 4 = 14</text>
    <text x="375" y="124" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#14532d">10 + 6 = 16</text>
    <text x="240" y="156" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      Mindkettőben ott az X. Elég a többit nézni: IV &lt; VI.
    </text>
  </svg>
);

/** Római óra 11-kor és 12-kor. */
export const ClockElevenTwelveSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 210" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="208" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <RomanClockPart cx={120} cy={96} r={72} hour={11} />
    <RomanClockPart cx={360} cy={96} r={72} hour={12} frame="#7c3aed" />
    <text x="120" y="198" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">XI: 11 óra</text>
    <text x="360" y="198" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#6d28d9">XII: 12 óra</text>
  </svg>
);
