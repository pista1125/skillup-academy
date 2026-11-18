// „Az öt” – a mese és a játék képei (szüret a Számkertben).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { FruitName, drawThing, plum, pumpkin, sky } from '../a-negy/ANegyG1Scenes';

const FONT = 'system-ui, sans-serif';

/** Szüret: szilvafa, kosár, Pötyi, Zümi, Csigusz. */
export const HarvestScene: React.FC<{ dots?: number }> = ({ dots = 5 }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <rect x="336" y="120" width="24" height="90" rx="8" fill="#92400e" />
    <circle cx="348" cy="92" r="70" fill="#22c55e" stroke="#15803d" strokeWidth="5" />
    {[
      [320, 70],
      [372, 64],
      [346, 100],
      [310, 116],
      [386, 112],
    ].map(([x, y], i) => plum(x, y, 0.9, i))}
    <path d="M200 196 H280 L270 226 H210 Z" fill="#d97706" stroke="#78350f" strokeWidth="4" strokeLinejoin="round" />
    <path d="M206 196 Q240 160 274 196" fill="none" stroke="#78350f" strokeWidth="5" />
    <Potyi mood="cheer" dots={dots} x={10} y={60} size={160} />
    {ICONS.meh({ x: 210, y: 70, s: 1.3 })}
    {ICONS.csiga({ x: 440, y: 212, s: 1.1 })}
  </svg>
);

/** Kosár n tárggyal (0–5). */
export const BasketFig: React.FC<{ n: number; icon?: FruitName; className?: string }> = ({ n, icon = 'szilva', className = 'w-28 h-24' }) => {
  const spots: [number, number][] = [
    [30, 44],
    [60, 40],
    [90, 44],
    [45, 22],
    [75, 22],
  ];
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {spots.slice(0, n).map(([x, y], i) => drawThing(icon, x, y + 14, 0.75, i))}
      <path d="M12 58 H108 L98 90 H22 Z" fill="#d97706" stroke="#78350f" strokeWidth="3" strokeLinejoin="round" />
      <path d="M20 70 H100 M24 80 H96" stroke="#92400e" strokeWidth="2" />
    </svg>
  );
};

/** Két sor egymás alatt, párba állítva („mennyivel több?”). */
export const RowsCompareScene: React.FC<{ a: number; b: number; iconA?: FruitName; iconB?: FruitName }> = ({ a, b, iconA = 'szilva', iconB = 'korte' }) => (
  <svg viewBox="0 0 480 200">
    <rect x="0" y="0" width="480" height="200" rx="18" fill="#fefce8" />
    {Array.from({ length: a }, (_, i) => drawThing(iconA, 60 + i * 84, 60, 1.4, `a${i}`))}
    {Array.from({ length: b }, (_, i) => drawThing(iconB, 60 + i * 84, 145, 1.4, `b${i}`))}
  </svg>
);

/** Talicska n tökkel és `empty` szaggatott hellyel (ennyi fér még bele). */
export const WheelbarrowScene: React.FC<{ n: number; empty?: number }> = ({ n, empty = 0 }) => (
  <svg viewBox="0 0 480 220">
    {sky(480, 220)}
    <path d="M70 120 H360 L330 176 H110 Z" fill="#94a3b8" stroke="#334155" strokeWidth="5" strokeLinejoin="round" />
    <path d="M360 124 L440 100" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
    <circle cx="120" cy="188" r="22" fill="#1f2937" stroke="#111827" strokeWidth="4" />
    <circle cx="120" cy="188" r="7" fill="#9ca3af" />
    <path d="M300 176 L310 206" stroke="#334155" strokeWidth="6" strokeLinecap="round" />
    {Array.from({ length: n + empty }, (_, i) => {
      const x = 110 + i * 54;
      return i < n ? pumpkin(x, 100, 1.4, i) : <ellipse key={i} cx={x} cy="100" rx="24" ry="19" fill="#fff" fillOpacity="0.6" stroke="#f97316" strokeWidth="3" strokeDasharray="6 5" />;
    })}
  </svg>
);

/** Madárijesztő: a bal és jobb vállán ülő madarak; `right` lehet '?' (ekkor a jobb váll el van takarva). */
export const ScarecrowScene: React.FC<{ left: number; right: number | '?'; total?: number }> = ({ left, right, total }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <rect x="234" y="70" width="12" height="170" fill="#92400e" />
    <rect x="60" y="96" width="360" height="12" rx="6" fill="#92400e" />
    <path d="M200 110 H280 L290 190 H190 Z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="4" strokeLinejoin="round" />
    <circle cx="240" cy="66" r="26" fill="#fde68a" stroke="#92400e" strokeWidth="4" />
    <path d="M206 50 H274 L262 30 H218 Z" fill="#a16207" stroke="#78350f" strokeWidth="3" />
    {total !== undefined && (
      <text x="240" y="48" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff" fontFamily={FONT}>{total}</text>
    )}
    <circle cx="231" cy="66" r="3" fill="#111827" />
    <circle cx="249" cy="66" r="3" fill="#111827" />
    {Array.from({ length: left }, (_, i) => ICONS.madar({ x: 80 + i * 32, y: 82, s: 0.9, key: `l${i}` }))}
    {right === '?' ? (
      <g>
        <rect x="300" y="56" width="100" height="40" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="3" />
        <text x="350" y="86" textAnchor="middle" fontSize="30" fontWeight="900" fill="#7c3aed" fontFamily={FONT}>?</text>
      </g>
    ) : (
      Array.from({ length: right }, (_, i) => ICONS.madar({ x: 400 - i * 32, y: 82, s: 0.9, key: `r${i}` }))
    )}
  </svg>
);

/** Öt korong kockaképben: `red` piros, a többi kék. */
export const DieKorongs: React.FC<{ red: number; className?: string }> = ({ red, className = 'w-28 h-24' }) => {
  const pos: [number, number][] = [
    [30, 28],
    [90, 28],
    [60, 51],
    [30, 75],
    [90, 75],
  ];
  return (
    <svg viewBox="0 0 120 100" className={className}>
      <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {pos.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="15" fill={i < red ? '#ef4444' : '#3b82f6'} stroke="#111827" strokeWidth="3" />
      ))}
    </svg>
  );
};

/** Tengeri csillag öt karral. */
export const StarfishFig: React.FC<{ className?: string }> = ({ className = 'w-40 h-40 mx-auto' }) => (
  <svg viewBox="0 0 120 120" className={className}>
    <rect x="3" y="3" width="114" height="114" rx="18" fill="#bae6fd" />
    <path d="M60 14 L72 46 L106 48 L80 68 L90 102 L60 82 L30 102 L40 68 L14 48 L48 46 Z" fill="#fb923c" stroke="#9a3412" strokeWidth="4" strokeLinejoin="round" />
    {[[60, 34], [88, 52], [78, 88], [42, 88], [32, 52]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3.5" fill="#fff7ed" />
    ))}
  </svg>
);
