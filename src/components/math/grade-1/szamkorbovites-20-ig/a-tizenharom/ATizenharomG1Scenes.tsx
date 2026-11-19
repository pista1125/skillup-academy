// „A tizenhárom” – saját képek: békák a tóparton, tavirózsák. A közös képek az `a-tizenegy` leckéből jönnek.
import React from 'react';
import { ICONS } from '../../shared/G1Pics';

/** Egy kis béka (kb. 44×36), (x, y) középponttal. */
export const frogG = (x: number, y: number, s = 1, key?: React.Key, color = '#4ade80') => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    <ellipse cx="-14" cy="12" rx="9" ry="5" fill={color} stroke="#14532d" strokeWidth="2.5" />
    <ellipse cx="14" cy="12" rx="9" ry="5" fill={color} stroke="#14532d" strokeWidth="2.5" />
    <ellipse cx="0" cy="2" rx="18" ry="13" fill={color} stroke="#14532d" strokeWidth="3" />
    <circle cx="-8" cy="-11" r="6.5" fill="#fff" stroke="#14532d" strokeWidth="2.5" />
    <circle cx="8" cy="-11" r="6.5" fill="#fff" stroke="#14532d" strokeWidth="2.5" />
    <circle cx="-7" cy="-11" r="2.6" fill="#111827" />
    <circle cx="9" cy="-11" r="2.6" fill="#111827" />
    <path d="M-8 4 Q0 10 8 4" stroke="#14532d" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  </g>
);

const lily = (x: number, y: number, key: React.Key) => (
  <g key={key}>
    <path d={`M${x} ${y} m-26 0 a26 15 0 1 0 52 0 a26 15 0 1 0 -52 0 Z`} fill="#16a34a" stroke="#14532d" strokeWidth="2.5" />
    <path d={`M${x} ${y} L${x + 24} ${y - 6}`} stroke="#14532d" strokeWidth="2.5" />
  </g>
);

const SPOTS: [number, number][] = [
  [70, 70], [150, 50], [235, 62], [320, 48], [405, 72], [100, 130], [190, 118], [280, 132], [370, 120], [440, 150],
  [60, 195], [150, 190], [240, 200], [330, 192], [415, 205], [30, 120],
];

/** Tó békákkal (`n` béka, szétszórva), a tavon tavirózsa-levelek. `jumped` béka a vízbe ugrott (áthúzva). */
export const FrogPondScene: React.FC<{ n: number; jumped?: number }> = ({ n, jumped = 0 }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#bbf7d0" />
    <ellipse cx="240" cy="125" rx="228" ry="110" fill="#60a5fa" opacity="0.6" />
    {SPOTS.slice(0, n).map(([x, y], i) => (
      <g key={i} opacity={i >= n - jumped ? 0.45 : 1}>
        {lily(x, y + 14, `l${i}`)}
        {frogG(x, y, 1, `f${i}`)}
        {i >= n - jumped && <path d={`M${x - 18} ${y + 16} L${x + 18} ${y - 18}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
      </g>
    ))}
  </svg>
);

/** Békák kártyán (5-ös sorokban), válaszkártyának. */
export const FrogCard: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-32 h-[88px]' }) => {
  const rows = Math.max(1, Math.ceil(n / 5));
  const top = 55 - (rows * 30) / 2;
  return (
    <svg viewBox="0 0 160 110" className={className}>
      <rect x="3" y="3" width="154" height="104" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => frogG(20 + (i % 5) * 30, top + 15 + Math.floor(i / 5) * 30, 0.62, i))}
    </svg>
  );
};

/** Pötyi barátai a tóparton: Zümi, Csigusz és egy béka. */
export const PondFriendsScene: React.FC = () => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#e0f2fe" />
    <ellipse cx="300" cy="190" rx="200" ry="60" fill="#60a5fa" opacity="0.6" />
    <path d="M0 170 Q120 140 200 175 V240 H0 Z" fill="#86efac" />
    {ICONS.meh({ x: 120, y: 60, s: 2 })}
    {ICONS.csiga({ x: 90, y: 185, s: 2.2 })}
    {lily(330, 200, 'l')}
    {frogG(330, 182, 1.8, 'f')}
  </svg>
);
