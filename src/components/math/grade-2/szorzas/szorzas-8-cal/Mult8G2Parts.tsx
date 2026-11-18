import React, { useState } from 'react';

export const MULT8_FONT = 'system-ui, Segoe UI, sans-serif';

export const BOX_COLORS = ['#6366f1', '#f97316', '#0ea5e9', '#10b981', '#ec4899', '#eab308', '#8b5cf6', '#ef4444', '#14b8a6', '#a855f7'];

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Nyolcas doboz: 2 sor × 4 golyó egy fekvő dobozban. Szélesség = 1.8 × magasság. */
export const EightBoxPart: React.FC<{
  x: number;
  y: number;
  h?: number;
  color?: string;
  question?: boolean;
}> = ({ x, y, h = 30, color = '#6366f1', question = false }) => {
  const w = h * 1.8;
  const r = h * 0.15;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={h * 0.2} fill="#ffffff" stroke="#475569" strokeWidth={Math.max(1.5, h * 0.07)} />
      {question ? (
        <text x={x + w / 2} y={y + h * 0.72} textAnchor="middle" fontSize={h * 0.62} fontWeight="bold" fill="#dc2626" fontFamily={MULT8_FONT}>
          ?
        </text>
      ) : (
        Array.from({ length: 8 }, (_, i) => (
          <circle
            key={i}
            cx={x + w * (0.16 + 0.227 * (i % 4))}
            cy={y + h * (i < 4 ? 0.3 : 0.7)}
            r={r}
            fill={color}
            stroke="#1e293b"
            strokeWidth={Math.max(0.8, h * 0.03)}
          />
        ))
      )}
    </g>
  );
};

/** Pók 8 lábbal (4 jobbra, 4 balra). */
export const SpiderPart: React.FC<{ cx: number; cy: number; s?: number; color?: string }> = ({ cx, cy, s = 1, color = '#4338ca' }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    {[-1, 1].map((side) =>
      [-9, -3, 3, 9].map((dy, i) => (
        <polyline
          key={`${side}${i}`}
          points={`${side * 6},${dy * 0.6} ${side * 15},${dy - 6} ${side * 22},${dy + 4}`}
          fill="none"
          stroke="#1e1b4b"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))
    )}
    <ellipse cx="0" cy="4" rx="9" ry="11" fill={color} stroke="#1e1b4b" strokeWidth="1.8" />
    <circle cx="0" cy="-9" r="6" fill={color} stroke="#1e1b4b" strokeWidth="1.8" />
    <circle cx="-2.4" cy="-10" r="1.8" fill="#ffffff" />
    <circle cx="2.4" cy="-10" r="1.8" fill="#ffffff" />
  </g>
);

/** Polip 8 karral. */
export const OctopusPart: React.FC<{ cx: number; cy: number; s?: number; color?: string }> = ({ cx, cy, s = 1, color = '#ec4899' }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    {Array.from({ length: 8 }, (_, i) => {
      const x = -14 + i * 4;
      const dir = i % 2 === 0 ? -1 : 1;
      return (
        <path
          key={i}
          d={`M ${x} 0 Q ${x + dir * 5} 10 ${x} 18 Q ${x - dir * 4} 24 ${x + dir * 2} 28`}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      );
    })}
    <path d="M -17 2 Q -18 -22 0 -22 Q 18 -22 17 2 Z" fill={color} stroke="#831843" strokeWidth="1.8" />
    <circle cx="-6" cy="-8" r="3" fill="#ffffff" />
    <circle cx="6" cy="-8" r="3" fill="#ffffff" />
    <circle cx="-6" cy="-8" r="1.4" fill="#1e293b" />
    <circle cx="6" cy="-8" r="1.4" fill="#1e293b" />
  </g>
);

