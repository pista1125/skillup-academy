import React from 'react';
import { WrittenAddG3Column, addSteps } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';
import { WrittenSubG3Column, subSteps, carryMarks } from '../../irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';
import { Coin, PriceTag } from '../../irasbeli-kivonas/a-kulonbseg-valtozasai/DiffChangesG3Parts';

// ---------------------------------------------------------------------------
// Közös elemek a XII. fejezet 3–5. leckéjéhez:
// műveletsor-kiértékelő zárójellel (lépésenként), véletlen feladatok 1000-ig,
// kérdésábrák (műveletsor sorszám-körökkel, lánc, pénztárca, csoportok, füzetlap).
// ---------------------------------------------------------------------------

export { Coin, PriceTag };
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#0f172a';

export const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Műveletsor zárójellel
// ---------------------------------------------------------------------------
export type Op = '+' | '−' | '·' | ':';
export type Tok = number | Op | '(' | ')';

export const isOp = (t: Tok): t is Op => t === '+' || t === '−' || t === '·' || t === ':';
export const high = (t: Tok) => t === '·' || t === ':';

export const calc = (a: number, op: Op, b: number): number => {
  if (op === '+') return a + b;
  if (op === '−') return a - b;
  if (op === '·') return a * b;
  return a / b;
};

/** Szövegből tokenek: '(810 − 490) : 8' → ['(', 810, '−', 490, ')', ':', 8]. */
export const parse = (s: string): Tok[] =>
  s
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (/^\d+$/.test(t) ? Number(t) : (t as Tok)));

export const show = (toks: Tok[]) =>
  toks
    .map(String)
    .join(' ')
    .replace(/\( /g, '(')
    .replace(/ \)/g, ')');

/** Melyik műveletet kell most elvégezni? (index) – zárójel belseje előbb, utána · :, végül + −, balról jobbra. */
export const nextIdx = (toks: Tok[]): number => {
  let lo = 0;
  let hi = toks.length - 1;
  const close = toks.indexOf(')');
  if (close >= 0) {
    hi = close - 1;
    for (let i = close - 1; i >= 0; i--)
      if (toks[i] === '(') {
        lo = i + 1;
        break;
      }
  }
  for (let i = lo; i <= hi; i++) if (high(toks[i])) return i;
  for (let i = lo; i <= hi; i++) if (isOp(toks[i])) return i;
  return -1;
};

/** Az i. művelet elvégzése; a feleslegessé vált zárójelet elhagyja. */
export const applyAt = (toks: Tok[], i: number): Tok[] => {
  const r = calc(toks[i - 1] as number, toks[i] as Op, toks[i + 1] as number);
  let t: Tok[] = [...toks.slice(0, i - 1), r, ...toks.slice(i + 2)];
  let changed = true;
  while (changed) {
    changed = false;
    for (let j = 0; j + 2 < t.length; j++)
      if (t[j] === '(' && typeof t[j + 1] === 'number' && t[j + 2] === ')') {
        t = [...t.slice(0, j), t[j + 1], ...t.slice(j + 3)];
        changed = true;
        break;
      }
  }
  return t;
};

export interface EvalStep {
  a: number;
  op: Op;
  b: number;
  r: number;
  line: string;
  after: Tok[];
}

export const steps = (toks: Tok[]): EvalStep[] => {
  const out: EvalStep[] = [];
  let t = toks;
  let guard = 0;
  while (t.length > 1 && guard++ < 20) {
    const i = nextIdx(t);
    if (i < 0) break;
    const n = applyAt(t, i);
    const a = t[i - 1] as number;
    const b = t[i + 1] as number;
    const op = t[i] as Op;
    const r = calc(a, op, b);
    out.push({ a, op, b, r, line: `${a} ${op} ${b} = ${r}`, after: n });
    t = n;
  }
  return out;
};

export const valueOf = (toks: Tok[]): number => {
  const s = steps(toks);
  return s.length ? s[s.length - 1].r : (toks[0] as number);
};
export const evalStr = (s: string) => valueOf(parse(s));

/** Minden részeredmény egész, 0 és 1000 között? */
export const validToks = (toks: Tok[], max = 1000) => steps(toks).every((s) => Number.isInteger(s.r) && s.r >= 0 && s.r <= max);

