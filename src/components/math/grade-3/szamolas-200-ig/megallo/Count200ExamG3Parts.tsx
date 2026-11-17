import React from 'react';
import { FONT, INK, UNK, ROD, ROD_DARK, HUND, ONE, Rod, Flat, Cube, Coin } from '../szorzas-es-osztas/MulDiv200G3Parts';

// ---------------------------------------------------------------------------
// Rajzoló elemek a 6. Megálló – tudáspróba leckéhez (III. fejezet, 200-ig).
// Az 5. lecke rajzelemeire épül (tízesrúd, érme, tányér, ugrások).
// Színek: százas = piros, tízes = kék, egyes = sárga.
// ---------------------------------------------------------------------------

export { FONT, INK, UNK, ROD, ROD_DARK, HUND, ONE };
export { QFig, Rod, Flat, Cube, Coin, CoinRows, RodGroups, Plates, Jumps, BigEq, Tag, Box, art, Art, ban, at, asSfx } from '../szorzas-es-osztas/MulDiv200G3Parts';

const isUnk = (s: string | number | undefined) => typeof s === 'string' && s.includes('?');

/** Számkép: százas lapok, tízesrudak, egyeskockák egy sorban, középre igazítva. */
export const Blocks: React.FC<{ h: number; t: number; e: number; y?: number; s?: number; cx?: number }> = ({ h, t, e, y = 14, s = 50, cx = 120 }) => {
  const rodW = s / 7;
  const rodStep = rodW + 3;
  const cube = s / 10 + 1;
  const eCols = e > 5 ? 2 : 1;
  const wH = h * (s + 6);
  const wT = t * rodStep;
  const wE = e > 0 ? eCols * (cube + 2) : 0;
  const total = wH + wT + wE + (h && t ? 6 : 0) + ((h || t) && e ? 6 : 0);
  let x = cx - total / 2;
  const items: React.ReactNode[] = [];
  for (let i = 0; i < h; i++) {
    items.push(<Flat key={`h${i}`} x={x} y={y} s={s} />);
    x += s + 6;
  }
  if (h && t) x += 6;
  for (let i = 0; i < t; i++) {
    items.push(<Rod key={`t${i}`} x={x} y={y} w={rodW} h={s} />);
    x += rodStep;
  }
  if ((h || t) && e) x += 6;
  for (let i = 0; i < e; i++) {
    const col = eCols === 2 ? i % 2 : 0;
    const row = eCols === 2 ? Math.floor(i / 2) : i;
    items.push(<Cube key={`e${i}`} x={x + col * (cube + 2)} y={y + s - cube - row * (cube + 2)} s={cube} />);
  }
  return <g>{items}</g>;
};

