import React from 'react';
import { FONT, SERIF } from '../romai-szamok-a-mindennapokban/RomanEverydayG3Parts';
import { SIGN_COLOR, toRoman } from './RomanExamG3Utils';

// ---------------------------------------------------------------------------
// 4. Gyakorlás, tudáspróba – ábrák (3. osztály, II. A római számok)
// ---------------------------------------------------------------------------

/** Az öt római jel és értékük. */
export const RomanSignsSummarySvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const signs: [string, number][] = [
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100]
  ];
  return (
    <svg viewBox="0 0 360 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="128" rx="14" fill="#fffbeb" stroke="#fde68a" />
      {signs.map(([s, v], i) => (
        <g key={s}>
          <rect x={14 + i * 68} y={18} width={60} height={60} rx={10} fill="#fff" stroke={SIGN_COLOR[s]} strokeWidth="3" />
          <text x={44 + i * 68} y={60} textAnchor="middle" fontSize="32" fontWeight="bold" fill={SIGN_COLOR[s]} fontFamily={SERIF}>{s}</text>
          <text x={44 + i * 68} y={104} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{v}</text>
        </g>
      ))}
    </svg>
  );
};

/** Egy szám felépítése tízesekből és egyesekből: 47 = XL + VII = XLVII. */
export const RomanBuildSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="358" height="168" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="180" y="34" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">47 = 40 + 7</text>
    <rect x="58" y="52" width="104" height="50" rx="10" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
    <text x="110" y="85" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#ea580c" fontFamily={SERIF}>XL</text>
    <text x="110" y="120" textAnchor="middle" fontSize="12" fill="#9a3412">4 tízes = 50 – 10</text>
    <text x="180" y="86" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#334155">+</text>
    <rect x="198" y="52" width="104" height="50" rx="10" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
    <text x="250" y="85" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#16a34a" fontFamily={SERIF}>VII</text>
    <text x="250" y="120" textAnchor="middle" fontSize="12" fill="#166534">7 egyes = 5 + 2</text>
    <text x="180" y="156" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a" fontFamily={SERIF}>XLVII</text>
  </svg>
);

/** Kerek tízesek számegyenesen, római jelekkel. */
export const RomanTensLineSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const x0 = 24;
  const step = 31;
  return (
    <svg viewBox="0 0 360 124" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="122" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <line x1={x0} y1="50" x2={x0 + 10 * step} y2="50" stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: 11 }, (_, k) => (
        <g key={k}>
          <line x1={x0 + k * step} y1="42" x2={x0 + k * step} y2="58" stroke="#334155" strokeWidth="2" />
          <text x={x0 + k * step} y="34" textAnchor="middle" fontSize="11" fill="#475569">{k * 10}</text>
          {k > 0 && (
            <text x={x0 + k * step} y={k % 2 ? 76 : 94} textAnchor="middle" fontSize={12.5} fontWeight="bold" fill={k === 4 || k === 9 ? '#dc2626' : '#1e3a8a'} fontFamily={SERIF}>
              {toRoman(k * 10)}
            </text>
          )}
        </g>
      ))}
      <text x="180" y="114" textAnchor="middle" fontSize="11" fill="#dc2626">piros: elvesszük (XL = 50 – 10, XC = 100 – 10)</text>
    </svg>
  );
};

/** Gyakori hibák: hibás és helyes alak. */
export const RomanTrapsSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-lg h-auto mx-auto' }) => {
  const rows: [string, string, string][] = [
    ['4', 'IIII', 'IV'],
    ['40', 'XXXX', 'XL'],
    ['99', 'IC', 'XCIX'],
    ['10', 'VV', 'X']
  ];
  return (
    <svg viewBox="0 0 360 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="358" height="188" rx="14" fill="#fff1f2" stroke="#fecdd3" />
      <text x="70" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">szám</text>
      <text x="180" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#be123c">hibás</text>
      <text x="290" y="26" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#15803d">helyes</text>
      {rows.map(([n, w, c], i) => (
        <g key={n}>
          <text x="70" y={60 + i * 36} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{n}</text>
          <text x="180" y={60 + i * 36} textAnchor="middle" fontSize="19" fontWeight="bold" fill="#be123c" fontFamily={SERIF}>{w}</text>
          <line x1={180 - w.length * 8} y1={54 + i * 36} x2={180 + w.length * 8} y2={54 + i * 36} stroke="#be123c" strokeWidth="2.5" />
          <text x="290" y={60 + i * 36} textAnchor="middle" fontSize="19" fontWeight="bold" fill="#15803d" fontFamily={SERIF}>{c}</text>
        </g>
      ))}
    </svg>
  );
};

/** Összehasonlítás: XLIX < LI. */
export const RomanCompareSvg: React.FC<{ className?: string }> = ({ className = 'w-full max-w-md h-auto mx-auto' }) => (
  <svg viewBox="0 0 320 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="318" height="128" rx="14" fill="#f5f3ff" stroke="#ddd6fe" />
    <rect x="22" y="20" width="110" height="52" rx="10" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
    <text x="77" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#5b21b6" fontFamily={SERIF}>XLIX</text>
    <text x="77" y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">49</text>
    <circle cx="160" cy="46" r="20" fill="#7c3aed" />
    <text x="160" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#fff">&lt;</text>
    <rect x="188" y="20" width="110" height="52" rx="10" fill="#fff" stroke="#7c3aed" strokeWidth="2" />
    <text x="243" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#5b21b6" fontFamily={SERIF}>LI</text>
    <text x="243" y="100" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">51</text>
    <text x="160" y="120" textAnchor="middle" fontSize="11" fill="#475569">Hosszabb írás ≠ nagyobb szám! Mindig számold ki!</text>
  </svg>
);
