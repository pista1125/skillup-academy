import React, { useState } from 'react';

export const SYM_FONT = 'system-ui, Segoe UI, sans-serif';
export const AXIS_COLOR = '#dc2626';

export type Cell = [number, number]; // [oszlop, sor], 0-tól

export const key = (c: Cell) => `${c[0]},${c[1]}`;

/** Tükrözés függőleges tengelyre: a tengely a(z) `k`. oszlophatáron van (k = a bal oldali oszlopok száma). */
export const mirrorV = (c: Cell, k: number): Cell => [2 * k - 1 - c[0], c[1]];
/** Tükrözés vízszintes tengelyre: a tengely a(z) `k`. sorhatáron van. */
export const mirrorH = (c: Cell, k: number): Cell => [c[0], 2 * k - 1 - c[1]];

/** Négyzetrács színezett mezőkkel és tükörtengellyel. */
export const CellGridPart: React.FC<{
  x: number;
  y: number;
  cols: number;
  rows: number;
  cell: number;
  cells?: { c: Cell; fill: string }[];
  axisV?: number;
  axisH?: number;
  onCell?: (c: Cell) => void;
}> = ({ x, y, cols, rows, cell, cells = [], axisV, axisH, onCell }) => {
  const filled = new Map(cells.map((f) => [key(f.c), f.fill]));
  return (
    <g>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect
            key={`${c}-${r}`}
            x={x + c * cell}
            y={y + r * cell}
            width={cell}
            height={cell}
            fill={filled.get(`${c},${r}`) ?? '#ffffff'}
            stroke="#93c5fd"
            strokeWidth="1.2"
            style={onCell ? { cursor: 'pointer' } : undefined}
            onClick={onCell ? () => onCell([c, r]) : undefined}
          />
        ))
      )}
      {axisV !== undefined && (
        <line x1={x + axisV * cell} y1={y - 6} x2={x + axisV * cell} y2={y + rows * cell + 6} stroke={AXIS_COLOR} strokeWidth="3" pointerEvents="none" />
      )}
      {axisH !== undefined && (
        <line x1={x - 6} y1={y + axisH * cell} x2={x + cols * cell + 6} y2={y + axisH * cell} stroke={AXIS_COLOR} strokeWidth="3" pointerEvents="none" />
      )}
    </g>
  );
};

/** Vonalas betűk és számjegyek (20 × 28-as dobozban). */
export const GLYPHS: Record<string, string> = {
  A: 'M 0 28 L 10 0 L 20 28 M 4 17 L 16 17',
  T: 'M 0 0 L 20 0 M 10 0 L 10 28',
  H: 'M 0 0 L 0 28 M 20 0 L 20 28 M 0 14 L 20 14',
  E: 'M 20 0 L 0 0 L 0 28 L 20 28 M 0 14 L 14 14',
  F: 'M 20 0 L 0 0 L 0 28 M 0 14 L 14 14',
  L: 'M 0 0 L 0 28 L 20 28',
  M: 'M 0 28 L 0 0 L 10 16 L 20 0 L 20 28',
  B: 'M 0 0 L 11 0 Q 20 0 20 7 Q 20 14 11 14 L 0 14 M 11 14 Q 20 14 20 21 Q 20 28 11 28 L 0 28 L 0 0',
  K: 'M 0 0 L 0 28 M 18 0 L 0 14 L 18 28',
  R: 'M 0 28 L 0 0 L 11 0 Q 20 0 20 7 Q 20 14 11 14 L 0 14 M 8 14 L 20 28',
  D: 'M 0 0 L 0 28 L 7 28 Q 20 28 20 14 Q 20 0 7 0 Z',
  '3': 'M 2 3 Q 10 -3 17 4 Q 20 11 10 14 Q 20 17 17 24 Q 10 31 2 25',
  '8': 'M 10 0 A 7 7 0 1 1 9.99 0 M 10 14 A 7 7 0 1 1 9.99 14',
  '4': 'M 14 28 L 14 0 L 0 19 L 20 19',
  '7': 'M 0 0 L 20 0 L 8 28',
  '2': 'M 1 6 Q 10 -4 18 6 Q 20 12 0 28 L 20 28'
};

