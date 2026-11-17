import React from 'react';

// Közös rajzelemek és segédfüggvények az 1000-es számkörhöz (XI. fejezet, 1–3. lecke).
// Százas lap, tízesrúd, egyeskocka, forint érme és bankjegy, számegyenes, számkártyák, kérdésábra-keret.

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const QCLS = 'w-full max-w-[280px] h-auto mx-auto';

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
/** Névelő a szám elé: „az 1”, „az 5…”, „az 1000” (ezer), egyébként „a”. */
export const art = (n: number) => (n === 1 || n === 1000 || String(n)[0] === '5' ? 'az' : 'a');
export const Art = (n: number) => (art(n) === 'az' ? 'Az' : 'A');

/** Kérdésábra-keret (240 széles). */
export const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className={QCLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Százas lap: 10 × 10 kis négyzet. */
export const HundredFlat: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 8, color = '#ef4444' }) => (
  <g>
    <rect x={x} y={y} width={s * 10} height={s * 10} fill={color} stroke="#7f1d1d" strokeWidth="1.2" />
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <line x1={x + (i + 1) * s} y1={y} x2={x + (i + 1) * s} y2={y + s * 10} stroke="#7f1d1d" strokeWidth="0.4" />
        <line x1={x} y1={y + (i + 1) * s} x2={x + s * 10} y2={y + (i + 1) * s} stroke="#7f1d1d" strokeWidth="0.4" />
      </g>
    ))}
  </g>
);

/** Tízesrúd: 10 kis kocka egymás fölött. */
export const TenRod: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 8 }) => (
  <g>
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={x} y={y + i * s} width={s} height={s} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="0.6" />
    ))}
  </g>
);

/** Egyeskocka. */
export const OneCube: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 8 }) => (
  <rect x={x} y={y} width={s} height={s} fill="#facc15" stroke="#854d0e" strokeWidth="0.7" />
);

/**
 * Kirakás két sorban: fent a százas lapok (legfeljebb 10, 5-ösével), lent a rudak és a kockák.
 * Visszaadott magasság: blocksHeight().
 */
export const Blocks: React.FC<{ x: number; y: number; sz: number; t: number; e: number; s?: number }> = ({ x, y, sz, t, e, s = 4 }) => {
  const flat = s * 10;
  const parts: React.ReactNode[] = [];
  const perRow = 5;
  const rowsF = Math.ceil(sz / perRow);
  for (let i = 0; i < sz; i++) {
    const r = Math.floor(i / perRow);
    const c = i % perRow;
    parts.push(<HundredFlat key={`h${i}`} x={x + c * (flat + 4)} y={y + r * (flat + 4)} s={s} />);
  }
  const y2 = y + rowsF * (flat + 4) + (sz ? 4 : 0);
  let cx = x;
  for (let i = 0; i < t; i++) {
    parts.push(<TenRod key={`t${i}`} x={cx} y={y2} s={s} />);
    cx += s + 3;
  }
  cx += t ? 6 : 0;
  for (let i = 0; i < e; i++) {
    const col = Math.floor(i / 5);
    const row = i % 5;
    parts.push(<OneCube key={`e${i}`} x={cx + col * (s + 3)} y={y2 + flat - s - row * (s + 3)} s={s} />);
  }
  return <g>{parts}</g>;
};
export const blocksHeight = (sz: number, t: number, e: number, s = 4) =>
  Math.ceil(sz / 5) * (s * 10 + 4) + (sz ? 4 : 0) + (t || e ? s * 10 : 0);
export const blocksWidth = (sz: number, t: number, e: number, s = 4) =>
  Math.max(Math.min(sz, 5) * (s * 10 + 4) - 4, t * (s + 3) + (t ? 6 : 0) + Math.ceil(e / 5) * (s + 3));

/** Forint érme (5, 10, 20, 50, 100, 200). A 100 és a 200 Ft-os kétszínű. */
export const Coin: React.FC<{ cx: number; cy: number; v: number; r?: number; crossed?: boolean }> = ({ cx, cy, v, r, crossed }) => {
  const R = r ?? (v === 200 ? 21 : v === 100 ? 20 : v === 50 ? 19 : v === 20 ? 17 : v === 10 ? 16 : 14);
  const gold = '#facc15';
  const silver = '#cbd5e1';
  const ring = v === 200 ? gold : v === 100 ? silver : v === 5 || v === 20 ? gold : silver;
  const core = v === 200 ? silver : v === 100 ? gold : ring;
  const edge = ring === gold ? '#a16207' : '#475569';
  return (
    <g opacity={crossed ? 0.45 : 1}>
      <circle cx={cx} cy={cy} r={R} fill={ring} stroke={edge} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r={R * 0.7} fill={core} stroke={core === gold ? '#ca8a04' : '#64748b'} strokeWidth="0.8" />
      <text x={cx} y={cy + R * 0.28} textAnchor="middle" fontSize={v >= 100 ? R * 0.68 : R * 0.8} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{v}</text>
      {crossed && <line x1={cx - R} y1={cy + R} x2={cx + R} y2={cy - R} stroke={UNK} strokeWidth="3" />}
    </g>
  );
};

