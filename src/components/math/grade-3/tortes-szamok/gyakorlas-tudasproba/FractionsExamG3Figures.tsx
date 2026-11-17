import React from 'react';
import { FONT, Pie, Bar, Rod, ROD } from './FractionsExamG3Parts';
import { ObjRows, Strip } from '../osszehasonlitas/FractionAmountsG3Parts';

// Nagy ábrák a 4. lecke (Gyakorlás, tudáspróba) tananyagához.

const C = 'w-full max-w-[460px] h-auto mx-auto';

/** Ugyanaz a kör 2, 3, 4, 8 részre: a részek neve. */
export const PieNamesSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 400 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="148" rx="12" fill="#fff7ed" stroke="#fdba74" />
    {[
      { n: 2, t: '1 ketted' },
      { n: 3, t: '1 harmad' },
      { n: 4, t: '1 negyed' },
      { n: 8, t: '1 nyolcad' }
    ].map((p, i) => (
      <g key={p.n}>
        <Pie cx={55 + i * 97} cy={66} r={38} n={p.n} k={1} />
        <text x={55 + i * 97} y={128} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{p.t}</text>
      </g>
    ))}
  </svg>
);

/** Egy egész csíkokban: 2 ketted, 3 harmad, 4 negyed, 8 nyolcad. */
export const WholeStripsSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 400 200" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="198" rx="12" fill="#f0f9ff" stroke="#7dd3fc" />
    {[
      { n: 1, t: '1 egész' },
      { n: 2, t: '2 ketted' },
      { n: 3, t: '3 harmad' },
      { n: 4, t: '4 negyed' },
      { n: 8, t: '8 nyolcad' }
    ].map((r, i) => (
      <g key={r.n}>
        <Bar x={20} y={16 + i * 36} w={260} h={28} n={r.n} k={1} color={['#fbbf24', '#f87171', '#4ade80', '#60a5fa', '#c084fc'][i]} sw={2} />
        <text x={292} y={36 + i * 36} fontSize="15" fontWeight="bold" fill="#0f172a">{r.t}</text>
      </g>
    ))}
  </svg>
);

/** Színes rudak: a narancssárga rúd az 1 egész. */
export const RodsSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 400 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="168" rx="12" fill="#fefce8" stroke="#fde047" />
    <Rod x={20} y={16} len={10} u={24} h={26} />
    <text x={140} y={58} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#9a3412">{ROD[10].name} = 1 egész</text>
    {[5, 5].map((l, i) => (
      <Rod key={`s${i}`} x={20 + i * 120} y={68} len={l} u={24} h={22} />
    ))}
    <text x={272} y={84} fontSize="13" fontWeight="bold" fill="#0f172a">sárga: 1 ketted</text>
    {[0, 1, 2, 3, 4].map((i) => (
      <Rod key={`r${i}`} x={20 + i * 48} y={98} len={2} u={24} h={22} />
    ))}
    <text x={272} y={114} fontSize="13" fontWeight="bold" fill="#0f172a">rózsaszín: 1 ötöd</text>
    {Array.from({ length: 10 }, (_, i) => (
      <Rod key={`f${i}`} x={20 + i * 24} y={128} len={1} u={24} h={22} />
    ))}
    <text x={272} y={144} fontSize="13" fontWeight="bold" fill="#0f172a">fehér: 1 tized</text>
  </svg>
);

/** Törtrész mennyiségekből: 15 alma harmada, és az 1 kg negyede. */
export const AmountsSvg: React.FC<{ className?: string }> = ({ className = C }) => (
  <svg viewBox="0 0 400 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="398" height="158" rx="12" fill="#f0fdf4" stroke="#86efac" />
    <text x="95" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#166534">a 15 harmada</text>
    <ObjRows x={44} y={52} n={15} k={3} gap={24} rowGap={30} r={9} hl={1} />
    <text x="95" y="146" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#c2410c">15 : 3 = 5</text>
    <Strip x={210} y={70} w={170} h={34} n={4} fill={[0]} labels={['25', null, null, null]} top="1 kg = 100 dkg" color="#fbbf24" />
    <text x="295" y="146" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#c2410c">100 : 4 = 25 dkg</text>
  </svg>
);
