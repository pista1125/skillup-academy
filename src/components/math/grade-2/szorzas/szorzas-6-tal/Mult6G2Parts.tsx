import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 5. Szorzás 6-tal – közös SVG-építőelemek és laborok (2. osztály)
// ---------------------------------------------------------------------------

export const MULT6_FONT = 'system-ui, Segoe UI, sans-serif';

export const MULT6_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

const BOX_COLORS = ['#fde68a', '#fbcfe8', '#bfdbfe', '#bbf7d0', '#ddd6fe', '#fed7aa', '#a5f3fc', '#fecaca', '#e9d5ff', '#d9f99d'];

/**
 * Tojásdoboz: 2 sor × 3 tojás = 6. `eggs` < 6 esetén üres helyek látszanak.
 * `split` = a felső sor kék, az alsó piros (két hármas sor).
 */
export const EggBoxPart: React.FC<{
  x: number;
  y: number;
  w?: number;
  eggs?: number;
  unknown?: boolean;
  color?: string;
  split?: boolean;
}> = ({ x, y, w = 40, eggs = 6, unknown = false, color = '#fde68a', split = false }) => {
  const h = w * 0.66;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={w * 0.14} fill={color} stroke="#92400e" strokeWidth="2" />
      {unknown ? (
        <text x={x + w / 2} y={y + h * 0.74} textAnchor="middle" fontSize={h * 0.7} fontWeight="900" fill="#dc2626" fontFamily={MULT6_FONT}>
          ?
        </text>
      ) : (
        Array.from({ length: 6 }, (_, i) => {
          const r = Math.floor(i / 3);
          const c = i % 3;
          const cx = x + w * (0.2 + 0.3 * c);
          const cy = y + h * (0.3 + 0.4 * r);
          if (i >= eggs) {
            return <circle key={i} cx={cx} cy={cy} r={w * 0.08} fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" />;
          }
          const fill = split ? (r === 0 ? '#93c5fd' : '#fca5a5') : '#fffbeb';
          return <ellipse key={i} cx={cx} cy={cy} rx={w * 0.105} ry={h * 0.17} fill={fill} stroke="#78350f" strokeWidth="1.3" />;
        })
      )}
    </g>
  );
};

/** Több tojásdoboz sorban (vagy `perRow` szerint több sorban). */
export const EggBoxesPart: React.FC<{
  x: number;
  y: number;
  groups: number;
  w?: number;
  gap?: number;
  perRow?: number;
  split?: boolean;
  unknown?: boolean;
}> = ({ x, y, groups, w = 40, gap = 6, perRow = 10, split = false, unknown = false }) => {
  const h = w * 0.66;
  return (
    <g>
      {Array.from({ length: groups }, (_, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        return (
          <EggBoxPart
            key={i}
            x={x + c * (w + gap)}
            y={y + r * (h + gap)}
            w={w}
            color={BOX_COLORS[i % BOX_COLORS.length]}
            split={split}
            unknown={unknown}
          />
        );
      })}
    </g>
  );
};

/** Dobókocka a 6-os (vagy más) oldalával felül. */
export const DicePart: React.FC<{ x: number; y: number; s?: number; pips?: number; color?: string }> = ({ x, y, s = 30, pips = 6, color = '#ffffff' }) => {
  const P: Record<number, [number, number][]> = {
    1: [[0.5, 0.5]],
    2: [[0.27, 0.27], [0.73, 0.73]],
    3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
    4: [[0.28, 0.28], [0.72, 0.28], [0.28, 0.72], [0.72, 0.72]],
    5: [[0.27, 0.27], [0.73, 0.27], [0.5, 0.5], [0.27, 0.73], [0.73, 0.73]],
    6: [[0.3, 0.22], [0.7, 0.22], [0.3, 0.5], [0.7, 0.5], [0.3, 0.78], [0.7, 0.78]]
  };
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.18} fill={color} stroke="#1e293b" strokeWidth="2" />
      {(P[pips] ?? P[6]).map(([px, py], i) => (
        <circle key={i} cx={x + px * s} cy={y + py * s} r={s * 0.085} fill="#1e293b" />
      ))}
    </g>
  );
};

