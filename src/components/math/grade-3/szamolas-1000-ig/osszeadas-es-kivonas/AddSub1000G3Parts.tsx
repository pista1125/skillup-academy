import React from 'react';
import { FONT, UNK, rnd, shuffle } from '../szamok-1000-ig/Numbers1000G3Parts';

// Rajzelemek és labor-generátorok a 3. leckéhez (Összeadás és kivonás 1000-ig, kerek tízesekkel).

export interface Jump {
  by: number;
  label?: string;
}

/**
 * Számegyenes ugrásokkal (W széles, saját <g>-ben). A kezdőpont felirata látszik,
 * a köztes és a végpont felirata: showMid / endLabel ('?' = keresett).
 */
export const JumpLine: React.FC<{
  lo: number;
  hi: number;
  tick: number;
  labels: number[];
  start: number;
  jumps: Jump[];
  W?: number;
  y?: number;
  showMid?: boolean;
  endLabel?: string;
}> = ({ lo, hi, tick, labels, start, jumps, W = 240, y = 70, showMid = false, endLabel = '?' }) => {
  const x0 = 18;
  const x1 = W - 22;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += tick) ticks.push(v);
  const pts = [start];
  jumps.forEach((j) => pts.push(pts[pts.length - 1] + j.by));
  return (
    <g fontFamily={FONT}>
      <line x1={x0 - 8} y1={y} x2={x1 + 8} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 8} ${y - 4} L ${x1 + 15} ${y} L ${x1 + 8} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => {
        const big = v % 100 === 0;
        return <line key={v} x1={X(v)} y1={y - (big ? 8 : 4)} x2={X(v)} y2={y + (big ? 8 : 4)} stroke="#334155" strokeWidth={big ? 1.8 : 0.9} />;
      })}
      {labels.map((v) => (
        <text key={`l${v}`} x={X(v)} y={y + 21} textAnchor="middle" fontSize="11" fill="#475569">{v}</text>
      ))}
      {jumps.map((j, i) => {
        const a = X(pts[i]);
        const b = X(pts[i + 1]);
        const col = j.by > 0 ? '#16a34a' : '#ea580c';
        const h = Math.min(34, 12 + Math.abs(b - a) * 0.35);
        const dir = b > a ? 1 : -1;
        return (
          <g key={i}>
            <path d={`M ${a} ${y - 6} Q ${(a + b) / 2} ${y - 6 - h * 2} ${b} ${y - 7}`} fill="none" stroke={col} strokeWidth="2.2" />
            <path d={`M ${b - dir * 7} ${y - 14} L ${b} ${y - 7} L ${b - dir * 1} ${y - 17}`} fill="none" stroke={col} strokeWidth="2.2" />
            <text x={Math.abs(b - a) < 34 ? Math.min(a, b) - 4 : (a + b) / 2} y={Math.abs(b - a) < 34 ? y - 12 : y - 10 - h} textAnchor={Math.abs(b - a) < 34 ? 'end' : 'middle'} fontSize="12" fontWeight="bold" fill={col}>{j.label ?? (j.by > 0 ? `+${j.by}` : `−${-j.by}`)}</text>
          </g>
        );
      })}
      <circle cx={X(start)} cy={y} r="4.5" fill="#2563eb" stroke="#fff" />
      <text x={X(start)} y={y + 34} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1d4ed8">{start}</text>
      {showMid &&
        pts.slice(1, -1).map((p, i) => (
          <g key={`m${i}`}>
            <circle cx={X(p)} cy={y} r="3.5" fill="#64748b" />
            <text x={X(p)} y={y + 34} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{p}</text>
          </g>
        ))}
      <circle cx={X(pts[pts.length - 1])} cy={y} r="4.5" fill={endLabel === '?' ? UNK : '#16a34a'} stroke="#fff" />
      <text x={X(pts[pts.length - 1])} y={y + 34} textAnchor="middle" fontSize={endLabel === '?' ? 14 : 12} fontWeight="bold" fill={endLabel === '?' ? UNK : '#15803d'}>{endLabel}</text>
    </g>
  );
};

