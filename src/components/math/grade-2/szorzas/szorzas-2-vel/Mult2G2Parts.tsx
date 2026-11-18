import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 1. Szorzás 2-vel – közös SVG-építőelemek (2. osztály)
// ---------------------------------------------------------------------------

export const MULT2_FONT = 'system-ui, Segoe UI, sans-serif';

export const MULT2_COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16'];

/**
 * Zacskók (csomagok) sora: `groups` darab zacskó, mindegyikben `each` korong.
 * Ha `unknownEach` igaz, a zacskókban „?” áll.
 */
export const BagsPart: React.FC<{
  x?: number;
  y?: number;
  groups: number;
  each?: number;
  bagW?: number;
  gap?: number;
  dotColor?: string;
  unknownEach?: boolean;
  emptyFrom?: number;
}> = ({ x = 10, y = 10, groups, each = 2, bagW = 34, gap = 6, dotColor, unknownEach = false, emptyFrom }) => {
  const bagH = bagW * 1.05;
  return (
    <g>
      {Array.from({ length: groups }, (_, g) => {
        const bx = x + g * (bagW + gap);
        const empty = emptyFrom !== undefined && g >= emptyFrom;
        const col = dotColor ?? MULT2_COLORS[g % MULT2_COLORS.length];
        return (
          <g key={g}>
            <path
              d={`M ${bx + bagW * 0.3} ${y + 6} L ${bx + bagW * 0.7} ${y + 6} L ${bx + bagW} ${y + bagH} L ${bx} ${y + bagH} Z`}
              fill={empty ? '#f8fafc' : '#fef9c3'}
              stroke="#a16207"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <line x1={bx + bagW * 0.32} y1={y + 6} x2={bx + bagW * 0.68} y2={y + 6} stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
            {!empty && !unknownEach &&
              Array.from({ length: each }, (_, i) => {
                const perRow = each <= 2 ? each : 2;
                const r = Math.floor(i / perRow);
                const c = i % perRow;
                const rows = Math.ceil(each / perRow);
                const cx = bx + bagW / 2 + (c - (perRow - 1) / 2) * (bagW * 0.32);
                const cy = y + bagH * 0.62 + (r - (rows - 1) / 2) * (bagW * 0.3);
                return <circle key={i} cx={cx} cy={cy} r={bagW * 0.13} fill={col} stroke="#1e293b" strokeWidth="1.2" />;
              })}
            {!empty && unknownEach && (
              <text x={bx + bagW / 2} y={y + bagH * 0.8} textAnchor="middle" fontSize={bagW * 0.5} fontWeight="900" fill="#dc2626" fontFamily={MULT2_FONT}>
                ?
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

/**
 * Rácspontok (szorzó-tömb): `rows` sor, `cols` oszlop korong.
 */
export const ArrayPart: React.FC<{
  x?: number;
  y?: number;
  rows: number;
  cols: number;
  step?: number;
  r?: number;
  rowColors?: string[];
  colHighlight?: boolean;
}> = ({ x = 20, y = 20, rows, cols, step = 22, r = 8, rowColors = ['#ef4444', '#3b82f6'], colHighlight = false }) => (
  <g>
    {colHighlight &&
      Array.from({ length: cols }, (_, c) => (
        <rect
          key={`h${c}`}
          x={x + c * step - r - 3}
          y={y - r - 3}
          width={2 * r + 6}
          height={(rows - 1) * step + 2 * r + 6}
          rx={r + 3}
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.8"
          strokeDasharray="3 2"
        />
      ))}
    {Array.from({ length: rows * cols }, (_, i) => {
      const rr = Math.floor(i / cols);
      const c = i % cols;
      return (
        <circle
          key={i}
          cx={x + c * step}
          cy={y + rr * step}
          r={r}
          fill={rowColors[rr % rowColors.length]}
          stroke="#1e293b"
          strokeWidth="1.2"
        />
      );
    })}
  </g>
);

/**
 * 0–20 számegyenes kettes (vagy tetszőleges) ugrásokkal.
 */
export const JumpLinePart: React.FC<{
  x0?: number;
  y?: number;
  unit?: number;
  max?: number;
  jumps: number;
  size?: number;
  start?: number;
  showEnd?: boolean;
  endLabel?: string;
  labelEvery?: number;
}> = ({ x0 = 14, y = 70, unit = 11.5, max = 20, jumps, size = 2, start = 0, showEnd = true, endLabel, labelEvery = 2 }) => {
  const X = (v: number) => x0 + v * unit;
  const end = start + jumps * size;
  return (
    <g fontFamily={MULT2_FONT}>
      <line x1={X(0) - 4} y1={y} x2={X(max) + 8} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${X(max) + 8} ${y - 4} L ${X(max) + 14} ${y} L ${X(max) + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: max + 1 }, (_, v) => (
        <line key={v} x1={X(v)} y1={v % 10 === 0 ? y - 7 : y - 4} x2={X(v)} y2={v % 10 === 0 ? y + 7 : y + 4} stroke="#334155" strokeWidth={v % 10 === 0 ? 1.8 : 1.1} />
      ))}
      {Array.from({ length: max + 1 }, (_, v) => v)
        .filter((v) => v % labelEvery === 0)
        .map((v) => (
          <text key={`t${v}`} x={X(v)} y={y + 18} textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#475569">
            {showEnd || v !== end || v === start ? v : ''}
          </text>
        ))}
      {Array.from({ length: jumps }, (_, j) => {
        const a = start + j * size;
        const b = a + size;
        return (
          <g key={j}>
            <path d={`M ${X(a)} ${y - 4} Q ${(X(a) + X(b)) / 2} ${y - 26} ${X(b)} ${y - 4}`} fill="none" stroke={MULT2_COLORS[j % MULT2_COLORS.length]} strokeWidth="2.4" />
            <path d={`M ${X(b) - 4} ${y - 9} L ${X(b)} ${y - 4} L ${X(b) - 6} ${y - 3}`} fill="none" stroke={MULT2_COLORS[j % MULT2_COLORS.length]} strokeWidth="2" />
          </g>
        );
      })}
      <circle cx={X(start)} cy={y} r="4" fill="#0f172a" />
      {jumps > 0 && <circle cx={X(end)} cy={y} r="5" fill="#dc2626" />}
      {!showEnd && jumps > 0 && (
        <text x={X(end)} y={y + 18} textAnchor="middle" fontSize="12" fontWeight="900" fill="#dc2626">
          {endLabel ?? '?'}
        </text>
      )}
    </g>
  );
};

/** Kerékpár (2 kerék) egyszerű ikonja. */
export const BikePart: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = '#2563eb' }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <circle cx="8" cy="18" r="7" fill="none" stroke="#0f172a" strokeWidth="2.4" />
    <circle cx="32" cy="18" r="7" fill="none" stroke="#0f172a" strokeWidth="2.4" />
    <path d="M 8 18 L 16 6 L 27 6 L 32 18 M 16 6 L 20 18 L 27 6" fill="none" stroke={color} strokeWidth="2.6" strokeLinejoin="round" />
    <line x1="14" y1="3" x2="19" y2="3" stroke="#0f172a" strokeWidth="2.4" strokeLinecap="round" />
  </g>
);

/** Zoknipár ikon. */
export const SockPairPart: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = '#ec4899' }) => {
  const sock = (dx: number) => (
    <path
      d={`M ${dx} 0 L ${dx + 8} 0 L ${dx + 8} 14 L ${dx + 13} 18 Q ${dx + 15} 23 ${dx + 9} 23 L ${dx + 2} 21 Q ${dx} 20 ${dx} 16 Z`}
      fill={color}
      stroke="#1e293b"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  );
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {sock(0)}
      {sock(13)}
      <rect x="0" y="0" width="8" height="4" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
      <rect x="13" y="0" width="8" height="4" fill="#ffffff" stroke="#1e293b" strokeWidth="1" />
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

// ---------------------------------------------------------------------------
// Labor I: Zacskó-töltő — n · 2 kirakása zacskókkal
// ---------------------------------------------------------------------------
export const BagsLab: React.FC = () => {
  const [n, setN] = useState(4);
  const [bags, setBags] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const reset = () => {
    setN((o) => pickNew(o, 2, 10));
    setBags(0);
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (bags !== n) {
      setMsg({
        ok: false,
        text:
          bags === 2 && n !== 2
            ? `Most 2 zacskó van. A ${n} · 2-ben az első szám mondja meg, hány zacskó kell: ${n} zacskó!`
            : `Most ${bags} zacskó van. ${n} · 2 = ${n} zacskó, mindegyikben 2 golyó.`
      });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'A zacskók jók! Most számold meg a golyókat, és válaszd ki az eredményt!' });
      return;
    }
    if (chosen !== n * 2) {
      setMsg({
        ok: false,
        text:
          chosen === n + 2
            ? `Ez ${n} + 2 lenne. Szorzásnál ${n}-szor adjuk össze a 2-t! Számolj kettesével!`
            : `Számolj kettesével a zacskókon: 2, 4, 6 … Hány golyó van összesen?`
      });
      return;
    }
    setMsg({ ok: true, text: `Szuper! ${n} · 2 = ${Array.from({ length: n }, () => '2').join(' + ')} = ${n * 2}` });
  };

  const bagW = 24;
  const gap = 5;
  const width = 10 * (bagW + gap) - gap;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        Rakd ki zacskókkal:{' '}
        <span className="text-3xl font-black align-middle ml-2">{n} · 2 = ?</span>
      </div>
      <svg viewBox={`0 0 ${width + 20} 56`} className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
        <rect x="1" y="1" width={width + 18} height="54" rx="10" fill="#fff7ed" stroke="#fed7aa" />
        <BagsPart x={10} y={8} groups={10} each={2} bagW={bagW} gap={gap} emptyFrom={bags} />
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setBags((b) => Math.max(0, b - 1));
            setMsg(null);
          }}
          className={`${btnBase} px-4 bg-slate-100 text-slate-800 border-slate-300 text-base`}
        >
          − 1 zacskó
        </button>
        <span className="text-lg font-black text-slate-800 dark:text-slate-100">{bags} zacskó</span>
        <button
          type="button"
          onClick={() => {
            setBags((b) => Math.min(10, b + 1));
            setMsg(null);
          }}
          className={`${btnBase} px-4 bg-orange-500 text-white border-orange-700 text-base`}
        >
          + 1 zacskó
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány golyó van összesen?</p>
      <div className="flex flex-wrap justify-center gap-2">
        {[2, 4, 6, 8, 10, 12, 14, 16, 18, 20].map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setChosen(v);
              setMsg(null);
            }}
            className={`${btnBase} w-12 h-12 text-lg ${chosen === v ? 'bg-orange-500 text-white border-orange-700 scale-105' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'}`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-orange-600 text-white text-base font-bold min-h-[48px]">
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
// Labor II: Kettes ugrások a számegyenesen
// ---------------------------------------------------------------------------
interface JumpTask {
  mode: 'product' | 'count';
  n: number;
}

export const JumpLab: React.FC = () => {
  const [task, setTask] = useState<JumpTask>({ mode: 'product', n: 6 });
  const [jumps, setJumps] = useState(0);
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const reset = () => {
    setTask((o) => ({ mode: Math.random() < 0.5 ? 'product' : 'count', n: pickNew(o.n, 2, 10) }));
    setJumps(0);
    setChosen(null);
    setMsg(null);
  };

  const target = task.n * 2;
  const options = task.mode === 'product' ? [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const check = () => {
    if (task.mode === 'product') {
      if (jumps !== task.n) {
        setMsg({ ok: false, text: `Most ${jumps}-at ugrottál. A ${task.n} · 2-ben ${task.n} ugrás kell, mindegyik 2 hosszú!` });
        return;
      }
      if (chosen === null) {
        setMsg({ ok: false, text: 'Jó sok ugrás! Hol álltál meg? Válaszd ki a számot!' });
        return;
      }
      if (chosen !== target) {
        setMsg({ ok: false, text: `Nézd meg, hol áll a piros pont! Számold kettesével: 2, 4, 6 …` });
        return;
      }
      setMsg({ ok: true, text: `Igen! ${task.n} ugrás, mindegyik 2: ${task.n} · 2 = ${target}.` });
    } else {
      if (jumps * 2 !== target) {
        setMsg({
          ok: false,
          text: jumps * 2 < target ? `Most a ${jumps * 2}-n állsz. Ugorj még, amíg el nem éred a ${target}-at!` : `Túlugrottál! A ${jumps * 2} több, mint ${target}. Lépj vissza!`
        });
        return;
      }
      if (chosen === null) {
        setMsg({ ok: false, text: 'Elérted! Most válaszd ki, hányat ugrottál!' });
        return;
      }
      if (chosen !== task.n) {
        setMsg({ ok: false, text: `Számold meg az íveket! Annyi ugrás kellett, ahányszor a 2 megvan a ${target}-ban.` });
        return;
      }
      setMsg({ ok: true, text: `Ügyes! ${task.n} · 2 = ${target}, tehát □ = ${task.n}.` });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-purple-50 dark:bg-purple-950/50 rounded-xl p-3 text-center text-purple-950 dark:text-purple-100">
        {task.mode === 'product' ? 'Ugorj, és mondd meg az eredményt:' : 'Hányat kell ugrani? '}
        <span className="text-3xl font-black align-middle ml-2">{task.mode === 'product' ? `${task.n} · 2 = ?` : `□ · 2 = ${target}`}</span>
      </div>
      <svg viewBox="0 0 280 96" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
        <rect x="1" y="1" width="278" height="94" rx="10" fill="#faf5ff" stroke="#e9d5ff" />
        <JumpLinePart x0={18} y={62} unit={11.8} jumps={jumps} />
        <text x="140" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8">
          Ugrások: {jumps}
        </text>
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setJumps((j) => Math.max(0, j - 1));
            setMsg(null);
          }}
          className={`${btnBase} px-4 bg-slate-100 text-slate-800 border-slate-300 text-base`}
        >
          Vissza
        </button>
        <button
          type="button"
          onClick={() => {
            setJumps((j) => Math.min(10, j + 1));
            setMsg(null);
          }}
          className={`${btnBase} px-4 bg-purple-600 text-white border-purple-800 text-base`}
        >
          Ugorj 2-t!
        </button>
      </div>
      <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">
        {task.mode === 'product' ? 'Hol álltál meg?' : 'Hányat ugrottál?'}
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
            className={`${btnBase} w-12 h-12 text-lg ${chosen === v ? 'bg-purple-600 text-white border-purple-800 scale-105' : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'}`}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-purple-600 text-white text-base font-bold min-h-[48px]">
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
