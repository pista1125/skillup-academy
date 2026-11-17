import React from 'react';
import { FONT, UNK, CoinRow, coinRowWidth, MiniBlocks, miniBlocksWidth } from './MulOneDigitG3Parts';

// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: egy sor pénz (kerek tízes összeg), alatta nagy „· m”. */
export const CardCoins: React.FC<{ a: number; m: number }> = ({ a, m }) => {
  const w = coinRowWidth(a, 11, 7.5);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <CoinRow x={(150 - w) / 2} cy={24} amount={a} r100={11} r10={7.5} />
      <text x="75" y="70" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#7c3aed">· {m}</text>
    </svg>
  );
};

/** Párosító: a szám kirakva (lap, rúd, kocka), alatta nagy „· m”. */
export const CardBlocks: React.FC<{ n: number; m: number }> = ({ n, m }) => {
  const s = 28;
  const w = miniBlocksWidth(n, s);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <MiniBlocks x={(150 - w) / 2} y={6} n={n} s={s} />
      <text x="75" y="72" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#7c3aed">· {m}</text>
    </svg>
  );
};

/** Csoportosító: a szám kirakva, alatta „· m”. */
export const SortBlocks: React.FC<{ n: number; m: number }> = ({ n, m }) => {
  const s = 22;
  const w = miniBlocksWidth(n, s);
  const sc = w > 74 ? 74 / w : 1;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <g transform={`translate(${(80 - w * sc) / 2} 8) scale(${sc})`}>
        <MiniBlocks x={0} y={0} n={n} s={s} />
      </g>
      <text x="40" y="66" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#7c3aed">· {m}</text>
    </svg>
  );
};

/** Csoportosító: szorzólánc fentről lefelé: a → ? → b. */
export const SortChain: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <text x="40" y="22" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{a}</text>
    <line x1="26" y1="30" x2="26" y2="52" stroke="#7c3aed" strokeWidth="3" />
    <path d="M 26 58 L 20 48 L 32 48 Z" fill="#7c3aed" />
    <text x="52" y="49" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>· ?</text>
    <text x="40" y="76" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#1d4ed8">{b}</text>
  </svg>
);
