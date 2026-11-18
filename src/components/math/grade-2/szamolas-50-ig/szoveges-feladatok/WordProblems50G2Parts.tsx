import React from 'react';

// ---------------------------------------------------------------------------
// Közös SVG-elemek és laborgenerátorok – 5. Szöveges feladatok (2. osztály, 50-ig).
// Minden szám 0 és 50 között marad, csak + és −.
// ---------------------------------------------------------------------------

export const WP_FONT = 'system-ui, Segoe UI, sans-serif';
export const WP_INK = '#0f172a';
export const WP_SUB = '#334155';
export const WP_UNK = '#dc2626';

export const WP_COLORS = {
  blue: { fill: '#bfdbfe', stroke: '#1d4ed8', text: '#1e3a8a' },
  green: { fill: '#bbf7d0', stroke: '#15803d', text: '#14532d' },
  amber: { fill: '#fde68a', stroke: '#b45309', text: '#78350f' },
  rose: { fill: '#fecdd3', stroke: '#be123c', text: '#881337' },
  violet: { fill: '#ddd6fe', stroke: '#6d28d9', text: '#4c1d95' },
  unk: { fill: '#fff1f2', stroke: WP_UNK, text: WP_UNK }
} as const;
export type WpColor = keyof typeof WP_COLORS;

