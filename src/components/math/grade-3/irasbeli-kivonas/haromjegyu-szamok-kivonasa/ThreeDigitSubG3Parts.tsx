import React from 'react';

// ---------------------------------------------------------------------------
// Rajzelemek és segédfüggvények a VIII. Írásbeli kivonás fejezet 1–3. leckéjéhez.
// Színek (mint a tankönyvben): százas = piros, tízes = kék, egyes = sárga.
// A tankönyv a kivonást helyiérték-táblázatba rakott korongokkal mutatja
// (TK 90–93. o.) – ehhez való a DiscTable.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';
export const C_SZ = '#ef4444';
export const C_T = '#3b82f6';
export const C_E = '#facc15';
export const PLACE_FILL = ['#f87171', '#60a5fa', '#facc15'];
export const PLACE_TEXT = ['#7f1d1d', '#0c2d6b', '#713f12'];
export const PLACE_BODY = ['#fee2e2', '#dbeafe', '#fef9c3'];

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
/** 4 különböző válasz: a helyes + a megadott rosszak (0..max), szükség esetén ±10-es kitöltéssel. */
export const opts4 = (correct: number, wrong: number[], max = 500): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (w >= 0 && w <= max && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? 10 * k : -10 * k);
    if (w >= 0 && w <= max && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};
/** Névelő szám elé: „az 1”, „az 5…”, „a 340”. */
export const art = (n: number) => (String(n)[0] === '5' || n === 1 ? 'az' : 'a');
/** Számjegyek: százas, tízes, egyes. */
export const digitsOf = (n: number) => ({ sz: Math.floor(n / 100), t: Math.floor(n / 10) % 10, e: n % 10 });
/** Hányszor kell felváltani az írásbeli kivonásban (egyeseknél, tízeseknél)? */
export const exchangeKind = (a: number, b: number) => {
  const A = digitsOf(a);
  const B = digitsOf(b);
  const ones = A.e < B.e;
  const tens = A.t - (ones ? 1 : 0) < B.t;
  return { ones, tens };
};

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 130, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Forint érme (5, 10, 20, 50, 100, 200). crossed: áthúzva (ezt elköltöttük). */
export const Coin: React.FC<{ cx: number; cy: number; v: number | string; r?: number; crossed?: boolean }> = ({ cx, cy, v, r, crossed }) => {
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
    <g opacity={crossed ? 0.55 : 1}>
      <circle cx={cx} cy={cy} r={R} fill={ring} stroke={edge} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={R * 0.7} fill={core} stroke={core === gold ? '#ca8a04' : '#64748b'} strokeWidth="0.9" />
      <text x={cx} y={cy + R * 0.28} textAnchor="middle" fontSize={n >= 100 ? R * 0.7 : R * 0.82} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{n}</text>
      {crossed && <line x1={cx - R} y1={cy + R} x2={cx + R} y2={cy - R} stroke="#dc2626" strokeWidth={Math.max(2, R * 0.16)} strokeLinecap="round" />}
    </g>
  );
};

/** Tízesrúd (kék). */
export const Rod: React.FC<{ x: number; y: number; w?: number; h?: number; thin?: boolean; crossed?: boolean }> = ({ x, y, w = 6, h = 40, thin, crossed }) => (
  <g opacity={crossed ? 0.45 : 1}>
    <rect x={x} y={y} width={w} height={h} rx="1" fill={C_T} stroke="#1e3a8a" strokeWidth="0.9" />
    {!thin &&
      Array.from({ length: 9 }).map((_, k) => (
        <line key={k} x1={x} y1={y + ((k + 1) * h) / 10} x2={x + w} y2={y + ((k + 1) * h) / 10} stroke="#1e3a8a" strokeWidth="0.4" />
      ))}
    {crossed && <line x1={x - 2} y1={y + h} x2={x + w + 2} y2={y} stroke="#dc2626" strokeWidth="1.8" />}
  </g>
);

