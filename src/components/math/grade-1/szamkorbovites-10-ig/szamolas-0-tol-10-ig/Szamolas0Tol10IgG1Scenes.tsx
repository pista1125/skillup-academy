// „Számolás 0-tól 10-ig” – a havas tekepálya képei (10 bábu), a 10 bontásának táblázata.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { snow } from '../a-tiz/ATizG1Scenes';

/** Egy tekebábu (álló vagy eldőlt). */
export const pin = (x: number, y: number, s = 1, fallen = false, key?: React.Key) => (
  <g key={key} transform={`translate(${x} ${y}) rotate(${fallen ? 80 : 0}) scale(${s})`} opacity={fallen ? 0.55 : 1}>
    <path
      d="M0 -24 C6 -24 7 -16 4 -10 C3 -7 3 -5 5 -2 C12 6 11 18 6 22 H-6 C-11 18 -12 6 -5 -2 C-3 -5 -3 -7 -4 -10 C-7 -16 -6 -24 0 -24 Z"
      fill="#ffffff"
      stroke="#334155"
      strokeWidth="2.5"
    />
    <path d="M-4 -9 H4 M-4.5 -5 H4.5" stroke="#ef4444" strokeWidth="2.5" />
  </g>
);

// 10 hely háromszögben: elöl 1, aztán 2, 3, hátul 4. Az álló bábuk az első helyeken vannak, az eldőltek hátul.
const SPOTS: [number, number][] = [
  [240, 196],
  [210, 152], [270, 152],
  [180, 108], [240, 108], [300, 108],
  [150, 64], [210, 64], [270, 64], [330, 64],
];

/**
 * Tekepálya: `standing` álló bábu és `fallen` eldőlt bábu (összesen legfeljebb 10).
 * Az álló bábuk elöl vannak, az eldőltek hátul fekszenek. `ball`: gurul a golyó.
 */
export const PinsScene: React.FC<{ standing: number; fallen?: number; ball?: boolean; who?: 'meh' | 'csiga' | 'potyi' }> = ({ standing, fallen = 0, ball = false, who }) => {
  const n = Math.min(10, standing + fallen);
  return (
    <svg viewBox="0 0 480 240">
      {snow(480, 240)}
      <path d="M120 236 L170 30 H310 L360 236 Z" fill="#e0f2fe" stroke="#93c5fd" strokeWidth="3" />
      {SPOTS.slice(0, n).map(([x, y], i) => pin(x, y, 1.15, i >= standing, i))}
      {ball && (
        <g>
          <circle cx="400" cy="200" r="20" fill="#7c3aed" stroke="#3b0764" strokeWidth="3" />
          <circle cx="394" cy="192" r="3" fill="#fff" />
          <circle cx="404" cy="190" r="3" fill="#fff" />
          <path d="M378 200 H340 M380 190 H350" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}
      {who === 'meh' && ICONS.meh({ x: 430, y: 70, s: 1.6 })}
      {who === 'csiga' && ICONS.csiga({ x: 60, y: 200, s: 1.8 })}
      {who === 'potyi' && <Potyi dots={10} mood="cheer" x={10} y={120} size={110} />}
    </svg>
  );
};

/** Kisebb kártyaváltozat a párosítóhoz, válogatóhoz. */
export const PinsCard: React.FC<{ standing: number; fallen?: number }> = ({ standing, fallen = 0 }) => (
  <svg viewBox="110 20 260 210" className="w-28 h-24">
    <rect x="112" y="22" width="256" height="206" rx="20" fill="#fff" stroke="#94a3b8" strokeWidth="4" />
    {SPOTS.slice(0, Math.min(10, standing + fallen)).map(([x, y], i) => pin(x, y, 1.15, i >= standing, i))}
  </svg>
);

/** A 10 bontása: soronként 10 korong (a piros, b kék) és mellette „10 = a + b”. A „?” helyén ismeretlen. */
export const TenSplitsScene: React.FC<{ rows: [number, number | '?'][] }> = ({ rows }) => {
  const h = rows.length * 38 + 16;
  return (
    <svg viewBox={`0 0 480 ${h}`} className="w-full max-w-[460px] h-auto mx-auto">
      <rect x="2" y="2" width="476" height={h - 4} rx="16" fill="#fff" stroke="#cbd5e1" strokeWidth="3" />
      {rows.map(([a, b], r) => {
        const y = 27 + r * 38;
        return (
          <g key={r}>
            {Array.from({ length: 10 }, (_, i) => (
              <circle key={i} cx={26 + i * 25} cy={y} r="10" fill={i < a ? '#ef4444' : b === '?' ? '#fff' : '#3b82f6'} stroke="#111827" strokeWidth="2.5" strokeDasharray={i >= a && b === '?' ? '4 3' : undefined} />
            ))}
            <text x="290" y={y + 9} fontSize="26" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">
              10 = {a} +{' '}
              <tspan fill={b === '?' ? '#7c3aed' : '#1e293b'}>{b}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
};
