import React, { useState } from 'react';

// ---------------------------------------------------------------------------
// 2. A tömeg mérése – közös SVG-építőelemek és laborok (2. osztály)
// ---------------------------------------------------------------------------

export const MASS_FONT = 'system-ui, Segoe UI, sans-serif';

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export type PanItem =
  | { kind: 'w'; kg: number }
  | { kind: 'pumpkin' | 'apple' | 'melon' | 'ball' | 'book' | 'pencil' | 'feather' | 'iron' | 'q' | 'box' | 'pear' }
  | { kind: 'bag'; label?: string; color?: string };

const itemWidth = (it: PanItem): number => {
  switch (it.kind) {
    case 'w':
      return it.kg >= 10 ? 32 : it.kg >= 5 ? 27 : it.kg >= 2 ? 22 : 18;
    case 'pumpkin':
      return 34;
    case 'melon':
      return 36;
    case 'apple':
    case 'pear':
      return 14;
    case 'ball':
      return 22;
    case 'book':
      return 26;
    case 'pencil':
      return 34;
    case 'feather':
      return 30;
    case 'iron':
      return 26;
    case 'q':
      return 24;
    case 'box':
      return 26;
    case 'bag':
      return 28;
    default:
      return 20;
  }
};

/** Egy tárgy rajza: alsó közepe (x, y). */
export const PanItemPart: React.FC<{ it: PanItem; x: number; y: number }> = ({ it, x, y }) => {
  const w = itemWidth(it);
  switch (it.kind) {
    case 'w': {
      const h = w * 0.72;
      return (
        <g>
          <polygon points={`${x - w / 2},${y} ${x + w / 2},${y} ${x + w * 0.36},${y - h} ${x - w * 0.36},${y - h}`} fill="#475569" stroke="#0f172a" strokeWidth="1.4" />
          <rect x={x - w * 0.12} y={y - h - 5} width={w * 0.24} height="5" rx="1.5" fill="#334155" />
          <text x={x} y={y - h * 0.28} textAnchor="middle" fontSize={w * 0.36} fontWeight="900" fill="#fff" fontFamily={MASS_FONT}>
            {it.kg}
          </text>
        </g>
      );
    }
    case 'pumpkin':
      return (
        <g>
          <ellipse cx={x} cy={y - 12} rx="17" ry="12" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
          <path d={`M ${x} ${y - 24} q -6 12 0 24 M ${x} ${y - 24} q 6 12 0 24`} fill="none" stroke="#9a3412" strokeWidth="1" />
          <rect x={x - 2} y={y - 29} width="4" height="6" fill="#15803d" />
        </g>
      );
    case 'melon':
      return (
        <g>
          <ellipse cx={x} cy={y - 13} rx="18" ry="13" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
          <path d={`M ${x - 12} ${y - 20} q 12 8 24 0 M ${x - 14} ${y - 12} q 14 8 28 0`} fill="none" stroke="#bbf7d0" strokeWidth="1.6" />
        </g>
      );
    case 'apple':
      return (
        <g>
          <circle cx={x} cy={y - 7} r="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.2" />
          <line x1={x} y1={y - 14} x2={x + 1} y2={y - 17} stroke="#78350f" strokeWidth="1.5" />
        </g>
      );
    case 'pear':
      return (
        <g>
          <path d={`M ${x} ${y - 17} q -3 0 -3 5 q -5 3 -4 8 q 2 4 7 4 q 5 0 7 -4 q 1 -5 -4 -8 q 0 -5 -3 -5 Z`} fill="#facc15" stroke="#854d0e" strokeWidth="1.2" />
        </g>
      );
    case 'ball':
      return (
        <g>
          <circle cx={x} cy={y - 11} r="11" fill="#ffffff" stroke="#0f172a" strokeWidth="1.5" />
          <polygon points={`${x},${y - 16} ${x + 4},${y - 13} ${x + 3},${y - 8} ${x - 3},${y - 8} ${x - 4},${y - 13}`} fill="#0f172a" />
        </g>
      );
    case 'book':
      return (
        <g>
          <rect x={x - 13} y={y - 9} width="26" height="9" rx="1.5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.3" />
          <rect x={x - 11} y={y - 3} width="22" height="2" fill="#fff" />
        </g>
      );
    case 'pencil':
      return (
        <g>
          <rect x={x - 17} y={y - 6} width="28" height="6" fill="#f59e0b" stroke="#1e293b" strokeWidth="1" />
          <polygon points={`${x + 11},${y - 6} ${x + 17},${y - 3} ${x + 11},${y}`} fill="#fde7c7" stroke="#1e293b" strokeWidth="1" />
        </g>
      );
    case 'feather':
      return (
        <g>
          <path d={`M ${x - 15} ${y - 1} Q ${x - 2} ${y - 16} ${x + 15} ${y - 14} Q ${x + 4} ${y - 2} ${x - 15} ${y - 1} Z`} fill="#e0f2fe" stroke="#0369a1" strokeWidth="1.3" />
          <line x1={x - 15} y1={y - 1} x2={x + 13} y2={y - 13} stroke="#0369a1" strokeWidth="1" />
        </g>
      );
    case 'iron':
      return <rect x={x - 13} y={y - 12} width="26" height="12" rx="2" fill="#64748b" stroke="#0f172a" strokeWidth="1.4" />;
    case 'box':
      return (
        <g>
          <rect x={x - 13} y={y - 20} width="26" height="20" rx="2" fill="#d6a76c" stroke="#78350f" strokeWidth="1.4" />
          <line x1={x - 13} y1={y - 13} x2={x + 13} y2={y - 13} stroke="#78350f" strokeWidth="1" />
        </g>
      );
    case 'q':
      return (
        <g>
          <rect x={x - 12} y={y - 22} width="24" height="22" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
          <text x={x} y={y - 5} textAnchor="middle" fontSize="16" fontWeight="900" fill="#dc2626" fontFamily={MASS_FONT}>
            ?
          </text>
        </g>
      );
    case 'bag':
      return (
        <g>
          <path d={`M ${x - 12} ${y} L ${x - 10} ${y - 20} L ${x - 4} ${y - 24} L ${x + 4} ${y - 24} L ${x + 10} ${y - 20} L ${x + 12} ${y} Z`} fill={it.color ?? '#d6c19a'} stroke="#78350f" strokeWidth="1.4" />
          {it.label && (
            <text x={x} y={y - 7} textAnchor="middle" fontSize="8.5" fontWeight="900" fill="#422006" fontFamily={MASS_FONT}>
              {it.label}
            </text>
          )}
        </g>
      );
    default:
      return null;
  }
};

