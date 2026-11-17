import React from 'react';
import {
  FONT,
  UNK,
  Coin,
  Flat,
  Rod,
  Cube,
  PriceTag as PriceTagLocal,
  ItemIcon as ItemIconLocal,
  ItemKind as ItemKindLocal
} from '../../irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

// ---------------------------------------------------------------------------
// Közös rajzelemek és segédfüggvények a XIII. Írásbeli szorzás fejezet
// 1–3. leckéjéhez (a 2. és 3. lecke innen importál).
// Színek (mint a tankönyvben): százas = piros, tízes = kék, egyes = sárga.
// ---------------------------------------------------------------------------

export {
  FONT,
  UNK,
  INK,
  C_SZ,
  C_T,
  C_E,
  rnd,
  shuffle,
  art,
  QFig,
  Coin,
  Flat,
  Rod,
  Cube,
  BlockNum,
  blockNumWidth,
  PriceTag,
  PlaceHeader,
  ItemIcon
} from '../../irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';
export type { ItemKind } from '../../irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

/** „-szor / -szer / -ször” a szorzó után: 3-szor, 4-szer, 5-ször, 6-szor. */
export const szor = (n: number): string => {
  const last = n % 10;
  const suf = ['szer', 'szer', 'szer', 'szor', 'szer', 'ször', 'szor', 'szer', 'szor', 'szer'][last];
  return `${n}-${n === 10 ? 'szer' : suf}`;
};

/** Tárgyrag számhoz: „a 2-t”, „a 4-et”, „az 5-öt”, „a 10-et”, „a 360-at”. */
export const targy = (n: number): string => {
  if (n === 0) return 'a 0-t';
  const article = n === 1 || String(n)[0] === '5' || (n >= 1000 && n < 2000) ? 'az' : 'a';
  let suf: string;
  if (n % 1000 === 0) suf = 'et';
  else if (n % 100 === 0) suf = 'at';
  else if (n % 10 === 0) suf = ['', 'et', 'at', 'at', 'et', 'et', 'at', 'et', 'at', 'et'][Math.floor(n / 10) % 10];
  else suf = ['t', 'et', 't', 'at', 'et', 'öt', 'ot', 'et', 'at', 'et'][n % 10];
  return `${article} ${n}-${suf}`;
};

/** 4 különböző válasz a helyessel az elején (a sablon keveri), 0..max között. */
export const opts = (correct: number | string, wrong: (number | string)[], max = 1000): string[] => {
  const out = [String(correct)];
  wrong.forEach((w) => {
    if (typeof w === 'number' && (w < 0 || w > max)) return;
    if (!out.includes(String(w)) && out.length < 4) out.push(String(w));
  });
  let k = 1;
  const c = Number(correct);
  while (out.length < 4 && !Number.isNaN(c)) {
    const w = c + (k % 2 ? 10 * k : -10 * k);
    if (w >= 0 && w <= max && !out.includes(String(w))) out.push(String(w));
    k++;
  }
  return out;
};

/** Számválaszok gombsora (lab): nagy gombok, azonnali visszajelzés. */
export const ChoiceRow: React.FC<{
  options: (number | string)[];
  onPick: (v: number | string) => void;
  bad?: (number | string)[];
  good?: number | string | null;
  disabled?: boolean;
  suffix?: string;
}> = ({ options, onPick, bad = [], good = null, disabled, suffix = '' }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-lg mx-auto">
    {options.map((o) => {
      const isBad = bad.includes(o);
      const isGood = good === o;
      return (
        <button
          key={String(o)}
          disabled={disabled || isBad}
          onClick={() => onPick(o)}
          className={`min-h-[56px] rounded-xl text-xl font-black border-2 transition-colors ${
            isGood
              ? 'bg-emerald-100 border-emerald-500 text-emerald-800'
              : isBad
                ? 'bg-rose-100 border-rose-400 text-rose-700 line-through'
                : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
          } disabled:cursor-default`}
        >
          {o}
          {suffix}
        </button>
      );
    })}
  </div>
);

/** Számbillentyűzet 1–9, 0. */
export const KeyPad: React.FC<{ onKey: (d: number) => void; bad?: number | null; disabled?: boolean; zero?: boolean }> = ({ onKey, bad, disabled, zero = true }) => (
  <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto">
    {(zero ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] : [1, 2, 3, 4, 5, 6, 7, 8, 9]).map((d) => (
      <button
        key={d}
        disabled={disabled}
        onClick={() => onKey(d)}
        className={`min-h-[52px] rounded-xl text-2xl font-black border-2 transition-colors ${
          bad === d ? 'bg-rose-100 border-rose-400 text-rose-700' : 'bg-white border-slate-300 text-slate-800 hover:bg-slate-50'
        } disabled:opacity-40`}
      >
        {d}
      </button>
    ))}
  </div>
);

