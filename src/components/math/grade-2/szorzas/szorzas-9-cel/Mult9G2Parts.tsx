import React, { useState } from 'react';

export const MULT9_FONT = 'system-ui, Segoe UI, sans-serif';

export const BOX_COLORS = ['#f97316', '#8b5cf6', '#0ea5e9', '#10b981', '#ec4899', '#eab308', '#6366f1', '#ef4444', '#14b8a6', '#a855f7'];

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Egy kilences doboz: 3 × 3 korong egy lekerekített dobozban. */
export const NineBoxPart: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  question?: boolean;
}> = ({ x, y, size = 36, color = '#f97316', question = false }) => {
  const r = size * 0.12;
  const pos = [0.24, 0.5, 0.76];
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={size * 0.18} fill="#ffffff" stroke="#475569" strokeWidth={Math.max(1.5, size * 0.06)} />
      {question ? (
        <text x={x + size / 2} y={y + size * 0.68} textAnchor="middle" fontSize={size * 0.55} fontWeight="bold" fill="#dc2626" fontFamily={MULT9_FONT}>
          ?
        </text>
      ) : (
        pos.flatMap((dy, row) =>
          pos.map((dx, col) => (
            <circle key={`${row}-${col}`} cx={x + dx * size} cy={y + dy * size} r={r} fill={color} stroke="#1e293b" strokeWidth={Math.max(0.8, size * 0.025)} />
          ))
        )
      )}
    </g>
  );
};

/** Számegyenes 0-tól max-ig (tízesenként felirattal, ötösenként kis osztással), `step`-es ugrásokkal. */
export const JumpLinePart: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  max?: number;
  jumps?: number;
  step?: number;
  color?: string;
  below?: boolean;
  endQuestion?: boolean;
  labelEvery?: number;
  unitTicks?: boolean;
  fontSize?: number;
}> = ({
  x = 20,
  y = 70,
  w = 300,
  max = 90,
  jumps = 0,
  step = 9,
  color = '#ea580c',
  below = false,
  endQuestion = false,
  labelEvery = 10,
  unitTicks = false,
  fontSize = 12
}) => {
  const u = w / max;
  const ticks = Array.from({ length: max + 1 }, (_, i) => i).filter((i) => unitTicks || i % 5 === 0);
  return (
    <g>
      <line x1={x - 4} y1={y} x2={x + w + 10} y2={y} stroke="#334155" strokeWidth="2.5" />
      <polygon points={`${x + w + 16},${y} ${x + w + 8},${y - 4} ${x + w + 8},${y + 4}`} fill="#334155" />
      {ticks.map((i) => {
        const major = i % labelEvery === 0;
        const mid = labelEvery === 10 && i % 5 === 0;
        const t = major ? 7 : mid ? 5 : 3;
        return <line key={i} x1={x + i * u} y1={y - t} x2={x + i * u} y2={y + t} stroke="#334155" strokeWidth={major ? 2 : 1} />;
      })}
      {Array.from({ length: Math.floor(max / labelEvery) + 1 }, (_, i) => (
        <text key={i} x={x + i * labelEvery * u} y={y + (below ? -12 : 22)} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill="#334155" fontFamily={MULT9_FONT}>
          {i * labelEvery}
        </text>
      ))}
      {Array.from({ length: jumps }, (_, i) => {
        const x1 = x + i * step * u;
        const x2 = x + (i + 1) * step * u;
        const mid = (x1 + x2) / 2;
        const h = below ? 18 : -22;
        return (
          <path key={i} d={`M ${x1} ${y + (below ? 3 : -3)} Q ${mid} ${y + h * 1.6} ${x2} ${y + (below ? 3 : -3)}`} fill="none" stroke={color} strokeWidth="2.5" />
        );
      })}
      {endQuestion && jumps > 0 && (
        <text x={x + jumps * step * u} y={y + (below ? 40 : -34)} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626" fontFamily={MULT9_FONT}>
          ?
        </text>
      )}
    </g>
  );
};

