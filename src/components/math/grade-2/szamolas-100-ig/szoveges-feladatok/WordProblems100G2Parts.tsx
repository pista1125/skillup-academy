import React, { useState } from 'react';

export const WP_FONT = 'system-ui, Segoe UI, sans-serif';
export const WP_UNK = '#dc2626';

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Szalagmodell
// ---------------------------------------------------------------------------
export interface BarSeg {
  label: string;
  v: number;
  color?: string;
  crossed?: boolean;
}

const SEG_COLORS = ['#fda4af', '#93c5fd', '#fcd34d', '#86efac'];

/** Rész–egész szalag: alul a részek, fölötte kapcsos zárójel az egésszel. */
export const BarPart: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  segs: BarSeg[];
  total?: string;
  fontSize?: number;
  strokeW?: number;
}> = ({ x = 20, y = 40, w = 220, h = 30, segs, total, fontSize = 15, strokeW = 2 }) => {
  const sum = segs.reduce((s, g) => s + g.v, 0);
  let cx = x;
  return (
    <g fontFamily={WP_FONT}>
      {total !== undefined && (
        <g>
          <path
            d={`M ${x} ${y - 6} L ${x} ${y - 14} L ${x + w} ${y - 14} L ${x + w} ${y - 6}`}
            fill="none"
            stroke="#334155"
            strokeWidth={strokeW}
          />
          <rect x={x + w / 2 - 24} y={y - 32} width="48" height="22" rx="6" fill={total === '?' ? '#fee2e2' : '#fff'} stroke={total === '?' ? WP_UNK : '#334155'} strokeWidth={strokeW * 0.8} />
          <text x={x + w / 2} y={y - 15} textAnchor="middle" fontSize={fontSize} fontWeight="900" fill={total === '?' ? WP_UNK : '#0f172a'}>
            {total}
          </text>
        </g>
      )}
      {segs.map((g, i) => {
        const sw = (g.v / sum) * w;
        const sx = cx;
        cx += sw;
        const isQ = g.label === '?';
        return (
          <g key={i}>
            <rect
              x={sx}
              y={y}
              width={sw}
              height={h}
              fill={isQ ? '#fff' : g.color ?? SEG_COLORS[i % SEG_COLORS.length]}
              stroke="#334155"
              strokeWidth={strokeW}
              strokeDasharray={isQ ? '5 3' : undefined}
              opacity={g.crossed ? 0.55 : 1}
            />
            {g.crossed && (
              <g stroke="#be123c" strokeWidth={strokeW}>
                <line x1={sx + 3} y1={y + 3} x2={sx + sw - 3} y2={y + h - 3} />
                <line x1={sx + 3} y1={y + h - 3} x2={sx + sw - 3} y2={y + 3} />
              </g>
            )}
            <text x={sx + sw / 2} y={y + h / 2 + fontSize * 0.35} textAnchor="middle" fontSize={fontSize} fontWeight="900" fill={isQ ? WP_UNK : '#0f172a'}>
              {g.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export interface CompareRow {
  name: string;
  label: string;
  v: number;
  color?: string;
}

/** Összehasonlító szalagok: két sor, a különbség szaggatott résszel. */
export const CompareBarsPart: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  rows: [CompareRow, CompareRow];
  diffLabel?: string;
  nameW?: number;
  fontSize?: number;
  strokeW?: number;
}> = ({ x = 14, y = 16, w = 232, h = 28, rows, diffLabel, nameW = 62, fontSize = 15, strokeW = 2 }) => {
  const max = Math.max(rows[0].v, rows[1].v);
  const bw = w - nameW;
  const len = (v: number) => (v / max) * bw;
  const shortIdx = rows[0].v <= rows[1].v ? 0 : 1;
  return (
    <g fontFamily={WP_FONT}>
      {rows.map((r, i) => {
        const ry = y + i * (h + 14);
        const isQ = r.label === '?';
        return (
          <g key={i}>
            <text x={x} y={ry + h / 2 + 5} fontSize={fontSize - 2} fontWeight="bold" fill="#334155">
              {r.name}
            </text>
            <rect
              x={x + nameW}
              y={ry}
              width={len(r.v)}
              height={h}
              rx="4"
              fill={isQ ? '#fff' : r.color ?? (i === 0 ? '#93c5fd' : '#fda4af')}
              stroke="#334155"
              strokeWidth={strokeW}
              strokeDasharray={isQ ? '5 3' : undefined}
            />
            <text x={x + nameW + len(r.v) / 2} y={ry + h / 2 + fontSize * 0.35} textAnchor="middle" fontSize={fontSize} fontWeight="900" fill={isQ ? WP_UNK : '#0f172a'}>
              {r.label}
            </text>
          </g>
        );
      })}
      {diffLabel !== undefined && rows[0].v !== rows[1].v && (
        <g>
          <rect
            x={x + nameW + len(rows[shortIdx].v)}
            y={y + shortIdx * (h + 14)}
            width={len(max) - len(rows[shortIdx].v)}
            height={h}
            rx="4"
            fill={diffLabel === '?' ? '#fee2e2' : '#fef9c3'}
            stroke={diffLabel === '?' ? WP_UNK : '#ca8a04'}
            strokeWidth={strokeW}
            strokeDasharray="4 3"
          />
          <text
            x={x + nameW + (len(rows[shortIdx].v) + len(max)) / 2}
            y={y + shortIdx * (h + 14) + h / 2 + fontSize * 0.35}
            textAnchor="middle"
            fontSize={fontSize - 1}
            fontWeight="900"
            fill={diffLabel === '?' ? WP_UNK : '#854d0e'}
          >
            {diffLabel}
          </text>
        </g>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Kis piktogramok (a kérdésábrákhoz)
// ---------------------------------------------------------------------------
export type IconKind = 'bead' | 'apple' | 'chestnut' | 'bus' | 'book' | 'leaf' | 'ribbon' | 'card' | 'pencil' | 'stone' | 'cherry' | 'puzzle' | 'ball' | 'star';

export const IconPart: React.FC<{ kind: IconKind; x: number; y: number; s?: number }> = ({ kind, x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {kind === 'bead' && (
      <g>
        <line x1="-14" y1="0" x2="14" y2="0" stroke="#64748b" strokeWidth="1.5" />
        <circle cx="-8" cy="0" r="6" fill="#ec4899" stroke="#9d174d" strokeWidth="1.5" />
        <circle cx="5" cy="0" r="6" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
      </g>
    )}
    {kind === 'apple' && (
      <g>
        <circle cx="0" cy="2" r="11" fill="#ef4444" stroke="#991b1b" strokeWidth="1.6" />
        <path d="M 0 -9 Q 2 -14 5 -15" stroke="#78350f" strokeWidth="2" fill="none" />
        <ellipse cx="6" cy="-11" rx="4" ry="2" fill="#22c55e" />
      </g>
    )}
    {kind === 'chestnut' && (
      <g>
        <path d="M -11 4 Q -11 -11 0 -12 Q 11 -11 11 4 Q 0 12 -11 4 Z" fill="#92400e" stroke="#451a03" strokeWidth="1.6" />
        <path d="M -9 4 Q 0 9 9 4" stroke="#fde68a" strokeWidth="2" fill="none" />
      </g>
    )}
    {kind === 'bus' && (
      <g>
        <rect x="-18" y="-11" width="36" height="20" rx="4" fill="#facc15" stroke="#854d0e" strokeWidth="1.6" />
        <rect x="-14" y="-8" width="8" height="7" fill="#bae6fd" />
        <rect x="-4" y="-8" width="8" height="7" fill="#bae6fd" />
        <rect x="6" y="-8" width="8" height="7" fill="#bae6fd" />
        <circle cx="-10" cy="10" r="4" fill="#334155" />
        <circle cx="10" cy="10" r="4" fill="#334155" />
      </g>
    )}
    {kind === 'book' && (
      <g>
        <rect x="-10" y="-12" width="20" height="24" rx="2" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.6" />
        <line x1="-6" y1="-12" x2="-6" y2="12" stroke="#1e3a8a" strokeWidth="1.4" />
      </g>
    )}
    {kind === 'leaf' && (
      <g>
        <path d="M -12 8 Q -10 -10 10 -10 Q 10 8 -12 8 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="1.6" />
        <line x1="-12" y1="8" x2="6" y2="-6" stroke="#92400e" strokeWidth="1.3" />
      </g>
    )}
    {kind === 'ribbon' && (
      <g>
        <path d="M -16 -4 L 16 -4 L 12 0 L 16 4 L -16 4 L -12 0 Z" fill="#f472b6" stroke="#9d174d" strokeWidth="1.5" />
      </g>
    )}
    {kind === 'card' && (
      <g>
        <rect x="-9" y="-12" width="18" height="24" rx="3" fill="#fff" stroke="#7c3aed" strokeWidth="1.8" />
        <path d="M 0 -5 L 3 1 L 0 6 L -3 1 Z" fill="#7c3aed" />
      </g>
    )}
    {kind === 'pencil' && (
      <g>
        <rect x="-14" y="-3.5" width="22" height="7" fill="#facc15" stroke="#854d0e" strokeWidth="1.3" />
        <path d="M 8 -3.5 L 15 0 L 8 3.5 Z" fill="#fde68a" stroke="#854d0e" strokeWidth="1.3" />
      </g>
    )}
    {kind === 'stone' && <ellipse cx="0" cy="0" rx="11" ry="8" fill="#94a3b8" stroke="#334155" strokeWidth="1.6" />}
    {kind === 'cherry' && (
      <g>
        <path d="M -5 2 Q -2 -12 4 -13 M 6 3 Q 5 -8 4 -13" stroke="#166534" strokeWidth="1.6" fill="none" />
        <circle cx="-6" cy="5" r="5.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.3" />
        <circle cx="7" cy="6" r="5.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.3" />
      </g>
    )}
    {kind === 'puzzle' && (
      <path d="M -10 -10 L -2 -10 Q -2 -15 2 -15 Q 6 -15 6 -10 L 10 -10 L 10 10 L -10 10 Z" fill="#34d399" stroke="#065f46" strokeWidth="1.6" />
    )}
    {kind === 'ball' && (
      <g>
        <circle cx="0" cy="0" r="11" fill="#f97316" stroke="#9a3412" strokeWidth="1.6" />
        <path d="M -10 -3 Q 0 4 10 -3" stroke="#fff" strokeWidth="2" fill="none" />
      </g>
    )}
    {kind === 'star' && (
      <path d="M 0 -12 L 3.5 -4 L 12 -4 L 5 2 L 8 11 L 0 6 L -8 11 L -5 2 L -12 -4 L -3.5 -4 Z" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
    )}
  </g>
);

/** Kérdésábra-keret. */
export const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 110 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={WP_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#fff1f2" stroke="#fecdd3" />
    {children}
  </svg>
);

// ---------------------------------------------------------------------------
// Feladatgenerátor a laborokhoz
// ---------------------------------------------------------------------------
export type WPKind = 'osszesen' | 'maradt' | 'meg' | 'tobb' | 'kevesebb' | 'mennyivel';

export const WP_KINDS: WPKind[] = ['osszesen', 'maradt', 'meg', 'tobb', 'kevesebb', 'mennyivel'];

export interface WPTask {
  kind: WPKind;
  text: string;
  a: number;
  b: number;
  op: '+' | '−';
  expr: string;
  answer: number;
  unit: string;
}

const ACC_ONES: Record<number, string> = { 1: 'et', 2: 't', 3: 'at', 4: 'et', 5: 'öt', 6: 'ot', 7: 'et', 8: 'at', 9: 'et' };
const ACC_TENS: Record<number, string> = { 10: 'et', 20: 'at', 30: 'at', 40: 'et', 50: 'et', 60: 'at', 70: 'et', 80: 'at', 90: 'et', 100: 'at' };
const INS_ONES: Record<number, string> = { 1: 'gyel', 2: 'vel', 3: 'mal', 4: 'gyel', 5: 'tel', 6: 'tal', 7: 'tel', 8: 'cal', 9: 'cel' };
const INS_TENS: Record<number, string> = { 10: 'zel', 20: 'szal', 30: 'cal', 40: 'nel', 50: 'nel', 60: 'nal', 70: 'nel', 80: 'nal', 90: 'nel', 100: 'zal' };

/** Tárgyrag számjegy után: 18-at, 25-öt, 40-et. */
export const acc = (n: number) => `${n}-${n % 10 ? ACC_ONES[n % 10] : ACC_TENS[n]}`;
/** Eszközhatározó-rag számjegy után: 18-cal, 25-tel, 40-nel. */
export const ins = (n: number) => `${n}-${n % 10 ? INS_ONES[n % 10] : INS_TENS[n]}`;

const NAMES = ['Dorka', 'Levente', 'Hanna', 'Ábel', 'Nóra', 'Kristóf', 'Zsófi', 'Bálint', 'Emma', 'Olivér'];
const THINGS = [
  { what: 'matricát', unit: 'matrica' },
  { what: 'gesztenyét', unit: 'gesztenye' },
  { what: 'gyöngyöt', unit: 'gyöngy' },
  { what: 'kártyát', unit: 'kártya' },
  { what: 'kavicsot', unit: 'kavics' }
];

/** Véletlen egylépéses szöveges feladat 100-ig (+ vagy −). */
export const makeWPTask = (kind: WPKind = pick(WP_KINDS)): WPTask => {
  const [n1, n2] = shuffle(NAMES);
  const t = pick(THINGS);
  for (;;) {
    const a = rnd(12, 79);
    const b = rnd(5, 45);
    if (kind === 'osszesen' && a + b <= 100) {
      return { kind, a, b, op: '+', expr: `${a} + ${b}`, answer: a + b, unit: t.unit, text: `${n1} gyűjtött ${a} ${t.what}, ${n2} ${acc(b)}. Hányat gyűjtöttek együtt?` };
    }
    if (kind === 'maradt' && a > b) {
      return { kind, a, b, op: '−', expr: `${a} − ${b}`, answer: a - b, unit: t.unit, text: `${n1} gyűjtött ${a} ${t.what}. ${acc(b)} elajándékozott. Hány maradt?` };
    }
    if (kind === 'meg' && a + b <= 100) {
      const c = a + b;
      return { kind, a: c, b: a, op: '−', expr: `${c} − ${a}`, answer: b, unit: t.unit, text: `${n1} ${c} ${t.what} szeretne. Már van ${a}. Hány kell még?` };
    }
    if (kind === 'tobb' && a + b <= 100) {
      return { kind, a, b, op: '+', expr: `${a} + ${b}`, answer: a + b, unit: t.unit, text: `${n1} gyűjtött ${a} ${t.what}. ${n2} ${ins(b)} többet. Hányat gyűjtött ${n2}?` };
    }
    if (kind === 'kevesebb' && a > b) {
      return { kind, a, b, op: '−', expr: `${a} − ${b}`, answer: a - b, unit: t.unit, text: `${n1} gyűjtött ${a} ${t.what}. ${n2} ${ins(b)} kevesebbet. Hányat gyűjtött ${n2}?` };
    }
    if (kind === 'mennyivel' && a + b <= 100) {
      const c = a + b;
      return { kind, a: c, b: a, op: '−', expr: `${c} − ${a}`, answer: b, unit: t.unit, text: `${n1} gyűjtött ${c} ${t.what}, ${n2} ${acc(a)}. Mennyivel gyűjtött többet ${n1}?` };
    }
  }
};

/** 4 válaszlehetőség: jó, rossz művelettel kapott (ha ≤ 100), ±10, ±1. */
export const wpOptions = (t: WPTask): number[] => {
  const wrongOp = t.op === '+' ? Math.abs(t.a - t.b) : t.a + t.b;
  const cands = [wrongOp, t.answer + 10, t.answer - 10, t.answer + 1, t.answer - 1].filter(
    (v) => v >= 0 && v <= 100 && v !== t.answer
  );
  return shuffle([t.answer, ...Array.from(new Set(cands)).slice(0, 3)]);
};

const Msg: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const KIND_HINT: Record<WPKind, string> = {
  osszesen: 'Az „együtt” azt jelenti: a két részt összeadjuk.',
  maradt: 'Elajándékozott, tehát kevesebb lett: kivonunk.',
  meg: 'A meglévőt kivonjuk abból, amennyit szeretne.',
  tobb: 'Többet gyűjtött, tehát az ő száma nagyobb: összeadunk.',
  kevesebb: 'Kevesebbet gyűjtött, tehát az ő száma kisebb: kivonunk.',
  mennyivel: 'A „mennyivel több” a különbség: a nagyobbikból kivonjuk a kisebbet.'
};

/** Labor I: Melyik művelet kell? (+ / −), majd az eredmény. */
export const OperationLab: React.FC = () => {
  const first: WPTask = {
    kind: 'tobb',
    a: 34,
    b: 18,
    op: '+',
    expr: '34 + 18',
    answer: 52,
    unit: 'kavics',
    text: 'Dorka gyűjtött 34 kavicsot. Ábel 18-cal többet. Hányat gyűjtött Ábel?'
  };
  const [task, setTask] = useState<WPTask>(first);
  const [opts, setOpts] = useState<number[]>(() => wpOptions(first));
  const [op, setOp] = useState<'+' | '−' | null>(null);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const newTask = () => {
    const t = makeWPTask();
    setTask(t);
    setOpts(wpOptions(t));
    setOp(null);
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (op === null) {
      setMsg({ ok: false, text: 'Először válaszd ki a műveletet: + vagy −?' });
      return;
    }
    if (op !== task.op) {
      setMsg({ ok: false, text: `Nem ez a művelet. ${KIND_HINT[task.kind]}` });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: `Jó a művelet: ${task.expr}. Most válaszd ki az eredményt!` });
      return;
    }
    if (chosen !== task.answer) {
      setMsg({ ok: false, text: `Számold újra: ${task.expr} = ? Ellenőrizd a tízeseket és az egyeseket!` });
      return;
    }
    setMsg({ ok: true, text: `Szuper! ${task.expr} = ${task.answer}. Válasz: ${task.answer} ${task.unit}.` });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-rose-50 dark:bg-rose-950/50 rounded-xl p-4 text-center text-rose-950 dark:text-rose-100 text-lg font-bold leading-relaxed">
        {task.text}
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">1. Melyik művelet kell?</p>
      <div className="flex justify-center gap-3">
        {(['+', '−'] as const).map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => {
              setOp(o);
              setMsg(null);
            }}
            className={`w-20 h-16 rounded-2xl text-4xl font-black border-2 ${
              op === o ? 'bg-rose-500 text-white border-rose-700 scale-105' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">2. Mennyi az eredmény?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {opts.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setChosen(n);
              setMsg(null);
            }}
            className={`w-16 h-14 rounded-xl font-black text-xl border-2 ${
              chosen === n ? 'bg-amber-500 text-white border-amber-700 scale-105' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-base font-bold min-h-[52px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Msg msg={msg} />
    </div>
  );
};

export interface BarTask {
  n1: string;
  n2: string;
  a: number;
  d: number;
  more: boolean;
}

export const makeBarTask = (): BarTask => {
  const [n1, n2] = shuffle(NAMES);
  for (;;) {
    const a = rnd(20, 70);
    const d = rnd(5, 30);
    const more = Math.random() < 0.5;
    if (more && a + d <= 100) return { n1, n2, a, d, more };
    if (!more && a - d >= 5) return { n1, n2, a, d, more };
  }
};

export const barTarget = (t: BarTask) => (t.more ? t.a + t.d : t.a - t.d);

/** Labor II: Szalagos ábra – állítsd be a második szalag hosszát! */
export const BarLab: React.FC = () => {
  const [task, setTask] = useState<BarTask>({ n1: 'Hanna', n2: 'Olivér', a: 45, d: 20, more: false });
  const [val, setVal] = useState(30);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const target = barTarget(task);

  const change = (dv: number) => {
    setVal((v) => Math.max(0, Math.min(100, v + dv)));
    setMsg(null);
  };

  const check = () => {
    if (val === target) {
      setMsg({
        ok: true,
        text: `Pontos! ${task.a} ${task.more ? '+' : '−'} ${task.d} = ${target}. ${task.n2} szalagja ${task.more ? 'hosszabb' : 'rövidebb'}.`
      });
    } else if (task.more && val < task.a) {
      setMsg({ ok: false, text: `${task.n2} TÖBBET gyűjtött, az ő szalagja legyen hosszabb!` });
    } else if (!task.more && val > task.a) {
      setMsg({ ok: false, text: `${task.n2} KEVESEBBET gyűjtött, az ő szalagja legyen rövidebb!` });
    } else {
      const diff = Math.abs(val - task.a);
      setMsg({ ok: false, text: `Most a különbség ${diff}, de ${task.d} kell. ${val < target ? 'Adj hozzá!' : 'Vegyél el!'}` });
    }
  };

  const X0 = 90;
  const W = 230;
  const len = (v: number) => (v / 100) * W;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-4 text-center text-sky-950 dark:text-sky-100 text-lg font-bold leading-relaxed">
        {task.n1} gyűjtött {task.a} gesztenyét. {task.n2} {ins(task.d)} {task.more ? 'többet' : 'kevesebbet'}.
        <br />
        Állítsd be {task.n2} szalagját!
      </div>
      <svg viewBox="0 0 340 110" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={WP_FONT}>
        <rect x="1" y="1" width="338" height="108" rx="12" fill="#f0f9ff" stroke="#bae6fd" />
        <text x="12" y="38" fontSize="14" fontWeight="bold" fill="#334155">{task.n1}</text>
        <rect x={X0} y="20" width={len(task.a)} height="28" rx="4" fill="#93c5fd" stroke="#1e3a8a" strokeWidth="2" />
        <text x={X0 + len(task.a) / 2} y="40" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">{task.a}</text>
        <text x="12" y="80" fontSize="14" fontWeight="bold" fill="#334155">{task.n2}</text>
        <rect x={X0} y="62" width={Math.max(2, len(val))} height="28" rx="4" fill="#fda4af" stroke="#9f1239" strokeWidth="2" />
        <text x={X0 + Math.max(14, len(val) / 2)} y="82" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">{val}</text>
        <line x1={X0 + len(task.a)} y1="14" x2={X0 + len(task.a)} y2="96" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        {[-10, -1, 1, 10].map((dv) => (
          <button
            key={dv}
            type="button"
            onClick={() => change(dv)}
            className={`min-w-[64px] h-14 rounded-xl font-black text-xl ${dv < 0 ? 'bg-rose-100 text-rose-900' : 'bg-sky-600 text-white'}`}
          >
            {dv > 0 ? `+${dv}` : `−${-dv}`}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-base font-bold min-h-[52px]">
          Ellenőrzés
        </button>
        <button
          type="button"
          onClick={() => {
            setTask(makeBarTask());
            setVal(30);
            setMsg(null);
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]"
        >
          Új feladat
        </button>
      </div>
      <Msg msg={msg} />
    </div>
  );
};
