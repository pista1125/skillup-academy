// „A tíz” – a téli madáretető képei. A 18–20. lecke (Számolás 0-tól 10-ig, Szöveges feladatok, Megálló) is innen importál.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';
import { PIC, PicName, snow } from '../a-nyolc/ANyolcG1Scenes';

export { snow };

const SIT_FLOOR: [number, number][] = [
  [162, 152], [201, 152], [240, 152], [279, 152], [318, 152],
];
const SIT_ROOF: [number, number][] = [
  [172, 40], [206, 24], [240, 10], [274, 24], [308, 40],
];
const SIT = [...SIT_FLOOR, ...SIT_ROOF];
const AWAY: [number, number][] = [
  [410, 40], [446, 92], [400, 120], [440, 160], [410, 196],
];
const COMING: [number, number][] = [
  [52, 40], [88, 86], [40, 124], [86, 162], [44, 200],
];

/** A madáretető (tető, két oszlop, padló). */
export const feeder = (
  <g>
    <rect x="232" y="184" width="16" height="56" fill="#92400e" stroke="#451a03" strokeWidth="3" />
    <path d="M120 72 L240 18 L360 72 Z" fill="#b45309" stroke="#451a03" strokeWidth="4" strokeLinejoin="round" />
    <path d="M128 70 L240 22 L352 70" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
    <rect x="146" y="72" width="12" height="100" fill="#d97706" stroke="#451a03" strokeWidth="3" />
    <rect x="322" y="72" width="12" height="100" fill="#d97706" stroke="#451a03" strokeWidth="3" />
    <rect x="118" y="168" width="244" height="18" rx="5" fill="#d97706" stroke="#451a03" strokeWidth="3" />
  </g>
);

/**
 * Madáretető a havas kertben: `birds` madár ül rajta (0–10, előbb a padlón, aztán a tetőn),
 * `away` madár elrepül (jobbra, szaggatott nyíllal), `coming` madár érkezik (balról).
 * `icon`: a madár helyett más (pl. hógolyó) is ülhet rajta.
 */
export const FeederScene: React.FC<{ birds: number; away?: number; coming?: number; icon?: PicName; label?: string | number }> = ({ birds, away = 0, coming = 0, icon = 'madar', label }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    {feeder}
    {SIT.slice(0, Math.min(10, birds)).map(([x, y], i) => PIC(icon)({ x, y, s: 0.85, key: `s${i}` }))}
    {away > 0 && <path d="M350 120 Q380 60 420 20" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="7 6" />}
    {AWAY.slice(0, away).map(([x, y], i) => PIC(icon)({ x, y, s: 0.8, key: `a${i}`, color: '#7dd3fc' }))}
    {coming > 0 && <path d="M110 30 Q130 90 150 130" fill="none" stroke="#64748b" strokeWidth="3" strokeDasharray="7 6" />}
    {COMING.slice(0, coming).map(([x, y], i) => PIC(icon)({ x, y, s: 0.8, key: `c${i}`, color: '#fb923c' }))}
    {label !== undefined && (
      <g>
        <rect x="392" y="170" width="72" height="60" rx="14" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
        <text x="428" y="214" textAnchor="middle" fontSize="38" fontWeight="900" fill={label === '?' ? '#7c3aed' : '#1e293b'} fontFamily="system-ui, sans-serif">{label}</text>
      </g>
    )}
  </svg>
);

/** A barátok az etetőnél (nyitó és záró kép). */
export const FeederFriendsScene: React.FC<{ dots?: number; mood?: 'happy' | 'cheer' | 'wow' }> = ({ dots = 7, mood = 'cheer' }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <g transform="translate(250 30) scale(0.55)">{feeder}</g>
    <Potyi mood={mood} dots={dots} x={10} y={70} size={160} />
    {ICONS.meh({ x: 215, y: 70, s: 1.8 })}
    {ICONS.csiga({ x: 420, y: 196, s: 2 })}
  </svg>
);

/** Pötyi nagyban, a hátán `dots` pötty (0–10), mellette kis tábla a számmal vagy „?”-lel. */
export const PotyiWingsScene: React.FC<{ dots: number; label?: string | number; mood?: 'happy' | 'cheer' | 'wow' | 'think' }> = ({ dots, label, mood = 'happy' }) => (
  <svg viewBox="0 0 480 240">
    {snow(480, 240)}
    <Potyi mood={mood} dots={dots} x={label === undefined ? 130 : 70} y={10} size={220} />
    {label !== undefined && (
      <g>
        <rect x="330" y="70" width="110" height="100" rx="20" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
        <text x="385" y="140" textAnchor="middle" fontSize="60" fontWeight="900" fill={label === '?' ? '#7c3aed' : '#1e293b'} fontFamily="system-ui, sans-serif">{label}</text>
      </g>
    )}
  </svg>
);

/** Két sor egymás alatt, párba állítva (mennyivel több?). Fent `a`, lent `b` darab. */
export const TwoRowsScene: React.FC<{ a: number; b: number; icon?: PicName; iconB?: PicName; colorB?: string }> = ({ a, b, icon = 'madar', iconB, colorB }) => {
  const n = Math.max(a, b, 1);
  const st = Math.min(44, 420 / n);
  const x0 = 240 - ((n - 1) * st) / 2;
  return (
    <svg viewBox="0 0 480 170" className="w-full max-w-[460px] h-auto mx-auto">
      <rect x="2" y="2" width="476" height="166" rx="18" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="3" />
      {Array.from({ length: a }, (_, i) => PIC(icon)({ x: x0 + i * st, y: 50, s: 0.8, key: `a${i}` }))}
      {Array.from({ length: b }, (_, i) => PIC(iconB ?? icon)({ x: x0 + i * st, y: 120, s: 0.8, key: `b${i}`, color: colorB }))}
    </svg>
  );
};

/** Párokba rendezett tárgyak (keretben kettesével) – páros vagy páratlan? */
export const PairsScene: React.FC<{ n: number; icon?: IconName }> = ({ n, icon = 'szív' }) => {
  const cols = Math.ceil(n / 2);
  const st = 70;
  const x0 = 240 - ((cols - 1) * st) / 2;
  return (
    <svg viewBox="0 0 480 170" className="w-full max-w-[460px] h-auto mx-auto">
      <rect x="2" y="2" width="476" height="166" rx="18" fill="#fff7ed" stroke="#fdba74" strokeWidth="3" />
      {Array.from({ length: cols }, (_, c) => {
        const x = x0 + c * st;
        const two = 2 * c + 1 < n;
        return (
          <g key={c}>
            <rect x={x - 28} y="22" width="56" height={two ? 126 : 66} rx="16" fill="none" stroke="#7c3aed" strokeWidth="3" strokeDasharray="7 5" />
            {ICONS[icon]({ x, y: 54, s: 1 })}
            {two && ICONS[icon]({ x, y: 116, s: 1 })}
          </g>
        );
      })}
    </svg>
  );
};
