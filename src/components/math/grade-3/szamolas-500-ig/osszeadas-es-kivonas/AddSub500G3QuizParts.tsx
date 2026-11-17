import React from 'react';
import { UNK, QFig, Coin, Note500, PriceTag, Blocks, blocksWidth, JumpLine, Jump, Bar500 } from './AddSub500G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const CLS = 'w-full max-w-[280px] h-auto mx-auto';

export const Jumps: React.FC<{ lo: number; hi: number; start: number; jumps: Jump[]; minus?: boolean }> = ({ lo, hi, start, jumps, minus }) => (
  <JumpLine lo={lo} hi={hi} start={start} jumps={jumps} hideEnd W={240} H={112} fs={12.5} className={CLS} color={minus ? '#ea580c' : '#16a34a'} />
);

/** Érmék sorban; csoportok között „+”. */
export const CoinsFig: React.FC<{ groups: number[][]; caption?: string }> = ({ groups, caption }) => {
  const n = groups.reduce((a, gr) => a + gr.length, 0);
  const r = Math.min(16, ((226 - (groups.length - 1) * 22) / n - 4) / 2);
  const g = 2 * r + 4;
  const widths = groups.map((gr) => gr.length * g);
  const total = widths.reduce((a, b) => a + b, 0) + (groups.length - 1) * 22;
  let x = (240 - total) / 2 + r + 2;
  const items: React.ReactNode[] = [];
  groups.forEach((gr, gi) => {
    gr.forEach((v, i) => {
      items.push(<Coin key={`${gi}-${i}`} cx={x} cy={38} v={v} r={v >= 100 ? r + 2 : r} />);
      x += g;
    });
    if (gi < groups.length - 1) {
      items.push(<text key={`p${gi}`} x={x - r + 6} y="45" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">+</text>);
      x += 22;
    }
  });
  return (
    <QFig h={caption ? 88 : 74}>
      {items}
      {caption && <text x="120" y="80" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#92400e">{caption}</text>}
    </QFig>
  );
};

/** Százas lapok és tízesrudak két csoportban, „+” jellel. */
export const BlocksFig: React.FC<{ a: [number, number]; b?: [number, number] }> = ({ a, b }) => {
  const s = 34;
  const wa = blocksWidth(a[0], a[1], s);
  const wb = b ? blocksWidth(b[0], b[1], s) : 0;
  const total = wa + (b ? 26 + wb : 0);
  const x0 = (240 - total) / 2;
  return (
    <QFig h={90}>
      <Blocks x={x0} y={14} sz={a[0]} t={a[1]} s={s} />
      {b && <text x={x0 + wa + 13} y="38" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">+</text>}
      {b && <Blocks x={x0 + wa + 26} y={14} sz={b[0]} t={b[1]} s={s} />}
      <text x="120" y="76" textAnchor="middle" fontSize="11.5" fill="#475569">piros lap = 100, kék rúd = 10</text>
    </QFig>
  );
};

/** Csík az 500-ig. */
export const BarFig: React.FC<{ known: number; total?: number }> = ({ known, total = 500 }) => (
  <QFig h={92}>
    <Bar500 known={known} total={total} x={20} y={36} W={200} h={32} fs={15} showTicks={total === 500} />
  </QFig>
);

/** Két csík összehasonlítása. Ha `hide`, a csík értéke „?”; a különbség felirata `diff`. */
export const CompareFig: React.FC<{ a: { name: string; v: number }; b: { name: string; v: number; hide?: boolean }; diff: string }> = ({ a, b, diff }) => {
  const max = Math.max(a.v, b.v);
  const W = 150;
  const x0 = 66;
  const wa = (W * a.v) / max;
  const wb = (W * b.v) / max;
  const small = Math.min(wa, wb);
  const dq = diff === '?';
  return (
    <QFig h={106}>
      <text x={x0 - 6} y="34" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">{a.name}</text>
      <rect x={x0} y="20" width={wa} height="20" rx="3" fill="#60a5fa" stroke="#1e3a8a" />
      <text x={x0 + wa / 2} y="35" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{a.v}</text>
      <text x={x0 - 6} y="66" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">{b.name}</text>
      <rect x={x0} y="52" width={wb} height="20" rx="3" fill={b.hide ? '#fee2e2' : '#f472b6'} stroke={b.hide ? UNK : '#831843'} strokeDasharray={b.hide ? '4 3' : undefined} />
      <text x={x0 + wb / 2} y="67" textAnchor="middle" fontSize={b.hide ? 15 : 13} fontWeight="bold" fill={b.hide ? UNK : '#0f172a'}>{b.hide ? '?' : b.v}</text>
      <line x1={x0 + small} y1="16" x2={x0 + small} y2="80" stroke="#64748b" strokeDasharray="3 3" />
      <path d={`M ${x0 + small} 80 L ${x0 + small} 86 L ${x0 + W} 86 L ${x0 + W} 80`} fill="none" stroke={dq ? UNK : '#475569'} strokeWidth="2" />
      <text x={x0 + (small + W) / 2} y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill={dq ? UNK : '#334155'}>{diff}</text>
    </QFig>
  );
};

/** Bolt: 500 Ft-os bankjegy és árcédulák. */
export const ShopFig: React.FC<{ items: { name: string; price: number }[] }> = ({ items }) => (
  <QFig h={96}>
    <Note500 x={10} y={22} w={70} h={36} />
    <text x="45" y="76" textAnchor="middle" fontSize="11" fill="#475569">ezzel fizetsz</text>
    {items.map((it, i) => {
      const x = items.length === 1 ? 130 : 100 + i * 70;
      return (
        <g key={it.name}>
          <PriceTag x={x} y={22} w={64} text={`${it.price} Ft`} />
          <text x={x + 27} y="76" textAnchor="middle" fontSize="11" fill="#475569">{it.name}</text>
        </g>
      );
    })}
  </QFig>
);

/** Ösvény: start → pihenő → pihenő, az eleje és a vége megjelölve. */
export const TrailFig: React.FC = () => (
  <QFig h={100}>
    <path d="M 20 60 L 220 60" stroke="#a3e635" strokeWidth="8" strokeLinecap="round" />
    <path d="M 20 60 L 158 60" stroke="#15803d" strokeWidth="8" strokeLinecap="round" />
    {[20, 92, 158, 220].map((x) => (
      <circle key={x} cx={x} cy={60} r="6" fill="#fff" stroke="#14532d" strokeWidth="2" />
    ))}
    <text x="56" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">180 m</text>
    <text x="125" y="48" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">150 m</text>
    <text x="190" y="48" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
    <text x="20" y="84" textAnchor="middle" fontSize="11" fill="#475569">rajt</text>
    <text x="220" y="84" textAnchor="middle" fontSize="11" fill="#475569">cél</text>
    <text x="120" y="22" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#14532d">az egész ösvény 500 m</text>
  </QFig>
);
