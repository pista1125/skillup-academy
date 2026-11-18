import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 5. Osztás 6-tal – közös SVG-építőelemek és laborok (2. osztály)
// ---------------------------------------------------------------------------

export const DIV6_FONT = 'system-ui, Segoe UI, sans-serif';

export const DIV6_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

export const BOX_COLORS = ['#fde68a', '#fbcfe8', '#bfdbfe', '#bbf7d0', '#ddd6fe', '#fed7aa', '#a5f3fc', '#fecaca', '#e9d5ff', '#d9f99d'];

/** Tojásdoboz: 2 sor × 3 tojás = 6. */
export const EggBoxPart: React.FC<{ x: number; y: number; w?: number; color?: string; unknown?: boolean }> = ({
  x,
  y,
  w = 40,
  color = '#fde68a',
  unknown = false
}) => {
  const h = w * 0.66;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={w * 0.14} fill={color} stroke="#92400e" strokeWidth="2" />
      {unknown ? (
        <text x={x + w / 2} y={y + h * 0.74} textAnchor="middle" fontSize={h * 0.7} fontWeight="900" fill="#dc2626" fontFamily={DIV6_FONT}>
          ?
        </text>
      ) : (
        Array.from({ length: 6 }, (_, i) => (
          <ellipse
            key={i}
            cx={x + w * (0.2 + 0.3 * (i % 3))}
            cy={y + h * (0.3 + 0.4 * Math.floor(i / 3))}
            rx={w * 0.105}
            ry={h * 0.17}
            fill="#fffbeb"
            stroke="#78350f"
            strokeWidth="1.3"
          />
        ))
      )}
    </g>
  );
};

/** Dobozok sora (`perRow` dobozonként új sor). */
export const EggBoxesPart: React.FC<{ x: number; y: number; groups: number; w?: number; gap?: number; perRow?: number; unknown?: boolean }> = ({
  x,
  y,
  groups,
  w = 40,
  gap = 6,
  perRow = 10,
  unknown = false
}) => {
  const h = w * 0.66;
  return (
    <g>
      {Array.from({ length: groups }, (_, i) => (
        <EggBoxPart
          key={i}
          x={x + (i % perRow) * (w + gap)}
          y={y + Math.floor(i / perRow) * (h + gap)}
          w={w}
          color={BOX_COLORS[i % BOX_COLORS.length]}
          unknown={unknown}
        />
      ))}
    </g>
  );
};

/** Laza tojások / korongok rácsban. */
export const LooseEggsPart: React.FC<{ x: number; y: number; n: number; perRow?: number; step?: number; r?: number; color?: string }> = ({
  x,
  y,
  n,
  perRow = 10,
  step = 14,
  r = 5.2,
  color = '#fffbeb'
}) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <ellipse
        key={i}
        cx={x + (i % perRow) * step}
        cy={y + Math.floor(i / perRow) * step}
        rx={r * 0.85}
        ry={r}
        fill={color}
        stroke="#78350f"
        strokeWidth="1.2"
      />
    ))}
  </g>
);

/** Tányér, rajta `items` süti (max. 10, 2 sorban), vagy „?”. */
export const PlatePart: React.FC<{ cx: number; cy: number; r?: number; items?: number; q?: boolean; color?: string }> = ({
  cx,
  cy,
  r = 24,
  items = 0,
  q = false,
  color = '#e0f2fe'
}) => {
  const perRow = 5;
  const step = r * 0.34;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={r} ry={r * 0.72} fill={color} stroke="#0369a1" strokeWidth="2" />
      <ellipse cx={cx} cy={cy} rx={r * 0.72} ry={r * 0.5} fill="none" stroke="#7dd3fc" strokeWidth="1.2" />
      {q ? (
        <text x={cx} y={cy + 7} textAnchor="middle" fontSize={r * 0.8} fontWeight="900" fill="#dc2626" fontFamily={DIV6_FONT}>
          ?
        </text>
      ) : (
        Array.from({ length: Math.min(items, 10) }, (_, i) => {
          const row = Math.floor(i / perRow);
          const inRow = Math.min(perRow, items - row * perRow);
          const rows = Math.ceil(Math.min(items, 10) / perRow);
          const c = i % perRow;
          return (
            <circle
              key={i}
              cx={cx + (c - (inRow - 1) / 2) * step}
              cy={cy + (row - (rows - 1) / 2) * step}
              r={r * 0.14}
              fill="#d97706"
              stroke="#78350f"
              strokeWidth="1"
            />
          );
        })
      )}
    </g>
  );
};