/** Számegyenes 0-tól max-ig (alap: 80), tízesenként felirattal, `step` nagyságú ugrásokkal. */
export const JumpLinePart: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  max?: number;
  jumps?: number;
  step?: number;
  color?: string;
  endQuestion?: boolean;
  labels?: boolean;
  fromEnd?: boolean;
}> = ({ x = 20, y = 70, w = 400, max = 80, jumps = 0, step = 8, color = '#4f46e5', endQuestion = false, labels = true, fromEnd = false }) => {
  const u = w / max;
  return (
    <g>
      <line x1={x - 4} y1={y} x2={x + w + 10} y2={y} stroke="#334155" strokeWidth="2.5" />
      <polygon points={`${x + w + 16},${y} ${x + w + 8},${y - 4} ${x + w + 8},${y + 4}`} fill="#334155" />
      {Array.from({ length: max + 1 }, (_, i) => (
        <line
          key={i}
          x1={x + i * u}
          y1={y - (i % 10 === 0 ? 7 : i % 5 === 0 ? 4.5 : 2.5)}
          x2={x + i * u}
          y2={y + (i % 10 === 0 ? 7 : i % 5 === 0 ? 4.5 : 2.5)}
          stroke="#334155"
          strokeWidth={i % 10 === 0 ? 2 : 1}
        />
      ))}
      {labels &&
        Array.from({ length: Math.floor(max / 10) + 1 }, (_, i) => (
          <text key={i} x={x + i * 10 * u} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily={MULT8_FONT}>
            {i * 10}
          </text>
        ))}
      {Array.from({ length: jumps }, (_, i) => {
        const a = fromEnd ? max - i * step : i * step;
        const b = fromEnd ? a - step : a + step;
        const x1 = x + a * u;
        const x2 = x + b * u;
        const mid = (x1 + x2) / 2;
        return <path key={i} d={`M ${x1} ${y - 3} Q ${mid} ${y - 36} ${x2} ${y - 3}`} fill="none" stroke={color} strokeWidth="2.5" />;
      })}
      {endQuestion && jumps > 0 && (
        <text
          x={x + (fromEnd ? max - jumps * step : jumps * step) * u}
          y={y - 30}
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill="#dc2626"
          fontFamily={MULT8_FONT}
        >
          ?
        </text>
      )}
    </g>
  );
};

/** Pontrács: `rows` sor, soronként `cols` korong. Az oszlopok kettesével / négyesével színezve. */
export const DotArrayPart: React.FC<{
  x: number;
  y: number;
  rows: number;
  cols?: number;
  gap?: number;
  r?: number;
  colors?: [string, string, string];
  split?: boolean;
}> = ({ x, y, rows, cols = 8, gap = 16, r = 5.5, colors = ['#6366f1', '#f97316', '#0ea5e9'], split = true }) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const rr = Math.floor(i / cols);
      const cc = i % cols;
      const extra = split ? (cc >= 2 ? 5 : 0) + (cc >= 4 ? 5 : 0) : 0;
      const fill = !split ? colors[0] : cc < 2 ? colors[0] : cc < 4 ? colors[1] : colors[2];
      return <circle key={i} cx={x + cc * gap + extra} cy={y + rr * gap} r={r} fill={fill} stroke="#1e293b" strokeWidth="1.1" />;
    })}
  </g>
);

/** Színes rúd (számolórúd): piros = 2, rózsaszín = 4, bordó = 8 egység. */
export const RodPart: React.FC<{ x: number; y: number; units: 2 | 4 | 8; u?: number; h?: number }> = ({ x, y, units, u = 20, h = 24 }) => {
  const fill = units === 2 ? '#ef4444' : units === 4 ? '#f9a8d4' : '#881337';
  const text = units === 8 ? '#ffffff' : '#1e293b';
  return (
    <g>
      <rect x={x} y={y} width={units * u} height={h} rx="4" fill={fill} stroke="#1e293b" strokeWidth="2" />
      <text x={x + (units * u) / 2} y={y + h * 0.7} textAnchor="middle" fontSize={h * 0.6} fontWeight="bold" fill={text} fontFamily={MULT8_FONT}>
        {units}
      </text>
    </g>
  );
};

const Feedback: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const MULTIPLES = [8, 16, 24, 32, 40, 48, 56, 64, 72, 80];

