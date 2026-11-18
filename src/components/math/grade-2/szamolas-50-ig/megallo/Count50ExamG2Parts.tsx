import React from 'react';
import { makeWordTask } from '../szoveges-feladatok/WordProblems50G2Parts';

// ---------------------------------------------------------------------------
// Közös SVG-elemek és laborgenerátorok – 6. Megálló (2. osztály, II. témakör).
// Minden szám 0 és 50 között marad, csak + és −.
// ---------------------------------------------------------------------------

export const EX_FONT = 'system-ui, Segoe UI, sans-serif';
export const EX_INK = '#0f172a';
export const EX_SUB = '#334155';
export const EX_UNK = '#dc2626';

/** Kérdésábra-keret (260 széles). */
export const ExQFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 110, children }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={EX_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const isUnk = (v: string) => v.includes('?');

/** Számkártyák sora (a „?” piros); a jelek (○ < > = + −) keret nélkül. */
export const CardsRowPart: React.FC<{ items: string[]; y?: number; size?: number; cx?: number }> = ({ items, y = 16, size = 40, cx = 130 }) => {
  const SIGNS = ['○', '<', '>', '=', '+', '−'];
  const widths = items.map((it) => (SIGNS.includes(it) ? 22 : Math.max(size, it.length * 11 + 12)));
  const gap = 6;
  const total = widths.reduce((s, w) => s + w, 0) + gap * (items.length - 1);
  let x = cx - total / 2;
  return (
    <g>
      {items.map((it, i) => {
        const w = widths[i];
        const left = x;
        x += w + gap;
        const sign = SIGNS.includes(it);
        return (
          <g key={i}>
            {!sign && (
              <rect
                x={left}
                y={y}
                width={w}
                height={size}
                rx="8"
                fill={isUnk(it) ? '#fff1f2' : '#e0f2fe'}
                stroke={isUnk(it) ? EX_UNK : '#0369a1'}
                strokeWidth="2"
              />
            )}
            <text
              x={left + w / 2}
              y={y + size / 2 + (sign ? 9 : 7)}
              textAnchor="middle"
              fontSize={sign ? 26 : 19}
              fontWeight="900"
              fill={isUnk(it) || it === '○' ? EX_UNK : EX_INK}
            >
              {it}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Számpiramis (téglák felülről lefelé); '' = üres tégla, '?' = kérdezett tégla. */
export const PyramidPart: React.FC<{ rows: (string | number)[][]; bw?: number; bh?: number; cx?: number; y?: number }> = ({
  rows,
  bw = 50,
  bh = 28,
  cx = 130,
  y = 10
}) => (
  <g>
    {rows.map((row, r) => {
      const x0 = cx - (row.length * bw) / 2;
      return row.map((v, i) => {
        const s = String(v);
        const q = isUnk(s);
        return (
          <g key={`${r}-${i}`}>
            <rect x={x0 + i * bw} y={y + r * bh} width={bw} height={bh} fill={q ? '#fff1f2' : s === '' ? '#ffffff' : '#fef3c7'} stroke="#b45309" strokeWidth="1.6" />
            <text x={x0 + i * bw + bw / 2} y={y + r * bh + bh / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={q ? EX_UNK : EX_INK}>
              {s}
            </text>
          </g>
        );
      });
    })}
  </g>
);

/** Számtábla 21-től 50-ig (3 sor × 10); `marks`: kiemelt számok, `hidden`: „?”-lel takart szám. */
export const NumberTablePart: React.FC<{
  x?: number;
  y?: number;
  cell?: number;
  from?: number;
  rows?: number;
  hidden?: number;
  marks?: number[];
  evenColor?: boolean;
}> = ({ x = 15, y = 12, cell = 23, from = 21, rows = 3, hidden, marks = [], evenColor = false }) => (
  <g>
    {Array.from({ length: rows * 10 }, (_, i) => {
      const v = from + i;
      const cx = x + (i % 10) * cell;
      const cy = y + Math.floor(i / 10) * cell;
      const hid = v === hidden;
      const mk = marks.includes(v);
      const fill = hid ? '#fff1f2' : mk ? '#fde68a' : evenColor && v % 2 === 0 ? '#dbeafe' : '#ffffff';
      return (
        <g key={v}>
          <rect x={cx} y={cy} width={cell} height={cell} fill={fill} stroke="#64748b" strokeWidth="1" />
          <text x={cx + cell / 2} y={cy + cell / 2 + 4.5} textAnchor="middle" fontSize={cell * 0.48} fontWeight={hid || mk ? 900 : 600} fill={hid ? EX_UNK : EX_INK}>
            {hid ? '?' : v}
          </text>
        </g>
      );
    })}
  </g>
);

/** Kétkarú mérleg két kifejezéssel. */
export const BalancePart: React.FC<{ left: string; right: string; cx?: number; y?: number }> = ({ left, right, cx = 130, y = 30 }) => (
  <g>
    <polygon points={`${cx},${y + 26} ${cx - 18},${y + 62} ${cx + 18},${y + 62}`} fill="#475569" />
    <line x1={cx - 100} y1={y + 24} x2={cx + 100} y2={y + 24} stroke={EX_INK} strokeWidth="4" strokeLinecap="round" />
    <rect x={cx - 118} y={y - 8} width="92" height="30" rx="7" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <text x={cx - 72} y={y + 13} textAnchor="middle" fontSize="16" fontWeight="900" fill="#1e3a8a">
      {left}
    </text>
    <rect x={cx + 26} y={y - 8} width="92" height="30" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x={cx + 72} y={y + 13} textAnchor="middle" fontSize="16" fontWeight="900" fill="#92400e">
      {right}
    </text>
  </g>
);

/** 3 × 3-as bűvös négyzet; `hide`: [sor, oszlop] → „?”. */
export const MagicSquarePart: React.FC<{ grid: number[][]; hide: [number, number]; x?: number; y?: number; cell?: number }> = ({
  grid,
  hide,
  x = 85,
  y = 10,
  cell = 30
}) => (
  <g>
    {grid.map((row, r) =>
      row.map((v, c) => {
        const h = r === hide[0] && c === hide[1];
        return (
          <g key={`${r}-${c}`}>
            <rect x={x + c * cell} y={y + r * cell} width={cell} height={cell} fill={h ? '#fff1f2' : '#ecfccb'} stroke="#4d7c0f" strokeWidth="1.6" />
            <text x={x + c * cell + cell / 2} y={y + r * cell + cell / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={h ? EX_UNK : EX_INK}>
              {h ? '?' : v}
            </text>
          </g>
        );
      })
    )}
  </g>
);

// ---------------------------------------------------------------------------
// Laborgenerátorok
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export type ExamG2TaskKind = 'helyiertek' | 'szomszed' | 'osszead' | 'kivon' | 'kerek' | 'hianyzo' | 'szoveges';

export const EXAM50_TASK_KINDS: { id: ExamG2TaskKind; label: string }[] = [
  { id: 'helyiertek', label: 'Tízesek, egyesek' },
  { id: 'szomszed', label: 'Számszomszédok' },
  { id: 'osszead', label: 'Összeadás' },
  { id: 'kivon', label: 'Kivonás' },
  { id: 'kerek', label: 'Kerek tízesek' },
  { id: 'hianyzo', label: 'Hiányzó szám' },
  { id: 'szoveges', label: 'Szöveges' }
];

export interface Exam50Task {
  kind: ExamG2TaskKind;
  text: string;
  answer: number;
  hint: string;
  mistakes: { value: number; msg: string }[];
}

const keep = (t: Exam50Task): Exam50Task => ({
  ...t,
  mistakes: t.mistakes.filter((m) => m.value !== t.answer && m.value >= 0)
});

export const makeExam50Task = (kind: ExamG2TaskKind): Exam50Task => {
  for (;;) {
    if (kind === 'helyiertek') {
      const t = rnd(2, 4);
      const e = rnd(1, 9);
      const n = t * 10 + e;
      return keep({
        kind,
        text: `${t} tízes és ${e} egyes. Melyik szám ez?`,
        answer: n,
        hint: 'Előbb a tízesek számát írd, utána az egyesekét.',
        mistakes: [{ value: e * 10 + t, msg: `Felcserélted! Előbb a tízes (${t}), aztán az egyes (${e}) jön.` }]
      });
    }
    if (kind === 'szomszed') {
      const n = rnd(21, 49);
      const after = Math.random() < 0.5;
      const ans = after ? n + 1 : n - 1;
      return keep({
        kind,
        text: after ? `Melyik szám jön közvetlenül a ${n} után?` : `Melyik szám van közvetlenül a ${n} előtt?`,
        answer: ans,
        hint: after ? 'A következő szám 1-gyel nagyobb.' : 'Az előző szám 1-gyel kisebb.',
        mistakes: [{ value: after ? n - 1 : n + 1, msg: after ? 'Ez az előtte lévő szám. Mi jön UTÁNA?' : 'Ez az utána lévő szám. Mi van ELŐTTE?' }]
      });
    }
    if (kind === 'osszead') {
      const a = rnd(11, 39);
      const b = rnd(3, 9);
      const s = a + b;
      if (s > 50 || (a % 10) + b <= 10) continue;
      const toTen = 10 - (a % 10);
      return keep({
        kind,
        text: `${a} + ${b} = ?`,
        answer: s,
        hint: `Pótold a következő kerek tízesig: ${a} + ${toTen} = ${a + toTen}, aztán add hozzá a maradékot: ${b - toTen}.`,
        mistakes: [{ value: s - 10, msg: 'Átléptél egy kerek tízest! A tízesek száma 1-gyel nő.' }]
      });
    }
    if (kind === 'kivon') {
      const a = rnd(21, 50);
      const b = rnd(3, 9);
      if (a % 10 >= b) continue;
      const d = a - b;
      const back = a % 10;
      return keep({
        kind,
        text: `${a} − ${b} = ?`,
        answer: d,
        hint: back > 0 ? `Lépj vissza a kerek tízesig: ${a} − ${back} = ${a - back}, aztán vedd el a maradékot: ${b - back}.` : `${a} kerek tízes: ${a} − ${b} = ${a - 10} + ${10 - b}.`,
        mistakes: [{ value: d + 10, msg: 'Átléptél egy kerek tízest lefelé! A tízesek száma 1-gyel csökken.' }]
      });
    }
    if (kind === 'kerek') {
      const a = rnd(11, 49);
      const k = rnd(1, 3) * 10;
      const plus = Math.random() < 0.5;
      const r = plus ? a + k : a - k;
      if (r < 0 || r > 50) continue;
      return keep({
        kind,
        text: `${a} ${plus ? '+' : '−'} ${k} = ?`,
        answer: r,
        hint: 'Kerek tízesnél csak a tízesek változnak, az egyesek maradnak.',
        mistakes: [{ value: plus ? a + k / 10 : a - k / 10, msg: `A ${k} ${k / 10} tízes, nem ${k / 10} egyes!` }]
      });
    }
    if (kind === 'hianyzo') {
      const a = rnd(12, 38);
      const c = rnd(a + 3, 50);
      return keep({
        kind,
        text: `${a} + □ = ${c}. Mennyi a □?`,
        answer: c - a,
        hint: `Mennyi hiányzik? Számold ki: ${c} − ${a}.`,
        mistakes: [{ value: c + a, msg: 'Nem összeadni kell! A □ a hiányzó rész.' }]
      });
    }
    const w = makeWordTask();
    const other = w.op === '+' ? w.a - w.b : w.a + w.b;
    return keep({
      kind: 'szoveges',
      text: w.text,
      answer: w.answer,
      hint: w.opHint,
      mistakes: [{ value: other, msg: `Másik műveletet választottál. ${w.opHint}` }]
    });
  }
};

export interface Pyramid50Task {
  b1: number;
  b2: number;
  b3: number;
  m1: number;
  m2: number;
  top: number;
}

export const makePyramid50Task = (): Pyramid50Task => {
  for (;;) {
    const b1 = rnd(3, 15);
    const b2 = rnd(3, 15);
    const b3 = rnd(3, 15);
    const m1 = b1 + b2;
    const m2 = b2 + b3;
    const top = m1 + m2;
    if (top <= 50 && top >= 25) return { b1, b2, b3, m1, m2, top };
  }
};
