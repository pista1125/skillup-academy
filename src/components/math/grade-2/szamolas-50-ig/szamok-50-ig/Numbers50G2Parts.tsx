import React from 'react';

export const N50_FONT = 'system-ui, Segoe UI, sans-serif';
export const N50_UNK = '#dc2626';

/** Kérdésábra-keret (kvízhez). */
export const N50QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({
  children,
  h = 130,
  w = 260
}) => (
  <svg
    viewBox={`0 0 ${w} ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={N50_FONT}
  >
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/**
 * Tízesrudak és egyeskockák.
 * A rudak lila színűek (10 kis négyzet), a kockák zöldek, 5-ös csoportokban.
 */
export const BlocksPart: React.FC<{
  x?: number;
  y?: number;
  tens: number;
  ones: number;
  unit?: number;
  gap?: number;
}> = ({ x = 10, y = 10, tens, ones, unit = 9, gap = 6 }) => {
  const rodW = unit;
  const rodH = unit * 10;
  const onesX = x + tens * (rodW + gap) + (tens > 0 ? gap + 4 : 0);
  return (
    <g>
      {Array.from({ length: tens }, (_, t) => (
        <g key={`t${t}`}>
          <rect
            x={x + t * (rodW + gap)}
            y={y}
            width={rodW}
            height={rodH}
            rx="1.5"
            fill="#d8b4fe"
            stroke="#6b21a8"
            strokeWidth="1.6"
          />
          {Array.from({ length: 9 }, (_, k) => (
            <line
              key={k}
              x1={x + t * (rodW + gap)}
              y1={y + (k + 1) * unit}
              x2={x + t * (rodW + gap) + rodW}
              y2={y + (k + 1) * unit}
              stroke="#6b21a8"
              strokeWidth="0.8"
            />
          ))}
        </g>
      ))}
      {Array.from({ length: ones }, (_, i) => {
        // oszlopok 5 kockával, alulról felfelé
        const col = Math.floor(i / 5);
        const row = i % 5;
        return (
          <rect
            key={`o${i}`}
            x={onesX + col * (unit + 4)}
            y={y + rodH - (row + 1) * (unit + 3) + 3}
            width={unit}
            height={unit}
            rx="1.5"
            fill="#86efac"
            stroke="#15803d"
            strokeWidth="1.6"
          />
        );
      })}
    </g>
  );
};

/**
 * Számegyenes egy [from, to] tartományban, egységnyi beosztással.
 * A 10 többszörösei vastagok és feliratosak, az 5-ösök közepesek.
 */
export const NumberLinePart: React.FC<{
  x?: number;
  y?: number;
  width?: number;
  from: number;
  to: number;
  labelEvery?: number;
  arrowAt?: number;
  arrowLabel?: string;
  marks?: { value: number; color?: string; label?: string }[];
  fontSize?: number;
}> = ({
  x = 16,
  y = 60,
  width = 228,
  from,
  to,
  labelEvery = 10,
  arrowAt,
  arrowLabel = '?',
  marks = [],
  fontSize = 11
}) => {
  const u = width / (to - from);
  const px = (v: number) => x + (v - from) * u;
  return (
    <g>
      <line x1={x - 4} y1={y} x2={x + width + 8} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${x + width + 8} ${y - 4} L ${x + width + 14} ${y} L ${x + width + 8} ${y + 4} Z`} fill="#334155" />
      {Array.from({ length: to - from + 1 }, (_, k) => {
        const v = from + k;
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        const h = big ? 8 : mid ? 6 : 3.5;
        return (
          <line
            key={v}
            x1={px(v)}
            y1={y - h}
            x2={px(v)}
            y2={y + h}
            stroke="#334155"
            strokeWidth={big ? 2 : 1.1}
          />
        );
      })}
      {Array.from({ length: to - from + 1 }, (_, k) => from + k)
        .filter((v) => v % labelEvery === 0)
        .map((v) => (
          <text
            key={`l${v}`}
            x={px(v)}
            y={y + 22}
            textAnchor="middle"
            fontSize={fontSize}
            fontWeight="bold"
            fill="#334155"
          >
            {v}
          </text>
        ))}
      {marks.map((m) => (
        <g key={`m${m.value}`}>
          <circle cx={px(m.value)} cy={y} r="4.5" fill={m.color ?? '#2563eb'} />
          {m.label && (
            <text
              x={px(m.value)}
              y={y - 12}
              textAnchor="middle"
              fontSize={fontSize + 1}
              fontWeight="bold"
              fill={m.color ?? '#2563eb'}
            >
              {m.label}
            </text>
          )}
        </g>
      ))}
      {arrowAt !== undefined && (
        <g>
          <line x1={px(arrowAt)} y1={y - 34} x2={px(arrowAt)} y2={y - 10} stroke={N50_UNK} strokeWidth="2.5" />
          <path
            d={`M ${px(arrowAt) - 5} ${y - 14} L ${px(arrowAt)} ${y - 6} L ${px(arrowAt) + 5} ${y - 14} Z`}
            fill={N50_UNK}
          />
          <text x={px(arrowAt)} y={y - 38} textAnchor="middle" fontSize={fontSize + 4} fontWeight="900" fill={N50_UNK}>
            {arrowLabel}
          </text>
        </g>
      )}
    </g>
  );
};

