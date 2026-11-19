// „A tizenkettő” – saját képek: lufik a zsúron, dobókockák (területfoglaló). A közös képek az `a-tizenegy` leckéből jönnek.
import React from 'react';
import { FONT } from '../a-tizenegy/ATizenegyG1Scenes';

const balloon = (x: number, y: number, color: string, popped: boolean, key: React.Key) => (
  <g key={key} opacity={popped ? 0.4 : 1}>
    <path d={`M${x} ${y + 22} Q${x - 4} ${y + 40} ${x + 2} ${y + 58}`} stroke="#475569" strokeWidth="2.5" fill="none" />
    <ellipse cx={x} cy={y} rx="16" ry="21" fill={color} stroke="#1f2937" strokeWidth="3" />
    <path d={`M${x - 4} ${y + 21} L${x + 4} ${y + 21} L${x} ${y + 26} Z`} fill={color} stroke="#1f2937" strokeWidth="2" />
    <ellipse cx={x - 6} cy={y - 8} rx="4" ry="6" fill="#fff" opacity="0.6" />
    {popped && <path d={`M${x - 18} ${y + 18} L${x + 18} ${y - 18}`} stroke="#111827" strokeWidth="5" strokeLinecap="round" />}
  </g>
);

/** Lufik két sorban (6-osával). Az első `blue` darab kék, a többi piros; az utolsó `popped` darab kipukkadt (áthúzva). */
export const BalloonsScene: React.FC<{ n: number; blue?: number; popped?: number; className?: string }> = ({ n, blue = 0, popped = 0, className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const perRow = n > 12 ? 7 : 6;
  return (
    <svg viewBox="0 0 480 200" className={className}>
      <rect x="0" y="0" width="480" height="200" rx="18" fill="#fdf2f8" />
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const x = 240 + (col - (perRow - 1) / 2) * 62;
        const y = 40 + row * 90;
        return balloon(x, y, i < blue ? '#3b82f6' : '#ef4444', i >= n - popped, i);
      })}
    </svg>
  );
};

const PIPS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
  5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
  6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]],
};

/** Egy dobókocka (1–6) SVG-csoportként, (x, y) bal felső sarok, 80×80. */
export const diceG = (x: number, y: number, v: number, key?: React.Key, color = '#fff') => (
  <g key={key} transform={`translate(${x} ${y})`}>
    <rect x="3" y="3" width="74" height="74" rx="14" fill={color} stroke="#111827" strokeWidth="4" />
    {(PIPS[v] || []).map(([a, b], i) => (
      <circle key={i} cx={40 + a * 20} cy={40 + b * 20} r="7" fill="#111827" />
    ))}
  </g>
);

/** Két dobókocka, mellettük „= ?” (vagy semmi). */
export const DiceScene: React.FC<{ a: number; b: number; ask?: boolean; className?: string }> = ({ a, b, ask = true, className = 'w-full max-w-[360px] h-auto mx-auto' }) => (
  <svg viewBox={`0 0 ${ask ? 330 : 200} 90`} className={className}>
    {diceG(0, 5, a, 'a')}
    <text x="100" y="60" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1e293b" fontFamily={FONT}>+</text>
    {diceG(118, 5, b, 'b')}
    {ask && (
      <>
        <text x="236" y="60" textAnchor="middle" fontSize="36" fontWeight="900" fill="#1e293b" fontFamily={FONT}>=</text>
        <text x="292" y="64" textAnchor="middle" fontSize="48" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>?</text>
      </>
    )}
  </svg>
);

/** Kis kártya két kockával (párosítóhoz). */
export const DiceCard: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 170 86" className="w-32 h-auto">
    {diceG(0, 3, a, 'a')}
    {diceG(88, 3, b, 'b')}
  </svg>
);