/** Árcédula. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; w?: number; fs?: number; fill?: string }> = ({ x, y, text, w = 64, fs = 13, fill = '#fff' }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + fs * 0.95} L ${x + w - 10} ${y + fs * 1.9} L ${x} ${y + fs * 1.9} Z`} fill={fill} stroke="#475569" strokeWidth={fs > 16 ? 2.6 : 1.3} />
    <circle cx={x + w - 11} cy={y + fs * 0.95} r={fs * 0.17} fill="#94a3b8" />
    <text x={x + (w - 12) / 2} y={y + fs * 1.33} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a" fontFamily={FONT}>{text}</text>
  </g>
);

/** Egyszerű játékikonok (kb. 40 × 40, középpont cx, cy). */
export type ItemKind = 'ball' | 'kite' | 'car' | 'bear' | 'book' | 'yoyo' | 'frisbee' | 'dice' | 'puzzle' | 'robot';
export const ItemIcon: React.FC<{ kind: ItemKind; cx: number; cy: number; s?: number }> = ({ kind, cx, cy, s = 1 }) => {
  const t = `translate(${cx} ${cy}) scale(${s})`;
  switch (kind) {
    case 'ball':
      return (
        <g transform={t}>
          <circle r="15" fill="#f97316" stroke="#7c2d12" strokeWidth="1.8" />
          <path d="M -15 0 Q 0 -12 15 0" fill="none" stroke="#fff" strokeWidth="2.5" />
          <path d="M -15 0 Q 0 12 15 0" fill="none" stroke="#fff" strokeWidth="2.5" />
        </g>
      );
    case 'kite':
      return (
        <g transform={t}>
          <path d="M 0 -17 L 13 -2 L 0 14 L -13 -2 Z" fill="#f43f5e" stroke="#881337" strokeWidth="1.8" />
          <line x1="0" y1="-17" x2="0" y2="14" stroke="#881337" strokeWidth="1.2" />
          <line x1="-13" y1="-2" x2="13" y2="-2" stroke="#881337" strokeWidth="1.2" />
          <path d="M 0 14 Q 5 18 2 21" fill="none" stroke="#475569" strokeWidth="1.5" />
        </g>
      );
    case 'car':
      return (
        <g transform={t}>
          <path d="M -17 4 L -17 -3 L -9 -4 L -5 -12 L 7 -12 L 11 -4 L 17 -3 L 17 4 Z" fill="#a855f7" stroke="#581c87" strokeWidth="1.8" />
          <circle cx="-9" cy="6" r="5" fill="#1e293b" />
          <circle cx="9" cy="6" r="5" fill="#1e293b" />
        </g>
      );
    case 'bear':
      return (
        <g transform={t}>
          <circle cx="-9" cy="-12" r="5" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="9" cy="-12" r="5" fill="#b45309" stroke="#451a03" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="13" fill="#d97706" stroke="#451a03" strokeWidth="1.8" />
          <circle cx="-4.5" cy="-3" r="1.8" fill="#1e293b" />
          <circle cx="4.5" cy="-3" r="1.8" fill="#1e293b" />
          <ellipse cx="0" cy="4" rx="4.5" ry="3.2" fill="#fde68a" />
        </g>
      );
    case 'book':
      return (
        <g transform={t}>
          <rect x="-16" y="-13" width="32" height="26" rx="2" fill="#22c55e" stroke="#14532d" strokeWidth="1.8" />
          <line x1="0" y1="-13" x2="0" y2="13" stroke="#14532d" strokeWidth="1.8" />
          <line x1="-12" y1="-6" x2="-4" y2="-6" stroke="#dcfce7" strokeWidth="2" />
          <line x1="4" y1="-6" x2="12" y2="-6" stroke="#dcfce7" strokeWidth="2" />
        </g>
      );
    case 'yoyo':
      return (
        <g transform={t}>
          <line x1="0" y1="-18" x2="0" y2="-6" stroke="#475569" strokeWidth="1.5" />
          <circle cx="0" cy="4" r="12" fill="#ec4899" stroke="#831843" strokeWidth="1.8" />
          <circle cx="0" cy="4" r="4" fill="#fdf2f8" stroke="#831843" strokeWidth="1.2" />
        </g>
      );
    case 'frisbee':
      return (
        <g transform={t}>
          <ellipse cx="0" cy="2" rx="17" ry="8" fill="#14b8a6" stroke="#134e4a" strokeWidth="1.8" />
          <ellipse cx="0" cy="0" rx="9" ry="3.5" fill="#99f6e4" stroke="#134e4a" strokeWidth="1.1" />
        </g>
      );
    case 'dice':
      return (
        <g transform={t}>
          <rect x="-13" y="-13" width="26" height="26" rx="5" fill="#fff" stroke="#334155" strokeWidth="1.8" />
          <circle cx="-6" cy="-6" r="2.4" fill="#1e293b" />
          <circle cx="0" cy="0" r="2.4" fill="#1e293b" />
          <circle cx="6" cy="6" r="2.4" fill="#1e293b" />
        </g>
      );
    case 'puzzle':
      return (
        <g transform={t}>
          <path d="M -13 -13 L -3 -13 A 4 4 0 1 1 3 -13 L 13 -13 L 13 -3 A 4 4 0 1 1 13 3 L 13 13 L -13 13 Z" fill="#eab308" stroke="#713f12" strokeWidth="1.8" />
        </g>
      );
    case 'robot':
    default:
      return (
        <g transform={t}>
          <line x1="0" y1="-17" x2="0" y2="-11" stroke="#334155" strokeWidth="1.6" />
          <circle cx="0" cy="-17" r="2.2" fill="#ef4444" />
          <rect x="-12" y="-11" width="24" height="18" rx="4" fill="#94a3b8" stroke="#334155" strokeWidth="1.8" />
          <circle cx="-5" cy="-3" r="2.6" fill="#1e293b" />
          <circle cx="5" cy="-3" r="2.6" fill="#1e293b" />
          <rect x="-8" y="9" width="16" height="7" rx="2" fill="#64748b" stroke="#334155" strokeWidth="1.4" />
        </g>
      );
  }
};

