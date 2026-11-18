import React from 'react';
import { ROMAN_FONT, UI_FONT, StickRomanPart, stickRomanWidth, toRoman } from '../romai-szamok-ertelmezese/RomanIntroG2Parts';

const FIG = 'w-full max-w-[480px] h-auto mx-auto';

/** Összefoglaló: három jel + két szabály. */
export const RomanRecapRulesSvg: React.FC<{ className?: string }> = ({ className }) => {
  const signs = [
    { s: 'I', v: '1', c: '#2563eb' },
    { s: 'V', v: '5', c: '#16a34a' },
    { s: 'X', v: '10', c: '#dc2626' }
  ];
  return (
    <svg viewBox="0 0 480 200" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
      <rect x="1" y="1" width="478" height="198" rx="16" fill="#fffbeb" stroke="#fde68a" strokeWidth="2" />
      {signs.map((g, i) => {
        const x = 16 + i * 74;
        const w = stickRomanWidth(g.s, 46);
        return (
          <g key={g.s}>
            <rect x={x} y="16" width="66" height="112" rx="10" fill="#ffffff" stroke={g.c} strokeWidth="3" />
            <StickRomanPart value={g.s} x={x + 33 - w / 2} y={26} h={46} />
            <text x={x + 33} y="100" textAnchor="middle" fontSize="22" fontWeight="bold" fill={g.c} fontFamily={ROMAN_FONT}>
              {g.s}
            </text>
            <text x={x + 33} y="120" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">
              = {g.v}
            </text>
          </g>
        );
      })}
      <rect x="244" y="16" width="220" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
      <text x="354" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#065f46">Legfeljebb 3 egyforma jel</text>
      <text x="354" y="58" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#065f46" fontFamily={ROMAN_FONT}>III ✓   IIII ✗</text>
      <rect x="244" y="76" width="220" height="52" rx="10" fill="#faf5ff" stroke="#7c3aed" strokeWidth="2.5" />
      <text x="354" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#5b21b6">Jobbra hozzáad, balra elvesz</text>
      <text x="354" y="118" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#5b21b6">
        <tspan fontFamily={ROMAN_FONT}>VI</tspan> = 6 • <tspan fontFamily={ROMAN_FONT}>IV</tspan> = 4
      </text>
      <rect x="16" y="140" width="448" height="46" rx="10" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
      <text x="240" y="169" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#991b1b">
        Nincs római nulla! Mi 1-től 20-ig írunk római számot.
      </text>
    </svg>
  );
};

/** A teljes tábla 1–20. */
export const RomanFullTableSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 160" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={ROMAN_FONT}>
    <rect x="1" y="1" width="478" height="158" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
    {Array.from({ length: 20 }, (_, i) => {
      const n = i + 1;
      const row = Math.floor(i / 10);
      const col = i % 10;
      const x = 10 + col * 46.5;
      const y = 12 + row * 72;
      const r = toRoman(n);
      return (
        <g key={n}>
          <rect x={x} y={y} width="43" height="64" rx="8" fill={row === 0 ? '#e0f2fe' : '#ede9fe'} stroke={row === 0 ? '#0284c7' : '#7c3aed'} strokeWidth="2" />
          <text x={x + 21.5} y={y + 24} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155" fontFamily={UI_FONT}>
            {n}
          </text>
          <text x={x + 21.5} y={y + 50} textAnchor="middle" fontSize={r.length >= 5 ? 10.5 : r.length === 4 ? 12.5 : r.length === 3 ? 15 : 18} fontWeight="bold" fill={row === 0 ? '#075985' : '#5b21b6'}>
            {r}
          </text>
        </g>
      );
    })}
  </svg>
);

/** Olvasás lépésről lépésre: XIV → X | IV → 10 + 4 = 14. */
export const RomanReadStepsSvg: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 480 170" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
    <rect x="1" y="1" width="478" height="168" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="2" />
    <text x="70" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">1. Nézd meg</text>
    <rect x="16" y="40" width="108" height="64" rx="12" fill="#ffffff" stroke="#0284c7" strokeWidth="3" />
    <text x="70" y="84" textAnchor="middle" fontSize="34" fontWeight="bold" fill="#0f172a" fontFamily={ROMAN_FONT}>XIV</text>
    <text x="146" y="80" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#64748b">→</text>
    <text x="250" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">2. Bontsd részekre</text>
    <rect x="172" y="40" width="64" height="64" rx="12" fill="#fee2e2" stroke="#dc2626" strokeWidth="3" />
    <text x="204" y="84" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#b91c1c" fontFamily={ROMAN_FONT}>X</text>
    <rect x="246" y="40" width="84" height="64" rx="12" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <text x="288" y="84" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#1d4ed8" fontFamily={ROMAN_FONT}>IV</text>
    <text x="352" y="80" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#64748b">→</text>
    <text x="420" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0369a1">3. Add össze</text>
    <rect x="372" y="40" width="96" height="64" rx="12" fill="#dcfce7" stroke="#16a34a" strokeWidth="3" />
    <text x="420" y="84" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#15803d">14</text>
    <text x="204" y="128" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#b91c1c">10</text>
    <text x="288" y="128" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">5 − 1 = 4</text>
    <text x="240" y="156" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">10 + 4 = 14</text>
  </svg>
);

/** Tipikus hibák és javításuk. */
export const RomanMistakesSvg: React.FC<{ className?: string }> = ({ className }) => {
  const rows = [
    { bad: 'IIII', good: 'IV', n: '4' },
    { bad: 'VV', good: 'X', n: '10' },
    { bad: 'IIX', good: 'VIII', n: '8' },
    { bad: 'XIIII', good: 'XIV', n: '14' }
  ];
  return (
    <svg viewBox="0 0 480 200" className={className ?? FIG} xmlns="http://www.w3.org/2000/svg" fontFamily={UI_FONT}>
      <rect x="1" y="1" width="478" height="198" rx="16" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" />
      {rows.map((r, i) => {
        const y = 14 + i * 46;
        return (
          <g key={r.bad}>
            <rect x="20" y={y} width="150" height="38" rx="9" fill="#ffffff" stroke="#dc2626" strokeWidth="2.5" />
            <text x="95" y={y + 27} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#b91c1c" fontFamily={ROMAN_FONT}>{r.bad}</text>
            <line x1="40" y1={y + 19} x2="150" y2={y + 19} stroke="#dc2626" strokeWidth="2.5" />
            <text x="200" y={y + 27} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#64748b">→</text>
            <rect x="230" y={y} width="150" height="38" rx="9" fill="#ffffff" stroke="#16a34a" strokeWidth="2.5" />
            <text x="305" y={y + 27} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#15803d" fontFamily={ROMAN_FONT}>{r.good}</text>
            <text x="430" y={y + 27} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">= {r.n}</text>
          </g>
        );
      })}
    </svg>
  );
};
