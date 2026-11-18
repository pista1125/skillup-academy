import React from 'react';

export const TIME_FONT = 'system-ui, Segoe UI, sans-serif';

export const WEEKDAYS = ['hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat', 'vasárnap'];
export const WEEKDAY_SHORT = ['H', 'K', 'Sz', 'Cs', 'P', 'Sz', 'V'];
export const MONTHS = [
  'január',
  'február',
  'március',
  'április',
  'május',
  'június',
  'július',
  'augusztus',
  'szeptember',
  'október',
  'november',
  'december'
];
export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const pt = (cx: number, cy: number, len: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return { x: cx + len * Math.sin(a), y: cy - len * Math.cos(a) };
};

/** Mutatós óra (SVG-csoport). A kismutató a percekkel együtt halad. */
export const ClockPart: React.FC<{
  cx: number;
  cy: number;
  r: number;
  hour?: number;
  minute?: number;
  showHands?: boolean;
  outer24?: boolean;
  numbers?: boolean;
  sector?: { from: number; to: number };
  rim?: string;
  face?: string;
  onNumberClick?: (n: number) => void;
}> = ({
  cx,
  cy,
  r,
  hour = 12,
  minute = 0,
  showHands = true,
  outer24 = false,
  numbers = true,
  sector,
  rim = '#2563eb',
  face = '#ffffff',
  onNumberClick
}) => {
  const hourDeg = ((hour % 12) + minute / 60) * 30;
  const minDeg = minute * 6;
  const hEnd = pt(cx, cy, r * 0.5, hourDeg);
  const mEnd = pt(cx, cy, r * 0.78, minDeg);
  let sectorPath: string | null = null;
  if (sector) {
    const span = sector.to - sector.from;
    if (span >= 60) {
      sectorPath = null;
    } else {
      const s = pt(cx, cy, r * 0.9, sector.from * 6);
      const e = pt(cx, cy, r * 0.9, sector.to * 6);
      const large = span > 30 ? 1 : 0;
      sectorPath = `M ${cx} ${cy} L ${s.x} ${s.y} A ${r * 0.9} ${r * 0.9} 0 ${large} 1 ${e.x} ${e.y} Z`;
    }
  }
  return (
    <g fontFamily={TIME_FONT}>
      <circle cx={cx} cy={cy} r={r} fill={face} stroke={rim} strokeWidth={Math.max(3, r * 0.09)} />
      {sector && sector.to - sector.from >= 60 && <circle cx={cx} cy={cy} r={r * 0.9} fill="#fde047" opacity="0.85" />}
      {sectorPath && <path d={sectorPath} fill="#fde047" opacity="0.85" />}
      {Array.from({ length: 60 }, (_, i) => {
        const big = i % 5 === 0;
        const a = pt(cx, cy, r * (big ? 0.8 : 0.86), i * 6);
        const b = pt(cx, cy, r * 0.93, i * 6);
        return (
          <line
            key={`t${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#334155"
            strokeWidth={big ? Math.max(1.6, r * 0.035) : Math.max(0.7, r * 0.012)}
            strokeLinecap="round"
          />
        );
      })}
      {numbers &&
        Array.from({ length: 12 }, (_, i) => {
          const n = i + 1;
          const p = pt(cx, cy, r * 0.64, n * 30);
          return (
            <text
              key={`n${n}`}
              x={p.x}
              y={p.y + r * 0.075}
              textAnchor="middle"
              fontSize={r * 0.21}
              fontWeight="bold"
              fill="#0f172a"
              onClick={onNumberClick ? () => onNumberClick(n) : undefined}
              style={onNumberClick ? { cursor: 'pointer' } : undefined}
            >
              {n}
            </text>
          );
        })}
      {onNumberClick &&
        Array.from({ length: 12 }, (_, i) => {
          const n = i + 1;
          const p = pt(cx, cy, r * 0.64, n * 30);
          return (
            <circle
              key={`hit${n}`}
              cx={p.x}
              cy={p.y}
              r={r * 0.15}
              fill="transparent"
              onClick={() => onNumberClick(n)}
              style={{ cursor: 'pointer' }}
            />
          );
        })}
      {outer24 &&
        Array.from({ length: 12 }, (_, i) => {
          const n = i + 13;
          const p = pt(cx, cy, r * 1.24, (i + 1) * 30);
          return (
            <text
              key={`o${n}`}
              x={p.x}
              y={p.y + r * 0.06}
              textAnchor="middle"
              fontSize={r * 0.17}
              fontWeight="bold"
              fill="#0e7490"
            >
              {n}
            </text>
          );
        })}
      {showHands && (
        <>
          <line x1={cx} y1={cy} x2={hEnd.x} y2={hEnd.y} stroke="#dc2626" strokeWidth={Math.max(3, r * 0.09)} strokeLinecap="round" />
          <line x1={cx} y1={cy} x2={mEnd.x} y2={mEnd.y} stroke="#1e293b" strokeWidth={Math.max(2, r * 0.05)} strokeLinecap="round" />
        </>
      )}
      <circle cx={cx} cy={cy} r={Math.max(2.5, r * 0.07)} fill="#1e293b" />
    </g>
  );
};

/** Digitális óra kijelzője (SVG-csoport). */
export const DigitalPart: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  color?: string;
}> = ({ x, y, w, h, text, color = '#22c55e' }) => (
  <g fontFamily="'Courier New', monospace">
    <rect x={x} y={y} width={w} height={h} rx={h * 0.22} fill="#f59e0b" stroke="#92400e" strokeWidth="2.5" />
    <rect x={x + w * 0.08} y={y + h * 0.16} width={w * 0.84} height={h * 0.68} rx={h * 0.12} fill="#0f172a" />
    <text
      x={x + w / 2}
      y={y + h * 0.66}
      textAnchor="middle"
      fontSize={Math.min(h * 0.46, (w * 0.78) / (Math.max(text.length, 4) * 0.62))}
      fontWeight="bold"
      fill={color}
    >
      {text}
    </text>
  </g>
);

/** Egy hónap naptárlapja (SVG-csoport). startDow: 0 = hétfő. */
export const CalendarPart: React.FC<{
  x: number;
  y: number;
  cell: number;
  days: number;
  startDow: number;
  title?: string;
  highlight?: Record<number, string>;
  onDayClick?: (d: number) => void;
}> = ({ x, y, cell, days, startDow, title, highlight = {}, onDayClick }) => {
  const rows = Math.ceil((startDow + days) / 7);
  const top = title ? cell * 0.9 : 0;
  return (
    <g fontFamily={TIME_FONT}>
      <rect
        x={x - 4}
        y={y - 4}
        width={cell * 7 + 8}
        height={top + cell * (rows + 1) + 8}
        rx="10"
        fill="#ffffff"
        stroke="#94a3b8"
        strokeWidth="1.5"
      />
      {title && (
        <>
          <rect x={x - 4} y={y - 4} width={cell * 7 + 8} height={cell * 0.9} rx="10" fill="#0ea5e9" />
          <text x={x + (cell * 7) / 2} y={y + cell * 0.5} textAnchor="middle" fontSize={cell * 0.48} fontWeight="bold" fill="#ffffff">
            {title}
          </text>
        </>
      )}
      {WEEKDAY_SHORT.map((d, i) => (
        <text
          key={`h${i}`}
          x={x + i * cell + cell / 2}
          y={y + top + cell * 0.68}
          textAnchor="middle"
          fontSize={cell * 0.4}
          fontWeight="bold"
          fill={i === 6 ? '#dc2626' : '#475569'}
        >
          {d}
        </text>
      ))}
      {Array.from({ length: days }, (_, k) => {
        const d = k + 1;
        const idx = startDow + k;
        const col = idx % 7;
        const row = Math.floor(idx / 7);
        const cx = x + col * cell + cell / 2;
        const cy = y + top + cell * (row + 1) + cell / 2;
        const hl = highlight[d];
        return (
          <g
            key={`d${d}`}
            onClick={onDayClick ? () => onDayClick(d) : undefined}
            style={onDayClick ? { cursor: 'pointer' } : undefined}
          >
            <rect
              x={cx - cell * 0.46}
              y={cy - cell * 0.46}
              width={cell * 0.92}
              height={cell * 0.92}
              rx={cell * 0.18}
              fill={hl ?? (onDayClick ? '#f1f5f9' : 'transparent')}
            />
            <text
              x={cx}
              y={cy + cell * 0.16}
              textAnchor="middle"
              fontSize={cell * 0.44}
              fontWeight="bold"
              fill={col === 6 ? '#dc2626' : '#0f172a'}
            >
              {d}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Kiírja az időt: „7 óra 30 perc” vagy „7 óra”. */
export const timeText = (h: number, m: number) => (m === 0 ? `${h} óra` : `${h} óra ${m} perc`);

// ---------------------------------------------------------------------------
// Labor I: óraállító
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const MIN_CHOICES = [0, 0, 30, 30, 15, 45, 10, 20, 25, 40, 50, 5, 35, 55];

interface ClockTask {
  h: number;
  m: number;
}

const makeClockTask = (): ClockTask => ({ h: rnd(1, 23), m: MIN_CHOICES[rnd(0, MIN_CHOICES.length - 1)] });

const h12 = (h: number) => (h % 12 === 0 ? 12 : h % 12);

export const ClockSetterLab: React.FC = () => {
  const [task, setTask] = React.useState<ClockTask>({ h: 8, m: 30 });
  const [total, setTotal] = React.useState<number>(12 * 60);
  const [mode, setMode] = React.useState<'hour' | 'minute'>('hour');
  const [msg, setMsg] = React.useState<{ ok: boolean; text: string } | null>(null);

  const hour = Math.floor(total / 60) % 24;
  const minute = total % 60;
  const shift = (d: number) => {
    setTotal((t) => (t + d + 1440) % 1440);
    setMsg(null);
  };

  const onNumber = (n: number) => {
    if (mode === 'hour') {
      const pm = hour >= 12;
      setTotal(((n % 12) + (pm ? 12 : 0)) * 60 + minute);
    } else {
      setTotal(hour * 60 + ((n * 5) % 60));
    }
    setMsg(null);
  };

  const newTask = () => {
    setTask(makeClockTask());
    setTotal(12 * 60);
    setMsg(null);
  };

  const check = () => {
    const th = h12(task.h);
    const ch = h12(hour);
    if (ch === th && minute === task.m) {
      setMsg({ ok: true, text: `Szuper! Ez ${timeText(task.h, task.m)}. A kismutató az órát, a nagymutató a percet mutatja.` });
      return;
    }
    if (task.m !== 0 && ch === task.m / 5 && minute === (th * 5) % 60) {
      setMsg({ ok: false, text: 'Felcserélted a mutatókat! A rövid piros mutató az órát, a hosszú fekete a percet mutatja.' });
      return;
    }
    if (minute !== task.m) {
      const pos = task.m === 0 ? 12 : task.m / 5;
      setMsg({
        ok: false,
        text: `A hosszú nagymutató a perceket mutatja. Minden szám 5 perc. ${task.m} percnél a nagymutató a ${pos} számnál van.`
      });
      return;
    }
    const next = th === 12 ? 1 : th + 1;
    setMsg({
      ok: false,
      text:
        task.m === 0
          ? `A perc jó! Most a piros kismutatót vidd a ${th} számhoz.`
          : `A perc jó! ${th} óra után a piros kismutató a ${th} és a ${next} között jár.`
    });
  };

  const btn = 'px-4 py-2 rounded-xl font-black text-base min-h-[48px] min-w-[56px]';

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-amber-50 dark:bg-amber-950/50 rounded-xl p-3 text-center text-amber-950 dark:text-amber-100">
        Állítsd be az órát:
        <div className="text-2xl sm:text-3xl font-black mt-1">{timeText(task.h, task.m)}</div>
      </div>

      <svg viewBox="0 0 220 220" className="w-full max-w-[260px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <ClockPart cx={110} cy={110} r={100} hour={hour} minute={minute} rim="#d97706" onNumberClick={onNumber} />
      </svg>

      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode('hour')}
          className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${
            mode === 'hour' ? 'bg-red-600 text-white border-red-800' : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          Koppintásra: kismutató
        </button>
        <button
          type="button"
          onClick={() => setMode('minute')}
          className={`px-4 py-2 rounded-xl text-sm font-bold min-h-[48px] border-2 ${
            mode === 'minute' ? 'bg-slate-800 text-white border-slate-900' : 'bg-slate-100 text-slate-800 border-slate-300'
          }`}
        >
          Koppintásra: nagymutató
        </button>
      </div>
      <p className="text-center text-xs sm:text-sm text-slate-600 dark:text-slate-300">
        Koppints egy számra az órán, vagy használd a gombokat!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
        <div className="rounded-xl bg-red-50 dark:bg-red-950/40 p-2 text-center space-y-2">
          <div className="text-sm font-bold text-red-800 dark:text-red-200">Kismutató (óra)</div>
          <div className="flex justify-center gap-2">
            <button type="button" onClick={() => shift(-60)} className={`${btn} bg-red-100 text-red-900`}>
              − 1 óra
            </button>
            <button type="button" onClick={() => shift(60)} className={`${btn} bg-red-600 text-white`}>
              + 1 óra
            </button>
          </div>
        </div>
        <div className="rounded-xl bg-slate-100 dark:bg-slate-800 p-2 text-center space-y-2">
          <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Nagymutató (perc)</div>
          <div className="flex justify-center gap-2">
            <button type="button" onClick={() => shift(-5)} className={`${btn} bg-slate-200 text-slate-900`}>
              − 5 perc
            </button>
            <button type="button" onClick={() => shift(5)} className={`${btn} bg-slate-800 text-white`}>
              + 5 perc
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-sm font-bold text-slate-700 dark:text-slate-200">
        Az órád most: {timeText(h12(hour), minute)} vagy {timeText(h12(hour) + 12, minute)}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold min-h-[48px]">
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

// ---------------------------------------------------------------------------
// Labor II: naptárjáték
// ---------------------------------------------------------------------------
const WEEKDAY_ON = ['hétfőjére', 'keddjére', 'szerdájára', 'csütörtökjére', 'péntekjére', 'szombatjára', 'vasárnapjára'];
const ORDINALS = ['első', 'második', 'harmadik'];

type CalKind = 'week' | 'later' | 'nth' | 'last';

interface CalTask {
  month: number;
  startDow: number;
  kind: CalKind;
  today: number;
  k: number;
  wd: number;
  nth: number;
}

const makeCalTask = (): CalTask => {
  const month = rnd(0, 11);
  const kinds: CalKind[] = ['week', 'later', 'nth', 'last', 'week', 'nth'];
  return {
    month,
    startDow: rnd(0, 6),
    kind: kinds[rnd(0, kinds.length - 1)],
    today: rnd(1, MONTH_DAYS[month] - 7),
    k: rnd(2, 5),
    wd: rnd(0, 6),
    nth: rnd(0, 2)
  };
};

const calTarget = (t: CalTask) => {
  const days = MONTH_DAYS[t.month];
  if (t.kind === 'week') return t.today + 7;
  if (t.kind === 'later') return t.today + t.k;
  if (t.kind === 'last') return days;
  const first = ((t.wd - t.startDow + 7) % 7) + 1;
  return first + 7 * t.nth;
};

export const CalendarLab: React.FC = () => {
  const [task, setTask] = React.useState<CalTask>({ month: 4, startDow: 3, kind: 'week', today: 9, k: 3, wd: 1, nth: 1 });
  const [picked, setPicked] = React.useState<number | null>(null);
  const [msg, setMsg] = React.useState<{ ok: boolean; text: string } | null>(null);

  const days = MONTH_DAYS[task.month];
  const name = MONTHS[task.month];
  const target = calTarget(task);
  const dowOf = (d: number) => (task.startDow + d - 1) % 7;

  const prompt =
    task.kind === 'week'
      ? `Ma ${name} ${task.today}. van. Koppints arra a napra, amely pontosan 1 hét múlva lesz!`
      : task.kind === 'later'
        ? `Ma ${name} ${task.today}. van. Koppints arra a napra, amely ${task.k} nap múlva lesz!`
        : task.kind === 'nth'
          ? `Koppints ${name} ${ORDINALS[task.nth]} ${WEEKDAY_ON[task.wd]}!`
          : `Koppints ${name} utolsó napjára!`;

  const onDay = (d: number) => {
    setPicked(d);
    if (d === target) {
      const extra =
        task.kind === 'week'
          ? ` ${task.today} + 7 = ${target}. Ugyanaz a nap: ${WEEKDAYS[dowOf(target)]}.`
          : task.kind === 'later'
            ? ` ${task.today} + ${task.k} = ${target}, ${WEEKDAYS[dowOf(target)]}.`
            : task.kind === 'last'
              ? ` A ${name} ${days} napos.`
              : ` Ez ${name} ${target}.`;
      setMsg({ ok: true, text: `Ügyes vagy!${extra}` });
      return;
    }
    if (task.kind === 'week') {
      setMsg({ ok: false, text: `1 hét = 7 nap. Ugyanabban az oszlopban keresd, egy sorral lejjebb!` });
    } else if (task.kind === 'later') {
      setMsg({ ok: false, text: `Lépj ${task.k} napot jobbra! A sor végén a következő sor elején folytasd.` });
    } else if (task.kind === 'last') {
      setMsg({ ok: false, text: `Nézd meg, melyik az utolsó szám a naptárlapon!` });
    } else if (dowOf(d) === task.wd) {
      setMsg({ ok: false, text: `Ez is ${WEEKDAYS[task.wd]}, de nem a(z) ${ORDINALS[task.nth]}! Számold meg az oszlopban felülről.` });
    } else {
      setMsg({ ok: false, text: `Ez ${WEEKDAYS[dowOf(d)]}. Keresd a(z) „${WEEKDAY_SHORT[task.wd]}” oszlopot!` });
    }
  };

  const newTask = () => {
    setTask(makeCalTask());
    setPicked(null);
    setMsg(null);
  };

  const highlight: Record<number, string> = {};
  if (task.kind === 'week' || task.kind === 'later') highlight[task.today] = '#fde68a';
  if (picked !== null) highlight[picked] = picked === target ? '#86efac' : '#fca5a5';

  const rows = Math.ceil((task.startDow + days) / 7);
  const cell = 40;
  const h = cell * 0.9 + cell * (rows + 1) + 20;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100 text-base sm:text-lg font-bold">
        {prompt}
      </div>
      <svg viewBox={`0 0 ${cell * 7 + 20} ${h}`} className="w-full max-w-[360px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg">
        <CalendarPart
          x={10}
          y={10}
          cell={cell}
          days={days}
          startDow={task.startDow}
          title={name.toUpperCase()}
          highlight={highlight}
          onDayClick={onDay}
        />
      </svg>
      <div className="flex justify-center">
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