/** Helyiérték-táblázat fejléce (sz / t / e) x-től, cw szélességű oszlopokkal. */
export const PlaceHeader: React.FC<{ x: number; y: number; cw: number; h?: number }> = ({ x, y, cw, h = 18 }) => (
  <g fontFamily={FONT}>
    {['sz', 't', 'e'].map((l, i) => (
      <g key={l}>
        <rect x={x + i * cw} y={y} width={cw} height={h} fill={PLACE_FILL[i]} stroke="#fff" strokeWidth="1" />
        <text x={x + i * cw + cw / 2} y={y + h * 0.72} textAnchor="middle" fontSize={h * 0.62} fontWeight="bold" fill={PLACE_TEXT[i]}>{l}</text>
      </g>
    ))}
  </g>
);

/**
 * Korongok egy cellában (a tankönyv helyiérték-táblázata szerint).
 * n korong, ebből az utolsó `crossed` darab áthúzva (elvettük), `fresh` darab zöld keretes (most váltottuk fel).
 * Legfeljebb 5 korong egy sorban.
 */
export const DiscCell: React.FC<{ x: number; y: number; w: number; n: number; place: 0 | 1 | 2; r?: number; crossed?: number; fresh?: number; perRow?: number }> = ({
  x,
  y,
  w,
  n,
  place,
  r = 5,
  crossed = 0,
  fresh = 0,
  perRow = 5
}) => {
  const gap = r * 2 + 2.6;
  const rowW = Math.min(n, perRow) * gap - 2.6;
  const x0 = x + (w - rowW) / 2 + r;
  const fill = [C_SZ, C_T, C_E][place];
  const edge = ['#7f1d1d', '#1e3a8a', '#a16207'][place];
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => {
        const cx = x0 + (i % perRow) * gap;
        const cy = y + r + Math.floor(i / perRow) * gap;
        const isCrossed = i >= n - crossed;
        const isFresh = i >= n - crossed - fresh && i < n - crossed;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill={fill} stroke={isFresh ? '#16a34a' : edge} strokeWidth={isFresh ? 2 : 1} opacity={isCrossed ? 0.5 : 1} />
            {isCrossed && <line x1={cx - r} y1={cy + r} x2={cx + r} y2={cy - r} stroke="#1e293b" strokeWidth="1.6" strokeLinecap="round" />}
          </g>
        );
      })}
    </g>
  );
};

/** „-hoz/-hez/-höz” rag számhoz (245-höz, 250-hez, 300-hoz). */
export const hoz = (n: number): string => {
  const e = n % 10;
  const t = Math.floor(n / 10) % 10;
  if (e) return ['', 'hez', 'höz', 'hoz', 'hez', 'höz', 'hoz', 'hez', 'hoz', 'hez'][e];
  if (t) return ['', 'hez', 'hoz', 'hoz', 'hez', 'hez', 'hoz', 'hez', 'hoz', 'hez'][t];
  return 'hoz';
};
