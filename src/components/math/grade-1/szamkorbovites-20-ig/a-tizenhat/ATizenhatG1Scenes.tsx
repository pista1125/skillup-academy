// „A tizenhat” – a pillangókert képei. A közös képek (két tízes keret, tízesrúd, csoportok…) az „A tizenöt” leckéből jönnek.
import React from 'react';
import { ICONS } from '../../shared/G1Pics';
import { garden } from '../a-tizenot/ATizenotG1Scenes';

const VIOLET = '#a855f7';
const ORANGE = '#f97316';

const BF_POS: [number, number][] = [
  [60, 44], [140, 70], [220, 40], [300, 66], [380, 42], [446, 84],
  [92, 120], [176, 132], [256, 112], [340, 128], [420, 150],
  [48, 186], [130, 196], [214, 180], [296, 194], [376, 200], [452, 206], [30, 112],
];

/** Pillangók a kertben: `n` lila, utánuk `nb` narancs (0–18). */
export const ButterflyScene: React.FC<{ n: number; nb?: number }> = ({ n, nb = 0 }) => (
  <svg viewBox="0 0 480 240">
    {garden(480, 240)}
    {BF_POS.slice(0, n + nb).map(([x, y], i) => ICONS.pillango({ x, y, s: 0.95, color: i < n ? VIOLET : ORANGE, key: i }))}
  </svg>
);

/** Pillangósor: `n` pillangó egy sorban, `group`-onként váltakozó színnel (kettesével, négyesével… számoláshoz). */
export const GroupRow: React.FC<{ n: number; group: number; className?: string }> = ({ n, group, className = 'w-full max-w-[460px] h-auto mx-auto' }) => {
  const perRow = n > 10 ? Math.ceil(n / 2) : n;
  const rows = Math.ceil(n / perRow);
  const cell = 52;
  const w = perRow * cell + 20;
  const h = rows * cell + 20;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className}>
      <rect x="2" y="2" width={w - 4} height={h - 4} rx="16" fill="#fff" stroke="#94a3b8" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) =>
        ICONS.pillango({ x: 10 + (i % perRow) * cell + cell / 2, y: 10 + Math.floor(i / perRow) * cell + cell / 2, s: 1, color: Math.floor(i / group) % 2 === 0 ? VIOLET : ORANGE, key: i })
      )}
    </svg>
  );
};

/** Pillangók egy sorban balról jobbra; a `yellow`-adik (1-től) sárga – sorszámnévhez. Csigusz a sor elején néz. */
export const ButterflyRow: React.FC<{ n: number; yellow: number }> = ({ n, yellow }) => {
  const cell = 50;
  const w = 70 + n * cell + 10;
  return (
    <svg viewBox={`0 0 ${w} 100`} className="w-full max-w-[460px] h-auto mx-auto">
      <rect x="2" y="2" width={w - 4} height="96" rx="16" fill="#ecfccb" stroke="#84cc16" strokeWidth="3" />
      {ICONS.csiga({ x: 38, y: 60, s: 1 })}
      {Array.from({ length: n }, (_, i) => ICONS.pillango({ x: 70 + i * cell + cell / 2, y: 50, s: 0.95, color: i === yellow - 1 ? '#facc15' : VIOLET, key: i }))}
    </svg>
  );
};