/** Csík: egész (total) = ismert rész + ismeretlen rész. */
export const PartBar: React.FC<{ x: number; y: number; w: number; total: string; known: number; whole: number; knownLabel?: string; unknownLabel?: string; h?: number }> = ({
  x,
  y,
  w,
  total,
  known,
  whole,
  knownLabel,
  unknownLabel = '?',
  h = 30
}) => {
  const kw = (w * known) / whole;
  return (
    <g fontFamily={FONT}>
      <path d={`M ${x} ${y - 6} L ${x} ${y - 12} L ${x + w} ${y - 12} L ${x + w} ${y - 6}`} fill="none" stroke="#334155" strokeWidth="1.5" />
      <text x={x + w / 2} y={y - 17} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{total}</text>
      <rect x={x} y={y} width={kw} height={h} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.8" />
      <rect x={x + kw} y={y} width={w - kw} height={h} fill="#fee2e2" stroke={UNK} strokeWidth="1.8" />
      <text x={x + kw / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e3a8a">{knownLabel ?? known}</text>
      <text x={x + kw + (w - kw) / 2} y={y + h / 2 + 6} textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>{unknownLabel}</text>
    </g>
  );
};

/** Árcédula. */
export const Tag: React.FC<{ x: number; y: number; price: number; w?: number; label?: string }> = ({ x, y, price, w = 64, label }) => (
  <g fontFamily={FONT}>
    <path d={`M ${x} ${y} L ${x + w - 12} ${y} L ${x + w} ${y + 14} L ${x + w - 12} ${y + 28} L ${x} ${y + 28} Z`} fill="#fef9c3" stroke="#a16207" strokeWidth="1.8" />
    <circle cx={x + w - 9} cy={y + 14} r="2.6" fill="#fff" stroke="#a16207" />
    <text x={x + (w - 12) / 2} y={y + 19} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{price} Ft</text>
    {label && <text x={x + (w - 12) / 2} y={y + 42} textAnchor="middle" fontSize="11" fill="#475569">{label}</text>}
  </g>
);

// ---------------------------------------------------------------------------
// Labor I – Pótold 1000-re!
// ---------------------------------------------------------------------------
export const makeFillStart = (prev?: number) => {
  let s = 0;
  do s = rnd(11, 99) * 10;
  while (s === prev || s % 100 === 0);
  return s;
};
export const fillOptions = (start: number) => {
  const ans = 1000 - start;
  const wrong = [
    (10 - Math.floor(start / 100)) * 100 + (10 - (Math.floor(start / 10) % 10)) * 10, // mindkét jegyet 10-re pótolja (740 → 360)
    ans + 100,
    ans - 100,
    ans + 10
  ].filter((w) => w > 0 && w < 1000 && w !== ans);
  const out = [ans];
  for (const w of wrong) if (!out.includes(w) && out.length < 3) out.push(w);
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Labor II – Bevásárlás 1000 Ft-ból
// ---------------------------------------------------------------------------
export interface ShopItem {
  name: string;
  price: number;
}
const NAMES = ['füzet', 'ceruza', 'radír', 'vonalzó', 'festék', 'zsírkréta', 'matrica', 'könyv', 'tolltartó', 'ragasztó', 'olló', 'színes lap'];

/** Hat termék kerek tízes árral (90–690 Ft), legalább két pár, ami belefér az 1000 Ft-ba. */
export const makeShop = (): ShopItem[] => {
  for (;;) {
    const names = shuffle(NAMES).slice(0, 6);
    const items = names.map((name) => ({ name, price: rnd(9, 69) * 10 }));
    let pairs = 0;
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (items[i].price + items[j].price <= 1000) pairs++;
    if (pairs >= 6) return items;
  }
};

/** Három lehetőség: a jó és két tipikus hiba (elfelejtett átlépés, ±100). */
export const threeOptions = (ans: number, forgotCarry: number) => {
  const cands = [forgotCarry, ans + 100, ans - 100, ans + 10, ans - 10].filter((w) => w >= 0 && w <= 1000 && w !== ans);
  const out = [ans];
  for (const w of cands) if (!out.includes(w) && out.length < 3) out.push(w);
  return shuffle(out);
};