/** A tipikus hiba: csak balról jobbra (zárójelet és sorrendet figyelmen kívül hagyva). */
export const naive = (toks: Tok[]): number | null => {
  const t = toks.filter((x) => x !== '(' && x !== ')');
  let v = t[0] as number;
  for (let i = 1; i < t.length; i += 2) {
    v = calc(v, t[i] as Op, t[i + 1] as number);
    if (!Number.isInteger(v) || v < 0 || v > 1000) return null;
  }
  return v;
};
/** Ha a zárójelet elhagyja (de a · : előbb jön). */
export const noBrackets = (toks: Tok[]): number | null => {
  const t = toks.filter((x) => x !== '(' && x !== ')');
  return validToks(t) ? valueOf(t) : null;
};

/** Véletlen műveletsor 1000-ig (zárójellel vagy anélkül). kind: 'chain' | 'mul' | 'bracket' | 'any'. */
export const genExpr = (kind: 'chain' | 'mul' | 'bracket' | 'any' = 'any'): Tok[] => {
  const k = kind === 'any' ? pick(['chain', 'mul', 'mul', 'bracket', 'bracket'] as const) : kind;
  for (let tries = 0; tries < 500; tries++) {
    let s = '';
    const t10 = () => 10 * rnd(2, 9);
    if (k === 'chain') {
      const a = rnd(350, 980);
      const b = rnd(105, a - 120);
      const c = rnd(105, 600);
      s = pick([`${a} − ${b} + ${c}`, `${b} + ${c} − ${rnd(100, b)}`, `${a} − ${b} − ${rnd(50, a - b)}`]);
    } else if (k === 'mul') {
      const m = t10();
      const f = rnd(2, 9);
      const a = rnd(m * f, 1000);
      const d = rnd(2, 9);
      const q = t10();
      s = pick([`${a} − ${f} · ${m}`, `${rnd(100, 1000 - m * f)} + ${m} · ${f}`, `${rnd(100, 1000 - q)} + ${d * q} : ${d}`, `${rnd(q, 999)} − ${d * q} : ${d}`]);
    } else {
      const d = rnd(2, 9);
      const q = t10();
      const p = d * q;
      const b = rnd(105, Math.max(106, 1000 - p));
      const x = rnd(120, 480);
      const y = rnd(105, 480);
      const f = rnd(2, 9);
      const g = 10 * rnd(2, Math.floor(100 / f));
      const h = rnd(150, 900);
      s = pick([
        `(${p + b} − ${b}) : ${d}`,
        `${rnd(x + y, 1000)} − (${x} + ${y})`,
        `${rnd(300, 990)} − (${x + y} − ${y})`,
        `${f} · (${h + g} − ${h})`,
        `${rnd(100, 600)} + (${x + y} − ${x})`
      ]);
    }
    const toks = parse(s);
    if (!validToks(toks) || toks.some((x) => typeof x === 'number' && x > 1000)) continue;
    const nv = naive(toks);
    if (k !== 'chain' && nv !== null && nv === valueOf(toks)) continue;
    return toks;
  }
  return parse('850 − 30 · 9');
};

// ---------------------------------------------------------------------------
// Oszlopos segédek (a VII. és VIII. fejezet közös komponenseivel)
// ---------------------------------------------------------------------------
/** Beváltott jegyek az összeadáshoz (a carries prophoz). */
export const addCarries = (nums: number[]) => {
  const st = addSteps(nums, 3);
  return [null, st[0].carryOut || null, st[1].carryOut || null];
};
/** Egy + vagy − lépés oszlopban, a maradékokkal. */
export const ColStep: React.FC<{ a: number; op: '+' | '−'; b: number; result?: number | string; className?: string; carries?: boolean }> = ({ a, op, b, result, className = 'w-full max-w-[150px] h-auto mx-auto', carries = true }) =>
  op === '+' ? (
    <WrittenAddG3Column addends={[a, b]} result={result} carries={carries ? addCarries([a, b]) : []} className={className} cols={a + b > 999 ? 4 : 3} />
  ) : (
    <WrittenSubG3Column minuend={a} subtrahend={b} result={result} carries={carries ? carryMarks(subSteps(a, b), 3) : []} className={className} />
  );

