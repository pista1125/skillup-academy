import React from 'react';

// ---------------------------------------------------------------------------
// Rajzelemek és segédfüggvények a VII. Írásbeli összeadás fejezet 1–3. leckéjéhez.
// Színek (mint a tankönyvben): százas = piros, tízes = kék, egyes = sárga.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';
export const C_SZ = '#ef4444';
export const C_T = '#3b82f6';
export const C_E = '#facc15';

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
export const art = (n: number) => (String(n)[0] === '5' || n === 1 || (n >= 1000 && n < 2000) ? 'az' : 'a');

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 130, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Forint érme (5, 10, 20, 50, 100, 200). */
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

/** Százas lap (piros, 10 × 10). */
export const Flat: React.FC<{ x: number; y: number; s?: number; thin?: boolean }> = ({ x, y, s = 40, thin }) => (
  <g>
    <rect x={x} y={y} width={s} height={s} rx="1.5" fill={C_SZ} stroke="#7f1d1d" strokeWidth={thin ? 1 : 1.4} />
    {!thin &&
      Array.from({ length: 9 }).map((_, k) => (
        <g key={k}>
          <line x1={x + ((k + 1) * s) / 10} y1={y} x2={x + ((k + 1) * s) / 10} y2={y + s} stroke="#7f1d1d" strokeWidth="0.35" />
          <line x1={x} y1={y + ((k + 1) * s) / 10} x2={x + s} y2={y + ((k + 1) * s) / 10} stroke="#7f1d1d" strokeWidth="0.35" />
        </g>
      ))}
  </g>
);

/** Tízesrúd (kék). */
export const Rod: React.FC<{ x: number; y: number; w?: number; h?: number; thin?: boolean }> = ({ x, y, w = 6, h = 40, thin }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="1" fill={C_T} stroke="#1e3a8a" strokeWidth="0.9" />
    {!thin &&
      Array.from({ length: 9 }).map((_, k) => (
        <line key={k} x1={x} y1={y + ((k + 1) * h) / 10} x2={x + w} y2={y + ((k + 1) * h) / 10} stroke="#1e3a8a" strokeWidth="0.4" />
      ))}
  </g>
);

/** Egyes kocka (sárga). */
export const Cube: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 6 }) => (
  <rect x={x} y={y} width={s} height={s} rx="1" fill={C_E} stroke="#a16207" strokeWidth="0.9" />
);

/**
 * Egy szám kirakva: sz százas lap, t tízesrúd, e egyes kocka egy sorban.
 * s = a százas lap mérete; a rúd s magas, s·0.15 széles; a kockák 3 soros oszlopokban.
 */
export const BlockNum: React.FC<{ x: number; y: number; sz: number; t: number; e: number; s?: number }> = ({ x, y, sz, t, e, s = 40 }) => {
  const items: React.ReactNode[] = [];
  const rw = Math.max(4, s * 0.15);
  const cs = Math.max(5, s * 0.2);
  let cx = x;
  for (let i = 0; i < sz; i++) {
    items.push(<Flat key={`f${i}`} x={cx} y={y} s={s} thin={s < 24} />);
    cx += s + 4;
  }
  for (let i = 0; i < t; i++) {
    items.push(<Rod key={`r${i}`} x={cx} y={y} w={rw} h={s} thin={s < 24} />);
    cx += rw + 2.5;
  }
  if (t > 0) cx += 2;
  for (let i = 0; i < e; i++) {
    const colI = Math.floor(i / 3);
    const rowI = i % 3;
    items.push(<Cube key={`c${i}`} x={cx + colI * (cs + 2)} y={y + s - (rowI + 1) * (cs + 2) + 2} s={cs} />);
  }
  return <g>{items}</g>;
};
export const blockNumWidth = (sz: number, t: number, e: number, s = 40) => {
  const rw = Math.max(4, s * 0.15);
  const cs = Math.max(5, s * 0.2);
  let w = sz * (s + 4) + t * (rw + 2.5) + (t > 0 ? 2 : 0) + Math.ceil(e / 3) * (cs + 2);
  if (e === 0) w -= t > 0 ? 4.5 : 4;
  return Math.max(0, w);
};