/** Általános számegyenes: from–to, kis osztás `step`, felirat `labelEvery` lépésenként, jelölések. */
export const NumLine: React.FC<{
  from: number;
  to: number;
  step: number;
  labelEvery?: number;
  y?: number;
  x?: number;
  w?: number;
  marks?: { v: number; label: string; color?: string }[];
  hideLabels?: number[];
  fs?: number;
}> = ({ from, to, step, labelEvery = 1, y = 60, x = 20, w = 196, marks = [], hideLabels = [], fs = 10 }) => {
  const sx = (v: number) => x + ((v - from) / (to - from)) * w;
  const ticks: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) ticks.push(Math.round(v * 100) / 100);
  return (
    <g>
      <line x1={x - 8} y1={y} x2={x + w + 12} y2={y} stroke={INK} strokeWidth="1.6" />
      <path d={`M ${x + w + 12} ${y} l -7 -4 v 8 Z`} fill={INK} />
      {ticks.map((v, i) => {
        const big = i % labelEvery === 0;
        return (
          <g key={v}>
            <line x1={sx(v)} y1={y - (big ? 7 : 4)} x2={sx(v)} y2={y + (big ? 7 : 4)} stroke={INK} strokeWidth={big ? 1.5 : 0.9} />
            {big && !hideLabels.includes(v) && (
              <text x={sx(v)} y={y + 20} textAnchor="middle" fontSize={fs} fill="#334155">
                {v}
              </text>
            )}
          </g>
        );
      })}
      {marks.map((m, i) => {
        const c = m.color ?? (isUnk(m.label) ? UNK : '#2563eb');
        return (
          <g key={i}>
            <path d={`M ${sx(m.v)} ${y - 8} l -5 -9 h 10 Z`} fill={c} />
            <text x={sx(m.v)} y={y - 21} textAnchor="middle" fontSize="13" fontWeight="bold" fill={c}>
              {m.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Sorban álló dobozok szöveggel (pl. számszomszéd-táblázat). */
export const CellRow: React.FC<{ cells: string[]; heads?: string[]; y?: number; cw?: number; ch?: number; fs?: number }> = ({ cells, heads, y = 20, cw = 52, ch = 32, fs = 16 }) => {
  const x0 = 120 - (cells.length * cw) / 2;
  return (
    <g>
      {heads &&
        heads.map((hd, i) => (
          <text key={`h${i}`} x={x0 + i * cw + cw / 2} y={y - 6} textAnchor="middle" fontSize="9" fill="#475569">
            {hd}
          </text>
        ))}
      {cells.map((c, i) => (
        <g key={i}>
          <rect x={x0 + i * cw} y={y} width={cw} height={ch} fill={isUnk(c) ? '#fee2e2' : '#fff'} stroke="#64748b" strokeWidth="1.3" />
          <text x={x0 + i * cw + cw / 2} y={y + ch / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={isUnk(c) ? UNK : INK}>
            {c}
          </text>
        </g>
      ))}
    </g>
  );
};

/** Helyiérték-táblázat: százas | tízes | egyes. */
export const PlaceTable: React.FC<{ digits: string[]; y?: number; hi?: number }> = ({ digits, y = 14, hi }) => {
  const heads = ['százas', 'tízes', 'egyes'];
  const colors = ['#fee2e2', '#dbeafe', '#fef9c3'];
  const cw = 60;
  const x0 = 120 - (3 * cw) / 2;
  return (
    <g>
      {heads.map((hd, i) => (
        <g key={i}>
          <rect x={x0 + i * cw} y={y} width={cw} height={20} fill={colors[i]} stroke="#64748b" strokeWidth="1.2" />
          <text x={x0 + i * cw + cw / 2} y={y + 14} textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>
            {hd}
          </text>
          <rect x={x0 + i * cw} y={y + 20} width={cw} height={34} fill={hi === i ? '#fde68a' : '#fff'} stroke="#64748b" strokeWidth="1.2" />
          <text x={x0 + i * cw + cw / 2} y={y + 44} textAnchor="middle" fontSize="20" fontWeight="bold" fill={isUnk(digits[i]) ? UNK : INK}>
            {digits[i]}
          </text>
        </g>
      ))}
    </g>
  );
};

/** Számtábla-részlet (101–200-as tábla): sorok kezdőszáma, oszlopszám; '?' cella és kiemelt cella. */
export const ChartPart: React.FC<{ start: number; rows: number; cols?: number; unknown?: number; hi?: number; hidden?: number[]; y?: number }> = ({
  start,
  rows,
  cols = 6,
  unknown,
  hi,
  hidden = [],
  y = 12
}) => {
  const cw = 34;
  const ch = 22;
  const x0 = 120 - (cols * cw) / 2;
  return (
    <g>
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((__, c) => {
          const v = start + r * 10 + c;
          const unk = v === unknown;
          const isHi = v === hi;
          const hide = hidden.includes(v);
          return (
            <g key={`${r}-${c}`}>
              <rect x={x0 + c * cw} y={y + r * ch} width={cw} height={ch} fill={unk ? '#fee2e2' : isHi ? '#bbf7d0' : '#fff'} stroke="#94a3b8" strokeWidth="1" />
              <text x={x0 + c * cw + cw / 2} y={y + r * ch + 15} textAnchor="middle" fontSize="11" fontWeight={unk || isHi ? 'bold' : 'normal'} fill={unk ? UNK : INK}>
                {unk ? '?' : hide ? '' : v}
              </text>
            </g>
          );
        })
      )}
    </g>
  );
};

/** Vízszintes oszlopdiagram. */
export const BarChart: React.FC<{ data: { label: string; v: number; color: string }[]; max: number; step: number; y?: number }> = ({ data, max, step, y = 12 }) => {
  const x0 = 62;
  const w = 160;
  const sx = (v: number) => x0 + (v / max) * w;
  const bh = 14;
  const gap = 8;
  const bottom = y + data.length * (bh + gap);
  const ticks: number[] = [];
  for (let v = 0; v <= max; v += step) ticks.push(v);
  return (
    <g>
      {ticks.map((v) => (
        <g key={v}>
          <line x1={sx(v)} y1={y - 4} x2={sx(v)} y2={bottom} stroke="#e2e8f0" strokeWidth="1" />
          <text x={sx(v)} y={bottom + 12} textAnchor="middle" fontSize="8" fill="#475569">
            {v}
          </text>
        </g>
      ))}
      {data.map((d, i) => (
        <g key={i}>
          <text x={x0 - 6} y={y + i * (bh + gap) + bh - 3} textAnchor="end" fontSize="10" fill={INK}>
            {d.label}
          </text>
          <rect x={x0} y={y + i * (bh + gap)} width={sx(d.v) - x0} height={bh} rx="2" fill={d.color} />
        </g>
      ))}
      <line x1={x0} y1={y - 4} x2={x0} y2={bottom} stroke={INK} strokeWidth="1.3" />
      <line x1={x0} y1={bottom} x2={x0 + w + 6} y2={bottom} stroke={INK} strokeWidth="1.3" />
      <text x={x0 + w + 8} y={bottom + 12} fontSize="8" fill="#475569">
        fő
      </text>
    </g>
  );
};

/** Műveletlánc: értékek körben, köztük nyilak a műveletekkel. */
export const Chain: React.FC<{ values: string[]; ops: string[]; y?: number }> = ({ values, ops, y = 46 }) => {
  const n = values.length;
  const step = 200 / (n - 1);
  const r = n >= 5 ? 15 : 17;
  return (
    <g>
      {values.map((v, i) => {
        const cx = 20 + i * step;
        const unk = isUnk(v);
        return (
          <g key={i}>
            <circle cx={cx} cy={y} r={r} fill={unk ? '#fee2e2' : '#fff'} stroke={unk ? UNK : '#2563eb'} strokeWidth="2" />
            <text x={cx} y={y + 4.5} textAnchor="middle" fontSize={v.length >= 3 ? 11 : 13} fontWeight="bold" fill={unk ? UNK : INK}>
              {v}
            </text>
          </g>
        );
      })}
      {ops.map((o, i) => {
        const a = 20 + i * step + r + 1;
        const b = 20 + (i + 1) * step - r - 1;
        return (
          <g key={i}>
            <line x1={a} y1={y} x2={b - 2} y2={y} stroke="#f97316" strokeWidth="2" />
            <path d={`M ${b} ${y} l -6 -3.5 v 7 Z`} fill="#f97316" />
            <text x={(a + b) / 2} y={y - 10} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">
              {o}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Vegyes érmék egy sorban; a '?' érme letakart. */
export const CoinSet: React.FC<{ values: (number | '?')[]; y?: number; r?: number }> = ({ values, y = 36, r = 16 }) => {
  const step = 2 * r + 6;
  const x0 = 120 - ((values.length - 1) * step) / 2;
  return (
    <g>
      {values.map((v, i) =>
        v === '?' ? (
          <g key={i}>
            <circle cx={x0 + i * step} cy={y} r={r} fill="#fee2e2" stroke={UNK} strokeWidth="1.8" strokeDasharray="4 3" />
            <text x={x0 + i * step} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>
              ?
            </text>
          </g>
        ) : (
          <Coin key={i} cx={x0 + i * step} cy={y} v={v} r={v >= 100 ? r + 2 : v >= 50 ? r + 1 : v >= 20 ? r : v >= 10 ? r - 1 : r - 3} />
        )
      )}
    </g>
  );
};

/** Számkártyák (pl. „3 t”, „1 sz”). */
export const Cards: React.FC<{ cards: string[]; y?: number; w?: number }> = ({ cards, y = 18, w = 52 }) => {
  const gap = 10;
  const x0 = 120 - (cards.length * w + (cards.length - 1) * gap) / 2;
  return (
    <g>
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={y} width={w} height={34} rx="6" fill="#fff" stroke="#0284c7" strokeWidth="1.6" />
          <text x={x0 + i * (w + gap) + w / 2} y={y + 23} textAnchor="middle" fontSize="15" fontWeight="bold" fill={isUnk(c) ? UNK : INK}>
            {c}
          </text>
        </g>
      ))}
    </g>
  );
};