// ---------------------------------------------------------------------------
// Kérdésábrák (240 széles)
// ---------------------------------------------------------------------------
/** Üres négyzet a hiányzó szám helyén (a □ karakter sok betűtípusban apró). */
export const BoxGlyph: React.FC<{ cx: number; cy: number; s: number; color?: string }> = ({ cx, cy, s, color = UNK }) => (
  <rect x={cx - s / 2} y={cy - s / 2} width={s} height={s} rx={s * 0.12} fill="#fff" stroke={color} strokeWidth={Math.max(1.6, s * 0.11)} />
);
/** Szöveg vagy (ha '□') négyzet; x, y = a szöveg alapvonala. */
export const TxtBox: React.FC<{ x: number; y: number; t: string; fs: number; fill?: string }> = ({ x, y, t, fs, fill = INK }) =>
  t === '□' ? <BoxGlyph cx={x} cy={y - fs * 0.36} s={fs * 0.8} /> : <text x={x} y={y} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={fill}>{t}</text>;

export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 130, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const tokW = (t: string, fs: number) => (t === '(' || t === ')' ? fs * 0.42 : /^[+−·:=]$/.test(t) ? fs * 1.05 : t.length * fs * 0.6 + fs * 0.3);

/**
 * Műveletsor nagy betűkkel. `bubbles`: a műveleti jelek fölötti körökbe írt jel
 * (a műveletek sorrendjében balról: pl. ['2.', '1.'] vagy ['?', '?']). `tail`: a végén, pl. '= ?'.
 * A zárójeles rész halvány narancs hátteret kap (hl = true).
 */
