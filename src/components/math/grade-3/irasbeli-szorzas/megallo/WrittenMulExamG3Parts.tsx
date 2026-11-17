import React from 'react';
import type { QuizQuestion } from '../QuizTemplate';
import { evalStr, steps, parse } from '../a-muveletek-sorrendje/OrderOpsMulG3Parts';

// ---------------------------------------------------------------------------
// XIII. fejezet, 6. Megálló – tudáspróba: közös elemek.
// Kérdés-építők (fejben szorzás, becslés, írásbeli szorzás, sorrend),
// tipikus hibákból képzett rossz válaszok, kérdésábrák, labor-generátorok.
// ---------------------------------------------------------------------------

export { evalStr };

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

type Q = Omit<QuizQuestion, 'correctAnswer'>;
export const q = (x: Q): QuizQuestion => ({ ...x, correctAnswer: 0 } as QuizQuestion);

export const digits = (n: number) => String(n).split('').reverse().map(Number); // egyes, tízes, százas

/** Elfelejtett maradék: minden helyiértéken csak a szorzat utolsó jegyét írja le (a legfelsőnél az egészet). */
export const mulNoCarry = (a: number, d: number) =>
  digits(a).reduce((s, x, c, arr) => s + (c < arr.length - 1 ? (x * d) % 10 : x * d) * 10 ** c, 0);

/** A maradékot szorzás ELŐTT adja a jegyhez: (jegy + maradék) · szorzó. */
export const mulCarryBefore = (a: number, d: number) => {
  let carry = 0;
  return digits(a).reduce((s, x, c, arr) => {
    const p = (x + carry) * d;
    carry = Math.floor(p / 10);
    return s + (c < arr.length - 1 ? p % 10 : p) * 10 ** c;
  }, 0);
};

/** Három különböző, értelmes rossz válasz (0–1000). */
export const distract = (ans: number, cands: number[]) => {
  const out: number[] = [];
  const all = [...cands, ans + 10, ans - 10, ans + 100, ans - 100, ans + 1, ans - 1, ans + 20];
  for (const c of all) if (c !== ans && c >= 0 && c <= 1000 && Number.isInteger(c) && !out.includes(c) && out.length < 3) out.push(c);
  return out;
};

export interface MulStep {
  col: number;
  digit: number;
  prod: number;
  carryIn: number;
  total: number;
  write: number;
  carryOut: number;
}

/** Az írásbeli szorzás lépései az egyesektől kezdve. */
export const mulSteps = (a: number, d: number): MulStep[] => {
  let carry = 0;
  const ds = digits(a);
  return ds.map((x, c) => {
    const prod = x * d;
    const total = prod + carry;
    const last = c === ds.length - 1;
    const st = { col: c, digit: x, prod, carryIn: carry, total, write: last ? total : total % 10, carryOut: last ? 0 : Math.floor(total / 10) };
    carry = st.carryOut;
    return st;
  });
};

const PLACE = ['Egyesek', 'Tízesek', 'Százasok'];

const ACC = ['0-t', '1-et', '2-t', '3-at', '4-et', '5-öt', '6-ot', '7-et', '8-at', '9-et'];
/** névelő + tárgyrag egy számjegyhez: „a 2-t”, „az 5-öt”. */
export const theDigit = (n: number) => `${n === 1 || n === 5 ? 'az' : 'a'} ${ACC[n]}`;

/** Kimondva, ahogy a füzetben: „3 · 4 = 12, leírom a 2-t, marad 1.” */
export const mulExplain = (a: number, d: number) =>
  mulSteps(a, d)
    .map((s) => {
      const base = `${PLACE[s.col]}: ${d} · ${s.digit} = ${s.prod}`;
      const plus = s.carryIn ? `, + ${s.carryIn} = ${s.total}` : '';
      const tail = s.carryOut ? `, leírom ${theDigit(s.write)}, marad ${s.carryOut}.` : `, leírom: ${s.write}.`;
      return base + plus + tail;
    })
    .join(' ');

// ---------------------------------------------------------------------------
// Ábrák
// ---------------------------------------------------------------------------
export const UNK = '#dc2626';
export const INK = '#0f172a';
const FONT = 'system-ui, sans-serif';

