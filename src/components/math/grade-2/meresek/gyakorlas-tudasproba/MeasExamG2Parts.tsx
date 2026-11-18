import React from 'react';

export const EXAM_FONT = 'system-ui, Segoe UI, sans-serif';

export type ObjKind =
  | 'pencil'
  | 'door'
  | 'sack'
  | 'bucket'
  | 'mug'
  | 'bottle'
  | 'ruler'
  | 'tape'
  | 'scale'
  | 'jug'
  | 'calendar'
  | 'sunset';

/** Egyszerű tárgyrajz egy 80 × 80-as dobozban; (x, y) a bal felső sarok, s a nagyítás. */
export const ObjectIcon: React.FC<{ kind: ObjKind; x?: number; y?: number; s?: number; label?: string }> = ({
  kind,
  x = 0,
  y = 0,
  s = 1,
  label
}) => {
  let body: React.ReactNode = null;
  switch (kind) {
    case 'pencil':
      body = (
        <g transform="rotate(-30 40 40)">
          <rect x="8" y="33" width="50" height="14" fill="#facc15" stroke="#92400e" strokeWidth="2.5" />
          <rect x="4" y="33" width="8" height="14" rx="2" fill="#f472b6" stroke="#92400e" strokeWidth="2.5" />
          <polygon points="58,33 74,40 58,47" fill="#fde68a" stroke="#92400e" strokeWidth="2.5" />
          <polygon points="69,38 74,40 69,42" fill="#1e293b" />
        </g>
      );
      break;
    case 'door':
      body = (
        <g>
          <rect x="22" y="6" width="36" height="70" rx="3" fill="#b45309" stroke="#451a03" strokeWidth="3" />
          <rect x="28" y="12" width="24" height="24" rx="2" fill="#d97706" />
          <rect x="28" y="42" width="24" height="28" rx="2" fill="#d97706" />
          <circle cx="51" cy="42" r="3" fill="#facc15" stroke="#451a03" />
        </g>
      );
      break;
    case 'sack':
      body = (
        <g>
          <path d="M22 28 Q16 74 40 74 Q64 74 58 28 Z" fill="#d6a76c" stroke="#78350f" strokeWidth="3" />
          <path d="M28 28 L32 14 L48 14 L52 28 Z" fill="#c08a4e" stroke="#78350f" strokeWidth="3" />
          <line x1="28" y1="22" x2="52" y2="22" stroke="#78350f" strokeWidth="3" />
        </g>
      );
      break;
    case 'bucket':
      body = (
        <g>
          <path d="M22 20 Q40 2 58 20" fill="none" stroke="#475569" strokeWidth="3" />
          <path d="M16 24 L64 24 L56 72 L24 72 Z" fill="#94a3b8" stroke="#334155" strokeWidth="3" />
          <rect x="18" y="28" width="44" height="7" fill="#60a5fa" opacity="0.8" />
        </g>
      );
      break;
    case 'mug':
      body = (
        <g>
          <path d="M54 32 Q72 34 68 48 Q64 60 52 58" fill="none" stroke="#b91c1c" strokeWidth="5" />
          <rect x="16" y="22" width="40" height="50" rx="6" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" />
          <rect x="22" y="36" width="28" height="6" rx="3" fill="#fecaca" />
        </g>
      );
      break;
    case 'bottle':
      body = (
        <g>
          <rect x="33" y="4" width="14" height="10" rx="2" fill="#16a34a" stroke="#14532d" strokeWidth="2.5" />
          <path d="M33 14 L47 14 L56 30 L56 74 L24 74 L24 30 Z" fill="#bae6fd" stroke="#0369a1" strokeWidth="3" />
          <rect x="26" y="44" width="28" height="28" fill="#60a5fa" opacity="0.8" />
        </g>
      );
      break;
    case 'ruler':
      body = (
        <g>
          <rect x="4" y="28" width="72" height="24" rx="3" fill="#fde68a" stroke="#b45309" strokeWidth="3" />
          {Array.from({ length: 11 }, (_, i) => (
            <line key={i} x1={10 + i * 6} y1="28" x2={10 + i * 6} y2={i % 5 === 0 ? 42 : 36} stroke="#78350f" strokeWidth="2" />
          ))}
        </g>
      );
      break;
    case 'tape':
      body = (
        <g>
          <rect x="6" y="16" width="44" height="44" rx="10" fill="#22c55e" stroke="#14532d" strokeWidth="3" />
          <circle cx="28" cy="38" r="9" fill="#fef9c3" stroke="#14532d" strokeWidth="2.5" />
          <rect x="48" y="48" width="28" height="10" fill="#fde047" stroke="#a16207" strokeWidth="2" />
          {Array.from({ length: 5 }, (_, i) => (
            <line key={i} x1={52 + i * 5} y1="48" x2={52 + i * 5} y2="53" stroke="#a16207" strokeWidth="1.5" />
          ))}
        </g>
      );
      break;
    case 'scale':
      body = (
        <g>
          <rect x="37" y="22" width="6" height="44" fill="#475569" />
          <rect x="22" y="64" width="36" height="8" rx="3" fill="#334155" />
          <line x1="8" y1="22" x2="72" y2="22" stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
          <path d="M4 40 Q16 50 28 40 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="2.5" />
          <path d="M52 40 Q64 50 76 40 Z" fill="#cbd5e1" stroke="#334155" strokeWidth="2.5" />
          <line x1="8" y1="22" x2="6" y2="40" stroke="#64748b" strokeWidth="1.5" />
          <line x1="8" y1="22" x2="26" y2="40" stroke="#64748b" strokeWidth="1.5" />
          <line x1="72" y1="22" x2="54" y2="40" stroke="#64748b" strokeWidth="1.5" />
          <line x1="72" y1="22" x2="74" y2="40" stroke="#64748b" strokeWidth="1.5" />
        </g>
      );
      break;
    case 'jug':
      body = (
        <g>
          <path d="M56 26 Q74 30 70 46 Q66 58 56 58" fill="none" stroke="#64748b" strokeWidth="4" />
          <path d="M18 14 L58 14 L56 74 L20 74 Z" fill="#ffffff" stroke="#334155" strokeWidth="3" />
          <rect x="21" y="44" width="34" height="28" fill="#60a5fa" opacity="0.85" />
          {[24, 34, 44, 54, 64].map((ty) => (
            <line key={ty} x1="20" y1={ty} x2="30" y2={ty} stroke="#0f172a" strokeWidth="2" />
          ))}
        </g>
      );
      break;
    case 'calendar':
      body = (
        <g>
          <rect x="10" y="12" width="60" height="62" rx="6" fill="#ffffff" stroke="#334155" strokeWidth="3" />
          <rect x="10" y="12" width="60" height="16" rx="5" fill="#ef4444" />
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={16 + (i % 4) * 13} y={34 + Math.floor(i / 4) * 12} width="9" height="8" rx="1.5" fill="#cbd5e1" />
          ))}
        </g>
      );
      break;
    case 'sunset':
      body = (
        <g>
          <rect x="4" y="6" width="72" height="68" rx="8" fill="#c084fc" />
          <circle cx="40" cy="56" r="16" fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" />
          <rect x="4" y="56" width="72" height="18" fill="#4ade80" />
        </g>
      );
      break;
    default:
      body = null;
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fontFamily={EXAM_FONT}>
      {body}
      {label && (
        <text x="40" y="58" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b">
          {label}
        </text>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// Labor I: vegyes átváltó feladatok
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

interface MixTask {
  text: string;
  answer: string;
  options: string[];
  hint: string;
}

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const uniq = (correct: string, wrong: string[]): string[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (!out.includes(w) && out.length < 4) out.push(w);
  });
  return shuffle(out);
};

