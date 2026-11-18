import React from 'react';
import { FONT, INK, UNK, CoinG } from './MultExamG2Parts';

// ---------------------------------------------------------------------------
// 10. Gyakorlás, tudáspróba (IV. Szorzás) – kártyaképek
// Párosító: 150 × 80, Csoportosító (small): 80 × 80. A DivExamG2 is használja.
// ---------------------------------------------------------------------------

const Frame: React.FC<{ W: number; fill: string; children: React.ReactNode }> = ({ W, fill, children }) => (
  <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="2" y="2" width={W - 4} height="76" rx="10" fill={fill} stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Zsákok pöttyökkel. sizes = csoportonként hány pötty. */
export const GroupsCard: React.FC<{ sizes: number[]; small?: boolean; split?: number }> = ({ sizes, small = false, split = 0 }) => {
  const W = small ? 80 : 150;
  const n = sizes.length;
  const perRow = small ? Math.min(n, n > 4 ? 3 : 2) : Math.min(n, 5);
  const rows = Math.ceil(n / perRow);
  const gap = 4;
  const bw = (W - 12 - (perRow - 1) * gap) / perRow;
  const bh = (68 - (rows - 1) * gap) / rows;
  const maxEach = Math.max(...sizes, 1);
  const dc = maxEach <= 3 ? maxEach : Math.ceil(maxEach / 2);
  const dr = maxEach <= 3 ? 1 : 2;
  const s = Math.min((bw - 4) / dc, (bh - 4) / dr, 12);
  return (
    <Frame W={W} fill="#fff7ed">
      {sizes.map((size, gi) => {
        const row = Math.floor(gi / perRow);
        const col = gi % perRow;
        const inRow = Math.min(perRow, n - row * perRow);
        const bx = (W - (inRow * (bw + gap) - gap)) / 2 + col * (bw + gap);
        const by = 6 + row * (bh + gap);
        const ox = bx + (bw - dc * s) / 2;
        const oy = by + (bh - dr * s) / 2;
        return (
          <g key={gi}>
            <rect x={bx} y={by} width={bw} height={bh} rx="6" fill="#fff" stroke="#9a3412" strokeWidth="2" />
            {Array.from({ length: size }, (_, i) => (
              <circle
                key={i}
                cx={ox + s * ((i % dc) + 0.5)}
                cy={oy + s * (Math.floor(i / dc) + 0.5)}
                r={s * 0.36}
                fill={i < split ? '#3b82f6' : '#ec4899'}
              />
            ))}
          </g>
        );
      })}
    </Frame>
  );
};

/** Rácspontok. */
export const ArrayCard: React.FC<{ rows: number; cols: number; small?: boolean }> = ({ rows, cols, small = false }) => {
  const W = small ? 80 : 150;
  const step = Math.min((W - 14) / cols, 66 / rows, 14);
  const x0 = (W - cols * step) / 2;
  const y0 = (80 - rows * step) / 2;
  return (
    <Frame W={W} fill="#eff6ff">
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <circle key={`${r}-${c}`} cx={x0 + step * (c + 0.5)} cy={y0 + step * (r + 0.5)} r={step * 0.36} fill="#2563eb" />
        ))
      )}
    </Frame>
  );
};