/** 6 tányér két sorban (3 + 3). */
export const SixPlatesPart: React.FC<{ x?: number; y?: number; items?: number; q?: boolean; r?: number; dx?: number; dy?: number }> = ({
  x = 60,
  y = 30,
  items = 0,
  q = false,
  r = 24,
  dx = 70,
  dy = 50
}) => {
  const colors = ['#e0f2fe', '#fce7f3', '#dcfce7', '#fef9c3', '#ede9fe', '#ffedd5'];
  return (
    <g>
      {Array.from({ length: 6 }, (_, i) => (
        <PlatePart key={i} cx={x + (i % 3) * dx} cy={y + Math.floor(i / 3) * dy} r={r} items={items} q={q} color={colors[i]} />
      ))}
    </g>
  );
};

/** Dobókocka 6-ossal felül. */
export const DicePart: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 30, color = '#ffffff' }) => (
  <g>
    <rect x={x} y={y} width={s} height={s} rx={s * 0.18} fill={color} stroke="#1e293b" strokeWidth="2" />
    {[
      [0.3, 0.22],
      [0.7, 0.22],
      [0.3, 0.5],
      [0.7, 0.5],
      [0.3, 0.78],
      [0.7, 0.78]
    ].map(([px, py], i) => (
      <circle key={i} cx={x + px * s} cy={y + py * s} r={s * 0.085} fill="#1e293b" />
    ))}
  </g>
);

/** Számegyenes 0–60 hatos ugrásokkal. */
export const JumpLinePart: React.FC<{ x0?: number; y?: number; unit?: number; jumps: number }> = ({ x0 = 12, y = 60, unit = 3.8, jumps }) => {
  const X = (v: number) => x0 + v * unit;
  return (
    <g fontFamily={DIV6_FONT}>
      <line x1={X(0) - 4} y1={y} x2={X(60) + 8} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${X(60) + 8} ${y - 4} L ${X(60) + 14} ${y} L ${X(60) + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: 31 }, (_, i) => i * 2).map((v) => (
        <line key={v} x1={X(v)} y1={v % 6 === 0 ? y - 6 : y - 3} x2={X(v)} y2={v % 6 === 0 ? y + 6 : y + 3} stroke="#334155" strokeWidth={v % 6 === 0 ? 1.6 : 0.9} />
      ))}
      {Array.from({ length: 11 }, (_, i) => i * 6).map((v) => (
        <text key={`t${v}`} x={X(v)} y={y + 17} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#475569">
          {v}
        </text>
      ))}
      {Array.from({ length: jumps }, (_, j) => {
        const a = X(j * 6);
        const b = X(j * 6 + 6);
        const col = DIV6_COLORS[j % DIV6_COLORS.length];
        return (
          <g key={j}>
            <path d={`M ${a} ${y - 3} Q ${(a + b) / 2} ${y - 26} ${b} ${y - 3}`} fill="none" stroke={col} strokeWidth="2.2" />
            <path d={`M ${b - 4} ${y - 8} L ${b} ${y - 3} L ${b - 6} ${y - 2}`} fill="none" stroke={col} strokeWidth="1.8" />
          </g>
        );
      })}
      <circle cx={X(0)} cy={y} r="3.5" fill="#0f172a" />
      {jumps > 0 && <circle cx={X(jumps * 6)} cy={y} r="4.5" fill="#dc2626" />}
    </g>
  );
};

