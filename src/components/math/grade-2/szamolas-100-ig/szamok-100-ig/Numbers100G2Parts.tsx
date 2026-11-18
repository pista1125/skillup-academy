import React from 'react';

// ---------------------------------------------------------------------------
// III. témakör (100-as számkör) – közös SVG-elemek
// Tízesrúd + egyeskocka, számegyenes, százas tábla, forintérmék.
// (A 2. és 3. lecke is ezeket használja.)
// ---------------------------------------------------------------------------

export const N100_FONT = 'system-ui, Segoe UI, sans-serif';

export const N100_COLORS = {
  rodFill: '#60a5fa',
  rodStroke: '#1e3a8a',
  cubeFill: '#fbbf24',
  cubeStroke: '#92400e',
  rod2Fill: '#4ade80',
  rod2Stroke: '#166534',
  cube2Fill: '#f472b6',
  cube2Stroke: '#9d174d',
  ink: '#0f172a',
  muted: '#475569',
  unknown: '#dc2626',
  cardBg: '#f8fafc',
  cardBorder: '#cbd5e1'
} as const;

/** A tízesrúd-egyeskocka ábra szélessége (px). */
export const rodsWidth = (tens: number, ones: number, u = 10): number => {
  const gap = Math.max(2, Math.round(u * 0.45));
  const rodsW = tens > 0 ? tens * (u + gap) - gap : 0;
  const cubeCols = Math.ceil(ones / 5);
  const cubesW = cubeCols > 0 ? cubeCols * (u + 2) - 2 : 0;
  return rodsW + (rodsW > 0 && cubesW > 0 ? gap * 2 : 0) + cubesW;
};

/**
 * Tízesrudak (10 szegmensű függőleges rúd) és egyeskockák (5-ös oszlopokban).
 * A rudak és kockák alja egy vonalban van; magasság = 10·u.
 */
