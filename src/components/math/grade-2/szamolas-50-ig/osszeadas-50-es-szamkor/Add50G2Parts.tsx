import React from 'react';
import { N50_FONT, BlocksPart, NumberLinePart } from '../szamok-50-ig/Numbers50G2Parts';

export const ADD50_FONT = N50_FONT;
export const ADD50_UNK = '#dc2626';

/** Kérdésábra-keret (kvízhez). */
export const A50QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({
  children,
  h = 130,
  w = 260
}) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={ADD50_FONT}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Rudak és kockák szélessége (BlocksPart-tal azonos számítás). */
export const blocksWidth = (tens: number, ones: number, unit: number, gap: number) =>
  tens * (unit + gap) + (tens > 0 && ones > 0 ? gap + 4 : 0) + Math.ceil(ones / 5) * (unit + 4);

/**
 * Egy szám rudakkal, egyeskockákkal; utána `added` kék kocka (pótláshoz).
 * A kék kockák a zöldek után folytatják az 5-ös oszlopokat.
 */
export const FillBlocksPart: React.FC<{
  x: number;
  y: number;
  tens: number;
  ones: number;
  added: number;
  addedTens?: number;
  unit?: number;
  gap?: number;
}> = ({ x, y, tens, ones, added, addedTens = 0, unit = 9, gap = 6 }) => {
  const rodH = unit * 10;
  const allTens = tens + addedTens;
  const onesX = x + allTens * (unit + gap) + (allTens > 0 ? gap + 4 : 0);
  const rod = (rx: number, key: string, blue: boolean) => (
    <g key={key}>
      <rect
        x={rx}
        y={y}
        width={unit}
        height={rodH}
        rx="1.5"
        fill={blue ? '#93c5fd' : '#d8b4fe'}
        stroke={blue ? '#1d4ed8' : '#6b21a8'}
        strokeWidth="1.6"
      />
      {Array.from({ length: 9 }, (_, k) => (
        <line
          key={k}
          x1={rx}
          y1={y + (k + 1) * unit}
          x2={rx + unit}
          y2={y + (k + 1) * unit}
          stroke={blue ? '#1d4ed8' : '#6b21a8'}
          strokeWidth="0.8"
        />
      ))}
    </g>
  );
  return (
    <g>
      {Array.from({ length: tens }, (_, t) => rod(x + t * (unit + gap), `t${t}`, false))}
      {Array.from({ length: addedTens }, (_, t) => rod(x + (tens + t) * (unit + gap), `b${t}`, true))}
      {Array.from({ length: ones + added }, (_, i) => {
        const col = Math.floor(i / 5);
        const row = i % 5;
        const isAdded = i >= ones;
        return (
          <rect
            key={`o${i}`}
            x={onesX + col * (unit + 4)}
            y={y + rodH - (row + 1) * (unit + 3) + 3}
            width={unit}
            height={unit}
            rx="1.5"
            fill={isAdded ? '#93c5fd' : '#86efac'}
            stroke={isAdded ? '#1d4ed8' : '#15803d'}
            strokeWidth="1.6"
          />
        );
      })}
    </g>
  );
};

/** Két szám rudakkal és kockákkal, köztük „+” jel. */
export const TwoNumberBlocksPart: React.FC<{
  cx: number;
  y: number;
  a: number;
  b: number;
  unit?: number;
  gap?: number;
}> = ({ cx, y, a, b, unit = 7, gap = 4 }) => {
  const at = Math.floor(a / 10);
  const ao = a % 10;
  const bt = Math.floor(b / 10);
  const bo = b % 10;
  const wa = blocksWidth(at, ao, unit, gap);
  const wb = blocksWidth(bt, bo, unit, gap);
  const plusW = Math.round(unit * 3 + 8);
  const x0 = cx - (wa + plusW + wb) / 2;
  return (
    <g>
      <BlocksPart x={x0} y={y} tens={at} ones={ao} unit={unit} gap={gap} />
      <text x={x0 + wa + plusW / 2} y={y + unit * 5 + 8} textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e293b">
        +
      </text>
      <BlocksPart x={x0 + wa + plusW} y={y} tens={bt} ones={bo} unit={unit} gap={gap} />
    </g>
  );
};

export interface Hop {
  from: number;
  to: number;
  label: string;
  color?: string;
  below?: boolean;
}

