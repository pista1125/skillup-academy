import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 2. Szorzás 3-mal – közös SVG-építőelemek és laborok (2. osztály)
// ---------------------------------------------------------------------------

export const MULT3_FONT = 'system-ui, Segoe UI, sans-serif';

export const MULT3_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** -szor / -szer / -ször rag számokhoz (pl. 3-szor, 5-ször, 7-szer). */
export const szor = (n: number): string => {
  const last = n % 10;
  if (last === 0) return n === 10 ? `${n}-szer` : `${n}-szor`;
  const m: Record<number, string> = { 1: 'szer', 2: 'szer', 3: 'szor', 4: 'szer', 5: 'ször', 6: 'szor', 7: 'szer', 8: 'szor', 9: 'szer' };
  return `${n}-${m[last]}`;
};

/** Háromlevelű lóhere: három zöld levél + szár. */
export const CloverPart: React.FC<{ cx: number; cy: number; r?: number; color?: string }> = ({ cx, cy, r = 9, color = '#22c55e' }) => {
  const d = r * 0.85;
  const leaves = [-90, 30, 150].map((deg) => {
    const a = (deg * Math.PI) / 180;
    return { x: cx + d * Math.cos(a), y: cy + d * Math.sin(a) };
  });
  return (
    <g>
      <path d={`M ${cx} ${cy} Q ${cx + r * 0.3} ${cy + r * 1.6} ${cx - r * 0.2} ${cy + r * 2.4}`} stroke="#15803d" strokeWidth={Math.max(1.5, r * 0.22)} fill="none" strokeLinecap="round" />
      {leaves.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={r * 0.72} fill={color} stroke="#14532d" strokeWidth={Math.max(1, r * 0.13)} />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.22} fill="#14532d" />
    </g>
  );
};

/** Pálcikákból kirakott háromszög (3 pálcika, 3 szín). */
export const StickTrianglePart: React.FC<{ x: number; y: number; s?: number; w?: number }> = ({ x, y, s = 30, w = 4 }) => {
  const A = { x, y: y + s };
  const B = { x: x + s, y: y + s };
  const C = { x: x + s / 2, y: y + s * 0.12 };
  return (
    <g strokeLinecap="round" strokeWidth={w}>
      <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="#f59e0b" />
      <line x1={B.x} y1={B.y} x2={C.x} y2={C.y} stroke="#ef4444" />
      <line x1={C.x} y1={C.y} x2={A.x} y2={A.y} stroke="#3b82f6" />
    </g>
  );
};

/** Háromkerekű bicikli (tricikli): 3 jól látható kerék. */
export const TricyclePart: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = '#2563eb' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <line x1="8" y1="26" x2="30" y2="10" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="22" y1="26" x2="30" y2="10" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="30" y1="10" x2="40" y2="24" stroke={color} strokeWidth="3.5" strokeLinecap="round" />
    <line x1="27" y1="4" x2="34" y2="4" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <line x1="30" y1="4" x2="30" y2="10" stroke="#334155" strokeWidth="2.5" />
    <rect x="9" y="9" width="10" height="4" rx="2" fill="#334155" />
    <circle cx="8" cy="27" r="6.5" fill="#fff" stroke="#0f172a" strokeWidth="3" />
    <circle cx="22" cy="27" r="6.5" fill="#fff" stroke="#0f172a" strokeWidth="3" />
    <circle cx="40" cy="25" r="8.5" fill="#fff" stroke="#0f172a" strokeWidth="3" />
  </g>
);

/** Karikák, mindegyikben `each` korong (alapból 3). */
export const DotGroupsPart: React.FC<{
  x: number;
  y: number;
  groups: number;
  each?: number;
  size?: number;
  gap?: number;
  perRow?: number;
}> = ({ x, y, groups, each = 3, size = 30, gap = 6, perRow = 10 }) => (
  <g>
    {Array.from({ length: groups }, (_, g) => {
      const col = g % perRow;
      const row = Math.floor(g / perRow);
      const gx = x + col * (size + gap);
      const gy = y + row * (size + gap);
      const cx = gx + size / 2;
      const cy = gy + size / 2;
      const rr = size * 0.15;
      const pts =
        each === 3
          ? [
              { x: cx, y: cy - size * 0.18 },
              { x: cx - size * 0.2, y: cy + size * 0.16 },
              { x: cx + size * 0.2, y: cy + size * 0.16 }
            ]
          : Array.from({ length: each }, (_, i) => ({ x: cx + (i - (each - 1) / 2) * size * 0.34, y: cy }));
      return (
        <g key={g}>
          <circle cx={cx} cy={cy} r={size / 2 - 1} fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
          {pts.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={rr} fill={MULT3_COLORS[g % MULT3_COLORS.length]} stroke="#1e293b" strokeWidth="1" />
          ))}
        </g>
      );
    })}
  </g>
);

