import React from 'react';
import {
  N100_FONT,
  N100_COLORS,
  RodsPart,
  rodsWidth,
  NumberLinePart,
  LineHop,
  LabMsg,
  LabMsgBox,
  LAB_BTN
} from '../szamok-100-ig/Numbers100G2Parts';

// ---------------------------------------------------------------------------
// 2. Összeadás 100-as számkör – közös elemek és laborok
// ---------------------------------------------------------------------------

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Két szám rudakkal: az első kék rúd + sárga kocka, a második zöld rúd + rózsaszín kocka. */
export const RodsAddPart: React.FC<{
  x?: number;
  y?: number;
  a: number;
  b: number;
  u?: number;
  plus?: boolean;
  strokeWidth?: number;
}> = ({ x = 0, y = 0, a, b, u = 9, plus = true, strokeWidth }) => {
  const aT = Math.floor(a / 10);
  const aE = a % 10;
  const bT = Math.floor(b / 10);
  const bE = b % 10;
  const wa = rodsWidth(aT, aE, u);
  const gapPlus = plus ? u * 2.4 : u;
  return (
    <g>
      <RodsPart x={x} y={y} tens={aT} ones={aE} u={u} strokeWidth={strokeWidth} />
      {plus && (
        <text
          x={x + wa + gapPlus / 2}
          y={y + 6.4 * u}
          textAnchor="middle"
          fontSize={u * 2.4}
          fontWeight="900"
          fill={N100_COLORS.ink}
          fontFamily={N100_FONT}
        >
          +
        </text>
      )}
      <RodsPart
        x={x + wa + gapPlus}
        y={y}
        tens={bT}
        ones={bE}
        u={u}
        rodFill={N100_COLORS.rod2Fill}
        rodStroke={N100_COLORS.rod2Stroke}
        cubeFill={N100_COLORS.cube2Fill}
        cubeStroke={N100_COLORS.cube2Stroke}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

export const rodsAddWidth = (a: number, b: number, u = 9, plus = true): number =>
  rodsWidth(Math.floor(a / 10), a % 10, u) + (plus ? u * 2.4 : u) + rodsWidth(Math.floor(b / 10), b % 10, u);

// ---------------------------------------------------------------------------
// Labor I: összeadás rudakkal, cserével
// ---------------------------------------------------------------------------

interface AddTask {
  a: number;
  b: number;
}

const makeAddTask = (): AddTask => {
  for (;;) {
    const a = rnd(51, 89);
    const b = Math.random() < 0.5 ? rnd(3, 9) : rnd(11, 39);
    if (b % 10 === 0) continue;
    const s = a + b;
    if (s > 100) continue;
    const cross = (a % 10) + (b % 10) >= 10;
    if (!cross && Math.random() < 0.6) continue;
    return { a, b };
  }
};

const shuffle = <T,>(arr: T[]): T[] => {
  const c = [...arr];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
};

const makeOptions = (sum: number): number[] => {
  const set = new Set<number>([sum]);
  const cands = [sum - 10, sum + 10, sum - 1, sum + 1, sum + 2];
  for (const c of cands) {
    if (set.size >= 4) break;
    if (c > 0 && c <= 100) set.add(c);
  }
  return shuffle([...set]);
};

export const RodAddLab: React.FC = () => {
  const [task, setTask] = React.useState<AddTask>({ a: 38, b: 25 });
  const [exchanged, setExchanged] = React.useState(false);
  const [options, setOptions] = React.useState<number[]>(() => shuffle([63, 53, 64, 73]));
  const [chosen, setChosen] = React.useState<number | null>(null);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const sum = task.a + task.b;
  const aT = Math.floor(task.a / 10);
  const bT = Math.floor(task.b / 10);
  const onesSum = (task.a % 10) + (task.b % 10);
  const canExchange = onesSum >= 10 && !exchanged;

  const newTask = () => {
    const t = makeAddTask();
    setTask(t);
    setExchanged(false);
    setOptions(makeOptions(t.a + t.b));
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (chosen === null) {
      setMsg({ ok: false, text: 'Válaszd ki lent az összeget!' });
      return;
    }
    if (chosen === sum) {
      setMsg({
        ok: true,
        text:
          onesSum >= 10
            ? `Remek! ${aT + bT} rúd és ${onesSum} kocka. A 10 kockából 1 rúd lett: ${task.a} + ${task.b} = ${sum}.`
            : `Remek! ${aT + bT} rúd és ${onesSum} kocka: ${task.a} + ${task.b} = ${sum}.`
      });
      return;
    }
    if (chosen === sum - 10 && onesSum >= 10) {
      setMsg({ ok: false, text: 'Elfelejtetted a cserét! 10 kocka = 1 rúd, ez még egy tízes.' });
      return;
    }
    if (Math.abs(chosen - sum) === 10) {
      setMsg({ ok: false, text: 'Számold meg újra a rudakat! Minden rúd egy tízes.' });
      return;
    }
    setMsg({ ok: false, text: 'Számold meg újra a kockákat! Minden kocka egy egyes.' });
  };

  const u = 10;
  const w = exchanged ? rodsWidth(aT + bT + 1, onesSum - 10, u) : rodsAddWidth(task.a, task.b, u);
  const x0 = 170 - w / 2;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 text-center text-emerald-950 dark:text-emerald-100">
        Add össze:
        <span className="text-2xl sm:text-3xl font-black align-middle ml-3">
          {task.a} + {task.b} = ?
        </span>
      </div>
      <svg viewBox="0 0 340 130" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="338" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        {exchanged ? (
          <RodsPart x={x0} y={14} tens={aT + bT + 1} ones={onesSum - 10} u={u} />
        ) : (
          <RodsAddPart x={x0} y={14} a={task.a} b={task.b} u={u} />
        )}
        <text x="170" y="124" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569" fontFamily={N100_FONT}>
          {exchanged ? 'A 10 kockából 1 rúd lett!' : `Kockák együtt: ${onesSum}`}
        </text>
      </svg>
      {canExchange && (
        <div className="flex justify-center">
          <button
            type="button"
            className={`${LAB_BTN} bg-emerald-600 text-white`}
            onClick={() => {
              setExchanged(true);
              setMsg(null);
            }}
          >
            10 kocka → 1 rúd
          </button>
        </div>
      )}
      <div className="space-y-2">
        <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Mennyi az összeg?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {options.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setChosen(n);
                setMsg(null);
              }}
              className={`w-16 h-14 rounded-xl font-black text-xl border-2 transition-all ${
                chosen === n
                  ? 'bg-emerald-500 text-white border-emerald-700 scale-105'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className={`${LAB_BTN} bg-emerald-700 text-white px-6`}>
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className={`${LAB_BTN} bg-slate-200 text-slate-800 px-6`}>
          Új feladat
        </button>
      </div>
      <LabMsgBox msg={msg} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: ugrálás a számegyenesen (+10 / +1 vagy −10 / −1)
// ---------------------------------------------------------------------------

interface HopTask {
  a: number;
  b: number;
}

const makeHopTask = (mode: 'add' | 'sub'): HopTask => {
  for (;;) {
    const b = Math.random() < 0.35 ? rnd(4, 9) : rnd(12, 38);
    if (b % 10 === 0) continue;
    if (mode === 'add') {
      const a = rnd(41, 88);
      if (a + b > 100) continue;
      return { a, b };
    }
    const a = rnd(52, 100);
    if (a - b < 10) continue;
    return { a, b };
  }
};

export const HopLab: React.FC<{ mode: 'add' | 'sub' }> = ({ mode }) => {
  const sign = mode === 'add' ? 1 : -1;
  const [task, setTask] = React.useState<HopTask>(mode === 'add' ? { a: 47, b: 28 } : { a: 83, b: 26 });
  const [hops, setHops] = React.useState<number[]>([]);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const target = task.a + sign * task.b;
  const pos = task.a + sign * hops.reduce((s, h) => s + h, 0);
  const lo = Math.floor(Math.min(task.a, target) / 10) * 10;
  const hi = Math.min(100, Math.ceil(Math.max(task.a, target) / 10) * 10);
  const from = lo;
  const to = Math.max(hi, lo + 10);

  const hop = (size: 1 | 10) => {
    const next = pos + sign * size;
    if (next < from || next > to) return;
    setHops((h) => [...h, size]);
    setMsg(null);
  };

  const newTask = () => {
    setTask(makeHopTask(mode));
    setHops([]);
    setMsg(null);
  };

  const check = () => {
    const tens = hops.filter((h) => h === 10).length;
    const ones = hops.filter((h) => h === 1).length;
    const bT = Math.floor(task.b / 10);
    const bE = task.b % 10;
    const opText = mode === 'add' ? '+' : '−';
    if (pos === target) {
      if (tens === bT && ones === bE) {
        setMsg({
          ok: true,
          text:
            bT > 0
              ? `Szuper! ${task.a} ${opText} ${bT * 10} = ${task.a + sign * bT * 10}, és ${opText} ${bE} → ${target}.`
              : `Szuper! ${task.a} ${opText} ${bE} = ${target}.`
        });
      } else {
        setMsg({ ok: true, text: `Odaértél: ${target}! Gyorsabb, ha előbb tízeseket ugrasz, aztán egyeseket.` });
      }
      return;
    }
    const over = mode === 'add' ? pos > target : pos < target;
    if (over) {
      setMsg({ ok: false, text: 'Túlugrottál! Nyomd meg a Vissza gombot.' });
      return;
    }
    if (tens < bT) {
      setMsg({ ok: false, text: `Még nem értél oda. ${task.b} = ${bT} tízes + ${bE} egyes. Ugorj tízeseket!` });
      return;
    }
    setMsg({ ok: false, text: `Még nem értél oda. A tízesek megvannak, most jöhetnek az egyesek (${bE} darab)!` });
  };

  const lineHops: LineHop[] = [];
  let p = task.a;
  hops.forEach((h) => {
    const nxt = p + sign * h;
    lineHops.push({ from: p, to: nxt, color: h === 10 ? '#16a34a' : '#2563eb', h: h === 10 ? 20 : 9 });
    p = nxt;
  });

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100">
        Ugorj a számegyenesen:
        <span className="text-2xl sm:text-3xl font-black align-middle ml-3">
          {task.a} {mode === 'add' ? '+' : '−'} {task.b} = ?
        </span>
      </div>
      <svg viewBox="0 0 340 110" className="w-full max-w-lg mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="338" height="108" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <NumberLinePart
          x={16}
          y={70}
          width={300}
          from={from}
          to={to}
          hops={lineHops}
          fontSize={11}
          marks={[
            { value: task.a, color: '#7c3aed' },
            { value: pos, color: '#dc2626', arrow: hops.length > 0, label: hops.length > 0 ? String(pos) : undefined }
          ]}
          extraLabels={[task.a]}
        />
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => hop(10)} className={`${LAB_BTN} bg-green-600 text-white`}>
          {mode === 'add' ? '+ 10' : '− 10'}
        </button>
        <button type="button" onClick={() => hop(1)} className={`${LAB_BTN} bg-blue-600 text-white`}>
          {mode === 'add' ? '+ 1' : '− 1'}
        </button>
        <button
          type="button"
          onClick={() => {
            setHops((h) => h.slice(0, -1));
            setMsg(null);
          }}
          className={`${LAB_BTN} bg-slate-200 text-slate-800`}
        >
          Vissza
        </button>
      </div>
      <p className="text-center font-black text-lg text-slate-800 dark:text-slate-100">Most itt állsz: {pos}</p>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className={`${LAB_BTN} bg-sky-700 text-white px-6`}>
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className={`${LAB_BTN} bg-slate-200 text-slate-800 px-6`}>
          Új feladat
        </button>
      </div>
      <LabMsgBox msg={msg} />
    </div>
  );
};