/** Pontrács: `rows` sor, soronként `cols` korong. A `crossCol` oszlop halványan, áthúzva (10-es trükk). */
export const DotArrayPart: React.FC<{
  x: number;
  y: number;
  rows: number;
  cols?: number;
  gap?: number;
  r?: number;
  colorA?: string;
  crossCol?: number;
  emptyLast?: number;
}> = ({ x, y, rows, cols = 9, gap = 18, r = 6.5, colorA = '#f97316', crossCol, emptyLast = 0 }) => {
  const total = rows * cols;
  return (
    <g>
      {Array.from({ length: total }, (_, i) => {
        const rr = Math.floor(i / cols);
        const cc = i % cols;
        const crossed = crossCol !== undefined && cc === crossCol;
        const empty = i >= total - emptyLast;
        const extra = crossed ? 6 : 0;
        return (
          <circle
            key={i}
            cx={x + cc * gap + extra}
            cy={y + rr * gap}
            r={r}
            fill={crossed || empty ? '#ffffff' : colorA}
            stroke={crossed ? '#94a3b8' : '#1e293b'}
            strokeWidth="1.2"
            strokeDasharray={empty ? '2 2' : undefined}
          />
        );
      })}
      {crossCol !== undefined && (
        <line
          x1={x + crossCol * gap + 6 - r - 3}
          y1={y - r - 3}
          x2={x + crossCol * gap + 6 + r + 3}
          y2={y + (rows - 1) * gap + r + 3}
          stroke="#dc2626"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      )}
    </g>
  );
};

const Feedback: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const MULTIPLES = [9, 18, 27, 36, 45, 54, 63, 72, 81, 90];

