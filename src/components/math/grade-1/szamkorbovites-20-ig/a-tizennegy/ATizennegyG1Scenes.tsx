// „A tizennégy” – saját képek: Csigusz akváriuma, jobbra/balra úszó halak, párban úszó halak, hálók, műveletes hal.
// A közös képek (két tízes keret, tízesrúd, dominópár, csoportok…) az „A tizenöt” leckéből jönnek (0–20-ig rajzolnak).
import React from 'react';
import { ICONS } from '../../shared/G1Pics';
import { FONT, PURPLE } from '../a-tizenot/ATizenotG1Scenes';

const COLORS = ['#f97316', '#facc15', '#fb7185', '#38bdf8'];

/** Hal, ami jobbra (dir = 1) vagy balra (dir = −1) úszik. */
export const fishG = (x: number, y: number, dir: 1 | -1, s = 1, color = '#f97316', key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${dir * s} ${s})`}>{ICONS.hal({ x: 0, y: 0, s: 1, color })}</g>
);

const SPOTS: [number, number][] = [
  [70, 55], [150, 45], [235, 60], [320, 45], [405, 60], [95, 110], [180, 100], [265, 115], [350, 100], [430, 120],
  [60, 160], [145, 165], [230, 160], [315, 165], [400, 165], [440, 30],
];

/** Akvárium (legfeljebb 16 hal). Az első `left` hal balra úszik, a többi jobbra (alapból vegyesen). `crossed`: kivett halak. */
export const AquariumScene: React.FC<{ n: number; left?: number; crossed?: number; mixed?: boolean; color?: string }> = ({ n, left, crossed = 0, mixed = true, color }) => (
  <svg viewBox="0 0 480 240">
    <rect x="6" y="6" width="468" height="228" rx="14" fill="#bae6fd" stroke="#0369a1" strokeWidth="5" />
    <path d="M6 22 Q60 12 120 22 T240 22 T360 22 T474 22" fill="none" stroke="#0284c7" strokeWidth="3" />
    <rect x="9" y="200" width="462" height="31" rx="8" fill="#fde68a" />
    {[40, 110, 200, 300, 390, 450].map((x, i) => (
      <circle key={i} cx={x} cy={212} r={8 + (i % 3) * 3} fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
    ))}
    <path d="M20 200 Q10 160 26 120 M30 200 Q40 150 28 100" stroke="#16a34a" strokeWidth="6" fill="none" strokeLinecap="round" />
    {SPOTS.slice(0, n).map(([x, y], i) => {
      const dir: 1 | -1 = left !== undefined ? (i < left ? -1 : 1) : mixed && i % 3 === 1 ? -1 : 1;
      const cross = i >= n - crossed;
      return (
        <g key={i} opacity={cross ? 0.4 : 1}>
          {fishG(x, y, dir, 1.15, color ?? COLORS[i % COLORS.length])}
          {cross && <path d={`M${x - 20} ${y + 16} L${x + 20} ${y - 16}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
        </g>
      );
    })}
  </svg>
);

/** Egy hal kártyán – jobbra vagy balra úszik (válogatóhoz). */
export const FishDirCard: React.FC<{ dir: 1 | -1; color?: string }> = ({ dir, color = '#f97316' }) => (
  <svg viewBox="0 0 90 70" className="w-20 h-16">
    <rect x="3" y="3" width="84" height="64" rx="14" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="3" />
    {fishG(45, 36, dir, 1.4, color)}
  </svg>
);

/** Háló számmal (a játszótér és a kérdések válaszgombjaihoz). */
export const NetCard: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 100 90" className="w-20 h-[72px]">
    <path d="M70 10 L96 2" stroke="#1e3a8a" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="45" cy="34" rx="34" ry="24" fill="#fff" stroke="#1e3a8a" strokeWidth="4" />
    <path d="M14 40 Q45 100 76 40" fill="#e0e7ff" stroke="#1e3a8a" strokeWidth="3" />
    <path d="M26 52 L64 52 M32 64 L58 64 M45 40 V76" stroke="#94a3b8" strokeWidth="2" />
    <text x="45" y="44" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1e293b" fontFamily={FONT}>{n}</text>
  </svg>
);

/** Halak párban (egy hálóban kettő): `n` hal, soronként 4 pár; páratlan számnál az utolsó hal egyedül marad. */
export const PairsScene: React.FC<{ n: number; className?: string }> = ({ n, className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const pairs = Math.ceil(n / 2);
  const rows = Math.ceil(pairs / 4);
  const h = rows * 100 + 20;
  return (
    <svg viewBox={`0 0 480 ${h}`} className={className}>
      <rect x="2" y="2" width="476" height={h - 4} rx="18" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="3" />
      {Array.from({ length: pairs }, (_, k) => {
        const row = Math.floor(k / 4);
        const inRow = Math.min(4, pairs - row * 4);
        const cx = 240 + ((k % 4) - (inRow - 1) / 2) * 112;
        const cy = 60 + row * 100;
        const two = 2 * k + 1 < n;
        return (
          <g key={k}>
            <ellipse cx={cx} cy={cy} rx="46" ry="42" fill="#fff" stroke={two ? '#0369a1' : '#f43f5e'} strokeWidth="4" strokeDasharray={two ? undefined : '8 6'} />
            {fishG(cx + 2, cy - 18, 1, 1, '#f97316')}
            {two && fishG(cx + 2, cy + 18, 1, 1, '#38bdf8')}
          </g>
        );
      })}
    </svg>
  );
};

/** Nagy hal, a testén egy művelet (melyik hálóba kerül?). */
export const OpFish: React.FC<{ text: string; className?: string }> = ({ text, className = 'w-full max-w-[360px] h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 150" className={className}>
    <path d="M70 75 C110 10 270 10 320 75 C270 140 110 140 70 75 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="5" />
    <path d="M72 75 L20 30 L20 120 Z" fill="#fdba74" stroke="#9a3412" strokeWidth="5" strokeLinejoin="round" />
    <circle cx="292" cy="62" r="7" fill="#111827" />
    <text x="190" y="90" textAnchor="middle" fontSize="40" fontWeight="900" fill="#1e293b" fontFamily={FONT}>
      {text.split(/(\?|□)/).map((p, i) => (p === '?' || p === '□' ? <tspan key={i} fill={PURPLE}>{p}</tspan> : <tspan key={i}>{p}</tspan>))}
    </text>
  </svg>
);