export const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 140, w = 240 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const COL_FILL = ['#fde68a', '#bae6fd', '#fecaca']; // e, t, sz – mint a könyvben
const COL_TXT = ['e', 't', 'sz'];

/**
 * Írásbeli szorzás a könyv elrendezésében: sz t e fejléc, szorzandó · szorzó, vonal, szorzat.
 * A jegyek lehetnek „?” vagy „□” (piros). mark: a kiemelt rész (szorzó / szorzandó / szorzat).
 */
export const MulColumn: React.FC<{ a: string; d: string; p?: string; mark?: 'szorzo' | 'szorzando' | 'szorzat'; className?: string }> = ({
  a,
  d,
  p = '???',
  mark,
  className = 'w-full max-w-[200px] h-auto mx-auto'
}) => {
  const cx = [110, 80, 50]; // e, t, sz középpontja
  const ad = a.split('').reverse();
  const pd = p.split('').reverse();
  const col = (s: string) => (s === '?' || s === '□' ? UNK : INK);
  return (
    <svg viewBox="0 0 200 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="1" y="1" width="198" height="128" rx="10" fill="#f8fafc" stroke="#cbd5e1" />
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <rect x={cx[c] - 15} y="8" width="30" height="20" fill={COL_FILL[c]} />
          <text x={cx[c]} y="23" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">{COL_TXT[c]}</text>
        </g>
      ))}
      {mark === 'szorzando' && <rect x="33" y="34" width="94" height="34" rx="8" fill="none" stroke="#7c3aed" strokeWidth="3" />}
      {mark === 'szorzo' && <rect x="130" y="34" width="56" height="34" rx="8" fill="none" stroke="#7c3aed" strokeWidth="3" />}
      {mark === 'szorzat' && <rect x="33" y="84" width="94" height="36" rx="8" fill="none" stroke="#7c3aed" strokeWidth="3" />}
      {ad.map((s, c) => (
        <text key={c} x={cx[c]} y="60" textAnchor="middle" fontSize="26" fontWeight="bold" fill={col(s)}>{s}</text>
      ))}
      <text x="158" y="60" textAnchor="middle" fontSize="24" fontWeight="bold" fill={col(d)}>{`· ${d}`}</text>
      <line x1="34" y1="74" x2="126" y2="74" stroke={INK} strokeWidth="2.5" />
      {pd.map((s, c) => (
        <text key={c} x={cx[c] ?? 20} y="110" textAnchor="middle" fontSize="26" fontWeight="bold" fill={col(s)}>{s}</text>
      ))}
    </svg>
  );
};

/** Százas lapok és tízes rudak: a szám d-szer egymás alatt (pl. 140 · 3). */
export const BlocksFig: React.FC<{ a: number; d: number }> = ({ a, d }) => {
  const h = Math.floor(a / 100);
  const t = Math.floor((a % 100) / 10);
  const rowH = Math.min(30, 110 / d);
  const sq = rowH - 6;
  return (
    <QFig h={rowH * d + 34}>
      {Array.from({ length: d }, (_, r) => {
        const y = 10 + r * rowH;
        return (
          <g key={r}>
            {Array.from({ length: h }, (_, i) => (
              <rect key={`h${i}`} x={14 + i * (sq + 4)} y={y} width={sq} height={sq} fill="#fca5a5" stroke="#b91c1c" strokeWidth="1.5" />
            ))}
            {Array.from({ length: t }, (_, i) => (
              <rect key={`t${i}`} x={22 + h * (sq + 4) + i * 9} y={y} width="6" height={sq} fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.2" />
            ))}
            <text x="226" y={y + sq - 4} textAnchor="end" fontSize="15" fontWeight="bold" fill={INK}>{a}</text>
          </g>
        );
      })}
      <text x="120" y={rowH * d + 26} textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>{`${d}-szer ${a} = ?`}</text>
    </QFig>
  );
};