/** Kérdésábra-keret (260 széles). */
export const WPQFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 110, children }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={WP_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const isUnk = (v: number | string) => String(v).includes('?');

export interface BarSeg {
  v: number | string;
  /** relatív hossz */
  size: number;
  color?: WpColor;
}

/**
 * Szakaszos ábra (szalagmodell): egymás melletti szakaszok, alatta kapcsos zárójel az egészhez.
 */
export const BarModelPart: React.FC<{
  x: number;
  y: number;
  w: number;
  h?: number;
  parts: BarSeg[];
  total?: number | string;
  fs?: number;
}> = ({ x, y, w, h = 30, parts, total, fs = 15 }) => {
  const sum = parts.reduce((s, p) => s + p.size, 0);
  let cx = x;
  return (
    <g>
      {parts.map((p, i) => {
        const pw = (p.size / sum) * w;
        const c = WP_COLORS[isUnk(p.v) ? 'unk' : (p.color ?? 'blue')];
        const el = (
          <g key={i}>
            <rect x={cx} y={y} width={pw} height={h} fill={c.fill} stroke={c.stroke} strokeWidth="2" strokeDasharray={isUnk(p.v) ? '5 3' : undefined} />
            <text x={cx + pw / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="900" fill={c.text}>
              {p.v}
            </text>
          </g>
        );
        cx += pw;
        return el;
      })}
      {total !== undefined && (
        <g>
          <path
            d={`M ${x} ${y + h + 4} Q ${x} ${y + h + 12} ${x + 8} ${y + h + 12} L ${x + w / 2 - 6} ${y + h + 12} L ${x + w / 2} ${y + h + 19} L ${x + w / 2 + 6} ${y + h + 12} L ${x + w - 8} ${y + h + 12} Q ${x + w} ${y + h + 12} ${x + w} ${y + h + 4}`}
            fill="none"
            stroke={WP_SUB}
            strokeWidth="2"
          />
          <text x={x + w / 2} y={y + h + 19 + fs + 2} textAnchor="middle" fontSize={fs} fontWeight="900" fill={isUnk(total) ? WP_UNK : WP_INK}>
            {total}
          </text>
        </g>
      )}
    </g>
  );
};

export interface CompareRow {
  label?: string;
  size: number;
  text: number | string;
  color?: WpColor;
}

/** Összehasonlító szalagok (egymás alatt, balra igazítva) és a különbség jelölése. */
export const CompareBarsPart: React.FC<{
  x: number;
  y: number;
  w: number;
  rows: CompareRow[];
  rowH?: number;
  gap?: number;
  labelW?: number;
  diff?: string;
  fs?: number;
  scaleMax?: number;
}> = ({ x, y, w, rows, rowH = 26, gap = 12, labelW = 54, diff, fs = 14, scaleMax }) => {
  const max = scaleMax ?? Math.max(...rows.map((r) => r.size));
  const bw = w - labelW;
  const wid = (s: number) => (s / max) * bw;
  return (
    <g>
      {rows.map((r, i) => {
        const c = WP_COLORS[isUnk(r.text) ? 'unk' : (r.color ?? (i === 0 ? 'blue' : 'amber'))];
        const ry = y + i * (rowH + gap);
        return (
          <g key={i}>
            {r.label && (
              <text x={x + labelW - 6} y={ry + rowH / 2 + 5} textAnchor="end" fontSize={fs - 1} fontWeight="bold" fill={WP_SUB}>
                {r.label}
              </text>
            )}
            <rect x={x + labelW} y={ry} width={wid(r.size)} height={rowH} rx="4" fill={c.fill} stroke={c.stroke} strokeWidth="2" strokeDasharray={isUnk(r.text) ? '5 3' : undefined} />
            <text x={x + labelW + wid(r.size) / 2} y={ry + rowH / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="900" fill={c.text}>
              {r.text}
            </text>
          </g>
        );
      })}
      {diff && rows.length >= 2 && (
        (() => {
          const a = wid(rows[0].size);
          const b = wid(rows[1].size);
          const lo = Math.min(a, b);
          const hi = Math.max(a, b);
          const ry = y + rowH + gap / 2;
          return (
            <g>
              <line x1={x + labelW + lo} y1={y} x2={x + labelW + lo} y2={y + 2 * rowH + gap} stroke={WP_SUB} strokeWidth="1.5" strokeDasharray="3 3" />
              <line x1={x + labelW + lo + 2} y1={ry} x2={x + labelW + hi - 2} y2={ry} stroke={WP_UNK} strokeWidth="2.5" />
              <path d={`M ${x + labelW + lo + 6} ${ry - 4} L ${x + labelW + lo + 1} ${ry} L ${x + labelW + lo + 6} ${ry + 4}`} fill="none" stroke={WP_UNK} strokeWidth="2" />
              <path d={`M ${x + labelW + hi - 6} ${ry - 4} L ${x + labelW + hi - 1} ${ry} L ${x + labelW + hi - 6} ${ry + 4}`} fill="none" stroke={WP_UNK} strokeWidth="2" />
              <rect x={x + labelW + (lo + hi) / 2 - 16} y={ry - 9} width="32" height="18" rx="5" fill="#fff" stroke={WP_UNK} strokeWidth="1.5" />
              <text x={x + labelW + (lo + hi) / 2} y={ry + 5} textAnchor="middle" fontSize="12" fontWeight="900" fill={WP_UNK}>
                {diff}
              </text>
            </g>
          );
        })()
      )}
    </g>
  );
};

/** Korongok tízes sorokban (5 után kis hézag); az utolsó `crossed` korong áthúzva. */
export const DotsPart: React.FC<{
  x: number;
  y: number;
  r?: number;
  groups: { count: number; color: string; stroke: string }[];
  crossed?: number;
  pad?: number;
}> = ({ x, y, r = 6, groups, crossed = 0, pad = 4 }) => {
  const step = r * 2 + pad;
  const dots: { color: string; stroke: string }[] = [];
  groups.forEach((g) => {
    for (let i = 0; i < g.count; i++) dots.push({ color: g.color, stroke: g.stroke });
  });
  return (
    <g>
      {dots.map((d, i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const cx = x + col * step + (col >= 5 ? r : 0) + r;
        const cy = y + row * step + r;
        const isX = i >= dots.length - crossed;
        return (
          <g key={i} opacity={isX ? 0.55 : 1}>
            <circle cx={cx} cy={cy} r={r} fill={d.color} stroke={d.stroke} strokeWidth="1.5" />
            {isX && (
              <g stroke={WP_UNK} strokeWidth={r < 4 ? 1.4 : 2} strokeLinecap="round">
                <line x1={cx - r} y1={cy - r} x2={cx + r} y2={cy + r} />
                <line x1={cx + r} y1={cy - r} x2={cx - r} y2={cy + r} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

export const DOT_RED = { color: '#f87171', stroke: '#991b1b' };
export const DOT_GREEN = { color: '#4ade80', stroke: '#166534' };
export const DOT_BLUE = { color: '#60a5fa', stroke: '#1e3a8a' };
export const DOT_YELLOW = { color: '#facc15', stroke: '#a16207' };

// ---------------------------------------------------------------------------
// Laborgenerátorok
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: readonly T[]): T => arr[rnd(0, arr.length - 1)];
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const OBJECTS = [
  { n: 'alma', acc: 'almát' },
  { n: 'dió', acc: 'diót' },
  { n: 'golyó', acc: 'golyót' },
  { n: 'matrica', acc: 'matricát' },
  { n: 'kavics', acc: 'kavicsot' },
  { n: 'gyöngy', acc: 'gyöngyöt' }
] as const;

export type WordKind = 'join' | 'take' | 'missing' | 'compare' | 'more' | 'less' | 'indirect';

export const WORD_KINDS: { id: WordKind; label: string }[] = [
  { id: 'join', label: 'Hozzáadás' },
  { id: 'take', label: 'Elvétel' },
  { id: 'missing', label: 'Még mennyi kell?' },
  { id: 'compare', label: 'Mennyivel több?' },
  { id: 'more', label: '…-val több' },
  { id: 'less', label: '…-val kevesebb' },
  { id: 'indirect', label: 'Csavaros szöveg' }
];

export interface WordTask {
  kind: WordKind;
  text: string;
  op: '+' | '−';
  a: number;
  b: number;
  answer: number;
  options: number[];
  /** a jó művelet szövegesen, pl. "27 + 8" */
  expr: string;
  opHint: string;
}

export const makeWordTask = (kind: WordKind = pick(WORD_KINDS).id): WordTask => {
  for (;;) {
    const o = pick(OBJECTS);
    let a = 0;
    let b = 0;
    let op: '+' | '−' = '+';
    let text = '';
    let opHint = '';
    if (kind === 'join') {
      a = rnd(12, 42);
      b = rnd(3, 19);
      op = '+';
      text = `A dobozban ${a} ${o.n} van. Beteszünk még ${b} ${o.acc}. Hány ${o.n} lesz a dobozban?`;
      opHint = '„Beteszünk még” – több lesz, ezért összeadunk.';
    } else if (kind === 'take') {
      a = rnd(21, 50);
      b = rnd(3, 19);
      op = '−';
      text = `A dobozban ${a} ${o.n} van. Kiveszünk ${b} ${o.acc}. Hány ${o.n} marad?`;
      opHint = '„Kiveszünk” – kevesebb marad, ezért kivonunk.';
    } else if (kind === 'missing') {
      const c = rnd(25, 50);
      a = rnd(10, c - 3);
      b = c;
      op = '−';
      text = `A dobozban ${a} ${o.n} van. Hány ${o.acc} kell még betenni, hogy ${c} legyen?`;
      opHint = 'A hiányzó részt keressük: a nagyobb számból elvesszük a meglévőt.';
      const answer = c - a;
      return finish({ kind, text, op, a: c, b: a, answer, opHint });
    } else if (kind === 'compare') {
      a = rnd(20, 50);
      b = rnd(5, a - 2);
      op = '−';
      text = `Az egyik dobozban ${a}, a másikban ${b} ${o.n} van. Mennyivel több van az elsőben?`;
      opHint = 'A különbséget keressük: a nagyobból kivonjuk a kisebbet.';
    } else if (kind === 'more') {
      a = rnd(10, 38);
      b = rnd(3, 15);
      op = '+';
      text = `Az első dobozban ${a} ${o.n} van. A másodikban ${b} darabbal több. Hány ${o.n} van a másodikban?`;
      opHint = 'A második dobozban több van, ezért összeadunk.';
    } else if (kind === 'less') {
      a = rnd(20, 50);
      b = rnd(3, 15);
      op = '−';
      text = `Az első dobozban ${a} ${o.n} van. A másodikban ${b} darabbal kevesebb. Hány ${o.n} van a másodikban?`;
      opHint = 'A második dobozban kevesebb van, ezért kivonunk.';
    } else {
      a = rnd(20, 50);
      b = rnd(3, 15);
      op = '−';
      text = `Az első dobozban ${a} ${o.n} van. Ez ${b} darabbal több, mint a másodikban. Hány ${o.n} van a másodikban?`;
      opHint = 'Vigyázz! Az első dobozban van több, tehát a másodikban kevesebb. Kivonunk!';
    }
    const answer = op === '+' ? a + b : a - b;
    if (answer < 1 || answer > 50) continue;
    return finish({ kind, text, op, a, b, answer, opHint });
  }
};

const finish = (t: Omit<WordTask, 'options' | 'expr'>): WordTask => {
  const other = t.op === '+' ? t.a - t.b : t.a + t.b;
  const wrong = new Set<number>();
  [other, t.answer + 10, t.answer - 10, t.answer + 1, t.answer - 1].forEach((w) => {
    if (w >= 0 && w <= 50 && w !== t.answer) wrong.add(w);
  });
  const wrongs = shuffle([...wrong]);
  // a fordított művelet eredménye (ha 0–50 közé esik) mindig szerepeljen
  const ordered = wrongs.includes(other) ? [other, ...wrongs.filter((w) => w !== other)] : wrongs;
  const three = ordered.slice(0, 3);
  while (three.length < 3) {
    const w = rnd(0, 50);
    if (w !== t.answer && !three.includes(w)) three.push(w);
  }
  return { ...t, expr: `${t.a} ${t.op} ${t.b}`, options: shuffle([t.answer, ...three]) };
};

const NAMES = [
  { n: 'Panni', dat: 'Panninak' },
  { n: 'Bence', dat: 'Bencének' },
  { n: 'Lili', dat: 'Lilinek' },
  { n: 'Máté', dat: 'Máténak' },
  { n: 'Zsófi', dat: 'Zsófinak' },
  { n: 'Dani', dat: 'Daninak' },
  { n: 'Kata', dat: 'Katának' },
  { n: 'Ádám', dat: 'Ádámnak' },
  { n: 'Réka', dat: 'Rékának' },
  { n: 'Olivér', dat: 'Olivérnek' }
];
const ITEMS = ['gyöngye', 'matricája', 'kavicsa', 'golyója'];

export interface CompareTask {
  nameA: string;
  nameB: string;
  datA: string;
  datB: string;
  item: string;
  a: number;
  diff: number;
  more: boolean;
  answer: number;
}

export const makeCompareTask = (): CompareTask => {
  for (;;) {
    const A = pick(NAMES);
    const B = pick(NAMES);
    if (A.n === B.n) continue;
    const a = rnd(8, 40);
    const diff = rnd(2, 14);
    const more = Math.random() < 0.5;
    const answer = more ? a + diff : a - diff;
    if (answer < 1 || answer > 50) continue;
    return { nameA: A.n, nameB: B.n, datA: A.dat, datB: B.dat, item: pick(ITEMS), a, diff, more, answer };
  }
};