export const makeMixTask = (): MixTask => {
  const kind = rnd(0, 7);
  if (kind === 0) {
    const a = rnd(2, 9);
    return {
      text: `${a} dm = ? cm`,
      answer: `${a * 10} cm`,
      options: uniq(`${a * 10} cm`, [`${a} cm`, `${a + 10} cm`, `${a * 10 + 1} cm`]),
      hint: `1 dm = 10 cm. ${a} dm = ${a} darab 10 cm.`
    };
  }
  if (kind === 1) {
    const a = rnd(1, 8);
    const b = rnd(1, 9);
    return {
      text: `${a} dm ${b} cm = ? cm`,
      answer: `${a * 10 + b} cm`,
      options: uniq(`${a * 10 + b} cm`, [`${a + b} cm`, `${b * 10 + a} cm`, `${a * 10} cm`, `${a * 10 + b + 1} cm`]),
      hint: `${a} dm = ${a * 10} cm, és még ${b} cm.`
    };
  }
  if (kind === 2) {
    const a = rnd(2, 9);
    return {
      text: `${a} l = ? dl`,
      answer: `${a * 10} dl`,
      options: uniq(`${a * 10} dl`, [`${a} dl`, `${a + 10} dl`, `${a * 10 + 10} dl`]),
      hint: `1 l = 10 dl. ${a} l = ${a} darab 10 dl.`
    };
  }
  if (kind === 3) {
    const b = rnd(1, 9);
    return {
      text: `1 l ${b} dl = ? dl`,
      answer: `${10 + b} dl`,
      options: uniq(`${10 + b} dl`, [`${1 + b} dl`, `${b * 10 + 1} dl`, `${b} dl`, `${10 + b + 1} dl`]),
      hint: `1 l = 10 dl, és még ${b} dl.`
    };
  }
  if (kind === 4) {
    const a = rnd(2, 9);
    return {
      text: `${a} hét = ? nap`,
      answer: `${a * 7} nap`,
      options: uniq(`${a * 7} nap`, [`${a + 7} nap`, `${a * 7 + 7} nap`, `${a * 7 - 1} nap`]),
      hint: `1 hét = 7 nap. ${a} hét = ${a} · 7 nap.`
    };
  }
  if (kind === 5) {
    const m = [5, 10, 15, 20, 25, 30][rnd(0, 5)];
    return {
      text: `1 óra ${m} perc = ? perc`,
      answer: `${60 + m} perc`,
      options: uniq(`${60 + m} perc`, [`${1 + m} perc`, `${50 + m} perc`, `${60 + m + 10} perc`]),
      hint: `1 óra = 60 perc. 60 + ${m} = ?`
    };
  }
  if (kind === 6) {
    const a = rnd(15, 55);
    const b = rnd(12, 100 - a - 11);
    return {
      text: `${a} kg + ${b} kg = ?`,
      answer: `${a + b} kg`,
      options: uniq(`${a + b} kg`, [`${a + b - 10} kg`, `${a + b + 1} kg`, `${a + b + 10} kg`]),
      hint: `Előbb a tízeseket add össze, aztán az egyeseket!`
    };
  }
  const c = rnd(11, 89);
  return {
    text: `1 m − ${c} cm = ?`,
    answer: `${100 - c} cm`,
    options: uniq(`${100 - c} cm`, [`${c} cm`, `${100 - c + 10} cm`, `${100 - c - 1} cm`, `${100 - c + 1} cm`]),
    hint: `1 m = 100 cm. 100 − ${c} = ?`
  };
};

