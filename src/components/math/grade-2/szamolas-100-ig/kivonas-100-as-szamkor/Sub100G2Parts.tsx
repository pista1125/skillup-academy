import React from 'react';
import {
  N100_FONT,
  RodsPart,
  rodsWidth,
  LabMsg,
  LabMsgBox,
  LAB_BTN
} from '../szamok-100-ig/Numbers100G2Parts';

// ---------------------------------------------------------------------------
// 3. Kivonás 100-as számkör – közös elemek és labor
// ---------------------------------------------------------------------------

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Kell-e rudat bontani az a − b kivonáshoz? */
export const needsBreak = (a: number, b: number): boolean => a % 10 < b % 10;

/** Az a − b elvétel képe: ha kell, 1 rudat felbontunk 10 kockára, az elvett részeket áthúzzuk. */
export const subRods = (a: number, b: number): { tens: number; ones: number; crossTens: number; crossOnes: number } => {
  const br = needsBreak(a, b);
  return {
    tens: Math.floor(a / 10) - (br ? 1 : 0),
    ones: (a % 10) + (br ? 10 : 0),
    crossTens: Math.floor(b / 10),
    crossOnes: b % 10
  };
};

export const RodsSubPart: React.FC<{ x?: number; y?: number; a: number; b: number; u?: number; strokeWidth?: number }> = ({
  x = 0,
  y = 0,
  a,
  b,
  u = 9,
  strokeWidth
}) => {
  const s = subRods(a, b);
  return (
    <RodsPart
      x={x}
      y={y}
      tens={s.tens}
      ones={s.ones}
      crossTens={s.crossTens}
      crossOnes={s.crossOnes}
      u={u}
      strokeWidth={strokeWidth}
    />
  );
};

export const rodsSubWidth = (a: number, b: number, u = 9): number => {
  const s = subRods(a, b);
  return rodsWidth(s.tens, s.ones, u);
};

// ---------------------------------------------------------------------------
// Labor I: elvétel rudakkal, rúdbontással
// ---------------------------------------------------------------------------

interface SubTask {
  a: number;
  b: number;
}

const makeSubTask = (): SubTask => {
  for (;;) {
    const a = rnd(51, 99);
    const b = Math.random() < 0.4 ? rnd(3, 9) : rnd(12, 48);
    if (b % 10 === 0) continue;
    if (a - b < 5) continue;
    if (!needsBreak(a, b) && Math.random() < 0.65) continue;
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

export const RodSubLab: React.FC = () => {
  const [task, setTask] = React.useState<SubTask>({ a: 52, b: 18 });
  const [tens, setTens] = React.useState(5);
  const [ones, setOnes] = React.useState(2);
  const [takenT, setTakenT] = React.useState(0);
  const [takenE, setTakenE] = React.useState(0);
  const [chosen, setChosen] = React.useState<number | null>(null);
  const [options, setOptions] = React.useState<number[]>(() => shuffle([34, 44, 36, 24]));
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const bT = Math.floor(task.b / 10);
  const bE = task.b % 10;
  const rest = task.a - task.b;
  const done = takenT === bT && takenE === bE;

  const reset = (t: SubTask) => {
    setTask(t);
    setTens(Math.floor(t.a / 10));
    setOnes(t.a % 10);
    setTakenT(0);
    setTakenE(0);
    setChosen(null);
    const r = t.a - t.b;
    const cands = [r, r + 10, r - 10, r + 1, r - 1, r + 2].filter((v) => v > 0 && v <= 100);
    setOptions(shuffle(Array.from(new Set(cands)).slice(0, 4)));
    setMsg(null);
  };

  const takeRod = () => {
    if (tens === 0) return;
    if (takenT >= bT) {
      setMsg({ ok: false, text: `Elég! Csak ${bT} rudat kell elvenni.` });
      return;
    }
    setTens((v) => v - 1);
    setTakenT((v) => v + 1);
    setMsg(null);
  };

  const takeCube = () => {
    if (takenE >= bE) {
      setMsg({ ok: false, text: `Elég! Csak ${bE} kockát kell elvenni.` });
      return;
    }
    if (ones === 0) {
      setMsg({ ok: false, text: 'Nincs több kocka! Bonts fel egy rudat 10 kockára!' });
      return;
    }
    setOnes((v) => v - 1);
    setTakenE((v) => v + 1);
    setMsg(null);
  };

  const breakRod = () => {
    if (tens === 0) return;
    setTens((v) => v - 1);
    setOnes((v) => v + 10);
    setMsg(null);
  };

  const check = () => {
    if (!done) {
      setMsg({ ok: false, text: `Még nem vettél el mindent! El kell venni ${bT} rudat és ${bE} kockát.` });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'Ügyes! Most válaszd ki, mennyi maradt!' });
      return;
    }
    if (chosen === rest) {
      setMsg({ ok: true, text: `Remek! ${task.a} − ${task.b} = ${rest}. Ellenőrzés: ${rest} + ${task.b} = ${task.a}.` });
      return;
    }
    setMsg({ ok: false, text: `Számold meg, mi maradt: ${tens} rúd és ${ones} kocka.` });
  };

  const u = 10;
  const w = rodsWidth(tens, ones, u);
  const canBreak = tens > 0 && ones < bE - takenE;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100">
        Vegyél el:
        <span className="text-2xl sm:text-3xl font-black align-middle ml-3">
          {task.a} − {task.b} = ?
        </span>
        <div className="text-xs sm:text-sm mt-1">
          Elveszel: {bT > 0 ? `${bT} rudat és ` : ''}{bE} kockát.
        </div>
      </div>
      <svg viewBox="0 0 340 130" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="338" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <RodsPart x={170 - w / 2} y={10} tens={tens} ones={ones} u={u} />
        <text x="170" y="124" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569" fontFamily={N100_FONT}>
          Elvettél: {takenT} rudat és {takenE} kockát
        </text>
      </svg>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={takeRod} className={`${LAB_BTN} bg-blue-600 text-white`}>
          − 1 rúd
        </button>
        <button type="button" onClick={takeCube} className={`${LAB_BTN} bg-amber-500 text-white`}>
          − 1 kocka
        </button>
        {canBreak && (
          <button type="button" onClick={breakRod} className={`${LAB_BTN} bg-emerald-600 text-white`}>
            1 rúd → 10 kocka
          </button>
        )}
        <button type="button" onClick={() => reset(task)} className={`${LAB_BTN} bg-slate-200 text-slate-800`}>
          Újrakezdés
        </button>
      </div>
      {done && (
        <div className="space-y-2">
          <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Mennyi maradt?</p>
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
                    ? 'bg-violet-500 text-white border-violet-700 scale-105'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className={`${LAB_BTN} bg-violet-700 text-white px-6`}>
          Ellenőrzés
        </button>
        <button type="button" onClick={() => reset(makeSubTask())} className={`${LAB_BTN} bg-slate-200 text-slate-800 px-6`}>
          Új feladat
        </button>
      </div>
      <LabMsgBox msg={msg} />
    </div>
  );
};