/** Kerek tízes pénzzel: százasok (100 Ft) és tízesek (10 Ft) egy sorban. Visszaadja a szélességet is. */
export const coinRowWidth = (amount: number, r100 = 12, r10 = 9) => {
  const h = Math.floor(amount / 100);
  const t = Math.floor(amount / 10) % 10;
  return h * (2 * r100 + 3) + (t > 0 && h > 0 ? 5 : 0) + t * (2 * r10 + 2);
};
export const CoinRow: React.FC<{ x: number; cy: number; amount: number; r100?: number; r10?: number }> = ({ x, cy, amount, r100 = 12, r10 = 9 }) => {
  const h = Math.floor(amount / 100);
  const t = Math.floor(amount / 10) % 10;
  const out: React.ReactNode[] = [];
  let cx = x;
  for (let i = 0; i < h; i++) {
    out.push(<Coin key={`h${i}`} cx={cx + r100} cy={cy} v={100} r={r100} />);
    cx += 2 * r100 + 3;
  }
  if (t > 0 && h > 0) cx += 5;
  for (let i = 0; i < t; i++) {
    out.push(<Coin key={`t${i}`} cx={cx + r10} cy={cy} v={10} r={r10} />);
    cx += 2 * r10 + 2;
  }
  return <g>{out}</g>;
};

/** Egy szám kirakva kicsiben: százaslapok, tízesrudak, egyeskockák (s = lapméret). */
export const MiniBlocks: React.FC<{ x: number; y: number; n: number; s?: number }> = ({ x, y, n, s = 18 }) => {
  const h = Math.floor(n / 100);
  const t = Math.floor(n / 10) % 10;
  const e = n % 10;
  const out: React.ReactNode[] = [];
  let cx = x;
  for (let i = 0; i < h; i++) {
    out.push(<Flat key={`f${i}`} x={cx} y={y} s={s} thin />);
    cx += s + 3;
  }
  if (h > 0 && t > 0) cx += 2;
  for (let i = 0; i < t; i++) {
    out.push(<Rod key={`r${i}`} x={cx} y={y} w={s * 0.26} h={s} thin />);
    cx += s * 0.26 + 2;
  }
  if ((h > 0 || t > 0) && e > 0) cx += 3;
  const cs = s * 0.26;
  for (let i = 0; i < e; i++) {
    out.push(<Cube key={`c${i}`} x={cx + Math.floor(i / 3) * (cs + 1.5)} y={y + s - ((i % 3) + 1) * (cs + 1.5) + 1.5} s={cs} />);
  }
  return <g>{out}</g>;
};
export const miniBlocksWidth = (n: number, s = 18) => {
  const h = Math.floor(n / 100);
  const t = Math.floor(n / 10) % 10;
  const e = n % 10;
  let w = h * (s + 3) + (h > 0 && t > 0 ? 2 : 0) + t * (s * 0.26 + 2) + ((h > 0 || t > 0) && e > 0 ? 3 : 0) + Math.ceil(e / 3) * (s * 0.26 + 1.5);
  return w;
};

/** Kapcsos zárójel (alul): x1..x2 között, y magasságban, lefelé nyíló. */
export const BraceDown: React.FC<{ x1: number; x2: number; y: number; d?: number; color?: string }> = ({ x1, x2, y, d = 7, color = '#64748b' }) => {
  const m = (x1 + x2) / 2;
  return <path d={`M ${x1} ${y} Q ${x1} ${y + d} ${x1 + d} ${y + d} L ${m - d} ${y + d} Q ${m} ${y + d} ${m} ${y + 2 * d} Q ${m} ${y + d} ${m + d} ${y + d} L ${x2 - d} ${y + d} Q ${x2} ${y + d} ${x2} ${y}`} fill="none" stroke={color} strokeWidth="1.8" />;
};

/** Ismeretlen doboz „?” felirattal. */
export const QBox: React.FC<{ x: number; y: number; w?: number; h?: number; fs?: number }> = ({ x, y, w = 34, h = 24, fs = 16 }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx="5" fill="#fee2e2" stroke={UNK} strokeWidth="1.6" />
    <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={UNK} fontFamily={FONT}>?</text>
  </g>
);

/** Nyíl (szorzólánc): x1 → x2, felirat fölötte. */
export const OpArrow: React.FC<{ x1: number; x2: number; y: number; label: string; fs?: number; color?: string }> = ({ x1, x2, y, label, fs = 13, color = '#7c3aed' }) => (
  <g fontFamily={FONT}>
    <line x1={x1} y1={y} x2={x2 - 6} y2={y} stroke={color} strokeWidth="2.2" />
    <path d={`M ${x2} ${y} L ${x2 - 8} ${y - 4.5} L ${x2 - 8} ${y + 4.5} Z`} fill={color} />
    <text x={(x1 + x2) / 2} y={y - 6} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={color}>{label}</text>
  </g>
);