/** Számegyenes-részlet a kerekítéshez: két kerek szám között a szám helye. */
export const LineFig: React.FC<{ n: number; to: 10 | 100 }> = ({ n, to }) => {
  const lo = Math.floor(n / to) * to;
  const hi = lo + to;
  const x = (v: number) => 30 + ((v - lo) / to) * 180;
  const mid = lo + to / 2;
  return (
    <QFig h={100}>
      <line x1="20" y1="50" x2="220" y2="50" stroke="#334155" strokeWidth="2.5" />
      {[lo, mid, hi].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1={v === mid ? 42 : 38} x2={x(v)} y2={v === mid ? 58 : 62} stroke="#334155" strokeWidth={v === mid ? 2 : 3} />
          <text x={x(v)} y="80" textAnchor="middle" fontSize={v === mid ? 13 : 17} fontWeight="bold" fill={v === mid ? '#64748b' : INK}>{v}</text>
        </g>
      ))}
      <circle cx={x(n)} cy="50" r="6" fill={UNK} />
      <text x={x(n)} y="30" textAnchor="middle" fontSize="17" fontWeight="bold" fill={UNK}>{n}</text>
      <text x="120" y="96" textAnchor="middle" fontSize="11" fill="#475569">{to === 10 ? 'tízesre kerekítünk' : 'százasra kerekítünk'}</text>
    </QFig>
  );
};

/** Ismert szorzás fent, új lent (a változás nyíllal a bal oldalon). */
export const RelFig: React.FC<{ top: string; bottom: string; op: string }> = ({ top, bottom, op }) => (
  <QFig h={110}>
    <path d="M 40 30 C 14 42, 14 70, 38 82" fill="none" stroke="#ea580c" strokeWidth="3" />
    <polygon points="40,84 30,80 37,73" fill="#ea580c" />
    <text x="24" y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">{op}</text>
    <text x="135" y="40" textAnchor="middle" fontSize="24" fontWeight="bold" fill={INK}>{top}</text>
    <text x="135" y="90" textAnchor="middle" fontSize="24" fontWeight="bold" fill={INK}>
      {bottom} <tspan fill={UNK}>?</tspan>
    </text>
  </QFig>
);

/** Ár-következtetés: n1 db → p1, n2 db → ? */
export const PriceFig: React.FC<{ n1: number; p1: number; n2: number; unit?: string }> = ({ n1, p1, n2, unit = 'db' }) => (
  <QFig h={110}>
    {[0, 1].map((r) => (
      <g key={r}>
        <rect x="26" y={14 + r * 46} width="80" height="36" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
        <text x="66" y={39 + r * 46} textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>{`${r ? n2 : n1} ${unit}`}</text>
        <line x1="112" y1={32 + r * 46} x2="126" y2={32 + r * 46} stroke="#334155" strokeWidth="2.5" />
        <polygon points={`${131},${32 + r * 46} ${124},${27 + r * 46} ${124},${37 + r * 46}`} fill="#334155" />
        <rect x="136" y={14 + r * 46} width="80" height="36" rx="8" fill={r ? '#fff' : '#fde68a'} stroke="#b45309" strokeWidth="2" strokeDasharray={r ? '5 3' : undefined} />
        <text x="176" y={39 + r * 46} textAnchor="middle" fontSize="18" fontWeight="bold" fill={r ? UNK : INK}>{r ? '? Ft' : `${p1} Ft`}</text>
      </g>
    ))}
  </QFig>
);

/** Műveletsor nagyban, a jelek színesek, a □ piros. */
export const ExprFig: React.FC<{ expr: string }> = ({ expr }) => {
  const fs = Math.min(28, Math.floor(400 / expr.length));
  return (
    <QFig h={80}>
      <text x="120" y="50" textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>
        {expr
          .split(/(\s+|[()])/)
          .filter((p) => p !== '')
          .map((p, i) => (
            <tspan key={i} fill={p === '·' ? '#ea580c' : p === '+' || p === '−' ? '#0284c7' : p === '(' || p === ')' ? '#9333ea' : p === '□' ? UNK : INK}>
              {p}
            </tspan>
          ))}
      </text>
    </QFig>
  );
};