/** Forint bankjegy (500 vagy 1000 Ft). */
export const Note: React.FC<{ x: number; y: number; v: 500 | 1000; w?: number }> = ({ x, y, v, w = 66 }) => {
  const h = w * 0.5;
  const fill = v === 1000 ? '#bfdbfe' : '#fecaca';
  const edge = v === 1000 ? '#1d4ed8' : '#b91c1c';
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} stroke={edge} strokeWidth="1.8" />
      <rect x={x + 4} y={y + 4} width={w - 8} height={h - 8} rx="3" fill="none" stroke={edge} strokeWidth="0.8" strokeDasharray="3 2" />
      <circle cx={x + w * 0.76} cy={y + h / 2} r={h * 0.26} fill="#fff" opacity="0.7" stroke={edge} strokeWidth="0.8" />
      <text x={x + w * 0.36} y={y + h * 0.66} textAnchor="middle" fontSize={h * 0.42} fontWeight="bold" fill={edge} fontFamily={FONT}>{v}</text>
    </g>
  );
};

export interface Mark {
  v: number;
  label?: string;
  color?: string;
}

/**
 * Számegyenes lo-tól hi-ig, W széles keretben. Kis osztás: tick; nagy osztás: big; feliratok: labels.
 * marks: pontok (felirat a vonal fölött); '?' felirat = keresett szám (piros).
 */