/**
 * Kétkarú mérleg. `tilt` > 0: a jobb oldal van lent, < 0: a bal oldal van lent, 0: egyensúly.
 * (cx, y) a karok forgáspontja.
 */
export const BalancePart: React.FC<{
  cx: number;
  y: number;
  half?: number;
  tilt?: number;
  left?: PanItem[];
  right?: PanItem[];
  panW?: number;
  base?: boolean;
}> = ({ cx, y, half = 80, tilt = 0, left = [], right = [], panW = 70, base = true }) => {
  const th = (tilt * Math.PI) / 180;
  const lx = cx - half * Math.cos(th);
  const ly = y - half * Math.sin(th);
  const rx = cx + half * Math.cos(th);
  const ry = y + half * Math.sin(th);
  const drop = 26;
  const pan = (px: number, py: number, items: PanItem[], key: string) => {
    const total = items.reduce((s, it) => s + itemWidth(it) + 2, -2);
    const sc = total > panW - 6 ? (panW - 6) / total : 1;
    let cur = px - (total * sc) / 2;
    const surf = py + drop;
    return (
      <g key={key}>
        <line x1={px} y1={py} x2={px - panW / 2 + 4} y2={surf} stroke="#64748b" strokeWidth="1.2" />
        <line x1={px} y1={py} x2={px + panW / 2 - 4} y2={surf} stroke="#64748b" strokeWidth="1.2" />
        <g transform={`translate(0 0)`}>
          {items.map((it, i) => {
            const w = itemWidth(it) * sc;
            const ix = cur + w / 2;
            cur += w + 2 * sc;
            return (
              <g key={i} transform={`translate(${ix} ${surf}) scale(${sc}) translate(${-ix} ${-surf})`}>
                <PanItemPart it={it} x={ix} y={surf} />
              </g>
            );
          })}
        </g>
        <path d={`M ${px - panW / 2} ${surf} Q ${px} ${surf + 12} ${px + panW / 2} ${surf} Z`} fill="#cbd5e1" stroke="#334155" strokeWidth="1.6" />
      </g>
    );
  };
  return (
    <g>
      {base && (
        <>
          <rect x={cx - 4} y={y} width="8" height={drop + 30} fill="#475569" />
          <rect x={cx - 34} y={y + drop + 28} width="68" height="9" rx="4" fill="#334155" />
        </>
      )}
      <line x1={lx} y1={ly} x2={rx} y2={ry} stroke="#1e293b" strokeWidth="5" strokeLinecap="round" />
      <circle cx={cx} cy={y} r="5" fill="#f59e0b" stroke="#78350f" strokeWidth="1.5" />
      <polygon points={`${cx - 4},${y - 4} ${cx + 4},${y - 4} ${cx},${y - 18}`} fill="#dc2626" transform={`rotate(${tilt} ${cx} ${y})`} />
      {pan(lx, ly, left, 'l')}
      {pan(rx, ry, right, 'r')}
    </g>
  );
};

