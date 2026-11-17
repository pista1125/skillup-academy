import React from 'react';
import { FONT, Coin, C_SZ, C_T, C_E, ItemIcon, ItemKind, PLACE_BODY, PLACE_FILL } from './ThreeDigitSubG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: érmék két sorban (legfeljebb 4 egy sorban); az első `crossed` darab áthúzva (elköltöttük). */
export const MiniCoins: React.FC<{ coins?: number[]; crossed?: number }> = ({ coins = [100, 100, 50], crossed = 0 }) => {
  const r = 17;
  const gap = 3;
  const rows = coins.length > 4 ? [coins.slice(0, Math.ceil(coins.length / 2)), coins.slice(Math.ceil(coins.length / 2))] : [coins];
  let k = 0;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {rows.map((row, ri) => {
        const w = row.length * 2 * r + (row.length - 1) * gap;
        const x0 = (150 - w) / 2 + r;
        const cy = rows.length === 1 ? 40 : 20 + ri * 39;
        return row.map((v, i) => {
          const idx = k++;
          return <Coin key={idx} cx={x0 + i * (2 * r + gap)} cy={cy} v={v} r={r} crossed={idx < crossed} />;
        });
      })}
    </svg>
  );
};

/** Párosító: korongok helyi érték szerint (piros százas, kék tízes, sárga egyes); áthúzott = elvesszük. */
export const MiniDiscs: React.FC<{ sz: number; t: number; e?: number; csz?: number; ct?: number }> = ({ sz, t, e = 0, csz = 0, ct = 0 }) => {
  const groups: { n: number; c: string; edge: string; crossed: number }[] = [
    { n: sz, c: C_SZ, edge: '#7f1d1d', crossed: csz },
    { n: t, c: C_T, edge: '#1e3a8a', crossed: ct },
    { n: e, c: C_E, edge: '#a16207', crossed: 0 }
  ].filter((g) => g.n > 0);
  const per = 3;
  const cols = groups.reduce((s, g) => s + Math.min(g.n, per), 0);
  const step = Math.min(22, (146 - (groups.length - 1) * 8) / cols);
  const r = step * 0.42;
  const maxRows = Math.max(...groups.map((g) => Math.ceil(g.n / per)));
  const y0 = (80 - maxRows * step) / 2 + step / 2;
  const total = cols * step + (groups.length - 1) * 8;
  let x = (150 - total) / 2;
  const out: React.ReactNode[] = [];
  groups.forEach((g, gi) => {
    for (let i = 0; i < g.n; i++) {
      const cx = x + step / 2 + (i % per) * step;
      const cy = y0 + Math.floor(i / per) * step;
      const cr = i >= g.n - g.crossed;
      out.push(
        <g key={`${gi}-${i}`}>
          <circle cx={cx} cy={cy} r={r} fill={g.c} stroke={g.edge} strokeWidth="2" opacity={cr ? 0.4 : 1} />
          {cr && <line x1={cx - r - 1} y1={cy + r + 1} x2={cx + r + 1} y2={cy - r - 1} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />}
        </g>
      );
    }
    x += Math.min(g.n, per) * step + 8;
  });
  return <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">{out}</svg>;
};

/** Párosító: pénztárca összeggel és egy játék árcédulával. */
export const MiniBuy: React.FC<{ wallet: number; kind: ItemKind; price: number }> = ({ wallet, kind, price }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="4" y="18" width="62" height="44" rx="8" fill="#fde68a" stroke="#a16207" strokeWidth="3" />
    <text x="35" y="49" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#713f12">{wallet}</text>
    <text x="75" y="48" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">−</text>
    <ItemIcon kind={kind} cx={116} cy={24} s={0.85} />
    <rect x="86" y="44" width="60" height="28" rx="6" fill="#fff" stroke="#475569" strokeWidth="3" />
    <text x="116" y="66" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{price}</text>
  </svg>
);

/** Csoportosító: a kivonás helyiérték-táblázatban (piros sz, kék t, sárga e oszlop), nagy számjegyekkel. */
export const SortPlace: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const da = String(a).padStart(3, ' ').split('');
  const db = String(b).padStart(3, ' ').split('');
  const cw = 22;
  const x0 = 13;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x0 + i * cw} y="4" width={cw} height="8" fill={PLACE_FILL[i]} />
          <rect x={x0 + i * cw} y="12" width={cw} height="64" fill={PLACE_BODY[i]} />
          <text x={x0 + i * cw + cw / 2} y="36" textAnchor="middle" fontSize="23" fontWeight="bold" fill="#0f172a">{da[i].trim()}</text>
          <text x={x0 + i * cw + cw / 2} y="66" textAnchor="middle" fontSize="23" fontWeight="bold" fill="#0f172a">{db[i].trim()}</text>
        </g>
      ))}
      <text x="7" y="65" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#dc2626">−</text>
      <line x1="2" y1="73" x2="78" y2="73" stroke="#0f172a" strokeWidth="3" />
    </svg>
  );
};

/** Csoportosító: 500 Ft-ból vásárlás – árcédula nagy számmal. */
export const SortTag: React.FC<{ price: number; kind: ItemKind }> = ({ price, kind }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <ItemIcon kind={kind} cx={40} cy={24} s={1} />
    <rect x="6" y="46" width="68" height="28" rx="6" fill="#fff" stroke="#475569" strokeWidth="3" />
    <text x="40" y="68" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{price}</text>
  </svg>
);