export const NumLine: React.FC<{
  lo: number;
  hi: number;
  tick: number;
  big: number;
  labels: number[];
  marks?: Mark[];
  W?: number;
  H?: number;
  bg?: boolean;
  className?: string;
  band?: [number, number];
}> = ({ lo, hi, tick, big, labels, marks = [], W = 240, H = 92, bg = true, className = QCLS, band }) => {
  const x0 = 22;
  const x1 = W - 26;
  const y = H - 38;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += tick) ticks.push(v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {bg && <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />}
      {band && <rect x={X(band[0])} y={y - 10} width={X(band[1]) - X(band[0])} height="20" rx="4" fill="#bbf7d0" opacity="0.8" />}
      <line x1={x0 - 10} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => {
        const isBig = (v - lo) % big === 0;
        const h = isBig ? 8 : 4.5;
        return <line key={v} x1={X(v)} y1={y - h} x2={X(v)} y2={y + h} stroke="#334155" strokeWidth={isBig ? 1.6 : 0.9} />;
      })}
      {labels.map((v) => (
        <text key={`l${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="11.5" fill="#475569">{v}</text>
      ))}
      {marks.map((m, i) => {
        const c = m.label === '?' ? UNK : m.color ?? '#2563eb';
        return (
          <g key={`m${i}`}>
            <circle cx={X(m.v)} cy={y} r="4.8" fill={c} stroke="#fff" strokeWidth="1" />
            <line x1={X(m.v)} y1={y - 8} x2={X(m.v)} y2={y - 16} stroke={c} strokeWidth="1.6" />
            <text x={X(m.v)} y={y - 21} textAnchor="middle" fontSize={m.label === '?' ? 16 : 12.5} fontWeight="bold" fill={c}>{m.label ?? m.v}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Számkártya-sor. '?' = üres, piros kártya. */
export const DigitCardRow: React.FC<{ x: number; y: number; digits: string[]; s?: number; colors?: string[] }> = ({ x, y, digits, s = 30, colors }) => (
  <g>
    {digits.map((d, i) => {
      const q = d === '?';
      return (
        <g key={i}>
          <rect x={x + i * (s + 6)} y={y} width={s} height={s * 1.25} rx="6" fill={q ? '#fee2e2' : colors?.[i % colors.length] ?? '#fff'} stroke={q ? UNK : '#334155'} strokeWidth="1.6" />
          <text x={x + i * (s + 6) + s / 2} y={y + s * 0.9} textAnchor="middle" fontSize={s * 0.72} fontWeight="bold" fill={q ? UNK : '#0f172a'} fontFamily={FONT}>{d}</text>
        </g>
      );
    })}
  </g>
);
export const CARD_COLORS = ['#fef9c3', '#dcfce7', '#e0f2fe', '#fae8ff', '#ffedd5'];

/** Dobozsor egy kérdésábrában: '?' = keresett szám. */
export const RowFig: React.FC<{ items: string[]; sep?: string }> = ({ items, sep }) => {
  const n = items.length;
  const w = n > 4 ? 38 : 46;
  const gap = sep ? 16 : 7;
  const x0 = (240 - (n * w + (n - 1) * gap)) / 2;
  return (
    <QFig h={66}>
      {items.map((t, i) => {
        const q = t === '?';
        return (
          <g key={i}>
            <rect x={x0 + i * (w + gap)} y="14" width={w} height="36" rx="8" fill={q ? '#fee2e2' : '#ecfeff'} stroke={q ? UNK : '#0891b2'} strokeWidth="1.6" />
            <text x={x0 + i * (w + gap) + w / 2} y="39" textAnchor="middle" fontSize={t.length > 3 ? 14 : 16} fontWeight="bold" fill={q ? UNK : '#164e63'}>{t}</text>
            {sep && i < n - 1 && (
              <text x={x0 + i * (w + gap) + w + gap / 2} y="38" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">{sep}</text>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** Nagy gomb a laborokhoz. */
export const OptButton: React.FC<{ v: React.ReactNode; onClick: () => void; state?: 'ok' | 'bad' | 'sel' | null; disabled?: boolean }> = ({ v, onClick, state, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-3 rounded-xl text-lg font-black min-h-[52px] min-w-[72px] border-2 transition-colors ${
      state === 'ok'
        ? 'bg-emerald-500 border-emerald-700 text-white'
        : state === 'bad'
        ? 'bg-rose-100 border-rose-400 text-rose-700'
        : state === 'sel'
        ? 'bg-sky-100 border-sky-500 text-sky-900'
        : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
    }`}
  >
    {v}
  </button>
);

// ---------------------------------------------------------------------------
// Labor-segédek (1. lecke)
// ---------------------------------------------------------------------------
export const splitNum = (n: number) => ({ h: Math.floor(n / 100), t: Math.floor(n / 10) % 10, e: n % 10 });

/** Labor I: kirakandó szám 101–1000 (néha kerek tízes, néha 1000). */
export const makeBuildTarget = (prev?: number): number => {
  for (;;) {
    const r = Math.random();
    const n = r < 0.1 ? 1000 : r < 0.3 ? rnd(11, 99) * 10 : r < 0.45 ? rnd(1, 9) * 100 + rnd(1, 9) : rnd(101, 999);
    if (n !== prev) return n;
  }
};

export type CardTask = 'max' | 'min' | 'maxEven' | 'minEven' | 'maxOdd' | 'minOdd';
export const CARD_TASK_TEXT: Record<CardTask, string> = {
  max: 'a legnagyobb háromjegyű számot',
  min: 'a legkisebb háromjegyű számot',
  maxEven: 'a legnagyobb páros háromjegyű számot',
  minEven: 'a legkisebb páros háromjegyű számot',
  maxOdd: 'a legnagyobb páratlan háromjegyű számot',
  minOdd: 'a legkisebb páratlan háromjegyű számot'
};

const perms3 = (d: number[]) => {
  const out: number[] = [];
  for (let a = 0; a < 3; a++)
    for (let b = 0; b < 3; b++)
      for (let c = 0; c < 3; c++) if (a !== b && b !== c && a !== c && d[a] !== 0) out.push(d[a] * 100 + d[b] * 10 + d[c]);
  return out;
};

export const cardCandidates = (digits: number[], task: CardTask) =>
  perms3(digits).filter((n) => (task.endsWith('Even') ? n % 2 === 0 : task.endsWith('Odd') ? n % 2 === 1 : true));

export const cardAnswer = (digits: number[], task: CardTask): number | null => {
  const c = cardCandidates(digits, task);
  if (!c.length) return null;
  return task.startsWith('max') ? Math.max(...c) : Math.min(...c);
};

/** Labor II: három különböző számjegy (néha 0 is) és egy megoldható feladat. */
export const makeCardTask = (): { digits: number[]; task: CardTask } => {
  for (;;) {
    const pool = Math.random() < 0.4 ? [0, ...shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2)] : shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
    const digits = shuffle(pool);
    const task = pick<CardTask>(['max', 'min', 'maxEven', 'minEven', 'maxOdd', 'minOdd']);
    const ans = cardAnswer(digits, task);
    // legyen valódi döntés: a páros/páratlan feladatnál ne essen egybe a sima legnagyobbal/legkisebbel mindig
    if (ans !== null && cardCandidates(digits, task).length >= 2) return { digits, task };
  }
};
