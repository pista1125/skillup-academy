import React from 'react';
import { WrittenSubG3Column, WrittenSubG3ColumnProps } from '../irasbeli-kivonas/WrittenSubG3Column';
import { FONT, INK, UNK, UP, DOWN, C_MIN, C_SUB, C_DIF, QFig, NumBox, Coin, PriceTag } from '../a-kulonbseg-valtozasai/DiffChangesG3Parts';

// ---------------------------------------------------------------------------
// Rajzelemek a VIII. fejezet tudáspróbájához (5. Megálló).
// Az oszlopos írásbeli kivonást a fejezet közös komponense rajzolja (WrittenSubG3Column),
// a kivonás-sorok, összehasonlítás, állandó különbség táblázat a 4. lecke elemei.
// ---------------------------------------------------------------------------

export { FONT, INK, UNK, UP, DOWN, C_MIN, C_SUB, C_DIF, QFig, NumBox, Coin, PriceTag };
export { DiffRowsFig, CompareFig, DiffTableFig } from '../a-kulonbseg-valtozasai/DiffChangesG3Parts';

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
export const roundTen = (n: number) => Math.round(n / 10) * 10;
export const roundHundred = (n: number) => Math.round(n / 100) * 100;

/** Oszlopos kivonás kérdésábraként (a fejezet közös komponensével). */
export const ColFig: React.FC<WrittenSubG3ColumnProps> = (p) => <WrittenSubG3Column {...p} className="w-full max-w-[170px] h-auto mx-auto" />;

/** Érmék egy-két sorban; a crossed indexű érmék áthúzva (elköltöttük / kivettük). */
export const CoinsFig: React.FC<{ coins: number[]; crossed?: number[]; perRow?: number; caption?: string }> = ({ coins, crossed = [], perRow = 7, caption }) => {
  const rows = Math.ceil(coins.length / perRow);
  const h = 20 + rows * 40 + (caption ? 20 : 0);
  return (
    <QFig h={h}>
      {coins.map((c, i) => {
        const r = Math.floor(i / perRow);
        const k = i % perRow;
        const n = Math.min(perRow, coins.length - r * perRow);
        const x0 = 120 - ((n - 1) * 32) / 2;
        return <Coin key={i} cx={x0 + k * 32} cy={30 + r * 40} v={c} r={c >= 100 ? 15 : c >= 20 ? 13.5 : 12} crossed={crossed.includes(i)} />;
      })}
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#334155">{caption}</text>}
    </QFig>
  );
};

/** Egy szám két kerek szomszéd között egy rövid számegyenesen (becsléshez). */
const RoundLineG: React.FC<{ y: number; v: number; lo: number; hi: number }> = ({ y, v, lo, hi }) => {
  const x0 = 26;
  const x1 = 214;
  const x = x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
  return (
    <g>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke="#475569" strokeWidth="2" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={x0 + (i * (x1 - x0)) / 10} y1={y - (i % 5 === 0 ? 7 : 4)} x2={x0 + (i * (x1 - x0)) / 10} y2={y + (i % 5 === 0 ? 7 : 4)} stroke="#475569" strokeWidth="1.4" />
      ))}
      <text x={x0} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{lo}</text>
      <text x={x1} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{hi}</text>
      <circle cx={x} cy={y} r="5" fill={UNK} />
      <text x={x} y={y - 12} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>{v}</text>
    </g>
  );
};
/** Becslés: két szám, mindkettő a saját kerek szomszédai között. */
export const EstFig: React.FC<{ a: number; b: number; step: 10 | 100 }> = ({ a, b, step }) => {
  const lo = (n: number) => Math.floor(n / step) * step;
  return (
    <QFig h={124}>
      <RoundLineG y={36} v={a} lo={lo(a)} hi={lo(a) + step} />
      <RoundLineG y={92} v={b} lo={lo(b)} hi={lo(b) + step} />
    </QFig>
  );
};

/** Egy csík részekből, fölötte zárójel az egésszel. „?” = keresett rész. */
export const PartsFig: React.FC<{ total: string; parts: { v: number; text: string }[] }> = ({ total, parts }) => {
  const W = 216;
  const sum = parts.reduce((s, p) => s + p.v, 0);
  const cols = [C_SUB.bar, '#fde68a', '#c4b5fd'];
  let xx = 12;
  return (
    <QFig h={86}>
      <path d={`M 12 38 L 12 30 L 228 30 L 228 38`} fill="none" stroke="#475569" strokeWidth="1.8" />
      <rect x={120 - total.length * 4.6 - 4} y="14" width={total.length * 9.2 + 8} height="20" fill="#f8fafc" />
      <text x="120" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill={total.includes('?') ? UNK : INK}>{total}</text>
      {parts.map((p, k) => {
        const w = (W * p.v) / sum;
        const q = p.text.includes('?');
        const el = (
          <g key={k}>
            <rect x={xx} y={44} width={w} height={30} fill={q ? '#fff' : cols[k % 3]} stroke={q ? UNK : '#475569'} strokeWidth={q ? 2 : 1.5} strokeDasharray={q ? '5 3' : undefined} />
            <text x={xx + w / 2} y={64} textAnchor="middle" fontSize="14" fontWeight="bold" fill={q ? UNK : INK}>{p.text}</text>
          </g>
        );
        xx += w;
        return el;
      })}
    </QFig>
  );
};

