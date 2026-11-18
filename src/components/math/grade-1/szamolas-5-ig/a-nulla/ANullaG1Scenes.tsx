// „A nulla” – a mese és a játék képei.
import React from 'react';
import { Potyi } from '../../shared/Potyi';
import { ICONS, IconName } from '../../shared/G1Pics';
import { sky } from '../a-ketto/AKettoG1Scenes';

/** Fészek (cx, cy = a fészek közepe) n tojással. */
const nest = (cx: number, cy: number, eggs: number, s = 1) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    {Array.from({ length: eggs }, (_, i) => {
      const ex = (i - (eggs - 1) / 2) * 30;
      return <ellipse key={i} cx={ex} cy={-14} rx="15" ry="19" fill="#e0f2fe" stroke="#0369a1" strokeWidth="3" />;
    })}
    <path d="M-62 -10 Q-58 34 0 36 Q58 34 62 -10 Z" fill="#a16207" stroke="#713f12" strokeWidth="4" strokeLinejoin="round" />
    <path d="M-52 2 Q0 16 52 2 M-44 16 Q0 30 44 16" fill="none" stroke="#713f12" strokeWidth="3" />
    <path d="M-62 -10 Q0 4 62 -10" fill="none" stroke="#713f12" strokeWidth="4" />
  </g>
);

/** Fa ágán fészek `eggs` tojással; opcionálisan Pötyi és Zümi is nézi. */
export const NestScene: React.FC<{ eggs: number; friends?: boolean }> = ({ eggs, friends = false }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    <path d="M480 150 Q340 140 170 168" fill="none" stroke="#92400e" strokeWidth="14" strokeLinecap="round" />
    <path d="M330 146 Q350 116 380 110" fill="none" stroke="#92400e" strokeWidth="7" strokeLinecap="round" />
    {ICONS.level({ x: 386, y: 104, s: 1 })}
    {ICONS.level({ x: 196, y: 150, s: 0.9, color: '#16a34a' })}
    {nest(friends ? 300 : 260, 128, eggs, friends ? 1.1 : 1.4)}
    {friends && (
      <>
        <Potyi mood={eggs === 0 ? 'think' : 'wow'} dots={7} x={10} y={70} size={150} />
        {ICONS.meh({ x: 170, y: 60, s: 1.6 })}
      </>
    )}
  </svg>
);

/** Kosár kártya n almával (0 = üres kosár). */
export const BasketBox: React.FC<{ n: number; className?: string; icon?: IconName }> = ({ n, className = 'w-28 h-24', icon = 'alma' }) => (
  <svg viewBox="0 0 120 100" className={className}>
    <rect x="3" y="3" width="114" height="94" rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
    <path d="M30 46 Q60 6 90 46" fill="none" stroke="#92400e" strokeWidth="5" />
    {Array.from({ length: n }, (_, i) => ICONS[icon]({ x: 60 + (i - (n - 1) / 2) * 30, y: 44, s: 0.85, key: i }))}
    <path d="M18 48 H102 L92 88 H28 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="4" strokeLinejoin="round" />
    <path d="M24 62 H96 M27 75 H93" stroke="#92400e" strokeWidth="2.5" />
  </svg>
);

/** Előtte–utána: balra `before`, jobbra `after` tárgy; középen nyíl. Csigusz is ott van (ő eszik). */
export const BeforeAfterScene: React.FC<{ icon: IconName; before: number; after: number; snail?: boolean }> = ({ icon, before, after, snail = true }) => {
  const row = (x0: number, n: number) => Array.from({ length: n }, (_, i) => ICONS[icon]({ x: x0 + (i - (n - 1) / 2) * 56, y: 110, s: 1.3, key: `${x0}-${i}` }));
  return (
    <svg viewBox="0 0 480 220">
      <rect x="0" y="0" width="480" height="220" rx="18" fill="#f0fdf4" />
      <rect x="16" y="30" width="190" height="160" rx="18" fill="#fff" stroke="#86efac" strokeWidth="4" />
      <rect x="274" y="30" width="190" height="160" rx="18" fill="#fff" stroke="#86efac" strokeWidth="4" />
      <path d="M218 110 H258 M246 98 L260 110 L246 122" fill="none" stroke="#475569" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      {row(111, before)}
      {row(369, after)}
      {snail && ICONS.csiga({ x: 400, y: 170, s: 1 })}
    </svg>
  );
};

/** Csigusz egy kosárral, benne n eper. */
export const SnailBasketScene: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 480 240">
    {sky(480, 240)}
    {ICONS.csiga({ x: 150, y: 170, s: 3.2 })}
    <svg x="270" y="70" width="168" height="140" viewBox="0 0 120 100">
      <BasketBox n={n} icon="eper" className="" />
    </svg>
  </svg>
);

/** Egy kis katica-kártya n pöttyel (Pötyi rokonai). */
export const BugCard: React.FC<{ dots: number }> = ({ dots }) => <Potyi dots={dots} mood="happy" className="w-20 h-20" title="katica" />;
