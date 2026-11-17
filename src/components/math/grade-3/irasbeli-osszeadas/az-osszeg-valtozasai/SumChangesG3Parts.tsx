import React from 'react';

// ---------------------------------------------------------------------------
// Rajzelemek és segédfüggvények a VII. Írásbeli összeadás fejezet 4–6. leckéjéhez
// (Az összeg változásai, Szöveges feladatok, Megálló). A Figures, a Theory,
// a Quiz és a CardFigures is ezeket használja.
// Színek: nő = zöld, csökken = piros, nem változik = szürke, keresett = piros „?”.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';
export const UP = '#16a34a';
export const DOWN = '#e11d48';
export const SAME = '#64748b';

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

/** 4 különböző válasz (0..max): a helyes + a megadott rosszak, szükség esetén ±10-es kitöltéssel. A helyes az első. */
export const opts4 = (correct: number, wrong: number[], max = 1000): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (Number.isInteger(w) && w >= 0 && w <= max && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? 10 * Math.ceil(k / 2) : -10 * Math.ceil(k / 2));
    if (w >= 0 && w <= max && !out.includes(w)) out.push(w);
    k++;
  }
  return out;
};

// ---------------------------------------------------------------------------
// Toldalékok
// ---------------------------------------------------------------------------
const INS_ONES = ['', 'gyel', 'vel', 'mal', 'gyel', 'tel', 'tal', 'tel', 'cal', 'cel'];
const INS_TENS = ['', 'zel', 'szal', 'cal', 'nel', 'nel', 'nal', 'nel', 'nal', 'nel'];
/** Eszközhatározó rag: 10-zel, 20-szal, 100-zal, 7-tel, 1-gyel, 1000-rel. */
export const ins = (n: number): string => {
  const m = Math.abs(n);
  let s = 'zal';
  if (m === 0) s = 'val';
  else if (m % 1000 === 0) s = 'rel';
  else if (m % 10 !== 0) s = INS_ONES[m % 10];
  else if (m % 100 !== 0) s = INS_TENS[(m / 10) % 10];
  return `${m}-${s}`;
};
/** Névelő szám elé: „az 1…”, „az 5…”, „a 340”. */
export const art = (n: number) => (String(n)[0] === '5' || n === 1 || (n >= 1000 && n < 2000) ? 'az' : 'a');
/** Változás szövege: +10 → „10-zel nő”, −20 → „20-szal csökken”, 0 → „nem változik”. */
export const changeText = (d: number) => (d === 0 ? 'nem változik' : d > 0 ? `${ins(d)} nő` : `${ins(d)} csökken`);
/** Előjeles szám: +10, −10, 0. */
export const signed = (d: number) => (d > 0 ? `+${d}` : d < 0 ? `−${-d}` : '0');
export const changeColor = (d: number) => (d > 0 ? UP : d < 0 ? DOWN : SAME);