/** Számegyenes ugrásívekkel. */
export const JumpsPart: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  from: number;
  to: number;
  hops: Hop[];
  startLabel?: string;
  endValue?: number;
  endLabel?: string;
  labelEvery?: number;
  fontSize?: number;
}> = ({
  x = 16,
  y = 74,
  width = 228,
  from,
  to,
  hops,
  startLabel,
  endValue,
  endLabel = '?',
  labelEvery = 10,
  fontSize = 11
}) => {
  const u = width / (to - from);
  const px = (v: number) => x + (v - from) * u;
  const start = hops.length > 0 ? hops[0].from : from;
  return (
    <g>
      <NumberLinePart x={x} y={y} width={width} from={from} to={to} labelEvery={labelEvery} fontSize={fontSize} />
      {hops.map((h, i) => {
        const x1 = px(h.from);
        const x2 = px(h.to);
        const mid = (x1 + x2) / 2;
        const dy = h.below ? 1 : -1;
        const height = Math.min(40, 14 + Math.abs(x2 - x1) * 0.35);
        const color = h.color ?? (i === 0 ? '#16a34a' : '#2563eb');
        return (
          <g key={i}>
            <path
              d={`M ${x1} ${y + dy * 4} Q ${mid} ${y + dy * height * 1.6} ${x2} ${y + dy * 4}`}
              fill="none"
              stroke={color}
              strokeWidth="2.4"
            />
            <path d={`M ${x2 - 4} ${y + dy * 10} L ${x2} ${y + dy * 3} L ${x2 + 3} ${y + dy * 11} Z`} fill={color} />
            <text
              x={mid}
              y={h.below ? y + height * 0.8 + 18 : y - height * 0.8 - 6}
              textAnchor="middle"
              fontSize={fontSize + 2}
              fontWeight="900"
              fill={color}
            >
              {h.label}
            </text>
          </g>
        );
      })}
      {startLabel !== undefined && (
        <g>
          <circle cx={px(start)} cy={y} r="4.5" fill="#7c3aed" />
          <text x={px(start)} y={y + 36} textAnchor="middle" fontSize={fontSize + 2} fontWeight="900" fill="#6d28d9">
            {startLabel}
          </text>
        </g>
      )}
      {endValue !== undefined && (
        <g>
          <circle cx={px(endValue)} cy={y} r="4.5" fill={ADD50_UNK} />
          <text x={px(endValue)} y={y + 36} textAnchor="middle" fontSize={fontSize + 3} fontWeight="900" fill={ADD50_UNK}>
            {endLabel}
          </text>
        </g>
      )}
    </g>
  );
};

/** Számpiramis (két alsó tégla összege a felső). */
export const PyramidPart: React.FC<{
  cx: number;
  y: number;
  left: string;
  right: string;
  top: string;
  bw?: number;
  bh?: number;
  fontSize?: number;
}> = ({ cx, y, left, right, top, bw = 60, bh = 34, fontSize = 20 }) => {
  const brick = (bx: number, by: number, t: string, fill: string) => (
    <g>
      <rect x={bx} y={by} width={bw} height={bh} rx="4" fill={t === '?' ? '#fee2e2' : fill} stroke={t === '?' ? ADD50_UNK : '#92400e'} strokeWidth="2.2" />
      <text x={bx + bw / 2} y={by + bh / 2 + fontSize * 0.36} textAnchor="middle" fontSize={fontSize} fontWeight="900" fill={t === '?' ? ADD50_UNK : '#451a03'}>
        {t}
      </text>
    </g>
  );
  return (
    <g>
      {brick(cx - bw / 2, y, top, '#fde68a')}
      {brick(cx - bw, y + bh, left, '#fed7aa')}
      {brick(cx, y + bh, right, '#fed7aa')}
    </g>
  );
};

/** Egyensúlyban lévő mérleg két kifejezéssel. */
export const BalancePart: React.FC<{
  cx: number;
  y: number;
  left: string;
  right: string;
  w?: number;
  fontSize?: number;
}> = ({ cx, y, left, right, w = 220, fontSize = 17 }) => {
  const half = w / 2;
  const pan = w * 0.42;
  return (
    <g>
      <polygon points={`${cx},${y + 40} ${cx - 18},${y + 72} ${cx + 18},${y + 72}`} fill="#475569" />
      <line x1={cx - half + 10} y1={y + 40} x2={cx + half - 10} y2={y + 40} stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
      <rect x={cx - half} y={y} width={pan} height="34" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.2" />
      <rect x={cx + half - pan} y={y} width={pan} height="34" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2.2" />
      <text x={cx - half + pan / 2} y={y + 23} textAnchor="middle" fontSize={fontSize} fontWeight="900" fill="#1e3a8a">
        {left}
      </text>
      <text x={cx + half - pan / 2} y={y + 23} textAnchor="middle" fontSize={fontSize} fontWeight="900" fill="#92400e">
        {right}
      </text>
    </g>
  );
};

