import React from 'react';
import { FONT, INK, UNK } from '../../szorzas/gyakorlas-tudasproba/MultExamG2Parts';
import { HolderIcon, Holder } from './DivExamG2Parts';

// ---------------------------------------------------------------------------
// 10. Gyakorlás, tudáspróba (V. Osztás) – kártyaképek
// Párosító: 150 × 80, Csoportosító (small): 80 × 80
// ---------------------------------------------------------------------------

const Frame: React.FC<{ W: number; fill: string; children: React.ReactNode }> = ({ W, fill, children }) => (
  <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width={W - 4} height="76" rx="10" fill={fill} stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Kosár a sütik számával + üres tányérok (mennyi jut egyre?). */
export const PlatesCard: React.FC<{ pile: number; plates: number; small?: boolean }> = ({ pile, plates, small = false }) => {
  const W = small ? 80 : 150;
  const perRow = small ? Math.min(plates, 4) : Math.min(plates, 5);
  const rows = Math.ceil(plates / perRow);
  const areaX = small ? 6 : 52;
  const areaW = W - areaX - 6;
  const pw = Math.min(24, (areaW - (perRow - 1) * 3) / perRow);
  const top = small ? 34 : 14;
  const rowH = small ? 20 : 24;
  return (
    <Frame W={W} fill="#fff7ed">
      {small ? (
        <text x={W / 2} y={26} textAnchor="middle" fontSize="20" fontWeight="900" fill={INK}>
          {pile}
        </text>
      ) : (
        <g>
          <path d="M 10 30 H 46 L 42 62 H 14 Z" fill="#fde68a" stroke="#a16207" strokeWidth="2.5" />
          <text x="28" y="54" textAnchor="middle" fontSize="16" fontWeight="900" fill={INK}>
            {pile}
          </text>
        </g>
      )}
      {Array.from({ length: plates }, (_, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const inRow = Math.min(perRow, plates - row * perRow);
        const x = areaX + (areaW - (inRow * (pw + 3) - 3)) / 2 + col * (pw + 3);
        const cy = top + (small ? 6 : 16) + row * rowH + (rows === 1 && !small ? 10 : 0);
        return <ellipse key={i} cx={x + pw / 2} cy={cy} rx={pw / 2} ry={pw / 4 + 2} fill="#fff" stroke="#7c3aed" strokeWidth="2" />;
      })}
    </Frame>
  );
};

/** Maradékos csoportok: d-s csoportok karikában, maradék piros pötty. */
export const RemainderCard: React.FC<{ n: number; d: number; small?: boolean }> = ({ n, d, small = false }) => {
  const W = small ? 80 : 150;
  const q = Math.floor(n / d);
  const r = n % d;
  const blocks = q + (r > 0 ? 1 : 0);
  const cols = Math.min(d, 5);
  const rowsIn = Math.ceil(d / 5);
  const perRow = small ? Math.min(blocks, 3) : Math.min(blocks, 5);
  const blockRows = Math.ceil(blocks / perRow);
  const gap = 3;
  const bw = (W - 10 - (perRow - 1) * gap) / perRow;
  const bh = (70 - (blockRows - 1) * gap) / blockRows;
  const s = Math.min((bw - 4) / cols, (bh - 4) / rowsIn, 9);
  return (
    <Frame W={W} fill="#f5f3ff">
      {Array.from({ length: blocks }, (_, bi) => {
        const row = Math.floor(bi / perRow);
        const col = bi % perRow;
        const inRow = Math.min(perRow, blocks - row * perRow);
        const bx = (W - (inRow * (bw + gap) - gap)) / 2 + col * (bw + gap);
        const by = 5 + row * (bh + gap);
        const rest = bi === q;
        const cnt = rest ? r : d;
        const ox = bx + (bw - cols * s) / 2;
        const oy = by + (bh - rowsIn * s) / 2;
        return (
          <g key={bi}>
            {!rest && <rect x={bx} y={by} width={bw} height={bh} rx="5" fill="#fff" stroke="#6d28d9" strokeWidth="1.8" />}
            {Array.from({ length: cnt }, (_, k) => (
              <circle key={k} cx={ox + s * ((k % 5) + 0.5)} cy={oy + s * (Math.floor(k / 5) + 0.5)} r={s * 0.36} fill={rest ? UNK : '#7c3aed'} />
            ))}
          </g>
        );
      })}
    </Frame>
  );
};

/** „Hány kell?” kártya: tároló a befogadóképességgel + az összes. */
export const BoatsCard: React.FC<{ total: number; each: number; kind?: Holder; small?: boolean }> = ({ total, each, kind = 'boat', small = false }) => {
  const W = small ? 80 : 150;
  return (
    <Frame W={W} fill="#f0f9ff">
      <HolderIcon kind={kind} x={small ? 8 : 10} y={small ? 8 : 14} w={small ? 34 : 54} h={small ? 26 : 38} />
      <text x={small ? 25 : 37} y={small ? 30 : 44} textAnchor="middle" fontSize={small ? 13 : 17} fontWeight="900" fill={INK}>
        {each}
      </text>
      <text x={small ? 60 : 108} y={small ? 28 : 40} textAnchor="middle" fontSize={small ? 11 : 13} fontWeight="bold" fill="#334155">
        {small ? 'fér' : 'fér egybe'}
      </text>
      <text x={W / 2} y={small ? 62 : 70} textAnchor="middle" fontSize={small ? 16 : 18} fontWeight="900" fill="#0369a1">
        {small ? `${total} → ?` : `${total} gyerek → ?`}
      </text>
    </Frame>
  );
};
