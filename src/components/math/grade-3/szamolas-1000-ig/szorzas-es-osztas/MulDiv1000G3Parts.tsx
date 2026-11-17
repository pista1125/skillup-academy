import React from 'react';
import { FONT, UNK, INK, QFig, Coin, Flat, Rod, PriceTag } from '../../szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3Parts';
import { RodGroups, Plate, HopLine, CoinGrid, NumBox } from '../../szamolas-500-ig/szorzas-es-osztas/MulDiv500G3Parts';

// ---------------------------------------------------------------------------
// Rajzelemek és feladat-generátorok a XI. fejezet 4. Szorzás és osztás (1000-ig) leckéjéhez.
// Az érme, a százas lap, a tízesrúd és a többi alapelem a V. fejezetből jön
// (egységes kinézet: százas = piros lap, tízes = kék rúd).
// ---------------------------------------------------------------------------

export { FONT, UNK, INK, QFig, Coin, Flat, Rod, PriceTag, RodGroups, Plate, HopLine, CoinGrid, NumBox };

/** 1000 forintos bankjegy. */
export const Note1000: React.FC<{ x: number; y: number; w?: number; h?: number }> = ({ x, y, w = 74, h = 38 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="4" fill="#bfdbfe" stroke="#1e40af" strokeWidth="2" />
    <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="3" fill="none" stroke="#3b82f6" strokeWidth="1" />
    <circle cx={x + w * 0.22} cy={y + h / 2} r={h * 0.22} fill="#93c5fd" stroke="#1e40af" strokeWidth="1" />
    <text x={x + w * 0.63} y={y + h / 2 + h * 0.16} textAnchor="middle" fontSize={h * 0.42} fontWeight="bold" fill="#1e3a8a" fontFamily={FONT}>1000</text>
  </g>
);

/** Százas-lap csoportok keretben (csoportonként per lap), sorokba tördelve. */
export const FlatGroups: React.FC<{ groups: number; per: number; x0?: number; y?: number; width?: number; s?: number }> = ({
  groups,
  per,
  x0 = 10,
  y = 12,
  width = 220,
  s = 22
}) => {
  const gw = per * (s + 3) - 3 + 10;
  const pl = Math.max(1, Math.min(groups, Math.floor((width + 6) / (gw + 6))));
  return (
    <g>
      {Array.from({ length: groups }).map((_, g) => {
        const line = Math.floor(g / pl);
        const inLine = Math.min(pl, groups - line * pl);
        const lineW = inLine * gw + (inLine - 1) * 6;
        const gx = x0 + (width - lineW) / 2 + (g % pl) * (gw + 6);
        const gy = y + line * (s + 16);
        return (
          <g key={g}>
            <rect x={gx} y={gy - 5} width={gw} height={s + 10} rx="6" fill="#fef2f2" stroke="#f87171" strokeWidth="1.3" />
            {Array.from({ length: per }).map((__, k) => (
              <Flat key={k} x={gx + 5 + k * (s + 3)} y={gy} s={s} />
            ))}
          </g>
        );
      })}
    </g>
  );
};
export const flatGroupsHeight = (groups: number, per: number, width = 220, s = 22) => {
  const gw = per * (s + 3) - 3 + 10;
  const pl = Math.max(1, Math.min(groups, Math.floor((width + 6) / (gw + 6))));
  return Math.ceil(groups / pl) * (s + 16);
};

// ---------------------------------------------------------------------------
// Segédfüggvények
// ---------------------------------------------------------------------------
export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
/** 4 különböző válasz 1 és 1000 között, a helyes is köztük. */
export const opts = (correct: number, wrong: number[]): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (Number.isInteger(w) && w > 0 && w <= 1000 && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  const step = correct >= 100 && correct % 100 === 0 ? 100 : correct >= 20 ? 10 : 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? step * Math.ceil(k / 2) : -step * Math.ceil(k / 2));
    if (w > 0 && w <= 1000 && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Labor I – Szorzótábla-lépcső: előbb a szorzótábla, aztán a nagy szám
// ---------------------------------------------------------------------------
export type StairKind = 'tizes' | 'szazas' | 'reszek' | 'benn';
export interface StairTask {
  kind: StairKind;
  a: number;
  b: number;
  small: string; // pl. „6 · 9”
  smallAns: number;
  smallOpts: number[];
  big: string; // pl. „6 · 90”
  bigAns: number;
  bigOpts: number[];
}

export const makeStairTask = (kind: StairKind): StairTask => {
  for (;;) {
    const a = rnd(2, 9);
    const b = rnd(kind === 'szazas' ? 1 : 2, 9);
    if (kind === 'tizes') {
      const p = a * b;
      return {
        kind, a, b,
        small: `${a} · ${b}`, smallAns: p, smallOpts: opts(p, [p + a, p - a, a + b]),
        big: `${a} · ${b * 10}`, bigAns: p * 10, bigOpts: opts(p * 10, [p, p * 100, (p + a) * 10, a + b * 10])
      };
    }
    if (kind === 'szazas') {
      const p = a * b;
      if (p > 10) continue;
      return {
        kind, a, b,
        small: `${a} · ${b}`, smallAns: p, smallOpts: opts(p, [p + a, p - 1, a + b]),
        big: `${a} · ${b * 100}`, bigAns: p * 100, bigOpts: opts(p * 100, [p * 10, p, (p + 1) * 100, a + b * 100])
      };
    }
    // osztás: n = a · b tízes
    const n = a * b * 10;
    if (kind === 'reszek') {
      return {
        kind, a, b,
        small: `${a * b} : ${a}`, smallAns: b, smallOpts: opts(b, [b + 1, b - 1, a]),
        big: `${n} : ${a}`, bigAns: b * 10, bigOpts: opts(b * 10, [b, (b + 1) * 10, n - a, b * 100])
      };
    }
    return {
      kind, a, b,
      small: `${a * b} : ${a}`, smallAns: b, smallOpts: opts(b, [b + 1, b - 1, a]),
      big: `${n} : ${a * 10}`, bigAns: b, bigOpts: opts(b, [b * 10, b + 1, b - 1])
    };
  }
};

// ---------------------------------------------------------------------------
// Labor II – Pénzváltó: hány érmére váltható az összeg?
// ---------------------------------------------------------------------------
export interface ExchangeTask {
  total: number; // forint, legfeljebb 1000
  coin: number; // 10, 20, 50, 100 vagy 200
  count: number; // total : coin, legfeljebb 10
  countOpts: number[];
}

export const EXCHANGE_COINS = [20, 50, 100, 200, 50, 100];

export const makeExchangeTask = (): ExchangeTask => {
  for (;;) {
    const coin = EXCHANGE_COINS[rnd(0, EXCHANGE_COINS.length - 1)];
    const count = rnd(2, 10);
    const total = coin * count;
    if (total > 1000 || total < 100) continue;
    return { total, coin, count, countOpts: opts(count, [count * 10, count + 1, count - 1, total / 10]) };
  }
};
