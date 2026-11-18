import React, { useState } from 'react';
import { RT_FONT, RT_UNK, RodsPart, rodsWidth, makeRodTask, rodTaskAnswer } from '../osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2Parts';

export { RodsPart, rodsWidth, NumLine100Part, CoinPart, ArrowChainPart, PyramidPart } from '../osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2Parts';
export { BarPart, CompareBarsPart, IconPart } from '../szoveges-feladatok/WordProblems100G2Parts';

export const EX_FONT = RT_FONT;
export const EX_UNK = RT_UNK;

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
export const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 110 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={EX_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#ecfeff" stroke="#a5f3fc" />
    {children}
  </svg>
);

/** Tízesrudak + egyeskockák középre igazítva. */
export const RodsFig: React.FC<{ tens: number; ones?: number; add?: number; cross?: number; caption?: string }> = ({
  tens,
  ones = 0,
  add = 0,
  cross = 0,
  caption
}) => {
  const w = rodsWidth(tens + add, ones, 11, 6, 7);
  return (
    <QFig h={caption ? 112 : 92}>
      <RodsPart x={(260 - w) / 2} y={12} tens={tens} ones={ones} addTens={add} crossTens={cross} cell={7} rodW={11} gap={6} strokeW={1.5} />
      {caption && (
        <text x="130" y="102" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
          {caption}
        </text>
      )}
    </QFig>
  );
};

/** Számegyenes-részlet `from`–`to` között, egyesével beosztva; jelölések és ugrások. */
export const MarkLineFig: React.FC<{
  from: number;
  to: number;
  labelEvery?: number;
  marks?: { v: number; label: string }[];
  hops?: { from: number; to: number; label: string }[];
}> = ({ from, to, labelEvery, marks = [], hops = [] }) => {
  const x0 = 18;
  const w = 224;
  const span = to - from;
  const unit = span > 20 ? 5 : 1;
  const X = (v: number) => x0 + ((v - from) / span) * w;
  const y = hops.length ? 62 : 54;
  const tickFont = span > 50 ? 10 : 13;
  const every = labelEvery ?? (span > 20 ? 10 : span);
  const ticks: number[] = [];
  for (let v = from; v <= to; v += unit) ticks.push(v);
  return (
    <QFig h={hops.length ? 110 : 94}>
      <line x1={X(from) - 6} y1={y} x2={X(to) + 8} y2={y} stroke="#334155" strokeWidth="2" />
      <path d={`M ${X(to) + 8} ${y - 4} L ${X(to) + 14} ${y} L ${X(to) + 8} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => (
        <line key={v} x1={X(v)} x2={X(v)} y1={(v - from) % every === 0 ? y - 8 : y - 5} y2={(v - from) % every === 0 ? y + 8 : y + 5} stroke="#334155" strokeWidth={(v - from) % every === 0 ? 2 : 1.2} />
      ))}
      {ticks
        .filter((v) => (v - from) % every === 0)
        .map((v) => (
          <text key={`l${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize={tickFont} fontWeight="bold" fill="#475569">
            {v}
          </text>
        ))}
      {hops.map((h, i) => (
        <g key={`h${i}`}>
          <path d={`M ${X(h.from)} ${y - 5} Q ${(X(h.from) + X(h.to)) / 2} ${y - 40} ${X(h.to)} ${y - 5}`} fill="none" stroke={i === 0 ? '#16a34a' : '#2563eb'} strokeWidth="2.2" />
          <text x={(X(h.from) + X(h.to)) / 2} y={y - 30} textAnchor="middle" fontSize="13" fontWeight="900" fill={i === 0 ? '#15803d' : '#1d4ed8'}>
            {h.label}
          </text>
        </g>
      ))}
      {hops.length > 0 && (
        <g>
          <circle cx={X(hops[0].from)} cy={y} r="5" fill="#f59e0b" stroke="#92400e" strokeWidth="1.5" />
          <text x={X(hops[0].from)} y={y + 22} textAnchor="middle" fontSize="14" fontWeight="900" fill="#b45309">
            {hops[0].from}
          </text>
        </g>
      )}
      {marks.map((m, i) => (
        <g key={`m${i}`}>
          <circle cx={X(m.v)} cy={y} r="5" fill={m.label === '?' ? EX_UNK : '#0891b2'} />
          <text x={X(m.v)} y={hops.length ? y + 40 : y - 12} textAnchor="middle" fontSize="15" fontWeight="900" fill={m.label === '?' ? EX_UNK : '#0e7490'}>
            {m.label}
          </text>
        </g>
      ))}
    </QFig>
  );
};

