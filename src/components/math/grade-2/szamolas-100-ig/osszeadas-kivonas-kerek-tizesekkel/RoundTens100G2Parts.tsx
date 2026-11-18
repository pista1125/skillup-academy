import React, { useState } from 'react';

export const RT_FONT = 'system-ui, Segoe UI, sans-serif';
export const RT_UNK = '#dc2626';

const darker: Record<string, string> = {
  '#f59e0b': '#92400e',
  '#3b82f6': '#1e3a8a',
  '#10b981': '#065f46',
  '#a855f7': '#581c87',
  '#ef4444': '#991b1b',
  '#cbd5e1': '#64748b'
};

/** A tízesrudak + egyeskockák teljes szélessége. */
export const rodsWidth = (rods: number, ones: number, rodW = 8, gap = 4, cube = 6) =>
  rods * (rodW + gap) + (ones > 0 ? Math.ceil(ones / 5) * (cube + 2) + 4 : 0);

/**
 * Tízesrudak és egyeskockák.
 * - `tens`: az eredeti rudak (narancs),
 * - `addTens`: hozzátett rudak (kék),
 * - `crossTens`: az eredeti rudakból jobbról ennyit áthúzunk (elvétel),
 * - `ones`: egyeskockák (zöld), 5-ös oszlopokban,
 * - `unknownTens`: szürke, „?”-es rudak (hiányzó rész).
 */
export const RodsPart: React.FC<{
  x?: number;
  y?: number;
  tens: number;
  ones?: number;
  addTens?: number;
  crossTens?: number;
  unknownTens?: number;
  cell?: number;
  rodW?: number;
  gap?: number;
  color?: string;
  addColor?: string;
  strokeW?: number;
}> = ({
  x = 10,
  y = 10,
  tens,
  ones = 0,
  addTens = 0,
  crossTens = 0,
  unknownTens = 0,
  cell = 6,
  rodW = 8,
  gap = 4,
  color = '#f59e0b',
  addColor = '#3b82f6',
  strokeW = 1.4
}) => {
  const rodH = cell * 10;
  const total = tens + addTens + unknownTens;
  const cube = cell;
  const onesX = x + total * (rodW + gap) + 2;
  return (
    <g>
      {Array.from({ length: total }, (_, i) => {
        const rx = x + i * (rodW + gap);
        const isAdd = i >= tens && i < tens + addTens;
        const isUnknown = i >= tens + addTens;
        const crossed = i < tens && i >= tens - crossTens;
        const fill = isUnknown ? '#e2e8f0' : isAdd ? addColor : color;
        const stroke = isUnknown ? '#94a3b8' : darker[fill] ?? '#334155';
        return (
          <g key={i} opacity={crossed ? 0.5 : 1}>
            <rect
              x={rx}
              y={y}
              width={rodW}
              height={rodH}
              rx="2"
              fill={fill}
              stroke={stroke}
              strokeWidth={strokeW}
              strokeDasharray={isUnknown ? '3 2' : undefined}
            />
            {!isUnknown &&
              Array.from({ length: 9 }, (_, k) => (
                <line
                  key={k}
                  x1={rx}
                  x2={rx + rodW}
                  y1={y + (k + 1) * cell}
                  y2={y + (k + 1) * cell}
                  stroke={stroke}
                  strokeOpacity="0.45"
                  strokeWidth="0.8"
                />
              ))}
            {crossed && (
              <line
                x1={rx - 3}
                y1={y + rodH + 3}
                x2={rx + rodW + 3}
                y2={y - 3}
                stroke="#dc2626"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            )}
          </g>
        );
      })}
      {unknownTens > 0 && (
        <text
          x={x + (tens + addTens) * (rodW + gap) + (unknownTens * (rodW + gap) - gap) / 2}
          y={y + rodH / 2 + 6}
          textAnchor="middle"
          fontSize={Math.max(14, cell * 3)}
          fontWeight="900"
          fill={RT_UNK}
          fontFamily={RT_FONT}
        >
          ?
        </text>
      )}
      {Array.from({ length: ones }, (_, j) => {
        const col = Math.floor(j / 5);
        const row = j % 5;
        return (
          <rect
            key={`o${j}`}
            x={onesX + col * (cube + 2)}
            y={y + rodH - (row + 1) * (cube + 1)}
            width={cube}
            height={cube}
            rx="1"
            fill="#10b981"
            stroke="#065f46"
            strokeWidth={strokeW * 0.8}
          />
        );
      })}
    </g>
  );
};