/** Rácspontok: `rows` sor, `cols` oszlop. */
export const ArrayPart: React.FC<{
  x: number;
  y: number;
  rows: number;
  cols: number;
  step?: number;
  r?: number;
  rowColors?: string[];
}> = ({ x, y, rows, cols, step = 18, r = 6.5, rowColors = ['#ef4444', '#3b82f6'] }) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const rr = Math.floor(i / cols);
      const c = i % cols;
      return <circle key={i} cx={x + c * step} cy={y + rr * step} r={r} fill={rowColors[rr % rowColors.length]} stroke="#1e293b" strokeWidth="1.1" />;
    })}
  </g>
);

/** Méhecske (6 lábbal). */
export const BeePart: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <line x1={10 + i * 7} y1={20} x2={6 + i * 8} y2={29} stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
        <line x1={12 + i * 7} y1={20} x2={14 + i * 8} y2={29} stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    ))}
    <ellipse cx="14" cy="5" rx="7" ry="5" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.2" />
    <ellipse cx="24" cy="5" rx="7" ry="5" fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.2" />
    <ellipse cx="19" cy="15" rx="15" ry="8" fill="#facc15" stroke="#1e293b" strokeWidth="1.8" />
    <line x1="15" y1="8" x2="15" y2="22" stroke="#1e293b" strokeWidth="2.6" />
    <line x1="22" y1="8" x2="22" y2="22" stroke="#1e293b" strokeWidth="2.6" />
    <circle cx="33" cy="14" r="2" fill="#1e293b" />
  </g>
);

/**
 * Számegyenes `size` hosszú ugrásokkal (alapból 0–60, hatos ugrások).
 */
export const JumpLinePart: React.FC<{
  x0?: number;
  y?: number;
  unit?: number;
  max?: number;
  jumps: number;
  size?: number;
  labelEvery?: number;
  showEnd?: boolean;
  endLabel?: string;
}> = ({ x0 = 14, y = 70, unit = 3.9, max = 60, jumps, size = 6, labelEvery = 6, showEnd = true, endLabel }) => {
  const X = (v: number) => x0 + v * unit;
  const end = jumps * size;
  return (
    <g fontFamily={MULT6_FONT}>
      <line x1={X(0) - 4} y1={y} x2={X(max) + 8} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${X(max) + 8} ${y - 4} L ${X(max) + 14} ${y} L ${X(max) + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: max + 1 }, (_, v) => v)
        .filter((v) => v % 2 === 0 || unit >= 6)
        .map((v) => (
          <line
            key={v}
            x1={X(v)}
            y1={v % labelEvery === 0 ? y - 6 : y - 3}
            x2={X(v)}
            y2={v % labelEvery === 0 ? y + 6 : y + 3}
            stroke="#334155"
            strokeWidth={v % labelEvery === 0 ? 1.6 : 0.9}
          />
        ))}
      {Array.from({ length: max + 1 }, (_, v) => v)
        .filter((v) => v % labelEvery === 0)
        .map((v) => (
          <text key={`t${v}`} x={X(v)} y={y + 17} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
            {!showEnd && v === end && jumps > 0 ? '' : v}
          </text>
        ))}
      {Array.from({ length: jumps }, (_, j) => {
        const a = j * size;
        const b = a + size;
        const col = MULT6_COLORS[j % MULT6_COLORS.length];
        return (
          <g key={j}>
            <path d={`M ${X(a)} ${y - 3} Q ${(X(a) + X(b)) / 2} ${y - 26} ${X(b)} ${y - 3}`} fill="none" stroke={col} strokeWidth="2.2" />
            <path d={`M ${X(b) - 4} ${y - 8} L ${X(b)} ${y - 3} L ${X(b) - 6} ${y - 2}`} fill="none" stroke={col} strokeWidth="1.8" />
          </g>
        );
      })}
      <circle cx={X(0)} cy={y} r="3.5" fill="#0f172a" />
      {jumps > 0 && <circle cx={X(end)} cy={y} r="4.5" fill="#dc2626" />}
      {!showEnd && jumps > 0 && (
        <text x={X(end)} y={y + 18} textAnchor="middle" fontSize="12" fontWeight="900" fill="#dc2626">
          {endLabel ?? '?'}
        </text>
      )}
    </g>
  );
};