export type WindowAsk = 'up' | 'down' | 'left' | 'right' | 'downRight' | 'center';

/** Százas táblázat 3 × 3-as részlete. A kérdezett mező „?”, a többi üres vagy kitöltött. */
export const WindowFig: React.FC<{ center: number; ask: WindowAsk; small?: boolean }> = ({ center, ask, small }) => {
  const cells: { dr: number; dc: number }[] = [];
  for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) cells.push({ dr, dc });
  const askPos: Record<WindowAsk, [number, number]> = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1],
    downRight: [1, 1],
    center: [0, 0]
  };
  const [ar, ac] = askPos[ask];
  const cs = small ? 22 : 36;
  const W = small ? 80 : 260;
  const H = small ? 80 : 124;
  const x0 = (W - 3 * cs) / 2;
  const y0 = (H - 3 * cs) / 2;
  const content = (
    <g fontFamily={EX_FONT}>
      {cells.map(({ dr, dc }) => {
        const isAsk = dr === ar && dc === ac;
        const isCenter = dr === 0 && dc === 0;
        const show = isCenter && ask !== 'center';
        return (
          <g key={`${dr}${dc}`}>
            <rect
              x={x0 + (dc + 1) * cs}
              y={y0 + (dr + 1) * cs}
              width={cs}
              height={cs}
              fill={isAsk ? '#fee2e2' : show ? '#cffafe' : '#fff'}
              stroke="#0e7490"
              strokeWidth={small ? 2 : 1.8}
            />
            {(show || isAsk) && (
              <text x={x0 + (dc + 1.5) * cs} y={y0 + (dr + 1.5) * cs + (small ? 4 : 6)} textAnchor="middle" fontSize={small ? 11 : 16} fontWeight="900" fill={isAsk ? EX_UNK : '#0f172a'}>
                {isAsk ? '?' : center}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
  if (small) {
    return (
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="74" height="74" rx="10" fill="#ecfeff" stroke="#334155" strokeWidth="3" />
        {content}
      </svg>
    );
  }
  return <QFig h={H}>{content}</QFig>;
};

/** Ismert középső szám nélküli ablak: a megadott szomszédok látszanak, a közép „?”. */
export const WindowCenterFig: React.FC<{ center: number }> = ({ center }) => {
  const cs = 36;
  const x0 = (260 - 3 * cs) / 2;
  const y0 = 8;
  const vals: Record<string, number> = { '-10': center - 10, '01': center + 1, '0-1': center - 1, '10': center + 10 };
  return (
    <QFig h={124}>
      {[-1, 0, 1].map((dr) =>
        [-1, 0, 1].map((dc) => {
          const key = `${dr}${dc}`;
          const isC = dr === 0 && dc === 0;
          const v = vals[key];
          return (
            <g key={key}>
              <rect x={x0 + (dc + 1) * cs} y={y0 + (dr + 1) * cs} width={cs} height={cs} fill={isC ? '#fee2e2' : v !== undefined ? '#cffafe' : '#fff'} stroke="#0e7490" strokeWidth="1.8" />
              {(isC || v !== undefined) && (
                <text x={x0 + (dc + 1.5) * cs} y={y0 + (dr + 1.5) * cs + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={isC ? EX_UNK : '#0f172a'}>
                  {isC ? '?' : v}
                </text>
              )}
            </g>
          );
        })
      )}
    </QFig>
  );
};

/** 3 × 3-as bűvös négyzet; '' = üres, '?' = kérdés. */
export const MagicSquareFig: React.FC<{ grid: (number | string)[][] }> = ({ grid }) => {
  const cs = 38;
  const x0 = (260 - 3 * cs) / 2;
  return (
    <QFig h={130}>
      {grid.map((row, r) =>
        row.map((v, c) => (
          <g key={`${r}${c}`}>
            <rect x={x0 + c * cs} y={8 + r * cs} width={cs} height={cs} fill={v === '?' ? '#fee2e2' : v === '' ? '#fff' : '#fef9c3'} stroke="#a16207" strokeWidth="2" />
            <text x={x0 + c * cs + cs / 2} y={8 + r * cs + cs / 2 + 6} textAnchor="middle" fontSize="16" fontWeight="900" fill={v === '?' ? EX_UNK : '#0f172a'}>
              {v}
            </text>
          </g>
        ))
      )}
    </QFig>
  );
};

/** Számkártyák sorban. */
export const CardsFig: React.FC<{ items: string[]; digit?: boolean }> = ({ items, digit }) => {
  const bw = digit ? 44 : 40;
  const gap = digit ? 18 : 8;
  const x0 = 130 - (items.length * bw + (items.length - 1) * gap) / 2;
  return (
    <QFig h={72}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (bw + gap)} y="14" width={bw} height="42" rx="8" fill={t === '?' ? '#fee2e2' : digit ? '#e0f2fe' : '#fef3c7'} stroke={t === '?' ? EX_UNK : digit ? '#0369a1' : '#d97706'} strokeWidth="2.2" />
          <text x={x0 + i * (bw + gap) + bw / 2} y="43" textAnchor="middle" fontSize={digit ? 24 : 18} fontWeight="900" fill={t === '?' ? EX_UNK : '#0f172a'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** Helyiérték-táblázat (tízes | egyes) soronként: [jel, tízes, egyes]. */
export const PlaceTableFig: React.FC<{ rows: [string, string, string][] }> = ({ rows }) => (
  <QFig h={46 + rows.length * 30}>
    <rect x="70" y="10" width="60" height="26" fill="#ffedd5" stroke="#b45309" strokeWidth="1.5" />
    <rect x="130" y="10" width="60" height="26" fill="#d1fae5" stroke="#047857" strokeWidth="1.5" />
    <text x="100" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">tízes</text>
    <text x="160" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#065f46">egyes</text>
    {rows.map(([sign, t, e], i) => {
      const y = 36 + i * 30;
      return (
        <g key={i}>
          <text x="52" y={y + 21} textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">{sign}</text>
          <rect x="70" y={y} width="60" height="30" fill="#fff" stroke="#b45309" strokeWidth="1.5" />
          <rect x="130" y={y} width="60" height="30" fill="#fff" stroke="#047857" strokeWidth="1.5" />
          <text x="100" y={y + 22} textAnchor="middle" fontSize="20" fontWeight="900" fill={t === '?' ? EX_UNK : '#0f172a'}>{t}</text>
          <text x="160" y={y + 22} textAnchor="middle" fontSize="20" fontWeight="900" fill={e === '?' ? EX_UNK : '#0f172a'}>{e}</text>
        </g>
      );
    })}
  </QFig>
);

/** Szabálytáblázat: felső sor be, alsó sor ki. */
export const RuleTableFig: React.FC<{ top: string[]; bottom: string[] }> = ({ top, bottom }) => {
  const cw = 44;
  const x0 = (260 - (top.length + 1) * cw) / 2;
  const cell = (x: number, y: number, v: string, head?: boolean) => (
    <g>
      <rect x={x} y={y} width={cw} height="32" fill={head ? '#cffafe' : v === '?' ? '#fee2e2' : '#fff'} stroke="#0e7490" strokeWidth="1.8" />
      <text x={x + cw / 2} y={y + 22} textAnchor="middle" fontSize={head ? 13 : 16} fontWeight="900" fill={v === '?' ? EX_UNK : '#0f172a'}>
        {v}
      </text>
    </g>
  );
  return (
    <QFig h={86}>
      {cell(x0, 10, 'be', true)}
      {cell(x0, 42, 'ki', true)}
      {top.map((v, i) => (
        <g key={`t${i}`}>{cell(x0 + (i + 1) * cw, 10, v)}</g>
      ))}
      {bottom.map((v, i) => (
        <g key={`b${i}`}>{cell(x0 + (i + 1) * cw, 42, v)}</g>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Vegyes feladatgenerátor (Labor I)
// ---------------------------------------------------------------------------
export type ExamKind = 'place' | 'neighbor' | 'add' | 'sub' | 'tens' | 'missing' | 'biggest';

export const EXAM_G2_TASK_KINDS: { id: ExamKind; label: string }[] = [
  { id: 'place', label: 'Helyiérték' },
  { id: 'neighbor', label: 'Szomszédok' },
  { id: 'add', label: 'Összeadás' },
  { id: 'sub', label: 'Kivonás' },
  { id: 'tens', label: 'Kerek tízesek' },
  { id: 'missing', label: 'Hiányzó szám' },
  { id: 'biggest', label: 'Legnagyobb' }
];

export interface ExamTask {
  kind: ExamKind;
  text: string;
  answer: number;
  options: number[];
  hint: string;
}

const finishOptions = (answer: number, cands: number[]) => {
  const uniq = Array.from(new Set(cands.filter((v) => v >= 0 && v <= 100 && v !== answer)));
  const fill = [answer + 1, answer - 1, answer + 10, answer - 10, answer + 2, answer - 2, answer - 20, answer + 20].filter((v) => v >= 0 && v <= 100 && v !== answer && !uniq.includes(v));
  return shuffle([answer, ...[...uniq, ...fill].slice(0, 3)]);
};

export const makeExamG2Task = (kind: ExamKind = pick(EXAM_G2_TASK_KINDS).id): ExamTask => {
  switch (kind) {
    case 'place': {
      const t = rnd(1, 9);
      const e = rnd(1, 9);
      const ans = 10 * t + e;
      return { kind, text: `${e} egyes és ${t} tízes. Melyik szám ez?`, answer: ans, options: finishOptions(ans, [10 * e + t, t + e]), hint: 'Előbb a tízesek, aztán az egyesek: a tízes áll elöl!' };
    }
    case 'neighbor': {
      const n = rnd(2, 98);
      return { kind, text: `Melyik szám hiányzik? ${n - 1}, □, ${n + 1}`, answer: n, options: finishOptions(n, [n + 10, n - 10, n + 2]), hint: 'A két szomszéd között egyesével lépünk.' };
    }
    case 'add': {
      for (;;) {
        const a = rnd(11, 79);
        const b = rnd(3, 39);
        if (a + b <= 100) {
          const crossing = (a % 10) + (b % 10) >= 10;
          return {
            kind,
            text: `${a} + ${b} = ?`,
            answer: a + b,
            options: finishOptions(a + b, [crossing ? a + b - 10 : a + b + 10, a + b + 1]),
            hint: crossing ? 'Tízesátlépés! Előbb pótold a következő kerek tízesig.' : 'Tízesek a tízesekhez, egyesek az egyesekhez.'
          };
        }
      }
    }
    case 'sub': {
      for (;;) {
        const a = rnd(21, 99);
        const b = rnd(3, 39);
        if (a - b >= 1) {
          const crossing = a % 10 < b % 10;
          return {
            kind,
            text: `${a} − ${b} = ?`,
            answer: a - b,
            options: finishOptions(a - b, [crossing ? a - b + 10 : a - b - 10, a - b - 1]),
            hint: crossing ? 'Tízesátlépés! Előbb menj vissza a kerek tízesig.' : 'Tízesből tízest, egyesből egyest vonunk ki.'
          };
        }
      }
    }
    case 'tens': {
      const t = makeRodTask();
      const ans = rodTaskAnswer(t);
      return {
        kind,
        text: `${t.start} ${t.op} ${t.k * 10} = ?`,
        answer: ans,
        options: finishOptions(ans, [t.op === '+' ? t.start + t.k : t.start - t.k]),
        hint: 'Kerek tízesnél csak a tízesek változnak.'
      };
    }
    case 'missing': {
      for (;;) {
        const a = rnd(10, 70);
        const b = rnd(5, 30);
        if (a + b <= 100) {
          return { kind, text: `${a} + □ = ${a + b}`, answer: b, options: finishOptions(b, [a + b + a > 100 ? b + 10 : a + b + a, b + 10]), hint: `Számolj kivonással: ${a + b} − ${a} = □.` };
        }
      }
    }
    case 'biggest':
    default: {
      for (;;) {
        const t = rnd(1, 9);
        const e = rnd(1, 9);
        if (t === e) continue;
        const nums = Array.from(new Set([10 * t + e, 10 * e + t, 10 * t + e - 10, 10 * e + t - 1].filter((v) => v >= 1 && v <= 100)));
        if (nums.length < 4) continue;
        const ans = Math.max(...nums);
        return { kind: 'biggest', text: `Melyik a legnagyobb? ${nums.join(', ')}`, answer: ans, options: shuffle(nums), hint: 'Előbb a tízeseket hasonlítsd össze!' };
      }
    }
  }
};

export interface PyramidTask {
  b1: number;
  b2: number;
  b3: number;
  m1: number;
  m2: number;
  top: number;
}

export const makePyramidG2Task = (): PyramidTask => {
  for (;;) {
    const b1 = rnd(5, 30);
    const b2 = rnd(5, 30);
    const b3 = rnd(5, 30);
    const m1 = b1 + b2;
    const m2 = b2 + b3;
    if (m1 + m2 <= 100) return { b1, b2, b3, m1, m2, top: m1 + m2 };
  }
};

const Msg: React.FC<{ msg: { ok: boolean; text: string } | null }> = ({ msg }) =>
  msg ? (
    <div className={`rounded-xl p-3 text-center text-base font-bold ${msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{msg.text}</div>
  ) : null;

/** Labor I: vegyes feladatgép. */
export const MixedTaskLab: React.FC = () => {
  const [kind, setKind] = useState<ExamKind | 'mix'>('mix');
  const [task, setTask] = useState<ExamTask>(() => makeExamG2Task('add'));
  const [chosen, setChosen] = useState<number | null>(null);
  const [score, setScore] = useState({ ok: 0, all: 0 });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const next = (k: ExamKind | 'mix' = kind) => {
    setTask(makeExamG2Task(k === 'mix' ? undefined : k));
    setChosen(null);
    setMsg(null);
  };

  const choose = (n: number) => {
    if (chosen !== null) return;
    setChosen(n);
    const ok = n === task.answer;
    setScore((s) => ({ ok: s.ok + (ok ? 1 : 0), all: s.all + 1 }));
    setMsg(ok ? { ok: true, text: `Ügyes! A jó válasz: ${task.answer}.` } : { ok: false, text: `Nem ${n}. ${task.hint} A jó válasz: ${task.answer}.` });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-cyan-200 dark:border-cyan-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap justify-center gap-2">
        {[{ id: 'mix' as const, label: 'Vegyes' }, ...EXAM_G2_TASK_KINDS].map((k) => (
          <button
            key={k.id}
            type="button"
            onClick={() => {
              setKind(k.id);
              next(k.id);
            }}
            className={`px-3 py-2 rounded-full text-sm font-bold min-h-[44px] border-2 ${kind === k.id ? 'bg-cyan-600 text-white border-cyan-700' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'}`}
          >
            {k.label}
          </button>
        ))}
      </div>
      <div className="bg-cyan-50 dark:bg-cyan-950/50 rounded-xl p-4 text-center text-2xl sm:text-3xl font-black text-cyan-950 dark:text-cyan-100">{task.text}</div>
      <div className="flex flex-wrap justify-center gap-2">
        {task.options.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => choose(n)}
            className={`w-20 h-16 rounded-xl font-black text-2xl border-2 ${
              chosen === null
                ? 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
                : n === task.answer
                  ? 'bg-emerald-500 text-white border-emerald-700'
                  : n === chosen
                    ? 'bg-rose-500 text-white border-rose-700'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <Msg msg={msg} />
      <div className="flex flex-wrap items-center justify-center gap-3">
        <span className="font-black text-slate-700 dark:text-slate-200">
          Pontok: {score.ok} / {score.all}
        </span>
        <button type="button" onClick={() => next()} className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white text-base font-bold min-h-[52px]">
          Új feladat
        </button>
      </div>
    </div>
  );
};

/** Labor II: számpiramis-építő 100-ig. */
export const PyramidLab: React.FC = () => {
  const [p, setP] = useState<PyramidTask>({ b1: 14, b2: 23, b3: 18, m1: 37, m2: 41, top: 78 });
  const [vals, setVals] = useState<{ m1: string; m2: string; top: string }>({ m1: '', m2: '', top: '' });
  const [checked, setChecked] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const ok = {
    m1: Number(vals.m1) === p.m1 && vals.m1 !== '',
    m2: Number(vals.m2) === p.m2 && vals.m2 !== '',
    top: Number(vals.top) === p.top && vals.top !== ''
  };

  const check = () => {
    setChecked(true);
    if (ok.m1 && ok.m2 && ok.top) {
      setMsg({ ok: true, text: `Kész a piramis! ${p.m1} + ${p.m2} = ${p.top}.` });
    } else if (!ok.m1 || !ok.m2) {
      setMsg({ ok: false, text: 'Nézd meg a középső sort: mindig a két alatta lévő szám összege kerül oda.' });
    } else {
      setMsg({ ok: false, text: `A középső sor jó! A csúcsra ${p.m1} + ${p.m2} kerül.` });
    }
  };

  const inputCls = (good: boolean) =>
    `w-20 h-14 text-center text-2xl font-black rounded-xl border-2 ${
      checked ? (good ? 'border-emerald-500 bg-emerald-50' : 'border-rose-500 bg-rose-50') : 'border-cyan-300 bg-white dark:bg-slate-800'
    } text-slate-900 dark:text-slate-100`;

  const setV = (k: 'm1' | 'm2' | 'top', v: string) => {
    setVals((s) => ({ ...s, [k]: v.replace(/[^0-9]/g, '').slice(0, 3) }));
    setChecked(false);
    setMsg(null);
  };

  const box = 'w-20 h-14 flex items-center justify-center text-2xl font-black rounded-xl border-2 border-amber-400 bg-amber-50 text-amber-950';

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-3">
      <p className="text-center text-base font-bold text-slate-700 dark:text-slate-200">Írd be a hiányzó számokat!</p>
      <div className="flex justify-center">
        <input aria-label="csúcs" inputMode="numeric" value={vals.top} onChange={(e) => setV('top', e.target.value)} className={inputCls(ok.top)} />
      </div>
      <div className="flex justify-center gap-2">
        <input aria-label="bal középső" inputMode="numeric" value={vals.m1} onChange={(e) => setV('m1', e.target.value)} className={inputCls(ok.m1)} />
        <input aria-label="jobb középső" inputMode="numeric" value={vals.m2} onChange={(e) => setV('m2', e.target.value)} className={inputCls(ok.m2)} />
      </div>
      <div className="flex justify-center gap-2">
        <div className={box}>{p.b1}</div>
        <div className={box}>{p.b2}</div>
        <div className={box}>{p.b3}</div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        <button type="button" onClick={check} className="px-5 py-2.5 rounded-xl bg-sky-600 text-white text-base font-bold min-h-[52px]">
          Ellenőrzés
        </button>
        <button
          type="button"
          onClick={() => {
            setP(makePyramidG2Task());
            setVals({ m1: '', m2: '', top: '' });
            setChecked(false);
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