/** n csomag, mindegyikben a és b. */
export const PackFig: React.FC<{ n: number; a: number; b: number; la?: string; lb?: string }> = ({ n, a, b, la, lb }) => {
  const w = 46;
  const x0 = (240 - (n * w + (n - 1) * 8)) / 2;
  return (
    <QFig h={130}>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * (w + 8);
        return (
          <g key={i}>
            <path d={`M ${x} 14 L ${x + w} 14 L ${x + w - 4} 96 L ${x + 4} 96 Z`} fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
            <rect x={x + 5} y="22" width={w - 10} height="30" rx="5" fill="#fecaca" />
            <text x={x + w / 2} y="43" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{a}</text>
            <rect x={x + 6} y="58" width={w - 12} height="30" rx="5" fill="#bae6fd" />
            <text x={x + w / 2} y="79" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{b}</text>
          </g>
        );
      })}
      {la && lb && (
        <text x="120" y="118" textAnchor="middle" fontSize="13" fontWeight="bold">
          <tspan fill="#b91c1c">piros: {la}</tspan>
          <tspan fill="#334155">{'  '}</tspan>
          <tspan fill="#0369a1">kék: {lb}</tspan>
        </text>
      )}
    </QFig>
  );
};

/** Szakaszos ábra: alap és „times”-szor annyi; ask: második / összesen / különbség. */
export const BarFig: React.FC<{ base: number; times: number; l1: string; l2: string; ask?: 'second' | 'total' | 'diff' }> = ({ base, times, l1, l2, ask = 'total' }) => {
  const u = Math.min(44, Math.floor(156 / times));
  return (
    <QFig h={124}>
      <text x="10" y="36" fontSize="13" fontWeight="bold" fill="#334155">{l1}</text>
      <rect x="72" y="20" width={u} height="24" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      <text x={72 + u / 2} y="37" textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>{base}</text>
      <text x="10" y="74" fontSize="13" fontWeight="bold" fill="#334155">{l2}</text>
      {Array.from({ length: times }, (_, i) => (
        <rect key={i} x={72 + i * u} y="58" width={u} height="24" rx="4" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
      ))}
      {ask === 'total' && <path d="M 228 20 Q 234 20 234 30 L 234 72 Q 234 82 228 82" fill="none" stroke={UNK} strokeWidth="2.5" />}
      {ask === 'diff' && <line x1={72 + u} y1="51" x2={72 + times * u} y2="51" stroke={UNK} strokeWidth="2.5" />}
      <text x="150" y="110" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>
        {ask === 'total' ? 'összesen: ?' : ask === 'diff' ? 'mennyivel több? ?' : `${l2}: ?`}
      </text>
    </QFig>
  );
};

/** n egyforma doboz v-vel; „összesen ?” – vagy (minus) e darab elfogyott. */
export const RepeatFig: React.FC<{ n: number; v: number; e?: number; unit?: string }> = ({ n, v, e, unit = 'db' }) => {
  const w = Math.min(46, (e !== undefined ? 160 : 210) / n - 6);
  return (
    <QFig h={120}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={14 + i * (w + 6)} y="22" width={w} height="50" rx="6" fill="#fdba74" stroke="#9a3412" strokeWidth="2.5" />
          <text x={14 + i * (w + 6) + w / 2} y="53" textAnchor="middle" fontSize={w < 36 ? 13 : 16} fontWeight="bold" fill="#431407">{v}</text>
        </g>
      ))}
      {e !== undefined && (
        <g>
          <circle cx="204" cy="47" r="26" fill="#fee2e2" stroke="#b91c1c" strokeWidth="2.5" />
          <text x="204" y="53" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>{e}</text>
          <line x1="185" y1="66" x2="223" y2="28" stroke="#b91c1c" strokeWidth="3" />
        </g>
      )}
      <text x="120" y="102" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>
        {e !== undefined ? `maradt: ? ${unit}` : `összesen: ? ${unit}`}
      </text>
    </QFig>
  );
};