export const MixConvertLab: React.FC = () => {
  const [task, setTask] = React.useState<MixTask>(() => ({
    text: '3 dm 4 cm = ? cm',
    answer: '34 cm',
    options: ['7 cm', '34 cm', '43 cm', '30 cm'],
    hint: '3 dm = 30 cm, és még 4 cm.'
  }));
  const [picked, setPicked] = React.useState<string | null>(null);
  const [score, setScore] = React.useState(0);

  const ok = picked === task.answer;

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-rose-200 dark:border-rose-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="flex justify-between items-center text-sm font-bold text-rose-800 dark:text-rose-200">
        <span>Vegyes feladat</span>
        <span>Jó válaszok: {score}</span>
      </div>
      <div className="bg-rose-50 dark:bg-rose-950/50 rounded-xl p-4 text-center text-3xl sm:text-4xl font-black text-rose-950 dark:text-rose-100">
        {task.text}
      </div>
      <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
        {task.options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => {
              if (picked === task.answer) return;
              setPicked(o);
              if (o === task.answer) setScore((s) => s + 1);
            }}
            className={`min-h-[56px] rounded-xl border-2 text-xl font-black transition-all ${
              picked === o
                ? o === task.answer
                  ? 'bg-emerald-500 text-white border-emerald-700'
                  : 'bg-rose-500 text-white border-rose-700'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
      {picked && (
        <div className={`rounded-xl p-3 text-center text-sm font-bold ${ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
          {ok ? `Ügyes! ${task.text.replace('?', task.answer)}` : `Még nem jó. ${task.hint}`}
        </div>
      )}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            setTask(makeMixTask());
            setPicked(null);
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]"
        >
          Új feladat
        </button>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Labor II: melyik mértékegység illik?
