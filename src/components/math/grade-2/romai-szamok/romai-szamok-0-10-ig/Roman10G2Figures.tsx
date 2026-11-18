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

const groupColor = (n: number) =>
  n === 4 || n === 9 ? { fill: '#fee2e2', stroke: '#dc2626' } : n <= 3 ? { fill: '#dbeafe', stroke: '#2563eb' } : n <= 8 ? { fill: '#dcfce7', stroke: '#16a34a' } : { fill: '#fef3c7', stroke: '#d97706' };

/** 1-től 10-ig: arab és római szám egymás alatt, színes csoportokkal. */
export const Roman1To10TableSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 150" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="148" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    {Array.from({ length: 10 }, (_, i) => {
      const n = i + 1;
      const c = groupColor(n);
      const x = 12 + i * 46.5;
      return (
        <g key={n}>
          <rect x={x} y="16" width="42" height="96" rx="8" fill={c.fill} stroke={c.stroke} strokeWidth="2.5" />
          <text x={x + 21} y="50" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">{n}</text>
          <line x1={x + 6} y1="62" x2={x + 36} y2="62" stroke={c.stroke} strokeWidth="1.5" />
          <text
            x={x + 21}
            y="94"
            textAnchor="middle"
            fontSize={n === 8 ? 15 : n === 3 || n === 7 ? 18 : 22}
            fontWeight="bold"
            fill={c.stroke}
            fontFamily={ROMAN_FONT}
          >
            {toRoman(n)}
          </text>
        </g>
      );
    })}
    <text x="240" y="138" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
      kék: I-ek • zöld: V és utána I-ek • piros: egy hiányzik (IV, IX)
    </text>
  </svg>
);

/** A V-család: V, VI, VII, VIII = 5 + 0, 1, 2, 3 (kéz + ujjak). */
export const FiveFamilySvg: React.FC<{ className?: string }> = ({ className }) => {
  const items = ['V', 'VI', 'VII', 'VIII'];
  return (
    <svg viewBox="0 0 480 190" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
      <rect x="1" y="1" width="478" height="188" rx="16" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="2" />
      {items.map((s, i) => {
        const x = 14 + i * 116;
        const w = stickRomanWidth(s, 52);
        const extra = i;
        return (
          <g key={s}>
            <rect x={x} y="14" width="104" height="160" rx="12" fill="#ffffff" stroke="#16a34a" strokeWidth="3" />
            <StickRomanPart value={s} x={x + 52 - w / 2} y={26} h={52} />
            {/* 5 zöld korong + extra kék */}
            {Array.from({ length: 5 }, (_, k) => (
              <circle key={k} cx={x + 16 + k * 18} cy="98" r="7" fill="#22c55e" stroke="#166534" strokeWidth="1.5" />
            ))}
            {Array.from({ length: extra }, (_, k) => (
              <circle key={`e${k}`} cx={x + 16 + k * 18} cy="118" r="7" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
            ))}
            <text x={x + 52} y="160" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#14532d">
              {extra === 0 ? '5' : `5 + ${extra} = ${5 + extra}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Egy hiányzik: IV = 5 − 1 és IX = 10 − 1 korongokkal. */
export const OneMissingSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 180" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="178" rx="16" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />
    {/* IV */}
    <rect x="14" y="14" width="170" height="150" rx="12" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
    <text x="99" y="56" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#991b1b" fontFamily={ROMAN_FONT}>IV</text>
    {Array.from({ length: 5 }, (_, k) => (
      <circle
        key={k}
        cx={39 + k * 30}
        cy="92"
        r="11"
        fill={k === 4 ? '#ffffff' : '#ef4444'}
        stroke={k === 4 ? '#dc2626' : '#991b1b'}
        strokeWidth="2"
        strokeDasharray={k === 4 ? '4 3' : undefined}
      />
    ))}
    <text x="99" y="146" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#991b1b">5 − 1 = 4</text>

    {/* IX */}
    <rect x="198" y="14" width="268" height="150" rx="12" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
    <text x="332" y="56" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#991b1b" fontFamily={ROMAN_FONT}>IX</text>
    {Array.from({ length: 10 }, (_, k) => (
      <circle
        key={k}
        cx={280 + (k % 5) * 26}
        cy={k < 5 ? 80 : 108}
        r="10"
        fill={k === 9 ? '#ffffff' : '#ef4444'}
        stroke={k === 9 ? '#dc2626' : '#991b1b'}
        strokeWidth="2"
        strokeDasharray={k === 9 ? '4 3' : undefined}
      />
    ))}
    <text x="332" y="146" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#991b1b">10 − 1 = 9</text>
  </svg>
);

/** Számegyenes 1–10 római címkékkel (a 0 felett nincs jel). */
export const RomanLine10Svg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 120" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="118" rx="16" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
    <NumberLinePart x={30} y={70} w={400} from={0} to={10} />
    {Array.from({ length: 10 }, (_, i) => (
      <text key={i} x={30 + (i + 1) * 40} y="46" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8" fontFamily={ROMAN_FONT}>
        {toRoman(i + 1)}
      </text>
    ))}
    <text x="240" y="112" textAnchor="middle" fontSize="12" fill="#334155">
      Jobbra haladva egyre nagyobb a szám: VI &lt; VII &lt; VIII
    </text>
  </svg>
);

/** Római óra 7 órakor, kismutató és nagymutató magyarázattal. */
export const RomanClockSevenSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 220" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="218" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    <RomanClockPart cx={120} cy={110} r={86} hour={7} />
    <rect x="240" y="40" width="222" height="44" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
    <text x="351" y="68" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#991b1b">
      piros kismutató: a VII-re mutat
    </text>
    <rect x="240" y="96" width="222" height="44" rx="10" fill="#e2e8f0" stroke="#0f172a" strokeWidth="2" />
    <text x="351" y="124" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
      nagymutató: a XII-n áll
    </text>
    <text x="351" y="180" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#1d4ed8">
      7 óra van
    </text>
  </svg>
);