// ---------------------------------------------------------------------------
// Alapelemek
// ---------------------------------------------------------------------------

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode; w?: number }> = ({ h = 130, w = 240, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Számdoboz; a „?” piros. */
export const NumBox: React.FC<{ cx: number; cy: number; v: number | string; w?: number; h?: number; fs?: number; fill?: string; stroke?: string; color?: string }> = ({
  cx,
  cy,
  v,
  w = 52,
  h = 30,
  fs = 17,
  fill = '#fff',
  stroke = '#94a3b8',
  color = INK
}) => {
  const q = v === '?';
  return (
    <g>
      <rect x={cx - w / 2} y={cy - h / 2} width={w} height={h} rx={h * 0.25} fill={q ? '#fee2e2' : fill} stroke={q ? UNK : stroke} strokeWidth={q ? 2 : 1.6} />
      <text x={cx} y={cy + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={q ? UNK : color} fontFamily={FONT}>{v}</text>
    </g>
  );
};

/** Lefelé mutató változás-nyíl, mellette a változás (+10, −10, 0, ?). */
export const ChangeArrow: React.FC<{ x: number; y1: number; y2: number; label: string; fs?: number }> = ({ x, y1, y2, label, fs = 13 }) => {
  const col = label === '?' ? UNK : label.startsWith('+') ? UP : label.startsWith('−') ? DOWN : SAME;
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2 - 4} stroke={col} strokeWidth="2.4" strokeLinecap="round" />
      <path d={`M ${x - 5} ${y2 - 9} L ${x} ${y2 - 2} L ${x + 5} ${y2 - 9}`} fill="none" stroke={col} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <text x={x + 6} y={(y1 + y2) / 2 + fs * 0.36} fontSize={fs} fontWeight="bold" fill={col} fontFamily={FONT}>{label}</text>
    </g>
  );
};

export type Cell = number | string;
/**
 * Összeg-sorok egymás alatt: tag + tag = összeg; a sorok között változás-nyilak.
 * changes[i] = [az 1. tag, a 2. tag, az összeg] változása az i. és i+1. sor között (null = nincs nyíl).
 * Méret: 240 × (16 + rows·30 + (rows−1)·28 + 12).
 */
export const ChangeRowsG: React.FC<{ rows: [Cell, Cell, Cell][]; changes?: ([string | null, string | null, string | null] | null)[]; y?: number; fs?: number }> = ({
  rows,
  changes = [],
  y = 16,
  fs = 17
}) => {
  const XS = [44, 124, 200];
  const rowY = (i: number) => y + 15 + i * 58;
  return (
    <g fontFamily={FONT}>
      {rows.map((r, i) => (
        <g key={`r${i}`}>
          <NumBox cx={XS[0]} cy={rowY(i)} v={r[0]} w={56} fs={fs} fill="#dbeafe" stroke="#3b82f6" />
          <text x="84" y={rowY(i) + 7} textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>+</text>
          <NumBox cx={XS[1]} cy={rowY(i)} v={r[1]} w={56} fs={fs} fill="#fef9c3" stroke="#ca8a04" />
          <text x="162" y={rowY(i) + 7} textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>=</text>
          <NumBox cx={XS[2]} cy={rowY(i)} v={r[2]} w={60} fs={fs} fill="#dcfce7" stroke="#16a34a" />
        </g>
      ))}
      {changes.map((c, i) =>
        c ? (
          <g key={`c${i}`}>
            {c.map((lab, k) =>
              lab !== null ? <ChangeArrow key={k} x={XS[k] - 8} y1={rowY(i) + 17} y2={rowY(i + 1) - 14} label={lab} /> : null
            )}
          </g>
        ) : null
      )}
    </g>
  );
};
export const changeRowsHeight = (n: number) => 16 + n * 30 + (n - 1) * 28 + 12;

/** Kérdésábra: összeg-sorok kerettel. */
export const ChangeRowsFig: React.FC<{ rows: [Cell, Cell, Cell][]; changes?: ([string | null, string | null, string | null] | null)[]; caption?: string }> = ({ rows, changes, caption }) => {
  const h = changeRowsHeight(rows.length) + (caption ? 18 : 0);
  return (
    <QFig h={h}>
      {caption && <text x="120" y="18" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#475569">{caption}</text>}
      <ChangeRowsG rows={rows} changes={changes} y={caption ? 30 : 14} />
    </QFig>
  );
};

/** Forint érme (5, 10, 20, 50, 100, 200). A 100 Ft-os ezüst gyűrű + arany közép, a 200 Ft-os fordítva. */
export const Coin: React.FC<{ cx: number; cy: number; v: number | string; r?: number }> = ({ cx, cy, v, r }) => {
  const n = typeof v === 'number' ? v : 0;
  const R = r ?? (n === 200 ? 21 : n === 100 ? 20 : n === 50 ? 19 : n === 20 ? 17 : n === 10 ? 16 : 14);
  if (v === '?') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={R} fill="#fee2e2" stroke={UNK} strokeWidth="2" strokeDasharray="4 3" />
        <text x={cx} y={cy + R * 0.36} textAnchor="middle" fontSize={R * 1.05} fontWeight="bold" fill={UNK} fontFamily={FONT}>?</text>
      </g>
    );
  }
  const gold = '#facc15';
  const silver = '#cbd5e1';
  const ring = n === 200 ? gold : n === 100 ? silver : n === 20 || n === 5 ? gold : silver;
  const core = n === 200 ? silver : n === 100 ? gold : ring;
  const edge = ring === gold ? '#a16207' : '#475569';
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill={ring} stroke={edge} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={R * 0.7} fill={core} stroke={core === gold ? '#ca8a04' : '#64748b'} strokeWidth="0.9" />
      <text x={cx} y={cy + R * 0.28} textAnchor="middle" fontSize={n >= 100 ? R * 0.7 : R * 0.82} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{n}</text>
    </g>
  );
};

