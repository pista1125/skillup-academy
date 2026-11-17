import React from 'react';
import { FONT, Cube } from './Count500ExamG3Parts';
import { Coin, Flat, Rod, Note500, PriceTag, JumpLine } from '../osszeadas-es-kivonas/AddSub500G3Parts';

type Fig = React.FC<{ className?: string }>;
const DEF = 'w-full h-auto max-w-xl mx-auto';

/** 247 számképpel és helyiérték-táblázattal. */
export const Count500BlocksSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
    <Flat x={16} y={18} s={44} />
    <Flat x={64} y={18} s={44} />
    {[0, 1, 2, 3].map((i) => (
      <Rod key={i} x={118 + i * 10} y={18} w={7} h={44} />
    ))}
    {Array.from({ length: 7 }).map((_, i) => (
      <Cube key={i} x={166 + Math.floor(i / 4) * 10} y={18 + (i % 4) * 11} s={8} />
    ))}
    {['Sz', 'T', 'E'].map((h, i) => (
      <g key={h}>
        <rect x={212 + i * 44} y={16} width="44" height="22" fill={['#fee2e2', '#dbeafe', '#fef9c3'][i]} stroke="#475569" />
        <text x={234 + i * 44} y={32} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{h}</text>
        <rect x={212 + i * 44} y={38} width="44" height="28" fill="#fff" stroke="#475569" />
        <text x={234 + i * 44} y={59} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{[2, 4, 7][i]}</text>
      </g>
    ))}
    <text x="180" y="96" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">247 = 200 + 40 + 7</text>
    <text x="180" y="122" textAnchor="middle" fontSize="13" fill="#475569">kétszáznegyvenhét: 2 százas, 4 tízes, 7 egyes</text>
  </svg>
);

/** Számegyenes 0-tól 500-ig, négy jelölt számmal. */
export const Count500NumberLineSvg: Fig = ({ className = DEF }) => {
  const X = (v: number) => 24 + (312 * v) / 500;
  const marks = [
    { v: 120, c: '#2563eb' },
    { v: 250, c: '#16a34a' },
    { v: 380, c: '#ea580c' },
    { v: 475, c: '#9333ea' }
  ];
  return (
    <svg viewBox="0 0 360 110" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="108" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1="16" y1="64" x2="344" y2="64" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 51 }).map((_, i) => (
        <line key={i} x1={X(i * 10)} y1={i % 10 === 0 ? 54 : i % 5 === 0 ? 58 : 60} x2={X(i * 10)} y2={i % 10 === 0 ? 74 : i % 5 === 0 ? 70 : 68} stroke="#334155" strokeWidth={i % 10 === 0 ? 2 : 1} />
      ))}
      {[0, 100, 200, 300, 400, 500].map((v) => (
        <text key={v} x={X(v)} y="92" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6d28d9">{v}</text>
      ))}
      {marks.map((m) => (
        <g key={m.v}>
          <circle cx={X(m.v)} cy="64" r="5" fill={m.c} />
          <text x={X(m.v)} y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill={m.c}>{m.v}</text>
          <line x1={X(m.v)} y1="44" x2={X(m.v)} y2="58" stroke={m.c} strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
};

/** 374 kétféle kerekítése. */
export const Count500RoundingSvg: Fig = ({ className = DEF }) => {
  const row = (y: number, lo: number, hi: number, label: string, res: number, color: string) => {
    const X = (v: number) => 30 + (220 * (v - lo)) / (hi - lo);
    return (
      <g>
        <line x1="30" y1={y} x2="250" y2={y} stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={30 + i * 22} y1={i % 5 === 0 ? y - 7 : y - 4} x2={30 + i * 22} y2={i % 5 === 0 ? y + 7 : y + 4} stroke="#334155" strokeWidth={i % 5 === 0 ? 1.8 : 1} />
        ))}
        <text x="30" y={y + 20} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">{lo}</text>
        <text x="250" y={y + 20} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">{hi}</text>
        <circle cx={X(374)} cy={y} r="4.5" fill="#2563eb" />
        <text x={X(374)} y={y - 11} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#1d4ed8">374</text>
        <path d={`M ${X(374)} ${y + 4} Q ${(X(374) + X(res)) / 2} ${y + 22} ${X(res)} ${y + 6}`} fill="none" stroke={color} strokeWidth="2" />
        <text x="300" y={y - 2} textAnchor="middle" fontSize="12" fill="#475569">{label}</text>
        <text x="300" y={y + 16} textAnchor="middle" fontSize="15" fontWeight="bold" fill={color}>≈ {res}</text>
      </g>
    );
  };
  return (
    <svg viewBox="0 0 360 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="138" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      {row(38, 370, 380, 'tízesre (4 egyes)', 370, '#16a34a')}
      {row(100, 300, 400, 'százasra (7 tízes)', 400, '#ea580c')}
    </svg>
  );
};

/** 270 + 160 bontással: +100, aztán +60. */
export const Count500AddSubSvg: Fig = ({ className = DEF }) => (
  <JumpLine lo={250} hi={450} start={270} jumps={[{ to: 370, label: '+100' }, { to: 430, label: '+60' }]} H={130} className={className} />
);

/** Egy műveletcsalád a szorzótáblából: 7 · 6 = 42 → 7 · 60 = 420 → 420 : 7, 420 : 60. */
export const Count500MulDivSvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#eef2ff" stroke="#c7d2fe" />
    <rect x="20" y="16" width="100" height="34" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
    <text x="70" y="39" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">7 · 6 = 42</text>
    <path d="M 124 33 L 150 33" stroke="#64748b" strokeWidth="2" />
    <path d="M 145 28 L 152 33 L 145 38" fill="none" stroke="#64748b" strokeWidth="2" />
    <rect x="156" y="16" width="112" height="34" rx="8" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
    <text x="212" y="39" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">7 · 60 = 420</text>
    <rect x="40" y="70" width="120" height="30" rx="8" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
    <text x="100" y="91" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#5b21b6">420 : 7 = 60</text>
    <rect x="200" y="70" width="120" height="30" rx="8" fill="#fff" stroke="#7c3aed" strokeWidth="1.5" />
    <text x="260" y="91" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#5b21b6">420 : 60 = 7</text>
    <text x="180" y="120" textAnchor="middle" fontSize="12.5" fill="#475569">Egy szorzásból két osztás is jön.</text>
  </svg>
);

/** Vásárlás 500 Ft-ból: 360 Ft-os ár, 140 Ft visszajár. */
export const Count500MoneySvg: Fig = ({ className = DEF }) => (
  <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="128" rx="14" fill="#fffbeb" stroke="#fcd34d" />
    <Note500 x={16} y={20} w={84} h={42} />
    <text x="58" y="80" textAnchor="middle" fontSize="12" fill="#475569">ezzel fizetsz</text>
    <PriceTag x={122} y={26} w={86} text="360 Ft" fs={16} />
    <text x="160" y="80" textAnchor="middle" fontSize="12" fill="#475569">a társasjáték ára</text>
    <Coin cx={250} cy={42} v={100} r={20} />
    <Coin cx={292} cy={42} v={20} r={16} />
    <Coin cx={328} cy={42} v={20} r={16} />
    <text x="290" y="80" textAnchor="middle" fontSize="12" fill="#475569">visszajár</text>
    <text x="180" y="112" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">500 − 360 = 140 Ft (360-tól 400-ig 40, onnan 100)</text>
  </svg>
);
