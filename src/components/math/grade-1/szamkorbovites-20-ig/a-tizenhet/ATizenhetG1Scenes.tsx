// „A tizenhét” – a gombaerdő képei. A közös képek (két tízes keret, tízesrúd, csoportok…) az „A tizenöt” leckéből jönnek.
import React from 'react';
import { ICONS } from '../../shared/G1Pics';
import { FONT, PURPLE, iconsG } from '../a-tizenot/ATizenotG1Scenes';

const RED_M = '#dc2626';
const BROWN_M = '#a16207';

const forest = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#dcfce7" />
    {[30, 120, 360, 450].map((x, i) => (
      <g key={i}>
        <rect x={x - 7} y="20" width="14" height="70" fill="#92400e" />
        <circle cx={x} cy="26" r="30" fill="#16a34a" stroke="#14532d" strokeWidth="3" />
      </g>
    ))}
    <path d={`M0 ${h - 70} Q${w / 2} ${h - 100} ${w} ${h - 70} V${h} H0 Z`} fill="#86efac" />
  </>
);

const M_POS: [number, number][] = [
  [70, 120], [150, 104], [230, 118], [310, 104], [390, 120], [40, 166], [110, 160], [180, 172], [250, 160], [320, 172],
  [390, 162], [450, 176], [70, 212], [150, 206], [230, 214], [310, 206], [390, 214], [446, 128],
];

/** Gombák az erdőben: `n` piros, utánuk `nb` barna (0–18). */
export const ForestScene: React.FC<{ n: number; nb?: number }> = ({ n, nb = 0 }) => (
  <svg viewBox="0 0 480 240">
    {forest(480, 240)}
    {M_POS.slice(0, n + nb).map(([x, y], i) => ICONS.gomba({ x, y, s: 0.95, color: i < n ? RED_M : BROWN_M, key: i }))}
  </svg>
);

/** Zümi számológépe: bemegy egy szám, a gép elvégzi a műveletet, kijön az eredmény. */
export const MachineScene: React.FC<{ input: number | string; op: string; output: number | string }> = ({ input, op, output }) => {
  const box = (x: number, v: number | string) => (
    <g>
      <rect x={x} y="78" width="84" height="74" rx="16" fill={v === '?' ? '#ede9fe' : '#fff'} stroke={v === '?' ? PURPLE : '#64748b'} strokeWidth="4" />
      <text x={x + 42} y="130" textAnchor="middle" fontSize="42" fontWeight="900" fill={v === '?' ? PURPLE : '#1e293b'} fontFamily={FONT}>{v}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 480 220">
      <rect x="0" y="0" width="480" height="220" rx="18" fill="#fef9c3" />
      {box(16, input)}
      <path d="M106 115 H150" stroke="#1e293b" strokeWidth="6" markerEnd="" />
      <path d="M142 103 L156 115 L142 127" fill="none" stroke="#1e293b" strokeWidth="6" strokeLinejoin="round" />
      <rect x="164" y="56" width="152" height="118" rx="20" fill="#38bdf8" stroke="#0c4a6e" strokeWidth="5" />
      <circle cx="196" cy="44" r="12" fill="#facc15" stroke="#0c4a6e" strokeWidth="4" />
      <circle cx="284" cy="44" r="12" fill="#f43f5e" stroke="#0c4a6e" strokeWidth="4" />
      <rect x="184" y="84" width="112" height="62" rx="12" fill="#fff" stroke="#0c4a6e" strokeWidth="3" />
      <text x="240" y="130" textAnchor="middle" fontSize="40" fontWeight="900" fill="#0c4a6e" fontFamily={FONT}>{op}</text>
      <path d="M324 115 H368" stroke="#1e293b" strokeWidth="6" />
      <path d="M360 103 L374 115 L360 127" fill="none" stroke="#1e293b" strokeWidth="6" strokeLinejoin="round" />
      {box(380, output)}
      {ICONS.meh({ x: 240, y: 198, s: 0.8 })}
    </svg>
  );
};

/** Három kosár gombával (vagy „?”-es fedett kosárral): a + b + c. */
export const ThreeBaskets: React.FC<{ counts: (number | '?')[]; total?: number | string }> = ({ counts, total }) => {
  const basket = (cx: number, n: number | '?', k: number) => (
    <g key={k}>
      {n === '?' ? (
        <text x={cx} y="92" textAnchor="middle" fontSize="44" fontWeight="900" fill={PURPLE} fontFamily={FONT}>?</text>
      ) : (
        iconsG('gomba', n, { x: cx - 52, y: 26, cell: 26, cols: 4 })
      )}
      <path d={`M${cx - 62} 104 H${cx + 62} L${cx + 48} 168 H${cx - 48} Z`} fill="#d97706" stroke="#78350f" strokeWidth="4" strokeLinejoin="round" />
      <path d={`M${cx - 54} 126 H${cx + 54} M${cx - 50} 148 H${cx + 50}`} stroke="#78350f" strokeWidth="3" />
    </g>
  );
  return (
    <svg viewBox="0 0 480 220">
      <rect x="0" y="0" width="480" height="220" rx="18" fill="#dcfce7" />
      {counts.map((n, k) => basket(90 + k * 150, n, k))}
      {[165, 315].map((x) => (
        <text key={x} x={x} y="150" textAnchor="middle" fontSize="40" fontWeight="900" fill="#1e293b" fontFamily={FONT}>+</text>
      ))}
      {total !== undefined && (
        <text x="240" y="208" textAnchor="middle" fontSize="34" fontWeight="900" fill={total === '?' ? PURPLE : '#1e293b'} fontFamily={FONT}>
          {`összesen: ${total}`}
        </text>
      )}
    </svg>
  );
};

/** Háromszög: a sarkokban 3 szám, középen a körben az összegük (vagy „?”). */
export const TriangleScene: React.FC<{ corners: [number, number, number]; center: number | string }> = ({ corners, center }) => (
  <svg viewBox="0 0 300 240" className="w-full max-w-[320px] h-auto mx-auto">
    <rect x="0" y="0" width="300" height="240" rx="18" fill="#fff7ed" />
    <path d="M150 20 L280 220 L20 220 Z" fill="#fff" stroke="#ea580c" strokeWidth="5" strokeLinejoin="round" />
    <text x="150" y="70" textAnchor="middle" fontSize="34" fontWeight="900" fill="#1e293b" fontFamily={FONT}>{corners[0]}</text>
    <text x="66" y="206" textAnchor="middle" fontSize="34" fontWeight="900" fill="#1e293b" fontFamily={FONT}>{corners[1]}</text>
    <text x="234" y="206" textAnchor="middle" fontSize="34" fontWeight="900" fill="#1e293b" fontFamily={FONT}>{corners[2]}</text>
    <circle cx="150" cy="148" r="34" fill={center === '?' ? '#ede9fe' : '#fff'} stroke={center === '?' ? PURPLE : '#ea580c'} strokeWidth="4" />
    <text x="150" y="162" textAnchor="middle" fontSize="36" fontWeight="900" fill={center === '?' ? PURPLE : '#1e293b'} fontFamily={FONT}>{center}</text>
  </svg>
);