/** Árcédula. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; w?: number; fs?: number; fill?: string }> = ({ x, y, text, w = 64, fs = 13, fill = '#fff' }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + fs * 0.95} L ${x + w - 10} ${y + fs * 1.9} L ${x} ${y + fs * 1.9} Z`} fill={fill} stroke="#475569" strokeWidth={fs > 16 ? 2.6 : 1.3} />
    <circle cx={x + w - 11} cy={y + fs * 0.95} r={fs * 0.14} fill="#475569" />
    <text x={x + (w - 12) / 2} y={y + fs * 1.33} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a" fontFamily={FONT}>{text}</text>
  </g>
);

// ---------------------------------------------------------------------------
// Szakaszos ábra (csíkok)
// ---------------------------------------------------------------------------
export interface BarSeg {
  v: number;
  text: string;
  color?: string;
  dashed?: boolean;
}
export interface BarRow {
  name: string;
  segs: BarSeg[];
  /** A csík után, jobbra írt szöveg (pl. „?”, „összesen ?”). */
  after?: string;
}
const SEG_COLORS = ['#93c5fd', '#fde68a', '#86efac', '#f9a8d4'];
/**
 * Csíkok egymás alatt, közös léptékkel (a leghosszabb csík = W). Név balra, szegmensek benne a szöveggel.
 * Méret: (x + nameW + W + afterW) × (rows·(h + gap)).
 */
