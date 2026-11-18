import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 2. Osztás 3-mal – közös SVG-építőelemek és laborok (2. osztály)
// ---------------------------------------------------------------------------

export const DIV3_FONT = 'system-ui, Segoe UI, sans-serif';

export const DIV3_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** -szor / -szer / -ször rag (pl. 3-szor, 5-ször, 7-szer). */
export const szor = (n: number): string => {
  const last = n % 10;
  if (last === 0) return n === 10 ? `${n}-szer` : `${n}-szor`;
  const m: Record<number, string> = { 1: 'szer', 2: 'szer', 3: 'szor', 4: 'szer', 5: 'ször', 6: 'szor', 7: 'szer', 8: 'szor', 9: 'szer' };
  return `${n}-${m[last]}`;
};

/** -ban / -ben rag (pl. 13-ban, 14-ben, 20-ban). */
export const ban = (n: number): string => {
  const last = n % 10;
  if (last === 0) return n === 10 ? `${n}-ben` : `${n}-ban`;
  const back = [3, 6, 8].includes(last);
  return `${n}-${back ? 'ban' : 'ben'}`;
};

/** Tányér `count` darab süteménnyel (korong). Ha `unknown`, „?” áll rajta. */
export const PlatePart: React.FC<{ cx: number; cy: number; w?: number; count?: number; unknown?: boolean; color?: string }> = ({
  cx,
  cy,
  w = 70,
  count = 0,
  unknown = false,
  color = '#f59e0b'
}) => {
  const h = w * 0.42;
  const perRow = count <= 4 ? count : Math.ceil(count / 2);
  const rows = count <= 4 ? 1 : 2;
  const r = Math.min(w * 0.075, (w * 0.78) / Math.max(1, perRow) / 2.3);
  const dx = r * 2.3;
  return (
    <g>
      <ellipse cx={cx} cy={cy + 3} rx={w / 2} ry={h / 2} fill="#cbd5e1" />
      <ellipse cx={cx} cy={cy} rx={w / 2} ry={h / 2} fill="#ffffff" stroke="#64748b" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx={w * 0.36} ry={h * 0.34} fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
      {!unknown &&
        Array.from({ length: count }, (_, i) => {
          const row = rows === 1 ? 0 : Math.floor(i / perRow);
          const inRow = rows === 1 ? count : row === 0 ? perRow : count - perRow;
          const c = rows === 1 ? i : i % perRow;
          const x = cx + (c - (inRow - 1) / 2) * dx;
          const y = cy + (rows === 1 ? 0 : (row - 0.5) * r * 2.1);
          return <circle key={i} cx={x} cy={y} r={r} fill={color} stroke="#78350f" strokeWidth="1.2" />;
        })}
      {unknown && (
        <text x={cx} y={cy + w * 0.09} textAnchor="middle" fontSize={w * 0.28} fontWeight="900" fill="#dc2626" fontFamily={DIV3_FONT}>
          ?
        </text>
      )}
    </g>
  );
};

/**
 * Korongok sorokban (soronként `perRow`, ami 3 többszöröse), az első `ringed`
 * hármas csoport karikázva.
 */
export const RingedDotsPart: React.FC<{
  x: number;
  y: number;
  n: number;
  ringed?: number;
  perRow?: number;
  step?: number;
  r?: number;
  color?: string;
}> = ({ x, y, n, ringed = 0, perRow = 6, step = 22, r = 7, color = '#3b82f6' }) => (
  <g>
    {Array.from({ length: ringed }, (_, g) => {
      const first = g * 3;
      const row = Math.floor(first / perRow);
      const col = first % perRow;
      return (
        <rect
          key={`g${g}`}
          x={x + col * step - r - 4}
          y={y + row * step - r - 4}
          width={2 * step + 2 * r + 8}
          height={2 * r + 8}
          rx={r + 4}
          fill="#fef9c3"
          stroke="#ca8a04"
          strokeWidth="2.2"
        />
      );
    })}
    {Array.from({ length: n }, (_, i) => {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const inRing = i < ringed * 3;
      return (
        <circle
          key={i}
          cx={x + col * step}
          cy={y + row * step}
          r={r}
          fill={inRing ? DIV3_COLORS[Math.floor(i / 3) % DIV3_COLORS.length] : color}
          stroke="#1e293b"
          strokeWidth="1.2"
        />
      );
    })}
  </g>
);

