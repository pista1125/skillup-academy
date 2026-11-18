// „Számolás 0-tól 9-ig” – mézeskalács-sütés a Számkertben (képek a meséhez és a játékhoz).
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS } from '../../shared/G1Pics';
import { XMAS, XPIC, XPicName } from '../a-kilenc/AKilencG1Scenes';

const kitchen = (w: number, h: number) => (
  <>
    <rect x="0" y="0" width={w} height={h} rx="18" fill="#fef3c7" />
    <rect x="0" y={h - 40} width={w} height="40" fill="#fde68a" />
    <path d={`M0 ${h - 40} H${w}`} stroke="#d97706" strokeWidth="3" />
  </>
);

/** Mézesbödön (Zümi hozza a mézet). */
const HoneyPot: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-22 -12 Q-26 24 0 26 Q26 24 22 -12 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="3" />
    <rect x="-24" y="-20" width="48" height="10" rx="4" fill="#fbbf24" stroke="#92400e" strokeWidth="3" />
    <text x="0" y="12" textAnchor="middle" fontSize="13" fontWeight="900" fill="#78350f" fontFamily="system-ui, sans-serif">MÉZ</text>
  </g>
);

/** A konyha: Pötyi, Zümi a mézesbödönnel, Csigusz. `cookies`: díszként sütik a polcon (nem kell számolni). */
export const BakeryScene: React.FC<{ dots?: number; mood?: 'happy' | 'cheer' | 'wow'; cookies?: boolean }> = ({ dots = 9, mood = 'cheer', cookies = false }) => (
  <svg viewBox="0 0 480 240">
    {kitchen(480, 240)}
    <rect x="330" y="70" width="130" height="130" rx="12" fill="#e5e7eb" stroke="#374151" strokeWidth="4" />
    <rect x="346" y="104" width="98" height="80" rx="8" fill="#fb923c" stroke="#374151" strokeWidth="3" />
    <circle cx="360" cy="86" r="6" fill="#374151" />
    <circle cx="384" cy="86" r="6" fill="#374151" />
    <Potyi mood={mood} dots={dots} x={10} y={50} size={150} />
    {ICONS.meh({ x: 200, y: 70, s: 1.8 })}
    <HoneyPot x={210} y={170} />
    {ICONS.csiga({ x: 285, y: 192, s: 1.6 })}
    {cookies && (
      <g>
        {XMAS.suti({ x: 370, y: 140, s: 0.9 })}
        {XMAS.sutiSziv({ x: 420, y: 144, s: 0.9 })}
      </g>
    )}
  </svg>
);

/**
 * Sütőtálca: `a` darab `iconA` (alap: csillag-süti), utána `b` darab `iconB` (alap: szív-süti), 5-ös sorokban.
 * `crossed`: az utolsó ennyi áthúzva (megették).
 */
export const TrayScene: React.FC<{ a: number; b?: number; iconA?: XPicName; iconB?: XPicName; crossed?: number; className?: string }> = ({
  a,
  b = 0,
  iconA = 'suti',
  iconB = 'sutiSziv',
  crossed = 0,
  className = 'w-full max-w-[400px] h-auto mx-auto',
}) => {
  const n = a + b;
  return (
    <svg viewBox="0 0 340 160" className={className}>
      <rect x="6" y="6" width="328" height="148" rx="14" fill="#9ca3af" stroke="#374151" strokeWidth="4" />
      <rect x="18" y="18" width="304" height="124" rx="8" fill="#e5e7eb" />
      {Array.from({ length: n }, (_, i) => {
        const x = 50 + (i % 5) * 60;
        const y = 52 + Math.floor(i / 5) * 58;
        const isX = i >= n - crossed;
        return (
          <g key={i} opacity={isX ? 0.45 : 1}>
            {XPIC(i < a ? iconA : iconB)({ x, y, s: 1.2 })}
            {isX && <path d={`M${x - 20} ${y - 20} L${x + 20} ${y + 20}`} stroke="#111827" strokeWidth="6" strokeLinecap="round" />}
          </g>
        );
      })}
    </svg>
  );
};

