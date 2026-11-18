import React from 'react';
import { N50_FONT, NumberLinePart } from '../szamok-50-ig/Numbers50G2Parts';
import { JumpsPart, Hop, FillBlocksPart, blocksWidth } from '../osszeadas-50-es-szamkor/Add50G2Parts';

export const SUB50_FONT = N50_FONT;
export const SUB50_UNK = '#dc2626';

/** Kérdésábra-keret (kvízhez). */
export const S50QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({
  children,
  h = 130,
  w = 260
}) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={SUB50_FONT}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Szélesség a TakeBlocksPart-hoz. */
export const takeBlocksWidth = (a: number, breakRod: boolean, unit: number, gap: number) => {
  const rods = Math.floor(a / 10) - (breakRod ? 1 : 0);
  const cubes = (a % 10) + (breakRod ? 10 : 0);
  return rods * (unit + gap) + (rods > 0 && cubes > 0 ? gap + 4 : 0) + Math.ceil(cubes / 5) * (unit + 4);
};

/**
 * Elvétel rudakkal és kockákkal: az utolsó `takeTens` rúd és az utolsó `takeOnes` kocka áthúzva.
 * `breakRod`: egy rudat 10 kockára bontottunk (narancs keret jelzi).
 */
export const TakeBlocksPart: React.FC<{
  x: number;
  y: number;
  a: number;
  takeOnes?: number;
  takeTens?: number;
  breakRod?: boolean;
  unit?: number;
  gap?: number;
}> = ({ x, y, a, takeOnes = 0, takeTens = 0, breakRod = false, unit = 8, gap = 5 }) => {
  const rods = Math.floor(a / 10) - (breakRod ? 1 : 0);
  const baseOnes = a % 10;
  const cubes = baseOnes + (breakRod ? 10 : 0);
  const rodH = unit * 10;
  const onesX = x + rods * (unit + gap) + (rods > 0 ? gap + 4 : 0);
  const cross = (cx: number, cy: number, s: number, key: string) => (
    <g key={key}>
      <line x1={cx - s} y1={cy - s} x2={cx + s} y2={cy + s} stroke={SUB50_UNK} strokeWidth="2" strokeLinecap="round" />
      <line x1={cx - s} y1={cy + s} x2={cx + s} y2={cy - s} stroke={SUB50_UNK} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
  return (
    <g>
      {Array.from({ length: rods }, (_, t) => {
        const rx = x + t * (unit + gap);
        const crossed = t >= rods - takeTens;
        return (
          <g key={`t${t}`} opacity={crossed ? 0.55 : 1}>
            <rect x={rx} y={y} width={unit} height={rodH} rx="1.5" fill="#d8b4fe" stroke="#6b21a8" strokeWidth="1.6" />
            {Array.from({ length: 9 }, (_, k) => (
              <line key={k} x1={rx} y1={y + (k + 1) * unit} x2={rx + unit} y2={y + (k + 1) * unit} stroke="#6b21a8" strokeWidth="0.8" />
            ))}
            {crossed && (
              <line x1={rx - 3} y1={y + rodH - 4} x2={rx + unit + 3} y2={y + 4} stroke={SUB50_UNK} strokeWidth="2.4" strokeLinecap="round" />
            )}
          </g>
        );
      })}
      {Array.from({ length: cubes }, (_, i) => {
        const col = Math.floor(i / 5);
        const row = i % 5;
        const cx = onesX + col * (unit + 4);
        const cy = y + rodH - (row + 1) * (unit + 3) + 3;
        const crossed = i >= cubes - takeOnes;
        const fromRod = breakRod && i >= baseOnes;
        return (
          <g key={`o${i}`}>
            <rect
              x={cx}
              y={cy}
              width={unit}
              height={unit}
              rx="1.5"
              fill={crossed ? '#f1f5f9' : fromRod ? '#fde68a' : '#86efac'}
              stroke={fromRod ? '#b45309' : '#15803d'}
              strokeWidth="1.6"
            />
            {crossed && cross(cx + unit / 2, cy + unit / 2, unit / 2 + 1, `x${i}`)}
          </g>
        );
      })}
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

interface BackTask {
  a: number;
  b: number;
}

const makeBackTask = (): BackTask => {
  for (;;) {
    const a = rnd(21, 49);
    const b = rnd(3, 9);
    if (a % 10 !== 0 && a % 10 < b && a - b >= 11) return { a, b };
  }
};

const backOptions = (a: number, b: number): number[] => {
  const d = a - b;
  const wrongSwap = Math.floor(a / 10) * 10 + (b - (a % 10)); // a „kisebbet a nagyobbikból” hiba
  const cands = [wrongSwap, d + 10, d - 1, d + 1];
  const out = [d];
  for (const c of cands) if (c > 0 && c <= 50 && !out.includes(c)) out.push(c);
  return shuffle(out.slice(0, 4));
};

/** Labor I: visszaugrás a kerek tízesig, aztán tovább. */
export const BackJumpLab: React.FC = () => {
  const [task, setTask] = React.useState<BackTask>({ a: 32, b: 5 });
  const [hop1, setHop1] = React.useState<number | null>(null);
  const [opts, setOpts] = React.useState<number[]>(() => backOptions(32, 5));
  const [msg, setMsg] = React.useState<Msg>(null);
  const [done, setDone] = React.useState(false);

  const need = task.a % 10;
  const ten = task.a - need;
  const rest = task.b - need;
  const hop1Ok = hop1 === need;
  const result = task.a - task.b;

  const newTask = () => {
    const t = makeBackTask();
    setTask(t);
    setHop1(null);
    setOpts(backOptions(t.a, t.b));
    setMsg(null);
    setDone(false);
  };

  const chooseHop = (h: number) => {
    setHop1(h);
    if (h === need) {
      setMsg({ ok: true, text: `Jó! ${task.a} − ${need} = ${ten}. Még ${rest} van hátra.` });
    } else if (h < need) {
      setMsg({ ok: false, text: `${task.a} − ${h} = ${task.a - h}. Ez még nem kerek tízes! Ugorj nagyobbat!` });
    } else {
      setMsg({ ok: false, text: `${task.a} − ${h} = ${task.a - h}. Átugrottad a kerek tízest! Ugorj kisebbet!` });
    }
  };

  const chooseResult = (v: number) => {
    const wrongSwap = Math.floor(task.a / 10) * 10 + (task.b - need);
    if (v === result) {
      setDone(true);
      setMsg({ ok: true, text: `Szuper! ${task.a} − ${task.b} = ${task.a} − ${need} − ${rest} = ${ten} − ${rest} = ${result}.` });
    } else if (v === wrongSwap) {
      setMsg({ ok: false, text: `Vigyázz! A ${ten} után még ${rest} lépést ugorj vissza: ${ten} − ${rest} = ?` });
    } else if (v === result + 10) {
      setMsg({ ok: false, text: `Elfelejtetted, hogy átléptük a tízest! ${ten} − ${rest} = ?` });
    } else {
      setMsg({ ok: false, text: `Számold újra: ${ten} − ${rest} = ?` });
    }
  };

  const from = Math.max(0, Math.ceil(task.a / 10) * 10 - 20);
  const to = Math.ceil(task.a / 10) * 10;
  const hops: Hop[] = [];
  if (hop1 !== null) hops.push({ from: task.a, to: Math.max(from, task.a - hop1), label: `−${hop1}`, color: hop1Ok ? '#16a34a' : '#dc2626' });
  if (hop1Ok) hops.push({ from: ten, to: ten - rest, label: `−${rest}`, color: '#2563eb' });

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100">
        Számold ki visszaugrással:
        <span className="text-3xl font-black align-middle ml-3">
          {task.a} − {task.b} = ?
        </span>
      </div>
      <svg viewBox="0 0 360 130" className="w-full max-w-lg mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
        <rect x="1" y="1" width="358" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        {hops.length > 0 ? (
          <JumpsPart
            x={20}
            y={82}
            width={312}
            from={from}
            to={to}
            hops={hops}
            startLabel={String(task.a)}
            endValue={done ? result : undefined}
            endLabel={String(result)}
            labelEvery={5}
            fontSize={12}
          />
        ) : (
          <g>
            <NumberLinePart x={20} y={82} width={312} from={from} to={to} labelEvery={5} fontSize={12} />
            <circle cx={20 + (task.a - from) * (312 / (to - from))} cy={82} r="5" fill="#7c3aed" />
            <text x={20 + (task.a - from) * (312 / (to - from))} y={118} textAnchor="middle" fontSize="14" fontWeight="900" fill="#6d28d9">
              {task.a}
            </text>
          </g>
        )}
      </svg>
      {!hop1Ok && (
        <div className="space-y-2">
          <p className="text-center text-sm font-bold text-slate-700 dark:text-slate-200">
            1. lépés: mennyit ugorj vissza, hogy kerek tízesre érj?
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {Array.from({ length: task.b }, (_, i) => i + 1).map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => chooseHop(h)}
                className={`w-14 h-14 rounded-xl text-xl font-black border-2 active:scale-95 ${
                  hop1 === h ? 'bg-rose-100 border-rose-400 text-rose-800' : 'bg-violet-50 border-violet-300 text-violet-900'
                }`}
              >
                −{h}
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

interface TakeTask {
  a: number;
  b: number;
}

const makeTakeTask = (): TakeTask => {
  for (;;) {
    const a = rnd(22, 50);
    const twoDigit = Math.random() < 0.4;
    const b = twoDigit ? rnd(11, 19) : rnd(3, 9);
    if (a - b >= 5 && (a % 10 < b % 10 || Math.random() < 0.3)) return { a, b };
  }
};

const labBtn =
  'px-3 py-2 rounded-xl font-black text-sm min-h-[52px] border-2 active:scale-95 transition-transform';

/** Labor II: elvétel rudakkal és kockákkal (rúd bontása 10 kockára). */
export const TakeAwayLab: React.FC = () => {
  const [task, setTask] = React.useState<TakeTask>({ a: 34, b: 8 });
  const [rods, setRods] = React.useState(3);
  const [cubes, setCubes] = React.useState(4);
  const [removed, setRemoved] = React.useState(0);
  const [msg, setMsg] = React.useState<Msg>(null);

  const reset = (t: TakeTask) => {
    setRods(Math.floor(t.a / 10));
    setCubes(t.a % 10);
    setRemoved(0);
    setMsg(null);
  };

  const newTask = () => {
    const t = makeTakeTask();
    setTask(t);
    reset(t);
  };

  const takeCube = () => {
    if (cubes === 0) {
      setMsg({ ok: false, text: 'Nincs több kocka! Bonts fel egy rudat 10 kockára!' });
      return;
    }
    setCubes((c) => c - 1);
    setRemoved((r) => r + 1);
    setMsg(null);
  };

  const takeRod = () => {
    if (rods === 0) return;
    setRods((r) => r - 1);
    setRemoved((r) => r + 10);
    setMsg(null);
  };

  const breakRod = () => {
    if (rods === 0) return;
    setRods((r) => r - 1);
    setCubes((c) => c + 10);
    setMsg({ ok: true, text: '1 rúd = 10 kocka. Most már el tudod venni!' });
  };

  const left = rods * 10 + cubes;

  const check = () => {
    if (removed === task.b) {
      setMsg({ ok: true, text: `Ügyes! ${task.a} − ${task.b} = ${left}. Ellenőrzés: ${left} + ${task.b} = ${task.a}.` });
    } else if (removed < task.b) {
      setMsg({ ok: false, text: `Eddig elvettél: ${removed}. Kell: ${task.b}. Még ${task.b - removed} hiányzik!` });
    } else {
      setMsg({ ok: false, text: `Túl sokat vettél el: ${removed}. Csak ${task.b} kell. Kezdd újra!` });
    }
  };

  const w = blocksWidth(rods, cubes, 9, 7);

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
        Vegyél el ennyit:
        <span className="text-3xl font-black align-middle ml-3">
          {task.a} − {task.b}
        </span>
      </div>
      <svg viewBox="0 0 320 124" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
        <rect x="1" y="1" width="318" height="122" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <FillBlocksPart x={160 - w / 2} y={14} tens={rods} ones={cubes} added={0} unit={9} gap={7} />
      </svg>
      <p className="text-center text-sm font-bold text-amber-900 dark:text-amber-200">
        Elvettél: {removed} • Maradt: {left}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={takeCube} className={`${labBtn} bg-emerald-600 text-white border-emerald-700`}>− 1 kocka</button>
        <button type="button" onClick={takeRod} className={`${labBtn} bg-purple-600 text-white border-purple-700`}>− 1 rúd (10)</button>
        <button type="button" onClick={breakRod} className={`${labBtn} bg-amber-100 text-amber-900 border-amber-400`}>Rúd → 10 kocka</button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={() => reset(task)} className="px-5 py-2.5 rounded-xl bg-white text-slate-800 border-2 border-slate-300 text-sm font-bold min-h-[48px]">
          Újrakezdem
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