/** Bolt: n árcédula, fizetés, „visszajár: ?”. */
export const ShopFig: React.FC<{ n: number; price: number; pay: number }> = ({ n, price, pay }) => {
  const step = Math.min(50, 148 / n);
  const w = step - 8;
  return (
    <QFig h={130}>
      {Array.from({ length: n }, (_, i) => (
        <g key={i}>
          <rect x={12 + i * step} y="20" width={w} height="42" rx="4" fill="#fef9c3" stroke="#a16207" strokeWidth="2.5" />
          <circle cx={12 + i * step + w / 2} cy="28" r="3" fill="#a16207" />
          <text x={12 + i * step + w / 2} y="52" textAnchor="middle" fontSize={w < 36 ? 13 : 15} fontWeight="bold" fill={INK}>{price}</text>
        </g>
      ))}
      <rect x="166" y="18" width="64" height="44" rx="5" fill="#bbf7d0" stroke="#15803d" strokeWidth="2.5" />
      <text x="198" y="46" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#14532d">{pay}</text>
      <text x="80" y="86" textAnchor="middle" fontSize="13" fill="#334155">{`${n} db, ára Ft-ban`}</text>
      <text x="198" y="80" textAnchor="middle" fontSize="13" fill="#334155">fizetek</text>
      <text x="120" y="116" textAnchor="middle" fontSize="17" fontWeight="bold" fill={UNK}>visszajár: ? Ft</text>
    </QFig>
  );
};