export const RodsPart: React.FC<{
  x?: number;
  y?: number;
  tens: number;
  ones: number;
  u?: number;
  rodFill?: string;
  rodStroke?: string;
  cubeFill?: string;
  cubeStroke?: string;
  /** Az utolsó ennyi rudat áthúzzuk (elvétel). */
  crossTens?: number;
  /** Az utolsó ennyi kockát áthúzzuk (elvétel). */
  crossOnes?: number;
  strokeWidth?: number;
}> = ({
  x = 0,
  y = 0,
  tens,
  ones,
  u = 10,
  rodFill = N100_COLORS.rodFill,
  rodStroke = N100_COLORS.rodStroke,
  cubeFill = N100_COLORS.cubeFill,
  cubeStroke = N100_COLORS.cubeStroke,
  crossTens = 0,
  crossOnes = 0,
  strokeWidth = 1.4
}) => {
  const gap = Math.max(2, Math.round(u * 0.45));
  const rodsW = tens > 0 ? tens * (u + gap) - gap : 0;
  const cubeX0 = x + rodsW + (rodsW > 0 ? gap * 2 : 0);
  const bottom = y + 10 * u;
  return (
    <g>
      {Array.from({ length: tens }, (_, i) => {
        const rx = x + i * (u + gap);
        const crossed = i >= tens - crossTens;
        return (
          <g key={`r${i}`} opacity={crossed ? 0.45 : 1}>
            <rect x={rx} y={y} width={u} height={10 * u} rx={2} fill={rodFill} stroke={rodStroke} strokeWidth={strokeWidth} />
            {Array.from({ length: 9 }, (_, k) => (
              <line
                key={k}
                x1={rx}
                y1={y + (k + 1) * u}
                x2={rx + u}
                y2={y + (k + 1) * u}
                stroke={rodStroke}
                strokeWidth={0.8}
                opacity={0.7}
              />
            ))}
            {crossed && (
              <g stroke={N100_COLORS.unknown} strokeWidth={2.4} strokeLinecap="round">
                <line x1={rx - 2} y1={y + 2} x2={rx + u + 2} y2={bottom - 2} />
                <line x1={rx + u + 2} y1={y + 2} x2={rx - 2} y2={bottom - 2} />
              </g>
            )}
          </g>
        );
      })}
      {Array.from({ length: ones }, (_, i) => {
        const col = Math.floor(i / 5);
        const row = i % 5;
        const cx = cubeX0 + col * (u + 2);
        const cy = bottom - (row + 1) * (u + 1) + 1;
        const crossed = i >= ones - crossOnes;
        return (
          <g key={`c${i}`} opacity={crossed ? 0.45 : 1}>
            <rect x={cx} y={cy} width={u} height={u} rx={1.5} fill={cubeFill} stroke={cubeStroke} strokeWidth={strokeWidth} />
            {crossed && (
              <g stroke={N100_COLORS.unknown} strokeWidth={2} strokeLinecap="round">
                <line x1={cx - 1} y1={cy - 1} x2={cx + u + 1} y2={cy + u + 1} />
                <line x1={cx + u + 1} y1={cy - 1} x2={cx - 1} y2={cy + u + 1} />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

export interface LineMark {
  value: number;
  color?: string;
  label?: string;
  /** a jelölés felett mutató nyíl */
  arrow?: boolean;
}

export interface LineHop {
  from: number;
  to: number;
  color?: string;
  label?: string;
  /** az ív magassága */
  h?: number;
}

/**
 * Számegyenes `from`-tól `to`-ig, egyes osztással, `labelEvery` lépésenként felirattal.
 */
export const NumberLinePart: React.FC<{
  x?: number;
  y?: number;
  width: number;
  from: number;
  to: number;
  labelEvery?: number;
  tickEvery?: number;
  extraLabels?: number[];
  marks?: LineMark[];
  hops?: LineHop[];
  fontSize?: number;
  arrowHead?: boolean;
  /** a két végpont mindig kapjon-e feliratot */
  labelEnds?: boolean;
}> = ({
  x = 10,
  y = 60,
  width,
  from,
  to,
  labelEvery = 10,
  tickEvery = 1,
  extraLabels = [],
  marks = [],
  hops = [],
  fontSize = 11,
  arrowHead = true,
  labelEnds = true
}) => {
  const px = (v: number) => x + ((v - from) / (to - from)) * width;
  const ticks: number[] = [];
  for (let v = from; v <= to; v += tickEvery) ticks.push(v);
  const labels = ticks.filter(
    (v) => v % labelEvery === 0 || (labelEnds && (v === from || v === to)) || extraLabels.includes(v)
  );
  return (
    <g fontFamily={N100_FONT}>
      <line x1={x - 4} y1={y} x2={x + width + (arrowHead ? 10 : 4)} y2={y} stroke="#334155" strokeWidth={1.8} />
      {arrowHead && (
        <path d={`M ${x + width + 10} ${y - 4} L ${x + width + 16} ${y} L ${x + width + 10} ${y + 4} Z`} fill="#334155" />
      )}
      {ticks.map((v) => {
        const big = v % 10 === 0;
        const mid = v % 5 === 0;
        const t = big ? 7 : mid ? 5 : 3.5;
        return (
          <line
            key={v}
            x1={px(v)}
            y1={y - t}
            x2={px(v)}
            y2={y + t}
            stroke="#334155"
            strokeWidth={big ? 1.8 : 1}
          />
        );
      })}
      {labels.map((v) => (
        <text key={`l${v}`} x={px(v)} y={y + 9 + fontSize} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill={N100_COLORS.muted}>
          {v}
        </text>
      ))}
      {hops.map((hp, i) => {
        const x1 = px(hp.from);
        const x2 = px(hp.to);
        const h = hp.h ?? 26;
        const c = hp.color ?? '#2563eb';
        const mx = (x1 + x2) / 2;
        const dir = x2 >= x1 ? 1 : -1;
        return (
          <g key={`h${i}`}>
            <path d={`M ${x1} ${y - 4} Q ${mx} ${y - 4 - h * 1.6} ${x2} ${y - 4}`} fill="none" stroke={c} strokeWidth={2} />
            <polygon
              points={`${x2},${y - 3} ${x2 - dir * 9},${y - 7} ${x2 - dir * 3},${y - 13}`}
              fill={c}
            />
            {hp.label && (
              <text x={mx} y={y - 8 - h * 0.85} textAnchor="middle" fontSize={fontSize + 1} fontWeight="bold" fill={c}>
                {hp.label}
              </text>
            )}
          </g>
        );
      })}
      {marks.map((m, i) => {
        const c = m.color ?? N100_COLORS.unknown;
        const mx = px(m.value);
        return (
          <g key={`m${i}`}>
            <circle cx={mx} cy={y} r={4.5} fill={c} stroke="#ffffff" strokeWidth={1.2} />
            {m.arrow && (
              <path d={`M ${mx} ${y - 8} l -6 -12 l 12 0 Z`} fill={c} />
            )}
            {m.label && (
              <text
                x={mx}
                y={m.arrow ? y - 24 : y - 10}
                textAnchor="middle"
                fontSize={fontSize + 3}
                fontWeight="900"
                fill={c}
              >
                {m.label}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

/**
 * Százas tábla (1–100) részlete: `firstRow` (0-tól) sorától `rowCount` soron át.
 * A sorban r·10+1 … r·10+10 áll.
 */
export const HundredChartPart: React.FC<{
  x?: number;
  y?: number;
  cell?: number;
  firstRow?: number;
  rowCount?: number;
  highlight?: Record<number, string>;
  hidden?: number[];
  /** a rejtett cellák helyére kerülő szöveg (alapból "?") */
  hiddenLabel?: string;
  fontSize?: number;
}> = ({
  x = 0,
  y = 0,
  cell = 26,
  firstRow = 0,
  rowCount = 10,
  highlight = {},
  hidden = [],
  hiddenLabel = '?',
  fontSize
}) => {
  const fs = fontSize ?? Math.round(cell * 0.42);
  const cells: React.ReactNode[] = [];
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < 10; c++) {
      const n = (firstRow + r) * 10 + c + 1;
      const isHidden = hidden.includes(n);
      const fill = highlight[n] ?? (isHidden ? '#fee2e2' : c === 9 ? '#e0f2fe' : '#ffffff');
      cells.push(
        <g key={n}>
          <rect x={x + c * cell} y={y + r * cell} width={cell} height={cell} fill={fill} stroke="#94a3b8" strokeWidth={1} />
          <text
            x={x + c * cell + cell / 2}
            y={y + r * cell + cell / 2 + fs * 0.36}
            textAnchor="middle"
            fontSize={fs}
            fontWeight={isHidden || highlight[n] ? 900 : 600}
            fill={isHidden ? N100_COLORS.unknown : N100_COLORS.ink}
          >
            {isHidden ? hiddenLabel : n}
          </text>
        </g>
      );
    }
  }
  return <g fontFamily={N100_FONT}>{cells}</g>;
};

/** Forintérme (10, 20, 50, 100 Ft). */
export const CoinPart: React.FC<{ cx: number; cy: number; value: 10 | 20 | 50 | 100; r?: number }> = ({
  cx,
  cy,
  value,
  r = 16
}) => {
  const gold = value === 20;
  const big = value === 50 || value === 100;
  const rr = big ? r * 1.12 : r;
  const fill = gold ? '#fcd34d' : value === 100 ? '#e5e7eb' : '#d1d5db';
  const stroke = gold ? '#a16207' : '#4b5563';
  return (
    <g fontFamily={N100_FONT}>
      <circle cx={cx} cy={cy} r={rr} fill={fill} stroke={stroke} strokeWidth={2} />
      {value === 100 && <circle cx={cx} cy={cy} r={rr * 0.68} fill="#fcd34d" stroke="#a16207" strokeWidth={1.2} />}
      <circle cx={cx} cy={cy} r={rr - 3} fill="none" stroke={stroke} strokeWidth={0.8} opacity={0.6} />
      <text x={cx} y={cy + rr * 0.22} textAnchor="middle" fontSize={rr * 0.78} fontWeight="900" fill="#1f2937">
        {value}
      </text>
      <text x={cx} y={cy + rr * 0.68} textAnchor="middle" fontSize={rr * 0.36} fontWeight="bold" fill="#374151">
        Ft
      </text>
    </g>
  );
};

/** Helyiérték-táblázat (T | E) egy számmal vagy kérdőjellel. */
export const PlaceTablePart: React.FC<{
  x: number;
  y: number;
  tens: string;
  ones: string;
  w?: number;
}> = ({ x, y, tens, ones, w = 44 }) => (
  <g fontFamily={N100_FONT}>
    <rect x={x} y={y} width={w} height={22} fill="#38bdf8" stroke="#0369a1" />
    <rect x={x + w} y={y} width={w} height={22} fill="#fcd34d" stroke="#a16207" />
    <text x={x + w / 2} y={y + 16} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">tízes</text>
    <text x={x + w * 1.5} y={y + 16} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">egyes</text>
    <rect x={x} y={y + 22} width={w} height={32} fill="#e0f2fe" stroke="#0369a1" />
    <rect x={x + w} y={y + 22} width={w} height={32} fill="#fef9c3" stroke="#a16207" />
    <text x={x + w / 2} y={y + 46} textAnchor="middle" fontSize="22" fontWeight="900" fill={tens === '?' ? N100_COLORS.unknown : N100_COLORS.ink}>
      {tens}
    </text>
    <text x={x + w * 1.5} y={y + 46} textAnchor="middle" fontSize="22" fontWeight="900" fill={ones === '?' ? N100_COLORS.unknown : N100_COLORS.ink}>
      {ones}
    </text>
  </g>
);

// ---------------------------------------------------------------------------
// Interaktív laborok (1. lecke)
// ---------------------------------------------------------------------------

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export type LabMsg = { ok: boolean; text: string } | null;

export const LabMsgBox: React.FC<{ msg: LabMsg }> = ({ msg }) =>
  msg ? (
    <div
      className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${
        msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
      }`}
    >
      {msg.text}
    </div>
  ) : null;

export const LAB_BTN =
  'px-4 py-2 rounded-xl font-black text-sm sm:text-base min-h-[48px] min-w-[56px] transition-all active:scale-95';

/** Labor I: rakd ki a számot tízesrudakkal és egyeskockákkal. */
export const RodBuilderLab: React.FC = () => {
  const [target, setTarget] = React.useState<number>(73);
  const [tens, setTens] = React.useState(0);
  const [ones, setOnes] = React.useState(0);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const newTask = () => {
    let t = Math.random() < 0.1 ? 100 : rnd(51, 99);
    if (t === target) t = t === 99 ? 58 : t + 1;
    setTarget(t);
    setTens(0);
    setOnes(0);
    setMsg(null);
  };

  const tT = Math.floor(target / 10);
  const tE = target % 10;
  const value = tens * 10 + ones;

  const check = () => {
    if (ones >= 10) {
      setMsg({
        ok: false,
        text:
          value === target
            ? 'Jó a mennyiség! De 10 kocka = 1 rúd. Cseréld be a 10 kockát egy rúdra!'
            : 'Van 10 kockád! Cseréld be egy rúdra, úgy könnyebb számolni.'
      });
      return;
    }
    if (value === target) {
      setMsg({
        ok: true,
        text:
          target === 100
            ? 'Szuper! 10 rúd = 10 tízes = 100.'
            : `Szuper! ${target} = ${tT} tízes + ${tE} egyes = ${tT * 10} + ${tE}.`
      });
      return;
    }
    if (tens !== tT) {
      setMsg({
        ok: false,
        text:
          target === 100
            ? 'A 100-hoz 10 rúd kell!'
            : `Nézd a rudakat! A(z) ${target} első számjegye mutatja, hány tízes kell.`
      });
      return;
    }
    setMsg({
      ok: false,
      text: `A rudak jók! Most a kockákat számold meg: a(z) ${target} utolsó számjegye az egyesek száma.`
    });
  };

  const change = (fn: () => void) => {
    fn();
    setMsg(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-3 text-center text-blue-950 dark:text-blue-100">
        Rakd ki ezt a számot:
        <span className="text-3xl sm:text-4xl font-black align-middle ml-3">{target}</span>
      </div>
      <svg viewBox="0 0 340 150" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <rect x="1" y="1" width="338" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <RodsPart x={18} y={14} tens={tens} ones={ones} u={12} />
        {tens === 0 && ones === 0 && (
          <text x="170" y="80" textAnchor="middle" fontSize="14" fill="#64748b" fontFamily={N100_FONT}>
            Tegyél le rudakat és kockákat!
          </text>
        )}
      </svg>
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <div className="rounded-xl bg-blue-50 dark:bg-blue-950/40 p-2 flex flex-col items-center gap-2">
          <span className="font-black text-blue-900 dark:text-blue-200">Rúd (tízes): {tens}</span>
          <div className="flex gap-2">
            <button type="button" className={`${LAB_BTN} bg-slate-200 text-slate-800`} onClick={() => change(() => setTens((v) => Math.max(0, v - 1)))}>
              − 1
            </button>
            <button type="button" className={`${LAB_BTN} bg-blue-600 text-white`} onClick={() => change(() => setTens((v) => Math.min(10, v + 1)))}>
              + 1
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-amber-50 dark:bg-amber-950/40 p-2 flex flex-col items-center gap-2">
          <span className="font-black text-amber-900 dark:text-amber-200">Kocka (egyes): {ones}</span>
          <div className="flex gap-2">
            <button type="button" className={`${LAB_BTN} bg-slate-200 text-slate-800`} onClick={() => change(() => setOnes((v) => Math.max(0, v - 1)))}>
              − 1
            </button>
            <button type="button" className={`${LAB_BTN} bg-amber-500 text-white`} onClick={() => change(() => setOnes((v) => Math.min(19, v + 1)))}>
              + 1
            </button>
          </div>
        </div>
      </div>
      {ones >= 10 && tens < 10 && (
        <div className="flex justify-center">
          <button
            type="button"
            className={`${LAB_BTN} bg-emerald-600 text-white`}
            onClick={() =>
              change(() => {
                setOnes((v) => v - 10);
                setTens((v) => v + 1);
              })
            }
          >
            10 kocka → 1 rúd
          </button>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className={`${LAB_BTN} bg-blue-700 text-white px-6`}>
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className={`${LAB_BTN} bg-slate-200 text-slate-800 px-6`}>
          Új feladat
        </button>
      </div>
      <LabMsgBox msg={msg} />
    </div>
  );
};

type Dir = 'jobbra' | 'balra' | 'lefelé' | 'felfelé';

interface WalkTask {
  start: number;
  dir: Dir;
  steps: number;
  target: number;
}

const DIRS: Dir[] = ['jobbra', 'balra', 'lefelé', 'felfelé'];

const makeWalkTask = (): WalkTask => {
  for (;;) {
    const start = rnd(12, 89);
    const dir = DIRS[rnd(0, 3)];
    const steps = rnd(1, 3);
    const col = (start - 1) % 10;
    const row = Math.floor((start - 1) / 10);
    if (dir === 'jobbra' && col + steps <= 9) return { start, dir, steps, target: start + steps };
    if (dir === 'balra' && col - steps >= 0) return { start, dir, steps, target: start - steps };
    if (dir === 'lefelé' && row + steps <= 9) return { start, dir, steps, target: start + 10 * steps };
    if (dir === 'felfelé' && row - steps >= 0) return { start, dir, steps, target: start - 10 * steps };
  }
};

const RULE: Record<Dir, string> = {
  jobbra: 'Jobbra lépve mindig 1-gyel nő a szám.',
  balra: 'Balra lépve mindig 1-gyel csökken a szám.',
  lefelé: 'Lefelé lépve mindig 10-zel nő a szám.',
  felfelé: 'Felfelé lépve mindig 10-zel csökken a szám.'
};

/** Labor II: lépegetés a százas táblán. */
export const ChartWalkLab: React.FC = () => {
  const [task, setTask] = React.useState<WalkTask>({ start: 45, dir: 'lefelé', steps: 2, target: 65 });
  const [picked, setPicked] = React.useState<number | null>(null);
  const [msg, setMsg] = React.useState<LabMsg>(null);

  const chain = () => {
    const d = task.dir === 'jobbra' ? 1 : task.dir === 'balra' ? -1 : task.dir === 'lefelé' ? 10 : -10;
    return Array.from({ length: task.steps + 1 }, (_, i) => task.start + i * d).join(' → ');
  };

  const pick = (n: number) => {
    setPicked(n);
    if (n === task.target) {
      setMsg({ ok: true, text: `Igen! ${chain()}. ${RULE[task.dir]}` });
      return;
    }
    const sameRow = Math.floor((n - 1) / 10) === Math.floor((task.start - 1) / 10);
    const sameCol = (n - 1) % 10 === (task.start - 1) % 10;
    if ((task.dir === 'jobbra' || task.dir === 'balra') && !sameRow) {
      setMsg({ ok: false, text: `Ez nem jó sor! ${task.dir === 'jobbra' ? 'Jobbra' : 'Balra'} lépve a sorban maradsz.` });
      return;
    }
    if ((task.dir === 'lefelé' || task.dir === 'felfelé') && !sameCol) {
      setMsg({ ok: false, text: `Ez nem jó oszlop! ${task.dir === 'lefelé' ? 'Lefelé' : 'Felfelé'} lépve az oszlopban maradsz.` });
      return;
    }
    setMsg({ ok: false, text: `Majdnem! ${RULE[task.dir]} Számold meg újra a lépéseket!` });
  };

  const newTask = () => {
    setTask(makeWalkTask());
    setPicked(null);
    setMsg(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 text-center text-emerald-950 dark:text-emerald-100 space-y-1">
        <div>
          Kezdő szám: <span className="text-2xl sm:text-3xl font-black align-middle">{task.start}</span>
        </div>
        <div className="text-lg sm:text-xl font-black">
          Lépj {task.steps} mezőt {task.dir}!
        </div>
        <div className="text-xs sm:text-sm">Koppints arra a számra, ahová érkezel!</div>
      </div>
      <div className="grid grid-cols-10 gap-[2px] sm:gap-1 max-w-md mx-auto">
        {Array.from({ length: 100 }, (_, i) => {
          const n = i + 1;
          const isStart = n === task.start;
          const isPicked = n === picked;
          const cls = isPicked
            ? n === task.target
              ? 'bg-emerald-500 text-white border-emerald-700'
              : 'bg-rose-400 text-white border-rose-700'
            : isStart
              ? 'bg-yellow-300 text-slate-900 border-yellow-600'
              : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700';
          return (
            <button
              key={n}
              type="button"
              onClick={() => pick(n)}
              className={`aspect-square rounded-md border text-[11px] sm:text-sm font-black ${cls}`}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div className="flex justify-center">
        <button type="button" onClick={newTask} className={`${LAB_BTN} bg-slate-200 text-slate-800 px-6`}>
          Új feladat
        </button>
      </div>
      <LabMsgBox msg={msg} />
    </div>
  );
};
