import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 1. A hosszúság mérése – közös SVG-építőelemek és laborok (2. osztály)
// ---------------------------------------------------------------------------

export const LEN_FONT = 'system-ui, Segoe UI, sans-serif';

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/**
 * Vonalzó: `from`-tól `to`-ig centiméteres beosztás. A `from` címke az `x` képpontnál van,
 * 1 cm = `unit` képpont. A beosztás a vonalzó felső szélén van (fölé tesszük a mérendő csíkot).
 */
export const RulerPart: React.FC<{
  x: number;
  y: number;
  unit: number;
  from?: number;
  to?: number;
  h?: number;
  fontSize?: number;
  broken?: boolean;
}> = ({ x, y, unit, from = 0, to = 15, h = 30, fontSize = 11, broken = false }) => {
  const n = to - from;
  const left = x - (broken ? 4 : 10);
  const right = x + n * unit + 10;
  return (
    <g fontFamily={LEN_FONT}>
      {broken ? (
        <path
          d={`M ${left} ${y} L ${right} ${y} L ${right} ${y + h} L ${left} ${y + h} L ${left + 5} ${y + h * 0.66} L ${left - 3} ${y + h * 0.4} Z`}
          fill="#fde68a"
          stroke="#b45309"
          strokeWidth="1.6"
        />
      ) : (
        <rect x={left} y={y} width={right - left} height={h} rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="1.6" />
      )}
      {Array.from({ length: n + 1 }, (_, i) => {
        const v = from + i;
        const tx = x + i * unit;
        const long = v % 5 === 0;
        return (
          <g key={i}>
            <line x1={tx} y1={y} x2={tx} y2={y + (long ? h * 0.45 : h * 0.3)} stroke="#78350f" strokeWidth={long ? 1.8 : 1.2} />
            <text x={tx} y={y + h - 4} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill="#78350f">
              {v}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Vízszintes csík (mérendő szalag / ceruzatest), a végein kis függőleges jellel. */
export const StripePart: React.FC<{ x1: number; x2: number; y: number; color?: string; h?: number }> = ({
  x1,
  x2,
  y,
  color = '#3b82f6',
  h = 12
}) => (
  <g>
    <rect x={x1} y={y - h / 2} width={Math.max(0, x2 - x1)} height={h} rx="3" fill={color} stroke="#1e293b" strokeWidth="1.3" />
    <line x1={x1} y1={y - h / 2 - 5} x2={x1} y2={y + h / 2 + 14} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1={x2} y1={y - h / 2 - 5} x2={x2} y2={y + h / 2 + 14} stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 2" />
  </g>
);

/** Ceruza `x1`-től `x2`-ig (hegye jobbra). */
export const PencilPart: React.FC<{ x1: number; x2: number; y: number; color?: string; h?: number }> = ({
  x1,
  x2,
  y,
  color = '#f59e0b',
  h = 14
}) => {
  const tip = Math.min(18, (x2 - x1) * 0.25);
  return (
    <g>
      <rect x={x1} y={y - h / 2} width={x2 - x1 - tip} height={h} rx="2" fill={color} stroke="#1e293b" strokeWidth="1.3" />
      <rect x={x1} y={y - h / 2} width="6" height={h} fill="#f9a8d4" stroke="#1e293b" strokeWidth="1.3" />
      <polygon points={`${x2 - tip},${y - h / 2} ${x2},${y} ${x2 - tip},${y + h / 2}`} fill="#fde7c7" stroke="#1e293b" strokeWidth="1.3" />
      <polygon points={`${x2 - tip * 0.35},${y - h * 0.18} ${x2},${y} ${x2 - tip * 0.35},${y + h * 0.18}`} fill="#334155" />
    </g>
  );
};

/** `n` darab 1 cm-es fehér kis kocka egymás mellett. */
export const CubeRowPart: React.FC<{ x: number; y: number; n: number; unit: number; color?: string }> = ({
  x,
  y,
  n,
  unit,
  color = '#ffffff'
}) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x={x + i * unit} y={y} width={unit} height={unit} fill={color} stroke="#475569" strokeWidth="1.3" />
    ))}
  </g>
);

/** Függőleges deciméteres rúd (10 rész) – a tízesrúdhoz hasonló. */
export const DmRodPart: React.FC<{ x: number; y: number; cell: number; w?: number }> = ({ x, y, cell, w = 14 }) => (
  <g>
    <rect x={x} y={y} width={w} height={cell * 10} rx="2" fill="#fb923c" stroke="#9a3412" strokeWidth="1.6" />
    {Array.from({ length: 9 }, (_, i) => (
      <line key={i} x1={x} y1={y + (i + 1) * cell} x2={x + w} y2={y + (i + 1) * cell} stroke="#9a3412" strokeWidth="0.8" />
    ))}
  </g>
);

// ---------------------------------------------------------------------------
// Laborok
// ---------------------------------------------------------------------------

type Msg = { ok: boolean; text: string } | null;

const MsgBox: React.FC<{ msg: Msg }> = ({ msg }) =>
  msg ? (
    <div
      className={`rounded-xl p-3 text-center text-sm sm:text-base font-bold ${
        msg.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
      }`}
    >
      {msg.text}
    </div>
  ) : null;

const BTN_MAIN = 'px-5 py-2.5 rounded-xl text-white text-sm sm:text-base font-bold min-h-[48px]';
const BTN_NEW = 'px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm sm:text-base font-bold min-h-[48px]';

interface RulerTask {
  start: number;
  len: number;
  color: string;
}

const STRIPE_COLORS = ['#3b82f6', '#22c55e', '#ef4444', '#a855f7', '#ec4899'];

const makeRulerTask = (prev?: RulerTask): RulerTask => {
  for (;;) {
    const len = rnd(3, 12);
    const start = rnd(0, 5);
    if (start + len <= 15 && (!prev || prev.len !== len)) {
      return { start, len, color: STRIPE_COLORS[rnd(0, STRIPE_COLORS.length - 1)] };
    }
  }
};

/** Labor I: vonalzós mérés – a vonalzó tolható, a 0-t a csík elejéhez kell igazítani. */
export const RulerLab: React.FC = () => {
  const [task, setTask] = useState<RulerTask>({ start: 3, len: 7, color: '#3b82f6' });
  const [shift, setShift] = useState<number>(3);
  const [answer, setAnswer] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const U = 20;
  const SX = 110; // a csík bal vége (képpont)
  const rulerX = SX - shift * U; // a vonalzó 0-ja
  const endReading = shift + task.len;

  const next = () => {
    const t = makeRulerTask(task);
    setTask(t);
    setShift(t.start);
    setAnswer(null);
    setMsg(null);
  };

  const check = () => {
    if (answer === null) {
      setMsg({ ok: false, text: 'Válaszd ki lent, hány centiméter a csík!' });
      return;
    }
    if (answer === task.len) {
      setMsg({
        ok: true,
        text:
          shift === 0
            ? `Ügyes! A 0-tól a ${task.len}-ig ${task.len} cm.`
            : `Ügyes! ${endReading} − ${shift} = ${task.len}, a csík ${task.len} cm.`
      });
      return;
    }
    if (shift > 0 && answer === endReading) {
      setMsg({
        ok: false,
        text: `A csík nem a 0-nál kezdődik, hanem a ${shift}-nál! Told a vonalzót, hogy a 0 a csík elejéhez kerüljön.`
      });
      return;
    }
    if (Math.abs(answer - task.len) === 1) {
      setMsg({ ok: false, text: 'Majdnem! Nézd meg jól a csík két végét. Ne a vonásokat, hanem a lépéseket számold!' });
      return;
    }
    setMsg({ ok: false, text: 'Nem ennyi. Tedd a vonalzó 0-ját a csík elejéhez, és nézd meg, hol a vége!' });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-blue-50 dark:bg-blue-950/50 rounded-xl p-3 text-center text-blue-950 dark:text-blue-100 font-bold">
        Milyen hosszú a csík? Told a vonalzót, ha kell!
      </div>

      <svg viewBox="0 0 440 120" className="w-full max-w-[480px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={LEN_FONT}>
        <rect x="1" y="1" width="438" height="118" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <StripePart x1={SX} x2={SX + task.len * U} y={40} color={task.color} h={16} />
        <RulerPart x={rulerX} y={62} unit={U} from={0} to={15} h={36} fontSize={13} />
        {shift === 0 && (
          <text x={SX} y={112} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
            0 a helyén!
          </text>
        )}
      </svg>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setShift((s) => Math.min(5, s + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-amber-100 text-amber-900 font-black text-base min-h-[48px] min-w-[96px]"
        >
          ◀ Told balra
        </button>
        <button
          type="button"
          onClick={() => {
            setShift((s) => Math.max(0, s - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-amber-500 text-white font-black text-base min-h-[48px] min-w-[96px]"
        >
          Told jobbra ▶
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-center text-sm font-bold text-slate-600 dark:text-slate-300">Hány cm a csík?</p>
        <div className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => {
                setAnswer(n);
                setMsg(null);
              }}
              className={`w-12 h-12 rounded-xl font-black text-lg border-2 transition-all ${
                answer === n
                  ? 'bg-blue-600 text-white border-blue-800 scale-105'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className={`${BTN_MAIN} bg-blue-600`}>
          Ellenőrzés
        </button>
        <button type="button" onClick={next} className={BTN_NEW}>
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};

const makeTarget = (prev?: number): number => {
  for (;;) {
    const t = Math.random() < 0.12 ? 100 : rnd(11, 99);
    if (t !== prev && (t === 100 || t % 10 !== 0)) return t;
  }
};

/** Labor II: rakd ki deciméteres rudakkal és centiméteres kockákkal! */
export const DmCmLab: React.FC = () => {
  const [target, setTarget] = useState<number>(34);
  const [dm, setDm] = useState<number>(0);
  const [cm, setCm] = useState<number>(0);
  const [msg, setMsg] = useState<Msg>(null);

  const total = dm * 10 + cm;
  const CELL = 9;

  const next = () => {
    setTarget(makeTarget(target));
    setDm(0);
    setCm(0);
    setMsg(null);
  };

  const check = () => {
    if (total < target) {
      setMsg({ ok: false, text: `Most ${total} cm van kirakva. Ez még rövidebb, tegyél hozzá!` });
      return;
    }
    if (total > target) {
      setMsg({ ok: false, text: `Most ${total} cm van kirakva. Ez túl hosszú, vegyél el belőle!` });
      return;
    }
    if (cm >= 10) {
      setMsg({ ok: false, text: 'A hossz jó! De 10 kis kocka = 1 dm. Cserélj 10 kockát egy rúdra!' });
      return;
    }
    setMsg({
      ok: true,
      text:
        target === 100
          ? 'Szuper! 10 dm = 100 cm = 1 m.'
          : `Szuper! ${target} cm = ${dm} dm ${cm} cm.`
    });
  };

  const cubeCols = Math.ceil(cm / 10);

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-orange-50 dark:bg-orange-950/50 rounded-xl p-3 text-center text-orange-950 dark:text-orange-100">
        Rakd ki rudakkal és kockákkal:{' '}
        <span className="text-2xl sm:text-3xl font-black align-middle ml-2">{target} cm</span>
      </div>

      <svg viewBox="0 0 320 130" className="w-full max-w-[420px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={LEN_FONT}>
        <rect x="1" y="1" width="318" height="128" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        {Array.from({ length: dm }, (_, i) => (
          <DmRodPart key={i} x={14 + i * 18} y={14} cell={CELL} w={14} />
        ))}
        {Array.from({ length: cm }, (_, i) => {
          const col = Math.floor(i / 10);
          const row = i % 10;
          return (
            <rect
              key={i}
              x={14 + dm * 18 + 8 + col * 14}
              y={14 + (9 - row) * CELL}
              width={CELL + 1}
              height={CELL}
              fill="#ffffff"
              stroke="#475569"
              strokeWidth="1.1"
            />
          );
        })}
        {dm === 0 && cm === 0 && (
          <text x="160" y="66" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#94a3b8">
            Tegyél ide rudakat és kockákat!
          </text>
        )}
        <text x="306" y="122" textAnchor="end" fontSize="13" fontWeight="bold" fill="#334155">
          {dm} dm {cm} cm
        </text>
        {cubeCols > 1 && (
          <text x="14" y="122" fontSize="11" fontWeight="bold" fill="#b91c1c">
            10 kocka = 1 dm!
          </text>
        )}
      </svg>

      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setDm((d) => Math.max(0, d - 1));
              setMsg(null);
            }}
            className="px-3 py-2 rounded-xl bg-orange-100 text-orange-900 font-black text-lg min-h-[48px] min-w-[48px]"
          >
            −
          </button>
          <span className="font-black text-base text-orange-800 dark:text-orange-200">1 dm rúd</span>
          <button
            type="button"
            onClick={() => {
              setDm((d) => Math.min(10, d + 1));
              setMsg(null);
            }}
            className="px-3 py-2 rounded-xl bg-orange-500 text-white font-black text-lg min-h-[48px] min-w-[48px]"
          >
            +
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              setCm((c) => Math.max(0, c - 1));
              setMsg(null);
            }}
            className="px-3 py-2 rounded-xl bg-slate-100 text-slate-900 font-black text-lg min-h-[48px] min-w-[48px]"
          >
            −
          </button>
          <span className="font-black text-base text-slate-700 dark:text-slate-200">1 cm kocka</span>
          <button
            type="button"
            onClick={() => {
              setCm((c) => Math.min(19, c + 1));
              setMsg(null);
            }}
            className="px-3 py-2 rounded-xl bg-slate-600 text-white font-black text-lg min-h-[48px] min-w-[48px]"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className={`${BTN_MAIN} bg-orange-600`}>
          Ellenőrzés
        </button>
        <button type="button" onClick={next} className={BTN_NEW}>
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