// ---------------------------------------------------------------------------
// Labor I: Nyolcas dobozok
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
    const good = target * 8;
    if (chosen !== good) {
      setMsg({
        ok: false,
        text:
          chosen === good - 8 || chosen === good + 8
            ? 'Majdnem! Egy dobozzal elszámoltad. Számolj nyolcasával újra!'
            : 'Számolj nyolcasával: 8, 16, 24 … Minden doboz 8 golyó.'
      });
      return;
    }
    setMsg({ ok: true, text: `Szuper! ${target} · 8 = ${good}. ${target} doboz, mindegyikben 8 golyó.` });
  };

  const perRow = 4;
  const bh = 34;
  const gapX = 76;
  const rows = Math.max(1, Math.ceil(Math.max(boxes, 1) / perRow));
  const h = 26 + rows * 46;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-indigo-200 dark:border-indigo-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-indigo-50 dark:bg-indigo-950/50 rounded-xl p-3 text-center text-indigo-950 dark:text-indigo-100">
        Tegyél ki <strong>{target}</strong> dobozt! Minden dobozban 8 golyó van.
        <div className="text-3xl font-black mt-1">{target} · 8 = ?</div>
      </div>

      <svg viewBox={`0 0 320 ${h}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
        <rect x="1" y="1" width="318" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        {boxes === 0 && (
          <text x="160" y={h / 2 + 6} textAnchor="middle" fontSize="15" fill="#64748b">
            Még nincs doboz.
          </text>
        )}
        {Array.from({ length: boxes }, (_, i) => (
          <EightBoxPart key={i} x={16 + (i % perRow) * gapX} y={14 + Math.floor(i / perRow) * 46} h={bh} color={BOX_COLORS[i % BOX_COLORS.length]} />
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
        <span className="font-black text-lg text-indigo-900 dark:text-indigo-200">{boxes} doboz</span>
        <button
          type="button"
          onClick={() => {
            setBoxes((b) => Math.min(10, b + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold text-base min-h-[52px]"
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
                ? 'bg-indigo-600 text-white border-indigo-800 scale-105'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-base font-bold min-h-[52px]">
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
// Labor II: Duplázz háromszor! (2-es, 4-es, 8-as tábla)
// ---------------------------------------------------------------------------
const makeOptions = (good: number, near: number[]): number[] => {
  const set = new Set<number>([good]);
  near.forEach((v) => {
    if (v > 0 && v <= 80 && set.size < 3) set.add(v);
  });
  return Array.from(set).sort((a, b) => a - b);
};

export const DoubleLab: React.FC = () => {
  const [n, setN] = useState<number>(6);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const newTask = () => {
    let t = rnd(2, 10);
    while (t === n) t = rnd(2, 10);
    setN(t);
    setStep(1);
    setMsg(null);
  };

  const two = n * 2;
  const four = n * 4;
  const eight = n * 8;
  const prev = step === 2 ? two : four;
  const good = step === 1 ? two : step === 2 ? four : eight;
  const opts =
    step === 1 ? makeOptions(two, [two + 2, n + 2, two - 2]) : makeOptions(good, [prev + 2, good + 2, good - 2, good + 4]);

  const pick = (v: number) => {
    if (step === 4) return;
    if (v === good) {
      if (step === 1) {
        setStep(2);
        setMsg({ ok: true, text: `Jó! ${n} · 2 = ${two}. Most duplázd meg!` });
      } else if (step === 2) {
        setStep(3);
        setMsg({ ok: true, text: `Jó! ${n} · 4 = ${four}. Még egyszer duplázd meg!` });
      } else {
        setStep(4);
        setMsg({ ok: true, text: `Remek! ${four} + ${four} = ${eight}, tehát ${n} · 8 = ${eight}.` });
      }
      return;
    }
    if (step === 1) {
      setMsg({ ok: false, text: `Nézd a kék korongokat! ${n} sor, soronként 2. Számolj kettesével!` });
    } else if (v === prev + 2) {
      setMsg({ ok: false, text: `Nem 2-t kell hozzáadni! A ${prev} dupláját keresd: ${prev} + ${prev}.` });
    } else {
      setMsg({ ok: false, text: `Az új korongok ugyanannyian vannak, mint a régiek. ${prev} + ${prev} = ?` });
    }
  };

  const cols = step === 1 ? 2 : step === 2 ? 4 : 8;
  const gap = n > 7 ? 14 : 17;
  const h = 34 + n * gap;

  const stepText =
    step === 1
      ? `1. lépés: ${n} · 2 = ?`
      : step === 2
        ? `2. lépés: ${two} + ${two} = ?`
        : step === 3
          ? `3. lépés: ${four} + ${four} = ?`
          : `${n} · 2 = ${two}, ${n} · 4 = ${four}, ${n} · 8 = ${eight}`;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        Szorozz 2-vel, aztán duplázz kétszer!
        <div className="text-3xl font-black mt-1">{n} · 8 = ?</div>
      </div>

      <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-xs mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT8_FONT}>
        <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <DotArrayPart x={84} y={22} rows={n} cols={cols} gap={gap} r={gap * 0.34} colors={['#0ea5e9', '#f97316', '#6366f1']} />
        <text x="16" y={h / 2 + 6} fontSize="15" fontWeight="bold" fill="#334155">
          {n} sor
        </text>
      </svg>

      <div className="text-center text-lg font-black text-slate-800 dark:text-slate-100">{stepText}</div>
      {step < 4 && (
        <div className="flex flex-wrap justify-center gap-3">
          {opts.map((v) => (
            <button
              key={`${step}-${v}`}
              type="button"
              onClick={() => pick(v)}
              className="w-16 h-16 rounded-xl font-black text-xl border-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-orange-300 hover:bg-orange-100"
            >
              {v}
            </button>
          ))}
        </div>
      )}
      <div className="flex justify-center">
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Feedback msg={msg} />
    </div>
  );
};