// ---------------------------------------------------------------------------
// Kérdésábrák (240 széles keretben) – a 2. és 3. lecke is használja.
// ---------------------------------------------------------------------------
export const QFrame: React.FC<{ h: number; children?: React.ReactNode }> = ({ h, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** m sor pénz, mindegyik sor `a` Ft (kerek tízes); alul felirat. */
export const CoinsQ: React.FC<{ a: number; m: number; caption?: string }> = ({ a, m, caption }) => {
  const rh = 24;
  const w = coinRowWidth(a, 10, 7);
  const h = 16 + m * rh + (caption ? 26 : 4);
  const x0 = (240 - w) / 2 + 8;
  return (
    <QFrame h={h}>
      {Array.from({ length: m }).map((_, r) => (
        <g key={r}>
          <text x={x0 - 18} y={16 + r * rh + 15} fontSize="11" fontWeight="bold" fill="#64748b">{r + 1}.</text>
          <CoinRow x={x0} cy={16 + r * rh + 11} amount={a} r100={10} r10={7} />
        </g>
      ))}
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{caption}</text>}
    </QFrame>
  );
};

/** m csoport, mindegyikben az `n` szám kirakva (lap, rúd, kocka); alul felirat. */
export const BlocksQ: React.FC<{ n: number; m: number; caption?: string; s?: number }> = ({ n, m, caption, s = 22 }) => {
  const gw = miniBlocksWidth(n, s) + 12;
  const perRow = Math.max(1, Math.min(m, Math.floor(230 / (gw + 6))));
  const rows = Math.ceil(m / perRow);
  const gh = s + 12;
  const h = 10 + rows * (gh + 6) + (caption ? 26 : 4);
  const totalW = perRow * (gw + 6) - 6;
  const x0 = (240 - totalW) / 2;
  return (
    <QFrame h={h}>
      {Array.from({ length: m }).map((_, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const x = x0 + c * (gw + 6);
        const y = 10 + r * (gh + 6);
        return (
          <g key={i}>
            <rect x={x} y={y} width={gw} height={gh} rx="6" fill="#fff" stroke="#94a3b8" strokeDasharray="4 3" />
            <MiniBlocks x={x + 6} y={y + 6} n={n} s={s} />
          </g>
        );
      })}
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{caption}</text>}
    </QFrame>
  );
};

/** Árcédula + m darab tárgy; alul felirat. */
export const TagQ: React.FC<{ price: string; m: number; kind: ItemKindLocal; caption?: string }> = ({ price, m, kind, caption }) => {
  const h = caption ? 118 : 96;
  const step = Math.min(34, 136 / m);
  return (
    <QFrame h={h}>
      <PriceTagLocal x={10} y={22} text={price} w={80} fs={15} />
      {Array.from({ length: m }).map((_, i) => (
        <ItemIconLocal key={i} kind={kind} cx={98 + step / 2 + i * step} cy={38} s={Math.min(0.75, step / 44)} />
      ))}
      <text x="166" y="82" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#475569">{m} db</text>
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{caption}</text>}
    </QFrame>
  );
};

/** Szorzólánc: értékek és műveletek; '?' piros dobozban; `under` = az átívelő nyíl felirata. */
export const ChainQ: React.FC<{ vals: string[]; ops: string[]; under?: string }> = ({ vals, ops, under }) => {
  const n = vals.length;
  const bw = 52;
  const gap = (224 - n * bw) / (n - 1);
  const h = under ? 108 : 70;
  return (
    <QFrame h={h}>
      {vals.map((v, i) => {
        const x = 8 + i * (bw + gap);
        const q = v === '?';
        return (
          <g key={i}>
            <rect x={x} y="24" width={bw} height="30" rx="7" fill={q ? '#fee2e2' : '#fff'} stroke={q ? UNK : '#64748b'} strokeWidth="1.8" />
            <text x={x + bw / 2} y="45" textAnchor="middle" fontSize="16" fontWeight="bold" fill={q ? UNK : '#0f172a'}>{v}</text>
            {i < n - 1 && <OpArrow x1={x + bw + 3} x2={x + bw + gap - 3} y={39} label={ops[i]} fs={12} color={ops[i].includes('?') ? UNK : '#7c3aed'} />}
          </g>
        );
      })}
      {under && (
        <g>
          <path d={`M ${8 + bw / 2} 58 Q ${8 + bw / 2} 92 120 92 Q ${232 - bw / 2} 92 ${232 - bw / 2} 64`} fill="none" stroke="#16a34a" strokeWidth="2" />
          <path d={`M ${232 - bw / 2} 57 L ${227 - bw / 2} 66 L ${237 - bw / 2} 66 Z`} fill="#16a34a" />
          <rect x="98" y="82" width="44" height="20" rx="5" fill="#f8fafc" />
          <text x="120" y="97" textAnchor="middle" fontSize="13" fontWeight="bold" fill={under.includes('?') ? UNK : '#16a34a'}>{under}</text>
        </g>
      )}
    </QFrame>
  );
};