// ---------------------------------------------------------------------------
// Labor I: Kilences dobozok
// ---------------------------------------------------------------------------
export const GroupsLab: React.FC = () => {
  const [target, setTarget] = useState<number>(4);
  const [boxes, setBoxes] = useState<number>(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const newTask = () => {
    let t = rnd(2, 10);
    while (t === target) t = rnd(2, 10);
    setTarget(t);
    setBoxes(0);
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (boxes !== target) {
      setMsg({
        ok: false,
        text: boxes < target ? `Most ${boxes} doboz van fent. ${target} doboz kell. Tegyél még!` : `Most ${boxes} doboz van fent. Csak ${target} kell. Vegyél el!`
      });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'A dobozok jók! Most válaszd ki, hány golyó van összesen!' });
      return;
    }
    const good = target * 9;
    if (chosen !== good) {
      setMsg({
        ok: false,
        text:
          chosen === good - 9 || chosen === good + 9
            ? 'Majdnem! Egy dobozzal elszámoltad. Számolj kilencesével újra!'
            : 'Számolj kilencesével: 9, 18, 27 … Minden doboz 9 golyó.'
      });
      return;
    }
    setMsg({ ok: true, text: `Szuper! ${target} · 9 = ${good}. ${target} doboz, mindegyikben 9 golyó.` });
  };

  const perRow = 5;
  const size = 46;
  const gapX = 58;
  const rows = Math.max(1, Math.ceil(Math.max(boxes, 1) / perRow));
  const h = 30 + rows * 60;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        Tegyél ki <strong>{target}</strong> dobozt! Minden dobozban 9 golyó van.
        <div className="text-3xl font-black mt-1">{target} · 9 = ?</div>
      </div>

      <svg viewBox={`0 0 320 ${h}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
        <rect x="1" y="1" width="318" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        {boxes === 0 && (
          <text x="160" y={h / 2 + 6} textAnchor="middle" fontSize="15" fill="#64748b">
            Még nincs doboz.
          </text>
        )}
        {Array.from({ length: boxes }, (_, i) => (
          <NineBoxPart key={i} x={20 + (i % perRow) * gapX} y={16 + Math.floor(i / perRow) * 60} size={size} color={BOX_COLORS[i % BOX_COLORS.length]} />
        ))}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setBoxes((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[52px]"
        >
          − 1 doboz
        </button>
        <span className="font-black text-lg text-orange-900 dark:text-orange-200">{boxes} doboz</span>
        <button
          type="button"
          onClick={() => {
            setBoxes((b) => Math.min(10, b + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-base min-h-[52px]"
        >
          + 1 doboz
        </button>
      </div>

      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány golyó van összesen?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {MULTIPLES.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => {
              setChosen(n);
              setMsg(null);
            }}
            className={`w-14 h-14 rounded-xl font-black text-lg border-2 transition-all ${
              chosen === n
                ? 'bg-orange-600 text-white border-orange-800 scale-105'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-base font-bold min-h-[52px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Feedback msg={msg} />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: Tízes trükk (n · 10, aztán vegyél el n-et)
// ---------------------------------------------------------------------------
const makeOptions = (good: number, near: number[]): number[] => {
  const set = new Set<number>([good]);
  near.forEach((v) => {
    if (v > 0 && v <= 100 && set.size < 3) set.add(v);
  });
  return Array.from(set).sort((a, b) => a - b);
};

export const TenTrickLab: React.FC = () => {
  const [n, setN] = useState<number>(6);
  const [step, setStep] = useState<1 | 2>(1);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const newTask = () => {
    let t = rnd(2, 10);
    while (t === n) t = rnd(2, 10);
    setN(t);
    setStep(1);
    setMsg(null);
  };

  const ten = n * 10;
  const nine = n * 9;
  const opts1 = makeOptions(ten, [n + 10, ten + 10, ten - 10]);
  const opts2 = makeOptions(nine, [ten - 1, ten - 10, nine + 9, nine - 9]);

  const pick = (v: number) => {
    if (step === 1) {
      if (v === ten) {
        setStep(2);
        setMsg({ ok: true, text: `Jó! ${n} · 10 = ${ten}. Most minden sorból vegyél el 1 korongot!` });
      } else {
        setMsg({ ok: false, text: `${n} sor van, soronként 10 korong. Számolj tízesével!` });
      }
    } else if (v === nine) {
      setMsg({ ok: true, text: `Remek! ${ten} − ${n} = ${nine}, tehát ${n} · 9 = ${nine}.` });
    } else if (v === ten - 1) {
      setMsg({ ok: false, text: `Nem csak 1-et kell elvenni! Minden sorból 1-et kell elvenni. ${ten} − ${n} = ?` });
    } else if (v === ten - 10) {
      setMsg({ ok: false, text: `Nem 10-et kell elvenni! ${n} sor van, soronként 1: ${ten} − ${n} = ?` });
    } else {
      setMsg({ ok: false, text: `Számold meg a piros vonallal áthúzott korongokat! Ennyit vegyél el!` });
    }
  };

  const gap = n > 7 ? 15 : 18;
  const h = 34 + n * gap;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100">
        A 9 eggyel kevesebb, mint a 10. Számold ki két lépésben!
        <div className="text-3xl font-black mt-1">{n} · 9 = ?</div>
      </div>

      <svg viewBox={`0 0 300 ${h}`} className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
        <rect x="1" y="1" width="298" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <DotArrayPart x={92} y={22} rows={n} cols={10} gap={gap} r={gap * 0.36} colorA="#0ea5e9" crossCol={step === 2 ? 9 : undefined} />
        <text x="18" y={h / 2 + 6} fontSize="16" fontWeight="bold" fill="#334155">
          {n} sor
        </text>
      </svg>

      <div className="text-center text-lg font-black text-slate-800 dark:text-slate-100">
        {step === 1 ? `1. lépés: ${n} · 10 = ?` : `2. lépés: ${ten} − ${n} = ?`}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {(step === 1 ? opts1 : opts2).map((v) => (
          <button
            key={`${step}-${v}`}
            type="button"
            onClick={() => pick(v)}
            className="w-16 h-16 rounded-xl font-black text-xl border-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-sky-300 hover:bg-sky-100"
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Feedback msg={msg} />
    </div>
  );
};
