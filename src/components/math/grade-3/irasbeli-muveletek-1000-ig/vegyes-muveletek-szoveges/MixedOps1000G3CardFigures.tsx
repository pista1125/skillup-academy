import React from 'react';
import { Coin, TxtBox } from '../muveleti-sorrend/OrderOps1000G3Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek (Párosító 150 × 80, Csoportosító 80 × 80):
// rész–egész szalag □-gyel, utca két szakasszal, érmék, két szalag összehasonlításhoz.
// A végeredmény sosincs a képen.
// ---------------------------------------------------------------------------

export { ChainCard, SmallChain, SmallWallet } from '../muveleti-sorrend/OrderOps1000G3CardFigures';

const FONT = 'system-ui, Segoe UI, sans-serif';
const INK = '#0f172a';
const RED = '#dc2626';
const tc = (t: string) => (t === '□' || t === '?' ? RED : INK);

/** Rész–egész: fölül az egész, alul két rész (egyik lehet □). */
export const MiniBar: React.FC<{ whole: string; a: string; b: string; wa?: number; vb?: 'm' | 's' }> = ({ whole, a, b, wa = 0.55, vb = 'm' }) => {
  const W = vb === 'm' ? 150 : 80;
  const fs = vb === 'm' ? 22 : 17;
  const x0 = 3;
  const w = W - 6;
  return (
    <svg viewBox={`0 0 ${W} ${vb === 'm' ? 80 : 80}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={x0} y="3" width={w} height="34" rx="6" fill={whole === '□' ? '#fee2e2' : '#e0f2fe'} stroke={whole === '□' ? RED : '#0369a1'} strokeWidth="3" />
      <TxtBox x={W / 2} y={vb === 'm' ? 28 : 26} t={whole} fs={fs} fill={tc(whole)} />
      <rect x={x0} y="43" width={w * wa} height="34" rx="6" fill={a === '□' ? '#fee2e2' : '#fed7aa'} stroke={a === '□' ? RED : '#c2410c'} strokeWidth="3" />
      <TxtBox x={x0 + (w * wa) / 2} y={vb === 'm' ? 68 : 66} t={a} fs={fs} fill={tc(a)} />
      <rect x={x0 + w * wa} y="43" width={w * (1 - wa)} height="34" rx="6" fill={b === '□' ? '#fee2e2' : '#bbf7d0'} stroke={b === '□' ? RED : '#15803d'} strokeWidth="3" />
      <TxtBox x={x0 + w * wa + (w * (1 - wa)) / 2} y={vb === 'm' ? 68 : 66} t={b} fs={fs} fill={tc(b)} />
    </svg>
  );
};

/** Utca három pöttyel és két szakasszal. */
export const MiniRoute: React.FC<{ d1: string; d2: string; vb?: 'm' | 's' }> = ({ d1, d2, vb = 'm' }) => {
  const W = vb === 'm' ? 150 : 80;
  const fs = vb === 'm' ? 21 : 16;
  const xs = [8, W / 2, W - 8];
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="2" y="50" width={W - 4} height="12" rx="6" fill="#cbd5e1" />
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy="56" r="7" fill={['#f97316', '#3b82f6', '#22c55e'][i]} stroke="#1e293b" strokeWidth="2.5" />
      ))}
      {vb === 'm' ? (
        <g>
          <text x={(xs[0] + xs[1]) / 2} y="40" textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#1d4ed8">{d1}</text>
          <text x={(xs[1] + xs[2]) / 2} y="40" textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#1d4ed8">{d2}</text>
        </g>
      ) : (
        <g>
          <text x={(xs[0] + xs[1]) / 2} y="40" textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#1d4ed8">{d1}</text>
          <text x={(xs[1] + xs[2]) / 2} y="22" textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#1d4ed8">{d2}</text>
          <line x1={(xs[1] + xs[2]) / 2} y1="26" x2={(xs[1] + xs[2]) / 2} y2="48" stroke="#1d4ed8" strokeWidth="2" />
        </g>
      )}
      <text x={W / 2} y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">m</text>
    </svg>
  );
};

/** Érmék (150 × 80). */
export const MiniCoins: React.FC<{ coins: number[] }> = ({ coins }) => {
  const step = Math.min(34, 140 / coins.length);
  const x0 = 75 - ((coins.length - 1) * step) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {coins.map((c, i) => (
        <Coin key={i} cx={x0 + i * step} cy={40} v={c} r={c >= 200 ? 19 : 17} />
      ))}
    </svg>
  );
};

/** Két szalag egymás alatt: a második „+d” vagy „−d” eltéréssel. */
export const MiniRows: React.FC<{ a: string; diff: string; more: boolean; vb?: 'm' | 's' }> = ({ a, diff, more, vb = 'm' }) => {
  const W = vb === 'm' ? 150 : 80;
  const fs = vb === 'm' ? 20 : 15;
  const base = more ? W * 0.58 : W - 6;
  const ext = more ? W - 6 - base : W * 0.36;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="3" y="4" width={base} height="32" rx="5" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
      <text x={3 + base / 2} y="27" textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>{a}</text>
      {more ? (
        <g>
          <rect x="3" y="44" width={base} height="32" rx="5" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
          <rect x={3 + base} y="44" width={ext} height="32" rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="3" />
          <text x={3 + base + ext / 2} y="67" textAnchor="middle" fontSize={fs - 2} fontWeight="bold" fill={INK}>{diff}</text>
        </g>
      ) : (
        <g>
          <rect x="3" y="44" width={W - 6 - ext} height="32" rx="5" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
          <rect x={W - 3 - ext} y="44" width={ext} height="32" rx="5" fill="#fff" stroke="#b91c1c" strokeWidth="3" strokeDasharray="5 4" />
          <text x={W - 3 - ext / 2} y="67" textAnchor="middle" fontSize={fs - 2} fontWeight="bold" fill="#b91c1c">{diff}</text>
        </g>
      )}
    </svg>
  );
};