// ---------------------------------------------------------------------------
type Qty = 'hossz' | 'tömeg' | 'űrtartalom' | 'idő';

const UNITS: { u: string; q: Qty; rank: number }[] = [
  { u: 'cm', q: 'hossz', rank: 0 },
  { u: 'dm', q: 'hossz', rank: 1 },
  { u: 'm', q: 'hossz', rank: 2 },
  { u: 'kg', q: 'tömeg', rank: 0 },
  { u: 'dl', q: 'űrtartalom', rank: 0 },
  { u: 'l', q: 'űrtartalom', rank: 1 },
  { u: 'perc', q: 'idő', rank: 0 },
  { u: 'óra', q: 'idő', rank: 1 }
];

const QTY_WORD: Record<Qty, string> = {
  hossz: 'hosszúság',
  tömeg: 'tömeg',
  űrtartalom: 'űrtartalom',
  idő: 'idő'
};

export const UNIT_ITEMS: { thing: string; n: number; unit: string }[] = [
  { thing: 'Egy új ceruza hossza', n: 18, unit: 'cm' },
  { thing: 'Az ajtó magassága', n: 2, unit: 'm' },
  { thing: 'A tanterem hossza', n: 8, unit: 'm' },
  { thing: 'Egy katica hossza', n: 1, unit: 'cm' },
  { thing: 'Egy zsák krumpli', n: 25, unit: 'kg' },
  { thing: 'Egy nagy görögdinnye', n: 6, unit: 'kg' },
  { thing: 'Egy 2. osztályos gyerek', n: 28, unit: 'kg' },
  { thing: 'Egy vödör víz', n: 10, unit: 'l' },
  { thing: 'Egy pohár tej', n: 2, unit: 'dl' },
  { thing: 'Egy bögre tea', n: 3, unit: 'dl' },
  { thing: 'Egy fürdőkád víz', n: 80, unit: 'l' },
  { thing: 'Egy tanítási óra', n: 45, unit: 'perc' },
  { thing: 'Az éjszakai alvás', n: 10, unit: 'óra' },
  { thing: 'A fogmosás', n: 3, unit: 'perc' },
  { thing: 'Egy iskolai nap', n: 5, unit: 'óra' }
];

export const UnitPickLab: React.FC = () => {
  const [idx, setIdx] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const item = UNIT_ITEMS[idx];
  const correct = UNITS.find((u) => u.u === item.unit)!;

  let feedback: { ok: boolean; text: string } | null = null;
  if (picked) {
    const p = UNITS.find((u) => u.u === picked)!;
    if (picked === item.unit) {
      feedback = { ok: true, text: `Igen! ${item.thing}: ${item.n} ${item.unit}.` };
    } else if (p.q !== correct.q) {
      feedback = { ok: false, text: `A(z) ${picked} ${QTY_WORD[p.q]} mértékegysége. Itt ${QTY_WORD[correct.q]} kell!` };
    } else {
      feedback = {
        ok: false,
        text: `Jó, ez ${QTY_WORD[p.q]}! De ${item.n} ${picked} ${p.rank > correct.rank ? 'túl sok' : 'túl kevés'} lenne. Képzeld el!`
      };
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-4 text-center text-sky-950 dark:text-sky-100">
        <div className="text-base sm:text-lg font-bold">{item.thing}:</div>
        <div className="text-3xl sm:text-4xl font-black mt-1">
          {item.n} <span className="text-rose-600">?</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
        {UNITS.map((u) => (
          <button
            key={u.u}
            type="button"
            onClick={() => setPicked(u.u)}
            className={`min-h-[56px] rounded-xl border-2 text-xl font-black ${
              picked === u.u
                ? u.u === item.unit
                  ? 'bg-emerald-500 text-white border-emerald-700'
                  : 'bg-rose-500 text-white border-rose-700'
                : 'bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-700'
            }`}
          >
            {u.u}
          </button>
        ))}
      </div>
      {feedback && (
        <div className={`rounded-xl p-3 text-center text-sm font-bold ${feedback.ok ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
          {feedback.text}
        </div>
      )}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            let n = idx;
            while (n === idx) n = rnd(0, UNIT_ITEMS.length - 1);
            setIdx(n);
            setPicked(null);
          }}
          className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm font-bold min-h-[48px]"
        >
          Új feladat
        </button>
      </div>
    </div>
  );
};