/** Számegyenes visszafelé hármas ugrásokkal `start`-tól, amíg lehet. */
export const JumpBackPart: React.FC<{
  x0?: number;
  y?: number;
  unit?: number;
  max?: number;
  start: number;
  jumps?: number;
  labels?: number[];
  fontSize?: number;
}> = ({ x0 = 14, y = 60, unit = 7.6, max = 30, start, jumps, labels, fontSize = 10 }) => {
  const X = (v: number) => x0 + v * unit;
  const k = jumps ?? Math.floor(start / 3);
  const shown = labels ?? [0, start];
  return (
    <g fontFamily={DIV3_FONT}>
      <line x1={X(0) - 4} y1={y} x2={X(max) + 8} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${X(max) + 8} ${y - 4} L ${X(max) + 14} ${y} L ${X(max) + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: max + 1 }, (_, v) => {
        const big = v % 10 === 0;
        return <line key={v} x1={X(v)} y1={big ? y - 7 : y - 4} x2={X(v)} y2={big ? y + 7 : y + 4} stroke="#334155" strokeWidth={big ? 1.8 : 1.1} />;
      })}
      {shown.map((v) => (
        <text key={`l${v}`} x={X(v)} y={y + 19} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill={v === start ? '#be123c' : '#475569'}>
          {v}
        </text>
      ))}
      {Array.from({ length: k }, (_, i) => {
        const a = X(start - i * 3);
        const b = X(start - (i + 1) * 3);
        const m = (a + b) / 2;
        const h = Math.min(24, Math.abs(a - b) * 0.9);
        return (
          <g key={`j${i}`}>
            <path d={`M ${a} ${y - 3} Q ${m} ${y - h} ${b} ${y - 3}`} fill="none" stroke="#e11d48" strokeWidth="2.2" />
            <path d={`M ${b + 4} ${y - 9} L ${b} ${y - 3} L ${b + 6} ${y - 3}`} fill="none" stroke="#e11d48" strokeWidth="2" strokeLinejoin="round" />
          </g>
        );
      })}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Labor I: Szétosztás 3 tányérra (körbeosztás)
// ---------------------------------------------------------------------------

interface ShareTask {
  q: number;
  r: number;
}

const makeShareTask = (prev?: ShareTask): ShareTask => {
  for (;;) {
    const q = rnd(2, 9);
    const r = Math.random() < 0.5 ? 0 : rnd(1, 2);
    if (q * 3 + r <= 30 && (!prev || prev.q !== q || prev.r !== r)) return { q, r };
  }
};

