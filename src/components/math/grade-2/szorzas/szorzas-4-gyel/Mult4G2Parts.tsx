import React, { useState } from 'react';

export const MULT4_FONT = 'system-ui, Segoe UI, sans-serif';

export const BOX_COLORS = ['#8b5cf6', '#f97316', '#0ea5e9', '#10b981', '#ec4899', '#eab308', '#6366f1', '#ef4444', '#14b8a6', '#a855f7'];

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Egy négyes doboz: 2 × 2 korong egy lekerekített dobozban. */
export const FourBoxPart: React.FC<{
  x: number;
  y: number;
  size?: number;
  color?: string;
  question?: boolean;
}> = ({ x, y, size = 34, color = '#8b5cf6', question = false }) => {
  const r = size * 0.17;
  const c1 = size * 0.3;
  const c2 = size * 0.7;
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={size * 0.18} fill="#ffffff" stroke="#475569" strokeWidth={Math.max(1.5, size * 0.06)} />
      {question ? (
        <text x={x + size / 2} y={y + size * 0.68} textAnchor="middle" fontSize={size * 0.55} fontWeight="bold" fill="#dc2626" fontFamily={MULT4_FONT}>
          ?
        </text>
      ) : (
        [
          [c1, c1],
          [c2, c1],
          [c1, c2],
          [c2, c2]
        ].map(([dx, dy], i) => (
          <circle key={i} cx={x + dx} cy={y + dy} r={r} fill={color} stroke="#1e293b" strokeWidth={Math.max(1, size * 0.03)} />
        ))
      )}
    </g>
  );
};

/** Számegyenes 0-tól max-ig, egységenként kis osztással, tízesenként felirattal, 4-es ugrásokkal. */
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
  labels?: boolean;
}> = ({ x = 20, y = 70, w = 300, max = 40, jumps = 0, step = 4, color = '#7c3aed', below = false, endQuestion = false, labels = true }) => {
  const u = w / max;
  return (
    <g>
      <line x1={x - 4} y1={y} x2={x + w + 10} y2={y} stroke="#334155" strokeWidth="2.5" />
      <polygon points={`${x + w + 16},${y} ${x + w + 8},${y - 4} ${x + w + 8},${y + 4}`} fill="#334155" />
      {Array.from({ length: max + 1 }, (_, i) => (
        <line
          key={i}
          x1={x + i * u}
          y1={y - (i % 10 === 0 ? 7 : i % 5 === 0 ? 5 : 3)}
          x2={x + i * u}
          y2={y + (i % 10 === 0 ? 7 : i % 5 === 0 ? 5 : 3)}
          stroke="#334155"
          strokeWidth={i % 10 === 0 ? 2 : 1}
        />
      ))}
      {labels &&
        Array.from({ length: Math.floor(max / 10) + 1 }, (_, i) => (
          <text key={i} x={x + i * 10 * u} y={y + (below ? -12 : 22)} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily={MULT4_FONT}>
            {i * 10}
          </text>
        ))}
      {Array.from({ length: jumps }, (_, i) => {
        const x1 = x + i * step * u;
        const x2 = x + (i + 1) * step * u;
        const mid = (x1 + x2) / 2;
        const h = below ? 18 : -22;
        return (
          <path
            key={i}
            d={`M ${x1} ${y + (below ? 3 : -3)} Q ${mid} ${y + h * 1.6} ${x2} ${y + (below ? 3 : -3)}`}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
          />
        );
      })}
      {endQuestion && jumps > 0 && (
        <text x={x + jumps * step * u} y={y + (below ? 40 : -34)} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626" fontFamily={MULT4_FONT}>
          ?
        </text>
      )}
    </g>
  );
};

/** Pontrács: `rows` sor, soronként `cols` korong. Az első `splitCol` oszlop más színű. */
export const DotArrayPart: React.FC<{
  x: number;
  y: number;
  rows: number;
  cols?: number;
  gap?: number;
  r?: number;
  colorA?: string;
  colorB?: string;
  splitCol?: number;
}> = ({ x, y, rows, cols = 4, gap = 18, r = 6.5, colorA = '#8b5cf6', colorB = '#f97316', splitCol = 99 }) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const rr = Math.floor(i / cols);
      const cc = i % cols;
      const extra = cc >= splitCol ? 8 : 0;
      return (
        <circle
          key={i}
          cx={x + cc * gap + extra}
          cy={y + rr * gap}
          r={r}
          fill={cc < splitCol ? colorA : colorB}
          stroke="#1e293b"
          strokeWidth="1.2"
        />
      );
    })}
  </g>
);

const Feedback: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
      {msg.text}
    </div>
  ) : null;

const MULTIPLES = [4, 8, 12, 16, 20, 24, 28, 32, 36, 40];