/** 0–100-as számegyenes tízesenkénti jelöléssel és tízes ugrásokkal. */
export const NumLine100Part: React.FC<{
  x0?: number;
  w?: number;
  y?: number;
  start?: number;
  hops?: number;
  dir?: 1 | -1;
  showEnd?: boolean;
  endLabel?: string;
  labelEvery?: number;
  fontSize?: number;
}> = ({
  x0 = 14,
  w = 232,
  y = 70,
  start,
  hops = 0,
  dir = 1,
  showEnd = true,
  endLabel = '?',
  labelEvery = 10,
  fontSize = 10
}) => {
  const X = (v: number) => x0 + (v / 100) * w;
  return (
    <g fontFamily={RT_FONT}>
      <line x1={X(0) - 3} y1={y} x2={X(100) + 4} y2={y} stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 21 }, (_, i) => i * 5).map((v) => (
        <line
          key={v}
          x1={X(v)}
          x2={X(v)}
          y1={v % 10 === 0 ? y - 7 : y - 4}
          y2={v % 10 === 0 ? y + 7 : y + 4}
          stroke="#334155"
          strokeWidth={v % 10 === 0 ? 1.8 : 1}
        />
      ))}
      {Array.from({ length: 100 / labelEvery + 1 }, (_, i) => i * labelEvery).map((v) => (
        <text key={`l${v}`} x={X(v)} y={y + 19} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill="#475569">
          {v}
        </text>
      ))}
      {start !== undefined && (
        <g>
          {Array.from({ length: hops }, (_, i) => {
            const a = start + dir * 10 * i;
            const b = a + dir * 10;
            const mid = (X(a) + X(b)) / 2;
            return (
              <path
                key={`h${i}`}
                d={`M ${X(a)} ${y - 5} Q ${mid} ${y - 32} ${X(b)} ${y - 5}`}
                fill="none"
                stroke={dir === 1 ? '#2563eb' : '#e11d48'}
                strokeWidth="2.2"
              />
            );
          })}
          {hops > 0 && (
            <text
              x={(X(start) + X(start + dir * 10 * hops)) / 2}
              y={y - 30}
              textAnchor="middle"
              fontSize="12"
              fontWeight="900"
              fill={dir === 1 ? '#1d4ed8' : '#be123c'}
            >
              {dir === 1 ? '+' : '−'}
              {10 * hops}
            </text>
          )}
          <circle cx={X(start)} cy={y} r="4.5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
          <text x={X(start)} y={y + 34} textAnchor="middle" fontSize="12" fontWeight="900" fill="#b45309">
            {start}
          </text>
          {showEnd && hops > 0 && (
            <g>
              <circle cx={X(start + dir * 10 * hops)} cy={y} r="4.5" fill={RT_UNK} />
              <text x={X(start + dir * 10 * hops)} y={y + 34} textAnchor="middle" fontSize="13" fontWeight="900" fill={RT_UNK}>
                {endLabel}
              </text>
            </g>
          )}
        </g>
      )}
    </g>
  );
};

const COIN_STYLE: Record<number, { r: number; fill: string; stroke: string; text: string }> = {
  10: { r: 13, fill: '#e2e8f0', stroke: '#64748b', text: '#334155' },
  20: { r: 14, fill: '#fcd34d', stroke: '#b45309', text: '#78350f' },
  50: { r: 15.5, fill: '#cbd5e1', stroke: '#334155', text: '#0f172a' },
  100: { r: 16.5, fill: '#fde68a', stroke: '#64748b', text: '#0f172a' }
};