/** Mérleghinta két gyerekkel (név + kg felirat). `tilt` > 0: jobb lent. */
export const SeesawPart: React.FC<{
  cx: number;
  y: number;
  half?: number;
  tilt?: number;
  leftKids: { name: string; kg: number; color?: string }[];
  rightKids: { name: string; kg: number; color?: string }[];
}> = ({ cx, y, half = 110, tilt = 0, leftKids, rightKids }) => {
  const th = (tilt * Math.PI) / 180;
  const pt = (d: number) => ({ x: cx + d * Math.cos(th), y: y + d * Math.sin(th) });
  const kid = (k: { name: string; kg: number; color?: string }, d: number, key: string) => {
    const p = pt(d);
    return (
      <g key={key}>
        <line x1={p.x} y1={p.y - 4} x2={p.x} y2={p.y - 22} stroke={k.color ?? '#2563eb'} strokeWidth="7" strokeLinecap="round" />
        <circle cx={p.x} cy={p.y - 31} r="8" fill="#fcd9b6" stroke="#b45309" strokeWidth="1.4" />
        <rect x={p.x - 26} y={p.y - 66} width="52" height="26" rx="6" fill="#ffffff" stroke="#334155" strokeWidth="1.3" />
        <text x={p.x} y={p.y - 55} textAnchor="middle" fontSize="10" fontWeight="900" fill="#334155" fontFamily={MASS_FONT}>
          {k.name}
        </text>
        <text x={p.x} y={p.y - 44} textAnchor="middle" fontSize="10" fontWeight="900" fill="#b91c1c" fontFamily={MASS_FONT}>
          {k.kg} kg
        </text>
      </g>
    );
  };
  const placeK = (list: typeof leftKids, sign: number, pre: string) =>
    list.map((k, i) => kid(k, sign * (half - 14 - i * 56), `${pre}${i}`));
  const a = pt(-half);
  const b = pt(half);
  return (
    <g>
      <polygon points={`${cx},${y} ${cx - 16},${y + 30} ${cx + 16},${y + 30}`} fill="#1e3a8a" />
      <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="#ca8a04" strokeWidth="7" strokeLinecap="round" />
      <circle cx={cx} cy={y} r="4" fill="#fff" />
      {placeK(leftKids, -1, 'l')}
      {placeK(rightKids, 1, 'r')}
    </g>
  );
};

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

const BTN_NEW = 'px-5 py-2.5 rounded-xl bg-slate-200 text-slate-800 text-sm sm:text-base font-bold min-h-[48px]';

const OBJECTS: { kind: 'pumpkin' | 'melon' | 'box' | 'bag'; name: string; min: number; max: number }[] = [
  { kind: 'pumpkin', name: 'tök', min: 3, max: 25 },
  { kind: 'melon', name: 'görögdinnye', min: 3, max: 12 },
  { kind: 'box', name: 'doboz', min: 3, max: 25 },
  { kind: 'bag', name: 'zsák', min: 10, max: 25 }
];

const WEIGHTS = [1, 2, 5, 10];