/** Láncnyíl: a —op1→ b —op2→ c, alatta egy nagy nyíl a teljes művelettel. */
export const ChainPart: React.FC<{
  x?: number;
  y?: number;
  a: string;
  b: string;
  c: string;
  op1: string;
  op2: string;
  opAll: string;
  w?: number;
}> = ({ x = 20, y = 20, a, b, c, op1, op2, opAll, w = 220 }) => {
  const box = 38;
  const xs = [x, x + (w - box) / 2, x + w - box];
  const vals = [a, b, c];
  return (
    <g fontFamily={MULT6_FONT}>
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={xs[i]} y={y} width={box} height={30} rx="7" fill={v === '?' ? '#fee2e2' : '#ffffff'} stroke={v === '?' ? '#dc2626' : '#be123c'} strokeWidth="2" />
          <text x={xs[i] + box / 2} y={y + 21} textAnchor="middle" fontSize="16" fontWeight="900" fill={v === '?' ? '#dc2626' : '#0f172a'}>
            {v}
          </text>
        </g>
      ))}
      {[0, 1].map((i) => {
        const x1 = xs[i] + box + 3;
        const x2 = xs[i + 1] - 3;
        return (
          <g key={i}>
            <line x1={x1} y1={y + 15} x2={x2 - 4} y2={y + 15} stroke="#334155" strokeWidth="2" />
            <path d={`M ${x2 - 6} ${y + 10} L ${x2} ${y + 15} L ${x2 - 6} ${y + 20} Z`} fill="#334155" />
            <text x={(x1 + x2) / 2} y={y + 9} textAnchor="middle" fontSize="13" fontWeight="900" fill="#1d4ed8">
              {i === 0 ? op1 : op2}
            </text>
          </g>
        );
      })}
      <path d={`M ${xs[0] + box / 2} ${y + 32} L ${xs[0] + box / 2} ${y + 48} L ${xs[2] + box / 2} ${y + 48} L ${xs[2] + box / 2} ${y + 36}`} fill="none" stroke="#be123c" strokeWidth="2" />
      <path d={`M ${xs[2] + box / 2 - 5} ${y + 38} L ${xs[2] + box / 2} ${y + 32} L ${xs[2] + box / 2 + 5} ${y + 38} Z`} fill="#be123c" />
      <text x={x + w / 2} y={y + 62} textAnchor="middle" fontSize="13" fontWeight="900" fill="#be123c">
        {opAll}
      </text>
    </g>
  );
};

// ===========================================================================
// Interaktív laborok
// ===========================================================================

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const pickNew = (old: number, a: number, b: number) => {
  for (;;) {
    const v = rnd(a, b);
    if (v !== old) return v;
  }
};

type Msg = { ok: boolean; text: string } | null;

const MsgBox: React.FC<{ msg: Msg }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const btnBase = 'rounded-xl font-black border-2 transition-all min-h-[48px]';

const choiceCls = (active: boolean, on: string) =>
  `${btnBase} w-12 h-12 text-lg ${active ? on : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'}`;

const TABLE6 = [6, 12, 18, 24, 30, 36, 42, 48, 54, 60];