export const BarRowsG: React.FC<{ rows: BarRow[]; x?: number; y?: number; W?: number; h?: number; gap?: number; nameW?: number; fs?: number; maxV?: number }> = ({
  rows,
  x = 8,
  y = 10,
  W = 150,
  h = 26,
  gap = 14,
  nameW = 52,
  fs = 13,
  maxV
}) => {
  const tot = (r: BarRow) => r.segs.reduce((s, g) => s + g.v, 0);
  const max = maxV ?? Math.max(...rows.map(tot));
  return (
    <g fontFamily={FONT}>
      {rows.map((r, i) => {
        const yy = y + i * (h + gap);
        let xx = x + nameW;
        const parts = r.segs.map((g, k) => {
          const w = (W * g.v) / max;
          const el = (
            <g key={k}>
              <rect
                x={xx}
                y={yy}
                width={w}
                height={h}
                fill={g.dashed ? '#fff' : g.color ?? SEG_COLORS[k % 4]}
                stroke={g.dashed ? UNK : '#475569'}
                strokeWidth={g.dashed ? 1.8 : 1.4}
                strokeDasharray={g.dashed ? '5 3' : undefined}
              />
              <text x={xx + w / 2} y={yy + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={g.text === '?' ? UNK : INK}>{g.text}</text>
            </g>
          );
          xx += w;
          return el;
        });
        return (
          <g key={i}>
            <text x={x + nameW - 6} y={yy + h / 2 + 4.5} textAnchor="end" fontSize="12.5" fontWeight="bold" fill="#334155">{r.name}</text>
            {parts}
            {r.after && <text x={xx + 6} y={yy + h / 2 + fs * 0.36} fontSize={fs} fontWeight="bold" fill={r.after.includes('?') ? UNK : INK}>{r.after}</text>}
          </g>
        );
      })}
    </g>
  );
};

/** Kérdésábra: csíkok, alattuk opcionális felirat. */
export const BarsFig: React.FC<{ rows: BarRow[]; caption?: string; nameW?: number; W?: number; maxV?: number }> = ({ rows, caption, nameW = 58, W, maxV }) => {
  const h = 12 + rows.length * 40 + (caption ? 18 : 0);
  return (
    <QFig h={h}>
      <BarRowsG rows={rows} x={6} y={12} nameW={nameW} W={W ?? 236 - nameW - 44} maxV={maxV} />
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="12" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Egy csík részekből, fölötte kapcsos zárójel az összeggel (pl. „összesen: ?”). */
export const PartsBarG: React.FC<{ parts: BarSeg[]; total: string; x?: number; y?: number; W?: number; h?: number; fs?: number }> = ({ parts, total, x = 12, y = 40, W = 216, h = 30, fs = 14 }) => {
  const sum = parts.reduce((s, p) => s + p.v, 0);
  let xx = x;
  return (
    <g fontFamily={FONT}>
      <path d={`M ${x} ${y - 6} Q ${x} ${y - 14} ${x + 8} ${y - 14} L ${x + W / 2 - 8} ${y - 14} Q ${x + W / 2} ${y - 14} ${x + W / 2} ${y - 22} Q ${x + W / 2} ${y - 14} ${x + W / 2 + 8} ${y - 14} L ${x + W - 8} ${y - 14} Q ${x + W} ${y - 14} ${x + W} ${y - 6}`} fill="none" stroke="#475569" strokeWidth="1.8" />
      <text x={x + W / 2} y={y - 27} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={total.includes('?') ? UNK : INK}>{total}</text>
      {parts.map((p, k) => {
        const w = (W * p.v) / sum;
        const el = (
          <g key={k}>
            <rect x={xx} y={y} width={w} height={h} fill={p.dashed ? '#fff' : p.color ?? SEG_COLORS[k % 4]} stroke={p.dashed ? UNK : '#475569'} strokeWidth="1.5" strokeDasharray={p.dashed ? '5 3' : undefined} />
            <text x={xx + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={p.text === '?' ? UNK : INK}>{p.text}</text>
          </g>
        );
        xx += w;
        return el;
      })}
    </g>
  );
};

/** Kérdésábra: egy csík részekből + összeg-zárójel. */
export const PartsFig: React.FC<{ parts: BarSeg[]; total?: string; labels?: string[] }> = ({ parts, total = 'összesen: ?', labels }) => {
  const h = labels ? 104 : 86;
  const sum = parts.reduce((s, p) => s + p.v, 0);
  let xx = 12;
  return (
    <QFig h={h}>
      <PartsBarG parts={parts} total={total} x={12} y={44} W={216} />
      {labels &&
        parts.map((p, k) => {
          const w = (216 * p.v) / sum;
          const t = <text key={k} x={xx + w / 2} y={92} textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#475569">{labels[k]}</text>;
          xx += w;
          return t;
        })}
    </QFig>
  );
};

/** Állandó összeg táblázat: két sor tag, egy sor összeg. „?” = keresett. */
export const SumTableFig: React.FC<{ a: Cell[]; b: Cell[]; s: Cell[]; names?: [string, string, string] }> = ({ a, b, s, names = ['1. tag', '2. tag', 'összeg'] }) => {
  const n = a.length;
  const cw = Math.min(40, 170 / n);
  const x0 = 236 - n * cw - 6;
  const rowsV = [a, b, s];
  const fills = ['#dbeafe', '#fef9c3', '#dcfce7'];
  return (
    <QFig h={112}>
      {rowsV.map((row, r) => (
        <g key={r}>
          <rect x={8} y={12 + r * 30} width={x0 - 8} height={28} fill={fills[r]} stroke="#94a3b8" />
          <text x={(8 + x0) / 2} y={31 + r * 30} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{names[r]}</text>
          {row.map((v, k) => (
            <g key={k}>
              <rect x={x0 + k * cw} y={12 + r * 30} width={cw} height={28} fill={v === '?' ? '#fee2e2' : '#fff'} stroke="#94a3b8" />
              <text x={x0 + k * cw + cw / 2} y={31 + r * 30} textAnchor="middle" fontSize={cw < 36 ? 12.5 : 14} fontWeight="bold" fill={v === '?' ? UNK : INK}>{v}</text>
            </g>
          ))}
        </g>
      ))}
    </QFig>
  );
};