/** Labor I: kétkarú mérleg súlyokkal – keresd meg a tárgy tömegét! */
export const WeightsBalanceLab: React.FC = () => {
  const [task, setTask] = useState<{ kg: number; obj: number }>({ kg: 13, obj: 0 });
  const [pan, setPan] = useState<number[]>([]);
  const [msg, setMsg] = useState<Msg>(null);

  const sum = pan.reduce((s, v) => s + v, 0);
  const diff = sum - task.kg;
  const tilt = diff === 0 ? 0 : diff > 0 ? 9 : -9;
  const obj = OBJECTS[task.obj];

  const next = () => {
    const o = rnd(0, OBJECTS.length - 1);
    let kg = rnd(OBJECTS[o].min, OBJECTS[o].max);
    while (kg === task.kg) kg = rnd(OBJECTS[o].min, OBJECTS[o].max);
    setTask({ kg, obj: o });
    setPan([]);
    setMsg(null);
  };

  const add = (w: number) => {
    if (pan.length >= 6) {
      setMsg({ ok: false, text: 'Több súly nem fér a serpenyőbe! Használj nagyobb súlyt.' });
      return;
    }
    const np = [...pan, w].sort((a, b) => b - a);
    setPan(np);
    const s = np.reduce((x, v) => x + v, 0);
    if (s === task.kg) {
      setMsg({ ok: true, text: `Egyensúly! A ${obj.name} ${task.kg} kg, mert ${np.join(' kg + ')} kg = ${task.kg} kg.` });
    } else if (s > task.kg) {
      setMsg({ ok: false, text: 'A jobb oldal lement: a súlyok nehezebbek. Vegyél le egyet!' });
    } else {
      setMsg(null);
    }
  };

  const remove = (i: number) => {
    const np = pan.filter((_, k) => k !== i);
    setPan(np);
    const s = np.reduce((x, v) => x + v, 0);
    setMsg(s === task.kg && np.length > 0 ? { ok: true, text: `Egyensúly! A ${obj.name} ${task.kg} kg.` } : null);
  };

  const leftItem: PanItem = obj.kind === 'bag' ? { kind: 'bag' } : { kind: obj.kind };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-emerald-50 dark:bg-emerald-950/50 rounded-xl p-3 text-center text-emerald-950 dark:text-emerald-100 font-bold">
        Hány kg a {obj.name}? Tegyél súlyokat a jobb oldalra, amíg egyensúlyba kerül!
      </div>

      <svg viewBox="0 0 320 150" className="w-full max-w-[440px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MASS_FONT}>
        <rect x="1" y="1" width="318" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <BalancePart cx={160} y={58} half={92} tilt={tilt} left={[leftItem]} right={pan.map((kg) => ({ kind: 'w' as const, kg }))} panW={96} />
        <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="900" fill={diff === 0 ? '#15803d' : '#334155'}>
          {diff === 0 ? 'Egyensúlyban van!' : diff < 0 ? 'A bal oldal nehezebb.' : 'A jobb oldal nehezebb.'}
        </text>
      </svg>

      <div className="flex flex-wrap justify-center gap-2">
        {WEIGHTS.map((w) => (
          <button
            key={w}
            type="button"
            onClick={() => add(w)}
            className="px-4 py-2 rounded-xl bg-slate-700 text-white font-black text-lg min-h-[52px] min-w-[72px]"
          >
            + {w} kg
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center items-center gap-2 min-h-[48px]">
        <span className="text-sm font-bold text-slate-600 dark:text-slate-300">A jobb serpenyőben:</span>
        {pan.length === 0 && <span className="text-sm text-slate-400">még semmi</span>}
        {pan.map((w, i) => (
          <button
            key={`${w}-${i}`}
            type="button"
            onClick={() => remove(i)}
            className="px-3 py-2 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-base min-h-[44px]"
            title="Levétel"
          >
            {w} kg ✕
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

const NAMES = ['Ádám', 'Bori', 'Csaba', 'Dia', 'Emil', 'Fanni', 'Gergő', 'Hanna', 'Ivó', 'Jázmin'];
const KID_COLORS = ['#2563eb', '#db2777', '#16a34a', '#9333ea'];

interface SeesawTask {
  left: { name: string; kg: number; color: string }[];
  right: { name: string; kg: number; color: string }[];
}

const makeSeesaw = (): SeesawTask => {
  const pick = [...NAMES].sort(() => Math.random() - 0.5);
  const kid = (i: number, kg: number) => ({ name: pick[i], kg, color: KID_COLORS[i % KID_COLORS.length] });
  const mode = rnd(0, 2);
  if (mode === 0) {
    // egy az egy ellen, néha egyensúly
    const a = rnd(18, 35);
    const b = Math.random() < 0.3 ? a : rnd(18, 35);
    return { left: [kid(0, a)], right: [kid(1, b)] };
  }
  // két gyerek egy felnőtt ellen (összeg ≤ 100)
  const a = rnd(24, 36);
  const b = rnd(24, 36);
  const r = Math.random() < 0.3 ? a + b : a + b + rnd(-7, 7);
  const twoLeft = mode === 1;
  const pair = [kid(0, a), kid(1, b)];
  const single = [{ name: Math.random() < 0.5 ? 'Anya' : 'Apa', kg: r, color: '#f59e0b' }];
  return twoLeft ? { left: pair, right: single } : { left: single, right: pair };
};

/** Labor II: mérleghinta – melyik oldal száll le? */
export const SeesawLab: React.FC = () => {
  const [task, setTask] = useState<SeesawTask>({
    left: [{ name: 'Bori', kg: 24, color: '#db2777' }],
    right: [{ name: 'Csaba', kg: 27, color: '#16a34a' }]
  });
  const [shown, setShown] = useState<boolean>(false);
  const [msg, setMsg] = useState<Msg>(null);

  const L = task.left.reduce((s, k) => s + k.kg, 0);
  const R = task.right.reduce((s, k) => s + k.kg, 0);
  const truth: 'left' | 'right' | 'eq' = L === R ? 'eq' : L > R ? 'left' : 'right';
  const tilt = shown ? (truth === 'eq' ? 0 : truth === 'left' ? -10 : 10) : 0;
  const sideText = (list: SeesawTask['left']) =>
    list.length === 1 ? `${list[0].kg} kg` : `${list[0].kg} kg + ${list[1].kg} kg = ${list[0].kg + list[1].kg} kg`;

  const answer = (a: 'left' | 'right' | 'eq') => {
    setShown(true);
    const why = `Bal: ${sideText(task.left)}. Jobb: ${sideText(task.right)}.`;
    if (a === truth) {
      setMsg({
        ok: true,
        text: `Igen! ${why} ${truth === 'eq' ? 'Egyensúlyban vannak.' : 'A nehezebb oldal száll le.'}`
      });
    } else {
      setMsg({
        ok: false,
        text: `Nem egészen. ${why} ${truth === 'eq' ? 'Ugyanannyi, ezért egyensúlyban maradnak.' : 'Mindig a nehezebb oldal száll le!'}`
      });
    }
  };

  const next = () => {
    setTask(makeSeesaw());
    setShown(false);
    setMsg(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-2 border-sky-200 dark:border-sky-800 rounded-2xl p-4 sm:p-6 shadow-sm space-y-4">
      <div className="bg-sky-50 dark:bg-sky-950/50 rounded-xl p-3 text-center text-sky-950 dark:text-sky-100 font-bold">
        Melyik oldal száll le a mérleghintán?
      </div>

      <svg viewBox="0 0 320 150" className="w-full max-w-[440px] mx-auto h-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MASS_FONT}>
        <rect x="1" y="1" width="318" height="148" rx="12" fill="#f8fafc" stroke="#cbd5e1" />
        <rect x="2" y="128" width="316" height="20" fill="#bbf7d0" />
        <SeesawPart cx={160} y={100} half={140} tilt={tilt} leftKids={task.left} rightKids={task.right} />
      </svg>

      <div className="flex flex-wrap justify-center gap-2">
        <button type="button" onClick={() => answer('left')} className="px-4 py-2.5 rounded-xl bg-sky-600 text-white font-bold min-h-[52px]">
          ◀ A bal oldal száll le
        </button>
        <button type="button" onClick={() => answer('eq')} className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold min-h-[52px]">
          Egyensúly
        </button>
        <button type="button" onClick={() => answer('right')} className="px-4 py-2.5 rounded-xl bg-sky-600 text-white font-bold min-h-[52px]">
          A jobb oldal száll le ▶
        </button>
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