/** Árcédula. */
export const PriceTag: React.FC<{ x: number; y: number; text: string; w?: number; fs?: number; fill?: string }> = ({ x, y, text, w = 64, fs = 13, fill = '#fff' }) => (
  <g>
    <path d={`M ${x} ${y} L ${x + w - 10} ${y} L ${x + w} ${y + fs * 0.95} L ${x + w - 10} ${y + fs * 1.9} L ${x} ${y + fs * 1.9} Z`} fill={fill} stroke="#475569" strokeWidth={fs > 16 ? 2.6 : 1.3} />
    <circle cx={x + w - 11} cy={y + fs * 0.95} r={fs * 0.17} fill="#94a3b8" />
    <text x={x + (w - 12) / 2} y={y + fs * 1.33} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#0f172a" fontFamily={FONT}>{text}</text>
  </g>
);

/** Egyszerű tárgyikonok a vásáros feladatokhoz (kb. 40 × 40, középpont cx, cy). */
export type ItemKind = 'mug' | 'book' | 'ball' | 'kite' | 'car' | 'cake' | 'bear' | 'pencil' | 'plant' | 'jar';
export const ItemIcon: React.FC<{ kind: ItemKind; cx: number; cy: number; s?: number }> = ({ kind, cx, cy, s = 1 }) => {
  const t = `translate(${cx} ${cy}) scale(${s})`;
  switch (kind) {
    case 'mug':
      return (
        <g transform={t}>
          <rect x="-13" y="-14" width="22" height="28" rx="3" fill="#38bdf8" stroke="#075985" strokeWidth="1.8" />
          <path d="M 9 -8 Q 19 -8 19 0 Q 19 8 9 8" fill="none" stroke="#075985" strokeWidth="3" />
          <circle cx="-2" cy="0" r="4" fill="#fde047" />
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
    case 'cake':
      return (
        <g transform={t}>
          <rect x="-15" y="-4" width="30" height="16" rx="2" fill="#fbcfe8" stroke="#9d174d" strokeWidth="1.8" />
          <path d="M -15 -4 Q -10 2 -5 -4 Q 0 2 5 -4 Q 10 2 15 -4" fill="#fff" stroke="#9d174d" strokeWidth="1.2" />
          <rect x="-1.5" y="-14" width="3" height="10" fill="#fde047" stroke="#a16207" strokeWidth="0.8" />
          <circle cx="0" cy="-16" r="2.2" fill="#f97316" />
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
    case 'pencil':
      return (
        <g transform={`${t} rotate(-35)`}>
          <rect x="-16" y="-4" width="26" height="8" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />
          <path d="M 10 -4 L 18 0 L 10 4 Z" fill="#fde68a" stroke="#854d0e" strokeWidth="1.5" />
          <rect x="-20" y="-4" width="4" height="8" fill="#f472b6" stroke="#854d0e" strokeWidth="1.5" />
        </g>
      );
    case 'plant':
      return (
        <g transform={t}>
          <path d="M -10 2 L 10 2 L 7 16 L -7 16 Z" fill="#c2410c" stroke="#7c2d12" strokeWidth="1.8" />
          <path d="M 0 2 Q -12 -6 -8 -16 Q 0 -10 0 2" fill="#22c55e" stroke="#14532d" strokeWidth="1.4" />
          <path d="M 0 2 Q 12 -6 8 -16 Q 0 -10 0 2" fill="#4ade80" stroke="#14532d" strokeWidth="1.4" />
        </g>
      );
    case 'jar':
    default:
      return (
        <g transform={t}>
          <rect x="-11" y="-16" width="22" height="6" rx="2" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
          <rect x="-13" y="-10" width="26" height="26" rx="5" fill="#fbbf24" stroke="#92400e" strokeWidth="1.8" />
          <rect x="-8" y="-2" width="16" height="9" rx="2" fill="#fff7ed" />
        </g>
      );
  }
};

/** Helyiérték-táblázat fejléce (sz / t / e) x-től, cw szélességű oszlopokkal. */
export const PlaceHeader: React.FC<{ x: number; y: number; cw: number; h?: number }> = ({ x, y, cw, h = 18 }) => (
  <g fontFamily={FONT}>
    {[
      { l: 'sz', f: '#f87171', c: '#7f1d1d' },
      { l: 't', f: '#60a5fa', c: '#0c2d6b' },
      { l: 'e', f: '#facc15', c: '#713f12' }
    ].map((p, i) => (
      <g key={p.l}>
        <rect x={x + i * cw} y={y} width={cw} height={h} fill={p.f} stroke="#fff" strokeWidth="1" />
        <text x={x + i * cw + cw / 2} y={y + h * 0.72} textAnchor="middle" fontSize={h * 0.62} fontWeight="bold" fill={p.c}>{p.l}</text>
      </g>
    ))}
  </g>
);