/** Két szám, felül zöld „hatszorosa”, alul piros „hatoda” nyíllal. */
export const ArrowPairPart: React.FC<{ x?: number; y?: number; small: string; big: string; w?: number }> = ({ x = 50, y = 34, small, big, w = 160 }) => {
  const box = (bx: number, t: string) => (
    <g>
      <rect x={bx} y={y} width="40" height="34" rx="8" fill={t === '?' ? '#fee2e2' : '#fff'} stroke={t === '?' ? '#dc2626' : '#be123c'} strokeWidth="2.2" />
      <text x={bx + 20} y={y + 24} textAnchor="middle" fontSize="18" fontWeight="900" fill={t === '?' ? '#dc2626' : '#0f172a'} fontFamily={DIV6_FONT}>
        {t}
      </text>
    </g>
  );
  const x2 = x + w - 40;
  return (
    <g fontFamily={DIV6_FONT}>
      {box(x, small)}
      {box(x2, big)}
      <path d={`M ${x + 24} ${y - 2} Q ${x + w / 2} ${y - 30} ${x2 + 16} ${y - 2}`} fill="none" stroke="#16a34a" strokeWidth="2.4" />
      <path d={`M ${x2 + 8} ${y - 6} L ${x2 + 16} ${y - 2} L ${x2 + 12} ${y - 11}`} fill="none" stroke="#16a34a" strokeWidth="2.4" />
      <text x={x + w / 2} y={y - 18} textAnchor="middle" fontSize="12" fontWeight="900" fill="#15803d">
        hatszorosa
      </text>
      <path d={`M ${x2 + 16} ${y + 36} Q ${x + w / 2} ${y + 64} ${x + 24} ${y + 36}`} fill="none" stroke="#dc2626" strokeWidth="2.4" />
      <path d={`M ${x + 32} ${y + 40} L ${x + 24} ${y + 36} L ${x + 28} ${y + 45}`} fill="none" stroke="#dc2626" strokeWidth="2.4" />
      <text x={x + w / 2} y={y + 62} textAnchor="middle" fontSize="12" fontWeight="900" fill="#b91c1c">
        hatoda
      </text>
    </g>
  );
};

