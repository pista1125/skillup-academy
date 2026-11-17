// ---------------------------------------------------------------------------
// Segédek az „5. A műveletek sorrendje” leckéhez (XIII. Írásbeli szorzás):
// műveletsor-kiértékelő zárójellel, lépésenként; véletlen feladatok 1000-ig,
// amelyekben háromjegyű szám szorzása egyjegyűvel is előfordul.
// ---------------------------------------------------------------------------

export const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

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

/** '2 · (165 + 230)' → [2, '·', '(', 165, '+', 230, ')'] */
export const parse = (s: string): Tok[] =>
  s
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (/^\d+$/.test(t) ? Number(t) : (t as Tok)));

export const show = (toks: Tok[]) => toks.map(String).join(' ').replace(/\( /g, '(').replace(/ \)/g, ')');

/** A most elvégzendő művelet indexe: zárójel belseje előbb, utána · és :, végül + és −, balról jobbra. */
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

/** Az i. művelet elvégzése; a feleslegessé vált zárójelpárt elhagyja. */
export const applyAt = (toks: Tok[], i: number): Tok[] => {
  const r = calc(toks[i - 1] as number, toks[i] as Op, toks[i + 1] as number);
  let t: Tok[] = [...toks.slice(0, i - 1), r, ...toks.slice(i + 2)];
  for (let j = 0; j + 2 < t.length; j++)
    if (t[j] === '(' && typeof t[j + 1] === 'number' && t[j + 2] === ')') {
      t = [...t.slice(0, j), t[j + 1], ...t.slice(j + 3)];
      break;
    }
  return t;
};

export interface EvalStep {
  line: string;
  r: number;
  after: Tok[];
}

export const steps = (toks: Tok[]): EvalStep[] => {
  const out: EvalStep[] = [];
  let t = toks;
  let guard = 0;
  while (t.length > 1 && guard++ < 20) {
    const i = nextIdx(t);
    if (i < 0) break;
    const a = t[i - 1] as number;
    const b = t[i + 1] as number;
    const op = t[i] as Op;
    const r = calc(a, op, b);
    t = applyAt(t, i);
    out.push({ line: `${a} ${op} ${b} = ${r}`, r, after: t });
  }
  return out;
};

export const valueOf = (toks: Tok[]): number => {
  const s = steps(toks);
  return s.length ? s[s.length - 1].r : (toks[0] as number);
};
export const evalStr = (s: string) => valueOf(parse(s));

export const validToks = (toks: Tok[], max = 1000) =>
  toks.every((x) => typeof x !== 'number' || x <= max) && steps(toks).every((s) => Number.isInteger(s.r) && s.r >= 0 && s.r <= max);

/** A tipikus hiba: balról jobbra, zárójel és sorrend nélkül. null, ha nincs értelmes eredmény. */
export const naive = (toks: Tok[]): number | null => {
  const t = toks.filter((x) => x !== '(' && x !== ')');
  let v = t[0] as number;
  for (let i = 1; i < t.length; i += 2) {
    v = calc(v, t[i] as Op, t[i + 1] as number);
    if (!Number.isInteger(v) || v < 0 || v > 9999) return null;
  }
  return v;
};

/** Zárójel nélkül, de · előbb (a zárójelet elfelejtette). */
export const noBrackets = (toks: Tok[]): number | null => {
  if (!toks.includes('(')) return null;
  const t = toks.filter((x) => x !== '(' && x !== ')');
  const s = steps(t);
  if (!s.every((x) => Number.isInteger(x.r) && x.r >= 0)) return null;
  return valueOf(t);
};

export type ExprKind = 'mulAdd' | 'mulSub' | 'bracket' | 'twoMul';

/** Véletlen műveletsor 1000-ig. */
export const genExpr = (kind?: ExprKind): Tok[] => {
  for (let tries = 0; tries < 600; tries++) {
    const k = kind ?? pick<ExprKind>(['mulAdd', 'mulSub', 'bracket', 'bracket', 'twoMul']);
    const f = rnd(2, 5);
    const m = rnd(105, Math.floor(1000 / f));
    let s = '';
    if (k === 'mulAdd') {
      const x = rnd(45, 400);
      s = pick([`${x} + ${f} · ${m}`, `${m} · ${f} + ${x}`, `${f} · ${m} + ${x}`]);
    } else if (k === 'mulSub') {
      const p = f * m;
      s = pick([`${rnd(p + 10, 1000)} − ${f} · ${m}`, `${m} · ${f} − ${rnd(20, p - 10)}`]);
    } else if (k === 'bracket') {
      const b = rnd(45, 300);
      const c = rnd(25, 300);
      s = pick([`${f} · (${b} + ${c})`, `(${b} + ${c}) · ${f}`, `${f} · (${b + c} − ${c})`, `${rnd(b + c, 1000)} − (${b} + ${c})`]);
    } else {
      const g = rnd(2, 4);
      const b = rnd(30, 200);
      const c = rnd(30, 200);
      s = pick([`${f} · ${b} + ${g} · ${c}`, `${f} · ${b} + ${f} · ${c}`, `${f} · ${b} − ${g} · ${c}`]);
    }
    const toks = parse(s);
    if (!validToks(toks)) continue;
    const nv = naive(toks);
    if (nv !== null && nv === valueOf(toks)) continue;
    return toks;
  }
  return parse('90 + 110 · 4');
};

/** a · (b + c) → a · b + a · c (ha ilyen alakú), különben null. */
export const twinOf = (toks: Tok[]): string | null => {
  const s = show(toks);
  let m = s.match(/^(\d+) · \((\d+) ([+−]) (\d+)\)$/);
  if (m) return `${m[1]} · ${m[2]} ${m[3]} ${m[1]} · ${m[4]}`;
  m = s.match(/^\((\d+) ([+−]) (\d+)\) · (\d+)$/);
  if (m) return `${m[1]} · ${m[4]} ${m[2]} ${m[3]} · ${m[4]}`;
  return null;
};

export interface TwinTask {
  /** a · (b ± c) alakú műveletsor */
  expr: string;
  /** három választható műveletsor; az első a jó (ugyanannyi) */
  options: string[];
  value: number;
}

/** „Keresd a párját!”: a · (b ± c) = a · b ± a · c; a két rossz lehetőség tipikus hiba. */
export const genTwinTask = (): TwinTask => {
  for (let tries = 0; tries < 600; tries++) {
    const a = rnd(2, 4);
    const op = pick<'+' | '−'>(['+', '+', '−']);
    const b = rnd(op === '+' ? 60 : 120, 260);
    const c = rnd(15, op === '+' ? 160 : b - 20);
    const expr = `${a} · (${b} ${op} ${c})`;
    const good = `${a} · ${b} ${op} ${a} · ${c}`;
    const w1 = `${a} · ${b} ${op} ${c}`;
    const w2 = `${b} ${op} ${a} · ${c}`;
    const all = [expr, good, w1, w2].map(parse);
    if (!all.every((t) => validToks(t))) continue;
    const v = valueOf(all[0]);
    if (valueOf(all[1]) !== v || valueOf(all[2]) === v || valueOf(all[3]) === v || valueOf(all[2]) === valueOf(all[3])) continue;
    return { expr, options: [good, w1, w2], value: v };
  }
  return { expr: '3 · (120 + 80)', options: ['3 · 120 + 3 · 80', '3 · 120 + 80', '120 + 3 · 80'], value: 600 };
};