/** Csíkok egymás alatt közös léptékkel (ki mennyit…). */
export const BarsFig: React.FC<{ rows: { name: string; v: number; text?: string }[]; max?: number }> = ({ rows, max }) => {
  const M = max ?? Math.max(...rows.map((r) => r.v));
  const fills = [C_MIN.bar, C_SUB.bar, '#c4b5fd'];
  return (
    <QFig h={16 + rows.length * 36}>
      {rows.map((r, i) => (
        <g key={i}>
          <text x="62" y={34 + i * 36} textAnchor="end" fontSize="12.5" fontWeight="bold" fill="#334155">{r.name}</text>
          <rect x="68" y={16 + i * 36} width={(160 * r.v) / M} height="26" fill={fills[i % 3]} stroke="#475569" strokeWidth="1.4" />
          <text x={72} y={34 + i * 36} fontSize="13.5" fontWeight="bold" fill={INK}>{r.text ?? r.v}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Adattáblázat (pl. hány gyerek kedveli…). */
export const DataTableFig: React.FC<{ head: string; cols: { name: string; v: number | string }[] }> = ({ head, cols }) => {
  const cw = Math.min(56, 170 / cols.length);
  const x0 = 236 - cols.length * cw;
  return (
    <QFig h={78}>
      <rect x="4" y="12" width={x0 - 4} height="26" fill="#86efac" stroke="#16a34a" />
      <text x={(4 + x0) / 2} y="29" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#14532d">sportág</text>
      <rect x="4" y="38" width={x0 - 4} height="28" fill="#dcfce7" stroke="#16a34a" />
      <text x={(4 + x0) / 2} y="56" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#14532d">{head}</text>
      {cols.map((c, k) => (
        <g key={k}>
          <rect x={x0 + k * cw} y="12" width={cw} height="26" fill="#f0fdf4" stroke="#16a34a" />
          <text x={x0 + k * cw + cw / 2} y="29" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#14532d">{c.name}</text>
          <rect x={x0 + k * cw} y="38" width={cw} height="28" fill="#fff" stroke="#16a34a" />
          <text x={x0 + k * cw + cw / 2} y="57" textAnchor="middle" fontSize="14" fontWeight="bold" fill={c.v === '?' ? UNK : INK}>{c.v}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Sorozat: dobozok nyilakkal, a nyilak fölött a lépés (vagy „?”). */
export const ChainFig: React.FC<{ values: (number | string)[]; ops: string[] }> = ({ values, ops }) => {
  const n = values.length;
  const bw = n > 5 ? 34 : 40;
  const gap = (232 - n * bw) / (n - 1);
  const xs = values.map((_, i) => 4 + bw / 2 + i * (bw + gap));
  return (
    <QFig h={74}>
      {values.map((v, i) => (
        <NumBox key={i} cx={xs[i]} cy={50} v={v} w={bw} h={26} fs={n > 5 ? 13 : 14} fill={C_MIN.fill} stroke={C_MIN.stroke} />
      ))}
      {ops.map((o, i) => {
        const xa = xs[i] + bw / 2 - 2;
        const xb = xs[i + 1] - bw / 2 + 2;
        const col = o === '?' ? UNK : o.startsWith('+') ? UP : DOWN;
        return (
          <g key={i}>
            <path d={`M ${xa} 34 Q ${(xa + xb) / 2} 18 ${xb} 34`} fill="none" stroke={col} strokeWidth="1.8" />
            <path d={`M ${xb - 6} 31 L ${xb} 35 L ${xb - 1} 28`} fill="none" stroke={col} strokeWidth="1.8" />
            <text x={(xa + xb) / 2} y="16" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={col}>{o}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Különbség-piramis: minden doboz a fölötte lévő két szám különbsége. */
export const PyramidFig: React.FC<{ rows: (number | string)[][] }> = ({ rows }) => {
  const top = rows[0].length;
  const bw = top >= 4 ? 50 : 56;
  const bh = 28;
  return (
    <QFig h={14 + rows.length * (bh + 2) + 6}>
      {rows.map((row, r) =>
        row.map((v, k) => {
          const x = 120 - (row.length * bw) / 2 + k * bw;
          const y = 12 + r * (bh + 2);
          const q = v === '?';
          const empty = v === '';
          return (
            <g key={`${r}-${k}`}>
              <rect x={x} y={y} width={bw} height={bh} fill={q ? '#fee2e2' : empty ? '#f1f5f9' : r === 0 ? '#fef3c7' : '#dcfce7'} stroke={q ? UNK : '#64748b'} strokeWidth={q ? 2 : 1.3} />
              {!empty && <text x={x + bw / 2} y={y + bh / 2 + 5.5} textAnchor="middle" fontSize="15" fontWeight="bold" fill={q ? UNK : INK}>{v}</text>}
            </g>
          );
        })
      )}
    </QFig>
  );
};

/** Számkártyák egy sorban. */
export const CardsFig: React.FC<{ cards: (number | string)[]; big?: boolean }> = ({ cards, big }) => {
  const w = big ? 46 : Math.min(44, 220 / cards.length - 4);
  const gap = 6;
  const x0 = 120 - (cards.length * w + (cards.length - 1) * gap) / 2;
  const fills = ['#fce7f3', '#ffedd5', '#dcfce7', '#e0f2fe', '#ede9fe', '#fef9c3'];
  return (
    <QFig h={big ? 76 : 62}>
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y="12" width={w} height={big ? 52 : 38} rx="7" fill={fills[i % 6]} stroke="#64748b" strokeWidth="1.5" />
          <text x={x0 + i * (w + gap) + w / 2} y={big ? 48 : 37} textAnchor="middle" fontSize={big ? 26 : 15} fontWeight="bold" fill={INK}>{c}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Árcédulák egy sorban (tárgynév nélkül vagy névvel). */
export const TagsFig: React.FC<{ prices: number[]; have?: number }> = ({ prices, have }) => {
  const n = prices.length + (have ? 1 : 0);
  const w = Math.min(62, (232 - (n - 1) * 6) / n);
  const tfs = w < 60 ? 11.5 : 13;
  const gap = n > 1 ? (232 - n * w) / (n - 1) : 0;
  return (
    <QFig h={64}>
      {have && (
        <g>
          <NumBox cx={4 + w / 2} cy={34} v={`${have} Ft`} w={w} h={28} fs={tfs + 0.5} fill={C_MIN.fill} stroke={C_MIN.stroke} />
          <text x={4 + w / 2} y={60} textAnchor="middle" fontSize="10.5" fill="#475569">ennyi van</text>
        </g>
      )}
      {prices.map((p, i) => (
        <PriceTag key={i} x={4 + (i + (have ? 1 : 0)) * (w + gap)} y={21} text={`${p} Ft`} w={w} fs={tfs} fill={['#fef3c7', '#e0f2fe', '#fce7f3', '#dcfce7'][i % 4]} />
      ))}
    </QFig>
  );
};

/** Okos kivonás: m − s, fölötte a kerekítő változás, alatta „… = ?”. */
export const CleverFig: React.FC<{ m: number; s: number; k: number }> = ({ m, s, k }) => (
  <QFig h={112}>
    <NumBox cx={56} cy={30} v={m} w={60} h={30} fs={17} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="100" y="37" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>−</text>
    <NumBox cx={144} cy={30} v={s} w={60} h={30} fs={17} fill={C_SUB.fill} stroke={C_SUB.stroke} />
    {[56, 144].map((x) => (
      <g key={x}>
        <line x1={x} y1="47" x2={x} y2="71" stroke={UP} strokeWidth="2.4" />
        <path d={`M ${x - 5} 66 L ${x} 73 L ${x + 5} 66`} fill="none" stroke={UP} strokeWidth="2.4" />
        <text x={x + 8} y="64" fontSize="13" fontWeight="bold" fill={UP}>+{k}</text>
      </g>
    ))}
    <NumBox cx={56} cy={90} v={m + k} w={60} h={28} fs={16} fill={C_MIN.fill} stroke={C_MIN.stroke} />
    <text x="100" y="97" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>−</text>
    <NumBox cx={144} cy={90} v={s + k} w={60} h={28} fs={16} fill={C_SUB.fill} stroke={C_SUB.stroke} />
    <text x="186" y="97" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>=</text>
    <NumBox cx={216} cy={90} v="?" w={36} h={28} fs={16} />
  </QFig>
);

/** Életkor-táblázat: most és később. */
export const AgeFig: React.FC<{ rows: { name: string; now: number | string; later: number | string }[]; laterTitle: string }> = ({ rows, laterTitle }) => (
  <QFig h={34 + rows.length * 34}>
    <text x="130" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">most</text>
    <text x="196" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{laterTitle}</text>
    {rows.map((r, i) => (
      <g key={i}>
        <text x="14" y={47 + i * 34} fontSize="13" fontWeight="bold" fill="#334155">{r.name}</text>
        <NumBox cx={130} cy={42 + i * 34} v={r.now} w={50} h={26} fs={15} fill={i === 0 ? C_MIN.fill : C_SUB.fill} stroke={i === 0 ? C_MIN.stroke : C_SUB.stroke} />
        <text x="163" y={47 + i * 34} textAnchor="middle" fontSize="14" fontWeight="bold" fill={UP}>→</text>
        <NumBox cx={196} cy={42 + i * 34} v={r.later} w={50} h={26} fs={15} fill={i === 0 ? C_MIN.fill : C_SUB.fill} stroke={i === 0 ? C_MIN.stroke : C_SUB.stroke} />
      </g>
    ))}
  </QFig>
);
