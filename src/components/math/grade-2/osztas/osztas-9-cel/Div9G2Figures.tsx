import React from 'react';
import { DIV9_FONT, NineBoxPart, NineRowsPart, PlatePart, BOX_COLORS } from './Div9G2Parts';

type FigProps = { className?: string };
const CLS = 'w-full max-w-[480px] h-auto mx-auto';

/** 1. 36 muffin tálcákon, egy tálcára 9 fér: 36 : 9 = 4 */
export const TraysGroupingSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 190" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
    <rect x="2" y="2" width="476" height="186" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <rect x={34 + i * 108} y="26" width="88" height="88" rx="12" fill="#fde68a" stroke="#b45309" strokeWidth="3" />
        <NineBoxPart x={44 + i * 108} y={36} size={68} color={BOX_COLORS[i]} />
        <text x={78 + i * 108} y="140" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">
          {i + 1}. tálca
        </text>
      </g>
    ))}
    <text x="240" y="174" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#9a3412">
      36 muffin, tálcánként 9: 36 : 9 = 4
    </text>
  </svg>
);

/** 2. 18 eper 9 tányérra: 18 : 9 = 2 */
export const SharingNineSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
    <rect x="2" y="2" width="476" height="156" rx="16" fill="#fef2f2" stroke="#fca5a5" strokeWidth="2" />
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <PlatePart cx={44 + i * 49} cy={66} count={2} w={44} />
        <text x={44 + i * 49} y="108" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
          {i + 1}.
        </text>
      </g>
    ))}
    <text x="240" y="142" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#991b1b">
      18 eper 9 tányéron: 18 : 9 = 2
    </text>
  </svg>
);

/** 3. Trükk: a tízesek száma + 1 (54 : 9 = 6) */
export const TensPlusOneSvg: React.FC<FigProps> = ({ className = CLS }) => {
  const rows = [
    ['18', '1', '2'],
    ['36', '3', '4'],
    ['54', '5', '6'],
    ['72', '7', '8']
  ];
  return (
    <svg viewBox="0 0 480 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
      <rect x="2" y="2" width="476" height="226" rx="16" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="2" />
      {rows.map(([num, tens, q], i) => {
        const y = 22 + i * 50;
        return (
          <g key={num}>
            <rect x="40" y={y} width="34" height="40" rx="6" fill="#fde68a" stroke="#b45309" strokeWidth="2.5" />
            <text x="57" y={y + 29} textAnchor="middle" fontSize="24" fontWeight="bold" fill="#92400e">
              {num[0]}
            </text>
            <rect x="76" y={y} width="34" height="40" rx="6" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
            <text x="93" y={y + 29} textAnchor="middle" fontSize="24" fontWeight="bold" fill="#475569">
              {num[1]}
            </text>
            <text x="126" y={y + 29} fontSize="22" fontWeight="bold" fill="#334155">
              : 9
            </text>
            <text x="190" y={y + 29} fontSize="20" fill="#0369a1">
              →
            </text>
            <text x="222" y={y + 29} fontSize="22" fontWeight="bold" fill="#92400e">
              {tens} + 1 = {q}
            </text>
            <text x="350" y={y + 29} fontSize="20" fontWeight="bold" fill="#0f766e">
              {q} · 9 = {num}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** 4. Egy kép, két osztás: 4 sor × 9 korong — 36 : 9 = 4 és 36 : 4 = 9 */
export const NumberFamilySvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
    <rect x="2" y="2" width="476" height="176" rx="16" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="2" />
    <NineRowsPart x={40} y={44} n={36} gap={24} r={8.5} groups={4} color="#8b5cf6" />
    <text x="140" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#5b21b6">
      4 sor, soronként 9
    </text>
    <text x="140" y="160" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#5b21b6">
      9 oszlop, oszloponként 4
    </text>
    <text x="370" y="64" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#4c1d95">
      4 · 9 = 36
    </text>
    <text x="370" y="96" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#c2410c">
      36 : 9 = 4
    </text>
    <text x="370" y="128" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0369a1">
      36 : 4 = 9
    </text>
  </svg>
);

/** 5. Maradékos osztás: 48 korong, 5 kilences csoport, maradt 3 */
export const RemainderRowsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 230" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
    <rect x="2" y="2" width="476" height="226" rx="16" fill="#fff7ed" stroke="#fdba74" strokeWidth="2" />
    <NineRowsPart x={36} y={30} n={48} gap={26} r={9} groups={5} />
    <text x="390" y="56" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#334155">
      48 korong
    </text>
    <text x="390" y="96" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#c2410c">
      Ennyi csoport: 5
    </text>
    <text x="390" y="130" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0369a1">
      Ennyi maradt: 3
    </text>
    <text x="240" y="208" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#7c2d12">
      Ellenőrzés: 5 · 9 + 3 = 48
    </text>
  </svg>
);

/** Egyszerű csónak `kids` gyerekfejjel (max 9). */
const Boat: React.FC<{ x: number; y: number; kids: number }> = ({ x, y, kids }) => (
  <g>
    {Array.from({ length: kids }, (_, i) => (
      <circle key={i} cx={x + 14 + (i % 5) * 16} cy={y - 8 - Math.floor(i / 5) * 14} r="6.5" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
    ))}
    <path d={`M ${x} ${y} L ${x + 92} ${y} L ${x + 80} ${y + 22} L ${x + 12} ${y + 22} Z`} fill="#0ea5e9" stroke="#0c4a6e" strokeWidth="2.5" />
  </g>
);

/** 6. Hány csónak kell? 30 gyerek, egy csónakba 9 ül: 3 tele + 1 a maradék 3 gyereknek = 4 csónak */
export const RoundUpBoatsSvg: React.FC<FigProps> = ({ className = CLS }) => (
  <svg viewBox="0 0 480 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV9_FONT}>
    <rect x="2" y="2" width="476" height="166" rx="16" fill="#ecfeff" stroke="#67e8f9" strokeWidth="2" />
    <rect x="2" y="110" width="476" height="58" rx="0" fill="#bae6fd" opacity="0.6" />
    {[9, 9, 9, 3].map((k, i) => (
      <g key={i}>
        <Boat x={20 + i * 116} y={96} kids={k} />
        <text x={66 + i * 116} y="140" textAnchor="middle" fontSize="15" fontWeight="bold" fill={i === 3 ? '#dc2626' : '#0c4a6e'}>
          {k} gyerek
        </text>
      </g>
    ))}
    <text x="240" y="160" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0c4a6e">
      3 csónak tele, maradt 3 gyerek. 4 csónak kell!
    </text>
  </svg>
);