/** Láncnyíl: a —op1→ b —op2→ c, alatta a teljes művelet. */
export const ChainPart: React.FC<{ x?: number; y?: number; a: string; b: string; c: string; op1: string; op2: string; opAll: string; w?: number }> = ({
  x = 20,
  y = 20,
  a,
  b,
  c,
  op1,
  op2,
  opAll,
  w = 220
}) => {
  const box = 38;
  const xs = [x, x + (w - box) / 2, x + w - box];
  return (
    <g fontFamily={DIV6_FONT}>
      {[a, b, c].map((v, i) => (
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

type Msg = { ok: boolean; text: string } | null;

const MsgBox: React.FC<{ msg: Msg }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const btnBase = 'rounded-xl font-black border-2 transition-all min-h-[48px]';

const choiceCls = (active: boolean, on: string) =>
  `${btnBase} w-12 h-12 text-lg ${active ? `${on} text-white scale-105` : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'}`;

// ---------------------------------------------------------------------------
// Labor I: Dobozolj hatosával! (bennfoglalás, maradékkal)
// ---------------------------------------------------------------------------
const newPackN = (old: number) => {
  for (;;) {
    const v = Math.random() < 0.5 ? 6 * rnd(1, 10) : rnd(7, 59);
    if (v !== old) return v;
  }
};

export const PackLab6: React.FC = () => {
  const [n, setN] = useState(26);
  const [boxes, setBoxes] = useState(0);
  const [count, setCount] = useState<number | null>(null);
  const [rest, setRest] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const pile = n - 6 * boxes;
  const q = Math.floor(n / 6);
  const m = n % 6;

  const reset = () => {
    setN((o) => newPackN(o));
    setBoxes(0);
    setCount(null);
    setRest(null);
    setMsg(null);
  };

  const check = () => {
    if (pile >= 6) {
      setMsg({ ok: false, text: `Még ${pile} tojás van kint. Ebből még megtelik egy doboz!` });
      return;
    }
    if (count === null || rest === null) {
      setMsg({ ok: false, text: 'Kész a dobozolás! Válaszd ki, hány doboz lett, és hány tojás maradt kint!' });
      return;
    }
    if (count !== q) {
      setMsg({ ok: false, text: count === n ? 'Ez az összes tojás. Számold meg a dobozokat!' : 'Számold meg újra a dobozokat!' });
      return;
    }
    if (rest !== m) {
      setMsg({ ok: false, text: m === 0 ? 'Nézd meg: nem maradt kint egy tojás sem.' : `Számold meg a kint maradt tojásokat!` });
      return;
    }
    setMsg({
      ok: true,
      text:
        m === 0
          ? `Szuper! ${n} : 6 = ${q}, mert ${q} · 6 = ${n}. Nem maradt semmi.`
          : `Ügyes! ${q} doboz lett, és maradt ${m}. ${n} = ${q} · 6 + ${m}.`
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
        Tegyél 6-6 tojást egy dobozba!{' '}
        <span className="text-3xl font-black align-middle ml-2">{n} tojás</span>
      </div>
      <svg viewBox="0 0 260 170" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
        <rect x="1" y="1" width="258" height="168" rx="12" fill="#fffbeb" stroke="#fde68a" />
        <rect x="10" y="8" width="150" height="92" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
        <LooseEggsPart x={22} y={20} n={pile} perRow={10} step={14} />
        <text x="210" y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">kint:</text>
        <text x="210" y="64" textAnchor="middle" fontSize="24" fontWeight="900" fill="#92400e">{pile}</text>
        <EggBoxesPart x={14} y={108} groups={boxes} w={40} gap={8} perRow={5} />
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setBoxes((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className={`${btnBase} px-4 bg-slate-100 text-slate-800 border-slate-300 text-base`}
        >
          Vissza
        </button>
        <button
          type="button"
          disabled={pile < 6}
          onClick={() => {
            setBoxes((b) => b + 1);
            setMsg(null);
          }}
          className={`${btnBase} px-4 bg-amber-500 disabled:bg-slate-300 disabled:border-slate-300 text-white border-amber-700 text-base`}
        >
          Tölts meg egy dobozt!
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány doboz lett?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <button key={v} type="button" onClick={() => { setCount(v); setMsg(null); }} className={choiceCls(count === v, 'bg-amber-500 border-amber-700')}>
            {v}
          </button>
        ))}
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány tojás maradt kint?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[0, 1, 2, 3, 4, 5].map((v) => (
          <button key={v} type="button" onClick={() => { setRest(v); setMsg(null); }} className={choiceCls(rest === v, 'bg-rose-500 border-rose-700')}>
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
// Labor II: Szétosztás 6 tányérra (egyenlő részekre osztás)
// ---------------------------------------------------------------------------
export const ShareLab6: React.FC = () => {
  const [k, setK] = useState(3);
  const [rounds, setRounds] = useState(0);
  const [each, setEach] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const n = 6 * k;
  const left = n - 6 * rounds;

  const reset = () => {
    setK((o) => {
      for (;;) {
        const v = rnd(2, 10);
        if (v !== o) return v;
      }
    });
    setRounds(0);
    setEach(null);
    setMsg(null);
  };

  const check = () => {
    if (left > 0) {
      setMsg({ ok: false, text: `Még ${left} süti van a tálcán. Oszd tovább!` });
      return;
    }
    if (each === null) {
      setMsg({ ok: false, text: 'Elfogyott a tálca! Most válaszd ki, mennyi jutott egy tányérra!' });
      return;
    }
    if (each !== k) {
      setMsg({
        ok: false,
        text: each === n - 6 ? `Ez ${n} − 6 lenne. Osztásnál azt nézd, mennyi van EGY tányéron!` : 'Számold meg a sütiket egy tányéron!'
      });
      return;
    }
    setMsg({ ok: true, text: `Szuper! ${n} : 6 = ${k}, mert ${k} · 6 = ${n}. A ${n} hatoda ${k}.` });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100">
        Oszd szét egyenlően 6 tányérra:{' '}
        <span className="text-3xl font-black align-middle ml-2">{n} süti</span>
      </div>
      <svg viewBox="0 0 260 220" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
        <rect x="1" y="1" width="258" height="218" rx="12" fill="#f0f9ff" stroke="#bae6fd" />
        <rect x="40" y="8" width="180" height="92" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
        {Array.from({ length: left }, (_, i) => (
          <circle key={i} cx={63 + (i % 10) * 15} cy={21 + Math.floor(i / 10) * 13.5} r="5.5" fill="#d97706" stroke="#78350f" strokeWidth="1" />
        ))}
        <SixPlatesPart x={60} y={128} items={rounds} r={28} dx={70} dy={60} />
      </svg>
      <div className="flex justify-center">
        <button
          type="button"
          disabled={left <= 0}
          onClick={() => {
            setRounds((r) => r + 1);
            setMsg(null);
          }}
          className="px-5 py-2.5 rounded-xl bg-sky-600 disabled:bg-slate-300 text-white text-base font-bold min-h-[48px]"
        >
          Tegyél 1-1 sütit minden tányérra!
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Egy tányérra jutott:</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
          <button key={v} type="button" onClick={() => { setEach(v); setMsg(null); }} className={choiceCls(each === v, 'bg-sky-600 border-sky-800')}>
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-base font-bold min-h-[48px]">
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
