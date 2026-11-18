import React, { useState } from 'react';

export const MULT7_FONT = 'system-ui, Segoe UI, sans-serif';

/** Az első 5 nap (hétköznap) és az utolsó 2 nap (hétvége) színe. */
export const C5 = '#0891b2';
export const C2 = '#f97316';
export const DAY_LABELS = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'];

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Egy hetes csík: 7 kocka egy sorban (5 kék + 2 narancs). `count` < 7 esetén csak ennyi kocka. */
export const WeekStripPart: React.FC<{
  x: number;
  y: number;
  cell?: number;
  h?: number;
  count?: number;
  labels?: boolean;
  colorA?: string;
  colorB?: string;
}> = ({ x, y, cell = 30, h, count = 7, labels = false, colorA = C5, colorB = C2 }) => {
  const hh = h ?? cell;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <g key={i}>
          <rect
            x={x + i * cell}
            y={y}
            width={cell}
            height={hh}
            rx={Math.min(5, cell * 0.15)}
            fill={i < 5 ? colorA : colorB}
            stroke="#1e293b"
            strokeWidth={Math.max(1, cell * 0.05)}
          />
          {labels && (
            <text
              x={x + i * cell + cell / 2}
              y={y + hh / 2 + cell * 0.17}
              textAnchor="middle"
              fontSize={cell * 0.42}
              fontWeight="bold"
              fill="#ffffff"
              fontFamily={MULT7_FONT}
            >
              {DAY_LABELS[i]}
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

/** Számegyenes 0-tól max-ig, tízesenként felirattal, `step`-es ugrásokkal. */
export const JumpLinePart: React.FC<{
  x?: number;
  y?: number;
  w?: number;
  max?: number;
  jumps?: number;
  step?: number;
  color?: string;
  endQuestion?: boolean;
  landLabels?: boolean;
}> = ({ x = 20, y = 70, w = 300, max = 70, jumps = 0, step = 7, color = C5, endQuestion = false, landLabels = false }) => {
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
          strokeWidth={i % 10 === 0 ? 2 : 0.9}
        />
      ))}
      {Array.from({ length: Math.floor(max / 10) + 1 }, (_, i) => (
        <text key={i} x={x + i * 10 * u} y={y + 22} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily={MULT7_FONT}>
          {i * 10}
        </text>
      ))}
      {Array.from({ length: jumps }, (_, i) => {
        const x1 = x + i * step * u;
        const x2 = x + (i + 1) * step * u;
        const mid = (x1 + x2) / 2;
        return (
          <g key={i}>
            <path d={`M ${x1} ${y - 3} Q ${mid} ${y - 34} ${x2} ${y - 3}`} fill="none" stroke={color} strokeWidth="2.5" />
            {landLabels && !(endQuestion && i === jumps - 1) && (
              <text x={x2} y={y - 22} textAnchor="middle" fontSize="11" fontWeight="bold" fill={color} fontFamily={MULT7_FONT}>
                {(i + 1) * step}
              </text>
            )}
          </g>
        );
      })}
      {endQuestion && jumps > 0 && (
        <text x={x + jumps * step * u} y={y - 24} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#dc2626" fontFamily={MULT7_FONT}>
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
}> = ({ x, y, rows, cols = 7, gap = 18, r = 6.5, colorA = C5, colorB = C2, splitCol = 99 }) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const rr = Math.floor(i / cols);
      const cc = i % cols;
      const extra = cc >= splitCol ? gap * 0.45 : 0;
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

const MULTIPLES = [7, 14, 21, 28, 35, 42, 49, 56, 63, 70];

// ---------------------------------------------------------------------------
// Labor I: Hetes csíkok (1 csík = 1 hét = 7 nap)
// ---------------------------------------------------------------------------
export const WeeksLab: React.FC = () => {
  const [target, setTarget] = useState<number>(4);
  const [weeks, setWeeks] = useState<number>(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const newTask = () => {
    let t = rnd(2, 10);
    while (t === target) t = rnd(2, 10);
    setTarget(t);
    setWeeks(0);
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (weeks !== target) {
      setMsg({
        ok: false,
        text: weeks < target ? `Most ${weeks} csík van fent. ${target} kell. Tegyél még!` : `Most ${weeks} csík van fent. Csak ${target} kell. Vegyél el!`
      });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'A csíkok jók! Most válaszd ki, hány nap ez összesen!' });
      return;
    }
    const good = target * 7;
    if (chosen !== good) {
      setMsg({
        ok: false,
        text:
          chosen === good - 7 || chosen === good + 7
            ? 'Majdnem! Egy héttel elszámoltad. Számolj hetesével újra!'
            : 'Számolj hetesével: 7, 14, 21 … Minden csík 7 nap.'
      });
      return;
    }
    setMsg({ ok: true, text: `Szuper! ${target} · 7 = ${good}. ${target} hét az ${good} nap.` });
  };

  const cell = 26;
  const rowH = 32;
  const h = 34 + Math.max(1, weeks) * rowH;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-cyan-200 dark:border-cyan-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-cyan-50 dark:bg-cyan-950/50 rounded-xl p-3 text-center text-cyan-950 dark:text-cyan-100">
        Tegyél ki <strong>{target}</strong> hetet! Egy csík egy hét: 7 nap.
        <div className="text-3xl font-black mt-1">{target} · 7 = ?</div>
      </div>

      <svg viewBox={`0 0 280 ${h}`} className="w-full max-w-sm mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
        <rect x="1" y="1" width="278" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        {weeks === 0 && (
          <text x="140" y={h / 2 + 6} textAnchor="middle" fontSize="15" fill="#64748b">
            Még nincs csík.
          </text>
        )}
        {Array.from({ length: weeks }, (_, i) => (
          <g key={i}>
            <text x="30" y={17 + i * rowH + cell / 2 + 6} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#475569">
              {i + 1}.
            </text>
            <WeekStripPart x={52} y={17 + i * rowH} cell={cell} labels />
          </g>
        ))}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setWeeks((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[52px]"
        >
          − 1 hét
        </button>
        <span className="font-black text-lg text-cyan-900 dark:text-cyan-200">{weeks} hét</span>
        <button
          type="button"
          onClick={() => {
            setWeeks((b) => Math.min(10, b + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold text-base min-h-[52px]"
        >
          + 1 hét
        </button>
      </div>

      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány nap ez összesen?</p>
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
                ? 'bg-cyan-600 text-white border-cyan-800 scale-105'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-base font-bold min-h-[52px]">
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
// Labor II: 5 + 2 trükk (n · 7 = n · 5 + n · 2)
// ---------------------------------------------------------------------------
const makeOptions = (good: number, near: number[]): number[] => {
  const set = new Set<number>([good]);
  near.forEach((v) => {
    if (v > 0 && v <= 70 && set.size < 3) set.add(v);
  });
  return Array.from(set).sort((a, b) => a - b);
};

export const FivePlusTwoLab: React.FC = () => {
  const [n, setN] = useState<number>(6);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const newTask = () => {
    let t = rnd(3, 10);
    while (t === n) t = rnd(3, 10);
    setN(t);
    setStep(1);
    setMsg(null);
  };

  const five = n * 5;
  const two = n * 2;
  const seven = n * 7;
  const opts =
    step === 1
      ? makeOptions(five, [five + 5, five - 5, n + 5])
      : step === 2
        ? makeOptions(two, [two + 2, two - 2, n + 2])
        : makeOptions(seven, [five + 2, seven - 7, seven + 7]);

  const pick = (v: number) => {
    if (step === 1) {
      if (v === five) {
        setStep(2);
        setMsg({ ok: true, text: `Jó! ${n} · 5 = ${five}. Most jönnek a narancs korongok!` });
      } else {
        setMsg({ ok: false, text: `Csak a kék korongokat nézd! ${n} sor, soronként 5. Számolj ötösével!` });
      }
    } else if (step === 2) {
      if (v === two) {
        setStep(3);
        setMsg({ ok: true, text: `Jó! ${n} · 2 = ${two}. Most add össze a kettőt!` });
      } else {
        setMsg({ ok: false, text: `Most a narancs korongokat nézd! ${n} sor, soronként 2. Számolj kettesével!` });
      }
    } else if (v === seven) {
      setMsg({ ok: true, text: `Remek! ${five} + ${two} = ${seven}, tehát ${n} · 7 = ${seven}.` });
    } else if (v === five + 2) {
      setMsg({ ok: false, text: `Nem 2-t kell hozzáadni, hanem ${two}-t! ${five} + ${two} = ?` });
    } else {
      setMsg({ ok: false, text: `Add össze: ${five} + ${two}. Előbb a tízeseket, aztán az egyeseket!` });
    }
  };

  const gap = n > 7 ? 16 : 19;
  const h = 34 + n * gap;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        A 7 az 5 + 2. Számold ki három lépésben!
        <div className="text-3xl font-black mt-1">{n} · 7 = ?</div>
      </div>

      <svg viewBox={`0 0 280 ${h}`} className="w-full max-w-xs mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT7_FONT}>
        <rect x="1" y="1" width="278" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <DotArrayPart
          x={110}
          y={22}
          rows={n}
          cols={7}
          gap={gap}
          r={gap * 0.36}
          splitCol={5}
          colorA={step === 2 ? '#a5f3fc' : C5}
          colorB={step === 1 ? '#fed7aa' : C2}
        />
        <text x="22" y={h / 2 + 6} fontSize="16" fontWeight="bold" fill="#334155">
          {n} sor
        </text>
      </svg>

      <div className="text-center text-lg font-black text-slate-800 dark:text-slate-100">
        {step === 1 ? `1. lépés: ${n} · 5 = ?` : step === 2 ? `2. lépés: ${n} · 2 = ?` : `3. lépés: ${five} + ${two} = ?`}
      </div>
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
      <div className="flex justify-center">
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Feedback msg={msg} />
    </div>
  );
};