export const ShareLab3: React.FC = () => {
  const [task, setTask] = useState<ShareTask>({ q: 4, r: 0 });
  const [plates, setPlates] = useState<number[]>([0, 0, 0]);
  const [choice, setChoice] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const n = task.q * 3 + task.r;
  const used = plates[0] + plates[1] + plates[2];
  const pile = n - used;

  const reset = (t: ShareTask) => {
    setTask(t);
    setPlates([0, 0, 0]);
    setChoice(null);
    setMsg(null);
  };

  const addTo = (i: number) => {
    if (pile <= 0) {
      setMsg({ ok: false, text: 'Elfogyott a süti a dobozból!' });
      return;
    }
    setPlates((p) => p.map((v, k) => (k === i ? v + 1 : v)));
    setMsg(null);
  };

  const round = () => {
    if (pile < 3) {
      setMsg({ ok: false, text: `Már csak ${pile} süti van a dobozban. Ez nem elég 3 tányérra!` });
      return;
    }
    setPlates((p) => p.map((v) => v + 1));
    setMsg(null);
  };

  const check = () => {
    const equal = plates[0] === plates[1] && plates[1] === plates[2];
    if (!equal) {
      setMsg({ ok: false, text: `A tányérokon nem egyforma: ${plates.join(', ')}. Mindenkinek ugyanannyi jár!` });
      return;
    }
    if (pile >= 3) {
      setMsg({ ok: false, text: `Még ${pile} süti van a dobozban. Még mindenkinek tudsz adni egyet!` });
      return;
    }
    if (choice === null) {
      setMsg({ ok: false, text: 'Szép! Most válaszd ki: mennyi jutott egy tányérra?' });
      return;
    }
    if (choice !== plates[0]) {
      setMsg({ ok: false, text: 'Számold meg egy tányéron a sütiket!' });
      return;
    }
    if (task.r === 0) {
      setMsg({ ok: true, text: `Ügyes! ${n} : 3 = ${task.q}, mert ${task.q} · 3 = ${n}. Nem maradt semmi.` });
    } else {
      setMsg({
        ok: true,
        text: `Ügyes! Egy tányérra ${task.q} jutott, maradt ${task.r}. Ellenőrzés: ${task.q} · 3 = ${task.q * 3}, és ${task.q * 3} + ${task.r} = ${n}.`
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100">
        Oszd el egyenlően a <strong className="text-2xl font-black">{n}</strong> sütit 3 tányérra!
        <div className="text-xs sm:text-sm mt-1">Koppints egy tányérra, vagy adj körbe mindenkinek egyet.</div>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-200">
        <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 text-base font-black">A dobozban: {pile}</span>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {plates.map((v, i) => (
          <button
            key={i}
            type="button"
            onClick={() => addTo(i)}
            className="rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1 min-h-[96px] active:scale-95 transition-transform"
            aria-label={`${i + 1}. tányér`}
          >
            <svg viewBox="0 0 100 64" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
              <PlatePart cx={50} cy={34} w={92} count={v} />
            </svg>
            <div className="text-lg font-black text-slate-800 dark:text-slate-100">{v}</div>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={round} className="px-4 py-2 rounded-xl bg-sky-600 text-white font-bold text-sm min-h-[48px]">
          Körbe: mindenkinek 1
        </button>
        <button
          type="button"
          onClick={() => {
            setPlates([0, 0, 0]);
            setChoice(null);
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-sm min-h-[48px]"
        >
          Újrakezdem
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-center text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">Egy tányérra ennyi jutott:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setChoice(k);
                setMsg(null);
              }}
              className={`w-12 h-12 rounded-xl font-black text-base border-2 transition-all ${
                choice === k
                  ? 'bg-sky-500 text-white border-sky-700 scale-105'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-1">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-sky-700 text-white text-sm font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={() => reset(makeShareTask(task))} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
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

// ---------------------------------------------------------------------------
// Labor II: Karikázz hármasával! (maradékkal)
// ---------------------------------------------------------------------------

export const GroupLab3: React.FC = () => {
  const [n, setN] = useState<number>(14);
  const [rings, setRings] = useState<number>(0);
  const [rest, setRest] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const free = n - rings * 3;

  const newTask = () => {
    let next = rnd(7, 30);
    while (next === n) next = rnd(7, 30);
    setN(next);
    setRings(0);
    setRest(null);
    setMsg(null);
  };

  const addRing = () => {
    if (free < 3) {
      setMsg({ ok: false, text: `Már csak ${free} szabad korong van. Ebből nem lesz hármas csoport!` });
      return;
    }
    setRings((k) => k + 1);
    setMsg(null);
  };

  const check = () => {
    if (free >= 3) {
      setMsg({ ok: false, text: `Még ${free} szabad korong van. Ebből még lesz karika!` });
      return;
    }
    if (rest === null) {
      setMsg({ ok: false, text: 'Jó! Most válaszd ki: mennyi maradt ki a karikákból?' });
      return;
    }
    if (rest !== free) {
      setMsg({ ok: false, text: 'Számold meg a karikán kívüli korongokat!' });
      return;
    }
    setMsg({
      ok: true,
      text:
        free === 0
          ? `Szuper! ${rings} csoport lett, nem maradt semmi. ${n} : 3 = ${rings}, mert ${rings} · 3 = ${n}.`
          : `Szuper! ${ban(n)} a 3 megvan ${szor(rings)}, maradt ${free}. Ellenőrzés: ${rings} · 3 = ${rings * 3}, és ${rings * 3} + ${free} = ${n}.`
    });
  };

  const rows = Math.ceil(n / 6);

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 text-center text-emerald-950 dark:text-emerald-100">
        Karikázz be hármasával <strong className="text-2xl font-black">{n}</strong> korongot!
        <div className="text-xs sm:text-sm mt-1">Hány csoport lesz? Mennyi marad?</div>
      </div>

      <svg viewBox={`0 0 170 ${rows * 24 + 16}`} className="w-full max-w-xs mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="168" height={rows * 24 + 14} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
        <RingedDotsPart x={24} y={20} n={n} ringed={rings} perRow={6} step={24} r={8} color="#94a3b8" />
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setRings((k) => Math.max(0, k - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-900 font-bold text-sm min-h-[48px]"
        >
          − 1 karika
        </button>
        <span className="px-3 py-2 font-black text-lg text-slate-700 dark:text-slate-200">{rings} csoport</span>
        <button type="button" onClick={addRing} className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm min-h-[48px]">
          + 1 karika (3 korong)
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-center text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">Ennyi maradt ki:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[0, 1, 2].map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setRest(k);
                setMsg(null);
              }}
              className={`w-14 h-12 rounded-xl font-black text-lg border-2 transition-all ${
                rest === k
                  ? 'bg-emerald-500 text-white border-emerald-700 scale-105'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
              }`}
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-1">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-bold min-h-[48px]">
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