export const GlyphPart: React.FC<{ ch: string; x: number; y: number; s?: number; color?: string; axis?: 'v' | 'h' }> = ({
  ch,
  x,
  y,
  s = 1,
  color = '#1e3a8a',
  axis
}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d={GLYPHS[ch]} fill="none" stroke={color} strokeWidth={4 / s + 1} strokeLinecap="round" strokeLinejoin="round" />
    {axis === 'v' && <line x1="10" y1="-5" x2="10" y2="33" stroke={AXIS_COLOR} strokeWidth={2 / s + 0.5} strokeDasharray="4 3" />}
    {axis === 'h' && <line x1="-5" y1="14" x2="25" y2="14" stroke={AXIS_COLOR} strokeWidth={2 / s + 0.5} strokeDasharray="4 3" />}
  </g>
);

/** Síkidomok tengelyszámláláshoz (kb. 50 × 50, középen 0,0). */
export type SymShape = 'negyzet' | 'teglalap' | 'egyenloszaru' | 'szabalyos3' | 'ferde' | 'kor' | 'otszog' | 'hatszog' | 'sziv' | 'jobbra3' | 'altalanos3' | 'plusz' | 'ellipszis' | 'rombusz' | 'dalak';

const reg = (n: number, r: number, rot = -90) =>
  Array.from({ length: n }, (_, i) => {
    const a = ((rot + (360 / n) * i) * Math.PI) / 180;
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

const SHAPE_COLORS: Record<SymShape, string> = {
  negyzet: '#f87171',
  teglalap: '#4ade80',
  egyenloszaru: '#38bdf8',
  szabalyos3: '#60a5fa',
  ferde: '#fbbf24',
  kor: '#facc15',
  otszog: '#c084fc',
  hatszog: '#fb923c',
  sziv: '#f472b6',
  jobbra3: '#2dd4bf',
  altalanos3: '#a3e635',
  plusz: '#818cf8',
  ellipszis: '#fde047',
  rombusz: '#f9a8d4',
  dalak: '#93c5fd'
};

export const SymShapePart: React.FC<{ kind: SymShape; cx: number; cy: number; s?: number; axes?: boolean }> = ({ kind, cx, cy, s = 1, axes }) => {
  const fill = SHAPE_COLORS[kind];
  const st = '#334155';
  const sw = 2 / Math.max(0.6, s) + 0.3;
  let body: React.ReactNode;
  let axisLines: [number, number, number, number][] = [];
  switch (kind) {
    case 'negyzet':
      body = <rect x="-20" y="-20" width="40" height="40" />;
      axisLines = [
        [0, -27, 0, 27],
        [-27, 0, 27, 0],
        [-25, -25, 25, 25],
        [-25, 25, 25, -25]
      ];
      break;
    case 'teglalap':
      body = <rect x="-28" y="-15" width="56" height="30" />;
      axisLines = [
        [0, -22, 0, 22],
        [-34, 0, 34, 0]
      ];
      break;
    case 'egyenloszaru':
      body = <polygon points="0,-24 17,20 -17,20" />;
      axisLines = [[0, -30, 0, 26]];
      break;
    case 'szabalyos3':
      body = <polygon points={reg(3, 24)} />;
      break;
    case 'ferde':
      body = <polygon points="-26,16 -12,-16 26,-16 12,16" />;
      break;
    case 'kor':
      body = <circle cx="0" cy="0" r="22" />;
      break;
    case 'otszog':
      body = <polygon points={reg(5, 24)} />;
      break;
    case 'hatszog':
      body = <polygon points={reg(6, 24, 0)} />;
      break;
    case 'sziv':
      body = <path d="M 0 22 C -30 0, -24 -24, 0 -10 C 24 -24, 30 0, 0 22 Z" />;
      axisLines = [[0, -28, 0, 28]];
      break;
    case 'jobbra3':
      body = <polygon points="22,0 -20,-17 -20,17" />;
      axisLines = [[-28, 0, 28, 0]];
      break;
    case 'altalanos3':
      body = <polygon points="-22,18 24,18 -8,-20" />;
      break;
    case 'plusz':
      body = <polygon points="-8,-24 8,-24 8,-8 24,-8 24,8 8,8 8,24 -8,24 -8,8 -24,8 -24,-8 -8,-8" />;
      break;
    case 'ellipszis':
      body = <ellipse cx="0" cy="0" rx="28" ry="16" />;
      break;
    case 'rombusz':
      body = <polygon points="0,-24 16,0 0,24 -16,0" />;
      break;
    case 'dalak':
      body = <path d="M -14 -20 L -2 -20 Q 22 -20 22 0 Q 22 20 -2 20 L -14 20 Z" />;
      axisLines = [[-20, 0, 28, 0]];
      break;
  }
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <g fill={fill} stroke={st} strokeWidth={sw} strokeLinejoin="round">
        {body}
      </g>
      {axes &&
        axisLines.map((l, i) => (
          <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={AXIS_COLOR} strokeWidth={sw} strokeDasharray="4 3" />
        ))}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Laborok
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const MsgBox: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

/** Összefüggő véletlen minta a megadott téglalapon belül. */
const randomBlob = (c0: number, c1: number, r0: number, r1: number, n: number): Cell[] => {
  const start: Cell = [rnd(c0, c1), rnd(r0, r1)];
  const set = new Map<string, Cell>([[key(start), start]]);
  let guard = 0;
  while (set.size < n && guard++ < 500) {
    const arr = Array.from(set.values());
    const b = arr[rnd(0, arr.length - 1)];
    const d = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ][rnd(0, 3)];
    const nc: Cell = [b[0] + d[0], b[1] + d[1]];
    if (nc[0] >= c0 && nc[0] <= c1 && nc[1] >= r0 && nc[1] <= r1) set.set(key(nc), nc);
  }
  return Array.from(set.values());
};

const MD_COLS = 8;
const MD_ROWS = 6;

interface MirrorTask {
  vertical: boolean;
  given: Cell[];
}

const makeMirrorTask = (): MirrorTask => {
  const vertical = Math.random() < 0.65;
  const given = vertical ? randomBlob(0, 3, 0, MD_ROWS - 1, rnd(4, 7)) : randomBlob(0, MD_COLS - 1, 0, 2, rnd(4, 7));
  return { vertical, given };
};

/** Labor I: Tükörrajzoló – színezd ki a tükörképet! */
export const MirrorDrawLab: React.FC = () => {
  const [task, setTask] = useState<MirrorTask>({
    vertical: true,
    given: [
      [3, 1],
      [2, 1],
      [2, 2],
      [1, 2],
      [2, 3]
    ]
  });
  const [mine, setMine] = useState<Set<string>>(new Set());
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const cell = 40;
  const k = task.vertical ? 4 : 3;
  const isGivenSide = (c: Cell) => (task.vertical ? c[0] < k : c[1] < k);
  const target = new Set(task.given.map((g) => key(task.vertical ? mirrorV(g, k) : mirrorH(g, k))));

  const toggle = (c: Cell) => {
    if (isGivenSide(c)) {
      setMsg({ ok: false, text: 'Ez a minta oldala. A tükör másik oldalára rajzolj!' });
      return;
    }
    setMine((m) => {
      const n = new Set(m);
      if (n.has(key(c))) n.delete(key(c));
      else n.add(key(c));
      return n;
    });
    setMsg(null);
  };

  const next = () => {
    setTask(makeMirrorTask());
    setMine(new Set());
    setMsg(null);
    setShowSolution(false);
  };

  const check = () => {
    const missing = Array.from(target).filter((t) => !mine.has(t)).length;
    const extra = Array.from(mine).filter((t) => !target.has(t)).length;
    if (missing === 0 && extra === 0) {
      setMsg({ ok: true, text: 'Tökéletes tükörkép! A két fél pontosan fedi egymást.' });
      return;
    }
    const shifted = new Set(task.given.map((g) => key(task.vertical ? [g[0] + k, g[1]] : [g[0], g[1] + k])));
    const isShift = mine.size === shifted.size && Array.from(mine).every((m) => shifted.has(m));
    if (isShift) {
      setMsg({ ok: false, text: 'Ezt csak áttolva másoltad! A tükörben ami a tengelyhez közel van, az a túloldalon is közel van.' });
    } else {
      setMsg({ ok: false, text: `Még ${missing} mező hiányzik, és ${extra} mező fölösleges. Számold a mezőket a tengelytől!` });
    }
  };

  const cells = [
    ...task.given.map((c) => ({ c, fill: '#6366f1' })),
    ...Array.from(mine).map((s) => ({ c: s.split(',').map(Number) as Cell, fill: '#a5b4fc' })),
    ...(showSolution ? Array.from(target).filter((t) => !mine.has(t)).map((s) => ({ c: s.split(',').map(Number) as Cell, fill: '#fde68a' })) : [])
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100 text-sm font-bold">
        A piros vonal a tükör. Koppints a mezőkre, és színezd ki a tükörképet!
      </div>
      <svg viewBox={`0 0 ${MD_COLS * cell + 20} ${MD_ROWS * cell + 20}`} className="w-full max-w-[400px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <CellGridPart
          x={10}
          y={10}
          cols={MD_COLS}
          rows={MD_ROWS}
          cell={cell}
          cells={cells}
          axisV={task.vertical ? k : undefined}
          axisH={task.vertical ? undefined : k}
          onCell={toggle}
        />
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button
          type="button"
          onClick={() => setShowSolution(true)}
          className="px-5 py-2.5 rounded-xl bg-amber-100 text-amber-900 text-sm font-bold min-h-[48px]"
        >
          Segítség
        </button>
        <button type="button" onClick={next} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

const SN_COLS = 6;
const SN_ROWS = 5;

interface SymTask {
  cells: Cell[];
  symmetric: boolean;
  bad?: Cell;
}

const makeSymTask = (): SymTask => {
  const half = randomBlob(0, 2, 0, SN_ROWS - 1, rnd(3, 6));
  if (!half.some((c) => c[0] === 2)) half.push([2, half[0][1]]);
  const full = [...half, ...half.map((c) => mirrorV(c, 3))];
  const uniq = Array.from(new Map(full.map((c) => [key(c), c])).values());
  if (Math.random() < 0.5) return { cells: uniq, symmetric: true };
  // egy mezőt a jobb oldalon áthelyezünk
  const right = uniq.filter((c) => c[0] >= 3);
  const victim = right[rnd(0, right.length - 1)];
  const rest = uniq.filter((c) => key(c) !== key(victim));
  const options: Cell[] = [];
  for (let c = 3; c < SN_COLS; c++) for (let r = 0; r < SN_ROWS; r++) if (!rest.some((x) => x[0] === c && x[1] === r) && !(c === victim[0] && r === victim[1])) options.push([c, r]);
  const moved = options[rnd(0, options.length - 1)];
  return { cells: [...rest, moved], symmetric: false, bad: moved };
};

/** Labor II: Tükrös vagy nem? */
export const SymmetryCheckLab: React.FC = () => {
  const [task, setTask] = useState<SymTask>(() => ({
    cells: [
      [2, 0],
      [3, 0],
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [2, 2],
      [3, 2],
      [0, 3],
      [5, 4]
    ],
    symmetric: false,
    bad: [5, 4]
  }));
  const [answered, setAnswered] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const cell = 40;

  const answer = (saysSym: boolean) => {
    setAnswered(true);
    if (saysSym === task.symmetric) {
      setMsg({ ok: true, text: task.symmetric ? 'Igen, tükrös! Minden mezőnek megvan a párja.' : 'Jól láttad! A sárgával jelölt mezőnek nincs párja a túloldalon.' });
    } else {
      setMsg({
        ok: false,
        text: task.symmetric ? 'Nézd meg újra: minden mezőnek van párja, ez tükrös!' : 'Nem tükrös! A sárgával jelölt mezőnek nincs párja a tükör túloldalán.'
      });
    }
  };

  const next = () => {
    setTask(makeSymTask());
    setAnswered(false);
    setMsg(null);
  };

  const cells = task.cells.map((c) => ({
    c,
    fill: answered && task.bad && key(c) === key(task.bad) ? '#facc15' : '#ec4899'
  }));

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-pink-200 dark:border-pink-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-pink-50 dark:bg-pink-950/50 rounded-xl p-3 text-center text-pink-950 dark:text-pink-100 text-sm font-bold">
        Tükrös ez a kép a piros vonalra?
      </div>
      <svg viewBox={`0 0 ${SN_COLS * cell + 20} ${SN_ROWS * cell + 20}`} className="w-full max-w-[320px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <CellGridPart x={10} y={10} cols={SN_COLS} rows={SN_ROWS} cell={cell} cells={cells} axisV={3} />
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" disabled={answered} onClick={() => answer(true)} className="px-5 py-2.5 rounded-xl bg-emerald-600 disabled:opacity-50 text-white text-sm font-bold min-h-[48px]">
          Igen, tükrös
        </button>
        <button type="button" disabled={answered} onClick={() => answer(false)} className="px-5 py-2.5 rounded-xl bg-rose-600 disabled:opacity-50 text-white text-sm font-bold min-h-[48px]">
          Nem tükrös
        </button>
        <button type="button" onClick={next} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