/** Bontás: „a · m = H · m + T · m”, alatta a részeredmények (lehet '?'). */
export const SplitQ: React.FC<{ a: number; m: number; p1: string; p2: string; total?: string }> = ({ a, m, p1, p2, total = '?' }) => {
  const H = Math.floor(a / 100) * 100;
  const T = a % 100;
  const val = (x: number, t: string, c: string) =>
    t === '?' ? <QBox x={x - 18} y={58} w={36} h={24} fs={15} /> : <text x={x} y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill={c}>{t}</text>;
  return (
    <QFrame h={96}>
      <text x="10" y="32" fontSize="15" fontWeight="bold" fill="#0f172a">{a} · {m} =</text>
      <text x="96" y="32" fontSize="15" fontWeight="bold" fill="#b91c1c">{H} · {m}</text>
      <text x="152" y="32" fontSize="15" fontWeight="bold" fill="#0f172a">+</text>
      <text x="168" y="32" fontSize="15" fontWeight="bold" fill="#1d4ed8">{T} · {m}</text>
      <BraceDown x1={96} x2={144} y={38} d={5} />
      <BraceDown x1={168} x2={212} y={38} d={5} />
      {val(120, p1, '#b91c1c')}
      <text x="156" y="76" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">+</text>
      {val(190, p2, '#1d4ed8')}
      <text x="24" y="76" fontSize="14" fontWeight="bold" fill="#0f172a">=</text>
      {total === '?' ? <QBox x={40} y={58} w={44} h={24} fs={15} /> : <text x="62" y="76" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">{total}</text>}
    </QFrame>
  );
};

/** Számegyenes 0-tól max-ig, `step` közönként, kiemelt érték(ek) pirossal. */
export const NumLineQ: React.FC<{ max: number; step: number; marks: number[]; labelEvery?: number; caption?: string }> = ({ max, step, marks, labelEvery, caption }) => {
  const x0 = 16;
  const x1 = 224;
  const X = (v: number) => x0 + ((x1 - x0) * v) / max;
  const h = caption ? 92 : 70;
  return (
    <QFrame h={h}>
      <line x1={x0} y1="34" x2={x1} y2="34" stroke="#334155" strokeWidth="2" />
      {Array.from({ length: Math.floor(max / step) + 1 }).map((_, i) => {
        const v = i * step;
        const lab = v === 0 || (labelEvery ? v % labelEvery === 0 : false) || marks.includes(v);
        return (
          <g key={i}>
            <line x1={X(v)} y1="27" x2={X(v)} y2="41" stroke="#334155" strokeWidth="1.6" />
            {lab && <text x={X(v)} y="58" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill={marks.includes(v) ? '#b91c1c' : '#334155'}>{v}</text>}
          </g>
        );
      })}
      {marks.map((v) => (
        <circle key={v} cx={X(v)} cy="34" r="4.5" fill="#dc2626" />
      ))}
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{caption}</text>}
    </QFrame>
  );
};

/** Kártyák egymás mellett (számkártyák, vagy két kifejezés középen „?”-lel). */
export const CardsQ: React.FC<{ cards: string[]; mid?: string; w?: number }> = ({ cards, mid, w }) => {
  const n = cards.length;
  const gap = mid ? 36 : 10;
  const cw = w ?? Math.min(70, (220 - (n - 1) * gap) / n);
  const total = n * cw + (n - 1) * gap;
  const x0 = (240 - total) / 2;
  return (
    <QFrame h={74}>
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={x0 + i * (cw + gap)} y="16" width={cw} height="40" rx="8" fill={['#fce7f3', '#e0f2fe', '#fef9c3', '#ffedd5'][i % 4]} stroke="#64748b" strokeWidth="1.6" />
          <text x={x0 + i * (cw + gap) + cw / 2} y="43" textAnchor="middle" fontSize={c.length > 3 ? 16 : 22} fontWeight="bold" fill="#0f172a">{c}</text>
        </g>
      ))}
      {mid && n === 2 && <text x="120" y="45" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>{mid}</text>}
    </QFrame>
  );
};