// ---------------------------------------------------------------------------
// Interaktív laborok
// ---------------------------------------------------------------------------

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

type Msg = { ok: boolean; text: string } | null;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface BridgeTask {
  a: number;
  b: number;
}

const makeBridgeTask = (): BridgeTask => {
  for (;;) {
    const a = rnd(21, 47);
    const b = rnd(3, 9);
    if (a % 10 !== 0 && (a % 10) + b > 10 && a + b <= 50) return { a, b };
  }
};

const resultOptions = (a: number, b: number): number[] => {
  const s = a + b;
  const cands = [s - 10, s - 1, s + 1, s + 10];
  const out = [s];
  for (const c of cands) if (c > 0 && c <= 50 && !out.includes(c)) out.push(c);
  return shuffle(out.slice(0, 4));
};

/** Labor I: ugrás a kerek tízesig, aztán tovább. */
export const BridgeJumpLab: React.FC = () => {
  const [task, setTask] = React.useState<BridgeTask>({ a: 27, b: 6 });
  const [hop1, setHop1] = React.useState<number | null>(null);
  const [opts, setOpts] = React.useState<number[]>(() => resultOptions(27, 6));
  const [msg, setMsg] = React.useState<Msg>(null);
  const [done, setDone] = React.useState(false);

  const need = 10 - (task.a % 10);
  const rest = task.b - need;
  const ten = task.a + need;
  const hop1Ok = hop1 === need;

  const newTask = () => {
    const t = makeBridgeTask();
    setTask(t);
    setHop1(null);
    setOpts(resultOptions(t.a, t.b));
    setMsg(null);
    setDone(false);
  };

  const chooseHop = (h: number) => {
    setHop1(h);
    if (h === need) {
      setMsg({ ok: true, text: `Jó! ${task.a} + ${need} = ${ten}. Még ${rest} van hátra az ugrásból.` });
    } else if (h < need) {
      setMsg({ ok: false, text: `${task.a} + ${h} = ${task.a + h}. Ez még nem kerek tízes! Ugorj nagyobbat!` });
    } else {
      setMsg({ ok: false, text: `${task.a} + ${h} = ${task.a + h}. Átugrottad a kerek tízest! Ugorj kisebbet!` });
    }
  };

  const chooseResult = (v: number) => {
    if (v === task.a + task.b) {
      setDone(true);
      setMsg({ ok: true, text: `Szuper! ${task.a} + ${task.b} = ${task.a} + ${need} + ${rest} = ${ten} + ${rest} = ${task.a + task.b}.` });
    } else if (v === task.a + task.b - 10) {
      setMsg({ ok: false, text: `Elfelejtetted az új tízest! ${ten} + ${rest} = ?` });
    } else {
      setMsg({ ok: false, text: `Számold újra: ${ten} + ${rest} = ?` });
    }
  };

  const from = Math.floor(task.a / 10) * 10;
  const to = Math.min(50, from + 20);
  const hops: Hop[] = [];
  if (hop1 !== null) hops.push({ from: task.a, to: Math.min(to, task.a + hop1), label: `+${hop1}`, color: hop1Ok ? '#16a34a' : '#dc2626' });
  if (hop1Ok) hops.push({ from: ten, to: ten + rest, label: `+${rest}`, color: '#2563eb' });

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 text-center text-emerald-950 dark:text-emerald-100">
        Számold ki ugrásokkal:
        <span className="text-3xl font-black align-middle ml-3">
          {task.a} + {task.b} = ?
        </span>
      </div>
      <svg viewBox="0 0 360 130" className="w-full max-w-lg mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
        <rect x="1" y="1" width="358" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <JumpsPart
          x={20}
          y={82}
          width={312}
          from={from}
          to={to}
          hops={hops}
          startLabel={String(task.a)}
          endValue={done ? task.a + task.b : undefined}
          endLabel={String(task.a + task.b)}
          labelEvery={5}
          fontSize={12}
        />
        {hop1 === null && (
          <circle cx={20 + (task.a - from) * (312 / (to - from))} cy={82} r="5" fill="#7c3aed" />
        )}
      </svg>
      {!hop1Ok && (
        <div className="space-y-2">
          <p className="text-center text-sm font-bold text-slate-700 dark:text-slate-200">
            1. lépés: mennyit ugorj, hogy kerek tízesre érj?
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: Math.min(9, task.b) }, (_, i) => i + 1).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => chooseHop(h)}
                className={`w-14 h-14 rounded-xl text-xl font-black border-2 active:scale-95 ${
                  hop1 === h ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}
              >
                +{h}
              </button>
            ))}
          </div>
        </div>
      )}
      {hop1Ok && !done && (
        <div className="space-y-2">
          <p className="text-center text-sm font-bold text-slate-700 dark:text-slate-200">2. lépés: hová érkeztél?</p>
          <div className="flex flex-wrap justify-center gap-3">
            {opts.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => chooseResult(v)}
                className="w-16 h-16 rounded-2xl text-2xl font-black border-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-600 active:scale-95"
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}
      {msg && (
        <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
          {msg.text}
        </div>
      )}
      <div className="flex justify-center">
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
    </div>
  );
};

interface FillTask {
  a: number;
  target: number;
}

const makeFillTask = (): FillTask => {
  for (;;) {
    const a = rnd(21, 46);
    if (a % 10 === 0) continue;
    const next = Math.ceil(a / 10) * 10;
    const target = Math.random() < 0.5 || next + 10 > 50 ? next : next + 10;
    return { a, target };
  }
};

const labBtn =
  'px-3 py-2 rounded-xl font-black text-sm min-h-[52px] border-2 active:scale-95 transition-transform';

/** Labor II: pótlás kerek tízesig (rudak és kockák). */
export const FillUpLab: React.FC = () => {
  const [task, setTask] = React.useState<FillTask>({ a: 34, target: 40 });
  const [addT, setAddT] = React.useState(0);
  const [addO, setAddO] = React.useState(0);
  const [msg, setMsg] = React.useState<Msg>(null);

  const need = task.target - task.a;
  const value = addT * 10 + addO;

  const newTask = () => {
    setTask(makeFillTask());
    setAddT(0);
    setAddO(0);
    setMsg(null);
  };

  const change = (dt: number, d1: number) => {
    setAddT((v) => Math.max(0, Math.min(2, v + dt)));
    setAddO((v) => Math.max(0, Math.min(14, v + d1)));
    setMsg(null);
  };

  const check = () => {
    if (value === need && addO < 10) {
      setMsg({ ok: true, text: `Pontosan! ${task.a} + ${need} = ${task.target}.` });
    } else if (value === need) {
      setMsg({ ok: false, text: `Jó a szám, de 10 kocka helyett tegyél 1 rudat!` });
    } else if (value < need) {
      setMsg({ ok: false, text: `${task.a} + ${value} = ${task.a + value}. Ez még kevés, nem ${task.target}!` });
    } else {
      setMsg({ ok: false, text: `${task.a} + ${value} = ${task.a + value}. Ez már több, mint ${task.target}!` });
    }
  };

  const tens = Math.floor(task.a / 10);
  const ones = task.a % 10;
  const w = blocksWidth(tens + addT, ones + addO, 9, 7);

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-3 text-center text-blue-950 dark:text-blue-100">
        Mennyi kell még?
        <span className="text-3xl font-black align-middle ml-3">
          {task.a} + □ = {task.target}
        </span>
      </div>
      <svg viewBox="0 0 320 124" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
        <rect x="1" y="1" width="318" height="122" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <FillBlocksPart x={160 - w / 2} y={14} tens={tens} ones={ones} added={addO} addedTens={addT} unit={9} gap={7} />
      </svg>
      <p className="text-center text-sm font-bold text-blue-800 dark:text-blue-200">
        Kék = amit hozzáteszel: {value}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => change(-1, 0)} className={`${labBtn} bg-white text-purple-900 border-purple-300`}>− rúd</button>
        <button type="button" onClick={() => change(1, 0)} className={`${labBtn} bg-purple-600 text-white border-purple-700`}>+ rúd (10)</button>
        <button type="button" onClick={() => change(0, -1)} className={`${labBtn} bg-white text-blue-900 border-blue-300`}>− kocka</button>
        <button type="button" onClick={() => change(0, 1)} className={`${labBtn} bg-blue-600 text-white border-blue-700`}>+ kocka (1)</button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      {msg && (
        <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
          {msg.text}
        </div>
      )}
    </div>
  );
};