export const ExprFig: React.FC<{ expr: string; bubbles?: string[]; tail?: string; hl?: boolean; caption?: string }> = ({ expr, bubbles, tail = '= ?', hl = true, caption }) => {
  const toks = [...expr.replace(/\(/g, ' ( ').replace(/\)/g, ' ) ').split(/\s+/).filter(Boolean)];
  const tailToks = tail ? tail.split(' ') : [];
  const all = [...toks, ...tailToks];
  let fs = 22;
  const total = (f: number) => all.reduce((s, t) => s + tokW(t, f), 0);
  while (total(fs) > 222 && fs > 13) fs -= 1;
  let x = 120 - total(fs) / 2;
  const pos = all.map((t) => {
    const w = tokW(t, fs);
    const c = x + w / 2;
    x += w;
    return c;
  });
  const h = caption ? 104 : 88;
  const yText = 64;
  let opN = 0;
  const open = toks.indexOf('(');
  const close = toks.indexOf(')');
  return (
    <QFig h={h}>
      {hl && open >= 0 && close > open && (
        <rect x={pos[open] - fs * 0.3} y={yText - fs * 0.95} width={pos[close] - pos[open] + fs * 0.6} height={fs * 1.3} rx="8" fill="#ffedd5" stroke="#fb923c" strokeWidth="1.5" />
      )}
      {all.map((t, i) => {
        const op = i < toks.length && /^[+−·:]$/.test(t);
        const b = op && bubbles ? bubbles[opN++] : undefined;
        const unk = t.includes('?') || t === '□' || t === '△';
        return (
          <g key={i}>
            {b !== undefined && b !== '' && (
              <g>
                <circle cx={pos[i]} cy="20" r="11" fill="#fff7ed" stroke="#ea580c" strokeWidth="1.5" />
                <text x={pos[i]} y="25" textAnchor="middle" fontSize="12" fontWeight="bold" fill={b === '?' ? UNK : '#c2410c'}>{b}</text>
              </g>
            )}
            {t === '□' ? <BoxGlyph cx={pos[i]} cy={yText - fs * 0.36} s={fs * 0.8} /> : <text x={pos[i]} y={yText} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={unk ? UNK : t === '(' || t === ')' ? '#c2410c' : INK}>{t}</text>}
          </g>
        );
      })}
      {caption && <text x="120" y="94" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Lánc: kezdőszám → művelet → … → ?  (balról jobbra haladunk). */
export const ChainFig: React.FC<{ start: string; ops: string[]; end?: string; caption?: string }> = ({ start, ops, end = '?', caption }) => {
  const n = ops.length + 1;
  const boxW = 46;
  const gap = (224 - n * boxW) / (n - 1);
  const h = caption ? 104 : 86;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => {
        const x = 8 + i * (boxW + gap);
        const label = i === 0 ? start : i === n - 1 ? end : '';
        return (
          <g key={i}>
            <rect x={x} y="40" width={boxW} height="32" rx="8" fill={['#e0f2fe', '#fef3c7', '#dcfce7', '#f3e8ff'][i % 4]} stroke="#334155" strokeWidth="1.5" />
            <text x={x + boxW / 2} y="62" textAnchor="middle" fontSize="16" fontWeight="bold" fill={label === '?' ? UNK : INK}>{label}</text>
            {i < n - 1 && (
              <g>
                <line x1={x + boxW + 2} y1="56" x2={x + boxW + gap - 4} y2="56" stroke="#64748b" strokeWidth="2" />
                <path d={`M ${x + boxW + gap - 9} 51 L ${x + boxW + gap - 3} 56 L ${x + boxW + gap - 9} 61`} fill="none" stroke="#64748b" strokeWidth="2" />
                <text x={x + boxW + gap / 2} y="32" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#b91c1c">{ops[i]}</text>
              </g>
            )}
          </g>
        );
      })}
      {caption && <text x="120" y="94" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Pénztárca az összeggel, mellette árcédulák. */
export const WalletFig: React.FC<{ money: string; tags: string[]; caption?: string }> = ({ money, tags, caption }) => (
  <QFig h={caption ? 118 : 104}>
    <rect x="14" y="26" width="84" height="56" rx="10" fill="#a16207" stroke="#713f12" strokeWidth="2" />
    <rect x="60" y="42" width="38" height="24" rx="6" fill="#ca8a04" stroke="#713f12" strokeWidth="1.5" />
    <circle cx="70" cy="54" r="3.5" fill="#fde68a" />
    <text x="56" y="20" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{money}</text>
    {tags.map((t, i) => (
      <PriceTag key={i} x={110 + (i % 2) * 64} y={22 + Math.floor(i / 2) * 36} text={t} w={60} fs={13} fill={['#fef3c7', '#dbeafe', '#dcfce7', '#fce7f3'][i % 4]} />
    ))}
    {caption && <text x="120" y="108" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{caption}</text>}
  </QFig>
);

/** k egyforma doboz/sor; mindegyikre ugyanaz a felirat (pl. „90” vagy „125 + 75”). extra: külön darab. */
export const GroupsFig: React.FC<{ k: number; label: string; extra?: string; caption?: string; color?: string }> = ({ k, label, extra, caption, color = '#fde68a' }) => {
  const area = extra ? 168 : 224;
  const w = Math.min(70, (area - (k - 1) * 6) / k);
  const x0 = 8 + (area - (k * w + (k - 1) * 6)) / 2;
  const fs = Math.min(15, (w - 4) / (label.length * 0.6));
  return (
    <QFig h={caption ? 108 : 92}>
      {Array.from({ length: k }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + 6)} y="28" width={w} height="40" rx="7" fill={color} stroke="#92400e" strokeWidth="1.8" />
          <text x={x0 + i * (w + 6) + w / 2} y="53" textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>{label}</text>
        </g>
      ))}
      {extra && (
        <g>
          <text x="186" y="54" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#475569">{extra.startsWith('−') ? '' : '+'}</text>
          <rect x="196" y="32" width="38" height="32" rx="16" fill={extra.startsWith('−') ? '#fee2e2' : '#dcfce7'} stroke={extra.startsWith('−') ? '#b91c1c' : '#15803d'} strokeWidth="1.8" />
          <text x="215" y="53" textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{extra}</text>
        </g>
      )}
      <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{`${k} egyforma`}</text>
      {caption && <text x="120" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{caption}</text>}
    </QFig>
  );
};

