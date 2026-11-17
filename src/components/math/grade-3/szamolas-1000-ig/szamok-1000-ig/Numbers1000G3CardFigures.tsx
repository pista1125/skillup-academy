import React from 'react';
import { FONT, UNK, Coin, Note } from './Numbers1000G3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Párosító: fent a százas lapok (legfeljebb 9), lent a rudak és a kockák. */
export const MiniBlocks: React.FC<{ h?: number; t?: number; e?: number }> = ({ h = 6, t = 2, e = 4 }) => {
  const f = h ? Math.min(18, (146 - (h - 1) * 2) / h) : 0;
  const w1 = h * (f + 2) - 2;
  const cubeCols = Math.ceil(e / 3);
  const w2 = t * 9 + (t && e ? 5 : 0) + cubeCols * 9;
  const x1 = (150 - w1) / 2;
  const x2 = (150 - w2) / 2;
  const y2 = h ? 5 + f + 6 : 14;
  const rodH = 76 - y2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: h }, (_, i) => (
        <g key={`h${i}`}>
          <rect x={x1 + i * (f + 2)} y="5" width={f} height={f} fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
          <line x1={x1 + i * (f + 2) + f / 2} y1="5" x2={x1 + i * (f + 2) + f / 2} y2={5 + f} stroke="#7f1d1d" strokeWidth="0.8" />
          <line x1={x1 + i * (f + 2)} y1={5 + f / 2} x2={x1 + i * (f + 2) + f} y2={5 + f / 2} stroke="#7f1d1d" strokeWidth="0.8" />
        </g>
      ))}
      {Array.from({ length: t }, (_, i) => (
        <rect key={`t${i}`} x={x2 + i * 9} y={y2} width="6" height={rodH} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.6" />
      ))}
      {Array.from({ length: e }, (_, i) => {
        const col = Math.floor(i / 3);
        const row = i % 3;
        const cx = x2 + t * 9 + (t && e ? 5 : 0) + col * 9;
        return <rect key={`e${i}`} x={cx} y={y2 + rodH - 7 - row * 9} width="7" height="7" fill="#facc15" stroke="#854d0e" strokeWidth="1.4" />;
      })}
    </svg>
  );
};

/** Csoportosító (80 × 80): kupac számokkal – lap × a, rúd × b, kocka × c. */
export const SortPile: React.FC<{ h?: number; t?: number; e?: number }> = ({ h = 6, t = 3, e = 2 }) => {
  const rows: { n: number; icon: React.ReactNode }[] = [];
  if (h) rows.push({ n: h, icon: <rect x="5" y="-9" width="18" height="18" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" /> });
  if (t) rows.push({ n: t, icon: <rect x="11" y="-10" width="6" height="20" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2.5" /> });
  if (e) rows.push({ n: e, icon: <rect x="9" y="-5" width="10" height="10" fill="#facc15" stroke="#854d0e" strokeWidth="2.5" /> });
  const step = 25;
  const y0 = 40 - ((rows.length - 1) * step) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(0 ${y0 + i * step})`}>
          {r.icon}
          <text x="29" y="7" fontSize="20" fontWeight="bold" fill="#0f172a">× {r.n}</text>
        </g>
      ))}
    </svg>
  );
};

/** Párosító: számegyenes-részlet (10 osztás) egy ponttal; csak a két vége van kiírva. */
export const MiniLine: React.FC<{ lo?: number; hi?: number; v?: number }> = ({ lo = 0, hi = 1000, v = 700 }) => {
  const x0 = 18;
  const x1 = 132;
  const X = (n: number) => x0 + ((x1 - x0) * (n - lo)) / (hi - lo);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="8" y1="34" x2="142" y2="34" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => {
        const end = i === 0 || i === 10;
        const mid = i === 5;
        const x = x0 + ((x1 - x0) * i) / 10;
        return <line key={i} x1={x} y1={end ? 22 : mid ? 25 : 28} x2={x} y2={end ? 46 : mid ? 43 : 40} stroke="#334155" strokeWidth={end ? 3.5 : 2} />;
      })}
      <circle cx={X(v)} cy="34" r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
      <text x="4" y="70" textAnchor="start" fontSize="19" fontWeight="bold" fill="#b91c1c">{lo}</text>
      <text x="146" y="70" textAnchor="end" fontSize="19" fontWeight="bold" fill="#b91c1c">{hi}</text>
    </svg>
  );
};

/** Szám egy bekeretezett jeggyel (párosító: 150 × 80, csoportosító: small = 80 × 80). */
export const BoxedNum: React.FC<{ num?: string; idx?: number; small?: boolean }> = ({ num = '738', idx = 1, small }) => {
  const W = small ? 80 : 150;
  const cw = small ? Math.min(24, 74 / num.length) : 30;
  const x0 = W / 2 - (num.length * cw) / 2;
  const fs = small ? (num.length > 3 ? 22 : 26) : 34;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {num.split('').map((d, i) => (
        <g key={i}>
          {i === idx && <rect x={x0 + i * cw + 1} y="18" width={cw - 2} height="46" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />}
          <text x={x0 + i * cw + cw / 2} y="54" textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#1e293b">{d}</text>
        </g>
      ))}
    </svg>
  );
};

/** Párosító: pénz – bankjegyek (500, 1000) és érmék egy sorban. */
export const MiniMoney: React.FC<{ notes?: (500 | 1000)[]; coins?: number[] }> = ({ notes = [500], coins = [200, 100] }) => {
  const nw = 50;
  const cr = coins.length ? Math.min(15, ((144 - notes.length * (nw + 4)) / coins.length - 3) / 2) : 15;
  const total = notes.length * (nw + 4) + coins.length * (2 * cr + 3);
  let x = (150 - total) / 2;
  const parts: React.ReactNode[] = [];
  notes.forEach((v, i) => {
    parts.push(<Note key={`n${i}`} x={x} y={27} v={v} w={nw} />);
    x += nw + 4;
  });
  coins.forEach((v, i) => {
    parts.push(<Coin key={`c${i}`} cx={x + cr} cy={40} v={v} r={cr} />);
    x += 2 * cr + 3;
  });
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {parts}
    </svg>
  );
};

/** Csoportosító: számkártyák (80 × 80), egy hármas szám kártyákon. */
export const SortCards: React.FC<{ digits?: string[] }> = ({ digits = ['4', '0', '7'] }) => {
  const n = digits.length;
  const w = n === 4 ? 17 : 23;
  const gap = 2.5;
  const x0 = (80 - (n * w + (n - 1) * gap)) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {digits.map((d, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y="20" width={w} height="40" rx="5" fill={d === '?' ? '#fee2e2' : '#fff'} stroke={d === '?' ? UNK : '#334155'} strokeWidth="3" />
          <text x={x0 + i * (w + gap) + w / 2} y="49" textAnchor="middle" fontSize={n === 4 ? 20 : 24} fontWeight="bold" fill={d === '?' ? UNK : '#0f172a'}>{d}</text>
        </g>
      ))}
    </svg>
  );
};
