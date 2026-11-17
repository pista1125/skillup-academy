import React from 'react';
import { INK, Txt, Pie, Bar, Grid, equalAngles, equalCuts, PART_NAME, rnd, shuffle } from '../bevezetes/EqualPartsG3Parts';

// ---------------------------------------------------------------------------
// 2. Törtrészek – színes rudak, zászlók
// A színes rúd készlet hosszai a tankönyv (TK 135/6.) szerint:
// fehér 1, rózsaszín 2, piros 4, sárga 5, lila 6, bordó 8, narancssárga 10 kocka.
// (A többi rudat a könyv ezen az oldalon nem nevezi meg, ezért nem használjuk.)
// ---------------------------------------------------------------------------

export interface RodInfo {
  len: number;
  name: string;
  /** „a … rúd” alakban */
  adj: string;
  fill: string;
  text: string;
}
export const RODS: Record<number, RodInfo> = {
  1: { len: 1, name: 'fehér kocka', adj: 'fehér', fill: '#ffffff', text: INK },
  2: { len: 2, name: 'rózsaszín rúd', adj: 'rózsaszín', fill: '#f9a8d4', text: INK },
  4: { len: 4, name: 'piros rúd', adj: 'piros', fill: '#ef4444', text: '#fff' },
  5: { len: 5, name: 'sárga rúd', adj: 'sárga', fill: '#facc15', text: INK },
  6: { len: 6, name: 'lila rúd', adj: 'lila', fill: '#a78bfa', text: INK },
  8: { len: 8, name: 'bordó rúd', adj: 'bordó', fill: '#9f1239', text: '#fff' },
  10: { len: 10, name: 'narancssárga rúd', adj: 'narancssárga', fill: '#fb923c', text: INK }
};
export const ROD_LENS = [1, 2, 4, 5, 6, 8, 10];

/** Egy rúd vízszintesen; `unit` = egy kocka hossza. */
export const Rod: React.FC<{ len: number; x: number; y: number; unit: number; h?: number; sw?: number; label?: boolean; outline?: string; onClick?: () => void }> = ({
  len,
  x,
  y,
  unit,
  h = 24,
  sw = 2,
  label = false,
  outline,
  onClick
}) => {
  const r = RODS[len];
  return (
    <g onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      <rect x={x} y={y} width={len * unit} height={h} rx={3} fill={r ? r.fill : '#cbd5e1'} stroke={outline ?? INK} strokeWidth={outline ? sw + 1.5 : sw} />
      <rect x={x + 2} y={y + 2} width={Math.max(0, len * unit - 4)} height={h * 0.22} rx={2} fill="#ffffff" opacity={0.35} pointerEvents="none" />
      {label && r && (
        <Txt x={x + (len * unit) / 2} y={y + h / 2 + 5} s={Math.min(14, h * 0.55)} c={r.text}>
          {r.adj}
        </Txt>
      )}
    </g>
  );
};

/** Egész rúd fölül, alatta a rész-rúd annyiszor, ahányszor kiadja (ha `copies`). */
export const RodPair: React.FC<{ whole: number; part: number; x: number; y: number; unit: number; h?: number; copies?: boolean; sw?: number; gap?: number }> = ({
  whole,
  part,
  x,
  y,
  unit,
  h = 22,
  copies = false,
  sw = 2,
  gap = 6
}) => (
  <g>
    <Rod len={whole} x={x} y={y} unit={unit} h={h} sw={sw} />
    {(copies ? Array.from({ length: Math.floor(whole / part) }, (_, i) => i) : [0]).map((i) => (
      <Rod key={i} len={part} x={x + i * part * unit} y={y + h + gap} unit={unit} h={h} sw={sw} />
    ))}
  </g>
);

// ----- zászlók --------------------------------------------------------------
export type FlagKind = 'hu' | 'it' | 'pl' | 'at' | 'de' | 'nl' | 'ua' | 'fr';
const FLAG_STRIPES: Record<FlagKind, { dir: 'h' | 'v'; colors: string[] }> = {
  hu: { dir: 'h', colors: ['#dc2626', '#ffffff', '#15803d'] },
  it: { dir: 'v', colors: ['#15803d', '#ffffff', '#dc2626'] },
  pl: { dir: 'h', colors: ['#ffffff', '#dc2626'] },
  at: { dir: 'h', colors: ['#dc2626', '#ffffff', '#dc2626'] },
  de: { dir: 'h', colors: ['#111827', '#dc2626', '#facc15'] },
  nl: { dir: 'h', colors: ['#dc2626', '#ffffff', '#1d4ed8'] },
  ua: { dir: 'h', colors: ['#2563eb', '#facc15'] },
  fr: { dir: 'v', colors: ['#1d4ed8', '#ffffff', '#dc2626'] }
};
export const Flag: React.FC<{ kind: FlagKind; x: number; y: number; w: number; h: number; sw?: number }> = ({ kind, x, y, w, h, sw = 2 }) => {
  const f = FLAG_STRIPES[kind];
  const n = f.colors.length;
  return (
    <g>
      {f.colors.map((c, i) =>
        f.dir === 'h' ? <rect key={i} x={x} y={y + (i * h) / n} width={w} height={h / n} fill={c} /> : <rect key={i} x={x + (i * w) / n} y={y} width={w / n} height={h} fill={c} />
      )}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={sw} />
    </g>
  );
};

// ----- törtrész-nevek -------------------------------------------------------
export const FRAC_NS = [2, 3, 4, 5, 6, 8, 10];
/** „3 negyed”, „1 ketted”; ha minden rész színes: „1 egész”. */
export const fracName = (k: number, n: number) => (k === n ? '1 egész' : `${k} ${PART_NAME[n]}`);
/** n hosszú tömb, az első k elem igaz. */
export const firstK = (n: number, k: number) => Array.from({ length: n }, (_, i) => i < k);