/** Műveletlánc: start → op → op … → ? (két sorban, ha hosszú). */
export const ChainFig: React.FC<{ start: number; ops: string[] }> = ({ start, ops }) => {
  const boxes = [String(start), ...ops, '?'];
  const perRow = 3;
  const rows = Math.ceil(boxes.length / perRow);
  return (
    <QFig h={rows * 52 + 16}>
      {boxes.map((b, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const x = 14 + c * 76;
        const y = 12 + r * 52;
        const isOp = i > 0 && i < boxes.length - 1;
        return (
          <g key={i}>
            <rect x={x} y={y} width="62" height="34" rx="17" fill={isOp ? '#fff' : i === 0 ? '#f97316' : '#fee2e2'} stroke={isOp ? '#f97316' : '#c2410c'} strokeWidth="2.5" />
            <text x={x + 31} y={y + 23} textAnchor="middle" fontSize="16" fontWeight="bold" fill={i === 0 ? '#fff' : b === '?' ? UNK : INK}>{b}</text>
            {i < boxes.length - 1 && c < perRow - 1 && <polygon points={`${x + 72},${y + 17} ${x + 64},${y + 11} ${x + 64},${y + 23}`} fill="#c2410c" />}
            {i < boxes.length - 1 && c === perRow - 1 && <path d={`M ${x + 31} ${y + 36} L ${x + 31} ${y + 42} L ${14 + 31} ${y + 42} L ${14 + 31} ${y + 50}`} fill="none" stroke="#c2410c" strokeWidth="2" />}
          </g>
        );
      })}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdés-építők
// ---------------------------------------------------------------------------

/** Írásbeli szorzás kérdés: oszlopos ábra, tipikus hibák, kimondott lépések. */
export const qMul = (
  id: string,
  level: 1 | 2 | 3,
  a: number,
  d: number,
  o: { story?: string; unit?: string; fig?: React.ReactNode | false; badge?: string } = {}
): QuizQuestion => {
  const ans = a * d;
  const u = o.unit ? ` ${o.unit}` : '';
  const opts = [ans, ...distract(ans, [mulNoCarry(a, d), mulCarryBefore(a, d), ans + 10])].map((v) => `${v}${u}`);
  return q({
    id,
    level,
    questionTypeBadge: o.badge ?? 'Írásbeli szorzás',
    figure: o.fig === false ? undefined : o.fig ?? <MulColumn a={String(a)} d={String(d)} />,
    question: o.story ?? `Számold ki írásban! ${a} · ${d} = ?`,
    options: opts,
    explanation: `${a} · ${d} = ${ans}${u}. ${mulExplain(a, d)}`
  });
};

/** Fejben szorzás bontással: 280 · 2 = 200 · 2 + 80 · 2. */
export const qMental = (id: string, level: 1 | 2 | 3, a: number, d: number, o: { story?: string; unit?: string; fig?: boolean; badge?: string } = {}): QuizQuestion => {
  const ans = a * d;
  const h = Math.floor(a / 100) * 100;
  const t = a - h;
  const u = o.unit ? ` ${o.unit}` : '';
  const opts = [ans, ...distract(ans, [h * d + t, ans - 100, ans + 100])].map((v) => `${v}${u}`);
  return q({
    id,
    level,
    questionTypeBadge: o.badge ?? 'Szorzás fejben',
    figure: o.fig === false ? undefined : <BlocksFig a={a} d={d} />,
    question: o.story ?? `Számold ki fejben! ${a} · ${d} = ?`,
    options: opts,
    explanation: `Bontsd fel: ${h} · ${d} = ${h * d}, ${t} · ${d} = ${t * d}. Összesen: ${h * d} + ${t * d} = ${ans}${u}.`
  });
};

export const roundTo = (n: number, to: 10 | 100) => Math.round(n / to) * to;

/** Becslés tízesre / százasra kerekített szorzandóval. */
export const qEst = (id: string, level: 1 | 2 | 3, a: number, d: number, to: 10 | 100, o: { fig?: boolean } = {}): QuizQuestion => {
  const r = roundTo(a, to);
  const est = r * d;
  const other = roundTo(a, to === 10 ? 100 : 10) * d;
  const wrongDir = (to === 10 ? (r > a ? r - 10 : r + 10) : r > a ? r - 100 : r + 100) * d;
  const opts = [est, ...distract(est, [other, wrongDir, a * d])];
  return q({
    id,
    level,
    questionTypeBadge: 'Becslés',
    figure: o.fig === false ? undefined : <LineFig n={a} to={to} />,
    question: `Becsüld meg ${to === 10 ? 'tízesre' : 'százasra'} kerekítve! ${a} · ${d} ≈ ?`,
    options: opts.map(String),
    explanation: `${a} ≈ ${r} (${to === 10 ? 'tízesre' : 'százasra'} kerekítve). ${r} · ${d} = ${est}. A pontos szorzat: ${a * d}.`
  });
};

/** Műveletsor kiszámítása; a magyarázat a lépésekből készül. */
export const qExpr = (id: string, level: 1 | 2 | 3, expr: string, wrong: number[], o: { fig?: React.ReactNode | false; badge?: string; question?: string } = {}): QuizQuestion => {
  const ans = evalStr(expr);
  const st = steps(parse(expr));
  return q({
    id,
    level,
    questionTypeBadge: o.badge ?? (expr.includes('(') ? 'Zárójel' : 'Sorrend'),
    figure: o.fig === false ? undefined : o.fig ?? <ExprFig expr={expr} />,
    question: o.question ?? `Számold ki! ${expr} = ?`,
    options: [ans, ...distract(ans, wrong)].map(String),
    explanation: st.map((s, i) => `${i + 1}. lépés: ${s.line}.`).join(' ') + (expr.includes('(') ? ' (A zárójel az első!)' : ' (A szorzás előbb jön!)')
  });
};

// ---------------------------------------------------------------------------
// Labor-generátorok
// ---------------------------------------------------------------------------

export type TaskKind = 'fejben' | 'becsles' | 'irasbeli' | 'sorrend' | 'kovetkeztetes';
export const TASK_LABEL: Record<TaskKind, string> = {
  fejben: 'Fejben',
  becsles: 'Becslés',
  irasbeli: 'Írásban',
  sorrend: 'Sorrend',
  kovetkeztetes: 'Következtetés'
};

export interface ExamTask {
  kind: TaskKind;
  text: string;
  answer: number;
  hint: string;
  /** tipikus rossz válaszok → célzott tipp */
  traps: { v: number; msg: string }[];
}

/** Háromjegyű szám, amelynek d-szerese legfeljebb 999. */
export const genMulPair = (minCarry = 0): { a: number; d: number } => {
  for (let i = 0; i < 500; i++) {
    const d = rnd(2, 6);
    const a = rnd(101, Math.floor(999 / d));
    const carries = mulSteps(a, d).filter((s) => s.carryOut > 0).length;
    if (carries >= minCarry) return { a, d };
  }
  return { a: 214, d: 3 };
};

const makeTaskRaw = (kind: TaskKind): ExamTask => {
  if (kind === 'fejben') {
    const d = rnd(2, 5);
    const a = rnd(11, Math.floor(99 / d) * 1) * 10;
    const ans = a * d;
    const h = Math.floor(a / 100) * 100;
    return {
      kind,
      text: `${a} · ${d} = ?`,
      answer: ans,
      hint: h ? `Bontsd fel: ${h} · ${d} és ${a - h} · ${d}, aztán add össze!` : `Gondolj a szorzótáblára: ${a / 10} · ${d}, és tegyél mögé egy 0-t!`,
      traps: [{ v: h * d + (a - h), msg: `A ${a - h}-et is meg kell szorozni ${d}-vel!` }]
    };
  }
  if (kind === 'becsles') {
    const d = rnd(2, 4);
    const a = rnd(111, Math.floor(950 / d));
    const r = roundTo(a, 10);
    return {
      kind,
      text: `Becsüld meg tízesre kerekítve! ${a} · ${d} ≈ ?`,
      answer: r * d,
      hint: `Először kerekíts: ${a} ≈ ${r}. Utána szorozz: ${r} · ${d}.`,
      traps: [
        { v: a * d, msg: 'Ez a pontos szorzat. Becsléshez előbb kerekíts tízesre!' },
        { v: roundTo(a, 100) * d, msg: 'Ez százasra kerekítve lenne. Most tízesre kerekíts!' }
      ]
    };
  }
  if (kind === 'irasbeli') {
    const { a, d } = genMulPair(1);
    return {
      kind,
      text: `Számold ki írásban! ${a} · ${d} = ?`,
      answer: a * d,
      hint: mulExplain(a, d),
      traps: [
        { v: mulNoCarry(a, d), msg: 'A maradékot elfelejtetted hozzáadni a következő helyiértékhez!' },
        { v: mulCarryBefore(a, d), msg: 'A maradékot a szorzás UTÁN add hozzá, ne előtte!' }
      ]
    };
  }
  if (kind === 'sorrend') {
    for (let i = 0; i < 300; i++) {
      const d = rnd(2, 4);
      const b = rnd(105, 230);
      const c = rnd(30, 200);
      const expr = pick([`${c} + ${b} · ${d}`, `${d} · (${b} + ${c})`, `${b} · ${d} − ${c}`]);
      const ans = evalStr(expr);
      if (ans > 1000 || ans < 0) continue;
      const naive = expr.startsWith(`${c} +`) ? (c + b) * d : expr.includes('(') ? d * b + c : NaN;
      return {
        kind,
        text: `${expr} = ?`,
        answer: ans,
        hint: expr.includes('(') ? 'Először a zárójelben számolj!' : 'Először a szorzást végezd el!',
        traps: Number.isNaN(naive) ? [] : [{ v: naive, msg: expr.includes('(') ? 'A zárójelben lévő mindkét számot szorozni kell!' : 'Balról jobbra számoltál. A szorzás előbb jön!' }]
      };
    }
  }
  // következtetés
  const n1 = rnd(2, 3);
  const times = rnd(2, 3);
  const p1 = rnd(6, Math.floor(1000 / (times * 10))) * 10;
  return {
    kind: 'kovetkeztetes',
    text: `${n1} db ${p1} Ft. Mennyibe kerül ${n1 * times} db?`,
    answer: p1 * times,
    hint: `${n1 * times} db = ${n1} db · ${times}. Hányszor annyit veszel? Annyiszor annyit fizetsz.`,
    traps: [{ v: p1 * n1 * times, msg: `A ${p1} Ft nem 1 db ára, hanem ${n1} db-é!` }]
  };
};

/** Labor-feladat; a csapda-tippek közül kiszűri azt, ami véletlenül egyezik a jó válasszal. */
export const makeTask = (kind: TaskKind): ExamTask => {
  const t = makeTaskRaw(kind);
  return { ...t, traps: t.traps.filter((x) => x.v !== t.answer) };
};
