import React from 'react';
import { FONT, INK, UNK } from '../az-osszeg-valtozasai/SumChangesG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

const SEG = ['#93c5fd', '#fde68a', '#c4b5fd'];

/** Párosító: két árcédula „+” jellel. */
export const MiniTags: React.FC<{ a?: number; b?: number }> = ({ a = 236, b = 158 }) => {
  const tag = (x: number, p: number, fill: string) => (
    <g>
      <path d={`M ${x} 20 L ${x + 52} 20 L ${x + 64} 40 L ${x + 52} 60 L ${x} 60 Z`} fill={fill} stroke="#475569" strokeWidth="3" />
      <circle cx={x + 52} cy="40" r="3" fill="#475569" />
      <text x={x + 25} y="48" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>{p}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {tag(3, a, '#fef3c7')}
      <text x="75" y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>+</text>
      {tag(83, b, '#e0f2fe')}
    </svg>
  );
};

/** Párosító: csík részekből (2 vagy 3), fölötte „?”. */
export const MiniBar: React.FC<{ parts?: number[] }> = ({ parts = [163, 225] }) => {
  const sum = parts.reduce((s, p) => s + p, 0);
  const W = 140;
  let x = 5;
  const fs = parts.length === 3 ? 17 : 21;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <path d="M 5 30 L 5 22 L 145 22 L 145 30" fill="none" stroke="#475569" strokeWidth="3" />
      <rect x="62" y="2" width="26" height="22" rx="5" fill="#fee2e2" stroke={UNK} strokeWidth="2.5" />
      <text x="75" y="20" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
      {parts.map((p, k) => {
        const w = Math.max(30, (W * p) / sum);
        const el = (
          <g key={k}>
            <rect x={x} y="34" width={w} height="40" fill={SEG[k]} stroke="#475569" strokeWidth="3" />
            <text x={x + w / 2} y="61" textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>{p}</text>
          </g>
        );
        x += w;
        return el;
      })}
    </svg>
  );
};

/** Párosító: két csík – felül az ismert, alul ugyanannyi + a különbség, a végén „?”. */
export const MiniCompare: React.FC<{ a?: number; d?: number }> = ({ a = 175, d = 148 }) => {
  const W = 116;
  const wa = Math.min(72, Math.max(44, (W * a) / (a + d)));
  const wd = W - wa;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="4" y="6" width={wa} height="30" fill="#fde68a" stroke="#475569" strokeWidth="3" />
      <text x={4 + wa / 2} y="28" textAnchor="middle" fontSize="19" fontWeight="bold" fill={INK}>{a}</text>
      <rect x="4" y="44" width={wa} height="30" fill="#86efac" stroke="#475569" strokeWidth="3" />
      <text x={4 + wa / 2} y="66" textAnchor="middle" fontSize="19" fontWeight="bold" fill={INK}>{a}</text>
      <rect x={4 + wa} y="44" width={wd} height="30" fill="#f0fdf4" stroke={UNK} strokeWidth="3" strokeDasharray="6 4" />
      <text x={4 + wa + wd / 2} y="66" textAnchor="middle" fontSize="19" fontWeight="bold" fill={INK}>{d}</text>
      <text x="135" y="67" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Csoportosító: 2 vagy 3 árcédula egymás alatt. */
export const SortTags: React.FC<{ prices?: number[] }> = ({ prices = [236, 158] }) => {
  const n = prices.length;
  const h = n === 3 ? 22 : 30;
  const gap = n === 3 ? 4 : 8;
  const y0 = (80 - (n * h + (n - 1) * gap)) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {prices.map((p, i) => {
        const y = y0 + i * (h + gap);
        return (
          <g key={i}>
            <path d={`M 4 ${y} L 62 ${y} L 76 ${y + h / 2} L 62 ${y + h} L 4 ${y + h} Z`} fill={['#fef3c7', '#e0f2fe', '#dcfce7'][i]} stroke="#475569" strokeWidth="2.5" />
            <text x="34" y={y + h / 2 + (n === 3 ? 6.5 : 7.5)} textAnchor="middle" fontSize={n === 3 ? 18 : 21} fontWeight="bold" fill={INK}>{p}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Csoportosító: két csík, alul ugyanannyi + a különbség (szaggatott), a keresett az alsó csík. */
export const SortCompare: React.FC<{ a?: number; d?: number }> = ({ a = 175, d = 148 }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="3" y="6" width="38" height="28" fill="#fde68a" stroke="#475569" strokeWidth="2.5" />
    <text x="22" y="26" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{a}</text>
    <rect x="3" y="44" width="38" height="28" fill="#86efac" stroke="#475569" strokeWidth="2.5" />
    <text x="22" y="64" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{a}</text>
    <rect x="41" y="44" width="36" height="28" fill="#f0fdf4" stroke={UNK} strokeWidth="2.5" strokeDasharray="5 3" />
    <text x="59" y="64" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{d}</text>
    <text x="60" y="28" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
    <path d="M 60 33 L 60 41" stroke={UNK} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);