/** Ugrások 0-tól. askJumps: a végpont adott, az ugrások száma a kérdés. */
export const JumpsCard: React.FC<{ step: number; jumps: number; small?: boolean; endLabel?: string; askJumps?: boolean }> = ({
  step,
  jumps,
  small = false,
  endLabel,
  askJumps = false,
}) => {
  const W = small ? 80 : 150;
  const x0 = 10;
  const len = W - 22;
  const g = len / jumps;
  const y = small ? 50 : 52;
  const end = endLabel ?? (askJumps ? String(step * jumps) : '?');
  return (
    <Frame W={W} fill="#faf5ff">
      <text x={W / 2} y={small ? 17 : 18} textAnchor="middle" fontSize={small ? 11 : 13} fontWeight="900" fill="#6b21a8">
        {askJumps ? (small ? `+${step}, hány?` : `+${step}, hány ugrás?`) : small ? `+${step}` : `${jumps} ugrás: +${step}`}
      </text>
      <line x1={x0 - 3} y1={y} x2={x0 + len + 4} y2={y} stroke="#334155" strokeWidth="2.5" />
      {askJumps && (
        <g>
          <path d={`M ${x0} ${y} Q ${x0 + g / 2} ${y - Math.min(20, g + 4)} ${x0 + g} ${y}`} fill="none" stroke="#a855f7" strokeWidth="2.2" />
          <path d={`M ${x0 + g + 3} ${y - 8} H ${x0 + len - 4}`} stroke="#a855f7" strokeWidth="2.2" strokeDasharray="4 4" />
        </g>
      )}
      {!askJumps && Array.from({ length: jumps }, (_, i) => {
        const a = x0 + i * g;
        const b = a + g;
        return <path key={i} d={`M ${a} ${y} Q ${(a + b) / 2} ${y - Math.min(20, g + 4)} ${b} ${y}`} fill="none" stroke="#a855f7" strokeWidth="2.2" />;
      })}
      <text x={x0} y={y + 18} textAnchor="middle" fontSize="12" fontWeight="900" fill={INK}>
        0
      </text>
      <text x={x0 + len} y={y + 19} textAnchor="middle" fontSize={small ? 13 : 15} fontWeight="900" fill={end === '?' ? UNK : INK}>
        {end}
      </text>
    </Frame>
  );
};

/** Érmék. */
export const CoinsCard: React.FC<{ values: number[]; small?: boolean }> = ({ values, small = false }) => {
  const W = small ? 80 : 150;
  const perRow = small ? 3 : 5;
  const rows = Math.ceil(values.length / perRow);
  const scale = small ? 0.9 : rows > 1 ? 0.95 : 1.15;
  const step = small ? 25 : 28;
  const rowH = rows > 1 ? 32 : 0;
  return (
    <Frame W={W} fill="#fefce8">
      {values.map((v, i) => {
        const row = Math.floor(i / perRow);
        const col = i % perRow;
        const inRow = Math.min(perRow, values.length - row * perRow);
        const x0 = W / 2 - ((inRow - 1) * step) / 2;
        return <CoinG key={i} cx={x0 + col * step} cy={40 - (rowH * (rows - 1)) / 2 + row * rowH} value={v} scale={scale} />;
      })}
    </Frame>
  );
};

/** Műveletlánc: start → op1 → … → ? (csak 150 széles). */
export const ChainCard: React.FC<{ start: number; ops: string[] }> = ({ start, ops }) => {
  const W = 150;
  const n = ops.length + 1;
  const bw = 32;
  const gap = (W - 12 - n * bw) / (n - 1);
  return (
    <Frame W={W} fill="#f0fdf4">
      {Array.from({ length: n }, (_, i) => {
        const x = 6 + i * (bw + gap);
        const last = i === n - 1;
        const txt = i === 0 ? String(start) : last ? '?' : '';
        return (
          <g key={i}>
            <rect x={x} y={40} width={bw} height={28} rx="6" fill={last ? '#fee2e2' : '#fff'} stroke={last ? UNK : '#15803d'} strokeWidth="2.2" />
            <text x={x + bw / 2} y={60} textAnchor="middle" fontSize="14" fontWeight="900" fill={last ? UNK : INK}>
              {txt}
            </text>
          </g>
        );
      })}
      {ops.map((op, i) => {
        const a = 6 + i * (bw + gap) + bw / 2;
        const b = 6 + (i + 1) * (bw + gap) + bw / 2;
        return (
          <g key={i}>
            <path d={`M ${a + 6} 38 Q ${(a + b) / 2} 24 ${b - 6} 38`} fill="none" stroke="#16a34a" strokeWidth="2.2" />
            <text x={(a + b) / 2} y={22} textAnchor="middle" fontSize="13" fontWeight="900" fill="#166534">
              {op}
            </text>
          </g>
        );
      })}
    </Frame>
  );
};