/** Egy forintérme (10, 20, 50 vagy 100 Ft). */
export const CoinPart: React.FC<{ cx: number; cy: number; value: 10 | 20 | 50 | 100; scale?: number }> = ({
  cx,
  cy,
  value,
  scale = 1
}) => {
  const s = COIN_STYLE[value];
  const r = s.r * scale;
  return (
    <g fontFamily={RT_FONT}>
      <circle cx={cx} cy={cy} r={r} fill={s.fill} stroke={s.stroke} strokeWidth={2 * scale} />
      <circle cx={cx} cy={cy} r={r - 3 * scale} fill="none" stroke={s.stroke} strokeOpacity="0.5" strokeWidth={1 * scale} />
      <text x={cx} y={cy + 2 * scale} textAnchor="middle" fontSize={11 * scale} fontWeight="900" fill={s.text}>
        {value}
      </text>
      <text x={cx} y={cy + 9.5 * scale} textAnchor="middle" fontSize={5.5 * scale} fontWeight="bold" fill={s.text}>
        Ft
      </text>
    </g>
  );
};

/** Kérdésábra-keret. */
export const QFig: React.FC<{ children: React.ReactNode; h?: number; w?: number }> = ({ children, h = 110, w = 260 }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Nyíllánc: start → (op1) → □ → (op2) → ? */
export const ArrowChainPart: React.FC<{ y?: number; boxes: string[]; ops: string[]; w?: number }> = ({
  y = 40,
  boxes,
  ops,
  w = 260
}) => {
  const n = boxes.length;
  const bw = 44;
  const step = (w - 24 - bw) / (n - 1);
  return (
    <g fontFamily={RT_FONT}>
      {boxes.map((b, i) => {
        const bx = 12 + i * step;
        const isQ = b === '?' || b === '□';
        return (
          <g key={i}>
            <rect
              x={bx}
              y={y}
              width={bw}
              height="34"
              rx="8"
              fill={isQ ? '#fee2e2' : '#fef3c7'}
              stroke={isQ ? RT_UNK : '#d97706'}
              strokeWidth="2.2"
            />
            <text x={bx + bw / 2} y={y + 24} textAnchor="middle" fontSize="18" fontWeight="900" fill={isQ ? RT_UNK : '#78350f'}>
              {b}
            </text>
            {i < n - 1 && (
              <g>
                <line x1={bx + bw + 3} y1={y + 17} x2={bx + step - 6} y2={y + 17} stroke="#334155" strokeWidth="2" />
                <path
                  d={`M ${bx + step - 10} ${y + 12} L ${bx + step - 3} ${y + 17} L ${bx + step - 10} ${y + 22} Z`}
                  fill="#334155"
                />
                <text x={bx + bw / 2 + step / 2} y={y - 6} textAnchor="middle" fontSize="14" fontWeight="900" fill={ops[i]?.startsWith('−') ? '#be123c' : '#1d4ed8'}>
                  {ops[i]}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** Háromszintes számpiramis (3-2-1 tégla). */
export const PyramidPart: React.FC<{ cx?: number; y?: number; rows: string[][]; bw?: number; bh?: number }> = ({
  cx = 130,
  y = 12,
  rows,
  bw = 50,
  bh = 26
}) => (
  <g fontFamily={RT_FONT}>
    {rows.map((row, r) =>
      row.map((v, i) => {
        const x = cx - (row.length * bw) / 2 + i * bw;
        const isQ = v === '?';
        return (
          <g key={`${r}-${i}`}>
            <rect
              x={x}
              y={y + r * bh}
              width={bw}
              height={bh}
              fill={isQ ? '#fee2e2' : r === rows.length - 1 ? '#fef3c7' : '#ffedd5'}
              stroke="#b45309"
              strokeWidth="1.8"
            />
            <text x={x + bw / 2} y={y + r * bh + bh / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={isQ ? RT_UNK : '#78350f'}>
              {v}
            </text>
          </g>
        );
      })
    )}
  </g>
);

// ---------------------------------------------------------------------------
// Laborok
// ---------------------------------------------------------------------------

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export interface RodTask {
  start: number;
  op: '+' | '−';
  k: number; // hány tízes
}

/** Véletlen feladat: kétjegyű (vagy kerek tízes) ± kerek tízes, 0–100 között. */
export const makeRodTask = (): RodTask => {
  for (;;) {
    const op: '+' | '−' = Math.random() < 0.5 ? '+' : '−';
    const round = Math.random() < 0.35;
    const start = round ? rnd(1, 9) * 10 : rnd(11, 98);
    const k = rnd(1, 6);
    if (start % 10 === 0 && !round) continue;
    if (op === '+' && start + 10 * k <= 100) return { start, op, k };
    if (op === '−' && start - 10 * k >= 1) return { start, op, k };
  }
};

export const rodTaskAnswer = (t: RodTask) => (t.op === '+' ? t.start + 10 * t.k : t.start - 10 * t.k);

/** 4 válaszlehetőség: jó, egyesekhez számolt (tipikus hiba), ± 10. */
export const rodTaskOptions = (t: RodTask): number[] => {
  const ans = rodTaskAnswer(t);
  const onesMistake = t.op === '+' ? t.start + t.k : t.start - t.k;
  const cands = [onesMistake, ans + 10, ans - 10, ans + 1, ans - 1].filter(
    (v) => v >= 0 && v <= 100 && v !== ans
  );
  const uniq = Array.from(new Set(cands)).slice(0, 3);
  return shuffle([ans, ...uniq]);
};

const Msg: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div
      className={`rounded-xl p-3 text-center text-base font-bold ${
        msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
      }`}
    >
      {msg.text}
    </div>
  ) : null;

/** Labor I: tízesrudak hozzáadása és elvétele. */
export const RodsLab: React.FC = () => {
  const [task, setTask] = useState<RodTask>({ start: 47, op: '+', k: 3 });
  const [opts, setOpts] = useState<number[]>(() => rodTaskOptions({ start: 47, op: '+', k: 3 }));
  const [delta, setDelta] = useState(0); // + rudak vagy − rudak
  const [chosen, setChosen] = useState<number | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const baseTens = Math.floor(task.start / 10);
  const ones = task.start % 10;
  const curTens = baseTens + delta;
  const ans = rodTaskAnswer(task);
  const need = task.op === '+' ? task.k : -task.k;

  const newTask = () => {
    const t = makeRodTask();
    setTask(t);
    setOpts(rodTaskOptions(t));
    setDelta(0);
    setChosen(null);
    setMsg(null);
  };

  const check = () => {
    if (delta !== need) {
      setMsg({
        ok: false,
        text:
          task.op === '+'
            ? `Tegyél hozzá pontosan ${task.k} tízesrudat! Most ${Math.max(0, delta)} van kéken.`
            : `Vegyél el pontosan ${task.k} tízesrudat! Most ${Math.max(0, -delta)} van áthúzva.`
      });
      return;
    }
    if (chosen === null) {
      setMsg({ ok: false, text: 'A rudak jók! Most válaszd ki az eredményt!' });
      return;
    }
    if (chosen !== ans) {
      const onesMistake = task.op === '+' ? task.start + task.k : task.start - task.k;
      setMsg({
        ok: false,
        text:
          chosen === onesMistake
            ? `Vigyázz! ${task.k * 10} = ${task.k} tízes, nem ${task.k} egyes. A kockák nem változnak!`
            : `Számold meg a rudakat: ${curTens} tízes és ${ones} egyes. Próbáld újra!`
      });
      return;
    }
    setMsg({
      ok: true,
      text: `Szuper! ${task.start} ${task.op} ${task.k * 10} = ${ans}. ${baseTens} ${task.op} ${task.k} = ${curTens} tízes, és ${ones} egyes.`
    });
  };

  const shownTens = Math.max(baseTens, curTens);
  const w = rodsWidth(shownTens, ones, 14, 7, 9);

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
        Rakd ki rudakkal:{' '}
        <span className="text-3xl font-black align-middle ml-2">
          {task.start} {task.op} {task.k * 10} = ?
        </span>
      </div>

      <svg viewBox="0 0 340 120" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
        <rect x="1" y="1" width="338" height="118" rx="12" fill="#fffbeb" stroke="#fcd34d" />
        <RodsPart
          x={(340 - w) / 2}
          y={12}
          tens={baseTens}
          ones={ones}
          addTens={Math.max(0, delta)}
          crossTens={Math.max(0, -delta)}
          cell={9}
          rodW={14}
          gap={7}
          strokeW={1.6}
        />
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => {
            setDelta((d) => Math.max(-baseTens, d - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-rose-100 text-rose-900 font-bold text-base min-h-[52px]"
        >
          − 1 tízesrúd
        </button>
        <span className="px-3 py-2 font-black text-lg text-slate-700 dark:text-slate-200">
          {curTens} tízes + {ones} egyes
        </span>
        <button
          type="button"
          onClick={() => {
            setDelta((d) => Math.min(10 - baseTens, d + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-base min-h-[52px]"
        >
          + 1 tízesrúd
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Mennyi lett?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {opts.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setChosen(n);
                setMsg(null);
              }}
              className={`w-16 h-14 rounded-xl font-black text-xl border-2 transition-all ${
                chosen === n
                  ? 'bg-amber-500 text-white border-amber-700 scale-105'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-base font-bold min-h-[52px]">
          Ellenőrzés
        </button>
        <button type="button" onClick={newTask} className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
      <Msg msg={msg} />
    </div>
  );
};

export const makePrice = () => rnd(3, 10) * 10;

/** Labor II: fizess 10, 20 és 50 Ft-osokkal! */
export const CoinsLab: React.FC = () => {
  const [price, setPrice] = useState(70);
  const [purse, setPurse] = useState<(10 | 20 | 50)[]>([]);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const sum = purse.reduce((s, c) => s + c, 0);

  const add = (c: 10 | 20 | 50) => {
    if (purse.length >= 10) return;
    setPurse((p) => [...p, c]);
    setMsg(null);
  };

  const check = () => {
    if (purse.length === 0) {
      setMsg({ ok: false, text: 'Tegyél érméket a tálcára!' });
    } else if (sum === price) {
      setMsg({ ok: true, text: `Pontosan! ${purse.join(' + ')} = ${price} Ft. Próbáld másképp is!` });
    } else if (sum < price) {
      setMsg({ ok: false, text: `Most ${sum} Ft van a tálcán. Még ${price - sum} Ft hiányzik.` });
    } else {
      setMsg({ ok: false, text: `Most ${sum} Ft van a tálcán. Ez ${sum - price} Ft-tal több a kelleténél.` });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 text-center text-emerald-950 dark:text-emerald-100">
        A ceruza ára:
        <span className="text-3xl font-black align-middle ml-2">{price} Ft</span>
      </div>

      <svg viewBox="0 0 340 90" className="w-full max-w-md mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={RT_FONT}>
        <rect x="1" y="1" width="338" height="88" rx="12" fill="#f0fdf4" stroke="#86efac" />
        {purse.length === 0 && (
          <text x="170" y="52" textAnchor="middle" fontSize="15" fill="#64748b">
            Üres a tálca.
          </text>
        )}
        {purse.map((c, i) => (
          <CoinPart key={i} cx={28 + (i % 10) * 32} cy={45} value={c} scale={1.05} />
        ))}
      </svg>
      <p className="text-center text-lg font-black text-slate-700 dark:text-slate-200">Tálcán: {sum} Ft</p>

      <div className="flex flex-wrap justify-center gap-2">
        {([10, 20, 50] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => add(c)}
            className="px-4 py-2 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-lg min-h-[56px] min-w-[80px]"
          >
            + {c} Ft
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            setPurse((p) => p.slice(0, -1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-800 font-bold text-base min-h-[56px]"
        >
          Visszavesz
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-base font-bold min-h-[52px]">
          Ellenőrzés
        </button>
        <button
          type="button"
          onClick={() => {
            setPrice(makePrice());
            setPurse([]);
            setMsg(null);
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-base font-bold min-h-[52px]"
        >
          Új feladat
        </button>
      </div>
      <Msg msg={msg} />
    </div>
  );
};
