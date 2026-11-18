// „Megálló” (II. Számolás 0-tól 5-ig) – a szüreti ünnep képei.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';
import { sky } from '../a-ketto/AKettoG1Scenes';
import { BasketBox } from '../a-nulla/ANullaG1Scenes';

const FONT = 'system-ui, sans-serif';

/** Sárgarépa (álló, lent a hegye, fent a zöld leveles vége). */
const carrot = (x: number, y: number, s = 1, key?: React.Key, glow = false) => (
  <g key={key} transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M0 -16 L-8 -32 M0 -16 L0 -35 M0 -16 L8 -32" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
    <path d="M-9 -14 Q0 -20 9 -14 L2 24 Q0 28 -2 24 Z" fill="#f97316" stroke={glow ? '#7c3aed' : '#9a3412'} strokeWidth={glow ? 4 : 3} strokeLinejoin="round" />
    <path d="M-6 -4 H-1 M2 6 H6 M-4 14 H0" stroke="#9a3412" strokeWidth="2" strokeLinecap="round" />
  </g>
);

/** Kezdőkép: Pötyi, Zümi és Csigusz a szüreti kosárral. */
export const HarvestScene: React.FC<{ mood?: 'cheer' | 'happy' | 'wow' }> = ({ mood = 'cheer' }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <Potyi mood={mood} dots={5} x={10} y={60} size={150} />
    {ICONS.meh({ x: 210, y: 60, s: 2 })}
    <svg x="190" y="110" width="168" height="120" viewBox="0 0 120 100">
      <BasketBox n={3} icon="alma" className="" />
    </svg>
    {ICONS.csiga({ x: 410, y: 190, s: 2.4 })}
    {ICONS.virag({ x: 440, y: 60, s: 1.2, color: '#f472b6' })}
  </svg>
);

/** Hozzájön: bal oldalon a kosárban `have` tárgy, jobbról Zümi hoz még `add` darabot (nyíl a kosár felé). */
export const AddScene: React.FC<{ icon?: IconName; have: number; add: number }> = ({ icon = 'gomba', have, add }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <rect x="20" y="96" width="250" height="120" rx="20" fill="#fbbf24" stroke="#92400e" strokeWidth="5" />
    <path d="M30 130 H260 M30 166 H260" stroke="#92400e" strokeWidth="3" />
    {Array.from({ length: have }, (_, i) => ICONS[icon]({ x: 145 + (i - (have - 1) / 2) * 46, y: 80, s: 1.3, key: `h${i}` }))}
    <path d="M330 70 Q300 30 262 56" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
    <path d="M276 46 L260 58 L278 66" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    {Array.from({ length: add }, (_, i) => ICONS[icon]({ x: 350 + (i % 2) * 50, y: 120 + Math.floor(i / 2) * 46, s: 1.3, key: `a${i}` }))}
    {ICONS.meh({ x: 410, y: 56, s: 1.8 })}
  </svg>
);

/**
 * Talicska: `visible` répa kilátszik (bal oldalon, max 4), a jobb oldalt mindig ugyanakkora kendő takarja.
 * `reveal`: a kendő eltűnik, és látszik a `hidden` répa (lila szegéllyel).
 */
export const WheelbarrowScene: React.FC<{ visible: number; hidden: number; reveal?: boolean }> = ({ visible, hidden, reveal = false }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    {Array.from({ length: Math.min(4, visible) }, (_, i) => carrot(118 + i * 32, 92, 1.1, `v${i}`))}
    {reveal
      ? Array.from({ length: hidden }, (_, i) => carrot(246 + i * 30, 92, 1.1, `h${i}`, true))
      : (
        <g>
          <path d="M222 106 Q228 46 302 48 Q376 46 386 106 Z" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="4" strokeLinejoin="round" />
          <path d="M250 60 V104 M280 50 V104 M310 49 V104 M340 52 V104 M366 64 V104 M232 80 H380" stroke="#dbeafe" strokeWidth="4" />
        </g>
      )}
    <path d="M80 100 H400 L362 176 H128 Z" fill="#94a3b8" stroke="#334155" strokeWidth="5" strokeLinejoin="round" />
    <path d="M396 106 L466 76" stroke="#334155" strokeWidth="9" strokeLinecap="round" />
    <path d="M330 176 L344 214" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
    <circle cx="160" cy="196" r="28" fill="#1f2937" stroke="#111827" strokeWidth="4" />
    <circle cx="160" cy="196" r="9" fill="#cbd5e1" />
  </svg>
);

/** Almapiramis: a felső almába a két alsó szám összege kerül. `null` = „?”. */
export const ApplePyramid: React.FC<{ top: number | null; left: number | null; right: number | null }> = ({ top, left, right }) => {
  const apple = (x: number, y: number, v: number | null) => (
    <g key={`${x}-${y}`}>
      {ICONS.alma({ x, y, s: 2.6 })}
      <text x={x} y={y + 22} textAnchor="middle" fontSize="44" fontWeight="900" fill={v === null ? '#fde047' : '#fff'} stroke="#7f1d1d" strokeWidth="1.5" fontFamily={FONT}>
        {v === null ? '?' : v}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 480 240">
      <rect x="0" y="0" width="480" height="240" rx="18" fill="#f0fdf4" />
      {apple(240, 72, top)}
      {apple(176, 178, left)}
      {apple(304, 178, right)}
    </svg>
  );
};

/** Ládatorony: felülről lefelé a ládák tartalma. */
export const CrateTowerScene: React.FC<{ items: IconName[] }> = ({ items }) => (
  <svg viewBox="0 0 480 240">
    <rect x="0" y="0" width="480" height="240" rx="18" fill="#e0f2fe" />
    <path d="M0 226 H480" stroke="#15803d" strokeWidth="8" />
    {items.map((icon, i) => {
      const h = Math.min(70, 200 / items.length);
      const y = 222 - (items.length - i) * h;
      return (
        <g key={i}>
          <rect x="170" y={y} width="140" height={h - 4} rx="6" fill="#d97706" stroke="#78350f" strokeWidth="4" />
          <path d={`M178 ${y + 10} H302 M178 ${y + h - 14} H302`} stroke="#92400e" strokeWidth="3" />
          {ICONS[icon]({ x: 240, y: y + h / 2 - 2, s: Math.min(1.4, h / 50) })}
        </g>
      );
    })}
    <Potyi mood="think" dots={5} x={20} y={110} size={110} />
  </svg>
);