/** Rácspontok: `rows` sor × `cols` oszlop. */
export const DotArrayPart: React.FC<{ x: number; y: number; rows: number; cols: number; step?: number; r?: number }> = ({
  x,
  y,
  rows,
  cols,
  step = 20,
  r = 7
}) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const rr = Math.floor(i / cols);
      const c = i % cols;
      return (
        <circle
          key={i}
          cx={x + c * step}
          cy={y + rr * step}
          r={r}
          fill={['#ef4444', '#3b82f6', '#f59e0b'][rr % 3]}
          stroke="#1e293b"
          strokeWidth="1.2"
        />
      );
    })}
  </g>
);

/** 0–max számegyenes hármas (vagy tetszőleges) ugrásokkal. */
export const JumpLine3Part: React.FC<{
  x0?: number;
  y?: number;
  unit?: number;
  max?: number;
  min?: number;
  jumps?: number;
  size?: number;
  start?: number;
  back?: boolean;
  showEnd?: boolean;
  endLabel?: string;
  labelEvery?: number;
  arcColor?: string;
  fontSize?: number;
}> = ({
  x0 = 14,
  y = 70,
  unit = 7.6,
  max = 30,
  min = 0,
  jumps = 0,
  size = 3,
  start = 0,
  back = false,
  showEnd = true,
  endLabel,
  labelEvery = 3,
  arcColor = '#7c3aed',
  fontSize = 9.5
}) => {
  const X = (v: number) => x0 + (v - min) * unit;
  const dir = back ? -1 : 1;
  const end = start + dir * jumps * size;
  return (
    <g fontFamily={MULT3_FONT}>
      <line x1={X(min) - 4} y1={y} x2={X(max) + 8} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${X(max) + 8} ${y - 4} L ${X(max) + 14} ${y} L ${X(max) + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: max - min + 1 }, (_, i) => {
        const v = min + i;
        const big = v % 10 === 0;
        return <line key={v} x1={X(v)} y1={big ? y - 7 : y - 4} x2={X(v)} y2={big ? y + 7 : y + 4} stroke="#334155" strokeWidth={big ? 1.8 : 1.1} />;
      })}
      {Array.from({ length: max - min + 1 }, (_, i) => min + i)
        .filter((v) => v % labelEvery === 0 || v === start)
        .map((v) => (
          <text key={`t${v}`} x={X(v)} y={y + 18} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill="#475569">
            {!showEnd && v === end && v !== start ? '' : v}
          </text>
        ))}
      {Array.from({ length: jumps }, (_, i) => {
        const a = X(start + dir * i * size);
        const b = X(start + dir * (i + 1) * size);
        const m = (a + b) / 2;
        const h = Math.min(26, Math.abs(b - a) * 0.9);
        return (
          <g key={`j${i}`}>
            <path d={`M ${a} ${y - 3} Q ${m} ${y - h} ${b} ${y - 3}`} fill="none" stroke={arcColor} strokeWidth="2.2" />
            <path d={`M ${b - dir * 4} ${y - 9} L ${b} ${y - 3} L ${b - dir * 6} ${y - 3}`} fill="none" stroke={arcColor} strokeWidth="2" strokeLinejoin="round" />
          </g>
        );
      })}
      {jumps > 0 && !showEnd && (
        <text x={X(end)} y={y + 19} textAnchor="middle" fontSize={fontSize + 3} fontWeight="900" fill="#dc2626">
          {endLabel ?? '?'}
        </text>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Labor I: Pálcika-háromszögek
// ---------------------------------------------------------------------------

export const TriangleLab: React.FC = () => {
  const [target, setTarget] = useState<number>(4);
  const [built, setBuilt] = useState<number>(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const newTask = () => {
    let t = rnd(2, 10);
    while (t === target) t = rnd(2, 10);
    setTarget(t);
    setBuilt(0);
    setChoice(null);
    setMsg(null);
  };

  const sumText = built === 0 ? '0' : Array.from({ length: built }, () => '3').join(' + ');

  const check = () => {
    if (built !== target) {
      setMsg({
        ok: false,
        text: built < target ? `Most ${built} háromszög van. ${target} kell! Rakj még!` : `Most ${built} háromszög van. Csak ${target} kell! Vegyél el!`
      });
      return;
    }
    if (choice === null) {
      setMsg({ ok: false, text: 'Jó a kép! Most válaszd ki, hány pálcika kell!' });
      return;
    }
    if (choice !== target * 3) {
      setMsg({ ok: false, text: `Minden háromszög 3 pálcika. Számolj hármasával: ${sumText}.` });
      return;
    }
    setMsg({ ok: true, text: `Ügyes! ${sumText} = ${target * 3}, vagyis ${target} · 3 = ${target * 3}.` });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        Rakj ki <strong className="text-2xl font-black">{target}</strong> háromszöget!
        <div className="text-xl sm:text-2xl font-black mt-1">{target} · 3 = ?</div>
      </div>

      <svg viewBox="0 0 340 110" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
        <rect x="1" y="1" width="338" height="108" rx="12" fill="#fff7ed" stroke="#fed7aa" />
        {Array.from({ length: built }, (_, i) => (
          <StickTrianglePart key={i} x={14 + (i % 5) * 64} y={8 + Math.floor(i / 5) * 50} s={42} w={4.5} />
        ))}
        {built === 0 && (
          <text x="170" y="60" textAnchor="middle" fontSize="14" fill="#9a3412">
            Nyomd meg: + 1 háromszög
          </text>
        )}
      </svg>

      <div className="text-center font-mono font-black text-base sm:text-lg text-slate-800 dark:text-slate-100 break-words">{sumText}</div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setBuilt((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-orange-100 text-orange-900 font-bold text-sm min-h-[48px]"
        >
          − 1 háromszög
        </button>
        <span className="px-3 py-2 font-black text-lg text-slate-700 dark:text-slate-200">{built}</span>
        <button
          type="button"
          onClick={() => {
            setBuilt((b) => Math.min(10, b + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-sm min-h-[48px]"
        >
          + 1 háromszög
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-center text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300">Hány pálcika kell?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[3, 6, 9, 12, 15, 18, 21, 24, 27, 30].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setChoice(n);
                setMsg(null);
              }}
              className={`w-12 h-12 rounded-xl font-black text-base border-2 transition-all ${
                choice === n
                  ? 'bg-orange-500 text-white border-orange-700 scale-105'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 pt-1">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-sm font-bold min-h-[48px]">
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

// ---------------------------------------------------------------------------
// Labor II: Hármas ugrások a számegyenesen
// ---------------------------------------------------------------------------

interface JumpTask {
  mode: 'times' | 'target';
  n: number;
}

export const JumpLab3: React.FC = () => {
  const [task, setTask] = useState<JumpTask>({ mode: 'times', n: 5 });
  const [jumps, setJumps] = useState<number>(0);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const pos = jumps * 3;

  const newTask = () => {
    let n = rnd(2, 10);
    while (n === task.n) n = rnd(2, 10);
    setTask({ mode: Math.random() < 0.5 ? 'times' : 'target', n });
    setJumps(0);
    setMsg(null);
  };

  const check = () => {
    if (task.mode === 'times') {
      if (jumps !== task.n) {
        setMsg({ ok: false, text: `Most ${jumps} ugrásnál tartasz. ${task.n} ugrás kell! Számold az íveket!` });
        return;
      }
      setMsg({ ok: true, text: `Szuper! ${task.n} ugrás, mindegyik 3. Ide értél: ${pos}. Tehát ${task.n} · 3 = ${pos}.` });
    } else {
      const t = task.n * 3;
      if (pos !== t) {
        setMsg({ ok: false, text: pos < t ? `Most itt vagy: ${pos}. A cél (${t}) még messzebb van. Ugorj tovább!` : `Most itt vagy: ${pos}. Ez már több, mint ${t}. Lépj vissza!` });
        return;
      }
      setMsg({ ok: true, text: `Megérkeztél: ${t}! ${jumps} ugrás kellett. Tehát ${jumps} · 3 = ${t}, és □ = ${jumps}.` });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-purple-50 dark:bg-purple-950/50 rounded-xl p-3 text-center text-purple-950 dark:text-purple-100">
        {task.mode === 'times' ? (
          <>
            Ugorj <strong>{szor(task.n)}</strong> hármat! Hova érsz?
            <div className="text-xl sm:text-2xl font-black mt-1">{task.n} · 3 = ?</div>
          </>
        ) : (
          <>
            Ugorj hármasával, amíg ide érsz: <strong>{task.n * 3}</strong>. Hányszor ugrottál?
            <div className="text-xl sm:text-2xl font-black mt-1">□ · 3 = {task.n * 3}</div>
          </>
        )}
      </div>

      <svg viewBox="0 0 270 100" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
        <rect x="1" y="1" width="268" height="98" rx="12" fill="#faf5ff" stroke="#e9d5ff" />
        <JumpLine3Part x0={14} y={66} unit={7.8} jumps={jumps} labelEvery={task.mode === 'times' ? 10 : 3} />
        <circle cx={14 + pos * 7.8} cy={52} r="7" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
        <circle cx={14 + pos * 7.8 - 2.5} cy={50} r="1.4" fill="#fff" />
        <circle cx={14 + pos * 7.8 + 2.5} cy={50} r="1.4" fill="#fff" />
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setJumps((j) => Math.max(0, j - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-black text-base min-h-[48px]"
        >
          ← vissza 3
        </button>
        <div className="px-4 py-2 rounded-xl bg-purple-100 border-2 border-purple-400 text-purple-950 font-black text-base min-h-[48px] flex items-center">
          {jumps} ugrás
        </div>
        <button
          type="button"
          onClick={() => {
            setJumps((j) => Math.min(10, j + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-purple-600 text-white font-black text-base min-h-[48px]"
        >
          ugrás 3 →
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-bold min-h-[48px]">
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