// ---------------------------------------------------------------------------
// Labor I: Négyes dobozok
// ---------------------------------------------------------------------------
export const GroupsLab: React.FC = () => {
  const [target, setTarget] = useState<number>(6);
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
    const good = target * 4;
    if (chosen !== good) {
      setMsg({
        ok: false,
        text:
          chosen === good - 4 || chosen === good + 4
            ? 'Majdnem! Egy dobozzal elszámoltad. Számolj négyesével újra!'
            : `Számolj négyesével: 4, 8, 12 … Minden doboz 4 golyó.`
      });
      return;
    }
    setMsg({ ok: true, text: `Szuper! ${target} · 4 = ${good}. ${target} doboz, mindegyikben 4 golyó.` });
  };

  const perRow = 5;
  const size = 44;
  const gapX = 58;
  const rows = Math.max(1, Math.ceil(Math.max(boxes, 1) / perRow));
  const h = 30 + rows * 60;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100">
        Tegyél ki <strong>{target}</strong> dobozt! Minden dobozban 4 golyó van.
        <div className="text-3xl font-black mt-1">{target} · 4 = ?</div>
      </div>

      <svg viewBox={`0 0 320 ${h}`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
        <rect x="1" y="1" width="318" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        {boxes === 0 && (
          <text x="160" y={h / 2 + 6} textAnchor="middle" fontSize="15" fill="#64748b">
            Még nincs doboz.
          </text>
        )}
        {Array.from({ length: boxes }, (_, i) => (
          <FourBoxPart key={i} x={22 + (i % perRow) * gapX} y={18 + Math.floor(i / perRow) * 60} size={size} color={BOX_COLORS[i % BOX_COLORS.length]} />
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
        <span className="font-black text-lg text-violet-900 dark:text-violet-200">{boxes} doboz</span>
        <button
          type="button"
          onClick={() => {
            setBoxes((b) => Math.min(10, b + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-violet-600 text-white font-bold text-base min-h-[52px]"
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
                ? 'bg-violet-600 text-white border-violet-800 scale-105'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-violet-600 text-white text-base font-bold min-h-[52px]">
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
// Labor II: Duplázd meg kétszer! (2-es és 4-es tábla kapcsolata)
// ---------------------------------------------------------------------------
const makeOptions = (good: number, near: number[]): number[] => {
  const set = new Set<number>([good]);
  near.forEach((n) => {
    if (n > 0 && n <= 40 && set.size < 3) set.add(n);
  });
  return Array.from(set).sort((a, b) => a - b);
};

export const DoubleLab: React.FC = () => {
  const [n, setN] = useState<number>(7);
  const [step, setStep] = useState<1 | 2>(1);
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
  const opts1 = makeOptions(two, [two + 2, two - 2, n + 2]);
  const opts2 = makeOptions(four, [two + 2, four + 4, four - 4]);

  const pick = (v: number) => {
    if (step === 1) {
      if (v === two) {
        setStep(2);
        setMsg({ ok: true, text: `Jó! ${n} · 2 = ${two}. Most duplázd meg!` });
      } else {
        setMsg({ ok: false, text: `Nézd a lila korongokat! ${n} sor, soronként 2. Számolj kettesével!` });
      }
    } else if (v === four) {
      setMsg({ ok: true, text: `Remek! ${two} + ${two} = ${four}, tehát ${n} · 4 = ${four}.` });
    } else if (v === two + 2) {
      setMsg({ ok: false, text: `Nem 2-t kell hozzáadni! A ${two} dupláját keresd: ${two} + ${two}.` });
    } else {
      setMsg({ ok: false, text: `A narancs korongok ugyanannyian vannak, mint a lilák. ${two} + ${two} = ?` });
    }
  };

  const gap = n > 7 ? 15 : 18;
  const h = 34 + n * gap;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        A 4 az 2 + 2. Számold ki két lépésben!
        <div className="text-3xl font-black mt-1">{n} · 4 = ?</div>
      </div>

      <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-xs mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
        <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <DotArrayPart x={96} y={22} rows={n} cols={step === 1 ? 2 : 4} gap={gap} r={gap * 0.36} splitCol={2} />
        <text x="22" y={h / 2 + 6} fontSize="16" fontWeight="bold" fill="#334155">
          {n} sor
        </text>
      </svg>

      <div className="text-center text-lg font-black text-slate-800 dark:text-slate-100">
        {step === 1 ? `1. lépés: ${n} · 2 = ?` : `2. lépés: ${two} + ${two} = ?`}
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        {(step === 1 ? opts1 : opts2).map((v) => (
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
      <div className="flex justify-center">
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Feedback msg={msg} />
    </div>
  );
};