/** Forint-érme (5, 10, 20 Ft). */
export const CoinPart: React.FC<{ cx: number; cy: number; value: 5 | 10 | 20; r?: number }> = ({
  cx,
  cy,
  value,
  r
}) => {
  const rad = r ?? (value === 20 ? 17 : value === 10 ? 15 : 13);
  const gold = value !== 10;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={rad}
        fill={gold ? '#fcd34d' : '#e2e8f0'}
        stroke={gold ? '#b45309' : '#475569'}
        strokeWidth="2.2"
      />
      <circle cx={cx} cy={cy} r={rad - 4} fill="none" stroke={gold ? '#d97706' : '#94a3b8'} strokeWidth="1" />
      <text
        x={cx}
        y={cy + rad * 0.36}
        textAnchor="middle"
        fontSize={rad * 0.95}
        fontWeight="900"
        fill={gold ? '#78350f' : '#1e293b'}
        fontFamily={N50_FONT}
      >
        {value}
      </text>
    </g>
  );
};

/** 10-es tojástartó (2 × 5 tojás). */
export const EggTrayPart: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="0" y="0" width="58" height="26" rx="5" fill="#d6a77a" stroke="#7c4a1e" strokeWidth="2" />
    {Array.from({ length: 10 }, (_, i) => (
      <ellipse
        key={i}
        cx={7 + (i % 5) * 11}
        cy={7 + Math.floor(i / 5) * 12}
        rx="4.2"
        ry="5"
        fill="#fff7ed"
        stroke="#9a3412"
        strokeWidth="1"
      />
    ))}
  </g>
);

/** Egy szabad tojás. */
export const EggPart: React.FC<{ cx: number; cy: number; s?: number }> = ({ cx, cy, s = 1 }) => (
  <ellipse cx={cx} cy={cy} rx={5 * s} ry={6.5 * s} fill="#fff7ed" stroke="#9a3412" strokeWidth={1.4 * s} />
);

// ---------------------------------------------------------------------------
// Interaktív laborok
// ---------------------------------------------------------------------------

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

type Msg = { ok: boolean; text: string } | null;

const btn =
  'px-4 py-2 rounded-xl font-black text-base min-h-[52px] min-w-[64px] border-2 active:scale-95 transition-transform';