/** Füzetlap egy gyerek (hibás vagy jó) számolásával. */
export const NoteFig: React.FC<{ lines: string[]; mark?: 'x' | 'check' | '?' }> = ({ lines, mark = '?' }) => {
  const h = 30 + lines.length * 26;
  const nfs = Math.max(...lines.map((l) => l.length)) > 14 ? 14 : 16;
  return (
    <QFig h={h}>
      <rect x="18" y="10" width="204" height={h - 20} rx="4" fill="#fff" stroke="#93c5fd" />
      {Array.from({ length: lines.length }, (_, i) => (
        <line key={i} x1="22" y1={36 + i * 26} x2="218" y2={36 + i * 26} stroke="#bfdbfe" />
      ))}
      <line x1="40" y1="12" x2="40" y2={h - 12} stroke="#fca5a5" />
      {lines.map((l, i) => (
        <text key={i} x="48" y={31 + i * 26} fontSize={nfs} fontWeight="bold" fill="#1e3a8a" fontFamily="Comic Sans MS, system-ui, sans-serif">{l}</text>
      ))}
      <circle cx="204" cy="26" r="11" fill={mark === 'x' ? '#fee2e2' : mark === 'check' ? '#dcfce7' : '#fef3c7'} stroke={mark === 'x' ? UNK : mark === 'check' ? '#16a34a' : '#ca8a04'} strokeWidth="1.8" />
      <text x="204" y="31" textAnchor="middle" fontSize="14" fontWeight="bold" fill={mark === 'x' ? UNK : mark === 'check' ? '#16a34a' : '#a16207'}>{mark === 'x' ? '✗' : mark === 'check' ? '✓' : '?'}</text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// „Hová tegyük a zárójelet?” – három szám, két művelet, egy célérték
// ---------------------------------------------------------------------------
export interface BracketTask {
  a: number;
  b: number;
  c: number;
  o1: Op;
  o2: Op;
  /** a három írásmód: zárójel nélkül, bal oldali zárójel, jobb oldali zárójel */
  forms: { key: 'none' | 'left' | 'right'; text: string; value: number }[];
  target: number;
}

export const genBracketTask = (): BracketTask => {
  for (let tries = 0; tries < 800; tries++) {
    const kind = rnd(0, 4);
    let a = 0;
    let b = 0;
    let c = 0;
    let o1: Op = '−';
    let o2: Op = '+';
    if (kind === 0) {
      a = 10 * rnd(50, 100);
      b = 10 * rnd(15, 45);
      c = 10 * rnd(10, 40);
      o1 = '−';
      o2 = '+';
    } else if (kind === 1) {
      a = 10 * rnd(50, 100);
      b = 10 * rnd(25, 50);
      c = 10 * rnd(5, 20);
      o1 = '−';
      o2 = '−';
    } else if (kind === 2) {
      a = 10 * rnd(2, 8);
      b = 10 * rnd(2, 8);
      c = rnd(2, 9);
      o1 = '+';
      o2 = '·';
    } else if (kind === 3) {
      a = 10 * rnd(30, 60);
      b = 10 * rnd(1, 20);
      c = rnd(2, 9);
      o1 = '−';
      o2 = '·';
    } else {
      c = rnd(2, 9);
      b = c * 10 * rnd(2, 9);
      a = b + c * 10 * rnd(2, 9);
      o1 = '−';
      o2 = ':';
    }
    const none = `${a} ${o1} ${b} ${o2} ${c}`;
    const left = `(${a} ${o1} ${b}) ${o2} ${c}`;
    const right = `${a} ${o1} (${b} ${o2} ${c})`;
    const all = [none, left, right].map((s) => parse(s));
    if (!all.every((t) => validToks(t))) continue;
    const vals = all.map(valueOf);
    if (vals[1] === vals[2]) continue;
    const forms = [
      { key: 'none' as const, text: none, value: vals[0] },
      { key: 'left' as const, text: left, value: vals[1] },
      { key: 'right' as const, text: right, value: vals[2] }
    ];
    return { a, b, c, o1, o2, forms, target: vals[rnd(1, 2)] };
  }
  const forms = [
    { key: 'none' as const, text: '800 − 300 + 200', value: 700 },
    { key: 'left' as const, text: '(800 − 300) + 200', value: 700 },
    { key: 'right' as const, text: '800 − (300 + 200)', value: 300 }
  ];
  return { a: 800, b: 300, c: 200, o1: '−', o2: '+', forms, target: 300 };
};