/** Nyíl-feladat: [from] —(+3)→ [□]. `to`: kitöltött eredmény (alap: üres négyzet). */
export const ArrowCard: React.FC<{ from: number | string; op: string; to?: number | string; className?: string }> = ({ from, op, to, className = 'w-full max-w-[400px] h-auto mx-auto' }) => (
  <svg viewBox="0 0 360 120" className={className}>
    <rect x="3" y="3" width="354" height="114" rx="18" fill="#fff" stroke="#c4b5fd" strokeWidth="3" />
    <rect x="24" y="36" width="64" height="64" rx="10" fill="#fff" stroke="#1e293b" strokeWidth="3.5" />
    <text x="56" y="84" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">{from}</text>
    <path d="M100 68 H244" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" />
    <path d="M232 56 L250 68 L232 80" fill="none" stroke="#dc2626" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="172" y="50" textAnchor="middle" fontSize="34" fontWeight="900" fill="#dc2626" fontFamily="system-ui, sans-serif">{op}</text>
    <rect x="266" y="36" width="64" height="64" rx="10" fill={to === undefined ? '#f5f3ff' : '#dcfce7'} stroke="#7c3aed" strokeWidth="3.5" strokeDasharray={to === undefined ? '7 5' : undefined} />
    {to !== undefined && (
      <text x="298" y="84" textAnchor="middle" fontSize="44" fontWeight="900" fill="#1e293b" fontFamily="system-ui, sans-serif">{to}</text>
    )}
  </svg>
);

/** Süti-doboz `slots` hellyel (alap 9): `have` hely tele, a többi üres. */
export const SlotBox: React.FC<{ have: number; slots?: number; icon?: XPicName; className?: string }> = ({ have, slots = 9, icon = 'suti', className = 'w-full max-w-[380px] h-auto mx-auto' }) => (
  <svg viewBox="0 0 330 150" className={className}>
    <rect x="6" y="6" width="318" height="138" rx="14" fill="#fecaca" stroke="#991b1b" strokeWidth="4" />
    {Array.from({ length: slots }, (_, i) => {
      const x = 45 + (i % 5) * 60;
      const y = 45 + Math.floor(i / 5) * 60;
      return (
        <g key={i}>
          <rect x={x - 26} y={y - 26} width="52" height="52" rx="10" fill="#fff" stroke="#991b1b" strokeWidth="2.5" strokeDasharray={i < have ? undefined : '5 4'} />
          {i < have && XPIC(icon)({ x, y, s: 1 })}
        </g>
      );
    })}
  </svg>
);

/** Három tányér: Pötyi, Zümi, Csigusz sütijei (háromtagú összeadás). */
export const PlatesScene: React.FC<{ per: [number, number, number] }> = ({ per }) => (
  <svg viewBox="0 0 480 220">
    {kitchen(480, 220)}
    {per.map((n, k) => {
      const cx = 85 + k * 155;
      return (
        <g key={k}>
          <ellipse cx={cx} cy="92" rx="66" ry="44" fill="#fff" stroke="#94a3b8" strokeWidth="4" />
          <ellipse cx={cx} cy="92" rx="46" ry="28" fill="none" stroke="#e2e8f0" strokeWidth="3" />
          {Array.from({ length: n }, (_, i) => {
            const cols = Math.min(3, n);
            const row = Math.floor(i / 3);
            const inRow = row === 0 ? cols : n - 3;
            const x = cx + ((i % 3) - (inRow - 1) / 2) * 32;
            const y = n > 3 ? 78 + row * 30 : 92;
            return XMAS.suti({ x, y, s: 0.75, key: i });
          })}
        </g>
      );
    })}
    <Potyi mood="happy" dots={7} x={50} y={140} size={70} />
    {ICONS.meh({ x: 240, y: 178, s: 1.3 })}
    {ICONS.csiga({ x: 395, y: 182, s: 1.4 })}
  </svg>
);