// ---------------------------------------------------------------------------
// Labor I: Tojásdoboz-töltő — n · 6 kirakása dobozokkal
// ---------------------------------------------------------------------------
export const EggBoxLab: React.FC = () => {
  const [n, setN] = useState(4);
  const [boxes, setBoxes] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const reset = () => {
    setN((o) => pickNew(o, 2, 10));
    setBoxes(0);
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (boxes !== n) {
      setMsg({
        ok: false,
        text:
          boxes === 6 && n !== 6
            ? `Most 6 doboz van. A ${n} · 6-ban az első szám mondja meg, hány doboz kell: ${n} doboz!`
            : `Most ${boxes} doboz van. ${n} · 6 azt jelenti: ${n} doboz, mindegyikben 6 tojás.`
      });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'A dobozok jók! Most számold meg a tojásokat, és válaszd ki az eredményt!' });
      return;
    }
    if (chosen !== n * 6) {
      setMsg({
        ok: false,
        text:
          chosen === n + 6
            ? `Ez ${n} + 6 lenne. Szorzásnál ${n}-szor adjuk össze a 6-ot! Számolj hatosával!`
            : `Számolj hatosával a dobozokon: 6, 12, 18 … Hány tojás van összesen?`
      });
      return;
    }
    setMsg({ ok: true, text: `Szuper! ${n} · 6 = ${n * 6}. Ennyi tojás van ${n} dobozban.` });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
        Rakd ki tojásdobozokkal:{' '}
        <span className="text-3xl font-black align-middle ml-2">{n} · 6 = ?</span>
      </div>
      <svg viewBox="0 0 250 82" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
        <rect x="1" y="1" width="248" height="80" rx="10" fill="#fffbeb" stroke="#fde68a" />
        {Array.from({ length: 10 }, (_, i) => {
          const r = Math.floor(i / 5);
          const c = i % 5;
          const bx = 12 + c * 46;
          const by = 10 + r * 34;
          return i < boxes ? (
            <EggBoxPart key={i} x={bx} y={by} w={42} color={BOX_COLORS[i]} />
          ) : (
            <rect key={i} x={bx} y={by} width={42} height={27.7} rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 3" />
          );
        })}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setBoxes((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className={`${btnBase} px-4 bg-slate-100 text-slate-800 border-slate-300 text-base`}
        >
          − 1 doboz
        </button>
        <span className="text-lg font-black text-slate-800 dark:text-slate-100">{boxes} doboz</span>
        <button
          type="button"
          onClick={() => {
            setBoxes((b) => Math.min(10, b + 1));
            setMsg(null);
          }}
          className={`${btnBase} px-4 bg-amber-500 text-white border-amber-700 text-base`}
        >
          + 1 doboz
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány tojás van összesen?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {TABLE6.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setChosen(v);
              setMsg(null);
            }}
            className={choiceCls(chosen === v, 'bg-amber-500 text-white border-amber-700 scale-105')}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-base font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={reset} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: Duplázó — a 3-as tábla kétszerese a 6-os tábla
// ---------------------------------------------------------------------------
const opts3 = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30];

export const DoubleLab: React.FC = () => {
  const [n, setN] = useState(4);
  const [step, setStep] = useState<1 | 2>(1);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const reset = () => {
    setN((o) => pickNew(o, 2, 10));
    setStep(1);
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (chosen === null) {
      setMsg({ ok: false, text: 'Válassz egy számot!' });
      return;
    }
    if (step === 1) {
      if (chosen !== n * 3) {
        setMsg({
          ok: false,
          text: chosen === n + 3 ? `Ez ${n} + 3 lenne. Számolj hármasával: 3, 6, 9 …` : `Nézd a kék tojásokat! ${n} doboz, mindegyikben 3 kék.`
        });
        return;
      }
      setMsg({ ok: true, text: `Jó! ${n} · 3 = ${n * 3}. Most duplázd meg!` });
      setStep(2);
      setChosen(null);
      return;
    }
    if (chosen !== n * 6) {
      setMsg({
        ok: false,
        text:
          chosen === n * 3 + 3
            ? `Nem 3-at kell hozzáadni! Ugyanannyi piros tojás van, mint kék: ${n * 3} + ${n * 3}.`
            : `A piros tojás is ${n * 3}. Mennyi ${n * 3} + ${n * 3}?`
      });
      return;
    }
    setMsg({ ok: true, text: `Ügyes! ${n * 3} + ${n * 3} = ${n * 6}, tehát ${n} · 6 = ${n * 6}.` });
  };

  const options = step === 1 ? opts3 : TABLE6;
  const perRow = n > 5 ? 5 : n;
  const w = 42;
  const rows = Math.ceil(n / perRow);
  const svgH = 18 + rows * 34;
  const x0 = (250 - (perRow * (w + 4) - 4)) / 2;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-rose-50 dark:bg-rose-950/50 rounded-xl p-3 text-center text-rose-950 dark:text-rose-100">
        {step === 1 ? 'Először a kék tojások:' : 'Most az összes tojás:'}
        <span className="text-3xl font-black align-middle ml-2">{step === 1 ? `${n} · 3 = ?` : `${n} · 6 = ?`}</span>
      </div>
      <svg viewBox={`0 0 250 ${svgH}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
        <rect x="1" y="1" width="248" height={svgH - 2} rx="10" fill="#fff1f2" stroke="#fecdd3" />
        <EggBoxesPart x={x0} y={10} groups={n} w={w} gap={4} perRow={perRow} split />
      </svg>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">
        Minden dobozban 3 kék és 3 piros tojás van.
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {options.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setChosen(v);
              setMsg(null);
            }}
            className={choiceCls(chosen === v, 'bg-rose-500 text-white border-rose-700 scale-105')}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-base font-bold min-h-[48px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={reset} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