/** Labor I: rakd ki a számot tízesrudakkal és egyeskockákkal. */
export const BlocksBuilderLab: React.FC = () => {
  const [target, setTarget] = React.useState<number>(34);
  const [tens, setTens] = React.useState<number>(0);
  const [ones, setOnes] = React.useState<number>(0);
  const [msg, setMsg] = React.useState<Msg>(null);

  const newTask = () => {
    let t = target;
    while (t === target) t = rnd(21, 50);
    setTarget(t);
    setTens(0);
    setOnes(0);
    setMsg(null);
  };

  const T = Math.floor(target / 10);
  const E = target % 10;

  const check = () => {
    const value = tens * 10 + ones;
    if (tens === T && ones === E) {
      setMsg({ ok: true, text: `Szuper! ${T} tízes és ${E} egyes: ${T * 10} + ${E} = ${target}.` });
    } else if (value === target) {
      setMsg({ ok: false, text: `Ez is ${target}, de 10 kocka helyett tegyél le 1 rudat! Mindig a lehető legtöbb rúd kell.` });
    } else if (tens === E && ones === T) {
      setMsg({ ok: false, text: 'Felcserélted! A rudak a tízesek, a kockák az egyesek.' });
    } else if (value < target) {
      setMsg({ ok: false, text: `Most ${value} van kirakva. Ez kevesebb, mint ${target}. Tegyél még hozzá!` });
    } else {
      setMsg({ ok: false, text: `Most ${value} van kirakva. Ez több, mint ${target}. Vegyél el!` });
    }
  };

  const change = (dt: number, de: number) => {
    setTens((v) => Math.max(0, Math.min(5, v + dt)));
    setOnes((v) => Math.max(0, Math.min(15, v + de)));
    setMsg(null);
  };

  const onesCols = Math.ceil(ones / 5);
  const blocksW = tens * 18 + (tens > 0 ? 14 : 0) + onesCols * 14;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-purple-200 dark:border-purple-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-purple-50 dark:bg-purple-950/50 rounded-xl p-3 text-center text-purple-950 dark:text-purple-100">
        Rakd ki ezt a számot:
        <span className="text-4xl font-black align-middle ml-3">{target}</span>
      </div>

      <svg viewBox="0 0 300 130" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
        <rect x="1" y="1" width="298" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <BlocksPart x={150 - blocksW / 2} y={14} tens={tens} ones={ones} unit={10} gap={8} />
        {tens === 0 && ones === 0 && (
          <text x="150" y="70" textAnchor="middle" fontSize="14" fill="#64748b">Még üres. Nyomd meg a gombokat!</text>
        )}
      </svg>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-purple-50 dark:bg-purple-950/40 p-2">
          <button type="button" onClick={() => change(-1, 0)} className={`${btn} bg-white text-purple-900 border-purple-300`}>−</button>
          <span className="font-black text-purple-900 dark:text-purple-200 text-center leading-tight">
            {tens}
            <br />
            <span className="text-xs">tízes</span>
          </span>
          <button type="button" onClick={() => change(1, 0)} className={`${btn} bg-purple-600 text-white border-purple-700`}>+</button>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 p-2">
          <button type="button" onClick={() => change(0, -1)} className={`${btn} bg-white text-emerald-900 border-emerald-300`}>−</button>
          <span className="font-black text-emerald-900 dark:text-emerald-200 text-center leading-tight">
            {ones}
            <br />
            <span className="text-xs">egyes</span>
          </span>
          <button type="button" onClick={() => change(0, 1)} className={`${btn} bg-emerald-600 text-white border-emerald-700`}>+</button>
        </div>
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const makeLineOptions = (n: number): number[] => {
  const cands = [n - 1, n + 1, (n % 10) * 10 + Math.floor(n / 10), n - 2, n + 2, n - 10, n + 10];
  const out: number[] = [n];
  for (const c of cands) {
    if (c >= 20 && c <= 50 && !out.includes(c)) out.push(c);
    if (out.length === 4) break;
  }
  return shuffle(out);
};

/** Labor II: számegyenes-nyomozó (hová mutat a nyíl, és kik a szomszédai?). */
export const NumberLineLab: React.FC = () => {
  const [n, setN] = React.useState<number>(37);
  const [opts, setOpts] = React.useState<number[]>(() => makeLineOptions(37));
  const [msg, setMsg] = React.useState<Msg>(null);
  const [solved, setSolved] = React.useState<boolean>(false);

  const newTask = () => {
    let k = n;
    while (k === n || k % 10 === 0) k = rnd(21, 49);
    setN(k);
    setOpts(makeLineOptions(k));
    setMsg(null);
    setSolved(false);
  };

  const swapped = (n % 10) * 10 + Math.floor(n / 10);

  const pick = (v: number) => {
    if (v === n) {
      setSolved(true);
      setMsg({ ok: true, text: `Igen, ez a ${n}!` });
    } else if (v === swapped) {
      setMsg({ ok: false, text: 'Felcserélted a tízest és az egyest! Nézd meg, melyik két kerek tízes között van a nyíl.' });
    } else if (Math.abs(v - n) <= 2) {
      setMsg({ ok: false, text: 'Majdnem! Számold meg újra a kis vonalakat a legközelebbi kerek tízestől.' });
    } else {
      setMsg({ ok: false, text: 'Nézd meg, melyik két kerek tízes között van a nyíl!' });
    }
  };

  const T = Math.floor(n / 10) * 10;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100 font-bold">
        Melyik számra mutat a piros nyíl?
      </div>
      <svg viewBox="0 0 360 100" className="w-full max-w-lg mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={N50_FONT}>
        <rect x="1" y="1" width="358" height="98" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <NumberLinePart
          x={18}
          y={62}
          width={316}
          from={20}
          to={50}
          labelEvery={5}
          arrowAt={n}
          arrowLabel={solved ? String(n) : '?'}
          fontSize={12}
          marks={solved ? [{ value: n - 1, color: '#0284c7' }, { value: n + 1, color: '#0284c7' }] : []}
        />
      </svg>
      <div className="flex flex-wrap justify-center gap-3">
        {opts.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => pick(v)}
            className="w-16 h-16 rounded-2xl text-2xl font-black border-2 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-600 active:scale-95"
          >
            {v}
          </button>
        ))}
      </div>
      {msg && (
        <div className={`rounded-xl p-3 text-center text-sm font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
          {msg.text}
        </div>
      )}
      {solved && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-sm font-bold">
          <div className="rounded-xl bg-sky-100 text-sky-900 p-2">Egyes szomszédok: {n - 1} &lt; {n} &lt; {n + 1}</div>
          <div className="rounded-xl bg-purple-100 text-purple-900 p-2">Tízes szomszédok: {T} &lt; {n} &lt; {T + 10}</div>
          <div className="rounded-xl bg-amber-100 text-amber-900 p-2">{n % 2 === 0 ? 'Páros szám' : 'Páratlan szám'}</div>
        </div>
      )}
      <div className="flex justify-center">
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]">
          Új feladat
        </button>
      </div>
    </div>
  );
};
