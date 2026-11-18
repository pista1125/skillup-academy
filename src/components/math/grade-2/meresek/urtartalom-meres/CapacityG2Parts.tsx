import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 3. Az űrtartalom mérése – közös SVG-építőelemek és laborok (2. osztály)
// ---------------------------------------------------------------------------

export const CAP_FONT = 'system-ui, Segoe UI, sans-serif';

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

const WATER = '#60a5fa';
const WATER_S = '#2563eb';

/**
 * Mérőedény (kancsó) beosztással. (x, yBottom) a test bal alsó sarka.
 * `max` dl fér bele, 1 dl = `unit` képpont. 10 dl-nél „1 l”, 20 dl-nél „2 l” felirat.
 */
export const JugPart: React.FC<{
  x: number;
  yBottom: number;
  w: number;
  unit: number;
  max?: number;
  fill?: number;
  labels?: boolean;
  fontSize?: number;
  handle?: boolean;
}> = ({ x, yBottom, w, unit, max = 10, fill = 0, labels = true, fontSize = 11, handle = true }) => {
  const H = max * unit;
  const top = yBottom - H - 6;
  const f = Math.max(0, Math.min(max, fill));
  return (
    <g fontFamily={CAP_FONT}>
      {handle && (
        <path
          d={`M ${x + w} ${top + 12} q ${w * 0.45} 4 ${w * 0.4} ${H * 0.35} q -2 ${H * 0.15} -${w * 0.4} ${H * 0.2}`}
          fill="none"
          stroke="#64748b"
          strokeWidth="4"
        />
      )}
      {f > 0 && <rect x={x + 2} y={yBottom - f * unit} width={w - 4} height={f * unit} fill={WATER} opacity="0.85" />}
      {f > 0 && <line x1={x + 2} y1={yBottom - f * unit} x2={x + w - 2} y2={yBottom - f * unit} stroke={WATER_S} strokeWidth="1.6" />}
      <path d={`M ${x} ${top} L ${x} ${yBottom} L ${x + w} ${yBottom} L ${x + w} ${top}`} fill="#ffffff22" stroke="#334155" strokeWidth="2.2" />
      <path d={`M ${x - 3} ${top} L ${x + 6} ${top + 4}`} stroke="#334155" strokeWidth="2.2" />
      {Array.from({ length: max }, (_, i) => {
        const v = i + 1;
        const ty = yBottom - v * unit;
        const long = v % 5 === 0;
        const big = v % 10 === 0;
        return (
          <g key={v}>
            <line x1={x} y1={ty} x2={x + (big ? w * 0.5 : long ? w * 0.36 : w * 0.22)} y2={ty} stroke="#0f172a" strokeWidth={big ? 2 : 1.2} />
            {labels && big && (
              <text x={x + w * 0.55} y={ty + fontSize * 0.36} fontSize={fontSize} fontWeight="900" fill="#0f172a">
                {v / 10} l
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};

/** 1 dl-es pohár (vagy más), alsó közepe (cx, y). */
export const CupPart: React.FC<{ cx: number; y: number; s?: number; full?: boolean; label?: string; color?: string }> = ({
  cx,
  y,
  s = 1,
  full = true,
  label,
  color = WATER
}) => (
  <g transform={`translate(${cx} ${y}) scale(${s})`} fontFamily={CAP_FONT}>
    {full && <polygon points="-9,-20 9,-20 7,0 -7,0" fill={color} opacity="0.85" />}
    <polygon points="-11,-26 11,-26 8,0 -8,0" fill="none" stroke="#334155" strokeWidth="2" />
    {label && (
      <text x="0" y="12" textAnchor="middle" fontSize="9" fontWeight="900" fill="#334155">
        {label}
      </text>
    )}
  </g>
);

/** Bögre füllel. */
export const MugPart: React.FC<{ cx: number; y: number; s?: number; color?: string; label?: string }> = ({ cx, y, s = 1, color = '#ef4444', label }) => (
  <g transform={`translate(${cx} ${y}) scale(${s})`} fontFamily={CAP_FONT}>
    <path d="M 10 -20 q 10 0 10 8 q 0 8 -10 8" fill="none" stroke={color} strokeWidth="3.5" />
    <rect x="-12" y="-26" width="24" height="26" rx="4" fill={color} stroke="#7f1d1d" strokeWidth="1.5" />
    {label && (
      <text x="0" y="-9" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff">
        {label}
      </text>
    )}
  </g>
);

/** Vödör. */
export const BucketPart: React.FC<{ cx: number; y: number; s?: number }> = ({ cx, y, s = 1 }) => (
  <g transform={`translate(${cx} ${y}) scale(${s})`}>
    <path d="M -22 -40 Q 0 -66 22 -40" fill="none" stroke="#334155" strokeWidth="2.5" />
    <polygon points="-24,-40 24,-40 18,0 -18,0" fill="#94a3b8" stroke="#334155" strokeWidth="2" />
    <ellipse cx="0" cy="-40" rx="24" ry="5" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
  </g>
);

/** Palack (üdítős). */
export const BottlePart: React.FC<{ cx: number; y: number; s?: number; label?: string }> = ({ cx, y, s = 1, label }) => (
  <g transform={`translate(${cx} ${y}) scale(${s})`} fontFamily={CAP_FONT}>
    <path d="M -5 -60 L 5 -60 L 5 -52 Q 13 -46 13 -36 L 13 -2 Q 13 0 11 0 L -11 0 Q -13 0 -13 -2 L -13 -36 Q -13 -46 -5 -52 Z" fill="#bae6fd" stroke="#0369a1" strokeWidth="2" />
    <rect x="-6" y="-66" width="12" height="7" rx="1.5" fill="#1d4ed8" />
    <rect x="-13" y="-30" width="26" height="12" fill="#1d4ed8" />
    {label && (
      <text x="0" y="-21" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff">
        {label}
      </text>
    )}
  </g>
);

/** Evőkanál. */
export const SpoonPart: React.FC<{ cx: number; y: number; s?: number }> = ({ cx, y, s = 1 }) => (
  <g transform={`translate(${cx} ${y}) scale(${s}) rotate(-20)`}>
    <ellipse cx="0" cy="-6" rx="7" ry="5" fill="#cbd5e1" stroke="#334155" strokeWidth="1.6" />
    <rect x="6" y="-8" width="22" height="3.5" rx="1.5" fill="#cbd5e1" stroke="#334155" strokeWidth="1.2" />
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

/** l és dl alakban kiírva (pl. 13 → „1 l 3 dl”, 10 → „1 l”, 7 → „7 dl”). */
export const lDl = (dl: number): string => {
  const l = Math.floor(dl / 10);
  const d = dl % 10;
  if (l === 0) return `${d} dl`;
  if (d === 0) return `${l} l`;
  return `${l} l ${d} dl`;
};

interface PourTask {
  dl: number;
  mixed: boolean;
}

const makePour = (prev?: PourTask): PourTask => {
  for (;;) {
    const dl = rnd(3, 20);
    const mixed = dl > 10 && Math.random() < 0.6;
    if (!prev || prev.dl !== dl) return { dl, mixed: dl === 10 || dl === 20 ? true : mixed };
  }
};

/** Labor I: töltsd a mérőedénybe a kért mennyiséget 1 dl-es pohárral! */
export const PourLab: React.FC = () => {
  const [task, setTask] = useState<PourTask>({ dl: 13, mixed: true });
  const [poured, setPoured] = useState<number>(0);
  const [msg, setMsg] = useState<Msg>(null);

  const target = task.mixed ? lDl(task.dl) : `${task.dl} dl`;

  const next = () => {
    setTask(makePour(task));
    setPoured(0);
    setMsg(null);
  };

  const check = () => {
    if (poured === task.dl) {
      setMsg({
        ok: true,
        text: task.dl >= 10 ? `Pontos! ${task.dl} pohár = ${task.dl} dl = ${lDl(task.dl)}.` : `Pontos! ${task.dl} pohár = ${task.dl} dl.`
      });
      return;
    }
    if (task.mixed && task.dl > 10 && poured === task.dl - 10 + 1) {
      setMsg({ ok: false, text: 'Vigyázz! 1 l nem 1 pohár, hanem 10 pohár (10 dl). Tölts még!' });
      return;
    }
    setMsg({
      ok: false,
      text: poured < task.dl ? `Most ${poured} dl van benne. Ez kevés, tölts még!` : `Most ${poured} dl van benne. Ez sok, önts vissza!`
    });
  };

  const U = 5.5;
  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-violet-200 dark:border-violet-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-violet-50 dark:bg-violet-950/50 rounded-xl p-3 text-center text-violet-950 dark:text-violet-100">
        Tölts a mérőedénybe:{' '}
        <span className="text-2xl sm:text-3xl font-black align-middle ml-2">{target}</span>
      </div>

      <svg viewBox="0 0 300 150" className="w-full max-w-[400px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={CAP_FONT}>
        <rect x="1" y="1" width="298" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <JugPart x={150} yBottom={138} w={60} unit={U} max={20} fill={poured} fontSize={12} />
        <CupPart cx={70} y={110} s={1.6} label="1 dl" />
        <text x="70" y="50" textAnchor="middle" fontSize="13" fontWeight="900" fill="#5b21b6">
          {poured} pohár
        </text>
      </svg>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => {
            setPoured((p) => Math.max(0, p - 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-violet-100 text-violet-900 font-black text-base min-h-[52px]"
        >
          − 1 dl vissza
        </button>
        <button
          type="button"
          onClick={() => {
            setPoured((p) => Math.min(20, p + 1));
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-violet-600 text-white font-black text-base min-h-[52px]"
        >
          + 1 pohár (1 dl)
        </button>
        <button
          type="button"
          onClick={() => {
            setPoured(0);
            setMsg(null);
          }}
          className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm min-h-[52px]"
        >
          Kiöntöm
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={check} className={`${BTN_MAIN} bg-violet-600`}>
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

/** Labor II: olvasd le a mérőedényt! */
export const ReadJugLab: React.FC = () => {
  const [level, setLevel] = useState<number>(7);
  const [answer, setAnswer] = useState<number | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  const next = () => {
    let l = rnd(1, 20);
    while (l === level) l = rnd(1, 20);
    setLevel(l);
    setAnswer(null);
    setMsg(null);
  };

  const pick = (n: number) => {
    setAnswer(n);
    if (n === level) {
      setMsg({ ok: true, text: level >= 10 ? `Így van! ${level} dl = ${lDl(level)}.` : `Így van! ${level} dl.` });
    } else if (level > 10 && n === level - 10) {
      setMsg({ ok: false, text: 'Az 1 l alatti részt is számold! 1 l = 10 dl, ehhez jön a többi.' });
    } else if (Math.abs(n - level) === 1) {
      setMsg({ ok: false, text: 'Majdnem! Számold újra a vonásokat alulról, egyesével.' });
    } else {
      setMsg({ ok: false, text: 'Nem ennyi. Minden kis vonás 1 dl. Az 1 l-es vonás a 10 dl.' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100 font-bold">
        Hány dl víz van a mérőedényben?
      </div>

      <svg viewBox="0 0 220 160" className="w-full max-w-[320px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={CAP_FONT}>
        <rect x="1" y="1" width="218" height="158" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <JugPart x={70} yBottom={148} w={66} unit={6.4} max={20} fill={level} fontSize={13} />
      </svg>

      <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => pick(n)}
            className={`w-14 h-12 rounded-xl font-black text-base border-2 transition-all ${
              answer === n
                ? n === level
                  ? 'bg-emerald-500 text-white border-emerald-700'
                  : 'bg-rose-500 text-white border-rose-700'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {n} dl
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={next} className={BTN_NEW}>
          Új feladat
        </button>
      </div>
      <MsgBox msg={msg} />
    </div>
  );
};