export type FracShape = 'pie' | 'bar' | 'grid';
export interface FracTask {
  shape: FracShape;
  n: number;
  k: number;
  rows: number;
  cols: number;
  /** melyik rész színes (a feladatban) */
  colored: boolean[];
}
const GRID_OF: Record<number, [number, number]> = { 4: [2, 2], 6: [2, 3], 8: [2, 4], 10: [2, 5] };

/** Véletlen feladat: n egyenlő részből k színes (1 ≤ k < n). */
export const genFracTask = (): FracTask => {
  const n = FRAC_NS[rnd(0, FRAC_NS.length - 1)];
  const k = rnd(1, n - 1);
  const shapes: FracShape[] = GRID_OF[n] ? ['pie', 'bar', 'grid'] : ['pie', 'bar'];
  const shape = shapes[rnd(0, shapes.length - 1)];
  const [rows, cols] = shape === 'grid' ? GRID_OF[n] : [1, n];
  const colored = shape === 'grid' ? shuffle(firstK(n, k)) : firstK(n, k);
  return { shape, n, k, rows, cols, colored };
};

/** 4 különböző válasz a „Hányad részét színeztük ki?” kérdésre; az első a jó. */
export const nameOptions = (k: number, n: number): string[] => {
  const right = fracName(k, n);
  const cand: string[] = [];
  const white = n - k;
  if (PART_NAME[white] && white !== n) cand.push(`${k} ${PART_NAME[white]}`); // a fehér részek számát vette névnek
  if (white !== k) cand.push(`${white} ${PART_NAME[n]}`); // a fehér részeket számolta
  cand.push(`${n} ${PART_NAME[n]}`); // az egészet mondta
  if (PART_NAME[k]) cand.push(`${n} ${PART_NAME[k]}`); // felcserélte a két számot
  FRAC_NS.filter((m) => m !== n && m > k).forEach((m) => cand.push(`${k} ${PART_NAME[m]}`));
  [1, -1, 2, -2].forEach((d) => {
    if (k + d >= 1 && k + d < n) cand.push(`${k + d} ${PART_NAME[n]}`); // elszámolta
  });
  const out = [right];
  cand.forEach((c) => {
    if (out.length < 4 && !out.includes(c)) out.push(c);
  });
  return out;
};

/** A feladat ábrája egy (x, y, w, h) dobozban. */
export const FracView: React.FC<{
  task: Pick<FracTask, 'shape' | 'n' | 'rows' | 'cols'>;
  x: number;
  y: number;
  w: number;
  h: number;
  colored?: boolean[];
  color?: string;
  sw?: number;
  onPart?: (i: number) => void;
}> = ({ task, x, y, w, h, colored = [], color = '#ef4444', sw = 2.5, onPart }) => {
  if (task.shape === 'pie') {
    const r = Math.min(w, h) / 2 - 3;
    return <Pie cx={x + w / 2} cy={y + h / 2} r={r} bounds={equalAngles(task.n)} colored={colored} color={color} base="#fde68a" sw={sw} onPart={onPart} />;
  }
  if (task.shape === 'grid') {
    const cw = Math.min(w, (h * task.cols) / task.rows);
    const ch = (cw * task.rows) / task.cols;
    return <Grid x={x + (w - cw) / 2} y={y + (h - ch) / 2} w={cw} h={ch} rows={task.rows} cols={task.cols} colored={colored} color={color} sw={sw} onPart={onPart} />;
  }
  const bh = Math.min(h, 70);
  return <Bar x={x} y={y + (h - bh) / 2} w={w} h={bh} cuts={equalCuts(task.n)} colored={colored} color={color} base="#fde68a" sw={sw} onPart={onPart} />;
};
export const PIE = (n: number) => ({ shape: 'pie' as const, n, rows: 1, cols: n });
export const BAR = (n: number) => ({ shape: 'bar' as const, n, rows: 1, cols: n });
export const GRID = (rows: number, cols: number) => ({ shape: 'grid' as const, n: rows * cols, rows, cols });

// ----- mérőedény, méterrúd ----------------------------------------------------
/** 10 dl-es mérőedény, `fill` dl vízzel. */
export const Cup: React.FC<{ x: number; y: number; w: number; h: number; fill: number; nums?: boolean; sw?: number }> = ({ x, y, w, h, fill, nums = true, sw = 2.5 }) => {
  const unit = h / 10;
  return (
    <g>
      <rect x={x} y={y + h - fill * unit} width={w} height={fill * unit} fill="#7dd3fc" />
      <path d={`M ${x} ${y - 8} L ${x} ${y + h} L ${x + w} ${y + h} L ${x + w} ${y - 8}`} fill="none" stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={x} x2={x + (i % 5 === 0 ? w * 0.4 : w * 0.22)} y1={y + h - i * unit} y2={y + h - i * unit} stroke={INK} strokeWidth={i % 5 === 0 ? 2 : 1.2} />
      ))}
      {nums &&
        [0, 5, 10].map((i) => (
          <Txt key={i} x={x + w + 6} y={y + h - i * unit + 5} s={13} a="start">
            {i === 10 ? '10 dl' : String(i)}
          </Txt>
        ))}
    </g>
  );
};

/** 1 m-es rúd 10 egyenlő részre (dm), az első `k` színes. */
export const MeterStick: React.FC<{ x: number; y: number; w: number; h?: number; k?: number; color?: string }> = ({ x, y, w, h = 26, k = 0, color = '#f97316' }) => (
  <Bar x={x} y={y} w={w} h={h} cuts={equalCuts(10)} colored={firstK(10, k)} color={color} base="#fef9c3" sw={2} />
);
